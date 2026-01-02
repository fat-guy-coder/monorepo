<template>
  <div class="string-methods-container">
    <header class="header">
      <div class="header-content">
        <h1>JavaScript字符串原生方法实现</h1>
        <p>深入理解JavaScript字符串操作的核心原理</p>
      </div>
      <div class="header-pattern">
        <div class="pattern-block" v-for="i in 16" :key="i"></div>
      </div>
    </header>

    <div class="category-filter">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="activeCategory = category.id"
        :class="{ active: activeCategory === category.id }"
      >
        {{ category.label }}
      </button>
    </div>

    <div class="methods-grid">
      <div
        v-for="method in filteredMethods"
        :key="method.name"
        class="method-card"
        :class="method.category"
      >
        <div class="card-header">
          <h3>{{ method.name }}()</h3>
          <div class="method-category">{{ method.category }}</div>
        </div>

        <div class="method-description">
          {{ method.description }}
        </div>

        <div class="implementation-section">
          <div class="section-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <span>实现思路</span>
          </div>
          <div class="implementation-details">
            <ul>
              <li v-for="(step, index) in method.steps" :key="index">{{ step }}</li>
            </ul>
          </div>
        </div>

        <div class="code-section">
          <div class="section-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span>代码实现</span>
          </div>
          <pre class="code-block"><code>{{ method.implementation }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 方法分类
const categories = [
  { id: 'all', label: '全部方法' },
  { id: 'search', label: '搜索方法' },
  { id: 'extract', label: '提取方法' },
  { id: 'modify', label: '修改方法' },
  { id: 'case', label: '大小写转换' },
]

// 当前激活的分类
const activeCategory = ref('all')

// 字符串方法数据
interface StringMethod {
  name: string
  description: string
  category: string
  steps: string[]
  implementation: string
}

const stringMethods: StringMethod[] = [
  {
    name: 'indexOf',
    description: '返回指定值在字符串中首次出现的位置',
    category: 'search',
    steps: [
      '遍历字符串中的每个字符',
      '将当前字符与搜索字符（或字符串的第一个字符）进行比较',
      '如果匹配，检查后续字符是否也匹配（对于多字符搜索）',
      '如果全部匹配，返回当前索引',
      '如果未找到匹配项，返回-1',
    ],
    implementation: `function indexOf(str, searchValue, fromIndex = 0) {
  if (searchValue === '') return fromIndex < 0 ? 0 : fromIndex;

  for (let i = fromIndex; i < str.length; i++) {
    if (str[i] === searchValue[0]) {
      let match = true;
      for (let j = 1; j < searchValue.length; j++) {
        if (str[i + j] !== searchValue[j]) {
          match = false;
          break;
        }
      }
      if (match) return i;
    }
  }
  return -1;
}`,
  },
  {
    name: 'slice',
    description: '提取字符串的一部分并返回新字符串',
    category: 'extract',
    steps: [
      '处理负索引：负索引表示从字符串末尾开始计算',
      '确定开始索引和结束索引',
      '如果开始索引大于等于结束索引，返回空字符串',
      '遍历从开始索引到结束索引的字符',
      '拼接这些字符形成新字符串并返回',
    ],
    implementation: `function slice(str, start, end) {
  // 处理负索引
  if (start < 0) start = str.length + start;
  if (end === undefined) end = str.length;
  if (end < 0) end = str.length + end;

  // 处理边界情况
  if (start > end) return '';
  if (start < 0) start = 0;
  if (end > str.length) end = str.length;

  let result = '';
  for (let i = start; i < end; i++) {
    result += str[i];
  }
  return result;
}`,
  },
  {
    name: 'replace',
    description: '替换字符串中的指定值',
    category: 'modify',
    steps: [
      '查找搜索值在字符串中的位置',
      '如果找到，提取搜索值之前的部分',
      '添加替换值',
      '添加搜索值之后的部分',
      '返回新形成的字符串',
    ],
    implementation: `function replace(str, searchValue, replaceValue) {
  const index = str.indexOf(searchValue);
  if (index === -1) return str;

  return (
    str.slice(0, index) +
    replaceValue +
    str.slice(index + searchValue.length)
  );
}`,
  },
  {
    name: 'split',
    description: '将字符串分割为子字符串数组',
    category: 'extract',
    steps: [
      '如果分隔符为空字符串，将字符串拆分为字符数组',
      '初始化结果数组和当前片段变量',
      '遍历字符串中的每个字符',
      '如果当前字符与分隔符匹配，将当前片段添加到结果数组并重置当前片段',
      '否则将当前字符添加到当前片段',
      '遍历完成后，将剩余片段添加到结果数组',
    ],
    implementation: `function split(str, separator) {
  if (separator === '') {
    return Array.from(str);
  }

  const result = [];
  let current = '';

  for (let i = 0; i < str.length; i++) {
    if (str.slice(i, i + separator.length) === separator) {
      result.push(current);
      current = '';
      i += separator.length - 1;
    } else {
      current += str[i];
    }
  }

  result.push(current);
  return result;
}`,
  },
  {
    name: 'toUpperCase',
    description: '将字符串转换为大写',
    category: 'case',
    steps: [
      '创建一个空字符串用于存储结果',
      '遍历原始字符串中的每个字符',
      '获取字符的ASCII码',
      '如果字符是小写字母（ASCII 97-122），转换为大写（减去32）',
      '否则保持原样',
      '将转换后的字符添加到结果字符串',
    ],
    implementation: `function toUpperCase(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 97 && charCode <= 122) {
      result += String.fromCharCode(charCode - 32);
    } else {
      result += str[i];
    }
  }
  return result;
}`,
  },
  {
    name: 'trim',
    description: '移除字符串两端的空白字符',
    category: 'modify',
    steps: [
      '定义空白字符（空格、制表符、换行符等）',
      '从字符串开头遍历，找到第一个非空白字符的索引',
      '从字符串末尾遍历，找到最后一个非空白字符的索引',
      '使用这两个索引提取子字符串',
    ],
    implementation: `function trim(str) {
  const whitespace = ' \\t\\n\\r\\f\\v';
  let start = 0;
  let end = str.length - 1;

  // 找到第一个非空白字符
  while (start <= end && whitespace.includes(str[start])) {
    start++;
  }

  // 找到最后一个非空白字符
  while (end >= start && whitespace.includes(str[end])) {
    end--;
  }

  return str.slice(start, end + 1);
}`,
  },
  {
    name: 'charAt',
    description: '返回字符串中指定位置的字符',
    category: 'extract',
    steps: [
      '检查索引是否在有效范围内（0 到 length-1）',
      '如果索引无效，返回空字符串',
      '否则返回该索引处的字符',
    ],
    implementation: `function charAt(str, index) {
  if (index < 0 || index >= str.length) return '';
  return str[index];
}`,
  },
  {
    name: 'endsWith',
    description: '判断字符串是否以指定字符串结尾',
    category: 'search',
    steps: [
      '计算结束位置（如果未提供）',
      '检查指定位置前的字符是否与搜索字符串匹配',
      '从计算位置开始反向比较字符',
      '如果所有字符匹配则返回true，否则返回false',
    ],
    implementation: `function endsWith(str, search, length = str.length) {
  const endIndex = length - search.length;

  if (endIndex < 0) return false;

  for (let i = 0; i < search.length; i++) {
    if (str[endIndex + i] !== search[i]) {
      return false;
    }
  }
  return true;
}`,
  },
]

// 过滤显示的方法
const filteredMethods = computed(() => {
  if (activeCategory.value === 'all') return stringMethods
  return stringMethods.filter((method) => method.category === activeCategory.value)
})
</script>

<style lang="less" scoped>
.string-methods-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #2d3748;
  background: linear-gradient(135deg, #f9fbfd 0%, #f0f4f8 100%);
  min-height: 100vh;
}

.header {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  box-shadow: 0 10px 25px rgba(101, 119, 236, 0.15);

  .header-content {
    position: relative;
    z-index: 2;
    padding: 3rem 2rem 2rem;
    background: rgba(255, 255, 255, 0.95);

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin: 0 0 0.5rem;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      letter-spacing: -0.015em;
    }

    p {
      font-size: 1.2rem;
      color: #4a5568;
      font-weight: 400;
      margin: 0 0 2rem;
    }
  }

  .header-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    z-index: 1;

    .pattern-block {
      background: rgba(165, 180, 252, 0.1);
      border: 1px solid rgba(199, 210, 254, 0.15);

      &:nth-child(1) {
        background: rgba(79, 70, 229, 0.03);
      }
      &:nth-child(2) {
        background: rgba(129, 140, 248, 0.03);
      }
      &:nth-child(5) {
        background: rgba(99, 102, 241, 0.03);
      }
      &:nth-child(6) {
        background: rgba(79, 70, 229, 0.05);
      }
      &:nth-child(9) {
        background: rgba(129, 140, 248, 0.05);
      }
      &:nth-child(10) {
        background: rgba(99, 102, 241, 0.05);
      }
    }
  }
}

.interactive-demo {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 600px;

  .input-group {
    display: flex;
    margin-bottom: 1rem;

    .demo-input {
      flex: 1;
      padding: 0.8rem 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      font-family: 'Fira Code', monospace;
      transition: border-color 0.3s;

      &:focus {
        outline: none;
        border-color: #818cf8;
        box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
      }
    }

    .reset-btn {
      margin-left: 0.5rem;
      width: 46px;
      background: #f1f5f9;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s;

      &:hover {
        background: #e2e8f0;
      }

      svg {
        stroke: #64748b;
      }
    }
  }

  .demo-string {
    padding: 1.2rem;
    background: #f8fafc;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 1.1rem;
    color: #334155;
    border: 1px dashed #cbd5e1;
    word-break: break-all;
  }
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 1.8rem;
  margin-bottom: 3rem;
}

.method-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(101, 119, 236, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(101, 119, 236, 0.15);
  }

  // 不同方法类型的边框颜色
  &.search {
    border-top: 4px solid #60a5fa;
  }
  &.extract {
    border-top: 4px solid #fbbf24;
  }
  &.modify {
    border-top: 4px solid #34d399;
  }
  &.case {
    border-top: 4px solid #a78bfa;
  }

  .card-header {
    padding: 1.5rem 1.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;

    h3 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
      font-family: 'Fira Code', monospace;
    }

    .method-category {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;

      .search & {
        background: #dbeafe;
        color: #3b82f6;
      }
      .extract & {
        background: #fef3c7;
        color: #f59e0b;
      }
      .modify & {
        background: #dcfce7;
        color: #10b981;
      }
      .case & {
        background: #ede9fe;
        color: #8b5cf6;
      }
    }
  }

  .method-description {
    padding: 1rem 1.5rem;
    color: #475569;
    line-height: 1.6;
    border-bottom: 1px solid #f1f5f9;
  }
}

.section-header {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  font-weight: 600;
  color: #334155;
  border-top: 1px solid #f1f5f9;

  svg {
    margin-right: 0.7rem;
    stroke: #64748b;
  }
}

.implementation-details {
  padding: 1rem 1.5rem 1.5rem;

  ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.7rem;
    line-height: 1.6;
    color: #475569;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.code-section {
  .code-block {
    margin: 0;
    padding: 1.5rem;
    background: #1e293b;
    color: #f1f5f9;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    overflow-x: auto;
    border-radius: 0;

    code {
      display: block;
      white-space: pre;
    }
  }
}

.demo-section {
  .demo-example {
    padding: 1.5rem;

    .demo-input-line,
    .demo-output-line {
      display: flex;
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .demo-label {
      flex: 0 0 60px;
      font-weight: 600;
      color: #4f46e5;
    }

    .demo-code {
      flex: 1;
      font-family: 'Fira Code', monospace;
      background: #f1f5f9;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }

    .demo-result {
      flex: 1;
      font-family: 'Fira Code', monospace;
      background: #f8fafc;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: 1px dashed #cbd5e1;
      color: #0f172a;
      word-break: break-all;
    }
  }
}

.category-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 2rem 0 3rem;

  button {
    padding: 0.8rem 1.8rem;
    border: none;
    border-radius: 8px;
    background: #e2e8f0;
    color: #475569;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active,
    &:hover {
      background: #4f46e5;
      color: white;
      box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
    }
  }
}

@media (max-width: 768px) {
  .header .header-content h1 {
    font-size: 2rem;
  }

  .methods-grid {
    grid-template-columns: 1fr;
  }

  .interactive-demo {
    .demo-string {
      font-size: 1rem;
    }
  }

  .method-card .card-header {
    flex-direction: column;
    align-items: flex-start;

    .method-category {
      margin-top: 0.5rem;
    }
  }
}
</style>
