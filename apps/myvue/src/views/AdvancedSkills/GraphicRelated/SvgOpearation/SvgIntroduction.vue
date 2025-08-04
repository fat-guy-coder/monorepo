<template>
  <div class="svg-guide">
    <header>
      <h1>SVG (可缩放矢量图形)</h1>
      <p>在Vue3中的使用与最佳实践</p>
    </header>

    <main>
      <!-- 概念部分 -->
      <section class="concept">
        <h2>SVG 概念</h2>
        <div class="content">
          <div class="definition">
            <p><strong>SVG (Scalable Vector Graphics)</strong> 是一种基于XML的矢量图像格式，用于在Web上定义二维图形。</p>
            <p>与基于像素的位图格式不同，SVG使用数学公式描述图形，因此可以无限缩放而不失真。</p>
          </div>

          <div class="demo">
            <div class="comparison">
              <div>
                <img src="https://via.placeholder.com/150?text=PNG" alt="PNG示例" class="pixel">
                <p>PNG (位图)</p>
              </div>
              <div>
                <svg width="150" height="150" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="#4361ee" />
                  <rect x="20" y="20" width="60" height="60" fill="#f72585" opacity="0.7" />
                </svg>
                <p>SVG (矢量图)</p>
              </div>
            </div>
            <div class="scaling-demo">
              <div class="zoom-controls">
                <button @click="zoomLevel = 1">100%</button>
                <button @click="zoomLevel = 2">200%</button>
                <button @click="zoomLevel = 4">400%</button>
              </div>
              <div class="zoom-container" :style="{ transform: `scale(${zoomLevel})` }">
                <div class="pixel-container">
                  <img src="https://via.placeholder.com/100?text=PNG" alt="PNG缩放">
                  <div class="pixel-grid"></div>
                </div>
                <div class="vector-container">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="#3a0ca3" />
                    <polygon points="50,10 70,40 95,45 75,65 80,90 50,75 20,90 25,65 5,45 30,40" fill="#4cc9f0" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases">
        <h2>SVG 使用场景</h2>
        <div class="cases-grid">
          <div class="case">
            <div class="icon">
              <svg width="60" height="60" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="#4361ee"
                  opacity="0.2" />
                <path
                  d="M12 12.25c1.24 0 2.25-1.01 2.25-2.25S13.24 7.75 12 7.75 9.75 8.76 9.75 10s1.01 2.25 2.25 2.25zm4.5 4c0-1.5-3-2.25-4.5-2.25s-4.5.75-4.5 2.25V17h9v-.75z"
                  fill="#4361ee" />
              </svg>
            </div>
            <h3>图标系统</h3>
            <p>清晰锐利的图标，在任何分辨率下都完美呈现</p>
          </div>

          <div class="case">
            <div class="icon">
              <svg width="60" height="60" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#f72585" opacity="0.2" />
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                  fill="#f72585" />
                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#f72585" />
              </svg>
            </div>
            <h3>数据可视化</h3>
            <p>创建交互式图表、图形和仪表盘</p>
          </div>

          <div class="case">
            <div class="icon">
              <svg width="60" height="60" viewBox="0 0 24 24">
                <rect width="24" height="24" fill="#4cc9f0" opacity="0.2" rx="4" />
                <path
                  d="M12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0-2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"
                  fill="#4cc9f0" />
                <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 12h-2v-4h2v4zm0-6h-2V6h2v4z"
                  fill="#4cc9f0" />
              </svg>
            </div>
            <h3>动画元素</h3>
            <p>实现复杂的UI动画和过渡效果</p>
          </div>

          <div class="case">
            <div class="icon">
              <svg width="60" height="60" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"
                  fill="#7209b7" />
                <path
                  d="M17.5 10.5c.88 0 1.73.09 2.5.26V9.24c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99zM13 12.49v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26v-1.52c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.3-4.5.83zm4.5 1.84c-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26v-1.52c-.79-.16-1.64-.24-2.5-.24z"
                  fill="#7209b7" />
              </svg>
            </div>
            <h3>响应式设计</h3>
            <p>自适应不同屏幕尺寸和分辨率</p>
          </div>
        </div>
      </section>

      <!-- 优点部分 -->
      <section class="benefits">
        <h2>SVG 的优势</h2>
        <div class="benefits-grid">
          <div class="benefit">
            <div class="benefit-icon">①</div>
            <div>
              <h3>无限缩放</h3>
              <p>矢量特性使其在任何分辨率下都保持清晰锐利</p>
            </div>
          </div>
          <div class="benefit">
            <div class="benefit-icon">②</div>
            <div>
              <h3>文件体积小</h3>
              <p>通常比同等质量的位图文件更小</p>
            </div>
          </div>
          <div class="benefit">
            <div class="benefit-icon">③</div>
            <div>
              <h3>可访问性</h3>
              <p>支持文本描述和屏幕阅读器</p>
            </div>
          </div>
          <div class="benefit">
            <div class="benefit-icon">④</div>
            <div>
              <h3>可编辑性</h3>
              <p>可直接在代码中编辑样式和属性</p>
            </div>
          </div>
          <div class="benefit">
            <div class="benefit-icon">⑤</div>
            <div>
              <h3>动画支持</h3>
              <p>原生支持CSS和JavaScript动画</p>
            </div>
          </div>
          <div class="benefit">
            <div class="benefit-icon">⑥</div>
            <div>
              <h3>SEO友好</h3>
              <p>文本内容可被搜索引擎索引</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Vue集成 -->
      <section class="vue-integration">
        <h2>在Vue中使用SVG</h2>
        <div class="integration-content">
          <div class="methods">
            <h3>使用方法</h3>
            <div class="method">
              <h4>1. 内联SVG</h4>
              <pre><code>&lt;template&gt;
  &lt;svg width="100" height="100"&gt;
    &lt;circle cx="50" cy="50" r="40" fill="#4361ee" /&gt;
  &lt;/svg&gt;
&lt;/template&gt;</code></pre>
              <p>优点：完全可控，可添加交互</p>
            </div>
            <div class="method">
              <h4>2. 作为组件</h4>
              <pre><code>// Icon.vue
&lt;template&gt;
  &lt;svg :width="size" :height="size" viewBox="0 0 24 24"&gt;
    &lt;path :d="iconPath" :fill="color" /&gt;
  &lt;/svg&gt;
&lt;/template&gt;

&lt;script setup&gt;
defineProps({
  size: { type: Number, default: 24 },
  color: { type: String, default: '#000' },
  iconPath: { type: String, required: true }
});
&lt;/script&gt;</code></pre>
              <p>优点：可复用，参数化配置</p>
            </div>
          </div>
          <div class="best-practices">
            <h3>最佳实践</h3>
            <ul>
              <li>使用内联SVG以获得最佳性能和控制</li>
              <li>通过props参数化SVG组件</li>
              <li>使用CSS变量控制SVG颜色</li>
              <li>为交互元素添加<code>:hover</code>状态</li>
              <li>为重要元素添加<code>&lt;title&gt;</code>和<code>&lt;desc&gt;</code>标签</li>
              <li>优化SVG代码，删除不必要的元数据</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>© 2023 SVG技术指南 | 使用Vue3和TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const zoomLevel = ref(1);
</script>

<style lang="less" scoped>
@primary: #4361ee;
@secondary: #3a0ca3;
@accent: #4cc9f0;
@pink: #f72585;
@purple: #7209b7;
@light: #f8f9fa;
@dark: #212529;

// 基础样式
.svg-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: @dark;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: @secondary;
      background: linear-gradient(135deg, @secondary, @primary);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      color: lighten(@dark, 20%);
      font-size: 1.1rem;
    }
  }

  section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid @accent;
      color: @secondary;
    }
  }
}

// 概念部分
.concept {
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .definition {
    p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
      line-height: 1.7;

      strong {
        color: @primary;
      }
    }
  }

  .demo {
    .comparison {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;

      &>div {
        flex: 1;
        text-align: center;

        p {
          margin-top: 0.5rem;
          font-weight: 500;
        }
      }

      .pixel {
        border: 1px solid #dee2e6;
        border-radius: 4px;
      }

      svg {
        border: 1px solid #dee2e6;
        border-radius: 4px;
      }
    }

    .scaling-demo {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;

      .zoom-controls {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;

        button {
          padding: 0.5rem 1rem;
          background: @light;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background: @accent;
            color: white;
            border-color: @accent;
          }
        }
      }

      .zoom-container {
        display: flex;
        gap: 2rem;
        justify-content: center;
        transform-origin: top center;
        transition: transform 0.3s ease;

        .pixel-container,
        .vector-container {
          position: relative;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          overflow: hidden;
        }

        .pixel-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background:
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 10px 10px;
        }
      }
    }
  }
}

// 使用场景
.use-cases {
  .cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;

    .case {
      text-align: center;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
      }

      .icon {
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0.5rem 0;
        color: @secondary;
      }

      p {
        color: lighten(@dark, 20%);
        margin: 0;
      }
    }
  }
}

// 优点部分
.benefits {
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .benefit {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      padding: 1.2rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid @primary;

      .benefit-icon {
        width: 36px;
        height: 36px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
      }

      h3 {
        margin: 0 0 0.3rem;
        color: @secondary;
      }

      p {
        margin: 0;
        color: lighten(@dark, 20%);
      }
    }
  }
}

// Vue集成部分
.vue-integration {
  .integration-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }

  .methods {
    .method {
      margin-bottom: 2rem;

      h4 {
        margin: 0 0 0.8rem;
        color: @primary;
      }

      pre {
        background: #2d3748;
        border-radius: 8px;
        padding: 1.2rem;
        overflow: auto;
        margin-bottom: 0.8rem;

        code {
          font-family: 'Fira Code', monospace;
          color: #cbd5e0;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }

      p {
        color: lighten(@dark, 20%);
        font-style: italic;
      }
    }
  }

  .best-practices {
    background: #f1f3f5;
    border-radius: 8px;
    padding: 1.5rem;

    h3 {
      margin-top: 0;
      color: @secondary;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.8rem;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: "•";
          color: @primary;
          position: absolute;
          left: 0;
          font-size: 1.2rem;
          line-height: 1;
        }

        code {
          background: #e9ecef;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
      }
    }
  }
}

// 页脚
footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  color: lighten(@dark, 30%);
  font-size: 0.9rem;
  border-top: 1px solid #e9ecef;
}
</style>