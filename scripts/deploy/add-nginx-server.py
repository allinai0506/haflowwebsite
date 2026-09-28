import re

p = '/etc/nginx/nginx.conf'
s = open(p).read()
assert 'haflow-website' not in s, 'already installed'

block = '''    # haflow-website（共事智能官网 Next.js，pm2: haflow-website 127.0.0.1:3000）
    # 8080 段保持不动（plm 旧站）。本站监听 80，域名生效前可直接用 IP 访问验证。
    server {
        listen 80;
        server_name haflow.cn www.haflow.cn;

        access_log /var/log/nginx/haflow-access.log main;
        error_log /var/log/nginx/haflow-error.log warn;

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

        # sitemap / robots 不缓存旧版本
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

    # HTTPS 配置（需要SSL证书）
'''

anchor = '    # HTTPS 配置（需要SSL证书）\n'
assert anchor in s, 'anchor not found'
s2 = s.replace(anchor, block, 1)
assert s2 != s
open(p, 'w').write(s2)
print('inserted ok')
