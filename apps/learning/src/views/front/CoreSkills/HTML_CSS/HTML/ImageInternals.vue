<template>
  <div class="image-internals-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4"><h1 class="text-2xl font-bold text-slate-800">🖼️ 图片底层原理</h1><p class="text-sm text-slate-500 mt-1">像素存储 · 压缩算法 · 编码解码 — 从二进制到屏幕上的一张图</p></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 像素与存储 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>一张图片在计算机里是怎么存的？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">图片本质上是一个<strong>二维像素矩阵</strong>。每个像素存储颜色信息——取决于<strong>色彩模型</strong>和<strong>位深度</strong>。比如一张 1920×1080 的 RGBA 图片 = 1920×1080×4 = <strong>~8.3MB 原始数据</strong>。</p>

        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">概念</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">像素（Pixel）</td><td class="px-4 py-2 border">图片的最小单元。一个像素 = 一组颜色通道值。</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">色彩模型</td><td class="px-4 py-2 border"><strong>RGB</strong>（屏幕显示）、<strong>CMYK</strong>（印刷）、<strong>YUV/YCbCr</strong>（视频/JPEG）。RGB 每通道 0-255。</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">位深度</td><td class="px-4 py-2 border">每个像素用多少 bit 存储。8bit=256 色，24bit=1670 万色（真彩色），32bit=24bit+Alpha 通道。</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Alpha 通道</td><td class="px-4 py-2 border">透明度信息。0=完全透明，255=完全不透明。用于图像合成（Alpha Compositing）。</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">分辨率</td><td class="px-4 py-2 border">宽×高的像素数。同样尺寸下 PPI 越高越清晰，文件也越大。</td></tr>
        </tbody></table></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 为什么需要压缩？</strong> 1920×1080 RGBA = 8.3MB <strong>一张</strong>。一个网页上可能有 10 张图 = 83MB。不做压缩，网页加载根本不可行。压缩就是在"画质"和"文件大小"之间找平衡。</p></aside>
      </section>

      <!-- 2. 压缩算法 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>图片压缩的核心原理</h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">无损压缩 vs 有损压缩</h3>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold"></th><th class="px-4 py-2 border font-semibold">无损压缩</th><th class="px-4 py-2 border font-semibold">有损压缩</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-medium">代表格式</td><td class="px-4 py-2 border">PNG, GIF, BMP</td><td class="px-4 py-2 border">JPEG, WebP(有损), AVIF</td></tr><tr><td class="px-4 py-2 border font-medium">原理</td><td class="px-4 py-2 border">找规律消除冗余（如连续同色像素→"颜色A×100"）</td><td class="px-4 py-2 border">丢弃人眼不敏感的信息（如高频色彩细节）</td></tr><tr><td class="px-4 py-2 border font-medium">画质</td><td class="px-4 py-2 border">100% 还原——解压后完全一致</td><td class="px-4 py-2 border">画质损失——不可逆</td></tr><tr><td class="px-4 py-2 border font-medium">压缩率</td><td class="px-4 py-2 border">低（通常 2-5x）</td><td class="px-4 py-2 border">高（通常 10-50x）</td></tr></tbody></table></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">JPEG 有损压缩是怎么做的？（最经典的算法）</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>色彩空间转换</strong> — RGB → YCbCr。Y=亮度（人眼最敏感），Cb/Cr=色度（人眼不敏感→可大幅压缩）。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>色度子采样（Chroma Subsampling）</strong> — 亮度保留全分辨率，色度降采样（4:2:0 表示色度只有 1/4 分辨率）。这步就省了 50% 数据。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>DCT 变换（离散余弦变换）</strong> — 把 8×8 像素块从"空间域"变换到"频率域"。低频=平滑区域，高频=边缘/细节。人眼对高频不敏感。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>量化（Quantization）</strong> — <strong>这是有损的核心！</strong>把 DCT 系数除以量化表，高频系数被"清零"或大幅削减。量化表决定了"质量"参数（quality=75 意味着用较粗的量化表）。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>熵编码（Huffman + RLE）</strong> — 量化后的系数有很多零，用游程编码压缩零序列，再用哈夫曼编码用短码表示高频值。</div></li>
        </ol>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">PNG 无损压缩是怎么做的？</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>Filter（预测）</strong> — 对每一行像素做"预测"——当前像素 = 左边像素 + 差值。五选一预测器（None/Sub/Up/Average/Paeth），每行选最优。把像素值变成"差异值"，差异值更小→更好压缩。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>DEFLATE 压缩</strong> — LZ77（找重复模式）+ Huffman 编码。这是和 ZIP/gzip 相同的算法。</div></li>
        </ol>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">现代格式：WebP / AVIF 为什么更强？</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">WebP 用 VP8 的<strong>帧内预测</strong>（类似视频压缩——从相邻块"预测"当前块，只存差异）。AVIF 用 AV1 的编码器——支持<strong>更大的块尺寸</strong>（128×128 vs JPEG 的 8×8）、<strong>更复杂的预测模式</strong>（56 种角度方向）、更好的<strong>环路滤波</strong>。这些技术都是视频编码几十年的积累反哺到图片上的。</p>
      </section>

      <!-- 3. 浏览器渲染 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>图片在浏览器里是怎么显示的？</h2>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>网络请求</strong> — 浏览器解析 HTML 遇到 &lt;img src&gt; → 发起 HTTP 请求下载图片文件。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>解码（Decode）</strong> — 拿到二进制数据 → 根据文件头判断格式（FF D8 = JPEG, 89 50 4E 47 = PNG）→ 调用对应解码器 → 输出<strong>未压缩的位图（bitmap）</strong>存到内存。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>解码位置</strong> — 在 <strong>CPU 光栅化线程</strong>中解码（非主线程）。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">decoding="async"</code> 属性让这个过程更早开始。<strong>JPEG 有硬件解码</strong>（GPU 加速），PNG 只有软件解码。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>GPU 纹理上传</strong> — 解码后的位图被上传到 <strong>GPU 显存</strong>作为纹理（Texture）。这一步有开销——图片越大，上传越慢。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>合成与绘制</strong> — GPU 合成器把纹理和其他图层合成 → 输出到屏幕帧缓冲 → 显示器显示。</div></li>
        </ol>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 为什么大图片会卡？</strong> 不仅是下载慢——<strong>解码 8MB JPEG → 展开成 ~32MB 的位图</strong>（RGBA 每像素 4 字节），还要上传到 GPU。这整个过程都在 CPU/GPU 上执行，内存占用大。所以 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">loading="lazy"</code> 和 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">decoding="async"</code> 是两个不同层面的优化。</p></aside>
      </section>

      <!-- 4. 关键点 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键点总结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>原始像素数据 = 宽×高×通道数</strong>，不压缩根本无法在 Web 上使用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>JPEG 有损压缩</strong>：RGB→YCbCr→色度子采样→DCT→量化（有损核心）→熵编码</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>PNG 无损压缩</strong>：行预测（Filter）→ DEFLATE（LZ77+Huffman），解压后逐位一致</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>现代格式（WebP/AVIF）借用视频编码技术</strong>——帧内预测、更大的块、更好的量化</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>图片显示 5 步：下载→解码（CPU，得位图）→上传 GPU 纹理→合成→显示</span></li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import { Nav } from 'components'
const navList = [{id:"sec-1",name:"像素与存储"},{id:"sec-2",name:"压缩核心原理"},{id:"sec-3",name:"浏览器显示流程"},{id:"sec-4",name:"关键点总结"}]
</script>
