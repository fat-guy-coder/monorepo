<template>
  <div class="state-pattern-container">
    <div class="header-section">
      <h1><span class="highlight">状态模式</span>深入解析</h1>
      <p class="subtitle">行为型设计模式 · 对象行为随状态改变而改变</p>
    </div>

    <div class="pattern-overview">
      <div class="definition-card">
        <h2><i class="icon icon-definition"></i>状态模式定义</h2>
        <p>允许一个对象在其<span class="highlight">内部状态改变时改变它的行为</span>，使对象看起来似乎修改了它的类。</p>
        <div class="key-points">
          <div class="point">
            <div class="point-icon">🔄</div>
            <div>
              <h3>状态转换</h3>
              <p>对象在不同状态下表现出不同行为</p>
            </div>
          </div>
          <div class="point">
            <div class="point-icon">🧩</div>
            <div>
              <h3>解耦状态</h3>
              <p>每个状态封装在独立的类中</p>
            </div>
          </div>
          <div class="point">
            <div class="point-icon">⚙️</div>
            <div>
              <h3>消除条件逻辑</h3>
              <p>避免大量的if-else状态判断</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-columns">
      <div class="main-content">
        <div class="pattern-structure">
          <h2><i class="icon icon-structure"></i>模式结构</h2>
          <div class="uml-diagram">
            <div class="context">
              <h4>Context (上下文)</h4>
              <p>持有当前状态对象</p>
              <p>定义客户端需要的接口</p>
            </div>
            <div class="state-interface">
              <h4>State (状态接口)</h4>
              <p>定义状态行为的方法</p>
            </div>
            <div class="states">
              <div class="state">
                <h4>ConcreteStateA</h4>
                <p>实现特定状态的行为</p>
              </div>
              <div class="state">
                <h4>ConcreteStateB</h4>
                <p>实现特定状态的行为</p>
              </div>
              <div class="state">
                <h4>ConcreteStateC</h4>
                <p>实现特定状态的行为</p>
              </div>
            </div>
            <div class="arrows">
              <div class="arrow">→</div>
              <div class="arrow">→</div>
              <div class="arrow">←</div>
            </div>
          </div>
        </div>

        <div class="code-implementation">
          <h2><i class="icon icon-code"></i>代码实现</h2>
          <div class="code-tabs">
            <div class="tabs">
              <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
                @click="activeTab = index">
                {{ tab.title }}
              </button>
            </div>
            <div class="tab-content">
              <div v-if="activeTab === 0">
                <pre><code>// 状态接口
interface State {
  insertCoin(): void;
  pressButton(): void;
  dispense(): void;
}

// 售罄状态
class SoldOutState implements State {
  machine: VendingMachine;

  constructor(machine: VendingMachine) {
    this.machine = machine;
  }

  insertCoin() {
    console.log("机器售罄，无法投币");
  }

  pressButton() {
    console.log("机器售罄，按钮无效");
  }

  dispense() {
    console.log("机器售罄，无法出货");
  }
}

// 无币状态
class NoCoinState implements State {
  // 类似实现...
}

// 有币状态
class HasCoinState implements State {
  // 类似实现...
}

// 售卖状态
class SoldState implements State {
  // 类似实现...
}</code></pre>
              </div>
              <div v-if="activeTab === 1">
                <pre><code>// 自动售货机 - 上下文
class VendingMachine {
  private soldOutState: State;
  private noCoinState: State;
  private hasCoinState: State;
  private soldState: State;

  private currentState: State;
  private productCount: number;

  constructor(productCount: number) {
    this.soldOutState = new SoldOutState(this);
    this.noCoinState = new NoCoinState(this);
    this.hasCoinState = new HasCoinState(this);
    this.soldState = new SoldState(this);

    this.productCount = productCount;
    this.currentState = productCount > 0
      ? this.noCoinState
      : this.soldOutState;
  }

  insertCoin() {
    this.currentState.insertCoin();
  }

  pressButton() {
    this.currentState.pressButton();
    this.currentState.dispense();
  }

  // 状态变更方法
  setState(state: State) {
    this.currentState = state;
  }

  // 其他辅助方法...
}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="real-world-demo">
          <h2><i class="icon icon-demo"></i>自动售货机演示</h2>
          <div class="vending-machine">
            <div class="display">
              <div class="state-indicator" :class="currentState.toLowerCase()">
                当前状态: <span>{{ currentState }}</span>
              </div>
              <div class="product-count">
                剩余产品: {{ productCount }}
              </div>
            </div>

            <div class="controls">
              <button @click="insertCoin" :disabled="!canInsertCoin">
                <i class="icon-coin"></i> 投入硬币
              </button>
              <button @click="pressButton" :disabled="!canPressButton">
                <i class="icon-button"></i> 按下按钮
              </button>
              <button @click="restock">
                <i class="icon-restock"></i> 补充商品 ({{ restockAmount }})
              </button>
            </div>

            <div class="logs">
              <h3>操作日志:</h3>
              <div class="log-container">
                <div v-for="(log, index) in logs" :key="index" class="log-entry">
                  {{ log }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sidebar">
        <div class="use-cases">
          <h2><i class="icon icon-usecase"></i>使用场景</h2>
          <div class="case" v-for="(useCase, index) in useCases" :key="index">
            <div class="case-icon">{{ useCase.icon }}</div>
            <div class="case-content">
              <h3>{{ useCase.title }}</h3>
              <p>{{ useCase.description }}</p>
            </div>
          </div>
        </div>

        <div class="pros-cons">
          <h2><i class="icon icon-proscons"></i>优缺点分析</h2>
          <div class="pros">
            <h3><i class="icon icon-check"></i> 优点</h3>
            <ul>
              <li v-for="(pro, index) in pros" :key="index">{{ pro }}</li>
            </ul>
          </div>
          <div class="cons">
            <h3><i class="icon icon-warning"></i> 缺点</h3>
            <ul>
              <li v-for="(con, index) in cons" :key="index">{{ con }}</li>
            </ul>
          </div>
        </div>

        <div class="comparison">
          <h2><i class="icon icon-compare"></i>与策略模式比较</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>状态模式</th>
                <th>策略模式</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>目的</td>
                <td>处理对象状态变化</td>
                <td>封装可互换的算法</td>
              </tr>
              <tr>
                <td>状态转换</td>
                <td>状态之间可以相互转换</td>
                <td>策略通常独立存在</td>
              </tr>
              <tr>
                <td>客户端感知</td>
                <td>客户端可能不知道状态变化</td>
                <td>客户端主动选择策略</td>
              </tr>
              <tr>
                <td>状态数量</td>
                <td>通常状态数量有限</td>
                <td>策略数量可能很多</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="conclusion">
      <h2><i class="icon icon-summary"></i>总结</h2>
      <div class="summary-content">
        <p>状态模式的核心思想是将<span class="highlight">对象的状态封装成独立的类</span>，并将请求委托给当前状态对象处理。</p>
        <p>该模式适用于状态数量有限但状态转换复杂的场景，能有效<span class="highlight">消除庞大的条件分支语句</span>，提高代码的可维护性和扩展性。</p>
        <div class="best-practices">
          <h3>最佳实践:</h3>
          <ul>
            <li>将状态转换逻辑放在状态类中</li>
            <li>确保状态对象没有实例变量（可复用）</li>
            <li>使用状态表简化状态创建</li>
            <li>对于简单状态转换，考虑使用状态机库</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// 状态模式实现
interface State {
  insertCoin(): void;
  pressButton(): void;
  dispense(): void;
}

// 售货机类
class VendingMachine {
  private currentState: State;
  private productCount: number;
  private logs: string[] = [];

  constructor() {
    this.productCount = 3;
    this.currentState = new NoCoinState(this);
  }

  setState(state: State) {
    this.currentState = state;
  }

  insertCoin() {
    this.currentState.insertCoin();
  }

  pressButton() {
    this.currentState.pressButton();
  }

  dispense() {
    this.currentState.dispense();
  }

  releaseProduct() {
    if (this.productCount > 0) {
      this.productCount--;
      this.log('商品已出货');
    }
  }

  restock(count: number) {
    this.productCount += count;
    this.log(`已补充商品，当前库存: ${this.productCount}`);
  }

  log(message: string) {
    this.logs.unshift(`[${new Date().toLocaleTimeString()}] ${message}`);
    if (this.logs.length > 10) this.logs.pop();
  }

  getStateName(): string {
    return this.currentState.constructor.name.replace('State', '');
  }

  getProductCount(): number {
    return this.productCount;
  }

  getLogs(): string[] {
    return [...this.logs];
  }
}

// 状态类 - 售罄
class SoldOutState implements State {
  constructor(private machine: VendingMachine) { }

  insertCoin() {
    this.machine.log("机器售罄，请勿投币");
  }

  pressButton() {
    this.machine.log("机器售罄，按钮无效");
  }

  dispense() {
    // 无操作
  }
}

// 状态类 - 无币
class NoCoinState implements State {
  constructor(private machine: VendingMachine) { }

  insertCoin() {
    this.machine.log("已投入硬币");
    this.machine.setState(new HasCoinState(this.machine));
  }

  pressButton() {
    this.machine.log("请先投入硬币");
  }

  dispense() {
    // 无操作
  }
}

// 状态类 - 有币
class HasCoinState implements State {
  constructor(private machine: VendingMachine) { }

  insertCoin() {
    this.machine.log("已投币，无需再投");
  }

  pressButton() {
    this.machine.log("按钮已按下，准备出货...");
    this.machine.setState(new SoldState(this.machine));
    this.machine.dispense();
  }

  dispense() {
    // 由SoldState处理
  }
}

// 状态类 - 售卖中
class SoldState implements State {
  constructor(private machine: VendingMachine) { }

  insertCoin() {
    this.machine.log("正在出货，请稍候...");
  }

  pressButton() {
    this.machine.log("正在出货，请勿重复按下");
  }

  dispense() {
    if (this.machine.getProductCount() > 0) {
      this.machine.releaseProduct();

      if (this.machine.getProductCount() > 0) {
        this.machine.setState(new NoCoinState(this.machine));
      } else {
        this.machine.setState(new SoldOutState(this.machine));
      }
    } else {
      this.machine.setState(new SoldOutState(this.machine));
    }
  }
}

// 创建实例
const vendingMachine = new VendingMachine();

// 响应式数据
const currentState = ref(vendingMachine.getStateName());
const productCount = ref(vendingMachine.getProductCount());
const logs = reactive<string[]>(vendingMachine.getLogs());

const restockAmount = ref(3);

const canInsertCoin = ref(true);
const canPressButton = ref(true);

// 标签页控制
const tabs = [
  { title: '状态接口与实现', content: '' },
  { title: '上下文实现', content: '' }
];
const activeTab = ref(0);

// 使用场景
const useCases = [
  { icon: '🛒', title: '电子商务订单', description: '订单状态管理（待支付、已支付、发货中、已完成等）' },
  { icon: '🎮', title: '游戏角色状态', description: '角色状态（正常、中毒、眩晕、无敌等）影响角色行为' },
  { icon: '🚦', title: '交通信号灯', description: '不同灯色状态控制车辆通行规则' },
  { icon: '⌨️', title: '编辑器模式', description: '编辑器的不同模式（插入、选择、命令等）' },
  { icon: '📱', title: '设备连接状态', description: '设备连接状态（断开、连接中、已连接、错误）' },
  { icon: '🏧', title: 'ATM机状态', description: 'ATM状态管理（空闲、验证中、交易中、维护中）' }
];

// 优缺点
const pros = [
  '单一职责原则：每个状态类负责特定状态行为',
  '开闭原则：无需修改上下文即可新增状态',
  '消除庞大的条件分支语句',
  '状态转换逻辑组织更清晰',
  '状态类复用性高'
];

const cons = [
  '状态数量多时会产生许多类',
  '上下文和状态类存在双向依赖',
  '过度使用可能使简单问题复杂化',
  '状态转换逻辑分散在各状态类中'
];

// 操作方法
const insertCoin = () => {
  vendingMachine.insertCoin();
  updateMachineState();
};

const pressButton = () => {
  vendingMachine.pressButton();
  updateMachineState();
};

const restock = () => {
  vendingMachine.restock(restockAmount.value);
  updateMachineState();
};

// 更新状态
const updateMachineState = () => {
  currentState.value = vendingMachine.getStateName();
  productCount.value = vendingMachine.getProductCount();

  // 更新日志
  logs.length = 0;
  logs.push(...vendingMachine.getLogs());

  // 更新按钮状态
  canInsertCoin.value = currentState.value !== 'Sold';
  canPressButton.value = currentState.value === 'HasCoin';
};
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;
@border-color: #e0e0e0;
@light-bg: #f8f9fa;
@dark-text: #2c3e50;

.state-pattern-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @dark-text;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4ecef 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  .header-section {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 0;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    h1 {
      color: @secondary-color;
      font-size: 2.5rem;
      margin-bottom: 10px;

      .highlight {
        color: @primary-color;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, @primary-color, transparent);
          border-radius: 2px;
        }
      }
    }

    .subtitle {
      color: #7f8c8d;
      font-size: 1.1rem;
      font-weight: 500;
      margin: 0;
    }
  }

  .pattern-overview {
    margin-bottom: 30px;

    .definition-card {
      background: white;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

      h2 {
        color: @primary-color;
        border-bottom: 2px solid @primary-color;
        padding-bottom: 15px;
        margin-top: 0;
        display: flex;
        align-items: center;

        .icon {
          margin-right: 12px;
          font-size: 1.4em;
        }
      }

      p {
        font-size: 1.1rem;
        line-height: 1.7;

        .highlight {
          background: linear-gradient(120deg, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0) 100%);
          padding: 0 5px;
          font-weight: 600;
          border-radius: 3px;
        }
      }

      .key-points {
        display: flex;
        gap: 20px;
        margin-top: 25px;

        .point {
          flex: 1;
          display: flex;
          align-items: center;
          background: @light-bg;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-5px);
          }

          .point-icon {
            font-size: 2.2rem;
            margin-right: 15px;
          }

          h3 {
            margin: 0 0 8px;
            color: @secondary-color;
          }

          p {
            margin: 0;
            color: #666;
            font-size: 0.95rem;
          }
        }
      }
    }
  }

  .content-columns {
    display: flex;
    gap: 30px;

    .main-content {
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    .sidebar {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 25px;
    }
  }

  .pattern-structure {
    background: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    h2 {
      color: @primary-color;
      border-bottom: 2px solid @primary-color;
      padding-bottom: 15px;
      margin-top: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4em;
      }
    }

    .uml-diagram {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;

      .context,
      .state-interface {
        background: @light-bg;
        border: 2px solid @primary-color;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        width: 80%;
        margin-bottom: 30px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

        h4 {
          margin-top: 0;
          color: @primary-color;
        }
      }

      .state-interface {
        border-color: @success-color;
      }

      .states {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-top: 20px;

        .state {
          background: white;
          border: 2px solid @warning-color;
          border-radius: 8px;
          padding: 15px;
          width: 28%;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

          h4 {
            margin-top: 0;
            color: @warning-color;
          }
        }
      }

      .arrows {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin: 20px 0;

        .arrow {
          font-size: 1.8rem;
          color: @secondary-color;
        }
      }
    }
  }

  .code-implementation {
    background: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    h2 {
      color: @primary-color;
      border-bottom: 2px solid @primary-color;
      padding-bottom: 15px;
      margin-top: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4em;
      }
    }

    .code-tabs {
      margin-top: 20px;

      .tabs {
        display: flex;
        border-bottom: 2px solid @light-bg;

        button {
          padding: 12px 25px;
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          color: #7f8c8d;
          position: relative;
          transition: all 0.3s ease;

          &.active {
            color: @primary-color;

            &::after {
              content: '';
              position: absolute;
              bottom: -2px;
              left: 0;
              width: 100%;
              height: 3px;
              background: @primary-color;
              border-radius: 3px 3px 0 0;
            }
          }

          &:hover:not(.active) {
            background: @light-bg;
          }
        }
      }

      .tab-content {
        margin-top: 20px;

        pre {
          background: #2d2d2d;
          color: #f8f8f2;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          font-size: 0.95rem;
          line-height: 1.5;

          code {
            font-family: 'Fira Code', monospace;
          }
        }
      }
    }
  }

  .real-world-demo {
    background: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    h2 {
      color: @primary-color;
      border-bottom: 2px solid @primary-color;
      padding-bottom: 15px;
      margin-top: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4em;
      }
    }

    .vending-machine {
      background: #f5f5f5;
      border-radius: 10px;
      padding: 25px;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
      border: 2px solid @border-color;

      .display {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;

        .state-indicator {
          background: white;
          padding: 15px;
          border-radius: 8px;
          font-weight: 600;
          flex: 1;
          margin-right: 15px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

          span {
            padding: 3px 10px;
            border-radius: 20px;
            color: white;
          }

          &.nocoin span {
            background: @warning-color;
          }

          &.hascoin span {
            background: @success-color;
          }

          &.sold span {
            background: @primary-color;
          }

          &.soldout span {
            background: @danger-color;
          }
        }

        .product-count {
          background: white;
          padding: 15px;
          border-radius: 8px;
          font-weight: 600;
          width: 200px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

          &::before {
            content: '📦 ';
          }
        }
      }

      .controls {
        display: flex;
        gap: 15px;
        margin-bottom: 25px;

        button {
          flex: 1;
          padding: 15px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

          &:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          &:nth-child(1) {
            background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
            color: white;
          }

          &:nth-child(2) {
            background: linear-gradient(135deg, #5ee7df 0%, #b490ca 100%);
            color: white;
          }

          &:nth-child(3) {
            background: linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%);
            color: #333;
          }
        }
      }

      .logs {
        h3 {
          margin-top: 0;
          color: @secondary-color;
          padding-bottom: 10px;
          border-bottom: 1px solid @border-color;
        }

        .log-container {
          background: #2d2d2d;
          color: #f8f8f2;
          border-radius: 8px;
          padding: 15px;
          height: 200px;
          overflow-y: auto;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;

          .log-entry {
            padding: 8px 0;
            border-bottom: 1px solid #444;

            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
  }

  .use-cases {
    background: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    h2 {
      color: @primary-color;
      border-bottom: 2px solid @primary-color;
      padding-bottom: 15px;
      margin-top: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4em;
      }
    }

    .case {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        border-bottom: none;
      }

      .case-icon {
        font-size: 1.8rem;
        margin-right: 15px;
        width: 40px;
        text-align: center;
      }

      .case-content {
        h3 {
          margin: 0 0 5px;
          color: @secondary-color;
        }

        p {
          margin: 0;
          color: #666;
          font-size: 0.95rem;
        }
      }
    }
  }

  .pros-cons {
    background: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    h2 {
      color: @primary-color;
      border-bottom: 2px solid @primary-color;
      padding-bottom: 15px;
      margin-top: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4em;
      }
    }

    .pros,
    .cons {
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;

      h3 {
        display: flex;
        align-items: center;
        margin-top: 0;
        padding-bottom: 10px;
        border-bottom: 2px solid;

        .icon {
          margin-right: 10px;
        }
      }

      ul {
        padding-left: 20px;
        margin: 15px 0 0;

        li {
          padding: 8px 0;
          line-height: 1.5;
        }
      }
    }

    .pros {
      background: rgba(46, 204, 113, 0.05);
      border: 1px solid rgba(46, 204, 113, 0.2);

      h3 {
        color: @success-color;
        border-color: @success-color;
      }
    }

    .cons {
      background: rgba(231, 76, 60, 0.05);
      border: 1px solid rgba(231, 76, 60, 0.2);

      h3 {
        color: @danger-color;
        border-color: @danger-color;
      }
    }
  }

  .comparison {
    background: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    h2 {
      color: @primary-color;
      border-bottom: 2px solid @primary-color;
      padding-bottom: 15px;
      margin-top: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4em;
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;

      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid @border-color;
      }

      th {
        background: @light-bg;
        font-weight: 600;
      }

      tbody tr:hover {
        background: rgba(52, 152, 219, 0.05);
      }
    }
  }

  .conclusion {
    background: white;
    border-radius: 10px;
    padding: 25px;
    margin-top: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    h2 {
      color: @primary-color;
      border-bottom: 2px solid @primary-color;
      padding-bottom: 15px;
      margin-top: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 12px;
        font-size: 1.4em;
      }
    }

    .summary-content {
      p {
        font-size: 1.1rem;
        line-height: 1.7;

        .highlight {
          background: linear-gradient(120deg, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0) 100%);
          padding: 0 5px;
          font-weight: 600;
          border-radius: 3px;
        }
      }

      .best-practices {
        background: @light-bg;
        border-left: 4px solid @primary-color;
        padding: 20px;
        border-radius: 0 8px 8px 0;
        margin-top: 20px;

        h3 {
          margin-top: 0;
          color: @secondary-color;
        }

        ul {
          padding-left: 20px;
          margin: 15px 0 0;

          li {
            padding: 8px 0;
            line-height: 1.5;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .content-columns {
    flex-direction: column;
  }

  .key-points {
    flex-direction: column;
  }

  .controls {
    flex-direction: column;
  }
}
</style>