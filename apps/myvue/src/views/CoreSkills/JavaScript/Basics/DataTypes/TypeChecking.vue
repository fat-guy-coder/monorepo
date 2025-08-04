<template>
  <div class="container">
    <!-- 类型判断方法 -->
    <section class="method-section">
      <h2 class="section-title">JavaScript 类型判断方法大全 ({{ typeMethods.length }})</h2>
      <ul class="method-list">
        <li v-for="(method, index) in typeMethods" :key="index" class="method-item">
          <div class="method-header">
            <span class="method-name">{{ method.name }}</span>
            <a @click="handleRoute(method.route)" v-if="method.route">跳转实现</a>
          </div>
          <div class="method-detail">
            <div class="method-desc">{{ method.description }}</div>
            <div class="method-desc">{{ method.implementationPrinciple }}</div>
            <div class="principle-detail">底层原理：{{ method.principleDetail }}</div>
            <pre class="code-block"><code>{{ method.usage }}</code></pre>
            <div class="pros-cons">
              <div class="pros">
                <h3 class="section-title">✅ 优点</h3>
                <ul>
                  <li v-for="(pro, pIndex) in method.pros" :key="'pro' + pIndex">{{ pro }}</li>
                </ul>
              </div>
              <div class="cons">
                <h3 class="section-title">❌ 缺点</h3>
                <ul>
                  <li v-for="(con, cIndex) in method.cons" :key="'con' + cIndex">{{ con }}</li>
                </ul>
              </div>
            </div>
            <div class="examples">
              <h3 class="section-title">🌰 示例</h3>
              <div
                class="example-item"
                v-for="(example, exIndex) in method.examples"
                :key="'ex' + exIndex"
              >
                <pre class="code-block"><code>{{ example.code }}</code></pre>
                <div class="output">
                  输出结果: <span class="result">{{ example.output }}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const typeMethods = ref([
  {
    name: 'typeof',
    description: '检测基本数据类型的最佳选择',
    usage: 'typeof variable',
    implementationPrinciple: '按照数据在计算机底层存储的二进制结果来进行检测',
    principleDetail:
      '在 JavaScript 引擎内部，每种数据类型在底层都有一个对应的类型标签（type tag），typeof 操作符会读取变量的类型标签并返回对应的字符串。例如，number、string、boolean、undefined、function 都有各自的类型标签。但由于历史原因，null 的类型标签和对象一样，都是 0，因此 typeof null 会返回 "object"。',
    pros: ['简单快速检测基本类型', '对 undefined 检测准确', '所有浏览器支持'],

    cons: ['无法区分数组与对象', 'null 会被识别为 object', '无法检测自定义对象类型'],
    examples: [
      {
        code: 'typeof "hello" // string',
        output: 'string',
      },
      {
        code: 'typeof null // object',
        output: 'object',
      },
    ],
  },
  {
    name: 'instanceof',
    description: '检测对象实例的构造函数',
    usage: 'object instanceof Constructor',
    implementationPrinciple: '沿着对象的原型链向上查找，直到找到构造函数的 prototype 属性为止。',
    principleDetail:
      '沿着对象的原型链递归向上查找，直到找到构造函数的 prototype 属性为止。如果找到，则返回 true，否则返回 false。',
    pros: ['准确检测对象类型', '支持继承关系判断', '可检测自定义类型'],
    cons: ['无法检测基本类型', '跨窗口/iframe 失效', '原型链可能被修改'],
    route: 'AchieveInstanceof',
    examples: [
      {
        code: '[] instanceof Array // true',
        output: 'true',
      },
      {
        code: 'document.body instanceof HTMLBodyElement',
        output: 'true',
      },
    ],
  },
  {
    name: 'Object.prototype.toString.call',
    description: '最全面的类型检测方法',
    usage: 'Object.prototype.toString.call(value)',
    implementationPrinciple:
      '许多类原型上的toString方法都是用于转换字符串的，而Object.prototype.toString是用于检测数据类型的，所以使用时一般搭配call来改变this的指向',
    principleDetail:
      '在 JavaScript 引擎内部，每种数据类型在底层都有一个对应的类型标签（type tag），Object.prototype.toString.call 操作符会读取变量的类型标签并返回对应的字符串。例如，number、string、boolean、undefined、function 都有各自的类型标签。(跟typeof的底层原理一样)',
    pros: ['能检测所有内置类型', '准确区分数组/对象', '返回标准格式字符串'],
    cons: ['可能会被重写', '语法稍显复杂', '自定义类型返回 [object Object]', '需要处理字符串结果'],
    examples: [
      {
        code: 'Object.prototype.toString.call([]) // [object Array]',
        output: '[object Array]',
      },
      {
        code: 'Object.prototype.toString.call(null) // [object Null]',
        output: '[object Null]',
      },
    ],
  },
  {
    name: 'Array.isArray',
    description: '专门用于检测数组类型',
    usage: 'Array.isArray(value)',
    implementationPrinciple: 'Array.isArray(value) 会返回一个布尔值，表示变量是否是数组。',
    principleDetail:
      'Array.isArray 的底层原理是通过内部的 [[Class]] 属性（即 Object.prototype.toString.call(value) 返回 [object Array]）来判断变量是否为数组。在 ES5 规范中，Array.isArray 通过判断对象的内部属性 [[Class]] 是否为 "Array" 来实现，因此能准确区分数组和其他对象类型。',
    pros: ['准确检测数组类型', 'ES5+ 浏览器支持', '解决 instanceof 跨窗口问题'],
    cons: ['仅适用于数组检测', '旧浏览器需要 polyfill', '无法检测类数组对象'],
    examples: [
      {
        code: 'Array.isArray([]) // true',
        output: 'true',
      },
      {
        code: 'Array.isArray({ length: 0 }) // false',
        output: 'false',
      },
    ],
  },
])

const emit = defineEmits(['goToByRouteName'])

const handleRoute = (route: string) => {
  emit('goToByRouteName', route)
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.method-section {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid;
}

.method-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.method-item {
  margin: 1rem 0;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  padding: 1rem;
  background: #f8f9fa;
}

.method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.method-name {
  font-family: 'Fira Code', monospace;
  color: #2c3e50;
  font-size: 1.2rem;
}

.method-detail {
  padding: 1rem 0;
}

.method-desc {
  color: #666;
  margin-bottom: 1rem;
}

.principle-detail {
  color: #666;
  margin-bottom: 1rem;
}

.code-block {
  background: #2c3e50;
  color: #fff;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  code {
    color: #fff;
  }
}

.pros-cons {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  margin: 1rem 0;
}

.pros ul,
.cons ul {
  padding-left: 1.2rem;
  margin: 0.5rem 0;
}

.pros li {
  color: #27ae60;
}

.cons li {
  color: #c0392b;
}

.output {
  margin-top: 0.5rem;
  font-family: monospace;
  color: #95a5a6;
}

.result {
  color: #e67e22;
  font-weight: bold;
}
</style>
