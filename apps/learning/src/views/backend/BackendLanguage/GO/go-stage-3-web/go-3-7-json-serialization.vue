<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">JSON 序列化</h1><p class="text-sm text-slate-500 mt-1">Marshal/Unmarshal · struct tag · 自定义格式——Go 的 JSON 处理</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/web/go-3-7-json-serialization.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-7</span></div></div></header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：struct ↔ JSON 的字段映射</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json.Marshal</code> 把结构体<strong>序列化</strong>成 JSON 字符串（struct → JSON，绿箭头）；<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json.Unmarshal</code> 反序列化回来（JSON → struct，橙箭头）。
          每个字段用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json:"名字,选项"</code> 标签控制映射：改名、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">omitempty</code> 省略零值、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">-</code> 忽略、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">string</code> 数字转字符串。
        </p>

        <figure>
          <svg viewBox="0 0 720 290" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="js-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
              <marker id="js-o" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" /></marker>
            </defs>

            <!-- 左：Go 结构体 -->
            <rect x="20" y="58" width="230" height="190" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="40" y="80" font-size="13" font-family="monospace" font-weight="bold" fill="#0369a1">Go 结构体 User</text>
            <!-- 字段行 -->
            <rect x="32" y="92" width="206" height="32" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
            <text x="42" y="106" font-size="11" font-family="monospace" fill="#0f172a">Name  string</text>
            <text x="42" y="118" font-size="9" font-family="monospace" fill="#64748b">json:"name"</text>
            <rect x="32" y="132" width="206" height="32" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
            <text x="42" y="146" font-size="11" font-family="monospace" fill="#0f172a">Age  int</text>
            <text x="42" y="158" font-size="9" font-family="monospace" fill="#64748b">json:"age"</text>
            <rect x="32" y="172" width="206" height="32" rx="4" fill="#ffffff" stroke="#ef4444" stroke-width="1" />
            <text x="42" y="186" font-size="11" font-family="monospace" fill="#b91c1c">Password  string</text>
            <text x="42" y="198" font-size="9" font-family="monospace" fill="#b91c1c">json:"-"（忽略）</text>
            <rect x="32" y="212" width="206" height="32" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
            <text x="42" y="226" font-size="11" font-family="monospace" fill="#0f172a">Score  float64</text>
            <text x="42" y="238" font-size="9" font-family="monospace" fill="#64748b">json:"score,string"</text>

            <!-- 右：JSON -->
            <rect x="460" y="58" width="240" height="190" rx="8" fill="#fefce8" stroke="#eab308" stroke-width="1.5" />
            <text x="480" y="80" font-size="13" font-family="monospace" font-weight="bold" fill="#854d0e">JSON 字符串</text>
            <text x="480" y="106" font-size="12" font-family="monospace" fill="#0f172a">"name" : "Alice"</text>
            <text x="480" y="146" font-size="12" font-family="monospace" fill="#0f172a">"age"  : 25</text>
            <text x="480" y="186" font-size="12" font-family="monospace" fill="#94a3b8">（字段被省略）</text>
            <text x="480" y="226" font-size="12" font-family="monospace" fill="#0f172a">"score" : "95.5"</text>

            <!-- Marshal 箭头（绿） -->
            <line x1="250" y1="100" x2="460" y2="100" stroke="#4ade80" stroke-width="2" marker-end="url(#js-g)" />
            <line x1="250" y1="140" x2="460" y2="140" stroke="#4ade80" stroke-width="2" marker-end="url(#js-g)" />
            <text x="355" y="86" text-anchor="middle" font-size="10" font-family="monospace" fill="#15803d">json.Marshal →</text>
            <!-- Password 无箭头，红叉 -->
            <text x="355" y="194" text-anchor="middle" font-size="16" font-family="monospace" fill="#ef4444" font-weight="bold">✗</text>
            <line x1="250" y1="220" x2="460" y2="220" stroke="#4ade80" stroke-width="2" marker-end="url(#js-g)" />

            <!-- Unmarshal 箭头（橙） -->
            <line x1="520" y1="262" x2="270" y2="262" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4" marker-start="url(#js-o)" />
            <text x="395" y="278" text-anchor="middle" font-size="10" font-family="monospace" fill="#b45309">← json.Unmarshal（反序列化）</text>

            <text x="20" y="286" font-size="10" font-family="monospace" fill="#64748b">绿=序列化 struct→JSON · 橙=反序列化 JSON→struct · string 选项让数字在 JSON 里变成带引号的字符串</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：struct tag 决定字段映射——Name→"name"、Age→"age"、Password 因 json:"-" 被忽略、Score 因 string 选项变成 "95.5"</figcaption>
        </figure>
      </section>

      <!-- 1. Marshal 基础 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Marshal / Unmarshal——JSON 的编码解码</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
        Go 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">json.Marshal</code> ≈ <strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">JSON.stringify()</code></strong>，<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">json.Unmarshal</code> ≈ <strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">JSON.parse()</code></strong>。<br/>
        区别：JS 里对象结构天然就是 JSON，随手用；Go 是强类型，必须先把 JSON 映射到结构体，编译器帮你检查字段类型。
        </p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">两个核心函数都在标准库 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">encoding/json</code>：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json.Marshal(v)</code> 返回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[]byte</code>；<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json.Unmarshal(data, &v)</code> 解析进结构体。注意 Unmarshal 必须传<strong>指针</strong>。Marshal 只序列化<strong>导出的字段</strong>（大写开头）。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">Marshal 前可以先用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">json.MarshalIndent(v, "", "  ")</code> 得到缩进版，方便调试</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">实际传输用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">json.Marshal</code>——紧凑、省带宽</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">Gin 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">c.JSON</code> 底层就是 Marshal + 写响应</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="basicCode" title="json_basic.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>Marshal/Unmarshal 都可能返回 error，<strong>永远检查 err</strong>。解析外部数据（API 请求、文件）时，用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">json.Decoder</code> 还能拿到精确的行号/类型错误。</p></aside>
      </section>

      <!-- 2. struct tag -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Struct Tag——JSON 映射的核心</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">struct tag 的完整格式：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json:"字段名,选项"</code>。字段名不写则用 Go 字段原名。常用选项：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">omitempty</code>（零值省略）、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">-</code>（忽略）、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">string</code>（数字/布尔转字符串）、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">omitempty</code> 也可与 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">-`</code> 组合成 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json:"-,omitempty"</code>（参与反序列化但不参与序列化）。</p>
        <div class="mb-4"><Code language="go" :code="tagCode" title="struct_tag.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">标签写法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">作用</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">例子</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">json:"name"</td><td class="px-4 py-2 border">改名为 name</td><td class="px-4 py-2 border">Name → "name"</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">json:"-"</td><td class="px-4 py-2 border">完全忽略</td><td class="px-4 py-2 border">Password → 不出现</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">json:"age,omitempty"</td><td class="px-4 py-2 border">零值时省略</td><td class="px-4 py-2 border">Age=0 → 无 "age"</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">json:"score,string"</td><td class="px-4 py-2 border">数字转字符串</td><td class="px-4 py-2 border">95.5 → "95.5"</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">json:",omitempty"</td><td class="px-4 py-2 border">只省略，不改名</td><td class="px-4 py-2 border">沿用字段名</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑 1：</strong><code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">omitempty</code> 对 struct 值不生效（空结构体不算零值），要用<strong>指针</strong> <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">*Address</code> 才能省略。对 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">map</code>、<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">slice</code> 也只省略 nil，不省略空的非 nil。</p></aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑 2：</strong><code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">string</code> 选项只在序列化时转字符串；<strong>反序列化时数字字符串能转回数值</strong>（"95.5" → 95.5），但纯字符串字段不会反过来变成数字。别用它存身份证这种想保持原样的长数字——会被科学计数法搞坏，那种情况用 string 类型。</p></aside>
      </section>

      <!-- 3. 类型映射 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>Go 类型 ↔ JSON 类型映射</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Go 类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">JSON 类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">bool</td><td class="px-4 py-2 border">boolean</td><td class="px-4 py-2 border">true</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">string</td><td class="px-4 py-2 border">string</td><td class="px-4 py-2 border">"go"</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">int / float64</td><td class="px-4 py-2 border">number</td><td class="px-4 py-2 border">25 / 3.14</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">[]T</td><td class="px-4 py-2 border">array</td><td class="px-4 py-2 border">[1,2,3]</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">map[string]T</td><td class="px-4 py-2 border">object</td><td class="px-4 py-2 border">{"a":1}</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">struct</td><td class="px-4 py-2 border">object</td><td class="px-4 py-2 border">{"x":1}</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">nil</td><td class="px-4 py-2 border">null</td><td class="px-4 py-2 border">null</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">time.Time</td><td class="px-4 py-2 border">string（RFC3339）</td><td class="px-4 py-2 border">"2026-08-20T10:00:00+08:00"</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="nestCode" title="nested.go" /></div>
        <p class="text-slate-600 text-sm">匿名嵌入（embedded struct）字段会<strong>提升</strong>到外层并默认拍平序列化——这是组织复杂模型的常用手法。</p>
      </section>

      <!-- 4. 流式 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>Decoder / Encoder——流式处理大 JSON</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json.Marshal</code> 一次性把整个对象变成字节切片，大对象会占大量内存。<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json.NewEncoder / NewDecoder</code> 支持<strong>流式</strong>读写：从 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">io.Reader</code> 读、往 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">io.Writer</code> 写，一次处理一条，内存占用恒定。处理 JSONL（每行一个 JSON 对象）日志文件、超大响应时必备。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">打开文件/网络流 → <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">json.NewDecoder(reader)</code></div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">循环 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">dec.Decode(&obj)</code>，处理一条、丢弃一条</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">dec.More()</code> 判断流里是否还有下一个值；遇到 EOF 用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">io.EOF</code> 判断结束</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="streamCode" title="stream.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>超大 JSON 响应（几十 MB 的列表）用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Decoder.Decode</code> 边读边处理，<strong>不要整个读进内存</strong>。需要"只取某个字段不管其他"时，先 Unmarshal 进 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">map[string]json.RawMessage</code>，保留原始字节延迟解析。</p></aside>
      </section>

      <!-- 5. 自定义 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>自定义 Marshal/Unmarshal——time.Time 与特殊格式</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">实现了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json.Marshaler</code>（<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">MarshalJSON() ([]byte, error)</code>）和 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json.Unmarshaler</code>（<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">UnmarshalJSON([]byte) error</code>）接口的类型可以<strong>完全自定义 JSON 表示</strong>。最常见的用途是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">time.Time</code>——默认输出 RFC3339，想输出 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">2006-01-02 15:04:05</code> 就要包一层自定义类型。</p>
        <div class="mb-4"><Code language="go" :code="customCode" title="custom_json.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑 1：</strong>自定义类型定义成 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">type CustomTime time.Time</code> 后，<strong>失去了 time.Time 的方法</strong>（Format、Add 等），用前要转回 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">time.Time(ct)</code>。</p></aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑 2：</strong>在 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">MarshalJSON</code> 里再调 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">json.Marshal(ct)</code> 会<strong>无限递归</strong>（又调用自己的 MarshalJSON）。解法：先转成基础类型 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">time.Time(ct)</code> 或用<strong>类型别名</strong> <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">type Alias CustomTime</code> 避开方法。</p></aside>
      </section>

      <!-- 6. 错误处理 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>错误处理与边界</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">JSON 解析的错误信息在 Go 里<strong>极其详细</strong>（类型断言 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*json.SyntaxError</code> 还能拿到行号/偏移）。常见错误：语法错误、类型不匹配（<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*json.UnmarshalTypeError</code>）、把 nil 传给 Unmarshal（<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*json.InvalidUnmarshalError</code>）。</p>
        <div class="mb-4"><Code language="go" :code="errCode" title="json_errors.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>Web 接口反序列化失败返回 400，并区分「请求体为空」「JSON 语法错」「字段类型错」三种情况给前端提示；<strong>未知字段默认被忽略</strong>，想严格拒绝用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Decoder.DisallowUnknownFields()</code>。</p></aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>动画演示：Marshal 逐字段生成 JSON</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点「▶ 开始 Marshal」观察 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json.Marshal</code> 如何按 struct tag 逐个字段生成 JSON 字符串——
          每个字段高亮后，右侧输出串增长一位；<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json:"-"</code> 的 Password 被跳过。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📦 字段数: {{ sf.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ Marshal O(n)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doMarshal" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">▶ 开始 Marshal</button>
          <button @mousedown="resetAnim" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 左侧 struct 字段 -->
              <v-rect :config="structPanelCfg" />
              <v-text :config="structTitleCfg" />
              <v-rect v-for="(f,i) in sf" :key="'sfa'+i" :config="sfRectCfg(f,i)" />
              <v-text v-for="(f,i) in sf" :key="'sft'+i" :config="sfTextCfg(f,i)" />
              <v-text v-for="(f,i) in sf" :key="'sftg'+i" :config="sfTagCfg(f,i)" />
              <!-- 右侧输出 -->
              <v-rect :config="outPanelCfg" />
              <v-text :config="outTitleCfg" />
              <v-text :config="outTextCfg" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">json.Marshal</code> ≈ JSON.stringify，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">json.Unmarshal</code> ≈ JSON.parse（传指针！）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>struct tag 控制字段映射：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">改名 / omitempty / - / string</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>只有<strong>导出的字段</strong>（大写）会被序列化</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>大 JSON / JSONL 用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Decoder / Encoder</code> 流式处理，内存恒定</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>实现 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">MarshalJSON / UnmarshalJSON</code> 自定义格式（如时间格式化）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>错误用类型断言细分：SyntaxError / UnmarshalTypeError / InvalidUnmarshalError</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-6-gin-advanced" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Gin 进阶</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-8-file-upload-download" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：文件上传下载 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
const userStore = useUserStore()

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "Marshal 基础" },
  { id: "sec-2", name: "Struct Tag" },
  { id: "sec-3", name: "类型映射" },
  { id: "sec-4", name: "流式 Decoder/Encoder" },
  { id: "sec-5", name: "自定义序列化" },
  { id: "sec-6", name: "错误处理" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 Marshal 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(230), W = ref(700)
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref('')
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface SField { name: string; goval: string; tag: string; jsonKey: string; skip: boolean; hl: boolean }
const sf = reactive<SField[]>([
  { name: 'Name', goval: 'string', tag: 'json:"name"', jsonKey: '"name":"Alice"', skip: false, hl: false },
  { name: 'Age', goval: 'int', tag: 'json:"age"', jsonKey: '"age":25', skip: false, hl: false },
  { name: 'Score', goval: 'float64', tag: 'json:"score,string"', jsonKey: '"score":"95.5"', skip: false, hl: false },
  { name: 'Password', goval: 'string', tag: 'json:"-"', jsonKey: '', skip: true, hl: false },
])
const output = ref('')

const rowsY = [78, 118, 158, 198]
const structPanelCfg = { x: 15, y: 34, width: 250, height: 188, fill: '#f1f5f9', cornerRadius: 10, stroke: '#94a3b8', strokeWidth: 1 }
const structTitleCfg = { x: 15, y: 46, width: 250, text: 'struct User（Go）', fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: '#334155', align: 'center' }
const outPanelCfg = { x: 300, y: 34, width: 200, height: 188, fill: '#0f172a', cornerRadius: 10, stroke: '#334155', strokeWidth: 1 }
const outTitleCfg = { x: 300, y: 46, width: 200, text: 'json.Marshal 输出', fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: '#7dd3fc', align: 'center' }

function sfRectCfg(f: SField, i: number) {
  return { x: 28, y: rowsY[i], width: 224, height: 34, cornerRadius: 6,
    fill: f.hl ? C.green : (f.skip ? '#fef2f2' : '#ffffff'),
    stroke: f.hl ? '#22c55e' : (f.skip ? '#ef4444' : '#94a3b8'), strokeWidth: f.hl ? 2 : 1 }
}
function sfTextCfg(f: SField, i: number) {
  return { x: 36, y: rowsY[i] + 3, width: 110, height: 16, text: `${f.name}  ${f.goval}`,
    fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: f.skip ? '#b91c1c' : '#0f172a' }
}
function sfTagCfg(f: SField, i: number) {
  return { x: 150, y: rowsY[i] + 3, width: 100, height: 16, text: f.tag,
    fontSize: 10, fontFamily: 'monospace', fill: f.skip ? '#dc2626' : '#64748b' }
}
const outTextCfg = computed(() => ({
  x: 310, y: 72, width: 180, height: 140, text: output.value,
  fontSize: 13, fontFamily: 'monospace', fill: '#4ade80', wrap: 'word', lineHeight: 1.6,
}))

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

async function doMarshal() {
  act('Marshal 开始', async () => {
    output.value = '{'
    status.value = '遍历结构体字段（按声明顺序）'
    await d(500)
    for (let i = 0; i < sf.length; i++) {
      sf[i].hl = true
      status.value = `处理 ${sf[i].name}，tag = ${sf[i].tag}`
      await d(450)
      if (sf[i].skip) {
        status.value = `json:"-" → Password 被忽略，不输出`
        await d(600)
      } else {
        output.value += sf[i].jsonKey
        await d(450)
        output.value += ', '
        await d(220)
      }
      sf[i].hl = false
    }
    output.value = output.value.replace(/,\s*$/, '') + '}'
    status.value = `完成: ${output.value}（Password 未输出）`
    await d(1000)
    resetAnim()
    status.value = ''
  })
}

function resetAnim() { busy.value = false; output.value = ''; sf.forEach(f => f.hl = false); status.value = '' }

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const basicCode = `package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

func main() {
    u := User{Name: "Alice", Age: 25}

    // struct → JSON（序列化 / Marshal）
    b, err := json.Marshal(u)
    if err != nil {
        panic(err)
    }
    fmt.Println(string(b))   // {"name":"Alice","age":25}

    // JSON → struct（反序列化 / Unmarshal，必须传指针）
    var u2 User
    err = json.Unmarshal(b, &u2)
    if err != nil {
        panic(err)
    }
    fmt.Println(u2.Name, u2.Age)   // Alice 25
}
// 输出:
// {"name":"Alice","age":25}
// Alice 25`

const tagCode = `package main

import (
    "encoding/json"
    "fmt"
)

type Product struct {
    ID       int     \`json:"id"\`                 // 改名：id
    Name     string  \`json:"name"\`               // 改名：name
    Password string  \`json:"-"\`                  // 忽略：不序列化
    Price    float64 \`json:"price,omitempty"\`    // 零值省略
    Count    int     \`json:"count,string"\`       // 数字转字符串
}

func main() {
    p := Product{ID: 1, Name: "book", Price: 0, Count: 5}
    b, _ := json.Marshal(p)
    fmt.Println(string(b))
    // 输出: {"id":1,"name":"book","count":"5"}
    // 解释: Price=0 被 omitempty 省略；Count 变成字符串 "5"；Password 被忽略

    // string 标签反序列化同样生效：数字字符串能转回数值
    var p2 Product
    json.Unmarshal([]byte(\`{"id":2,"count":"8"}\`), &p2)
    fmt.Println(p2.Count)   // 8
}`

const nestCode = `package main

import (
    "encoding/json"
    "fmt"
)

type Address struct {
    City string \`json:"city"\`
}

type Profile struct {
    Name    string            \`json:"name"\`
    Age     int               \`json:"age"\`
    Address Address           \`json:"address"\`  // 嵌套对象
    Tags    []string          \`json:"tags"\`     // 数组
    Extra   map[string]int    \`json:"extra"\`    // map
}

func main() {
    p := Profile{
        Name: "Bob", Age: 30,
        Address: Address{City: "Hangzhou"},
        Tags:    []string{"go", "gin"},
        Extra:   map[string]int{"x": 1},
    }
    b, _ := json.Marshal(p)
    fmt.Println(string(b))
    // 输出: {"name":"Bob","age":30,"address":{"city":"Hangzhou"},"tags":["go","gin"],"extra":{"x":1}}
}

// 匿名嵌入：字段被提升，默认拍平
type Animal struct {
    Name string \`json:"name"\`
}
type Dog struct {
    Animal            // 匿名嵌入
    Age  int \`json:"age"\`
}

func demo() {
    d := Dog{Animal: Animal{Name: "旺财"}, Age: 3}
    b, _ := json.Marshal(d)
    fmt.Println(string(b))
    // 输出: {"name":"旺财","age":3}（没有多余的 animal 层，字段被提升拍平）
}`

const streamCode = `package main

import (
    "encoding/json"
    "fmt"
    "strings"
)

type User struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

func main() {
    // ① Encoder——流式写出（一条一个 JSON，适合日志/JSONL）
    var sb strings.Builder
    enc := json.NewEncoder(&sb)
    enc.Encode(User{Name: "a", Age: 1})
    enc.Encode(User{Name: "b", Age: 2})
    fmt.Print(sb.String())
    // 输出:
    // {"name":"a","age":1}
    // {"name":"b","age":2}

    // ② Decoder——流式读入（处理一串 JSON 值，内存恒定）
    data := \`{"name":"a","age":1}{"name":"b","age":2}\`
    dec := json.NewDecoder(strings.NewReader(data))
    for dec.More() {                    // 流里还有下一个值？
        var u User
        if err := dec.Decode(&u); err != nil {
            break
        }
        fmt.Println(u.Name)
    }
    // 输出:
    // a
    // b

    // ③ 超大文件流式读——不用把整个文件载入内存
    // f, _ := os.Open("huge.jsonl")
    // defer f.Close()
    // dec := json.NewDecoder(f)
    // for dec.More() {
    //     var row Record
    //     dec.Decode(&row)
    //     process(row)   // 处理一条、释放一条
    // }`

const customCode = `package main

import (
    "encoding/json"
    "fmt"
    "time"
)

// 自定义时间类型：输出 "2006-01-02 15:04:05" 格式
type CustomTime time.Time

// MarshalJSON：序列化时把 time 格式化成字符串
func (ct CustomTime) MarshalJSON() ([]byte, error) {
    t := time.Time(ct)
    return json.Marshal(t.Format("2006-01-02 15:04:05"))
}

// UnmarshalJSON：反序列化时解析字符串回 time
func (ct *CustomTime) UnmarshalJSON(b []byte) error {
    var s string
    if err := json.Unmarshal(b, &s); err != nil {
        return err
    }
    t, err := time.Parse("2006-01-02 15:04:05", s)
    if err != nil {
        return err
    }
    *ct = CustomTime(t)
    return nil
}

type Event struct {
    Title string     \`json:"title"\`
    At    CustomTime \`json:"at"\`
}

func main() {
    ev := Event{Title: "发布会", At: CustomTime(time.Date(2026, 8, 20, 10, 0, 0, 0, time.Local))}
    b, _ := json.Marshal(ev)
    fmt.Println(string(b))
    // 输出: {"title":"发布会","at":"2026-08-20 10:00:00"}

    var ev2 Event
    json.Unmarshal(b, &ev2)
    fmt.Println(time.Time(ev2.At).Format("2006-01-02 15:04:05"))
    // 输出: 2026-08-20 10:00:00
}`

const errCode = `package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

func main() {
    // ① 语法错误
    var u User
    err := json.Unmarshal([]byte("{bad json"), &u)
    fmt.Println(err)
    // 输出: invalid character 'b' looking for beginning of object key string

    // ② 类型不匹配
    var n int
    err = json.Unmarshal([]byte("\\"hello\\""), &n)
    fmt.Println(err)
    // 输出: json: cannot unmarshal string into Go value of type int

    // ③ 未导出字段不会被序列化（字段名小写）
    type T struct {
        name string   // 未导出：忽略
        Age  int      // 导出：参与
    }
    b, _ := json.Marshal(T{name: "x", Age: 3})
    fmt.Println(string(b))
    // 输出: {"Age":3}

    // ④ 细分错误类型：SyntaxError 带偏移量
    var data map[string]any
    err = json.Unmarshal([]byte("{\\"a\\":}"), &data)
    if se, ok := err.(*json.SyntaxError); ok {
        fmt.Println("语法错误在第", se.Offset, "字节处")
    }
    // 输出: 语法错误在第 7 字节处
}`
</script>
