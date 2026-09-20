# 场景解决方案 Landing Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a crawlable `/solutions` hub and three fact-backed solution landing pages for quote, order forecasting, and bid auditing.

**Architecture:** Keep detailed business facts in the existing `PROBLEMS` and `CASE_STUDIES` data sources. Add a small `solutions.ts` registry that selects and labels those facts without duplicating long source content. Render one server-side hub page and one server-side dynamic detail page, with shared components for cards and solution sections.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, existing `pageSeo`, `Breadcrumb`, `lucide-react` icons.

## Global Constraints

- Build only `/solutions`, `/solutions/quote`, `/solutions/order-forecast`, and `/solutions/bid-audit`.
- Do not create the finance solution page in this iteration.
- Do not invent customers, prices, rankings, results, integrations, or deployment claims.
- Use existing `PROBLEMS` and `CASE_STUDIES` records as the source of truth.
- New page content must be present in server-rendered HTML without client JavaScript.
- Every new page must have one H1, unique metadata, canonical, BreadcrumbList, and a link to `/diagnose`.
- Every solution detail page must link to its existing problem page and at least one existing case page.
- Preserve the existing light blue/white visual system and existing design tokens.

---

### Task 1: Add the fact-backed solution registry

**Files:**
- Create: `src/data/solutions.ts`
- Read: `src/data/problems.ts`
- Read: `src/data/cases.ts`

**Interfaces:**
- Produces `SolutionSlug = "quote" | "order-forecast" | "bid-audit"`.
- Produces `SolutionItem` with `slug`, `title`, `seoTitle`, `seoDescription`, `eyebrow`, `audience`, `businessQuestion`, `inputSummary`, `workflowSteps`, `problemSlug`, `caseSlugs`, and `searchTerms`.
- Produces `SOLUTIONS` and `getSolutionBySlug(slug: string)`.

- [x] **Step 1: Write the failing data-contract check**

Run an inline Node assertion against the current sitemap and source files that expects `src/data/solutions.ts`, `SOLUTIONS`, and three solution slugs. It must fail because the registry does not exist yet.

```bash
test -f src/data/solutions.ts
```

Expected: `test` exits with status 1.

- [x] **Step 2: Add the registry with only verified facts**

Define three records. Use existing problem titles, subtitles, questions, AI/human responsibilities, system lists, boundaries, and metrics through references or explicit short labels. Set relationships exactly:

```ts
quote -> problem quote; cases automotive-crm and freight-quotation
order-forecast -> problem order-forecast; case store-inventory
bid-audit -> problem bid-audit; case bid-compliance
```

Do not copy full `ProblemItem` or `CaseStudy` content into the new file. Export a type guard in `getSolutionBySlug` by returning `SolutionItem | undefined`.

- [x] **Step 3: Verify the registry contract**

Run:

```bash
node --input-type=module -e "import('./src/data/solutions.ts')"
```

If direct TypeScript loading is unsupported, use the production build as the type check and run a small source-shape assertion instead. Expected: the three slugs and all referenced problem/case slugs exist.

- [x] **Step 4: Review the diff**

Confirm the registry contains no new performance claims, customer names, prices, or unsupported system integrations.

### Task 2: Build shared solution presentation components

**Files:**
- Create: `src/components/SolutionCard.tsx`
- Create: `src/components/SolutionDetailSections.tsx`
- Read: `src/components/ProblemCard.tsx`
- Read: `src/components/Breadcrumb.tsx`

**Interfaces:**
- `SolutionCard({ solution }: { solution: SolutionItem })` links to `/solutions/${solution.slug}`.
- `SolutionDetailSections({ solution, problem, relatedCases }: { solution: SolutionItem; problem: ProblemItem; relatedCases: CaseStudy[] })` renders the evidence-backed detail sections.

- [x] **Step 1: Define the failing render contract**

After Task 1, add an inline HTML contract check that expects the new component output to include the visible labels `目标用户`, `业务输入`, `典型交付流程`, `AI 与人工分工`, `现有系统集成`, `适用条件`, `不适用条件`, and `验收指标`. Run it before the components exist and confirm failure.

- [x] **Step 2: Implement `SolutionCard`**

Use the existing card language: category/eyebrow, business question, concise audience copy, and a clear `查看解决方案` link. Use a normal anchor via `Link` and do not make the card a client component.

- [x] **Step 3: Implement `SolutionDetailSections`**

Render:

1. audience and business question;
2. input summary and workflow steps;
3. AI responsibilities beside human responsibilities from `problem.aiSolution`;
4. systems from `problem.aiSolution.systemsConnected`;
5. final deliverable;
6. applicable and inapplicable conditions;
7. metrics from `problem.metricsOrOutcome`, preserving each source note;
8. related case links using `CaseStudy.headline` and `CaseStudy.slug`.

Use visual separation and responsive grids, but keep all text in the server-rendered component.

- [x] **Step 4: Verify the component contract**

Run the local server and inspect one rendered solution route. Expected: all eight labels and their corresponding source-backed text are present in the returned HTML.

### Task 3: Add the `/solutions` hub and dynamic detail route

**Files:**
- Create: `src/app/solutions/page.tsx`
- Create: `src/app/solutions/[slug]/page.tsx`
- Modify: `src/lib/seo.ts` only if a route-specific metadata input is required

**Interfaces:**
- `/solutions` renders all `SOLUTIONS` records.
- `/solutions/[slug]` uses `generateStaticParams`, `generateMetadata`, `getSolutionBySlug`, `getProblemBySlug`, and `getCaseBySlug`.
- Unknown solution slugs call `notFound()`.

- [x] **Step 1: Write the failing route contract**

Run against the current local app:

```bash
for path in /solutions /solutions/quote /solutions/order-forecast /solutions/bid-audit; do
  curl -fsS "http://localhost:3000$path" >/dev/null
done
```

Expected: failure because the routes do not exist.

- [x] **Step 2: Implement the hub page**

Add `pageSeo` metadata with a title and description focused on enterprise AI solution scenarios. Add a Breadcrumb, one H1, an explanation of how the solution layer differs from the problem catalogue, three `SolutionCard`s, and a diagnostic CTA linking to `/diagnose`.

- [x] **Step 3: Implement the detail page**

Use `pageSeo` with `solution.seoTitle`, `solution.seoDescription`, and the solution's search terms. Render Breadcrumb items `解决方案` → current solution, a single H1, a concise hero, `SolutionDetailSections`, a link to the existing problem page, related case links, and a `/diagnose` CTA.

- [x] **Step 4: Verify rendered HTML**

For each new URL, assert status 200, one H1, a non-empty title and description, a canonical containing `https://haflow.cn/solutions`, visible audience/input/workflow/human/AI/system/boundary/metric text, and a `/diagnose` link. Verify the pages do not require client JavaScript for those fields.

### Task 4: Wire discovery, sitemap, and internal links

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/problems/page.tsx`
- Modify: `src/app/problems/[slug]/page.tsx` only if a solution link is needed
- Modify: `src/app/layout.tsx` or `src/data/company.ts` only if adding a primary navigation entry is justified by the existing header width

**Interfaces:**
- Sitemap includes exactly `/solutions` plus the three solution detail URLs.
- Existing problem and case pages remain reachable and retain their current URLs.

- [x] **Step 1: Add sitemap records**

Import `SOLUTIONS` and add a static `/solutions` record plus dynamic `/solutions/${solution.slug}` records using the existing stable baseline date and priority pattern.

- [x] **Step 2: Add contextual discovery links**

Add a concise “按解决方案查看” link from the problems hub and a solution link from each selected problem detail page. Do not add duplicate links to every unrelated page or alter existing primary navigation unless visual inspection shows sufficient room.

- [x] **Step 3: Verify the crawl graph**

Fetch the sitemap and all new routes. Assert every new URL has an inbound link from either the hub, the selected problem page, or the selected case page, and that no new route returns 404.

### Task 5: Full verification and handoff

**Files:**
- No additional source files.

- [x] **Step 1: Run the solution-specific contract check**

Check four new routes for status, title, description, canonical, exactly one H1, server-rendered section labels, `/diagnose`, at least one case link, and the related problem link.

- [x] **Step 2: Run the existing build and targeted lint**

```bash
pnpm exec eslint src/data/solutions.ts src/components/SolutionCard.tsx src/components/SolutionDetailSections.tsx src/app/solutions/page.tsx 'src/app/solutions/[slug]/page.tsx' src/app/sitemap.ts
pnpm build
```

Expected: targeted lint succeeds and the build generates the three dynamic solution paths.

- [x] **Step 3: Run the full lint and record baseline failures separately**

```bash
pnpm lint
```

If the known `src/components/score-align-script.ts` errors remain, report them as pre-existing and do not modify that file as part of this task.

- [x] **Step 4: Inspect scope and diff**

Run `git diff --check`, inspect all changed files, and confirm no financial solution route, unsupported claim, unrelated refactor, or source duplication was added.
