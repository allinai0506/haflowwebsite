import fs from "fs";
import path from "path";

export const DEFAULT_MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB per file
export const DEFAULT_MAX_DIR_BYTES = 100 * 1024 * 1024; // 100 MB total leads cap

export class LeadStorageQuotaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LeadStorageQuotaError";
  }
}

export interface LeadStorageOptions {
  leadsDir?: string;
  maxFileBytes?: number;
  maxDirBytes?: number;
}

async function getDirectorySizeBytes(dirPath: string): Promise<number> {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
  let total = 0;
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const stat = await fs.promises.stat(path.join(dirPath, entry.name));
    total += stat.size;
  }
  return total;
}

/**
 * Persists a lead record as JSONL with restrictive permissions (0700 dir / 0600 file),
 * file size rotation, and a total directory quota to prevent disk exhaustion.
 * Existing lead files are never deleted.
 */
export async function persistLeadRecord(
  record: Record<string, unknown>,
  options: LeadStorageOptions = {}
): Promise<{ filePath: string; rotated: boolean }> {
  const leadsDir =
    options.leadsDir ||
    process.env.LEADS_DIR ||
    path.join(process.cwd(), "data", "leads");
  const maxFileBytes = options.maxFileBytes ?? DEFAULT_MAX_FILE_BYTES;
  const maxDirBytes = options.maxDirBytes ?? DEFAULT_MAX_DIR_BYTES;

  await fs.promises.mkdir(leadsDir, { recursive: true, mode: 0o700 });
  await fs.promises.chmod(leadsDir, 0o700).catch(() => {});

  const line = JSON.stringify(record) + "\n";
  const lineBytes = Buffer.byteLength(line, "utf8");

  const currentDirBytes = await getDirectorySizeBytes(leadsDir);
  if (currentDirBytes + lineBytes > maxDirBytes) {
    throw new LeadStorageQuotaError("Leads directory storage quota exceeded");
  }

  const activeFilePath = path.join(leadsDir, "diagnose_submissions.jsonl");
  let rotated = false;

  try {
    const stat = await fs.promises.stat(activeFilePath);
    if (stat.size + lineBytes > maxFileBytes) {
      const archiveName = `diagnose_submissions.${Date.now()}.jsonl`;
      const archivePath = path.join(leadsDir, archiveName);
      await fs.promises.rename(activeFilePath, archivePath);
      await fs.promises.chmod(archivePath, 0o600).catch(() => {});
      rotated = true;
    }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      throw err;
    }
  }

  await fs.promises.appendFile(activeFilePath, line, {
    encoding: "utf8",
    mode: 0o600,
  });
  await fs.promises.chmod(activeFilePath, 0o600).catch(() => {});

  return { filePath: activeFilePath, rotated };
}
