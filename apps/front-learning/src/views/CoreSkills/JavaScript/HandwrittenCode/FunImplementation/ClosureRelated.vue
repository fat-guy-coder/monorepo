<template>
  <div class="closure-algorithms-container">
    <header class="header">
      <h1>JavaScript 闭包</h1>
      <p class="subtitle">闭包原理与高级应用技巧</p>
    </header>

    <div class="difficulty-tabs">
      <button
        v-for="level in difficultyLevels"
        :key="level"
        :class="['tab-button', { active: activeDifficulty === level }]"
        @click="activeDifficulty = level"
      >
        {{ level }} <span class="count">({{ filteredAlgorithms(level).length }})</span>
      </button>
    </div>

    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索闭包相关实现..."
        class="search-input"
      >
      <span class="search-icon">🔍</span>
    </div>

    <div class="algorithm-list">
      <div
        v-for="algorithm in filteredAlgorithms(activeDifficulty)"
        :key="algorithm.id"
        class="algorithm-card"
        :class="algorithm.difficulty"
      >
        <div class="card-header">
          <div class="algorithm-icon">{{ algorithm.icon }}</div>
          <div>
            <h2 class="algorithm-title">{{ algorithm.title }}</h2>
            <div class="algorithm-meta">
              <span class="difficulty-badge">{{ algorithm.difficulty }}</span>
              <span class="category">{{ algorithm.category }}</span>
            </div>
          </div>
        </div>

        <div class="algorithm-content">
          <div class="algorithm-description">
            {{ algorithm.description }}
          </div>

          <div class="algorithm-details">
            <div class="implementation">
              <h3>实现思路:</h3>
              <ol>
                <li v-for="(step, index) in algorithm.steps" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>

            <div class="code-section">
              <h3>实现代码:</h3>
              <pre><code>{{ algorithm.code }}</code></pre>
            </div>
          </div>

          <div class="algorithm-footer">
            <div class="use-case">
              <span class="label">适用场景:</span>
              {{ algorithm.useCase }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p> JavaScript 闭包算法 | 共 {{ totalAlgorithms }} 个算法</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Algorithm {
  id: string
  title: string
  description: string
  icon: string
  category: string
  difficulty: string
  steps: string[]
  code: string
  useCase: string
}

const activeDifficulty = ref('全部')
const searchQuery = ref('')
const difficultyLevels = ['全部', '基础', '进阶', '高级']

const algorithms: Algorithm[] = [
  {
    id: 'counter',
    title: '计数器',
    description: '使用闭包创建私有计数器变量',
    icon: '🔢',
    category: '状态管理',
    difficulty: '基础',
    steps: [
      '创建外部函数，包含计数器变量',
      '返回内部函数，可以访问和修改计数器',
      '内部函数形成闭包，保留计数器状态'
    ],
    code: `function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
    useCase: '需要独立计数器的场景'
  },
  {
    id: 'private-variable',
    title: '私有变量',
    description: '使用闭包创建私有变量，防止外部直接访问',
    icon: '🔒',
    category: '封装',
    difficulty: '基础',
    steps: [
      '在外部函数中声明"私有"变量',
      '返回包含访问方法的对象',
      '外部无法直接访问私有变量'
    ],
    code: `function createPerson(name) {
  let _name = name;

  return {
    getName: () => _name,
    setName: (newName) => { _name = newName }
  };
}

const person = createPerson('Alice');
console.log(person.getName()); // Alice
person.setName('Bob');
console.log(person.getName()); // Bob`,
    useCase: '封装对象私有属性'
  },
  {
    id: 'memoization',
    title: '函数记忆化',
    description: '使用闭包缓存函数计算结果，提高性能',
    icon: '📦',
    category: '性能优化',
    difficulty: '进阶',
    steps: [
      '创建缓存对象存储计算结果',
      '返回包装函数检查缓存',
      '缓存命中直接返回，否则计算并存储'
    ],
    code: `function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// 使用示例
const memoizedAdd = memoize((a, b) => a + b);
console.log(memoizedAdd(2, 3)); // 5 (计算)
console.log(memoizedAdd(2, 3)); // 5 (缓存)`,
    useCase: '计算密集型函数的性能优化'
  },
  {
    id: 'debounce',
    title: '防抖函数',
    description: '使用闭包实现防抖，防止函数频繁调用',
    icon: '⏱️',
    category: '事件处理',
    difficulty: '进阶',
    steps: [
      '创建定时器变量',
      '返回包装函数清除并重置定时器',
      '延迟执行目标函数'
    ],
    code: `function debounce(fn, delay) {
  let timerId;

  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 使用示例
window.addEventListener('resize', debounce(() => {
  console.log('窗口调整大小');
}, 300));`,
    useCase: '窗口调整、输入框输入等高频事件'
  },
  {
    id: 'throttle',
    title: '节流函数',
    description: '使用闭包实现节流，控制函数执行频率',
    icon: '🚦',
    category: '事件处理',
    difficulty: '进阶',
    steps: [
      '创建上次执行时间标记',
      '返回包装函数检查时间间隔',
      '满足间隔条件才执行目标函数'
    ],
    code: `function throttle(fn, interval) {
  let lastTime = 0;

  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

// 使用示例
window.addEventListener('scroll', throttle(() => {
  console.log('滚动事件');
}, 200));`,
    useCase: '滚动事件、鼠标移动等高频但需要限制频率的场景'
  },
  {
    id: 'currying',
    title: '函数柯里化',
    description: '使用闭包实现函数柯里化，分步接收参数',
    icon: '🎯',
    category: '函数式编程',
    difficulty: '高级',
    steps: [
      '返回嵌套函数链',
      '每个函数接收部分参数',
      '闭包保存已接收的参数',
      '参数足够时执行原函数'
    ],
    code: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// 使用示例
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3));  // 6`,
    useCase: '参数复用、函数组合'
  },
  {
    id: 'partial-application',
    title: '部分应用函数',
    description: '使用闭包固定函数的部分参数',
    icon: '📌',
    category: '函数式编程',
    difficulty: '进阶',
    steps: [
      '返回新函数接收剩余参数',
      '闭包保存已固定的参数',
      '调用时合并固定参数和新参数'
    ],
    code: `function partial(fn, ...fixedArgs) {
  return function(...remainingArgs) {
    return fn(...fixedArgs, ...remainingArgs);
  };
}

// 使用示例
const multiply = (a, b) => a * b;
const double = partial(multiply, 2);
console.log(double(5)); // 10
console.log(double(8)); // 16`,
    useCase: '创建特定功能的函数变体'
  },
  {
    id: 'module-pattern',
    title: '模块模式',
    description: '使用闭包实现模块化，封装私有成员',
    icon: '🧩',
    category: '代码组织',
    difficulty: '进阶',
    steps: [
      '使用IIFE创建闭包作用域',
      '返回公共API对象',
      '私有变量和函数在闭包内'
    ],
    code: `const calculator = (function() {
  // 私有变量
  let memory = 0;

  // 私有函数
  function logOperation(op) {
    console.log(\`执行操作: \${op}\`);
  }

  // 公共API
  return {
    add: function(a, b) {
      logOperation('加法');
      return a + b;
    },
    store: function(value) {
      memory = value;
    },
    recall: function() {
      return memory;
    }
  };
})();

console.log(calculator.add(2, 3)); // 5
calculator.store(10);
console.log(calculator.recall()); // 10`,
    useCase: '封装模块、创建命名空间'
  },
  {
    id: 'iterator',
    title: '自定义迭代器',
    description: '使用闭包创建状态保存的迭代器',
    icon: '🔁',
    category: '数据遍历',
    difficulty: '高级',
    steps: [
      '创建外部函数保存集合',
      '返回包含next方法的对象',
      '闭包保存当前迭代位置'
    ],
    code: `function createIterator(array) {
  let index = 0;

  return {
    next: function() {
      return index < array.length
        ? { value: array[index++], done: false }
        : { done: true };
    }
  };
}

// 使用示例
const iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }`,
    useCase: '自定义数据结构迭代'
  },
  {
    id: 'state-machine',
    title: '状态机',
    description: '使用闭包实现有限状态机',
    icon: '🔄',
    category: '状态管理',
    difficulty: '高级',
    steps: [
      '定义状态转换规则',
      '闭包保存当前状态',
      '返回包含转换方法的对象'
    ],
    code: `function createStateMachine(initialState) {
  let currentState = initialState;
  const transitions = {};

  return {
    addTransition: function(from, to, action) {
      transitions[from] = transitions[from] || {};
      transitions[from][action] = to;
    },
    transition: function(action) {
      const nextState = transitions[currentState]?.[action];
      if (nextState) {
        console.log(\`从 \${currentState} 转换到 \${nextState}\`);
        currentState = nextState;
      } else {
        console.log(\`无效转换: \${currentState} -> \${action}\`);
      }
      return currentState;
    },
    getState: function() {
      return currentState;
    }
  };
}

// 使用示例
const fsm = createStateMachine('idle');
fsm.addTransition('idle', 'loading', 'FETCH');
fsm.addTransition('loading', 'success', 'RESOLVE');
fsm.addTransition('loading', 'error', 'REJECT');
fsm.addTransition('success', 'idle', 'RESET');
fsm.addTransition('error', 'idle', 'RESET');

fsm.transition('FETCH');   // 从 idle 转换到 loading
fsm.transition('RESOLVE'); // 从 loading 转换到 success
fsm.transition('RESET');   // 从 success 转换到 idle`,
    useCase: 'UI状态管理、工作流程控制'
  },
  {
    id: 'event-handler',
    title: '事件处理器工厂',
    description: '使用闭包创建带配置的事件处理器',
    icon: '🖱️',
    category: '事件处理',
    difficulty: '进阶',
    steps: [
      '返回配置特定的事件处理函数',
      '闭包保存配置信息',
      '处理器函数访问配置数据'
    ],
    code: `function createEventHandler(config) {
  return function(event) {
    console.log(\`事件类型: \${event.type}\`);
    console.log(\`配置选项: \${JSON.stringify(config)}\`);
    // 使用配置执行特定操作...
  };
}

// 使用示例
const clickHandler = createEventHandler({
  track: true,
  category: 'UI'
});

document.addEventListener('click', clickHandler);`,
    useCase: '创建可配置的事件监听器'
  },
  {
    id: 'generator',
    title: '生成器函数',
    description: '使用闭包创建带状态的生成器',
    icon: '🎰',
    category: '数据生成',
    difficulty: '高级',
    steps: [
      '创建闭包保存状态',
      '返回生成下一个值的函数',
      '每次调用更新内部状态'
    ],
    code: `function createSequenceGenerator(start = 0, step = 1) {
  let current = start;

  return function() {
    const value = current;
    current += step;
    return value;
  };
}

// 使用示例
const nextId = createSequenceGenerator(1000, 10);
console.log(nextId()); // 1000
console.log(nextId()); // 1010
console.log(nextId()); // 1020

const nextEven = createSequenceGenerator(0, 2);
console.log(nextEven()); // 0
console.log(nextEven()); // 2
console.log(nextEven()); // 4`,
    useCase: 'ID生成器、序列号生成'
  },
  {
    id: 'retry-mechanism',
    title: '重试机制',
    description: '使用闭包实现带延迟和重试次数的函数',
    icon: '🔄',
    category: '错误处理',
    difficulty: '进阶',
    steps: [
      '闭包保存重试计数器和配置',
      '返回包装函数处理错误',
      '错误时重试直到达到最大次数'
    ],
    code: `function withRetry(fn, { retries = 3, delay = 1000 } = {}) {
  return async function(...args) {
    let attempt = 0;

    while (attempt <= retries) {
      try {
        return await fn(...args);
      } catch (error) {
        attempt++;
        if (attempt > retries) throw error;
        console.log(\`尝试 \${attempt} 失败，\${delay}ms后重试...\`);
        await new Promise(res => setTimeout(res, delay));
      }
    }
  };
}

// 使用示例
const unstableFetch = () => {
  if (Math.random() > 0.3) throw new Error('API错误');
  return '数据';
};

const reliableFetch = withRetry(unstableFetch, { retries: 4 });
reliableFetch().then(console.log).catch(console.error);`,
    useCase: '网络请求、不稳定操作的重试'
  },
  {
    id: 'access-control',
    title: '访问控制',
    description: '使用闭包实现基于角色的访问控制',
    icon: '👮',
    category: '安全',
    difficulty: '高级',
    steps: [
      '闭包保存角色和权限映射',
      '返回授权检查函数',
      '根据角色检查权限'
    ],
    code: `function createAccessControl(roles) {
  const permissions = new Map();

  // 初始化权限
  Object.entries(roles).forEach(([role, perms]) => {
    permissions.set(role, new Set(perms));
  });

  return function(role, action) {
    const rolePerms = permissions.get(role);
    if (!rolePerms) return false;
    return rolePerms.has(action);
  };
}

// 使用示例
const roles = {
  admin: ['create', 'read', 'update', 'delete'],
  editor: ['create', 'read', 'update'],
  viewer: ['read']
};

const hasPermission = createAccessControl(roles);
console.log(hasPermission('admin', 'delete')); // true
console.log(hasPermission('editor', 'delete')); // false`,
    useCase: '权限管理、角色访问控制'
  }
]

// 计算过滤后的算法
const filteredAlgorithms = (difficulty: string) => {
  return algorithms.filter(algo => {
    const matchesDifficulty = difficulty === '全部' || algo.difficulty === difficulty;
    const matchesSearch = !searchQuery.value ||
      algo.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      algo.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });
}

// 计算总算法数量
const totalAlgorithms = computed(() => algorithms.length)
</script>

<style lang="less" scoped>

.closure-algorithms-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #f9fbfd 0%, #f0f4f8 100%);
  min-height: 100vh;
  color: #2d3748;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  border-radius: 16px;
  background: linear-gradient(120deg, #7950f2, #4c6ef5);
  color: white;
  box-shadow: 0 10px 20px rgba(121, 80, 242, 0.15);

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }
}

.difficulty-tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  .tab-button {
    padding: 12px 24px;
    border: none;
    border-radius: 50px;
    background: white;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }

    &.active {
      background: #4c6ef5;
      color: white;
      box-shadow: 0 6px 15px rgba(76, 110, 245, 0.3);
    }

    .count {
      font-size: 0.85rem;
      margin-left: 6px;
      opacity: 0.8;
    }
  }
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto 30px;

  .search-input {
    width: 100%;
    padding: 14px 20px 14px 50px;
    font-size: 1.1rem;
    border: none;
    border-radius: 50px;
    background: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      box-shadow: 0 5px 20px rgba(76, 110, 245, 0.3);
    }
  }

  .search-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #7950f2;
  }
}

.algorithm-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.algorithm-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-top: 4px solid;

  &.基础 {
    border-color: #40c057;
  }

  &.进阶 {
    border-color: #228be6;
  }

  &.高级 {
    border-color: #fa5252;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(120deg, #f8f9fa, #e9ecef);
  border-bottom: 1px solid #e2e8f0;

  .algorithm-icon {
    font-size: 1.8rem;
    margin-right: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  .algorithm-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: #2d3748;
  }

  .algorithm-meta {
    display: flex;
    gap: 12px;
    font-size: 0.9rem;

    .difficulty-badge {
      background: #f1f3f5;
      padding: 4px 10px;
      border-radius: 20px;
      font-weight: 500;

      .基础 & {
        background: #ebfbee;
        color: #2b8a3e;
      }

      .进阶 & {
        background: #e7f5ff;
        color: #1864ab;
      }

      .高级 & {
        background: #fff5f5;
        color: #c92a2a;
      }
    }

    .category {
      color: #5c7cfa;
      font-weight: 500;
    }
  }
}

.algorithm-content {
  padding: 20px;

  .algorithm-description {
    font-size: 1.05rem;
    line-height: 1.6;
    color: #495057;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #edf2f7;
  }

  .algorithm-details {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .implementation {
      flex: 1;

      h3 {
        font-size: 1.15rem;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 15px;
        color: #2d3748;
        display: flex;
        align-items: center;

        &::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4c6ef5;
          margin-right: 10px;
        }
      }

      ol {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 10px;
          line-height: 1.5;
          padding-left: 8px;

          &::marker {
            color: #4c6ef5;
            font-weight: 600;
          }
        }
      }
    }

    .code-section {
      flex: 1;

      h3 {
        font-size: 1.15rem;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 15px;
        color: #2d3748;
        display: flex;
        align-items: center;

        &::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7950f2;
          margin-right: 10px;
        }
      }

      pre {
        background: #1e293b;
        color: #f8fafc;
        border-radius: 12px;
        padding: 15px;
        overflow-x: auto;
        font-size: 0.9rem;
        line-height: 1.5;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
        max-height: 300px;
        overflow-y: auto;

        code {
          font-family: 'Fira Code', monospace;
          white-space: pre-wrap;
        }
      }
    }
  }

  .algorithm-footer {
    padding-top: 15px;
    border-top: 1px dashed #e2e8f0;

    .use-case {
      display: flex;
      font-size: 0.95rem;
      color: #495057;

      .label {
        font-weight: 600;
        margin-right: 8px;
        color: #5c7cfa;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 25px;
  color: #718096;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
}

@media (max-width: 1100px) {
  .algorithm-list {
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  }
}

@media (max-width: 768px) {
  .algorithm-list {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2.2rem;
  }

  .difficulty-tabs {
    gap: 8px;

    .tab-button {
      padding: 10px 18px;
      font-size: 0.95rem;
    }
  }
}

@media (max-width: 480px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .search-box {
    margin-bottom: 25px;
  }

  .algorithm-card {
    border-radius: 12px;
  }

  .algorithm-content {
    padding: 15px;
  }

  .card-header {
    padding: 15px;

    .algorithm-icon {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
    }

    .algorithm-title {
      font-size: 1.3rem;
    }
  }
}
</style>
