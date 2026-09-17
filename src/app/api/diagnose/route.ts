import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

interface DiagnosePayload {
  name: string;
  company: string;
  contact: string;
  department?: string;
  problem: string;
  currentProcess?: string;
  systemsAndDocs?: string;
  expectedOutcome?: string;
  riskAndHumanRole?: string;
}

// 格式化上海本地时间 (CST)
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

// 发送企业微信群机器人 Webhook
async function sendWeComNotification(lead: {
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
}) {
  const webhookUrl = process.env.WECOM_WEBHOOK_URL?.trim();
  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    console.warn("[Diagnose API] WECOM_WEBHOOK_URL is not configured. Skipping WeChat Work notification.");
    return false;
  }

  const markdownContent = [
    `### 🔔 收到新的业务诊断需求（官网获客）`,
    `> **客户姓名**：<font color="info">${lead.name}</font>`,
    `> **所属企业**：**${lead.company}**`,
    `> **联系方式**：[${lead.contact}](tel:${lead.contact.replace(/\D/g, "") || lead.contact})`,
    `> **所属部门**：${lead.department || "未填写"}`,
    `> **涉及系统/资料**：${lead.systemsAndDocs || "未填写"}`,
    `> **期望达成结果**：${lead.expectedOutcome || "未填写"}`,
    ``,
    `**【需要解决的核心业务痛点】**`,
    `> ${lead.problem.replace(/\n+/g, "\n> ")}`,
    ``,
    lead.currentProcess
      ? `**【目前处理方式与瓶颈环节】**\n> ${lead.currentProcess.replace(/\n+/g, "\n> ")}\n`
      : "",
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
      console.log(`[Diagnose API] WeChat Work notification delivered successfully for lead ${lead.id}`);
      return true;
    } else {
      console.error(`[Diagnose API] WeChat Work notification returned error:`, result);
      return false;
    }
  } catch (err) {
    console.error(`[Diagnose API] Failed to deliver WeChat Work notification:`, err);
    return false;
  }
}

// 支持飞书群机器人 Webhook（富文本卡片）
async function sendFeishuNotification(lead: {
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
}) {
  const feishuUrl = process.env.FEISHU_WEBHOOK_URL?.trim();
  if (!feishuUrl || !feishuUrl.startsWith("http")) {
    return false;
  }

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
              text: {
                tag: "lark_md",
                content: `**客户姓名**\n${lead.name}`,
              },
            },
            {
              is_short: true,
              text: {
                tag: "lark_md",
                content: `**所属企业**\n${lead.company}`,
              },
            },
            {
              is_short: true,
              text: {
                tag: "lark_md",
                content: `**联系方式**\n${lead.contact}`,
              },
            },
            {
              is_short: true,
              text: {
                tag: "lark_md",
                content: `**所属部门**\n${lead.department || "未填写"}`,
              },
            },
          ],
        },
        {
          tag: "hr",
        },
        {
          tag: "div",
          text: {
            tag: "lark_md",
            content: `**想解决的核心业务痛点：**\n${lead.problem}`,
          },
        },
        ...(lead.currentProcess
          ? [
              {
                tag: "div",
                text: {
                  tag: "lark_md",
                  content: `**目前处理方式与瓶颈：**\n${lead.currentProcess}`,
                },
              },
            ]
          : []),
        ...(lead.systemsAndDocs || lead.expectedOutcome
          ? [
              {
                tag: "div",
                fields: [
                  ...(lead.systemsAndDocs
                    ? [
                        {
                          is_short: true,
                          text: {
                            tag: "lark_md",
                            content: `**涉及系统/资料**\n${lead.systemsAndDocs}`,
                          },
                        },
                      ]
                    : []),
                  ...(lead.expectedOutcome
                    ? [
                        {
                          is_short: true,
                          text: {
                            tag: "lark_md",
                            content: `**期望交付结果**\n${lead.expectedOutcome}`,
                          },
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
      console.log(`[Diagnose API] Feishu card delivered successfully for lead ${lead.id}`);
      return true;
    } else {
      console.warn(`[Diagnose API] Feishu card failed (${data.msg}), falling back to text`);
      await fetch(feishuUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msg_type: "text",
          content: {
            text: `【共事官网 · 新业务诊断需求】\n企业：${lead.company}\n联系人：${lead.name} (${lead.contact})\n部门：${lead.department || "未填写"}\n核心问题：${lead.problem}\n时间：${lead.localTime}`,
          },
        }),
        signal: AbortSignal.timeout(4000),
      });
      return false;
    }
  } catch (err) {
    console.error(`[Diagnose API] Feishu notification error:`, err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body: Partial<DiagnosePayload> = await request.json();

    const name = body.name?.trim() || "";
    const company = body.company?.trim() || "";
    const contact = body.contact?.trim() || "";
    const problem = body.problem?.trim() || "";
    const department = body.department?.trim() || "";
    const currentProcess = body.currentProcess?.trim() || "";
    const systemsAndDocs = body.systemsAndDocs?.trim() || "";
    const expectedOutcome = body.expectedOutcome?.trim() || "";
    const riskAndHumanRole = body.riskAndHumanRole?.trim() || "";

    // 必填项校验
    if (!name || !company || !contact || !problem) {
      return NextResponse.json(
        {
          success: false,
          error: "请填写完整所有必填项（姓名、企业全称、联系方式、具体问题描述）。",
        },
        { status: 400 }
      );
    }

    const now = new Date();
    const localTime = formatCSTDate(now);
    const leadId = `lead_${now.getTime()}_${Math.random().toString(36).substring(2, 7)}`;

    // 收集访客请求元信息
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const leadRecord = {
      id: leadId,
      createdAt: now.toISOString(),
      localTime,
      ip,
      userAgent,
      name,
      company,
      contact,
      department,
      problem,
      currentProcess,
      systemsAndDocs,
      expectedOutcome,
      riskAndHumanRole,
    };

    // 1. 本地文件安全持久化存盘（即使无网络配置，线索也 100% 不丢）
    try {
      const leadsDir = path.join(process.cwd(), "data", "leads");
      await fs.promises.mkdir(leadsDir, { recursive: true });
      const filePath = path.join(leadsDir, "diagnose_submissions.jsonl");
      await fs.promises.appendFile(
        filePath,
        JSON.stringify(leadRecord) + "\n",
        "utf-8"
      );
      console.log(`[Diagnose API] Lead recorded to local backup: ${filePath} (id: ${leadId})`);
    } catch (fsErr) {
      console.error("[Diagnose API] Failed to write local backup file:", fsErr);
    }

    // 2. 企业微信群机器人即时推送
    await sendWeComNotification({
      id: leadId,
      name,
      company,
      contact,
      department,
      problem,
      currentProcess,
      systemsAndDocs,
      expectedOutcome,
      localTime,
    });

    // 3. （可选）飞书群机器人推送
    await sendFeishuNotification({
      id: leadId,
      name,
      company,
      contact,
      department,
      problem,
      currentProcess,
      systemsAndDocs,
      expectedOutcome,
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
  } catch (error) {
    console.error("[Diagnose API] Server processing error:", error);
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
