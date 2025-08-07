<template>
  <div class="nodejs-container">
    <header class="hero-section">
      <div class="hero-content">
        <h1>Node.js 基础知识</h1>
        <p class="subtitle">高性能 JavaScript 运行时环境</p>
        <div class="stats">
          <div class="stat-item">
            <div class="stat-value">1.5B+</div>
            <div class="stat-label">月下载量</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">98%</div>
            <div class="stat-label">财富500强使用率</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">2009</div>
            <div class="stat-label">诞生年份</div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <section class="intro-section">
        <h2>什么是 Node.js？</h2>
        <div class="definition-card">
          <p>Node.js 是一个开源的、跨平台的 JavaScript 运行时环境，它允许开发者使用 JavaScript 编写服务器端应用程序。</p>
          <div class="highlight-box">
            <div class="highlight-icon">⚡</div>
            <p>Node.js 使用 <strong>事件驱动</strong>、<strong>非阻塞 I/O</strong> 模型，使其轻量且高效，非常适合数据密集型的实时应用。</p>
          </div>
        </div>
      </section>

      <section class="features-section">
        <h2>核心功能与特点</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.title">
            <div class="feature-icon" :style="{ backgroundColor: feature.color }">
              {{ feature.icon }}
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <section class="modules-section">
        <h2>常用内置模块</h2>
        <div class="modules-container">
          <div class="module-tabs">
            <button v-for="(module, index) in modules" :key="module.name" :class="{ active: activeModule === index }"
              @click="activeModule = index">
              {{ module.name }}
            </button>
          </div>
          <div class="module-content">
            <div v-if="modules[activeModule]" class="module-details">
              <h3>{{ modules[activeModule].name }}</h3>
              <p>{{ modules[activeModule].description }}</p>
              <div class="code-example">
                <pre><code>{{ modules[activeModule].example }}</code></pre>
              </div>
              <div class="use-cases">
                <h4>使用场景：</h4>
                <ul>
                  <li v-for="(useCase, idx) in modules[activeModule].useCases" :key="idx">{{ useCase }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2>Node.js 的优缺点</h2>
        <div class="comparison-grid">
          <div class="pros-box">
            <h3><span class="icon">✅</span> 优点</h3>
            <ul>
              <li v-for="(pro, index) in pros" :key="index">
                <strong>{{ pro.title }}:</strong> {{ pro.description }}
              </li>
            </ul>
          </div>
          <div class="cons-box">
            <h3><span class="icon">⚠️</span> 缺点</h3>
            <ul>
              <li v-for="(con, index) in cons" :key="index">
                <strong>{{ con.title }}:</strong> {{ con.description }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="use-cases-section">
        <h2>Node.js 使用场景</h2>
        <div class="case-cards">
          <div class="case-card" v-for="(useCase, index) in useCases" :key="index">
            <div class="case-header" :style="{ background: useCase.color }">
              <div class="case-icon">{{ useCase.icon }}</div>
              <h3>{{ useCase.title }}</h3>
            </div>
            <div class="case-body">
              <p>{{ useCase.description }}</p>
              <div class="case-examples">
                <h4>代表项目：</h4>
                <ul>
                  <li v-for="(example, idx) in useCase.examples" :key="idx">{{ example }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="ecosystem-section">
        <h2>Node.js 生态系统</h2>
        <div class="ecosystem-content">
          <div class="npm-stats">
            <div class="stat">
              <div class="stat-number">2,300,000+</div>
              <div class="stat-label">npm 包数量</div>
            </div>
            <div class="stat">
              <div class="stat-number">10,000+</div>
              <div class="stat-label">每日新增包</div>
            </div>
          </div>
          <div class="popular-packages">
            <h3>热门 npm 包</h3>
            <div class="packages-grid">
              <div class="package-card" v-for="pkg in popularPackages" :key="pkg.name">
                <div class="package-name">{{ pkg.name }}</div>
                <div class="package-desc">{{ pkg.description }}</div>
                <div class="package-stats">
                  <span>周下载: {{ pkg.downloads }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="conclusion-section">
        <h2>总结</h2>
        <div class="conclusion-card">
          <p>Node.js 彻底改变了 JavaScript 的应用场景，使其从浏览器端扩展到服务器端，为全栈 JavaScript 开发铺平了道路。</p>

          <div class="best-for">
            <h3>Node.js 最适合：</h3>
            <ul>
              <li>I/O 密集型应用</li>
              <li>实时应用程序</li>
              <li>API 服务和微服务架构</li>
              <li>数据流应用</li>
              <li>命令行工具</li>
            </ul>
          </div>

          <div class="consider">
            <h3>需谨慎使用：</h3>
            <ul>
              <li>CPU 密集型任务</li>
              <li>大型关系型数据库操作</li>
              <li>需要复杂线程管理的场景</li>
            </ul>
          </div>

          <div class="final-thought">
            <p>Node.js 凭借其高性能、丰富的生态系统和活跃的社区，已成为现代 Web 开发不可或缺的技术栈。</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>© 2023 Node.js 技术解析 | 使用 Vue 3 + TypeScript 实现</p>
      <p>Node.js® 是 OpenJS Foundation 的注册商标</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 核心功能数据
const features = ref([
  {
    icon: "⏱️",
    title: "非阻塞I/O",
    description: "异步处理模型，高效处理并发请求",
    color: "#ff6b6b"
  },
  {
    icon: "🚀",
    title: "事件驱动",
    description: "基于事件循环，实现高并发处理能力",
    color: "#4ecdc4"
  },
  {
    icon: "📦",
    title: "NPM生态系统",
    description: "全球最大的开源库生态系统",
    color: "#1a535c"
  },
  {
    icon: "🔁",
    title: "单线程",
    description: "减少上下文切换开销，简化并发编程",
    color: "#ffd166"
  },
  {
    icon: "🌐",
    title: "跨平台",
    description: "支持Windows、Linux、macOS等操作系统",
    color: "#06d6a0"
  },
  {
    icon: "⚙️",
    title: "V8引擎",
    description: "Google Chrome的JavaScript引擎，高性能执行",
    color: "#118ab2"
  }
]);

// 内置模块数据
const modules = ref([
  {
    name: "HTTP",
    description: "用于创建HTTP服务器和客户端，是构建Web应用的基础模块。",
    example: `const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Node.js!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    useCases: [
      "创建Web服务器",
      "构建RESTful API",
      "开发代理服务器"
    ]
  },
  {
    name: "FS",
    description: "文件系统模块，提供操作文件和目录的能力。",
    example: `const fs = require('fs');

// 异步读取文件
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 同步读取文件
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);`,
    useCases: [
      "日志记录",
      "配置文件读取",
      "文件上传处理"
    ]
  },
  {
    name: "Path",
    description: "提供处理文件和目录路径的实用工具方法。",
    example: `const path = require('path');

// 路径拼接
const fullPath = path.join(__dirname, 'public', 'index.html');
console.log(fullPath); // /home/user/project/public/index.html

// 获取扩展名
const ext = path.extname('image.png');
console.log(ext); // .png`,
    useCases: [
      "跨平台路径处理",
      "文件扩展名操作",
      "路径解析"
    ]
  },
  {
    name: "Events",
    description: "事件触发器，实现Node.js的事件驱动架构。",
    example: `const EventEmitter = require('events');

// 创建事件发射器
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// 注册事件监听器
myEmitter.on('event', () => {
  console.log('Event occurred!');
});

// 触发事件
myEmitter.emit('event');`,
    useCases: [
      "自定义事件处理",
      "实现观察者模式",
      "组件间通信"
    ]
  }
]);

const activeModule = ref(0);

// 优缺点数据
const pros = ref([
  { title: "高性能", description: "非阻塞I/O模型适合处理高并发请求" },
  { title: "开发效率高", description: "前后端使用同一种语言，减少上下文切换" },
  { title: "丰富的生态系统", description: "npm拥有超过200万个可重用包" },
  { title: "轻量高效", description: "适合微服务和云原生架构" },
  { title: "活跃的社区", description: "拥有庞大且活跃的开发者社区" }
]);

const cons = ref([
  { title: "单线程限制", description: "不适合CPU密集型任务" },
  { title: "回调地狱", description: "深度嵌套的回调导致代码可读性差" },
  { title: "频繁的API变更", description: "生态系统更新快，需持续学习" },
  { title: "不成熟的核心模块", description: "一些核心API仍在频繁变化" },
  { title: "深度调试困难", description: "异步代码调试比同步代码更复杂" }
]);

// 使用场景数据
const useCases = ref([
  {
    icon: "💬",
    title: "实时应用",
    description: "Node.js 的事件驱动架构非常适合处理实时通信。",
    examples: ["聊天应用", "在线游戏", "协作工具"],
    color: "#ff6b6b"
  },
  {
    icon: "📡",
    title: "API服务",
    description: "高效处理大量并发API请求，构建微服务架构。",
    examples: ["RESTful API", "GraphQL 服务", "BFF(Backend for Frontend)"],
    color: "#118ab2"
  },
  {
    icon: "📊",
    title: "数据流应用",
    description: "处理实时数据流，如日志处理、实时分析等。",
    examples: ["实时分析仪表盘", "日志处理系统", "数据转换管道"],
    color: "#06d6a0"
  },
  {
    icon: "⚡",
    title: "服务器端渲染",
    description: "使用框架如Next.js、Nuxt.js实现高性能SSR。",
    examples: ["SEO优化网站", "高性能Web应用", "静态站点生成"],
    color: "#ffd166"
  }
]);

// 热门npm包
const popularPackages = ref([
  { name: "Express", description: "快速、极简的Node.js Web框架", downloads: "29M" },
  { name: "Socket.io", description: "实时、双向事件通信库", downloads: "5.2M" },
  { name: "Axios", description: "基于Promise的HTTP客户端", downloads: "49M" },
  { name: "Lodash", description: "现代JavaScript实用工具库", downloads: "45M" },
  { name: "Mongoose", description: "MongoDB对象建模工具", downloads: "2.3M" },
  { name: "Nodemon", description: "开发服务器自动重启工具", downloads: "5.8M" }
]);
</script>

<style lang="less" scoped>


:root {
  --primary: #339933;
  --secondary: #026e00;
  --dark: #215732;
  --light: #8cc63f;
  --gray: #f5f7fa;
  --text: #2c3e50;
  --text-light: #7f8c8d;
}

.nodejs-container {
  font-family: 'Noto Sans SC', sans-serif;
  color: var(--text);
  background-color: #f8f9fa;
  line-height: 1.6;
}

.hero-section {
  background: linear-gradient(135deg, var(--primary), var(--dark));
  color: white;
  padding: 4rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23026e00' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.1;
  }
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.nodejs-logo {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  position: relative;
}

.hexagon {
  width: 100%;
  height: 100%;
  background: var(--light);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.hexagon-inner {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background: var(--dark);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Roboto Mono', monospace;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  font-weight: 300;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.85;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  margin-bottom: 4rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}

h2 {
  font-size: 2rem;
  color: var(--dark);
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--light);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 80px;
    height: 2px;
    background: var(--primary);
  }
}

.intro-section {
  .definition-card {
    background: var(--gray);
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid var(--primary);

    p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
  }

  .highlight-box {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: rgba(51, 153, 51, 0.1);
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;

    .highlight-icon {
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      flex: 1;
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary);
    box-shadow: 0 5px 15px rgba(51, 153, 51, 0.1);
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: white;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
    color: var(--dark);
  }

  p {
    color: var(--text-light);
    margin: 0;
  }
}

.modules-section {
  .modules-container {
    border: 1px solid #eaeaea;
    border-radius: 8px;
    overflow: hidden;
  }

  .module-tabs {
    display: flex;
    background: var(--gray);
    border-bottom: 1px solid #eaeaea;

    button {
      flex: 1;
      padding: 1rem;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(51, 153, 51, 0.1);
      }

      &.active {
        background: var(--primary);
        color: rgb(248, 181, 181);
      }
    }
  }

  .module-content {
    padding: 1.5rem;

    .module-details {
      h3 {
        font-size: 1.5rem;
        color: var(--dark);
        margin-bottom: 1rem;
      }

      p {
        margin-bottom: 1.5rem;
      }
    }
  }

  .code-example {
    background: #2c3e50;
    color: #f8f9fa;
    padding: 1rem;
    border-radius: 6px;
    margin: 1.5rem 0;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.9rem;
    overflow-x: auto;

    pre {
      margin: 0;
    }
  }

  .use-cases {
    background: rgba(51, 153, 51, 0.05);
    padding: 1rem;
    border-radius: 6px;
    border-left: 3px solid var(--primary);

    h4 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: var(--dark);
    }

    ul {
      padding-left: 1.5rem;
      margin: 0;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.pros-box,
.cons-box {
  padding: 1.5rem;
  border-radius: 8px;

  h3 {
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0;
  }
}

.pros-box {
  background: rgba(6, 214, 160, 0.1);
  border-left: 4px solid #06d6a0;

  h3 .icon {
    color: #06d6a0;
  }
}

.cons-box {
  background: rgba(255, 107, 107, 0.1);
  border-left: 4px solid #ff6b6b;

  h3 .icon {
    color: #ff6b6b;
  }
}

ul {
  padding-left: 1.25rem;

  li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }
}

.case-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.case-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }

  .case-header {
    padding: 1.5rem;
    color: white;
    display: flex;
    align-items: center;
    gap: 1rem;

    .case-icon {
      font-size: 1.8rem;
    }

    h3 {
      margin: 0;
      font-size: 1.4rem;
    }
  }

  .case-body {
    padding: 1.5rem;
    background: white;

    p {
      margin-top: 0;
    }
  }

  .case-examples {
    background: var(--gray);
    padding: 1rem;
    border-radius: 6px;
    margin-top: 1rem;

    h4 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: var(--dark);
    }

    ul {
      padding-left: 1.25rem;
      margin: 0;

      li {
        margin-bottom: 0.4rem;
      }
    }
  }
}

.ecosystem-section {
  .ecosystem-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .npm-stats {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .stat {
      text-align: center;
      padding: 1.5rem;
      background: var(--gray);
      border-radius: 8px;

      .stat-number {
        font-size: 2.2rem;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-size: 1rem;
        color: var(--text-light);
      }
    }
  }

  .popular-packages {
    h3 {
      font-size: 1.3rem;
      color: var(--dark);
      margin-top: 0;
      margin-bottom: 1rem;
    }
  }

  .packages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .package-card {
    background: white;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 1.25rem;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--primary);
      box-shadow: 0 5px 15px rgba(51, 153, 51, 0.1);
    }

    .package-name {
      font-weight: 700;
      font-size: 1.1rem;
      color: var(--dark);
      margin-bottom: 0.5rem;
    }

    .package-desc {
      color: var(--text-light);
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }

    .package-stats {
      font-size: 0.85rem;
      color: var(--primary);
      font-weight: 500;
    }
  }
}

.conclusion-section {
  .conclusion-card {
    background: var(--gray);
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid var(--primary);

    p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }
  }

  .best-for,
  .consider {
    background: white;
    padding: 1.25rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    border: 1px solid #eaeaea;

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      color: var(--dark);
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #eee;
    }

    ul {
      padding-left: 1.25rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }

  .best-for {
    border-left: 4px solid #06d6a0;
  }

  .consider {
    border-left: 4px solid #ff6b6b;
  }

  .final-thought {
    background: rgba(51, 153, 51, 0.1);
    padding: 1.25rem;
    border-radius: 8px;
    font-style: italic;
    margin-top: 1.5rem;
  }
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--text-light);
  font-size: 0.9rem;
  border-top: 1px solid #eaeaea;
  margin-top: 2rem;

  p {
    margin: 0.25rem 0;
  }
}
</style>
