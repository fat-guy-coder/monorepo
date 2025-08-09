<template>
  <div class="canvas-data-container">
    <header class="header">
      <h1>Canvas 数据流处理详解</h1>
      <p>掌握 Canvas 数据的获取、转换与处理技巧</p>
    </header>

    <div class="content-grid">
      <!-- 介绍部分 -->
      <section class="card intro">
        <div class="section-header">
          <div class="icon">🎨</div>
          <h2>Canvas 数据流介绍</h2>
        </div>
        <div class="content">
          <div class="definition">
            <p>Canvas 数据流处理指的是从 HTML5 Canvas 元素获取图像数据，并将其转换为各种格式（如 ImageData、Data URL、Blob、ArrayBuffer 等）的技术。</p>
          </div>

          <div class="workflow">
            <h3>数据处理流程</h3>
            <div class="workflow-steps">
              <div class="step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h4>获取 Canvas 上下文</h4>
                  <p>访问 Canvas 的绘图上下文</p>
                </div>
              </div>
              <div class="step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h4>提取图像数据</h4>
                  <p>使用 getImageData() 方法</p>
                </div>
              </div>
              <div class="step">
                <div class="step-icon">3</div>
                <div class="step-content">
                  <h4>转换数据格式</h4>
                  <p>转换为所需格式</p>
                </div>
              </div>
              <div class="step">
                <div class="step-icon">4</div>
                <div class="step-content">
                  <h4>应用处理结果</h4>
                  <p>渲染、存储或传输</p>
                </div>
              </div>
            </div>
          </div>

          <div class="data-types">
            <h3>支持的数据类型</h3>
            <div class="types-grid">
              <div class="type">ImageData</div>
              <div class="type">Data URL</div>
              <div class="type">Blob</div>
              <div class="type">File</div>
              <div class="type">ArrayBuffer</div>
              <div class="type">Image 对象</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ImageData 处理 -->
      <section class="card image-data">
        <div class="section-header">
          <div class="icon">🖼️</div>
          <h2>ImageData 处理</h2>
        </div>
        <div class="content">
          <div class="explanation">
            <p>ImageData 对象包含 Canvas 像素的原始数据，每个像素由四个值表示（RGBA）。</p>
          </div>

          <div class="usage-grid">
            <div class="usage-card">
              <h3>获取 ImageData</h3>
              <pre><code>// 获取整个 Canvas 的图像数据
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// 获取部分区域
const partialData = ctx.getImageData(50, 50, 100, 100);</code></pre>
            </div>

            <div class="usage-card">
              <h3>操作像素数据</h3>
              <pre><code>// 访问像素数据
const data = imageData.data;

// 遍历所有像素 (每4个值代表一个像素)
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];     // 红色 (0-255)
  const g = data[i+1];   // 绿色
  const b = data[i+2];   // 蓝色
  const a = data[i+3];   // 透明度

  // 示例：转换为灰度
  const gray = 0.299 * r + 0.587 * g + 0.114 * b;
  data[i] = data[i+1] = data[i+2] = gray;
}

// 将修改后的数据放回 Canvas
ctx.putImageData(imageData, 0, 0);</code></pre>
            </div>
          </div>

          <div class="performance-tip">
            <h3>性能优化技巧</h3>
            <ul>
              <li>只处理需要更新的区域</li>
              <li>使用 Web Workers 处理大型图像</li>
              <li>避免在循环中创建临时对象</li>
              <li>使用 TypedArray 操作像素数据</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 数据转换 -->
      <section class="card conversion">
        <div class="section-header">
          <div class="icon">🔄</div>
          <h2>数据格式转换</h2>
        </div>
        <div class="content">
          <div class="conversion-grid">
            <div class="conversion-card">
              <div class="conversion-header">
                <div class="conversion-icon">🔗</div>
                <h3>转换为 Data URL</h3>
              </div>
              <pre><code>// 获取 Data URL (默认 PNG)
const dataURL = canvas.toDataURL();
console.log(dataURL); // "data:image/png;base64,..."

// 指定格式和质量 (JPEG)
const jpegURL = canvas.toDataURL('image/jpeg', 0.9);

// 使用示例
const img = document.createElement('img');
img.src = dataURL;
document.body.appendChild(img);</code></pre>
            </div>

            <div class="conversion-card">
              <div class="conversion-header">
                <div class="conversion-icon">📷</div>
                <h3>转换为 Image 对象</h3>
              </div>
              <pre><code>// 通过 Data URL 创建图像
function canvasToImage(canvas) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = canvas.toDataURL();
  });
}

// 使用示例
canvasToImage(canvas)
  .then(img => {
    document.body.appendChild(img);
  });</code></pre>
            </div>

            <div class="conversion-card">
              <div class="conversion-header">
                <div class="conversion-icon">📦</div>
                <h3>转换为 Blob</h3>
              </div>
              <pre><code>// 获取 Blob 对象
canvas.toBlob((blob) => {
  console.log('Blob size:', blob.size);
  console.log('Blob type:', blob.type);

  // 使用示例：上传到服务器
  const formData = new FormData();
  formData.append('image', blob, 'canvas-image.png');

  fetch('/upload', {
    method: 'POST',
    body: formData
  });
}, 'image/png', 0.9);</code></pre>
            </div>

            <div class="conversion-card">
              <div class="conversion-header">
                <div class="conversion-icon">📄</div>
                <h3>转换为 File</h3>
              </div>
              <pre><code>// 先获取 Blob，然后创建 File
canvas.toBlob((blob) => {
  const file = new File([blob], 'canvas-image.png', {
    type: 'image/png',
    lastModified: Date.now()
  });

  console.log('File name:', file.name);
  console.log('File size:', file.size);

  // 使用示例：文件下载
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(url);
}, 'image/png');</code></pre>
            </div>

            <div class="conversion-card">
              <div class="conversion-header">
                <div class="conversion-icon">💾</div>
                <h3>转换为 ArrayBuffer</h3>
              </div>
              <pre><code>// 通过 Blob 获取 ArrayBuffer
canvas.toBlob((blob) => {
  const reader = new FileReader();
  reader.onload = () => {
    const arrayBuffer = reader.result;
    console.log('ArrayBuffer length:', arrayBuffer.byteLength);

    // 使用示例：WebSocket 发送
    socket.send(arrayBuffer);
  };
  reader.readAsArrayBuffer(blob);
}, 'image/png');</code></pre>
            </div>

            <div class="conversion-card">
              <div class="conversion-header">
                <div class="conversion-icon">🎞️</div>
                <h3>转换为视频帧</h3>
              </div>
              <pre><code>// 使用 ImageData 创建视频帧
async function canvasToVideoFrame(canvas) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // 创建 VideoFrame
  return new VideoFrame(
    new ImageBitmap(imageData),
    { timestamp: 0 }
  );
}

// 使用示例 (需要浏览器支持)
const frame = await canvasToVideoFrame(canvas);
videoProcessor.process(frame);
frame.close();</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="card scenarios">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>使用场景</h2>
        </div>
        <div class="content">
          <div class="scenario-grid">
            <div class="scenario">
              <div class="scenario-icon">1</div>
              <h3>图像处理应用</h3>
              <p>获取像素数据实现滤镜和特效</p>
              <pre><code>// 应用复古滤镜
function applySepia(imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];

    data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
    data[i+1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
    data[i+2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
  }
  return imageData;
}</code></pre>
            </div>

            <div class="scenario">
              <div class="scenario-icon">2</div>
              <h3>截图与保存</h3>
              <p>将 Canvas 内容保存为图片文件</p>
              <pre><code>// 保存 Canvas 为 PNG
function saveAsPNG(canvas, filename) {
  const link = document.createElement('a');
  link.download = filename || 'canvas-image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// 保存为 JPEG
function saveAsJPEG(canvas, filename, quality = 0.92) {
  const link = document.createElement('a');
  link.download = filename || 'canvas-image.jpg';
  link.href = canvas.toDataURL('image/jpeg', quality);
  link.click();
}</code></pre>
            </div>

            <div class="scenario">
              <div class="scenario-icon">3</div>
              <h3>实时视频处理</h3>
              <p>处理摄像头或视频流的帧数据</p>
              <pre><code>// 处理视频帧
function processVideoFrame(video, canvas) {
  const ctx = canvas.getContext('2d');

  // 绘制视频帧到 Canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // 获取并处理图像数据
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  processFrame(imageData);

  // 将处理后的数据放回
  ctx.putImageData(imageData, 0, 0);

  // 循环处理下一帧
  requestAnimationFrame(() => processVideoFrame(video, canvas));
}</code></pre>
            </div>

            <div class="scenario">
              <div class="scenario-icon">4</div>
              <h3>OCR 与图像分析</h3>
              <p>提取像素数据进行文字识别</p>
              <pre><code>// 准备图像数据用于 OCR
async function prepareForOCR(canvas) {
  // 转换为灰度
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i+1] + data[i+2]) / 3;
    data[i] = data[i+1] = data[i+2] = avg;
  }

  ctx.putImageData(imageData, 0, 0);

  // 转换为 Blob 发送到 OCR API
  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/png');
  });
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 性能优化 -->
      <section class="card performance">
        <div class="section-header">
          <div class="icon">⚡</div>
          <h2>性能优化</h2>
        </div>
        <div class="content">
          <div class="optimization-grid">
            <div class="optimization">
              <div class="optimization-icon">1</div>
              <h3>减少 getImageData 调用</h3>
              <p>避免频繁调用，只在必要时获取数据</p>
            </div>
            <div class="optimization">
              <div class="optimization-icon">2</div>
              <h3>使用离屏 Canvas</h3>
              <p>在后台处理复杂操作</p>
            </div>
            <div class="optimization">
              <div class="optimization-icon">3</div>
              <h3>优化像素处理循环</h3>
              <p>使用 TypedArray 和 WebAssembly</p>
            </div>
            <div class="optimization">
              <div class="optimization-icon">4</div>
              <h3>数据压缩</h3>
              <p>使用合适的图像格式和质量</p>
            </div>
          </div>

          <div class="code-optimization">
            <h3>优化像素处理</h3>
            <div class="code-comparison">
              <div class="code-example">
                <h4>优化前</h4>
                <pre><code>for (let i = 0; i < data.length; i += 4) {
  // 每次计算像素索引
  const r = data[i];
  const g = data[i+1];
  const b = data[i+2];
  // 处理逻辑...
}</code></pre>
              </div>
              <div class="code-example">
                <h4>优化后</h4>
                <pre><code>const len = data.length;
// 使用局部变量缓存长度
for (let i = 0; i < len; i += 4) {
  // 一次读取所有通道
  const r = data[i], g = data[i+1], b = data[i+2];
  // 处理逻辑...
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="card considerations">
        <div class="section-header">
          <div class="icon">⚠️</div>
          <h2>注意事项</h2>
        </div>
        <div class="content">
          <div class="do-dont">
            <div class="do">
              <h3>最佳实践</h3>
              <ul>
                <li>使用 requestAnimationFrame 进行动画</li>
                <li>处理跨域图像时设置 crossOrigin 属性</li>
                <li>及时释放不再需要的对象 URL</li>
                <li>使用 Web Workers 处理大型图像</li>
                <li>对用户操作提供视觉反馈</li>
              </ul>
            </div>

            <div class="dont">
              <h3>避免做法</h3>
              <ul>
                <li>在主线程处理大型图像</li>
                <li>频繁调用 getImageData/putImageData</li>
                <li>忘记释放对象 URL 导致内存泄漏</li>
                <li>使用过高的图像质量参数</li>
                <li>忽略跨域安全限制</li>
              </ul>
            </div>
          </div>

          <div class="security">
            <h3>安全限制</h3>
            <ul>
              <li>跨域图像数据访问受限（tainted canvas）</li>
              <li>某些浏览器限制 Canvas 大小</li>
              <li>文件系统访问需要用户授权</li>
              <li>大量数据处理可能阻塞页面</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="summary">
        <h3>关键要点</h3>
        <p>Canvas 数据流处理是 Web 图像操作的核心技术。掌握 ImageData 的获取与操作，以及各种格式的转换方法，可以解锁强大的图像处理能力。合理优化性能并注意安全限制，可以创建高效的 Canvas 应用。</p>
      </div>
      <div class="copyright">Canvas 数据流处理 | 现代 Web 图像处理的基础</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑为空，仅用于展示
</script>

<style lang="less" scoped>
.canvas-data-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: #f8fafc;
  color: #2d3748;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 32px;
  padding: 28px;
  background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.4rem;
    margin: 0 0 12px;
    color: #1e40af;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    color: #4b5563;
    margin: 0;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 28px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;

  .icon {
    font-size: 1.8rem;
    margin-right: 16px;
    color: #3b82f6;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #dbeafe;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.6rem;
    margin: 0;
    color: #1e40af;
  }
}

/* 介绍部分样式 */
.intro {
  .definition {
    p {
      font-size: 1.1rem;
      margin-bottom: 24px;
      line-height: 1.7;
    }
  }

  .workflow {
    margin-bottom: 24px;

    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .workflow-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .step {
      display: flex;
      align-items: flex-start;
      background: #f0f9ff;
      border-radius: 12px;
      padding: 16px;
      border: 1px solid #dbeafe;

      .step-icon {
        width: 36px;
        height: 36px;
        background: #3b82f6;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 16px;
        flex-shrink: 0;
      }

      h4 {
        margin: 0 0 8px;
        font-size: 1.1rem;
        color: #1e40af;
      }

      p {
        margin: 0;
        color: #4b5563;
        font-size: 0.95rem;
      }
    }
  }

  .data-types {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .types-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
    }

    .type {
      background: #e0f2fe;
      border-radius: 8px;
      padding: 12px;
      text-align: center;
      font-weight: 500;
      color: #1e40af;
    }
  }
}

/* ImageData 部分样式 */
.image-data {
  .explanation {
    p {
      font-size: 1.1rem;
      margin-bottom: 24px;
      line-height: 1.7;
    }
  }

  .usage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .usage-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.2rem;
      margin: 0 0 16px;
      color: #1e40af;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }
  }

  .performance-tip {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    ul {
      padding-left: 24px;
      margin: 0;

      li {
        margin-bottom: 12px;
        position: relative;
        padding-left: 12px;

        &::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #3b82f6;
          font-weight: bold;
        }
      }
    }
  }
}

/* 数据转换样式 */
.conversion {
  .conversion-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .conversion-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;

    .conversion-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      .conversion-icon {
        font-size: 1.8rem;
        margin-right: 12px;
        color: #3b82f6;
      }

      h3 {
        margin: 0;
        font-size: 1.2rem;
        color: #1e40af;
      }
    }
  }
}

/* 使用场景样式 */
.scenarios {
  .scenario-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .scenario {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #e2e8f0;
    position: relative;

    .scenario-icon {
      position: absolute;
      top: -12px;
      left: -12px;
      width: 30px;
      height: 30px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-size: 1.2rem;
      margin: 0 0 12px;
      color: #1e40af;
    }

    p {
      margin: 0 0 16px;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

/* 性能优化样式 */
.performance {
  .optimization-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
  }

  .optimization {
    display: flex;
    align-items: center;
    background: #f0f9ff;
    border-radius: 12px;
    padding: 16px;
    border: 1px solid #dbeafe;

    .optimization-icon {
      width: 36px;
      height: 36px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.1rem;
      margin-right: 16px;
      flex-shrink: 0;
    }

    h3 {
      font-size: 1.1rem;
      margin: 0 0 8px;
      color: #1e40af;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.9rem;
    }
  }

  .code-optimization {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .code-comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .code-example {
      h4 {
        font-size: 1.1rem;
        margin: 0 0 12px;
        color: #1e40af;
      }
    }
  }
}

/* 注意事项样式 */
.considerations {
  .do-dont {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .do, .dont {
      padding: 20px;
      border-radius: 12px;

      h3 {
        font-size: 1.3rem;
        margin: 0 0 16px;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 10px;
          color: #4b5563;
        }
      }
    }

    .do {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;

      h3 {
        color: #065f46;
      }
    }

    .dont {
      background: #fef2f2;
      border: 1px solid #fecaca;

      h3 {
        color: #b91c1c;
      }
    }
  }

  .security {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    ul {
      padding-left: 24px;
      margin: 0;

      li {
        margin-bottom: 12px;
        position: relative;
        padding-left: 12px;

        &::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #3b82f6;
          font-weight: bold;
        }
      }
    }
  }
}

/* 代码块通用样式 */
pre {
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 16px;

  code {
    color: #cbd5e1;
  }
}

/* 页脚样式 */
.footer {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 24px;

  .summary {
    max-width: 800px;
    margin: 0 auto 20px;

    h3 {
      font-size: 1.4rem;
      margin: 0 0 16px;
      color: #2563eb;
      text-align: center;
    }

    p {
      font-size: 1.1rem;
      color: #4b5563;
      margin: 0;
      line-height: 1.7;
    }
  }

  .copyright {
    font-size: 0.95rem;
    color: #64748b;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
    text-align: center;
  }
}
</style>
