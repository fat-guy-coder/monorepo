<template>
  <div class="upload-container">
    <header class="header-section">
      <div class="header-content">
        <h1>分片上传与断点续传技术</h1>
        <p class="subtitle">优化大文件上传体验的关键技术</p>
        <div class="upload-icon">
          <div class="file-icon">📁</div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: uploadProgress + '%' }"></div>
          </div>
          <div class="server-icon">☁️</div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <section class="concept-section">
        <div class="section-header">
          <h2>什么是分片上传与断点续传？</h2>
          <div class="divider"></div>
        </div>

        <div class="concept-cards">
          <div class="concept-card">
            <div class="card-icon">🧩</div>
            <h3>分片上传</h3>
            <p>将大文件分割成多个小片段（分片）分别上传</p>
            <ul>
              <li>每个分片独立上传</li>
              <li>支持并行上传提高速度</li>
              <li>减少单次请求失败的影响</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon">🔁</div>
            <h3>断点续传</h3>
            <p>上传中断后可以从上次中断点继续上传</p>
            <ul>
              <li>记录已上传的分片</li>
              <li>自动跳过已上传部分</li>
              <li>支持网络不稳定场景</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="card-icon">⚙️</div>
            <h3>组合使用</h3>
            <p>分片上传 + 断点续传 = 强大的上传解决方案</p>
            <ul>
              <li>大文件上传稳定性</li>
              <li>网络中断自动恢复</li>
              <li>浏览器关闭后继续上传</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="use-cases">
        <div class="section-header">
          <h2>使用场景</h2>
          <div class="divider"></div>
        </div>

        <div class="case-grid">
          <div class="case-card">
            <div class="case-icon">🎥</div>
            <h3>视频上传平台</h3>
            <p>支持数GB高清视频的上传，网络中断后可继续上传</p>
          </div>

          <div class="case-card">
            <div class="case-icon">📊</div>
            <h3>云存储服务</h3>
            <p>企业级文件存储，支持TB级数据上传</p>
          </div>

          <div class="case-card">
            <div class="case-icon">📱</div>
            <h3>移动应用</h3>
            <p>弱网环境下保证上传可靠性</p>
          </div>

          <div class="case-card">
            <div class="case-icon">🌐</div>
            <h3>跨国传输</h3>
            <p>高延迟网络中保持稳定上传</p>
          </div>
        </div>
      </section>

      <section class="workflow-section">
        <div class="section-header">
          <h2>工作原理</h2>
          <div class="divider"></div>
        </div>

        <div class="workflow-diagram">
          <div class="workflow-step">
            <div class="step-icon">1</div>
            <h3>文件分片</h3>
            <p>将文件分割为固定大小的块（如5MB）</p>
          </div>

          <div class="arrow">➡️</div>

          <div class="workflow-step">
            <div class="step-icon">2</div>
            <h3>上传分片</h3>
            <p>并行上传所有分片到服务器</p>
          </div>

          <div class="arrow">➡️</div>

          <div class="workflow-step">
            <div class="step-icon">3</div>
            <h3>记录进度</h3>
            <p>服务器存储已上传分片信息</p>
          </div>

          <div class="arrow">➡️</div>

          <div class="workflow-step">
            <div class="step-icon">4</div>
            <h3>合并文件</h3>
            <p>所有分片上传完成后合并为完整文件</p>
          </div>
        </div>

        <div class="resume-diagram">
          <div class="resume-step">
            <div class="step-icon">🔄</div>
            <h3>断点续传流程</h3>
            <p>1. 客户端查询已上传分片</p>
            <p>2. 服务器返回缺失分片列表</p>
            <p>3. 客户端仅上传缺失分片</p>
            <p>4. 合并所有分片完成上传</p>
          </div>
        </div>
      </section>

      <section class="code-section">
        <div class="section-header">
          <h2>Vue3 实现示例</h2>
          <div class="divider"></div>
        </div>

        <div class="code-container">
          <div class="code-block">
            <h3>文件分片处理</h3>
            <pre><code>// 创建文件分片
//chunkSize可以让用户设置，也可以根据网络情况动态调整
//并发也可以控制，也可以根据网络情况动态调整
function createFileChunks(file: File, chunkSize: number) {
  const chunks = [];
  let start = 0;

  while (start &lt; file.size) {
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    chunks.push(chunk);
    start = end;
  }

  return chunks;
}

// 示例使用
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
const file = document.getElementById('file-input').files[0];
const chunks = createFileChunks(file, CHUNK_SIZE);</code></pre>
          </div>

          <div class="code-block">
            <h3>分片上传逻辑</h3>
            <pre><code>// 上传单个分片
async function uploadChunk(chunk: Blob, index: number, fileId: string) {
  const formData = new FormData();
  formData.append('file', chunk);
  formData.append('chunkIndex', index.toString());
  formData.append('totalChunks', totalChunks.toString());
  formData.append('fileId', fileId);

  try {
    await axios.post('/upload-chunk', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        // 更新分片上传进度
      }
    });
    // 标记该分片上传完成
    uploadedChunks.value[index] = true;
  } catch (error) {
    console.error(`分片 ${index} 上传失败:`, error);
  }
}

// 计算文件的hash值作为文件id
function hashFile(file: File, cb: (hash: string) => void) {
  let hash ;
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    const arrayBuffer = reader.result as ArrayBuffer;
    hash = sha256/sha384(arrayBuffer)//或者使用库例如spark-md5处理arrayBuffer;
    cb(hash);
  };
}

//因为进行hash计算比较耗时，可以利用worker线程进行计算
self.onmessage = (event) => {
  const file = event.data;
  // 计算文件的hash值作为文件id hash后返回给主线程
  hashFile(file, self.postMessage);
};

// 计算文件的hash值作为文件id
function getHash(file: File, cb: (hash: string) => void) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./hash.worker.js', import.meta.url));
    worker.postMessage(file);
    worker.onmessage = (event) => {
      resolve(event.data);
    };
    worker.onerror = (error) => {
      reject(error);
  });
}

// 并行上传所有分片
async function uploadAllChunks() {
  const uploadPromises = chunks.map((chunk, index) => {
    if (!uploadedChunks.value[index]) {
      // 计算文件的hash值作为文件id
      const fileId = await getHash(chunk);
      return uploadChunk(chunk, index, fileId);
    }
    return Promise.resolve();
  });

  await Promise.all(uploadPromises);//这里可以控制并发数
}</code></pre>
          </div>

          <div class="code-block">
            <h3>断点续传实现</h3>
            <pre><code>// 检查已上传分片
async function checkUploadedChunks(fileId: string) {
  try {
    const response = await axios.get(`/upload-status?fileId=${fileId}`);
    return response.data.uploadedChunks || [];
  } catch (error) {
    console.error('获取上传状态失败:', error);
    return [];
  }
}

// 恢复上传
async function resumeUpload(file: File, fileId: string) {
  // 获取已上传分片信息
  const uploaded = await checkUploadedChunks(fileId);

  // 创建分片
  const chunks = createFileChunks(file, CHUNK_SIZE);

  // 初始化上传状态
  uploadedChunks.value = Array(chunks.length).fill(false);
  uploaded.forEach(index => {
    uploadedChunks.value[index] = true;
  });

  // 开始上传缺失分片
  await uploadAllChunks();

  // 所有分片上传完成后合并
  await axios.post('/merge-chunks', {
    fileId: fileId,
    fileName: file.name,
    totalChunks: chunks.length
  });
}</code></pre>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <div class="section-header">
          <h2>最佳实践</h2>
          <div class="divider"></div>
        </div>

        <div class="practices-grid">
          <div class="practice-card">
            <h3>分片大小优化</h3>
            <p>根据网络情况动态调整分片大小（2-10MB）</p>
          </div>

          <div class="practice-card">
            <h3>并行控制</h3>
            <p>限制同时上传的分片数量（3-5个）</p>
          </div>

          <div class="practice-card">
            <h3>进度反馈</h3>
            <p>实时显示上传进度和速度</p>
          </div>

          <div class="practice-card">
            <h3>错误处理</h3>
            <p>实现分片上传失败自动重试机制</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer-section">
      <p>© 2023 分片上传与断点续传技术 | Vue3实现示例</p>
      <p>大文件上传的理想解决方案</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const uploadProgress = ref(0);

// 模拟上传进度动画
setInterval(() => {
  if (uploadProgress.value < 100) {
    uploadProgress.value += 1;
  } else {
    uploadProgress.value = 0;
  }
}, 100);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9fa;
@dark-bg: #2b2d42;
@success-color: #2ec4b6;
@warning-color: #ff9f1c;
@text-color: #333;
@light-text: #f8f9fa;
@border-color: #e0e0e0;
@shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.upload-container {
  background-color: #f0f7ff;
  color: @text-color;
  min-height: 100vh;
  padding-bottom: 2rem;
}

.header-section {
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: @light-text;
  padding: 3rem 1.5rem 4rem;
  border-radius: 0 0 30px 30px;
  text-align: center;
  box-shadow: @shadow;

  .header-content {
    max-width: 1200px;
    margin: 0 auto;

    h1 {
      font-size: 2.8rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.4rem;
      opacity: 0.9;
      margin-bottom: 2.5rem;
    }
  }

  .upload-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;

    .file-icon,
    .server-icon {
      font-size: 3rem;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: float 3s ease-in-out infinite;
    }

    .server-icon {
      animation-delay: 0.5s;
    }

    .progress-bar {
      width: 400px;
      height: 20px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      overflow: hidden;
      position: relative;

      .progress {
        position: absolute;
        height: 100%;
        background: linear-gradient(90deg, @accent-color, #4cc9f0);
        border-radius: 10px;
        transition: width 0.5s ease;
      }
    }
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: -2rem auto 0;
  padding: 0 1.5rem;
  position: relative;
  z-index: 10;
}

.section-header {
  margin-bottom: 2.5rem;
  text-align: center;

  h2 {
    font-size: 2.2rem;
    color: @secondary-color;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: @accent-color;
      border-radius: 2px;
    }
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, @border-color, transparent);
    margin: 1.5rem auto;
    max-width: 800px;
  }
}

.concept-section {
  margin-bottom: 4rem;

  .concept-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;

    .concept-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: @shadow;
      transition: transform 0.3s, box-shadow 0.3s;
      border-top: 4px solid @primary-color;

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
      }

      .card-icon {
        font-size: 3rem;
        margin-bottom: 1.5rem;
      }

      h3 {
        color: @secondary-color;
        font-size: 1.6rem;
        margin-bottom: 1rem;
      }

      p {
        margin-bottom: 1rem;
        line-height: 1.6;
      }

      ul {
        padding-left: 1.5rem;
        margin-top: 1rem;

        li {
          margin-bottom: 0.5rem;
          position: relative;

          &::before {
            content: '•';
            color: @primary-color;
            font-weight: bold;
            position: absolute;
            left: -1rem;
          }
        }
      }
    }
  }
}

.use-cases {
  margin-bottom: 4rem;

  .case-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .case-card {
      background: white;
      border-radius: 12px;
      padding: 1.8rem;
      text-align: center;
      box-shadow: @shadow;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        color: white;

        .case-icon,
        h3 {
          color: white;
        }
      }

      .case-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: @primary-color;
      }

      h3 {
        font-size: 1.4rem;
        margin-bottom: 0.8rem;
        color: @secondary-color;
      }

      p {
        line-height: 1.6;
      }
    }
  }
}

.workflow-section {
  margin-bottom: 4rem;

  .workflow-diagram {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 3rem;

    .workflow-step {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      text-align: center;
      width: 200px;
      box-shadow: @shadow;

      .step-icon {
        width: 50px;
        height: 50px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin: 0 auto 1rem;
      }

      h3 {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
        color: @secondary-color;
      }
    }

    .arrow {
      font-size: 1.5rem;
      color: @primary-color;
      animation: pulse 2s infinite;
    }
  }

  .resume-diagram {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: @shadow;
    max-width: 800px;
    margin: 0 auto;

    .resume-step {
      .step-icon {
        font-size: 3rem;
        text-align: center;
        margin-bottom: 1.5rem;
        color: @primary-color;
      }

      h3 {
        text-align: center;
        font-size: 1.8rem;
        color: @secondary-color;
        margin-bottom: 1.5rem;
      }

      p {
        padding: 0.8rem 1.5rem;
        background: @light-bg;
        border-left: 3px solid @primary-color;
        margin-bottom: 0.8rem;
        border-radius: 0 8px 8px 0;
        font-size: 1.1rem;
      }
    }
  }
}

.code-section {
  margin-bottom: 4rem;

  .code-container {

    .code-block {
      background: #2d3748;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: @shadow;

      h3 {
        background: lighten(#2d3748, 10%);
        color: @accent-color;
        padding: 1rem 1.5rem;
        font-size: 1.2rem;
      }

      pre {
        padding: 1.5rem;
        overflow-x: auto;

        code {
          color: #cbd5e0;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.95rem;
          line-height: 1.6;

          .comment {
            color: #718096;
          }

          .keyword {
            color: #f472b6;
          }

          .function {
            color: #63b3ed;
          }

          .string {
            color: #68d391;
          }
        }
      }
    }
  }
}

.best-practices {
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .practice-card {
      background: white;
      border-radius: 12px;
      padding: 1.8rem;
      box-shadow: @shadow;
      border-top: 3px solid @success-color;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      h3 {
        color: @secondary-color;
        font-size: 1.3rem;
        margin-bottom: 1rem;
        position: relative;
        padding-left: 30px;

        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: @success-color;
          font-weight: bold;
        }
      }

      p {
        line-height: 1.6;
        color: #555;
      }
    }
  }
}

.footer-section {
  text-align: center;
  padding: 2rem;
  color: #666;
  margin-top: 3rem;

  p {
    margin-bottom: 0.5rem;
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }
}

@media (max-width: 768px) {
  .header-section {
    padding: 2rem 1rem 3rem;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }

    .upload-icon {
      flex-direction: column;
      gap: 1.5rem;

      .progress-bar {
        width: 100%;
        max-width: 300px;
      }
    }
  }

  .workflow-diagram {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
    }
  }

  .section-header h2 {
    font-size: 1.8rem;
  }
}
</style>
