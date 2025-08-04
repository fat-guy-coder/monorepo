<template>
  <div class="download-guide">
    <header>
      <h1>前端文件下载方案基本介绍</h1>
      <p>探索多种前端文件下载实现方式及其适用场景</p>
    </header>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="info-card">
          <h2>前端下载概述</h2>
          <p>文件下载是Web应用中常见的功能需求，根据不同场景需求，前端有多种实现方案。本指南将详细介绍四种主流下载方案，包括实现原理、代码示例及适用场景。</p>
        </div>
      </div>

      <div class="schemes-container">
        <!-- 方案1: a标签下载 -->
        <div class="scheme-card">
          <div class="scheme-header">
            <div class="scheme-number">01</div>
            <h2>使用a标签下载</h2>
            <div class="scheme-tag">简单易用</div>
          </div>

          <div class="scheme-content">
            <div class="description">
              <h3>实现原理</h3>
              <p>利用HTML5的download属性，通过创建a标签模拟点击实现下载。</p>

              <h3>实现代码</h3>
              <pre class="code-block">function downloadByAnchor(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}</pre>

              <h3>使用场景</h3>
              <ul>
                <li>下载静态服务器文件</li>
                <li>文件URL已知且无需认证</li>
                <li>简单场景下的快速实现</li>
              </ul>
            </div>

            <div class="demo">
              <button @click="downloadByAnchorDemo">下载示例文本文件</button>
              <div class="limitation">
                <h4>局限性</h4>
                <p>无法下载跨域资源，无法设置请求头，无法处理大文件</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 方案2: location.href下载 -->
        <div class="scheme-card">
          <div class="scheme-header">
            <div class="scheme-number">02</div>
            <h2>使用location.href下载</h2>
            <div class="scheme-tag">快速直接</div>
          </div>

          <div class="scheme-content">
            <div class="description">
              <h3>实现原理</h3>
              <p>通过修改window.location.href触发浏览器下载行为。</p>

              <h3>实现代码</h3>
              <pre class="code-block">function downloadByLocation(url: string) {
  window.location.href = url;
  // 或者在新标签页打开
  // window.open(url, '_blank');
}</pre>

              <h3>使用场景</h3>
              <ul>
                <li>简单文件下载需求</li>
                <li>无需控制下载过程</li>
                <li>兼容性要求高的场景</li>
              </ul>
            </div>

            <div class="demo">
              <button @click="downloadByLocationDemo">下载示例图片</button>
              <div class="limitation">
                <h4>局限性</h4>
                <p>无法设置文件名，页面会跳转或打开新标签页</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 方案3: Blob对象下载 -->
        <div class="scheme-card">
          <div class="scheme-header">
            <div class="scheme-number">03</div>
            <h2>使用Blob对象下载</h2>
            <div class="scheme-tag">灵活强大</div>
          </div>

          <div class="scheme-content">
            <div class="description">
              <h3>实现原理</h3>
              <p>通过Fetch API获取数据，创建Blob对象，使用URL.createObjectURL生成临时URL进行下载。</p>

              <h3>实现代码</h3>
              <pre class="code-block">async function downloadByBlob(url: string, filename: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.click();

  // 清理内存
  URL.revokeObjectURL(objectUrl);
}</pre>

              <h3>使用场景</h3>
              <ul>
                <li>需要设置请求头的下载</li>
                <li>下载后端API返回的文件</li>
                <li>需要处理二进制数据</li>
              </ul>
            </div>

            <div class="demo">
              <button @click="downloadByBlobDemo">下载JSON数据</button>
              <div class="limitation">
                <h4>局限性</h4>
                <p>大文件可能导致内存问题，需要手动清理对象URL</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 方案4: FileSaver.js库 -->
        <div class="scheme-card">
          <div class="scheme-header">
            <div class="scheme-number">04</div>
            <h2>使用FileSaver.js库</h2>
            <div class="scheme-tag">专业可靠</div>
          </div>

          <div class="scheme-content">
            <div class="description">
              <h3>实现原理</h3>
              <p>FileSaver.js封装了多种下载方案，自动选择最佳实现方式，提供简单易用的API。</p>

              <h3>实现代码</h3>
              <pre class="code-block">import { saveAs } from 'file-saver';

// 保存文本
saveAs(new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' }), 'hello.txt');

// 保存图片
saveAs('https://example.com/image.png', 'image.png');</pre>

              <h3>使用场景</h3>
              <ul>
                <li>复杂下载需求</li>
                <li>需要良好兼容性</li>
                <li>需要处理大文件或特殊文件类型</li>
              </ul>
            </div>

            <div class="demo">
              <button @click="downloadByFileSaverDemo">使用FileSaver下载</button>
              <div class="limitation">
                <h4>优势</h4>
                <p>兼容性好，支持大文件，自动处理内存释放</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 方案5: 大文件流式下载 -->
      <div class="scheme-card">
        <div class="scheme-header">
          <div class="scheme-number">05</div>
          <h2>使用流式下载</h2>
          <div class="scheme-tag">高效稳定</div>
        </div>
        <div class="scheme-content">
          <div class="description">
            <h3>实现原理</h3>
            <p>通过流式下载，可以实现大文件的下载，并且可以实时显示下载进度。</p>
          </div>
        </div>
        <h3>实现代码</h3>
        <pre class="code-block">
          const response = await fetch(url);
          const reader = response.body.getReader();
          const totalSize = response.headers.get('content-length');
          let received = 0;
          const chunks = [];

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            received += value.length;
            chunks.push(value);
            const progress = (received / totalSize) * 100;
            console.log(`Downloaded ${received} bytes (${progress.toFixed(2)}%)`);
          }
          const blob = new Blob(chunks);
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'file.txt';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        </pre>
        <h3>使用场景</h3>
        <ul>
          <li>大文件下载</li>
          <li>需要实时显示下载进度</li>
          <li>需要处理大文件或特殊文件类型</li>
        </ul>
        <div class="limitation">
          <h4>局限性</h4>
          <p>需要手动处理大文件的内存管理</p>
        </div>
        <div class="demo">
          <div class="limitation">
            <h4>优势</h4>
            <p>支持大文件，自动处理内存释放</p>
          </div>
        </div>
      </div>
      <div class="comparison-section">
        <h2>下载方案对比</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>方案</th>
                <th>兼容性</th>
                <th>灵活性</th>
                <th>内存管理</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>a标签下载</td>
                <td>优秀</td>
                <td>低</td>
                <td>自动</td>
                <td>简单静态文件</td>
              </tr>
              <tr>
                <td>location.href</td>
                <td>优秀</td>
                <td>低</td>
                <td>自动</td>
                <td>快速简单下载</td>
              </tr>
              <tr>
                <td>Blob对象</td>
                <td>良好</td>
                <td>高</td>
                <td>需手动释放</td>
                <td>API返回文件</td>
              </tr>
              <tr>
                <td>FileSaver.js</td>
                <td>优秀</td>
                <td>高</td>
                <td>自动</td>
                <td>复杂专业场景</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="best-practices">
        <h2>最佳实践建议</h2>
        <div class="practices-grid">
          <div class="practice-card">
            <div class="icon">📝</div>
            <h3>设置正确MIME类型</h3>
            <p>确保Content-Type正确，避免文件损坏</p>
          </div>
          <div class="practice-card">
            <div class="icon">🔒</div>
            <h3>处理认证</h3>
            <p>需要认证的下载使用Blob方式</p>
          </div>
          <div class="practice-card">
            <div class="icon">📊</div>
            <h3>大文件分片</h3>
            <p>超大文件考虑分片下载</p>
          </div>
          <div class="practice-card">
            <div class="icon">🚫</div>
            <h3>内存管理</h3>
            <p>使用Blob后及时释放内存</p>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>前端下载方案指南 © 2023 | 使用Vue3 + TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 模拟下载功能
const downloadByAnchorDemo = () => {
  const content = '这是通过a标签下载的示例文本内容';
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'a-tag-demo.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 清理内存
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

const downloadByLocationDemo = () => {
  // 使用一个公开的测试图片
  window.open('https://picsum.photos/200/300', '_blank');
};

const downloadByBlobDemo = async () => {
  // 创建示例JSON数据
  const data = {
    name: '示例数据',
    timestamp: new Date().toISOString(),
    value: Math.random()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'data-demo.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 清理内存
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

const downloadByFileSaverDemo = async () => {
  // 实际项目中需要安装file-saver
  // import { saveAs } from 'file-saver';

  // 模拟FileSaver的功能
  const content = 'FileSaver.js提供简单易用的文件下载API';
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'file-saver-demo.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 清理内存
  setTimeout(() => URL.revokeObjectURL(url), 100);
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.download-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
  background-color: #fafafa;
  min-height: 100vh;

  header {
    text-align: center;
    margin-bottom: 40px;
    padding: 30px 20px;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    border-radius: 12px;
    color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .content-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 30px;
  }

  .intro-section {
    margin-bottom: 40px;

    .info-card {
      background: linear-gradient(120deg, #e0f7fa, #f5f5f5);
      border-radius: 12px;
      padding: 25px;
      border-left: 4px solid #29b6f6;

      h2 {
        font-size: 1.8rem;
        color: #0066cc;
        margin-bottom: 15px;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #444;
      }
    }
  }

  .schemes-container {
    display: grid;
    gap: 30px;
    margin-bottom: 50px;
  }

  .scheme-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: white;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
    }
  }

  .scheme-header {
    display: flex;
    align-items: center;
    padding: 20px 25px;
    background: linear-gradient(to right, #f5f7fa, #e4e7f0);
    border-bottom: 1px solid #eaeaea;

    .scheme-number {
      font-size: 2rem;
      font-weight: 700;
      color: #3f51b5;
      margin-right: 15px;
      min-width: 50px;
    }

    h2 {
      font-size: 1.5rem;
      margin: 0;
      flex-grow: 1;
      color: #2c3e50;
    }

    .scheme-tag {
      background: #3f51b5;
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
    }
  }

  .scheme-content {
    display: flex;
    padding: 25px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .description {
      flex: 3;
      padding-right: 25px;

      h3 {
        font-size: 1.2rem;
        color: #3f51b5;
        margin-top: 20px;
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 1px dashed #e0e0e0;
      }

      p,
      ul {
        font-size: 1rem;
        line-height: 1.6;
        color: #444;
      }

      ul {
        padding-left: 20px;

        li {
          margin-bottom: 8px;
          position: relative;

          &::before {
            content: '•';
            color: #3f51b5;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }
    }

    .demo {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 250px;

      button {
        background: linear-gradient(to right, #3f51b5, #2196f3);
        color: white;
        border: none;
        padding: 12px 25px;
        font-size: 1rem;
        font-weight: 500;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 100%;
        max-width: 220px;
        box-shadow: 0 4px 10px rgba(63, 81, 181, 0.25);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(63, 81, 181, 0.35);
        }

        &:active {
          transform: translateY(1px);
        }
      }

      .limitation {
        margin-top: 25px;
        padding: 15px;
        background: #f9f9f9;
        border-radius: 8px;
        border-left: 3px solid #ff9800;
        width: 100%;

        h4 {
          margin-top: 0;
          margin-bottom: 10px;
          color: #ff9800;
          font-size: 1.1rem;
        }

        p {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
          line-height: 1.5;
        }
      }
    }
  }

  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    overflow-x: auto;
    line-height: 1.5;
    margin: 15px 0;
  }

  .comparison-section {
    margin: 50px 0;

    h2 {
      text-align: center;
      font-size: 1.8rem;
      color: #2c3e50;
      margin-bottom: 30px;
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 80px;
        height: 4px;
        background: linear-gradient(to right, #3f51b5, #2196f3);
        margin: 10px auto 0;
        border-radius: 2px;
      }
    }

    .comparison-table {
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        overflow: hidden;

        th,
        td {
          padding: 16px 20px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        thead {
          background: linear-gradient(to right, #3f51b5, #2196f3);
          color: white;

          th {
            font-weight: 600;
            font-size: 1.05rem;
          }
        }

        tbody {
          tr {
            &:nth-child(even) {
              background-color: #f9f9f9;
            }

            &:hover {
              background-color: #f0f4ff;
            }

            td:first-child {
              font-weight: 500;
              color: #3f51b5;
            }
          }
        }
      }
    }
  }

  .best-practices {
    margin: 50px 0 30px;

    h2 {
      text-align: center;
      font-size: 1.8rem;
      color: #2c3e50;
      margin-bottom: 30px;
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 80px;
        height: 4px;
        background: linear-gradient(to right, #3f51b5, #2196f3);
        margin: 10px auto 0;
        border-radius: 2px;
      }
    }

    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
    }

    .practice-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
      border-top: 3px solid #3f51b5;

      &:hover {
        transform: translateY(-8px);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h3 {
        font-size: 1.2rem;
        margin: 10px 0;
        color: #2c3e50;
      }

      p {
        color: #666;
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 0;
      }
    }
  }

  footer {
    text-align: center;
    margin-top: 50px;
    padding: 20px;
    color: #666;
    font-size: 0.9rem;
    border-top: 1px solid #eee;
  }
}
</style>
