<template>
  <div class="router-principles">
    <div class="header">
      <h1>Vue Router 核心原理基础介绍</h1>
      <p>深入理解现代前端路由的实现机制</p>
    </div>

    <div class="content">
      <section>
        <h2>路由的核心概念</h2>
        <p>Vue Router是Vue.js官方的路由管理器，它的核心功能是将组件映射到路由，并实现单页面应用(SPA)的导航功能。</p>

        <div class="concept-grid">
          <div class="concept-card">
            <div class="card-icon">🔗</div>
            <h3>路由映射</h3>
            <p>将URL路径映射到对应的Vue组件</p>
          </div>

          <div class="concept-card">
            <div class="card-icon">🔄</div>
            <h3>组件切换</h3>
            <p>根据当前路由动态渲染组件</p>
          </div>

          <div class="concept-card">
            <div class="card-icon">🧭</div>
            <h3>导航守卫</h3>
            <p>在路由变化前后执行钩子函数</p>
          </div>

          <div class="concept-card">
            <div class="card-icon">📦</div>
            <h3>状态管理</h3>
            <p>管理路由参数、查询参数等状态</p>
          </div>
        </div>
      </section>

      <section>
        <h2>路由的两种模式</h2>
        <div class="mode-comparison">
          <div class="mode-card">
            <h3>Hash 模式</h3>
            <p>使用URL的hash(#)来模拟完整URL，当hash改变时不会重新加载页面</p>
            <div class="code-block">
              <pre>http://example.com/#/home</pre>
            </div>
            <p class="highlight">原理：监听 <code>hashchange</code> 事件</p>
          </div>

          <div class="mode-card">
            <h3>History 模式</h3>
            <p>利用HTML5 History API实现无#的URL，需要服务器配置支持</p>
            <div class="code-block">
              <pre>http://example.com/home</pre>
            </div>
            <p class="highlight">原理：使用 <code>pushState</code> 和 <code>popstate</code></p>
          </div>
        </div>
      </section>

      <section>
        <h2>核心实现原理</h2>
        <div class="implementation">
          <div class="step">
            <div class="step-number">1</div>
            <h3>路由注册</h3>
            <p>创建路由实例，定义路由规则</p>
            <div class="code-block">
              <pre>
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <h3>路由监听</h3>
            <p>根据当前模式监听URL变化</p>
            <div class="code-block">
              <pre>
// Hash模式
window.addEventListener('hashchange', () => {
  this.current = window.location.hash.slice(1)
})

// History模式
window.addEventListener('popstate', () => {
  this.current = window.location.pathname
})</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <h3>路由匹配</h3>
            <p>根据当前URL匹配对应的组件</p>
            <div class="code-block">
              <pre>
function matchRoute(path: string) {
  return routes.find(route =>
    route.path === path
  )
}</pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <h3>组件渲染</h3>
            <p>使用动态组件渲染匹配的组件</p>
            <div class="code-block">
              <pre>
&lt;component :is="currentComponent" /&gt;</pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>路由导航守卫实现</h2>
        <p>导航守卫是路由的核心功能之一，用于控制路由跳转过程</p>
        <div class="guard-flow">
          <div class="guard-step">
            <div class="guard-icon">🔍</div>
            <h3>全局前置守卫</h3>
            <p>router.beforeEach</p>
          </div>
          <div class="arrow">→</div>
          <div class="guard-step">
            <div class="guard-icon">📄</div>
            <h3>路由独享守卫</h3>
            <p>beforeEnter</p>
          </div>
          <div class="arrow">→</div>
          <div class="guard-step">
            <div class="guard-icon">🛡️</div>
            <h3>组件内守卫</h3>
            <p>beforeRouteEnter</p>
          </div>
          <div class="arrow">→</div>
          <div class="guard-step">
            <div class="guard-icon">✅</div>
            <h3>导航确认</h3>
            <p>渲染组件</p>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>Vue Router通过监听URL变化、匹配路由规则、渲染对应组件，实现了SPA的无刷新页面切换。</p>
      <p>深入理解其原理有助于开发更高效、可靠的前端应用。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这个组件仅用于展示路由原理，不需要实际功能
</script>

<style lang="less" scoped>
.router-principles {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  .header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #eaeef2;

    h1 {
      font-size: 2.2rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.1rem;
      color: #7f8c8d;
    }
  }

  .content {
    section {
      margin-bottom: 3rem;
      padding: 1.5rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);

      h2 {
        font-size: 1.6rem;
        color: #3498db;
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #eaeef2;
      }

      p {
        line-height: 1.7;
        color: #555;
        margin-bottom: 1.5rem;
      }
    }

    .concept-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;

      .concept-card {
        background: #f0f7ff;
        border-radius: 8px;
        padding: 1.5rem;
        text-align: center;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          background: #e1f0ff;
        }

        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #2980b9;
        }

        p {
          font-size: 0.95rem;
          margin-bottom: 0;
          color: #666;
        }
      }
    }

    .mode-comparison {
      display: flex;
      gap: 2rem;
      margin-top: 1.5rem;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .mode-card {
        flex: 1;
        background: #f9f9f9;
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid #eaeef2;

        h3 {
          font-size: 1.3rem;
          color: #27ae60;
          margin-bottom: 1rem;
        }

        p {
          margin-bottom: 1.2rem;
          color: #555;
        }

        .highlight {
          font-weight: 600;
          color: #e74c3c;
          margin-top: 1rem;

          code {
            background: #fff5f5;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
          }
        }
      }
    }

    .implementation {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.8rem;
      margin-top: 1.5rem;

      .step {
        position: relative;
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        border-left: 4px solid #3498db;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

        .step-number {
          position: absolute;
          top: -15px;
          left: -15px;
          width: 35px;
          height: 35px;
          background: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
        }

        h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-bottom: 0.8rem;
        }

        p {
          font-size: 0.95rem;
          margin-bottom: 1rem;
          color: #666;
        }
      }
    }

    .guard-flow {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 2rem;

      .guard-step {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.2rem;
        text-align: center;
        width: 180px;
        margin: 0 1rem;
        border: 1px solid #eaeef2;

        .guard-icon {
          font-size: 2rem;
          margin-bottom: 0.8rem;
        }

        h3 {
          font-size: 1.1rem;
          color: #9b59b6;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 0.9rem;
          margin-bottom: 0;
          color: #777;
        }
      }

      .arrow {
        font-size: 1.5rem;
        color: #95a5a6;
        margin: 0 0.5rem;
      }

      @media (max-width: 768px) {
        flex-direction: column;

        .guard-step {
          margin: 0.8rem 0;
          width: 100%;
        }

        .arrow {
          transform: rotate(90deg);
          margin: 0.5rem 0;
        }
      }
    }
  }

  .code-block {
    background: #2d2d2d;
    border-radius: 6px;
    padding: 1rem;
    margin: 1.2rem 0;
    overflow-x: auto;

    pre {
      color: #f8f8f2;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0;
    }
  }

  .footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eaeef2;
    color: #7f8c8d;
    font-size: 0.95rem;
    line-height: 1.6;

    p {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
