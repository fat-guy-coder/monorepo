package web

import (
	"bytes"
	"fmt"
	htemplate "html/template"
	"strings"
	texttemplate "text/template"
)

// RunTemplateEmbed 演示模板与文件嵌入（html/template + go:embed）。
//
// 内容包括：
//   - 为什么需要 embed（运行时读文件的三个坑）
//   - go:embed 三种形式（string / []byte / embed.FS）与只读限制
//   - template.ParseFS + t.Execute 数据注入
//   - html/template 自动转义防 XSS（真实演示）
//   - 模板语法 {{.}} / {{if}} / {{range}} 与 Layout 复用（真实演示）
//   - 运行时读文件 vs embed 对比 + 最佳实践
//
// 说明：embed 包只有在配合 //go:embed 指令时才允许 import（否则编译报错），
// 而本文件没有真实嵌入的模板文件，因此 embed 相关代码以注释字符串演示，
// 模板渲染用字符串模板真实跑通（html/template / text/template 均可真实使用）。
func RunTemplateEmbed() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  01 · 模板与文件嵌入（html/template + go:embed）")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. 为什么需要 embed
	// ============================================================
	fmt.Println("\n📌 1. 为什么需要 embed — 运行时读文件的三个坑")
	fmt.Println("   在 embed 出现之前（Go 1.16 前），服务端模板只能用 os.ReadFile 运行时从磁盘读。")
	fmt.Println("   这在部署时是灾难。")

	fmt.Println(`
// 三个坑:
//   ① 部署要带一堆文件——二进制 + 模板 + 静态资源，少拷一个就 500
//   ② 相对路径依赖工作目录——systemd 下工作目录可能不是二进制所在目录，路径全乱
//   ③ Docker 镜像变大、层更复杂——多阶段构建要把文件 COPY 进镜像
//
// embed 之后: 只有一个二进制，拷一个文件就是全部；路径与工作目录无关；
//   还能配合 FROM scratch 镜像做几 MB 的极简容器
`)

	fmt.Println("   前端类比: //go:embed ≈ Webpack/Vite 构建时把 HTML/CSS/JS 打进 bundle，")
	fmt.Println("   也 ≈ import.meta.glob 批量导入文件——都是\"编译时知道文件、运行时当常量用\"。")
	fmt.Println("   ⚠️ 注意：embed 是编译期行为，改模板后不重新 go build，线上还是旧内容。")

	// ============================================================
	// 2. go:embed 三种形式
	// ============================================================
	fmt.Println("\n📌 2. go:embed 三种形式 + 只读限制")
	fmt.Println("   嵌入的目标类型决定你拿到的是什么：string（内容当字符串）、")
	fmt.Println("   []byte（原始字节）、embed.FS（一批文件，能按路径读取）。")

	fmt.Println(`
// embed_forms.go — go:embed 的三种形式（第三方思路，本文件不真实 import embed）
//   import "embed"
//
//   // 形式一：嵌入单个文件 → string（适合小配置）
//   //
//   //go:embed version.txt
//   var version string
//
//   // 形式二：嵌入单个文件 → []byte（适合二进制内容）
//   //
//   //go:embed logo.png
//   var logo []byte
//
//   // 形式三：嵌入一批文件 → embed.FS（模板/静态资源首选）
//   //
//   //go:embed templates/*
//   //go:embed static/*
//   var content embed.FS
//
//   func main() {
//       log.Println("version:", version)            // 输出: version: v1.0.0
//       log.Println("logo 字节数:", len(logo))       // 输出: logo 字节数: 2048
//       b, _ := fs.ReadFile(content, "templates/index.html")
//       log.Printf("模板 %d 字节", len(b))            // 输出: 模板 1024 字节
//   }
`)

	fmt.Println(`
// 硬性约束:
//   ① 只能注解 package 级静态 var（不能注解局部变量、不能注解 const）
//   ② 路径编译期确定（不能是变量或动态通配）
//   ③ 内容只读——运行时不可能被篡改，安全性反而更好
//   ④ 不能带 ../ 越界，不能嵌入 _ 或 . 开头的隐藏文件
//   ⑤ 模式 dir/* 匹配目录下所有文件；匹配不到会编译报错
`)

	// ============================================================
	// 3. ParseFS + Execute
	// ============================================================
	fmt.Println("\n📌 3. template.ParseFS + t.Execute — 数据注入")
	fmt.Println("   ParseFS 会扫描 embed.FS 里匹配模式的所有文件，各解析成一个模板并放进")
	fmt.Println("   同一个 *template.Template；ExecuteTemplate(w, name, data) 按名字渲染。")

	fmt.Println(`
// template_parse.go — ParseFS 解析 + Execute 注入数据（思路）
//   import "html/template"
//
//   //go:embed templates/*.html
//   var tmplFS embed.FS
//
//   type PageData struct { Title, Message string; Users []string }
//
//   tmpl := template.Must(template.ParseFS(tmplFS, "templates/*.html"))
//   // 浏览器访问 / 看到:
//   // <h1>首页</h1><p>欢迎回来</p><ul><li>Alice</li><li>Bob</li></ul>
`)

	// 真实演示: 用字符串模板跑通「解析 + 注入 + 渲染」全流程
	fmt.Println("--- 演示: 字符串模板渲染（{{.}} / {{if}} / {{range}}）---")
	demoParseExecute()

	fmt.Println(`
// 要点:
//   - ParseFS 一次搞定所有模板，别对每个文件调一次 Parse（会各自成独立集合）
//   - 只有一个模板时可直接 Execute(w, data)；多个用 ExecuteTemplate(w, 名字, data)
//   - 模板可以定义函数: template.New("x").Funcs(template.FuncMap{"upper": strings.ToUpper})
//   - 用 template.Must 包住——解析失败宁愿启动就崩，也不要运行到一半才报错
`)

	// ============================================================
	// 4. 自动转义防 XSS
	// ============================================================
	fmt.Println("\n📌 4. html/template 自动转义 — 白捡的 XSS 防护")
	fmt.Println("   用 text/template 渲染 HTML 等于裸奔——用户输入 <script> 会被原样插进页面执行。")
	fmt.Println("   而 html/template 会在渲染时根据上下文自动转义：标签内容转义成")
	fmt.Println("   &lt;script&gt;，属性/URL/JS 里也各有对应规则，还能识别 javascript: 危险协议。")

	// 真实演示: html/template vs text/template 输出对比
	fmt.Println("--- 演示: html/template 自动转义 vs text/template 裸奔 ---")
	demoXSS()

	fmt.Println(`
// ⚠️ 别用 template.HTML 白名单——它会跳过转义。
//   只有完全信任内容（如自家 markdown 转出的安全 HTML）才用；
//   用户输入直接包 template.HTML 等于亲手关掉防护。
`)

	fmt.Println("   前端类比: html/template 自动转义 ≈ React/Vue 的默认文本插值——")
	fmt.Println("   Vue 的 {{ name }} 自动转义，而 v-html 就像 template.HTML，是 XSS 的口子。")

	// ============================================================
	// 5. 模板语法 + Layout
	// ============================================================
	fmt.Println("\n📌 5. 模板语法 — {{.}} {{if}} {{range}} 与 Layout 复用")
	fmt.Println("   模板语法核心就三个：{{.}}（当前数据）、{{if}}（条件）、{{range}}（循环），")
	fmt.Println("   都支持 else 分支。大站点普遍用 Layout：外壳写一次，页面只定义内容块。")

	// 真实演示 1: 模板函数管道
	fmt.Println("--- 演示: 模板函数 {{.Name | upper}} ---")
	demoTemplateFunc()

	// 真实演示 2: Layout 复用
	fmt.Println("--- 演示: Layout 外壳 + {{define}} + {{template}} 拼装 ---")
	demoLayout()

	fmt.Println(`
// 语法速查:
//   {{.}}           当前数据对象           示例 {{.Title}}
//   {{if}}          条件分支(空值=false)    {{if .Admin}}…{{else}}…{{end}}
//   {{range}}       遍历 slice/map          {{range .Items}}…{{end}}
//   {{define}}      定义命名块              {{define "content"}}…{{end}}
//   {{template}}    调用命名块              {{template "content" .}}
//   {{. | fn}}      管道：传给函数          {{.Name | upper}}
`)

	// ============================================================
	// 6. 对比 + 小结
	// ============================================================
	fmt.Println("\n📌 6. 运行时读文件 vs embed + 最佳实践")

	fmt.Println(`
// 运行时读文件          vs  go:embed
//   部署要带一堆文件          单文件，拷一个就齐
//   依赖工作目录/文件系统     无，内容在内存里
//   改文件即生效(开发爽)      必须重新 build
//   文件可被外部篡改          只读，运行时改不了
//   适用模板频繁改的内部工具   生产服务首选(版本锁死,可复现)
`)

	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  模板与 embed 核心要点总结                                ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  go:embed       → 编译期把文件打进二进制                ║")
	fmt.Println("║  三种形态       → string / []byte / embed.FS             ║")
	fmt.Println("║  ParseFS        → 批量解析模板，ExecuteTemplate 渲染    ║")
	fmt.Println("║  html/template  → 自动转义防 XSS，template.HTML 慎用    ║")
	fmt.Println("║  语法           → {{.}} / {{if}} / {{range}}            ║")
	fmt.Println("║  Layout         → {{define}} + {{template}} 复用外壳     ║")
	fmt.Println("║  收益           → 单二进制部署、镜像极小、内容不可篡改   ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: 静态资源（CSS/JS/图片）同样 embed，用 http.FileServer(http.FS(staticFS)) 托管；")
	fmt.Println("   embed + FROM scratch 镜像能压到十几 MB，这就是\"单二进制部署\"的核心卖点。")
}

// demoParseExecute 用字符串模板跑通「解析 + 注入 + 渲染」。
func demoParseExecute() {
	tmplSrc := `<html>
<head><title>{{.Title}}</title></head>
<body>
  <h1>{{.Message}}</h1>
  {{if .IsAdmin}}<a href="/admin">管理后台</a>{{else}}<span>普通用户</span>{{end}}
  <ul>
  {{range .Users}}<li>{{.}}</li>{{end}}
  </ul>
</body>
</html>`

	t := htemplate.Must(htemplate.New("index.html").Parse(tmplSrc))
	data := struct {
		Title   string
		Message string
		IsAdmin bool
		Users   []string
	}{Title: "首页", Message: "欢迎回来", IsAdmin: false, Users: []string{"Alice", "Bob"}}

	var buf bytes.Buffer
	if err := t.Execute(&buf, data); err != nil {
		fmt.Println("   渲染失败:", err)
		return
	}
	fmt.Printf("   渲染结果:\n%s\n", buf.String())
}

// demoXSS 对比 html/template（自动转义）与 text/template（裸奔）。
func demoXSS() {
	userInput := "<script>alert('xss')</script>"
	evilLink := "javascript:alert(1)"

	// html/template：自动转义，危险协议被替换成 ZgotmplZ
	t := htemplate.Must(htemplate.New("safe").Parse(`<p>{{.Input}}</p><a href="{{.URL}}">go</a>`))
	data := struct{ Input, URL string }{userInput, evilLink}
	var buf bytes.Buffer
	if err := t.Execute(&buf, data); err != nil {
		fmt.Println("   渲染失败:", err)
		return
	}
	fmt.Println("   html/template 输出（安全，浏览器不会执行）:")
	fmt.Println("   " + buf.String())

	// text/template：裸奔，原样输出
	t2 := texttemplate.Must(texttemplate.New("raw").Parse(`<p>{{.}}</p>`))
	var buf2 bytes.Buffer
	_ = t2.Execute(&buf2, userInput)
	fmt.Println("   text/template 输出（裸奔，浏览器会执行脚本!）:")
	fmt.Println("   " + buf2.String())
}

// demoTemplateFunc 演示模板函数管道 {{.Name | upper}}。
func demoTemplateFunc() {
	funcs := htemplate.FuncMap{"upper": strings.ToUpper}
	t := htemplate.Must(htemplate.New("f").Funcs(funcs).Parse(`<p>{{.Name | upper}}</p>`))
	var buf bytes.Buffer
	if err := t.Execute(&buf, struct{ Name string }{"alice"}); err != nil {
		fmt.Println("   渲染失败:", err)
		return
	}
	fmt.Println("   模板: <p>{{.Name | upper}}</p>，数据 Name=alice")
	fmt.Println("   输出: " + buf.String())
}

// demoLayout 演示 Layout 外壳复用：{{define}} 定义内容块，{{template}} 注入。
func demoLayout() {
	tmpl := htemplate.New("root")

	// 先定义页面内容块 content
	tmpl = htemplate.Must(tmpl.Parse(`{{define "content"}}<h1>{{.Title}}</h1><p>{{.Message}}</p>{{end}}`))

	// 再定义外壳 layout.html，用 {{template "content" .}} 占位
	layout := `<html>
<head><title>{{.Title}}</title></head>
<body>
  <nav>Logo · 首页 · 关于</nav>
  {{template "content" .}}
  <footer>© 2026</footer>
</body>
</html>`
	tmpl = htemplate.Must(tmpl.New("layout.html").Parse(layout))

	var buf bytes.Buffer
	if err := tmpl.ExecuteTemplate(&buf, "layout.html", struct {
		Title   string
		Message string
	}{Title: "首页", Message: "欢迎回来"}); err != nil {
		fmt.Println("   渲染失败:", err)
		return
	}
	fmt.Println("   Layout 渲染结果（nav/footer 只写一次，页面只写 content 块）:")
	fmt.Println(buf.String())
	fmt.Println("   好处: 改 Layout 全局生效，加新页面只需新增一个 pages/xx.html——符合 DRY 原则")
}
