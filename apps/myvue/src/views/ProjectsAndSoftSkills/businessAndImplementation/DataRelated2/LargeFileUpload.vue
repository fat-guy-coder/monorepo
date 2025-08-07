<template>
  <div class="large-file-upload">
    <header>
      <h1>大文件上传解决方案</h1>
      <p>高效处理GB级文件上传的前端技术实现</p>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">4</div>
          <div class="stat-label">核心技术</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">5</div>
          <div class="stat-label">优化策略</div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <!-- 概述部分 -->
      <div class="section">
        <h2>📌 大文件上传概述</h2>
        <div class="overview-grid">
          <div class="overview-card">
            <h3>为什么需要特殊处理？</h3>
            <ul>
              <li>避免请求超时（HTTP请求时间限制）</li>
              <li>防止内存溢出（浏览器内存限制）</li>
              <li>网络不稳定时支持断点续传</li>
              <li>提升上传速度和用户体验</li>
            </ul>
          </div>
          <div class="overview-card">
            <h3>传统上传的局限性</h3>
            <ul>
              <li>单次请求上传整个文件</li>
              <li>无进度反馈</li>
              <li>失败需重新上传</li>
              <li>大文件容易失败</li>
            </ul>
          </div>
          <div class="overview-card">
            <h3>核心解决方案</h3>
            <div class="solutions">
              <div class="solution">文件分片</div>
              <div class="solution">并发控制</div>
              <div class="solution">断点续传</div>
              <div class="solution">秒传检测</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实现流程 -->
      <div class="section">
        <h2>🔄 大文件上传实现流程</h2>
        <div class="upload-flow">
          <div class="flow-step">
            <div class="step-header">
              <div class="step-number">1</div>
              <h3>文件分片</h3>
            </div>
            <div class="step-content">
              <div class="step-desc">
                <p>将大文件切割为固定大小的小块（如5MB/片）</p>
                <pre class="code-block">function createFileChunks(file, chunkSize = 5 * 1024 * 1024) {
  const chunks = [];
  let start = 0;

  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    chunks.push(chunk);
    start = end;
  }

  return chunks;
}</pre>
              </div>
              <div class="step-visual">
                <div class="file-chunks">
                  <div class="chunk" v-for="i in 8" :key="i" :style="{ width: `${Math.random() * 30 + 20}px` }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="flow-step">
            <div class="step-header">
              <div class="step-number">2</div>
              <h3>计算文件唯一标识</h3>
            </div>
            <div class="step-content">
              <div class="step-desc">
                <p>使用文件内容生成唯一hash值，用于秒传和断点续传</p>
                <pre class="code-block">async function calculateFileHash(chunks) {
  return new Promise(resolve => {
    const spark = new SparkMD5.ArrayBuffer();
    let count = 0;

    const loadNext = index => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(chunks[index]);
      reader.onload = e => {
        spark.append(e.target.result);
        count++;

        if (count === chunks.length) {
          resolve(spark.end());
        } else {
          loadNext(count);
        }
      };
    };

    loadNext(0);
  });
}</pre>
              </div>
              <div class="step-visual">
                <div class="hash-value">
                  <div class="hash-text">d41d8cd98f00b204e9800998ecf8427e</div>
                </div>
              </div>
            </div>
          </div>

          <div class="flow-step">
            <div class="step-header">
              <div class="step-number">3</div>
              <h3>上传分片</h3>
            </div>
            <div class="step-content">
              <div class="step-desc">
                <p>并发上传分片文件，支持暂停和恢复</p>
                <pre class="code-block">async function uploadChunks(fileHash, chunks, uploadedChunks) {
  const requests = chunks
    .filter(chunk => !uploadedChunks.includes(chunk.name))
    .map((chunk, index) => {
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('hash', fileHash);
      formData.append('index', index);
      formData.append('total', chunks.length);

      return { formData, index, status: 'pending' };
    });

  // 使用并发控制上传
  return parallelUpload(requests, 4); // 4个并发
}</pre>
              </div>
              <div class="step-visual">
                <div class="upload-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '65%' }"></div>
                  </div>
                  <div class="progress-text">65% 已上传</div>
                  <div class="chunk-status">
                    <div class="status success" v-for="i in 6" :key="i"></div>
                    <div class="status uploading" v-for="i in 2" :key="i"></div>
                    <div class="status pending" v-for="i in 4" :key="i"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flow-step">
            <div class="step-header">
              <div class="step-number">4</div>
              <h3>合并文件</h3>
            </div>
            <div class="step-content">
              <div class="step-desc">
                <p>所有分片上传完成后，通知后端合并文件</p>
                <pre class="code-block">async function mergeChunks(filename, fileHash, totalChunks) {
  const response = await fetch('/api/merge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filename,
      fileHash,
      total: totalChunks
    })
  });

  return response.json();
}</pre>
              </div>
              <div class="step-visual">
                <div class="merge-animation">
                  <div class="chunks-group">
                    <div class="chunk" v-for="i in 8" :key="i"></div>
                  </div>
                  <div class="merge-arrow">→</div>
                  <div class="file-icon">
                    <div class="file-icon-inner">📄 file.zip</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心实现代码 -->
      <div class="section">
        <h2>💻 核心实现代码</h2>
        <div class="implementation-grid">
          <div class="impl-card">
            <h3>文件切片与并发控制</h3>
            <pre class="code-block">// 并发控制函数
async function parallelUpload(tasks, max = 4) {
  const results = [];
  const executing = [];

  for (const task of tasks) {
    const p = Promise.resolve().then(() =>
      uploadChunk(task.formData).then(res => {
        task.status = 'success';
        return res;
      }).catch(err => {
        task.status = 'failed';
        throw err;
      })
    );

    results.push(p);

    if (max <= tasks.length) {
      const e = p.then(() =>
        executing.splice(executing.indexOf(e), 1)
      );
      executing.push(e);

      if (executing.length >= max) {
        await Promise.race(executing);
      }
    }
  }

  return Promise.all(results);
}

// 上传单个分片
async function uploadChunk(formData) {
  return fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
}</pre>
          </div>
          <div class="impl-card">
            <h3>断点续传实现</h3>
            <pre class="code-block">// 检查已上传分片
async function checkUploadedChunks(fileHash) {
  const response = await fetch(`/api/check?hash=${fileHash}`);
  const data = await response.json();
  return data.uploadedChunks || [];
}

// 保存上传进度
function saveProgress(fileHash, index) {
  const progress = JSON.parse(localStorage.getItem(fileHash) || [];
  if (!progress.includes(index)) {
    progress.push(index);
    localStorage.setItem(fileHash, JSON.stringify(progress));
  }
}

// 恢复上传
async function resumeUpload(file) {
  const chunks = createFileChunks(file);
  const fileHash = await calculateFileHash(chunks);
  const uploaded = await checkUploadedChunks(fileHash);

  // 从本地存储获取进度
  const localProgress = JSON.parse(localStorage.getItem(fileHash)) || [];
  const uploadedChunks = [...new Set([...uploaded, ...localProgress])];

  return uploadChunks(fileHash, chunks, uploadedChunks);
}</pre>
          </div>
          <div class="impl-card">
            <h3>秒传功能实现</h3>
            <pre class="code-block">// 检查文件是否已存在
async function checkFileExists(fileHash) {
  const response = await fetch(`/api/check-exists?hash=${fileHash}`);
  const result = await response.json();

  if (result.exists) {
    return {
      success: true,
      message: '文件秒传成功',
      data: result.fileInfo
    };
  }

  return false;
}

// 完整上传流程
async function uploadLargeFile(file) {
  // 1. 文件分片
  const chunks = createFileChunks(file);

  // 2. 计算文件hash
  const fileHash = await calculateFileHash(chunks);

  // 3. 秒传检测
  const instantUpload = await checkFileExists(fileHash);
  if (instantUpload) return instantUpload;

  // 4. 获取已上传分片
  const uploadedChunks = await checkUploadedChunks(fileHash);

  // 5. 上传分片
  const uploadResult = await uploadChunks(fileHash, chunks, uploadedChunks);

  // 6. 合并文件
  const mergeResult = await mergeChunks(file.name, fileHash, chunks.length);

  // 7. 清理本地进度
  localStorage.removeItem(fileHash);

  return mergeResult;
}</pre>
          </div>
          <div class="impl-card">
            <h3>进度显示与暂停</h3>
            <pre class="code-block">// Vue组件中实现
const uploadState = reactive({
  file: null as File | null,
  progress: 0,
  uploadedChunks: [] as number[],
  totalChunks: 0,
  isPaused: false,
  uploadController: null as AbortController | null
});

// 暂停上传
function pauseUpload() {
  if (uploadState.uploadController) {
    uploadState.uploadController.abort();
    uploadState.isPaused = true;
  }
}

// 恢复上传
function resumeUpload() {
  if (uploadState.file) {
    uploadState.isPaused = false;
    startUpload(uploadState.file);
  }
}

// 计算进度
const progressPercent = computed(() => {
  if (uploadState.totalChunks === 0) return 0;
  return Math.round(
    (uploadState.uploadedChunks.length / uploadState.totalChunks) * 100
  );
});

// 上传处理
async function startUpload(file: File) {
  uploadState.file = file;
  uploadState.isPaused = false;

  // 创建新的AbortController
  uploadState.uploadController = new AbortController();

  try {
    const result = await uploadLargeFile(file);
    console.log('上传成功', result);
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('上传失败', err);
    }
  }
}</pre>
          </div>
        </div>
      </div>

      <!-- 优化策略 -->
      <div class="section">
        <h2>⚡ 大文件上传优化策略</h2>
        <div class="optimization-grid">
          <div class="optimization-card">
            <div class="icon">🚀</div>
            <h3>并发上传控制</h3>
            <p>限制同时上传的分片数量，避免浏览器资源耗尽</p>
          </div>
          <div class="optimization-card">
            <div class="icon">⏱️</div>
            <h3>请求超时处理</h3>
            <p>为每个分片上传设置超时，自动重试失败请求</p>
          </div>
          <div class="optimization-card">
            <div class="icon">🔄</div>
            <h3>失败自动重试</h3>
            <p>对失败的分片进行自动重试（最多3次）</p>
          </div>
          <div class="optimization-card">
            <div class="icon">💾</div>
            <h3>本地进度保存</h3>
            <p>使用localStorage保存上传进度，支持页面刷新后恢复</p>
          </div>
          <div class="optimization-card">
            <div class="icon">⚡</div>
            <h3>Web Worker计算哈希</h3>
            <p>将耗时的哈希计算放入Web Worker，避免阻塞UI</p>
          </div>
        </div>
      </div>

      <!-- 上传演示 -->
      <div class="section">
        <h2>📤 大文件上传演示</h2>
        <div class="upload-demo">
          <div class="demo-container">
            <div class="drop-area" @dragover.prevent @drop="handleDrop">
              <div class="drop-content">
                <div class="upload-icon">📤</div>
                <p>拖放文件到此处或</p>
                <button class="select-btn">选择文件</button>
              </div>
            </div>

            <div class="file-info" v-if="demo.file">
              <div class="file-name">{{ demo.file.name }}</div>
              <div class="file-size">{{ formatFileSize(demo.file.size) }}</div>
              <div class="file-hash">Hash: {{ demo.fileHash || '计算中...' }}</div>
            </div>

            <div class="progress-container" v-if="demo.file">
              <div class="progress-header">
                <span>上传进度</span>
                <span>{{ demo.progress }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: `${demo.progress}%` }"></div>
              </div>

              <div class="controls">
                <button class="control-btn" @click="demo.isPaused ? resumeDemo() : pauseDemo()">
                  {{ demo.isPaused ? '继续' : '暂停' }}
                </button>
                <button class="control-btn" @click="cancelDemo">取消</button>
              </div>
            </div>
          </div>

          <div class="demo-explanation">
            <h3>演示功能说明</h3>
            <ul>
              <li>支持拖放或点击选择大文件（虚拟演示）</li>
              <li>文件分片处理（默认5MB/片）</li>
              <li>实时上传进度显示</li>
              <li>暂停/继续上传功能</li>
              <li>文件Hash计算（模拟）</li>
              <li>上传速度显示（模拟）</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>大文件上传解决方案 © 2023 | 使用Vue3 + TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

// 演示状态
const demo = reactive({
  file: null as File | null,
  progress: 0,
  fileHash: '',
  isPaused: false,
  uploadInterval: null as number | null
});

// 处理文件拖放
function handleDrop(event: DragEvent) {
  event.preventDefault();
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    demo.file = event.dataTransfer.files[0];
    startDemoUpload();
  }
}

// 格式化文件大小
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 开始演示上传
function startDemoUpload() {
  demo.progress = 0;
  demo.isPaused = false;

  // 模拟文件Hash计算
  setTimeout(() => {
    demo.fileHash = 'd41d8cd98f00b204e9800998ecf8427e';
  }, 1000);

  // 模拟上传进度
  if (demo.uploadInterval) clearInterval(demo.uploadInterval);

  demo.uploadInterval = setInterval(() => {
    if (!demo.isPaused && demo.progress < 100) {
      demo.progress += Math.random() * 5;
      if (demo.progress > 100) demo.progress = 100;
    }

    if (demo.progress >= 100) {
      if (demo.uploadInterval) clearInterval(demo.uploadInterval);
    }
  }, 300);
}

// 暂停上传
function pauseDemo() {
  demo.isPaused = true;
}

// 继续上传
function resumeDemo() {
  demo.isPaused = false;
}

// 取消上传
function cancelDemo() {
  if (demo.uploadInterval) clearInterval(demo.uploadInterval);
  demo.file = null;
  demo.progress = 0;
  demo.fileHash = '';
  demo.isPaused = false;
}
</script>

<style lang="less" scoped>


.large-file-upload {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background-color: #f8fafc;
  min-height: 100vh;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 20px;
    background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
    border-radius: 12px;
    color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 25px;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;

      .stat-card {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 10px;
        padding: 15px 25px;
        min-width: 120px;

        .stat-value {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.95rem;
          opacity: 0.85;
        }
      }
    }
  }

  .content-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 30px;
  }

  .section {
    margin-bottom: 40px;

    h2 {
      font-size: 1.8rem;
      color: #4361ee;
      margin-bottom: 25px;
      padding-bottom: 12px;
      border-bottom: 2px solid #eef2ff;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 80px;
        height: 3px;
        background: #4361ee;
        border-radius: 3px;
      }
    }
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;

    .overview-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;

      h3 {
        font-size: 1.3rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 10px;
          position: relative;
          font-size: 0.95rem;
          color: #475569;

          &::before {
            content: '•';
            color: #4361ee;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }

      .solutions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 15px;

        .solution {
          background: #eef2ff;
          color: #4361ee;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
      }
    }
  }

  .upload-flow {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .flow-step {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
    border-left: 4px solid #4361ee;

    .step-header {
      display: flex;
      align-items: center;
      padding: 18px 25px;
      background: #f8f9fe;
      border-bottom: 1px solid #eef0f9;

      .step-number {
        background: #4361ee;
        color: white;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: bold;
        margin-right: 15px;
      }

      h3 {
        margin: 0;
        font-size: 1.4rem;
        color: #3a0ca3;
      }
    }

    .step-content {
      display: flex;
      padding: 25px;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .step-desc {
        flex: 3;
        padding-right: 25px;

        p {
          font-size: 0.95rem;
          color: #475569;
          margin-bottom: 15px;
          line-height: 1.6;
        }
      }

      .step-visual {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 250px;
      }
    }
  }

  .file-chunks {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    max-width: 250px;

    .chunk {
      height: 30px;
      background: #e0e7ff;
      border-radius: 4px;
      flex-shrink: 0;
    }
  }

  .hash-value {
    background: #f0f5ff;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 0.85rem;
    word-break: break-all;
  }

  .upload-progress {
    width: 100%;

    .progress-bar {
      height: 10px;
      background: #e2e8f0;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 10px;

      .progress-fill {
        height: 100%;
        background: linear-gradient(to right, #4ade80, #3b82f6);
        border-radius: 5px;
        transition: width 0.3s ease;
      }
    }

    .progress-text {
      text-align: center;
      font-weight: 500;
      color: #3b82f6;
      margin-bottom: 10px;
    }

    .chunk-status {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;

      .status {
        width: 20px;
        height: 20px;
        border-radius: 4px;

        &.success {
          background: #4ade80;
        }

        &.uploading {
          background: #3b82f6;
          animation: pulse 1.5s infinite;
        }

        &.pending {
          background: #e2e8f0;
        }
      }
    }
  }

  .merge-animation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    .chunks-group {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      width: 100px;

      .chunk {
        width: 20px;
        height: 20px;
        background: #a5b4fc;
        border-radius: 3px;
        animation: float 3s infinite;


      }
    }

    .merge-arrow {
      font-size: 1.5rem;
      color: #94a3b8;
    }

    .file-icon {
      width: 80px;
      height: 100px;
      background: white;
      border: 2px dashed #cbd5e1;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      .file-icon-inner {
        text-align: center;
        font-size: 0.9rem;
      }
    }
  }

  .implementation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .impl-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
      }

      h3 {
        font-size: 1.2rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }
    }
  }

  .optimization-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;

    .optimization-card {
      background: white;
      border-radius: 10px;
      padding: 25px 20px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border-top: 3px solid #4361ee;

      .icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h3 {
        font-size: 1.2rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p {
        font-size: 0.95rem;
        color: #475569;
        margin: 0;
        line-height: 1.5;
      }
    }
  }

  .upload-demo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .demo-container {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }

    .drop-area {
      border: 2px dashed #cbd5e1;
      border-radius: 10px;
      padding: 40px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        border-color: #6366f1;
        background: #f8fafc;
      }

      .drop-content {
        .upload-icon {
          font-size: 3rem;
          margin-bottom: 15px;
          color: #6366f1;
        }

        p {
          margin: 0 0 15px 0;
          color: #64748b;
        }

        .select-btn {
          background: #6366f1;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;

          &:hover {
            background: #4f46e5;
          }
        }
      }
    }

    .file-info {
      margin-top: 20px;
      padding: 15px;
      background: #f1f5f9;
      border-radius: 8px;

      .file-name {
        font-weight: 600;
        margin-bottom: 5px;
      }

      .file-size {
        font-size: 0.9rem;
        color: #64748b;
        margin-bottom: 5px;
      }

      .file-hash {
        font-family: 'Fira Code', monospace;
        font-size: 0.8rem;
        word-break: break-all;
        color: #475569;
      }
    }

    .progress-container {
      margin-top: 20px;

      .progress-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 0.95rem;
        color: #475569;
      }

      .progress-bar {
        height: 10px;
        background: #e2e8f0;
        border-radius: 5px;
        overflow: hidden;

        .progress-fill {
          height: 100%;
          background: linear-gradient(to right, #4ade80, #3b82f6);
          border-radius: 5px;
          transition: width 0.5s ease;
        }
      }

      .controls {
        display: flex;
        gap: 10px;
        margin-top: 20px;

        .control-btn {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;

          &:first-child {
            background: #3b82f6;
            color: white;

            &:hover {
              background: #2563eb;
            }
          }

          &:last-child {
            background: #f1f5f9;
            color: #64748b;

            &:hover {
              background: #e2e8f0;
            }
          }
        }
      }
    }

    .demo-explanation {
      h3 {
        font-size: 1.3rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 10px;
          position: relative;
          font-size: 0.95rem;
          color: #475569;

          &::before {
            content: '•';
            color: #4361ee;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
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
    font-size: 0.85rem;
    overflow-x: auto;
    line-height: 1.5;
    margin: 15px 0;
  }

  footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #64748b;
    font-size: 0.9rem;
    border-top: 1px solid #e2e8f0;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-5px);
    }

    100% {
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    header {
      h1 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1rem;
      }

      .stats {
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }
    }

    .flow-step .step-content {
      flex-direction: column;
      gap: 20px;

      .step-desc {
        padding-right: 0;
      }
    }
  }
}
</style>
