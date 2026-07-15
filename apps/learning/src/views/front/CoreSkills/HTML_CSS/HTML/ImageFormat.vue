<template>
  <div class="image-format-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-5xl mx-auto px-6 py-4"><h1 class="text-2xl font-bold text-slate-800">🖼️ 常见图片格式详解</h1><p class="text-sm text-slate-500 mt-1">JPEG · PNG · GIF · SVG · WebP · AVIF · BMP · TIFF — 特性、适用场景、压缩对比</p></div></header>
    <main class="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>格式总览</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">选择合适的图片格式直接影响页面加载速度、画质和用户体验。核心决策因素：<strong>是否需要透明度？是否需要动画？照片还是图形？目标浏览器？</strong></p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">格式</th><th class="px-4 py-2 border font-semibold">推出年份</th><th class="px-4 py-2 border font-semibold">压缩类型</th><th class="px-4 py-2 border font-semibold">色彩</th><th class="px-4 py-2 border font-semibold">透明度</th><th class="px-4 py-2 border font-semibold">动画</th><th class="px-4 py-2 border font-semibold">浏览器</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">JPEG</td><td class="px-4 py-2 border">1992</td><td class="px-4 py-2 border">有损 (DCT)</td><td class="px-4 py-2 border">1670 万色</td><td class="px-4 py-2 border text-red-500">✗</td><td class="px-4 py-2 border text-red-500">✗</td><td class="px-4 py-2 border text-emerald-600">99.9%</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">PNG</td><td class="px-4 py-2 border">1996</td><td class="px-4 py-2 border">无损 (DEFLATE)</td><td class="px-4 py-2 border">1670 万色 + 8bit Alpha</td><td class="px-4 py-2 border text-emerald-600">✓ Alpha</td><td class="px-4 py-2 border text-red-500">✗</td><td class="px-4 py-2 border text-emerald-600">99.9%</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">GIF</td><td class="px-4 py-2 border">1987</td><td class="px-4 py-2 border">无损 (LZW)</td><td class="px-4 py-2 border">256 色</td><td class="px-4 py-2 border text-amber-500">单色</td><td class="px-4 py-2 border text-emerald-600">✓</td><td class="px-4 py-2 border text-emerald-600">99.9%</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">SVG</td><td class="px-4 py-2 border">2001</td><td class="px-4 py-2 border">矢量 (XML)</td><td class="px-4 py-2 border">无限</td><td class="px-4 py-2 border text-emerald-600">✓</td><td class="px-4 py-2 border text-emerald-600">✓ (CSS/SMIL)</td><td class="px-4 py-2 border text-emerald-600">99%</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">WebP</td><td class="px-4 py-2 border">2010</td><td class="px-4 py-2 border">有损/无损 (VP8)</td><td class="px-4 py-2 border">1670 万色 + Alpha</td><td class="px-4 py-2 border text-emerald-600">✓ Alpha</td><td class="px-4 py-2 border text-emerald-600">✓</td><td class="px-4 py-2 border text-emerald-600">97%</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">AVIF</td><td class="px-4 py-2 border">2019</td><td class="px-4 py-2 border">有损/无损 (AV1)</td><td class="px-4 py-2 border">HDR 宽色域 + Alpha</td><td class="px-4 py-2 border text-emerald-600">✓ Alpha</td><td class="px-4 py-2 border text-emerald-600">✓</td><td class="px-4 py-2 border text-amber-500">87%</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">BMP</td><td class="px-4 py-2 border">1990</td><td class="px-4 py-2 border">未压缩</td><td class="px-4 py-2 border">24bit</td><td class="px-4 py-2 border text-amber-500">有限</td><td class="px-4 py-2 border text-red-500">✗</td><td class="px-4 py-2 border text-amber-500">有限</td></tr>
        </tbody></table></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>各格式详解</h2>
        <div class="space-y-4" v-for="fmt in formats" :key="fmt.id">
          <div class="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 class="text-md font-semibold text-slate-700 mb-2">{{ fmt.name }} <span class="text-xs text-slate-400 font-normal ml-2">({{ fmt.year }}, {{ fmt.type }})</span></h3>
            <p class="text-sm text-slate-600 mb-3">{{ fmt.desc }}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                <h4 class="font-semibold text-emerald-700 mb-1">✅ 优点</h4>
                <ul class="space-y-0.5 text-emerald-600"><li v-for="p in fmt.pros" :key="p" class="flex items-start gap-1"><span class="text-emerald-500">▸</span>{{ p }}</li></ul>
              </div>
              <div class="bg-red-50 rounded-lg p-3 border border-red-100">
                <h4 class="font-semibold text-red-700 mb-1">❌ 缺点</h4>
                <ul class="space-y-0.5 text-red-600"><li v-for="c in fmt.cons" :key="c" class="flex items-start gap-1"><span class="text-red-500">▸</span>{{ c }}</li></ul>
              </div>
            </div>
            <p class="text-xs text-slate-400 mt-2"><strong>适用场景：</strong>{{ fmt.use }}</p>
          </div>
        </div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>选择指南</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm"><strong class="text-blue-700">📷 照片 → JPEG 或 WebP/AVIF</strong><p class="text-blue-600 mt-1">JPEG 最兼容；WebP 省 25-35%；AVIF 省 50%。用 &lt;picture&gt; 做渐进增强。</p></div>
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm"><strong class="text-blue-700">🎨 图标/Logo → SVG 或 PNG</strong><p class="text-blue-600 mt-1">矢量优先 SVG（缩放不失真）；复杂图标用 PNG。</p></div>
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm"><strong class="text-blue-700">🎬 简单动画 → WebP 或 APNG</strong><p class="text-blue-600 mt-1">GIF 已是古董——WebP 动画体积小 64%。长视频→直接用 &lt;video&gt;。</p></div>
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm"><strong class="text-blue-700">🖼️ 透明背景 → PNG 或 WebP</strong><p class="text-blue-600 mt-1">WebP + Alpha = PNG 体积的 1/3。如需兼容老浏览器用 PNG 兜底。</p></div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import { Nav } from 'components'
const navList = [{id:"sec-1",name:"格式总览"},{id:"sec-2",name:"各格式详解"},{id:"sec-3",name:"选择指南"}]
const formats = [
  {id:'jpeg',name:'JPEG',year:'1992',type:'有损压缩',desc:'最通用的图片格式。通过 DCT 变换 + 量化丢弃高频信息实现高压缩率。适合照片和复杂渐变——但不适合图标（有压缩伪影）和无透明需求。',pros:['几乎全平台 100% 支持','压缩率极高（10-50x）','可调质量参数（quality 1-100）'],cons:['不支持透明度','有压缩伪影（blocky artifact）','不支持动画','不适合文本/线条图（模糊）'],use:'照片、新闻图片、社交媒体、任何不需要透明度的场景'},
  {id:'png',name:'PNG',year:'1996',type:'无损压缩',desc:'通过行预测 + DEFLATE 实现逐位无损还原。支持完整 Alpha 通道（半透明）。最好的无损带透明格式——但文件通常比 JPEG 大。',pros:['支持 8bit Alpha 透明度','无损压缩——画质完美','适合文本、线条、截图','渐进式加载（interlaced）'],cons:['照片场景下体积远大于 JPEG','不支持动画（有 APNG 扩展但兼容性差）','编码/解码速度慢于 JPEG'],use:'图标、Logo、UI 元素、截图、任何需要透明背景或无损还原的场景'},
  {id:'gif',name:'GIF',year:'1987',type:'无损压缩(LZW)',desc:'历史最悠久的动图格式。仅 256 色 + 单色透明。已被 WebP/APNG/视频替代——新项目不建议使用 GIF。',pros:['全平台支持','支持简单动画','透明度（开关型）'],cons:['仅 256 色——照片惨不忍睹','无损但压缩率低——同品质下 WebP 小 60%','无半透明——边缘有白边问题','专利问题（LZW 曾受保护）'],use:'表情包、简单动图（但有更好的替代方案）'},
  {id:'webp',name:'WebP',year:'2010',type:'有损/无损(VP8)',desc:'Google 推出的现代图片格式。借用视频编码技术（帧内预测）实现比 JPEG/PNG 高 25-35% 的压缩率。有损/无损/动画/透明全支持。',pros:['比 JPEG 小 25-35% 同画质','比 PNG 小 26% 同级','支持透明+动画','有损/无损双模式'],cons:['旧浏览器不支持（IE 全系不支持）','编码速度慢于 JPEG','编解码需要更多 CPU'],use:'现代 Web 应用的默认图片格式——配合 &lt;picture&gt; 做渐进增强'},
  {id:'svg',name:'SVG',year:'2001',type:'矢量 XML',desc:'不是位图——而是 XML 描述的矢量图形。任意缩放不失真。可以用 CSS/JS 动态修改样式和动画。',pros:['无限缩放——矢量','文本格式——gzip 后极小','CSS/JS 可操作——可做动画','深色模式自适应'],cons:['不适合照片','复杂 SVG 渲染慢（每个路径是 DOM 元素）','安全风险——可嵌 &lt;script&gt;'],use:'图标、Logo、数据可视化（chart）、响应式图形'},
  {id:'avif',name:'AVIF',year:'2019',type:'有损/无损(AV1)',desc:'基于 AV1 视频编码的图片格式。目前压缩率最高的主流格式——同画质下比 WebP 再小 50%。支持 HDR、广色域、透明、动画。',pros:['目前最强的压缩率','HDR + 广色域','支持透明和动画','开源免版税'],cons:['浏览器支持 ~87%（Safari 仅 16.4+）','编码极慢——不适合实时生成','解码需要 AV1 硬解支持（部分设备无）'],use:'高质量现代 Web 应用，对画质和体积要求苛刻的场景'},
  {id:'bmp',name:'BMP',year:'1990',type:'未压缩',desc:'Windows 原生位图格式。逐像素存储，无压缩。Web 上不应使用——仅作为 Windows 系统内部格式存在。',pros:['简单——易于程序读写','无压缩损失'],cons:['文件巨大','无透明度、无动画','Web 上无意义'],use:'Windows 系统内部、图像处理的中间格式（基本不用）'},
]
</script>
