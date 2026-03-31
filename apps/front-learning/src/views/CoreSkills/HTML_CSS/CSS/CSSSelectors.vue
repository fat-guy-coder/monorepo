<template>
  <div class="selector-guide">
    <h1>CSS 选择器</h1>

    <h3>
      <p>CSS 选择器是用于选择和应用样式到 HTML 元素的模式。它们可以根据元素的类型、类、ID、属性等进行选择。选择器的使用使得网页的样式更加灵活和可控。</p>
      <p>通过合理使用选择器，可以有效地管理和优化网页的样式，提高用户体验。</p>
    </h3>

    <Navbar :list="list" />


    <!-- 简单选择器 -->
    <section class="card" id="simple-selectors">
      <h2>1. 简单选择器</h2>
      <h3>元素选择器选择所有匹配的元素，类选择器选择所有匹配类名的元素，ID选择器选择所有匹配的ID的元素</h3>
      <pre class="code-block"><code>/* 元素选择器 */ 选择所有的p标签
p { color: blue; }

/* 类选择器 */  选择所有的class类名为text-red的标签
.text-red { color: red; }

/* ID选择器 */
#header { font-size: 24px; }
      </code></pre>
    </section>

    <!-- 组合器选择器 -->
    <section class="card" id="combinator-selectors">
      <h2>2. 组合器选择器（关系选择器）</h2>
      <h3>通过元素之间的关系来选择元素</h3>
      <pre class="code-block"><code>
  /* 后代选择器 */
  div span { background: #eee; }

  /* 子元素选择器 */
  ul > li { list-style: square; }

  /* 相邻兄弟选择器 */
  h2 + p { margin-top: 0; }

  /* 通用兄弟选择器 */
  h2 ~ p { color: #666; }
      </code></pre>
    </section>

    <!-- 伪类选择器 -->
    <section class="card" id="pseudo-class-selectors">
      <h2>3. 伪类选择器</h2>
      <h3>伪类选择器又分为:状态伪类选择器，结构伪类选择器，表单伪类选择器</h3>
      <div class="card">
        <h3><b>状态伪类选择器:选择某种状态下的元素</b></h3>
        <pre class="code-block"><code>a:link { color: blue; } /* 未访问的链接 */
a:visited { color: purple; } /* 已访问的链接 */
a:active { color: red; } /* 激活的链接 */
a:hover { color: orange; } /* 鼠标悬停时 */
a:focus { color: green; } /* 获取焦点时 */
a:target { color: red; } /* 当前活动的目标元素 */
a:lang(en) { color: blue; } /* 特定语言的元素 */
a:not(.active) { color: gray; } /* 不匹配选择器的元素 */
a:root { color: black; } /* 文档的根元素 */
a:scope { color: black; } /* 作用域元素 */

状态伪类触发顺序(经典的爱恨情仇L V H A)
a:link 爱
a:visited 恨
a:hover 情
a:active 仇</code>
    </pre>
      </div>
      <div class="card">
        <h3><b>结构伪类选择器(关系选择器):根据元素在文档中的位置来动态选择元素</b></h3>
        <pre class="code-block"><code>li:first-child { font-weight: bold; } /* 第一个li元素 */
li:last-child { font-weight: bold; } /* 最后一个li元素 */
li:nth-child(2) { font-weight: bold; } /* 第N个li元素 */
li:nth-last-child(2) { font-weight: bold; } /* 倒数第N个li元素 */
li:nth-of-type(2) { font-weight: bold; } /* 第N个特定类型的li元素 */
li:nth-last-of-type(2) { font-weight: bold; } /* 倒数第N个特定类型的li元素 */
li:only-child { font-weight: bold; } /* 唯一的li元素 */
li:only-of-type { font-weight: bold; } /* 唯一的特定类型的li元素 */
li:empty { font-weight: bold; } /* 没有子元素的li元素 */
  </code></pre>
      </div>
      <div class="card">
        <h3><b>表单伪类选择器:选择不同状态下的表单元素</b></h3>
        <pre class="code-block"><code>input:focus { border-color: blue; } /* 获取焦点时 */
input:disabled { background: #ccc; } /* 禁用的表单元素 */
input:checked { background: #ff0; } /* 选中的表单元素 */
input:required { border: 2px solid red; } /* 必填的表单元素 */
input:optional { border: 2px solid green; } /* 可选的表单元素 */
input:valid { border: 2px solid green; } /* 有效的表单元素 */
input:invalid { border: 2px solid red; } /* 无效的表单元素 */
input:in-range { border: 2px solid green; } /* 在范围内的表单元素 */
input:out-of-range { border: 2px solid red; } /* 超出范围的表单元素 */
input:read-only { background: #f5f5f5; } /* 只读的表单元素 */
input:read-write { background: #fff; } /* 可读写的表单元素 */
      </code></pre>
      </div>
      <div class="card">
        <h3><b>新增结构伪类:where 和 is 和 has</b></h3>
        <pre class="code-block"><code>:where(a) { color: red; } /* 选择所有 a 元素 */ 接受一个选择器列表作为参数
:where(a, b) { color: red; } /* 选择所有 a 和 b 元素 */
:where(a, b, c) { color: red; } /* 选择所有 a、b 和 c 元素 */

:is(a, b, c) { color: red; } /* 选择所有 a、b 和 c 元素 */
:is 和 :where 功能上完全一致 where() 本身修改的选择器不算在权重计算，而 :is() 修改的选择器是算在权重计算的

:has(i)  选择包含i元素的元素
h1:has(div) 选择包含元素有div的h1元素
h1:has(>div) 选择子元素有div的h1元素
div:has(+ p) 选择p元素的相邻的前一个标签名是 div的兄弟元素
has的和 和 或
和 h1:has(div):has(p) 选择包含元素有div和p的h1元素
或  h1:has(div,p) 选择包含元素有div或p的h1元素
  </code></pre>
      </div>
    </section>

    <!-- 伪元素选择器 -->
    <section class="card" id="pseudo-element-selectors">
      <h2>4. 伪元素选择器</h2>
      <h3>伪元素选择器又分为:首字母选择器，首行选择器，内容插入选择器，<b>选择元素的某个部分</b></h3>
      <pre class="code-block"><code>/* 首字母样式 */
p::first-letter { font-size: 150%; } /* 选择段落的首字母，并设置其字体大小为150% */

/* 首行样式 */
p::first-line { color: red; } /* 选择段落的首行，并设置其颜色为红色 */

/* 选择元素的被用户选中部分 */
::selection { background: yellow; } /* 选择被用户选中的文本，并设置其背景颜色为黄色 */

/* 列表项标记样式 */
::marker { color: red; } /* 选择列表项的标记，并设置其颜色为红色 */

/* 占位符样式 */
::placeholder { color: gray; } /* 选择输入框的占位符文本，并设置其颜色为灰色 */

/* 背景幕样式 */
::backdrop { background: rgba(0, 0, 0, 0.5); } /* 选择全屏模式下的背景幕，并设置其背景颜色为半透明黑色 */

      /* 文件选择按钮样式 */
::file-selector-button { background: blue; color: white; } /* 选择文件选择输入框的按钮，并设置其背景颜色为蓝色，文本颜色为白色 */
    </code></pre>
      <div class="card">
        <h3><b>内容插入选择器::after 和 ::before</b></h3>
        <pre class="code-block"><code>/* 在元素内容前插入一个灯泡符号，并设置右边距为5px */
.tip::before {
content: "💡";
margin-right: 5px;
}
/* 在元素内容后插入一个感叹号，并设置左边距为5px */
.tip::after {
content: "!";
margin-left: 5px;
}</code></pre>
        <h3>内容插入选择器常用在生成特殊样式,或者清除浮动</h3>
        <h4>content: "💡"; 指要插入的内容</h4>
      </div>
    </section>

    <!-- 属性选择器 -->
    <section class="card" id="attribute-selectors">
      <h2>5. 属性选择器</h2>
      <h3><b>属性选择器根据元素的属性来选择元素</b></h3>
      <pre class="code-block"><code>/* 存在属性 */
[disabled] { opacity: 0.5; } /* 选择具有 disabled 属性的元素 */

/* 精确匹配 */
input[type="text"] { border: 1px solid #ccc; } /* 选择 type 属性值为 "text" 的 input 元素 */

/* 包含属性值 */
[title~="flower"] { color: yellow; } /* 选择 title 属性包含单词 "flower" 的元素 */
/* 属性值包含指定值 */
a[href*="example"] { color: red; } /* 选择 href 属性值包含 "example" 的 a 元素 */

/* 属性值以指定值开头 */
a[href^="https"] { color: green; } /* 选择 href 属性值以 "https" 开头的 a 元素 */

/* 属性值以指定值开头 */
a[href|="https"]/* 选择 href 属性值以 "https" 开头的 a 元素 */

/* 属性值以指定值结尾 */
img[src$=".jpg"] { border: 1px solid black; } /* 选择 src 属性值以 ".jpg" 结尾的 img 元素 */

/* 属性值包含指定值 */
a[href*="example"] { color: red; } /* 选择 href 属性值包含 "example" 的 a 元素 */
    </code></pre>
      <p>~ * 选包含</p>
      <p>^ | 选开头</p>
      <p>$ 选结尾</p>
    </section>

    <!-- 选择器权重 -->
    <section class="card weight-section" id="selector-weight">
      <h2>6. 选择器权重</h2>
      <div class="weight-levels">
        <div class="weight-item">
          <span class="weight-label">!important</span>
          <span class="weight-value">∞</span>
        </div>
        <div class="weight-item">
          <span class="weight-label">内联样式</span>
          <span class="weight-value">1000</span>
        </div>
        <div class="weight-item">
          <span class="weight-label">ID</span>
          <span class="weight-value">100</span>
        </div>
        <div class="weight-item">
          <span class="weight-label">类/伪类/属性</span>
          <span class="weight-value">10</span>
        </div>
        <div class="weight-item">
          <span class="weight-label">元素/伪元素</span>
          <span class="weight-value">1</span>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import Navbar from 'components/Nav/ScrollNav.vue';
// 逻辑代码可根据需要添加
const list = [
  {
    name: '简单选择器',
    id: 'simple-selectors',
  },
  {
    name: '组合器选择器',
    id: 'combinator-selectors'
  },
  {
    name: '伪类选择器',
    id: 'pseudo-class-selectors'
  },
  {
    name: '伪元素选择器',
    id: 'pseudo-element-selectors'
  },
  {
    name: '选择器权重',
    id: 'selector-weight'
  }
]
</script>

<style scoped>
.selector-guide {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #111827;
  background-color: #f9fafb;
}

h1 {
  text-align: center;
  color: #111827;
  margin-bottom: 0.5rem;
  font-size: 2.2rem;
  font-weight: 700;
}

h2 {
  color: #111827;
  font-size: 1.3rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

h3 {
  font-size: 1rem;
  font-weight: 400;
  color: #4b5563;
  line-height: 1.6;
  margin-top: 0;
  margin-bottom: 1rem;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: none;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e5e7eb;
}

.code-block {
  background: #1f2937;
  color: #e5e7eb;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
}

.code-block code {
  color: #e5e7eb;
}

.weight-levels {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.weight-item {
  flex: 1;
  text-align: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  min-width: 120px;
}

.weight-label {
  display: block;
  font-weight: 600;
  color: #374151;
}

.weight-value {
  font-size: 1.5em;
  color: #2563eb;
  font-weight: bold;
}

/* 示例元素样式 */
.text-red {
  color: red;
}

#header {
  font-size: 24px;
}

.tip::before {
  content: '💡';
  margin-right: 5px;
}

[disabled] {
  opacity: 0.5;
}
</style>
