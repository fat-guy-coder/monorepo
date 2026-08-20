package web

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"
	"time"
)

// RunJwtAuth 演示 JWT 鉴权：三段结构、HS256 签名原理与生产用法。
//
// 内容包括：
//   - 为什么需要 JWT（Session 在多实例/App 下的痛点）
//   - JWT 三段结构（Header.Payload.Signature）—— 真实 base64 拼接
//   - HS256 签名原理 —— 真实 HMAC 演示 + 篡改验证
//   - exp 过期校验
//   - golang-jwt/v5 签发与解析（打印为注释代码）
//   - auth 中间件与 Access + Refresh 双 Token 流程
//   - 安全坑清单（base64 明文 / 算法混淆 / 密钥管理 / 不能吊销）
func RunJwtAuth() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  11 · JWT 鉴权")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. 为什么需要 JWT
	// ============================================================
	fmt.Println("\n📌 1. 为什么需要 JWT — Session 的痛点")
	fmt.Println("   Session 数据存在服务器，多实例部署时得放 Redis，App 端没有浏览器")
	fmt.Println("   用 Cookie 又别扭。JWT 的思路反过来: 把该记得的东西签进 token 交给")
	fmt.Println("   客户端，服务器每次请求只需「验个签名」——零状态、天然可横向扩容。")

	compare := []struct{ feat, session, jwt string }{
		{"状态存哪", "服务器（内存/Redis）", "token 本身（无状态）"},
		{"扩容", "要共享存储（Redis）", "天然多实例"},
		{"主动注销", "删 session，立即生效", "难，过期前都有效（需黑名单）"},
		{"跨域/App", "Cookie 跨域麻烦", "放 Authorization 头，随处可用"},
	}
	for _, c := range compare {
		fmt.Printf("     %-10s → %s | %s\n", c.feat, c.session, c.jwt)
	}
	fmt.Println("   双 Token 模式: Access(15 分钟) 负责日常请求，Refresh(7~30 天) 负责续命。")
	fmt.Println("   Access 泄露了损失小；Refresh 泄露了就改签新 Access。")

	// ============================================================
	// 2. 三段结构 —— 真实 base64 拼接
	// ============================================================
	fmt.Println("\n📌 2. JWT 三段结构 — 真实 base64 拼接演示")
	fmt.Println("   JWT = Header.Payload.Signature，点号连接。用标准库真实拼一个:")

	// 真实演示：构造 header / payload
	header := map[string]any{"alg": "HS256", "typ": "JWT"}
	payload := map[string]any{
		"sub":  "42",
		"name": "Alice",
		"exp":  time.Now().Add(15 * time.Minute).Unix(),
	}
	secret := []byte("my-demo-secret-请勿用于生产")

	hb, _ := json.Marshal(header)
	pb, _ := json.Marshal(payload)
	// base64url：用 -_ 代替 +/，去掉 = 填充
	h64 := base64.RawURLEncoding.EncodeToString(hb)
	p64 := base64.RawURLEncoding.EncodeToString(pb)

	fmt.Printf("     Header JSON  = %s\n", string(hb))
	fmt.Printf("     Header b64   = %s\n", h64)
	fmt.Printf("     Payload JSON = %s\n", string(pb))
	fmt.Printf("     Payload b64  = %s\n", p64)

	// 第 3 段 = HMAC-SHA256( header.payload , secret )
	mac := hmac.New(sha256.New, secret)
	mac.Write([]byte(h64 + "." + p64))
	s64 := base64.RawURLEncoding.EncodeToString(mac.Sum(nil))

	token := h64 + "." + p64 + "." + s64
	fmt.Printf("     Signature    = %s\n", s64)
	fmt.Println("   --- 最终 Token（形如 xxx.xxx.xxx）---")
	fmt.Printf("     %s\n", token)

	// 真实演示：base64 只是编码不是加密 —— 任何人能解出明文
	pb2, _ := base64.RawURLEncoding.DecodeString(p64)
	fmt.Println("   --- 🕵️ 解码 Payload（任何人都能做）---")
	fmt.Printf("     %s\n", string(pb2))
	fmt.Println("     ⚠️ 所以 JWT 里绝不能放密码/手机号/身份证，只放 userID 这类标识！")

	// ============================================================
	// 3. HS256 签名原理 —— 篡改验证
	// ============================================================
	fmt.Println("\n📌 3. HS256 签名原理 — 改一个字符就作废")
	fmt.Println("   sig = HMAC_SHA256(secret, header.payload)。验证时服务器用同一个 secret")
	fmt.Println("   对「收到的 header.payload」重算签名，再和收到的第 3 段比对。")
	fmt.Println("   真实演示: 攻击者把 sub 从 42 改成 43，但保留旧签名 ——")

	// 攻击者构造一个篡改过的 payload
	payloadBad := map[string]any{
		"sub":  "43", // 篡改点
		"name": "Alice",
		"exp":  time.Now().Add(15 * time.Minute).Unix(),
	}
	pbad, _ := json.Marshal(payloadBad)
	pbad64 := base64.RawURLEncoding.EncodeToString(pbad)

	// 服务器收到的 token 三段：header + 被改的 payload + 旧签名 s64
	forged := h64 + "." + pbad64 + "." + s64
	fmt.Printf("     攻击者伪造: %s\n", forged)

	// 服务器用 secret 对「收到的 header.payload」重算签名
	macV := hmac.New(sha256.New, secret)
	macV.Write([]byte(h64 + "." + pbad64))
	sigV := base64.RawURLEncoding.EncodeToString(macV.Sum(nil))

	// 比对：重算值与收到的第 3 段
	pass := hmac.Equal([]byte(sigV), []byte(s64)) // 恒定时间比较，防时序攻击
	fmt.Printf("     服务器重算签名 = %s\n", sigV)
	fmt.Printf("     收到的第 3 段   = %s\n", s64)
	fmt.Printf("     比对结果: %v → 篡改被识破，返回 401\n", !pass)
	fmt.Println("   🔑 关键: secret 只有服务器知道，客户端想伪造签名但算不出来——这就是防篡改的根本。")

	// ============================================================
	// 4. exp 过期校验
	// ============================================================
	fmt.Println("\n📌 4. exp 过期校验 — Unix 秒")
	fmt.Println("   exp 单位是 Unix 秒（time.Now().Unix()），不是毫秒。真实演示:")

	now := time.Now().Unix()
	valid := time.Now().Add(15 * time.Minute).Unix()
	expired := now - 1 // 1 秒前已过期
	fmt.Printf("     当前时间  now=%d\n", now)
	fmt.Printf("     exp=15 分钟后   → now < exp ? %v → 通过\n", now < valid)
	fmt.Printf("     exp=1 秒前       → now < exp ? %v → 过期，401\n", now < expired)
	fmt.Println("     ⚠️ 传 UnixMilli() 会让 token 瞬间「过期」，这是个常见坑。")

	// ============================================================
	// 5. golang-jwt/v5 签发与解析
	// ============================================================
	fmt.Println("\n📌 5. golang-jwt/v5 签发与解析（生产用库，代码仅作注释参考）")
	fmt.Println("   NewWithClaims 负责「拼三段 + 签名」，Parse 负责「拆三段 + 验签 + 查过期」。")

	fmt.Println(`
// import "github.com/golang-jwt/jwt/v5"  // 生产别手写 HMAC
// var secret = []byte(os.Getenv("JWT_SECRET")) // 密钥进环境变量
//
// // 签发 Access Token（15 分钟有效）
// func GenerateAccessToken(userID string) (string, error) {
//     claims := jwt.MapClaims{
//         "sub": userID,                                  // 用户标识
//         "exp": time.Now().Add(15 * time.Minute).Unix(), // 过期时间（秒）
//         "iat": time.Now().Unix(),                       // 签发时间
//     }
//     token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
//     return token.SignedString(secret)
// }
//
// // 解析 + 校验签名 + 校验过期
// func ParseToken(tokenStr string) (*jwt.MapClaims, error) {
//     token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (any, error) {
//         if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
//             return nil, fmt.Errorf("意外的签名算法: %v", t.Header["alg"])
//         }
//         return secret, nil
//     }, jwt.WithValidMethods([]string{"HS256"})) // 白名单锁死，防算法混淆
//     if err != nil { return nil, err }
//     if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
//         return &claims, nil
//     }
//     return nil, fmt.Errorf("token 无效")
// }
`)

	// ============================================================
	// 6. auth 中间件与双 Token 流程
	// ============================================================
	fmt.Println("\n📌 6. auth 中间件 & 刷新 Token 流程")
	fmt.Println("   JWT 鉴权落地姿势：一个中间件挂在受保护路由组上。真实演示 Bearer 前缀解析:")

	// 真实演示：从 Authorization 头提取 token
	authHeader := "Bearer " + token
	rawToken := strings.TrimPrefix(authHeader, "Bearer ")
	fmt.Printf("     Authorization: %s%s\n", authHeader[:6], authHeader[6:6+12]+"....")
	fmt.Printf("     提取 token(前 20 字符): %s\n", rawToken[:20]+"....")

	fmt.Println(`
// Gin 鉴权中间件:
//   func AuthMiddleware() gin.HandlerFunc {
//       return func(c *gin.Context) {
//           h := c.GetHeader("Authorization")
//           if !strings.HasPrefix(h, "Bearer ") {
//               c.JSON(401, gin.H{"error": "缺少 Bearer Token"}); c.Abort(); return
//           }
//           claims, err := ParseToken(h[7:]) // 去掉 "Bearer " 前缀
//           if err != nil {
//               c.JSON(401, gin.H{"error": "token 无效或过期"}); c.Abort(); return
//           }
//           c.Set("userID", (*claims)["sub"]) // 注入上下文
//           c.Next()
//       }
//   }
//   api := r.Group("/api", AuthMiddleware())
//   { api.GET("/profile", getProfile) }
//
// 刷新流程（前端无感续期）:
//   ① 请求带过期 Access → 后端 401
//   ② axios 拦截器捕获 401 → 调 POST /api/auth/refresh 带上 Refresh
//   ③ 后端校验 Refresh（长 7 天）→ 签发新 Access（短 15 分钟）
//   ④ 前端用新 token 重放原请求
`)

	// ============================================================
	// 7. 安全坑清单
	// ============================================================
	fmt.Println("\n📌 7. 安全坑清单 & 最佳实践")
	fmt.Println("   ⚠️ 坑 1: base64 明文可读 —— token 第 2 段谁都能解，别放敏感数据")
	fmt.Println("   ⚠️ 坑 2: 算法混淆攻击 —— 必须 WithValidMethods 锁死 HS256，并校验 t.Method 类型")
	fmt.Println("   ⚠️ 坑 3: 密钥管理 —— secret 短/写死代码/提交 Git 都会让 JWT 形同虚设")
	fmt.Println("   ⚠️ 坑 4: 不能主动吊销 —— 改密/封号要么走黑名单（Redis 记 jti），要么短 Access + Refresh 旋转")
	fmt.Println("   ✅ 经验: 短 Access + 长 Refresh + 必要时黑名单；前端存 HttpOnly Cookie，App 存系统安全存储")

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  JWT 鉴权要点总结                                        ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  JWT = Header.Payload.Signature，无状态凭证               ║")
	fmt.Println("║  HS256 = HMAC(secret, header.payload)，改任何字符都作废   ║")
	fmt.Println("║  base64 是编码不是加密，payload 明文可读，别放敏感数据    ║")
	fmt.Println("║  签发 NewWithClaims(...).SignedString(secret)             ║")
	fmt.Println("║  验证 jwt.Parse + WithValidMethods 锁死算法               ║")
	fmt.Println("║  双 Token: Access 15 分钟 + Refresh 7~30 天，401 自动续期 ║")
	fmt.Println("║  中间件取 Authorization: Bearer xxx → 注入 userID 到 context ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: 密钥用环境变量 + 定期轮换；登录/改密后对旧 Refresh 做吊销（Redis 记 jti）。")
}
