#!/usr/bin/env python3
"""在 Nginx 配置中安全追加或更新 haflow.cn 反向代理配置。
支持自动备份、明确起止标记、语法检测与安全回滚。
"""

import os
import re
import subprocess
import sys
import time

CONF_PATH = os.environ.get("NGINX_CONF_PATH", "/etc/nginx/nginx.conf")
NGINX_CONTAINER = os.environ.get("NGINX_CONTAINER_NAME", "nginx-proxy")
WEBROOT_PATH = os.environ.get("ACME_WEBROOT_PATH", "/usr/share/nginx/html")
BEGIN_MARKER = "# >>> haflow-website BEGIN >>>"
END_MARKER = "# <<< haflow-website END <<<"

HTTP_INNER = f'''
    upstream haflow_upstream {{
        server haflow-website:3000;
        keepalive 32;
    }}

    server {{
        listen 80;
        server_name haflow.cn www.haflow.cn;
        server_tokens off;

        access_log /var/log/nginx/haflow-access.log main;
        error_log /var/log/nginx/haflow-error.log warn;

        location ^~ /.well-known/acme-challenge/ {{
            root {WEBROOT_PATH};
            default_type text/plain;
            try_files $uri =404;
        }}

        location ~ /\\.(?!well-known) {{
            deny all;
            return 404;
        }}

        location ^~ /data/ {{
            deny all;
            return 404;
        }}

        location / {{
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
        }}
    }}
'''

HTTPS_INNER = f'''
    limit_req_zone $binary_remote_addr zone=haflow_diagnose:10m rate=5r/m;

    upstream haflow_upstream {{
        server haflow-website:3000;
        keepalive 32;
    }}

    server {{
        listen 80;
        server_name haflow.cn www.haflow.cn;
        server_tokens off;

        access_log /var/log/nginx/haflow-access.log main;
        error_log /var/log/nginx/haflow-error.log warn;

        location ^~ /.well-known/acme-challenge/ {{
            root {WEBROOT_PATH};
            default_type text/plain;
            try_files $uri =404;
        }}

        location ~ /\\.(?!well-known) {{
            deny all;
            return 404;
        }}

        location / {{
            return 301 https://$host$request_uri;
        }}
    }}

    server {{
        listen 443 ssl;
        http2 on;
        server_name haflow.cn www.haflow.cn;
        server_tokens off;

        ssl_certificate /etc/letsencrypt/live/haflow.cn/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/haflow.cn/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers on;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 1d;
        ssl_session_tickets off;

        client_max_body_size 1m;

        access_log /var/log/nginx/haflow-ssl-access.log main;
        error_log /var/log/nginx/haflow-ssl-error.log warn;

        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()" always;

        location ~ /\\.(?!well-known) {{
            deny all;
            return 404;
        }}

        location ^~ /data/ {{
            deny all;
            return 404;
        }}

        location = /api/diagnose {{
            limit_req zone=haflow_diagnose burst=3 nodelay;
            limit_req_status 429;
            client_max_body_size 32k;

            proxy_pass http://haflow_upstream;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_read_timeout 30s;
            proxy_connect_timeout 10s;
            proxy_send_timeout 30s;
        }}

        location /_next/static/ {{
            proxy_pass http://haflow_upstream;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
            add_header X-Content-Type-Options "nosniff" always;
            add_header Cache-Control "public, max-age=31536000, immutable";
            access_log off;
        }}

        location = /sitemap.xml {{
            proxy_pass http://haflow_upstream;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }}

        location = /robots.txt {{
            proxy_pass http://haflow_upstream;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }}

        location / {{
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
        }}
    }}
'''


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else 'http'
    if not os.path.exists(CONF_PATH):
        print(f"Error: {CONF_PATH} not found.")
        sys.exit(1)

    with open(CONF_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    bak_path = f"{CONF_PATH}.bak-{int(time.time())}"
    with open(bak_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Backup created at {bak_path}")

    if BEGIN_MARKER in content:
        print("Existing haflow-website marker found. Cleaning up...")
        pattern = re.escape(BEGIN_MARKER) + r'.*?' + re.escape(END_MARKER)
        content = re.sub(pattern, '', content, flags=re.S)

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
    res = subprocess.run(["docker", "exec", NGINX_CONTAINER, "nginx", "-t"], capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Nginx config validation failed!\nSTDOUT: {res.stdout}\nSTDERR: {res.stderr}")
        print("Rolling back to backup...")
        with open(CONF_PATH, 'w', encoding='utf-8') as f:
            f.write(content)
        sys.exit(1)

    print(f"Nginx syntax OK! Reloading {NGINX_CONTAINER}...")
    reload_res = subprocess.run(["docker", "exec", NGINX_CONTAINER, "nginx", "-s", "reload"], capture_output=True, text=True)
    if reload_res.returncode == 0:
        print(f"Nginx reloaded successfully in {mode} mode!")
    else:
        print(f"Failed to reload Nginx: {reload_res.stderr}")
        sys.exit(1)


if __name__ == '__main__':
    main()
