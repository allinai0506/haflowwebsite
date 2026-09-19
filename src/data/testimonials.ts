/**
 * 客户证言数据。
 *
 * ⚠️ 发布前必须逐条确认：本文件中的措辞为起草稿，需由真实访谈/回访内容核对后方可上线。
 *    未经客户确认的评价不要对外发布——《反不正当竞争法》第八条对虚假宣传有明确约束，
 *    且与本站「实事求是」「每条结论都有依据」的主张直接冲突。
 *
 * 沿用 src/data/cases.ts 的既定口径（该文件 CaseQuote 的类型注释已写明）：
 *   - 只写角色与层级，不写真实姓名、不写企业名称；
 *   - note 字段交代证言来源与隐去范围，随卡片一并展示，不隐藏边界；
 *   - 每条证言挂 sourceSlug 指回对应案例页，让读者可以自己去看完整过程与数据。
 *
 * 证言中的数字全部取自对应案例已公开的指标，不另造新数据。
 */

export type TestimonialTheme = "efficiency" | "delivery";

export interface Testimonial {
  /** 客户原话（业务现场访谈提炼，非逐字转录） */
  text: string;
  /** 只写角色与层级，不写姓名与公司 */
  role: string;
  /** 行业身份标签，用于卡片头像与副标题 */
  industry: string;
  /** 分组：提效与传统软件之别 / 实施过程顺畅 */
  theme: TestimonialTheme;
  /** 指回对应案例，读者可自行核对完整过程 */
  sourceSlug: string;
  sourceLabel: string;
  /** 佐证数字，取自案例已公开指标 */
  metric?: { value: string; label: string };
  /** 口径边界：这条证言怎么来的、隐去了什么 */
  note: string;
}

export const TESTIMONIAL_THEMES: {
  key: TestimonialTheme;
  title: string;
  summary: string;
}[] = [
  {
    key: "efficiency",
    title: "系统第一次参与判断，而不只是记录",
    summary:
      "过去的管理软件把单据存下来，判断仍然压在人身上；现在同一件事，系统把该算的算完、该挑的挑出来，人只做最后那一下决定。",
  },
  {
    key: "delivery",
    title: "实施过程比过去顺畅",
    summary:
      "不停机、不推倒重来、不先做大改造。在真实业务上先小范围跑通，用实际结果验证过之后再推广。",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  // ---- 提效，以及与传统管理软件的不同 ----
  {
    text: "过去系统把询价单存进数据库就算完事，比价、核价、毛利测算全压在业务员的 Excel 里。现在同一份 RFQ 进来，成本和毛利风险一次算清——它第一次真的参与了判断，而不只是记录。",
    role: "销售本部 总监",
    industry: "日资汽车零部件 Tier-1",
    theme: "efficiency",
    sourceSlug: "automotive-crm",
    sourceLabel: "汽车零部件 CRM 经营系统",
    metric: { value: "15%", label: "报价毛利跑冒滴漏减少" },
    note: "业务现场访谈提炼，隐去客户身份与金额",
  },
  {
    text: "传统标书软件只管排版和目录。真正要命的是那几十条带星号的废标条款有没有漏，这件事过去只能靠人熬夜翻。现在初稿编排提效八成，交标前那一晚终于不用赌运气。",
    role: "投标总监",
    industry: "大型装备制造",
    theme: "efficiency",
    sourceSlug: "bid-compliance",
    sourceLabel: "数智化投标管理平台",
    metric: { value: "95%", label: "废标风险降低" },
    note: "业务现场访谈提炼，隐去客户身份",
  },
  {
    text: "老系统按字符串精确匹配，凭证摘要写「办公耗材」、发票开「A4 纸与碳粉」就直接对不上，最后还是人来翻。现在单据检索从按天算变成按秒算。",
    role: "财务共享中心 主管",
    industry: "大型集团 财税合规",
    theme: "efficiency",
    sourceSlug: "voucher-matching",
    sourceLabel: "数凭电子会计档案交付系统",
    metric: { value: "天 → 秒", label: "单据检索穿透时效" },
    note: "业务现场访谈提炼，隐去客户身份与金额",
  },

  // ---- 实施过程比过去顺畅 ----
  {
    text: "最意外的是实施节奏。过去上 PLM 要先停机、导数据、全厂培训，一拖就是大半年。这次直接在实际新品流程上跑通三个型号，边跑边改，问题在试运行阶段就暴露完了。",
    role: "工艺部长",
    industry: "高端装备制造",
    theme: "delivery",
    sourceSlug: "enterprise-plm",
    sourceLabel: "PLM 研发管理系统",
    metric: { value: "3 个型号", label: "全流程试运行后推广" },
    note: "业务现场访谈提炼，隐去客户身份",
  },
  {
    text: "没有要求我们先关店做改造。30 家标杆店先灰度四周，每天拿实际销量对照它建议得准不准，确认靠谱了才推到剩下那几百家。",
    role: "标杆门店 店长",
    industry: "连锁鲜饮与生鲜零售",
    theme: "delivery",
    sourceSlug: "store-inventory",
    sourceLabel: "智能订货系统",
    metric: { value: "4 周", label: "30 家门店灰度对照" },
    note: "灰度对照门店访谈提炼，隐去品牌名称",
  },
  {
    text: "上线前先把近十万卷库房档案全量实盘核对了一遍，确认档案找得到、借得出、追得回，才让我们切换过来。这种先验证再上线的方式，让整个推进过程比以往任何一次系统更换都顺。",
    role: "全宗主管",
    industry: "综合档案管理",
    theme: "delivery",
    sourceSlug: "enterprise-archive",
    sourceLabel: "综合电子档案管理系统",
    metric: { value: "近 10 万卷", label: "库房全量实测后上线" },
    note: "业务现场访谈提炼，隐去客户身份",
  },
];
