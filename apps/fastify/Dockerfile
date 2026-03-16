FROM node:20-slim

WORKDIR /app

# 安装 OpenSSL（Prisma 需要）
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# 复制依赖文件并安装
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

# 生成 Prisma Client（必须）
RUN npx prisma generate

# 复制源码（开发环境下会被卷覆盖，但构建时需要）
COPY . .

# 开发环境启动命令
CMD ["npm", "run", "dev"]