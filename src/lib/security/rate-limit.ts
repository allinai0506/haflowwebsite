import crypto from "crypto";
import net from "net";

export interface RateLimitDecision {
  allowed: boolean;
  retryAfterSeconds?: number;
  reason?: "rate_limit" | "burst_limit" | "duplicate";
}

interface IpBucket {
  timestamps: number[];
}

export interface RateLimiterOptions {
  windowMs?: number;
  maxRequests?: number;
  burstWindowMs?: number;
  burstMax?: number;
  dedupWindowMs?: number;
  maxEntries?: number;
}

function parsePositiveInt(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/**
 * Extracts the client IP without blindly trusting client-supplied X-Forwarded-For prefixes.
 * Prefers X-Real-IP (set by Nginx to $remote_addr), then falls back to the rightmost valid
 * hop in X-Forwarded-For.
 */
export function getClientIp(headers: Headers): string {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp && net.isIP(realIp) !== 0) {
    return realIp;
  }

  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const parts = forwardedFor
      .split(",")
      .map((part) => part.trim())
      .filter((part) => net.isIP(part) !== 0);
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
  }

  return "unknown";
}

/**
 * Bounded in-memory sliding-window rate limiter with burst and duplicate-submission protection.
 */
export class DiagnoseRateLimiter {
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private readonly burstWindowMs: number;
  private readonly burstMax: number;
  private readonly dedupWindowMs: number;
  private readonly maxEntries: number;
  private readonly ipBuckets = new Map<string, IpBucket>();
  private readonly recentSignatures = new Map<string, number>();

  constructor(options: RateLimiterOptions = {}) {
    this.windowMs = options.windowMs ?? parsePositiveInt(process.env.DIAGNOSE_RATE_LIMIT_WINDOW_MS, 10 * 60 * 1000);
    this.maxRequests = options.maxRequests ?? parsePositiveInt(process.env.DIAGNOSE_RATE_LIMIT_MAX, 5);
    this.burstWindowMs = options.burstWindowMs ?? 60 * 1000;
    this.burstMax = options.burstMax ?? 2;
    this.dedupWindowMs = options.dedupWindowMs ?? 10 * 60 * 1000;
    this.maxEntries = options.maxEntries ?? 10_000;
  }

  private pruneOldEntries(now: number): void {
    if (this.ipBuckets.size >= this.maxEntries) {
      for (const [key, bucket] of this.ipBuckets.entries()) {
        const active = bucket.timestamps.filter((ts) => now - ts < this.windowMs);
        if (active.length === 0) {
          this.ipBuckets.delete(key);
        } else {
          bucket.timestamps = active;
        }
      }
      // Evict oldest if still at cap.
      if (this.ipBuckets.size >= this.maxEntries) {
        const firstKey = this.ipBuckets.keys().next().value;
        if (firstKey !== undefined) {
          this.ipBuckets.delete(firstKey);
        }
      }
    }

    if (this.recentSignatures.size >= this.maxEntries) {
      for (const [sig, ts] of this.recentSignatures.entries()) {
        if (now - ts >= this.dedupWindowMs) {
          this.recentSignatures.delete(sig);
        }
      }
      if (this.recentSignatures.size >= this.maxEntries) {
        const firstSig = this.recentSignatures.keys().next().value;
        if (firstSig !== undefined) {
          this.recentSignatures.delete(firstSig);
        }
      }
    }
  }

  /**
   * Evaluates whether a request from `ip` with `(contact, problem)` should be allowed.
   */
  check(ip: string, contact: string, problem: string, now = Date.now()): RateLimitDecision {
    this.pruneOldEntries(now);

    const bucket = this.ipBuckets.get(ip) ?? { timestamps: [] };
    bucket.timestamps = bucket.timestamps.filter((ts) => now - ts < this.windowMs);

    const burstCount = bucket.timestamps.filter((ts) => now - ts < this.burstWindowMs).length;
    if (burstCount >= this.burstMax) {
      const oldestBurst = bucket.timestamps[bucket.timestamps.length - this.burstMax];
      const retryAfterSeconds = Math.max(1, Math.ceil((this.burstWindowMs - (now - oldestBurst)) / 1000));
      return { allowed: false, retryAfterSeconds, reason: "burst_limit" };
    }

    if (bucket.timestamps.length >= this.maxRequests) {
      const oldest = bucket.timestamps[0];
      const retryAfterSeconds = Math.max(1, Math.ceil((this.windowMs - (now - oldest)) / 1000));
      return { allowed: false, retryAfterSeconds, reason: "rate_limit" };
    }

    const signature = crypto
      .createHash("sha256")
      .update(`${contact.toLowerCase().trim()}|${problem.toLowerCase().trim()}`)
      .digest("hex");

    const prevSigTs = this.recentSignatures.get(signature);
    if (prevSigTs !== undefined && now - prevSigTs < this.dedupWindowMs) {
      const retryAfterSeconds = Math.max(1, Math.ceil((this.dedupWindowMs - (now - prevSigTs)) / 1000));
      return { allowed: false, retryAfterSeconds, reason: "duplicate" };
    }

    bucket.timestamps.push(now);
    this.ipBuckets.set(ip, bucket);
    this.recentSignatures.set(signature, now);

    return { allowed: true };
  }

  reset(): void {
    this.ipBuckets.clear();
    this.recentSignatures.clear();
  }
}

export const diagnoseRateLimiter = new DiagnoseRateLimiter();
