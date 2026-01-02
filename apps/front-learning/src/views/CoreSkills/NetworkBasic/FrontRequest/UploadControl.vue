<template>
  <div class="file-upload-container">
    <header class="header">
      <div class="header-content">
        <h1 class="title">前端文件上传控制基本介绍</h1>
        <p class="subtitle">掌握现代Web应用中的文件上传技术与最佳实践</p>
        <div class="header-stats">
          <div class="stat-card">
            <div class="stat-value">5+</div>
            <div class="stat-label">上传方式</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">100%</div>
            <div class="stat-label">浏览器支持</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">∞</div>
            <div class="stat-label">应用场景</div>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <!-- 基本概念 -->
      <section class="section concepts-section">
        <div class="section-header">
          <div class="section-icon">📚</div>
          <h2>文件上传基本概念</h2>
        </div>

        <div class="concepts-grid">
          <div class="concept-card">
            <div class="concept-icon">📄</div>
            <h3>input[type=file]</h3>
            <p>HTML原生的文件选择控件，支持单文件和多文件选择</p>
            <div class="code-block">
              <pre><code>&lt;input type="file" id="fileInput" @change="handleFileChange"&gt;</code></pre>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h3>FormData</h3>
            <p>用于构建表单数据，可附加文件和其他字段</p>
            <div class="code-block">
              <pre><code>const formData = new FormData();
formData.append('file', file);
formData.append('userId', '12345');</code></pre>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-icon">📤</div>
            <h3>XMLHttpRequest</h3>
            <p>传统的AJAX请求方式，支持上传进度监控</p>
            <div class="code-block">
              <pre><code>const xhr = new XMLHttpRequest();
xhr.upload.addEventListener('progress', (e) => {
  const percent = Math.round((e.loaded / e.total) * 100);
});</code></pre>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-icon">⚡</div>
            <h3>Fetch API</h3>
            <p>现代浏览器提供的更简洁的API</p>
            <div class="code-block">
              <pre><code>fetch('/upload', {
  method: 'POST',
  body: formData
});</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 基础文件上传 -->
      <section class="section basic-section">
        <div class="section-header">
          <div class="section-icon">🖼️</div>
          <h2>基础文件上传实现</h2>
        </div>

        <div class="example-container">
          <div class="code-example">
            <h3>单文件上传</h3>
            <div class="code-block">
              <pre><code>// 模板
&lt;input type="file" @change="handleSingleFile"&gt;

// 处理函数
const handleSingleFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('上传成功:', data);
  })
  .catch(error => {
    console.error('上传失败:', error);
  });
};</code></pre>
            </div>
          </div>

          <div class="code-example">
            <h3>多文件上传</h3>
            <div class="code-block">
              <pre><code>// 模板 (添加multiple属性)
&lt;input type="file" multiple @change="handleMultipleFiles"&gt;

// 处理函数
const handleMultipleFiles = (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append(`file_${index}`, file);
  });

  // 添加额外参数
  formData.append('description', '多文件上传示例');

  // 发送请求
  axios.post('/upload-multiple', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级功能 -->
      <section class="section advanced-section">
        <div class="section-header">
          <div class="section-icon">🚀</div>
          <h2>高级上传功能</h2>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">👁️</div>
            <h3>文件预览</h3>
            <p>在客户端预览图片/文件内容</p>
            <div class="code-block">
              <pre><code>function previewImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = document.getElementById('preview');
    preview.src = e.target.result;
  };
  reader.readAsDataURL(file);
}</code></pre>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>上传进度</h3>
            <p>实时显示上传进度</p>
            <div class="code-block">
              <pre><code>axios.post('/upload', formData, {
  onUploadProgress: (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(`上传进度: ${percentCompleted}%`);
    // 更新进度条UI
  }
});</code></pre>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon">✂️</div>
            <h3>大文件分片</h3>
            <p>分片上传大文件</p>
            <div class="code-block">
              <pre><code>async function uploadLargeFile(file) {
  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  for (let i = 0; i &lt; totalChunks; i++) {
    const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('chunkIndex', i);
    formData.append('totalChunks', totalChunks);
    formData.append('fileId', fileId);

    await axios.post('/upload-chunk', formData);
  }
}</code></pre>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <h3>断点续传</h3>
            <p>从断点处继续上传</p>
            <div class="code-block">
              <pre><code>async function resumeUpload(file, fileId) {
  // 获取已上传的切片
  const { uploadedChunks } = await axios.get(`/status/${fileId}`);

  const CHUNK_SIZE = 5 * 1024 * 1024;
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  for (let i = 0; i &lt; totalChunks; i++) {
    if (uploadedChunks.includes(i)) continue;

    const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    // 上传切片...
  }
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 拖拽上传 -->
      <section class="section dragdrop-section">
        <div class="section-header">
          <div class="section-icon">📎</div>
          <h2>拖拽上传实现</h2>
        </div>

        <div class="dragdrop-content">
          <div class="explanation">
            <h3>实现原理</h3>
            <p>利用HTML5的拖放API实现优雅的文件上传体验</p>
            <div class="steps">
              <div class="step">
                <div class="step-number">1</div>
                <p>阻止浏览器默认行为 (防止浏览器直接打开文件)</p>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <p>监听拖放区域的dragover和drop事件</p>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <p>从事件中获取DataTransfer对象中的文件</p>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <p>处理获取到的文件并上传</p>
              </div>
            </div>
          </div>

          <div class="code-example">
            <h3>完整实现代码</h3>
            <div class="code-block">
              <pre><code>&lt;template&gt;
  &lt;div
    class="drop-area"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="dragActive = false"
    @drop.prevent="handleDrop"
    :class="{ 'drag-active': dragActive }"
  &gt;
    &lt;p&gt;拖放文件到此处上传&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';

const dragActive = ref(false);

function handleDragOver(e) {
  e.preventDefault();
  dragActive.value = true;
}

function handleDrop(e) {
  dragActive.value = false;

  const files = Array.from(e.dataTransfer.files);
  if (files.length === 0) return;

  // 处理上传逻辑
  uploadFiles(files);
}

function uploadFiles(files) {
  // 上传实现...
}
&lt;/script&gt;

&lt;style scoped&gt;
.drop-area {
  border: 2px dashed #ccc;
  padding: 50px;
  text-align: center;
  transition: all 0.3s;
}

.drag-active {
  border-color: #4361ee;
  background-color: #f0f7ff;
}
&lt;/style&gt;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section usecases-section">
        <div class="section-header">
          <div class="section-icon">🏆</div>
          <h2>使用场景</h2>
          <p class="section-subtitle">文件上传在各种应用中的实践</p>
        </div>

        <div class="usecases-grid">
          <div class="usecase-card">
            <div class="usecase-icon">🖼️</div>
            <h3>图片上传</h3>
            <p>用户头像、产品图片、内容配图</p>
            <ul>
              <li>客户端图片压缩</li>
              <li>图片裁剪和编辑</li>
              <li>EXIF信息处理</li>
            </ul>
          </div>

          <div class="usecase-card">
            <div class="usecase-icon">📄</div>
            <h3>文档上传</h3>
            <p>合同、简历、报告等文件</p>
            <ul>
              <li>文件格式验证</li>
              <li>文档预览</li>
              <li>OCR文字识别</li>
            </ul>
          </div>

          <div class="usecase-card">
            <div class="usecase-icon">🎥</div>
            <h3>媒体上传</h3>
            <p>视频、音频文件上传</p>
            <ul>
              <li>大文件分片上传</li>
              <li>转码处理</li>
              <li>封面图生成</li>
            </ul>
          </div>

          <div class="usecase-card">
            <div class="usecase-icon">📦</div>
            <h3>批量上传</h3>
            <p>大量文件一次性上传</p>
            <ul>
              <li>并发上传控制</li>
              <li>上传队列管理</li>
              <li>失败重试机制</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="section bestpractices-section">
        <div class="section-header">
          <div class="section-icon">✅</div>
          <h2>最佳实践与注意事项</h2>
        </div>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">🔒</div>
            <h3>安全性</h3>
            <ul>
              <li>验证文件类型和后缀名</li>
              <li>限制文件大小</li>
              <li>扫描上传文件中的恶意内容</li>
              <li>使用CSRF令牌保护上传接口</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">⚙️</div>
            <h3>用户体验</h3>
            <ul>
              <li>提供清晰的进度反馈</li>
              <li>实现拖拽上传功能</li>
              <li>添加文件预览功能</li>
              <li>支持上传取消操作</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🚀</div>
            <h3>性能优化</h3>
            <ul>
              <li>压缩图片/视频后再上传</li>
              <li>分片上传大文件</li>
              <li>并发上传多个小文件</li>
              <li>使用CDN加速上传</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🔄</div>
            <h3>错误处理</h3>
            <ul>
              <li>处理网络中断情况</li>
              <li>实现断点续传功能</li>
              <li>提供友好的错误提示</li>
              <li>记录上传失败日志</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>前端文件上传控制 | 现代Web应用核心技术 | Vue 3 技术演示</p>
      <p>掌握文件上传技术，为用户提供流畅的文件操作体验</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例响应式数据
const uploadProgress = ref(0);
const isUploading = ref(false);

// 模拟文件上传函数
const simulateFileUpload = () => {
  isUploading.value = true;
  uploadProgress.value = 0;

  const interval = setInterval(() => {
    uploadProgress.value += 10;
    if (uploadProgress.value >= 100) {
      clearInterval(interval);
      isUploading.value = false;
      console.log("文件上传完成");
    }
  }, 300);
};
</script>

<style lang="less" scoped>


.file-upload-container {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(to bottom, #f7f9fc, #eef2f7);
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
  padding: 20px;
}

.header {
  text-align: center;
  padding: 50px 20px;
  margin-bottom: 30px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaeaea;

  .header-content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .title {
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 15px;
    background: linear-gradient(45deg, #4361ee, #3a0ca3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #555;
    max-width: 600px;
    margin: 0 auto 25px;
  }
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.stat-card {
  background: #f0f7ff;
  padding: 15px 25px;
  border-radius: 12px;
  min-width: 120px;
  text-align: center;
  border: 1px solid #d0e2ff;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }

  .stat-value {
    font-size: 2.2rem;
    font-weight: 700;
    color: #4361ee;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaeaea;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f4f8;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #2b2d42;
    margin: 0;
  }

  .section-icon {
    font-size: 2.5rem;
    margin-right: 20px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f7ff;
    border-radius: 16px;
    color: #4361ee;
  }

  .section-subtitle {
    color: #666;
    font-size: 1.1rem;
    margin-left: 20px;
    margin-top: 5px;
  }
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.concept-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .concept-icon {
    font-size: 3rem;
    margin-bottom: 15px;
    color: #4361ee;
  }

  h3 {
    font-size: 1.4rem;
    color: #2b2d42;
    margin-bottom: 15px;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 15px;
  }
}

.example-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.code-example {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e2e8f0;

  h3 {
    font-size: 1.4rem;
    color: #2b2d42;
    margin-bottom: 15px;
    border-bottom: 2px solid #f0f4f8;
    padding-bottom: 10px;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.feature-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #4361ee;
  }

  h3 {
    font-size: 1.4rem;
    color: #2b2d42;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 15px;
  }
}

.dragdrop-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.explanation {
  h3 {
    font-size: 1.5rem;
    color: #2b2d42;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.1rem;
    color: #444;
    margin-bottom: 20px;
    line-height: 1.8;
  }
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 15px;

  .step-number {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4361ee;
    color: white;
    border-radius: 50%;
    font-weight: 700;
    flex-shrink: 0;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #555;
  }
}

.usecases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.usecase-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e2e8f0;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .usecase-icon {
    font-size: 3rem;
    margin-bottom: 15px;
    color: #4361ee;
  }

  h3 {
    font-size: 1.4rem;
    color: #2b2d42;
    margin-bottom: 15px;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 15px;
  }

  ul {
    text-align: left;
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      color: #555;
      font-size: 0.95rem;
    }
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.practice-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .practice-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: #4361ee;
  }

  h3 {
    font-size: 1.4rem;
    color: #2b2d42;
    margin-bottom: 15px;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin-bottom: 12px;
      padding-left: 25px;
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #4361ee;
        font-size: 1.5rem;
      }
    }
  }
}

.code-block {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  line-height: 1.5;
  margin-top: 15px;
  color: #333;

  pre {
    margin: 0;
  }

  code {
    display: block;
    color: #333;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 25px;
  color: #666;
  font-size: 0.9rem;
  border-top: 1px solid #eaeaea;
  max-width: 1200px;
  margin: 50px auto 0;
}

@media (max-width: 768px) {
  .header .title {
    font-size: 2.5rem;
  }

  .header {
    padding: 30px 15px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;

    .section-subtitle {
      margin-left: 0;
      margin-top: 10px;
    }
  }
}

@media (max-width: 480px) {
  .header .title {
    font-size: 2rem;
  }

  .stat-card {
    min-width: 100px;
    padding: 10px 15px;

    .stat-value {
      font-size: 1.8rem;
    }
  }
}
</style>
