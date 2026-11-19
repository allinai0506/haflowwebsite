// 生产环境 pm2 配置（目标服务器：115.190.237.184 数凭服务器）
// 优先使用 Next.js Standalone 产物 (server.js)，轻量低内存 (~80MB)
// 若在宿主机使用 PM2 运行，可配合 /opt/node20 运行时
// 启动命令：pm2 start ecosystem.config.cjs && pm2 save
const fs = require("fs");
const isStandalone = fs.existsSync("/opt/haflow-website/server.js");

module.exports = {
  apps: [
    {
      name: "haflow-website",
      cwd: "/opt/haflow-website",
      script: isStandalone ? "server.js" : "node_modules/next/dist/bin/next",
      args: isStandalone ? "" : "start -p 3000",
      interpreter: fs.existsSync("/opt/node20/bin/node") ? "/opt/node20/bin/node" : "node",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        PATH: "/opt/node20/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin",
      },
    },
  ],
};
