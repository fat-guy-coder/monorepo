package basics

import (
	"encoding/json"
	"fmt"
	"io"
	"strings"
	"time"
)

// APIUser 演示 json tag：重命名、omitempty 忽略零值、- 忽略字段。
type APIUser struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email,omitempty"` // 零值时不输出
	Password string `json:"-"`               // 永远不序列化
}

// AppEvent 演示自定义序列化：把 time.Time 格式化成业务可读格式。
type AppEvent struct {
	Title string    `json:"title"`
	At    time.Time `json:"at"`
}

// MarshalJSON 自定义序列化输出：默认的 time.Time 是 RFC3339，这里改成 "2006-01-02 15:04:05"。
func (e AppEvent) MarshalJSON() ([]byte, error) {
	return json.Marshal(struct {
		Title string `json:"title"`
		At    string `json:"at"`
	}{
		Title: e.Title,
		At:    e.At.Format("2006-01-02 15:04:05"),
	})
}

// RunJSON 演示 encoding/json：Marshal / Unmarshal / omitempty / 自定义序列化 / 流式解码。
func RunJSON() {
	fmt.Println("--- 基本 Marshal / Unmarshal ---")
	u := APIUser{ID: 1, Name: "Bob", Email: "bob@example.com", Password: "secret"}
	data, _ := json.Marshal(u)
	fmt.Println("Marshal:", string(data))
	// 输出: Marshal: {"id":1,"name":"Bob","email":"bob@example.com"}
	// 注意 Password 被 "-" tag 忽略

	var back APIUser
	_ = json.Unmarshal(data, &back)
	fmt.Printf("Unmarshal 回 APIUser: %+v\n", back)
	// 输出: Unmarshal 回 APIUser: {ID:1 Name:Bob Email:bob@example.com Password:}

	fmt.Println()
	fmt.Println("--- omitempty：零值字段不输出 ---")
	u2 := APIUser{ID: 2, Name: "Alice"} // Email 为空字符串
	data2, _ := json.Marshal(u2)
	fmt.Println("Marshal(空 Email):", string(data2))
	// 输出: Marshal(空 Email): {"id":2,"name":"Alice"}

	fmt.Println()
	fmt.Println("--- 自定义序列化：MarshalJSON ---")
	ev := AppEvent{Title: "go 学习", At: time.Date(2026, 8, 25, 10, 30, 0, 0, time.UTC)}
	data3, _ := json.Marshal(ev)
	fmt.Println("Marshal AppEvent:", string(data3))
	// 输出: Marshal AppEvent: {"title":"go 学习","at":"2026-08-25 10:30:00"}

	fmt.Println()
	fmt.Println("--- 流式解码：一行一个 JSON 对象（NDJSON） ---")
	stream := `{"name":"A","n":1}
{"name":"B","n":2}
{"name":"C","n":3}`
	dec := json.NewDecoder(strings.NewReader(stream))
	for {
		var item map[string]any
		err := dec.Decode(&item)
		if err == io.EOF {
			break // 读完了
		}
		if err != nil {
			fmt.Println("解码错误:", err)
			break
		}
		// 注意：json 数字默认解码成 float64
		fmt.Printf("解码 %v，数值类型=%T\n", item["name"], item["n"])
	}
	// 输出:
	// 解码 A，数值类型=float64
	// 解码 B，数值类型=float64
	// 解码 C，数值类型=float64
}
