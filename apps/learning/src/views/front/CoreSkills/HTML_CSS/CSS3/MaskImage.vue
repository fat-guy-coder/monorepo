<template>
  <div class="mask-image-container">
    <header class="header">
      <h1>CSS <span class="highlight">mask-image</span> 属性基础介绍</h1>
      <p>使用遮罩创建精美的视觉效果</p>
    </header>

    <div class="content">
      <section class="section">
        <h2 class="section-title"><span class="icon">📚</span> 概念解析</h2>
        <div class="concept-cards">
          <div class="concept-card">
            <h3>什么是遮罩？</h3>
            <p>遮罩就像一张有透明区域的覆盖层，它决定了元素哪些部分可见，哪些部分隐藏。</p>
          </div>
          <div class="concept-card">
            <h3>mask-image 属性</h3>
            <p>通过定义一张图像或渐变作为遮罩，控制元素的可见区域，实现各种创意效果。</p>
          </div>
          <div class="concept-card">
            <h3>工作原理</h3>
            <p>遮罩图像的透明度决定了底层元素的可见度：完全透明区域隐藏元素，完全不透明区域显示元素。</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title"><span class="icon">🔍</span> 核心作用</h2>
        <div class="grid-container">
          <div class="grid-item">
            <div class="icon-box">🎨</div>
            <h3>创意视觉效果</h3>
            <p>实现普通CSS无法创建的复杂形状和效果</p>
          </div>
          <div class="grid-item">
            <div class="icon-box">💫</div>
            <h3>平滑过渡</h3>
            <p>创建自然的淡入淡出和过渡效果</p>
          </div>
          <div class="grid-item">
            <div class="icon-box">🖼️</div>
            <h3>非矩形设计</h3>
            <p>轻松突破矩形限制，实现圆形、星形等特殊形状</p>
          </div>
          <div class="grid-item">
            <div class="icon-box">🚀</div>
            <h3>性能优化</h3>
            <p>相比使用多个DOM元素，遮罩通常性能更优</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title"><span class="icon">💻</span> 使用方法</h2>
        <div class="usage-container">
          <div class="code-example">
            <h3>基础语法</h3>
            <pre><code class="language-css">.element {
  mask-image: url(mask.png);
  -webkit-mask-image: url(mask.png); /* Safari 兼容 */
}</code></pre>
          </div>

          <div class="usage-types">
            <div class="usage-type">
              <h4>图像遮罩</h4>
              <div class="demo-image">
                <div class="masked-image masked-demo-1">设置遮罩图像的位置设置遮罩图像的位置设置遮罩图像的位置设置遮罩图像的位置设置遮罩图像的位置设置遮罩图像的位置设置遮罩图像的位置设置遮罩图像的位置设置遮罩图像的位置设置遮罩图像的位置设置遮罩图像的位置设置遮罩图像的位置设置遮罩图像的位置</div>
                <p>使用PNG/SVG图像作为遮罩</p>
              </div>
              <pre><code class="language-css">mask-image: url('star-mask.svg');</code></pre>
            </div>

            <div class="usage-type">
              <h4>渐变遮罩</h4>
              <div class="demo-image">
                <div class="masked-image masked-demo-2"></div>
                <p>使用CSS渐变创建遮罩</p>
              </div>
              <pre><code class="language-css">mask-image: linear-gradient(
  to bottom,
  transparent,
  black 20%,
  black 80%,
  transparent
);</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title"><span class="icon">⚙️</span> 相关属性</h2>
        <div class="properties-table">
          <table>
            <thead>
              <tr>
                <th>属性</th>
                <th>说明</th>
                <th>默认值</th>
                <th>示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>mask-position</code></td>
                <td>设置遮罩图像的位置</td>
                <td><code>center</code></td>
                <td><code>mask-position: top 20px left 10px;</code></td>
              </tr>
              <tr>
                <td><code>mask-size</code></td>
                <td>设置遮罩图像的尺寸</td>
                <td><code>auto</code></td>
                <td><code>mask-size: 50% 100%;</code></td>
              </tr>
              <tr>
                <td><code>mask-repeat</code></td>
                <td>设置遮罩图像是否重复</td>
                <td><code>no-repeat</code></td>
                <td><code>mask-repeat: repeat-x;</code></td>
              </tr>
              <tr>
                <td><code>mask-origin</code></td>
                <td>设置遮罩定位的原点</td>
                <td><code>border-box</code></td>
                <td><code>mask-origin: content-box;</code></td>
              </tr>
              <tr>
                <td><code>mask-clip</code></td>
                <td>设置遮罩的裁剪区域</td>
                <td><code>border-box</code></td>
                <td><code>mask-clip: padding-box;</code></td>
              </tr>
              <tr>
                <td><code>mask-mode</code></td>
                <td>设置遮罩模式（亮度/透明度）</td>
                <td><code>match-source</code></td>
                <td><code>mask-mode: luminance;</code></td>
              </tr>
              <tr>
                <td><code>mask-composite</code></td>
                <td>设置多个遮罩的组合方式</td>
                <td><code>add</code></td>
                <td><code>mask-composite: subtract;</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title"><span class="icon">🎯</span> 使用场景</h2>
        <div class="use-cases">
          <div class="use-case">
            <div class="demo-image">
              <div class="masked-image masked-demo-3"></div>
            </div>
            <h3>渐变淡出效果</h3>
            <p>创建平滑的内容淡出过渡效果</p>
          </div>
          <div class="use-case">
            <div class="demo-image">
              <div class="masked-image masked-demo-4"></div>
            </div>
            <h3>复杂形状图片</h3>
            <p>实现圆形、星形等非矩形图片</p>
          </div>
          <div class="use-case">
            <div class="demo-image">
              <div class="masked-image masked-demo-5"></div>
            </div>
            <h3>文本特效</h3>
            <p>创建带纹理或渐变的文字效果</p>
          </div>
          <div class="use-case">
            <div class="demo-image">
              <div class="masked-image masked-demo-6"></div>
            </div>
            <h3>创意边框</h3>
            <p>实现不规则或装饰性边框效果</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title"><span class="icon">💡</span> 最佳实践</h2>
        <div class="tips">
          <div class="tip">
            <div class="tip-icon">✅</div>
            <p>始终提供备用的 <code>-webkit-mask-image</code> 以确保兼容性</p>
          </div>
          <div class="tip">
            <div class="tip-icon">✅</div>
            <p>使用SVG遮罩以获得最佳分辨率和清晰度</p>
          </div>
          <div class="tip">
            <div class="tip-icon">✅</div>
            <p>渐变遮罩性能优于图像遮罩</p>
          </div>
          <div class="tip">
            <div class="tip-icon">✅</div>
            <p>结合 <code>mask-size</code> 和 <code>mask-position</code> 实现响应式遮罩</p>
          </div>
          <div class="tip">
            <div class="tip-icon">⚠️</div>
            <p>避免在性能关键区域使用大型遮罩图像</p>
          </div>
          <div class="tip">
            <div class="tip-icon">⚠️</div>
            <p>注意浏览器兼容性（IE不支持）</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p> CSS遮罩效果指南 | 使用Vue 3 + TypeScript实现</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
// 不需要太多逻辑，主要是展示静态内容
</script>

<style lang="less" scoped>
.mask-image-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);

  .header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eaeaea;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #2c3e50;
      font-weight: 700;

      .highlight {
        color: #3498db;
        background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
        padding: 0.2rem 0.8rem;
        border-radius: 8px;
      }
    }

    p {
      font-size: 1.2rem;
      color: #7f8c8d;
    }
  }

  .section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      transform: translateY(-4px);
    }

    .section-title {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #f0f0f0;
      color: #2c3e50;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 0.8rem;
      }
    }
  }

  .concept-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .concept-card {
      padding: 1.5rem;
      background: linear-gradient(135deg, #f5f7fa, #e4edfa);
      border-radius: 10px;
      border-left: 4px solid #3498db;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      h3 {
        font-size: 1.3rem;
        margin-bottom: 0.8rem;
        color: #2c3e50;
      }

      p {
        line-height: 1.6;
        color: #555;
      }
    }
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .grid-item {
      text-align: center;
      padding: 1.5rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .icon-box {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #6a11cb, #2575fc);
        color: white;
        width: 70px;
        height: 70px;
        line-height: 70px;
        border-radius: 50%;
        margin: 0 auto 1.5rem;
      }

      h3 {
        font-size: 1.3rem;
        margin-bottom: 0.8rem;
        color: #2c3e50;
      }

      p {
        color: #7f8c8d;
        line-height: 1.5;
      }
    }
  }

  .usage-container {
    .code-example {
      background: #2c3e50;
      border-radius: 10px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      color: white;

      h3 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        color: #42b983;
      }

      pre {
        background: #1e2a38;
        border-radius: 8px;
        padding: 1rem;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          color: #e0e0e0;

          &.language-css {
            .hljs-selector-class {
              color: #ff9a76;
            }

            .hljs-attribute {
              color: #82aaff;
            }

            .hljs-string {
              color: #c3e88d;
            }
          }
        }
      }
    }

    .usage-types {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;

      .usage-type {
        padding: 1.5rem;
        background: white;
        border-radius: 10px;
        border: 1px solid #eaeaea;

        h4 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .demo-image {
          margin: 1.5rem 0;
          text-align: center;

          .masked-image {
            height: 180px;
            margin: 0 auto 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          p {
            color: #7f8c8d;
            font-size: 0.9rem;
          }
        }

        pre {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          overflow-x: auto;
          font-size: 0.9rem;

          code {
            font-family: 'Fira Code', monospace;
            color: #2c3e50;
          }
        }
      }
    }
  }

  .properties-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

      thead {
        background: linear-gradient(135deg, #3498db, #2c3e50);
        color: white;

        th {
          padding: 1.2rem 1rem;
          text-align: left;
          font-weight: 600;
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid #f0f0f0;

          &:nth-child(even) {
            background-color: #f9f9f9;
          }

          &:hover {
            background-color: #f1f8ff;
          }

          td {
            padding: 1rem;
            color: #555;

            &:first-child {
              font-weight: 600;
              color: #2980b9;
              font-family: 'Fira Code', monospace;
              font-size: 0.95rem;
            }

            code {
              background: #f1f8ff;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-family: 'Fira Code', monospace;
              color: #d35400;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }

  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .use-case {
      padding: 1.5rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      }

      .demo-image {
        margin-bottom: 1.2rem;

        .masked-image {
          height: 160px;
          border-radius: 8px;
        }
      }

      h3 {
        font-size: 1.2rem;
        margin-bottom: 0.7rem;
        color: #2c3e50;
      }

      p {
        color: #7f8c8d;
        line-height: 1.5;
        font-size: 0.95rem;
      }
    }
  }

  .tips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.2rem;

    .tip {
      display: flex;
      align-items: flex-start;
      padding: 1.2rem;
      background: linear-gradient(to right, #f8f9fa, #ffffff);
      border-radius: 10px;
      border-left: 4px solid #42b983;

      .tip-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
        min-width: 40px;
        text-align: center;
      }

      p {
        margin: 0;
        line-height: 1.6;
        color: #555;
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: #7f8c8d;
    font-size: 0.9rem;
    border-top: 1px solid #eaeaea;
  }

  // 遮罩演示样式
  .masked-image {
    background-image: url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80');
    background-size: cover;
    background-position: center;
  }

  .masked-demo-1 {
    mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 5L63.3 36.6H97.5L70.1 56.8L83.4 88.4L50 68.2L16.6 88.4L29.9 56.8L2.5 36.6H36.7L50 5Z" fill="black"/></svg>');
    -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 5L63.3 36.6H97.5L70.1 56.8L83.4 88.4L50 68.2L16.6 88.4L29.9 56.8L2.5 36.6H36.7L50 5Z" fill="black"/></svg>');
    mask-size: contain;
    -webkit-mask-size: contain;
  }

  .masked-demo-2 {
    mask-image: linear-gradient(to bottom,
        transparent,
        black 20%,
        black 80%,
        transparent);
    -webkit-mask-image: linear-gradient(to bottom,
        transparent,
        black 20%,
        black 80%,
        transparent);
  }

  .masked-demo-3 {
    mask-image: linear-gradient(to right,
        transparent,
        black 20%,
        black 80%,
        transparent);
    -webkit-mask-image: linear-gradient(to right,
        transparent,
        black 20%,
        black 80%,
        transparent);
  }

  .masked-demo-4 {
    mask-image: radial-gradient(circle at center,
        black 50%,
        transparent 70%);
    -webkit-mask-image: radial-gradient(circle at center,
        black 50%,
        transparent 70%);
  }

  .masked-demo-5 {
    mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="30" font-weight="bold" fill="black">MASK</text></svg>');
    -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="30" font-weight="bold" fill="black">MASK</text></svg>');
    mask-size: contain;
    -webkit-mask-size: contain;
  }

  .masked-demo-6 {
    mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100" fill="black" /><circle cx="50" cy="50" r="40" fill="white" /></svg>');
    -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100" fill="black" /><circle cx="50" cy="50" r="40" fill="white" /></svg>');
  }
}

@media (max-width: 768px) {
  .mask-image-container {
    padding: 1rem;

    .header {
      h1 {
        font-size: 2rem;
      }
    }

    .section {
      padding: 1.5rem;
    }
  }
}
</style>
