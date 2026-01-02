<template>
  <div class="architecture-container">
    <header class="header">
      <h1>前端架构模式解析</h1>
      <p class="subtitle">深入理解MVC、MVP和MVVM设计模式</p>
    </header>

    <div class="intro-section">
      <div class="pattern-diagram">
        <div class="pattern mvc" @click="activePattern = 'mvc'">
          <div class="label">MVC</div>
          <div class="connections">
            <div class="arrow view-controller"></div>
            <div class="arrow controller-model"></div>
            <div class="arrow model-view"></div>
          </div>
        </div>
        <div class="pattern mvp" @click="activePattern = 'mvp'">
          <div class="label">MVP</div>
          <div class="connections">
            <div class="arrow view-presenter"></div>
            <div class="arrow presenter-model"></div>
            <div class="arrow model-presenter"></div>
          </div>
        </div>
        <div class="pattern mvvm" @click="activePattern = 'mvvm'">
          <div class="label">MVVM</div>
          <div class="connections">
            <div class="arrow view-viewmodel"></div>
            <div class="arrow viewmodel-model"></div>
            <div class="arrow model-viewmodel"></div>
          </div>
        </div>
      </div>
      <div class="intro-content">
        <p>架构模式是软件开发中的蓝图，为前端应用提供了组织代码的结构和方法。MVC、MVP和MVVM是三种广泛使用的前端架构模式，每种模式都有其独特的设计理念和适用场景。</p>
        <p>选择正确的架构模式可以提高代码的可维护性、可测试性和可扩展性。下面我们将深入探讨这三种模式的特点、优势和适用场景。</p>
      </div>
    </div>

    <div class="tabs">
      <button :class="{ active: activePattern === 'mvc' }" @click="activePattern = 'mvc'">
        MVC模式
      </button>
      <button :class="{ active: activePattern === 'mvp' }" @click="activePattern = 'mvp'">
        MVP模式
      </button>
      <button :class="{ active: activePattern === 'mvvm' }" @click="activePattern = 'mvvm'">
        MVVM模式
      </button>
    </div>

    <div class="pattern-detail">
      <div v-if="activePattern === 'mvc'" class="pattern-content mvc">
        <div class="pattern-header">
          <h2>MVC模式 (Model-View-Controller)</h2>
          <div class="pattern-logo">MVC</div>
        </div>

        <div class="definition">
          <h3>概念定义</h3>
          <p>MVC是一种将应用程序分为三个核心组件的架构模式：</p>
          <ul>
            <li><strong>Model（模型）</strong>：负责数据和业务逻辑</li>
            <li><strong>View（视图）</strong>：负责UI展示</li>
            <li><strong>Controller（控制器）</strong>：处理用户输入，协调Model和View</li>
          </ul>
        </div>

        <div class="design">
          <h3>设计思想</h3>
          <p>MVC的核心思想是关注点分离，通过明确划分职责来降低耦合度：</p>
          <ul>
            <li>用户操作通过Controller进入系统</li>
            <li>Controller更新Model状态</li>
            <li>Model通知View更新显示</li>
            <li>View从Model获取数据展示</li>
          </ul>
          <p>这种单向通信流程使各组件职责清晰，便于维护。</p>
        </div>

        <div class="comparison">
          <h3>与其他模式对比</h3>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>MVC</th>
                  <th>MVP</th>
                  <th>MVVM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>用户输入处理</td>
                  <td>Controller</td>
                  <td>Presenter</td>
                  <td>View/ViewModel</td>
                </tr>
                <tr>
                  <td>视图更新方式</td>
                  <td>观察者模式</td>
                  <td>手动更新</td>
                  <td>数据绑定</td>
                </tr>
                <tr>
                  <td>耦合度</td>
                  <td>中等</td>
                  <td>低</td>
                  <td>极低</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="usage">
          <h3>使用场景</h3>
          <ul>
            <li>传统Web应用（如Ruby on Rails, Spring MVC）</li>
            <li>需要清晰分离逻辑和展示的项目</li>
            <li>团队协作开发，不同开发者负责不同层</li>
            <li>需要同时提供多种用户界面的应用</li>
          </ul>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>关注点分离明确，职责清晰</li>
              <li>代码复用性好，Model可被多个View使用</li>
              <li>易于扩展和维护</li>
              <li>有利于并行开发</li>
            </ul>
          </div>
          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li>View和Model存在依赖关系</li>
              <li>对于复杂UI，Controller可能变得臃肿</li>
              <li>View更新需要手动操作</li>
              <li>学习曲线相对陡峭</li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="activePattern === 'mvp'" class="pattern-content mvp">
        <div class="pattern-header">
          <h2>MVP模式 (Model-View-Presenter)</h2>
          <div class="pattern-logo">MVP</div>
        </div>

        <div class="definition">
          <h3>概念定义</h3>
          <p>MVP是MVC的演化模式，由三个组件组成：</p>
          <ul>
            <li><strong>Model（模型）</strong>：数据和业务逻辑</li>
            <li><strong>View（视图）</strong>：UI展示和用户输入</li>
            <li><strong>Presenter（表示器）</strong>：作为View和Model之间的中介</li>
          </ul>
        </div>

        <div class="design">
          <h3>设计思想</h3>
          <p>MVP模式的核心改进在于解耦View和Model：</p>
          <ul>
            <li>View负责显示和用户交互</li>
            <li>Presenter监听View事件并更新Model</li>
            <li>Presenter从Model获取数据并更新View</li>
            <li>View和Model完全解耦，通过Presenter通信</li>
          </ul>
          <p>这种模式使View变得"被动"，仅负责显示Presenter提供的数据。</p>
        </div>

        <div class="comparison">
          <h3>与其他模式对比</h3>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>MVC</th>
                  <th>MVP</th>
                  <th>MVVM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>用户输入处理</td>
                  <td>Controller</td>
                  <td>Presenter</td>
                  <td>View/ViewModel</td>
                </tr>
                <tr>
                  <td>视图更新方式</td>
                  <td>观察者模式</td>
                  <td>手动更新</td>
                  <td>数据绑定</td>
                </tr>
                <tr>
                  <td>测试便利性</td>
                  <td>中等</td>
                  <td>高</td>
                  <td>高</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="usage">
          <h3>使用场景</h3>
          <ul>
            <li>需要高度可测试性的应用</li>
            <li>复杂用户界面应用</li>
            <li>Windows Forms和Android应用开发</li>
            <li>需要View和Model完全解耦的项目</li>
          </ul>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>View和Model完全解耦</li>
              <li>Presenter可复用，便于测试</li>
              <li>UI逻辑集中在Presenter，便于维护</li>
              <li>支持多个View共享同一个Presenter</li>
            </ul>
          </div>
          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li>Presenter可能变得臃肿</li>
              <li>需要手动维护View和Presenter的关系</li>
              <li>学习曲线较陡峭</li>
              <li>需要编写更多代码来连接各组件</li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="activePattern === 'mvvm'" class="pattern-content mvvm">
        <div class="pattern-header">
          <h2>MVVM模式 (Model-View-ViewModel)</h2>
          <div class="pattern-logo">MVVM</div>
        </div>

        <div class="definition">
          <h3>概念定义</h3>
          <p>MVVM是现代前端框架广泛采用的模式，包含三个组件：</p>
          <ul>
            <li><strong>Model（模型）</strong>：数据和业务逻辑</li>
            <li><strong>View（视图）</strong>：UI展示和用户输入</li>
            <li><strong>ViewModel（视图模型）</strong>：View的抽象，包含状态和命令</li>
          </ul>
        </div>

        <div class="design">
          <h3>设计思想</h3>
          <p>MVVM的核心是数据绑定和命令模式：</p>
          <ul>
            <li>View通过数据绑定自动同步ViewModel状态</li>
            <li>ViewModel暴露命令供View绑定用户操作</li>
            <li>Model的变化通过ViewModel反映到View</li>
            <li>双向数据绑定自动同步View和ViewModel</li>
          </ul>
          <p>这种模式大大减少了样板代码，使开发者可以更关注业务逻辑。</p>
        </div>

        <div class="comparison">
          <h3>与其他模式对比</h3>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>MVC</th>
                  <th>MVP</th>
                  <th>MVVM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>数据同步方式</td>
                  <td>手动</td>
                  <td>手动</td>
                  <td>自动（数据绑定）</td>
                </tr>
                <tr>
                  <td>代码量</td>
                  <td>中等</td>
                  <td>较多</td>
                  <td>较少</td>
                </tr>
                <tr>
                  <td>适用框架</td>
                  <td>Backbone.js</td>
                  <td>Android, GWT</td>
                  <td>Vue, Angular, React</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="usage">
          <h3>使用场景</h3>
          <ul>
            <li>数据驱动的复杂前端应用</li>
            <li>需要丰富用户交互的应用</li>
            <li>使用现代前端框架（如Vue、Angular、React）的项目</li>
            <li>需要实时更新UI的应用</li>
          </ul>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h3>优点</h3>
            <ul>
              <li>双向数据绑定减少样板代码</li>
              <li>View和Model完全解耦</li>
              <li>ViewModel可复用，便于测试</li>
              <li>开发效率高，代码简洁</li>
            </ul>
          </div>
          <div class="cons">
            <h3>缺点</h3>
            <ul>
              <li>数据绑定可能造成性能问题</li>
              <li>调试复杂数据流较困难</li>
              <li>学习曲线较陡峭</li>
              <li>过度使用可能导致大ViewModel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="conclusion">
      <h2>如何选择合适的架构模式？</h2>
      <div class="recommendations">
        <div class="recommendation">
          <h3>选择MVC当：</h3>
          <ul>
            <li>项目相对简单，不需要复杂的数据绑定</li>
            <li>需要清晰的职责分离</li>
            <li>团队熟悉传统MVC模式</li>
          </ul>
        </div>
        <div class="recommendation">
          <h3>选择MVP当：</h3>
          <ul>
            <li>需要高度可测试性</li>
            <li>View和Model需要完全解耦</li>
            <li>开发Windows桌面或Android应用</li>
          </ul>
        </div>
        <div class="recommendation">
          <h3>选择MVVM当：</h3>
          <ul>
            <li>使用现代前端框架（如Vue、Angular）</li>
            <li>需要丰富的数据驱动UI</li>
            <li>追求开发效率和代码简洁性</li>
          </ul>
        </div>
      </div>
      <p class="final-thought">
        在实际项目中，架构选择应考虑项目规模、团队经验、框架支持等因素。现代前端开发中，MVVM模式因其高效性和与框架的良好集成而广受欢迎，但理解所有模式的核心思想对于设计健壮的应用架构至关重要。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 当前激活的模式
const activePattern = ref<'mvc' | 'mvp' | 'mvvm'>('mvc');
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #3498db;
@mvc-color: #e74c3c;
@mvp-color: #2ecc71;
@mvvm-color: #9b59b6;
@dark-bg: #2c3e50;
@light-bg: #ecf0f1;
@text-color: #34495e;
@border-color: #bdc3c7;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.architecture-container {
  font-family: 'Roboto', 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: #f9f9f9;
  min-height: 100vh;

  .header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: linear-gradient(135deg, @dark-bg, lighten(@dark-bg, 10%));
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
    }
  }

  .intro-section {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    .intro-content {
      flex: 1;

      p {
        margin-bottom: 15px;
        line-height: 1.7;
        font-size: 1.1rem;
      }
    }

    .pattern-diagram {
      display: flex;
      justify-content: space-between;
      width: 350px;
      position: relative;

      .pattern {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: bold;
        color: white;
        z-index: 2;

        .label {
          font-size: 1.2rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .connections {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;

          .arrow {
            position: absolute;
            background: rgba(255, 255, 255, 0.7);
            height: 4px;
            transform-origin: left center;
            z-index: 1;

            &::after {
              content: '';
              position: absolute;
              right: -6px;
              top: -4px;
              border: 6px solid transparent;
            }
          }
        }

        &:hover {
          transform: scale(1.1);
        }
      }

      .mvc {
        background: @mvc-color;
        box-shadow: 0 4px 15px fade(@mvc-color, 40%);

        .view-controller {
          width: 140px;
          top: 50%;
          left: 100%;
          transform: translateY(-50%) rotate(0deg);

          &::after {
            border-left-color: rgba(255, 255, 255, 0.7);
          }
        }

        .controller-model {
          width: 140px;
          top: 50%;
          left: 100%;
          transform: translateY(-50%) rotate(60deg);

          &::after {
            border-left-color: rgba(255, 255, 255, 0.7);
          }
        }

        .model-view {
          width: 140px;
          top: 50%;
          left: 100%;
          transform: translateY(-50%) rotate(-60deg);

          &::after {
            border-left-color: rgba(255, 255, 255, 0.7);
          }
        }
      }

      .mvp {
        background: @mvp-color;
        box-shadow: 0 4px 15px fade(@mvp-color, 40%);

        .view-presenter {
          width: 140px;
          top: 50%;
          left: 100%;
          transform: translateY(-50%) rotate(0deg);

          &::after {
            border-left-color: rgba(255, 255, 255, 0.7);
          }
        }

        .presenter-model {
          width: 140px;
          top: 50%;
          left: 100%;
          transform: translateY(-50%) rotate(60deg);

          &::after {
            border-left-color: rgba(255, 255, 255, 0.7);
          }
        }

        .model-presenter {
          width: 140px;
          top: 50%;
          left: 100%;
          transform: translateY(-50%) rotate(-60deg);

          &::after {
            border-left-color: rgba(255, 255, 255, 0.7);
          }
        }
      }

      .mvvm {
        background: @mvvm-color;
        box-shadow: 0 4px 15px fade(@mvvm-color, 40%);

        .view-viewmodel {
          width: 140px;
          top: 50%;
          left: 100%;
          transform: translateY(-50%) rotate(0deg);

          &::after {
            border-left-color: rgba(255, 255, 255, 0.7);
          }
        }

        .viewmodel-model {
          width: 140px;
          top: 50%;
          left: 100%;
          transform: translateY(-50%) rotate(60deg);

          &::after {
            border-left-color: rgba(255, 255, 255, 0.7);
          }
        }

        .model-viewmodel {
          width: 140px;
          top: 50%;
          left: 100%;
          transform: translateY(-50%) rotate(-60deg);

          &::after {
            border-left-color: rgba(255, 255, 255, 0.7);
          }
        }
      }
    }
  }

  .tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    button {
      padding: 12px 30px;
      font-size: 1.1rem;
      font-weight: 500;
      border: none;
      background: @light-bg;
      color: @text-color;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 0 5px;
      border-radius: 30px;

      &:hover {
        background: darken(@light-bg, 5%);
      }

      &.active {
        color: white;

        &:nth-child(1) {
          background: @mvc-color;
          box-shadow: 0 4px 12px fade(@mvc-color, 40%);
        }

        &:nth-child(2) {
          background: @mvp-color;
          box-shadow: 0 4px 12px fade(@mvp-color, 40%);
        }

        &:nth-child(3) {
          background: @mvvm-color;
          box-shadow: 0 4px 12px fade(@mvvm-color, 40%);
        }
      }
    }
  }

  .pattern-detail {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    margin-bottom: 40px;

    .pattern-content {
      padding: 30px;

      .pattern-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid @border-color;

        h2 {
          font-size: 2rem;
        }

        .pattern-logo {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
        }
      }

      &.mvc {
        .pattern-logo {
          background: @mvc-color;
          box-shadow: 0 4px 15px fade(@mvc-color, 40%);
        }

        h3 {
          color: @mvc-color;
        }
      }

      &.mvp {
        .pattern-logo {
          background: @mvp-color;
          box-shadow: 0 4px 15px fade(@mvp-color, 40%);
        }

        h3 {
          color: @mvp-color;
        }
      }

      &.mvvm {
        .pattern-logo {
          background: @mvvm-color;
          box-shadow: 0 4px 15px fade(@mvvm-color, 40%);
        }

        h3 {
          color: @mvvm-color;
        }
      }
    }

    h3 {
      font-size: 1.5rem;
      margin: 25px 0 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid @border-color;
    }

    p {
      line-height: 1.7;
      margin-bottom: 15px;
      font-size: 1.1rem;
    }

    ul {
      padding-left: 25px;
      margin-bottom: 20px;

      li {
        margin-bottom: 10px;
        line-height: 1.6;
      }
    }

    .comparison-table {
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;

        th,
        td {
          padding: 15px;
          text-align: left;
          border: 1px solid @border-color;
        }

        th {
          background: @light-bg;
          font-weight: 500;
        }

        tr:nth-child(even) {
          background: lighten(@light-bg, 3%);
        }
      }
    }

    .pros-cons {
      display: flex;
      gap: 30px;
      margin-top: 30px;

      .pros,
      .cons {
        flex: 1;
        padding: 20px;
        border-radius: 8px;
      }

      .pros {
        background: fade(@mvp-color, 10%);
        border-left: 4px solid @mvp-color;
      }

      .cons {
        background: fade(@mvc-color, 10%);
        border-left: 4px solid @mvc-color;
      }
    }
  }

  .conclusion {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

    h2 {
      font-size: 1.8rem;
      text-align: center;
      margin-bottom: 30px;
      color: @dark-bg;
    }

    .recommendations {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;

      .recommendation {
        flex: 1;
        padding: 20px;
        border-radius: 8px;
        background: @light-bg;

        h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: @primary-color;
        }

        ul {
          padding-left: 20px;
        }
      }
    }

    .final-thought {
      font-size: 1.1rem;
      line-height: 1.8;
      padding: 20px;
      background: fade(@primary-color, 8%);
      border-radius: 8px;
      border-left: 4px solid @primary-color;
    }
  }

  // 响应式设计
  @media (max-width: 900px) {
    .intro-section {
      flex-direction: column;

      .pattern-diagram {
        width: 100%;
        justify-content: center;
        gap: 20px;
      }
    }

    .pros-cons {
      flex-direction: column;
    }

    .conclusion .recommendations {
      flex-direction: column;
    }
  }

  @media (max-width: 600px) {
    .header h1 {
      font-size: 2rem;
    }

    .tabs {
      flex-direction: column;

      button {
        margin: 5px 0;
      }
    }

    .pattern-diagram {
      flex-direction: column;
      align-items: center;
      gap: 50px;
    }
  }
}
</style>
