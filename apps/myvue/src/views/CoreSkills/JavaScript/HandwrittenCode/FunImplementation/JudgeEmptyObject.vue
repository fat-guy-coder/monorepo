<template>
  <div class="empty-object-container">
    <header class="header">
      <h1>JavaScript <span class="highlight">判断空对象</span> 指南</h1>
      <p class="subtitle">基本解析检测空对象的各种方法与最佳实践</p>
    </header>

    <div class="content">
      <div class="intro">
        <div class="intro-card">
          <i class="fas fa-exclamation-circle"></i>
          <h3>为什么需要判断空对象？</h3>
          <p>在数据处理、API响应处理和表单验证中，判断对象是否为空是常见需求，能避免不必要的错误处理和资源消耗。</p>
        </div>
        <div class="intro-card">
          <i class="fas fa-lightbulb"></i>
          <h3>什么是空对象？</h3>
          <p>在JavaScript中，空对象指没有任何自身可枚举属性的对象，但需注意原型链上的属性不包含在内。</p>
        </div>
      </div>

      <section class="methods">
        <h2 class="section-title">
          <i class="fas fa-code"></i> 判断空对象的方法
        </h2>

        <div class="methods-grid">
          <div class="method-card" v-for="(method, index) in methods" :key="index">
            <div class="method-header">
              <div class="method-title">
                <h3>{{ method.title }}</h3>
                <span class="method-type" :class="method.type">{{ method.type }}</span>
              </div>
              <div class="method-rating">
                <div class="rating">
                  <i class="fas fa-star" v-for="n in method.rating" :key="n"></i>
                </div>
                <span class="complexity">复杂度: {{ method.complexity }}</span>
              </div>
            </div>

            <div class="method-content">
              <div class="description">
                <p>{{ method.description }}</p>
              </div>

              <div class="code-sample">
                <pre><code>{{ method.code }}</code></pre>
              </div>

              <div class="method-pros-cons">
                <div class="pros">
                  <h4><i class="fas fa-check-circle"></i> 优点</h4>
                  <ul>
                    <li v-for="(pro, pIndex) in method.pros" :key="pIndex">{{ pro }}</li>
                  </ul>
                </div>
                <div class="cons">
                  <h4><i class="fas fa-exclamation-triangle"></i> 缺点</h4>
                  <ul>
                    <li v-for="(con, cIndex) in method.cons" :key="cIndex">{{ con }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison">
        <h2 class="section-title">
          <i class="fas fa-balance-scale"></i> 方法比较
        </h2>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>方法</th>
                <th>性能</th>
                <th>可读性</th>
                <th>兼容性</th>
                <th>特殊情况处理</th>
                <th>推荐指数</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(method, index) in methods" :key="index">
                <td>{{ method.title }}</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress" :style="{ width: method.performance + '%' }"></div>
                    <span>{{ method.performance }}%</span>
                  </div>
                </td>
                <td>
                  <div class="rating-stars">
                    <i class="fas fa-star" v-for="n in 5" :key="n" :class="{ active: n <= method.readability }"></i>
                  </div>
                </td>
                <td>
                  <div class="compatibility">
                    <i class="fab fa-chrome" :class="{ active: method.browsers.includes('chrome') }"></i>
                    <i class="fab fa-firefox" :class="{ active: method.browsers.includes('firefox') }"></i>
                    <i class="fab fa-safari" :class="{ active: method.browsers.includes('safari') }"></i>
                    <i class="fab fa-edge" :class="{ active: method.browsers.includes('edge') }"></i>
                    <i class="fab fa-internet-explorer" :class="{ active: method.browsers.includes('ie') }"></i>
                  </div>
                </td>
                <td>
                  <div class="special-cases">
                    <span v-if="method.symbols" title="支持Symbol属性"><i class="fas fa-check"></i> Symbol</span>
                    <span v-if="method.nonEnum" title="处理非枚举属性"><i class="fas fa-check"></i> 非枚举</span>
                    <span v-if="method.prototype" title="处理原型链属性"><i class="fas fa-check"></i> 原型链</span>
                  </div>
                </td>
                <td>
                  <div class="recommendation">
                    <i class="fas fa-star" v-for="n in method.rating" :key="n"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="demo">
        <h2 class="section-title">
          <i class="fas fa-flask"></i> 实时测试区
        </h2>

        <div class="demo-container">
          <div class="input-section">
            <h3>输入对象 (JSON格式)</h3>
            <textarea v-model="inputJson" placeholder='{"key": "value"}'></textarea>
            <div class="error" v-if="jsonError">{{ jsonError }}</div>
            <button @click="testMethods">测试所有方法</button>
          </div>

          <div class="results-section">
            <div class="result-card" v-for="(result, index) in results" :key="index">
              <div class="method-name">{{ result.method }}</div>
              <div class="result-value" :class="{ true: result.value, false: !result.value }">
                {{ result.value }}
              </div>
              <div class="execution-time">
                执行时间: {{ result.time }} ms
              </div>
            </div>
          </div>
        </div>

        <div class="test-cases">
          <h3>快速测试用例</h3>
          <div class="cases">
            <button @click="setTestCase('{}')">空对象</button>
            <button @click="setTestCase('{a: 1}')">非空对象</button>
            <button @click="setTestCase('[]')">空数组</button>
            <button @click="setTestCase('null')">null</button>
            <button @click="setTestCase('undefined')">undefined</button>
            <button @click="setTestCase('new Date()')">Date对象</button>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2 class="section-title">
          <i class="fas fa-check-circle"></i> 最佳实践
        </h2>

        <div class="practices">
          <div class="practice-card">
            <i class="fas fa-sync-alt"></i>
            <h3>性能敏感场景</h3>
            <p>使用<code>Object.keys()</code>方法，它在大多数现代JavaScript引擎中性能最优。</p>
          </div>

          <div class="practice-card">
            <i class="fas fa-shield-alt"></i>
            <h3>安全第一</h3>
            <p>使用<code>Reflect.ownKeys()</code>方法处理包含Symbol属性的对象。</p>
          </div>

          <div class="practice-card">
            <i class="fas fa-cogs"></i>
            <h3>复杂场景</h3>
            <p>使用Lodash的<code>_.isEmpty()</code>处理各种边界情况。</p>
          </div>
        </div>

        <div class="summary">
          <h3><i class="fas fa-lightbulb"></i> 总结建议</h3>
          <p>对于大多数应用场景，推荐使用：</p>
          <pre><code>function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}</code></pre>
          <p>在需要处理特殊属性（如Symbol）或考虑原型链属性时，使用更健壮的解决方案。</p>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>© 2023 JavaScript空对象检测指南 | 在Vue中实现实时测试</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

// 判断空对象的方法列表
const methods = reactive([
  {
    title: "Object.keys()",
    type: "原生方法",
    rating: 5,
    complexity: "O(n)",
    description: "获取对象自身可枚举属性组成的数组，检查其长度是否为0",
    code: `function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}`,
    pros: [
      "简单直观，代码清晰",
      "现代JS中性能优异",
      "适用于大多数场景"
    ],
    cons: [
      "不处理Symbol属性",
      "忽略不可枚举属性",
      "原型链属性不影响结果"
    ],
    performance: 95,
    readability: 5,
    browsers: ['chrome', 'firefox', 'safari', 'edge', 'ie'],
    symbols: false,
    nonEnum: false,
    prototype: false
  },
  {
    title: "JSON.stringify()",
    type: "转换方法",
    rating: 2,
    complexity: "O(n)",
    description: "将对象转换为JSON字符串，检查结果是否为'{}'",
    code: `function isEmpty(obj) {
  return JSON.stringify(obj) === '{}';
}`,
    pros: [
      "一行代码即可实现",
      "适用于简单对象"
    ],
    cons: [
      "性能较差（序列化开销）",
      "忽略undefined、函数等值",
      "Date对象会转成字符串",
      "循环引用会导致错误"
    ],
    performance: 35,
    readability: 4,
    browsers: ['chrome', 'firefox', 'safari', 'edge', 'ie'],
    symbols: false,
    nonEnum: false,
    prototype: false
  },
  {
    title: "for...in循环",
    type: "迭代方法",
    rating: 4,
    complexity: "O(n)",
    description: "使用for...in循环遍历对象属性，遇到第一个属性即返回false",
    code: `function isEmpty(obj) {
  for (let key in obj) {
    // 检查是否为自身属性（非原型链）
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}`,
    pros: [
      "兼容性好（支持旧浏览器）",
      "可检测到可枚举属性即返回",
      "可扩展性强"
    ],
    cons: [
      "代码相对冗长",
      "需要手动处理hasOwnProperty",
      "不处理Symbol属性"
    ],
    performance: 85,
    readability: 3,
    browsers: ['chrome', 'firefox', 'safari', 'edge', 'ie'],
    symbols: false,
    nonEnum: false,
    prototype: true
  },
  {
    title: "Object.getOwnPropertyNames()",
    type: "原生方法",
    rating: 4,
    complexity: "O(n)",
    description: "获取对象所有自身属性（包括不可枚举属性），检查长度是否为0",
    code: `function isEmpty(obj) {
  return Object.getOwnPropertyNames(obj).length === 0;
}`,
    pros: [
      "检测包括不可枚举属性",
      "比for...in更精确",
      "ES5+支持"
    ],
    cons: [
      "不处理Symbol属性",
      "性能略低于Object.keys()",
      "原型链属性不影响结果"
    ],
    performance: 80,
    readability: 4,
    browsers: ['chrome', 'firefox', 'safari', 'edge', 'ie'],
    symbols: false,
    nonEnum: true,
    prototype: false
  },
  {
    title: "Reflect.ownKeys()",
    type: "ES6方法",
    rating: 5,
    complexity: "O(n)",
    description: "获取对象所有自身属性（包括Symbol属性和不可枚举属性）",
    code: `function isEmpty(obj) {
  return Reflect.ownKeys(obj).length === 0;
}`,
    pros: [
      "最全面的属性检测",
      "处理Symbol属性",
      "包括不可枚举属性"
    ],
    cons: [
      "ES6+支持，旧浏览器不兼容",
      "性能略低于Object.keys()",
      "使用率较低，代码可读性受影响"
    ],
    performance: 75,
    readability: 3,
    browsers: ['chrome', 'firefox', 'safari', 'edge'],
    symbols: true,
    nonEnum: true,
    prototype: false
  },
  {
    title: "Lodash _.isEmpty()",
    type: "库函数",
    rating: 5,
    complexity: "O(n)",
    description: "使用流行的Lodash库提供的isEmpty函数，处理各种边界情况",
    code: `import _ from 'lodash';

function isEmpty(obj) {
  return _.isEmpty(obj);
}`,
    pros: [
      "处理各种数据类型（数组、Map、Set等）",
      "健壮的边界情况处理",
      "良好的浏览器兼容性"
    ],
    cons: [
      "需要引入外部库",
      "增加项目依赖",
      "库函数有额外开销"
    ],
    performance: 70,
    readability: 5,
    browsers: ['chrome', 'firefox', 'safari', 'edge', 'ie'],
    symbols: true,
    nonEnum: true,
    prototype: true
  }
]);

// 实时测试区
const inputJson = ref('{}');
const jsonError = ref('');
const results = ref<Array<{ method: string, value: boolean, time: number }>>([]);

// 设置测试用例
const setTestCase = (testCase: string) => {
  inputJson.value = testCase;
  testMethods();
};

// 测试所有方法
const testMethods = () => {
  jsonError.value = '';
  results.value = [];

  let testObj: any;

  try {
    // 特殊处理undefined和Date
    if (inputJson.value === 'undefined') {
      testObj = undefined;
    } else if (inputJson.value === 'new Date()') {
      testObj = new Date();
    } else {
      // 使用Function构造函数安全地解析JSON
      testObj = new Function(`return ${inputJson.value}`)();
    }
  } catch (e) {
    jsonError.value = '无效的JSON格式';
    return;
  }

  // 定义测试方法
  const testFunctions = {
    "Object.keys()": (obj: any) => Object.keys(obj).length === 0,
    "JSON.stringify()": (obj: any) => JSON.stringify(obj) === '{}',
    "for...in循环": (obj: any) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    "Object.getOwnPropertyNames()": (obj: any) =>
      Object.getOwnPropertyNames(obj).length === 0,
    "Reflect.ownKeys()": (obj: any) =>
      Reflect.ownKeys(obj).length === 0,
    "Lodash _.isEmpty()": (obj: any) => {
      // 简化版Lodash isEmpty实现
      if (obj == null) return true;
      if (Array.isArray(obj) || typeof obj === 'string')
        return obj.length === 0;
      if (obj instanceof Map || obj instanceof Set)
        return obj.size === 0;
      return Object.keys(obj).length === 0;
    }
  };

  // 运行测试
  for (const [name, fn] of Object.entries(testFunctions)) {
    const start = performance.now();
    let result;

    try {
      result = fn(testObj);
    } catch (e) {
      result = 'error';
    }

    const end = performance.now();
    const time = parseFloat((end - start).toFixed(4));

    results.value.push({
      method: name,
      value: result as any,
      time
    });
  }
};

// 初始化时运行测试
testMethods();
</script>

<style lang="less" scoped>



.empty-object-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8fafc;

  .header {
    text-align: center;
    margin-bottom: 2.5rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 700;

      .highlight {
        color: #3498db;
        background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
        padding: 0.2rem 0.8rem;
        border-radius: 8px;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
    }
  }

  .intro {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;

    .intro-card {
      background: white;
      border-radius: 12px;
      padding: 1.8rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;

      i {
        font-size: 2.5rem;
        color: #3498db;
        margin-bottom: 1.2rem;
      }

      h3 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      p {
        color: #4a5568;
        line-height: 1.7;
      }
    }
  }

  .section-title {
    font-size: 1.6rem;
    margin: 2.5rem 0 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #eef2f7;
    color: #2c3e50;
    display: flex;
    align-items: center;

    i {
      margin-right: 0.8rem;
      color: #3498db;
    }
  }

  .methods {
    margin-bottom: 3rem;

    .methods-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.5rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .method-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .method-header {
        padding: 1.2rem 1.5rem;
        background: #f8fafc;
        border-bottom: 1px solid #eef2f7;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .method-title {
          h3 {
            font-size: 1.3rem;
            margin: 0;
            color: #2c3e50;
          }

          .method-type {
            background: #3498db;
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-block;
            margin-top: 0.5rem;
          }
        }

        .method-rating {
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          .rating {
            color: #f1c40f;
            margin-bottom: 0.3rem;
          }

          .complexity {
            font-size: 0.9rem;
            color: #7f8c8d;
          }
        }
      }

      .method-content {
        padding: 1.5rem;

        .description {
          p {
            color: #4a5568;
            line-height: 1.7;
            margin-bottom: 1.2rem;
          }
        }

        .code-sample {
          background: #2c3e50;
          border-radius: 8px;
          padding: 1.2rem;
          overflow-x: auto;
          margin-bottom: 1.2rem;

          pre {
            margin: 0;

            code {
              font-family: 'Fira Code', monospace;
              color: #e0e0e0;
              font-size: 0.9rem;
              line-height: 1.5;

              .hljs-keyword {
                color: #ff9a76;
              }

              .hljs-built_in {
                color: #82aaff;
              }

              .hljs-string {
                color: #c3e88d;
              }

              .hljs-function {
                color: #82aaff;
              }
            }
          }
        }

        .method-pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;

          .pros,
          .cons {
            border-radius: 8px;
            padding: 1rem;

            h4 {
              display: flex;
              align-items: center;
              font-size: 1rem;
              margin-top: 0;
              margin-bottom: 0.8rem;

              i {
                margin-right: 0.5rem;
              }
            }
          }

          .pros {
            background: rgba(46, 204, 113, 0.1);
            border-left: 4px solid #27ae60;

            h4 {
              color: #27ae60;
            }
          }

          .cons {
            background: rgba(231, 76, 60, 0.1);
            border-left: 4px solid #c0392b;

            h4 {
              color: #c0392b;
            }
          }

          ul {
            padding-left: 1.2rem;
            margin: 0;

            li {
              margin-bottom: 0.5rem;
              color: #4a5568;
              font-size: 0.9rem;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }

  .comparison {
    margin-bottom: 3rem;

    .comparison-table {
      background: white;
      border-radius: 12px;
      overflow: auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #f8fafc;
          font-weight: 600;
          color: #2c3e50;
        }

        tbody tr:hover {
          background: #f8fafc;
        }

        .progress-bar {
          background: #e0e0e0;
          border-radius: 10px;
          height: 20px;
          position: relative;

          .progress {
            background: #3498db;
            height: 100%;
            border-radius: 10px;
          }

          span {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            text-align: center;
            color: white;
            font-size: 0.8rem;
            line-height: 20px;
          }
        }

        .rating-stars {
          color: #e0e0e0;

          i.active {
            color: #f1c40f;
          }
        }

        .compatibility {
          display: flex;
          justify-content: center;
          gap: 0.5rem;

          i {
            font-size: 1.2rem;
            color: #ccc;

            &.active {
              color: #3498db;
            }

            &.fa-internet-explorer {
              color: #ccc;

              &.active {
                color: #1EBBEE;
              }
            }
          }
        }

        .special-cases {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;

          span {
            font-size: 0.85rem;
            color: #27ae60;

            i {
              margin-right: 0.3rem;
            }
          }
        }

        .recommendation {
          color: #f1c40f;
        }
      }
    }
  }

  .demo {
    margin-bottom: 3rem;

    .demo-container {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 1.5rem;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }

      .input-section {
        h3 {
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
          color: #2c3e50;
        }

        textarea {
          width: 100%;
          height: 150px;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          resize: vertical;
          margin-bottom: 1rem;

          &:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
          }
        }

        .error {
          color: #e74c3c;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        button {
          background: #3498db;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s;
          width: 100%;

          &:hover {
            background: #2980b9;
          }
        }
      }

      .results-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;

        .result-card {
          background: #f8fafc;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
          border: 1px solid #eef2f7;

          .method-name {
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #2c3e50;
          }

          .result-value {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;

            &.true {
              color: #27ae60;
            }

            &.false {
              color: #e74c3c;
            }
          }

          .execution-time {
            font-size: 0.8rem;
            color: #7f8c8d;
          }
        }
      }
    }

    .test-cases {
      margin-top: 1.5rem;

      h3 {
        font-size: 1.2rem;
        margin-bottom: 0.8rem;
        color: #2c3e50;
      }

      .cases {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        button {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;

          &:hover {
            background: #e2e8f0;
          }
        }
      }
    }
  }

  .best-practices {
    .practices {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;

      .practice-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        text-align: center;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

        i {
          font-size: 2rem;
          color: #3498db;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
          color: #2c3e50;
        }

        p {
          color: #4a5568;
          font-size: 0.95rem;
          line-height: 1.6;

          code {
            background: #f1f5f9;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
          }
        }
      }
    }

    .summary {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

      h3 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
        color: #2c3e50;
        display: flex;
        align-items: center;

        i {
          margin-right: 0.7rem;
          color: #3498db;
        }
      }

      p {
        color: #4a5568;
        line-height: 1.7;
        margin-bottom: 1rem;
      }

      pre {
        background: #2c3e50;
        border-radius: 8px;
        padding: 1.2rem;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          color: #e0e0e0;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
    border-top: 1px solid #eaeaea;
  }
}

@media (max-width: 768px) {
  .empty-object-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }
  }
}
</style>
