<template>
  <div class="isomorphic-container">
    <header class="isomorphic-header">
      <h1>前端同构技术基础介绍</h1>
      <p class="subtitle">统一服务端渲染与客户端渲染的最佳实践</p>
      <div class="render-diagram">
        <div class="server-render">
          <div class="server-icon">🖥️</div>
          <div class="render-process">
            <div class="step">请求</div>
            <div class="arrow">➡️</div>
            <div class="step">服务端渲染</div>
            <div class="arrow">➡️</div>
            <div class="step">完整HTML</div>
          </div>
        </div>
        <div class="client-render">
          <div class="client-icon">💻</div>
          <div class="render-process">
            <div class="step">基本HTML</div>
            <div class="arrow">➡️</div>
            <div class="step">客户端渲染</div>
            <div class="arrow">➡️</div>
            <div class="step">交互式应用</div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📚</span>
          什么是同构应用？
        </h2>
        <div class="definition">
          <p>同构应用（Isomorphic Application）是指<strong>同一套代码</strong>可以同时在<strong>服务端</strong>和<strong>客户端</strong>运行的应用架构。
          </p>

          <div class="comparison">
            <div class="method">
              <h3>传统服务端渲染 (SSR)</h3>
              <ul>
                <li>服务器生成完整HTML</li>
                <li>客户端接收静态页面</li>
                <li>交互能力有限</li>
              </ul>
            </div>

            <div class="method">
              <h3>客户端渲染 (CSR)</h3>
              <ul>
                <li>服务器返回空HTML框架</li>
                <li>浏览器下载JS后渲染</li>
                <li>首屏加载慢</li>
              </ul>
            </div>

            <div class="method highlight">
              <h3>同构渲染 (Isomorphic)</h3>
              <ul>
                <li>服务端生成首屏HTML</li>
                <li>客户端接管后续渲染</li>
                <li>兼具SSR和CSR优势</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">⚙️</span>
          同构实现原理
        </h2>
        <div class="implementation">
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>服务端渲染首屏</h3>
                <p>用户首次请求时，Node.js服务器执行React/Vue代码生成完整HTML</p>
                <pre class="code-block">// Express服务器示例
app.get('*', (req, res) => {
  const appContent = ReactDOMServer.renderToString(&lt;App /&gt;);

  const html = `
    &lt;html&gt;
      &lt;head&gt;&lt;title&gt;同构应用&lt;/title&gt;&lt;/head&gt;
      &lt;body&gt;
        &lt;div id="root"&gt;${appContent}&lt;/div&gt;
        &lt;script src="/client.bundle.js"&gt;&lt;/script&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  `;

  res.send(html);
});</pre>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>客户端接管</h3>
                <p>浏览器接收到HTML后，下载JS包并"激活"静态页面</p>
                <pre class="code-block">// 客户端入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 在相同的DOM节点上调用hydrate
ReactDOM.hydrate(&lt;App /&gt;, document.getElementById('root'));</pre>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>后续交互</h3>
                <p>后续路由切换和交互完全由客户端处理，无需服务器参与</p>
                <pre class="code-block">// 使用React Router实现同构路由
&lt;BrowserRouter&gt;
  &lt;Routes&gt;
    &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
    &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
  &lt;/Routes&gt;
&lt;/BrowserRouter&gt;</pre>
              </div>
            </div>
          </div>

          <div class="key-points">
            <h3>关键技术点</h3>
            <div class="points-grid">
              <div class="point">
                <div class="point-icon">📦</div>
                <h4>代码共享</h4>
                <p>组件、路由、状态管理在服务端和客户端复用</p>
              </div>
              <div class="point">
                <div class="point-icon">🔄</div>
                <h4>数据预取</h4>
                <p>服务端获取数据并注入HTML，避免客户端二次请求</p>
              </div>
              <div class="point">
                <div class="point-icon">🚦</div>
                <h4>状态同步</h4>
                <p>将服务端Redux/Vuex状态同步到客户端</p>
              </div>
              <div class="point">
                <div class="point-icon">⚡</div>
                <h4>构建配置</h4>
                <p>Webpack分别打包服务端和客户端代码</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📱</span>
          使用场景
        </h2>
        <div class="use-cases">
          <div class="use-case">
            <h3>内容密集型网站</h3>
            <p>新闻、博客、电商等需要SEO优化的网站</p>
            <div class="example">
              <span class="tech">新闻门户</span>
              <span class="tech">电子商务</span>
            </div>
          </div>
          <div class="use-case">
            <h3>社交媒体应用</h3>
            <p>需要快速首屏加载和良好SEO的社交平台</p>
            <div class="example">
              <span class="tech">微博</span>
              <span class="tech">论坛</span>
            </div>
          </div>
          <div class="use-case">
            <h3>企业级应用</h3>
            <p>需要良好SEO和复杂交互的内部系统</p>
            <div class="example">
              <span class="tech">CRM系统</span>
              <span class="tech">管理后台</span>
            </div>
          </div>
          <div class="use-case">
            <h3>渐进式Web应用</h3>
            <p>需要快速加载和离线功能的PWA应用</p>
            <div class="example">
              <span class="tech">PWA应用</span>
              <span class="tech">离线应用</span>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">⚖️</span>
          优缺点分析
        </h2>
        <div class="pros-cons">
          <div class="pros">
            <h3>优点</h3>
            <div class="advantages">
              <div class="advantage">
                <div class="icon">🔍</div>
                <div>
                  <h4>SEO友好</h4>
                  <p>搜索引擎可以抓取服务端渲染的内容</p>
                </div>
              </div>
              <div class="advantage">
                <div class="icon">⚡</div>
                <div>
                  <h4>首屏性能优化</h4>
                  <p>用户立即看到内容，无需等待JS加载</p>
                </div>
              </div>
              <div class="advantage">
                <div class="icon">📱</div>
                <div>
                  <h4>更好的移动端体验</h4>
                  <p>在低性能设备上也能快速展示内容</p>
                </div>
              </div>
              <div class="advantage">
                <div class="icon">♻️</div>
                <div>
                  <h4>代码复用</h4>
                  <p>服务端和客户端共享相同代码逻辑</p>
                </div>
              </div>
            </div>
          </div>

          <div class="cons">
            <h3>挑战与缺点</h3>
            <div class="disadvantages">
              <div class="disadvantage">
                <div class="icon">🚧</div>
                <div>
                  <h4>架构复杂度高</h4>
                  <p>需要处理服务端和客户端的环境差异</p>
                </div>
              </div>
              <div class="disadvantage">
                <div class="icon">⏱️</div>
                <div>
                  <h4>服务端压力</h4>
                  <p>每个请求都需要服务器渲染，增加负载</p>
                </div>
              </div>
              <div class="disadvantage">
                <div class="icon">💧</div>
                <div>
                  <h4>内存消耗大</h4>
                  <p>Node.js服务器需要为每个请求创建新的V8实例</p>
                </div>
              </div>
              <div class="disadvantage">
                <div class="icon">🐛</div>
                <div>
                  <h4>调试困难</h4>
                  <p>需要同时调试服务端和客户端代码</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          同构框架推荐
        </h2>
        <div class="frameworks">
          <div class="framework">
            <div class="logo next">Next</div>
            <h3>Next.js (React)</h3>
            <ul>
              <li>零配置服务端渲染</li>
              <li>自动代码分割</li>
              <li>静态站点生成</li>
            </ul>
          </div>
          <div class="framework">
            <div class="logo nuxt">Nuxt</div>
            <h3>Nuxt.js (Vue)</h3>
            <ul>
              <li>模块化架构</li>
              <li>自动路由生成</li>
              <li>强大的插件系统</li>
            </ul>
          </div>
          <div class="framework">
            <div class="logo nest">Nest</div>
            <h3>NestJS (Angular)</h3>
            <ul>
              <li>渐进式框架</li>
              <li>内置TypeScript支持</li>
              <li>模块化架构</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📈</span>
          何时选择同构架构？
        </h2>
        <div class="decision-tree">
          <div class="question">你的应用需要SEO优化吗？</div>
          <div class="branch">
            <div class="yes">是</div>
            <div class="arrow">➡️</div>
            <div class="question">首屏加载速度重要吗？</div>
          </div>
          <div class="branch">
            <div class="no">否</div>
            <div class="arrow">➡️</div>
            <div class="question">是内容密集型应用吗？</div>
          </div>
          <div class="conclusion">
            <div class="arrow">➡️</div>
            <div class="result">✅ 推荐同构架构</div>
            <div class="or">或</div>
            <div class="result">❌ 客户端渲染可能更合适</div>
          </div>
          <div class="recommendation">
            <p><strong>推荐使用同构架构：</strong></p>
            <ul>
              <li>需要SEO优化的公开网站</li>
              <li>首屏性能至关重要的应用</li>
              <li>内容密集型应用（新闻、博客、电商）</li>
            </ul>
            <p><strong>推荐客户端渲染：</strong></p>
            <ul>
              <li>需要丰富交互的后台管理系统</li>
              <li>不需要SEO的Web应用</li>
              <li>对服务器资源敏感的项目</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <footer class="isomorphic-footer">
      <p>同构架构是现代Web应用开发的重要模式，它结合了服务端渲染和客户端渲染的优势</p>
      <div class="conclusion">在适当的场景下使用同构技术，可以显著提升用户体验和应用性能</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑可以在这里添加
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@background-color: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@light-text: #7f8c8d;
@border-color: #e0e0e0;
@highlight-color: #e3f2fd;
@pros-color: #e8f5e9;
@cons-color: #ffebee;
@next-color: #000000;
@nuxt-color: #00c58e;
@nest-color: #e0234e;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.isomorphic-container {
  font-family: 'Inter', sans-serif;
  background-color: @background-color;
  color: @text-color;
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
}

.isomorphic-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
    max-width: 600px;
    margin: 0 auto 30px;
  }

  .render-diagram {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 30px;

    .server-render,
    .client-render {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      flex: 1;
      min-width: 300px;

      .server-icon,
      .client-icon {
        font-size: 3rem;
        text-align: center;
        margin-bottom: 15px;
      }

      .render-process {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .step {
          background: @highlight-color;
          padding: 10px 15px;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          flex: 1;
          margin: 0 5px;
        }

        .arrow {
          padding: 0 10px;
        }
      }
    }
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.info-card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: @text-color;
  font-weight: 600;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
  }
}

// 定义部分
.definition {
  p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    line-height: 1.8;
  }
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;

  .method {
    background: white;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 20px;
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: #e0e0e0;
    }

    &.highlight {
      border: 2px solid @primary-color;
      transform: scale(1.02);

      &:before {
        background: @primary-color;
      }

      h3 {
        color: @primary-color;
      }
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      font-weight: 600;
    }

    ul {
      list-style-type: none;

      li {
        padding: 8px 0;
        position: relative;
        padding-left: 25px;

        &:before {
          content: '•';
          position: absolute;
          left: 10px;
          color: @primary-color;
          font-size: 1.2rem;
        }
      }
    }
  }
}

// 实现步骤
.steps {
  display: flex;
  flex-direction: column;
  gap: 25px;

  .step {
    display: flex;
    gap: 20px;
    align-items: flex-start;

    .step-number {
      min-width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-weight: 700;
      flex-shrink: 0;
      margin-top: 5px;
    }

    .step-content {
      flex: 1;

      h3 {
        font-size: 1.3rem;
        margin-bottom: 10px;
        color: @text-color;
      }

      p {
        margin-bottom: 15px;
        color: @light-text;
      }
    }
  }
}

// 代码块
.code-block {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 15px 0;
  border: 1px solid #e1e4e8;
}

// 关键点
.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 25px;

  .point {
    text-align: center;
    padding: 20px;
    background: #eaf7ff;
    border-radius: 8px;

    .point-icon {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }

    h4 {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: @primary-color;
    }

    p {
      color: @light-text;
      font-size: 0.9rem;
    }
  }
}

// 使用场景
.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;

  .use-case {
    padding: 20px;
    background: white;
    border-radius: 8px;
    border-left: 4px solid @primary-color;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: @primary-color;
    }

    p {
      color: @light-text;
      margin-bottom: 15px;
      font-size: 0.95rem;
    }

    .example {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;

      .tech {
        background: #e3f2fd;
        color: @primary-color;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
      }
    }
  }
}

// 优缺点
.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .pros,
  .cons {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #eaeaea;
    }
  }

  .pros {
    h3 {
      color: @secondary-color;
    }

    .advantages {
      background: @pros-color;
      border-radius: 8px;
      padding: 15px;
    }
  }

  .cons {
    h3 {
      color: #e74c3c;
    }

    .disadvantages {
      background: @cons-color;
      border-radius: 8px;
      padding: 15px;
    }
  }

  .advantage,
  .disadvantage {
    display: flex;
    gap: 15px;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 6px;

    .icon {
      font-size: 1.8rem;
      flex-shrink: 0;
    }

    h4 {
      font-size: 1.2rem;
      margin-bottom: 5px;
    }

    p {
      color: @light-text;
      font-size: 0.95rem;
    }
  }
}

// 框架推荐
.frameworks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  .framework {
    text-align: center;
    padding: 25px 20px;
    background: white;
    border-radius: 8px;
    border-top: 4px solid @primary-color;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    .logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      font-weight: 700;
      color: white;
      font-size: 1.2rem;

      &.next {
        background: @next-color;
      }

      &.nuxt {
        background: @nuxt-color;
      }

      &.nest {
        background: @nest-color;
      }
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      color: @text-color;
    }

    ul {
      list-style-type: none;
      text-align: left;
      padding: 0 20px;

      li {
        padding: 8px 0;
        position: relative;
        padding-left: 25px;

        &:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: @secondary-color;
          font-weight: bold;
        }
      }
    }
  }
}

// 决策树
.decision-tree {
  background: #f9fbfd;
  border-radius: 12px;
  padding: 25px;

  .question {
    background: @primary-color;
    color: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    font-weight: 600;
    margin: 15px 0;
  }

  .branch {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 0;

    .yes,
    .no {
      padding: 8px 20px;
      border-radius: 20px;
      font-weight: 500;
    }

    .yes {
      background: @secondary-color;
      color: white;
    }

    .no {
      background: #e74c3c;
      color: white;
    }

    .arrow {
      margin: 0 15px;
    }
  }

  .conclusion {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    flex-wrap: wrap;

    .result {
      padding: 15px 25px;
      border-radius: 8px;
      font-weight: 700;
      margin: 0 10px;
    }

    .or {
      margin: 0 15px;
      font-weight: 500;
    }
  }

  .recommendation {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;

    p {
      margin: 15px 0;
      font-weight: 500;

      strong {
        color: @primary-color;
      }
    }

    ul {
      padding-left: 25px;
      margin-bottom: 15px;

      li {
        padding: 5px 0;
      }
    }
  }
}

.isomorphic-footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 30px;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-size: 1rem;

  .conclusion {
    margin-top: 15px;
    font-size: 1.2rem;
    font-weight: 600;
    color: @primary-color;
    max-width: 800px;
    margin: 20px auto 0;
    padding: 15px;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 8px;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .isomorphic-header h1 {
    font-size: 2.2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .render-diagram {
    flex-direction: column;

    .server-render,
    .client-render {
      width: 100%;
    }
  }

  .steps .step {
    flex-direction: column;
  }

  .pros-cons {
    grid-template-columns: 1fr;
  }
}
</style>
