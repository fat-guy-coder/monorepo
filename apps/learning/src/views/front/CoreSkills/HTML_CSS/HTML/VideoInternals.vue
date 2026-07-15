<template>
  <div class="video-internals-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4"><h1 class="text-2xl font-bold text-slate-800">🎬 视频底层原理</h1><p class="text-sm text-slate-500 mt-1">编解码 · 帧类型 · 容器格式 · 码率控制 — 从二进制到流畅播放</p></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 容器 vs 编码 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>容器(Container) ≠ 编码(Codec)——最容易搞混的概念</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>MP4 是容器格式，不是编码格式。</strong>容器像"箱子"，里面装着视频轨、音频轨、字幕轨、元数据。编码器（Codec）决定<strong>每一帧怎么压缩</strong>。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">常见容器</th><th class="px-4 py-2 border font-semibold">常见视频编码</th><th class="px-4 py-2 border font-semibold">常见音频编码</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">MP4 (.mp4)</td><td class="px-4 py-2 border">H.264/AVC, H.265/HEVC, AV1</td><td class="px-4 py-2 border">AAC, MP3</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">WebM (.webm)</td><td class="px-4 py-2 border">VP8, VP9, AV1</td><td class="px-4 py-2 border">Vorbis, Opus</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">MKV (.mkv)</td><td class="px-4 py-2 border">几乎所有编码</td><td class="px-4 py-2 border">几乎所有编码</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">MOV (.mov)</td><td class="px-4 py-2 border">Apple ProRes, H.264</td><td class="px-4 py-2 border">AAC, PCM</td></tr>
        </tbody></table></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 面试常问：</strong>MP4 = ISO Base Media File Format 的扩展。内置 moov atom（元数据）在文件头或尾——如果在尾，需要下载整个文件才能播放（所以有 faststart 优化把 moov 移到开头）。</p></aside>
      </section>

      <!-- 2. 视频编码核心 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>视频是怎么被压缩的？帧间预测</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">视频 = <strong>连续的图片序列</strong>。24fps 的一分钟视频 = 1440 张图片。不压缩的话 1080p = 1440×8.3MB ≈ <strong>12GB/分钟</strong>，完全不可行。视频压缩的核心思想：<strong>相邻帧之间 99% 的内容是相同的</strong>——只存差异。</p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">三种帧类型（GOP = Group of Pictures）</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">🔑 I 帧（Intra/关键帧）</h4>
            <p class="text-xs text-slate-500">完整画面——不依赖其他帧，独立解码。类似 JPEG 压缩。每隔一定时间出现一个（通常 1-10 秒）。I 帧最大。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">🔍 P 帧（Predicted/预测帧）</h4>
            <p class="text-xs text-slate-500">只存"和前面 I/P 帧的<strong>差异</strong>"——运动矢量+残差。比 I 帧小 50-90%。解码时需要前面的帧。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">🔗 B 帧（Bidirectional/双向帧）</h4>
            <p class="text-xs text-slate-500">同时参考<strong>前后</strong>帧。压缩率最高但也最复杂。解码时需要缓存前后帧→延迟增加。</p>
          </div>
        </div>

        <div class="mb-4"><Code language="text" :code="gopCode" title="GOP 结构示例" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">编码器内部做了什么？</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>运动估计（Motion Estimation）</strong> — 在当前帧和参考帧之间搜索相似块。计算<strong>运动矢量</strong>——这块往右移动了 5 像素，往上 2 像素。这是最耗 CPU 的步骤。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>运动补偿 + 残差</strong> — 把参考帧的块按运动矢量"搬过来"→与当前块对比→算出<strong>残差</strong>（差异部分）。残差很小（因为已经搬得很像了），很好压缩。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>残差的 DCT + 量化</strong> — 和 JPEG 一样——把残差做 DCT 变换→量化（丢高频信息）→大幅压缩。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>熵编码 + 码率控制</strong> — CABAC/CAVLC 自适应算术编码。码率控制根据目标码率（bitrate）动态调整量化参数（QP）——场景复杂时多用 bits，简单时少用。</div></li>
        </ol>
      </section>

      <!-- 3. 码率 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>码率（Bitrate）——视频质量和文件大小的最终决定因素</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">码率 = 每秒用了多少 bits 来存储视频。相同分辨率下，码率越高画质越好，文件越大。编码器在"给定码率"的限制下尽量优化画质。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">分辨率</th><th class="px-4 py-2 border font-semibold">推荐码率 (H.264)</th><th class="px-4 py-2 border font-semibold">推荐码率 (H.265/VP9)</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">1080p</td><td class="px-4 py-2 border">5-10 Mbps</td><td class="px-4 py-2 border">2.5-5 Mbps（~50% 节省）</td></tr><tr><td class="px-4 py-2 border">4K</td><td class="px-4 py-2 border">20-50 Mbps</td><td class="px-4 py-2 border">10-25 Mbps</td></tr><tr><td class="px-4 py-2 border">Web 流媒体</td><td class="px-4 py-2 border">1-3 Mbps (720p)</td><td class="px-4 py-2 border">0.5-1.5 Mbps</td></tr></tbody></table></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ CBR vs VBR vs CRF：</strong><strong>CBR</strong>（恒定码率）—每秒钟固定 bits，适合直播；<strong>VBR</strong>（可变码率）—简单场景少用 bits，复杂场景多用；<strong>CRF</strong>（恒定质量）—让编码器自行决定每个场景用多少 bits，达到目标"视觉质量"。</p></aside>
      </section>

      <!-- 4. 浏览器播放 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>浏览器是怎么播放视频的？</h2>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>解封装（Demux）</strong> — 解析容器格式，把视频轨、音频轨、字幕轨分离出来。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>解码（Decode）</strong> — 视频解码器（如 H.264 解码器）逐帧解码。I 帧直接解 → P/B 帧从参考帧+运动矢量+残差重建。现代浏览器<strong>用 GPU 硬件解码</strong>（Video Decode API）而非 CPU 软解——功耗低得多。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>YUV→RGB 转换 + 缩放</strong> — 视频编码用的是 YUV 色彩空间（不是 RGB），需要转换为屏幕的 RGB。如果视频尺寸和显示尺寸不同→缩放。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>渲染</strong> — 解码后的帧（纹理）交给 GPU 合成器→和页面其他元素合成→输出到屏幕。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>音视频同步</strong> — 以<strong>音频时钟</strong>为主（人耳对音频断续更敏感）。PTS（Presentation Time Stamp）确保音画同步。音频快了→跳帧；音频慢了→重复上一帧。</div></li>
        </ol>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">自适应码率（ABR）：HLS / DASH / MSE</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">Netflix/YouTube 不是播一个文件。视频被切成 <strong>2-10 秒的片段</strong>，每段编码为<strong>多个码率</strong>（如 360p/720p/1080p）。播放器根据当前网速<strong>动态切换</strong>——卡了下个片段自动降画质，网好了又升回来。<strong>MSE（Media Source Extensions）</strong>让 JS 可以直接喂数据给 video 元素，是实现 ABR 的基础 API。</p>
      </section>

      <!-- 5. 关键点 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键点总结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>容器 ≠ 编码</strong>——MP4/WebM 是"箱子"，H.264/VP9 是"压缩算法"</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>I/P/B 帧</strong>——I 帧完整（关键帧），P 帧预测前向，B 帧双向预测（最省空间但延迟大）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>压缩核心 = <strong>运动估计</strong>（运动矢量）+ <strong>残差 DCT 量化</strong>（丢高频）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>浏览器用 <strong>GPU 硬件解码</strong>→YUV 转 RGB→合成器渲染，音频时钟主导同步</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>流媒体 ≠ 本地播放——<strong>ABR 自适应码率</strong>，MSE 让 JS 喂数据，HLS/DASH 切片分发</span></li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import { Code, Nav } from 'components'
const navList = [{id:"sec-1",name:"容器 vs 编码"},{id:"sec-2",name:"帧间预测与压缩"},{id:"sec-3",name:"码率控制"},{id:"sec-4",name:"浏览器播放流程"},{id:"sec-5",name:"关键点总结"}]
const gopCode = `典型的 GOP 结构（15 帧）:
I B B P B B P B B P B B P B B  ← 下一个 I
↑                ↑             ↑
关键帧          预测帧         下一个关键帧

解码顺序: I P B B P B B ...
显示顺序: I B B P B B P ... (B 帧需要等后面的帧解码完才能显示)

典型 GOP 长度:
· 直播/低延迟: GOP=30-60 帧 (1-2 秒)
· 点播/高画质: GOP=120-300 帧 (5-10 秒)
· 全 I 帧: 编辑专用，每帧独立，文件巨大`
</script>
