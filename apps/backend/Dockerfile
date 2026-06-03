FROM oven/bun:latest

WORKDIR /app

# 复制依赖文件
COPY package.json bun.lock ./

# 安装依赖（国内镜像加速 + 锁文件）
RUN bun install --frozen-lockfile --registry https://registry.npmmirror.com

# 复制源码
COPY . .

# 开发环境启动命令（开启热更新）
CMD ["bun", "--hot", "run", "src/server.ts"]
