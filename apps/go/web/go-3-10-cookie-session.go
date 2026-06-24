package web

import "fmt"

// RunCookieSession 演示 Cookie 与 Session
func RunCookieSession() {
	fmt.Println("=== Cookie ===")
	fmt.Println("设置 Cookie:")
	fmt.Println("  http.SetCookie(w, &http.Cookie{")
	fmt.Println("      Name: \"session_id\", Value: \"abc123\",")
	fmt.Println("      Path: \"/\", MaxAge: 3600,")
	fmt.Println("      HttpOnly: true,  // JS 不可读")
	fmt.Println("      Secure: true,    // 仅 HTTPS")
	fmt.Println("      SameSite: http.SameSiteLaxMode,")
	fmt.Println("  })")
	fmt.Println()
	fmt.Println("读取 Cookie:")
	fmt.Println("  cookie, err := r.Cookie(\"session_id\")")
	fmt.Println()
	fmt.Println("Gin 写法:")
	fmt.Println("  c.SetCookie(\"token\", value, 3600, \"/\", \"\", true, true)")
	fmt.Println("  token, _ := c.Cookie(\"token\")")
	fmt.Println()
	fmt.Println("⚠️ 安全:")
	fmt.Println("  - 总是 HttpOnly: true（防 XSS 偷 Cookie）")
	fmt.Println("  - 生产环境 Secure: true（仅 HTTPS）")
	fmt.Println("  - SameSite 防 CSRF")
	fmt.Println()
	fmt.Println("生产环境建议用 JWT 替代 Cookie 存敏感数据")
}
