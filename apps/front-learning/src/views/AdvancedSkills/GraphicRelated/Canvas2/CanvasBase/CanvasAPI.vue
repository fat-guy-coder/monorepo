<template>
  <div class="canvas-api-container">
    <header>
      <h1>Canvas API 参考手册</h1>
      <p>HTML5 Canvas元素的完整API参考指南</p>
      <div class="header-subtitle">
        <span class="tag">2D绘图</span>
        <span class="tag">图形渲染</span>
        <span class="tag">动画</span>
        <span class="tag">Web标准</span>
      </div>
    </header>

    <div class="search-container">
      <input
        v-model="searchQuery"
        placeholder="搜索Canvas API..."
        type="text"
        class="search-input"
      >
      <div class="filter-tags">
        <span
          v-for="category in categories"
          :key="category.id"
          :class="{ active: activeCategory === category.id }"
          @click="toggleCategory(category.id)"
        >
          {{ category.name }}
        </span>
      </div>
    </div>

    <div class="content-wrapper">
      <aside class="sidebar">
        <nav class="category-nav">
          <div
            v-for="category in categories"
            :key="category.id"
            :class="{ active: activeCategory === category.id }"
            @click="scrollToCategory(category.id)"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <span class="category-name">{{ category.name }}</span>
            <span class="api-count">{{ getApiCount(category.id) }}</span>
          </div>
        </nav>
      </aside>

      <main class="api-content">
        <section
          v-for="category in filteredCategories"
          :key="category.id"
          :id="category.id"
          class="category-section"
        >
          <h2>
            <span class="category-icon">{{ category.icon }}</span>
            {{ category.name }}
          </h2>
          <p class="category-description">{{ category.description }}</p>

          <div class="api-grid">
            <div
              v-for="api in category.apis"
              :key="api.name"
              class="api-card"
            >
              <div class="api-header">
                <h3>{{ api.name }}</h3>
                <span class="api-type">{{ api.type }}</span>
              </div>
              <div class="api-description">
                <p>{{ api.description }}</p>
              </div>
              <div class="api-syntax">
                <pre>{{ api.syntax }}</pre>
              </div>
              <div v-if="api.parameters" class="api-parameters">
                <h4>参数</h4>
                <ul>
                  <li v-for="(param, index) in api.parameters" :key="index">
                    <code>{{ param.name }}</code>: {{ param.description }}
                  </li>
                </ul>
              </div>
              <div v-if="api.returnValue" class="api-return">
                <h4>返回值</h4>
                <p>{{ api.returnValue }}</p>
              </div>
              <div v-if="api.example" class="api-example">
                <h4>示例</h4>
                <pre>{{ api.example }}</pre>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer>
      <p>Canvas API 提供了强大的2D绘图能力，是现代Web图形和动画的基础</p>
      <div class="footer-links">
        <span>HTML5</span> •
        <span>图形编程</span> •
        <span>Web开发</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface ApiParameter {
  name: string;
  description: string;
}

interface ApiDefinition {
  name: string;
  type: string;
  description: string;
  syntax: string;
  parameters?: ApiParameter[];
  returnValue?: string;
  example?: string;
}

interface ApiCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  apis: ApiDefinition[];
}

// 搜索和筛选相关
const searchQuery = ref('');
const activeCategory = ref('all');

// Canvas API分类数据
  const categories = ref<ApiCategory[]>([]);

// 计算每个分类的API数量
const getApiCount = (categoryId: string) => {
  const category = categories.value.find(c => c.id === categoryId);
  return category ? category.apis.length : 0;
};

// 过滤分类
const filteredCategories = computed(() => {
  const query = searchQuery.value.toLowerCase();

  if (activeCategory.value === 'all' && !query) {
    return categories.value;
  }

  return categories.value
    .filter(category =>
      activeCategory.value === 'all' ||
      category.id === activeCategory.value
    )
    .map(category => ({
      ...category,
      apis: category.apis.filter(api =>
        api.name.toLowerCase().includes(query) ||
        api.description.toLowerCase().includes(query) ||
        api.type.toLowerCase().includes(query)
      )
    }))
    .filter(category => category.apis.length > 0);
});

// 切换分类
const toggleCategory = (categoryId: string) => {
  activeCategory.value = activeCategory.value === categoryId ? 'all' : categoryId;
};

// 滚动到指定分类
const scrollToCategory = (categoryId: string) => {
  const element = document.getElementById(categoryId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(async() => {
  // 初始化
  const res = await import('@/views/AdvancedSkills/JSON/CanvasBasicAPI.json');
  categories.value = res.default;
});
</script>

<style scoped lang="less">

:root {
  --primary: #3498db;
  --primary-light: #e1f0fa;
  --secondary: #2ecc71;
  --accent: #e74c3c;
  --light: #f8f9fa;
  --dark: #2c3e50;
  --gray: #7f8c8d;
  --light-gray: #ecf0f1;
  --border: #bdc3c7;
  --shadow: rgba(0, 0, 0, 0.08);
}

.canvas-api-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  color: #333;
  min-height: 100vh;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 20px;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(52, 152, 219, 0.15);

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    p {
      font-size: 1.3rem;
      color: var(--gray);
      max-width: 800px;
      margin: 0 auto 20px;
      line-height: 1.6;
    }

    .header-subtitle {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;

      .tag {
        background: rgba(255, 255, 255, 0.8);
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 0.95rem;
        color: var(--primary);
        font-weight: 500;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(52, 152, 219, 0.2);
      }
    }
  }

  .search-container {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 4px 12px var(--shadow);

    .search-input {
      width: 100%;
      padding: 12px 20px;
      font-size: 1rem;
      border: 2px solid var(--border);
      border-radius: 8px;
      transition: all 0.3s;

      &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
      }
    }

    .filter-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 15px;

      span {
        padding: 6px 15px;
        background: #eef7ff;
        border-radius: 20px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s;
        border: 1px solid #d1e7ff;

        &:hover {
          background: #d1e7ff;
        }

        &.active {
          background: var(--primary);
          color: rgb(8, 0, 0);
          font-weight: 500;
          border-color: var(--primary);
        }
      }
    }
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 25px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .sidebar {
    .category-nav {
      position: sticky;
      top: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;

      > div {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s;
        background: white;
        box-shadow: 0 2px 6px var(--shadow);

        &:hover {
          background: var(--primary-light);
        }

        &.active {
          background: var(--primary);
          color: white;
          font-weight: 500;
        }

        .category-icon {
          font-size: 1.2rem;
          margin-right: 12px;
          width: 24px;
          text-align: center;
        }

        .category-name {
          flex: 1;
          font-size: 0.95rem;
        }

        .api-count {
          background: rgba(0, 0, 0, 0.1);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.8rem;
        }
      }
    }
  }

  .api-content {
    .category-section {
      margin-bottom: 40px;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 6px 18px var(--shadow);

      h2 {
        font-size: 1.6rem;
        padding: 20px 25px;
        margin: 0;
        background: linear-gradient(to right, #f8fafc, #f1f8ff);
        border-bottom: 1px solid var(--border);
        display: flex;
        align-items: center;

        .category-icon {
          margin-right: 12px;
          font-size: 1.4rem;
        }
      }

      .category-description {
        padding: 0 25px;
        margin: 15px 0;
        color: var(--gray);
        font-size: 1rem;
        line-height: 1.6;
      }

      .api-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        padding: 25px;

        @media (max-width: 600px) {
          grid-template-columns: 1fr;
        }
      }

      .api-card {
        border: 1px solid var(--border);
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.2s;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }

        .api-header {
          padding: 15px;
          background: var(--primary-light);
          border-bottom: 1px solid var(--border);

          h3 {
            margin: 0 0 5px 0;
            font-size: 1.2rem;
            color: var(--dark);
          }

          .api-type {
            display: inline-block;
            padding: 3px 8px;
            background: rgba(52, 152, 219, 0.2);
            border-radius: 4px;
            font-size: 0.8rem;
            color: var(--primary);
            font-weight: 500;
          }
        }

        .api-description {
          padding: 15px;
          border-bottom: 1px solid var(--border);

          p {
            margin: 0;
            font-size: 0.95rem;
            line-height: 1.5;
            color: var(--gray);
          }
        }

        .api-syntax {
          padding: 15px;
          border-bottom: 1px solid var(--border);

          pre {
            background: #2c3e50;
            color: #f1f2f6;
            border-radius: 8px;
            padding: 12px;
            font-size: 0.9rem;
            overflow-x: auto;
            margin: 0;
            line-height: 1.4;
          }
        }

        .api-parameters, .api-return, .api-example {
          padding: 15px;
          border-bottom: 1px solid var(--border);

          &:last-child {
            border-bottom: none;
          }

          h4 {
            margin: 0 0 10px 0;
            font-size: 1rem;
            color: var(--dark);
          }

          ul {
            padding-left: 20px;
            margin: 0;

            li {
              margin-bottom: 8px;
              font-size: 0.9rem;
              line-height: 1.5;

              code {
                background: #f1f2f6;
                padding: 2px 6px;
                border-radius: 4px;
                font-family: monospace;
                color: var(--dark);
              }
            }
          }

          p {
            margin: 0;
            font-size: 0.9rem;
            line-height: 1.5;
          }

          pre {
            background: #f8f9fa;
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 12px;
            font-size: 0.85rem;
            overflow-x: auto;
            margin: 0;
            line-height: 1.4;
          }
        }
      }
    }
  }

  footer {
    text-align: center;
    padding: 30px 20px;
    margin-top: 40px;
    color: var(--gray);
    font-size: 1rem;
    border-top: 1px solid var(--border);

    p {
      max-width: 700px;
      margin: 0 auto 15px;
      line-height: 1.6;
    }

    .footer-links {
      font-size: 0.95rem;
      color: var(--primary);

      span {
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
