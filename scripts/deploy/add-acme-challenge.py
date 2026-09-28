"""nginx: haflow 80 端口块增加 ACME challenge 例外（certbot webroot 用）。"""

p = '/etc/nginx/nginx.conf'
s = open(p).read()
assert 'haflow-website' in s, 'haflow block missing'
assert 'acme-challenge' not in s, 'already added'

anchor = '''        access_log /var/log/nginx/haflow-access.log main;
        error_log /var/log/nginx/haflow-error.log warn;
'''
assert anchor in s, 'anchor not found'

addition = anchor + '''
        # Let's Encrypt HTTP-01 质检（certbot webroot: /var/www/haflow-acme）
        location ^~ /.well-known/acme-challenge/ {
            root /var/www/haflow-acme;
            default_type text/plain;
            access_log off;
        }
'''
open(p, 'w').write(s.replace(anchor, addition, 1))
print('challenge location added')
