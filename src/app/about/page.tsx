import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Cpu, Compass } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { pageSeo } from "@/lib/seo";
import { COMPANY_INFO } from "@/data/company";
import { AboutChapterNav } from "./AboutChapterNav";
import styles from "./about.module.css";

export const metadata: Metadata = pageSeo({
  path: "/about",
  title: "关于共事智能｜公司定位、HAFlow 与业务交付",
  description: "共事智能专注于企业真实业务任务的人机协同与 AI Native 应用落地。了解公司定位、HAFlow 核心产品与 FDE 交付方式：执行可以分工，责任不能悬空。",
  keywords: ["关于共事智能", "上海共事智能科技有限公司", "人机协同", "AI Native", "HAFlow", "FDE"],
});

const chapters = [
  { id: "positioning", label: "我们是谁" },
  { id: "responsibility", label: "我们的理念" },
  { id: "practice", label: "如何开展工作" },
  { id: "brands", label: "公司、产品与交付" },
  { id: "story", label: "创业故事" },
  { id: "principles", label: "做事原则" },
  { id: "direction", label: "长期方向" },
  { id: "character", label: "品牌性格" },
];

const steps = [
  { title: "理解任务", desc: "与业务人员共同梳理业务背景、已有系统、实际约束和预期成果，明确问题为什么需要解决。" },
  { title: "设计分工", desc: "明确人、Agent 和系统分别承担的工作，约定授权范围、结果责任主体，以及需要人工决策的节点。" },
  { title: "验证与落地", desc: "用真实业务资料验证方案，在约定范围内完成工程落地，推动可使用、可验证的业务能力交付。" },
  { title: "验收与改进", desc: "根据约定标准确认成果，处理异常，积累可以持续复用的知识与经验。" },
];

const brands = [
  { name: "共事智能", role: "公司品牌", question: "我们为什么存在？", icon: Building2, paragraphs: ["共事智能是上海共事智能科技有限公司的品牌，代表人机共事的理念、以任务和结果为中心的方法，以及对真实业务交付的长期关注。", "我们是一支理解企业业务、参与工程实践、持续解决实际问题的团队。公司品牌承载我们的理念，以及对产品和服务交付的责任。"] },
  { name: "HAFlow", role: "核心产品品牌", question: "怎样组织人机协作？", icon: Cpu, paragraphs: ["HAFlow（Human + Agent, in Flow）是我们持续建设的企业通用人机协同工作流引擎。它将人、Agent、上下文、数据、工具和工作流组织起来，为复杂任务的执行与交付提供技术支撑。", "它不仅面向软件开发，也面向报价、投标等企业业务场景。HAFlow 是共事智能的重要技术基础，相关能力与应用范围仍在持续建设和验证中。"] },
  { name: "FDE", role: "业务落地与交付方式", question: "怎样进入真实业务现场？", icon: Compass, paragraphs: ["通过 FDE 业务，我们与企业人员共同理解任务，识别有价值的 AI 场景，设计人机分工，完成技术验证和工程落地。", "我们根据双方约定的范围和验收标准，推动可使用、可验证的业务能力进入实际工作。交付需要有具体成果，也需要有确认成果的方法。"] },
];

const founderStory = [
  "创办共事智能之前，我在企业管理软件行业工作了十多年。",
  "这些年，我见证了中国企业从传统办公走向数字化管理，也越来越清楚传统软件的价值与边界。",
  "AI 的出现，让我开始重新思考：如果软件不仅能记录和管理工作，还能主动参与执行，未来的企业管理软件会是什么样？",
  "为了寻找答案，我开始亲自学习 AI Coding，研究不同 Agent 的协作方式。这个过程持续了将近一年，经历过很多失败，也逐渐积累了一些能够真正运行的实践。",
  "2026 年，我决定离开熟悉的岗位，创办共事智能。",
  "我们希望从一件件真实的小事开始，探索人、Agent 和企业系统怎样共同完成工作，以及怎样让每件事都有可以验证的结果和清晰的责任归属。",
];

const traits = [
  { title: "清醒", desc: "对 AI 保持期待，也理解它的局限。尊重技术的进步，也尊重人的价值。" },
  { title: "务实", desc: "从一件具体的事如何完成谈起，理解业务约束，讨论实际交付。" },
  { title: "克制", desc: "不轻易宣布颠覆，不制造焦虑，不为曝光与其他产品制造对立。" },
  { title: "坦诚", desc: "愿意分享开发过程、技术选择、遇到的问题和失败的尝试。" },
  { title: "有长期判断", desc: "持续追问企业软件、组织协作与工作责任未来会怎样变化。" },
];

const sectionClass = styles.section;
const headingClass = styles.sectionTitle;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb items={[{ label: "关于共事智能" }]} />
        <section id="positioning" aria-labelledby="about-title" className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroIdentity}>
              <p className={styles.eyebrow}>关于共事智能</p>
              <h1 id="about-title" className={styles.heroTitle}>
                让人和 Agent<br />共同把事情做完。
              </h1>
              <p className="mt-6 font-mono text-sm tracking-wide text-slate-500 sm:text-base">Human + Agent, in Flow.</p>
              <p className="mt-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">低承诺，高交付</p>
            </div>
            <div className={styles.heroIntro}>
              <p className="text-lg font-semibold leading-8 text-slate-900">共事智能是一家专注于企业真实业务任务的人机协同与 AI Native 应用落地公司。</p>
              <p className="text-sm font-semibold text-slate-900">初心与使命</p>
              <p>{COMPANY_INFO.heroDescription}</p>
              <p>但当人、软件和 Agent 共同参与一项工作时，一个更重要的问题出现了：<strong className="font-semibold text-slate-900">一件事情，到底谁对结果负责？</strong></p>
              <p>我们相信，执行可以分工，责任不能悬空。目标必须清楚，成果必须能够验证，关键问题必须有人判断和处理。</p>
              <p className="border-t border-blue-200 pt-5 font-semibold text-blue-700">共事想做的，就是让人和 Agent 一起，把这些事情做完。</p>
            </div>
          </div>
        </section>

        <AboutChapterNav chapters={chapters} />

        <section id="responsibility" aria-labelledby="responsibility-title" className={`${sectionClass} ${styles.splitSection}`}>
          <div className={styles.sectionLead}>
            <p className="mb-3 text-sm font-semibold text-blue-700">我们的理念</p>
            <h2 id="responsibility-title" className={headingClass}>一件事情，<br />到底谁对结果负责？</h2>
            <p className="mt-6 border-l-2 border-blue-600 pl-5 text-lg font-semibold leading-8 text-slate-900">执行可以分工，责任不能悬空。</p>
          </div>
          <div className={`${styles.sectionCopy} space-y-5`}>
            <p>一项工作可能跨越多个人、多个部门、多个系统，也可能由多个 Agent 共同参与。分工越来越细，仍然需要有人理解完整目标，有权处理关键问题，并推动事情真正完成。</p>
            <p>我们所说的结果责任，是让目标有人推进、异常有人处理、成果有人确认。责任与权限应当匹配：负责的人要有足够的知情权、决策权和干预权。</p>
            <p>我们不认为 AI 应该无条件替代人，也不认为所有业务任务都适合完全自动化。</p>
            <p>业务决策、具体执行，以及共事智能自身的产品与服务交付责任，应按各自职责与约定分别明确。AI 可以参与执行、提供判断依据和产出成果，人的决策责任和组织的管理责任仍然需要清楚地落实。</p>
            <p className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-blue-900">结果责任的目的，是减少事情无人推进、异常无人处理、成果无人确认。我们希望帮助企业把工作做好，而不是增加一套更复杂的事后追责制度。</p>
          </div>
        </section>

        <section id="practice" aria-labelledby="practice-title" className={sectionClass}>
          <p className="mb-3 text-sm font-semibold text-blue-700">如何开展工作</p>
          <h2 id="practice-title" className={headingClass}>从一件具体的事开始。</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">一次复杂报价、一次订货预测、一份标书合规核对，是适合先开展小范围验证、逐步证明价值的具体任务。我们与业务人员共同理解任务，明确交付目标、验收标准和授权范围，再选择适合的解决方式。</p>
          <ol className={styles.practiceSteps}>
            {steps.map((step, i) => <li key={step.title} className="border-t-2 border-blue-200 pt-5"><span className="font-mono text-sm text-blue-700">0{i + 1}</span><h3 className="mb-3 mt-3 text-lg font-semibold text-slate-900">{step.title}</h3><p className="text-sm leading-7 text-slate-600">{step.desc}</p></li>)}
          </ol>
        </section>

        <section id="brands" aria-labelledby="brands-title" className={sectionClass}>
          <p className="mb-3 text-sm font-semibold text-blue-700">公司、产品与交付</p>
          <h2 id="brands-title" className={headingClass}>共事智能、HAFlow 与 FDE</h2>
          <div className={styles.brandGrid}>
            {brands.map(({ name, role, question, icon: Icon, paragraphs }) => <article key={name} className={styles.brand}><Icon aria-hidden="true" className={styles.brandIcon} /><p className="text-sm text-slate-500">{role}</p><h3 className="mt-2 text-2xl font-bold text-slate-950">{name}</h3><p className="mb-5 mt-3 text-sm font-medium text-blue-700">{question}</p><div className={`${styles.brandCopy} space-y-4`}>{paragraphs.map(p => <p key={p}>{p}</p>)}</div></article>)}
          </div>
          <p className="mt-7 text-base font-semibold leading-8 text-slate-900">共事智能提出方向，HAFlow 提供技术支撑，FDE 推动真实场景落地。</p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">三者共同服务于一个目标：让人和 Agent 协作完成真实任务。公司交付项目、HAFlow 实际应用与方案演示应分别说明验证依据；尚未接入 HAFlow 的项目，不作为 HAFlow 的落地案例宣传。</p>
          <Link href="/haflow" className="mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">了解 HAFlow<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </section>

        <section id="story" aria-labelledby="story-title" className={`${sectionClass} ${styles.splitSection} ${styles.storySection}`}>
          <div className={styles.sectionLead}>
            <p className="mb-3 text-sm font-semibold text-blue-700">创业故事 · 创始人自述</p>
            <h2 id="story-title" className={headingClass}>为什么创办共事智能？</h2>
          </div>
          <div className={`${styles.sectionCopy} space-y-5`}>
            {founderStory.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section id="principles" aria-labelledby="principles-title" className={sectionClass}>
          <p className="mb-3 text-sm font-semibold text-blue-700">做事原则</p>
          <h2 id="principles-title" className={headingClass}>用实际成果建立信任。</h2>
          <div className={styles.principlesGrid}>{COMPANY_INFO.principles.map((item, i) => <div key={item.title} className={styles.principle}><p className="mb-3 font-mono text-xs text-blue-700">原则 0{i + 1}</p><h3 className="text-lg font-semibold text-slate-900">{item.title}</h3><p className="mt-3 text-base leading-8 text-slate-600">{item.desc}</p></div>)}</div>
        </section>

        <section id="direction" aria-labelledby="direction-title" className={`${sectionClass} ${styles.splitSection}`}>
          <div className={styles.sectionLead}><p className="mb-3 text-sm font-semibold text-blue-700">长期方向</p><h2 id="direction-title" className={headingClass}>从管理工作的流转，<br />走向管理工作的完成。</h2></div>
          <div className={`${styles.sectionCopy} space-y-5`}><p>{COMPANY_INFO.heroDescription}</p><p>我们希望连接企业已有系统，探索一种以任务、协作和业务结果为中心的工作方式。</p><p>这种工作方式既需要保留传统系统的确定性和治理能力，也需要具备 AI 参与执行与协作的新能力，让完成过程中形成的知识和经验能够持续复用。</p><p className="text-sm leading-7 text-slate-500">这是共事智能的长期方向。具体产品能力和项目成果，以已经完成的验证为依据；长期愿景不作为当前能力的承诺。</p></div>
        </section>

        <section id="character" aria-labelledby="character-title" className={sectionClass}>
          <p className="mb-3 text-sm font-semibold text-blue-700">品牌性格</p>
          <h2 id="character-title" className={headingClass}>清醒、务实、克制、坦诚。<br className="sm:hidden" />有长期判断。</h2>
          <dl className={styles.traits}>{traits.map(trait => <div key={trait.title}><dt className="text-base font-semibold text-slate-900">{trait.title}</dt><dd className="mt-3 text-sm leading-7 text-slate-600">{trait.desc}</dd></div>)}</dl>
          <p className="mt-8 max-w-4xl text-base leading-8 text-slate-600">我们明确区分已经上线、内部验证、正在研发和长期设想。我们希望客户记住共事智能，是因为我们理解真实业务，并交付过经得起验证的成果。</p>
        </section>

        <aside aria-labelledby="honesty-title" className={styles.honesty}>
          <h2 id="honesty-title" className="mb-3 text-base font-semibold text-slate-900">实事求是声明：</h2>
          <p className="text-sm leading-7 text-slate-600">共事严守诚信底线，绝不虚构团队规模、融资情况、客户数量或夸张名头。我们是一支深耕企业软件与 AI Native 工程落地的严谨团队，我们唯一的声誉来自于帮客户解决的每一个具体业务问题。</p>
        </aside>

        <section aria-labelledby="contact-title" className={styles.contact}>
          <h2 id="contact-title" className={headingClass}>带着一件具体的事，和我们聊聊。</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">从你希望完成的任务开始，一起明确目标、参与者、交付物和验收方式。</p>
          <div className="mt-7 flex flex-wrap items-center gap-6"><Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">联系我们<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link><Link href="/cases" className="rounded-sm text-sm font-semibold text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">查看实践案例</Link></div>
        </section>
      </div>
    </div>
  );
}
