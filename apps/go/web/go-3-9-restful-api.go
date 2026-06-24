package web

import "fmt"

// RunRestfulApi 演示 RESTful API 设计
func RunRestfulApi() {
	fmt.Println("=== RESTful API 设计规范 ===")
	fmt.Println("统一响应格式（你的后端就在用）:")
	fmt.Println("  { \"code\": 0, \"message\": \"ok\", \"data\": {...} }")
	fmt.Println()
	fmt.Println("CRUD 映射:")
	fmt.Println("  GET    /users      → 列表   (200)")
	fmt.Println("  GET    /users/:id  → 详情   (200)")
	fmt.Println("  POST   /users      → 创建   (201)")
	fmt.Println("  PUT    /users/:id  → 全量更新 (200)")
	fmt.Println("  PATCH  /users/:id  → 部分更新 (200)")
	fmt.Println("  DELETE /users/:id  → 删除   (204)")
	fmt.Println()
	fmt.Println("HTTP 状态码速查:")
	fmt.Println("  200 OK           GET/PUT 成功")
	fmt.Println("  201 Created      POST 创建成功")
	fmt.Println("  204 No Content   DELETE 成功（无返回体）")
	fmt.Println("  400 Bad Request  参数校验失败")
	fmt.Println("  401 Unauthorized 未登录/token 过期")
	fmt.Println("  404 Not Found    资源不存在")
	fmt.Println("  500 Internal     服务器内部错误")
	fmt.Println()
	fmt.Println("前端类比: ≈ RESTful 路由规范——就像 pages/users/[id].vue")
}
