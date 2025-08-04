<template>
  <div class="pattern-comparison">
    <header class="pattern-header">
      <div class="header-content">
        <h1>MVVM vs MVC vs MVP 架构模式解析</h1>
        <p class="subtitle">深入理解前端架构设计的核心思想</p>
      </div>
    </header>

    <main class="content-container">
      <!-- 简介 -->
      <section class="section introduction-section">
        <h2 class="section-title">
          <span class="icon">📚</span>
          架构模式简介
        </h2>

        <div class="intro-content">
          <p>前端架构模式是软件工程中的重要概念，它们定义了应用程序的结构与组件之间的交互方式。MVC、MVP和MVVM是目前前端开发中最常用的三种架构模式。</p>

          <div class="pattern-cards">
            <div class="pattern-card mvc">
              <div class="pattern-icon">M</div>
              <h3>MVC</h3>
              <p>模型(Model)-视图(View)-控制器(Controller)</p>
            </div>
            <div class="pattern-card mvp">
              <div class="pattern-icon">P</div>
              <h3>MVP</h3>
              <p>模型(Model)-视图(View)-表示器(Presenter)</p>
            </div>
            <div class="pattern-card mvvm">
              <div class="pattern-icon">V</div>
              <h3>MVVM</h3>
              <p>模型(Model)-视图(View)-视图模型(ViewModel)</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心对比表格 -->
      <section class="section comparison-section">
        <h2 class="section-title">
          <span class="icon">📊</span>
          核心特性对比
        </h2>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>对比维度</th>
                <th>MVC</th>
                <th>MVP</th>
                <th>MVVM</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>提出时间</td>
                <td>1979年 (Smalltalk)</td>
                <td>1990年代 (微软)</td>
                <td>2005年 (微软WPF)</td>
              </tr>
              <tr>
                <td>核心思想</td>
                <td>分离数据、UI和控制逻辑</td>
                <td>视图被Presenter被动更新</td>
                <td>数据绑定自动化视图更新</td>
              </tr>
              <tr>
                <td>组件间通信</td>
                <td>双向通信</td>
                <td>通过接口通信</td>
                <td>数据绑定</td>
              </tr>
              <tr>
                <td>视图状态</td>
                <td>视图持有模型引用</td>
                <td>视图被Presenter控制</td>
                <td>视图无状态</td>
              </tr>
              <tr>
                <td>测试难度</td>
                <td>较高（视图耦合）</td>
                <td>较低（视图可模拟）</td>
                <td>最低（业务逻辑独立）</td>
              </tr>
              <tr>
                <td>学习曲线</td>
                <td>较低</td>
                <td>中等</td>
                <td>较陡峭</td>
              </tr>
              <tr>
                <td>适用场景</td>
                <td>传统Web应用</td>
                <td>复杂桌面应用</td>
                <td>现代SPA应用</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- MVC基础介绍 -->
      <section class="section pattern-detail mvc">
        <h2 class="section-title">
          <span class="icon">🧱</span>
          MVC 模式基础介绍
        </h2>

        <div class="pattern-diagram">
          <div class="model">Model<br><span>数据与业务逻辑</span></div>
          <div class="arrows">
            <div class="arrow-up">通知更新</div>
            <div class="arrow-down">读取数据</div>
          </div>
          <div class="controller">Controller<br><span>处理用户输入</span></div>
          <div class="arrows">
            <div class="arrow-up">用户操作</div>
            <div class="arrow-down">更新视图</div>
          </div>
          <div class="view">View<br><span>UI展示</span></div>

          <div class="dashed-arrow">直接修改</div>
        </div>

        <div class="pattern-explanation">
          <div class="pattern-section">
            <h3>核心概念</h3>
            <ul>
              <li><strong>Model</strong> - 管理应用程序的数据和业务逻辑</li>
              <li><strong>View</strong> - 负责数据的可视化展示</li>
              <li><strong>Controller</strong> - 处理用户输入，协调模型和视图</li>
            </ul>
          </div>

          <div class="pattern-section">
            <h3>工作流程</h3>
            <ol>
              <li>用户与视图交互（如点击按钮）</li>
              <li>视图将事件传递给控制器</li>
              <li>控制器处理请求，更新模型</li>
              <li>模型通知视图数据发生变化</li>
              <li>视图从模型获取最新数据并更新UI</li>
            </ol>
          </div>

          <div class="pattern-section">
            <h3>实现框架</h3>
            <div class="frameworks">
              <div class="framework">Backbone.js</div>
              <div class="framework">Angular.js</div>
              <div class="framework">Ruby on Rails</div>
              <div class="framework">Spring MVC</div>
            </div>
          </div>

          <div class="pattern-section">
            <h3>优缺点分析</h3>
            <div class="pros-cons">
              <div class="pros">
                <h4>✅ 优点</h4>
                <ul>
                  <li>职责分离清晰</li>
                  <li>模型可复用性高</li>
                  <li>学习曲线平缓</li>
                  <li>广泛支持和文档资源</li>
                </ul>
              </div>
              <div class="cons">
                <h4>❌ 缺点</h4>
                <ul>
                  <li>视图和控制器可能紧密耦合</li>
                  <li>视图可能直接访问模型</li>
                  <li>大型应用中控制器可能变得臃肿</li>
                  <li>测试困难（视图依赖）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- MVP基础介绍 -->
      <section class="section pattern-detail mvp">
        <h2 class="section-title">
          <span class="icon">🧱</span>
          MVP 模式基础介绍
        </h2>

        <div class="pattern-diagram">
          <div class="model">Model<br><span>数据与业务逻辑</span></div>
          <div class="presenter">Presenter<br><span>中间协调者</span></div>
          <div class="view">View<br><span>UI展示</span></div>

          <div class="arrow-right">获取/更新数据</div>
          <div class="arrow-left">通知更新</div>
          <div class="arrow-down">用户操作</div>
          <div class="arrow-up">更新UI</div>
        </div>

        <div class="pattern-explanation">
          <div class="pattern-section">
            <h3>核心概念</h3>
            <ul>
              <li><strong>Model</strong> - 管理应用程序的数据和业务逻辑</li>
              <li><strong>View</strong> - 被动界面，通过接口与Presenter通信</li>
              <li><strong>Presenter</strong> - 协调模型和视图之间的交互</li>
            </ul>
          </div>

          <div class="pattern-section">
            <h3>工作流程</h3>
            <ol>
              <li>用户与视图交互</li>
              <li>视图将事件委托给Presenter</li>
              <li>Presenter处理业务逻辑并更新模型</li>
              <li>Presenter从模型获取数据</li>
              <li>Presenter通过视图接口更新视图</li>
            </ol>
          </div>

          <div class="pattern-section">
            <h3>实现框架</h3>
            <div class="frameworks">
              <div class="framework">Android框架</div>
              <div class="framework">GWT (Google Web Toolkit)</div>
              <div class="framework">Windows Forms应用</div>
            </div>
          </div>

          <div class="pattern-section">
            <h3>优缺点分析</h3>
            <div class="pros-cons">
              <div class="pros">
                <h4>✅ 优点</h4>
                <ul>
                  <li>视图被动，易于测试</li>
                  <li>解耦视图和模型</li>
                  <li>支持多个视图共享Presenter</li>
                  <li>清晰的接口定义</li>
                </ul>
              </div>
              <div class="cons">
                <h4>❌ 缺点</h4>
                <ul>
                  <li>接口数量可能过多</li>
                  <li>Presenter可能变得臃肿</li>
                  <li>学习曲线较MVC陡峭</li>
                  <li>需要手动更新视图</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- MVVM基础介绍 -->
      <section class="section pattern-detail mvvm">
        <h2 class="section-title">
          <span class="icon">🧱</span>
          MVVM 模式基础介绍
        </h2>

        <div class="pattern-diagram">
          <div class="model">Model<br><span>数据与业务逻辑</span></div>
          <div class="viewmodel">ViewModel<br><span>视图状态与行为</span></div>
          <div class="view">View<br><span>UI展示</span></div>

          <div class="double-arrow">数据绑定</div>
          <div class="arrow-right">获取/更新数据</div>
          <div class="arrow-left">数据变化通知</div>
        </div>

        <div class="pattern-explanation">
          <div class="pattern-section">
            <h3>核心概念</h3>
            <ul>
              <li><strong>Model</strong> - 应用程序的数据和业务逻辑</li>
              <li><strong>View</strong> - 声明式UI，绑定到视图模型</li>
              <li><strong>ViewModel</strong> - 视图的抽象，包含状态和命令</li>
            </ul>
          </div>

          <div class="pattern-section">
            <h3>工作流程</h3>
            <ol>
              <li>视图通过数据绑定连接到ViewModel</li>
              <li>用户交互触发ViewModel中的命令</li>
              <li>命令更新模型并处理业务逻辑</li>
              <li>模型变化自动反映到ViewModel</li>
              <li>ViewModel变化通过数据绑定更新视图</li>
            </ol>
          </div>

          <div class="pattern-section">
            <h3>实现框架</h3>
            <div class="frameworks">
              <div class="framework">Vue.js</div>
              <div class="framework">Angular</div>
              <div class="framework">Knockout.js</div>
              <div class="framework">WPF/Silverlight</div>
            </div>
          </div>

          <div class="pattern-section">
            <h3>优缺点分析</h3>
            <div class="pros-cons">
              <div class="pros">
                <h4>✅ 优点</h4>
                <ul>
                  <li>数据绑定减少样板代码</li>
                  <li>视图和模型完全解耦</li>
                  <li>易于单元测试</li>
                  <li>高效UI更新机制</li>
                  <li>良好的代码组织和维护性</li>
                </ul>
              </div>
              <div class="cons">
                <h4>❌ 缺点</h4>
                <ul>
                  <li>调试数据绑定较困难</li>
                  <li>大型模型可能内存消耗高</li>
                  <li>学习曲线较陡峭</li>
                  <li>过度绑定可能导致性能问题</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 应用场景 -->
      <section class="section use-cases-section">
        <h2 class="section-title">
          <span class="icon">📱</span>
          应用场景对比
        </h2>

        <div class="use-case-cards">
          <div class="case-card">
            <h3>MVC适用场景</h3>
            <ul>
              <li>传统多页Web应用</li>
              <li>服务器渲染应用</li>
              <li>小型到中型项目</li>
              <li>需要快速开发的项目</li>
              <li>后端驱动的应用</li>
            </ul>
            <div class="examples">
              <div class="example">电子商务网站</div>
              <div class="example">内容管理系统</div>
              <div class="example">企业级后台系统</div>
            </div>
          </div>

          <div class="case-card">
            <h3>MVP适用场景</h3>
            <ul>
              <li>复杂桌面应用</li>
              <li>需要严格测试的应用</li>
              <li>多平台共享逻辑的应用</li>
              <li>需要高度解耦的项目</li>
              <li>需要模拟视图进行测试的场景</li>
            </ul>
            <div class="examples">
              <div class="example">财务软件</div>
              <div class="example">企业资源规划系统</div>
              <div class="example">桌面办公软件</div>
            </div>
          </div>

          <div class="case-card">
            <h3>MVVM适用场景</h3>
            <ul>
              <li>现代单页应用(SPA)</li>
              <li>数据驱动型应用</li>
              <li>需要实时更新的应用</li>
              <li>复杂前端交互的应用</li>
              <li>跨平台移动应用</li>
            </ul>
            <div class="examples">
              <div class="example">社交媒体应用</div>
              <div class="example">实时协作工具</div>
              <div class="example">数据可视化平台</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section conclusion-section">
        <h2 class="section-title">
          <span class="icon">🏁</span>
          总结与建议
        </h2>

        <div class="conclusion-content">
          <div class="evolution">
            <h3>架构模式的演进</h3>
            <div class="evolution-path">
              <div class="evolution-step mvc">
                <div class="step-icon">MVC</div>
                <div class="step-content">基础分离逻辑</div>
              </div>
              <div class="arrow">→</div>
              <div class="evolution-step mvp">
                <div class="step-icon">MVP</div>
                <div class="step-content">增强测试性</div>
              </div>
              <div class="arrow">→</div>
              <div class="evolution-step mvvm">
                <div class="step-icon">MVVM</div>
                <div class="step-content">数据绑定自动化</div>
              </div>
            </div>
          </div>

          <div class="selection-guide">
            <h3>模式选择指南</h3>
            <div class="guide-criteria">
              <div class="criterion">
                <h4>选择 MVC:</h4>
                <ul>
                  <li>项目规模小</li>
                  <li>团队熟悉传统模式</li>
                  <li>服务器渲染为主</li>
                </ul>
              </div>

              <div class="criterion">
                <h4>选择 MVP:</h4>
                <ul>
                  <li>需要高度可测试性</li>
                  <li>桌面端应用开发</li>
                  <li>复杂业务逻辑</li>
                </ul>
              </div>

              <div class="criterion">
                <h4>选择 MVVM:</h4>
                <ul>
                  <li>现代前端框架</li>
                  <li>复杂交互界面</li>
                  <li>实时数据更新需求</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="final-verdict">
            <h3>最终结论</h3>
            <p>架构模式没有绝对的优劣之分，只有更适合特定场景的选择。现代前端框架大多采用了MVVM的变体或混合模式。</p>
            <p>理解这些模式的核心思想比严格遵循某个模式更重要。在实际项目中，开发者通常根据框架特性进行调整，形成适合项目的架构方案。</p>
            <p>随着前端技术的发展，组件化、单向数据流等新概念也在不断丰富前端架构设计的选择。</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>前端架构模式对比分析 · {{ currentYear }}</p>
      <div class="resources">
        <a href="https://martinfowler.com/eaaDev/uiArchs.html" target="_blank" class="resource-link">Martin
          Fowler架构模式</a>
        <a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank"
          class="resource-link">Vue响应式原理</a>
        <a href="https://angular.io/guide/architecture" target="_blank" class="resource-link">Angular架构</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

@primary: #5e72e4;
@mvc-color: #11cdef;
@mvp-color: #fb6340;
@mvvm-color: #2dce89;
@text-primary: #2b2d42;
@text-secondary: #4a5568;
@border: #e2e8f0;
@background: #f8fafc;
@card-bg: #ffffff;
@success: #06d6a0;
@warning: #ffd166;
@error: #ef476f;

.pattern-comparison {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: @text-primary;
  line-height: 1.6;
  background-color: @background;
}

.pattern-header {
  text-align: center;
  margin: 30px 0 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f0f4ff, #e6eeff);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(94, 114, 228, 0.15);

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 10px;
    color: @primary;
    line-height: 1.2;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    max-width: 700px;
    margin: 0 auto 20px;
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 15px;
  border-bottom: 2px solid @border;

  .icon {
    font-size: 1.4rem;
  }
}

.introduction-section {
  .intro-content {
    p {
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 30px;
      color: @text-secondary;
    }
  }

  .pattern-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .pattern-card {
    text-align: center;
    padding: 30px 20px;
    border-radius: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);

    &:hover {
      transform: translateY(-5px);
    }

    .pattern-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: 700;
      margin: 0 auto 20px;
      color: white;
    }

    h3 {
      margin: 0 0 10px;
      font-size: 1.8rem;
    }

    p {
      margin: 0;
      color: @text-secondary;
    }

    &.mvc {
      background: rgba(17, 205, 239, 0.1);
      border-top: 4px solid @mvc-color;

      .pattern-icon {
        background-color: @mvc-color;
      }
    }

    &.mvp {
      background: rgba(251, 99, 64, 0.1);
      border-top: 4px solid @mvp-color;

      .pattern-icon {
        background-color: @mvp-color;
      }
    }

    &.mvvm {
      background: rgba(45, 206, 137, 0.1);
      border-top: 4px solid @mvvm-color;

      .pattern-icon {
        background-color: @mvvm-color;
      }
    }
  }
}

.comparison-section {
  .comparison-table {
    overflow-x: auto;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 800px;

      th,
      td {
        padding: 15px 20px;
        text-align: left;
        border: 1px solid @border;
      }

      thead {
        background: @primary;
        color: white;

        th {
          font-weight: 600;
          text-align: center;
        }
      }

      tbody {
        tr {
          &:nth-child(odd) {
            background: rgba(94, 114, 228, 0.03);
          }

          td:first-child {
            font-weight: 500;
            background: rgba(94, 114, 228, 0.08);
          }

          td:nth-child(2) {
            color: @mvc-color;
            font-weight: 500;
          }

          td:nth-child(3) {
            color: @mvp-color;
            font-weight: 500;
          }

          td:nth-child(4) {
            color: @mvvm-color;
            font-weight: 500;
          }
        }
      }
    }
  }
}

.pattern-detail {
  .pattern-diagram {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    min-height: 200px;
    margin: 40px 0;
    padding: 30px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    .model,
    .view,
    .controller,
    .presenter,
    .viewmodel {
      width: 120px;
      height: 120px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-weight: 700;
      font-size: 1.2rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      z-index: 2;

      span {
        display: block;
        font-size: 0.9rem;
        font-weight: 400;
        margin-top: 8px;
        color: @text-secondary;
      }
    }

    .arrows {
      display: flex;
      flex-direction: column;
      gap: 50px;
      position: relative;
      z-index: 1;
    }

    .arrow-up,
    .arrow-down,
    .arrow-left,
    .arrow-right,
    .dashed-arrow,
    .double-arrow {
      position: absolute;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      background: rgba(94, 114, 228, 0.1);
      z-index: 1;
    }

    .dashed-arrow {
      border: 1px dashed @primary;
      background: transparent;
    }

    .double-arrow {
      background: rgba(45, 206, 137, 0.15);
      color: @mvvm-color;
    }
  }

  .pattern-explanation {
    .pattern-section {
      margin-bottom: 30px;

      h3 {
        font-size: 1.3rem;
        margin-top: 0;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid @border;
      }

      ul,
      ol {
        padding-left: 25px;
        margin: 0 0 15px;

        li {
          margin-bottom: 10px;
          position: relative;
          padding-left: 25px;

          &:before {
            position: absolute;
            left: 0;
          }
        }
      }

      ul li:before {
        content: "•";
        color: @primary;
        font-weight: bold;
      }

      ol {
        counter-reset: item;

        li {
          counter-increment: item;

          &:before {
            content: counter(item) ".";
            color: @primary;
            font-weight: bold;
          }
        }
      }
    }

    .frameworks {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      .framework {
        background: rgba(94, 114, 228, 0.1);
        padding: 8px 15px;
        border-radius: 30px;
        font-size: 0.95rem;
        font-weight: 500;
      }
    }

    .pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }

      .pros,
      .cons {
        padding: 20px;
        border-radius: 12px;

        h4 {
          margin-top: 0;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }

      .pros {
        background: rgba(45, 206, 137, 0.07);
        border-left: 4px solid @success;
      }

      .cons {
        background: rgba(239, 71, 111, 0.07);
        border-left: 4px solid @error;
      }
    }
  }

  &.mvc {
    .pattern-diagram {
      .model {
        background: fade(@mvc-color, 15%);
        border: 2px solid @mvc-color;
        color: darken(@mvc-color, 20%);
      }

      .view {
        background: fade(@mvp-color, 15%);
        border: 2px solid @mvp-color;
        color: darken(@mvp-color, 20%);
      }

      .controller {
        background: fade(@primary, 15%);
        border: 2px solid @primary;
        color: darken(@primary, 20%);
      }
    }
  }

  &.mvp {
    .pattern-diagram {
      .model {
        background: fade(@mvc-color, 15%);
        border: 2px solid @mvc-color;
        color: darken(@mvc-color, 20%);
      }

      .view {
        background: fade(@mvp-color, 15%);
        border: 2px solid @mvp-color;
        color: darken(@mvp-color, 20%);
      }

      .presenter {
        background: fade(@mvvm-color, 15%);
        border: 2px solid @mvvm-color;
        color: darken(@mvvm-color, 20%);
      }
    }
  }

  &.mvvm {
    .pattern-diagram {
      .model {
        background: fade(@mvc-color, 15%);
        border: 2px solid @mvc-color;
        color: darken(@mvc-color, 20%);
      }

      .view {
        background: fade(@mvp-color, 15%);
        border: 2px solid @mvp-color;
        color: darken(@mvp-color, 20%);
      }

      .viewmodel {
        background: fade(@mvvm-color, 15%);
        border: 2px solid @mvvm-color;
        color: darken(@mvvm-color, 20%);
      }
    }
  }
}

.use-cases-section {
  .use-case-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .case-card {
    padding: 25px;
    border-radius: 16px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid @border;
    }

    ul {
      margin: 0 0 20px;
      padding-left: 20px;

      li {
        margin-bottom: 10px;
        position: relative;
        padding-left: 25px;

        &:before {
          content: "•";
          color: @primary;
          position: absolute;
          left: 10px;
        }
      }
    }

    .examples {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 15px;

      .example {
        background: rgba(94, 114, 228, 0.1);
        padding: 6px 12px;
        border-radius: 30px;
        font-size: 0.9rem;
      }
    }

    &:nth-child(1) {
      border-top: 4px solid @mvc-color;
    }

    &:nth-child(2) {
      border-top: 4px solid @mvp-color;
    }

    &:nth-child(3) {
      border-top: 4px solid @mvvm-color;
    }
  }
}

.conclusion-section {
  .conclusion-content {
    .evolution {
      margin-bottom: 40px;

      .evolution-path {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
        flex-wrap: wrap;

        .evolution-step {
          text-align: center;

          .step-icon {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 auto 15px;
          }

          .step-content {
            font-weight: 500;
          }

          &.mvc .step-icon {
            background: fade(@mvc-color, 15%);
            border: 3px solid @mvc-color;
            color: darken(@mvc-color, 20%);
          }

          &.mvp .step-icon {
            background: fade(@mvp-color, 15%);
            border: 3px solid @mvp-color;
            color: darken(@mvp-color, 20%);
          }

          &.mvvm .step-icon {
            background: fade(@mvvm-color, 15%);
            border: 3px solid @mvvm-color;
            color: darken(@mvvm-color, 20%);
          }
        }

        .arrow {
          font-size: 2rem;
          color: @text-secondary;
        }
      }
    }

    .selection-guide {
      margin-bottom: 40px;

      .guide-criteria {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;

        @media (max-width: 900px) {
          grid-template-columns: 1fr;
        }

        .criterion {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

          h4 {
            margin-top: 0;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid @border;
          }

          ul {
            margin: 0;
            padding-left: 20px;

            li {
              margin-bottom: 10px;
              position: relative;
              padding-left: 25px;

              &:before {
                content: "•";
                color: @primary;
                position: absolute;
                left: 10px;
              }
            }
          }

          &:nth-child(1) {
            border-top: 4px solid @mvc-color;
          }

          &:nth-child(2) {
            border-top: 4px solid @mvp-color;
          }

          &:nth-child(3) {
            border-top: 4px solid @mvvm-color;
          }
        }
      }
    }

    .final-verdict {
      background: rgba(94, 114, 228, 0.05);
      border-radius: 16px;
      padding: 30px;
      border-left: 4px solid @primary;

      h3 {
        margin-top: 0;
        margin-bottom: 20px;
      }

      p {
        margin: 0 0 15px;
        line-height: 1.7;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid @border;
  color: @text-secondary;

  .resources {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 15px;

    .resource-link {
      color: @primary;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .pattern-header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }
  }

  .section {
    padding: 25px 20px;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .pattern-diagram {
    flex-direction: column;
    gap: 30px;
  }
}
</style>
