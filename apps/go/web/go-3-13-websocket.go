package web

import "fmt"

// RunWebsocket 演示 WebSocket
func RunWebsocket() {
	fmt.Println("=== WebSocket（gorilla/websocket） ===")
	fmt.Println("HTTP 升级为 WebSocket:")
	fmt.Println("  var upgrader = websocket.Upgrader{")
	fmt.Println("      CheckOrigin: func(r *http.Request) bool { return true },")
	fmt.Println("  }")
	fmt.Println("  conn, err := upgrader.Upgrade(w, r, nil)")
	fmt.Println()
	fmt.Println("收发消息:")
	fmt.Println("  // 读")
	fmt.Println("  msgType, msg, err := conn.ReadMessage()")
	fmt.Println("  // 写")
	fmt.Println("  conn.WriteMessage(websocket.TextMessage, []byte(\"hello\"))")
	fmt.Println()
	fmt.Println("Gin 版本:")
	fmt.Println("  r.GET(\"/ws\", func(c *gin.Context) {")
	fmt.Println("      conn, _ := upgrader.Upgrade(c.Writer, c.Request, nil)")
	fmt.Println("      defer conn.Close()")
	fmt.Println("      for { _, msg, _ := conn.ReadMessage(); conn.WriteMessage(...) }")
	fmt.Println("  })")
	fmt.Println()
	fmt.Println("前端类比: ≈ Node.js ws 库 / Socket.IO server 端")
	fmt.Println("安装: go get github.com/gorilla/websocket")
}
