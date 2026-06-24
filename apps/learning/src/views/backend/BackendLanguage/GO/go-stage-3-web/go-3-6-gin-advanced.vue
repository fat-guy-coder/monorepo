<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Gin 进阶</h1><p class="text-sm text-slate-500 mt-1">参数验证 · 错误处理 · 日志——生产级 Gin 配置</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-6-gin-advanced.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-6</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">✅</span>参数验证——go-playground/validator</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Gin 的 validator ≈ <strong>TypeScript 的 Zod / Yup</strong>——在结构体标签上声明验证规则（required、min、max、email），ShouldBind 时自动校验。</p></aside>
        <div class="mb-4"><Code language="go" :code="validateCode" title="validate.go" /></div>
      </section>
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>自定义 Logger + 错误处理中间件</h2>
        <div class="mb-4"><Code language="go" :code="loggerCode" title="logger.go" /></div>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-5-gin" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Gin 入门</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-7-json-serialization" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：JSON 序列化 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"参数验证"},{id:"sec-2",name:"Logger/错误处理"}]
const validateCode = `type CreateUserReq struct {
    Name  string ` + "`" + `json:"name" binding:"required,min=2,max=50"` + "`" + `
    Email string ` + "`" + `json:"email" binding:"required,email"` + "`" + `
    Age   int    ` + "`" + `json:"age" binding:"gte=0,lte=150"` + "`" + `
}
func createUser(c *gin.Context) {
    var req CreateUserReq
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()}); return
    }
    // req 已通过验证
}`

const loggerCode = `// 自定义 Logger 格式
func Logger() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        c.Next()
        log.Printf("[%d] %s %s %v", c.Writer.Status(), c.Request.Method, c.Request.URL.Path, time.Since(start))
    }
}
// 全局错误处理
func Recovery() gin.HandlerFunc {
    return func(c *gin.Context) {
        defer func() {
            if err := recover(); err != nil {
                log.Printf("panic: %v", err)
                c.JSON(500, gin.H{"error": "internal server error"})
            }
        }()
        c.Next()
    }
}`
</script>
