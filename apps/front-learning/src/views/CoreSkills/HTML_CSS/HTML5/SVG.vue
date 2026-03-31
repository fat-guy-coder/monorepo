<template>
  <div class="svg-doc">
    <!-- 头部 -->
    <header class="doc-header">
      <h1 class="title">🎨 SVG 基本指南</h1>
      <p class="subtitle">矢量图形的艺术与科学</p>
    </header>

    <Button style="margin-bottom: 1rem" @click.prevent="goto">跳转进阶指南</Button>

    <!-- SVG 使用方法和场景 -->
    <section class="section svg-usage">
      <h2 class="section-title">📖 SVG 使用方法与场景</h2>
      <p>SVG（可缩放矢量图形）是一种用于描述二维图形的XML格式。它具有以下优点：</p>
      <ul>
        <li>可缩放性：无论放大或缩小，图形都不会失真。</li>
        <li>可编辑性：SVG文件是文本文件，可以使用文本编辑器进行编辑。</li>
        <li>交互性：SVG支持事件处理，可以与JavaScript结合使用。</li>
        <li>动画：SVG可以通过CSS和JavaScript实现动画效果。</li>
      </ul>
      <p>常见的使用场景包括：</p>
      <ul>
        <li>图标和标志：SVG适合用于网站和应用程序中的图标和标志。</li>
        <li>图表和数据可视化：SVG可以用于创建动态和交互式的数据可视化。</li>
        <li>插图：SVG可以用于创建高质量的插图和图形。</li>
      </ul>
    </section>

    <!-- 内容主体 -->
    <main class="doc-content">
      <!-- 基础概念 -->
      <section class="section basics">
        <h2 class="section-title">📚 SVG 基础概念</h2>
        <div class="concept-grid">
          <div class="concept-card">
            <div class="card-header">
              <h3>矢量图形</h3>
            </div>
            <p>基于数学公式的缩放无损图形</p>
            <ul>
              <li>无限放大不失真</li>
              <li>文件体积更小</li>
              <li>DOM 可操作性</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-header">
              <h3>XML 结构</h3>
            </div>
            <pre class="code-block"><code>&lt;svg width="100" height="100"&gt;
  &lt;circle cx="50" cy="50" r="40"/&gt;
&lt;/svg&gt;</code></pre>
          </div>
        </div>
      </section>

      <!-- 基本图形 -->
      <section class="section shapes">
        <h2 class="section-title">🔷 基本图形元素</h2>
        <div class="shape-grid">
          <div class="shape-card">
            <div class="shape-preview">
              <svg width="100" height="100">
                <rect x="10" y="10" width="80" height="80" fill="#3498db" />
              </svg>
            </div>
            <pre class="code-block"><code>&lt;rect
  x="10"
  y="10"
  width="80"
  height="80"
  fill="#3498db"
/&gt;</code></pre>
          </div>

          <div class="shape-card">
            <div class="shape-preview">
              <svg width="100" height="100">
                <circle cx="50" cy="50" r="40" fill="#e74c3c" />
              </svg>
            </div>
            <pre class="code-block"><code>&lt;circle
  cx="50"
  cy="50"
  r="40"
  fill="#e74c3c"
/&gt;</code></pre>
          </div>

          <div class="shape-card">
            <div class="shape-preview">
              <svg width="100" height="100">
                <path d="M10 80 Q 50 10 90 80" stroke="#2ecc71" fill="none" />
              </svg>
            </div>
            <pre class="code-block"><code>&lt;path
  d="M10 80 Q 50 10 90 80"
  stroke="#2ecc71"
  fill="none"
/&gt;</code></pre>
          </div>
        </div>
      </section>

      <!-- 动画示例 -->
      <section class="section animation">
        <h2 class="section-title">🎬 SVG 动画</h2>
        <div class="animation-demo">
          <div class="code-column">
            <pre class="code-block"><code>&lt;circle cx="50" cy="50" r="20"&gt;
  &lt;animate
    attributeName="r"
    values="20;40;20"
    dur="2s"
    repeatCount="indefinite"
  /&gt;
&lt;/circle&gt;</code></pre>
          </div>
          <div class="demo-column">
            <svg width="120" height="120">
              <circle cx="60" cy="60" r="20" fill="#9b59b6">
                <animate attributeName="r" values="20;40;20" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>
      </section>
    </main>

    <!-- 最佳实践 -->
    <footer class="doc-footer">
      <div class="best-practice">
        <h3>🏆 最佳实践建议</h3>
        <div class="practice-list">
          <div class="practice-item">
            <div class="icon">✅</div>
            <p>使用SVGO优化SVG文件体积</p>
          </div>
          <div class="practice-item">
            <div class="icon">✅</div>
            <p>为交互元素添加ARIA标签</p>
          </div>
          <div class="practice-item">
            <div class="icon">✅</div>
            <p>优先使用CSS动画控制简单变换</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from 'components'

const router = useRouter()

function goto() {
  router.push({ name: 'SvgOpearation' })
}
</script>

<style lang="less">
.svg-doc {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem 3rem;
  background: linear-gradient(145deg, #f8fafb 0%, #ffffff 100%);
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  font-family: 'Inter', sans-serif;

  .doc-header {
    text-align: center;
    margin-bottom: 1rem;

    .title {
      color: #3498db;
      font-size: 2.8rem;
      margin: 1rem 0;
      text-shadow: 2px 2px 4px rgba(52, 152, 219, 0.1);
    }

    .subtitle {
      color: #636e72;
      font-size: 1.4rem;
      letter-spacing: 0.05em;
    }

    .header-wave {
      width: 120px;
      height: 4px;
      background: repeating-linear-gradient(90deg,
          #3498db 0px,
          #3498db 10px,
          #2ecc71 10px,
          #2ecc71 20px);
      margin: 1.5rem auto;
    }
  }

  .doc-content {
    .section {
      margin-bottom: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-3px);
      }

      .section-title {
        color: #2d3436;
        font-size: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #eee;
      }

      .concept-grid,
      .shape-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;

        .concept-card,
        .shape-card {
          padding: 1.5rem;
          border-radius: 8px;
          background: #f8f9fa;

          .card-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;

            svg {
              width: 32px;
              height: 32px;
              fill: #3498db;
            }
          }

          .shape-preview {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
          }
        }
      }

      .animation-demo,
      .integration-example {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: center;

        .demo-column,
        .live-demo {
          text-align: center;
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 8px;

          .interactive-svg {
            cursor: pointer;
            transition: transform 0.3s ease;

            &:hover {
              transform: scale(1.05);
            }
          }
        }
      }
    }

    .code-block {
      background: #2d3436;
      color: #dfe6e9;
      padding: 1rem;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      overflow-x: auto;
      margin: 1rem 0;
    }
  }

  .doc-footer {
    .best-practice {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 8px;
      border-left: 4px solid #3498db;

      .practice-list {
        .practice-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;

          .icon {
            font-size: 1.5rem;
            color: #3498db;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .svg-doc {
    padding: 1rem;
    margin: 1rem;

    .doc-header .title {
      font-size: 2rem;
    }

    .concept-grid,
    .shape-grid {
      grid-template-columns: 1fr !important;
    }

    .animation-demo,
    .integration-example {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>
