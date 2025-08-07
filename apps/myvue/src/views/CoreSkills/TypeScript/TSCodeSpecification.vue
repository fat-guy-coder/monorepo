<template>
  <div class="ts-guide-container">
    <header class="header">
      <h1>TypeScript代码规范指南</h1>
      <p>编写可维护、类型安全的TypeScript代码</p>
      <div class="badges">
        <span class="badge badge-ts">TypeScript</span>
        <span class="badge badge-setup">Setup语法</span>
        <span class="badge badge-less">LESS</span>
      </div>
    </header>

    <div class="card-container">
      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-file-code"></i>
          <span>命名规范</span>
        </div>
        <div class="card-body">
          <h3>一致性的命名是代码可读性的基础</h3>

          <div class="spec-grid">
            <div class="spec-item">
              <div class="spec-name">变量 & 函数</div>
              <div class="spec-desc">camelCase命名法</div>
              <div class="code-block">
                <span class="code-keyword">const</span> userName = <span class="code-string">'John'</span>;<br>
                <span class="code-keyword">function</span> <span class="code-function">getUserData</span>() {}
              </div>
            </div>

            <div class="spec-item">
              <div class="spec-name">类 & 接口</div>
              <div class="spec-desc">PascalCase命名法</div>
              <div class="code-block">
                <span class="code-keyword">class</span> <span class="code-class">UserService</span> {}<br>
                <span class="code-keyword">interface</span> <span class="code-interface">IUserData</span> {}
              </div>
            </div>

            <div class="spec-item">
              <div class="spec-name">类型别名</div>
              <div class="spec-desc">PascalCase + "Type"后缀</div>
              <div class="code-block">
                <span class="code-keyword">type</span> <span class="code-type">UserType</span> = {<br>
                &nbsp;&nbsp;name: <span class="code-type">string</span>;<br>
                &nbsp;&nbsp;age: <span class="code-type">number</span>;<br>
                };
              </div>
            </div>

            <div class="spec-item">
              <div class="spec-name">常量</div>
              <div class="spec-desc">UPPER_SNAKE_CASE</div>
              <div class="code-block">
                <span class="code-keyword">const</span> <span class="code-const">MAX_RETRIES</span> = 5;<br>
                <span class="code-keyword">const</span> <span class="code-const">API_ENDPOINT</span> = <span
                  class="code-string">'/api/data'</span>;
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-shield-alt"></i>
          <span>类型安全</span>
        </div>
        <div class="card-body">
          <h3>充分利用TypeScript的类型系统</h3>

          <div class="spec-item">
            <div class="spec-name">避免any类型</div>
            <div class="spec-desc">尽可能使用具体类型</div>
            <div class="code-block">
              <span class="code-comment">// 避免</span><br>
              <span class="code-keyword">const</span> data: <span class="code-type">any</span> = <span
                class="code-function">fetchData</span>();<br><br>

              <span class="code-comment">// 推荐</span><br>
              <span class="code-keyword">const</span> data: <span class="code-type">UserData</span> = <span
                class="code-function">fetchData</span>();
            </div>
          </div>

          <div class="spec-item">
            <div class="spec-name">使用类型推断</div>
            <div class="spec-desc">让TypeScript自动推断类型</div>
            <div class="code-block">
              <span class="code-comment">// 不推荐（冗余）</span><br>
              <span class="code-keyword">const</span> name: <span class="code-type">string</span> = <span
                class="code-string">'John'</span>;<br><br>

              <span class="code-comment">// 推荐</span><br>
              <span class="code-keyword">const</span> name = <span class="code-string">'John'</span>; <span
                class="code-comment">// 自动推断为string</span>
            </div>
          </div>

          <div class="spec-item">
            <div class="spec-name">严格空检查</div>
            <div class="spec-desc">启用strictNullChecks</div>
            <div class="code-block">
              <span class="code-comment">// tsconfig.json</span><br>
              {<br>
              &nbsp;&nbsp;<span class="code-string">"compilerOptions"</span>: {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-string">"strictNullChecks"</span>: <span
                class="code-keyword">true</span><br>
              &nbsp;&nbsp;}<br>
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-container">
      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-project-diagram"></i>
          <span>接口与类型</span>
        </div>
        <div class="card-body">
          <h3>选择接口还是类型别名？</h3>

          <div class="spec-grid">
            <div class="spec-item">
              <div class="spec-name">接口 (interface)</div>
              <div class="spec-desc">用于定义对象形状</div>
              <div class="code-block">
                <span class="code-keyword">interface</span> <span class="code-interface">User</span> {<br>
                &nbsp;&nbsp;id: <span class="code-type">number</span>;<br>
                &nbsp;&nbsp;name: <span class="code-type">string</span>;<br>
                &nbsp;&nbsp;email?: <span class="code-type">string</span>; <span class="code-comment">// 可选属性</span><br>
                }
              </div>
            </div>

            <div class="spec-item">
              <div class="spec-name">类型别名 (type)</div>
              <div class="spec-desc">用于联合类型或复杂类型</div>
              <div class="code-block">
                <span class="code-keyword">type</span> <span class="code-type">ID</span> = <span
                  class="code-type">number</span> | <span class="code-type">string</span>;<br><br>

                <span class="code-keyword">type</span> <span class="code-type">ApiResponse</span>&lt;T&gt; = {<br>
                &nbsp;&nbsp;data: T;<br>
                &nbsp;&nbsp;error: <span class="code-type">string</span> | <span class="code-type">null</span>;<br>
                &nbsp;&nbsp;status: <span class="code-type">number</span>;<br>
                };
              </div>
            </div>
          </div>

          <h3>最佳实践</h3>
          <ul>
            <li>优先使用接口定义对象结构</li>
            <li>使用类型别名定义联合类型、元组或复杂类型</li>
            <li>避免在接口中使用方法实现</li>
            <li>使用索引签名定义动态属性</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-cubes"></i>
          <span>泛型应用</span>
        </div>
        <div class="card-body">
          <h3>创建可复用的类型安全组件</h3>

          <div class="spec-item">
            <div class="spec-name">基础泛型函数</div>
            <div class="code-block">
              <span class="code-keyword">function</span> <span class="code-function">identity</span>&lt;T&gt;(arg: T): T
              {<br>
              &nbsp;&nbsp;<span class="code-keyword">return</span> arg;<br>
              }<br><br>

              <span class="code-keyword">const</span> result = <span class="code-function">identity</span>&lt;<span
                class="code-type">string</span>&gt;(<span class="code-string">'Hello'</span>);
            </div>
          </div>

          <div class="spec-item">
            <div class="spec-name">泛型约束</div>
            <div class="code-block">
              <span class="code-keyword">interface</span> <span class="code-interface">Lengthwise</span> {<br>
              &nbsp;&nbsp;length: <span class="code-type">number</span>;<br>
              }<br><br>

              <span class="code-keyword">function</span> <span class="code-function">logLength</span>&lt;T <span
                class="code-keyword">extends</span> <span class="code-interface">Lengthwise</span>&gt;(arg: T): <span
                class="code-type">void</span> {<br>
              &nbsp;&nbsp;console.<span class="code-function">log</span>(arg.length);<br>
              }
            </div>
          </div>

          <div class="spec-item">
            <div class="spec-name">泛型接口</div>
            <div class="code-block">
              <span class="code-keyword">interface</span> <span class="code-interface">KeyValuePair</span>&lt;K, V&gt;
              {<br>
              &nbsp;&nbsp;key: K;<br>
              &nbsp;&nbsp;value: V;<br>
              }<br><br>

              <span class="code-keyword">const</span> pair: <span class="code-interface">KeyValuePair</span>&lt;<span
                class="code-type">string</span>, <span class="code-type">number</span>&gt; = {<br>
              &nbsp;&nbsp;key: <span class="code-string">'age'</span>,<br>
              &nbsp;&nbsp;value: 30<br>
              };
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-container">
      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-class"></i>
          <span>类与面向对象</span>
        </div>
        <div class="card-body">
          <h3>现代TypeScript中的类设计</h3>

          <div class="spec-item">
            <div class="spec-name">访问修饰符</div>
            <div class="spec-desc">使用public, private, protected</div>
            <div class="code-block">
              <span class="code-keyword">class</span> <span class="code-class">Person</span> {<br>
              &nbsp;&nbsp;<span class="code-keyword">private</span> id: <span class="code-type">number</span>;<br>
              &nbsp;&nbsp;<span class="code-keyword">protected</span> name: <span class="code-type">string</span>;<br>
              &nbsp;&nbsp;<span class="code-keyword">public</span> age: <span class="code-type">number</span>;<br><br>

              &nbsp;&nbsp;<span class="code-keyword">constructor</span>(id: <span class="code-type">number</span>, name:
              <span class="code-type">string</span>, age: <span class="code-type">number</span>) {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">this</span>.id = id;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">this</span>.name = name;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">this</span>.age = age;<br>
              &nbsp;&nbsp;}<br>
              }
            </div>
          </div>

          <div class="spec-item">
            <div class="spec-name">抽象类</div>
            <div class="spec-desc">定义通用行为</div>
            <div class="code-block">
              <span class="code-keyword">abstract</span> <span class="code-keyword">class</span> <span
                class="code-class">Shape</span> {<br>
              &nbsp;&nbsp;<span class="code-keyword">abstract</span> <span class="code-function">area</span>(): <span
                class="code-type">number</span>;<br><br>

              &nbsp;&nbsp;<span class="code-function">display</span>(): <span class="code-type">void</span> {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;console.<span class="code-function">log</span>(<span class="code-string">`Area:
                <span class="code-expression">${this.area()}</span>`</span>);<br>
              &nbsp;&nbsp;}<br>
              }<br><br>

              <span class="code-keyword">class</span> <span class="code-class">Circle</span> <span
                class="code-keyword">extends</span> <span class="code-class">Shape</span> {<br>
              &nbsp;&nbsp;<span class="code-keyword">constructor</span>(<span class="code-keyword">private</span>
              radius: <span class="code-type">number</span>) {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">super</span>();<br>
              &nbsp;&nbsp;}<br><br>

              &nbsp;&nbsp;<span class="code-function">area</span>(): <span class="code-type">number</span> {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">return</span> Math.<span
                class="code-function">PI</span> * <span class="code-keyword">this</span>.radius ** 2;<br>
              &nbsp;&nbsp;}<br>
              }
            </div>
          </div>

          <div class="spec-item">
            <div class="spec-name">只读属性</div>
            <div class="spec-desc">使用readonly关键字</div>
            <div class="code-block">
              <span class="code-keyword">class</span> <span class="code-class">Config</span> {<br>
              &nbsp;&nbsp;<span class="code-keyword">readonly</span> apiUrl: <span
                class="code-type">string</span>;<br><br>

              &nbsp;&nbsp;<span class="code-keyword">constructor</span>(url: <span class="code-type">string</span>)
              {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">this</span>.apiUrl = url;<br>
              &nbsp;&nbsp;}<br>
              }<br><br>

              <span class="code-keyword">const</span> config = <span class="code-keyword">new</span> <span
                class="code-class">Config</span>(<span class="code-string">'https://api.example.com'</span>);<br>
              <span class="code-comment">// config.apiUrl = 'new-url'; // 错误: 只读属性</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-comments"></i>
          <span>注释与文档</span>
        </div>
        <div class="card-body">
          <h3>编写自文档化代码</h3>

          <div class="spec-item">
            <div class="spec-name">TSDoc注释</div>
            <div class="spec-desc">使用标准注释格式</div>
            <div class="code-block">
              <span class="code-comment">/**</span><br>
              <span class="code-comment"> * 计算两个数字的和</span><br>
              <span class="code-comment"> * @param a - 第一个数字</span><br>
              <span class="code-comment"> * @param b - 第二个数字</span><br>
              <span class="code-comment"> * @returns 两个数字的和</span><br>
              <span class="code-comment"> */</span><br>
              <span class="code-keyword">function</span> <span class="code-function">add</span>(a: <span
                class="code-type">number</span>, b: <span class="code-type">number</span>): <span
                class="code-type">number</span> {<br>
              &nbsp;&nbsp;<span class="code-keyword">return</span> a + b;<br>
              }
            </div>
          </div>

          <div class="spec-item">
            <div class="spec-name">类型注释</div>
            <div class="spec-desc">为复杂类型添加说明</div>
            <div class="code-block">
              <span class="code-comment">/**</span><br>
              <span class="code-comment"> * 表示用户信息的接口</span><br>
              <span class="code-comment"> * @property id - 用户唯一标识</span><br>
              <span class="code-comment"> * @property name - 用户全名</span><br>
              <span class="code-comment"> * @property email - 用户邮箱（可选）</span><br>
              <span class="code-comment"> */</span><br>
              <span class="code-keyword">interface</span> <span class="code-interface">User</span> {<br>
              &nbsp;&nbsp;id: <span class="code-type">number</span>;<br>
              &nbsp;&nbsp;name: <span class="code-type">string</span>;<br>
              &nbsp;&nbsp;email?: <span class="code-type">string</span>;<br>
              }
            </div>
          </div>

          <div class="spec-item">
            <div class="spec-name">避免冗余注释</div>
            <div class="spec-desc">代码应自解释</div>
            <div class="code-block">
              <span class="code-comment">// 避免</span><br>
              <span class="code-comment">// 增加计数器</span><br>
              counter++;<br><br>

              <span class="code-comment">// 推荐（使用有意义的变量名）</span><br>
              <span class="code-keyword">const</span> userCount = currentUsers + newUsers;
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="config-section">
      <div class="config-header">
        <i class="icon fas fa-check-circle"></i>
        <span>最佳实践总结</span>
      </div>

      <div class="best-practices-grid">
        <div class="practice-item">
          <h3><i class="fas fa-code"></i> 代码组织</h3>
          <ul>
            <li>一个文件只包含一个主要类/组件</li>
            <li>使用模块化组织代码</li>
            <li>避免全局命名空间污染</li>
            <li>合理使用命名空间</li>
          </ul>
        </div>

        <div class="practice-item">
          <h3><i class="fas fa-sync-alt"></i> 异步处理</h3>
          <ul>
            <li>优先使用async/await</li>
            <li>避免Promise嵌套地狱</li>
            <li>正确处理错误（try/catch）</li>
            <li>为异步函数添加返回类型</li>
          </ul>
        </div>

        <div class="practice-item">
          <h3><i class="fas fa-ban"></i> 避免反模式</h3>
          <ul>
            <li>避免使用双重断言</li>
            <li>避免过度的类型断言</li>
            <li>不要混用类型和接口</li>
            <li>避免过长的函数和类</li>
          </ul>
        </div>

        <div class="practice-item">
          <h3><i class="fas fa-tools"></i> 工具配置</h3>
          <ul>
            <li>启用严格模式（tsconfig）</li>
            <li>配置ESLint + Prettier</li>
            <li>使用Husky添加pre-commit钩子</li>
            <li>定期更新TypeScript版本</li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>© 2023 TypeScript代码规范指南 | 编写可维护的类型安全代码</p>
      <p>本页面使用Vue3、TypeScript、Setup语法、LESS和Scoped样式构建</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 此组件为静态展示组件，无需响应式数据
// 这里仅为了展示setup语法和TypeScript的使用
const tsVersion = ref('5.2.2');
const eslintVersion = ref('8.50.0');
</script>

<style lang="less" scoped>


.ts-guide-container {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  background: linear-gradient(135deg, #f8f9fa 0%, #eef2f6 100%);
  color: #2c3e50;
  min-height: 100vh;
  padding: 20px;

  .header {
    text-align: center;
    padding: 30px 0;
    margin-bottom: 30px;
    border-bottom: 2px solid #4d5bf9;

    h1 {
      font-size: 2.5rem;
      color: #3a4cd9;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      color: #495057;
      max-width: 800px;
      margin: 0 auto;
    }

    .badges {
      margin-top: 15px;
    }

    .badge {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: bold;
      margin: 0 8px;
    }

    .badge-ts {
      background: #3178c6;
      color: white;
    }

    .badge-setup {
      background: #42b983;
      color: white;
    }

    .badge-less {
      background: #1d365d;
      color: white;
    }
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
  }

  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    }
  }

  .card-header {
    background: #4d5bf9;
    color: white;
    padding: 18px 25px;
    font-size: 1.4rem;
    display: flex;
    align-items: center;

    .icon {
      margin-right: 12px;
      font-size: 1.6rem;
    }
  }

  .card-body {
    padding: 25px;
    line-height: 1.7;

    h3 {
      color: #3a4cd9;
      margin-bottom: 15px;
      font-size: 1.3rem;
      padding-bottom: 8px;
      border-bottom: 1px solid #e9ecef;
    }

    p {
      margin-bottom: 15px;
      color: #495057;
    }

    ul {
      padding-left: 25px;
      margin: 15px 0;
    }

    li {
      margin-bottom: 10px;
      position: relative;

      &:before {
        content: "•";
        color: #4d5bf9;
        font-weight: bold;
        position: absolute;
        left: -15px;
      }
    }

    .spec-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }

    .spec-item {
      background: #f8f9ff;
      border-radius: 8px;
      padding: 18px;
      border-left: 3px solid #4d5bf9;
      margin-bottom: 20px;
    }

    .spec-name {
      font-weight: bold;
      color: #3a4cd9;
      margin-bottom: 8px;
      font-size: 1.1rem;
    }

    .spec-desc {
      color: #6c757d;
      margin-bottom: 12px;
      font-size: 0.95rem;
    }
  }

  .code-block {
    background: #2c3e50;
    color: #e9ecef;
    border-radius: 8px;
    padding: 20px;
    margin: 10px 0 20px;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 0.92rem;
    line-height: 1.6;
    overflow-x: auto;
  }

  .code-comment {
    color: #adb5bd;
    font-style: italic;
  }

  .code-keyword {
    color: #f783ac;
  }

  .code-string {
    color: #69db7c;
  }

  .code-type {
    color: #74c0fc;
  }

  .code-function {
    color: #ffd43b;
  }

  .code-class {
    color: #e599f7;
  }

  .code-interface {
    color: #b197fc;
  }

  .code-const {
    color: #ffa94d;
  }

  .code-expression {
    color: #ffa94d;
  }

  .config-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    padding: 30px;
    margin-bottom: 40px;
  }

  .config-header {
    font-size: 1.8rem;
    color: #3a4cd9;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e9ecef;
    display: flex;
    align-items: center;

    .icon {
      margin-right: 15px;
    }
  }

  .best-practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
  }

  .practice-item {
    background: #f8f9ff;
    border-radius: 10px;
    padding: 20px;
    border-top: 3px solid #4d5bf9;

    h3 {
      color: #3a4cd9;
      margin-bottom: 15px;
      font-size: 1.2rem;
      display: flex;
      align-items: center;

      i {
        margin-right: 10px;
        font-size: 1.2rem;
        width: 25px;
      }
    }

    ul {
      padding-left: 20px;
    }

    li {
      margin-bottom: 10px;
      color: #495057;
      font-size: 0.95rem;
    }
  }

  .footer {
    text-align: center;
    padding: 30px 0;
    color: #495057;
    font-size: 0.9rem;
    border-top: 1px solid #e9ecef;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .card-container {
      grid-template-columns: 1fr;
    }

    .header h1 {
      font-size: 2rem;
    }

    .best-practices-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
