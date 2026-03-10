<template>
  <div class="axios-container">
    <header class="header">
      <h1>Axios 基本指南</h1>
      <p class="subtitle">基于 Promise 的现代化 HTTP 客户端</p>
    </header>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="intro-card">
          <div class="definition">
            <div class="axios-icon">🚀</div>
            <div>
              <h2>什么是 Axios？</h2>
              <p>Axios 是一个基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js。它提供了简洁的 API，支持拦截请求和响应、转换请求和响应数据、取消请求等功能。</p>
              <div class="feature">
                <span class="feature-tag">Promise API</span>
                <span class="feature-tag">拦截器</span>
                <span class="feature-tag">CSRF 保护</span>
                <span class="feature-tag">请求取消</span>
              </div>
            </div>
          </div>

          <div class="installation">
            <h3>安装与引入</h3>
            <div class="install-methods">
              <div class="method">
                <pre class="code-block">// NPM 安装
npm install axios

// Yarn 安装
yarn add axios

// 在项目中引入
import axios from 'axios';</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="comparison-card">
          <h2>Axios vs Fetch API</h2>
          <div class="comparison-table">
            <div class="table-header">
              <div class="header-cell">特性</div>
              <div class="header-cell">Axios</div>
              <div class="header-cell">Fetch API</div>
            </div>
            <div class="table-row">
              <div class="cell">语法简洁性</div>
              <div class="cell">✅ 简洁直观</div>
              <div class="cell">❌ 相对复杂</div>
            </div>
            <div class="table-row">
              <div class="cell">浏览器兼容性</div>
              <div class="cell">✅ 广泛支持</div>
              <div class="cell">⚠️ 现代浏览器</div>
            </div>
            <div class="table-row">
              <div class="cell">拦截器</div>
              <div class="cell">✅ 内置支持</div>
              <div class="cell">❌ 需要手动实现</div>
            </div>
            <div class="table-row">
              <div class="cell">请求取消</div>
              <div class="cell">✅ CancelToken/AbortController</div>
              <div class="cell">✅ AbortController</div>
            </div>
            <div class="table-row">
              <div class="cell">进度监控</div>
              <div class="cell">✅ 内置支持</div>
              <div class="cell">❌ 需要手动实现</div>
            </div>
          </div>
        </div>
      </div>

      <div class="basic-usage-section">
        <h2 class="section-title">基本用法</h2>

        <div class="usage-grid">
          <div class="usage-card">
            <h3>GET 请求</h3>
            <pre class="code-block">// 获取用户数据
axios.get('/api/users')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('请求失败:', error);
  });

// 带参数的 GET 请求
axios.get('/api/users', {
  params: {
    id: 12345,
    type: 'admin'
  }
});</pre>
          </div>

          <div class="usage-card">
            <h3>POST 请求</h3>
            <pre class="code-block">// 创建新用户
axios.post('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
})
.then(response => {
  console.log('创建成功:', response.data);
});

// 发送 FormData
const formData = new FormData();
formData.append('file', fileInput.files[0]);

axios.post('/api/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});</pre>
          </div>

          <div class="usage-card">
            <h3>并发请求</h3>
            <pre class="code-block">// 同时发起多个请求
axios.all([
  axios.get('/api/users'),
  axios.get('/api/posts')
])
.then(axios.spread((usersRes, postsRes) => {
  console.log('用户数据:', usersRes.data);
  console.log('文章数据:', postsRes.data);
}));</pre>
          </div>

          <div class="usage-card">
            <h3>其他 HTTP 方法</h3>
            <pre class="code-block">// PUT 更新资源
axios.put('/api/users/123', {
  name: 'John Smith'
});

// DELETE 删除资源
axios.delete('/api/users/123');

// PATCH 部分更新
axios.patch('/api/users/123', {
  email: 'new@example.com'
});</pre>
          </div>
        </div>
      </div>

      <div class="config-section">
        <h2 class="section-title">配置选项</h2>

        <div class="config-grid">
          <div class="config-card">
            <div class="config-header">
              <h3>baseURL</h3>
              <div class="default-value">默认: null</div>
            </div>
            <p>设置基础 URL，所有请求都会基于此 URL</p>
            <pre class="code-block">axios.defaults.baseURL = 'https://api.example.com';</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>headers</h3>
              <div class="default-value">默认: {}</div>
            </div>
            <p>设置自定义请求头</p>
            <pre class="code-block">axios.defaults.headers.common['Authorization'] = 'Bearer token';

// 请求特定头
axios.get('/api/data', {
  headers: {
    'X-Custom-Header': 'value'
  }
});</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>timeout</h3>
              <div class="default-value">默认: 0</div>
            </div>
            <p>设置请求超时时间（毫秒）</p>
            <pre class="code-block">axios.defaults.timeout = 5000; // 5秒超时</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>responseType</h3>
              <div class="default-value">默认: 'json'</div>
            </div>
            <p>设置响应数据类型</p>
            <pre class="code-block">// 可选值: 'json', 'text', 'blob', 'arraybuffer', 'document'
axios.get('/api/image', {
  responseType: 'blob'
});</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>withCredentials</h3>
              <div class="default-value">默认: false</div>
            </div>
            <p>跨域请求时是否发送凭据（cookies）</p>
            <pre class="code-block">axios.defaults.withCredentials = true;</pre>
          </div>

          <div class="config-card">
            <div class="config-header">
              <h3>paramsSerializer</h3>
              <div class="default-value">默认: null</div>
            </div>
            <p>自定义参数序列化函数</p>
            <pre class="code-block">axios.get('/api/data', {
  params: {
    ids: [1, 2, 3]
  },
  paramsSerializer: params => {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  }
});</pre>
          </div>
        </div>
      </div>

      <div class="interceptors-section">
        <h2 class="section-title">拦截器</h2>

        <div class="interceptors-grid">
          <div class="interceptor-card">
            <h3>请求拦截器</h3>
            <p>在请求发送前添加认证头、修改配置等</p>
            <pre class="code-block">// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求前添加认证令牌
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 处理请求错误
    return Promise.reject(error);
  }
);</pre>
          </div>

          <div class="interceptor-card">
            <h3>响应拦截器</h3>
            <p>处理响应数据、统一错误处理等</p>
            <pre class="code-block">// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做统一处理
    return response.data;
  },
  error => {
    // 处理响应错误
    if (error.response) {
      // 服务器返回错误状态码
      const { status } = error.response;
      if (status === 401) {
        // 未授权，跳转登录
        router.push('/login');
      } else if (status === 403) {
        // 禁止访问
        alert('没有权限访问此资源');
      }
    }
    return Promise.reject(error);
  }
);</pre>
          </div>

          <div class="interceptor-card">
            <h3>移除拦截器</h3>
            <p>在需要时移除已添加的拦截器</p>
            <pre class="code-block">// 添加拦截器
const myInterceptor = axios.interceptors.request.use(
  config => { /* ... */ }
);

// 移除拦截器
axios.interceptors.request.eject(myInterceptor);</pre>
          </div>

          <div class="interceptor-card">
            <h3>拦截器原理</h3>
            <p>Axios 拦截器基于 Promise 链实现：</p>
            <div class="interceptor-flow">
              <div class="step">请求配置</div>
              <div class="arrow">→</div>
              <div class="step">请求拦截器</div>
              <div class="arrow">→</div>
              <div class="step">发送请求</div>
              <div class="arrow">→</div>
              <div class="step">响应拦截器</div>
              <div class="arrow">→</div>
              <div class="step">响应数据</div>
            </div>
            <p>每个拦截器都可以修改配置或响应数据，也可以中断请求</p>
          </div>
        </div>
      </div>

      <div class="advanced-section">
        <h2 class="section-title">高级功能</h2>

        <div class="advanced-grid">
          <div class="advanced-card">
            <div class="advanced-icon">✋</div>
            <h3>取消请求</h3>
            <p>使用 CancelToken 或 AbortController 取消请求</p>
            <pre class="code-block">// 使用 CancelToken (旧版)
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/api/data', {
  cancelToken: source.token
});

// 取消请求
source.cancel('请求被用户取消');

// 使用 AbortController (新版)
const controller = new AbortController();

axios.get('/api/data', {
  signal: controller.signal
});

// 取消请求
controller.abort();</pre>
          </div>

          <div class="advanced-card">
            <div class="advanced-icon">📊</div>
            <h3>上传进度</h3>
            <p>监控文件上传进度</p>
            <pre class="code-block">const formData = new FormData();
formData.append('file', largeFile);

axios.post('/api/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  onUploadProgress: progressEvent => {
    const percent = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(`上传进度: ${percent}%`);
    // 更新进度条
  }
});</pre>
          </div>

          <div class="advanced-card">
            <div class="advanced-icon">📥</div>
            <h3>下载进度</h3>
            <p>监控文件下载进度</p>
            <pre class="code-block">axios.get('/api/large-file', {
  responseType: 'blob',
  onDownloadProgress: progressEvent => {
    const percent = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(`下载进度: ${percent}%`);
    // 更新进度条
  }
});</pre>
          </div>

          <div class="advanced-card">
            <div class="advanced-icon">🔄</div>
            <h3>创建实例</h3>
            <p>创建具有自定义配置的 Axios 实例</p>
            <pre class="code-block">// 创建实例
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// 使用实例
api.get('/users');</pre>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2 class="section-title">最佳实践</h2>
        <div class="practices-grid">
          <div class="practice">
            <div class="number">1</div>
            <p>使用拦截器统一处理认证和错误</p>
          </div>
          <div class="practice">
            <div class="number">2</div>
            <p>为长时间请求设置超时时间</p>
          </div>
          <div class="practice">
            <div class="number">3</div>
            <p>使用实例管理不同API端点</p>
          </div>
          <div class="practice">
            <div class="number">4</div>
            <p>提供取消请求的功能</p>
          </div>
          <div class="practice">
            <div class="number">5</div>
            <p>为文件上传/下载添加进度指示器</p>
          </div>
          <div class="practice">
            <div class="number">6</div>
            <p>使用环境变量管理API基础URL</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Axios 提供了强大而灵活的 HTTP 请求功能，是现代 Web 开发中不可或缺的工具。通过合理使用其高级功能，可以创建更健壮、用户友好的应用程序。</p>
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


.axios-container {
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

      .axios-icon {
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

    .installation {
      h3 {
        margin-top: 0;
        color: #3498db;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #f0f0f0;
      }

      .install-methods {
        .method {
          .code-block {
            background: #2c3e50;
            color: #f8f9fa;
            border-radius: 8px;
            padding: 1.2rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.95rem;
            overflow-x: auto;
          }
        }
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

  .basic-usage-section {
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

    .usage-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .usage-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      border-left: 4px solid #3498db;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }

      h3 {
        margin-top: 0;
        color: #2c3e50;
        margin-bottom: 1rem;
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

  .interceptors-section {
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

    .interceptors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .interceptor-card {
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

      .interceptor-flow {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1.5rem 0;

        .step {
          background: #e3f2fd;
          color: #3498db;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-weight: 500;
        }

        .arrow {
          margin: 0 0.5rem;
          color: #7f8c8d;
        }
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
        background: linear-gradient(90deg, #2ecc71, #3498db);
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
  .axios-container {
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
