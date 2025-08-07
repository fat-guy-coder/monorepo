<template>
  <div class="main-container">
    <h1>JavaScript 数组去重方法基础介绍</h1>
    <div class="method-list">
      <div v-for="method in methods" :key="method.name" class="method-card">
        <h2>{{ method.name }}</h2>
        <div class="code-block">
          <pre>{{ method.code }}</pre>
        </div>
        <div class="detail-item">
          <span class="label">时间复杂度:</span> {{ method.timeComplexity }}
        </div>
        <div class="detail-item">
          <span class="label">空间复杂度:</span> {{ method.spaceComplexity }}
        </div>
        <div class="detail-item">
          <span class="label">特殊值处理:</span> {{ method.specialValues }}
        </div>
        <div class="detail-item">
          <span class="label">优点:</span> {{ method.pros }}
        </div>
        <div class="detail-item">
          <span class="label">缺点:</span> {{ method.cons }}
        </div>
        <div class="recommendation">
          💡 推荐场景: {{ method.scenario }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MethodInfo {
  name: string
  code: string
  timeComplexity: string
  spaceComplexity: string
  specialValues: string
  pros: string
  cons: string
  scenario: string
}

// interface Item {
//   id: string
//   [index: string]: string | Item
// }

// const unique = (arr: Item[]) => {
//   // const map = new Map()
//   // return arr.filter((item, index) => !map.has(item.id) && map.set(item.id, true))
//   return arr.filter((item, index) => arr.findIndex(i => i.id === item.id) === index)
// }




const methods: MethodInfo[] = [
  {
    name: 'Set 去重法',
    code: 'const unique = (arr: any[]) => [...new Set(arr)]',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    specialValues: '自动处理 NaN，无法处理对象引用',
    pros: '代码简洁、执行速度快',
    cons: '无法处理对象类型元素',
    scenario: '基础数据类型数组快速去重'
  },
  {
    name: 'Set + Filter',
    code: 'const unique = (arr: any[]) => { const set = new Set(arr); return arr.filter(item => !set.has(item) && set.add(item)) }',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    specialValues: '自动处理 NaN，无法处理对象引用',
    pros: '代码简洁、执行速度快',
    cons: '无法处理对象类型元素',
    scenario: '基础数据类型数组快速去重'
  },
  {
    name: 'Map + Filter',
    code: 'const unique = (arr) => {\n  const map = new Map();\n  return arr.filter(item => !map.has(item) && map.set(item, true));\n}',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    specialValues: '无法处理 NaN',
    pros: '性能较好，适合大数组',
    cons: '不处理 NaN',
    scenario: '大规模数组去重'
  },
  {
    name: 'obj + Filter',
    code: 'function unique(arr) {\n  const obj = {};\n  return arr.filter(item => \n    obj[typeof item + item] ? false : obj[typeof item + item] = true\n  );\n}',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    specialValues: '会强制类型转换 (1 和 "1" 视为相同)',
    pros: '处理 NaN 能力 (NaN 作为键值)',
    cons: '类型混淆风险',
    scenario: '需要处理 NaN 的大型数组'
  },
  {
    name: 'Filter + IndexOf',
    code: 'const unique = (arr: any[]) => arr.filter((item, index) => arr.indexOf(item) === index)',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n)',
    specialValues: '无法处理 NaN',
    pros: '兼容性好',
    cons: '性能较差，不处理 NaN',
    scenario: '小型数组且不需要处理 NaN'
  },
  {
    name: 'Reduce 累加器',
    code: 'const unique = (arr: any[]) => arr.reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [])',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n)',
    specialValues: '无法处理 NaN',
    pros: '函数式编程风格',
    cons: '性能较差',
    scenario: '需要链式调用的场景'
  },
  {
    name: '双重循环',
    code: 'function unique(arr) {\n  for(let i=0; i<arr.length; i++) {\n    for(let j=i+1; j<arr.length; j++) {\n      if(arr[i] === arr[j]) {\n        arr.splice(j, 1);\n        j--;\n      }\n    }\n  }\n  return arr;\n}',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    specialValues: '无法处理 NaN',
    pros: '不需要额外空间',
    cons: '性能最差',
    scenario: '极小规模数组'
  },
  {
    name: '排序 + 去重',
    code: 'const unique = (arr) => arr.sort().filter((item, index) => item !== arr[index - 1]);',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    specialValues: '无法处理 NaN',
    pros: '简单易懂',
    cons: '需要排序，性能较差',
    scenario: '小型数组'
  }
]

</script>

<style scoped>
.main-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #42b983;
  padding-bottom: 1rem;
}

.method-list {
  display: grid;
  gap: 1.5rem;
}

.method-card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.method-card:hover {
  transform: translateY(-3px);
}

h2 {
  color: #42b983;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.code-block {
  background: #f8f8f8;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Consolas', monospace;
  color: #476582;
}

.detail-item {
  margin: 0.8rem 0;
  line-height: 1.6;
}

.label {
  font-weight: 600;
  color: #2c3e50;
  margin-right: 0.5rem;
}

.recommendation {
  margin-top: 1.2rem;
  padding: 1rem;
  background: #e3f6f5;
  border-left: 4px solid #42b983;
  border-radius: 4px;
  color: #2c3e50;
}
</style>
