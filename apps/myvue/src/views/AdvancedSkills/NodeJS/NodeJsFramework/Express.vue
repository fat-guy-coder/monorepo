<template>
  <div class="express-container">
    <header class="header">
      <div class="header-content">
        <h1>Express框架介绍</h1>
        <p>Node.js Web应用开发利器</p>
        <a href="https://www.expressjs.com.cn/zh-cn/" target="_blank">Express官网</a>
        <div class="badges">
          <span class="badge badge-node">Node.js</span>
          <span class="badge badge-express">Express</span>
          <span class="badge badge-ts">TypeScript</span>
        </div>
      </div>
      <div class="express-logo">
        <div class="logo-circle">E</div>
      </div>
    </header>

    <div class="card-container">
      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-history"></i>
          <span>Express的来历</span>
        </div>
        <div class="card-body">
          <h3>Node.js的Web框架先驱</h3>

          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-date">2009</div>
              <div class="timeline-content">
                <h4>Node.js诞生</h4>
                <p>Ryan Dahl发布Node.js，为JavaScript服务器端开发奠定基础</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-date">2010</div>
              <div class="timeline-content">
                <h4>Express诞生</h4>
                <p>TJ Holowaychuk创建Express，成为Node.js最早的Web框架之一</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-date">2014</div>
              <div class="timeline-content">
                <h4>Express 4.0发布</h4>
                <p>完全重构，移除内置中间件，更轻量更模块化</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-date">2016至今</div>
              <div class="timeline-content">
                <h4>Node.js生态主导者</h4>
                <p>成为最流行的Node.js Web框架，每周下载量超过2000万</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-cube"></i>
          <span>核心概念</span>
        </div>
        <div class="card-body">
          <h3>Express的四大支柱</h3>

          <div class="concept-grid">
            <div class="concept-item">
              <div class="concept-icon">
                <i class="fas fa-route"></i>
              </div>
              <h4>路由(Routing)</h4>
              <p>定义应用程序如何响应客户端请求，基于HTTP方法和URL路径</p>
            </div>

            <div class="concept-item">
              <div class="concept-icon">
                <i class="fas fa-layer-group"></i>
              </div>
              <h4>中间件(Middleware)</h4>
              <p>处理请求和响应的函数链，可执行任何操作</p>
            </div>

            <div class="concept-item">
              <div class="concept-icon">
                <i class="fas fa-tasks"></i>
              </div>
              <h4>请求处理(Request)</h4>
              <p>req对象包含请求参数、查询字符串、HTTP头等信息</p>
            </div>

            <div class="concept-item">
              <div class="concept-icon">
                <i class="fas fa-reply"></i>
              </div>
              <h4>响应处理(Response)</h4>
              <p>res对象用于发送响应、设置状态码、HTTP头等</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card wide-card">
      <div class="card-header">
        <i class="icon fas fa-code"></i>
        <span>基本用法</span>
      </div>
      <div class="card-body">
        <h3>创建Express应用的4个步骤</h3>

        <div class="usage-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>安装Express</h4>
              <div class="code-block">
                npm install express
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>创建应用实例</h4>
              <div class="code-block">
                <span class="code-keyword">import</span> express <span class="code-keyword">from</span> <span
                  class="code-string">'express'</span>;<br>
                <span class="code-keyword">const</span> app = <span class="code-function">express</span>();
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>定义路由和中间件</h4>
              <div class="code-block">
                <span class="code-comment">// 日志中间件</span><br>
                app.<span class="code-function">use</span>((req, res, next) => {<br>
                &nbsp;&nbsp;console.<span class="code-function">log</span>(<span class="code-string">`<span
                    class="code-expression">${new Date().toISOString()}</span> - <span
                    class="code-expression">${req.method}</span> <span
                    class="code-expression">${req.path}</span>`</span>);<br>
                &nbsp;&nbsp;<span class="code-function">next</span>();<br>
                });<br><br>

                <span class="code-comment">// 定义路由</span><br>
                app.<span class="code-function">get</span>(<span class="code-string">'/'</span>, (req, res) => {<br>
                &nbsp;&nbsp;res.<span class="code-function">send</span>(<span class="code-string">'Hello
                  Express!'</span>);<br>
                });
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>启动服务器</h4>
              <div class="code-block">
                <span class="code-keyword">const</span> PORT = process.env.PORT || 3000;<br>
                app.<span class="code-function">listen</span>(PORT, () => {<br>
                &nbsp;&nbsp;console.<span class="code-function">log</span>(<span class="code-string">`服务器运行在
                  http://localhost:<span class="code-expression">${PORT}</span>`</span>);<br>
                });
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-container">
      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-rocket"></i>
          <span>使用场景</span>
        </div>
        <div class="card-body">
          <h3>Express的典型应用领域</h3>

          <div class="scenario-grid">
            <div class="scenario-item">
              <div class="scenario-icon">
                <i class="fas fa-server"></i>
              </div>
              <h4>RESTful API服务</h4>
              <p>快速构建高性能API服务</p>
            </div>

            <div class="scenario-item">
              <div class="scenario-icon">
                <i class="fas fa-window-restore"></i>
              </div>
              <h4>服务端渲染应用</h4>
              <p>配合模板引擎渲染动态页面</p>
            </div>

            <div class="scenario-item">
              <div class="scenario-icon">
                <i class="fas fa-microscope"></i>
              </div>
              <h4>微服务架构</h4>
              <p>构建轻量级微服务组件</p>
            </div>

            <div class="scenario-item">
              <div class="scenario-icon">
                <i class="fas fa-plug"></i>
              </div>
              <h4>中间件开发</h4>
              <p>创建可复用的中间件组件</p>
            </div>

            <div class="scenario-item">
              <div class="scenario-icon">
                <i class="fas fa-mobile-alt"></i>
              </div>
              <h4>混合移动应用</h4>
              <p>为移动应用提供后端支持</p>
            </div>

            <div class="scenario-item">
              <div class="scenario-icon">
                <i class="fas fa-bolt"></i>
              </div>
              <h4>快速原型开发</h4>
              <p>快速验证产品概念</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-balance-scale"></i>
          <span>优缺点分析</span>
        </div>
        <div class="card-body">
          <h3>Express的优势与局限</h3>

          <div class="pros-cons">
            <div class="pros">
              <h4><i class="fas fa-check-circle"></i> 优势</h4>
              <ul>
                <li>轻量级，学习曲线平缓</li>
                <li>灵活且非强制约束</li>
                <li>强大的中间件生态系统</li>
                <li>高性能，适合高并发场景</li>
                <li>庞大的社区支持</li>
                <li>易于与其他库集成</li>
              </ul>
            </div>

            <div class="cons">
              <h4><i class="fas fa-exclamation-triangle"></i> 局限</h4>
              <ul>
                <li>缺乏内置结构规范</li>
                <li>错误处理需要手动实现</li>
                <li>中间件顺序问题可能引发bug</li>
                <li>随着应用变大可能变得难以维护</li>
                <li>缺少ORM等内置工具</li>
              </ul>
            </div>
          </div>

          <div class="recommendation">
            <h4><i class="fas fa-lightbulb"></i> 使用建议</h4>
            <p>Express非常适合中小型项目、API服务和需要高度定制的场景。对于大型企业应用，可以考虑在其基础上使用NestJS、FeathersJS等框架。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card wide-card">
      <div class="card-header">
        <i class="icon fas fa-puzzle-piece"></i>
        <span>中间件机制</span>
      </div>
      <div class="card-body">
        <h3>Express的核心：中间件设计</h3>

        <div class="middleware-intro">
          <div class="middleware-desc">
            <h4>什么是中间件？</h4>
            <p>中间件是访问请求对象(req)、响应对象(res)和next函数的函数。它可以：</p>
            <ul>
              <li>执行任何代码</li>
              <li>修改请求和响应对象</li>
              <li>结束请求-响应周期</li>
              <li>调用堆栈中的下一个中间件</li>
            </ul>
          </div>

          <div class="middleware-flow">
            <h4>请求处理流程</h4>
            <div class="flow-diagram">
              <div class="flow-item">请求进入</div>
              <div class="flow-arrow">→</div>
              <div class="flow-item">中间件1</div>
              <div class="flow-arrow">→</div>
              <div class="flow-item">中间件2</div>
              <div class="flow-arrow">→</div>
              <div class="flow-item">路由处理</div>
              <div class="flow-arrow">→</div>
              <div class="flow-item">响应返回</div>
            </div>
          </div>
        </div>

        <h3>中间件实现原理（伪代码）</h3>
        <div class="code-block">
          <span class="code-comment">// Express中间件系统核心实现</span><br>
          <span class="code-keyword">class</span> <span class="code-class">Express</span> {<br>
          &nbsp;&nbsp;middlewares = []; <span class="code-comment">// 存储所有中间件</span><br><br>

          &nbsp;&nbsp;<span class="code-comment">// 添加中间件</span><br>
          &nbsp;&nbsp;<span class="code-function">use</span>(middleware) {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">this</span>.middlewares.<span
            class="code-function">push</span>(middleware);<br>
          &nbsp;&nbsp;}<br><br>

          &nbsp;&nbsp;<span class="code-comment">// 处理请求</span><br>
          &nbsp;&nbsp;<span class="code-keyword">async</span> <span class="code-function">handleRequest</span>(req, res)
          {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">let</span> index = 0;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">const</span> <span class="code-function">next</span> =
          <span class="code-keyword">async</span> () => {<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">if</span> (index >= <span
            class="code-keyword">this</span>.middlewares.length) <span class="code-keyword">return</span>;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">const</span> middleware = <span
            class="code-keyword">this</span>.middlewares[index++];<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">await</span> <span
            class="code-function">middleware</span>(req, res, next);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;};<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">await</span> <span class="code-function">next</span>();<br>
          &nbsp;&nbsp;}<br>
          }
        </div>

        <h3>常用中间件示例</h3>
        <div class="middleware-examples">
          <div class="example">
            <h4>日志记录中间件</h4>
            <div class="code-block">
              <span class="code-keyword">const</span> <span class="code-function">logger</span> = (req, res, next) =>
              {<br>
              &nbsp;&nbsp;console.<span class="code-function">log</span>(<span class="code-string">`<span
                  class="code-expression">${new Date().toISOString()}</span> - <span
                  class="code-expression">${req.method}</span> <span
                  class="code-expression">${req.originalUrl}</span>`</span>);<br>
              &nbsp;&nbsp;<span class="code-function">next</span>(); <span class="code-comment">// 传递控制权</span><br>
              };<br><br>

              app.<span class="code-function">use</span>(<span class="code-function">logger</span>);
            </div>
          </div>

          <div class="example">
            <h4>认证中间件</h4>
            <div class="code-block">
              <span class="code-keyword">const</span> <span class="code-function">authenticate</span> = (req, res, next)
              => {<br>
              &nbsp;&nbsp;<span class="code-keyword">const</span> token = req.headers.<span
                class="code-property">authorization</span>;<br>
              &nbsp;&nbsp;<span class="code-keyword">if</span> (!token) {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">return</span> res.<span
                class="code-function">status</span>(401).<span class="code-function">json</span>({ error: <span
                class="code-string">'未授权'</span> });<br>
              &nbsp;&nbsp;}<br>
              &nbsp;&nbsp;<br>
              &nbsp;&nbsp;<span class="code-comment">// 验证token逻辑...</span><br>
              &nbsp;&nbsp;<span class="code-keyword">if</span> (<span class="code-function">isValidToken</span>(token))
              {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-function">next</span>(); <span class="code-comment">//
                验证通过</span><br>
              &nbsp;&nbsp;} <span class="code-keyword">else</span> {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;res.<span class="code-function">status</span>(403).<span
                class="code-function">json</span>({ error: <span class="code-string">'禁止访问'</span> });<br>
              &nbsp;&nbsp;}<br>
              };<br><br>

              app.<span class="code-function">get</span>(<span class="code-string">'/profile'</span>, <span
                class="code-function">authenticate</span>, (req, res) => {<br>
              &nbsp;&nbsp;<span class="code-comment">// 处理认证后的请求</span><br>
              });
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <p>© 2023 Express框架基础介绍 | Node.js Web应用开发利器</p>
        <p>本页面使用Vue3、TypeScript、Setup语法、LESS和Scoped样式构建</p>
      </div>
      <div class="express-stats">
        <div class="stat-item">
          <i class="fas fa-download"></i>
          <span>每周下载量: 2000万+</span>
        </div>
        <div class="stat-item">
          <i class="fas fa-star"></i>
          <span>GitHub星标: 60k+</span>
        </div>
        <div class="stat-item">
          <i class="fas fa-calendar"></i>
          <span>最新版本: 4.18.2</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 此组件为静态展示组件，无需响应式数据
// 这里仅为了展示setup语法和TypeScript的使用
const expressVersion = ref('4.18.2');
const nodeVersion = ref('18.16.0');
</script>

<style lang="less" scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.express-container {
  max-width: 1200px;
  margin: 0 auto;


  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #2c3e50;
  min-height: 100vh;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    margin-bottom: 30px;
    border-bottom: 2px solid #68a063;

    .header-content {
      h1 {
        font-size: 2.5rem;
        color: #2b8a3e;
        margin-bottom: 10px;
      }

      p {
        font-size: 1.2rem;
        color: #495057;
        max-width: 600px;
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
        margin-right: 10px;
      }

      .badge-node {
        background: #68a063;
        color: white;
      }

      .badge-express {
        background: #2b8a3e;
        color: white;
      }

      .badge-ts {
        background: #3178c6;
        color: white;
      }
    }

    .express-logo {
      .logo-circle {
        width: 100px;
        height: 100px;
        background: #2b8a3e;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(43, 138, 62, 0.3);
      }
    }
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;
    margin-bottom: 30px;
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

    &.wide-card {
      grid-column: 1 / -1;
    }
  }

  .card-header {
    background: #2b8a3e;
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
      color: #2b8a3e;
      margin-bottom: 20px;
      font-size: 1.5rem;
      padding-bottom: 10px;
      border-bottom: 1px solid #e9ecef;
    }

    h4 {
      color: #2b8a3e;
      margin: 15px 0 10px;
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
        color: #2b8a3e;
        font-weight: bold;
        position: absolute;
        left: -15px;
      }
    }
  }

  .timeline {
    position: relative;
    margin: 20px 0;

    &::before {
      content: '';
      position: absolute;
      left: 15px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #2b8a3e;
    }

    .timeline-item {
      position: relative;
      padding-left: 40px;
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 0;
      }

      .timeline-date {
        position: absolute;
        left: 0;
        top: 0;
        width: 32px;
        height: 32px;
        background: #2b8a3e;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        z-index: 1;
      }

      .timeline-content {
        background: #f1f8f1;
        border-radius: 8px;
        padding: 15px;
        border-left: 3px solid #2b8a3e;

        h4 {
          margin-top: 0;
          color: #2b8a3e;
        }
      }
    }
  }

  .concept-grid,
  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }

  .concept-item,
  .scenario-item {
    text-align: center;
    padding: 20px 15px;
    border-radius: 8px;
    background: #f1f8f1;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      background: #e6f3e6;
    }

    .concept-icon,
    .scenario-icon {
      width: 60px;
      height: 60px;
      background: #2b8a3e;
      color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto 15px;
      font-size: 1.5rem;
    }

    h4 {
      margin: 10px 0;
      color: #2b8a3e;
    }

    p {
      font-size: 0.95rem;
      color: #495057;
    }
  }

  .usage-steps {
    .step {
      display: flex;
      margin-bottom: 25px;
      align-items: flex-start;

      .step-number {
        min-width: 40px;
        height: 40px;
        background: #2b8a3e;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 15px;
      }

      .step-content {
        flex: 1;

        h4 {
          margin-top: 5px;
          margin-bottom: 10px;
          color: #2b8a3e;
        }
      }
    }
  }

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;

    .pros,
    .cons {
      padding: 15px;
      border-radius: 8px;

      h4 {
        display: flex;
        align-items: center;
        margin-top: 0;

        i {
          margin-right: 10px;
        }
      }
    }

    .pros {
      background: #f1f8f1;
      border-left: 4px solid #2b8a3e;
    }

    .cons {
      background: #fff8f1;
      border-left: 4px solid #e67700;
    }
  }

  .recommendation {
    background: #e6f3ff;
    border-left: 4px solid #1971c2;
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;

    h4 {
      display: flex;
      align-items: center;
      margin-top: 0;

      i {
        margin-right: 10px;
        color: #1971c2;
      }
    }
  }

  .middleware-intro {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin: 20px 0;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .flow-diagram {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;

    .flow-item {
      background: #2b8a3e;
      color: white;
      padding: 10px 15px;
      border-radius: 8px;
      text-align: center;
      flex: 1;
      margin: 0 5px;
    }

    .flow-arrow {
      font-size: 1.5rem;
      color: #2b8a3e;
    }
  }

  .middleware-examples {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .example {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;

      h4 {
        margin-top: 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #e9ecef;
      }
    }
  }

  .code-block {
    background: #2c3e50;
    color: #e9ecef;
    border-radius: 8px;
    padding: 20px;
    margin: 15px 0;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 0.95rem;
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

  .code-function {
    color: #ffd43b;
  }

  .code-class {
    color: #e599f7;
  }

  .code-property {
    color: #74c0fc;
  }

  .code-expression {
    color: #ffa94d;
  }

  .footer {
    background: #2c3e50;
    color: white;
    border-radius: 12px;
    padding: 25px;
    margin-top: 40px;

    .footer-content {
      text-align: center;
      margin-bottom: 20px;

      p {
        margin: 5px 0;
      }
    }

    .express-stats {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;

      .stat-item {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.1);
        padding: 8px 15px;
        border-radius: 20px;
      }
    }
  }

  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      text-align: center;

      .express-logo {
        margin-top: 20px;
      }
    }

    .card-container {
      grid-template-columns: 1fr;
    }

    .pros-cons {
      grid-template-columns: 1fr;
    }
  }
}
</style>
