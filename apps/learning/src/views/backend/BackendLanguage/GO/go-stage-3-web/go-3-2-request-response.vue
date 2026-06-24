<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">请求与响应</h1><p class="text-sm text-slate-500 mt-1">*http.Request / http.ResponseWriter 详解</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-2-request-response.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📥</span>*http.Request——请求对象</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">*http.Request</code> ≈ <strong>Express 的 req 对象</strong>——包含 URL、Header、Body、Query 参数、Method。所有你需要知道的请求信息都在这里。</p></aside>
        <div class="mb-4"><Code language="go" :code="reqCode" title="request.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📤</span>ResponseWriter——写响应</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">响应必须按顺序：先写 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Header()</code>，再 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">WriteHeader(status)</code>，最后 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Write(body)</code>。<strong>顺序错了 Header 不生效。</strong></p>
        <div class="mb-4"><Code language="go" :code="respCode" title="response.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>读取 Body——JSON/Form/文件</h2>
        <div class="mb-4"><Code language="go" :code="bodyCode" title="read_body.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ r.Body 只能读一次！</strong>如果需要多次读（如中间件日志 + Handler），用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">io.ReadAll</code> 读完后 <code class="bg-amber-100 px-1 rounded text-xs font-mono">r.Body = io.NopCloser(bytes.NewReader(body))</code> 重置。</p></aside>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-1-net-http" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：net/http</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-3-routing-url" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：路由与URL →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"*Request"},{id:"sec-2",name:"ResponseWriter"},{id:"sec-3",name:"读取Body"}]
const reqCode = `func handler(w http.ResponseWriter, r *http.Request) {
    // URL 和路由
    path := r.URL.Path          // /users/123
    query := r.URL.Query()      // ?name=alice&age=25
    name := query.Get("name")   // "alice"
    // Header
    auth := r.Header.Get("Authorization")
    contentType := r.Header.Get("Content-Type")
    // Method
    if r.Method == "GET" { ... }
    // 客户端 IP
    ip := r.RemoteAddr
}`

const respCode = `func handler(w http.ResponseWriter, r *http.Request) {
    // 1. 先设 Header
    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("X-Custom", "value")
    // 2. 再写状态码（默认 200）
    w.WriteHeader(201)
    // 3. 最后写 Body
    w.Write([]byte(` + "`" + `{"status":"created"}` + "`" + `))
}`

const bodyCode = `// 1. 读 JSON Body
var user User
if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
    http.Error(w, "invalid json", 400); return
}
// 2. 读 Form 表单
r.ParseForm()
username := r.FormValue("username")
// 3. 读文件上传
file, header, err := r.FormFile("avatar")`
</script>
