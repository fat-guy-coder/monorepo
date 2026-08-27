<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🛡️ SQL 注入与参数化查询</h1>
          <p class="text-sm text-slate-500 mt-1">什么是 SQL 注入 · 占位符 ? 防注入原理 · 永远不拼接 SQL · ORDER BY/LIMIT/表名的白名单 · fmt.Sprintf 是漏洞</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/backend/internal/repository/menu_repo.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 什么是 SQL 注入 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是 SQL 注入：一段改变语法的输入
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          SQL 注入（SQL Injection）= <strong>攻击者把 SQL 代码「混进」用户输入，让它被数据库当成程序执行</strong>。
          经典攻击长这样——在用户名输入框敲 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">admin' OR '1'='1</code>，如果后端用字符串拼接，拼出来的 SQL 的<strong>逻辑就被改写了</strong>：
        </p>
        <div class="mb-4"><Code language="text" :code="attackInputCode" title="注入原理" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>SQL 注入 ≈ 前端 <strong>XSS</strong>——本质都是<strong>「把用户输入当代码执行」</strong>：XSS 把用户输入当 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">innerHTML</code> 的 HTML/JS 执行，SQL 注入把用户输入当数据库的 SQL 执行。防线同理：<strong>数据永远不能被当成代码渲染/执行</strong>。</p>
        </aside>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>拼接 SQL ≈ 前台把顾客说的菜名<strong>原样贴进厨房的菜谱文件</strong>。顾客说「一份麻婆豆腐，再加一行——把库存改成 0」，如果厨房直接把整句话当指令执行，灾难就发生了。正确做法是<strong>只允许顾客从菜单上勾选</strong>——白名单，输入只能影响「选哪道菜」，永远碰不到「怎么做菜」。</p>
        </aside>
      </section>

      <!-- 2. 漏洞版 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          漏洞版：字符串拼接 SQL（绝不要这样写）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          把用户输入用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">+</code> 拼进 SQL 字符串，是注入的<strong>唯一温床</strong>。看起来「只是拼个字符串」，但用户输入里的引号、分号、注释符都会<strong>被数据库当作语法结构解析</strong>。这是本页最重要的一句话：<strong>任何形式的拼接 = 把执行权交给输入者</strong>。
        </p>
        <div class="mb-4"><Code language="go" :code="vulnLoginCode" title="❌ login_vuln.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 判断标准就一条：</strong>SQL 语句里<strong>有没有出现过「用户输入的非占位符内容」</strong>。出现过 = 可注入，无论你做了多少「引号转义」「黑名单过滤」「只过滤了 select」——这些通通治标不治本，变体无穷无尽（大小写、<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">/**/</code> 注释、Unicode、双重 URL 编码）。</p>
        </aside>
      </section>

      <!-- 3. 修复版 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          修复版：占位符 ? 参数化查询
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的防注入姿势是 <strong>占位符 + 参数</strong>：SQL 文本里写 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">?</code> 占位，用户输入作为<strong>独立参数</strong>传给驱动，
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">database/sql</code> 与驱动配合把参数按<strong>字面量值</strong>绑定，<strong>自动处理引号/特殊字符的转义</strong>。用户输入到此为止——它是「数据」，永远不是「代码」。
        </p>
        <div class="mb-4"><Code language="go" :code="safeLoginCode" title="✅ login_safe.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 为什么这是终极解法：</strong>参数化查询<strong>从协议层面杜绝注入</strong>——注入的引号在数据库解析器眼里只是「一个字符的值」，根本没有机会改变 SQL 逻辑。它不需要你记住任何过滤规则，只要「参数永远走占位符」这一条纪律。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>参数化查询 ≈ Vue/React 模板<strong>不拼接 HTML</strong>：手写 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">innerHTML = '&lt;div&gt;' + userInput</code> ≈ 拼接 SQL；用 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">v-text</code> 插值（mustache 模板）让框架自动转义 ≈ 占位符。两者都是把用户输入固定在「数据」层，不让它变成「代码/标签」。</p>
        </aside>
      </section>

      <!-- 4. 原理 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          参数化查询的原理：骨架与参数分开走
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          关键在于<strong>客户端发两份东西，数据库分两阶段处理</strong>：阶段一把「SQL 骨架」交给数据库<strong>编译成执行计划</strong>（此时还没有任何用户数据）；阶段二再把「纯参数」绑定进槽位。<strong>SQL 解析发生在阶段一</strong>，注入的引号在阶段二才到场——那里已经没有解析器了，引号只是数据。
        </p>
        <div class="mb-4"><Code language="text" :code="paramFlowCode" title="两阶段原理" /></div>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>参数化查询 ≈ Go 的<strong>编译期类型检查</strong>——类型错误在编译期就被拦下，运行时永远看不到「类型不对」的代码；同理，注入代码在「解析阶段」就被隔离，数据库运行时只处理「值」。这也像 goroutine 之间靠 channel 传「数据」而非共享「可变内存」——把输入与执行彻底分层。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 统一占位符：</strong><code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">?</code> 是 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">database/sql</code> 的统一写法，实际替换成什么由驱动决定：<strong>MySQL 驱动用 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">?</code></strong>，<strong>PostgreSQL（lib/pq / pgx）用 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">$1</code>、<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">$2</code></strong> 按位置编号。底层都是同一种「先编译骨架、再绑定值」的协议。</p>
        </aside>
      </section>

      <!-- 5. 占位符边界 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          占位符的边界：ORDER BY / LIMIT / 表名（白名单）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">?</code> 只能替换「<strong>值</strong>」，不能替换「<strong>语法结构</strong>」——<strong>表名、列名、ORDER BY 的排序字段、LIMIT 的数值表达式都参数化不了</strong>（数据库根本没这种槽位）。这些场景的动态部分只能靠<strong>白名单映射</strong>：用户输入只能在固定集合里选，永远拼不进 SQL。
        </p>
        <div class="mb-4"><Code language="go" :code="whitelistCode" title="whitelist.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别被「占位符万能」骗了：</strong>很多人以为只要有 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">?</code> 就万事大吉，然后在 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">ORDER BY</code> 上直接拼了排序参数——<strong>这是注入点</strong>（排序字段可以拼出 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">id; DROP TABLE menu--</code>）。记住口诀：<strong>值 → 占位符；结构（表名/列名/排序/分页）→ 白名单</strong>。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>白名单 ≈ 前端「枚举约束」——排序下拉框只给 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">'asc' | 'desc'</code> 两个合法值，<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">select.value</code> 取不到第三个值。也像 TypeScript 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">type SortDir = 'asc' | 'desc'</code>——编译器只接受这两个字面量，别的直接报错。</p>
        </aside>
      </section>

      <!-- 6. fmt.Sprintf -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          fmt.Sprintf 拼 SQL 也是安全漏洞
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">fmt.Sprintf</code> 看起来比 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">+</code> 拼接「高级」，<strong>但它本质还是字符串格式化——结果仍然是一段可被注入的 SQL 文本</strong>。它和 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">+</code> 是同一个漏洞，只是写法不同。常见受害者是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">LIKE</code> 模糊搜索——<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">%s</code> 往里一填就注入。
        </p>
        <div class="mb-4"><Code language="go" :code="fmtSprintfCode" title="like_search.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 三条高危红线：</strong>① 任何 SQL 语句里出现 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">fmt.Sprintf</code> 或 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">+</code> 拼接且含用户输入——<strong>必注入</strong>；② <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">LIKE</code> 搜索即使参数化，<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">%</code> 通配符也要放进<strong>参数</strong>里（<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">"%"+search+"%"</code>），别拼进 SQL 文本；③ 别在日志里打印「用户输入拼好的 SQL」再二次使用——<strong>二次注入</strong>。</p>
        </aside>
      </section>

      <!-- 7. 真实案例 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          真实案例：登录绕过（漏洞版 vs 修复版）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          最经典的注入目标就是<strong>登录接口</strong>——攻击者不用密码就能以任意用户身份登录，进而拖库、删表。同一个输入，两种写法，命运完全不同：
        </p>
        <div class="mb-4"><Code language="go" :code="loginCompareCode" title="同一输入 / 两种结果" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 修复版还有一个隐藏好处：</strong>参数化后，攻击者<strong>探测不到系统是否设防</strong>——接口行为完全一致（都返回「登录失败」），他无法从响应区分「是被过滤了」还是「参数化没有这个用户」。安全防线的价值不仅是挡住攻击，也是<strong>不给攻击者反馈</strong>。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>这 ≈ Go 的 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">io.Reader</code> 抽象——调用方只拿到 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">Read</code> 返回的数据流，永远碰不到底层文件描述符；参数化之后，数据库也只拿「参数值」，碰不到 SQL 解析器。</p>
        </aside>
      </section>

      <!-- 8. 常见错误 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见错误与反模式
        </h2>
        <div class="mb-4"><Code language="text" :code="errCode" title="常见错误清单" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 「防了登录就完事」是最大的坑：</strong>搜索、排序、导出、批量操作、WHERE 里的 LIKE、统计报表……<strong>任何一个入口漏了拼接，整个库就暴露</strong>。正确姿势不是逐个入口防，而是立一条纪律：<strong>仓库层（repository）所有 SQL 一律占位符 + 白名单，代码评审只盯「有没有拼 SQL」</strong>。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 如何自查：</strong>① 全局搜 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">db.Query(</code> / <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">db.Exec(</code>，看 SQL 里有没有非占位符的动态内容；② 用 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">go vet</code> 加 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">sqlrow</code> / 静态分析工具扫描拼接；③ 安全测试时直接提交 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">' OR 1=1 --</code>，看接口是否返回异常数据。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>SQL 注入本质：</strong>把用户输入当 SQL 代码执行——<code class="bg-slate-100 px-1 rounded font-mono text-xs">' OR '1'='1</code> 改写查询逻辑，≈ 前端 XSS</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>唯一温床：</strong>字符串拼接（<code class="bg-slate-100 px-1 rounded font-mono text-xs">+</code> 或 <code class="bg-slate-100 px-1 rounded font-mono text-xs">fmt.Sprintf</code>）——出现即注入，转义/过滤都治标不治本</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>唯一正解：</strong>占位符 <code class="bg-slate-100 px-1 rounded font-mono text-xs">?</code> + 参数，<code class="bg-slate-100 px-1 rounded font-mono text-xs">database/sql</code> 自动转义，SQL 骨架与数据彻底分离</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>原理：</strong>两阶段——先编译骨架（无数据），再绑定参数（纯数据）；解析在阶段一，注入在阶段二进不了解析器</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>占位符边界：</strong>只能替换「值」；表名/列名/ORDER BY/分页 → <strong>白名单映射</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>落地纪律：</strong>repository 层所有 SQL 参数化 + 白名单，代码评审盯「有没有拼 SQL」；登录/搜索/排序/导出一个都不能漏</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link :route="'go-4-3-crud-basics'" text="← 上一节：CRUD 基础" animation="none" size="small" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1" />
        <Link :route="'go-4-5-gorm-start'" text="下一节：GORM 入门 →" animation="none" size="small" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Link, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "什么是 SQL 注入" },
  { id: "sec-2", name: "漏洞版：拼接 SQL" },
  { id: "sec-3", name: "修复版：占位符 ?" },
  { id: "sec-4", name: "参数化原理" },
  { id: "sec-5", name: "占位符边界 + 白名单" },
  { id: "sec-6", name: "fmt.Sprintf 也是漏洞" },
  { id: "sec-7", name: "真实案例：登录绕过" },
  { id: "sec-8", name: "常见错误" },
  { id: "sec-9", name: "小结" },
]

const attackInputCode = `# 经典攻击：在「用户名」输入框敲入这行（重点是那段引号）
admin' OR '1'='1

# 后端若用字符串拼接，拼出来的 SQL 是：
SELECT * FROM users
WHERE username = 'admin' OR '1'='1' AND password = 'x'
#                └─ 输入把原意「两个条件都得满足」改写成了「OR 后面满足就行」

# 逻辑等价：username = 'admin'  OR  ( '1'='1' AND password='x' )
#                    └─ 假                └─ 恒真 → 整条为真
# → 不需要密码也能登录成功！这就是 SQL 注入

# 变体：' OR 1=1 --    （-- 是 SQL 注释，把后面的 AND password 注释掉）
SELECT * FROM users WHERE username = '' OR 1=1 -- ' AND password = 'x'
# 整条变成 username='' OR 1=1 → 恒真 → 返回所有用户（拖库）`

const vulnLoginCode = `// ❌ 漏洞版：字符串拼接 SQL —— 攻击者的「代码」被直接执行
func LoginVuln(db *sql.DB, username, password string) (*User, error) {
    // 把用户输入直接拼进 SQL 文本
    query := "SELECT * FROM users WHERE username = '" + username +
        "' AND password = '" + password + "'"

    rows, err := db.Query(query)  // ← 危险！query 已经是攻击者改造过的 SQL
    if err != nil { return nil, err }
    defer rows.Close()

    if rows.Next() {
        // 查到了 → 登录成功（攻击者只需要这段成立）
        return scanUser(rows)
    }
    return nil, sql.ErrNoRows
}
// 攻击输入 "admin' OR '1'='1" 进入 query 后：
//   WHERE username = 'admin' OR '1'='1' AND password = 'x'   → 恒真，登录成功 ✗`

const safeLoginCode = `// ✅ 修复版：占位符 ? + 参数 —— 用户输入永远是「数据」，不是「代码」
func LoginSafe(db *sql.DB, username, password string) (*User, error) {
    // SQL 骨架：? 是参数槽，本身不含任何用户内容
    query := "SELECT * FROM users WHERE username = ? AND password = ?"

    // username/password 作为独立参数传给驱动，
    // database/sql + 驱动把它们按「字面量值」绑定，自动转义引号等特殊字符
    row := db.QueryRow(query, username, password)

    var u User
    if err := row.Scan(&u.ID, &u.Username); err != nil {
        return nil, err   // 攻击输入匹配不到任何用户 → 登录失败 ✓
    }
    return &u, nil
}
// 攻击输入 "admin' OR '1'='1" 到这里只是一个普通字符串——
// 拿去匹配 username 字段，永远匹配不到（没有任何用户叫这个）`

const paramFlowCode = `# 参数化查询：客户端发「SQL 骨架 + 参数」两份数据，DB 分两阶段处理

# 阶段一 Prepare（编译）：只发 SQL 骨架，? 是槽位
PREPARE:  SELECT * FROM users WHERE username = ? AND password = ?
#         DB：解析 → 权限检查 → 优化 → 生成执行计划
#             此时 ? 只是槽位，还没有任何用户数据参与

# 阶段二 Execute（绑定）：发纯数据，DB 把数据填进槽位
EXECUTE:  username = "admin' OR '1'='1"      ← 就是一段普通字符串
          password = "x"
#         DB：把参数当「字面量」绑定，不做任何语法解释
#             引号/分号/注释在这里都没有意义 —— 它们不是 SQL，是数据

# 结论：注入的引号永远到不了「SQL 解析器」面前，因为解析在阶段一就完成了`

const whitelistCode = `// 占位符只能替换「值」，不能替换「语法结构」——
// 表名、列名、ORDER BY 排序字段、LIMIT 数值都参数化不了

// ❌ 错误写法（都是注入点）：
db.Query("SELECT * FROM menu ORDER BY ?", sortCol)          // 列名不能参数化
db.Query("SELECT * FROM menu LIMIT ?", "10; DROP TABLE x")  // 数值也会被注入
db.Query("SELECT * FROM " + tableName)                       // 表名只能白名单

// ✅ 正确：白名单映射 —— 用户输入只能从固定集合里选
var sortWhitelist = map[string]string{
    "id":         "id",
    "sort_order": "sort_order",
    "created_at": "created_at DESC",   // 连排序方向都预写死
}
col := sortWhitelist[sortCol]          // 取不到 → "" → 走默认值
if col == "" { col = "id" }
db.Query("SELECT * FROM menu ORDER BY " + col)  // col 是白名单内固定值，安全

// 分页 LIMIT：先转成整数再走占位符（Atoi 会拒绝任何非数字）
n, _ := strconv.Atoi(limit)            // "10; DROP" → Atoi 直接报错
db.Query("SELECT * FROM menu LIMIT ? OFFSET ?", n, offset)`

const fmtSprintfCode = `// ❌ fmt.Sprintf 拼 SQL = 和 + 拼接一个性质的漏洞
search := "%' OR '1'='1 -- "
query := fmt.Sprintf(
    "SELECT * FROM menu WHERE label LIKE '%%%s%%'", search,
)
// 拼出来：SELECT * FROM menu WHERE label LIKE '%' OR '1'='1 -- %'
// → 注入成功！字符串函数救不了你，它拼出的还是「可被解析的 SQL」

// ✅ 占位符方案：% 通配符放进参数，SQL 骨架保持干净
query := "SELECT * FROM menu WHERE label LIKE ?"
rows, err := db.Query(query, "%"+search+"%")
// search 里的任何引号都只是数据，LIKE 只做模糊匹配
// 输出: 0 行 —— 没有人叫 "%' OR '1'='1 -- "，攻击无效`

const loginCompareCode = `// 真实案例：登录接口的漏洞版 vs 修复版（同一输入）
// 输入：username = "admin' OR '1'='1"   password = "随便"

// ❌ 漏洞版 —— 攻击成功
query := "SELECT * FROM users WHERE username = '" + username +
    "' AND password = '" + password + "'"
// 实际执行：SELECT * FROM users WHERE username='admin' OR '1'='1' AND password='随便'
// → 返回一行（第一行用户）→ 登录成功 ✗

// ✅ 修复版 —— 攻击无效
query := "SELECT * FROM users WHERE username = ? AND password = ?"
// 数据库拿着 "admin' OR '1'='1" 去匹配 username 字段
// → 没有任何用户的 username 长这样 → 0 行 → 登录失败 ✓
// 接口响应与正常失败完全一致，攻击者探测不到防线存在`

const errCode = `# ❌ 常见错误与反模式
# 1. 手动转义引号：把 ' 替换成 '' —— 漏洞太多（Unicode / %27 / 双重编码绕过），治标不治本
# 2. 黑名单过滤 union/select —— 变体无限：/**/、大小写、全角、双重 URL 编码
# 3. 只防了登录，搜索/排序/导出/批量操作照样拼接 —— 一处漏 = 全库暴露
# 4. 存储过程内部仍然拼接 —— 注入位置从 Go 挪到 SQL 层而已
# 5. 把「用户输入拼好的 SQL」写进日志后再使用 —— 换行符/引号带来二次注入
# 6. 在 ORDER BY / LIMIT / 表名上直接拼动态值 —— 占位符救不了结构，必须白名单

# ✅ 唯一正确姿势：参数化查询（占位符）—— SQL 骨架与数据彻底分离`
</script>
