<<<<<<< HEAD
# ---------- Stage 1: Build React App ----------
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build production bundle
RUN npm run build


# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine

# Copy build files to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

=======
# ---------- Build React ----------
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- Serve React ----------
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
>>>>>>> c676c70f (fix: sync dependencies for docker build)
CMD ["nginx", "-g", "daemon off;"]