<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">RESTful API 设计</h1><p class="text-sm text-slate-500 mt-1">资源命名 · 状态码 · 版本控制——生产级 API 设计规范</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-9-restful-api.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-9</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>RESTful 核心原则</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>RESTful API ≈ <strong>前端的路由规范</strong>——就像你约定 pages/users/[id].vue 的目录结构，RESTful 约定 URL 的命名和 HTTP 方法的使用。</p></aside>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">操作</th><th class="px-4 py-2 border font-semibold text-slate-700">HTTP 方法</th><th class="px-4 py-2 border font-semibold text-slate-700">URL</th><th class="px-4 py-2 border font-semibold text-slate-700">行为</th></tr></thead><tbody class="text-slate-600 font-mono text-xs"><tr><td class="px-4 py-2 border">列表</td><td class="px-4 py-2 border text-cyan-600">GET</td><td class="px-4 py-2 border">/users</td><td class="px-4 py-2 border">获取用户列表</td></tr><tr><td class="px-4 py-2 border">详情</td><td class="px-4 py-2 border text-cyan-600">GET</td><td class="px-4 py-2 border">/users/:id</td><td class="px-4 py-2 border">获取单个用户</td></tr><tr><td class="px-4 py-2 border">创建</td><td class="px-4 py-2 border text-amber-600">POST</td><td class="px-4 py-2 border">/users</td><td class="px-4 py-2 border">创建新用户</td></tr><tr><td class="px-4 py-2 border">更新</td><td class="px-4 py-2 border text-amber-600">PUT/PATCH</td><td class="px-4 py-2 border">/users/:id</td><td class="px-4 py-2 border">全量/部分更新</td></tr><tr><td class="px-4 py-2 border">删除</td><td class="px-4 py-2 border text-red-600">DELETE</td><td class="px-4 py-2 border">/users/:id</td><td class="px-4 py-2 border">删除用户</td></tr></tbody></table></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>统一响应格式</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">所有 API 返回<strong>统一结构</strong>——前端不需要猜测不同接口的响应格式。你的后端就是这种格式。</p>
        <div class="mb-4"><Code language="go" :code="respCode" title="response_format.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>完整 CRUD 示例</h2>
        <div class="mb-4"><Code language="go" :code="crudCode" title="crud_example.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>HTTP 状态码速查</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">码</th><th class="px-4 py-2 border font-semibold text-slate-700">含义</th><th class="px-4 py-2 border font-semibold text-slate-700">何时使用</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">200</td><td class="px-4 py-2 border">OK</td><td class="px-4 py-2 border">GET/PUT 成功</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">201</td><td class="px-4 py-2 border">Created</td><td class="px-4 py-2 border">POST 创建成功</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">204</td><td class="px-4 py-2 border">No Content</td><td class="px-4 py-2 border">DELETE 成功，无返回体</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">400</td><td class="px-4 py-2 border">Bad Request</td><td class="px-4 py-2 border">参数校验失败</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">401</td><td class="px-4 py-2 border">Unauthorized</td><td class="px-4 py-2 border">未登录/token 过期</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">404</td><td class="px-4 py-2 border">Not Found</td><td class="px-4 py-2 border">资源不存在</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">500</td><td class="px-4 py-2 border">Internal Error</td><td class="px-4 py-2 border">服务器内部错误</td></tr></tbody></table></div>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-8-file-upload-download" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：文件上传下载</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-10-cookie-session" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Cookie/Session →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"REST原则"},{id:"sec-2",name:"统一响应"},{id:"sec-3",name:"CRUD示例"},{id:"sec-4",name:"状态码"}]
const respCode = `// 统一响应格式——你的后端就用这个格式
type Response struct {
    Code    int         ` + "`" + `json:"code"` + "`" + `
    Message string      ` + "`" + `json:"message"` + "`" + `
    Data    interface{} ` + "`" + `json:"data,omitempty"` + "`" + `
}
func Success(c *gin.Context, data interface{}) {
    c.JSON(200, Response{Code: 0, Message: "ok", Data: data})
}
func Error(c *gin.Context, code int, msg string) {
    c.JSON(code, Response{Code: code, Message: msg})
}`

const crudCode = `func SetupUserRoutes(r *gin.RouterGroup) {
    users := r.Group("/users")
    {
        users.GET("", listUsers)           // GET  /users
        users.GET("/:id", getUser)         // GET  /users/123
        users.POST("", createUser)         // POST /users
        users.PUT("/:id", updateUser)      // PUT  /users/123
        users.DELETE("/:id", deleteUser)   // DELETE /users/123
    }
}
func listUsers(c *gin.Context) {
    // page := c.DefaultQuery("page", "1")
    users := db.FindAll()
    Success(c, users)
}
func getUser(c *gin.Context) {
    id := c.Param("id")
    user, err := db.FindByID(id)
    if err != nil { Error(c, 404, "not found"); return }
    Success(c, user)
}`
</script>
