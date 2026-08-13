<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧭 开放寻址法（Open Addressing）：冲突就往旁边挤</h1>
          <p class="text-sm text-slate-500 mt-1">线性探测 / 二次探测 / 双重散列——所有元素都住在同一个数组里</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 3-2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：开放寻址法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          开放寻址法<strong>不挂链表</strong>，所有元素直接住在同一个数组里。发生冲突时，按探测序列<strong>在数组内部找下一个空槽</strong>写入。
          下图演示线性探测：插入 24（24%8=0）时，槽 0、1、2 已满，沿箭头向右探测，最终写入空槽 3。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="oa-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">插入 24：hash(24)=0 → 槽0 冲突 → 槽1 冲突 → 槽2 冲突 → 槽3 空，写入</text>

            <!-- 探测路径箭头 -->
            <line x1="72" y1="70" x2="146" y2="70" stroke="#f59e0b" stroke-width="2" marker-end="url(#oa-arr)" />
            <line x1="160" y1="70" x2="232" y2="70" stroke="#f59e0b" stroke-width="2" marker-end="url(#oa-arr)" />
            <line x1="246" y1="70" x2="318" y2="70" stroke="#f59e0b" stroke-width="2" marker-end="url(#oa-arr)" />
            <text x="109" y="60" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706">冲突</text>
            <text x="195" y="60" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706">冲突</text>
            <text x="281" y="60" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706">冲突</text>

            <!-- 槽 0 -->
            <rect x="20" y="100" width="78" height="48" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="59" y="124" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">32</text>
            <!-- 槽 1 -->
            <rect x="106" y="100" width="78" height="48" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="145" y="124" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">41</text>
            <!-- 槽 2 -->
            <rect x="192" y="100" width="78" height="48" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="231" y="124" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">12</text>
            <!-- 槽 3（写入目标） -->
            <rect x="278" y="100" width="78" height="48" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="317" y="124" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">24</text>
            <!-- 槽 4 -->
            <rect x="364" y="100" width="78" height="48" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="403" y="124" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <!-- 槽 5（空） -->
            <rect x="450" y="100" width="78" height="48" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <!-- 槽 6 -->
            <rect x="536" y="100" width="78" height="48" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="575" y="124" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">15</text>
            <!-- 槽 7（空） -->
            <rect x="622" y="100" width="78" height="48" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />

            <text x="59" y="162" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[0]</text>
            <text x="145" y="162" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[1]</text>
            <text x="231" y="162" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[2]</text>
            <text x="317" y="162" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">[3]</text>
            <text x="403" y="162" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[4]</text>
            <text x="489" y="162" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[5]</text>
            <text x="575" y="162" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[6]</text>
            <text x="661" y="162" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[7]</text>

            <text x="16" y="196" font-size="11" font-family="monospace" fill="#0891b2">探测序列：i, i+1, i+2, i+3 …（线性探测，到达末尾回绕到 0）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：线性探测——冲突后向右逐个探测空槽，写入第一个空位（绿色）</figcaption>
        </figure>

        <!-- 操作示意图：墓碑删除 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：删除 —— 用墓碑标记（lazy deletion），不能直接清空</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">删除 12 之前</p>
            <svg viewBox="0 0 320 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="30" width="60" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="50" y="52" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">12</text>
              <rect x="92" y="30" width="60" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="122" y="52" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">22</text>
              <rect x="164" y="30" width="60" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="194" y="52" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <text x="50" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[2]</text>
              <text x="122" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>
              <text x="194" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[4]</text>
              <text x="250" y="52" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">删除 12</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">删除后：槽[2] 变成墓碑 ✗</p>
            <svg viewBox="0 0 320 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="30" width="60" height="44" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="50" y="52" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ef4444">✗</text>
              <rect x="92" y="30" width="60" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="122" y="52" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">22</text>
              <rect x="164" y="30" width="60" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="194" y="52" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <text x="50" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#ef4444">墓碑</text>
              <text x="122" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>
              <text x="194" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[4]</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">墓碑 ≠ 空槽：查找 22 时仍要穿过 ✗ 继续探测，插入时可复用 ✗ 的位置</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 开放寻址思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          开放寻址的思想：冲突时就近找空位
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          与链地址法不同，开放寻址法的所有元素都<strong>直接存在数组里</strong>，一个槽只存一个元素。
          当目标槽被占用时，就按照一个固定的<strong>探测序列（Probe Sequence）</strong>在数组内部寻找下一个空槽。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>开放寻址的三大要点：</strong></p>
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span><strong>负载因子必须 &lt; 1</strong>——数组槽有限，元素不能超过槽数</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span><strong>探测序列</strong>——冲突后按什么顺序找下一个槽（线性/二次/双重）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span><strong>删除要用墓碑</strong>——不能直接清空，否则会切断探测链</span></li>
          </ol>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          开放寻址就像<strong>停车场找车位</strong>——你的固定车位（hash）被占了，就往旁边找下一个空位停。<br/>
          链地址法则是<strong>共享车位</strong>：一个车位可以停多辆车（用升降机叠起来）。<br/>
          停车场类比还能解释「墓碑」：一个车位虽然空出来（车开走了），但要放个锥桶标记「此位暂时留空」，防止后来的人误判。
          </p>
        </aside>
      </section>

      <!-- 2. 线性探测 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          线性探测（Linear Probing）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          线性探测是最简单的探测序列：冲突后<strong>每次向后走一格</strong>，即 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i, i+1, i+2, i+3, …</code>（到达末尾回绕到 0）。
          它实现简单、缓存友好，但有一个致命缺陷——<strong>主聚集（Primary Clustering）</strong>。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">h(k, p) = (hash(k) + p) mod m &nbsp;&nbsp; (p = 0, 1, 2, …)</p>
          <p class="text-xs text-cyan-600 text-center">线性探测：探测步长固定为 1，逐格向右找空槽</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="codeLinear" title="linear_probing.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 直观理解：</strong>线性探测的好处是「局部性好」——连续的内存被连续访问，CPU 缓存命中率高。Python 的 <code>dict</code>、V8 的 Map 底层都用了类似线性探测的变体。</p>
        </aside>
      </section>

      <!-- 3. 二次探测 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          二次探测（Quadratic Probing）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          二次探测的步长<strong>按平方增长</strong>：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i, i+1, i+4, i+9, i+16, …</code>。
          它跳得更远，能缓解线性探测的<strong>主聚集</strong>，但会引入新的问题——<strong>次聚集（Secondary Clustering）</strong>和可能探不到某些槽。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">h(k, p) = (hash(k) + p²) mod m</p>
          <p class="text-xs text-cyan-600 text-center">二次探测：步长 1, 4, 9, 16…（p²）</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="codeQuadratic" title="quadratic_probing.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 二次探测的坑：</strong>当表长 m 不是质数、或负载因子过高时，二次探测<strong>可能永远探不到某些空槽</strong>（探测序列成环）。
          工程上通常要求：<strong>表长 m 取质数 + 负载因子 &lt; 0.5</strong>，才能保证至少一半的槽能被访问到。</p>
        </aside>
      </section>

      <!-- 4. 双重散列 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          双重散列（Double Hashing）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          双重散列用<strong>第二个哈希函数</strong>决定探测步长，让不同键的探测序列各不相同，几乎完全消除聚集。
          步长 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">step = hash2(k)</code> 必须与表长 m <strong>互质</strong>（通常取 step 为奇数、m 为质数），才能覆盖所有槽。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">h(k, p) = (hash1(k) + p × hash2(k)) mod m</p>
          <p class="text-xs text-cyan-600 text-center">双重散列：步长由第二个哈希函数决定，每个键的探测路径都不同</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="codeDouble" title="double_hashing.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          三种探测策略就像三种「重试退避」策略：<br/>
          • 线性探测 = 固定步长重试（像 <code>setInterval</code> 定时轮询）<br/>
          • 二次探测 = 指数退避（像 <code>fetch</code> 失败后 1s→4s→9s 重试）<br/>
          • 双重散列 = 每个请求用不同的退避种子（像为每个请求随机化退避区间，避免「惊群」）
          </p>
        </aside>
      </section>

      <!-- 5. 墓碑删除 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          删除的墓碑标记（Lazy Deletion）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          开放寻址法的删除非常棘手：<strong>不能直接把槽清空</strong>。因为探测链会经过被删的槽——如果清空它，查找时遇到空槽就会<strong>误判「元素不存在」</strong>，提前终止探测。
          正确做法是打上<strong>墓碑（Tombstone）</strong>标记：这个槽「曾经有元素、现在删除」，查找时继续穿过它，插入时可复用它的位置。
        </p>
        <div class="mb-4"><Code language="ts" :code="codeTombstone" title="tombstone_delete.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          1. <strong>删除后直接清空槽</strong>——导致后面的元素「失联」，查找误判为不存在。<br/>
          2. <strong>忘记墓碑的复用</strong>——插入时遇到墓碑应该直接复用，而不是跳过它继续探测。<br/>
          3. <strong>墓碑堆积</strong>——大量删除后墓碑越来越多，查找性能下降，需要定期「重建表」清掉墓碑。
          </p>
        </aside>
      </section>

      <!-- 6. 主聚集/次聚集 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          主聚集与次聚集问题
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          聚集（Clustering）是开放寻址法性能退化的根源。<strong>主聚集</strong>是线性探测的顽疾，<strong>次聚集</strong>是二次探测/双重散列仍可能遇到的问题。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">问题</th><th class="px-4 py-2 border border-slate-200 font-semibold">成因</th><th class="px-4 py-2 border border-slate-200 font-semibold">影响</th><th class="px-4 py-2 border border-slate-200 font-semibold">对策</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-medium">主聚集</td><td class="px-4 py-2 border">多个键的探测序列完全重叠（线性探测步长都=1）</td><td class="px-4 py-2 border">连续槽越聚越长，探测越来越慢</td><td class="px-4 py-2 border">二次探测 / 双重散列</td></tr>
              <tr><td class="px-4 py-2 border font-medium">次聚集</td><td class="px-4 py-2 border">初始 hash 相同的键，探测序列也相同</td><td class="px-4 py-2 border">同哈希的键仍扎堆</td><td class="px-4 py-2 border">双重散列（步长依赖键本身）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话总结：</strong>主聚集是「所有人走同一条路」，次聚集是「起点相同的人走同一条路」。双重散列让「每个人走不同的路」，但实现成本最高。<br/>
          下一篇的 <strong>Robin Hood 哈希</strong>提供了一条新思路：不躲避聚集，而是<strong>把聚集变均匀</strong>。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：线性探测插入 / 查找 / 删除
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          观察线性探测：插入时 hash 定位 → 冲突 → 向右探测空槽 → 写入；删除用<strong>墓碑 ✗</strong>标记。哈希函数固定为 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">hash(v) = v % 10</code>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 元素 n: {{ filledCount }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📐 容量 m: {{ M }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ α = n/m = {{ loadFactor.toFixed(2) }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doInsert" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">插入</button>
          <button @mousedown="doSearch" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">查找</button>
          <button @mousedown="doDelete" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">删除</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="s in slots" :key="s.id" :config="slotCfg(s)" />
              <v-text v-for="s in slots" :key="'t'+s.id" :config="slotTextCfg(s)" />
              <v-text v-for="(s,i) in slots" :key="'i'+s.id" :config="slotIdxCfg(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>开放寻址</strong>：所有元素存在数组里，冲突时按探测序列就近找空槽</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>线性探测</strong>（步长 1）简单缓存友好，但有主聚集问题</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>二次探测</strong>（步长 p²）缓解主聚集，但可能有次聚集和探不到槽的问题</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>双重散列</strong>（第二个哈希决定步长）几乎消除聚集，性能最好</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>删除必须用墓碑</strong>，不能直接清空，否则切断探测链</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>负载因子必须 &lt; 1</strong>，且越接近 1 性能越差</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-2-collision/dsa-3-2-1-chaining" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：链地址法</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-2-collision/dsa-3-2-3-robin-hood" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：Robin Hood 哈希 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 开放寻址动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(200), W = ref(700)
const M = 10                    // 容量（槽数量）
const BOXH = 54, GAP = 8        // 槽高、槽间距
const BOXY = 70                 // 槽顶部

interface Slot { id: number; val: number | null; tomb: boolean; color: string; s?: number; _x?: number; _w?: number }
const slots = reactive<Slot[]>([])
const busy = ref(false), status = ref(''), nid = ref(100)
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const hashOf = (v: number) => ((v % M) + M) % M
const filledCount = computed(() => slots.filter(s => s.val !== null).length)
const loadFactor = computed(() => filledCount.value / M)

function baseColor(s: Slot) {
  return s.val !== null ? C.cyan : (s.tomb ? '#cbd5e1' : C.ghost)
}

function layout() {
  const bw = Math.min(58, Math.floor((W.value - 20) / M - GAP))
  const total = M * (bw + GAP) - GAP
  const sx = Math.max(10, (W.value - total) / 2)
  slots.forEach((s, i) => { s._x = sx + i * (bw + GAP); s._w = bw })
}

function rawInsert(v: number) {
  let i = hashOf(v)
  for (let k = 0; k < M; k++) {
    const cur = (i + k) % M
    if (!slots[cur].val) { slots[cur].val = v; slots[cur].tomb = false; slots[cur].color = C.cyan; return }
  }
}

function init() {
  slots.length = 0
  for (let i = 0; i < M; i++) slots.push({ id: nid.value++, val: null, tomb: false, color: C.ghost, s: 1 })
  ;[12, 22, 5, 15, 27].forEach(v => rawInsert(v))
  layout()
  status.value = ''
}

function resetColors() { slots.forEach(s => { s.color = baseColor(s); s.s = 1 }) }

function slotCfg(s: Slot) {
  const sc = s.s ?? 1
  const w = (s._w || 50) * sc
  const isEmpty = s.val === null && !s.tomb
  const cfg: any = {
    x: (s._x || 0) + ((s._w || 50) - w) / 2, y: BOXY + (BOXH * (1 - sc)) / 2,
    width: w, height: BOXH * sc, fill: s.color, cornerRadius: 6,
    stroke: isEmpty ? '#94a3b8' : (s.tomb ? '#94a3b8' : '#0891b2'), strokeWidth: 1.5,
    shadowColor: isEmpty ? 'transparent' : 'rgba(0,0,0,.08)', shadowBlur: isEmpty ? 0 : 3,
  }
  if (isEmpty) { cfg.dash = [4, 3]; cfg.dashEnabled = true }
  return cfg
}

function slotTextCfg(s: Slot) {
  const sc = s.s ?? 1
  const w = (s._w || 50) * sc
  let txt = ''
  if (s.val !== null) txt = String(s.val)
  else if (s.tomb) txt = '✗'
  const fill = s.tomb ? '#64748b' : (s.val !== null ? '#0f172a' : '#cbd5e1')
  return { x: (s._x || 0) + ((s._w || 50) - w) / 2, y: BOXY + (BOXH * (1 - sc)) / 2,
    width: w, height: BOXH * sc, text: txt, fontSize: s.val !== null ? 15 : 14,
    fontFamily: 'monospace', fontStyle: 'bold', fill, align: 'center', verticalAlign: 'middle' }
}

function slotIdxCfg(i: number) {
  const s = slots[i]
  return { x: s._x || 0, y: BOXY + BOXH + 6, width: s._w || 50, text: '[' + i + ']',
    fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

function doInsert() {
  act('线性探测插入', async () => {
    if (filledCount.value >= M) { status.value = '表满，无法插入'; return }
    const v = Math.floor(Math.random() * 90 + 10)
    let i = hashOf(v)
    status.value = `插入 ${v}：hash = ${i}`
    await d(300)
    for (let k = 0; k < M; k++) {
      const cur = (i + k) % M
      slots[cur].color = C.orange
      slots[cur].s = 1.08
      await d(360)
      if (!slots[cur].val) {
        const reused = slots[cur].tomb
        slots[cur].tomb = false
        slots[cur].val = v
        slots[cur].color = C.green
        status.value = reused ? `复用墓碑槽[${cur}] 写入 ${v}` : `探测 ${k} 次，写入空槽[${cur}]`
        await d(600)
        resetColors()
        return
      }
      status.value = `槽[${cur}] 已占用(${slots[cur].val})，向右探测`
      slots[cur].color = baseColor(slots[cur])
      slots[cur].s = 1
    }
  })
}

function doSearch() {
  act('线性探测查找', async () => {
    const v = Math.floor(Math.random() * 90 + 10)
    let i = hashOf(v)
    status.value = `查找 ${v}：hash = ${i}`
    await d(300)
    for (let k = 0; k < M; k++) {
      const cur = (i + k) % M
      slots[cur].color = C.orange
      slots[cur].s = 1.08
      await d(360)
      if (slots[cur].val === v) {
        slots[cur].color = C.green
        status.value = `找到 ${v}！探测 ${k} 次`
        await d(600)
        resetColors()
        return
      }
      if (!slots[cur].val && !slots[cur].tomb) {
        slots[cur].color = C.red
        status.value = `遇到空槽[${cur}]，${v} 不存在`
        await d(600)
        resetColors()
        return
      }
      status.value = `槽[${cur}] 是 ${slots[cur].val ?? '墓碑✗'}，继续探测`
      slots[cur].color = baseColor(slots[cur])
      slots[cur].s = 1
    }
    status.value = '整表扫描，未找到'
    resetColors()
  })
}

function doDelete() {
  act('删除（墓碑标记）', async () => {
    const occupied = slots.map((s, i) => s.val !== null ? i : -1).filter(i => i >= 0)
    if (!occupied.length) { status.value = '无元素可删'; return }
    const i = occupied[Math.floor(Math.random() * occupied.length)]
    slots[i].color = C.red
    status.value = `删除槽[${i}] 的 ${slots[i].val}`
    await d(450)
    slots[i].val = null
    slots[i].tomb = true
    slots[i].color = '#cbd5e1'
    status.value = '置为墓碑 ✗（lazy deletion，查找时继续穿过）'
    await d(600)
    resetColors()
  })
}

function doReset() { busy.value = false; init() }

let ro: ResizeObserver | null = null
onMounted(() => {
  init()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "开放寻址思想" },
  { id: "sec-2", name: "线性探测" },
  { id: "sec-3", name: "二次探测" },
  { id: "sec-4", name: "双重散列" },
  { id: "sec-5", name: "墓碑删除" },
  { id: "sec-6", name: "主聚集/次聚集" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

const codeLinear = `// 线性探测哈希表：冲突后每次向后走一格
class LinearProbingHashTable {
  private slots: Array<number | null>      // null = 空槽
  private tombstones: boolean[]            // true = 墓碑

  constructor(private capacity: number = 16) {
    this.slots = new Array(capacity).fill(null)
    this.tombstones = new Array(capacity).fill(false)
  }

  private hash(key: number): number {
    return ((key % this.capacity) + this.capacity) % this.capacity
  }

  // 插入：线性探测找第一个空槽或墓碑
  insert(key: number): void {
    let i = this.hash(key)
    for (let p = 0; p < this.capacity; p++) {
      const cur = (i + p) % this.capacity
      if (this.slots[cur] === null) {       // 空槽或墓碑 → 写入
        this.slots[cur] = key
        this.tombstones[cur] = false
        return
      }
      if (this.slots[cur] === key) return   // 已存在
    }
    throw new Error('表已满')
  }

  // 查找：线性探测，遇到空槽（非墓碑）即失败
  search(key: number): boolean {
    let i = this.hash(key)
    for (let p = 0; p < this.capacity; p++) {
      const cur = (i + p) % this.capacity
      if (this.slots[cur] === key) return true
      if (this.slots[cur] === null && !this.tombstones[cur]) return false  // 遇空槽终止
    }
    return false
  }

  // 删除：打墓碑，不能清空
  delete(key: number): boolean {
    let i = this.hash(key)
    for (let p = 0; p < this.capacity; p++) {
      const cur = (i + p) % this.capacity
      if (this.slots[cur] === key) {
        this.slots[cur] = null
        this.tombstones[cur] = true          // 墓碑标记
        return true
      }
      if (this.slots[cur] === null && !this.tombstones[cur]) return false
    }
    return false
  }
}`

const codeQuadratic = `// 二次探测：探测步长按平方增长 p² = 1, 4, 9, 16…
function quadraticProbe(hash: number, p: number, capacity: number): number {
  return (hash + p * p) % capacity
}

// 演示探测序列（capacity = 7，hash = 2）
const capacity = 7
const hash = 2
const seq: number[] = []
for (let p = 0; p < 7; p++) {
  seq.push(quadraticProbe(hash, p, capacity))
}
console.log(seq)  // [2, 3, 6, 4, 4, 0, 3]
// 注意：p=3 和 p=4 都算出 4（(2+9)%7=4、(2+16)%7=4）——序列开始重复
// 这就是「可能探不到某些槽」的根源

// ─── 与线性探测对比 ───
// 线性探测  hash=2: 2, 3, 4, 5, 6, 0, 1   （步长恒定 1，主聚集）
// 二次探测  hash=2: 2, 3, 6, 4, 4, 0, 3   （步长跳跃，但序列会重复）

// 工程约束（保证能探到足够的槽）：
// 1. capacity 取质数
// 2. 负载因子 < 0.5
// 满足以上两条，二次探测的前 capacity/2 个探测位置互不重复`

const codeDouble = `// 双重散列：第二个哈希函数决定步长
function hash1(key: number, capacity: number): number {
  return ((key % capacity) + capacity) % capacity
}

function hash2(key: number): number {
  // 步长 = 1 + (key % (capacity - 1))
  // 保证步长 >= 1，且与容量（质数）互质，能覆盖所有槽
  return 1 + (key % 7)   // 这里 capacity-1 = 7
}

function doubleHashProbe(key: number, p: number, capacity: number): number {
  return (hash1(key, capacity) + p * hash2(key)) % capacity
}

// 演示：capacity=8（质数取 7），插入 key=5 和 key=13
// key=5:  hash1=5, step=1+(5%7)=6  → 探测: 5, 3, 1, 7, 5...
// key=13: hash1=5, step=1+(13%7)=7 → 探测: 5, 4, 3, 2, 1...
// 两个 key 初始都哈希到 5，但步长不同（6 vs 7），
// 探测路径完全错开 → 彻底消除次聚集！

// ─── 为什么步长要和容量互质？───
// 若 capacity=8，步长=2（不互质），探测序列只会走 0,2,4,6,0,2,4,6…
// 永远到不了奇数槽。互质保证遍历所有槽。`

const codeTombstone = `// 墓碑删除：为什么不能直接清空？
// 场景：capacity=5，元素按线性探测插入
// 插入 10(槽0)、20(槽0冲突→槽1)、30(槽0冲突→槽1→槽2)
// 槽: [10, 20, 30, _, _]

// ❌ 错误做法：删除 20 后清空槽1
// 槽: [10, _, 30, _, _]
// 查找 30：hash=0 → 槽0=10 → 槽1 为空 → 立即返回「不存在」！
// 但 30 明明在槽2！因为空槽切断了探测链。

// ✅ 正确做法：删除 20 后打墓碑
// 槽: [10, ✗, 30, _, _]
// 查找 30：hash=0 → 槽0=10 → 槽1=墓碑(继续) → 槽2=30 命中！
// 插入 40：hash=0 → 槽0占 → 槽1=墓碑 → 复用槽1写入 40
// 槽: [10, 40, 30, _, _]

// 实现：用一个布尔数组标记墓碑
class HashTableWithTombstone {
  private slots: Array<number | null> = new Array(8).fill(null)
  private tomb: boolean[] = new Array(8).fill(false)

  // ...（完整实现见上面 linear_probing.ts）

  // 关键点总结：
  // 1. 查找：穿过墓碑，只在「非墓碑的空槽」处终止
  // 2. 插入：墓碑位置可复用
  // 3. 维护：墓碑太多时重建表（rehash）清理
}`
</script>
