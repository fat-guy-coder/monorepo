<template>
  <div class="font-icons-container">
    <header class="header">
      <h1><i class="iconfont icon-font"></i> 字体图标性能优化指南</h1>
      <p>使用字体图标提升前端性能与用户体验</p>
    </header>

    <div class="content">
      <section class="card">
        <div class="card-header">
          <i class="iconfont icon-bulb"></i>
          <h2>什么是字体图标？</h2>
        </div>
        <p>字体图标是将图标作为字体文件(.woff, .ttf等)引入，每个图标对应一个特定的Unicode字符。相比传统图片图标，它具有以下特点：</p>
        <ul>
          <li><i class="iconfont icon-check"></i> 矢量图形，无限缩放不失真</li>
          <li><i class="iconfont icon-check"></i> 通过CSS控制样式（颜色、大小、阴影等）</li>
          <li><i class="iconfont icon-check"></i> 减少HTTP请求与资源体积</li>
          <li><i class="iconfont icon-check"></i> 跨平台一致显示</li>
        </ul>
      </section>

      <section class="card">
        <div class="card-header">
          <i class="iconfont icon-performance"></i>
          <h2>性能优化原理</h2>
        </div>
        <div class="comparison">
          <div class="comparison-item">
            <div class="comparison-badge bad">
              <i class="iconfont icon-image"></i>
            </div>
            <h3>传统图片图标</h3>
            <ul>
              <li>多个图标需要多个HTTP请求</li>
              <li>大尺寸图片占用更多带宽</li>
              <li>无法动态调整颜色</li>
              <li>高分辨率需要多套资源</li>
              <li>图片加载可能导致页面跳动</li>
            </ul>
          </div>

          <div class="comparison-arrow">
            <i class="iconfont icon-arrow-right"></i>
          </div>

          <div class="comparison-item">
            <div class="comparison-badge good">
              <i class="iconfont icon-font"></i>
            </div>
            <h3>字体图标</h3>
            <ul>
              <li>单个字体文件包含所有图标</li>
              <li>矢量格式体积更小</li>
              <li>CSS控制样式，无需额外资源</li>
              <li>自动适配各种分辨率</li>
              <li>减少重绘与回流</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <i class="iconfont icon-method"></i>
          <h2>使用方法</h2>
        </div>
        <div class="methods">
          <div class="method">
            <div class="method-icon">
              <i class="iconfont icon-cdn"></i>
            </div>
            <h3>CDN引入</h3>
            <pre><code>&lt;link rel="stylesheet"
  href="//at.alicdn.com/t/font_123456_abc.css"&gt;

&lt;i class="iconfont icon-home"&gt;&lt;/i&gt;</code></pre>
          </div>

          <div class="method">
            <div class="method-icon">
              <i class="iconfont icon-npm"></i>
            </div>
            <h3>NPM安装</h3>
            <pre><code>npm install @iconfont/iconfont

// 在main.ts中引入
import '@iconfont/iconfont.css'</code></pre>
          </div>

          <div class="method">
            <div class="method-icon">
              <i class="iconfont icon-diy"></i>
            </div>
            <h3>自定义图标</h3>
            <pre><code>// 在iconfont.cn创建项目
// 选择需要的图标并下载
// 解压后将字体文件放入assets/fonts
// 引入iconfont.css</code></pre>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <i class="iconfont icon-scene"></i>
          <h2>适用场景</h2>
        </div>
        <div class="scenes">
          <div class="scene">
            <i class="iconfont icon-web"></i>
            <h3>导航菜单图标</h3>
          </div>
          <div class="scene">
            <i class="iconfont icon-button"></i>
            <h3>按钮图标</h3>
          </div>
          <div class="scene">
            <i class="iconfont icon-status"></i>
            <h3>状态指示器</h3>
          </div>
          <div class="scene">
            <i class="iconfont icon-social"></i>
            <h3>社交媒体图标</h3>
          </div>
          <div class="scene">
            <i class="iconfont icon-form"></i>
            <h3>表单控件</h3>
          </div>
          <div class="scene">
            <i class="iconfont icon-animation"></i>
            <h3>动画效果</h3>
          </div>
        </div>
      </section>

      <section class="card best-practices">
        <div class="card-header">
          <i class="iconfont icon-best"></i>
          <h2>最佳实践</h2>
        </div>
        <ol>
          <li>使用<span>Unicode字符</span>替代空标签，提高可访问性</li>
          <li>设置<span>font-display: swap</span>避免布局偏移</li>
          <li>使用<span>SVG代替复杂图标</span>，字体图标适用于简单图形</li>
          <li>通过<span>字体子集化</span>仅包含使用到的图标</li>
          <li>对字体文件启用<span>Gzip/Brotli压缩</span></li>
        </ol>
      </section>
    </div>

    <footer class="footer">
      <p> 前端性能优化指南 | 字体图标可减少高达90%的图标资源体积</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// 引入字体图标（实际项目中需要替换为自己的图标库）
const loadFont = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '//at.alicdn.com/t/c/font_3842036_7lq6r9f7n1k.css';
  document.head.appendChild(link);
};

onMounted(() => {
  loadFont();
});
</script>

<style lang="less" scoped>

.font-icons-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans SC', sans-serif;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7f0 100%);
  min-height: 100vh;

  .header {
    text-align: center;
    padding: 40px 20px;
    background: linear-gradient(120deg, #4361ee, #3a0ca3);
    color: white;
    border-radius: 12px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(67, 97, 238, 0.2);

    h1 {
      font-size: 2.5rem;
      margin-bottom: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;

      .iconfont {
        font-size: 2.2rem;
      }
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      font-weight: 300;
    }
  }

  .content {
    display: grid;
    gap: 25px;
  }

  .card {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    &-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f4ff;

      h2 {
        font-size: 1.8rem;
        color: #3a0ca3;
      }

      .iconfont {
        font-size: 2rem;
        color: #4361ee;
      }
    }

    p,
    li {
      line-height: 1.7;
      font-size: 1.05rem;
      color: #444;
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 10px;
        display: flex;
        align-items: flex-start;
        gap: 10px;

        .iconfont {
          color: #4cc9f0;
          font-size: 1.1rem;
          flex-shrink: 0;
          margin-top: 3px;
        }
      }
    }
  }

  .comparison {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;

    &-arrow {
      .iconfont {
        font-size: 2.5rem;
        color: #4361ee;
      }
    }

    &-item {
      flex: 1;
      text-align: center;
      padding: 25px;
      border-radius: 10px;
      background: #f9fafe;

      h3 {
        margin: 20px 0;
        font-size: 1.4rem;
      }

      ul {
        text-align: left;
        padding-left: 20px;

        li {
          margin-bottom: 12px;
          font-size: 0.95rem;
        }
      }
    }

    &-badge {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      font-size: 2.5rem;

      &.good {
        background: rgba(76, 201, 240, 0.15);
        color: #4cc9f0;
      }

      &.bad {
        background: rgba(240, 98, 146, 0.15);
        color: #f06292;
      }
    }
  }

  .methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;

    .method {
      background: #f8fafe;
      border-radius: 10px;
      padding: 25px;
      text-align: center;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(67, 97, 238, 0.1);
      }

      &-icon {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: rgba(67, 97, 238, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto 20px;

        .iconfont {
          font-size: 2rem;
          color: #4361ee;
        }
      }

      h3 {
        font-size: 1.3rem;
        margin-bottom: 20px;
        color: #3a0ca3;
      }

      pre {
        background: #2b2d42;
        color: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        text-align: left;
        font-size: 0.9rem;
        overflow: auto;

        code {
          font-family: 'Fira Code', monospace;
        }
      }
    }
  }

  .scenes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;

    .scene {
      text-align: center;
      padding: 25px 15px;
      background: #f0f4ff;
      border-radius: 10px;
      transition: all 0.3s ease;

      &:hover {
        background: #e6edff;
        transform: translateY(-5px);
      }

      .iconfont {
        font-size: 3rem;
        color: #4361ee;
        margin-bottom: 15px;
        display: block;
      }

      h3 {
        font-size: 1.1rem;
        font-weight: 500;
      }
    }
  }

  .best-practices {
    ol {
      padding-left: 30px;

      li {
        margin-bottom: 15px;
        position: relative;
        padding-left: 30px;
        font-size: 1.1rem;

        &::before {
          content: counter(list-item);
          counter-increment: list-item;
          position: absolute;
          left: 0;
          top: 0;
          width: 24px;
          height: 24px;
          background: #4361ee;
          color: white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.9rem;
          font-weight: bold;
        }

        span {
          background: rgba(67, 97, 238, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 500;
          color: #4361ee;
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 50px;
    padding: 25px;
    color: #666;
    font-size: 0.95rem;
    border-top: 1px solid #eee;
  }
}

@media (max-width: 768px) {
  .font-icons-container {
    padding: 15px;

    .header h1 {
      font-size: 1.8rem;
    }

    .comparison {
      flex-direction: column;
      gap: 25px;

      &-arrow {
        transform: rotate(90deg);
      }
    }

    .methods {
      grid-template-columns: 1fr;
    }
  }
}
</style>
