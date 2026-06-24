<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Cookie 与 Session</h1><p class="text-sm text-slate-500 mt-1">Set-Cookie · 会话管理 · 安全配置</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-10-cookie-session.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-10</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🍪</span>Cookie 操作</h2>
        <div class="mb-4"><Code language="go" :code="code" title="cookie.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 安全：</strong>总是设置 <code class="bg-amber-100 px-1 rounded text-xs font-mono">HttpOnly: true</code>（JS 不能读）和 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Secure: true</code>（HTTPS only）。生产环境不要用 Cookie 存敏感数据——用 JWT 或 Server-side Session。</p></aside>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-9-restful-api" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：RESTful API</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-11-jwt-auth" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：JWT 鉴权 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"Cookie"}]
const code = `// 设置 Cookie
http.SetCookie(w, &http.Cookie{
    Name:     "session_id",
    Value:    "abc123",
    Path:     "/",
    MaxAge:   3600,        // 秒
    HttpOnly: true,        // JS 不可读
    Secure:   true,        // 仅 HTTPS
    SameSite: http.SameSiteLaxMode,
})
// 读取 Cookie
cookie, err := r.Cookie("session_id")
// Gin 写法
c.SetCookie("token", value, 3600, "/", "", true, true)
token, _ := c.Cookie("token")`
</script>
