package web

import "fmt"

// RunTemplateEmbed 演示 html/template 与 embed
func RunTemplateEmbed() {
	fmt.Println("=== html/template + embed ===")
	fmt.Println("embed 把静态文件嵌入二进制（Go 1.16+）:")
	fmt.Println("  //go:embed templates/*")
	fmt.Println("  var templateFS embed.FS")
	fmt.Println("  //go:embed static/*")
	fmt.Println("  var staticFS embed.FS")
	fmt.Println()
	fmt.Println("模板渲染:")
	fmt.Println("  tmpl := template.Must(template.ParseFS(templateFS, \"templates/*.html\"))")
	fmt.Println("  tmpl.ExecuteTemplate(w, \"index.html\", data)")
	fmt.Println()
	fmt.Println("静态文件服务:")
	fmt.Println("  http.Handle(\"/static/\", http.FileServer(http.FS(staticFS)))")
	fmt.Println()
	fmt.Println("好处:")
	fmt.Println("  - 编译后只需一个二进制文件——不需要 templates/ 目录")
	fmt.Println("  - 部署超简单：scp binary server:/app/")
	fmt.Println()
	fmt.Println("前端类比: ≈ Webpack 把资源打包进 bundle")
}
