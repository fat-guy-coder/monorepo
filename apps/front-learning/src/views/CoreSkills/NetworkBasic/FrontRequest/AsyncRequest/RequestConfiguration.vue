<template>
  <div class="axios-container">
    <div class="header">
      <h1><i class="icon-axios"></i> Axios配置项基础介绍</h1>
      <p class="subtitle">基本解析Axios HTTP库的核心配置选项及其应用场景</p>
    </div>

    <div class="intro-card">
      <div class="intro-content">
        <h3>Axios是什么？</h3>
        <p>Axios是一个基于Promise的HTTP客户端，用于浏览器和Node.js环境。它提供了简洁的API和强大的配置选项，是前端开发中最常用的HTTP请求库之一。</p>
        <div class="key-points">
          <div class="point">
            <i class="icon-browser"></i>
            <div>
              <h4>跨平台支持</h4>
              <p>同时支持浏览器和Node.js环境</p>
            </div>
          </div>
          <div class="point">
            <i class="icon-promise"></i>
            <div>
              <h4>Promise API</h4>
              <p>基于Promise的异步处理模型</p>
            </div>
          </div>
          <div class="point">
            <i class="icon-feature"></i>
            <div>
              <h4>丰富特性</h4>
              <p>拦截器、自动转换JSON、请求取消等</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon-config"></i> 核心配置项分类</h2>
        <p>Axios配置选项的三大类别及其作用</p>
      </div>

      <div class="config-categories">
        <div class="category">
          <div class="category-header request">
            <i class="icon-request"></i>
            <h3>请求配置</h3>
          </div>
          <ul>
            <li>定义请求的基本参数</li>
            <li>控制请求发送行为</li>
            <li>设置请求头和数据格式</li>
            <li>管理请求超时和取消</li>
          </ul>
        </div>

        <div class="category">
          <div class="category-header response">
            <i class="icon-response"></i>
            <h3>响应配置</h3>
          </div>
          <ul>
            <li>处理响应数据格式</li>
            <li>定义响应验证逻辑</li>
            <li>设置响应数据类型</li>
            <li>配置响应转换逻辑</li>
          </ul>
        </div>

        <div class="category">
          <div class="category-header advanced">
            <i class="icon-advanced"></i>
            <h3>高级配置</h3>
          </div>
          <ul>
            <li>设置HTTP代理</li>
            <li>配置自定义代理</li>
            <li>管理跨域凭证</li>
            <li>处理上传/下载进度</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon-request"></i> 请求配置项</h2>
        <p>控制HTTP请求发送行为的核心选项</p>
      </div>

      <div class="config-table">
        <table>
          <thead>
            <tr>
              <th>配置项</th>
              <th>类型</th>
              <th>默认值</th>
              <th width="45%">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>url</code></td>
              <td>String</td>
              <td>-</td>
              <td>请求的服务器URL，相对于<code>baseURL</code></td>
            </tr>
            <tr>
              <td><code>method</code></td>
              <td>String</td>
              <td>'get'</td>
              <td>请求方法：get, post, put, delete, patch等</td>
            </tr>
            <tr>
              <td><code>baseURL</code></td>
              <td>String</td>
              <td>-</td>
              <td>自动添加到<code>url</code>前面的基础URL，用于配置全局API地址</td>
            </tr>
            <tr>
              <td><code>headers</code></td>
              <td>Object</td>
              <td>{}</td>
              <td>自定义请求头，常用于设置Content-Type、Authorization等</td>
            </tr>
            <tr>
              <td><code>params</code></td>
              <td>Object</td>
              <td>{}</td>
              <td>URL参数，会自动转换为查询字符串附加到URL后面</td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td>Object/<br>String</td>
              <td>-</td>
              <td>请求体数据，适用于PUT, POST, PATCH等请求方法</td>
            </tr>
            <tr>
              <td><code>timeout</code></td>
              <td>Number</td>
              <td>0</td>
              <td>请求超时时间（毫秒），0表示永不超时</td>
            </tr>
            <tr>
              <td><code>withCredentials</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>是否跨站点访问控制(CORS)请求使用凭据（cookies）</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon-response"></i> 响应配置项</h2>
        <p>控制HTTP响应处理的配置选项</p>
      </div>

      <div class="config-table">
        <table>
          <thead>
            <tr>
              <th>配置项</th>
              <th>类型</th>
              <th>默认值</th>
              <th width="45%">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>responseType</code></td>
              <td>String</td>
              <td>'json'</td>
              <td>服务器响应数据类型：json, text, blob, arraybuffer, document</td>
            </tr>
            <tr>
              <td><code>responseEncoding</code></td>
              <td>String</td>
              <td>'utf8'</td>
              <td>指定响应数据的编码格式</td>
            </tr>
            <tr>
              <td><code>validateStatus</code></td>
              <td>Function</td>
              <td>(status) => status >= 200 && status < 300</td>
              <td>定义HTTP状态码有效范围，返回true表示请求成功</td>
            </tr>
            <tr>
              <td><code>transformResponse</code></td>
              <td>Array</td>
              <td>[transformResponse]</td>
              <td>在响应传递给then/catch前，修改响应数据</td>
            </tr>
            <tr>
              <td><code>maxContentLength</code></td>
              <td>Number</td>
              <td>2000</td>
              <td>定义允许的响应内容最大尺寸（字节）</td>
            </tr>
            <tr>
              <td><code>maxRedirects</code></td>
              <td>Number</td>
              <td>5</td>
              <td>定义在Node.js中最大重定向数目（0表示不重定向）</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon-advanced"></i> 高级配置项</h2>
        <p>用于特殊场景的高级配置选项</p>
      </div>

      <div class="config-table">
        <table>
          <thead>
            <tr>
              <th>配置项</th>
              <th>类型</th>
              <th>默认值</th>
              <th width="45%">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>cancelToken</code></td>
              <td>CancelToken</td>
              <td>-</td>
              <td>指定取消请求的CancelToken，用于请求取消功能</td>
            </tr>
            <tr>
              <td><code>onUploadProgress</code></td>
              <td>Function</td>
              <td>-</td>
              <td>上传进度事件处理函数，参数为ProgressEvent对象</td>
            </tr>
            <tr>
              <td><code>onDownloadProgress</code></td>
              <td>Function</td>
              <td>-</td>
              <td>下载进度事件处理函数，参数为ProgressEvent对象</td>
            </tr>
            <tr>
              <td><code>proxy</code></td>
              <td>Object</td>
              <td>-</td>
              <td>代理配置对象（仅Node.js环境）</td>
            </tr>
            <tr>
              <td><code>httpAgent</code><br><code>httpsAgent</code></td>
              <td>Object</td>
              <td>-</td>
              <td>自定义Node.js的http/https代理（仅Node.js环境）</td>
            </tr>
            <tr>
              <td><code>xsrfCookieName</code></td>
              <td>String</td>
              <td>'XSRF-TOKEN'</td>
              <td>用作xsrf token值的cookie名称</td>
            </tr>
            <tr>
              <td><code>xsrfHeaderName</code></td>
              <td>String</td>
              <td>'X-XSRF-TOKEN'</td>
              <td>携带xsrf token的HTTP请求头的名称</td>
            </tr>
            <tr>
              <td><code>paramsSerializer</code></td>
              <td>Function</td>
              <td>-</td>
              <td>自定义参数序列化函数，用于处理请求参数</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon-example"></i> 配置实例与最佳实践</h2>
        <p>实际应用中的Axios配置示例</p>
      </div>

      <div class="config-examples">
        <div class="example">
          <h3>1. 全局Axios默认配置</h3>
          <p>在应用入口设置全局默认配置</p>
          <pre class="code-snippet">// main.js
import axios from 'axios';

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Authorization'] = 'Bearer token';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 添加响应拦截器
axios.interceptors.response.use(
  response => response.data, // 直接返回数据部分
  error => {
    // 统一错误处理
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);</pre>
        </div>

        <div class="example">
          <h3>2. 创建自定义实例</h3>
          <p>针对特定API创建独立实例</p>
          <pre class="code-snippet">// api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'custom-value'
  }
});

// 请求拦截器 - 添加认证token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器 - 处理错误状态码
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // 处理未授权错误
      logoutUser();
    }
    return Promise.reject(error);
  }
);

export default apiClient;</pre>
        </div>

        <div class="example">
          <h3>3. 请求取消实现</h3>
          <p>使用CancelToken取消请求</p>
          <pre class="code-snippet">import axios from 'axios';

// 创建取消令牌源
const CancelToken = axios.CancelToken;
let cancel;

// 发送请求
axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c; // 保存取消函数
  })
});

// 取消请求（例如组件卸载时）
cancel('Operation canceled by the user');

// 拦截请求取消错误
axios.interceptors.response.use(
  response => response,
  error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
      return new Promise(() => {}); // 中断Promise链
    }
    return Promise.reject(error);
  }
);</pre>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2><i class="icon-tips"></i> 配置使用技巧</h2>
        <p>Axios配置的最佳实践与注意事项</p>
      </div>

      <div class="usage-tips">
        <div class="tip">
          <i class="tip-icon">✓</i>
          <div>
            <h4>合理设置超时时间</h4>
            <p>根据API响应时间设置适当的timeout值，避免用户长时间等待</p>
          </div>
        </div>

        <div class="tip">
          <i class="tip-icon">✓</i>
          <div>
            <h4>全局配置与实例配置</h4>
            <p>优先使用axios.create()创建实例，避免修改全局配置带来的副作用</p>
          </div>
        </div>

        <div class="tip">
          <i class="tip-icon">✓</i>
          <div>
            <h4>善用拦截器</h4>
            <p>通过拦截器统一处理认证、错误、loading状态等全局逻辑</p>
          </div>
        </div>

        <div class="tip">
          <i class="tip-icon">✓</i>
          <div>
            <h4>类型安全配置</h4>
            <p>在TypeScript项目中，为axios配置添加类型声明增强类型安全</p>
          </div>
        </div>

        <div class="tip">
          <i class="tip-icon">✓</i>
          <div>
            <h4>响应数据转换</h4>
            <p>使用transformResponse处理响应数据格式，适配前端数据结构</p>
          </div>
        </div>

        <div class="tip">
          <i class="tip-icon">✓</i>
          <div>
            <h4>取消请求管理</h4>
            <p>在组件卸载或路由切换时取消未完成的请求，避免内存泄漏</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-note">
      本指南基于Axios v1.x版本，具体配置项请参考<a href="https://axios-http.com/docs/intro" target="_blank">官方文档</a>
    </div>
  </div>
</template>

<script setup lang="ts">
// 可以在这里添加组件逻辑
</script>

<style lang="less" scoped>


// 颜色定义
@primary-color: #42b983;
@secondary-color: #35495e;
@accent-color: #f66f26;
@light-bg: #f8fafc;
@card-bg: #ffffff;
@border-color: #e2e8f0;
@text-color: #2d3748;
@text-secondary: #718096;
@success-color: #48bb78;
@warning-color: #ed8936;

// 图标字体
@font-face {
  font-family: 'AxiosIcons';
  src: url('data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAA...') format('woff2');
}

.axios-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 25px;
  background-color: @light-bg;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  padding: 40px 0 30px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @text-color;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    .icon-axios {
      font-family: 'AxiosIcons';
      content: "\e900";
      font-size: 2.2rem;
      color: @primary-color;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
  }
}

.intro-card {
  background: linear-gradient(135deg, rgba(@primary-color, 0.05), rgba(@accent-color, 0.05));
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  border-left: 4px solid @primary-color;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);

  .intro-content {
    h3 {
      font-size: 1.7rem;
      margin-bottom: 20px;
      color: @text-color;
    }

    p {
      font-size: 1.05rem;
      line-height: 1.8;
      margin-bottom: 25px;
      color: lighten(@text-color, 10%);
    }
  }

  .key-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 25px;

    .point {
      display: flex;
      gap: 15px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      }

      [class^="icon-"] {
        font-family: 'AxiosIcons';
        font-size: 1.7rem;
        min-width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(@primary-color, 0.1);
        color: @primary-color;
        border-radius: 50%;
      }

      .icon-browser::before {
        content: "\e901";
      }

      .icon-promise::before {
        content: "\e902";
      }

      .icon-feature::before {
        content: "\e903";
      }

      h4 {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: @text-color;
      }

      p {
        font-size: 0.92rem;
        color: @text-secondary;
        margin: 0;
      }
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 35px;
  margin-bottom: 35px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .section-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgba(@primary-color, 0.1);

    h2 {
      font-size: 1.8rem;
      margin-bottom: 10px;
      color: @text-color;
      display: flex;
      align-items: center;
      gap: 15px;

      [class^="icon-"] {
        font-family: 'AxiosIcons';
        font-size: 1.5rem;
        color: @primary-color;
      }

      .icon-config::before {
        content: "\e904";
      }

      .icon-request::before {
        content: "\e905";
      }

      .icon-response::before {
        content: "\e906";
      }

      .icon-advanced::before {
        content: "\e907";
      }

      .icon-example::before {
        content: "\e908";
      }

      .icon-tips::before {
        content: "\e909";
      }
    }

    p {
      color: @text-secondary;
      font-size: 1.05rem;
      padding-left: 45px;
    }
  }
}

.config-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin: 30px 0;

  .category {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-8px);
    }

    .category-header {
      padding: 25px;
      text-align: center;
      color: white;

      h3 {
        font-size: 1.3rem;
        margin: 15px 0 0;
      }

      [class^="icon-"] {
        font-family: 'AxiosIcons';
        font-size: 2.5rem;
        display: block;
        margin: 0 auto;
      }

      &.request {
        background: linear-gradient(135deg, #3498db, #2980b9);

        .icon-request::before {
          content: "\e905";
        }
      }

      &.response {
        background: linear-gradient(135deg, #2ecc71, #27ae60);

        .icon-response::before {
          content: "\e906";
        }
      }

      &.advanced {
        background: linear-gradient(135deg, #9b59b6, #8e44ad);

        .icon-advanced::before {
          content: "\e907";
        }
      }
    }

    ul {
      padding: 20px 25px;

      li {
        margin-bottom: 12px;
        padding-left: 25px;
        position: relative;
        font-size: 0.95rem;
        color: @text-secondary;

        &::before {
          content: "•";
          color: @primary-color;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
      }
    }
  }
}

.config-table {
  overflow-x: auto;
  margin: 25px 0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;

    th,
    td {
      padding: 14px 18px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    thead {
      background: @primary-color;
      color: white;

      th {
        font-weight: 600;
        font-size: 1.05rem;

        &:first-child {
          border-radius: 12px 0 0 0;
        }

        &:last-child {
          border-radius: 0 12px 0 0;
        }
      }
    }

    tbody {
      tr {
        &:nth-child(even) {
          background: rgba(@primary-color, 0.03);
        }

        &:hover {
          background: rgba(@primary-color, 0.06);
        }

        td {
          font-weight: 500;
          font-size: 0.95rem;

          code {
            background: rgba(@primary-color, 0.1);
            padding: 3px 6px;
            border-radius: 4px;
            color: darken(@primary-color, 10%);
            font-weight: 600;
          }

          &:first-child {
            font-weight: 600;
            color: @primary-color;
          }
        }
      }
    }
  }
}

.config-examples {
  display: flex;
  flex-direction: column;
  gap: 35px;

  .example {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 14px;
    padding: 25px;
    border-left: 4px solid @accent-color;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      color: @text-color;
      display: flex;
      align-items: center;
      gap: 12px;

      &::before {
        content: "";
        display: inline-block;
        width: 15px;
        height: 15px;
        background: @accent-color;
        border-radius: 50%;
      }
    }

    p {
      color: @text-secondary;
      margin-bottom: 18px;
      line-height: 1.7;
      font-size: 0.98rem;
    }
  }
}

.code-snippet {
  background: #2d3747;
  color: #e2e8f0;
  padding: 22px;
  border-radius: 10px;
  font-family: 'Fira Code', monospace;
  font-size: 0.92rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 15px 0;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);

  .comment {
    color: #a0aec0;
  }

  .keyword {
    color: #63b3ed;
  }

  .function {
    color: #f6e05e;
  }

  .string {
    color: #68d391;
  }

  .variable {
    color: #f6ad55;
  }
}

.usage-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;

  .tip {
    display: flex;
    gap: 18px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }

    .tip-icon {
      min-width: 36px;
      height: 36px;
      background: rgba(@primary-color, 0.1);
      color: @primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.1rem;
    }

    h4 {
      font-size: 1.15rem;
      margin-bottom: 8px;
      color: @text-color;
    }

    p {
      font-size: 0.92rem;
      color: @text-secondary;
      margin: 0;
      line-height: 1.6;
    }
  }
}

.footer-note {
  text-align: center;
  padding: 20px;
  color: @text-secondary;
  font-size: 0.95rem;
  border-top: 1px dashed @border-color;
  margin-top: 30px;

  a {
    color: @primary-color;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .intro-card .key-points {
    grid-template-columns: 1fr;
  }

  .config-categories {
    grid-template-columns: 1fr;
  }

  .usage-tips {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 25px 20px;
  }
}
</style>
