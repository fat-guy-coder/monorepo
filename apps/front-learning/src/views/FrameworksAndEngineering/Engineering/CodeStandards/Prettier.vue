<template>
  <div class="prettier-container">
    <!-- 顶部标题区 -->
    <div class="header-banner">
      <div class="logo-icon">✨</div>
      <div class="header-content">
        <h1 class="main-title">Prettier 代码格式化工具</h1>
        <p class="subtitle">让你的代码风格统一而优雅</p>
        <div class="features">
          <span>零配置开箱即用</span>
          <span>支持多种语言</span>
          <span>无缝集成编辑器</span>
          <span>高度可配置</span>
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 功能介绍 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>Prettier 的核心价值</h2>
        </div>

        <div class="intro-content">
          <p>
            Prettier 是一个功能强大的代码格式化工具，它可以自动格式化您的代码，使其保持一致的风格。
          </p>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🔒</div>
              <h3>强制一致性</h3>
              <p>消除团队代码风格争议</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>节省时间</h3>
              <p>无需手动调整代码格式</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🧠</div>
              <h3>专注逻辑</h3>
              <p>让开发者专注于核心业务逻辑</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔌</div>
              <h3>无缝集成</h3>
              <p>支持所有主流编辑器和构建工具</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置选项基础介绍 -->
      <section class="config-section">
        <div class="section-header">
          <div class="icon">🔧</div>
          <h2>核心配置选项基础介绍</h2>
          <p class="section-subtitle">通过.prettierrc文件配置这些选项</p>
        </div>

        <div class="tabs-container">
          <div class="tabs-header">
            <div v-for="(category, index) in configCategories" :key="index"
              :class="['tab', { active: activeCategory === index }]" @click="activeCategory = index">
              {{ category }}
            </div>
          </div>

          <div class="tab-content">
            <div class="config-table" v-if="activeCategory === 0">
              <div class="table-header">
                <div>配置项</div>
                <div>类型</div>
                <div>默认值</div>
                <div>描述</div>
              </div>

              <div class="table-row" v-for="(item, index) in printWidthConfig" :key="index">
                <div class="config-name"><code>{{ item.name }}</code></div>
                <div>{{ item.type }}</div>
                <div><code>{{ item.default }}</code></div>
                <div>{{ item.description }}</div>
              </div>
            </div>

            <div class="config-table" v-if="activeCategory === 1">
              <div class="table-header">
                <div>配置项</div>
                <div>类型</div>
                <div>默认值</div>
                <div>描述</div>
              </div>

              <div class="table-row" v-for="(item, index) in formattingConfig" :key="index">
                <div class="config-name"><code>{{ item.name }}</code></div>
                <div>{{ item.type }}</div>
                <div><code>{{ item.default }}</code></div>
                <div>{{ item.description }}</div>
              </div>
            </div>

            <div class="config-table" v-if="activeCategory === 2">
              <div class="table-header">
                <div>配置项</div>
                <div>类型</div>
                <div>默认值</div>
                <div>描述</div>
              </div>

              <div class="table-row" v-for="(item, index) in parserConfig" :key="index">
                <div class="config-name"><code>{{ item.name }}</code></div>
                <div>{{ item.type }}</div>
                <div><code>{{ item.default }}</code></div>
                <div>{{ item.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置文件示例 -->
      <section class="examples-section">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>配置文件示例</h2>
        </div>

        <div class="examples-grid">
          <div class="example-card">
            <h3 class="example-title">基础配置</h3>
            <pre class="code-block">{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}</pre>
          </div>

          <div class="example-card">
            <h3 class="example-title">React/Vue 专用配置</h3>
            <pre class="code-block">{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "overrides": [
    {
      "files": "*.{css,scss,less}",
      "options": {
        "singleQuote": false
      }
    }
  ]
}</pre>
          </div>

          <div class="example-card">
            <h3 class="example-title">TypeScript 专用配置</h3>
            <pre class="code-block">{
  "printWidth": 120,
  "parser": "typescript",
  "trailingComma": "all",
  "quoteProps": "consistent",
  "proseWrap": "always",
  "plugins": [
    "prettier-plugin-organize-imports"
  ]
}</pre>
          </div>
        </div>
      </section>

      <!-- 集成与使用 -->
      <section class="integration-section">
        <div class="section-header">
          <div class="icon">🔌</div>
          <h2>集成与使用方式</h2>
        </div>

        <div class="integration-grid">
          <div class="integration-card">
            <div class="integration-icon">📦</div>
            <h3>命令行使用</h3>
            <pre class="code-block"># 全局安装
npm install --global prettier

# 格式化文件
prettier --write src/**/*.js

# 检查格式问题
prettier --check .</pre>
          </div>

          <div class="integration-card">
            <div class="integration-icon">🔧</div>
            <h3>编辑器集成</h3>
            <ul class="integration-list">
              <li>VS Code - Prettier 官方扩展</li>
              <li>WebStorm - 内置支持</li>
              <li>Sublime Text - JsPrettier 插件</li>
              <li>Vim - ale 或 coc-prettier</li>
              <li>Atom - prettier-atom 插件</li>
            </ul>
          </div>

          <div class="integration-card">
            <div class="integration-icon">🤝</div>
            <h3>与 ESLint 协作</h3>
            <pre class="code-block">npm install eslint-config-prettier --save-dev

// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier' // 放在最后覆盖冲突规则
  ],
  rules: {
    // 其他规则...
  }
}</pre>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <div class="section-header">
          <div class="icon">🌟</div>
          <h2>Prettier 最佳实践</h2>
        </div>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-number">1</div>
            <div class="practice-content">
              <h3>项目级配置</h3>
              <p>在项目根目录创建<code>.prettierrc</code>文件，确保团队统一配置</p>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">2</div>
            <div class="practice-content">
              <h3>提交前格式化</h3>
              <p>使用Husky和lint-staged在提交前自动格式化代码</p>
              <pre class="code-block">// package.json
"lint-staged": {
  "*.{js,jsx,ts,tsx,vue}": [
    "prettier --write",
    "eslint --fix"
  ]
}</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">3</div>
            <div class="practice-content">
              <h3>忽略特定文件</h3>
              <p>使用<code>.prettierignore</code>忽略不需要格式化的文件</p>
              <pre class="code-block"># .prettierignore
package*.json
dist/
node_modules/
*.min.js
**/*.svg
.DS_Store</pre>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">4</div>
            <div class="practice-content">
              <h3>覆盖特定规则</h3>
              <p>使用<code>overrides</code>为不同文件类型设置不同规则</p>
              <pre class="code-block">{
  "semi": false,
  "overrides": [
    {
      "files": "*.test.js",
      "options": {
        "semi": true
      }
    },
    {
      "files": "*.json",
      "options": {
        "printWidth": 200
      }
    }
  ]
}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 常见问题 -->
      <section class="faq-section">
        <div class="section-header">
          <div class="icon">❓</div>
          <h2>常见问题解答</h2>
        </div>

        <div class="faq-grid">
          <div class="faq-item">
            <h3>Prettier 和 ESLint 有什么区别？</h3>
            <p>ESLint 主要解决代码质量问题（如未使用变量、可能的错误），而 Prettier 专注于代码格式（如缩进、空格、引号）。两者可以完美互补，使用 eslint-config-prettier 可避免规则冲突。
            </p>
          </div>

          <div class="faq-item">
            <h3>如何禁用特定文件的格式化？</h3>
            <p>在文件中添加特殊注释：</p>
            <pre class="code-block">// prettier-ignore
const matrix = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];</pre>
          </div>

          <div class="faq-item">
            <h3>配置项不生效怎么办？</h3>
            <p>1. 确保配置文件在项目根目录<br>2. 检查编辑器是否使用了全局配置<br>3. 重启编辑器或开发服务器<br>4. 检查配置文件格式是否正确</p>
          </div>

          <div class="faq-item">
            <h3>如何格式化 HTML 中的内联代码？</h3>
            <p>HTML 中的内联 JavaScript/CSS 默认不会被格式化，可以使用 <code>@prettier/plugin-php</code> 或设置
              <code>embeddedLanguageFormatting: 'auto'</code> 来启用此功能。
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>Prettier — 让代码格式化变得简单 | 官方文档：<a href="https://prettier.io/" target="_blank">prettier.io</a> | </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const configCategories = [
  '打印宽度与缩进',
  '格式化规则',
  '解析器相关'
];

const activeCategory = ref(0);

// 打印宽度与缩进配置
const printWidthConfig = [
  {
    name: 'printWidth',
    type: 'number',
    default: '80',
    description: '指定代码换行的行长度'
  },
  {
    name: 'tabWidth',
    type: 'number',
    default: '2',
    description: '指定每个缩进级别的空格数'
  },
  {
    name: 'useTabs',
    type: 'boolean',
    default: 'false',
    description: '使用制表符 (tab) 缩进而不是空格'
  }
];

// 格式化规则配置
const formattingConfig = [
  {
    name: 'semi',
    type: 'boolean',
    default: 'true',
    description: '在语句末尾打印分号'
  },
  {
    name: 'singleQuote',
    type: 'boolean',
    default: 'false',
    description: '使用单引号而不是双引号'
  },
  {
    name: 'jsxSingleQuote',
    type: 'boolean',
    default: 'false',
    description: '在 JSX 中使用单引号而不是双引号'
  },
  {
    name: 'trailingComma',
    type: '"es5" | "none" | "all"',
    default: '"es5"',
    description: '控制对象、数组等尾随逗号的输出'
  },
  {
    name: 'bracketSpacing',
    type: 'boolean',
    default: 'true',
    description: '在对象字面量括号之间打印空格'
  },
  {
    name: 'bracketSameLine',
    type: 'boolean',
    default: 'false',
    description: '将 HTML/JSX 元素的 > 放在最后一行的末尾'
  },
  {
    name: 'arrowParens',
    type: '"always" | "avoid"',
    default: '"always"',
    description: '在箭头函数参数周围加上括号'
  },
  {
    name: 'endOfLine',
    type: '"auto" | "lf" | "crlf" | "cr"',
    default: '"auto"',
    description: '指定换行符格式'
  }
];

// 解析器相关配置
const parserConfig = [
  {
    name: 'parser',
    type: 'string',
    default: '无',
    description: '指定要使用的解析器（如：babel, typescript, css, less, scss）'
  },
  {
    name: 'filepath',
    type: 'string',
    default: '无',
    description: '指定文件名以推断使用哪个解析器'
  },
  {
    name: 'rangeStart',
    type: 'number',
    default: '0',
    description: '只格式化文件中的一个片段（格式化开始位置）'
  },
  {
    name: 'rangeEnd',
    type: 'number',
    default: 'Infinity',
    description: '只格式化文件中的一个片段（格式化结束位置）'
  },
  {
    name: 'requirePragma',
    type: 'boolean',
    default: 'false',
    description: '仅格式化顶部包含特定注释（@format/@prettier）的文件'
  },
  {
    name: 'insertPragma',
    type: 'boolean',
    default: 'false',
    description: '在格式化后的文件顶部插入@format标记'
  }
];
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.prettier-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.header-banner {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-icon {
    font-size: 4rem;
    flex-shrink: 0;
  }

  .header-content {
    flex: 1;
  }
}

.main-title {
  font-size: 2.8rem;
  margin: 0 0 0.8rem;
  font-weight: 800;
}

.subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  margin: 0 0 1rem;
  font-weight: 400;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  font-size: 0.95rem;
  opacity: 0.9;

  span {
    background: rgba(255, 255, 255, 0.15);
    padding: 0.4rem 0.8rem;
    border-radius: 100px;
  }
}

.content-wrapper {
  padding: 0 2rem 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 1.5rem;

  .icon {
    font-size: 1.8rem;
    background: #ede9fe;
    color: #8b5cf6;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.8rem;
    margin: 0;
    color: #1e293b;
  }

  .section-subtitle {
    margin: 0.5rem 0 0;
    color: #64748b;
    font-size: 1.05rem;
  }
}

.intro-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.intro-content {
  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #475569;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature-card {
  background: #f5f3ff;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid #ede9fe;

  &:hover {
    transform: translateY(-5px);
    background: #ede9fe;
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 0.8rem;
    color: #1e293b;
  }

  p {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
  }
}

.config-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.tabs-container {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  background: #f5f3ff;
  border-bottom: 1px solid #e2e8f0;

  .tab {
    padding: 1rem 1.8rem;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 3px solid transparent;

    &:hover {
      color: #7c3aed;
      background: #ede9fe;
    }

    &.active {
      color: #7c3aed;
      border-bottom: 3px solid #7c3aed;
      background: #ede9fe;
    }
  }
}

.tab-content {
  padding: 1.5rem;
  background: white;
}

.config-table {
  display: grid;
  grid-template-columns: minmax(150px, 1fr) minmax(100px, 0.8fr) minmax(100px, 0.8fr) minmax(200px, 2fr);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: contents;

  >div {
    padding: 1rem;
    background: #f5f3ff;
    font-weight: 600;
    color: #7c3aed;
    text-align: left;
  }
}

.table-row {
  display: contents;

  >div {
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
  }

  &:last-child>div {
    border-bottom: none;
  }
}

.config-name {
  font-family: @font-code;
  font-weight: 600;
  color: #7c3aed;
}

.examples-section {
  margin-bottom: 3rem;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.8rem;
}

.example-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .example-title {
    margin-top: 0;
    color: #7c3aed;
    font-size: 1.2rem;
  }
}

.integration-section {
  margin-bottom: 3rem;
}

.integration-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.8rem;
}

.integration-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .integration-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0;
    color: #7c3aed;
  }
}

.integration-list {
  padding-left: 1.2rem;
  margin: 0;

  li {
    margin-bottom: 0.8rem;
    line-height: 1.6;
  }
}

.best-practices {
  margin-bottom: 3rem;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 1.2rem;

  .practice-number {
    background: #7c3aed;
    color: white;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
    flex-shrink: 0;
    margin-top: 0.3rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #1e293b;
    font-size: 1.25rem;
  }

  p {
    margin: 0.5rem 0 1rem;
    color: #64748b;
    line-height: 1.7;
  }
}

.faq-section {
  margin-bottom: 3rem;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.8rem;
}

.faq-item {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: #7c3aed;
    font-size: 1.25rem;
  }

  p {
    color: #475569;
    line-height: 1.7;
    margin: 0.8rem 0 1.2rem;
  }
}

.code-block {
  background-color: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 1.2rem;
  font-family: @font-code;
  font-size: 0.92rem;
  line-height: 1.5;
  overflow-x: auto;
  tab-size: 2;
  margin: 1rem 0;
}

.footer {
  text-align: center;
  padding: 2.5rem;
  color: #94a3b8;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 1rem;

  a {
    color: #7c3aed;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .header-banner {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .main-title {
    font-size: 2.2rem;
  }

  .features {
    justify-content: center;
  }

  .tabs-header {
    flex-direction: column;

    .tab {
      text-align: center;
      border-bottom: 1px solid #e2e8f0;
    }
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 0 1rem 2rem;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .section-header {
    h2 {
      font-size: 1.5rem;
    }
  }

  .examples-grid,
  .integration-grid,
  .practices-grid,
  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>
