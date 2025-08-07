<template>
  <div class="window-api-container">
    <header class="header">
      <h1>JavaScript Window 全局类接口指南</h1>
      <p>基本指南浏览器环境中的核心 API</p>
    </header>

    <div class="stats-bar">
      <div class="stat-card">
        <div class="stat-value">100+</div>
        <div class="stat-label">全局接口</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">12</div>
        <div class="stat-label">核心类别</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">95%</div>
        <div class="stat-label">现代浏览器支持</div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="icon">🌐</div>
        <h2>网络请求相关</h2>
      </div>

      <div class="api-grid">
        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">🚀</div>
            <h3>Fetch API</h3>
            <div class="popularity high">高频</div>
          </div>
          <div class="api-content">
            <p>现代网络请求API，替代传统的XMLHttpRequest</p>
            <div class="code-example">
              <pre><code>fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));</code></pre>
            </div>
            <div class="usage-tip"><strong>使用技巧：</strong> 结合AbortController实现请求取消</div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">⏹️</div>
            <h3>AbortController</h3>
            <div class="popularity medium">中频</div>
          </div>
          <div class="api-content">
            <p>用于中止一个或多个Web请求</p>
            <div class="code-example">
              <pre><code>const controller = new AbortController();
const signal = controller.signal;

fetch(url, { signal })
  .then(response => { /*...*/ })
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Fetch aborted');
    }
  });

// 取消请求
controller.abort();</code></pre>
            </div>
            <div class="usage-tip"><strong>使用场景：</strong> 组件卸载时取消未完成的请求</div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">📦</div>
            <h3>Headers</h3>
            <div class="popularity medium">中频</div>
          </div>
          <div class="api-content">
            <p>操作HTTP请求和响应头信息</p>
            <div class="code-example">
              <pre><code>const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'Bearer token123');

// 获取头信息
const contentType = headers.get('Content-Type');
console.log(contentType); // 'application/json'</code></pre>
            </div>
            <div class="usage-tip"><strong>注意：</strong> 头部名称不区分大小写</div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">📄</div>
            <h3>FormData</h3>
            <div class="popularity high">高频</div>
          </div>
          <div class="api-content">
            <p>处理表单数据，特别适用于文件上传</p>
            <div class="code-example">
              <pre><code>const formData = new FormData();
formData.append('username', 'john_doe');
formData.append('avatar', fileInput.files[0]);

fetch('/api/user', {
  method: 'POST',
  body: formData
});</code></pre>
            </div>
            <div class="usage-tip"><strong>特点：</strong> 自动设置multipart/form-data内容类型</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="icon">💾</div>
        <h2>文件与数据处理</h2>
      </div>

      <div class="api-grid">
        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">📖</div>
            <h3>FileReader</h3>
            <div class="popularity high">高频</div>
          </div>
          <div class="api-content">
            <p>读取文件内容到内存中</p>
            <div class="code-example">
              <pre><code>const reader = new FileReader();
reader.onload = function(event) {
  const content = event.target.result;
  console.log('File content:', content);
};
reader.onerror = function(error) {
  console.error('Error reading file:', error);
};
reader.readAsText(file);</code></pre>
            </div>
            <div class="usage-tip">
              <strong>读取方法：</strong> readAsText, readAsDataURL, readAsArrayBuffer
            </div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">🔢</div>
            <h3>Blob</h3>
            <div class="popularity medium">中频</div>
          </div>
          <div class="api-content">
            <p>表示不可变的原始数据对象</p>
            <div class="code-example">
              <pre><code>// 创建Blob
const blob = new Blob(['Hello, world!'], { type: 'text/plain' });

// 创建URL
const url = URL.createObjectURL(blob);

// 下载文件
const a = document.createElement('a');
a.href = url;
a.download = 'hello.txt';
a.click();

// 释放资源
URL.revokeObjectURL(url);</code></pre>
            </div>
            <div class="usage-tip"><strong>使用场景：</strong> 大文件分片上传、生成文件下载</div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">🔗</div>
            <h3>URL & URLSearchParams</h3>
            <div class="popularity high">高频</div>
          </div>
          <div class="api-content">
            <p>解析、构造和操作URL</p>
            <div class="code-example">
              <pre><code>// 解析URL
const url = new URL('https://example.com/path?name=John&age=30');
console.log(url.pathname); // '/path'

// 操作查询参数
const params = new URLSearchParams(url.search);
params.append('city', 'New York');
console.log(params.toString()); // 'name=John&age=30&city=New+York'

// 构建新URL
url.search = params.toString();
console.log(url.href);</code></pre>
            </div>
            <div class="usage-tip"><strong>注意：</strong> 自动编码/解码URL参数</div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">📊</div>
            <h3>TextEncoder & TextDecoder</h3>
            <div class="popularity low">低频</div>
          </div>
          <div class="api-content">
            <p>处理文本编码和解码</p>
            <div class="code-example">
              <pre><code>// 编码文本
const encoder = new TextEncoder();
const encoded = encoder.encode('Hello 世界');

// 解码文本
const decoder = new TextDecoder('utf-8');
const decoded = decoder.decode(encoded);
console.log(decoded); // 'Hello 世界'</code></pre>
            </div>
            <div class="usage-tip"><strong>使用场景：</strong> 处理二进制数据中的文本</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="icon">👀</div>
        <h2>DOM 观察器</h2>
      </div>

      <div class="api-grid">
        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">🔍</div>
            <h3>MutationObserver</h3>
            <div class="popularity medium">中频</div>
          </div>
          <div class="api-content">
            <p>监视DOM树的变化</p>
            <div class="code-example">
              <pre><code>const target = document.getElementById('target');
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    console.log('DOM changed:', mutation.type);
  });
});

observer.observe(target, {
  attributes: true,
  childList: true,
  subtree: true
});

// 停止观察
// observer.disconnect();</code></pre>
            </div>
            <div class="usage-tip"><strong>使用场景：</strong> 第三方组件集成、动态内容监控</div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">📐</div>
            <h3>ResizeObserver</h3>
            <div class="popularity medium">中频</div>
          </div>
          <div class="api-content">
            <p>监听元素尺寸变化</p>
            <div class="code-example">
              <pre><code>const ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    const { width, height } = entry.contentRect;
    console.log(`Size: ${width}x${height}`);
  }
});

ro.observe(document.getElementById('resizable'));

// 停止观察
// ro.unobserve(element);</code></pre>
            </div>
            <div class="usage-tip"><strong>替代方案：</strong> 替代window.resize事件，性能更优</div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">🔄</div>
            <h3>IntersectionObserver</h3>
            <div class="popularity high">高频</div>
          </div>
          <div class="api-content">
            <p>检测元素是否进入视口</p>
            <div class="code-example">
              <pre><code>const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is visible');
      // 图片懒加载
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.lazy-img').forEach(img => {
  observer.observe(img);
});</code></pre>
            </div>
            <div class="usage-tip"><strong>典型应用：</strong> 图片懒加载、无限滚动</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="icon">💬</div>
        <h2>通信与存储</h2>
      </div>

      <div class="api-grid">
        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">📡</div>
            <h3>BroadcastChannel</h3>
            <div class="popularity low">低频</div>
          </div>
          <div class="api-content">
            <p>同源浏览器上下文间通信</p>
            <div class="code-example">
              <pre><code>// 页面A
const channel = new BroadcastChannel('app_channel');
channel.postMessage({ type: 'update', data: 'Hello' });

// 页面B
const channel = new BroadcastChannel('app_channel');
channel.onmessage = (event) => {
  console.log('Received:', event.data);
};

// 关闭通道
// channel.close();</code></pre>
            </div>
            <div class="usage-tip"><strong>使用场景：</strong> 多标签页应用状态同步</div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">📝</div>
            <h3>CustomEvent</h3>
            <div class="popularity medium">中频</div>
          </div>
          <div class="api-content">
            <p>创建和分发自定义事件</p>
            <div class="code-example">
              <pre><code>// 创建事件
const event = new CustomEvent('myEvent', {
  detail: { message: 'Hello from custom event' },
  bubbles: true,
  cancelable: true
});

// 监听事件
document.addEventListener('myEvent', (e) => {
  console.log(e.detail.message);
});

// 触发事件
document.dispatchEvent(event);</code></pre>
            </div>
            <div class="usage-tip"><strong>优势：</strong> 比直接回调更解耦的组件通信方式</div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">🗃️</div>
            <h3>IndexedDB</h3>
            <div class="popularity medium">中频</div>
          </div>
          <div class="api-content">
            <p>客户端存储大量结构化数据</p>
            <div class="code-example">
              <pre><code>const request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore('books', { keyPath: 'id' });
};

request.onsuccess = (event) => {
  const db = event.target.result;
  const tx = db.transaction('books', 'readwrite');
  const store = tx.objectStore('books');

  store.add({ id: 1, title: 'JavaScript Guide' });

  tx.oncomplete = () => console.log('Transaction completed');
};</code></pre>
            </div>
            <div class="usage-tip"><strong>使用场景：</strong> 离线应用、大数据缓存</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <div class="icon">⚙️</div>
        <h2>其他重要接口</h2>
      </div>

      <div class="api-grid">
        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">📋</div>
            <h3>Clipboard</h3>
            <div class="popularity medium">中频</div>
          </div>
          <div class="api-content">
            <p>读写系统剪贴板内容</p>
            <div class="code-example">
              <pre><code>// 写入剪贴板
navigator.clipboard.writeText('Copied text')
  .then(() => console.log('Text copied'))
  .catch(err => console.error('Failed to copy:', err));

// 读取剪贴板
navigator.clipboard.readText()
  .then(text => console.log('Clipboard content:', text));</code></pre>
            </div>
            <div class="usage-tip"><strong>注意：</strong> 需要用户授权，安全上下文(HTTPS)</div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">🧭</div>
            <h3>Geolocation</h3>
            <div class="popularity low">低频</div>
          </div>
          <div class="api-content">
            <p>获取设备地理位置信息</p>
            <div class="code-example">
              <pre><code>navigator.geolocation.getCurrentPosition(
  position => {
    const { latitude, longitude } = position.coords;
    console.log(`Lat: ${latitude}, Long: ${longitude}`);
  },
  error => {
    console.error('Geolocation error:', error.message);
  },
  {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
);</code></pre>
            </div>
            <div class="usage-tip"><strong>使用场景：</strong> 地图应用、位置服务</div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">🔊</div>
            <h3>Web Speech API</h3>
            <div class="popularity low">低频</div>
          </div>
          <div class="api-content">
            <p>语音识别与合成</p>
            <div class="code-example">
              <pre><code>// 语音合成
const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance('Hello World');
synth.speak(utterance);

// 语音识别
const recognition = new (window.SpeechRecognition ||
                      window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.onresult = event => {
  const transcript = event.results[0][0].transcript;
  console.log('Recognized:', transcript);
};
recognition.start();</code></pre>
            </div>
            <div class="usage-tip"><strong>注意：</strong> 浏览器前缀兼容处理</div>
          </div>
        </div>

        <div class="api-card">
          <div class="api-header">
            <div class="api-icon">📈</div>
            <h3>Performance API</h3>
            <div class="popularity medium">中频</div>
          </div>
          <div class="api-content">
            <p>测量网页性能指标</p>
            <div class="code-example">
              <pre><code>// 测量代码执行时间
performance.mark('start');

// 执行代码...
for (let i = 0; i < 1000000; i++) {}

performance.mark('end');
performance.measure('loop', 'start', 'end');

const measure = performance.getEntriesByName('loop')[0];
console.log('Duration:', measure.duration, 'ms');

// 获取重要指标
const [navigation] = performance.getEntriesByType('navigation');
console.log('DOMContentLoaded:', navigation.domContentLoadedEventEnd);
console.log('Load event:', navigation.loadEventEnd);</code></pre>
            </div>
            <div class="usage-tip"><strong>使用场景：</strong> 性能监控、优化分析</div>
          </div>
        </div>
      </div>
    </div>

    <div class="compatibility-section">
      <div class="section-header">
        <div class="icon">✅</div>
        <h2>浏览器兼容性概览</h2>
      </div>

      <div class="compatibility-table">
        <table>
          <thead>
            <tr>
              <th>接口名称</th>
              <th>Chrome</th>
              <th>Firefox</th>
              <th>Safari</th>
              <th>Edge</th>
              <th>移动支持</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fetch API</td>
              <td class="supported">42+</td>
              <td class="supported">39+</td>
              <td class="supported">10.1+</td>
              <td class="supported">14+</td>
              <td class="supported">优秀</td>
            </tr>
            <tr>
              <td>AbortController</td>
              <td class="supported">66+</td>
              <td class="supported">57+</td>
              <td class="supported">12.1+</td>
              <td class="supported">16+</td>
              <td class="supported">良好</td>
            </tr>
            <tr>
              <td>FileReader</td>
              <td class="supported">7+</td>
              <td class="supported">3.6+</td>
              <td class="supported">6+</td>
              <td class="supported">10+</td>
              <td class="supported">优秀</td>
            </tr>
            <tr>
              <td>IntersectionObserver</td>
              <td class="supported">51+</td>
              <td class="supported">55+</td>
              <td class="supported">12.1+</td>
              <td class="supported">15+</td>
              <td class="supported">良好</td>
            </tr>
            <tr>
              <td>Clipboard API</td>
              <td class="supported">66+</td>
              <td class="supported">63+</td>
              <td class="partial">部分</td>
              <td class="supported">79+</td>
              <td class="partial">部分</td>
            </tr>
            <tr>
              <td>Web Speech API</td>
              <td class="supported">33+</td>
              <td class="partial">部分</td>
              <td class="partial">7+</td>
              <td class="supported">14+</td>
              <td class="partial">有限</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="compatibility-note">
        注：完整兼容性数据请参考 <a href="https://caniuse.com" target="_blank">caniuse.com</a>
      </div>
    </div>

    <footer class="footer">
      <p>JavaScript Window 全局类接口参考指南 | 使用 Vue 3 + TypeScript 构建</p>
      <p>© 2023 现代 Web 开发技术栈</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2ecc71;
@text-color: #2c3e50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@success-color: #27ae60;
@warning-color: #e74c3c;
@header-gradient: linear-gradient(135deg, @primary-color, #8e44ad);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.window-api-container {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 50px 20px;
  background: @header-gradient;
  color: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    font-weight: 700;
  }

  p {
    font-size: 1.4rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.stats-bar {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 25px 15px;
  text-align: center;
  flex: 1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: @primary-color;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 1.1rem;
  color: #7f8c8d;
}

.content-section,
.compatibility-section {
  background: @card-bg;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid @border-color;

  .icon {
    font-size: 2rem;
    margin-right: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.9rem;
    color: @text-color;
  }
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 25px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
}

.api-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid @primary-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.api-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(52, 152, 219, 0.05);
  border-bottom: 1px solid @border-color;

  .api-icon {
    font-size: 2rem;
    margin-right: 15px;
  }

  h3 {
    font-size: 1.5rem;
    color: @text-color;
    flex: 1;
  }
}

.popularity {
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;

  &.high {
    background: lighten(@warning-color, 40%);
    color: darken(@warning-color, 20%);
  }

  &.medium {
    background: lighten(#f39c12, 40%);
    color: darken(#f39c12, 20%);
  }

  &.low {
    background: lighten(@primary-color, 40%);
    color: darken(@primary-color, 20%);
  }
}

.api-content {
  padding: 20px;

  p {
    margin-bottom: 15px;
    line-height: 1.7;
    font-size: 1.1rem;
  }
}

.code-example {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 18px;
  margin: 15px 0;
  overflow-x: auto;

  pre {
    margin: 0;

    code {
      color: #f8f8f2;
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.usage-tip {
  background: rgba(39, 174, 96, 0.08);
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
  font-size: 0.95rem;

  strong {
    color: darken(@success-color, 10%);
  }
}

.compatibility-table {
  overflow-x: auto;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;

    th,
    td {
      padding: 16px 20px;
      text-align: center;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: #f1f5f9;
      font-weight: 600;
      color: @text-color;
    }

    tbody tr {
      &:nth-child(odd) {
        background: rgba(240, 244, 248, 0.5);
      }

      &:hover {
        background: rgba(52, 152, 219, 0.08);
      }
    }

    td:first-child {
      text-align: left;
      font-weight: 500;
    }
  }
}

.supported {
  background: rgba(39, 174, 96, 0.15);
  color: darken(@success-color, 20%);
  font-weight: 500;
}

.partial {
  background: rgba(243, 156, 18, 0.15);
  color: darken(#f39c12, 20%);
  font-weight: 500;
}

.compatibility-note {
  text-align: center;
  font-size: 0.95rem;
  color: #7f8c8d;

  a {
    color: @primary-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  color: #7f8c8d;
  font-size: 1rem;
  border-top: 1px solid @border-color;

  p:first-child {
    margin-bottom: 8px;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  .api-grid {
    grid-template-columns: 1fr;
  }
}
</style>
