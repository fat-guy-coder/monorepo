<template>
  <div class="data-stream-container">
    <header class="header">
      <h1>前端数据流基本指南</h1>
      <p class="subtitle">深入解析Blob、File、DataURL、Canvas和ArrayBuffer</p>
    </header>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="intro-card">
          <div class="definition">
            <div class="stream-icon">🌊</div>
            <div>
              <h2>什么是前端数据流？</h2>
              <p>
                前端数据流是Web应用中处理二进制和媒体数据的各种格式和API。这些数据格式允许我们在浏览器中高效地处理文件、图像、视频和其他二进制数据。
              </p>
              <div class="feature">
                <span class="feature-tag">二进制数据处理</span>
                <span class="feature-tag">文件操作</span>
                <span class="feature-tag">图像处理</span>
                <span class="feature-tag">高效传输</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="data-types-section">
        <h2 class="section-title">数据流类型基础介绍</h2>

        <div class="type-grid">
          <div class="type-card">
            <div class="type-header blob">
              <h3>Blob (Binary Large Object)</h3>
              <h4>Blob 对象表示一个不可变、原始数据的类文件对象。</h4>
            </div>
            <div class="type-content">
              <div class="characteristics">
                <h4>特点：</h4>
                <ul>
                  <li>表示不可变的原始数据</li>
                  <li>可以包含任何类型的数据</li>
                  <li>支持分片操作 (slice)</li>
                  <li>不包含元数据</li>
                </ul>
              </div>
              <div class="use-cases">
                <h4>使用场景：</h4>
                <ul>
                  <li>文件分片上传</li>
                  <li>存储二进制数据</li>
                  <li>生成可下载内容</li>
                  <li>图片处理中间格式</li>
                </ul>
              </div>
              <div class="example">
                <h4>示例：</h4>
                <pre class="code-block">
// 创建Blob对象
const blob = new Blob(['Hello, World!'], { type: 'text/plain' });

// 创建下载链接
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'hello.txt';
a.click();</pre
                >
              </div>
            </div>
          </div>

          <div class="type-card">
            <div class="type-header file">
              <h3>File</h3>
              <h4>File 对象表示一个文件，继承自 Blob。</h4>
            </div>
            <div class="type-content">
              <div class="characteristics">
                <h4>特点：</h4>
                <ul>
                  <li>继承自Blob</li>
                  <li>包含文件元数据（名称、类型、大小等）</li>
                  <li>通常来自用户文件选择</li>
                  <li>支持文件读取API</li>
                </ul>
              </div>
              <div class="use-cases">
                <h4>使用场景：</h4>
                <ul>
                  <li>文件上传功能</li>
                  <li>图像预览处理</li>
                  <li>文件内容分析</li>
                  <li>客户端文件操作</li>
                </ul>
              </div>
              <div class="example">
                <h4>示例：</h4>
                <pre class="code-block">
// 获取文件输入
const fileInput = document.querySelector('input[type="file"]');

// 处理文件选择
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  console.log(`文件名: ${file.name}, 类型: ${file.type}, 大小: ${file.size}字节`);

  // 读取文件内容
  const reader = new FileReader();
  reader.onload = () => {
    console.log('文件内容:', reader.result);
  };
  reader.readAsText(file);
});</pre
                >
              </div>
            </div>
          </div>

          <div class="type-card">
            <div class="type-header dataurl">
              <h3>DataURL</h3>
              <h4>DataURL 是一种将二进制数据编码为 URL 的格式。</h4>
            </div>
            <div class="type-content">
              <div class="characteristics">
                <h4>特点：</h4>
                <ul>
                  <li>Base64编码的数据URL</li>
                  <li>格式: data:[mediatype][;base64],data</li>
                  <li>可直接嵌入HTML/CSS</li>
                  <li>比原始数据大约33%</li>
                </ul>
              </div>
              <div class="use-cases">
                <h4>使用场景：</h4>
                <ul>
                  <li>小图片内联</li>
                  <li>生成图片缩略图</li>
                  <li>CSS背景图片</li>
                  <li>简化小文件传输</li>
                </ul>
              </div>
              <div class="example">
                <h4>示例：</h4>
                <pre class="code-block">
// 创建DataURL
const textData = 'Hello, World!';
const textDataURL = `data:text/plain;base64,${btoa(textData)}`;

// 在图像中使用DataURL
const img = new Image();
img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...';
document.body.appendChild(img);</pre
                >
              </div>
            </div>
          </div>

          <div class="type-card">
            <div class="type-header canvas">
              <h3>Canvas</h3>
              <h4>Canvas 对象表示一个绘图画布，可以用于绘制图形、图像等。</h4>
            </div>
            <div class="type-content">
              <div class="characteristics">
                <h4>特点：</h4>
                <ul>
                  <li>位图绘图API</li>
                  <li>支持2D和WebGL渲染</li>
                  <li>可以导出多种格式</li>
                  <li>像素级操作</li>
                </ul>
              </div>
              <div class="use-cases">
                <h4>使用场景：</h4>
                <ul>
                  <li>图像处理与滤镜</li>
                  <li>图表和数据可视化</li>
                  <li>游戏开发</li>
                  <li>图片压缩和格式转换</li>
                </ul>
              </div>
              <div class="example">
                <h4>示例：</h4>
                <pre class="code-block">
// 创建Canvas并绘制
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 200;
canvas.height = 200;

// 绘制图形
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 180, 180);

// 导出为DataURL
const dataURL = canvas.toDataURL('image/png', 0.8);

// 导出为Blob
canvas.toBlob(blob => {
  console.log('PNG Blob:', blob);
}, 'image/png', 0.8);</pre
                >
              </div>
            </div>
          </div>

          <div class="type-card">
            <div class="type-header arraybuffer">
              <h3>ArrayBuffer</h3>
              <h4>ArrayBuffer 对象表示一个通用的、固定长度的原始二进制数据缓冲区。</h4>
            </div>
            <div class="type-content">
              <div class="characteristics">
                <h4>特点：</h4>
                <ul>
                  <li>表示通用的、固定长度的原始二进制数据缓冲区</li>
                  <li>不能直接操作，需通过TypedArray或DataView</li>
                  <li>内存效率高</li>
                  <li>支持底层二进制操作</li>
                </ul>
              </div>
              <div class="use-cases">
                <h4>使用场景：</h4>
                <ul>
                  <li>WebSocket二进制通信</li>
                  <li>Web Worker数据传输</li>
                  <li>音视频处理</li>
                  <li>加密解密操作</li>
                </ul>
              </div>
              <div class="example">
                <h4>示例：</h4>
                <pre class="code-block">
// 创建ArrayBuffer
const buffer = new ArrayBuffer(16); // 16字节

// 使用DataView操作
const view = new DataView(buffer);
view.setInt32(0, 123456); // 在位置0存储32位整数

// 使用TypedArray操作
const intArray = new Int32Array(buffer);
intArray[1] = 7890; // 在位置4存储另一个整数

// 从文件读取ArrayBuffer
const reader = new FileReader();
reader.onload = () => {
  const arrayBuffer = reader.result;
  // 处理二进制数据
};
reader.readAsArrayBuffer(file);</pre
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="conversion-section">
        <h2>数据关系图</h2>
        <img
          :src="dataFormat"
          style="width: 100%"
          alt="数据关系图"
          loading="lazy"
          class="conversion-diagram"
        />

        <h2 class="section-title">数据流转换方法</h2>

        <img
          :src="dataStreamFormat"
          style="width: 100%"
          alt="数据流转换方法"
          loading="lazy"
          class="conversion-diagram"
        />

        <div class="conversion-examples">
          <h3>常用转换代码示例</h3>
          <div class="example-grid">
            <div class="example-card">
              <h4>DataURL 转 Blob</h4>
              <pre class="code-block">
function dataURLtoBlob(dataURL) {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(raw.length);

  for (let i = 0; i < raw.length; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}</pre
              >
            </div>

            <div class="example-card">
              <h4>Canvas 转 Blob (异步)</h4>
              <pre class="code-block">
function canvasToBlob(canvas, type = 'image/png', quality = 0.9) {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob),
      type,
      quality
    );
  });
}

// 使用
const blob = await canvasToBlob(myCanvas);</pre
              >
            </div>

            <div class="example-card">
              <h4>Blob 转 ArrayBuffer</h4>
              <pre class="code-block">
async function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}

// 使用
const arrayBuffer = await blobToArrayBuffer(myBlob);</pre
              >
            </div>

            <div class="example-card">
              <h4>ArrayBuffer 转 DataURL</h4>
              <pre class="code-block">
function arrayBufferToDataURL(arrayBuffer, mimeType) {
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return `data:${mimeType};base64,${base64}`;
}</pre
              >
            </div>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2 class="section-title">最佳实践</h2>
        <div class="practices-grid">
          <div class="practice">
            <div class="number">1</div>
            <p>小文件使用DataURL，大文件使用Blob/ArrayBuffer</p>
          </div>
          <div class="practice">
            <div class="number">2</div>
            <p>图像处理优先使用Canvas API</p>
          </div>
          <div class="practice">
            <div class="number">3</div>
            <p>传输大量数据使用ArrayBuffer</p>
          </div>
          <div class="practice">
            <div class="number">4</div>
            <p>文件操作使用File和FileReader API</p>
          </div>
          <div class="practice">
            <div class="number">5</div>
            <p>及时释放不再使用的对象URL</p>
          </div>
          <div class="practice">
            <div class="number">6</div>
            <p>使用Web Workers处理大型二进制数据</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>
        理解不同数据流类型的特点和转换方法对于开发高效的前端应用至关重要。合理选择数据格式可以显著提升应用性能和用户体验。
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dataStreamFormat from '@/assets/js/数据流.png'
import dataFormat from '@/assets/js/dataFormat.jfif'

// 示例数据
const conversionMethods = ref([
  { from: 'blob', to: 'file', method: 'new File([blob], name, options)' },
  { from: 'blob', to: 'dataurl', method: 'FileReader.readAsDataURL()' },
  { from: 'blob', to: 'arraybuffer', method: 'FileReader.readAsArrayBuffer()' },
  { from: 'file', to: 'blob', method: 'file.slice() 或 new Blob([file])' },
  { from: 'dataurl', to: 'blob', method: 'fetch(dataURL).then(res => res.blob())' },
  { from: 'canvas', to: 'blob', method: 'canvas.toBlob(callback)' },
  { from: 'canvas', to: 'dataurl', method: 'canvas.toDataURL()' },
  { from: 'arraybuffer', to: 'blob', method: 'new Blob([arrayBuffer])' },
])
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');

.data-stream-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Noto Sans SC', sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #eaeaea;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #3498db, #2c3e50);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin-top: 0;
    }
  }

  .intro-section {
    margin-bottom: 3rem;

    .intro-card {
      background: white;
      border-radius: 10px;
      padding: 1.8rem;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

      .definition {
        display: flex;
        gap: 1.5rem;

        .stream-icon {
          font-size: 3rem;
          width: 80px;
          height: 80px;
          background: #e3f2fd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #3498db;
        }

        h2 {
          margin-top: 0;
          color: #2c3e50;
        }

        p {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .feature {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;

          .feature-tag {
            background: #e3f2fd;
            color: #3498db;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
          }
        }
      }
    }
  }

  .data-types-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.8rem;
      color: #3498db;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
      text-align: center;
    }

    .type-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .type-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .type-header {
        padding: 1.2rem 1.5rem;
        color: white;
        font-weight: 600;

        &.blob {
          background: #3498db;
        }

        &.file {
          background: #e67e22;
        }

        &.dataurl {
          background: #9b59b6;
        }

        &.canvas {
          background: #2ecc71;
        }

        &.arraybuffer {
          background: #e74c3c;
        }

        h3 {
          margin: 0;
          font-size: 1.5rem;
        }
      }

      .type-content {
        padding: 1.5rem;

        .characteristics,
        .use-cases {
          margin-bottom: 1.2rem;

          h4 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            color: #2c3e50;
          }

          ul {
            padding-left: 1.5rem;
            margin: 0;

            li {
              margin-bottom: 0.3rem;
              line-height: 1.5;
            }
          }
        }

        .example {
          h4 {
            margin-top: 0;
            margin-bottom: 0.5rem;
            color: #2c3e50;
          }

          .code-block {
            background: #2c3e50;
            color: #f8f9fa;
            border-radius: 6px;
            padding: 1rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            overflow-x: auto;
          }
        }
      }
    }
  }

  .conversion-section {
    margin-bottom: 3rem;

    .section-title {
      font-size: 1.8rem;
      color: #3498db;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
      text-align: center;
    }

    .conversion-diagram {
      background: white;
      border-radius: 10px;
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      margin-bottom: 2rem;
      overflow: auto;

      .conversion-map {
        position: relative;
        min-width: 800px;
        height: 500px;
        background: #f9f9ff;
        border-radius: 8px;

        .data-type {
          position: absolute;
          width: 120px;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          color: white;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

          &.blob {
            background: #3498db;
            top: 20%;
            left: 20%;
          }

          &.file {
            background: #e67e22;
            top: 20%;
            left: 60%;
          }

          &.dataurl {
            background: #9b59b6;
            top: 40%;
            left: 40%;
          }

          &.canvas {
            background: #2ecc71;
            top: 60%;
            left: 20%;
          }

          &.arraybuffer {
            background: #e74c3c;
            top: 60%;
            left: 60%;
          }
        }

        .conversion {
          position: absolute;
          font-size: 0.9rem;

          .arrow {
            position: absolute;
            width: 80px;
            height: 4px;
            background: #7f8c8d;

            &::after {
              content: '';
              position: absolute;
              right: 0;
              top: -4px;
              border: 6px solid transparent;
              border-left: 8px solid #7f8c8d;
            }
          }

          .method {
            position: absolute;
            background: white;
            border: 1px solid #eaeaea;
            border-radius: 4px;
            padding: 0.5rem;
            font-size: 0.8rem;
            white-space: nowrap;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          }

          &[from='blob'][to='file'] {
            top: 25%;
            left: 30%;

            .arrow {
              width: 100px;
            }

            .method {
              top: -10px;
              left: 100px;
            }
          }

          &[from='blob'][to='dataurl'] {
            top: 30%;
            left: 25%;

            .arrow {
              width: 80px;
              transform: rotate(40deg);
            }

            .method {
              top: -30px;
              left: 80px;
            }
          }

          &[from='blob'][to='arraybuffer'] {
            top: 35%;
            left: 30%;

            .arrow {
              width: 100px;
              transform: rotate(60deg);
            }

            .method {
              top: -20px;
              left: 100px;
            }
          }

          &[from='file'][to='blob'] {
            top: 25%;
            left: 70%;

            .arrow {
              width: 100px;
              transform: rotate(180deg);
            }

            .method {
              top: -10px;
              right: 100px;
            }
          }

          &[from='file'][to='dataurl'] {
            top: 30%;
            left: 75%;

            .arrow {
              width: 80px;
              transform: rotate(-40deg);
            }

            .method {
              top: -30px;
              left: -80px;
            }
          }

          &[from='file'][to='arraybuffer'] {
            top: 35%;
            left: 70%;

            .arrow {
              width: 100px;
              transform: rotate(-60deg);
            }

            .method {
              top: -20px;
              left: -100px;
            }
          }

          &[from='dataurl'][to='blob'] {
            top: 45%;
            left: 35%;

            .arrow {
              width: 100px;
              transform: rotate(180deg);
            }

            .method {
              top: -10px;
              right: 100px;
            }
          }

          &[from='dataurl'][to='canvas'] {
            top: 50%;
            left: 35%;

            .arrow {
              width: 80px;
              transform: rotate(-30deg);
            }

            .method {
              top: 20px;
              left: 80px;
            }
          }

          &[from='canvas'][to='blob'] {
            top: 65%;
            left: 30%;

            .arrow {
              width: 100px;
              transform: rotate(180deg);
            }

            .method {
              top: -10px;
              right: 100px;
            }
          }

          &[from='canvas'][to='dataurl'] {
            top: 70%;
            left: 25%;

            .arrow {
              width: 80px;
              transform: rotate(40deg);
            }

            .method {
              top: -30px;
              left: 80px;
            }
          }

          &[from='arraybuffer'][to='blob'] {
            top: 65%;
            left: 70%;

            .arrow {
              width: 100px;
              transform: rotate(180deg);
            }

            .method {
              top: -10px;
              right: 100px;
            }
          }

          &[from='arraybuffer'][to='dataurl'] {
            top: 70%;
            left: 75%;

            .arrow {
              width: 80px;
              transform: rotate(-40deg);
            }

            .method {
              top: -30px;
              left: -80px;
            }
          }
        }
      }
    }

    .conversion-examples {
      h3 {
        font-size: 1.5rem;
        color: #2c3e50;
        margin-top: 0;
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .example-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
      }

      .example-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        h4 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .code-block {
          background: #2c3e50;
          color: #f8f9fa;
          border-radius: 6px;
          padding: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          overflow-x: auto;
        }
      }
    }
  }

  .best-practices {
    .section-title {
      font-size: 1.8rem;
      color: #3498db;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
      text-align: center;
    }

    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .practice {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        .number {
          width: 40px;
          height: 40px;
          background: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          margin-right: 1.2rem;
          flex-shrink: 0;
        }

        p {
          margin: 0;
          font-size: 1.05rem;
          line-height: 1.5;
        }
      }
    }
  }

  .footer {
    margin-top: 3rem;
    text-align: center;
    padding: 1.5rem;
    font-size: 1.05rem;
    color: #7f8c8d;
    border-top: 1px solid #eaeaea;
    line-height: 1.7;
    background: white;
    border-radius: 8px;
  }
}

@media (max-width: 768px) {
  .data-stream-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }

    .conversion-diagram {
      padding: 1rem !important;

      .conversion-map {
        min-width: 600px;
        height: 400px;
      }
    }
  }
}
</style>
