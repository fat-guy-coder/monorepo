package web

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Age  int    `json:"age,omitempty"`
	Pwd  string `json:"-"` // 忽略
}

// RunJsonSerialization 演示 JSON 序列化
func RunJsonSerialization() {
	// === Marshal ≈ JSON.stringify ===
	fmt.Println("=== Marshal ===")
	u := User{ID: 1, Name: "Alice", Age: 25, Pwd: "secret"}
	b, _ := json.Marshal(u)
	fmt.Println(string(b))
	// 输出: {"id":1,"name":"Alice","age":25}

	// 美化输出
	b2, _ := json.MarshalIndent(u, "", "  ")
	fmt.Println(string(b2))
	// 输出:
	// {
	//   "id": 1,
	//   "name": "Alice",
	//   "age": 25
	// }

	// === Unmarshal ≈ JSON.parse ===
	fmt.Println("\n=== Unmarshal ===")
	var u2 User
	json.Unmarshal([]byte(`{"id":2,"name":"Bob","age":30}`), &u2)
	fmt.Printf("%+v\n", u2)
	// 输出: {ID:2 Name:Bob Age:30 Pwd:}

	// === struct tag 说明 ===
	fmt.Println("\n=== struct tag ===")
	fmt.Println("`json:\"id\"`            → JSON 字段名 id")
	fmt.Println("`json:\"age,omitempty\"`  → 零值时省略")
	fmt.Println("`json:\"-\"`             → 忽略，不序列化")
	fmt.Println("`json:\"score,string\"`   → 数字转字符串")
}
