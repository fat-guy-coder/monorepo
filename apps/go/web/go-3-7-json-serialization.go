package web

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"
)

// User 演示 struct tag 的基本用法。
//   - json:"id"          → 改名为 id
//   - json:"age,omitempty" → 零值时省略
//   - json:"-"           → 忽略，不序列化
type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Age  int    `json:"age,omitempty"`
	Pwd  string `json:"-"`
}

// CustomTime 自定义时间类型：序列化输出 "2006-01-02 15:04:05" 格式。
type CustomTime time.Time

// MarshalJSON 序列化时把 time 格式化成字符串。
func (ct CustomTime) MarshalJSON() ([]byte, error) {
	t := time.Time(ct)
	return json.Marshal(t.Format("2006-01-02 15:04:05"))
}

// UnmarshalJSON 反序列化时解析字符串回 time。
func (ct *CustomTime) UnmarshalJSON(b []byte) error {
	var s string
	if err := json.Unmarshal(b, &s); err != nil {
		return err
	}
	t, err := time.Parse("2006-01-02 15:04:05", s)
	if err != nil {
		return err
	}
	*ct = CustomTime(t)
	return nil
}

// Event 使用了自定义时间类型的结构体。
type Event struct {
	Title string     `json:"title"`
	At    CustomTime `json:"at"`
}

// RunJsonSerialization 演示 JSON 序列化：Marshal/Unmarshal、struct tag、流式、自定义格式。
//
// 内容包括：
//   - json.Marshal / Unmarshal（≈ JSON.stringify / JSON.parse）
//   - struct tag：改名 / omitempty / - / string
//   - Go ↔ JSON 类型映射、嵌套与匿名嵌入
//   - Decoder / Encoder 流式处理大 JSON
//   - 自定义 MarshalJSON / UnmarshalJSON（time.Time 格式化）
//   - 错误处理与类型断言
func RunJsonSerialization() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  07 · JSON 序列化 (Marshal / Unmarshal / struct tag)")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. Marshal / Unmarshal
	// ============================================================
	fmt.Println("\n📌 1. Marshal / Unmarshal——编码解码")
	fmt.Println("   json.Marshal ≈ JSON.stringify，json.Unmarshal ≈ JSON.parse。")
	fmt.Println("   Marshal 只序列化导出的字段（大写开头）；Unmarshal 必须传指针。")
	fmt.Println("   MarshalIndent 输出缩进版，方便调试。")

	// 真实演示
	fmt.Println("--- 演示: Marshal → Unmarshal 往返 ---")
	u := User{ID: 1, Name: "Alice", Age: 25, Pwd: "secret"}
	b, err := json.Marshal(u)
	if err != nil {
		fmt.Println("    Marshal 失败:", err)
	} else {
		fmt.Printf("    Marshal: %s\n", string(b))
	}
	b2, _ := json.MarshalIndent(u, "", "  ")
	fmt.Printf("    MarshalIndent:\n%s\n", string(b2))
	var u2 User
	if err := json.Unmarshal(b, &u2); err != nil {
		fmt.Println("    Unmarshal 失败:", err)
	} else {
		fmt.Printf("    Unmarshal: %+v\n", u2)
	}

	// ============================================================
	// 2. Struct Tag
	// ============================================================
	fmt.Println("\n📌 2. Struct Tag——JSON 映射的核心")
	fmt.Println("   完整格式 json:\"字段名,选项\"：改名、omitempty 零值省略、- 忽略、string 数字转字符串。")

	// 真实演示 tag 语义
	fmt.Println("--- 演示: omitempty / string / - 标签 ---")
	type Product struct {
		ID       int     `json:"id"`
		Name     string  `json:"name"`
		Password string  `json:"-"`
		Price    float64 `json:"price,omitempty"`
		Count    int     `json:"count,string"`
	}
	p := Product{ID: 1, Name: "book", Password: "x", Price: 0, Count: 5}
	pb, _ := json.Marshal(p)
	fmt.Printf("    Marshal: %s\n", string(pb))
	fmt.Println("    解释: Price=0 被 omitempty 省略; Count 变成字符串; Password 被忽略")
	// string 标签反序列化同样生效：数字字符串能转回数值
	var p2 Product
	json.Unmarshal([]byte(`{"id":2,"count":"8"}`), &p2)
	fmt.Printf("    Unmarshal count: %d\n", p2.Count)

	// ============================================================
	// 3. 类型映射
	// ============================================================
	fmt.Println("\n📌 3. Go ↔ JSON 类型映射")
	fmt.Println("   int/float → number, []T → array, map → object, struct → object,")
	fmt.Println("   time.Time → string(RFC3339), nil → null。匿名嵌入字段会被拍平。")

	// 真实演示嵌套与嵌入
	fmt.Println("--- 演示: 嵌套对象 / 数组 / map / 匿名嵌入 ---")
	type Address struct {
		City string `json:"city"`
	}
	type Profile struct {
		Name    string         `json:"name"`
		Address Address        `json:"address"`
		Tags    []string       `json:"tags"`
		Extra   map[string]int `json:"extra"`
	}
	prof := Profile{
		Name:    "Bob",
		Address: Address{City: "Hangzhou"},
		Tags:    []string{"go", "gin"},
		Extra:   map[string]int{"x": 1},
	}
	pb3, _ := json.Marshal(prof)
	fmt.Printf("    嵌套对象: %s\n", string(pb3))

	type Animal struct {
		Name string `json:"name"`
	}
	type Dog struct {
		Animal
		Age int `json:"age"`
	}
	db, _ := json.Marshal(Dog{Animal: Animal{Name: "旺财"}, Age: 3})
	fmt.Printf("    匿名嵌入拍平: %s\n", string(db))

	// ============================================================
	// 4. Decoder / Encoder 流式
	// ============================================================
	fmt.Println("\n📌 4. Decoder / Encoder——流式处理大 JSON")
	fmt.Println("   json.NewEncoder(w) 流式写、json.NewDecoder(r) 流式读，内存恒定。")
	fmt.Println("   dec.More() 判断流里还有没有下一个值；处理 JSONL 日志必备。")

	// 真实演示 Encoder/Decoder
	fmt.Println("--- 演示: Encoder 流式写出 + Decoder 流式读入 ---")
	var sb strings.Builder
	enc := json.NewEncoder(&sb)
	enc.Encode(User{ID: 1, Name: "a"})
	enc.Encode(User{ID: 2, Name: "b"})
	fmt.Printf("    Encoder 输出:\n%s", sb.String())

	data := `{"name":"a","age":1}{"name":"b","age":2}`
	dec := json.NewDecoder(strings.NewReader(data))
	var names []string
	for dec.More() {
		var row User
		if err := dec.Decode(&row); err != nil {
			break
		}
		names = append(names, row.Name)
	}
	fmt.Printf("    Decoder 读到的名字: %v\n", names)

	// ============================================================
	// 5. 自定义 MarshalJSON
	// ============================================================
	fmt.Println("\n📌 5. 自定义 MarshalJSON / UnmarshalJSON")
	fmt.Println("   实现 json.Marshaler / json.Unmarshaler 接口完全自定义 JSON 表示。")
	fmt.Println("   ⚠️ 坑: 在 MarshalJSON 里再调 json.Marshal(ct) 会无限递归——要先转回 time.Time。")
	fmt.Println("   ⚠️ type CustomTime time.Time 会失去 Format/Add 等方法，用前要转回 time.Time。")

	// 真实演示自定义时间
	fmt.Println("--- 演示: CustomTime 输出 2006-01-02 15:04:05 ---")
	ev := Event{Title: "发布会", At: CustomTime(time.Date(2026, 8, 20, 10, 0, 0, 0, time.Local))}
	evb, _ := json.Marshal(ev)
	fmt.Printf("    Marshal: %s\n", string(evb))
	var ev2 Event
	json.Unmarshal(evb, &ev2)
	fmt.Printf("    反序列化回: %s\n", time.Time(ev2.At).Format("2006-01-02 15:04:05"))

	// ============================================================
	// 6. 错误处理
	// ============================================================
	fmt.Println("\n📌 6. 错误处理与边界")
	fmt.Println("   JSON 错误信息很详细，可类型断言细分: SyntaxError / UnmarshalTypeError / InvalidUnmarshalError。")
	fmt.Println("   未知字段默认被忽略；严格拒绝用 dec.DisallowUnknownFields()。")

	// 真实演示错误
	fmt.Println("--- 演示: 三种典型错误 ---")
	var m map[string]any
	err = json.Unmarshal([]byte("{bad json"), &m)
	fmt.Printf("    语法错误: %v\n", err)
	var n int
	err = json.Unmarshal([]byte(`"hello"`), &n)
	fmt.Printf("    类型不匹配: %v\n", err)
	err = json.Unmarshal([]byte(`{"a":}`), &m)
	if se, ok := err.(*json.SyntaxError); ok {
		fmt.Printf("    断言 SyntaxError, 偏移: %d 字节\n", se.Offset)
	}

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  JSON 序列化 核心概念总结                                  ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  json.Marshal    → struct → JSON (≈ stringify)             ║")
	fmt.Println("║  json.Unmarshal  → JSON → struct (≈ parse, 传指针!)        ║")
	fmt.Println("║  struct tag      → 改名 / omitempty / - / string           ║")
	fmt.Println("║  Decoder/Encoder → 流式处理大 JSON, 内存恒定               ║")
	fmt.Println("║  MarshalJSON     → 自定义格式 (如时间格式化)               ║")
	fmt.Println("║  SyntaxError 等  → 类型断言细分错误                        ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: Web 接口反序列化失败返回 400，用 dec.DisallowUnknownFields() 拒绝多余字段。")
}
