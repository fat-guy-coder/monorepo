<template>
  <div class="js-libraries">
    <div class="header">
      <h1>JavaScript 常用库分类指南</h1>
      <p>前端开发必备工具库精选 | 按使用频率排序</p>
    </div>

    <div class="search-area">
      <input v-model="searchQuery" placeholder="搜索库名称" class="search-input">
      <div class="filter-tags">
        <span v-for="(tag, index) in categoryIcons" :key="tag" :class="{ active: activeTag === tag }"
          @click="toggleTag(index)">
          {{ index }}
        </span>
      </div>
    </div>

    <div class="libraries-container">
      <div v-for="category in filteredCategories" :key="category.name" class="category-section">
        <div class="category-header">
          <div class="category-icon">
            {{ categoryIcons[category.name] }}
          </div>
          <h2>{{ category.name }}</h2>
          <div class="category-count">{{ category.libraries.length }}个库</div>
        </div>

        <div class="libraries-grid">
          <div v-for="lib in category.libraries" :key="lib.name" class="library-card"
            :style="{ '--popularity': lib.popularity }">
            <div class="library-header">
              <div class="name">{{ lib.name }}</div>
              <div class="popularity">
                <span v-for="star in 5" :key="star" class="star">
                  {{ star <= lib.popularity ? '★' : '☆' }} </span>
              </div>
            </div>
            <div class="description">{{ lib.description }}</div>
            <div class="stats">
              <span class="stat">
                ⬇️ {{ lib.downloads }}万+/周
              </span>
              <span class="stat">
                ⭐ {{ lib.stars }}k+
              </span>
            </div>
            <div class="tags">
              <span v-for="tag in lib.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>JavaScript生态系统拥有超过200万个npm包，本指南仅展示最常用、最核心的工具库</p>
      <p>持续更新 | 数据来源: npm trends, GitHub stars, State of JS 2023</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';


// 图标组件（实际项目中应使用真实图标组件）

const categoryIcons: Record<string, any> = {
  '全部': '🔍',
  '前端框架': '🚀',
  '状态管理': '📦',
  'UI组件库': '🎨',
  '实用工具': '🛠️',
  'HTTP客户端': '🌐',
  '表单处理': '📝',
  '动画库': '🎬',
  '日期处理': '📅',
  '测试工具': '🧪',
  '数据可视化': '📊'
};


const activeTag = ref('全部');
const searchQuery = ref('');

const toggleTag = (tag: string) => {
  activeTag.value = tag;
  searchQuery.value = '';
};


onMounted(async () => {
  const { default: data } = await import('./JSON/JSLibrary.json');
  librariesData.value = data as Library[];
});

interface Library {
  name: string;
  description: string;
  libraries: Library[];
  popularity: number;
  downloads: number;
  stars: number;
  tags: string[];
  url: string;
}

const librariesData = ref<Library[]>([]);

const filteredCategories = computed(() => {
  return librariesData.value
    .filter(category => {
      if (searchQuery.value) return category.libraries.some(lib => lib.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
      if (activeTag.value != '全部') return category.name === activeTag.value;
      else return true;
    });
});
</script>

<style lang="less" scoped>
.js-libraries {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3748;
  background-color: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e2e8f0;

    h1 {
      font-size: 2.4rem;
      color: #2b6cb0;
      margin-bottom: 0.8rem;
      font-weight: 700;
    }

    p {
      font-size: 1.1rem;
      color: #718096;
      margin-bottom: 0;
    }
  }

  .search-area {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

    .search-input {
      width: 100%;
      padding: 0.8rem 1.2rem;
      font-size: 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      transition: all 0.3s ease;
      margin-bottom: 1.5rem;

      &:focus {
        outline: none;
        border-color: #4299e1;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
      }
    }

    .filter-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;

      span {
        padding: 0.5rem 1rem;
        background: #edf2f7;
        border-radius: 20px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: #cbd5e0;
        }

        &.active {
          background: #4299e1;
          color: white;
          font-weight: 600;
        }
      }
    }
  }

  .libraries-container {
    .category-section {
      margin-bottom: 2.5rem;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);

      .category-header {
        display: flex;
        align-items: center;
        padding: 1.2rem 1.8rem;
        background: linear-gradient(135deg, #ebf4ff 0%, #c3dafe 100%);
        border-bottom: 1px solid #e2e8f0;

        .category-icon {
          font-size: 1.8rem;
          margin-right: 1rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 50%;
        }

        h2 {
          font-size: 1.5rem;
          margin: 0;
          color: #2b6cb0;
          flex-grow: 1;
        }

        .category-count {
          background: #4299e1;
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }
      }
    }

    .libraries-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      padding: 1.8rem;
    }
  }

  .library-card {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
    border-left: 4px solid #4299e1;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #4299e1, #63b3ed);
      opacity: calc(var(--popularity) * 0.15);
    }

    .library-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.8rem;

      .name {
        font-size: 1.3rem;
        font-weight: 700;
        color: #2b6cb0;
      }

      .popularity {
        .star {
          color: #ecc94b;
          font-size: 1.1rem;
          margin-left: 0.1rem;
        }
      }
    }

    .description {
      font-size: 0.95rem;
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 1.2rem;
      min-height: 4rem;
    }

    .stats {
      display: flex;
      gap: 1rem;
      font-size: 0.85rem;
      color: #718096;
      margin-bottom: 1rem;

      .stat {
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tag {
        background: #ebf8ff;
        color: #2b6cb0;
        padding: 0.3rem 0.7rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
    color: #718096;
    font-size: 0.9rem;
    line-height: 1.6;

    p {
      margin-bottom: 0.5rem;
    }
  }
}

@media (max-width: 768px) {
  .js-libraries {
    padding: 1rem;

    .header h1 {
      font-size: 1.8rem;
    }

    .libraries-grid {
      grid-template-columns: 1fr !important;
    }

    .category-header {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 0.5rem;

      .category-count {
        align-self: flex-end;
      }
    }
  }
}
</style>
