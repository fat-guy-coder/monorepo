FROM oven/bun:latest

WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖（使用 bun）
RUN bun install

# 复制源码
COPY . .

# 开发环境启动命令（开启热更新）
CMD ["bun", "--hot", "run", "src/server.ts"]
