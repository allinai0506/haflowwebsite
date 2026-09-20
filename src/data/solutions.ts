export type SolutionSlug = "quote" | "order-forecast" | "bid-audit";

export interface SolutionItem {
  slug: SolutionSlug;
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  audience: string;
  businessQuestion: string;
  inputSummary: string;
  workflowSteps: string[];
  problemSlug: SolutionSlug;
  caseSlugs: string[];
  searchTerms: string[];
}

/**
 * 解决方案页只保存页面组织文案与事实关系，业务细节继续来自 PROBLEMS/CASE_STUDIES。
 * 这样问题页、案例页和解决方案页不会各自维护一份容易漂移的事实。
 */
export const SOLUTIONS: SolutionItem[] = [
  {
    slug: "quote",
    title: "跨境物流智能报价解决方案",
    seoTitle: "跨境物流智能报价解决方案",
    seoDescription:
      "面向跨境货代与供应链企业的智能报价方案：理解非标询价，综合运价与附加费，生成有依据的多路线报价，由业务主管最终确认。",
    eyebrow: "跨境物流与供应链 · 复杂定价",
    audience:
      "适合每天处理非标询价的跨境货代、国际物流与供应链企业，服务对象包括商务人员、调度主管和经营负责人。",
    businessQuestion: "这批货怎么运、走哪条路线、应该报多少钱？",
    inputSummary:
      "输入客户询价文本或 Excel、货物与包装参数、起运港和目的港、时效要求、企业运价文件、附加费规则与历史成交记录。",
    workflowSteps: [
      "解析询价内容，提取货物、起止地、时效和特殊要求。",
      "并行比较多条运输路线，核算基础运费与浮动附加费。",
      "生成成本明细、方案差异、风险提示和建议利润空间。",
      "业务主管确认毛利、舱位与通关条件后，输出正式报价方案。",
    ],
    problemSlug: "quote",
    caseSlugs: ["automotive-crm", "freight-quotation"],
    searchTerms: ["跨境物流智能报价", "货代报价系统", "企业智能报价", "AI 复杂报价"],
  },
  {
    slug: "order-forecast",
    title: "连锁门店智能订货预测解决方案",
    seoTitle: "连锁门店智能订货预测解决方案",
    seoDescription:
      "面向连锁零售与餐饮企业的智能订货预测方案：结合销售、库存、天气、活动和保质期，为每家门店生成可解释的订货建议，由店长审核后下发。",
    eyebrow: "连锁零售与餐饮 · 供需预测",
    audience:
      "适合拥有多家门店、经营生鲜或短保商品的连锁零售与餐饮企业，服务对象包括店长、片区督导和供应链负责人。",
    businessQuestion: "明天每家门店应该订多少，才能少报损又不缺货？",
    inputSummary:
      "输入门店销售与损耗流水、在架库存和在途量、天气与日历因素、促销活动、商品保质期和供应商起订量。",
    workflowSteps: [
      "汇集门店销售、库存和损耗数据，识别缺失或异常记录。",
      "结合天气、节假日、门店属性和促销活动推算 SKU 需求。",
      "按保质期、安全库存和供应约束生成订货件数，并解释主要原因。",
      "店长或督导调整特殊情况后，确认并回传供应链下单系统。",
    ],
    problemSlug: "order-forecast",
    caseSlugs: ["store-inventory"],
    searchTerms: ["连锁门店订货预测", "智能补货", "生鲜订货预测", "AI 门店订货"],
  },
  {
    slug: "bid-audit",
    title: "AI 标书质量核查解决方案",
    seoTitle: "AI 标书质量核查解决方案",
    seoDescription:
      "面向政府采购、国央企和工程投标团队的 AI 标书核查方案：逐条比对招标与响应文件，定位漏项、负偏离和废标风险，由专业人员完成最终封标验收。",
    eyebrow: "招投标与合同合规 · 风控核查",
    audience:
      "适合频繁参与大额招投标的企业、投标服务团队和合规负责人，服务对象包括投标经理、技术标负责人和法务/质量人员。",
    businessQuestion: "这份标书有没有漏项，会不会因为一个细节导致废标？",
    inputSummary:
      "输入招标公告与 PDF/Word 招标文件、响应文件、企业资质证照、历史标书资料和电子投标平台导出文件。",
    workflowSteps: [
      "解析招标文件，建立资格、废标、技术和评分要求清单。",
      "逐条比对响应文件，定位空白、负偏离、签章和证据缺失。",
      "按风险等级生成带原文位置的核查报告和整改清单。",
      "投标团队确认高风险条款，完成最终封标前人工验收。",
    ],
    problemSlug: "bid-audit",
    caseSlugs: ["bid-compliance"],
    searchTerms: ["AI 标书检查", "标书质量核查", "招标文件合规审查", "废标风险检查"],
  },
];

export function getSolutionBySlug(slug: string): SolutionItem | undefined {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}
