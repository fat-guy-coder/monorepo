<template>
  <div class="display-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4"><h1 class="text-2xl font-bold text-slate-800">🖥️ 显示器显示原理</h1><p class="text-sm text-slate-500 mt-1">从 GPU 到屏幕 — 像素点亮、信号传输、带宽计算、刷新率的完整链路</p></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 面板成像 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>显示器是怎么发光的？面板技术</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">显示器本质上是在<strong>二维平面上控制数百万个独立光点</strong>。不同面板技术的区别在于<strong>"每个像素怎么被点亮"</strong>。</p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">LCD（液晶显示器）— 背光 + 液晶阀门</h3>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4 text-sm">
          <p class="text-slate-600 mb-2"><strong>LCD 不自发光</strong>——LED 背光源发出白光，液晶像"阀门"控制通过量。</p>
          <ol class="space-y-1 text-slate-600 ml-4">
            <li><strong>背光</strong>（LED 灯条）发光 → 导光板均匀分布</li>
            <li><strong>偏光片</strong>将光变成单一方向偏振</li>
            <li><strong>TFT 晶体管阵列</strong>——每个子像素一个晶体管，电压控制液晶偏转角度</li>
            <li><strong>液晶层</strong>——电压不同→液晶扭转角度不同→光透过量不同（0V=开，满压=关）</li>
            <li><strong>彩色滤光片</strong>（RGB）——每个像素 3 个子像素，液晶控制各子像素亮度</li>
            <li><strong>人眼合成</strong>——三个子像素的光混合→感知到一种颜色</li>
          </ol>
          <p class="text-slate-500 mt-2 text-xs">缺点：液晶无法 100% 关闭→黑色发灰（漏光），对比度 ~1000:1，响应 1-5ms。</p>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">OLED（有机发光二极管）— 像素自发光</h3>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4 text-sm">
          <p class="text-slate-600 mb-2"><strong>OLED 不需背光</strong>——每个像素是微型 LED，通电自发光。没有液晶层、没有滤光片。</p>
          <ul class="space-y-1 text-slate-600 ml-4">
            <li>· 红色子像素 = 发红光的有机材料 + 晶体管控制电流</li>
            <li>· 绿色子像素 = 发绿光的有机材料 + 晶体管控制电流</li>
            <li>· 蓝色子像素 = 发蓝光的有机材料 + 晶体管控制电流</li>
            <li>· 显示黑色 = <strong>直接关像素</strong>——纯黑，无限对比度</li>
          </ul>
          <p class="text-slate-500 mt-2 text-xs">优点：无限对比度、响应 &lt;0.1ms、更薄。缺点：有机材料老化→烧屏、蓝色寿命最短。</p>
        </div>
      </section>

      <!-- 2. 分辨率 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>分辨率、PPI 与色彩深度</h2>
        <h3 class="text-md font-semibold text-slate-700 mb-3">分辨率 = 多少像素</h3>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">分辨率</th><th class="px-4 py-2 border font-semibold">像素数</th><th class="px-4 py-2 border font-semibold">总像素</th><th class="px-4 py-2 border font-semibold">典型场景</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">1080p (FHD)</td><td class="px-4 py-2 border">1920×1080</td><td class="px-4 py-2 border">207 万</td><td class="px-4 py-2 border">主流显示器</td></tr><tr><td class="px-4 py-2 border">1440p (2K)</td><td class="px-4 py-2 border">2560×1440</td><td class="px-4 py-2 border">368 万</td><td class="px-4 py-2 border">高端显示器/手机</td></tr><tr><td class="px-4 py-2 border">2160p (4K)</td><td class="px-4 py-2 border">3840×2160</td><td class="px-4 py-2 border">829 万</td><td class="px-4 py-2 border">高端电视/专业显示</td></tr><tr><td class="px-4 py-2 border">4320p (8K)</td><td class="px-4 py-2 border">7680×4320</td><td class="px-4 py-2 border">3317 万</td><td class="px-4 py-2 border">旗舰电视</td></tr></tbody></table></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">PPI — 决定"清晰度"的真正指标</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">同样分辨率，屏幕越小 PPI 越高。6.1" 1080p 手机 ≈ 425 PPI，27" 1080p 显示器 ≈ 82 PPI。<strong>Retina 标准</strong>（Apple）：正常观看距离下人眼无法分辨单个像素≈ 300+ PPI（手机）/ 220+ PPI（笔记本）/ 150+ PPI（台式）。</p>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">色彩深度与 HDR</h3>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">位深</th><th class="px-4 py-2 border font-semibold">每通道色阶</th><th class="px-4 py-2 border font-semibold">总颜色</th><th class="px-4 py-2 border font-semibold">用途</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">8-bit (SDR)</td><td class="px-4 py-2 border">256 级</td><td class="px-4 py-2 border">1670 万</td><td class="px-4 py-2 border">普通显示/Web</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">10-bit (HDR10)</td><td class="px-4 py-2 border">1024 级</td><td class="px-4 py-2 border">10.7 亿</td><td class="px-4 py-2 border">HDR 视频/专业</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">12-bit (Dolby Vision)</td><td class="px-4 py-2 border">4096 级</td><td class="px-4 py-2 border">687 亿</td><td class="px-4 py-2 border">旗舰电视/影院</td></tr></tbody></table></div>
        <p class="text-sm text-slate-500">8-bit 的痛点：256 级灰阶在渐变场景下出现<strong>色带（banding）</strong>——人眼可分辨相邻色阶。</p>
      </section>

      <!-- 3. 信号传输 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>信号传输：GPU → 线缆 → 显示器</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">接口</th><th class="px-4 py-2 border font-semibold">带宽</th><th class="px-4 py-2 border font-semibold">4K@60</th><th class="px-4 py-2 border font-semibold">4K@144</th><th class="px-4 py-2 border font-semibold">8K@60</th><th class="px-4 py-2 border font-semibold">信号</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">HDMI 2.0</td><td class="px-4 py-2 border">18 Gbps</td><td class="px-4 py-2 border text-emerald-600">✅</td><td class="px-4 py-2 border text-red-500">❌</td><td class="px-4 py-2 border text-red-500">❌</td><td class="px-4 py-2 border">数字 TMDS</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">HDMI 2.1</td><td class="px-4 py-2 border">48 Gbps</td><td class="px-4 py-2 border text-emerald-600">✅</td><td class="px-4 py-2 border text-emerald-600">✅ DSC</td><td class="px-4 py-2 border text-emerald-600">✅ DSC</td><td class="px-4 py-2 border">数字 FRL</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">DP 1.4</td><td class="px-4 py-2 border">32.4 Gbps</td><td class="px-4 py-2 border text-emerald-600">✅</td><td class="px-4 py-2 border text-emerald-600">✅ DSC</td><td class="px-4 py-2 border text-amber-500">⚠️</td><td class="px-4 py-2 border">数字包交换</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">DP 2.1</td><td class="px-4 py-2 border">80 Gbps</td><td class="px-4 py-2 border text-emerald-600">✅</td><td class="px-4 py-2 border text-emerald-600">✅</td><td class="px-4 py-2 border text-emerald-600">✅</td><td class="px-4 py-2 border">数字包交换</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">USB-C Alt</td><td class="px-4 py-2 border">DP 1.4 级</td><td class="px-4 py-2 border text-emerald-600">✅</td><td class="px-4 py-2 border text-amber-500">⚠️</td><td class="px-4 py-2 border text-red-500">❌</td><td class="px-4 py-2 border">DP over USB</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">VGA</td><td class="px-4 py-2 border">—</td><td class="px-4 py-2 border text-red-500">❌</td><td class="px-4 py-2 border text-red-500">❌</td><td class="px-4 py-2 border text-red-500">❌</td><td class="px-4 py-2 border"><strong>模拟</strong></td></tr></tbody></table></div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">VGA（模拟）— 已淘汰</h4>
            <p class="text-slate-600">连续电压信号——0V=全黑，0.7V=全白。3 根 RGB 信号线 + 行/场同步。信号衰减→画面模糊，DAC→ADC 转换引入噪点。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">HDMI/DP（数字）— 现代标准</h4>
            <p class="text-slate-600">0101 二进制——HDMI 用 TMDS 差分信号，DP 用包交换（类似网络包）。无衰减——要么完美，要么全黑（悬崖效应）。</p>
          </div>
        </div>
      </section>

      <!-- 4. 带宽 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>带宽计算 —— 为什么 4K@144 需要 HDMI 2.1</h2>
        <div class="bg-slate-900 text-green-400 rounded-xl p-4 mb-4 font-mono text-sm text-center">
          带宽 = 水平像素 × 垂直像素 × 刷新率 × 每像素 bit 数 × 1.2（消隐开销）
        </div>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">配置</th><th class="px-4 py-2 border font-semibold">公式</th><th class="px-4 py-2 border font-semibold">所需带宽</th><th class="px-4 py-2 border font-semibold">HDMI 2.0?</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">1080p@60 8-bit</td><td class="px-4 py-2 border font-mono text-xs">1920×1080×60×24×1.2</td><td class="px-4 py-2 border">~3.6 Gbps</td><td class="px-4 py-2 border text-emerald-600">✅</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">4K@60 8-bit</td><td class="px-4 py-2 border font-mono text-xs">3840×2160×60×24×1.2</td><td class="px-4 py-2 border">~14.4 Gbps</td><td class="px-4 py-2 border text-emerald-600">✅</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">4K@60 10-bit HDR</td><td class="px-4 py-2 border font-mono text-xs">3840×2160×60×30×1.2</td><td class="px-4 py-2 border">~18.0 Gbps</td><td class="px-4 py-2 border text-amber-500">⚠️ 临界</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">4K@144 10-bit</td><td class="px-4 py-2 border font-mono text-xs">3840×2160×144×30×1.2</td><td class="px-4 py-2 border">~43.2 Gbps</td><td class="px-4 py-2 border text-red-500">❌</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">8K@60 10-bit</td><td class="px-4 py-2 border font-mono text-xs">7680×4320×60×30×1.2</td><td class="px-4 py-2 border">~72 Gbps</td><td class="px-4 py-2 border text-red-500">❌</td></tr></tbody></table></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 DSC（显示流压缩）：</strong>带宽不够时 GPU 压缩→显示器解压，压缩率 ~3:1，<strong>视觉上无损</strong>。4K@144 10-bit 用 DSC 后只需 ~14 Gbps——HDMI 2.0 也能跑。</p></aside>
      </section>

      <!-- 5. 刷新率 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>刷新率、响应时间与同步技术</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">技术</th><th class="px-4 py-2 border font-semibold">原理</th><th class="px-4 py-2 border font-semibold">优点</th><th class="px-4 py-2 border font-semibold">缺点</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">V-Sync</td><td class="px-4 py-2 border">GPU 等显示器刷新完成再送帧</td><td class="px-4 py-2 border">消除撕裂</td><td class="px-4 py-2 border">延迟↑、FPS 低于刷新率时卡顿</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">G-Sync</td><td class="px-4 py-2 border">NVIDIA 芯片——<strong>显示器等 GPU</strong></td><td class="px-4 py-2 border">无撕裂 + 低延迟</td><td class="px-4 py-2 border">贵、需专用模块</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">FreeSync</td><td class="px-4 py-2 border">AMD 标准 VESA Adaptive-Sync</td><td class="px-4 py-2 border">免费、免版税</td><td class="px-4 py-2 border">质量参差不齐</td></tr></tbody></table></div>
        <p class="text-sm text-slate-600"><strong>响应时间</strong>：GTG（灰到灰）— 像素变色速度。LCD 典型 1-5ms，OLED 典型 0.01-0.1ms。响应慢→<strong>拖影</strong>（上一帧残影未消，新帧已来）。</p>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键点</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>LCD</strong> = 背光+液晶阀门+滤光片，OLED = 像素自发光（纯黑、烧屏）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>带宽</strong> = 分辨率×刷新率×色深×1.2。4K@144 10bit = 43Gbps → 必须 HDMI 2.1 或 DP 2.1</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>DSC 压缩</strong> ≈ 3:1，视觉无损——让低带宽接口也能跑高规格</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>PPI</strong> 比分辨率更影响清晰度——27" 1080p ≈ 82 PPI vs 6.1" 1080p ≈ 425 PPI</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>V-Sync</strong> = GPU 等显示器；<strong>G-Sync/FreeSync</strong> = 显示器等 GPU</span></li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import { Nav } from 'components'
const navList = [{id:"sec-1",name:"面板成像原理"},{id:"sec-2",name:"分辨率与色彩"},{id:"sec-3",name:"信号传输接口"},{id:"sec-4",name:"带宽计算公式"},{id:"sec-5",name:"刷新率与同步"},{id:"sec-6",name:"关键点总结"}]
</script>
