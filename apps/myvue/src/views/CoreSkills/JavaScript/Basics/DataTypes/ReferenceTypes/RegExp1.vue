<script setup lang="ts">
// 响应式数据用于演示正则操作结果
import { ref } from 'vue'

const testResult = ref<boolean>(false)
const execResult = ref<RegExpExecArray | null>(null)
</script>

<template>
  <div class="regex-container">
    <!-- 基础介绍区块 -->
    <section class="card">
      <h2>📌 RegExp 对象</h2>
      <p>JavaScript 正则表达式对象，用于匹配字符串中的字符组合。两种创建方式：</p>
      <pre class="code-block">// 字面量语法
const regex = /pattern/[flags]

// 构造函数语法
const regex = new RegExp('pattern', [flags])</pre>
    </section>

    <!-- 修饰符表格 -->
    <section class="card">
      <h3>🔧 修饰符 (Flags)</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>修饰符</th>
              <th>描述</th>
              <th>示例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>i</td>
              <td>不区分大小写</td>
              <td>/aBc/i.test("AbC") → true</td>
            </tr>
            <tr>
              <td>g</td>
              <td>全局匹配</td>
              <td>"abab".match(/a/g) → ["a","a"]</td>
            </tr>
            <tr>
              <td>m</td>
              <td>多行模式</td>
              <td>/^a/gm 匹配多行开头的a</td>
            </tr>
            <tr>
              <td>y</td>
              <td>粘性匹配</td>
              <td>/y/y.exec("hello") → null</td>
            </tr>
            <tr>
              <td>u</td>
              <td>Unicode模式</td>
              <td>/u/u.exec("🌍") → ["🌍"]</td>
            </tr>
            <tr>
              <td>s</td>
              <td>单行模式</td>
              <td>/s/s.exec("a\nb") → ["\n"]</td>
            </tr>
            <tr>
              <td>d</td>
              <td>数字模式</td>
              <td>/d/d.exec("123") → ["1", "2", "3"]</td>
            </tr>
            <tr>
              <td>w</td>
              <td>单词字符模式</td>
              <td>/w/w.exec("hello") → ["h", "e", "l", "l", "o"]</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 核心功能演示 -->
    <section class="card">
      <h3>⚙️ 核心功能与方法</h3>

      <div class="method-block">
        <h4>1. 元字符（特殊字符）</h4>
        <pre class="code-block">
\d  匹配数字          → 等效 [0-9]
\w  匹配单词字符      → 等效 [A-Za-z0-9_]
\s  匹配空白符
^   匹配字符串开头
$   匹配字符串结尾
.   匹配任意单个字符（除换行）</pre>
      </div>

      <div class="method-block">
        <h4>2. 量词与贪婪模式</h4>
        <pre class="code-block">
*    匹配0次或多次（贪婪）
+    匹配1次或多次（贪婪）
?    匹配0或1次（贪婪）
{n}  精确匹配n次
*?   非贪婪匹配模式
示例：
"aaaab".match(/a+/) → "aaaa"（贪婪）
"aaaab".match(/a+?/) → "a"（非贪婪）</pre>
      </div>

      <div class="method-block">
        <h4>3. 方法对比</h4>
        <div class="method-grid">
          <div>
            <h5>RegExp.test(str)</h5>
            <pre>/\d+/.test("123") → true</pre>
          </div>
          <div>
            <h5>RegExp.exec(str)</h5>
            <pre>/a(b+)/.exec("abba")
→ ["ab", "b"]</pre>
          </div>
          <div>
            <h5>str.match(regex)</h5>
            <pre>"a1b2".match(/\d/g)
→ ["1", "2"]</pre>
          </div>
          <div>
            <h5>str.matchAll(regex)</h5>
            <pre>[...'ab12'.matchAll(/\D/g)]
→ [['a'], ['b']]</pre>
          </div>
          <div>
            <h5>str.replace(regex)</h5>
            <pre>"2025".replace(/\d/g, "X")
→ "XXXX"</pre>
          </div>
          <div>
            <h5>str.replaceAll(regex)</h5>
            <pre>"a-b-c".replaceAll(/-/g, "_")
→ "a_b_c"</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="less">
@primary-color: #2c3e50;
@secondary-color: #42b983;
@code-bg: #f5f5f5;

.regex-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  .card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 2rem;

    h2,
    h3 {
      color: @primary-color;
      border-bottom: 2px solid @secondary-color;
      padding-bottom: 0.5rem;
    }
  }

  .table-wrapper {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;

      th,
      td {
        padding: 12px;
        border: 1px solid #ddd;
        text-align: left;
      }

      th {
        background: lighten(@secondary-color, 40%);
      }
    }
  }

  .code-block {
    background: @code-bg;
    padding: 1rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    overflow-x: auto;
  }

  .method-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;

    >div {
      background: lighten(@code-bg, 3%);
      padding: 1rem;
      border-radius: 6px;

      h5 {
        color: darken(@secondary-color, 10%);
        margin: 0 0 0.5rem 0;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .method-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>