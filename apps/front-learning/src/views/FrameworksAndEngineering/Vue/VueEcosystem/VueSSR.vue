<template>
  <div class="ssr-guide">
    <div class="hero">
      <div class="hero-content">
        <h1>Vue SSR & Nuxt.js 基本指南</h1>
        <p class="subtitle">服务器端渲染原理与实践基础介绍</p>
      </div>
      <div class="server-animation">
        <div class="server">服务器</div>
        <div class="arrow">➜</div>
        <div class="html-output">HTML输出</div>
        <div class="arrow">➜</div>
        <div class="browser">浏览器</div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">📜 什么是服务器端渲染(SSR)?</h2>

      <div class="concept-cards">
        <div class="card">
          <div class="card-icon">🌐</div>
          <h3>传统CSR渲染</h3>
          <div class="card-content">
            <p>1. 浏览器请求空HTML页面</p>
            <p>2. 下载JavaScript包</p>
            <p>3. 执行JS生成内容</p>
            <p>4. 渲染最终页面</p>
            <div class="timeline">
              <div class="time-label">TTFB: 快</div>
              <div class="time-segment"></div>
              <div class="time-label">FCP: 慢</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-icon">🚀</div>
          <h3>Vue SSR渲染</h3>
          <div class="card-content">
            <p>1. 服务器执行Vue应用</p>
            <p>2. 生成完整HTML</p>
            <p>3. 发送HTML到浏览器</p>
            <p>4. 激活为SPA应用</p>
            <div class="timeline">
              <div class="time-label">TTFB: 稍慢</div>
              <div class="time-segment"></div>
              <div class="time-label">FCP: 快</div>
            </div>
          </div>
        </div>
      </div>

      <div class="benefits">
        <h3>SSR核心优势：</h3>
        <div class="benefit-list">
          <div class="benefit-item">
            <div class="icon">🔍</div>
            <div>
              <h4>SEO优化</h4>
              <p>搜索引擎可以抓取完整HTML内容</p>
            </div>
          </div>
          <div class="benefit-item">
            <div class="icon">⚡</div>
            <div>
              <h4>首屏加载更快</h4>
              <p>用户立即看到内容，无需等待JS执行</p>
            </div>
          </div>
          <div class="benefit-item">
            <div class="icon">📱</div>
            <div>
              <h4>低性能设备优化</h4>
              <p>服务器完成渲染工作，减轻客户端负担</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🛠️ Nuxt.js 核心特性</h2>

      <div class="nuxt-features">
        <div class="feature">
          <div class="feature-icon">🧩</div>
          <h3>开箱即用的SSR</h3>
          <p>无需复杂配置，自动处理服务器渲染</p>
        </div>

        <div class="feature">
          <div class="feature-icon">📂</div>
          <h3>约定式路由</h3>
          <p>基于文件系统自动生成路由配置</p>
          <div class="file-structure">
            <div class="folder">pages/</div>
            <div class="file">index.vue → /</div>
            <div class="file">about.vue → /about</div>
            <div class="file">users/[id].vue → /users/:id</div>
          </div>
        </div>

        <div class="feature">
          <div class="feature-icon">📝</div>
          <h3>自动代码分割</h3>
          <p>按页面分割代码，优化加载性能</p>
          <div class="bundle-size">
            <div class="size-label">app.js: 200KB</div>
            <div class="size-bar"></div>
            <div class="size-label">home.js: 50KB</div>
            <div class="size-bar"></div>
            <div class="size-label">about.js: 70KB</div>
          </div>
        </div>

        <div class="feature">
          <div class="feature-icon">🔄</div>
          <h3>数据预取</h3>
          <p>asyncData/fetch在服务器端获取数据</p>
          <div class="code-snippet">
            <pre>export default {
  async asyncData({ params }) {
    const user = await fetchUser(params.id)
    return { user }
  }
}</pre>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">⚙️ Nuxt.js SSR工作流程</h2>

      <div class="workflow">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>用户请求</h3>
            <p>浏览器请求Nuxt应用URL</p>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>服务器接收</h3>
            <p>Node.js服务器接收请求</p>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>路由匹配</h3>
            <p>Nuxt Router匹配请求URL</p>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>数据预取</h3>
            <p>执行asyncData/fetch获取数据</p>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">5</div>
          <div class="step-content">
            <h3>渲染组件</h3>
            <p>在服务器端渲染匹配的Vue组件</p>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">6</div>
          <div class="step-content">
            <h3>生成HTML</h3>
            <p>将渲染结果转换为完整HTML</p>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">7</div>
          <div class="step-content">
            <h3>发送响应</h3>
            <p>将HTML发送到客户端</p>
          </div>
        </div>

        <div class="arrow">➜</div>

        <div class="step">
          <div class="step-number">8</div>
          <div class="step-content">
            <h3>客户端激活</h3>
            <p>Vue接管HTML使其成为SPA</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">💻 Nuxt.js 基础使用</h2>

      <div class="installation">
        <h3>创建Nuxt项目</h3>
        <div class="code-snippet">
          <pre>npx nuxi init my-app
cd my-app
npm install
npm run dev</pre>
        </div>
      </div>

      <div class="project-structure">
        <h3>项目结构</h3>
        <div class="structure-grid">
          <div class="folder">
            <div class="folder-name">assets/</div>
            <div class="folder-desc">样式、字体等静态资源</div>
          </div>
          <div class="folder">
            <div class="folder-name">components/</div>
            <div class="folder-desc">可复用Vue组件</div>
          </div>
          <div class="folder">
            <div class="folder-name">layouts/</div>
            <div class="folder-desc">页面布局组件</div>
          </div>
          <div class="folder">
            <div class="folder-name">pages/</div>
            <div class="folder-desc">自动生成路由的页面</div>
          </div>
          <div class="folder">
            <div class="folder-name">plugins/</div>
            <div class="folder-desc">Vue插件注册</div>
          </div>
          <div class="folder">
            <div class="folder-name">public/</div>
            <div class="folder-desc">直接访问的静态文件</div>
          </div>
          <div class="folder">
            <div class="folder-name">server/</div>
            <div class="folder-desc">API路由和中间件</div>
          </div>
          <div class="folder">
            <div class="folder-name">nuxt.config.ts</div>
            <div class="folder-desc">Nuxt配置文件</div>
          </div>
        </div>
      </div>

      <div class="data-fetching">
        <h3>数据获取方法</h3>
        <div class="data-methods">
          <div class="method">
            <h4>asyncData</h4>
            <p><strong>用途：</strong>页面组件数据预取</p>
            <p><strong>执行位置：</strong>仅服务器端</p>
            <div class="code-snippet">
              <pre>export default {
  async asyncData({ params }) {
    return {
      product: await fetchProduct(params.id)
    }
  }
}</pre>
            </div>
          </div>

          <div class="method">
            <h4>useFetch (Composition API)</h4>
            <p><strong>用途：</strong>组件内数据获取</p>
            <p><strong>执行位置：</strong>服务器和客户端</p>
            <div class="code-snippet">
              <pre>const { data } = await useFetch('/api/products')</pre>
            </div>
          </div>

          <div class="method">
            <h4>useAsyncData</h4>
            <p><strong>用途：</strong>高级异步数据获取</p>
            <p><strong>特点：</strong>避免重复获取</p>
            <div class="code-snippet">
              <pre>const { data } = await useAsyncData(
  'products',
  () => $fetch('/api/products')
)</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">⚖️ SSR vs CSR 对比</h2>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>SSR (Nuxt.js)</th>
              <th>CSR (Vue CLI)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>首屏加载</td>
              <td class="better">快 (立即显示内容)</td>
              <td class="worse">慢 (需加载JS)</td>
            </tr>
            <tr>
              <td>SEO</td>
              <td class="better">优秀 (完整HTML)</td>
              <td class="worse">差 (空HTML)</td>
            </tr>
            <tr>
              <td>服务器负载</td>
              <td class="worse">高 (每次请求渲染)</td>
              <td class="better">低 (仅静态文件)</td>
            </tr>
            <tr>
              <td>开发复杂度</td>
              <td class="worse">较高 (需考虑同构)</td>
              <td class="better">低 (纯客户端)</td>
            </tr>
            <tr>
              <td>用户交互</td>
              <td class="equal">快 (激活后SPA)</td>
              <td class="equal">快 (SPA)</td>
            </tr>
            <tr>
              <td>适用场景</td>
              <td>内容网站、电商、SEO重要</td>
              <td>后台系统、Web应用</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="when-to-use">
        <h3>何时使用SSR？</h3>
        <div class="use-cases">
          <div class="case">
            <div class="icon">🔍</div>
            <div>
              <h4>SEO关键应用</h4>
              <p>营销网站、博客、新闻站点</p>
            </div>
          </div>
          <div class="case">
            <div class="icon">📱</div>
            <div>
              <h4>性能敏感场景</h4>
              <p>低端设备用户、慢网络环境</p>
            </div>
          </div>
          <div class="case">
            <div class="icon">🚀</div>
            <div>
              <h4>内容优先应用</h4>
              <p>内容展示比交互更重要的应用</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🚧 SSR开发注意事项</h2>

      <div class="caveats">
        <div class="caveat">
          <div class="icon">⚠️</div>
          <div>
            <h3>浏览器API使用限制</h3>
            <p>window、document等仅在客户端可用</p>
            <div class="code-snippet">
              <pre>onMounted(() => {
  // 仅在客户端执行
  window.scrollTo(0, 0)
})</pre>
            </div>
          </div>
        </div>

        <div class="caveat">
          <div class="icon">🔄</div>
          <div>
            <h3>生命周期差异</h3>
            <p>beforeCreate/created在服务器和客户端都会执行</p>
          </div>
        </div>

        <div class="caveat">
          <div class="icon">🌊</div>
          <div>
            <h3>数据序列化</h3>
            <p>避免在状态中保存不可序列化对象</p>
            <div class="code-snippet">
              <pre>// 避免在状态中保存
const state = reactive({
  // ❌ 避免使用Date、Map、Set等
  date: new Date()
})</pre>
            </div>
          </div>
        </div>

        <div class="caveat">
          <div class="icon">🧩</div>
          <div>
            <h3>组件同构</h3>
            <p>确保组件在服务器和客户端表现一致</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🚀 Nuxt.js高级特性</h2>

      <div class="advanced-features">
        <div class="feature-card">
          <h3><span class="icon">🛠️</span> 中间件系统</h3>
          <p>在页面渲染前执行自定义逻辑</p>
          <div class="code-snippet">
            <pre>// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  if (!isAuthenticated()) {
    return navigateTo('/login')
  }
})</pre>
          </div>
        </div>

        <div class="feature-card">
          <h3><span class="icon">📦</span> 模块系统</h3>
          <p>扩展Nuxt核心功能的模块化架构</p>
          <div class="code-snippet">
            <pre>// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@pinia/nuxt'
  ]
})</pre>
          </div>
        </div>

        <div class="feature-card">
          <h3><span class="icon">⚡</span> 静态站点生成(SSG)</h3>
          <p>预渲染所有页面为静态HTML</p>
          <div class="code-snippet">
            <pre>// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/','/about','/products']
    }
  }
})</pre>
          </div>
        </div>

        <div class="feature-card">
          <h3><span class="icon">🚪</span> API路由</h3>
          <p>在/server目录创建服务器API</p>
          <div class="code-snippet">
            <pre>// server/api/users/[id].ts
export default defineEventHandler(event => {
  const id = event.context.params?.id
  return fetchUser(id)
})</pre>
          </div>
        </div>
      </div>
    </div>

    <div class="conclusion">
      <h2>💎 总结：Nuxt.js的价值</h2>
      <p>Nuxt.js为Vue应用提供了开箱即用的服务器端渲染解决方案，显著改善了SEO和首屏性能。通过其强大的约定式路由、数据预取机制和模块化架构，Nuxt大大简化了复杂Vue应用的开发流程。</p>

      <div class="resources">
        <h3>学习资源：</h3>
        <ul>
          <li><a href="https://nuxt.com/" target="_blank">Nuxt.js官方文档</a></li>
          <li><a href="https://vuejs.org/guide/scaling-up/ssr.html" target="_blank">Vue SSR指南</a></li>
          <li><a href="https://github.com/nuxt/nuxt" target="_blank">Nuxt GitHub仓库</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑（演示用）
import { ref } from 'vue';

// 示例状态
const activeTab = ref(0);

// 切换标签页
const setActiveTab = (index: number) => {
  activeTab.value = index;
};
</script>

<style lang="less" scoped>
@font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@primary-color: #00dc82;
@secondary-color: #18181b;
@text-primary: #1f2937;
@text-secondary: #6b7280;
@border-color: #e5e7eb;
@background-light: #f9fafb;
@card-bg: #ffffff;
@ssr-color: #00dc82;
@csr-color: #3b82f6;
@warning-color: #f59e0b;

.ssr-guide {
  font-family: @font-family;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 25px;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
}

.hero {
  background: linear-gradient(135deg, fade(@primary-color, 10%), fade(@primary-color, 5%));
  border-radius: 16px;
  padding: 50px 40px;
  margin-bottom: 40px;
  text-align: center;
  border: 1px solid fade(@primary-color, 15%);

  .hero-content {
    max-width: 800px;
    margin: 0 auto 30px;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 20px;
      color: @text-primary;
    }

    .subtitle {
      font-size: 1.4rem;
      color: @text-secondary;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .server-animation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
    max-width: 800px;
    margin: 0 auto;

    >div {
      padding: 20px 30px;
      border-radius: 8px;
      font-weight: bold;
    }

    .server {
      background: fade(@ssr-color, 15%);
      color: darken(@ssr-color, 15%);
      border: 2px dashed @ssr-color;
    }

    .html-output {
      background: fade(@warning-color, 15%);
      color: darken(@warning-color, 20%);
      border: 2px solid @warning-color;
    }

    .browser {
      background: fade(@csr-color, 15%);
      color: darken(@csr-color, 15%);
      border: 2px solid @csr-color;
    }

    .arrow {
      font-size: 2.5rem;
      color: @text-secondary;
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 35px;
  margin-bottom: 35px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid fade(@primary-color, 10%);
    display: flex;
    align-items: center;
    gap: 15px;
  }
}

.concept-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 30px;

  .card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid @border-color;

    .card-icon {
      font-size: 3rem;
      text-align: center;
      padding: 20px;
      background: fade(@primary-color, 8%);
    }

    h3 {
      text-align: center;
      margin: 0;
      padding: 15px;
      background: fade(@primary-color, 15%);
      color: darken(@primary-color, 20%);
    }

    .card-content {
      padding: 20px;

      p {
        margin: 10px 0;
        padding-left: 20px;
        position: relative;

        &::before {
          content: "•";
          position: absolute;
          left: 0;
          color: @primary-color;
        }
      }
    }
  }
}

.timeline {
  display: flex;
  margin-top: 20px;
  background: fade(@text-secondary, 8%);
  border-radius: 6px;
  padding: 8px;

  .time-label {
    padding: 0 10px;
    font-size: 0.9rem;
    color: @text-secondary;
    font-weight: 500;
  }

  .time-segment {
    flex: 1;
    height: 6px;
    background: @primary-color;
    border-radius: 3px;
    margin: 0 10px;
    align-self: center;
  }
}

.benefits {
  .benefit-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;

    .benefit-item {
      display: flex;
      gap: 15px;
      align-items: flex-start;
      padding: 15px;
      background: fade(@primary-color, 5%);
      border-radius: 10px;
      border-left: 3px solid @primary-color;

      .icon {
        font-size: 1.8rem;
        margin-top: 5px;
      }

      h4 {
        margin-top: 0;
        margin-bottom: 5px;
      }

      p {
        margin: 0;
        color: @text-secondary;
        font-size: 0.95rem;
      }
    }
  }
}

.nuxt-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;

  .feature {
    padding: 25px;
    border-radius: 12px;
    border: 1px solid @border-color;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 15px;
    }

    p {
      color: @text-secondary;
      margin-bottom: 15px;
    }
  }
}

.file-structure {
  margin-top: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  background: fade(@text-secondary, 5%);
  border-radius: 8px;
  padding: 12px;

  .folder {
    font-weight: 600;
    color: @text-primary;
    margin-bottom: 8px;
  }

  .file {
    padding-left: 20px;
    color: @text-secondary;
    margin-bottom: 5px;
    position: relative;

    &::before {
      content: "↳";
      position: absolute;
      left: 5px;
    }
  }
}

.bundle-size {
  .size-label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    color: @text-secondary;
  }

  .size-bar {
    height: 8px;
    background: fade(@primary-color, 50%);
    border-radius: 4px;
    margin-bottom: 15px;
  }
}

.workflow {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;

  .step {
    min-width: 140px;
    padding: 20px;
    border-radius: 12px;
    background: fade(@text-secondary, 5%);
    text-align: center;
    flex: 1;

    .step-number {
      width: 36px;
      height: 36px;
      background: @ssr-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      font-weight: bold;
      font-size: 1.1rem;
    }

    h3 {
      font-size: 1.1rem;
      margin-top: 0;
      margin-bottom: 10px;
    }

    p {
      margin: 0;
      color: @text-secondary;
      font-size: 0.9rem;
    }
  }

  .arrow {
    font-size: 1.8rem;
    color: @text-secondary;
    flex-shrink: 0;
    align-self: center;
  }
}

.installation {
  margin-bottom: 30px;

  h3 {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 15px;
  }
}

.project-structure {
  margin-bottom: 30px;

  h3 {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 15px;
  }

  .structure-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;

    .folder {
      padding: 15px;
      border-radius: 10px;
      border: 1px solid @border-color;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      .folder-name {
        font-weight: 600;
        margin-bottom: 8px;
        font-family: 'Fira Code', monospace;
      }

      .folder-desc {
        color: @text-secondary;
        font-size: 0.9rem;
      }
    }
  }
}

.data-fetching {
  h3 {
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 20px;
  }

  .data-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;

    .method {
      padding: 20px;
      border-radius: 12px;
      border: 1px solid @border-color;
      background: fade(@primary-color, 4%);

      h4 {
        font-size: 1.1rem;
        margin-top: 0;
        margin-bottom: 15px;
        color: @ssr-color;
      }

      p {
        margin: 8px 0;
        color: @text-secondary;
      }
    }
  }
}

.code-snippet {
  background: #2d3747;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 10px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 15px 0;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);

  pre {
    margin: 0;
  }
}

.comparison-table {
  overflow-x: auto;
  margin-bottom: 30px;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 16px 20px;
      text-align: left;
    }

    thead {
      background: @primary-color;
      color: white;

      th {
        font-weight: 600;
        border-bottom: 2px solid darken(@primary-color, 10%);
      }
    }

    tbody {
      tr:nth-child(even) {
        background: fade(@primary-color, 5%);
      }

      tr:hover {
        background: fade(@primary-color, 10%);
      }

      td {
        border-bottom: 1px solid @border-color;

        &.better {
          color: #10b981;
          font-weight: 500;
        }

        &.worse {
          color: #ef4444;
          font-weight: 500;
        }

        &.equal {
          color: @text-secondary;
        }
      }
    }
  }
}

.when-to-use {
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .case {
      display: flex;
      gap: 15px;
      padding: 15px;
      background: fade(@primary-color, 8%);
      border-radius: 10px;

      .icon {
        font-size: 1.8rem;
        margin-top: 5px;
      }

      h4 {
        margin-top: 0;
        margin-bottom: 5px;
      }

      p {
        margin: 0;
        color: @text-secondary;
        font-size: 0.9rem;
      }
    }
  }
}

.caveats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  .caveat {
    display: flex;
    gap: 15px;

    .icon {
      font-size: 1.8rem;
      min-width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: fade(@warning-color, 15%);
      color: @warning-color;
      border-radius: 50%;
    }

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 10px;
    }

    p {
      margin: 0 0 15px;
      color: @text-secondary;
    }
  }
}

.advanced-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;

  .feature-card {
    padding: 25px;
    border-radius: 12px;
    border: 1px solid @border-color;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    h3 {
      font-size: 1.3rem;
      margin-top: 0;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .icon {
      font-size: 1.4rem;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: fade(@primary-color, 15%);
      color: @primary-color;
      border-radius: 50%;
    }

    p {
      color: @text-secondary;
      margin-bottom: 15px;
    }
  }
}

.conclusion {
  background: linear-gradient(135deg, fade(@primary-color, 8%), fade(@primary-color, 4%));
  border-radius: 16px;
  padding: 40px;
  margin-top: 30px;
  text-align: center;
  border: 1px solid fade(@primary-color, 15%);

  h2 {
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 25px;
  }

  p {
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto 30px;
    line-height: 1.7;
    color: @text-secondary;
  }
}

.resources {
  text-align: left;
  max-width: 600px;
  margin: 40px auto 0;
  padding-top: 20px;
  border-top: 1px solid fade(@primary-color, 20%);

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 15px;
  }

  ul {
    padding-left: 0;
    list-style: none;

    li {
      margin-bottom: 12px;

      a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 8px;

        &::before {
          content: "🔗";
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .hero {
    padding: 30px 20px;

    h1 {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.2rem;
    }
  }

  .section {
    padding: 25px 20px;
  }

  .workflow {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 10px 0;
    }
  }

  .comparison-table table {
    font-size: 0.9rem;

    th,
    td {
      padding: 12px 15px;
    }
  }
}
</style>
