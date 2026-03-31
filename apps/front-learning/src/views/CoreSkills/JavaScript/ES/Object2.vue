<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- 页面头部 -->
      <header class="page-header">
        <h1 class="page-title">
          <span class="card-icon">📦</span>
          ES+ Object 新增方法基本指南
        </h1>
        <p class="page-subtitle">ECMAScript 2015+</p>
      </header>
      <Nav :list="methods" class="nav"></Nav>

      <!-- Object方法 -->
      <div class="card mb-xl" v-for="(item, index) in methods" :key="index" :id="item.id">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔧</span>
            {{ item.title }}
          </h2>
        </div>
        <div class="card-body">
          <h3 class="text-lg font-semibold mb-md">{{ item.description }}</h3>
          <div class="method-grid">
            <div class="example-col">
              <h4 class="text-md font-semibold mb-sm">基本用法</h4>
              <div class="code-block">
                <pre><code>{{ item.code }}</code></pre>
              </div>
            </div>
          </div>
          <div class="grid grid-2 mt-lg">
            <div class="meta-item success">
              <h4 class="text-md font-semibold mb-sm">✅ 优点</h4>
              <ul class="feature-list">
                <li v-for="(i, index) in item.advantage" :key="index">{{ i }}</li>
              </ul>
            </div>
            <div class="meta-item warning">
              <h4 class="text-md font-semibold mb-sm">⚠️ 注意</h4>
              <p class="text-secondary">{{ item.attention }}</p>
            </div>
          </div>

          <div class="meta-item success mt-lg">
            <h4 class="text-md font-semibold mb-sm">✅ 最佳实践</h4>
            <p class="text-secondary">与Object.fromEntries()配合实现对象转换</p>
          </div>
        </div>
      </div>

      <!-- 方法对比表 -->
      <div class="card mb-xl contrast">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">🔍</span>
            方法对比表
          </h2>
        </div>
        <div class="card-body">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>方法</th>
                  <th>返回类型</th>
                  <th>是否遍历原型链</th>
                  <th>典型用例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Object.keys()</td>
                  <td>Array&lt;string&gt;</td>
                  <td>否</td>
                  <td>获取对象键集合</td>
                </tr>
                <tr>
                  <td>Object.entries()</td>
                  <td>Array&lt;[string, any]&gt;</td>
                  <td>否</td>
                  <td>对象转Map/迭代</td>
                </tr>
                <tr>
                  <td>Object.values()</td>
                  <td>Array&lt;any&gt;</td>
                  <td>否</td>
                  <td>获取对象值集合</td>
                </tr>
                <tr>
                  <td>Object.fromEntries()</td>
                  <td>Object</td>
                  <td>-</td>
                  <td>Map/数组转对象</td>
                </tr>
                <tr>
                  <td>Object.assign()</td>
                  <td>Object</td>
                  <td>是</td>
                  <td>对象合并/复制</td>
                </tr>
                <tr>
                  <td>Object.is()</td>
                  <td>Boolean</td>
                  <td>-</td>
                  <td>严格相等比较</td>
                </tr>
                <tr>
                  <td>Object.setPrototypeOf()</td>
                  <td>Object</td>
                  <td>-</td>
                  <td>设置原型链</td>
                </tr>
                <tr>
                  <td>Object.getPrototypeOf()</td>
                  <td>Object</td>
                  <td>-</td>
                  <td>获取原型链</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/css/main.less';
import { ref, onBeforeMount } from 'vue';
import Nav from 'components/Nav/ScrollNav.vue';

interface Method {
  name: string;
  title: string;
  id: string;
  code: string;
  advantage: string[];
  attention: string;
  description: string;
  since: string;
}

const methods = ref<Method[]>([]);

onBeforeMount(async () => {
  try {
    const { default: data } = await import('../JSON/ObjectESMethods.json');
    methods.value = data as Method[];
  } catch (error) {
    console.error('Failed to load ObjectESMethods.json:', error);
    // 提供默认数据以防文件加载失败
    methods.value = [
      {
        name: 'Object.entries',
        title: 'Object.entries() 方法',
        id: 'entries',
        code: `const obj = { a: 1, b: 2, c: 3 };
const entries = Object.entries(obj);
// [['a', 1], ['b', 2], ['c', 3]]`,
        advantage: ['获取对象的键值对数组', '便于遍历和转换'],
        attention: '只返回对象自身的可枚举属性',
        description: '返回一个给定对象自身可枚举属性的键值对数组',
        since: 'ES2017'
      }
    ];
  }
});
</script>

<style scoped>
/* 组件特定样式 */
.nav {
  position: fixed;
  top: 5rem;
  right: 2rem;
  width: 300px;
  z-index: 2;
}

.contrast {
  background: var(--bg-secondary);
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin: var(--spacing-lg) 0;
}

.example-col {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.meta-item {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}

.success {
  border-left: 4px solid var(--success-color);
}

.warning {
  border-left: 4px solid var(--warning-color);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
}

.feature-list li:last-child {
  border-bottom: none;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }

  .method-grid {
    grid-template-columns: 1fr;
  }
}
</style>
