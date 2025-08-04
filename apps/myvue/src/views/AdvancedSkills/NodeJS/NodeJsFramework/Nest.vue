<template>
  <div class="nest-guide">
    <header class="header">
      <div class="header-content">
        <h1><span class="nest-logo">N</span>est.js 框架基础介绍</h1>
        <p class="subtitle">现代化、高效、可扩展的 Node.js 服务器框架</p>
        <div class="tech-stack">
          <div class="tech-badge">Node.js</div>
          <div class="tech-badge">TypeScript</div>
          <div class="tech-badge">Express/Fastify</div>
          <div class="tech-badge">RxJS</div>
          <div class="tech-badge">GraphQL</div>
          <div class="tech-badge">WebSockets</div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="section intro-section">
        <div class="section-content">
          <h2 class="section-title">🚀 Nest.js 简介</h2>
          <div class="intro-cards">
            <div class="intro-card">
              <div class="intro-icon">📅</div>
              <h3>诞生背景</h3>
              <p>由 Kamil Myśliwiec 于 2017 年创建，旨在解决 Node.js 在构建复杂后端应用时缺乏架构规范的问题。</p>
              <p>灵感来源于 Angular 的模块化和依赖注入设计，同时结合了 Spring 框架的编程范式。</p>
            </div>

            <div class="intro-card">
              <div class="intro-icon">🎯</div>
              <h3>框架定位</h3>
              <ul>
                <li>开箱即用的应用程序架构</li>
                <li>面向 AOP（面向切面编程）</li>
                <li>高度可测试性</li>
                <li>平台无关（支持 Express/Fastify）</li>
                <li>渐进式框架，易于学习和扩展</li>
              </ul>
            </div>

            <div class="intro-card">
              <div class="intro-icon">📈</div>
              <h3>采用趋势</h3>
              <div class="metrics">
                <div class="metric">
                  <div class="metric-value">60K+</div>
                  <div class="metric-label">GitHub Stars</div>
                </div>
                <div class="metric">
                  <div class="metric-value">1.5M+</div>
                  <div class="metric-label">周下载量</div>
                </div>
                <div class="metric">
                  <div class="metric-value">98%</div>
                  <div class="metric-label">开发者满意度</div>
                </div>
              </div>
              <p>被 Adidas、Roche、AutoTrader 等企业广泛采用</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section core-section">
        <div class="section-content">
          <h2 class="section-title">🧱 核心概念</h2>

          <div class="core-concepts">
            <div class="concept-diagram">
              <div class="diagram-center">
                <div class="diagram-item main">模块<br>(Module)</div>
              </div>
              <div class="diagram-ring">
                <div class="diagram-item">控制器<br>(Controller)</div>
                <div class="diagram-item">服务<br>(Service)</div>
                <div class="diagram-item">中间件<br>(Middleware)</div>
              </div>
              <div class="diagram-outer">
                <div class="diagram-item">守卫<br>(Guard)</div>
                <div class="diagram-item">拦截器<br>(Interceptor)</div>
                <div class="diagram-item">管道<br>(Pipe)</div>
                <div class="diagram-item">异常过滤器<br>(Exception Filter)</div>
              </div>
            </div>

            <div class="concept-details">
              <div class="concept-card">
                <div class="concept-header">
                  <span class="concept-icon">📦</span>
                  <h3>模块 (Module)</h3>
                </div>
                <p>应用程序的构建块，使用 @Module() 装饰器定义，用于组织相关功能。</p>
                <pre><code class="language-typescript">@Module({
  imports: [OtherModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}</code></pre>
              </div>

              <div class="concept-card">
                <div class="concept-header">
                  <span class="concept-icon">🎮</span>
                  <h3>控制器 (Controller)</h3>
                </div>
                <p>处理传入请求并返回响应，定义路由和端点。</p>
                <pre><code class="language-typescript">@Controller('users')
export class UserController {
  @Get()
  findAll(): string {
    return 'All users';
  }
}</code></pre>
              </div>

              <div class="concept-card">
                <div class="concept-header">
                  <span class="concept-icon">🔧</span>
                  <h3>服务 (Service)</h3>
                </div>
                <p>业务逻辑的提供者，使用 @Injectable() 装饰器，可通过依赖注入使用。</p>
                <pre><code class="language-typescript">@Injectable()
export class UserService {
  private users = [];

  findAll() {
    return this.users;
  }
}</code></pre>
              </div>

              <div class="concept-card">
                <div class="concept-header">
                  <span class="concept-icon">🧩</span>
                  <h3>中间件 (Middleware)</h3>
                </div>
                <p>在路由处理程序之前调用的函数，用于请求预处理。</p>
                <pre><code class="language-typescript">@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`);
    next();
  }
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section usage-section">
        <div class="section-content">
          <h2 class="section-title">🛠️ 如何使用 Nest.js</h2>

          <div class="usage-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>安装与创建项目</h3>
                <pre><code class="language-bash"># 安装 Nest CLI
npm i -g @nestjs/cli

# 创建新项目
nest new project-name</code></pre>
                <div class="file-structure">
                  <div class="file">src/</div>
                  <div class="file indent">main.ts <span class="comment">// 应用入口</span></div>
                  <div class="file indent">app.module.ts <span class="comment">// 根模块</span></div>
                  <div class="file indent">app.controller.ts</div>
                  <div class="file indent">app.service.ts</div>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>创建资源模块</h3>
                <pre><code class="language-bash"># 生成完整 CRUD 资源
nest g resource users</code></pre>
                <div class="file-structure">
                  <div class="file">src/users/</div>
                  <div class="file indent">users.module.ts</div>
                  <div class="file indent">users.controller.ts</div>
                  <div class="file indent">users.service.ts</div>
                  <div class="file indent">dto/ <span class="comment">// 数据传输对象</span></div>
                  <div class="file indent">entities/ <span class="comment">// 数据库实体</span></div>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>配置与运行</h3>
                <pre><code class="language-bash"># 开发模式运行
npm run start:dev</code></pre>

                <div class="code-block">
                  <h4>main.ts - 应用入口文件</h4>
                  <pre><code class="language-typescript">import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局中间件
  // app.use(logger)

  // 全局管道
  // app.useGlobalPipes(new ValidationPipe())

  // 全局前缀
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section case-section">
        <div class="section-content">
          <h2 class="section-title">💼 使用场景</h2>

          <div class="case-grid">
            <div class="case-card">
              <div class="case-icon">🌐</div>
              <h3>RESTful API 服务</h3>
              <p>构建高性能、结构化的 REST API，支持版本控制、认证、数据验证</p>
              <pre><code class="language-typescript">@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}</code></pre>
            </div>

            <div class="case-card">
              <div class="case-icon">📡</div>
              <h3>实时应用 (WebSockets)</h3>
              <p>使用 @nestjs/websockets 模块构建实时聊天、通知系统</p>
              <pre><code class="language-typescript">@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    this.server.emit('message', payload);
  }
}</code></pre>
            </div>

            <div class="case-card">
              <div class="case-icon">📊</div>
              <h3>GraphQL 服务器</h3>
              <p>使用 @nestjs/graphql 构建类型安全的 GraphQL API</p>
              <pre><code class="language-typescript">@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(returns => User)
  async createUser(@Args('data') data: CreateUserInput) {
    return this.userService.create(data);
  }
}</code></pre>
            </div>

            <div class="case-card">
              <div class="case-icon">🛡️</div>
              <h3>微服务架构</h3>
              <p>使用内置微服务模块构建分布式系统</p>
              <div class="microservices">
                <div class="service">API Gateway</div>
                <div class="connector">⇄</div>
                <div class="service-group">
                  <div class="service">用户服务</div>
                  <div class="service">订单服务</div>
                  <div class="service">支付服务</div>
                </div>
              </div>
              <pre><code class="language-typescript">// 创建微服务
const app = await NestFactory.createMicroservice(AppModule, {
  transport: Transport.TCP,
  options: { port: 3001 }
});</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="section pros-cons-section">
        <div class="section-content">
          <h2 class="section-title">👍👎 Nest.js 优缺点分析</h2>

          <div class="comparison">
            <div class="pros">
              <h3>✅ 优势</h3>
              <ul>
                <li>
                  <div class="icon">🏗️</div>
                  <div>
                    <strong>开箱即用的架构</strong>
                    <p>提供清晰的项目结构，减少架构决策时间</p>
                  </div>
                </li>
                <li>
                  <div class="icon">🔄</div>
                  <div>
                    <strong>强大的依赖注入</strong>
                    <p>简化模块间依赖管理，提高可测试性</p>
                  </div>
                </li>
                <li>
                  <div class="icon">📚</div>
                  <div>
                    <strong>丰富的生态系统</strong>
                    <p>官方支持 TypeORM、Mongoose、GraphQL、WebSockets 等</p>
                  </div>
                </li>
                <li>
                  <div class="icon">⚡</div>
                  <div>
                    <strong>高性能</strong>
                    <p>默认使用 Fastify，性能优于 Express</p>
                  </div>
                </li>
                <li>
                  <div class="icon">🧪</div>
                  <div>
                    <strong>优秀的可测试性</strong>
                    <p>依赖注入架构便于单元测试和集成测试</p>
                  </div>
                </li>
                <li>
                  <div class="icon">🧩</div>
                  <div>
                    <strong>模块化设计</strong>
                    <p>功能模块化，便于维护和扩展</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="cons">
              <h3>⚠️ 局限</h3>
              <ul>
                <li>
                  <div class="icon">📖</div>
                  <div>
                    <strong>学习曲线</strong>
                    <p>需要理解装饰器、依赖注入等概念</p>
                  </div>
                </li>
                <li>
                  <div class="icon">🏗️</div>
                  <div>
                    <strong>项目初始化复杂</strong>
                    <p>相比 Express/Koa 有更多初始配置和样板代码</p>
                  </div>
                </li>
                <li>
                  <div class="icon">🧠</div>
                  <div>
                    <strong>抽象层</strong>
                    <p>框架抽象可能限制底层访问</p>
                  </div>
                </li>
                <li>
                  <div class="icon">📦</div>
                  <div>
                    <strong>包体积较大</strong>
                    <p>包含更多依赖，冷启动时间稍长</p>
                  </div>
                </li>
                <li>
                  <div class="icon">🧑‍💻</div>
                  <div>
                    <strong>团队适配</strong>
                    <p>需要团队成员熟悉 TypeScript 和 OOP 概念</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="section conclusion-section">
        <div class="section-content">
          <h2 class="section-title">🎯 何时选择 Nest.js</h2>

          <div class="recommendation">
            <div class="recommend-card">
              <h3>推荐使用场景</h3>
              <ul>
                <li>企业级后端应用程序</li>
                <li>需要长期维护的项目</li>
                <li>大型团队协作开发</li>
                <li>需要严格架构规范的系统</li>
                <li>需要集成多种技术栈的项目</li>
              </ul>
            </div>

            <div class="recommend-card">
              <h3>其他选择</h3>
              <ul>
                <li>小型项目/原型验证 - Express/Koa</li>
                <li>函数式计算 - Serverless Framework</li>
                <li>无架构约束 - Fastify/Hapi</li>
                <li>全栈 JavaScript - Next.js/Nuxt.js API Routes</li>
              </ul>
            </div>
          </div>

          <div class="final-thoughts">
            <div class="thought-icon">💡</div>
            <p>Nest.js 提供了一个强大而优雅的架构来解决 Node.js
              服务器端应用的复杂性问题，特别适合需要长期维护的企业级应用程序。虽然学习曲线比简单框架陡峭，但它提供的结构化和可扩展性为大型项目带来了显著的长期效益。</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© 2023 Nest.js 框架指南 | 构建可扩展的企业级 Node.js 应用 | 文档: docs.nestjs.com</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

// 代码高亮状态
const highlighted = ref(false);

// 模拟代码高亮初始化
const highlightCode = () => {
  if (!highlighted.value) {
    console.log('初始化代码高亮效果');
    highlighted.value = true;
    // 实际项目中可集成 Prism.js 或 Highlight.js
  }
};

onMounted(() => {
  highlightCode();
});
</script>

<style lang="less" scoped>
@primary-color: #e0234e;
@secondary-color: #3f51b5;
@accent-color: #42b983;
@text-color: #2c3e50;
@light-bg: #f8fafc;
@card-bg: #ffffff;
@border-color: #e1e4e8;
@success-color: #43a047;
@warning-color: #ff9800;

.nest-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: @text-color;
  line-height: 1.6;
  background: @light-bg;
}

.header {
  text-align: center;
  padding: 60px 20px 40px;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '{}';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 6rem;
    opacity: 0.05;
    font-family: monospace;
    transform: rotate(20deg);
  }

  .header-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 15px;
    font-weight: 700;

    .nest-logo {
      display: inline-block;
      width: 70px;
      height: 70px;
      line-height: 70px;
      background: @primary-color;
      border-radius: 50%;
      margin-right: 15px;
      font-weight: 900;
      box-shadow: 0 5px 15px rgba(224, 35, 78, 0.3);
    }
  }

  .subtitle {
    font-size: 1.4rem;
    opacity: 0.9;
    margin-bottom: 30px;
  }

  .tech-stack {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 30px;

    .tech-badge {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 8px 18px;
      border-radius: 30px;
      font-size: 0.9rem;
      transition: all 0.3s ease;

      &:hover {
        background: @primary-color;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(224, 35, 78, 0.3);
      }
    }
  }
}

.section {
  margin-bottom: 50px;

  .section-content {
    background: @card-bg;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  }

  .section-title {
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid @border-color;
    color: @primary-color;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 30px;
      background: @primary-color;
      margin-right: 15px;
      border-radius: 4px;
    }
  }
}

.intro-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.intro-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 25px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .intro-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @secondary-color;
  }

  ul {
    padding-left: 20px;
    margin-top: 10px;

    li {
      margin-bottom: 8px;
    }
  }

  .metrics {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;

    .metric {
      text-align: center;

      .metric-value {
        font-size: 1.8rem;
        font-weight: 700;
        color: @primary-color;
      }

      .metric-label {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    }
  }
}

.core-concepts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.concept-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 450px;

  .diagram-center {
    position: absolute;
    width: 150px;
    height: 150px;
    background: lighten(@secondary-color, 40%);
    border: 3px solid @secondary-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 700;
    color: darken(@secondary-color, 15%);
    z-index: 3;
    box-shadow: 0 5px 15px rgba(63, 81, 181, 0.2);
  }

  .diagram-ring {
    position: absolute;
    width: 300px;
    height: 300px;
    border: 2px dashed lighten(@primary-color, 30%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .diagram-item {
      position: absolute;
      width: 120px;
      height: 120px;
      background: lighten(@primary-color, 45%);
      border: 2px solid @primary-color;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 0.9rem;
      font-weight: 600;
      padding: 15px;
      color: darken(@primary-color, 10%);

      &:nth-child(1) {
        transform: translate(-150px, 0);
      }

      &:nth-child(2) {
        transform: translate(0, -150px);
      }

      &:nth-child(3) {
        transform: translate(150px, 0);
      }
    }
  }

  .diagram-outer {
    position: absolute;
    width: 450px;
    height: 450px;
    border: 2px dashed lighten(@accent-color, 30%);
    border-radius: 50%;

    .diagram-item {
      position: absolute;
      width: 110px;
      height: 110px;
      background: lighten(@accent-color, 45%);
      border: 2px solid @accent-color;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 0.85rem;
      padding: 10px;
      color: darken(@accent-color, 15%);

      &:nth-child(1) {
        transform: translate(-220px, -80px);
      }

      &:nth-child(2) {
        transform: translate(-150px, -200px);
      }

      &:nth-child(3) {
        transform: translate(150px, -200px);
      }

      &:nth-child(4) {
        transform: translate(220px, -80px);
      }
    }
  }
}

.concept-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.concept-card {
  background: @card-bg;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .concept-header {
    display: flex;
    align-items: center;
    padding: 20px;
    background: linear-gradient(to right, #f5f7fa, #e8edf5);
    border-bottom: 1px solid @border-color;

    .concept-icon {
      font-size: 1.8rem;
      margin-right: 15px;
    }

    h3 {
      margin: 0;
      color: @primary-color;
    }
  }

  p {
    padding: 15px 20px;
    margin: 0;
  }

  pre {
    margin: 0;
    padding: 15px;
    background: #2d2d2d;
    color: #f8f8f2;
    border-radius: 0 0 12px 12px;
    font-size: 0.9rem;
    overflow-x: auto;
  }
}

.usage-steps {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.step {
  display: flex;
  gap: 20px;

  .step-number {
    min-width: 40px;
    height: 40px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    margin-top: 5px;
  }

  .step-content {
    flex: 1;

    h3 {
      margin-top: 0;
      color: @secondary-color;
    }

    pre {
      background: #f5f7fa;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid @primary-color;
      overflow-x: auto;
      font-size: 0.95rem;
    }

    .file-structure {
      background: #f8f9fc;
      padding: 20px;
      border-radius: 8px;
      font-family: 'Fira Code', monospace;
      margin-top: 15px;

      .file {
        margin-bottom: 5px;

        &.indent {
          padding-left: 20px;
        }

        .comment {
          color: #888;
        }
      }
    }

    .code-block {
      margin-top: 20px;

      h4 {
        margin-top: 0;
        margin-bottom: 10px;
        color: @secondary-color;
      }

      pre {
        background: #2d2d2d;
        color: #f8f8f2;
        padding: 15px;
        border-radius: 8px;
        border-left: 4px solid @accent-color;
      }
    }
  }
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.case-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .case-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @primary-color;
  }

  p {
    color: #555;
    margin-bottom: 15px;
  }

  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 0.85rem;
  }

  .microservices {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    gap: 20px;

    .service {
      background: @accent-color;
      color: white;
      padding: 10px 15px;
      border-radius: 8px;
      font-size: 0.9rem;
      text-align: center;
    }

    .service-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .connector {
      font-size: 1.5rem;
      opacity: 0.5;
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .pros,
  .cons {
    border-radius: 12px;
    padding: 25px;

    h3 {
      margin-top: 0;
      padding-bottom: 15px;
      border-bottom: 2px solid;
    }
  }

  .pros {
    background: rgba(67, 160, 71, 0.05);
    border-left: 4px solid @success-color;

    h3 {
      color: @success-color;
      border-bottom-color: rgba(67, 160, 71, 0.2);
    }
  }

  .cons {
    background: rgba(255, 152, 0, 0.05);
    border-left: 4px solid @warning-color;

    h3 {
      color: @warning-color;
      border-bottom-color: rgba(255, 152, 0, 0.2);
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: flex-start;
      padding: 15px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);

      .icon {
        font-size: 1.8rem;
        margin-right: 15px;
        min-width: 40px;
      }

      strong {
        display: block;
        margin-bottom: 5px;
      }

      p {
        margin: 0;
        opacity: 0.8;
        font-size: 0.95rem;
      }
    }
  }
}

.recommendation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.recommend-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: @secondary-color;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-color;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 12px;
      padding-left: 8px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 10px;
        width: 6px;
        height: 6px;
        background: @primary-color;
        border-radius: 50%;
      }
    }
  }
}

.final-thoughts {
  display: flex;
  background: #edf7ff;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid @secondary-color;

  .thought-icon {
    font-size: 3rem;
    margin-right: 20px;
    color: @secondary-color;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
  border-top: 1px solid @border-color;
  color: #7f8c8d;
  font-size: 0.95rem;
}
</style>
