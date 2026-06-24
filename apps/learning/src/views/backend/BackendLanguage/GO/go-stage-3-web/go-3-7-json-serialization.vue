<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">JSON 序列化</h1><p class="text-sm text-slate-500 mt-1">Marshal/Unmarshal · struct tag · 自定义格式——Go 的 JSON 处理</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-3-7-json-serialization.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-7</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📦</span>Marshal / Unmarshal——JSON 的编码解码</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Go 的 json.Marshal ≈ <strong>JSON.stringify()</strong>。json.Unmarshal ≈ <strong>JSON.parse()</strong>。struct tag ≈ <strong>TS 的 interface 定义</strong>——告诉 JSON 库字段名怎么映射。</p></aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="json_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Struct Tag——JSON 映射的核心</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">struct tag 控制序列化行为：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json:"fieldname,option"</code>。常用选项：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">omitempty</code>（空值省略）、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">-</code>（忽略）、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">string</code>（数字转字符串）。</p>
        <div class="mb-4"><Code language="go" :code="tagCode" title="struct_tag.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>自定义 Marshal/Unmarshal</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">实现了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json.Marshaler</code> / <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">json.Unmarshaler</code> 接口的类型可以<strong>自定义 JSON 表示</strong>。常用于时间格式、枚举值映射。</p>
        <div class="mb-4"><Code language="go" :code="customCode" title="custom_json.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">json.Marshal</code> ≈ JSON.stringify，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">json.Unmarshal</code> ≈ JSON.parse</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>struct tag 控制字段映射、omitempty、忽略、重命名</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>实现 Marshaler/Unmarshaler 接口 → 自定义 JSON 格式</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-6-gin-advanced" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Gin 进阶</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-8-file-upload-download" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：文件上传下载 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"Marshal基础"},{id:"sec-2",name:"StructTag"},{id:"sec-3",name:"自定义序列化"},{id:"sec-4",name:"小结"}]
const basicCode = `type User struct {
    Name string ` + "`" + `json:"name"` + "`" + `
    Age  int    ` + "`" + `json:"age"` + "`" + `
}
// struct → JSON
u := User{Name: "Alice", Age: 25}
b, _ := json.Marshal(u)           // {"name":"Alice","age":25}
// JSON → struct
var u2 User
json.Unmarshal(b, &u2)            // u2.Name = "Alice"`

const tagCode = `type User struct {
    ID       int    ` + "`" + `json:"id"` + "`" + `                        // 字段名 id
    Name     string ` + "`" + `json:"name"` + "`" + `                       // 字段名 name
    Password string ` + "`" + `json:"-"` + "`" + `                          // 忽略——不序列化
    Age      int    ` + "`" + `json:"age,omitempty"` + "`" + `              // 零值时省略
    Score    float64 ` + "`" + `json:"score,string"` + "`" + `              // 数字转字符串 "95.5"
}`

const customCode = `type CustomTime time.Time
// 实现 Marshaler——自定义 JSON 输出格式
func (ct CustomTime) MarshalJSON() ([]byte, error) {
    t := time.Time(ct)
    return json.Marshal(t.Format("2006-01-02 15:04:05"))
}
// 实现 Unmarshaler——自定义 JSON 解析
func (ct *CustomTime) UnmarshalJSON(b []byte) error {
    var s string; json.Unmarshal(b, &s)
    t, _ := time.Parse("2006-01-02 15:04:05", s)
    *ct = CustomTime(t); return nil
}`
</script>
