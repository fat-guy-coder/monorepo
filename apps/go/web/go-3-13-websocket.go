package web

import (
	"crypto/sha1"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"
)

// RunWebsocket 演示 WebSocket 全双工通信。
//
// 内容包括：
//   - 为什么需要 WebSocket（HTTP 单向困境 vs 全双工）
//   - 升级握手（Upgrade: websocket + 101 Switching Protocols）
//   - 数据帧结构（FIN / opcode / MASK / Payload）
//   - ReadMessage / WriteMessage
//   - readPump / writePump 双协程模式
//   - 多客户端广播 Hub（map + channel）
//   - ping/pong 心跳与连接关闭处理
//   - 第三方库对比与生产 checklist
//
// 说明：gorilla/websocket 属于第三方库（本项目 go.mod 无第三方依赖），
// 相关代码一律以注释字符串形式打印，不真实 import。
func RunWebsocket() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  01 · WebSocket 全双工通信")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. 为什么需要 WebSocket
	// ============================================================
	fmt.Println("\n📌 1. 为什么需要 WebSocket — HTTP 的\"单向困境\"")
	fmt.Println("   HTTP 是请求-响应模型：只能由客户端先开口，服务端被动应答。")
	fmt.Println("   但聊天、游戏、股票行情都是服务端要主动推数据——HTTP 做不到，")
	fmt.Println("   于是早期只能轮询（Polling）：客户端每隔几秒问一次\"有新消息吗？\"，")
	fmt.Println("   多数时候是白问，浪费带宽延迟还高。")

	fmt.Println(`
// 四种方案对比:
//   方案          方向                  实时性         开销
//   短轮询        单向(客户端拉)         秒级延迟       高(每次都要 HTTP 头)
//   长轮询        单向(有消息才返回)     中            连接悬挂,代理超时坑多
//   WebSocket     全双工                即时(毫秒级)   低(一条 TCP,帧头 2~14 字节)
//   SSE          单向(服务端→客户端)    即时           低(基于 HTTP,纯推送)
`)

	fmt.Println("   WebSocket 三大优势:")
	fmt.Println("   ① 全双工——一条连接，两边随时互发，不再有\"先请求后响应\"的约束")
	fmt.Println("   ② 低开销——升级完成后没有 HTTP 头，数据帧头只有 2~14 字节")
	fmt.Println("   ③ 省端口——默认走 80/443 端口，可穿过绝大多数防火墙和代理")
	fmt.Println("   前端类比: 浏览器 new WebSocket('ws://...') ↔ Go 侧 gorilla/websocket；")
	fmt.Println("   ws.onmessage ↔ ReadMessage()，ws.send() ↔ WriteMessage()")

	// ============================================================
	// 2. 升级握手
	// ============================================================
	fmt.Println("\n📌 2. 升级握手 — Upgrade + 101 Switching Protocols")
	fmt.Println("   WebSocket 不是凭空出现的连接，而是基于 HTTP 的升级握手：")
	fmt.Println("   先发一个带 Upgrade: websocket 的普通 HTTP 请求，服务端回 101，")
	fmt.Println("   此后这条 TCP 连接被\"改造\"为全双工通道。")

	fmt.Println(`
// ① 客户端发起的升级请求（普通 HTTP，多加三个头）
//   GET /ws HTTP/1.1
//   Host: example.com
//   Connection: Upgrade
//   Upgrade: websocket
//   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==   # 16 字节随机值 base64
//   Sec-WebSocket-Version: 13
//
// ② 服务端响应（状态码 101 = 协议切换）
//   HTTP/1.1 101 Switching Protocols
//   Upgrade: websocket
//   Connection: Upgrade
//   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
//   # Accept = base64( SHA1( Key + 258EAFA5-E914-47DA-95CA-C5AB0DC85B11 ) )
`)

	// 真实演示: 用标准库复现服务端计算 Sec-WebSocket-Accept
	fmt.Println("--- 演示: 服务端如何算出 Sec-WebSocket-Accept（RFC 6455）---")
	demoWebsocketAccept()

	fmt.Println("   gorilla/websocket 的 Upgrader 把整套握手封装成一行:")
	fmt.Println(`
// 示例代码（第三方库，仅打印演示）:
//   var upgrader = websocket.Upgrader{
//       // 生产环境必须校验 Origin（只允许自家域名），开发环境才 return true
//       CheckOrigin: func(r *http.Request) bool { return true },
//   }
//   conn, err := upgrader.Upgrade(w, r, nil)  // 校验握手头 → 回 101 → 返回 *websocket.Conn
//   if err != nil {
//       log.Println("upgrade failed:", err)
//       return
//   }
//   defer conn.Close()   // 兜底释放 TCP 资源
//   // 握手成功后 w 和 r 就"退役"了，之后只操作 conn
`)

	// 真实演示: 校验握手头
	fmt.Println("--- 演示: 服务端校验握手头（标准库 http.Header）---")
	demoHandshakeHeaders()

	fmt.Println("   ⚠️ CheckOrigin 别乱开：生产一定要校验 Origin，否则任何网页都能连你的服务，")
	fmt.Println("   这就是跨站 WebSocket 劫持（CSWSH）。")

	// ============================================================
	// 3. 数据帧与读写
	// ============================================================
	fmt.Println("\n📌 3. 数据帧结构与 ReadMessage / WriteMessage")
	fmt.Println("   建立连接后，所有数据都封装成帧（Frame）。帧的前两字节固定是头部：")
	fmt.Println("   FIN(1bit 是否最后一帧) + opcode(4bit 帧类型) + MASK+长度(第 2 字节)。")

	fmt.Println(`
// 帧结构（RFC 6455）—— 前两个字节是头部，后面是载荷:
//   FIN(1) | opcode(4) | MASK+Len(7) | Mask-Key(4B) | Payload
//
// opcode 常量（gorilla 里）:
//   websocket.TextMessage    0x1  文本消息（UTF-8）
//   websocket.BinaryMessage  0x2  二进制消息（图片/protobuf）
//   websocket.CloseMessage   0x8  关闭连接（带状态码）
//   websocket.PingMessage    0x9  心跳探测
//   websocket.PongMessage    0xA  心跳应答
//   客户端→服务端必须带 Masking Key（4 字节）；服务端→客户端不用掩码，帧更省 4 字节
`)

	demoFrameHeader()

	fmt.Println(`
// 示例代码（第三方库，仅打印演示）:
//   msgType, msg, err := conn.ReadMessage()   // 返回 (消息类型, 载荷, 错误)
//   switch msgType {
//   case websocket.TextMessage:
//       log.Printf("文本: %s", msg)             // 输出: 文本: hello
//   case websocket.BinaryMessage:
//       log.Printf("二进制, %d 字节", len(msg))  // 输出: 二进制, 2048 字节
//   }
//   conn.WriteMessage(websocket.TextMessage, []byte("你好"))
//
//   ⚠️ 坑 1: 不设读超时，客户端断网时 ReadMessage 可能永远阻塞（见第 6 节心跳）
//   ⚠️ 坑 2: 并发写同一连接会数据错乱——同一连接同一时刻只允许一个 goroutine 写
`)

	// ============================================================
	// 4. readPump/writePump
	// ============================================================
	fmt.Println("\n📌 4. readPump / writePump 双协程模式")
	fmt.Println("   聊天室要同时干两件事：不停读客户端消息，还要把别人发来的消息写回去。")
	fmt.Println("   一个 goroutine 里又读又写会互相阻塞。标准解法是双协程：")
	fmt.Println("   readPump 负责读 + 维护心跳，writePump 消费一个 channel 把消息写出去。")

	fmt.Println(`
// ws_pump.go — gorilla 官方推荐：readPump + writePump 双协程
//   type Client struct {
//       conn *websocket.Conn
//       send chan []byte   // writePump 消费的写队列
//   }
//
//   // readPump：一个 goroutine，只负责读
//   func (c *Client) readPump() {
//       defer c.conn.Close()
//       for {
//           _, _, err := c.conn.ReadMessage()
//           if err != nil { return }    // 读失败 = 连接失效，defer 关闭
//           // 业务处理（广播/转发）...
//       }
//   }
//
//   // writePump：另一个 goroutine，唯一写连接的人
//   func (c *Client) writePump() {
//       for msg := range c.send {       // 从 channel 取消息
//           if err := c.conn.WriteMessage(websocket.TextMessage, msg); err != nil {
//               return
//           }
//       }
//   }
//
//   启动: go c.readPump(); go c.writePump()
//   退出协同: 读出错 → 关闭连接 → writePump 写失败自动退出 → goroutine 全部收尾
//   关闭: close(c.send) 即可让 writePump 优雅退出
`)

	fmt.Println("   前端类比: readPump ≈ 常驻的 ws.onmessage 监听器；writePump ≈ 任务队列 + 发送器。")
	fmt.Println("   用 channel 当队列、用 goroutine 当消费者——正是阶段 2 学的在生产里的典型应用。")

	// ============================================================
	// 5. Hub 广播
	// ============================================================
	fmt.Println("\n📌 5. 多客户端广播 — Hub 结构")
	fmt.Println("   一个聊天室有成百上千个连接。每个连接就是一个 Client{conn, send}。")
	fmt.Println("   谁把 A 的消息转给 B、C、D？需要一个中央角色：Hub。")

	fmt.Println(`
// ws_hub.go — 中央 Hub：单 goroutine 事件循环，天然无锁
//   type Hub struct {
//       clients    map[*Client]bool  // 当前在线连接
//       register   chan *Client      // 新连接加入
//       unregister chan *Client      // 连接退出
//       broadcast  chan []byte       // 要群发的消息
//   }
//
//   func (h *Hub) run() {             // 一个 goroutine 里循环消费三个 channel
//       for {
//           select {
//           case c := <-h.register:
//               h.clients[c] = true                  // 输出: 连接 +1, 当前 1
//           case c := <-h.unregister:
//               delete(h.clients, c)
//               close(c.send)                        // 通知 writePump 退出
//           case msg := <-h.broadcast:
//               for c := range h.clients {           // 群发：每个连接投递一份
//                   select {
//                   case c.send <- msg:              // 已入队，writePump 负责写出
//                   default:                         // 队列满 = 慢客户端，直接断开
//                       delete(h.clients, c)
//                       close(c.send)
//                   }
//               }
//           }
//       }
//   }
`)

	fmt.Println("   Hub 是\"单写者\"模型：广播时往每个 client.send channel 写一个值，")
	fmt.Println("   真正写连接的仍是每个 client 自己的 writePump——多写者问题被 channel 化解。")
	fmt.Println("   发送到满的 channel 时用 select default 丢弃慢客户端，防止一个乌龟拖垮整个广播循环。")

	// ============================================================
	// 6. 心跳与关闭
	// ============================================================
	fmt.Println("\n📌 6. 心跳（ping/pong）与连接关闭处理")
	fmt.Println("   TCP 是\"虚连接\"——一端拔网线，另一端要很久才发现。所以服务端要主动探活：")
	fmt.Println("   定时发 Ping 帧，客户端回 Pong 帧。")

	demoHeartbeatTiming()

	fmt.Println(`
// ws_heartbeat.go — 心跳探活 + 优雅关闭（仅打印演示）
//   const (
//       writeWait  = 10 * time.Second    // 写超时
//       pongWait   = 60 * time.Second    // 60s 没收到任何帧判死
//       pingPeriod = (pongWait * 9) / 10 // 54s 发一次 ping（读超时的一半以内）
//   )
//   c.conn.SetReadDeadline(time.Now().Add(pongWait))
//   c.conn.SetPongHandler(func(string) error {   // 收到 pong 就刷新读超时
//       c.conn.SetReadDeadline(time.Now().Add(pongWait))
//       return nil
//   })
//   // 优雅关闭: 服务端下线前向所有客户端发 Close 帧（1001 Going Away）
//   c.conn.WriteControl(websocket.CloseMessage,
//       websocket.FormatCloseMessage(websocket.CloseGoingAway, "server shutting down"),
//       time.Now().Add(5*time.Second))
//   // 客户端读侧配合: IsCloseError(err, CloseGoingAway) → 输出: 服务端正常关闭
`)

	// ============================================================
	// 7. 库对比与常见问题
	// ============================================================
	fmt.Println("\n📌 7. 库对比 + 常见问题 + 生产 checklist")

	fmt.Println(`
// gorilla/websocket vs nhooyr.io/websocket:
//   API 风格  经典 Upgrade/ReadMessage/WriteMessage  Context 优先 Accept/Read/Write
//   取消/超时 手动 SetReadDeadline                    context.WithTimeout 直接可用
//   生态      最多示例、最多踩坑记录                    较新，示例偏少
//   适用      教程友好，首选学习                        新项目尝鲜、喜欢 context 风格
//   （Go 1.22+ 标准库有实验性 net/http websocket，生产仍以第三方库为主）
`)

	fmt.Println(`
// 面试/实战高频问题:
//   Q: 100 个连接 100 个 goroutine，会爆吗？
//   A: 不会——每个 goroutine 才 2KB 栈，一万个连接也就几十 MB。
//   Q: Nginx 支持 WebSocket 吗？
//   A: 要开 Upgrade 头透传，并调大代理超时（默认 60s 会掐断长连接）。
//   Q: 为什么客户端→服务端必须带 Masking Key？
//   A: 防止恶意脚本伪造帧污染代理缓存（缓存投毒）；服务端→客户端不用掩码。
`)

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  WebSocket 核心概念总结                                   ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  升级握手   → Upgrade: websocket + 101 Switching Protocols║")
	fmt.Println("║  数据帧     → FIN + opcode(Text/Binary/Close/Ping/Pong)   ║")
	fmt.Println("║  readPump   → 一个 goroutine 只读，维护心跳               ║")
	fmt.Println("║  writePump  → 一个 goroutine 唯一写，消费 send channel    ║")
	fmt.Println("║  Hub        → register/unregister/broadcast 单协程无锁    ║")
	fmt.Println("║  心跳       → Ping/Pong + SetReadDeadline 识别假死连接    ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: 生产 checklist——① CheckOrigin 白名单；② 双协程单写者；")
	fmt.Println("   ③ 心跳兜底断连；④ SetReadLimit 限制单帧大小防内存炸弹；")
	fmt.Println("   ⑤ 用 context/hub 统一管理退出；⑥ 监控连接数，异常飙升要告警。")
}

// demoWebsocketAccept 用标准库复现 RFC 6455 的 Sec-WebSocket-Accept 计算。
func demoWebsocketAccept() {
	const wsGUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
	key := "dGhlIHNhbXBsZSBub25jZQ==" // RFC 6455 官方示例 Key
	sum := sha1.Sum([]byte(key + wsGUID))
	accept := base64.StdEncoding.EncodeToString(sum[:])
	fmt.Printf("   客户端 Sec-WebSocket-Key = %s\n", key)
	fmt.Printf("   服务端 Sec-WebSocket-Accept = %s\n", accept)
	fmt.Println("   （两边的算法一致，客户端验算通过，证明\"确实是对方在回话\"）")
}

// demoHandshakeHeaders 模拟服务端校验客户端发来的升级请求头。
func demoHandshakeHeaders() {
	h := http.Header{}
	h.Set("Connection", "Upgrade")
	h.Set("Upgrade", "websocket")
	h.Set("Sec-WebSocket-Version", "13")
	h.Set("Sec-WebSocket-Key", "dGhlIHNhbXBsZSBub25jZQ==")

	upgrade := strings.EqualFold(h.Get("Upgrade"), "websocket")
	connection := strings.Contains(strings.ToLower(h.Get("Connection")), "upgrade")
	versionOK := h.Get("Sec-WebSocket-Version") == "13"
	fmt.Printf("   Upgrade 头正确? %v | Connection 含 Upgrade? %v | Version=13? %v\n", upgrade, connection, versionOK)
	fmt.Println("   全部为 true → 校验通过 → 回 101 Switching Protocols")
}

// demoFrameHeader 打印一帧数据的逻辑视图（JSON 视角）。
func demoFrameHeader() {
	frame := map[string]interface{}{
		"fin":         true,
		"opcode":      0x1,
		"opcode_name": "Text 文本帧",
		"masked":      true,
		"payload_len": 6,
		"payload":     "你好",
	}
	b, _ := json.MarshalIndent(frame, "   ", "  ")
	fmt.Println("   帧（逻辑视图，gorilla 会帮你完成打包/解析）:")
	fmt.Printf("   %s\n", b)
}

// demoHeartbeatTiming 演示心跳周期的换算（pongWait 的 90% 作为 ping 周期）。
func demoHeartbeatTiming() {
	pongWait := 60 * time.Second
	pingPeriod := (pongWait * 9) / 10
	fmt.Printf("   pongWait=%s → pingPeriod=%s（pongWait 的 90%%）\n", pongWait, pingPeriod)
	fmt.Println("   读超时设宽松（60s），Pong 能刷新计时；Ping 每 54s 发一次，留足往返时间。")
}
