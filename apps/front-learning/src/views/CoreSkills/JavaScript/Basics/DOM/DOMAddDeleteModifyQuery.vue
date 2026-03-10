<template>
  <div class="dom-container">
    <h1 class="main-title">JavaScript DOM 操作基本指南</h1>

    <h3>
      DOM（文档对象模型）是浏览器将HTML和XML文档转换成的一个对象表示，它允许脚本访问和操作网页的结构、样式及内容。DOM将文档解析为一个树形结构，其中每个元素、属性、文本都作为节点存在。通过DOM接口，开发者可以动态地修改网页内容、样式以及响应用户的交互事件。
    </h3>

    <section class="dom-section">
      <h2 class="section-title">🌲 DOM 概念</h2>
      <div class="concept-grid">
        <div class="concept-card">
          <div class="concept-icon">🖥️</div>
          <h3>文档树模型</h3>
          <p>以树形结构表示HTML文档，每个节点对应页面元素</p>
        </div>
        <div class="concept-card">
          <div class="concept-icon">⚡</div>
          <h3>实时更新</h3>
          <p>DOM操作会立即反映在页面渲染中</p>
        </div>
      </div>
    </section>

    <section class="dom-section">
      <h2 class="section-title">🔧常用API</h2>

      <div class="api-category" v-for="category in apiCategories" :key="category.name">
        <h3 class="category-title">{{ category.name }}</h3>
        <div class="api-grid">
          <template v-for="api in category.apis" :key="api.name">
            <div class="api-card" :class="api.grade">
              <div class="api-header">
                <h4>{{ api.name }}</h4>
                <span class="api-type">{{ api.type }}</span>
              </div>
              <p class="api-desc">{{ api.description }}</p>
              <pre class="code-example">{{ api.example }}</pre>
            </div>
          </template>
        </div>
        <div class="dom-image-container">
          <img :src="domImage" v-if="category.name === '节点位置和宽高'" alt="dom" loading="lazy">
        </div>
        <a href="https://www.runoob.com/jsref/dom-obj-document.html" target="_blank">摘自菜鸟教程</a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import domImage from '@/assets/image/js/nodeInfo.png'
import { onMounted, ref } from 'vue'
interface DOMAPI {
  name: string
  type: string
  grade: 'first' | 'second' | 'third' | 'fourth'
  description: string
  example: string
}

interface APICategory {
  name: string
  apis: DOMAPI[]
}



const apiCategories = ref<APICategory[]>([])

onMounted(async () => {
  const { default: list } = await import('../../JSON/DomNodeLlist.json')
  apiCategories.value = list as APICategory[]
})
</script>

<style scoped>
.dom-image-container {

  width: 100%;

  img {
    object-fit: cover;
  }
}

.dom-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2d3748;
}

.main-title {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.6rem;
  background: linear-gradient(45deg, #2c3e50, #42b983);
  /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.concept-card:hover {
  transform: translateY(-3px);
}

.concept-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.api-category {
  margin: 3rem 0;
}

.category-title {
  color: #42b983;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.api-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid #42b983;
}

.api-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.api-type {
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  background: #e2e8f0;
  color: #475569;
}

.code-example {
  background: #1e293b;
  color: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  margin-top: 1rem;
  overflow-x: auto;
}

.section-title {
  color: #2c3e50;
  margin: 3rem 0 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
}

.first {
  background: #fa8650;
}

.second {
  background: #e9e652;
}

.third {
  background: #52e97a;
}

.fourth {
  background: #52e9e9;
}
</style>
