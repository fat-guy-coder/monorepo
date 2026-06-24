package web

import "fmt"

// RunJwtAuth 演示 JWT 鉴权
func RunJwtAuth() {
	fmt.Println("=== JWT 鉴权 ===")
	fmt.Println("双 Token 模式:")
	fmt.Println("  Access Token  — 短期（15分钟），API 请求认证")
	fmt.Println("  Refresh Token — 长期（7天），重新获取 Access Token")
	fmt.Println()
	fmt.Println("生成 Token（golang-jwt/jwt/v5）:")
	fmt.Println("  claims := jwt.MapClaims{\"user_id\": id, \"exp\": time.Now().Add(15*time.Minute).Unix()}")
	fmt.Println("  token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(secret)")
	fmt.Println()
	fmt.Println("验证 Token:")
	fmt.Println("  token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (any, error) { return secret, nil })")
	fmt.Println("  claims, ok := token.Claims.(jwt.MapClaims)")
	fmt.Println("  userID := claims[\"user_id\"].(string)")
	fmt.Println()
	fmt.Println("Gin 中间件:")
	fmt.Println("  token := c.GetHeader(\"Authorization\")")
	fmt.Println("  // \"Bearer xxx\" → 取 token[7:]")
	fmt.Println("  userID, err := ValidateToken(tokenStr)")
	fmt.Println("  c.Set(\"userID\", userID)  // 注入上下文")
	fmt.Println()
	fmt.Println("前端类比: ≈ 加密的 session cookie / OAuth2 Bearer Token")
}
