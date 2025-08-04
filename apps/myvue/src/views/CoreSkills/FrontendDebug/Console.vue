<template>
  <div class="console-guide">
    <div class="hero-section">
      <div class="hero-content">
        <h1>前端 Console 调试基本介绍</h1>
        <p>掌握浏览器控制台的高级技巧，提升调试效率</p>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">90%+</div>
            <div class="stat-label">开发者使用 Console</div>
          </div>
          <div class="stat">
            <div class="stat-value">40%</div>
            <div class="stat-label">调试时间节省</div>
          </div>
          <div class="stat">
            <div class="stat-value">200+</div>
            <div class="stat-label">可用方法</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="console-window">
          <div class="console-header">
            <div class="console-dot red"></div>
            <div class="console-dot yellow"></div>
            <div class="console-dot green"></div>
            <div class="console-title">开发者工具 - Console</div>
          </div>
          <div class="console-body">
            <div class="log-entry" v-for="(entry, idx) in consoleEntries" :key="idx" :class="entry.type">
              <span class="log-prefix">{{ entry.prefix }}</span>
              <span v-html="entry.message"></span>
            </div>
          </div>
          <div class="console-prompt">
            <span class="prompt-symbol">></span>
            <span class="blinking-cursor">_</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content-container">
      <!-- 基础方法 -->
      <div class="section basic-methods">
        <h2 class="section-title">
          <span class="icon">📝</span> 基础 Console 方法
        </h2>

        <div class="methods-grid">
          <div class="method-card" v-for="method in basicMethods" :key="method.name">
            <div class="method-header">
              <div class="method-icon">{{ method.icon }}</div>
              <h3>console.{{ method.name }}()</h3>
              <div class="method-type">{{ method.type }}</div>
            </div>
            <div class="method-content">
              <p>{{ method.description }}</p>

              <div class="method-example">
                <pre><code>{{ method.example }}</code></pre>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li v-for="pro in method.pros" :key="pro">{{ pro }}</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li v-for="con in method.cons" :key="con">{{ con }}</li>
                  </ul>
                </div>
              </div>

              <div class="use-cases">
                <h4>使用场景</h4>
                <ul>
                  <li v-for="useCase in method.useCases" :key="useCase">{{ useCase }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 高级方法 -->
      <div class="section advanced-methods">
        <h2 class="section-title">
          <span class="icon">🚀</span> 高级 Console 方法
        </h2>

        <div class="methods-grid">
          <div class="method-card" v-for="method in advancedMethods" :key="method.name">
            <div class="method-header">
              <div class="method-icon">{{ method.icon }}</div>
              <h3>console.{{ method.name }}()</h3>
              <div class="method-type">{{ method.type }}</div>
            </div>
            <div class="method-content">
              <p>{{ method.description }}</p>

              <div class="method-example">
                <pre><code>{{ method.example }}</code></pre>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <h4>优点</h4>
                  <ul>
                    <li v-for="pro in method.pros" :key="pro">{{ pro }}</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4>缺点</h4>
                  <ul>
                    <li v-for="con in method.cons" :key="con">{{ con }}</li>
                  </ul>
                </div>
              </div>

              <div class="use-cases">
                <h4>使用场景</h4>
                <ul>
                  <li v-for="useCase in method.useCases" :key="useCase">{{ useCase }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 样式与格式化 -->
      <div class="section formatting">
        <h2 class="section-title">
          <span class="icon">🎨</span> Console 样式与格式化
        </h2>

        <div class="formatting-content">
          <div class="format-examples">
            <div class="example-card">
              <h3>CSS 样式格式化</h3>
              <pre><code>console.log(
  "%c重要消息%c普通消息",
  "color: white; background: red; padding: 2px 6px; border-radius: 4px;",
  "color: #333;"
);</code></pre>
              <div class="example-output">
                <span class="styled-log"
                  style="color: white; background: red; padding: 2px 6px; border-radius: 4px;">重要消息</span>
                <span class="styled-log" style="color: #333;">普通消息</span>
              </div>
            </div>

            <div class="example-card">
              <h3>字符串替换符</h3>
              <pre><code>console.log(
  "用户 %s 有 %d 条未读消息，账户状态: %o",
  "张三",
  5,
  { status: "active", premium: true }
);</code></pre>
              <div class="example-output">
                用户 张三 有 5 条未读消息，账户状态: {status: "active", premium: true}
              </div>
            </div>
          </div>

          <div class="format-tips">
            <h3>格式化技巧</h3>
            <ul>
              <li>使用 <code>%c</code> 应用 CSS 样式到后续文本</li>
              <li><code>%s</code> 字符串替换，<code>%d</code> 数字替换，<code>%o</code> 对象替换</li>
              <li><code>%c</code> 可以多次使用以应用不同样式</li>
              <li>使用 Unicode 字符和 Emoji 增强可读性</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 实时调试演示 -->
      <div class="section live-demo">
        <h2 class="section-title">
          <span class="icon">🔍</span> Console 实时调试演示
        </h2>

        <div class="demo-container">
          <div class="demo-controls">
            <button class="demo-button" @click="logUser">用户数据</button>
            <button class="demo-button" @click="logProducts">产品列表</button>
            <button class="demo-button" @click="logPerformance">性能测试</button>
            <button class="demo-button" @click="logStyled">样式消息</button>
            <button class="demo-button" @click="clearConsole">清空控制台</button>
          </div>

          <div class="console-window demo-console">
            <div class="console-header">
              <div class="console-dot red"></div>
              <div class="console-dot yellow"></div>
              <div class="console-dot green"></div>
              <div class="console-title">交互式控制台演示</div>
            </div>
            <div class="console-body">
              <div class="log-entry" v-for="(entry, idx) in demoEntries" :key="idx" :class="entry.type">
                <span class="log-prefix">{{ entry.prefix }}</span>
                <span v-html="entry.message"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 最佳实践 -->
      <div class="section best-practices">
        <h2 class="section-title">
          <span class="icon">🏆</span> Console 调试最佳实践
        </h2>

        <div class="practices">
          <div class="practice-card">
            <div class="practice-icon">1️⃣</div>
            <div class="practice-content">
              <h3>使用合适的日志级别</h3>
              <p>根据信息重要性使用不同方法：<code>log</code> 普通信息，<code>warn</code> 警告，<code>error</code> 错误</p>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">2️⃣</div>
            <div class="practice-content">
              <h3>添加有意义的上下文</h3>
              <p>在日志中包含时间戳、模块名称等上下文信息</p>
              <pre><code>console.log(`[${new Date().toISOString()}] [用户模块] 用户登录`);</code></pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">3️⃣</div>
            <div class="practice-content">
              <h3>生产环境移除日志</h3>
              <p>使用构建工具移除生产环境的 console 语句</p>
              <pre><code>// 使用 Terser 插件移除 console
new TerserPlugin({
  terserOptions: {
    compress: {
      drop_console: true
    }
  }
})</code></pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-icon">4️⃣</div>
            <div class="practice-content">
              <h3>使用日志分组</h3>
              <p>对相关日志进行分组以提高可读性</p>
              <pre><code>console.group('用户信息');
console.log('姓名:', name);
console.log('邮箱:', email);
console.groupEnd();</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>掌握 Console 调试技巧，将极大提升您的前端开发效率和调试能力</p>
      <div class="resources">
        <a href="#">Chrome 开发者文档</a>
        <a href="#">Console API 参考</a>
        <a href="#">高级调试技巧</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 控制台条目类型
interface ConsoleEntry {
  type: string;
  prefix: string;
  message: string;
}

// 基础控制台条目
const consoleEntries = ref<ConsoleEntry[]>([
  { type: 'log', prefix: '>', message: '应用初始化完成' },
  { type: 'info', prefix: 'i', message: '加载了10个资源文件' },
  { type: 'warn', prefix: '!', message: 'API响应时间超过500ms' },
  {
    type: 'error',
    prefix: '×',
    message: '未找到用户数据 <span style="color:#999">(users.js:42)</span>'
  },
  {
    type: 'log',
    prefix: '>',
    message: '<span style="color:#4CAF50">✓</span> 用户认证成功'
  },
  {
    type: 'table',
    prefix: '>',
    message: '用户列表数据 (3项) <span style="color:#999">(点击展开)</span>'
  }
]);

// 基础 console 方法
const basicMethods = ref([
  {
    name: 'log',
    icon: '📝',
    type: '通用日志',
    description: '最常用的日志记录方法，用于输出一般信息',
    example: `console.log('应用已启动');\nconsole.log('用户:', user);`,
    pros: [
      '简单易用',
      '支持多参数',
      '可输出任何类型数据'
    ],
    cons: [
      '生产环境可能包含敏感信息',
      '过度使用会使控制台混乱'
    ],
    useCases: [
      '记录程序执行流程',
      '输出变量值',
      '调试信息记录'
    ]
  },
  {
    name: 'info',
    icon: 'ℹ️',
    type: '信息日志',
    description: '用于输出信息性消息，通常显示为蓝色图标',
    example: `console.info('新版本可用: v2.0.0');`,
    pros: [
      '与log类似但语义更清晰',
      '便于区分信息类型',
      '支持相同参数格式'
    ],
    cons: [
      '在浏览器中与log区别不大',
      '部分开发者习惯只使用log'
    ],
    useCases: [
      '记录应用状态信息',
      '输出配置信息',
      '通知性消息'
    ]
  },
  {
    name: 'warn',
    icon: '⚠️',
    type: '警告日志',
    description: '用于输出警告信息，通常显示为黄色图标',
    example: `console.warn('即将弃用的API，请使用新方法');`,
    pros: [
      '视觉上更突出',
      '可过滤查看所有警告',
      '包含堆栈跟踪信息'
    ],
    cons: [
      '过度使用会淡化重要警告',
      '可能被误认为错误'
    ],
    useCases: [
      '弃用功能警告',
      '非关键问题通知',
      '性能警告'
    ]
  },
  {
    name: 'error',
    icon: '❌',
    type: '错误日志',
    description: '用于输出错误信息，通常显示为红色图标',
    example: `console.error('请求失败:', error);`,
    pros: [
      '最高视觉优先级',
      '包含完整堆栈跟踪',
      '可过滤查看所有错误'
    ],
    cons: [
      '可能被监控系统捕获',
      '生产环境需谨慎使用'
    ],
    useCases: [
      '捕获异常错误',
      '关键功能失败记录',
      'API错误响应'
    ]
  }
]);

// 高级 console 方法
const advancedMethods = ref([
  {
    name: 'table',
    icon: '📊',
    type: '表格输出',
    description: '以表格形式输出数组或对象，便于查看结构化数据',
    example: `const users = [\n  { id: 1, name: '张三', role: 'admin' },\n  { id: 2, name: '李四', role: 'user' }\n];\nconsole.table(users);`,
    pros: [
      '直观展示数据结构',
      '支持列排序',
      '可指定显示列'
    ],
    cons: [
      '复杂对象可能显示不全',
      '大数据集性能不佳'
    ],
    useCases: [
      '展示API响应数据',
      '调试数组内容',
      '比较对象结构'
    ]
  },
  {
    name: 'group',
    icon: '📂',
    type: '日志分组',
    description: '创建可折叠的日志分组，组织相关日志信息',
    example: `console.group('用户信息');\nconsole.log('ID:', user.id);\nconsole.log('姓名:', user.name);\nconsole.groupEnd();`,
    pros: [
      '提高控制台可读性',
      '支持嵌套分组',
      '可折叠节省空间'
    ],
    cons: [
      '过度嵌套可能复杂化',
      '忘记groupEnd会导致意外分组'
    ],
    useCases: [
      '组织相关日志',
      '模块化调试输出',
      '复杂流程分解'
    ]
  },
  {
    name: 'time',
    icon: '⏱️',
    type: '性能计时',
    description: '测量代码执行时间，用于性能分析和优化',
    example: `console.time('数据加载');\n// 加载数据...\nconsole.timeEnd('数据加载');`,
    pros: [
      '精确测量代码执行时间',
      '支持多个计时器',
      '无需额外变量'
    ],
    cons: [
      '生产环境可能影响性能',
      '嵌套计时需要不同标签'
    ],
    useCases: [
      '性能瓶颈分析',
      '函数执行时间测量',
      '异步操作耗时统计'
    ]
  },
  {
    name: 'trace',
    icon: '🧭',
    type: '堆栈跟踪',
    description: '输出当前的调用堆栈，用于追踪代码执行路径',
    example: `function init() {\n  console.trace('初始化调用堆栈');\n}\ninit();`,
    pros: [
      '快速定位调用路径',
      '便于理解代码流程',
      '调试复杂调用关系'
    ],
    cons: [
      '生产环境可能暴露敏感信息',
      '输出可能冗长'
    ],
    useCases: [
      '追踪函数调用路径',
      '理解复杂代码流程',
      '识别意外调用'
    ]
  }
]);

// 演示控制台条目
const demoEntries = ref<ConsoleEntry[]>([]);

// 添加日志
const addDemoEntry = (type: string, prefix: string, message: string) => {
  demoEntries.value.push({
    type,
    prefix,
    message
  });

  // 自动滚动到底部
  setTimeout(() => {
    const consoleBody = document.querySelector('.demo-console .console-body');
    if (consoleBody) {
      consoleBody.scrollTop = consoleBody.scrollHeight;
    }
  }, 10);
};

// 记录用户数据
const logUser = () => {
  addDemoEntry('group', '>', '用户数据');
  addDemoEntry('log', '>', 'ID: 12345');
  addDemoEntry('log', '>', '姓名: 张三');
  addDemoEntry('log', '>', '邮箱: zhangsan@example.com');
  addDemoEntry('groupEnd', '', '');
};

// 记录产品列表
const logProducts = () => {
  addDemoEntry('log', '>', '产品列表:');
  addDemoEntry('table', '>', `[
    { id: 1, name: "产品A", price: "$29.99" },
    { id: 2, name: "产品B", price: "$49.99" },
    { id: 3, name: "产品C", price: "$19.99" }
  ]`);
};

// 记录性能测试
const logPerformance = () => {
  addDemoEntry('time', '>', '数据加载');
  setTimeout(() => {
    addDemoEntry('timeEnd', '>', '数据加载: 452.75ms');
  }, 450);
};

// 记录样式消息
const logStyled = () => {
  addDemoEntry('log', '>', `%c重要通知%c: 系统即将维护 %c⏰%c 请保存工作',
    'color: white; background: #e91e63; padding: 2px 6px; border-radius: 4px;',
    'color: #333;',
    'font-size: 1.2em;`,
  );
};

// 清空控制台
const clearConsole = () => {
  demoEntries.value = [];
  addDemoEntry('log', '>', '控制台已清空');
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.console-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;

  .hero-section {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    background: linear-gradient(135deg, #1a237e, #283593);
    border-radius: 16px;
    padding: 2.5rem;
    color: white;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

    .hero-content {
      flex: 1;
      min-width: 300px;

      h1 {
        font-size: 2.8rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 1.4rem;
        opacity: 0.9;
        margin-bottom: 2rem;
      }

      .stats {
        display: flex;
        gap: 2rem;
        margin-top: 1.5rem;

        .stat {
          .stat-value {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
          }

          .stat-label {
            font-size: 1rem;
            opacity: 0.85;
          }
        }
      }
    }

    .hero-visual {
      flex: 1;
      min-width: 300px;
      display: flex;
      align-items: center;
      justify-content: center;

      .console-window {
        width: 100%;
        background: #242424;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

        .console-header {
          display: flex;
          align-items: center;
          padding: 0.8rem 1rem;
          background: #363636;
          border-bottom: 1px solid #444;

          .console-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 6px;

            &.red {
              background: #ff5f56;
            }

            &.yellow {
              background: #ffbd2e;
            }

            &.green {
              background: #27c93f;
            }
          }

          .console-title {
            font-size: 0.9rem;
            color: #aaa;
            margin-left: 10px;
          }
        }

        .console-body {
          height: 250px;
          padding: 1rem;
          overflow-y: auto;
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          line-height: 1.5;

          .log-entry {
            margin-bottom: 0.5rem;
            display: flex;

            .log-prefix {
              display: inline-block;
              width: 20px;
              text-align: center;
              margin-right: 8px;
            }

            &.log {
              color: #d4d4d4;
            }

            &.info {
              color: #89cff0;
            }

            &.warn {
              color: #ffcc00;
            }

            &.error {
              color: #f48771;
            }

            &.table {
              color: #79c0ff;
            }
          }
        }

        .console-prompt {
          padding: 0.5rem 1rem;
          background: #2a2a2a;
          border-top: 1px solid #444;
          display: flex;
          align-items: center;
          font-family: 'Fira Code', monospace;

          .prompt-symbol {
            color: #79c0ff;
            margin-right: 8px;
          }

          .blinking-cursor {
            animation: blink 1s infinite;
          }
        }
      }
    }
  }

  .content-container {
    background: white;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }

  .section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #eee;

      .icon {
        font-size: 1.8rem;
      }
    }
  }

  .methods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;

    .method-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
      border: 1px solid #eee;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .method-header {
        padding: 1.2rem 1.5rem;
        background: #f5f7fa;
        display: flex;
        align-items: center;
        gap: 1rem;
        border-bottom: 1px solid #eee;

        .method-icon {
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e3f2fd;
          border-radius: 8px;
        }

        h3 {
          margin: 0;
          font-size: 1.3rem;
          color: #2c3e50;
        }

        .method-type {
          margin-left: auto;
          background: #e3f2fd;
          color: #1976d2;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
      }

      .method-content {
        padding: 1.5rem;

        p {
          color: #4a5568;
          margin-top: 0;
          margin-bottom: 1.5rem;
        }

        .method-example {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1.2rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;

          pre {
            margin: 0;
            font-size: 0.9rem;

            code {
              font-family: 'Fira Code', monospace;
            }
          }
        }

        .pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;

          .pros,
          .cons {
            background: white;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

            h4 {
              margin-top: 0;
              margin-bottom: 0.8rem;
              color: #2c3e50;
              padding-bottom: 0.3rem;
              border-bottom: 1px solid #eee;
            }

            ul {
              padding-left: 1.2rem;
              margin: 0;

              li {
                margin-bottom: 0.5rem;
                color: #4a5568;
                font-size: 0.95rem;
              }
            }
          }

          .pros {
            border-left: 4px solid #4caf50;
          }

          .cons {
            border-left: 4px solid #f44336;
          }
        }

        .use-cases {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;

          h4 {
            margin-top: 0;
            margin-bottom: 0.8rem;
            color: #2c3e50;
          }

          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.5rem;
              color: #4a5568;
            }
          }
        }
      }
    }
  }

  .formatting {
    .formatting-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      .format-examples {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .example-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

          h3 {
            margin-top: 0;
            margin-bottom: 1rem;
            color: #2c3e50;
          }

          pre {
            background: #2d2d2d;
            border-radius: 8px;
            padding: 1.2rem;
            overflow-x: auto;
            margin-bottom: 1rem;

            code {
              font-family: 'Fira Code', monospace;
              color: #f8f8f2;
              font-size: 0.9rem;
              line-height: 1.5;
            }
          }

          .example-output {
            background: #242424;
            color: #d4d4d4;
            padding: 1rem;
            border-radius: 8px;
            font-family: 'Fira Code', monospace;
            font-size: 0.95rem;

            .styled-log {
              display: inline-block;
              margin-right: 5px;
            }
          }
        }
      }

      .format-tips {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        ul {
          padding-left: 1.5rem;
          margin: 0;

          li {
            margin-bottom: 1rem;
            color: #4a5568;
            line-height: 1.6;

            code {
              background: #f1f3f9;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }

  .live-demo {
    .demo-container {
      .demo-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1.5rem;

        .demo-button {
          background: #3f51b5;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-family: inherit;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;

          &:hover {
            background: #303f9f;
          }
        }
      }

      .demo-console {
        background: #242424;
        border-radius: 8px;
        overflow: hidden;

        .console-header {
          background: #363636;
        }

        .console-body {
          height: 300px;
          padding: 1rem;
          overflow-y: auto;
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          line-height: 1.5;

          .log-entry {
            margin-bottom: 0.5rem;
            display: flex;

            .log-prefix {
              display: inline-block;
              width: 20px;
              text-align: center;
              margin-right: 8px;
            }

            &.log {
              color: #d4d4d4;
            }

            &.info {
              color: #89cff0;
            }

            &.warn {
              color: #ffcc00;
            }

            &.error {
              color: #f48771;
            }

            &.table {
              color: #79c0ff;
            }

            &.group {
              color: #a9d0ff;
              font-weight: bold;
            }

            &.groupEnd {
              display: none;
            }
          }
        }
      }
    }
  }

  .best-practices {
    .practices {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .practice-card {
        display: flex;
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        .practice-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
          min-width: 40px;
          height: 40px;
          background: #e3f2fd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .practice-content {
          h3 {
            margin-top: 0;
            margin-bottom: 0.8rem;
            color: #2c3e50;
          }

          p {
            color: #4a5568;
            margin-bottom: 1rem;
          }

          pre {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;
            overflow-x: auto;
            font-size: 0.85rem;

            code {
              font-family: 'Fira Code', monospace;
            }
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    padding: 2rem;
    color: #7f8c8d;

    p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    .resources {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1.5rem;

      a {
        color: #3f51b5;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;

        &:hover {
          color: #303f9f;
          text-decoration: underline;
        }
      }
    }
  }
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .console-guide {
    padding: 10px;

    .hero-section {
      padding: 1.5rem;

      .hero-content {
        h1 {
          font-size: 2rem;
        }

        p {
          font-size: 1.1rem;
        }

        .stats {
          flex-wrap: wrap;
          gap: 1rem;
        }
      }
    }

    .content-container {
      padding: 1.5rem;
    }

    .section .section-title {
      font-size: 1.6rem;
    }

    .formatting-content {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>
