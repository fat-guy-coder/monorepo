<template>
  <div class="file-apis-container">
    <header class="header">
      <h1>JavaScript 文件处理接口详解</h1>
      <p>探索 FileReader、ReadableStream 和 WritableStream 之外的文件处理能力</p>
    </header>

    <div class="content-grid">
      <!-- Blob API -->
      <section class="card blob-api">
        <div class="section-header">
          <div class="icon">📦</div>
          <h2>Blob API</h2>
        </div>
        <div class="content">
          <div class="api-intro">
            <p>Blob（Binary Large Object）表示不可变的原始数据类文件对象，是 JavaScript 中处理二进制数据的基础。</p>
          </div>

          <div class="usage">
            <h3>核心功能与用法</h3>
            <div class="usage-grid">
              <div class="usage-card">
                <h4>创建 Blob</h4>
                <pre><code>// 从文本创建
const textBlob = new Blob(['Hello, World!'],
  { type: 'text/plain' });

// 从数组创建
const data = [new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f])];
const binaryBlob = new Blob(data,
  { type: 'application/octet-stream' });</code></pre>
              </div>

              <div class="usage-card">
                <h4>Blob 操作</h4>
                <pre><code>// 获取 Blob 信息
console.log(textBlob.size); // 13
console.log(textBlob.type); // "text/plain"

// 切片操作
const sliced = textBlob.slice(0, 5, 'text/plain');

// 转换为 URL
const url = URL.createObjectURL(textBlob);
console.log(url); // blob:https://example.com/...</code></pre>
              </div>
            </div>
          </div>

          <div class="scenario">
            <h3>使用场景</h3>
            <ul>
              <li>在内存中创建文件对象</li>
              <li>分片上传大文件</li>
              <li>动态生成下载内容</li>
              <li>图像处理与预览</li>
            </ul>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li>轻量级二进制数据处理</li>
                <li>支持大文件分片操作</li>
                <li>内存高效</li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li>不能直接修改内容</li>
                <li>需要手动释放内存</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- File API -->
      <section class="card file-api">
        <div class="section-header">
          <div class="icon">📄</div>
          <h2>File API</h2>
        </div>
        <div class="content">
          <div class="api-intro">
            <p>File 对象继承自 Blob，提供了关于文件的元信息（如文件名、最后修改时间、MIME 类型等）。</p>
          </div>

          <div class="usage">
            <h3>文件获取与操作</h3>
            <div class="usage-grid">
              <div class="usage-card">
                <h4>获取文件对象</h4>
                <pre><code>// 通过 input 元素获取
const input = document.querySelector('input[type="file"]');
input.addEventListener('change', (e) => {
  const file = e.target.files[0];
  console.log(file.name, file.size);
});

// 拖放获取文件
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  // 处理文件...
});</code></pre>
              </div>

              <div class="usage-card">
                <h4>文件信息与处理</h4>
                <pre><code>// 获取文件信息
function getFileInfo(file) {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
  };
}

// 创建 File 对象
const file = new File(['File content'], 'example.txt', {
  type: 'text/plain',
  lastModified: Date.now()
});</code></pre>
              </div>
            </div>
          </div>

          <div class="scenario">
            <h3>使用场景</h3>
            <ul>
              <li>表单文件上传</li>
              <li>拖放文件交互</li>
              <li>文件元信息获取</li>
              <li>客户端文件操作</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- File System Access API -->
      <section class="card fs-api">
        <div class="section-header">
          <div class="icon">🗂️</div>
          <h2>File System Access API</h2>
        </div>
        <div class="content">
          <div class="api-intro">
            <p>提供对用户本地文件系统的访问能力，允许读写文件和目录（需要用户授权）。</p>
          </div>

          <div class="usage">
            <h3>文件与目录操作</h3>
            <div class="usage-grid">
              <div class="usage-card">
                <h4>文件读写</h4>
                <pre><code>// 打开文件
const fileHandle = await window.showOpenFilePicker();

// 读取文件内容
const file = await fileHandle[0].getFile();
const content = await file.text();

// 写入文件
const writable = await fileHandle[0].createWritable();
await writable.write('New content');
await writable.close();</code></pre>
              </div>

              <div class="usage-card">
                <h4>目录操作</h4>
                <pre><code>// 打开目录
const dirHandle = await window.showDirectoryPicker();

// 遍历目录
for await (const entry of dirHandle.values()) {
  console.log(entry.kind, entry.name);
}

// 创建文件
const newFileHandle = await dirHandle.getFileHandle(
  'new.txt', { create: true }
);</code></pre>
              </div>
            </div>
          </div>

          <div class="scenario">
            <h3>使用场景</h3>
            <ul>
              <li>本地文件编辑器应用</li>
              <li>离线数据处理工具</li>
              <li>大型媒体文件处理</li>
              <li>数据导出/备份工具</li>
            </ul>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li>强大的本地文件访问能力</li>
                <li>高性能处理大文件</li>
                <li>支持目录操作</li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li>需要用户授权</li>
                <li>浏览器兼容性有限</li>
                <li>安全限制较多</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- FormData API -->
      <section class="card formdata-api">
        <div class="section-header">
          <div class="icon">📝</div>
          <h2>FormData API</h2>
        </div>
        <div class="content">
          <div class="api-intro">
            <p>提供构建表单数据的方法，特别适合通过 AJAX 或 Fetch API 上传文件。</p>
          </div>

          <div class="usage">
            <h3>文件上传</h3>
            <div class="usage-grid">
              <div class="usage-card">
                <h4>创建 FormData</h4>
                <pre><code>// 通过表单元素创建
const form = document.querySelector('form');
const formData = new FormData(form);

// 手动添加文件
const formData = new FormData();
const fileInput = document.querySelector('input[type="file"]');
formData.append('avatar', fileInput.files[0]);
formData.append('username', 'JohnDoe');</code></pre>
              </div>

              <div class="usage-card">
                <h4>发送 FormData</h4>
                <pre><code>// 使用 Fetch API 发送
fetch('/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));

// 使用 XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('POST', '/upload', true);
xhr.send(formData);</code></pre>
              </div>
            </div>
          </div>

          <div class="scenario">
            <h3>使用场景</h3>
            <ul>
              <li>多文件表单上传</li>
              <li>带文件的 AJAX 请求</li>
              <li>复杂表单数据处理</li>
              <li>与后端文件处理集成</li>
            </ul>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li>简化文件上传过程</li>
                <li>支持多部分表单数据</li>
                <li>浏览器兼容性好</li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li>对二进制数据控制有限</li>
                <li>不能处理超大文件</li>
                <li>缺乏进度跟踪</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Compression Streams API -->
      <section class="card compression-api">
        <div class="section-header">
          <div class="icon">🗜️</div>
          <h2>Compression Streams API</h2>
        </div>
        <div class="content">
          <div class="api-intro">
            <p>提供流式压缩和解压缩功能，支持 GZIP 和 DEFLATE 格式。</p>
          </div>

          <div class="usage">
            <h3>压缩与解压缩</h3>
            <div class="usage-grid">
              <div class="usage-card">
                <h4>压缩数据</h4>
                <pre><code>// 压缩文本
const text = 'Hello, World!';
const encoder = new TextEncoder();
const data = encoder.encode(text);

const compressedStream = new CompressionStream('gzip');
const writer = compressedStream.writable.getWriter();
writer.write(data);
writer.close();

const compressedData = await new Response(
  compressedStream.readable
).arrayBuffer();</code></pre>
              </div>

              <div class="usage-card">
                <h4>解压缩数据</h4>
                <pre><code>// 解压缩数据
const decompressedStream = new DecompressionStream('gzip');
const writer = decompressedStream.writable.getWriter();
writer.write(compressedData);
writer.close();

const decompressedData = await new Response(
  decompressedStream.readable
).arrayBuffer();

const decoder = new TextDecoder();
const text = decoder.decode(decompressedData);</code></pre>
              </div>
            </div>
          </div>

          <div class="scenario">
            <h3>使用场景</h3>
            <ul>
              <li>客户端数据压缩</li>
              <li>减少网络传输量</li>
              <li>处理压缩文件</li>
              <li>优化存储空间</li>
            </ul>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li>流式处理大文件</li>
                <li>内存效率高</li>
                <li>原生支持压缩格式</li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li>浏览器支持有限</li>
                <li>压缩比不如专业工具</li>
                <li>不支持自定义压缩算法</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- File and Directory Entries API -->
      <section class="card entries-api">
        <div class="section-header">
          <div class="icon">📁</div>
          <h2>File and Directory Entries API</h2>
        </div>
        <div class="content">
          <div class="api-intro">
            <p>提供对沙盒文件系统的访问，允许创建、读取和操作文件和目录（主要用于 Chrome 扩展）。</p>
          </div>

          <div class="usage">
            <h3>沙盒文件系统操作</h3>
            <div class="usage-grid">
              <div class="usage-card">
                <h4>请求文件系统</h4>
                <pre><code>window.requestFileSystem(
  window.TEMPORARY, // 或 PERSISTENT
  5 * 1024 * 1024, // 大小（5MB）
  (fs) => {
    console.log('文件系统已加载:', fs.name);
    // 创建文件
    fs.root.getFile('log.txt',
      { create: true },
      (fileEntry) => {
        fileEntry.createWriter((fileWriter) => {
          fileWriter.write(new Blob(['日志内容']));
        });
      }
    );
  },
  (err) => console.error(err)
);</code></pre>
              </div>

              <div class="usage-card">
                <h4>读取目录内容</h4>
                <pre><code>function readDirectory(dirEntry) {
  const dirReader = dirEntry.createReader();
  dirReader.readEntries((entries) => {
    entries.forEach((entry) => {
      if (entry.isFile) {
        console.log('文件:', entry.name);
      } else if (entry.isDirectory) {
        console.log('目录:', entry.name);
        readDirectory(entry);
      }
    });
  });
}

// 从根目录开始读取
readDirectory(fs.root);</code></pre>
              </div>
            </div>
          </div>

          <div class="scenario">
            <h3>使用场景</h3>
            <ul>
              <li>浏览器扩展存储</li>
              <li>离线应用数据存储</li>
              <li>客户端缓存管理</li>
              <li>临时文件处理</li>
            </ul>
          </div>

          <div class="pros-cons">
            <div class="pros">
              <h4>优点</h4>
              <ul>
                <li>提供类似文件系统的结构</li>
                <li>支持目录操作</li>
                <li>沙盒环境安全</li>
              </ul>
            </div>
            <div class="cons">
              <h4>缺点</h4>
              <ul>
                <li>非标准 API</li>
                <li>浏览器支持有限</li>
                <li>存储空间有限</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="summary">
        <h3>文件处理接口选择指南</h3>
        <div class="selection-table">
          <table>
            <thead>
              <tr>
                <th>需求</th>
                <th>推荐 API</th>
                <th>特点</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>简单文件上传</td>
                <td>FormData</td>
                <td>简单易用，兼容性好</td>
              </tr>
              <tr>
                <td>客户端文件操作</td>
                <td>File System Access</td>
                <td>强大，支持完整文件操作</td>
              </tr>
              <tr>
                <td>二进制数据处理</td>
                <td>Blob API</td>
                <td>轻量级，内存高效</td>
              </tr>
              <tr>
                <td>浏览器扩展存储</td>
                <td>File and Directory Entries</td>
                <td>沙盒环境，安全可靠</td>
              </tr>
              <tr>
                <td>压缩/解压缩</td>
                <td>Compression Streams</td>
                <td>流式处理，高效</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="copyright">JavaScript 文件处理 API | 选择合适工具提升应用能力</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑为空，仅用于展示
</script>

<style lang="less" scoped>
.file-apis-container {
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

.api-intro {
  p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    line-height: 1.7;
  }
}

.usage {
  margin-bottom: 24px;

  h3 {
    font-size: 1.3rem;
    margin: 0 0 16px;
    color: #1e40af;
    padding-bottom: 8px;
    border-bottom: 1px solid #e2e8f0;
  }
}

.usage-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.usage-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;

  h4 {
    font-size: 1.2rem;
    margin: 0 0 16px;
    color: #1e40af;
  }
}

.scenario {
  margin-bottom: 24px;

  h3 {
    font-size: 1.3rem;
    margin: 0 0 16px;
    color: #1e40af;
  }

  ul {
    padding-left: 24px;
    margin: 0;

    li {
      margin-bottom: 10px;
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

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  .pros, .cons {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;

    h4 {
      font-size: 1.2rem;
      margin: 0 0 16px;
      color: #1e40af;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 10px;
      }
    }
  }

  .pros {
    border-left: 4px solid #10b981;
  }

  .cons {
    border-left: 4px solid #ef4444;
  }
}

/* API 卡片特定颜色 */
.blob-api {
  border-top: 4px solid #3b82f6;
}

.file-api {
  border-top: 4px solid #8b5cf6;
}

.fs-api {
  border-top: 4px solid #ec4899;
}

.formdata-api {
  border-top: 4px solid #f59e0b;
}

.compression-api {
  border-top: 4px solid #10b981;
}

.entries-api {
  border-top: 4px solid #ef4444;
}

/* 代码块样式 */
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
    h3 {
      font-size: 1.4rem;
      margin: 0 0 24px;
      color: #2563eb;
      text-align: center;
    }
  }

  .selection-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;

      th, td {
        padding: 16px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }

      th {
        background: #f1f5f9;
        font-weight: 600;
        color: #1e40af;
      }

      tr:nth-child(even) {
        background: #f8fafc;
      }

      tr:hover {
        background: #f0f9ff;
      }
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
