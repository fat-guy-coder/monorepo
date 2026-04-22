<template>
  <div class="bun-modules">
    <!-- 头部区域 -->
    <header class="modules-header">
      <div class="header-content">
        <div class="title-wrapper">
          <span class="bun-icon">🥟</span>
          <h1>Bun 内置模块</h1>
        </div>
        <p class="subtitle">开箱即用的全栈工具箱 · 告别依赖地狱</p>
        <div class="header-divider"></div>
        <p class="description">
          Bun 提供了大量高性能内置模块，涵盖 HTTP 服务器、SQL 数据库、文件系统、密码加密、前端打包等。
          无需安装第三方库，即可快速构建全栈应用，大幅减少 node_modules 体积和依赖管理负担。
        </p>
      </div>
    </header>

    <!-- 模块分类导航提示 -->
    <div class="category-tabs">
      <span v-for="cat in categories" :key="cat" class="category-badge">
        {{ cat }}
      </span>
    </div>

    <!-- 模块网格 -->
    <div class="modules-grid">
      <div v-for="module in modules" :key="module.name" class="module-card">
        <div class="card-header">
          <span class="module-icon">{{ module.icon }}</span>
          <div class="module-title">
            <h3>{{ module.name }}</h3>
            <span class="import-syntax">{{ module.import }}</span>
          </div>
        </div>
        <p class="module-desc">{{ module.description }}</p>
        <div class="module-features" v-if="module.features.length">
          <h4>✨ 核心功能</h4>
          <ul>
            <li v-for="feat in module.features" :key="feat">{{ feat }}</li>
          </ul>
        </div>
        <div class="module-scenarios">
          <h4>🎯 使用场景</h4>
          <div class="scenario-tags">
            <span v-for="scene in module.scenarios" :key="scene" class="scenario-tag">
              {{ scene }}
            </span>
          </div>
        </div>
        <div class="card-footer" v-if="module.note">
          <span>💡 {{ module.note }}</span>
        </div>
      </div>
    </div>

    <!-- 底部提示 -->
    <footer class="modules-footer">
      <p>Bun 的内置模块仍在快速演进中，更多原生 API 敬请期待。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 模块分类
const categories = ['运行时', 'HTTP', '数据库', '工具', '测试', '打包', '文件系统']

// 模块数据结构
interface BunModule {
  name: string
  icon: string
  import: string
  description: string
  features: string[]
  scenarios: string[]
  note?: string
}

const modules: BunModule[] = [
  {
    name: 'Bun.serve',
    icon: '🌐',
    import: "Bun.serve({ ... })",
    description: '原生高性能 HTTP/HTTPS 服务器，内置 WebSocket 支持，基于 uWebSockets.js 构建。',
    features: [
      '静态文件服务',
      'WebSocket 开箱即用',
      'Server-Sent Events',
      'TLS/SSL 支持',
      '开发模式热重载'
    ],
    scenarios: ['REST API 服务', '实时通信应用', '静态网站托管', '反向代理'],
    note: '性能远超 Node.js 原生 http 模块'
  },
  {
    name: 'Bun.file',
    icon: '📄',
    import: "Bun.file(path)",
    description: '惰性文件引用对象，提供便捷的文件读写方法，自动处理编码和 MIME 类型。',
    features: [
      '.text() / .json() / .arrayBuffer()',
      '.stream() 流式读取',
      '.exists() 存在性检查',
      '惰性加载，按需读取'
    ],
    scenarios: ['配置文件读取', '静态资源加载', '日志文件处理', '数据导入导出']
  },
  {
    name: 'Bun.write',
    icon: '✏️',
    import: "Bun.write(dest, data)",
    description: '原子化文件写入 API，支持字符串、Buffer、Blob、Response 等多种数据源。',
    features: [
      '自动创建父目录',
      '支持写入流',
      '原子替换（避免损坏）',
      '可写 Response/Blob 到磁盘'
    ],
    scenarios: ['生成配置文件', '下载文件保存', '日志持久化', '数据导出'],
    note: '比 fs.writeFile 更简洁可靠'
  },
  {
    name: 'bun:sqlite',
    icon: '🗄️',
    import: "import { Database } from 'bun:sqlite'",
    description: '内置 SQLite 驱动，支持同步 API、预处理语句和事务，零依赖高性能。',
    features: [
      '预处理语句防注入',
      '事务支持',
      '用户自定义函数',
      '内存数据库'
    ],
    scenarios: ['本地数据存储', '原型开发', '嵌入式数据库', 'Electron 应用'],
    note: '无需安装 better-sqlite3'
  },
  {
    name: 'Bun.password',
    icon: '🔐',
    import: "Bun.password",
    description: '密码哈希与验证工具集，内置 bcrypt、argon2 等算法，异步非阻塞。',
    features: [
      'bcrypt 哈希/验证',
      'argon2 支持',
      '异步 API (不阻塞事件循环)',
      '常量时间比较'
    ],
    scenarios: ['用户密码存储', 'API 密钥哈希', '安全令牌生成']
  },
  {
    name: 'bun:ffi',
    icon: '🔌',
    import: "import { dlopen, FFIType } from 'bun:ffi'",
    description: '外部函数接口，允许 JavaScript 直接调用 C ABI 兼容的动态库，无需编写原生插件。',
    features: [
      '调用系统动态库 (.so/.dylib/.dll)',
      '定义函数签名',
      '传递指针和结构体',
      '内置 TinyCC 即时编译'
    ],
    scenarios: ['调用 C/C++ 库', '系统级 API 访问', '性能关键代码', '硬件交互'],
    note: '性能接近原生调用'
  },
  {
    name: 'bun:test',
    icon: '🧪',
    import: "import { test, expect } from 'bun:test'",
    description: '内置测试运行器，兼容 Jest 风格 API，执行速度极快，支持快照测试和覆盖率。',
    features: [
      'describe / test / expect',
      '快照测试 (toMatchSnapshot)',
      'mock 函数',
      '覆盖率报告 (--coverage)',
      'watch 模式'
    ],
    scenarios: ['单元测试', '集成测试', 'TDD 开发流程', 'CI 流水线']
  },
  {
    name: 'Bun.build',
    icon: '📦',
    import: "Bun.build({ ... })",
    description: '内置打包器和转译器，支持 TypeScript、JSX、CSS，输出多种格式（esm/cjs/iife）。',
    features: [
      '零配置入口打包',
      'Tree-shaking',
      '代码分割',
      '插件系统',
      '打包为单文件可执行'
    ],
    scenarios: ['前端项目构建', '库打包发布', 'CLI 工具构建', '边缘函数打包']
  },
  {
    name: 'Bun.spawn',
    icon: '⚙️',
    import: "Bun.spawn([cmd, ...args])",
    description: '子进程管理 API，提供流式 stdout/stderr 和 Promise 风格接口，比 Node.js 的更易用。',
    features: [
      '流式读取输出',
      'Promise 风格等待',
      '环境变量控制',
      '超时设置'
    ],
    scenarios: ['调用系统命令', '并行任务执行', '脚本自动化', '进程监控']
  },
  {
    name: 'Bun.Cookie / Bun.CookieMap',
    icon: '🍪',
    import: "Bun.Cookie / new Bun.CookieMap()",
    description: '符合标准的 Cookie 解析与序列化工具，支持 SameSite、HttpOnly 等属性。',
    features: [
      '解析 Cookie 请求头',
      '生成 Set-Cookie 响应头',
      '支持所有标准属性',
      '自动编码/解码'
    ],
    scenarios: ['身份认证会话', '用户偏好存储', '追踪与分析']
  },
  {
    name: 'Bun.Transpiler',
    icon: '🔄',
    import: "new Bun.Transpiler({ ... })",
    description: '程序化转译 API，可将 TypeScript/JSX 转换为 JavaScript，支持自定义转换规则。',
    features: [
      'TS/JSX → JS',
      '自定义宏系统',
      '保留注释/位置信息',
      '死代码消除'
    ],
    scenarios: ['在线代码编辑器', '构建插件开发', '动态代码生成']
  },
  {
    name: 'bun:jsc',
    icon: '🧠',
    import: "import { callerSourceOrigin } from 'bun:jsc'",
    description: '底层 JavaScriptCore 引擎 API，用于获取调用栈、内存使用等高级调试信息。',
    features: [
      '获取调用者信息',
      '内存使用统计',
      '垃圾回收触发',
      '采样分析'
    ],
    scenarios: ['性能剖析', '调试工具开发', '内存泄漏检测'],
    note: '高级用法，通常用于工具链开发'
  }
]
</script>

<style lang="less" scoped>
// ========== Less 变量：简约现代 ==========
@primary-orange: #e6a020;
@primary-purple: #7b5cb8;
@bg-page: #f8fafc;
@card-bg: #ffffff;
@text-dark: #1e293b;
@text-soft: #475569;
@text-light: #64748b;
@border-light: #e2e8f0;
@shadow-sm: 0 6px 14px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.02);
@shadow-hover: 0 12px 24px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.02);
@border-radius-lg: 24px;
@border-radius-md: 16px;
@transition: all 0.2s ease;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.bun-modules {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;
  background: @bg-page;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

// ----- 头部样式 -----
.modules-header {
  background: linear-gradient(135deg, #fdf6ee 0%, #ffffff 100%);
  border-radius: @border-radius-lg;
  padding: 2.2rem 2.5rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;

  .header-content {
    .title-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 0.5rem;

      .bun-icon {
        font-size: 3.2rem;
        line-height: 1;
      }

      h1 {
        font-size: 2.8rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        background: linear-gradient(135deg, @primary-orange 0%, @primary-purple 80%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }

    .subtitle {
      font-size: 1.25rem;
      font-weight: 500;
      color: @primary-orange;
      margin-bottom: 1rem;
    }

    .header-divider {
      width: 70px;
      height: 4px;
      background: linear-gradient(90deg, @primary-orange, @primary-purple);
      border-radius: 4px;
      margin: 1.2rem 0 1.5rem;
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: @text-soft;
      max-width: 85%;
    }
  }
}

// ----- 分类标签 -----
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;

  .category-badge {
    background: @card-bg;
    padding: 0.4rem 1.2rem;
    border-radius: 30px;
    font-size: 0.85rem;
    font-weight: 500;
    color: @text-soft;
    border: 1px solid @border-light;
    transition: @transition;
    cursor: default;

    &:hover {
      background: @primary-purple;
      color: white;
      border-color: @primary-purple;
    }
  }
}

// ----- 模块网格 -----
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.8rem;
}

.module-card {
  background: @card-bg;
  border-radius: @border-radius-md;
  padding: 1.6rem 1.6rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: @transition;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: @shadow-hover;
    transform: translateY(-2px);
    border-color: #d9c9f0;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 1rem;

    .module-icon {
      font-size: 2.2rem;
      line-height: 1;
    }

    .module-title {
      flex: 1;

      h3 {
        font-size: 1.4rem;
        font-weight: 650;
        color: @text-dark;
        letter-spacing: -0.01em;
        margin-bottom: 4px;
      }

      .import-syntax {
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        font-size: 0.75rem;
        background: #f1f5f9;
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        color: @primary-purple;
        display: inline-block;
        word-break: break-all;
      }
    }
  }

  .module-desc {
    font-size: 0.95rem;
    line-height: 1.6;
    color: @text-soft;
    margin-bottom: 1.2rem;
  }

  .module-features {
    margin-bottom: 1.2rem;

    h4 {
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      color: @text-light;
      margin-bottom: 0.6rem;
    }

    ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.3rem 0.8rem;

      li {
        font-size: 0.85rem;
        color: @text-soft;
        display: flex;
        align-items: baseline;

        &::before {
          content: "✓";
          color: @primary-orange;
          font-weight: bold;
          margin-right: 6px;
        }
      }
    }
  }

  .module-scenarios {
    margin-bottom: 1rem;

    h4 {
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      color: @text-light;
      margin-bottom: 0.6rem;
    }

    .scenario-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .scenario-tag {
        background: #f1f5f9;
        padding: 0.3rem 1rem;
        border-radius: 30px;
        font-size: 0.8rem;
        font-weight: 500;
        color: @text-dark;
        border: 1px solid @border-light;
        transition: @transition;

        &:hover {
          background: @primary-orange;
          color: white;
          border-color: transparent;
        }
      }
    }
  }

  .card-footer {
    margin-top: auto;
    padding-top: 0.8rem;
    border-top: 1px dashed @border-light;

    span {
      font-size: 0.8rem;
      color: @text-light;
      background: #fef3e7;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      display: inline-block;
    }
  }
}

// ----- 底部样式 -----
.modules-footer {
  text-align: center;
  margin-top: 1rem;

  p {
    background: @card-bg;
    display: inline-block;
    padding: 0.9rem 2.2rem;
    border-radius: 50px;
    box-shadow: @shadow-sm;
    border: 1px solid @border-light;
    font-size: 1rem;
    color: @text-light;
  }
}

// ----- 响应式调整 -----
@media (max-width: 640px) {
  .bun-modules {
    padding: 1.2rem 1rem;
    gap: 1.5rem;
  }

  .modules-header {
    padding: 1.8rem 1.5rem;

    .header-content {
      .title-wrapper h1 {
        font-size: 2.2rem;
      }

      .description {
        max-width: 100%;
      }
    }
  }

  .modules-grid {
    grid-template-columns: 1fr;
  }

  .module-card .module-features ul {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 641px) and (max-width: 900px) {
  .modules-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
