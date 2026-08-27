<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">光纤传输：全反射、单模/多模、WDM</h1><p class="text-sm text-slate-500 mt-1">光信号怎么在玻璃丝里拐着弯跑、还能一口气传 100 公里——计算机网络物理层第 1 篇</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">计算机网络 6-a-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：光怎么在光纤里拐弯、怎么发怎么收</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">你在云上部署一个 Go 服务，用户在手机上一请求，<strong>比特要离开你的服务器、穿过机房、跨过城市，最后钻进用户的设备</strong>。中间最长最核心的一段，靠的是<strong>光</strong>——不是电。本篇就讲清楚三件事：① 光为什么能在弯曲的玻璃丝里一直跑而不漏出去（全反射）；② 单模和多模两种光纤怎么选；③ 电信号是怎么变成光、又变回电的，以及怎么用一根光纤同时传几十路（WDM）。</p>

        <!-- 结构图：全反射 + 单模多模 + 光收发链路 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 665" class="w-full h-auto">
            <defs>
              <marker id="fb-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#06b6d4"/></marker>
              <marker id="fb-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#06b6d4"/></marker>
              <marker id="fb-c" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#64748b"/></marker>
            </defs>

            <!-- ========== ① 全反射 ========== -->
            <text x="20" y="24" font-size="13" font-weight="bold" fill="#b45309" font-family="monospace">① 光纤截面 + 全反射：光在纤芯里 zigzag 前进</text>
            <!-- 截面 -->
            <circle cx="110" cy="108" r="52" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
            <circle cx="110" cy="108" r="28" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="110" y="42" text-anchor="middle" font-size="11" fill="#64748b" font-family="monospace">包层 n₂=1.44</text>
            <text x="110" y="114" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309" font-family="monospace">纤芯 n₁=1.46</text>
            <text x="110" y="174" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">光纤截面</text>
            <!-- 侧面导光 -->
            <rect x="200" y="55" width="540" height="100" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
            <rect x="200" y="75" width="540" height="60" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="470" y="68" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">包层 cladding</text>
            <text x="470" y="98" text-anchor="middle" font-size="10" fill="#b45309" font-family="monospace">纤芯 core（光被锁在这里）</text>
            <!-- zigzag 光路 -->
            <polyline points="205,95 285,134 370,76 455,134 540,76 625,134 735,95" fill="none" stroke="#06b6d4" stroke-width="2" marker-end="url(#fb-a)"/>
            <line x1="150" y1="95" x2="202" y2="95" stroke="#06b6d4" stroke-width="2" marker-end="url(#fb-a)"/>
            <text x="150" y="86" text-anchor="end" font-size="10" fill="#0e7490" font-family="monospace">光进入</text>
            <!-- 反射点法线 -->
            <line x1="285" y1="108" x2="285" y2="142" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="370" y1="62" x2="370" y2="94" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
            <text x="350" y="48" font-size="11" font-weight="bold" fill="#0e7490" font-family="monospace">入射角 θ &gt; 临界角 θc ≈ 80.5°</text>
            <line x1="368" y1="58" x2="300" y2="118" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
            <text x="690" y="172" font-size="10" fill="#64748b" font-family="monospace">全反射弹回 → 拐弯也跑不出去</text>

            <!-- ========== ② 单模 vs 多模 ========== -->
            <text x="20" y="224" font-size="13" font-weight="bold" fill="#0e7490" font-family="monospace">② 单模 vs 多模：细纤芯一条直线，粗纤芯多条路径</text>
            <!-- 单模 -->
            <text x="200" y="256" text-anchor="middle" font-size="12" font-weight="bold" fill="#b45309" font-family="monospace">单模 SM</text>
            <rect x="40" y="270" width="320" height="72" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
            <rect x="40" y="288" width="320" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <line x1="48" y1="303" x2="352" y2="303" stroke="#06b6d4" stroke-width="2" marker-end="url(#fb-b)"/>
            <text x="200" y="360" text-anchor="middle" font-size="10" fill="#475569" font-family="monospace">纤芯 8-10μm · 激光器</text>
            <text x="200" y="378" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">一条直线路径 → 色散低 · 距离 10km+</text>
            <!-- 多模 -->
            <text x="580" y="256" text-anchor="middle" font-size="12" font-weight="bold" fill="#0e7490" font-family="monospace">多模 MM</text>
            <rect x="420" y="270" width="320" height="72" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
            <rect x="420" y="286" width="320" height="40" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <polyline points="428,322 505,326 585,287 665,326 735,300" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
            <polyline points="428,296 535,326 645,287 735,312" fill="none" stroke="#06b6d4" stroke-width="1.5"/>
            <line x1="428" y1="310" x2="735" y2="310" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,4"/>
            <text x="580" y="360" text-anchor="middle" font-size="10" fill="#475569" font-family="monospace">纤芯 50/62.5μm · LED</text>
            <text x="580" y="378" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">多路径长度不同 → 色散高 · 距离 300m-2km</text>

            <!-- ========== ③ 光收发链路 ========== -->
            <text x="20" y="422" font-size="13" font-weight="bold" fill="#b45309" font-family="monospace">③ 光收发链路：电信号 → 光 → 光纤 → 光 → 电信号（一个光模块 = 发送端 + 接收端）</text>
            <text x="20" y="448" font-size="10" fill="#64748b" font-family="monospace">发送端 TX</text>
            <rect x="20" y="455" width="120" height="50" rx="8" fill="#06b6d4"/>
            <text x="80" y="478" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">① 电信号</text>
            <text x="80" y="494" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">1/0 数据比特</text>
            <line x1="140" y1="480" x2="158" y2="480" stroke="#64748b" stroke-width="1.5" marker-end="url(#fb-c)"/>
            <rect x="160" y="455" width="115" height="50" rx="8" fill="#0891b2"/>
            <text x="217" y="478" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">② 驱动电路</text>
            <text x="217" y="494" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">放大成驱动电流</text>
            <line x1="275" y1="480" x2="293" y2="480" stroke="#64748b" stroke-width="1.5" marker-end="url(#fb-c)"/>
            <rect x="295" y="455" width="130" height="50" rx="8" fill="#0891b2"/>
            <text x="360" y="478" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">③ 光源调制</text>
            <text x="360" y="494" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">LED/激光 亮=1 灭=0</text>
            <line x1="425" y1="480" x2="443" y2="480" stroke="#64748b" stroke-width="1.5" marker-end="url(#fb-c)"/>
            <rect x="445" y="455" width="125" height="50" rx="8" fill="#0891b2"/>
            <text x="507" y="478" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">④ 光耦合</text>
            <text x="507" y="494" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">对准纤芯注入</text>
            <line x1="507" y1="505" x2="507" y2="523" stroke="#64748b" stroke-width="1.5" marker-end="url(#fb-c)"/>
            <rect x="20" y="525" width="720" height="40" rx="6" fill="#f59e0b"/>
            <text x="380" y="549" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">⑤ 光纤传输 —— WDM 多波长复用：一根纤同时跑多个波长的光</text>
            <text x="470" y="594" font-size="10" fill="#64748b" font-family="monospace">接收端 RX</text>
            <line x1="620" y1="565" x2="620" y2="596" stroke="#64748b" stroke-width="1.5" marker-end="url(#fb-c)"/>
            <rect x="470" y="600" width="150" height="50" rx="8" fill="#06b6d4"/>
            <text x="545" y="623" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">⑥ 光电探测器</text>
            <text x="545" y="639" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">PIN/APD 光→电</text>
            <line x1="620" y1="625" x2="638" y2="625" stroke="#64748b" stroke-width="1.5" marker-end="url(#fb-c)"/>
            <rect x="640" y="600" width="100" height="50" rx="8" fill="#0891b2"/>
            <text x="690" y="620" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff" font-family="monospace">⑦ 放大整形</text>
            <text x="690" y="636" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">还原干净 1/0</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">光模块 SFP/QSFP 把 ①②③④（发）和 ⑥⑦（收）封装成一个可插拔硬件：插上网卡/交换机再接根光纤跳线，电↔光互换全在里面完成</figcaption>
        </figure>
      </section>

      <!-- 1. 为什么物理层用光 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么物理层用光而不是电？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">物理层要解决的原始问题只有一句话：<strong>把 0 和 1 可靠地从一台机器送到另一台机器</strong>。电和光都能干，但一旦距离超过几米、速率超过几个 G，光纤就把铜线碾压了。决定性优势有四个：</p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">铜线（双绞线/同轴）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">光纤</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold text-amber-700">带宽</td><td class="px-4 py-2 border">靠频率调制，几百 MHz 就到顶，再高衰减爆炸</td><td class="px-4 py-2 border">光频率在 THz 级，一个波长一个通道，WDM 再成倍扩</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-amber-700">损耗</td><td class="px-4 py-2 border">100m 内就要交换机中继</td><td class="px-4 py-2 border">1550nm 窗口约 0.2dB/km，中继距离可达 100km</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-amber-700">电磁干扰</td><td class="px-4 py-2 border">会被电机/雷雨/旁边电缆干扰，还会向外辐射</td><td class="px-4 py-2 border">光不产生也不感应电磁场，完全免疫</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-amber-700">导电性</td><td class="px-4 py-2 border">导电，两端地电位可能形成环路烧设备</td><td class="px-4 py-2 border">石英玻璃不导电，天然电气隔离、防雷防窃听</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">其中后两条（<strong>抗电磁干扰</strong> + <strong>不导电的电气隔离</strong>）是相对铜线最"决定性"的——光不走电，外面的电磁风暴、旁边的强电电缆都影响不到它；两端设备的地电位彻底分开，跨机房、跨楼、跨市连线时不会因为地电位差把设备烧掉。这也是为什么高压变电站、医院手术室、金融机房宁可多花钱也用光纤。</p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>静态资源走 CDN，本地浏览器缓存 → 边缘节点 → 源站，<strong>每一级都是一次"接力"，把内容送得更远、更快</strong>——就像光信号过中继器/放大器接力。而且 CDN 缓存让客户端不直接打到源站，类似光纤"隔离"了端与端：请求的物理距离被缓存切断，不必真的穿透几千公里。</p>
        </aside>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>为什么长江上拉一根几十公里的大桥要比一格格铺路省事？<strong>一条大通道顶一长串小通道</strong>。光纤就是网络里的"长江大桥"——一根纤里面同时跑着无数个用户的流量；而每一段铜线像一截乡间小路，走不远就要换乘（中继）。</p>
        </aside>
      </section>

      <!-- 2. 全反射原理 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>全反射原理：光为什么被锁在纤芯里拐弯跑不出去 ⭐</h2>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">全反射 = 入射角超过临界角时，光在边界上被"弹回"，没有折射出去的路</p>
          <p class="text-xs text-amber-600 text-center">一句话版：光在纤芯里，每次撞到包层都被弹回，于是只能 zigzag 一路向前</p>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">光纤不是一根实心玻璃棍，而是<strong>两层结构</strong>：中间的<strong>纤芯（core）</strong> + 外面一圈<strong>包层（cladding）</strong>。关键在两者的折射率关系——<strong>纤芯的折射率 n₁ 必须大于包层的折射率 n₂</strong>。光从光密介质（n₁ 大）射向光疏介质（n₂ 小）时，随着入射角增大，折射角会先到 90°，再大就"折射不出来了"。</p>

        <p class="text-slate-600 mb-4 leading-relaxed">用<strong>斯涅尔定律</strong>算一下临界角：</p>
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 font-mono text-sm text-slate-700 leading-relaxed">
          <p>n₁ · sinθ₁ = n₂ · sinθ₂　　　（折射定律）</p>
          <p>临界角 θc：让折射角 θ₂ = 90° 的入射角 →  sinθc = n₂ / n₁</p>
          <p class="text-amber-700 font-bold">代入 n₁ = 1.46（纤芯），n₂ = 1.44（包层）：</p>
          <p>sinθc = 1.44 / 1.46 ≈ 0.9863　→　θc ≈ arcsin(0.9863) ≈ 80.5°</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">所以只要光打在边界上时<strong>入射角超过约 80.5°</strong>（光几乎平行于边界、"擦着"表面），就会发生<strong>全反射</strong>——全部能量被弹回纤芯。光进入纤芯时只要角度稍大于临界角，就会一路在上下边界反复全反射、呈 zigzag 前进。这也是光纤<strong>可以弯曲</strong>的原因：只要弯得不是太尖锐（别让入射角跌破临界角），光就永远出不去。</p>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 折射率是什么：</strong>n = 真空光速 ÷ 介质中的光速。真空 n=1，空气约 1.0003，水约 1.33，石英玻璃约 1.46。折射率越大光走得越慢，折射行为就是"光在不同速度的介质间变向"的结果。</p>
        </aside>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>全反射就像<strong>台球贴库反弹</strong>——球以很"平"的角度撞上库边会弹回来；角度太"陡"就出界了。也像激光笔斜着照水面：角度够平就整个反射回空气里，水面上看不到光透出来。光纤里那个"临界角"就是"出界的临界陡度"。</p>
        </aside>
      </section>

      <!-- 3. 单模 vs 多模 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>单模 vs 多模：粗细决定了能跑多远</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">把纤芯做细还是做粗，直接决定了一种叫<strong>色散</strong>的东西，进而决定光纤能传多远。对比看下表：</p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对比项</th><th class="px-4 py-2 border border-slate-200 font-semibold text-amber-600">单模 SM</th><th class="px-4 py-2 border border-slate-200 font-semibold text-cyan-600">多模 MM</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">纤芯直径</td><td class="px-4 py-2 border font-mono text-xs">8-10μm（比头发丝还细，接近光的波长）</td><td class="px-4 py-2 border font-mono text-xs">50 / 62.5μm（粗好几倍）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">光源</td><td class="px-4 py-2 border">激光器（光谱窄、方向性好）</td><td class="px-4 py-2 border">LED（光谱宽、光发散）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">传输距离</td><td class="px-4 py-2 border">10km+，甚至上百 km</td><td class="px-4 py-2 border">300m - 2km，再远就误码</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">色散</td><td class="px-4 py-2 border font-semibold text-amber-700">低：纤芯极细只允许一条路径</td><td class="px-4 py-2 border font-semibold text-cyan-700">高：多条 zigzag 路径长度不同</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">价格</td><td class="px-4 py-2 border">贵（激光器 + 精密耦合）</td><td class="px-4 py-2 border">便宜（LED + 粗纤芯好对准）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">典型应用</td><td class="px-4 py-2 border">数据中心骨干、跨机房、电信长途</td><td class="px-4 py-2 border">机架内、服务器到 TOR 交换机</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed"><strong>色散为什么致命？</strong>多模里同一束脉冲的光走了不同长度的 zigzag 路径，到达对端的时间有先有后，脉冲被"拉宽"。速率一高、比特间隔变窄，前后脉冲就叠在一起——对端分不清 1 和 0，就是<strong>误码</strong>。所以多模便宜但只能短距离；单模贵但能一口气跑 10 公里以上，骨干全靠它。</p>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>把一组人从 A 送到 B——多模像"大家一起各走各的路"，有人走直线有人绕远，<strong>到达时间参差不齐</strong>；单模像"全员排成一条直线走同一条路"，<strong>到达次序整齐</strong>。对应到 Go：并发里如果每个请求走的路（缓存层级、网络跳数）差异很大，响应时间抖动（jitter）就大；调度尽量规整，延迟才可预测。</p>
        </aside>
      </section>

      <!-- 4. 光的收发链路 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>光的收发链路：电 → 光 → 光纤 → 光 → 电 ⭐</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">光模块（SFP/QSFP）是整条链路的心脏——发送端把电变成光，接收端把光变回电，两套东西封装在一个可插拔小盒子里。拆开看一共 7 步：</p>
        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>电信号（1/0）</strong>——网卡芯片输出的高/低电平，一组电压代表一串比特。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>驱动电路</strong>——逻辑电平太弱，先放大成能驱动光源的电流，并做预加重补偿高频损耗。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>光源调制</strong>——LED 或激光器按比特亮灭：亮 = 1，灭 = 0。调制速率就是线路速率（如 10G/25G/100G）。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>光耦合进纤芯</strong>——透镜把发散的光束对准只有 9μm（单模）或 50μm（多模）的纤芯，插头脏了/歪了损耗会骤增。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <div class="text-slate-600"><strong>光在光纤中传输</strong>——靠全反射 zigzag 前进；若用 WDM，多个波长会先合波、同一根纤里并行传输（第 6 节）。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
            <div class="text-slate-600"><strong>光电探测器</strong>——PIN（普通）或 APD（雪崩、更灵敏）二极管把光强变成电流，光 → 电。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">7</span>
            <div class="text-slate-600"><strong>放大整形</strong>——微弱电流先放大，再按阈值重新判 0/1，把被衰减、畸变的信号"修"回干净的比特流交给网卡。</div>
          </li>
        </ol>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 光模块型号：</strong>SFP/SFP+（10G）、QSFP/QSFP28（40G/100G）、QSFP-DD（400G）。同一个接口位置，插 SR（短距，多模，850nm）还是 LR（长距，单模，1310nm）模块，决定了对面接什么光纤——型号必须配对，这是常见故障点。</p>
        </aside>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>收发链路像<strong>两个对讲机 + 一根电话线</strong>——甲说话（电→声音）→ 走电话线（光纤）→ 乙听到再还原（声音→电）。光模块就是这个"对讲机"，把"网卡语言（电）"翻译成"光纤语言（光）"，再翻回来。</p>
        </aside>
      </section>

      <!-- 5. 损耗与衰减 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>损耗与衰减：为什么只认 850 / 1310 / 1550 三个窗口</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">光在光纤里走会越走越弱，这个"变弱"就是<strong>衰减</strong>。衰减用分贝（dB）衡量：<code class="bg-slate-100 px-1 rounded text-xs font-mono">10·log₁₀(P出/P入)</code>，负值越大衰减越多。工程上常说"每公里衰减多少 dB"，单位是 <code class="bg-slate-100 px-1 rounded text-xs font-mono">dB/km</code>。</p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">波长窗口</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">典型衰减</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">场景</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs font-semibold text-cyan-700">850nm</td><td class="px-4 py-2 border font-mono text-xs">约 3 dB/km</td><td class="px-4 py-2 border">多模短距（机架内、几十米）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs font-semibold text-amber-700">1310nm</td><td class="px-4 py-2 border font-mono text-xs">约 0.35 dB/km</td><td class="px-4 py-2 border">单模中距（楼宇间、几 km）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs font-semibold text-amber-700">1550nm</td><td class="px-4 py-2 border font-mono text-xs">约 0.2 dB/km（最低损耗）</td><td class="px-4 py-2 border">单模长距（跨城、海底光缆）</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed"><strong>为什么偏偏是这三个波长？</strong>因为石英玻璃的损耗曲线是"两头高中间低"：波长越长，瑞利散射越小（损耗下降）；但波长长到红外区，材料吸收又猛增。两边一夹，中间就出现了几个<strong>低损耗窗口</strong>——850 / 1310 / 1550nm 正好落在谷底。所以光纤通信全用这三个波段。</p>
        <p class="text-slate-600 mb-4 leading-relaxed">光变弱了怎么办？两种补法：<strong>中继器</strong>把光转成电、重新整形再转回光（O-E-O，贵）；更好的<strong>光放大器 EDFA</strong>（掺铒光纤放大器）直接在光域放大 1550nm 的光，不转电。几千公里的海底光缆，就是靠每隔几十上百公里一个 EDFA 接力撑起来的。别忘了还有接头损耗（每个连接头约 0.3-0.5dB）和弯曲损耗（弯太尖锐会漏光）。</p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>光衰减像<strong>浏览器缓存命中率</strong>——每走一级网络（源站 → CDN 边缘 → 客户端），内容就像光一样"被消耗"一点。为了不"衰减"到底，前端用多级缓存：离用户越近缓存越强，等于在沿途每个节点"放大"一次内容，跟 EDFA 在光纤沿途"放大"光一模一样。</p>
        </aside>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>衰减预算很像<strong>链路预算（link budget）</strong>，也像你对一个 RPC 调用设的<strong>超时预算</strong>：发送功率减掉沿途各种损耗，剩下来的必须比接收灵敏度高。Go 里给下游调用设超时、做熔断，本质上就是"预留余量、防止整条链路被某一段拖垮"——网络层算 dB，你算毫秒。</p>
        </aside>
      </section>

      <!-- 6. WDM -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>WDM 波分复用：一根光纤当 N 根用</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">光的频率高到 THz 级，一个波长只传一路数据太浪费。<strong>WDM（Wavelength Division Multiplexing，波分复用）</strong>的想法极其朴素：<strong>不同波长的光互不干扰，那就让它们同挤一根纤</strong>。发送端用<strong>合波器（MUX）</strong>把 N 路不同颜色的光合成一束，接收端用<strong>分波器（DEMUX）</strong>按波长拆开。N 个波长 = 一根光纤当 N 根用 → <strong>带宽直接乘以 N</strong>。</p>

        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>CWDM（粗波分）</strong>：波长间隔大（20nm），只有十几个波长，便宜，城域网/数据中心扩容常用。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>DWDM（密波分）</strong>：波长间隔 0.8nm 甚至更密，几十上百个波长，配合放大器，是骨干网把单根纤推到几十 T 的核心武器。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>现代 400G 光模块</strong> = 4 个波长 × 每波长 100G（用 PAM4 / 相干调制把单波长速率再顶上去）。</span></li>
        </ul>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>WDM 就像<strong>一根水管里同时走好几条不同颜色的水流</strong>——它们互相不混，出口再用筛子按颜色分开。或者想象一条高速公路上同时跑红的、蓝的、黄的车队，每队各走各的车道，互不干扰，一条路顶好几条路用。</p>
        </aside>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>WDM 的多路并行，像极了 Go 的<strong>goroutine 并发</strong>：一个 CPU 核（一根光纤）同时"跑"很多任务，靠调度隔离；每个 goroutine 互不干扰，共享一条执行流水线。而"扩容靠加波长"也像"扩容靠加工作协程/加实例"——<strong>不是把单条链路做快，而是把并行度做上去</strong>。</p>
        </aside>
      </section>

      <!-- 7. 动手实践 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>动手：命令行里看网卡、链路与光模块</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">理论落地到命令行。先看本机网卡和链路状态（服务器上光口/电口都能查）：</p>
        <div class="mb-4"><Code language="bash" :code="ethtoolCode" title="📟 查链路状态 Terminal" /></div>

        <p class="text-slate-600 mb-4 leading-relaxed">如果你的机器/服务器有<strong>光模块</strong>（数据中心服务器的 10G/25G/100G 光口，或交换机的光口），还能把模块的"身份证"读出来——厂商、波长、距离、光功率一目了然。这也是排障神器：光模块是硬件，光纤坏了、模块老化，都会在这里暴露：</p>
        <div class="mb-4"><Code language="bash" :code="sfpCode" title="📟 读光模块信息 Terminal" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 DDM 诊断：</strong>光模块内部有个小监控芯片（SFF-8472），上报 TX power（发光功率）、RX power（收光功率）、温度、电压。收光功率低于灵敏度或接近上限都危险——<strong>RX power 很低 = 光纤衰减大/脏；RX power 爆表 = 距离太近把接收端打饱和</strong>，都是常见故障。</p>
        </aside>
      </section>

      <!-- 8. 与后端/Go 底层实现的关系 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>与后端 / Go 底层实现的关系</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你部署 Go 服务的云机房，物理网络是这么铺的：<strong>机架内</strong>，服务器到顶架交换机（TOR）走<strong>多模短距</strong>（几十米，便宜）；<strong>机架之间、楼层之间</strong>走<strong>单模</strong>；<strong>跨机房、跨城市骨干</strong>用单模 + <strong>DWDM</strong> 扩容——一根光纤顶几十根。你做独立游戏，玩家分布天南海北，你 push 代码、拉依赖、玩家请求打进来，物理上全是<strong>电信号进光模块 → 光在光纤里跑 → 再变回电</strong>这条链路。</p>
        <p class="text-slate-600 mb-4 leading-relaxed">但对 Go 来说，这一切<strong>完全透明</strong>。<code class="bg-slate-100 px-1 rounded text-xs font-mono">net.Dial</code> 拿到一个 socket，内核协议栈往下走 TCP → IP → 以太网帧 → 网卡驱动 → 光模块 → 光纤——<strong>分层隔离让应用层根本不知道介质是光还是铜</strong>。用 Go 验证一下：应用层只能看到 OS 抽象出来的"接口"，光还是电是物理层的事：</p>
        <div class="mb-4"><Code language="go" :code="goNetCode" title="net-ifaces.go" /></div>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>你写 <code class="bg-teal-100 px-1 rounded text-xs font-mono">http.ListenAndServe</code> 或 <code class="bg-teal-100 px-1 rounded text-xs font-mono">net.Dial</code> 时，从上往下要经过 <strong>HTTP → TCP → IP → 以太网帧 → 光信号</strong>，每一层只和紧邻的上下层打交道。<strong>Go runtime 和你的业务代码永远停在 socket 这一层</strong>，光模块和网卡替你完成了最底层的"翻译"——这就是 OSI 分层（<Link :route="'cs-6-a-1-osi'" :text="'OSI/TCP-IP 模型'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />）的价值：底层换介质，上层零改动。</p>
        </aside>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>你在浏览器里 <code class="bg-purple-100 px-1 rounded text-xs font-mono">fetch('/api')</code> 时同样完全不知道请求走的是光纤、铜线还是 5G——浏览器只管 URL，传输介质被操作系统和网卡层层藏起来了。前端 CDN 就近调度、后端多机房部署，本质上都是在<strong>缩短物理层这段"光的路程"</strong>。</p>
        </aside>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>你叫外卖，只关心"下单到收货"，从不关心骑手走哪条路、坐不坐地铁——<strong>路径规划被平台（内核 + 网卡）包了</strong>。Go 服务也是这样：只关心 socket 收发，光纤那段"路"由物理层自动规划，光缆断了自动切换路由，应用层毫无感知（除非 TCP 超时）。</p>
        </aside>

        <p class="text-sm text-slate-500 leading-relaxed">光纤之外，物理层还有金属介质——<Link :route="'cs-6-a-5-copper'" :text="'下一篇：金属传输：双绞线/同轴、差分信号、干扰'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />。</p>
      </section>

      <!-- 9. 常见误区 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见误区</h2>
        <div class="mb-4">
          <h3 class="text-base font-semibold text-slate-700 mb-2">误区 1："光纤是一根实心的玻璃棍，光在里面像照镜子一样反着走？"</h3>
          <p class="text-slate-600 leading-relaxed mb-3"><strong>不对。</strong>光纤是<strong>纤芯 + 包层</strong>双层结构（外头还有涂覆层和护套），导光靠的不是镜子反射，而是<strong>全反射</strong>——因为 n₁ &gt; n₂ 且入射角超过临界角，光在边界上被"弹回"纤芯。光纤外面不镀银、不反光，光根本到不了外表面。</p>
        </div>
        <div class="mb-4">
          <h3 class="text-base font-semibold text-slate-700 mb-2">误区 2："单模和多模能随便混插混接？"</h3>
          <p class="text-slate-600 leading-relaxed mb-3"><strong>不能，必须严格匹配。</strong>光模块的 SR（多模/850nm）和 LR（单模/1310nm）不能换着用：把多模模块接到单模光纤上，纤芯太细接不住 LED 发散的宽光束，光几乎全漏；把单模模块接到多模光纤上，发射功率和接收灵敏度都不匹配，距离稍长就误码。现场判断链路是否匹配，就查模块型号 + 光纤是"橙色/水绿色"（多模）还是"黄色/蓝色"（单模）跳线。</p>
        </div>
        <div class="mb-4">
          <h3 class="text-base font-semibold text-slate-700 mb-2">误区 3："光衰耗大 = 带宽小，都是一回事？"</h3>
          <p class="text-slate-600 leading-relaxed mb-3"><strong>两码事。</strong><strong>衰减</strong>是光变弱，决定"能传多远"（用放大器/中继器解决）；<strong>带宽</strong>是每秒能传多少比特，决定"多快"（用 WDM 多波长 + 高速调制解决）。一根衰耗很小的光纤，若只用一个波长一路调制，带宽也有限——扩容靠 WDM 加波长，而不是靠换更亮的激光器。</p>
        </div>
        <div class="mb-4">
          <h3 class="text-base font-semibold text-slate-700 mb-2">误区 4："光纤不怕弯，随便折？"</h3>
          <p class="text-slate-600 leading-relaxed mb-3"><strong>不对。</strong>全反射要求入射角大于临界角，弯太尖锐会让光以小于临界角的角度撞边界，光就漏出去了——叫<strong>弯曲损耗</strong>。光纤有最小弯曲半径，施工布线要绕大弯；家用"隐形光纤"被折成直角照样掉速。</p>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 排障口诀：</strong>光链路不通，按顺序查——① 模块型号和光纤类型是否匹配（SM/MM）；② <code class="bg-amber-100 px-1 rounded text-xs font-mono">ethtool -m</code> 看 RX power 是否在正常区间；③ 检查弯曲半径和接头是否干净；④ 换一根已知好的跳线交叉验证。物理层 80% 的坑在这四步里。</p>
        </aside>
      </section>

      <!-- 10. 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">✅</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>光碾压铜线的三个决定性优势</strong>：带宽大（THz 级，一个波长一个通道）、损耗低（中继 100km vs 100m）、抗电磁干扰 + 不导电隔离。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>全反射是导光核心</strong>：纤芯 n₁ &gt; 包层 n₂，入射角 &gt; 临界角 θc = arcsin(n₂/n₁)（≈80.5°）时光被弹回纤芯，zigzag 前进、可弯曲。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>单模 vs 多模</strong>：细纤芯一条直线（激光、低色散、10km+）vs 粗纤芯多路径（LED、色散高、300m-2km）——短距省钱的用多模，骨干全用单模。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>收发链路 7 步</strong>：电 1/0 → 驱动 → 光源调制（亮=1灭=0）→ 耦合 → 光纤传输 → 光电探测 → 放大整形，全封装在 SFP/QSFP 光模块里。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>850/1310/1550 三个低损耗窗口</strong>是材料特性逼出来的；衰减用 dB 记，EDFA 在光域直接放大，海底光缆就靠它接力。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>WDM 让带宽乘 N</strong>：不同波长互不干扰，一根纤当 N 根用；400G = 4 波长 × 100G。你的 Go 服务只见到 socket，光还是电由网卡/光模块透明处理。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">下一篇看物理层的另一半——<Link :route="'cs-6-a-5-copper'" :text="'金属传输：双绞线/同轴、差分信号、电磁干扰'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />，理解电信号怎么对抗干扰。</p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-6-a-3-tools'" :text="'← 上一节：网络工具：ping/traceroute/tcpdump'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-6-a-5-copper'" :text="'下一节：金属传输：双绞线/同轴、差分信号、干扰 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "为什么物理层用光" },
  { id: "sec-2", name: "全反射原理 ⭐" },
  { id: "sec-3", name: "单模 vs 多模" },
  { id: "sec-4", name: "光的收发链路 ⭐" },
  { id: "sec-5", name: "损耗与衰减" },
  { id: "sec-6", name: "WDM 波分复用" },
  { id: "sec-7", name: "动手：看网卡与光模块" },
  { id: "sec-8", name: "与后端/Go 的关系" },
  { id: "sec-9", name: "⚠️ 常见误区" },
  { id: "sec-10", name: "✅ 小结" },
]

// ===== 代码示例 =====
const ethtoolCode = `# ① 查看网卡 eth0 的链路状态与速率（需要 root）
sudo ethtool eth0
#   Speed: 1000Mb/s       ← 协商出的链路速率
#   Duplex: Full
#   Link detected: yes    ← 物理链路是否连通（物理层状态）

# ② 不用 root 的简版：/sys 虚拟文件系统直接暴露网卡状态
cat /sys/class/net/eth0/operstate   # 输出: up / down
cat /sys/class/net/eth0/speed       # 输出: 1000（单位 Mb/s，-1 表示未知）

# ③ 列出本机所有网卡（含虚拟网卡）
ls /sys/class/net/                    # 输出: eth0 lo docker0 ...

# ⚠️ Windows 上对应：Get-NetAdapter | Select Name,LinkSpeed,Status
#    或：ipconfig /all（看 Physical Address 与速率）`;
const sfpCode = `# 网卡带光口（如数据中心服务器的 10G/25G 光口）时：
# ethtool -m 直接读取 SFP/QSFP 光模块的 EEPROM 信息
sudo ethtool -m eth0

# 输出里能看到厂商 / 波长 / 距离 / 光功率等硬信息（DDM）：
#   Identifier: SFP 或 QSFP+ / QSFP28
#   Connector: LC
#   Wavelength: 850nm         ← 多模短距常见；1310/1550 单模
#   Optical power: -3.2dBm    ← 当前发光功率
#   RX power: -8.5dBm         ← 收光功率（关键指标）
#   Cable length: 100m

# 没有光网卡时，看看机器上有哪些硬件——光模块/光纤网卡本质是硬件
lspci | grep -i -E "fibre|ethernet"
#   Ethernet controller: Intel I210 ...
#   Fibre Channel controller: ...（光通道 HBA 卡）

# ⚠️ 光功率偏低 → 光纤衰减大/接头脏；过高 → 距离太近接收饱和`;
const goNetCode = `package main

import (
    "fmt"
    "net"
)

func main() {
    // 应用层看到的"网卡"，其实是 OS 抽象出来的逻辑接口
    ifaces, err := net.Interfaces()
    if err != nil {
        panic(err)
    }
    for _, iface := range ifaces {
        fmt.Printf("%-8s MAC=%s MTU=%d\\n",
            iface.Name, iface.HardwareAddr, iface.MTU)
        // 输出示例: eth0  MAC=02:42:ac:11:00:02  MTU=1500
        //          lo   MAC=  MTU=65536
    }

    // 真正连对端用的是 socket —— 不关心底下是光纤还是铜线
    conn, err := net.Dial("tcp", "example.com:443")
    if err != nil {
        panic(err)
    }
    defer conn.Close()
    fmt.Println("TCP 连接已建立:", conn.RemoteAddr())
    // 输出: TCP 连接已建立: 93.184.216.34:443
    // 物理层是光纤/铜线/WiFi？Go 完全不知道，也不想知道——
    // OSI 分层把这层隔离了，物理介质由网卡/光模块透明处理
}`;
</script>
