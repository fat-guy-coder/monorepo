<template>
  <div class="hooks-container">
    <header class="header">
      <h1>React自定义Hooks基础介绍</h1>
      <p class="subtitle">组件逻辑复用与状态管理的新范式</p>
    </header>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">🚀</span>
        自定义Hooks核心概念
      </h2>

      <div class="concept-grid">
        <div class="concept-card">
          <div class="concept-icon">🔄</div>
          <h3>什么是自定义Hooks？</h3>
          <p>自定义Hooks是封装可复用逻辑的JavaScript函数，遵循React Hooks规则并以"use"开头命名。</p>
        </div>

        <div class="concept-card">
          <div class="concept-icon">🧩</div>
          <h3>核心目的</h3>
          <p>解决组件间逻辑复用问题，避免高阶组件(HOC)和渲染属性(Render Props)的嵌套地狱。</p>
        </div>

        <div class="concept-card">
          <div class="concept-icon">🔄</div>
          <h3>与传统模式对比</h3>
          <p>相比HOC和Render Props，自定义Hooks提供更直接的逻辑复用方式，保持组件层次扁平。</p>
        </div>
      </div>

      <div class="benefits">
        <h3>使用自定义Hooks的优势</h3>
        <div class="benefit-list">
          <div class="benefit-item">
            <div class="benefit-icon">📚</div>
            <div class="benefit-content">
              <h4>逻辑复用</h4>
              <p>跨组件共享状态逻辑，避免重复代码</p>
            </div>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">🧠</div>
            <div class="benefit-content">
              <h4>关注点分离</h4>
              <p>将复杂组件拆分为更小的功能单元</p>
            </div>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">🧼</div>
            <div class="benefit-content">
              <h4>代码整洁</h4>
              <p>减少组件内的状态和副作用代码</p>
            </div>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">⚙️</div>
            <div class="benefit-content">
              <h4>易于测试</h4>
              <p>独立测试业务逻辑，无需渲染组件</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">🔧</span>
        创建和使用自定义Hooks
      </h2>

      <div class="creation-steps">
        <div class="step">
          <div class="step-header">1. 创建Hook文件</div>
          <div class="step-content">
            <p>创建以<code>use</code>开头的JS/TS文件，如<code>useLocalStorage.js</code></p>
          </div>
        </div>

        <div class="step">
          <div class="step-header">2. 定义Hook函数</div>
          <div class="step-content">
            <p>使用React内置Hooks组合功能逻辑</p>
            <pre><code>function useCustomHook(initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // 副作用逻辑
  }, [value]);

  return [value, setValue];
}</code></pre>
          </div>
        </div>

        <div class="step">
          <div class="step-header">3. 在组件中使用</div>
          <div class="step-content">
            <p>像内置Hooks一样调用自定义Hook</p>
            <pre><code>function MyComponent() {
  const [data, setData] = useCustomHook('');

  return (
    &lt;div>
      &lt;input value={data} onChange={e => setData(e.target.value)} />
    &lt;/div>
  );
}</code></pre>
          </div>
        </div>
      </div>

      <div class="rules-section">
        <h3>自定义Hooks规则</h3>
        <div class="rule-list">
          <div class="rule">
            <div class="rule-icon">🔤</div>
            <div class="rule-content">
              <h4>命名约定</h4>
              <p>必须以"use"开头（如useFetch）</p>
            </div>
          </div>

          <div class="rule">
            <div class="rule-icon">🚫</div>
            <div class="rule-content">
              <h4>条件限制</h4>
              <p>不能在循环、条件或嵌套函数中调用</p>
            </div>
          </div>

          <div class="rule">
            <div class="rule-icon">🧾</div>
            <div class="rule-content">
              <h4>返回值</h4>
              <p>可以返回任何值（值、函数、对象等）</p>
            </div>
          </div>

          <div class="rule">
            <div class="rule-icon">🧪</div>
            <div class="rule-content">
              <h4>可测试性</h4>
              <p>独立于React组件进行单元测试</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">💼</span>
        自定义Hooks常见使用场景
      </h2>

      <div class="scenarios">
        <div class="scenario-card">
          <div class="scenario-icon">🌐</div>
          <h3>API请求</h3>
          <p>封装数据获取和加载状态</p>
          <div class="code-snippet">
            <pre><code>function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}</code></pre>
          </div>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon">💾</div>
          <h3>本地存储</h3>
          <p>同步状态与localStorage</p>
          <div class="code-snippet">
            <pre><code>function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value) => {
    const valueToStore =
      value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}</code></pre>
          </div>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon">🖱️</div>
          <h3>事件监听</h3>
          <p>管理窗口事件和按键事件</p>
          <div class="code-snippet">
            <pre><code>function useEventListener(eventType, handler, element = window) {
  const savedHandler = useRef();

  // 保存处理函数
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (e) => savedHandler.current(e);
    element.addEventListener(eventType, eventListener);

    return () => {
      element.removeEventListener(eventType, eventListener);
    };
  }, [eventType, element]);
}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">🛠️</span>
        进阶自定义Hook示例
      </h2>

      <div class="advanced-hooks">
        <div class="hook-example">
          <h3>useDarkMode - 暗黑模式切换</h3>
          <div class="code-snippet">
            <pre><code>function useDarkMode() {
  const [isDark, setIsDark] = useLocalStorage('dark-mode', false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return [isDark, toggleDarkMode];
}

// 使用示例
function ThemeToggle() {
  const [isDark, toggleDarkMode] = useDarkMode();

  return (
    &lt;button onClick={toggleDarkMode}>
      {isDark ? '切换到亮色模式' : '切换到暗黑模式'}
    &lt;/button>
  );
}</code></pre>
          </div>
        </div>

        <div class="hook-example">
          <h3>useForm - 表单管理</h3>
          <div class="code-snippet">
            <pre><code>function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      onSubmit(values);
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}

// 使用示例
function LoginForm() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    validateLogin
  );

  const onSubmit = (data) => {
    console.log('登录表单数据:', data);
  };

  return (
    &lt;form onSubmit={handleSubmit(onSubmit)}>
      &lt;input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="邮箱"
      />
      {errors.email && &lt;span>{errors.email}&lt;/span>}

      &lt;input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="密码"
      />
      {errors.password && &lt;span>{errors.password}&lt;/span>}

      &lt;button type="submit">登录&lt;/button>
    &lt;/form>
  );
}</code></pre>
          </div>
        </div>

        <div class="hook-example">
          <h3>useDebounce - 防抖处理</h3>
          <div class="code-snippet">
            <pre><code>function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 使用示例：搜索框防抖
function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      // 执行搜索API调用
      fetchResults(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    &lt;input
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="搜索..."
    />
  );
}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">📈</span>
        自定义Hooks最佳实践
      </h2>

      <div class="best-practices">
        <div class="practice-card">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <h3>遵循单一职责原则</h3>
            <p>每个Hook只解决一个特定问题，保持简单和小巧</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <h3>合理命名</h3>
            <p>使用清晰的功能性名称（如useWindowSize而不是useSize）</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <h3>充分测试</h3>
            <p>使用React Testing Library测试Hook行为</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <h3>提供选项参数</h3>
            <p>为Hook添加配置选项提高灵活性</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-icon">✅</div>
          <div class="practice-content">
            <h3>返回稳定引用</h3>
            <p>使用useCallback/useMemo避免不必要的重渲染</p>
          </div>
        </div>
      </div>

      <div class="anti-patterns">
        <h3>避免的反模式</h3>
        <div class="anti-pattern-grid">
          <div class="anti-pattern">
            <div class="anti-icon">❌</div>
            <div class="anti-content">
              <h4>过度抽象</h4>
              <p>不要为了复用而复用，避免不必要的抽象</p>
            </div>
          </div>

          <div class="anti-pattern">
            <div class="anti-icon">❌</div>
            <div class="anti-content">
              <h4>忽略清理</h4>
              <p>忘记清理事件监听器、定时器等资源</p>
            </div>
          </div>

          <div class="anti-pattern">
            <div class="anti-icon">❌</div>
            <div class="anti-content">
              <h4>违反规则</h4>
              <p>在条件语句或循环中调用Hook</p>
            </div>
          </div>

          <div class="anti-pattern">
            <div class="anti-icon">❌</div>
            <div class="anti-content">
              <h4>过度嵌套</h4>
              <p>避免多层Hook相互依赖，保持简单</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">📚</span>
        热门自定义Hooks库
      </h2>

      <div class="libraries">
        <div class="library-card">
          <h3>React Use</h3>
          <div class="stats">
            <span>⭐ GitHub Stars: 35k+</span>
            <span>📦 80+ Hooks</span>
          </div>
          <div class="library-description">
            <p>最全面的React Hooks集合，覆盖各种场景</p>
          </div>
          <div class="examples">
            <h4>常用Hooks:</h4>
            <ul>
              <li>useToggle</li>
              <li>useLocalStorage</li>
              <li>useAsync</li>
              <li>useMedia</li>
            </ul>
          </div>
        </div>

        <div class="library-card">
          <h3>Ahooks</h3>
          <div class="stats">
            <span>⭐ GitHub Stars: 12k+</span>
            <span>📦 70+ Hooks</span>
          </div>
          <div class="library-description">
            <p>阿里巴巴开源的Hooks库，高质量企业级解决方案</p>
          </div>
          <div class="examples">
            <h4>常用Hooks:</h4>
            <ul>
              <li>useRequest</li>
              <li>useAntdTable</li>
              <li>useVirtualList</li>
              <li>useDynamicList</li>
            </ul>
          </div>
        </div>

        <div class="library-card">
          <h3>React Hook Form</h3>
          <div class="stats">
            <span>⭐ GitHub Stars: 34k+</span>
            <span>📦 高性能表单</span>
          </div>
          <div class="library-description">
            <p>专注于表单管理的自定义Hooks集合</p>
          </div>
          <div class="examples">
            <h4>核心功能:</h4>
            <ul>
              <li>高性能表单验证</li>
              <li>最小重渲染</li>
              <li>零依赖</li>
              <li>易集成UI库</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <footer class="conclusion">
      <h2>自定义Hooks核心价值</h2>
      <div class="summary">
        <div class="summary-point">
          <div class="point-icon">💡</div>
          <p>将组件逻辑提取为可重用函数</p>
        </div>

        <div class="summary-point">
          <div class="point-icon">💡</div>
          <p>提升代码复用率和可维护性</p>
        </div>

        <div class="summary-point">
          <div class="point-icon">💡</div>
          <p>简化复杂组件的结构和逻辑</p>
        </div>

        <div class="summary-point">
          <div class="point-icon">💡</div>
          <p>促进关注点分离和单一职责原则</p>
        </div>
      </div>

      <div class="final-tip">
        <p>记住：<span class="highlight">"当多个组件需要共享状态逻辑时，就是创建自定义Hook的最佳时机"</span></p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里不需要实际逻辑，仅用于演示
import { ref } from 'vue';

const activeSection = ref('concept');
</script>

<style lang="less" scoped>
@font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@primary-color: #61dafb;
@secondary-color: #20232a;
@text-primary: #2c3e50;
@text-secondary: #5c677d;
@border-color: #e1e4e8;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@success-color: #42b983;
@warning-color: #ff9800;
@error-color: #e53935;

.hooks-container {
  font-family: @font-family;
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
}

.header {
  text-align: center;
  background: linear-gradient(135deg, fade(@primary-color, 8%), fade(@primary-color, 4%));
  border-radius: 16px;
  padding: 35px 30px;
  margin-bottom: 35px;
  border: 1px solid fade(@primary-color, 15%);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 15px;
    color: @secondary-color;
  }

  .subtitle {
    font-size: 1.3rem;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto;
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 1.7rem;
    margin-top: 0;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid fade(@primary-color, 10%);
    display: flex;
    align-items: center;
    gap: 12px;

    .icon {
      font-size: 1.5rem;
    }
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.concept-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .concept-icon {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 15px;
  }

  h3 {
    margin-top: 0;
    text-align: center;
    color: @secondary-color;
    font-size: 1.3rem;
  }

  p {
    color: @text-secondary;
    text-align: center;
  }
}

.benefits {
  margin-top: 40px;

  h3 {
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 25px;
    color: @secondary-color;
  }
}

.benefit-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: white;
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .benefit-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .benefit-content {
    h4 {
      margin: 0 0 8px 0;
      color: @secondary-color;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: @text-secondary;
      font-size: 0.95rem;
    }
  }
}

.creation-steps {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 30px 0;
}

.step {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid @primary-color;

  .step-header {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: @secondary-color;
    display: flex;
    align-items: center;
    gap: 10px;

    &:before {
      content: '→';
      color: @primary-color;
      font-weight: bold;
    }
  }

  .step-content {
    padding-left: 25px;

    code {
      background: fade(@primary-color, 10%);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }

    pre {
      margin-top: 15px;
    }
  }
}

.rules-section {
  margin-top: 40px;

  h3 {
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 25px;
    color: @secondary-color;
  }
}

.rule-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.rule {
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .rule-icon {
    font-size: 1.8rem;
    flex-shrink: 0;
  }

  .rule-content {
    h4 {
      margin: 0 0 5px 0;
      color: @secondary-color;
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: @text-secondary;
      font-size: 0.95rem;
    }
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 25px;
}

.scenario-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-top: 4px solid @primary-color;

  .scenario-icon {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 15px;
  }

  h3 {
    margin-top: 0;
    text-align: center;
    color: @secondary-color;
    font-size: 1.3rem;
  }

  p {
    text-align: center;
    color: @text-secondary;
    margin-bottom: 20px;
  }
}

.code-snippet {
  background: #282c34;
  color: #abb2bf;
  padding: 18px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-x: auto;
  margin-top: 15px;

  code {
    display: block;
  }
}

.advanced-hooks {
  margin-top: 30px;
}

.hook-example {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);

  h3 {
    margin-top: 0;
    color: @secondary-color;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-color;
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.practice-card {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .practice-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    margin-top: 4px;
  }

  h3 {
    margin: 0 0 8px 0;
    color: @secondary-color;
    font-size: 1.15rem;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.anti-patterns {
  h3 {
    text-align: center;
    font-size: 1.4rem;
    margin-bottom: 25px;
    color: @secondary-color;
  }
}

.anti-pattern-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.anti-pattern {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-left: 3px solid @error-color;

  .anti-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    margin-top: 4px;
    color: @error-color;
  }

  h4 {
    margin: 0 0 8px 0;
    color: @secondary-color;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.libraries {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.library-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-top: 4px solid @primary-color;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin-top: 0;
    text-align: center;
    color: @secondary-color;
    font-size: 1.4rem;
  }

  .stats {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 15px 0;
    font-size: 0.9rem;
    color: @text-secondary;
  }

  .library-description {
    text-align: center;
    margin-bottom: 20px;
  }

  .examples {
    background: fade(@primary-color, 5%);
    border-radius: 8px;
    padding: 15px;

    h4 {
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 1.05rem;
    }

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 8px;
      }
    }
  }
}

.conclusion {
  background: linear-gradient(135deg, fade(@primary-color, 8%), fade(@primary-color, 4%));
  border-radius: 16px;
  padding: 35px;
  border: 1px solid fade(@primary-color, 15%);
  text-align: center;

  h2 {
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 25px;
    color: @secondary-color;
  }
}

.summary {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  max-width: 800px;
  margin: 0 auto 30px;
}

.summary-point {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  padding: 15px 25px;
  border-radius: 50px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);

  .point-icon {
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-weight: 500;
  }
}

.final-tip {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;

  p {
    font-size: 1.2rem;
    margin: 10px 0;

    .highlight {
      background: rgba(255, 255, 255, 0.9);
      padding: 3px 8px;
      border-radius: 6px;
      font-weight: 600;
      color: darken(@primary-color, 25%);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 25px 15px;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section {
    padding: 20px 15px;

    .section-title {
      font-size: 1.5rem;
    }
  }

  .creation-steps {
    gap: 20px;
  }

  .scenarios {
    grid-template-columns: 1fr;
  }

  .libraries {
    grid-template-columns: 1fr;
  }
}
</style>
