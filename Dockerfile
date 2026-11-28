# Next.js 16 独立轻量生产镜像
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 创建非 root 用户运行
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 拷贝发布包内容（在发布目录下 server.js, .next, public, node_modules 均在根路径）
COPY --chown=nextjs:nodejs . ./

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
