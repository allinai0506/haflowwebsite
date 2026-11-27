/* eslint-disable @typescript-eslint/no-require-imports */
// 生产环境 pm2 配置（仅监听本地回环地址 127.0.0.1:3000）
// 优先使用 Next.js Standalone 产物 (server.js)，轻量低内存 (~80MB)
// 启动命令：pm2 start ecosystem.config.cjs && pm2 save
const fs = require("fs");
const appDir = process.env.HAFLOW_APP_DIR || "/opt/haflow-website";
const isStandalone = fs.existsSync(`${appDir}/server.js`);

module.exports = {
  apps: [
    {
      name: "haflow-website",
      cwd: appDir,
      script: isStandalone ? "server.js" : "node_modules/next/dist/bin/next",
      args: isStandalone ? "" : "start -p 3000 -H 127.0.0.1",
      interpreter: fs.existsSync("/opt/node20/bin/node") ? "/opt/node20/bin/node" : "node",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        HOSTNAME: "127.0.0.1",
        PATH: "/opt/node20/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin",
      },
    },
  ],
};
