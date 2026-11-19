#!/usr/bin/env bash
set -e

# ==============================================================================
# haflow-website 生产一键打包与同步部署脚本
# 目标服务器：火山云 115.190.237.184（数凭项目同机）
# 策略：本地完成 Next.js Standalone 生产编译，远端仅同步打包产物并启动容器/进程，
#       完全避免在服务器直接编译抢占数凭生产资源。
# ==============================================================================

SERVER_IP="115.190.237.184"
SERVER_USER="root"
REMOTE_DIR="/opt/haflow-website"
DEPLOY_MODE="${1:-docker}" # docker (推荐) 或 pm2

echo "=================================================="
echo " [1/5] 开始本地生产构建 (pnpm build)..."
echo "=================================================="
node -e "const fs = require('fs'); if (fs.existsSync('.next')) fs.rmSync('.next', { recursive: true, force: true });"
pnpm build

if [ ! -d ".next/standalone" ]; then
  echo "错误: 未检测到 .next/standalone 产物，请检查 next.config.ts 中的 output: 'standalone' 配置。"
  exit 1
fi

echo "=================================================="
echo " [2/5] 准备精简发布包..."
echo "=================================================="
PKG_DIR="/tmp/haflow-deploy-pkg"
rm -rf "$PKG_DIR"
mkdir -p "$PKG_DIR"

# 1. 复制 standalone 主产物 (已包含精简版 node_modules 和 server.js)
cp -R .next/standalone/. "$PKG_DIR/"

# 2. 补齐 Next.js standalone 运行时必需的 static 与 public
mkdir -p "$PKG_DIR/.next/static"
cp -R .next/static/. "$PKG_DIR/.next/static/"
cp -R public "$PKG_DIR/"

# 3. 复制运行时与部署配置
cp .env.production "$PKG_DIR/.env.production" 2>/dev/null || true
cp ecosystem.config.cjs "$PKG_DIR/"
cp Dockerfile "$PKG_DIR/"
cp docker-compose.yml "$PKG_DIR/"
cp .dockerignore "$PKG_DIR/" 2>/dev/null || true
mkdir -p "$PKG_DIR/scripts/deploy"
cp scripts/deploy/inject-nginx-haflow.py "$PKG_DIR/scripts/deploy/"

echo "本地发布包准备就绪：$(du -sh $PKG_DIR | cut -f1)"

echo "=================================================="
echo " [3/5] 同步至目标服务器 $SERVER_IP:$REMOTE_DIR..."
echo "=================================================="
ssh "$SERVER_USER@$SERVER_IP" "mkdir -p $REMOTE_DIR"
rsync -avz --delete "$PKG_DIR/" "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/"

echo "=================================================="
echo " [4/5] 服务端启动/重载 ($DEPLOY_MODE 模式)..."
echo "=================================================="
if [ "$DEPLOY_MODE" = "docker" ]; then
  ssh "$SERVER_USER@$SERVER_IP" "bash -c '
    cd $REMOTE_DIR
    docker compose up -d --build
  '"
elif [ "$DEPLOY_MODE" = "pm2" ]; then
  ssh "$SERVER_USER@$SERVER_IP" "bash -c '
    cd $REMOTE_DIR
    if command -v pm2 >/dev/null 2>&1; then
      pm2 restart ecosystem.config.cjs || pm2 start ecosystem.config.cjs
      pm2 save
    elif [ -x /opt/node20/bin/pm2 ]; then
      /opt/node20/bin/pm2 restart ecosystem.config.cjs || /opt/node20/bin/pm2 start ecosystem.config.cjs
      /opt/node20/bin/pm2 save
    else
      echo \"错误: 宿主机未检测到 pm2 运行时，建议使用 docker 模式部署。\"
      exit 1
    fi
  '"
fi

echo "=================================================="
echo " [5/5] 服务端健康度验证 (127.0.0.1:3000)..."
echo "=================================================="
sleep 2
ssh "$SERVER_USER@$SERVER_IP" "curl -s -I http://127.0.0.1:3000 | head -n 10"

echo ""
echo ">>> haflow-website 部署就绪！"
