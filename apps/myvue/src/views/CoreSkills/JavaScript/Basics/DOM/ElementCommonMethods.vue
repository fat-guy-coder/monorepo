<template>
  <div class="dom-reference">
    <div class="header">
      <div class="title-container">
        <h1 class="title">DOM 元素方法与属性参考手册</h1>
        <p class="subtitle">Web 开发必备的 DOM 操作指南</p>
      </div>
      <div class="search-container">
        <input type="text" placeholder="搜索 DOM API..." v-model="searchTerm" class="search-input">
        <div class="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- 分类导航 -->
      <div class="category-nav">
        <div v-for="category in categories" :key="category.id" :class="{ active: activeCategory === category.id }"
          @click="activeCategory = category.id" class="category-btn">
          {{ category.name }}
          <span class="count">{{ getCategoryCount(category.id) }}</span>
        </div>
      </div>

      <!-- API列表 -->
      <div class="api-container">
        <div v-for="api in filteredApis" :key="api.name" class="api-card">
          <div class="api-header">
            <div class="api-name-container">
              <span class="api-name">{{ api.name }}</span>
              <span class="api-type" :class="{ property: api.type === '属性', method: api.type === '方法' }">
                {{ api.type }}
              </span>
            </div>
            <div class="api-tags">
              <span v-for="tag in api.tags" :key="tag" class="api-tag">{{ tag }}</span>
            </div>
          </div>

          <div class="api-body">
            <div class="api-description">
              {{ api.description }}
            </div>

            <div class="api-details" v-if="api.details">
              <div class="detail-item" v-if="api.parameters">
                <div class="detail-title">参数:</div>
                <div class="detail-content">
                  <div v-for="(param, index) in api.parameters" :key="index" class="parameter">
                    <span class="param-name">{{ param.name }}</span>
                    <span class="param-type">{{ param.type }}</span>
                    <span class="param-desc">- {{ param.description }}</span>
                  </div>
                </div>
              </div>

              <div class="detail-item" v-if="api.return">
                <div class="detail-title">返回值:</div>
                <div class="detail-content">
                  <span class="return-type">{{ api.return.type }}</span>
                  <span class="return-desc">- {{ api.return.description }}</span>
                </div>
              </div>
            </div>

            <div class="code-sample" v-if="api.example">
              <div class="code-header">
                <span>使用示例</span>
                <button class="copy-button" @click="copyCode(api.example)">复制代码</button>
              </div>
              <pre><code>{{ api.example }}</code></pre>
            </div>

            <div class="use-cases" v-if="api.useCases">
              <div class="use-case-title">常见用途:</div>
              <ul class="use-case-list">
                <li v-for="(useCase, index) in api.useCases" :key="index">{{ useCase }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>DOM API 参考手册 © 2023 | 包含 {{ apis.length }} 个常用 DOM 方法和属性</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 搜索关键词
const searchTerm = ref('');
// 当前活跃的分类
const activeCategory = ref('all');

// 分类数据
const categories = [
  { id: 'all', name: '全部 API' },
  { id: 'properties', name: '元素属性' },
  { id: 'methods', name: '操作方法' },
  { id: 'dimensions', name: '尺寸位置' },
  { id: 'events', name: '事件相关' },
  { id: 'styles', name: '样式操作' },
  { id: 'traversal', name: '元素遍历' },
];

// API 数据
const apis = ref<any[]>([]);

// 计算过滤后的API列表
const filteredApis = computed(() => {
  return apis.value.filter(api => {
    const matchesCategory = activeCategory.value === 'all' || api.category === activeCategory.value;
    const matchesSearch = !searchTerm.value ||
      api.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      api.description.toLowerCase().includes(searchTerm.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

// 获取分类的API数量
const getCategoryCount = (categoryId: string) => {
  if (categoryId === 'all') return apis.value.length;
  return apis.value.filter(api => api.category === categoryId).length;
};

// 复制代码功能
const copyCode = (code: string) => {
  navigator.clipboard.writeText(code)
    .then(() => {
      // 这里可以添加复制成功的反馈
      console.log('代码已复制到剪贴板');
    })
    .catch(err => {
      console.error('复制失败:', err);
    });
};

// 初始化
onMounted(async () => {
  // 如果搜索参数存在，设置搜索词
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  if (searchParam) {
    searchTerm.value = searchParam;
  }
  const { default: domApi } = await import('../../JSON/DomApi.json');;
  apis.value = domApi;
});
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e2e8f0;
@text-color: #2d3748;
@code-bg: #f6f8fa;
@code-text: #2f363d;
@highlight-color: #e6f7ff;
@success-color: #10b981;
@warning-color: #f59e0b;
@error-color: #ef4444;

// 布局变量
@header-height: 180px;
@card-radius: 12px;
@transition-speed: 0.3s;

.dom-reference {
  font-family: 'Inter', sans-serif;
  background-color: @light-bg;
  color: @text-color;
  min-height: 100vh;
  padding-bottom: 40px;
}

.header {
  height: @header-height;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .title-container {
    margin-bottom: 20px;

    .title {
      font-size: 2.4rem;
      font-weight: 700;
      color: white;
      margin: 0 0 8px 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    .subtitle {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.85);
      margin: 0;
      font-weight: 400;
    }
  }

  .search-container {
    position: relative;
    max-width: 500px;

    .search-input {
      width: 100%;
      padding: 14px 48px 14px 20px;
      border: none;
      border-radius: 30px;
      font-size: 1rem;
      outline: none;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: all @transition-speed;

      &:focus {
        box-shadow: 0 6px 20px rgba(67, 97, 238, 0.25);
      }
    }

    .search-icon {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: lighten(@text-color, 40%);

      svg {
        fill: currentColor;
      }
    }
  }
}

.container {
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 0 20px;
}

.category-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;

  .category-btn {
    background: white;
    border: 1px solid @border-color;
    border-radius: 30px;
    padding: 10px 22px;
    font-size: 0.95rem;
    font-weight: 500;
    color: lighten(@text-color, 15%);
    cursor: pointer;
    transition: all @transition-speed;
    display: flex;
    align-items: center;

    &:hover {
      border-color: @primary-color;
      color: @primary-color;
      transform: translateY(-2px);
    }

    &.active {
      background: @primary-color;
      border-color: @primary-color;
      color: white;
      box-shadow: 0 4px 14px rgba(@primary-color, 0.2);
    }

    .count {
      margin-left: 8px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      padding: 2px 8px;
      font-size: 0.85rem;
    }
  }
}

.api-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.api-card {
  background: @card-bg;
  border-radius: @card-radius;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all @transition-speed;
  border-left: 3px solid @primary-color;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.api-header {
  padding: 20px 25px;
  background: rgba(@primary-color, 0.03);
  border-bottom: 1px solid @border-color;

  .api-name-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .api-name {
      font-size: 1.4rem;
      font-weight: 600;
      color: @primary-color;
      margin-right: 15px;
    }

    .api-type {
      font-size: 0.85rem;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 4px;

      &.property {
        background: rgba(@success-color, 0.15);
        color: darken(@success-color, 10%);
      }

      &.method {
        background: rgba(@warning-color, 0.15);
        color: darken(@warning-color, 10%);
      }
    }
  }

  .api-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .api-tag {
      font-size: 0.8rem;
      background: rgba(@primary-color, 0.1);
      color: @primary-color;
      padding: 4px 10px;
      border-radius: 12px;
    }
  }
}

.api-body {
  padding: 20px 25px;

  .api-description {
    font-size: 1rem;
    line-height: 1.6;
    color: darken(@text-color, 10%);
    margin-bottom: 20px;
  }

  .api-details {
    background: @light-bg;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid @border-color;

    .detail-item {
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .detail-title {
        font-weight: 600;
        margin-bottom: 6px;
        color: @secondary-color;
        font-size: 0.95rem;
      }

      .detail-content {
        font-size: 0.95rem;

        .parameter {
          margin-bottom: 8px;
          padding-left: 15px;
          position: relative;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: @primary-color;
          }

          .param-name {
            font-weight: 500;
            color: @primary-color;
            margin-right: 8px;
          }

          .param-type {
            font-family: monospace;
            background: rgba(@primary-color, 0.1);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.9rem;
            margin-right: 8px;
          }
        }

        .return-type {
          font-family: monospace;
          font-weight: 500;
          background: rgba(@success-color, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          margin-right: 8px;
        }
      }
    }
  }

  .code-sample {
    background: @code-bg;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    border: 1px solid darken(@code-bg, 5%);

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      background: darken(@code-bg, 3%);
      border-bottom: 1px solid darken(@code-bg, 8%);
      font-size: 0.9rem;
      font-weight: 500;
      color: darken(@text-color, 20%);
    }

    .copy-button {
      background: rgba(@primary-color, 0.1);
      color: @primary-color;
      border: none;
      padding: 5px 12px;
      border-radius: 4px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all @transition-speed;

      &:hover {
        background: rgba(@primary-color, 0.2);
      }
    }

    pre {
      margin: 0;
      padding: 15px;
      overflow-x: auto;

      code {
        color: @code-text;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  }

  .use-cases {
    .use-case-title {
      font-weight: 600;
      font-size: 0.95rem;
      color: @secondary-color;
      margin-bottom: 12px;
    }

    .use-case-list {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 8px;
        line-height: 1.5;
        color: lighten(@text-color, 10%);
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: -15px;
          top: 9px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: @primary-color;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 40px 0 20px;
  margin-top: 50px;
  color: lighten(@text-color, 25%);
  font-size: 0.95rem;
}

// 响应式设计
@media (max-width: 768px) {
  .header {
    height: auto;
    padding: 30px 5%;

    .title-container {
      .title {
        font-size: 1.8rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }
    }
  }

  .api-header {
    .api-name-container {
      flex-direction: column;
      align-items: flex-start;

      .api-name {
        margin-bottom: 8px;
      }
    }
  }
}

@media (max-width: 480px) {
  .category-nav {
    .category-btn {
      padding: 8px 16px;
      font-size: 0.9rem;
    }
  }

  .api-header {
    padding: 15px;
  }

  .api-body {
    padding: 15px;
  }
}
</style>
