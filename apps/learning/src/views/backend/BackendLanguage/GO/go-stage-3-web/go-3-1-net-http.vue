<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">net/http 标准库</h1><p class="text-sm text-slate-500 mt-1">Go 的 HTTP 服务器——不用框架，标准库就够了</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-1-net-http.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-1</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🌐</span>Hello World HTTP 服务器</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Go 的 net/http ≈ <strong>Node.js 的 http 模块 + Express 的路由</strong>——标准库自带生产级 HTTP 服务器，不需要 Nginx 反向代理。<code class="bg-purple-100 px-1 rounded text-xs font-mono">http.HandleFunc</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">app.get()</code>。</p></aside>
        <div class="mb-4"><Code language="go" :code="helloCode" title="hello_http.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Handler 接口——Go HTTP 的核心抽象</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">整个 net/http 基于一个接口：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">http.Handler</code>——只有一个方法 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">ServeHTTP(ResponseWriter, *Request)</code>。这就是 Go HTTP 的"中间件模式"——所有东西都是 Handler。</p>
        <div class="mb-4"><Code language="go" :code="handlerCode" title="handler_interface.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ Handler 接口的威力：</strong>因为所有东西都是 Handler，你可以像搭积木一样<strong>嵌套 Handler</strong>——日志 Handler 包裹 认证 Handler 包裹 业务 Handler。这就是中间件的本质。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>ServeMux——路由匹配</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">http.ServeMux</code> 是 Go 的标准路由器。Go 1.22+ 支持<strong>方法匹配</strong>（GET/POST）和<strong>路径参数</strong>（{id}）。</p>
        <div class="mb-4"><Code language="go" :code="muxCode" title="servemux.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>http.Server——生产级配置</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">http.ListenAndServe</code> 是快速原型，生产环境用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">http.Server</code> 结构体——可以配置超时、TLS、最大 Header 大小。</p>
        <div class="mb-4"><Code language="go" :code="serverCode" title="production_server.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Handler 接口 = Go HTTP 的全部</strong>——一个方法 ServeHTTP，所有东西都是 Handler</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Go 1.22+ ServeMux 支持方法匹配和路径参数——小项目不需要 Gin</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>生产环境用 http.Server 配置超时，不用 ListenAndServe</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-13-goroutine-leak" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：goroutine 泄漏</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-2-request-response" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：请求与响应 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"Hello HTTP"},{id:"sec-2",name:"Handler接口"},{id:"sec-3",name:"ServeMux"},{id:"sec-4",name:"生产配置"},{id:"sec-5",name:"小结"}]
const helloCode = `package main
import ("fmt"; "net/http")
func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
    })
    http.ListenAndServe(":8080", nil)  // 阻塞，监听 8080
}
// curl localhost:8080/world → Hello, world!`

const handlerCode = `// Handler 接口——整个 net/http 的基石
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
// 自定义 Handler——任何实现了 ServeHTTP 的类型都可以
type myHandler struct{}
func (h myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "custom handler")
}
// http.Handle("/custom", myHandler{})
// HandleFunc 是语法糖——把普通函数转为 Handler`

const muxCode = `// Go 1.22+ ServeMux 支持方法路由
mux := http.NewServeMux()
mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")   // 提取路径参数
    fmt.Fprintf(w, "User ID: %s", id)
})
mux.HandleFunc("POST /users", func(w http.ResponseWriter, r *http.Request) {
    // 创建用户
})
http.ListenAndServe(":8080", mux)`

const serverCode = `srv := &http.Server{
    Addr:         ":8080",
    Handler:      mux,
    ReadTimeout:  5 * time.Second,   // 读取请求超时
    WriteTimeout: 10 * time.Second,  // 写响应超时
    IdleTimeout:  120 * time.Second, // Keep-Alive 超时
    MaxHeaderBytes: 1 << 20,         // 1MB
}
log.Fatal(srv.ListenAndServe())`
</script>
