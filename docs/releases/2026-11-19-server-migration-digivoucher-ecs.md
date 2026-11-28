# 生产服务器迁移归档记录：迁移至数凭火山云服务器

- **发布日期**：2026-11-19
- **迁移目标**：将共事智能公司官网（`haflow.cn` / `www.haflow.cn`）从旧服务器（`<LEGACY_SERVER_IP>`）全量迁移至数凭电子会计档案系统所在的火山云 ECS 服务器（`<PROD_SERVER_IP>`），实现同机混合部署并节约服务器资源开销。
- **当前状态**：**已上线且运行稳定 (SUCCESS)**

---

## 1. 核心拓扑与架构设计

### 1.1 服务器基础设施
* **云厂商**：火山引擎 (Volcano Engine) ECS
* **服务器 IP**：`<PROD_SERVER_IP>`（数凭项目同机）
* **操作系统**：CentOS Stream 9 (x86_64, Linux 5.15)
* **部署路径**：`/opt/haflow-website`
* **ICP 备案**：沪ICP备2025125372号-5（两台机器均在火山云，备案实例已确认绑定）

### 1.2 运行时与服务隔离（容器化部署）
为了彻底避免 Next.js 生产编译和运行侵占数凭项目（Java Spring Boot + MySQL 8.0 + Redis 7）的系统资源，本次迁移确立了以下原则：
1. **本地生产打包 (Standalone Mode)**：在开发端本地运行 `pnpm build`，开启 Next.js 16 的 `output: "standalone"`。仅同步包含精简版依赖的 `.next/standalone`、`public`、`.next/static`，发布包体积由原本 1GB+ 压缩至 **54MB**。**禁止在生产服务器执行 `pnpm/npm build`**。
2. **轻量容器运行**：采用官方 `node:20-alpine` 镜像作为运行时，非 root 用户运行。
3. **资源硬上限熔断**：Docker 容器配置了 `--memory 350m` 硬上限保护（实测常驻内存仅 **35MB**），杜绝任何内存泄漏引发 OOM 影响数凭数据库。
4. **网络内部互通**：容器加入数凭项目的内部 Docker 桥接网络 `nexusarchive_default`，对外端口仅映射到宿主机回环 `127.0.0.1:3000`，不向外网暴露未受保护端口。

### 1.3 统一流量网关与 SSL 架构
* **入口网关**：宿主机 80 与 443 端口由数凭项目的 Nginx 容器（`nexus-frontend`）独占监听。
* **Nginx 配置文件**：宿主机路径 `/opt/nexusarchive/nginx/nginx.prod.conf`（挂载至容器 `/etc/nginx/nginx.conf`）。
* **虚拟主机分发**：
  * `haflow_upstream`：通过 Docker 内部 DNS 直接反代至 `http://haflow-website:3000`。
  * **80 端口**：保留 Let's Encrypt HTTP-01 ACME 质检路径（`/.well-known/acme-challenge/`），其余全站 301 重定向至 HTTPS。
  * **443 端口**：挂载独立 SSL 证书，启用 HTTP/2、TLS 1.2/1.3、全站安全头及静态资源长缓存。
  * **域名权重归集**：根域名 `haflow.cn` 经 Next.js 规则 308 跳转至 canonical 主域名 `https://www.haflow.cn/`。
* **SSL 证书与自动续期**：
  * 证书路径：`/etc/letsencrypt/live/haflow.cn/fullchain.pem`
  * 私钥路径：`/etc/letsencrypt/live/haflow.cn/privkey.pem`
  * 验证模式：Certbot webroot 模式（宿主机 `/opt/nexusarchive/frontend` $\rightarrow$ 容器内 `/usr/share/nginx/html`）。
  * 续期 Hook：`renew_hook = docker exec nexus-frontend nginx -s reload`。系统定时任务执行 `certbot renew` 时，双站点证书到期前自动续期并平滑重载 Nginx。

---

## 2. 部署与运维规范 (SOP)

### 2.1 日常一键更新上线
在本地完成代码修改后，在项目根目录下直接执行：
```bash
./scripts/deploy/deploy.sh docker
```
该脚本全自动执行以下 5 步：
1. 本地清空缓存并编译 `pnpm build`（Turbopack + Standalone）；
2. 组装 `/tmp/haflow-deploy-pkg` 精简发布包（~54MB）；
3. rsync 增量同步至 `<DEPLOY_USER>@<PROD_SERVER_IP>:/opt/haflow-website/`；
4. 远端宿主机触发 `docker compose up -d --build` 重新构建并热替换容器；
5. 远端执行 `curl -s -I http://127.0.0.1:3000` 进行健康度断言。

### 2.2 常用线上排查与运维命令

```bash
# 1. 查看 haflow-website 容器运行状态与资源占用（常驻 ~35MB）
ssh <DEPLOY_USER>@<PROD_SERVER_IP> "docker stats --no-stream haflow-website"

# 2. 查看官网实时应用日志
ssh <DEPLOY_USER>@<PROD_SERVER_IP> "docker logs -f --tail 100 haflow-website"

# 3. 查看 Nginx 访问与错误日志
ssh <DEPLOY_USER>@<PROD_SERVER_IP> "docker exec nexus-frontend tail -f /var/log/nginx/haflow-access.log"
ssh <DEPLOY_USER>@<PROD_SERVER_IP> "docker exec nexus-frontend tail -f /var/log/nginx/haflow-error.log"

# 4. 手动验证 SSL 证书静默续期
ssh <DEPLOY_USER>@<PROD_SERVER_IP> "certbot renew --dry-run --no-random-sleep-on-renew"

# 5. 重启官网服务
ssh <DEPLOY_USER>@<PROD_SERVER_IP> "cd /opt/haflow-website && docker compose restart"
```

---

## 3. 验证与上线证据

本次迁移各项功能均已通过实际终端命令严格测试验证：

1. **公网 DNS 解析**：
   `haflow.cn` 与 `www.haflow.cn` 全网解析至 `<PROD_SERVER_IP>`（经阿里 DNS、腾讯 DNS 及本地解析复核）。
2. **全站 HTTPS 连通性**：
   * `https://www.haflow.cn/`：`HTTP/2 200 OK`
   * `https://haflow.cn/`：`HTTP/2 308 Permanent Redirect` $\rightarrow$ `https://www.haflow.cn/`
   * `http://www.haflow.cn/`：`HTTP/1.1 301 Moved Permanently` $\rightarrow$ `https://www.haflow.cn/`
3. **动态业务接口**：
   * `POST https://www.haflow.cn/api/diagnose` 实测写入成功，返回 `200 OK` 及业务 LeadID。
4. **互不干扰与隔离性**：
   * 数凭电子会计档案系统 `https://www.digivoucher.cn/` 请求 `HTTP/2 200 OK`，静态 chunk 与后端 API 均零影响。
   * 双域名 Certbot 续期联动测试 `certbot renew --dry-run` 100% 成功。
