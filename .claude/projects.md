# 项目技术栈

## Godot 学习内容进度

> 文档路径: `apps/learning/src/views/GameProduction/GotDot/`
> 样式规范: go-doc-style skill（Godot 用 blue 主色调，TS+Python 双类比，强类型 GDScript）

| 阶段 | 状态 | 篇数 | 备注 |
|------|------|------|------|
| 阶段0: 引擎概览 | ✅ 完成 | 8 | +调试基础 +项目设置（2024-06 新增2篇） |
| 阶段1: GDScript | ✅ 完成 | 14 | +内置数学类型（2024-06 新增1篇），signals/functions 已扩展 |
| 阶段2: Node系统 | ✅ 完成 | 12 | CharacterBody2D 已扩展为完整平台角色教程 |
| 阶段3: UI系统 | ⏳ 待写 | 12 | — |
| 阶段4: 场景管理 | ⏳ 待写 | 10 | — |
| 阶段5: 输入+动画 | ⏳ 待写 | 10 | — |
| 阶段6: 物理 | ⏳ 待写 | 8 | — |
| 阶段7: GDScript进阶 | ⏳ 待写 | 12 | — |
| 阶段8: 编辑器工具 | ⏳ 待写 | 8 | — |
| 阶段9: 实战项目 | ⏳ 待写 | 5 | — |

> 已完成: 31篇 | 总计: 96+篇 | 进度: ~32%

### 已扩展的核心文档（含实战案例）

- `godot-1-8-signals-basics.vue` — 健康系统+信号总线+Callable传递+常见错误
- `godot-1-6-functions.vue` — Callable深入+static+lambda陷阱+回调实战
- `godot-2-6-characterbody2d.vue` — 完整平台脚本(coyote time+jump buffer)+move_and_slide原理+FAQ

### Godot Demo 文件（可运行的实战练习）

> 路径: `apps/game/demos/`
> 用法: 打开 `demo_runner.tscn` → 附加对应 demo .gd → F6 → Output 面板看结果
> 原则: 一个文件只讲一个概念，20-50行，注释标注 TS/Python 对应写法

| 阶段 | Demo 文件 | 对应文档 | 状态 |
|------|----------|---------|------|
| 1-GDScript | demo_variables_types.gd | godot-1-2 | ✅ |
| 1-GDScript | demo_arrays_dicts.gd | godot-1-4 | ✅ |
| 1-GDScript | demo_signals.gd | godot-1-8 | ✅ |
| 2-Nodes | demo_lifecycle.gd | godot-2-1 | ✅ |
| 1-GDScript | demo_operators.gd ~ demo_setget.gd | godot-1-3~1-13 | ⏳ 待写 |

## apps/learning

### Dependencies (package.json)
- vue: 3.6.0-alpha.1
- vue-router: 4.5.0
- pinia: 3.0.1
- @vue/compiler-sfc: 3.5.25
- codemirror: 6.0.2
- prismjs: 1.29.0
- less: 4.4.2
- magic-string: 0.30.21
- utils: workspace:^

### DevDependencies
- @vitejs/plugin-vue: beta
- @vitejs/plugin-vue-jsx: beta
- typescript
- vue-tsc
- vite
- eslint / prettier
- vitest

## apps/main

### Dependencies (项目特有)
- gsap: ^3.13.0

### DevDependencies (项目特有)
- @tailwindcss/postcss: ^4.2.1
- tailwindcss: ^4.2.1
- postcss / autoprefixer

## 根目录 Workspace 共享依赖

### devDependencies
- tailwindcss: ^4.2.1
- @tailwindcss/postcss: ^4.2.1
- postcss: ^8.5.8
- autoprefixer: ^10.4.27
- vite: ^7.2.4
- vite-plugin-solid: ^2.11.8
- typescript: ^5.9.2
