<template>
  <div class="router-guards-container">
    <header class="header">
      <div class="title-section">
        <h1>Vue Router <span class="highlight">路由守卫</span>基础介绍</h1>
        <p class="subtitle">全面掌握导航控制与权限管理</p>
      </div>
      <div class="stats-card">
        <div class="stat-item">
          <div class="stat-value">3</div>
          <div class="stat-label">全局守卫</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">1</div>
          <div class="stat-label">路由独享守卫</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">3</div>
          <div class="stat-label">组件内守卫</div>
        </div>
      </div>
    </header>

    <div class="intro-section">
      <div class="intro-card">
        <h2>什么是路由守卫？</h2>
        <p>路由守卫是Vue Router提供的导航控制机制，允许在路由导航过程中插入钩子函数，用于控制导航行为、验证权限、管理数据等。</p>
        <div class="navigation-flow">
          <div class="flow-step">
            <div class="flow-icon">🚦</div>
            <div class="flow-text">导航触发</div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="flow-icon">🔒</div>
            <div class="flow-text">守卫处理</div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="flow-icon">✅</div>
            <div class="flow-text">完成导航</div>
          </div>
        </div>
      </div>
    </div>

    <div class="toc-section">
      <h2 class="section-title">📚 守卫类型目录</h2>
      <div class="toc-grid">
        <div v-for="(item, index) in tocItems" :key="index" class="toc-item" @click="scrollToSection(item.id)">
          <div class="toc-number">{{ index + 1 }}</div>
          <div class="toc-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
          <div class="guard-type" :class="item.type">{{ item.typeLabel }}</div>
        </div>
      </div>
    </div>

    <div class="guards-container">
      <!-- 全局前置守卫 -->
      <section id="before-each" class="guard-section">
        <div class="section-header">
          <div class="section-icon">🚦</div>
          <h2>全局前置守卫 (beforeEach)</h2>
          <div class="guard-tag global">全局守卫</div>
        </div>

        <div class="guard-details">
          <div class="detail-card">
            <h3><span class="icon">⏱️</span> 触发时机</h3>
            <p>在路由导航开始时触发，在所有守卫中最早触发</p>
          </div>

          <div class="detail-card">
            <h3><span class="icon">🎯</span> 作用</h3>
            <p>对导航进行全局拦截，决定是否允许导航继续</p>
          </div>

          <div class="detail-card">
            <h3><span class="icon">💡</span> 使用场景</h3>
            <ul>
              <li>用户身份验证（检查登录状态）</li>
              <li>权限控制（检查用户角色）</li>
              <li>全局导航拦截（维护中页面）</li>
              <li>路由访问日志记录</li>
            </ul>
          </div>
        </div>

        <div class="code-example">
          <h3><span class="icon">💻</span> 代码示例</h3>
          <pre class="code-block">router.beforeEach((to, from, next?) => {
next为可选参数，如果next为undefined，则导航不会继续，如果next为false，则导航会被阻止
  // 检查目标路由是否需要登录
  if (to.meta.requiresAuth) {
    // 验证用户是否已登录
    if (store.state.user.isAuthenticated) {
      next(); // 允许导航
    } else {
      next({ name: 'Login' }); // 重定向到登录页
    }
  } else {
    next(); // 不需要验证，继续导航
  }
});</pre>
        </div>

        <div class="important-note">
          <h3><span class="icon">⚠️</span> 重要提示</h3>
          <p>用 <code>next()</code> 函数来继续导航</p>
        </div>
      </section>

      <!-- 全局解析守卫 -->
      <section id="before-resolve" class="guard-section">
        <div class="section-header">
          <div class="section-icon">🔍</div>
          <h2>全局解析守卫 (beforeResolve)</h2>
          <div class="guard-tag global">全局守卫</div>
        </div>

        <div class="guard-details">
          <div class="detail-card">
            <h3><span class="icon">⏱️</span> 触发时机</h3>
            <p>在导航被确认之前触发，在异步组件解析完成之后</p>
          </div>

          <div class="detail-card">
            <h3><span class="icon">🎯</span> 作用</h3>
            <p>确保异步组件或动态导入的组件已解析完成</p>
          </div>

          <div class="detail-card">
            <h3><span class="icon">💡</span> 使用场景</h3>
            <ul>
              <li>确保异步数据已加载</li>
              <li>在渲染前进行最终权限检查</li>
              <li>获取路由级别依赖项</li>
              <li>服务器端渲染(SSR)的数据预取</li>
            </ul>
          </div>
        </div>

        <div class="code-example">
          <h3><span class="icon">💻</span> 代码示例</h3>
          <pre class="code-block">router.beforeResolve(async (to, from, next) => {
  // 检查路由是否配置了需要预取数据
  if (to.meta.requiresFetch) {
    try {
      // 预取数据
      await store.dispatch('fetchData', to.params.id);
      next(); // 继续导航
    } catch (error) {
      next({ name: 'Error' }); // 错误处理
    }
  } else {
    next(); // 不需要预取，继续导航
  }
});</pre>
        </div>
      </section>

      <!-- 全局后置钩子 -->
      <section id="after-each" class="guard-section">
        <div class="section-header">
          <div class="section-icon">🏁</div>
          <h2>全局后置钩子 (afterEach)</h2>
          <div class="guard-tag global">全局守卫</div>
        </div>

        <div class="guard-details">
          <div class="detail-card">
            <h3><span class="icon">⏱️</span> 触发时机</h3>
            <p>在导航完成后触发，没有能力改变导航结果</p>
          </div>

          <div class="detail-card">
            <h3><span class="icon">🎯</span> 作用</h3>
            <p>执行导航完成后的操作，如页面分析、滚动复位</p>
          </div>

          <div class="detail-card">
            <h3><span class="icon">💡</span> 使用场景</h3>
            <ul>
              <li>页面访问统计（如Google Analytics）</li>
              <li>页面标题设置</li>
              <li>重置页面滚动位置</li>
              <li>通知/提醒关闭</li>
              <li>结束加载动画</li>
            </ul>
          </div>
        </div>

        <div class="code-example">
          <h3><span class="icon">💻</span> 代码示例</h3>
          <pre class="code-block">router.afterEach((to) => {
  // 设置页面标题
  document.title = to.meta.title || '默认标题';

  // 发送页面访问统计
  ga('send', 'pageview', to.path);

  // 滚动到页面顶部
  window.scrollTo(0, 0);

  // 关闭全局加载动画
  hideGlobalLoading();
});</pre>
        </div>
      </section>

      <!-- 路由独享守卫 -->
      <section id="before-enter" class="guard-section">
        <div class="section-header">
          <div class="section-icon">🔐</div>
          <h2>路由独享守卫 (beforeEnter)</h2>
          <div class="guard-tag per-route">路由独享</div>
        </div>

        <div class="guard-details">
          <div class="detail-card">
            <h3><span class="icon">⏱️</span> 触发时机</h3>
            <p>在路由配置中定义，仅在进入该特定路由时触发</p>
          </div>

          <div class="detail-card">
            <h3><span class="icon">🎯</span> 作用</h3>
            <p>为特定路由设置访问权限或条件检查</p>
          </div>

          <div class="detail-card">
            <h3><span class="icon">💡</span> 使用场景</h3>
            <ul>
              <li>特定页面的权限验证</li>
              <li>路由参数验证</li>
              <li>特定页面的数据预加载</li>
              <li>付费内容访问控制</li>
            </ul>
          </div>
        </div>

        <div class="code-example">
          <h3><span class="icon">💻</span> 代码示例</h3>
          <pre class="code-block">const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAdmin: true },
    beforeEnter: (to, from, next) => {
      // 检查用户是否是管理员
      if (store.state.user.role === 'admin') {
        next(); // 允许访问
      } else {
        next({ name: 'Forbidden' }); // 重定向到无权限页面
      }
    }
  },
  {
    path: '/article/:id',
    component: ArticleDetail,
    beforeEnter: (to, from, next) => {
      // 验证文章ID是否有效
      if (isValidArticleId(to.params.id)) {
        next(); // 允许访问
      } else {
        next({ name: 'NotFound' }); // 重定向到404页面
      }
    }
  }
];</pre>
        </div>
      </section>

      <!-- 组件内守卫 -->
      <section id="in-component" class="guard-section">
        <div class="section-header">
          <div class="section-icon">🧩</div>
          <h2>组件内守卫</h2>
          <div class="guard-tag component">组件内守卫</div>
        </div>
        <p class="section-desc">在组件内部定义的守卫，直接访问组件实例</p>

        <div class="sub-guard-section">
          <h3><span class="icon">➡️</span> beforeRouteEnter</h3>
          <div class="guard-details">
            <div class="detail-card">
              <h4><span class="icon">⏱️</span> 触发时机</h4>
              <p>在路由进入该组件之前调用</p>
            </div>
            <div class="detail-card">
              <h4><span class="icon">🎯</span> 特点</h4>
              <p>无法访问组件实例 (this)，因为组件尚未创建</p>
            </div>
            <div class="detail-card">
              <h4><span class="icon">💡</span> 使用场景</h4>
              <p>根据路由参数获取数据，在组件创建前加载必要信息</p>
            </div>
          </div>
          <div class="code-example">
            <pre class="code-block">beforeRouteEnter(to, from, next) {
  // 无法访问this
  // 通过next的回调访问组件实例
  next(vm => {
    // 通过vm访问组件实例
    vm.loadData(to.params.id);
  });
}</pre>
          </div>
        </div>

        <div class="sub-guard-section">
          <h3><span class="icon">🔄</span> beforeRouteUpdate</h3>
          <div class="guard-details">
            <div class="detail-card">
              <h4><span class="icon">⏱️</span> 触发时机</h4>
              <p>在当前路由改变，但该组件被复用时调用</p>
            </div>
            <div class="detail-card">
              <h4><span class="icon">🎯</span> 特点</h4>
              <p>可以访问组件实例 (this)</p>
            </div>
            <div class="detail-card">
              <h4><span class="icon">💡</span> 使用场景</h4>
              <p>路由参数变化时（如 /article/1 到 /article/2），重新获取数据</p>
            </div>
          </div>
          <div class="code-example">
            <pre class="code-block">beforeRouteUpdate(to, from) {
  // 可以访问this
  // 当路由参数变化时重新获取数据
  if (to.params.id !== from.params.id) {
    this.fetchArticle(to.params.id);
  }
}</pre>
          </div>
        </div>

        <div class="sub-guard-section">
          <h3><span class="icon">⬅️</span> beforeRouteLeave</h3>
          <div class="guard-details">
            <div class="detail-card">
              <h4><span class="icon">⏱️</span> 触发时机</h4>
              <p>在离开该组件的对应路由时调用</p>
            </div>
            <div class="detail-card">
              <h4><span class="icon">🎯</span> 特点</h4>
              <p>可以访问组件实例 (this)</p>
            </div>
            <div class="detail-card">
              <h4><span class="icon">💡</span> 使用场景</h4>
              <p>防止用户在未保存更改时离开页面</p>
            </div>
          </div>
          <div class="code-example">
            <pre class="code-block">beforeRouteLeave(to, from) {
  // 检查表单是否已修改
  if (this.formModified) {
    // 确认用户是否要离开
    const answer = window.confirm('您有未保存的更改，确定要离开吗？');
    if (!answer) return false; // 取消导航
  }
}</pre>
          </div>
        </div>
      </section>

      <!-- 守卫执行顺序 -->
      <section id="execution-order" class="guard-section">
        <div class="section-header">
          <div class="section-icon">⏩</div>
          <h2>守卫执行顺序</h2>
        </div>

        <div class="execution-flow">
          <div class="flow-step">
            <div class="step-number">1</div>
            <div class="step-title">导航触发</div>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="step-number">2</div>
            <div class="step-title">失活组件 beforeRouteLeave</div>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="step-number">3</div>
            <div class="step-title">全局 beforeEach</div>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="step-number">4</div>
            <div class="step-title">路由独享 beforeEnter</div>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="step-number">5</div>
            <div class="step-title">激活组件 beforeRouteEnter</div>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="step-number">6</div>
            <div class="step-title">全局 beforeResolve</div>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="step-number">7</div>
            <div class="step-title">导航确认</div>
          </div>

          <div class="flow-arrow">→</div>

          <div class="flow-step">
            <div class="step-number">8</div>
            <div class="step-title">全局 afterEach</div>
          </div>
        </div>

        <div class="important-note">
          <h3><span class="icon">📌</span> 重要提示</h3>
          <p>beforeRouteUpdate 在组件复用时触发，不在此主流程中</p>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <h3>路由守卫最佳实践</h3>
        <div class="principles">
          <div class="principle">
            <div class="principle-icon">✅</div>
            <p>守卫中应始终调用 next() 方法</p>
          </div>
          <div class="principle">
            <div class="principle-icon">🚫</div>
            <p>避免在守卫中进行复杂业务逻辑</p>
          </div>
          <div class="principle">
            <div class="principle-icon">⚖️</div>
            <p>合理分配全局和局部守卫职责</p>
          </div>
        </div>
        <p class="footer-note">合理使用路由守卫，构建安全可控的导航系统</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tocItems = ref([
  {
    id: 'before-each',
    title: '全局前置守卫',
    description: '路由导航开始时触发',
    type: 'global',
    typeLabel: '全局'
  },
  {
    id: 'before-resolve',
    title: '全局解析守卫',
    description: '导航确认前，异步组件解析后',
    type: 'global',
    typeLabel: '全局'
  },
  {
    id: 'after-each',
    title: '全局后置钩子',
    description: '导航完成后触发',
    type: 'global',
    typeLabel: '全局'
  },
  {
    id: 'before-enter',
    title: '路由独享守卫',
    description: '进入特定路由时触发',
    type: 'per-route',
    typeLabel: '路由独享'
  },
  {
    id: 'in-component',
    title: '组件内守卫',
    description: '组件内部定义的路由守卫',
    type: 'component',
    typeLabel: '组件内'
  },
  {
    id: 'execution-order',
    title: '守卫执行顺序',
    description: '完整导航解析流程',
    type: 'order',
    typeLabel: '流程'
  }
]);

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style lang="less" scoped>


:root {
  --primary-color: #42b883;
  --primary-light: #e8f8f2;
  --secondary-color: #35495e;
  --accent-color: #ff7e67;
  --light-bg: #f8f9fa;
  --card-bg: #ffffff;
  --border-color: #eaeaea;
  --text-dark: #2c3e50;
  --text-light: #6c757d;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --global-color: #4d7cff;
  --per-route-color: #9c27b0;
  --component-color: #00bcd4;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.router-guards-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--text-dark);
  line-height: 1.6;
  background-color: var(--light-bg);
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);

  .title-section {
    flex: 1;
    min-width: 300px;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--secondary-color);
      margin-bottom: 0.5rem;

      .highlight {
        color: var(--primary-color);
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
          border-radius: 2px;
        }
      }
    }

    .subtitle {
      font-size: 1.25rem;
      color: var(--text-light);
      font-weight: 400;
      max-width: 600px;
    }
  }

  .stats-card {
    display: flex;
    gap: 1.5rem;
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    box-shadow: var(--shadow-md);

    .stat-item {
      text-align: center;

      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.9rem;
        color: var(--text-light);
      }
    }
  }
}

.intro-section {
  margin-bottom: 3rem;

  .intro-card {
    background: var(--card-bg);
    border-radius: var(--radius-md);
    padding: 2rem;
    box-shadow: var(--shadow-sm);

    h2 {
      font-size: 1.8rem;
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.1rem;
      color: var(--text-light);
      margin-bottom: 1.5rem;
    }

    .navigation-flow {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
      margin-top: 1.5rem;

      .flow-step {
        text-align: center;

        .flow-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .flow-text {
          font-weight: 500;
        }
      }

      .flow-arrow {
        font-size: 1.5rem;
        color: var(--text-light);
      }
    }
  }
}

.section-title {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--primary-light);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 80px;
    height: 2px;
    background-color: var(--primary-color);
  }
}

.toc-section {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-sm);

  .toc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;

    .toc-item {
      display: flex;
      gap: 1rem;
      padding: 1.25rem;
      border-radius: var(--radius-sm);
      background: var(--light-bg);
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid transparent;
      position: relative;
      overflow: hidden;

      &:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-sm);
        background: var(--primary-light);
      }

      .toc-number {
        width: 36px;
        height: 36px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.1rem;
        flex-shrink: 0;
      }

      .toc-content {
        flex: 1;

        h3 {
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
          color: var(--secondary-color);
        }

        p {
          font-size: 0.9rem;
          color: var(--text-light);
          margin: 0;
        }
      }

      .guard-type {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.25rem 0.75rem;
        font-size: 0.75rem;
        font-weight: 600;
        border-radius: 0 8px 0 8px;
        color: white;

        &.global {
          background: var(--global-color);
        }

        &.per-route {
          background: var(--per-route-color);
        }

        &.component {
          background: var(--component-color);
        }

        &.order {
          background: var(--accent-color);
        }
      }
    }
  }
}

.guards-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.guard-section {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  padding: 2rem;
  box-shadow: var(--shadow-sm);

  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    position: relative;

    .section-icon {
      font-size: 2rem;
      width: 60px;
      height: 60px;
      background: var(--primary-light);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h2 {
      font-size: 1.8rem;
      color: var(--secondary-color);
    }

    .guard-tag {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-left: auto;

      &.global {
        background: rgba(77, 124, 255, 0.1);
        color: var(--global-color);
        border: 1px solid var(--global-color);
      }

      &.per-route {
        background: rgba(156, 39, 176, 0.1);
        color: var(--per-route-color);
        border: 1px solid var(--per-route-color);
      }

      &.component {
        background: rgba(0, 188, 212, 0.1);
        color: var(--component-color);
        border: 1px solid var(--component-color);
      }
    }
  }

  .section-desc {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 1.5rem;
    padding-left: 72px;
  }
}

.guard-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .detail-card {
    background: var(--light-bg);
    border-radius: var(--radius-sm);
    padding: 1.5rem;

    h3,
    h4 {
      font-size: 1.2rem;
      color: var(--secondary-color);
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .icon {
        font-size: 1.25rem;
      }
    }

    p,
    ul {
      font-size: 1rem;
      color: var(--text-light);
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
        position: relative;

        &::marker {
          color: var(--primary-color);
        }
      }
    }
  }
}

.sub-guard-section {
  background: rgba(66, 184, 131, 0.05);
  border-radius: var(--radius-sm);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 3px solid var(--primary-color);

  h3 {
    font-size: 1.3rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      font-size: 1.5rem;
    }
  }

  .guard-details {
    margin-bottom: 1rem;
  }
}

.code-example {
  margin-bottom: 2rem;

  h3 {
    font-size: 1.2rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      font-size: 1.25rem;
    }
  }
}

.important-note {
  background: rgba(255, 167, 38, 0.1);
  border-left: 3px solid #ffa726;
  border-radius: var(--radius-sm);
  padding: 1.25rem;
  margin-top: 1.5rem;

  h3 {
    font-size: 1.2rem;
    color: #ffa726;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      font-size: 1.25rem;
    }
  }

  p {
    color: #ef6c00;
    font-size: 1rem;

    code {
      background: rgba(0, 0, 0, 0.05);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: monospace;
    }
  }
}

.code-block {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 1.25rem;
  margin: 0;
  font-size: 0.9rem;
  font-family: 'JetBrains Mono', monospace;
  overflow-x: auto;
  line-height: 1.5;
  border-radius: var(--radius-sm);

  // 语法高亮（简化版）
  .tag {
    color: #e06c75;
  }

  .attr {
    color: #d19a66;
  }

  .str {
    color: #98c379;
  }

  .key {
    color: #61afef;
  }

  .com {
    color: #5c6370;
  }
}

.execution-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 2rem 0;

  .flow-step {
    flex: 1;
    min-width: 120px;
    text-align: center;
    background: var(--primary-light);
    border-radius: var(--radius-sm);
    padding: 1rem;

    .step-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .step-title {
      font-weight: 500;
      font-size: 0.9rem;
    }
  }

  .flow-arrow {
    color: var(--text-light);
    font-size: 1.25rem;
    padding: 0 0.5rem;
  }
}

.footer {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  padding: 2.5rem;
  margin-top: 3rem;
  box-shadow: var(--shadow-sm);

  .footer-content {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      color: var(--secondary-color);
    }

    .principles {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-bottom: 1.5rem;

      .principle {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1.25rem;
        background: var(--light-bg);
        border-radius: 50px;

        .principle-icon {
          font-size: 1.5rem;
        }

        p {
          font-weight: 500;
          margin: 0;
        }
      }
    }

    .footer-note {
      font-style: italic;
      color: var(--text-light);
      font-size: 1.1rem;
      max-width: 600px;
    }
  }
}

// 添加媒体查询确保响应式布局
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;

    .stats-card {
      width: 100%;
      justify-content: space-around;
    }
  }

  .toc-grid {
    grid-template-columns: 1fr !important;
  }

  .guard-details {
    grid-template-columns: 1fr !important;
  }

  .guard-section {
    padding: 1.5rem;
  }

  .execution-flow {
    flex-direction: column;

    .flow-arrow {
      transform: rotate(90deg) !important;
      padding: 0.5rem 0 !important;
    }
  }

  .navigation-flow {
    flex-wrap: wrap;
    gap: 0.5rem !important;

    .flow-arrow {
      display: none;
    }
  }

  .footer {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header .title-section h1 {
    font-size: 1.8rem;
  }

  .intro-card h2 {
    font-size: 1.5rem;
  }

  .guard-section .section-header {
    flex-wrap: wrap;

    h2 {
      font-size: 1.4rem;
    }

    .guard-tag {
      margin-left: 0;
      margin-top: 1rem;
    }
  }

  .stats-card {
    gap: 0.5rem;
    padding: 1rem !important;

    .stat-item {
      .stat-value {
        font-size: 1.5rem !important;
      }
    }
  }

  .code-block {
    font-size: 0.8rem;
    padding: 1rem;
  }
}

// 滚动条美化
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--light-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 4px;
}

// 平滑滚动
html {
  scroll-behavior: smooth;
}

// 锚点定位偏移
[id] {
  scroll-margin-top: 80px;
}

// 代码块语法高亮增强
.code-block {
  position: relative;

  &::after {
    content: 'JS';
    position: absolute;
    top: 8px;
    right: 8px;
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 1px;
  }
}

// 添加悬浮效果增强交互性
.toc-item,
.guard-section,
.intro-card,
.stats-card,
.detail-card {
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }
}

// 添加动画效果
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.guard-section {
  animation: fadeIn 0.6s ease-out forwards;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }

  &:nth-child(4) {
    animation-delay: 0.4s;
  }

  &:nth-child(5) {
    animation-delay: 0.5s;
  }

  &:nth-child(6) {
    animation-delay: 0.6s;
  }
}

// 打印优化
@media print {
  .router-guards-container {
    padding: 0.5cm;
    font-size: 12pt;
  }

  .stats-card,
  .toc-grid,
  .intro-card .navigation-flow,
  .footer {
    display: none;
  }

  .code-block {
    page-break-inside: avoid;
  }
}
</style>
