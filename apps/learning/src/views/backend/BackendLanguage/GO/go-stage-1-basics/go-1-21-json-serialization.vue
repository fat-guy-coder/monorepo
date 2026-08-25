<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📦 JSON 序列化（encoding/json）</h1>
          <p class="text-sm text-slate-500 mt-1">前后端数据交换的核心技能 —— Marshal / Unmarshal / 流式处理</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-21-json-serialization.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-21</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 为什么需要 JSON -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要 JSON
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          JSON（JavaScript Object Notation）是当下<strong>互联网最通用的数据交换格式</strong>——它只有两种容器（对象/数组）和四种标量（字符串/数字/布尔/null），却能把任何程序语言里的数据结构表达出来。
          Go 后端里 JSON 几乎<strong>无处不在</strong>：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">后端 API</td><td class="px-4 py-2 border">HTTP 接口的请求体/响应体，浏览器 fetch 就能直接读</td></tr>
              <tr><td class="px-4 py-2 border">配置文件</td><td class="px-4 py-2 border">应用配置用 <code class="bg-slate-100 px-1 rounded font-mono text-xs">.json</code> 存，启动时读进结构体</td></tr>
              <tr><td class="px-4 py-2 border">日志</td><td class="px-4 py-2 border">每行一个 JSON 对象的 NDJSON，方便 ELK 等工具解析</td></tr>
              <tr><td class="px-4 py-2 border">微服务通信</td><td class="px-4 py-2 border">服务之间 RPC/HTTP 传数据，标准协议就是 JSON</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="json" :code="whyJsonCode" title="一个典型的后端 API 响应" /></div>
        <p class="text-slate-600 leading-relaxed">
          前端拿到它用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">JSON.parse</code>，Go 后端用
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">json.Unmarshal</code>——<strong>这就是本文要讲的核心</strong>：
          在 Go 的强类型世界里，怎么把 JSON 字节 ↔ Go 结构体互相转换。
        </p>
      </section>

      <!-- 2. Marshal / Unmarshal 基础 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          Marshal / Unmarshal 基础
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">函数</th><th class="px-4 py-2 border border-slate-200 font-semibold">方向</th><th class="px-4 py-2 border border-slate-200 font-semibold">签名</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">json.Marshal</td><td class="px-4 py-2 border">Go 结构体 → JSON 字节</td><td class="px-4 py-2 border font-mono text-xs">Marshal(v any) ([]byte, error)</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">json.Unmarshal</td><td class="px-4 py-2 border">JSON 字节 → Go 结构体</td><td class="px-4 py-2 border font-mono text-xs">Unmarshal(data []byte, v any) error</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          最基础的三条规则：<strong>① 只处理导出字段</strong>（首字母大写）；<strong>② 默认 JSON key = 字段名本身</strong>；
          <strong>③ Unmarshal 必须传指针</strong>（否则改不到调用方的变量）。下面是完整往返演示：
        </p>
        <div class="mb-4"><Code language="go" :code="marshalBasicCode" title="marshal-unmarshal.go — 结构体完整往返" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 零值处理：</strong>默认<strong>零值字段也会被序列化</strong>（空字符串、0、null）。想「零值就省掉」要用第 3 节的 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">omitempty</code>。</p>
        </aside>
      </section>

      <!-- 3. json tag 详解 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          json tag 详解：让字段名对上接口文档
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          真实接口文档里几乎都是<strong>驼峰/蛇形小写</strong>（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">created_at</code>），而 Go 字段是
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Since</code>。用 struct tag 把两者映射起来——这也是 Go 最有特色的「编译期映射」能力：
        </p>
        <div class="mb-4"><Code language="go" :code="tagCode" title="tag.go — 五种常用 tag 写法" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">tag</th><th class="px-4 py-2 border border-slate-200 font-semibold">作用</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">json:"name"</td><td class="px-4 py-2 border">重命名 key，输出成 name</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">json:"name,omitempty"</td><td class="px-4 py-2 border">零值（"" / 0 / false / nil）时省略该字段</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">json:"-"</td><td class="px-4 py-2 border">完全忽略——序列化和反序列化都跳过</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">json:"ratio,string"</td><td class="px-4 py-2 border">数字转成 JSON 字符串（兼容前端精度）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">json:"created_at"</td><td class="px-4 py-2 border">自定义字段名，驼峰/蛇形自由</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ tag 语法：</strong>在 Go 源码里 tag 用<strong>反引号</strong>包裹，例如 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">\`json:"name"\`</code>——拼错一个字母（如 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">omitempty</code> 写成 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">omitemptyy</code>）不会报编译错，只是<strong>静默不生效</strong>。</p>
        </aside>
      </section>

      <!-- 4. 处理各种类型 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          处理各种类型：map / slice / 嵌套 / RawMessage / any
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          不是所有场景都有现成结构体。动态结构用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">map</code>，多层嵌套自动递归，字段未知先
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">json.RawMessage</code> 兜住原样 JSON：
        </p>
        <div class="mb-4"><Code language="go" :code="typesCode" title="types.go — 五种常用容器" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 反序列化到 any 时：</strong>所有 JSON 数字都会变成 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">float64</code>（不是 int！），大整数会丢精度。要保留原文用第 6 节的 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">UseNumber()</code>。</p>
        </aside>
      </section>

      <!-- 5. 自定义序列化 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          自定义序列化：实现 MarshalJSON / UnmarshalJSON
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          通过实现 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">MarshalJSON() ([]byte, error)</code> 和
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">UnmarshalJSON([]byte) error</code> 两个方法，可以<strong>完全接管</strong>某个类型的编解码。
          最典型的就是<strong>时间格式</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.Time</code> 默认输出 RFC3339
          （<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">2026-08-25T10:30:00+08:00</code>），前端往往想要
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">2026-08-25 10:30:00</code>：
        </p>
        <div class="mb-4"><Code language="go" :code="customTimeCode" title="custom-time.go — 自定义时间格式" /></div>
        <div class="mb-4"><Code language="go" :code="customPhoneCode" title="custom-phone.go — 兼容字符串数字读入" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 应用场景：</strong>自定义时间格式、敏感字段加解密（<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">MarshalJSON</code> 里先加密再输出）、数据库 int 与接口字符串互转（<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">UnmarshalJSON</code> 里 Atoi）。方法签名里的错误必须返回，序列化失败会沿着调用链往上抛。</p>
        </aside>
      </section>

      <!-- 6. 流式处理 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          流式处理：Decoder / Encoder
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">json.Marshal</code> 会把<strong>整个结果一次性放内存</strong>。几 MB 的日志文件没问题，但 GB 级数据或内存紧张的服务就要用
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">json.NewDecoder</code>/<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">json.NewEncoder</code>——<strong>边读边解、边写边编</strong>，内存占用恒定。
        </p>
        <div class="mb-4"><Code language="text" :code="ndjsonCode" title="log.json — 每行一个 JSON 对象（NDJSON）" /></div>
        <div class="mb-4"><Code language="go" :code="streamCode" title="stream.go — 逐条 Decode + 严格模式 + 大整数" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 什么时候用流式：</strong>解析大文件、逐条处理日志、HTTP 响应用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">json.NewDecoder(r.Body)</code> / <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">json.NewEncoder(w)</code>。返回 JSON 时用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Encode</code> 还能省掉一次 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Marshal</code> 到内存的过程。</p>
        </aside>
      </section>

      <!-- 7. 执行流程拆解 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          执行流程拆解：Marshal / Unmarshal 内部发生了什么
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>JSON 序列化 = 用反射（reflect）遍历结构体。</strong>看懂下面两步，你就能预测任何 struct 的输出结果：
        </p>
        <div class="mb-4"><Code language="text" :code="flowCode" title="Marshal(u) 的执行路径" /></div>
        <p class="text-slate-600 mb-2 leading-relaxed"><strong>Marshal 的顺序：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">reflect.ValueOf(v)</code> 拿到值的反射句柄</li>
          <li>按<strong>字段声明顺序</strong>逐个遍历结构体字段</li>
          <li>读字段的 json tag 决定 key（没有 tag 就用字段名）；<code class="bg-slate-100 px-1 rounded font-mono text-xs">omitempty</code> 先判断零值是否要跳过</li>
          <li>对字段值<strong>递归编码</strong>（字段本身是结构体/切片就再走一遍）；未导出字段直接跳过</li>
          <li>拼接成 JSON 字节；缩进、HTML 转义（<code class="bg-slate-100 px-1 rounded font-mono text-xs">&lt;</code> → <code class="bg-slate-100 px-1 rounded font-mono text-xs"><</code>）在编码器层处理</li>
        </ol>
        <p class="text-slate-600 mb-2 leading-relaxed"><strong>Unmarshal 是上述过程的完全逆向：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>解析 JSON 的 key/value 流</li>
          <li>对每个 key，用反射找到目标结构体里对应字段（同样靠 json tag）</li>
          <li>按目标字段的类型把 JSON 值<strong>转换</strong>进内存（数字→int、字符串→string…）</li>
          <li>JSON 里多余的 key 默认被忽略；目标字段没对应的 JSON key 就保持零值</li>
        </ol>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么必须传指针：</strong>反射要在<strong>原变量上写值</strong>，只有拿到地址（<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">&u</code>）才能改到调用方手里的那块内存；传值只是拷贝，改了也没人看到。</p>
        </aside>
      </section>

      <!-- 8. 前端类比 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          🔗 前端类比：JSON.stringify / JSON.parse
        </h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">json.Marshal</code> ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">JSON.stringify</code>，<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">json.Unmarshal</code> ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">JSON.parse</code>——方向完全一致。<br/>
          关键区别：JS 是<strong>动态类型</strong>，parse 出来是什么就是什么；Go 是<strong>强类型</strong>，Unmarshal 必须告诉它「我要什么类型」（传 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">&struct</code>），它按目标类型逐字段转换。Go 的 struct tag（<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">json:"name"</code>）是<strong>编译期的字段↔key 映射</strong>——JS 做不到，TypeScript 也没有等价物。
          </p>
        </aside>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">对比项</th><th class="px-4 py-2 border border-slate-200 font-semibold">Go</th><th class="px-4 py-2 border border-slate-200 font-semibold">JS/TS</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">序列化</td><td class="px-4 py-2 border font-mono text-xs">json.Marshal(u)</td><td class="px-4 py-2 border font-mono text-xs">JSON.stringify(obj)</td></tr>
              <tr><td class="px-4 py-2 border">反序列化</td><td class="px-4 py-2 border font-mono text-xs">json.Unmarshal(b, &u)</td><td class="px-4 py-2 border font-mono text-xs">JSON.parse(b)</td></tr>
              <tr><td class="px-4 py-2 border">目标类型</td><td class="px-4 py-2 border">必须显式指定（强类型）</td><td class="px-4 py-2 border">不指定，天然动态</td></tr>
              <tr><td class="px-4 py-2 border">字段映射</td><td class="px-4 py-2 border">struct tag，编译期生效</td><td class="px-4 py-2 border">无；TS 只有 interface 类型检查，无运行时映射</td></tr>
              <tr><td class="px-4 py-2 border">错误处理</td><td class="px-4 py-2 border">返回 error，必须检查</td><td class="px-4 py-2 border">parse 失败 throw，try-catch</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 9. 常见错误与陷阱 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          常见错误与陷阱
        </h2>
        <div class="mb-4"><Code language="go" :code="errCode" title="errors.go — 五个高频坑" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 ①：未导出字段被静默忽略。</strong>结构体里小写字段 marshal 后直接消失，<strong>编译器不报任何错</strong>——字段「不翼而飞」往往这时候才被发现。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 ②：Unmarshal 传值/传错类型。</strong>必须传指针。传给非指针会编译报错；传 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">nil</code> 指针会运行时 panic。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 ③：[]byte 会编码成 base64。</strong>切片字段（图片、二进制）会被转成 base64 字符串，不是你以为的数组——需要二进制的场景考虑 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">string</code> 或 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">json.RawMessage</code>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 ④：忽略 Unmarshal 错误。</strong>配置/接口解析失败不检查 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">err</code>，程序带着一堆零值继续跑——线上事故最常见温床。</p>
        </aside>
      </section>

      <!-- 10. 反模式 + 经验法则 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">10</span>
          反模式 + 经验法则
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold">✅ 推荐</th><th class="px-4 py-2 border border-slate-200 font-semibold">❌ 反模式</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">接口字段稳定、已知</td><td class="px-4 py-2 border">struct + json tag（有类型安全、能 omitempty）</td><td class="px-4 py-2 border">map[string]any 到处断言，容易写错类型</td></tr>
              <tr><td class="px-4 py-2 border">结构动态、字段未知</td><td class="px-4 py-2 border">map[string]any 兜底</td><td class="px-4 py-2 border">硬写 struct 结果字段丢失还不知道</td></tr>
              <tr><td class="px-4 py-2 border">嵌套灵活、部分字段想延后解析</td><td class="px-4 py-2 border">json.RawMessage 先原样保留</td><td class="px-4 py-2 border">全部提前 Unmarshal，动一处全要改</td></tr>
              <tr><td class="px-4 py-2 border">大 JSON / 逐条日志</td><td class="px-4 py-2 border">json.NewDecoder 流式</td><td class="px-4 py-2 border">Marshal 一次性全读进内存</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>① 对外 API 一律用 struct + tag，字段名对齐接口文档；② 解析到的错误<strong>一次都不能吞</strong>，至少 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">log</code> 一下；③ 序列化之前想清楚输出里要不要暴露内部字段（用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">json:"-"</code> 藏好密码/密钥）。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端对照：</strong>Go 的「struct 是稳定 schema」≈ 前端把 API 响应先定义成 TS interface 再强转；「map 兜底」≈ 直接 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">JSON.parse</code> 后访问任意字段。能定类型就定类型，定不了再兜底——两边思路一模一样。</p>
        </aside>
      </section>

      <!-- 11. 小结 -->
      <section id="sec-11" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>json.Marshal</strong> 结构体→字节；<strong>json.Unmarshal</strong> 字节→结构体（必须传指针）；只处理导出字段</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>json tag</strong> 是编译期字段↔key 映射：重命名、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">omitempty</code>、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">-</code>、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">,string</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>动态结构用 <strong>map</strong>，未知嵌套用 <strong>json.RawMessage</strong> 延迟解析；<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">any</code> 里数字是 float64</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>实现 <strong>MarshalJSON / UnmarshalJSON</strong> 可完全接管编解码——自定义时间格式、加解密、int↔string</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Decoder / Encoder</strong> 流式处理大 JSON，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">DisallowUnknownFields</code> 严格校验、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">UseNumber</code> 保大整数精度</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>底层靠 <strong>reflect</strong> 遍历字段（Marshal）与逆向（Unmarshal）——所以传指针、按声明顺序、tag 决定 key</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>五个坑：未导出字段、非指针、tag 拼错、[]byte→base64、吞错误——都能静默出错，务必逐个排查</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-20-generics" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：泛型 Generics</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-22-reflection" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：反射 reflect →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "为什么需要 JSON" },
  { id: "sec-2", name: "Marshal / Unmarshal 基础" },
  { id: "sec-3", name: "json tag 详解" },
  { id: "sec-4", name: "处理各种类型" },
  { id: "sec-5", name: "自定义序列化" },
  { id: "sec-6", name: "流式处理" },
  { id: "sec-7", name: "执行流程拆解" },
  { id: "sec-8", name: "🔗 前端类比" },
  { id: "sec-9", name: "常见错误与陷阱" },
  { id: "sec-10", name: "反模式 + 经验法则" },
  { id: "sec-11", name: "小结" },
]

const whyJsonCode = `{
  "code": 0,
  "message": "ok",
  "data": {
    "id": 1001,
    "name": "张三",
    "roles": ["admin", "editor"]
  }
}`

const marshalBasicCode = `// ① Marshal：Go 结构体 → JSON 字节流
type User struct {
    Name  string
    Age   int
    Email string
}

func main() {
    u := User{Name: "张三", Age: 18, Email: "zs@example.com"}

    // 序列化：struct → []byte
    bytes, err := json.Marshal(u)
    if err != nil {
        panic(err)
    }
    fmt.Println(string(bytes))
    // 输出: {"Name":"张三","Age":18,"Email":"zs@example.com"}
    //       ↑ 默认 key = 字段名（首字母大写原样输出）

    // 反序列化：[]byte → struct（必须传指针！）
    var u2 User
    if err := json.Unmarshal(bytes, &u2); err != nil {
        panic(err)
    }
    fmt.Printf("%+v\\n", u2)
    // 输出: {Name:张三 Age:18 Email:zs@example.com}

    // 零值字段：没有 omitempty 时原样输出
    empty := User{}
    b, _ := json.Marshal(empty)
    fmt.Println(string(b))
    // 输出: {"Name":"","Age":0,"Email":""}
}`

const tagCode = `type Config struct {
    Name    string  ` + "`json:\"name\"`" + `              // 重命名：JSON key 用 name
    Version int     ` + "`json:\"version,omitempty\"`" + ` // 零值 0 → 整个字段省略
    Secret  string  ` + "`json:\"-\"`" + `                 // 忽略：序列化/反序列化都跳过
    Ratio   float64 ` + "`json:\"ratio,string\"`" + `      // 数字输出成 JSON 字符串
    Since   string  ` + "`json:\"created_at\"`" + `        // 蛇形命名，对齐前端/其他语言
}

cfg := Config{Name: "app", Secret: "hunter2", Ratio: 3.14, Since: "2026-01-01"}
b, _ := json.Marshal(cfg)
fmt.Println(string(b))
// 输出: {"name":"app","ratio":"3.14","created_at":"2026-01-01"}
//       ↑ Version=0 被 omitempty 省掉；Secret 被 - 忽略；Ratio 变成字符串 "3.14"`

const typesCode = `// ① map：key 必须是 string（或可转 string 的类型）
m := map[string]any{"name": "张三", "scores": []int{90, 85}}
b, _ := json.Marshal(m)
fmt.Println(string(b))
// 输出: {"name":"张三","scores":[90,85]}

// ② slice / 数组：整体编码成一个 JSON 数组
type Item struct {
    Name string
    Qty  int
}
items := []Item{{Name: "剑", Qty: 2}, {Name: "盾", Qty: 1}}
b, _ = json.Marshal(items)
fmt.Println(string(b))
// 输出: [{"Name":"剑","Qty":2},{"Name":"盾","Qty":1}]

// ③ 嵌套结构体：字段值是另一个结构体，递归编码
type Order struct {
    ID    int
    Items []Item
}
o := Order{ID: 7, Items: items}
b, _ = json.Marshal(o)
fmt.Println(string(b))
// 输出: {"ID":7,"Items":[{"Name":"剑","Qty":2},{"Name":"盾","Qty":1}]}

// ④ json.RawMessage：先原样保留 JSON，之后再决定怎么解析（延迟解析）
var raw = []byte("{\\\"id\\\":1,\\\"meta\\\":{\\\"x\\\":1}}")
var tmp struct {
    ID   int
    Meta json.RawMessage ` + "`json:\"meta\"`" + `
}
json.Unmarshal(raw, &tmp)
fmt.Println(string(tmp.Meta))
// 输出: {"x":1}

// ⑤ 反序列化到 any：数字默认变 float64，大整数会丢精度
var data any
json.Unmarshal([]byte("{\\\"a\\\":1,\\\"b\\\":[2,3]}"), &data)
m2 := data.(map[string]any)
fmt.Println(m2["a"].(float64))            // 输出: 1   ← float64 而非 int
fmt.Println(m2["b"].([]any)[0].(float64)) // 输出: 2`

const customTimeCode = `// time.Time 默认序列化成 RFC3339（如 2026-08-25T10:30:00+08:00）
type Event struct {
    Name string
    At   time.Time
}
e := Event{Name: "发布", At: time.Date(2026, 8, 25, 10, 30, 0, 0, time.Local)}
b, _ := json.Marshal(e)
fmt.Println(string(b))
// 输出: {"Name":"发布","At":"2026-08-25T10:30:00+08:00"}

// 自定义类型：想让时间输出成 "2006-01-02 15:04:05" 这种格式
const timeFmt = "2006-01-02 15:04:05"

type MyTime time.Time

// MarshalJSON 接管序列化：返回一个合法的 JSON 字符串片段（带引号）
func (t MyTime) MarshalJSON() ([]byte, error) {
    return json.Marshal(time.Time(t).Format(timeFmt)) // json.Marshal 负责加引号和转义
}

// UnmarshalJSON 接管反序列化：从 JSON 字符串还原回 MyTime
func (t *MyTime) UnmarshalJSON(data []byte) error {
    var s string
    if err := json.Unmarshal(data, &s); err != nil {
        return err
    }
    parsed, err := time.Parse(timeFmt, s)
    if err != nil {
        return err
    }
    *t = MyTime(parsed)
    return nil
}

type Article struct {
    Title string
    Pub   MyTime
}
a := Article{Title: "JSON 实战", Pub: MyTime(time.Now())}
b, _ = json.Marshal(a)
fmt.Println(string(b))
// 输出: {"Title":"JSON 实战","Pub":"2026-08-25 10:30:00"}
//       ↑ 自定义格式生效；反序列化时自动按 timeFmt 解析`

const customPhoneCode = `// 场景：数据库字段是 int，但前端约定传字符串数字 "10086"
type Phone struct {
    Num int
}

func (p *Phone) UnmarshalJSON(data []byte) error {
    var s string
    if err := json.Unmarshal(data, &s); err != nil {
        return json.Unmarshal(data, &p.Num) // 兼容直接传纯数字 10086
    }
    n, err := strconv.Atoi(s)
    if err != nil {
        return err
    }
    p.Num = n
    return nil
}

var ph Phone
// strconv.Quote 给字符串加双引号，恰好等于合法的 JSON 字符串
json.Unmarshal([]byte(strconv.Quote("10086")), &ph)
fmt.Println(ph.Num)
// 输出: 10086`

const ndjsonCode = `{"level":"info","msg":"start"}
{"level":"error","msg":"boom"}
{"level":"info","msg":"done"}`

const streamCode = `// 生产场景：一个 JSON 文件里每行一个独立对象（NDJSON 日志），逐条处理
f, err := os.Open("log.json")
if err != nil {
    log.Fatal(err)
}
defer f.Close()

dec := json.NewDecoder(f) // 流式解码：边读边解，不一次性加载整个文件
for {
    var line map[string]string
    if err := dec.Decode(&line); err != nil {
        if err == io.EOF { // 文件读完了
            break
        }
        log.Fatal(err)
    }
    fmt.Println(line["level"], line["msg"])
}
// 输出: info start
//       error boom
//       info done

// 严格模式：拒绝未知字段（防接口字段拼写错误）
dec = json.NewDecoder(strings.NewReader("{\\\"name\\\":\\\"a\\\",\\\"hack\\\":1}"))
dec.DisallowUnknownFields()
var p struct {
    Name string ` + "`json:\"name\"`" + `
}
if err := dec.Decode(&p); err != nil {
    fmt.Println(err)
}
// 输出: json: unknown field "hack"

// UseNumber：大整数不转 float64，原样保留数字文本（防精度丢失）
dec = json.NewDecoder(strings.NewReader("{\\\"id\\\":9007199254740993}"))
dec.UseNumber()
var m map[string]any
dec.Decode(&m)
fmt.Println(m["id"].(json.Number))
// 输出: 9007199254740993`

const flowCode = `Marshal(u) 的执行路径
┌────────────────────────────────────────────────────┐
│ reflect.ValueOf(u)                                 │
│   ├─ 遍历 struct 字段（按声明顺序）                  │
│   │    ├─ 读 json tag 决定 key（没有就用字段名）     │
│   │    ├─ omitempty 判断零值是否跳过                │
│   │    └─ 递归编码字段值 → 拼装 key:value           │
│   └─ 得到 []byte                                   │
│        （缩进 / HTML 转义在编码器层处理）             │
└────────────────────────────────────────────────────┘`

const errCode = `// ❌ 错误 1：未导出字段（小写开头）被静默忽略
type Person struct {
    Name string
    age  int // 小写！Marshal/Unmarshal 都会跳过它
}
b, _ := json.Marshal(Person{Name: "A", age: 25})
fmt.Println(string(b))
// 输出: {"Name":"A"}   ← age 悄悄消失了，编译器不报错

// ❌ 错误 2：Unmarshal 必须传指针
var u User
json.Unmarshal([]byte(data), u) // 传值 → 编译报错（类型不匹配）
// json.Unmarshal 期望 *User，传 User 编译不过

// ❌ 错误 3：json tag 拼写错误 → 字段读不进
type User2 struct {
    Age int ` + "`json:\"agee\"`" + ` // 前端传 "age"，这里写 "agee" → Age 永远是 0
}
// ✅ 检查清单：tag 名字和前端/接口文档逐字对齐

// ❌ 错误 4：[]byte 会被编码成 base64 字符串
type File struct {
    Data []byte ` + "`json:\"data\"`" + `
}
b, _ = json.Marshal(File{Data: []byte{1, 2, 3}})
fmt.Println(string(b))
// 输出: {"data":"AQID"}   ← base64，不是 [1,2,3]

// ❌ 错误 5：忽略 Unmarshal 错误 → 零值数据被静默使用
var cfg struct {
    Port int
}
json.Unmarshal([]byte("not-json"), &cfg) // 返回 error，却被忽略了！
fmt.Println(cfg.Port)
// 输出: 0   ← 配置没读到，程序带着默认零值跑起来（生产事故温床）

// ✅ 正确姿势：错误必须处理
if err := json.Unmarshal([]byte("not-json"), &cfg); err != nil {
    log.Fatalf("解析配置失败: %v", err)
}`
</script>
