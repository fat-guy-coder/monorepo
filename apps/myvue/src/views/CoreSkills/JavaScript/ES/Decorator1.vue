<template>
  <div class="decorator-container">
    <div class="header">
      <h1>ES装饰器详解</h1>
      <p class="subtitle">元编程利器 - 用声明式语法增强代码功能</p>
    </div>

    <div class="pattern-card">
      <div class="card-header">
        <div class="pattern-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" />
          </svg>
        </div>
        <div class="pattern-info">
          <h2>装饰器 (Decorators)</h2>
          <div class="pattern-tags">
            <span class="tag">元编程</span>
            <span class="tag">ES提案</span>
            <span class="tag">代码增强</span>
          </div>
        </div>
      </div>

      <div class="card-content">
        <div class="section concept">
          <h3>概念定义</h3>
          <p>
            装饰器是一种特殊的声明，可以附加到类声明、方法、访问器、属性或参数上。
            它使用<code>@expression</code>的形式，其中<code>expression</code>求值后必须是一个函数，
            该函数在运行时被调用，并以装饰目标的信息作为参数。
          </p>
          <div class="concept-diagram">
            <div class="decorator">@decorator</div>
            <div class="arrow">↓</div>
            <div class="target">
              <div class="class">类</div>
              <div class="method">方法</div>
              <div class="property">属性</div>
              <div class="parameter">参数</div>
              <div class="accessor">访问器</div>
            </div>
          </div>
        </div>

        <div class="section types">
          <h3>装饰器类型</h3>
          <div class="type-tabs">
            <button :class="{ active: activeType === 'class' }" @click="activeType = 'class'">
              类装饰器
            </button>
            <button :class="{ active: activeType === 'method' }" @click="activeType = 'method'">
              方法装饰器
            </button>
            <button :class="{ active: activeType === 'property' }" @click="activeType = 'property'">
              属性装饰器
            </button>
            <button :class="{ active: activeType === 'param' }" @click="activeType = 'param'">
              参数装饰器
            </button>
            <button :class="{ active: activeType === 'accessor' }" @click="activeType = 'accessor'">
              访问器装饰器
            </button>
          </div>

          <div class="type-content">
            <div v-if="activeType === 'class'" class="type-detail">
              <h4>类装饰器</h4>
              <p>应用于类构造函数，用于观察、修改或替换类定义。</p>

              <div class="code-block">
                <pre><code>// 类装饰器示例 - 添加元数据
function sealed(constructor: Function) {
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
}

// 类装饰器示例 - 修改类行为
function withLogging&lt;T extends new (...args: any[]) => any>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log(`实例化 ${constructor.name} 类`);
    }
  };
}

@withLogging
class Calculator {
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator(); // 输出: 实例化 Calculator 类</code></pre>
              </div>
            </div>

            <div v-if="activeType === 'method'" class="type-detail">
              <h4>方法装饰器</h4>
              <p>应用于类的方法，用于修改或替换方法定义。</p>

              <div class="code-block">
                <pre><code>// 方法装饰器示例 - 日志记录
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`调用方法: ${key}，参数: ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`方法结果: ${result}`);
    return result;
  };

  return descriptor;
}

class MathOperations {
  @log
  add(a: number, b: number): number {
    return a + b;
  }

  @log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const math = new MathOperations();
math.add(2, 3);
// 输出: 调用方法: add，参数: [2,3]
// 输出: 方法结果: 5</code></pre>
              </div>
            </div>

            <div v-if="activeType === 'property'" class="type-detail">
              <h4>属性装饰器</h4>
              <p>应用于类的属性声明，用于观察或修改属性行为。</p>

              <div class="code-block">
                <pre><code>// 属性装饰器示例 - 只读属性
function readonly(target: any, key: string) {
  Object.defineProperty(target, key, {
    writable: false
  });
}

// 属性装饰器示例 - 带验证
function validate(min: number, max: number) {
  return function (target: any, key: string) {
    let value = target[key];

    const getter = () => value;
    const setter = (newVal: number) => {
      if (newVal < min || newVal > max) {
        throw new Error(`值必须在 ${min} 和 ${max} 之间`);
      }
      value = newVal;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class User {
  @readonly
  id: string = Math.random().toString(36).substr(2);

  @validate(1, 120)
  age: number;

  constructor(age: number) {
    this.age = age;
  }
}

const user = new User(25);
user.id = "new-id"; // 错误: Cannot assign to read only property
user.age = 150;     // 错误: 值必须在 1 和 120 之间</code></pre>
              </div>
            </div>

            <div v-if="activeType === 'param'" class="type-detail">
              <h4>参数装饰器</h4>
              <p>应用于类构造函数或方法的参数声明，用于添加元数据。</p>

              <div class="code-block">
                <pre><code>// 参数装饰器示例 - 依赖注入标记
function inject(token: string) {
  return function (target: any, key: string | symbol, index: number) {
    const metadata = Reflect.getMetadata("design:paramtypes", target, key) || [];
    metadata[index] = token;
    Reflect.defineMetadata("design:paramtypes", metadata, target, key);
  };
}

// 参数装饰器示例 - 参数验证
function validateParam(min: number, max: number) {
  return function (target: any, key: string, index: number) {
    const metadata = Reflect.getMetadata("validateParams", target, key) || [];
    metadata[index] = { min, max };
    Reflect.defineMetadata("validateParams", metadata, target, key);
  };
}

class ApiService {
  getData(@inject("config") config: any) {
    // 使用注入的配置
  }

  updateUser(
    @validateParam(1, 120) age: number,
    @validateParam(0, 100) score: number
  ) {
    // 参数会自动验证
  }
}</code></pre>
              </div>
            </div>

            <div v-if="activeType === 'accessor'" class="type-detail">
              <h4>访问器装饰器</h4>
              <p>应用于类的访问器声明（getter/setter），用于修改访问器行为。</p>

              <div class="code-block">
                <pre><code>// 访问器装饰器示例 - 缓存
function cache(target: any, key: string, descriptor: PropertyDescriptor) {
  const getter = descriptor.get;
  if (!getter) return;

  const cacheKey = `__cached_${key}`;

  descriptor.get = function () {
    if (this[cacheKey] !== undefined) {
      console.log(`从缓存中获取 ${key}`);
      return this[cacheKey];
    }

    console.log(`计算 ${key}`);
    const value = getter.call(this);
    this[cacheKey] = value;
    return value;
  };
}

// 访问器装饰器示例 - 转换
function uppercase(target: any, key: string, descriptor: PropertyDescriptor) {
  const setter = descriptor.set;
  if (!setter) return;

  descriptor.set = function (value: string) {
    if (typeof value === 'string') {
      value = value.toUpperCase();
    }
    setter.call(this, value);
  };
}

class Product {
  private _name: string = '';

  @uppercase
  set name(value: string) {
    this._name = value;
  }

  get name() {
    return this._name;
  }

  @cache
  get expensiveCalculation() {
    // 模拟耗时计算
    return Math.random() * 100;
  }
}

const p = new Product();
p.name = "test product";
console.log(p.name); // 输出: TEST PRODUCT

console.log(p.expensiveCalculation); // 输出: 计算 expensiveCalculation
console.log(p.expensiveCalculation); // 输出: 从缓存中获取 expensiveCalculation</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="section use-cases">
          <h3>使用场景</h3>
          <div class="case-grid">
            <div class="case-card">
              <div class="case-icon" style="background-color: #FF6B6B;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z" />
                </svg>
              </div>
              <h4>元数据标记</h4>
              <p>添加类型信息、验证规则等元数据，供框架使用</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #4ECDC4;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
                </svg>
              </div>
              <h4>日志记录</h4>
              <p>自动记录方法调用、参数和返回值</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #118AB2;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9v-2h2v2zm0-4H9V7h2v4zm4 4h-2v-2h2v2zm0-4h-2V7h2v4z" />
                </svg>
              </div>
              <h4>依赖注入</h4>
              <p>标记需要注入的依赖项，由框架自动解析</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #FFD166;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <h4>验证与转换</h4>
              <p>自动验证参数或转换属性值</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #9B5DE5;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V10c0-.55.45-1 1-1s1 .45 1 1v1h2V10c0-1.79-1.46-3.27-3.25-3L11 8.25v1.51c1.25.54 2 1.76 2 3.24 0 1.66-1.34 3-3 3s-3-1.34-3-3H8z" />
                </svg>
              </div>
              <h4>性能优化</h4>
              <p>实现缓存、延迟加载等优化策略</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #06D6A0;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>
              <h4>访问控制</h4>
              <p>实现权限检查、只读属性等访问控制</p>
            </div>
          </div>
        </div>

        <div class="section pros-cons">
          <h3>优缺点分析</h3>
          <div class="comparison">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li><strong>声明式编程</strong>：提高代码可读性和可维护性</li>
                <li><strong>关注点分离</strong>：将横切关注点与业务逻辑分离</li>
                <li><strong>代码复用</strong>：通用功能封装为装饰器，多处复用</li>
                <li><strong>元编程能力</strong>：提供强大的元编程能力</li>
                <li><strong>框架友好</strong>：便于框架实现依赖注入、AOP等功能</li>
              </ul>
            </div>

            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li><strong>提案阶段</strong>：尚未成为正式标准，API可能变化</li>
                <li><strong>调试困难</strong>：装饰器可能使调用栈变复杂</li>
                <li><strong>性能开销</strong>：运行时装饰器可能引入额外开销</li>
                <li><strong>理解成本</strong>：增加代码抽象层，提高理解难度</li>
                <li><strong>隐式行为</strong>：装饰器行为可能不够透明</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section best-practices">
          <h3>最佳实践</h3>
          <div class="practices-grid">
            <div class="practice-card">
              <div class="practice-number">1</div>
              <h4>保持装饰器简单</h4>
              <p>装饰器应专注于单一职责，避免复杂逻辑</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">2</div>
              <h4>使用描述性名称</h4>
              <p>命名应清晰表达装饰器的功能</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">3</div>
              <h4>文档化装饰器</h4>
              <p>为自定义装饰器编写详细文档</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">4</div>
              <h4>避免副作用</h4>
              <p>装饰器应避免产生意外的副作用</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">5</div>
              <h4>谨慎使用参数装饰器</h4>
              <p>参数装饰器功能有限，主要用于元数据</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">6</div>
              <h4>测试装饰器行为</h4>
              <p>确保装饰器在不同场景下行为正确</p>
            </div>
          </div>
        </div>

        <div class="section frameworks">
          <h3>框架中的装饰器应用</h3>
          <div class="framework-grid">
            <div class="framework-card">
              <div class="framework-logo" style="background-color: #c3002f;">
                <span>NG</span>
              </div>
              <div class="framework-info">
                <h4>Angular</h4>
                <p>广泛使用装饰器定义组件、服务、指令等</p>
                <div class="framework-example">
                  <pre><code>@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @Input() title: string;
  @Output() clicked = new EventEmitter();
}</code></pre>
                </div>
              </div>
            </div>

            <div class="framework-card">
              <div class="framework-logo" style="background-color: #42b883;">
                <span>VU</span>
              </div>
              <div class="framework-info">
                <h4>Vue Class Component</h4>
                <p>使用装饰器定义Vue组件</p>
                <div class="framework-example">
                  <pre><code>import { Component, Vue } from 'vue-class-component';

@Component
export default class HelloWorld extends Vue {
  message: string = 'Hello!';

  @Emit()
  sayHello() {
    return this.message;
  }
}</code></pre>
                </div>
              </div>
            </div>

            <div class="framework-card">
              <div class="framework-logo" style="background-color: #000000;">
                <span>TS</span>
              </div>
              <div class="framework-info">
                <h4>TypeScript</h4>
                <p>支持实验性装饰器语法</p>
                <div class="framework-example">
                  <pre><code>// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}</code></pre>
                </div>
              </div>
            </div>

            <div class="framework-card">
              <div class="framework-logo" style="background-color: #764abc;">
                <span>RX</span>
              </div>
              <div class="framework-info">
                <h4>NestJS</h4>
                <p>大量使用装饰器定义控制器、提供者等</p>
                <div class="framework-example">
                  <pre><code>@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>ECMAScript提案 | 装饰器 | 元编程 © 2023</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeType = ref<'class' | 'method' | 'property' | 'param' | 'accessor'>('method');
</script>

<style scoped lang="less">
//@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Source+Code+Pro:wght@400;500&display=swap');

.decorator-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
      font-size: 1.2rem;
      color: #4b5563;
      margin-top: 0;
      font-weight: 500;
    }
  }

  .pattern-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;

    .card-header {
      background: linear-gradient(135deg, #9c27b0 0%, #673ab7 100%);
      color: white;
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;

      .pattern-icon {
        width: 70px;
        height: 70px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.5rem;

        svg {
          width: 40px;
          height: 40px;
        }
      }

      .pattern-info {
        flex-grow: 1;

        h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.8rem;
        }
      }

      .pattern-tags {
        display: flex;
        gap: 0.8rem;

        .tag {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
    }

    .card-content {
      padding: 2rem;

      .section {
        margin-bottom: 2.5rem;

        h3 {
          color: #673ab7;
          border-bottom: 2px solid #9c27b0;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          display: flex;
          align-items: center;

          &::before {
            content: "";
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #9c27b0;
            border-radius: 50%;
            margin-right: 10px;
          }
        }

        p,
        li {
          line-height: 1.7;
          color: #4b5563;
          font-size: 1.05rem;
        }

        li {
          margin-bottom: 0.8rem;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: "•";
            color: #673ab7;
            position: absolute;
            left: 0;
            font-weight: bold;
          }
        }
      }

      .concept-diagram {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem 0;
        padding: 2rem;
        background: #f3f4f6;
        border-radius: 8px;
        font-weight: 500;
        position: relative;

        .decorator {
          background: #673ab7;
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          font-weight: bold;
          font-size: 1.1rem;
          box-shadow: 0 4px 6px rgba(103, 58, 183, 0.2);
        }

        .arrow {
          color: #9c27b0;
          font-weight: bold;
          font-size: 1.5rem;
          margin: 1rem 0;
        }

        .target {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;

          >div {
            padding: 1rem;
            border-radius: 6px;
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            min-width: 100px;
            text-align: center;
            border: 1px solid #e5e7eb;
            transition: all 0.3s;

            &:hover {
              transform: translateY(-3px);
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
          }

          .class {
            border-top: 3px solid #ff6b6b;
          }

          .method {
            border-top: 3px solid #4ecdc4;
          }

          .property {
            border-top: 3px solid #ffd166;
          }

          .parameter {
            border-top: 3px solid #06d6a0;
          }

          .accessor {
            border-top: 3px solid #9b5de5;
          }
        }
      }

      .type-tabs {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #e5e7eb;

        button {
          padding: 0.8rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: #6b7280;
          position: relative;
          transition: all 0.3s;

          &:hover {
            color: #673ab7;
          }

          &.active {
            color: #673ab7;
            font-weight: 600;

            &::after {
              content: "";
              position: absolute;
              bottom: -1px;
              left: 0;
              right: 0;
              height: 3px;
              background: #673ab7;
              border-radius: 3px 3px 0 0;
            }
          }
        }
      }

      .type-detail {
        h4 {
          margin-top: 0;
          color: #512da8;
          font-size: 1.3rem;
        }

        p {
          margin-bottom: 1.5rem;
        }
      }

      .code-block {
        background: #1e293b;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        margin: 1.5rem 0;

        pre {
          margin: 0;
          padding: 1.5rem;
          overflow-x: auto;

          code {
            font-family: 'Source Code Pro', monospace;
            font-size: 0.95rem;
            color: #e2e8f0;
            line-height: 1.6;
          }
        }
      }

      .case-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .case-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            border-color: #673ab7;
          }

          .case-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;

            svg {
              width: 24px;
              height: 24px;
            }
          }

          h4 {
            margin: 0 0 0.8rem 0;
            font-size: 1.2rem;
            color: #1e293b;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: #4b5563;
            line-height: 1.6;
          }
        }
      }

      .pros-cons {
        .comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }

          .pros,
          .cons {
            padding: 1.5rem;
            border-radius: 8px;

            h4 {
              margin-top: 0;
              padding-bottom: 0.5rem;
              border-bottom: 2px solid;
            }
          }

          .pros {
            background: rgba(76, 175, 80, 0.05);
            border: 1px solid rgba(76, 175, 80, 0.2);

            h4 {
              color: #2e7d32;
              border-color: #2e7d32;
            }
          }

          .cons {
            background: rgba(244, 67, 54, 0.05);
            border: 1px solid rgba(244, 67, 54, 0.2);

            h4 {
              color: #c62828;
              border-color: #c62828;
            }
          }
        }
      }

      .practices-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .practice-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          position: relative;
          overflow: hidden;

          .practice-number {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            width: 30px;
            height: 30px;
            background: #e1bee7;
            color: #6a1b9a;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.1rem;
          }

          h4 {
            margin: 0.5rem 0 0.8rem 0;
            color: #4527a0;
            font-size: 1.15rem;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: #4b5563;
            line-height: 1.6;
          }
        }
      }

      .framework-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
        gap: 1.5rem;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }

        .framework-card {
          display: flex;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;

          .framework-logo {
            width: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.5rem;
            flex-shrink: 0;
          }

          .framework-info {
            padding: 1.2rem;
            flex-grow: 1;

            h4 {
              margin: 0 0 0.5rem 0;
              color: #1e293b;
            }

            p {
              margin: 0 0 1rem 0;
              color: #4b5563;
              font-size: 0.95rem;
            }

            .framework-example {
              background: #f3f4f6;
              border-radius: 6px;
              padding: 0.8rem;
              overflow-x: auto;

              pre {
                margin: 0;
                font-family: 'Source Code Pro', monospace;
                font-size: 0.85rem;
                color: #374151;
                line-height: 1.4;
              }
            }
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    color: #6b7280;
    font-size: 0.9rem;
    padding: 1.5rem;
  }
}
</style>