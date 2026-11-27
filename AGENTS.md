<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

## Unified Agent Security Policy (Codex / Claude Code / Antigravity)

All AI coding agents operating in this repository MUST strictly adhere to the following security rules:

1. **Zero Access to Production Secrets**:
   - Agents are **prohibited by default** from reading, printing, or exfiltrating production secret files (`.env.production`, `.env.local`, SSH private keys, TLS/Certbot private keys, or live `WECOM_WEBHOOK_URL` / `FEISHU_WEBHOOK_URL` / `BAIDU_PUSH_TOKEN` values).
   - Never commit secrets, server IP addresses, internal co-tenant paths, or credentials to Git. Use `.env.example` with placeholder values only.

2. **No Unauthorized Production Server Modifications**:
   - Agents must **never** modify production servers, production Nginx configs, firewalls, databases, or customer lead files (`data/leads/`) directly.
   - Never delete or overwrite existing customer lead data.

3. **No Autonomous Production Deployments**:
   - Agents are **prohibited** from executing production deployment commands (`scripts/deploy/deploy.sh`, `ssh`, `rsync` to prod, `docker compose up` on prod). Production releases require explicit human execution and approval.

4. **Mandatory Human Review for Sensitive Changes**:
   - Any changes to security headers/CSP (`next.config.ts`), API validation/rate limiting (`/api/diagnose`, `src/lib/security/`), authentication/authorization, secret handling, or deployment scripts (`scripts/deploy/`, `Dockerfile`, `docker-compose.yml`, `ecosystem.config.cjs`) **must** be reviewed and approved by a human maintainer before merging.

5. **PR-Only Change Workflow & Mandatory Security Gates**:
   - All code changes must be developed on an isolated feature/fix branch and merged via Pull Request (never push directly to `main`).
   - Pull Requests **must not be merged** if any automated security check fails: Secret Scanning (`gitleaks`), SAST, Dependency Audit (`pnpm audit`), Lint (`pnpm lint`), Build (`pnpm build`), or Automated Tests (`pnpm test`).
