@AGENTS.md
@DESIGN.md

## 生产部署规范 (Production Deployment)

- **运行架构**：
  - 本地预编译 Standalone（`next.config.ts` 中的 `output: "standalone"`），禁止在生产服务器上执行 `pnpm build`
  - 容器管理：Docker 容器 `haflow-website`（基于 `node:20-alpine`，内存限制 350M，仅绑定宿主 `127.0.0.1:3000`）
  - 反向代理：由 Nginx 统一接管 80 / 443 端口并配置 TLS 1.2/1.3、HSTS 与请求限流
  - SSL 证书：Certbot 自动续期
- **部署安全要求**：
  - 生产服务器地址、SSH 凭证与 Webhook 密钥等敏感配置仅保存在受控环境变量或运维密钥库中，禁止写入代码仓库
  - 禁止 Agent 自动执行生产部署或直接修改生产服务器
