<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">路由与 URL 参数</h1><p class="text-sm text-slate-500 mt-1">路径参数 · Query 参数 · 表单参数——Gin 的参数提取</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-3-routing-url.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-3</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔗</span>三种参数来源</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">c.Param("id")</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">req.params.id</code> · <code class="bg-purple-100 px-1 rounded text-xs font-mono">c.Query("page")</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">req.query.page</code> · <code class="bg-purple-100 px-1 rounded text-xs font-mono">c.PostForm("name")</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">req.body.name</code>。</p></aside>
        <div class="mb-4"><Code language="go" :code="paramCode" title="params.go" /></div>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-2-request-response" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：请求与响应</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-4-middleware" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：中间件 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"三种参数"}]
const paramCode = `// 1. 路径参数 /users/:id
r.GET("/users/:id", func(c *gin.Context) {
    id := c.Param("id")       // "123"
})
// 2. Query 参数 ?page=1&size=10
r.GET("/users", func(c *gin.Context) {
    page := c.DefaultQuery("page", "1")
    size := c.Query("size")
})
// 3. POST Form 参数
r.POST("/login", func(c *gin.Context) {
    username := c.PostForm("username")
    password := c.DefaultPostForm("remember", "false")
})
// 4. 路径通配 /static/*filepath
r.GET("/static/*filepath", func(c *gin.Context) {
    path := c.Param("filepath") // "/css/style.css"
})`
</script>
