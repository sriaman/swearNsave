# ---------- Build React ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- Serve React ----------
# ---------- Build React ----------
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- Serve React ----------
FROM nginx:alpine

# remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# create custom nginx config using Railway PORT
RUN printf "server { \
  listen $PORT; \
  server_name _; \
  location / { \
    root /usr/share/nginx/html; \
    index index.html; \
    try_files \$uri /index.html; \
  } \
}" > /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]