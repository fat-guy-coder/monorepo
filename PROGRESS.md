# 📊 全项目进度面板

> 更新时间: 2026-11-13 | 当前活跃任务: **Blitz v0.9 技能数据表 + 不可格挡** ✅（三个技能迁进 `SkillDef`/`SkillBook`，状态机不再认技能名；冷却统一进字典；`COMBAT_MATRIX §3 ②` 的「不可格挡」端到端打通，紫红预警 = 挡不住；两道闸门全绿，自检 348 项 0 失败，截图 50 张）—— 待 F5 手测手感 + 读色。

> 📌 美术路线背景（2026-10-30 定）: **Blitz M0 美术风格锚定** —— 方向 A（冷青夜雨）已定。**Retro Diffusion 已断供弃用**（大陆支付渠道关闭），路线转向「**角色走 3D 预渲染（B）+ 场景/道具走 2D 像素**」的混合管线（依据 [`ART_ROUTE_DECISION.md §11`](apps/game/blitz/ART_ROUTE_DECISION.md)）；本地出图配置单已写好 [`art/LOCAL_COMFYUI.md`](apps/game/blitz/art/LOCAL_COMFYUI.md)，量化脚本 [`art/tools/palette_quantize.py`](apps/game/blitz/art/tools/palette_quantize.py) 已跑通。下一步：家里 5060 跑通本地出图，或做最小 3D 链路探针。**v0.5 四向朝向代码完成（自检 249 项）✅**，v0.4/v0.5 都待人工验收（F5）。第一个盒子计划见 [`SLICE_01_PLAN.md`](apps/game/blitz/SLICE_01_PLAN.md)，美术目录见 [`art/README.md`](apps/game/blitz/art/README.md)。

> 🔸 **换电脑继续** —— 截至 2026-11-13 已提交并推送（`9f562f5`，v0.8 骨架 + v0.9 技能表 / 不可格挡一并入库），`master` 与 `origin/master` 同步；拉到最新后直接 F5 手测，两道闸门应仍是自检 348 项 0 失败、截图 50 张。
> ⚠️ `apps/game/blitz/.gitignore` 忽略了 `export/`，`art/export/probe/` 的试产图**不在仓库里**（导出物可重建）；要看图就重新生成或手动拷贝。
> MCP 配置在**用户级** `~/.claude.json`，不随仓库走；新电脑要重新执行 [`MCP_SETUP.md`](apps/game/blitz/art/MCP_SETUP.md) 的接入命令。

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
| D | 内存管理 | 5 | 🔄 d-1/d-5 已完成，d-2~d-4 空壳 |
| E | 文件系统 | 3（inode/journal/io-model） | ⏳ 空壳 |
| **合计** | | **21** | **16/21 有内容** |

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

**2026-08-27 填充 D 模块第 1 篇（空壳 → 完整，482 行，过 @vue/compiler-sfc 校验）：**
- cs-5-d-1-paging（分页机制：页表、多级页表、TLB）——开篇点破「页表≠数据库表」+ 数据库表 vs 页表六维对比表；页/页帧、单级页表 PTE 7 标志位、地址翻译 6 步、x86-64 四级页表按需分配、TLB 命中/未命中 + **上下文切换刷 TLB vs goroutine 共享地址空间不刷**（回扣线程篇）、缺页中断；7 个代码示例（/proc/self/maps、Go &x 虚拟地址、PTE struct、四级查表、TLB）；类比三件套（SPA 路由表/多租户隔离/酒店房号登记册）；「与 Go 底层实现的关系」专节（goroutine 2KB 栈随用随涨、runtime.mheap 页/span、Go 指针是虚拟地址）
- **页脚链**：c-4-deadlock → d-1-paging → d-2-virtual

**继续指令：** 「继续填充操作系统模块，先填 D 模块内存管理（cs-5-d-1-paging / cs-5-d-2-virtual / cs-5-d-3-replacement / cs-5-d-4-segmentation）或 E 模块文件系统（cs-5-e-1-inode / cs-5-e-2-journal / cs-5-e-3-io-model）」

---

## 一·七、计算机基础·计算机网络（新增章节）

> 路径: `apps/learning/src/views/ComputerBasicKnowledge/cs-phase-6-network/` | 学习网站「计算机知识 → 计算机网络」
> 根菜单 id: `90186969-7fe7-4c9b-8646-c1754c38a1e4`

| 模块 | 名称 | 篇数 | 状态 |
|------|------|------|------|
| A | 网络基础 | 5（osi/encap/tools/fiber/copper） | 🔄 a-4/a-5 已完成，a-1~a-3 空壳 |
| B | 应用层协议 | 5（http1-3/dns/cdn） | ⏳ 空壳 |
| C | 传输层 | 4（tcp-handshake/congestion/flow/udp） | ⏳ 空壳 |
| D | 网络层与安全 | 5（ip/subnet/routing/tls/security） | ⏳ 空壳 |
| E | 网络编程 | 3（socket/epoll/proxy） | ⏳ 空壳 |
| **合计** | | **22** | **2/22 有内容** |

**2026-08-27 填充网络基础物理层 2 篇（网络阶段第一批，空壳 → 完整，共 1071 行，均过 @vue/compiler-sfc 校验）：**
- cs-6-a-4-fiber（物理层·光纤传输：全反射原理 n₁=1.46/n₂=1.44 临界角≈80°、单模 vs 多模、光收发 7 步链路 + SFP/QSFP 光模块、损耗三窗口 850/1310/1550 + EDFA、WDM 波分复用，435 行）
- cs-6-a-5-copper（物理层·金属传输：电信号传比特、双绞线绞合抗干扰、⭐差分信号 TX+/TX− 共模抵消原理、串扰 NEXT/FEXT、同轴电缆、以太网 100 米规则 + Cat5e~Cat8 类别表、铜 vs 光纤 7 维对照表，636 行）
- **风格**：amber CS 主题（参照 cs-5-a-0-os-intro.vue）+ 📐 结构总览内联 SVG + 类比三件套 + ⚠️ 坑 + Link 页脚链
- **页脚链**：a-3-tools → a-4-fiber → a-5-copper → b-1-http1（跨模块过渡）
- **后端新接口**（待部署）：`GET /api/menus/by-name?name=xxx&project=learning` 按 name 精确查单个菜单（menu.ts 新增，API.md 已记录）

---

## 二、Go 学习文档

> 路径: `apps/go/` (代码) + `apps/learning/src/views/backend/BackendLanguage/GO/` (前端文档)

| 阶段 | 名称 | .vue 文档 | .go 代码 | 状态 |
|------|------|-----------|----------|------|
| 1 | 基础入门 | 22/22 ✅ | 22/22 ✅ | ✅ 完成 |
| 2 | 并发编程 | 14/14 ✅ | 5/14 | 🔄 进行中 |
| 3 | Web 开发 | 0/16 | 3/16 | ⏳ 待开始 |
| 4 | 数据库 | 14/14 ✅ | backend 已数据库化 ✅ | ✅ 完成 |
| 5 | 微服务 | 0/16 | 3/16 | ⏳ 待开始 |
| 6 | 工程化 | 0/15 | 0/15 | ⏳ 待开始 |
| 7 | 进阶 | 0/15 | 0/15 | ⏳ 待开始 |
| **合计** | | **50/108** | **40/108** | **46%** |

**阶段 2 并发文档（2026-08-24 更新）：** 13 个 .vue 文件均有内容，其中 13 篇含「结构总览」层（go-2-1 ~ go-2-13）——**go-2-12 errgroup** 补「扇出任务 · 聚合错误 · 出错即取消」结构图（main → Group → 3 个 goroutine；G2 出错 → cancel 广播 → G3 收到 <-ctx.Done() 提前退出 → Wait 聚合返回第一个 error）；**go-2-13 goroutine 泄漏** 补「阻塞无人接收的 channel → park 在 sendq → 栈被引用 → GC 无法回收」结构图（含检测/修复速查）。此前已补全 go-2-9 并发模式（Fan-out/in · Worker Pool · Or-Done · Generator）、go-2-10 竞态检测（竞态三条件 · 典型场景 · 修复速查）、go-2-11 sync.Pool（无锁设计 + victim 两代缓存 · 标准姿势 · 适用场景与优缺点）；**go-1-14 包与模块** 补全为 10 节（新增「包是什么」「实战：apps/go/backend 分层」「常见错误」，强化 internal 边界 + go.mod 路径映射）；**go-2-3 select** 强化「④ for-select 循环」，明确「无间隔/事件驱动」语义。**2026-08-25 深度补全 4 篇偏薄的阶段 2 文档**（144~176 行 → 372~412 行，均已通过 @vue/compiler-sfc 校验）——go-2-6 WaitGroup/Once/Cond（双重检查锁定执行流程 · 4 坑 · 等就绪屏障实战）、go-2-7 atomic（竞态现场还原执行流程 · Go 1.19 新 API 对照 · 5 坑 · 无锁计数器实战）、go-2-12 errgroup（fail-fast 全链路执行流程 · Promise.all/allSettled 对照表 · 5 坑 · BFF 聚合实战）、go-2-13 goroutine 泄漏（泄漏发生全流程 · pprof/goleak 检测深度 · 4 坑 · 发送方/接收方责任矩阵）；每篇均含「执行流程拆解 + 常见错误与陷阱 + 反模式经验法则 + 生产实战 + 前端类比」。动画层（vue-konva）可选补齐。

**2026-08-25 新增 4 篇基础/并发文档（补齐课程缺口）：** 按「基础入门 + 并发编程」课程缺口补了 4 个主题，每个都有线上菜单 + .vue 文档 + .go 源码 + runner 注册——**go-1-20 泛型 Generics**（cmp.Ordered / 类型集约束 / GenericStack[T] / slices·maps 标准库）、**go-1-21 JSON 序列化**（Marshal/Unmarshal / omitempty / - / 自定义 MarshalJSON / NDJSON 流式解码）、**go-1-22 反射 reflect**（TypeOf/ValueOf / 遍历字段读 tag / struct→map / 反射改值）、**go-2-14 sync.Map**（Load/Store/LoadOrStore/Range / 100 并发读缓存实战 / 读写分离适用场景）。菜单已 POST 到生产库（denglie.asia），前端 views-loader 动态 glob 自动匹配 .vue；footer 导航链已重连（go-1-19→go-1-20→go-1-21→go-1-22→go-2-1、go-2-12→go-2-13→go-2-14）。修复 basics runner 的 matchTopic 子串冲突（"reflection" 含 "io" 被 fmt 抢走 → 新 case 移到 switch 顶部，`go run . 1 reflection` / `go run . 2 syncmap` 已验证输出正确）。

**2026-08-25 新增「GO 学习方法」页：** GO 主菜单下新增 `GOLearningMethod`（order=2，学习网站「GO → GO学习方法」页面），并同步更新 `apps/go/LEARNING_METHOD.md`——整合三档消化法（A 档：能塞进 backend 的并发 context/sync.Map/errgroup/限流/atomic；B 档：泛型/反射等 playground 动手练；C 档：GMP/泄漏/pprof/sync.Pool 跑 demo 看懂）、3 步主动回忆法（看 doc → go run → 改代码预测输出）、并发主题 ↔ backend 实战映射表。目标是解决「menu CRUD 用不上并发，阶段 2 知识不会自然出现」的学习盲区。

**2026-08-25 并发基础补强：** go-2-6 新增「实战 3：WaitGroup 关门模式」（等所有发送者干完再 close——完整示例 + 4 步执行流程）与「坑 5：main 不等 goroutine，没 Wait 直接退出 → 打印全被跳过」；go-2-2 新增「for v := range ch 语法糖拆解」（等价 `v, ok := <-ch` 循环 / 结束条件=关闭+排空 / 不 close → 永不退出：main 死锁、goroutine 泄漏）+「close 跟缓冲填满无关」澄清。新建 `.claude/skills/go-backend-practice` skill（「能塞进 backend 就塞进去」：三档消化法 + 阶段 3 Web 开发通用后端服务基本全塞 backend），已注册到 CLAUDE.md skill 表。

**📖 学习者当前位置（2026-08-25 更新，回家继续学）：**
- **已看完**：阶段 1 基础入门 + 阶段 2 并发编程 全部文档
- **正在练**（`apps/go/playground/channel_demo.go`，当前是无缓冲 + 关门 goroutine 版）：goroutine 异步 + WaitGroup 同步 → channel 生产-消费 → 「关门模式」（`wg.Wait()` 后再 `close`）→ 无缓冲握手 → 死锁分析（直接写 `wg.Wait` 在缓冲<发送数/无缓冲时死锁，关门 goroutine 写法对任意缓冲大小都安全）
- **回家练习（改参数 → 预测 → 再跑）**：① 把 `n` 改 5，预测输出（应照常打 0-4，握手逐个完成）② 删掉 `defer wg.Done()`，预测会不会死锁（wg.Wait 永不返回，关门 goroutine 卡死）③ 把 `a <- c` 换成先 sleep 再发，观察握手节奏
- **下一步学习路径**：并发基础练完 → **阶段 1.5**（backend 加 sync.Map 缓存层 + context 超时中间件）→ **阶段 2 Web 开发**（go-3-x-web，通用后端服务基本全塞进 backend，见 go-backend-practice skill / LEARNING_METHOD.md）

**2026-08-27 阶段 4「数据库与存储」14 篇文档全部填充（空壳 → 完整，共 ~6200 行，均过 @vue/compiler-sfc 校验）：**
- 14 篇全覆盖：go-4-1-database-sql / go-4-2-connection-pool / go-4-3-crud-basics / go-4-4-sql-security / go-4-5-gorm-start / go-4-6-gorm-association / go-4-7-sqlx-native / go-4-8-transactions / go-4-9-redis-basics / go-4-10-cache-strategy / go-4-11-distributed-lock / go-4-12-mongodb / go-4-13-migration / go-4-14-pprof-slow-query
- **风格**：Go cyan 主题（`bg-linear-to-br from-slate-50 to-blue-50`）+ Code/EditorLink/Link/Nav 组件 + 🔗 前端类比 + ⚠️ 坑 + Link 页脚链闭环（4-1→4-2→…→4-14）
- 内容深浅分级：go-4-1~4-4、4-8、4-13 塞进 backend（EditorLink 指向 backend 源码）；GORM/sqlx/Redis/MongoDB/分布式锁/慢查询属 B/C 档（文档自给自足 + playground/demo 玩法）

**2026-08-27 backend 接入 PostgreSQL（阶段 4 知识点「塞进 backend」，与 Bun backend 同库同表）：**
- 新增 `internal/database/` 三层：`db.go`（database/sql + lib/pq 连接池，↔ go-4-1/4-2）、`migrate.go`（`//go:embed` + `schema_migrations` 幂等迁移，↔ go-4-13）、`tx.go`（TransferBalance 事务 ACID 演示，↔ go-4-8）
- `menu_repo.go` 内存 map → PostgreSQL：CRUD 全占位符防注入（↔ go-4-3/4-4）、`WITH RECURSIVE` 递归删除、`CreateBatchTree` 事务原子提交 + 幂等跳过（↔ go-4-8）、BuildTree map 索引建树（↔ go-1-9）、`ShiftOrders` 同级 order 后移、`UpdateDescendantPaths` 递归更新子 path
- **handler 12 条路由已对齐 Bun menu.ts**（`apps/backend/src/routes/menu.ts`）：`GET /api/menus`（root/parentId/tree/flat/search 四种形态）、`GET /api/menus/search`（匹配树 + openKeys + selectedKeys）、`GET /api/menus/by-name`、`GET /api/menus/{id}`（带直接子）、`GET /api/menus/{id}/children`、`GET /api/menus/{id}/tree`（递归子树）、`GET /api/menus/{id}/leaves`（子树叶子统计）、`POST /api/menus`（自动算 path + order 后移）、`POST /api/menus/batch`（递归幂等建树，事务回滚）、`PUT /api/menus/{id}`（全字段 + order 互换 + path 重算 + 递归更新子孙 path）、`DELETE /api/menus/batch`（parentId 清空子树 / ids 批量删）、`DELETE /api/menus/{id}`（递归删）
- 分层：handler（12 路由 + 请求解析）→ service（算 path/order/建树/搜索/order 互换编排）→ repository（纯 SQL 原子操作）→ PostgreSQL
- ⚠️ 唯一未对齐：Bun 端的 JWT 权限过滤（tree=true 需登录、角色 menuIds 过滤）——Go 端暂无用户系统，**留待阶段 3 学 JWT 时补**（代码注释已标注）
- 每个文件顶部「对照学习」注释块 + 每个函数注释（沿用 menu_handler.go 风格）
- 依赖：`github.com/lib/pq` + `github.com/google/uuid`（**均纯 Go，编译进二进制，服务器无需装任何驱动插件**）
- 部署（推送服务器后）：`cd apps/go && go mod tidy && go build -o backend ./backend/cmd/server`；`DATABASE_URL=postgres://jason:123456@localhost:5432/jason`（服务器 Docker postgres 映射 5432）；端口 3002
- ⏳ **待办**：Go backend 补 JWT 权限过滤后即可替换 Bun backend（当前线上仍跑 Bun）

**继续指令：** 「继续 Go 文档的填充」「继续 Go 阶段 3（Web 开发）」「给 go-2-12/2-13/2-14 补动画层」「把 go-stage-4-database 迁移到 Go backend（替换 Bun）」

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

> 路径: `apps/game/blitz/` | 引擎: Godot 4.6.3 | 分支: `master`

包含：`scripts/`（GDScript 源码）、`scenes/`（场景文件）、`DESIGN.md`（设计文档）、**`V04_PLAN.md`（当前权威计划）**。

每个 .gd 脚本顶部有 `## 📚 涉及学习文档:` 注释块关联到 Godot 学习文档，关键代码行用 `# → godot-X-Y-name: 说明` 标注。

#### ✅ 里程碑：v0.4 视角转 2.5D 横版（belt-scroll）—— 代码与文档完成，待人工验收

v0.2 等距 / v0.3 战斗手感已完成。v0.4 的目标是把地面轴从等距菱形改成 **X（左右）+ Z（纵深）**、朝向 ±1、加真跳跃、敌人攻击改成**每个招式自带形状的范围判定**并画出预警。

**起因**：等距下「跟野怪对不上」—— `Iso.ground()` 的 2:1 压扁只用在 `_draw()` 画影子，实体位置/速度/判定框全是未投影的屏幕 XY，而地砖画的是菱形。按 W 走直线，跟网格永远错开半格。

| 步骤 | 内容 | 状态 |
|---|---|---|
| 1–2 | 地平面（`belt_floor.gd`）+ 矩形围墙 + 侧视角色 + 跳跃 | ✅ |
| 3 | `AttackShape`（RECT/ARC/CIRCLE）+ 玩家攻击改用它 + 落雷技能 | ✅ |
| 4 | 敌人：朝向 ±1、`AttackShape` 出招、预警画地上、贴地预警图层 | ✅ |
| 5 | **跳跃的战术价值** —— 敌人横扫接低空高度带（`sweep_height_max = 40`），跳起来能躲低扫 | ✅ |
| 6 | 格挡改前后半平面；删掉鼠标瞄准（`block_aim_override`/`block_cone_cos`） | ✅ |
| 7 | 自检审计 + `DESIGN.md` 整份回填成横版 + 根 README + 学习站死链修复 | ✅ |
| 8 | **修 bug：敌人与玩家重合 + 疯狂抖动** —— 新增 `body_separation.gd`（世界空间软分离）+ 追击刹车距离 | ✅ |

**步骤 5 实现要点：** 高度带由**受击方**主动查（物理体表达不了离地高度）——
敌人打玩家 → `player.gd _on_hurtbox_area_entered` 用玩家自己的 `height`；
玩家打敌人 → `AttackHitbox._try_hit` 读 body 的 `height`。自检补了「贴地对照组会挨打 /
跳到 height_max+20 躲得开」三条端到端断言。

**步骤 6 实现要点：** 半平面判定本身早就落地了，这一步清的是 v0.3 的两个壳 ——
`block_cone_cos`（扇形半角，横版里改了也不生效的静默接口）和 `block_aim_override`
（鼠标瞄准最后出口；`facing` 现在恒为 ±1，不再需要「进格挡时补一次朝向」）。
自检改成直接写 `player.facing = -1`（没有测试旁路），并加了一条**举盾不改朝向**
防回归断言。`_is_in_guard_cone` → `_is_in_guard_front`，`_draw_guard_cone` → `_draw_guard_plane`。

**步骤 7 实现要点：** 自检审计无缺口（185 项即完整基线；`enemy_attack.BOX_SIZE` 的宽高比断言已作废，
它只是手工摆判定区的兜底）。`DESIGN.md` 整份重写成 belt-scroll（含「等距错在哪」一节，
固化两轮实测结论）。顺手修掉重力 1200→1400 遗留的两处过期数值（满跳 112.7→96.6）。
学习站：5 处指向已删文件的 EditorLink 改指现存文件；1-3 / 1-6 / 6-2 / 2-8 四处「当前 Blitz 行为」
的说法修正。**文档债已清**：ParryDetector / coyote_time / 八向 / 旧 player.tscn 结构散在 0-3 / 0-5 /
0-9 / 1-2 / 1-8 / 1-11 / 2-6 七篇里，已全部换成 v0.4 的真实代码与节点树（2-6 另外补了「横版为什么
不用 is_on_floor」的对照）。

**步骤 8 实现要点（用户反馈的 bug）：** 敌人追到玩家身上**完全重合**并高频抖动。两个根因都不报错：
① 两个角色的 `collision_mask` 都只有墙（`1<<4`），角色之间根本没有碰撞；② 追击条件是 `dist > 1.0`，
等于几乎追到中心点才停 → 穿过 → 方向翻转 → 再穿回。**没有开 layer/mask**：`CollisionShape2D` 活在屏幕
空间，角色互撞会停在「画面上贴着、世界里差一格」的位置。改为新增 **`body_separation.gd`**：世界平面
圆-圆软分离，由 `main.gd` 每物理帧统一调一次（`process_physics_priority = 100`，跑在所有 `move_and_slide`
之后），谁让路由速度决定。敌人追击改为 `chase_stop_distance = 30` 处线性减速刹车（必须 > 身体半径之和
12+11=23）。自检 185 → **192 项**（完全重合分离 / 追击不重合 / 能停稳 / 停稳不抖 / 顶不穿 / 保持间距）。
`DESIGN.md` 新增「角色体积：世界空间软分离」一节。

**闸门现状（v0.4 收尾时）：** 闸门 1（解析）空 · 闸门 2（自检）**192 项检查 0 项失败** · 截图探针 17 张正常
（v0.5 之后是 249 项 / 22 张，见下一节）。另有第三层截图探针 `--shots`（自检看不见渲染 —— 已靠它逮到过一个「181 条全绿」的 bug）。

**关键不变量：** 一招 = **一个 `AttackShape` 实例**，预警 / `CollisionShape2D` / 自检读的都是它 → 漂移在结构上不可能。坐标桥只有 `belt_space.gd` 一处（`to_screen` / `to_world` / `ground_circle_shape`）。

#### ✅ 里程碑：v0.5 四向朝向 —— 代码完成，待人工验收（2026-10-29）

用户实测观感：**纵向移动时角色只有左右朝向很怪** —— 往屏幕里走却还侧着身子。
已按「8 向移动 + 4 向朝向吸附」把代码改完（占位几何，不含真美术），先验手感、再出 3 视图锚图。

| 项 | 落地情况 |
|---|---|
| 朝向模型 | 新增 `scripts/combat/facing.gd`（`class_name Facing`）：`RIGHT / LEFT / UP / DOWN` 四个**世界空间**单位向量。`UP = (0, +1)` = 世界 +z = 屏幕上方 = **背面**；`DOWN = (0, -1)` = 镜头这侧 = **正面** |
| 换向规则 | `Facing.choose()`：无输入保持当前朝向；同一根轴（含反向）立即转；跨轴要求 `新分量 > 当前分量 × 1.25`（迟滞，防斜向走位时朝向逐帧乱翻）；出招/起手期间锁朝向 |
| 代码波及 | `player.gd`（`facing: Vector2`、`_face()`、四向头部/盾牌画法、格挡半平面）、`enemy.gd`（巡逻 / 追击 / 被打转向）、`attack_shape.gd`（所有判定参数改 `Vector2`，矩形纵向时换宽高）、`attack_hitbox.gd` / `enemy_attack.gd` / `lightning_bolt.gd`、`debug_overlay.gd`、`smoke_test.gd` / `_shot_probe.gd` |
| 美术成本 | 每个动作 **3 套唯一图**（侧视镜像 / 背面 / 正面）＝现在的 3 倍；仍比等距八向（8 套）便宜 |
| 锚图 | M0 锚图要出 3 张视图，不是 1 张侧视 |

**自检抓到的那个 bug（值得记）：** `_world_deltas_to_screen` / `polar_to_screen` /
`collision_offset(CIRCLE)` 把**已经在局部朝向系里的偏移**又过了一遍 `_to_local`（正向旋转）。
朝右时它是恒等变换、朝左时 180° 旋转在左右对称的形状上凑巧等价 —— **只有上下会错，而且整整歪 90°**，
预警和判定体一起歪（画面上看不出「错」，只是打不到站对位置的人）。修法是补 `_local_to_world()`
做逆变换，并让四个朝向、每个形状都跑一遍「数学 ⇔ 物理体 ⇔ 预警多边形」逐点比对（4 形状 × 4 朝向）。

**闸门现状：** 闸门 1（解析）空 · 闸门 2（自检）**249 项检查 0 项失败**（v0.4 的 192 + 四向朝向 /
朝上格挡 / 形状方向语义 / 四朝向逐点扫描）· 截图探针新增 `2b/2c`（背面/正面站立）、`6b`（朝上举盾）、
`11b/11c`（朝上/朝下重劈）。

**顺手修：** 正面视图的眼睛原来被刘海吞掉（刘海 r=5.4 压到 y=+1.6，眼睛在 y=2.0），
截图里「正面那张脸没有五官」—— 现在眼睛整颗落在刘海下沿之外。

**明确不在这一轮：** 真正的四向美术、攻击时的转身动画、斜向（45°）图。

#### 🚧 v0.6 代价机制：落地硬直 + 护体罡气 —— 代码完成，待 F5（2026-11-10）

按 [`COMBAT_MATRIX.md §3/§4`](apps/game/blitz/COMBAT_MATRIX.md) 的四个退化点，先做代价最低的两个。
两条都遵循同一判据：**新应对必须从「时间 / 资源 / 位形」里挑一样当代价**。

| 机制 | 改掉了什么退化 | 落点 |
|---|---|---|
| **落地硬直 0.18s** | 跳跃曾是躲横扫的**零代价**答案（跳高 96 > 高度带 40）→ 玩家不用读招 | `landing_lag_time / landing_min_impact / landing_move_scale`；落地时读 `_height_vel` 判冲击；只锁**进攻**（`_can_start_offense`），跳跃/闪避/格挡照常；硬直中移动 ×0.7；视觉是身体压扁 7% 再弹回（影子不动） |
| **护体罡气（I 键）** | 工具箱里没有「用输出换安全」的选项 | `aura_duration 1.5 / aura_cost 30 / aura_cooldown 3`；**计时器实现，不新增 State**；`take_damage` 里排在格挡**之前**（先吃伤害，不白扣格挡精力）；吃一次即消失 + 0.25s 无敌兜底；期间不能出手 |

**闸门（已跑，2026-11-10）：** 解析闸门**空** · 自检 **262 项检查 0 项失败**。
上一版是 249 项；净增 13 条 —— 输入映射 +2、落地 +3（原有的「落地后能再次起跳」被更强的一条
「落地硬直期间仍能起跳」取代）、罡气 +8。覆盖「硬直会自行结束」「硬直不锁跳跃」「罡气挡完即消失 / 第二下正常掉血」。

**顺手修掉的测试隔离 bug（不是产品 bug）：** 「玩家顶着敌人走顶不穿」这条断言原来是**靠运气**过的 ——
其它敌人只关了 `_physics_process`，但体积分离是 `main` 每帧统一算的，它们留在原地照样把玩家推歪，
于是「正对着顶」变成「被挤着绕过去」。新增的落地/罡气断言让整套自检多跑了 ~1 秒，敌人位置一挪开就红了。
修法：测试里把其它敌人**连位置一起**挪远，收尾再挪回（产品行为没动 —— 圆形软分离本来就允许贴着绕行）。

**F5 要调的两个数：** 落地硬直 0.18s（0.12~0.25 之间试）· 罡气 1.5s / 30 精力是否和落雷（35）形成真取舍。

#### ✅ v0.7 剑阵（第一个「布置」技）+ 不引入美术的 demo —— 两道闸门全绿，待 F5 手测（2026-11-10）

用户要求：**先把剑阵做出来**，并且**暂时不引入任何美术资源** —— 继续用 `_draw()` 的几何占位，
在一张地图里把「移动 / 攻击判定 / 打击感 / 技能使用」跑通，当作可玩的 demo。

**同轮先拍板的决策：不换成 Hades 式顶视角 / 自由瞄准，保留 belt-scroll X/Z + 四向。**
理由写进了 [`ART_ROUTE_DECISION.md §13`](apps/game/blitz/ART_ROUTE_DECISION.md)：顶视角没有「离地高度」，
会直接作废 v0.4~v0.6 刚做完的高度带 / 跳跃躲招 / 落地硬直；「方向感」的载体是**判定形状 + 特效**，
不是朝向数量。真要技能方向，走「技能自由瞄准、角色仍四向」这条增量，不动坐标系。

| 项 | 落点 |
|---|---|
| 新脚本 | [`scripts/fx/sword_array.gd`](apps/game/blitz/scripts/fx/sword_array.gd)（`class_name SwordArray`，Node2D，**世界层**子节点，绝对 `z_index = GroundTelegraph.GROUND_Z` 退出 y-sort） |
| 玩法 | 精力 30 / 冷却 4.5s / 施放硬直 0.25s；半径 76 世界单位，持续 3s；每 0.5s 一跳伤害 1（落阵当帧先跳，共 6 跳） |
| 布置 ≠ 光环 | 阵**留在原地**，不随玩家移动；玩家死了阵还在（场景物件，不是玩家状态） |
| 伤害通道 | 敌人新增 `take_dot()` —— **不硬直、不击退、不断招、不看霸体**。走 `take_damage` 会变成「全场永久打断」，把读招机制架空 |
| 追兵回避 | `enemy.gd::_sword_avoid()`：判据是「**直线走过去会不会踩进圈**」（线段到阵心距离），不是「离阵多近」→ 没有需要调的感知半径，绕到路径擦不到阵就自动恢复直线追击 |
| 反退化规则 | **玩家站在阵里时敌人不再回避、直接冲进来** —— 否则圈内是零代价安全区。正确用法是「插阵 → 退出去」 |
| 输入 | `project.godot` 新增 `sword_array` = **O**（physical 79 / unicode 111）；`debug_overlay` 按键表 + 实时按下表都补上了 |
| demo 摆位 | 第二只追兵从 (34,10) 挪到 **(19,12)**（出生点附近）—— 剑阵的「绕开」只有追兵演得出来，巡逻/站桩不追人，新手会以为技能没生效 |

**为什么伤害是每 0.5s 扫一遍 `"enemies"` 组，而不是一个常驻 Area2D：** `Area2D.body_entered` 只在**进入**时发，
站在圈里不动的人收不到第二次事件。要用 Area2D 就得自己维护「谁还在里面」的名单并和物理事件对账，
那份名单一旦漂移，症状是「站在圈里却不掉血」，且只在特定时序出现。现在每个 tick 用
`AttackShape.contains()` 做**同一个纯函数判定** —— 和预警绘制同源，也能被自检断言。

> ✅ **闸门状态：全绿。** 解析闸门无输出；自检 **286 项检查 / 0 项失败**。
> 新增断言覆盖：形状半径 == 阵半径 · 阵在贴地层且退出 y-sort · 阵不是玩家子节点 · 玩家走开阵心不动 ·
> 阵内掉血 / 阵外不掉血 · **DoT 不给硬直、不给击退** · 霸体(WINDUP)中照吃跳伤但**招式不被打断** ·
> 阵不伤玩家 · 追兵整条路径不进圈 · 玩家在阵里时追兵不回避（A/B 对照）· 阵会自己到期 · 冷却 > 持续 ·
> 精力/冷却/施放硬直。
>
> ⚠️ 自检里踩到的一个坑（已修）：`queue_free()` 是延迟释放，被 free 的阵这一帧仍在
> `sword_arrays` 组里。⑦「按 O 前后数阵」如果直接数组大小，基线会被虚增 1，
> 而新阵正好补上那个空位 → 1 → 1，在施放**成功**时报红。改成只数
> `not is_queued_for_deletion()` 的阵（`_live_sword_arrays()`）。
>
> 📸 **第三层截图也跑了**（`-- --shots --zoom=3 --focus=0,0`，探针从 17 张扩到 20 张，新增 16/17/18）。
> 逐张看过：阵是**贴地 2:1 椭圆**（宽 152 世界单位 ≈ 2.4 格，和地砖同比例）·
> 阵心与脚底**偏差 0.00px**（`BeltSpace.to_world` 那条换算没错）· 稳定态下**角色和敌人都压在阵圈之上**
> （z = −5 那条肉眼成立）· 落阵扩散闪与到期前淡出/闪烁都读得出来。
> 唯一想调的是：6 把剑偏细（4.4×18px，3 倍放大后仍像一排短刻线），「插在地上的剑」要靠脑补 —— 留给 F5。

#### ✅ v0.8 程序化骨架：玩家 + 敌人 —— 腿 / 跑步 / 跳跃 / 轻重击 / 施法手部动作 / 妖兽剪影（2026-11-10 ~ 11）

用户要求：**把玩家做精细点，可能要上骨骼** —— 加腿、跑步动作、跳跃动作、轻击/重击的手部姿态
各不一样、剑阵与落雷各有施法手势；**仍然零美术资源**，并且结构上要能被将来的美术资源整体替换。

| 项 | 落点 |
|---|---|
| 新文件 | [`scripts/visual/player_rig.gd`](apps/game/blitz/scripts/visual/player_rig.gd)（`class_name PlayerRig extends RefCounted`，**纯数学**，不进场景树、不画东西） |
| 骨骼 | 躯干 12 / 颈 3 / 头 6 / 上臂 9 / 前臂 9 / 大腿 12.5 / 小腿 13 / 头半径 6.8 |
| 动作 | `Anim` 14 个：IDLE RUN JUMP_RISE JUMP_FALL LAND LIGHT HEAVY_CHARGE HEAVY_SWING CAST_LIGHTNING CAST_SWORD_ARRAY BLOCK HIT DASH GUARD_BROKEN |
| 视图 | `View` 三套：SIDE / BACK / FRONT（左右靠外层镜像，不单独做） |
| 驱动 | `player.gd::anim_state()` + `anim_phase()` —— **全部从既有计时器派生**，没有新增玩法时钟（`_anim_clock` 只喂待机呼吸） |

**五条架构决定（都是「不这么写会静默出错」的）：**

1. **绝对角度**：`dir_of(a) = (sin a, -cos a)`，0 = 正上、+π/2 = 正前。姿态是整个关节表的「手在哪」，
   不做父子角度累加 —— 累加写反一个符号，手臂会朝反方向摆且不报错。
2. **只做朝右的骨架，朝左靠 `draw_set_transform(scale.x = f)` 镜像**。老代码在每个向量上乘 `f`，
   漏乘就变成「朝左时脸朝后」；现在镜像只发生在一个地方，漏乘在结构上不可能。
3. **腿用两骨 IK**（`ik2`，余弦定理 + 距离钳制）。纯角度摆腿在跨步最大时脚必然离地 ——
   画面上是「人在地上飘」，而 IK 让脚踝落在落点路径上。膝盖朝向由 `bend_forward` 定；
   距离钳到 `|l1-l2|..l1+l2`，够不到也不出 NaN（NaN 进 `draw_colored_polygon` 会**静默不画一整帧**）。
4. **纵深压扁只作用于「方向增量」，不作用于「横向站位」**。背/正面时肩/髋要真正左右分开
   （`lat_arm 7.0` / `lat_hip 4.6`，侧视只有 `1.2` / `1.6`），只把 `dir × 长度` 的 x 乘 `0.42`。
   第一版是解算完统一乘 x，结果两条手臂被压进躯干中线 —— 背后看是「一个布口袋顶着一颗头」。
5. **刀的握点 = 持剑手手心**（`grip = hand_near`），不是单独摆的点。单独摆的话手一动刀就脱手悬空，
   画面上像「刀在飘」，不会报错。

**换成美术资源时的接缝**：`(anim_state(), anim_phase())` 就是将来的 `SpriteFrames` 动画名 + 帧进度；
`scripts/visual/player_rig.gd` 整份删除，`player.gd` 只换 `_draw_rig` 这一段。八个游戏状态、判定形状、
计时器都不动。

> ✅ **闸门状态：全绿。** 解析闸门空输出；自检 **334 项检查 / 0 项失败**（v0.7 的 286 + 玩家骨架 24 + 敌人骨架 24）。
> 新增断言：14 动作 × 5 相位 × 3 视图全为有限数 · 骨长恒定 · 刀柄==手心 · 刀长恒定 ·
> 背/正面双肩横向站位不被压扁且左右对称 · 双髋分开 · 跑步支撑脚正好落在 IK 落点且贴地 ·
> 摆动期抬脚 · 相位 1.0↔0.0 接得上 · 轻击与重击手位不同 · 落雷剑朝上 / 剑阵剑朝下 ·
> 起跳收腿与下落伸腿不同 · 重心不越界 · 游戏状态→骨骼动作映射（蓄力/轻/重/技能/上升/下落/落地）。
>
> 📸 截图探针从 39 张扩到 **49 张**（玩家 `31/32` 背面/正面跑动 + 敌人 `33~42` 十个动作）。
> 逐张看过：侧视跑步有步幅与抬脚、跳跃三阶段收腿/伸腿/下蹲可分辨、轻击横劈与重击竖劈的刀路不同、
> 落雷举剑过顶、剑阵刀尖插地、格挡盾在身前。背/正面：两条手臂在身体两侧、双脚露出袍摆、背面是后脑。
>
> ⚠️ 两个在截图里才发现的坑（已修）：① 探针截图时 F1 面板的青色判定框正好压在脚上，
> 看起来像「没有腿」；姿态图里关掉面板并冻结/移走敌人。② 探针关了物理，`_hit_flash_timer`
> 永远不递减 —— 被敌人打过一次后**后面每一张姿态图都是纯白**；`_reset_pose` 里显式清零。

##### 敌人：同一套架构、另一副骨头（2026-11-11）

玩家骨架完成后，`enemy.gd` 仍是 v0.3 的旧几何（梯形 + 圆头 + **一只**爪子）：出招时身体不动、
只有爪子绕肩转；没有腿，走动靠整体滑动。现在换成 [`scripts/visual/enemy_rig.gd`](apps/game/blitz/scripts/visual/enemy_rig.gd)：

| 项 | 落点 |
|---|---|
| 新文件 | `class_name EnemyRig extends RefCounted`（455 行，纯数学，**复制了玩家骨架的三条纪律**） |
| 骨骼 | 躯干 13.5 / 颈 3.5 / 头 4.5（半径 7.0）/ 上臂 8 / 前臂 7.5 / 爪 6 / 大腿 10.5 / 小腿 12 / 尾 7+6 |
| 动作 | `Anim` 7 个：IDLE MOVE WINDUP STRIKE RECOVER STUN STAGGER |
| 视图 | `View` 三套 SIDE / BACK / FRONT —— 顺带补上了下一节 v0.5.1 表里「敌人正/背面没画」那一格 |
| 驱动 | `enemy.gd::anim_state()` + `anim_phase()`，全部从既有计时器派生；唯一的步态相位按**世界速度**推进 |

和玩家**不共用姿态表**（只转调 `PlayerRig.ik2/curve`，全仓库一份 IK）：

1. **逆关节腿**：IK `bend_forward = false`，角度模式大腿 `PI + k` / 小腿 `PI − k`（与人腿相反）。
   两条路径必须一致 —— 自检断言「膝在髋踝中点之后」，写反了换动作时膝盖会弹到另一侧。
2. **爪 = 前臂方向的延伸**（`hand + dir(forearm) × 6`），和玩家「刀握在手心」同理，独立点一动就飘。
3. **STAGGER 压过出招相位**：起手中被精准格挡时，身体必须先演「被打断」。
4. 剪影要素：角、背刺、两节尾 + 箭头尾尖、张嘴（下颌楔形 + 獠牙）、血条从 `-50` 抬到 `-62`。

> ✅ 闸门同上：自检 **334 项 0 失败**（新增 24 条：有限数 / 骨长 / 逆关节 / 横向站位 / 步态贴地 /
> 起手爪在胸后 vs 命中越过胸口 8px / **STAGGER 骨盆比 STUN 低 3px 以上** / 状态→动作映射）。
> 📸 截图 `33~42`：站立 / 步态支撑 / 步态摆动 / 起手 / 命中 / 收招 / 短硬直 / 长硬直 / 朝上背面 / 朝下正面。

#### ✅ v0.9 技能 = 一行数据 + 第一个标签「不可格挡」（2026-11-13）

| 项 | 落点 |
|---|---|
| 新文件 | [`scripts/combat/skill_def.gd`](apps/game/blitz/scripts/combat/skill_def.gd)（`SkillDef extends Resource`：代价/形状/标签/元素/施法姿势/sfx）· [`scripts/combat/skill_book.gd`](apps/game/blitz/scripts/combat/skill_book.gd)（三个 def 的唯一来源 + `problems()` 自检） |
| 迁移 | 落雷 / 罡气 / 剑阵的 `@export` 数值与设计注释**整段搬进表里，数值一个没改** |
| 执行 | `player.gd::_cast_skill(id)` 按 `family` 分派：STRIKE 出判定框 / BUFF 挂计时器 / PLACE 丢阵 |
| 冷却 | 三个「每技能一个计时器变量」换成 `_cooldowns: Dictionary`（键 = `def.id`） |
| 动画 | 施法姿态读表里的 `cast_anim` —— `anim_state()` 不再出现技能名 |
| 标签 | 位标志 `TAG_UNBLOCKABLE / TAG_ARMOR_BREAK / TAG_DOT`（没有标签 = 0，新增机制不改既有构造） |
| 要素 | `Element` 金木水火土毒 —— **目前只是身份**，反应表是下一步 |

**「不可格挡」端到端**（`COMBAT_MATRIX §3 ②`）：

- `EnemyAttack.unblockable`（替换掉之前留着没用上的 `parryable`）→ `player.take_damage(..., unblockable)`
  → `_resolve_guard` 第 ⓪ 条直接放行。
- **只豁免格挡**：闪避（无敌帧）/ 跳跃（高度带）/ 罡气（免伤）照常有效 —— 不可格挡 ≠ 必中。
- **不扣格挡精力、不走精准窗口**：举着一个对这一招无效的盾不该再赔一次，否则会被读成「挡漏了」。
- **颜色是玩法信息**：`EnemyAttack.WARN_COLOR`（橙红 = 可挡）/ `UNBLOCKABLE_COLOR`（紫红 = 挡不住）
  是唯一来源 —— 贴地扇形、敌人身体/眼睛/爪、命中帧、HUD 规则行全部读它。
- 地图里**只有深处那一只**（`main.gd` 的 `Vector2i(28, 4)`）带这个标记：紫红必须是少数，
  否则它就不是一个需要读的信号。

> ✅ **闸门状态：全绿。** 解析闸门空输出；自检 **348 项检查 / 0 项失败**（v0.8 的 334 + 技能表 6 + 不可格挡 10，
> 另把「技能→施法姿态」一条改成同时验证布置技读表）。
> 新增断言：`SkillBook.problems()` 为空 · 每个 id 都解析得到 · **玩家拿到的判定 == 表里 `make_shape()`** ·
> 冷却按 `def.id` 记账且互不串味 · 冷却中 `_can_cast` 为假 · 敌人标记真的到判定区 · 紫红 ≠ 橙红 ·
> 举盾挨不可格挡照常掉血 / 不扣精力 / 掉出格挡 · A/B 对照 · 罡气仍能吃掉 · 跳起来照样躲得开。
>
> 📸 截图探针从 49 张扩到 **50 张**（新增 `14b`：同一只敌人、同一相位，只把「不可格挡」打开）。
> 逐张看过：`14` 橙红扇形 + 橙红身体，`14b` 紫红扇形 + 紫红身体，**一眼分得开**。
> ⚠️ 两个坑（已修）：① 只改底衬的话，贴地上真正抢眼的扫过痕/前缘仍是橙的 —— 三处颜色全部改为从警示色派生。
> ② 探针把玩家冻在原地，但场上追兵还在打 —— 玩家挨一下后 `_hit_flash_timer` 退不干净，
> 截到的是**纯白的人**；敌人在起手前统一 `can_attack = false` 并清零闪光计时器。

#### 🔜 v0.5.1 待做：正/背面美术（八向斜向已砍，2026-10-30 决定）

> **决策（2026-10-30）**：**不做斜向（45°）朝向。** 四向就是终点。
> 原要求是「玩家和敌人都要斜向面向」，复核后推翻 —— 理由见下表。

| 项 | 现状 / 结论 |
|---|---|
| 敌人的竖向朝向 | ✅ **代码已通**：`facing` 是 `Vector2`，巡逻 `Facing.choose(axis*sign)`、追击 `_face_toward()` 都会转到上/下 |
| 敌人的竖向攻击 | ✅ **代码已通**：`EnemyAttack.facing = facing`，`AttackShape` 抛弧按朝向旋转 —— 朝上/朝下出招已经打得到上方/下方的人 |
| 敌人的正/背面身体 | ✅ **已补（v0.8 敌人骨架）**：`EnemyRig.View.BACK/FRONT` 有独立骨架 —— 背面无眼、见角与背刺，正面见口鼻；肩/髋横向站开、双臂画在躯干之后。美术资产到货后这部分直接换成两套图 |
| 斜向（45°）朝向 | ❌ **不做**（原计划做 8 扇区吸附，本轮取消） |
| 为什么不做 | 见下面三条 |

**为什么四向就够（这不是省钱，是设计选择）：**

1. **判定层本来就只有 4 个朝向。** 移动是 8 向输入，但 `Facing.choose` 只吸到 4 轴，
   `AttackShape` 全部从 `facing` 生成 —— 加斜向要改的是吸附表 + 8 个形状朝向 + 测试矩阵，
   而不加斜向**一行代码都不用改**。
2. **4 轴玩法更清楚。** 攻击方向一眼可读；格挡是 `(受击方向 · 朝向) >= 0` 的**半平面**，
   八向会把它变成 90° 锥，「我到底挡没挡住」变模糊。DNF / 怒之铁拳 4 / 龙之皇冠都是 4 向做法。
3. **美术成本 ×5/3。** 四向已经是 3 套唯一图；八向是 5 套（侧、背、正、斜背 + 镜像、斜前 + 镜像），
   而斜向在画面里是**瞬时状态**，玩家绝大多数时间在看侧视和正/背面。

**唯一的代价**：斜着走时角色朝最近的轴，会有 45° 的「滑步」观感。
现在靠两件事压住 —— `Facing.choose` 的 1.25 迟滞（不逐帧翻面）、出招锁朝向（不会边走边转）。
真觉得别扭再加「斜走时身体轻微倾斜 + 步频 ×1.15」，切片阶段先不做。

**什么条件下重新考虑**：如果走 3D 预渲染路线（B），斜向 = 「相机多转 45° 再渲一遍」，几乎免费；
那时候也只是**可以**加，不是必须加 —— 换成八向只需替换 `Facing.choose` 的吸附表，`AttackShape` 不用动。

#### 🎨 美术阶段：方向 A + M0 进行中（2026-10-23 更新）

- **[`ART_PIPELINE.md`](apps/game/blitz/ART_PIPELINE.md)** —— 操作手册：风格锚（style bible 目录结构）、工具链（Retro Diffusion vs PixelLab；LibreSprite vs Aseprite vs Pixelorama；国内 LiblibAI + RunningHub + TusiArt + 即梦 + 混元 3D/Tripo）、8 步生产流程、帧预算、Godot 导入设置、战斗时序对齐、版权合规。
- **[`ART_ROUTE_DECISION.md`](apps/game/blitz/ART_ROUTE_DECISION.md)** —— 决策辅助：逐帧像素 vs 3D 预渲染的五维对比（工作量/效果/精美/动画连贯/素材量）、成本估算、混合管线、**两周 A/B 实验协议**、风险与退出条件。**当前推荐「角色 3D 预渲染 + 场景手绘像素」的混合方案，但尚未拍板**；第 10 节留了决策记录表。
- **关键结论**：Dead Cells 是 3D 模型 + 像素化渲染，不是手绘逐帧。Blitz 的固定侧视 ±1 是 3D 预渲染成本最低的一档；v0.5 的装备系统会放逐帧路线的成本（换一套装备 = 重画主角全部帧）。
- **接美术前必须先改的数值**：当前轻击总时长 0.15s，24fps 下不足 4 帧；接真动画时要调到 0.28~0.32s（重击 0.45~0.55s），并让**命中帧与 `AttackHitbox` 生成时刻对齐**，改完 F5 复核手感。

**M0 已拍的决策：**

| 项 | 决策 |
|---|---|
| 风格方向 | **A. 冷青夜雨**（冷灰蓝石 + 玉青 + 鎏金 + 朱砂 + 雷光冷白） |
| 一致性策略 | **UI / 角色 / VFX 锁死；地图按区域换色**（每图 8–12 色） |
| 出图路线 | **AI 优先**：3 张锚图（角色 / 环境 / UI），不手收集参考 |
| 首试模型 | ~~Retro Diffusion hosted MCP~~ → **本地 ComfyUI + SDXL**（见 [LOCAL_COMFYUI.md](apps/game/blitz/art/LOCAL_COMFYUI.md)） |
| 补充工具 | **LiblibAI**（国内直付）/ **即梦**（网页版免费额度；CLI 需会员）/ 混元 3D・Tripo・Meshy（3D 支线） |
| 工具分工 | 本地/国内出候选 → `palette_quantize.py` 定量化 → Aseprite 定调色板；**角色多方向/多动作走 3D 预渲染** |
| 角色美术路线 | **3D 预渲染为默认方向（B）**，待 §11.3 最小链路探针验证（2026-10-30 复核） |

**M0 新增文件（全部未跟踪）：**

| 文件 | 作用 |
|---|---|
| `SLICE_01_PLAN.md` | 第一个盒子的范围 / 全屏方案 / 非矩形房间 / M0–M7 |
| `art/README.md` | 美术目录结构 + 三条硬规矩 |
| `art/MCP_SETUP.md` | Retro Diffusion / PixelLab / Comfy Cloud 接入 + 排错 |
| `art/style_bible/M0_CHECKLIST.md` | 3 天锚定清单（含 §0.5 AI 优先路线） |
| `art/style_bible/rules.md` | 机位 / 密度 / 描边 / 光照 / **§0 UI 锁死 + 地图换色** |
| `art/style_bible/prompts.md` | 提示词模板 + §8 锁参数 + §9 后处理 + §10 模型分工 |
| `art/style_bible/palette_core.gpl` | 核心 36 色（UI / 角色 / VFX） |
| `art/style_bible/palette_region_01_temple.gpl` | 区域 7 色（夜寺） |
| `art/style_bible/palette.gpl` | 43 色并集（Aseprite 一次载入） |
| `art/manifest.example.json` | 动画清单模板 |
| `art/rooms/room_01.txt` | 80×18 ASCII 可行走掩码（最大纵深 16 格） |
| `art/LOCAL_COMFYUI.md` | 本地 ComfyUI 出像素配置单（5060 / 8GB 预算、下载清单、工作流、排错） |
| `art/tools/comfy_pixel_sdxl.json` | 只用内置节点的 ComfyUI 工作流，可直接拖进画布 |
| `art/tools/palette_quantize.py` | 大图 → 像素图（降采样 + LAB 感知量化 + 1px 描边 + `--check`） |

**MCP 状态（2026-10-23）：**

- 已接入 **Retro Diffusion**，用户级配置，`claude mcp list` = ✔ Connected。
- 余额：**$0.47**（起始 $0.50）。
- 第 1 张试产：`detailed:rd_flux`，192×192，seed 1000，`remove_bg=true` → `art/export/probe/probe_001_seed1000.png`。
  - 真像素网格、透明底，深青袍 + 金边 + 直剑，侧视朝右。
  - **42 色**（要降到 16–24）；角色内容 150×167（要缩到 112 高）。
- 第 2 张（seed 1001）返回 **500 internal_error**，**未扣费**；另两张被手动中断，未执行。
- **第 1 个动画试产（2026-10-23）**：`rd_advanced_animation__idle`，6 帧，192×192，$0.14 → `art/export/probe/idle_6f.gif`。
  角色跨帧一致性良好，呼吸/衣摆有小幅动作；**第 5 帧剑身变成金色（坏帧）** → 必须逐帧检查。
- 余额：**$0.33**。
- **尺寸问题**：192 画面里角色实际 167px，规格是 112px。缩放会破坏像素网格（`k_centroid_downscale` 还会丢 alpha），
  结论：**按最终尺寸原生生成**（角色建议 128×128，生成后约 111px），不要后期缩放。

**即梦 CLI（2026-10-29 已装，卡在会员门槛）：**

| CLI | 装到 | 定位 | 结论 |
|---|---|---|---|
| 通用创作 `dreamina` | `C:\Users\Administrator\bin\dreamina.exe` + `~/.dreamina_cli/dreamina/SKILL.md` | `text2image` / `image2image` / `image_upscale` / 视频 / `user_credit` / `session` / 异步 `submit_id` | ✅ 已装、已登录；⛔ **生成需即梦会员** |
| 全能画布 `dreamina-canvas` | `~/.agents/skills/dreamina-canvas-cli/`（SHA-256 校验） | 画布项目 + 节点图 + 模型目录 + 音频/视频 + 积分报价确认 | ⏸ 未装，同样有订阅/积分门槛 |

- 安装：`curl -s https://jimeng.jianying.com/cli | bash` —— 从字节 CDN 拉二进制 + 校验 `SKILL.md` MD5，加用户 PATH（新终端生效）。
- 登录：OAuth Device Flow，已授权成功（user_id 819593549972308，total_credit 40）。
- **实测卡点**：`list_task` / `user_credit` 正常，但 `text2image` 返回
  `当前账号没有 dreamina_cli 使用权限: 仅限会员用户使用`（不扣积分）→ **CLI 是会员功能**。
- 结论：**暂不订阅**。M0 继续用 Retro Diffusion 出锚图；真要即梦的仙侠审美，先用网页版手动出（免费额度）。
- 完整说明（含两个 CLI 对比、安装命令、分工）见 [`art/MCP_SETUP.md §10`](apps/game/blitz/art/MCP_SETUP.md)。

**角色锚图试产 1（2026-10-29，$0.24）** —— 目标：先定长相，顺带回答「八向视图怎么出」。

| 文件 | 模型 / 参数 | 结果 |
|---|---|---|
| `art/export/probe/anchor_side_2001.png` | `rd_pro__default` 128×128 seed 2001 remove_bg | 长相最好（深青袍 + 鎏金边 + 发髻 + 直剑），但视角是 **3/4 正面**，不是侧视 |
| `art/export/probe/turnaround_3001_a.png` | `character_turnaround:rd_flux` 256×256 ×2 seed 3001 | **左向侧视 + 背面** + 一把剑 |
| `art/export/probe/turnaround_3001_b.png` | 同上 | **右向侧视 + 3/4 + 背面** |

**工具链结论（重要）**：

1. `rd_pro` 对「side view facing right」基本不买账，会自己选 3/4 正面 —— 定**长相**用它，
   定**朝向视图**别用它。
2. **`character_turnaround:rd_flux` 是出多视图锚图的正确工具**（rd_fast，$0.03/张，比 rd_pro 便宜 6 倍）：
   一张图里直接给你 侧视 + 背面（有时还有 3/4），正好对上 v0.5 的四向需求。
   斜向不做（2026-10-30 决定，见 v0.5.1 一节），所以 3/4 视角只当长相参考，不进资产。
3. 余额：**$0.089**（RD Pro 一张 $0.18 已经付不起，rd_fast 还能出 2 张）。

### ⛔ 2026-10-30 转向：Retro Diffusion 断供，改「本地 ComfyUI + 3D 预渲染」

RD 的大陆支付渠道已关闭，剩下的 $0.089 连一张 rd_fast 都出不了 —— **已放弃，不再充值**。
同一天复核了美术路线，结论写进了 [`ART_ROUTE_DECISION.md §11`](apps/game/blitz/ART_ROUTE_DECISION.md)：

| 变化 | 影响 |
|---|---|
| 朝向从 ±1 → **四向（v0.5）**；八向已砍（2026-10-30） | 2D 每个动作要画 **3 组**；3D 只是多渲两个机位 → **成本乘数倒向 3D** |
| AI 3D 建模变好（四边面 / 自动绑骨 / 预设动作） | 且它的短板（拓扑、手指、脸）在 **112px 像素化下基本看不见** |
| 2D 的 AI 主力工具没了 | 本地 ComfyUI + LiblibAI 还没在本项目验证过，2D 路线现在是不对称的劣势方 |

**已落地的新文件：**

| 文件 | 作用 |
|---|---|
| [`art/LOCAL_COMFYUI.md`](apps/game/blitz/art/LOCAL_COMFYUI.md) | 本地出像素的完整配置单：下载清单（ComfyUI 便携版 / SDXL / Pixel Art XL / 2D Pixel Toolkit LoRA）、8GB 显存账、启动参数、工作流、排错 |
| [`art/tools/comfy_pixel_sdxl.json`](apps/game/blitz/art/tools/comfy_pixel_sdxl.json) | 可直接拖进 ComfyUI 的工作流，**只用内置节点**（不装任何自定义节点就能跑） |
| [`art/tools/palette_quantize.py`](apps/game/blitz/art/tools/palette_quantize.py) | 大图 → 像素图：面积平均降采样 + 中值滤波 + **LAB 感知距离**吸附 `palette.gpl` + 1px 外描边；带 `--check` 自检 |

**玩法定位同期修正（2026-10-30）：技能主导，动作为辅。**
2D + 四向朝向装不下深动作博弈，深度改由技能构筑承担（`DESIGN.md`「玩法重心」一节）。
连带结论：美术吃工的大头从「角色动作帧」挪到 **技能 VFX + Boss 技能组**；
分工表与「AI 序列帧能用到哪」见 [`ART_ROUTE_DECISION.md §12`](apps/game/blitz/ART_ROUTE_DECISION.md)。

**博弈模型也定了**：`DESIGN.md` 新增「博弈从哪来：读招 → 应对 → 代价」——
博弈不来自连段数量，来自**有代价的选择**；技能主导是决策层，动作是执行层（连招降为表达）。
配套三条防退化纪律：资源同池 / 位形竞争 / 敌人会破；每个技能必须回答「解决什么招 / 用错损失什么 / 敌人怎么破」。

**博弈矩阵初稿已出**：[`COMBAT_MATRIX.md`](apps/game/blitz/COMBAT_MATRIX.md) —— 3 个敌人招（横扫 / 裂地斩 / 震地）× 7 种应对，逐格填代价。
暴露 4 个退化点：① 跳跃对横扫零代价（建议加 0.18s 落地硬直）② 格挡太万能（3 类招里要让 1/3 不可格挡）
③ 玩家没有「布置」类技能，阵法缺位 —— **这才是「空间感不够」的真正原因，不是相机** ④ 没有「用输出换安全」的选项（完美闪避加成）。

**下一步（不再依赖 RD）：**

1. 家里 5060 上按 `LOCAL_COMFYUI.md` 跑通 → 单张 ≤40 秒、`--check` 通过（未在本机验证过，第一次跑完回来补实测数字）
2. **最小 3D 链路探针（2~3 天）**：锚图 → Tripo/Meshy 建模 + 自动绑骨 → Mixamo idle/挥击 →
   Blender 正交渲 4 机位 → `palette_quantize.py` → 摆进 Godot 看 1× 观感（判定标准见 `ART_ROUTE_DECISION.md §11.3`）
3. 探针通过 → 走 B 量产；不通过 → 退回 2D，并把体量压到 2~4 个敌人

**下一次继续就做这批（6 张候选，约 $0.18）：**

| 参数 | 值 |
|---|---|
| 模型 / 风格 | `rd_fast` + `detailed:rd_flux`（1 张已出）；可加 2 张 `simple:rd_flux` 对比 |
| 尺寸 | 192×192 |
| seed | 1001–1005 |
| 背景 | prompt 写 `on a plain white background` + `remove_bg=true` |
| 之后 | 挑 1 张 → 量化到 `palette_core.gpl` → 存 `references/characters/anchor_character.png` |

**试产 prompt（Retro Diffusion 专用，不要写 "pixel art"）：**

```text
a wuxia swordsman in a deep teal robe with gold trim, holding a straight sword,
standing idle, full body, side view facing right, calm, readable silhouette,
upper-left light, dark outline, limited palette of 16 colors, on a plain white background
```

**下一步闸门**：拿选中的锚图再出 `slash_horizontal` 和 `jump` 各 3 张 —— 角色还是同一个人 → 管线成立；
不是 → 换 PixelLab 或转 Blender 3D 预渲染，别硬调。

✅ **`DESIGN.md` 已回填成 v0.4**，现在它是唯一权威设计文档（视角选型 / 坐标模型 / 攻击形状 / 代码地图 / 验收清单）。
`V04_PLAN.md` 降为过程档案（逐步记录 + 踩坑 + 已知问题）。

⚠️ **v0.4 / v0.5 还差人工验收**（必须 F5 真开窗口）：横向跟地砖对得上吗 / 跳跃读得出吗 / 预警看得见吗 /
纵深容差合适吗 / 跳得开低扫吗 / 精准格挡有回报吗 / 精力逼出取舍吗 / 破防够痛吗 / 角色互相顶得住吗。
**v0.5 新增要看的**：上下走位时背面/正面读得出来吗 / 斜向走位朝向会不会抖 / 朝上朝下攻击的范围朝向对不对 /
朝上举盾时边界线在上方吗。截图探针 `--shots` 已经能不进游戏看这几项。
**v0.6 / v0.7 新增要看的**：落地硬直是「没站稳」还是「卡住了」/ 罡气三阶段读得懂吗 /
剑阵落下去之后追兵是不是**明显绕了弧线** / 敌人是宁可挨跳伤硬闯还是干脆不进来 /
站在自己阵里时敌人有没有照样冲进来打你（如果它绕圈不打你，那条反退化规则就写反了）。
**v0.8 新增要看的**：玩家跑步脚落不落地 / 跳跃三阶段分不分得开 / 轻击横劈与重击竖劈的刀路 /
敌人**不看预警圈**时起手（后仰收爪张嘴）读不读得出来 / 短硬直与长硬直会不会看混 /
上下走位时玩家和敌人的背/正面手臂有没有塌进躯干。
**v0.9 新增要看的**：深处那只敌人（(28,4) 的追兵）起手时是不是**紫红** / 不看 HUD 那行字，
只看颜色能不能分出「这个能挡 / 这个挡不住」 / 第一次按格挡挨了之后有没有改动作（闪避/跳开）/ 三个技能的手感有没有被这次重构改动（数值一个没改，应该一模一样）。

**继续指令：** 「继续 Blitz 的 M0 美术锚定。先读 `apps/game/blitz/art/LOCAL_COMFYUI.md`、`apps/game/blitz/ART_ROUTE_DECISION.md`（重点 §11）、`apps/game/blitz/art/README.md`、`apps/game/blitz/art/style_bible/M0_CHECKLIST.md`。**Retro Diffusion 已断供弃用**（支付渠道关闭，余额 $0.089），路线已转向「角色走 3D 预渲染（B）+ 场景/道具走 2D 像素」的混合管线。下一步二选一：① 在家里 RTX 5060 上按 `LOCAL_COMFYUI.md` 跑通本地出图（ComfyUI 便携版 + SDXL + 工作流 `art/tools/comfy_pixel_sdxl.json` + `art/tools/palette_quantize.py`），第一次跑完把实测速度补进文档 §1；② 做 **最小 3D 链路探针**（拿 `art/export/probe/turnaround_3001_a.png` → Tripo/Meshy 建模+自动绑骨 → Mixamo idle/挥击 → Blender 正交渲 4 机位 → 量化 → 摆进 Godot 看 1× 观感），判定标准见 `ART_ROUTE_DECISION.md §11.3`。⚠️ 锚图要 **3 张视图**（侧视 / 背面 / 正面），v0.5 已把朝向改成四向。v0.4/v0.5 的人工验收如果还没过，穿插着做（`--shots` 能离线看朝向与范围）。」

---

## 五、后端 API

> 路径: `apps/backend/` | 运行时: Bun + Drizzle + PostgreSQL | 端口: 3000

- ✅ 菜单 CRUD API（完整，含批量创建/删除/搜索/树形查询）
- ✅ 用户认证 API（JWT 登录/注册/角色）
- ✅ 菜单管理走 admin 后台（数据库为准，无本地菜单 JSON）
- ✅ **章节学习计时系统（自动计时，一菜单单行聚合，2026-08-31 重构）**：
  - `menu.suggested_minutes` 列 + `study_progress` 表（**一菜单一行**：`total_minutes` 累计已学、`started_at`/`ended_at` 最近起止；旧 `study_session` 多段表已删、旧数据清空）
  - `POST /api/menus/:id/study/start|end|manual`（累加 total_minutes）+ `GET /api/menus/:id/study`（累计已学 vs 建议时长 vs `overtimeMinutes`）
  - **自动计时**：打开章节（激活页签）→ POST start；切换/关闭页签、切走窗口 → POST end 结算累加；不足 1 分钟段落自动忽略；反复开关同章只更新一行，不再累积多条数据
  - **手动暂停/继续**：底部导航「⏸ 暂停计时 / ▶ 继续学习」按钮（跟视频播放/暂停一样）——人在但不想计时（上厕所/打把游戏）时点暂停，恢复计时点继续
  - 计时面板入口：底部导航「⏱ 学习计时」+ 章节右键/Tab 右键，进度条「已学 X / 建议 Y 分钟」，超时转蓝「复习巩固」；「最近学习」显示上次起止或进行中
  - GO 章节建议时长按阶段预置（`scripts/setGoSuggestedMinutes.ts`：阶段1-7 → 30/50/45/50/65/55/70 分钟，顶层 25 分钟；**非叶子章节 = 叶子子孙建议时长之和**，同脚本阶段二递归计算）
  - 计时面板「建议时长」可直接编辑（输入框，`PUT /api/menus/:id` 落库）
  - Go 镜像同步：`apps/go/backend` 的 study_progress 三层（repo/service/handler）已对齐 Bun（迁移 `0003_add_study_progress.sql`）
  - ⚠️ 服务器部署：需先 `docker exec backend-app bun run scripts/initStudyTables.ts` 建 study_progress（删旧表、旧数据清零），再跑 `scripts/setGoSuggestedMinutes.ts`

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
| 继续游戏开发（手感） | 「继续 Blitz：v0.9 技能数据表 + 不可格挡已完成 —— 技能表在 `scripts/combat/skill_book.gd`（加技能 = 加一个 def + 一个输入绑定，状态机不用动）；`EnemyAttack.unblockable` 端到端打通，紫红预警 = 挡不住。两道闸门全绿：自检 348 项 0 失败、截图 50 张。第一步 F5 手测：① v0.8/v0.9 动作与读色（紫红起手读不读得出来）；② 然后做 `COMBAT_MATRIX.md §3` 的下一个标签 / v0.9.1 的元素反应表」 |
| 继续游戏开发（美术） | 「继续 Blitz 的 M0 美术。先读 `apps/game/blitz/art/LOCAL_COMFYUI.md`、`apps/game/blitz/ART_ROUTE_DECISION.md §11`、`art/README.md`、`art/style_bible/M0_CHECKLIST.md`；RD 已断供弃用，路线=角色走 3D 预渲染（B）+ 场景/道具走 2D 像素；本地出图走 ComfyUI + `art/tools/palette_quantize.py`。下一步：本地跑通，或做最小 3D 链路探针」 |

> **提示：** 新会话中 AI 首先读取 `README.md` 和 `PROGRESS.md`（本文件），即可了解全局状态和当前任务。

### ⚡ 批量文档填充：用子代理并行

批量填充文档（一次填一个模块/阶段的多篇）时，**不要串行写**，用 `Agent` 工具派生子代理并行处理：

1. Glob 列出待填充的空壳文件（< 200 字节）
2. 按文件/子主题分组，每组一个子代理
3. 同一轮并行调用多个 `Agent`（`general-purpose`），prompt 里附 `doc-style` 关键规范 + 文件路径 + 知识点主题
4. 全部完成后统一 `vue-tsc`/构建校验

完整策略见 `.claude/skills/doc-style/SKILL.md` 开头的「🤖 AI 批量填充策略」章节。
