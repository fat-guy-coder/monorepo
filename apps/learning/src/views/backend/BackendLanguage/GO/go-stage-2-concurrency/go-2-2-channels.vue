<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">📡 Channel 通道</h1><p class="text-sm text-slate-500 mt-1">goroutine 之间通信的管道 — Go 并发编程的基石，底层是带锁的环形队列</p></div>
        <div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-2-channels.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-2</span></div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. Channel 是什么？用来干嘛？ -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Channel 到底是什么？用来干嘛？</h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          Channel 是 Go 语言内置的<strong>goroutine 间通信机制</strong>。你可以把它理解为<strong>一根类型安全的管道</strong>：
          一头往里写数据，另一头读出数据。写和读都会<strong>阻塞</strong>，直到对方就绪——这个阻塞特性恰恰是它强大之处。
        </p>

        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话理解：</strong>Channel 不需要你显式加锁就能安全地在 goroutine 间传递数据。Go 的哲学是 <strong>"不要通过共享内存来通信，而要通过通信来共享内存"</strong>——channel 就是这句话的具体实现。你不需要 mutex，不需要 volatile，不需要 atomic——channel 把这些都封装好了。</p>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 跨语言类比：</strong><br/>
          ≈ <strong>消息队列</strong>（RabbitMQ/Kafka）的<strong>进程内版本</strong> — 有缓冲、有阻塞、有生产-消费模式<br/>
          ≈ <strong>Node.js worker.postMessage()</strong> — 但类型安全且自带阻塞同步<br/>
          ≈ <strong>Unix 管道 pipe</strong>（<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">cmd1 | cmd2</code>）— 数据从一个流向另一个<br/>
          ≈ <strong>RxJS Subject</strong> — "推"模式的数据流，但 Channel 自带<strong>背压</strong>（消费慢时生产自动阻塞）<br/>
          <strong>关键区别：</strong>Channel 是语言内置的，不是库。编译器知道它，runtime 调度器知道它，GC 知道它。
          </p>
        </aside>

        <h3 class="text-md font-semibold text-slate-700 mb-3">Channel 的四个核心用途</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">① 传递数据</h4>
            <p class="text-xs text-slate-500">goroutine A 计算结果，通过 channel 发给 goroutine B 使用。这是最常见的用法。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">② 同步信号</h4>
            <p class="text-xs text-slate-500">"我完成了，通知你"——done channel。不需要传具体值，<code class="bg-slate-200 px-1 rounded text-xs font-mono">chan struct{}{}</code> 零内存。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">③ 广播退出</h4>
            <p class="text-xs text-slate-500">close(channel) 会同时唤醒<strong>所有</strong>等待该 channel 的 goroutine——天然的广播机制。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">④ 并发控制（信号量）</h4>
            <p class="text-xs text-slate-500">缓冲 channel 天然是信号量——容量 N 就是最大并发数，满了自动阻塞。</p>
          </div>
        </div>

        <div class="mb-4"><Code language="go" :code="fourUseCasesCode" title="四大用途速览.go" /></div>
      </section>

      <!-- 2. 底层实现：hchan 结构体 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>底层实现：hchan 结构体深度剖析</h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          每一个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">make(chan T)</code> 调用，底层都创建了一个 <strong>runtime.hchan 结构体</strong>。
          Channel 变量本身只是一个指向这个结构体的指针。理解 hchan 的结构，就能理解 channel 的所有行为。
        </p>

        <div class="bg-slate-900 rounded-xl p-5 mb-4 font-mono text-sm">
          <div class="text-green-400 mb-1">// runtime/chan.go — Go 标准库源码中的 hchan</div>
          <div class="text-yellow-300">type</div><div class="text-white inline"> hchan </div><div class="text-yellow-300">struct</div><div class="text-white"> {</div>
          <div class="pl-4"><span class="text-cyan-300">qcount</span><span class="text-white">   </span><span class="text-yellow-300">uint</span><span class="text-slate-400">           // ① 环形队列中当前缓存的元素个数</span></div>
          <div class="pl-4"><span class="text-cyan-300">dataqsiz</span><span class="text-white"> </span><span class="text-yellow-300">uint</span><span class="text-slate-400">           // ② 环形队列的总容量（make(chan T, N) 的 N）</span></div>
          <div class="pl-4"><span class="text-cyan-300">buf</span><span class="text-white">      </span><span class="text-yellow-300">unsafe.Pointer</span><span class="text-slate-400">  // ③ 指向底层环形队列数组的指针</span></div>
          <div class="pl-4"><span class="text-cyan-300">elemsize</span><span class="text-white"> </span><span class="text-yellow-300">uint16</span><span class="text-slate-400">         // ④ 每个元素占用的字节数</span></div>
          <div class="pl-4"><span class="text-cyan-300">closed</span><span class="text-white">   </span><span class="text-yellow-300">uint32</span><span class="text-slate-400">         // ⑤ 是否已关闭（0=未关, 1=已关）</span></div>
          <div class="pl-4"><span class="text-cyan-300">sendx</span><span class="text-white">    </span><span class="text-yellow-300">uint</span><span class="text-slate-400">           // ⑥ 发送索引——下一个写入 buf 的位置</span></div>
          <div class="pl-4"><span class="text-cyan-300">recvx</span><span class="text-white">    </span><span class="text-yellow-300">uint</span><span class="text-slate-400">           // ⑦ 接收索引——下一个从 buf 读取的位置</span></div>
          <div class="pl-4"><span class="text-cyan-300">recvq</span><span class="text-white">    </span><span class="text-yellow-300">waitq</span><span class="text-slate-400">          // ⑧ 等待接收的 goroutine 队列（FIFO 链表）</span></div>
          <div class="pl-4"><span class="text-cyan-300">sendq</span><span class="text-white">    </span><span class="text-yellow-300">waitq</span><span class="text-slate-400">          // ⑨ 等待发送的 goroutine 队列（FIFO 链表）</span></div>
          <div class="pl-4"><span class="text-cyan-300">lock</span><span class="text-white">     </span><span class="text-yellow-300">mutex</span><span class="text-slate-400">          // ⑩ 保护整个 hchan 的互斥锁</span></div>
          <div class="text-white">}</div>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">非缓冲 vs 缓冲：内存交互完全不同</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">操作</th><th class="px-4 py-2 border font-semibold">非缓冲 channel (dataqsiz=0)</th><th class="px-4 py-2 border font-semibold">缓冲 channel (dataqsiz=N)</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-medium">buf</td><td class="px-4 py-2 border">nil（没有环形队列！）</td><td class="px-4 py-2 border">分配 N 个元素的数组</td></tr>
              <tr><td class="px-4 py-2 border font-medium">send 流程</td><td class="px-4 py-2 border">① 加锁 → ② 检查 recvq 有没有等待者<br/>→ ③ <strong>直接内存拷贝</strong>给等待的 recv G<br/>→ ④ 唤醒 recv G → ⑤ 解锁</td><td class="px-4 py-2 border">① 加锁 → ② qcount &lt; dataqsiz<br/>→ ③ <strong>拷贝到 buf[sendx]</strong><br/>→ ④ sendx++, qcount++ → ⑤ 解锁</td></tr>
              <tr><td class="px-4 py-2 border font-medium">recv 流程</td><td class="px-4 py-2 border">① 加锁 → ② 检查 sendq 有没有等待者<br/>→ ③ <strong>直接内存拷贝</strong>从等待的 send G<br/>→ ④ 唤醒 send G → ⑤ 解锁</td><td class="px-4 py-2 border">① 加锁 → ② qcount &gt; 0<br/>→ ③ <strong>从 buf[recvx] 拷贝</strong><br/>→ ④ recvx++, qcount-- → ⑤ 解锁</td></tr>
              <tr><td class="px-4 py-2 border font-medium">阻塞时</td><td class="px-4 py-2 border">当前 G 放入 sendq/recvq<br/>→ 调用 gopark() 挂起 G</td><td class="px-4 py-2 border">当前 G 放入 sendq/recvq<br/>→ 调用 gopark() 挂起 G</td></tr>
              <tr><td class="px-4 py-2 border font-medium">唤醒时</td><td class="px-4 py-2 border">对方 G 被调度器放入 runq<br/>→ 从暂停处继续执行</td><td class="px-4 py-2 border">同左</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">send 和 recv 的完整执行流程</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>加锁</strong> — <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">lock(&hchan.lock)</code>。所有 channel 操作都要先获取这把锁——这就是为什么 channel 是并发安全的。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>检查对方等待队列</strong> — 非缓冲 channel 优先检查有没有对方在等；缓冲 channel 优先操作 buf。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>内存拷贝</strong> — 数据从发送方的栈拷贝到接收方的栈（非缓冲，直接拷贝），或从发送方栈拷贝到 buf（缓冲，间接）。始终是<strong>值拷贝</strong>，没有引用。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>唤醒或阻塞</strong> — 对方在等 → 直接唤醒对方 G（goready）。对方不在等 → 把自己挂起（gopark），加入等待队列。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>解锁</strong> — <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">unlock(&hchan.lock)</code>。</div></li>
        </ol>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>Channel 本质就是一个<strong>带锁的、goroutine 感知的环形队列</strong>。"goroutine 感知"意味着它不只是存数据——当一个 G 阻塞在 channel 上时，runtime 会把这个 G 挂起（gopark），让 M 去执行其他 G。当数据到达时，runtime 再把 G 唤醒（goready）放回 P 的队列。这整个过程<strong>不需要你在代码里写任何锁或条件变量</strong>。</p>
        </aside>
      </section>

      <!-- 3. 缓冲 vs 非缓冲 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>非缓冲 vs 缓冲 channel</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold"></th><th class="px-4 py-2 border font-semibold">非缓冲 <code class="text-xs">make(chan int)</code></th><th class="px-4 py-2 border font-semibold">缓冲 <code class="text-xs">make(chan int, 3)</code></th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">发送阻塞</td><td class="px-4 py-2 border">直到有接收方读取</td><td class="px-4 py-2 border">缓冲满时才阻塞</td></tr><tr><td class="px-4 py-2 border">接收阻塞</td><td class="px-4 py-2 border">直到有发送方写入</td><td class="px-4 py-2 border">缓冲空时才阻塞</td></tr><tr><td class="px-4 py-2 border">同步性</td><td class="px-4 py-2 border"><strong>同步握手</strong></td><td class="px-4 py-2 border"><strong>异步解耦</strong></td></tr><tr><td class="px-4 py-2 border">用途</td><td class="px-4 py-2 border">同步信号、确认、done channel</td><td class="px-4 py-2 border">生产者-消费者、并发控制、队列</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="go" :code="bufferCode" title="buffer_demo.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">nil channel — 永久阻塞的特殊语义</h3>
        <div class="mb-4"><Code language="go" :code="nilChannelCode" title="nil_channel.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ nil channel 三大规则：</strong>① send → 永久阻塞 ② recv → 永久阻塞 ③ close → panic。唯一合法用途是在 select 中<strong>动态禁用 case</strong>——把 channel 置为 nil，对应 case 永不选中。</p></aside>
      </section>

      <!-- 4. 关闭 channel -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>关闭 Channel：广播信号 + range 遍历</h2>
        <p class="text-slate-600 mb-4"><strong>只有发送方关闭 channel。</strong>关闭后 buf 中剩余数据仍可读，读空后返回零值（ok=false）。range 在 close 且 buf 空后自动退出。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">操作</th><th class="px-4 py-2 border font-semibold">结果</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">close(ch) — ch 未关闭</td><td class="px-4 py-2 border text-emerald-600">✅</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">close(ch) — ch 已关闭</td><td class="px-4 py-2 border text-red-600">❌ panic</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">close(nil)</td><td class="px-4 py-2 border text-red-600">❌ panic</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">ch <- v — ch 已关闭</td><td class="px-4 py-2 border text-red-600">❌ panic</td></tr><tr><td class="px-4 py-2 border font-mono text-xs"><-ch — 已关闭 + buf 空</td><td class="px-4 py-2 border">✅ 返回零值, ok=false</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">for v := range ch — 已关闭</td><td class="px-4 py-2 border">✅ 读完 buf 自动退出</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="go" :code="closeCode" title="channel_close.go" /></div>
      </section>

      <!-- 5. 单向 channel + 实战模式 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>单向 Channel + 经典并发模式</h2>
        <h3 class="text-md font-semibold text-slate-700 mb-3">编译时方向约束</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">chan<- T</code> 只发、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono"><-chan T</code> 只收。双向可隐式转单向，反之不行。在函数签名里用单向 channel 是 Go 的惯用法——告诉调用者这个参数是用来发还是收的。</p>
        <div class="mb-4"><Code language="go" :code="directionalCode" title="directional.go" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">生产者-消费者 + Semaphore 并发控制</h3>
        <div class="mb-4"><Code language="go" :code="patternCode" title="producer_consumer.go" /></div>
      </section>

      <!-- 6. 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结 &amp; 面试要点</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Channel = 带锁的环形队列 + goroutine 感知</strong>——hchan 结构体，make 返回指针</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>非缓冲 channel：send 和 recv 直接内存拷贝（跳过 buf），同步握手</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>缓冲 channel：先写 buf 环形队列，buf 满/空时才阻塞，异步解耦</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>阻塞 = gopark() 挂起 G</strong>，<strong>唤醒 = goready() 放回 P 队列</strong>——由 runtime 调度器处理</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>发送方关闭 channel——close 是广播，所有等待者同时醒来。range 自动在 close 后退出</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>四大用途：<strong>传数据、发信号、广播退出、限流（Semaphore）</strong></span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-1-goroutine-gmp" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：goroutine 与 GMP</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-3-select" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：Select 多路复用 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "是什么？用来干嘛？" },
  { id: "sec-2", name: "底层实现 hchan" },
  { id: "sec-3", name: "非缓冲 vs 缓冲" },
  { id: "sec-4", name: "关闭 channel" },
  { id: "sec-5", name: "单向 + 实战模式" },
  { id: "sec-6", name: "小结 & 面试要点" },
]

const fourUseCasesCode = `// ① 传递数据
ch := make(chan int)
go func() { ch <- heavyComputation() }()
result := <-ch  // 拿到计算结果

// ② 同步信号（done channel — struct{} 零内存）
done := make(chan struct{})
go func() { doWork(); done <- struct{}{} }()
<-done  // 等待完成

// ③ 广播退出（close channel → 所有等待者同时唤醒）
stop := make(chan struct{})
for i := 0; i < 5; i++ {
    go func() { <-stop; fmt.Println("退出") }()
}
close(stop)  // 5 个 goroutine 同时收到信号！

// ④ 并发控制（缓冲 channel 作为信号量）
sema := make(chan struct{}, 3)  // 最多 3 个并发
for _, url := range urls {
    sema <- struct{}{}  // 获取槽位
    go func(u string) {
        defer func() { <-sema }()  // 释放槽位
        fetch(u)
    }(url)
}`

const bufferCode = `// 非缓冲 — 同步握手（send 和 recv 同时发生，直接内存拷贝）
unbuf := make(chan int)
go func() { unbuf <- 1 }()  // 阻塞等待 recv
v := <-unbuf                // 唤醒 sender，数据从 sender 栈直接拷到 v
fmt.Println(v)              // 输出: 1

// 缓冲 — 异步队列（容量 3，环形队列）
buf := make(chan string, 3)
buf <- "a"; buf <- "b"; buf <- "c"  // 不阻塞（buf 未满）
// buf <- "d"                        // 阻塞！qcount == dataqsiz (3==3)
fmt.Println(<-buf, <-buf, <-buf)    // 输出: a b c
fmt.Println(len(buf), cap(buf))     // 输出: 0 3

// 缓冲 channel 用作 Semaphore（信号量）
sema := make(chan struct{}, 10)  // 最多 10 个并发
for _, job := range jobs {
    sema <- struct{}{}  // 获取槽位（满了就阻塞）
    go func(j Job) {
        defer func() { <-sema }()  // 释放槽位
        process(j)
    }(job)
}`

const nilChannelCode = `var nilCh chan int  // nilCh == nil

// nilCh <- 1        // 永久阻塞！不是 panic
// <-nilCh           // 永久阻塞！
// close(nilCh)      // panic!

// ✅ 唯一合法用途：在 select 中动态禁用 case
var timeoutCh <-chan time.Time = nil  // 默认不要超时
if someCondition {
    timeoutCh = time.After(5 * time.Second)  // 条件满足时才启用
}
select {
case <-timeoutCh:  // nil 时永不选中，非 nil 时正常
case <-workCh:
}`

const closeCode = `ch := make(chan int, 3)
ch <- 1; ch <- 2; ch <- 3
close(ch)                  // 发送方关闭

// ch <- 4                 // ❌ panic! send on closed channel

// range — 自动在 close + buf 空后退出
for v := range ch { fmt.Println(v) }  // 输出: 1, 2, 3

// 检查是否关闭
v, ok := <-ch              // v=0, ok=false（已关闭且空）

// close channel = 广播信号
done := make(chan struct{})
for i := 0; i < 5; i++ {
    go func(id int) {
        <-done
        fmt.Printf("worker %d 退出\\n", id)
    }(i)
}
close(done)  // 所有 5 个 worker 同时被唤醒！`

const directionalCode = `// chan<- T = 只能发送
func produce(ch chan<- int) {
    for i := 0; i < 3; i++ { ch <- i }
    close(ch)              // 发送方关闭
}
// <-chan T = 只能接收
func consume(ch <-chan int) {
    for v := range ch { fmt.Println(v) }
}

func main() {
    ch := make(chan int, 3)
    go produce(ch)         // 双向 → 只发（自动转换）
    consume(ch)            // 双向 → 只收（自动转换）
}`

const patternCode = `// 🏭 生产者-消费者 + Semaphore 限流
func main() {
    const maxConcurrency = 5
    sema := make(chan struct{}, maxConcurrency) // 信号量
    jobs := make(chan string, 100)

    // 消费者池
    for w := 1; w <= 3; w++ {
        go func(id int) {
            for job := range jobs {
                sema <- struct{}{} // 获取并发槽
                fmt.Printf("worker %d: %s\\n", id, job)
                time.Sleep(100 * time.Millisecond)
                <-sema              // 释放并发槽
            }
        }(w)
    }

    // 生产者
    for _, url := range urls { jobs <- url }
    close(jobs)
}
// 3 个 worker 同时消费，但通过 sema 控制"真正在执行的并发数"不超过 5`
</script>
