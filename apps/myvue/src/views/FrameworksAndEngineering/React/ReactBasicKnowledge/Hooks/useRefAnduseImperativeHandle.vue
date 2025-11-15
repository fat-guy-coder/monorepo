<template>
  <div class="react-ref-container">
    <header class="header">
      <div class="header-content">
        <h1>React useRef 和 useImperativeHandle</h1>
        <p class="subtitle">掌握DOM操作和组件暴露API的高级技巧</p>
        <div class="hook-visual">
          <div class="hook-card">
            <div class="hook-icon">
              <i class="fas fa-vector-square"></i>
            </div>
            <div class="hook-name">useRef</div>
          </div>
          <div class="plus-icon">+</div>
          <div class="hook-card">
            <div class="hook-icon">
              <i class="fas fa-share-square"></i>
            </div>
            <div class="hook-name">useImperativeHandle</div>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="overview-section">
        <div class="section-header">
          <i class="icon fas fa-book-open"></i>
          <h2>核心概念</h2>
        </div>

        <div class="concepts">
          <div class="concept-card">
            <div class="concept-header">
              <h3><i class="fas fa-vector-square"></i> useRef</h3>
              <div class="concept-tag">引用持久化</div>
            </div>
            <div class="concept-content">
              <p>useRef 是一个返回可变 ref 对象的函数，其 <code>.current</code> 属性被初始化为传入的参数（initialValue）</p>
              <div class="features">
                <div class="feature">
                  <i class="fas fa-check-circle"></i>
                  <strong>特性：</strong> 返回的对象在组件的整个生命周期内保持不变
                </div>
                <div class="feature">
                  <i class="fas fa-check-circle"></i>
                  <strong>作用：</strong> 访问DOM节点或存储可变值而不触发重新渲染
                </div>
              </div>
              <div class="signature">
                <pre><code>const refContainer = useRef(initialValue);</code></pre>
              </div>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-header">
              <h3><i class="fas fa-share-square"></i> useImperativeHandle</h3>
              <div class="concept-tag">自定义暴露句柄</div>
            </div>
            <div class="concept-content">
              <p>useImperativeHandle 用于自定义使用 <code>ref</code> 时暴露给父组件的实例值</p>
              <div class="features">
                <div class="feature">
                  <i class="fas fa-check-circle"></i>
                  <strong>特性：</strong> 控制子组件暴露给父组件的属性和方法
                </div>
                <div class="feature">
                  <i class="fas fa-check-circle"></i>
                  <strong>作用：</strong> 避免直接操作DOM，提供更安全的组件API
                </div>
              </div>
              <div class="signature">
                <pre><code>useImperativeHandle(ref, createHandle, [deps]);</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="useref-section">
        <div class="section-header">
          <i class="icon fas fa-code"></i>
          <h2>useRef 基础介绍</h2>
        </div>

        <div class="tabs">
          <div class="tab-buttons">
            <button v-for="(tab, index) in useRefTabs" :key="index" :class="{ active: activeUseRefTab === index }"
              @click="activeUseRefTab = index">
              {{ tab.title }}
            </button>
          </div>

          <div class="tab-content">
            <div v-show="activeUseRefTab === 0" class="tab-pane">
              <h3>访问DOM元素</h3>
              <p>最常见的useRef用法是访问DOM元素</p>

              <div class="code-example">
                <pre><code>import { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // 访问DOM元素
    inputEl.current.focus();
  };

  return (
    &lt;&gt;
      &lt;input ref={inputEl} type="text" /&gt;
      &lt;button onClick={onButtonClick}>聚焦输入框&lt;/button&gt;
    &lt;/&gt;
  );
}</code></pre>
              </div>

              <div class="usage-tip">
                <i class="fas fa-lightbulb"></i>
                <strong>使用场景：</strong>
                <ul>
                  <li>管理焦点、文本选择或媒体播放</li>
                  <li>触发强制动画</li>
                  <li>集成第三方DOM库</li>
                </ul>
              </div>
            </div>

            <div v-show="activeUseRefTab === 1" class="tab-pane">
              <h3>存储可变值</h3>
              <p>useRef可以存储任何可变值，类似于类组件的实例属性</p>

              <div class="code-example">
                <pre><code>function TimerComponent() {
  const intervalRef = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    // 清除定时器
    return () => clearInterval(intervalRef.current);
  }, []);

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  return (
    &lt;div&gt;
      &lt;p&gt;计时: {count}秒&lt;/p&gt;
      &lt;button onClick={stopTimer}>停止&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
              </div>

              <div class="usage-tip">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>注意事项：</strong>
                <ul>
                  <li>更改ref.current不会触发组件重新渲染</li>
                  <li>避免在渲染期间设置refs（应在事件处理或useEffect中）</li>
                  <li>ref.current在初始渲染时为null，在组件挂载后赋值</li>
                </ul>
              </div>
            </div>

            <div v-show="activeUseRefTab === 2" class="tab-pane">
              <h3>forwardRef使用</h3>
              <p>当需要在函数组件中使用ref时，需使用forwardRef</p>

              <div class="code-example">
                <pre><code>const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  // 将ref传递给内部的input元素
  return &lt;input ref={ref} {...props} /&gt;;
});

// 在父组件中使用
function ParentComponent() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    &lt;&gt;
      &lt;FancyInput ref={inputRef} /&gt;
      &lt;button onClick={focusInput}>聚焦&lt;/button&gt;
    &lt;/&gt;
  );
}</code></pre>
              </div>

              <div class="usage-tip">
                <i class="fas fa-info-circle"></i>
                <strong>适用场景：</strong>
                <ul>
                  <li>高阶组件中传递ref</li>
                  <li>封装第三方组件</li>
                  <li>需要从父组件访问子组件DOM节点</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="imperative-section">
        <div class="section-header">
          <i class="icon fas fa-share-alt"></i>
          <h2>useImperativeHandle 基础介绍</h2>
        </div>

        <div class="imperative-content">
          <div class="explanation">
            <h3>为什么需要useImperativeHandle？</h3>
            <p>当使用 <code>forwardRef</code> 暴露整个DOM节点时，父组件可以对子组件进行任意操作，这可能会破坏组件的封装性。useImperativeHandle 允许我们控制暴露给父组件的实例值。
            </p>
          </div>

          <div class="comparison">
            <div class="approach">
              <h4><i class="fas fa-times-circle"></i> 直接暴露DOM</h4>
              <div class="code-example">
                <pre><code>const Child = forwardRef((props, ref) => {
  return &lt;input ref={ref} /&gt;;
});

// 父组件可以完全控制input
parentRef.current.focus();
parentRef.current.value = 'new value';
parentRef.current.style.color = 'red';</code></pre>
              </div>
              <div class="problem">
                <i class="fas fa-exclamation-triangle"></i> 问题：父组件可以任意修改子组件的DOM，破坏封装性
              </div>
            </div>

            <div class="approach">
              <h4><i class="fas fa-check-circle"></i> 使用useImperativeHandle</h4>
              <div class="code-example">
                <pre><code>const Child = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));

  return &lt;input ref={inputRef} /&gt;;
});

// 父组件只能访问暴露的API
parentRef.current.focus();
parentRef.current.clear();</code></pre>
              </div>
              <div class="benefit">
                <i class="fas fa-thumbs-up"></i> 优势：只暴露安全的API，保持组件封装性
              </div>
            </div>
          </div>

          <div class="imperative-use-case">
            <h3>使用场景</h3>
            <div class="use-case-grid">
              <div class="use-case">
                <div class="icon">
                  <i class="fas fa-sliders-h"></i>
                </div>
                <h4>表单组件</h4>
                <p>暴露验证、重置等方法</p>
              </div>
              <div class="use-case">
                <div class="icon">
                  <i class="fas fa-video"></i>
                </div>
                <h4>媒体组件</h4>
                <p>暴露播放、暂停等方法</p>
              </div>
              <div class="use-case">
                <div class="icon">
                  <i class="fas fa-chart-line"></i>
                </div>
                <h4>图表组件</h4>
                <p>暴露更新数据方法</p>
              </div>
              <div class="use-case">
                <div class="icon">
                  <i class="fas fa-cogs"></i>
                </div>
                <h4>复杂组件</h4>
                <p>暴露简化API供外部调用</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="combined-section">
        <div class="section-header">
          <i class="icon fas fa-link"></i>
          <h2>结合使用示例</h2>
        </div>

        <div class="combined-example">
          <div class="example-description">
            <h3>自定义表单输入组件</h3>
            <p>创建一个带有验证功能的输入组件，向父组件暴露焦点、验证和重置方法</p>
          </div>

          <div class="code-container">
            <div class="code-block">
              <h4>子组件：ValidatedInput.jsx</h4>
              <pre><code>import React, {
  forwardRef,
  useRef,
  useImperativeHandle
} from 'react';

const ValidatedInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  const validate = () => {
    const value = inputRef.current.value;
    if (!value) {
      inputRef.current.style.borderColor = 'red';
      return false;
    }
    inputRef.current.style.borderColor = '';
    return true;
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  const resetInput = () => {
    inputRef.current.value = '';
    inputRef.current.style.borderColor = '';
  };

  // 向父组件暴露API
  useImperativeHandle(ref, () => ({
    validate,
    focus: focusInput,
    reset: resetInput
  }));

  return (
    &lt;input
      ref={inputRef}
      placeholder={props.placeholder}
    /&gt;
  );
});

export default ValidatedInput;</code></pre>
            </div>

            <div class="code-block">
              <h4>父组件：FormContainer.jsx</h4>
              <pre><code>import React, { useRef } from 'react';
import ValidatedInput from './ValidatedInput';

function FormContainer() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = emailRef.current.validate();
    const isPasswordValid = passwordRef.current.validate();

    if (isEmailValid && isPasswordValid) {
      // 表单提交逻辑
      alert('表单验证通过!');
    }
  };

  const resetForm = () => {
    emailRef.current.reset();
    passwordRef.current.reset();
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;ValidatedInput
        ref={emailRef}
        placeholder="Email"
      /&gt;
      &lt;ValidatedInput
        ref={passwordRef}
        placeholder="Password"
      /&gt;
      &lt;div className="buttons"&gt;
        &lt;button type="submit"&gt;提交&lt;/button&gt;
        &lt;button type="button" onClick={resetForm}&gt;
          重置
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/form&gt;
  );
}

export default FormContainer;</code></pre>
            </div>
          </div>

          <div class="benefits">
            <h3>这种模式的优势</h3>
            <ul>
              <li><i class="fas fa-check"></i> 子组件完全控制其内部实现</li>
              <li><i class="fas fa-check"></i> 父组件通过清晰API与子组件交互</li>
              <li><i class="fas fa-check"></i> 避免父组件直接操作子组件DOM</li>
              <li><i class="fas fa-check"></i> 提高组件的可维护性和复用性</li>
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
            <div class="number">1</div>
            <div class="content">
              <h3>优先使用props通信</h3>
              <p>在大多数情况下，props是父子组件通信的首选方式。只有在需要命令式操作时才使用refs。</p>
            </div>
          </div>
          <div class="practice">
            <div class="number">2</div>
            <div class="content">
              <h3>最小化暴露API</h3>
              <p>通过useImperativeHandle只暴露必要的API，保持组件的封装性。</p>
            </div>
          </div>
          <div class="practice">
            <div class="number">3</div>
            <div class="content">
              <h3>避免过度使用refs</h3>
              <p>Refs是React的"逃生舱"，只在真正需要操作DOM或组件实例时使用。</p>
            </div>
          </div>
          <div class="practice">
            <div class="number">4</div>
            <div class="content">
              <h3>正确清理资源</h3>
              <p>使用useEffect的清理函数清除事件监听器、定时器等资源。</p>
            </div>
          </div>
        </div>

        <div class="when-to-use">
          <h3>何时使用useRef？</h3>
          <div class="scenarios">
            <div class="scenario">
              <i class="fas fa-check-circle yes"></i>
              <div class="text">管理焦点、文本选择或媒体播放</div>
            </div>
            <div class="scenario">
              <i class="fas fa-check-circle yes"></i>
              <div class="text">触发命令式动画</div>
            </div>
            <div class="scenario">
              <i class="fas fa-check-circle yes"></i>
              <div class="text">与第三方DOM库集成</div>
            </div>
            <div class="scenario">
              <i class="fas fa-times-circle no"></i>
              <div class="text">替代状态管理（应使用useState）</div>
            </div>
            <div class="scenario">
              <i class="fas fa-times-circle no"></i>
              <div class="text">响应式数据（应使用useState/useReducer）</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p> React useRef和useImperativeHandle指南 | 掌握高级组件交互模式</p>
      <div class="links">
        <a href="#"><i class="fab fa-react"></i> React官方文档</a>
        <a href="#"><i class="fab fa-github"></i> 示例代码</a>
        <a href="#"><i class="fas fa-book"></i> Hooks深入指南</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const useRefTabs = [
  { title: '访问DOM' },
  { title: '存储可变值' },
  { title: 'forwardRef' }
];

const activeUseRefTab = ref(0);
</script>

<style lang="less" scoped>



// 配色方案
@primary: #61dafb;
@secondary: #282c34;
@accent: #ff6b6b;
@success: #51cf66;
@warning: #fcc419;
@background: #f8f9fa;
@card-bg: #ffffff;
@text: #2c3e50;
@text-light: #7f8c8d;
@border: #eaecef;

.react-ref-container {
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
    background: linear-gradient(135deg, @primary 0%, darken(@primary, 20%) 100%);
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

    .hook-visual {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;
      margin-top: 40px;
      flex-wrap: wrap;

      .hook-card {
        width: 200px;
        padding: 25px;
        border-radius: 16px;
        background: white;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .hook-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 15px;
          background: fade(@primary, 15%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;

          i {
            color: @primary;
          }
        }

        .hook-name {
          font-weight: 600;
          font-size: 1.2rem;
          color: @text;
        }
      }

      .plus-icon {
        font-size: 2.5rem;
        font-weight: bold;
        color: white;
        opacity: 0.7;
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

  .overview-section {
    .concepts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
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
        justify-content: space-between;
        margin-bottom: 20px;

        h3 {
          margin: 0;
          font-size: 1.5rem;
          color: @text;
          display: flex;
          align-items: center;

          i {
            margin-right: 10px;
            color: @primary;
          }
        }

        .concept-tag {
          background: fade(@primary, 15%);
          color: darken(@primary, 20%);
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }
      }

      .concept-content {
        p {
          color: @text-light;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .features {
          margin-bottom: 20px;

          .feature {
            display: flex;
            align-items: flex-start;
            margin-bottom: 12px;

            i {
              margin-right: 8px;
              color: @success;
              min-width: 24px;
              margin-top: 4px;
            }
          }
        }

        .signature {
          background: lighten(@background, 1%);
          border-radius: 8px;
          padding: 15px;
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
  }

  .useref-section {
    .tabs {
      background: @card-bg;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      margin-bottom: 40px;
    }

    .tab-buttons {
      display: flex;
      background: lighten(@background, 1%);
      border-bottom: 1px solid @border;

      button {
        flex: 1;
        padding: 18px 20px;
        background: none;
        border: none;
        font-size: 1.1rem;
        font-weight: 500;
        color: @text-light;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;

        &.active {
          color: @primary;
          font-weight: 600;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: @primary;
          }
        }

        &:hover:not(.active) {
          background: fade(@primary, 5%);
          color: darken(@primary, 10%);
        }
      }
    }

    .tab-content {
      padding: 30px;

      .tab-pane {
        h3 {
          font-size: 1.5rem;
          color: @text;
          margin-top: 0;
          margin-bottom: 15px;
        }

        p {
          color: @text-light;
          margin-bottom: 25px;
          line-height: 1.7;
        }

        .code-example {
          background: lighten(@background, 1%);
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 25px;
          overflow-x: auto;
          font-family: 'Fira Code', monospace;
          border: 1px solid @border;

          pre {
            margin: 0;
            font-size: 0.95rem;
            line-height: 1.5;
          }
        }

        .usage-tip {
          background: fade(@primary, 8%);
          border-radius: 8px;
          padding: 20px;
          margin-top: 25px;

          i {
            font-size: 1.2rem;
            margin-right: 10px;
            color: @primary;
            float: left;
          }

          ul {
            padding-left: 20px;
            margin: 10px 0 0;

            li {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
  }

  .imperative-section {
    .imperative-content {
      background: @card-bg;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      margin-bottom: 40px;
    }

    .explanation {
      margin-bottom: 30px;

      h3 {
        font-size: 1.4rem;
        color: @text;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p {
        color: @text-light;
        line-height: 1.7;
      }
    }

    .comparison {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 30px;
      margin-bottom: 40px;

      .approach {
        background: lighten(@background, 1%);
        border-radius: 12px;
        padding: 25px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        h4 {
          display: flex;
          align-items: center;
          font-size: 1.2rem;
          margin-top: 0;
          margin-bottom: 20px;

          i {
            margin-right: 8px;
          }
        }

        .code-example {
          background: @card-bg;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          overflow-x: auto;
          border: 1px solid @border;
        }

        .problem {
          background: fade(@accent, 10%);
          border-radius: 8px;
          padding: 15px;
          color: darken(@accent, 20%);
          display: flex;
          align-items: center;

          i {
            margin-right: 8px;
            font-size: 1.2rem;
          }
        }

        .benefit {
          background: fade(@success, 10%);
          border-radius: 8px;
          padding: 15px;
          color: darken(@success, 20%);
          display: flex;
          align-items: center;

          i {
            margin-right: 8px;
            font-size: 1.2rem;
          }
        }
      }
    }

    .imperative-use-case {
      h3 {
        font-size: 1.4rem;
        color: @text;
        margin-top: 0;
        margin-bottom: 25px;
      }

      .use-case-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;

        .use-case {
          text-align: center;
          padding: 25px 15px;
          background: lighten(@background, 1%);
          border-radius: 12px;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-5px);
            background: fade(@primary, 5%);
          }

          .icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 15px;
            background: fade(@primary, 15%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            color: @primary;
          }

          h4 {
            margin: 0 0 10px;
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
  }

  .combined-section {
    .combined-example {
      background: @card-bg;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      margin-bottom: 40px;

      .example-description {
        margin-bottom: 30px;

        h3 {
          font-size: 1.4rem;
          color: @text;
          margin-top: 0;
          margin-bottom: 15px;
        }

        p {
          color: @text-light;
          line-height: 1.7;
        }
      }

      .code-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
        gap: 30px;
        margin-bottom: 40px;

        .code-block {
          background: lighten(@background, 1%);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

          h4 {
            background: fade(@primary, 10%);
            margin: 0;
            padding: 15px 20px;
            font-size: 1.1rem;
            color: darken(@primary, 20%);
          }

          pre {
            margin: 0;
            padding: 20px;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
            max-height: 400px;
            overflow-y: auto;
          }
        }
      }

      .benefits {
        background: fade(@success, 8%);
        border-radius: 12px;
        padding: 25px;
        border-left: 4px solid @success;

        h3 {
          font-size: 1.3rem;
          margin-top: 0;
          margin-bottom: 15px;
          color: darken(@success, 20%);
        }

        ul {
          padding-left: 20px;
          margin: 0;

          li {
            margin-bottom: 12px;
            display: flex;
            align-items: flex-start;

            i {
              margin-right: 10px;
              color: @success;
              min-width: 24px;
            }
          }
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

        .number {
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
          flex-shrink: 0;
          margin-right: 15px;
        }

        .content {
          h3 {
            font-size: 1.1rem;
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

    .when-to-use {
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

      .scenarios {
        .scenario {
          display: flex;
          align-items: center;
          padding: 12px 15px;
          margin-bottom: 10px;
          border-radius: 8px;
          background: lighten(@background, 1%);

          i {
            margin-right: 12px;
            font-size: 1.2rem;

            &.yes {
              color: @success;
            }

            &.no {
              color: @accent;
            }
          }
        }
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

    .hook-visual {
      gap: 15px !important;

      .hook-card {
        width: 160px !important;
        padding: 20px !important;
      }
    }
  }

  .section-header {
    h2 {
      font-size: 1.5rem !important;
    }
  }

  .concepts {
    grid-template-columns: 1fr !important;
  }

  .tab-buttons {
    flex-wrap: wrap;

    button {
      flex: 1 0 50% !important;
      padding: 15px !important;
      font-size: 1rem !important;
    }
  }

  .code-container {
    grid-template-columns: 1fr !important;
  }
}
</style>
