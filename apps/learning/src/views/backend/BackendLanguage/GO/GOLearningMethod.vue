<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧭 GO 学习方法论</h1>
          <p class="text-sm text-slate-500 mt-1">文档是地图，不是路——用真实项目驱动学习，把并发知识「用出来」</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/LEARNING_METHOD.md" label="📝 查看方法论文档" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">学习方法</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 核心结论 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          核心结论：项目驱动学习，文档当参考手册
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          你有 TypeScript + 前端 + 计算机基础——Go 对你不是「学一门陌生语言」，而是「换一套写法」。
          教程在 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">apps/learning</code> 的文档里，
          但<strong>看≠会</strong>。不同学习方式，记忆留存率差别很大：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">方式</th><th class="px-4 py-2 border border-slate-200 font-semibold">效果</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">❌ 纯看文档 + 记忆</td><td class="px-4 py-2 border"><span class="text-red-500 font-semibold">弱</span></td><td class="px-4 py-2 border">被动输入，3 天后忘一半</td></tr>
              <tr><td class="px-4 py-2 border">⚠️ 只看文档 + 跑 demo</td><td class="px-4 py-2 border"><span class="text-amber-500 font-semibold">中</span></td><td class="px-4 py-2 border">「演示级」，强于纯看，弱于自己写</td></tr>
              <tr><td class="px-4 py-2 border">✅ 边写边学（用 Go 重写 backend）</td><td class="px-4 py-2 border"><span class="text-emerald-500 font-semibold">强</span></td><td class="px-4 py-2 border">主动回忆 + 间隔重复，写得越多记得越牢</td></tr>
              <tr><td class="px-4 py-2 border">✅ playground 验证小概念</td><td class="px-4 py-2 border"><span class="text-emerald-500 font-semibold">中→强</span></td><td class="px-4 py-2 border">遇到不懂的语法秒验证，再改着玩</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🧭 一句话：</strong>文档是地图，不是路。<strong>路是你自己写出来的。</strong></p>
        </aside>
      </section>

      <!-- 2. 为什么项目驱动 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          为什么「用 Go 重写 backend」是最佳路径
        </h2>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>用得越多记得越牢</strong>——写代码 = 主动回忆，大脑记忆最牢固的方式。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>遇到真实问题才会深入</strong>——写 API 时你会遇到「并发请求怎么安全处理」「JSON 字段怎么命名」「错误怎么传播」，这些是文档里看不会的。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>有前端的对比锚点</strong>——写 Go 接口时大脑会自动对比「这在 Express/Bun 里怎么写」，形成双通道记忆。</div>
          </li>
        </ol>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别追求「完美 Go 项目」：</strong>先用最小代码把 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs font-mono">/api/menus</code> 用 Go 跑起来——能 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs font-mono">curl</code> 到数据就算赢。后面再逐步加。</p>
        </aside>
      </section>

      <!-- 3. 三档消化知识 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          关键认识：不同知识，消化方式不同（三档）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          menu CRUD 是纯 I/O bound，<strong>天然用不上并发</strong>——阶段 2 的知识不会在 backend 里自然出现。
          所以不能「只用项目学」，要按<strong>能不能塞进真实项目</strong>把知识分三档。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">A 档 — 故意塞进 backend 的并发（在真实项目里才暴露坑）</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">并发主题</th><th class="px-4 py-2 border border-slate-200 font-semibold">塞进 backend 的玩法</th></tr></thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border"><Link :route="'go-2-8-context'" :text="'go-2-8 context'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" /></td>
                <td class="px-4 py-2 border">请求超时 / 取消中间件</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border"><Link :route="'go-2-14-sync-map'" :text="'go-2-14 sync.Map'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" /></td>
                <td class="px-4 py-2 border">菜单缓存（读多写少，教科书场景）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border"><Link :route="'go-2-12-errgroup'" :text="'go-2-12 errgroup'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" /></td>
                <td class="px-4 py-2 border">并行查「菜单树 + 计数」再聚合</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border"><Link :route="'go-2-2-channels'" :text="'go-2-2 / go-2-3 channel+select'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" /></td>
                <td class="px-4 py-2 border">限流器（token bucket）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border"><Link :route="'go-2-7-atomic'" :text="'go-2-7 atomic'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" /></td>
                <td class="px-4 py-2 border">请求计数器 / 统计</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border"><Link :route="'go-2-10-race-detection'" :text="'go-2-10 race-detection'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" /></td>
                <td class="px-4 py-2 border">用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">go run -race</code> 跑服务，观察竞态</td>
              </tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-5">
          <p class="text-sm text-emerald-800"><strong>✅ 彩蛋：</strong><code class="bg-emerald-100 px-1 rounded text-emerald-700 text-xs font-mono">http.ListenAndServe</code> 每个请求本身就是一个 goroutine——你写第一个 handler 时已经在并发环境里了。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-5">
          <p class="text-sm text-amber-800"><strong>📌 铁律：能塞进 backend 就塞进去</strong>——不只是并发。到 <strong>Web 开发阶段（go-3-x-web）</strong>，那部分知识基本都是通用后端服务（框架路由、中间件、JWT、CORS、限流、WebSocket、优雅关停、日志、配置、数据库、模板、Swagger），你做了很久前端、对这些服务已经很熟，<strong>基本全塞进 backend</strong>，不再细分档位——用真实服务落地，学得最牢。</p>
        </aside>

        <h3 class="text-md font-semibold text-slate-700 mb-3">B 档 — backend 塞不下，值得动手练的 → playground 写小变体</h3>
        <p class="text-slate-600 mb-4 text-sm leading-relaxed">
          <Link :route="'go-1-20-generics'" :text="'go-1-20 泛型'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" />
          <Link :route="'go-1-22-reflection'" :text="'go-1-22 反射'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" />
          <Link :route="'go-1-11-structs'" :text="'go-1-11 struct tag 深玩'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" />
          —— 这些去 playground 写小例子，别硬造项目场景。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">C 档 — 跑 demo + 改参数看懂就够（理解型知识）</h3>
        <p class="text-slate-600 text-sm leading-relaxed">
          <Link :route="'go-2-1-goroutine-gmp'" :text="'go-2-1 GMP 内部'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" />
          <Link :route="'go-2-13-goroutine-leak'" :text="'go-2-13 goroutine 泄漏 + pprof'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" />
          <Link :route="'go-2-11-sync-pool'" :text="'go-2-11 sync.Pool'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" />
          —— 这些是「理解型」知识，看动画 + 改 demo 输出就够，强行塞进 backend 反而牵强。
        </p>
      </section>

      <!-- 4. 主动回忆法 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          3 步主动回忆法（对阶段 2 尤其重要）
        </h2>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600">看 doc 的<strong>执行流程 + 前端类比</strong>（搞懂「为什么」，不是背语法）。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">go run . 2 xxx</code> 看<strong>真实输出</strong>（验证 demo）。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>改一处代码 → 预测输出 → 再跑</strong>（主动回忆，这步才是杠杆）。</div>
          </li>
        </ol>
        <div class="mb-4"><Code language="bash" :code="cmdDemo" title="📟 3 步主动回忆" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别逐行读 .go：</strong>只看不写还是被动。「改代码并预测输出」才是主动回忆。</p>
        </aside>
      </section>

      <!-- 5. 学习路径 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          推荐学习路径
        </h2>
        <div class="space-y-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div class="flex items-center gap-2 mb-1"><span class="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold">✅ 已完成骨架</span><span class="text-slate-700 font-semibold text-sm">第 1 阶段：用 Go 重写 backend 的菜单 CRUD（net/http 标准库）</span></div>
            <p class="text-slate-600 text-sm">学 struct、json、http.Handler、路由、map 存内存数据。<strong>当前进度：</strong>handler / service / repository / model 分层已建，能 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">curl /api/menus</code>。对照文档：go-1-11-structs、go-1-15-strings。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div class="flex items-center gap-2 mb-1"><span class="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full text-xs font-bold">🚀 立即动手</span><span class="text-slate-700 font-semibold text-sm">第 1.5 阶段：给 backend 加并发</span></div>
            <p class="text-slate-600 text-sm">加 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">sync.Map</code> 缓存层 + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">context</code> 超时中间件——把并发最实用的两个概念捡起来。对照文档：go-2-14-sync-map、go-2-8-context。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div class="flex items-center gap-2 mb-1"><span class="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">⏭️ 后续</span><span class="text-slate-700 font-semibold text-sm">第 2 阶段：Web 开发（go-3-x-web）—— Gin/Echo 框架 + PostgreSQL</span></div>
            <p class="text-slate-600 text-sm">学框架路由、中间件、JWT、CORS、限流、WebSocket、优雅关停、日志、配置、database/sql 或 GORM、模板、Swagger。<strong class="text-amber-700">📌 规则：这一阶段的通用后端服务基本全塞进 backend</strong>——能塞就塞，不再分档（见第 3 节铁律）。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div class="flex items-center gap-2 mb-1"><span class="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">⏭️ 后续</span><span class="text-slate-700 font-semibold text-sm">第 3 阶段：并发进阶</span></div>
            <p class="text-slate-600 text-sm">学 goroutine 处理并发请求、sync.Mutex 保护计数、channel 做限流、errgroup 并行聚合。对照文档：go-2-x-concurrency。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div class="flex items-center gap-2 mb-1"><span class="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">⏭️ 后续</span><span class="text-slate-700 font-semibold text-sm">第 4 阶段：重构为分层架构 + 测试</span></div>
            <p class="text-slate-600 text-sm">学接口抽象、依赖注入、单元测试、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">go run -race</code>。对照文档：go-6-x-engineering。</p>
          </div>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键心态：</strong>不要一上来就追求「完美 Go 项目」。先用最小代码把 <code class="bg-blue-100 px-1 rounded text-blue-700 text-xs font-mono">/api/menus</code> 跑起来——能 curl 到数据就算赢。</p>
        </aside>
      </section>

      <!-- 6. 文档当军规查 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          写 API 时当「军规」查（不是背，是查）
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">遇到问题</th><th class="px-4 py-2 border border-slate-200 font-semibold">翻哪篇</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">结构体标签怎么写给 JSON 序列化</td><td class="px-4 py-2 border"><Link :route="'go-1-11-structs'" :text="'go-1-11-structs'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" /></td></tr>
              <tr><td class="px-4 py-2 border">多个请求并发怎么办</td><td class="px-4 py-2 border"><Link :route="'go-2-2-channels'" :text="'go-2-2-channels'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" /></td></tr>
              <tr><td class="px-4 py-2 border">错误怎么传播给调用方</td><td class="px-4 py-2 border"><Link :route="'go-1-16-error-handling'" :text="'go-1-16-error-handling'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" /></td></tr>
              <tr><td class="px-4 py-2 border">怎么写接口让测试容易替换</td><td class="px-4 py-2 border"><Link :route="'go-1-13-methods-interfaces'" :text="'go-1-13-methods-interfaces'" animation="none" size="small" class="px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" /></td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 text-sm leading-relaxed"><strong>先写，卡住了再查文档</strong>——文档里的内容以「解决问题」的方式进入长期记忆，比先看完再写牢得多。</p>
      </section>

      <!-- 7. 每周节奏 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          建议的每周节奏
        </h2>
        <div class="mb-4"><Code language="bash" :code="weeklyCode" title="📅 每周安排" /></div>
        <p class="text-slate-600 text-sm leading-relaxed">最终目标：用 Go 重写 backend 后，你会发现——并发、接口、错误处理这些「文档里抽象的概念」，已经在肌肉记忆里了。</p>
      </section>

      <!-- 8. 常见误区 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见学习误区
        </h2>
        <ul class="space-y-3">
          <li class="flex items-start gap-2 text-slate-600"><span class="text-red-400 font-bold">❌</span><span><strong>别只靠背文档</strong>——文档是地图，不是路。</span></li>
          <li class="flex items-start gap-2 text-slate-600"><span class="text-red-400 font-bold">❌</span><span><strong>别只看文档 + 跑 demo 就以为会了</strong>——那是「演示级」，自己改过代码才算数。</span></li>
          <li class="flex items-start gap-2 text-slate-600"><span class="text-red-400 font-bold">❌</span><span><strong>别上来就啃 microservices / advanced</strong>——那是阶段 5-7 的事，写 API 用不到。</span></li>
          <li class="flex items-start gap-2 text-slate-600"><span class="text-red-400 font-bold">❌</span><span><strong>别把前后端混在一起学</strong>——先专注把 Go 后端写好，前端那套你已经会了。</span></li>
          <li class="flex items-start gap-2 text-slate-600"><span class="text-red-400 font-bold">❌</span><span><strong>别追求「完美代码」</strong>——先跑起来，再重构。V1 能用就行。</span></li>
        </ul>
      </section>

      <!-- 9. 怎么运行单个知识点 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          怎么运行单个知识点（练习场）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          demo 的 .go 文件都是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">package basics</code> / <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">package concurrency</code>，
          <strong>不是 main 包</strong>，所以不能直接 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">go run 单文件.go</code>（会报 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">cannot run non-main package</code>）。
          要经过 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">main.go</code> + <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">runner.go</code> 按主题调度。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">9.1 快速看 demo 效果（runner 调度）</h3>
        <div class="mb-4"><Code language="bash" :code="runDemoCode" title="📟 按主题跑 demo" /></div>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm"><strong>主题只输关键词即可</strong>（runner 是子串匹配，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">go run . 2 chan</code>、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">go run . 1 json</code> 都行）：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">阶段</th><th class="px-4 py-2 border border-slate-200 font-semibold">主题关键词</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs font-bold">1 基础</td><td class="px-4 py-2 border text-xs">env, variables, operators, fmt, control, functions, defer, arrays, maps, pointers, structs, new, methods, packages, strings, errors, time, file, testing, generics, json, reflection</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs font-bold">2 并发</td><td class="px-4 py-2 border text-xs">goroutines, channels, select, timer, mutex, wg, atomic, context, patterns, race, pool, errgroup, leak, syncmap</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">9.2 练习：playground 自己改着玩</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">
          <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">apps/go/playground/</code> 已建好，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">channel_demo.go</code> 是可直接跑的示例：
        </p>
        <div class="mb-4"><Code language="go" :code="playCode" title="playground/channel_demo.go" /></div>
        <div class="mb-4"><Code language="bash" :code="playRunCode" title="📟 跑 playground" /></div>
        <ul class="space-y-2 mb-4 text-sm text-slate-600 leading-relaxed">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>文件写 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">package main</code> + 一个 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">main()</code></span></li>
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>文件名别用 <code class="bg-red-100 px-1 rounded text-red-700 text-xs font-mono">_test</code> 后缀</strong>——<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">go run</code> 会忽略 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">*_test.go</code>，跑起来没输出</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>把 demo 里想练的片段抄进来、改成 main，就能改着玩</span></li>
        </ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 练习核心：</strong>改参数 → <strong>先预测输出</strong> → 再 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs font-mono">go run</code> 验证——这才是主动回忆。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关于「实时」：</strong>Go 没有 vite 那种热更新，但 demo 编译毫秒级，改完 ↑ 键重跑即可；想要自动监听可装 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs font-mono">watchexec -e go -- go run . 2 channels</code>（可选）。</p>
        </aside>
      </section>

      <!-- 10. 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>文档是地图，不是路</strong>——backend 是主战场，demo 是训练场，文档是卡住时的军规。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三档消化</strong>：能塞进 backend 的并发（context/sync.Map/errgroup/限流/atomic）→ 故意塞；塞不下的（泛型/反射）→ playground；理解型的（GMP/泄漏/pprof/sync.Pool）→ 跑 demo 改参数。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>3 步主动回忆</strong>：看 doc 流程 → <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">go run . 2 xxx</code> 看输出 → 改代码预测再跑。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>下一个动作：给 backend 加 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">sync.Map</code> 缓存 + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">context</code> 超时中间件，把并发用起来。</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/GOLearningRoadmap" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：Go 学习路线图</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-1-env-tools" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：环境与工具链 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Link, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "核心结论" },
  { id: "sec-2", name: "为什么项目驱动" },
  { id: "sec-3", name: "三档消化知识" },
  { id: "sec-4", name: "主动回忆法" },
  { id: "sec-5", name: "学习路径" },
  { id: "sec-6", name: "文档当军规查" },
  { id: "sec-7", name: "每周节奏" },
  { id: "sec-8", name: "常见误区" },
  { id: "sec-9", name: "运行与练习" },
  { id: "sec-10", name: "小结" },
]

const cmdDemo = `# 3 步主动回忆法（以 go-2-8 context 为例）
# ① 看 doc：go-2-8-context 的执行流程 + 前端类比
# ② 跑 demo 看真实输出：
cd apps/go
go run . 2 context

# ③ 改一处代码 → 预测输出 → 再跑
#    把 WithTimeout 的时间改小，预测 ctx.Err() 何时变成 DeadlineExceeded`

const weeklyCode = `# 每周节奏
# 周一    看 1-2 篇文档（当预习，不背）
# 周二~四 把概念用 playground 验证 + 在 backend 里用出来
# 周五    对照文档 review 自己写的代码，查漏补缺
# 周末    跑一遍 backend，curl 验证，巩固`

const runDemoCode = `# 按主题跑 demo（关键词子串匹配，可以只输一半）
cd apps/go
go run . 2 channels    # 阶段2 通道
go run . 2 syncmap     # sync.Map
go run . 1 generics    # 泛型
go run . 1 json        # JSON 序列化`

const playCode = `package main

import "fmt"

func main() {
    ch := make(chan int, 2) // 练习：改成 0（无缓冲），预测会发生什么？
    ch <- 1
    ch <- 2
    fmt.Println("收到:", <-ch)
}
// 输出: 收到: 1`

const playRunCode = `cd apps/go
go run playground/channel_demo.go   # 单独跑这个文件`
</script>
