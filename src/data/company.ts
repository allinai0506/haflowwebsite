export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const COMPANY_INFO = {
  name: "上海共事智能科技有限公司",
  shortName: "共事智能",
  brand: "共事",
  brandEn: "GONGSHI AI",
  product: "HAFlow",
  sloganZh: "让人和 Agent 共同把事情做完",
  sloganEn: "Human + Agent, in Flow.",
  corePositioning: "不做大系统，只用 AI 帮企业解决一个个具体问题。",
  heroDescription:
    "传统软件帮助企业建立了数字化管理的基础。AI 的发展，让软件进一步具备理解、分析和参与复杂任务执行的能力。我们希望将这些能力结合起来，让企业工作不仅有过程记录，也有可以验证的实际成果。",
  contact: {
    address: "上海市普陀区曹杨路1888号星光耀广场1号楼1005室",
    phone: "+86-153-1727-0756",
    wechat: "Gongshi-AI",
    wechatNote: "添加企业顾问微信，发送您的具体业务问题快速获得诊断方案",
    // 真实备案号：沪ICP备2025125372号-5（已取得，页脚强制展示；环境变量可覆盖）
    icp:
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_ICP_BEIAN || "沪ICP备2025125372号-5"
        : "沪ICP备2025125372号-5",
    copyrightYear: "2025-2026",
  },
  principles: [
    {
      title: "不做大系统，先解决一个问题",
      desc: "不主张推倒现有的 ERP、OA、CRM 等系统，不搞动辄半年的庞大规划。从一次报价、一次预测、一次标书审核开始，先做出一个可验证的真实结果。",
    },
    {
      title: "规则写不死的地方，才是 AI 的着力点",
      desc: "传统软件擅长处理结构化数据和明确的业务规则。面对非结构化文档、复杂业务情境和需要结合历史经验的判断，AI 可以进一步发挥理解、分析和推理的能力。",
    },
    {
      title: "执行可以分工，责任不能悬空",
      desc: "AI 可以参与任务拆解、分析、执行和协作，但任务必须有明确的结果责任主体。人在相应权限范围内负责关键决策、异常处理与结果验收。我们希望建立的不是无人负责的自动化，而是目标明确、过程可控、结果可验证的人机协同。",
    },
    {
      title: "学会了自己做，我们也由衷欢迎",
      desc: "我们持续坚持每月四场免费公益培训，教零基础企业人和开发者掌握 AI 与 AI Coding。即使参加完培训后不采购共事的服务，而是团队自己动手完成，我们也同样欢迎。",
    },
  ],
  navLinks: [
    { label: "解决具体问题", href: "/problems" },
    { label: "实践案例", href: "/cases" },
    { label: "HAFlow", href: "/haflow" },
    { label: "共事方法论", href: "/methodology" },
    { label: "免费培训", href: "/methodology#training", badge: "每月4场" },
    { label: "AI 应用诊断", href: "/diagnose" },
    { label: "观点与实践", href: "/insights" },
    { label: "关于共事", href: "/about" },
  ] as NavItem[],
};
