<template>
  <div class="fetch-api-container">
    <header class="header">
      <h1>JavaScript Fetch API 基础介绍</h1>
      <p class="subtitle">现代网络请求的基本指南</p>
    </header>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="intro-card">
          <div class="definition">
            <div class="fetch-icon">🌐</div>
            <div>
              <h2>什么是 Fetch API？</h2>
              <p>Fetch API 是现代浏览器提供的用于发起网络请求的原生JavaScript接口。它提供了一种比传统XMLHttpRequest更强大、更灵活的方式来处理HTTP请求，并返回Promise对象。</p>
              <div class="feature">
                <span class="feature-tag">基于Promise</span>
                <span class="feature-tag">支持流处理</span>
                <span class="feature-tag">模块化设计</span>
                <span class="feature-tag">支持CORS</span>
              </div>
            </div>
          </div>

          <div class="basic-usage">
            <h3>基本用法</h3>
            <pre class="code-block">// 最简单的GET请求
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// 使用async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}</pre>
          </div>
        </div>

        <div class="comparison-card">
          <h2>Fetch vs XMLHttpRequest</h2>
          <div class="comparison-table">
            <div class="table-header">
              <div class="header-cell">特性</div>
              <div class="header-cell">Fetch API</div>
              <div class="header-cell">XMLHttpRequest</div>
            </div>
            <div class="table-row">
              <div class="cell">语法</div>
              <div class="cell">基于Promise，简洁</div>
              <div class="cell">基于事件回调，复杂</div>
            </div>
            <div class="table-row">
              <div class="cell">流处理</div>
              <div class="cell">原生支持</div>
              <div class="cell">有限支持</div>
            </div>
            <div class="table-row">
              <div class="cell">请求取消</div>
              <div class="cell">AbortController</div>
              <div class="cell">xhr.abort()</div>
            </div>
            <div class="table-row">
              <div class="cell">进度跟踪</div>
              <div class="cell">ReadableStream</div>
              <div class="cell">progress事件</div>
            </div>
            <div class="table-row">
              <div class="cell">CORS处理</div>
              <div class="cell">更简单</div>
              <div class="cell">需要额外设置</div>
            </div>
          </div>
        </div>
      </div>

      <div class="config-section">
        <h2 class="section-title">Fetch 配置选项</h2>

        <div class="config-grid">
          <div class="config-card">
            <div class="config-header">
              <h3>method</h3>
              <div class="default-value">默认: 'GET'</div>
            </div>
            <p>设置HTTP请求方法：GET, POST, PUT, DELETE, PATCH等</p>
            <pre class="code-block">fetch(url, {
  method: 'POST'
})</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>headers</h3>
              <div class="default-value">默认: {}</div>
            </div>
            <p>设置HTTP请求头，使用Headers对象或普通对象</p>
            <pre class="code-block">fetch(url, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  }
})</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>body</h3>
              <div class="default-value">默认: null</div>
            </div>
            <p>设置请求体，可以是字符串、FormData、Blob等</p>
            <pre class="code-block">// JSON数据
body: JSON.stringify({ name: 'John' })

// FormData
const formData = new FormData();
formData.append('file', fileInput.files[0]);</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>mode</h3>
              <div class="default-value">默认: 'cors'</div>
            </div>
            <p>设置请求模式：cors, no-cors, same-origin</p>
            <pre class="code-block">fetch(url, {
  mode: 'no-cors'
})</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>credentials</h3>
              <div class="default-value">默认: 'same-origin'</div>
            </div>
            <p>设置是否发送cookie：omit, same-origin, include</p>
            <pre class="code-block">fetch(url, {
  credentials: 'include'
})</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>cache</h3>
              <div class="default-value">默认: 'default'</div>
            </div>
            <p>控制缓存行为：default, no-store, reload等</p>
            <pre class="code-block">fetch(url, {
  cache: 'no-cache'
})</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>redirect</h3>
              <div class="default-value">默认: 'follow'</div>
            </div>
            <p>重定向处理：follow, error, manual</p>
            <pre class="code-block">fetch(url, {
  redirect: 'error'
})</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>referrerPolicy</h3>
              <div class="default-value">默认: 'no-referrer-when-downgrade'</div>
            </div>
            <p>控制Referer头的发送策略</p>
            <pre class="code-block">fetch(url, {
  referrerPolicy: 'no-referrer'
})</pre>
          </div>
        </div>
      </div>

      <div class="advanced-section">
        <h2 class="section-title">高级功能</h2>

        <div class="advanced-grid">
          <div class="advanced-card">
            <div class="advanced-icon">✋</div>
            <h3>中断请求</h3>
            <p>使用AbortController中断进行中的请求</p>
            <pre class="code-block">const controller = new AbortController();
const signal = controller.signal;

// 设置超时中断
setTimeout(() => controller.abort(), 5000);

fetch(url, { signal })
  .then(response => { /* 处理响应 */ })
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('请求被取消');
    }
  });

// 手动取消
// controller.abort();</pre>
          </div>

          <div class="advanced-card">
            <div class="advanced-icon">📤</div>
            <h3>上传进度</h3>
            <p>跟踪文件上传进度</p>
            <pre class="code-block">async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const xhr = new XMLHttpRequest();

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const percent = (event.loaded / event.total) * 100;
      console.log(`上传进度: ${Math.round(percent)}%`);
    }
  };

  xhr.open('POST', '/upload');
  xhr.send(formData);
}</pre>
          </div>

          <div class="advanced-card">
            <div class="advanced-icon">📥</div>
            <h3>下载进度</h3>
            <p>使用ReadableStream跟踪下载进度</p>
            <pre class="code-block">async function fetchWithProgress(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const contentLength = +response.headers.get('Content-Length');
  let receivedLength = 0;
  let chunks = [];

  while(true) {
    const {done, value} = await reader.read();

    if (done) break;

    chunks.push(value);
    receivedLength += value.length;
    console.log(`下载进度: ${receivedLength}/${contentLength}`);
  }

  const chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  for(let chunk of chunks) {
    chunksAll.set(chunk, position);
    position += chunk.length;
  }

  return new Blob([chunksAll]);
}</pre>
          </div>

          <div class="advanced-card">
            <div class="advanced-icon">🌊</div>
            <h3>流处理</h3>
            <p>处理大型数据流</p>
            <pre class="code-block">async function streamResponse(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let result = '';

  while(true) {
    const {done, value} = await reader.read();
    if (done) break;
    result += decoder.decode(value, {stream: true});
  }

  result += decoder.decode(); // 处理剩余数据
  return result;
}</pre>
          </div>

          <div class="advanced-card">
            <div class="advanced-icon">🔒</div>
            <h3>认证与CORS</h3>
            <p>处理跨域请求和认证</p>
            <pre class="code-block">// 带凭据的跨域请求
fetch('https://api.example.com/data', {
  credentials: 'include',
  mode: 'cors',
  headers: {
    'Authorization': 'Bearer token123'
  }
});

// 处理CORS预检请求
// 服务器需设置 Access-Control-Allow-Origin 等头</pre>
          </div>

          <div class="advanced-card">
            <div class="advanced-icon">🔄</div>
            <h3>错误处理</h3>
            <p>正确处理HTTP错误状态</p>
            <pre class="code-block">fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => {
    console.error('请求失败:', error);
    // 显示用户友好的错误信息
  });</pre>
          </div>
        </div>
      </div>

      <div class="response-section">
        <h2 class="section-title">响应处理</h2>

        <div class="response-methods">
          <div class="method-card">
            <h3>response.json()</h3>
            <p>解析JSON格式的响应体</p>
            <pre class="code-block">fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));</pre>
          </div>

          <div class="method-card">
            <h3>response.text()</h3>
            <p>获取文本格式的响应体</p>
            <pre class="code-block">fetch(url)
  .then(response => response.text())
  .then(text => console.log(text));</pre>
          </div>

          <div class="method-card">
            <h3>response.blob()</h3>
            <p>获取Blob对象（二进制数据）</p>
            <pre class="code-block">fetch(url)
  .then(response => response.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    // 创建下载链接或显示图片
  });</pre>
          </div>

          <div class="method-card">
            <h3>response.arrayBuffer()</h3>
            <p>获取ArrayBuffer（原始二进制数据）</p>
            <pre class="code-block">fetch(url)
  .then(response => response.arrayBuffer())
  .then(buffer => {
    // 处理二进制数据
  });</pre>
          </div>

          <div class="method-card">
            <h3>response.formData()</h3>
            <p>解析FormData格式的响应</p>
            <pre class="code-block">fetch(url)
  .then(response => response.formData())
  .then(formData => {
    // 处理表单数据
  });</pre>
          </div>
        </div>
      </div>

      <div class="options-request-section">
        <h2>为什么有时会先发送一个 OPTIONS 请求？</h2>
        <div class="options-explanation">
          <p>
            当你使用 <strong>Fetch API</strong> 进行跨域请求，或者请求中包含自定义头部、非简单方法（如PUT、DELETE）等情况时，浏览器会在正式请求前自动发送一个 <span
              class="options-tag">OPTIONS</span> 预检请求（Preflight Request）。
          </p>
          <ul>
            <li>
              <strong>原因：</strong> 这是浏览器的安全机制（CORS，跨域资源共享），用于询问服务器是否允许实际的跨域请求。只有服务器响应允许后，浏览器才会发送真正的数据请求。
            </li>
            <li>
              <strong>常见触发场景：</strong>
              <ul>
                <li>请求方法不是 GET/POST/HEAD</li>
                <li>请求头包含自定义字段（如 <code>Authorization</code>、<code>Content-Type: application/json</code>）</li>
                <li>携带了凭证（如 <code>credentials: 'include'</code>）</li>
              </ul>
            </li>
            <li>
              <strong>如何处理：</strong>
              <ul>
                <li>后端需正确响应 <span class="options-tag">OPTIONS</span> 请求，并返回合适的 <code>Access-Control-Allow-*</code> 头部。
                </li>
                <li>前端无需手动处理，浏览器会自动完成预检流程。</li>
                <li>如需减少预检请求，可尽量使用简单请求（如 <code>Content-Type: application/x-www-form-urlencoded</code>）。</li>
              </ul>
            </li>
          </ul>
          <div class="options-example">
            <h3>示例：预检请求流程</h3>
            <pre class="code-block">// 发送带有自定义头部的请求
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  body: JSON.stringify({ key: 'value' })
});
// 浏览器会先自动发送 OPTIONS 请求，确认服务器允许后再发送 POST 请求
</pre>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2 class="section-title">最佳实践</h2>
        <div class="practices-grid">
          <div class="practice">
            <div class="number">1</div>
            <p>总是检查response.ok或response.status</p>
          </div>
          <div class="practice">
            <div class="number">2</div>
            <p>为长时间请求添加超时控制</p>
          </div>
          <div class="practice">
            <div class="number">3</div>
            <p>使用AbortController取消不需要的请求</p>
          </div>
          <div class="practice">
            <div class="number">4</div>
            <p>为敏感请求设置合适的credentials策略</p>
          </div>
          <div class="practice">
            <div class="number">5</div>
            <p>使用流处理处理大型文件</p>
          </div>
          <div class="practice">
            <div class="number">6</div>
            <p>添加全面的错误处理</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Fetch API 提供了强大而灵活的现代网络请求能力，结合其Promise基础和流处理支持，是传统XMLHttpRequest的绝佳替代品。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


// 模拟进度数据
const uploadProgress = ref(0);
const downloadProgress = ref(0);
</script>

<style lang="less" scoped>


.fetch-api-container {
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
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .intro-card {
    background: white;
    border-radius: 10px;
    padding: 1.8rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

    .definition {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;

      .fetch-icon {
        font-size: 3rem;
        width: 80px;
        height: 80px;
        background: #e3f2fd;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
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

    .basic-usage {
      h3 {
        margin-top: 0;
        color: #3498db;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #f0f0f0;
      }

      .code-block {
        background: #2c3e50;
        color: #f8f9fa;
        border-radius: 8px;
        padding: 1.2rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.95rem;
        overflow-x: auto;
        margin-top: 1rem;
      }
    }
  }

  .comparison-card {
    background: white;
    border-radius: 10px;
    padding: 1.8rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

    h2 {
      margin-top: 0;
      color: #2c3e50;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
      margin-bottom: 1.5rem;
    }

    .comparison-table {
      border: 1px solid #eaeaea;
      border-radius: 8px;
      overflow: hidden;

      .table-header {
        display: flex;
        background: #3498db;
        color: white;
        font-weight: 500;

        .header-cell {
          flex: 1;
          padding: 1rem;
          text-align: center;

          &:first-child {
            flex: 0.5;
          }
        }
      }

      .table-row {
        display: flex;
        border-bottom: 1px solid #eaeaea;
        background: white;

        &:nth-child(odd) {
          background: #f8f9fa;
        }

        &:last-child {
          border-bottom: none;
        }

        .cell {
          flex: 1;
          padding: 0.8rem;
          text-align: center;
          font-size: 0.95rem;

          &:first-child {
            flex: 0.5;
            font-weight: 500;
            background: #f1f8ff;
          }
        }
      }
    }
  }

  .config-section {
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

    .config-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .config-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      border-top: 4px solid #3498db;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }

      .config-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        h3 {
          margin: 0;
          color: #2c3e50;
        }

        .default-value {
          background: #e3f2fd;
          color: #3498db;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
        }
      }

      p {
        font-size: 1.05rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 1rem;
      }

      .code-block {
        background: #f8f9fa;
        border: 1px solid #eaeaea;
        border-radius: 6px;
        padding: 0.8rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        overflow-x: auto;
      }
    }
  }

  .advanced-section {
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

    .advanced-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .advanced-card {
      background: white;
      border-radius: 8px;
      padding: 1.8rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #3498db, #2ecc71);
      }

      .advanced-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      p {
        font-size: 1.05rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 1.2rem;
      }

      .code-block {
        background: #2c3e50;
        color: #f8f9fa;
        border-radius: 6px;
        padding: 1rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        overflow-x: auto;
      }
    }
  }

  .response-section {
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

    .response-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .method-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      border-left: 4px solid #3498db;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }

      h3 {
        margin-top: 0;
        color: #2c3e50;
        margin-bottom: 0.8rem;
      }

      p {
        font-size: 1.05rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 1rem;
      }

      .code-block {
        background: #f8f9fa;
        border: 1px solid #eaeaea;
        border-radius: 6px;
        padding: 0.8rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        overflow-x: auto;
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
  .fetch-api-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }
  }
}
</style>
