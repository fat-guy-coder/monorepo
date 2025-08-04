<template>
  <div class="image-loading-container">
    <div class="header">
      <h1>前端图片加载优化指南</h1>
      <p class="subtitle">探索现代Web应用中的高效图片加载策略</p>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">75%</div>
          <div class="stat-label">页面加载时间</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">90%</div>
          <div class="stat-label">用户对图片质量敏感度</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">50%</div>
          <div class="stat-label">带宽节省潜力</div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="techniques-section">
        <h2 class="section-title">图片加载技术详解</h2>

        <div class="technique-cards">
          <!-- 传统IMG标签 -->
          <div class="technique-card">
            <div class="card-header">
              <div class="tech-icon">🖼️</div>
              <h3>传统IMG标签</h3>
              <div class="tech-tag">基础方案</div>
            </div>
            <div class="card-content">
              <div class="description">
                <p>使用标准的HTML <code>&lt;img&gt;</code> 标签加载图片，是最基本的图片加载方式</p>
              </div>

              <div class="code-block">
                <div class="code-title">示例代码</div>
                <pre><code>&lt;img
  src="image.jpg"
  alt="描述文本"
  width="800"
  height="600"
&gt;</code></pre>
              </div>

              <div class="scenario">
                <div class="scenario-title">✅ 适用场景</div>
                <ul>
                  <li>内容型图片（文章配图）</li>
                  <li>小型网站或简单页面</li>
                  <li>不需要特殊优化的场景</li>
                </ul>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <div class="pros-title">👍 优点</div>
                  <ul>
                    <li>浏览器原生支持</li>
                    <li>实现简单直接</li>
                    <li>所有浏览器兼容</li>
                  </ul>
                </div>
                <div class="cons">
                  <div class="cons-title">👎 缺点</div>
                  <ul>
                    <li>无懒加载支持</li>
                    <li>无法响应式适配</li>
                    <li>性能优化有限</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 响应式图片 -->
          <div class="technique-card">
            <div class="card-header">
              <div class="tech-icon">📱</div>
              <h3>响应式图片</h3>
              <div class="tech-tag">现代方案</div>
            </div>
            <div class="card-content">
              <div class="description">
                <p>使用<code>srcset</code>和<code>sizes</code>属性根据设备条件加载不同尺寸图片</p>
              </div>

              <div class="code-block">
                <div class="code-title">示例代码</div>
                <pre><code>&lt;img
  src="image-small.jpg"
  srcset="image-small.jpg 480w,
          image-medium.jpg 768w,
          image-large.jpg 1200w"
  sizes="(max-width: 600px) 480px,
         (max-width: 1200px) 768px,
         1200px"
  alt="响应式图片示例"
&gt;</code></pre>
              </div>

              <div class="scenario">
                <div class="scenario-title">✅ 适用场景</div>
                <ul>
                  <li>多设备适配的网站</li>
                  <li>高分辨率屏幕支持</li>
                  <li>节省移动设备带宽</li>
                </ul>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <div class="pros-title">👍 优点</div>
                  <ul>
                    <li>按需加载合适尺寸</li>
                    <li>节省带宽和流量</li>
                    <li>提升移动端体验</li>
                  </ul>
                </div>
                <div class="cons">
                  <div class="cons-title">👎 缺点</div>
                  <ul>
                    <li>需要准备多尺寸图片</li>
                    <li>HTML代码较复杂</li>
                    <li>旧浏览器支持有限</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 图片懒加载 -->
          <div class="technique-card">
            <div class="card-header">
              <div class="tech-icon">⏱️</div>
              <h3>图片懒加载</h3>
              <div class="tech-tag">性能优化</div>
            </div>
            <div class="card-content">
              <div class="description">
                <p>仅当图片进入视口时才加载，减少初始加载时间和带宽消耗</p>
              </div>

              <div class="code-block">
                <div class="code-title">示例代码</div>
                <pre><code>&lt;!-- 原生实现 --&gt;
&lt;img
  src="placeholder.jpg"
  data-src="image.jpg"
  loading="lazy"
  alt="懒加载示例"
&gt;

&lt;!-- Vue实现 --&gt;
&lt;img
  :src="isVisible ? realSrc : placeholder"
  alt="懒加载示例"
&gt;</code></pre>
              </div>

              <div class="scenario">
                <div class="scenario-title">✅ 适用场景</div>
                <ul>
                  <li>长页面或图片墙</li>
                  <li>电商产品列表页</li>
                  <li>社交媒体信息流</li>
                </ul>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <div class="pros-title">👍 优点</div>
                  <ul>
                    <li>大幅减少初始加载量</li>
                    <li>提升页面加载速度</li>
                    <li>改善用户体验</li>
                  </ul>
                </div>
                <div class="cons">
                  <div class="cons-title">👎 缺点</div>
                  <ul>
                    <li>需要JavaScript支持</li>
                    <li>滚动时可能闪烁</li>
                    <li>SEO需特殊处理</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- CDN加速 -->
          <div class="technique-card">
            <div class="card-header">
              <div class="tech-icon">🚀</div>
              <h3>CDN加速</h3>
              <div class="tech-tag">分发优化</div>
            </div>
            <div class="card-content">
              <div class="description">
                <p>使用内容分发网络(CDN)在全球边缘节点缓存图片，加速访问</p>
              </div>

              <div class="code-block">
                <div class="code-title">示例代码</div>
                <pre><code>&lt;!-- 使用CDN URL替换本地路径 --&gt;
&lt;img
  src="https://cdn.yoursite.com/images/pic.jpg"
  alt="CDN加速示例"
&gt;

// 在Webpack中配置
// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://cdn.yoursite.com/'
    : '/'
}</code></pre>
              </div>

              <div class="scenario">
                <div class="scenario-title">✅ 适用场景</div>
                <ul>
                  <li>全球用户访问的网站</li>
                  <li>高流量图片内容</li>
                  <li>静态资源优化</li>
                </ul>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <div class="pros-title">👍 优点</div>
                  <ul>
                    <li>显著提升加载速度</li>
                    <li>减少服务器负载</li>
                    <li>自动压缩和优化</li>
                  </ul>
                </div>
                <div class="cons">
                  <div class="cons-title">👎 缺点</div>
                  <ul>
                    <li>额外成本支出</li>
                    <li>配置相对复杂</li>
                    <li>缓存更新延迟</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 图片格式优化 -->
          <div class="technique-card">
            <div class="card-header">
              <div class="tech-icon">🖌️</div>
              <h3>现代图片格式</h3>
              <div class="tech-tag">格式优化</div>
            </div>
            <div class="card-content">
              <div class="description">
                <p>使用WebP、AVIF等现代图片格式替代传统JPEG/PNG</p>
              </div>

              <div class="code-block">
                <div class="code-title">示例代码</div>
                <pre><code>&lt;picture&gt;
  &lt;source srcset="image.avif" type="image/avif"&gt;
  &lt;source srcset="image.webp" type="image/webp"&gt;
  &lt;img src="image.jpg" alt="现代格式示例"&gt;
&lt;/picture&gt;

// 在Webpack中使用loader
module: {
  rules: [
    {
      test: /\.(png|jpe?g)$/i,
      use: [{
        loader: 'image-webpack-loader',
        options: {
          webp: { quality: 75 }
        }
      }]
    }
  ]
}</code></pre>
              </div>

              <div class="scenario">
                <div class="scenario-title">✅ 适用场景</div>
                <ul>
                  <li>需要高质量压缩的图片</li>
                  <li>大型图片展示网站</li>
                  <li>移动端优化需求</li>
                </ul>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <div class="pros-title">👍 优点</div>
                  <ul>
                    <li>更小的文件体积</li>
                    <li>更好的视觉质量</li>
                    <li>支持透明度和动画</li>
                  </ul>
                </div>
                <div class="cons">
                  <div class="cons-title">👎 缺点</div>
                  <ul>
                    <li>兼容性问题（IE）</li>
                    <li>编码解码成本高</li>
                    <li>需要特殊工具处理</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 图片精灵 -->
          <div class="technique-card">
            <div class="card-header">
              <div class="tech-icon">🧩</div>
              <h3>CSS图片精灵</h3>
              <div class="tech-tag">图标优化</div>
            </div>
            <div class="card-content">
              <div class="description">
                <p>将多个小图标合并到一张大图中，通过CSS定位显示特定部分</p>
              </div>

              <div class="code-block">
                <div class="code-title">示例代码</div>
                <pre><code>// CSS样式
.icon {
  background-image: url('sprite.png');
  background-repeat: no-repeat;
  display: inline-block;
}

.icon-home {
  width: 32px;
  height: 32px;
  background-position: 0 0;
}

.icon-user {
  width: 32px;
  height: 32px;
  background-position: -32px 0;
}

// HTML使用
&lt;div class="icon icon-home"&gt;&lt;/div&gt;
&lt;div class="icon icon-user"&gt;&lt;/div&gt;</code></pre>
              </div>

              <div class="scenario">
                <div class="scenario-title">✅ 适用场景</div>
                <ul>
                  <li>网站小图标集合</li>
                  <li>工具栏图标</li>
                  <li>UI界面元素</li>
                </ul>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <div class="pros-title">👍 优点</div>
                  <ul>
                    <li>减少HTTP请求</li>
                    <li>避免图标闪烁</li>
                    <li>统一管理方便</li>
                  </ul>
                </div>
                <div class="cons">
                  <div class="cons-title">👎 缺点</div>
                  <ul>
                    <li>维护更新困难</li>
                    <li>不适应高分辨率</li>
                    <li>不适合大尺寸图片</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- SVG矢量图 -->
          <div class="technique-card">
            <div class="card-header">
              <div class="tech-icon">📐</div>
              <h3>SVG矢量图形</h3>
              <div class="tech-tag">矢量方案</div>
            </div>
            <div class="card-content">
              <div class="description">
                <p>使用可缩放矢量图形(SVG)替代位图，保持清晰度任意缩放</p>
              </div>

              <div class="code-block">
                <div class="code-title">示例代码</div>
                <pre><code>&lt;!-- 内联SVG --&gt;
&lt;svg width="100" height="100"&gt;
  &lt;circle cx="50" cy="50" r="40" fill="blue" /&gt;
&lt;/svg&gt;

&lt;!-- 外部SVG文件 --&gt;
&lt;img src="icon.svg" alt="SVG图标"&gt;

// Vue组件中使用
&lt;template&gt;
  &lt;div v-html="svgContent"&gt;&lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import svgIcon from './icon.svg?raw'

const svgContent = ref(svgIcon)
&lt;/script&gt;</code></pre>
              </div>

              <div class="scenario">
                <div class="scenario-title">✅ 适用场景</div>
                <ul>
                  <li>图标和LOGO</li>
                  <li>数据可视化图表</li>
                  <li>需要高清晰度的图形</li>
                </ul>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <div class="pros-title">👍 优点</div>
                  <ul>
                    <li>无限缩放不失真</li>
                    <li>文件体积通常更小</li>
                    <li>可通过CSS/JS控制</li>
                  </ul>
                </div>
                <div class="cons">
                  <div class="cons-title">👎 缺点</div>
                  <ul>
                    <li>不适合复杂照片</li>
                    <li>性能开销较大</li>
                    <li>安全风险（XSS）</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Base64内联 -->
          <div class="technique-card">
            <div class="card-header">
              <div class="tech-icon">📄</div>
              <h3>Base64内联图片</h3>
              <div class="tech-tag">内联方案</div>
            </div>
            <div class="card-content">
              <div class="description">
                <p>将图片转换为Base64字符串直接嵌入HTML或CSS中</p>
              </div>

              <div class="code-block">
                <div class="code-title">示例代码</div>
                <pre><code>// 在CSS中使用
.hero {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...');
}

// 在HTML中使用
&lt;img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
     alt="Base64图片"&gt;

// Webpack配置
module: {
  rules: [
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于8KB转为Base64
          },
        },
      ],
    },
  ],
},</code></pre>
              </div>

              <div class="scenario">
                <div class="scenario-title">✅ 适用场景</div>
                <ul>
                  <li>极小图标（1-2KB）</li>
                  <li>需要减少HTTP请求</li>
                  <li>动态生成的图片</li>
                </ul>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <div class="pros-title">👍 优点</div>
                  <ul>
                    <li>减少HTTP请求</li>
                    <li>避免额外资源加载</li>
                    <li>适用于小尺寸图片</li>
                  </ul>
                </div>
                <div class="cons">
                  <div class="cons-title">👎 缺点</div>
                  <ul>
                    <li>增加HTML/CSS体积</li>
                    <li>无法利用浏览器缓存</li>
                    <li>编码后体积增加30%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="strategy-section">
        <h2 class="section-title">图片加载策略建议</h2>

        <div class="strategy-grid">
          <div class="strategy-card">
            <div class="strategy-icon">1️⃣</div>
            <h3>评估图片类型</h3>
            <p>内容图片、装饰图片、图标等应采用不同加载策略</p>
          </div>

          <div class="strategy-card">
            <div class="strategy-icon">2️⃣</div>
            <h3>尺寸适配原则</h3>
            <p>根据显示尺寸提供合适大小的图片，避免资源浪费</p>
          </div>

          <div class="strategy-card">
            <div class="strategy-icon">3️⃣</div>
            <h3>格式选择策略</h3>
            <p>照片用WebP/AVIF，图标用SVG，动画用GIF/APNG</p>
          </div>

          <div class="strategy-card">
            <div class="strategy-icon">4️⃣</div>
            <h3>懒加载与预加载</h3>
            <p>非首屏内容懒加载，关键资源预加载</p>
          </div>
        </div>

        <div class="performance-tips">
          <h3>性能优化技巧</h3>
          <ul>
            <li>使用 <code>&lt;picture&gt;</code> 和 <code>srcset</code> 实现艺术指导</li>
            <li>设置宽高属性避免布局偏移</li>
            <li>使用CDN并开启HTTP/2</li>
            <li>实施渐进式图片加载</li>
            <li>监控LCP（最大内容绘制）指标</li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>图片加载优化指南 | 提升用户体验与网站性能</p>
      <p>© 2023 前端性能优化实践手册</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加响应式逻辑
import { ref } from 'vue';

const activeTechnique = ref('responsive');
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #f72585;
@light-bg: #f8f9ff;
@card-bg: #ffffff;
@border-color: #e6e9f0;
@text-color: #2b2d42;
@light-text: #8d99ae;
@code-bg: #2a2a56;

.image-loading-container {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: @light-bg;
  color: @text-color;
  min-height: 100vh;
  line-height: 1.6;
  padding-bottom: 2rem;
}

.header {
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  padding: 3rem 1.5rem 2.5rem;
  margin-bottom: 2rem;
  border-radius: 0 0 20px 20px;
  text-align: center;

  h1 {
    margin: 0;
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin: 0.5rem 0 1.5rem;
    font-weight: 300;
  }
}

.stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  .stat-card {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 1.2rem 1.8rem;
    min-width: 160px;
    backdrop-filter: blur(10px);

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.3rem;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }
  }
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  text-align: center;
  color: @text-color;
  margin: 3rem 0 2rem;
  position: relative;
  font-size: 1.8rem;

  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, @primary-color, @accent-color);
    margin: 0.8rem auto;
    border-radius: 2px;
  }
}

.technique-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 1.8rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.technique-card {
  background: @card-bg;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .card-header {
    padding: 1.2rem 1.5rem;
    background: linear-gradient(to right, @primary-color, @secondary-color);
    color: white;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    .tech-icon {
      font-size: 1.8rem;
    }

    h3 {
      margin: 0;
      flex: 1;
      font-size: 1.3rem;
    }

    .tech-tag {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.25rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }
  }

  .card-content {
    padding: 1.5rem;

    .description {
      margin-bottom: 1.2rem;

      p {
        margin: 0;
        line-height: 1.6;
      }

      code {
        background: rgba(@primary-color, 0.1);
        color: @primary-color;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-size: 0.9em;
      }
    }
  }
}

.code-block {
  background: @code-bg;
  color: #e2e2ff;
  border-radius: 10px;
  padding: 1.2rem;
  margin: 1.2rem 0;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;

  .code-title {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    color: #a0a0e0;
    display: flex;
    align-items: center;

    &::before {
      content: "🖥️";
      margin-right: 0.5rem;
    }
  }

  pre {
    margin: 0;
    white-space: pre-wrap;
  }

  code {
    font-family: inherit;
    background: none;
    padding: 0;
  }
}

.scenario {
  background: rgba(67, 97, 238, 0.05);
  border-radius: 8px;
  padding: 1rem;
  margin: 1.2rem 0;

  .scenario-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: @primary-color;
    display: flex;
    align-items: center;

    &::before {
      content: "✅";
      margin-right: 0.5rem;
    }
  }

  ul {
    padding-left: 1.5rem;
    margin: 0.5rem 0 0;

    li {
      margin-bottom: 0.4rem;
      position: relative;
      padding-left: 0.5rem;

      &::before {
        content: "•";
        position: absolute;
        left: -0.7rem;
        color: @primary-color;
      }
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  margin: 1.5rem 0;

  .pros,
  .cons {
    background: @light-bg;
    padding: 1rem;
    border-radius: 8px;

    .pros-title,
    .cons-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
    }

    .pros-title {
      color: #10b981;

      &::before {
        content: "👍";
        margin-right: 0.5rem;
      }
    }

    .cons-title {
      color: #ef4444;

      &::before {
        content: "👎";
        margin-right: 0.5rem;
      }
    }

    ul {
      padding-left: 1.2rem;
      margin: 0.5rem 0 0;

      li {
        margin-bottom: 0.4rem;
        font-size: 0.92rem;
      }
    }
  }
}

.strategy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.strategy-card {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  border-top: 3px solid @primary-color;

  .strategy-icon {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 0.8rem;
    font-size: 1.2rem;
    color: @text-color;
  }

  p {
    margin: 0;
    color: @light-text;
    font-size: 0.95rem;
  }
}

.performance-tips {
  background: @card-bg;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: @primary-color;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.8rem;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: "➡️";
        position: absolute;
        left: 0;
        color: @primary-color;
      }

      code {
        background: rgba(@primary-color, 0.1);
        color: @primary-color;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-size: 0.9em;
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 4rem;
  padding: 2rem 0;
  color: @light-text;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  p {
    margin: 0.3rem 0;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 2rem 1rem;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .stats {
    gap: 0.8rem;

    .stat-card {
      padding: 1rem;
      min-width: 120px;

      .stat-value {
        font-size: 1.5rem;
      }

      .stat-label {
        font-size: 0.8rem;
      }
    }
  }

  .section-title {
    font-size: 1.5rem;
  }

  .pros-cons {
    grid-template-columns: 1fr;
  }
}
</style>
