<template>
  <div class="decorators-guide">
    <!-- 顶部标题区域 -->
    <h1>TypeScript 装饰器</h1>

    <!-- 内容区域 -->
    <div class="content-container">
      <!-- 基础概念 -->
      <section class="content-section">
        <h2 class="section-title">
          <span class="title-icon">📚</span>
          <span>基础概念</span>
        </h2>
        <div class="section-content">
          <div class="concept-intro">
            <p>
              <strong>装饰器(Decorator)</strong>是TypeScript中的一种特殊声明，使用<code>@expression</code>形式附加到类声明、方法、属性或参数上，用于修改或扩展其行为。装饰器本质上是高阶函数，在编译时执行。
            </p>
          </div>

          <div class="feature-columns">
            <div class="feature-column">
              <h3>核心原理</h3>
              <ul class="feature-list">
                <li><strong>函数包装</strong> - 装饰器本质是高阶函数，包装目标元素</li>
                <li><strong>编译时执行</strong> - 在代码编译阶段而非运行时执行</li>
                <li><strong>元编程</strong> - 通过操作代码结构来影响程序行为</li>
                <li><strong>组合性</strong> - 多个装饰器可以叠加使用</li>
              </ul>

              <div class="code-block">
                <h4>装饰器执行顺序</h4>
                <pre><code>// 1. 参数装饰器
// 2. 方法/属性/访问器装饰器
// 3. 类装饰器(从内到外)

@ClassDecorator()
class Example {
  @PropertyDecorator()
  prop = '';

  @MethodDecorator()
  method(@ParamDecorator() param: string) {}

  @AccessorDecorator()
  get accessor() { return this.prop; }
}</code></pre>
              </div>
            </div>

            <div class="feature-column">
              <h3>启用装饰器</h3>
              <div class="type-card-grid">
                <div class="type-card">
                  <div class="type-icon">1️⃣</div>
                  <h4>tsconfig.json</h4>
                  <p>启用实验性装饰器支持</p>
                  <pre><code>{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}</code></pre>
                </div>

                <div class="type-card">
                  <div class="type-icon">2️⃣</div>
                  <h4>TC39提案</h4>
                  <p>Stage 3提案装饰器(TS 5.0+)</p>
                  <pre><code>{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true
  }
}</code></pre>
                </div>

                <div class="type-card">
                  <div class="type-icon">3️⃣</div>
                  <h4>Babel配置</h4>
                  <p>使用插件支持装饰器</p>
                  <pre><code>// babel.config.js
module.exports = {
  plugins: [
    ["@babel/plugin-proposal-decorators", {
      "version": "2022-03"
    }]
  ]
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 装饰器类型 -->
      <section class="content-section">
        <h2 class="section-title">
          <span class="title-icon">🔧</span>
          <span>装饰器类型</span>
        </h2>
        <div class="section-content">
          <div class="step-by-step">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>类装饰器</h3>
                <p>应用于类构造函数，用于观察、修改或替换类定义</p>
                <div class="code-compare">
                  <div class="code-column">
                    <h4>装饰器定义</h4>
                    <pre><code>function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}</code></pre>
                  </div>
                  <div class="code-column">
                    <h4>装饰器工厂</h4>
                    <pre><code>function color(value: string) {
  return function (constructor: Function) {
    constructor.prototype.color = value;
  };
}

@color("blue")
class Car {
  // 现在Car实例有color属性
}

const myCar = new Car();
console.log(myCar.color); // "blue"</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>方法装饰器</h3>
                <p>应用于方法描述符，用于观察、修改或替换方法定义</p>
                <div class="scenario-cards">
                  <div class="scenario-card">
                    <h4>方法拦截</h4>
                    <pre><code>function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${key} with`, args);
    const result = original.apply(this, args);
    console.log(`Called ${key}, returned`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number) {
    return a + b;
  }
}</code></pre>
                    <p>实现方法调用的日志记录</p>
                  </div>

                  <div class="scenario-card">
                    <h4>延迟执行</h4>
                    <pre><code>function delay(ms: number) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    descriptor.value = function(...args: any[]) {
      setTimeout(() => {
        original.apply(this, args);
      }, ms);
    };

    return descriptor;
  };
}

class Message {
  @delay(1000)
  show(msg: string) {
    console.log(msg);
  }
}</code></pre>
                    <p>方法调用延迟执行</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>属性/参数/访问器装饰器</h3>
                <div class="type-examples">
                  <div class="example-card">
                    <h4>属性装饰器</h4>
                    <pre><code>function format(formatString: string) {
  return (target: any, key: string) => {
    let value = target[key];

    const getter = () => value;
    const setter = (newVal: string) => {
      value = newVal.padStart(10, formatString);
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class Product {
  @format('*')
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

const p = new Product('123');
console.log(p.id); // "*******123"</code></pre>
                  </div>

                  <div class="example-card">
                    <h4>参数装饰器</h4>
                    <pre><code>function validate(min: number, max: number) {
  return (target: any, key: string, index: number) => {
    const original = target[key];

    target[key] = function(...args: any[]) {
      const arg = args[index];
      if (arg < min || arg > max) {
        throw new Error(`参数 ${index} 必须在 ${min}-${max} 之间`);
      }
      return original.apply(this, args);
    };
  };
}

class MathUtils {
  static pow(
    @validate(0, 10) base: number,
    exponent: number
  ) {
    return Math.pow(base, exponent);
  }
}</code></pre>
                  </div>

                  <div class="example-card">
                    <h4>访问器装饰器</h4>
                    <pre><code>function configurable(value: boolean) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() { return this._x; }

  @configurable(true)
  get y() { return this._y; }
}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="content-section">
        <h2 class="section-title">
          <span class="title-icon">💼</span>
          <span>使用场景</span>
        </h2>
        <div class="section-content">
          <div class="use-case-grid">
            <div class="use-case-card">
              <div class="use-case-icon">🔄</div>
              <h3>依赖注入</h3>
              <p>实现控制反转和依赖注入模式</p>
              <div class="code-block">
                <pre><code>// 模拟Angular的@Injectable
function Injectable() {
  return (target: any) => {
    // 注册到DI容器
    Container.register(target);
  };
}

// 模拟Angular的@Inject
function Inject(token: any) {
  return (target: any, key: string, index: number) => {
    // 标记需要注入的参数
    Reflect.defineMetadata('design:paramtypes', token, target, key);
  };
}

@Injectable()
class AuthService {
  login() { /* ... */ }
}

@Injectable()
class UserService {
  constructor(@Inject(AuthService) private auth: AuthService) {}
}</code></pre>
              </div>
            </div>

            <div class="use-case-card">
              <div class="use-case-icon">📝</div>
              <h3>日志记录</h3>
              <p>AOP方式的日志记录</p>
              <div class="code-block">
                <pre><code>function logExecutionTime(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = async function(...args: any[]) {
    const start = performance.now();
    try {
      const result = await original.apply(this, args);
      const end = performance.now();
      console.log(`${key} executed in ${(end - start).toFixed(2)}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(`${key} failed after ${(end - start).toFixed(2)}ms`, error);
      throw error;
    }
  };

  return descriptor;
}

class DataService {
  @logExecutionTime
  async fetchData(url: string) {
    // 数据获取逻辑
  }
}</code></pre>
              </div>
            </div>

            <div class="use-case-card">
              <div class="use-case-icon">🔒</div>
              <h3>权限控制</h3>
              <p>基于装饰器的权限验证</p>
              <div class="code-block">
                <pre><code>function Role(role: string) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const user = getUserFromContext();
      if (!user.roles.includes(role)) {
        throw new Error('无权访问');
      }
      return original.apply(this, args);
    };

    return descriptor;
  };
}

class AdminController {
  @Role('admin')
  deleteUser(id: string) {
    // 删除用户逻辑
  }
}</code></pre>
              </div>
            </div>
          </div>

          <div class="advanced-usage">
            <h3>框架集成</h3>
            <div class="advanced-grid">
              <div class="advanced-card">
                <h4>NestJS</h4>
                <pre><code>@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles('admin')
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}</code></pre>
                <p>NestJS重度依赖装饰器</p>
              </div>

              <div class="advanced-card">
                <h4>TypeORM</h4>
                <pre><code>@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}</code></pre>
                <p>TypeORM实体定义</p>
              </div>

              <div class="advanced-card">
                <h4>Vue Class Component</h4>
                <pre><code>@Component({
  components: { MyComponent }
})
export default class MyVueComponent extends Vue {
  @Prop() readonly propA!: number;
  @Prop({ default: 'default value' }) readonly propB!: string;

  @Emit()
  submit() {
    return { data: 123 };
  }

  @Watch('child')
  onChildChanged(val: string, oldVal: string) {
    console.log(val, oldVal);
  }
}</code></pre>
                <p>Vue类组件装饰器</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="content-section summary-section">
        <h2 class="section-title">
          <span class="title-icon">⚠️</span>
          <span>注意事项</span>
        </h2>
        <div class="section-content">
          <div class="best-practices">
            <div class="practice-card">
              <div class="practice-icon">1️⃣</div>
              <h3>实验性特性</h3>
              <p>装饰器目前仍是TC39提案中的实验性特性，未来可能有变化</p>
              <ul class="warning-list">
                <li>TypeScript实现与提案可能有差异</li>
                <li>TC39提案已进入Stage 3</li>
                <li>TypeScript 5.0+支持新版提案</li>
              </ul>
            </div>

            <div class="practice-card">
              <div class="practice-icon">2️⃣</div>
              <h3>性能考量</h3>
              <p>装饰器在编译时执行，但可能增加运行时开销</p>
              <ul class="warning-list">
                <li>避免过度复杂的装饰器逻辑</li>
                <li>注意装饰器导致的额外函数调用</li>
                <li>生产环境可能需要额外优化</li>
              </ul>
            </div>

            <div class="practice-card">
              <div class="practice-icon">3️⃣</div>
              <h3>调试困难</h3>
              <p>装饰器可能使代码行为变得隐式</p>
              <ul class="warning-list">
                <li>添加清晰的文档说明</li>
                <li>保持装饰器逻辑简单透明</li>
                <li>考虑添加调试日志</li>
              </ul>
            </div>
          </div>

          <div class="final-note">
            <p>
              TypeScript装饰器提供了强大的元编程能力，可以优雅地实现AOP、依赖注入、元数据管理等高级模式。
              但作为实验性特性，应在项目中谨慎使用，并关注TC39提案的最新进展。
              合理使用装饰器可以大幅提升代码的可维护性和扩展性。
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以放置与组件相关的逻辑代码
import { ref } from 'vue';

const decoratorTypes = ref([
  {
    name: '类装饰器',
    description: '应用于类构造函数，用于观察、修改或替换类定义',
    example: '@Component({...}) class MyComponent {}'
  },
  {
    name: '方法装饰器',
    description: '应用于方法描述符，用于观察、修改或替换方法定义',
    example: '@Log() myMethod() {}'
  },
  {
    name: '属性装饰器',
    description: '应用于属性声明，用于观察或修改属性定义',
    example: '@Prop() myProp: string;'
  },
  {
    name: '参数装饰器',
    description: '应用于参数声明，用于观察参数的使用',
    example: 'myMethod(@Param() param: string) {}'
  },
  {
    name: '访问器装饰器',
    description: '应用于访问器声明，用于观察、修改或替换访问器定义',
    example: '@Configurable(false) get value() { return this._value; }'
  }
]);
</script>

<style scoped lang="less">
// 变量定义
@primary-color: #7209b7;
@secondary-color: #3a0ca3;
@accent-color: #4361ee;
@success-color: #4cc9f0;
@warning-color: #f72585;
@dark-color: #2b2d42;
@light-color: #f8f9fa;
@text-color: #2d3748;
@border-color: #e2e8f0;
@card-bg: #ffffff;
@radius: 12px;
@shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
@transition: all 0.3s ease;

.decorators-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: @text-color;
  line-height: 1.6;
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
}

.hero-section {

  border-radius: @radius;
  overflow: hidden;
  margin-bottom: 40px;
  box-shadow: @shadow;
  position: relative;
  color: white;
  padding: 40px;

  .hero-content {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
      color: #000;
      background: linear-gradient(to right, #ffffff, #e0f7fa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 25px;
      font-weight: 400;
    }

    .version-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      padding: 6px 18px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.9rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: @radius;
  padding: 25px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95rem;
    opacity: 0.9;
  }
}

.content-container {
  padding: 0 20px;
}

.content-section {
  background: @card-bg;
  border-radius: @radius;
  box-shadow: @shadow;
  padding: 30px;
  margin-bottom: 30px;

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: @dark-color;
    padding-bottom: 15px;
    border-bottom: 2px solid @border-color;

    .title-icon {
      font-size: 1.5rem;
    }
  }
}

.section-content {
  p {
    margin-bottom: 25px;
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4a5568;
  }
}

.concept-intro {
  background: #f8fafc;
  border-radius: @radius;
  padding: 25px;
  margin-bottom: 30px;
  border-left: 4px solid @primary-color;

  p {
    margin-bottom: 0;
    font-size: 1.15rem;

    code {
      background: #e9d8fd;
      color: #6b46c1;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
    }
  }
}

.feature-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.feature-column {
  h3 {
    font-size: 1.4rem;
    margin-bottom: 20px;
    color: @dark-color;
    padding-bottom: 10px;
    border-bottom: 2px solid @border-color;
  }
}

.feature-list {
  list-style: none;
  margin-bottom: 25px;

  li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 12px;
    font-size: 1.05rem;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: @success-color;
      font-weight: bold;
    }

    strong {
      color: @dark-color;
    }
  }
}

.code-block {
  background: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid @border-color;

  h4 {
    background: #edf2f7;
    color: @dark-color;
    padding: 10px 15px;
    font-size: 0.95rem;
    font-weight: 600;
  }

  pre {
    padding: 15px;
    margin: 0;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #2d3748;
    }
  }
}

.type-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.type-card {
  background: white;
  border-radius: @radius;
  padding: 20px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  .type-icon {
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: @primary-color;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: @dark-color;
  }

  p {
    font-size: 0.95rem;
    margin-bottom: 15px;
    color: #4a5568;
  }

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-bottom: 0;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
    }
  }
}

.step-by-step {
  .step {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;

    .step-number {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .step-content {
      flex-grow: 1;

      h3 {
        font-size: 1.4rem;
        margin-bottom: 15px;
        color: @dark-color;
      }

      p {
        font-size: 1.05rem;
        margin-bottom: 20px;
      }
    }
  }
}

.code-compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;

  .code-column {
    h4 {
      font-size: 1.1rem;
      margin-bottom: 10px;
      color: @dark-color;
    }

    pre {
      background: #f8fafc;
      border-radius: 6px;
      padding: 12px;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
      }
    }
  }
}

.scenario-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.scenario-card {
  background: white;
  border-radius: @radius;
  padding: 20px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: @dark-color;
  }

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-bottom: 15px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
    }
  }

  p {
    font-size: 0.95rem;
    margin-bottom: 0;
    color: #4a5568;
  }
}

.type-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.example-card {
  background: white;
  border-radius: @radius;
  padding: 20px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: @dark-color;
  }

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-bottom: 0;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
    }
  }
}

.use-case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.use-case-card {
  background: white;
  border-radius: @radius;
  padding: 25px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  .use-case-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: @dark-color;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
    color: #4a5568;
  }
}

.advanced-usage {
  margin-top: 40px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 25px;
    color: @dark-color;
  }
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.advanced-card {
  background: white;
  border-radius: @radius;
  padding: 20px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: @dark-color;
  }

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    margin-bottom: 15px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
    }
  }

  p {
    font-size: 0.95rem;
    margin-bottom: 0;
    color: #4a5568;
  }
}

.summary-section {
  background: linear-gradient(to bottom, #f8fafc, #ffffff);

  .section-title {
    border-bottom-color: @primary-color;
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.practice-card {
  background: white;
  border-radius: @radius;
  padding: 25px;
  border: 1px solid @border-color;
  transition: @transition;

  &:hover {
    transform: translateY(-5px);
    box-shadow: @shadow;
  }

  .practice-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: @dark-color;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
    color: #4a5568;
  }
}

.warning-list {
  list-style: none;
  margin-top: 15px;

  li {
    position: relative;
    padding-left: 25px;
    margin-bottom: 10px;
    font-size: 0.95rem;

    &::before {
      content: '⚠️';
      position: absolute;
      left: 0;
    }
  }
}

.final-note {
  background: #f0f9ff;
  padding: 25px;
  border-radius: @radius;
  border-left: 4px solid @primary-color;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 0;
    color: @text-color;
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .hero-section {
    padding: 30px 20px;

    .hero-content {
      h1 {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }
    }
  }

  .feature-columns,
  .step-by-step .step {
    grid-template-columns: 1fr;
    flex-direction: column;
  }

  .advanced-grid,
  .best-practices {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-section {
    .hero-content {
      h1 {
        font-size: 2rem;
      }
    }
  }

  .content-section {
    padding: 20px;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 25px 15px;

    .hero-content {
      h1 {
        font-size: 1.8rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }
    }
  }

  .content-container {
    padding: 0 10px;
  }

  .content-section {
    padding: 15px;

    .section-title {
      font-size: 1.5rem;
    }
  }

  .code-block {
    h4 {
      font-size: 0.9rem;
    }

    pre code {
      font-size: 0.8rem;
    }
  }

  .concept-intro {
    padding: 15px;

    p {
      font-size: 1rem;
    }
  }
}

/* 继续补充的CSS代码 */

// 代码高亮样式增强
.code-block {
  pre {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    code {
      position: relative;
      z-index: 1;

      .token {
        &.keyword {
          color: #f472b6;
        }

        &.function {
          color: #60a5fa;
        }

        &.string {
          color: #84cc16;
        }

        &.number {
          color: #f59e0b;
        }

        &.comment {
          color: #64748b;
          font-style: italic;
        }

        &.punctuation {
          color: #e2e8f0;
        }

        &.operator {
          color: #93c5fd;
        }
      }
    }
  }
}

// 滚动条样式
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;

  &:hover {
    background: #a8a8a8;
  }
}

// 动画效果
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-section {
  animation: fadeIn 0.6s ease-out forwards;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }

  &:nth-child(4) {
    animation-delay: 0.4s;
  }
}

// 工具提示样式
[data-tooltip] {
  position: relative;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: @dark-color;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    z-index: 10;
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
    bottom: calc(100% + 5px);
  }
}

// 打印样式
@media print {

  .hero-section,
  .feature-grid {
    display: none;
  }

  .content-section {
    box-shadow: none;
    page-break-inside: avoid;
  }

  .code-block {
    page-break-inside: avoid;
    background: #f8f8f8 !important;
    border: 1px solid #ddd !important;

    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
}

// 移动端导航按钮 (如果将来需要)
.mobile-nav-btn {
  display: none;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  width: 40px;
  height: 40px;
  background: @primary-color;
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// 加载动画
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.loading-placeholder {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background: @border-color;
  border-radius: @radius;

  &.line {
    height: 20px;
    margin-bottom: 10px;
  }

  &.card {
    height: 200px;
    margin-bottom: 20px;
  }
}

// 链接样式
a {
  color: @primary-color;
  text-decoration: none;
  transition: @transition;

  &:hover {
    color: darken(@primary-color, 10%);
    text-decoration: underline;
  }
}

// 表格样式 (如果将来需要)
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid @border-color;
  }

  th {
    background: #f8fafc;
    font-weight: 600;
    color: @dark-color;
  }

  tr:hover {
    background: #f8fafc;
  }
}

// 表单元素样式 (如果将来需要)
input,
select,
textarea {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid @border-color;
  border-radius: 6px;
  font-size: 1rem;
  transition: @transition;

  &:focus {
    outline: none;
    border-color: @primary-color;
    box-shadow: 0 0 0 3px fade(@primary-color, 10%);
  }
}

button {
  padding: 10px 20px;
  background: @primary-color;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: @transition;

  &:hover {
    background: darken(@primary-color, 10%);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

// 标签样式
.tag {
  display: inline-block;
  padding: 3px 8px;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;

  &.primary {
    background: #ede9fe;
    color: #6d28d9;
  }

  &.success {
    background: #dcfce7;
    color: #166534;
  }

  &.warning {
    background: #fef3c7;
    color: #92400e;
  }

  &.danger {
    background: #fee2e2;
    color: #991b1b;
  }
}

// 分割线样式
.divider {
  height: 1px;
  background: @border-color;
  margin: 30px 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: @primary-color;
  }
}

// 浮动操作按钮
.fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: @primary-color;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
  }
}

// 骨架屏加载动画
@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}

.shimmer {
  animation: shimmer 1.5s infinite linear;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
}

// 响应式工具类
.hidden {
  &-mobile {
    @media (max-width: 768px) {
      display: none !important;
    }
  }

  &-desktop {
    @media (min-width: 769px) {
      display: none !important;
    }
  }
}

// 网格系统
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;

  .col {
    padding: 0 15px;

    &-1 {
      width: 8.33%;
    }

    &-2 {
      width: 16.66%;
    }

    &-3 {
      width: 25%;
    }

    &-4 {
      width: 33.33%;
    }

    &-5 {
      width: 41.66%;
    }

    &-6 {
      width: 50%;
    }

    &-7 {
      width: 58.33%;
    }

    &-8 {
      width: 66.66%;
    }

    &-9 {
      width: 75%;
    }

    &-10 {
      width: 83.33%;
    }

    &-11 {
      width: 91.66%;
    }

    &-12 {
      width: 100%;
    }

    @media (max-width: 768px) {
      &-md-1 {
        width: 8.33%;
      }

      &-md-2 {
        width: 16.66%;
      }

      &-md-3 {
        width: 25%;
      }

      &-md-4 {
        width: 33.33%;
      }

      &-md-5 {
        width: 41.66%;
      }

      &-md-6 {
        width: 50%;
      }

      &-md-7 {
        width: 58.33%;
      }

      &-md-8 {
        width: 66.66%;
      }

      &-md-9 {
        width: 75%;
      }

      &-md-10 {
        width: 83.33%;
      }

      &-md-11 {
        width: 91.66%;
      }

      &-md-12 {
        width: 100%;
      }
    }

    @media (max-width: 576px) {
      &-sm-1 {
        width: 8.33%;
      }

      &-sm-2 {
        width: 16.66%;
      }

      &-sm-3 {
        width: 25%;
      }

      &-sm-4 {
        width: 33.33%;
      }

      &-sm-5 {
        width: 41.66%;
      }

      &-sm-6 {
        width: 50%;
      }

      &-sm-7 {
        width: 58.33%;
      }

      &-sm-8 {
        width: 66.66%;
      }

      &-sm-9 {
        width: 75%;
      }

      &-sm-10 {
        width: 83.33%;
      }

      &-sm-11 {
        width: 91.66%;
      }

      &-sm-12 {
        width: 100%;
      }
    }
  }
}

// 工具提示增强
.tooltip {
  position: relative;

  &-text {
    visibility: hidden;
    width: 120px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #333 transparent transparent transparent;
    }
  }

  &:hover &-text {
    visibility: visible;
    opacity: 1;
  }
}

// 自定义滚动容器
.scroll-container {
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: @primary-color @border-color;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: @border-color;
  }

  &::-webkit-scrollbar-thumb {
    background-color: @primary-color;
    border-radius: 20px;
  }
}

// 粘性元素
.sticky {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (prefers-color-scheme: dark) {
    background: #16213e;
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>