<template>
  <div class="factory-container">
    <div class="header">
      <h1>工厂模式基础介绍</h1>
      <p class="subtitle">创建对象的封装艺术 - 将对象创建与使用分离</p>
    </div>

    <div class="pattern-card">
      <div class="card-header">
        <div class="pattern-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.61-.55 1-1.37 1-2.22v-2c0-.85-.39-1.67-1-2.22z" />
            <circle cx="9" cy="13" r="1" />
            <circle cx="15" cy="13" r="1" />
            <path
              d="M18 11.03A6.04 6.04 0 0 0 12.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.075 8.075 0 0 0 4.86-5.89c1.31 2.63 4 4.44 7.12 4.47z" />
          </svg>
        </div>
        <div class="pattern-info">
          <h2>工厂模式 (Factory Pattern)</h2>
          <div class="pattern-tags">
            <span class="tag">创建型模式</span>
            <span class="tag">对象创建</span>
            <span class="tag">解耦</span>
          </div>
        </div>
      </div>

      <div class="card-content">
        <div class="section concept">
          <h3>概念定义</h3>
          <p>
            工厂模式是一种创建型设计模式，它提供了一种创建对象的接口，但将具体创建逻辑封装在子类或特定方法中。
            核心思想是<strong>将对象的创建与使用分离</strong>，使代码更灵活、可扩展，并降低耦合度。
          </p>
          <div class="concept-diagram">
            <div class="client">客户端</div>
            <div class="arrow">→</div>
            <div class="factory">工厂接口<br><code>createProduct()</code></div>
            <div class="arrows">
              <div class="arrow-down">↓</div>
              <div class="factory-types">
                <div class="factory-type">工厂实现A</div>
                <div class="factory-type">工厂实现B</div>
                <div class="factory-type">工厂实现C</div>
              </div>
              <div class="arrow-down">↓</div>
            </div>
            <div class="products">
              <div class="product">产品A</div>
              <div class="product">产品B</div>
              <div class="product">产品C</div>
            </div>
          </div>
        </div>

        <div class="section types">
          <h3>工厂模式的三种形式</h3>
          <div class="type-tabs">
            <button :class="{ active: activeType === 'simple' }" @click="activeType = 'simple'">
              简单工厂
            </button>
            <button :class="{ active: activeType === 'method' }" @click="activeType = 'method'">
              工厂方法
            </button>
            <button :class="{ active: activeType === 'abstract' }" @click="activeType = 'abstract'">
              抽象工厂
            </button>
          </div>

          <div class="type-content">
            <div v-if="activeType === 'simple'" class="type-detail">
              <h4>简单工厂模式</h4>
              <p>通过一个工厂类根据传入的参数决定创建哪种产品实例。</p>

              <div class="code-block">
                <pre><code>// 产品接口
interface Product {
  operation(): string;
}

// 具体产品A
class ConcreteProductA implements Product {
  operation(): string {
    return '产品A的操作';
  }
}

// 具体产品B
class ConcreteProductB implements Product {
  operation(): string {
    return '产品B的操作';
  }
}

// 简单工厂
class SimpleFactory {
  createProduct(type: string): Product {
    switch (type) {
      case 'A':
        return new ConcreteProductA();
      case 'B':
        return new ConcreteProductB();
      default:
        throw new Error('未知产品类型');
    }
  }
}

// 使用示例
const factory = new SimpleFactory();
const productA = factory.createProduct('A');
console.log(productA.operation()); // 输出: 产品A的操作</code></pre>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <h5>优点</h5>
                  <ul>
                    <li>实现简单，易于理解</li>
                    <li>客户端与具体产品类解耦</li>
                    <li>集中管理对象创建逻辑</li>
                  </ul>
                </div>
                <div class="cons">
                  <h5>缺点</h5>
                  <ul>
                    <li>违反开闭原则（新增产品需修改工厂类）</li>
                    <li>工厂类职责过重</li>
                    <li>不易扩展复杂的产品族</li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-if="activeType === 'method'" class="type-detail">
              <h4>工厂方法模式</h4>
              <p>定义一个创建对象的接口，但让子类决定实例化哪个类。工厂方法使类的实例化延迟到子类。</p>

              <div class="code-block">
                <pre><code>// 产品接口
interface Product {
  operation(): string;
}

// 具体产品A
class ConcreteProductA implements Product {
  operation(): string {
    return '产品A的操作';
  }
}

// 具体产品B
class ConcreteProductB implements Product {
  operation(): string {
    return '产品B的操作';
  }
}

// 工厂接口
interface Factory {
  createProduct(): Product;
}

// 具体工厂A
class ConcreteFactoryA implements Factory {
  createProduct(): Product {
    return new ConcreteProductA();
  }
}

// 具体工厂B
class ConcreteFactoryB implements Factory {
  createProduct(): Product {
    return new ConcreteProductB();
  }
}

// 使用示例
const factoryA: Factory = new ConcreteFactoryA();
const productA = factoryA.createProduct();
console.log(productA.operation()); // 输出: 产品A的操作

const factoryB: Factory = new ConcreteFactoryB();
const productB = factoryB.createProduct();
console.log(productB.operation()); // 输出: 产品B的操作</code></pre>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <h5>优点</h5>
                  <ul>
                    <li>符合开闭原则（易于扩展新产品）</li>
                    <li>客户端只需关心工厂接口</li>
                    <li>良好的扩展性和灵活性</li>
                    <li>支持多态性</li>
                  </ul>
                </div>
                <div class="cons">
                  <h5>缺点</h5>
                  <ul>
                    <li>增加系统复杂度（需创建更多类）</li>
                    <li>增加了抽象层理解难度</li>
                    <li>需要额外开发工厂类</li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-if="activeType === 'abstract'" class="type-detail">
              <h4>抽象工厂模式</h4>
              <p>提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。</p>

              <div class="code-block">
                <pre><code>// 抽象产品A
interface AbstractProductA {
  operationA(): string;
}

// 抽象产品B
interface AbstractProductB {
  operationB(): string;
}

// 具体产品A1
class ConcreteProductA1 implements AbstractProductA {
  operationA(): string {
    return '产品A1的操作';
  }
}

// 具体产品A2
class ConcreteProductA2 implements AbstractProductA {
  operationA(): string {
    return '产品A2的操作';
  }
}

// 具体产品B1
class ConcreteProductB1 implements AbstractProductB {
  operationB(): string {
    return '产品B1的操作';
  }
}

// 具体产品B2
class ConcreteProductB2 implements AbstractProductB {
  operationB(): string {
    return '产品B2的操作';
  }
}

// 抽象工厂接口
interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

// 具体工厂1
class ConcreteFactory1 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

// 具体工厂2
class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

// 使用示例
const factory1: AbstractFactory = new ConcreteFactory1();
const productA1 = factory1.createProductA();
const productB1 = factory1.createProductB();

console.log(productA1.operationA()); // 输出: 产品A1的操作
console.log(productB1.operationB()); // 输出: 产品B1的操作</code></pre>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <h5>优点</h5>
                  <ul>
                    <li>确保产品兼容性（同一工厂创建的产品相互匹配）</li>
                    <li>支持产品族创建</li>
                    <li>符合开闭原则（易于扩展产品系列）</li>
                    <li>客户端与具体类解耦</li>
                  </ul>
                </div>
                <div class="cons">
                  <h5>缺点</h5>
                  <ul>
                    <li>系统复杂度高（需定义大量接口和类）</li>
                    <li>扩展新产品困难（需要修改抽象工厂接口）</li>
                    <li>学习曲线较陡峭</li>
                    <li>过度设计风险</li>
                  </ul>
                </div>
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
                    d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
                </svg>
              </div>
              <h4>UI组件库</h4>
              <p>根据主题创建不同风格的按钮、输入框等UI组件</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #4ECDC4;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
                </svg>
              </div>
              <h4>日志系统</h4>
              <p>根据环境创建文件日志器、控制台日志器或网络日志器</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #118AB2;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9v-2h2v2zm0-4H9V7h2v4zm4 4h-2v-2h2v2zm0-4h-2V7h2v4z" />
                </svg>
              </div>
              <h4>数据库访问</h4>
              <p>创建MySQL、PostgreSQL或MongoDB等不同数据库的连接对象</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #FFD166;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <h4>支付网关</h4>
              <p>根据支付方式创建支付宝、微信支付、信用卡等支付处理器</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #9B5DE5;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V10c0-.55.45-1 1-1s1 .45 1 1v1h2V10c0-1.79-1.46-3.27-3.25-3L11 8.25v1.51c1.25.54 2 1.76 2 3.24 0 1.66-1.34 3-3 3s-3-1.34-3-3H8z" />
                </svg>
              </div>
              <h4>文件解析器</h4>
              <p>根据文件类型创建CSV、JSON、XML等不同格式的解析器</p>
            </div>

            <div class="case-card">
              <div class="case-icon" style="background-color: #06D6A0;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                  <path
                    d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>
              <h4>跨平台应用</h4>
              <p>为不同操作系统创建适配的UI组件或系统接口</p>
            </div>
          </div>
        </div>

        <div class="section comparison">
          <h3>工厂模式对比</h3>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>模式类型</th>
                  <th>适用场景</th>
                  <th>复杂度</th>
                  <th>扩展性</th>
                  <th>灵活性</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>简单工厂</td>
                  <td>产品类型固定，变化少</td>
                  <td>低</td>
                  <td>低（违反开闭原则）</td>
                  <td>低</td>
                </tr>
                <tr>
                  <td>工厂方法</td>
                  <td>单一产品系列，需扩展新产品</td>
                  <td>中</td>
                  <td>高（支持新产品）</td>
                  <td>高</td>
                </tr>
                <tr>
                  <td>抽象工厂</td>
                  <td>多产品族，需保证产品兼容性</td>
                  <td>高</td>
                  <td>中（支持新产品族）</td>
                  <td>高</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="section best-practices">
          <h3>最佳实践</h3>
          <div class="practices-grid">
            <div class="practice-card">
              <div class="practice-number">1</div>
              <h4>遵循开闭原则</h4>
              <p>优先使用工厂方法模式，通过扩展而非修改来增加新产品</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">2</div>
              <h4>避免过度设计</h4>
              <p>对于简单场景，简单工厂可能比抽象工厂更合适</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">3</div>
              <h4>结合依赖注入</h4>
              <p>使用DI容器管理工厂，提高可测试性和灵活性</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">4</div>
              <h4>命名规范</h4>
              <p>使用"Factory"后缀，如PaymentFactory、LoggerFactory</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">5</div>
              <h4>产品兼容性</h4>
              <p>当产品需要协同工作时，使用抽象工厂确保兼容</p>
            </div>
            <div class="practice-card">
              <div class="practice-number">6</div>
              <h4>避免静态工厂</h4>
              <p>除非必要，避免使用静态方法创建对象，以支持多态和测试</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>设计模式 | 创建型模式 | 工厂模式 © 2023</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeType = ref<'simple' | 'method' | 'abstract'>('method');
</script>

<style scoped lang="less">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Source+Code+Pro:wght@400;500&display=swap');

.factory-container {
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
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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
          color: #1d4ed8;
          border-bottom: 2px solid #3b82f6;
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
            background: #3b82f6;
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
            color: #3b82f6;
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
        padding: 1.5rem;
        background: #f3f4f6;
        border-radius: 8px;
        font-weight: 500;
        position: relative;

        .client,
        .factory,
        .factory-type,
        .product {
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          text-align: center;
          margin: 0.5rem 0;
          border: 1px solid #e5e7eb;
        }

        .factory {
          border: 2px solid #3b82f6;
          background: #dbeafe;
        }

        .product {
          background: #d1fae5;
          border-color: #10b981;
        }

        .arrow,
        .arrow-down {
          color: #3b82f6;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .arrow {
          margin: 0 1rem;
        }

        .arrow-down {
          margin: 0.5rem 0;
        }

        .factory-types,
        .products {
          display: flex;
          gap: 1.5rem;
          margin: 0.5rem 0;
        }
      }

      .type-tabs {
        display: flex;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #e5e7eb;

        button {
          padding: 0.8rem 1.8rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: #6b7280;
          position: relative;
          transition: all 0.3s;

          &:hover {
            color: #3b82f6;
          }

          &.active {
            color: #3b82f6;
            font-weight: 600;

            &::after {
              content: "";
              position: absolute;
              bottom: -1px;
              left: 0;
              right: 0;
              height: 3px;
              background: #3b82f6;
              border-radius: 3px 3px 0 0;
            }
          }
        }
      }

      .type-detail {
        h4 {
          margin-top: 0;
          color: #1e40af;
          font-size: 1.3rem;
        }

        p {
          margin-bottom: 1.5rem;
        }

        .pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1.5rem;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }

          .pros,
          .cons {
            padding: 1.2rem;
            border-radius: 8px;

            h5 {
              margin-top: 0;
              margin-bottom: 0.8rem;
              font-size: 1.1rem;
            }
          }

          .pros {
            background: #eff6ff;
            border: 1px solid #dbeafe;

            h5 {
              color: #1e40af;
            }
          }

          .cons {
            background: #fef2f2;
            border: 1px solid #fee2e2;

            h5 {
              color: #b91c1c;
            }
          }
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
            border-color: #3b82f6;
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

      .comparison-table {
        overflow-x: auto;
        margin: 1.5rem 0;

        table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

          th,
          td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
          }

          thead {
            background: #3b82f6;
            color: white;

            th {
              font-weight: 600;
            }
          }

          tbody {
            tr {
              &:nth-child(even) {
                background: #f9fafb;
              }

              &:hover {
                background: #eff6ff;
              }
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
            background: #dbeafe;
            color: #3b82f6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.1rem;
          }

          h4 {
            margin: 0.5rem 0 0.8rem 0;
            color: #1e40af;
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
