<template>
  <div class="curl-container">
    <!-- 头部区域 -->
    <header class="header">
      <h1 class="title">cURL 命令行工具基础介绍</h1>
      <p class="subtitle">数据传输的瑞士军刀</p>
      <div class="curl-icon">🔄</div>
    </header>

    <!-- cURL简介 -->
    <div class="intro-section">
      <div class="intro-card">
        <div class="intro-content">
          <h2>什么是 cURL？</h2>
          <p>cURL（Client URL）是一个开源的命令行工具和库，用于在终端中传输数据。它支持多种协议，包括 HTTP、HTTPS、FTP、FTPS、SCP、SFTP、TFTP、LDAP 等。</p>

          <div class="key-features">
            <div class="feature">
              <div class="icon">🌐</div>
              <h3>多协议支持</h3>
              <p>支持超过25种网络协议</p>
            </div>
            <div class="feature">
              <div class="icon">📦</div>
              <h3>跨平台</h3>
              <p>可在 Windows、macOS、Linux 上运行</p>
            </div>
            <div class="feature">
              <div class="icon">🔌</div>
              <h3>无界面</h3>
              <p>纯命令行工具，无需GUI</p>
            </div>
          </div>
        </div>
        <div class="intro-image">
          <div class="terminal-window">
            <div class="terminal-header">
              <div class="window-controls">
                <span class="close"></span>
                <span class="minimize"></span>
                <span class="maximize"></span>
              </div>
              <div class="title">bash</div>
            </div>
            <div class="terminal-content">
              <pre>$ curl https://api.example.com/data.json</pre>
              <pre>{</pre>
              <pre>  "name": "cURL",</pre>
              <pre>  "description": "Command line tool for data transfer"</pre>
              <pre>}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- cURL参数 -->
    <div class="parameters-section">
      <h2 class="section-title">常用 cURL 参数基础介绍</h2>

      <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="搜索参数..." class="search-input">
        <button class="search-btn">
          <span class="icon">🔍</span>
        </button>
      </div>

      <div class="parameters-grid">
        <div v-for="param in filteredParameters" :key="param.option" class="parameter-card">
          <div class="param-header">
            <div class="option">{{ param.option }}</div>
            <div class="shortcut" v-if="param.shortcut">({{ param.shortcut }})</div>
          </div>
          <div class="description">{{ param.description }}</div>
          <div class="examples" v-if="param.examples">
            <div class="example-title">示例:</div>
            <pre v-for="(ex, idx) in param.examples" :key="idx">{{ ex }}</pre>
          </div>
          <div class="param-footer">
            <span class="usage-type" :class="param.type">{{ param.type }}</span>
            <span class="since" v-if="param.since">Since: {{ param.since }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- cURL使用场景 -->
    <div class="use-cases">
      <h2 class="section-title">cURL 常见使用场景</h2>

      <div class="tabs">
        <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
          {{ tab.label }}
        </button>
      </div>

      <div class="tab-content">
        <div v-if="activeTab === 'api'" class="case-content">
          <h3>API 测试与调试</h3>
          <div class="case-description">
            <p>cURL 是测试 RESTful API 的理想工具，可以快速发送各种 HTTP 请求并查看响应。</p>
          </div>
          <div class="case-examples">
            <div class="example">
              <h4>GET 请求</h4>
              <pre>curl https://api.example.com/users</pre>
            </div>
            <div class="example">
              <h4>POST 请求</h4>
              <pre>curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'</pre>
            </div>
            <div class="example">
              <h4>带认证的请求</h4>
              <pre>curl -u username:password https://api.example.com/protected</pre>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'download'" class="case-content">
          <h3>文件下载与上传</h3>
          <div class="case-description">
            <p>cURL 支持各种协议的文件传输，是自动化脚本中的常用工具。</p>
          </div>
          <div class="case-examples">
            <div class="example">
              <h4>下载文件</h4>
              <pre>curl -O https://example.com/file.zip</pre>
            </div>
            <div class="example">
              <h4>断点续传</h4>
              <pre>curl -C - -O https://example.com/large-file.iso</pre>
            </div>
            <div class="example">
              <h4>FTP 上传</h4>
              <pre>curl -T localfile.txt ftp://ftp.example.com/ \
  --user username:password</pre>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'debug'" class="case-content">
          <h3>网络调试与诊断</h3>
          <div class="case-description">
            <p>cURL 提供丰富的调试选项，帮助诊断网络问题。</p>
          </div>
          <div class="case-examples">
            <div class="example">
              <h4>显示详细请求信息</h4>
              <pre>curl -v https://example.com</pre>
            </div>
            <div class="example">
              <h4>仅显示响应头</h4>
              <pre>curl -I https://example.com</pre>
            </div>
            <div class="example">
              <h4>测试网站响应时间</h4>
              <pre>curl -w "Time: %{time_total}s\n" -o /dev/null -s https://example.com</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- cURL 与 API 工具对比 -->
    <div class="comparison-section">
      <h2 class="section-title">cURL 与图形化 API 工具对比</h2>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>cURL</th>
              <th>Postman</th>
              <th>Insomnia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>安装要求</td>
              <td>命令行（轻量）</td>
              <td>桌面应用</td>
              <td>桌面应用</td>
            </tr>
            <tr>
              <td>学习曲线</td>
              <td>较陡峭</td>
              <td>平缓</td>
              <td>平缓</td>
            </tr>
            <tr>
              <td>脚本化能力</td>
              <td>优秀</td>
              <td>中等</td>
              <td>中等</td>
            </tr>
            <tr>
              <td>自动化测试</td>
              <td>需要脚本</td>
              <td>内置支持</td>
              <td>内置支持</td>
            </tr>
            <tr>
              <td>团队协作</td>
              <td>无</td>
              <td>优秀</td>
              <td>良好</td>
            </tr>
            <tr>
              <td>环境变量</td>
              <td>需手动管理</td>
              <td>内置管理</td>
              <td>内置管理</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="conclusion">
        <h3>何时使用 cURL？</h3>
        <ul>
          <li>快速测试单个API端点</li>
          <li>在服务器环境中工作</li>
          <li>自动化脚本和CI/CD流程</li>
          <li>需要轻量级解决方案</li>
          <li>调试网络问题</li>
        </ul>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2023 命令行工具指南 | cURL 是开发者的必备工具</p>
      <p>cURL 官网: <a href="https://curl.se" target="_blank">https://curl.se</a> | 最新版本: {{ curlVersion }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// cURL版本信息
const curlVersion = ref('8.4.0 (2023-10-11)');

// 搜索查询
const searchQuery = ref('');

// 标签页状态
const tabs = [
  { id: 'api', label: 'API测试' },
  { id: 'download', label: '文件传输' },
  { id: 'debug', label: '网络调试' }
];
const activeTab = ref('api');

// cURL参数数据
const curlParameters = ref([
  {
    option: "--request",
    shortcut: "-X",
    description: "指定 HTTP 请求方法（GET, POST, PUT, DELETE 等）",
    examples: ["curl -X POST https://api.example.com/resource"],
    type: "HTTP",
    since: "7.1"
  },
  {
    option: "--header",
    shortcut: "-H",
    description: "添加 HTTP 请求头",
    examples: [
      "curl -H \"Content-Type: application/json\" https://api.example.com",
      "curl -H \"Authorization: Bearer token\" https://api.example.com"
    ],
    type: "HTTP",
    since: "4.0"
  },
  {
    option: "--data",
    shortcut: "-d",
    description: "发送 POST 请求的数据",
    examples: [
      "curl -d \"name=John\" https://api.example.com",
      "curl -d @data.json https://api.example.com"
    ],
    type: "HTTP",
    since: "4.0"
  },
  {
    option: "--form",
    shortcut: "-F",
    description: "模拟表单提交（multipart/form-data）",
    examples: [
      "curl -F \"file=@photo.jpg\" https://api.example.com/upload",
      "curl -F \"name=John\" -F \"age=30\" https://api.example.com"
    ],
    type: "HTTP",
    since: "5.0"
  },
  {
    option: "--output",
    shortcut: "-o",
    description: "将输出写入文件而不是标准输出",
    examples: [
      "curl -o output.html https://example.com",
      "curl -o image.jpg https://example.com/image.jpg"
    ],
    type: "Output",
    since: "4.0"
  },
  {
    option: "--remote-name",
    shortcut: "-O",
    description: "使用远程文件名保存输出",
    examples: ["curl -O https://example.com/files/document.pdf"],
    type: "Output",
    since: "4.0"
  },
  {
    option: "--location",
    shortcut: "-L",
    description: "跟随重定向",
    examples: ["curl -L https://example.com"],
    type: "HTTP",
    since: "4.0"
  },
  {
    option: "--user",
    shortcut: "-u",
    description: "指定服务器认证的用户名和密码",
    examples: [
      "curl -u username:password https://api.example.com",
      "curl -u username https://api.example.com"
    ],
    type: "Auth",
    since: "4.0"
  },
  {
    option: "--cookie",
    shortcut: "-b",
    description: "发送 cookie",
    examples: ["curl -b \"sessionid=abc123\" https://example.com"],
    type: "HTTP",
    since: "4.0"
  },
  {
    option: "--cookie-jar",
    shortcut: "-c",
    description: "将 cookie 保存到文件",
    examples: ["curl -c cookies.txt https://example.com"],
    type: "HTTP",
    since: "4.0"
  },
  {
    option: "--verbose",
    shortcut: "-v",
    description: "显示详细操作信息（调试用）",
    examples: ["curl -v https://example.com"],
    type: "Debug",
    since: "4.0"
  },
  {
    option: "--insecure",
    shortcut: "-k",
    description: "允许不安全的 SSL 连接（忽略证书错误）",
    examples: ["curl -k https://self-signed.example.com"],
    type: "SSL",
    since: "4.0"
  },
  {
    option: "--limit-rate",
    description: "限制数据传输速率",
    examples: ["curl --limit-rate 100K https://example.com/largefile.iso"],
    type: "Transfer",
    since: "7.10"
  },
  {
    option: "--continue-at",
    shortcut: "-C",
    description: "断点续传",
    examples: ["curl -C - -O https://example.com/largefile.zip"],
    type: "Transfer",
    since: "7.1"
  },
  {
    option: "--proxy",
    shortcut: "-x",
    description: "使用代理服务器",
    examples: ["curl -x http://proxy.example.com:8080 https://target.example.com"],
    type: "Network",
    since: "4.0"
  },
  {
    option: "--max-time",
    shortcut: "-m",
    description: "设置最大请求时间（秒）",
    examples: ["curl -m 30 https://example.com"],
    type: "Network",
    since: "7.1"
  }
]);

// 过滤参数
const filteredParameters = computed(() => {
  if (!searchQuery.value) return curlParameters.value;

  const query = searchQuery.value.toLowerCase();
  return curlParameters.value.filter(param =>
    param.option.toLowerCase().includes(query) ||
    (param.shortcut && param.shortcut.toLowerCase().includes(query)) ||
    param.description.toLowerCase().includes(query) ||
    param.type.toLowerCase().includes(query)
  );
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap');

:root {
  --primary: #2c3e50;
  --secondary: #3498db;
  --accent: #2ecc71;
  --light: #ecf0f1;
  --dark: #34495e;
  --gray: #95a5a6;
  --terminal-bg: #1e1e1e;
  --terminal-green: #4ec9b0;
  --border-radius: 8px;
  --box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.curl-container {
  font-family: 'Roboto', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  color: var(--primary);
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  .title {
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.4rem;
    color: var(--gray);
    font-weight: 400;
    margin-bottom: 1rem;
  }

  .curl-icon {
    font-size: 5rem;
    opacity: 0.1;
    position: absolute;
    top: -30px;
    right: 0;
    z-index: -1;
    transform: rotate(15deg);
  }
}

.intro-section {
  margin-bottom: 3rem;

  .intro-card {
    display: flex;
    background: white;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);

    .intro-content {
      flex: 1;
      padding: 2rem;

      h2 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        color: var(--primary);
        position: relative;
        padding-bottom: 0.8rem;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: var(--secondary);
        }
      }

      p {
        margin-bottom: 2rem;
        font-size: 1.1rem;
        line-height: 1.8;
      }
    }

    .intro-image {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f0f4f8;
      padding: 1rem;
    }
  }

  .key-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;

    .feature {
      text-align: center;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: var(--border-radius);
      transition: var(--transition);

      &:hover {
        transform: translateY(-5px);
        box-shadow: var(--box-shadow);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        color: var(--dark);
      }

      p {
        font-size: 0.95rem;
        color: var(--gray);
        margin: 0;
      }
    }
  }
}

.terminal-window {
  width: 100%;
  max-width: 500px;
  background: var(--terminal-bg);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  .terminal-header {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    background: #3c3c3c;
    border-bottom: 1px solid #2d2d2d;

    .window-controls {
      display: flex;
      gap: 0.5rem;

      span {
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;

        &.close {
          background: #ff5f56;
        }

        &.minimize {
          background: #ffbd2e;
        }

        &.maximize {
          background: #27c93f;
        }
      }
    }

    .title {
      flex: 1;
      text-align: center;
      color: #b3b3b3;
      font-size: 0.9rem;
      font-family: 'Roboto Mono', monospace;
    }
  }

  .terminal-content {
    padding: 1.5rem;
    font-family: 'Roboto Mono', monospace;
    color: var(--terminal-green);
    font-size: 1rem;
    line-height: 1.6;
    min-height: 200px;

    pre {
      margin: 0.5rem 0;
    }
  }
}

.section-title {
  font-size: 2rem;
  color: var(--primary);
  margin: 3rem 0 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 3px solid var(--secondary);
  display: inline-block;
}

.parameters-section {
  margin-bottom: 3rem;

  .search-box {
    display: flex;
    margin-bottom: 2rem;
    max-width: 600px;

    .search-input {
      flex: 1;
      padding: 0.8rem 1.2rem;
      border: 2px solid var(--secondary);
      border-radius: var(--border-radius) 0 0 var(--border-radius);
      font-size: 1rem;
      outline: none;
      transition: var(--transition);

      &:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.2);
      }
    }

    .search-btn {
      padding: 0 1.5rem;
      background: var(--secondary);
      color: white;
      border: none;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      cursor: pointer;
      transition: var(--transition);

      &:hover {
        background: #2980b9;
      }

      .icon {
        font-size: 1.2rem;
      }
    }
  }

  .parameters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .parameter-card {
    background: white;
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    border-top: 4px solid var(--secondary);
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    .param-header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      .option {
        font-family: 'Roboto Mono', monospace;
        font-weight: 700;
        font-size: 1.3rem;
        color: var(--dark);
        margin-right: 0.8rem;
      }

      .shortcut {
        font-family: 'Roboto Mono', monospace;
        background: #e3f2fd;
        color: var(--secondary);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.9rem;
      }
    }

    .description {
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
      line-height: 1.6;
    }

    .examples {
      background: #f8fafc;
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 1rem;
      font-family: 'Roboto Mono', monospace;
      font-size: 0.9rem;
      line-height: 1.6;

      .example-title {
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: var(--gray);
      }

      pre {
        background: #2c3e50;
        color: #f8f8f2;
        padding: 0.8rem;
        border-radius: 4px;
        margin: 0.5rem 0;
        overflow-x: auto;
      }
    }

    .param-footer {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: var(--gray);

      .usage-type {
        background: #e3f2fd;
        color: var(--secondary);
        padding: 0.2rem 0.8rem;
        border-radius: 20px;
        font-weight: 500;

        &.HTTP {
          background: #e3f2fd;
          color: #3498db;
        }

        &.Output {
          background: #e8f5e9;
          color: #2ecc71;
        }

        &.Auth {
          background: #fff8e1;
          color: #f39c12;
        }

        &.Debug {
          background: #fbe9e7;
          color: #e74c3c;
        }

        &.SSL {
          background: #f3e5f5;
          color: #9b59b6;
        }

        &.Transfer {
          background: #e0f7fa;
          color: #1abc9c;
        }

        &.Network {
          background: #e8eaf6;
          color: #5c6bc0;
        }
      }
    }
  }
}

.use-cases {
  margin-bottom: 3rem;

  .tabs {
    display: flex;
    border-bottom: 1px solid #ddd;
    margin-bottom: 1.5rem;

    button {
      padding: 0.8rem 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      color: var(--gray);
      position: relative;
      transition: var(--transition);

      &.active {
        color: var(--primary);
        font-weight: 600;

        &::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--accent);
        }
      }

      &:hover {
        color: var(--secondary);
      }
    }
  }

  .tab-content {
    background: white;
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--box-shadow);

    .case-content {
      h3 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: var(--primary);
      }

      .case-description {
        margin-bottom: 2rem;
        font-size: 1.1rem;
        line-height: 1.8;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #eee;
      }

      .case-examples {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        .example {
          background: #f8fafc;
          border-radius: var(--border-radius);
          padding: 1.5rem;
          transition: var(--transition);

          &:hover {
            transform: translateY(-3px);
            box-shadow: var(--box-shadow);
          }

          h4 {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            color: var(--dark);
          }

          pre {
            background: var(--terminal-bg);
            color: var(--terminal-green);
            padding: 1rem;
            border-radius: 4px;
            font-family: 'Roboto Mono', monospace;
            font-size: 0.9rem;
            overflow-x: auto;
          }
        }
      }
    }
  }
}

.comparison-section {
  margin-bottom: 3rem;

  .comparison-table {
    background: white;
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--box-shadow);
    margin-bottom: 2rem;
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
      }

      th {
        background: #f8fafc;
        font-weight: 600;
        color: var(--dark);
      }

      tr:last-child td {
        border-bottom: none;
      }

      tr:hover td {
        background: #f8fafc;
      }
    }
  }

  .conclusion {
    background: #e8f5e9;
    border-radius: var(--border-radius);
    padding: 2rem;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: var(--primary);
    }

    ul {
      list-style: none;

      li {
        padding: 0.5rem 0;
        position: relative;
        padding-left: 1.8rem;

        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: bold;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem 0;
  margin-top: 3rem;
  color: var(--gray);
  font-size: 0.9rem;
  border-top: 1px solid #eee;

  p {
    margin-bottom: 0.5rem;

    a {
      color: var(--secondary);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 900px) {
  .intro-card {
    flex-direction: column;
  }

  .parameters-grid {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 600px) {
  .header {
    .title {
      font-size: 2.2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }

    .curl-icon {
      font-size: 3rem;
      top: -10px;
    }
  }

  .section-title {
    font-size: 1.6rem;
  }

  .use-cases .tabs {
    flex-wrap: wrap;

    button {
      flex: 1;
      min-width: 100px;
      text-align: center;
    }
  }
}
</style>
