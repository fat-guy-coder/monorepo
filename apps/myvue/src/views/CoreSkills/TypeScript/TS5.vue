<template>
  <div class="ts5-container">
    <div class="header">
      <div class="title-group">
        <h1>TypeScript 5+ 新特性指南</h1>
        <p class="subtitle">探索现代 TypeScript 的强大功能与创新特性</p>
      </div>
      <div class="badges">
        <span class="version-badge">v5.0+</span>
        <span class="ecosystem">增强 JavaScript 生态系统</span>
      </div>
    </div>

    <div class="features-overview">
      <div class="stats-card">
        <div class="stat">
          <div class="stat-value">40%</div>
          <div class="stat-label">包大小减少</div>
        </div>
        <div class="stat">
          <div class="stat-value">2x</div>
          <div class="stat-label">速度提升</div>
        </div>
        <div class="stat">
          <div class="stat-value">25+</div>
          <div class="stat-label">新特性</div>
        </div>
      </div>

      <div class="version-timeline">
        <div
          v-for="version in versions"
          :key="version.id"
          class="version"
          :class="{ active: activeVersion === version.id }"
          @click="activeVersion = version.id"
        >
          <div class="version-name">{{ version.name }}</div>
          <div class="version-date">{{ version.date }}</div>
        </div>
      </div>
    </div>

    <div class="feature-search">
      <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="搜索特性 (装饰器, const类型...)" />
        <svg class="search-icon" viewBox="0 0 24 24">
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </div>
      <div class="filter-tags">
        <span
          v-for="tag in filterTags"
          :key="tag"
          :class="{ active: activeTag === tag }"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="features-grid">
      <div
        class="feature-card"
        v-for="feature in filteredFeatures"
        :key="feature.id"
        :class="feature.category"
      >
        <div class="feature-header">
          <div class="feature-icon">
            <div :class="feature.iconClass"></div>
          </div>
          <h2>{{ feature.title }}</h2>
          <div class="feature-meta">
            <span class="version">TS {{ feature.version }}</span>
            <span class="category">{{ feature.category }}</span>
          </div>
        </div>

        <div class="feature-content">
          <div class="section">
            <h3>作用</h3>
            <p>{{ feature.description }}</p>
          </div>

          <div class="section">
            <h3>使用方式</h3>
            <pre><code>{{ feature.usage }}</code></pre>
          </div>

          <div class="section">
            <h3>适用场景</h3>
            <ul>
              <li v-for="scene in feature.scenarios" :key="scene">{{ scene }}</li>
            </ul>
          </div>

          <div class="benefits">
            <div class="benefit">
              <span class="emoji">✅</span>
              <div>
                <h4>优势</h4>
                <ul>
                  <li v-for="pro in feature.pros" :key="pro">{{ pro }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h2>TypeScript 版本演进</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th v-for="version in versions" :key="version.id">{{ version.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="feature in features" :key="feature.id">
              <td>{{ feature.title }}</td>
              <td v-for="version in versions" :key="version.id">
                <span v-if="feature.version === version.name" class="supported">✓</span>
                <span
                  v-else-if="isNewerVersion(feature.version, version.name)"
                  class="not-supported"
                  >-</span
                >
                <span v-else class="na">N/A</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="adoption-tips">
      <h2>升级到 TypeScript 5+ 的实用建议</h2>
      <div class="tips">
        <div class="tip">
          <div class="tip-icon">1</div>
          <h3>逐步升级</h3>
          <p>从当前版本逐步升级到最新版，每次升级一个主版本，解决兼容性问题</p>
        </div>
        <div class="tip">
          <div class="tip-icon">2</div>
          <h3>利用装饰器</h3>
          <p>重构旧装饰器代码，使用新的标准装饰器语法</p>
        </div>
        <div class="tip">
          <div class="tip-icon">3</div>
          <h3>优化构建</h3>
          <p>配置ESM模块支持，利用新模块解析策略优化构建</p>
        </div>
        <div class="tip">
          <div class="tip-icon">4</div>
          <h3>类型检查</h3>
          <p>启用严格模式，充分利用新的类型检查功能</p>
        </div>
      </div>
    </div>

    <div class="resources-section">
      <h2>学习资源</h2>
      <div class="resources">
        <a href="#" class="resource">
          <div class="resource-icon">📚</div>
          <h3>官方文档</h3>
          <p>TypeScript 5+ 官方文档和迁移指南</p>
        </a>
        <a href="#" class="resource">
          <div class="resource-icon">🎥</div>
          <h3>视频教程</h3>
          <p>TypeScript 5 新特性介绍视频教程</p>
        </a>
        <a href="#" class="resource">
          <div class="resource-icon">💻</div>
          <h3>示例项目</h3>
          <p>展示 TypeScript 5+ 特性的示例代码库</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const versions = [
  { id: '5.0', name: '5.0', date: '2023年3月' },
  { id: '5.1', name: '5.1', date: '2023年6月' },
  { id: '5.2', name: '5.2', date: '2023年8月' },
  { id: '5.3', name: '5.3', date: '2023年10月' },
  { id: '5.4', name: '5.4', date: '2024年3月' },
]

const activeVersion = ref('5.0')

interface Feature {
  id: string
  title: string
  version: string
  category: string
  iconClass: string
  description: string
  usage: string
  scenarios: string[]
  pros: string[]
}

const features = ref<Feature[]>([])

const filterTags = ['全部', '语言特性', '类型系统', '工具链', '性能', '模块系统']
const activeTag = ref('全部')
const searchQuery = ref('')

const filteredFeatures = computed(() => {
  let result = features.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (feature) =>
        feature.title.toLowerCase().includes(query) ||
        feature.description.toLowerCase().includes(query) ||
        feature.scenarios.some((scene) => scene.toLowerCase().includes(query)),
    )
  }

  result = result.filter((feature) => feature.version === activeVersion.value)

  if (activeTag.value !== '全部') {
    result = result.filter((feature) => feature.category === activeTag.value)
  }

  return result
})

function toggleTag(tag: string) {
  activeTag.value = activeTag.value === tag ? '全部' : tag
}

function isNewerVersion(featureVersion: string, currentVersion: string): boolean {
  const featureParts = featureVersion.split('.').map(Number)
  const currentParts = currentVersion.split('.').map(Number)

  if (featureParts[0] > currentParts[0]) return true
  if (featureParts[0] === currentParts[0] && featureParts[1] > currentParts[1]) return true
  return false
}

onMounted(async () => {
  const res = await import('./JSON/TS5+.json')
  features.value = res.default
})
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #7209b7;
@success-color: #4cc9f0;
@feature-type: #f72585;
@feature-system: #2ec4b6;
@feature-toolchain: #ff9e00;
@feature-performance: #9d4edd;
@light-bg: #f8f9fa;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.ts5-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: @text-dark;
  background-color: white;
  line-height: 1.6;
}

.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  .title-group {
    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      color: @primary-color;
      margin: 0 0 0.3rem;
    }

    .subtitle {
      font-size: 1.15rem;
      color: @text-light;
      max-width: 600px;
      margin: 0;
    }
  }

  .badges {
    display: flex;
    gap: 0.8rem;

    .version-badge {
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      border-radius: 20px;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .ecosystem {
      padding: 0.5rem 1rem;
      background-color: fade(@accent-color, 10%);
      color: @accent-color;
      border-radius: 20px;
      font-weight: 500;
    }
  }
}

.features-overview {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-bottom: 2rem;

  .stats-card {
    display: flex;
    justify-content: space-around;
    background: linear-gradient(135deg, #f8f9ff, #eef0ff);
    border-radius: 12px;
    padding: 1.5rem;

    .stat {
      text-align: center;

      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: @primary-color;
        margin-bottom: 0.3rem;
      }

      .stat-label {
        font-size: 0.95rem;
        color: @text-light;
      }
    }
  }

  .version-timeline {
    display: flex;
    background: white;
    border-radius: 12px;
    box-shadow: @card-shadow;
    overflow: hidden;

    .version {
      flex: 1;
      text-align: center;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border-right: 1px solid @border-color;

      &:last-child {
        border-right: none;
      }

      &.active {
        background-color: @primary-color;
        color: white;

        .version-name,
        .version-date {
          color: white;
        }
      }

      .version-name {
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 0.3rem;
        color: @primary-color;
      }

      .version-date {
        font-size: 0.85rem;
        color: @text-light;
      }
    }
  }
}

.feature-search {
  margin-bottom: 2rem;

  .search-box {
    position: relative;
    max-width: 600px;
    margin: 0 auto 1.5rem;

    input {
      width: 100%;
      padding: 0.8rem 1rem 0.8rem 3rem;
      border: 1px solid @border-color;
      border-radius: 50px;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: @primary-color;
        box-shadow: 0 0 0 3px fade(@primary-color, 20%);
      }
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      fill: @text-light;
    }
  }

  .filter-tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    span {
      padding: 0.4rem 1rem;
      background-color: @light-bg;
      border-radius: 20px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: darken(@light-bg, 3%);
      }

      &.active {
        background-color: @primary-color;
        color: white;
        font-weight: 500;
      }
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: @card-shadow;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  background: white;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }

  &.语言特性 {
    border-top: 4px solid @feature-type;

    .feature-meta .category {
      background-color: fade(@feature-type, 15%);
      color: @feature-type;
    }
  }

  &.类型系统 {
    border-top: 4px solid @feature-system;

    .feature-meta .category {
      background-color: fade(@feature-system, 15%);
      color: @feature-system;
    }
  }

  &.工具链 {
    border-top: 4px solid @feature-toolchain;

    .feature-meta .category {
      background-color: fade(@feature-toolchain, 15%);
      color: @feature-toolchain;
    }
  }

  &.性能 {
    border-top: 4px solid @feature-performance;

    .feature-meta .category {
      background-color: fade(@feature-performance, 15%);
      color: @feature-performance;
    }
  }
}

.feature-header {
  padding: 1.5rem;
  background-color: fade(@light-bg, 50%);
  border-bottom: 1px solid @border-color;

  .feature-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 1rem;
    background-color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    .decorator-icon,
    .const-icon,
    .enum-icon,
    .module-icon,
    .jsdoc-icon,
    .export-icon,
    .speed-icon,
    .resolution-icon {
      width: 30px;
      height: 30px;
      background-color: @primary-color;
      mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
    }

    .decorator-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12,8L10,12.5L14,12.5L12,8M12,3L2,21H22L12,3M12.75,16.5H11.25L11,15.5H13L12.75,16.5Z'/%3E%3C/svg%3E");
    }

    .const-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3,3H21V7H3V3M4,8H20V21H4V8M9,12V18H11V12H9M13,12V18H15V12H13Z'/%3E%3C/svg%3E");
    }

    .enum-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M21,8H3V4H21V8M21,10H3V14H21V10M21,16H3V20H21V16M4.5,12A1.5,1.5 0 0,0 6,13.5A1.5,1.5 0 0,0 7.5,12A1.5,1.5 0 0,0 6,10.5A1.5,1.5 0 0,0 4.5,12Z'/%3E%3C/svg%3E");
    }

    .module-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M10,4V20L20,12L10,4Z'/%3E%3C/svg%3E");
    }

    .jsdoc-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z'/%3E%3C/svg%3E");
    }

    .export-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M23,12L19,8V11H10V13H19V16L23,12M5,18V16H1V8H5V6L9,10L5,14Z'/%3E%3C/svg%3E");
    }

    .speed-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,3.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z'/%3E%3C/svg%3E");
    }

    .resolution-icon {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M21,11H13V3H21M21,21H13V13H21M11,21H3V13H11M11,3H3V11H11V3Z'/%3E%3C/svg%3E");
    }
  }

  h2 {
    font-size: 1.4rem;
    margin: 0 0 0.8rem;
    color: @text-dark;
  }

  .feature-meta {
    display: flex;
    gap: 0.8rem;

    span {
      padding: 0.2rem 0.8rem;
      border-radius: 4px;
      font-size: 0.85rem;
    }

    .version {
      background-color: fade(@primary-color, 15%);
      color: @primary-color;
    }

    .category {
      background-color: @light-bg;
      color: @text-light;
    }
  }
}

.feature-content {
  padding: 1.5rem;
  flex-grow: 1;

  .section {
    margin-bottom: 1.5rem;

    h3 {
      font-size: 1.1rem;
      margin: 0 0 0.8rem;
      color: @primary-color;
      display: flex;
      align-items: center;

      &::after {
        content: '';
        flex-grow: 1;
        height: 1px;
        background: @border-color;
        margin-left: 0.75rem;
      }
    }

    p,
    ul {
      margin: 0;
      font-size: 0.95rem;
    }

    ul {
      padding-left: 1.25rem;

      li {
        margin-bottom: 0.4rem;
        position: relative;
        padding-left: 1rem;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: @primary-color;
        }
      }
    }

    pre {
      background-color: #2d2d2d;
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;
      margin: 0.5rem 0 0;

      code {
        color: #f8f8f2;
        font-family: 'Fira Code', 'Courier New', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  }

  .benefits {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px dashed @border-color;

    .benefit {
      display: flex;
      gap: 0.8rem;

      .emoji {
        font-size: 1.5rem;
        line-height: 1.2;
      }

      h4 {
        margin: 0 0 0.5rem;
        color: @text-dark;
      }

      ul {
        margin: 0;
        padding-left: 0;

        li {
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
          padding-left: 0;

          &::before {
            content: none;
          }
        }
      }
    }
  }
}

.comparison-section {
  margin: 3rem 0;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-bottom: 1.8rem;
  }

  .comparison-table {
    overflow-x: auto;
    border-radius: 10px;
    box-shadow: @card-shadow;

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 800px;

      th,
      td {
        padding: 1rem;
        text-align: center;
        border-bottom: 1px solid @border-color;
      }

      thead {
        background: linear-gradient(to bottom, #f1f3f9, #e2e7f5);

        th {
          font-weight: 600;
          color: @primary-color;

          &:first-child {
            text-align: left;
          }
        }
      }

      tbody {
        tr {
          &:nth-child(even) {
            background-color: @light-bg;
          }

          &:hover {
            background-color: darken(@light-bg, 2%);
          }

          td {
            &:first-child {
              text-align: left;
              font-weight: 500;
            }

            .supported {
              color: @success-color;
              font-weight: bold;
              font-size: 1.2rem;
            }

            .not-supported {
              color: @text-light;
            }

            .na {
              color: #e0e0e0;
            }
          }
        }
      }
    }
  }
}

.adoption-tips {
  background: linear-gradient(135deg, #f8f9ff, #eef0ff);
  border-radius: 12px;
  padding: 2.5rem;
  margin: 2rem 0;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 2rem;
  }

  .tips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .tip {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: @card-shadow;

      .tip-icon {
        width: 36px;
        height: 36px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 0.8rem;
        color: @text-dark;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: @text-light;
      }
    }
  }
}

.resources-section {
  margin: 3rem 0;

  h2 {
    text-align: center;
    color: @primary-color;
    margin-bottom: 1.8rem;
  }

  .resources {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .resource {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: @card-shadow;
      text-decoration: none;
      color: inherit;
      transition: transform 0.3s ease;
      display: block;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
      }

      .resource-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 0.5rem;
        color: @primary-color;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: @text-light;
      }
    }
  }
}

@media (max-width: 768px) {
  .ts5-container {
    padding: 1.5rem 1rem;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    h1 {
      font-size: 2rem;
    }

    .badges {
      align-self: stretch;
      flex-wrap: wrap;
    }
  }

  .features-overview {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-content {
    padding: 1.2rem;
  }

  .version-timeline {
    .version {
      padding: 0.8rem 0.5rem;

      .version-name {
        font-size: 1rem;
      }
    }
  }
}
</style>
