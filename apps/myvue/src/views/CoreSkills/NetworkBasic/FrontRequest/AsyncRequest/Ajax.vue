<template>
  <div class="ajax-container">
    <header class="header">
      <h1>JavaScript AJAX 技术基础介绍</h1>
      <p class="subtitle">异步Web请求的基本指南</p>
    </header>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="intro-card">
          <div class="definition">
            <div class="ajax-icon">🔄</div>
            <div>
              <h2>什么是AJAX？</h2>
              <p>AJAX（Asynchronous JavaScript and XML）是一种在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页的技术。通过AJAX，可以创建快速、动态的网页应用。</p>
              <div class="feature">
                <span class="feature-tag">异步通信</span>
                <span class="feature-tag">无需页面刷新</span>
                <span class="feature-tag">XMLHttpRequest</span>
                <span class="feature-tag">数据格式灵活</span>
              </div>
            </div>
          </div>

          <div class="basic-usage">
            <h3>基本用法</h3>
            <pre class="code-block">// 创建XMLHttpRequest对象
const xhr = new XMLHttpRequest();

// 配置请求
xhr.open('GET', 'https://api.example.com/data', true);

// 设置回调函数
xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log('成功:', JSON.parse(xhr.responseText));
  } else {
    console.error('请求失败:', xhr.statusText);
  }
};

xhr.onerror = function() {
  console.error('网络错误');
};

// 发送请求
xhr.send();</pre>
          </div>
        </div>

        <div class="workflow-card">
          <h2>AJAX工作流程</h2>
          <div class="workflow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>创建XHR对象</h3>
                <p>使用XMLHttpRequest构造函数创建请求对象</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>配置请求</h3>
                <p>设置请求方法、URL和异步标志</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>设置回调</h3>
                <p>定义处理响应的回调函数</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>发送请求</h3>
                <p>调用send()方法发送请求</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>处理响应</h3>
                <p>在回调中处理服务器响应</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="config-section">
        <h2 class="section-title">XMLHttpRequest 核心API</h2>

        <div class="config-grid">
          <div class="config-card">
            <div class="config-header">
              <h3>open(method, url, async)</h3>
            </div>
            <p>初始化请求：</p>
            <ul>
              <li><strong>method</strong>：HTTP方法 (GET, POST等)</li>
              <li><strong>url</strong>：请求URL</li>
              <li><strong>async</strong>：是否异步 (默认true)</li>
            </ul>
            <pre class="code-block">xhr.open('POST', '/api/submit', true);</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>setRequestHeader(header, value)</h3>
            </div>
            <p>设置HTTP请求头：</p>
            <pre class="code-block">xhr.setRequestHeader('Content-Type',
  'application/json');
xhr.setRequestHeader('Authorization',
  'Bearer token123');</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>send(data)</h3>
            </div>
            <p>发送请求：</p>
            <ul>
              <li>GET请求：send(null)</li>
              <li>POST请求：send(FormData/JSON等)</li>
            </ul>
            <pre class="code-block">// GET请求
xhr.send();

// POST请求
xhr.send(JSON.stringify({ name: 'John' }));</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>abort()</h3>
            </div>
            <p>中止当前请求</p>
            <pre class="code-block">const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/data', true);
xhr.send();

// 需要时中止请求
document.getElementById('cancelBtn')
  .addEventListener('click', () => {
    xhr.abort();
  });</pre>
          </div>
        </div>
      </div>

      <div class="events-section">
        <h2 class="section-title">事件处理</h2>

        <div class="events-grid">
          <div class="event-card">
            <div class="event-icon">📡</div>
            <h3>onreadystatechange</h3>
            <p>readyState属性变化时触发</p>
            <pre class="code-block">xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    }
  }
};</pre>
          </div>

          <div class="event-card">
            <div class="event-icon">✅</div>
            <h3>onload</h3>
            <p>请求成功完成时触发</p>
            <pre class="code-block">xhr.onload = function() {
  if (xhr.status === 200) {
    console.log('成功:', xhr.response);
  }
};</pre>
          </div>

          <div class="event-card">
            <div class="event-icon">❌</div>
            <h3>onerror</h3>
            <p>请求失败时触发</p>
            <pre class="code-block">xhr.onerror = function() {
  console.error('请求失败');
};</pre>
          </div>

          <div class="event-card">
            <div class="event-icon">⏱️</div>
            <h3>ontimeout</h3>
            <p>请求超时时触发</p>
            <pre class="code-block">xhr.timeout = 5000; // 5秒超时
xhr.ontimeout = function() {
  console.error('请求超时');
};</pre>
          </div>
        </div>
      </div>

      <div class="advanced-section">
        <h2 class="section-title">高级功能</h2>

        <div class="advanced-grid">
          <div class="advanced-card">
            <div class="advanced-icon">📤</div>
            <h3>文件上传</h3>
            <p>使用FormData上传文件</p>
            <pre class="code-block">const formData = new FormData();
const fileInput = document.querySelector('input[type="file"]');

formData.append('file', fileInput.files[0]);
formData.append('name', 'file-upload');

const xhr = new XMLHttpRequest();
xhr.open('POST', '/upload', true);

xhr.onload = function() {
  console.log('上传成功');
};

xhr.send(formData);</pre>
          </div>

          <div class="advanced-card">
            <div class="advanced-icon">📊</div>
            <h3>上传进度</h3>
            <p>跟踪文件上传进度</p>
            <pre class="code-block">xhr.upload.onprogress = function(event) {
  if (event.lengthComputable) {
    const percent = (event.loaded / event.total) * 100;
    console.log(`上传进度: ${Math.round(percent)}%`);
    // 更新进度条UI
    progressBar.value = percent;
  }
};</pre>
          </div>

          <div class="advanced-card">
            <div class="advanced-icon">📥</div>
            <h3>下载进度</h3>
            <p>跟踪数据下载进度</p>
            <pre class="code-block">xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    const percent = (event.loaded / event.total) * 100;
    console.log(`下载进度: ${Math.round(percent)}%`);
  }
};</pre>
          </div>

          <div class="advanced-card">
            <div class="advanced-icon">🔐</div>
            <h3>认证与CORS</h3>
            <p>处理跨域请求和认证</p>
            <pre class="code-block">// 带凭据的跨域请求
xhr.withCredentials = true;

// 服务器需要设置响应头
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Credentials: true</pre>
          </div>
        </div>
      </div>

      <div class="response-section">
        <h2 class="section-title">响应处理</h2>

        <div class="response-props">
          <div class="prop-card">
            <h3>readyState</h3>
            <p>请求状态码：</p>
            <ul>
              <li>0: UNSENT - 未调用open()</li>
              <li>1: OPENED - open()已调用</li>
              <li>2: HEADERS_RECEIVED - 收到响应头</li>
              <li>3: LOADING - 接收响应体</li>
              <li>4: DONE - 请求完成</li>
            </ul>
          </div>

          <div class="prop-card">
            <h3>status</h3>
            <p>HTTP响应状态码</p>
            <pre class="code-block">if (xhr.status === 200) {
  // 成功
} else if (xhr.status === 404) {
  // 资源未找到
}</pre>
          </div>

          <div class="prop-card">
            <h3>responseType</h3>
            <p>设置响应数据类型：</p>
            <ul>
              <li>"" 或 "text" - 字符串</li>
              <li>"json" - 解析为JSON</li>
              <li>"blob" - Blob对象</li>
              <li>"arraybuffer" - ArrayBuffer</li>
              <li>"document" - XML文档</li>
            </ul>
          </div>

          <div class="prop-card">
            <h3>response</h3>
            <p>根据responseType返回响应体</p>
            <pre class="code-block">xhr.responseType = 'json';
xhr.onload = function() {
  const data = xhr.response; // 直接获取JSON对象
};</pre>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2 class="section-title">最佳实践</h2>
        <div class="practices-grid">
          <div class="practice">
            <div class="number">1</div>
            <p>总是检查readyState和status</p>
          </div>
          <div class="practice">
            <div class="number">2</div>
            <p>设置合理的超时时间</p>
          </div>
          <div class="practice">
            <div class="number">3</div>
            <p>为长时间操作提供取消功能</p>
          </div>
          <div class="practice">
            <div class="number">4</div>
            <p>使用FormData处理表单提交</p>
          </div>
          <div class="practice">
            <div class="number">5</div>
            <p>处理跨域请求时正确设置CORS</p>
          </div>
          <div class="practice">
            <div class="number">6</div>
            <p>添加全面的错误处理</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>AJAX技术彻底改变了Web应用的交互方式，通过异步数据交换实现了更流畅的用户体验。虽然Fetch API提供了更现代的替代方案，但理解XMLHttpRequest对于维护传统项目和全面理解Web通信仍然至关重要。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 示例数据
const ajaxExample = ref({
  method: 'GET',
  url: 'https://api.example.com/data',
  async: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  }
});

// 模拟进度数据
const uploadProgress = ref(0);
const downloadProgress = ref(0);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');

.ajax-container {
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

      .ajax-icon {
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

  .workflow-card {
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

    .workflow-steps {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;

      .step {
        display: flex;
        gap: 1.2rem;
        align-items: flex-start;

        .step-number {
          width: 36px;
          height: 36px;
          background: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .step-content {
          h3 {
            margin: 0 0 0.5rem 0;
            color: #2c3e50;
          }

          p {
            margin: 0;
            color: #7f8c8d;
            line-height: 1.6;
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
        h3 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
        }
      }

      p {
        font-size: 1.05rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 0.8rem;
      }

      ul {
        padding-left: 1.5rem;
        margin: 0 0 1rem 0;

        li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
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

  .events-section {
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

    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .event-card {
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

      .event-icon {
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
        background: linear-gradient(90deg, #e74c3c, #e67e22);
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

    .response-props {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .prop-card {
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

      ul {
        padding-left: 1.2rem;
        margin: 0 0 1rem 0;

        li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
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
  .ajax-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }

    .intro-section {
      grid-template-columns: 1fr;
    }
  }
}
</style>
