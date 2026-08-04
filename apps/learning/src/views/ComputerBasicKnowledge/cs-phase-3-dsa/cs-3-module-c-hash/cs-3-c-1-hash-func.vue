<template>
  <div class="hash-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4"><h1 class="text-2xl font-bold text-slate-800">🔢 哈希函数的设计原理</h1><p class="text-sm text-slate-500 mt-1">从取模到乘法到加密级——如何把任意数据映射到一个固定范围的整数</p></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 本质 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>哈希函数的本质——把无限映射到有限</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">哈希函数就是一个<strong>压缩映射</strong>：输入任意长度的数据，输出固定长度的"摘要"（digest）。数学上就是把<strong>无限大的输入空间</strong>映射到<strong>有限的输出空间</strong>（如 0~N-1）。</p>
        <div class="bg-slate-900 text-green-400 rounded-xl p-4 mb-4 font-mono text-sm text-center">
          hash(input) → 0..N-1 之间的一个整数<br/>
          同一个 input 永远映射到同一个整数（确定性）<br/>
          不同 input 可能映射到同一个整数（碰撞——不可避免！）
        </div>
        <p class="text-slate-600 leading-relaxed text-sm">好的哈希函数追求<strong>三个目标</strong>：① <strong>均匀分布</strong>——输出在 [0, N-1] 上均匀分布，避免聚集；② <strong>雪崩效应</strong>——输入改 1 bit，输出至少一半 bit 变化；③ <strong>计算快速</strong>——O(1) 时间内算出。</p>
      </section>

      <!-- 2. 取模法 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>最基础的哈希：取模法（Division Method）</h2>
        <div class="bg-slate-900 text-green-400 rounded-xl p-4 mb-4 font-mono text-sm text-center">h(k) = k mod m</div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">把 key 转换成整数，模表大小 m。简单到极致——也是你见过的<strong>所有 HashMap/Hashtable 的内部做法</strong>。但有一个致命陷阱：<strong>m 不能随便选</strong>。</p>
        <h3 class="text-md font-semibold text-slate-700 mb-2">为什么 m 最好选质数？</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">如果 m = 2^n（如 256），k mod 256 只取 k 的低 8 位——高位信息全丢了。如果 key 的低位有规律（如全是偶数），分布就极不均匀。质数 m 不与任何进制对齐，能更好地"打散"key。Go 的 map 内部用的就是这种取模法，但桶数 B 是 2 的幂次，所以取模变成了高效的位运算 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">k & (m-1)</code>。</p>
        <div class="mb-4"><Code language="go" :code="modCode" title="mod_hash.go" /></div>
      </section>

      <!-- 3. 乘法哈希 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>乘法哈希（Multiplication Method）— 黄金比例的魔力</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">取模法依赖 m 是质数，但很多时候 m 必须是 2 的幂（位运算加速）。乘法哈希解决了这个矛盾：</p>
        <div class="bg-slate-900 text-green-400 rounded-xl p-4 mb-4 font-mono text-sm text-center">
          ① 选一个常数 A（通常在 0~1 之间）<br/>
          ② h(k) = ⌊ m × ( (k×A) mod 1 ) ⌋<br/>
          含义：k×A 取小数部分 × m 取整
        </div>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm"><strong>为什么 A 推荐取黄金比例的倒数？</strong> (√5-1)/2 ≈ 0.6180339887... 这个数是"最无理"的无理数——它的连分数展开收敛最慢。用它做乘法，小数部分最"随机"，分布最均匀。Knuth 在《计算机程序设计艺术》中论证了这个选择。</p>
        <div class="mb-4"><Code language="go" :code="multiCode" title="multiplication_hash.go" /></div>
      </section>

      <!-- 4. 字符串哈希 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>字符串怎么哈希？多项式滚动哈希</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">字符串不能直接取模——需要先转换成一个整数。最经典的做法是<strong>多项式哈希</strong>：把每个字符当作多项式的一个系数，在某个进制下求值。</p>
        <div class="bg-slate-900 text-green-400 rounded-xl p-4 mb-4 font-mono text-sm text-center">
          hash("abc") = ('a' × P² + 'b' × P + 'c') mod M<br/>
          P = 质数基数（如 31、131）<br/>
          M = 模数（如 10⁹+7）
        </div>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm"><strong>为什么 Java String.hashCode() 用 P=31？</strong> 31 是质数，且 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">31×x = (x&lt;&lt;5) - x</code>（可以用移位+减法替代乘法，快）。</p>
        <div class="mb-4"><Code language="go" :code="strCode" title="string_hash.go" /></div>
      </section>

      <!-- 5. 高级哈希 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>生产级哈希：SipHash / FNV / MurmurHash</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">实际系统中用的哈希函数远比取模复杂。Go 的 map 内部用 <strong>SipHash</strong>（带随机种子——防止哈希碰撞攻击），Redis 用 <strong>MurmurHash</strong>，Memcached 用 <strong>FNV</strong>。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">算法</th><th class="px-4 py-2 border font-semibold">特点</th><th class="px-4 py-2 border font-semibold">用途</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">SipHash</td><td class="px-4 py-2 border">带密钥的伪随机函数，抗哈希碰撞攻击</td><td class="px-4 py-2 border">Go map、Redis、Bloom filter</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">MurmurHash3</td><td class="px-4 py-2 border">极快，非加密，分布优秀</td><td class="px-4 py-2 border">Redis、Cassandra、Hadoop</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">FNV-1a</td><td class="px-4 py-2 border">简单到十几行代码，但分布优秀</td><td class="px-4 py-2 border">Memcached、DNS、Bloom filter</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">SHA-256</td><td class="px-4 py-2 border"><strong>加密级</strong>——逆向不可能，碰撞计算上不可行</td><td class="px-4 py-2 border">密码存储、Git commit ID、区块链</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">XXHash</td><td class="px-4 py-2 border">目前最快的非加密哈希之一</td><td class="px-4 py-2 border">大文件校验、数据去重</td></tr>
        </tbody></table></div>
        <div class="mb-4"><Code language="go" :code="fnvCode" title="fnv_hash.go" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>哈希 = 无限→有限的确定性压缩映射，碰撞在数学上不可避免</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>取模法最简单——但 m 要选质数；m=2^n 时用位运算替代（Go map 的做法）</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>乘法哈希用黄金比例常数——可配合 m=2^n，分布均匀</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>字符串用多项式哈希（P=31/131），生产用 SipHash/MurmurHash</span></li></ul></section>
    </main>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'
const navList = [{id:"sec-1",name:"本质"},{id:"sec-2",name:"取模法"},{id:"sec-3",name:"乘法哈希"},{id:"sec-4",name:"字符串哈希"},{id:"sec-5",name:"生产级哈希"},{id:"sec-6",name:"小结"}]
const modCode = `// 取模法哈希表
type HashTable struct {
    buckets [][]entry  // 链地址法
    size    int
}
func (h *HashTable) hash(key string) int {
    hval := 0
    for _, c := range key { hval = hval*31 + int(c) }  // Java 风格多项式哈希
    return hval % h.size  // 取模落到桶内
    // 输出: key="foo" → hash("foo") mod size = X
}`
const multiCode = `// 乘法哈希——黄金比例常数
func mulHash(k uint64, m uint64) uint64 {
    // A = (√5-1)/2 × 2^64 ≈ 11400714819323198485
    const A uint64 = 11400714819323198485
    // 计算 k×A 的高位（等价于取 k×A 小数部分×m 的效果）
    return uint64((uint64(k) * A) >> (64 - uint64(m)))
    // 输出: k=42, m=8 → h ≈ 5（0~7 之间均匀分布）
}

// 乘法哈希的优点：不需要 m 是质数，m=2^n 时只需取高位
// 这就是为什么 Go map 的桶数始终是 2 的幂次`
const strCode = `// 多项式滚动哈希——支持 O(1) 计算子串哈希
func polyHash(s string, base, mod int64) int64 {
    var h int64 = 0
    for _, c := range s {
        h = (h*base + int64(c)) % mod
    }
    return h
}
// 滚动哈希：已知 "abc" 的哈希，求 "bcd" 不需要重新算全部字符
// h_new = ((h_old - 'a'×base^(n-1)) × base + 'd') % mod
// 应用：Rabin-Karp 字符串匹配 O(n+m)，子串判重

s := "abcde"
h := polyHash(s, 131, 1e9+7)
// 输出: h = (('a'×131^4 + 'b'×131^3 + ...) mod 1e9+7)`
const fnvCode = `// FNV-1a 哈希——仅十行，分布却极好
func fnv1a(data []byte) uint64 {
    const (
        offset uint64 = 14695981039346656037  // FNV offset basis
        prime  uint64 = 1099511628211         // FNV prime
    )
    hash := offset
    for _, b := range data {
        hash ^= uint64(b)  // XOR 当前字节
        hash *= prime      // 乘以大质数——雪崩效应！
    }
    return hash
    // 输出: data="hello" → hash=11831194018420276437
}
// 为什么 XOR + 乘法？XOR 引入字节信息，乘法打散到整个 64-bit 空间
// 这就是"雪崩效应"的实现——输入改 1 bit，输出天翻地覆`
</script>
