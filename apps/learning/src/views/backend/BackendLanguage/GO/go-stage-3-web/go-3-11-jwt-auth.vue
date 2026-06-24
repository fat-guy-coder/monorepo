<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">JWT 鉴权</h1><p class="text-sm text-slate-500 mt-1">Access Token + Refresh Token——生产级认证方案</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-11-jwt-auth.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-11</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔐</span>双 Token 模式</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>JWT ≈ <strong>加密的 session cookie</strong>——服务器不需要存 session，token 本身包含用户信息。Access Token ≈ <strong>15分钟有效期的门禁卡</strong>，Refresh Token ≈ <strong>7天的续期凭证</strong>。你的后端用的就是这个模式。</p></aside>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700"></th><th class="px-4 py-2 border font-semibold text-slate-700">Access Token</th><th class="px-4 py-2 border font-semibold text-slate-700">Refresh Token</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">有效期</td><td class="px-4 py-2 border"><strong>短</strong>（15分钟）</td><td class="px-4 py-2 border"><strong>长</strong>（7-30天）</td></tr><tr><td class="px-4 py-2 border">存储位置</td><td class="px-4 py-2 border">内存（变量）</td><td class="px-4 py-2 border">localStorage / Cookie</td></tr><tr><td class="px-4 py-2 border">用途</td><td class="px-4 py-2 border">API 请求认证</td><td class="px-4 py-2 border">重新获取 Access Token</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="go" :code="basicCode" title="jwt_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Gin 中间件 + JWT</h2>
        <div class="mb-4"><Code language="go" :code="middlewareCode" title="jwt_middleware.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Access Token 短（15min），Refresh Token 长（7天）</strong></span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>中间件从 Authorization Header 提取 token → 验证 → 注入用户信息到 context</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>401 自动刷新——前端拦截器标准行为</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-10-cookie-session" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Cookie/Session</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-12-cors-rate-limit" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：CORS/限流 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"双Token模式"},{id:"sec-2",name:"JWT中间件"},{id:"sec-3",name:"小结"}]
const basicCode = `import "github.com/golang-jwt/jwt/v5"
var secret = []byte("your-secret-key")
// 生成 Token
func GenerateToken(userID string) (string, error) {
    claims := jwt.MapClaims{"user_id": userID, "exp": time.Now().Add(15*time.Minute).Unix()}
    return jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(secret)
}
// 验证 Token
func ValidateToken(tokenStr string) (string, error) {
    token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (any, error) { return secret, nil })
    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        return claims["user_id"].(string), nil
    }
    return "", err
}`

const middlewareCode = `func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" || !strings.HasPrefix(token, "Bearer ") {
            c.JSON(401, gin.H{"error": "unauthorized"}); c.Abort(); return
        }
        userID, err := ValidateToken(token[7:])  // 去掉 "Bearer "
        if err != nil { c.JSON(401, gin.H{"error": "invalid token"}); c.Abort(); return }
        c.Set("userID", userID)  // 注入上下文——后续 Handler 可用
        c.Next()
    }
}
// 受保护的路由
api := r.Group("/api", AuthMiddleware())
{ api.GET("/profile", getProfile) }`
</script>
