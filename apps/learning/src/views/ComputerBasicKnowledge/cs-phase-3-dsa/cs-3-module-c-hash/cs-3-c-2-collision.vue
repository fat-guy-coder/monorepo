<template>
  <div class="collision-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4"><h1 class="text-2xl font-bold text-slate-800">🔗 哈希冲突解决</h1><p class="text-sm text-slate-500 mt-1">链地址法 · 开放寻址 · 双重哈希 · 再哈希——两个 key 落到同一个桶怎么办？</p></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>冲突为什么不可避免？鸽巢原理</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">输入空间是<strong>无限的</strong>，哈希表大小是<strong>有限的</strong>。把无限多的鸽子放进有限多的笼子——<strong>至少一个笼子有 ≥2 只鸽子</strong>。这就是鸽巢原理（Pigeonhole Principle）。冲突不是 bug——它是<strong>哈希表设计的核心</strong>。</p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-blue-800"><strong>💡 负载因子（Load Factor）α = n/m</strong>（元素数/桶数）。α 越大冲突概率越高。实测：α=0.5 时冲突概率≈40%，α=0.75 时≈60%，α=0.9 时≈80%。这就是为什么大多数实现 α>0.75 时就<strong>扩容</strong>。</p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>链地址法（Separate Chaining）— Java HashMap 的做法</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">每个桶是一个<strong>链表</strong>（或红黑树）。冲突时追加到链表尾部。查找时遍历链表。Java 的 HashMap 用这个方案——链表长度 &gt;8 时转红黑树（O(n)→O(log n)）。</p>
        <div class="mb-4"><Code language="go" :code="chainCode" title="chaining.go" /></div>
        <div class="overflow-x-auto mb-2"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">操作</th><th class="px-4 py-2 border font-semibold">平均</th><th class="px-4 py-2 border font-semibold">最坏</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">插入</td><td class="px-4 py-2 border">O(1)</td><td class="px-4 py-2 border">O(n)（全冲突）</td></tr><tr><td class="px-4 py-2 border">查找</td><td class="px-4 py-2 border">O(1+α)</td><td class="px-4 py-2 border">O(n)</td></tr></tbody></table></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>开放寻址法（Open Addressing）— Go map 的做法</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">所有元素<strong>直接存在数组里</strong>——没有链表。冲突了就<strong>找下一个空位</strong>。Go 的 map 用这个方法——每个桶存 8 个键值对，溢出通过指针链到额外桶。</p>
        <div class="mb-4"><Code language="go" :code="openCode" title="open_addressing.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 删除是开放寻址的痛点：</strong>不能直接清空——会<strong>断开探测链</strong>，导致后面的元素找不到。必须标记为"已删除"（tombstone/墓碑）。墓碑多了 → 探测变慢 → 需要重哈希（rehash）。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>探测策略：线性 / 平方 / 双重哈希</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">冲突后怎么找下一个位置？三种策略，各有取舍：</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">策略</th><th class="px-4 py-2 border font-semibold">公式</th><th class="px-4 py-2 border font-semibold">优点</th><th class="px-4 py-2 border font-semibold">缺点</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">线性探测</td><td class="px-4 py-2 border font-mono text-xs">h(k,i) = (h1(k)+i) mod m</td><td class="px-4 py-2 border">缓存友好（顺序访问）</td><td class="px-4 py-2 border"><strong>一次聚集</strong>（连续冲突形成长串）</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">平方探测</td><td class="px-4 py-2 border font-mono text-xs">h(k,i) = (h1(k)+i²) mod m</td><td class="px-4 py-2 border">减少一次聚集</td><td class="px-4 py-2 border">二次聚集、可能遍历不全（m 须为质数）</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">双重哈希</td><td class="px-4 py-2 border font-mono text-xs">h(k,i) = (h1(k)+i×h2(k)) mod m</td><td class="px-4 py-2 border"><strong>最均匀</strong>——接近理想随机探测</td><td class="px-4 py-2 border">计算多一次哈希，缓存不友好</td></tr>
        </tbody></table></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 双重哈希为什么最好？</strong>每个 key 有不同的步长（h2(k) 不同），不会形成"所有冲突 key 走同一条探测路径"的聚集。Python dict、Go map 内部的 overflow bucket 链本质上也是一种变体——通过不同的溢出桶来减少聚集。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>再哈希（Rehashing）— 什么时候扩容？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">当负载因子 α 超过阈值（通常 0.75），<strong>分配更大的数组 → 所有 key 重新哈希 → 搬过去</strong>。这是 O(n) 操作——但均摊下来每次插入仍是 O(1)。Go map 的扩容是<strong>渐进式</strong>的——不是一次性搬完，而是<strong>每次访问时搬一点</strong>（evacuate），避免单次操作卡顿。</p>
        <div class="mb-4"><Code language="go" :code="rehashCode" title="rehash.go" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>链地址法</strong>（Java）——桶+链表，超过阈值转红黑树。内存额外开销但实现简单</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>开放寻址</strong>（Go）——所有数据在数组里。删除用墓碑标记。缓存友好</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>双重哈希 = 最均匀</strong>的探测策略——每个 key 不同步长，避免聚集</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>α &gt; 0.75 触发扩容</strong>——Go 渐进式 rehash，Java/Redis 一次性搬完</span></li></ul></section>
    </main>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'
const navList = [{id:"sec-1",name:"鸽巢原理"},{id:"sec-2",name:"链地址法"},{id:"sec-3",name:"开放寻址"},{id:"sec-4",name:"探测策略"},{id:"sec-5",name:"再哈希扩容"},{id:"sec-6",name:"小结"}]
const chainCode = `// 链地址法哈希表
type Entry struct{ Key string; Value int; Next *Entry }
type HashMap struct{ buckets []*Entry; size int }

func (m *HashMap) hash(key string) int {
    h := 0
    for _, c := range key { h = h*31 + int(c) }
    return h % len(m.buckets)
}
func (m *HashMap) Put(key string, val int) {
    idx := m.hash(key)
    e := &Entry{Key: key, Value: val, Next: m.buckets[idx]}
    m.buckets[idx] = e  // 头插法——O(1)
    m.size++
    // 输出: key="foo" → buckets[hash("foo")] → Entry{foo, val} → ...
}`
const openCode = `// 开放寻址哈希表（线性探测）
type Slot struct{ Key string; Value int; Occupied bool; Deleted bool }
type OpenHashMap struct{ slots []Slot; size int }

func (m *OpenHashMap) Put(key string, val int) {
    idx := m.hash(key); start := idx
    for m.slots[idx].Occupied {
        if m.slots[idx].Key == key { m.slots[idx].Value = val; return } // 更新
        idx = (idx + 1) % len(m.slots)  // 线性探测——找下一个空位
        if idx == start { panic("table full") }
    }
    m.slots[idx] = Slot{Key: key, Value: val, Occupied: true}
    m.size++
    // 输出: key="foo" 冲突 → 探测 (idx+1), (idx+2)... 直到空位
}
func (m *OpenHashMap) Delete(key string) {
    idx := m.hash(key); start := idx
    for m.slots[idx].Occupied {
        if m.slots[idx].Key == key {
            m.slots[idx].Occupied = false
            m.slots[idx].Deleted = true   // ⚠️ 墓碑——不能清空！
            m.size--; return
        }
        idx = (idx + 1) % len(m.slots)
        if idx == start { return }
    }
}`
const rehashCode = `// 扩容——所有 key 重新哈希
func (m *OpenHashMap) rehash() {
    oldSlots := m.slots
    m.slots = make([]Slot, len(oldSlots)*2) // 容量翻倍
    m.size = 0
    for _, s := range oldSlots {
        if s.Occupied && !s.Deleted { m.Put(s.Key, s.Value) }
    }
    // 输出: 所有 key 重新 Put——hash 到新的更大的数组
    // 每个 key 的 O(1) 均摊——虽然单次 rehash 是 O(n)
}
// Go map: 渐进式 rehash——每次访问时搬一两个桶，避免单次卡顿`
</script>
