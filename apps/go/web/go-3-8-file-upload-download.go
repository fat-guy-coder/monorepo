package web

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
)

// RunFileUploadDownload 演示文件上传与下载：multipart 解析、流式保存、
// Content-Disposition、静态文件服务与断点续传。
//
// 内容包括：
//   - multipart/form-data 编码原理
//   - multipart.Writer 手工构造上传请求 + 解析回读（真实演示）
//   - 单文件 / 多文件上传（Gin 代码打印）
//   - http.MaxBytesReader 限制请求体大小
//   - io.Copy 流式边收边写
//   - Content-Disposition 强制下载 + ServeContent Range 断点续传
//   - ServeFile / FileServer 静态服务
//
// 全程使用标准库，并通过 httptest 做真实演示。
func RunFileUploadDownload() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  08 · 文件上传与下载 (multipart / io.Copy / ServeContent)")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. multipart/form-data 原理
	// ============================================================
	fmt.Println("\n📌 1. multipart/form-data——文件上传的编码方式")
	fmt.Println("   普通表单用 urlencoded 不适合二进制；multipart 用随机 boundary 切块，")
	fmt.Println("   每块自带 Content-Disposition，能同时传文件 + 普通字段。")

	fmt.Println(`
// 前端:
//   <form action="/upload" method="post" enctype="multipart/form-data">
//     <input type="file" name="file">
//   </form>
// 或 JS: formData.append('file', fileInput.files[0])，fetch 提交。
// Content-Type: multipart/form-data; boundary=----xxx
// 服务器按 boundary 拆分，name 相同的块合并成文件/字段
// 注意: 前端 FormData 的 key 必须和后端 FormFile("file") 的字符串一致`)

	// ============================================================
	// 2. multipart.Writer 构造请求
	// ============================================================
	fmt.Println("\n📌 2. multipart.Writer——用 Go 手工构造上传请求")
	fmt.Println("   WriteField 加普通字段，CreateFormFile 加文件，Close() 写收尾 boundary。")
	fmt.Println("   FormDataContentType() 返回带 boundary 的完整 Content-Type。")
	fmt.Println("   ⚠️ 忘了 Close() 的话，body 没有结束 boundary，服务器会等不到文件结尾而超时。")

	// 真实演示：构造 multipart → 解析回读
	fmt.Println("--- 演示: multipart.Writer 构造请求，再用 multipart.Reader 解析回读 ---")
	var buf bytes.Buffer
	mw := multipart.NewWriter(&buf)
	mw.WriteField("title", "我的头像")
	fw, _ := mw.CreateFormFile("file", "avatar.png")
	fw.Write([]byte("fake png content"))
	mw.Close()
	fmt.Printf("    Content-Type: %s\n", mw.FormDataContentType())
	mr := multipart.NewReader(&buf, mw.Boundary())
	form, err := mr.ReadForm(1 << 20)
	if err != nil {
		fmt.Println("    解析失败:", err)
	} else {
		fmt.Printf("    普通字段 title = %s\n", form.Value["title"][0])
		fh := form.File["file"][0]
		fmt.Printf("    文件字段 name = %s, size = %d 字节\n", fh.Filename, fh.Size)
	}

	// ============================================================
	// 3. 单文件上传
	// ============================================================
	fmt.Println("\n📌 3. 单文件上传——c.FormFile + SaveUploadedFile (Gin)")
	fmt.Println("   FormFile(\"file\") 返回 *multipart.FileHeader（文件名/大小/类型），")
	fmt.Println("   SaveUploadedFile 内部用 io.Copy 流式落盘，不会把整个文件读进内存。")
	fmt.Println("   ⚠️ 坑: 文件名是客户端传的，直接拼接有路径穿越风险，要用 filepath.Base 清洗。")

	fmt.Println(`
// Gin 代码示例:
//   r.POST("/upload", func(c *gin.Context) {
//       file, err := c.FormFile("file")
//       if err != nil { c.JSON(400, gin.H{"error": "no file"}); return }
//       dst := "./uploads/" + file.Filename
//       if err := c.SaveUploadedFile(file, dst); err != nil {
//           c.JSON(500, gin.H{"error": err.Error()}); return
//       }
//       c.JSON(200, gin.H{"ok": true, "saved": dst, "size": file.Size})
//   })
// curl -F "file=@./demo.txt" http://localhost:8080/upload
// 输出: {"ok":true,"saved":"./uploads/demo.txt","size":14}`)

	// ============================================================
	// 4. 多文件 + 大小限制
	// ============================================================
	fmt.Println("\n📌 4. 多文件上传 + 大小限制")
	fmt.Println("   多文件用 c.MultipartForm() 的 form.File[\"photos\"] 切片循环处理。")
	fmt.Println("   生产必须限制请求体大小: http.MaxBytesReader，防止恶意大文件拖垮内存和磁盘。")

	// 真实演示 MaxBytesReader
	fmt.Println("--- 演示: http.MaxBytesReader 限制 Body 大小 ---")
	rr := httptest.NewRecorder()
	big := httptest.NewRequest("POST", "/upload", strings.NewReader("0123456789abcdef"))
	limited := http.MaxBytesReader(rr, big.Body, 8)
	_, rerr := io.ReadAll(limited)
	var maxErr *http.MaxBytesError
	if errors.As(rerr, &maxErr) {
		fmt.Printf("    Body 超限被拒: %v (限制 %d 字节)\n", rerr, maxErr.Limit)
	}

	fmt.Println(`
// Gin 代码示例 (多文件 + 限制):
//   r.Use(func(c *gin.Context) {
//       c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 10<<20)
//       c.Next()
//   })
//   r.MaxMultipartMemory = 8 << 20   // 超过 8MB 的部分落临时文件
//   form, _ := c.MultipartForm()     // 前端 <input name="photos" multiple>
//   for _, f := range form.File["photos"] {
//       c.SaveUploadedFile(f, "./uploads/"+f.Filename)
//   }`)

	// ============================================================
	// 5. 流式保存 io.Copy
	// ============================================================
	fmt.Println("\n📌 5. 手动流式保存——io.Copy 边收边写")
	fmt.Println("   file.Open() 拿到 io.Reader，io.Copy 流式写入目标，内存恒定为小缓冲。")
	fmt.Println("   multipart.File 是按需读取的流，不是整个文件在内存里——内存 O(1)。")

	// 真实演示 io.Copy
	fmt.Println("--- 演示: io.Copy 流式复制 ---")
	var sb strings.Builder
	n, _ := io.Copy(&sb, strings.NewReader("stream data 12345"))
	fmt.Printf("    io.Copy 复制 %d 字节: %q\n", n, sb.String())

	fmt.Println(`
// 完整流程 (Gin + 标准库):
//   src, _ := file.Open()
//   defer src.Close()
//   dst, _ := os.Create("./uploads/" + file.Filename)
//   defer dst.Close()
//   n, err := io.Copy(dst, src)
//   // 传 500MB 大文件内存峰值约 32KB (io.Copy 默认缓冲)`)

	// ============================================================
	// 6. 下载与 Content-Disposition
	// ============================================================
	fmt.Println("\n📌 6. 下载与 Content-Disposition——控制浏览器行为")
	fmt.Println("   attachment 强制下载，inline 浏览器内预览。")
	fmt.Println("   中文文件名直接拼会乱码: filename= 用 ASCII 兜底，filename*=UTF-8'' 给现代浏览器。")

	fmt.Println(`
// Gin 代码示例:
//   r.GET("/download/:name", func(c *gin.Context) {
//       name := c.Param("name")
//       c.Header("Content-Disposition", "attachment; filename="+name)
//       c.File("./uploads/" + name)
//   })
//   curl -O http://localhost:8080/download/go.png → 保存为 go.png`)

	// 真实演示 ServeContent Range 断点续传
	fmt.Println("--- 演示: http.ServeContent 支持 Range 断点续传 ---")
	tmp, err := os.CreateTemp("", "demo*.txt")
	if err != nil {
		fmt.Println("    创建临时文件失败:", err)
	}
	if tmp != nil {
		defer os.Remove(tmp.Name())
		defer tmp.Close()
		tmp.WriteString("hello file content")
		tmp.Seek(0, 0)
		info, _ := tmp.Stat()
		rr = httptest.NewRecorder()
		rangeReq := httptest.NewRequest("GET", "/file", nil)
		rangeReq.Header.Set("Range", "bytes=6-10")
		http.ServeContent(rr, rangeReq, "demo.txt", info.ModTime(), tmp)
		fmt.Printf("    带 Range 请求 → Code=%d, Body=%q\n", rr.Code, rr.Body.String())
		fmt.Printf("    Content-Range = %s\n", rr.Header().Get("Content-Range"))

		// ============================================================
		// 7. 静态文件服务
		// ============================================================
		fmt.Println("\n📌 7. 静态文件服务——ServeFile / FileServer")
		fmt.Println("   http.ServeFile 返回单个文件，http.FileServer 提供整个目录的静态服务。")

		fmt.Println(`
// 静态目录一行搞定:
//   fs := http.FileServer(http.Dir("./public"))
//   http.Handle("/static/", http.StripPrefix("/static/", fs))
// 访问 /static/style.css → ./public/style.css
// Gin 对应: r.Static("/static", "./public")`)

		// 真实演示 ServeFile
		fmt.Println("--- 演示: http.ServeFile 返回单个文件 ---")
		rr = httptest.NewRecorder()
		http.ServeFile(rr, httptest.NewRequest("GET", "/", nil), tmp.Name())
		fmt.Printf("    ServeFile Body = %q\n", rr.Body.String())
	}

	// ============================================================
	// 8. 大文件与分片
	// ============================================================
	fmt.Println("\n📌 8. 大文件与分片——生产方案")
	fmt.Println("   小文件 FormFile + SaveUploadedFile；中文件 io.Copy + MaxBytesReader；")
	fmt.Println("   大文件下载用 http.ServeContent (Range 续传)；超大文件上传用分片（前端切块）。")
	fmt.Println("   生产优先对象存储 (OSS/MinIO)，分片续传、CDN 分发都是现成的。")

	fmt.Println(`
// 分片上传概念流程:
//   ① 前端把大文件切成 N 片，逐片 POST /upload/chunk {index,total,chunk}
//   ② 服务器每片写入 tmp 目录（按分片号命名），返回该片序号
//   ③ 全部传完后 POST /upload/merge，合并分片为最终文件
//   ④ 优点: 单片失败只重传单片；缺点: 需处理续传/校验/合并`)

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  文件上传与下载 核心概念总结                                ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  multipart/form-data → boundary 切块传文件 + 字段           ║")
	fmt.Println("║  multipart.Writer    → 手工构造上传请求 (别忘了 Close)      ║")
	fmt.Println("║  c.FormFile / MultipartForm → 取单 / 多文件                ║")
	fmt.Println("║  http.MaxBytesReader → 限制请求体大小                      ║")
	fmt.Println("║  io.Copy             → 流式边收边写, 内存 O(1)             ║")
	fmt.Println("║  Content-Disposition → attachment 强制下载                 ║")
	fmt.Println("║  ServeContent        → Range 断点续传                      ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: 中文文件名用 filename*=UTF-8'' 编码；生产文件存储优先考虑对象存储。")
}
