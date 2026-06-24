<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Gin 框架入门</h1><p class="text-sm text-slate-500 mt-1">Go 最流行的 HTTP 框架——高性能、轻量、路由强大</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-5-gin.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🟢</span>为什么用 Gin</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Gin ≈ <strong>Express.js / Vue Router</strong>——路由分组、中间件链、参数绑定。如果你用过 Express 或 Koa，Gin 的 API 会让你感觉很熟悉。比 net/http 原生的好处：<strong>更快的路由（Radix Tree）、参数验证、JSON 绑定</strong>。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">Gin 是目前 Go 生态<strong>最流行</strong>的 HTTP 框架（GitHub 80k+ stars）。它的路由基于 <strong>Radix Tree</strong>（不是正则匹配），比标准库 ServeMux 快约 <strong>40 倍</strong>。</p>
        <div class="mb-4"><Code language="go" :code="helloCode" title="gin_hello.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>路由分组（≈ Express Router / Vue Router children）</h2>
        <div class="mb-4"><Code language="go" :code="groupCode" title="gin_routes.go" /></div>
        <p class="text-slate-600 text-sm">路由分组让中间件可以<strong>作用在特定路径</strong>上——如 /admin 需要认证，/api 需要 CORS。</p>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>参数绑定——ShouldBind（≈ express.json()）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Gin 自动将<strong>请求体 JSON / 表单 / Query 参数</strong>绑定到 Go 结构体。用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">binding:"required"</code> 标签做参数校验。</p>
        <div class="mb-4"><Code language="go" :code="bindCode" title="gin_binding.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>渲染响应——JSON / XML / HTML / String</h2>
        <div class="mb-4"><Code language="go" :code="renderCode" title="gin_render.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>中间件——Gin 的洋葱模型</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Gin 中间件 ≈ <strong>Express 中间件</strong>（c.Next() ≈ next()）。执行顺序：请求 → Logger → Auth → Handler → Auth 后 → Logger 后 → 响应。</p>
        <div class="mb-4"><Code language="go" :code="middlewareCode" title="gin_middleware.go" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Gin ≈ Express.js for Go</strong>——路由分组、中间件、参数绑定</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Radix Tree 路由比标准库快 40x</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>ShouldBindJSON——自动绑定+校验，binding:"required"</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>c.Next() ≈ Express 的 next()——中间件洋葱模型</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-4-middleware" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：中间件</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-6-gin-advanced" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Gin 进阶 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"为什么Gin"},{id:"sec-2",name:"路由分组"},{id:"sec-3",name:"参数绑定"},{id:"sec-4",name:"渲染响应"},{id:"sec-5",name:"中间件"},{id:"sec-6",name:"小结"}]
const helloCode = `import "github.com/gin-gonic/gin"
func main() {
    r := gin.Default()             // 带 Logger 和 Recovery 中间件
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "pong"})
    })
    r.Run(":8080")
}`

const groupCode = `r := gin.Default()
// 公开路由
r.GET("/health", healthHandler)
// API 路由组——统一加 /api 前缀
api := r.Group("/api")
{
    api.GET("/users", listUsers)
    api.POST("/users", createUser)
}
// Admin 路由组——需认证
admin := r.Group("/admin", authMiddleware())
{
    admin.GET("/dashboard", dashboardHandler)
}`

const bindCode = `type LoginRequest struct {
    Username string ` + "`" + `json:"username" binding:"required"` + "`" + `
    Password string ` + "`" + `json:"password" binding:"required,min=6"` + "`" + `
}
func login(c *gin.Context) {
    var req LoginRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    // req.Username, req.Password 已绑定并校验
}`

const renderCode = `// JSON（最常用）
c.JSON(200, gin.H{"status": "ok"})
// 结构化 JSON
c.JSON(200, User{Name: "Alice", Age: 25})
// 错误响应
c.JSON(404, gin.H{"error": "not found"})
// XML / String / HTML / File
c.XML(200, obj); c.String(200, "hello"); c.HTML(200, "index.tmpl", data)`

const middlewareCode = `// 自定义中间件——计时
func TimerMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        c.Next()  // ← 执行下一个 Handler
        elapsed := time.Since(start)
        log.Printf("%s took %v", c.Request.URL.Path, elapsed)
    }
}
r.Use(TimerMiddleware())  // 全局中间件
// 路由级中间件
r.GET("/secure", authMiddleware(), handler)`
</script>
