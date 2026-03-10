<template>
  <div class="router-guide-container">
    <div class="header">
      <h1>Vue Router 核心指南</h1>
      <p class="subtitle">Vue.js 官方路由管理库的使用基础介绍</p>
      <a href="https://router.vuejs.org/zh/guide/" target="_blank">Vue Router 官方文档</a>
    </div>

    <div class="content">
      <section class="intro-section">
        <h2><span class="icon">📍</span> Vue Router 介绍</h2>
        <div class="intro-content">
          <p>Vue Router 是 Vue.js 的官方路由管理器，它与 Vue.js 核心深度集成，使构建单页面应用变得轻而易举。</p>
          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>核心功能</h3>
              <ul>
                <li>嵌套路由映射</li>
                <li>模块化的路由配置</li>
                <li>路由参数、查询、通配符</li>
                <li>路由导航守卫</li>
                <li>HTML5 history 模式</li>
              </ul>
            </div>

            <div class="feature-card">
              <div class="feature-icon">💡</div>
              <h3>主要优势</h3>
              <ul>
                <li>声明式路由配置</li>
                <li>组件化路由系统</li>
                <li>动态路由匹配</li>
                <li>细粒度的导航控制</li>
                <li>与 Vue 响应式系统集成</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="installation-section">
        <h2><span class="icon">📦</span> 安装与配置</h2>
        <div class="code-container">
          <div class="code-header">
            <div class="code-title">安装 Vue Router</div>
          </div>
          <pre class="code-block">npm install vue-router@4</pre>
        </div>

        <div class="code-container">
          <div class="code-header">
            <div class="code-title">路由配置 (router/index.ts)</div>
          </div>
          <pre class="code-block">import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: () => import('@/views/UserProfile.vue'),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router</pre>
        </div>

        <div class="code-container">
          <div class="code-header">
            <div class="code-title">在 main.ts 中挂载路由</div>
          </div>
          <pre class="code-block">import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')</pre>
        </div>
      </section>

      <section class="api-section">
        <h2><span class="icon">🔧</span> 核心 API 与使用</h2>

        <div class="api-grid">
          <div class="api-card">
            <h3>router-link</h3>
            <p>声明式导航组件，用于在应用内导航</p>
            <pre class="inline-code">&lt;router-link to="/home"&gt;首页&lt;/router-link&gt;</pre>
            <pre class="inline-code">&lt;router-link :to="{ name: 'user', params: { id: 123 }}"&gt;
  用户资料
&lt;/router-link&gt;</pre>
          </div>

          <div class="api-card">
            <h3>router-view</h3>
            <p>路由出口组件，用于渲染匹配的组件</p>
            <pre class="inline-code">&lt;router-view&gt;&lt;/router-view&gt;</pre>
            <pre class="inline-code">&lt;router-view v-slot="{ Component }"&gt;
  &lt;transition name="fade"&gt;
    &lt;component :is="Component" /&gt;
  &lt;/transition&gt;
&lt;/router-view&gt;</pre>
          </div>

          <div class="api-card">
            <h3>useRouter()</h3>
            <p>提供对路由器实例的访问</p>
            <pre class="inline-code">import { useRouter } from 'vue-router'

const router = useRouter()

// 导航到指定路径
router.push('/about')

// 替换当前路由
router.replace('/profile')

// 导航前进/后退
router.go(1)  // 前进
router.go(-1) // 后退</pre>
          </div>

          <div class="api-card">
            <h3>useRoute()</h3>
            <p>提供对当前路由对象的访问</p>
            <pre class="inline-code">import { useRoute } from 'vue-router'

const route = useRoute()

// 访问路由参数
console.log(route.params.id)

// 访问查询参数
console.log(route.query.search)

// 访问路由元信息
if (route.meta.requiresAuth) {
  // 需要认证
}</pre>
          </div>

          <div class="api-card">
            <h3>路由配置对象</h3>
            <p>定义路由的核心配置选项</p>
            <pre class="inline-code">{
  path: '/user/:id',        // 路由路径
  name: 'user',             // 路由名称
  component: UserProfile,   // 路由组件
  props: true,              // 将params作为props传递
  meta: { requiresAuth: true }, // 路由元信息
  children: [ /* 嵌套路由 */ ]
}</pre>
          </div>

          <div class="api-card">
            <h3>路由懒加载</h3>
            <p>优化应用加载性能的技术</p>
            <pre class="inline-code">// 使用动态导入实现懒加载
component: () => import('./views/UserProfile.vue')

// 带注释的懒加载 (webpack)
component: () => import(/* webpackChunkName: "user" */ './User.vue')</pre>
          </div>
        </div>
      </section>

      <section class="navigation-section">
        <h2><span class="icon">🧭</span> 导航守卫</h2>
        <div class="guard-grid">
          <div class="guard-card">
            <h3>全局前置守卫</h3>
            <pre class="inline-code">router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})</pre>
          </div>

          <div class="guard-card">
            <h3>全局解析守卫</h3>
            <pre class="inline-code">router.beforeResolve(to => {
  // 确保所有异步组件都已解析
})</pre>
          </div>

          <div class="guard-card">
            <h3>全局后置钩子</h3>
            <pre class="inline-code">router.afterEach((to, from) => {
  // 页面标题设置
  document.title = to.meta.title || '默认标题'
})</pre>
          </div>

          <div class="guard-card">
            <h3>路由独享守卫</h3>
            <pre class="inline-code">{
  path: '/admin',
  component: AdminPanel,
  beforeEnter: (to, from, next) => {
    if (!isAdmin()) next('/unauthorized')
    else next()
  }
}</pre>
          </div>

          <div class="guard-card">
            <h3>组件内守卫</h3>
            <pre class="inline-code">export default {
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能访问组件实例 `this`
    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    this.userData = fetchUser(to.params.id)
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    return confirm('确定要离开吗？未保存的更改将会丢失')
  }
}</pre>
          </div>
        </div>
      </section>

      <section class="advanced-section">
        <h2><span class="icon">🚀</span> 高级路由特性</h2>
        <div class="advanced-grid">
          <div class="advanced-card">
            <h3>嵌套路由</h3>
            <pre class="inline-code">const routes = [
  {
    path: '/user/:id',
    component: UserLayout,
    children: [
      {
        path: '', // 默认子路由
        component: UserProfile
      },
      {
        path: 'posts',
        component: UserPosts
      },
      {
        path: 'settings',
        component: UserSettings
      }
    ]
  }
]</pre>
          </div>

          <div class="advanced-card">
            <h3>命名视图</h3>
            <pre class="inline-code">&lt;router-view name="header"&gt;&lt;/router-view&gt;
&lt;router-view&gt;&lt;/router-view&gt;
&lt;router-view name="footer"&gt;&lt;/router-view&gt;

const routes = [
  {
    path: '/',
    components: {
      default: Home,
      header: Header,
      footer: Footer
    }
  }
]</pre>
          </div>

          <div class="advanced-card">
            <h3>重定向和别名</h3>
            <pre class="inline-code">// 重定向
{ path: '/home', redirect: '/' }

// 命名路由重定向
{ path: '/old', redirect: { name: 'home' } }

// 函数重定向
{
  path: '/search',
  redirect: to => {
    return { path: '/search', query: { q: to.params.searchText } }
  }
}

// 别名
{ path: '/', component: Home, alias: '/home' }</pre>
          </div>

          <div class="advanced-card">
            <h3>路由元信息</h3>
            <pre class="inline-code">{
  path: '/admin',
  component: AdminPanel,
  meta: {
    requiresAuth: true,
    roles: ['admin', 'superadmin'],
    title: '管理面板'
  }
}

// 在导航守卫中访问
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    // 执行认证检查
  }
})</pre>
          </div>

          <div class="advanced-card">
            <h3>滚动行为</h3>
            <pre class="inline-code">const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})</pre>
          </div>

          <div class="advanced-card">
            <h3>路由过渡动画</h3>
            <pre class="inline-code">&lt;router-view v-slot="{ Component }"&gt;
  &lt;transition name="fade" mode="out-in"&gt;
    &lt;component :is="Component" /&gt;
  &lt;/transition&gt;
&lt;/router-view&gt;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}</pre>
          </div>
        </div>
      </section>
    </div>

    <div class="footer">
      <p>Vue Router 4 官方文档: <a href="https://router.vuejs.org/" target="_blank">https://router.vuejs.org/</a></p>
      <p>版本: 4.2.0 | 最后更新: 2023年10月</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 此组件仅用于展示，无逻辑代码
</script>

<style lang="less" scoped>


.router-guide-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.07);
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #42b983, #35495e);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      font-size: 1.15rem;
      color: #7f8c8d;
      font-weight: 400;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .content {
    background: white;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  }

  section {
    margin-bottom: 3.5rem;

    h2 {
      font-size: 1.7rem;
      color: #42b983;
      margin-bottom: 1.8rem;
      padding-bottom: 0.8rem;
      border-bottom: 2px solid #e0f7fa;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4rem;
      }
    }
  }

  .intro-section {
    .intro-content {
      p {
        font-size: 1.05rem;
        line-height: 1.7;
        color: #4a5568;
        margin-bottom: 1.5rem;
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.8rem;

        .feature-card {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.8rem 1.5rem;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 20px rgba(66, 185, 131, 0.12);
            border-color: #42b983;
          }

          .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1.2rem;
          }

          h3 {
            font-size: 1.25rem;
            color: #2c3e50;
            margin-bottom: 0.8rem;
          }

          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.6rem;
              color: #4a5568;
              font-size: 0.97rem;
              line-height: 1.5;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

  .installation-section,
  .api-section,
  .navigation-section,
  .advanced-section {
    .code-container {
      background: #2d3748;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      margin-bottom: 1.5rem;

      .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.9rem 1.5rem;
        background: #1a202c;
        border-bottom: 1px solid #2d3748;

        .code-title {
          color: #cbd5e0;
          font-size: 0.95rem;
          font-weight: 500;
        }
      }

      .code-block {
        margin: 0;
        padding: 1.8rem;
        color: #e2e8f0;
        font-family: 'Fira Code', monospace;
        font-size: 0.95rem;
        line-height: 1.7;
        overflow-x: auto;
        background: #2d3748;
      }
    }
  }

  .api-section,
  .navigation-section,
  .advanced-section {

    .api-grid,
    .guard-grid,
    .advanced-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.8rem;

      .api-card,
      .guard-card,
      .advanced-card {
        background: #f8fafc;
        border-radius: 10px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
          border-color: #42b983;
        }

        h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 0.8rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        p {
          color: #4a5568;
          font-size: 0.95rem;
          margin-bottom: 0.8rem;
        }

        .inline-code {
          background: #2d3748;
          color: #e2e8f0;
          border-radius: 6px;
          padding: 1rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          overflow-x: auto;
          display: block;
          margin-bottom: 0.8rem;
          line-height: 1.5;
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e9ecef;
    color: #718096;
    font-size: 0.95rem;

    a {
      color: #42b983;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1.2rem;

    .header {
      h1 {
        font-size: 1.9rem;
      }
    }

    .content {
      padding: 1.8rem;
    }

    section {
      margin-bottom: 2.5rem;
    }

    .api-grid,
    .guard-grid,
    .advanced-grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }
  }
}
</style>
