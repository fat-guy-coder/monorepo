package web

import (
	"fmt"
	"net/http"
	"sync"
	"time"
)

// RunCorsRateLimit 演示 CORS 跨域处理与令牌桶限流。
//
// 内容包括：
//   - CORS 与同源策略（拦截方是浏览器，不是服务器）
//   - 简单请求 vs 预检请求
//   - CORS 响应头清单（Access-Control-Allow-*）
//   - OPTIONS 预检放行逻辑（真实演示）
//   - 四大限流算法对比（计数器 / 滑动窗口 / 令牌桶 / 漏桶）
//   - 令牌桶限流中间件真实模拟（time 差值补令牌）
//   - 真实场景：前端跨域联调的完整链路
func RunCorsRateLimit() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  12 · CORS 与限流")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. CORS 与同源策略
	// ============================================================
	fmt.Println("\n📌 1. CORS 与同源策略")
	fmt.Println("   同源策略是浏览器的安全基石: http://localhost:5173 的页面默认只能向")
	fmt.Println("   「同协议 + 同域名 + 同端口」的地址发请求。前端跑 5173、Go 后端跑 8080——")
	fmt.Println("   端口不同 = 跨域，直接被拦。CORS 就是浏览器官方开的「受控通道」。")
	fmt.Println("   三个关键认知:")
	fmt.Println("   ① 拦截方是浏览器，不是服务器 —— 请求其实发出去了，只是响应没交给 JS")
	fmt.Println("   ② curl / Postman 没这回事 —— 接口报 CORS 错时先用 curl 确认是不是接口问题")
	fmt.Println("   ③ 控制权在服务端 —— 只能后端在响应头里「授权」")
	fmt.Println("   前端类比: CORS ≈ 访客登记制度，先到前台报 Origin，白名单过了才给通行证。")

	// ============================================================
	// 2. 简单请求 vs 预检请求
	// ============================================================
	fmt.Println("\n📌 2. 简单请求 vs 预检请求")
	fmt.Println("   跨域请求分两类，是否触发 OPTIONS 预检取决于「危险程度」:")
	fmt.Println("   ┌───────────────┬──────────────────────┬──────────────────────────────┐")
	fmt.Println("   │ 对比项         │ 简单请求              │ 预检请求（非简单）            │")
	fmt.Println("   ├───────────────┼──────────────────────┼──────────────────────────────┤")
	fmt.Println("   │ 方法           │ GET / POST / HEAD    │ PUT / DELETE / PATCH 等      │")
	fmt.Println("   │ Content-Type  │ 表单类 / text/plain  │ application/json 等          │")
	fmt.Println("   │ 自定义头       │ 不能带 Authorization │ 可带                         │")
	fmt.Println("   │ 预检           │ 无，直接发真实请求   │ 先 OPTIONS，通过再发真实请求  │")
	fmt.Println("   └───────────────┴──────────────────────┴──────────────────────────────┘")
	fmt.Println("   为什么带 JSON / Authorization 就变预检？因为浏览器认为它们「危险」，")
	fmt.Println("   预检就是浏览器替前端问一句:「服务器，我用 PUT + JSON + 带凭证，你允许吗？」")

	// ============================================================
	// 3. CORS 响应头清单
	// ============================================================
	fmt.Println("\n📌 3. CORS 响应头清单 — 真实构造演示")
	fmt.Println("   全部授权都靠这几个响应头，理解了它们 cors 中间件就不神秘了:")

	// 真实演示：按序输出 CORS 头（用切片保证顺序稳定）
	corsHeaders := []struct{ name, value, meaning string }{
		{"Access-Control-Allow-Origin", "http://localhost:5173", "允许哪个源访问（带凭证时不能用 *）"},
		{"Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS", "允许哪些方法"},
		{"Access-Control-Allow-Headers", "Origin, Content-Type, Authorization", "允许哪些请求头"},
		{"Access-Control-Allow-Credentials", "true", "是否允许携带 Cookie / 凭证"},
		{"Access-Control-Max-Age", "43200", "预检结果缓存秒数（12 小时）"},
	}
	for _, h := range corsHeaders {
		fmt.Printf("     %-35s: %s\n", h.name, h.value)
		fmt.Printf("       └─ %s\n", h.meaning)
	}

	// ============================================================
	// 4. OPTIONS 预检处理
	// ============================================================
	fmt.Println("\n📌 4. OPTIONS 预检处理 — 真实逻辑演示")
	fmt.Println("   关键: 预检请求要提前返回 204，且不进鉴权（它不带业务凭证，只带 Origin）。")

	// 真实演示：构造一个浏览器发出的 OPTIONS 预检请求，看服务器如何识别并放行
	preflight, _ := http.NewRequest(http.MethodOptions, "http://localhost:8080/api/menus", nil)
	preflight.Header.Set("Origin", "http://localhost:5173")
	preflight.Header.Set("Access-Control-Request-Method", "POST")
	preflight.Header.Set("Access-Control-Request-Headers", "Authorization")

	isPreflight := preflight.Method == http.MethodOptions
	fmt.Printf("    请求方法 = %s，带 Origin: %s\n", preflight.Method, preflight.Header.Get("Origin"))
	fmt.Printf("    判定为预检请求: %v → 服务器返回 %d No Content 并附带放行头\n", isPreflight, http.StatusNoContent)
	fmt.Printf("    ⚠️ 常见坑: OPTIONS 报 404/405/500 —— 路由没处理 OPTIONS 方法，或中间件把预检当普通请求拦了。\n")

	fmt.Println(`
// 手写 CORS 中间件（gin，代码仅作注释参考）:
//   func CORS() gin.HandlerFunc {
//       return func(c *gin.Context) {
//           c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
//           c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
//           c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
//           c.Header("Access-Control-Allow-Credentials", "true")
//           c.Header("Access-Control-Max-Age", "43200")
//           if c.Request.Method == http.MethodOptions { // 预检直接 204，不进鉴权
//               c.AbortWithStatus(http.StatusNoContent)
//               return
//           }
//           c.Next()
//       }
//   }
// 生产用 gin-contrib/cors:
//   r.Use(cors.New(cors.Config{
//       AllowOrigins: []string{"http://localhost:5173"},
//       AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
//       AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
//       AllowCredentials: true,
//       MaxAge: 12 * time.Hour,
//   }))
`)

	// ============================================================
	// 5. 限流算法对比
	// ============================================================
	fmt.Println("\n📌 5. 常见限流算法对比")
	fmt.Println("   限流目标: 让请求速率稳定在阈值内，保护后端不被突刺打垮。")

	algos := []struct{ name, idea, pros, cons string }{
		{"固定窗口计数器", "每秒计数，超 N 拒绝，到点清零", "实现最简单", "窗口边界可被打双倍（59s+0s）"},
		{"滑动窗口", "记录每毫秒请求数，滚动统计近 1 秒", "平滑，边界不穿洞", "要存时间戳列表，占内存"},
		{"令牌桶", "匀速补令牌，请求消费；桶空拒绝", "允许短暂突发（借桶里存量）", "突发量大时仍可能超阈"},
		{"漏桶", "请求进队列，匀速出队处理", "绝对匀速，适合削峰", "处理不过来就积压/丢弃，无突发"},
	}
	for _, a := range algos {
		fmt.Printf("     %-12s → %s\n", a.name, a.idea)
		fmt.Printf("               ✅ %s   ❌ %s\n", a.pros, a.cons)
	}
	fmt.Println("   Go 项目默认选令牌桶: 既能限速又能容忍突发（刷新页面要并行拉好几个接口）。")
	fmt.Println("   生产用 golang.org/x/time/rate: rate.NewLimiter(r, b)，r=每秒补数，b=桶容量(突发上限)。")

	// ============================================================
	// 6. 令牌桶实现 —— 真实模拟
	// ============================================================
	fmt.Println("\n📌 6. 令牌桶限流 — 真实模拟计数")
	fmt.Println("   生产姿势: 每个 IP 一个 limiter，取不到令牌返回 429 并中断链路。")
	fmt.Println("   真实演示一个容量 5、每秒补 2 个的令牌桶:")

	// 真实演示：突突发发 7 个请求
	bucket := newTokenBucket(5, 2)
	fmt.Println("   --- 演示: 初始桶满 = 5，一口气发 7 个请求 ---")
	for i := 1; i <= 7; i++ {
		ok := bucket.allow()
		status := "通过"
		if !ok {
			status = fmt.Sprintf("拒绝 %d Too Many Requests", http.StatusTooManyRequests)
		}
		fmt.Printf("     请求 #%d → %s\n", i, status)
	}
	fmt.Println("   --- 演示: 等待 1 秒，生成器匀速补 2 个令牌 ---")
	time.Sleep(1100 * time.Millisecond)
	fmt.Printf("     桶内 ≈ %d 个令牌（容量上限 5）\n", bucket.count())
	for i := 1; i <= 3; i++ {
		ok := bucket.allow()
		if ok {
			fmt.Printf("     请求 #%d → 通过（令牌 -1）\n", i)
		} else {
			fmt.Printf("     请求 #%d → 拒绝 429\n", i)
		}
	}

	fmt.Println(`
// 令牌桶本质 = 带缓冲 channel 当桶 + Ticker 匀速放令牌（本文件下方真实实现了时间差版）:
//   type TokenBucket struct {
//       tokens chan struct{} // 缓冲长度 = 容量 N
//       stop   chan struct{}
//   }
//   go func() { // 生成器：每秒补 r 个
//       tick := time.NewTicker(time.Second / time.Duration(r))
//       for { select {
//           case <-tick.C: select {
//               case tb.tokens <- struct{}{}: // 桶没满，放入
//               default:                      // 桶满 → 溢出丢弃
//           }
//           case <-tb.stop: return
//       } }
//   }()
//   func (tb *TokenBucket) Allow() bool {
//       select { case <-tb.tokens: return true; default: return false }
//   }
//
// per-IP 限流中间件（gin，用 golang.org/x/time/rate）:
//   func RateLimit(r rate.Limit, b int) gin.HandlerFunc {
//       limiters := sync.Map{}
//       return func(c *gin.Context) {
//           ip := c.ClientIP()
//           lim, _ := limiters.LoadOrStore(ip, rate.NewLimiter(r, b))
//           if !lim.(*rate.Limiter).Allow() {
//               c.Header("Retry-After", "1")
//               c.JSON(http.StatusTooManyRequests, gin.H{"error": "too many requests"})
//               c.Abort(); return
//           }
//           c.Next()
//       }
//   }
//   r.Use(RateLimit(rate.Limit(10), 20)) // 每秒 10 个，允许突发到 20
`)

	// ============================================================
	// 7. 真实场景
	// ============================================================
	fmt.Println("\n📌 7. 真实场景：前端跨域联调的完整链路")
	fmt.Println("   学习网站前端(5173) 调后端(8080)，把 CORS + 鉴权 + 限流串起来:")
	fmt.Println("   ① 浏览器发 GET /api/menus?tree=true，带 Origin: localhost:5173")
	fmt.Println("   ② 后端 CORS 中间件匹配白名单，响应带 Access-Control-Allow-Origin")
	fmt.Println("   ③ 若带 Authorization: Bearer xxx，先触发一次 OPTIONS 预检，后端返回 204 + 放行头")
	fmt.Println("   ④ 限流中间件按 IP 取令牌——正常浏览够用，脚本刷则同 IP 超速返回 429")
	fmt.Println("   ⑤ 前端 axios 捕获 429 指数退避重试；捕获 401 调 refresh 换 token 再重放")
	fmt.Println("   前端类比: request.ts 里 withCredentials: true ≈ Allow-Credentials 带 Cookie；")
	fmt.Println("   429 退避 ≈ 按钮限 30 次点击，失败等配额恢复再试。")

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  CORS 与限流要点总结                                     ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  CORS 是浏览器同源策略的受控例外，靠响应头放行            ║")
	fmt.Println("║  Access-Control-Allow-Origin/Methods/Headers/Credentials ║")
	fmt.Println("║  带 JSON / Authorization / PUT / DELETE → OPTIONS 预检   ║")
	fmt.Println("║  预检要返回 204 且不进鉴权                                ║")
	fmt.Println("║  四大算法: 计数器(简单) 滑动窗口(平滑) 令牌桶(限速+突发) 漏桶(匀速) ║")
	fmt.Println("║  生产用 golang.org/x/time/rate，per-IP 一个 limiter       ║")
	fmt.Println("║  429 带 Retry-After 头，限流放最外层中间件               ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: 限流 key 记得清理（sync.Map 无限增长）或换 Redis INCR+EXPIRE；爬虫会换 IP，叠加用户限/全局限更稳。")
}

// tokenBucket 是手写迷你令牌桶（演示用）。
// 用时间差计算补充，省去 Ticker goroutine；capacity=容量，refillPer=每秒补充数。
type tokenBucket struct {
	mu        sync.Mutex
	capacity  float64
	tokens    float64
	refillPer float64
	last      time.Time
}

// newTokenBucket 创建令牌桶，初始装满（允许一次突发）。
func newTokenBucket(capacity, refillPer float64) *tokenBucket {
	return &tokenBucket{
		capacity:  capacity,
		tokens:    capacity,
		refillPer: refillPer,
		last:      time.Now(),
	}
}

// refill 按流逝时间补充令牌，上限为容量（超出部分 = 溢出丢弃）。
func (tb *tokenBucket) refill(now time.Time) {
	elapsed := now.Sub(tb.last).Seconds()
	tb.last = now
	tb.tokens += elapsed * tb.refillPer
	if tb.tokens > tb.capacity {
		tb.tokens = tb.capacity
	}
}

// allow 尝试消耗 1 个令牌，成功返回 true；桶空返回 false（对应 429）。
func (tb *tokenBucket) allow() bool {
	tb.mu.Lock()
	defer tb.mu.Unlock()
	tb.refill(time.Now())
	if tb.tokens < 1 {
		return false
	}
	tb.tokens--
	return true
}

// count 返回当前桶内令牌数（取整展示）。
func (tb *tokenBucket) count() int {
	tb.mu.Lock()
	defer tb.mu.Unlock()
	tb.refill(time.Now())
	return int(tb.tokens)
}
