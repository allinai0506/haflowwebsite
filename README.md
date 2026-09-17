# 上海共事智能科技有限公司 · 官方网站

> **不做大系统，只用 AI 帮企业解决一个个具体问题。**
> 中文主张：让人和 Agent 共同把事情做完
> 英文主张：Human + Agent, in Flow.

---

## 品牌与产品层级

| 层级 | 名称 | 定位 |
| :--- | :--- | :--- |
| **公司** | 上海共事智能科技有限公司 | AI Native 应用与人机协同方案提供商 |
| **品牌** | 共事 (GONGSHI AI) | 让人和 Agent 共同把事情做完 |
| **产品** | HAFlow | 人机协同任务执行底层平台 |
| **服务** | AI Native 应用定制落地 | 从一个具体业务痛点开始，做出真实交付结果 |
| **公益入口** | 每月免费培训 | 每周日 11:00 40分钟零基础公益科普，学完自己做也欢迎 |

---

## 页面路由结构

```text
/
├── 首页 (/)                              # 首屏核心定位、交互式推演流水线、4个具体问题卡片、传统软件 vs AI Native、四步走实施方式、双入口
├── 解决具体问题 (/problems)                 # 场景筛选、7项适用特征、具体卡点导航
│   ├── 智能报价 (/problems/quote)          # 跨境货代多维运价与杂费自动比选
│   ├── 智能订货预测 (/problems/order-forecast) # 连锁零售千店千面日订货预测
│   ├── 标书质量核查 (/problems/bid-audit)   # 几百页招标文件穿透核验与废标防范
│   ├── 财务资料关联 (/problems/voucher-link) # 记账凭证与合同发票入库单自动穿透关联
│   └── 历史经验利用 (/problems/knowledge-reuse) # 企业非结构化历史项目经验秒级召回
├── HAFlow 平台 (/haflow)                  # 人机协同任务执行底层平台，8项核心能力，系统集成拓扑与安全合规
├── 实践案例 (/cases)                      # 实事求是案例库（严格采用 9 项严谨业务结构）
│   ├── /cases/voucher-matching            # 近千家分支机构财务单据自动归集
│   ├── /cases/bid-compliance              # 几百页招标文件废标风险穿透核验
│   ├── /cases/store-inventory             # 1,000 家连锁门店鲜品订货量预测（方案示例）
│   └── /cases/freight-quotation           # 一次复杂国际货代报价（方案示例）
├── 每月免费培训 (/training)                 # 4场零基础公益公开课完整大纲、实操任务、真实待接入登记表单、常见问答
├── AI 应用诊断 (/diagnose)                 # 8维度业务诊断框架、在线需求评估表单（真实暂存与快捷复制）
├── 观点与实践 (/insights)                  # 4篇深度工程思考与方法论手记
│   ├── /insights/why-not-rebuild-monoliths # 为什么不主张推倒重来建“大模型平台”
│   ├── /insights/where-rules-cannot-be-hardcoded # 规则写不死的地方才是 AI 着力点
│   ├── /insights/human-agent-division-of-labor # 人和 Agent 怎样分工才不沦为玩具
│   └── /insights/two-week-mvp-methodology # 两周最小验证法
├── 关于共事 (/about)                      # 深入回答 6 个核心问题，阐释为何成立共事与团队价值观
├── 联系我们 (/contact)                    # 顾问微信、官方电话、星光耀广场预约来访通道
├── 动态站点地图 (/sitemap.xml)             # 全站静态与动态路由自动生成
└── 爬虫协议 (/robots.txt)                  # 搜索引擎友好协议
```

---

## 本地启动与构建

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

浏览器打开 `http://localhost:3000` 即可预览。

### 3. 生产构建与静态生成

```bash
pnpm build
pnpm start
```

---

## 内容管理与维护方式

本项目采用“固定页面 + 轻量数据分离”的架构，所有业务场景、案例、课程大纲和文章均存放于 `src/data/` 目录中：

- `src/data/company.ts`：公司名称、Slogan、联系方式、品牌理念、导航配置
- `src/data/problems.ts`：解决具体问题的数据源（5个场景的要素、人机分工、对接系统、FAQ）
- `src/data/cases.ts`：实践案例数据源（严格遵循 9 项结构，包含真实性声明）
- `src/data/training.ts`：每月 4 场免费培训的教学大纲、日程、实操要求与问答
- `src/data/insights.ts`：观点与实践文章内容与提纲

新增案例或修改课程无需重写页面组件，只需修改对应 TS 数据文件即可自动完成静态页面编译与 Sitemap 索引更新。
