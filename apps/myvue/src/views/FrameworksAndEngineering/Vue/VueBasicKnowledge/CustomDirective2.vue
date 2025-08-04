<template>
  <div class="custom-directives-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>Vue自定义指令实用指南</h1>
        <p class="subtitle">提升大型项目的开发效率与代码复用性</p>
      </div>
    </header>

    <div class="content">
      <section class="intro-section">
        <div class="intro-card">
          <h2>什么是自定义指令？</h2>
          <p>
            自定义指令是Vue提供的一种强大机制，允许开发者封装DOM操作逻辑，在大型项目中实现代码复用、关注点分离和功能抽象。
            通过自定义指令，我们可以创建可重用的行为，这些行为可以附加到任何元素上，从而减少重复代码并提高开发效率。
          </p>
          <div class="directive-flow">
            <div class="flow-step">
              <div class="step-icon">1</div>
              <div class="step-content">
                <h3>指令注册</h3>
                <p>全局或局部注册自定义指令</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">2</div>
              <div class="step-content">
                <h3>指令绑定</h3>
                <p>在模板中使用v-指令名</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">3</div>
              <div class="step-content">
                <h3>指令执行</h3>
                <p>在生命周期钩子中实现逻辑</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="directives-section">
        <h2 class="section-title">大型项目实用指令集</h2>

        <div class="directive-grid">
          <div
            v-for="(directive, index) in directives"
            :key="index"
            class="directive-card"
            :class="{ featured: directive.featured }"
          >
            <div class="card-header">
              <div class="directive-name">v-{{ directive.name }}</div>
              <div class="directive-tags">
                <span v-for="(tag, tagIndex) in directive.tags" :key="tagIndex" class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="card-body">
              <div class="description">
                {{ directive.description }}
              </div>

              <div class="details">
                <div class="detail-item">
                  <div class="detail-icon">🎯</div>
                  <h4>适用场景</h4>
                  <ul>
                    <li v-for="(scenario, sIndex) in directive.scenarios" :key="sIndex">
                      {{ scenario }}
                    </li>
                  </ul>
                </div>

                <div class="code-example">
                  <h4>实现代码</h4>
                  <pre><code>{{ directive.code }}</code></pre>
                </div>
              </div>

              <div class="usage-example">
                <h4>使用示例</h4>
                <pre><code>{{ directive.usage }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2 class="section-title">自定义指令最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card" v-for="(practice, index) in bestPractices" :key="index">
            <div class="practice-number">{{ index + 1 }}</div>
            <div class="practice-content">
              <h3>{{ practice.title }}</h3>
              <p>{{ practice.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2 class="section-title">指令 vs 组件 vs Mixins</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="col-criteria">特性</div>
            <div class="col-type">自定义指令</div>
            <div class="col-type">组件</div>
            <div class="col-type">Mixins</div>
          </div>
          <div class="table-row" v-for="(row, index) in comparisonData" :key="index">
            <div class="col-criteria">{{ row.criteria }}</div>
            <div class="col-type">{{ row.directive }}</div>
            <div class="col-type">{{ row.component }}</div>
            <div class="col-type">{{ row.mixin }}</div>
          </div>
        </div>
      </section>

      <section class="advanced-section">
        <h2 class="section-title">高级指令模式</h2>
        <div class="advanced-grid">
          <div class="pattern-card" v-for="(pattern, index) in advancedPatterns" :key="index">
            <div class="pattern-icon">{{ pattern.icon }}</div>
            <div class="pattern-content">
              <h3>{{ pattern.title }}</h3>
              <p>{{ pattern.description }}</p>
              <div class="pattern-example">
                <pre><code>{{ pattern.example }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>自定义指令是Vue生态中强大的抽象工具，在大型项目中合理使用可以显著提升开发效率和代码质量</p>
      <div class="resources">
        <h3>推荐资源：</h3>
        <ul>
          <li>
            <a href="https://vuejs.org/guide/reusability/custom-directives.html" target="_blank"
              >Vue官方自定义指令文档</a
            >
          </li>
          <li>
            <a href="https://github.com/vuejs/awesome-vue#custom-directives" target="_blank"
              >Awesome Vue指令集合</a
            >
          </li>
          <li>
            <a
              href="https://dev.to/raha198/vue-custom-directives-with-examples-1d8m"
              target="_blank"
              >实用指令案例</a
            >
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const directives = ref([
  {
    name: 'debounce',
    featured: true,
    tags: ['性能优化', '表单处理'],
    description: '为事件处理函数添加防抖功能，防止高频触发导致的性能问题',
    scenarios: ['搜索框输入联想', '窗口大小调整事件', '按钮防重复点击', '滚动事件处理'],
    code: `// 防抖指令实现
const debounce = {
  mounted(el, binding) {
    let delay = binding.value?.delay || 300;
    let immediate = binding.value?.immediate || false;

    let timeout;
    el.addEventListener('input', () => {
      if (immediate && !timeout) {
        binding.value.fn();
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!immediate) {
          binding.value.fn();
        }
        timeout = null;
      }, delay);
    });
  }
};

// 全局注册
app.directive('debounce', debounce);`,
    usage: `<template>
  <input
    v-debounce="{
      fn: search,
      delay: 500
    }"
    placeholder="输入搜索关键词..."
  >
</template>`,
  },
  {
    name: 'permission',
    featured: true,
    tags: ['权限控制', '安全性'],
    description: '基于用户角色或权限动态显示/隐藏UI元素',
    scenarios: ['管理后台权限控制', '功能模块可见性管理', '按钮级权限控制', '内容访问限制'],
    code: `// 权限指令实现
const permission = {
  mounted(el, binding) {
    const { value } = binding;
    const roles = store.getters.roles; // 从Vuex获取用户角色

    if (value && Array.isArray(value)) {
      const hasPermission = roles.some(role => value.includes(role));

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error('需要传入权限数组，如 v-permission="[\'admin\']"');
    }
  }
};

// 全局注册
app.directive('permission', permission);`,
    usage: `<template>
  <button v-permission="['admin', 'editor']">
    编辑内容
  </button>
</template>`,
  },
  {
    name: 'click-outside',
    featured: true,
    tags: ['UI交互', '用户体验'],
    description: '检测点击元素外部区域时触发回调，常用于下拉菜单、模态框等组件',
    scenarios: ['下拉菜单关闭', '模态框点击外部关闭', '弹出层关闭', '上下文菜单隐藏'],
    code: `// 点击外部指令实现
const clickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = event => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};

// 全局注册
app.directive('click-outside', clickOutside);`,
    usage: `<template>
  <div v-click-outside="closeDropdown">
    <!-- 下拉菜单内容 -->
  </div>
</template>

<script setup>
const closeDropdown = () => {
  // 关闭下拉菜单逻辑
};
\</script\>`,
  },
  {
    name: 'tooltip',
    featured: true,
    tags: ['UI组件', '用户体验'],
    description: '为元素添加工具提示，支持自定义内容、位置和样式',
    scenarios: ['表单字段说明', '图标功能提示', '按钮功能解释', '数据项详细信息'],
    code: `// 工具提示指令实现
const tooltip = {
  mounted(el, binding) {
    const tooltipText = binding.value || '提示信息';
    const position = binding.arg || 'top';

    // 创建工具提示元素
    const tooltipEl = document.createElement('div');
    tooltipEl.className = 'v-tooltip';
    tooltipEl.textContent = tooltipText;

    // 设置位置
    tooltipEl.classList.add(\`tooltip-\${position}\`);

    // 添加到DOM
    document.body.appendChild(tooltipEl);

    // 事件监听
    el.addEventListener('mouseenter', () => {
      const rect = el.getBoundingClientRect();
      // 定位计算逻辑...
      tooltipEl.style.display = 'block';
    });

    el.addEventListener('mouseleave', () => {
      tooltipEl.style.display = 'none';
    });

    // 保存引用
    el._tooltip = tooltipEl;
  },
  unmounted(el) {
    if (el._tooltip) {
      document.body.removeChild(el._tooltip);
      delete el._tooltip;
    }
  }
};

// 全局注册
app.directive('tooltip', tooltip);`,
    usage: `<template>
  <button
    v-tooltip.top="'保存当前内容'"
    class="save-btn"
  >
    保存
  </button>
</template>`,
  },
  {
    name: 'copy',
    tags: ['工具类', '用户交互'],
    description: '一键复制文本内容到剪贴板，提升用户操作效率',
    scenarios: ['复制链接', '复制代码片段', '复制配置信息', '分享内容复制'],
    code: `// 复制指令实现
const copy = {
  mounted(el, binding) {
    el.copyHandler = () => {
      const text = binding.value || el.innerText;

      // 使用现代剪贴板API
      navigator.clipboard.writeText(text).then(() => {
        // 显示成功反馈
        if (binding.arg === 'feedback') {
          showSuccessFeedback('复制成功!');
        }
      }).catch(err => {
        console.error('复制失败:', err);
      });
    };

    el.addEventListener('click', el.copyHandler);
  },
  unmounted(el) {
    el.removeEventListener('click', el.copyHandler);
  }
};

// 全局注册
app.directive('copy', copy);`,
    usage: `<template>
  <div v-copy.feedback="'https://example.com'">
    点击复制链接
  </div>
</template>`,
  },
  {
    name: 'lazy-load',
    tags: ['性能优化', '媒体处理'],
    description: '延迟加载图片或其他资源，提升页面加载性能',
    scenarios: ['长列表图片加载', '图库应用', '内容密集型页面', '移动端优化'],
    code: `// 懒加载指令实现
const lazyLoad = {
  mounted(el, binding) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = el;
          img.src = binding.value;
          observer.unobserve(el);
        }
      });
    }, options);

    observer.observe(el);
  }
};

// 全局注册
app.directive('lazy-load', lazyLoad);`,
    usage: `<template>
  <img
    v-lazy-load="imageUrl"
    alt="示例图片"
  >
</template>`,
  },
  {
    name: 'focus',
    tags: ['表单处理', '用户体验'],
    description: '自动聚焦元素，常用于表单输入框和搜索框',
    scenarios: [
      '模态框打开时聚焦输入框',
      '搜索页面自动聚焦搜索框',
      '表单错误后重新聚焦',
      '交互流程中需要聚焦的场景',
    ],
    code: `// 聚焦指令实现
const focus = {
  mounted(el) {
    el.focus();
  },
  updated(el) {
    if (el.dataset.focus === 'true') {
      el.focus();
    }
  }
};

// 全局注册
app.directive('focus', focus);`,
    usage: `<template>
  <input
    v-focus
    placeholder="自动聚焦的输入框"
  >

  <!-- 条件聚焦 -->
  <input
    v-focus
    :data-focus="shouldFocus"
  >
</template>`,
  },
  {
    name: 'longpress',
    tags: ['移动端', '交互增强'],
    description: '检测长按事件，支持移动端和桌面端的长时间按压交互',
    scenarios: ['移动端长按菜单', '图片长按保存', '消息长按删除', '特殊交互功能'],
    code: `// 长按指令实现
const longpress = {
  mounted(el, binding) {
    const duration = binding.value?.duration || 700;

    let pressTimer;

    const start = (e) => {
      if (e.button !== 0) return;

      pressTimer = setTimeout(() => {
        binding.value.fn();
      }, duration);
    };

    const cancel = () => {
      clearTimeout(pressTimer);
    };

    el.addEventListener('mousedown', start);
    el.addEventListener('touchstart', start);
    el.addEventListener('mouseup', cancel);
    el.addEventListener('touchend', cancel);
    el.addEventListener('mouseleave', cancel);
  }
};

// 全局注册
app.directive('longpress', longpress);`,
    usage: `<template>
  <button
    v-longpress="{
      fn: deleteItem,
      duration: 1000
    }"
  >
    长按删除
  </button>
</template>`,
  },
])

const bestPractices = ref([
  {
    title: '全局注册常用指令',
    description: '在大型项目中，将常用指令全局注册可提高复用性和一致性',
  },
  {
    title: '封装复杂DOM操作',
    description: '将复杂的DOM操作封装在指令中，保持组件逻辑简洁',
  },
  {
    title: '提供灵活的参数选项',
    description: '设计指令时支持多种参数配置，增强指令的灵活性',
  },
  {
    title: '注意内存管理',
    description: '在unmounted生命周期中清理事件监听器和DOM引用，防止内存泄漏',
  },
  {
    title: '统一指令命名规范',
    description: '项目中使用一致的指令命名规范（如v-permission而不是v-auth）',
  },
  {
    title: '编写指令文档',
    description: '为自定义指令编写使用文档，便于团队协作和知识共享',
  },
])

const comparisonData = ref([
  { criteria: '主要用途', directive: 'DOM操作', component: 'UI复用', mixin: '逻辑复用' },
  { criteria: '作用范围', directive: '单个元素', component: '模板片段', mixin: '组件选项' },
  { criteria: '复用性', directive: '高', component: '高', mixin: '中' },
  { criteria: '封装性', directive: '高', component: '高', mixin: '低' },
  { criteria: '侵入性', directive: '低', component: '低', mixin: '高' },
  {
    criteria: '适用场景',
    directive: '通用DOM行为',
    component: '可重用UI部件',
    mixin: '跨组件共享逻辑',
  },
])

const advancedPatterns = ref([
  {
    icon: '🔄',
    title: '动态参数指令',
    description: '根据参数动态改变指令行为，支持多种配置选项',
    example: `// 使用示例
<button
  v-tooltip="{
    content: '动态提示',
    position: 'right',
    theme: 'dark'
  }"
>
  按钮
</button>`,
  },
  {
    icon: '🎚️',
    title: '修饰符模式',
    description: '使用修饰符改变指令行为，提供更简洁的API',
    example: `// 使用示例
<input
  v-debounce.500.immediate="search"
  placeholder="带修饰符的防抖"
>`,
  },
  {
    icon: '🧩',
    title: '指令组合',
    description: '组合多个指令实现复杂交互，同时保持代码清晰',
    example: `// 使用示例
<div
  v-permission="['admin']"
  v-tooltip="'管理员专属功能'"
>
  管理员面板
</div>`,
  },
  {
    icon: '📦',
    title: '指令库封装',
    description: '将指令组织为独立库，支持按需加载和版本管理',
    example: `// 使用示例
import { debounce, tooltip } from '@company/vue-directives';

app.directive('debounce', debounce);
app.directive('tooltip', tooltip);`,
  },
])
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary-color: #4a6cf7;
@primary-light: #e6eeff;
@secondary-color: #3a56d4;
@accent-color: #ff9800;
@text-color: #2c3e50;
@light-gray: #f8f9fc;
@border-color: #e0e6ed;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #4caf50;
@warning-color: #ffc107;

// 基础样式
.custom-directives-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid @border-color;

  .title-wrapper {
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: @secondary-color;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.3rem;
      color: #666;
      font-weight: 300;
    }
  }
}

.demo-area {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;

  .demo-box {
    background: @primary-light;
    border: 2px dashed @primary-color;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: lighten(@primary-light, 2%);
      box-shadow: 0 6px 20px rgba(@primary-color, 0.1);
    }

    .demo-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .demo-text {
      font-size: 1.1rem;
      color: @primary-color;
      font-weight: 500;
    }
  }
}

.content {
  display: grid;
  gap: 3rem;
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, @primary-color, @accent-color);
    border-radius: 2px;
  }
}

.intro-section {
  .intro-card {
    background: @light-gray;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: @card-shadow;

    h2 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
    }

    p {
      margin-bottom: 2rem;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  .directive-flow {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 1.5rem;

    .flow-step {
      flex: 1;
      min-width: 200px;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: @card-shadow;

      .step-icon {
        width: 50px;
        height: 50px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }

      h3 {
        color: @primary-color;
        margin: 0.5rem 0;
        font-size: 1.3rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: #666;
      }
    }

    .flow-arrow {
      display: flex;
      align-items: center;
      color: #777;
      font-weight: 700;
      min-width: 50px;
      text-align: center;
      font-size: 1.5rem;

      @media (max-width: 768px) {
        transform: rotate(90deg);
        margin: 1rem 0;
      }
    }
  }
}

.directives-section {
  .directive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 1.8rem;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .directive-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    }

    &.featured {
      border-top: 4px solid @accent-color;
    }

    .card-header {
      padding: 1.2rem 1.5rem;
      background: @primary-light;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .directive-name {
        font-size: 1.4rem;
        font-weight: 700;
        color: @primary-color;
      }
    }

    .directive-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;

      .tag {
        background: white;
        color: @primary-color;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        border: 1px solid fade(@primary-color, 30%);
      }
    }

    .card-body {
      padding: 1.5rem;

      .description {
        margin-bottom: 1.5rem;
        font-size: 1rem;
        line-height: 1.7;
        color: #555;
      }

      .details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 1.5rem;

        @media (max-width: 900px) {
          grid-template-columns: 1fr;
        }

        .detail-item {
          h4 {
            color: @secondary-color;
            margin-top: 0;
            margin-bottom: 0.8rem;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;

            .detail-icon {
              font-size: 1.2rem;
            }
          }

          ul {
            padding-left: 1.5rem;
            margin: 0;

            li {
              margin-bottom: 0.5rem;
              font-size: 0.95rem;
              line-height: 1.6;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }

      .code-example,
      .usage-example {
        margin-bottom: 1.5rem;

        h4 {
          color: @secondary-color;
          margin-top: 0;
          margin-bottom: 0.8rem;
          font-size: 1.1rem;
        }

        pre {
          background: #2d2d2d;
          border-radius: 8px;
          padding: 1.2rem;
          overflow-x: auto;

          code {
            font-family: 'Courier New', monospace;
            color: #f8f8f2;
            font-size: 0.95rem;
            line-height: 1.6;

            .comment {
              color: #6a9955;
            }
            .keyword {
              color: #c586c0;
            }
            .function {
              color: #dcdcaa;
            }
            .string {
              color: #ce9178;
            }
          }
        }
      }
    }
  }
}

.best-practices {
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .practice-card {
    display: flex;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .practice-number {
      width: 60px;
      min-height: 100%;
      background: @primary-color;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .practice-content {
      padding: 1.5rem;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.25rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.7;
      }
    }
  }
}

.comparison-section {
  .comparison-table {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;

    .table-header {
      display: flex;
      background: @primary-color;
      color: white;
      font-weight: 500;

      > div {
        padding: 1.2rem 1.5rem;
        flex: 1;
        text-align: center;
      }

      .col-criteria {
        flex: 1.5;
        text-align: left;
      }
    }

    .table-row {
      display: flex;
      border-bottom: 1px solid @border-color;

      &:nth-child(even) {
        background: @light-gray;
      }

      &:last-child {
        border-bottom: none;
      }

      > div {
        padding: 1.2rem 1.5rem;
        flex: 1;
        display: flex;
        align-items: center;
      }

      .col-criteria {
        flex: 1.5;
        font-weight: 500;
      }

      .col-type {
        text-align: center;
        justify-content: center;
      }
    }
  }
}

.advanced-section {
  .advanced-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .pattern-card {
    display: flex;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @card-shadow;
    gap: 1.2rem;
    border-top: 3px solid @primary-color;

    .pattern-icon {
      width: 50px;
      height: 50px;
      background: @primary-light;
      color: @primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .pattern-content {
      flex: 1;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }

      p {
        margin: 0 0 1rem;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.7;
      }
    }

    .pattern-example {
      background: #2d2d2d;
      border-radius: 6px;
      padding: 0.8rem;
      margin-top: 0.5rem;

      pre {
        margin: 0;

        code {
          font-family: 'Courier New', monospace;
          color: #f8f8f2;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }
  }
}

.footer {
  margin-top: 4rem;
  padding: 2rem;
  text-align: center;
  background: @light-gray;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 500;
  color: @secondary-color;
  box-shadow: @card-shadow;
  border-top: 2px solid fade(@primary-color, 30%);

  p {
    margin-bottom: 1.5rem;
  }

  .resources {
    margin-top: 1.5rem;

    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;

      li a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .custom-directives-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .intro-card {
    padding: 1.5rem !important;
  }

  .directive-grid {
    grid-template-columns: 1fr !important;
  }

  .details {
    grid-template-columns: 1fr !important;
  }
}
</style>
