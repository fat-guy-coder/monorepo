<template>
  <div class="strategy-pattern-container">
    <!-- 头部区域 -->
    <div class="header">
      <div class="title-container">
        <h1>策略模式详解</h1>
        <p>定义算法族，分别封装，使它们可以互相替换</p>
      </div>
      <div class="pattern-tag">
        <span>行为型设计模式</span>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 模式概览 -->
      <div class="pattern-overview">
        <div class="overview-card">
          <div class="icon">
            <svg viewBox="0 0 24 24" width="48" height="48">
              <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,7.76V16.24L12,19.85L19,16.24V7.76L12,4.15M12,7C13.66,7 15,8.34 15,10C15,11.66 13.66,13 12,13C10.34,13 9,11.66 9,10C9,8.34 10.34,7 12,7Z" />
            </svg>
          </div>
          <div class="content">
            <h2>模式概览</h2>
            <p>策略模式(Strategy Pattern)定义了一系列算法，并将每个算法封装起来，使它们可以相互替换。策略模式让算法的变化独立于使用它的客户端。</p>
            <div class="key-points">
              <div class="point">
                <div class="point-icon">✓</div>
                <div>封装可互换的算法</div>
              </div>
              <div class="point">
                <div class="point-icon">✓</div>
                <div>运行时选择算法</div>
              </div>
              <div class="point">
                <div class="point-icon">✓</div>
                <div>消除条件语句</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 现实比喻 -->
      <div class="section">
        <h2 class="section-title">
          <div class="title-icon">🌍</div>
          <span>现实比喻</span>
        </h2>
        <div class="analogy">
          <div class="analogy-card">
            <div class="analogy-icon">🚗</div>
            <h3>交通导航系统</h3>
            <p>想象一个交通导航系统，用户可以选择不同的路线策略：</p>
            <ul>
              <li><strong>最快路线</strong>：优先考虑时间因素</li>
              <li><strong>最短路线</strong>：优先考虑距离因素</li>
              <li><strong>避开收费</strong>：优先考虑经济因素</li>
              <li><strong>风景路线</strong>：优先考虑观光体验</li>
            </ul>
            <p>导航系统封装了各种路线算法，用户可以根据当前需求选择最合适的策略，而导航系统本身的结构保持不变。</p>
          </div>
        </div>
      </div>

      <!-- 模式结构 -->
      <div class="section">
        <h2 class="section-title">
          <div class="title-icon">🧩</div>
          <span>模式结构</span>
        </h2>
        <div class="structure">
          <div class="class-diagram">
            <div class="class-card context">
              <div class="class-header">Context</div>
              <div class="class-body">
                <div>- strategy: Strategy</div>
                <div>+ setStrategy(s: Strategy)</div>
                <div>+ executeStrategy()</div>
              </div>
            </div>

            <div class="arrow">➞</div>

            <div class="class-card strategy">
              <div class="class-header">Strategy</div>
              <div class="class-body">
                <div>+ execute(): void</div>
              </div>
            </div>

            <div class="arrow">⬇</div>

            <div class="concrete-strategies">
              <div class="class-card">
                <div class="class-header">ConcreteStrategyA</div>
                <div class="class-body">
                  <div>+ execute(): void</div>
                </div>
              </div>
              <div class="class-card">
                <div class="class-header">ConcreteStrategyB</div>
                <div class="class-body">
                  <div>+ execute(): void</div>
                </div>
              </div>
              <div class="class-card">
                <div class="class-header">ConcreteStrategyC</div>
                <div class="class-body">
                  <div>+ execute(): void</div>
                </div>
              </div>
            </div>
          </div>

          <div class="structure-explanation">
            <div class="component">
              <h3>Context (上下文)</h3>
              <p>维护对策略对象的引用，通过策略接口与具体策略交互</p>
            </div>
            <div class="component">
              <h3>Strategy (策略接口)</h3>
              <p>定义所有支持的算法的公共接口</p>
            </div>
            <div class="component">
              <h3>ConcreteStrategy (具体策略)</h3>
              <p>实现策略接口的具体算法</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 代码示例 -->
      <div class="section">
        <h2 class="section-title">
          <div class="title-icon">💻</div>
          <span>代码示例</span>
        </h2>
        <div class="code-example">
          <div class="tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="code-container">
            <pre v-if="activeTab === 'typescript'"><code>{{ typescriptCode }}</code></pre>
            <pre v-if="activeTab === 'javascript'"><code>{{ javascriptCode }}</code></pre>
          </div>
        </div>
      </div>

      <!-- 适用场景 -->
      <div class="section">
        <h2 class="section-title">
          <div class="title-icon">🎯</div>
          <span>适用场景</span>
        </h2>
        <div class="use-cases">
          <div class="use-case-card">
            <div class="case-icon">1</div>
            <h3>多种算法变体</h3>
            <p>当一个类有多种行为变体，并且需要在运行时选择时</p>
          </div>
          <div class="use-case-card">
            <div class="case-icon">2</div>
            <h3>消除条件语句</h3>
            <p>需要消除大量的条件判断语句（if-else或switch-case）</p>
          </div>
          <div class="use-case-card">
            <div class="case-icon">3</div>
            <h3>算法封装</h3>
            <p>需要封装算法实现细节，只暴露接口给客户端</p>
          </div>
          <div class="use-case-card">
            <div class="case-icon">4</div>
            <h3>可扩展系统</h3>
            <p>系统需要支持新的算法变体而无需修改核心逻辑</p>
          </div>
        </div>
      </div>

      <!-- 优缺点 -->
      <div class="section">
        <h2 class="section-title">
          <div class="title-icon">⚖️</div>
          <span>优缺点分析</span>
        </h2>
        <div class="pros-cons">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>运行时切换算法</li>
              <li>将算法实现与使用代码分离</li>
              <li>开闭原则 - 无需修改上下文即可引入新策略</li>
              <li>消除复杂的条件语句</li>
            </ul>
          </div>
          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li>客户端必须了解不同策略的差异</li>
              <li>增加对象数量</li>
              <li>策略间通信可能复杂</li>
              <li>简单算法可能过度设计</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 与其他模式的关系 -->
      <div class="section">
        <h2 class="section-title">
          <div class="title-icon">🔗</div>
          <span>与其他模式的关系</span>
        </h2>
        <div class="pattern-relations">
          <div class="relation">
            <div class="relation-icon">🔄</div>
            <div class="relation-text">
              <strong>策略 vs 状态</strong>：两者结构相似，但意图不同。策略模式中策略彼此独立，状态模式中状态可以相互转换。
            </div>
          </div>
          <div class="relation">
            <div class="relation-icon">🎭</div>
            <div class="relation-text">
              <strong>策略 vs 命令</strong>：策略模式封装算法，命令模式封装请求。
            </div>
          </div>
          <div class="relation">
            <div class="relation-icon">🏗️</div>
            <div class="relation-text">
              <strong>策略 vs 模板方法</strong>：策略使用组合，模板方法使用继承。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = ref([
  { id: 'typescript', label: 'TypeScript 实现' },
  { id: 'javascript', label: 'JavaScript 实现' }
]);

const activeTab = ref('typescript');

const typescriptCode = `// 策略接口
interface SortingStrategy {
  sort(data: number[]): number[];
}

// 具体策略 - 冒泡排序
class BubbleSort implements SortingStrategy {
  sort(data: number[]): number[] {
    console.log("使用冒泡排序");
    // 实现省略...
    return [...data].sort((a, b) => a - b);
  }
}

// 具体策略 - 快速排序
class QuickSort implements SortingStrategy {
  sort(data: number[]): number[] {
    console.log("使用快速排序");
    // 实现省略...
    return [...data].sort((a, b) => a - b);
  }
}

// 上下文
class Sorter {
  private strategy: SortingStrategy;

  constructor(strategy: SortingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortingStrategy) {
    this.strategy = strategy;
  }

  sort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

// 客户端代码
const data = [5, 2, 8, 1, 9];
const sorter = new Sorter(new BubbleSort());

console.log(sorter.sort(data)); // 使用冒泡排序

sorter.setStrategy(new QuickSort());
console.log(sorter.sort(data)); // 使用快速排序`;

const javascriptCode = `// 策略接口（在JS中是隐式的）
class SortingStrategy {
  sort(data) {
    throw new Error("方法必须被实现");
  }
}

// 具体策略 - 冒泡排序
class BubbleSort extends SortingStrategy {
  sort(data) {
    console.log("使用冒泡排序");
    // 实现省略...
    return [...data].sort((a, b) => a - b);
  }
}

// 具体策略 - 快速排序
class QuickSort extends SortingStrategy {
  sort(data) {
    console.log("使用快速排序");
    // 实现省略...
    return [...data].sort((a, b) => a - b);
  }
}

// 上下文
class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sort(data) {
    return this.strategy.sort(data);
  }
}

// 客户端代码
const data = [5, 2, 8, 1, 9];
const sorter = new Sorter(new BubbleSort());

console.log(sorter.sort(data)); // 使用冒泡排序

sorter.setStrategy(new QuickSort());
console.log(sorter.sort(data)); // 使用快速排序`;
</script>

<style lang="less" scoped>

.strategy-pattern-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
  background: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  padding: 2rem;
  border-radius: 16px;
  color: white;
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.2);

  .title-container {
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 600px;
    }
  }

  .pattern-tag {
    background: rgba(255, 255, 255, 0.15);
    padding: 0.5rem 1.2rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    backdrop-filter: blur(5px);
  }
}

.section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);

  .section-title {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e2e8f0;

    .title-icon {
      font-size: 1.8rem;
      margin-right: 0.8rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.pattern-overview {
  .overview-card {
    display: flex;
    gap: 2rem;
    align-items: center;

    .icon {
      flex-shrink: 0;
      width: 100px;
      height: 100px;
      background: #e0e7ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        fill: #4f46e5;
      }
    }

    .content {
      flex: 1;

      h2 {
        font-size: 1.8rem;
        color: #1e293b;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.1rem;
        color: #475569;
        margin-bottom: 1.5rem;
      }
    }
  }

  .key-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;

    .point {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      background: #f1f5f9;
      padding: 0.8rem 1.2rem;
      border-radius: 10px;
      font-weight: 500;

      .point-icon {
        width: 28px;
        height: 28px;
        background: #4f46e5;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        font-weight: bold;
      }
    }
  }
}

.analogy {
  .analogy-card {
    background: #f1f5f9;
    border-radius: 12px;
    padding: 1.8rem;

    .analogy-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.4rem;
      color: #1e293b;
      margin-bottom: 1rem;
    }

    ul {
      padding-left: 1.5rem;
      margin-bottom: 1.5rem;

      li {
        margin-bottom: 0.6rem;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4f46e5;
        }

        strong {
          color: #4f46e5;
          font-weight: 600;
        }
      }
    }

    p {
      color: #475569;
      line-height: 1.7;
    }
  }
}

.structure {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  .class-diagram {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;

    .class-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      margin-bottom: 1.5rem;

      .class-header {
        background: #4f46e5;
        color: white;
        padding: 0.8rem 1rem;
        font-weight: 600;
      }

      .class-body {
        padding: 1rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        line-height: 1.8;
      }
    }

    .context {
      .class-body {
        color: #4f46e5;
      }
    }

    .strategy {
      .class-body {
        color: #7c3aed;
      }
    }

    .arrow {
      text-align: center;
      font-size: 1.5rem;
      margin: 0.5rem 0;
      color: #94a3b8;
    }

    .concrete-strategies {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;

      .class-card {
        .class-body {
          color: #ec4899;
        }
      }
    }
  }

  .structure-explanation {
    .component {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      border-left: 4px solid #4f46e5;

      h3 {
        font-size: 1.2rem;
        color: #1e293b;
        margin-bottom: 0.8rem;
      }

      p {
        color: #475569;
        line-height: 1.6;
      }
    }
  }
}

.code-example {
  background: #0f172a;
  border-radius: 12px;
  overflow: hidden;

  .tabs {
    display: flex;
    background: #1e293b;

    button {
      padding: 0.8rem 1.5rem;
      background: none;
      border: none;
      color: #94a3b8;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 1rem;

      &.active {
        color: white;
        background: #4f46e5;
      }

      &:hover:not(.active) {
        background: #334155;
      }
    }
  }

  .code-container {
    pre {
      margin: 0;
      padding: 1.5rem;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', 'Source Code Pro', monospace;
        font-size: 0.95rem;
        line-height: 1.6;
        color: #cbd5e1;
      }
    }
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  .use-case-card {
    background: #f1f5f9;
    border-radius: 12px;
    padding: 1.8rem 1.5rem;
    text-align: center;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    }

    .case-icon {
      width: 50px;
      height: 50px;
      background: #4f46e5;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      font-weight: 700;
      margin: 0 auto 1.2rem;
    }

    h3 {
      font-size: 1.2rem;
      color: #1e293b;
      margin-bottom: 0.8rem;
    }

    p {
      color: #475569;
      font-size: 0.95rem;
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  .pros, .cons {
    border-radius: 12px;
    padding: 1.8rem;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 1.2rem;
      display: flex;
      align-items: center;

      &::before {
        content: '';
        display: inline-block;
        width: 10px;
        height: 30px;
        margin-right: 0.8rem;
        border-radius: 2px;
      }
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.8rem;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      }
    }
  }

  .pros {
    background: rgba(72, 187, 120, 0.1);

    h3 {
      color: #15803d;

      &::before {
        background: #15803d;
      }
    }

    ul li::before {
      background: #15803d;
    }
  }

  .cons {
    background: rgba(248, 113, 113, 0.1);

    h3 {
      color: #b91c1c;

      &::before {
        background: #b91c1c;
      }
    }

    ul li::before {
      background: #b91c1c;
    }
  }
}

.pattern-relations {
  .relation {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding: 1.5rem;
    background: #f1f5f9;
    border-radius: 12px;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    .relation-icon {
      font-size: 1.8rem;
      min-width: 40px;
    }

    .relation-text {
      strong {
        color: #4f46e5;
        font-weight: 600;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .pattern-overview .overview-card {
    flex-direction: column;
    text-align: center;

    .key-points {
      grid-template-columns: 1fr;
    }
  }

  .structure {
    grid-template-columns: 1fr;
  }

  .pros-cons {
    grid-template-columns: 1fr;
  }

  .use-cases {
    grid-template-columns: 1fr;
  }
}
</style>
