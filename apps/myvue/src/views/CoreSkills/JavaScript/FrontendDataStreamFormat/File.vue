<template>
  <div class="file-api-container">
    <header class="header">
      <div class="logo-container">
        <div class="js-logo"></div>
        <h1>JavaScript File 对象指南</h1>
      </div>
      <p class="subtitle">在浏览器中处理文件操作</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <section class="content-section">
          <div class="section-header">
            <h2><span class="icon">📄</span> File 对象基础</h2>
            <div class="section-badge">核心概念</div>
          </div>

          <div class="concept-grid">
            <div class="concept-card">
              <div class="concept-icon">💡</div>
              <h3>什么是 File 对象？</h3>
              <p>File 对象表示用户系统中的文件，继承自 Blob 对象，包含文件的元数据信息。</p>
            </div>

            <div class="concept-card">
              <div class="concept-icon">🔧</div>
              <h3>如何获取 File 对象？</h3>
              <p>通常通过文件输入框、拖放操作或文件系统 API 获取。</p>
            </div>

            <div class="concept-card">
              <div class="concept-icon">📊</div>
              <h3>核心属性</h3>
              <p>name, size, type, lastModified</p>
            </div>
          </div>

          <div class="file-interface">
            <h3>File 接口定义：</h3>
            <pre class="code-block">interface File extends Blob {
  readonly name: string;          // 文件名（包含扩展名）
  readonly lastModified: number;  // 最后修改时间（毫秒时间戳）
  readonly lastModifiedDate?: Date; // 最后修改日期对象（已废弃）
  readonly webkitRelativePath?: string; // 相对路径（webkit）
}</pre>
          </div>
        </section>

        <section class="content-section">
          <div class="section-header">
            <h2><span class="icon">🛠️</span> File 对象使用</h2>
            <div class="section-badge">实践操作</div>
          </div>

          <div class="usage-tabs">
            <div class="tabs-header">
              <div v-for="(tab, index) in usageTabs" :key="index"
                :class="['tab-item', { active: activeUsageTab === index }]" @click="activeUsageTab = index">
                {{ tab.title }}
              </div>
            </div>

            <div class="tabs-content">
              <div v-if="activeUsageTab === 0" class="usage-example">
                <h3>通过文件输入框获取</h3>
                <pre class="code-block">// HTML
&lt;input type="file" id="file-input" @change="handleFileChange"&gt;

// JavaScript
function handleFileChange(event) {
  const files = event.target.files; // FileList 对象
  if (files.length > 0) {
    const file = files[0];
    console.log('文件名:', file.name);
    console.log('文件大小:', formatFileSize(file.size));
    console.log('文件类型:', file.type);
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}</pre>
              </div>

              <div v-if="activeUsageTab === 1" class="usage-example">
                <h3>通过拖放操作获取</h3>
                <pre class="code-block">// HTML
&lt;div id="drop-zone"
     @dragover.prevent
     @drop.prevent="handleDrop"&gt;
  拖放文件到此处
&lt;/div&gt;

// JavaScript
function handleDrop(event) {
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    console.log('拖放文件:', file);
    processFile(file);
  }
}

function processFile(file) {
  // 处理文件的逻辑
}</pre>
              </div>

              <div v-if="activeUsageTab === 2" class="usage-example">
                <h3>通过文件系统 API 获取</h3>
                <pre class="code-block">// 使用 showOpenFilePicker API（现代浏览器）
async function pickFile() {
  try {
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    console.log('选择的文件:', file);

    // 读取文件内容
    const content = await file.text();
    console.log('文件内容:', content);
  } catch (err) {
    console.error('文件选择取消或出错:', err);
  }
}

// 使用兼容性检查
if ('showOpenFilePicker' in window) {
  // 支持现代文件系统 API
} else {
  // 使用传统 input 方式
}</pre>
              </div>
            </div>
          </div>
        </section>


        <section class="content-section filereader-section">
          <div class="section-header">
            <h2><span class="icon">📖</span> FileReader 介绍</h2>
            <div class="section-badge">文件读取</div>
          </div>
          <div class="filereader-content">
            <div class="filereader-info">
              <h3>FileReader 是什么？</h3>
              <p>
                <strong>FileReader</strong> 是浏览器提供的一个用于读取本地文件内容的 API，支持以多种格式（如文本、DataURL、ArrayBuffer、二进制字符串）异步读取
                <code>File</code> 或 <code>Blob</code> 对象的数据。常用于文件上传、图片预览、文本处理等场景。
              </p>
            </div>
            <div class="filereader-usage">
              <h3>常用方法</h3>
              <ul>
                <li><code>readAsText(file, [encoding])</code>：以文本方式读取文件</li>
                <li><code>readAsDataURL(file)</code>：读取为 DataURL（常用于图片预览）</li>
                <li><code>readAsArrayBuffer(file)</code>：读取为二进制 ArrayBuffer</li>
                <li><code>readAsBinaryString(file)</code>：读取为二进制字符串（已废弃）</li>
              </ul>
            </div>
            <div class="filereader-scenarios">
              <h3>典型使用场景</h3>
              <div class="scenario-list">
                <div class="scenario-item">
                  <span class="scenario-icon">🖼️</span>
                  <span>图片预览（读取为 DataURL）</span>
                </div>
                <div class="scenario-item">
                  <span class="scenario-icon">📄</span>
                  <span>文本文件内容展示</span>
                </div>
                <div class="scenario-item">
                  <span class="scenario-icon">🔒</span>
                  <span>文件内容校验（如 hash 计算）</span>
                </div>
                <div class="scenario-item">
                  <span class="scenario-icon">🎵</span>
                  <span>音视频文件处理</span>
                </div>
              </div>
            </div>
            <div class="filereader-example">
              <h3>示例代码</h3>
              <pre class="code-block">// 读取文件为文本
const reader = new FileReader();
reader.onload = function(e) {
  console.log('文件内容:', e.target.result);
};
reader.readAsText(file);

// 读取文件为 DataURL（图片预览）
const imgReader = new FileReader();
imgReader.onload = function(e) {
  img.src = e.target.result; // 预览图片
};
imgReader.readAsDataURL(file);
              </pre>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="section-header">
            <h2><span class="icon">🌐</span> File 使用场景</h2>
            <div class="section-badge">实际应用</div>
          </div>

          <div class="scenario-cards">
            <div class="scenario-card">
              <div class="scenario-icon">🖼️</div>
              <h3>图片预览</h3>
              <p>上传前预览用户选择的图片</p>
              <pre class="code-snippet">const url = URL.createObjectURL(file);
img.src = url;</pre>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">📤</div>
              <h3>文件上传</h3>
              <p>通过 AJAX/Fetch 上传文件</p>
              <pre class="code-snippet">const formData = new FormData();
formData.append('file', file);
fetch('/upload', { method: 'POST', body: formData });</pre>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">📝</div>
              <h3>文本处理</h3>
              <p>读取并处理文本文件内容</p>
              <pre class="code-snippet">const text = await file.text();
const lines = text.split('\n');</pre>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🔍</div>
              <h3>文件验证</h3>
              <p>检查文件类型和大小</p>
              <pre class="code-snippet">const isValid = file.type === 'image/jpeg'
  && file.size < 5 * 1024 * 1024;</pre>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="section-header">
            <h2><span class="icon">🔄</span> File 数据转换</h2>
            <div class="section-badge">格式转换</div>
          </div>

          <div class="conversion-grid">
            <div class="conversion-card">
              <div class="conversion-icon">➡️</div>
              <h3>File → Data URL</h3>
              <pre class="code-block">function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 使用
const dataURL = await fileToDataURL(file);
console.log('Data URL:', dataURL.substring(0, 50) + '...');</pre>
            </div>

            <div class="conversion-card">
              <div class="conversion-icon">➡️</div>
              <h3>File → ArrayBuffer</h3>
              <pre class="code-block">async function fileToArrayBuffer(file) {
  return await file.arrayBuffer();
}

// 使用
const buffer = await fileToArrayBuffer(file);
console.log('ArrayBuffer:', buffer);</pre>
            </div>

            <div class="conversion-card">
              <div class="conversion-icon">➡️</div>
              <h3>File → Blob</h3>
              <pre class="code-block">// File 对象本身就是 Blob 的子类
const blob = file.slice(0, file.size, file.type);

// 创建新的 Blob
const newBlob = new Blob([file], { type: 'application/octet-stream' });</pre>
            </div>

            <div class="conversion-card">
              <div class="conversion-icon">➡️</div>
              <h3>File → Text</h3>
              <pre class="code-block">async function fileToText(file) {
  return await file.text();
}

// 使用
const textContent = await fileToText(file);
console.log('文件内容:', textContent);</pre>
            </div>
          </div>

          <div class="conversion-diagram">
            <div class="conversion-path">
              <div class="source">File 对象</div>
              <div class="arrow">→</div>
              <div class="method">FileReader</div>
              <div class="arrow">→</div>
              <div class="target">Data URL</div>
            </div>

            <div class="conversion-path">
              <div class="source">File 对象</div>
              <div class="arrow">→</div>
              <div class="method">.text()</div>
              <div class="arrow">→</div>
              <div class="target">字符串</div>
            </div>

            <div class="conversion-path">
              <div class="source">File 对象</div>
              <div class="arrow">→</div>
              <div class="method">.arrayBuffer()</div>
              <div class="arrow">→</div>
              <div class="target">ArrayBuffer</div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="section-header">
            <h2><span class="icon">⚠️</span> File 使用注意事项</h2>
            <div class="section-badge">最佳实践</div>
          </div>

          <div class="best-practices">
            <div class="practice-card">
              <div class="practice-icon">📏</div>
              <h3>文件大小限制</h3>
              <p>处理大文件时使用流式处理或分片上传</p>
              <pre class="inline-code">if (file.size > MAX_SIZE) { ... }</pre>
            </div>

            <div class="practice-card">
              <div class="practice-icon">🔐</div>
              <h3>安全性考虑</h3>
              <p>验证文件类型，防止恶意文件上传</p>
              <pre class="inline-code">const validTypes = ['image/jpeg', 'image/png'];</pre>
            </div>

            <div class="practice-card">
              <div class="practice-icon">🧹</div>
              <h3>内存管理</h3>
              <p>及时释放不再使用的对象 URL</p>
              <pre class="inline-code">URL.revokeObjectURL(objectURL);</pre>
            </div>

            <div class="practice-card">
              <div class="practice-icon">📱</div>
              <h3>移动端适配</h3>
              <p>考虑移动设备上的文件选择体验</p>
              <pre class="inline-code">accept="image/*" capture="camera"</pre>
            </div>
          </div>

          <div class="security-tips">
            <h3>文件处理安全提示：</h3>
            <ul>
              <li>永远不要信任客户端传递的文件类型，应在服务器端重新验证</li>
              <li>使用 Content-Disposition 响应头防止文件直接执行</li>
              <li>对用户上传的文件进行病毒扫描</li>
              <li>限制上传文件的类型和大小</li>
              <li>使用沙箱环境处理不受信任的文件</li>
            </ul>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>JavaScript File API | 文件处理指南 | 基于 Vue 3 实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeUsageTab = ref(0);

const usageTabs = [
  { title: '文件输入框' },
  { title: '拖放操作' },
  { title: '文件系统 API' }
];
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

:root {
  --primary-color: #4a6fa5;
  --primary-light: #e9f0f7;
  --secondary-color: #6c757d;
  --background: #f8f9fa;
  --card-bg: #ffffff;
  --border-color: #e0e0e0;
  --text-primary: #212529;
  --text-secondary: #495057;
  --success: #28a745;
  --info: #17a2b8;
  --warning: #ffc107;
  --danger: #dc3545;
  --code-bg: #f5f7fa;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.05);
  --radius: 8px;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.file-api-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background);
  color: var(--text-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, var(--primary-color), #3a5a8c);
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .logo-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;

    h1 {
      font-weight: 600;
      font-size: 1.75rem;
    }
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.js-logo {
  width: 48px;
  height: 48px;
  background: #f7df1e;
  border-radius: 50%;
  position: relative;

  &::before {
    content: 'JS';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-weight: bold;
    font-size: 1.2rem;
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.content-section {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 2rem;

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;

    h2 {
      font-size: 1.5rem;
      color: var(--primary-color);
      display: flex;
      align-items: center;

      .icon {
        margin-right: 0.75rem;
      }
    }

    .section-badge {
      background: var(--primary-light);
      color: var(--primary-color);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .concept-card {
    background: var(--primary-light);
    border-radius: var(--radius);
    padding: 1.5rem;
    border: 1px solid rgba(74, 111, 165, 0.2);
    text-align: center;

    .concept-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      color: var(--primary-color);
    }

    p {
      color: var(--text-secondary);
    }
  }
}

.file-interface {
  background: var(--code-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-top: 1.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }
}

.usage-tabs {
  background: var(--code-bg);
  border-radius: var(--radius);
  overflow: hidden;
  margin: 1.5rem 0;

  .tabs-header {
    display: flex;
    background: var(--primary-light);
    border-bottom: 1px solid var(--border-color);

    .tab-item {
      padding: 0.85rem 1.5rem;
      cursor: pointer;
      font-weight: 500;
      color: var(--text-secondary);
      transition: var(--transition);
      border-bottom: 3px solid transparent;

      &:hover {
        color: var(--primary-color);
        background: rgba(255, 255, 255, 0.4);
      }

      &.active {
        color: var(--primary-color);
        border-bottom: 3px solid var(--primary-color);
        background: white;
      }
    }
  }

  .tabs-content {
    padding: 1.5rem;

    .usage-example {
      h3 {
        margin-top: 0;
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
    }
  }
}

.code-block {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 1.5rem;
  border-radius: var(--radius);
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
  tab-size: 2;
}

.scenario-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .scenario-card {
    background: white;
    border-radius: var(--radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    border: 1px solid var(--border-color);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    }

    .scenario-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }

    h3 {
      margin-top: 0;
      color: var(--text-primary);
    }

    p {
      color: var(--text-secondary);
      margin: 0.5rem 0 1rem;
      font-size: 0.95rem;
    }

    .code-snippet {
      background: var(--code-bg);
      border-radius: 4px;
      padding: 0.75rem;
      font-family: monospace;
      font-size: 0.9rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.conversion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .conversion-card {
    background: white;
    border-radius: var(--radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    border-left: 4px solid var(--primary-color);

    .conversion-icon {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    h3 {
      margin-top: 0;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
  }
}

.conversion-diagram {
  background: var(--primary-light);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-top: 1.5rem;

  .conversion-path {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;

    .source,
    .target,
    .method {
      padding: 0.75rem 1.5rem;
      background: white;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      font-weight: 500;
    }

    .arrow {
      margin: 0 1rem;
      font-size: 1.5rem;
      color: var(--primary-color);
    }

    .method {
      background: var(--primary-color);
      color: white;
    }
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .practice-card {
    background: white;
    border-radius: var(--radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);

    .practice-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }

    h3 {
      margin-top: 0;
      color: var(--text-primary);
    }

    p {
      color: var(--text-secondary);
      margin: 0.5rem 0 1rem;
      font-size: 0.95rem;
    }

    .inline-code {
      background: var(--code-bg);
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
      font-family: monospace;
      font-size: 0.9rem;
      display: inline-block;
    }
  }
}

.security-tips {
  background: var(--primary-light);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-top: 1.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.75rem;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--primary-color);
        font-weight: bold;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  background: var(--card-bg);
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;

    .logo-container h1 {
      font-size: 1.5rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .content-section {
    padding: 1.5rem;
  }

  .conversion-diagram .conversion-path {
    flex-wrap: wrap;
    justify-content: flex-start;

    .source,
    .arrow,
    .method,
    .target {
      margin-bottom: 0.5rem;
    }

    .arrow {
      margin: 0 0.5rem;
    }
  }
}

.filereader-section {
  margin-top: 2.5rem;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 2rem 2.5rem;
}

.filereader-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filereader-info h3,
.filereader-usage h3,
.filereader-scenarios h3,
.filereader-example h3 {
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.filereader-info p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.filereader-usage ul {
  padding-left: 1.2rem;
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.98rem;
}

.filereader-usage li {
  margin-bottom: 0.3rem;
}

.filereader-scenarios .scenario-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
}

.filereader-scenarios .scenario-item {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: var(--text-secondary);
}

.filereader-scenarios .scenario-icon {
  font-size: 1.3rem;
  margin-right: 0.5rem;
}

.filereader-example .code-block {
  background: #23272e;
  color: #f8f8f2;
  border-radius: 6px;
  padding: 1rem;
  font-size: 0.98rem;
  overflow-x: auto;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .filereader-section {
    padding: 1.2rem 0.8rem;
  }

  .filereader-content {
    gap: 1rem;
  }

  .filereader-scenarios .scenario-list {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
