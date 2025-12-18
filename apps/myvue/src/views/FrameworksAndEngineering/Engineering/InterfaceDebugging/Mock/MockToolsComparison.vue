<template>
  <div class="mock-container">
    <header class="header">
      <h1>Mock 数据解决方案指南</h1>
      <p class="subtitle">提升前端开发效率的模拟数据技术</p>
    </header>

    <div class="content-wrapper">
      <section class="intro">
        <div class="card">
          <h2><span class="icon">🎭</span> 什么是 Mock？</h2>
          <div class="intro-content">
            <p>
              <strong>Mock</strong> 是在软件开发中创建模拟对象的技术，这些对象模拟真实对象的行为，
              用于在依赖组件未完成时进行测试和开发。
            </p>

            <div class="mock-illustration">
              <div class="real-system">
                <div class="system-label">真实系统</div>
                <div class="component">前端应用</div>
                <div class="arrow">→</div>
                <div class="component">API 服务</div>
                <div class="arrow">→</div>
                <div class="component">数据库</div>
              </div>

              <div class="mock-system">
                <div class="system-label">Mock 系统</div>
                <div class="component">前端应用</div>
                <div class="arrow">→</div>
                <div class="component mock-highlight">Mock 服务</div>
              </div>
            </div>

            <div class="use-cases">
              <h3>Mock 的主要用途：</h3>
              <ul>
                <li>前端开发不依赖后端进度</li>
                <li>自动化测试的隔离环境</li>
                <li>模拟异常情况和边界条件</li>
                <li>性能测试和负载测试</li>
                <li>演示和原型开发</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison">
        <h2><span class="icon">📊</span> Mock 库对比</h2>
        <div class="card">
          <div class="filters">
            <div class="filter">
              <label>排序：</label>
              <Select v-model="sortBy">
                <option value="popularity">流行度</option>
                <option value="ease">易用性</option>
                <option value="features">功能丰富度</option>
                <option value="performance">性能</option>
              </select>
            </div>
            <div class="filter">
              <label>环境：</label>
              <div class="checkboxes">
                <label v-for="env in environments" :key="env.id">
                  <input type="checkbox" v-model="selectedEnvs" :value="env.id" />
                  {{ env.name }}
                </label>
              </div>
            </div>
          </div>

          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>库名称</th>
                  <th>类型</th>
                  <th>
                    易用性
                    <span class="hint">(★越多越简单)</span>
                  </th>
                  <th>功能丰富度</th>
                  <th>性能</th>
                  <th>学习曲线</th>
                  <th>适用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lib in filteredLibs" :key="lib.name">
                  <td class="lib-name">
                    <a :href="lib.url" target="_blank">{{ lib.name }}</a>
                    <div class="version">{{ lib.version }}</div>
                  </td>
                  <td>{{ lib.type }}</td>
                  <td>
                    <div class="rating">
                      <span v-for="n in 5" :key="n" :class="{ active: n <= lib.ease }">★</span>
                    </div>
                  </td>
                  <td>
                    <div class="features">
                      <span
                        v-for="(feature, index) in lib.features"
                        :key="index"
                        class="feature-tag"
                      >
                        {{ feature }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="performance-bar">
                      <div class="bar" :style="{ width: lib.performance + '%' }">
                        <span class="value">{{ lib.performance }}%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="curve">
                      <div
                        class="curve-bar"
                        :style="{ height: lib.learningCurve * 20 + '%' }"
                      ></div>
                      <div class="curve-label">
                        {{ learningCurveLabels[lib.learningCurve - 1] }}
                      </div>
                    </div>
                  </td>
                  <td>
                    <ul class="scenarios">
                      <li v-for="(scenario, index) in lib.scenarios" :key="index">
                        {{ scenario }}
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div class="columns">
        <section class="implementation">
          <h2><span class="icon">💻</span> 实现方案</h2>
          <div class="card">
            <div class="tabs">
              <button
                v-for="(tab, index) in tabs"
                :key="index"
                :class="['tab', { active: activeTab === tab.id }]"
                @click="activeTab = tab.id"
              >
                {{ tab.label }}
              </button>
            </div>

            <div class="tab-content">
              <div v-if="activeTab === 'mockjs'" class="implementation-detail">
                <h3>Mock.js 实现</h3>
                <p>最流行的数据生成库，提供丰富的数据模板</p>

                <div class="code-block">
                  <pre><code>import Mock from 'mockjs';

// 基本数据模拟
Mock.mock('/api/user', {
  'id': '@id',
  'name': '@cname',
  'email': '@email',
  'age|18-60': 1,
  'avatar': Mock.Random.image('100x100')
});

// 复杂数据结构
Mock.mock('/api/posts', {
  'list|10': [{
    'id': '@increment',
    'title': '@ctitle(10, 20)',
    'content': '@cparagraph(3)',
    'createdAt': '@datetime',
    'comments|1-5': [{
      'id': '@increment',
      'user': '@cname',
      'content': '@csentence'
    }]
  }]
});

// 拦截 Ajax 请求
Mock.setup({
  timeout: '200-600' // 随机延迟，模拟网络环境
});</code></pre>
                </div>
              </div>

              <div v-if="activeTab === 'msw'" class="implementation-detail">
                <h3>MSW (Mock Service Worker) 实现</h3>
                <p>基于 Service Worker 的 API 模拟库</p>

                <div class="code-block">
                  <pre><code>import { setupWorker, rest } from 'msw';

// 定义请求处理程序
const handlers = [
  // 捕获 GET /user 请求
  rest.get('/api/user', (req, res, ctx) => {
    return res(
      ctx.delay(150), // 模拟网络延迟
      ctx.status(200),
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        name: 'John Doe',
        email: 'john.doe@example.com'
      })
    );
  }),

  // 捕获 POST /login 请求
  rest.post('/api/login', (req, res, ctx) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
      return res(
        ctx.json({
          token: 'mock-jwt-token',
          expiresIn: 3600
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({
        error: 'Invalid credentials'
      })
    );
  })
];

// 启动 Service Worker
const worker = setupWorker(...handlers);
worker.start({
  onUnhandledRequest: 'bypass' // 未处理的请求直接发送到网络
});</code></pre>
                </div>
              </div>

              <div v-if="activeTab === 'faker'" class="implementation-detail">
                <h3>Faker.js 实现</h3>
                <p>强大的数据生成库，支持多种语言</p>

                <div class="code-block">
                  <pre><code>import faker from 'faker';
import { rest } from 'msw';

// 设置语言
faker.locale = 'zh_CN';

// 生成模拟数据
const generateUsers = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      zipCode: faker.address.zipCode()
    },
    company: faker.company.companyName(),
    avatar: faker.image.avatar()
  }));
};

// 创建 API 处理程序
const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    const count = parseInt(req.url.searchParams.get('count') || '10', 10);
    return res(
      ctx.delay(300),
      ctx.json({
        users: generateUsers(count)
      })
    );
  })
];</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="best-practices">
          <h2><span class="icon">🏆</span> 最佳实践</h2>
          <div class="card">
            <div class="practices">
              <div class="practice">
                <div class="icon">🔄</div>
                <h3>1. 环境切换策略</h3>
                <p>使用环境变量控制 Mock 的启用：</p>
                <div class="code-block">
                  <pre><code>// vite.config.js
export default defineConfig({
  plugins: [
    viteMockServe({
      mockPath: 'mock',
      localEnabled: process.env.NODE_ENV === 'development',
      prodEnabled: false,
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `
    })
  ]
});</code></pre>
                </div>
              </div>

              <div class="practice">
                <div class="icon">📚</div>
                <h3>2. 数据组织规范</h3>
                <p>模块化组织 Mock 数据：</p>
                <div class="file-structure">
                  <pre><code>mock/
├── modules/
│   ├── user.mock.js    # 用户相关接口
│   ├── product.mock.js # 产品相关接口
│   └── order.mock.js   # 订单相关接口
├── utils/
│   ├── response.js     # 响应工具函数
│   └── faker.js        # 数据生成工具
└── setup.js            # Mock 服务初始化</code></pre>
                </div>
              </div>

              <div class="practice">
                <div class="icon">🔗</div>
                <h3>3. 真实 API 集成</h3>
                <p>逐步迁移到真实 API 的策略：</p>
                <div class="code-block">
                  <pre><code>// 创建 API 代理
const apiProxy = {
  '/api': {
    target: process.env.REAL_API_URL || 'https://real-api.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    },
    // 如果真实 API 不可用，回退到 Mock
    onError: (err, req, res) => {
      mockServer.handleRequest(req, res);
    }
  }
};

// 开发服务器配置
export default {
  server: {
    proxy: apiProxy
  }
};</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="scenarios">
        <h2><span class="icon">🔍</span> 适用场景分析</h2>
        <div class="card">
          <div class="scenario-grid">
            <div class="scenario">
              <div class="icon">🚧</div>
              <h3>前端独立开发</h3>
              <p>后端API尚未完成时，前端可以独立开发和测试</p>
              <div class="recommend">
                <strong>推荐工具：</strong>
                <span>Mock.js, Faker.js</span>
              </div>
            </div>

            <div class="scenario">
              <div class="icon">🧪</div>
              <h3>自动化测试</h3>
              <p>为单元测试和集成测试提供稳定的测试环境</p>
              <div class="recommend">
                <strong>推荐工具：</strong>
                <span>MSW, Jest Mock</span>
              </div>
            </div>

            <div class="scenario">
              <div class="icon">📱</div>
              <h3>演示和原型</h3>
              <p>快速创建演示原型，无需真实后端支持</p>
              <div class="recommend">
                <strong>推荐工具：</strong>
                <span>json-server, MirageJS</span>
              </div>
            </div>

            <div class="scenario">
              <div class="icon">⚡</div>
              <h3>性能优化</h3>
              <p>模拟API延迟，测试前端加载状态和性能</p>
              <div class="recommend">
                <strong>推荐工具：</strong>
                <span>MSW, Express + Faker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="performance">
        <h2><span class="icon">📈</span> 性能优化</h2>
        <div class="card">
          <div class="optimizations">
            <div class="optimization">
              <h3>1. 延迟响应模拟</h3>
              <p>模拟真实网络环境，测试加载状态</p>
              <div class="code-block">
                <pre><code>// Mock.js 设置延迟
Mock.setup({
  timeout: '200-800' // 随机200-800ms延迟
});

// MSW 设置延迟
rest.get('/api/data', (req, res, ctx) => {
  return res(
    ctx.delay(500), // 500ms延迟
    ctx.json({ data: 'mock' })
  );
});</code></pre>
              </div>
            </div>

            <div class="optimization">
              <h3>2. 大数据集优化</h3>
              <p>使用分页和虚拟滚动处理大数据</p>
              <div class="code-block">
                <pre><code>// 分页数据模拟
Mock.mock('/api/items', (options) => {
  const { page = 1, size = 20 } = parseQuery(options.url);
  const total = 1000;
  const data = generateItems(size);

  return {
    page,
    total,
    data
  };
});

// 生成大数据
function generateItems(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    price: Mock.Random.float(10, 1000, 2),
    stock: Mock.Random.integer(0, 100)
  }));
}</code></pre>
              </div>
            </div>

            <div class="optimization">
              <h3>3. 条件响应模拟</h3>
              <p>模拟不同条件下的API响应</p>
              <div class="code-block">
                <pre><code>// 根据请求参数返回不同响应
rest.get('/api/user/:id', (req, res, ctx) => {
  const { id } = req.params;

  if (id === '404') {
    return res(ctx.status(404));
  }

  if (id === '500') {
    return res(ctx.status(500));
  }

  return res(
    ctx.json({
      id,
      name: faker.name.findName(),
      email: faker.internet.email()
    })
  );
});</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="testing">
        <h2><span class="icon">🧪</span> 测试集成</h2>
        <div class="card">
          <div class="testing-types">
            <div class="type">
              <h3>1. 单元测试集成</h3>
              <p>使用 Jest + MSW 测试组件</p>
              <div class="code-block">
                <pre><code>import { render, screen } from '@testing-library/vue';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import UserList from './UserList.vue';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json({
        users: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' }
        ]
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('显示用户列表', async () => {
  render(UserList);

  // 等待数据加载
  await screen.findByText('John Doe');
  await screen.findByText('Jane Smith');

  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});</code></pre>
              </div>
            </div>

            <div class="type">
              <h3>2. E2E 测试集成</h3>
              <p>使用 Cypress 进行端到端测试</p>
              <div class="code-block">
                <pre><code>// cypress/support/commands.js
Cypress.Commands.add('mockApi', (options) => {
  const { method = 'GET', path, response, status = 200 } = options;

  cy.intercept(method, path, {
    statusCode: status,
    body: response
  }).as(`${method} ${path}`);
});

// 测试用例
describe('用户管理', () => {
  it('成功加载用户列表', () => {
    cy.mockApi({
      path: '/api/users',
      response: {
        users: [
          { id: 1, name: '测试用户1' },
          { id: 2, name: '测试用户2' }
        ]
      }
    });

    cy.visit('/users');
    cy.contains('测试用户1').should('be.visible');
    cy.contains('测试用户2').should('be.visible');
  });
});</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Mock 技术是现代化前端开发的关键环节，选择合适的工具可以显著提升开发效率</p>
      <p>根据项目需求和个人偏好选择最适合的 Mock 解决方案</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 排序和筛选
const sortBy = ref('popularity')
const environments = ref([
  { id: 'browser', name: '浏览器' },
  { id: 'node', name: 'Node.js' },
  { id: 'test', name: '测试环境' },
])
const selectedEnvs = ref(['browser', 'node', 'test'])

// Mock 库数据
const libs = ref([
  {
    name: 'Mock.js',
    version: '1.1.0',
    type: '数据生成',
    ease: 5,
    features: ['数据模板', '随机数据', '拦截请求'],
    performance: 95,
    learningCurve: 2,
    scenarios: ['前端开发数据模拟', '快速原型开发', '演示数据生成'],
    url: 'http://mockjs.com/',
    env: ['browser', 'node'],
  },
  {
    name: 'MSW (Mock Service Worker)',
    version: '1.2.1',
    type: 'API 模拟',
    ease: 4,
    features: ['Service Worker', 'REST/GraphQL', '测试集成'],
    performance: 85,
    learningCurve: 3,
    scenarios: ['单元测试', '集成测试', '开发环境 API 模拟'],
    url: 'https://mswjs.io/',
    env: ['browser', 'test'],
  },
  {
    name: 'Faker.js',
    version: '7.6.0',
    type: '数据生成',
    ease: 4,
    features: ['多语言支持', '丰富数据类型', '类型安全'],
    performance: 90,
    learningCurve: 3,
    scenarios: ['测试数据生成', '数据库填充', '压力测试数据'],
    url: 'https://fakerjs.dev/',
    env: ['node', 'test'],
  },
  {
    name: 'json-server',
    version: '0.17.3',
    type: 'API 服务器',
    ease: 5,
    features: ['零配置', 'REST API', '数据库模拟'],
    performance: 75,
    learningCurve: 1,
    scenarios: ['快速原型开发', '全栈演示', '教学示例'],
    url: 'https://github.com/typicode/json-server',
    env: ['node'],
  },
  {
    name: 'Mirage JS',
    version: '1.1.7',
    type: 'API 模拟',
    ease: 3,
    features: ['ORM', '关系数据', '身份验证'],
    performance: 80,
    learningCurve: 4,
    scenarios: ['复杂数据关系', '应用状态测试', '身份验证流程'],
    url: 'https://miragejs.com/',
    env: ['browser', 'test'],
  },
  {
    name: 'Jest Mock',
    version: '28.1.3',
    type: '测试模拟',
    ease: 4,
    features: ['函数模拟', '模块模拟', '定时器控制'],
    performance: 90,
    learningCurve: 3,
    scenarios: ['单元测试', '函数行为测试', '模块隔离测试'],
    url: 'https://jestjs.io/',
    env: ['test'],
  },
])

// 学习曲线标签
const learningCurveLabels = ['平缓', '较平缓', '中等', '较陡峭', '陡峭']

// 标签页
const tabs = ref([
  { id: 'mockjs', label: 'Mock.js' },
  { id: 'msw', label: 'MSW' },
  { id: 'faker', label: 'Faker.js' },
])
const activeTab = ref('mockjs')

// 过滤和排序后的库
const filteredLibs = computed(() => {
  const result = libs.value.filter((lib) => selectedEnvs.value.some((env) => lib.env.includes(env)))

  if (sortBy.value === 'popularity') {
    // 按流行度排序（静态数据，实际应用中可能需要真实数据）
    result.sort((a, b) => {
      const order = ['Mock.js', 'Faker.js', 'MSW', 'Jest Mock', 'json-server', 'Mirage JS']
      return order.indexOf(a.name) - order.indexOf(b.name)
    })
  } else if (sortBy.value === 'ease') {
    result.sort((a, b) => b.ease - a.ease)
  } else if (sortBy.value === 'features') {
    result.sort((a, b) => b.features.length - a.features.length)
  } else if (sortBy.value === 'performance') {
    result.sort((a, b) => b.performance - a.performance)
  }

  return result
})
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #5e35b1;
@secondary-color: #7e57c2;
@accent-color: #d81b60;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@border-color: #e0e0e0;
@code-bg: #f5f7fa;
@success-color: #43a047;
@warning-color: #ffb300;
@danger-color: #e53935;
@info-color: #1e88e5;

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.mock-container {
  font-family: 'Inter', sans-serif;
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
  background: linear-gradient(135deg, @primary-color, #4527a0);
  color: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  background-color: @card-bg;
  border-radius: 16px;
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
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid @border-color;
}

// 介绍部分
.intro-content {
  p {
    margin-bottom: 20px;
    font-size: 1.1rem;
  }
}

.mock-illustration {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 0;
  padding: 20px;
  background: #f0f4ff;
  border-radius: 10px;

  .real-system,
  .mock-system {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 15px;

    .system-label {
      font-weight: bold;
      padding: 5px 10px;
      border-radius: 5px;
      background: #e0e0e0;
    }

    .component {
      padding: 10px 20px;
      background: #e3f2fd;
      border-radius: 8px;
      border: 1px solid #bbdefb;

      &.mock-highlight {
        background: #e8f5e9;
        border-color: #c8e6c9;
        font-weight: bold;
      }
    }

    .arrow {
      font-size: 1.5rem;
      color: #666;
    }
  }
}

.use-cases {
  margin-top: 30px;

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 12px;
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: -15px;
        color: @primary-color;
        font-weight: bold;
      }
    }
  }
}

// 对比表格
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 25px;
  padding: 15px;
  background: #f8f9ff;
  border-radius: 10px;

  .filter {
    display: flex;
    align-items: center;

    label {
      font-weight: 500;
      margin-right: 10px;
    }

    select {
      padding: 8px 15px;
      border-radius: 8px;
      border: 1px solid @border-color;
      background: white;
    }

    .checkboxes {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;

      label {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;

    th,
    td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    thead {
      background: @primary-color;
      color: white;

      th {
        font-weight: 600;

        .hint {
          font-weight: normal;
          font-size: 0.85rem;
          opacity: 0.8;
        }
      }
    }

    tbody {
      tr {
        &:hover {
          background-color: #f8f9ff;
        }
      }
    }
  }
}

.lib-name {
  a {
    color: @primary-color;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }

  .version {
    font-size: 0.9rem;
    color: #666;
  }
}

.rating {
  span {
    color: #ddd;
    font-size: 1.2rem;

    &.active {
      color: #ffb400;
    }
  }
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .feature-tag {
    background: #e3f2fd;
    color: #1976d2;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
  }
}

.performance-bar {
  height: 24px;
  background: #e0e7ff;
  border-radius: 12px;
  width: 50px;
  position: relative;
  overflow: hidden;

  .bar {
    height: 100%;
    border-radius: 12px;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
    position: relative;

    .value {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      color: white;
      font-size: 0.8rem;
      font-weight: bold;
    }
  }
}

.curve {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .curve-bar {
    width: 30px;
    background: linear-gradient(to top, @primary-color, @secondary-color);
    border-radius: 4px 4px 0 0;
  }

  .curve-label {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 5px;
  }
}

.scenarios {
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
  }
}

// 实现部分
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid @border-color;
  padding-bottom: 10px;

  .tab {
    padding: 10px 20px;
    background: #f0f4ff;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: @primary-color;
      color: white;
    }
  }
}

.implementation-detail {
  h3 {
    margin-top: 0;
  }
}

// 最佳实践
.practices {
  display: grid;
  gap: 25px;

  .practice {
    padding: 20px;
    border-radius: 10px;
    background: #f8f9ff;
    border-left: 4px solid @primary-color;

    .icon {
      font-size: 2rem;
      margin-bottom: 15px;
    }
  }
}

.file-structure {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  border: 1px solid @border-color;
}

// 场景分析
.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  .scenario {
    text-align: center;
    padding: 25px;
    border-radius: 10px;
    background: #f0f4ff;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    .recommend {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px dashed @border-color;
    }
  }
}

// 性能优化
.optimizations {
  display: grid;
  gap: 25px;

  .optimization {
    padding: 20px;
    border-radius: 10px;
    background: #f8f9ff;
    border-left: 4px solid @success-color;
  }
}

// 测试集成
.testing-types {
  display: grid;
  gap: 30px;

  .type {
    padding: 20px;
    border-radius: 10px;
    background: #f0f4ff;
  }
}

// 代码块样式
.code-block {
  background-color: @code-bg;
  border-radius: 8px;
  padding: 18px;
  margin: 18px 0;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  border: 1px solid @border-color;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }

  code {
    color: #2c3e50;
    line-height: 1.5;
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

  .columns {
    flex-direction: column;
  }

  .mock-illustration {
    .real-system,
    .mock-system {
      flex-direction: column;
      gap: 10px;

      .arrow {
        transform: rotate(90deg);
      }
    }
  }
}
</style>
