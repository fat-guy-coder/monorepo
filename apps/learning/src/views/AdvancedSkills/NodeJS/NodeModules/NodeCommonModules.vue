<template>
  <div class="node-modules-container">
    <!-- 头部区域 -->
    <header>
      <div class="header-content">
        <h1><i class="fas fa-cube"></i> Node.js 常用模块大全</h1>
        <p class="subtitle">核心模块、文件系统、网络通信、实用工具等全面解析</p>
      </div>
      <div class="stats">
        <div class="stat-card">
          <i class="fas fa-boxes"></i>
          <div>
            <div class="stat-value">100+</div>
            <div class="stat-label">内置模块</div>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-code"></i>
          <div>
            <div class="stat-value">1,000,000+</div>
            <div class="stat-label">npm 包</div>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-users"></i>
          <div>
            <div class="stat-value">20M+</div>
            <div class="stat-label">开发者</div>
          </div>
        </div>
      </div>
    </header>

    <!-- 模块分类导航 -->
    <div class="category-nav">
      <button
        v-for="category in categories"
        :key="category.id"
        :class="{ active: activeCategory === category.id }"
        @click="activeCategory = category.id"
      >
        <i :class="category.icon"></i>
        {{ category.name }}
      </button>
    </div>

    <!-- 模块列表 -->
    <div class="modules-grid">
      <div
        v-for="module in filteredModules"
        :key="module.name"
        class="module-card"
        :class="module.category"
      >
        <div class="module-header">
          <div class="module-icon">
            <i :class="module.icon"></i>
          </div>
          <h2>{{ module.name }}</h2>
          <div class="module-tag">{{ module.tag }}</div>
        </div>

        <div class="module-description">
          {{ module.description }}
        </div>

        <div class="module-usage">
          <div class="usage-header">
            <i class="fas fa-plug"></i>
            <h3>引入方式</h3>
          </div>
          <pre><code>{{ module.import }}</code></pre>
        </div>

        <div class="module-apis">
          <div class="apis-header">
            <i class="fas fa-code"></i>
            <h3>常用 API</h3>
          </div>

          <div class="api-list">
            <div v-for="api in module.apis" :key="api.name" class="api-item">
              <div class="api-name">{{ api.name }}</div>
              <div class="api-description">{{ api.description }}</div>
              <div class="api-signature">
                <pre><code>{{ api.signature }}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="module-example" v-if="module.example">
          <div class="example-header">
            <i class="fas fa-laptop-code"></i>
            <h3>使用示例</h3>
          </div>
          <pre><code>{{ module.example }}</code></pre>
        </div>
      </div>
    </div>

    <!-- 模块使用统计 -->
    <div class="usage-stats">
      <h2><i class="fas fa-chart-bar"></i> Node.js 模块使用统计</h2>
      <div class="charts">
        <div class="chart">
          <h3>核心模块使用频率</h3>
          <div class="bar-chart">
            <div v-for="stat in coreUsage" :key="stat.name" class="bar-container">
              <div class="bar-label">{{ stat.name }}</div>
              <div class="bar">
                <div class="bar-fill" :style="{ width: stat.percent + '%' }">
                  <span>{{ stat.percent }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart">
          <h3>第三方模块流行度</h3>
          <div class="bar-chart">
            <div v-for="stat in npmUsage" :key="stat.name" class="bar-container">
              <div class="bar-label">{{ stat.name }}</div>
              <div class="bar">
                <div class="bar-fill" :style="{ width: stat.percent + '%' }">
                  <span>{{ stat.downloads }}/周</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="conclusion">
      <h2><i class="fas fa-lightbulb"></i> Node.js 模块使用建议</h2>
      <div class="tips">
        <div class="tip">
          <i class="fas fa-check-circle"></i>
          <p>优先使用核心模块，减少依赖</p>
        </div>
        <div class="tip">
          <i class="fas fa-check-circle"></i>
          <p>第三方模块选择维护活跃、文档完善的库</p>
        </div>
        <div class="tip">
          <i class="fas fa-check-circle"></i>
          <p>定期更新依赖，注意安全漏洞</p>
        </div>
        <div class="tip">
          <i class="fas fa-check-circle"></i>
          <p>使用ES模块语法(import/export)替代CommonJS</p>
        </div>
      </div>
    </div>

    <footer>
      <p>Node.js 开发指南 &copy; {{ new Date().getFullYear() }} - 常用模块参考手册</p>
      <div class="node-version">Node.js</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Node.js 版本信息

// 分类数据
const categories = ref([
  { id: 'all', name: '全部模块', icon: 'fas fa-list' },
  { id: 'core', name: '核心模块', icon: 'fas fa-microchip' },
  { id: 'fs', name: '文件系统', icon: 'fas fa-file' },
  { id: 'net', name: '网络通信', icon: 'fas fa-network-wired' },
  { id: 'util', name: '实用工具', icon: 'fas fa-tools' },
  { id: 'async', name: '异步处理', icon: 'fas fa-sync-alt' },
  { id: 'npm', name: '热门 npm 包', icon: 'fab fa-npm' },
])

const activeCategory = ref('all')

// 模块数据
const modules = ref([
  {
    name: 'fs',
    category: 'core',
    tag: '文件操作',
    icon: 'fas fa-file',
    description: '提供文件系统操作功能，包括文件读写、目录操作、权限管理等。',
    import: "import fs from 'fs';",
    apis: [
      {
        name: 'fs.readFile',
        description: '异步读取文件内容',
        signature: 'fs.readFile(path[, options], callback)',
      },
      {
        name: 'fs.writeFile',
        description: '异步写入文件内容',
        signature: 'fs.writeFile(file, data[, options], callback)',
      },
      {
        name: 'fs.readdir',
        description: '读取目录内容',
        signature: 'fs.readdir(path[, options], callback)',
      },
      {
        name: 'fs.stat',
        description: '获取文件/目录信息',
        signature: 'fs.stat(path[, options], callback)',
      },
    ],
    example: `// 读取文件内容
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});`,
  },
  {
    name: 'path',
    category: 'core',
    tag: '路径处理',
    icon: 'fas fa-road',
    description: '提供处理文件和目录路径的实用工具，跨平台兼容。',
    import: "import path from 'path';",
    apis: [
      {
        name: 'path.join',
        description: '拼接路径片段',
        signature: 'path.join([...paths])',
      },
      {
        name: 'path.resolve',
        description: '解析为绝对路径',
        signature: 'path.resolve([...paths])',
      },
      {
        name: 'path.basename',
        description: '获取路径中的文件名',
        signature: 'path.basename(path[, ext])',
      },
      {
        name: 'path.extname',
        description: '获取文件扩展名',
        signature: 'path.extname(path)',
      },
    ],
    example: `// 拼接路径
const fullPath = path.join(__dirname, 'files', 'example.txt');
console.log(fullPath); // /home/user/project/files/example.txt`,
  },
  {
    name: 'http',
    category: 'net',
    tag: 'HTTP服务',
    icon: 'fas fa-globe',
    description: '创建 HTTP 服务器和客户端，构建 Web 应用和 API 服务的基础。',
    import: "import http from 'http';",
    apis: [
      {
        name: 'http.createServer',
        description: '创建 HTTP 服务器',
        signature: 'http.createServer([options][, requestListener])',
      },
      {
        name: 'http.request',
        description: '发起 HTTP 请求',
        signature: 'http.request(options[, callback])',
      },
      {
        name: 'http.get',
        description: '发起 HTTP GET 请求',
        signature: 'http.get(options[, callback])',
      },
    ],
    example: `// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
});

server.listen(3000);`,
  },
  {
    name: 'events',
    category: 'async',
    tag: '事件处理',
    icon: 'fas fa-bell',
    description: '提供事件触发和监听功能，Node.js 异步事件驱动架构的核心。',
    import: "import EventEmitter from 'events';",
    apis: [
      {
        name: 'emitter.on',
        description: '注册事件监听器',
        signature: 'emitter.on(eventName, listener)',
      },
      {
        name: 'emitter.emit',
        description: '触发事件',
        signature: 'emitter.emit(eventName[, ...args])',
      },
      {
        name: 'emitter.once',
        description: '注册单次事件监听器',
        signature: 'emitter.once(eventName, listener)',
      },
      {
        name: 'emitter.removeListener',
        description: '移除事件监听器',
        signature: 'emitter.removeListener(eventName, listener)',
      },
    ],
    example: `// 创建事件发射器
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// 注册事件监听
myEmitter.on('event', () => {
  console.log('事件被触发!');
});

// 触发事件
myEmitter.emit('event');`,
  },
  {
    name: 'util',
    category: 'util',
    tag: '实用工具',
    icon: 'fas fa-wrench',
    description: '提供各种实用功能，包括类型检查、错误处理、回调转换等。',
    import: "import util from 'util';",
    apis: [
      {
        name: 'util.promisify',
        description: '将回调函数转换为 Promise',
        signature: 'util.promisify(original)',
      },
      {
        name: 'util.format',
        description: '格式化字符串',
        signature: 'util.format(format[, ...args])',
      },
      {
        name: 'util.types',
        description: '类型检查工具',
        signature: 'util.types.isArrayBuffer(value)',
      },
      {
        name: 'util.inspect',
        description: '对象检查',
        signature: 'util.inspect(object[, options])',
      },
    ],
    example: `// 将回调函数转换为 Promise
const readFile = util.promisify(fs.readFile);

async function main() {
  const data = await readFile('example.txt', 'utf8');
  console.log(data);
}`,
  },
  {
    name: 'os',
    category: 'util',
    tag: '操作系统',
    icon: 'fas fa-desktop',
    description: '提供与操作系统相关的实用方法和属性，获取系统信息。',
    import: "import os from 'os';",
    apis: [
      {
        name: 'os.cpus',
        description: '获取 CPU 信息',
        signature: 'os.cpus()',
      },
      {
        name: 'os.totalmem',
        description: '获取系统总内存',
        signature: 'os.totalmem()',
      },
      {
        name: 'os.freemem',
        description: '获取空闲内存',
        signature: 'os.freemem()',
      },
      {
        name: 'os.platform',
        description: '获取操作系统平台',
        signature: 'os.platform()',
      },
    ],
    example: `// 获取系统信息
console.log(\`平台: \${os.platform()}\`);
console.log(\`内存: \${os.totalmem() / 1024 / 1024} MB\`);
console.log(\`CPU: \${os.cpus().length} 核心\`);`,
  },
  {
    name: 'crypto',
    category: 'core',
    tag: '加密安全',
    icon: 'fas fa-lock',
    description: '提供加密功能，包括哈希、HMAC、加密、解密、签名和验证。',
    import: "import crypto from 'crypto';",
    apis: [
      {
        name: 'crypto.createHash',
        description: '创建哈希对象',
        signature: 'crypto.createHash(algorithm[, options])',
      },
      {
        name: 'crypto.randomBytes',
        description: '生成加密强伪随机数据',
        signature: 'crypto.randomBytes(size[, callback])',
      },
      {
        name: 'crypto.createCipheriv',
        description: '创建加密对象',
        signature: 'crypto.createCipheriv(algorithm, key, iv[, options])',
      },
      {
        name: 'crypto.createDecipheriv',
        description: '创建解密对象',
        signature: 'crypto.createDecipheriv(algorithm, key, iv[, options])',
      },
    ],
    example: `// 创建 SHA-256 哈希
const hash = crypto.createHash('sha256');
hash.update('some data');
console.log(hash.digest('hex'));`,
  },
  {
    name: 'stream',
    category: 'core',
    tag: '流处理',
    icon: 'fas fa-stream',
    description: '提供处理流数据的抽象接口，用于高效处理大量数据。',
    import: "import stream from 'stream';",
    apis: [
      {
        name: 'stream.Readable',
        description: '可读流',
        signature: 'new stream.Readable([options])',
      },
      {
        name: 'stream.Writable',
        description: '可写流',
        signature: 'new stream.Writable([options])',
      },
      {
        name: 'stream.Duplex',
        description: '双工流',
        signature: 'new stream.Duplex([options])',
      },
      {
        name: 'stream.Transform',
        description: '转换流',
        signature: 'new stream.Transform([options])',
      },
    ],
    example: `// 创建可读流
const readable = new stream.Readable({
  read() {}
});

readable.push('数据块1');
readable.push('数据块2');
readable.push(null); // 结束流`,
  },
  {
    name: 'child_process',
    category: 'core',
    tag: '子进程',
    icon: 'fas fa-code-branch',
    description: '提供创建和管理子进程的功能，用于执行外部命令和脚本。',
    import: "import child_process from 'child_process';",
    apis: [
      {
        name: 'child_process.exec',
        description: '执行 shell 命令',
        signature: 'child_process.exec(command[, options][, callback])',
      },
      {
        name: 'child_process.spawn',
        description: '启动新进程',
        signature: 'child_process.spawn(command[, args][, options])',
      },
      {
        name: 'child_process.fork',
        description: '派生新 Node.js 进程',
        signature: 'child_process.fork(modulePath[, args][, options])',
      },
      {
        name: 'child_process.execFile',
        description: '执行可执行文件',
        signature: 'child_process.execFile(file[, args][, options][, callback])',
      },
    ],
    example: `// 执行系统命令
child_process.exec('ls -l', (err, stdout, stderr) => {
  if (err) throw err;
  console.log(stdout);
});`,
  },
  {
    name: 'express',
    category: 'npm',
    tag: 'Web框架',
    icon: 'fab fa-node-js',
    description: '快速、极简的 Node.js Web 框架，用于构建 Web 应用和 API。',
    import: "import express from 'express';",
    apis: [
      {
        name: 'express()',
        description: '创建 Express 应用',
        signature: 'const app = express();',
      },
      {
        name: 'app.get',
        description: '处理 GET 请求',
        signature: 'app.get(path, callback)',
      },
      {
        name: 'app.post',
        description: '处理 POST 请求',
        signature: 'app.post(path, callback)',
      },
      {
        name: 'app.use',
        description: '使用中间件',
        signature: 'app.use([path,] callback)',
      },
    ],
    example: `// 创建 Express 应用
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);`,
  },
  {
    name: 'mongoose',
    category: 'npm',
    tag: 'MongoDB',
    icon: 'fas fa-database',
    description: 'MongoDB 对象建模工具，用于在异步环境中工作。',
    import: "import mongoose from 'mongoose';",
    apis: [
      {
        name: 'mongoose.connect',
        description: '连接 MongoDB 数据库',
        signature: 'mongoose.connect(uri[, options])',
      },
      {
        name: 'mongoose.Schema',
        description: '定义数据模型结构',
        signature: 'new mongoose.Schema({ ... })',
      },
      {
        name: 'mongoose.model',
        description: '创建数据模型',
        signature: 'mongoose.model(name, schema)',
      },
      {
        name: 'Model.find',
        description: '查询文档',
        signature: 'Model.find(conditions[, projection])',
      },
    ],
    example: `// 定义模型
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', userSchema);

// 查询用户
User.find({ name: 'John' }).exec();`,
  },
  {
    name: 'axios',
    category: 'npm',
    tag: 'HTTP客户端',
    icon: 'fas fa-cloud-download-alt',
    description: '基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js。',
    import: "import axios from 'axios';",
    apis: [
      {
        name: 'axios.get',
        description: '发起 GET 请求',
        signature: 'axios.get(url[, config])',
      },
      {
        name: 'axios.post',
        description: '发起 POST 请求',
        signature: 'axios.post(url[, data[, config]])',
      },
      {
        name: 'axios.request',
        description: '通用请求方法',
        signature: 'axios.request(config)',
      },
      {
        name: 'axios.create',
        description: '创建自定义实例',
        signature: 'axios.create([config])',
      },
    ],
    example: `// 发起 GET 请求
axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });`,
  },
  {
    name: 'lodash',
    category: 'npm',
    tag: '实用工具',
    icon: 'fas fa-box-open',
    description: '提供模块化、高性能的实用工具函数，简化 JavaScript 编程。',
    import: "import _ from 'lodash';",
    apis: [
      {
        name: '_.cloneDeep',
        description: '深拷贝对象',
        signature: '_.cloneDeep(value)',
      },
      {
        name: '_.debounce',
        description: '防抖函数',
        signature: '_.debounce(func, [wait=0], [options={}])',
      },
      {
        name: '_.throttle',
        description: '节流函数',
        signature: '_.throttle(func, [wait=0], [options={}])',
      },
      {
        name: '_.get',
        description: '安全获取嵌套属性',
        signature: '_.get(object, path, [defaultValue])',
      },
    ],
    example: `// 深拷贝对象
const original = { a: 1, b: { c: 2 } };
const copy = _.cloneDeep(original);`,
  },
])

// 过滤模块
const filteredModules = computed(() => {
  if (activeCategory.value === 'all') return modules.value
  return modules.value.filter((module) => module.category === activeCategory.value)
})

// 模块使用统计
const coreUsage = ref([
  { name: 'fs', percent: 92 },
  { name: 'path', percent: 89 },
  { name: 'http', percent: 85 },
  { name: 'util', percent: 78 },
  { name: 'events', percent: 72 },
  { name: 'os', percent: 65 },
])

interface NpmUsage {
  name: string
  downloads: string
  percent?: number
}

const npmUsage = ref<NpmUsage[]>([
  { name: 'express', downloads: '32,000,000' },
  { name: 'axios', downloads: '29,500,000' },
  { name: 'lodash', downloads: '28,000,000' },
  { name: 'mongoose', downloads: '2,500,000' },
  { name: 'moment', downloads: '18,000,000' },
  { name: 'chalk', downloads: '15,000,000' },
])

// 计算 npm 下载量的百分比（用于图表）
npmUsage.value.forEach((item) => {
  const downloads = parseFloat(item.downloads.replace(/,/g, ''))
  item.percent = Math.min(100, downloads / 350000) // 以最大下载量为基准计算百分比
})
</script>

<style lang="less" scoped>
.node-modules-container {
  font-family: 'Roboto', sans-serif;
  background: #f8fafc;
  color: #2d3748;
  line-height: 1.6;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px;
}

header {
  background: linear-gradient(135deg, #4a69bd 0%, #6a89cc 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  .header-content {
    max-width: 900px;
    margin: 0 auto;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      font-weight: 600;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 800px;
      margin: 0 auto;
      font-weight: 300;
      color: #e0e7ff;
    }
  }
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;

  .stat-card {
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(255, 255, 255, 0.1);
    padding: 15px 25px;
    border-radius: 10px;
    min-width: 180px;

    i {
      font-size: 2rem;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }
  }
}

.category-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;

  button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 30px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    i {
      font-size: 1.1rem;
    }

    &:hover {
      background: #edf2f7;
      transform: translateY(-2px);
    }

    &.active {
      background: #4a69bd;
      color: white;
      border-color: #4a69bd;
      box-shadow: 0 4px 10px rgba(74, 105, 189, 0.3);
    }
  }
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.module-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  &.core {
    border-top: 4px solid #4a69bd;
  }
  &.fs {
    border-top: 4px solid #38a169;
  }
  &.net {
    border-top: 4px solid #3182ce;
  }
  &.util {
    border-top: 4px solid #d69e2e;
  }
  &.async {
    border-top: 4px solid #805ad5;
  }
  &.npm {
    border-top: 4px solid #e53e3e;
  }
}

.module-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;

  .module-icon {
    width: 50px;
    height: 50px;
    background: #e9f5ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;

    i {
      font-size: 1.5rem;
      color: #4a69bd;
    }

    .core & i {
      color: #4a69bd;
    }
    .fs & i {
      color: #38a169;
    }
    .net & i {
      color: #3182ce;
    }
    .util & i {
      color: #d69e2e;
    }
    .async & i {
      color: #805ad5;
    }
    .npm & i {
      color: #e53e3e;
    }
  }

  h2 {
    font-size: 1.6rem;
    margin-right: 15px;
    color: #2d3748;
  }

  .module-tag {
    background: #e9ecef;
    color: #495057;
    padding: 3px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.module-description {
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  line-height: 1.7;
}

.module-usage,
.module-apis,
.module-example {
  padding: 20px;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
  }
}

.usage-header,
.apis-header,
.example-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;

  h3 {
    font-size: 1.2rem;
    color: #2d3748;
  }

  i {
    color: #4a69bd;
  }
}

pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  font-family: 'Source Code Pro', monospace;
  font-size: 14px;
  overflow-x: auto;

  code {
    font-family: 'Source Code Pro', monospace;
  }
}

.api-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.api-item {
  background: #f8fafc;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;

  .api-name {
    font-weight: 600;
    margin-bottom: 8px;
    color: #2d3748;
  }

  .api-description {
    font-size: 0.9rem;
    color: #4a5568;
    margin-bottom: 10px;
  }

  .api-signature {
    pre {
      font-size: 12px;
      padding: 10px;
    }
  }
}

.usage-stats {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: #2d3748;
    text-align: center;
    justify-content: center;
  }
}

.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.chart {
  h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #4a5568;
  }
}

.bar-chart {
  .bar-container {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .bar-label {
    font-weight: 500;
    margin-bottom: 8px;
  }

  .bar {
    height: 30px;
    background: #e2e8f0;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
  }

  .bar-fill {
    height: 100%;
    border-radius: 15px;
    background: #4a69bd;
    position: relative;
    transition: width 1s ease;

    span {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: white;
      font-size: 0.85rem;
      font-weight: 500;
    }
  }

  .chart:nth-child(2) .bar-fill {
    background: #e53e3e;
  }
}

.conclusion {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: #2d3748;
    text-align: center;
    justify-content: center;
  }
}

.tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;

  .tip {
    display: flex;
    gap: 15px;
    background: #f0f7ff;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #4a69bd;

    i {
      color: #4a69bd;
      font-size: 1.5rem;
      margin-top: 3px;
    }

    p {
      font-weight: 500;
      line-height: 1.6;
    }
  }
}

footer {
  text-align: center;
  padding: 25px;
  background: white;
  color: #4a5568;
  font-size: 0.9rem;
  border-radius: 12px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  position: relative;

  .node-version {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: #e9f5ff;
    color: #4a69bd;
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: 500;
  }
}

@media (max-width: 1100px) {
  .modules-grid {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
}

@media (max-width: 768px) {
  header h1 {
    font-size: 2rem;
  }

  .stats {
    flex-wrap: wrap;
    justify-content: center;
  }

  .modules-grid {
    grid-template-columns: 1fr;
  }

  .api-list {
    grid-template-columns: 1fr;
  }

  footer .node-version {
    position: static;
    transform: none;
    margin-top: 15px;
    display: inline-block;
  }
}

@media (max-width: 480px) {
  header h1 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .category-nav button {
    padding: 10px 15px;
    font-size: 0.9rem;
  }

  .module-header {
    flex-direction: column;
    text-align: center;

    .module-icon {
      margin-right: 0;
      margin-bottom: 15px;
    }

    .module-tag {
      margin-top: 10px;
    }
  }
}
</style>
