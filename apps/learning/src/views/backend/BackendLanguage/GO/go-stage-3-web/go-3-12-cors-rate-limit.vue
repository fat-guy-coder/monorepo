<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">CORS 与限流</h1><p class="text-sm text-slate-500 mt-1">跨域处理 · 令牌桶限流——API 安全标配</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-12-cors-rate-limit.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-12</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🌍</span>CORS——跨域资源共享</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>CORS ≈ <strong>前端的跨域限制</strong>。浏览器阻止 <code class="bg-purple-100 px-1 rounded text-xs font-mono">localhost:5173</code> 请求 <code class="bg-purple-100 px-1 rounded text-xs font-mono">localhost:8080</code>，除非后端返回 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Access-Control-Allow-Origin</code> 头。Gin 用 <code class="bg-purple-100 px-1 rounded text-xs font-mono">gin-contrib/cors</code> 中间件解决。</p></aside>
        <div class="mb-4"><Code language="go" :code="corsCode" title="cors.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⏱️</span>限流——令牌桶算法</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">golang.org/x/time/rate</code> 的令牌桶——每秒允许 N 个请求，突发允许 M 个。</p>
        <div class="mb-4"><Code language="go" :code="limitCode" title="rate_limit.go" /></div>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-11-jwt-auth" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：JWT 鉴权</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-13-websocket" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：WebSocket →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"CORS"},{id:"sec-2",name:"限流"}]
const corsCode = `import "github.com/gin-contrib/cors"
r.Use(cors.New(cors.Config{
    AllowOrigins: []string{"http://localhost:5173"},
    AllowMethods: []string{"GET","POST","PUT","DELETE","OPTIONS"},
    AllowHeaders: []string{"Origin","Content-Type","Authorization"},
    AllowCredentials: true,
    MaxAge: 12 * time.Hour,
}))`

const limitCode = `import "golang.org/x/time/rate"
func RateLimit(r rate.Limit, b int) gin.HandlerFunc {
    limiters := sync.Map{}  // 每个 IP 一个 limiter
    return func(c *gin.Context) {
        ip := c.ClientIP()
        lim, _ := limiters.LoadOrStore(ip, rate.NewLimiter(r, b))
        if !lim.(*rate.Limiter).Allow() {
            c.JSON(429, gin.H{"error": "too many requests"}); c.Abort(); return
        }
        c.Next()
    }
}
r.Use(RateLimit(10, 20))  // 每秒 10 个请求，突发 20`
</script>
