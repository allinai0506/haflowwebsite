#!/usr/bin/env python3
"""在数凭服务器 (/opt/nexusarchive/nginx/nginx.prod.conf) 中安全追加或更新 haflow.cn 反向代理配置。
支持自动备份、明确起止标记、语法检测与安全回滚。
"""

import os
import re
import subprocess
import sys
import time

CONF_PATH = '/opt/nexusarchive/nginx/nginx.prod.conf'
BEGIN_MARKER = "# >>> haflow-website BEGIN >>>"
END_MARKER = "# <<< haflow-website END <<<"

HTTP_INNER = '''
    upstream haflow_upstream {
        # 默认容器网络直连 (与 nexus-frontend 共享 nexusarchive_default 网络)
        server haflow-website:3000;
        keepalive 32;
    }

    server {
        listen 80;
        server_name haflow.cn www.haflow.cn;

        access_log /var/log/nginx/haflow-access.log main;
        error_log /var/log/nginx/haflow-error.log warn;

        # Let's Encrypt ACME HTTP-01 验证（webroot 模式，映射宿主机 /opt/nexusarchive/frontend）
        location ^~ /.well-known/acme-challenge/ {
            root /usr/share/nginx/html;
            default_type text/plain;
            try_files $uri =404;
        }

        # 验证与过渡期反代（在未开启全站 HTTPS 前直接提供服务）
        location / {
            proxy_pass http://haflow_upstream;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_read_timeout 60s;
            proxy_connect_timeout 10s;
            proxy_send_timeout 60s;
        }
    }
'''

HTTPS_INNER = '''
    upstream haflow_upstream {
        server haflow-website:3000;
        keepalive 32;
    }

    server {
        listen 80;
        server_name haflow.cn www.haflow.cn;

        access_log /var/log/nginx/haflow-access.log main;
        error_log /var/log/nginx/haflow-error.log warn;

        location ^~ /.well-known/acme-challenge/ {
            root /usr/share/nginx/html;
            default_type text/plain;
            try_files $uri =404;
        }

        location / {
            return 301 https://$host$request_uri;
        }
    }

    server {
        listen 443 ssl;
        http2 on;
        server_name haflow.cn www.haflow.cn;

        ssl_certificate /etc/letsencrypt/live/haflow.cn/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/haflow.cn/privkey.pem;

        access_log /var/log/nginx/haflow-ssl-access.log main;
        error_log /var/log/nginx/haflow-ssl-error.log warn;

        add_header Strict-Transport-Security "max-age=31536000" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;

        # 静态资源长缓存（Next content-hash）
        location /_next/static/ {
            proxy_pass http://haflow_upstream;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            add_header Cache-Control "public, max-age=31536000, immutable";
            access_log off;
        }

        location = /sitemap.xml {
            proxy_pass http://haflow_upstream;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location = /robots.txt {
            proxy_pass http://haflow_upstream;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location / {
            proxy_pass http://haflow_upstream;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 60s;
            proxy_connect_timeout 10s;
            proxy_send_timeout 60s;
        }
    }
'''


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else 'http'
    if not os.path.exists(CONF_PATH):
        print(f"Error: {CONF_PATH} not found.")
        sys.exit(1)

    with open(CONF_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # 创建带时间戳的备份
    bak_path = f"{CONF_PATH}.bak-{int(time.time())}"
    with open(bak_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Backup created at {bak_path}")

    # 清理已有的 haflow 块
    if BEGIN_MARKER in content:
        print("Existing haflow-website marker found. Cleaning up...")
        pattern = re.escape(BEGIN_MARKER) + r'.*?' + re.escape(END_MARKER)
        content = re.sub(pattern, '', content, flags=re.S)

    # 寻找 http 闭括号
    last_brace_idx = content.rfind('}')
    if last_brace_idx == -1:
        print("Error: Could not find closing brace of http block")
        sys.exit(1)

    inner = HTTPS_INNER if mode == 'https' else HTTP_INNER
    block_to_insert = f"\n    {BEGIN_MARKER}\n{inner}\n    {END_MARKER}\n"

    new_content = content[:last_brace_idx] + block_to_insert + content[last_brace_idx:]

    with open(CONF_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Validating Nginx configuration syntax in container...")
    res = subprocess.run(["docker", "exec", "nexus-frontend", "nginx", "-t"], capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Nginx config validation failed!\nSTDOUT: {res.stdout}\nSTDERR: {res.stderr}")
        print("Rolling back to backup...")
        with open(CONF_PATH, 'w', encoding='utf-8') as f:
            f.write(content)
        sys.exit(1)

    print("Nginx syntax OK! Reloading nexus-frontend...")
    reload_res = subprocess.run(["docker", "exec", "nexus-frontend", "nginx", "-s", "reload"], capture_output=True, text=True)
    if reload_res.returncode == 0:
        print(f"Nginx reloaded successfully in {mode} mode!")
    else:
        print(f"Failed to reload Nginx: {reload_res.stderr}")
        sys.exit(1)


if __name__ == '__main__':
    main()
