<template>
  <div class="lifecycle-container">
    <header class="header">
      <div class="logo-container">
        <div class="react-logo">
          <div class="react-logo-inner"></div>
        </div>
        <div class="title-container">
          <h1>React 生命周期基本介绍</h1>
          <p class="subtitle">深入理解组件从创建到销毁的完整过程</p>
        </div>
      </div>
      <div class="phase-badges">
        <div class="badge mount">挂载阶段</div>
        <div class="badge update">更新阶段</div>
        <div class="badge unmount">卸载阶段</div>
      </div>
    </header>

    <div class="content-container">
      <nav class="sidebar">
        <div class="section-title">生命周期阶段</div>
        <ul>
          <li v-for="item in navItems" :key="item.id" :class="{ active: activeSection === item.id }"
            @click="activeSection = item.id">
            <span>{{ item.title }}</span>
            <span class="badge" :class="item.phase">{{ item.phase }}</span>
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 挂载阶段 -->
        <section v-show="activeSection === 'mounting'" class="section">
          <div class="section-header">
            <h2>挂载阶段 (Mounting)</h2>
            <div class="phase-tag">组件创建并插入DOM</div>
          </div>

          <div class="lifecycle-methods">
            <!-- constructor -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">1</div>
                <h3>constructor()</h3>
                <div class="method-type">类组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>组件初始化时调用，在挂载前执行</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>初始化组件的 state</li>
                    <li>绑定事件处理函数</li>
                    <li>设置初始值</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>避免引入副作用或订阅</li>
                    <li>在调用 super(props) 前不能使用 this</li>
                    <li>不要调用 setState()</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
}</code></pre>
                </div>
              </div>
            </div>

            <!-- getDerivedStateFromProps -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">2</div>
                <h3>static getDerivedStateFromProps()</h3>
                <div class="method-type">类组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>在调用 render 方法之前调用，初始挂载和后续更新时都会调用</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>props 变化时更新 state</li>
                    <li>根据 props 计算派生状态</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>静态方法，无法访问 this</li>
                    <li>应尽量少用，优先考虑其他方案</li>
                    <li>返回对象更新 state 或 null 不更新</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>class MyComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.prevValue) {
      return {
        value: props.value,
        prevValue: props.value
      };
    }
    return null;
  }
}</code></pre>
                </div>
              </div>
            </div>

            <!-- render -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">3</div>
                <h3>render()</h3>
                <div class="method-type">类组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>每次组件渲染时调用（挂载和更新阶段）</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>返回 JSX 描述 UI</li>
                    <li>计算 props/state 并返回结果</li>
                    <li>渲染子组件</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>必须是纯函数，不修改组件状态</li>
                    <li>不直接与浏览器交互</li>
                    <li>避免在 render 中调用 setState()</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>class MyComponent extends React.Component {
  render() {
    return (
      &lt;div&gt;
        &lt;h1&gt;Hello, {this.props.name}&lt;/h1&gt;
        &lt;p&gt;Count: {this.state.count}&lt;/p&gt;
      &lt;/div&gt;
    );
  }
}</code></pre>
                </div>
              </div>
            </div>

            <!-- componentDidMount -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">4</div>
                <h3>componentDidMount()</h3>
                <div class="method-type">类组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>组件挂载后（插入 DOM 树后）立即调用</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>发起网络请求获取数据</li>
                    <li>设置订阅</li>
                    <li>操作 DOM 节点</li>
                    <li>初始化第三方库</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>可以调用 setState() 但会触发额外渲染</li>
                    <li>添加的订阅需要在 componentWillUnmount 中取消</li>
                    <li>避免阻塞此方法执行</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>class MyComponent extends React.Component {
  componentDidMount() {
    // 获取数据
    fetchData().then(data => {
      this.setState({ data });
    });

    // 添加事件监听
    window.addEventListener('resize', this.handleResize);
  }
}</code></pre>
                </div>
              </div>
            </div>

            <!-- useEffect (Mount) -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">※</div>
                <h3>useEffect (挂载)</h3>
                <div class="method-type">函数组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>组件挂载后执行，依赖数组为空时只运行一次</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>替代 componentDidMount</li>
                    <li>执行副作用操作</li>
                    <li>设置订阅和事件监听</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>返回清理函数替代 componentWillUnmount</li>
                    <li>依赖数组控制执行时机</li>
                    <li>避免阻塞渲染</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>function MyComponent() {
  useEffect(() => {
    // 组件挂载后执行
    fetchData();
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依赖数组表示只运行一次
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 更新阶段 -->
        <section v-show="activeSection === 'updating'" class="section">
          <div class="section-header">
            <h2>更新阶段 (Updating)</h2>
            <div class="phase-tag">props 或 state 变化时触发</div>
          </div>

          <div class="lifecycle-methods">
            <!-- getDerivedStateFromProps (update) -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">1</div>
                <h3>static getDerivedStateFromProps()</h3>
                <div class="method-type">类组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>更新阶段在调用 render 方法之前调用</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>props 变化时更新 state</li>
                    <li>根据新的 props 计算派生状态</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>与挂载阶段相同的方法</li>
                    <li>应谨慎使用，可能导致代码冗余</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>class MyComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.userId !== state.prevUserId) {
      return {
        userId: props.userId,
        prevUserId: props.userId,
        data: null // 重置数据
      };
    }
    return null;
  }
}</code></pre>
                </div>
              </div>
            </div>

            <!-- shouldComponentUpdate -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">2</div>
                <h3>shouldComponentUpdate()</h3>
                <div class="method-type">类组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>在接收到新的 props 或 state 时，在 render 前调用</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>性能优化，避免不必要的渲染</li>
                    <li>根据 props/state 变化决定是否更新</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>返回 false 可阻止组件更新</li>
                    <li>不要在其中执行副作用</li>
                    <li>考虑使用 PureComponent 替代</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 仅当 count 改变时重新渲染
    return nextState.count !== this.state.count;
  }
}</code></pre>
                </div>
              </div>
            </div>

            <!-- render (update) -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">3</div>
                <h3>render()</h3>
                <div class="method-type">类组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>每次更新时调用，与挂载阶段相同</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>根据新的 props/state 返回更新的 UI</li>
                    <li>计算并返回渲染结果</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>保持纯函数特性</li>
                    <li>避免在 render 中修改状态</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>// 与挂载阶段的 render 相同
render() {
  // 根据最新状态渲染
}</code></pre>
                </div>
              </div>
            </div>

            <!-- getSnapshotBeforeUpdate -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">4</div>
                <h3>getSnapshotBeforeUpdate()</h3>
                <div class="method-type">类组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>在最近一次渲染输出（提交到 DOM 节点）之前调用</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>获取 DOM 更新前的状态（如滚动位置）</li>
                    <li>在 DOM 变化前捕获信息</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>返回的值将作为参数传递给 componentDidUpdate</li>
                    <li>使用场景较少</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>class MyComponent extends React.Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.items.length < this.props.items.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }
}</code></pre>
                </div>
              </div>
            </div>

            <!-- componentDidUpdate -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">5</div>
                <h3>componentDidUpdate()</h3>
                <div class="method-type">类组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>更新后立即调用（首次渲染不会调用）</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>响应 props 或 state 的变化</li>
                    <li>执行网络请求</li>
                    <li>操作更新后的 DOM</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>可以调用 setState() 但必须包裹在条件语句中</li>
                    <li>比较当前 props 与先前 props 避免无限循环</li>
                    <li>添加的订阅需要相应取消</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>class MyComponent extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }
  }
}</code></pre>
                </div>
              </div>
            </div>

            <!-- useEffect (Update) -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">※</div>
                <h3>useEffect (更新)</h3>
                <div class="method-type">函数组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>在依赖项变化后执行</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>替代 componentDidUpdate</li>
                    <li>响应特定状态变化</li>
                    <li>执行副作用操作</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>通过依赖数组控制执行条件</li>
                    <li>每次渲染都会创建新的 effect 函数</li>
                    <li>清理函数在每次重新渲染前运行</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>function MyComponent({ userId }) {
  useEffect(() => {
    // 当 userId 变化时执行
    fetchUserData(userId);

    return () => {
      // 清理函数，在 userId 变化前或组件卸载前执行
    };
  }, [userId]); // 依赖数组
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 卸载阶段 -->
        <section v-show="activeSection === 'unmounting'" class="section">
          <div class="section-header">
            <h2>卸载阶段 (Unmounting)</h2>
            <div class="phase-tag">组件从 DOM 中移除</div>
          </div>

          <div class="lifecycle-methods">
            <!-- componentWillUnmount -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">1</div>
                <h3>componentWillUnmount()</h3>
                <div class="method-type">类组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>组件卸载及销毁之前立即调用</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>清除定时器</li>
                    <li>取消网络请求</li>
                    <li>移除事件监听</li>
                    <li>清理订阅</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>不应调用 setState()，因为组件不会重新渲染</li>
                    <li>此方法结束后组件将被卸载</li>
                    <li>必须清理所有组件创建的长期资源</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>class MyComponent extends React.Component {
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
}</code></pre>
                </div>
              </div>
            </div>

            <!-- useEffect (Unmount) -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">※</div>
                <h3>useEffect (清理)</h3>
                <div class="method-type">函数组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>组件卸载前执行清理函数</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>替代 componentWillUnmount</li>
                    <li>清除定时器、事件监听等</li>
                    <li>取消网络请求</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>返回的函数即为清理函数</li>
                    <li>每次 effect 重新执行前都会运行清理函数</li>
                    <li>空依赖数组时只在卸载时运行</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>function MyComponent() {
  useEffect(() => {
    const timer = setInterval(() => {
      // 执行操作
    }, 1000);

    // 清理函数
    return () => {
      clearInterval(timer);
    };
  }, []);
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 错误处理 -->
        <section v-show="activeSection === 'error'" class="section">
          <div class="section-header">
            <h2>错误处理 (Error Handling)</h2>
            <div class="phase-tag">捕获子组件树中的错误</div>
          </div>

          <div class="lifecycle-methods">
            <!-- getDerivedStateFromError -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">1</div>
                <h3>static getDerivedStateFromError()</h3>
                <div class="method-type">类组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>在后代组件抛出错误后被调用</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>捕获渲染期间发生的错误</li>
                    <li>更新 state 以显示错误回退 UI</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>静态方法，无法访问 this</li>
                    <li>在渲染阶段调用，不允许副作用</li>
                    <li>应返回一个对象更新 state</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // 更新 state 以显示错误回退 UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return &lt;h1&gt;Something went wrong.&lt;/h1&gt;;
    }
    return this.props.children;
  }
}</code></pre>
                </div>
              </div>
            </div>

            <!-- componentDidCatch -->
            <div class="method-card">
              <div class="method-header">
                <div class="method-icon">2</div>
                <h3>componentDidCatch()</h3>
                <div class="method-type">类组件</div>
              </div>
              <div class="method-details">
                <div class="timing">
                  <span class="label">执行时机：</span>
                  <span>在后代组件抛出错误后被调用</span>
                </div>
                <div class="purpose">
                  <span class="label">适用场景：</span>
                  <ul>
                    <li>捕获渲染期间发生的错误</li>
                    <li>记录错误信息</li>
                    <li>执行错误恢复操作</li>
                  </ul>
                </div>
                <div class="restrictions">
                  <span class="label">注意事项：</span>
                  <ul>
                    <li>在提交阶段调用，允许执行副作用</li>
                    <li>只能捕获子组件树的错误</li>
                    <li>无法捕获异步、事件处理或自身抛出的错误</li>
                  </ul>
                </div>
                <div class="code-block">
                  <pre><code>class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, errorInfo) {
    // 记录错误信息
    logErrorToService(error, errorInfo);
  }

  render() {
    // 渲染逻辑
  }
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 生命周期流程图 -->
        <section v-show="activeSection === 'flow'" class="section">
          <div class="section-header">
            <h2>生命周期流程图</h2>
            <div class="phase-tag">可视化组件生命周期</div>
          </div>

          <div class="lifecycle-flow">
            <div class="flow-diagram">
              <div class="phase mount">
                <div class="phase-title">挂载阶段</div>
                <div class="methods">
                  <div class="method">constructor()</div>
                  <div class="arrow">↓</div>
                  <div class="method">getDerivedStateFromProps()</div>
                  <div class="arrow">↓</div>
                  <div class="method">render()</div>
                  <div class="arrow">↓</div>
                  <div class="method">componentDidMount()</div>
                </div>
              </div>

              <div class="phase update">
                <div class="phase-title">更新阶段</div>
                <div class="methods">
                  <div class="method">getDerivedStateFromProps()</div>
                  <div class="arrow">↓</div>
                  <div class="method">shouldComponentUpdate()</div>
                  <div class="arrow">↓</div>
                  <div class="method">render()</div>
                  <div class="arrow">↓</div>
                  <div class="method">getSnapshotBeforeUpdate()</div>
                  <div class="arrow">↓</div>
                  <div class="method">componentDidUpdate()</div>
                </div>
              </div>

              <div class="phase unmount">
                <div class="phase-title">卸载阶段</div>
                <div class="methods">
                  <div class="method">componentWillUnmount()</div>
                </div>
              </div>

              <div class="error-boundary">
                <div class="phase-title">错误处理</div>
                <div class="methods">
                  <div class="method">getDerivedStateFromError()</div>
                  <div class="arrow">↓</div>
                  <div class="method">componentDidCatch()</div>
                </div>
              </div>
            </div>

            <div class="flow-legend">
              <div class="legend-item">
                <div class="color-box class"></div>
                <div>类组件方法</div>
              </div>
              <div class="legend-item">
                <div class="color-box function"></div>
                <div>函数组件等效</div>
              </div>
              <div class="legend-item">
                <div class="color-box optional"></div>
                <div>可选方法</div>
              </div>
            </div>

            <div class="flow-comparison">
              <h3>类组件 vs 函数组件生命周期对比</h3>
              <div class="comparison-table">
                <div class="table-header">
                  <div class="header-cell">类组件方法</div>
                  <div class="header-cell">函数组件等效</div>
                  <div class="header-cell">说明</div>
                </div>
                <div class="table-row">
                  <div class="cell">constructor</div>
                  <div class="cell">useState 初始化</div>
                  <div class="cell">初始化状态</div>
                </div>
                <div class="table-row">
                  <div class="cell">componentDidMount</div>
                  <div class="cell">useEffect(() => {}, [])</div>
                  <div class="cell">挂载后执行副作用</div>
                </div>
                <div class="table-row">
                  <div class="cell">componentDidUpdate</div>
                  <div class="cell">useEffect(() => {}, [deps])</div>
                  <div class="cell">依赖变化后执行</div>
                </div>
                <div class="table-row">
                  <div class="cell">componentWillUnmount</div>
                  <div class="cell">useEffect 返回的函数</div>
                  <div class="cell">清理函数</div>
                </div>
                <div class="table-row">
                  <div class="cell">shouldComponentUpdate</div>
                  <div class="cell">React.memo, useMemo</div>
                  <div class="cell">性能优化</div>
                </div>
                <div class="table-row">
                  <div class="cell">getDerivedStateFromProps</div>
                  <div class="cell">在渲染时更新状态</div>
                  <div class="cell">根据 props 更新 state</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p> React 生命周期指南 | 使用 Vue3 制作</p>
      <p>React 是 Facebook 的注册商标</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const navItems = ref([
  { id: 'mounting', title: '挂载阶段', phase: 'mount' },
  { id: 'updating', title: '更新阶段', phase: 'update' },
  { id: 'unmounting', title: '卸载阶段', phase: 'unmount' },
  { id: 'error', title: '错误处理', phase: 'error' },
  { id: 'flow', title: '生命周期流程图', phase: 'flow' }
]);

// 当前活动部分
const activeSection = ref('mounting');
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #61dafb;
@primary-dark: #00a3cc;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@mount-color: #10b981;
@update-color: #f59e0b;
@unmount-color: #ef4444;
@error-color: #8b5cf6;

// 混合
.box-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition {
  transition: all 0.3s ease;
}

// 全局样式
.lifecycle-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: @background;
  color: @text-color;
  min-height: 100vh;
  line-height: 1.6;
  padding: 0;
  margin: 0;
}

.header {
  background: linear-gradient(135deg, darken(@primary-color, 15%), @primary-color);
  color: white;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  position: relative;

  .logo-container {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }

  .title-container {
    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.1rem;
      opacity: 0.9;
      margin: 0.25rem 0 0;
      font-weight: 300;
    }
  }

  .phase-badges {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);

      &.mount {
        background: rgba(@mount-color, 0.2);
        border-color: lighten(@mount-color, 10%);
      }

      &.update {
        background: rgba(@update-color, 0.2);
        border-color: lighten(@update-color, 10%);
      }

      &.unmount {
        background: rgba(@unmount-color, 0.2);
        border-color: lighten(@unmount-color, 10%);
      }
    }
  }
}

// React Logo动画
.react-logo {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 4px solid white;
  animation: rotate 15s linear infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.7);
  }

  &::before {
    transform: rotate(60deg);
  }

  &::after {
    transform: rotate(-60deg);
  }

  .react-logo-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

.content-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  gap: 2rem;
}

.sidebar {
  flex: 0 0 260px;
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem 0;
  .box-shadow;
  align-self: flex-start;

  .section-title {
    color: @text-secondary;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0 1.5rem 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    .transition;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background-color: lighten(@primary-color, 45%);
    }

    &.active {
      background-color: lighten(@primary-color, 40%);
      border-left: 4px solid @primary-color;
      font-weight: 600;
      color: @primary-dark;
    }

    .badge {
      font-size: 0.75rem;
      padding: 0.15rem 0.5rem;
      border-radius: 10px;
      font-weight: 500;

      &.mount {
        background: lighten(@mount-color, 45%);
        color: darken(@mount-color, 15%);
      }

      &.update {
        background: lighten(@update-color, 45%);
        color: darken(@update-color, 15%);
      }

      &.unmount {
        background: lighten(@unmount-color, 45%);
        color: darken(@unmount-color, 15%);
      }

      &.error {
        background: lighten(@error-color, 45%);
        color: darken(@error-color, 15%);
      }
    }
  }
}

.main-content {
  flex: 1;
}

.section {
  margin-bottom: 2.5rem;

  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    h2 {
      font-size: 1.75rem;
      color: @primary-dark;
      margin: 0;
    }
  }
}

.phase-tag {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  background: lighten(@primary-color, 40%);
  color: darken(@primary-color, 25%);
}

.lifecycle-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.method-card {
  background: @card-bg;
  border-radius: 12px;
  overflow: hidden;
  .box-shadow;

  .method-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: lighten(@primary-color, 45%);

    .method-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      font-weight: bold;
      font-size: 1.1rem;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
      color: @primary-dark;
    }

    .method-type {
      font-size: 0.85rem;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.7);
      color: @text-secondary;
      margin-left: auto;
    }
  }

  .method-details {
    padding: 1.5rem;

    .label {
      font-weight: 600;
      color: @primary-dark;
      margin-right: 0.5rem;
    }

    .timing,
    .purpose,
    .restrictions {
      margin-bottom: 1.25rem;
    }

    ul {
      padding-left: 1.5rem;
      margin: 0.5rem 0;

      li {
        margin-bottom: 0.5rem;
        color: @text-secondary;
      }
    }
  }
}

.code-block {
  background: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 1.25rem;
  margin-top: 1rem;
  overflow-x: auto;
  font-size: 0.95rem;

  pre {
    margin: 0;
    font-family: 'Fira Code', monospace;
    color: #2f363d;
  }
}

.lifecycle-flow {
  .flow-diagram {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .phase {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      .box-shadow;

      .phase-title {
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid;
      }

      .methods {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .method {
        background: lighten(@primary-color, 45%);
        border: 1px solid @primary-color;
        border-radius: 8px;
        padding: 0.75rem 1rem;
        text-align: center;
        font-weight: 500;
      }

      .arrow {
        text-align: center;
        color: @text-secondary;
        font-weight: bold;
        padding: 0.25rem 0;
      }
    }

    .mount {
      .phase-title {
        color: @mount-color;
        border-bottom-color: lighten(@mount-color, 30%);
      }
    }

    .update {
      .phase-title {
        color: @update-color;
        border-bottom-color: lighten(@update-color, 30%);
      }
    }

    .unmount {
      .phase-title {
        color: @unmount-color;
        border-bottom-color: lighten(@unmount-color, 30%);
      }
    }

    .error-boundary {
      .phase-title {
        color: @error-color;
        border-bottom-color: lighten(@error-color, 30%);
      }
    }
  }

  .flow-legend {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-bottom: 2rem;

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .color-box {
        width: 20px;
        height: 20px;
        border-radius: 4px;

        &.class {
          background: lighten(@primary-color, 30%);
          border: 1px solid @primary-color;
        }

        &.function {
          background: lighten(@mount-color, 40%);
          border: 1px solid @mount-color;
        }

        &.optional {
          background: lighten(@text-secondary, 40%);
          border: 1px solid @text-secondary;
        }
      }
    }
  }

  .flow-comparison {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    .box-shadow;

    h3 {
      margin-top: 0;
      color: @primary-dark;
    }
  }

  .comparison-table {
    display: grid;
    grid-template-columns: 1fr 1fr 1.5fr;
    border: 1px solid @border-color;
    border-radius: 8px;
    overflow: hidden;

    .table-header,
    .table-row {
      display: contents;
    }

    .header-cell,
    .cell {
      padding: 0.75rem 1rem;
    }

    .header-cell {
      background: lighten(@primary-color, 45%);
      font-weight: 600;
      color: @primary-dark;
      text-align: center;
    }

    .cell {
      border-bottom: 1px solid @border-color;
      display: flex;
      align-items: center;

      &:nth-child(3n+1),
      &:nth-child(3n+2) {
        border-right: 1px solid @border-color;
      }
    }

    .table-row:last-child .cell {
      border-bottom: none;
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 3rem;
  background: @card-bg;
  color: @text-secondary;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
}

// 响应式设计
@media (max-width: 992px) {
  .content-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .header {
    .title-container h1 {
      font-size: 1.8rem;
    }
  }

  .comparison-table {
    grid-template-columns: 1fr !important;

    .header-cell,
    .cell {
      border-right: none !important;
      border-bottom: 1px solid @border-color;

      &:nth-child(3n+1)::before {
        content: "类组件方法: ";
        font-weight: 600;
      }

      &:nth-child(3n+2)::before {
        content: "函数组件等效: ";
        font-weight: 600;
      }

      &:nth-child(3n)::before {
        content: "说明: ";
        font-weight: 600;
      }
    }
  }
}
</style>
