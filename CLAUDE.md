@AGENTS.md
@DESIGN.md

## 生产部署规范 (Production Deployment)

- **生产服务器**：火山引擎 ECS `115.190.237.184`（数凭项目同机，绝不可使用旧 IP `180.184.54.214`）
- **登录方式**：`ssh root@115.190.237.184`
- **运行架构**：
  - 本地预编译 Standalone（`next.config.ts` 中的 `output: "standalone"`），禁止在服务器上执行 `pnpm build`
  - 远端运行目录：`/opt/haflow-website`
  - 容器管理：Docker 容器 `haflow-website`（基于 `node:20-alpine`，内存限制 350M）
  - 网络拓扑：加入数凭网络 `nexusarchive_default`
  - Nginx 统一网关：数凭容器 `nexus-frontend`，配置文件为宿主机 `/opt/nexusarchive/nginx/nginx.prod.conf`
  - SSL 证书：`/etc/letsencrypt/live/haflow.cn/`（Certbot webroot 模式自动续期）
- **一键发布**：
  ```bash
  ./scripts/deploy/deploy.sh docker
  ```
- **架构与迁移档案**：详见 `docs/releases/2026-11-19-server-migration-digivoucher-ecs.md`
