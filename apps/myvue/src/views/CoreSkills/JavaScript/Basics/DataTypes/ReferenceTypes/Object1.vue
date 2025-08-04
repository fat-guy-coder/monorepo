<template>
  <div class="main-container">
    <!-- 导航目录 -->
    <Nav class="sidebar" :list="list" show-child stop-propagation></Nav>

    <!-- 对象介绍 -->
    <section class="intro-section">
      <h2 class="section-title">JavaScript对象简介</h2>
      <div class="intro-content">
        <p class="intro-text">
          对象(Object)是JavaScript中最基础和最重要的引用类型之一。对象是一组属性的无序集合,每个属性都是一个键值对。
          在JavaScript中,几乎所有东西都是对象 - 数组是对象、函数是对象、正则表达式是对象,甚至原始类型在必要时也会被转换成对象。
        </p>

        <div class="key-features">
          <h3>对象的主要特点:</h3>
          <ul>
            <li>
              <strong>动态性:</strong>
              可以动态添加、修改和删除属性
            </li>
            <li>
              <strong>引用类型:</strong>
              通过引用传递,而不是值传递
            </li>
            <li>
              <strong>属性特性:</strong>
              属性可以配置其可写性、可枚举性、可配置性等特性
            </li>
            <li>
              <strong>原型继承:</strong>
              对象可以从其他对象继承属性和方法
            </li>
          </ul>
        </div>

        <div class="usage-note">
          <h3>使用场景:</h3>
          <p>
            对象常用于组织和存储相关数据,实现数据封装,创建复杂数据结构,以及面向对象编程。
            理解和掌握对象的操作是JavaScript编程的基础。
          </p>
        </div>
      </div>
    </section>


    <section class="method-section">
      <h2 class="section-title create">删除对象的属性</h2>
      <p>
        delete 操作符用于删除对象的属性。
        语法: delete 对象.属性名
      </p>
    </section>



    <!-- 生成对象的方法 -->
    <section class="method-section" v-for="(methods, index) in showList" :key="index" :id="methods.id">
      <h2 class="section-title create">{{ methods.name }}</h2>
      <ul class="method-list">
        <li v-for="method in methods.children" :key="method.name" :id="method.id" class="method-item">
          <div class="method-header">
            <span class="method-name">{{ method.name }}</span>
          </div>
          <div class="method-detail">
            <div class="method-desc">{{ method.desc }}</div>
            <pre class="code-block"><code>{{ method.example }}</code></pre>
            <div class="output" v-if="method.output">输出：{{ method.output }}</div>
          </div>
        </li>
      </ul>
    </section>

    <!-- defineProperty中的receiver对象 -->
    <section class="receiver-section" id="receiver">
      <h2 class="section-title">defineProperty中的receiver对象</h2>
      <div class="receiver-content">
        <p class="desc">
          receiver对象是defineProperty(ies)中用于配置属性特性的描述符对象,包含以下属性:
        </p>
        <ul class="receiver-props">
          <li>
            <strong>value:</strong>
            <span>属性的值,可以是任何有效的JavaScript值</span>
          </li>
          <li>
            <strong>writable:</strong>
            <span>表示属性值是否可以被修改,默认为false</span>
          </li>
          <li>
            <strong>enumerable:</strong>
            <span>表示属性是否可以被枚举(如在for...in循环中),默认为false</span>
          </li>
          <li>
            <strong>configurable:</strong>
            <span>表示属性是否可以被删除或重新配置,默认为false</span>
          </li>
          <li>
            <strong>get:</strong>
            <span>属性的getter函数,当访问属性时调用</span>
          </li>
          <li>
            <strong>set:</strong>
            <span>属性的setter函数,当设置属性值时调用</span>
          </li>
        </ul>

        <div class="example">
          <h3>示例:</h3>
          <pre class="code-block"><code>const obj = {};
Object.defineProperty(obj, 'name', {
  value: 'test',
  writable: true,
  enumerable: true,
  configurable: true
});

// 使用getter和setter
Object.defineProperty(obj, 'age', {
  get() {
    return this._age;
  },
  set(value) {
    this._age = value;
  }
});</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import Nav from '@/components/ScrollNav.vue'
import { ref, onBeforeMount, computed } from 'vue'

interface Method {
  name: string
  desc: string
  id: string
  children: {
    name: string
    desc: string
    id: string
    example: string
    output: string
  }[]
  example: string
  output: string
}
const list = ref<Method[]>([])


onBeforeMount(async () => {
  const { default: data } = await import('../../../JSON/ObjectMethods.json')
  list.value = data as Method[]
  list.value.push({
    name: 'receiver对象',
    id: 'receiver',
    children: [],
    desc: 'receiver对象是defineProperty(s)中用于配置属性特性的描述符对象,包含以下属性:',
    example: '',
    output: '',
  })
})

const showList = computed(() => {
  return list.value.slice(0, list.value.length - 2)
})

</script>
<style scoped>
.sidebar {
  position: absolute;
  top: 4rem;
  right: 4rem;
  width: 200px;
}

.main-container {
  display: grid;
  max-width: 1200px;
  grid-template-columns: 2fr;
  gap: 2rem;
  padding: 2rem;

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

.section-title.static {
  border-color: #e74c3c;
  color: #e74c3c;
}

.section-title.prototype {
  border-color: #2ecc71;
  color: #2ecc71;
}

.section-title.create {
  border-color: #3498db;
  color: #3498db;
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

.code-block {
  background: #2c3e50;
  color: #fff;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

.output {
  margin-top: 0.5rem;
  color: #3498db;
  font-family: monospace;
}

.receiver-section {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.receiver-content {
  margin-top: 1.5rem;
}

.receiver-props {
  list-style: none;
  padding: 0;
}

.receiver-props li {
  margin: 1rem 0;
  padding: 0.8rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.receiver-props strong {
  color: #2c3e50;
  margin-right: 0.5rem;
}

.example {
  margin-top: 2rem;
}

.example h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.code-block {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  color: #2c3e50;
}
</style>
