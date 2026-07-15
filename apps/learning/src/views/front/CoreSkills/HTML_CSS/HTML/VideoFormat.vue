<template>
  <div class="video-format-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-5xl mx-auto px-6 py-4"><h1 class="text-2xl font-bold text-slate-800">🎬 常见视频格式详解</h1><p class="text-sm text-slate-500 mt-1">MP4(H.264) · WebM(VP9) · OGG/Theora · MOV · AVI · GIF — 容器与编码的完整指南</p></div></header>
    <main class="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>格式速览：容器 vs 编码</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">选择视频格式时要区分两个层面：<strong>容器</strong>（MP4/WebM/MKV——"箱子"）和<strong>编码</strong>（H.264/VP9/AV1——"压缩算法"）。一个容器可以装多种编码。Web 开发主要关心 <strong>&lt;video&gt; 标签支持什么格式</strong>。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">容器</th><th class="px-4 py-2 border font-semibold">视频编码</th><th class="px-4 py-2 border font-semibold">音频编码</th><th class="px-4 py-2 border font-semibold">浏览器支持</th><th class="px-4 py-2 border font-semibold">推荐场景</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">MP4</td><td class="px-4 py-2 border">H.264, H.265, AV1</td><td class="px-4 py-2 border">AAC, MP3</td><td class="px-4 py-2 border text-emerald-600">全平台 99.9%</td><td class="px-4 py-2 border"><strong>首选兼容方案</strong></td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">WebM</td><td class="px-4 py-2 border">VP8, VP9, AV1</td><td class="px-4 py-2 border">Vorbis, Opus</td><td class="px-4 py-2 border text-emerald-600">Chrome/Firefox/Edge</td><td class="px-4 py-2 border">高压缩比、透明视频</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">OGG</td><td class="px-4 py-2 border">Theora</td><td class="px-4 py-2 border">Vorbis</td><td class="px-4 py-2 border text-amber-500">Chrome/Firefox 部分</td><td class="px-4 py-2 border">开源免版税（老旧方案）</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">MOV</td><td class="px-4 py-2 border">ProRes, H.264</td><td class="px-4 py-2 border">AAC, PCM</td><td class="px-4 py-2 border text-red-500">仅 Safari 较好</td><td class="px-4 py-2 border">Apple 生态、专业编辑</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">AVI</td><td class="px-4 py-2 border">多种</td><td class="px-4 py-2 border">多种</td><td class="px-4 py-2 border text-red-500">几乎不支持</td><td class="px-4 py-2 border">不应用在 Web 上</td></tr>
        </tbody></table></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 Web 最佳实践：</strong>用 <code class="bg-blue-100 px-1 rounded text-xs font-mono">&lt;video&gt;</code> 标签 + 多个 <code class="bg-blue-100 px-1 rounded text-xs font-mono">&lt;source&gt;</code>：第一个 MP4(H.264) 保证兼容，第二个 WebM(VP9) 为现代浏览器提供更小体积。</p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>格式详解</h2>
        <div class="space-y-4">
          <div v-for="fmt in formats" :key="fmt.id" class="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 class="text-md font-semibold text-slate-700 mb-2">{{ fmt.name }} <span class="text-xs text-slate-400 font-normal ml-2">{{ fmt.category }}</span></h3>
            <p class="text-sm text-slate-600 mb-3">{{ fmt.desc }}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="bg-emerald-50 rounded-lg p-3 border border-emerald-100"><h4 class="font-semibold text-emerald-700 mb-1">✅ 优点</h4><ul class="space-y-0.5 text-emerald-600"><li v-for="p in fmt.pros" :key="p" class="flex items-start gap-1"><span class="text-emerald-500">▸</span>{{ p }}</li></ul></div>
              <div class="bg-red-50 rounded-lg p-3 border border-red-100"><h4 class="font-semibold text-red-700 mb-1">❌ 缺点</h4><ul class="space-y-0.5 text-red-600"><li v-for="c in fmt.cons" :key="c" class="flex items-start gap-1"><span class="text-red-500">▸</span>{{ c }}</li></ul></div>
            </div>
            <p class="text-xs text-slate-400 mt-2"><strong>适用场景：</strong>{{ fmt.use }}</p>
          </div>
        </div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>编码选择指南</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm"><strong class="text-blue-700">🔧 最大兼容 → MP4 + H.264 + AAC</strong><p class="text-blue-600 mt-1">没有例外。所有浏览器、所有设备都支持。encoding: ffmpeg -c:v libx264 -preset medium -crf 23</p></div>
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm"><strong class="text-blue-700">🚀 更小体积 → WebM + VP9 + Opus</strong><p class="text-blue-600 mt-1">同画质比 H.264 省 30-50%。YouTube 已全站 VP9。但编码慢 5-10x。</p></div>
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm"><strong class="text-blue-700">⚡ 极致压缩 → AV1</strong><p class="text-blue-600 mt-1">比 VP9 再省 30%。开源免版税。Netflix/YouTube 已用。但编码极慢（~100x H.264），硬件支持还在普及中。</p></div>
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm"><strong class="text-blue-700">🎯 透明视频 → WebM + VP9(alpha)</strong><p class="text-blue-600 mt-1">WebM 支持 Alpha 通道——可以做透明背景的视频 overlay。HEVC 也支持但浏览器兼容差。</p></div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import { Nav } from 'components'
const navList = [{id:"sec-1",name:"格式速览"},{id:"sec-2",name:"格式详解"},{id:"sec-3",name:"编码选择"}]
const formats = [
  {id:'mp4',name:'MP4 (H.264 + AAC)',category:'通用格式',desc:'绝对的主导格式。H.264 是全世界最广泛部署的视频编码——从手机到电视到浏览器全部支持。硬件解码普及率接近 100%——播放功耗最低。',pros:['全平台 100% 支持——零兼容风险','硬件解码——播放功耗最低','编码速度快——适合实时/直播','DRM 支持——内容保护'],cons:['有专利授权费（MPEG LA）','压缩率不如 VP9/AV1','不支持 Alpha 通道','相同画质文件 > WebM'],use:'任何需要兼容性的场景——网站视频、移动 App、直播流'},
  {id:'webm',name:'WebM (VP9 + Opus)',category:'现代 Web 格式',desc:'Google 推动的开源格式。VP9 编码比 H.264 压缩率高 30-50%。YouTube 的全站视频都默认使用 VP9。支持 Alpha 通道——可以做透明背景视频。',pros:['开源免版税——无专利费','比 H.264 压缩率高 30-50%','支持 Alpha 通道','HTML5 原生支持'],cons:['Safari 支持有限（仅 VP8）','硬件解码不如 H.264 普及（移动端功耗高）','编码速度慢——不适合实时直播','编辑软件支持不如 MP4'],use:'现代 Web 应用的第二格式——配合 MP4 做兼容、透明背景视频、对体积要求高的场景'},
  {id:'ogg',name:'OGG/Theora',category:'开源格式(老旧)',desc:'最早被 HTML5 视频接受的格式之一。曾是 Firefox 的首选格式，但由于压缩率远不如 H.264 和 VP8，已被淘汰。现在几乎没有必要使用。',pros:['完全开源免版税','HTML5 早期支持'],cons:['压缩率低','浏览器支持越来越少','Safari 完全不支持','开发停滞——被 VP8/VP9 取代'],use:'基本不再使用。除非需要兼容极其老旧的 Firefox 版本'},
  {id:'mov',name:'MOV (Apple QuickTime)',category:'专业格式',desc:'Apple 开发的容器格式。原生支持高质量编码如 ProRes 和 Alpha 通道。在 Apple 生态中无处不在。Web 上不应使用——用 MP4 替代。',pros:['高质量——支持 ProRes 等专业编码','Alpha 通道支持','Apple Final Cut/iMovie 原生格式'],cons:['浏览器几乎不支持（需 QuickTime 插件）','文件巨大','非 Apple 平台兼容差'],use:'Apple 生态内的视频编辑中间格式。Web 上应转换为 MP4 再发布'},
  {id:'avi',name:'AVI',category:'传统格式(不用)',desc:'90 年代的 Windows 视频格式。简单、原始、功能有限。本质上只是一个原始的视频容器。现代 Web 上完全没有使用场景。',pros:['历史兼容——老播放器都支持','编辑软件普遍支持读取'],cons:['Web 上完全不支持','无现代视频特性','文件巨大','不支持流媒体'],use:'仅在处理古董视频文件时需要。Web 上绝对不应该用'},
]
</script>
