<template>
  <div class="publish-guide">
    <header class="guide-header">
      <h1>📦 NPM/Yarn 包发布指南</h1>
      <p>一步步教你如何创建并发布自己的 JavaScript 包</p>
    </header>

    <div class="content-container">
      <section class="intro-section">
        <div class="icon-box">
          <div class="icon npm-icon">npm</div>
          <div class="icon yarn-icon">Yarn</div>
        </div>
        <p>
          发布自己的 npm 包是将可重用代码共享给全球开发者的最佳方式。无论是工具函数、UI组件库还是框架插件，
          遵循本指南可以让你轻松完成发布流程。
        </p>
      </section>

      <div class="steps-container">
        <!-- 准备阶段 -->
        <section class="step-card">
          <div class="step-header">
            <div class="step-number">1</div>
            <h2>准备工作</h2>
          </div>
          <div class="step-content">
            <h3>1. 创建 npm 账号</h3>
            <p>前往 <a href="https://www.npmjs.com/" target="_blank">npm官网</a> 注册账号</p>

            <h3>2. 初始化项目</h3>
            <pre class="code-block"><code># 创建项目目录
mkdir my-package
cd my-package

# 初始化 package.json
npm init -y
# 或使用 yarn
yarn init -y</code></pre>

            <h3>3. 配置 package.json</h3>
            <p>关键字段说明：</p>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>字段名</th>
                    <th>说明</th>
                    <th>示例</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>name</td>
                    <td>包名（全局唯一）</td>
                    <td>"my-awesome-package"</td>
                  </tr>
                  <tr>
                    <td>version</td>
                    <td>版本号（语义化版本）</td>
                    <td>"1.0.0"</td>
                  </tr>
                  <tr>
                    <td>main</td>
                    <td>入口文件</td>
                    <td>"dist/index.js"</td>
                  </tr>
                  <tr>
                    <td>types</td>
                    <td>TS类型声明文件</td>
                    <td>"dist/index.d.ts"</td>
                  </tr>
                  <tr>
                    <td>files</td>
                    <td>包含的文件/目录</td>
                    <td>["dist"]</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 开发阶段 -->
        <section class="step-card">
          <div class="step-header">
            <div class="step-number">2</div>
            <h2>开发包</h2>
          </div>
          <div class="step-content">
            <h3>1. 项目结构</h3>
            <pre class="file-structure">my-package/
├── src/            # 源代码
│   ├── index.ts    # 入口文件
│   └── utils.ts    # 工具函数
├── dist/           # 构建输出
├── tests/          # 测试代码
├── .npmignore      # 忽略文件配置
├── package.json
└── README.md</pre>

            <h3>2. 编写代码</h3>
            <p>示例入口文件 (src/index.ts):</p>
            <pre class="code-block"><code>// 导出工具函数
export * from './utils';

// 示例函数
export function greet(name: string): string {
  return `Hello, ${name}!`;
}</code></pre>

            <h3>3. 配置构建脚本</h3>
            <p>在 package.json 中添加构建命令：</p>
            <pre class="code-block"><code>"scripts": {
  "build": "tsc",
  "prepublish": "npm run build"
}</code></pre>
          </div>
        </section>

        <!-- 发布阶段 -->
        <section class="step-card">
          <div class="step-header">
            <div class="step-number">3</div>
            <h2>发布流程</h2>
          </div>
          <div class="step-content">
            <h3>1. 登录 npm</h3>
            <pre class="code-block"><code># 使用 npm 登录
npm login
# 输入用户名、密码和邮箱

# 使用 yarn 登录
yarn login</code></pre>

            <h3>2. 版本管理</h3>
            <p>遵循语义化版本(SemVer):</p>
            <div class="version-examples">
              <div class="version-card">
                <div class="version-badge major">主版本</div>
                <p>重大变更，不向下兼容</p>
                <code>npm version major</code>
              </div>
              <div class="version-card">
                <div class="version-badge minor">次版本</div>
                <p>新增功能，向下兼容</p>
                <code>npm version minor</code>
              </div>
              <div class="version-card">
                <div class="version-badge patch">修订版本</div>
                <p>问题修复，向下兼容</p>
                <code>npm version patch</code>
              </div>
            </div>

            <h3>3. 发布包</h3>
            <pre class="code-block"><code># 使用 npm 发布
npm publish

# 使用 yarn 发布
yarn publish</code></pre>

            <div class="success-box">
              <div class="success-icon">✓</div>
              <div>
                <strong>发布成功！</strong>
                <p>你的包现在可以在 npm 上访问了：https://www.npmjs.com/package/your-package-name</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 注意事项 -->
        <section class="step-card important-section">
          <div class="step-header">
            <div class="step-number">!</div>
            <h2>关键注意事项</h2>
          </div>
          <div class="step-content">
            <div class="warning-item">
              <div class="warning-icon">⚠️</div>
              <div>
                <h3>包名唯一性</h3>
                <p>确保你的包名在 npm 上是唯一的，否则发布将失败</p>
              </div>
            </div>

            <div class="warning-item">
              <div class="warning-icon">⚠️</div>
              <div>
                <h3>.npmignore 文件</h3>
                <p>创建 .npmignore 文件排除不需要发布的文件（如测试文件、配置文件等）</p>
                <pre class="code-block"><code># .npmignore 示例
src/
tests/
*.config.js
.gitignore</code></pre>
              </div>
            </div>

            <div class="warning-item">
              <div class="warning-icon">⚠️</div>
              <div>
                <h3>私有包发布</h3>
                <p>如果需要发布私有包：</p>
                <pre class="code-block"><code># 在 package.json 中添加
"publishConfig": {
  "access": "restricted"
}</code></pre>
              </div>
            </div>

            <div class="warning-item">
              <div class="warning-icon">⚠️</div>
              <div>
                <h3>版本撤销</h3>
                <p>撤销已发布版本（72小时内）：</p>
                <pre class="code-block"><code>npm unpublish your-package@version</code></pre>
                <p class="note">注意：撤销操作应谨慎使用，避免影响用户</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer class="guide-footer">
        <h3>更多资源</h3>
        <div class="resources">
          <a href="https://docs.npmjs.com/" target="_blank">npm 官方文档</a>
          <a href="https://yarnpkg.com/" target="_blank">Yarn 官方文档</a>
          <a href="https://semver.org/" target="_blank">语义化版本规范</a>
        </div>
        <p class="footer-note">Happy Publishing! 🚀</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑（如果需要）
// 例如：获取当前npm版本信息等
import { onMounted } from 'vue';

onMounted(() => {
  console.log('NPM Package Publishing Guide mounted');
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.publish-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #2d3748;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;

  * {
    box-sizing: border-box;
  }
}

.guide-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  h1 {
    font-size: 2.5rem;
    color: #2b6cb0;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    color: #4a5568;
    margin-top: 0;
  }
}

.content-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.intro-section {
  padding: 2.5rem;
  background: linear-gradient(120deg, #ebf4ff 0%, #c3dafe 100%);
  text-align: center;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    max-width: 800px;
    margin: 1.5rem auto 0;
    color: #2d3748;
  }
}

.icon-box {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.icon {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-weight: 700;
  font-size: 1.8rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.npm-icon {
  background: linear-gradient(135deg, #cb3837 0%, #bd2c29 100%);
  color: white;
}

.yarn-icon {
  background: linear-gradient(135deg, #2c8ebb 0%, #2188b6 100%);
  color: white;
}

.steps-container {
  padding: 2rem;
}

.step-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2.5rem;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}

.step-header {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(120deg, #4299e1 0%, #3182ce 100%);
  color: white;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
  }
}

.step-number {
  width: 50px;
  height: 50px;
  background: white;
  color: #3182ce;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 1.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.step-content {
  padding: 2rem;

  h3 {
    color: #2b6cb0;
    margin-top: 1.8rem;
    font-size: 1.4rem;
    position: relative;
    padding-left: 1.5rem;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: #4299e1;
      border-radius: 50%;
    }
  }

  p {
    line-height: 1.7;
    color: #4a5568;
    margin: 0.8rem 0 1.5rem;
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1.2rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.2rem 0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

  code {
    display: block;
  }
}

.table-container {
  overflow-x: auto;
  margin: 1.5rem 0;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  th {
    background: #ebf4ff;
    font-weight: 600;
    color: #2b6cb0;
  }

  tr:hover {
    background: #f7fafc;
  }
}

.file-structure {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  font-family: 'Fira Code', 'Consolas', monospace;
  color: #4a5568;
  margin: 1.2rem 0;
  line-height: 1.8;
  border-left: 4px solid #4299e1;
}

.version-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.version-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
}

.version-badge {
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 0.9rem;

  &.major {
    background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
    color: white;
  }

  &.minor {
    background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
    color: white;
  }

  &.patch {
    background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
    color: white;
  }
}

.success-box {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
  padding: 1.5rem;
  border-radius: 10px;
  color: white;
  margin-top: 1.5rem;

  .success-icon {
    font-size: 2rem;
    margin-right: 1.2rem;
    font-weight: 700;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0.5rem 0 0;
  }
}

.important-section {
  .step-header {
    background: linear-gradient(120deg, #e53e3e 0%, #c53030 100%);
  }

  .step-number {
    color: #c53030;
  }
}

.warning-item {
  display: flex;
  padding: 1.5rem;
  background: #fffaf0;
  border-radius: 8px;
  margin-bottom: 1.2rem;
  border-left: 4px solid #dd6b20;

  .warning-icon {
    font-size: 1.8rem;
    margin-right: 1.2rem;
    color: #dd6b20;
  }

  h3 {
    color: #c05621;
    margin-top: 0;
  }
}

.note {
  font-style: italic;
  color: #718096;
  margin-top: 0.5rem;
}

.guide-footer {
  text-align: center;
  padding: 2.5rem;
  background: #f7fafc;
  border-top: 1px solid #e2e8f0;

  h3 {
    color: #2b6cb0;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

.resources {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;

  a {
    color: #4299e1;
    text-decoration: none;
    font-weight: 500;
    padding: 0.8rem 1.5rem;
    border-radius: 50px;
    border: 2px solid #bee3f8;
    transition: all 0.3s ease;

    &:hover {
      background: #4299e1;
      color: white;
      border-color: #4299e1;
      box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
    }
  }
}

.footer-note {
  font-size: 1.2rem;
  font-weight: 600;
  color: #4a5568;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .publish-guide {
    padding: 1rem;
  }

  .step-content {
    padding: 1.5rem;
  }

  .guide-header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }

  .version-examples {
    grid-template-columns: 1fr;
  }
}
</style>