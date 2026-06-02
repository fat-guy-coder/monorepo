<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4">
        <h1 class="text-2xl font-bold text-slate-800">JavaScript 二进制数据处理</h1>
        <p class="text-sm text-slate-500 mt-1">ArrayBuffer · TypedArray · DataView · SharedArrayBuffer</p>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">

      <!-- 为什么需要二进制 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要二进制数组？
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          JavaScript 最初设计用于处理文本，没有原生的二进制数据类型。这在与 WebGL、Canvas、WebSocket、音视频 API 等需要高性能二进制处理的场景交互时，成为瓶颈。
          <strong>ES6 引入的二进制数组</strong>填补了这个空白——直接操作内存中的原始二进制数据，无需序列化/反序列化。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">场景</th><th class="px-4 py-2 border font-semibold text-slate-700">旧方案</th><th class="px-4 py-2 border font-semibold text-slate-700">二进制数组方案</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">Canvas 像素</td><td class="px-4 py-2 border">逐个像素读写 RGBA</td><td class="px-4 py-2 border"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Uint8ClampedArray</code> 批量操作</td></tr>
              <tr><td class="px-4 py-2 border">WebSocket 消息</td><td class="px-4 py-2 border">Base64 编码/解码</td><td class="px-4 py-2 border"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">blob.arrayBuffer()</code> 直接读取</td></tr>
              <tr><td class="px-4 py-2 border">文件分片</td><td class="px-4 py-2 border">逐字节读取 FileReader</td><td class="px-4 py-2 border"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">file.slice().arrayBuffer()</code> 高效切片</td></tr>
              <tr><td class="px-4 py-2 border">Web Audio</td><td class="px-4 py-2 border">JS 数组逐个样本</td><td class="px-4 py-2 border"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Float32Array</code> 直传缓冲区</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 三大核心组件 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          三大核心组件
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">二进制数组 API 由三个独立的组件构成，各有分工：</p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">组件</th><th class="px-4 py-2 border font-semibold text-slate-700">角色</th><th class="px-4 py-2 border font-semibold text-slate-700">关键方法/属性</th></tr></thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border font-mono text-cyan-700 font-semibold">ArrayBuffer</td>
                <td class="px-4 py-2 border"><strong>内存容器</strong>——分配一块原始二进制内存。不可直接读写，只能通过视图操作。</td>
                <td class="px-4 py-2 border font-mono text-xs">new ArrayBuffer(n)、.byteLength、.slice()</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-mono text-cyan-700 font-semibold">TypedArray</td>
                <td class="px-4 py-2 border"><strong>类型化视图</strong>——以特定数值类型（Int8、Float32 等）读写缓冲区。</td>
                <td class="px-4 py-2 border font-mono text-xs">.length、.set()、.subarray()、.buffer</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-mono text-cyan-700 font-semibold">DataView</td>
                <td class="px-4 py-2 border"><strong>灵活视图</strong>——在任意偏移位置读写任意类型，可指定字节序。</td>
                <td class="px-4 py-2 border font-mono text-xs">.getInt32()、.setFloat64()、可指定 endian</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4"><Code language="js" :code="threePillarsCode" title="three_pillars.js" /></div>
      </section>

      <!-- ArrayBuffer 详解 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          ArrayBuffer —— 二进制内存容器
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          ArrayBuffer 分配一块<strong>固定大小</strong>的连续内存，所有字节初始化为 0。它本身不提供读写接口——必须通过 TypedArray 或 DataView 操作。
        </p>
        <div class="mb-4"><Code language="js" :code="arrayBufferCode" title="arraybuffer.js" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键：</strong>ArrayBuffer 是<strong>固定长度</strong>的——不能动态扩容。需要更大空间时必须创建新 Buffer 并拷贝。与 JS 数组不同，<code class="bg-amber-100 px-1 rounded text-xs font-mono">buffer[0]</code> 是 <code class="bg-amber-100 px-1 rounded text-xs font-mono">undefined</code>，不能直接索引。</p>
        </aside>
      </section>

      <!-- TypedArray 完整参考 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          TypedArray —— 11 种类型化视图
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          TypedArray 是 11 种类型化数组构造函数的统称。它们共享同一个原型链，提供一致的 API。
          选择正确的类型至关重要——它决定了<strong>内存布局、值范围和性能</strong>。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">构造函数</th><th class="px-4 py-2 border font-semibold text-slate-700">元素大小</th><th class="px-4 py-2 border font-semibold text-slate-700">取值范围</th><th class="px-4 py-2 border font-semibold text-slate-700">典型用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Int8Array</td><td class="px-4 py-2 border">1 字节</td><td class="px-4 py-2 border">-128 ~ 127</td><td class="px-4 py-2 border">有符号字节数据</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Uint8Array</td><td class="px-4 py-2 border">1 字节</td><td class="px-4 py-2 border">0 ~ 255</td><td class="px-4 py-2 border">原始字节、二进制协议</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Uint8ClampedArray</td><td class="px-4 py-2 border">1 字节</td><td class="px-4 py-2 border">0 ~ 255（钳位）</td><td class="px-4 py-2 border"><strong>Canvas ImageData 像素</strong></td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Int16Array</td><td class="px-4 py-2 border">2 字节</td><td class="px-4 py-2 border">-32,768 ~ 32,767</td><td class="px-4 py-2 border">16 位音频采样</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Uint16Array</td><td class="px-4 py-2 border">2 字节</td><td class="px-4 py-2 border">0 ~ 65,535</td><td class="px-4 py-2 border">UTF-16 码点</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Int32Array</td><td class="px-4 py-2 border">4 字节</td><td class="px-4 py-2 border">-2³¹ ~ 2³¹-1</td><td class="px-4 py-2 border">有符号索引/坐标</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Uint32Array</td><td class="px-4 py-2 border">4 字节</td><td class="px-4 py-2 border">0 ~ 4,294,967,295</td><td class="px-4 py-2 border">哈希值、大序号</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Float32Array</td><td class="px-4 py-2 border">4 字节</td><td class="px-4 py-2 border">IEEE 754 单精度</td><td class="px-4 py-2 border"><strong>WebGL 顶点/矩阵</strong></td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">Float64Array</td><td class="px-4 py-2 border">8 字节</td><td class="px-4 py-2 border">IEEE 754 双精度</td><td class="px-4 py-2 border">高精度科学计算</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">BigInt64Array</td><td class="px-4 py-2 border">8 字节</td><td class="px-4 py-2 border">-2⁶³ ~ 2⁶³-1</td><td class="px-4 py-2 border">大整数时间戳/ID</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-cyan-700 text-xs">BigUint64Array</td><td class="px-4 py-2 border">8 字节</td><td class="px-4 py-2 border">0 ~ 2⁶⁴-1</td><td class="px-4 py-2 border">无符号大整数</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">创建 TypedArray 的 4 种方式</h3>
        <div class="mb-4"><Code language="js" :code="typedCreateCode" title="typed_create.js" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">TypedArray 核心方法</h3>
        <div class="mb-4"><Code language="js" :code="typedMethodsCode" title="typed_methods.js" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 Uint8ClampedArray 的特殊行为：</strong>赋值超出 0-255 时<strong>钳位</strong>到边界，而非截断或溢出。例如 <code class="bg-blue-100 px-1 rounded text-xs font-mono">arr[0] = 300</code> 结果 <code class="bg-blue-100 px-1 rounded text-xs font-mono">255</code>，<code class="bg-blue-100 px-1 rounded text-xs font-mono">arr[0] = -10</code> 结果 <code class="bg-blue-100 px-1 rounded text-xs font-mono">0</code>。Canvas 像素操作用它最佳。</p>
        </aside>
      </section>

      <!-- DataView 详解 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          DataView —— 灵活的任意类型读写
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          DataView 可以在同一缓冲区上<strong>任意偏移位置</strong>读写任意类型，并且可以<strong>指定字节序</strong>（大端/小端）。这是 TypedArray 做不到的——TypedArray 只能读写其声明的类型，且字节序固定为平台原生序。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">字节序（Endianness）——大端 vs 小端</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          当一个值占用多个字节时，字节的排列顺序有两种：
          <strong>小端（LE）</strong>——低字节在前（x86/ARM 默认）；<strong>大端（BE）</strong>——高字节在前（网络协议标准）。
        </p>
        <div class="mb-4"><Code language="js" :code="endianCode" title="endian.js" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">DataView API</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">全部读写方法格式为 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">get/set + 类型(offset, [littleEndian])</code>，支持 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Int8/16/32, Uint8/16/32, Float32/64, BigInt64, BigUint64</code>。</p>
        <div class="mb-4"><Code language="js" :code="dataViewCode" title="dataview.js" /></div>
      </section>

      <!-- TextEncoder / TextDecoder -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          字符串 ↔ 二进制：TextEncoder / TextDecoder
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">TextEncoder</code> 将字符串编码为 UTF-8 字节数组（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Uint8Array</code>）；<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">TextDecoder</code> 将字节数组解码为字符串。这是二进制 ↔ 文本的标准桥梁。
        </p>
        <div class="mb-4"><Code language="js" :code="textCodecCode" title="text_codec.js" /></div>
      </section>

      <!-- SharedArrayBuffer -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          SharedArrayBuffer —— 跨线程共享内存
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          普通 ArrayBuffer 遵循 JS 单线程模型——被转移（transfer）后原线程失去访问权。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">SharedArrayBuffer</code> 允许<strong>多线程同时访问</strong>同一块内存（主线程 + Worker），配合 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Atomics</code> 实现无锁同步。这是 Web 多线程编程的基石。
        </p>
        <div class="mb-4"><Code language="js" :code="sharedBufferCode" title="shared_buffer.js" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 安全限制：</strong>SharedArrayBuffer 需要<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy" target="_blank" class="underline">跨域隔离</a>（COOP + COEP 响应头）才能使用，防止 Spectre 类型的时间侧信道攻击。本地开发需要配置服务器响应头。</p>
        </aside>
      </section>

      <!-- Blob / File 与二进制数组 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          Blob / File ↔ ArrayBuffer 互转
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          实际开发中经常需要在 Blob（文件/网络响应）和 ArrayBuffer 之间转换。以下是最常用的转换路径：
        </p>
        <div class="mb-4"><Code language="js" :code="blobConvertCode" title="blob_convert.js" /></div>
      </section>

      <!-- 实战：解析二进制协议 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          实战：解析一个自定义二进制协议
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          假设有一个二进制消息格式：<strong>1 字节版本 | 1 字节类型 | 4 字节时间戳 | 4 字节长度 | N 字节载荷</strong>。用 DataView 解析：
        </p>
        <div class="mb-4"><Code language="js" :code="protocolCode" title="protocol_parser.js" /></div>
      </section>

      <!-- 性能 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">10</span>
          性能对比与内存分析
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          二进制数组的性能优势来自<strong>内存布局紧凑</strong>——JS 普通数组是对象的集合，每个元素有类型标记、引用指针等开销；TypedArray 是一块连续的原生内存，CPU 缓存友好。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">对比维度</th><th class="px-4 py-2 border font-semibold text-slate-700">普通 JS 数组</th><th class="px-4 py-2 border font-semibold text-slate-700">TypedArray</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">100 万个数字的内存</td><td class="px-4 py-2 border">~32 MB（每个元素 ~32 字节）</td><td class="px-4 py-2 border">~8 MB（Float64Array，每个 8 字节）</td></tr>
              <tr><td class="px-4 py-2 border">遍历求和速度</td><td class="px-4 py-2 border">~50ms</td><td class="px-4 py-2 border">~5ms（约 10 倍快）</td></tr>
              <tr><td class="px-4 py-2 border">元素类型</td><td class="px-4 py-2 border">任意混合类型（松散）</td><td class="px-4 py-2 border">单一类型（严格）</td></tr>
              <tr><td class="px-4 py-2 border">可 resize</td><td class="px-4 py-2 border">✅ 动态增长</td><td class="px-4 py-2 border">❌ 固定大小</td></tr>
              <tr><td class="px-4 py-2 border">传递给 Web APIs</td><td class="px-4 py-2 border">需要转换/序列化</td><td class="px-4 py-2 border">直接传递零拷贝</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>如果你在处理 1000 个以上的数字，或者需要和 WebGL/Canvas/Audio 等 API 交互，就用 TypedArray。大多数 Web API（fetch、File、WebSocket）都原生支持 ArrayBuffer。</p>
        </aside>
      </section>

      <!-- 最佳实践 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          最佳实践总结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>选择合适的视图类型：</strong>网络包用 Uint8Array，WebGL 用 Float32Array，Canvas 像素用 Uint8ClampedArray，通用场景用 DataView</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>预分配 Buffer，避免频繁创建：</strong>创建 ArrayBuffer 有内存分配开销。高频场景（游戏/音视频）预分配+重用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>用 set() 批量拷贝，不用逐元素赋值：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">target.set(source, offset)</code> 是原生 memcpy，远快于循环</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>处理网络数据时显式指定字节序：</strong>网络字节序是大端（Big Endian），x86 平台是小端——用 DataView 的 endian 参数控制</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>大文件用流式 + TypedArray 分片：</strong>避免一次性将整个文件读入内存，用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">file.slice()</code> + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">.arrayBuffer()</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>TextEncoder/TextDecoder 是字符串 ↔ 二进制的标准桥梁：</strong>不要用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">String.fromCharCode()</code> 逐字节构建字符串</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>SharedArrayBuffer 内存模型需要 Atomics 保护：</strong>多线程同时写入时，用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Atomics.store/load/add/sub</code> 保证原子性，避免数据竞争</span></li>
        </ul>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { Code } from 'components'

const threePillarsCode = `// 1. ArrayBuffer — 分配 16 字节内存（容器）
const buf = new ArrayBuffer(16)
console.log(buf.byteLength) // 16

// 2. TypedArray — 以 32 位整数的视角读写（视图 A）
const int32s = new Int32Array(buf)
int32s[0] = 42
int32s[1] = -7
// buf 的前 8 字节现在存储了 42 和 -7

// 3. DataView — 在任意偏移读写任意类型（视图 B）
const view = new DataView(buf)
view.setFloat64(8, Math.PI)  // 在偏移 8 字节处写入 float64
console.log(view.getFloat64(8)) // 3.141592653589793

// 所有视图共享同一个 buf!
console.log([...new Uint8Array(buf)]) // 原始字节`

const arrayBufferCode = `// ── 创建 ArrayBuffer ──
const buf = new ArrayBuffer(8)     // 8 字节，全为 0

// 属性
console.log(buf.byteLength)        // 8

// 切片（创建新 buffer，共享底层数据？不——ArrayBuffer.slice 是拷贝）
const sliced = buf.slice(0, 4)
console.log(sliced.byteLength)     // 4

// ── ArrayBuffer 转移（零拷贝所有权转移）──
const buf2 = new ArrayBuffer(16)
const transferred = buf2.transfer() // buf2 被"分离"（detached）
console.log(buf2.byteLength)        // 0  ← 已分离
console.log(transferred.byteLength) // 16 ← 新所有者

// ── 检查是否已分离 ──
// ArrayBuffer.prototype.detached (新提案)
// 或 try { buf2.slice(0) } catch { /* detached */ }

// ── 调整大小（ES2024，需 new ArrayBuffer(n, { maxByteLength })）──
const growable = new ArrayBuffer(4, { maxByteLength: 16 })
growable.resize(8)
console.log(growable.byteLength) // 8`

const typedCreateCode = `// 方式 1：从长度创建（字节全 0）
const a = new Uint8Array(4)
console.log(a) // Uint8Array(4) [0, 0, 0, 0]

// 方式 2：从普通数组创建
const b = new Float32Array([1.5, 2.7, Math.PI])
console.log(b) // Float32Array(3) [1.5, 2.7, 3.1415...]

// 方式 3：从现有 ArrayBuffer 创建（共享内存！）
const buf = new ArrayBuffer(8)
const c = new Int32Array(buf)       // 2 个 int32（8/4=2）
c[0] = 100; c[1] = 200
const d = new Uint8Array(buf)       // 8 个 uint8（同一内存！）
console.log(d[0], d[1], d[2], d[3]) // 100, 0, 0, 0（小端）

// 方式 4：从 TypedArray 创建（拷贝数据）
const source = new Int16Array([10, 20, 30])
const copy = new Int32Array(source) // 值拷贝，类型转换
console.log(copy) // Int32Array(3) [10, 20, 30]

// 方式 5：指定 offset 和 length 的视图
const buf2 = new ArrayBuffer(16)
const sub = new Int32Array(buf2, 4, 2) // 偏移4字节，取2个int32
sub[0] = 999
console.log(new Int32Array(buf2)[1])    // 999`

const typedMethodsCode = `const arr = new Int32Array([3, 1, 4, 1, 5, 9])

// ── 属性 ──
arr.length      // 6（元素个数，非字节数）
arr.byteLength  // 24（6 × 4 字节）
arr.byteOffset  // 0
arr.buffer      // 底层 ArrayBuffer
arr.BYTES_PER_ELEMENT // 4（每个元素字节数）

// ── 遍历（与普通数组相同）──
arr.forEach(v => console.log(v))
for (const v of arr) { /*...*/ }        // for-of 支持
const doubled = arr.map(v => v * 2)     // map 返回同类型 TypedArray
const filtered = arr.filter(v => v > 3) // filter 也返回 TypedArray

// ── set() —— 批量复制（原生 memcpy）──
const dest = new Int32Array(10)
dest.set(arr, 2)  // 从 dest[2] 开始写入 arr 的全部数据
console.log(dest) // [0,0,3,1,4,1,5,9,0,0]

// ── subarray() —— 创建子视图（共享底层！）──
const sub = arr.subarray(1, 4)
console.log(sub)    // Int32Array(3) [1, 4, 1]
sub[0] = 999
console.log(arr[1]) // 999（共享底层，改了原数组！）

// ── slice() —— 拷贝新数组 ──
const cloned = arr.slice()
cloned[0] = 777
console.log(arr[0]) // 3（不受影响）

// ── 转换 ──
Array.from(arr)    // 普通数组：[3, 1, 4, ...]
[...arr]           // 同上（展开运算符）
Array.from(arr, v => v.toString(16)) // ['3', '1', '4', ...]`

const endianCode = `const buf = new ArrayBuffer(4)
const view = new DataView(buf)

// 写入同一个值，不同字节序
view.setInt32(0, 0x01020304, false) // 大端（BE, Big Endian）
console.log(new Uint8Array(buf))
// → [1, 2, 3, 4]  高字节在前

view.setInt32(0, 0x01020304, true)  // 小端（LE, Little Endian）
console.log(new Uint8Array(buf))
// → [4, 3, 2, 1]  低字节在前

// ── 检测平台字节序 ──
const isLittleEndian = new Uint8Array(
  new Uint32Array([1]).buffer
)[0] === 1
console.log(isLittleEndian) // x86 上为 true

// ── 经验 ──
// 网络包/文件格式 → 通常大端 → DataView setXxx(offset, val, false)
// 内存内计算     → 平台相关 → TypedArray（自动用平台序）
// 跨平台交换     → 显式指定 → DataView + 固定字节序`

const dataViewCode = `const buf = new ArrayBuffer(12)
const v = new DataView(buf)

// ── 写入 ──
v.setInt32(0, 0xDEADBEEF)   // 偏移 0，4 字节（默认大端）
v.setUint16(4, 0xABCD, true) // 偏移 4，2 字节（小端）
v.setFloat32(6, Math.PI)      // 偏移 6，4 字节

// ── 读取 ──
console.log(v.getInt32(0))      // 0xDEADBEEF → -559038737
console.log(v.getUint32(0))     // 0xDEADBEEF → 3735928559
console.log(v.getUint16(4, true)) // 0xABCD（小端读取）
console.log(v.getFloat32(6).toFixed(5)) // 3.14159

// ── 完整 API 列表 ──
// getInt8 / setInt8(offset, val)
// getUint8 / setUint8(offset, val)
// getInt16 / setInt16(offset, val, [littleEndian])
// getUint16 / setUint16(offset, val, [littleEndian])
// getInt32 / setInt32(offset, val, [littleEndian])
// getUint32 / setUint32(offset, val, [littleEndian])
// getFloat32 / setFloat32(offset, val, [littleEndian])
// getFloat64 / setFloat64(offset, val, [littleEndian])
// getBigInt64 / setBigInt64(offset, val, [littleEndian])
// getBigUint64 / setBigUint64(offset, val, [littleEndian])

// ── DataView vs TypedArray 选择 ──
// DataView: 同一 buffer 上混合类型 + 指定字节序 + 任意偏移
// TypedArray: 单一类型的批量操作（遍历、map、filter 等）`

const textCodecCode = `// ── TextEncoder：字符串 → UTF-8 字节 ──
const encoder = new TextEncoder()
const bytes = encoder.encode('你好, Go!')
console.log(bytes)  // Uint8Array(12)
// 中文字符各占 3 字节（UTF-8）
console.log(bytes.length) // 12（'你好,'=9 + ' Go!'=3）

// encodeInto：写入已有 buffer（不分配新内存）
const buf = new Uint8Array(20)
const result = encoder.encodeInto('Hello 世界', buf)
console.log(result) // { read: 8, written: 11 }
// read 8 个码点，写入 11 个 UTF-8 字节

// ── TextDecoder：UTF-8 字节 → 字符串 ──
const decoder = new TextDecoder()
console.log(decoder.decode(bytes)) // '你好, Go!'

// 指定编码
const sjisDecoder = new TextDecoder('shift-jis')
// 常用编码: utf-8(默认), gbk, big5, shift-jis, iso-8859-1

// 流式解码（数据分块到达时）
const streamDecoder = new TextDecoder('utf-8', { fatal: false })
const chunk1 = new Uint8Array([228, 189]) // '你' 的前 2 字节
const chunk2 = new Uint8Array([160])       // '你' 的最后 1 字节
console.log(streamDecoder.decode(chunk1, { stream: true })) // ''（不完整，缓存）
console.log(streamDecoder.decode(chunk2, { stream: true })) // '你'（完成）`

const sharedBufferCode = `// ── 主线程 ──
const sab = new SharedArrayBuffer(4096) // 4KB 共享内存
const worker = new Worker('worker.js')
worker.postMessage(sab)                 // 传递引用（不是拷贝！）

// 主线程侧操作
const sharedInts = new Int32Array(sab)
sharedInts[0] = 1
Atomics.add(sharedInts, 0, 5)  // 原子加法：1 + 5 = 6
console.log(sharedInts[0])     // 6

// ── worker.js ──
// self.onmessage = (e) => {
//   const sab = e.data
//   const view = new Int32Array(sab)
//   Atomics.add(view, 0, 10)  // 原子加法：6 + 10 = 16
// }

// ── Atomics 核心 API ──
// Atomics.add(typedArray, index, value)      // 原子 +=
// Atomics.sub(typedArray, index, value)      // 原子 -=
// Atomics.store(typedArray, index, value)    // 原子存
// Atomics.load(typedArray, index)            // 原子取
// Atomics.compareExchange(arr, i, old, new)  // CAS（比较并交换）
// Atomics.wait(arr, i, value[, timeout])     // 等待值变化（阻塞）
// Atomics.notify(arr, i[, count])            // 唤醒等待者

// ── 配置 COOP/COEP 响应头（需要 HTTPS 或 localhost）──
// Cross-Origin-Opener-Policy: same-origin
// Cross-Origin-Embedder-Policy: require-corp`

const blobConvertCode = `// ── Blob → ArrayBuffer ──
const blob = new Blob(['hello binary'], { type: 'text/plain' })
const ab1 = await blob.arrayBuffer()

// ── File（Blob 子类）→ ArrayBuffer ──
// <input type="file"> 或拖拽获取
const file = event.target.files[0]
const chunk = file.slice(0, 1024)         // 只读前 1KB
const ab2 = await chunk.arrayBuffer()

// ── ArrayBuffer → Blob ──
const ab = new Uint8Array([72, 73]).buffer
const newBlob = new Blob([ab], { type: 'application/octet-stream' })

// ── fetch → ArrayBuffer ──
const response = await fetch('/api/data')
const ab3 = await response.arrayBuffer()

// ── WebSocket 二进制消息 ──
// ws.binaryType = 'arraybuffer'
// ws.onmessage = (e) => {
//   const data = new Uint8Array(e.data)  // 直接是 ArrayBuffer
// }

// ── ArrayBuffer → Base64 ──
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++)
    binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}
// 注意：大文件用流式分块，避免 call stack 溢出

// ── Base64 → ArrayBuffer ──
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++)
    bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}`

const protocolCode = `// 二进制协议：解析 MIDI 文件头
// MIDI 头格式: "MThd" + 4字节长度 + 2字节格式 + 2字节轨道数 + 2字节时间刻度

function parseMidiHeader(buffer: ArrayBuffer) {
  const v = new DataView(buffer)

  // 读取 4 字节标识符（ASCII）
  const type = String.fromCharCode(
    v.getUint8(0), v.getUint8(1), v.getUint8(2), v.getUint8(3)
  )
  if (type !== 'MThd') throw new Error('不是有效的 MIDI 文件')

  const length   = v.getUint32(4)   // 头部长度（大端）
  const format   = v.getUint16(8)   // 格式 0/1/2
  const tracks   = v.getUint16(10)  // 轨道数
  const division = v.getUint16(12)  // 时间刻度

  console.log(\`格式: \${format}, 轨道: \${tracks}, 刻度: \${division}\`)
  console.log(\`前 16 个原始字节: \${[...new Uint8Array(buffer, 0, 16)]}\`)

  return { type, format, tracks, division, headerLength: 8 + length }
}

// ── 通用二进制消息解析器（生产级模板）──
class BinaryParser {
  private view: DataView
  private offset = 0

  constructor(buffer: ArrayBuffer) { this.view = new DataView(buffer) }

  readUint8()  { return this.view.getUint8(this.offset++) }
  readUint16() { const v = this.view.getUint16(this.offset); this.offset += 2; return v }
  readUint32() { const v = this.view.getUint32(this.offset); this.offset += 4; return v }
  readString(len: number) {
    let s = ''
    for (let i = 0; i < len; i++) s += String.fromCharCode(this.readUint8())
    return s
  }
  get remaining() { return this.view.byteLength - this.offset }
}

// 使用
const parser = new BinaryParser(buffer)
const header = {
  version: parser.readUint8(),
  msgType: parser.readUint8(),
  timestamp: parser.readUint32(),
}
console.log(header)
// 注意: 生产环境用 ts-proto/protobuf-ts 等专业库，此处仅为原理演示`
</script>
