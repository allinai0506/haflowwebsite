import crypto from "crypto";
import { NextResponse } from "next/server";
import { parseAndValidateDiagnoseRequest } from "@/lib/security/diagnose-validation";
import { LeadStorageQuotaError, persistLeadRecord } from "@/lib/security/lead-storage";
import { diagnoseRateLimiter, getClientIp } from "@/lib/security/rate-limit";
import {
  sanitizeTelUri,
  sanitizeWebhookMultiLine,
  sanitizeWebhookSingleLine,
} from "@/lib/security/webhook-sanitize";

export const runtime = "nodejs";

function formatCSTDate(date: Date): string {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function isAllowedWebhookUrl(rawUrl: string | undefined): rawUrl is string {
  if (!rawUrl) return false;
  try {
    const parsed = new URL(rawUrl.trim());
    if (parsed.protocol === "https:") return true;
    if (
      process.env.NODE_ENV !== "production" &&
      parsed.protocol === "http:" &&
      (parsed.hostname === "127.0.0.1" || parsed.hostname === "localhost")
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

interface NotificationLead {
  id: string;
  name: string;
  company: string;
  contact: string;
  department?: string;
  problem: string;
  currentProcess?: string;
  systemsAndDocs?: string;
  expectedOutcome?: string;
  localTime: string;
}

async function sendWeComNotification(lead: NotificationLead): Promise<boolean> {
  const webhookUrl = process.env.WECOM_WEBHOOK_URL?.trim();
  if (!isAllowedWebhookUrl(webhookUrl)) {
    console.warn("[Diagnose API] WECOM_WEBHOOK_URL is not configured or invalid. Skipping WeChat Work notification.");
    return false;
  }

  const safeName = sanitizeWebhookSingleLine(lead.name, 80);
  const safeCompany = sanitizeWebhookSingleLine(lead.company, 150);
  const safeContact = sanitizeWebhookSingleLine(lead.contact, 100);
  const safeDepartment = lead.department ? sanitizeWebhookSingleLine(lead.department, 100) : "未填写";
  const safeSystems = lead.systemsAndDocs ? sanitizeWebhookSingleLine(lead.systemsAndDocs, 300) : "未填写";
  const safeOutcome = lead.expectedOutcome ? sanitizeWebhookSingleLine(lead.expectedOutcome, 300) : "未填写";
  const safeProblem = sanitizeWebhookMultiLine(lead.problem, 2000).replace(/\n+/g, "\n> ");
  const safeProcess = lead.currentProcess
    ? sanitizeWebhookMultiLine(lead.currentProcess, 1500).replace(/\n+/g, "\n> ")
    : "";
  const telUri = sanitizeTelUri(lead.contact);
  const contactDisplay = telUri ? `[${safeContact}](tel:${telUri})` : safeContact;

  const markdownContent = [
    `### 🔔 收到新的业务诊断需求（官网获客）`,
    `> **客户姓名**：<font color="info">${safeName}</font>`,
    `> **所属企业**：**${safeCompany}**`,
    `> **联系方式**：${contactDisplay}`,
    `> **所属部门**：${safeDepartment}`,
    `> **涉及系统/资料**：${safeSystems}`,
    `> **期望达成结果**：${safeOutcome}`,
    ``,
    `**【需要解决的核心业务痛点】**`,
    `> ${safeProblem}`,
    ``,
    safeProcess ? `**【目前处理方式与瓶颈环节】**\n> ${safeProcess}\n` : "",
    `> <font color="comment">提交时间：${lead.localTime} | 线索编号：${lead.id}</font>`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        msgtype: "markdown",
        markdown: {
          content: markdownContent,
        },
      }),
      signal: AbortSignal.timeout(6000),
    });

    const result = await res.json().catch(() => ({}));
    if (res.ok && result.errcode === 0) {
      console.log(`[Diagnose API] WeCom notification delivered for lead ${lead.id}`);
      return true;
    }
    console.error(`[Diagnose API] WeCom notification failed for lead ${lead.id} (status=${res.status}, errcode=${result.errcode ?? "unknown"})`);
    return false;
  } catch {
    console.error(`[Diagnose API] WeCom notification request error for lead ${lead.id}`);
    return false;
  }
}

async function sendFeishuNotification(lead: NotificationLead): Promise<boolean> {
  const feishuUrl = process.env.FEISHU_WEBHOOK_URL?.trim();
  if (!isAllowedWebhookUrl(feishuUrl)) {
    return false;
  }

  const safeName = sanitizeWebhookSingleLine(lead.name, 80);
  const safeCompany = sanitizeWebhookSingleLine(lead.company, 150);
  const safeContact = sanitizeWebhookSingleLine(lead.contact, 100);
  const safeDepartment = lead.department ? sanitizeWebhookSingleLine(lead.department, 100) : "未填写";
  const safeProblem = sanitizeWebhookMultiLine(lead.problem, 2000);
  const safeProcess = lead.currentProcess ? sanitizeWebhookMultiLine(lead.currentProcess, 1500) : "";
  const safeSystems = lead.systemsAndDocs ? sanitizeWebhookSingleLine(lead.systemsAndDocs, 300) : "";
  const safeOutcome = lead.expectedOutcome ? sanitizeWebhookSingleLine(lead.expectedOutcome, 300) : "";

  const cardPayload = {
    msg_type: "interactive",
    card: {
      header: {
        title: {
          tag: "plain_text",
          content: "🔔 收到新的企业业务诊断需求（官网获客）",
        },
        template: "blue",
      },
      elements: [
        {
          tag: "div",
          fields: [
            {
              is_short: true,
              text: { tag: "lark_md", content: `**客户姓名**\n${safeName}` },
            },
            {
              is_short: true,
              text: { tag: "lark_md", content: `**所属企业**\n${safeCompany}` },
            },
            {
              is_short: true,
              text: { tag: "lark_md", content: `**联系方式**\n${safeContact}` },
            },
            {
              is_short: true,
              text: { tag: "lark_md", content: `**所属部门**\n${safeDepartment}` },
            },
          ],
        },
        { tag: "hr" },
        {
          tag: "div",
          text: { tag: "lark_md", content: `**想解决的核心业务痛点：**\n${safeProblem}` },
        },
        ...(safeProcess
          ? [
              {
                tag: "div",
                text: { tag: "lark_md", content: `**目前处理方式与瓶颈：**\n${safeProcess}` },
              },
            ]
          : []),
        ...(safeSystems || safeOutcome
          ? [
              {
                tag: "div",
                fields: [
                  ...(safeSystems
                    ? [
                        {
                          is_short: true,
                          text: { tag: "lark_md", content: `**涉及系统/资料**\n${safeSystems}` },
                        },
                      ]
                    : []),
                  ...(safeOutcome
                    ? [
                        {
                          is_short: true,
                          text: { tag: "lark_md", content: `**期望交付结果**\n${safeOutcome}` },
                        },
                      ]
                    : []),
                ],
              },
            ]
          : []),
        {
          tag: "note",
          elements: [
            {
              tag: "plain_text",
              content: `提交时间：${lead.localTime} | 线索编号：${lead.id}`,
            },
          ],
        },
      ],
    },
  };

  try {
    const res = await fetch(feishuUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardPayload),
      signal: AbortSignal.timeout(6000),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.code === 0) {
      console.log(`[Diagnose API] Feishu card delivered for lead ${lead.id}`);
      return true;
    }

    console.warn(`[Diagnose API] Feishu card failed for lead ${lead.id} (code=${data.code ?? "unknown"}), falling back to text`);
    const fallbackRes = await fetch(feishuUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        msg_type: "text",
        content: {
          text: `【共事官网 · 新业务诊断需求】\n企业：${safeCompany}\n联系人：${safeName} (${safeContact})\n部门：${safeDepartment}\n核心问题：${safeProblem}\n时间：${lead.localTime}\n编号：${lead.id}`,
        },
      }),
      signal: AbortSignal.timeout(4000),
    });
    return fallbackRes.ok;
  } catch {
    console.error(`[Diagnose API] Feishu notification error for lead ${lead.id}`);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const validation = await parseAndValidateDiagnoseRequest(request);
    if (!validation.ok) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: validation.status }
      );
    }

    if (validation.honeypot) {
      return NextResponse.json(
        {
          success: true,
          message: "需求已成功提交！共事业务顾问将在 1 个工作日内与您联系。",
          leadId: `lead_ignored`,
        },
        { status: 200 }
      );
    }

    const { data } = validation;
    const ip = getClientIp(request.headers);

    const rateDecision = diagnoseRateLimiter.check(ip, data.contact, data.problem);
    if (!rateDecision.allowed) {
      const errorMsg =
        rateDecision.reason === "duplicate"
          ? "您已提交过相同内容，请勿重复提交。"
          : "提交过于频繁，请稍后再试。";
      return NextResponse.json(
        { success: false, error: errorMsg },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateDecision.retryAfterSeconds ?? 60),
          },
        }
      );
    }

    const now = new Date();
    const localTime = formatCSTDate(now);
    const leadId = `lead_${now.getTime()}_${crypto.randomBytes(4).toString("hex")}`;
    const userAgent = (request.headers.get("user-agent") || "unknown").slice(0, 300);

    const leadRecord = {
      id: leadId,
      createdAt: now.toISOString(),
      localTime,
      ip,
      userAgent,
      ...data,
    };

    try {
      await persistLeadRecord(leadRecord);
      console.log(`[Diagnose API] Lead persisted (id: ${leadId})`);
    } catch (fsErr) {
      if (fsErr instanceof LeadStorageQuotaError) {
        console.error(`[Diagnose API] Lead storage quota reached (id: ${leadId})`);
        return NextResponse.json(
          {
            success: false,
            error: "系统存储配额已满，请直接联系官方客服或稍后再试。",
          },
          { status: 503 }
        );
      }
      console.error(`[Diagnose API] Failed to persist lead (id: ${leadId})`);
    }

    await sendWeComNotification({
      id: leadId,
      ...data,
      localTime,
    });

    await sendFeishuNotification({
      id: leadId,
      ...data,
      localTime,
    });

    return NextResponse.json(
      {
        success: true,
        message: "需求已成功提交！共事业务顾问将在 1 个工作日内与您联系。",
        leadId,
      },
      { status: 200 }
    );
  } catch {
    console.error("[Diagnose API] Unexpected server error");
    return NextResponse.json(
      {
        success: false,
        error: "服务器处理异常，请稍后重试或直接联系官方客服。",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "API endpoint for business diagnosis leads submission (POST only)." },
    { status: 405 }
  );
}
