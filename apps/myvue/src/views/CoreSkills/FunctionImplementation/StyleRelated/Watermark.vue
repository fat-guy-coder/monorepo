<template>
  <div class="watermark-container">
    <!-- 头部区域 -->
    <header class="header">
      <h1 class="title">前端水印实现方案</h1>
      <p class="subtitle">保护内容安全，防止信息泄露</p>
    </header>

    <!-- 水印展示区域 -->
    <div class="watermark-demo">
      <div class="demo-card">
        <h2>水印效果演示</h2>
        <div class="demo-area">
          <div class="watermarked-content">
            <h3>敏感数据示例</h3>
            <p>用户ID: UID-20230915-001</p>
            <p>手机号: 138****5678</p>
            <p>邮箱: user***@example.com</p>
            <div class="sensitive-table">
              <table>
                <thead>
                  <tr>
                    <th>交易ID</th>
                    <th>金额</th>
                    <th>时间</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in transactionData" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>¥{{ item.amount.toFixed(2) }}</td>
                    <td>{{ item.time }}</td>
                    <td>{{ item.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 实现方法区域 -->
    <div class="implementation-section">
      <h2 class="section-title">水印实现方法</h2>

      <!-- CSS 实现 -->
      <div class="method-card">
        <div class="method-header">
          <div class="method-icon">CSS</div>
          <h3>CSS 背景水印</h3>
        </div>
        <div class="method-content">
          <div class="method-description">
            <p>通过CSS的background-image属性创建重复水印图案</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>实现简单，仅需几行CSS</li>
                  <li>对页面性能影响小</li>
                  <li>不增加额外DOM元素</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>容易被CSS覆盖或删除</li>
                  <li>无法防止截图</li>
                  <li>水印内容有限制</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="method-code">
            <pre><code>.watermarked-content {
  background-image: url("data:image/svg+xml;...");
  background-repeat: repeat;
  background-size: 200px 150px;
  position: relative;
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Canvas 实现 -->
      <div class="method-card">
        <div class="method-header">
          <div class="method-icon">🖌️</div>
          <h3>Canvas 生成水印</h3>
        </div>
        <div class="method-content">
          <div class="method-description">
            <p>使用Canvas动态生成水印图像，并作为背景或覆盖层</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>高度自定义水印样式</li>
                  <li>可生成复杂水印效果</li>
                  <li>支持透明度、旋转等效果</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>实现相对复杂</li>
                  <li>增加额外DOM元素</li>
                  <li>可能影响页面性能</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="method-code">
            <pre><code>function generateWatermark(text) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // 绘制水印...
  return canvas.toDataURL('image/png');
}</code></pre>
          </div>
        </div>
      </div>

      <!-- SVG 实现 -->
      <div class="method-card">
        <div class="method-header">
          <div class="method-icon">🖼️</div>
          <h3>SVG 水印</h3>
        </div>
        <div class="method-content">
          <div class="method-description">
            <p>使用SVG创建矢量水印图案，作为背景使用</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>矢量图形，清晰度高</li>
                  <li>文件体积小</li>
                  <li>支持复杂图形和渐变</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>旧浏览器支持有限</li>
                  <li>动态内容生成较复杂</li>
                  <li>文本处理不如Canvas灵活</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="method-code">
            <pre><code>const svg = `
  &lt;svg width="200" height="150" ...&gt;
    &lt;text x="20" y="40" ...&gt;水印内容&lt;/text&gt;
  &lt;/svg&gt;
`;
const svgData = `data:image/svg+xml;base64,${btoa(svg)}`;</code></pre>
          </div>
        </div>
      </div>

      <!-- DOM 元素实现 -->
      <div class="method-card">
        <div class="method-header">
          <div class="method-icon">🧩</div>
          <h3>DOM 元素覆盖</h3>
        </div>
        <div class="method-content">
          <div class="method-description">
            <p>使用绝对定位的DOM元素覆盖在内容上方</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>实现简单直观</li>
                  <li>可动态更新水印内容</li>
                  <li>支持事件穿透</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>增加大量DOM元素</li>
                  <li>影响页面性能</li>
                  <li>容易被开发者工具删除</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="method-code">
            <pre><code>const watermark = document.createElement('div');
watermark.style.position = 'absolute';
watermark.style.top = '0';
watermark.style.left = '0';
watermark.style.width = '100%';
watermark.style.height = '100%';
watermark.style.pointerEvents = 'none';
// 添加水印内容...
document.body.appendChild(watermark);</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用场景和最佳实践 -->
    <div class="usage-section">
      <h2 class="section-title">使用场景与最佳实践</h2>
      <div class="scenarios-grid">
        <div class="scenario-card">
          <div class="scenario-icon">🏦</div>
          <h3>金融数据保护</h3>
          <p>防止敏感财务信息被截图传播，可追踪泄露来源</p>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">📊</div>
          <h3>内部文档安全</h3>
          <p>为内部文档添加员工信息水印，防止外泄</p>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">🖼️</div>
          <h3>版权保护</h3>
          <p>为图片、设计稿等添加版权信息水印</p>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">🔐</div>
          <h3>敏感操作审计</h3>
          <p>关键操作界面添加操作者信息水印</p>
        </div>
      </div>

      <div class="best-practices">
        <h3>最佳实践：</h3>
        <ul>
          <li>结合用户信息动态生成水印（用户ID、姓名等）</li>
          <li>使用半透明水印避免影响内容阅读</li>
          <li>水印应覆盖整个页面而不仅是部分区域</li>
          <li>定期监控水印是否被篡改或删除</li>
          <li>考虑使用MutationObserver检测DOM操作</li>
          <li>服务端渲染时注入水印信息更安全</li>
        </ul>
      </div>
    </div>

    <!-- 安全增强 -->
    <div class="security-section">
      <h2 class="section-title">水印安全增强方案</h2>
      <div class="security-content">
        <div class="security-card">
          <div class="security-header">
            <div class="security-icon">🔍</div>
            <h3>防删除机制</h3>
          </div>
          <ul>
            <li>使用MutationObserver监听水印元素变化</li>
            <li>定期检查水印是否存在</li>
            <li>混淆水印类名和选择器</li>
            <li>多层级水印覆盖</li>
          </ul>
        </div>

        <div class="security-card">
          <div class="security-header">
            <div class="security-icon">🌈</div>
            <h3>隐形水印</h3>
          </div>
          <ul>
            <li>使用文本隐写术(Steganography)</li>
            <li>微调字符间距或颜色值</li>
            <li>添加不可见像素点</li>
            <li>频域水印技术</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2023 前端安全解决方案 | 水印技术可有效防止信息泄露，但不能替代其他安全措施</p>
      <p>重要提示：前端水印只能增加泄露难度，无法完全阻止信息泄露</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 交易数据
const transactionData = ref([
  { id: 'TX-2023-001', amount: 128.50, time: '2023-09-15 10:30', status: '成功' },
  { id: 'TX-2023-002', amount: 256.00, time: '2023-09-15 11:45', status: '成功' },
  { id: 'TX-2023-003', amount: 512.75, time: '2023-09-15 14:20', status: '处理中' },
  { id: 'TX-2023-004', amount: 1024.30, time: '2023-09-15 16:15', status: '成功' },
]);

// 创建水印效果
onMounted(() => {
  createWatermark();
});

// 创建水印背景
function createWatermark() {
  const watermarkText = `内部资料 ${new Date().toLocaleDateString()} 操作员: Admin`;

  // 创建Canvas水印
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'rgba(100, 100, 100, 0.1)';
    ctx.rotate(-Math.PI / 6);
    ctx.fillText(watermarkText, 40, 120);

    // 应用为背景
    const dataURL = canvas.toDataURL('image/png');
    const watermarkedElements = document.querySelectorAll('.watermarked-content');

    watermarkedElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.backgroundImage = `url(${dataURL})`;
        el.style.backgroundRepeat = 'repeat';
        el.style.backgroundSize = '300px 200px';
      }
    });
  }
}
</script>

<style lang="less" scoped>


:root {
  --primary: #3498db;
  --secondary: #2ecc71;
  --accent: #9b59b6;
  --dark: #2c3e50;
  --light: #ecf0f1;
  --danger: #e74c3c;
  --warning: #f39c12;
  --gray: #95a5a6;
  --border-radius: 12px;
  --box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.watermark-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  color: var(--dark);
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);

  .title {
    font-size: 2.8rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.4rem;
    color: var(--gray);
    font-weight: 300;
  }
}

.watermark-demo {
  margin-bottom: 3rem;

  .demo-card {
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;

    h2 {
      padding: 1.5rem;
      background: linear-gradient(to right, var(--primary), var(--accent));
      color: white;
      font-weight: 500;
    }

    .demo-area {
      padding: 2rem;
    }
  }

  .watermarked-content {
    padding: 2rem;
    border: 1px solid #eee;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.7);
    position: relative;
    overflow: hidden;

    h3 {
      color: var(--dark);
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
  }

  .sensitive-table {
    margin-top: 2rem;
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 0.8rem 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
      }

      th {
        background-color: #f8f9fa;
        font-weight: 600;
      }

      tr:hover {
        background-color: #f1f5f9;
      }
    }
  }
}

.section-title {
  font-size: 2rem;
  color: var(--dark);
  margin: 2rem 0 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 3px solid var(--primary);
  display: inline-block;
}

.method-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
  overflow: hidden;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }

  .method-header {
    display: flex;
    align-items: center;
    padding: 1.2rem 1.5rem;
    background: linear-gradient(to right, var(--primary), #3a7bd5);
    color: white;

    .method-icon {
      font-size: 1.8rem;
      margin-right: 1rem;
      background: rgba(255, 255, 255, 0.2);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 1.6rem;
      font-weight: 500;
    }
  }

  .method-content {
    display: flex;
    padding: 1.5rem;

    .method-description {
      flex: 1;
      padding-right: 1.5rem;

      p {
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
      }

      .pros-cons {
        display: flex;
        gap: 1.5rem;

        >div {
          flex: 1;
        }

        h4 {
          margin-bottom: 0.8rem;
          font-size: 1.2rem;
          color: var(--dark);
        }

        ul {
          list-style: none;
          padding-left: 0;

          li {
            padding: 0.5rem 0;
            position: relative;
            padding-left: 1.8rem;

            &::before {
              content: '•';
              position: absolute;
              left: 0;
              color: var(--primary);
              font-size: 1.2rem;
            }
          }
        }

        .pros li::before {
          color: var(--secondary);
        }

        .cons li::before {
          color: var(--danger);
        }
      }
    }

    .method-code {
      flex: 1;
      background: #2c3e50;
      color: #f8f8f2;
      border-radius: 8px;
      padding: 1.2rem;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.95rem;
      line-height: 1.5;

      pre {
        margin: 0;
      }
    }
  }
}

.usage-section {
  margin: 3rem 0;

  .scenarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;

    .scenario-card {
      background: white;
      border-radius: var(--border-radius);
      padding: 1.5rem;
      box-shadow: var(--box-shadow);
      text-align: center;
      transition: var(--transition);

      &:hover {
        transform: translateY(-3px);
      }

      .scenario-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      h3 {
        color: var(--primary);
        margin-bottom: 0.8rem;
      }

      p {
        color: var(--gray);
        font-size: 0.95rem;
      }
    }
  }

  .best-practices {
    background: white;
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--box-shadow);

    h3 {
      margin-bottom: 1.2rem;
      color: var(--primary);
      font-size: 1.4rem;
    }

    ul {
      list-style: none;

      li {
        padding: 0.7rem 0;
        position: relative;
        padding-left: 2rem;
        font-size: 1.1rem;

        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--secondary);
          font-weight: bold;
        }
      }
    }
  }
}

.security-section {
  margin: 3rem 0;

  .security-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .security-card {
    background: white;
    border-radius: var(--border-radius);
    padding: 1.8rem;
    box-shadow: var(--box-shadow);

    .security-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.2rem;

      .security-icon {
        font-size: 2rem;
        margin-right: 1rem;
        color: var(--accent);
      }

      h3 {
        color: var(--dark);
        font-size: 1.4rem;
      }
    }

    ul {
      list-style: none;
      padding-left: 0;

      li {
        padding: 0.6rem 0;
        position: relative;
        padding-left: 1.8rem;
        font-size: 1.05rem;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--primary);
          font-size: 1.5rem;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem;
  margin-top: 3rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: var(--gray);

  p {
    margin-bottom: 0.5rem;

    &:last-child {
      font-style: italic;
      color: var(--danger);
    }
  }
}

@media (max-width: 768px) {
  .method-content {
    flex-direction: column;

    .method-description {
      padding-right: 0;
      margin-bottom: 1.5rem;
    }
  }

  .pros-cons {
    flex-direction: column;
    gap: 1.5rem !important;
  }
}
</style>
