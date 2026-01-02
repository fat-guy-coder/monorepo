<template>
  <div class="site-search-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>前端全站搜索实现方案</h1>
        <p class="subtitle">高效、灵活的前端搜索解决方案</p>
      </div>
      <div class="search-demo">
        <div class="search-bar">
          <input
            type="text"
            placeholder="搜索全站内容..."
            v-model="demoQuery"
            @input="performDemoSearch"
          />
          <button class="search-button">
            <svg viewBox="0 0 24 24">
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </button>
        </div>
        <div class="demo-results" v-if="demoResults.length">
          <div class="result-item" v-for="(result, index) in demoResults" :key="index">
            <div class="result-title">{{ result.title }}</div>
            <div class="result-excerpt">{{ result.excerpt }}</div>
          </div>
        </div>
      </div>
    </header>

    <div class="content">
      <section class="intro-section">
        <div class="intro-card">
          <h2>为什么需要全站搜索？</h2>
          <p>
            全站搜索是现代网站的核心功能之一，它允许用户快速找到所需内容，提升用户体验和内容可发现性。
            在前端实现全站搜索可以减轻服务器负担，提供更快的响应速度，并允许更灵活的UI定制。
          </p>
          <div class="benefits">
            <div class="benefit">
              <div class="icon">⚡</div>
              <h3>即时响应</h3>
              <p>客户端搜索无需网络请求</p>
            </div>
            <div class="benefit">
              <div class="icon">💾</div>
              <h3>离线可用</h3>
              <p>数据预加载后支持离线搜索</p>
            </div>
            <div class="benefit">
              <div class="icon">🎨</div>
              <h3>UI定制</h3>
              <p>完全控制搜索界面和结果展示</p>
            </div>
          </div>
        </div>
      </section>

      <section class="methods-section">
        <h2 class="section-title">全站搜索实现方案</h2>

        <div class="methods-tabs">
          <button
            v-for="(method, index) in methods"
            :key="index"
            :class="['tab-button', { active: activeMethod === index }]"
            @click="activeMethod = index"
          >
            {{ method.name }}
          </button>
        </div>

        <div class="method-details">
          <div v-for="(method, index) in methods" :key="index" v-show="activeMethod === index">
            <div class="method-header">
              <h3>{{ method.name }}</h3>
              <div class="method-tags">
                <span v-for="(tag, tagIndex) in method.tags" :key="tagIndex" class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="method-content">
              <div class="method-description">
                <p>{{ method.description }}</p>
              </div>

              <div class="details-grid">
                <div class="detail-card">
                  <div class="detail-icon">🔧</div>
                  <h4>实现思路</h4>
                  <p>{{ method.details.approach }}</p>
                </div>

                <div class="detail-card">
                  <div class="detail-icon">⚙️</div>
                  <h4>工作原理</h4>
                  <p>{{ method.details.principle }}</p>
                </div>

                <div class="detail-card">
                  <div class="detail-icon">🎯</div>
                  <h4>适用场景</h4>
                  <ul>
                    <li
                      v-for="(scenario, scenarioIndex) in method.details.scenarios"
                      :key="scenarioIndex"
                    >
                      {{ scenario }}
                    </li>
                  </ul>
                </div>

                <div class="detail-card">
                  <div class="icon">📊</div>
                  <h4>性能特点</h4>
                  <ul>
                    <li v-for="(perf, perfIndex) in method.details.performance" :key="perfIndex">
                      {{ perf }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="code-example">
                <h4>实现示例</h4>
                <pre><code>{{ method.codeExample }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2 class="section-title">方案比较</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="col-criteria">比较标准</div>
            <div class="col-method" v-for="(method, index) in methods" :key="index">
              {{ method.name }}
            </div>
          </div>
          <div class="table-row" v-for="(criteria, cIndex) in comparisonCriteria" :key="cIndex">
            <div class="col-criteria">{{ criteria }}</div>
            <div class="col-method" v-for="(method, mIndex) in methods" :key="mIndex">
              <div
                class="rating"
                :style="{
                  '--rating': method.comparison[criteria as keyof typeof method.comparison],
                }"
              >
                <div class="stars"></div>
                <span class="rating-text">{{
                  getRatingText(method.comparison[criteria as keyof typeof method.comparison])
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2 class="section-title">最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card" v-for="(practice, index) in bestPractices" :key="index">
            <div class="practice-number">{{ index + 1 }}</div>
            <div class="practice-content">
              <h3>{{ practice.title }}</h3>
              <p>{{ practice.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="optimization-section">
        <h2 class="section-title">性能优化策略</h2>
        <div class="optimization-steps">
          <div class="step" v-for="(step, index) in optimizationSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>前端全站搜索是提升用户体验的关键功能，选择合适的实现方案可以平衡性能与功能需求</p>
      <div class="resources">
        <h3>推荐资源：</h3>
        <ul>
          <li><a href="#">Lunr.js 官方文档</a></li>
          <li><a href="#">FlexSearch 性能指南</a></li>
          <li><a href="#">Algolia 前端集成教程</a></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeMethod = ref(0)
const demoQuery = ref('')
const demoResults = ref<any[]>([])

// 模拟搜索功能
const performDemoSearch = () => {
  if (!demoQuery.value.trim()) {
    demoResults.value = []
    return
  }

  // 模拟搜索结果
  demoResults.value = [
    {
      title: '全站搜索实现方案',
      excerpt: '前端实现全站搜索的多种方法，包括客户端搜索库和服务端搜索方案...',
    },
    {
      title: '搜索性能优化',
      excerpt: '如何优化前端搜索性能，包括索引构建、数据分页和懒加载技术...',
    },
    {
      title: '搜索算法比较',
      excerpt: '比较不同搜索算法的性能特点，包括前缀匹配、模糊搜索和全文检索...',
    },
  ]
}

const methods = ref([
  {
    name: '客户端搜索库',
    tags: ['简单', '高效', '离线'],
    description: '使用纯JavaScript搜索库在浏览器端执行搜索操作，无需服务器支持。',
    details: {
      approach: '在构建时预先生成搜索索引，将索引和内容加载到客户端，使用JavaScript库执行搜索。',
      principle: '利用倒排索引或前缀树等数据结构实现快速文本匹配，支持模糊搜索和关键词高亮。',
      scenarios: [
        '静态网站（如文档、博客）',
        '中小型数据集（<10,000条记录）',
        '需要离线搜索能力的应用',
      ],
      performance: [
        '初始加载时间较长（需加载索引）',
        '搜索速度极快（毫秒级响应）',
        '内存占用与索引大小成正比',
      ],
    },
    codeExample: `// 使用Lunr.js创建搜索索引
import lunr from 'lunr';

// 创建索引
const idx = lunr(function() {
  this.ref('id');
  this.field('title');
  this.field('content');

  // 添加文档
  documents.forEach(doc => {
    this.add(doc);
  });
});

// 执行搜索
const results = idx.search('搜索关键词');
const fullResults = results.map(result => {
  return documents.find(doc => doc.id === result.ref);
});`,
    comparison: {
      实现难度: 4,
      搜索速度: 5,
      初始加载: 2,
      扩展性: 3,
      功能丰富度: 4,
    },
  },
  {
    name: '服务端搜索API',
    tags: ['实时', '强大', '可扩展'],
    description: '通过调用后端API实现搜索功能，适用于大型或动态更新的网站。',
    details: {
      approach: '前端发送搜索请求到专用搜索API，后端使用专业搜索引擎处理请求并返回结果。',
      principle: '后端使用Elasticsearch、Algolia等专业搜索引擎，提供高级搜索功能和实时索引更新。',
      scenarios: [
        '大型电商网站或内容平台',
        '需要实时更新的搜索内容',
        '需要高级搜索功能（如分词、同义词）',
      ],
      performance: [
        '搜索速度依赖网络和后端性能',
        '初始加载时间短（只需加载UI）',
        '可处理海量数据（百万级记录）',
      ],
    },
    codeExample: `// 调用搜索API
async function search(query) {
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const results = await response.json();
    return results;
  } catch (error) {
    console.error('搜索失败:', error);
    return [];
  }
}

// 使用示例
const results = await search('前端框架');`,
    comparison: {
      实现难度: 3,
      搜索速度: 3,
      初始加载: 5,
      扩展性: 5,
      功能丰富度: 5,
    },
  },
  {
    name: '混合方案',
    tags: ['平衡', '渐进式', '灵活'],
    description: '结合客户端和服务端优势，根据场景动态选择搜索执行位置。',
    details: {
      approach: '小型搜索在客户端执行，大型或复杂搜索请求转发到服务端处理，实现性能与功能的平衡。',
      principle: '客户端处理简单查询，服务端处理复杂查询；使用Service Worker缓存常见搜索结果。',
      scenarios: ['内容丰富的动态网站', '需要平衡性能和功能的场景', '希望渐进式增强搜索体验'],
      performance: ['常见搜索即时响应', '复杂搜索依赖网络', '智能缓存减少重复请求'],
    },
    codeExample: `// 混合搜索实现
async function hybridSearch(query) {
  // 简单查询在客户端处理
  if (query.length <= 3) {
    return clientSearch(query);
  }

  // 复杂查询使用服务端
  try {
    const response = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`);
    const results = await response.json();

    // 缓存结果
    cacheResults(query, results);
    return results;
  } catch (error) {
    // 失败时使用客户端搜索
    return clientSearch(query);
  }
}`,
    comparison: {
      实现难度: 2,
      搜索速度: 4,
      初始加载: 4,
      扩展性: 4,
      功能丰富度: 4,
    },
  },
])

const comparisonCriteria = ref(['实现难度', '搜索速度', '初始加载', '扩展性', '功能丰富度'])

const bestPractices = ref([
  {
    title: '合理构建索引',
    description: '只索引必要字段，避免存储大段文本。对内容进行预处理，移除停用词和标点符号。',
  },
  {
    title: '实现搜索建议',
    description: '在用户输入时提供搜索建议，帮助用户快速找到正确关键词，减少输入错误。',
  },
  {
    title: '结果分页与懒加载',
    description: '对搜索结果进行分页处理，避免一次性加载过多数据影响性能。',
  },
  {
    title: '高亮匹配内容',
    description: '在搜索结果中高亮显示匹配的关键词，帮助用户快速定位相关内容。',
  },
  {
    title: '添加搜索过滤器',
    description: '提供分类、标签、日期等过滤器，帮助用户精确缩小搜索范围。',
  },
  {
    title: '跟踪搜索分析',
    description: '记录搜索查询和结果点击，分析用户需求以优化搜索体验。',
  },
])

const optimizationSteps = ref([
  {
    title: '数据压缩',
    description: '使用gzip压缩索引文件，减少传输数据量。对索引进行二进制编码，减少内存占用。',
  },
  {
    title: '延迟加载',
    description: '只有当用户首次使用搜索时加载索引，避免初始加载时的性能影响。',
  },
  {
    title: '增量索引',
    description: '对大型网站，只加载变化部分的索引，而不是整个索引。',
  },
  {
    title: 'Web Workers',
    description: '在Web Worker中执行搜索操作，避免阻塞主线程导致页面卡顿。',
  },
  {
    title: '缓存策略',
    description: '使用Service Worker缓存常见搜索查询的结果，减少重复请求。',
  },
  {
    title: '节流防抖',
    description: '对输入事件进行节流处理，避免频繁触发搜索请求影响性能。',
  },
])

const getRatingText = (rating: number) => {
  const texts = ['低', '中低', '中等', '良好', '优秀']
  return texts[rating - 1] || ''
}
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #4a6cf7;
@primary-light: #e6eeff;
@secondary-color: #3a56d4;
@accent-color: #ff9800;
@text-color: #2c3e50;
@light-gray: #f8f9fc;
@border-color: #e0e6ed;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #4caf50;
@warning-color: #ffc107;

// 基础样式
.site-search-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid @border-color;

  .title-wrapper {
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: @secondary-color;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.3rem;
      color: #666;
      font-weight: 300;
    }
  }
}

.search-demo {
  max-width: 600px;
  margin: 0 auto;

  .search-bar {
    display: flex;
    border: 2px solid @primary-color;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(@primary-color, 0.15);

    input {
      flex: 1;
      padding: 0.9rem 1.5rem;
      border: none;
      outline: none;
      font-size: 1.1rem;

      &::placeholder {
        color: #aaa;
      }
    }

    .search-button {
      width: 60px;
      background: @primary-color;
      border: none;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s;

      &:hover {
        background: darken(@primary-color, 10%);
      }

      svg {
        width: 24px;
        height: 24px;
        fill: white;
      }
    }
  }

  .demo-results {
    margin-top: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;
    max-height: 300px;
    overflow-y: auto;

    .result-item {
      padding: 1.2rem;
      border-bottom: 1px solid @border-color;
      transition: background 0.2s;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: @light-gray;
      }

      .result-title {
        font-weight: 600;
        color: @secondary-color;
        margin-bottom: 0.5rem;
      }

      .result-excerpt {
        font-size: 0.95rem;
        color: #666;
      }
    }
  }
}

.content {
  display: grid;
  gap: 3rem;
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, @primary-color, @accent-color);
    border-radius: 2px;
  }
}

.intro-section {
  .intro-card {
    background: @light-gray;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: @card-shadow;

    h2 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
    }

    p {
      margin-bottom: 2rem;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  .benefits {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;

    .benefit {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: @card-shadow;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        color: @secondary-color;
        margin: 0.5rem 0;
      }

      p {
        margin: 0;
        color: #666;
        font-size: 0.95rem;
      }
    }
  }
}

.methods-section {
  .methods-tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 2rem;

    .tab-button {
      background: @light-gray;
      border: 2px solid transparent;
      padding: 0.8rem 1.8rem;
      border-radius: 8px;
      font-weight: 500;
      font-size: 1.05rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: @primary-light;
        border-color: fade(@primary-color, 30%);
      }

      &.active {
        background: @primary-color;
        color: white;
        border-color: @primary-color;
        box-shadow: 0 4px 15px rgba(@primary-color, 0.2);
      }
    }
  }

  .method-details {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;
  }

  .method-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;

    h3 {
      color: @secondary-color;
      margin: 0;
      font-size: 1.6rem;
    }
  }

  .method-tags {
    display: flex;
    gap: 0.8rem;

    .tag {
      font-size: 0.85rem;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-weight: 500;
      background: @primary-light;
      color: @primary-color;
    }
  }

  .method-description {
    margin-bottom: 1.8rem;

    p {
      font-size: 1.1rem;
      line-height: 1.8;
      padding: 0.5rem 0;
    }
  }

  .details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .detail-card {
    background: @light-gray;
    border-radius: 12px;
    padding: 1.5rem;
    border-left: 4px solid @primary-color;

    .detail-icon {
      font-size: 1.8rem;
      margin-bottom: 0.8rem;
    }

    h4 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 0.8rem;
      font-size: 1.2rem;
    }

    p,
    ul {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.7;
    }

    ul {
      padding-left: 1.2rem;

      li {
        margin-bottom: 0.5rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .code-example {
    background: #2d2d2d;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 1.5rem;

    h4 {
      color: #f0f0f0;
      margin: 0;
      padding: 1rem 1.5rem;
      background: #1e1e1e;
      font-size: 1.1rem;
    }

    pre {
      margin: 0;
      padding: 1.5rem;
      overflow-x: auto;

      code {
        font-family: 'Courier New', monospace;
        color: #f8f8f2;
        font-size: 0.95rem;
        line-height: 1.6;

        .comment {
          color: #6a9955;
        }

        .keyword {
          color: #c586c0;
        }

        .function {
          color: #dcdcaa;
        }

        .string {
          color: #ce9178;
        }
      }
    }
  }
}

.comparison-section {
  .comparison-table {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;

    .table-header {
      display: flex;
      background: @primary-color;
      color: white;
      font-weight: 500;

      > div {
        padding: 1.2rem 1.5rem;
        text-align: center;
        flex: 1;
      }

      .col-criteria {
        flex: 1.5;
        text-align: left;
      }
    }

    .table-row {
      display: flex;
      border-bottom: 1px solid @border-color;

      &:nth-child(even) {
        background: @light-gray;
      }

      &:last-child {
        border-bottom: none;
      }

      > div {
        padding: 1.2rem 1.5rem;
        flex: 1;
        display: flex;
        align-items: center;
      }

      .col-criteria {
        flex: 1.5;
        font-weight: 500;
      }
    }

    .rating {
      --rating: 3;
      display: flex;
      align-items: center;
      gap: 0.8rem;

      .stars {
        width: 100px;
        height: 20px;
        background: #e0e0e0;
        border-radius: 10px;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: calc(var(--rating) * 20%);
          background: linear-gradient(to right, #ffc107, #ff9800);
          border-radius: 10px;
        }
      }

      .rating-text {
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 50px;
      }
    }
  }
}

.best-practices {
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .practice-card {
    display: flex;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .practice-number {
      width: 60px;
      min-height: 100%;
      background: @primary-color;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .practice-content {
      padding: 1.5rem;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.25rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.7;
      }
    }
  }
}

.optimization-section {
  .optimization-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .step {
      display: flex;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @card-shadow;
      gap: 1.2rem;

      .step-number {
        width: 40px;
        height: 40px;
        background: @primary-light;
        color: @primary-color;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        flex-shrink: 0;
        font-size: 1.2rem;
      }

      .step-content {
        flex: 1;

        h3 {
          color: @secondary-color;
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-size: 1.15rem;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: #555;
          line-height: 1.7;
        }
      }
    }
  }
}

.footer {
  margin-top: 4rem;
  padding: 2rem;
  text-align: center;
  background: @light-gray;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 500;
  color: @secondary-color;
  box-shadow: @card-shadow;
  border-top: 2px solid fade(@primary-color, 30%);

  p {
    margin-bottom: 1.5rem;
  }

  .resources {
    margin-top: 1.5rem;

    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;

      li a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .site-search-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .intro-card {
    padding: 1.5rem !important;
  }

  .method-details {
    padding: 1.5rem !important;
  }

  .comparison-table {
    overflow-x: auto;

    .table-header,
    .table-row {
      min-width: 700px;
    }
  }
}
</style>
