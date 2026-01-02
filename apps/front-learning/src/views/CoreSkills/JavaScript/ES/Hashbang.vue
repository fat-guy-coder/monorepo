<template>
  <div class="hashbang-reference">
    <!-- 标题区域 -->
    <header class="header">
      <h1>ECMAScript Hashbang 语法</h1>
      <p class="subtitle">深入解析 JavaScript 中的 Shebang 语法及其应用</p>
    </header>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 概述卡片 -->
      <div class="card overview-card">
        <div class="card-header">
          <h2>概述</h2>
          <span class="version-tag">ES2023</span>
        </div>
        <div class="card-content">
          <p>Hashbang（也称为 Shebang）语法允许在 JavaScript 文件的开头使用 <code>#!</code> 前缀，使 JavaScript 文件可以直接作为可执行脚本运行。</p>
          <div class="example">
            <pre>#!/usr/bin/env node
console.log("Hello, Hashbang!");</pre>
          </div>
        </div>
      </div>

      <!-- 详细内容 -->
      <div class="details-grid">
        <!-- 概念卡片 -->
        <div class="card concept-card">
          <div class="card-header">
            <h2>概念</h2>
            <div class="icon">📚</div>
          </div>
          <div class="card-content">
            <p>Hashbang 语法源自 Unix/Linux 系统，用于指定脚本的解释器路径。</p>
            <p>在 JavaScript 中，它由以下部分组成：</p>
            <ul>
              <li><strong>#!</strong> - 固定前缀（称为 shebang）</li>
              <li><strong>路径</strong> - 解释器的路径（如 <code>/usr/bin/env node</code>）</li>
            </ul>
            <p>在 ECMAScript 2023 之前，Hashbang 语法会导致语法错误，现在它被正式纳入规范。</p>
          </div>
        </div>

        <!-- 作用卡片 -->
        <div class="card purpose-card">
          <div class="card-header">
            <h2>作用</h2>
            <div class="icon">🎯</div>
          </div>
          <div class="card-content">
            <ul>
              <li><strong>直接执行脚本</strong> - 允许 JavaScript 文件像可执行文件一样直接运行</li>
              <li><strong>指定解释器</strong> - 明确使用哪个环境执行脚本（如 Node.js）</li>
              <li><strong>跨平台兼容</strong> - 在 Unix/Linux/macOS 和 Windows（通过适当配置）上工作</li>
              <li><strong>简化工作流</strong> - 无需显式调用解释器（如 <code>node script.js</code>）</li>
            </ul>
            <p class="note">在支持的操作系统中，你可以直接运行：<br><code>./script.js</code> 而不需要 <code>node script.js</code></p>
          </div>
        </div>

        <!-- 使用方式卡片 -->
        <div class="card usage-card">
          <div class="card-header">
            <h2>使用方式</h2>
            <div class="icon">💻</div>
          </div>
          <div class="card-content">
            <h3>基本语法</h3>
            <pre>#!/usr/bin/env node</pre>

            <h3>步骤指南</h3>
            <ol>
              <li>在 JavaScript 文件的第一行添加 Hashbang 注释</li>
              <li>指定解释器路径（推荐使用 <code>/usr/bin/env node</code>）</li>
              <li>保存文件并添加执行权限：<br><code>chmod +x script.js</code></li>
              <li>直接运行脚本：<br><code>./script.js</code></li>
            </ol>

            <h3>完整示例</h3>
            <pre>#!/usr/bin/env node

// 简单的CLI应用
const args = process.argv.slice(2);
console.log(`Hello, ${args[0] || 'World'}!`);

// 使用说明
if (args.includes('--help')) {
  console.log('Usage: ./greet.js [name]');
}</pre>
          </div>
        </div>

        <!-- 使用场景卡片 -->
        <div class="card scenarios-card">
          <div class="card-header">
            <h2>使用场景</h2>
            <div class="icon">🚀</div>
          </div>
          <div class="card-content">
            <div class="scenario">
              <h3>命令行工具 (CLI)</h3>
              <p>创建可以直接从终端调用的 Node.js 命令行工具</p>
              <pre>#!/usr/bin/env node
// my-cli-tool.js
console.log('Running my CLI tool...');</pre>
            </div>

            <div class="scenario">
              <h3>系统脚本</h3>
              <p>编写系统自动化脚本（如备份、部署等）</p>
              <pre>#!/usr/bin/env node
// backup.js
const { exec } = require('child_process');
exec('tar -czf backup.tar.gz ./data');</pre>
            </div>

            <div class="scenario">
              <h3>实用程序</h3>
              <p>创建可直接运行的实用程序脚本</p>
              <pre>#!/usr/bin/env node
// file-organizer.js
const fs = require('fs');
// 文件整理逻辑...</pre>
            </div>

            <div class="scenario">
              <h3>开发工具</h3>
              <p>简化开发工作流程脚本的执行</p>
              <pre>#!/usr/bin/env node
// build.js
const { build } = require('./build-system');
build();</pre>
            </div>
          </div>
        </div>

        <!-- 注意事项卡片 -->
        <div class="card precautions-card">
          <div class="card-header">
            <h2>注意事项</h2>
            <div class="icon">⚠️</div>
          </div>
          <div class="card-content">
            <ul>
              <li><strong>位置要求</strong> - 必须是文件的第一行（前面不能有任何字符，包括空格）</li>
              <li><strong>浏览器忽略</strong> - 浏览器会忽略 Hashbang 行，不影响网页脚本</li>
              <li><strong>Windows 支持</strong> - 需要配置文件关联或使用 WSL</li>
              <li><strong>文件权限</strong> - 在 Unix 系统上需要设置可执行权限 (<code>chmod +x</code>)</li>
              <li><strong>模块类型</strong> - 在 ES 模块中同样适用</li>
              <li><strong>错误处理</strong> - 如果解释器路径错误，执行会失败</li>
              <li><strong>版本兼容</strong> - 需要 Node.js 或支持 ES2023 的环境</li>
            </ul>

            <div class="comparison">
              <h3>不同环境下的行为</h3>
              <table>
                <thead>
                  <tr>
                    <th>环境</th>
                    <th>行为</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Node.js (CLI)</td>
                    <td>正常执行，忽略 Hashbang 行</td>
                  </tr>
                  <tr>
                    <td>浏览器</td>
                    <td>视为注释，完全忽略</td>
                  </tr>
                  <tr>
                    <td>Unix/Linux/macOS</td>
                    <td>使用指定解释器执行脚本</td>
                  </tr>
                  <tr>
                    <td>Windows (CMD/PowerShell)</td>
                    <td>需要额外配置才能支持</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部信息 -->
    <footer class="footer">
      <p>ECMAScript 2023 规范 | Hashbang 语法参考 | Vue 3 + TypeScript + Less</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例代码可复制功能
const copyCode = (code: string) => {
  navigator.clipboard.writeText(code)
    .then(() => {
      alert('代码已复制到剪贴板！');
    })
    .catch(err => {
      console.error('复制失败:', err);
    });
};
</script>

<style scoped lang="less">
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;
@success-color: #06d6a0;
@warning-color: #ffd166;
@error-color: #ef476f;
@info-color: #118ab2;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.hashbang-reference {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: @light-bg;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;

  h1 {
    font-size: 2.5rem;
    color: @secondary-color;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.card {
  background: @card-bg;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }
}

.card-header {
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .version-tag {
    background: rgba(255,255,255,0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .icon {
    font-size: 1.5rem;
  }
}

.card-content {
  padding: 20px;

  h3 {
    color: @secondary-color;
    margin: 15px 0 10px;
    font-size: 1.2rem;
    border-bottom: 1px solid @border-color;
    padding-bottom: 5px;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.6;
  }

  ul, ol {
    padding-left: 20px;
    margin-bottom: 15px;

    li {
      margin-bottom: 8px;
    }
  }

  .note {
    background: fade(@info-color, 10%);
    border-left: 3px solid @info-color;
    padding: 10px 15px;
    border-radius: 0 4px 4px 0;
    margin-top: 15px;
  }
}

.overview-card {
  .example {
    background: @light-bg;
    border-radius: 8px;
    padding: 15px;
    margin-top: 15px;
    overflow-x: auto;

    pre {
      font-family: 'Courier New', monospace;
      font-size: 1rem;
      color: #333;
      line-height: 1.4;
    }
  }
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.concept-card, .purpose-card {
  .card-content {
    display: flex;
    flex-direction: column;
    height: calc(100% - 60px); // 减去头部高度
  }
}

.usage-card, .scenarios-card, .precautions-card {
  grid-column: span 2;
}

.scenarios-card {
  .scenario {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    pre {
      background: @light-bg;
      border-radius: 6px;
      padding: 12px;
      margin-top: 10px;
      overflow-x: auto;
      font-size: 0.9rem;
    }
  }
}

.precautions-card {
  .comparison {
    margin-top: 20px;

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;

      th, td {
        padding: 10px 15px;
        text-align: left;
        border-bottom: 1px solid @border-color;
      }

      th {
        background: fade(@primary-color, 10%);
        color: @primary-color;
        font-weight: 600;
      }

      tr:last-child td {
        border-bottom: none;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 20px 20px;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;
  margin-top: 40px;
  border-top: 1px solid @border-color;
}

code {
  background: fade(@primary-color, 10%);
  color: @primary-color;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

pre {
  background: @light-bg;
  border-radius: 6px;
  padding: 12px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #333;
  margin: 10px 0;
  border-left: 3px solid @primary-color;
}

@media (max-width: 900px) {
  .details-grid {
    grid-template-columns: 1fr;

    .usage-card, .scenarios-card, .precautions-card {
      grid-column: span 1;
    }
  }

  .header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 10px 0;

    h1 {
      font-size: 1.8rem;
    }
  }

  .card-header h2 {
    font-size: 1.3rem;
  }
}
</style>
