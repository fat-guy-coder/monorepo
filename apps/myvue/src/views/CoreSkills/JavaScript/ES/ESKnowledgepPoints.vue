<template>
  <div class="es-reference">
    <!-- 标题区域 -->
    <header class="header">
      <div class="title-container">
        <h1>ECMAScript 核心知识点参考</h1>
        <div class="version-tag">ES5 → ES2023</div>
      </div>
      <p class="subtitle">全面梳理ECMAScript核心特性、语法及最佳实践，按重要性和使用频率排序</p>
    </header>

    <!-- 控制区域 -->
    <div class="controls-container" :class="{ expandControlsContainer: expand }">
      <button @click="toggleExpand" class="version-btn expand-btn">
        {{ expand ? '收起' : '展开' }}
      </button>
      <div class="controls" :class="{ expandControls: !expand }">
        <div class="search-box">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="搜索知识点..."
            class="search-input"
          />
          <span class="search-icon">🔍</span>
        </div>

        <div class="browser-container">
          <div class="version-btn-title">浏览器支持:</div>
          <div
            v-for="(item, index) in browsers"
            :class="{ browserActive: browserVersion.b === item.b }"
            :key="index"
            class="browser-item"
          >
            <component :is="getBrowserSupportIcon(item.b)" class="browser-icon"></component
            >{{ item.name }}
            <div class="browser-version">
              <div
                v-for="version in item.version"
                :key="version"
                @click="toggleBrowserVersion(item.b, version)"
                class="browser-version-item"
              >
                {{ version }}
              </div>
            </div>
          </div>
        </div>

        <div class="version-filter">
          <button
            class="version-btn"
            @click="selectedAll"
            :class="{
              active: selectedVersions === '' && selectedTypes === '' && browserVersion.b === '',
            }"
          >
            全部
          </button>
          <div class="version-btn-title">版本:</div>

          <button
            v-for="version in versions"
            :key="version"
            @click="toggleVersion(version)"
            :class="{ active: selectedVersions.includes(version) }"
            class="version-btn"
          >
            {{ version }}
          </button>
        </div>
        <div class="version-filter">
          <div class="version-btn-title">类型:</div>
          <button
            v-for="type in types"
            :key="type"
            @click="toggleType(type)"
            :class="{ active: selectedTypes.includes(type) }"
            class="version-btn"
          >
            {{ type }}
          </button>
        </div>
      </div>
    </div>

    <!-- 知识点展示区域 -->
    <div class="knowledge-container">
      <Spin :spinning="loading">
        <div
          v-for="(category, catIndex) in filteredKnowledge"
          :key="catIndex"
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
              class="knowledge-card"
              :style="{ 'border-left': `4px solid ${getVersionColor(item.version)}` }"
            >
              <div class="card-header">
                <h3>{{ item.name }} <a @click="goToByRouteName(item.route)">跳转</a></h3>
                <div class="proposal-status" v-if="item.proposal">提案中</div>
                <div class="meta">
                  <span class="version" :style="{ backgroundColor: getVersionColor(item.version) }">
                    {{ item.version }}
                  </span>
                  <div class="stars">
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
            </div>
          </div>
        </div>
      </Spin>
    </div>

    <!-- 底部信息 -->
    <footer class="footer">
      <p>共 {{ totalItems }} 个知识点 | 最后更新: {{ new Date().toLocaleDateString() }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Spin } from 'ant-design-vue'
import { c, f, s, e, ie, o, ios, android, node } from '../Components/Brower'

// 知识点类型定义
interface KnowledgeItem {
  name: string
  description: string
  importance: number // 1-5星
  tags: string[]
  version: string
  example?: string
  route: string
  proposal?: boolean
  browserSupport?: BrowserSupport[]
}

interface KnowledgeCategory {
  name: string
  items: KnowledgeItem[]
}

// 知识点数据
const knowledgeData = ref<KnowledgeCategory[]>([])

const loading = ref(true)

onMounted(async () => {
  const res = await Promise.all([
    import('../JSON/ESKnowledgePoints.json'),
    import('../JSON/browsers.json'),
  ])
  knowledgeData.value = res[0].default as unknown as KnowledgeCategory[]
  browsers.value = res[1].default as unknown as Browser[]
  types.value = knowledgeData.value.map((category) => category.name)
  loading.value = false
})

const types = ref<string[]>(['全部'])

interface Browser {
  b: string
  name: string
  version: number[]
}

const browsers = ref<
  {
    b: string
    name: string
    version: number[]
  }[]
>([])

interface BrowserSupport {
  b: string
  v: number
  e?: boolean
  ns?: boolean
}

const getBrowserSupportIcon = (type: string) => {
  switch (type) {
    case 'c':
      return c
    case 'f':
      return f
    case 's':
      return s
    case 'e':
      return e
    case 'ie':
      return ie
    case 'o':
      return o
    case 'ios':
      return ios
    case 'android':
      return android
    case 'node':
      return node
    default:
      return null
  }
}

onUnmounted(async () => {
  knowledgeData.value = []
})

// 可用版本
const versions = ref<string[]>([
  'ES6',
  'ES2016',
  'ES2017',
  'ES2018',
  'ES2019',
  'ES2020',
  'ES2021',
  'ES2022',
  'ES2023',
  'ES2024',
])

const emit = defineEmits<{
  (e: 'goToByRouteName', route: string): void
}>()

const goToByRouteName = (route: string) => {
  emit('goToByRouteName', route)
}

// 选中的版本
const selectedVersions = ref<string>('')

const selectedTypes = ref<string>('')

const selectedAll = () => {
  selectedTypes.value = ''
  selectedVersions.value = ''
  browserVersion.value = { b: '', v: 0 }
  searchTerm.value = ''
}

const toggleType = (type: string) => {
  if (selectedTypes.value === type) {
    selectedTypes.value = ''
  } else {
    selectedTypes.value = type
  }
}

// 搜索词
const searchTerm = ref<string>('')

// 切换版本
const toggleVersion = (version: string) => {
  if (selectedVersions.value === version) {
    selectedVersions.value = ''
  } else {
    selectedVersions.value = version
  }
}

// 过滤知识点
const filteredKnowledge = computed(() => {
  return knowledgeData.value
    .map((category) => {
      const filteredItems = category.items.filter((item: KnowledgeItem) => {
        // 版本过滤
        const versionMatch =
          selectedVersions.value === '' || selectedVersions.value === item.version

        // 搜索过滤
        const searchMatch =
          !searchTerm.value ||
          item.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          item.tags.some((tag: string) =>
            tag.toLowerCase().includes(searchTerm.value.toLowerCase()),
          )
        // 类型过滤
        const typeMatch = selectedTypes.value === '' || selectedTypes.value === category.name

        // 浏览器支持过滤
        const browserMatch =
          browserVersion.value.b === '' ||
          item.browserSupport?.some((i) => {
            return i.b === browserVersion.value.b && i.v >= browserVersion.value.v
          })

        return versionMatch && searchMatch && typeMatch && browserMatch
      })
      return { ...category, items: filteredItems }
    })
    .filter((category) => category.items.length > 0)
})

const browserVersion = ref({ b: '', v: 0 })

const toggleBrowserVersion = (b: string, v: number) => {
  if (browserVersion.value.b === b && browserVersion.value.v === v) {
    browserVersion.value = { b: '', v: 0 }
  } else {
    browserVersion.value = { b, v }
  }
}

// 计算总知识点数量
const totalItems = computed(() => {
  return filteredKnowledge.value.reduce((total, category) => total + category.items.length, 0)
})

// 获取版本颜色
const getVersionColor = (version: string) => {
  const colors: Record<string, string> = {
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

const expand = ref(true)

const toggleExpand = () => {
  expand.value = !expand.value
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

.es-reference {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: @light-bg;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.5;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 10px 0;

  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 2.5rem;
    color: @secondary-color;
  }

  .version-tag {
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 600;
  }

  .subtitle {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
    max-width: 700px;
    margin: 0 auto;
  }
}

.browser-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  gap: 10px;

  .browser-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
    cursor: pointer;
    color: #666;
    transition: all 0.5s;

    .browser-icon {
      width: 50px;
      height: 50px;
    }
    &:hover {
      .browser-version {
        transform: scale(1, 1);
      }
    }

    .browser-version {
      transform: scale(0);
      overflow: hidden;
      transition: transform 0.2s ease-in-out;
      transform-origin: top;
      position: absolute;
      width: 100px;
      top: 0;
      left: 50px;
      z-index: 100;
      cursor: pointer;
      display: grid;
      grid-template-columns: 1fr;
      gap: 5px;
      .browser-version-item {
        padding: 2px 5px;
        border-radius: 5px;
        background: #f0f0f0;
        font-size: 0.85rem;
        color: #666;
        &:hover {
          background: #e0e0e0;
          transform: scale(1.2) translate(5px, -5px);
        }
      }
    }
  }
}

.browserActive {
  background: @primary-color;
  color: white !important;
  border-radius: 10px;
  opacity: 0.8;
}

.controls {
  margin-bottom: 30px;
  justify-content: center;
  background: white;
  padding: 20px;
  border-radius: 12px;
  will-change: opacity, height, width;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  z-index: 100;
  height: 330px;
  width: 100%;
  opacity: 1;
  transform-origin: top right;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  transition:
    height 0.2s,
    width 0.2s,
    opacity 0.2s;

  .search-box {
    position: relative;
    flex: 1;
    max-width: 500px;
    margin: 0 auto;
    margin-bottom: 1rem;

    .search-input {
      width: 100%;
      padding: 12px 15px 12px 40px;
      border: 1px solid @border-color;
      border-radius: 30px;
      font-size: 1rem;
      transition: all 0.3s;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

      &:focus {
        outline: none;
        border-color: @primary-color;
        box-shadow: 0 2px 8px rgba(67, 97, 238, 0.2);
      }
    }

    .search-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #777;
    }
  }

  .version-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin: 10px 0;

    .version-btn-title {
      font-size: 0.9rem;
      color: #777;
      margin-right: 8px;
      line-height: 50px;
    }
  }
}

.controls-container {
  display: flex;
  flex-direction: row-reverse;
  position: sticky;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  height: 0px;
  width: 100%;
  opacity: 1;
  .expand-btn {
    position: absolute;
    top: 0px;
    right: 0;
    z-index: 200;
  }
}

.expandControlsContainer {
  height: 330px;
  width: 100%;
}

.expandControls {
  width: 63px;
  height: 38px;
  overflow: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.version-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid @border-color;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: @primary-color;
    color: white;
    border-color: @primary-color;
    font-weight: 500;
  }
}

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

.footer {
  text-align: center;
  padding: 30px 20px 20px;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  margin-top: 20px;
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
