<template>
  <div class="request-body-container">
    <header class="header">
      <div class="header-content">
        <h1 class="title">HTTP请求体基础介绍</h1>
        <p class="subtitle">掌握现代Web应用中的数据传输格式</p>
        <div class="header-stats">
          <div class="stat-card">
            <div class="stat-value">6+</div>
            <div class="stat-label">数据格式</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">100%</div>
            <div class="stat-label">API兼容</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">∞</div>
            <div class="stat-label">应用场景</div>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <!-- 请求体基本概念 -->
      <section class="section concepts-section">
        <div class="section-header">
          <div class="section-icon">📦</div>
          <h2>请求体基本概念</h2>
        </div>

        <div class="concepts-grid">
          <div class="concept-card">
            <div class="concept-icon">📝</div>
            <h3>什么是请求体？</h3>
            <p>HTTP请求中用于向服务器发送数据的部分，通常用于POST、PUT等非GET请求</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">🔖</div>
            <h3>Content-Type</h3>
            <p>关键请求头，指定请求体的数据格式</p>
            <div class="code-block">
              <pre><code>Content-Type: application/json
Content-Type: multipart/form-data
Content-Type: application/x-www-form-urlencoded</code></pre>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-icon">⚙️</div>
            <h3>数据封装</h3>
            <p>前端负责将数据封装为特定格式，后端负责解析</p>
          </div>
        </div>
      </section>

      <!-- JSON格式 -->
      <section class="section json-section">
        <div class="section-header">
          <div class="section-icon">🔤</div>
          <h2>JSON格式 (application/json)</h2>
          <p class="section-subtitle">现代Web API的通用数据交换格式</p>
        </div>

        <div class="format-content">
          <div class="explanation">
            <h3>特点</h3>
            <ul>
              <li>轻量级数据交换格式</li>
              <li>易读性和可写性良好</li>
              <li>支持复杂数据结构</li>
              <li>广泛的前后端支持</li>
            </ul>

            <h3>使用场景</h3>
            <ul>
              <li>RESTful API通信</li>
              <li>前后端数据交互</li>
              <li>配置信息传输</li>
              <li>复杂结构化数据</li>
            </ul>
          </div>

          <div class="code-examples">
            <div class="code-example">
              <h4>前端发送</h4>
              <div class="code-block">
                <pre><code>const userData = {
  name: '张三',
  email: 'zhangsan@example.com',
  preferences: {
    theme: 'dark',
    notifications: true
  }
};

fetch('/api/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData)
});</code></pre>
              </div>
            </div>

            <div class="code-example">
              <h4>后端处理 (Node.js示例)</h4>
              <div class="code-block">
                <pre><code>app.post('/api/user', (req, res) => {
  const userData = req.body;
  console.log('用户数据:', userData);

  // 处理数据...
  res.status(201).json({ message: '用户创建成功' });
});</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Form Data格式 -->
      <section class="section formdata-section">
        <div class="section-header">
          <div class="section-icon">📋</div>
          <h2>Form Data格式 (multipart/form-data)</h2>
          <p class="section-subtitle">支持文件上传的表单数据格式</p>
        </div>

        <div class="format-content">
          <div class="explanation">
            <h3>特点</h3>
            <ul>
              <li>支持文本和二进制数据混合</li>
              <li>每个字段作为独立部分传输</li>
              <li>自动生成边界分隔符</li>
              <li>适合大文件上传</li>
            </ul>

            <h3>使用场景</h3>
            <ul>
              <li>文件上传表单</li>
              <li>包含文件的数据提交</li>
              <li>多部分表单提交</li>
              <li>大尺寸数据上传</li>
            </ul>
          </div>

          <div class="code-examples">
            <div class="code-example">
              <h4>前端发送</h4>
              <div class="code-block">
                <pre><code>const formData = new FormData();
formData.append('username', '张三');
formData.append('email', 'zhangsan@example.com');
formData.append('avatar', fileInput.files[0]); // 文件

// 使用fetch发送
fetch('/api/register', {
  method: 'POST',
  body: formData
  // 注意：不需要手动设置Content-Type
});</code></pre>
              </div>
            </div>

            <div class="code-example">
              <h4>后端处理 (Node.js示例)</h4>
              <div class="code-block">
                <pre><code>const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/register', upload.single('avatar'), (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const avatar = req.file; // 上传的文件信息

  console.log(`用户 ${username} 注册成功`);
  res.sendStatus(200);
});</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- URL Encoded格式 -->
      <section class="section urlencoded-section">
        <div class="section-header">
          <div class="section-icon">🔗</div>
          <h2>URL Encoded格式 (application/x-www-form-urlencoded)</h2>
          <p class="section-subtitle">传统的表单数据编码格式</p>
        </div>

        <div class="format-content">
          <div class="explanation">
            <h3>特点</h3>
            <ul>
              <li>键值对格式，类似URL查询参数</li>
              <li>数据经过URL编码</li>
              <li>只支持文本数据</li>
              <li>默认的HTML表单编码</li>
            </ul>

            <h3>使用场景</h3>
            <ul>
              <li>简单表单提交</li>
              <li>登录认证请求</li>
              <li>兼容旧系统</li>
              <li>不需要文件上传的场景</li>
            </ul>
          </div>

          <div class="code-examples">
            <div class="code-example">
              <h4>前端发送</h4>
              <div class="code-block">
                <pre><code>const params = new URLSearchParams();
params.append('username', '张三');
params.append('password', 'p@ssw0rd');
params.append('remember', 'true');

fetch('/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: params
});</code></pre>
              </div>
            </div>

            <div class="code-example">
              <h4>后端处理 (Node.js示例)</h4>
              <div class="code-block">
                <pre><code>app.post('/api/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const remember = req.body.remember === 'true';

  // 验证逻辑...
  if (isValidUser(username, password)) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: '认证失败' });
  }
});</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 其他格式 -->
      <section class="section other-section">
        <div class="section-header">
          <div class="section-icon">📎</div>
          <h2>其他请求体格式</h2>
          <p class="section-subtitle">特殊场景下的数据格式</p>
        </div>

        <div class="formats-grid">
          <div class="format-card">
            <h3>纯文本 (text/plain)</h3>
            <div class="code-block">
              <pre><code>// 发送文本内容
fetch('/api/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain'
  },
  body: '这是一条纯文本笔记内容'
});

// 使用场景: 简单文本提交, 日志记录</code></pre>
            </div>
          </div>

          <div class="format-card">
            <h3>XML (application/xml)</h3>
            <div class="code-block">
              <pre><code>// 发送XML数据
const xmlData = `
&lt;user&gt;
  &lt;name&gt;张三&lt;/name&gt;
  &lt;email&gt;zhangsan@example.com&lt;/email&gt;
&lt;/user&gt;
`;

fetch('/api/xml-data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/xml'
  },
  body: xmlData
});

// 使用场景: SOAP API, 遗留系统集成</code></pre>
            </div>
          </div>

          <div class="format-card">
            <h3>二进制数据 (application/octet-stream)</h3>
            <div class="code-block">
              <pre><code>// 发送二进制数据
const file = document.getElementById('fileInput').files[0];

fetch('/api/upload-binary', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream'
  },
  body: file
});

// 使用场景: 直接传输二进制文件, 自定义协议</code></pre>
            </div>
          </div>

          <div class="format-card">
            <h3>GraphQL (application/graphql)</h3>
            <div class="code-block">
              <pre><code>// GraphQL查询
const query = `
  query {
    user(id: "123") {
      name
      email
      posts {
        title
      }
    }
  }
`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/graphql'
  },
  body: query
});

// 使用场景: GraphQL API请求</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 格式对比 -->
      <section class="section comparison-section">
        <div class="section-header">
          <div class="section-icon">📊</div>
          <h2>请求体格式对比</h2>
        </div>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>格式</th>
                <th>Content-Type</th>
                <th>数据大小</th>
                <th>文件支持</th>
                <th>复杂结构</th>
                <th>典型场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>JSON</strong></td>
                <td>application/json</td>
                <td>中等</td>
                <td>❌</td>
                <td>✅</td>
                <td>API通信, 复杂数据</td>
              </tr>
              <tr>
                <td><strong>Form Data</strong></td>
                <td>multipart/form-data</td>
                <td>大</td>
                <td>✅</td>
                <td>❌</td>
                <td>文件上传, 表单提交</td>
              </tr>
              <tr>
                <td><strong>URL Encoded</strong></td>
                <td>application/x-www-form-urlencoded</td>
                <td>小</td>
                <td>❌</td>
                <td>❌</td>
                <td>简单表单, 登录认证</td>
              </tr>
              <tr>
                <td><strong>纯文本</strong></td>
                <td>text/plain</td>
                <td>小</td>
                <td>❌</td>
                <td>❌</td>
                <td>日志, 简单文本</td>
              </tr>
              <tr>
                <td><strong>XML</strong></td>
                <td>application/xml</td>
                <td>大</td>
                <td>❌</td>
                <td>✅</td>
                <td>SOAP, 遗留系统</td>
              </tr>
              <tr>
                <td><strong>二进制</strong></td>
                <td>application/octet-stream</td>
                <td>大</td>
                <td>✅</td>
                <td>❌</td>
                <td>文件传输, 自定义协议</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="section bestpractices-section">
        <div class="section-header">
          <div class="section-icon">✅</div>
          <h2>最佳实践</h2>
        </div>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">🔒</div>
            <h3>安全性</h3>
            <ul>
              <li>始终验证和清理输入数据</li>
              <li>敏感数据使用HTTPS传输</li>
              <li>限制请求体大小</li>
              <li>使用CSRF保护</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">⚡</div>
            <h3>性能优化</h3>
            <ul>
              <li>压缩大型JSON数据</li>
              <li>分片上传大文件</li>
              <li>避免不必要的数据传输</li>
              <li>使用二进制格式传输媒体</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🔁</div>
            <h3>兼容性</h3>
            <ul>
              <li>明确设置Content-Type</li>
              <li>为旧系统提供格式转换</li>
              <li>支持多种数据格式的API</li>
              <li>提供清晰的错误响应</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">📝</div>
            <h3>文档化</h3>
            <ul>
              <li>API文档明确请求体格式</li>
              <li>提供请求示例</li>
              <li>描述每个字段的含义</li>
              <li>说明必填/选填字段</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>HTTP请求体基础介绍 | 现代Web开发核心技术 | Vue 3 技术演示</p>
      <p>掌握不同数据格式，构建更健壮的Web应用</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例响应式数据
const activeSection = ref('concepts');
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

.request-body-container {
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
    font-size: 2.5rem;
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

.format-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.explanation {
  h3 {
    font-size: 1.4rem;
    color: #4361ee;
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e2e8f0;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 25px;

    li {
      margin-bottom: 12px;
      color: #555;
      line-height: 1.6;
    }
  }
}

.code-examples {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.code-example {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;

  h4 {
    font-size: 1.2rem;
    color: #2b2d42;
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e2e8f0;
  }
}

.formats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
}

.format-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  h3 {
    font-size: 1.4rem;
    color: #2b2d42;
    margin-bottom: 15px;
    border-bottom: 2px solid #f0f4f8;
    padding-bottom: 10px;
  }
}

.comparison-table {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  overflow-x: auto;
  border: 1px solid #e2e8f0;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;

    th,
    td {
      padding: 15px 20px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #f0f7ff;
      color: #4361ee;
      font-weight: 600;
      font-size: 1.1rem;
    }

    td {
      color: #444;
    }

    tr:hover {
      background: #f0f4f8;
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
