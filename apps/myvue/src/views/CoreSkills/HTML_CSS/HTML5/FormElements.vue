<template>
  <div class="h5-form-guide">
    <!-- 导航区 -->
    <nav class="guide-nav">
      <h1>📝 HTML5 表单增强指南</h1>
      <div class="nav-links">
        <a v-for="section in sections" :key="section.id" :href="`#${section.id}`" @click.prevent="scrollTo(section.id)"
          class="nav-link">
          {{ section.title }}
        </a>
      </div>
    </nav>

    <!-- 内容区 -->
    <main class="guide-content">
      <!-- 新增元素 -->
      <section id="elements" class="content-section">
        <h2>✨ 新增表单元素</h2>
        <div class="element-grid">
          <div class="element-card" v-for="element in elements" :key="element.name">
            <p>{{ element.name }}<span class="element-icon">{{ element.icon }}</span></p>
            <p>{{ element.desc }}</p>
            <div class="element-header">
              <code>{{ element.code }}</code>
            </div>

          </div>
        </div>
      </section>

      <!-- 新增属性 -->
      <section id="attributes" class="content-section">
        <h2>🔧 新增表单属性</h2>
        <div class="attribute-table">
          <table>
            <thead>
              <tr>
                <th>属性</th>
                <th>适用元素</th>
                <th>说明</th>
                <th>示例</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="attr in attributes" :key="attr.name">
                <td><code>{{ attr.name }}</code></td>
                <td><code>{{ attr.elements }}</code></td>
                <td>{{ attr.desc }}</td>
                <td><code>{{ attr.example }}</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 数据部分
const sections = ref([
  { id: 'elements', title: '新增元素' },
  { id: 'attributes', title: '新增属性' },
]);

const elements = ref([
  {
    name: 'email',
    icon: '📋',
    desc: '提交表单的时候验证输入值是否满足email的格式',
    code: '<input type="email" name="email"/>'
  },
  {
    name: 'date',
    icon: '📅',
    desc: '选择日期',
    code: '<input type="date" name="date"/>'
  },
  {
    name: 'datetime-local',
    icon: '🕒',
    desc: '选择日期和时间',
    code: '<input type="datetime-local" name="datetime"/>'
  },
  {
    name: 'time',
    icon: '⏰',
    desc: '选择时间',
    code: '<input type="time" name="time"/>'
  },
  {
    name: 'number',
    icon: '🔢',
    desc: '输入数字',
    code: '<input type="number" name="number"/>'
  },
  {
    name: 'range',
    icon: '📏',
    desc: '选择范围',
    code: '<input type="range" name="range" min="0" max="100"/>'
  },
  {
    name: 'color',
    icon: '🎨',
    desc: '选择颜色',
    code: '<input type="color" name="color"/>'
  },
  {
    name: 'search',
    icon: '🔍',
    desc: '搜索框',
    code: '<input type="search" name="search"/>'
  },
  {
    name: 'url',
    icon: '🌐',
    desc: '输入URL',
    code: '<input type="url" name="url"/>'
  },
  {
    name: 'tel',
    icon: '📞',
    desc: '输入电话号码',
    code: '<input type="tel" name="tel"/>'
  },
]);

const attributes = ref([
  {
    name: 'placeholder',
    elements: 'input, textarea',
    desc: '输入框占位提示',
    example: 'placeholder="请输入姓名"'
  },
  {
    name: 'required',
    elements: 'input, select, textarea',
    desc: '必填字段验证',
    example: 'required'
  },
  {
    name: 'autocomplete',
    elements: 'input',
    desc: '自动完成输入',
    example: 'autocomplete="on"'
  },
  {
    name: 'autofocus',
    elements: 'input, textarea',
    desc: '页面加载时自动聚焦',
    example: 'autofocus'
  },
  {
    name: 'form',
    elements: 'input, button, select, textarea',
    desc: '指定表单',
    example: 'form="formId"'
  },
  {
    name: 'novalidate',
    elements: 'form',
    desc: '禁用表单验证',
    example: 'novalidate'
  },
  {
    name: 'pattern',
    elements: 'input',
    desc: '输入模式验证',
    example: 'pattern="[A-Za-z]+"'
  },
  {
    name: 'min',
    elements: 'input[type="number"], input[type="date"], input[type="datetime-local"], input[type="month"], input[type="week"], input[type="time"]',
    desc: '最小值',
    example: 'min="1"'
  },
  {
    name: 'max',
    elements: 'input[type="number"], input[type="date"], input[type="datetime-local"], input[type="month"], input[type="week"], input[type="time"]',
    desc: '最大值',
    example: 'max="10"'
  },
  {
    name: 'step',
    elements: 'input[type="number"], input[type="range"]',
    desc: '步长',
    example: 'step="0.1"'
  }
]);

const form = ref({
  email: '',
  startDate: '',
  endDate: '',
  volume: 50
});



const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
</script>

<style scoped lang="less">
.h5-form-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.guide-nav {
  background: linear-gradient(135deg, #2c3e50, #e67e22);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0 0 1.5rem;
    font-size: 2rem;
    text-align: center;
  }

  .nav-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.2s;
    background: rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }
}

.content-section {
  margin-bottom: 3rem;
  scroll-margin-top: 1rem;

  h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    border-left: 4px solid #e67e22;
    padding-left: 1rem;
    margin: 2rem 0;
  }
}

.element-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.element-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .element-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    code {
      font-size: 1.1rem;
    }

    .element-icon {
      font-size: 1.5rem;
    }
  }

  .element-demo {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;

    input,
    datalist,
    output {
      margin: 0.5rem 0;
    }
  }
}

.attribute-table {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1rem;
      border: 1px solid #eee;
      text-align: left;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
    }

    code {
      background: #f3f3f3;
      padding: 2px 4px;
      border-radius: 3px;
    }
  }
}

.vue-form {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .form-group {
    margin: 1rem 0;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;

    label {
      display: block;
      margin-bottom: 0.5rem;
    }

    input {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 100%;
      max-width: 300px;
    }

    input[type="range"] {
      padding: 0;
    }
  }

  button {
    background: #e67e22;
    color: white;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #d35400;
    }
  }
}

@media (max-width: 768px) {
  .h5-form-guide {
    padding: 1rem;
  }
}
</style>
