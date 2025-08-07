<template>
  <div class="os-module-container">
    <header class="header">
      <h1>Node.js OS 模块基本介绍</h1>
      <p class="subtitle">操作系统信息与资源监控的基本指南</p>
    </header>

    <div class="content-wrapper">
      <div class="intro-section">
        <div class="intro-card">
          <div class="definition">
            <div class="os-icon">💻</div>
            <div>
              <h2>什么是 OS 模块？</h2>
              <p>Node.js 的 <code>os</code> 模块提供了与操作系统相关的实用方法和属性。通过该模块，开发者可以获取系统信息、监控资源使用情况以及执行与操作系统相关的操作。</p>
              <div class="feature">
                <span class="feature-tag">系统信息查询</span>
                <span class="feature-tag">资源监控</span>
                <span class="feature-tag">网络接口</span>
                <span class="feature-tag">用户信息</span>
              </div>
            </div>
          </div>

          <div class="installation">
            <h3>引入与使用</h3>
            <pre class="code-block">// 引入 OS 模块
const os = require('os');

// 获取系统信息示例
console.log(`操作系统平台: ${os.platform()}`);
console.log(`系统内存总量: ${os.totalmem() / 1024 / 1024} MB`);
console.log(`系统运行时间: ${os.uptime() / 60} 分钟`);</pre>
          </div>
        </div>
      </div>

      <div class="core-apis-section">
        <h2 class="section-title">核心 API 接口</h2>

        <div class="api-categories">
          <div class="category">
            <h3 class="category-title">系统信息</h3>
            <div class="api-grid">
              <div class="api-card">
                <div class="api-header">
                  <code>os.arch()</code>
                </div>
                <div class="api-content">
                  <p>返回操作系统的 CPU 架构</p>
                  <div class="return-type">返回值: <span>string</span></div>
                  <pre class="code-block">console.log(os.arch());
// 'x64' 或 'arm' 等</pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">
                  <code>os.platform()</code>
                </div>
                <div class="api-content">
                  <p>返回操作系统平台</p>
                  <div class="return-type">返回值: <span>string</span></div>
                  <pre class="code-block">console.log(os.platform());
// 'darwin'、'win32'、'linux'</pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">
                  <code>os.type()</code>
                </div>
                <div class="api-content">
                  <p>返回操作系统名称</p>
                  <div class="return-type">返回值: <span>string</span></div>
                  <pre class="code-block">console.log(os.type());
// 'Darwin'、'Windows_NT'、'Linux'</pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">
                  <code>os.release()</code>
                </div>
                <div class="api-content">
                  <p>返回操作系统版本</p>
                  <div class="return-type">返回值: <span>string</span></div>
                  <pre class="code-block">console.log(os.release());
// '10.0.19044' (Windows) 或 '21.6.0' (macOS)</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="category">
            <h3 class="category-title">资源监控</h3>
            <div class="api-grid">
              <div class="api-card">
                <div class="api-header">
                  <code>os.cpus()</code>
                </div>
                <div class="api-content">
                  <p>返回 CPU 核心信息数组</p>
                  <div class="return-type">返回值: <span>Object[]</span></div>
                  <pre class="code-block">os.cpus().forEach((cpu, index) => {
  console.log(`核心 ${index}: ${cpu.model}`);
  console.log(`速度: ${cpu.speed}MHz`);
});</pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">
                  <code>os.totalmem()</code>
                </div>
                <div class="api-content">
                  <p>返回系统内存总量（字节）</p>
                  <div class="return-type">返回值: <span>integer</span></div>
                  <pre class="code-block">const totalGB = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
console.log(`总内存: ${totalGB} GB`);</pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">
                  <code>os.freemem()</code>
                </div>
                <div class="api-content">
                  <p>返回空闲内存量（字节）</p>
                  <div class="return-type">返回值: <span>integer</span></div>
                  <pre class="code-block">const freeGB = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
console.log(`空闲内存: ${freeGB} GB`);</pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">
                  <code>os.loadavg()</code>
                </div>
                <div class="api-content">
                  <p>返回系统负载平均值（1、5、15分钟）</p>
                  <div class="return-type">返回值: <span>number[]</span></div>
                  <pre class="code-block">const [avg1, avg5, avg15] = os.loadavg();
console.log(`1分钟负载: ${avg1.toFixed(2)}`);
console.log(`5分钟负载: ${avg5.toFixed(2)}`);
console.log(`15分钟负载: ${avg15.toFixed(2)}`);</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="category">
            <h3 class="category-title">系统操作</h3>
            <div class="api-grid">
              <div class="api-card">
                <div class="api-header">
                  <code>os.homedir()</code>
                </div>
                <div class="api-content">
                  <p>返回当前用户的主目录路径</p>
                  <div class="return-type">返回值: <span>string</span></div>
                  <pre class="code-block">console.log(`用户主目录: ${os.homedir()}`);
// '/Users/username' 或 'C:\\Users\\username'</pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">
                  <code>os.tmpdir()</code>
                </div>
                <div class="api-content">
                  <p>返回操作系统的默认临时文件目录</p>
                  <div class="return-type">返回值: <span>string</span></div>
                  <pre class="code-block">console.log(`临时目录: ${os.tmpdir()}`);
// '/var/folders/...' 或 'C:\\Users\\...\\AppData\\Local\\Temp'</pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">
                  <code>os.hostname()</code>
                </div>
                <div class="api-content">
                  <p>返回操作系统的主机名</p>
                  <div class="return-type">返回值: <span>string</span></div>
                  <pre class="code-block">console.log(`主机名: ${os.hostname()}`);
// 'My-Computer.local'</pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">
                  <code>os.uptime()</code>
                </div>
                <div class="api-content">
                  <p>返回系统正常运行时间（秒）</p>
                  <div class="return-type">返回值: <span>integer</span></div>
                  <pre class="code-block">const uptimeDays = (os.uptime() / 60 / 60 / 24).toFixed(1);
console.log(`系统已运行: ${uptimeDays} 天`);</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="category">
            <h3 class="category-title">用户与网络</h3>
            <div class="api-grid">
              <div class="api-card">
                <div class="api-header">
                  <code>os.userInfo([options])</code>
                </div>
                <div class="api-content">
                  <p>返回当前用户的信息</p>
                  <div class="return-type">返回值: <span>Object</span></div>
                  <pre class="code-block">const userInfo = os.userInfo();
console.log(`用户名: ${userInfo.username}`);
console.log(`用户ID: ${userInfo.uid}`);
console.log(`主目录: ${userInfo.homedir}`);

// 包含 shell 信息
const detailedInfo = os.userInfo({ encoding: 'utf8' });
console.log(`Shell: ${detailedInfo.shell}`);</pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">
                  <code>os.networkInterfaces()</code>
                </div>
                <div class="api-content">
                  <p>返回网络接口信息</p>
                  <div class="return-type">返回值: <span>Object</span></div>
                  <pre class="code-block">const interfaces = os.networkInterfaces();

Object.keys(interfaces).forEach(iface => {
  console.log(`接口: ${iface}`);
  interfaces[iface].forEach(addr => {
    if (addr.family === 'IPv4' && !addr.internal) {
      console.log(`  IPv4 地址: ${addr.address}`);
    }
  });
});</pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">
                  <code>os.constants</code>
                </div>
                <div class="api-content">
                  <p>包含操作系统特定的常量</p>
                  <div class="return-type">返回值: <span>Object</span></div>
                  <pre class="code-block">console.log(os.constants);
// 包含错误码、信号常量等

// 常用常量
console.log('错误常量:', os.constants.errno);
console.log('信号常量:', os.constants.signals);</pre>
                </div>
              </div>

              <div class="api-card">
                <div class="api-header">
                  <code>os.endianness()</code>
                </div>
                <div class="api-content">
                  <p>返回 CPU 的字节序</p>
                  <div class="return-type">返回值: <span>string</span></div>
                  <pre class="code-block">console.log(`CPU 字节序: ${os.endianness()}`);
// 'BE' (大端序) 或 'LE' (小端序)</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="use-cases-section">
        <h2 class="section-title">使用场景</h2>

        <div class="case-cards">
          <div class="case-card">
            <div class="case-icon">📊</div>
            <h3>系统监控仪表盘</h3>
            <p>使用 <code>os.cpus()</code>、<code>os.freemem()</code> 和 <code>os.loadavg()</code> 创建实时系统监控仪表盘，显示
              CPU、内存使用率和系统负载。</p>
          </div>

          <div class="case-card">
            <div class="case-icon">📁</div>
            <h3>文件路径处理</h3>
            <p>使用 <code>os.homedir()</code> 和 <code>os.tmpdir()</code> 获取标准路径，确保应用在不同操作系统上正确处理文件路径。</p>
          </div>

          <div class="case-card">
            <div class="case-icon">🌐</div>
            <h3>网络工具开发</h3>
            <p>使用 <code>os.networkInterfaces()</code> 获取本机 IP 地址，用于网络扫描工具或服务发现功能。</p>
          </div>

          <div class="case-card">
            <div class="case-icon">⚙️</div>
            <h3>跨平台应用</h3>
            <p>使用 <code>os.platform()</code> 和 <code>os.type()</code> 检测操作系统，实现跨平台兼容的逻辑和用户界面。</p>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2 class="section-title">最佳实践</h2>
        <div class="practices-grid">
          <div class="practice">
            <div class="number">1</div>
            <p>监控系统资源时缓存结果，避免频繁调用高开销方法</p>
          </div>
          <div class="practice">
            <div class="number">2</div>
            <p>使用 <code>os.homedir()</code> 而非硬编码路径，确保跨平台兼容</p>
          </div>
          <div class="practice">
            <div class="number">3</div>
            <p>处理网络接口时过滤内部地址和 IPv6</p>
          </div>
          <div class="practice">
            <div class="number">4</div>
            <p>使用 <code>os.constants</code> 处理操作系统特定错误码</p>
          </div>
          <div class="practice">
            <div class="number">5</div>
            <p>转换字节值为人类可读格式（如 MB、GB）</p>
          </div>
          <div class="practice">
            <div class="number">6</div>
            <p>避免在生产环境中暴露敏感系统信息</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>OS 模块是 Node.js 中用于系统信息查询和资源监控的强大工具，合理使用可以创建更智能、更高效的应用。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 模拟系统信息数据
const systemInfo = ref({
  arch: 'x64',
  platform: 'darwin',
  type: 'Darwin',
  release: '21.6.0',
  totalmem: 17179869184, // 16GB
  freemem: 8589934592,   // 8GB
  uptime: 86400,         // 1天
  loadavg: [1.2, 0.8, 0.5],
  homedir: '/Users/username',
  hostname: 'My-Mac.local'
});
</script>

<style lang="less" scoped>


.os-module-container {
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
    margin-bottom: 3rem;

    .intro-card {
      background: white;
      border-radius: 10px;
      padding: 1.8rem;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

      .definition {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 2rem;

        .os-icon {
          font-size: 3rem;
          width: 80px;
          height: 80px;
          background: #e3f2fd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #3498db;
        }

        h2 {
          margin-top: 0;
          color: #2c3e50;
        }

        p {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 1rem;

          code {
            background: #e3f2fd;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
          }
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

  .core-apis-section {
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

    .api-categories {
      .category {
        margin-bottom: 2.5rem;

        .category-title {
          font-size: 1.5rem;
          color: #2c3e50;
          padding-left: 0.5rem;
          border-left: 4px solid #3498db;
          margin-top: 0;
          margin-bottom: 1.2rem;
        }
      }

      .api-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
      }

      .api-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease;
        border-top: 3px solid #3498db;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .api-header {
          background: #f8f9fa;
          padding: 1rem;
          border-bottom: 1px solid #eaeaea;
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.1rem;
          font-weight: 500;
          color: #2c3e50;

          code {
            background: none;
            padding: 0;
            color: #e74c3c;
          }
        }

        .api-content {
          padding: 1.2rem;

          p {
            font-size: 1.05rem;
            line-height: 1.6;
            color: #555;
            margin-top: 0;
            margin-bottom: 0.8rem;
          }

          .return-type {
            font-size: 0.95rem;
            color: #7f8c8d;
            margin-bottom: 0.8rem;
            font-style: italic;

            span {
              color: #e74c3c;
              font-weight: 500;
            }
          }

          .code-block {
            background: #f8f9fa;
            border: 1px solid #eaeaea;
            border-radius: 6px;
            padding: 0.8rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            overflow-x: auto;
          }
        }
      }
    }
  }

  .use-cases-section {
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

    .case-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;

      .case-card {
        background: white;
        border-radius: 10px;
        padding: 1.8rem;
        text-align: center;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease;
        border-top: 3px solid #3498db;

        &:hover {
          transform: translateY(-5px);
        }

        .case-icon {
          font-size: 2.5rem;
          margin-bottom: 1.2rem;
          color: #3498db;
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
          margin-bottom: 0;
        }
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
        align-items: flex-start;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

        .number {
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
          margin-right: 1.2rem;
          flex-shrink: 0;
        }

        p {
          margin: 0;
          font-size: 1.05rem;
          line-height: 1.5;

          code {
            background: #e3f2fd;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
          }
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
  .os-module-container {
    padding: 1rem;

    .header h1 {
      font-size: 2rem;
    }
  }
}
</style>
