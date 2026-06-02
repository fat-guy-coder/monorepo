<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">控制结构 (if / for / switch / goto)</h1>
          <p class="text-sm text-slate-500 mt-1">Go 语言的流程控制</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-5-control-flow.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-5</span>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 概述 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔀</span>
          概述
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">
          控制结构决定了程序的执行流程——哪些代码执行、执行多少次、在什么条件下执行。Go 的控制结构设计得<strong>极简而精炼</strong>，只有四种关键字：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">if</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">for</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">switch</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">goto</code>。
        </p>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>没有 while / do-while：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">for</code> 是 Go 唯一的循环关键字，但可以表达所有循环模式</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>switch 自动 break：</strong>无需手动写 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">break</code>，默认不会贯穿到下一个 case</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>if 支持短语句：</strong>在条件判断前可以执行一个简单语句（非常常用）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>条件表达式无括号：</strong>条件不需要 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">( )</code> 包裹，但代码块的花括号 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">{ }</code> 是必须的</span>
          </li>
        </ul>
      </section>

      <!-- 1. if 条件语句 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          if 条件语句
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">if</code> 是 Go 中最基本的条件分支。与很多语言不同，Go 的 if 条件不需要用圆括号包裹，但<strong>花括号不能省略</strong>，且左花括号 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">{</code> 必须和 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">if</code> 在同一行。
        </p>

        <!-- 基本 if-else -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">基本 if / else if / else</h3>
        <div class="mb-4">
          <Code language="go" :code="ifBasicCode" title="if_basic.go" />
        </div>

        <!-- if 短语句 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">if 短语句（Short Statement）</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">if</code> 可以在条件表达式之前执行一个<strong>短语句</strong>（通常是变量声明或函数调用），该语句中声明的变量<strong>作用域仅限于 if-else 块内</strong>。这是 Go 最常用也最优雅的模式之一。
        </p>
        <div class="mb-4">
          <Code language="go" :code="ifShortCode" title="if_short_statement.go" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>if 短语句 + 错误处理是 Go 的招牌模式。将变量的作用域限制在 if-else 块内，既安全又清晰。</p>
        </aside>

        <!-- if vs 三元运算符 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">Go 没有三元运算符</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的哲学是"一种问题只有一种解法"。当你需要用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">x ? a : b</code> 时，请直接用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">if-else</code>：
        </p>
        <div class="mb-4">
          <Code language="go" :code="noTernaryCode" title="no_ternary.go" />
        </div>
      </section>

      <!-- 2. for 循环 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          for 循环
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 只有一种循环结构——<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">for</code>。但通过灵活的组合方式，它可以表达其他语言中 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">while</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">do-while</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">for-each</code> 等的所有功能。
        </p>

        <!-- 经典三段式 for -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">经典三段式 for</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          三段式 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">for init; condition; post { }</code> 是最标准的形式：
        </p>
        <div class="mb-4">
          <Code language="go" :code="forClassicCode" title="for_classic.go" />
        </div>

        <!-- for 当 while 用 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">for 替代 while</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          省略初始化和后置语句，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">for</code> 就变成了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">while</code>：
        </p>
        <div class="mb-4">
          <Code language="go" :code="forWhileCode" title="for_as_while.go" />
        </div>

        <!-- 无限循环 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">无限循环</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          省略所有三个部分，你得到一个无限循环——常用于服务器监听、事件循环等场景：
        </p>
        <div class="mb-4">
          <Code language="go" :code="forInfiniteCode" title="for_infinite.go" />
        </div>

        <!-- for-range -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">for-range 遍历</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">for-range</code> 用于遍历数组、切片、map、字符串、channel 等可迭代对象。这是 Go 中最常用的循环形式。
        </p>
        <div class="mb-4">
          <Code language="go" :code="forRangeCode" title="for_range.go" />
        </div>

        <!-- break / continue -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">break 与 continue</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">break</code> 立即终止循环，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">continue</code> 跳过当前迭代进入下一次。Go 还支持带<strong>标签</strong>的 break/continue，用于跳出嵌套循环。
        </p>
        <div class="mb-4">
          <Code language="go" :code="breakContinueCode" title="break_continue.go" />
        </div>
      </section>

      <!-- 3. switch 分支 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          switch 分支
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">switch</code> 比 C 系语言的更强大且更安全：<strong>case 自动终止，不会贯穿</strong>；不需要写 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">break</code>；case 支持多个值；还可以替代冗长的 if-else 链。
        </p>

        <!-- 基本 switch -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">基本 switch</h3>
        <div class="mb-4">
          <Code language="go" :code="switchBasicCode" title="switch_basic.go" />
        </div>

        <!-- switch 短语句 -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">switch 短语句</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          和 if 一样，switch 也支持在表达式之前加一个短语句：
        </p>
        <div class="mb-4">
          <Code language="go" :code="switchShortCode" title="switch_short.go" />
        </div>

        <!-- switch true -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">无表达式 switch（替代 if-else 链）</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          省略 switch 后的表达式相当于 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">switch true</code>，case 中可以写任意布尔表达式，是替代冗长 if-else if 链的优雅方式：
        </p>
        <div class="mb-4">
          <Code language="go" :code="switchTrueCode" title="switch_true.go" />
        </div>

        <!-- fallthrough -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">fallthrough 贯穿</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的 case 默认<strong>不贯穿</strong>。如果你想执行完一个 case 后继续执行下一个 case 的代码，需要显式使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">fallthrough</code> 关键字。注意 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">fallthrough</code> 只能出现在 case 块的最后一行，且不能用在最后一个 case 中。
        </p>
        <div class="mb-4">
          <Code language="go" :code="fallthroughCode" title="fallthrough.go" />
        </div>

        <!-- 类型 switch -->
        <h3 class="text-base font-semibold text-slate-700 mb-3">类型 switch（Type Switch）</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          当变量是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">interface{}</code>（空接口）类型时，可以用类型 switch 根据<strong>底层具体类型</strong>执行不同逻辑。语法为 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">i.(type)</code>，只能在 switch 中使用。
        </p>
        <div class="mb-4">
          <Code language="go" :code="typeSwitchCode" title="type_switch.go" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>类型 switch 在处理 JSON 解析、通用处理函数等场景中非常实用。配合 <code class="bg-blue-100 px-1 rounded text-xs font-mono">.(type)</code> 比一连串的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">v, ok := x.(T)</code> 类型断言更清晰。</p>
        </aside>
      </section>

      <!-- 4. goto 跳转 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          goto 跳转
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 保留了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">goto</code> 关键字，但倡导<strong>谨慎使用</strong>。goto 只能跳转到<strong>同一函数内</strong>的标签处，且不能跳过变量声明。在错误处理和资源清理场景中，goto 有时比多层嵌套 if 更清晰。
        </p>

        <div class="mb-4">
          <Code language="go" :code="gotoCode" title="goto_example.go" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>Go 汇编和底层代码中 goto 很常见，但业务代码中应<strong>尽量避免</strong>。大多数 goto 场景都可以用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">defer</code> + <code class="bg-amber-100 px-1 rounded text-xs font-mono">return</code>、<code class="bg-amber-100 px-1 rounded text-xs font-mono">break 标签</code> 或提取函数来替代。如果你的代码中出现了 goto，停下来想一想是否有更好的写法。</p>
        </aside>
      </section>

      <!-- 5. 常见错误 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          常见错误
        </h2>

        <div class="space-y-5">
          <!-- 错误1 -->
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-3">1. 循环变量捕获（Range Variable Capture）</h3>
            <p class="text-slate-600 mb-3 leading-relaxed">
              在 for-range 循环中使用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">go func()</code> 或 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">defer func()</code> 时，闭包会捕获<strong>循环变量的地址</strong>而非值。Go 1.22+ 已修复此问题（每次迭代创建新变量），但老版本中需要使用局部副本。
            </p>
            <div class="mb-4">
              <Code language="go" :code="rangeCaptureErrorCode" title="range_capture.go" />
            </div>
          </div>

          <!-- 错误2 -->
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-3">2. switch case 用错变量</h3>
            <p class="text-slate-600 mb-3 leading-relaxed">
              在 switch 短语句中声明的变量作用域是整个 switch 块，但如果 case 中不小心用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">:=</code> 重新声明同名变量，会遮蔽外层变量。
            </p>
            <div class="mb-4">
              <Code language="go" :code="switchShadowCode" title="switch_shadow.go" />
            </div>
          </div>

          <!-- 错误3 -->
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-3">3. 误用 fallthrough</h3>
            <p class="text-slate-600 mb-3 leading-relaxed">
              <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">fallthrough</code> 只会跳转到<strong>下一个 case 的代码</strong>，不会判断下一个 case 的条件！它无条件执行下一段代码。而且 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">fallthrough</code> 只能作为 case 的最后一条语句。
            </p>
            <div class="mb-4">
              <Code language="go" :code="fallthroughPitfallCode" title="fallthrough_pitfall.go" />
            </div>
          </div>

          <!-- 错误4 -->
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-3">4. for-range 遍历 map 顺序不固定</h3>
            <p class="text-slate-600 mb-3 leading-relaxed">
              Go 的 map 遍历顺序是<strong>随机的</strong>，每次运行可能不同。如果需要固定顺序，请先提取 key 并排序。
            </p>
            <div class="mb-4">
              <Code language="go" :code="mapOrderCode" title="map_order.go" />
            </div>
          </div>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>if 支持短语句：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">if err := fn(); err != nil {</code> 是 Go 的标志性错误处理模式</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>for 是唯一的循环：</strong>三段式、while 风格、无限循环、for-range 四种形态覆盖所有场景</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>switch 自动 break：</strong>不需要写 break 防止贯穿，需要贯穿时用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">fallthrough</code></span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>无表达式 switch：</strong>省略表达式等价于 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">switch true</code>，可替代冗长的 if-else if 链</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>类型 switch：</strong>用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">.(type)</code> 判断接口变量的底层具体类型</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>goto 谨慎使用：</strong>大多数场景可用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">defer</code>、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">break 标签</code> 或函数提取替代</span>
          </li>
        </ul>
      </section>

    </main>

    <!-- 底部导航 -->
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-4-fmt-io"
          class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">
          ← 上一节：fmt 格式化输入输出
        </RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-6-functions-basic"
          class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">
          下一节：函数基础 (声明/参数/多返回值) →
        </RouterLink>
      </nav>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
import { RouterLink } from 'vue-router'

const navList = [
    { id: "sec-1", name: "概述" },
    { id: "sec-2", name: "if 条件语句" },
    { id: "sec-3", name: "for 循环" },
    { id: "sec-4", name: "switch 分支" },
    { id: "sec-5", name: "goto 跳转" },
    { id: "sec-6", name: "常见错误" },
    { id: "sec-7", name: "小结" }
  ]
// ── 1. if 基本 ──
const ifBasicCode = `package main

import "fmt"

func main() {
    age := 18

    // 基本 if
    if age >= 18 {
        fmt.Println("成年人")
    }

    // if-else
    score := 75
    if score >= 60 {
        fmt.Println("及格")
    } else {
        fmt.Println("不及格")
    }

    // if-else if-else
    if score >= 90 {
        fmt.Println("优秀")
    } else if score >= 80 {
        fmt.Println("良好")
    } else if score >= 60 {
        fmt.Println("及格")
    } else {
        fmt.Println("不及格")
    }
}`

// ── 2. if 短语句 ──
const ifShortCode = `package main

import (
    "fmt"
    "strconv"
)

func main() {
    // 经典模式：在 if 中声明并检查 error
    if n, err := strconv.Atoi("42"); err != nil {
        fmt.Println("转换失败:", err)
    } else {
        // n 在 else 块中也可用
        fmt.Println("转换成功:", n*2) // 84
    }
    // fmt.Println(n) // ❌ 编译错误：n 的作用域仅限于 if-else 块

    // map 查找模式
    scores := map[string]int{"Alice": 95, "Bob": 80}
    if score, ok := scores["Alice"]; ok {
        fmt.Println("Alice 的成绩:", score) // 95
    }
    if score, ok := scores["Eve"]; !ok {
        fmt.Println("Eve 不在成绩单中", score) // score 为零值 0
    }
}`

// ── 3. 没有三元运算符 ──
const noTernaryCode = `package main

import "fmt"

func main() {
    x := 10

    // ❌ Go 不支持：result := x > 5 ? "big" : "small"

    // ✅ 用 if-else 替代（同样清晰）
    var result string
    if x > 5 {
        result = "big"
    } else {
        result = "small"
    }
    fmt.Println(result) // big

    // ✅ 更简洁：封装为函数
    result = ifElse(x > 5, "big", "small")
    fmt.Println(result)
}

// 通用三元替代函数（仅用于简单场景）
func ifElse(cond bool, a, b string) string {
    if cond {
        return a
    }
    return b
}`

// ── 4. for 经典 ──
const forClassicCode = `package main

import "fmt"

func main() {
    // 标准三段式：初始化; 条件; 后置操作
    for i := 0; i < 5; i++ {
        fmt.Println("i =", i)
    }
    // 输出: i = 0, i = 1, i = 2, i = 3, i = 4

    // 初始化多个变量（使用平行赋值）
    for i, j := 0, 10; i < j; i, j = i+1, j-1 {
        fmt.Printf("i=%d, j=%d\\n", i, j)
    }
    // i=0, j=10 → i=1, j=9 → ...

    // 省略初始化（变量已在循环外声明）
    sum := 0
    for ; sum < 10; {
        sum += 2
    }
    fmt.Println("sum:", sum) // 10
}`

// ── 5. for 取代 while ──
const forWhileCode = `package main

import "fmt"

func main() {
    // while 风格：只有条件
    count := 0
    for count < 3 {
        fmt.Println("计数:", count)
        count++
    }
    // 计数: 0 → 计数: 1 → 计数: 2

    // do-while 风格：先执行再判断
    // Go 没有 do-while，可以用 for 模拟
    n := 10
    for {
        fmt.Println("n =", n)
        n /= 2
        if n <= 0 {
            break
        }
    }
    // n = 10, n = 5, n = 2, n = 1
}`

// ── 6. for 无限循环 ──
const forInfiniteCode = `package main

import (
    "fmt"
    "time"
)

func main() {
    // 无限循环（等价于 for true { }）
    // for { } 是 Go 中最简洁的无限循环写法

    ticker := time.NewTicker(500 * time.Millisecond)
    defer ticker.Stop()
    count := 0

    for {
        select {
        case <-ticker.C:
            count++
            fmt.Println("tick", count)
            if count >= 3 {
                fmt.Println("done!")
                return // 退出整个函数（包括循环）
            }
        }
    }
}`

// ── 7. for-range ──
const forRangeCode = `package main

import "fmt"

func main() {
    // 遍历切片（index, value）
    names := []string{"Go", "Rust", "Python"}
    for i, name := range names {
        fmt.Printf("[%d] = %s\\n", i, name)
    }

    // 只取索引（忽略 value）
    for i := range names {
        fmt.Println("索引:", i)
    }

    // 只取值（用 _ 忽略 index）
    for _, name := range names {
        fmt.Println("语言:", name)
    }

    // 遍历 map（key, value），顺序不固定！
    scores := map[string]int{"Go": 95, "Rust": 90, "Python": 88}
    for lang, score := range scores {
        fmt.Printf("%s → %d\\n", lang, score)
    }

    // 遍历字符串（index 是字节位置，value 是 rune）
    s := "你好Go"
    for i, r := range s {
        fmt.Printf("[字节%d] = %c (U+%04X)\\n", i, r, r)
    }
    // [字节0] = 你 (U+4F60)
    // [字节3] = 好 (U+597D)
    // [字节6] = G (U+0047)
    // [字节7] = o (U+006F)
    // 注意：中文字符占3个字节，所以字节索引不是连续的！

    // 遍历 channel（见并发章节）
}`

// ── 8. break / continue ──
const breakContinueCode = `package main

import "fmt"

func main() {
    // break：立即终止循环
    for i := 0; i < 10; i++ {
        if i == 5 {
            break // 跳出整个循环
        }
        fmt.Printf("%d ", i)
    }
    fmt.Println()
    // 输出: 0 1 2 3 4

    // continue：跳过当前迭代
    for i := 0; i < 10; i++ {
        if i%2 == 0 {
            continue // 跳过偶数
        }
        fmt.Printf("%d ", i)
    }
    fmt.Println()
    // 输出: 1 3 5 7 9

    // 带标签的 break：跳出嵌套循环
outer:
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if i == 1 && j == 1 {
                break outer // 跳出外层循环
            }
            fmt.Printf("(%d,%d) ", i, j)
        }
    }
    // 输出: (0,0) (0,1) (0,2) (1,0)
}`

// ── 9. switch 基本 ──
const switchBasicCode = `package main

import (
    "fmt"
    "time"
)

func main() {
    // 基本 switch
    day := 3
    switch day {
    case 1:
        fmt.Println("星期一")
    case 2:
        fmt.Println("星期二")
    case 3:
        fmt.Println("星期三") // 匹配这里
    default:
        fmt.Println("其他")
    }

    // 一个 case 多个值（逗号分隔）
    today := time.Now().Weekday()
    switch today {
    case time.Saturday, time.Sunday:
        fmt.Println("周末！")
    default:
        fmt.Println("工作日...")
    }

    // case 支持表达式
    num := 42
    switch {
    case num < 0:
        fmt.Println("负数")
    case num == 0:
        fmt.Println("零")
    case num > 0:
        fmt.Println("正数")
    }
}`

// ── 10. switch 短语句 ──
const switchShortCode = `package main

import "fmt"

func getOS() string {
    return "linux"
}

func main() {
    // switch 短语句（和 if 短语句模式一致）
    switch os := getOS(); os {
    case "darwin":
        fmt.Println("macOS")
    case "linux":
        fmt.Println("Linux") // 这里
    case "windows":
        fmt.Println("Windows")
    default:
        fmt.Printf("未知系统: %s\\n", os)
    }
    // fmt.Println(os) // ❌ 编译错误：os 只在 switch 块内可见
}`

// ── 11. switch true ──
const switchTrueCode = `package main

import "fmt"

func main() {
    age := 25
    hasLicense := true

    // 无表达式 switch = switch true
    // 替代冗长的 if-else if 链，更清晰
    switch {
    case age < 0:
        fmt.Println("无效年龄")
    case age < 18:
        fmt.Println("未成年，不能开车")
    case age >= 18 && hasLicense:
        fmt.Println("可以开车") // ← 这里
    case age >= 18 && !hasLicense:
        fmt.Println("成年但没有驾照")
    default:
        fmt.Println("未知情况")
    }
}`

// ── 12. fallthrough ──
const fallthroughCode = `package main

import "fmt"

func main() {
    n := 1

    // 正常 switch：每个 case 自动 break
    switch n {
    case 1:
        fmt.Println("一")
        fallthrough // 强制执行下一个 case 的代码（不判断条件！）
    case 2:
        fmt.Println("二")
        // 没有 fallthrough，在此停止
    case 3:
        fmt.Println("三")
    }
    // 输出: 一 \n 二

    // 实用场景：按等级累积权限
    role := "admin"
    var level int
    switch role {
    case "admin":
        level = 100
        fallthrough
    case "moderator":
        level += 10 // admin 同时获得 moderator 权限
        fallthrough
    case "user":
        level += 1
    }
    fmt.Println("权限等级:", level) // 111
}`

// ── 13. 类型 switch ──
const typeSwitchCode = `package main

import "fmt"

// 处理任意类型的参数
func describe(v interface{}) {
    switch val := v.(type) {
    case nil:
        fmt.Println("nil")
    case bool:
        fmt.Printf("布尔值: %t\\n", val)
    case int:
        fmt.Printf("整数: %d，两倍 = %d\\n", val, val*2)
    case string:
        fmt.Printf("字符串: %q，长度 = %d\\n", val, len(val))
    case []int:
        fmt.Printf("int 切片: %v，长度 = %d\\n", val, len(val))
    case []string:
        fmt.Printf("string 切片: %v\\n", val)
    default:
        fmt.Printf("未知类型: %T = %v\\n", val, val)
    }
}

func main() {
    describe(42)                // 整数: 42，两倍 = 84
    describe("hello")           // 字符串: "hello"，长度 = 5
    describe(true)              // 布尔值: true
    describe([]int{1, 2, 3})    // int 切片: [1 2 3]，长度 = 3
    describe(3.14)              // 未知类型: float64 = 3.14
}`

// ── 14. goto ──
const gotoCode = `package main

import "fmt"

func main() {
    // ⚠️ goto 应谨慎使用。以下展示一个错误清理场景：

    fmt.Println("步骤1: 分配资源A")
    fmt.Println("步骤2: 分配资源B")

    // 模拟某个条件决定是否需要清理
    needCleanup := true

    if needCleanup {
        goto cleanup
    }

    fmt.Println("步骤3: 正常执行完毕")
    return

cleanup:
    fmt.Println("🧹 清理：释放资源B")
    fmt.Println("🧹 清理：释放资源A")
    // 输出: 步骤1 → 步骤2 → 🧹 清理...

    // 注：实际项目中更推荐用 defer 来处理资源释放，
    // 下面的 defer 版本更优雅：
    fmt.Println("\\n--- 使用 defer 替代 goto ---")
    deferedCleanup()
}

func deferedCleanup() {
    fmt.Println("分配资源A")
    defer fmt.Println("🧹 defer: 释放资源A")

    fmt.Println("分配资源B")
    defer fmt.Println("🧹 defer: 释放资源B")

    fmt.Println("执行业务逻辑")
    // defer 在函数返回时自动以 LIFO 顺序执行
}`

// ── 15. range 变量捕获 ──
const rangeCaptureErrorCode = `package main

import (
    "fmt"
    "time"
)

func main() {
    data := []string{"a", "b", "c"}

    // ❌ Go 1.21 及之前：所有 goroutine 都捕获同一个 v 的引用
    // for _, v := range data {
    //     go func() {
    //         fmt.Println(v) // 可能全部输出 "c"
    //     }()
    // }

    // ✅ 方法1：传参（推荐，所有版本通用）
    for _, v := range data {
        go func(s string) {
            fmt.Println(s) // a, b, c（顺序不定）
        }(v)
    }

    // ✅ 方法2：局部副本
    for _, v := range data {
        v := v // 创建新的局部变量（遮蔽循环变量）
        go func() {
            fmt.Println(v)
        }()
    }

    time.Sleep(100 * time.Millisecond)

    // ✅ Go 1.22+：for-range 循环变量每次迭代自动创建新变量
    // 不再需要上面的 workaround
}`

// ── 16. switch 变量遮蔽 ──
const switchShadowCode = `package main

import "fmt"

func main() {
    value := "外层"

    switch val := "inner"; val {
    case "inner":
        // ✅ val 是 switch 短语句声明的变量
        fmt.Println("switch val:", val) // inner

        // ❌ 在 case 块中用 := 会创建新的局部变量！
        value := "被遮蔽的内层"
        fmt.Println("case 内 value:", value) // 被遮蔽的内层
    }

    fmt.Println("外层 value:", value) // 外层（未被修改！）

    // ✅ 正确做法：用 = 赋值而非 :=
    count := 10
    switch {
    case true:
        count = 20 // 修改外层的 count
    }
    fmt.Println("count:", count) // 20
}`

// ── 17. fallthrough 陷阱 ──
const fallthroughPitfallCode = `package main

import "fmt"

func main() {
    n := 100

    switch {
    case n > 50:
        fmt.Println("> 50")
        fallthrough // ✅ 穿透到下一个 case
    case n > 80:
        fmt.Println("> 80") // 会被执行（即使 n=100 本来也满足！）
    }

    // ⚠️ fallthrough 只能作为 case 的最后一个语句
    // case n > 50:
    //     fallthrough
    //     fmt.Println("这是编译错误！") // fallthrough 后不能有代码

    // ⚠️ fallthrough 不能出现在最后一个 case
    // default:
    //     fallthrough // 编译错误！
}`

// ── 18. map 遍历顺序 ──
const mapOrderCode = `package main

import (
    "fmt"
    "sort"
)

func main() {
    m := map[string]int{"c": 3, "a": 1, "b": 2, "d": 4}

    // ❌ 每次运行输出顺序可能不同
    fmt.Println("随机顺序:")
    for k, v := range m {
        fmt.Printf("%s=%d ", k, v)
    }
    fmt.Println()

    // ✅ 需要固定顺序：先提取 key 并排序
    fmt.Println("固定顺序（按 key 排序）:")
    keys := make([]string, 0, len(m))
    for k := range m {
        keys = append(keys, k)
    }
    sort.Strings(keys)
    for _, k := range keys {
        fmt.Printf("%s=%d ", k, m[k])
    }
    fmt.Println()
    // 输出: a=1 b=2 c=3 d=4
}`
</script>
