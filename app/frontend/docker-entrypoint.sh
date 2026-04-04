#!/bin/sh

cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen ${PORT:-3000};
    server_name _;

    location /api/ {
        proxy_pass http://sweatnsave-backend.railway.internal/api/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri /index.html;
    }
}
EOF

exec nginx -g "daemon off;"