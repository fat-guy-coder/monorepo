# Monorepo 项目文档

## 项目结构

```
monorepo/
├── apps/
│   ├── front-learning/    # 前端学习网站 (Vue 3)
│   ├── main/              # 个人主页 (Vue 3)
├── packages/              # 共享包
├── turbo.json             # Turborepo 配置
└── pnpm-workspace.yaml   # pnpm 工作区配置
```

## 工作区配置

项目使用 pnpm workspace，根目录 `package.json` 中的 `devDependencies` 供所有子项目共享使用。

### apps/front-learning

- **框架**: Vue 3 + TypeScript + Less
- **路由**: vue-router
- **状态管理**: Pinia
- **构建**: Vite
- **端口**: 待定

### apps/main - 个人主页项目

- **框架**: Vue 3
- **路由**: @solidjs/router
- **样式**: Less
- **端口**: 待定


## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm install` | 安装所有依赖 |
| `pnpm front-learning:dev` | 启动前端学习网站 |
| `pnpm main:dev` | 启动个人主页 |
| `pnpm go:dev` | 启动 Go 前端 |
| `pnpm go-server:dev` | 启动 Go 后端 |
| `pnpm cpp:dev` | 启动 C++ 前端 |
| `pnpm cpp-server:dev` | 启动 C++ 后端 (需 CMake) |
| `pnpm go:build` | 构建 Go 前端 |

## 设计规范 (apps/main, apps/go, apps/cpp)

**主题: 赛博朋克 / 科技风**

### 配色方案
| 名称 | 颜色 | 用途 |
|------|------|------|
| 主色 | `#00ffff` | 主强调色、链接、高亮 |
| 辅色 | `#ff00ff` | 次要强调、边框 |
| 警告/激光 | `#ff3333` | 交互状态、激光效果 |
| 成功 | `#00ff88` | 正面指示 |
| 背景深 | `#0a0a0f` | 主背景 |
| 背景中 | `#1a1a2e` | 次要背景 |
| 表面 | `rgba(20, 20, 35, 0.9)` | 卡片背景 |

### 设计元素
- **背景**: 深色渐变 + 网格叠加 + 浮动粒子
- **卡片**: 渐变背景 + 发光边框 + 圆角
- **文字**: 大写 + 字间距 + 发光阴影
- **动画**: GSAP 入场动画 + CSS 过渡

详细规范见 [.claude/agent-skills/](.claude/agent-skills/)

## 开发规范

1. 使用 TypeScript 进行开发
2. 前端组件使用对应框架的函数式组件
3. 样式使用 Tailwind CSS
4. 动画使用 GSAP + CSS (main 项目)
5. 确保构建通过后再提交代码
6. **遵循科技风设计规范**

## 工作区共享组件 (packages/components)

**优先使用工作区组件，避免重复造轮子**

### 引入方式

```typescript
import { Button, Input, Select, Modal, Tree, message } from 'components'
```

### 常用组件

| 组件 | 说明 |
|------|------|
| Button | 按钮 (default/primary) |
| Input | 输入框 |
| Select | 下拉选择 |
| Modal | 模态框 |
| Tree | 树形组件 |
| Menu | 菜单 |
| message | 消息提示 (success/error/warning/info) |

### 完整组件列表

见 [packages/components/README.md](packages/components/README.md)

### 创建新组件

1. 在 `packages/components/src/components/` 下创建组件文件夹
2. 导出类型声明和组件
3. 在 `packages/components/src/components/index.ts` 中注册
4. 组件文档放在组件文件夹下的 readme.md
