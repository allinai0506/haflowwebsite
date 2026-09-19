# 共事智能官网 UI 规范

适用于本仓库（haflowwebsite）全部页面与组件。新增或修改 UI 前先读本文件。

---

## 1. 背景色

**禁止使用黑色 / 深色背景铺底。**

不要用 `bg-black`、`bg-slate-900`、`bg-slate-950`、`bg-zinc-900` 等深色块作为卡片、区块、表头或页面底色。深色块和本站整体的浅色工程感风格格格不入，视觉上像是从别的站点切过来的一块。

**Why:** 2026-09-19 用户明确要求：架构图起点的黑色底块与整体风格冲突，应以 logo 主题色为主。

**How to apply:**

- 需要强调某一块内容时，用**主题色**做底：`bg-gradient-to-r from-blue-600 to-sky-600` 配白色文字；或浅色调 `bg-blue-50 border border-blue-200` 配深色文字。
- 需要"暗部 / 强调"层次时，用**主题色的浅色调**（`bg-blue-50/60`、`bg-slate-50`、`bg-blue-50/50`）加边框，而不是压暗到黑色。
- 确实需要高对比度的深色文字块时，用 `text-slate-950` 做文字色，**不要**做背景色。
- 全站基调：白底（`bg-white`）与极浅灰（`bg-slate-50`）为主，蓝色作为唯一强调色。

> 已知待迁移的深色背景（遵循本规则时应逐步替换，改动前先与用户确认范围）：
> `src/components/OurBeliefBanner.tsx`、`src/components/CaseStoryView.tsx`、
> `src/app/problems/[slug]/page.tsx`、`src/components/CasesClientView.tsx`。

---

## 2. 品牌主题色

设计令牌定义在 `src/app/globals.css` 的 `:root`，取自 logo。

| 令牌 | 值 | 用途 |
| :--- | :--- | :--- |
| `--haflow-blue` | `#2563eb` (blue-600) | 主强调色：按钮、链接、图标、关键卡片 |
| `--haflow-cyan` | `#0284c7` (sky-600/700) | 次强调色，与主色组成渐变 |
| `--signal-emerald` | `#10b981` | 正向信号：成功、已确认、合规 |
| `--ring` | `#10b981` | 焦点环 |

强调色整体克制：一屏内大面积主题色至多一处，其余用蓝色描边（`border-blue-200/300`）与浅蓝底（`bg-blue-50`）表达。

---

## 3. 排版与形状

- **圆角**：区块 `rounded-3xl`，卡片 `rounded-2xl`，卡片内单元 `rounded-xl`，按钮与标签 `rounded-full`。
- **边框**：统一 `border-slate-200`；主题色区块用 `border-blue-200/300`；虚线分组用 `border-dashed`。
- **阴影**：默认 `shadow-xs` / `shadow-2xs`；浮起卡片 `shadow-lg shadow-slate-100`；主题色区块 `shadow-lg shadow-blue-500/25`。
- **字号**：正文 `text-sm`，辅助说明 `text-xs`，卡片内最小文字 `text-[11px]`；分区小标题用 `text-[10px]~text-xs font-mono uppercase tracking-wider` 配主题色。
- **字体**：系统字体栈（含 PingFang SC / 微软雅黑），见 `globals.css`。中英混排时中文在前、英文以 `font-mono` 浅色附后。

---

## 4. 动效

- **签名缓动**：`cubic-bezier(0.22, 1, 0.36, 1)`，全站 80% 的动画都用它。
- **时长**：进场 420~520ms，连接线数据包 720~900ms，卡片 hover 160~180ms。
- **必须分层**：Primary（主体动作）+ Secondary（细节补充）+ Ambient（背景呼吸）。只有一层的动画会显得平。
- **实现方式**：`IntersectionObserver` 观察容器，进入视口时挂 `-live` 类，动画写在 `globals.css`；离开视口挂 `-paused` 暂停常驻动画。
- **降级**：`prefers-reduced-motion` 下必须关掉动画。**基础态必须是完全可见的**，动画起始态只能靠 `animation-fill-mode: backwards` 在播放期生效 —— 这样 JS 未加载时内容依然完整显示。
- 常驻循环动画以 `animation` 简写书写时会把 `animation-play-state` 重置为 `running`，暂停规则需要同等特异性（例如 `.arch-diagram.arch-paused` 而非 `.arch-paused`）才压得住。

---

## 5. 文案语气

克制、具体、不夸大。避免"赋能""颠覆""超级大脑"一类词；用真实业务场景和可验证的结果说话。详见 `README.md` 品牌主张。
