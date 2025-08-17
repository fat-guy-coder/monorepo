<template>
  <div class="array-methods-container">
    <div class="header">
      <h1>手写数组原生方法实现</h1>
      <p>深入理解 JavaScript 数组方法的底层原理</p>
    </div>

    <div class="methods-overview">
      <div class="overview-card">
        <div class="overview-icon">🔍</div>
        <div class="overview-content">
          <h2>为什么要手写数组方法？</h2>
          <p>
            手写实现数组原生方法能帮助我们深入理解 JavaScript
            的核心原理，提升编程能力，并在面试中展示扎实的基础知识。
          </p>
          <div class="benefits">
            <div class="benefit">
              <div class="benefit-icon">🧠</div>
              <span>深入理解语言特性</span>
            </div>
            <div class="benefit">
              <div class="benefit-icon">💡</div>
              <span>提升编程思维能力</span>
            </div>
            <div class="benefit">
              <div class="benefit-icon">⚙️</div>
              <span>掌握核心算法实现</span>
            </div>
            <div class="benefit">
              <div class="benefit-icon">📝</div>
              <span>面试必备技能</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="methods-grid">
      <div
        v-for="method in methods"
        :key="method.name"
        class="method-card"
        :class="{ expanded: expandedMethod === method.name }"
      >
        <div class="method-header" @click="toggleMethod(method.name)">
          <div class="method-icon">{{ method.icon }}</div>
          <h3>{{ method.name }}</h3>
          <div class="method-summary">{{ method.summary }}</div>
          <div class="expand-icon">
            {{ expandedMethod === method.name ? '▼' : '►' }}
          </div>
        </div>

        <div v-if="expandedMethod === method.name" class="method-details">
          <div class="detail-section">
            <h4>实现思路</h4>
            <p>{{ method.thinking }}</p>
          </div>

          <div class="detail-section">
            <h4>原生方法行为</h4>
            <ul>
              <li v-for="(behavior, index) in method.behaviors" :key="index">{{ behavior }}</li>
            </ul>
          </div>

          <div class="detail-section">
            <h4>实现代码</h4>
            <pre>{{ method.implementation }}</pre>
          </div>

          <div class="detail-section">
            <h4>使用示例</h4>
            <div class="example-container">
              <pre>{{ method.example }}</pre>
              <button class="run-button" @click="runExample(method.name)">运行示例</button>
            </div>
            <div v-if="method.result" class="result-output">
              <strong>输出结果:</strong> {{ method.result }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="advanced-section">
      <h2>高级数组方法实现</h2>

      <div class="advanced-methods">
        <div class="advanced-method">
          <div class="method-header">
            <div class="method-icon">📤</div>
            <h3>Array.prototype.flat</h3>
          </div>
          <div class="implementation">
            <pre>
Array.prototype.myFlat = function(depth = 1) {
  const result = [];

  const flatten = (arr, currentDepth) => {
    for (const item of arr) {
      if (Array.isArray(item) && currentDepth > 0) {
        flatten(item, currentDepth - 1);
      } else {
        result.push(item);
      }
    }
  };

  flatten(this, depth);
  return result;
};</pre
            >
          </div>
        </div>

        <div class="advanced-method">
          <div class="method-header">
            <div class="method-icon">⚖️</div>
            <h3>Array.prototype.reduceRight</h3>
          </div>
          <div class="implementation">
            <pre>
Array.prototype.myReduceRight = function(callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = this.length - 1;

  if (arguments.length < 2) {
    if (this.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = this[this.length - 1];
    startIndex = this.length - 2;
  }

  for (let i = startIndex; i >= 0; i--) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};</pre
            >
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>掌握数组方法的底层实现是成为高级 JavaScript 开发者的关键一步</p>
      <p>理解这些核心方法的工作原理将帮助你编写更高效、更可靠的代码</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expandedMethod = ref('map')
const methods = ref([
  {
    name: 'Array.prototype.map',
    icon: '🗺️',
    summary: '创建一个新数组，其结果是该数组中的每个元素调用一次提供的函数后的返回值',
    thinking: '遍历原数组，对每个元素应用回调函数，将结果收集到新数组中',
    behaviors: [
      '返回一个新数组，不改变原数组',
      '遍历所有元素，包括空槽',
      '回调函数接受三个参数：当前元素、索引、原数组',
      '如果数组是稀疏的，回调函数不会在空槽上调用',
    ],
    implementation: `Array.prototype.myMap = function(callback, thisArg) {
  // 检查回调是否为函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  const array = Object(this);
  const length = array.length >>> 0;

  for (let i = 0; i < length; i++) {
    // 跳过空槽
    if (i in array) {
      result[i] = callback.call(thisArg, array[i], i, array);
    }
  }

  return result;
};`,
    example: `const numbers = [1, 2, 3, 4];
const doubled = numbers.myMap(num => num * 2);

console.log(doubled);`,
    result: '',
  },
  {
    name: 'Array.prototype.filter',
    icon: '🔍',
    summary: '创建一个新数组，包含通过所提供函数测试的所有元素',
    thinking: '遍历数组，对每个元素应用测试函数，将符合条件的元素添加到新数组中',
    behaviors: [
      '返回一个新数组，不改变原数组',
      '新数组只包含通过测试的元素',
      '回调函数应返回布尔值',
      '空槽会被跳过',
    ],
    implementation: `Array.prototype.myFilter = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  const array = Object(this);
  const length = array.length >>> 0;

  for (let i = 0; i < length; i++) {
    if (i in array && callback.call(thisArg, array[i], i, array)) {
      result.push(array[i]);
    }
  }

  return result;
};`,
    example: `const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.myFilter(num => num % 2 === 0);

console.log(evenNumbers);`,
    result: '',
  },
  {
    name: 'Array.prototype.find',
    icon: '🔎',
    summary: '返回数组中满足提供的测试函数的第一个元素的值',
    thinking: '遍历数组，对每个元素应用测试函数，返回第一个满足条件的元素',
    behaviors: [
      '返回第一个满足条件的元素',
      '如果没有找到则返回 undefined',
      '不改变原数组',
      '在找到第一个匹配项后停止遍历',
    ],
    implementation: `Array.prototype.myFind = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const array = Object(this);
  const length = array.length >>> 0;

  for (let i = 0; i < length; i++) {
    if (i in array && callback.call(thisArg, array[i], i, array)) {
      return array[i];
    }
  }

  return undefined;
};`,
    example: `const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const user = users.myFind(user => user.id === 2);
console.log(user);`,
    result: '',
  },
  {
    name: 'Array.prototype.findIndex',
    icon: '📌',
    summary: '返回数组中满足提供的测试函数的第一个元素的索引',
    thinking: '遍历数组，对每个元素应用测试函数，返回第一个满足条件的元素的索引',
    behaviors: [
      '返回第一个满足条件的元素的索引',
      '如果没有找到则返回 -1',
      '不改变原数组',
      '在找到第一个匹配项后停止遍历',
    ],
    implementation: `Array.prototype.myFindIndex = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const array = Object(this);
  const length = array.length >>> 0;

  for (let i = 0; i < length; i++) {
    if (i in array && callback.call(thisArg, array[i], i, array)) {
      return i;
    }
  }

  return -1;
};`,
    example: `const numbers = [5, 12, 8, 130, 44];
const isLarge = num => num > 10;
const index = numbers.myFindIndex(isLarge);

console.log(index);`,
    result: '',
  },
  {
    name: 'Array.prototype.every',
    icon: '✅',
    summary: '测试一个数组内的所有元素是否都能通过指定函数的测试',
    thinking: '遍历数组，对每个元素应用测试函数，如果所有元素都通过测试则返回 true',
    behaviors: ['返回布尔值', '空数组调用返回 true', '遇到第一个 false 立即返回', '不改变原数组'],
    implementation: `Array.prototype.myEvery = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const array = Object(this);
  const length = array.length >>> 0;

  for (let i = 0; i < length; i++) {
    if (i in array && !callback.call(thisArg, array[i], i, array)) {
      return false;
    }
  }

  return true;
};`,
    example: `const numbers = [12, 5, 8, 130, 44];
const allAboveTen = numbers.myEvery(num => num > 10);
const allAboveFour = numbers.myEvery(num => num > 4);

console.log(allAboveTen, allAboveFour);`,
    result: '',
  },
  {
    name: 'Array.prototype.some',
    icon: '🔶',
    summary: '测试数组中是否至少有一个元素通过了提供的函数测试',
    thinking: '遍历数组，对每个元素应用测试函数，如果至少有一个元素通过测试则返回 true',
    behaviors: ['返回布尔值', '空数组调用返回 false', '遇到第一个 true 立即返回', '不改变原数组'],
    implementation: `Array.prototype.mySome = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const array = Object(this);
  const length = array.length >>> 0;

  for (let i = 0; i < length; i++) {
    if (i in array && callback.call(thisArg, array[i], i, array)) {
      return true;
    }
  }

  return false;
};`,
    example: `const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.mySome(num => num % 2 === 0);
const hasNegative = numbers.mySome(num => num < 0);

console.log(hasEven, hasNegative);`,
    result: '',
  },
  {
    name: 'Array.prototype.reduce',
    icon: '🧮',
    summary: '对数组中的每个元素按序执行一个提供的 reducer 函数',
    thinking: '遍历数组，将前一次回调函数的返回值作为下一次回调函数的参数',
    behaviors: [
      '返回一个值',
      '如果没有初始值，则第一个元素作为初始值',
      '空数组调用且无初始值会报错',
      '可以用于数组求和、扁平化等多种操作',
    ],
    implementation: `Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const array = Object(this);
  const length = array.length >>> 0;

  let accumulator = initialValue;
  let startIndex = 0;

  if (arguments.length < 2) {
    if (length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    // 找到第一个存在的元素作为初始值
    while (startIndex < length && !(startIndex in array)) {
      startIndex++;
    }

    if (startIndex >= length) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    accumulator = array[startIndex];
    startIndex++;
  }

  for (let i = startIndex; i < length; i++) {
    if (i in array) {
      accumulator = callback(accumulator, array[i], i, array);
    }
  }

  return accumulator;
};`,
    example: `const numbers = [1, 2, 3, 4];
const sum = numbers.myReduce((acc, curr) => acc + curr, 0);
const product = numbers.myReduce((acc, curr) => acc * curr, 1);

console.log(sum, product);`,
    result: '',
  },
  {
    name: 'Array.prototype.sort',
    icon: '🔀',
    summary: '对数组的元素进行排序，并返回数组',
    thinking: '实现一个原地排序算法（如快速排序、归并排序）',
    behaviors: [
      '原地排序（改变原数组）',
      '默认排序顺序是将元素转换为字符串比较',
      '可以接受比较函数',
      '不稳定排序（V8使用TimSort，稳定）',
    ],
    implementation: `Array.prototype.mySort = function(compareFn) {
  // 默认比较函数
  const defaultCompare = (a, b) => {
    const aStr = String(a);
    const bStr = String(b);
    if (aStr < bStr) return -1;
    if (aStr > bStr) return 1;
    return 0;
  };

  const comparator = compareFn || defaultCompare;

  // 使用快速排序实现
  const quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return;

    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  };

  const partition = (arr, left, right) => {
    const pivot = arr[right];
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
      if (comparator(arr[i], pivot) < 0) {
        [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
        partitionIndex++;
      }
    }

    [arr[right], arr[partitionIndex]] = [arr[partitionIndex], arr[right]];
    return partitionIndex;
  };

  quickSort(this);
  return this;
};`,
    example: `const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
numbers.mySort((a, b) => a - b);

console.log(numbers);`,
    result: '',
  },
  {
    name: 'Array.prototype.forEach',
    icon: '🔄',
    summary: '对数组的每个元素执行一次给定的函数',
    thinking: '遍历数组，对每个存在的元素执行回调函数',
    behaviors: [
      '不返回任何值',
      '不能中途终止（除非抛出异常）',
      '不改变原数组（除非在回调中改变）',
      '跳过空槽',
    ],
    implementation: `Array.prototype.myForEach = function(callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const array = Object(this);
  const length = array.length >>> 0;

  for (let i = 0; i < length; i++) {
    if (i in array) {
      callback.call(thisArg, array[i], i, array);
    }
  }
};`,
    example: `const fruits = ['apple', 'banana', 'cherry'];
fruits.myForEach((fruit, index) => {
  console.log(\`\${index + 1}. \${fruit}\`);
});`,
    result: '',
  },
  {
    name: 'Array.prototype.at',
    icon: '🔄',
    summary: '返回数组中指定位置的元素',
    thinking: '返回数组中指定位置的元素',
    behaviors: [
      '返回指定位置的元素',
      '如果索引为负数，则从数组末尾开始计算',
      '如果索引超出范围，则返回 undefined',
      '不改变原数组',
    ],
    implementation: `Array.prototype.myAt = function(index) {
      const array = Object(this);
      const length = array.length >>> 0;
      const i = index < 0 ? length + index : index;
      return i in array ? array[i] : undefined;
    };`,
    example: `const fruits = ['apple', 'banana', 'cherry'];
const first = fruits.myAt(0);
const last = fruits.myAt(-1);

console.log(first, last);`,
    result: '',
  },
])

const toggleMethod = (methodName: string) => {
  expandedMethod.value = expandedMethod.value === methodName ? '' : methodName
}

const runExample = (methodName: string) => {
  const method = methods.value.find((m) => m.name === methodName)
  if (!method) return

  try {
    // 创建一个安全的执行环境
    const fn = new Function(`
      // 添加 polyfill
      if (!Array.prototype.myMap) {
        Array.prototype.myMap = ${methods.value.find((m) => m.name === 'Array.prototype.map')?.implementation};
      }
      if (!Array.prototype.myFilter) {
        Array.prototype.myFilter = ${methods.value.find((m) => m.name === 'Array.prototype.filter')?.implementation};
      }
      if (!Array.prototype.myFind) {
        Array.prototype.myFind = ${methods.value.find((m) => m.name === 'Array.prototype.find')?.implementation};
      }
      if (!Array.prototype.myFindIndex) {
        Array.prototype.myFindIndex = ${methods.value.find((m) => m.name === 'Array.prototype.findIndex')?.implementation};
      }
      if (!Array.prototype.myEvery) {
        Array.prototype.myEvery = ${methods.value.find((m) => m.name === 'Array.prototype.every')?.implementation};
      }
      if (!Array.prototype.mySome) {
        Array.prototype.mySome = ${methods.value.find((m) => m.name === 'Array.prototype.some')?.implementation};
      }
      if (!Array.prototype.myReduce) {
        Array.prototype.myReduce = ${methods.value.find((m) => m.name === 'Array.prototype.reduce')?.implementation};
      }
      if (!Array.prototype.mySort) {
        Array.prototype.mySort = ${methods.value.find((m) => m.name === 'Array.prototype.sort')?.implementation};
      }
      if (!Array.prototype.myForEach) {
        Array.prototype.myForEach = ${methods.value.find((m) => m.name === 'Array.prototype.forEach')?.implementation};
      }

      // 执行示例代码
      const result = (function() {
        ${method.example}
      })();

      return typeof result === 'object' ? JSON.stringify(result) : String(result);
    `)

    const result = fn()
    method.result = result
  } catch (error) {
    method.result = `错误: ${(error as Error).message}`
  }
}
</script>

<style lang="less" scoped>
.array-methods-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3748;
  background-color: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);

  .header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e2e8f0;

    h1 {
      font-size: 2.4rem;
      color: #2b6cb0;
      margin-bottom: 0.8rem;
      font-weight: 700;
    }

    p {
      font-size: 1.1rem;
      color: #718096;
      margin-bottom: 0;
    }
  }

  .methods-overview {
    .overview-card {
      display: flex;
      gap: 1.5rem;
      background: #ebf8ff;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      border-left: 4px solid #4299e1;

      .overview-icon {
        font-size: 3rem;
        flex-shrink: 0;
      }

      .overview-content {
        h2 {
          font-size: 1.6rem;
          color: #2b6cb0;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #4a5568;
          margin-bottom: 1.5rem;
        }

        .benefits {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;

          .benefit {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: white;
            border-radius: 8px;
            font-size: 0.95rem;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

            .benefit-icon {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }

  .methods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .method-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
      overflow: hidden;
      transition: all 0.3s ease;

      &.expanded {
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
      }

      .method-header {
        display: flex;
        align-items: center;
        padding: 1.2rem 1.5rem;
        background: #f7fafc;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover {
          background: #ebf8ff;
        }

        .method-icon {
          font-size: 1.8rem;
          margin-right: 1rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e6f7ff;
          border-radius: 8px;
        }

        h3 {
          font-size: 1.3rem;
          color: #2b6cb0;
          margin: 0;
          flex-grow: 1;
        }

        .method-summary {
          font-size: 0.9rem;
          color: #718096;
          margin-right: 1rem;
          max-width: 300px;
        }

        .expand-icon {
          font-size: 1.2rem;
          color: #718096;
        }
      }

      .method-details {
        padding: 1.5rem;
        border-top: 1px solid #e2e8f0;

        .detail-section {
          margin-bottom: 1.5rem;

          h4 {
            font-size: 1.1rem;
            color: #2b6cb0;
            margin-top: 0;
            margin-bottom: 0.8rem;
          }

          p {
            line-height: 1.7;
            color: #4a5568;
          }

          ul {
            padding-left: 1.5rem;
            margin: 0;

            li {
              margin-bottom: 0.5rem;
              line-height: 1.6;
              color: #4a5568;
            }
          }

          pre {
            background: #2d3748;
            color: #e2e8f0;
            border-radius: 8px;
            padding: 1.2rem;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            overflow-x: auto;
            margin: 1rem 0;
          }

          .example-container {
            position: relative;

            .run-button {
              position: absolute;
              top: 0.5rem;
              right: 0.5rem;
              background: #4299e1;
              color: white;
              border: none;
              border-radius: 4px;
              padding: 0.3rem 0.8rem;
              font-size: 0.85rem;
              cursor: pointer;
              transition: background 0.2s ease;

              &:hover {
                background: #3182ce;
              }
            }
          }

          .result-output {
            background: #ebf8ff;
            border-left: 4px solid #4299e1;
            padding: 0.8rem 1rem;
            border-radius: 4px;
            margin-top: 1rem;
            font-family: 'Fira Code', monospace;
          }
        }
      }
    }
  }

  .advanced-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    margin-bottom: 2rem;

    h2 {
      font-size: 1.6rem;
      color: #2b6cb0;
      margin-top: 0;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .advanced-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.5rem;

      .advanced-method {
        background: #f7fafc;
        border-radius: 10px;
        padding: 1.5rem;
        border: 1px solid #e2e8f0;

        .method-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.2rem;

          .method-icon {
            font-size: 1.8rem;
            margin-right: 1rem;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #e6f7ff;
            border-radius: 8px;
          }

          h3 {
            font-size: 1.3rem;
            color: #2b6cb0;
            margin: 0;
          }
        }

        .implementation {
          pre {
            background: #2d3748;
            color: #e2e8f0;
            border-radius: 8px;
            padding: 1.2rem;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            overflow-x: auto;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
    color: #718096;
    font-size: 0.95rem;
    line-height: 1.6;

    p {
      margin-bottom: 0.5rem;
    }
  }
}

@media (max-width: 768px) {
  .array-methods-container {
    padding: 1rem;

    .header h1 {
      font-size: 1.8rem;
    }

    .methods-grid {
      grid-template-columns: 1fr;

      .method-card {
        .method-header {
          flex-wrap: wrap;

          .method-summary {
            order: 3;
            margin-top: 0.5rem;
            margin-left: 3rem;
            max-width: 100%;
          }
        }
      }
    }

    .advanced-section .advanced-methods {
      grid-template-columns: 1fr;
    }
  }
}
</style>
