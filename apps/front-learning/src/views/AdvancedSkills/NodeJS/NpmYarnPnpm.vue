<template>
  <div class="package-manager-container">
    <header class="header">
      <h1>Node.js 包管理器比较</h1>
      <p>探索 npm, yarn 和 pnpm 的差异与最佳实践</p>
    </header>

    <div class="tabs">
      <button v-for="manager in managers" :key="manager.id" :class="{ active: activeManager === manager.id }"
        @click="activeManager = manager.id">
        <span class="manager-icon">{{ manager.icon }}</span>
        {{ manager.name }}
      </button>
    </div>

    <div class="content">
      <section v-if="activeManager === 'npm'" class="manager-section">
        <div class="manager-header">
          <div class="logo npm-logo">
            <div class="npm-icon">npm</div>
          </div>
          <div class="title">
            <h2>npm (Node Package Manager)</h2>
            <p>Node.js 的默认包管理器</p>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-card">
            <h3>📦 核心特性</h3>
            <ul>
              <li>Node.js 官方包管理器</li>
              <li>全球最大的 JavaScript 包注册表</li>
              <li>从版本 5 开始包含 package-lock.json</li>
              <li>提供 npx 工具用于执行包命令</li>
              <li>支持私有包和范围包</li>
            </ul>
          </div>

          <div class="info-card">
            <h3>⚙️ 工作原理</h3>
            <div class="visual">
              <div class="node">Node.js</div>
              <div class="arrow">→</div>
              <div class="npm">npm 注册表</div>
              <div class="arrow">→</div>
              <div class="deps">
                <div class="dep">依赖1</div>
                <div class="dep">依赖2</div>
                <div class="dep">依赖3</div>
              </div>
            </div>
            <p>npm 使用扁平化的 node_modules 结构。它会尝试将依赖提升到顶层，但存在依赖重复和幻影依赖问题。</p>
          </div>

          <div class="info-card">
            <h3>✅ 优点</h3>
            <ul class="pros">
              <li>Node.js 内置，无需额外安装</li>
              <li>最大的包生态系统</li>
              <li>完善的文档和社区支持</li>
              <li>与 Node.js 版本同步更新</li>
              <li>提供 npx 用于临时执行包</li>
            </ul>
          </div>

          <div class="info-card">
            <h3>⚠️ 缺点</h3>
            <ul class="cons">
              <li>安装速度相对较慢</li>
              <li>磁盘空间使用效率低</li>
              <li>依赖结构复杂（node_modules 黑洞）</li>
              <li>早期版本存在确定性安装问题</li>
              <li>幻影依赖问题（未声明的依赖可能可用）</li>
            </ul>
          </div>

          <div class="info-card full-width">
            <h3>🏆 使用场景</h3>
            <div class="scenarios">
              <div class="scenario">
                <div class="icon">🚀</div>
                <h4>小型项目</h4>
                <p>简单项目无需复杂依赖管理</p>
              </div>
              <div class="scenario">
                <div class="icon">🏢</div>
                <h4>企业环境</h4>
                <p>已建立 npm 私有仓库的公司</p>
              </div>
              <div class="scenario">
                <div class="icon">👨‍💻</div>
                <h4>新手开发者</h4>
                <p>Node.js 初学者最佳起点</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="activeManager === 'yarn'" class="manager-section">
        <div class="manager-header">
          <div class="logo yarn-logo">
            <div class="yarn-icon">Y</div>
          </div>
          <div class="title">
            <h2>Yarn</h2>
            <p>Facebook 开发的快速、可靠、安全的依赖管理工具</p>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-card">
            <h3>📦 核心特性</h3>
            <ul>
              <li>确定性安装 (yarn.lock 文件)</li>
              <li>并行安装加速依赖获取</li>
              <li>离线模式支持</li>
              <li>工作区 (Workspaces) 支持</li>
              <li>可插拔架构 (Plug'n'Play)</li>
            </ul>
          </div>

          <div class="info-card">
            <h3>⚙️ 工作原理</h3>
            <div class="visual">
              <div class="parallel">
                <div class="dep">依赖1</div>
                <div class="dep">依赖2</div>
                <div class="dep">依赖3</div>
              </div>
              <div class="arrow">⇨</div>
              <div class="cache">本地缓存</div>
              <div class="arrow">⇨</div>
              <div class="lock">yarn.lock</div>
            </div>
            <p>Yarn 使用并行下载和本地缓存机制加快安装速度，并通过 yarn.lock 确保依赖一致性。</p>
          </div>

          <div class="info-card">
            <h3>✅ 优点</h3>
            <ul class="pros">
              <li>安装速度比 npm 快很多</li>
              <li>更安全的依赖管理</li>
              <li>离线模式支持</li>
              <li>优秀的工作区功能</li>
              <li>清晰的命令行输出</li>
            </ul>
          </div>

          <div class="info-card">
            <h3>⚠️ 缺点</h3>
            <ul class="cons">
              <li>需要额外安装</li>
              <li>与 npm 不完全兼容</li>
              <li>Plug'n'Play 模式需要工具链支持</li>
              <li>磁盘空间使用仍不高效</li>
              <li>存在两个主要版本 (Classic 和 Berry)</li>
            </ul>
          </div>

          <div class="info-card full-width">
            <h3>🏆 使用场景</h3>
            <div class="scenarios">
              <div class="scenario">
                <div class="icon">💻</div>
                <h4>大型项目</h4>
                <p>需要快速、可靠依赖管理的项目</p>
              </div>
              <div class="scenario">
                <div class="icon">🏗️</div>
                <h4>Monorepo 项目</h4>
                <p>利用工作区功能管理多个包</p>
              </div>
              <div class="scenario">
                <div class="icon">🌐</div>
                <h4>离线开发环境</h4>
                <p>网络受限环境下的开发</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="activeManager === 'pnpm'" class="manager-section">
        <div class="manager-header">
          <div class="logo pnpm-logo">
            <div class="pnpm-icon">pnpm</div>
          </div>
          <div class="title">
            <h2>pnpm (Performant npm)</h2>
            <p>快速、节省磁盘空间的包管理工具</p>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-card">
            <h3>📦 核心特性</h3>
            <ul>
              <li>内容寻址存储系统</li>
              <li>硬链接和符号链接机制</li>
              <li>严格的 node_modules 结构</li>
              <li>兼容 npm 和 Yarn 工作流</li>
              <li>高效磁盘空间利用</li>
            </ul>
          </div>

          <div class="info-card">
            <h3>⚙️ 工作原理</h3>
            <div class="visual">
              <div class="store">全局存储</div>
              <div class="arrow">⇩</div>
              <div class="links">
                <div class="project">
                  <div class="proj-name">项目A</div>
                  <div class="link">硬链接</div>
                </div>
                <div class="project">
                  <div class="proj-name">项目B</div>
                  <div class="link">硬链接</div>
                </div>
              </div>
            </div>
            <p>pnpm 使用全局存储，所有项目通过硬链接共享依赖包，避免了重复下载和存储。</p>
          </div>

          <div class="info-card">
            <h3>✅ 优点</h3>
            <ul class="pros">
              <li>极快的安装速度</li>
              <li>节省大量磁盘空间 (高达70%)</li>
              <li>避免幻影依赖问题</li>
              <li>严格的依赖结构</li>
              <li>与 npm 和 Yarn 命令高度兼容</li>
            </ul>
          </div>

          <div class="info-card">
            <h3>⚠️ 缺点</h3>
            <ul class="cons">
              <li>较新的工具，社区相对较小</li>
              <li>符号链接可能导致某些工具问题</li>
              <li>需要适应不同的 node_modules 结构</li>
              <li>Windows 支持早期存在问题</li>
              <li>某些边缘情况兼容性问题</li>
            </ul>
          </div>

          <div class="info-card full-width">
            <h3>🏆 使用场景</h3>
            <div class="scenarios">
              <div class="scenario">
                <div class="icon">💾</div>
                <h4>磁盘空间有限环境</h4>
                <p>SSD容量有限或需要多个项目</p>
              </div>
              <div class="scenario">
                <div class="icon">🚤</div>
                <h4>需要极速安装</h4>
                <p>CI/CD 环境或大型项目</p>
              </div>
              <div class="scenario">
                <div class="icon">🔒</div>
                <h4>严格的依赖管理</h4>
                <p>避免幻影依赖的安全项目</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2>包管理器对比</h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>npm</th>
                <th>Yarn</th>
                <th>pnpm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>安装速度</td>
                <td>较慢</td>
                <td>快</td>
                <td>极快</td>
              </tr>
              <tr>
                <td>磁盘效率</td>
                <td>低</td>
                <td>中</td>
                <td>高</td>
              </tr>
              <tr>
                <td>node_modules 大小</td>
                <td>大</td>
                <td>大</td>
                <td>小</td>
              </tr>
              <tr>
                <td>依赖结构</td>
                <td>扁平化</td>
                <td>扁平化</td>
                <td>严格层级</td>
              </tr>
              <tr>
                <td>幻影依赖问题</td>
                <td>有</td>
                <td>有</td>
                <td>无</td>
              </tr>
              <tr>
                <td>Monorepo 支持</td>
                <td>Workspaces (v7+)</td>
                <td>Workspaces</td>
                <td>Workspaces</td>
              </tr>
              <tr>
                <td>离线支持</td>
                <td>有限</td>
                <td>好</td>
                <td>好</td>
              </tr>
              <tr>
                <td>安全特性</td>
                <td>基础</td>
                <td>好</td>
                <td>很好</td>
              </tr>
              <tr>
                <td>社区规模</td>
                <td>最大</td>
                <td>大</td>
                <td>增长中</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="recommendation">
        <h2>选择建议</h2>
        <div class="recommendation-content">
          <div class="recommendation-card">
            <h3>npm</h3>
            <p>适合小型项目、Node.js 初学者或需要与 Node.js 内置工具紧密集成的场景</p>
          </div>
          <div class="recommendation-card">
            <h3>Yarn</h3>
            <p>适合大型项目、Monorepo、需要快速安装和离线支持的场景</p>
          </div>
          <div class="recommendation-card">
            <h3>pnpm</h3>
            <p>适合磁盘空间有限环境、需要极速安装和严格依赖管理的项目</p>
          </div>
        </div>
        <div class="final-tip">
          <p><strong>专业提示：</strong> 所有包管理器都支持使用相同的 package.json 格式，可以轻松地在项目间切换！</p>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Node.js 包管理器比较 | 选择最适合您项目需求的工具</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const managers = [
  { id: 'npm', name: 'npm', icon: '📦' },
  { id: 'yarn', name: 'Yarn', icon: '🧶' },
  { id: 'pnpm', name: 'pnpm', icon: '🚀' }
];

const activeManager = ref('npm');
</script>

<style lang="less" scoped>


.package-manager-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  color: #2c3e50;
}

.header {
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  color: white;
  text-align: center;
  padding: 2.5rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.tabs {
  display: flex;
  background: #2c3e50;
  padding: 0;

  button {
    flex: 1;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
    font-weight: 500;
    padding: 1.5rem 0;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.active {
      color: white;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.15);

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #3498db;
      }
    }

    .manager-icon {
      font-size: 1.5rem;
    }
  }
}

.content {
  padding: 2rem;
  background: white;
}

.manager-section {
  max-width: 1100px;
  margin: 0 auto;
}

.manager-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e9ecef;

  .logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: bold;
    color: white;

    &.npm-logo {
      background: linear-gradient(135deg, #cb3837 0%, #bb3e3e 100%);
      box-shadow: 0 4px 12px rgba(203, 56, 55, 0.3);
    }

    &.yarn-logo {
      background: linear-gradient(135deg, #2c8ebb 0%, #2188b6 100%);
      box-shadow: 0 4px 12px rgba(44, 142, 187, 0.3);
    }

    &.pnpm-logo {
      background: linear-gradient(135deg, #f9ad00 0%, #f9a602 100%);
      box-shadow: 0 4px 12px rgba(249, 173, 0, 0.3);
      color: #2c3e50;
    }
  }

  .title {
    h2 {
      font-size: 2rem;
      margin: 0;
      color: #2c3e50;
    }

    p {
      margin: 0.5rem 0 0;
      color: #7f8c8d;
      font-size: 1.1rem;
    }
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
  margin-bottom: 3rem;

  .info-card {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 1.8rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-size: 1.4rem;
      margin-top: 0;
      margin-bottom: 1.2rem;
      color: #2c3e50;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    ul {
      padding-left: 1.5rem;
      margin: 0;

      li {
        margin-bottom: 0.8rem;
        line-height: 1.6;
      }
    }

    &.full-width {
      grid-column: 1 / -1;
    }
  }

  .pros li {
    color: #27ae60;

    &::before {
      content: '✓ ';
      font-weight: bold;
    }
  }

  .cons li {
    color: #e74c3c;

    &::before {
      content: '⚠ ';
    }
  }
}

.visual {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #e9ecef;

  .node,
  .npm,
  .store,
  .lock,
  .cache {
    background: #3498db;
    color: white;
    padding: 0.8rem;
    border-radius: 4px;
    margin: 0.5rem 0;
    font-weight: 500;
  }

  .deps,
  .parallel,
  .links {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  .dep,
  .project {
    background: #2ecc71;
    color: white;
    padding: 0.8rem;
    border-radius: 4px;
    min-width: 80px;
  }

  .arrow {
    padding: 0.8rem;
    font-weight: bold;
  }

  .project {
    background: #9b59b6;
    display: flex;
    flex-direction: column;
    align-items: center;

    .link {
      font-size: 0.8rem;
      margin-top: 0.5rem;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  .scenario {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h4 {
      margin: 0.8rem 0;
      color: #2c3e50;
    }

    p {
      margin: 0;
      color: #7f8c8d;
      font-size: 0.95rem;
    }
  }
}

.comparison-section {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  margin: 3rem 0;

  h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 2rem;
    color: #2c3e50;
    font-size: 1.8rem;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 1.2rem 1.5rem;
      text-align: left;
      border-bottom: 1px solid #e9ecef;
    }

    th {
      background: #2c3e50;
      color: white;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f8f9fa;
    }

    tr:last-child td {
      border-bottom: none;
    }

    td:nth-child(2) {
      color: #cb3837;
      font-weight: 500;
    }

    td:nth-child(3) {
      color: #2c8ebb;
      font-weight: 500;
    }

    td:nth-child(4) {
      color: #f9ad00;
      font-weight: 500;
    }
  }
}

.recommendation {
  background: linear-gradient(135deg, #3498db15 0%, #2ecc7115 100%);
  border-radius: 10px;
  padding: 2rem;
  margin-top: 3rem;

  h2 {
    text-align: center;
    margin-top: 0;
    color: #2c3e50;
  }
}

.recommendation-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
  margin: 2rem 0;
}

.recommendation-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-top: 4px solid;

  &:nth-child(1) {
    border-color: #cb3837;
  }

  &:nth-child(2) {
    border-color: #2c8ebb;
  }

  &:nth-child(3) {
    border-color: #f9ad00;
  }

  h3 {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.7;
    color: #34495e;
    margin: 0;
  }
}

.final-tip {
  background: #2c3e50;
  color: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  font-size: 1.1rem;
  margin-top: 2rem;

  p {
    margin: 0;

    strong {
      color: #3498db;
    }
  }
}

.footer {
  background: #2c3e50;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 1.5rem;
  font-size: 0.95rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .tabs {
    flex-direction: column;

    button {
      padding: 1.2rem 0;
    }
  }

  .manager-header {
    flex-direction: column;
    text-align: center;

    .title {
      h2 {
        font-size: 1.8rem;
      }
    }
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .scenarios {
    grid-template-columns: 1fr;
  }

  .recommendation-content {
    grid-template-columns: 1fr;
  }
}
</style>
