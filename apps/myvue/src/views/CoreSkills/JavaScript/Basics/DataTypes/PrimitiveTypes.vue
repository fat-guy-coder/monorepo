<template>
  <div class="basic-types-doc">
    <!-- 头部 -->
    <header class="doc-header">
      <h1 class="title">🎯 JavaScript基础数据类型</h1>
    </header>

    <!-- 基础类型概览 -->
    <section class="type-overview">
      <h2>JavaScript基础数据类型</h2>
      <p class="overview-desc">
        JavaScript有7种基本数据类型(原始类型),它们是构建JavaScript程序的基础。
        每种类型都有其特定的用途和行为。
        分别是：
      <ul>
        <li>Number</li>
        <li>String</li>
        <li>Boolean</li>
        <li>Null</li>
        <li>Undefined</li>
        <li>Symbol</li>
        <li>BigInt</li>
      </ul>
      </p>
      <div class="type-features">
        <h3>基本类型特点:</h3>
        <ul>
          <li>不可变性 - 基本类型的值一旦创建就不能被修改</li>
          <li>按值传递 - 在赋值和传参时进行值的复制</li>
          <li>直接存储在栈内存中</li>
          <li>比较时直接比较值</li>
        </ul>
      </div>
    </section>

    <!-- 内容主体 -->
    <main class="doc-content">
      <!-- Number -->
      <section class="type-section number">
        <div class="type-header">
          <span class="icon">🔢</span>
          <h2>Number 类型</h2>
        </div>
        <div class="type-content">
          <div class="code-example">
            <pre class="code-block"><code>const integer = 42;       // 整数
const float = 3.1415;     // 浮点数
const hex = 0xff;         // 十六进制
const exponential = 2e3;  // 2000</code></pre>
          </div>
          <div class="methods">
            <h3>常用方法</h3>
            <ul>
              <li>toFixed(n) - 保留n位小数</li>
              <li>parseInt() - 字符串转整数</li>
              <li>parseFloat() - 字符串转浮点数</li>
              <li>isNaN() - 检测NaN</li>
              <li>isFinite() - 检测有限数</li>
              <li>Number() - 转换为数字</li>
            </ul>
          </div>
          <div class="notice">
            <h3>⚠️ 注意事项</h3>
            <p>0.1 + 0.2 ≠ 0.3（浮点数精度问题）</p>
            <p>NaN !== NaN（使用Number.isNaN检测）</p>
          </div>
          <div class="float-precision">
            <h3>🔍 浮点数精度问题</h3>
            <p>JavaScript 使用 IEEE 754 标准来表示浮点数，这可能导致一些意想不到的结果。</p>
            <div class="code-example">
              <pre class="code-block"><code>console.log(0.1 + 0.2); // 0.30000000000000004</code></pre>
            </div>
            <p>
              在上述例子中，0.1 和 0.2 的和并不是我们预期的 0.3，而是
              0.30000000000000004。这是因为浮点数在计算机中无法精确表示。
            </p>
            <p>为了解决这个问题，可以使用以下方法：</p>
            <ul>
              <li>使用整数进行计算，然后再转换为浮点数。</li>
              <li>使用 <code>toFixed(n)</code> 方法来限制小数位数。</li>
            </ul>
            <div class="code-example">
              <pre class="code-block"><code>const sum = (0.1 + 0.2).toFixed(2); // "0.30"</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- String -->
      <section class="type-section string">
        <div class="type-header">
          <span class="icon">📜</span>
          <h2>String 类型</h2>
        </div>
        <div class="type-content">
          <div class="code-example">
            <pre class="code-block"><code>const str1 = 'Hello';
const str2 = "World";
const template = `Hi ${str1}${str2}!`; // ES6模板字符串</code></pre>
          </div>
          <div class="methods">
            <h3>核心方法</h3>
            <ul class="method-list">
              <li class="method-item">charAt(index) - 返回指定位置的字符</li>
              <li class="method-item">charCodeAt(index) - 返回指定位置字符的Unicode编码</li>
              <li class="method-item">concat() - 连接两个或多个字符串</li>
              <li class="method-item">includes(substr) - 检测字符串是否包含子串</li>
              <li class="method-item">indexOf(substr) - 返回子串首次出现的位置</li>
              <li class="method-item">lastIndexOf(substr) - 返回子串最后一次出现的位置</li>
              <li class="method-item">slice(start, end) - 截取子串</li>
              <li class="method-item">split(separator) - 分割字符串</li>
              <li class="method-item">substring(start, end) - 返回两个索引之间的子串</li>
              <li class="method-item">toLowerCase() - 转换为小写</li>
              <li class="method-item">toUpperCase() - 转换为大写</li>
              <li class="method-item">trim() - 去除首尾空格</li>
              <li class="method-item">replace(search, replacement) - 替换指定子串</li>
              <li class="method-item">startsWith(substr) - 检测字符串是否以指定子串开头</li>
              <li class="method-item">endsWith(substr) - 检测字符串是否以指定子串结尾</li>
            </ul>
          </div>
          <div class="notice">
            <h3>⚠️ 注意事项</h3>
            <p>字符串不可变（所有方法返回新字符串）</p>
            <p>使用模板字符串处理复杂拼接</p>
            <p>substring 和 slice 的区别</p>
            <pre><code>var str = 'abcdefg';
str.substring(0, 3) // abc; [包含0，不包含3]
str.substring(3, 0) // abc; [会把小的值当成start, 大的值当成stop]
str.substringn(3, -3) // abc; [不允许负值，负值会自动变成0]
str.substring(3, NaN) // abc; [非数值转成0]
str.substring(3, 3) // '' [start === stop，返回空字符串]
str.substring(0, 10) // abcdefg [超出str的总长度，取整个长度]

str.slice(0, 3) // abc; [包含0，不包含3]
str.slice(3, 0) // abc; [会把小的值当成start, 大的值当成stop]
str.slice(9) // '' [start超出了字符串长度，则返回空字符串]
str.slice(-3) // 'efg' [负值从后往前数]
str.slice(-3, -1) // 'ef' [负值从后往前数]
            </code></pre>
            <p></p>
          </div>
        </div>
      </section>

      <!-- Boolean -->
      <section class="type-section boolean">
        <div class="type-header">
          <span class="icon">✅</span>
          <h2>Boolean 类型</h2>
        </div>
        <div class="type-content">
          <div class="code-example">
            <pre class="code-block"><code>const isTrue = true;
const isFalse = false;

// 自动转换为false的值：
false, 0, "", null, undefined, NaN</code></pre>
          </div>
          <div class="methods">
            <h3>逻辑运算</h3>
            <ul>
              <li>&& - 逻辑与</li>
              <li>|| - 逻辑或</li>
              <li>! - 逻辑非</li>
            </ul>
          </div>
          <div class="notice">
            <h3>⚠️ 注意事项</h3>
            <p>避免使用new Boolean()创建包装对象</p>
            <p>注意==和===的区别</p>
          </div>
        </div>
      </section>

      <!-- Symbol -->
      <section class="type-section symbol">
        <div class="type-header">
          <span class="icon">🔑</span>
          <h2>Symbol 类型</h2>
        </div>
        <div class="type-content">
          <div class="code-example">
            <pre class="code-block"><code>// 创建Symbol
const sym1 = Symbol();
const sym2 = Symbol('描述');
const sym3 = Symbol.for('全局Symbol');

// Symbol总是唯一的
Symbol('描述') !== Symbol('描述')  // true</code></pre>
          </div>
          <div class="methods">
            <h3>常用方法</h3>
            <ul>
              <li class="method-item">Symbol.for(key) - 创建或获取全局Symbol</li>
              <li class="method-item">Symbol.keyFor(sym) - 获取全局Symbol的key</li>
              <li class="method-item">symbol.description - 获取Symbol的描述</li>
            </ul>
          </div>
          <div class="notice">
            <h3>⚠️ 注意事项</h3>
            <p>Symbol 值不能与其他类型的值进行运算</p>
            <p>Symbol 作为对象属性名时不会出现在常规的遍历中</p>
            <p>Object.getOwnPropertySymbols()可获取对象的所有Symbol属性</p>
          </div>
        </div>
      </section>

      <!-- BigInt -->
      <section class="type-section bigint">
        <div class="type-header">
          <span class="icon">🔢</span>
          <h2>BigInt 类型</h2>
        </div>
        <div class="type-content">
          <div class="code-example">
            <pre class="code-block"><code>// 创建BigInt
const bigInt1 = 9007199254740991n;  // 使用n后缀
const bigInt2 = BigInt("9007199254740991");  // 使用BigInt()函数
const bigInt3 = BigInt(9007199254740991);    // 从数字创建

// BigInt运算
const sum = bigInt1 + BigInt(1);
const product = bigInt1 * BigInt(2);</code></pre>
          </div>
          <div class="methods">
            <h3>特点和用途</h3>
            <ul>
              <li class="method-item">可以表示任意大的整数</li>
              <li class="method-item">适用于大数运算和高精度计算</li>
              <li class="method-item">常用于金融计算和科学计算</li>
            </ul>
          </div>
          <div class="notice">
            <h3>⚠️ 注意事项</h3>
            <p>不能与Number类型直接进行混合运算</p>
            <p>不能使用Math对象的方法</p>
            <p>不能使用一元加号运算符</p>
            <p>转换为Number可能会丢失精度</p>
          </div>
        </div>
      </section>
      <!-- Null & Undefined -->
      <section class="type-section null-undefined">
        <div class="type-header">
          <span class="icon">🕳️</span>
          <h2>Null & Undefined</h2>
        </div>
        <div class="type-content">
          <div class="comparison">
            <div class="null-card">
              <h3>null</h3>
              <pre class="code-block"><code>let empty = null;  // 显式空值</code></pre>
              <p>typeof null → 'object'</p>
            </div>
            <div class="undefined-card">
              <h3>undefined</h3>
              <pre class="code-block"><code>let uninitialized;  // 未初始化</code></pre>
              <p>typeof undefined → 'undefined'</p>
            </div>
          </div>
          <div class="notice">
            <h3>⚠️ 注意事项</h3>
            <p>null == undefined → true</p>
            <p>null === undefined → false</p>
          </div>
        </div>
      </section>

      <!-- 类型检测 -->
      <section class="type-check">
        <h2 class="section-title">🔍 类型检测方法</h2>
        <table class="type-table">
          <thead>
            <tr>
              <th>类型</th>
              <th>typeof</th>
              <th>Object.prototype.toString</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Number</td>
              <td>'number'</td>
              <td>[object Number]</td>
            </tr>
            <tr>
              <td>String</td>
              <td>'string'</td>
              <td>[object String]</td>
            </tr>
            <tr>
              <td>Boolean</td>
              <td>'boolean'</td>
              <td>[object Boolean]</td>
            </tr>
            <tr>
              <td>null</td>
              <td>'object'</td>
              <td>[object Null]</td>
            </tr>
            <tr>
              <td>undefined</td>
              <td>'undefined'</td>
              <td>[object Undefined]</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>

    <!-- 注意事项 -->
    <footer class="doc-footer">
      <div class="notice-board">
        <h3>🚩 最佳实践建议</h3>
        <div class="notice-list">
          <div class="notice-item">
            <div class="icon">💡</div>
            <p>优先使用===进行严格相等比较</p>
          </div>
          <div class="notice-item">
            <div class="icon">💡</div>
            <p>使用Number.isNaN代替全局isNaN</p>
          </div>
          <div class="notice-item">
            <div class="icon">💡</div>
            <p>避免直接使用包装对象</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Fira+Code&display=swap');

.basic-types-doc {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem 3rem;
  background: linear-gradient(145deg, #f8fafb 0%, #ffffff 100%);
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  font-family: 'Inter', sans-serif;

  .doc-header {
    text-align: center;
    margin-bottom: 1rem;

    .title {
      color: #0984e3;
      font-size: 2.8rem;
      margin: 1rem 0;
      text-shadow: 2px 2px 4px rgba(9, 132, 227, 0.1);
    }

    .subtitle {
      color: #636e72;
      font-size: 1.4rem;
      letter-spacing: 0.05em;
    }

    .header-bar {
      width: 120px;
      height: 4px;
      background: linear-gradient(90deg, #0984e3 0%, #00b894 100%);
      margin: 1.5rem auto;
      border-radius: 2px;
    }
  }

  .doc-content {
    .type-section {
      margin-bottom: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-3px);
      }

      .type-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;

        .icon {
          font-size: 2.5rem;
        }
      }

      .type-content {
        .methods ul {
          list-style: none;
          padding-left: 1.5rem;

          li::before {
            content: '▹';
            color: #0984e3;
            margin-right: 0.5rem;
          }
        }

        .notice {
          padding: 1rem;
          background: #ffeaa7;
          border-radius: 8px;
          grid-column: span 2;
        }

        .comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          width: 100%;
        }
      }
    }

    .type-check {
      .type-table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #0984e3;
          color: white;
        }

        tr:nth-child(even) {
          background: #f8f9fa;
        }
      }
    }

    .code-block {
      background: #2d3436;
      color: #dfe6e9;
      padding: 1rem;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      overflow-x: auto;
    }
  }

  .doc-footer {
    .notice-board {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 8px;
      border-left: 4px solid #0984e3;

      .notice-list {
        .notice-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;

          .icon {
            font-size: 1.5rem;
            color: #0984e3;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .basic-types-doc {
    padding: 1rem;
    margin: 1rem;

    .doc-header .title {
      font-size: 2rem;
    }

    .type-content {
      grid-template-columns: 1fr !important;
    }

    .comparison {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>
