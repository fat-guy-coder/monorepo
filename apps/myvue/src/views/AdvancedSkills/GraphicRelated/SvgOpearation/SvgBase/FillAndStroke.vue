<template>
  <div class="fill-stroke-container">
    <h1>SVG 填充和边框属性基础介绍</h1>

    <!-- 基础属性表格 -->
    <section class="property-reference">
      <h2>基础属性速查表</h2>
      <table class="property-table">
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>可选值</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prop in basicProperties" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td>{{ prop.description }}</td>
            <td>{{ prop.values }}</td>
            <td>{{ prop.default }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 动态示例演示 -->
    <section class="live-demo">
      <h2>填充和边框效果演示</h2>
      <div class="demo-wrapper">
        <div class="control-panel">
          <div class="control-group">
            <label>填充颜色：</label>
            <input type="color" v-model="fillColor">
          </div>
          <div class="control-group">
            <label>边框颜色：</label>
            <input type="color" v-model="strokeColor">
          </div>
          <div class="control-group">
            <label>边框宽度：</label>
            <input type="range" v-model="strokeWidth" min="1" max="20">
            <span>{{ strokeWidth }}px</span>
          </div>
          <div class="control-group">
            <label>边框样式：</label>
            <Select v-model="strokeDasharray">
              <option value="">实线</option>
              <option value="5,5">虚线</option>
              <option value="10,5">短划线</option>
              <option value="20,10,5,10">点划线</option>
            </select>
          </div>
        </div>
        <div class="svg-panel">
          <svg viewBox="0 0 200 200" width="200" height="200">
            <rect x="50" y="50" width="100" height="100" :fill="fillColor" :stroke="strokeColor"
              :stroke-width="strokeWidth" :stroke-dasharray="strokeDasharray" rx="10" ry="10" />
          </svg>
        </div>
      </div>
    </section>

    <!-- 渐变示例 -->
    <section class="gradient-demo">
      <h2>SVG 渐变示例</h2>
      <div class="demo-grid">
        <div class="gradient-item">
          <h3>线性渐变</h3>
          <svg viewBox="0 0 200 100" width="200" height="100">
            <defs>
              <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#ff6b6b" />
                <stop offset="100%" style="stop-color:#4ecdc4" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="180" height="80" fill="url(#linearGradient)" />
          </svg>
        </div>
        <div class="gradient-item">
          <h3>径向渐变</h3>
          <svg viewBox="0 0 200 100" width="200" height="100">
            <defs>
              <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#ff6b6b" />
                <stop offset="100%" style="stop-color:#4ecdc4" />
              </radialGradient>
            </defs>
            <rect x="10" y="10" width="180" height="80" fill="url(#radialGradient)" />
          </svg>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const basicProperties = [
  {
    name: 'fill',
    description: '设置形状的填充颜色',
    values: '颜色值 / none / url(#id)',
    default: 'black'
  },
  {
    name: 'fill-opacity',
    description: '设置填充的不透明度',
    values: '0-1之间的数值',
    default: '1'
  },
  {
    name: 'stroke',
    description: '设置边框颜色',
    values: '颜色值 / none',
    default: 'none'
  },
  {
    name: 'stroke-width',
    description: '设置边框宽度',
    values: '数值',
    default: '1'
  },
  {
    name: 'stroke-dasharray',
    description: '设置虚线边框样式',
    values: '一组数值，表示线段和间隔的长度',
    default: 'none'
  },
  {
    name: 'stroke-linecap',
    description: '设置线段端点样式',
    values: 'butt / round / square',
    default: 'butt'
  }
];

const fillColor = ref('#4CAF50');
const strokeColor = ref('#2196F3');
const strokeWidth = ref(4);
const strokeDasharray = ref('');
</script>

<style scoped>
.fill-stroke-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui;
}

.property-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
  }

  code {
    font-family: 'Fira Code', monospace;
    color: #c7254e;
  }
}

.demo-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #eee;
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 1rem;

  label {
    min-width: 100px;
  }

  input[type="range"] {
    flex: 1;
  }
}

.svg-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  padding: 1rem;
}

.gradient-demo {
  margin-top: 2rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.gradient-item {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
}
</style>
