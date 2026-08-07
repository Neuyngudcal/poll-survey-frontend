# Giai đoạn 1: Build source code
FROM node:20-alpine AS build-stage

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy các file cấu hình package vào
COPY package*.json ./

# Cài đặt các thư viện cần thiết
RUN npm install

# Copy toàn bộ mã nguồn vào
COPY . .

# Build ứng dụng Vite ra file tĩnh
RUN npm run build


# Giai đoạn 2: Chạy ứng dụng bằng Nginx
FROM nginx:alpine AS production-stage

# Copy file cấu hình Nginx (cho Vue Router SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy thư mục build (dist) từ giai đoạn 1 sang Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 cho container
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
