<template>
  <div class="redux-container">
    <header class="header">
      <div class="header-content">
        <h1>React Redux 状态管理</h1>
        <p class="subtitle">可预测的状态容器，构建一致的JavaScript应用</p>
        <div class="redux-visual">
          <div class="redux-flow">
            <div class="flow-step">
              <div class="step-icon">
                <i class="fas fa-mouse-pointer"></i>
              </div>
              <div class="step-label">UI交互</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">
                <i class="fas fa-paper-plane"></i>
              </div>
              <div class="step-label">Action</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">
                <i class="fas fa-cogs"></i>
              </div>
              <div class="step-label">Reducer</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">
                <i class="fas fa-database"></i>
              </div>
              <div class="step-label">Store</div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">
                <i class="fas fa-sync-alt"></i>
              </div>
              <div class="step-label">UI更新</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="concepts-section">
        <div class="section-header">
          <i class="icon fas fa-cube"></i>
          <h2>Redux 核心概念</h2>
        </div>

        <div class="concepts-grid">
          <div class="concept-card">
            <div class="concept-header">
              <div class="concept-icon">
                <i class="fas fa-database"></i>
              </div>
              <h3>单一数据源</h3>
            </div>
            <div class="concept-content">
              <p>整个应用的状态存储在一个单一的store对象树中</p>
              <div class="store-visual">
                <div class="app-state">
                  <div class="state-branch">用户信息</div>
                  <div class="state-branch">购物车</div>
                  <div class="state-branch">主题设置</div>
                  <div class="state-branch">API状态</div>
                </div>
                <div class="store-label">Store</div>
              </div>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-header">
              <div class="concept-icon">
                <i class="fas fa-lock"></i>
              </div>
              <h3>状态只读</h3>
            </div>
            <div class="concept-content">
              <p>唯一改变状态的方式是触发action</p>
              <div class="immutable-flow">
                <div class="state">状态A</div>
                <div class="arrow">→</div>
                <div class="action">Action</div>
                <div class="arrow">→</div>
                <div class="state">状态B</div>
              </div>
              <p class="note">状态不可变，每次更新都返回新状态</p>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-header">
              <div class="concept-icon">
                <i class="fas fa-function"></i>
              </div>
              <h3>纯函数更新</h3>
            </div>
            <div class="concept-content">
              <p>Reducer是纯函数，接收旧状态和action，返回新状态</p>
              <div class="reducer-formula">
                <div class="input">(state, action)</div>
                <div class="arrow">⇒</div>
                <div class="output">newState</div>
              </div>
              <div class="code-snippet">
                <pre><code>function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="workflow-section">
        <div class="section-header">
          <i class="icon fas fa-sitemap"></i>
          <h2>Redux 数据流</h2>
        </div>

        <div class="workflow-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>UI触发Action</h3>
              <p>用户交互触发action创建函数</p>
              <div class="code-example">
                <pre><code>// Action创建函数
const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product
});

// 在组件中调用
&lt;button onClick={() => dispatch(addToCart(product))}&gt;
  加入购物车
&lt;/button&gt;</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Reducer处理Action</h3>
              <p>Reducer接收当前状态和action，返回新状态</p>
              <div class="code-example">
                <pre><code>function cartReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
}</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Store保存新状态</h3>
              <p>Store用新状态替换旧状态</p>
              <div class="store-visualization">
                <div class="store old">
                  <div class="store-header">旧状态</div>
                  <div class="state-item">商品A</div>
                  <div class="state-item">商品B</div>
                </div>
                <div class="arrow">→</div>
                <div class="store new">
                  <div class="store-header">新状态</div>
                  <div class="state-item">商品A</div>
                  <div class="state-item">商品B</div>
                  <div class="state-item highlight">商品C</div>
                </div>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>UI订阅更新</h3>
              <p>使用connect或useSelector订阅状态变化</p>
              <div class="code-example">
                <pre><code>// 使用useSelector钩子
const cart = useSelector(state => state.cart);

// 使用connect高阶组件
const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(CartComponent);</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="implementation-section">
        <div class="section-header">
          <i class="icon fas fa-code"></i>
          <h2>Redux 实现步骤</h2>
        </div>

        <div class="setup-steps">
          <div class="setup-step">
            <div class="step-header">
              <div class="step-number">1</div>
              <h3>安装依赖</h3>
            </div>
            <div class="step-content">
              <div class="code-example">
                <pre><code>npm install redux react-redux
npm install @reduxjs/toolkit  # 推荐使用Redux Toolkit</code></pre>
              </div>
            </div>
          </div>

          <div class="setup-step">
            <div class="step-header">
              <div class="step-number">2</div>
              <h3>创建Store</h3>
            </div>
            <div class="step-content">
              <div class="code-example">
                <pre><code>import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

// 使用Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: rootReducer
});</code></pre>
              </div>
            </div>
          </div>

          <div class="setup-step">
            <div class="step-header">
              <div class="step-number">3</div>
              <h3>定义Reducer</h3>
            </div>
            <div class="step-content">
              <div class="code-example">
                <pre><code>// 传统方式
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

// 使用Redux Toolkit的createSlice
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;</code></pre>
              </div>
            </div>
          </div>

          <div class="setup-step">
            <div class="step-header">
              <div class="step-number">4</div>
              <h3>连接React应用</h3>
            </div>
            <div class="step-content">
              <div class="code-example">
                <pre><code>import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  &lt;Provider store={store}&gt;
    &lt;App /&gt;
  &lt;/Provider&gt;,
  document.getElementById('root')
);</code></pre>
              </div>
            </div>
          </div>

          <div class="setup-step">
            <div class="step-header">
              <div class="step-number">5</div>
              <h3>在组件中使用</h3>
            </div>
            <div class="step-content">
              <div class="code-example">
                <pre><code>import { useSelector, useDispatch } from 'react-redux';
import { increment } from './counterSlice';

function Counter() {
  const count = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return (
    &lt;div&gt;
      &lt;button onClick={() => dispatch(decrement())}&gt;-&lt;/button&gt;
      &lt;span&gt;{count}&lt;/span&gt;
      &lt;button onClick={() => dispatch(increment())}&gt;+&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="usecases-section">
        <div class="section-header">
          <i class="icon fas fa-check-circle"></i>
          <h2>适用场景</h2>
        </div>

        <div class="usecases">
          <div class="usecase">
            <div class="usecase-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <h3>复杂状态管理</h3>
            <p>需要跨组件共享的状态（如用户信息、购物车）</p>
          </div>

          <div class="usecase">
            <div class="usecase-icon">
              <i class="fas fa-history"></i>
            </div>
            <h3>状态时间旅行</h3>
            <p>需要撤销/重做功能的应用程序</p>
          </div>

          <div class="usecase">
            <div class="usecase-icon">
              <i class="fas fa-users"></i>
            </div>
            <h3>团队协作</h3>
            <p>大型团队需要统一的状态管理规范</p>
          </div>

          <div class="usecase">
            <div class="usecase-icon">
              <i class="fas fa-plug"></i>
            </div>
            <h3>中间件集成</h3>
            <p>需要日志、异步操作等中间件支持</p>
          </div>
        </div>

        <div class="when-not-to-use">
          <h3>何时不需要Redux？</h3>
          <ul>
            <li><i class="fas fa-times"></i> 小型应用或简单UI状态</li>
            <li><i class="fas fa-times"></i> 不需要共享状态的组件</li>
            <li><i class="fas fa-times"></i> 简单的表单状态管理</li>
            <li><i class="fas fa-times"></i> 只需要本地组件状态</li>
          </ul>
        </div>
      </section>

      <section class="ecosystem-section">
        <div class="section-header">
          <i class="icon fas fa-boxes"></i>
          <h2>Redux 生态系统</h2>
        </div>

        <div class="tools">
          <div class="tool-card">
            <div class="tool-logo redux-toolkit"></div>
            <h3>Redux Toolkit</h3>
            <p>官方推荐工具集，简化Redux开发</p>
            <ul>
              <li>configureStore - 简化store配置</li>
              <li>createSlice - 自动生成action和reducer</li>
              <li>createAsyncThunk - 处理异步操作</li>
            </ul>
          </div>

          <div class="tool-card">
            <div class="tool-logo redux-saga"></div>
            <h3>Redux Saga</h3>
            <p>使用Generator函数管理副作用</p>
            <ul>
              <li>处理复杂异步流程</li>
              <li>易于测试的副作用管理</li>
              <li>高级流程控制（节流、取消）</li>
            </ul>
          </div>

          <div class="tool-card">
            <div class="tool-logo redux-thunk"></div>
            <h3>Redux Thunk</h3>
            <p>允许action返回函数</p>
            <ul>
              <li>简单异步操作</li>
              <li>延迟dispatch</li>
              <li>条件dispatch</li>
            </ul>
          </div>

          <div class="tool-card">
            <div class="tool-logo redux-persist"></div>
            <h3>Redux Persist</h3>
            <p>持久化存储Redux状态</p>
            <ul>
              <li>跨会话保存状态</li>
              <li>多种存储引擎（localStorage等）</li>
              <li>部分状态持久化</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="best-practices-section">
        <div class="section-header">
          <i class="icon fas fa-star"></i>
          <h2>最佳实践</h2>
        </div>

        <div class="practices">
          <div class="practice">
            <div class="practice-icon">
              <i class="fas fa-toolbox"></i>
            </div>
            <div class="practice-content">
              <h3>使用Redux Toolkit</h3>
              <p>官方推荐工具集，减少样板代码</p>
            </div>
          </div>

          <div class="practice">
            <div class="practice-icon">
              <i class="fas fa-project-diagram"></i>
            </div>
            <div class="practice-content">
              <h3>规范化状态结构</h3>
              <p>避免嵌套，使用ID引用关联数据</p>
            </div>
          </div>

          <div class="practice">
            <div class="practice-icon">
              <i class="fas fa-cubes"></i>
            </div>
            <div class="practice-content">
              <h3>功能域划分</h3>
              <p>按功能模块组织reducer和action</p>
            </div>
          </div>

          <div class="practice">
            <div class="practice-icon">
              <i class="fas fa-hands"></i>
            </div>
            <div class="practice-content">
              <h3>选择器函数</h3>
              <p>使用reselect创建记忆化选择器</p>
            </div>
          </div>
        </div>

        <div class="dev-tools">
          <h3>Redux DevTools</h3>
          <div class="devtools-visual">
            <div class="monitor">
              <div class="devtools-header">Redux DevTools</div>
              <div class="actions-list">
                <div class="action">@@INIT</div>
                <div class="action">USER_LOGIN</div>
                <div class="action">ADD_TO_CART</div>
                <div class="action">FETCH_DATA_SUCCESS</div>
              </div>
              <div class="state-view">
                <pre>{
  user: { loggedIn: true, name: "John" },
  cart: [ {id: 1, name: "Product A"} ],
  products: [...]
}</pre>
              </div>
            </div>
          </div>
          <p class="description">强大的开发工具，提供状态快照、时间旅行调试、action重放等功能</p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© 2023 React Redux指南 | 构建可预测的状态管理</p>
      <div class="links">
        <a href="#"><i class="fab fa-react"></i> React文档</a>
        <a href="#"><i class="fab fa-redux"></i> Redux文档</a>
        <a href="#"><i class="fab fa-github"></i> 示例代码</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const activeTab = ref(0);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

// 配色方案
@primary: #764abc; // Redux紫色
@secondary: #4a4a4a;
@accent: #61dafb;
@background: #f8f9fa;
@card-bg: #ffffff;
@text: #2c3e50;
@text-light: #7f8c8d;
@border: #eaecef;
@success: #51cf66;
@warning: #fcc419;

.redux-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: @text;
  background-color: @background;
  min-height: 100vh;

  .header {
    text-align: center;
    padding: 60px 20px 40px;
    margin-bottom: 30px;
    background: linear-gradient(135deg, @primary 0%, darken(@primary, 15%) 100%);
    color: white;
    border-radius: 0 0 20px 20px;
    position: relative;
    overflow: hidden;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      font-weight: 300;
      max-width: 700px;
      margin: 0 auto 25px;
    }

    .redux-visual {
      margin-top: 40px;

      .redux-flow {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;

        .flow-step {
          text-align: center;
          min-width: 120px;

          .step-icon {
            width: 70px;
            height: 70px;
            margin: 0 auto 10px;
            background: fade(white, 15%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
          }

          .step-label {
            font-weight: 500;
            font-size: 1.1rem;
          }
        }

        .flow-arrow {
          font-size: 1.8rem;
          color: fade(white, 70%);
        }
      }
    }
  }

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 10px;
    border-bottom: 2px solid @border;

    h2 {
      font-size: 1.8rem;
      color: @text;
      margin: 0;
    }

    .icon {
      margin-right: 12px;
      color: @primary;
      font-size: 1.5rem;
    }
  }

  .concepts-section {
    .concepts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }

    .concept-card {
      background: @card-bg;
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      border-top: 4px solid @primary;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .concept-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .concept-icon {
          width: 50px;
          height: 50px;
          margin-right: 15px;
          background: fade(@primary, 15%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: @primary;
        }

        h3 {
          margin: 0;
          font-size: 1.4rem;
          color: @text;
        }
      }

      .concept-content {
        p {
          color: @text-light;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .store-visual {
          text-align: center;
          padding: 15px;
          background: fade(@primary, 5%);
          border-radius: 8px;

          .app-state {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-bottom: 15px;

            .state-branch {
              padding: 10px 15px;
              background: fade(@primary, 10%);
              border-radius: 6px;
              font-size: 0.9rem;
            }
          }

          .store-label {
            font-weight: bold;
            color: @primary;
          }
        }

        .immutable-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin: 20px 0;

          .state,
          .action {
            padding: 10px 15px;
            border-radius: 6px;
            font-weight: 500;
          }

          .state {
            background: fade(@success, 15%);
            color: darken(@success, 20%);
          }

          .action {
            background: fade(@primary, 15%);
            color: darken(@primary, 20%);
          }

          .arrow {
            font-size: 1.2rem;
            color: @text-light;
          }
        }

        .reducer-formula {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin: 20px 0;
          font-family: 'Fira Code', monospace;
          font-size: 1.1rem;
          font-weight: 500;

          .input,
          .output {
            padding: 10px 15px;
            border-radius: 6px;
          }

          .input {
            background: fade(@primary, 15%);
          }

          .output {
            background: fade(@success, 15%);
          }

          .arrow {
            font-size: 1.5rem;
          }
        }

        .code-snippet {
          background: lighten(@background, 1%);
          border-radius: 8px;
          padding: 15px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          border: 1px solid @border;
        }
      }
    }
  }

  .workflow-section {
    .workflow-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }

    .step {
      background: @card-bg;
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      position: relative;
      border-left: 4px solid @primary;

      .step-number {
        position: absolute;
        top: -15px;
        left: -15px;
        width: 40px;
        height: 40px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      }

      .step-content {
        h3 {
          font-size: 1.3rem;
          margin-top: 0;
          margin-bottom: 15px;
          color: @text;
        }

        p {
          color: @text-light;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .code-example {
          background: lighten(@background, 1%);
          border-radius: 8px;
          padding: 15px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          border: 1px solid @border;
          margin-bottom: 15px;
        }

        .store-visualization {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;

          .store {
            border: 1px solid @border;
            border-radius: 8px;
            overflow: hidden;
            width: 120px;

            .store-header {
              background: fade(@primary, 10%);
              padding: 8px;
              text-align: center;
              font-weight: 500;
              font-size: 0.9rem;
            }

            .state-item {
              padding: 8px;
              text-align: center;
              border-bottom: 1px solid @border;
              font-size: 0.9rem;

              &:last-child {
                border-bottom: none;
              }

              &.highlight {
                background: fade(@success, 15%);
                color: darken(@success, 20%);
              }
            }
          }

          .arrow {
            font-size: 1.5rem;
            color: @text-light;
          }
        }
      }
    }
  }

  .implementation-section {
    .setup-steps {
      background: @card-bg;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      margin-bottom: 40px;
    }

    .setup-step {
      margin-bottom: 30px;
      padding-bottom: 30px;
      border-bottom: 1px solid @border;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      .step-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .step-number {
          width: 40px;
          height: 40px;
          background: @primary;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          margin-right: 15px;
        }

        h3 {
          margin: 0;
          color: @text;
          font-size: 1.4rem;
        }
      }

      .code-example {
        background: lighten(@background, 1%);
        border-radius: 8px;
        padding: 20px;
        overflow-x: auto;
        font-family: 'Fira Code', monospace;
        border: 1px solid @border;

        pre {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.5;
        }
      }
    }
  }

  .usecases-section {
    .usecases {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;

      .usecase {
        text-align: center;
        padding: 25px 20px;
        background: @card-bg;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        border-top: 3px solid @primary;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .usecase-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 15px;
          background: fade(@primary, 10%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: @primary;
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: @text;
        }

        p {
          margin: 0;
          color: @text-light;
          font-size: 0.95rem;
        }
      }
    }

    .when-not-to-use {
      background: fade(@accent, 8%);
      border-radius: 12px;
      padding: 25px;
      border-left: 4px solid @accent;

      h3 {
        font-size: 1.3rem;
        margin-top: 0;
        margin-bottom: 15px;
        color: darken(@accent, 20%);
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 12px;
          display: flex;
          align-items: center;

          i {
            margin-right: 10px;
            font-size: 1.2rem;
            color: @accent;
          }
        }
      }
    }
  }

  .ecosystem-section {
    .tools {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .tool-card {
      background: @card-bg;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      border-top: 4px solid @primary;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .tool-logo {
        width: 60px;
        height: 60px;
        margin: 0 auto 15px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;

        &.redux-toolkit {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23764abc"/><circle cx="50" cy="50" r="40" fill="white"/></svg>');
        }

        &.redux-saga {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23999999"/><path d="M30,30 L70,30 L70,70 L30,70 Z" fill="white"/></svg>');
        }

        &.redux-thunk {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2344aaf0"/><circle cx="50" cy="50" r="40" fill="white"/></svg>');
        }

        &.redux-persist {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ff6b6b"/><path d="M30,30 L70,30 L70,70 L30,70 Z" fill="white"/></svg>');
        }
      }

      h3 {
        text-align: center;
        margin-top: 0;
        margin-bottom: 15px;
        color: @text;
      }

      p {
        text-align: center;
        color: @text-light;
        margin-bottom: 15px;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 8px;
          font-size: 0.9rem;
        }
      }
    }
  }

  .best-practices-section {
    .practices {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;

      .practice {
        display: flex;
        background: @card-bg;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .practice-icon {
          width: 50px;
          height: 50px;
          margin-right: 15px;
          background: fade(@primary, 10%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: @primary;
          flex-shrink: 0;
        }

        .practice-content {
          h3 {
            font-size: 1.2rem;
            margin-top: 0;
            margin-bottom: 8px;
            color: @text;
          }

          p {
            margin: 0;
            color: @text-light;
            font-size: 0.95rem;
          }
        }
      }
    }

    .dev-tools {
      background: @card-bg;
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      h3 {
        font-size: 1.3rem;
        margin-top: 0;
        margin-bottom: 20px;
        color: @text;
      }

      .devtools-visual {
        background: #282c34;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 15px;
        font-family: 'Fira Code', monospace;
        color: white;

        .monitor {
          .devtools-header {
            background: #3a3f4b;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 15px;
            font-weight: 500;
          }

          .actions-list {
            margin-bottom: 15px;

            .action {
              padding: 8px 10px;
              background: #3a3f4b;
              margin-bottom: 5px;
              border-radius: 4px;
              font-size: 0.9rem;

              &:hover {
                background: #4a4f5b;
              }
            }
          }

          .state-view {
            background: #1e2227;
            padding: 15px;
            border-radius: 4px;
            font-size: 0.85rem;
            max-height: 150px;
            overflow: auto;
          }
        }
      }

      .description {
        color: @text-light;
        font-style: italic;
        text-align: center;
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 60px;
    padding-top: 30px;
    color: @text-light;
    font-size: 0.9rem;
    border-top: 1px solid @border;

    .links {
      margin-top: 15px;

      a {
        color: @primary;
        text-decoration: none;
        margin: 0 15px;
        display: inline-block;
        font-weight: 500;

        i {
          margin-right: 5px;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 40px 20px 30px !important;

    h1 {
      font-size: 2rem !important;
    }

    .subtitle {
      font-size: 1.1rem !important;
    }
  }

  .section-header {
    h2 {
      font-size: 1.5rem !important;
    }
  }

  .workflow-steps {
    grid-template-columns: 1fr !important;
  }
}
</style>
