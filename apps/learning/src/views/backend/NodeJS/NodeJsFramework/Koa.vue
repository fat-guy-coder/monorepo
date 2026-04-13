<template>
  <div class="koa-guide">
    <!-- 头部介绍 -->
    <header class="header">
      <div class="header-content">
        <div class="logo-container">
          <div class="logo">K</div>
        </div>
        <div class="title-container">
          <h1>Koa.js</h1>
          <p class="subtitle">下一代Node.js Web框架</p>
          <a href="https://www.koajs.net/" target="_blank">Koa官网</a>
        </div>
      </div>
      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">34K+</div>
          <div class="stat-label">GitHub Stars</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">1M+</div>
          <div class="stat-label">周下载量</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">600</div>
          <div class="stat-label">核心代码行数</div>
        </div>
      </div>
    </header>

    <main class="content">
      <!-- 起源与发展 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">📅</span> Koa的起源与发展</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-year">2013</div>
              <div class="timeline-content">
                <h3>诞生背景</h3>
                <p>由Express.js原班团队设计推出，由TJ Holowaychuk创建，旨在解决Express框架的局限性。</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2015</div>
              <div class="timeline-content">
                <h3>转交维护</h3>
                <p>随着TJ离开Node.js社区，Koa转交给新的维护团队继续开发。</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2017</div>
              <div class="timeline-content">
                <h3>全面转向async/await</h3>
                <p>Koa 2.x版本完全拥抱ES2017的async/await特性，放弃Generator函数。</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">至今</div>
              <div class="timeline-content">
                <h3>现代Web框架</h3>
                <p>成为轻量级、高性能API服务的首选框架，被阿里巴巴、百度等大型企业采用。</p>
              </div>
            </div>
          </div>

          <div class="philosophy">
            <div class="quote">"Koa旨在为Web应用和API提供更小、更富表现力、更健壮的基础"</div>
            <div class="author">— Koa官方文档</div>
          </div>
        </div>
      </section>

      <!-- 核心概念 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🧠</span> 核心概念</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="concepts-grid">
            <div class="concept-card">
              <div class="concept-icon">🔄</div>
              <h3>洋葱模型</h3>
              <p>中间件按顺序执行，请求像穿透洋葱一样从外向内流动，响应则从内向外返回。</p>
              <div class="onion-diagram">
                <div class="layer">请求</div>
                <div class="layer">中间件1 ↓</div>
                <div class="layer">中间件2 ↓</div>
                <div class="layer core">核心处理</div>
                <div class="layer">中间件2 ↑</div>
                <div class="layer">中间件1 ↑</div>
                <div class="layer">响应</div>
              </div>
            </div>

            <div class="concept-card">
              <div class="concept-icon">📦</div>
              <h3>上下文对象(Context)</h3>
              <p>将Node的request和response对象封装到单个Context对象中，提供统一API。</p>
              <div class="code-snippet">
                <pre>ctx.method   // 请求方法
ctx.url     // 请求URL
ctx.body    // 响应体
ctx.status  // 状态码</pre>
              </div>
            </div>

            <div class="concept-card">
              <div class="concept-icon">🧩</div>
              <h3>中间件(Middleware)</h3>
              <p>Koa应用由一系列中间件组成，每个中间件是一个异步函数。</p>
              <div class="code-snippet">
                <pre>app.use(async (ctx, next) => {
  // 请求处理前
  await next(); // 调用下一个中间件
  // 请求处理后
});</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用指南 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🛠️</span> 快速上手</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>安装与创建应用</h3>
                <div class="code-block">
                  <div class="code-header">bash</div>
                  <pre>npm install koa</pre>
                </div>
                <div class="code-block">
                  <div class="code-header">JavaScript</div>
                  <pre>const Koa = require('koa');
const app = new Koa();

// 响应处理
app.use(async ctx => {
  ctx.body = 'Hello Koa';
});

// 启动服务器
app.listen(3000);</pre>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>添加常用中间件</h3>
                <div class="code-block">
                  <div class="code-header">bash</div>
                  <pre>npm install koa-router koa-bodyparser</pre>
                </div>
                <div class="code-block">
                  <div class="code-header">JavaScript</div>
                  <pre>const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = new Router();

router.get('/api/users', async (ctx) => {
  ctx.body = await User.find();
});

router.post('/api/users', async (ctx) => {
  const newUser = ctx.request.body;
  ctx.body = await User.create(newUser);
});

app.use(bodyParser());
app.use(router.routes());</pre>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>错误处理</h3>
                <div class="code-block">
                  <div class="code-header">JavaScript</div>
                  <pre>// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
  }
});

// 业务代码中抛出错误
router.get('/api/users/:id', async (ctx) => {
  const user = await User.findById(ctx.params.id);
  if (!user) ctx.throw(404, '用户不存在');
  ctx.body = user;
});</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🚀</span> 使用场景</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="use-cases">
            <div class="use-case">
              <div class="case-icon">🌐</div>
              <h3>RESTful API 服务</h3>
              <p>构建高性能、轻量级的API后端服务</p>
              <ul>
                <li>简洁的API设计</li>
                <li>高效的请求处理管道</li>
                <li>灵活的路由配置</li>
              </ul>
            </div>

            <div class="use-case">
              <div class="case-icon">📱</div>
              <h3>单页应用后端</h3>
              <p>为Vue/React/Angular应用提供数据接口</p>
              <ul>
                <li>提供API端点</li>
                <li>静态文件服务</li>
                <li>服务器端渲染支持</li>
              </ul>
            </div>

            <div class="use-case">
              <div class="case-icon">⚙️</div>
              <h3>微服务架构</h3>
              <p>构建轻量级、独立的微服务</p>
              <ul>
                <li>低资源占用</li>
                <li>快速启动</li>
                <li>独立部署</li>
              </ul>
            </div>

            <div class="use-case">
              <div class="case-icon">🧩</div>
              <h3>中间件开发</h3>
              <p>创建可复用的中间件组件</p>
              <ul>
                <li>认证授权</li>
                <li>日志记录</li>
                <li>请求处理</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">⚖️</span> 优缺点分析</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="pros-cons">
            <div class="pros">
              <h3>✅ 优点</h3>
              <ul>
                <li>
                  <strong>轻量级</strong>
                  <p>核心代码仅约600行，无捆绑中间件</p>
                </li>
                <li>
                  <strong>高性能</strong>
                  <p>基准测试中优于Express等传统框架</p>
                </li>
                <li>
                  <strong>现代异步处理</strong>
                  <p>原生支持async/await，无回调地狱</p>
                </li>
                <li>
                  <strong>洋葱模型</strong>
                  <p>强大的中间件控制流程</p>
                </li>
                <li>
                  <strong>卓越的错误处理</strong>
                  <p>try/catch完美捕获异步错误</p>
                </li>
              </ul>
            </div>

            <div class="cons">
              <h3>❌ 缺点</h3>
              <ul>
                <li>
                  <strong>学习曲线</strong>
                  <p>需要理解洋葱模型和async/await</p>
                </li>
                <li>
                  <strong>生态系统</strong>
                  <p>中间件数量少于Express</p>
                </li>
                <li>
                  <strong>无内置功能</strong>
                  <p>路由等常用功能需额外安装</p>
                </li>
                <li>
                  <strong>迁移成本</strong>
                  <p>从Express迁移需要重构代码</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="comparison">
            <h3>Koa vs Express 对比</h3>
            <div class="comparison-table">
              <div class="table-row header">
                <div>特性</div>
                <div>Koa</div>
                <div>Express</div>
              </div>
              <div class="table-row">
                <div>中间件模型</div>
                <div>洋葱模型</div>
                <div>线性模型</div>
              </div>
              <div class="table-row">
                <div>异步处理</div>
                <div>async/await</div>
                <div>回调函数</div>
              </div>
              <div class="table-row">
                <div>错误处理</div>
                <div>try/catch</div>
                <div>错误中间件</div>
              </div>
              <div class="table-row">
                <div>路由功能</div>
                <div>需要额外安装</div>
                <div>内置支持</div>
              </div>
              <div class="table-row">
                <div>体积</div>
                <div>约600行</div>
                <div>约1,800行</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🎯</span> 总结</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="conclusion">
            <div class="conclusion-content">
              <p>Koa.js作为现代Node.js框架的代表，提供了轻量、高性能的基础架构，特别适合构建API服务和微服务。</p>

              <div class="recommendation">
                <h3>选择Koa当：</h3>
                <ul>
                  <li>需要更现代的异步处理</li>
                  <li>构建轻量级API服务</li>
                  <li>需要更好的错误处理机制</li>
                  <li>项目需要高度定制化</li>
                </ul>
              </div>

              <div class="resources">
                <h3>学习资源</h3>
                <ul>
                  <li>官方文档：<a href="https://koajs.com/" target="_blank">koajs.com</a></li>
                  <li>GitHub仓库：<a href="https://github.com/koajs/koa" target="_blank">koajs/koa</a></li>
                  <li>Koa中间件列表：<a href="https://github.com/koajs/koa/wiki" target="_blank">Koa Wiki</a></li>
                </ul>
              </div>
            </div>

            <div class="conclusion-image">
              <div class="tech-logos">
                <div class="logo-item">Node.js</div>
                <div class="logo-item">JavaScript</div>
                <div class="logo-item">TypeScript</div>
                <div class="logo-item">RESTful API</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p> Koa.js框架指南 | 轻量高效的Node.js Web框架</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 简单的状态管理示例
const stats = ref([
  { id: 1, label: 'GitHub Stars', value: '34K+' },
  { id: 2, label: '周下载量', value: '1M+' },
  { id: 3, label: '核心代码行数', value: '600' }
])

onMounted(() => {
  console.log('Koa组件已挂载')
})
</script>

<style lang="less" scoped>
@primary: #42b983;
@secondary: #35495e;
@accent: #3b8070;
@light-bg: #f8f9fa;
@border: #e1e4e8;
@text: #2c3e50;
@code-bg: #f5f7fa;

.koa-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: @text;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  margin-bottom: 40px;
  color: white;
  padding: 30px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '() => {}';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 4rem;
    opacity: 0.05;
    font-family: monospace;
  }

  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .logo-container {
      margin-right: 20px;

      .logo {
        width: 80px;
        height: 80px;
        background: #42b983;
        color: #16213e;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        font-weight: 800;
        box-shadow: 0 5px 15px rgba(66, 185, 131, 0.3);
      }
    }

    .title-container {
      h1 {
        font-size: 2.8rem;
        margin: 0 0 10px 0;
        font-weight: 700;
      }

      .subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        margin: 0;
      }
    }
  }

  .stats {
    display: flex;
    justify-content: space-around;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;

    .stat-item {
      text-align: center;
      flex: 1;

      .stat-value {
        font-size: 2.2rem;
        font-weight: 700;
        color: #42b983;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.95rem;
        opacity: 0.8;
      }
    }
  }
}

.section {
  margin-bottom: 50px;
  background: @light-bg;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  .section-header {
    margin-bottom: 30px;

    h2 {
      font-size: 1.8rem;
      margin: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 15px;
        font-size: 1.5rem;
      }
    }

    .divider {
      height: 3px;
      width: 80px;
      background: @primary;
      margin-top: 15px;
      border-radius: 3px;
    }
  }
}

.timeline {
  position: relative;
  padding-left: 30px;
  margin-bottom: 40px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: @primary;
    border-radius: 3px;
  }

  .timeline-item {
    position: relative;
    margin-bottom: 30px;
    padding-left: 30px;

    &::before {
      content: '';
      position: absolute;
      left: -9px;
      top: 8px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: @primary;
      border: 3px solid white;
      box-shadow: 0 0 0 3px @primary;
    }

    .timeline-year {
      position: absolute;
      left: -80px;
      top: 0;
      background: @primary;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-weight: 600;
    }

    .timeline-content {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

      h3 {
        margin-top: 0;
        color: @secondary;
        font-size: 1.3rem;
      }

      p {
        margin-bottom: 0;
      }
    }
  }
}

.philosophy {
  background: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .quote {
    font-size: 1.3rem;
    font-style: italic;
    margin-bottom: 15px;
    position: relative;

    &::before,
    &::after {
      content: '"';
      font-size: 3rem;
      opacity: 0.2;
      position: absolute;
      color: @primary;
    }

    &::before {
      top: -20px;
      left: -20px;
    }

    &::after {
      bottom: -40px;
      right: -20px;
    }
  }

  .author {
    font-weight: 600;
    color: @primary;
  }
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @primary;
  }

  p {
    margin-bottom: 20px;
  }
}

.onion-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0;

  .layer {
    width: 80%;
    text-align: center;
    padding: 12px;
    margin: 5px 0;
    background: #edf7ff;
    border: 1px solid #c5e4ff;
    border-radius: 8px;
    font-weight: 500;

    &.core {
      background: #e3f2fd;
      border-color: #90caf9;
      font-weight: 700;
      color: @secondary;
    }
  }
}

.code-snippet {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  border-left: 3px solid @primary;
  overflow-x: auto;

  pre {
    margin: 0;
  }
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.step {
  display: flex;
  gap: 20px;
  align-items: flex-start;

  .step-number {
    min-width: 40px;
    height: 40px;
    background: @primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    margin-top: 5px;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: @secondary;
    }
  }
}

.code-block {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .code-header {
    background: @secondary;
    color: white;
    padding: 10px 15px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }

  pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    background: @code-bg;
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.use-case {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .case-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: @primary;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @secondary;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros,
.cons {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    padding-bottom: 15px;
    border-bottom: 2px solid;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

.pros {
  border-left: 4px solid @primary;

  h3 {
    color: @primary;
    border-bottom-color: fade(@primary, 20%);

    &::before {
      background: @primary;
    }
  }
}

.cons {
  border-left: 4px solid #ff6b6b;

  h3 {
    color: #ff6b6b;
    border-bottom-color: fade(#ff6b6b, 20%);

    &::before {
      background: #ff6b6b;
    }
  }
}

ul {
  padding-left: 0;

  li {
    list-style: none;
    margin-bottom: 20px;
    padding-left: 30px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 8px;
      height: 8px;
      background: @primary;
      border-radius: 50%;
    }

    strong {
      display: block;
      margin-bottom: 5px;
    }
  }
}

.comparison {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @secondary;
    padding-bottom: 15px;
    border-bottom: 2px solid fade(@primary, 20%);
  }
}

.comparison-table {
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid @border;

  .table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    &.header {
      background: @secondary;
      color: white;
      font-weight: 600;
    }

    div {
      padding: 15px;
      border-bottom: 1px solid @border;

      &:not(:last-child) {
        border-right: 1px solid @border;
      }
    }
  }
}

.conclusion {
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .conclusion-content {
    flex: 1;

    p {
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 25px;
    }
  }

  .recommendation {
    background: fade(@primary, 10%);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 25px;

    h3 {
      margin-top: 0;
      color: @primary;
    }

    ul {
      li {
        &::before {
          background: @primary;
        }
      }
    }
  }

  .resources {
    ul {
      li {
        a {
          color: @primary;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .conclusion-image {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tech-logos {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;

    .logo-item {
      background: @primary;
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
  color: #7f8c8d;
  font-size: 0.95rem;
  border-top: 1px solid @border;
}
</style>
