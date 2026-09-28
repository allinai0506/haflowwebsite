// 生产环境 pm2 配置（服务器：180.184.54.214）
// 使用 /opt/node20（Node 20.19.0），不污染系统 Node 16（plm-system 在用）。
// 启动：pm2 start ecosystem.config.cjs && pm2 save
module.exports = {
  apps: [
    {
      name: "haflow-website",
      cwd: "/opt/haflow-website",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      interpreter: "/opt/node20/bin/node",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "900M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        PATH: "/opt/node20/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin",
      },
    },
  ],
};
