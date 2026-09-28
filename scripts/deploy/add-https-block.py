"""nginx：haflow 80 块改为 ACME+301，新增 443 HTTPS 块。"""
import re

p = '/etc/nginx/nginx.conf'
s = open(p).read()
assert '/etc/letsencrypt/live/haflow.cn/fullchain.pem' not in s, 'ssl already installed'

# 定位现有 haflow 80 server 块：从注释行到其配对的 "    }"（非贪婪到第一个该缩进的闭括号）
m = re.search(r'    # haflow-website.*?\n(    server \{\n.*?listen 80;.*?\n    \}\n)', s, re.S)
assert m, 'haflow port-80 block not found'
old_block = m.group(1)

new_port80 = '''    server {
        listen 80;
        server_name haflow.cn www.haflow.cn;

        access_log /var/log/nginx/haflow-access.log main;
        error_log /var/log/nginx/haflow-error.log warn;

        # Let's Encrypt HTTP-01 质检（certbot webroot: /var/www/haflow-acme）
        location ^~ /.well-known/acme-challenge/ {
            root /var/www/haflow-acme;
            default_type text/plain;
            access_log off;
        }

        # 其余全站 301 到 HTTPS（百度跟随跳转，权重归集到 https）
        location / {
            return 301 https://$host$request_uri;
        }
    }
'''

new_ssl = '''    # haflow-website HTTPS（Next.js pm2: 127.0.0.1:3000，证书由 certbot 自动续期）
    server {
        listen 443 ssl;
        server_name haflow.cn www.haflow.cn;

        ssl_certificate /etc/letsencrypt/live/haflow.cn/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/haflow.cn/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers on;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
        ssl_session_cache shared:SSL:5m;
        ssl_session_timeout 1d;
        ssl_session_tickets off;

        access_log /var/log/nginx/haflow-ssl-access.log main;
        error_log /var/log/nginx/haflow-ssl-error.log warn;

        add_header Strict-Transport-Security "max-age=31536000" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;

        # 静态资源长缓存（Next content-hash）
        location /_next/static/ {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            add_header Cache-Control "public, max-age=31536000, immutable";
            access_log off;
        }

        location = /sitemap.xml {
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location = /robots.txt {
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location / {
            proxy_pass http://127.0.0.1:3000;
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

s2 = s.replace(old_block, new_port80 + '\n' + new_ssl, 1)
assert s2 != s
open(p, 'w').write(s2)
print('https blocks written')
