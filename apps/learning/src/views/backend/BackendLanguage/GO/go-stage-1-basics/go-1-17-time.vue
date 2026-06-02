<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">时间处理</h1><p class="text-sm text-slate-500 mt-1">time.Now · Format/Parse · Duration · Ticker · 时区</p></div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-17-time.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-17</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>获取与构造时间</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.Now()</code> 返回本地当前时间；<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.Date()</code> 构造指定时刻。Unix 系列方法获取秒/毫秒/纳秒时间戳。</p>
        <div class="mb-4"><Code language="go" :code="nowCode" title="time_now.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Format 格式化 — 参考时间法</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Go 不使用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">%Y-%m-%d</code> 等占位符，而是用<strong>参考时间</strong> <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Mon Jan 2 15:04:05 MST 2006</code> 的对应数字位置表示格式。记忆：<strong>01/02 03:04:05PM '06 -0700</strong>（月日 时分秒 PM 年 时区）。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">常量</th><th class="px-4 py-2 border border-slate-200 font-semibold">格式</th><th class="px-4 py-2 border border-slate-200 font-semibold">示例</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">time.RFC3339</td><td class="px-4 py-2 border font-mono text-xs">2006-01-02T15:04:05Z07:00</td><td class="px-4 py-2 border font-mono text-xs">2025-06-15T14:30:00Z</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">time.DateTime</td><td class="px-4 py-2 border font-mono text-xs">2006-01-02 15:04:05</td><td class="px-4 py-2 border font-mono text-xs">2025-06-15 14:30:00</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">time.DateOnly</td><td class="px-4 py-2 border font-mono text-xs">2006-01-02</td><td class="px-4 py-2 border font-mono text-xs">2025-06-15</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">time.TimeOnly</td><td class="px-4 py-2 border font-mono text-xs">15:04:05</td><td class="px-4 py-2 border font-mono text-xs">14:30:00</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">time.RFC822</td><td class="px-4 py-2 border font-mono text-xs">02 Jan 06 15:04 MST</td><td class="px-4 py-2 border font-mono text-xs">15 Jun 25 14:30 UTC</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="formatCode" title="time_format.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>参考时间必须是 <code class="bg-amber-100 px-1 rounded text-xs font-mono">2006-01-02 15:04:05</code> 这些<strong>固定数字</strong>。写成 <code class="bg-amber-100 px-1 rounded text-xs font-mono">2025-01-02</code> 会导致格式错误。Go 的格式化本质上是在参考时间的特定位置上"抠出"对应的数字来构造布局。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>Parse 解析</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.Parse(layout, value)</code> 按格式字符串解析时间。<strong>默认使用 UTC 时区</strong>；需要按特定时区解析时用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ParseInLocation</code>。</p>
        <div class="mb-4"><Code language="go" :code="parseCode" title="time_parse.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>Duration — 时间间隔</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.Duration</code> 是以纳秒为单位的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">int64</code>。提供 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Nanosecond/Microsecond/Millisecond/Second/Minute/Hour</code> 常量。用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.Since(t)</code> 测量耗时。</p>
        <div class="mb-4"><Code language="go" :code="durationCode" title="duration.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>定时器：Sleep / After / Ticker</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">函数</th><th class="px-4 py-2 border border-slate-200 font-semibold">行为</th><th class="px-4 py-2 border border-slate-200 font-semibold">返回值</th><th class="px-4 py-2 border border-slate-200 font-semibold">注意</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">time.Sleep(d)</td><td class="px-4 py-2 border">阻塞当前 goroutine d 时长</td><td class="px-4 py-2 border">-</td><td class="px-4 py-2 border">不可中断</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">time.After(d)</td><td class="px-4 py-2 border">d 后向返回的 channel 发送当前时间</td><td class="px-4 py-2 border font-mono text-xs">&lt;-chan Time</td><td class="px-4 py-2 border">select 超时控制；未触发前不会 GC</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">time.NewTicker(d)</td><td class="px-4 py-2 border">每隔 d 向 .C 发送时间</td><td class="px-4 py-2 border font-mono text-xs">*Ticker</td><td class="px-4 py-2 border font-bold text-red-500">必须 Stop() 否则泄漏</td></tr>
              <tr class="bg-slate-50"><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">time.NewTimer(d)</td><td class="px-4 py-2 border">一次性定时器，可 Stop/Reset</td><td class="px-4 py-2 border font-mono text-xs">*Timer</td><td class="px-4 py-2 border">能用 After 就不用 Timer</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="timerCode" title="timers.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 泄漏陷阱：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">time.After</code> 在超时前不会被 GC。在循环中使用会导致内存泄漏——高频循环中应复用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">time.NewTimer</code> 并 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Reset()</code>。</p>
        </aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>时区</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.LoadLocation("Asia/Shanghai")</code> 加载 IANA 时区；<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.FixedZone(name, offsetSec)</code> 创建固定偏移时区。用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.In(loc)</code> 转换时区，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.UTC()</code> 转为 UTC。</p>
        <div class="mb-4"><Code language="go" :code="tzCode" title="timezone.go" /></div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键点</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>格式/解析的参考时间固定为 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Mon Jan 2 15:04:05 MST 2006</code>，不可自定</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">time.Time</code> 内部包含时区信息，比较/存储时统一用 UTC</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">time.After</code> 在循环中会泄漏；高频场景用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">NewTimer</code> + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Reset</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Ticker.Stop()</code> 只停止发送，不关闭 channel——停止后禁止再从 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">.C</code> 读取</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>测量耗时用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">time.Since(start)</code> 而非手动减——可读性更好</span></li>
        </ul>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-16-error-handling" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：错误处理</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-18-file-io" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：文件 I/O →</RouterLink>
      </nav>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
import { RouterLink } from 'vue-router'

const navList = [
    { id: "sec-1", name: "获取与构造时间" },
    { id: "sec-2", name: "Format 格式化 — 参考时间法" },
    { id: "sec-3", name: "Parse 解析" },
    { id: "sec-4", name: "Duration — 时间间隔" },
    { id: "sec-5", name: "定时器：Sleep / After / Ticker" },
    { id: "sec-6", name: "时区" },
    { id: "sec-7", name: "关键点" }
  ]
const nowCode = `now := time.Now()
fmt.Println(now)                         // 2025-06-15 14:30:00 +0800 CST
fmt.Println(now.Unix())                  // 1718434200
fmt.Println(now.UnixMilli())             // 1718434200000

// 构造指定时间
t := time.Date(2025, 1, 15, 10, 30, 0, 0, time.UTC)
fmt.Println(t)                           // 2025-01-15 10:30:00 +0000 UTC
fmt.Println(t.Weekday())                 // Wednesday

// 零值时间 — time.Time{}
var zero time.Time
fmt.Println(zero.IsZero())               // true`

const formatCode = `now := time.Now()

// 预定义 layout 常量（Go 1.20+）
fmt.Println(now.Format(time.RFC3339))     // 2025-06-15T14:30:00+08:00
fmt.Println(now.Format(time.DateTime))    // 2025-06-15 14:30:00
fmt.Println(now.Format(time.DateOnly))    // 2025-06-15
fmt.Println(now.Format(time.TimeOnly))    // 14:30:00
fmt.Println(now.Format(time.RFC822))      // 15 Jun 25 14:30 CST
fmt.Println(now.Format(time.Kitchen))     // 2:30PM

// 自定义格式 — 必须用 2006-01-02 15:04:05 这些固定数字
fmt.Println(now.Format("2006/01/02 15:04"))          // 2025/06/15 14:30
fmt.Println(now.Format("01/02/2006 3:04 PM"))        // 06/15/2025 2:30 PM
fmt.Println(now.Format("Mon, Jan 2 '06 at 15:04"))   // Sun, Jun 15 '25 at 14:30`

const parseCode = `// Parse — 默认 UTC
t, err := time.Parse(time.RFC3339, "2025-06-15T14:30:00Z")
// t = 2025-06-15 14:30:00 +0000 UTC

// ParseInLocation — 按指定时区解析
loc, _ := time.LoadLocation("Asia/Shanghai")
t, err = time.ParseInLocation("2006-01-02 15:04", "2025-06-15 14:30", loc)
// t = 2025-06-15 14:30:00 +0800 CST

// 常见解析格式
t, _ = time.Parse("2006-01-02", "2025-06-15")
t, _ = time.Parse("15:04:05", "14:30:00")
t, _ = time.Parse("2006/01/02 15:04:05", "2025/06/15 14:30:00")`

const durationCode = `// duration = int64 纳秒
d1 := 3 * time.Hour
d2 := 30 * time.Minute
d3 := 500 * time.Millisecond
fmt.Println(d1 + d2 + d3)     // 3h30m0.5s

// 常用常量
time.Nanosecond   // 1
time.Microsecond  // 1000
time.Millisecond  // 1000000
time.Second       // 1000000000
time.Minute       // 60000000000
time.Hour         // 3600000000000

// 时间加减
future := now.Add(2 * time.Hour)       // 2小时后
past   := now.Add(-30 * time.Minute)   // 30分钟前
diff   := now.Sub(past)                // 30m0s — 两个时间之差

// time.Since — 测量耗时（惯用写法）
start := time.Now()
doWork()
elapsed := time.Since(start)           // 等价于 time.Now().Sub(start)

// 从字符串解析 duration
d, _ := time.ParseDuration("1h30m")    // 1h30m0s`

const timerCode = `// Sleep — 阻塞当前 goroutine
time.Sleep(2 * time.Second)

// After — 常用于 select 超时（一次性）
select {
case result := <-ch:
    process(result)
case <-time.After(5 * time.Second):
    fmt.Println("timeout")
}

// Ticker — 周期性触发，必须 Stop()
ticker := time.NewTicker(1 * time.Second)
defer ticker.Stop()  // 防止 goroutine 泄漏
for i := 0; i < 5; i++ {
    <-ticker.C
    fmt.Println("tick")
}

// Timer — 一次性，可 Reset 复用
timer := time.NewTimer(2 * time.Second)
if !timer.Stop() {
    <-timer.C          // 排空 channel
}
timer.Reset(1 * time.Second)  // 复用 timer
<-timer.C`

const tzCode = `now := time.Now()

// LoadLocation — 加载 IANA 时区
shanghai, _ := time.LoadLocation("Asia/Shanghai")
tokyo, _    := time.LoadLocation("Asia/Tokyo")
nyc, _      := time.LoadLocation("America/New_York")

fmt.Println(now.UTC())              // UTC 时间
fmt.Println(now.In(shanghai))       // 上海时间

// FixedZone — 固定偏移（如 UTC+5:30 印度时区）
india := time.FixedZone("IST", 5*3600+1800)  // 5h30m in seconds
fmt.Println(now.In(india))

// 时区转换：同一时刻在不同时区的表示
t := time.Date(2025, 6, 15, 14, 30, 0, 0, time.UTC)
fmt.Println(t.In(nyc))      // 2025-06-15 10:30:00 -0400 EDT
fmt.Println(t.In(shanghai)) // 2025-06-15 22:30:00 +0800 CST

// 存储/传输时始终用 UTC
dbTime := now.UTC()`
</script>
