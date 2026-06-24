<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Swagger 文档</h1><p class="text-sm text-slate-500 mt-1">OpenAPI 自动生成——swaggo/swag</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-16-swagger.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-16</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📖</span>swaggo/swag——注释生成文档</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Swagger ≈ <strong>TS 的 tsoa / NestJS 的 @ApiProperty 装饰器</strong>——在代码注释中写 API 文档，自动生成 Swagger UI 页面。≈ <strong>Express 的 swagger-jsdoc</strong>。</p></aside>
        <div class="mb-4"><Code language="go" :code="code" title="swagger.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">安装与使用</h3>
        <div class="mb-4"><Code language="bash" :code="installCode" title="install.sh" /></div>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-15-template-embed" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：模板与Embed</RouterLink><span class="text-slate-300">阶段 3 完成！下一阶段：数据库与存储 →</span></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"Swagger"}]
const code = `// @title           My API
// @version         1.0
// @host            localhost:8080
// @BasePath        /api
func main() { ... }

// @Summary      获取用户列表
// @Description  返回所有用户
// @Tags         users
// @Produce      json
// @Success      200  {array}   User
// @Router       /users [get]
func listUsers(c *gin.Context) { ... }

// 🚀 访问 http://localhost:8080/swagger/index.html`

const installCode = `go install github.com/swaggo/swag/cmd/swag@latest
swag init      # 扫描注释，生成 docs/
go run main.go # 访问 /swagger/index.html`
</script>
