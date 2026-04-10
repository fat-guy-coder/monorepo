<template>
  <div class="recursion-container">
    <header>
      <h1>递归算法基础介绍</h1>
      <p class="subtitle">理解递归的核心概念、实现方式与应用场景</p>
    </header>

    <div class="content-wrapper">
      <section class="section">
        <div class="section-header">
          <div class="icon-box">
            <i class="icon icon-concept"></i>
          </div>
          <h2>递归算法概念</h2>
        </div>
        <div class="section-content">
          <p>递归是一种通过将问题分解为更小的同类问题来解决问题的方法。在计算机科学中，递归指的是函数直接或间接调用自身的过程。</p>
          <div class="concept-card">
            <h3>递归的核心要素：</h3>
            <ul>
              <li><strong>基准情况（Base Case）</strong> - 递归的终止条件</li>
              <li><strong>递归情况（Recursive Case）</strong> - 将问题分解为更小的子问题</li>
              <li><strong>递归调用（Recursive Call）</strong> - 函数调用自身</li>
              <li><strong>递归链（Recursive Chain）</strong> - 问题规模逐步减小</li>
            </ul>
          </div>
          <div class="recursion-process">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-text">初始问题</div>
            </div>
            <div class="arrow">→</div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-text">分解为子问题</div>
            </div>
            <div class="arrow">→</div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-text">解决子问题</div>
            </div>
            <div class="arrow">→</div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-text">组合结果</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <div class="icon-box">
            <i class="icon icon-type"></i>
          </div>
          <h2>递归类型</h2>
        </div>
        <div class="section-content">
          <div class="type-cards">
            <div class="type-card">
              <h3>直接递归</h3>
              <p>函数直接调用自身</p>
              <div class="code-snippet">
                <pre>function directRecursion() {
  // ...
  directRecursion(); // 直接调用自己
}</pre>
              </div>
            </div>
            <div class="type-card">
              <h3>间接递归</h3>
              <p>函数通过其他函数间接调用自身</p>
              <div class="code-snippet">
                <pre>function A() {
  // ...
  B(); // 调用B函数
}

function B() {
  // ...
  A(); // 调用A函数
}</pre>
              </div>
            </div>
            <div class="type-card">
              <h3>线性递归</h3>
              <p>每次递归只产生一个调用分支</p>
              <div class="code-snippet">
                <pre>function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}</pre>
              </div>
            </div>
            <div class="type-card">
              <h3>树形递归</h3>
              <p>每次递归产生多个调用分支</p>
              <div class="code-snippet">
                <pre>function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) +
         fibonacci(n - 2);
}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <div class="icon-box">
            <i class="icon icon-code"></i>
          </div>
          <h2>代码示例</h2>
        </div>
        <div class="section-content">
          <div class="example-tabs">
            <button v-for="(example, index) in examples" :key="index"
              :class="['tab-button', { active: activeExample === index }]" @click="activeExample = index">
              {{ example.title }}
            </button>
          </div>

          <div class="example-content">
            <div v-if="activeExample === 0" class="example-item">
              <h3>阶乘计算</h3>
              <div class="code-block">
                <pre>{{ examples[0].code }}</pre>
              </div>
              <div class="demo-area">
                <div class="input-group">
                  <label>输入数字：</label>
                  <input type="number" v-model.number="factorialInput" min="1" max="10">
                  <button @click="calculateFactorial">计算</button>
                </div>
                <div v-if="factorialResult !== null" class="result">
                  <p>{{ factorialInput }}! = {{ factorialResult }}</p>
                  <div class="recursion-steps">
                    <div v-for="(step, index) in factorialSteps" :key="index" class="step">
                      {{ step }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeExample === 1" class="example-item">
              <h3>斐波那契数列</h3>
              <div class="code-block">
                <pre>{{ examples[1].code }}</pre>
              </div>
              <div class="demo-area">
                <div class="input-group">
                  <label>输入位置：</label>
                  <input type="number" v-model.number="fibonacciInput" min="0" max="10">
                  <button @click="calculateFibonacci">计算</button>
                </div>
                <div v-if="fibonacciResult !== null" class="result">
                  <p>fib({{ fibonacciInput }}) = {{ fibonacciResult }}</p>
                  <div class="recursion-tree">
                    <div class="tree-node">
                      <div class="node-value">fib({{ fibonacciInput }})</div>
                      <div class="node-children">
                        <div class="node-child">
                          <div class="node-value">fib({{ fibonacciInput - 1 }})</div>
                        </div>
                        <div class="node-child">
                          <div class="node-value">fib({{ fibonacciInput - 2 }})</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeExample === 2" class="example-item">
              <h3>文件系统遍历</h3>
              <div class="code-block">
                <pre>{{ examples[2].code }}</pre>
              </div>
              <div class="demo-area">
                <div class="file-tree">
                  <div class="folder" @click="toggleFolder('root')">
                    <div class="folder-header">
                      <i :class="['folder-icon', expandedFolders.includes('root') ? 'expanded' : '']"></i>
                      <span>Root</span>
                    </div>
                    <div v-if="expandedFolders.includes('root')" class="folder-content">
                      <div class="file">Document.txt</div>
                      <div class="folder" @click.stop="toggleFolder('photos')">
                        <div class="folder-header">
                          <i :class="['folder-icon', expandedFolders.includes('photos') ? 'expanded' : '']"></i>
                          <span>Photos</span>
                        </div>
                        <div v-if="expandedFolders.includes('photos')" class="folder-content">
                          <div class="file">photo1.jpg</div>
                          <div class="file">photo2.png</div>
                          <div class="folder" @click.stop="toggleFolder('vacation')">
                            <div class="folder-header">
                              <i :class="['folder-icon', expandedFolders.includes('vacation') ? 'expanded' : '']"></i>
                              <span>Vacation</span>
                            </div>
                            <div v-if="expandedFolders.includes('vacation')" class="folder-content">
                              <div class="file">beach.jpg</div>
                              <div class="file">mountain.png</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="folder" @click.stop="toggleFolder('projects')">
                        <div class="folder-header">
                          <i :class="['folder-icon', expandedFolders.includes('projects') ? 'expanded' : '']"></i>
                          <span>Projects</span>
                        </div>
                        <div v-if="expandedFolders.includes('projects')" class="folder-content">
                          <div class="file">project1.ts</div>
                          <div class="file">project2.js</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <div class="icon-box">
            <i class="icon icon-app"></i>
          </div>
          <h2>应用场景</h2>
        </div>
        <div class="section-content">
          <div class="application-cards">
            <div class="app-card">
              <h3>数据结构操作</h3>
              <ul>
                <li>树/图的遍历（DFS）</li>
                <li>链表操作</li>
                <li>二叉搜索树操作</li>
              </ul>
            </div>
            <div class="app-card">
              <h3>数学问题</h3>
              <ul>
                <li>阶乘计算</li>
                <li>斐波那契数列</li>
                <li>汉诺塔问题</li>
              </ul>
            </div>
            <div class="app-card">
              <h3>文件系统操作</h3>
              <ul>
                <li>目录遍历</li>
                <li>文件搜索</li>
                <li>文件夹大小计算</li>
              </ul>
            </div>
            <div class="app-card">
              <h3>算法设计</h3>
              <ul>
                <li>分治算法</li>
                <li>回溯算法</li>
                <li>动态规划</li>
              </ul>
            </div>
          </div>

          <div class="considerations">
            <h3>递归的注意事项</h3>
            <div class="warning-card">
              <div class="warning-icon">!</div>
              <div class="warning-content">
                <p><strong>递归深度：</strong> 递归调用可能导致堆栈溢出</p>
                <p><strong>重复计算：</strong> 树形递归可能重复计算相同子问题</p>
                <p><strong>效率问题：</strong> 递归可能比迭代效率低</p>
                <p><strong>解决方案：</strong> 使用尾递归优化、记忆化或转换为迭代算法</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <p>递归算法总结：理解 → 分解 → 解决 → 组合</p>
      <div class="footer-links">
        <a href="#">了解更多算法知识</a>
        <a href="#">查看完整代码示例</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例代码
const examples = ref([
  {
    title: '阶乘',
    code: `function factorial(n: number): number {
  // 基准情况
  if (n === 0 || n === 1) {
    return 1;
  }
  // 递归情况
  return n * factorial(n - 1);
}`
  },
  {
    title: '斐波那契',
    code: `function fibonacci(n: number): number {
  // 基准情况
  if (n <= 1) {
    return n;
  }
  // 递归情况（树形递归）
  return fibonacci(n - 1) + fibonacci(n - 2);
}`
  },
  {
    title: '文件遍历',
    code: `function traverseDirectory(dir: Directory) {
  // 处理当前目录
  console.log(\`进入目录: \${dir.name}\`);

  // 遍历目录中的文件
  dir.files.forEach(file => {
    console.log(\`文件: \${file.name}\`);
  });

  // 递归遍历子目录
  dir.subDirectories.forEach(subDir => {
    traverseDirectory(subDir);
  });

  console.log(\`离开目录: \${dir.name}\`);
}`
  }
]);

// 活动示例索引
const activeExample = ref(0);

// 阶乘示例数据
const factorialInput = ref<number>(5);
const factorialResult = ref<number | null>(null);
const factorialSteps = ref<string[]>([]);

// 斐波那契示例数据
const fibonacciInput = ref<number>(5);
const fibonacciResult = ref<number | null>(null);

// 文件树状态
const expandedFolders = ref<string[]>(['root']);

// 计算阶乘
function calculateFactorial() {
  factorialResult.value = factorial(factorialInput.value);
  factorialSteps.value = [];
  generateFactorialSteps(factorialInput.value);
}

// 阶乘函数
function factorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

// 生成阶乘步骤
function generateFactorialSteps(n: number): void {
  if (n === 0 || n === 1) {
    factorialSteps.value.push(`${n}! = 1`);
    return;
  }

  factorialSteps.value.push(`计算 ${n}! = ${n} × ${n - 1}!`);
  generateFactorialSteps(n - 1);
  factorialSteps.value.push(`${n} × ${factorial(n - 1)} = ${factorial(n)}`);
}

// 计算斐波那契
function calculateFibonacci() {
  fibonacciResult.value = fibonacci(fibonacciInput.value);
}

// 斐波那契函数
function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 切换文件夹展开状态
function toggleFolder(folderName: string) {
  if (expandedFolders.value.includes(folderName)) {
    expandedFolders.value = expandedFolders.value.filter(name => name !== folderName);
  } else {
    expandedFolders.value.push(folderName);
  }
}

// 初始化时计算默认值
calculateFactorial();
calculateFibonacci();
</script>

<style scoped lang="less">
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-color: #f8f9fa;
@dark-color: #212529;
@border-color: #e0e0e0;
@success-color: #2ec4b6;
@warning-color: #ff9f1c;
@danger-color: #e71d36;

.recursion-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @dark-color;
  background-color: #ffffff;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 2px solid @border-color;

    h1 {
      font-size: 2.5rem;
      color: @secondary-color;
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 1.2rem;
      color: lighten(@dark-color, 30%);
      max-width: 800px;
      margin: 0 auto;
    }
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .section {
    background-color: @light-color;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .section-header {
      display: flex;
      align-items: center;
      padding: 20px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;

      h2 {
        margin: 0;
        font-size: 1.8rem;
      }

      .icon-box {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;

        .icon {
          width: 30px;
          height: 30px;
          background-color: white;
          mask-size: contain;
          mask-position: center;
          mask-repeat: no-repeat;

          &.icon-concept {
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z'/%3E%3C/svg%3E");
          }

          &.icon-type {
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z'/%3E%3C/svg%3E");
          }

          &.icon-code {
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'/%3E%3C/svg%3E");
          }

          &.icon-app {
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z'/%3E%3C/svg%3E");
          }
        }
      }
    }

    .section-content {
      padding: 25px;

      p {
        margin-bottom: 20px;
        font-size: 1.05rem;
      }
    }
  }

  .concept-card {
    background-color: #ffffff;
    border-left: 4px solid @accent-color;
    padding: 20px;
    margin: 25px 0;
    border-radius: 0 8px 8px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      color: @secondary-color;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 10px;
        padding-left: 10px;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: -10px;
          top: 8px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: @primary-color;
        }
      }
    }
  }

  .recursion-process {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0;

    .step {
      text-align: center;
      flex: 1;

      .step-number {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, @primary-color, @accent-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0 auto 10px;
      }

      .step-text {
        font-weight: 500;
        color: @secondary-color;
      }
    }

    .arrow {
      color: @primary-color;
      font-size: 1.5rem;
      font-weight: bold;
      padding: 0 10px;
    }
  }

  .type-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .type-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border-top: 3px solid @primary-color;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-5px);
      }

      h3 {
        margin-top: 0;
        color: @secondary-color;
        border-bottom: 1px solid @border-color;
        padding-bottom: 10px;
      }
    }
  }

  .code-snippet {
    background-color: #f5f7ff;
    border-left: 3px solid @primary-color;
    padding: 15px;
    margin-top: 15px;
    border-radius: 0 4px 4px 0;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    overflow-x: auto;

    pre {
      margin: 0;
      line-height: 1.5;
      color: @secondary-color;
    }
  }

  .example-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;

    .tab-button {
      flex: 1;
      padding: 12px 0;
      background-color: #eef2ff;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      color: @primary-color;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
      }

      &:hover:not(.active) {
        background-color: #e0e7ff;
      }
    }
  }

  .example-content {
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    .example-item {
      h3 {
        margin-top: 0;
        color: @secondary-color;
      }
    }
  }

  .code-block {
    background-color: #f8f9ff;
    padding: 20px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 1rem;
    margin: 20px 0;
    border: 1px solid @border-color;
    overflow-x: auto;

    pre {
      margin: 0;
      color: @secondary-color;
      line-height: 1.5;
    }
  }

  .demo-area {
    margin-top: 30px;
    padding: 20px;
    background-color: #f9fbfd;
    border-radius: 8px;
    border: 1px dashed @border-color;

    .input-group {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-bottom: 20px;

      label {
        font-weight: 500;
      }

      input {
        padding: 8px 12px;
        border: 1px solid @border-color;
        border-radius: 4px;
        width: 80px;
      }

      button {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: opacity 0.3s ease;

        &:hover {
          opacity: 0.9;
        }
      }
    }

    .result {
      background-color: white;
      padding: 15px;
      border-radius: 6px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      font-family: 'Courier New', monospace;
      font-weight: bold;
      color: @secondary-color;
    }
  }

  .recursion-steps {
    margin-top: 20px;

    .step {
      padding: 10px 15px;
      background-color: #f0f7ff;
      border-left: 3px solid @primary-color;
      margin-bottom: 8px;
      border-radius: 0 4px 4px 0;
      font-family: 'Courier New', monospace;
    }
  }

  .file-tree {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 15px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .folder {
      margin-bottom: 5px;

      .folder-header {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        background-color: #f5f7ff;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: #e0e7ff;
        }

        .folder-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 8px;
          background-color: @primary-color;
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z'/%3E%3C/svg%3E");
          mask-size: contain;
          mask-position: center;
          mask-repeat: no-repeat;
          transition: transform 0.3s ease;

          &.expanded {
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z'/%3E%3C/svg%3E");
          }
        }
      }

      .folder-content {
        padding-left: 30px;
        margin-top: 5px;
      }
    }

    .file {
      padding: 6px 12px 6px 32px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background-color: lighten(@dark-color, 40%);
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z'/%3E%3C/svg%3E");
        mask-size: contain;
        mask-position: center;
        mask-repeat: no-repeat;
      }
    }
  }

  .application-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .app-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
      border-top: 3px solid @accent-color;

      h3 {
        margin-top: 0;
        color: @secondary-color;
        display: flex;
        align-items: center;

        &::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: @accent-color;
          margin-right: 10px;
        }
      }

      ul {
        padding-left: 20px;
        margin-bottom: 0;

        li {
          margin-bottom: 8px;
          padding-left: 5px;
        }
      }
    }
  }

  .considerations {
    h3 {
      color: @secondary-color;
      border-bottom: 1px solid @border-color;
      padding-bottom: 10px;
    }
  }

  .warning-card {
    display: flex;
    background-color: #fff8f8;
    border-left: 4px solid @danger-color;
    padding: 20px;
    border-radius: 0 8px 8px 0;
    margin-top: 20px;

    .warning-icon {
      min-width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: @danger-color;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      margin-right: 15px;
    }

    .warning-content {
      p {
        margin: 5px 0;

        strong {
          color: @danger-color;
        }
      }
    }
  }

  footer {
    margin-top: 50px;
    padding-top: 30px;
    text-align: center;
    border-top: 1px solid @border-color;

    p {
      font-size: 1.1rem;
      font-weight: 500;
      color: @secondary-color;
    }

    .footer-links {
      margin-top: 20px;

      a {
        display: inline-block;
        margin: 0 15px;
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .recursion-process {
      flex-direction: column;
      align-items: flex-start;

      .step {
        margin-bottom: 20px;
        width: 100%;
        text-align: left;
        display: flex;
        align-items: center;

        .step-number {
          margin-right: 15px;
          flex-shrink: 0;
        }
      }

      .arrow {
        display: none;
      }
    }

    .example-tabs {
      flex-direction: column;
    }
  }
}
</style>
