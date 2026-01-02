<template>
  <div class="factory-pattern-container">
    <div class="pattern-header">
      <h1>工厂模式实现详解</h1>
      <p class="subtitle">创建型设计模式：解耦对象创建与使用</p>
      <div class="pattern-meta">
        <span class="meta-item"> <i class="icon icon-code"></i> TypeScript 实现 </span>
        <span class="meta-item"> <i class="icon icon-structure"></i> 创建型模式 </span>
        <span class="meta-item"> <i class="icon icon-dependency"></i> 低耦合 </span>
      </div>
    </div>

    <div class="content-grid">
      <!-- 模式介绍 -->
      <div class="pattern-intro card">
        <h2 class="section-title"><i class="icon icon-info"></i> 模式介绍</h2>
        <div class="intro-content">
          <p>
            工厂模式是一种<b>创建型设计模式</b>，它提供了一种创建对象的最佳方式。在工厂模式中，我们创建对象时不会对客户端暴露创建逻辑，而是通过使用一个共同的接口来指向新创建的对象。
          </p>

          <div class="pattern-benefits">
            <h3>核心优势：</h3>
            <ul>
              <li><i class="icon icon-check"></i> 解耦对象创建与使用</li>
              <li><i class="icon icon-check"></i> 提高代码可维护性和扩展性</li>
              <li><i class="icon icon-check"></i> 符合开闭原则（对扩展开放，对修改关闭）</li>
              <li><i class="icon icon-check"></i> 简化复杂对象的创建过程</li>
            </ul>
          </div>

          <div class="pattern-diagram">
            <div class="diagram-title">工厂模式结构</div>
            <div class="diagram-content">
              <div class="diagram-row creator">
                <div class="node">Creator</div>
                <div class="arrow">--&gt;</div>
                <div class="node">工厂方法()</div>
              </div>
              <div class="diagram-row products">
                <div class="node">ConcreteCreatorA</div>
                <div class="node">ConcreteCreatorB</div>
              </div>
              <div class="diagram-row interface">
                <div class="node">Product</div>
              </div>
              <div class="diagram-row implementations">
                <div class="node">ConcreteProductA</div>
                <div class="node">ConcreteProductB</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实现思路 -->
      <div class="implementation card">
        <h2 class="section-title"><i class="icon icon-lightbulb"></i> 实现思路</h2>
        <div class="implementation-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>定义产品接口</h3>
              <p>创建一个抽象类或接口，定义所有产品必须实现的方法</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>创建具体产品类</h3>
              <p>实现具体产品类，这些类将实现产品接口</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>创建工厂类</h3>
              <p>定义一个创建对象的工厂方法，根据输入参数返回不同的产品实例</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>使用工厂创建对象</h3>
              <p>客户端通过工厂类获取产品实例，而无需直接实例化具体类</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 实现代码 -->
      <div class="code-example card">
        <h2 class="section-title"><i class="icon icon-code"></i> 实现代码</h2>

        <div class="code-section">
          <h3>1. 定义产品接口</h3>
          <pre><code>// 产品接口
interface Product {
  operation(): string;
}</code></pre>
        </div>

        <div class="code-section">
          <h3>2. 创建具体产品类</h3>
          <pre><code>// 具体产品A
class ConcreteProductA implements Product {
  operation(): string {
    return 'ConcreteProductA operation';
  }
}

// 具体产品B
class ConcreteProductB implements Product {
  operation(): string {
    return 'ConcreteProductB operation';
  }
}</code></pre>
        </div>

        <div class="code-section">
          <h3>3. 创建工厂类</h3>
          <pre><code>// 工厂类
class ProductFactory {
  createProduct(type: string): Product {
    switch (type) {
      case 'A':
        return new ConcreteProductA();
      case 'B':
        return new ConcreteProductB();
      default:
        throw new Error(`Invalid product type: ${type}`);
    }
  }
}</code></pre>
        </div>

        <div class="code-section">
          <h3>4. 使用工厂创建对象</h3>
          <pre><code>// 客户端代码
const factory = new ProductFactory();

// 创建产品A
const productA = factory.createProduct('A');
console.log(productA.operation()); // 输出: ConcreteProductA operation

// 创建产品B
const productB = factory.createProduct('B');
console.log(productB.operation()); // 输出: ConcreteProductB operation</code></pre>
        </div>
      </div>

      <!-- 实际应用 -->
      <div class="real-world card">
        <h2 class="section-title"><i class="icon icon-app"></i> 实际应用示例</h2>

        <div class="application-example">
          <h3>UI组件工厂</h3>
          <p>创建不同类型的UI组件（按钮、输入框、下拉菜单）</p>

          <div class="example-code">
            <pre><code>interface UIComponent {
  render(): void;
}

class Button implements UIComponent {
  render() {
    console.log('渲染按钮组件');
  }
}

class Input implements UIComponent {
  render() {
    console.log('渲染输入框组件');
  }
}

class UIComponentFactory {
  createComponent(type: string): UIComponent {
    switch (type) {
      case 'button': return new Button();
      case 'input': return new Input();
      default: throw new Error('未知组件类型');
    }
  }
}

// 使用
const factory = new UIComponentFactory();
const button = factory.createComponent('button');
button.render(); // 输出: 渲染按钮组件</code></pre>
          </div>
        </div>
      </div>

      <!-- 优缺点分析 -->
      <div class="pros-cons card">
        <h2 class="section-title"><i class="icon icon-scale"></i> 模式优缺点</h2>

        <div class="analysis-grid">
          <div class="pros">
            <h3><i class="icon icon-thumbs-up"></i> 优点</h3>
            <ul>
              <li>避免创建者和具体产品之间的紧密耦合</li>
              <li>单一职责原则：将产品创建代码集中在一个位置</li>
              <li>开闭原则：无需更改现有代码即可添加新产品类型</li>
              <li>代码可维护性和可读性更好</li>
            </ul>
          </div>

          <div class="cons">
            <h3><i class="icon icon-thumbs-down"></i> 缺点</h3>
            <ul>
              <li>引入额外的抽象层可能增加代码复杂度</li>
              <li>需要创建大量子类，可能增加代码量</li>
              <li>对于简单对象创建可能显得冗余</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="pattern-summary card">
      <h2 class="section-title"><i class="icon icon-summary"></i> 模式总结</h2>
      <div class="summary-content">
        <p>工厂模式是<b>创建型设计模式</b>中最常用的模式之一，特别适用于以下场景：</p>
        <ul>
          <li>当需要创建的对象类型在编码时无法确定，需要在运行时决定时</li>
          <li>当系统需要独立于其产品的创建、组合和表示时</li>
          <li>当需要提供产品的类库，且只暴露接口而不是实现时</li>
          <li>当需要扩展系统功能，添加新产品类型时</li>
        </ul>
        <p>通过使用工厂模式，我们可以实现对象创建与使用的解耦，提高代码的灵活性和可维护性。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里实际实现了工厂模式的代码
interface Product {
  operation(): string
}

class ConcreteProductA implements Product {
  operation(): string {
    return 'ConcreteProductA operation'
  }
}

class ConcreteProductB implements Product {
  operation(): string {
    return 'ConcreteProductB operation'
  }
}

class ProductFactory {
  createProduct(type: string): Product {
    switch (type) {
      case 'A':
        return new ConcreteProductA()
      case 'B':
        return new ConcreteProductB()
      default:
        throw new Error(`Invalid product type: ${type}`)
    }
  }
}

// 示例用法
const factory = new ProductFactory()
const productA = factory.createProduct('A')
console.log(productA.operation()) // 输出: ConcreteProductA operation

const productB = factory.createProduct('B')
console.log(productB.operation()) // 输出: ConcreteProductB operation
</script>

<style lang="less" scoped>
.factory-pattern-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #333;
  background-color: #f9fafb;
  min-height: 100vh;

  .pattern-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 2rem;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);

    h1 {
      font-weight: 700;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-top: 0;
    }

    .pattern-meta {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 1.2rem;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.15);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;

        .icon {
          font-size: 1rem;
        }
      }
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
    margin-bottom: 2rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
  }

  .section-title {
    background: #f8f9fa;
    margin: 0;
    padding: 1.2rem 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    .icon {
      font-size: 1.2rem;
      color: #4a6cf7;
    }
  }

  .pattern-intro {
    grid-column: 1 / -1;

    .intro-content {
      padding: 1.5rem;

      p {
        line-height: 1.7;
        font-size: 1.05rem;
        margin-bottom: 1.5rem;

        b {
          color: #4a6cf7;
          font-weight: 600;
        }
      }
    }

    .pattern-benefits {
      background: #f0f7ff;
      border-left: 4px solid #4a6cf7;
      padding: 1rem 1.5rem;
      border-radius: 0 8px 8px 0;
      margin: 1.5rem 0;

      h3 {
        margin-top: 0;
        font-size: 1.1rem;
        color: #2c3e50;
      }

      ul {
        padding-left: 1.5rem;
        margin: 0.8rem 0;

        li {
          margin-bottom: 0.7rem;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;

          .icon {
            color: #4a6cf7;
            font-size: 1rem;
            margin-top: 0.2rem;
          }
        }
      }
    }

    .pattern-diagram {
      margin-top: 2rem;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;
      border: 1px solid #eaeaea;

      .diagram-title {
        font-weight: 600;
        margin-bottom: 1rem;
        color: #4a6cf7;
      }

      .diagram-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        .diagram-row {
          display: flex;
          justify-content: center;
          gap: 1.5rem;

          &.creator {
            .node {
              background: #e3f2fd;
              border: 1px solid #90caf9;
            }
          }

          &.products {
            .node {
              background: #e8f5e9;
              border: 1px solid #a5d6a7;
            }
          }

          &.interface {
            .node {
              background: #fff3e0;
              border: 1px solid #ffcc80;
            }
          }

          &.implementations {
            .node {
              background: #f3e5f5;
              border: 1px solid #ce93d8;
            }
          }

          .node {
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            min-width: 180px;
            text-align: center;
          }

          .arrow {
            display: flex;
            align-items: center;
            font-size: 1.2rem;
            color: #777;
          }
        }
      }
    }
  }

  .implementation {
    .implementation-steps {
      padding: 1.5rem;

      .step {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px dashed #eaeaea;

        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
          background: #4a6cf7;
          color: white;
          border-radius: 50%;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .step-content {
          h3 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
            color: #2c3e50;
          }

          p {
            margin: 0;
            color: #555;
            line-height: 1.6;
          }
        }
      }
    }
  }

  .code-example {
    .code-section {
      padding: 1.2rem 1.5rem;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.05rem;
        color: #4a6cf7;
      }

      pre {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.2rem;
        overflow-x: auto;
        margin: 0.8rem 0;
        border: 1px solid #eaeaea;

        code {
          font-family: 'Fira Code', 'SFMono-Regular', Consolas, monospace;
          font-size: 0.95rem;
          line-height: 1.5;
          color: #2d3748;
        }
      }
    }
  }

  .real-world {
    .application-example {
      padding: 1.5rem;

      h3 {
        margin-top: 0;
        color: #2c3e50;
      }

      p {
        color: #555;
        margin-bottom: 1.2rem;
      }

      .example-code {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.2rem;
        border: 1px solid #eaeaea;

        pre {
          margin: 0;

          code {
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  .pros-cons {
    .analysis-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      padding: 1.5rem;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }

      .pros,
      .cons {
        padding: 1.2rem;
        border-radius: 8px;

        h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0;
          font-size: 1.1rem;

          .icon {
            font-size: 1.2rem;
          }
        }

        ul {
          padding-left: 1.5rem;
          margin: 0.8rem 0 0;

          li {
            margin-bottom: 0.7rem;
            line-height: 1.5;
          }
        }
      }

      .pros {
        background: #f0f9eb;
        border: 1px solid #e1f3d8;

        h3 {
          color: #67c23a;
        }
      }

      .cons {
        background: #fef0f0;
        border: 1px solid #fcd3d3;

        h3 {
          color: #f56c6c;
        }
      }
    }
  }

  .pattern-summary {
    grid-column: 1 / -1;

    .summary-content {
      padding: 1.5rem;

      p {
        line-height: 1.7;
        font-size: 1.05rem;
      }

      ul {
        padding-left: 1.5rem;
        margin: 1rem 0;

        li {
          margin-bottom: 0.7rem;
          position: relative;
          padding-left: 1.5rem;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #4a6cf7;
            font-weight: bold;
          }
        }
      }
    }
  }
}

// 图标样式
.icon {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  &-code::before {
    content: 'code';
  }
  &-structure::before {
    content: 'device_hub';
  }
  &-dependency::before {
    content: 'link';
  }
  &-info::before {
    content: 'info';
  }
  &-lightbulb::before {
    content: 'lightbulb';
  }
  &-app::before {
    content: 'apps';
  }
  &-scale::before {
    content: 'balance';
  }
  &-thumbs-up::before {
    content: 'thumb_up';
  }
  &-thumbs-down::before {
    content: 'thumb_down';
  }
  &-summary::before {
    content: 'summarize';
  }
  &-check::before {
    content: 'check';
  }
}
</style>
