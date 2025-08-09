<template>
  <!-- 知识点展示区域 -->
  <div class="knowledge-container">
    <Spin :spinning="loading">
      <div
        v-for="(category, catIndex) in filteredKnowledge"
        :key="catIndex"
        :id="category.id"
        class="category-section"
      >
        <div class="category-header">
          <h2 class="category-title">{{ category.name }}</h2>
          <div class="item-count">{{ category.items.length }} 项</div>
        </div>
        <div class="knowledge-grid">
          <div
            v-for="(item, index) in category.items"
            :key="index"
            :id="item.id"
            class="knowledge-card"
            :style="{ 'border-left': `4px solid ${getVersionColor(item.version || 'ES6')}` }"
          >
            <div class="card-header">
              <h3>
                <a v-if="item.route && showJump" @click="goToByRouteName(item.route)">{{
                  item.name
                }}</a>
                <span v-else>{{ item.name }}</span>
              </h3>
              <div class="proposal-status" v-if="item.proposal">提案中</div>
              <div class="meta">
                <span
                  class="version"
                  v-if="item.version"
                  :style="{ backgroundColor: getVersionColor(item.version) }"
                >
                  {{ item.version }}
                </span>
                <div class="stars" v-if="item.importance">
                  <span v-for="n in 5" :key="n" :class="{ filled: n <= item.importance }">★</span>
                </div>
              </div>
            </div>
            <p class="description">{{ item.description }}</p>
            <div class="tags">
              <span v-for="(tag, tagIndex) in item.tags" :key="tagIndex" class="tag">{{
                tag
              }}</span>
            </div>
            <div v-if="item.example" class="example">
              <pre>{{ item.example }}</pre>
            </div>
            <template v-if="item.browserSupport && item.browserSupport.length > 0">
              <div>浏览器支持情况(以上版本)</div>
              <div class="browser-support-container">
                <span v-for="(i, index) in item.browserSupport" :key="index" class="browser-support"
                  ><component :is="getBrowserSupportIcon(i.b)"></component
                  ><span v-if="i.ns">不支持</span
                  ><span v-else
                    ><span v-if="i.e">实验性</span><span v-else>{{ i.v }}</span></span
                  ></span
                >
              </div>
            </template>
          </div>
        </div>
      </div>
    </Spin>
  </div>
</template>

<script setup lang="ts">
import { Spin } from 'ant-design-vue'
import { ref, computed } from 'vue'
import { getBrowserSupportIcon } from './Brower'

const loading = ref(false)
// 获取版本颜色
const getVersionColor = (version: string) => {
  const colors: Record<string, string> = {
    CSS3: '#2196f3',
    ES5: '#4caf50',
    ES6: '#2196f3',
    ES2016: '#ff9800',
    ES2017: '#e91e63',
    ES2018: '#9c27b0',
    ES2019: '#3f51b5',
    ES2020: '#00bcd4',
    ES2021: '#ff5722',
    ES2022: '#8bc34a',
    ES2023: '#607d8b',
    ES2024: '#607d8b',
  }

  return colors[version] || '#9e9e9e'
}
const { showJump, knowledgeData, selectedVersions, selectedTypes, browserVersion, searchTerm } =
  defineProps<{
    showJump?: boolean
    knowledgeData: KnowledgeCategory[]
    selectedVersions: string
    selectedTypes: string
    browserVersion?: { b: string; v: number }
    searchTerm: string
    showBrowserSupport?: boolean
  }>()

interface BrowserSupport {
  b: string //浏览器类型
  v: number //浏览器版本
  e?: boolean //实验性
  ns?: boolean //不支持
}

// 知识点类型定义
interface KnowledgeItem {
  name: string
  description: string
  id?: string
  importance: number // 1-5星
  tags: string[]
  version: string
  example?: string
  route?: string
  proposal?: boolean
  browserSupport?: BrowserSupport[]
}

export interface KnowledgeCategory {
  name: string
  id?: string
  items: KnowledgeItem[]
}

// 过滤知识点
const filteredKnowledge = computed(() => {
  return knowledgeData
    .map((category) => {
      const filteredItems = category.items.filter((item: KnowledgeItem) => {
        // 版本过滤
        const versionMatch = selectedVersions === '' || selectedVersions === item.version

        // 搜索过滤
        const searchMatch =
          !searchTerm ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        // 类型过滤
        const typeMatch = selectedTypes === '' || selectedTypes === category.name

        // 浏览器支持过滤
        const browserMatch =
          !browserVersion ||
          browserVersion?.b === '' ||
          item.browserSupport?.some((i) => {
            return i.b === browserVersion?.b && i.v >= browserVersion?.v
          })

        return versionMatch && searchMatch && typeMatch && browserMatch
      })
      return { ...category, items: filteredItems }
    })
    .filter((category) => category.items.length > 0)
})

const emit = defineEmits(['goToByRouteName'])

const goToByRouteName = (route: string) => {
  emit('goToByRouteName', route)
}
</script>

<style scoped lang="less">
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;
@success-color: #06d6a0;
@warning-color: #ffd166;
@error-color: #ef476f;
@info-color: #118ab2;
.knowledge-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.category-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid fade(@primary-color, 20%);

    .category-title {
      color: @secondary-color;
      font-size: 1.5rem;
    }

    .item-count {
      background: fade(@primary-color, 10%);
      color: @primary-color;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
}

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  .browser-support-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    font-size: 0.85rem;
    color: #666;
    margin-top: 10px;
    .browser-support {
      padding: 0 2px;
      display: block;
    }
  }
}

.knowledge-card {
  background: @light-bg;
  border-radius: 8px;
  padding: 18px;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
    background: white;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;

    .proposal-status {
      background: @warning-color;
      color: white;
      padding: 4px 8px;
      border-radius: 10px;
      font-size: 0.75rem;
      transform: rotate(5deg);
    }

    h3 {
      font-size: 1.2rem;
      color: @secondary-color;
      flex: 1;
      line-height: 1.3;
    }

    .meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;

      .version {
        color: white;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .stars {
        color: #ddd;
        font-size: 0.85rem;

        .filled {
          color: @warning-color;
        }
      }
    }
  }

  .description {
    color: lighten(@text-color, 15%);
    font-size: 0.9rem;
    margin-bottom: 15px;
    flex: 1;
    line-height: 1.5;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;

    .tag {
      background: fade(@primary-color, 10%);
      color: @primary-color;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
    }
  }

  .example {
    background: darken(@light-bg, 2%);
    border-radius: 6px;
    padding: 10px;
    margin-top: 8px;
    font-size: 0.85rem;
    font-family: 'Courier New', monospace;
    overflow-x: auto;

    pre {
      white-space: pre-wrap;
      color: #333;
      line-height: 1.4;
    }
  }
}
@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;

    .search-box {
      max-width: 100%;
    }
  }

  .knowledge-grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 2rem;
  }

  .category-title {
    font-size: 1.3rem;
  }
}
@media (max-width: 480px) {
  .version-filter {
    justify-content: flex-start;
  }

  .header {
    padding: 10px 0;

    h1 {
      font-size: 1.8rem;
    }

    .version-tag {
      font-size: 0.9rem;
    }
  }

  .category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
