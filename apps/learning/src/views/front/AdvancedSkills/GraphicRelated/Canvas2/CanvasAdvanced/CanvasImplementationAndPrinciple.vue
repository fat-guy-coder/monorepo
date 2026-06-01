<template>
  <div class="min-h-screen bg-slate-50 text-slate-700">
    <!-- 头部 -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-[#E34F26]"></div>
            <div class="w-3 h-3 rounded-full bg-[#1572B6]"></div>
          </div>
          <h1 class="text-xl font-bold text-slate-800 tracking-tight">Canvas 底层实现与 GPU 交互原理</h1>
          <span class="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">深入渲染管线</span>
        </div>
      </div>
    </header>

    <!-- 内容区域 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-12">

      <!-- 总体概述 -->
      <section class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h2 class="text-lg font-semibold text-slate-800 mb-4">从 JavaScript 到像素：Canvas 的渲染全貌</h2>
        <p class="text-sm text-slate-600 leading-relaxed mb-4">
          Canvas 2D API 提供了一套“立即模式”的绘图接口。每次调用 <code
            class="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-indigo-600">fill()</code> 或
          <code class="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-indigo-600">stroke()</code>
          时，浏览器并不会立即操作屏幕像素，
          而是将绘图命令转换为底层图形库（如 Skia、CoreGraphics、Direct2D）的调用，再由这些图形库决定是否利用 GPU 加速。
          最终生成的位图会通过 GPU 合成器与页面其他元素一起呈现到屏幕上。
        </p>
        <!-- 简化的流程图 -->
        <div class="flex flex-wrap items-center justify-center gap-2 md:gap-4 mt-6 text-xs font-medium">
          <div class="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full border border-indigo-200">JS 调用 API</div>
          <span class="text-slate-400 text-lg">→</span>
          <div class="bg-cyan-50 text-cyan-700 px-4 py-2 rounded-full border border-cyan-200">命令编码</div>
          <span class="text-slate-400 text-lg">→</span>
          <div class="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-200">光栅化 (CPU/GPU)
          </div>
          <span class="text-slate-400 text-lg">→</span>
          <div class="bg-amber-50 text-amber-700 px-4 py-2 rounded-full border border-amber-200">位图合成</div>
          <span class="text-slate-400 text-lg">→</span>
          <div class="bg-rose-50 text-rose-700 px-4 py-2 rounded-full border border-rose-200">显示器输出</div>
        </div>
      </section>

      <!-- 1. 渲染路径与命令缓冲 -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 class="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <span
              class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">1</span>
            命令式绘图与显示列表
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed">
            Canvas 采用“立即模式”，不保留场景图。每次绘图调用都会立即转化为内部表示。浏览器内部可能会维护一个
            <strong class="text-slate-800">显示列表</strong>或命令缓冲区，用于批量提交到图形后端。
            这意味着 <code class="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">moveTo/lineTo</code> 等操作只是记录路径；
            真正的光栅化发生在 <code class="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">fill/stroke</code> 调用时。
          </p>
          <div class="mt-3 flex gap-2 text-xs text-slate-500">
            <span class="bg-slate-100 px-2 py-1 rounded">beginPath</span>
            <span class="bg-slate-100 px-2 py-1 rounded">moveTo / lineTo</span>
            <span class="bg-slate-100 px-2 py-1 rounded">arc / bezier</span>
            <span class="bg-slate-100 px-2 py-1 rounded">fill / stroke</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 class="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <span
              class="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs">2</span>
            浏览器图形后端：Skia / Direct2D
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed">
            绝大多数现代浏览器（Chrome、Firefox、Edge）使用 <strong class="text-slate-800">Skia</strong> 图形库处理 2D 绘图。
            Skia 会将 Canvas API 翻译为底层操作系统图形调用：在 Windows 上使用 Direct2D，在 macOS/iOS 上使用 CoreGraphics，
            在 Linux 上可能使用 Cairo。这些后端本身可以利用 GPU 进行纹理采样、混合和变换。
          </p>
          <p class="text-xs text-slate-500 mt-2 italic">注：WebGL / WebGPU 直接暴露 GPU 接口，而 Canvas 2D 是封装层。</p>
        </div>
      </section>

      <!-- 2. CPU 软件渲染 vs GPU 硬件加速 -->
      <section class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 class="text-lg font-semibold text-slate-800">渲染模式：软件光栅化与 GPU 加速</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="text-xl">🧠</span>
              <h4 class="font-medium text-slate-800">CPU 软件渲染 (Software Rasterizer)</h4>
            </div>
            <ul class="space-y-2 text-sm text-slate-600">
              <li class="flex gap-2"><span class="text-indigo-500">•</span> 像素计算完全由 CPU 执行，生成内存中的位图。</li>
              <li class="flex gap-2"><span class="text-indigo-500">•</span> 适用于简单的图形或当 GPU 不可用/被禁用时。</li>
              <li class="flex gap-2"><span class="text-indigo-500">•</span> 最终位图仍需上传到 GPU 纹理，以便合成器显示。</li>
              <li class="flex gap-2"><span class="text-indigo-500">•</span> <code
                  class="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">getImageData</code> 速度快（直接读取 CPU
                内存），但绘图本身可能较慢。</li>
            </ul>
          </div>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="text-xl">⚡</span>
              <h4 class="font-medium text-slate-800">GPU 硬件加速 (Hardware Accelerated)</h4>
            </div>
            <ul class="space-y-2 text-sm text-slate-600">
              <li class="flex gap-2"><span class="text-emerald-500">•</span> 绘图命令被转化为 GPU 可执行的顶点和片段着色器。</li>
              <li class="flex gap-2"><span class="text-emerald-500">•</span> 大面积的填充、图像绘制、复杂变换等受益巨大。</li>
              <li class="flex gap-2"><span class="text-emerald-500">•</span> 图像数据作为纹理直接上传至 GPU 显存，绘制时由 GPU 采样。</li>
              <li class="flex gap-2"><span class="text-emerald-500">•</span> <code
                  class="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">getImageData</code> 需从 GPU
                纹理回读，可能导致流水线停滞。</li>
            </ul>
          </div>
        </div>
        <p class="text-xs text-slate-500 border-t border-slate-200 pt-4">
          现代浏览器默认启用 GPU 加速的 Canvas 2D。可通过 Chrome DevTools → Layers 面板查看 Canvas 是否拥有独立合成层以及是否为 GPU 纹理。
        </p>
      </section>

      <!-- 3. GPU 交换信息详解 -->
      <section class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <span class="text-xl">🔄</span> Canvas 与 GPU 如何交换数据
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div class="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
            <h4 class="font-medium text-slate-800 mb-2">1. 纹理上传 (Texture Upload)</h4>
            <p class="text-slate-600 leading-relaxed">
              调用 <code class="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">drawImage</code> 或首次绘制时，
              图像/位图数据从 CPU 内存通过 PCIe 总线拷贝到 GPU 显存，创建 2D 纹理对象。
              后续绘制只需绑定该纹理，由 GPU 直接采样，避免重复传输。
            </p>
            <p class="text-xs text-slate-500 mt-2 italic">关键：尽量使用离屏 Canvas 缓存复杂图形，作为纹理复用。</p>
          </div>
          <div class="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
            <h4 class="font-medium text-slate-800 mb-2">2. 着色器程序执行</h4>
            <p class="text-slate-600 leading-relaxed">
              绘制矩形、路径填充等操作被拆解为三角形网格（三角剖分）。顶点着色器处理坐标变换（如应用 translate/rotate/scale），
              片段着色器执行颜色填充、渐变计算、图像混合等。GPU 大规模并行处理像素，极大加速填充率。
            </p>
            <p class="text-xs text-slate-500 mt-2 italic">Canvas 2D 的全局变换矩阵直接映射为顶点着色器中的 MVP 矩阵。</p>
          </div>
          <div class="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
            <h4 class="font-medium text-slate-800 mb-2">3. 回读操作 (Readback)</h4>
            <p class="text-slate-600 leading-relaxed">
              <code class="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">getImageData</code> 或 <code
                class="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">toDataURL</code>
              需要从 GPU 纹理中将像素数据拷贝回 CPU 内存。这会强制 GPU 流水线刷新，导致严重的同步开销。
              应尽量避免在动画循环中频繁回读像素。
            </p>
            <p class="text-xs text-slate-500 mt-2 italic">性能提示：将回读操作降至最低，或使用 WebGL 异步读取。</p>
          </div>
        </div>
      </section>

      <!-- 4. 合成与分层 -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 class="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <span
              class="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs">5</span>
            合成器 (Compositor) 与独立图层
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed">
            浏览器的渲染流水线包含一个专门的 <strong class="text-slate-800">GPU 合成器线程</strong>。
            Canvas 通常作为独立合成层（当使用 CSS <code
              class="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">will-change: transform</code> 或硬件加速时），
            其位图直接作为纹理交给合成器。合成器将多个层的纹理按照 z-index 和透明度混合，最终输出到屏幕。
            这意味着即使 Canvas 内部绘图很慢，合成阶段仍然可以平滑滚动或 CSS 动画，因为合成器无需重新光栅化 Canvas 内容。
          </p>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 class="text-base font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <span
              class="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">6</span>
            离屏 Canvas 与缓存策略
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed">
            通过 <code
              class="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">document.createElement('canvas')</code> 创建离屏
            Canvas，
            可以将多次绘制的结果缓存为一张图像纹理。主画布通过 <code
              class="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">drawImage</code>
            复用这些缓存纹理，大幅减少每帧的重绘命令。这本质上就是手动实现类似于 GPU 纹理缓存的思想。
          </p>
          <div class="mt-3 bg-slate-50 rounded-lg p-3 text-xs text-slate-600 font-mono">
            // 示例：缓存复杂图形<br />
            const offscreen = new OffscreenCanvas(200, 200);<br />
            const ctx = offscreen.getContext('2d');<br />
            // ... 复杂的绘制操作 ...<br />
            mainCtx.drawImage(offscreen, 0, 0);
          </div>
        </div>
      </section>

      <!-- 5. 补充：Canvas 2D 与 WebGL/WebGPU 的关系 -->
      <section class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="text-xl">🧩</span> Canvas 2D、WebGL、WebGPU 的层级关系
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div class="p-4 border border-indigo-100 rounded-xl bg-indigo-50/30">
            <h4 class="font-medium text-indigo-700 mb-2">Canvas 2D</h4>
            <p class="text-slate-600">高层 API，使用类似画家的范式。浏览器负责选择软/硬件实现。适合图表、图像编辑等。</p>
          </div>
          <div class="p-4 border border-cyan-100 rounded-xl bg-cyan-50/30">
            <h4 class="font-medium text-cyan-700 mb-2">WebGL (OpenGL ES)</h4>
            <p class="text-slate-600">直接暴露 GPU 渲染管线，需要手动编写着色器。提供更精细的控制，3D 图形、高性能 2D 游戏常用。</p>
          </div>
          <div class="p-4 border border-emerald-100 rounded-xl bg-emerald-50/30">
            <h4 class="font-medium text-emerald-700 mb-2">WebGPU (下一代)</h4>
            <p class="text-slate-600">更现代的 GPU 接口，支持计算着色器、更低的 CPU 开销。与 Direct3D 12 / Metal / Vulkan 对齐。</p>
          </div>
        </div>
        <p class="text-xs text-slate-500 mt-4">
          实际上，现代浏览器的 Canvas 2D 实现内部可能部分使用 WebGL（或原生 GL 指令）来加速。例如，Skia 的 GPU 后端通过 OpenGL/Direct3D 发送指令。
          因此，Canvas 2D 可以看作是 WebGL/GPU 能力的一种高度封装的子集。
        </p>
      </section>

    </main>

    <!-- 底部 -->
    <footer class="border-t border-slate-200 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-xs text-slate-400">
        Canvas 底层原理 · 从 CPU 到 GPU 的图形管线
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 纯静态展示页面，无需额外逻辑
</script>

<style scoped>
code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
}
</style>
