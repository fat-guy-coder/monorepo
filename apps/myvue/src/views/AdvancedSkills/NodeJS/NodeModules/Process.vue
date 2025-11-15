<template>
  <div class="process-container">
    <header class="header">
      <h1>Node.js Process模块基础介绍</h1>
      <p>深入理解Node.js核心环境接口</p>
      <div class="badges">
        <span class="badge badge-node">Node.js</span>
        <span class="badge badge-ts">TypeScript</span>
        <span class="badge badge-setup">Setup语法</span>
      </div>
    </header>

    <div class="card-container">
      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-info-circle"></i>
          <span>Process模块概述</span>
        </div>
        <div class="card-body">
          <h3>什么是Process模块？</h3>
          <p>process 是Node.js中的一个全局对象，提供了与当前Node.js进程相关的信息和控制能力。它无需require导入，可直接使用。</p>

          <h3>核心作用</h3>
          <ul>
            <li>获取进程信息（环境变量、命令行参数）</li>
            <li>控制进程行为（退出、内存使用）</li>
            <li>与操作系统交互（标准输入/输出）</li>
            <li>处理进程事件（退出、未捕获异常）</li>
            <li>性能监控（内存使用、CPU时间）</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-cogs"></i>
          <span>关键API概览</span>
        </div>
        <div class="card-body">
          <h3>Process核心API</h3>
          <div class="api-grid">
            <div class="api-item">
              <div class="api-name">process.argv</div>
              <div class="api-desc">命令行参数数组</div>
            </div>
            <div class="api-item">
              <div class="api-name">process.env</div>
              <div class="api-desc">环境变量对象</div>
            </div>
            <div class="api-item">
              <div class="api-name">process.cwd()</div>
              <div class="api-desc">当前工作目录</div>
            </div>
            <div class="api-item">
              <div class="api-name">process.exit()</div>
              <div class="api-desc">退出当前进程</div>
            </div>
            <div class="api-item">
              <div class="api-name">process.memoryUsage()</div>
              <div class="api-desc">内存使用情况</div>
            </div>
            <div class="api-item">
              <div class="api-name">process.on()</div>
              <div class="api-desc">监听进程事件</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-terminal"></i>
          <span>环境变量与参数</span>
        </div>
        <div class="card-body">
          <h3>process.env - 环境变量</h3>
          <p>访问和设置环境变量，常用于配置管理：</p>

          <div class="code-block">
            <span class="code-comment">// 获取环境变量</span><br>
            <span class="code-keyword">const</span> env = process.<span class="code-property">env</span>;<br>
            <span class="code-keyword">const</span> nodeEnv = env.<span class="code-property">NODE_ENV</span>; <span
              class="code-comment">// 'development' 或 'production'</span><br><br>

            <span class="code-comment">// 设置环境变量（仅对当前进程有效）</span><br>
            process.<span class="code-property">env</span>.<span class="code-property">API_KEY</span> = <span
              class="code-string">'your-api-key-here'</span>;
          </div>

          <h3>process.argv - 命令行参数</h3>
          <p>获取启动Node.js进程时传递的命令行参数：</p>
          <div class="code-block">
            <span class="code-comment">// 运行: node app.js arg1 arg2 --name=John</span><br>
            console.<span class="code-function">log</span>(process.<span class="code-property">argv</span>);<br>
            <span class="code-comment">// 输出: ['/usr/bin/node', '/path/to/app.js', 'arg1', 'arg2', '--name=John']</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <i class="icon fas fa-leaf"></i>
          <span>process.env 基本介绍</span>
        </div>
        <div class="card-body">
          <h3>process.env - 环境变量对象</h3>
          <p>
            <strong>process.env</strong> 是一个包含用户环境信息的对象。你可以通过它读取或设置环境变量，常用于配置不同的运行环境（如开发、测试、生产）。
          </p>
          <div class="env-table">
            <table>
              <thead>
                <tr>
                  <th>常见变量</th>
                  <th>说明</th>
                  <th>示例值</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>NODE_ENV</td>
                  <td>当前Node.js运行环境</td>
                  <td>development / production / test</td>
                </tr>
                <tr>
                  <td>PATH</td>
                  <td>系统可执行文件查找路径</td>
                  <td>/usr/local/bin:/usr/bin:/bin</td>
                </tr>
                <tr>
                  <td>HOME / USERPROFILE</td>
                  <td>当前用户主目录（Linux/Windows）</td>
                  <td>/home/user 或 C:\Users\user</td>
                </tr>
                <tr>
                  <td>PORT</td>
                  <td>服务监听端口（常自定义）</td>
                  <td>3000</td>
                </tr>
                <tr>
                  <td>API_KEY</td>
                  <td>自定义API密钥（常自定义）</td>
                  <td>your-api-key-here</td>
                </tr>
                <tr>
                  <td>TEMP / TMP</td>
                  <td>临时文件目录</td>
                  <td>/tmp 或 C:\Temp</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="code-block" style="margin-top: 16px;">
            <span class="code-comment">// 读取环境变量</span><br>
            <span class="code-keyword">console</span>.<span class="code-function">log</span>(process.<span
              class="code-property">env</span>.<span class="code-property">NODE_ENV</span>);<br>
            <span class="code-comment">// 设置环境变量（仅当前进程有效）</span><br>
            process.<span class="code-property">env</span>.<span class="code-property">PORT</span> = <span
              class="code-string">'8080'</span>;
          </div>
          <ul class="env-tips" style="margin-top: 12px;">
            <li>环境变量区分大小写，且通常为字符串类型。</li>
            <li>在生产环境中，敏感信息（如API_KEY）建议通过环境变量传递，避免硬编码。</li>
            <li>可通过 <code>cross-env</code> 等工具在不同平台设置环境变量。</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="config-section">
      <div class="config-header">
        <i class="icon fas fa-microchip"></i>
        <span>进程控制与监控</span>
      </div>

      <div class="api-detail-grid">
        <div class="api-detail-card">
          <h3>process.cwd()</h3>
          <p>返回Node.js进程的当前工作目录</p>
          <div class="code-block">
            <span class="code-keyword">const</span> currentDir = process.<span class="code-function">cwd</span>();<br>
            console.<span class="code-function">log</span>(<span class="code-string">`当前目录: ${currentDir}`</span>);<br>
            <span class="code-comment">// 输出: /Users/username/projects/my-app</span>
          </div>
        </div>

        <div class="api-detail-card">
          <h3>process.exit()</h3>
          <p>以指定的退出码同步终止进程</p>
          <div class="code-block">
            <span class="code-comment">// 成功退出（默认状态码0）</span><br>
            process.<span class="code-function">exit</span>();<br><br>

            <span class="code-comment">// 自定义退出码</span><br>
            process.<span class="code-function">exit</span>(1); <span class="code-comment">// 非零表示错误退出</span>
          </div>
        </div>

        <div class="api-detail-card">
          <h3>process.memoryUsage()</h3>
          <p>返回描述Node.js进程内存使用情况的对象</p>
          <div class="code-block">
            <span class="code-keyword">const</span> memory = process.<span
              class="code-function">memoryUsage</span>();<br>
            console.<span class="code-function">log</span>(memory);<br>
            <span class="code-comment">/* 输出: {<br>
              &nbsp;&nbsp;rss: 12345678, // 驻留集大小<br>
              &nbsp;&nbsp;heapTotal: 4567890, // V8堆总内存<br>
              &nbsp;&nbsp;heapUsed: 3456789, // V8已用堆内存<br>
              &nbsp;&nbsp;external: 876543, // C++对象内存<br>
              &nbsp;&nbsp;arrayBuffers: 12345 // ArrayBuffer内存<br>
              } */</span>
          </div>
        </div>

        <div class="api-detail-card">
          <h3>process.uptime()</h3>
          <p>返回Node.js进程已运行的秒数</p>
          <div class="code-block">
            <span class="code-keyword">const</span> uptime = process.<span class="code-function">uptime</span>();<br>
            console.<span class="code-function">log</span>(<span class="code-string">`进程已运行:
              ${uptime.toFixed(2)}秒`</span>);
          </div>
        </div>
      </div>
    </div>

    <div class="config-section">
      <div class="config-header">
        <i class="icon fas fa-bell"></i>
        <span>进程事件处理</span>
      </div>

      <div class="api-detail-grid">
        <div class="api-detail-card">
          <h3>exit事件</h3>
          <p>当Node.js进程即将退出时触发</p>
          <div class="code-block">
            process.<span class="code-function">on</span>(<span class="code-string">'exit'</span>, (code) => {<br>
            &nbsp;&nbsp;console.<span class="code-function">log</span>(<span class="code-string">`进程即将退出，退出码:
              ${code}`</span>);<br>
            &nbsp;&nbsp;<span class="code-comment">// 注意：此处只能执行同步操作</span><br>
            });
          </div>
        </div>

        <div class="api-detail-card">
          <h3>uncaughtException</h3>
          <p>当未捕获的JavaScript异常冒泡回事件循环时触发</p>
          <div class="code-block">
            process.<span class="code-function">on</span>(<span class="code-string">'uncaughtException'</span>, (err) =>
            {<br>
            &nbsp;&nbsp;console.<span class="code-function">error</span>(<span class="code-string">`未捕获的异常:
              ${err.message}`</span>);<br>
            &nbsp;&nbsp;<span class="code-comment">// 应进行日志记录并优雅关闭</span><br>
            &nbsp;&nbsp;process.<span class="code-function">exit</span>(1); <span class="code-comment">//
              强制退出</span><br>
            });
          </div>
        </div>

        <div class="api-detail-card">
          <h3>warning事件</h3>
          <p>当进程触发警告时发出</p>
          <div class="code-block">
            process.<span class="code-function">on</span>(<span class="code-string">'warning'</span>, (warning) => {<br>
            &nbsp;&nbsp;console.<span class="code-function">warn</span>(<span class="code-string">`警告名称:
              ${warning.name}`</span>);<br>
            &nbsp;&nbsp;console.<span class="code-function">warn</span>(<span class="code-string">`警告消息:
              ${warning.message}`</span>);<br>
            &nbsp;&nbsp;console.<span class="code-function">warn</span>(<span class="code-string">`堆栈跟踪:
              ${warning.stack}`</span>);<br>
            });
          </div>
        </div>

        <div class="api-detail-card">
          <h3>SIGINT信号</h3>
          <p>当用户按下Ctrl+C时触发</p>
          <div class="code-block">
            process.<span class="code-function">on</span>(<span class="code-string">'SIGINT'</span>, () => {<br>
            &nbsp;&nbsp;console.<span class="code-function">log</span>(<span
              class="code-string">'收到SIGINT信号。优雅关闭中...'</span>);<br>
            &nbsp;&nbsp;server.<span class="code-function">close</span>(() => {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;process.<span class="code-function">exit</span>(0);<br>
            &nbsp;&nbsp;});<br>
            });
          </div>
        </div>
      </div>
    </div>

    <div class="config-section">
      <div class="config-header">
        <i class="icon fas fa-lightbulb"></i>
        <span>最佳实践</span>
      </div>

      <div class="practice-grid">
        <div class="practice-item">
          <h3>环境配置</h3>
          <ul>
            <li>使用dotenv管理开发环境变量</li>
            <li>敏感信息存储在环境变量中而非代码中</li>
            <li>为不同环境创建.env文件（.env.development, .env.production）</li>
          </ul>
        </div>

        <div class="practice-item">
          <h3>错误处理</h3>
          <ul>
            <li>始终处理uncaughtException事件</li>
            <li>使用domain或async_hooks处理异步错误</li>
            <li>实现优雅关闭逻辑</li>
          </ul>
        </div>

        <div class="practice-item">
          <h3>性能监控</h3>
          <ul>
            <li>定期监控memoryUsage防止内存泄漏</li>
            <li>使用process.hrtime()进行高精度时间测量</li>
            <li>集成APM工具监控进程性能</li>
          </ul>
        </div>

        <div class="practice-item">
          <h3>安全实践</h3>
          <ul>
            <li>避免在代码中硬编码敏感信息</li>
            <li>使用child_process模块安全执行外部命令</li>
            <li>限制进程权限（使用非root用户运行）</li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p> Node.js Process模块基础介绍 | 深入理解Node.js核心环境接口</p>
      <p>本页面使用Vue3、TypeScript、Setup语法、LESS和Scoped样式构建</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 此组件为静态展示组件，无需响应式数据
// 这里仅为了展示setup语法和TypeScript的使用
</script>

<style lang="less" scoped>


.process-container {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #2c3e50;
  min-height: 100vh;
  padding: 20px;

  .header {
    text-align: center;
    padding: 30px 0;
    margin-bottom: 30px;
    border-bottom: 2px solid #5c7cfa;

    h1 {
      font-size: 2.5rem;
      color: #4263eb;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      color: #495057;
      max-width: 800px;
      margin: 0 auto;
    }

    .badges {
      margin-top: 15px;
    }

    .badge {
      display: inline-block;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: bold;
      margin: 0 8px;
    }

    .badge-node {
      background: #68a063;
      color: white;
    }

    .badge-ts {
      background: #3178c6;
      color: white;
    }

    .badge-setup {
      background: #42b983;
      color: white;
    }
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
  }

  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    }
  }

  .card-header {
    background: #5c7cfa;
    color: white;
    padding: 18px 25px;
    font-size: 1.4rem;
    display: flex;
    align-items: center;

    .icon {
      margin-right: 12px;
      font-size: 1.6rem;
    }
  }

  .card-body {
    padding: 25px;
    line-height: 1.7;

    h3 {
      color: #4263eb;
      margin-bottom: 15px;
      font-size: 1.3rem;
      padding-bottom: 8px;
      border-bottom: 1px solid #e9ecef;
    }

    p {
      margin-bottom: 15px;
      color: #495057;
    }

    ul {
      padding-left: 25px;
      margin: 15px 0;
    }

    li {
      margin-bottom: 10px;
      position: relative;

      &:before {
        content: "•";
        color: #5c7cfa;
        font-weight: bold;
        position: absolute;
        left: -15px;
      }
    }

    .api-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }

    .api-item {
      background: #f1f3f9;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
      transition: all 0.3s ease;

      &:hover {
        background: #e6ebff;
        transform: translateY(-3px);
      }
    }

    .api-name {
      font-weight: bold;
      color: #4263eb;
      margin-bottom: 5px;
      font-family: 'Courier New', monospace;
    }

    .api-desc {
      font-size: 0.9rem;
      color: #495057;
    }
  }

  .code-block {
    background: #2c3e50;
    color: #e9ecef;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    overflow-x: auto;
  }

  .code-comment {
    color: #adb5bd;
    font-style: italic;
  }

  .code-keyword {
    color: #f783ac;
  }

  .code-string {
    color: #69db7c;
  }

  .code-property {
    color: #74c0fc;
  }

  .code-function {
    color: #ffd43b;
  }

  .config-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    padding: 30px;
    margin-bottom: 40px;
  }

  .config-header {
    font-size: 1.8rem;
    color: #4263eb;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e9ecef;
    display: flex;
    align-items: center;

    .icon {
      margin-right: 15px;
    }
  }

  .api-detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  .api-detail-card {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    border-left: 4px solid #5c7cfa;

    h3 {
      color: #4263eb;
      margin-bottom: 12px;
      font-size: 1.3rem;
    }

    p {
      color: #495057;
      margin-bottom: 15px;
      font-size: 0.95rem;
    }
  }

  .practice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .practice-item {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    border-top: 3px solid #5c7cfa;

    h3 {
      color: #4263eb;
      margin-bottom: 15px;
      font-size: 1.2rem;
    }

    ul {
      padding-left: 20px;
    }

    li {
      margin-bottom: 10px;
      color: #495057;
      font-size: 0.95rem;
    }
  }

  .footer {
    text-align: center;
    padding: 30px 0;
    color: #495057;
    font-size: 0.9rem;
    border-top: 1px solid #e9ecef;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .card-container {
      grid-template-columns: 1fr;
    }

    .header h1 {
      font-size: 2rem;
    }

    .api-detail-grid,
    .practice-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
