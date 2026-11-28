export const MAX_DIAGNOSE_BODY_BYTES = 16 * 1024; // 16 KB

export interface DiagnosePayload {
  name: string;
  company: string;
  contact: string;
  department: string;
  problem: string;
  currentProcess: string;
  systemsAndDocs: string;
  expectedOutcome: string;
  riskAndHumanRole: string;
}

export type ValidationResult =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; data: DiagnosePayload }
  | { ok: false; status: 400 | 413 | 415; error: string };

const FIELD_LIMITS: Record<keyof DiagnosePayload, { min: number; max: number; multiline: boolean; label: string }> = {
  name: { min: 1, max: 80, multiline: false, label: "姓名" },
  company: { min: 1, max: 150, multiline: false, label: "企业全称" },
  contact: { min: 5, max: 100, multiline: false, label: "联系方式" },
  department: { min: 0, max: 100, multiline: false, label: "所属部门" },
  problem: { min: 2, max: 2000, multiline: true, label: "具体问题描述" },
  currentProcess: { min: 0, max: 1500, multiline: true, label: "目前处理方式" },
  systemsAndDocs: { min: 0, max: 1500, multiline: true, label: "涉及系统或资料" },
  expectedOutcome: { min: 0, max: 1500, multiline: true, label: "期望达成结果" },
  riskAndHumanRole: { min: 0, max: 1500, multiline: true, label: "风险与人工职责" },
};

const CONTROL_CHARS_SINGLE = /[\u0000-\u001F\u007F]/g;
const CONTROL_CHARS_MULTI = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

// Accepts Chinese/international phone numbers, emails, or WeChat IDs; rejects URLs or markup.
const CONTACT_PATTERN = /^[a-zA-Z0-9_.@+\-()\s]{5,100}$/;

function cleanInput(value: string, multiline: boolean): string {
  const cleaned = value.replace(multiline ? CONTROL_CHARS_MULTI : CONTROL_CHARS_SINGLE, " ");
  return cleaned.trim();
}

function isValidContact(contact: string): boolean {
  if (/https?:\/\//i.test(contact)) {
    return false;
  }
  return CONTACT_PATTERN.test(contact) && /[a-zA-Z0-9]/.test(contact);
}

/**
 * Validates raw HTTP request headers, body size, and JSON structure for `/api/diagnose`.
 */
export async function parseAndValidateDiagnoseRequest(request: Request): Promise<ValidationResult> {
  const contentType = request.headers.get("content-type")?.toLowerCase() || "";
  if (!contentType.includes("application/json")) {
    return {
      ok: false,
      status: 415,
      error: "请求格式不支持，请使用 application/json 提交。",
    };
  }

  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const declaredLength = Number(contentLengthHeader);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_DIAGNOSE_BODY_BYTES) {
      return {
        ok: false,
        status: 413,
        error: "提交内容过大，请精简后重试。",
      };
    }
  }

  let rawText: string;
  try {
    rawText = await request.text();
  } catch {
    return {
      ok: false,
      status: 400,
      error: "无法读取请求内容。",
    };
  }

  if (Buffer.byteLength(rawText, "utf8") > MAX_DIAGNOSE_BODY_BYTES) {
    return {
      ok: false,
      status: 413,
      error: "提交内容过大，请精简后重试。",
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    return {
      ok: false,
      status: 400,
      error: "请求 JSON 格式无效。",
    };
  }

  return validateDiagnosePayload(parsed);
}

/**
 * Validates and normalizes a parsed JSON payload against strict types, lengths, and formats.
 */
export function validateDiagnosePayload(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      ok: false,
      status: 400,
      error: "请求体必须为 JSON 对象。",
    };
  }

  const record = raw as Record<string, unknown>;

  // Silent honeypot trap for automated bots.
  for (const hpKey of ["website", "_hp"]) {
    const hpVal = record[hpKey];
    if (typeof hpVal === "string" && hpVal.trim().length > 0) {
      return { ok: true, honeypot: true };
    }
  }

  const normalized: Partial<DiagnosePayload> = {};

  for (const [key, rules] of Object.entries(FIELD_LIMITS) as Array<
    [keyof DiagnosePayload, (typeof FIELD_LIMITS)[keyof DiagnosePayload]]
  >) {
    const value = record[key];
    if (value === undefined || value === null) {
      if (rules.min > 0) {
        return {
          ok: false,
          status: 400,
          error: "请填写完整所有必填项（姓名、企业全称、联系方式、具体问题描述）。",
        };
      }
      normalized[key] = "";
      continue;
    }

    if (typeof value !== "string") {
      return {
        ok: false,
        status: 400,
        error: `字段「${rules.label}」格式无效。`,
      };
    }

    const cleaned = cleanInput(value, rules.multiline);

    if (cleaned.length < rules.min) {
      if (rules.min === 1) {
        return {
          ok: false,
          status: 400,
          error: "请填写完整所有必填项（姓名、企业全称、联系方式、具体问题描述）。",
        };
      }
      return {
        ok: false,
        status: 400,
        error: `「${rules.label}」至少需要 ${rules.min} 个字符。`,
      };
    }

    if (cleaned.length > rules.max) {
      return {
        ok: false,
        status: 400,
        error: `「${rules.label}」长度不能超过 ${rules.max} 个字符。`,
      };
    }

    normalized[key] = cleaned;
  }

  const contact = normalized.contact || "";
  if (!isValidContact(contact)) {
    return {
      ok: false,
      status: 400,
      error: "请填写有效的手机号、邮箱或微信号。",
    };
  }

  return {
    ok: true,
    honeypot: false,
    data: normalized as DiagnosePayload,
  };
}
