<template>
  <div class="strategy-pattern-container">
    <div class="pattern-hero">
      <div class="hero-content">
        <h1>策略模式 (Strategy Pattern)</h1>
        <p class="hero-subtitle">定义算法族，分别封装起来，让它们之间可以互相替换</p>

        <div class="pattern-visualization">
          <div class="context-card">
            <div class="card-header">Context</div>
            <div class="card-body">
              <div class="strategy-reference">strategy</div>
            </div>
          </div>

          <div class="strategy-arrow">
            <div class="arrow-line"></div>
            <div class="arrow-head"></div>
          </div>

          <div class="strategies-container">
            <div class="strategy-card" v-for="(strategy, index) in strategies" :key="index">
              <div class="card-header">ConcreteStrategy{{ index + 1 }}</div>
              <div class="card-body">
                <div class="algorithm">algorithm()</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pattern-tabs">
      <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id"
        class="tab-button">
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.title }}
      </button>
    </div>

    <div class="pattern-content">
      <!-- 概念介绍 -->
      <section v-if="activeTab === 'concept'" class="content-section">
        <div class="concept-intro">
          <div class="intro-card">
            <div class="intro-icon">💡</div>
            <div class="intro-text">
              <h2>策略模式概念</h2>
              <p>
                <strong>策略模式</strong>是一种行为设计模式，它定义了一系列算法，并将每个算法封装起来，
                使它们可以相互替换。策略模式让算法的变化独立于使用算法的客户端。
              </p>
            </div>
          </div>

          <div class="pattern-principle">
            <h3>设计原则</h3>
            <div class="principles">
              <div class="principle">
                <div class="principle-icon">🔒</div>
                <h4>封装变化</h4>
                <p>将经常变化的部分（算法）从不变的部分中分离出来</p>
              </div>
              <div class="principle">
                <div class="principle-icon">🔄</div>
                <h4>面向接口</h4>
                <p>针对接口编程，而不是针对实现编程</p>
              </div>
              <div class="principle">
                <div class="principle-icon">🧩</div>
                <h4>组合复用</h4>
                <p>使用组合代替继承，获得更大的灵活性</p>
              </div>
            </div>
          </div>
        </div>

        <div class="pattern-structure">
          <h3>模式结构</h3>
          <div class="structure-diagram">
            <div class="structure-item context">
              <div class="class-header">Context</div>
              <div class="class-methods">
                <div>+ strategy: Strategy</div>
                <div>+ executeStrategy()</div>
              </div>
            </div>

            <div class="structure-item strategy">
              <div class="class-header">Strategy</div>
              <div class="class-methods">
                <div>+ algorithm()</div>
              </div>
            </div>

            <div class="structure-item concrete-strategy">
              <div class="class-header">ConcreteStrategyA</div>
              <div class="class-methods">
                <div>+ algorithm()</div>
              </div>
            </div>

            <div class="structure-item concrete-strategy">
              <div class="class-header">ConcreteStrategyB</div>
              <div class="class-methods">
                <div>+ algorithm()</div>
              </div>
            </div>

            <div class="relation-arrow context-to-strategy"></div>
            <div class="relation-arrow strategy-to-concrete"></div>
          </div>

          <div class="structure-explanation">
            <div class="explanation-item">
              <span class="component">Context</span>
              <span class="desc">- 持有一个策略对象的引用，通过策略接口调用具体算法</span>
            </div>
            <div class="explanation-item">
              <span class="component">Strategy</span>
              <span class="desc">- 定义所有支持的算法的公共接口</span>
            </div>
            <div class="explanation-item">
              <span class="component">ConcreteStrategy</span>
              <span class="desc">- 实现Strategy接口的具体算法类</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 设计思路 -->
      <section v-if="activeTab === 'design'" class="content-section">
        <h2>策略模式的设计思路</h2>

        <div class="implementation-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>定义策略接口</h3>
              <p>创建一个策略接口，声明所有支持的算法的公共方法</p>
              <div class="code-block">
                <pre><code>interface SortingStrategy {
  sort(data: number[]): number[];
}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>实现具体策略</h3>
              <p>为每种算法创建一个具体策略类，实现策略接口</p>
              <div class="code-block">
                <pre><code>class BubbleSortStrategy implements SortingStrategy {
  sort(data: number[]): number[] {
    // 冒泡排序实现
    console.log("使用冒泡排序");
    return [...data].sort((a, b) => a - b);
  }
}

class QuickSortStrategy implements SortingStrategy {
  sort(data: number[]): number[] {
    // 快速排序实现
    console.log("使用快速排序");
    return this.quickSort([...data]);
  }

  private quickSort(arr: number[]): number[] {
    if (arr.length &lt;= 1) return arr;
    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i &lt; arr.length; i++) {
      if (arr[i] &lt; pivot) left.push(arr[i]);
      else right.push(arr[i]);
    }

    return [...this.quickSort(left), pivot, ...this.quickSort(right)];
  }
}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>创建上下文类</h3>
              <p>创建上下文类，持有策略对象并执行算法</p>
              <div class="code-block">
                <pre><code>class SorterContext {
  private strategy: SortingStrategy;

  constructor(strategy: SortingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortingStrategy) {
    this.strategy = strategy;
  }

  executeSort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>客户端使用</h3>
              <p>客户端根据需求选择具体策略，创建上下文并执行算法</p>
              <div class="code-block">
                <pre><code>// 创建策略
const bubbleSort = new BubbleSortStrategy();
const quickSort = new QuickSortStrategy();

// 创建上下文
const sorter = new SorterContext(bubbleSort);

// 执行排序
const data = [5, 2, 8, 1, 9];
console.log(sorter.executeSort(data)); // 使用冒泡排序

// 切换策略
sorter.setStrategy(quickSort);
console.log(sorter.executeSort(data)); // 使用快速排序</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="pattern-demo">
          <h3>策略模式演示</h3>
          <div class="demo-container">
            <div class="demo-controls">
              <label>输入数据 (逗号分隔):</label>
              <input type="text" v-model="inputData" placeholder="例如: 5,2,8,1,9">

              <label>选择排序策略:</label>
              <select v-model="selectedStrategy">
                <option v-for="(strategy, index) in demoStrategies" :key="index" :value="strategy">
                  {{ strategy.name }}
                </option>
              </select>

              <button @click="executeSort">执行排序</button>
            </div>

            <div class="demo-results">
              <div class="result-card">
                <div class="result-title">原始数据</div>
                <div class="result-data">{{ inputData || '未输入数据' }}</div>
              </div>

              <div class="result-arrow">→</div>

              <div class="result-card">
                <div class="result-title">排序结果</div>
                <div class="result-data">{{ sortedResult || '等待排序...' }}</div>
              </div>

              <div class="execution-info">
                <div class="info-item">使用策略: {{ selectedStrategy.name }}</div>
                <div class="info-item">执行时间: {{ executionTime }} ms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section v-if="activeTab === 'usage'" class="content-section">
        <h2>策略模式的使用场景</h2>

        <div class="usage-scenarios">
          <div class="scenario-card">
            <div class="scenario-icon">💰</div>
            <div class="scenario-content">
              <h3>支付系统</h3>
              <p>不同的支付方式（支付宝、微信、信用卡）作为不同策略</p>
              <div class="code-snippet">
                interface PaymentStrategy { pay(amount) }
              </div>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🚚</div>
            <div class="scenario-content">
              <h3>运费计算</h3>
              <p>不同的运输方式（快递、空运、海运）使用不同的计算策略</p>
              <div class="code-snippet">
                class ShippingContext { setStrategy(strategy) }
              </div>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📊</div>
            <div class="scenario-content">
              <h3>数据可视化</h3>
              <p>不同的图表类型（柱状图、折线图、饼图）作为不同策略</p>
              <div class="code-snippet">
                chartContext.setStrategy(new BarChartStrategy())
              </div>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔐</div>
            <div class="scenario-content">
              <h3>验证系统</h3>
              <p>不同的验证规则（邮箱、密码强度、手机号）作为策略</p>
              <div class="code-snippet">
                validator.setStrategy(new EmailValidation())
              </div>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🎮</div>
            <div class="scenario-content">
              <h3>游戏AI</h3>
              <p>不同的敌人行为（攻击、防御、逃跑）作为策略</p>
              <div class="code-snippet">
                enemy.setBehavior(new AttackBehavior())
              </div>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📱</div>
            <div class="scenario-content">
              <h3>UI主题切换</h3>
              <p>不同的主题（深色模式、浅色模式）作为策略实现</p>
              <div class="code-snippet">
                themeContext.setStrategy(new DarkThemeStrategy())
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <section v-if="activeTab === 'pros-cons'" class="content-section">
        <h2>策略模式的优缺点</h2>

        <div class="pros-cons-container">
          <div class="pros-section">
            <div class="section-header">
              <span class="section-icon">✅</span>
              <h3>优点</h3>
            </div>
            <ul class="pros-list">
              <li v-for="(pro, index) in pros" :key="index" class="pro-item">
                <div class="pro-icon">✓</div>
                <div class="pro-content">
                  <h4>{{ pro.title }}</h4>
                  <p>{{ pro.description }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="cons-section">
            <div class="section-header">
              <span class="section-icon">⚠️</span>
              <h3>缺点</h3>
            </div>
            <ul class="cons-list">
              <li v-for="(con, index) in cons" :key="index" class="con-item">
                <div class="con-icon">✗</div>
                <div class="con-content">
                  <h4>{{ con.title }}</h4>
                  <p>{{ con.description }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践建议</h3>
          <div class="practices-grid">
            <div class="practice-card">
              <div class="practice-icon">📏</div>
              <h4>策略粒度</h4>
              <p>确保策略类只负责单一算法，避免策略类过于复杂</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">🧪</div>
              <h4>单元测试</h4>
              <p>每个策略类应该独立测试，确保算法正确性</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">🏷️</div>
              <h4>命名规范</h4>
              <p>使用明确的命名表明策略的用途和算法类型</p>
            </div>
            <div class="practice-card">
              <div class="practice-icon">📦</div>
              <h4>策略工厂</h4>
              <p>当策略较多时，使用工厂模式创建策略对象</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Vue应用 -->
      <section v-if="activeTab === 'vue'" class="content-section">
        <h2>在Vue中的应用</h2>

        <div class="vue-applications">
          <div class="application-card">
            <div class="app-header">
              <div class="app-icon">🛒</div>
              <h3>电商折扣策略</h3>
            </div>
            <div class="app-content">
              <p>根据不同的促销活动应用不同的折扣策略</p>
              <div class="code-block">
                <pre><code>// 策略接口
interface DiscountStrategy {
  calculate(price: number): number;
}

// 具体策略
class NoDiscountStrategy implements DiscountStrategy {
  calculate(price: number): number {
    return price;
  }
}

class PercentageDiscountStrategy implements DiscountStrategy {
  constructor(private percentage: number) {}

  calculate(price: number): number {
    return price * (1 - this.percentage / 100);
  }
}

class FixedDiscountStrategy implements DiscountStrategy {
  constructor(private amount: number) {}

  calculate(price: number): number {
    return Math.max(0, price - this.amount);
  }
}

// Vue组件中使用
const discountStrategies = {
  none: new NoDiscountStrategy(),
  percentage: new PercentageDiscountStrategy(20),
  fixed: new FixedDiscountStrategy(50)
};

const price = ref(100);
const selectedStrategy = ref&lt;keyof typeof discountStrategies&gt;('none');

const discountedPrice = computed(() => {
  return discountStrategies[selectedStrategy.value].calculate(price.value);
});</code></pre>
              </div>
            </div>
          </div>

          <div class="application-card">
            <div class="app-header">
              <div class="app-icon">📊</div>
              <h3>数据格式化策略</h3>
            </div>
            <div class="app-content">
              <p>根据数据类型选择不同的格式化策略</p>
              <div class="code-block">
                <pre><code>// 策略接口
interface FormatStrategy {
  format(data: any): string;
}

// 具体策略
class DateFormatStrategy implements FormatStrategy {
  format(date: Date): string {
    return new Intl.DateTimeFormat().format(date);
  }
}

class CurrencyFormatStrategy implements FormatStrategy {
  format(amount: number): string {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  }
}

class TextFormatStrategy implements FormatStrategy {
  format(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

// Vue组件中使用
const formatStrategies = {
  date: new DateFormatStrategy(),
  currency: new CurrencyFormatStrategy(),
  text: new TextFormatStrategy()
};

const formatData = (type: keyof typeof formatStrategies, data: any) => {
  return formatStrategies[type].format(data);
};</code></pre>
              </div>
            </div>
          </div>

          <div class="application-card">
            <div class="app-header">
              <div class="app-icon">🌐</div>
              <h3>国际化策略</h3>
            </div>
            <div class="app-content">
              <p>根据用户语言选择不同的翻译策略</p>
              <div class="code-block">
                <pre><code>// 策略接口
interface TranslationStrategy {
  translate(key: string): string;
}

// 具体策略
class EnglishTranslation implements TranslationStrategy {
  private translations = {
    welcome: "Welcome",
    goodbye: "Goodbye"
  };

  translate(key: string): string {
    return this.translations[key] || key;
  }
}

class ChineseTranslation implements TranslationStrategy {
  private translations = {
    welcome: "欢迎",
    goodbye: "再见"
  };

  translate(key: string): string {
    return this.translations[key] || key;
  }
}

// Vue组合式函数
export function useI18n(locale: 'en' | 'zh') {
  const strategies = {
    en: new EnglishTranslation(),
    zh: new ChineseTranslation()
  };

  const t = (key: string) => {
    return strategies[locale].translate(key);
  };

  return { t };
}

// 在组件中使用
const { locale } = useI18nStore(); // 假设从store获取语言
const { t } = useI18n(locale.value);

console.log(t('welcome')); // 根据语言显示欢迎信息</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="pattern-footer">
      <p>策略模式 - 灵活替换算法，提升代码可维护性和扩展性</p>
      <div class="footer-links">
        <a href="#">设计模式文档</a>
        <a href="#">更多行为模式</a>
        <a href="#">设计模式示例</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const tabs = [
  { id: 'concept', title: '概念介绍', icon: '📚' },
  { id: 'design', title: '设计思路', icon: '🧩' },
  { id: 'usage', title: '使用场景', icon: '🚀' },
  { id: 'pros-cons', title: '优缺点', icon: '⚖️' },
  { id: 'vue', title: 'Vue应用', icon: '💻' }
];

const activeTab = ref('concept');

const strategies = [
  { name: '冒泡排序', color: '#3498db' },
  { name: '快速排序', color: '#2ecc71' },
  { name: '归并排序', color: '#e74c3c' }
];

// 演示数据
const inputData = ref('5,2,8,1,9');
const selectedStrategy = ref({
  name: '冒泡排序',
  algorithm: (arr: number[]) => [...arr].sort((a, b) => a - b)
});
const sortedResult = ref('');
const executionTime = ref(0);

const demoStrategies: { name: string; algorithm: (arr: number[]) => number[] }[] = [
  {
    name: '冒泡排序',
    algorithm: (arr: number[]) => {
      const result = [...arr];
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.length - i - 1; j++) {
          if (result[j] > result[j + 1]) {
            [result[j], result[j + 1]] = [result[j + 1], result[j]];
          }
        }
      }
      return result;
    }
  },
  {
    name: '快速排序',
    algorithm: (arr: number[]) => {
      if (arr.length <= 1) return arr;
      const pivot = arr[0];
      const left = [];
      const right = [];

      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) left.push(arr[i]);
        else right.push(arr[i]);
      }

      return [
        ...demoStrategies[1].algorithm(left),
        pivot,
        ...demoStrategies[1].algorithm(right)
      ];
    }
  },
  {
    name: '插入排序',
    algorithm: (arr: number[]) => {
      const result = [...arr];
      for (let i = 1; i < result.length; i++) {
        const current = result[i];
        let j = i - 1;

        while (j >= 0 && result[j] > current) {
          result[j + 1] = result[j];
          j--;
        }

        result[j + 1] = current;
      }
      return result;
    }
  }
];

function executeSort() {
  if (!inputData.value) return;

  try {
    const dataArray = inputData.value.split(',')
      .map(item => parseFloat(item.trim()))
      .filter(num => !isNaN(num));

    if (dataArray.length === 0) {
      sortedResult.value = '无效输入';
      return;
    }

    const startTime = performance.now();
    const result = selectedStrategy.value.algorithm(dataArray);
    const endTime = performance.now();

    sortedResult.value = result.join(', ');
    executionTime.value = parseFloat((endTime - startTime).toFixed(2));
  } catch (error: any) {
    sortedResult.value = '排序出错: ' + error.message;
  }
}

const pros = [
  {
    title: "开闭原则支持",
    description: "无需修改上下文即可引入新策略"
  },
  {
    title: "消除条件语句",
    description: "避免使用大量的条件语句选择算法"
  },
  {
    title: "算法复用",
    description: "相同的算法可以在不同的环境中复用"
  },
  {
    title: "运行时切换",
    description: "可以在运行时动态切换算法"
  }
];

const cons = [
  {
    title: "策略类增多",
    description: "每个策略都需要一个单独的类，可能增加类的数量"
  },
  {
    title: "客户端认知",
    description: "客户端需要了解不同策略的区别以选择合适的策略"
  },
  {
    title: "通信开销",
    description: "策略与上下文之间的通信可能引入额外开销"
  },
  {
    title: "对象创建",
    description: "每使用一个策略都需要创建一个新的策略对象"
  }
];
</script>

<style lang="less" scoped>
.strategy-pattern-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  color: #2c3e50;
}

.pattern-hero {
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 25%);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;

  h1 {
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .hero-subtitle {
    font-size: 1.4rem;
    font-weight: 300;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 2rem;
  }
}

.pattern-visualization {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.context-card,
.strategy-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  overflow: hidden;
  min-width: 180px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-header {
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
}

.card-body {
  padding: 1.5rem;
  text-align: center;
  font-size: 1rem;
}

.strategies-container {
  display: flex;
  gap: 1.5rem;
}

.strategy-arrow {
  position: relative;
  width: 60px;

  .arrow-line {
    height: 2px;
    background: rgba(255, 255, 255, 0.7);
    position: absolute;
    top: 50%;
    left: 0;
    right: 20px;
    transform: translateY(-50%);
  }

  .arrow-head {
    position: absolute;
    top: 50%;
    right: 0;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 12px solid rgba(255, 255, 255, 0.7);
    transform: translateY(-50%);
  }
}

.pattern-tabs {
  display: flex;
  justify-content: center;
  background: #2c3e50;
  padding: 0;
  flex-wrap: wrap;
}

.tab-button {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  padding: 18px 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    color: white;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #3498db;
      border-radius: 4px 4px 0 0;
    }
  }
}

.tab-icon {
  font-size: 1.2rem;
}

.pattern-content {
  padding: 2rem;
}

.content-section {
  animation: fadeIn 0.5s ease;
}

.concept-intro {
  margin-bottom: 3rem;
}

.intro-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  border-left: 5px solid #3498db;

  .intro-icon {
    font-size: 4rem;
    color: #3498db;
    flex-shrink: 0;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #495057;
  }
}

.pattern-principle {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    text-align: center;
  }
}

.principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.principle {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .principle-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #3498db;
  }

  h4 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    color: #2c3e50;
  }

  p {
    font-size: 1rem;
    color: #495057;
  }
}

.pattern-structure {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    text-align: center;
  }
}

.structure-diagram {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 4rem;
  position: relative;
  justify-items: center;
  margin-bottom: 2rem;

  .structure-item {
    width: 220px;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    position: relative;
    z-index: 2;

    &.context {
      grid-column: 1;
      grid-row: 1;
      border-top: 3px solid #3498db;
    }

    &.strategy {
      grid-column: 2;
      grid-row: 1;
      border-top: 3px solid #e74c3c;
    }

    &.concrete-strategy {
      grid-row: 2;
      border-top: 3px solid #2ecc71;
    }
  }

  .class-header {
    background: #2c3e50;
    color: white;
    padding: 12px;
    font-weight: bold;
    text-align: center;
  }

  .class-methods {
    padding: 15px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;

    div {
      margin-bottom: 8px;
    }
  }

  .relation-arrow {
    position: absolute;
    height: 2px;
    background: #95a5a6;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: -5px;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 8px solid #95a5a6;
    }
  }

  .context-to-strategy {
    top: 50px;
    left: 50%;
    width: 50%;
    transform: translateY(-50%);
  }

  .strategy-to-concrete {
    top: 180px;
    left: 50%;
    width: 50%;
    transform: translateY(-50%);
  }
}

.structure-explanation {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;

  .explanation-item {
    display: flex;
    margin-bottom: 1rem;

    .component {
      font-weight: bold;
      width: 120px;
      flex-shrink: 0;
      color: #2c3e50;
    }

    .desc {
      color: #495057;
    }
  }
}

.implementation-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.step {
  display: flex;
  gap: 1.5rem;

  .step-number {
    background: #3498db;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: calc(100% - 1.5rem);
  }
}
</style>
