<!-- DocTypeExplanation.vue -->
<template>
  <div class="doc-type-container">
    <!-- 基础演示 -->
    <section class="demo-section">
      <h2>DOCTYPE 基础声明</h2>
      <code class="code-block">&lt;!DOCTYPE html&gt;</code>
      <p class="annotation">（现代HTML5标准声明）</p>
    </section>

    <!-- 作用说明 -->
    <section class="doc-section">
      <h3>核心作用</h3>
      <ul class="function-list">
        <li v-for="(item, index) in functionPoints" :key="index">
          {{ item }}
        </li>
      </ul>
    </section>

    <!-- 版本对比 -->
    <section class="history-section">
      <h3>历史版本对比</h3>
      <table class="version-table">
        <thead>
          <tr>
            <th>版本</th>
            <th>声明方式</th>
            <th>特性</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(version, index) in versionHistory" :key="index">
            <td>{{ version.name }}</td>
            <td><code>{{ version.declaration }}</code></td>
            <td>{{ version.feature }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 模式验证 -->
    <section class="mode-section">
      <h3>浏览器模式验证</h3>
      <div class="mode-demo">
        <div class="mode-box" :class="{ 'quirks-mode': isQuirks }">
          <p>当前模式：{{ currentMode }}</p>
          <button @click="toggleMode">切换渲染模式</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DocTypeExplanation',
  setup() {
    // 核心作用说明
    const functionPoints = [
      '声明文档类型规范（DTD）',
      '指示浏览器使用标准模式渲染',
      '避免浏览器进入怪异模式(Quirks Mode)',
      '确保跨浏览器兼容性',
      '启用HTML5新特性支持'
    ];

    // 历史版本数据
    const versionHistory = [
      {
        name: 'HTML5',
        declaration: '<!DOCTYPE html>',
        feature: '简化声明/向前兼容'
      },
      {
        name: 'HTML 4.01 Strict',
        declaration: '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',
        feature: '严格模式/禁用废弃标签'
      },
      {
        name: 'XHTML 1.0',
        declaration: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
        feature: 'XML语法/严格校验'
      }
    ];

    // 模式切换演示
    const isQuirks = ref(false);
    const currentMode = ref('标准模式');

    const toggleMode = () => {
      isQuirks.value = !isQuirks.value;
      currentMode.value = isQuirks.value ? '怪异模式' : '标准模式';

      // 动态修改CSS变量演示效果
      if (isQuirks.value) {
        document.documentElement.style.setProperty('--box-color', '#ffcccc');
      } else {
        document.documentElement.style.setProperty('--box-color', '#ccffcc');
      }
    };

    return {
      functionPoints,
      versionHistory,
      isQuirks,
      currentMode,
      toggleMode
    };
  }
});
</script>

<style scoped>
.doc-type-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #111827;
  background-color: #f9fafb;
}

.doc-type-container h2,
.doc-type-container h3 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.doc-type-container h2 {
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
}

.doc-type-container h3 {
  font-size: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.demo-section,
.doc-section,
.history-section,
.mode-section {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
}

.code-block {
  display: block;
  padding: 1rem;
  background: #f3f4f6;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  color: #1f2937;
  text-align: center;
  font-size: 1.1rem;
  margin: 1rem 0;
}

.annotation {
  color: #6b7280;
  font-size: 0.9em;
  text-align: center;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
}

.function-list {
  list-style-type: disc;
  padding-left: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.5rem 1.5rem;
}

.version-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.version-table th,
.version-table td {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.version-table th {
  background-color: #f3f4f6;
  font-weight: 600;
}

.version-table code {
  background-color: #e5e7eb;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.mode-demo {
  text-align: center;
}

.mode-box {
  padding: 2rem;
  border: 2px solid #a7f3d0;
  background-color: #f0fdf4;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 1rem auto;
  max-width: 400px;
}

.mode-box.quirks-mode {
  background-color: #fef2f2;
  border-color: #fecaca;
}

.mode-box p {
  margin-top: 0;
  font-size: 1.2rem;
  font-weight: 500;
}

button {
  padding: 0.6rem 1.2rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 1rem;
}

button:hover {
  background-color: #2563eb;
}
</style>
