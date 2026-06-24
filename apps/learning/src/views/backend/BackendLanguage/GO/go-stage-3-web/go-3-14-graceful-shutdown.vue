<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">优雅关停</h1><p class="text-sm text-slate-500 mt-1">Graceful Shutdown——不丢请求、不断连接</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-14-graceful-shutdown.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-14</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🛑</span>生产级关停</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Graceful Shutdown ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">process.on('SIGTERM', async () => { await server.close(); process.exit(0) })</code>——收到停止信号后处理完当前请求再退出。K8s/Docker 发 SIGTERM 后等 30s。</p></aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="graceful.go" /></div>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-13-websocket" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：WebSocket</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-15-template-embed" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：模板与embed →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"优雅关停"}]
const basicCode = `// 监听 OS 信号
ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
defer stop()
<-ctx.Done()  // 阻塞直到 Ctrl+C
// 10 秒超时——防止请求卡死
shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
srv.Shutdown(shutdownCtx)  // 优雅关停`
</script>
