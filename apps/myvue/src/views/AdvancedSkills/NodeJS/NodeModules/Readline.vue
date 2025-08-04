<template>
  <div class="readline-container">
    <div class="header-section">
      <div class="header-content">
        <h1>Node.js readline 模块</h1>
        <p class="subtitle">交互式命令行输入处理解决方案</p>
        <div class="module-stats">
          <div class="stat">
            <div class="stat-icon">📝</div>
            <div class="stat-text">
              <span class="stat-value">逐行读取</span>
              <span class="stat-label">高效处理大型文件</span>
            </div>
          </div>
          <div class="stat">
            <div class="stat-icon">💬</div>
            <div class="stat-text">
              <span class="stat-value">交互式CLI</span>
              <span class="stat-label">创建用户友好的命令行工具</span>
            </div>
          </div>
          <div class="stat">
            <div class="stat-icon">⚡</div>
            <div class="stat-text">
              <span class="stat-value">流式处理</span>
              <span class="stat-label">基于可读/可写流实现</span>
            </div>
          </div>
        </div>
      </div>
      <div class="terminal-demo">
        <div class="terminal-header">
          <div class="terminal-controls">
            <span class="control close"></span>
            <span class="control minimize"></span>
            <span class="control maximize"></span>
          </div>
          <div class="terminal-title">node cli-app.js</div>
        </div>
        <div class="terminal-body">
          <div class="terminal-line">欢迎使用我的CLI工具</div>
          <div class="terminal-line">
            请输入您的用户名: <span class="input-highlight">john_doe</span>
          </div>
          <div class="terminal-line">请输入您的密码: ********</div>
          <div class="terminal-line">登录成功！</div>
          <div class="terminal-line">请选择操作:</div>
          <div class="terminal-line">1. 查看个人资料</div>
          <div class="terminal-line">2. 修改设置</div>
          <div class="terminal-line">3. 退出</div>
          <div class="terminal-line">> <span class="cursor">_</span></div>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <!-- 模块介绍 -->
      <div class="section intro-section">
        <div class="section-header">
          <div class="section-icon">📚</div>
          <h2>模块介绍</h2>
        </div>
        <div class="section-content">
          <div class="definition-card">
            <h3>什么是readline模块？</h3>
            <p>
              readline是Node.js内置模块，提供用于从可读流（如process.stdin）逐行读取数据的接口。它主要用于：
            </p>
            <ul>
              <li>创建交互式命令行应用程序</li>
              <li>逐行处理输入流（如文件或网络数据）</li>
              <li>实现命令行界面(CLI)的用户交互</li>
            </ul>

            <div class="code-block">
              <pre><code>const readline = require('readline');</code></pre>
            </div>
          </div>

          <div class="comparison">
            <h3>为什么使用readline而不是直接使用流？</h3>
            <div class="comparison-grid">
              <div class="comparison-card">
                <div class="comparison-title">普通流处理</div>
                <ul>
                  <li>需要手动处理换行符</li>
                  <li>缓冲区管理复杂</li>
                  <li>难以实现交互式提示</li>
                  <li>缺少历史记录功能</li>
                </ul>
              </div>
              <div class="comparison-card highlight">
                <div class="comparison-title">readline模块</div>
                <ul>
                  <li>自动处理换行符分割</li>
                  <li>提供逐行读取API</li>
                  <li>内置交互式提问功能</li>
                  <li>支持历史记录管理</li>
                  <li>自动补全功能支持</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心API -->
      <div class="section api-section">
        <div class="section-header">
          <div class="section-icon">🔧</div>
          <h2>核心API详解</h2>
        </div>
        <div class="section-content">
          <!-- createInterface -->
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon">🚀</div>
              <h3>createInterface(options)</h3>
              <span class="api-type">方法</span>
            </div>
            <div class="api-description">
              <p>创建readline.Interface实例，用于处理输入输出流</p>
            </div>
            <div class="api-params">
              <h4>参数选项：</h4>
              <table>
                <thead>
                  <tr>
                    <th>属性</th>
                    <th>类型</th>
                    <th>必填</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>input</td>
                    <td>stream.Readable</td>
                    <td>是</td>
                    <td>要监听的可读流，如process.stdin</td>
                  </tr>
                  <tr>
                    <td>output</td>
                    <td>stream.Writable</td>
                    <td>是</td>
                    <td>要写入提示的可写流，如process.stdout</td>
                  </tr>
                  <tr>
                    <td>completer</td>
                    <td>Function</td>
                    <td>否</td>
                    <td>用于Tab自动补全的函数</td>
                  </tr>
                  <tr>
                    <td>prompt</td>
                    <td>string</td>
                    <td>否</td>
                    <td>要使用的提示字符串，默认'> '</td>
                  </tr>
                  <tr>
                    <td>history</td>
                    <td>string[]</td>
                    <td>否</td>
                    <td>初始命令行历史记录</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="api-example">
              <h4>示例代码：</h4>
              <div class="code-block">
                <pre><code>const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
  history: ['command1', 'command2']
});</code></pre>
              </div>
            </div>
          </div>

          <!-- question -->
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon">❓</div>
              <h3>question(query, callback)</h3>
              <span class="api-type">方法</span>
            </div>
            <div class="api-description">
              <p>向用户显示查询提示并等待输入，输入完成后调用回调函数</p>
            </div>
            <div class="api-params">
              <h4>参数：</h4>
              <table>
                <thead>
                  <tr>
                    <th>参数</th>
                    <th>类型</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>query</td>
                    <td>string</td>
                    <td>显示给用户的提示信息</td>
                  </tr>
                  <tr>
                    <td>callback</td>
                    <td>Function</td>
                    <td>用户输入后的回调函数，接收输入字符串作为参数</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="api-example">
              <h4>示例代码：</h4>
              <div class="code-block">
                <pre><code>rl.question('你叫什么名字？', (name) => {
  console.log(`你好, ${name}!`);
  rl.close();
});</code></pre>
              </div>
            </div>
          </div>

          <!-- on('line') -->
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon">📨</div>
              <h3>on('line', listener)</h3>
              <span class="api-type">事件</span>
            </div>
            <div class="api-description">
              <p>当输入流接收到行结束符（\n、\r或\r\n）时触发</p>
            </div>
            <div class="api-params">
              <h4>回调参数：</h4>
              <table>
                <thead>
                  <tr>
                    <th>参数</th>
                    <th>类型</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>input</td>
                    <td>string</td>
                    <td>接收到的单行输入（不含行结束符）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="api-example">
              <h4>示例代码：</h4>
              <div class="code-block">
                <pre><code>rl.on('line', (input) => {
  console.log(`收到：${input}`);
  if (input === 'exit') rl.close();
});</code></pre>
              </div>
            </div>
          </div>

          <!-- on('close') -->
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon">🚪</div>
              <h3>on('close', listener)</h3>
              <span class="api-type">事件</span>
            </div>
            <div class="api-description">
              <p>当Interface关闭或输入流接收到结束信号（如Ctrl+D）时触发</p>
            </div>
            <div class="api-notes">
              <p><strong>注意：</strong>在'close'事件后，Interface实例应被视为已完成</p>
            </div>
            <div class="api-example">
              <h4>示例代码：</h4>
              <div class="code-block">
                <pre><code>rl.on('close', () => {
  console.log('会话结束');
  process.exit(0);
});</code></pre>
              </div>
            </div>
          </div>

          <!-- pause/resume -->
          <div class="api-card-group">
            <div class="api-card">
              <div class="api-header">
                <div class="api-icon">⏸️</div>
                <h3>pause()</h3>
                <span class="api-type">方法</span>
              </div>
              <div class="api-description">
                <p>暂停输入流的处理，同时暂停'line'事件的触发</p>
              </div>
              <div class="api-notes">
                <p><strong>使用场景：</strong>在处理大量输入时控制处理速率</p>
              </div>
            </div>

            <div class="api-card">
              <div class="api-header">
                <div class="api-icon">▶️</div>
                <h3>resume()</h3>
                <span class="api-type">方法</span>
              </div>
              <div class="api-description">
                <p>恢复之前暂停的输入流处理</p>
              </div>
              <div class="api-notes">
                <p><strong>注意：</strong>如果流未被暂停，调用此方法无效果</p>
              </div>
            </div>
          </div>

          <!-- prompt/setPrompt -->
          <div class="api-card-group">
            <div class="api-card">
              <div class="api-header">
                <div class="api-icon">💡</div>
                <h3>setPrompt(prompt)</h3>
                <span class="api-type">方法</span>
              </div>
              <div class="api-description">
                <p>设置Interface实例的提示字符串</p>
              </div>
              <div class="api-params">
                <h4>参数：</h4>
                <table>
                  <thead>
                    <tr>
                      <th>参数</th>
                      <th>类型</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>prompt</td>
                      <td>string</td>
                      <td>要设置的提示字符串</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="api-card">
              <div class="api-header">
                <div class="api-icon">📢</div>
                <h3>prompt([preserveCursor])</h3>
                <span class="api-type">方法</span>
              </div>
              <div class="api-description">
                <p>将配置的提示写入output流，并等待用户输入</p>
              </div>
              <div class="api-params">
                <h4>参数：</h4>
                <table>
                  <thead>
                    <tr>
                      <th>参数</th>
                      <th>类型</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>preserveCursor</td>
                      <td>boolean</td>
                      <td>可选，如果为true则保留当前光标位置</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- write/close -->
          <div class="api-card-group">
            <div class="api-card">
              <div class="api-header">
                <div class="api-icon">📤</div>
                <h3>write(data[, key])</h3>
                <span class="api-type">方法</span>
              </div>
              <div class="api-description">
                <p>将数据写入output流，除非在构造时指定了output</p>
              </div>
              <div class="api-notes">
                <p><strong>注意：</strong>当output为TTY时，key对象可用于指定键序列</p>
              </div>
            </div>

            <div class="api-card">
              <div class="api-header">
                <div class="api-icon">🔒</div>
                <h3>close()</h3>
                <span class="api-type">方法</span>
              </div>
              <div class="api-description">
                <p>关闭Interface实例并放弃控制输入输出流</p>
              </div>
              <div class="api-notes">
                <p><strong>重要：</strong>调用close后，Interface实例不再可用</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 完整示例 -->
      <div class="section example-section">
        <div class="section-header">
          <div class="section-icon">🛠️</div>
          <h2>完整示例</h2>
        </div>
        <div class="section-content">
          <div class="example-card">
            <h3>简单的命令行交互程序</h3>
            <div class="code-block">
              <pre><code>const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let name = '';
let age = 0;

rl.question('请输入您的姓名：', (answer) => {
  name = answer;

  rl.question('请输入您的年龄：', (answer) => {
    age = parseInt(answer);

    if (isNaN(age)) {
      console.log('年龄必须是数字！');
      rl.close();
      return;
    }

    console.log(`\n感谢您的输入！`);
    console.log(`姓名: ${name}`);
    console.log(`年龄: ${age}岁`);

    rl.setPrompt('输入 "exit" 退出: ');
    rl.prompt();

    rl.on('line', (input) => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
      } else {
        console.log(`未知命令: ${input}`);
        rl.prompt();
      }
    });
  });
});

rl.on('close', () => {
  console.log('\n程序已结束');
  process.exit(0);
});</code></pre>
            </div>

            <div class="example-explanation">
              <h4>代码说明：</h4>
              <ol>
                <li>创建readline接口实例</li>
                <li>使用question方法获取用户姓名</li>
                <li>在第一个问题的回调中，继续询问年龄</li>
                <li>验证年龄是否为有效数字</li>
                <li>显示汇总信息并进入命令模式</li>
                <li>监听line事件处理用户输入命令</li>
                <li>当收到'exit'命令时关闭接口</li>
                <li>在close事件中执行清理工作</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="best-practices">
      <h2>最佳实践与注意事项</h2>
      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">⚠️</div>
          <div class="tip-content">
            <h3>错误处理</h3>
            <p>始终监听'error'事件以防止未捕获异常导致进程崩溃</p>
          </div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">🔄</div>
          <div class="tip-content">
            <h3>异步控制流</h3>
            <p>使用async/await包装question方法以简化嵌套回调</p>
          </div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">📋</div>
          <div class="tip-content">
            <h3>历史记录</h3>
            <p>利用history选项提供命令历史功能，增强用户体验</p>
          </div>
        </div>
        <div class="tip-card">
          <div class="tip-icon">🛑</div>
          <div class="tip-content">
            <h3>资源清理</h3>
            <p>使用后及时调用close()释放资源，避免内存泄漏</p>
          </div>
        </div>
      </div>

      <div class="final-note">
        <p>
          readline模块是Node.js中构建交互式命令行工具的核心组件。通过合理使用其API，您可以创建功能丰富、用户友好的CLI应用程序。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 本组件仅用于展示，不需要逻辑代码
</script>

<style lang="less" scoped>
@primary-blue: #2962ff;
@secondary-blue: #448aff;
@light-blue: #e3f2fd;
@accent-green: #00c853;
@accent-orange: #ff9100;
@accent-purple: #aa00ff;
@background-light: #f8fbff;
@card-bg: #ffffff;
@text-primary: #212121;
@text-secondary: #616161;
@border-color: #e0e0e0;
@terminal-bg: #1e1e1e;
@code-bg: #f5f7ff;
@shadow-light: 0 4px 12px rgba(0, 0, 0, 0.05);

.readline-container {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}

.header-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem 0;

  .header-content {
    flex: 1;

    h1 {
      font-size: 2.2rem;
      margin-bottom: 0.5rem;
      color: @primary-blue;
    }

    .subtitle {
      font-size: 1.2rem;
      color: @text-secondary;
      margin-bottom: 1.5rem;
    }

    .module-stats {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .stat {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: @card-bg;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: @shadow-light;
        border-left: 3px solid @primary-blue;

        .stat-icon {
          font-size: 1.8rem;
        }

        .stat-text {
          .stat-value {
            display: block;
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
          }

          .stat-label {
            font-size: 0.95rem;
            color: @text-secondary;
          }
        }
      }
    }
  }

  .terminal-demo {
    flex: 1;
    min-width: 450px;
    background: @card-bg;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);

    .terminal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem 1rem;
      background: darken(@terminal-bg, 5%);
      border-bottom: 1px solid lighten(@terminal-bg, 10%);

      .terminal-controls {
        display: flex;
        gap: 0.6rem;

        .control {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ff5f56;

          &.minimize {
            background: #ffbd2e;
          }

          &.maximize {
            background: #27c93f;
          }
        }
      }

      .terminal-title {
        color: #b3b3b3;
        font-size: 0.9rem;
        font-family: 'Courier New', monospace;
      }
    }

    .terminal-body {
      background: @terminal-bg;
      color: #e0e0e0;
      padding: 1.5rem;
      font-family: 'Courier New', monospace;
      font-size: 1rem;
      line-height: 1.6;
      min-height: 280px;

      .terminal-line {
        margin-bottom: 0.5rem;

        .input-highlight {
          color: #4fc3f7;
          font-weight: 500;
        }

        .cursor {
          display: inline-block;
          width: 8px;
          height: 16px;
          background: #e0e0e0;
          animation: blink 1s infinite;
        }
      }
    }
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.content-grid {
  display: grid;
  gap: 1.5rem;
}

.section {
  background: @card-bg;
  border-radius: 16px;
  box-shadow: @shadow-light;
  overflow: hidden;

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem 1.5rem;
    background: fade(@primary-blue, 8%);
    border-bottom: 1px solid @border-color;

    .section-icon {
      font-size: 1.5rem;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: @text-primary;
    }
  }

  .section-content {
    padding: 1.5rem;
  }
}

/* 介绍部分 */
.intro-section {
  .definition-card {
    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-blue;
    }

    p {
      margin-bottom: 1rem;
    }

    ul {
      padding-left: 1.5rem;
      margin-bottom: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }

  .comparison {
    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      color: @primary-blue;
    }

    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;

      .comparison-card {
        background: @code-bg;
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid @border-color;

        &.highlight {
          border: 1px solid @primary-blue;
          box-shadow: 0 0 0 2px fade(@primary-blue, 20%);
        }

        .comparison-title {
          font-weight: 600;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid @border-color;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.8rem;
          }
        }
      }
    }
  }
}

/* API部分 */
.api-section {
  .api-card {
    background: @code-bg;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-left: 3px solid @primary-blue;

    .api-header {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 1rem;

      .api-icon {
        font-size: 1.8rem;
      }

      h3 {
        margin: 0;
        font-size: 1.2rem;
      }

      .api-type {
        background: fade(@primary-blue, 15%);
        color: @primary-blue;
        font-size: 0.85rem;
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        margin-left: auto;
      }
    }

    .api-description {
      margin-bottom: 1.2rem;
      font-size: 0.95rem;
    }

    .api-params {
      margin-bottom: 1.2rem;

      h4 {
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1rem;
        color: @text-primary;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;

        th,
        td {
          padding: 0.6rem 1rem;
          text-align: left;
          border: 1px solid @border-color;
        }

        th {
          background-color: fade(@primary-blue, 8%);
          font-weight: 600;
        }

        tr:nth-child(even) {
          background-color: fade(@primary-blue, 3%);
        }
      }
    }

    .api-notes {
      background: fade(@accent-orange, 8%);
      border-left: 3px solid @accent-orange;
      padding: 0.8rem 1rem;
      border-radius: 0 4px 4px 0;
      margin-bottom: 1.2rem;
      font-size: 0.9rem;
    }
  }

  .api-card-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    .api-card {
      margin-bottom: 0;
    }
  }
}

/* 示例部分 */
.example-section {
  .example-card {
    h3 {
      margin-top: 0;
      margin-bottom: 1.2rem;
      color: @primary-blue;
    }

    .example-explanation {
      background: fade(@accent-green, 8%);
      border-left: 3px solid @accent-green;
      padding: 1rem 1.2rem;
      border-radius: 0 8px 8px 0;
      margin-top: 1.5rem;

      h4 {
        margin-top: 0;
        margin-bottom: 0.8rem;
      }

      ol {
        padding-left: 1.5rem;
        margin: 0;

        li {
          margin-bottom: 0.6rem;
        }
      }
    }
  }
}

/* 最佳实践 */
.best-practices {
  background: @card-bg;
  border-radius: 16px;
  box-shadow: @shadow-light;
  padding: 2rem;
  margin-top: 2rem;

  h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 2rem;
    color: @primary-blue;
  }

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .tip-card {
      display: flex;
      gap: 1rem;
      align-items: flex-start;

      .tip-icon {
        font-size: 1.8rem;
        margin-top: 0.2rem;
      }

      .tip-content {
        h3 {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          font-size: 0.95rem;
          color: @text-secondary;
        }
      }
    }
  }

  .final-note {
    padding: 1.2rem;
    background: fade(@primary-blue, 5%);
    border-radius: 8px;
    border-left: 3px solid @primary-blue;
    font-style: italic;

    p {
      margin: 0;
    }
  }
}

/* 代码块 */
.code-block {
  background: @code-bg;
  border-radius: 8px;
  padding: 1.2rem;
  margin: 1.2rem 0;
  overflow-x: auto;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.5;

  pre {
    margin: 0;

    code {
      color: @text-primary;
      display: block;

      .hljs-keyword {
        color: #d73a49;
      }
      .hljs-built_in {
        color: #6f42c1;
      }
      .hljs-string {
        color: #032f62;
      }
      .hljs-function {
        color: #6f42c1;
      }
      .hljs-params {
        color: #24292e;
      }
      .hljs-comment {
        color: #6a737d;
      }
    }
  }
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;

    .terminal-demo {
      min-width: 100%;
    }
  }

  .api-section {
    .comparison-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
