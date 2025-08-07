<template>
<div class="package-json-guide">
    <header class="header">
      <div class="header-content">
        <h1>package.json 基本介绍</h1>
        <p>Node.js 项目的核心配置文件基础介绍</p>
      </div>
      <div class="json-visualization">
        <div class="json-bracket">{</div>
        <div class="json-line">"name": "my-project",</div>
        <div class="json-line">"version": "1.0.0",</div>
        <div class="json-line">"description": "项目描述",</div>
        <div class="json-line">"scripts": { ... },</div>
        <div class="json-line">"dependencies": { ... }</div>
        <div class="json-bracket">}</div>
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
          <div class="file-indicator">
            <i class="fas fa-file-code"></i>
            <span>package.json</span>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <section id="introduction" class="section">
          <div class="section-header">
            <i class="fas fa-file-alt"></i>
            <h2>package.json 简介</h2>
          </div>

          <div class="content-card">
            <div class="intro-content">
              <div class="intro-text">
                <p><strong>package.json</strong> 是 Node.js 项目的核心配置文件，用于定义项目元数据、管理依赖项、配置脚本任务以及设置项目相关配置。</p>

                <div class="key-points">
                  <h3>核心作用：</h3>
                  <ul>
                    <li><i class="fas fa-box"></i> 管理项目依赖项 (dependencies & devDependencies)</li>
                    <li><i class="fas fa-terminal"></i> 定义可执行脚本 (scripts)</li>
                    <li><i class="fas fa-info-circle"></i> 存储项目元数据 (名称、版本、描述等)</li>
                    <li><i class="fas fa-cog"></i> 配置项目设置 (如入口文件、引擎要求等)</li>
                    <li><i class="fas fa-lock"></i> 锁定依赖版本 (与 package-lock.json 或 yarn.lock 配合)</li>
                  </ul>
                </div>
              </div>

              <div class="file-structure">
                <h3>基本结构</h3>
                <pre class="code-block">{
  "name": "项目名称",
  "version": "1.0.0",
  "description": "项目描述",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "build": "webpack"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "eslint": "^7.32.0"
  }
}</pre>
              </div>
            </div>

            <div class="creation-methods">
              <h3>创建 package.json</h3>
              <div class="methods">
                <div class="method">
                  <div class="method-icon">
                    <i class="fab fa-npm"></i>
                  </div>
                  <div class="method-content">
                    <h4>npm</h4>
                    <pre><code>npm init</code></pre>
                    <p>交互式创建 package.json</p>
                  </div>
                </div>

                <div class="method">
                  <div class="method-icon">
                    <i class="fab fa-yarn"></i>
                  </div>
                  <div class="method-content">
                    <h4>Yarn</h4>
                    <pre><code>yarn init</code></pre>
                    <p>交互式创建 package.json</p>
                  </div>
                </div>

                <div class="method">
                  <div class="method-icon">
                    <i class="fas fa-file"></i>
                  </div>
                  <div class="method-content">
                    <h4>手动创建</h4>
                    <pre><code>touch package.json</code></pre>
                    <p>手动创建并填充内容</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="metadata" class="section">
          <div class="section-header">
            <i class="fas fa-info-circle"></i>
            <h2>项目元数据配置</h2>
          </div>

          <div class="content-card">
            <div class="metadata-grid">
              <div class="metadata-item">
                <div class="metadata-header">
                  <i class="fas fa-signature"></i>
                  <h3>name</h3>
                </div>
                <div class="metadata-content">
                  <p><strong>项目名称</strong></p>
                  <ul>
                    <li>必须是小写字母</li>
                    <li>可以包含连字符和下划线</li>
                    <li>发布到 npm 时必须是唯一名称</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"name": "my-awesome-project"</code></pre>
                  </div>
                </div>
              </div>

              <div class="metadata-item">
                <div class="metadata-header">
                  <i class="fas fa-code-branch"></i>
                  <h3>version</h3>
                </div>
                <div class="metadata-content">
                  <p><strong>项目版本号</strong></p>
                  <ul>
                    <li>遵循语义化版本规范 (SemVer)</li>
                    <li>格式：主版本号.次版本号.修订号</li>
                    <li>示例：1.0.0, 2.5.3, 3.0.0-beta.1</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"version": "1.0.0"</code></pre>
                  </div>
                </div>
              </div>

              <div class="metadata-item">
                <div class="metadata-header">
                  <i class="fas fa-align-left"></i>
                  <h3>description</h3>
                </div>
                <div class="metadata-content">
                  <p><strong>项目描述</strong></p>
                  <ul>
                    <li>项目的简短描述</li>
                    <li>在 npm 上搜索时会显示</li>
                    <li>应该清晰简洁</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"description": "一个现代化的Web应用"</code></pre>
                  </div>
                </div>
              </div>

              <div class="metadata-item">
                <div class="metadata-header">
                  <i class="fas fa-home"></i>
                  <h3>homepage</h3>
                </div>
                <div class="metadata-content">
                  <p><strong>项目主页</strong></p>
                  <ul>
                    <li>项目网站或文档的URL</li>
                    <li>在 npm 上显示为项目链接</li>
                    <li>可选字段</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"homepage": "https://example.com"</code></pre>
                  </div>
                </div>
              </div>

              <div class="metadata-item">
                <div class="metadata-header">
                  <i class="fas fa-book"></i>
                  <h3>repository</h3>
                </div>
                <div class="metadata-content">
                  <p><strong>代码仓库</strong></p>
                  <ul>
                    <li>项目源代码的仓库信息</li>
                    <li>可以是 GitHub、GitLab 等</li>
                    <li>格式：{ "type": "git", "url": "https://github.com/user/repo" }</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"repository": {
  "type": "git",
  "url": "https://github.com/user/repo.git"
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="metadata-item">
                <div class="metadata-header">
                  <i class="fas fa-user"></i>
                  <h3>author</h3>
                </div>
                <div class="metadata-content">
                  <p><strong>作者信息</strong></p>
                  <ul>
                    <li>项目作者或维护者</li>
                    <li>格式：姓名 &lt;邮箱&gt; (网站)</li>
                    <li>也可以使用对象格式</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"author": "张三 &lt;zhangsan@example.com&gt; (https://zhangsan.dev)"</code></pre>
                  </div>
                </div>
              </div>

              <div class="metadata-item">
                <div class="metadata-header">
                  <i class="fas fa-users"></i>
                  <h3>contributors</h3>
                </div>
                <div class="metadata-content">
                  <p><strong>贡献者列表</strong></p>
                  <ul>
                    <li>项目贡献者数组</li>
                    <li>格式同 author</li>
                    <li>可选字段</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"contributors": [
  "李四 &lt;lisi@example.com&gt;",
  "王五 &lt;wangwu@example.com&gt;"
]</code></pre>
                  </div>
                </div>
              </div>

              <div class="metadata-item">
                <div class="metadata-header">
                  <i class="fas fa-file"></i>
                  <h3>license</h3>
                </div>
                <div class="metadata-content">
                  <p><strong>许可证</strong></p>
                  <ul>
                    <li>项目的开源许可证</li>
                    <li>常见许可证：MIT、Apache-2.0、GPL-3.0</li>
                    <li>使用 SPDX 许可证标识符</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"license": "MIT"</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="dependencies" class="section">
          <div class="section-header">
            <i class="fas fa-cube"></i>
            <h2>依赖管理</h2>
          </div>

          <div class="content-card">
            <h3>依赖类型</h3>

            <div class="dependency-types">
              <div class="type-card">
                <div class="type-header">
                  <i class="fas fa-cogs"></i>
                  <h4>dependencies</h4>
                </div>
                <div class="type-content">
                  <p><strong>生产依赖</strong></p>
                  <ul>
                    <li>项目运行时需要的包</li>
                    <li>会被包含在最终构建中</li>
                    <li>安装：<code>npm install &lt;package&gt;</code></li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"dependencies": {
  "express": "^4.17.1",
  "lodash": "^4.17.21"
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="type-card">
                <div class="type-header">
                  <i class="fas fa-tools"></i>
                  <h4>devDependencies</h4>
                </div>
                <div class="type-content">
                  <p><strong>开发依赖</strong></p>
                  <ul>
                    <li>只在开发过程中需要的包</li>
                    <li>不会包含在最终构建中</li>
                    <li>安装：<code>npm install --save-dev &lt;package&gt;</code></li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"devDependencies": {
  "eslint": "^7.32.0",
  "webpack": "^5.51.1"
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="type-card">
                <div class="type-header">
                  <i class="fas fa-toggle-on"></i>
                  <h4>peerDependencies</h4>
                </div>
                <div class="type-content">
                  <p><strong>对等依赖</strong></p>
                  <ul>
                    <li>表示你的包需要宿主环境提供的依赖</li>
                    <li>常用于插件开发</li>
                    <li>不会自动安装</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"peerDependencies": {
  "react": ">=16.8.0 <18.0.0"
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="type-card">
                <div class="type-header">
                  <i class="fas fa-box"></i>
                  <h4>optionalDependencies</h4>
                </div>
                <div class="type-content">
                  <p><strong>可选依赖</strong></p>
                  <ul>
                    <li>安装失败不会导致整个安装过程失败</li>
                    <li>程序需要处理依赖缺失的情况</li>
                    <li>使用场景较少</li>
                  </ul>
                  <div class="code-snippet">
                    <pre><code>"optionalDependencies": {
  "fsevents": "^2.3.2"
}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div class="versioning">
              <h3>版本控制语法</h3>
              <table class="version-table">
                <thead>
                  <tr>
                    <th>语法</th>
                    <th>含义</th>
                    <th>示例</th>
                    <th>匹配版本</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.2.3</td>
                    <td>精确版本</td>
                    <td>1.2.3</td>
                    <td>仅 1.2.3</td>
                  </tr>
                  <tr>
                    <td>^1.2.3</td>
                    <td>兼容版本</td>
                    <td>^1.2.3</td>
                    <td>1.x.x (>=1.2.3 &lt;2.0.0)</td>
                  </tr>
                  <tr>
                    <td>~1.2.3</td>
                    <td>小版本更新</td>
                    <td>~1.2.3</td>
                    <td>1.2.x (>=1.2.3 &lt;1.3.0)</td>
                  </tr>
                  <tr>
                    <td>>=1.2.3</td>
                    <td>大于等于</td>
                    <td>>=1.2.3</td>
                    <td>任何 >=1.2.3 的版本</td>
                  </tr>
                  <tr>
                    <td>
                      &lt;2.0.0</td>
                    <td>小于</td>
                    <td>
                      &lt;2.0.0</td>
                    <td>任何小于 2.0.0 的版本</td>
                  </tr>
                  <tr>
                    <td>1.2.x</td>
                    <td>通配符</td>
                    <td>1.2.x</td>
                    <td>1.2.0, 1.2.1, ..., 但不包括 1.3.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="scripts" class="section">
          <div class="section-header">
            <i class="fas fa-terminal"></i>
            <h2>脚本配置</h2>
          </div>

          <div class="content-card">
            <h3>脚本定义与执行</h3>

            <div class="script-info">
              <div class="script-examples">
                <h4>常见脚本示例</h4>
                <div class="code-block">
                  <pre><code>"scripts": {
  "start": "node index.js",
  "build": "webpack --mode production",
  "test": "jest",
  "lint": "eslint src",
  "format": "prettier --write src",
  "prestart": "npm run build",
  "postinstall": "node postinstall.js"
}</code></pre>
                </div>
              </div>

              <div class="script-details">
                <h4>脚本执行方法</h4>
                <div class="execution-methods">
                  <div class="method">
                    <h5>npm</h5>
                    <pre><code>npm run &lt;script-name&gt;</code></pre>
                    <p>例如：<code>npm run build</code></p>
                  </div>
                  <div class="method">
                    <h5>Yarn</h5>
                    <pre><code>yarn &lt;script-name&gt;</code></pre>
                    <p>例如：<code>yarn build</code></p>
                  </div>
                </div>

                <h4>特殊脚本</h4>
                <ul class="special-scripts">
                  <li><code>start</code>: 可通过 <code>npm start</code> 直接运行</li>
                  <li><code>test</code>: 可通过 <code>npm test</code> 直接运行</li>
                  <li><code>pre&lt;script&gt;</code>: 在脚本前自动运行</li>
                  <li><code>post&lt;script&gt;</code>: 在脚本后自动运行</li>
                </ul>
              </div>
            </div>

            <div class="script-best-practices">
              <h3>脚本最佳实践</h3>
              <div class="practices">
                <div class="practice">
                  <div class="practice-icon">
                    <i class="fas fa-check-circle"></i>
                  </div>
                  <div class="practice-content">
                    <h4>保持脚本简单</h4>
                    <p>将复杂逻辑放在单独脚本文件中</p>
                  </div>
                </div>

                <div class="practice">
                  <div class="practice-icon">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="practice-content">
                    <h4>文档化脚本</h4>
                    <p>在 README 中说明重要脚本的用途</p>
                  </div>
                </div>

                <div class="practice">
                  <div class="practice-icon">
                    <i class="fas fa-project-diagram"></i>
                  </div>
                  <div class="practice-content">
                    <h4>使用环境变量</h4>
                    <p>通过 cross-env 实现跨平台环境变量设置</p>
                    <pre><code>"start": "cross-env NODE_ENV=production node index.js"</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="configurations" class="section">
          <div class="section-header">
            <i class="fas fa-cog"></i>
            <h2>项目配置</h2>
          </div>

          <div class="content-card">
            <div class="config-grid">
              <div class="config-item">
                <div class="config-header">
                  <i class="fas fa-door-open"></i>
                  <h3>main</h3>
                </div>
                <div class="config-content">
                  <p><strong>主入口文件</strong></p>
                  <p>当包被 require() 时加载的文件</p>
                  <div class="code-snippet">
                    <pre><code>"main": "index.js"</code></pre>
                  </div>
                </div>
              </div>

              <div class="config-item">
                <div class="config-header">
                  <i class="fas fa-browser"></i>
                  <h3>browser</h3>
                </div>
                <div class="config-content">
                  <p><strong>浏览器入口文件</strong></p>
                  <p>指定浏览器环境使用的入口文件</p>
                  <div class="code-snippet">
                    <pre><code>"browser": "browser.js"</code></pre>
                  </div>
                </div>
              </div>

              <div class="config-item">
                <div class="config-header">
                  <i class="fas fa-engines"></i>
                  <h3>engines</h3>
                </div>
                <div class="config-content">
                  <p><strong>引擎要求</strong></p>
                  <p>指定运行环境要求</p>
                  <div class="code-snippet">
                    <pre><code>"engines": {
  "node": ">=14.0.0",
  "npm": ">=7.0.0"
}</code></pre>
                  </div>
                </div>
              </div>

              <div class="config-item">
                <div class="config-header">
                  <i class="fas fa-os"></i>
                  <h3>os</h3>
                </div>
                <div class="config-content">
                  <p><strong>操作系统限制</strong></p>
                  <p>指定包支持的操作系统</p>
                  <div class="code-snippet">
                    <pre><code>"os": ["darwin", "linux"]</code></pre>
                  </div>
                </div>
              </div>

              <div class="config-item">
                <div class="config-header">
                  <i class="fas fa-cpu"></i>
                  <h3>cpu</h3>
                </div>
                <div class="config-content">
                  <p><strong>CPU 架构限制</strong></p>
                  <p>指定包支持的 CPU 架构</p>
                  <div class="code-snippet">
                    <pre><code>"cpu": ["x64", "arm64"]</code></pre>
                  </div>
                </div>
              </div>

              <div class="config-item">
                <div class="config-header">
                  <i class="fas fa-ban"></i>
                  <h3>private</h3>
                </div>
                <div class="config-content">
                  <p><strong>私有包</strong></p>
                  <p>设置为 true 可防止意外发布到 npm</p>
                  <div class="code-snippet">
                    <pre><code>"private": true</code></pre>
                  </div>
                </div>
              </div>

              <div class="config-item">
                <div class="config-header">
                  <i class="fas fa-radiation"></i>
                  <h3>sideEffects</h3>
                </div>
                <div class="config-content">
                  <p><strong>副作用标识</strong></p>
                  <p>用于 Tree Shaking 优化</p>
                  <div class="code-snippet">
                    <pre><code>"sideEffects": ["*.css", "*.scss"]</code></pre>
                  </div>
                </div>
              </div>

              <div class="config-item">
                <div class="config-header">
                  <i class="fas fa-folder"></i>
                  <h3>files</h3>
                </div>
                <div class="config-content">
                  <p><strong>包含文件</strong></p>
                  <p>发布到 npm 时要包含的文件列表</p>
                  <div class="code-snippet">
                    <pre><code>"files": ["dist", "src", "README.md"]</code></pre>
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
            <div class="practices-list">
              <div class="practice-item">
                <div class="practice-number">1</div>
                <div class="practice-content">
                  <h3>使用语义化版本控制</h3>
                  <p>遵循 SemVer 规范管理版本号，确保兼容性</p>
                </div>
              </div>

              <div class="practice-item">
                <div class="practice-number">2</div>
                <div class="practice-content">
                  <h3>区分 dependencies 和 devDependencies</h3>
                  <p>正确分类依赖项，减少生产环境包体积</p>
                </div>
              </div>

              <div class="practice-item">
                <div class="practice-number">3</div>
                <div class="practice-content">
                  <h3>使用脚本自动化任务</h3>
                  <p>将常用命令封装为脚本，简化开发流程</p>
                </div>
              </div>

              <div class="practice-item">
                <div class="practice-number">4</div>
                <div class="practice-content">
                  <h3>指定引擎版本</h3>
                  <p>通过 engines 字段明确 Node.js 和 npm 版本要求</p>
                </div>
              </div>

              <div class="practice-item">
                <div class="practice-number">5</div>
                <div class="practice-content">
                  <h3>使用 .npmignore 或 files 字段</h3>
                  <p>控制发布到 npm 的文件，避免包含无关文件</p>
                </div>
              </div>

              <div class="practice-item">
                <div class="practice-number">6</div>
                <div class="practice-content">
                  <h3>保持 package.json 整洁</h3>
                  <p>定期清理未使用的依赖项和脚本</p>
                </div>
              </div>
            </div>

            <div class="final-tip">
              <i class="fas fa-lightbulb"></i>
              <div class="tip-content">
                <p>良好的 package.json 管理是项目健康的基础。保持其准确和最新，可以避免许多依赖问题和构建错误。</p>
                <p>使用 <code>npm outdated</code> 定期检查过时的依赖，并使用 <code>npm update</code> 谨慎更新。</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>package.json 基本介绍 | Vue3 + TypeScript 实现</p>
      <p>© 2023 Node.js 开发文档</p>
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
  { id: 'metadata', title: '元数据', icon: 'fas fa-info-circle' },
  { id: 'dependencies', title: '依赖管理', icon: 'fas fa-cube' },
  { id: 'scripts', title: '脚本配置', icon: 'fas fa-terminal' },
  { id: 'configurations', title: '项目配置', icon: 'fas fa-cog' },
  { id: 'best-practices', title: '最佳实践', icon: 'fas fa-star' }
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

.package-json-guide {
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

.json-visualization {
  max-width: 600px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 1.5rem;
  font-family: 'Source Code Pro', monospace;
  font-size: 1.1rem;
  line-height: 1.8;

  .json-bracket {
    color: #ffd700;
    font-weight: bold;
  }

  .json-line {
    margin-left: 1.5rem;
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

  .file-indicator {
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

// 元数据网格
.metadata-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  .metadata-item {
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

  .metadata-header {
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

  .metadata-content {
    padding: 1.5rem;

    p {
      margin-top: 0;
      font-weight: 500;
    }
  }
}

// 依赖类型卡片
.dependency-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .type-card {
    background: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid @border-color;

    .type-header {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      background: rgba(@primary-color, 0.05);
      border-bottom: 1px solid @border-color;

      i {
        font-size: 1.5rem;
        margin-right: 1rem;
        color: @primary-color;
      }
    }
  }
}

// 版本控制表格
.version-table {
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
}

// 配置网格
.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  .config-item {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid @border-color;

    .config-header {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      i {
        font-size: 1.5rem;
        color: @primary-color;
        margin-right: 0.8rem;
      }

      h3 {
        margin: 0;
        font-size: 1.3rem;
      }
    }
  }
}

// 最佳实践列表
.practices-list {
  .practice-item {
    display: flex;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid @border-color;

    &:last-child {
      border-bottom: none;
    }

    .practice-number {
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
      margin-right: 1.5rem;
      flex-shrink: 0;
    }

    .practice-content {
      flex: 1;

      h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }
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
}

@media (max-width: 768px) {

  .metadata-grid,
  .dependency-types,
  .config-grid {
    grid-template-columns: 1fr;
  }
}
</style>
