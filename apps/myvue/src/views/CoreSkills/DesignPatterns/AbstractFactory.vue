<template>
  <div class="abstract-factory-container">
    <header class="header">
      <h1>抽象工厂模式基本介绍</h1>
      <p class="subtitle">创建相关对象家族的优雅解决方案</p>
    </header>

    <div class="content-wrapper">
      <div class="pattern-overview">
        <div class="overview-card">
          <h2 class="section-title">概念解析</h2>
          <div class="concept">
            <div class="concept-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5H4ZM1 6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V6ZM7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9H17C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7H7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM7 15C6.44772 15 6 15.4477 6 16C6 16.5523 6.44772 17 7 17H13C13.5523 17 14 16.5523 14 16C14 15.4477 13.5523 15 13 15H7Z" />
              </svg>
            </div>
            <div class="concept-text">
              <p><strong>抽象工厂模式</strong>是一种创建型设计模式，它能创建一系列<strong>相关或相互依赖的对象</strong>，而无需指定其具体类。</p>
              <p>该模式提供了一个接口用于创建相关对象的家族，而不需要明确指定具体类。</p>
            </div>
          </div>

          <div class="analogy">
            <h3>现实世界类比</h3>
            <p>想象一家家具工厂，它生产<strong>成套的现代风格或古典风格家具</strong>。工厂提供统一的接口生产椅子、沙发和茶几，但根据选择的风格系列，会生产出风格一致但具体实现不同的产品。</p>
          </div>
        </div>

        <div class="diagram-card">
          <h2 class="section-title">模式结构</h2>
          <div class="uml-diagram">
            <div class="uml-class abstract-factory">
              <div class="class-name">AbstractFactory</div>
              <div class="methods">
                +createProductA(): AbstractProductA<br>
                +createProductB(): AbstractProductB
              </div>
            </div>

            <div class="uml-arrow">▲<br>继承</div>

            <div class="factory-row">
              <div class="uml-class concrete-factory">
                <div class="class-name">ConcreteFactory1</div>
                <div class="methods">
                  +createProductA(): ProductA1<br>
                  +createProductB(): ProductB1
                </div>
              </div>

              <div class="uml-class concrete-factory">
                <div class="class-name">ConcreteFactory2</div>
                <div class="methods">
                  +createProductA(): ProductA2<br>
                  +createProductB(): ProductB2
                </div>
              </div>
            </div>

            <div class="product-row">
              <div class="uml-class abstract-product">
                <div class="class-name">AbstractProductA</div>
              </div>

              <div class="uml-class abstract-product">
                <div class="class-name">AbstractProductB</div>
              </div>
            </div>

            <div class="uml-arrow">▲<br>继承</div>

            <div class="product-row">
              <div class="uml-class concrete-product">
                <div class="class-name">ProductA1</div>
              </div>

              <div class="uml-class concrete-product">
                <div class="class-name">ProductB1</div>
              </div>
            </div>

            <div class="product-row">
              <div class="uml-class concrete-product">
                <div class="class-name">ProductA2</div>
              </div>

              <div class="uml-class concrete-product">
                <div class="class-name">ProductB2</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pattern-details">
        <div class="design-principles">
          <h2 class="section-title">设计思想</h2>
          <ul class="principles-list">
            <li>
              <div class="principle-icon">🔒</div>
              <div>
                <h3>封装对象创建</h3>
                <p>将对象创建过程封装在工厂中，客户端代码只需与抽象接口交互</p>
              </div>
            </li>
            <li>
              <div class="principle-icon">🌐</div>
              <div>
                <h3>确保产品兼容性</h3>
                <p>一个具体工厂生产的所有对象属于同一家族，保证它们能协同工作</p>
              </div>
            </li>
            <li>
              <div class="principle-icon">🧩</div>
              <div>
                <h3>可扩展性</h3>
                <p>添加新的产品家族时，只需添加新的具体工厂，无需修改现有代码</p>
              </div>
            </li>
            <li>
              <div class="principle-icon">💡</div>
              <div>
                <h3>单一职责原则</h3>
                <p>产品创建代码集中在单一位置，使代码更易维护</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="code-example">
          <h2 class="section-title">代码示例</h2>
          <div class="example-description">
            <p>以下是一个UI组件库的例子，展示如何为不同主题（亮色/暗色）创建风格一致的UI组件</p>
          </div>
          <pre class="code-block"><code>// 抽象工厂接口
interface UIComponentFactory {
  createButton(): Button;
  createDialog(): Dialog;
}

// 亮色主题工厂
class LightThemeFactory implements UIComponentFactory {
  createButton(): Button {
    return new LightButton();
  }

  createDialog(): Dialog {
    return new LightDialog();
  }
}

// 暗色主题工厂
class DarkThemeFactory implements UIComponentFactory {
  createButton(): Button {
    return new DarkButton();
  }

  createDialog(): Dialog {
    return new DarkDialog();
  }
}

// 客户端代码
function renderUI(factory: UIComponentFactory) {
  const button = factory.createButton();
  const dialog = factory.createDialog();

  button.render();
  dialog.render();
}

// 根据用户设置选择主题
const theme = userPrefersDark ? new DarkThemeFactory() : new LightThemeFactory();
renderUI(theme);</code></pre>
        </div>
      </div>

      <div class="pattern-scenarios">
        <div class="use-cases">
          <h2 class="section-title">适用场景</h2>
          <div class="case-grid">
            <div class="case-card">
              <div class="case-icon">🎨</div>
              <h3>主题化UI系统</h3>
              <p>创建不同主题（如亮色/暗色模式）的UI组件家族，确保组件风格一致</p>
            </div>
            <div class="case-card">
              <div class="case-icon">🌍</div>
              <h3>多平台适配</h3>
              <p>为不同平台（Web、移动端）创建适配的组件实现，保持相同接口</p>
            </div>
            <div class="case-card">
              <div class="case-icon">🧪</div>
              <h3>测试环境隔离</h3>
              <p>生产环境使用真实服务，测试环境使用Mock服务，通过工厂切换</p>
            </div>
            <div class="case-card">
              <div class="case-icon">🧩</div>
              <h3>插件系统</h3>
              <p>为不同插件提供兼容的组件实现，通过抽象工厂管理插件组件</p>
            </div>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h2 class="section-title">优点</h2>
            <ul>
              <li>确保同一工厂生成的产品相互兼容</li>
              <li>避免客户端代码与具体产品类耦合</li>
              <li>单一职责原则：产品创建代码集中一处</li>
              <li>开闭原则：引入新产品家族无需修改已有代码</li>
            </ul>
          </div>
          <div class="cons">
            <h2 class="section-title">缺点</h2>
            <ul>
              <li>增加新"产品种类"需要修改所有工厂接口</li>
              <li>代码复杂度增加，需要创建多个类和接口</li>
              <li>可能引入不必要的抽象层，对于简单场景可能过度设计</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>抽象工厂模式特别适合需要创建<strong>多系列相关产品</strong>的场景，它能确保同一系列中的产品相互兼容</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const userPrefersDark = ref(false);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

.abstract-factory-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Noto Sans SC', sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #eaeaea;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      background: linear-gradient(90deg, #3498db, #2c3e50);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin-top: 0;
    }
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .pattern-overview {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .overview-card,
  .diagram-card {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
  }

  .section-title {
    font-size: 1.6rem;
    color: #3498db;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f0f0;
  }

  .concept {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    .concept-icon {
      flex-shrink: 0;
      width: 60px;
      height: 60px;
      background: #e3f2fd;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 32px;
        height: 32px;
        color: #3498db;
      }
    }

    .concept-text {
      p {
        font-size: 1.1rem;
        line-height: 1.7;
        margin: 0 0 1rem 0;

        strong {
          color: #e74c3c;
        }
      }
    }
  }

  .analogy {
    background: #f9f9ff;
    border-left: 4px solid #3498db;
    padding: 1rem 1.5rem;
    border-radius: 0 8px 8px 0;

    h3 {
      margin-top: 0;
      color: #3498db;
    }

    p {
      line-height: 1.6;
      margin-bottom: 0;

      strong {
        color: #e74c3c;
      }
    }
  }

  .uml-diagram {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    .uml-class {
      border: 2px solid #ddd;
      border-radius: 6px;
      min-width: 200px;
      overflow: hidden;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);

      .class-name {
        background: #3498db;
        color: white;
        padding: 0.8rem;
        font-weight: bold;
        text-align: center;
      }

      .methods {
        padding: 1rem;
        background: white;
        font-size: 0.9rem;
        line-height: 1.6;
      }
    }

    .abstract-factory .class-name {
      background: #2c3e50;
    }

    .concrete-factory .class-name {
      background: #3498db;
    }

    .abstract-product .class-name {
      background: #27ae60;
    }

    .concrete-product .class-name {
      background: #e67e22;
    }

    .uml-arrow {
      text-align: center;
      font-size: 1.2rem;
      color: #7f8c8d;
      line-height: 1.2;
    }

    .factory-row,
    .product-row {
      display: flex;
      gap: 2rem;
      justify-content: center;

      @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
      }
    }
  }

  .pattern-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .design-principles {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    .principles-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        gap: 1rem;
        padding: 1.2rem 0;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }
      }

      .principle-icon {
        font-size: 1.8rem;
        width: 50px;
        height: 50px;
        background: #f8f9fa;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      h3 {
        margin: 0 0 0.5rem 0;
        color: #2c3e50;
      }

      p {
        margin: 0;
        color: #7f8c8d;
        line-height: 1.6;
      }
    }
  }

  .code-example {
    background: #2c3e50;
    border-radius: 10px;
    padding: 1.5rem;
    color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    .example-description {
      margin-bottom: 1.2rem;
      font-size: 1.05rem;
      line-height: 1.6;
    }

    .code-block {
      background: #1e2a38;
      border-radius: 8px;
      padding: 1.2rem;
      overflow-x: auto;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

      code {
        color: #f8f8f2;
        display: block;

        .comment {
          color: #6272a4;
        }

        .keyword {
          color: #ff79c6;
          font-weight: bold;
        }

        .class {
          color: #50fa7b;
        }

        .function {
          color: #f1fa8c;
        }

        .string {
          color: #f1fa8c;
        }

        .number {
          color: #bd93f9;
        }

        .operator {
          color: #ff79c6;
        }
      }
    }
  }

  .pattern-scenarios {
    .use-cases {
      margin-bottom: 1.5rem;
    }

    .case-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.2rem;
    }

    .case-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }

      .case-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 0.8rem 0;
        color: #3498db;
      }

      p {
        margin: 0;
        color: #7f8c8d;
        line-height: 1.6;
      }
    }

    .pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }

      .pros,
      .cons {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }

      .pros {
        border-top: 4px solid #27ae60;
      }

      .cons {
        border-top: 4px solid #e74c3c;
      }

      ul {
        padding-left: 1.2rem;
        margin: 0;

        li {
          margin-bottom: 0.8rem;
          line-height: 1.6;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  .footer {
    margin-top: 2.5rem;
    text-align: center;
    padding: 1.5rem;
    font-size: 1.05rem;
    color: #7f8c8d;
    border-top: 1px solid #eaeaea;
    line-height: 1.7;

    strong {
      color: #e74c3c;
    }
  }
}

@media (max-width: 768px) {
  .abstract-factory-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }
  }
}
</style>
