package web

import "fmt"

// RunRequestResponse 演示 *http.Request 和 ResponseWriter
func RunRequestResponse() {
	fmt.Println("=== *http.Request 请求对象 ===")
	fmt.Println("r.Method        = GET/POST/PUT/DELETE")
	fmt.Println("r.URL.Path      = /users/123")
	fmt.Println("r.URL.Query()   = ?name=alice&age=25 → Get(\"name\")=\"alice\"")
	fmt.Println("r.Header.Get(\"Authorization\") → token")
	fmt.Println("r.RemoteAddr     = 客户端 IP")
	fmt.Println("r.Body           = 请求体（io.ReadCloser，只能读一次！）")
	fmt.Println("r.Context()      = 请求的 context（超时/取消）")
	fmt.Println()
	fmt.Println("=== ResponseWriter 写响应 ===")
	fmt.Println("⚠️ 顺序不能错：Header → WriteHeader → Write")
	fmt.Println("1. w.Header().Set(\"Content-Type\", \"application/json\")")
	fmt.Println("2. w.WriteHeader(201)                    // 默认 200")
	fmt.Println("3. w.Write([]byte(`{\\\"status\\\":\\\"ok\\\"}`))")
	fmt.Println()
	fmt.Println("读 Body 三种方式:")
	fmt.Println("  JSON:  json.NewDecoder(r.Body).Decode(&obj)")
	fmt.Println("  Form:  r.ParseForm(); r.FormValue(\"username\")")
	fmt.Println("  File:  r.FormFile(\"avatar\")")
	fmt.Println()
	fmt.Println("⚠️ r.Body 只能读一次！多次读需要 io.ReadAll + 重置")
}
