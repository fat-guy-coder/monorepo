<template>
  <div class="dataurl-container">
    <header class="header">
      <h1>DataURL 基础介绍</h1>
      <p class="subtitle">一种在Web开发中高效嵌入资源的方案</p>
    </header>

    <div class="content-wrapper">
      <div class="section concept">
        <h2>📚 概念解析</h2>
        <div class="card">
          <p><strong>DataURL</strong>是一种以URI（统一资源标识符）格式直接嵌入资源数据的方式，格式为：</p>
          <div class="code-block">
            <pre>data:[&lt;mediatype&gt;][;base64],&lt;data&gt;</pre>
          </div>
          <div class="feature-grid">
            <div class="feature-item">
              <div class="icon">🔍</div>
              <h3>结构解析</h3>
              <ul>
                <li><strong>data:</strong> 协议标识</li>
                <li><strong>mediatype:</strong> MIME类型 (如: image/png)</li>
                <li><strong>base64:</strong> 可选，表示数据是Base64编码</li>
                <li><strong>data:</strong> 实际资源数据</li>
              </ul>
            </div>
            <div class="feature-item">
              <div class="icon">💡</div>
              <h3>核心优势</h3>
              <ul>
                <li>减少HTTP请求</li>
                <li>避免跨域问题</li>
                <li>提高小资源加载速度</li>
                <li>简化资源管理</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="section usage">
        <h2>🛠️ 使用方法</h2>
        <div class="card">
          <h3>基础接口</h3>
          <div class="code-block">
            <pre>const dataURL = `data:${mimeType};base64,${base64Data}`;</pre>
          </div>

          <h3>创建示例</h3>
          <div class="tabs">
            <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              {{ tab }}
            </button>
          </div>

          <div v-show="activeTab === 0" class="tab-content">
            <pre class="code-block">// 文本资源
const text = 'Hello, DataURL!';
const textDataURL = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
console.log(textDataURL);</pre>
          </div>

          <div v-show="activeTab === 1" class="tab-content">
            <pre class="code-block">// SVG图像
const svg = `
  &lt;svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"&gt;
    &lt;circle cx="50" cy="50" r="40" fill="#4CAF50"/&gt;
  &lt;/svg&gt;
`;
const svgDataURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;</pre>
          </div>

          <div v-show="activeTab === 2" class="tab-content">
            <pre class="code-block">// 图片转换为DataURL
function imageToDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

// 使用示例
const imageFile = document.querySelector('input[type="file"]').files[0];
imageToDataURL(imageFile).then(dataURL => {
  console.log('图片DataURL:', dataURL);
});</pre>
          </div>
        </div>
      </div>

      <div class="section scenarios">
        <h2>🌐 使用场景</h2>
        <div class="card">
          <div class="scenario-grid">
            <div class="scenario-item">
              <div class="icon">🖼️</div>
              <h3>内联小图片</h3>
              <p>避免小图片的HTTP请求，提升加载速度</p>
            </div>
            <div class="scenario-item">
              <div class="icon">📄</div>
              <h3>CSS背景图</h3>
              <p>直接在CSS中嵌入图标资源</p>
            </div>
            <div class="scenario-item">
              <div class="icon">⬇️</div>
              <h3>文件下载</h3>
              <p>通过a标签download属性生成文件下载</p>
            </div>
            <div class="scenario-item">
              <div class="icon">📊</div>
              <h3>Canvas导出</h3>
              <p>将Canvas绘制内容导出为图片</p>
            </div>
          </div>
          <div class="example">
            <h3>实际应用示例</h3>
            <div class="preview-area">
              <img :src="svgDataURL" alt="SVG示例" class="preview-image">
              <p class="preview-desc">SVG图像DataURL预览</p>
            </div>
          </div>
        </div>
      </div>

      <div class="section conversion">
        <h2>🔄 数据转换</h2>
        <div class="card">
          <h3>DataURL与其他格式转换</h3>
          <div class="conversion-diagram">
            <div class="conversion-item">
              <div class="from">Blob</div>
              <div class="arrow">→</div>
              <div class="to">DataURL</div>
              <div class="code">FileReader.readAsDataURL()</div>
            </div>
            <div class="conversion-item">
              <div class="from">DataURL</div>
              <div class="arrow">→</div>
              <div class="to">Blob</div>
              <div class="code">fetch(dataURL).then(res => res.blob())</div>
            </div>
            <div class="conversion-item">
              <div class="from">Base64</div>
              <div class="arrow">→</div>
              <div class="to">DataURL</div>
              <div class="code">`data:image/png;base64,${base64}`</div>
            </div>
            <div class="conversion-item">
              <div class="from">DataURL</div>
              <div class="arrow">→</div>
              <div class="to">Base64</div>
              <div class="code">dataURL.split(',')[1]</div>
            </div>
          </div>

          <h3>转换代码示例</h3>
          <pre class="code-block">// DataURL 转 Blob
function dataURLtoBlob(dataURL) {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(raw.length);

  for (let i = 0; i < raw.length; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

// 使用示例
const blob = dataURLtoBlob('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...');
console.log('转换后的Blob:', blob);</pre>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>© 2023 DataURL技术文档 | 使用Vue3(TS + Setup)实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);
const tabs = ['文本示例', 'SVG示例', '图片示例'];

// 示例SVG的DataURL
const svgDataURL = ref(
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%234CAF50'/%3E%3C/svg%3E"
);
</script>

<style lang="less" scoped>


:root {
  --primary-color: #4361ee;
  --secondary-color: #3a0ca3;
  --accent-color: #4cc9f0;
  --light-bg: #f8f9fa;
  --card-bg: #ffffff;
  --text-color: #2b2d42;
  --border-color: #e9ecef;
  --success-color: #06d6a0;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.dataurl-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: var(--text-color);
  background-color: var(--light-bg);
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 12px;
  color: white;
  box-shadow: var(--shadow);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.section {
  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: var(--secondary-color);
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 25px;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }

  h3 {
    font-size: 1.4rem;
    margin: 25px 0 15px;
    color: var(--primary-color);
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 40px;
      height: 3px;
      background: var(--accent-color);
      border-radius: 2px;
    }
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin: 20px 0;
}

.feature-item {
  background: rgba(67, 97, 238, 0.05);
  border-radius: 10px;
  padding: 20px;

  .icon {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0 0 15px;

    &:after {
      display: none;
    }
  }

  ul {
    list-style: none;

    li {
      padding: 8px 0;
      position: relative;
      padding-left: 25px;

      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        top: 8px;
        color: var(--success-color);
        font-weight: bold;
      }
    }
  }
}

.code-block {
  background: #f8f9fa;
  color: #2b2d42;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;

  pre {
    white-space: pre-wrap;
  }
}

.tabs {
  display: flex;
  gap: 8px;
  margin: 20px 0;

  button {
    flex: 1;
    padding: 12px 15px;
    background: rgba(67, 97, 238, 0.1);
    border: none;
    border-radius: 8px;
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(67, 97, 238, 0.2);
    }

    &.active {
      background: var(--primary-color);
      color: white;
    }
  }
}

.tab-content {
  margin-top: 15px;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.scenario-item {
  text-align: center;
  padding: 20px 15px;
  background: rgba(76, 201, 240, 0.08);
  border-radius: 10px;

  .icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0 0 10px;

    &:after {
      display: none;
    }
  }

  p {
    font-size: 0.95rem;
    opacity: 0.85;
  }
}

.example {
  margin-top: 30px;

  .preview-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    padding: 20px;
    background: rgba(67, 97, 238, 0.03);
    border-radius: 10px;
  }

  .preview-image {
    width: 150px;
    height: 150px;
    margin-bottom: 15px;
  }

  .preview-desc {
    font-size: 0.95rem;
    opacity: 0.8;
  }
}

.conversion-diagram {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.conversion-item {
  background: rgba(58, 12, 163, 0.05);
  border-radius: 10px;
  padding: 20px;
  text-align: center;

  .from,
  .to {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--secondary-color);
  }

  .arrow {
    font-size: 1.5rem;
    margin: 10px 0;
    color: var(--primary-color);
  }

  .code {
    margin-top: 15px;
    background: rgba(0, 0, 0, 0.03);
    padding: 10px;
    border-radius: 6px;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    word-break: break-all;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 25px 0;
  color: #6c757d;
  font-size: 0.9rem;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 2rem;
    }
  }

  .feature-grid,
  .scenario-grid,
  .conversion-diagram {
    grid-template-columns: 1fr;
  }

  .tabs {
    flex-direction: column;
  }
}
</style>
