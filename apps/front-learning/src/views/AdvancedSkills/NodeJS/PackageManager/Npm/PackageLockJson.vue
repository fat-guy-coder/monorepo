<template>
  <div class="package-lock-guide">
    <header class="header">
      <div class="header-content">
        <h1>package-lock.json 基本介绍</h1>
        <p>深入理解 Node.js 依赖锁定的核心机制</p>
      </div>
      <div class="lock-visualization">
        <div class="lock-icon">
          <i class="fas fa-lock"></i>
        </div>
        <div class="lock-description">
          <p>确保项目依赖树的<strong>一致性</strong>和<strong>可重现性</strong></p>
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
          <div class="lock-indicator">
            <i class="fas fa-lock"></i>
            <span>依赖锁定已启用</span>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <section id="introduction" class="section">
          <div class="section-header">
            <i class="fas fa-file-alt"></i>
            <h2>package-lock.json 简介</h2>
          </div>

          <div class="content-card">
            <div class="intro-content">
              <div class="intro-text">
                <p><strong>package-lock.json</strong> 是由 npm 自动生成的文件，用于精确描述项目依赖树的当前状态。</p>

                <div class="key-points">
                  <h3>核心作用：</h3>
                  <ul>
                    <li><i class="fas fa-fingerprint"></i> <strong>锁定依赖版本</strong> - 精确记录每个依赖的具体版本</li>
                    <li><i class="fas fa-sync-alt"></i> <strong>确保安装一致性</strong> - 在不同环境重现相同的 node_modules</li>
                    <li><i class="fas fa-tachometer-alt"></i> <strong>优化安装性能</strong> - 加速后续依赖安装过程</li>
                    <li><i class="fas fa-code-branch"></i> <strong>描述依赖树结构</strong> - 记录依赖之间的嵌套关系</li>
                  </ul>
                </div>

                <div class="creation-info">
                  <h3>生成与更新</h3>
                  <div class="creation-methods">
                    <div class="method">
                      <h4>生成</h4>
                      <p>在项目目录执行：</p>
                      <pre><code>npm install</code></pre>
                    </div>
                    <div class="method">
                      <h4>更新</h4>
                      <p>当修改 package.json 后执行：</p>
                      <pre><code>npm install</code></pre>
                    </div>
                  </div>
                </div>
              </div>

              <div class="file-structure">
                <h3>基本结构</h3>
                <pre class="code-block">{
  "name": "my-project",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": { ... },
  "dependencies": {
    "lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4g..."
    }
  }
}</pre>
              </div>
            </div>

            <div class="vs-package-json">
              <h3>package-lock.json vs package.json</h3>
              <div class="comparison">
                <div class="comparison-item">
                  <div class="comparison-header">
                    <i class="fas fa-file-code"></i>
                    <h4>package.json</h4>
                  </div>
                  <ul>
                    <li>开发者手动维护</li>
                    <li>定义项目元数据和依赖范围</li>
                    <li>使用语义化版本范围 (^, ~)</li>
                    <li>不描述完整的依赖树</li>
                  </ul>
                </div>

                <div class="comparison-item">
                  <div class="comparison-header">
                    <i class="fas fa-lock"></i>
                    <h4>package-lock.json</h4>
                  </div>
                  <ul>
                    <li>npm 自动生成</li>
                    <li>记录精确的依赖版本</li>
                    <li>描述完整的依赖树结构</li>
                    <li>确保安装结果的一致性</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="structure" class="section">
          <div class="section-header">
            <i class="fas fa-sitemap"></i>
            <h2>文件结构基础介绍</h2>
          </div>

          <div class="content-card">
            <h3>核心字段解析</h3>

            <div class="structure-grid">
              <div class="structure-item">
                <div class="structure-header">
                  <i class="fas fa-key"></i>
                  <h3>lockfileVersion</h3>
                </div>
                <div class="structure-content">
                  <p><strong>锁定文件版本</strong></p>
                  <ul>
                    <li>表示 package-lock.json 的格式版本</li>
                    <li>版本 1: npm v5 和 v6</li>
                    <li>版本 2: npm v7 (向后兼容)</li>
                    <li>版本 3: npm v7+ (新格式)</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"lockfileVersion": 3</code></pre>
                  </div>
                </div>
              </div>

              <div class="structure-item">
                <div class="structure-header">
                  <i class="fas fa-signature"></i>
                  <h3>name & version</h3>
                </div>
                <div class="structure-content">
                  <p><strong>项目名称和版本</strong></p>
                  <ul>
                    <li>从 package.json 中复制而来</li>
                    <li>标识当前项目的元数据</li>
                    <li>确保锁定文件与项目匹配</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"name": "my-project",
"version": "1.0.0"</code></pre>
                  </div>
                </div>
              </div>

              <div class="structure-item">
                <div class="structure-header">
                  <i class="fas fa-box"></i>
                  <h3>packages</h3>
                </div>
                <div class="structure-content">
                  <p><strong>包详细信息 (lockfileVersion 3)</strong></p>
                  <ul>
                    <li>包含所有依赖包的详细信息</li>
                    <li>使用项目相对路径作为键</li>
                    <li>替代旧版的 dependencies 字段</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"packages": {
  "": {
    "name": "my-project",
    "version": "1.0.0",
    "dependencies": { ... }
  },
  "node_modules/lodash": {
    "version": "4.17.21",
    "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
    "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4g..."
  }
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="structure-item">
                <div class="structure-header">
                  <i class="fas fa-code-branch"></i>
                  <h3>dependencies</h3>
                </div>
                <div class="structure-content">
                  <p><strong>依赖树结构 (lockfileVersion 1-2)</strong></p>
                  <ul>
                    <li>在 lockfileVersion 1-2 中使用</li>
                    <li>描述项目的完整依赖树</li>
                    <li>包含嵌套的依赖关系</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"dependencies": {
  "lodash": {
    "version": "4.17.21",
    "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
    "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4g...",
    "requires": {
      "other-package": "^1.0.0"
    }
  }
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="structure-item">
                <div class="structure-header">
                  <i class="fas fa-hashtag"></i>
                  <h3>version</h3>
                </div>
                <div class="structure-content">
                  <p><strong>精确版本号</strong></p>
                  <ul>
                    <li>依赖包的确切版本</li>
                    <li>避免语义化版本范围的不确定性</li>
                    <li>格式：主版本.次版本.修订号</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"version": "4.17.21"</code></pre>
                  </div>
                </div>
              </div>

              <div class="structure-item">
                <div class="structure-header">
                  <i class="fas fa-link"></i>
                  <h3>resolved</h3>
                </div>
                <div class="structure-content">
                  <p><strong>下载地址</strong></p>
                  <ul>
                    <li>依赖包的实际下载 URL</li>
                    <li>确保从相同来源获取包</li>
                    <li>避免镜像源不一致导致的问题</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz"</code></pre>
                  </div>
                </div>
              </div>

              <div class="structure-item">
                <div class="structure-header">
                  <i class="fas fa-fingerprint"></i>
                  <h3>integrity</h3>
                </div>
                <div class="structure-content">
                  <p><strong>完整性校验</strong></p>
                  <ul>
                    <li>基于内容的哈希校验值</li>
                    <li>使用 Subresource Integrity (SRI) 格式</li>
                    <li>确保下载的包未被篡改</li>
                    <li>格式：算法-哈希值</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4g..."</code></pre>
                  </div>
                </div>
              </div>

              <div class="structure-item">
                <div class="structure-header">
                  <i class="fas fa-layer-group"></i>
                  <h3>requires</h3>
                </div>
                <div class="structure-content">
                  <p><strong>依赖要求</strong></p>
                  <ul>
                    <li>指定依赖包自身所需的依赖</li>
                    <li>使用语义化版本范围</li>
                    <li>帮助 npm 解析依赖树</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"requires": {
  "other-package": "^1.0.0"
}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" class="section">
          <div class="section-header">
            <i class="fas fa-cogs"></i>
            <h2>工作原理与流程</h2>
          </div>

          <div class="content-card">
            <h3>package-lock.json 工作流程</h3>

            <div class="workflow-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>安装依赖</h4>
                  <p>开发者运行 <code>npm install</code></p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>解析依赖树</h4>
                  <p>npm 解析 package.json 中的依赖</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>生成/更新锁定文件</h4>
                  <p>创建或更新 package-lock.json</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>精确安装依赖</h4>
                  <p>根据锁定文件安装指定版本的依赖</p>
                </div>
              </div>
            </div>

            <div class="workflow-visual">
              <h3>依赖锁定过程</h3>
              <div class="visual-container">
                <div class="visual-row">
                  <div class="visual-item">
                    <div class="visual-header">package.json</div>
                    <div class="visual-content">
                      <div class="dependency">"lodash": "^4.17.0"</div>
                    </div>
                  </div>
                  <div class="arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                  <div class="visual-item">
                    <div class="visual-header">package-lock.json</div>
                    <div class="visual-content">
                      <div class="dependency">"version": "4.17.21"</div>
                      <div class="dependency">"resolved": "https://..."</div>
                      <div class="dependency">"integrity": "sha512-..."</div>
                    </div>
                  </div>
                  <div class="arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                  <div class="visual-item">
                    <div class="visual-header">node_modules</div>
                    <div class="visual-content">
                      <div class="dependency">lodash@4.17.21</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="lockfile-update">
              <h3>更新锁定文件的场景</h3>
              <div class="update-scenarios">
                <div class="scenario">
                  <div class="scenario-icon">
                    <i class="fas fa-plus"></i>
                  </div>
                  <div class="scenario-content">
                    <h4>添加新依赖</h4>
                    <p><code>npm install &lt;package&gt;</code></p>
                  </div>
                </div>

                <div class="scenario">
                  <div class="scenario-icon">
                    <i class="fas fa-minus"></i>
                  </div>
                  <div class="scenario-content">
                    <h4>移除依赖</h4>
                    <p><code>npm uninstall &lt;package&gt;</code></p>
                  </div>
                </div>

                <div class="scenario">
                  <div class="scenario-icon">
                    <i class="fas fa-sync-alt"></i>
                  </div>
                  <div class="scenario-content">
                    <h4>更新依赖</h4>
                    <p><code>npm update</code></p>
                  </div>
                </div>

                <div class="scenario">
                  <div class="scenario-icon">
                    <i class="fas fa-edit"></i>
                  </div>
                  <div class="scenario-content">
                    <h4>手动修改 package.json</h4>
                    <p>更改依赖版本后运行 <code>npm install</code></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="best-practices" class="section">
          <div class="section-header">
            <i class="fas fa-star"></i>
            <h2>最佳实践</h2>
          </div>

          <div class="content-card">
            <h3>package-lock.json 管理指南</h3>

            <div class="practices">
              <div class="practice">
                <div class="practice-header">
                  <i class="fas fa-check-circle"></i>
                  <h4>提交到版本控制</h4>
                </div>
                <div class="practice-content">
                  <p>始终将 package-lock.json 提交到 Git 仓库：</p>
                  <ul>
                    <li>确保所有开发者使用相同的依赖版本</li>
                    <li>保证 CI/CD 环境的一致性</li>
                    <li>避免 "在我机器上可以运行" 的问题</li>
                  </ul>
                </div>
              </div>

              <div class="practice">
                <div class="practice-header">
                  <i class="fas fa-sync-alt"></i>
                  <h4>定期更新依赖</h4>
                </div>
                <div class="practice-content">
                  <p>使用正确命令更新依赖：</p>
                  <div class="update-commands">
                    <div class="command">
                      <h5>检查过时依赖</h5>
                      <pre><code>npm outdated</code></pre>
                    </div>
                    <div class="command">
                      <h5>更新所有依赖</h5>
                      <pre><code>npm update</code></pre>
                    </div>
                    <div class="command">
                      <h5>更新单个依赖</h5>
                      <pre><code>npm update &lt;package&gt;</code></pre>
                    </div>
                  </div>
                </div>
              </div>

              <div class="practice">
                <div class="practice-header">
                  <i class="fas fa-exclamation-triangle"></i>
                  <h4>避免手动修改</h4>
                </div>
                <div class="practice-content">
                  <p>不要手动编辑 package-lock.json：</p>
                  <ul>
                    <li>由 npm 自动维护</li>
                    <li>手动修改可能导致依赖冲突</li>
                    <li>如有问题，删除并重新生成</li>
                  </ul>
                </div>
              </div>

              <div class="practice">
                <div class="practice-header">
                  <i class="fas fa-code-branch"></i>
                  <h4>处理合并冲突</h4>
                </div>
                <div class="practice-content">
                  <p>解决 Git 合并冲突的正确方法：</p>
                  <ol>
                    <li>备份当前 package-lock.json</li>
                    <li>接受传入的更改或保留当前更改</li>
                    <li>运行 <code>npm install</code> 重新生成正确的锁定文件</li>
                    <li>提交重新生成的 package-lock.json</li>
                  </ol>
                </div>
              </div>
            </div>

            <div class="lockfile-version">
              <h3>不同 npm 版本的锁定文件</h3>
              <table class="version-table">
                <thead>
                  <tr>
                    <th>npm 版本</th>
                    <th>lockfileVersion</th>
                    <th>主要变化</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>v5-v6</td>
                    <td>1</td>
                    <td>初始版本，使用 dependencies 字段</td>
                  </tr>
                  <tr>
                    <td>v7</td>
                    <td>2</td>
                    <td>向后兼容，支持嵌套依赖</td>
                  </tr>
                  <tr>
                    <td>v7+</td>
                    <td>3</td>
                    <td>新格式，使用 packages 字段</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="troubleshooting" class="section">
          <div class="section-header">
            <i class="fas fa-wrench"></i>
            <h2>常见问题解决</h2>
          </div>

          <div class="content-card">
            <h3>package-lock.json 问题排查</h3>

            <div class="issues">
              <div class="issue">
                <div class="issue-header">
                  <i class="fas fa-exclamation-circle"></i>
                  <h4>依赖安装不一致</h4>
                </div>
                <div class="issue-solution">
                  <p><strong>原因</strong>：package-lock.json 未提交或未更新</p>
                  <p><strong>解决方案</strong>：</p>
                  <ol>
                    <li>确保 package-lock.json 已提交到版本控制</li>
                    <li>删除 node_modules 和 package-lock.json</li>
                    <li>运行 <code>npm install</code> 重新生成锁定文件</li>
                  </ol>
                </div>
              </div>

              <div class="issue">
                <div class="issue-header">
                  <i class="fas fa-bug"></i>
                  <h4>CI/CD 构建失败</h4>
                </div>
                <div class="issue-solution">
                  <p><strong>原因</strong>：锁定文件与 package.json 不匹配</p>
                  <p><strong>解决方案</strong>：</p>
                  <ol>
                    <li>检查 CI 配置是否包含 package-lock.json</li>
                    <li>确保 CI 使用与本地相同的 npm 版本</li>
                    <li>在 CI 脚本中添加 <code>npm ci</code> 代替 <code>npm install</code></li>
                  </ol>
                </div>
              </div>

              <div class="issue">
                <div class="issue-header">
                  <i class="fas fa-times-circle"></i>
                  <h4>完整性校验失败</h4>
                </div>
                <div class="issue-solution">
                  <p><strong>原因</strong>：下载的包与预期哈希值不匹配</p>
                  <p><strong>解决方案</strong>：</p>
                  <ol>
                    <li>清除 npm 缓存：<code>npm cache clean --force</code></li>
                    <li>删除 node_modules 和 package-lock.json</li>
                    <li>重新运行 <code>npm install</code></li>
                    <li>检查网络环境是否安全</li>
                  </ol>
                </div>
              </div>
            </div>

            <div class="ci-recommendation">
              <h3>CI/CD 环境推荐命令</h3>
              <div class="ci-command">
                <h4>npm ci</h4>
                <p>专为持续集成设计的命令：</p>
                <ul>
                  <li>根据 package-lock.json 精确安装依赖</li>
                  <li>删除现有 node_modules 重新安装</li>
                  <li>比 npm install 更快、更可靠</li>
                  <li>如果 package-lock.json 过时会报错</li>
                </ul>
                <div class="code-block">
                  <pre><code># CI/CD 环境推荐使用
npm ci

# 替代传统的
npm install</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section conclusion">
          <div class="section-header">
            <i class="fas fa-flag-checkered"></i>
            <h2>总结</h2>
          </div>

          <div class="content-card">
            <div class="summary">
              <p>package-lock.json 是现代 JavaScript 开发中不可或缺的工具，它解决了依赖管理的核心问题：确保在不同环境和时间点能够重现完全相同的依赖树。</p>

              <div class="key-takeaways">
                <h3>核心要点</h3>
                <ul>
                  <li>始终将 package-lock.json 提交到版本控制系统</li>
                  <li>使用 <code>npm ci</code> 在 CI/CD 环境中安装依赖</li>
                  <li>避免手动编辑 package-lock.json</li>
                  <li>定期更新依赖以获取安全补丁和新功能</li>
                  <li>使用相同的 npm 版本以避免锁定文件格式问题</li>
                </ul>
              </div>

              <div class="final-tip">
                <i class="fas fa-lightbulb"></i>
                <div class="tip-content">
                  <p>正确使用 package-lock.json 可以节省大量调试时间，避免"在我机器上可以运行"的问题，确保团队协作和部署过程更加顺畅可靠。</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>package-lock.json 基本介绍 | Vue3 + TypeScript 实现</p>
      <p> Node.js 开发文档</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 活动导航项
const activeSection = ref('introduction');

// 导航部分
const sections = ref([
  { id: 'introduction', title: '简介', icon: 'fas fa-file-alt' },
  { id: 'structure', title: '文件结构', icon: 'fas fa-sitemap' },
  { id: 'workflow', title: '工作原理', icon: 'fas fa-cogs' },
  { id: 'best-practices', title: '最佳实践', icon: 'fas fa-star' },
  { id: 'troubleshooting', title: '问题排查', icon: 'fas fa-wrench' }
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

.package-lock-guide {
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

.lock-visualization {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 1.5rem;

  .lock-icon {
    font-size: 3rem;
    margin-right: 1.5rem;
    color: #ffd700;
  }

  .lock-description {
    font-size: 1.2rem;
    font-weight: 500;
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

  .lock-indicator {
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

// 代码块样式
.code-block,
.code-snippet {
  background: #2b2b2b;
  color: #f8f8f2;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Source Code Pro', monospace;
  margin: 1rem 0;
  padding: 1.2rem;

  pre {
    margin: 0;
  }

  code {
    display: block;
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

// 结构网格
.structure-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  .structure-item {
    background: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid @border-color;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
  }

  .structure-header {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    background: rgba(@primary-color, 0.05);
    border-bottom: 1px solid @border-color;

    i {
      font-size: 1.5rem;
      color: @primary-color;
      margin-right: 1rem;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
      color: @primary-color;
    }
  }

  .structure-content {
    padding: 1.5rem;

    p {
      margin-top: 0;
      font-weight: 500;
    }
  }
}

// 工作流程步骤
.workflow-steps {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;

  .step {
    text-align: center;
    flex: 1;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 20px;
      right: -10px;
      width: 20px;
      height: 20px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234361ee'%3E%3Cpath d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'/%3E%3C/svg%3E");
      background-size: contain;
    }

    &:last-child::after {
      display: none;
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0 auto 1rem;
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

  .workflow-steps {
    flex-wrap: wrap;

    .step {
      flex: 0 0 50%;
      margin-bottom: 2rem;

      &::after {
        display: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .structure-grid {
    grid-template-columns: 1fr;
  }

  .workflow-steps .step {
    flex: 0 0 100%;
  }
}
</style>
