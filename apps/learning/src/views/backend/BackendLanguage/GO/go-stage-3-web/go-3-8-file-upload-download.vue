<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">文件上传与下载</h1><p class="text-sm text-slate-500 mt-1">单文件/多文件上传 · 静态服务 · 流式下载</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-8-file-upload-download.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-8</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📁</span>上传与下载</h2>
        <div class="mb-4"><Code language="go" :code="code" title="file.go" /></div>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-7-json-serialization" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：JSON</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-9-restful-api" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：RESTful API →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"上传与下载"}]
const code = `// 单文件上传
func upload(c *gin.Context) {
    file, err := c.FormFile("file")
    if err != nil { c.JSON(400, gin.H{"error": "no file"}); return }
    c.SaveUploadedFile(file, "./uploads/"+file.Filename)
}
// 多文件上传
form, _ := c.MultipartForm()
for _, f := range form.File["photos"] { c.SaveUploadedFile(f, "./uploads/"+f.Filename) }
// 文件下载
c.File("./uploads/" + c.Param("filename"))
// 静态文件服务
r.Static("/static", "./public")`
</script>
