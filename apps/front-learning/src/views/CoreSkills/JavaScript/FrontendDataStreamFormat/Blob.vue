<template>
  <div class="blob-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1>JavaScript Blob 对象基础介绍</h1>
        <p>处理二进制数据的现代浏览器 API</p>
        <div class="blob-visualization">
          <div class="blob-card">
            <div class="blob-icon">
              <i class="fas fa-file"></i>
            </div>
            <div class="blob-info">
              <div class="blob-size">Blob Size: {{ blobSize }} bytes</div>
              <div class="blob-type">Blob Type: {{ blobType }}</div>
            </div>
          </div>
          <div class="blob-actions">
            <button @click="createTextBlob" class="action-btn">
              <i class="fas fa-font"></i> 创建文本Blob
            </button>
            <button @click="createJsonBlob" class="action-btn">
              <i class="fas fa-code"></i> 创建JSON Blob
            </button>
            <button @click="downloadBlob" class="action-btn">
              <i class="fas fa-download"></i> 下载Blob
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- Blob概念 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-info-circle"></i>
          <h2>Blob 概念</h2>
        </div>
        <div class="section-content">
          <div class="concept-grid">
            <div class="concept-card">
              <div class="concept-icon">
                <i class="fas fa-cube"></i>
              </div>
              <h3>什么是Blob？</h3>
              <p>Blob（Binary Large Object）表示不可变的原始数据类文件对象，可以存储大量的二进制数据。</p>
            </div>

            <div class="concept-card">
              <div class="concept-icon">
                <i class="fas fa-file-contract"></i>
              </div>
              <h3>关键特性</h3>
              <ul>
                <li>不可变性：创建后内容无法更改</li>
                <li>类文件结构：包含数据和MIME类型信息</li>
                <li>大容量：可处理大型二进制数据</li>
                <li>浏览器支持：所有现代浏览器都支持</li>
              </ul>
            </div>

            <div class="concept-card">
              <div class="concept-icon">
                <i class="fas fa-code"></i>
              </div>
              <h3>构造函数</h3>
              <pre>new Blob(array, options)</pre>
              <p><strong>array</strong>：由ArrayBuffer, ArrayBufferView, Blob, DOMString等对象构成的数组</p>
              <p><strong>options</strong>：包含type（MIME类型）和endings（换行符处理）</p>
            </div>
          </div>

          <div class="blob-representation">
            <h3><i class="fas fa-project-diagram"></i> Blob对象结构</h3>
            <div class="blob-structure">
              <div class="blob-header">
                <div class="blob-type">type: {{ blobType }}</div>
                <div class="blob-size">size: {{ blobSize }} bytes</div>
              </div>
              <div class="blob-content">
                <div class="data-chunk" v-for="(chunk, index) in blobData" :key="index">
                  {{ chunk }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 创建与使用 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-code"></i>
          <h2>创建与使用</h2>
        </div>
        <div class="section-content">
          <div class="creation-methods">
            <div class="method-card">
              <div class="method-header">
                <i class="fas fa-font"></i>
                <h3>创建文本Blob</h3>
              </div>
              <pre class="code-block">// 创建文本Blob
const textBlob = new Blob(['Hello, World!'], {
  type: 'text/plain'
});

console.log(textBlob.size); // 13
console.log(textBlob.type); // "text/plain"</pre>
            </div>

            <div class="method-card">
              <div class="method-header">
                <i class="fas fa-file-code"></i>
                <h3>创建JSON Blob</h3>
              </div>
              <pre class="code-block">// 创建JSON Blob
const data = { name: 'John', age: 30 };
const jsonBlob = new Blob(
  [JSON.stringify(data)],
  { type: 'application/json' }
);

console.log(jsonBlob.size); // 23
console.log(jsonBlob.type); // "application/json"</pre>
            </div>

            <div class="method-card">
              <div class="method-header">
                <i class="fas fa-image"></i>
                <h3>创建图片Blob</h3>
              </div>
              <pre class="code-block">// 从Canvas创建图片Blob
canvas.toBlob(blob => {
  console.log(blob.type); // "image/png"
  console.log(blob.size); // 图片大小
}, 'image/png');</pre>
            </div>
          </div>

          <div class="blob-methods">
            <h3><i class="fas fa-cogs"></i> Blob 方法</h3>
            <div class="methods-grid">
              <div class="method-item">
                <div class="method-name">slice()</div>
                <p>创建新Blob对象，包含原始Blob指定范围内的数据</p>
                <pre>const slicedBlob = blob.slice(0, 1024, 'image/jpeg');</pre>
              </div>

              <div class="method-item">
                <div class="method-name">stream()</div>
                <p>返回ReadableStream，用于读取Blob内容</p>
                <pre>const stream = blob.stream();</pre>
              </div>

              <div class="method-item">
                <div class="method-name">text()</div>
                <p>读取Blob内容并返回UTF-8文本的Promise</p>
                <pre>blob.text().then(text => console.log(text));</pre>
              </div>

              <div class="method-item">
                <div class="method-name">arrayBuffer()</div>
                <p>读取Blob内容并返回ArrayBuffer的Promise</p>
                <pre>blob.arrayBuffer().then(buffer => { /*...*/ });</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-scenario"></i>
          <h2>使用场景</h2>
        </div>
        <div class="section-content">
          <div class="scenarios-grid">
            <div class="scenario-card">
              <div class="scenario-header">
                <i class="fas fa-download"></i>
                <h3>文件下载</h3>
              </div>
              <p>动态生成文件并提供下载</p>
              <pre class="code-block">function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // 清理
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

// 下载CSV文件
downloadFile('Name,Age\nJohn,30', 'data.csv', 'text/csv');</pre>
            </div>

            <div class="scenario-card">
              <div class="scenario-header">
                <i class="fas fa-image"></i>
                <h3>图片处理</h3>
              </div>
              <p>从Canvas生成图片并上传</p>
              <pre class="code-block">// 从Canvas生成Blob
canvas.toBlob(blob => {
  const formData = new FormData();
  formData.append('image', blob, 'avatar.png');

  // 上传到服务器
  fetch('/upload', {
    method: 'POST',
    body: formData
  });
}, 'image/png');</pre>
            </div>

            <div class="scenario-card">
              <div class="scenario-header">
                <i class="fas fa-video"></i>
                <h3>媒体处理</h3>
              </div>
              <p>处理音频/视频数据</p>
              <pre class="code-block">// 从麦克风获取音频Blob
async function recordAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);
  const chunks = [];

  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = () => {
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    // 使用audioBlob...
  };

  recorder.start();
  setTimeout(() => recorder.stop(), 5000);
}</pre>
            </div>

            <div class="scenario-card">
              <div class="scenario-header">
                <i class="fas fa-database"></i>
                <h3>大文件分片上传</h3>
              </div>
              <p>将大文件分割为多个Blob分片上传</p>
              <pre class="code-block">async function uploadLargeFile(file) {
  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
  let start = 0;
  let chunkIndex = 0;

  while (start < file.size) {
    const chunk = file.slice(start, start + CHUNK_SIZE);
    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('chunkIndex', chunkIndex);
    formData.append('totalChunks', Math.ceil(file.size / CHUNK_SIZE));

    await fetch('/upload-chunk', {
      method: 'POST',
      body: formData
    });

    start += CHUNK_SIZE;
    chunkIndex++;
  }
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 数据转换 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-exchange-alt"></i>
          <h2>数据转换</h2>
        </div>
        <div class="section-content">
          <div class="conversion-methods">
            <div class="conversion-card">
              <div class="conversion-header">
                <i class="fas fa-arrow-right"></i>
                <h3>Blob 转 Base64</h3>
              </div>
              <pre class="code-block">function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

// 使用
blobToBase64(imageBlob).then(base64 => {
  console.log(base64); // data:image/png;base64,...
});</pre>
            </div>

            <div class="conversion-card">
              <div class="conversion-header">
                <i class="fas fa-arrow-left"></i>
                <h3>Base64 转 Blob</h3>
              </div>
              <pre class="code-block">function base64ToBlob(base64, contentType) {
  // 提取Base64数据部分
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: contentType });
}

// 使用
const base64Data = 'data:image/png;base64,...';
const blob = base64ToBlob(base64Data, 'image/png');</pre>
            </div>

            <div class="conversion-card">
              <div class="conversion-header">
                <i class="fas fa-arrow-right"></i>
                <h3>Blob 转 ArrayBuffer</h3>
              </div>
              <pre class="code-block">// 使用arrayBuffer()方法
blob.arrayBuffer().then(buffer => {
  // 使用ArrayBuffer...
});

// 或使用FileReader
function blobToArrayBuffer(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsArrayBuffer(blob);
  });
}</pre>
            </div>

            <div class="conversion-card">
              <div class="conversion-header">
                <i class="fas fa-arrow-left"></i>
                <h3>ArrayBuffer 转 Blob</h3>
              </div>
              <pre class="code-block">function arrayBufferToBlob(buffer, type) {
  return new Blob([buffer], { type });
}

// 使用
const buffer = new ArrayBuffer(1024);
const blob = arrayBufferToBlob(buffer, 'application/octet-stream');</pre>
            </div>
          </div>

          <div class="conversion-diagram">
            <h3><i class="fas fa-random"></i> 数据转换关系图</h3>
            <div class="diagram">
              <div class="data-type">String</div>
              <div class="arrow">
                <i class="fas fa-exchange-alt"></i>
              </div>
              <div class="data-type">Blob</div>
              <div class="arrow">
                <i class="fas fa-exchange-alt"></i>
              </div>
              <div class="data-type">ArrayBuffer</div>
              <div class="arrow">
                <i class="fas fa-exchange-alt"></i>
              </div>
              <div class="data-type">Base64</div>
              <div class="arrow">
                <i class="fas fa-exchange-alt"></i>
              </div>
              <div class="data-type">File</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-star"></i>
          <h2>最佳实践</h2>
        </div>
        <div class="section-content">
          <div class="best-practices">
            <div class="practice-card">
              <div class="practice-icon">
                <i class="fas fa-trash"></i>
              </div>
              <h3>内存管理</h3>
              <p>使用 <code>URL.revokeObjectURL()</code> 释放不再需要的Blob URL</p>
              <pre>const url = URL.createObjectURL(blob);
// 使用url后
URL.revokeObjectURL(url);</pre>
            </div>

            <div class="practice-card">
              <div class="practice-icon">
                <i class="fas fa-file-medical"></i>
              </div>
              <h3>设置正确的MIME类型</h3>
              <p>始终为Blob设置正确的MIME类型，确保正确处理</p>
              <pre>new Blob([content], { type: 'application/pdf' });</pre>
            </div>

            <div class="practice-card">
              <div class="practice-icon">
                <i class="fas fa-cogs"></i>
              </div>
              <h3>使用现代方法</h3>
              <p>优先使用Blob的内置方法（如<code>text()</code>, <code>arrayBuffer()</code>）而非FileReader</p>
              <pre>// 现代方式
blob.text().then(text => console.log(text));

// 传统方式
const reader = new FileReader();
reader.onload = () => console.log(reader.result);
reader.readAsText(blob);</pre>
            </div>

            <div class="practice-card">
              <div class="practice-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3>安全性考虑</h3>
              <p>验证用户提供的Blob内容，防止恶意文件执行</p>
              <pre>// 验证图片类型
if (!blob.type.startsWith('image/')) {
  throw new Error('Invalid file type');
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-check-circle"></i>
          <h2>总结</h2>
        </div>
        <div class="section-content">
          <div class="key-points">
            <h3><i class="fas fa-key"></i> 关键要点</h3>
            <ul>
              <li>Blob是处理二进制数据的核心浏览器API</li>
              <li>适用于文件操作、媒体处理和大型数据传输</li>
              <li>可与其他数据类型（Base64、ArrayBuffer）相互转换</li>
              <li>使用后及时释放资源，避免内存泄漏</li>
              <li>现代浏览器提供更简洁的Blob处理方法</li>
            </ul>
          </div>

          <div class="cheatsheet">
            <h3><i class="fas fa-file-download"></i> Blob方法速查表</h3>
            <div class="cheatsheet-grid">
              <div class="cheat-item">
                <div class="cheat-name">blob.slice()</div>
                <div class="cheat-desc">创建新Blob对象</div>
              </div>
              <div class="cheat-item">
                <div class="cheat-name">blob.stream()</div>
                <div class="cheat-desc">返回ReadableStream</div>
              </div>
              <div class="cheat-item">
                <div class="cheat-name">blob.text()</div>
                <div class="cheat-desc">返回文本Promise</div>
              </div>
              <div class="cheat-item">
                <div class="cheat-name">blob.arrayBuffer()</div>
                <div class="cheat-desc">返回ArrayBuffer Promise</div>
              </div>
              <div class="cheat-item">
                <div class="cheat-name">URL.createObjectURL()</div>
                <div class="cheat-desc">创建Blob URL</div>
              </div>
              <div class="cheat-item">
                <div class="cheat-name">URL.revokeObjectURL()</div>
                <div class="cheat-desc">释放Blob URL</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>JavaScript Blob 对象基础介绍 | 现代Web开发核心技术</p>
      <div class="footer-links">
        <a href="#"><i class="fab fa-mdn"></i> MDN 文档</a>
        <a href="#"><i class="fab fa-html5"></i> File API 规范</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 当前Blob数据
const blobSize = ref(0);
const blobType = ref('text/plain');
const blobData = ref<string[]>([]);

// 创建文本Blob
const createTextBlob = () => {
  const text = 'Hello, JavaScript Blob!';
  const blob = new Blob([text], { type: 'text/plain' });

  blobSize.value = blob.size;
  blobType.value = blob.type;
  blobData.value = [text];
};

// 创建JSON Blob
const createJsonBlob = () => {
  const data = {
    name: 'Blob Demo',
    created: new Date().toISOString(),
    size: 'variable'
  };

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });

  blobSize.value = blob.size;
  blobType.value = blob.type;
  blobData.value = jsonString.split('\n');
};

// 下载当前Blob
const downloadBlob = () => {
  if (blobSize.value === 0) return;

  const content = blobData.value.join('\n');
  const blob = new Blob([content], { type: blobType.value });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `blob-demo-${new Date().getTime()}.${blobType.value.split('/')[1] || 'txt'}`;
  document.body.appendChild(a);
  a.click();

  // 清理
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};

// 初始化默认Blob
createTextBlob();
</script>

<style lang="less" scoped>



.blob-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2d3748;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.hero-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 12px;
  color: white;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  padding: 40px 20px;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
    }

    p {
      font-size: 1.3rem;
      font-weight: 300;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 30px;
    }
  }
}

.blob-visualization {
  max-width: 800px;
  margin: 40px auto 0;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 25px;
  backdrop-filter: blur(10px);
}

.blob-card {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.blob-icon {
  width: 70px;
  height: 70px;
  background: #4f46e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin-right: 20px;
}

.blob-info {
  flex: 1;
  text-align: left;

  .blob-size {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 5px;
    color: #1e293b;
  }

  .blob-type {
    font-family: 'Fira Code', monospace;
    background: rgba(79, 70, 229, 0.1);
    padding: 5px 10px;
    border-radius: 6px;
    display: inline-block;
    color: #4f46e5;
  }
}

.blob-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.action-btn {
  background: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  color: #4f46e5;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #eef2ff;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  i {
    font-size: 1.2rem;
  }
}

.content-wrapper {
  padding: 0 20px;
}

.section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  margin-bottom: 30px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;

  .icon {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h2 {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 600;
  }
}

.section-content {
  padding: 25px;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4a5568;
    margin-bottom: 20px;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.concept-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e2e8f0;

  .concept-icon {
    width: 60px;
    height: 60px;
    background: #e0f2fe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: #0ea5e9;
    margin-bottom: 20px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #1e293b;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 10px;
      line-height: 1.5;
    }
  }

  pre {
    background: #1e293b;
    color: #f1f5f9;
    border-radius: 6px;
    padding: 12px;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    margin: 15px 0 0;
  }
}

.blob-representation {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
}

.blob-structure {
  border: 2px solid #c7d2fe;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
}

.blob-header {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: #4f46e5;
  color: white;
  font-family: 'Fira Code', monospace;
}

.blob-content {
  padding: 15px;
  background: white;
  min-height: 100px;
  font-family: 'Fira Code', monospace;
}

.data-chunk {
  padding: 8px;
  margin-bottom: 5px;
  background: #f8fafc;
  border-radius: 4px;
  font-size: 0.95rem;
}

.creation-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.method-card {
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #e0f2fe;

  i {
    font-size: 1.5rem;
    color: #0ea5e9;
  }

  h3 {
    margin: 0;
    color: #1e293b;
  }
}

.code-block {
  background: #1e293b;
  color: #f1f5f9;
  border-radius: 0 0 8px 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  overflow-x: auto;
  margin: 0;
}

.blob-methods {
  margin-top: 30px;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.method-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;

  .method-name {
    font-weight: 600;
    font-family: 'Fira Code', monospace;
    color: #4f46e5;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  pre {
    background: #f8fafc;
    border-radius: 6px;
    padding: 10px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    margin-top: 10px;
  }
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.scenario-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.scenario-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #e0f2fe;

  i {
    font-size: 1.5rem;
    color: #0ea5e9;
  }

  h3 {
    margin: 0;
    color: #1e293b;
  }
}

.conversion-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.conversion-card {
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.conversion-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #ede9fe;

  i {
    font-size: 1.5rem;
    color: #8b5cf6;
  }

  h3 {
    margin: 0;
    color: #1e293b;
  }
}

.conversion-diagram {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
}

.diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.data-type {
  background: #4f46e5;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  font-weight: 600;
}

.arrow {
  color: #94a3b8;
  font-size: 1.5rem;
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.practice-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;

  .practice-icon {
    width: 50px;
    height: 50px;
    background: #e0f2fe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #0ea5e9;
    margin-bottom: 15px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #1e293b;
  }

  pre {
    background: #f8fafc;
    border-radius: 6px;
    padding: 10px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    margin-top: 15px;
  }
}

.key-points {
  background: #f0f9ff;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
    margin-top: 0;
  }

  ul {
    padding-left: 20px;
    margin: 15px 0 0;

    li {
      margin-bottom: 12px;
      line-height: 1.6;
    }
  }
}

.cheatsheet {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
}

.cheatsheet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.cheat-item {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #4f46e5;

  .cheat-name {
    font-family: 'Fira Code', monospace;
    font-weight: 500;
    margin-bottom: 5px;
    color: #4f46e5;
  }
}

.footer {
  text-align: center;
  padding: 25px;
  color: #64748b;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 15px;

    a {
      color: #4f46e5;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .hero-section .hero-content h1 {
    font-size: 2rem;
  }

  .hero-section .hero-content p {
    font-size: 1.1rem;
  }

  .section-header h2 {
    font-size: 1.4rem !important;
  }

  .blob-visualization {
    padding: 15px;
  }

  .blob-card {
    flex-direction: column;
    text-align: center;

    .blob-icon {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 30px 15px;
  }

  .hero-content h1 {
    font-size: 1.8rem !important;
  }
}
</style>
