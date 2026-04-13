<template>
  <div class="web-fundamentals">
    <header class="page-header">
      <div class="header-content">
        <h1>Web前端三要素</h1>
        <p class="subtitle">HTML + CSS + JavaScript = 现代Web应用</p>
        <div class="header-stats">
          <div class="stat">
            <span class="stat-icon">🌐</span>
            <span class="stat-label">HTML</span>
          </div>
          <div class="stat">
            <span class="stat-icon">🎨</span>
            <span class="stat-label">CSS</span>
          </div>
          <div class="stat">
            <span class="stat-icon">⚡</span>
            <span class="stat-label">JavaScript</span>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="intro-content">
          <h2>为什么需要三要素？</h2>
          <p>HTML、CSS和JavaScript是构建现代Web应用的三大基石，它们各司其职，共同协作，创造出丰富多样的用户体验。</p>
          <div class="analogy">
            <div class="analogy-card">
              <h3>🏗️ 建筑类比</h3>
              <div class="analogy-content">
                <div class="analogy-item">
                  <span class="item-icon">📐</span>
                  <div class="item-text">
                    <strong>HTML - 建筑结构</strong>
                    <span>定义房屋的框架和房间布局</span>
                  </div>
                </div>
                <div class="analogy-item">
                  <span class="item-icon">🎨</span>
                  <div class="item-text">
                    <strong>CSS - 装修设计</strong>
                    <span>决定墙面颜色、家具风格和装饰</span>
                  </div>
                </div>
                <div class="analogy-item">
                  <span class="item-icon">🔌</span>
                  <div class="item-text">
                    <strong>JavaScript - 电器设备</strong>
                    <span>提供灯光、电梯、空调等交互功能</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relationship-section">
        <h2 class="section-title">三要素协作关系</h2>
        <div class="relationship-diagram">
          <div class="tech-flow">
            <div class="flow-step">
              <div class="step-card html-step">
                <div class="step-icon">🌐</div>
                <div class="step-content">
                  <h3>HTML</h3>
                  <p>结构层</p>
                </div>
              </div>
              <div class="step-arrow">→</div>
            </div>
            <div class="flow-step">
              <div class="step-card css-step">
                <div class="step-icon">🎨</div>
                <div class="step-content">
                  <h3>CSS</h3>
                  <p>表现层</p>
                </div>
              </div>
              <div class="step-arrow">→</div>
            </div>
            <div class="flow-step">
              <div class="step-card js-step">
                <div class="step-icon">⚡</div>
                <div class="step-content">
                  <h3>JavaScript</h3>
                  <p>行为层</p>
                </div>
              </div>
            </div>
          </div>
          <div class="collaboration-example">
            <h3>协作示例：按钮组件</h3>
            <div class="example-code">
              <div class="code-tabs">
                <button
                  v-for="tab in codeTabs"
                  :key="tab.id"
                  class="code-tab"
                  :class="{ active: activeTab === tab.id }"
                  @click="activeTab = tab.id"
                >
                  {{ tab.name }}
                </button>
              </div>
              <div class="code-content">
                <pre v-show="activeTab === 'html'"><code class="html">{{ buttonExample.html }}</code></pre>
                <pre v-show="activeTab === 'css'"><code class="css">{{ buttonExample.css }}</code></pre>
                <pre v-show="activeTab === 'js'"><code class="javascript">{{ buttonExample.js }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="tech-details-section">
        <h2 class="section-title">技术详解</h2>
        <div class="tech-tabs">
          <button
            v-for="tech in technologies"
            :key="tech.id"
            class="tech-tab"
            :class="{ active: activeTech === tech.id }"
            @click="activeTech = tech.id"
          >
            <span class="tab-icon">{{ tech.icon }}</span>
            {{ tech.name }}
          </button>
        </div>

        <div class="tech-content">
          <div
            v-for="tech in technologies"
            :key="tech.id"
            v-show="activeTech === tech.id"
            class="tech-detail"
          >
            <div class="tech-header">
              <h3>{{ tech.name }} - {{ tech.fullName }}</h3>
              <div class="tech-meta">
                <span class="meta-tag role">{{ tech.role }}</span>
                <span class="meta-tag year">📅 {{ tech.year }}</span>
                <span class="meta-tag type">{{ tech.type }}</span>
              </div>
            </div>

            <div class="tech-body">
              <div class="description-section">
                <h4>核心功能</h4>
                <p>{{ tech.description }}</p>
              </div>

              <div class="features-section">
                <h4>主要特性</h4>
                <div class="features-grid">
                  <div
                    v-for="feature in tech.features"
                    :key="feature.name"
                    class="feature-card"
                  >
                    <div class="feature-icon">{{ feature.icon }}</div>
                    <div class="feature-content">
                      <h5>{{ feature.name }}</h5>
                      <p>{{ feature.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="syntax-section">
                <h4>基础语法</h4>
                <div class="syntax-examples">
                  <div
                    v-for="example in tech.syntax"
                    :key="example.title"
                    class="syntax-example"
                  >
                    <h5>{{ example.title }}</h5>
                    <pre><code :class="tech.id">{{ example.code }}</code></pre>
                    <p class="example-desc">{{ example.description }}</p>
                  </div>
                </div>
              </div>

              <div class="best-practices">
                <h4>最佳实践</h4>
                <div class="practices-list">
                  <div
                    v-for="practice in tech.bestPractices"
                    :key="practice"
                    class="practice-item"
                  >
                    <span class="check-icon">✅</span>
                    {{ practice }}
                  </div>
                </div>
              </div>

              <div class="version-evolution" v-if="tech.evolution">
                <h4>版本演进</h4>
                <div class="evolution-timeline">
                  <div
                    v-for="version in tech.evolution"
                    :key="version.name"
                    class="version-item"
                  >
                    <div class="version-marker"></div>
                    <div class="version-content">
                      <h5>{{ version.name }}</h5>
                      <p>{{ version.description }}</p>
                      <div class="version-features">
                        <span
                          v-for="feature in version.keyFeatures"
                          :key="feature"
                          class="feature-tag"
                        >{{ feature }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="workflow-section">
        <h2 class="section-title">开发工作流程</h2>
        <div class="workflow-steps">
          <div
            v-for="step in workflow"
            :key="step.id"
            class="workflow-step"
            :class="step.tech"
          >
            <div class="step-number">{{ step.order }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="step-output">
                <h4>输出结果：</h4>
                <p>{{ step.output }}</p>
              </div>
            </div>
            <div class="step-tech">
              <span class="tech-icon">{{ step.techIcon }}</span>
              <span class="tech-name">{{ step.techName }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="modern-ecosystem-section">
        <h2 class="section-title">现代前端生态</h2>
        <div class="ecosystem-content">
          <div class="ecosystem-intro">
            <p>随着Web技术的发展，三要素的基础上衍生出了丰富的工具链和框架，但它们仍然是所有现代前端技术的基石。</p>
          </div>

          <div class="ecosystem-layers">
            <div class="layer foundation-layer">
              <h3>🏗️ 基础层</h3>
              <div class="layer-techs">
                <div class="tech-pillar">
                  <div class="pillar-icon">🌐</div>
                  <div class="pillar-content">
                    <h4>HTML5</h4>
                    <p>语义化标签、Canvas、Web Storage</p>
                  </div>
                </div>
                <div class="tech-pillar">
                  <div class="pillar-icon">🎨</div>
                  <div class="pillar-content">
                    <h4>CSS3</h4>
                    <p>Flexbox、Grid、动画、变量</p>
                  </div>
                </div>
                <div class="tech-pillar">
                  <div class="pillar-icon">⚡</div>
                  <div class="pillar-content">
                    <h4>ES6+</h4>
                    <p>模块化、异步编程、类语法</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="layer framework-layer">
              <h3>🚀 框架层</h3>
              <div class="framework-grid">
                <div class="framework-card">
                  <h4>React</h4>
                  <p>基于组件和虚拟DOM</p>
                  <div class="framework-deps">
                    <span class="dep-tag">JSX</span>
                    <span class="dep-tag">组件</span>
                  </div>
                </div>
                <div class="framework-card">
                  <h4>Vue</h4>
                  <p>渐进式JavaScript框架</p>
                  <div class="framework-deps">
                    <span class="dep-tag">模板</span>
                    <span class="dep-tag">响应式</span>
                  </div>
                </div>
                <div class="framework-card">
                  <h4>Angular</h4>
                  <p>完整的MVVM框架</p>
                  <div class="framework-deps">
                    <span class="dep-tag">TypeScript</span>
                    <span class="dep-tag">依赖注入</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="layer tooling-layer">
              <h3>🔧 工具层</h3>
              <div class="tooling-grid">
                <div class="tooling-card">
                  <h4>构建工具</h4>
                  <p>Webpack、Vite、Parcel</p>
                </div>
                <div class="tooling-card">
                  <h4>包管理器</h4>
                  <p>npm、yarn、pnpm</p>
                </div>
                <div class="tooling-card">
                  <h4>开发工具</h4>
                  <p>VS Code、Chrome DevTools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="learning-path-section">
        <h2 class="section-title">学习路径建议</h2>
        <div class="learning-path">
          <div class="path-phase">
            <h3>🎯 初级阶段</h3>
            <div class="phase-content">
              <div class="learning-item">
                <span class="item-order">1</span>
                <div class="item-content">
                  <h4>HTML基础</h4>
                  <p>标签、属性、表单、语义化</p>
                </div>
              </div>
              <div class="learning-item">
                <span class="item-order">2</span>
                <div class="item-content">
                  <h4>CSS基础</h4>
                  <p>选择器、盒模型、定位、布局</p>
                </div>
              </div>
              <div class="learning-item">
                <span class="item-order">3</span>
                <div class="item-content">
                  <h4>JavaScript基础</h4>
                  <p>语法、DOM操作、事件处理</p>
                </div>
              </div>
            </div>
          </div>

          <div class="path-phase">
            <h3>🚀 进阶阶段</h3>
            <div class="phase-content">
              <div class="learning-item">
                <span class="item-order">4</span>
                <div class="item-content">
                  <h4>响应式设计</h4>
                  <p>媒体查询、移动端适配</p>
                </div>
              </div>
              <div class="learning-item">
                <span class="item-order">5</span>
                <div class="item-content">
                  <h4>CSS进阶</h4>
                  <p>Flexbox、Grid、动画、预处理</p>
                </div>
              </div>
              <div class="learning-item">
                <span class="item-order">6</span>
                <div class="item-content">
                  <h4>JavaScript进阶</h4>
                  <p>ES6+、异步编程、模块化</p>
                </div>
              </div>
            </div>
          </div>

          <div class="path-phase">
            <h3>🏆 高级阶段</h3>
            <div class="phase-content">
              <div class="learning-item">
                <span class="item-order">7</span>
                <div class="item-content">
                  <h4>框架学习</h4>
                  <p>React、Vue或Angular</p>
                </div>
              </div>
              <div class="learning-item">
                <span class="item-order">8</span>
                <div class="item-content">
                  <h4>工程化</h4>
                  <p>构建工具、包管理、自动化</p>
                </div>
              </div>
              <div class="learning-item">
                <span class="item-order">9</span>
                <div class="item-content">
                  <h4>性能优化</h4>
                  <p>加载优化、渲染优化、缓存策略</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 响应式数据
const activeTab = ref('html')
const activeTech = ref('html')

// 代码标签页
const codeTabs = ref([
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'js', name: 'JavaScript' }
])

// 按钮示例代码
const buttonExample = ref({
  html: `<!-- 定义按钮结构 -->
<button class="primary-button" id="demoButton">
  <span class="button-icon">🌟</span>
  点击我
</button>`,
  css: `/* 定义按钮样式 */
.primary-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.button-icon {
  margin-right: 8px;
}`,
  js: `// 添加交互功能
const button = document.getElementById('demoButton');

button.addEventListener('click', function() {
  // 切换按钮状态
  this.classList.toggle('clicked');

  // 显示反馈信息
  const message = this.classList.contains('clicked')
    ? '按钮已被点击！'
    : '按钮已重置';

  alert(message);
});

// 添加键盘支持
button.addEventListener('keypress', function(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    this.click();
  }
});`
})

// 技术详情数据
const technologies = ref([
  {
    id: 'html',
    name: 'HTML',
    fullName: '超文本标记语言',
    icon: '🌐',
    role: '结构层',
    year: '1993年',
    type: '标记语言',
    description: 'HTML是网页的骨架，用于定义网页的结构和内容。它通过标签来描述文档的不同部分，如标题、段落、链接、图片等。',
    features: [
      {
        name: '语义化',
        icon: '📖',
        description: '使用有意义的标签描述内容结构，提高可访问性和SEO'
      },
      {
        name: '跨平台',
        icon: '🌍',
        description: '在所有现代浏览器和设备上都能正常显示'
      },
      {
        name: '易学习',
        icon: '🎓',
        description: '语法简单直观，初学者容易上手'
      },
      {
        name: '可扩展',
        icon: '🔧',
        description: '通过自定义标签和属性支持复杂应用'
      }
    ],
    syntax: [
      {
        title: '基础文档结构',
        code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>网页标题</title>
</head>
<body>
    <h1>主要标题</h1>
    <p>这是一个段落。</p>
</body>
</html>`,
        description: 'HTML文档的基本结构，包含文档类型声明和必要的元数据'
      },
      {
        title: '常用标签示例',
        code: `<!-- 标题 -->
<h1>一级标题</h1>
<h2>二级标题</h2>

<!-- 段落和链接 -->
<p>这是一个包含<a href="#">链接</a>的段落。</p>

<!-- 列表 -->
<ul>
    <li>无序列表项</li>
</ul>

<!-- 图片 -->
<img src="image.jpg" alt="图片描述">`,
        description: '常用的HTML标签及其基本用法'
      }
    ],
    bestPractices: [
      '使用语义化标签（header、nav、main、footer等）',
      '为图片添加alt属性',
      '合理使用标题层级（h1-h6）',
      '表单元素使用label标签',
      '保持代码缩进和格式一致'
    ],
    evolution: [
      {
        name: 'HTML 4.01',
        description: '标准化了HTML规范，引入了样式表和脚本',
        keyFeatures: ['CSS支持', '基础表单', '框架']
      },
      {
        name: 'XHTML 1.0',
        description: '基于XML的严格版本，强调代码规范性',
        keyFeatures: ['XML语法', '严格校验', '代码规范']
      },
      {
        name: 'HTML5',
        description: '现代Web标准，支持多媒体和复杂应用',
        keyFeatures: ['语义化标签', 'Canvas', '本地存储', 'Web组件']
      }
    ]
  },
  {
    id: 'css',
    name: 'CSS',
    fullName: '层叠样式表',
    icon: '🎨',
    role: '表现层',
    year: '1996年',
    type: '样式语言',
    description: 'CSS负责网页的表现和布局，控制元素的颜色、字体、间距、位置等视觉样式，实现精美的用户界面。',
    features: [
      {
        name: '层叠性',
        icon: '📚',
        description: '多个样式规则可以叠加应用，通过优先级决定最终样式'
      },
      {
        name: '继承性',
        icon: '🔄',
        description: '子元素可以继承父元素的某些样式属性'
      },
      {
        name: '响应式',
        icon: '📱',
        description: '通过媒体查询实现不同设备的自适应布局'
      },
      {
        name: '动画效果',
        icon: '✨',
        description: '支持过渡和动画，创造生动的交互体验'
      }
    ],
    syntax: [
      {
        title: '基础语法',
        code: `/* 选择器 { 属性: 值; } */
selector {
    property: value;
}

/* 示例 */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}`,
        description: 'CSS规则的基本结构，由选择器和声明块组成'
      },
      {
        title: '布局示例',
        code: `/* Flexbox 布局 */
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

/* Grid 布局 */
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 16px;
}

/* 媒体查询 */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
}`,
        description: '现代CSS布局技术和响应式设计'
      }
    ],
    bestPractices: [
      '使用语义化的类名',
      '避免使用!important',
      '合理使用CSS变量',
      '移动端优先的响应式设计',
      '使用CSS预处理器（Sass/Less）'
    ],
    evolution: [
      {
        name: 'CSS1',
        description: '基础样式功能，支持字体、颜色、文本等',
        keyFeatures: ['基础选择器', '字体样式', '颜色背景']
      },
      {
        name: 'CSS2',
        description: '增加了定位、媒体类型等高级功能',
        keyFeatures: ['定位', '媒体类型', '表格样式']
      },
      {
        name: 'CSS3',
        description: '模块化标准，引入众多现代特性',
        keyFeatures: ['Flexbox', 'Grid', '动画', '变量']
      }
    ]
  },
  {
    id: 'js',
    name: 'JavaScript',
    fullName: 'JavaScript',
    icon: '⚡',
    role: '行为层',
    year: '1995年',
    type: '编程语言',
    description: 'JavaScript为网页添加交互功能，处理用户操作、动态更新内容、与服务器通信等，使网页从静态文档变为动态应用。',
    features: [
      {
        name: '事件驱动',
        icon: '🎮',
        description: '基于事件和回调的异步编程模型'
      },
      {
        name: '动态类型',
        icon: '🔤',
        description: '变量类型在运行时确定，灵活但需要谨慎使用'
      },
      {
        name: '原型继承',
        icon: '🧬',
        description: '基于原型的面向对象编程，不同于传统的类继承'
      },
      {
        name: '单线程',
        icon: '🎯',
        description: '使用事件循环处理并发，避免复杂的线程同步'
      }
    ],
    syntax: [
      {
        title: '基础语法',
        code: `// 变量声明
const name = '张三';
let age = 25;

// 函数定义
function greet(person) {
    return \`Hello, \${person}!\`;
}

// 条件判断
if (age >= 18) {
    console.log('成年人');
} else {
    console.log('未成年人');
}`,
        description: 'JavaScript的基本语法结构，包括变量、函数和控制流'
      },
      {
        title: 'DOM操作',
        code: `// 获取元素
const button = document.getElementById('myButton');

// 事件监听
button.addEventListener('click', function() {
    // 修改内容
    this.textContent = '已点击';

    // 修改样式
    this.style.backgroundColor = 'green';
});

// 创建元素
const newElement = document.createElement('div');
newElement.textContent = '新创建的元素';
document.body.appendChild(newElement);`,
        description: '使用JavaScript操作文档对象模型（DOM）'
      }
    ],
    bestPractices: [
      '使用const和let代替var',
      '使用严格模式（use strict）',
      '避免全局变量污染',
      '使用Promise或async/await处理异步',
      '编写可读性强的代码和注释'
    ],
    evolution: [
      {
        name: 'ES5',
        description: '标准化了JavaScript语言规范',
        keyFeatures: ['严格模式', 'JSON支持', '数组方法']
      },
      {
        name: 'ES6+',
        description: '现代JavaScript标准，引入众多新特性',
        keyFeatures: ['let/const', '箭头函数', '类', '模块化']
      },
      {
        name: 'ES2020+',
        description: '持续演进的语言标准',
        keyFeatures: ['可选链', '空值合并', 'BigInt', '动态导入']
      }
    ]
  }
])

// 工作流程数据
const workflow = ref([
  {
    id: 'structure',
    order: 1,
    title: '构建页面结构',
    description: '使用HTML定义网页的基本结构和内容区块，创建语义化的文档结构。',
    output: '具有清晰层次结构的HTML文档',
    tech: 'html',
    techIcon: '🌐',
    techName: 'HTML'
  },
  {
    id: 'styling',
    order: 2,
    title: '添加样式设计',
    description: '使用CSS美化页面，定义布局、颜色、字体等视觉样式，实现响应式设计。',
    output: '具有良好视觉效果的用户界面',
    tech: 'css',
    techIcon: '🎨',
    techName: 'CSS'
  },
  {
    id: 'interaction',
    order: 3,
    title: '实现交互功能',
    description: '使用JavaScript添加动态行为，处理用户操作，实现复杂的交互逻辑。',
    output: '功能完整的交互式Web应用',
    tech: 'js',
    techIcon: '⚡',
    techName: 'JavaScript'
  }
])
</script>

<style lang="less" scoped>
.web-fundamentals {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: #2d3748;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="0,0 1000,50 1000,100 0,100"/></svg>') no-repeat;
    background-size: cover;
  }

  .header-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .header-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 2rem;

    .stat {
      text-align: center;

      .stat-icon {
        display: block;
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-size: 1.1rem;
        opacity: 0.9;
        font-weight: 600;
      }
    }
  }
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  margin-bottom: 3rem;
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #2d3748;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
  }
}

// 介绍区域样式
.intro-section {
  text-align: center;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #2d3748;
  }

  p {
    font-size: 1.1rem;
    color: #4a5568;
    max-width: 800px;
    margin: 0 auto 2rem;
    line-height: 1.7;
  }

  .analogy {
    max-width: 600px;
    margin: 0 auto;
  }

  .analogy-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;
    border-left: 4px solid #667eea;

    h3 {
      margin: 0 0 1rem 0;
      color: #2d3748;
      text-align: left;
    }
  }

  .analogy-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .analogy-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;

    .item-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .item-text {
      text-align: left;

      strong {
        display: block;
        color: #2d3748;
        margin-bottom: 0.25rem;
      }

      span {
        color: #6b7280;
        font-size: 0.9rem;
      }
    }
  }
}

// 关系图样式
.relationship-section {
  .relationship-diagram {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
    }
  }

  .tech-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .flow-step {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .step-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    border-radius: 12px;
    min-width: 120px;
    transition: all 0.3s ease;

    &.html-step {
      background: #eff6ff;
      border: 2px solid #3b82f6;
    }

    &.css-step {
      background: #f0fdf4;
      border: 2px solid #10b981;
    }

    &.js-step {
      background: #fef3c7;
      border: 2px solid #f59e0b;
    }

    .step-icon {
      font-size: 2.5rem;
    }

    .step-content {
      text-align: center;

      h3 {
        margin: 0;
        color: #2d3748;
        font-size: 1.2rem;
      }

      p {
        margin: 0;
        color: #6b7280;
        font-size: 0.9rem;
      }
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
  }

  .step-arrow {
    font-size: 2rem;
    color: #667eea;
    font-weight: bold;
  }

  .collaboration-example {
    h3 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #2d3748;
    }
  }

  .example-code {
    background: #1a1b26;
    border-radius: 12px;
    overflow: hidden;
  }

  .code-tabs {
    display: flex;
    background: #2d3748;

    .code-tab {
      flex: 1;
      background: none;
      border: none;
      color: #cbd5e0;
      padding: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #4a5568;
      }

      &.active {
        background: #667eea;
        color: white;
      }
    }
  }

  .code-content {
    pre {
      margin: 0;
      padding: 1.5rem;
      overflow-x: auto;
      max-height: 400px;
      overflow-y: auto;
    }

    code {
      font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
      font-size: 0.9rem;
      line-height: 1.5;

      &.html { color: #e06c75; }
      &.css { color: #61afef; }
      &.javascript { color: #98c379; }
    }
  }
}

// 技术详情样式
.tech-details-section {
  .tech-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    justify-content: center;
  }

  .tech-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    font-weight: 600;
    color: #4a5568;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: white;
      border-color: #667eea;
      transform: translateY(-2px);
    }

    &.active {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-color: #667eea;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .tab-icon {
      font-size: 1.2rem;
    }
  }

  .tech-content {
    min-height: 600px;
  }

  .tech-detail {
    animation: fadeIn 0.3s ease;
  }

  .tech-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e2e8f0;

    h3 {
      font-size: 1.8rem;
      color: #2d3748;
      margin: 0;
    }

    .tech-meta {
      display: flex;
      gap: 1rem;
    }

    .meta-tag {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;

      &.role {
        background: #e0e7ff;
        color: #3730a3;
      }

      &.year {
        background: #fef3c7;
        color: #92400e;
      }

      &.type {
        background: #d1fae5;
        color: #065f46;
      }
    }
  }

  .tech-body {
    > div {
      margin-bottom: 2rem;
    }

    h4 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #2d3748;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.5rem;
    }
  }

  .description-section {
    p {
      font-size: 1.1rem;
      color: #4a5568;
      line-height: 1.7;
    }
  }

  .features-section {
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .feature-card {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #667eea;

      .feature-icon {
        font-size: 2rem;
        flex-shrink: 0;
      }

      .feature-content {
        flex: 1;

        h5 {
          margin: 0 0 0.5rem 0;
          color: #2d3748;
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          color: #4a5568;
          line-height: 1.5;
        }
      }
    }
  }

  .syntax-section {
    .syntax-examples {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .syntax-example {
      h5 {
        margin: 0 0 1rem 0;
        color: #2d3748;
        font-size: 1.1rem;
      }

      pre {
        background: #1a1b26;
        border-radius: 8px;
        padding: 1.5rem;
        overflow-x: auto;
        margin: 0 0 1rem 0;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          line-height: 1.5;

          &.html { color: #e06c75; }
          &.css { color: #61afef; }
          &.javascript { color: #98c379; }
        }
      }

      .example-desc {
        color: #6b7280;
        font-size: 0.9rem;
        margin: 0;
      }
    }
  }

  .best-practices {
    .practices-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }

    .practice-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;

      .check-icon {
        color: #10b981;
        flex-shrink: 0;
        margin-top: 0.1rem;
      }
    }
  }

  .version-evolution {
    .evolution-timeline {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 20px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #e2e8f0;
        z-index: 1;
      }
    }

    .version-item {
      display: flex;
      gap: 1.5rem;
      position: relative;
      z-index: 2;

      .version-marker {
        width: 40px;
        height: 40px;
        background: #667eea;
        border-radius: 50%;
        flex-shrink: 0;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
        }
      }

      .version-content {
        flex: 1;
        background: #f8fafc;
        border-radius: 8px;
        padding: 1.5rem;

        h5 {
          margin: 0 0 0.5rem 0;
          color: #2d3748;
          font-size: 1.2rem;
        }

        p {
          color: #4a5568;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .version-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .feature-tag {
          background: white;
          color: #4a5568;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid #e2e8f0;
        }
      }
    }
  }
}

// 工作流程样式
.workflow-section {
  .workflow-steps {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .workflow-step {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid;
    transition: all 0.3s ease;

    &:hover {
      transform: translateX(5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    &.html {
      border-left-color: #3b82f6;
    }

    &.css {
      border-left-color: #10b981;
    }

    &.js {
      border-left-color: #f59e0b;
    }

    .step-number {
      width: 60px;
      height: 60px;
      background: #667eea;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .step-content {
      flex: 1;

      h3 {
        margin: 0 0 1rem 0;
        color: #2d3748;
        font-size: 1.4rem;
      }

      p {
        color: #4a5568;
        margin-bottom: 1rem;
        line-height: 1.6;
      }

      .step-output {
        h4 {
          margin: 0 0 0.5rem 0;
          color: #2d3748;
          font-size: 1rem;
        }

        p {
          margin: 0;
          color: #6b7280;
          font-style: italic;
        }
      }
    }

    .step-tech {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      min-width: 80px;

      .tech-icon {
        font-size: 2rem;
      }

      .tech-name {
        font-weight: 600;
        color: #4a5568;
      }
    }
  }
}

// 现代生态样式
.modern-ecosystem-section {
  .ecosystem-intro {
    text-align: center;
    margin-bottom: 3rem;

    p {
      font-size: 1.1rem;
      color: #4a5568;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.7;
    }
  }

  .ecosystem-layers {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .layer {
    h3 {
      margin: 0 0 1.5rem 0;
      color: #2d3748;
      font-size: 1.4rem;
    }
  }

  .foundation-layer {
    .layer-techs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .tech-pillar {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 8px;
      border: 2px solid #e2e8f0;

      .pillar-icon {
        font-size: 2.5rem;
        flex-shrink: 0;
      }

      .pillar-content {
        flex: 1;

        h4 {
          margin: 0 0 0.5rem 0;
          color: #2d3748;
          font-size: 1.2rem;
        }

        p {
          margin: 0;
          color: #4a5568;
          line-height: 1.5;
        }
      }
    }
  }

  .framework-layer {
    .framework-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .framework-card {
      background: #f8fafc;
      border-radius: 8px;
      padding: 1.5rem;
      border: 2px solid #e2e8f0;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      h4 {
        margin: 0 0 0.5rem 0;
        color: #2d3748;
        font-size: 1.2rem;
      }

      p {
        color: #4a5568;
        margin-bottom: 1rem;
        line-height: 1.5;
      }

      .framework-deps {
        display: flex;
        gap: 0.5rem;
      }

      .dep-tag {
        background: white;
        color: #4a5568;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
        border: 1px solid #e2e8f0;
      }
    }
  }

  .tooling-layer {
    .tooling-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .tooling-card {
      background: #f8fafc;
      border-radius: 8px;
      padding: 1.5rem;
      border: 2px solid #e2e8f0;
      text-align: center;

      h4 {
        margin: 0 0 0.5rem 0;
        color: #2d3748;
        font-size: 1.2rem;
      }

      p {
        margin: 0;
        color: #4a5568;
        line-height: 1.5;
      }
    }
  }
}

// 学习路径样式
.learning-path-section {
  .learning-path {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .path-phase {
    h3 {
      margin: 0 0 1.5rem 0;
      color: #2d3748;
      font-size: 1.4rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e2e8f0;
    }
  }

  .phase-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .learning-item {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;
    border-left: 4px solid #667eea;

    .item-order {
      width: 40px;
      height: 40px;
      background: #667eea;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }

    .item-content {
      flex: 1;

      h4 {
        margin: 0 0 0.5rem 0;
        color: #2d3748;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        color: #4a5568;
        line-height: 1.5;
      }
    }
  }
}

// 页脚样式
.page-footer {
  background: #2d3748;
  color: white;
  padding: 3rem 2rem;
  margin-top: 4rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  .footer-info {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #fff;
    }

    p {
      color: #cbd5e0;
      line-height: 1.6;
      margin: 0;
    }
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;

    @media (max-width: 768px) {
      justify-content: center;
    }

    a {
      color: #cbd5e0;
      text-decoration: none;
      transition: color 0.3s ease;
      font-weight: 500;

      &:hover {
        color: #fff;
      }
    }
  }
}

// 动画
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem;
  }

  .content {
    padding: 1rem;
  }

  section {
    padding: 1.5rem;
  }

  .header-stats {
    gap: 1.5rem !important;
  }

  .relationship-diagram {
    grid-template-columns: 1fr !important;
  }

  .tech-flow {
    flex-direction: column;
  }

  .step-arrow {
    transform: rotate(90deg);
  }

  .tech-header {
    flex-direction: column;
    gap: 1rem;
  }

  .tech-meta {
    flex-wrap: wrap;
  }

  .workflow-step {
    flex-direction: column;
    text-align: center;
  }

  .step-tech {
    flex-direction: row !important;
    justify-content: center;
  }
}
</style>
