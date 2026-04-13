<template>
  <div class="gzip-container">
    <header class="header">
      <div class="title-container">
        <h1 class="title">Gzip压缩技术详解</h1>
        <p class="subtitle">高效网络传输的核心压缩算法</p>
      </div>
      <div class="compression-visual">
        <div class="original-data">
          <div class="label">原始数据</div>
          <div class="size-bar" style="width: 100%">100%</div>
        </div>
        <div class="arrow">→</div>
        <div class="compressed-data">
          <div class="label">Gzip压缩后</div>
          <div class="size-bar" :style="{ width: compressionRatio + '%' }">{{ compressionRatio }}%</div>
        </div>
      </div>
    </header>

    <div class="content">
      <div class="quick-facts">
        <div class="fact">
          <div class="icon">⚡</div>
          <div>
            <div class="value">70-90%</div>
            <div class="label">压缩率</div>
          </div>
        </div>
        <div class="fact">
          <div class="icon">🚀</div>
          <div>
            <div class="value">毫秒级</div>
            <div class="label">压缩速度</div>
          </div>
        </div>
        <div class="fact">
          <div class="icon">🌐</div>
          <div>
            <div class="value">97.6%</div>
            <div class="label">网站采用率</div>
          </div>
        </div>
        <div class="fact">
          <div class="icon">📅</div>
          <div>
            <div class="value">1992年</div>
            <div class="label">首次发布</div>
          </div>
        </div>
      </div>

      <div class="grid-layout">
        <section class="card concept-card">
          <h2 class="section-title">什么是Gzip压缩？</h2>
          <div class="definition">
            <p>Gzip是一种使用DEFLATE算法进行数据压缩的文件格式和软件应用，广泛用于减小文件大小，优化网络传输。</p>
          </div>

          <div class="algorithm-components">
            <h3>技术组成</h3>
            <div class="components">
              <div class="component">
                <div class="icon">1</div>
                <div>
                  <h4>LZ77算法</h4>
                  <p>识别并替换重复数据序列</p>
                </div>
              </div>
              <div class="component">
                <div class="icon">2</div>
                <div>
                  <h4>哈夫曼编码</h4>
                  <p>使用变长编码表示常用字符</p>
                </div>
              </div>
              <div class="component">
                <div class="icon">3</div>
                <div>
                  <h4>CRC校验</h4>
                  <p>确保数据完整性和准确性</p>
                </div>
              </div>
            </div>
          </div>

          <div class="file-format">
            <h3>Gzip文件格式</h3>
            <div class="format-visual">
              <div class="header">文件头 (10字节)</div>
              <div class="body">压缩数据</div>
              <div class="footer">CRC32 (4字节)</div>
              <div class="footer">原始大小 (4字节)</div>
            </div>
          </div>
        </section>

        <section class="card benefits-card">
          <h2 class="section-title">为什么使用Gzip？</h2>

          <div class="benefits">
            <div class="benefit">
              <div class="icon">📉</div>
              <div>
                <h3>减少带宽消耗</h3>
                <p>显著降低数据传输量，节省服务器带宽</p>
              </div>
            </div>
            <div class="benefit">
              <div class="icon">⚡</div>
              <div>
                <h3>加快页面加载</h3>
                <p>减少文件传输时间，提升用户体验</p>
              </div>
            </div>
            <div class="benefit">
              <div class="icon">💰</div>
              <div>
                <h3>降低运营成本</h3>
                <p>减少带宽需求，节省服务器资源成本</p>
              </div>
            </div>
            <div class="benefit">
              <div class="icon">🔒</div>
              <div>
                <h3>提高安全性</h3>
                <p>压缩后数据可减少部分攻击面</p>
              </div>
            </div>
          </div>

          <div class="speed-comparison">
            <h3>压缩速度对比</h3>
            <div class="comparison-chart">
              <div class="algorithm">
                <div class="name">Gzip</div>
                <div class="bar" style="width: 70%; background-color: #4361ee;">
                  <div class="value">快速</div>
                </div>
              </div>
              <div class="algorithm">
                <div class="name">Brotli</div>
                <div class="bar" style="width: 40%; background-color: #4cc9f0;">
                  <div class="value">较慢</div>
                </div>
              </div>
              <div class="algorithm">
                <div class="name">LZMA</div>
                <div class="bar" style="width: 30%; background-color: #ff9f1c;">
                  <div class="value">慢</div>
                </div>
              </div>
              <div class="algorithm">
                <div class="name">Zstandard</div>
                <div class="bar" style="width: 90%; background-color: #2ec4b6;">
                  <div class="value">极快</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="card ratio-card">
        <h2 class="section-title">压缩率分析</h2>

        <div class="ratio-analysis">
          <div class="data-types">
            <h3>不同内容类型的压缩率</h3>
            <div class="ratio-bars">
              <div class="ratio-item">
                <div class="label">HTML</div>
                <div class="bar-container">
                  <div class="bar" style="width: 80%; background-color: #4361ee;"></div>
                  <div class="value">80% → 20%</div>
                </div>
              </div>
              <div class="ratio-item">
                <div class="label">CSS</div>
                <div class="bar-container">
                  <div class="bar" style="width: 75%; background-color: #4cc9f0;"></div>
                  <div class="value">75% → 25%</div>
                </div>
              </div>
              <div class="ratio-item">
                <div class="label">JavaScript</div>
                <div class="bar-container">
                  <div class="bar" style="width: 70%; background-color: #9d4edd;"></div>
                  <div class="value">70% → 30%</div>
                </div>
              </div>
              <div class="ratio-item">
                <div class="label">JSON</div>
                <div class="bar-container">
                  <div class="bar" style="width: 85%; background-color: #ff6b6b;"></div>
                  <div class="value">85% → 15%</div>
                </div>
              </div>
              <div class="ratio-item">
                <div class="label">XML</div>
                <div class="bar-container">
                  <div class="bar" style="width: 82%; background-color: #2ec4b6;"></div>
                  <div class="value">82% → 18%</div>
                </div>
              </div>
              <div class="ratio-item">
                <div class="label">文本</div>
                <div class="bar-container">
                  <div class="bar" style="width: 65%; background-color: #ff9f1c;"></div>
                  <div class="value">65% → 35%</div>
                </div>
              </div>
            </div>
          </div>

          <div class="optimization-levels">
            <h3>不同压缩级别的效果</h3>
            <div class="levels-table">
              <table>
                <thead>
                  <tr>
                    <th>压缩级别</th>
                    <th>压缩率</th>
                    <th>压缩速度</th>
                    <th>解压速度</th>
                    <th>CPU消耗</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 (最快)</td>
                    <td>较低</td>
                    <td>非常快</td>
                    <td>非常快</td>
                    <td>低</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>中等</td>
                    <td>快</td>
                    <td>非常快</td>
                    <td>低</td>
                  </tr>
                  <tr>
                    <td>6 (默认)</td>
                    <td>良好</td>
                    <td>中等</td>
                    <td>非常快</td>
                    <td>中等</td>
                  </tr>
                  <tr>
                    <td>9 (最佳)</td>
                    <td>最高</td>
                    <td>慢</td>
                    <td>非常快</td>
                    <td>高</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <div class="grid-layout">
        <section class="card usage-card">
          <h2 class="section-title">使用场景</h2>

          <div class="scenarios">
            <div class="scenario">
              <div class="icon">🌐</div>
              <div>
                <h3>Web服务器</h3>
                <p>压缩HTML、CSS、JS等静态资源</p>
              </div>
            </div>
            <div class="scenario">
              <div class="icon">📱</div>
              <div>
                <h3>移动应用</h3>
                <p>减少应用更新包大小</p>
              </div>
            </div>
            <div class="scenario">
              <div class="icon">💾</div>
              <div>
                <h3>文件归档</h3>
                <p>高效压缩日志和文档</p>
              </div>
            </div>
            <div class="scenario">
              <div class="icon">📊</div>
              <div>
                <h3>数据传输</h3>
                <p>API响应和数据库备份</p>
              </div>
            </div>
          </div>

          <div class="enable-example">
            <h3>在Web服务器中启用Gzip</h3>
            <div class="server-configs">
              <div class="config">
                <h4>Nginx配置</h4>
                <pre><code>gzip on;
gzip_types text/plain text/css application/json
           application/javascript text/xml
           application/xml application/xml+rss
           text/javascript;
gzip_comp_level 6;
gzip_min_length 256;</code></pre>
              </div>
              <div class="config">
                <h4>Apache配置</h4>
                <pre><code>&lt;IfModule mod_deflate.c&gt;
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
&lt;/IfModule&gt;</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section class="card alternatives-card">
          <h2 class="section-title">替代方案比较</h2>

          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>算法</th>
                  <th>压缩率</th>
                  <th>压缩速度</th>
                  <th>解压速度</th>
                  <th>浏览器支持</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gzip</td>
                  <td>高</td>
                  <td>快</td>
                  <td>非常快</td>
                  <td>99.9%</td>
                </tr>
                <tr>
                  <td>Brotli</td>
                  <td>非常高</td>
                  <td>慢</td>
                  <td>快</td>
                  <td>96.5%</td>
                </tr>
                <tr>
                  <td>Deflate</td>
                  <td>中</td>
                  <td>快</td>
                  <td>非常快</td>
                  <td>99.9%</td>
                </tr>
                <tr>
                  <td>Zstandard</td>
                  <td>高</td>
                  <td>非常快</td>
                  <td>非常快</td>
                  <td>需JS支持</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="best-practices">
            <h3>最佳实践</h3>
            <ul>
              <li>对文本资源使用Gzip压缩</li>
              <li>对图像、视频等已压缩资源不进行二次压缩</li>
              <li>设置合适的压缩级别（通常级别6是最佳选择）</li>
              <li>使用Brotli作为Gzip的补充（对现代浏览器）</li>
              <li>设置最小压缩长度（通常256字节以上）</li>
            </ul>
          </div>
        </section>
      </div>

      <section class="card performance-card">
        <h2 class="section-title">性能影响与优化</h2>

        <div class="performance-content">
          <div class="impact">
            <h3>服务器性能影响</h3>
            <div class="impact-chart">
              <div class="metric">
                <div class="label">CPU使用率增加</div>
                <div class="bar" style="width: 15%; background-color: #ff6b6b;">15%</div>
              </div>
              <div class="metric">
                <div class="label">内存使用增加</div>
                <div class="bar" style="width: 8%; background-color: #4cc9f0;">8%</div>
              </div>
              <div class="metric">
                <div class="label">带宽节省</div>
                <div class="bar" style="width: 70%; background-color: #2ec4b6;">70%</div>
              </div>
              <div class="metric">
                <div class="label">响应时间减少</div>
                <div class="bar" style="width: 40%; background-color: #9d4edd;">40%</div>
              </div>
            </div>
          </div>

          <div class="optimization">
            <h3>优化建议</h3>
            <div class="suggestions">
              <div class="suggestion">
                <div class="icon">📦</div>
                <div>
                  <h4>预压缩静态资源</h4>
                  <p>在构建时压缩文件，减少实时压缩开销</p>
                </div>
              </div>
              <div class="suggestion">
                <div class="icon">⚙️</div>
                <div>
                  <h4>调整压缩级别</h4>
                  <p>根据服务器性能选择合适压缩级别</p>
                </div>
              </div>
              <div class="suggestion">
                <div class="icon">🔍</div>
                <div>
                  <h4>排除已压缩资源</h4>
                  <p>不对图像、视频等已压缩资源进行Gzip处理</p>
                </div>
              </div>
              <div class="suggestion">
                <div class="icon">🚀</div>
                <div>
                  <h4>使用硬件加速</h4>
                  <p>利用支持硬件加速的服务器提高性能</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Gzip压缩技术详解  | 网络性能优化核心</p>
      <div class="links">
        <a href="#">HTTP协议</a> •
        <a href="#">Web性能优化</a> •
        <a href="#">数据压缩</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 用于演示的压缩率
const compressionRatio = ref(30);
</script>

<style lang="less" scoped>

// 颜色定义
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #e9ecef;
@success-color: #2ec4b6;
@warning-color: #ff9f1c;
@error-color: #e71d36;
@compression-color: #4ecdc4;

// 基础样式
.gzip-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
  background-color: @background-light;
  color: @text-dark;
  line-height: 1.6;

  .header {
    text-align: center;
    padding: 2rem 0 3rem;
    position: relative;
    margin-bottom: 1rem;

    .title-container {
      padding: 0 2rem;

      .title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .subtitle {
        font-size: 1.3rem;
        color: @text-light;
        max-width: 700px;
        margin: 0 auto;
      }
    }

    .compression-visual {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin-top: 2rem;
      padding: 0 1rem;

      .original-data, .compressed-data {
        flex: 1;
        max-width: 400px;

        .label {
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .size-bar {
          height: 50px;
          background: linear-gradient(90deg, @primary-color, @secondary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.2rem;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: width 1s ease;
        }
      }

      .compressed-data .size-bar {
        background: linear-gradient(90deg, @success-color, darken(@success-color, 10%));
      }

      .arrow {
        font-size: 2rem;
        color: @text-light;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }

  .quick-facts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;

    .fact {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      display: flex;
      gap: 1rem;
      align-items: center;
      border-top: 3px solid @primary-color;

      .icon {
        font-size: 2rem;
        min-width: 50px;
        text-align: center;
      }

      .value {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.3rem;
        color: @primary-color;
      }

      .label {
        font-size: 0.95rem;
        color: @text-light;
      }
    }
  }

  .card {
    background-color: @card-bg;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
    border: 1px solid fade(@border-color, 50%);

    &.concept-card {
      border-top: 4px solid @primary-color;
    }

    &.benefits-card {
      border-top: 4px solid @success-color;
    }

    &.ratio-card {
      border-top: 4px solid #9d4edd;
    }

    &.usage-card {
      border-top: 4px solid @warning-color;
    }

    &.alternatives-card {
      border-top: 4px solid @accent-color;
    }

    &.performance-card {
      border-top: 4px solid #ff6b6b;
    }
  }

  .section-title {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid fade(@border-color, 50%);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, @primary-color, @secondary-color);
      border-radius: 2px;
    }
  }

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 1.8rem;
  }

  .definition {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .algorithm-components {
    margin-bottom: 1.5rem;

    h3 {
      margin-top: 0;
      font-size: 1.2rem;
      color: @text-light;
      margin-bottom: 1rem;
    }

    .components {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .component {
      background: fade(@background-light, 50%);
      padding: 1.2rem;
      border-radius: 8px;
      display: flex;
      gap: 1rem;
      align-items: center;

      .icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: @primary-color;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        flex-shrink: 0;
      }

      h4 {
        margin: 0 0 0.3rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: @text-light;
      }
    }
  }

  .file-format {
    h3 {
      margin-top: 0;
      font-size: 1.2rem;
      color: @text-light;
      margin-bottom: 1rem;
    }

    .format-visual {
      display: flex;
      border: 2px solid @border-color;
      border-radius: 8px;
      overflow: hidden;

      > div {
        padding: 1rem;
        text-align: center;
        font-weight: 500;
      }

      .header {
        background: fade(@primary-color, 10%);
        min-width: 120px;
        border-right: 2px solid @border-color;
      }

      .body {
        flex: 1;
        background: fade(@success-color, 10%);
      }

      .footer {
        background: fade(@warning-color, 10%);
        min-width: 120px;
        border-left: 2px solid @border-color;
      }
    }
  }

  .benefits {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;

    .benefit {
      background: white;
      border-radius: 8px;
      padding: 1.2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      display: flex;
      gap: 1rem;
      align-items: center;

      .icon {
        font-size: 1.8rem;
        min-width: 50px;
        text-align: center;
      }

      h3 {
        margin: 0 0 0.3rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: @text-light;
      }
    }
  }

  .speed-comparison {
    h3 {
      margin-top: 0;
      font-size: 1.2rem;
      color: @text-light;
      margin-bottom: 1rem;
    }

    .comparison-chart {
      .algorithm {
        display: flex;
        align-items: center;
        margin-bottom: 0.8rem;

        .name {
          width: 120px;
          font-weight: 500;
        }

        .bar {
          height: 30px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 1rem;
          color: white;
          font-weight: 500;
          min-width: 50px;
          transition: width 1s ease;
        }
      }
    }
  }

  .ratio-card {
    .ratio-analysis {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .ratio-bars {
      .ratio-item {
        margin-bottom: 1.2rem;

        .label {
          font-weight: 500;
          margin-bottom: 0.3rem;
        }

        .bar-container {
          display: flex;
          align-items: center;

          .bar {
            height: 25px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 0.5rem;
            color: white;
            font-weight: 500;
            min-width: 50px;
          }

          .value {
            margin-left: 1rem;
            font-size: 0.9rem;
            color: @text-light;
          }
        }
      }
    }

    .levels-table {
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 0.8rem;
          text-align: left;
          border-bottom: 1px solid @border-color;
        }

        th {
          background: fade(@primary-color, 8%);
          color: @primary-color;
          font-weight: 600;
        }

        tr:nth-child(even) {
          background: fade(@background-light, 50%);
        }
      }
    }
  }

  .scenarios {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;

    .scenario {
      background: white;
      border-radius: 8px;
      padding: 1.2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      display: flex;
      gap: 1rem;
      align-items: center;

      .icon {
        font-size: 1.8rem;
        min-width: 50px;
        text-align: center;
      }

      h3 {
        margin: 0 0 0.3rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: @text-light;
      }
    }
  }

  .enable-example {
    h3 {
      margin-top: 0;
      font-size: 1.2rem;
      color: @text-light;
      margin-bottom: 1rem;
    }

    .server-configs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .config {
        background: #f8f9ff;
        border-radius: 8px;
        overflow: hidden;

        h4 {
          background: linear-gradient(135deg, @primary-color, @secondary-color);
          color: white;
          margin: 0;
          padding: 0.8rem 1.2rem;
          font-size: 1rem;
          font-weight: 500;
        }

        pre {
          margin: 0;
          padding: 1.2rem;
          overflow: auto;

          code {
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.9rem;
            display: block;
          }
        }
      }
    }
  }

  .comparison-table {
    overflow-x: auto;
    margin-bottom: 1.5rem;

    table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 0.8rem;
        text-align: left;
        border-bottom: 1px solid @border-color;
      }

      th {
        background: fade(@primary-color, 8%);
        color: @primary-color;
        font-weight: 600;
      }

      tr:nth-child(even) {
        background: fade(@background-light, 50%);
      }
    }
  }

  .best-practices {
    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.7rem;
        padding-left: 0.5rem;
        position: relative;

        &::before {
          content: '✓';
          position: absolute;
          left: -1.5rem;
          color: @success-color;
          font-weight: bold;
        }
      }
    }
  }

  .performance-card {
    .performance-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .impact {
      h3 {
        margin-top: 0;
        font-size: 1.2rem;
        color: @text-light;
        margin-bottom: 1rem;
      }

      .impact-chart {
        .metric {
          margin-bottom: 1.2rem;

          .label {
            font-weight: 500;
            margin-bottom: 0.3rem;
          }

          .bar {
            height: 25px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 0.5rem;
            color: white;
            font-weight: 500;
            min-width: 50px;
          }
        }
      }
    }

    .optimization {
      h3 {
        margin-top: 0;
        font-size: 1.2rem;
        color: @text-light;
        margin-bottom: 1rem;
      }

      .suggestions {
        .suggestion {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.2rem;
          align-items: center;

          .icon {
            font-size: 1.8rem;
            min-width: 50px;
            text-align: center;
          }

          h4 {
            margin: 0 0 0.3rem;
            font-size: 1.1rem;
          }

          p {
            margin: 0;
            font-size: 0.95rem;
            color: @text-light;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    color: @text-light;
    font-size: 0.9rem;
    border-top: 1px solid @border-color;

    .links {
      margin-top: 0.5rem;

      a {
        color: @primary-color;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .gzip-container {
    padding: 0 1rem 2rem;

    .header {
      padding: 1.5rem 0 2rem;

      .title {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }

      .compression-visual {
        flex-direction: column;
        gap: 1rem;

        .original-data, .compressed-data {
          max-width: 100%;
        }
      }
    }

    .grid-layout {
      grid-template-columns: 1fr;
    }

    .ratio-card .ratio-analysis {
      grid-template-columns: 1fr;
    }

    .performance-card .performance-content {
      grid-template-columns: 1fr;
    }

    .card {
      padding: 1.5rem;
    }
  }
}
</style>
