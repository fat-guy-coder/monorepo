<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">模板与 Embed</h1><p class="text-sm text-slate-500 mt-1">html/template · embed 静态资源——Go 1.16+ 的打包利器</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-15-template-embed.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-15</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📄</span>html/template + embed</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">embed</code> ≈ <strong>Webpack 的静态资源打包</strong>——编译时把 HTML/CSS/JS 嵌入二进制，部署只需要一个可执行文件。</p></aside>
        <div class="mb-4"><Code language="go" :code="code" title="template_embed.go" /></div>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-14-graceful-shutdown" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：优雅关停</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-16-swagger" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Swagger →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"模板与embed"}]
const code = `import "embed"
//go:embed templates/*
var templateFS embed.FS
//go:embed static/*
var staticFS embed.FS

func main() {
    tmpl := template.Must(template.ParseFS(templateFS, "templates/*.html"))
    tmpl.ExecuteTemplate(w, "index.html", data)
    // 静态文件——直接 Serve
    http.Handle("/static/", http.FileServer(http.FS(staticFS)))
}
// 编译后只需一个二进制文件——不需要 templates/ 目录！`
</script>
