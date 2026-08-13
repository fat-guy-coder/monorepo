<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔤 字符串哈希：把字符串变成数字指纹</h1>
          <p class="text-sm text-slate-500 mt-1">多项式哈希 + 滚动哈希 + Rabin-Karp 的数学地基</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 3-1-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：字符串 → 多项式展开 → 数字
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          字符串不能直接当数组下标，所以要先把它「翻译」成一个数字。核心思路是把字符串看成一个
          <strong>P 进制数</strong>：每个字符是一位，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">h = s[0]·P^(n-1) + s[1]·P^(n-2) + …</code>。
          下面这张图展示 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">"abc"</code> 如何变成数字 1026。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 140" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="sh-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 字符串字符 -->
            <rect x="40" y="48" width="56" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="68" y="66" text-anchor="middle" dominant-baseline="central" font-size="20" font-family="monospace" font-weight="bold" fill="#ffffff">a</text>
            <text x="68" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">code=1</text>
            <rect x="108" y="48" width="56" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="136" y="66" text-anchor="middle" dominant-baseline="central" font-size="20" font-family="monospace" font-weight="bold" fill="#ffffff">b</text>
            <text x="136" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">code=2</text>
            <rect x="176" y="48" width="56" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="204" y="66" text-anchor="middle" dominant-baseline="central" font-size="20" font-family="monospace" font-weight="bold" fill="#ffffff">c</text>
            <text x="204" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">code=3</text>

            <!-- 箭头 字符串 → 多项式 -->
            <line x1="232" y1="71" x2="266" y2="71" stroke="#94a3b8" stroke-width="2" marker-end="url(#sh-arr)" />

            <!-- 多项式展开 -->
            <rect x="270" y="42" width="250" height="58" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="395" y="62" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1·31² + 2·31 + 3</text>
            <text x="395" y="82" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">P=31 进制累加</text>

            <!-- 箭头 多项式 → 数字 -->
            <line x1="520" y1="71" x2="554" y2="71" stroke="#94a3b8" stroke-width="2" marker-end="url(#sh-arr)" />

            <!-- 数字结果 -->
            <rect x="558" y="48" width="130" height="46" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="623" y="71" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">1026</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：字符串哈希结构 —— 每个字符是 P 进制的一位，累加得到一个数字指纹</figcaption>
        </figure>

        <!-- 操作示意图：滚动哈希 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：窗口滑动 —— 滚动哈希 O(1) 更新</h3>
        <figure>
          <svg viewBox="0 0 720 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="sh-r1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- before 窗口 -->
            <rect x="24" y="52" width="140" height="52" rx="8" fill="#e0f2fe" stroke="#0891b2" stroke-width="1.5" />
            <text x="94" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">"abr"</text>
            <text x="94" y="90" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">h = 1041</text>

            <line x1="164" y1="78" x2="196" y2="78" stroke="#94a3b8" stroke-width="2" marker-end="url(#sh-r1)" />

            <!-- 滚动公式 -->
            <rect x="200" y="44" width="320" height="68" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="64" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">h' = (h − 1·31²) · 31 + 1</text>
            <text x="360" y="88" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#cffafe">= (1041 − 961)·31 + 1 = 2481</text>

            <line x1="520" y1="78" x2="552" y2="78" stroke="#94a3b8" stroke-width="2" marker-end="url(#sh-r1)" />

            <!-- after 窗口 -->
            <rect x="556" y="52" width="140" height="52" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="626" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">"bra"</text>
            <text x="626" y="90" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">h = 2481</text>

            <text x="24" y="128" font-size="11" font-family="monospace" fill="#64748b">去掉最左字符 ×31²，整体左移 ×31，加上最右字符 → O(1) 而不是重新算 O(L)</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：滚动哈希 —— 窗口右移一格，只需 2 次乘法 + 2 次加减，与窗口长度无关</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          字符串怎么变成数字 —— 进制的思想
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          数字可以直接取模当下标，但字符串不行。字符串转数字的关键灵感来自<strong>进制转换</strong>：
          就像十六进制 <code>"1f"</code> = 1×16 + 15 = 31，我们把字符串看成一个 <strong>P 进制数</strong>，
          每个字符是其中的一位，逐位累加即可。
        </p>
        <div class="mb-4"><Code language="ts" :code="strToNumCode" title="string_to_number.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code>parseInt('1f', 16)</code> 把十六进制字符串转成数字 31 —— 字符串哈希做的是同一件事，只是「进制」是更大的 P（31 或 128）。<br/>
          又像 <code>String.prototype.charCodeAt()</code> 给每个字符一个编号，我们把这些编号按位加权求和。
          </p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          多项式哈希 —— 字符串哈希的标准公式
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          把进制的思想公式化，就得到<strong>多项式哈希（Polynomial Hash）</strong>：
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">h(s) = s[0]·P^(n-1) + s[1]·P^(n-2) + … + s[n-1]·P⁰</p>
          <p class="text-xs text-cyan-600 text-center">P 通常取 31、131、1313 等质数，s[i] 是字符对应的数字</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          这个「从高次到低次」的写法对应从左到右扫描。也可以用 Horner 法写成迭代形式，避免重复计算幂次：
        </p>
        <div class="mb-4"><Code language="ts" :code="polyCode" title="polynomial_hash.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么 P 取 31？</strong>Java 的 <code>String.hashCode()</code> 就用了 <code>31</code>：
          31 是奇质数，乘法可以用「左移 5 位再减自己」（<code>x*31 = (x&lt;&lt;5) - x</code>）优化，既快又能让字符充分「散开」。
          经验上 31 / 131 / 1313 / 13131 都是不错的 P 值。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          滚动哈希 —— 窗口滑动只需 O(1)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          如果我们要算一个长字符串里<strong>每一个长度为 L 的子串</strong>的哈希，朴素做法每个窗口都 O(L) 重算，总复杂度 O(n·L)。
          滚动哈希（Rolling Hash）利用窗口重叠，<strong>从上一个窗口 O(1) 推出下一个窗口</strong>：
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">h' = (h − s[i]·P^(L-1)) · P + s[i+L]</p>
          <p class="text-xs text-cyan-600 text-center">去掉最左字符、整体左移一位（乘 P）、加上最右字符 —— 三步搞定</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="rollCode" title="rolling_hash.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 复杂度跃迁：</strong>算所有长度为 L 的子串哈希，从朴素 <code>O(n·L)</code> 降到 <code>O(n + L)</code>。
          这就是滚动哈希的价值——它让「连续窗口」的哈希计算变成线性的。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          取模防溢出 —— 数字会爆炸
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          多项式累加会让数字<strong>指数级膨胀</strong>：长度 20、P=31 时，哈希值超过 2^97，远超 JS 安全整数上限 2^53。
          解决方法是<strong>每一步都取模</strong>，利用模运算的分配律保证结果正确。
        </p>
        <div class="mb-4"><Code language="ts" :code="modCode" title="modulo_safe.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          1. 忘记取模 → 大字符串直接溢出（JS 中变成 <code>Infinity</code> 或精度丢失）<br/>
          2. 滚动哈希做减法时没转正 → <code>(a - b) % m</code> 可能得到负数，要写 <code>((a - b) % m + m) % m</code><br/>
          3. 用 <code>Math.pow</code> 算大幂次再取模 → 中间结果已经溢出，必须边乘边取模（快速幂）</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          Rabin-Karp 前置知识 —— 字符串匹配的哈希解法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Rabin-Karp 算法用滚动哈希在 <strong>O(n+m)</strong> 时间里找主串中模式串的所有出现位置（朴素暴力是 O(n·m)）。
          它的套路是：算一次模式串哈希 O(m)，主串窗口 O(1) 滚动，哈希相等时再<strong>逐字符二次确认</strong>防止哈希碰撞误判。
        </p>
        <div class="mb-4"><Code language="ts" :code="rabinCode" title="rabin_karp.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Rabin-Karp 的「哈希相等才逐字符比对」就像前端的<strong>内容寻址缓存</strong>：<br/>
          先对比 content hash（O(1)），相同才认为命中——哈希是「快速筛」，逐字符比对是「最终裁决」，两层保险避免碰撞误判。
          </p>
        </aside>
      </section>

      <!-- 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：滚动哈希窗口滑动
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          字符串 <code>"abracadabra"</code>，窗口长度 3，P=31。点「滑动窗口」观察窗口右移时，
          <strong>去掉最左字符 → 乘 P → 加上最右字符</strong> 的 O(1) 更新过程（红色是移出的字符，绿色是移入的字符）。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 字符串长度: {{ cells.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">{{ winLabel }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 滑动 O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @click="doSlide" :disabled="busy || winStart + L >= cells.length"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">滑动窗口 →</button>
          <button @click="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
          <span class="text-xs text-slate-500 ml-auto bg-slate-100 px-2 py-1 rounded-full font-mono min-w-[60px] text-center">{{ status }}</span>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{ x: 16, y: 28, width: W-32, text: hashLabel, fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: C.text }" />
              <v-rect v-for="c in cells" :key="c.id" :config="cellRect(c)" />
              <v-text v-for="c in cells" :key="'ch'+c.id" :config="cellChar(c)" />
              <v-text v-for="c in cells" :key="'cd'+c.id" :config="cellCode(c)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>字符串转数字用「进制」思想</strong>——把字符串看成 P 进制数，逐位累加</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>多项式哈希</strong>：<code>h = s[0]·P^(n-1) + … + s[n-1]</code>，P 取 31/131 等质数</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>滚动哈希</strong>：<code>h' = (h − s[i]·P^(L-1))·P + s[i+L]</code>，窗口滑动 O(1)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>取模防溢出</strong>：每步取模，减法注意转正，幂次用快速幂</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Rabin-Karp</strong> 用滚动哈希做 O(n+m) 字符串匹配，哈希相等再逐字符确认</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-1-hash-func/dsa-3-1-2-methods" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：哈希函数构造方法</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-2-collision/dsa-3-2-1-chaining" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：冲突处理 · 链地址法 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 滚动哈希动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(190), W = ref(700), CW = 40, G = 4
const STR = 'abracadabra'
const L = 3
const P = 31
const codeOf = (ch: string) => ch.charCodeAt(0) - 96   // 'a'=1 … 'z'=26

interface Cell { id: number; ch: string; code: number; color: string; _x?: number }
const cells = reactive<Cell[]>([])
const winStart = ref(0)
const curHash = ref(0)
const busy = ref(false), status = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const winLabel = computed(() => {
  const s = winStart.value
  return `窗口 [${s}, ${s + L - 1}] = "${STR.slice(s, s + L)}"`
})
const hashLabel = computed(() => {
  const s = winStart.value
  const win = cells.slice(s, s + L)
  const terms = win.map((c, i) => `${c.code}·${P}^${L - 1 - i}`).join(' + ')
  return `h("${STR.slice(s, s + L)}") = ${terms} = ${curHash.value}`
})

function winHash(s: number): number {
  let h = 0
  for (let i = 0; i < L; i++) h = h * P + cells[s + i].code
  return h
}
function paint() {
  cells.forEach((c, i) => {
    const inWin = i >= winStart.value && i < winStart.value + L
    c.color = inWin ? C.orange : C.ghost
  })
}
function layout() {
  const total = cells.length*(CW+G)-G
  const sx = Math.max(10, (W.value-total)/2)
  cells.forEach((c, i) => { c._x = sx + i*(CW+G) })
}
function init() {
  cells.length = 0
  for (let i = 0; i < STR.length; i++) cells.push({ id: i, ch: STR[i], code: codeOf(STR[i]), color: C.ghost, _x: 0 })
  winStart.value = 0
  curHash.value = winHash(0)
  paint(); layout()
}
function cellRect(c: any) {
  return { x: c._x, y: 90, width: CW, height: 44, fill: c.color, cornerRadius: 6, stroke: '#94a3b8', strokeWidth: 1 }
}
function cellChar(c: any) {
  return { x: c._x, y: 90, width: CW, height: 44, text: c.ch, fontSize: 18, fontFamily: 'monospace', fontStyle: 'bold', fill: C.text, align: 'center', verticalAlign: 'middle' }
}
function cellCode(c: any) {
  return { x: c._x, y: 138, width: CW, text: String(c.code), fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}
async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

function doSlide() {
  if (winStart.value + L >= cells.length) return
  act('滚动哈希  O(1)', async () => {
    const s = winStart.value
    const old = curHash.value
    const left = cells[s]
    const right = cells[s + L]
    const powL = Math.pow(P, L - 1)   // P^(L-1)

    // 高亮移出/移入的字符
    left.color = C.red; await d(420)
    right.color = C.green; await d(420)

    // O(1) 滚动公式
    const newH = (old - left.code * powL) * P + right.code
    status.value = `h' = (${old} − ${left.code}·${powL})·${P} + ${right.code} = ${newH}`
    winStart.value++
    curHash.value = newH
    paint()
    await d(600)
  })
}
function doReset() { init(); status.value = '' }

let ro: ResizeObserver|null = null
onMounted(() => {
  init()
  if (box.value) { W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== navList =====
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "字符串转数字" },
  { id: "sec-2", name: "多项式哈希" },
  { id: "sec-3", name: "滚动哈希" },
  { id: "sec-4", name: "取模防溢出" },
  { id: "sec-5", name: "Rabin-Karp" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

const strToNumCode = `// ─── 字符串如何转成数字 ───
// 思路一（朴素）：直接把字符拼接成一个大整数
// 'abc' → 97+98+99 拼成 979899 —— 数字随字符串变长而爆炸，不可取

// 思路二（正确）：用「进制」思想，把字符串看成 P 进制数
// 就像 parseInt('1f', 16) = 1*16 + 15 = 31，
// 每个字符是 P 进制的一位，从左到右逐位累加

function strToNumber(s: string, P = 128): number {
    let h = 0
    for (let i = 0; i < s.length; i++) {
        h = h * P + s.charCodeAt(i)   // 左移一位（乘 P）+ 当前字符码
    }
    return h
}

console.log(strToNumber('abc'))
// = 97*128² + 98*128 + 99 = 1601891
//
// 逐步拆解（Horner 法）：
//   h=0
//   h = 0*128 + 97 = 97
//   h = 97*128 + 98 = 12514
//   h = 12514*128 + 99 = 1601891
//
// 关键：不用显式算 P 的幂次，边扫边乘，O(n) 且不会重复计算`

const polyCode = `// ─── 多项式哈希（Polynomial Hash）───
// h(s) = s[0]·P^(n-1) + s[1]·P^(n-2) + ... + s[n-1]·P^0
// 对应从左到右扫描：h = h * P + s[i]（Horner 法）

const P = 31
const codeOf = (ch: string) => ch.charCodeAt(0) - 96   // 'a'→1, 'b'→2, ..., 'z'→26

function polyHash(s: string): number {
    let h = 0
    for (let i = 0; i < s.length; i++) {
        h = h * P + codeOf(s[i])
    }
    return h
}

console.log(polyHash('abc'))
// = 1*31² + 2*31 + 3 = 961 + 62 + 3 = 1026
//
// 为什么这样能「散开」字符串？
// 不同位置的字符被乘上不同的 P 幂次，位置不同权重不同：
//   'ab' = 1*31 + 2 = 33
//   'ba' = 2*31 + 1 = 63   ← 相同字符不同顺序，哈希不同
// 这保证了「顺序敏感」——ab 和 ba 不会被当成同一个 key`

const rollCode = `// ─── 滚动哈希（Rolling Hash）───
// 窗口滑动时不用重算，O(1) 从上一个窗口推出下一个：
//   h' = (h − s[i]·P^(L-1)) · P + s[i+L]

const P = 31
const codeOf = (ch: string) => ch.charCodeAt(0) - 96

function allWindowHashes(s: string, L: number): number[] {
    const n = s.length
    const powL = Math.pow(P, L - 1)   // P^(L-1)，整个滑动过程固定不变

    // 1. 第一个窗口 O(L) 算一次
    let h = 0
    for (let i = 0; i < L; i++) h = h * P + codeOf(s[i])

    const result: number[] = [h]

    // 2. 之后每个窗口 O(1) 滚动
    for (let i = 0; i + L < n; i++) {
        h = (h - codeOf(s[i]) * powL) * P + codeOf(s[i + L])
        result.push(h)
    }
    return result
}

const s = 'abracadabra'
const hashes = allWindowHashes(s, 3)
console.log(hashes)
// [1041, 2481, 17332, 1055, 2918, 1086, 3877, 1041, 2481]
//  ↑"abr" ↑"bra" ...
//
// 复杂度对比：
//   朴素做法：每个窗口重算 O(L)，共 n 个窗口 → O(n·L)
//   滚动哈希：只第一个窗口 O(L)，其余 O(1) → O(n + L)`

const modCode = `// ─── 取模防溢出 ───
// 多项式累加会让数字指数级膨胀：
//   长度 20、P=31 时哈希值超过 2^97，远超 JS 安全整数（2^53）
// 解法：每一步都取模，利用模运算的分配律

const MOD = 1_000_000_007   // 常用大素数（1e9+7）

function modPolyHash(s: string, P = 31, mod = MOD): number {
    let h = 0
    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i) - 96
        h = (h * P + c) % mod      // 每步取模，结果始终 < mod
    }
    return h
}

console.log(modPolyHash('abracadabra'))  // 一个 [0, MOD) 之间的整数

// 模运算的关键性质（保证取模后仍可滚动）：
//   (a + b) % m = ((a % m) + (b % m)) % m
//   (a * b) % m = ((a % m) * (b % m)) % m
//   (a - b) % m = ((a % m) - (b % m) + m) % m   ← 减法要 +m 转正

// 快速幂（边乘边取模，避免中间结果溢出）：
function powMod(base: number, exp: number, mod = MOD): number {
    let r = 1
    base %= mod
    while (exp > 0) {
        if (exp & 1) r = (r * base) % mod
        base = (base * base) % mod
        exp >>= 1
    }
    return r
}
console.log(powMod(31, 20))   // 31^20 mod MOD，中间过程不溢出`

const rabinCode = `// ─── Rabin-Karp 字符串匹配 ───
// 用滚动哈希在 O(n+m) 内找模式串的所有出现位置（暴力是 O(n·m)）

function rabinKarp(text: string, pattern: string): number[] {
    const n = text.length, m = pattern.length
    if (m > n) return []
    const P = 31, MOD = 1_000_000_007
    const codeOf = (ch: string) => ch.charCodeAt(0) - 96

    // 预计算 P^(m-1)
    let powM = 1
    for (let i = 0; i < m - 1; i++) powM = (powM * P) % MOD

    // 模式串哈希 + 主串第一个窗口哈希
    let pH = 0, tH = 0
    for (let i = 0; i < m; i++) {
        pH = (pH * P + codeOf(pattern[i])) % MOD
        tH = (tH * P + codeOf(text[i])) % MOD
    }

    const result: number[] = []
    for (let i = 0; i <= n - m; i++) {
        if (tH === pH) {
            // 哈希相等 → 逐字符二次确认（防碰撞误判）
            if (text.slice(i, i + m) === pattern) result.push(i)
        }
        // O(1) 滚动到下一个窗口
        if (i < n - m) {
            tH = ((tH - codeOf(text[i]) * powM) * P + codeOf(text[i + m])) % MOD
            tH = (tH + MOD) % MOD   // 减法转正
        }
    }
    return result
}

console.log(rabinKarp('abracadabra', 'bra'))   // [1, 8]
console.log(rabinKarp('abracadabra', 'abr'))   // [0, 7]

// 为什么需要「逐字符二次确认」？
// 哈希是压缩映射，不同字符串可能算出相同哈希（碰撞），
// 概率虽小但存在 → 哈希相等只是「候选」，必须逐个字符验真`
</script>
