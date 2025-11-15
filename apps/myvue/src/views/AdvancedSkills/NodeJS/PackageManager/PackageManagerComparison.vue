<template>
  <div class="package-managers-comparison">
    <header class="header">
      <div class="header-content">
        <h1>npm vs Yarn vs pnpm 深度对比</h1>
        <p>基本解析三大包管理工具的核心差异</p>
      </div>
      <div class="package-managers-icons">
        <div class="manager-icon" :class="{ active: activeManager === 'npm' }">
          <i class="fab fa-npm"></i>
          <span>npm</span>
        </div>
        <div class="manager-icon" :class="{ active: activeManager === 'yarn' }">
          <i class="fab fa-yarn"></i>
          <span>Yarn</span>
        </div>
        <div class="manager-icon" :class="{ active: activeManager === 'pnpm' }">
          <i class="fas fa-box"></i>
          <span>pnpm</span>
        </div>
      </div>
    </header>

    <div class="content-container">
      <aside class="sidebar">
        <nav>
          <ul>
            <li v-for="section in sections" :key="section.id">
              <a :href="`#${section.id}`" @click.prevent="scrollTo(section.id)"
                :class="{ active: activeSection === section.id }">
                <i :class="section.icon"></i>
                <span>{{ section.title }}</span>
              </a>
            </li>
          </ul>
        </nav>
        <div class="sidebar-footer">
          <div class="recommendation">
            <i class="fas fa-star"></i>
            <span>推荐: pnpm</span>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <section id="overview" class="section">
          <div class="section-header">
            <i class="fas fa-list"></i>
            <h2>工具概览</h2>
          </div>

          <div class="content-card">
            <div class="managers-overview">
              <div class="manager-card">
                <div class="manager-header">
                  <i class="fab fa-npm"></i>
                  <h3>npm</h3>
                </div>
                <div class="manager-info">
                  <p><strong>Node Package Manager</strong></p>
                  <p>Node.js 的官方包管理器，随 Node.js 一起安装</p>
                  <div class="release-info">
                    <i class="fas fa-calendar-alt"></i>
                    <span>发布于 2010 年</span>
                  </div>
                </div>
              </div>

              <div class="manager-card">
                <div class="manager-header">
                  <i class="fab fa-yarn"></i>
                  <h3>Yarn</h3>
                </div>
                <div class="manager-info">
                  <p><strong>Yet Another Resource Negotiator</strong></p>
                  <p>由 Facebook 创建，旨在解决 npm 的性能和安全问题</p>
                  <div class="release-info">
                    <i class="fas fa-calendar-alt"></i>
                    <span>发布于 2016 年</span>
                  </div>
                </div>
              </div>

              <div class="manager-card">
                <div class="manager-header">
                  <i class="fas fa-box"></i>
                  <h3>pnpm</h3>
                </div>
                <div class="manager-info">
                  <p><strong>Performant npm</strong></p>
                  <p>专注于性能和磁盘空间效率的包管理器</p>
                  <div class="release-info">
                    <i class="fas fa-calendar-alt"></i>
                    <span>发布于 2017 年</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="key-differences">
              <h3>核心差异概览</h3>
              <table class="differences-table">
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>npm</th>
                    <th>Yarn</th>
                    <th>pnpm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="diff in keyDiffs" :key="diff.feature">
                    <td>{{ diff.feature }}</td>
                    <td :class="{ 'highlight': diff.npm === '✓' }">
                      <i v-if="diff.npm === '✓'" class="fas fa-check"></i>
                      <i v-else-if="diff.npm === '✗'" class="fas fa-times"></i>
                      <span v-else>{{ diff.npm }}</span>
                    </td>
                    <td :class="{ 'highlight': diff.yarn === '✓' }">
                      <i v-if="diff.yarn === '✓'" class="fas fa-check"></i>
                      <i v-else-if="diff.yarn === '✗'" class="fas fa-times"></i>
                      <span v-else>{{ diff.yarn }}</span>
                    </td>
                    <td :class="{ 'highlight': diff.pnpm === '✓' }">
                      <i v-if="diff.pnpm === '✓'" class="fas fa-check"></i>
                      <i v-else-if="diff.pnpm === '✗'" class="fas fa-times"></i>
                      <span v-else>{{ diff.pnpm }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="resolution" class="section">
          <div class="section-header">
            <i class="fas fa-search"></i>
            <h2>包解析机制</h2>
          </div>

          <div class="content-card">
            <h3>包查找与解析逻辑</h3>

            <div class="resolution-methods">
              <div class="method">
                <h4>npm</h4>
                <div class="method-description">
                  <p>使用嵌套的 node_modules 结构：</p>
                  <ul>
                    <li>每个包都有自己的 node_modules 文件夹</li>
                    <li>可能导致深层嵌套和重复依赖</li>
                    <li>依赖解析顺序影响最终安装结果</li>
                  </ul>
                  <div class="folder-structure">
                    <div class="folder">node_modules</div>
                    <div class="folder nested">
                      <div>packageA</div>
                      <div class="folder">node_modules</div>
                    </div>
                    <div class="folder nested">
                      <div>packageB</div>
                      <div class="folder">node_modules</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="method">
                <h4>Yarn</h4>
                <div class="method-description">
                  <p>使用扁平化 node_modules：</p>
                  <ul>
                    <li>将依赖提升到顶层 node_modules</li>
                    <li>减少嵌套深度</li>
                    <li>可能引入幻影依赖问题</li>
                  </ul>
                  <div class="folder-structure flat">
                    <div class="folder">node_modules</div>
                    <div class="folder-content">
                      <div>packageA</div>
                      <div>packageB</div>
                      <div>shared-dep</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="method">
                <h4>pnpm</h4>
                <div class="method-description">
                  <p>使用内容寻址存储和符号链接：</p>
                  <ul>
                    <li>所有包存储在全局存储中</li>
                    <li>项目 node_modules 使用符号链接</li>
                    <li>避免依赖重复和幻影依赖</li>
                  </ul>
                  <div class="folder-structure">
                    <div class="folder">node_modules</div>
                    <div class="folder nested">
                      <div>.pnpm</div>
                      <div class="folder">存储所有依赖</div>
                    </div>
                    <div class="folder nested">
                      <div>packageA</div>
                      <div class="link">→ 全局存储</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="resolution-pros-cons">
              <h3>包解析优缺点对比</h3>
              <div class="pros-cons-grid">
                <div class="pros-cons">
                  <h4>npm</h4>
                  <div class="pros">
                    <h5>优点</h5>
                    <ul>
                      <li>与 Node.js 原生集成</li>
                      <li>最广泛的兼容性</li>
                    </ul>
                  </div>
                  <div class="cons">
                    <h5>缺点</h5>
                    <ul>
                      <li>深层嵌套结构</li>
                      <li>依赖重复问题</li>
                      <li>安装速度较慢</li>
                    </ul>
                  </div>
                </div>

                <div class="pros-cons">
                  <h4>Yarn</h4>
                  <div class="pros">
                    <h5>优点</h5>
                    <ul>
                      <li>扁平结构减少嵌套</li>
                      <li>确定性安装（yarn.lock）</li>
                      <li>更好的性能</li>
                    </ul>
                  </div>
                  <div class="cons">
                    <h5>缺点</h5>
                    <ul>
                      <li>幻影依赖问题</li>
                      <li>可能引入不兼容版本</li>
                    </ul>
                  </div>
                </div>

                <div class="pros-cons">
                  <h4>pnpm</h4>
                  <div class="pros">
                    <h5>优点</h5>
                    <ul>
                      <li>显著的磁盘空间节省</li>
                      <li>极快的安装速度</li>
                      <li>严格的依赖隔离</li>
                    </ul>
                  </div>
                  <div class="cons">
                    <h5>缺点</h5>
                    <ul>
                      <li>某些工具兼容性问题</li>
                      <li>符号链接可能导致问题</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="performance" class="section">
          <div class="section-header">
            <i class="fas fa-tachometer-alt"></i>
            <h2>性能对比</h2>
          </div>

          <div class="content-card">
            <h3>安装速度与磁盘使用</h3>

            <div class="performance-charts">
              <div class="chart">
                <h4>安装时间对比 (秒)</h4>
                <div class="chart-bars">
                  <div class="bar-container">
                    <div class="bar-label">npm</div>
                    <div class="bar" :style="{ width: '100%' }">
                      <span class="bar-value">42s</span>
                    </div>
                  </div>
                  <div class="bar-container">
                    <div class="bar-label">Yarn</div>
                    <div class="bar" :style="{ width: '65%' }">
                      <span class="bar-value">27s</span>
                    </div>
                  </div>
                  <div class="bar-container">
                    <div class="bar-label">pnpm</div>
                    <div class="bar" :style="{ width: '35%' }">
                      <span class="bar-value">15s</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="chart">
                <h4>磁盘空间使用 (MB)</h4>
                <div class="chart-bars">
                  <div class="bar-container">
                    <div class="bar-label">npm</div>
                    <div class="bar" :style="{ width: '100%' }">
                      <span class="bar-value">320MB</span>
                    </div>
                  </div>
                  <div class="bar-container">
                    <div class="bar-label">Yarn</div>
                    <div class="bar" :style="{ width: '95%' }">
                      <span class="bar-value">305MB</span>
                    </div>
                  </div>
                  <div class="bar-container">
                    <div class="bar-label">pnpm</div>
                    <div class="bar" :style="{ width: '40%' }">
                      <span class="bar-value">128MB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="performance-factors">
              <h3>性能关键因素</h3>
              <div class="factors-grid">
                <div class="factor">
                  <div class="factor-icon">
                    <i class="fas fa-hdd"></i>
                  </div>
                  <div class="factor-content">
                    <h4>磁盘 I/O</h4>
                    <p>pnpm 使用硬链接减少文件复制操作</p>
                  </div>
                </div>

                <div class="factor">
                  <div class="factor-icon">
                    <i class="fas fa-network-wired"></i>
                  </div>
                  <div class="factor-content">
                    <h4>并行下载</h4>
                    <p>Yarn 和 pnpm 支持并行下载包</p>
                  </div>
                </div>

                <div class="factor">
                  <div class="factor-icon">
                    <i class="fas fa-archive"></i>
                  </div>
                  <div class="factor-content">
                    <h4>全局存储</h4>
                    <p>pnpm 的全局存储避免重复下载相同包</p>
                  </div>
                </div>

                <div class="factor">
                  <div class="factor-icon">
                    <i class="fas fa-file-contract"></i>
                  </div>
                  <div class="factor-content">
                    <h4>锁定文件</h4>
                    <p>Yarn 和 pnpm 有更快的锁定文件解析</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="phantom" class="section">
          <div class="section-header">
            <i class="fas fa-ghost"></i>
            <h2>幻影依赖</h2>
          </div>

          <div class="content-card">
            <h3>幻影依赖问题解析</h3>

            <div class="dependency-management">
              <div class="dependency-model">
                <h4>什么是幻影依赖?</h4>
                <div class="model-description">
                  <p>幻影依赖(Phantom Dependencies)是指:</p>
                  <ul>
                    <li>项目中使用了未在 package.json 中声明的依赖</li>
                    <li>这些依赖是其他包的依赖项被提升到顶层导致的</li>
                    <li>可能导致项目在不同环境下表现不一致</li>
                  </ul>
                </div>
              </div>

              <div class="dependency-model">
                <h4>各包管理器的处理</h4>
                <div class="model-description">
                  <p>不同包管理器的应对方案:</p>
                  <ul>
                    <li>npm/Yarn: 扁平化处理导致幻影依赖问题</li>
                    <li>pnpm: 严格的依赖隔离避免幻影依赖</li>
                    <li>建议: 始终在 package.json 中显式声明所有依赖</li>
                  </ul>
                </div>
              </div>

              <div class="dependency-model">
                <h4>最佳实践</h4>
                <div class="model-description">
                  <p>避免幻影依赖的方法:</p>
                  <ul>
                    <li>使用 pnpm 的严格模式</li>
                    <li>定期审查和清理依赖</li>
                    <li>使用依赖检查工具</li>
                    <li>在 CI/CD 中进行依赖验证</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="dependencies" class="section">
          <div class="section-header">
            <i class="fas fa-code-branch"></i>
            <h2>依赖管理</h2>
          </div>

          <div class="content-card">
            <h3>依赖处理机制对比</h3>

            <div class="dependency-management">
              <div class="dependency-model">
                <h4>npm</h4>
                <div class="model-description">
                  <p>嵌套依赖树：</p>
                  <ul>
                    <li>每个包都有自己的 node_modules</li>
                    <li>可能导致多个包版本重复</li>
                    <li>依赖树可能非常深</li>
                  </ul>
                  <div class="tree-structure">
                    <div class="tree-node">packageA</div>
                    <div class="tree-children">
                      <div class="tree-node">dep@1.0.0</div>
                      <div class="tree-node">packageB</div>
                      <div class="tree-children">
                        <div class="tree-node">dep@1.0.0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="dependency-model">
                <h4>Yarn</h4>
                <div class="model-description">
                  <p>扁平化依赖：</p>
                  <ul>
                    <li>提升依赖到顶层 node_modules</li>
                    <li>解决重复问题但可能引入版本冲突</li>
                    <li>使用确定性算法解决依赖</li>
                  </ul>
                  <div class="tree-structure flat">
                    <div class="tree-node">packageA</div>
                    <div class="tree-node">packageB</div>
                    <div class="tree-node">dep@1.0.0</div>
                  </div>
                </div>
              </div>

              <div class="dependency-model">
                <h4>pnpm</h4>
                <div class="model-description">
                  <p>内容寻址存储：</p>
                  <ul>
                    <li>所有包存储在全局 ~/.pnpm-store</li>
                    <li>项目中使用硬链接和符号链接</li>
                    <li>每个包只安装一次，节省空间</li>
                  </ul>
                  <div class="tree-structure">
                    <div class="tree-node">packageA</div>
                    <div class="tree-link">→ dep@1.0.0</div>
                    <div class="tree-node">packageB</div>
                    <div class="tree-link">→ dep@1.0.0</div>
                    <div class="tree-store">全局存储</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="dependency-features">
              <h3>高级依赖管理特性</h3>
              <table class="features-table">
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
                    <td>锁定文件</td>
                    <td>package-lock.json</td>
                    <td>yarn.lock</td>
                    <td>pnpm-lock.yaml</td>
                  </tr>
                  <tr>
                    <td>工作区支持</td>
                    <td>✓ (v7+)</td>
                    <td>✓</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>离线模式</td>
                    <td>✓</td>
                    <td>✓</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>选择性依赖解析</td>
                    <td>✗</td>
                    <td>✓</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>严格依赖隔离</td>
                    <td>✗</td>
                    <td>✗</td>
                    <td>✓</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="hard-link-and-symbol-link">
              <h3>硬链接和符号链接</h3>
              <p>硬链接和符号链接是包管理器中常用的两种链接方式。</p>
              <p>硬链接是直接将文件复制到目标位置，而符号链接是创建一个指向源文件的链接。</p>
              <p>硬链接和符号链接的区别在于，硬链接是直接将文件复制到目标位置，而符号链接是创建一个指向源文件的链接。</p>
            </div>
          </div>
        </section>

        <section id="ecosystem" class="section">
          <div class="section-header">
            <i class="fas fa-globe"></i>
            <h2>生态系统与兼容性</h2>
          </div>

          <div class="content-card">
            <h3>生态系统支持</h3>

            <div class="ecosystem-support">
              <div class="support-card">
                <div class="support-header">
                  <i class="fab fa-npm"></i>
                  <h4>npm</h4>
                </div>
                <div class="support-content">
                  <ul>
                    <li><i class="fas fa-check"></i> 官方包管理器，100% 兼容</li>
                    <li><i class="fas fa-check"></i> 最大规模的包生态系统</li>
                    <li><i class="fas fa-check"></i> 所有工具原生支持</li>
                    <li><i class="fas fa-times"></i> 某些高级功能缺失</li>
                  </ul>
                </div>
              </div>

              <div class="support-card">
                <div class="support-header">
                  <i class="fab fa-yarn"></i>
                  <h4>Yarn</h4>
                </div>
                <div class="support-content">
                  <ul>
                    <li><i class="fas fa-check"></i> 广泛采用的替代方案</li>
                    <li><i class="fas fa-check"></i> 与 npm 生态系统高度兼容</li>
                    <li><i class="fas fa-check"></i> 良好的工具支持</li>
                    <li><i class="fas fa-times"></i> 某些边缘情况可能存在兼容性问题</li>
                  </ul>
                </div>
              </div>

              <div class="support-card">
                <div class="support-header">
                  <i class="fas fa-box"></i>
                  <h4>pnpm</h4>
                </div>
                <div class="support-content">
                  <ul>
                    <li><i class="fas fa-check"></i> 兼容 npm 包生态系统</li>
                    <li><i class="fas fa-check"></i> 支持 package.json 和 npm 命令</li>
                    <li><i class="fas fa-times"></i> 某些工具可能不兼容符号链接</li>
                    <li><i class="fas fa-times"></i> 旧版 Node.js 支持有限</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="compatibility-table">
              <h3>工具兼容性对比</h3>
              <table>
                <thead>
                  <tr>
                    <th>工具/环境</th>
                    <th>npm</th>
                    <th>Yarn</th>
                    <th>pnpm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Node.js</td>
                    <td><i class="fas fa-check"></i> 完美支持</td>
                    <td><i class="fas fa-check"></i> 完美支持</td>
                    <td><i class="fas fa-check"></i> 需要 Node.js 12+</td>
                  </tr>
                  <tr>
                    <td>React/Vue/Angular</td>
                    <td><i class="fas fa-check"></i> 支持</td>
                    <td><i class="fas fa-check"></i> 支持</td>
                    <td><i class="fas fa-check"></i> 支持</td>
                  </tr>
                  <tr>
                    <td>Docker</td>
                    <td><i class="fas fa-check"></i> 支持</td>
                    <td><i class="fas fa-check"></i> 支持</td>
                    <td><i class="fas fa-check"></i> 需要额外配置</td>
                  </tr>
                  <tr>
                    <td>CI/CD 系统</td>
                    <td><i class="fas fa-check"></i> 全面支持</td>
                    <td><i class="fas fa-check"></i> 全面支持</td>
                    <td><i class="fas fa-check"></i> 大多数支持</td>
                  </tr>
                  <tr>
                    <td>Heroku/Vercel</td>
                    <td><i class="fas fa-check"></i> 原生支持</td>
                    <td><i class="fas fa-check"></i> 原生支持</td>
                    <td><i class="fas fa-check"></i> 需要配置</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="conclusion" class="section">
          <div class="section-header">
            <i class="fas fa-flag-checkered"></i>
            <h2>总结与推荐</h2>
          </div>

          <div class="content-card">
            <div class="final-comparison">
              <h3>场景化推荐</h3>
              <div class="recommendations">
                <div class="recommendation">
                  <h4>新项目</h4>
                  <p><i class="fas fa-star"></i> 推荐 pnpm：性能优异，节省磁盘空间</p>
                  <div class="code-block">
                    <pre><code>npm install -g pnpm
pnpm create vite@latest my-project</code></pre>
                  </div>
                </div>

                <div class="recommendation">
                  <h4>大型项目/Monorepo</h4>
                  <p><i class="fas fa-star"></i> 推荐 pnpm 或 Yarn：优秀的工作区支持</p>
                  <div class="code-block">
                    <pre><code># pnpm
pnpm init

# Yarn
yarn init -w</code></pre>
                  </div>
                </div>

                <div class="recommendation">
                  <h4>兼容性优先</h4>
                  <p><i class="fas fa-star"></i> 推荐 npm：最广泛的兼容性</p>
                  <div class="code-block">
                    <pre><code>npm init
npm install</code></pre>
                  </div>
                </div>
              </div>

              <div class="migration-tips">
                <h3>迁移指南</h3>
                <div class="tips">
                  <div class="tip">
                    <h4>npm → Yarn</h4>
                    <ol>
                      <li>删除 node_modules 和 package-lock.json</li>
                      <li>安装 Yarn: <code>npm install -g yarn</code></li>
                      <li>运行 <code>yarn install</code></li>
                    </ol>
                  </div>

                  <div class="tip">
                    <h4>npm/Yarn → pnpm</h4>
                    <ol>
                      <li>删除 node_modules 和 lock 文件</li>
                      <li>安装 pnpm: <code>npm install -g pnpm</code></li>
                      <li>运行 <code>pnpm import</code> 迁移 lock 文件</li>
                      <li>运行 <code>pnpm install</code></li>
                    </ol>
                  </div>
                </div>
              </div>

              <div class="final-verdict">
                <h3>最终结论</h3>
                <div class="verdict-content">
                  <div class="verdict-card">
                    <i class="fas fa-crown"></i>
                    <h4>性能王者</h4>
                    <p>pnpm - 最快的安装速度和最小的磁盘占用</p>
                  </div>

                  <div class="verdict-card">
                    <i class="fas fa-balance-scale"></i>
                    <h4>平衡之选</h4>
                    <p>Yarn - 成熟稳定，功能丰富</p>
                  </div>

                  <div class="verdict-card">
                    <i class="fas fa-shield-alt"></i>
                    <h4>安全选择</h4>
                    <p>npm - 官方支持，最佳兼容性</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>npm vs Yarn vs pnpm 深度对比 | Vue3 + TypeScript 实现</p>
      <p> 前端工程化研究</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 活动导航项
const activeSection = ref('overview');
const activeManager = ref('pnpm');

// 导航部分
const sections = ref([
  { id: 'overview', title: '概览', icon: 'fas fa-list' },
  { id: 'resolution', title: '包解析', icon: 'fas fa-search' },
  { id: 'performance', title: '性能', icon: 'fas fa-tachometer-alt' },
  { id: 'dependencies', title: '依赖管理', icon: 'fas fa-code-branch' },
  { id: 'ecosystem', title: '生态系统', icon: 'fas fa-globe' },
  { id: 'conclusion', title: '总结', icon: 'fas fa-flag-checkered' }
]);

// 关键差异数据
const keyDiffs = ref([
  { feature: '安装速度', npm: '慢', yarn: '快', pnpm: '极快' },
  { feature: '磁盘空间', npm: '高', yarn: '高', pnpm: '极低' },
  { feature: '锁定文件', npm: '✓', yarn: '✓', pnpm: '✓' },
  { feature: '离线模式', npm: '✓', yarn: '✓', pnpm: '✓' },
  { feature: '工作区支持', npm: '✓', yarn: '✓', pnpm: '✓' },
  { feature: '安全审计', npm: '✓', yarn: '✓', pnpm: '✓' },
  { feature: '严格依赖隔离', npm: '✗', yarn: '✗', pnpm: '✓' },
  { feature: '符号链接', npm: '✗', yarn: '✗', pnpm: '✓' },
  { feature: '全局存储', npm: '✗', yarn: '✗', pnpm: '✓' }
]);

// 滚动监听
const handleScroll = () => {
  const sectionElements = sections.value.map(s =>
    document.getElementById(s.id)
  ).filter(Boolean) as HTMLElement[];

  const scrollPosition = window.scrollY + 100;

  sectionElements.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight) {
      activeSection.value = section.id;
    }
  });
};

// 滚动到指定区域
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = id;
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less" scoped>



// 变量定义
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@text-color: #2b2d42;
@light-bg: #f8f9fa;
@border-color: #e9ecef;
@card-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
@sidebar-width: 280px;

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  color: @text-color;
  line-height: 1.6;
  background-color: #f0f2f5;
  overflow-x: hidden;
}

.package-managers-comparison {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}

// 页眉样式
.header {
  background: linear-gradient(135deg, darken(@secondary-color, 10%), @primary-color);
  color: white;
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;

  .header-content {
    max-width: 800px;
    margin: 0 auto 2rem;
    text-align: center;
    z-index: 2;
    position: relative;

    h1 {
      font-size: 2.6rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.3rem;
      opacity: 0.9;
    }
  }
}

.package-managers-icons {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 1rem;

  .manager-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.7;
    transition: all 0.3s;
    cursor: pointer;

    i {
      font-size: 3.5rem;
      margin-bottom: 0.5rem;
    }

    span {
      font-size: 1.1rem;
      font-weight: 500;
    }

    &.active {
      opacity: 1;
      transform: scale(1.1);

      &.npm i {
        color: #cb3837;
      }

      &.yarn i {
        color: #2c8ebb;
      }

      &.pnpm i {
        color: #f69220;
      }
    }

    &:hover {
      opacity: 1;
    }
  }
}

// 内容布局
.content-container {
  display: flex;
  flex: 1;
}

.sidebar {
  width: @sidebar-width;
  background: @light-bg;
  border-right: 1px solid @border-color;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: calc(100vh - 80px);

  nav ul {
    list-style: none;
    flex: 1;

    li {
      margin-bottom: 0.3rem;
    }

    a {
      display: flex;
      align-items: center;
      padding: 0.9rem 1.5rem;
      text-decoration: none;
      color: @text-color;
      font-weight: 500;
      transition: all 0.3s ease;
      border-left: 4px solid transparent;

      i {
        font-size: 1.1rem;
        width: 25px;
        margin-right: 0.8rem;
      }

      &:hover {
        background: rgba(@primary-color, 0.05);
        color: @primary-color;
      }

      &.active {
        background: rgba(@primary-color, 0.1);
        color: @primary-color;
        border-left: 4px solid @primary-color;
        font-weight: 600;
      }
    }
  }
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid @border-color;

  .recommendation {
    display: flex;
    align-items: center;
    background: rgba(@accent-color, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    color: darken(@accent-color, 20%);
    font-weight: 500;

    i {
      font-size: 1.2rem;
      color: @accent-color;
      margin-right: 0.7rem;
    }
  }
}

.main-content {
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
}

// 章节样式
.section {
  margin-bottom: 3rem;

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    i {
      font-size: 1.8rem;
      color: @primary-color;
      margin-right: 1rem;
    }

    h2 {
      font-size: 1.8rem;
      color: @secondary-color;
    }
  }
}

.content-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @card-shadow;
  margin-bottom: 2rem;
  border: 1px solid @border-color;

  h3 {
    font-size: 1.4rem;
    margin: 1.5rem 0 1rem;
    color: @primary-color;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-color;
  }

  h4 {
    font-size: 1.2rem;
    margin: 1.2rem 0 0.8rem;
    color: darken(@text-color, 10%);
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
  }
}

// 管理器卡片
.managers-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .manager-card {
    background: #f9f9f9;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid @border-color;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    .manager-header {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      background: rgba(@primary-color, 0.05);

      i {
        font-size: 2.5rem;
        margin-right: 1rem;

        &.fa-npm {
          color: #cb3837;
        }

        &.fa-yarn {
          color: #2c8ebb;
        }

        &.fa-box {
          color: #f69220;
        }
      }

      h3 {
        margin: 0;
        font-size: 1.5rem;
      }
    }

    .manager-info {
      padding: 1.5rem;

      .release-info {
        display: flex;
        align-items: center;
        margin-top: 1rem;
        color: #6c757d;

        i {
          margin-right: 0.5rem;
        }
      }
    }
  }
}

// 差异表格
.differences-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid @border-color;
  }

  th {
    background: @light-bg;
    font-weight: 600;
  }

  tr:hover {
    background: rgba(@primary-color, 0.03);
  }

  .highlight {
    font-weight: bold;
    color: @primary-color;
  }

  .fa-check {
    color: #28a745;
  }

  .fa-times {
    color: #dc3545;
  }
}

// 解析方法
.resolution-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .method {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid @border-color;

    h4 {
      margin-top: 0;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @border-color;
    }
  }
}

// 文件夹结构可视化
.folder-structure {
  margin-top: 1rem;
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9rem;

  .folder {
    background: #e9ecef;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.3rem;
    position: relative;

    &::before {
      content: '📁';
      margin-right: 0.5rem;
    }
  }

  .nested {
    margin-left: 1.5rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -10px;
      top: 0;
      height: 100%;
      width: 2px;
      background: #dee2e6;
    }
  }

  .link::before {
    content: '🔗';
    margin-right: 0.5rem;
  }

  .tree-store {
    background: #d4edda;
    padding: 0.5rem;
    border-radius: 4px;
    margin-top: 0.5rem;
    text-align: center;
  }
}

// 性能图表
.performance-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin: 2rem 0;

  .chart {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid @border-color;
  }
}

.chart-bars {
  margin-top: 1rem;

  .bar-container {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
  }

  .bar-label {
    width: 80px;
    font-weight: 500;
  }

  .bar {
    height: 30px;
    background: linear-gradient(to right, @accent-color, lighten(@accent-color, 20%));
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 1rem;
    transition: width 1s ease;

    .bar-value {
      color: white;
      font-weight: bold;
    }
  }
}

// 响应式调整
@media (max-width: 1100px) {
  .content-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid @border-color;
  }

  .main-content {
    padding: 1.5rem;
  }

  .header {
    padding: 1.5rem;

    .header-content h1 {
      font-size: 2rem;
    }
  }

  .package-managers-icons {
    gap: 1.5rem;

    .manager-icon i {
      font-size: 2.5rem;
    }
  }
}

@media (max-width: 768px) {

  .managers-overview,
  .resolution-methods,
  .performance-charts {
    grid-template-columns: 1fr;
  }

  .package-managers-icons {
    flex-wrap: wrap;
  }
}
</style>
