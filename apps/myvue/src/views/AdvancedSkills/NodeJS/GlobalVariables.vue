<template>
  <div class="node-globals-container">
    <header class="header">
      <h1>Node.js 全局变量基本介绍</h1>
      <p class="subtitle">模块级变量及其应用场景</p>
      <div class="terminal-prompt">
        <span class="prompt-user">user@node</span>
        <span class="prompt-path">~/globals</span>
        <span class="prompt-char">$</span>
      </div>
    </header>

    <div class="content-wrapper">
      <aside class="sidebar">
        <div class="navigation">
          <h3>全局变量列表</h3>
          <ul>
            <li v-for="(item, index) in globals" :key="index" :class="{ active: activeIndex === index }"
              @click="activeIndex = index">
              {{ item.name }}
            </li>
          </ul>
        </div>

        <div class="node-process">
          <div class="process-diagram">
            <div class="process-circle">
              <div class="core">Node<br>Core</div>
              <div class="module">Module</div>
              <div class="global">Global</div>
            </div>
            <div class="arrows">
              <div class="arrow"></div>
              <div class="arrow"></div>
            </div>
          </div>
          <p>Node.js 全局变量作用域示意图</p>
        </div>
      </aside>

      <main class="main-content">
        <div v-if="activeGlobal" class="global-card">
          <div class="card-header">
            <h2>{{ activeGlobal.name }}</h2>
            <span class="module-tag">全局模块级变量</span>
          </div>

          <div class="card-body">
            <div class="info-section">
              <h3>作用</h3>
              <p>{{ activeGlobal.purpose }}</p>
            </div>

            <div class="info-section">
              <h3>使用场景</h3>
              <ul>
                <li v-for="(scene, idx) in activeGlobal.useCases" :key="idx">{{ scene }}</li>
              </ul>
            </div>

            <div class="info-section">
              <h3>代码示例</h3>
              <pre class="code-block"><code>{{ activeGlobal.codeExample }}</code></pre>
            </div>

            <div class="info-section">
              <h3>注意事项</h3>
              <p>{{ activeGlobal.notes }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>

    <footer class="footer">
      <p>Node.js {{ nodeVersion }} | 全局变量共 {{ globals.length }} 个 | Vue3 实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface GlobalVariable {
  name: string;
  purpose: string;
  useCases: string[];
  codeExample: string;
  notes: string;
}

const globals = ref<GlobalVariable[]>([
  {
    name: "__dirname",
    purpose: "返回当前模块所在的目录路径",
    useCases: [
      "构建基于当前文件位置的相对路径",
      "读取与当前模块同目录的配置文件",
      "定位模块资源文件"
    ],
    codeExample: `// 获取当前目录下的文件
import fs from 'fs';
import path from 'path';

const configPath = path.join(__dirname, 'config.json');
const config = fs.readFileSync(configPath, 'utf-8');`,
    notes: "在ES模块中，需要使用 import.meta.url 结合 fileURLToPath 来获得类似功能"
  },
  {
    name: "__filename",
    purpose: "返回当前模块文件的完整绝对路径",
    useCases: [
      "调试时打印当前执行文件信息",
      "动态加载同目录下的其他文件",
      "在日志中记录执行文件路径"
    ],
    codeExample: `console.log('当前执行文件:', __filename);

// 示例输出: /Users/project/src/app.js`,
    notes: "在ES模块中，可通过 import.meta.url 获取文件URL"
  },
  {
    name: "exports / module.exports",
    purpose: "定义模块的导出内容",
    useCases: [
      "创建可复用的模块",
      "导出函数、对象或值供其他模块使用",
      "实现模块化架构"
    ],
    codeExample: `// 导出一个函数
module.exports = function greet(name) {
  return 'Hello, ' + name;
};

// 或使用exports
exports.sayHello = function() {
  console.log('Hello!');
};`,
    notes: "exports 是 module.exports 的引用，直接赋值 exports 会切断关联"
  },
  {
    name: "require()",
    purpose: "加载模块、JSON文件或本地文件",
    useCases: [
      "导入Node.js核心模块",
      "加载npm安装的第三方模块",
      "导入本地项目模块",
      "加载JSON配置文件"
    ],
    codeExample: `// 加载核心模块
const fs = require('fs');

// 加载本地模块
const utils = require('./utils');

// 加载JSON文件
const config = require('../config.json');`,
    notes: "在ES模块中使用 import 语法替代，require 是同步操作"
  },
  {
    name: "module",
    purpose: "表示当前模块的引用",
    useCases: [
      "访问模块信息（id, path, exports等）",
      "检查模块是否为主入口",
      "获取模块的父子关系"
    ],
    codeExample: `console.log('模块ID:', module.id);
console.log('模块路径:', module.path);
console.log('父模块:', module.parent);

// 检查是否是主模块
if (require.main === module) {
  console.log('这是主入口文件');
}`,
    notes: "在ES模块中，使用 import.meta 替代"
  },
  {
    name: "process",
    purpose: "提供当前Node.js进程的信息和控制",
    useCases: [
      "访问环境变量(process.env)",
      "获取命令行参数(process.argv)",
      "控制进程退出(process.exit())",
      "监听进程信号"
    ],
    codeExample: `// 访问环境变量
const apiKey = process.env.API_KEY;

// 获取命令行参数
const [nodePath, scriptPath, ...args] = process.argv;

// 退出进程
if (error) {
  console.error('严重错误!');
  process.exit(1);
}`,
    notes: "修改 process.env 是同步操作且只影响当前进程"
  }
]);

const activeIndex = ref(0);
const activeGlobal = computed(() => globals.value[activeIndex.value]);

// 模拟获取Node版本
const nodeVersion = "v18.16.1";
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;600&family=Inter:wght@300;400;600;700&display=swap');

:root {
  --primary: #3eaf7c;
  --primary-dark: #2c8c5f;
  --secondary: #42b883;
  --dark: #1a1a1a;
  --darker: #121212;
  --light: #f8f8f8;
  --gray: #e0e0e0;
  --gray-dark: #5d5d5d;
  --code-bg: #2d2d2d;
  --card-bg: #222;
  --border: #3a3a3a;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--darker);
  color: var(--light);
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.node-globals-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  padding: 3rem 0 2rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2rem;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--gray);
    margin-bottom: 1.5rem;
  }
}

.terminal-prompt {
  background: #1e1e1e;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 20px;
  max-width: 400px;
  margin: 0 auto;
  font-family: 'Source Code Pro', monospace;
  text-align: left;

  .prompt-user {
    color: #4ec9b0;
    font-weight: 600;
  }

  .prompt-path {
    color: #d7ba7d;
    margin: 0 5px;
  }

  .prompt-char {
    color: var(--primary);
  }
}

.content-wrapper {
  display: flex;
  gap: 30px;
  flex: 1;
}

.sidebar {
  width: 280px;
  flex-shrink: 0;

  .navigation {
    background: var(--card-bg);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    border: 1px solid var(--border);

    h3 {
      font-size: 1.2rem;
      margin-bottom: 15px;
      color: var(--primary);
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border);
    }

    ul {
      list-style: none;

      li {
        padding: 10px 15px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 8px;
        font-family: 'Source Code Pro', monospace;
        font-weight: 500;

        &:hover {
          background: rgba(62, 175, 124, 0.15);
        }

        &.active {
          background: rgba(62, 175, 124, 0.25);
          color: var(--primary);
          font-weight: 600;
        }
      }
    }
  }

  .node-process {
    background: var(--card-bg);
    border-radius: 12px;
    padding: 20px;
    border: 1px solid var(--border);

    p {
      text-align: center;
      margin-top: 15px;
      color: var(--gray);
      font-size: 0.9rem;
    }
  }
}

.main-content {
  flex: 1;
}

.global-card {
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border);

  .card-header {
    background: rgba(62, 175, 124, 0.1);
    padding: 20px 25px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: 1.8rem;
      color: var(--primary);
    }

    .module-tag {
      background: rgba(66, 184, 131, 0.2);
      color: var(--secondary);
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }
  }

  .card-body {
    padding: 25px;
  }
}

.info-section {
  margin-bottom: 25px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 12px;
    color: var(--primary);
    display: flex;
    align-items: center;

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
      margin-left: 15px;
    }
  }

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 8px;
      position: relative;
      padding-left: 15px;

      &::before {
        content: '•';
        color: var(--primary);
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}

.code-block {
  background: var(--code-bg);
  border-radius: 8px;
  padding: 18px;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  border: 1px solid #3a3a3a;

  code {
    color: #dcdcdc;

    .token {
      &.keyword {
        color: #c586c0;
      }

      &.function {
        color: #dcdcaa;
      }

      &.string {
        color: #ce9178;
      }

      &.comment {
        color: #6a9955;
      }

      &.variable {
        color: #9cdcfe;
      }

      &.number {
        color: #b5cea8;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 25px 0;
  margin-top: 40px;
  color: var(--gray);
  font-size: 0.9rem;
  border-top: 1px solid var(--border);
}

.process-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 200px;

  .process-circle {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 2px solid var(--primary);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .core {
      position: absolute;
      width: 80px;
      height: 80px;
      background: rgba(62, 175, 124, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--primary);
    }

    .module {
      position: absolute;
      top: 20px;
      left: -40px;
      width: 90px;
      text-align: center;
      font-size: 0.9rem;
      color: #d7ba7d;
    }

    .global {
      position: absolute;
      bottom: 20px;
      right: -40px;
      width: 90px;
      text-align: center;
      font-size: 0.9rem;
      color: #4ec9b0;
    }
  }

  .arrows {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 100px;

    .arrow {
      position: absolute;
      width: 40px;
      height: 2px;
      background: var(--primary);

      &::before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        border-top: 2px solid var(--primary);
        border-right: 2px solid var(--primary);
        transform: rotate(45deg);
        right: 0;
        top: -4px;
      }

      &:first-child {
        top: 30px;
        left: -60px;
        transform: rotate(-20deg);
      }

      &:last-child {
        top: 30px;
        right: -60px;
        transform: rotate(20deg);
      }
    }
  }
}

@media (max-width: 900px) {
  .content-wrapper {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }

  .header {
    padding: 2rem 0 1.5rem;

    h1 {
      font-size: 2.2rem;
    }
  }

  .terminal-prompt {
    max-width: 100%;
  }
}
</style>
