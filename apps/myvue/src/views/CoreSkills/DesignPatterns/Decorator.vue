<template>
  <div class="decorator-pattern">
    <header class="pattern-header">
      <div class="header-content">
        <h1>🎨 装饰者模式 (Decorator Pattern)</h1>
        <p>动态扩展对象功能的灵活设计模式</p>
      </div>
      <div class="decoration-example">
        <div class="base-component">核心功能</div>
        <div class="decorator" v-for="(deco, index) in decorations" :key="index" :style="{ left: `${(index + 1) * 40}px` }">
          +{{ deco }}
        </div>
      </div>
    </header>

    <div class="content-container">
      <!-- 概念部分 -->
      <section class="concept-section">
        <div class="section-header">
          <div class="section-icon">📚</div>
          <h2>模式概念</h2>
        </div>
        <div class="concept-content">
          <p>
            <strong>装饰者模式</strong>是一种结构型设计模式，允许你通过将对象放入包含行为的特殊封装对象中来为原对象绑定新的行为。
            这种模式提供了一种比继承更有弹性的替代方案，可以在<strong>运行时动态添加功能</strong>。
          </p>

          <div class="analogy">
            <h3>现实世界类比</h3>
            <div class="analogy-content">
              <div class="analogy-item">
                <div class="analogy-icon">👕</div>
                <div>
                  <h4>基础服装</h4>
                  <p>一件简单的T恤</p>
                </div>
              </div>
              <div class="analogy-arrow">→</div>
              <div class="analogy-item">
                <div class="analogy-icon">🧥</div>
                <div>
                  <h4>添加外套</h4>
                  <p>增加保暖功能</p>
                </div>
              </div>
              <div class="analogy-arrow">→</div>
              <div class="analogy-item">
                <div class="analogy-icon">🧣</div>
                <div>
                  <h4>添加围巾</h4>
                  <p>增加装饰和保暖</p>
                </div>
              </div>
              <div class="analogy-arrow">→</div>
              <div class="analogy-item">
                <div class="analogy-icon">🧤</div>
                <div>
                  <h4>添加手套</h4>
                  <p>增加手部保护</p>
                </div>
              </div>
            </div>
            <p class="analogy-description">
              每添加一件衣物，都是在原有基础上的装饰，而不是改变原来的T恤本身。
            </p>
          </div>
        </div>
      </section>

      <!-- 设计思路 -->
      <section class="design-section">
        <div class="section-header">
          <div class="section-icon">🧠</div>
          <h2>设计思路</h2>
        </div>

        <div class="design-grid">
          <div class="design-card">
            <div class="design-icon">🔌</div>
            <h3>接口统一</h3>
            <p>装饰器和原始对象实现相同接口</p>
          </div>
          <div class="design-card">
            <div class="design-icon">📦</div>
            <h3>封装对象</h3>
            <p>装饰器封装原始对象</p>
          </div>
          <div class="design-card">
            <div class="design-icon">🔄</div>
            <h3>委托调用</h3>
            <p>装饰器将请求委托给封装对象</p>
          </div>
          <div class="design-card">
            <div class="design-icon">➕</div>
            <h3>功能叠加</h3>
            <p>在委托前后添加新功能</p>
          </div>
        </div>

        <div class="uml-diagram">
          <h3>UML 类图</h3>
          <div class="uml-content">
            <div class="uml-class">
              <div class="class-header">Component</div>
              <div class="class-method">+operation()</div>
            </div>
            <div class="uml-arrow">↑继承</div>
            <div class="uml-group">
              <div class="uml-class">
                <div class="class-header">ConcreteComponent</div>
                <div class="class-method">+operation()</div>
              </div>
              <div class="uml-class">
                <div class="class-header">Decorator</div>
                <div class="class-field">-component: Component</div>
                <div class="class-method">+operation()</div>
              </div>
            </div>
            <div class="uml-arrow">↑继承</div>
            <div class="uml-group">
              <div class="uml-class">
                <div class="class-header">ConcreteDecoratorA</div>
                <div class="class-method">+operation()</div>
                <div class="class-method">+addedBehavior()</div>
              </div>
              <div class="uml-class">
                <div class="class-header">ConcreteDecoratorB</div>
                <div class="class-method">+operation()</div>
                <div class="class-method">+addedState</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="scenarios-section">
        <div class="section-header">
          <div class="section-icon">💼</div>
          <h2>使用场景</h2>
        </div>

        <div class="scenarios-container">
          <div class="scenario-tabs">
            <button v-for="(scenario, index) in scenarioCategories" :key="index"
              :class="['scenario-tab', { active: activeScenario === index }]" @click="activeScenario = index">
              {{ scenario.category }}
            </button>
          </div>

          <div class="scenario-content">
            <div v-for="(scenario, index) in scenarioCategories[activeScenario].scenarios" :key="index"
              class="scenario-item">
              <div class="scenario-icon">{{ scenario.icon }}</div>
              <div>
                <h3>{{ scenario.title }}</h3>
                <p>{{ scenario.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 代码示例 -->
      <section class="code-section">
        <div class="section-header">
          <div class="section-icon">💻</div>
          <h2>代码示例</h2>
        </div>

        <div class="code-example">
          <div class="code-tabs">
            <button :class="['code-tab', { active: activeCodeTab === 'ts' }]" @click="activeCodeTab = 'ts'">
              TypeScript
            </button>
            <button :class="['code-tab', { active: activeCodeTab === 'js' }]" @click="activeCodeTab = 'js'">
              JavaScript
            </button>
          </div>

          <div class="code-content">
            <pre v-if="activeCodeTab === 'ts'"><code class="typescript">// 组件接口
interface Coffee {
  cost(): number;
  description(): string;
}

// 具体组件
class SimpleCoffee implements Coffee {
  cost(): number { return 5; }
  description(): string { return "简单咖啡"; }
}

// 装饰器基类
abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  cost(): number { return this.coffee.cost(); }
  description(): string { return this.coffee.description(); }
}

// 具体装饰器 - 牛奶
class MilkDecorator extends CoffeeDecorator {
  cost(): number { return super.cost() + 2; }
  description(): string { return super.description() + ", 加牛奶"; }
}

// 具体装饰器 - 糖
class SugarDecorator extends CoffeeDecorator {
  cost(): number { return super.cost() + 1; }
  description(): string { return super.description() + ", 加糖"; }
}

// 具体装饰器 - 香草
class VanillaDecorator extends CoffeeDecorator {
  cost(): number { return super.cost() + 3; }
  description(): string { return super.description() + ", 加香草"; }
}

// 客户端代码
let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.description()); // "简单咖啡, 加牛奶, 加糖"
console.log(`总价: $${coffee.cost()}`); // 总价: $8</code></pre>

            <pre v-if="activeCodeTab === 'js'"><code class="javascript">// 组件接口
class Coffee {
  cost() {}
  description() {}
}

// 具体组件
class SimpleCoffee extends Coffee {
  cost() { return 5; }
  description() { return "简单咖啡"; }
}

// 装饰器基类
class CoffeeDecorator extends Coffee {
  constructor(coffee) {
    super();
    this.coffee = coffee;
  }

  cost() { return this.coffee.cost(); }
  description() { return this.coffee.description(); }
}

// 具体装饰器 - 牛奶
class MilkDecorator extends CoffeeDecorator {
  cost() { return super.cost() + 2; }
  description() { return super.description() + ", 加牛奶"; }
}

// 具体装饰器 - 糖
class SugarDecorator extends CoffeeDecorator {
  cost() { return super.cost() + 1; }
  description() { return super.description() + ", 加糖"; }
}

// 客户端使用
let coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.description()); // "简单咖啡, 加牛奶, 加糖"
console.log(`总价: $${coffee.cost()}`); // 总价: $8</code></pre>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <section class="pros-cons-section">
        <div class="section-header">
          <div class="section-icon">⚖️</div>
          <h2>优缺点分析</h2>
        </div>

        <div class="comparison">
          <div class="pros">
            <h3>✅ 优点</h3>
            <ul>
              <li v-for="(pro, index) in pros" :key="index">
                <div class="icon">✔️</div>
                <div>{{ pro }}</div>
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3>❌ 缺点</h3>
            <ul>
              <li v-for="(con, index) in cons" :key="index">
                <div class="icon">⚠️</div>
                <div>{{ con }}</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="summary-section">
        <div class="section-header">
          <div class="section-icon">🏁</div>
          <h2>模式总结</h2>
        </div>

        <div class="summary-content">
          <p>
            装饰者模式提供了一种灵活且可扩展的方式来动态添加对象功能，避免了使用子类扩展带来的静态继承关系问题。
            它遵循了<strong>开闭原则</strong>（对扩展开放，对修改关闭），是处理对象功能扩展的强大工具。
          </p>

          <div class="usage-tips">
            <h3>使用建议：</h3>
            <div class="tips-grid">
              <div class="tip-card">
                <div class="tip-icon">🔄</div>
                <p>当需要动态、透明地添加职责时</p>
              </div>
              <div class="tip-card">
                <div class="tip-icon">🚫</div>
                <p>当不适合使用子类进行扩展时</p>
              </div>
              <div class="tip-card">
                <div class="tip-icon">🧩</div>
                <p>当需要组合多个可选功能时</p>
              </div>
              <div class="tip-card">
                <div class="tip-icon">📦</div>
                <p>当系统需要功能拆分为小部件时</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="pattern-footer">
        <div class="footer-content">
          <h3>扩展学习资源</h3>
          <div class="resources">
            <a href="https://refactoring.guru/design-patterns/decorator" target="_blank">Refactoring.Guru - 装饰者模式</a>
            <a href="https://en.wikipedia.org/wiki/Decorator_pattern" target="_blank">装饰者模式 - 维基百科</a>
            <a href="https://sourcemaking.com/design_patterns/decorator" target="_blank">SourceMaking - 装饰者模式</a>
          </div>
        </div>
        <div class="footer-note">
          <p>设计模式是构建可维护、可扩展软件系统的基石，掌握装饰者模式将极大提升你的架构设计能力！</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const decorations = ref(['日志', '缓存', '验证', '监控']);
const activeScenario = ref(0);
const activeCodeTab = ref('ts');

const scenarioCategories = [
  {
    category: '前端开发',
    scenarios: [
      { icon: '🖥️', title: 'UI组件增强', description: '为基本组件动态添加边框、阴影、动画等装饰效果' },
      { icon: '🔄', title: '高阶组件(HOC)', description: '在React中增强组件功能而不修改原组件' },
      { icon: '📊', title: '数据格式化', description: '为核心数据添加格式化、本地化等装饰层' },
      { icon: '🔐', title: '权限控制', description: '为功能组件添加权限验证装饰器' }
    ]
  },
  {
    category: '后端开发',
    scenarios: [
      { icon: '⏱️', title: '性能监控', description: '为服务方法添加执行时间监控装饰器' },
      { icon: '📝', title: '日志记录', description: '为关键方法添加日志记录装饰器' },
      { icon: '🔒', title: '安全验证', description: '为API添加身份验证和权限检查装饰器' },
      { icon: '💾', title: '缓存机制', description: '为数据访问方法添加缓存装饰器' }
    ]
  },
  {
    category: '框架应用',
    scenarios: [
      { icon: '🔄', title: '中间件', description: 'Express/Koa中的中间件机制是装饰者模式的典型应用' },
      { icon: '🎯', title: 'AOP编程', description: '实现面向切面编程，分离横切关注点' },
      { icon: '🧪', title: '测试增强', description: '为测试用例添加前置/后置处理装饰器' },
      { icon: '📦', title: '依赖注入', description: '在Angular/IoC容器中使用装饰器注入依赖' }
    ]
  },
  {
    category: '其他场景',
    scenarios: [
      { icon: '📁', title: '文件系统', description: '为文件流添加压缩、加密等装饰功能' },
      { icon: '📡', title: '网络通信', description: '为网络请求添加重试、超时处理装饰器' },
      { icon: '🧮', title: '数学计算', description: '为计算函数添加精度控制、日志记录' },
      { icon: '🎮', title: '游戏开发', description: '为游戏角色动态添加装备、技能等装饰效果' }
    ]
  }
];

const pros = [
  '比继承更灵活，运行时动态添加功能',
  '符合开闭原则，无需修改现有代码即可扩展',
  '可以组合多个装饰器实现复杂功能',
  '避免在高层模块中使用大量子类',
  '装饰类和被装饰类可以独立变化'
];

const cons = [
  '会产生许多小对象，增加系统复杂性',
  '多层装饰时调试困难，不易追踪问题',
  '过度使用会使配置变得复杂',
  '装饰器顺序可能影响结果，需要谨慎设计',
  '类型系统可能难以处理多层装饰'
];
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.decorator-pattern {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #2d3748;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;

  * {
    box-sizing: border-box;
  }
}

.pattern-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(120deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  color: white;
  position: relative;
  overflow: hidden;

  .header-content {
    position: relative;
    z-index: 2;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    p {
      font-size: 1.2rem;
      color: #dbeafe;
      margin-top: 0;
    }
  }
}

.decoration-example {
  margin-top: 2rem;
  position: relative;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  .base-component {
    position: absolute;
    width: 150px;
    height: 70px;
    background: #1e40af;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 3;
  }

  .decorator {
    position: absolute;
    width: 80px;
    height: 80px;
    background: #f97316;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    animation: float 3s ease-in-out infinite;

    &:nth-child(1) {
      animation-delay: 0s;
      background: #f97316;
      top: -10px;
    }

    &:nth-child(2) {
      animation-delay: 0.5s;
      background: #10b981;
      top: 30px;
    }

    &:nth-child(3) {
      animation-delay: 1s;
      background: #8b5cf6;
      top: -5px;
    }

    &:nth-child(4) {
      animation-delay: 1.5s;
      background: #ec4899;
      top: 25px;
    }
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.content-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(120deg, #eff6ff 0%, #dbeafe 100%);
  border-bottom: 2px solid #d1d5db;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: #1d4ed8;
  }

  .section-icon {
    font-size: 1.8rem;
    margin-right: 1.2rem;
    background: #3b82f6;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
}

.concept-section {
  .concept-content {
    padding: 2rem;

    p {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #4b5563;
      margin-bottom: 1.5rem;
    }
  }
}

.analogy {
  background: #f0f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border: 1px solid #bae6fd;

  h3 {
    color: #0369a1;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .analogy-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1rem;

    .analogy-item {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
      min-width: 150px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

      .analogy-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      h4 {
        margin: 0;
        color: #1d4ed8;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: #64748b;
      }
    }

    .analogy-arrow {
      font-size: 1.5rem;
      color: #3b82f6;
      font-weight: bold;
      margin: 0 0.5rem;
    }
  }

  .analogy-description {
    text-align: center;
    font-style: italic;
    color: #475569;
    margin: 0;
  }
}

.design-section {
  .design-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem 2rem;
  }
}

.design-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
    border-color: #3b82f6;
  }

  .design-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #3b82f6;
  }

  h3 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 0.8rem;
  }

  p {
    color: #6b7280;
    margin: 0;
    line-height: 1.6;
  }
}

.uml-diagram {
  padding: 1.5rem 2rem;

  h3 {
    text-align: center;
    color: #1d4ed8;
    margin-bottom: 1.5rem;
  }

  .uml-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .uml-group {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .uml-class {
    background: #f0f9ff;
    border: 2px solid #3b82f6;
    border-radius: 8px;
    min-width: 200px;

    .class-header {
      background: #3b82f6;
      color: white;
      padding: 0.8rem;
      text-align: center;
      font-weight: 600;
      border-radius: 6px 6px 0 0;
    }

    .class-field,
    .class-method {
      padding: 0.6rem 1rem;
      border-bottom: 1px solid #dbeafe;

      &:last-child {
        border-bottom: none;
      }
    }

    .class-field {
      color: #1e40af;
    }

    .class-method {
      color: #0c4a6e;
    }
  }

  .uml-arrow {
    font-size: 1.5rem;
    color: #3b82f6;
    font-weight: bold;
  }
}

.scenarios-section {
  .scenarios-container {
    padding: 0 2rem 2rem;
  }
}

.scenario-tabs {
  display: flex;
  background: #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.scenario-tab {
  flex: 1;
  padding: 1rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e0f2fe;
    color: #1d4ed8;
  }

  &.active {
    background: #3b82f6;
    color: white;
    font-weight: 600;
  }
}

.scenario-content {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}

.scenario-item {
  display: flex;
  padding: 1.2rem;
  background: white;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }

  .scenario-icon {
    font-size: 1.8rem;
    margin-right: 1.5rem;
    width: 50px;
    height: 50px;
    background: #dbeafe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1d4ed8;
    flex-shrink: 0;
  }

  h3 {
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  p {
    color: #4b5563;
    margin: 0;
    line-height: 1.6;
  }
}

.code-section {
  .code-example {
    padding: 0 2rem 2rem;
  }
}

.code-tabs {
  display: flex;
  background: #f1f5f9;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.code-tab {
  padding: 0.8rem 1.5rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;

  &:hover {
    background: #e0f2fe;
    color: #1d4ed8;
  }

  &.active {
    background: #1e40af;
    color: white;
    font-weight: 600;
  }
}

.code-content {
  background: #1e293b;
  border-radius: 0 0 8px 8px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 1.5rem;
    overflow-x: auto;
  }

  code {
    display: block;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #e2e8f0;
  }

  .typescript {
    .hljs-keyword {
      color: #f472b6;
    }

    .hljs-built_in {
      color: #60a5fa;
    }

    .hljs-class {
      color: #34d399;
    }

    .hljs-function {
      color: #fbbf24;
    }

    .hljs-string {
      color: #34d399;
    }

    .hljs-comment {
      color: #94a3b8;
    }

    .hljs-params {
      color: #c7d2fe;
    }
  }

  .javascript {
    .hljs-keyword {
      color: #f472b6;
    }

    .hljs-built_in {
      color: #60a5fa;
    }

    .hljs-class {
      color: #34d399;
    }

    .hljs-function {
      color: #fbbf24;
    }

    .hljs-string {
      color: #34d399;
    }

    .hljs-comment {
      color: #94a3b8;
    }
  }
}

.pros-cons-section {
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    padding: 0 2rem 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}

.pros,
.cons {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #dbeafe;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    padding: 0.8rem 0;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    .icon {
      margin-right: 0.8rem;
      font-size: 1.2rem;
      width: 24px;
      flex-shrink: 0;
    }
  }
}

.pros {
  border-left: 4px solid #10b981;

  h3 {
    color: #10b981;
  }
}

.cons {
  border-left: 4px solid #ef4444;

  h3 {
    color: #ef4444;
  }
}

.summary-section {
  .summary-content {
    padding: 1.5rem 2rem 2rem;

    p {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #4b5563;
      margin-bottom: 1.5rem;
    }
  }
}

.usage-tips {
  background: #f0fdf4;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #bbf7d0;

  h3 {
    color: #047857;
    margin-top: 0;
    margin-bottom: 1rem;
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.tip-card {
  background: white;
  border-radius: 10px;
  padding: 1.2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  .tip-icon {
    font-size: 2rem;
    margin-bottom: 0.8rem;
    color: #10b981;
  }

  p {
    margin: 0;
    color: #4b5563;
    line-height: 1.5;
  }
}

.pattern-footer {
  background: linear-gradient(120deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 16px 16px;

  .footer-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;

    h3 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: #e0f2fe;
    }
  }

  .resources {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;

    a {
      color: #93c5fd;
      text-decoration: none;
      padding: 0.8rem;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        background: #3b82f6;
        color: white;
      }
    }
  }

  .footer-note {
    text-align: center;
    padding-top: 1.5rem;
    border-top: 1px solid #334155;
    max-width: 800px;
    margin: 0 auto;

    p {
      font-size: 1.1rem;
      color: #93c5fd;
      font-weight: 500;
    }
  }
}

@media (max-width: 768px) {
  .decorator-pattern {
    padding: 1rem;
  }

  .pattern-header {
    padding: 1.5rem;

    h1 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .decoration-example {
    height: 150px;

    .decorator {
      width: 60px;
      height: 60px;
      font-size: 0.8rem;
    }
  }

  .section-header {
    padding: 1rem;

    h2 {
      font-size: 1.5rem;
    }
  }

  .analogy-content {
    flex-direction: column;

    .analogy-arrow {
      transform: rotate(90deg);
      margin: 0.5rem 0;
    }
  }
}
</style>