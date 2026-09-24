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
    "面对那些规则写不死、过去只能依靠人来判断的事情，我们用 AI 帮你把结果做出来。传统软件记录流程，AI Native 应用交付结果。",
  contact: {
    address: "上海市普陀区曹杨路1888号星光耀广场1号楼1005室",
    phone: "+86-153-1727-0756",
    wechat: "Gongshi-AI",
    wechatNote: "添加企业顾问微信，发送您的具体业务问题快速获得诊断方案",
    // 百度SEO/合规：真实备案号通过环境变量注入，未取得前留空（页脚自动隐藏，避免渲染占位假号被降权）
    icp:
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_ICP_BEIAN || ""
        : "",
    copyrightYear: "2025-2026",
  },
  principles: [
    {
      title: "不做大系统，先解决一个问题",
      desc: "不主张推倒现有的 ERP、OA、CRM 等系统，不搞动辄半年的庞大规划。从一次报价、一次预测、一次标书审核开始，先做出一个可验证的真实结果。",
    },
    {
      title: "规则写不死的地方，才是 AI 的着力点",
      desc: "传统软件依赖固定字段和写死规则。当面对非结构化文档、多变市场情况、历史经验融合时，AI 的理解与推理才能发挥最大价值。",
    },
    {
      title: "让人在关键节点确认与纠偏",
      desc: "不宣传 AI 完全取代人，也不把 AI 包装为全知全能。AI 负责拆解、分析、初筛与建议，人在关键节点负责确认、纠偏与验收，这才是安全可靠的人机协同。",
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
    { label: "免费培训", href: "/training", badge: "每月4场" },
    { label: "AI 应用诊断", href: "/diagnose" },
    { label: "观点与实践", href: "/insights" },
    { label: "关于共事", href: "/about" },
  ] as NavItem[],
};
