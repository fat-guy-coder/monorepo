## 快速说明 — 让 AI 代理立即上手这个代码库

本仓库是一个使用 pnpm workspace 与 Turbo 的 monorepo，包含多个子应用（主要是 `apps/front-learning` 前端、`apps/express` 后端、`apps/svelte`）和共享包 `packages/*`。下面的说明聚焦于可被自动化代理直接利用的“可执行知识”：项目结构、关键文件、常见命令、约定与已知陷阱。

### 核心架构（大图）
- 根：`package.json`（通过 pnpm workspace 管理）、`pnpm-workspace.yaml`、`turbo.json`（pipeline/caching 约定）。
- 前端：`apps/front-learning` — Vue 3 + TypeScript + Less + Vite。路由与页面在 `apps/front-learning/src/router` 和 `apps/front-learning/src/views`。
- 后端：`apps/express` — Express + TypeScript（开发使用 `ts-node-dev`）。入口：`apps/express/src/app.ts`。
- 共享工具/包：`packages/*`，例：`packages/utils`。这些通常被前端或后端复用。

### 关键文件（优先阅读）
- `package.json` (根)：包含 workspace 脚本（`pnpm -r`、`pnpm -F`、turbo 相关脚本）。示例：`pnpm dev` 会在 workspace 内并行启动 dev。查看根 scripts 了解常用快捷脚本。
- `pnpm-workspace.yaml`：声明哪些目录是 workspace（`apps/*`、`packages/**`）。添加新包需更新此文件或放到被匹配路径下。
- `turbo.json`：CI/缓存/依赖关系（例如 build 的 `dependsOn`）。Agent 在做跨包更改时应考虑 turbo 缓存影响。
- `apps/front-learning/src/assets/css/theme.less`：全局主题/设计令牌（颜色、变量），样式修改常在此处变更。
- `apps/front-learning/src/router/generatedRoutes.ts` 与 `apps/front-learning/scripts/generateRouteAndView.ts`：路由通常通过脚本生成，编辑路由前请检查生成逻辑。
- `apps/express/src/app.ts`：后端启动与中间件，调试后端请从这里着手。

### 常用命令（具体示例）
- 安装依赖（在仓库根）：
  pnpm install
- 启动所有（workspace）开发：
  pnpm dev          # 根 package.json 的脚本，会调用 pnpm -r run dev
- 启动单个应用：
  pnpm -F front-learning run dev    # 只启动 front-learning 前端
  pnpm -F express run dev  # 只启动 express 后端（使用 ts-node-dev）
- 构建：
  pnpm build                 # 根脚本：pnpm -r run build
  pnpm -F front-learning build        # 构建 front-learning
  turbo -F front-learning run build   # 使用 turbo 有选择性地执行（更快/可缓存）

注意：根脚本里有对 `build-only`/`build:express` 的引用，但 `apps/express/package.json` 目前没有 `build-only` 脚本——遇到失败时请先检查该子包 scripts。

### 项目约定与模式（可被代理利用）
- 以 `pnpm -F <pkg>` 定向运行子包任务；`pnpm -r` 在所有工作区运行。代理在修改单个包时优先使用 `-F` 以缩短反馈循环。
- 路由/页面在 `apps/front-learning/src/views`；许多页面由生成脚本维护（`scripts/generateRouteAndView.ts`），直接修改视图/路由前先确认是否需要更新生成脚本。
- 样式系统集中在 `src/assets/css`（Less）；主题变量集中在 `theme.less`。改颜色/变量通常只需改该文件并重启前端 dev 服务以看到效果。
- 后端使用 `ts-node-dev` 在开发时直接运行 TypeScript；生产部署会需要先编译（仓库当前未统一提供 express 的构建脚本）。

### 集成点与外部依赖
- 前端（front-learning）与后端（express）通常通过 HTTP API 或静态资源协作，env 变量可能影响运行（`turbo.json` 中列出 `globalEnv: ["API_KEY","ENV"]`）。
- 共享逻辑/工具应放入 `packages/*`，修改这些包时请注意消费方的构建顺序（turbo 的 `dependsOn` 可帮助推断）。

### 已知问题/小心点（可避免浪费时间）
- express 包缺少构建脚本，但根脚本可能期望 `build-only`：在自动化修改或 CI 脚本中请先确认子包有相应脚本。
- 路由是部分自动生成的；改动可能被生成脚本覆盖——优先检查 `apps/front-learning/scripts`。
- Husky 在 root devDependencies 中列出，但未必自动启用。提交钩子行为在仓库中可能不统一。

### 对 AI 代理的具体任务提示（可作为短指令模板）
- 若要修改样式颜色：编辑 `apps/front-learning/src/assets/css/theme.less` → 重启 `pnpm -F front-learning run dev` → 在浏览器验证外观。
- 若要添加页面路由：先检查 `apps/front-learning/scripts/generateRouteAndView.ts`；若路由自动生成，更新来源数据或脚本；否则添加 vue view 并在 `src/router` 注册。
- 若要调试后端 API：运行 `pnpm -F express run dev`（ts-node-dev），观察 `apps/express/src/app.ts` 日志并发送请求到本地端口。

如果有遗漏的项目级特殊约定（比如 CI token、私有 registry、或额外的 build 脚本），请指出我会把它们合并进来。
