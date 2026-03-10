<template>
  <div class="scroll-progress-guide">
    <!-- 顶部标题区域 -->
    <div class="hero-section">
      <h1>页面加载滚动条</h1>
      <p class="subtitle">提升用户体验的视觉反馈</p>
    </div>

    <section class="content-wrapper">
      <h1>利用performance.getEntriesByType('paint')获取页面加载进度</h1>
      <h1>利用performance.getEntriesByType('resource')获取资源加载进度</h1>

    </section>

    <!-- 内容区域 -->
    <div class="content-container">
      <!-- 方法1 -->
      <section class="method-section">
        <h2 class="method-title">
          <span class="method-icon">1️⃣</span>
          <span>CSS线性渐变实现</span>
        </h2>
        <div class="method-content">
          <div class="code-example">
            <pre><code>/* 全局样式 */
html {
  background: linear-gradient(
    to right,
    #4f46e5 0%,
    #4f46e5 var(--scroll),
    #e0e7ff var(--scroll),
    #e0e7ff 100%
  );
  background-attachment: fixed;
  background-size: 100% 4px;
  background-repeat: no-repeat;
}</code></pre>
          </div>
          <div class="method-details">
            <h3>使用场景</h3>
            <p>适用于简单的静态网站或博客，不需要复杂交互的场景</p>

            <h3>优缺点</h3>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>纯CSS实现，性能极佳</li>
                  <li>无JavaScript依赖</li>
                  <li>实现简单</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>自定义程度低</li>
                  <li>无法添加交互效果</li>
                  <li>兼容性一般</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 方法2 -->
      <section class="method-section">
        <h2 class="method-title">
          <span class="method-icon">2️⃣</span>
          <span>JavaScript监听滚动</span>
        </h2>
        <div class="method-content">
          <div class="code-example">
            <pre><code>// 在Vue组件中
const scrollProgress = ref(0)

onMounted(() => {
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    scrollProgress.value = (scrollTop / (scrollHeight - clientHeight)) * 100
  })
})

// 模板中使用
&lt;div class="progress-bar" :style="{ width: `${scrollProgress}%` }"&gt;&lt;/div&gt;</code></pre>
          </div>
          <div class="method-details">
            <h3>使用场景</h3>
            <p>适用于需要精确控制滚动条样式和行为的动态网站</p>

            <h3>优缺点</h3>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>高度可定制</li>
                  <li>可以添加动画效果</li>
                  <li>兼容性好</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>需要JavaScript</li>
                  <li>滚动事件可能影响性能</li>
                  <li>实现稍复杂</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 方法3 -->
      <section class="method-section">
        <h2 class="method-title">
          <span class="method-icon">3️⃣</span>
          <span>Intersection Observer API</span>
        </h2>
        <div class="method-content">
          <div class="code-example">
            <pre><code>// 在Vue组件中
const progress = ref(0)
let observer: IntersectionObserver

onMounted(() => {
  const sections = document.querySelectorAll('.content-section')

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionIndex = Array.from(sections).indexOf(entry.target)
        progress.value = (sectionIndex / (sections.length - 1)) * 100
      }
    })
  }, { threshold: 0.5 })

  sections.forEach(section => observer.observe(section))
})

// 模板中使用
&lt;div class="progress-bar" :style="{ width: `${progress}%` }"&gt;&lt;/div&gt;</code></pre>
          </div>
          <div class="method-details">
            <h3>使用场景</h3>
            <p>适用于基于章节的内容网站，如长文、文档或教程</p>

            <h3>优缺点</h3>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>性能优化好</li>
                  <li>基于内容区块而非像素</li>
                  <li>现代浏览器支持</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>IE不支持</li>
                  <li>实现复杂</li>
                  <li>需要合理划分内容区块</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="summary-section">
        <h2>方法对比总结</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>方法</th>
                <th>复杂度</th>
                <th>性能</th>
                <th>兼容性</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CSS线性渐变</td>
                <td>简单</td>
                <td>优秀</td>
                <td>一般</td>
                <td>简单静态页面</td>
              </tr>
              <tr>
                <td>JavaScript滚动监听</td>
                <td>中等</td>
                <td>良好</td>
                <td>优秀</td>
                <td>动态交互网站</td>
              </tr>
              <tr>
                <td>Intersection Observer</td>
                <td>复杂</td>
                <td>优秀</td>
                <td>良好</td>
                <td>内容区块网站</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="final-tip">
          <p>根据项目需求选择合适的方法，小型项目推荐CSS方案，复杂交互网站推荐JavaScript方案，内容型网站考虑Intersection Observer。</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
</script>

<style scoped lang="less">
@primary-color: #4f46e5;
@secondary-color: #7c3aed;
@text-color: #1e293b;
@border-color: #e2e8f0;
@radius: 8px;
@shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

.scroll-progress-guide {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', system-ui, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.hero-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: @primary-color;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
  }
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.method-section {
  background: white;
  border-radius: @radius;
  box-shadow: @shadow;
  overflow: hidden;
}

.method-title {
  background: @primary-color;
  color: white;
  padding: 15px 20px;
  font-size: 1.3rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  .method-icon {
    font-size: 1.1rem;
  }
}

.method-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.code-example {
  pre {
    background: #f8fafc;
    border-radius: @radius;
    padding: 15px;
    overflow-x: auto;
    margin: 0;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      color: #334155;
    }
  }
}

.method-details {
  h3 {
    margin-top: 0;
    color: @primary-color;
    font-size: 1.1rem;
  }

  p {
    margin-bottom: 15px;
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  h4 {
    margin: 0 0 10px 0;
    font-size: 1rem;
  }

  ul {
    padding-left: 20px;
    margin: 0;
  }

  li {
    margin-bottom: 5px;
    font-size: 0.9rem;
  }
}

.pros {
  ul {
    list-style-type: '✓ ';
    color: #10b981;
  }
}

.cons {
  ul {
    list-style-type: '✗ ';
    color: #ef4444;
  }
}

.summary-section {
  background: white;
  border-radius: @radius;
  box-shadow: @shadow;
  padding: 20px;

  h2 {
    color: @primary-color;
    margin-top: 0;
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 20px 0;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: #f8fafc;
      font-weight: 600;
      color: @text-color;
    }

    tr:hover {
      background: #f8fafc;
    }
  }
}

.final-tip {
  background: #f0f9ff;
  padding: 15px;
  border-radius: @radius;
  border-left: 4px solid @primary-color;
  margin-top: 20px;

  p {
    margin: 0;
    color: #1e40af;
  }
}
</style>