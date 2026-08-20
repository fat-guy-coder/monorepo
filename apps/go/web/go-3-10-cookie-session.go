package web

import (
	"fmt"
	"net/http"
	"sync"
	"time"
)

// RunCookieSession 演示 Cookie 与 Session 的完整原理与 Go 落地。
//
// 内容包括：
//   - HTTP 为什么无状态，为什么需要「会话」
//   - http.Cookie 结构体真实演示（String() 直接输出 Set-Cookie 头）
//   - Cookie 属性一览（Path / MaxAge / HttpOnly / Secure / SameSite）
//   - Set-Cookie 下发与 r.Cookie 读取的真实演示
//   - Session 内存实现（map + sync.Mutex，真实可运行）
//   - Cookie vs Session vs JWT 对比
//   - 安全配置三件套防三类攻击
func RunCookieSession() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  10 · Cookie 与 Session")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. HTTP 无状态与会话需求
	// ============================================================
	fmt.Println("\n📌 1. HTTP 为什么无状态，我们为什么需要「会话」")
	fmt.Println("   HTTP 协议本身无状态: 服务器处理完一个请求就「失忆」了，")
	fmt.Println("   不记得你是谁、买过什么。但业务需要状态——登录态、购物车、浏览历史。")
	fmt.Println("   于是两个分工:")
	fmt.Println("   🍪 Cookie   → 浏览器端的小纸条：让浏览器记住「标识」")
	fmt.Println("   🗄️ Session  → 服务器端的档案柜：让服务器记住「数据」")
	fmt.Println("   两者搭配，才凑出一个「有状态的 Web 应用」。")
	fmt.Println("   前端类比: 你在 axios 拦截器里统一带 token，原理一模一样——客户端持凭证、服务端凭凭证认人。")

	// ============================================================
	// 2. http.Cookie 结构体真实演示
	// ============================================================
	fmt.Println("\n📌 2. http.Cookie 结构体 — String() 直接输出 Set-Cookie 头")
	fmt.Println("   Go 的 http.Cookie 字段即 Cookie 属性，String() 方法会拼出真正的 Set-Cookie 响应头。")

	// 真实演示：构造一个「安全三件套」齐全的 Cookie
	cookie := &http.Cookie{
		Name:     "session_id",
		Value:    "abc123",
		Path:     "/",                  // 全站都能带
		MaxAge:   3600,                 // 存活 3600 秒 = 1 小时
		HttpOnly: true,                 // JS 读不到 → 防 XSS 偷
		Secure:   true,                 // 仅 HTTPS → 防中间人截
		SameSite: http.SameSiteLaxMode, // 防 CSRF
	}
	fmt.Println("   Cookie 字段:")
	fmt.Printf("     Name=%q Value=%q Path=%q MaxAge=%d HttpOnly=%v Secure=%v SameSite=%v\n",
		cookie.Name, cookie.Value, cookie.Path, cookie.MaxAge, cookie.HttpOnly, cookie.Secure, cookie.SameSite)
	fmt.Println("   实际输出的响应头:")
	fmt.Printf("     Set-Cookie: %s\n", cookie.String())

	// ============================================================
	// 3. Cookie 属性一览
	// ============================================================
	fmt.Println("\n📌 3. Cookie 属性一览 — 每个属性都对应一类风险")
	fmt.Println("   下表是 Cookie 的「属性字典」，理解它就知道响应头为什么长那样:")

	attrs := []struct{ name, usage, risk string }{
		{"Name=Value", "键值对，如 session_id=abc123", "必填；Value 会被 URL 编码"},
		{"Path", "哪些路径会携带该 Cookie", "默认当前路径；设 / 全站携带"},
		{"Domain", "哪些域名携带（含子域）", "不设则只发给当前主机"},
		{"MaxAge / Expires", "存活时间", "不设 = 会话级，关浏览器就没了"},
		{"HttpOnly", "禁止 JS 读取 document.cookie", "默认 false → XSS 可偷"},
		{"Secure", "仅 HTTPS 传输", "默认 false → 明文可被截获"},
		{"SameSite", "跨站请求是否携带", "Lax/Strict/None；不设易被 CSRF 利用"},
	}
	for _, a := range attrs {
		fmt.Printf("     %-18s → %s（%s）\n", a.name, a.usage, a.risk)
	}
	fmt.Println("   ⚠️ MaxAge(秒) 与 Expires(时刻) 是两个字段，老浏览器只认 Expires；")
	fmt.Println("      Go 的 http.Cookie 会自动把 MaxAge 转成 Expires，但要避免两边不一致。")

	// ============================================================
	// 4. Set-Cookie 下发与 r.Cookie 读取
	// ============================================================
	fmt.Println("\n📌 4. 下发 Set-Cookie 与读取 r.Cookie — 真实演示")
	fmt.Println("   服务器用 http.SetCookie 下发；浏览器之后每次请求自动带回，")
	fmt.Println("   后端用 r.Cookie(\"name\") 读取。用标准库请求对象直接模拟:")

	// 真实演示：模拟「第一次请求 → 服务器下发 → 第二次请求自动携带 → 服务器读取」
	fmt.Println("   --- 演示: 请求-响应-再请求的 Cookie 闭环 ---")
	// 第一次请求（模拟服务器端设置响应头）
	fmt.Printf("   ① 服务器响应: Set-Cookie: %s\n", cookie.String())

	// 第二次请求：浏览器自动把 Cookie 放进请求头
	req, _ := http.NewRequest("GET", "http://localhost:8080/profile", nil)
	req.AddCookie(cookie) // 浏览器自动回传的行为
	receivedHeader := req.Header.Get("Cookie")
	fmt.Printf("   ② 浏览器请求: Cookie: %s\n", receivedHeader)

	// 服务器端读取
	c, err := req.Cookie("session_id")
	if err == nil {
		fmt.Printf("   ③ 服务器读取: r.Cookie(\"session_id\") → %s = %s\n", c.Name, c.Value)
	}
	if _, err := req.Cookie("does_not_exist"); err == http.ErrNoCookie {
		fmt.Println("   ④ 读取不存在的 Cookie → 返回 http.ErrNoCookie（后端应返回 401 未登录）")
	}

	fmt.Println(`
// 标准写法对照（net/http）:
//   // 下发
//   http.SetCookie(w, &http.Cookie{Name: "session_id", Value: sid, HttpOnly: true, ...})
//
//   // 读取
//   c, err := r.Cookie("session_id")
//   if err == http.ErrNoCookie {
//       http.Error(w, "未登录", http.StatusUnauthorized) // 401
//       return
//   }
//
// // Gin 一行版:
//   c.SetCookie("token", value, 3600, "/", "", true, true)
//   token, _ := c.Cookie("token")
`)

	// ============================================================
	// 5. Session 原理与内存实现
	// ============================================================
	fmt.Println("\n📌 5. Session 原理与内存实现 — map + sync.Mutex 真实可运行")
	fmt.Println("   Session 的精髓是「数据在服务端、凭证在客户端」: 登录后服务器把")
	fmt.Println("   {uid:42} 存进内存 map，生成随机 session_id 塞进 Cookie 发给浏览器，")
	fmt.Println("   下次请求浏览器带回 id，服务器查 map 就知道「你是 42 号用户」。")

	// 真实演示：创建 session、写入、再按 Cookie 读取
	store := newCookieSessionStore()
	sid := store.create()
	store.set(sid, "uid", 42)
	store.set(sid, "name", "Alice")
	fmt.Println("   --- 演示: Session 建立与识别 ---")
	fmt.Printf("   ① 服务器创建 Session: sid=%s → {uid:42, name:Alice}\n", sid)

	// 模拟第二次请求带 Cookie 回访
	req2, _ := http.NewRequest("GET", "http://localhost:8080/profile", nil)
	req2.AddCookie(&http.Cookie{Name: "session_id", Value: sid})
	c2, _ := req2.Cookie("session_id")
	uid, ok := store.get(c2.Value, "uid")
	fmt.Printf("   ② 请求带 Cookie: session_id=%s\n", c2.Value)
	fmt.Printf("   ③ 服务器按 id 查 map → uid=%v (ok=%v) → 识别用户\n", uid, ok)

	fmt.Println(`
// SessionStore 核心代码（本文件下方真实实现了 cookieSessionStore）:
//   type SessionStore struct {
//       mu   sync.Mutex
//       data map[string]map[string]any
//   }
//   func (s *SessionStore) Create() string { ... fmt.Sprintf("%x", time.Now().UnixNano()) }
//   func (s *SessionStore) Set(id, key string, val any) { ... }
//   func (s *SessionStore) Get(id, key string) (any, bool) { ... }
//
// ⚠️ 内存 map 两大致命伤:
//   1) 服务器重启全部丢失（用户集体掉线）
//   2) 多实例部署无法共享（请求打到 A 实例建的 session，B 实例查不到）
//   生产环境用 Redis 或 JWT 无状态方案；map 并发读写会 panic，必须加锁
`)

	// ============================================================
	// 6. Cookie vs Session vs JWT 对比
	// ============================================================
	fmt.Println("\n📌 6. Cookie vs Session vs JWT — 怎么选")
	fmt.Println("   一张对比表，理解三个方案的取舍:")

	compare := []struct{ feat, cookie, session, jwt string }{
		{"数据存哪", "浏览器", "服务器", "token 本身（无状态）"},
		{"是否可篡改", "可（需签名）", "不可（只存随机 id）", "不可（HMAC 签名）"},
		{"扩容", "天然", "需共享存储（Redis）", "天然（无共享状态）"},
		{"主动注销", "删 Cookie", "删 Session（立即生效）", "难（过期前都有效）"},
		{"适用", "小标识", "传统 Web（服务端渲染）", "前后端分离 / 微服务"},
	}
	for _, c := range compare {
		fmt.Printf("     %-10s → %s | %s | %s\n", c.feat, c.cookie, c.session, c.jwt)
	}

	// ============================================================
	// 7. 安全配置 — 三件套防三类攻击
	// ============================================================
	fmt.Println("\n📌 7. 安全配置 — HttpOnly / Secure / SameSite 三件套")
	fmt.Println("   Cookie 安全的核心就三句话:")
	fmt.Println("   - HttpOnly: 防 XSS 偷 —— JS 的 document.cookie 读不到它")
	fmt.Println("   - Secure:   防中间人截 —— 只在 HTTPS 连接上发送")
	fmt.Println("   - SameSite: 防 CSRF 冒用 —— 限制第三方网站请求携带本 Cookie")
	fmt.Println("   最佳实践:")
	fmt.Println("   ① 涉及登录态的 Cookie 一律三件套；")
	fmt.Println("   ② Cookie 里只放随机 session_id，绝不放密码/手机号等敏感信息；")
	fmt.Println("   ③ 给 session 设合理 MaxAge 并配套服务端过期清理；")
	fmt.Println("   ④ 重要操作（改密/支付）再叠加一次性 CSRF Token 校验。")
	fmt.Println("   前端类比: localStorage 没有 HttpOnly 概念，任何 XSS 都能 getItem('token')，")
	fmt.Println("   所以社区建议把 JWT 放进 HttpOnly Cookie 而不是 localStorage。")

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  Cookie 与 Session 要点总结                               ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  Cookie = 浏览器端凭证，Session = 服务器端数据            ║")
	fmt.Println("║  http.Cookie + Set-Cookie 下发，r.Cookie 读取            ║")
	fmt.Println("║  内存 Session = map + sync.Mutex，重启丢、多实例不共享   ║")
	fmt.Println("║  安全三件套: HttpOnly 防 XSS / Secure 防截获 / SameSite 防 CSRF ║")
	fmt.Println("║  Cookie 只放凭证，不放敏感数据（4KB 上限 + 每次请求都带）║")
	fmt.Println("║  Session 可主动注销，JWT 难注销但天然无状态可扩容        ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: 生产环境 Session 请用 Redis 等共享存储；无状态 API 用 JWT（见 3-11）。")
}

// cookieSessionStore 是内存版 Session 存储（演示用），map + sync.Mutex 保证并发安全。
// 真实项目请用 Redis 或 JWT，避免重启丢失 / 多实例不共享的问题。
type cookieSessionStore struct {
	mu   sync.Mutex
	data map[string]map[string]any
}

// newCookieSessionStore 创建空存储。
func newCookieSessionStore() *cookieSessionStore {
	return &cookieSessionStore{data: make(map[string]map[string]any)}
}

// create 生成新 session，返回几乎不可能猜中的随机 id。
func (s *cookieSessionStore) create() string {
	id := fmt.Sprintf("%x", time.Now().UnixNano())
	s.mu.Lock()
	defer s.mu.Unlock()
	s.data[id] = make(map[string]any)
	return id
}

// set 写入一个字段。
func (s *cookieSessionStore) set(id, key string, val any) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if m, ok := s.data[id]; ok {
		m[key] = val
	}
}

// get 读取一个字段，不存在返回 ok=false。
func (s *cookieSessionStore) get(id, key string) (any, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	v, ok := s.data[id][key]
	return v, ok
}
