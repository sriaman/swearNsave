#!/bin/sh

# $PORT is injected by Railway at runtime
cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen ${PORT:-3000};
    server_name _;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri /index.html;
    }
}
EOF

echo "Starting nginx on port ${PORT:-3000}"
exec nginx -g "daemon off;"