<template>
  <div class="javascript-docs">
    <header class="hero">
      <h1>JavaScript 基本介绍</h1>
    </header>

    <div>
      <p>
        JavaScript是一种高层次、解释型的编程语言，广泛用于网页开发。它最初由Brendan
        Eich在1995年创建，旨在为网页添加交互性和动态效果。JavaScript支持面向对象、命令式和函数式编程风格，能够在浏览器中运行，也可以在服务器端使用（如Node.js）。
      </p>
      <p>
        JavaScript的核心特性包括动态类型、原型继承和事件驱动编程。它的生态系统庞大，拥有丰富的库和框架（如React、Vue、Angular），使得开发者能够快速构建复杂的应用程序。
      </p>
      <p>
        随着时间的推移，JavaScript不断演进，ECMAScript标准的发布使得语言的功能和性能得到了显著提升。如今，JavaScript已成为现代Web开发不可或缺的一部分。
      </p>
    </div>

    <div class="content-container">
      <!-- 时间轴 -->
      <section class="timeline-section">
        <h2 class="section-title"><span>📜 历史沿革</span></h2>
        <div class="timeline">
          <div v-for="(event, index) in historyEvents" :key="index" class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3>{{ event.year }} - {{ event.title }}</h3>
              <p>{{ event.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 特性展示 -->
      <section class="features-section">
        <h2 class="section-title"><span>✨ 语言特性</span></h2>
        <div class="feature-grid">
          <div v-for="(feature, index) in features" :key="index" class="feature-card">
            <div class="feature-icon">{{ feature.emoji }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <div class="goto">
              <Button class="button" @click.prevent.stop="goToByRouteName(feature.routeName)"
                >跳转</Button
              >
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点对比 -->
      <section class="comparison-section">
        <div class="pros-cons-grid">
          <div class="pros">
            <h2><span class="success">✅ 优势</span></h2>
            <ul>
              <li v-for="(pro, index) in pros" :key="index">{{ pro }}</li>
            </ul>
          </div>
          <div class="cons">
            <h2><span class="danger">❌ 缺点</span></h2>
            <ul>
              <li v-for="(con, index) in cons" :key="index">{{ con }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- JS加载方式 -->
      <section class="loading-methods-section">
        <h2 class="section-title"><span>📥 JavaScript加载方式</span></h2>
        <div class="loading-methods">
          <div class="method-card">
            <h3>普通加载 (默认)</h3>
            <pre><code>&lt;script src="script.js"&gt;&lt;/script&gt;</code></pre>
            <div class="method-details">
              <p class="description">最基础的加载方式,会阻塞HTML解析直到脚本下载并执行完成。</p>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>确保脚本按顺序执行</li>
                    <li>适合依赖关系强的脚本</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>阻塞页面渲染</li>
                    <li>影响首屏加载速度</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="method-card">
            <h3>async加载</h3>
            <pre><code>&lt;script async src="script.js"&gt;&lt;/script&gt;</code></pre>
            <div class="method-details">
              <p class="description">异步下载脚本,下载完成后立即执行,不保证执行顺序。</p>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>不阻塞页面渲染</li>
                    <li>适合独立的脚本</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>执行顺序不可控</li>
                    <li>可能破坏脚本依赖</li>
                  </ul>
                </div>
              </div>
              <div class="notice">
                <p>
                  注意：async加载的脚本在下载完成后立即执行，不保证执行顺序，可能会破坏脚本依赖关系。
                </p>
                <p>async加载的脚本在下载完成后立即执行，也可能会阻碍DOM的渲染</p>
              </div>
            </div>
          </div>

          <div class="method-card">
            <h3>defer加载</h3>
            <pre><code>&lt;script defer src="script.js"&gt;&lt;/script&gt;</code></pre>
            <div class="method-details">
              <p class="description">
                异步下载脚本,等到HTML解析(DOMContentLoaded事件触发后)完成后按顺序执行。
              </p>
              <p class="description">
                如果有多个设置了 defer 的 script 标签存在，则会按照引入的前后顺序执行，即便是后面的
                script 资源先返回
              </p>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>不阻塞页面渲染</li>
                    <li>保证执行顺序</li>
                    <li>适合有依赖的脚本</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>总体执行时间较晚</li>
                    <li>不适合需要及时执行的脚本</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="method-card">
            <h3>动态加载</h3>
            <pre><code>const script = document.createElement('script');
script.src = 'script.js';
document.body.appendChild(script);</code></pre>
            <div class="method-details">
              <p class="description">通过JavaScript动态创建script标签加载脚本。</p>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>可控性强</li>
                    <li>按需加载</li>
                    <li>可以监听加载状态</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>代码较复杂</li>
                    <li>需要手动管理依赖</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="method-card">
            <h3>预加载</h3>
            <pre><code>&lt;link rel="preload" href="script.js" as="script"&gt;</code></pre>
            <div class="method-details">
              <p class="description">预加载资源，浏览器会优先加载资源。</p>
              <p class="description">
                preload
                提供了一种声明式的命令，让浏览器提前加载指定资源(加载后并不执行)，在需要执行的时候再执行
              </p>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>提高页面加载速度</li>
                    <li>减少页面加载时间</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>需要手动管理依赖</li>
                    <li>可能会破坏脚本依赖</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="method-card">
            <h3>模块化加载（ES Module）</h3>
            <pre><code>&lt;script type="module" src="main.js"&gt;&lt;/script&gt;</code></pre>
            <div class="method-details">
              <p class="description">
                通过
                <code>type="module"</code>
                声明，浏览器以模块化方式加载JavaScript，支持import/export语法，自动延迟执行。
              </p>
              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li>支持ES6模块语法（import/export）</li>
                    <li>自动作用域隔离，避免全局变量污染</li>
                    <li>按需加载，支持异步加载</li>
                    <li>浏览器原生支持，无需打包工具（现代浏览器）</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li>不兼容旧版浏览器</li>
                    <li>跨域加载有严格限制</li>
                    <li>需通过服务器环境访问（file://下部分特性不可用）</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 浏览器解析与运行JS流程 -->
      <section class="js-process-section">
        <h2 class="section-title"><span>🔍 浏览器解析与运行JS流程</span></h2>
        <div class="process-description">
          <p>浏览器解析JavaScript的过程主要包括以下几个步骤：</p>
          <ol>
            <li>
              <strong>下载：</strong
              >浏览器从服务器下载JavaScript文件。这个过程可能涉及到HTTP请求，浏览器会根据HTML文档中的
              &lt;script&gt;标签来识别需要下载的脚本。
            </li>
            <li>
              <strong>解析：</strong
              >浏览器将JavaScript代码解析为抽象语法树（AST）。在这个阶段，浏览器会检查代码的语法是否正确，并将其转换为一种更易于处理的结构。
            </li>
            <li>
              <strong>编译：</strong
              >将AST编译为字节码或机器码。现代浏览器通常会使用即时编译（JIT）技术，将代码编译为机器码，以提高执行效率。
            </li>
            <li>
              <strong>执行：</strong
              >执行编译后的代码，更新DOM和处理事件。执行过程中，JavaScript引擎会根据代码的逻辑来操作网页的内容和响应用户的交互。
            </li>
          </ol>
          <p>这个过程确保JavaScript代码能够高效地在浏览器中运行，并与网页的其他部分进行交互。</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { Button } from 'ant-design-vue'



const emit = defineEmits(['goToByRouteName'])

interface HistoryEvent {
  year: string
  title: string
  description: string
}

interface Feature {
  emoji: string
  title: string
  description: string
  routeName: string
}

// 响应式数据
const historyEvents: HistoryEvent[] = [
  {
    year: '1995',
    title: '诞生时刻',
    description:
      '由Brendan Eich在Netscape公司开发，最初命名为Mocha，后改名为LiveScript，最终定名JavaScript',
  },
  {
    year: '1997',
    title: '标准化',
    description: 'ECMAScript标准第一版发布，确立语言规范',
  },
  {
    year: '2009',
    title: 'ES5革命',
    description: '引入严格模式、JSON支持等重要特性',
  },
  {
    year: '2015',
    title: 'ES6时代',
    description: '发布ES2015（ES6），带来类、模块、箭头函数',
  },
]

const features: Feature[] = [
  {
    emoji: '🔄',
    title: '动态类型',
    description: '运行时类型推断，灵活但需要良好的代码规范',
    routeName: 'TypeConversion',
  },
  {
    emoji: '🧬',
    title: '原型继承',
    description: '基于原型的面向对象编程范式',
    routeName: 'Prototype1',
  },
  {
    emoji: '🚀',
    title: '事件驱动',
    description: '非阻塞I/O和事件循环机制',
    routeName: 'AsyncProgramming',
  },
  {
    emoji: '📦',
    title: '模块化',
    description: 'ES6模块支持现代工程化开发',
    routeName: 'Modules',
  },
  {
    emoji: '🔍',
    title: '闭包',
    description: '函数可以访问其外部作用域的变量',
    routeName: 'Closure',
  },
  {
    emoji: '⚡',
    title: '异步编程',
    description: '通过Promise和async/await实现非阻塞操作',
    routeName: 'Promise',
  },
  {
    emoji: '🧩',
    title: '函数式编程',
    description: '支持函数式编程风格，强调不可变性',
    routeName: 'FunctionProgrammingIntroduce',
  },
  {
    emoji: '🌐',
    title: '跨平台',
    description: '可在浏览器和服务器端运行',
    routeName: 'NodeJSBasicKnowledge',
  },
]

function goToByRouteName(name: string) {
  emit('goToByRouteName', name)
}

// ... existing code ...
const pros: string[] = [
  '全平台支持（浏览器/服务器/桌面/移动）',
  '庞大的生态系统（npm包含200多万个包）',
  '灵活的编程范式（面向对象/函数式/响应式）',
  '持续演进的标准（TC39提案流程）',
  '易于学习和使用',
  '强大的社区支持',
  '丰富的库和框架',
  '良好的性能优化',
  '支持异步编程',
  '跨平台兼容性',
]
// ... existing code ...

// ... existing code ...
const cons: string[] = [
  '弱类型带来的维护成本',
  '浏览器兼容性问题',
  '回调地狱（已通过Promise/async解决）',
  '全局命名空间污染风险',
  '性能问题（在某些情况下）',
  '安全性问题（如XSS攻击）',
  '缺乏模块化（在ES6之前）',
  '调试困难（尤其是异步代码）',
]
// ... existing code ...
// const ste = `
// const str =/@import url\(\'https:\/\/fonts.+swap.+/g
// console.log(ste.replace(str, 'aa'))
</script>

<style scoped lang="less">
.javascript-docs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #111827;
  background-color: #f9fafb;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.hero h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.javascript-docs > div > p {
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 900px;
  margin: 0 auto 2rem;
}

.section-title {
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.75rem;
  margin: 2.5rem 0 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timeline {
  position: relative;
  padding-left: 1.5rem;
  margin-left: 1rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 2px;
  height: calc(100% - 10px);
  background: #d1d5db;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
}

.timeline-marker {
  position: absolute;
  left: -8px;
  top: 5px;
  width: 16px;
  height: 16px;
  background: #fff;
  border: 2px solid #d1d5db;
  border-radius: 50%;
}

.timeline-content h3 {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
}

.timeline-content p {
  margin: 0;
  color: #374151;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  position: relative;

  .goto {
    height: 0;
    width: 100%;
    opacity: 0.3;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    position: absolute;
    background-color: #4338ca;
    background: linear-gradient(to bottom, #4338ca, #6366f1);
    top: 0;
    left: 0;
    text-align: center;
    align-content: center;
  }

  &:hover {
    .goto {
      height: 100%;
      background: linear-gradient(to bottom, #084fe7, #fd4828);
    }
  }
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.pros-cons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.pros-cons-grid h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.pros ul,
.cons ul {
  padding-left: 1.25rem;
  margin: 0;
  list-style: none;
}

.pros li,
.cons li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.pros li::before {
  content: '✅';
  position: absolute;
  left: 0;
}

.cons li::before {
  content: '❌';
  position: absolute;
  left: 0;
}

.loading-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.method-card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.method-card h3 {
  color: #111827;
  font-size: 1.25rem;
  margin: 0 0 1rem;
}

.method-card pre {
  background: #f3f4f6;
  color: #1f2937;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1rem 0;
  font-family: 'Fira Code', monospace;
}

.method-details .description {
  color: #374151;
  margin-bottom: 1rem;
}

.method-details .pros-cons {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.method-details .pros-cons h4 {
  color: #111827;
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.method-details .pros-cons ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.method-details .pros-cons li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #374151;
}

.method-details .pros ul li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #16a34a;
}

.method-details .cons ul li::before {
  content: '✗';
  position: absolute;
  left: 0;
  color: #dc2626;
}

.notice {
  color: #b91c1c;
  background: #fef2f2;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.notice p {
  margin: 0;
}

.js-process-section .process-description {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.js-process-section ol {
  counter-reset: process-counter;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
}

.js-process-section li {
  position: relative;
  padding: 1rem 1rem 1rem 2.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.js-process-section li::before {
  content: counter(process-counter);
  counter-increment: process-counter;
  position: absolute;
  left: 0.75rem;
  top: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  background: #e0e7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #4338ca;
}

.js-process-section .process-description > p {
  margin-top: 0;
}

@media (max-width: 768px) {
  .pros-cons-grid {
    grid-template-columns: 1fr;
  }

  .loading-methods {
    grid-template-columns: 1fr;
  }
}
</style>
