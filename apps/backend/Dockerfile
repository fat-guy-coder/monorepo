FROM oven/bun:latest

WORKDIR /app

# 复制依赖文件
COPY package.json bun.lock ./

# 使用国内镜像源加速（阿里云服务器）
RUN bun config set registry https://registry.npmmirror.com

# 安装依赖（使用 bun，按锁文件安装）
RUN bun install --frozen-lockfile

# 复制源码
COPY . .

# 开发环境启动命令（开启热更新）
CMD ["bun", "--hot", "run", "src/server.ts"]
