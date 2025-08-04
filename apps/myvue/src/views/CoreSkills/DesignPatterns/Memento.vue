<template>
  <div class="memento-container">
    <!-- 头部区域 -->
    <header class="header">
      <div class="header-content">
        <h1>备忘录模式 <span class="pattern-tag">行为型设计模式</span></h1>
        <p class="subtitle">在不破坏封装性的前提下，捕获并保存对象的内部状态，以便之后恢复</p>
        <div class="pattern-attributes">
          <div class="attribute">
            <div class="attr-icon">🔄</div>
            <div class="attr-text">状态恢复</div>
          </div>
          <div class="attribute">
            <div class="attr-icon">📦</div>
            <div class="attr-text">对象封装</div>
          </div>
          <div class="attribute">
            <div class="attr-icon">⏱️</div>
            <div class="attr-text">历史状态</div>
          </div>
        </div>
      </div>
      <div class="header-visual">
        <div class="state-flow">
          <div class="state-card" v-for="(state, index) in states" :key="index">
            <div class="state-index">状态 #{{ index + 1 }}</div>
            <div class="state-content">
              <div v-for="(value, key) in state" :key="key" class="state-item">
                <span class="state-key">{{ key }}:</span> {{ value }}
              </div>
            </div>
          </div>
        </div>
        <div class="flow-controls">
          <button class="flow-btn" @click="addState">保存状态</button>
          <button class="flow-btn restore" @click="restoreState">恢复状态</button>
        </div>
      </div>
    </header>

    <div class="main-content">
      <!-- 模式结构卡片 -->
      <div class="pattern-structure">
        <h2 class="section-title">模式结构</h2>
        <div class="structure-cards">
          <div class="struct-card">
            <div class="struct-icon">📝</div>
            <h3>发起人 (Originator)</h3>
            <p>需要保存状态的对象</p>
            <ul>
              <li>创建备忘录</li>
              <li>使用备忘录恢复状态</li>
              <li>包含需要保存的业务数据</li>
            </ul>
          </div>

          <div class="struct-card">
            <div class="struct-icon">💾</div>
            <h3>备忘录 (Memento)</h3>
            <p>存储发起人对象状态的载体</p>
            <ul>
              <li>存储发起人的内部状态</li>
              <li>防止发起人以外的对象访问</li>
              <li>提供窄接口给管理者</li>
            </ul>
          </div>

          <div class="struct-card">
            <div class="struct-icon">🗂️</div>
            <h3>管理者 (Caretaker)</h3>
            <p>负责保存备忘录对象</p>
            <ul>
              <li>不能对备忘录内容进行操作或检查</li>
              <li>可以保存多个备忘录</li>
              <li>提供历史记录功能</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 示例代码 -->
      <div class="code-section">
        <h2 class="section-title">代码实现</h2>

        <div class="code-tabs">
          <div class="tabs">
            <button v-for="(tab, index) in codeTabs" :key="index" :class="{ active: activeCodeTab === index }"
              @click="activeCodeTab = index">
              {{ tab.title }}
            </button>
          </div>

          <div class="tab-content">
            <!-- 备忘录类 -->
            <div v-if="activeCodeTab === 0" class="tab-pane">
              <pre><code>// 备忘录类 - 存储编辑器状态
class EditorMemento {
  private content: string;
  private cursorPosition: number;
  private selection: string;

  constructor(content: string, cursorPosition: number, selection: string) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.selection = selection;
  }

  // 获取保存的状态（仅供发起人访问）
  getState() {
    return {
      content: this.content,
      cursorPosition: this.cursorPosition,
      selection: this.selection
    };
  }
}</code></pre>
            </div>

            <!-- 发起人类 -->
            <div v-if="activeCodeTab === 1" class="tab-pane">
              <pre><code>// 发起人 - 文本编辑器
class TextEditor {
  private content: string = '';
  private cursorPosition: number = 0;
  private selection: string = '';

  // 输入文本
  type(text: string) {
    this.content = this.content.slice(0, this.cursorPosition) +
                   text +
                   this.content.slice(this.cursorPosition);
    this.cursorPosition += text.length;
    this.selection = '';
  }

  // 选择文本
  select(start: number, end: number) {
    this.selection = this.content.substring(start, end);
  }

  // 删除选中文本
  deleteSelection() {
    if (!this.selection) return;
    // 实现删除逻辑...
    this.selection = '';
  }

  // 创建备忘录 - 保存当前状态
  save(): EditorMemento {
    return new EditorMemento(
      this.content,
      this.cursorPosition,
      this.selection
    );
  }

  // 从备忘录恢复状态
  restore(memento: EditorMemento) {
    const state = memento.getState();
    this.content = state.content;
    this.cursorPosition = state.cursorPosition;
    this.selection = state.selection;
  }

  // 显示当前状态
  display() {
    console.log(`内容: ${this.content}`);
    console.log(`光标位置: ${this.cursorPosition}`);
    console.log(`选中内容: ${this.selection || '无'}`);
  }
}</code></pre>
            </div>

            <!-- 管理者类 -->
            <div v-if="activeCodeTab === 2" class="tab-pane">
              <pre><code>// 管理者 - 历史记录管理器
class HistoryManager {
  private mementos: EditorMemento[] = [];
  private currentIndex: number = -1;

  // 保存状态到历史记录
  saveState(memento: EditorMemento) {
    // 如果当前不是最新状态，清除后面状态
    if (this.currentIndex < this.mementos.length - 1) {
      this.mementos = this.mementos.slice(0, this.currentIndex + 1);
    }

    this.mementos.push(memento);
    this.currentIndex = this.mementos.length - 1;
  }

  // 撤销操作
  undo(): EditorMemento | null {
    if (this.currentIndex <= 0) return null;
    this.currentIndex--;
    return this.mementos[this.currentIndex];
  }

  // 重做操作
  redo(): EditorMemento | null {
    if (this.currentIndex >= this.mementos.length - 1) return null;
    this.currentIndex++;
    return this.mementos[this.currentIndex];
  }

  // 获取历史记录列表
  getHistory(): EditorMemento[] {
    return this.mementos;
  }
}

// 使用示例
const editor = new TextEditor();
const history = new HistoryManager();

// 编辑操作
editor.type('备忘录模式');
history.saveState(editor.save());

editor.type(' 是一种行为设计模式');
history.saveState(editor.save());

editor.type('允许保存和恢复对象状态');
history.saveState(editor.save());

// 恢复到第一次保存的状态
const firstState = history.getHistory()[0];
editor.restore(firstState);
editor.display();</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="use-cases">
        <h2 class="section-title">使用场景</h2>

        <div class="use-case-cards">
          <div class="case-card">
            <div class="case-icon">📝</div>
            <h3>文本编辑器</h3>
            <p>实现撤销/重做功能</p>
            <div class="case-details">
              <ul>
                <li>保存文档编辑状态</li>
                <li>支持多级撤销</li>
                <li>保存光标位置和选择</li>
              </ul>
            </div>
          </div>

          <div class="case-card">
            <div class="case-icon">🎮</div>
            <h3>游戏开发</h3>
            <p>保存和恢复游戏状态</p>
            <div class="case-details">
              <ul>
                <li>实现游戏存档功能</li>
                <li>玩家位置和状态保存</li>
                <li>游戏进度保存</li>
              </ul>
            </div>
          </div>

          <div class="case-card">
            <div class="case-icon">📊</div>
            <h3>表单编辑</h3>
            <p>表单状态恢复</p>
            <div class="case-details">
              <ul>
                <li>复杂表单编辑撤销</li>
                <li>多步骤表单状态保存</li>
                <li>防止数据意外丢失</li>
              </ul>
            </div>
          </div>

          <div class="case-card">
            <div class="case-icon">🖥️</div>
            <h3>图形编辑器</h3>
            <p>绘图操作历史</p>
            <div class="case-details">
              <ul>
                <li>保存图形对象状态</li>
                <li>支持操作回退</li>
                <li>图层状态保存</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 优缺点分析 -->
      <div class="pros-cons">
        <h2 class="section-title">优缺点分析</h2>

        <div class="comparison">
          <div class="pros">
            <h3><span class="check-icon">✓</span> 优点</h3>
            <ul>
              <li>
                <div class="advantage">封装保存状态细节</div>
                <p>发起人无需暴露内部状态实现细节</p>
              </li>
              <li>
                <div class="advantage">简化发起人代码</div>
                <p>将状态保存和恢复的责任分离</p>
              </li>
              <li>
                <div class="advantage">支持多次撤销</div>
                <p>管理者可以存储多个状态历史</p>
              </li>
              <li>
                <div class="advantage">符合单一职责原则</div>
                <p>状态管理职责被分离到备忘录和管理者</p>
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3><span class="warning-icon">⚠️</span> 缺点</h3>
            <ul>
              <li>
                <div class="disadvantage">资源消耗</div>
                <p>频繁保存状态可能消耗大量内存</p>
              </li>
              <li>
                <div class="disadvantage">管理者职责</div>
                <p>管理者需要知道何时保存和恢复状态</p>
              </li>
              <li>
                <div class="disadvantage">状态暴露风险</div>
                <p>如果不注意，可能暴露发起人的内部状态</p>
              </li>
              <li>
                <div class="disadvantage">深层嵌套对象</div>
                <p>对于嵌套对象，保存状态可能更复杂</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 与其他模式的关系 -->
      <div class="pattern-relations">
        <h2 class="section-title">与其他模式的关系</h2>

        <div class="relation-cards">
          <div class="relation-card">
            <h3>命令模式</h3>
            <p>备忘录模式可用于实现可撤销操作，命令模式使用备忘录保存被执行命令的状态</p>
            <div class="relation-strength">强关联</div>
          </div>

          <div class="relation-card">
            <h3>原型模式</h3>
            <p>如果需要保存状态的副本，备忘录可以直接使用原型模式克隆发起人的状态</p>
            <div class="relation-strength">中关联</div>
          </div>

          <div class="relation-card">
            <h3>状态模式</h3>
            <p>状态模式中使用备忘录保存上一个状态，便于状态回滚</p>
            <div class="relation-strength">弱关联</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <footer class="summary">
      <div class="summary-content">
        <h2>备忘录模式总结</h2>

        <div class="key-points">
          <div class="point">
            <div class="point-icon">💡</div>
            <p>当需要提供<span class="highlight">撤销操作</span>功能时使用备忘录模式</p>
          </div>
          <div class="point">
            <div class="point-icon">💡</div>
            <p>当直接访问对象的内部状态可能<span class="highlight">破坏封装性</span>时使用</p>
          </div>
          <div class="point">
            <div class="point-icon">💡</div>
            <p>备忘录实现了<span class="highlight">状态保存</span>与<span class="highlight">对象分离</span></p>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践：</h3>
          <ul>
            <li>只保存必要的状态数据以减少内存使用</li>
            <li>使用增量保存技术存储状态变化而非完整状态</li>
            <li>考虑使用序列化技术存储备忘录对象</li>
            <li>设置历史记录深度限制以防内存溢出</li>
            <li>对于复杂对象，考虑使用代理模式实现状态捕捉</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 状态管理演示
const states = ref<Record<string, any>[]>([]);
let stateCounter = 1;

const addState = () => {
  states.value.push({
    content: `文档内容版本 ${stateCounter}`,
    cursorPosition: Math.floor(Math.random() * 100),
    selection: stateCounter % 3 === 0 ? '选中文本' : '',
    timestamp: new Date().toLocaleTimeString()
  });
  stateCounter++;
};

const restoreState = () => {
  if (states.value.length > 0) {
    const lastIndex = states.value.length - 1;
    const restoreIndex = Math.max(0, lastIndex - 1);

    states.value = states.value.slice(0, restoreIndex + 1);
    stateCounter = restoreIndex + 2;
  }
};

// 代码标签页
const codeTabs = [
  { title: '备忘录类' },
  { title: '发起人类' },
  { title: '管理者类' }
];
const activeCodeTab = ref(0);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@warning-color: #f72585;
@success-color: #2ec4b6;
@text-color: #2b2d42;
@light-bg: #f8f9fa;
@dark-bg: #2b2d42;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;

.memento-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background: linear-gradient(to bottom, #f0f4f8, #e2e8f0);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  .header {
    display: flex;
    flex-wrap: wrap;
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;

    .header-content {
      flex: 1;
      min-width: 300px;
      padding: 40px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;

      h1 {
        font-size: 2.5rem;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 15px;
        flex-wrap: wrap;

        .pattern-tag {
          background: rgba(255, 255, 255, 0.2);
          font-size: 1rem;
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: 500;
        }
      }

      .subtitle {
        font-size: 1.3rem;
        opacity: 0.9;
        margin-bottom: 30px;
        line-height: 1.5;
      }

      .pattern-attributes {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;

        .attribute {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.15);
          padding: 10px 20px;
          border-radius: 50px;

          .attr-icon {
            font-size: 1.5rem;
          }

          .attr-text {
            font-weight: 500;
          }
        }
      }
    }

    .header-visual {
      flex: 1;
      min-width: 300px;
      padding: 30px;
      background: @light-bg;
      display: flex;
      flex-direction: column;

      .state-flow {
        flex: 1;
        display: flex;
        overflow-x: auto;
        gap: 15px;
        padding: 10px 0;

        .state-card {
          flex-shrink: 0;
          width: 250px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border: 2px solid rgba(@primary-color, 0.3);

          .state-index {
            background: linear-gradient(135deg, @accent-color, @primary-color);
            color: white;
            padding: 10px 15px;
            font-weight: 600;
          }

          .state-content {
            padding: 15px;

            .state-item {
              margin-bottom: 10px;
              padding-bottom: 10px;
              border-bottom: 1px dashed #eee;

              &:last-child {
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
              }

              .state-key {
                font-weight: 600;
                color: @primary-color;
              }
            }
          }
        }
      }

      .flow-controls {
        display: flex;
        gap: 15px;
        padding-top: 20px;
        justify-content: center;

        .flow-btn {
          background: @primary-color;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(@primary-color, 0.3);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(@primary-color, 0.4);
          }

          &.restore {
            background: @success-color;
            box-shadow: 0 4px 8px rgba(@success-color, 0.3);

            &:hover {
              box-shadow: 0 6px 12px rgba(@success-color, 0.4);
            }
          }
        }
      }
    }
  }

  .main-content {
    .section-title {
      font-size: 1.8rem;
      color: @secondary-color;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 3px solid rgba(@primary-color, 0.3);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 80px;
        height: 3px;
        background: @primary-color;
        border-radius: 3px;
      }
    }

    .pattern-structure {
      background: white;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

      .structure-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 25px;

        .struct-card {
          flex: 1;
          min-width: 300px;
          background: @light-bg;
          border-radius: 15px;
          padding: 25px;
          border-top: 4px solid @primary-color;

          .struct-icon {
            font-size: 2.5rem;
            margin-bottom: 15px;
          }

          h3 {
            margin-top: 0;
            color: @secondary-color;
            font-size: 1.4rem;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(@primary-color, 0.2);
          }

          p {
            font-weight: 500;
            color: #555;
            margin-bottom: 15px;
          }

          ul {
            padding-left: 20px;

            li {
              margin-bottom: 10px;
              position: relative;
              padding-left: 25px;

              &::before {
                content: '•';
                color: @primary-color;
                font-weight: bold;
                position: absolute;
                left: 10px;
                top: 0;
                font-size: 1.2rem;
              }
            }
          }
        }
      }
    }

    .code-section {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      margin-bottom: 30px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

      .code-tabs {
        .tabs {
          display: flex;
          background: @dark-bg;
          padding: 0 20px;

          button {
            padding: 15px 25px;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;

            &.active {
              color: white;
              font-weight: 600;

              &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 70%;
                height: 3px;
                background: @accent-color;
                border-radius: 3px 3px 0 0;
              }
            }

            &:hover:not(.active) {
              color: white;
              background: rgba(255, 255, 255, 0.1);
            }
          }
        }

        .tab-content {
          .tab-pane {
            pre {
              margin: 0;
              padding: 25px;
              overflow-x: auto;
              background: @code-bg;
              color: #f8f8f2;

              code {
                font-family: 'Fira Code', 'Consolas', monospace;
                line-height: 1.6;
                font-size: 0.95rem;
              }
            }
          }
        }
      }
    }

    .use-cases {
      background: white;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

      .use-case-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 25px;

        .case-card {
          background: @light-bg;
          border-radius: 15px;
          overflow: hidden;
          transition: transform 0.3s ease;
          border: 1px solid rgba(@primary-color, 0.1);

          &:hover {
            transform: translateY(-8px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }

          .case-icon {
            background: linear-gradient(135deg, @primary-color, @secondary-color);
            color: white;
            font-size: 2rem;
            padding: 20px;
            display: flex;
            justify-content: center;
          }

          h3 {
            color: @secondary-color;
            text-align: center;
            margin: 15px 0 10px;
            font-size: 1.4rem;
          }

          p {
            text-align: center;
            font-weight: 500;
            color: #555;
            margin-bottom: 15px;
          }

          .case-details {
            padding: 0 20px 20px;

            ul {
              padding-left: 20px;

              li {
                margin-bottom: 10px;
                position: relative;
                padding-left: 25px;

                &::before {
                  content: '✓';
                  color: @success-color;
                  font-weight: bold;
                  position: absolute;
                  left: 5px;
                  top: 0;
                }
              }
            }
          }
        }
      }
    }

    .pros-cons {
      background: white;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

      .comparison {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;

        .pros,
        .cons {
          flex: 1;
          min-width: 300px;

          h3 {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.6rem;
            color: @secondary-color;
            margin-top: 0;
            padding-bottom: 15px;
            border-bottom: 2px solid rgba(@primary-color, 0.2);

            .check-icon {
              color: @success-color;
              background: rgba(@success-color, 0.1);
              width: 36px;
              height: 36px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .warning-icon {
              color: @warning-color;
              background: rgba(@warning-color, 0.1);
              width: 36px;
              height: 36px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          ul {
            list-style: none;
            padding: 0;

            li {
              margin-bottom: 25px;
              padding-left: 40px;
              position: relative;

              .advantage {
                font-weight: 600;
                font-size: 1.1rem;
                color: darken(@success-color, 15%);
                margin-bottom: 5px;
              }

              .disadvantage {
                font-weight: 600;
                font-size: 1.1rem;
                color: @warning-color;
                margin-bottom: 5px;
              }

              p {
                margin: 5px 0 0;
                color: #555;
              }

              &::before {
                position: absolute;
                left: 0;
                top: 5px;
                font-size: 1.5rem;
              }
            }
          }
        }

        .pros ul li::before {
          content: '✓';
          color: @success-color;
        }

        .cons ul li::before {
          content: '⚠️';
          color: @warning-color;
        }
      }
    }

    .pattern-relations {
      background: white;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

      .relation-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 25px;

        .relation-card {
          flex: 1;
          min-width: 300px;
          background: @light-bg;
          border-radius: 15px;
          padding: 25px;
          border-left: 4px solid @accent-color;
          position: relative;
          overflow: hidden;

          h3 {
            margin-top: 0;
            color: @secondary-color;
            font-size: 1.4rem;
          }

          p {
            color: #555;
            line-height: 1.6;
          }

          .relation-strength {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(@primary-color, 0.1);
            color: @primary-color;
            padding: 3px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
          }
        }
      }
    }
  }

  .summary {
    background: linear-gradient(135deg, @dark-bg, lighten(@dark-bg, 5%));
    color: white;
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);

    .summary-content {
      max-width: 800px;
      margin: 0 auto;

      h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 30px;
        color: #ffde7d;
      }

      .key-points {
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
        justify-content: center;
        margin-bottom: 30px;

        .point {
          flex: 1;
          min-width: 300px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 15px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.12);
          }

          .point-icon {
            font-size: 2rem;
            flex-shrink: 0;
          }

          p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin: 0;

            .highlight {
              color: @accent-color;
              font-weight: 500;
            }
          }
        }
      }

      .best-practices {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 15px;
        padding: 25px;

        h3 {
          color: #ffde7d;
          margin-top: 0;
          font-size: 1.4rem;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 15px;
            padding-left: 25px;
            position: relative;
            line-height: 1.6;

            &::before {
              content: '•';
              color: @accent-color;
              font-weight: bold;
              position: absolute;
              left: 10px;
              top: 0;
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
  }

  .header-content,
  .header-visual {
    min-width: 100% !important;
  }

  .structure-cards,
  .use-case-cards,
  .relation-cards {
    flex-direction: column;
  }
}
</style>