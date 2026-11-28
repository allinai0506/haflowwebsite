# HAFlow 官网生产发布 SOP

HAFlow 官网使用独立的 Compose 项目和服务 `haflow-website`，宿主机端口为 `127.0.0.1:3000`。与数凭官网和 Demo 共用的 Nginx 通过外部 Docker 网络 `nexusarchive_default` 访问官网容器。发布命令限定在 `haflow-website` 服务。部署账号和目标从受控运维配置获取。

## 1. 本地校验并构建镜像

从已合并的发布提交运行 `pnpm install --frozen-lockfile`、`pnpm lint`、`pnpm test`、`pnpm build` 和 `pnpm audit --prod --audit-level=high`，确认仓库要求的安全检查通过。将提交号写入镜像标签。

本地用 Docker 构建 Linux AMD64 镜像。以下命令从 Git 提交提取干净的构建上下文，生成 Next.js Standalone 产物并使用 Node.js 20 Alpine 运行。

```bash
set -euo pipefail
release_commit=$(git rev-parse HEAD)
release_image="haflow-website:${release_commit}"
release_dir=$(mktemp -d)
git archive "$release_commit" | tar -xf - -C "$release_dir"
printf 'node_modules\n.next\n.git\n.env*\ndata\n' > "$release_dir/.dockerignore"

docker build --platform linux/amd64 -t "$release_image" -f - "$release_dir" <<'DOCKERFILE'
FROM node:24-alpine AS build
WORKDIR /src
RUN npm install -g pnpm@11.24.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build && mkdir -p /release/.next/static /release/data/leads \
    && cp -a .next/standalone/. /release/ \
    && cp -a .next/static/. /release/.next/static/ \
    && cp -a public /release/

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
COPY --from=build --chown=1001:1001 /release/ ./
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
DOCKERFILE

docker image save --platform linux/amd64 -o "$release_dir/haflow-website.tar" "$release_image"
```

通过已配置的 SSH 连接上传镜像包，在服务器用 `docker image load -i` 导入。核对镜像标签、镜像 ID 和 `amd64` 架构。

## 2. 在切换前验证候选

1. 保存当前 HAFlow Compose 文件，在旧镜像上打专用回滚标签，并记录当前 HAFlow 容器 IP。记录数凭官网的 HTTP 状态、Demo 后端健康状态及容器启动时间。
2. 用新镜像启动临时候选容器，使用独立名称、断开外部网络、挂载临时线索卷。通过容器内回环请求验证首页返回 `200` 和 CSP，提交一条合成咨询，确认 API 返回成功且临时卷生成权限为 `0600` 的线索文件。验收后移除候选容器及临时卷。
3. 从本次提交的 `docker-compose.yml` 准备生产副本。把官网服务的 `image` 指向已导入的版本标签，移除 `build`，将外部网络的实际名称固定为 `nexusarchive_default`。保留 `haflow_leads:/app/data/leads` 挂载及现有生产端口。用 `docker compose config` 核对服务、镜像、网络和挂载，输出时避免展开环境变量值到日志。

## 3. 只切换 HAFlow 并验收

在官网项目目录替换 Compose 文件后执行：

```bash
docker compose -p haflow-website -f docker-compose.yml up -d --no-build --no-deps haflow-website
curl -fsS --retry 5 --retry-all-errors --max-time 5 -o /dev/null http://127.0.0.1:3000/
docker exec haflow-website test -w /app/data/leads
```

若 HAFlow 容器 IP 改变，检查现有网关配置通过 `docker exec nexus-frontend nginx -t` 后，执行 `docker exec nexus-frontend nginx -s reload`，更新网关持有的上游地址。保留共享网关配置。

- [HAFlow 官网](https://www.haflow.cn/) 和[咨询页](https://www.haflow.cn/diagnose)返回 `200`，[裸域](https://haflow.cn/)返回 `308`，首页可见 CSP 和新版 Permissions-Policy。
- [数凭官网](https://www.digivoucher.cn/)返回 `200`，数凭 Demo 后端维持健康并核对容器启动时间。后端健康检查只覆盖技术可用性。
- 记录发布提交、镜像标签和验收结果。用生产容器的可写检查与候选环境的落盘测试确认线索路径，避免把合成测试线索写入生产。

## 4. 回滚

若切换后的检查失败，恢复备份的 HAFlow Compose 文件，移除其中的 `build`（如有），将 `image` 指向切换前保留的回滚标签。用上一节的 Compose 命令仅重建 `haflow-website`，保留生产线索卷。若回滚导致容器 IP 变化，按上一节的步骤校验并平滑重载网关，再复查三个项目的状态。

## 2026-11-28 发布记录

本次发布以 `0da439d` 为基础，运行镜像标签为 `haflow-website:0da439d-source-map-1.2.4`。候选镜像包含 `source-map-js 1.2.4` 修复，构建、Lint、11 项测试及生产依赖审计通过。候选容器实测咨询落盘，生产卷确认可写。HAFlow 首页、咨询页和数凭官网均返回 `200`，数凭 Demo 后端健康，切换前后的容器及启动时间一致。发布保留了旧镜像和 Compose 配置。
