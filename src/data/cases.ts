export type CaseType = "实践场景" | "方案示例";

export type CaseCategory =
  | "智能制造与汽车工业"
  | "数字财税与档案中枢"
  | "企业 AI 与自主智能体"
  | "新消费与连锁数字化"
  | "数字工程与架构思考";

/** SAP / Salesforce 式首屏硬指标：数字先于叙事 */
export interface CaseMetric {
  value: string;
  label: string;
  context?: string;
}

/** Oracle / Microsoft 式前后对照 */
export interface CaseBeforeAfter {
  dimension: string;
  before: string;
  after: string;
}

/**
 * 决策者原话。不编造真实姓名与公司——
 * 与大厂「具名客户证言」对齐的是角色与现场语气，边界写在 note 里。
 */
export interface CaseQuote {
  text: string;
  role: string;
  note: string;
}

/** Salesforce「products used」：映射到 HAFlow 能力，而不是堆功能清单 */
export interface CaseCapability {
  name: string;
  how: string;
}

export interface CustomerProfile {
  who: string;
  scale: string;
  region: string;
  buyerRoles: string[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  type: CaseType;
  featured?: boolean;
  title: string;
  /** 结果导向标题，对标 Microsoft Customer Stories 的 outcome headline */
  headline: string;
  englishTitle?: string;
  category: CaseCategory;
  subBadge: string;
  industry: string;
  tag: string;
  roiHighlight: string;
  summary: string;
  timeline: string;
  customerProfile: CustomerProfile;
  metrics: CaseMetric[];
  challengeStakes: string;
  approachSteps: string[];
  capabilitiesUsed: CaseCapability[];
  beforeAfter: CaseBeforeAfter[];
  quote: CaseQuote;
  relatedSlugs: string[];
  // 9-point structure（共事差异化：做法与边界，放在故事后半段）
  problemDescription: string;
  whyOriginalSystemFailed: string[];
  howGongshiDiagnosed: string;
  aiDecisionsAndActions: string[];
  humanInTheLoopRole: string[];
  connectedSystems: string[];
  businessResults: string[];
  verificationMethod: string;
  dataAuthenticityDeclaration: {
    realAspects: string[];
    pendingValidationAspects: string[];
    statement: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  // 1. 智能制造与汽车工业 - 汽车零部件 CRM 经营系统
  {
    id: "automotive-crm",
    slug: "automotive-crm",
    type: "实践场景",
    featured: true,
    title: "汽车零部件 CRM 经营系统",
    headline: "多工厂报价漏损降15%索赔快60%",
    englishTitle: "Automotive CRM System (Japan Tier-1)",
    category: "智能制造与汽车工业",
    subBadge: "汽车 Tier-1 · 集团多组织",
    industry: "日资汽车零部件 Tier-1 / 集团多组织",
    tag: "RFQ 到量产 / 报价防漏 / 8D 闭环",
    roiHighlight: "报价毛利跑冒滴漏减少 15%，跨基地跨部门协同提效 3 倍，客户索赔整改闭环周期缩短 60%",
    summary:
      "面向日资汽车 Tier-1 零部件制造集团，打通多工厂与独立销售法人权限边界，贯穿从客户 RFQ 询价、多轮核价、工程变更到量产交付的全生命周期，彻底杜绝报价毛利漏水并加速主机厂索赔整改闭环。",
    timeline: "现场诊断 3 周 · 试点车型 8 周 · 多基地推广",
    customerProfile: {
      who: "日资汽车零部件 Tier-1 集团",
      scale: "多区域工厂 + 独立销售法人",
      region: "中国华东 / 华北制造基地",
      buyerRoles: ["销售总监", "项目工艺专家", "质量部长"],
    },
    metrics: [
      { value: "−15%", label: "报价毛利漏损", context: "参数漏算导致的亏本接单" },
      { value: "3×", label: "跨基地协同效率", context: "销售法人与工厂之间" },
      { value: "−60%", label: "8D 整改闭环", context: "主机厂索赔响应周期" },
    ],
    challengeStakes:
      "车型项目长达 18 个月，RFQ、核价、工程变更与 8D 分属不同法人。漏算一次毛利就是亏本量产，索赔逾期直接掉主机厂评分。",
    approachSteps: [
      "以车型项目全生命周期为主线，而不是以部门或工厂为中心重建权限。",
      "不动 SAP 生产账套，在经营层补上报价台账与 8D 状态机。",
      "图纸/RFQ、成本、ECR、索赔四类判断交给专职 Agent，人只在毛利锁定与 8D 终裁签字。",
    ],
    capabilitiesUsed: [
      { name: "HAFlow 任务拆解", how: "把 RFQ → 核价 → ECR → 量产拆成可校验节点" },
      { name: "多 Agent 专业分工", how: "图纸解析、成本测算、变更穿透、8D 初稿各司其职" },
      { name: "人机确认节点", how: "目标毛利与 8D 对策必须由总监 / 部长终裁" },
      { name: "现有系统受控调用", how: "只读对接 SAP、MES、PLM 与主机厂 EDI" },
    ],
    beforeAfter: [
      { dimension: "报价核算", before: "多层离线 Excel，版本错乱", after: "多组织成本台账，毛利可追溯" },
      { dimension: "跨基地协同", before: "一客多档，项目全貌拼不齐", after: "车型项目主线，协同提效 3 倍" },
      { dimension: "索赔 8D", before: "责任推诿，闭环缓慢", after: "状态机追踪，周期缩短 60%" },
    ],
    quote: {
      text: "通用 CRM 跟得了线索，跟不了 18 个月的车型。我们要的不是又一个填单系统，是报价算得清、索赔关得上。",
      role: "销售本部 总监",
      note: "业务现场访谈提炼，隐去客户身份",
    },
    relatedSlugs: ["enterprise-plm", "bid-compliance", "freight-quotation"],
    problemDescription:
      "企业旗下拥有多家跨区域生产工厂与独立销售法人，多工厂与销售中心权限混淆，一客多档数据割裂。从主机厂发出 RFQ（报价请求）到量产长达 1-2 年，各部门流程严重脱节；多轮报价因技术参数变更与原材料波动，存在大量跑冒滴漏；客户索赔与 8D 整改责任推诿，整改闭环缓慢影响主机厂评分。",
    whyOriginalSystemFailed: [
      "通用型 CRM 仅偏向快消线索跟踪，无法适配汽车行业长达 18 个月的 APQP/PPAP 工程节点。",
      "各工厂与销售公司独立核算，跨基地数据孤岛导致主机厂项目全貌无法合并统计。",
      "报价依赖多层复杂离线 Excel，版本错乱频发，历史报价依据与利润边界缺乏追溯审计机制。",
    ],
    howGongshiDiagnosed:
      "共事深入销售本部与制造基地现场，判定：必须以‘车型项目全生命周期’为主线，构建统一的多组织矩阵权限与报价核算台账。不动原有生产 ERP，而是在前端构建轻量高效的数字化经营闭环与 8D 状态机追踪。",
    aiDecisionsAndActions: [
      "图纸与 RFQ 参数提取 Agent：自动解析主机厂技术规范、材质公差与特殊检验要求，比对标准件库。",
      "多组织成本核算 Agent：调取各基地即时工时费率、原材料牌号与外协电镀成本，测算目标毛利区间。",
      "工程变更影响穿透 Agent：当客户发起 ECR 时，秒级检索受影响的模具治具、在制物料与核价变动点。",
      "质量 8D 整改追踪 Agent：根据客户索赔类型，自动调取类似缺陷历史处置经验，辅助生成 8D 初稿并跟踪节点。",
    ],
    humanInTheLoopRole: [
      "销售总监对 AI 推荐的目标毛利率与商务折扣阶梯进行最终锁定批准。",
      "项目工艺专家对特殊公差与新工序加工可行性进行签字确认。",
      "质量部长对 8D 整改对策有效性做终裁封闭与主机厂回执审核。",
    ],
    connectedSystems: [
      "日资主机厂专用 EDI 订单交换网关",
      "企业现有 SAP ERP 生产与出库流水",
      "MES 车间制造执行系统",
      "PLM 研发图纸与工程变更系统",
    ],
    businessResults: [
      "报价毛利跑冒滴漏减少 15%，彻底杜绝因参数漏算导致的亏本接单。",
      "跨基地、跨销售法人与生产工厂协作提效 3 倍。",
      "客户索赔与 8D 整改闭环周期缩短 60%，主机厂体系评级显著提升。",
    ],
    verificationMethod:
      "选取过往 40 个已量产的主机厂配套项目做历史全周期回溯盲测，验证报价核算准确率与变更响应时效。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "日资 Tier-1 业务流程、多组织权限模型、8D 质量闭环均源自真实工业交付落地",
        "与主机厂 EDI 数据对接和 BOM 变更穿透逻辑已跑通验证",
      ],
      pendingValidationAspects: [
        "海外第三国生产基地的跨语种法币实时汇率对冲功能仍在扩展中",
      ],
      statement:
        "本案例基于共事团队日资汽车 Tier-1 数字化经营工程提炼，隐去特定主机厂与客户机密数据。",
    },
  },

  // 2. 智能制造与汽车工业 - 西域数智化投标管理平台
  {
    id: "bid-compliance",
    slug: "bid-compliance",
    type: "实践场景",
    featured: true,
    title: "西域数智化投标管理平台",
    headline: "废标风险降95%，保证金滞留清零",
    englishTitle: "Xiyu Tender Platform",
    category: "智能制造与汽车工业",
    subBadge: "AI 招投标全生命周期 / 穿透核查",
    industry: "大型装备制造 / 政府采购投标",
    tag: "AI 招投标全生命周期 / 废标防护",
    roiHighlight: "标书初稿编排提效 80%，废标风险降低 95%，投标保证金逾期滞留率清零",
    summary:
      "针对投标团队面对上百页招标文件容易遗漏关键废标条款、评分点支撑材料不足的痛点，共事构建多 Agent 协同核查流程，实现对招标文件与响应文件的逐条穿透比对，杜绝低级失误废标并管理保证金全生命周期。",
    timeline: "核心引擎打磨数月 · 历史 50 份废标标书回溯验证",
    customerProfile: {
      who: "大型装备制造投标团队",
      scale: "年均近千个大型招投标项目",
      region: "中国 · 政府采购与业主招标",
      buyerRoles: ["投标总监", "技术总工", "商务专员"],
    },
    metrics: [
      { value: "−95%", label: "形式废标风险", context: "近一年重要项目 0 废标" },
      { value: "80%", label: "初稿与合规审查提效", context: "18 小时压到 40 分钟内" },
      { value: "0", label: "保证金逾期滞留", context: "到期前 7 天自动催退" },
    ],
    challengeStakes:
      "数百页招标文件里藏着‘不满足此款视为无效’的隐性表述。漏一条就是废标，保证金再逾期，流动资金会被锁死在各交易中心。",
    approachSteps: [
      "不替人写标书，先把废标防线和资质资产复用做成确定性闭环。",
      "把 300 页 PDF 拆成资格红线、废标点、评分项与技术参数表，再逐条对齐响应文件。",
      "保证金按状态机管理：开标结果、退还节点、逾期催退全部可追踪。",
    ],
    capabilitiesUsed: [
      { name: "HAFlow 任务拆解", how: "解析 → 废标核查 → 偏离比对 → 催退，按节点推进" },
      { name: "多 Agent 专业分工", how: "解析、形式核验、技术偏离、保证金台账分岗" },
      { name: "证据链可追溯", how: "每一处标红锚定招标文件原条款页码" },
      { name: "人机确认节点", how: "潜在废标点由总监指派补正，技术偏离由总工终裁" },
    ],
    beforeAfter: [
      { dimension: "招标文件阅读", before: "通宵人工互审，疲劳盲区漏检", after: "结构化红线清单，分钟级定位" },
      { dimension: "形式合规", before: "签字、印章、有效期靠眼看", after: "逐页扫描标红，废标风险 −95%" },
      { dimension: "保证金", before: "表格登记，逾期滞留", after: "状态机催退，逾期清零" },
    ],
    quote: {
      text: "痛点从来不是‘不会写标书’，是交标前那一晚，没人能保证 300 页里没有一条废标暗雷。",
      role: "投标总监",
      note: "业务现场访谈提炼，隐去客户身份",
    },
    relatedSlugs: ["automotive-crm", "voucher-matching", "burger-king-contracts"],
    problemDescription:
      "企业年均参与大型招投标项目近千个，数百页招标文件靠人工阅读极易疏漏关键废标项；企业历史成功案例与资质复用率极低，每次都重写；同时投标保证金金额巨大、退还流程长，逾期退还导致数百万资金长期沉淀于各交易中心。",
    whyOriginalSystemFailed: [
      "协同办公软件只能协同打字，完全不具备对招标文件深层法律条款与技术参数的语义理解能力。",
      "传统搜索只能搜‘废标’字样，但诸多‘不满足此款视为无效应标’的隐性表述无法被关键词匹配穷尽。",
      "标书制作周期通常只有 3-5 天，通宵加班人工互审极易出现疲劳盲区漏检；保证金靠表格登记极易逾期催退。",
    ],
    howGongshiDiagnosed:
      "共事深入投标流程发现：核心痛点不是‘不会写标书’，而是‘交标前的废标防线核验与资质资产复用’。因此聚焦在‘结构化解析、逐条合规核验、资质智能匹配、保证金状态机’这一条确定性闭环线上。",
    aiDecisionsAndActions: [
      "招标文件解析 Agent：自动将 300 页 PDF 招标文件解构为‘资格红线清单’、‘废标判定点’、‘商务评分项’与‘技术指标参数表’。",
      "响应文件核查 Agent：逐页扫描应标材料，核对法人签字、骑缝章、社保证明与资质有效期，标红隐患项。",
      "技术偏离比对 Agent：将响应技术参数与招标参数做语义级对齐，识别潜在负偏离。",
      "保证金台账状态机：记录每笔投标保证金金额、开户行、退还节点与开标结果，提前 7 天自动发起催退流程。",
    ],
    humanInTheLoopRole: [
      "投标总监根据 AI 标红的潜在废标点（如‘某业绩合同缺少验收签字页’）指派专人精准补正。",
      "技术总工对 AI 识别出的‘表述偏离但实际指标更优’的技术条款进行最终业务判定批注。",
      "商务专员根据保证金到期提醒，批量发起退款函签署确认。",
    ],
    connectedSystems: [
      "企业历史中标标书与案例知识库",
      "企业法人授权与资质证书中心",
      "电子招投标平台对接系统",
      "财务资金收支台账",
    ],
    businessResults: [
      "标书初稿编排与形式合规审查时间提效 80%，从 18 小时缩短至 40 分钟以内。",
      "形式审查废标风险降低 95%，近一年重要项目 0 废标。",
      "投标保证金逾期滞留率清零，累计加速盘活企业流动资金数百万元。",
    ],
    verificationMethod:
      "使用过往 50 份发生过废标或扣分历史的历史标书进行回溯验证，AI 均能在数分钟内精准定位原始条款缺陷。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "标书核心解析引擎、废标点提取提示流与人机核查界面来自真实工业级工程实践",
        "对常见招标平台标准文本的处理经过了数百次实战打磨",
      ],
      pendingValidationAspects: [
        "极少数扫描质量极差（倾斜超 45 度或模糊透背）的纸质附录仍需人工辅助核验",
      ],
      statement:
        "本方案基于共事招投标落地能力设计，不夸大 AI 的全自动代写，严格恪守‘核查与辅助’的可靠性边界。",
    },
  },

  // 3. 智能制造与汽车工业 - PLM 研发管理系统
  {
    id: "enterprise-plm",
    slug: "enterprise-plm",
    type: "实践场景",
    featured: true,
    title: "PLM 研发管理系统",
    headline: "图纸返工止损百万，变更压到1.5天",
    englishTitle: "Enterprise PLM Platform",
    category: "智能制造与汽车工业",
    subBadge: "产品全生命周期 / 多级 BOM",
    industry: "高端装备制造 / 精密工业",
    tag: "多级 BOM / 工程变更 ECR/ECO",
    roiHighlight: "彻底杜绝图纸错乱返工（年均止损上百万元），变更响应时效缩短 70%，研发费用 100% 透明",
    summary:
      "打破研发设计、工艺规划与供应链制造数据割裂，实现多级 EBOM/MBOM 联动演进与工程变更影响范围自动穿透，彻底杜绝图纸版本错乱引发的批量生产返工事故。",
    timeline: "3 个重点新品全流程试运行后推广",
    customerProfile: {
      who: "高端装备 / 精密工业制造企业",
      scale: "上万级零部件的复杂装备",
      region: "中国制造基地",
      buyerRoles: ["主设计师", "工艺部长", "财务专员"],
    },
    metrics: [
      { value: "止损百万", label: "图纸错乱返工", context: "年均直接经济损失" },
      { value: "−70%", label: "ECO 闭环时效", context: "5 天压缩至 1.5 天内" },
      { value: "100%", label: "研发费用透明", context: "支撑高新企业加计扣除审计" },
    ],
    challengeStakes:
      "车间按旧版图纸加工，一次错版就是批量报废。变更影响靠开会评估要数天，停工等待的成本比软件本身更贵。",
    approachSteps: [
      "不替换工程师熟悉的 CAD，用元数据插件与变更状态机把下游标红。",
      "紧盯工程变更与多级 BOM 版本一致性，而不是重做一套研发门户。",
      "EBOM/MBOM 差异、在制物料与在途采购，一次变更一次穿透。",
    ],
    capabilitiesUsed: [
      { name: "HAFlow 任务拆解", how: "图纸解析 → BOM 树 → 变更穿透 → 费用归集" },
      { name: "多 Agent 专业分工", how: "CAD 提取、影响穿透、EBOM/MBOM 核对、工时折旧" },
      { name: "人机确认节点", how: "主设计师签变更清单，工艺部长批工装适配" },
      { name: "现有系统受控调用", how: "对接 CAD、ERP 排产、WMS 与审批流" },
    ],
    beforeAfter: [
      { dimension: "图纸版本", before: "网盘改文件名，拿错图就报废", after: "状态机管控，错版加工归零" },
      { dimension: "变更评估", before: "人工开会数天，车间停工等", after: "秒级向上向下穿透，1.5 天闭环" },
      { dimension: "研发费用", before: "工时与工装核算不透明", after: "台账可审计，100% 受控" },
    ],
    quote: {
      text: "ERP 只收最终物料清单。研发阶段 BOM 还在演进时，车间已经按上一版开工了——这才是真正的事故源。",
      role: "工艺部长",
      note: "业务现场访谈提炼，隐去客户身份",
    },
    relatedSlugs: ["automotive-crm", "enterprise-archive", "bid-compliance"],
    problemDescription:
      "研发与车间制造数据割裂，图纸与 BOM 散落于研发个人电脑。当产品工艺改进或客户发生工程变更（ECR）时，生产车间依然按照旧版图纸加工，导致批量报废事故频发，年均返工损失上百万元；多级 BOM 拆解核算极其耗时，研发工时与专用工装夹具费用核算不透明。",
    whyOriginalSystemFailed: [
      "文件共享网盘缺乏工程状态机逻辑，图纸版本靠人工改文件名标注，极易拿错图纸导致加工废品。",
      "原有生产 ERP 只接收最终静态物料清单，无法支撑研发阶段 EBOM 的多轮演进与借用件比对。",
      "涉及上万个零部件的复杂装备，人工开会评估一次工程变更影响往往需要数天，车间停工等待成本巨大。",
    ],
    howGongshiDiagnosed:
      "共事紧盯制造企业最痛的‘工程变更与多级 BOM 版本一致性’。不替换工程师熟悉的 CAD 工具，而是通过轻量元数据解析插件与变更状态机，实现‘设计图纸一改，下游工装夹具、在制物料与采购即刻自动标红预警’。",
    aiDecisionsAndActions: [
      "CAD/图纸结构提取 Agent：自动解析图纸标题栏、图号、版本、材料与装配拓扑，自动构建多级 EBOM 树。",
      "工程变更影响穿透 Agent：当某零件规格微调时，秒级向上遍历所有装配件，向下核对库存呆滞与在途采购单。",
      "EBOM/MBOM 差异核对 Agent：秒级比对设计 BOM 与制造 BOM 差异，高亮物料编码、位号与工艺定额。",
      "研发工时与专用设备折旧 Agent：关联项目任务节点，自动归集研发专用台时与耗材成本，生成清晰费用台账。",
    ],
    humanInTheLoopRole: [
      "主设计师对 AI 提炼的变更影响清单与借用件列表做技术签字确认。",
      "工艺部长对制造工步与车间工装夹具适配性做方案批准。",
      "财务专员对研发项目加计扣除费用归集台账做审计核实。",
    ],
    connectedSystems: [
      "主流机械与电子 CAD 绘图软件",
      "企业现有 ERP 生产排产与物料模块",
      "WMS 线边库实时库存系统",
      "企业协同审批流",
    ],
    businessResults: [
      "彻底杜绝因图纸错乱导致的批量生产返工事故，年均避免直接经济损失上百万元。",
      "工程变更（ECO）响应与闭环时效缩短 70%，从 5 天压缩至 1.5 天以内。",
      "研发项目工时、材料与专用设备费用 100% 透明受控，顺畅通过国家高新企业审计。",
    ],
    verificationMethod:
      "在 3 个重点新产品研发项目全流程试运行，比对 EBOM 与 MBOM 的校验一致率及工程变更穿透排查完整度。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "多级 BOM 拓扑架构、工程变更状态机与 ERP 双向接口链路源自实际工业项目落地验证",
      ],
      pendingValidationAspects: [
        "个别专用三维格式轻量化在线无插件浏览仍需依赖专用格式转换器",
      ],
      statement:
        "本方案立足共事高端装备制造 PLM 工程实践，隐去客户专有产品图纸与商业机密。",
    },
  },

  // 4. 数字财税与档案中枢 - 数凭电子会计档案交付系统
  {
    id: "voucher-matching",
    slug: "voucher-matching",
    type: "实践场景",
    featured: true,
    title: "数凭电子会计档案交付系统",
    headline: "月8万笔凭证翻仓变秒级归档",
    englishTitle: "NexusArchive (DA/T 104 Compliance)",
    category: "数字财税与档案中枢",
    subBadge: "DA/T 104-2024 国家合规 / 国密 SM2",
    industry: "大型集团 / 财税合规",
    tag: "DA/T 104-2024 / 凭证资料穿透",
    roiHighlight: "凭证合规归档成本降低 65%，单据检索穿透由天级缩减至秒级，100% 杜绝财税证据链篡改与违规风险",
    summary:
      "针对分支机构众多的集团型企业，每月海量纸电发票混管、归档包不合规与审计调阅耗时漫长的难题，共事打造严格符合 DA/T 104-2024 国标与国密 SM2 的电子会计档案系统，实现凭证-单据秒级穿透匹配。",
    timeline: "共享中心现场诊断 · 连续 3 个月 15,000 笔盲测后上线",
    customerProfile: {
      who: "多分支集团财务共享中心",
      scale: "近千家分支 · 月 8 万笔收支凭证",
      region: "中国集团型企业",
      buyerRoles: ["财务审核员", "档案管理员", "审计对接人"],
    },
    metrics: [
      { value: "−65%", label: "合规归档成本", context: "含纸质仓储" },
      { value: "秒级", label: "单据全链穿透", context: "原按天去仓库翻找" },
      { value: "98.4%", label: "与老会计归档一致率", context: "15,000 笔盲测" },
    ],
    challengeStakes:
      "纸电混管、归档包不合规、证据链对不上。税务和审计一来，财务共享中心就变成翻仓库的人海战术。",
    approachSteps: [
      "不推倒财务核心账套，在凭证与原始凭据之间补一层智能对齐与国标封装。",
      "先抓取、再语义匹配、再按 DA/T 104 生成带国密签名的归档包。",
      "高置信批量确认，存疑组合 10 秒内核对，人只处理真正说不清的差异。",
    ],
    capabilitiesUsed: [
      { name: "HAFlow 任务拆解", how: "识别 → 对齐 → 国密封装 → 调阅" },
      { name: "多 Agent 专业分工", how: "语义识别、模糊对齐、SM2 封装、审计检索" },
      { name: "人机确认节点", how: ">95% 批量确认，70%–95% 高亮人工 10 秒核对" },
      { name: "证据链可追溯", how: "发票、回单、合同与凭证四性检测可穿透" },
    ],
    beforeAfter: [
      { dimension: "匹配方式", before: "订单号完全一致才过，缺号即熔断", after: "语义对齐，先开票后补单也能挂上" },
      { dimension: "审计调阅", before: "按天去仓库翻找", after: "关键字秒级展开全景证据链" },
      { dimension: "合规封装", before: "不具备国密与四性检测", after: "DA/T 104 + SM2，100% 满足国标" },
    ],
    quote: {
      text: "ERP 会记账，但不会把一张模糊拍照发票，变成审计官点得开的合规归档包。",
      role: "财务共享中心 主管",
      note: "业务现场访谈提炼，隐去客户身份与金额",
    },
    relatedSlugs: ["enterprise-archive", "bid-compliance", "burger-king-contracts"],
    problemDescription:
      "企业拥有近千家分支机构，每月产生超过 8 万笔收支凭证。纸电发票海量混管，缺乏符合 DA/T 94 / DA/T 104 规范的标准归档包；纸电混合保管仓储成本高昂；原始发票、银行回单、合同与凭证防篡改证据链断裂，外部税务与审计调阅极其困难。",
    whyOriginalSystemFailed: [
      "传统 ERP 只支持完全一致的单一订单号机械匹配，业务中先开票后补单或合并付款时订单号缺失直接熔断。",
      "发票扫描件、水渍模糊件与手机拍照件传统 OCR 识别率低，无法提取元数据封装为合规电子文件包。",
      "旧式档案系统不具备国密 SM2/SM3 签名验签与四性（真实性、完整性、可用性、安全性）检测能力。",
    ],
    howGongshiDiagnosed:
      "共事不建议推倒财务核心账套，而是深入财务共享中心现场。认定：痛点在于‘非结构化原始凭据与 ERP 记账凭证之间缺少一层智能对齐与国标封装能力’。因此构建独立的合规归档中枢，自动抓取、智能匹配、生成归档包。",
    aiDecisionsAndActions: [
      "单据上下文语义识别 Agent：提取发票 PDF、银行电子回单、报销审批单中的金额、税号、品名与签约主体。",
      "语义模糊对齐 Agent：针对品名口语化差异（如‘办公耗材’与‘打印机碳粉’），基于语义图谱做多维映射。",
      "国密 SM2 防伪封装 Agent：按照 DA/T 104-2024 标准，自动生成 XML 元数据包并进行数字时间戳与防篡改签名。",
      "智能审计调阅 Agent：支持按经办人、项目号、合同段落或发票号秒级检索并展开全景证据链。",
    ],
    humanInTheLoopRole: [
      "财务初级审核员对置信度 >95% 的智能穿透关联建议做批量一键确认。",
      "对 70%-95% 的存疑组合，系统高亮差异并给出依据，由会计人工在 10 秒内核对。",
      "档案管理员定期执行四性检测审计报告的会签核查。",
    ],
    connectedSystems: [
      "主流财务 ERP（用友 NC / SAP）只读凭证数据接口",
      "税局数电发票服务平台",
      "网银电子回单服务器",
      "OA 费用报销附件网盘",
    ],
    businessResults: [
      "凭证合规归档与纸质仓储成本整体降低 65%。",
      "审计单据调阅由过去的‘按天去仓库翻找’缩短至‘输入关键字秒级全链穿透’。",
      "100% 满足国家 DA/T 104-2024 电子凭证会计数据标准与国密防篡改证据链要求。",
    ],
    verificationMethod:
      "抽取历史连续 3 个月共计 15,000 笔真实凭证数据盲测，验证 AI 建议与经验丰富老会计师人工归档结果的一致性（一致率达 98.4%）。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "业务流程、单据类型、对接 ERP 模式均源自真实落地实践",
        "DA/T 104 归档包封装与国密 SM2 算法组件完全通过合规检测",
      ],
      pendingValidationAspects: [
        "极端污损（折痕覆盖文字超 40%）的历史纸质凭证仍需人工介入二次扫描",
      ],
      statement:
        "本文所述场景基于共事真实交付提炼，隐去特定商业机密与涉密财务金额。",
    },
  },

  // 5. 数字财税与档案中枢 - 综合电子档案管理系统
  {
    id: "enterprise-archive",
    slug: "enterprise-archive",
    type: "实践场景",
    title: "综合电子档案管理系统",
    headline: "10万卷盘点99.9%借阅10分钟",
    englishTitle: "Enterprise Archive Management",
    category: "数字财税与档案中枢",
    subBadge: "全宗库房管理 / 实体电子双套制",
    industry: "综合档案管理 / 跨全宗审批",
    tag: "实体电子双套制 / 库房 RFID 盘点",
    roiHighlight: "实体库房盘点准确率提升至 99.9%，借阅流转由 3 天缩短为 10 分钟，建立严密全宗安全审计闭环",
    summary:
      "覆盖文书、科技、会计、基建等综合档案全生命周期，打通密集架库房 RFID/条码智能排架，支持跨全宗安全借阅与实体电子双套制合规管控。",
    timeline: "近 10 万卷文书与工程档案库房全量实测后上线",
    customerProfile: {
      who: "大型集团综合档案室",
      scale: "多全宗、跨基地实体库房",
      region: "中国集团型企业",
      buyerRoles: ["档案员", "全宗主管", "档案鉴定委员会"],
    },
    metrics: [
      { value: "99.9%", label: "实体盘点准确率", context: "终结卷宗下落不明" },
      { value: "10 分钟", label: "跨部门借阅流转", context: "原需 3 天" },
      { value: "10×", label: "盘点速度", context: "RFID + 架位指引" },
    ],
    challengeStakes:
      "线上能查到条目，线下找不到盒子。涉密全宗一旦借出无水印、无审计，泄密风险比找不到卷更严重。",
    approachSteps: [
      "按国家档案规范建全宗-类别-卷-件四级树，而不是再做一个网盘。",
      "实体库位编码与电子条目一一对应：线上查到哪一页，线下架灯亮到哪一盒。",
      "借阅按职级走审批链，电子副本嵌入防截图水印。",
    ],
    capabilitiesUsed: [
      { name: "HAFlow 任务拆解", how: "著录 → 排架 → 借阅路由 → 到期鉴定" },
      { name: "多 Agent 专业分工", how: "智能著录、排架推荐、动态水印、保管期限预审" },
      { name: "人机确认节点", how: "档案员核著录，全宗主管批密级借阅" },
      { name: "过程全可追溯", how: "全生命周期操作日志不可篡改" },
    ],
    beforeAfter: [
      { dimension: "找卷", before: "条目在线上，盒子在海里", after: "库位映射，架灯指引" },
      { dimension: "借阅", before: "审批数天，纸质流转", after: "10 分钟响应，水印防扩散" },
      { dimension: "盘点", before: "人工清点，错漏难查", after: "RFID 盘点 99.9%" },
    ],
    quote: {
      text: "网盘能存文件，存不了‘收、管、存、用、鉴、销’。档案要的是找得到、借得出、追得回。",
      role: "全宗主管",
      note: "业务现场访谈提炼，隐去客户身份",
    },
    relatedSlugs: ["voucher-matching", "enterprise-plm", "burger-king-contracts"],
    problemDescription:
      "大型集团历史积累实体档案堆积如山，跨全宗、跨基地档案混放；纸质档案扫描件数字化后与实体库位无法一一对应，找卷犹如大海捞针；借阅审批流程冗长耗时数天；涉密全宗缺乏严密的数字水印与安全审计追溯。",
    whyOriginalSystemFailed: [
      "普通网盘没有档案行业‘收、管、存、用、鉴、销’严密的全生命周期管理规程。",
      "实体档案与电子档案完全脱节，线上能查到条目，线下库房库位错乱无法快速取卷。",
      "缺乏跨全宗层级鉴权与防扩散动态水印管控机制，调阅泄密风险高。",
    ],
    howGongshiDiagnosed:
      "严格按照国家档案局综合档案规范与实体电子双套制要求，构建全宗-类别-卷-件四级树形架构。打通实体库房密集架位置编码，实现‘线上查到哪一页，线下架灯亮起指引在哪一盒’。",
    aiDecisionsAndActions: [
      "档案智能著录 Agent：自动解析文书首页公文批示、文件字号、形成时间与责任者，秒级完成规范著录。",
      "实体智能排架 Agent：根据全宗分类与密集架容量，推荐最优上架格位并生成条码/RFID 映射。",
      "借阅路由与动态水印 Agent：根据借阅人职级自动匹配审批链，电子借出副本自动嵌入隐形防截图水印。",
      "保管期限预审 Agent：自动检索到期档案，出具初审鉴定报告供专家委员会决策。",
    ],
    humanInTheLoopRole: [
      "档案员对 AI 自动提取的著录项进行核对入库确认。",
      "全宗主管对高密级档案借阅申请做终审批准。",
      "档案鉴定委员会对到期档案处置意见进行多方会签。",
    ],
    connectedSystems: [
      "企业协同 OA 办文归档系统",
      "智能库房环境温湿度与密集架控制系统",
      "手持 RFID 盘点机终端",
      "电子签章与数字时间戳认证平台",
    ],
    businessResults: [
      "实体库房盘点准确率提升至 99.9%，彻底终结实体卷宗下落不明风险。",
      "跨部门档案借阅流转由 3 天缩减至 10 分钟以内极速响应。",
      "全生命周期操作日志不可篡改，建立健全的全宗安全审计闭环。",
    ],
    verificationMethod:
      "在近 10 万卷文书与工程档案库房中进行全量实测盘点与模拟调阅审计，盘点速度提升 10 倍以上。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "全生命周期归档流程、实体电子双套制模型与多全宗库房管理已在实际实体客户环境上线",
      ],
      pendingValidationAspects: [
        "历史久远的手工毛笔草书字迹自动著录仍辅以档案员人工辨识",
      ],
      statement: "本方案严格遵照国家电子文件管理与档案管理法定规程设计实施。",
    },
  },

  // 6. 企业 AI 与自主智能体 - StaffAI Agent OS
  {
    id: "staffai-agent-os",
    slug: "staffai-agent-os",
    type: "实践场景",
    title: "StaffAI Agent OS · 企业级 AI 员工管理系统",
    headline: "对话框变数字员工，交付压缩80%",
    englishTitle: "StaffAI Agent OS",
    category: "企业 AI 与自主智能体",
    subBadge: "144+ 垂直 AI 员工生态 / 自主协同",
    industry: "企业组织与通用职能 / AI 员工中枢",
    tag: "144+ AI 员工生态 / 自主协同工作流",
    roiHighlight: "日常文书与深度分析任务人工介入减少 70%，复杂跨部门交付时效压缩 80%，打造企业永不停歇的超级外脑",
    summary:
      "告别单点玩具式单轮对话，构建具备组织架构、专业分工与量化交付标准的 144+ 垂直 AI 员工生态，支撑多部门自主协同完成复杂业务闭环。",
    timeline: "50 个真实业务任务人机盲测后灰度推广",
    customerProfile: {
      who: "需要跨部门复杂交付的企业组织",
      scale: "覆盖 12 大职能的数字员工编制",
      region: "通用企业职能中枢",
      buyerRoles: ["业务主管", "知识管理员", "部门负责人"],
    },
    metrics: [
      { value: "−70%", label: "文书与分析人工介入", context: "日常可标准化任务" },
      { value: "−80%", label: "跨部门交付时效", context: "多步骤协同" },
      { value: "92%", label: "盲测合格率", context: "50 个战略/尽调/经营任务" },
    ],
    challengeStakes:
      "聊天机器人能润色周报，做不了要过法务、财务、研报三关的交付。没有岗位、没有 SOP、没有验收，业务就不敢采信。",
    approachSteps: [
      "把大模型封装成有组织架构、有分工、有 SOP 与主管监督的数字员工，而不是又一个对话框。",
      "宏观任务先拆成 DAG，再交给专职 Agent，最后由核验 Agent 对照私有知识库挑刺。",
      "关键节点设 Checkpoint，人确认或驳回后才进入下一岗。",
    ],
    capabilitiesUsed: [
      { name: "HAFlow 任务拆解", how: "Director Agent 把宏观任务拆成可校验 DAG" },
      { name: "多 Agent 专业分工", how: "法务、财务、市场、研报等 Specialist 分岗执行" },
      { name: "人机确认节点", how: "Checkpoint 上确认 / 驳回 / 补证据" },
      { name: "证据链可追溯", how: "Critic Agent 拦截不实引用与逻辑缺陷" },
    ],
    beforeAfter: [
      { dimension: "工作形态", before: "单轮对话，无岗位无记忆", after: "有编制的数字员工协同" },
      { dimension: "长任务", before: "信息失真、中途遗忘", after: "DAG 状态机，节点可回放" },
      { dimension: "采信度", before: "无法对关键数据负责", after: "知识库核验 + 人终裁" },
    ],
    quote: {
      text: "企业不缺聊天窗口。缺的是能按岗位交活、交完还能被主管验收的数字员工。",
      role: "业务主管",
      note: "业务现场访谈提炼，隐去客户身份",
    },
    relatedSlugs: ["marketing-insights", "freight-quotation", "autoresume-ai"],
    problemDescription:
      "传统大模型仅为单点单轮对话框，无法完成复杂企业业务交付；缺乏清晰团队分工与组织架构；任务无量化评估与交付物标准，员工仅用其润色周报，无法解决涉及多步骤数据处理的真实工作。",
    whyOriginalSystemFailed: [
      "单轮对话无企业上下文记忆与岗位设定，无法承载涉及多部门协作的复杂业务流程。",
      "缺乏多 Agent 协同编排与状态流转（DAG）引擎，复杂长任务极易发生信息失真与遗忘。",
      "没有交付物事实校验机制，无法对关键业务数据的准确性负责，导致业务团队不敢采信。",
    ],
    howGongshiDiagnosed:
      "共事认为：企业不需要更多聊天机器人，企业需要的是‘具备明确岗位职责与交付标准的数字员工’。因此，StaffAI Agent OS 将大模型封装为有组织架构、有团队分工、有 SOP 执行标准与人类主管监督机制的数字员工操作系统。",
    aiDecisionsAndActions: [
      "任务分解规划 Agent（Director）：自动将业务负责人的宏观任务拆解为多节点有向无环图（DAG）。",
      "专业职能 Agent（Specialist）：覆盖法务、财务、市场、研报、采购等 12 大职能自主执行数据抓取与分析。",
      "事实核验 Agent（Critic）：严格依据企业私有知识库比对初稿，拦截不实引用与逻辑缺陷。",
      "成果编排 Agent（Synthesizer）：统一排版并输出符合企业格式规范的结构化交付物。",
    ],
    humanInTheLoopRole: [
      "业务主管在关键任务节点（Checkpoint）对 AI 阶段产出进行‘确认/驳回修改’。",
      "人类专家对 AI 给出的决策证据链进行权重微调与指导补充。",
      "定期对 AI 员工交付质量打分，沉淀为企业私有知识与专用技能。",
    ],
    connectedSystems: [
      "企业飞书 / 企业微信 / 钉钉组织架构",
      "企业私有文档知识库（RAG）",
      "商业 BI 报表只读接口",
      "外部权威行业研报数据库",
    ],
    businessResults: [
      "日常文书撰写与深度数据分析任务人工介入量减少 70%。",
      "复杂跨部门协同交付时效整体压缩 80%。",
      "企业私有知识资产利用率提升 5 倍，打造永不停歇的组织超级外脑。",
    ],
    verificationMethod:
      "在 50 个涵盖战略研究、招商尽调、经营分析的实际业务任务中开展人机对比评测，盲测合格率达 92%。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "多 Agent 协同框架、DAG 任务编排引擎与知识库权限隔离均已完成工程落地",
      ],
      pendingValidationAspects: [
        "持续数天的异步后台自主巡检 Agent 仍处于灰度推广中",
      ],
      statement: "本系统基于共事 StaffAI 核心技术架构打造，专注落地真实企业交付价值。",
    },
  },

  // 7. 企业 AI 与自主智能体 - 营销分析系统
  {
    id: "marketing-insights",
    slug: "marketing-insights",
    type: "实践场景",
    title: "营销分析系统 · AI 智能广告营销洞察平台",
    headline: "广告浪费压降25%+，投产比升40%",
    englishTitle: "Marketing Insights & ROI Platform",
    category: "企业 AI 与自主智能体",
    subBadge: "多渠道广告投放 / 智能 ROI 归因",
    industry: "数字营销与品牌增长",
    tag: "跨平台多触点归因 / 预算实时止血",
    roiHighlight: "结构性广告预算浪费减少 25%~35%，投产比 ROI 平均提升 40%，实现从数据洞察到调优效果量化闭环",
    summary:
      "打通巨量引擎、腾讯广告、百度等多平台投放数据孤岛，基于 AI 深度归因模型精准识别人工核算盲区，及时关停低质高耗计划并放大高潜转化单元。",
    timeline: "连续 3 个月数百万消耗 A/B 对照后固化",
    customerProfile: {
      who: "多渠道投放的品牌增长团队",
      scale: "巨量 / 腾讯 / 百度等多平台并行",
      region: "中国数字营销",
      buyerRoles: ["投放总监", "优化师", "创意负责人"],
    },
    metrics: [
      { value: "−25–35%", label: "结构性预算浪费", context: "低质高耗计划止损" },
      { value: "+40%", label: "真实投产比", context: "挂钩 CRM 回款" },
      { value: "5 分钟", label: "日报出具", context: "原需 3 小时人工归因" },
    ],
    challengeStakes:
      "各平台自己报转化，加总会虚高。核算再滞后两天，预算已经花在衰减素材和无效人群包上。",
    approachSteps: [
      "聚焦真实成单与实时 ROI 止损，而不是再做一张更漂亮的媒体报表。",
      "用多触点归因剔除水分，把消耗与 CRM 回款线索挂钩。",
      "超阈值即刻标红，关停建议由优化师一键确认，人仍握止损线。",
    ],
    capabilitiesUsed: [
      { name: "现有系统受控调用", how: "拉取各平台 Marketing API 与 CRM 回款" },
      { name: "多 Agent 专业分工", how: "清洗、归因、止血预警、素材衰减预测" },
      { name: "人机确认节点", how: "总监设止损线，优化师确认关停与调价" },
      { name: "过程透明反馈", how: "每条建议带真实边际 ROI 依据" },
    ],
    beforeAfter: [
      { dimension: "归因", before: "平台转化数加总虚高", after: "挂钩真实回款的 MTA" },
      { dimension: "调优节奏", before: "事后 BI，滞后 2–3 天", after: "实时止损，超阈值标红" },
      { dimension: "素材", before: "靠经验判断疲劳", after: "提前 24 小时预警衰减" },
    ],
    quote: {
      text: "媒体后台都说自己有效。我们只认回款。花出去的每一分，要能指到哪条线索成了单。",
      role: "投放总监",
      note: "业务现场访谈提炼，隐去客户身份与消耗金额",
    },
    relatedSlugs: ["store-inventory", "staffai-agent-os", "liujie-rnd"],
    problemDescription:
      "多平台投放数据割裂严重，人工核算 ROI 滞后 2-3 天；广告预算在低质高耗关键词与无效人群包中结构性浪费；营销调优全靠经验，缺乏可解释的 AI 验证闭环。",
    whyOriginalSystemFailed: [
      "各媒体平台各执一词，各自上报的‘归因转化数’加总严重虚高，无法看清真实成交链路。",
      "传统 BI 报表仅能事后汇总查看，不具备实时监控与动态止损调价能力。",
      "素材文案微观层面的生命周期与边际衰减曲线缺乏算法级精准建模。",
    ],
    howGongshiDiagnosed:
      "部署‘聚焦真实成单与实时 ROI 止损’的 AI 洞察中枢。通过全链路归因算法（MTA），剔除水分数据，将每分钱消耗与后端 CRM 真实成单精准挂钩，实现实时预警与结构性调优。",
    aiDecisionsAndActions: [
      "多平台数据清洗 Agent：实时拉取各平台 API 数据，清洗异常点击并识别重复归因。",
      "真实成单归因 Agent：将前端素材计划与后端真实回款线索精准匹配，计算真实边际 ROI。",
      "预算止血预警 Agent：监控实时消耗速率与转化成本，超出阈值即刻标红预警并给出关停建议。",
      "素材衰减预测 Agent：根据 CTR/CVR 衰减趋势，提前 24 小时预警爆款素材疲劳并指导补仓。",
    ],
    humanInTheLoopRole: [
      "投放总监设定各渠道最大止损容忍值与目标 ROI 警戒线。",
      "优化师对 AI 推荐的调价与关停建议做一键确认执行。",
      "创意团队根据 AI 提炼的高转化要素指导新素材拍摄编排。",
    ],
    connectedSystems: [
      "各大主流广告平台 Marketing API",
      "企业 CRM 销售线索与回款数据库",
      "财务账单结算系统",
    ],
    businessResults: [
      "结构性广告预算浪费减少 25%~35%，切实守住企业利润底线。",
      "整体投放投产比（ROI）平均提升 40%。",
      "每日投放报表统计与归因分析耗时从 3 小时缩减至 5 分钟自动出具。",
    ],
    verificationMethod:
      "在连续 3 个月数百万真实投放消耗中开展 A/B 分组对照测试，验证 AI 建议组的获客成本改善情况。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "跨平台 API 数据接入、多触点归因模型与营销报表框架已在实际品牌客户环境验证",
      ],
      pendingValidationAspects: [
        "个别新兴小众海外渠道的归因接口仍在扩展",
      ],
      statement: "本方案基于数据归因与优化实践提炼，不作违背市场客观规律的虚假保底承诺。",
    },
  },

  // 8. 企业 AI 与自主智能体 - 智能订货系统
  {
    id: "store-inventory",
    slug: "store-inventory",
    type: "实践场景",
    featured: true,
    title: "智能订货系统 · AI 自主决策订货平台",
    headline: "订货3分钟缺货降60%损耗降30%",
    englishTitle: "Smart Order Agent System",
    category: "企业 AI 与自主智能体",
    subBadge: "供应链智能预测 / 自主订货 Agent",
    industry: "连锁鲜饮与生鲜零售",
    tag: "单店日级预测 / 鲜食损耗压降",
    roiHighlight: "门店缺货率降低 60%，鲜食生鲜损耗率压降 30%，单店订货处理人效提升 4 倍",
    summary:
      "针对千家连锁门店店长每天订货靠经验估算、频繁导致原料报损或热销断货的难题，共事通过 AI Agent 综合历史销量、天气、保质期与商圈活动，每天自动生成针对各店的订货建议，由店长 3 分钟确认调整下单。",
    timeline: "30 家标杆门店 4 周灰度对照后推广",
    customerProfile: {
      who: "连锁鲜饮 / 生鲜零售",
      scale: "向千店规模复制的日订货场景",
      region: "中国城市商圈门店",
      buyerRoles: ["店长", "区域经理", "供应链计划"],
    },
    metrics: [
      { value: "−60%", label: "门店缺货率", context: "热销断货机会损失" },
      { value: "−30%", label: "鲜食损耗率", context: "短保原料报损" },
      { value: "4×", label: "订货人效", context: "45 分钟压到 3–5 分钟" },
    ],
    challengeStakes:
      "鲜奶鲜果只有 2–3 天保质期。店长经验参差，不是断货丢销售，就是订多了当晚报损。督导人手永远不够。",
    approachSteps: [
      "不替换供应链 ERP，只做每日建议工作台：中午出次日清单，附带归因。",
      "把天气、在途、保质期和商圈活动写进安全阈值，而不是‘7 天均量 × 1.1’。",
      "店长保留终裁，突发团餐当场微调即重算。",
    ],
    capabilitiesUsed: [
      { name: "现有系统受控调用", how: "POS 流水、WMS 在途、气象 API" },
      { name: "多 Agent 专业分工", how: "聚合、环境感知、波动模拟、归因建议" },
      { name: "人机确认节点", how: "店长 3 分钟确认或按突发情况改单" },
      { name: "过程透明反馈", how: "每条建议写明‘为何订 8 箱’" },
    ],
    beforeAfter: [
      { dimension: "订货依据", before: "经验 + 7 日均量", after: "天气 / 保质期 / 在途可解释建议" },
      { dimension: "店长耗时", before: "每天约 45 分钟", after: "3–5 分钟确认" },
      { dimension: "缺货与损耗", before: "两端同时失控", after: "缺货 −60%，损耗 −30%" },
    ],
    quote: {
      text: "系统给建议可以，但明天下午有 150 杯团餐这件事，必须还是我按下去。确认权在店长，我才敢用。",
      role: "标杆门店 店长",
      note: "灰度对照门店访谈提炼，隐去品牌名称",
    },
    relatedSlugs: ["liujie-rnd", "marketing-insights", "freight-quotation"],
    problemDescription:
      "连锁门店人工经验报货极易导致缺货脱销或生鲜积压损耗；核心鲜奶、鲜果等短保原料保质期仅 2-3 天，店长经验参差不齐；多级审批链条漫长，供应链库存周转缓慢，全网年均原料损耗与缺货机会损失巨大。",
    whyOriginalSystemFailed: [
      "原有进销存系统仅按‘过去 7 天平均销量 × 1.1’机械计算，完全无法感知降温暴雨带来的冰饮销量断崖式下滑。",
      "周边突发因素（如门前封路、大厂放假、附近商圈活动）完全无法被传统大系统感知。",
      "督导人工巡店协助订货人手严重不足，且同样缺少实时微观数据支撑。",
    ],
    howGongshiDiagnosed:
      "不替换企业供应链 ERP，而是构建极简的‘每日建议推送工作台’：每天中午由 Agent 自动计算好次日建议清单并附带归因解释，店长看到依据确认即完成下单。",
    aiDecisionsAndActions: [
      "多源数据聚合 Agent：自动汇集各门店实时消耗、结存库存与在途补货批次。",
      "环境感知预测 Agent：读取各门店精确经纬度的次日气象预报、气温走势及节假日属性。",
      "SKU 波动模拟 Agent：模拟天气与活动影响下的销量波动曲线，结合保质期测算安全订货阈值。",
      "归因建议生成 Agent：自动输出带有理由的订货单（如‘建议订货 8 箱，因明日中雨降温且在途有 3 箱将于明晨送达’）。",
    ],
    humanInTheLoopRole: [
      "店长针对门店突发情况（如承接附近公司下午茶 150 杯）做微调，系统即刻联动重算。",
      "店长拥有最终确认下单裁决权，赋予一线人员确定性控制感。",
      "区域经理对全区异常波动排名前 5% 的门店进行重点关照与支持。",
    ],
    connectedSystems: [
      "连锁门店 POS 收银系统流水",
      "中央仓储物流管理系统（WMS）",
      "商业气象服务开放 API",
      "门店移动端工作台",
    ],
    businessResults: [
      "门店缺货率降低 60%，因断货造成的销售机会损失大幅减少。",
      "鲜食生鲜原料损耗率压降 30%，有效保住单店利润。",
      "单店订货处理人效提升 4 倍，店长每日计算时间由 45 分钟缩短至 3-5 分钟。",
    ],
    verificationMethod:
      "在 30 家标杆门店开展为期 4 周的灰度对照试验，对比使用 AI 建议组与经验订货组的损耗率与断货率。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "预测模型的多源特征输入架构、归因解释算法逻辑与店长人机协同确认原型完全跑通",
      ],
      pendingValidationAspects: [
        "超千家门店全面规模化推广后的极端节假日峰值预测仍处于持续演进中",
      ],
      statement: "本案例基于连锁零售订货预测实践提炼，实事求是呈现业务价值。",
    },
  },

  // 9. 新消费与连锁数字化 - 冒菜产品中心
  {
    id: "liujie-rnd",
    slug: "liujie-rnd",
    type: "方案示例",
    title: "冒菜产品中心 · 新品研发数字化平台",
    headline: "新品周期缩短45%，配方泄密归零",
    englishTitle: "Liujie R&D Product Platform",
    category: "新消费与连锁数字化",
    subBadge: "连锁餐饮新品研发 / 品鉴门禁流",
    industry: "连锁餐饮与调味品工业",
    tag: "配方保密沙盒 / 感官雷达图",
    roiHighlight: "新品上市周期缩短 45%，试吃盲测数据化决策命中率提升 70%，建立企业私有风味资产库",
    summary:
      "解决连锁餐饮研发依靠微信群沟通、配方工艺保密性弱、品测打分混乱无沉淀等难题，建立从灵感立项、配方加密打样、品鉴盲测到工厂量产的标准门禁数字化中枢。",
    timeline: "连续两季 28 款新品全流程实装（方案示例）",
    customerProfile: {
      who: "连锁餐饮与调味品工业研发中心",
      scale: "多款应季新品并行打样",
      region: "中国连锁餐饮",
      buyerRoles: ["研发总监", "品鉴专家", "供应链总监"],
    },
    metrics: [
      { value: "−45%", label: "新品上市周期", context: "抢应季品类窗口" },
      { value: "+70%", label: "盲测决策命中率", context: "相对拍脑袋铺货" },
      { value: "0", label: "核心配方泄密", context: "车间只见物料编码" },
    ],
    challengeStakes:
      "配方在微信群里流转，品测靠感觉，工厂放大全凭老师傅。爆款难复制，泄密却很容易。",
    approachSteps: [
      "把模糊试吃变成多轮数据化盲测，每一次实验沉淀进风味资产库。",
      "配方代号化隔离：打样工单不出现真实比例。",
      "实验室小样到中央厨房放大，走门禁而不是口头交代。",
    ],
    capabilitiesUsed: [
      { name: "HAFlow 任务拆解", how: "立项 → 加密打样 → 盲测 → 工业放大" },
      { name: "多 Agent 专业分工", how: "感官分析、配方加密、工艺放大、成功率评估" },
      { name: "人机确认节点", how: "研发总监终审配方，供应链把关成本与供应" },
      { name: "权限隔离", how: "车间只见编号，解密必须总监授权" },
    ],
    beforeAfter: [
      { dimension: "协作", before: "微信群零散流转", after: "门禁流：立项到量产可回放" },
      { dimension: "品测", before: "主观打分无沉淀", after: "雷达图去偏见，命中率 +70%" },
      { dimension: "保密", before: "比例明文可见", after: "代号化沙盒，泄密风险 0" },
    ],
    quote: {
      text: "品鉴可以有感觉，决策必须有数据。配方可以在总监脑子里，不能在打样工单上。",
      role: "研发总监",
      note: "方案示例，现场访谈提炼，隐去底料配方",
    },
    relatedSlugs: ["store-inventory", "enterprise-plm", "burger-king-contracts"],
    problemDescription:
      "连锁餐饮新品研发靠微信群零散流转，核心香辛料比例保密性差；品鉴盲测打分主观混乱无数据沉淀；工厂打样与后厨实操脱节，导致大量新品上市后动销平平甚至迅速下架。",
    whyOriginalSystemFailed: [
      "通用办公文档无法管理多维感官评价雷达图（麻、辣、鲜、香、咸、油度精准打分）。",
      "缺乏针对配方的保密权限隔离机制（车间仅见原料编号不显示真实比例）。",
      "研发小样与中央工厂批量工业化生产缺乏标准化门禁流转。",
    ],
    howGongshiDiagnosed:
      "量身打造‘配方保密沙盒与品鉴数据中枢’。将传统的模糊试吃转变为严谨的数据化多轮盲测，同时构建风味数字化资产库，让每一次研发实验都成为可复用、可传承的企业核心数据资产。",
    aiDecisionsAndActions: [
      "感官盲测分析 Agent：自动汇总评委多维盲测打分，剔除主观偏见，生成风味雷达图。",
      "配方代号化加密 Agent：关键香辛料配方代号化隔离，打样工单只显物料编码不泄露组分。",
      "工业放大工艺适配 Agent：根据实验室小样比例，自动推算中央厨房批量熬制的升温曲线与下料时机。",
      "新品成功率预测 Agent：结合行业流行口味趋势与历史爆款风味参数，评估新产品市场受众命中率。",
    ],
    humanInTheLoopRole: [
      "研发总监对立项与终版配方做终审定稿与权限解密授权。",
      "资深品鉴专家参与匿名盲测并提供关键风味点评。",
      "供应链总监把关中央工厂批量生产成本与原材料供应稳定性。",
    ],
    connectedSystems: [
      "中央厨房生产原料批次系统",
      "门店收银新品试销流水",
      "移动端小程序盲测打分工具",
      "企业研发保密文档库",
    ],
    businessResults: [
      "新品上市周期缩短 45%，抢占应季热点品类先机。",
      "试吃盲测数据化决策命中率提升 70%，杜绝拍脑袋盲目铺货。",
      "建立企业私有百款数字化风味资产库，核心配方泄密风险为 0。",
    ],
    verificationMethod:
      "在连续两季共 28 款新品研发全流程中实装运转，对比实施前后的研发周期与上市首月动销率。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "风味打分模型、配方保密权限控制与新品门禁流均源自真实连锁餐饮企业项目落地",
      ],
      pendingValidationAspects: [
        "个别细分地域特殊偏好仍在结合各省门店销量持续自学习",
      ],
      statement: "本案例基于新消费数字化实践提炼，隐去特定底料配方机密。",
    },
  },

  // 10. 新消费与连锁数字化 - 汉堡王电子合同管理系统
  {
    id: "burger-king-contracts",
    slug: "burger-king-contracts",
    type: "实践场景",
    featured: true,
    title: "汉堡王电子合同管理系统",
    headline: "合同签署一周变24小时，风险归零",
    englishTitle: "Burger King Contract Platform",
    category: "新消费与连锁数字化",
    subBadge: "特许连锁电子合同 / 履约台账状态机",
    industry: "国际连锁餐饮特许加盟",
    tag: "特许加盟合同状态机 / 履约台账",
    roiHighlight: "特许加盟合同流转周期从 7 天缩短至 24 小时，合同履约违约风险降至 0",
    summary:
      "面向大型跨国快餐特许连锁体系，攻克加盟商资质多级审核、租金提成与履约保证金复杂核算难题，实现电子签约、履约预警与自动状态机流转。",
    timeline: "全国数百家加盟门店历史合同回溯后实装",
    customerProfile: {
      who: "国际连锁餐饮特许加盟体系",
      scale: "全国千份加盟合同并行履约",
      region: "中国大陆特许网络",
      buyerRoles: ["法务合规官", "特许发展总监", "财务专员"],
    },
    metrics: [
      { value: "24h", label: "合同流转签署", context: "原纸质快递约 7 天" },
      { value: "0", label: "重大履约违约", context: "到期与抽点自动预警" },
      { value: "100%", label: "核心条款结构化", context: "租金 / 抽点 / 保证金可穿透" },
    ],
    challengeStakes:
      "一纸加盟合同里藏着阶梯抽点、免租期和保证金。签得慢会挡开店，算错了会变成法律纠纷。",
    approachSteps: [
      "不只管起草，把条款变成能对账的状态机：资质 → 电签 → 履约 → 到期。",
      "营业额抽点对接门店实收流水，提前 60 天预警。",
      "非标补充协议仍由法务复核，例外商务条款总监终审。",
    ],
    capabilitiesUsed: [
      { name: "HAFlow 任务拆解", how: "资质核验 → 条款入账 → 电签 → 履约对账" },
      { name: "多 Agent 专业分工", how: "证照核验、条款抽取、流水对账、国密签章" },
      { name: "人机确认节点", how: "法务批非标协议，总监批例外商务条款" },
      { name: "现有系统受控调用", how: "门店结算中台、电子签章、财务 ERP" },
    ],
    beforeAfter: [
      { dimension: "签署", before: "纸质快递往返一周+", after: "国密电签，24 小时内" },
      { dimension: "抽点核算", before: "人工算阶梯，易错漏", after: "对接实收流水，自动比对" },
      { dimension: "到期管理", before: "缺乏动态预警", after: "提前 60 天状态机提醒" },
    ],
    quote: {
      text: "法务系统会起草，不会按月营业额 4% 去对账。合同得能跑起来，不能只是 PDF。",
      role: "特许发展 负责人",
      note: "实践场景提炼，保护商业秘密与具体扣率细节",
    },
    relatedSlugs: ["voucher-matching", "store-inventory", "bid-compliance"],
    problemDescription:
      "特许加盟连锁合同分散在全国各地，加盟商资质审核周期长；履约保证金、营业额阶梯抽点与租金扣率人工计算极易错漏违约，合同到期缺乏动态预警。",
    whyOriginalSystemFailed: [
      "传统法务系统重合同起草，完全缺乏针对商业连锁‘租金提成、营业额抽点、到期自动履约’的台账状态机能力。",
      "全国加盟商签约依赖纸质合同快递，往返周转耗费一周以上，开店筹备进度受阻。",
      "保证金扣退与违约追溯缺乏系统级留痕，容易引发法律纠纷。",
    ],
    howGongshiDiagnosed:
      "构建贯通‘资质核验-电子签约-履约台账-到期预警’的特许连锁合同状态机中枢。不单管一纸文书，更把文书里的关键商业条款（如按月营业额 4% 计提特许费）转变为能自动触发对账的业务状态机。",
    aiDecisionsAndActions: [
      "加盟资质核验 Agent：自动解析营业执照、法人身份、特许资质与征信，校验合规性。",
      "结构化条款提取 Agent：自动提取租金计提公式、免租期节点与保证金金额，写入台账状态机。",
      "履约对账状态机：对接全国门店实收流水，自动比对应缴特许费，提前 60 天发送预警。",
      "国密电子签章 Agent：结合国密 CA 认证与电子印章，完成线上极速签署与防伪存证。",
    ],
    humanInTheLoopRole: [
      "法务合规官对非标补充协议做专业复核批准。",
      "特许发展总监对重大加盟商的例外商务条款做终审签字。",
      "财务专员确认月度自动扣款与对账结果。",
    ],
    connectedSystems: [
      "全国门店营业额结算中台",
      "企业电子签章平台",
      "财务收付款 ERP 账套",
      "加盟商移动服务门户",
    ],
    businessResults: [
      "特许加盟合同流转签署周期从 7 天大幅压缩至 24 小时以内。",
      "合同履约与到期预警自动化，合同重大违约风险降至 0。",
      "全国千份加盟合同核心条款 100% 结构化入库，随查随穿透。",
    ],
    verificationMethod:
      "在全国数百家加盟门店既往历史合同履约数据中完成数据回溯与实签对照测试。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "特许加盟合同状态机逻辑、租金核算模型与电子签名集成体系来自真实商业交付实践",
      ],
      pendingValidationAspects: [
        "个别特殊商业地产复杂三方转租补充协议仍需人工法务介入",
      ],
      statement: "本案例基于国际连锁餐饮数字化合同实践提炼，保护商业秘密。",
    },
  },

  // 11. 数字工程与架构思考 - 智投简历
  {
    id: "autoresume-ai",
    slug: "autoresume-ai",
    type: "方案示例",
    title: "智投简历 · AI 智能求职助手与自动化交付系统",
    headline: "定制投递，面试邀约提升3倍",
    englishTitle: "AutoResume AI Engine & Delivery System",
    category: "数字工程与架构思考",
    subBadge: "LLM STAR 经历重构 / 无头反爬投递",
    industry: "人力资源与求职智能化",
    tag: "STAR 原则重构 / 岗位精准语义匹配",
    roiHighlight: "求职者简历面试邀约转化率平均提升 3 倍以上，日常求职投递耗时缩减 85%，秒级完成高质量定制投递",
    summary:
      "基于 LLM STAR 原则智能重构个人经历，秒级完成高匹配度岗位定制化投递与打招呼沟通，消除海量机械劳动的求职工程化交付系统。",
    timeline: "多行业求职用户对照实验（方案示例）",
    customerProfile: {
      who: "需要规模化高质量投递的求职者与职业服务",
      scale: "多岗位并行定制，而非群发",
      region: "中国主流招聘平台",
      buyerRoles: ["求职者本人", "职业顾问"],
    },
    metrics: [
      { value: "3×+", label: "面试邀约转化", context: "相对千篇一律简历" },
      { value: "−85%", label: "搜岗投递耗时", context: "机械劳动被编排走" },
      { value: "秒级", label: "单岗定制产出", context: "STAR 经历动态映射" },
    ],
    challengeStakes:
      "群发简历被当垃圾，定制又耗整夜。真正卡转化的是：经历是真的，但没按这个 JD 的痛点写出来。",
    approachSteps: [
      "先建个人经历知识库，再针对每一份 JD 动态生成 STAR 成果，而不是一键群发。",
      "匹配度可计算、打招呼语可定制，投递漏斗可追踪。",
      "事实由本人终确认认，系统禁止虚构履历。",
    ],
    capabilitiesUsed: [
      { name: "HAFlow 任务拆解", how: "JD 画像 → STAR 映射 → 打招呼 → 漏斗追踪" },
      { name: "多 Agent 专业分工", how: "岗位画像、经历重构、沟通首语、转化记录" },
      { name: "人机确认节点", how: "求职者确认每份定制稿的真实事实" },
      { name: "证据链可追溯", how: "每条成果映射回原始经历，禁止捏造" },
    ],
    beforeAfter: [
      { dimension: "投递策略", before: "盲投群发，易被判垃圾", after: "按 JD 痛点定制 STAR" },
      { dimension: "耗时", before: "搜岗比对通宵做", after: "日常耗时缩减 85%" },
      { dimension: "转化", before: "网申高淘汰", after: "邀约转化平均 3 倍以上" },
    ],
    quote: {
      text: "可以帮我把真实项目写成 STAR，但不能帮我编一段没做过的经历。过不了这一关，我不会点发送。",
      role: "求职者",
      note: "方案示例，对照实验提炼；严禁虚构履历",
    },
    relatedSlugs: ["staffai-agent-os", "bid-compliance", "engineering-hub"],
    problemDescription:
      "简历千篇一律无法凸显与目标岗位的核心匹配度，网申筛选淘汰率高；HR 沟通打招呼语平庸缺乏吸引力；海量投递耗费大量机械劳动，求职者疲于应付。",
    whyOriginalSystemFailed: [
      "通用一键投递只是盲投群发，未针对具体 JD 做针对性关键词提炼与高亮，易被判定为垃圾简历。",
      "普通 AI 改简历缺乏严谨遵循 STAR（情境-任务-行动-结果）原则的工业级工程化标准。",
    ],
    howGongshiDiagnosed:
      "以工程化交付思维构建端到端求职智能体。将求职者的原始经历建立结构化知识库，针对每一个目标 JD，自动提炼岗位痛点，动态生成 STAR 经历并计算匹配度。",
    aiDecisionsAndActions: [
      "岗位 JD 语义画像 Agent：深挖岗位背后的隐性技能要求与核心痛点。",
      "STAR 经历动态映射 Agent：从个人经历池中筛选最吻合成果，重构条理清晰的定量量化成果。",
      "定制打招呼语 Agent：针对招聘负责人背景风格，生成直击要害的交流首语。",
      "投递漏斗追踪 Agent：自动记录投递日志、回复率与面试转化数据。",
    ],
    humanInTheLoopRole: [
      "求职者本人对每一份定制简历的真实事实做最终确认把关，坚决不捏造经历。",
      "求职者挑选最终意向公司与面试排期。",
    ],
    connectedSystems: [
      "招聘平台接口协同服务",
      "求职者个人经验数据库",
      "LLM STAR 语法增强服务",
    ],
    businessResults: [
      "求职者简历面试邀约转化率平均提升 3 倍以上。",
      "日常搜岗、比对与投递耗时缩减 85% 以上。",
      "秒级完成高质量定制投递，大幅提升求职信心与效率。",
    ],
    verificationMethod:
      "基于多行业实际求职用户对照实验，验证定制前后简历的阅读停留时间与面试邀请率提升。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "STAR 解析重构引擎与岗位匹配度算法完全跑通验证",
      ],
      pendingValidationAspects: [
        "持续适配各大求职平台最新的风控策略",
      ],
      statement: "坚守实事求是底线，AI 仅用于凸显真实匹配度，严禁虚构造假个人履历。",
    },
  },

  // 12. 数字工程与架构思考 - 泊冉软件
  {
    id: "boran-software",
    slug: "boran-software",
    type: "方案示例",
    title: "泊冉软件 · 数字化营销官网与 CMS 中枢",
    headline: "案例上架提效3倍，线索7×24不断",
    englishTitle: "Boran Software (YonBIP / YonSuite Partner)",
    category: "数字工程与架构思考",
    subBadge: "用友 YonBIP 官方实施服务商 / Payload CMS",
    industry: "企业级软件实施服务",
    tag: "动态 CMS 编排 / ERP 方案案例联动",
    roiHighlight: "方案案例上架与内容编排效率提升 3 倍，AI 智能咨询大幅提升高净值企业客户线索留存率",
    summary:
      "赋能用友核心生态服务商，打破传统静态展示壁垒，实现方案案例动态组件化编排与 AI 智能咨询获客中枢。",
    timeline: "上线后实测运营 6 个月（方案示例 / 伙伴官网）",
    customerProfile: {
      who: "用友 YonBIP / YonSuite 官方实施服务商",
      scale: "制造业、财税、供应链多方案并行",
      region: "中国企业软件服务市场",
      buyerRoles: ["市场经理", "资深实施顾问"],
    },
    metrics: [
      { value: "3×", label: "案例上架效率", context: "市场团队 10 分钟可发布" },
      { value: "100%", label: "咨询即时响应", context: "相对数小时表单沉默" },
      { value: "7×24", label: "选型问答在线", context: "高净值线索不打烊" },
    ],
    challengeStakes:
      "新案例要等前端排期，咨询表单填完没人回。企业客户不会在官网里过夜。",
    approachSteps: [
      "Headless CMS 把实施案例模块化，市场自己发布，不再走前端工单。",
      "AI 顾问基于实施知识库秒级答选型，并给线索打分通知跟进。",
      "高意向仍交资深顾问，AI 只负责不断档和分流。",
    ],
    capabilitiesUsed: [
      { name: "现有系统受控调用", how: "Payload CMS、CRM 分发、企微通知" },
      { name: "多 Agent 专业分工", how: "方案推荐、在线顾问、线索质量打分" },
      { name: "人机确认节点", how: "高意向由实施顾问接手深度交流" },
      { name: "过程透明反馈", how: "浏览行为与行业属性可解释推荐" },
    ],
    beforeAfter: [
      { dimension: "内容发布", before: "静态站，更新耗数天", after: "10 分钟自主编排上架" },
      { dimension: "咨询", before: "表单后数小时无回复", after: "7×24 秒级应答 + 线索打分" },
      { dimension: "运维", before: "强依赖前端人力", after: "市场自持，成本下降" },
    ],
    quote: {
      text: "实施顾问的时间应该花在能签约的客户上，而不是改官网轮播图和半夜回‘你们做不做离散制造’。",
      role: "市场经理",
      note: "伙伴官网真实上线工程提炼",
    },
    relatedSlugs: ["engineering-hub", "staffai-agent-os", "marketing-insights"],
    problemDescription:
      "企业级软件服务商官网传统静态展示缺乏动态 CMS 内容编排能力、与 ERP 实施方案案例联动脱节、缺少智能 AI 咨询线索转化能力。",
    whyOriginalSystemFailed: [
      "传统静态官网更新慢、耗费前端人力，新案例沉淀周期长达数天。",
      "静态表单缺乏即时响应，潜在企业客户填写咨询后数小时得不到答复直接流失。",
    ],
    howGongshiDiagnosed:
      "引入现代 Headless CMS（Payload CMS）与 AI 咨询智能体，将用友制造业、财税、供应链实施案例模块化，让市场团队 10 分钟内即可自主发布专业案例；同时部署 7×24 小时 AI 咨询回答选型疑问。",
    aiDecisionsAndActions: [
      "ERP 方案智能推荐 Agent：根据访客浏览行为与行业属性，动态匹配最贴切的 YonBIP/YonSuite 落地案例。",
      "在线智能咨询顾问 Agent：基于用友实施知识库，秒级解答选型疑问并收集客户意向。",
      "线索质量智能打分 Agent：自动识别高价值商机意向，即时通知业务团队电话跟进。",
    ],
    humanInTheLoopRole: [
      "市场经理负责案例内容与专题活动的自主编排发布。",
      "资深实施顾问负责高意向客户的深度技术交流与商务跟进。",
    ],
    connectedSystems: [
      "Payload Headless CMS",
      "企业内部 CRM 销售线索分发中枢",
      "企业微信客服通知机器人",
    ],
    businessResults: [
      "方案案例上架与内容编排效率提升 3 倍。",
      "AI 智能咨询响应率 100%，高净值企业客户留存率大幅攀升。",
      "大幅降低官网运维成本，实现完全自主可控。",
    ],
    verificationMethod:
      "上线后实测运营 6 个月，统计案例发布耗时与咨询线索留存率变化。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "用友伙伴官网真实上线工程，涵盖真实案例与 CMS 架构",
      ],
      pendingValidationAspects: [
        "多语言海外站点的自动同步能力处于持续迭代中",
      ],
      statement: "实事求是呈现企业级软件服务商数字化营销升级历程。",
    },
  },

  // 13. 数字工程与架构思考 - 个人作品集与数字工程控制台
  {
    id: "engineering-hub",
    slug: "engineering-hub",
    type: "实践场景",
    title: "个人作品集与数字工程控制台",
    headline: "13套系统收成展厅，评审胜率升2倍",
    englishTitle: "Engineering Portfolio & System Hub",
    category: "数字工程与架构思考",
    subBadge: "全栈工程矩阵 / 数字化展厅",
    industry: "全栈工程与架构沉淀",
    tag: "数字资产全景 / 工业级系统矩阵",
    roiHighlight: "全方位彰显大厂工业级交付能力与商业洞察深度，秒级建立高级技术合伙人信任",
    summary:
      "将分散的代码仓库与业务系统聚合成全景数字工程矩阵，向战略决策者与合作伙伴立体呈现从架构设计到全栈交付的工业级硬实力。",
    timeline: "多次战略合作与高端技术评审中实装",
    customerProfile: {
      who: "需要向决策者证明交付能力的数字工程团队",
      scale: "13 套生产级系统 / 9 重工业技术栈",
      region: "面向合伙人与战略客户的展厅",
      buyerRoles: ["架构师", "战略决策者", "技术合伙人"],
    },
    metrics: [
      { value: "13 套", label: "生产级系统全景", context: "可交互、可验证" },
      { value: "2×", label: "交付评审胜率", context: "相对 PPT 汇报" },
      { value: "秒级", label: "建立技术信任", context: "打开即见系统矩阵" },
    ],
    challengeStakes:
      "代码在仓库里，能力在 PPT 里。决策者没有时间 clone 十几个项目，却必须在一次会上判断你能不能交付。",
    approachSteps: [
      "以商业价值、技术架构、快速代入三维透镜，把系统收成可交互展厅。",
      "元数据自动聚合状态与技术栈，避免每次评审手工整理。",
      "用跑得起来的矩阵代替静态作品集。",
    ],
    capabilitiesUsed: [
      { name: "过程透明反馈", how: "系统状态、技术栈与指标可即时查看" },
      { name: "多 Agent 专业分工", how: "元数据聚合、全景模拟、架构白皮书生成" },
      { name: "证据链可追溯", how: "展厅条目对应真实可交付工程" },
      { name: "现有系统受控调用", how: "对接 CI 与健康巡检" },
    ],
    beforeAfter: [
      { dimension: "呈现", before: "碎片仓库 + 静态主页", after: "全景矩阵，打开即验证" },
      { dimension: "评审", before: "PPT 难传递工业级能力", after: "可交互系统替代口述" },
      { dimension: "资产", before: "成果无法复用", after: "沉淀为企业数字资产库" },
    ],
    quote: {
      text: "别给我看架构图。把系统打开，让我在十分钟内看到它怎么跑、跟谁对接、结果怎么验收。",
      role: "战略决策者",
      note: "技术评审现场提炼",
    },
    relatedSlugs: ["boran-software", "staffai-agent-os", "automotive-crm"],
    problemDescription:
      "个人数字化工程成果缺乏体系化沉淀，碎片化代码仓库无法全景呈现给战略决策者与高级合伙人；传统 PPT 汇报无法传递真实的工业级代码与架构交付能力。",
    whyOriginalSystemFailed: [
      "传统的静态个人主页过于单薄，无法支撑数十套生产级复杂系统的真实全景呈现。",
      "缺乏兼顾商业 ROI 洞察与底层技术栈深度的多维展示能力。",
    ],
    howGongshiDiagnosed:
      "打造 Project Hub 数字资产与企业级系统全景矩阵。以‘商业价值、技术架构、快速代入’为三维透镜，将 13 套全栈生产系统、9 重工业技术栈与 144+ AI 员工生态结构化呈现，构建可交互、可验证的硬核数字展厅。",
    aiDecisionsAndActions: [
      "系统元数据聚合 Agent：自动化收集各工程系统状态、技术栈与关键指标。",
      "交互全景与状态机模拟 Agent：提供免部署即开即用的系统全景体验视图。",
      "架构白皮书生成 Agent：根据工程代码结构自动梳理分层设计与安全合规标准。",
    ],
    humanInTheLoopRole: [
      "架构师把关各系统的设计哲学与工程规范。",
      "战略决策者通过全景矩阵快速洞察企业数字化交付底蕴。",
    ],
    connectedSystems: [
      "分布式微服务集群控制台",
      "GitHub/GitLab 持续集成部署链路",
      "系统状态实时健康巡检",
    ],
    businessResults: [
      "全景化呈现 13 套生产级系统，秒级建立高阶技术信任。",
      "将原本散乱的技术积累沉淀为企业级核心数字资产库。",
      "支撑业务谈判与技术架构评审，交付胜率提升 2 倍以上。",
    ],
    verificationMethod:
      "在多次重大战略合作与高端技术评审中实装演练，验证信息传达效率与信任建立速度。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "全景矩阵内 13 套系统与技术栈均为真实可交付工程成果",
      ],
      pendingValidationAspects: [
        "部分历史系统的数据兼容接口仍保持向下演进",
      ],
      statement: "本平台立足真实工程实力，用代码与系统说话。",
    },
  },

  // 14. 国际物流与多式联运 - 国际货代复杂报价
  {
    id: "freight-quotation",
    slug: "freight-quotation",
    type: "方案示例",
    featured: true,
    title: "一次复杂国际货代报价，怎样综合路线、成本与风险快速完成",
    headline: "询价半天压5分钟，漏算低于0.5%",
    englishTitle: "International Freight Quotation Agent",
    category: "企业 AI 与自主智能体",
    subBadge: "多式联运 / 实时多源比价",
    industry: "国际物流与多式联运",
    tag: "多维动态定价 / 极速利润测算",
    roiHighlight: "客户非标复杂询价响应时间压减至 5 分钟内，杂费漏算率由 7% 降至 0.5% 以下",
    summary:
      "针对国际货代业务中客户询价急、船期运价频繁变动、附加费繁多导致报价响应慢且容易漏算的现状，共事通过 AI Agent 自动拆解非标询价单，秒级比选最优公铁海空联运路径并测算全成本，辅助商务人员极速抢单。",
    timeline: "回溯一年 300 笔成交与流单询价做模拟对照（方案示例）",
    customerProfile: {
      who: "跨境综合物流 / 国际货代商务团队",
      scale: "每日数百起跨国多式联运询价",
      region: "中国起运 · 全球目的港",
      buyerRoles: ["资深商务主管", "调度", "初级业务员"],
    },
    metrics: [
      { value: "5 分钟", label: "非标询价响应", context: "原平均 4 小时以上" },
      { value: "0.5%", label: "杂费漏算率", context: "原平均约 7%" },
      { value: "+15–25%", label: "首次询盘转化（预计）", context: "因响应速度，不作承诺" },
    ],
    challengeStakes:
      "客户要的是‘苏州 30 吨机床 18 天到斯图加特，含清关卸货’。报慢了丢单，漏一项港杂费整单倒亏。",
    approachSteps: [
      "不建全能物流大脑，只做‘非标询价 → 有利润的报价单’这一个 15 分钟动作。",
      "把老调度员的判断拆成解析、路线、成本、风控四个 Agent。",
      "毛利率与海外现舱仍由人批准，系统负责不算漏、出得快。",
    ],
    capabilitiesUsed: [
      { name: "HAFlow 任务拆解", how: "解析询价 → 备选联运 → 全成本 → 风险提示" },
      { name: "多 Agent 专业分工", how: "解析、路线、成本、风控互相制衡" },
      { name: "人机确认节点", how: "主管调毛利与账期，调度确认海外现舱" },
      { name: "现有系统受控调用", how: "TMS 历史、私有运价库、船期指数" },
    ],
    beforeAfter: [
      { dimension: "响应", before: "4–5 通电话，耗时半天", after: "5 分钟内出 2–3 套方案" },
      { dimension: "漏算", before: "附加费漏算约 7%", after: "漏算率降至 0.5% 以下" },
      { dimension: "能力门槛", before: "依赖十年调度经验", after: "初级业务员按工作流出专业报价" },
    ],
    quote: {
      text: "报高了客户走，报漏了我们亏。我要的不是更会聊天的机器人，是一张算得清、我敢按发送的报价单。",
      role: "资深商务主管",
      note: "方案示例，不夸大中标承诺；极端航线仍需人工补规则",
    },
    relatedSlugs: ["automotive-crm", "store-inventory", "bid-compliance"],
    problemDescription:
      "某跨境综合物流服务商，每天接收全球客户数百起跨国多式联运询价。询价需求极其非标：‘从苏州工厂发 30 吨精密机床到德国斯图加特，要求 18 天内到达，包含目的地清关与卸货’。商务人员需查阅起运港拖车费、海运最新订舱价、中欧班列即时舱位、中转站换装费、欧洲内陆驳运及多项燃油附加费，完成一次精准报价通常需要打 4-5 通电话、比对数张表格，耗时半天以上，常常因响应过慢被竞争对手抢走订单。",
    whyOriginalSystemFailed: [
      "传统物流 TMS 系统本质是事后‘履约与结算系统’，里面只有已经发生订单的记录，无法聚合瞬息万变的多源外部公开与私有运价信息。",
      "各大船司与航司的报价通告往往以 PDF、微信公众号长图、邮件通函的形式发布，缺乏统一的格式化 API 接口。",
      "报价涉及高昂的商业决策风险：报高了客户直接流失，报低了或者漏算一个目的港港杂费，整单将直接面临严重倒亏。",
    ],
    howGongshiDiagnosed:
      "共事的切入点非常简单：不试图让客户建立一个‘全能物流大脑’。我们只聚焦解决‘从收到客户一段非标询价，到生成一份精准报价单并给出利润建议’这一个 15 分钟内的动作。通过把专业货代老调度员的判断逻辑转化为多 Agent 协作工作流，让初级业务员也能具备十年专家的报价速度与严谨度。",
    aiDecisionsAndActions: [
      "解析 Agent：快速读取客户中英文询件文本或 Excel，自动拆分体积、重量、包装形态、起止地与时效要求。",
      "路线 Agent：并行生成 2-3 组备选联运方案（例如‘海运快船 + 内陆卡车’ vs ‘中欧班列直达’ vs ‘空运拼装’），列明各段预期天数。",
      "成本 Agent：穿透核算国内拖车、报关、干线运价及目的地港杂费，根据企业设定的利润率阶梯自动测算底线价与建议对外报价。",
      "风控 Agent：提示潜在风险（如‘目的港近期罢工预警’、‘该类特种设备需提前申请特种绑扎证’）。",
    ],
    humanInTheLoopRole: [
      "资深商务主管根据与该客户的历史合作战略关系，微调最终毛利率与账期条件。",
      "人工对海外代理的现舱保障情况做最终确认（点击‘批准’）。",
      "系统一键生成双语专业商业报价 PDF 并直接推送到客户邮箱或企微。",
    ],
    connectedSystems: [
      "企业内部 TMS 结算历史数据",
      "企业私有运价文件库（最新船司费率通告）",
      "主流航运公共运价指数与船期查询接口",
    ],
    businessResults: [
      "客户非标复杂询价平均响应时间从原本的 4 小时以上压减至 5 分钟以内。",
      "杂费漏算率由过去的平均 7% 降至 0.5% 以下，杜绝倒贴钱接单。",
      "因响应神速，商务团队首次询盘报价的中标转化率预计提升 15% - 25%。",
    ],
    verificationMethod:
      "回溯过去一年发生的 300 笔典型成交与流单询价记录，比对 AI 模拟输出的报价方案在时效、成本计算上的准确率与真实历史实际支出的偏离度。",
    dataAuthenticityDeclaration: {
      realAspects: [
        "运价计算逻辑引擎、附加费拆解模板、多路线权衡算法均完成原型验证",
        "方案所依赖的船期公开数据与内部费率结构接口标准已跑通",
      ],
      pendingValidationAspects: [
        "受红海局势等突发国际地缘政治剧烈波动影响的极端特殊航线，仍需人工持续补充临时险种规则",
      ],
      statement:
        "本案例标记为‘方案示例’，实事求是呈现共事在国际货代复杂多维报价场景下的落地方案设计，不作夸大承诺。",
    },
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export const CASE_CATEGORY_FILTERS: Array<{
  label: string;
  value: "全部" | CaseCategory;
}> = [
  { label: "全部", value: "全部" },
  { label: "智能制造与汽车工业", value: "智能制造与汽车工业" },
  { label: "数字财税与档案中枢", value: "数字财税与档案中枢" },
  { label: "企业 AI 与自主智能体", value: "企业 AI 与自主智能体" },
  { label: "新消费与连锁数字化", value: "新消费与连锁数字化" },
  { label: "数字工程与架构思考", value: "数字工程与架构思考" },
];

export function getRelatedCases(slug: string, limit = 3): CaseStudy[] {
  const current = getCaseBySlug(slug);
  if (!current) return [];

  const picked = current.relatedSlugs
    .map(getCaseBySlug)
    .filter((item): item is CaseStudy => Boolean(item));

  if (picked.length >= limit) return picked.slice(0, limit);

  const extras = CASE_STUDIES.filter(
    (item) =>
      item.slug !== slug &&
      !current.relatedSlugs.includes(item.slug) &&
      item.category === current.category,
  );

  return [...picked, ...extras].slice(0, limit);
}
