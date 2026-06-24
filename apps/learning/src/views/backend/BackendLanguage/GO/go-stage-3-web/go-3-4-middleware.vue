<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">中间件</h1><p class="text-sm text-slate-500 mt-1">责任链模式——Go HTTP 的洋葱模型</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-4-middleware.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🧅</span>中间件 = 洋葱模型</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Go 中间件 ≈ <strong>Express 中间件 / Vue Router 的 beforeEach</strong>——请求穿过一层层中间件，每层做：日志/认证/限流/修改上下文。<code class="bg-purple-100 px-1 rounded text-xs font-mono">c.Next()</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">next()</code>。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">中间件的本质：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">func(http.Handler) http.Handler</code>——接受 Handler，返回 Handler。像搭积木一样嵌套。</p>
        <div class="mb-4"><Code language="go" :code="basicCode" title="middleware.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>四种常用中间件</h2>
        <div class="mb-4"><Code language="go" :code="fourCode" title="common_middlewares.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 顺序很重要：</strong>Recovery（最外层）→ Logger → Auth → RateLimit → <strong>业务 Handler（最内层）</strong>。</p></aside>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-3-routing-url" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：路由与URL</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-5-gin" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Gin 框架 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"洋葱模型"},{id:"sec-2",name:"四种中间件"}]
const basicCode = `// 中间件本质：接受 Handler，返回 Handler
func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)  // ← 调用下一个 Handler
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}
// 使用——像搭积木一样嵌套
mux.Handle("/api/", Logger(Auth(apiHandler)))`

const fourCode = `// 1. Logger——记录请求日志
func Logger(next http.Handler) http.Handler { ... }
// 2. Auth——JWT 认证
func Auth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if !validate(token) { http.Error(w, "unauthorized", 401); return }
        next.ServeHTTP(w, r)
    })
}
// 3. CORS——跨域
func CORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        if r.Method == "OPTIONS" { w.WriteHeader(204); return }
        next.ServeHTTP(w, r)
    })
}
// 4. Recovery——防 panic
func Recovery(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() { if e := recover(); e != nil { http.Error(w, "internal error", 500) } }()
        next.ServeHTTP(w, r)
    })
}`
</script>
