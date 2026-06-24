<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">WebSocket</h1><p class="text-sm text-slate-500 mt-1">实时双向通信——聊天、游戏、通知推送</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-13-websocket.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-13</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔌</span>gorilla/websocket</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Go WebSocket ≈ <strong>Node.js 的 ws 库 / Socket.IO 的 server 端</strong>——HTTP 升级为 WebSocket 后，双向收发消息。</p></aside>
        <div class="mb-4"><Code language="go" :code="code" title="websocket.go" /></div>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-12-cors-rate-limit" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：CORS/限流</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-14-graceful-shutdown" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：优雅关停 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"WebSocket"}]
const code = `import "github.com/gorilla/websocket"
var upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}
// HTTP 升级为 WebSocket
func wsHandler(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil { return }
    defer conn.Close()
    for {
        msgType, msg, err := conn.ReadMessage()  // 读
        if err != nil { break }
        conn.WriteMessage(msgType, msg)           // 回写（echo）
    }
}
// Gin 版本
r.GET("/ws", func(c *gin.Context) {
    conn, _ := upgrader.Upgrade(c.Writer, c.Request, nil)
    defer conn.Close()
    for { _, msg, _ := conn.ReadMessage(); conn.WriteMessage(websocket.TextMessage, msg) }
})`
</script>
