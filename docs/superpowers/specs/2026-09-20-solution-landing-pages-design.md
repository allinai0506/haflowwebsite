# 场景解决方案 Landing Page 设计

## 目标

为已有真实业务能力建立 `/solutions` 解决方案层级，首批覆盖智能报价、智能订货预测、标书质量核查，承接行业和商业决策阶段搜索意图。

## 范围

- 新增 `/solutions` 总览页。
- 新增 `/solutions/quote`、`/solutions/order-forecast`、`/solutions/bid-audit` 三个详情页。
- 新增解决方案数据模型与 sitemap 路由。
- 复用现有问题、案例、面包屑、SEO 和 CTA 组件模式。
- 本轮不新增财务资料关联页，不修改既有问题页正文，不虚构客户、价格、效果或排名。

## 信息架构

总览页说明“共事如何围绕具体业务问题交付结果”，并以三张解决方案卡链接详情页。

详情页固定顺序：

1. 页面目标用户与业务问题。
2. 业务输入与典型流程。
3. AI 与人工分工。
4. 现有系统集成与最终交付物。
5. 适用条件与不适用条件。
6. 真实已有指标或明确标注为方案示例测算。
7. 对应问题页、案例页和诊断 CTA。

## 数据边界

`solutions.ts` 只保存页面组织所需的短文案和现有数据引用关系。详细事实继续来自 `PROBLEMS` 与 `CASE_STUDIES`，避免复制后漂移。三页关联关系为：

- quote → `problems/quote`、`cases/automotive-crm`、`cases/freight-quotation`
- order-forecast → `problems/order-forecast`、`cases/store-inventory`
- bid-audit → `problems/bid-audit`、`cases/bid-compliance`

## SEO 与可抓取性

详情页使用 `generateMetadata` 生成独立 Title、Description 和 canonical；页面正文由 Server Component 输出。每页包含 BreadcrumbList，页面可见内容与结构化数据保持一致。sitemap 收录总览页和三个详情页。

## 验收标准

- 四个新 URL 均返回 200。
- 每页只有一个 H1，Title、Description、canonical 唯一。
- 详情页原始 HTML 包含目标用户、输入、流程、人机分工、系统集成、边界、指标和 CTA。
- 每个详情页至少链接一个对应案例和 `/diagnose`。
- sitemap 包含四个新 URL，既有 32 个路由继续可访问。
- `pnpm build` 成功；新增代码的定向 lint 通过。
