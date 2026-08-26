# 📊 全项目进度面板

> 更新时间: 2026-08-25 | 当前活跃任务: **Go 文档补全（阶段 1 基础 22/22 · 阶段 2 并发 14/14 · 下一步阶段 3 Web）**

## 🎯 当前任务（下次 AI 会话继续入口）

**主任务：** 填充 DSA 算法与数据结构学习文档（`apps/learning/src/views/AlgorithmsAndDataStructures/`）
- ✅ 模块 1（复杂度分析）：8/8 篇，100% 完成
- ✅ 模块 2（线性数据结构）：22/22 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层）
- ✅ 模块 3（哈希表）：11/11 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层，新增了「密码学哈希 MD5/SHA」一章）
- ✅ 模块 4（树）：21/21 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层）
- ✅ 模块 5（堆）：11/11 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层，新增了「堆的基本概念」基础章节）
- ✅ 模块 6（图）：20/20 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层）
- ✅ 模块 7（排序）：17/17 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层，补齐了冒泡/选择/鸡尾酒/梳/锦标赛/Tim/内省等）
- ✅ 模块 8（搜索）：10/10 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层）
- ⏳ 模块 9-13：待填充

**继续指令：** 对 AI 说「继续 DSA 算法文档的更新，从模块 9（动态规划）开始」

**子任务：** 模块 2 视觉增强（✅ 已完成）
- 22 篇全部有：开头静态 SVG 结构图（`📐 结构总览`）+ 结尾 Canvas 动画（`🎬 动画演示`）
- 结构图规范见 `.claude/skills/dsa-diagram/SKILL.md`
- 动画规范见 `.claude/skills/dsa-visualizer/SKILL.md`
- 文档样式规范见 `.claude/skills/doc-style/SKILL.md`

**模块 2/3 内容增强（2026-08-24）：**
- `dsa-2-1-4-prefix-sum`：差分数组补全为「结构（SVG）→ 操作（before/after SVG）→ 特点 → 用途」四层
- `dsa-3-1-4-crypto-hash`：新增 SHA-3 海绵结构图、HMAC 章节（两次哈希 SVG + 代码）、「攻击与对策」节（生日攻击 / 长度扩展攻击 / HMAC / 双重哈希对比表）
- `dsa-3-1-1-principle`：新增「map 的 value 存在哪」小节（内存布局 SVG：引用 + 堆桶数组 + 值内联/指针两布局 + key/value 成对存 + 扩容搬家）
- `dsa-3-1-4-crypto-hash` 二次增强：MD5 补「单步压缩数据流」——公式 `a = b + ((a + F(b,c,d) + X[k] + T[i]) <<< s)` + 图 2-1 数据流 SVG + IV/4 轮结构表 + `md5StepCode` 完整实现；SHA 补「内部实现」——SHA-256 单轮 SVG（左列 Σ0/Maj / 右列 Σ1/Ch + 消息扩展 σ0/σ1 + 64 轮 K 常量）+ `sha256RoundCode`；SHA-1 5 寄存器 80 步 + `sha1StepCode`；末尾加「三代 MD 结构逐项对比表」（MD5 vs SHA-1 vs SHA-256，9 个维度）
- `dsa-3-3-3-consistent`：重写为 9 节完整教程——一句话定义横幅 + 取模哈希雪崩 SVG + 三步理解 + 顺时针查找规则 + 3 节点 6 key 完整走查表 + 迁移成本公式（取模≈全量 vs 一致性哈希≈1/n）+ 虚拟节点 + 增删流程 + Redis Cluster 场景陷阱，新增 `consistentHashCode`/`workedExampleCode`/`migrationCode`/`virtualNodeCode`/`addRemoveFlowCode` 等代码
- `dsa-4-0-3-dfs`：sec-4「递归 vs 显式栈」深挖显式栈——新增「隐式栈调用帧」SVG（图 4-1，递归 ↔ 栈帧逐层对应）+ 递归↔显式栈逐行对照表 + 「用循环控制压栈数量」心智模型澄清（总量由树决定，可控的是压什么/顺序/限深三个旋钮）+ 统一任务栈代码（VISIT/EXPAND 一个 while 走遍前后序）+ 深度受限版 IDDFS 代码（可控制数量落地）

---

## 一、DSA 算法与数据结构文档（前端 Vue 文档）

> 路径: `apps/learning/src/views/AlgorithmsAndDataStructures/`

| 模块 | 名称 | 文件数 | 文档 | 结构图 | 动画 | 状态 |
|------|------|--------|------|--------|------|------|
| 1 | 复杂度分析基础 | 8 | ✅ 8/8 | 0 | 0 | ✅ 完成 |
| 2 | 线性数据结构 | 22 | ✅ 22/22 | 🎨 22 | 🎬 22 | ✅ 完成 |
| 3 | 哈希表 | 11 | ✅ 11/11 | 🎨 11 | 🎬 11 | ✅ 完成 |
| 4 | 树 | 21 | ✅ 21/21 | 🎨 21 | 🎬 21 | ✅ 完成 |
| 5 | 堆 | 11 | ✅ 11/11 | 🎨 11 | 🎬 11 | ✅ 完成 |
| 6 | 图 | 20 | ✅ 20/20 | 🎨 20 | 🎬 20 | ✅ 完成 |
| 7 | 排序 | 17 | ✅ 17/17 | 🎨 17 | 🎬 17 | ✅ 完成 |
| 8 | 搜索 | 10 | ✅ 10/10 | 🎨 10 | 🎬 10 | ✅ 完成 |
| 9 | 动态规划 | 17 | 空壳 | — | — | ⏳ 待填充 |
| 10 | 贪心算法 | 7 | 空壳 | — | — | ⏳ 待填充 |
| 11 | 字符串算法 | 11 | 空壳 | — | — | ⏳ 待填充 |
| 12 | 高级数据结构 | 10 | 空壳 | — | — | ⏳ 待填充 |
| 13 | 解题方法论 | 8 | 空壳 | — | — | ⏳ 待填充 |
| **合计** | | **174** | **120** | **112** | **112** | **69%** |

**视觉增强（模块 2 全部完成）：**

模块 2 的 22 篇文档全部具备「📐 结构总览（静态 SVG）+ 正文 + 🎬 动画演示（Canvas）」三层结构：
- **结构图**（`dsa-diagram` skill）：数组/链表/栈/队列/跳表的结构图 + 关键操作 before/after 示意图
- **动画**（`dsa-visualizer` skill）：数组 Bar 图、链表节点+箭头、栈垂直堆叠、队列水平滑动、跳表多层查找等

**生成工具：** `apps/learning/scripts/generateRouteAndView.ts` — 从后端菜单 API 自动生成 .vue 文件壳。注意：全量菜单可能包含孤儿节点（parentId=null 的重复菜单），需先清理数据库。

---

## 一·五、计算机图形学（新增章节）

> 路径: `apps/learning/src/views/ComputerGraphics/` | 根菜单 id: `09196f09-d5c2-479a-9d80-fc171c379f05`（`/ComputerGraphics`）

| 模块 | 名称 | 叶子数 | 状态 |
|------|------|--------|------|
| — | 学习路线图 | 1 | 空壳 |
| 1 | 数学基础 | 6 | 空壳 |
| 2 | 渲染管线 | 6 | 空壳 |
| 3 | 光照与着色 | 6 | 空壳 |
| 4 | 纹理与采样 | 6 | 空壳 |
| 5 | 3D 几何与相机 | 6 | 空壳 |
| 6 | 光栅化与抗锯齿 | 6 | 空壳 |
| 7 | 光线追踪 | 6 | 空壳 |
| 8 | 着色器编程 | 6 | 空壳 |
| 9 | GPU 渲染技术 | 6 | 空壳 |
| 10 | 图形 API | 5 | 空壳 |
| 11 | 游戏渲染实践 | 6 | 空壳 |
| **合计** | | **66** | ⏳ 待填充 |

- **为游戏开发服务**：数学基础/渲染管线/光照着色/光追/着色器/图形 API/游戏渲染实践
- **菜单**：数据库为准，admin 后台/`POST /api/menus/batch` 管理，无本地 JSON
- **继续指令：** 「继续计算机图形学文档的填充，从模块 1（数学基础）开始」
- 填充文档同样遵循 `doc-style` + `dsa-diagram`（结构图）+ `dsa-visualizer`（动画）三层规范

---

## 一·六、计算机基础·操作系统（新增章节）

> 路径: `apps/learning/src/views/ComputerBasicKnowledge/cs-phase-5-os/` | 学习网站「计算机基础 → 操作系统」

| 模块 | 名称 | 篇数 | 状态 |
|------|------|------|------|
| A | 操作系统基础 | 6（os-intro/os-arch/os-compare/kernel/interrupt/boot） | ✅ 已完成（本次） |
| B | 进程管理 | 4 | ✅ 已完成 |
| C | 进程同步 | 4 | ✅ 已完成 |
| D | 内存管理 | 5 | 🔄 d-5 已完成，d-1~d-4 空壳 |
| E | 文件系统 | 3（inode/journal/io-model） | ⏳ 空壳 |
| **合计** | | **21** | **15/21 有内容** |

**2026-08-26 批量填充 B/C 两模块 8 篇（空壳 → 完整，共 3537 行，均过 @vue/compiler-sfc 校验）：**
- **B 进程**：cs-5-b-1-pcb（PCB 与上下文切换，466 行）、cs-5-b-2-fork（fork/exec/wait + 写时复制，396 行）、cs-5-b-3-thread（**用户态/内核态线程 + 协程**，415 行）、cs-5-b-4-scheduling（FCFS/SJF/RR/MLFQ/CFS + GMP，505 行）
- **C 同步**：cs-5-c-1-race（竞态条件/临界区/happens-before，490 行）、cs-5-c-2-locks（互斥锁/自旋锁/读写锁 + futex 底层，366 行）、cs-5-c-3-semaphore（信号量/条件变量，424 行）、cs-5-c-4-deadlock（四条件/银行家算法/检测恢复，475 行）
- **目的：理解 Go 底层实现**——每篇含「与 Go 底层实现的关系」专节：G 结构体 ≈ goroutine 的 PCB；goroutine = 用户态协程（M:N）；`go run -race` = TSan 影子内存；sync.Mutex 底层 = 原子 CAS + 自旋 + futex 挂起；channel ≈ 信号量 = 互斥锁 + 条件变量等待队列 + 环形缓冲；Go 运行时死锁检测（fatal error: all goroutines are asleep）。Link 跳转 go-2-1-goroutine-gmp / go-2-2-channels / go-2-5-sync-mutex / go-2-6-sync-wg-once / go-2-7-atomic / go-2-10-race-detection / go-2-13-goroutine-leak
- **风格**：amber 主题（非 Go 的 cyan），参照 cs-5-d-5-shadow-memory.vue；每篇 📐 结构总览内联 SVG + 类比三件套（🔗 前端紫色 + ⚙️ 后端·Go 青色 + 🌍 现实橙色）+ ⚠️ 坑 + Link 页脚导航链已闭环

**2026-08-26 批量填充 A 模块 6 篇（空壳 → 完整，共 2659 行，均过 @vue/compiler-sfc 校验）：**
- cs-5-a-0-os-intro（操作系统介绍：定义/四大资源管理/抽象/历史/分类，Go runtime ≈ 用户态迷你 OS，425 行）
- cs-5-a-1-kernel（内核态 vs 用户态、系统调用 6 步全流程 + syscall table/strace，Go 每次 IO 陷入内核 + netpoller，400 行）
- cs-5-a-2-interrupt（中断/异常/陷阱三分、IDT、中断处理 6 步、上/下半部，Go1.14+ 抢占式调度靠信号中断，528 行）
- cs-5-a-3-boot（BIOS/UEFI→GRUB→start_kernel→init/systemd 全链路，Go runtime 启动顺序对照，391 行）
- cs-5-a-4-os-arch（宏内核/微内核/混合内核对比，Go runtime = 用户态「微内核」+ Linux 宏内核两级配合，479 行）
- cs-5-a-5-os-compare（Windows NT/Linux/macOS XNU/Unix 谱系，GOOS/GOARCH 交叉编译 + 生产环境为何都是 Linux，436 行）
- **类比三件套**：🔗 前端（Chrome 标签页/浏览器沙箱/微前端）+ ⚙️ 后端·Go（GMP/内存分配器/netpoller ≈ 迷你 OS）+ 🌍 现实（酒店前台/银行柜台/公司组织），每篇三色类比框齐全
- **页脚链**：cs-4-k-5-yield → a-0-os-intro → a-1-kernel → a-2-interrupt → a-3-boot → a-4-os-arch → a-5-os-compare → b-1-pcb → b-2-fork（b-1 上一节已改为 a-5）

**继续指令：** 「继续填充操作系统模块，先填 D 模块内存管理（cs-5-d-1-paging / cs-5-d-2-virtual / cs-5-d-3-replacement / cs-5-d-4-segmentation）或 E 模块文件系统（cs-5-e-1-inode / cs-5-e-2-journal / cs-5-e-3-io-model）」

---

## 二、Go 学习文档

> 路径: `apps/go/` (代码) + `apps/learning/src/views/backend/BackendLanguage/GO/` (前端文档)

| 阶段 | 名称 | .vue 文档 | .go 代码 | 状态 |
|------|------|-----------|----------|------|
| 1 | 基础入门 | 22/22 ✅ | 22/22 ✅ | ✅ 完成 |
| 2 | 并发编程 | 14/14 ✅ | 5/14 | 🔄 进行中 |
| 3 | Web 开发 | 0/16 | 3/16 | ⏳ 待开始 |
| 4 | 数据库 | 0/14 | 0/14 | ⏳ 待开始 |
| 5 | 微服务 | 0/16 | 3/16 | ⏳ 待开始 |
| 6 | 工程化 | 0/15 | 0/15 | ⏳ 待开始 |
| 7 | 进阶 | 0/15 | 0/15 | ⏳ 待开始 |
| **合计** | | **36/108** | **33/108** | **33%** |

**阶段 2 并发文档（2026-08-24 更新）：** 13 个 .vue 文件均有内容，其中 13 篇含「结构总览」层（go-2-1 ~ go-2-13）——**go-2-12 errgroup** 补「扇出任务 · 聚合错误 · 出错即取消」结构图（main → Group → 3 个 goroutine；G2 出错 → cancel 广播 → G3 收到 <-ctx.Done() 提前退出 → Wait 聚合返回第一个 error）；**go-2-13 goroutine 泄漏** 补「阻塞无人接收的 channel → park 在 sendq → 栈被引用 → GC 无法回收」结构图（含检测/修复速查）。此前已补全 go-2-9 并发模式（Fan-out/in · Worker Pool · Or-Done · Generator）、go-2-10 竞态检测（竞态三条件 · 典型场景 · 修复速查）、go-2-11 sync.Pool（无锁设计 + victim 两代缓存 · 标准姿势 · 适用场景与优缺点）；**go-1-14 包与模块** 补全为 10 节（新增「包是什么」「实战：apps/go/backend 分层」「常见错误」，强化 internal 边界 + go.mod 路径映射）；**go-2-3 select** 强化「④ for-select 循环」，明确「无间隔/事件驱动」语义。**2026-08-25 深度补全 4 篇偏薄的阶段 2 文档**（144~176 行 → 372~412 行，均已通过 @vue/compiler-sfc 校验）——go-2-6 WaitGroup/Once/Cond（双重检查锁定执行流程 · 4 坑 · 等就绪屏障实战）、go-2-7 atomic（竞态现场还原执行流程 · Go 1.19 新 API 对照 · 5 坑 · 无锁计数器实战）、go-2-12 errgroup（fail-fast 全链路执行流程 · Promise.all/allSettled 对照表 · 5 坑 · BFF 聚合实战）、go-2-13 goroutine 泄漏（泄漏发生全流程 · pprof/goleak 检测深度 · 4 坑 · 发送方/接收方责任矩阵）；每篇均含「执行流程拆解 + 常见错误与陷阱 + 反模式经验法则 + 生产实战 + 前端类比」。动画层（vue-konva）可选补齐。

**2026-08-25 新增 4 篇基础/并发文档（补齐课程缺口）：** 按「基础入门 + 并发编程」课程缺口补了 4 个主题，每个都有线上菜单 + .vue 文档 + .go 源码 + runner 注册——**go-1-20 泛型 Generics**（cmp.Ordered / 类型集约束 / GenericStack[T] / slices·maps 标准库）、**go-1-21 JSON 序列化**（Marshal/Unmarshal / omitempty / - / 自定义 MarshalJSON / NDJSON 流式解码）、**go-1-22 反射 reflect**（TypeOf/ValueOf / 遍历字段读 tag / struct→map / 反射改值）、**go-2-14 sync.Map**（Load/Store/LoadOrStore/Range / 100 并发读缓存实战 / 读写分离适用场景）。菜单已 POST 到生产库（denglie.asia），前端 views-loader 动态 glob 自动匹配 .vue；footer 导航链已重连（go-1-19→go-1-20→go-1-21→go-1-22→go-2-1、go-2-12→go-2-13→go-2-14）。修复 basics runner 的 matchTopic 子串冲突（"reflection" 含 "io" 被 fmt 抢走 → 新 case 移到 switch 顶部，`go run . 1 reflection` / `go run . 2 syncmap` 已验证输出正确）。

**2026-08-25 新增「GO 学习方法」页：** GO 主菜单下新增 `GOLearningMethod`（order=2，学习网站「GO → GO学习方法」页面），并同步更新 `apps/go/LEARNING_METHOD.md`——整合三档消化法（A 档：能塞进 backend 的并发 context/sync.Map/errgroup/限流/atomic；B 档：泛型/反射等 playground 动手练；C 档：GMP/泄漏/pprof/sync.Pool 跑 demo 看懂）、3 步主动回忆法（看 doc → go run → 改代码预测输出）、并发主题 ↔ backend 实战映射表。目标是解决「menu CRUD 用不上并发，阶段 2 知识不会自然出现」的学习盲区。

**2026-08-25 并发基础补强：** go-2-6 新增「实战 3：WaitGroup 关门模式」（等所有发送者干完再 close——完整示例 + 4 步执行流程）与「坑 5：main 不等 goroutine，没 Wait 直接退出 → 打印全被跳过」；go-2-2 新增「for v := range ch 语法糖拆解」（等价 `v, ok := <-ch` 循环 / 结束条件=关闭+排空 / 不 close → 永不退出：main 死锁、goroutine 泄漏）+「close 跟缓冲填满无关」澄清。新建 `.claude/skills/go-backend-practice` skill（「能塞进 backend 就塞进去」：三档消化法 + 阶段 3 Web 开发通用后端服务基本全塞 backend），已注册到 CLAUDE.md skill 表。

**📖 学习者当前位置（2026-08-25 更新，回家继续学）：**
- **已看完**：阶段 1 基础入门 + 阶段 2 并发编程 全部文档
- **正在练**（`apps/go/playground/channel_demo.go`，当前是无缓冲 + 关门 goroutine 版）：goroutine 异步 + WaitGroup 同步 → channel 生产-消费 → 「关门模式」（`wg.Wait()` 后再 `close`）→ 无缓冲握手 → 死锁分析（直接写 `wg.Wait` 在缓冲<发送数/无缓冲时死锁，关门 goroutine 写法对任意缓冲大小都安全）
- **回家练习（改参数 → 预测 → 再跑）**：① 把 `n` 改 5，预测输出（应照常打 0-4，握手逐个完成）② 删掉 `defer wg.Done()`，预测会不会死锁（wg.Wait 永不返回，关门 goroutine 卡死）③ 把 `a <- c` 换成先 sleep 再发，观察握手节奏
- **下一步学习路径**：并发基础练完 → **阶段 1.5**（backend 加 sync.Map 缓存层 + context 超时中间件）→ **阶段 2 Web 开发**（go-3-x-web，通用后端服务基本全塞进 backend，见 go-backend-practice skill / LEARNING_METHOD.md）

**继续指令：** 「继续 Go 文档的填充」「继续 Go 阶段 3（Web 开发）」「给 go-2-12/2-13/2-14 补动画层」

**运行：** `cd apps/go && go run . <stage> [topic]` 或 `go run . all`

---

## 三、Python 学习文档

> 路径: `apps/learning/src/views/backend/BackendLanguage/Python/`

共 37 个 .vue 文档（空壳为主）。学习路径见 `apps/python/LEARNING_PATH.md`。

| 阶段 | 内容 | 状态 |
|------|------|------|
| 1 | 基础脚本 | ⏳ |
| 2 | 面向对象 | ⏳ |
| 3 | Web 框架 (Flask/FastAPI/Django) | ⏳ |
| 4 | 数据库实战 | ⏳ |
| 5 | 项目进阶 | ⏳ |

**继续指令：** 「继续 Python 文档的填充」

---

## 四、Godot 游戏开发

### 4.1 Godot 学习文档

> 路径: `apps/learning/src/views/GameProduction/`

共 101 个 .vue 文档（空壳为主）。Godot 文档也遵循 `doc-style` 规范，但 GDScript 代码使用强类型（Static Typing）。

**继续指令：** 「继续 Godot 文档的填充」

### 4.2 Blitz 游戏项目

> 路径: `apps/game/blitz/`

包含：`scripts/`（GDScript 源码）、`scenes/`（场景文件）、`DESIGN.md`（设计文档）。

每个 .gd 脚本顶部有 `## 📚 涉及学习文档:` 注释块关联到 Godot 学习文档，关键代码行用 `# → godot-X-Y-name: 说明` 标注。

**继续指令：** 「继续 Blitz 游戏开发」

---

## 五、后端 API

> 路径: `apps/backend/` | 运行时: Bun + Drizzle + PostgreSQL | 端口: 3000

- ✅ 菜单 CRUD API（完整，含批量创建/删除/搜索/树形查询）
- ✅ 用户认证 API（JWT 登录/注册/角色）
- ✅ 菜单管理走 admin 后台（数据库为准，无本地菜单 JSON）

API 文档: `apps/backend/API.md` | 快速启动: `docker-compose up -d backend postgres`

**继续指令：** 「继续后端开发」「添加 XXX API 接口」

---

## 六、前端网站（learning）

> 路径: `apps/learning/` | Vue 3 + Pinia + Tailwind CSS v4 + Vite

- ✅ 学习文档系统（动态路由 + 多 Tab + 侧边菜单树）
- ✅ 共享组件库（Code、Nav、EditorLink、LearningPath 等）
- ✅ 管理后台（`apps/admin/`，端口 8848）
- ✅ 个人主页（`apps/main/`，赛博朋克风）

**关键约定：**
- 页面跳转用 `inject('goToByName')` 或 `<Link :route="item.name">`，不用 `<RouterLink>`
- Code 组件: `import { Code } from 'components'`，支持 `language="ts"|"go"|"bash"|"text"` 等
- 底部导航用 path-based RouterLink：`to="/AlgorithmsAndDataStructures/dsa-module-2-linear/..."`

---

## 七、Skills 清单

| Skill | 用途 | 位置 |
|-------|------|------|
| `doc-style` | 所有学习文档的统一样式规范（布局/配色/组件） | `.claude/skills/doc-style/` |
| `go-backend-practice` | Go 学习驱动规则：「能塞进 backend 就塞进去」三档消化法 + 阶段 3 Web 全塞 backend | `.claude/skills/go-backend-practice/` |
| `dsa-diagram` | 文档开头静态 SVG 结构图规范（内联 SVG/配色/marker） | `.claude/skills/dsa-diagram/` |
| `dsa-visualizer` | 文档结尾 Canvas 动画规范（vue-konva inline 动画模板） | `.claude/skills/dsa-visualizer/` |
| `openspec-propose` | OpenSpec 变更提案 | `.claude/skills/openspec-propose/` |
| `openspec-apply-change` | 实施 OpenSpec 变更任务 | `.claude/skills/openspec-apply-change/` |
| `openspec-archive-change` | 归档 OpenSpec 变更 | `.claude/skills/openspec-archive-change/` |
| `openspec-explore` | 探索模式，理清需求 | `.claude/skills/openspec-explore/` |

---

## 八、快速恢复指南

**新会话启动时对 AI 说：**

| 任务 | 提示词 |
|------|--------|
| 继续 DSA 文档 | 「继续 DSA 算法文档的更新，从模块 9（动态规划）开始」 |
| 继续 Go 文档 | 「继续 Go 学习文档的填充，从阶段 2 开始」 |
| 继续 Godot 文档 | 「继续 Godot 学习文档的填充」 |
| 继续后端开发 | 「继续后端 API 开发」 |
| 继续游戏开发 | 「继续 Blitz 游戏项目开发」 |

> **提示：** 新会话中 AI 首先读取 `README.md` 和 `PROGRESS.md`（本文件），即可了解全局状态和当前任务。

### ⚡ 批量文档填充：用子代理并行

批量填充文档（一次填一个模块/阶段的多篇）时，**不要串行写**，用 `Agent` 工具派生子代理并行处理：

1. Glob 列出待填充的空壳文件（< 200 字节）
2. 按文件/子主题分组，每组一个子代理
3. 同一轮并行调用多个 `Agent`（`general-purpose`），prompt 里附 `doc-style` 关键规范 + 文件路径 + 知识点主题
4. 全部完成后统一 `vue-tsc`/构建校验

完整策略见 `.claude/skills/doc-style/SKILL.md` 开头的「🤖 AI 批量填充策略」章节。
