package web

import "fmt"

// RunFileUploadDownload 演示文件上传下载
func RunFileUploadDownload() {
	fmt.Println("=== 文件上传 ===")
	fmt.Println("// 单文件")
	fmt.Println("file, err := c.FormFile(\"file\")")
	fmt.Println("c.SaveUploadedFile(file, \"./uploads/\"+file.Filename)")
	fmt.Println()
	fmt.Println("// 多文件")
	fmt.Println("form, _ := c.MultipartForm()")
	fmt.Println("for _, f := range form.File[\"photos\"] {")
	fmt.Println("    c.SaveUploadedFile(f, \"./uploads/\"+f.Filename)")
	fmt.Println("}")
	fmt.Println()
	fmt.Println("=== 文件下载 ===")
	fmt.Println("c.File(\"./uploads/\" + c.Param(\"filename\"))       // 浏览器预览")
	fmt.Println("c.FileAttachment(\"./uploads/file.zip\", \"archive.zip\") // 强制下载")
	fmt.Println()
	fmt.Println("=== 静态文件服务 ===")
	fmt.Println("r.Static(\"/static\", \"./public\")")
	fmt.Println("// /static/style.css → ./public/style.css")
	fmt.Println()
	fmt.Println("前端类比: ≈ multer 中间件 / express.static()")
}
