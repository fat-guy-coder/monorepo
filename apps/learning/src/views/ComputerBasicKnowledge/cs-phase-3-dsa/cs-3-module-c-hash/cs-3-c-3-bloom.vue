<template>
  <div class="bloom-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4"><h1 class="text-2xl font-bold text-slate-800">🌸 布隆过滤器（Bloom Filter）</h1><p class="text-sm text-slate-500 mt-1">用少量内存判断"一个元素是否可能存在"——空间换精度的高效数据结构</p></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Bloom Filter 解决的问题——用极少内存判"可能存在"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你要判断一个 URL 是否被爬过、一个用户名是否被注册过、一个 IP 是否在黑名单里。如果存到 HashMap 里——1 亿个 URL × (64 字节每条目) = <strong>6.4GB 内存</strong>。Bloom Filter 用 <strong>1 亿 bit ≈ 12MB</strong> 就能做同样的事——代价是<strong>有一定误报率</strong>（把"不在"判断为"可能在"）。</p>
        <div class="bg-slate-900 text-green-400 rounded-xl p-4 mb-4 font-mono text-sm text-center">
          布隆过滤器的回答：<br/>
          · "不存在" → <strong>100% 确定不存在</strong>（无假阴性）<br/>
          · "可能存在" → <strong>可能误报</strong>（有假阳性，可控概率）<br/>
          这叫做 <strong>概率型数据结构</strong>——用正确率换空间。
        </div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>核心原理——K 个哈希函数 + 一个 Bitmap</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">就是一个<strong>超大的 Bitmap</strong>（初始全 0）+ <strong>K 个独立的哈希函数</strong>。插入时把 K 个哈希值对应的 bit 置 1。查询时检查 K 个 bit 是否<strong>全部为 1</strong>——都是 1 说明"可能存在"，任意一个是 0 就"绝对不存在"。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>插入 "hello"</strong> → hash1("hello")=3, hash2("hello")=7, hash3("hello")=11 → 把 bit[3], bit[7], bit[11] 置 1。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>查询 "world"</strong> → hash1("world")=5, hash2("world")=7, hash3("world")=13 → bit[5]=0 → <strong>"world 绝对不存在"</strong>。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>查询 "hello"</strong> → bit[3]=1, bit[7]=1, bit[11]=1 全为 1 → <strong>"hello 可能存在"</strong>（可能在，也可能是其他 key 把这几个 bit 也置了 1——这就是假阳性）。</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="bloomCode" title="bloom_filter.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>数学——误报率怎么算？K 和 m 怎么选？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Bloom Filter 的误报率由三个参数决定：<strong>bit 数组大小 m</strong>、<strong>哈希函数个数 K</strong>、<strong>插入元素个数 n</strong>。</p>
        <div class="bg-slate-900 text-green-400 rounded-xl p-4 mb-4 font-mono text-sm">
          插入 n 个元素后，某个 bit 仍是 0 的概率：<br/>
          p₀ = (1 - 1/m)^(Kn) ≈ e^(-Kn/m)<br/><br/>
          查询时 K 个 bit 全为 1 的概率（误报率）：<br/>
          ε = (1 - p₀)^K ≈ (1 - e^(-Kn/m))^K<br/><br/>
          <strong>最优 K</strong>：使误报率最小 → K = (m/n) × ln(2) ≈ 0.693 × m/n<br/>
          <strong>最优 m/n</strong>（bits per element）→ 由目标误报率 ε 反推
        </div>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">目标误报率 ε</th><th class="px-4 py-2 border font-semibold">最优 K</th><th class="px-4 py-2 border font-semibold">m/n (bits per element)</th><th class="px-4 py-2 border font-semibold">1 亿 元素 所需内存</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">1%</td><td class="px-4 py-2 border">7</td><td class="px-4 py-2 border">~10 bits</td><td class="px-4 py-2 border">~120 MB</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">0.1%</td><td class="px-4 py-2 border">10</td><td class="px-4 py-2 border">~14 bits</td><td class="px-4 py-2 border">~175 MB</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">0.01%</td><td class="px-4 py-2 border">13</td><td class="px-4 py-2 border">~19 bits</td><td class="px-4 py-2 border">~240 MB</td></tr>
        </tbody></table></div>
        <p class="text-slate-600 text-sm">对比 HashMap：1 亿元素 ≈ <strong>6.4GB</strong>。Bloom Filter ε=0.1%：<strong>175MB</strong>——省了 <strong>97%</strong> 内存。</p>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>变种：计数布隆（Counting Bloom）— 支持删除</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">标准 Bloom Filter <strong>不支持删除</strong>——把一个 bit 从 1 改 0 会影响其他 key。计数布隆把每个 slot 从 1 bit 扩展为<strong>一个计数器</strong>（通常 4 bit）。插入 +1，删除 -1。计数器溢出怎么办？4 bit 计数器最大 15——概率极低（需要 16 个不同 key 把同一个 slot 映射到 15 才溢出）。</p>
        <div class="mb-4"><Code language="go" :code="countBloomCode" title="counting_bloom.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>实际应用场景</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div class="bg-slate-50 rounded-xl p-3 border border-slate-200"><strong>🌐 Chrome 恶意 URL 检测</strong><p class="text-slate-500 mt-1">Google Safe Browsing 用 Bloom Filter 在本地判断 URL 是否在恶意列表中——不需要每次请求都查云端。误报的 URL 才去云端确认。</p></div>
          <div class="bg-slate-50 rounded-xl p-3 border border-slate-200"><strong>🗄️ LevelDB/RocksDB</strong><p class="text-slate-500 mt-1">SSTable 文件内嵌 Bloom Filter——查询 key 时先过 BF，大部分"不存在"的查询直接跳过磁盘 I/O。</p></div>
          <div class="bg-slate-50 rounded-xl p-3 border border-slate-200"><strong>🕷️ 爬虫 URL 去重</strong><p class="text-slate-500 mt-1">爬了几十亿 URL，用 HashSet 存不下。Bloom Filter 判重——~1% 误报意味着错过约 1% 页面，可以接受。</p></div>
          <div class="bg-slate-50 rounded-xl p-3 border border-slate-200"><strong>💾 Redis Bloom 模块</strong><p class="text-slate-500 mt-1">RedisBloom 提供 BF 命令——BF.ADD/BF.EXISTS，用极省内存做缓存穿透防护。</p></div>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Bloom Filter = K 个哈希 + 1 个 Bitmap</strong>——空间换精度。查"绝对不存在"100% 准确，"可能存在"有 ε 误报</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>最优 K = 0.693×m/n</strong>，1 亿元素 ε=1% 只需 120MB（vs HashMap 6.4GB）</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>标准 BF 不支持删除</strong>→ 计数布隆用 4 bit counter 替代 1 bit</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>应用：Chrome 安全浏览、RocksDB 读加速、爬虫去重、Redis Bloom</span></li></ul></section>
    </main>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'
const navList = [{id:"sec-1",name:"解决问题"},{id:"sec-2",name:"核心原理"},{id:"sec-3",name:"数学公式"},{id:"sec-4",name:"计数布隆"},{id:"sec-5",name:"应用场景"},{id:"sec-6",name:"小结"}]
const bloomCode = `// 布隆过滤器——K 个哈希函数 + Bitmap
type BloomFilter struct {
    bits []uint64       // bit 数组用 uint64 切片实现
    size uint64         // 总 bit 数
    k    int            // 哈希函数个数
}
func NewBloomFilter(expectedItems int, falsePositiveRate float64) *BloomFilter {
    m := uint64(-float64(expectedItems) * math.Log(falsePositiveRate) / (math.Ln2*math.Ln2))
    k := int(float64(m) / float64(expectedItems) * math.Ln2)
    return &BloomFilter{bits: make([]uint64, (m+63)/64), size: m, k: k}
}
// 对 key 用 K 个哈希——每个基于不同的 seed
func (bf *BloomFilter) hashPositions(key []byte) []uint64 {
    h1, h2 := fnv1aSeed(key, 0), fnv1aSeed(key, 1)  // 两个哈希
    pos := make([]uint64, bf.k)
    for i := 0; i < bf.k; i++ {
        pos[i] = (h1 + uint64(i)*h2) % bf.size  // 双哈希技巧生成 K 个位置
    }
    return pos
}
func (bf *BloomFilter) Add(key []byte) {
    for _, p := range bf.hashPositions(key) {
        bf.bits[p/64] |= 1 << (p % 64)  // 置 bit[p] = 1
    }
}
func (bf *BloomFilter) MayExist(key []byte) bool {
    for _, p := range bf.hashPositions(key) {
        if bf.bits[p/64]&(1<<(p%64)) == 0 { return false }  // 任意 0 → 绝对不存在
    }
    return true  // 全 1 → 可能存在（有 ε 误报）
    // 输出: Add("hello") → bits[3]=1, bits[7]=1, bits[11]=1
    // 输出: MayExist("hello") → 全 1 → true（可能）
    // 输出: MayExist("world") → bit[5]=0 → false（绝对不存在）
}`
const countBloomCode = `// 计数布隆——每个 slot 是 4-bit 计数器，支持删除
type CountingBloom struct {
    counters []uint8  // 每个 uint8 存 2 个 4-bit 计数器
    size     int
    k        int
}
func (cb *CountingBloom) Add(key []byte) {
    for _, p := range cb.hashPositions(key) {
        c := cb.getCounter(p)
        if c < 15 { cb.setCounter(p, c+1) }  // 防溢出
    }
}
func (cb *CountingBloom) Remove(key []byte) {
    for _, p := range cb.hashPositions(key) {
        c := cb.getCounter(p)
        if c > 0 { cb.setCounter(p, c-1) }   // 减 1（不会影响其他 key）
    }
}
// 内存对比：1 亿元素标准 BF ≈ 120MB，计数 BF（4-bit）≈ 480MB
// 仍远小于 HashMap 的 ~6.4GB`
</script>
