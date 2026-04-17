<template>
  <div class="fs-container">
    <header class="header">
      <h1>Node.js fs模块介绍</h1>
      <p class="subtitle">文件系统操作基本指南 - 包含所有API及使用示例</p>
    </header>

    <div class="content-wrapper">
      <section class="intro">
        <h2><span class="icon">📂</span> 模块简介</h2>
        <div class="card">
          <p>
            fs模块是Node.js的核心模块，提供了与文件系统交互的API。所有文件系统操作都具有同步和异步形式。
          </p>

          <div class="usage">
            <div class="code-block">
              <pre><code>// 引入fs模块
const fs = require('fs'); // CommonJS
import fs from 'fs';      // ES Modules</code></pre>
            </div>
          </div>

          <div class="features">
            <h3>主要功能：</h3>
            <ul>
              <li>文件读写操作</li>
              <li>目录创建与遍历</li>
              <li>文件元数据操作</li>
              <li>文件监听与变更通知</li>
              <li>文件权限管理</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="api-categories">
        <h2><span class="icon">🗂️</span> API分类</h2>
        <div class="category-tabs">
          <button
            v-for="(category, index) in categories"
            :key="index"
            :class="['tab', { active: activeCategory === category.id }]"
            @click="activeCategory = category.id"
          >
            {{ category.name }}
          </button>
        </div>

        <div class="api-list">
          <div v-for="api in filteredApis" :key="api.name" class="api-card">
            <div class="api-header">
              <span class="api-name">{{ api.name }}</span>
              <span class="api-type" :class="api.type">{{ api.type }}</span>
              <span class="api-since" v-if="api.added">v{{ api.added }}</span>
            </div>

            <div class="api-description">{{ api.description }}</div>

            <div class="api-usage">
              <div class="code-block">
                <pre><code>{{ api.usage }}</code></pre>
              </div>
            </div>

            <div class="api-params" v-if="api.params">
              <div class="param-title">参数：</div>
              <ul>
                <li v-for="(param, idx) in api.params" :key="idx">
                  <code>{{ param.name }}</code
                  >: {{ param.description }}
                  <span v-if="param.optional" class="optional">(可选)</span>
                </li>
              </ul>
            </div>

            <div class="api-notes" v-if="api.notes">
              <div class="notes-title">注意：</div>
              <p>{{ api.notes }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2><span class="icon">💡</span> 最佳实践与注意事项</h2>
        <div class="card-grid">
          <div class="practice-card">
            <h3>异步 vs 同步</h3>
            <p>
              在大多数情况下，应使用异步方法以避免阻塞事件循环。同步方法仅适用于脚本或启动时操作。
            </p>
          </div>

          <div class="practice-card">
            <h3>错误处理</h3>
            <p>始终处理异步操作中的错误，使用try/catch处理同步操作错误。</p>
            <div class="code-block">
              <pre><code>// 异步错误处理
fs.readFile('file.txt', (err, data) => {
  if (err) {
    console.error('读取失败:', err);
    return;
  }
  console.log(data);
});</code></pre>
            </div>
          </div>

          <div class="practice-card">
            <h3>Promise API</h3>
            <p>使用fs/promises API可以更优雅地处理异步操作，避免回调地狱。</p>
            <div class="code-block">
              <pre><code>import fs from 'fs/promises';

async function readFiles() {
  try {
    const data = await fs.readFile('file.txt');
    console.log(data);
  } catch (err) {
    console.error('读取失败:', err);
  }
}</code></pre>
            </div>
          </div>

          <div class="practice-card">
            <h3>路径处理</h3>
            <p>使用path模块处理文件路径，避免跨平台问题。</p>
            <div class="code-block">
              <pre><code>import path from 'path';

const filePath = path.join(__dirname, 'files', 'data.txt');
fs.readFile(filePath, 'utf8', (err, data) => {
  // ...
});</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison">
        <h2><span class="icon">⚖️</span> 同步与异步API对比</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>异步API</th>
                <th>同步API</th>
                <th>Promise API</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>阻塞事件循环</td>
                <td>❌ 不阻塞</td>
                <td>✅ 阻塞</td>
                <td>❌ 不阻塞</td>
              </tr>
              <tr>
                <td>错误处理</td>
                <td>回调函数第一个参数</td>
                <td>try/catch</td>
                <td>try/catch</td>
              </tr>
              <tr>
                <td>性能</td>
                <td>高</td>
                <td>低</td>
                <td>高</td>
              </tr>
              <tr>
                <td>使用场景</td>
                <td>服务器应用</td>
                <td>脚本/初始化</td>
                <td>现代应用</td>
              </tr>
              <tr>
                <td>代码风格</td>
                <td>回调函数</td>
                <td>同步风格</td>
                <td>async/await</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>fs模块是Node.js文件操作的核心，掌握其API对于开发高效可靠的Node.js应用至关重要。</p>
      <p class="version">当前基于Node.js v18.x文档</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// API分类
const categories = [
  { id: 'all', name: '全部API' },
  { id: 'file', name: '文件操作' },
  { id: 'dir', name: '目录操作' },
  { id: 'meta', name: '元数据' },
  { id: 'watch', name: '文件监听' },
  { id: 'stream', name: '流操作' },
  { id: 'promise', name: 'Promise API' },
]

const activeCategory = ref('all')

// fs API数据
const fsApis = [
  {
    name: 'fs.readFile',
    type: '异步',
    category: 'file',
    added: '0.1',
    description: '异步读取文件内容',
    usage: `fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});`,
    params: [
      { name: 'path', description: '文件路径' },
      { name: 'options', description: '编码或选项对象', optional: true },
      { name: 'callback', description: '回调函数(err, data)' },
    ],
    notes: '默认返回Buffer对象，指定编码则返回字符串',
  },
  {
    name: 'fs.writeFile',
    type: '异步',
    category: 'file',
    added: '0.1',
    description: '异步写入文件内容',
    usage: `fs.writeFile('file.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('文件已保存');
});`,
    params: [
      { name: 'path', description: '文件路径' },
      { name: 'data', description: '写入的数据' },
      { name: 'options', description: '编码或选项对象', optional: true },
      { name: 'callback', description: '回调函数(err)' },
    ],
    notes: '如果文件已存在，默认会覆盖内容',
  },
  {
    name: 'fs.readdir',
    type: '异步',
    category: 'dir',
    added: '0.1',
    description: '读取目录内容',
    usage: `fs.readdir('/path/to/dir', (err, files) => {
  if (err) throw err;
  console.log(files); // 文件列表
});`,
    params: [
      { name: 'path', description: '目录路径' },
      { name: 'options', description: '选项对象', optional: true },
      { name: 'callback', description: '回调函数(err, files)' },
    ],
  },
  {
    name: 'fs.stat',
    type: '异步',
    category: 'meta',
    added: '0.1',
    description: '获取文件/目录的状态信息',
    usage: `fs.stat('file.txt', (err, stats) => {
  if (err) throw err;
  console.log(stats.isFile()); // true
  console.log(stats.size);     // 文件大小
});`,
    params: [
      { name: 'path', description: '文件/目录路径' },
      { name: 'callback', description: '回调函数(err, stats)' },
    ],
  },
  {
    name: 'fs.rename',
    type: '异步',
    category: 'file',
    added: '0.1',
    description: '重命名或移动文件/目录',
    usage: `fs.rename('old.txt', 'new.txt', (err) => {
  if (err) throw err;
  console.log('重命名成功');
});`,
    params: [
      { name: 'oldPath', description: '原始路径' },
      { name: 'newPath', description: '新路径' },
      { name: 'callback', description: '回调函数(err)' },
    ],
  },
  {
    name: 'fs.unlink',
    type: '异步',
    category: 'file',
    added: '0.1',
    description: '删除文件',
    usage: `fs.unlink('file.txt', (err) => {
  if (err) throw err;
  console.log('文件已删除');
});`,
    params: [
      { name: 'path', description: '文件路径' },
      { name: 'callback', description: '回调函数(err)' },
    ],
  },
  {
    name: 'fs.mkdir',
    type: '异步',
    category: 'dir',
    added: '0.1',
    description: '创建新目录',
    usage: `fs.mkdir('/path/to/new/dir', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('目录已创建');
});`,
    params: [
      { name: 'path', description: '目录路径' },
      { name: 'options', description: '选项对象', optional: true },
      { name: 'callback', description: '回调函数(err)' },
    ],
    notes: '设置recursive: true可以创建嵌套目录',
  },
  {
    name: 'fs.rmdir',
    type: '异步',
    category: 'dir',
    added: '0.1',
    description: '删除目录',
    usage: `fs.rmdir('/path/to/dir', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('目录已删除');
});`,
    params: [
      { name: 'path', description: '目录路径' },
      { name: 'options', description: '选项对象', optional: true },
      { name: 'callback', description: '回调函数(err)' },
    ],
    notes: 'Node.js 14+支持recursive选项删除非空目录',
  },
  {
    name: 'fs.copyFile',
    type: '异步',
    category: 'file',
    added: '8.5',
    description: '复制文件',
    usage: `fs.copyFile('source.txt', 'dest.txt', (err) => {
  if (err) throw err;
  console.log('文件已复制');
});`,
    params: [
      { name: 'src', description: '源文件路径' },
      { name: 'dest', description: '目标文件路径' },
      { name: 'mode', description: '复制模式', optional: true },
      { name: 'callback', description: '回调函数(err)' },
    ],
  },
  {
    name: 'fs.watch',
    type: '异步',
    category: 'watch',
    added: '0.5',
    description: '监视文件或目录的变化',
    usage: `const watcher = fs.watch('file.txt', (eventType, filename) => {
  console.log(\`事件类型: \${eventType}, 文件名: \${filename}\`);
});

// 停止监视
watcher.close();`,
    params: [
      { name: 'filename', description: '文件/目录路径' },
      { name: 'options', description: '选项对象', optional: true },
      { name: 'listener', description: '监听函数(eventType, filename)' },
    ],
  },
  {
    name: 'fs.watchFile',
    type: '异步',
    category: 'watch',
    added: '0.1',
    description: '监视文件或目录的变化',
    usage: `fs.watchFile('file.txt', (curr, prev) => {
  console.log('文件已修改');
});`,
    params: [
      { name: 'filename', description: '文件/目录路径' },
      { name: 'options', description: '选项对象', optional: true },
      { name: 'listener', description: '监听函数(curr, prev)' },
    ],
  },
  {
    name: 'fs.unwatchFile',
    type: '异步',
    category: 'watch',
    added: '0.1',
    description: '停止监视文件或目录的变化',
    usage: `fs.unwatchFile('file.txt');`,
    params: [{ name: 'filename', description: '文件/目录路径' }],
  },
  {
    name: 'fs.createReadStream',
    type: '流操作',
    category: 'stream',
    added: '0.1',
    description: '创建可读流读取大文件',
    usage: `const stream = fs.createReadStream('bigfile.txt', 'utf8');
stream.on('data', (chunk) => {
  console.log('收到数据块:', chunk.length);
});
stream.on('end', () => {
  console.log('读取完成');
});`,
    params: [
      { name: 'path', description: '文件路径' },
      { name: 'options', description: '流选项', optional: true },
    ],
  },
  {
    name: 'fs.createWriteStream',
    type: '流操作',
    category: 'stream',
    added: '0.1',
    description: '创建可写流写入大文件',
    usage: `const stream = fs.createWriteStream('output.txt');
stream.write('数据块1\\n');
stream.write('数据块2\\n');
stream.end('最后数据');`,
    params: [
      { name: 'path', description: '文件路径' },
      { name: 'options', description: '流选项', optional: true },
    ],
  },
  {
    name: 'fs.promises.readFile',
    type: 'Promise',
    category: 'promise',
    added: '10.0',
    description: 'Promise版本的readFile',
    usage: `import fs from 'fs/promises';

async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}`,
    params: [
      { name: 'path', description: '文件路径' },
      { name: 'options', description: '编码或选项对象', optional: true },
    ],
  },
  {
    name: 'fs.existsSync',
    type: '同步',
    category: 'meta',
    added: '0.1',
    description: '同步检查文件/目录是否存在',
    usage: `if (fs.existsSync('file.txt')) {
  console.log('文件存在');
} else {
  console.log('文件不存在');
}`,
    params: [{ name: 'path', description: '文件/目录路径' }],
    notes: '异步版本fs.exists已废弃，推荐使用fs.stat或fs.access',
  },
  {
    name: 'fs.access',
    type: '异步',
    category: 'meta',
    added: '0.1',
    description: '检查文件访问权限',
    usage: `fs.access('file.txt', fs.constants.R_OK, (err) => {
  console.log(err ? '不可读' : '可读');
});`,
    params: [
      { name: 'path', description: '文件路径' },
      { name: 'mode', description: '访问模式', optional: true },
      { name: 'callback', description: '回调函数(err)' },
    ],
  },
  {
    name: 'fs.appendFile',
    type: '异步',
    category: 'file',
    added: '0.1',
    description: '追加数据到文件',
    usage: `fs.appendFile('log.txt', '新日志\\n', (err) => {
  if (err) throw err;
  console.log('日志已追加');
});`,
    params: [
      { name: 'path', description: '文件路径' },
      { name: 'data', description: '追加的数据' },
      { name: 'options', description: '编码或选项对象', optional: true },
      { name: 'callback', description: '回调函数(err)' },
    ],
  },
  {
    name: 'fs.realpath',
    type: '异步',
    category: 'meta',
    added: '0.1',
    description: '获取规范化的绝对路径',
    usage: `fs.realpath('/path/with/../symlink', (err, resolvedPath) => {
  console.log(resolvedPath); // 解析后的路径
});`,
    params: [
      { name: 'path', description: '原始路径' },
      { name: 'options', description: '选项对象', optional: true },
      { name: 'callback', description: '回调函数(err, resolvedPath)' },
    ],
  },
]

// 计算过滤后的API
const filteredApis = computed(() => {
  if (activeCategory.value === 'all') return fsApis
  return fsApis.filter((api) => api.category === activeCategory.value)
})
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4285f4;
@secondary-color: #34a853;
@accent-color: #ea4335;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #333333;
@border-color: #e0e0e0;
@code-bg: #f5f7fa;
@success-color: #34a853;
@warning-color: #fbbc05;
@danger-color: #ea4335;
@info-color: #4285f4;

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.fs-container {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  color: @text-color;
  background-color: @light-bg;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary-color, #1a73e8);
  color: white;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  background-color: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
}

h2 {
  font-size: 1.8rem;
  color: @primary-color;
  margin-bottom: 25px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e8eaed;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
  }
}

h3 {
  font-size: 1.4rem;
  color: @secondary-color;
  margin: 20px 0 15px;
}

.card {
  background-color: @card-bg;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
  border-left: 4px solid @primary-color;
}

// 分类标签页
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 25px;

  .tab {
    background-color: #e8f0fe;
    color: @primary-color;
    border: none;
    border-radius: 24px;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #d2e3fc;
    }

    &.active {
      background-color: @primary-color;
      color: white;
      box-shadow: 0 2px 6px rgba(66, 133, 244, 0.4);
    }
  }
}

// API卡片样式
.api-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.api-card {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-top: 3px solid @primary-color;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }
}

.api-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;

  .api-name {
    font-size: 1.4rem;
    font-weight: 600;
    color: @primary-color;
    font-family: 'Source Code Pro', monospace;
  }

  .api-type {
    font-size: 0.9rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 4px;

    &.异步 {
      background-color: #e8f0fe;
      color: @primary-color;
    }

    &.同步 {
      background-color: #e6f4ea;
      color: @secondary-color;
    }

    &.Promise {
      background-color: #fef7e0;
      color: #f57c00;
    }

    &.流操作 {
      background-color: #e8eaf6;
      color: #5c6bc0;
    }
  }

  .api-since {
    font-size: 0.85rem;
    background-color: #f1f3f4;
    color: #5f6368;
    padding: 3px 8px;
    border-radius: 4px;
    font-family: 'Source Code Pro', monospace;
  }
}

.api-description {
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: #5f6368;
  line-height: 1.7;
}

.api-params,
.api-notes {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px dashed #e0e0e0;

  .param-title,
  .notes-title {
    font-weight: 600;
    margin-bottom: 10px;
    color: @secondary-color;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: -15px;
        color: @primary-color;
        font-weight: bold;
      }

      code {
        background-color: #f1f3f4;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Source Code Pro', monospace;
      }

      .optional {
        color: #5f6368;
        font-size: 0.9em;
      }
    }
  }
}

// 代码块样式
.code-block {
  background-color: @code-bg;
  border-radius: 8px;
  padding: 18px;
  margin: 18px 0;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.95rem;
  border: 1px solid @border-color;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);

  pre {
    margin: 0;
    white-space: pre-wrap;
  }

  code {
    color: #2c3e50;
    line-height: 1.5;
  }
}

// 最佳实践网格
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 25px;

  .practice-card {
    background-color: @card-bg;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-top: 3px solid @success-color;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }

    h3 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 15px;
    }

    p {
      margin-bottom: 15px;
    }
  }
}

// 比较表格
.comparison-table {
  overflow-x: auto;
  margin-top: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 15px;
      text-align: left;
      border: 1px solid #e0e0e0;
    }

    thead {
      background-color: @primary-color;
      color: white;

      th {
        font-weight: 500;
        text-align: center;
      }
    }

    tbody {
      tr:nth-child(even) {
        background-color: #f8f9fa;
      }

      tr:hover {
        background-color: #e8f0fe;
      }

      td {
        &:first-child {
          font-weight: 500;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 25px;
  font-style: italic;
  color: #666;
  margin-top: 20px;
  border-top: 1px solid @border-color;
  line-height: 1.8;

  .version {
    font-size: 0.9rem;
    color: #999;
    margin-top: 10px;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .content-wrapper {
    padding: 20px;
  }

  .category-tabs {
    gap: 8px;

    .tab {
      padding: 8px 16px;
      font-size: 0.9rem;
    }
  }

  .api-header .api-name {
    font-size: 1.2rem;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
