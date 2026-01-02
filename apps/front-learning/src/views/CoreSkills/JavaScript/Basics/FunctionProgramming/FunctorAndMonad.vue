<template>
  <div class="functor-monad-container">
    <header class="header">
      <h1 class="title">函子(Functor)与Monad</h1>
      <p class="subtitle">函数式编程中的抽象容器与组合模式</p>
      <div class="decoration">
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </header>

    <div class="content">
      <div class="overview">
        <div class="concept">
          <div class="concept-box functor">
            <h2>函子(Functor)</h2>
            <p>实现map方法的容器</p>
            <div class="formula">map :: (a → b) → f a → f b</div>
          </div>
          <div class="arrow">→</div>
          <div class="concept-box monad">
            <h2>Monad</h2>
            <p>实现chain/flatMap方法的函子</p>
            <div class="formula">chain :: (a → m b) → m a → m b</div>
          </div>
        </div>
        <div class="explanation">
          <p>函子和Monad是函数式编程中的核心抽象，提供了一种安全处理副作用和异步操作的方式，同时保持代码的可组合性。</p>
        </div>
      </div>

      <div class="grid-layout">
        <section class="card functor-card">
          <h2 class="section-title">函子(Functor)</h2>

          <div class="definition">
            <p>函子是一个实现了<code>map</code>方法的容器，它允许在不打开容器的情况下，对容器内的值应用函数。</p>
          </div>

          <div class="properties">
            <h3>核心特性</h3>
            <ul>
              <li>
                <div class="icon">📦</div>
                <div>
                  <h4>容器化</h4>
                  <p>包裹值并提供安全访问</p>
                </div>
              </li>
              <li>
                <div class="icon">🔄</div>
                <div>
                  <h4>可映射</h4>
                  <p>通过map方法转换内部值</p>
                </div>
              </li>
              <li>
                <div class="icon">📐</div>
                <div>
                  <h4>结构保持</h4>
                  <p>转换后保持容器结构不变</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="code-example">
            <h3>基础函子实现</h3>
            <pre><code>class Functor {
  constructor(value) {
    this.value = value;
  }

  map(fn) {
    return new Functor(fn(this.value));
  }

  static of(value) {
    return new Functor(value);
  }
}

// 使用示例
const result = Functor.of(5)
  .map(x => x * 2)
  .map(x => x + 1);

console.log(result.value); // 11</code></pre>
          </div>
        </section>

        <section class="card monad-card">
          <h2 class="section-title">Monad</h2>

          <div class="definition">
            <p>Monad是一种特殊的函子，它实现了<code>chain</code>(或<code>flatMap</code>)方法，用于处理嵌套容器并解决回调地狱问题。</p>
          </div>

          <div class="properties">
            <h3>核心特性</h3>
            <ul>
              <li>
                <div class="icon">🔗</div>
                <div>
                  <h4>扁平化</h4>
                  <p>解决嵌套容器问题</p>
                </div>
              </li>
              <li>
                <div class="icon">🧩</div>
                <div>
                  <h4>组合性</h4>
                  <p>支持顺序组合操作</p>
                </div>
              </li>
              <li>
                <div class="icon">⚡</div>
                <div>
                  <h4>副作用处理</h4>
                  <p>优雅处理异步和副作用</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="code-example">
            <h3>Monad实现</h3>
            <pre><code>class Monad extends Functor {
  chain(fn) {
    return this.map(fn).join();
  }

  join() {
    return this.value instanceof Monad
      ? this.value.join()
      : this;
  }

  static of(value) {
    return new Monad(value);
  }
}

// 使用示例
const result = Monad.of(Monad.of(5))
  .chain(inner => inner.map(x => x * 3));

console.log(result.value); // 15</code></pre>
          </div>
        </section>
      </div>

      <section class="card common-functors">
        <h2 class="section-title">常见函子与Monad</h2>

        <div class="functors-grid">
          <div class="functor-type">
            <h3>Maybe</h3>
            <p>处理空值或未定义值</p>
            <pre><code>class Maybe {
  constructor(value) {
    this.value = value;
  }

  map(fn) {
    return this.value == null
      ? Maybe.of(null)
      : Maybe.of(fn(this.value));
  }
}</code></pre>
          </div>

          <div class="functor-type">
            <h3>Either</h3>
            <p>处理错误和分支逻辑</p>
            <pre><code>class Either {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  map(fn) {
    return this.right
      ? Either.of(this.left, fn(this.right))
      : Either.of(fn(this.left), this.right);
  }
}</code></pre>
          </div>

          <div class="functor-type">
            <h3>IO</h3>
            <p>延迟执行副作用操作</p>
            <pre><code>class IO {
  constructor(effect) {
    this.effect = effect;
  }

  map(fn) {
    return new IO(() => fn(this.effect()));
  }

  run() {
    return this.effect();
  }
}</code></pre>
          </div>

          <div class="functor-type">
            <h3>Promise</h3>
            <p>处理异步操作(Monad)</p>
            <pre><code>// Promise符合Monad规范
const fetchData = url =>
  fetch(url).then(res => res.json());

fetchData('/api/users')
  .then(users => users[0])
  .then(user => fetchData(`/api/${user.id}`))
  .then(console.log);</code></pre>
          </div>
        </div>
      </section>

      <section class="card practical">
        <h2 class="section-title">实际应用场景</h2>

        <div class="applications">
          <div class="application">
            <div class="app-icon">🛡️</div>
            <div>
              <h3>安全处理空值</h3>
              <p>使用Maybe避免null/undefined错误</p>
              <pre><code>const safeProp = (prop, obj) =>
  Maybe.of(obj[prop]);

const user = { name: 'Alice' };
safeProp('address', user)
  .map(addr => addr.street)
  .map(console.log) // 不会执行
  .orElse(() => console.log('No address'));</code></pre>
            </div>
          </div>

          <div class="application">
            <div class="app-icon">🌉</div>
            <div>
              <h3>错误处理</h3>
              <p>使用Either替代try/catch</p>
              <pre><code>const parseJSON = str => {
  try {
    return Either.of(null, JSON.parse(str));
  } catch (error) {
    return Either.of(error, null);
  }
};

parseJSON('invalid')
  .map(data => data.name)
  .fold(
    error => console.error('Error:', error),
    name => console.log('Name:', name)
  );</code></pre>
            </div>
          </div>

          <div class="application">
            <div class="app-icon">🔄</div>
            <div>
              <h3>异步操作组合</h3>
              <p>使用Promise链式调用</p>
              <pre><code>const getUser = id =>
  fetch(`/users/${id}`).then(res => res.json());

const getPosts = userId =>
  fetch(`/posts?user=${userId}`).then(res => res.json());

getUser(123)
  .then(user => getPosts(user.id))
  .then(posts => processPosts(posts))
  .catch(handleError);</code></pre>
            </div>
          </div>

          <div class="application">
            <div class="app-icon">🧠</div>
            <div>
              <h3>纯函数式状态管理</h3>
              <p>在Redux等库中使用函子概念</p>
              <pre><code>// Redux reducer中的函数式处理
const reducer = (state = initialState, action) =>
  Maybe.of(action)
    .map(a => handlers[a.type])
    .map(handler => handler(state, action))
    .orElse(state);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="card comparison">
        <h2 class="section-title">函子与Monad对比</h2>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>函子(Functor)</th>
                <th>Monad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>核心方法</td>
                <td>map</td>
                <td>chain/flatMap</td>
              </tr>
              <tr>
                <td>嵌套处理</td>
                <td>保持嵌套结构</td>
                <td>自动扁平化嵌套</td>
              </tr>
              <tr>
                <td>使用场景</td>
                <td>简单值转换</td>
                <td>复杂操作序列</td>
              </tr>
              <tr>
                <td>组合能力</td>
                <td>有限组合</td>
                <td>强大组合能力</td>
              </tr>
              <tr>
                <td>常见实现</td>
                <td>Array.map, Maybe</td>
                <td>Promise, IO Monad</td>
              </tr>
              <tr>
                <td>复杂度</td>
                <td>简单</td>
                <td>较高</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="monad-laws">
          <h3>Monad三定律</h3>
          <div class="laws">
            <div class="law">
              <h4>左单位元</h4>
              <p>Monad.of(a).chain(f) ≡ f(a)</p>
            </div>
            <div class="law">
              <h4>右单位元</h4>
              <p>m.chain(Monad.of) ≡ m</p>
            </div>
            <div class="law">
              <h4>结合律</h4>
              <p>m.chain(f).chain(g) ≡ m.chain(x => f(x).chain(g))</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>函子与Monad详解  | 函数式编程核心概念</p>
      <div class="links">
        <a href="#">函数式编程</a> •
        <a href="#">类型系统</a> •
        <a href="#">范畴论</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里不需要逻辑，仅展示概念
</script>

<style lang="less" scoped>

// 颜色定义
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@functor-color: #4cc9f0;
@monad-color: #9d4edd;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #e9ecef;
@success-color: #2ec4b6;
@warning-color: #ff9f1c;
@error-color: #e71d36;

// 基础样式
.functor-monad-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
  background-color: @background-light;
  color: @text-dark;
  line-height: 1.6;

  .header {
    text-align: center;
    padding: 4rem 2rem 3rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;

    .title {
      font-size: 2.8rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, @functor-color, @monad-color);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      z-index: 2;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .subtitle {
      font-size: 1.3rem;
      color: @text-light;
      max-width: 700px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }

    .decoration {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      opacity: 0.05;

      .shape {
        position: absolute;
        border: 2px solid @functor-color;
        border-radius: 8px;
        animation: float 15s infinite linear;

        &:nth-child(1) {
          width: 250px;
          height: 250px;
          top: 20%;
          left: 10%;
          transform: rotate(45deg);
        }

        &:nth-child(2) {
          width: 180px;
          height: 180px;
          top: 50%;
          right: 15%;
          animation-duration: 12s;
          animation-direction: reverse;
          transform: rotate(20deg);
          border-color: @monad-color;
        }

        &:nth-child(3) {
          width: 120px;
          height: 120px;
          bottom: 20%;
          left: 40%;
          animation-duration: 18s;
          transform: rotate(70deg);
          border-color: mix(@functor-color, @monad-color);
        }
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }

  .overview {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
    border: 1px solid fade(@border-color, 50%);
    margin-bottom: 1rem;

    .concept {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      margin-bottom: 1.5rem;

      .concept-box {
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        width: 300px;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);

        h2 {
          margin-top: 0;
          font-size: 1.8rem;
        }

        p {
          margin: 0.5rem 0 1rem;
          color: @text-light;
        }

        .formula {
          font-family: 'Fira Code', monospace;
          background: rgba(0, 0, 0, 0.03);
          padding: 0.8rem;
          border-radius: 8px;
          font-size: 0.95rem;
        }

        &.functor {
          background: linear-gradient(135deg, fade(@functor-color, 10%), white);
          border-top: 4px solid @functor-color;
        }

        &.monad {
          background: linear-gradient(135deg, fade(@monad-color, 10%), white);
          border-top: 4px solid @monad-color;
        }
      }

      .arrow {
        font-size: 2rem;
        color: @text-light;
      }
    }

    .explanation {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  .card {
    background-color: @card-bg;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
    border: 1px solid fade(@border-color, 50%);

    &.functor-card {
      border-top: 4px solid @functor-color;
    }

    &.monad-card {
      border-top: 4px solid @monad-color;
    }
  }

  .section-title {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid fade(@border-color, 50%);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, @primary-color, @secondary-color);
      border-radius: 2px;
    }
  }

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 1.8rem;
  }

  .definition {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: fade(@background-light, 50%);
    border-radius: 8px;
  }

  .properties {
    margin-bottom: 1.5rem;

    h3 {
      margin-top: 0;
      font-size: 1.2rem;
      color: @text-light;
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      align-items: center;
      padding: 1rem;
      margin-bottom: 0.8rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      .icon {
        font-size: 1.8rem;
        margin-right: 1rem;
        min-width: 50px;
        text-align: center;
      }

      h4 {
        margin: 0 0 0.3rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        color: @text-light;
        font-size: 0.95rem;
      }
    }
  }

  .code-example {
    background: #f8f9ff;
    border-radius: 8px;
    overflow: hidden;

    h3 {
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      margin: 0;
      padding: 0.8rem 1.2rem;
      font-size: 1rem;
      font-weight: 500;
    }

    pre {
      margin: 0;
      padding: 1.2rem;
      overflow: auto;

      code {
        font-family: 'Fira Code', 'Courier New', monospace;
        font-size: 0.95rem;
        line-height: 1.5;
        color: #3a3a3a;
        display: block;

        &::selection {
          background: fade(@primary-color, 30%);
        }
      }
    }
  }

  .common-functors {
    .functors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .functor-type {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      border: 1px solid @border-color;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      h3 {
        margin-top: 0;
        font-size: 1.3rem;
        color: @primary-color;
      }

      p {
        color: @text-light;
        margin-bottom: 1rem;
      }

      pre {
        margin: 0;
        padding: 1rem;
        background: #f8f9ff;
        border-radius: 6px;
        overflow: auto;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
        }
      }
    }
  }

  .practical {
    .applications {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .application {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      border: 1px solid @border-color;
      display: flex;
      gap: 1rem;

      .app-icon {
        font-size: 2rem;
        min-width: 50px;
        height: 50px;
        background: linear-gradient(135deg, @functor-color, @monad-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }

      p {
        color: @text-light;
        margin-bottom: 1rem;
      }

      pre {
        margin: 0;
        padding: 1rem;
        background: #f8f9ff;
        border-radius: 6px;
        overflow: auto;
        font-size: 0.85rem;

        code {
          font-family: 'Fira Code', monospace;
        }
      }
    }
  }

  .comparison {
    .comparison-table {
      overflow-x: auto;
      margin-bottom: 2rem;

      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid @border-color;
        }

        th {
          background: fade(@primary-color, 8%);
          color: @primary-color;
          font-weight: 600;
        }

        tr:nth-child(even) {
          background: fade(@background-light, 50%);
        }
      }
    }

    .monad-laws {
      h3 {
        margin-top: 0;
        font-size: 1.3rem;
        color: @monad-color;
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .laws {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }

      .law {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        border-top: 3px solid @monad-color;

        h4 {
          margin-top: 0;
          color: @monad-color;
        }

        p {
          font-family: 'Fira Code', monospace;
          background: #f8f9ff;
          padding: 1rem;
          border-radius: 6px;
          overflow: auto;
          font-size: 0.95rem;
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: @text-light;
    font-size: 0.9rem;
    border-top: 1px solid @border-color;

    .links {
      margin-top: 0.5rem;

      a {
        color: @primary-color;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  // 动画
  @keyframes float {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .functor-monad-container {
    padding: 0 1rem 2rem;

    .header {
      padding: 2.5rem 1rem 2rem;

      .title {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }
    }

    .overview {
      padding: 1.5rem;

      .concept {
        flex-direction: column;
        gap: 1.5rem;

        .concept-box {
          width: 100%;
          padding: 1.5rem;
        }
      }
    }

    .grid-layout {
      grid-template-columns: 1fr;
    }

    .common-functors .functors-grid,
    .practical .applications {
      grid-template-columns: 1fr;
    }

    .card {
      padding: 1.5rem;
    }
  }
}
</style>
