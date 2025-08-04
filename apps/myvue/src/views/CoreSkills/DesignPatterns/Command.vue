<template>
  <div class="command-pattern-container">
    <header class="header">
      <h1>命令模式基本介绍</h1>
      <p class="subtitle">封装请求为对象，实现解耦与灵活控制</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <section class="section">
          <h2>命令模式核心概念</h2>
          <div class="concept-grid">
            <div class="concept-card">
              <div class="concept-icon">📦</div>
              <h3>核心思想</h3>
              <p>将请求封装为对象，使你可以参数化客户端使用不同的请求、队列或日志请求，以及支持可撤销的操作</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">🔄</div>
              <h3>主要目的</h3>
              <ul>
                <li>解耦请求发送者和接收者</li>
                <li>支持请求的排队、记录、撤销和重做</li>
                <li>支持宏命令（命令组合）</li>
                <li>易于扩展新命令</li>
              </ul>
            </div>
            <div class="concept-card">
              <div class="concept-icon">🧩</div>
              <h3>关键组件</h3>
              <ul>
                <li><strong>Command</strong> - 命令接口</li>
                <li><strong>ConcreteCommand</strong> - 具体命令实现</li>
                <li><strong>Invoker</strong> - 调用者/触发者</li>
                <li><strong>Receiver</strong> - 接收者/执行者</li>
                <li><strong>Client</strong> - 创建命令并设置接收者</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>现实世界比喻</h2>
          <div class="analogy-container">
            <div class="restaurant-analogy">
              <div class="analogy-header">
                <div class="analogy-icon">🍽️</div>
                <h3>餐厅点餐系统</h3>
              </div>
              <div class="analogy-content">
                <div class="analogy-step">
                  <div class="step-number">1</div>
                  <div class="step-desc">
                    <h4>顾客 (Client)</h4>
                    <p>创建订单 (Command)</p>
                  </div>
                </div>
                <div class="analogy-step">
                  <div class="step-number">2</div>
                  <div class="step-desc">
                    <h4>服务员 (Invoker)</h4>
                    <p>接收订单并放入队列</p>
                  </div>
                </div>
                <div class="analogy-step">
                  <div class="step-number">3</div>
                  <div class="step-desc">
                    <h4>厨师 (Receiver)</h4>
                    <p>执行订单制作菜品</p>
                  </div>
                </div>
                <div class="analogy-step">
                  <div class="step-number">4</div>
                  <div class="step-desc">
                    <h4>订单 (Command)</h4>
                    <p>封装了制作菜品的所有信息</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="analogy-diagram">
              <div class="diagram">
                <div class="client">顾客</div>
                <div class="arrow">→</div>
                <div class="command">订单</div>
                <div class="arrow">→</div>
                <div class="invoker">服务员</div>
                <div class="arrow">→</div>
                <div class="receiver">厨师</div>

                <div class="connection"></div>
                <div class="connection reverse"></div>
              </div>
              <div class="diagram-key">
                <div class="key-item">
                  <div class="key-box client"></div>
                  <span>Client (顾客)</span>
                </div>
                <div class="key-item">
                  <div class="key-box command"></div>
                  <span>Command (订单)</span>
                </div>
                <div class="key-item">
                  <div class="key-box invoker"></div>
                  <span>Invoker (服务员)</span>
                </div>
                <div class="key-item">
                  <div class="key-box receiver"></div>
                  <span>Receiver (厨师)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>命令模式实现</h2>
          <div class="implementation">
            <div class="code-tabs">
              <div class="tab-buttons">
                <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }"
                  @click="activeTab = tab.id">
                  {{ tab.label }}
                </button>
              </div>

              <div class="tab-content">
                <div v-if="activeTab === 'interface'">
                  <pre>{{ interfaceCode }}</pre>
                </div>

                <div v-if="activeTab === 'command'">
                  <pre>{{ commandCode }}</pre>
                </div>

                <div v-if="activeTab === 'invoker'">
                  <pre>{{ invokerCode }}</pre>
                </div>

                <div v-if="activeTab === 'usage'">
                  <pre>{{ usageCode }}</pre>
                </div>
              </div>
            </div>

            <div class="demo-container">
              <h3>命令模式演示</h3>
              <div class="demo-actions">
                <button v-for="(action, index) in actions" :key="index" class="action-btn"
                  @click="executeCommand(action.command)">
                  {{ action.label }}
                </button>
              </div>

              <div class="demo-history">
                <h4>命令历史 (可撤销):</h4>
                <div class="history-list">
                  <div v-for="(record, index) in commandHistory" :key="index" class="history-item">
                    <span>{{ record }}</span>
                    <button v-if="index === commandHistory.length - 1" class="undo-btn" @click="undoCommand">
                      撤销
                    </button>
                  </div>
                  <div v-if="commandHistory.length === 0" class="empty-history">
                    暂无命令执行记录
                  </div>
                </div>
              </div>

              <div class="demo-result">
                <h4>当前状态:</h4>
                <div class="result-content">
                  <pre>{{ currentState }}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside class="sidebar">
        <div class="benefits-card">
          <h3>命令模式优势</h3>
          <ul class="benefits-list">
            <li>
              <div class="benefit-icon">🔌</div>
              <div>
                <h4>解耦调用者和接收者</h4>
                <p>调用者无需知道接收者的具体实现</p>
              </div>
            </li>
            <li>
              <div class="benefit-icon">⏱️</div>
              <div>
                <h4>支持操作队列</h4>
                <p>命令可以放入队列中延迟执行</p>
              </div>
            </li>
            <li>
              <div class="benefit-icon">↩️</div>
              <div>
                <h4>实现撤销/重做</h4>
                <p>通过存储命令历史实现操作回退</p>
              </div>
            </li>
            <li>
              <div class="benefit-icon">🧩</div>
              <div>
                <h4>支持组合命令</h4>
                <p>创建宏命令执行一系列操作</p>
              </div>
            </li>
            <li>
              <div class="benefit-icon">📝</div>
              <div>
                <h4>记录操作日志</h4>
                <p>可用于审计或系统恢复</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="use-cases-card">
          <h3>适用场景</h3>
          <ul class="use-cases-list">
            <li>需要回调机制的场景</li>
            <li>需要实现撤销/重做功能</li>
            <li>需要将操作排队、记录或延迟执行</li>
            <li>需要支持事务的系统</li>
            <li>GUI 按钮和菜单操作</li>
            <li>远程控制或网络请求</li>
            <li>宏命令录制与回放</li>
          </ul>
        </div>

        <div class="comparison-card">
          <h3>与其他模式关系</h3>
          <table>
            <thead>
              <tr>
                <th>模式</th>
                <th>关系</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>策略模式</td>
                <td>命令模式封装操作，策略模式封装算法</td>
              </tr>
              <tr>
                <td>备忘录模式</td>
                <td>用于实现命令的撤销功能</td>
              </tr>
              <tr>
                <td>责任链模式</td>
                <td>命令可组成责任链</td>
              </tr>
              <tr>
                <td>观察者模式</td>
                <td>命令可触发观察者通知</td>
              </tr>
              <tr>
                <td>组合模式</td>
                <td>用于实现宏命令</td>
              </tr>
            </tbody>
          </table>
        </div>
      </aside>
    </div>

    <section class="section">
      <h2>实际应用案例</h2>
      <div class="applications">
        <div class="application-card">
          <div class="app-icon">💻</div>
          <h3>文本编辑器</h3>
          <p>每个编辑操作（输入、删除、格式化）封装为命令，支持撤销/重做</p>
          <pre>class InsertCommand implements Command {
  constructor(private doc: Document, private text: string, private pos: number) {}

  execute() {
    this.doc.insert(this.text, this.pos);
  }

  undo() {
    this.doc.delete(this.pos, this.text.length);
  }
}</pre>
        </div>

        <div class="application-card">
          <div class="app-icon">🎮</div>
          <h3>游戏控制</h3>
          <p>将玩家操作封装为命令，支持按键重映射和回放功能</p>
          <pre>class JumpCommand implements Command {
  constructor(private player: Player) {}

  execute() {
    this.player.jump();
  }
}

// 按键绑定
inputHandler.bindKey('Space', new JumpCommand(player));</pre>
        </div>

        <div class="application-card">
          <div class="app-icon">🌐</div>
          <h3>API 请求</h3>
          <p>封装API请求为命令，支持请求队列、重试和撤销</p>
          <pre>class ApiCommand implements Command {
  constructor(private url: string, private data: any) {}

  execute() {
    return axios.post(this.url, this.data);
  }

  undo() {
    return axios.delete(this.url + '/' + this.data.id);
  }
}</pre>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>命令模式是行为型设计模式的核心之一，它通过将操作封装为对象，为系统提供了极大的灵活性和扩展能力</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// 命令模式实现代码示例
const tabs = [
  { id: 'interface', label: '命令接口' },
  { id: 'command', label: '具体命令' },
  { id: 'invoker', label: '调用者' },
  { id: 'usage', label: '使用示例' }
];
const activeTab = ref('interface');

const interfaceCode = `// 命令接口
interface Command {
  execute(): void;
  undo(): void;
}`;

const commandCode = `// 具体命令实现
class LightOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }

  undo() {
    this.light.turnOff();
  }
}

class ThermostatUpCommand implements Command {
  private thermostat: Thermostat;
  private prevTemperature: number;

  constructor(thermostat: Thermostat) {
    this.thermostat = thermostat;
  }

  execute() {
    this.prevTemperature = this.thermostat.getTemperature();
    this.thermostat.setTemperature(this.prevTemperature + 1);
  }

  undo() {
    this.thermostat.setTemperature(this.prevTemperature);
  }
}`;

const invokerCode = `// 调用者/遥控器
class RemoteControl {
  private commands: Command[] = [];
  private history: Command[] = [];

  submit(command: Command) {
    command.execute();
    this.commands.push(command);
  }

  undo() {
    if (this.commands.length > 0) {
      const command = this.commands.pop();
      command?.undo();
      this.history.push(command!);
    }
  }

  redo() {
    if (this.history.length > 0) {
      const command = this.history.pop();
      command?.execute();
      this.commands.push(command!);
    }
  }
}`;

const usageCode = `// 客户端使用
const light = new Light();
const thermostat = new Thermostat();

const lightOn = new LightOnCommand(light);
const tempUp = new ThermostatUpCommand(thermostat);

const remote = new RemoteControl();

// 执行命令
remote.submit(lightOn);
remote.submit(tempUp);

// 撤销最后命令
remote.undo(); // 温度恢复
remote.undo(); // 灯光关闭

// 重做命令
remote.redo(); // 灯光开启`;

// 命令模式演示
const commandHistory = ref<string[]>([]);
const currentState = reactive({
  light: false,
  temperature: 22,
  music: false,
  volume: 50
});

const actions = [
  { label: '开灯', command: 'lightOn' },
  { label: '关灯', command: 'lightOff' },
  { label: '升温', command: 'tempUp' },
  { label: '降温', command: 'tempDown' },
  { label: '播放音乐', command: 'musicOn' },
  { label: '停止音乐', command: 'musicOff' },
  { label: '音量增加', command: 'volumeUp' },
  { label: '音量减少', command: 'volumeDown' }
];

const executeCommand = (command: string) => {
  let action = '';

  switch (command) {
    case 'lightOn':
      currentState.light = true;
      action = '开灯';
      break;
    case 'lightOff':
      currentState.light = false;
      action = '关灯';
      break;
    case 'tempUp':
      currentState.temperature++;
      action = '升温至 ' + currentState.temperature + '°C';
      break;
    case 'tempDown':
      currentState.temperature--;
      action = '降温至 ' + currentState.temperature + '°C';
      break;
    case 'musicOn':
      currentState.music = true;
      action = '播放音乐';
      break;
    case 'musicOff':
      currentState.music = false;
      action = '停止音乐';
      break;
    case 'volumeUp':
      currentState.volume = Math.min(100, currentState.volume + 10);
      action = '音量增加至 ' + currentState.volume + '%';
      break;
    case 'volumeDown':
      currentState.volume = Math.max(0, currentState.volume - 10);
      action = '音量减少至 ' + currentState.volume + '%';
      break;
  }

  commandHistory.value.push(action);
};

const undoCommand = () => {
  if (commandHistory.value.length > 0) {
    const lastCommand = commandHistory.value.pop();

    // 简单撤销逻辑 - 实际应用中应有更完善的撤销实现
    if (lastCommand?.includes('开灯')) {
      currentState.light = false;
    } else if (lastCommand?.includes('关灯')) {
      currentState.light = true;
    } else if (lastCommand?.includes('升温')) {
      currentState.temperature--;
    } else if (lastCommand?.includes('降温')) {
      currentState.temperature++;
    } else if (lastCommand?.includes('播放音乐')) {
      currentState.music = false;
    } else if (lastCommand?.includes('停止音乐')) {
      currentState.music = true;
    } else if (lastCommand?.includes('音量增加')) {
      currentState.volume = Math.max(0, currentState.volume - 10);
    } else if (lastCommand?.includes('音量减少')) {
      currentState.volume = Math.min(100, currentState.volume + 10);
    }
  }
};
</script>

<style lang="less" scoped>
@primary-color: #4285f4;
@secondary-color: #34a853;
@accent-color: #ea4335;
@light-color: #f8f9fa;
@text-color: #202124;
@border-color: #dadce0;
@card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.command-pattern-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #5f6368;
  }
}

.content-wrapper {
  display: flex;
  gap: 25px;
}

.main-content {
  flex: 3;
}

.sidebar {
  flex: 1;
  min-width: 300px;
}

.section {
  background: @light-color;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h2 {
    color: @primary-color;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid fade(@primary-color, 20%);
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.concept-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      line-height: 1.6;
    }
  }
}

.analogy-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.restaurant-analogy {
  flex: 1;
  min-width: 300px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;
}

.analogy-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  .analogy-icon {
    font-size: 2rem;
  }

  h3 {
    color: @primary-color;
  }
}

.analogy-step {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid fade(@border-color, 50%);

  &:last-child {
    border-bottom: none;
  }

  .step-number {
    width: 30px;
    height: 30px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  h4 {
    color: @primary-color;
    margin-bottom: 5px;
  }
}

.analogy-diagram {
  flex: 1;
  min-width: 300px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;
}

.diagram {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 30px 0;

  .client,
  .command,
  .invoker,
  .receiver {
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
    z-index: 2;
    min-width: 80px;
  }

  .client {
    background: fade(@primary-color, 15%);
    border: 1px solid @primary-color;
  }

  .command {
    background: fade(@secondary-color, 15%);
    border: 1px solid @secondary-color;
  }

  .invoker {
    background: fade(#fbbc05, 15%);
    border: 1px solid #fbbc05;
  }

  .receiver {
    background: fade(@accent-color, 15%);
    border: 1px solid @accent-color;
  }

  .arrow {
    font-size: 1.5rem;
    color: #5f6368;
  }

  .connection {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #dadce0;
    z-index: 1;

    &.reverse {
      top: 70%;
      background: linear-gradient(to left, #dadce0 50%, transparent 50%);
      background-size: 10px 2px;
    }
  }
}

.diagram-key {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;

  .key-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;

    .key-box {
      width: 15px;
      height: 15px;
      border-radius: 3px;

      &.client {
        background: @primary-color;
      }

      &.command {
        background: @secondary-color;
      }

      &.invoker {
        background: #fbbc05;
      }

      &.receiver {
        background: @accent-color;
      }
    }
  }
}

.implementation {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.code-tabs {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: @card-shadow;

  .tab-buttons {
    display: flex;
    border-bottom: 1px solid @border-color;
    background: #f8f9fa;

    button {
      flex: 1;
      padding: 12px 20px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 0.95rem;
      color: #5f6368;
      transition: all 0.3s ease;

      &.active {
        background: white;
        color: @primary-color;
        font-weight: 500;
        border-bottom: 2px solid @primary-color;
      }

      &:hover:not(.active) {
        background: #e8eaed;
      }
    }
  }

  .tab-content {
    pre {
      padding: 20px;
      overflow-x: auto;
      background: #f8f9fa;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      max-height: 300px;
    }
  }
}

.demo-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;
}

.demo-actions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 20px;

  .action-btn {
    padding: 10px;
    background: @primary-color;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: darken(@primary-color, 10%);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(1px);
    }
  }
}

.demo-history {
  margin-bottom: 20px;

  h4 {
    margin-bottom: 10px;
    color: #5f6368;
  }

  .history-list {
    border: 1px solid @border-color;
    border-radius: 6px;
    padding: 10px;
    min-height: 100px;
    max-height: 200px;
    overflow-y: auto;
  }

  .history-item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .undo-btn {
      background: #f8f9fa;
      border: 1px solid @border-color;
      border-radius: 4px;
      padding: 2px 8px;
      font-size: 0.8rem;
      cursor: pointer;

      &:hover {
        background: #e8eaed;
      }
    }
  }

  .empty-history {
    color: #9aa0a6;
    text-align: center;
    padding: 20px;
  }
}

.demo-result {
  h4 {
    margin-bottom: 10px;
    color: #5f6368;
  }

  .result-content {
    border: 1px solid @border-color;
    border-radius: 6px;
    padding: 15px;
    background: #f8f9fa;

    pre {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      margin: 0;
    }
  }
}

.benefits-card,
.use-cases-card,
.comparison-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-color;
  }
}

.benefits-list {
  li {
    display: flex;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid fade(@border-color, 30%);

    &:last-child {
      border-bottom: none;
    }

    .benefit-icon {
      font-size: 1.5rem;
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h4 {
      color: @primary-color;
      margin-bottom: 5px;
    }

    p {
      color: #5f6368;
      font-size: 0.9rem;
    }
  }
}

.use-cases-list {
  padding-left: 20px;

  li {
    margin-bottom: 12px;
    padding-left: 25px;
    position: relative;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: @primary-color;
      font-size: 1.5rem;
      line-height: 1;
    }
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid @border-color;
  }

  th {
    background-color: fade(@primary-color, 8%);
    font-weight: 500;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
}

.applications {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.application-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;

  .app-icon {
    font-size: 2rem;
    color: @primary-color;
    margin-bottom: 15px;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 10px;
  }

  pre {
    background: #f1f3f4;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 0.85rem;
    margin-top: 15px;
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid @border-color;
  color: #5f6368;
  font-style: italic;
}

@media (max-width: 1100px) {
  .content-wrapper {
    flex-direction: column;
  }
}

@media (max-width: 768px) {

  .concept-grid,
  .analogy-container,
  .applications {
    grid-template-columns: 1fr;
  }

  .diagram {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;

    .client,
    .command,
    .invoker,
    .receiver,
    .arrow {
      margin-bottom: 15px;
    }

    .arrow {
      transform: rotate(90deg);
      margin-left: 40px;
    }

    .connection {
      display: none;
    }
  }
}
</style>
