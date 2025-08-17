<template>
  <div class="string-methods-container">
    <header class="header">
      <h1>JavaScript 字符串方法：matchAll & replaceAll</h1>
      <p class="subtitle">强大的字符串处理工具详解</p>
    </header>

    <div class="content">
      <!-- matchAll 部分 -->
      <section class="method-section">
        <div class="method-header">
          <div class="icon">🔍</div>
          <h2>String.prototype.matchAll()</h2>
          <div class="method-syntax">
            str.matchAll(regexp)
          </div>
        </div>

        <div class="method-content">
          <div class="method-description">
            <h3>作用</h3>
            <p>matchAll() 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。</p>
            <p>与 match() 方法不同，matchAll() 专为全局匹配设计，能够返回每个匹配的完整信息。</p>
          </div>

          <div class="parameters">
            <h3>参数</h3>
            <div class="param-card">
              <div class="param-name">regexp</div>
              <div class="param-details">
                <p>一个正则表达式对象。如果传入非正则表达式对象，则会隐式调用 <code>new RegExp(obj)</code> 进行转换。</p>
                <p class="important">必须包含 <code>g</code> 标志（全局匹配），否则会抛出 TypeError。</p>
              </div>
            </div>
          </div>

          <div class="return-value">
            <h3>返回值</h3>
            <p>返回一个迭代器（不可重用），每个迭代值是一个包含匹配信息的数组，包含以下属性：</p>
            <ul>
              <li><code>[0]</code>: 完整匹配的字符串</li>
              <li><code>[1], [2], ...</code>: 捕获组匹配的结果</li>
              <li><code>index</code>: 匹配到的字符在原始字符串中的索引位置</li>
              <li><code>input</code>: 原始字符串</li>
              <li><code>groups</code>: 命名捕获组对象（如果正则中有命名捕获组）</li>
            </ul>
          </div>

          <div class="usage-example">
            <h3>使用示例</h3>
            <pre><code>const str = 'test1test2';
const regexp = /t(e)(st(\d?))/g;
const matches = str.matchAll(regexp);

for (const match of matches) {
  console.log(match);
}
// 第一次迭代: ['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', groups: undefined]
// 第二次迭代: ['test2', 'e', 'st2', '2', index: 5, input: 'test1test2', groups: undefined]</code></pre>
          </div>

          <div class="use-cases">
            <h3>适用场景</h3>
            <div class="scenario-grid">
              <div class="scenario-card">
                <div class="icon">📝</div>
                <h4>提取复杂模式</h4>
                <p>需要同时获取多个匹配结果和捕获组</p>
              </div>
              <div class="scenario-card">
                <div class="icon">🧩</div>
                <h4>解析结构化文本</h4>
                <p>如日志文件、自定义格式数据</p>
              </div>
              <div class="scenario-card">
                <div class="icon">🔗</div>
                <h4>处理命名捕获组</h4>
                <p>轻松访问命名分组的结果</p>
              </div>
            </div>
          </div>

          <div class="notes">
            <h3>注意事项</h3>
            <ul>
              <li>必须使用全局正则表达式（带 <code>g</code> 标志）</li>
              <li>返回的是迭代器，不是数组，需要使用循环或 <code>Array.from()</code> 处理</li>
              <li>迭代器在迭代完成后不可重用，需要再次调用 <code>matchAll()</code> 获取新迭代器</li>
              <li>在旧版浏览器中需要 polyfill 支持</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- replaceAll 部分 -->
      <section class="method-section">
        <div class="method-header">
          <div class="icon">🔄</div>
          <h2>String.prototype.replaceAll()</h2>
          <div class="method-syntax">
            str.replaceAll(searchValue, replaceValue)
          </div>
        </div>

        <div class="method-content">
          <div class="method-description">
            <h3>作用</h3>
            <p>replaceAll() 方法返回一个新字符串，其中所有匹配指定模式的部分都被替换。</p>
            <p>与 replace() 不同，replaceAll() 会替换所有匹配项而不需要全局标志。</p>
          </div>

          <div class="parameters">
            <h3>参数</h3>
            <div class="param-card">
              <div class="param-name">searchValue</div>
              <div class="param-details">
                <p>可以是要搜索的字符串或正则表达式：</p>
                <ul>
                  <li>如果是字符串，将作为直接量文本搜索（非正则）</li>
                  <li>如果是正则表达式，<strong>必须包含 <code>g</code> 标志</strong></li>
                </ul>
              </div>
            </div>

            <div class="param-card">
              <div class="param-name">replaceValue</div>
              <div class="param-details">
                <p>替换字符串或替换函数：</p>
                <ul>
                  <li>字符串：用于替换每个匹配项</li>
                  <li>函数：为每个匹配项调用以生成替换内容</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="return-value">
            <h3>返回值</h3>
            <p>返回一个新字符串，其中所有匹配项都被替换，原始字符串保持不变。</p>
          </div>

          <div class="replacement-function">
            <h3>替换函数详解</h3>
            <p>当第二个参数是函数时，每次匹配都会调用该函数，其返回值作为替换文本。</p>

            <div class="function-signature">
              <pre><code>function replacer(match, p1, p2, ..., offset, string, groups) {
  // 返回替换字符串
}</code></pre>
            </div>

            <div class="function-params">
              <h4>参数说明：</h4>
              <ul>
                <li>
                  <code>match</code> - 匹配的子字符串（相当于 match[0]）
                </li>
                <li>
                  <code>p1, p2, ...</code> - 捕获组匹配的字符串（如果有）
                </li>
                <li>
                  <code>offset</code> - 匹配到的子字符串在原始字符串中的偏移量
                </li>
                <li>
                  <code>string</code> - 原始字符串
                </li>
                <li>
                  <code>groups</code> - 命名捕获组的对象（如果有）
                </li>
              </ul>
            </div>

            <div class="function-example">
              <h4>函数使用示例：</h4>
              <pre><code>const str = 'Hello world, hello universe';
const newStr = str.replaceAll(/hello/gi, (match, offset) => {
  return match.toUpperCase() + `(${offset})`;
});
// 结果: "HELLO(0) world, HELLO(12) universe"</code></pre>
            </div>
          </div>

          <div class="usage-example">
            <h3>使用示例</h3>
            <pre><code>// 简单字符串替换
'Apples are round, apples are juicy'.replaceAll('apples', 'oranges');
// 结果: 'Apples are round, oranges are juicy'

// 使用正则表达式
'abc123def456'.replaceAll(/\d+/g, '[$&]');
// 结果: 'abc[123]def[456]'

// 使用替换函数
'John Smith, Jane Doe'.replaceAll(/(\w+)\s(\w+)/g, (match, p1, p2) => {
  return `${p2}, ${p1}`;
});
// 结果: 'Smith, John, Doe, Jane'</code></pre>
          </div>

          <div class="use-cases">
            <h3>适用场景</h3>
            <div class="scenario-grid">
              <div class="scenario-card">
                <div class="icon">🧹</div>
                <h4>批量文本替换</h4>
                <p>一次性替换所有匹配项</p>
              </div>
              <div class="scenario-card">
                <div class="icon">🎨</div>
                <h4>动态内容生成</h4>
                <p>使用函数动态生成替换内容</p>
              </div>
              <div class="scenario-card">
                <div class="icon">🛡️</div>
                <h4>数据清理</h4>
                <p>移除或替换敏感信息</p>
              </div>
            </div>
          </div>

          <div class="notes">
            <h3>注意事项</h3>
            <ul>
              <li>当 searchValue 是正则表达式时，必须包含 <code>g</code> 标志</li>
              <li>原始字符串不会被修改，总是返回新字符串</li>
              <li>替换函数中的参数顺序是固定的</li>
              <li>在旧版浏览器中需要 polyfill 支持</li>
              <li>使用字符串作为 searchValue 时，会替换所有字面匹配项</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 对比总结 -->
      <section class="comparison-section">
        <h2>matchAll 与 replaceAll 对比</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>matchAll</th>
                <th>replaceAll</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>主要用途</td>
                <td>查找并提取匹配项</td>
                <td>查找并替换匹配项</td>
              </tr>
              <tr>
                <td>返回值</td>
                <td>匹配结果的迭代器</td>
                <td>替换后的新字符串</td>
              </tr>
              <tr>
                <td>是否修改原字符串</td>
                <td>否</td>
                <td>否</td>
              </tr>
              <tr>
                <td>正则要求</td>
                <td>必须带 g 标志</td>
                <td>正则必须带 g 标志</td>
              </tr>
              <tr>
                <td>参数类型</td>
                <td>仅接受正则表达式</td>
                <td>接受字符串或正则</td>
              </tr>
              <tr>
                <td>处理多个匹配</td>
                <td>返回所有匹配详细信息</td>
                <td>替换所有匹配项</td>
              </tr>
              <tr>
                <td>浏览器支持</td>
                <td>ES2020+</td>
                <td>ES2021+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>© 2023 JavaScript 字符串方法详解 | matchAll & replaceAll</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 不需要逻辑，静态展示组件
</script>

<style lang="less" scoped>

.string-methods-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #f9fbfd 0%, #f0f4f8 100%);
  min-height: 100vh;
  color: #2d3748;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  border-radius: 16px;
  background: linear-gradient(120deg, #3b5bdb, #4c6ef5);
  color: white;
  box-shadow: 0 10px 20px rgba(66, 153, 225, 0.15);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.method-section {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
}

.method-header {
  display: flex;
  align-items: center;
  padding: 25px 30px;
  background: linear-gradient(120deg, #f8f9fa, #e9ecef);
  border-bottom: 1px solid #e2e8f0;

  .icon {
    font-size: 2rem;
    margin-right: 15px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
    color: #2d3748;
    flex: 1;
  }

  .method-syntax {
    font-family: 'Fira Code', monospace;
    background: #1e293b;
    color: #f8fafc;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 1.1rem;
  }
}

.method-content {
  padding: 30px;

  h3 {
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 20px;
    color: #3b5bdb;
    padding-bottom: 10px;
    border-bottom: 2px solid #e9ecef;
  }

  h4 {
    font-size: 1.2rem;
    margin-top: 25px;
    margin-bottom: 15px;
    color: #495057;
  }
}

.method-description {
  margin-bottom: 30px;

  p {
    font-size: 1.1rem;
    color: #4a5568;
    margin-bottom: 15px;
  }
}

.parameters {
  margin-bottom: 30px;
}

.param-card {
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;

  .param-name {
    padding: 15px 20px;
    background: #e9ecef;
    font-family: 'Fira Code', monospace;
    font-weight: 600;
    font-size: 1.1rem;
    color: #3b5bdb;
  }

  .param-details {
    padding: 20px;

    p, ul {
      margin: 0 0 15px 0;
    }

    ul {
      padding-left: 25px;
    }

    .important {
      background: #fff9db;
      padding: 12px 15px;
      border-radius: 8px;
      border-left: 4px solid #f59f00;
      font-weight: 500;
    }
  }
}

.return-value {
  background: #e6fcf5;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid #38d9a9;

  p {
    font-size: 1.1rem;
    margin-bottom: 15px;
  }

  ul {
    padding-left: 25px;
    margin: 0;

    li {
      margin-bottom: 10px;
      position: relative;
      padding-left: 25px;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #20c997;
        font-size: 1.5rem;
        line-height: 1;
      }

      code {
        background: #d3f9d8;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
      }
    }
  }
}

.usage-example {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 30px;

  pre {
    margin: 0;
    padding: 20px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      color: #f8fafc;
      line-height: 1.5;
      white-space: pre-wrap;
    }
  }
}

.replacement-function {
  background: #fff4e6;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  border: 1px solid #ff922b;

  .function-signature {
    background: #1e293b;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;

    pre {
      margin: 0;
      padding: 20px;

      code {
        font-family: 'Fira Code', monospace;
        color: #f8fafc;
        line-height: 1.5;
      }
    }
  }

  .function-params {
    ul {
      padding-left: 25px;
      margin: 0 0 20px 0;

      li {
        margin-bottom: 12px;
        position: relative;
        padding-left: 25px;

        &::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #fd7e14;
          font-weight: bold;
        }

        code {
          background: #ffe8cc;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
        }
      }
    }
  }
}

.use-cases {
  margin-bottom: 30px;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.scenario-card {
  background: #f1f3f9;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #4c6ef5;
  }

  h4 {
    font-size: 1.3rem;
    margin: 0 0 10px 0;
    color: #3b5bdb;
  }

  p {
    font-size: 1rem;
    margin: 0;
    color: #495057;
  }
}

.notes {
  background: #fff5f5;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #ff6b6b;

  ul {
    padding-left: 25px;
    margin: 0;

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 30px;

      &::before {
        content: '!';
        position: absolute;
        left: 0;
        width: 22px;
        height: 22px;
        background: #ff6b6b;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        font-weight: bold;
      }

      code {
        background: #ffc9c9;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
      }
    }
  }
}

.comparison-section {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  padding: 30px;

  h2 {
    font-size: 1.8rem;
    text-align: center;
    margin-top: 0;
    margin-bottom: 30px;
    color: #3b5bdb;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;

    th, td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #e9ecef;
    }

    th {
      background: #edf2ff;
      color: #3b5bdb;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f8f9fa;
    }

    tr:hover {
      background: #edf7ff;
    }
  }
}

.footer {
  text-align: center;
  padding: 25px;
  color: #718096;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .method-header {
    flex-direction: column;
    text-align: center;
    gap: 15px;

    .icon {
      margin-right: 0;
      margin-bottom: 15px;
    }

    .method-syntax {
      width: 100%;
    }
  }

  .scenario-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.8rem;
  }

  .method-content {
    padding: 20px;
  }
}
</style>
