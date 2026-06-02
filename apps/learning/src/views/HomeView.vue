<template>
  <div v-if="userStore.isAdmin"
    class="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">

      <!-- 核心公式 -->
      <header class="text-center mb-16">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">行动纲领</h1>
        <p class="mt-3 text-lg text-slate-500">用理性拆解目标 · 用时间复利积累 · 用冗余抵抗风险</p>
        <div class="mt-8 bg-white rounded-2xl shadow-md border border-slate-100 p-6 inline-block text-left max-w-2xl">
          <p class="text-sm text-slate-400 mb-2">财富自由的定义</p>
          <p class="text-lg text-slate-800 leading-relaxed">
            <strong class="text-cyan-600">被动收入 &gt; 生活支出</strong>，且无需出卖时间维持。
            对当前阶段，更现实的目标是：<strong class="text-cyan-600">高薪技能 × 持续储蓄 × 投资收益 = 10 年内可选择的自由</strong>。
          </p>
        </div>
      </header>

      <!-- 核心策略 -->
      <section class="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-slate-100 mb-10">
        <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          核心策略：三条收入曲线
        </h2>
        <div class="grid sm:grid-cols-3 gap-5">
          <div class="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <div class="text-2xl mb-2">💰</div>
            <h3 class="font-semibold text-slate-800 mb-2">主线：薪资跃迁</h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Go 全栈 → 高级工程师 → 架构师。<br />
              每 2-3 年一次跃迁，目标 30-50k。<br />
              <span class="text-cyan-600 font-medium">确定性最高，是根基。</span>
            </p>
          </div>
          <div class="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <div class="text-2xl mb-2">🎮</div>
            <h3 class="font-semibold text-slate-800 mb-2">副线：独立产品</h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              卡牌游戏 / SaaS 工具 / 开源项目。<br />
              低概率高回报，但边际成本趋零。<br />
              <span class="text-amber-600 font-medium">10 个作品中 1 个成功即可。</span>
            </p>
          </div>
          <div class="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <div class="text-2xl mb-2">📈</div>
            <h3 class="font-semibold text-slate-800 mb-2">暗线：资产积累</h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              指数基金定投 + 应急现金 6 个月。<br />
              年化 7-10%，时间复利 10 年+ 。<br />
              <span class="text-emerald-600 font-medium">最容易被忽视，最重要。</span>
            </p>
          </div>
        </div>
      </section>

      <!-- 阶段拆解 -->
      <section class="mb-10">
        <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          分阶段执行计划
        </h2>
        <div class="relative">
          <div class="absolute left-5 sm:left-7 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          <ul class="flex flex-col gap-8">
            <li v-for="(m, idx) in milestones" :key="m.id" class="relative pl-14 sm:pl-16">
              <div
                class="absolute left-0 sm:left-2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-white text-sm font-bold z-10"
                :class="m.color">{{ idx + 1 }}</div>
              <div class="bg-white rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
                <div class="p-5 sm:p-6">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <h3 class="text-lg font-bold text-slate-800">{{ m.title }}</h3>
                    <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap w-fit">{{
                      m.period }}</span>
                  </div>
                  <p class="text-slate-500 text-sm mb-4 italic">🎯 {{ m.goal }}</p>
                  <ul class="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                    <li v-for="t in m.tasks" :key="t" class="flex items-baseline gap-2 text-slate-600 text-sm">
                      <span class="text-cyan-500 shrink-0">▸</span>
                      <span>{{ t }}</span>
                    </li>
                  </ul>
                  <div v-if="m.metric" class="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                    📏 验收标准：{{ m.metric }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- 时间分配 -->
      <section class="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-slate-100 mb-10">
        <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          时间与精力分配
        </h2>
        <p class="text-sm text-slate-500 mb-4">假设每天可投入 <strong class="text-slate-700">3-4 小时</strong>（工作日 2-3h + 周末
          6-8h），每周约 20-25 小时。</p>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 text-slate-600 font-semibold">
                <th class="px-4 py-3 text-left rounded-l-lg">阶段</th>
                <th class="px-4 py-3 text-center">技术学习</th>
                <th class="px-4 py-3 text-center">项目实战</th>
                <th class="px-4 py-3 text-center">游戏/副业</th>
                <th class="px-4 py-3 text-center">复盘/休息</th>
                <th class="px-4 py-3 text-left rounded-r-lg">核心产出</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr class="border-b border-slate-100">
                <td class="px-4 py-3 font-medium">0-6 月</td>
                <td class="px-4 py-3 text-center"><span
                    class="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">50%</span></td>
                <td class="px-4 py-3 text-center"><span
                    class="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold">30%</span></td>
                <td class="px-4 py-3 text-center"><span
                    class="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">10%</span></td>
                <td class="px-4 py-3 text-center">10%</td>
                <td class="px-4 py-3 text-xs">Go 全栈能力 + 1 个上线项目</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-4 py-3 font-medium">6-12 月</td>
                <td class="px-4 py-3 text-center"><span
                    class="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">30%</span></td>
                <td class="px-4 py-3 text-center"><span
                    class="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold">30%</span></td>
                <td class="px-4 py-3 text-center"><span
                    class="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">30%</span></td>
                <td class="px-4 py-3 text-center">10%</td>
                <td class="px-4 py-3 text-xs">游戏 MVP + 跳槽涨薪 30%+</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-medium">12-24 月</td>
                <td class="px-4 py-3 text-center"><span
                    class="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">20%</span></td>
                <td class="px-4 py-3 text-center"><span
                    class="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold">40%</span></td>
                <td class="px-4 py-3 text-center"><span
                    class="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">30%</span></td>
                <td class="px-4 py-3 text-center">10%</td>
                <td class="px-4 py-3 text-xs">稳定高薪 + 产品发布</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 财务路线图 -->
      <section class="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-slate-100 mb-10">
        <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          财务路线图（保守估计）
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 text-slate-600 font-semibold">
                <th class="px-4 py-3 text-left rounded-l-lg">年份</th>
                <th class="px-4 py-3 text-right">月收入</th>
                <th class="px-4 py-3 text-right">月储蓄</th>
                <th class="px-4 py-3 text-right">年储蓄</th>
                <th class="px-4 py-3 text-right">累计资产</th>
                <th class="px-4 py-3 text-left rounded-r-lg">里程碑</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr class="border-b border-slate-100">
                <td class="px-4 py-3 font-medium">第 1 年</td>
                <td class="px-4 py-3 text-right">15-20k</td>
                <td class="px-4 py-3 text-right">6-8k</td>
                <td class="px-4 py-3 text-right">7-10w</td>
                <td class="px-4 py-3 text-right font-mono">~9w</td>
                <td class="px-4 py-3 text-xs">建立储蓄习惯，还清高息债务</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-4 py-3 font-medium">第 2 年</td>
                <td class="px-4 py-3 text-right">20-30k</td>
                <td class="px-4 py-3 text-right">10-15k</td>
                <td class="px-4 py-3 text-right">12-18w</td>
                <td class="px-4 py-3 text-right font-mono">~25w</td>
                <td class="px-4 py-3 text-xs">跳槽涨薪 + 投资组合建立</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-4 py-3 font-medium">第 3 年</td>
                <td class="px-4 py-3 text-right">25-35k</td>
                <td class="px-4 py-3 text-right">12-18k</td>
                <td class="px-4 py-3 text-right">15-22w</td>
                <td class="px-4 py-3 text-right font-mono">~45w</td>
                <td class="px-4 py-3 text-xs">资产利息覆盖基本餐饮</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-4 py-3 font-medium">第 5 年</td>
                <td class="px-4 py-3 text-right">30-45k</td>
                <td class="px-4 py-3 text-right">15-25k</td>
                <td class="px-4 py-3 text-right">18-30w</td>
                <td class="px-4 py-3 text-right font-mono">~100w</td>
                <td class="px-4 py-3 text-xs">第一桶金，月被动收入 ~5k</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-medium">第 10 年</td>
                <td class="px-4 py-3 text-right">40-60k+</td>
                <td class="px-4 py-3 text-right">—</td>
                <td class="px-4 py-3 text-right">—</td>
                <td class="px-4 py-3 text-right font-mono">300w+</td>
                <td class="px-4 py-3 text-xs">被动收入 &gt; 月支出 → 自由</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-xs text-slate-400 mt-4">假设：年化收益 7%（指数基金历史均值），储蓄率 50%，薪资年增长 10-20%。数字为税前估算，实际因城市/行业/行情浮动。</p>
      </section>

      <!-- 风险与兜底 -->
      <section class="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-slate-100 mb-10">
        <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          风险管理
        </h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <div v-for="r in risks" :key="r.title" class="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <h3 class="font-semibold text-slate-800 text-sm mb-1">{{ r.title }}</h3>
            <p class="text-sm text-slate-600">{{ r.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 内心守则 -->
      <section class="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-slate-100 mb-10">
        <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          内心守则
        </h2>
        <ul class="space-y-3">
          <li v-for="(p, idx) in principles" :key="idx" class="flex items-start gap-3">
            <span
              class="w-6 h-6 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">{{
                idx + 1 }}</span>
            <p class="text-slate-700 text-sm">{{ p }}</p>
          </li>
        </ul>
      </section>

      <!-- 本周行动 -->
      <section
        class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-2xl shadow-md p-6 sm:p-8 border border-cyan-200 mb-10">
        <h2 class="text-xl font-bold text-slate-800 mb-4">⚡ 本周即可开始</h2>
        <ul class="space-y-2 text-sm text-slate-700">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">1.</span><span>打开 <strong>Go
                学习路线图</strong>，完成 go-1-1 环境搭建，跑通 Hello World</span></li>
          <li class="flex items-start gap-2"><span
              class="text-cyan-500 mt-1">2.</span><span>在笔记本上写下你的<strong>卡牌游戏核心机制一句话描述</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">3.</span><span>打开支付宝/银行
              APP，设置<strong>每月自动定投</strong>一只宽基指数基金（如沪深 300），金额无论大小</span></li>
          <li class="flex items-start gap-2"><span
              class="text-cyan-500 mt-1">4.</span><span>记录本周时间花销，找到可以"偷"出来学习的时段</span></li>
        </ul>
      </section>

      <footer class="text-center text-slate-400 text-sm pb-8">
        <p>最后更新：2026-06-02</p>
        <p class="mt-1">先穿上铠甲，再冲向战场。让理性成为你最锋利的武器。</p>
      </footer>

    </div>
  </div>
  <div v-else class="flex items-center justify-center bg-linear-to-br">
    <div class="text-center">
      <h1 class="text-4xl font-extrabold text-slate-900">主页</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
interface Milestone {
  id: number; title: string; period: string; goal: string; tasks: string[]; color: string; metric?: string
}

const milestones: Milestone[] = [
  {
    id: 1, title: 'Go 全栈：基础与并发', period: '第 1-6 周',
    goal: '精通 Go 核心语法与并发模型，能独立编写高性能 CLI 工具与服务。这是薪资跃迁的技术地基。',
    tasks: [
      '环境安装 + Go Modules + 变量/零值/类型系统',
      '控制流 (if/for/switch) + 函数 (多返回值/defer/闭包)',
      '数组/切片底层原理 (len/cap)、map 与 sync.Map',
      '结构体与方法：值/指针接收者选择原则',
      '接口 interface：隐式实现、类型断言、空接口',
      'goroutine 调度 GMP 模型 + channel (缓冲/非缓冲/select)',
      'sync 包全掌握：Mutex, RWMutex, WaitGroup, Once, atomic',
      'context 包：超时/取消/截止时间 + 并发模式实战',
      '错误处理最佳实践：wrap/sentinel/errors.Is/As',
      'pprof + go test -race + 表格驱动测试',
    ],
    color: 'bg-blue-500',
    metric: '独立完成一个 CLI 工具 + 10 道并发编程面试题通过'
  },
  {
    id: 2, title: 'Go Web 开发与服务架构', period: '第 7-14 周',
    goal: '从 net/http 到 gRPC，掌握构建高性能 HTTP 服务与微服务的完整能力，达到中高级后端标准。',
    tasks: [
      'net/http 标准库：Server/Handler/ServeMux 深入',
      'Gin 框架：路由分组/参数绑定/中间件链/验证',
      'RESTful API 设计：状态码/版本控制/错误格式统一',
      'JWT 鉴权双 token 模式 + CORS + 限流 (令牌桶)',
      'WebSocket 实战：协议握手 + 心跳 + 房间管理',
      'database/sql 连接池 + GORM (CRUD/关联/事务)',
      'Redis 缓存策略 (穿透/击穿/雪崩) + 分布式锁',
      'gRPC + protobuf：4 种通信模式 + 拦截器链',
      '消息队列：Kafka 生产者/消费者/消费者组概念',
      'Docker 多阶段构建 + 优雅关停 (signal.NotifyContext)',
    ],
    color: 'bg-green-500',
    metric: '完成一个博客 API 系统 (RESTful + gRPC + Redis 缓存 + Docker 部署)'
  },
  {
    id: 3, title: '工程化与项目实战', period: '第 15-24 周',
    goal: '从代码规范到 CI/CD 全链路交付。构建一个真实上线的全栈项目，作为跳槽作品。',
    tasks: [
      '代码规范：gofmt / golangci-lint / Makefile 或 Taskfile',
      '结构化日志：slog / zap + lumberjack 日志切割',
      'pprof (CPU/heap/goroutine) + trace + 火焰图解读',
      '单元测试 + 集成测试 + gomock / testcontainers',
      'CI/CD：GitHub Actions (test → build → docker push → deploy)',
      '标准 Go 项目布局 (cmd/internal/pkg/api) + Wire 依赖注入',
      '综合实战：Vue3 + Go Gin + GORM + Redis + Docker 全栈后台',
      '性能调优案例文档沉淀 + 技术博客输出',
      '简历更新 + 面试准备 (系统设计 + 算法 + Go 深入)',
      '开源贡献或内部技术分享 (建立个人品牌)',
    ],
    color: 'bg-purple-500',
    metric: '一个上线运行的全栈项目 + 3 篇技术博客 + 拿到面试邀请'
  },
  {
    id: 4, title: '独立游戏：创意孵化', period: '与 Go 并行，0-6 月',
    goal: '不写代码——专注玩法设计与市场验证。好的创意比好的代码重要十倍。',
    tasks: [
      '深度体验 10+ 款优秀卡牌游戏，记录每个游戏的核心循环 + 付费设计',
      '撰写一页纸设计文档：目标用户 + 核心循环 + 差异化 + 商业模式',
      '用纸笔或 Figma 模拟关键 UI 流程，3 轮自我测试',
      '研究 Godot 功能边界 (多人联机/性能/跨平台)',
      '竞品分析：Steam 上卡牌游戏销量/评论/差评原因',
      '每周至少 2 小时"游戏思考"，记录灵感不评判',
    ],
    color: 'bg-yellow-500'
  },
  {
    id: 5, title: '独立游戏：原型开发', period: '主业稳固后，第 7-12 月',
    goal: '最小成本验证核心玩法——MVP 只需要展现"玩起来有趣"这一个事实。',
    tasks: [
      'Godot 基础：节点/场景/信号/GDScript',
      '用 AI (Claude/Cursor) 辅助生成代码与占位美术',
      '核心对战逻辑：卡牌效果/回合/状态机/胜负判定',
      '极简 UI：手牌区域/战场/结束面板 (只需功能不追求美观)',
      '加入基础音效 (免费素材) 与动画反馈 (Tween)',
      '找 10 个目标用户试玩，记录反应而非征求意见',
      '根据反馈迭代：删减 > 增加，聚焦核心乐趣',
    ],
    color: 'bg-orange-500',
    metric: '可试玩原型 + 10 人测试视频记录'
  },
  {
    id: 6, title: '独立游戏：打磨与发布', period: '1 年后，灵活推进',
    goal: '根据数据决定方向。无论结果，这都将成为你简历上最有分量的项目经历。',
    tasks: [
      '根据试玩数据决定：继续打磨 or 转向新想法',
      '若核心数据达标 (留存/付费意愿)，加入联机 + 排行榜',
      '制作 Steam 页面：宣传片 + 截图 + 商店描述',
      '定价策略：参考同类游戏，首周折扣 + 社区运营',
      '录制开发历程视频，打造独立开发者个人品牌',
      '无论成败，写一份完整的复盘文档，归档方法论',
    ],
    color: 'bg-red-500',
    metric: 'Steam 页面上线 + 复盘文档 + 下一个产品的想法'
  }
]

const risks = [
  { title: '主业被裁/降薪', desc: '保持 6 个月生活费现金储备。持续更新简历和 LinkedIn，每季度至少投 3 家公司保持市场感知。永远有 Plan B 面试。' },
  { title: '游戏完全失败', desc: '预期管理：独立游戏成功率 < 5%。时间金钱设硬上限（< 总储蓄 15%），把失败定义为"获得方法论"而非"亏钱"。' },
  { title: '健康/精力崩溃', desc: '每天睡够 7 小时，每周至少 2 次运动（跑步/游泳/健身房），每年全面体检 1 次。健康是最大的生产资料。' },
  { title: 'AI 替代焦虑', desc: 'AI 替代的是"不会用 AI 的人"。成为 AI 原生开发者——用 Cursor/Copilot 提效，把节省的时间投入系统设计和产品思考。' },
  { title: '通货膨胀侵蚀资产', desc: '现金存款跑不过 CPI。分散配置：指数基金 (60%) + 债券 (20%) + 现金 (20%)。不要择时，定投即可。' },
  { title: '人际关系/社交隔离', desc: '高强度的自学容易让人孤立。每周至少 1 次线下社交（朋友/meetup/运动），保持对外连接。孤独不是勋章。' },
]

const principles = [
  '分清主次：Go 全栈是确定性的收入来源，游戏是创造性的可能性——两者的优先级任何时候都不可颠倒。',
  '永远不因追逐"暴富"而放弃确定性收入。真正的财富是"可持续的现金流"，不是"一次性的暴利"。',
  '为独立游戏留一扇窗——它是热情，也是万一成功的第二曲线。但先穿好铠甲，再冲向战场。',
  '拥抱 AI 而非恐惧它。一个人 + AI 的生产力已经超过 5 年前的 5 人团队。成为"超级个体"。',
  '储蓄率比收益率更重要。月薪 20k 存 10k 的人，比月薪 50k 存 5k 的人更快自由。控制消费欲望。',
  '复利不仅存在于金钱——技能、人脉、知识都会复利。今天学的每个概念都在为未来铺设高速公路。',
  '对比是偷走快乐的贼。不羡慕别人的一夜暴富，专注自己每天的 1% 进步。',
]
</script>
