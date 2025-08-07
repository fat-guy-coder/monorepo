<template>
  <div class="i18n-container">
    <header class="header">
      <h1><i class="icon-language"></i> 前端国际化实现方案</h1>
      <p>构建多语言Web应用的最佳实践与方法对比</p>
    </header>

    <div class="content-wrapper">
      <nav class="sidebar">
        <ul>
          <li v-for="(item, index) in navItems" :key="index" :class="{ active: activeSection === item.id }"
            @click="activeSection = item.id">
            <i :class="item.icon"></i> {{ item.title }}
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 基础概念部分 -->
        <section v-show="activeSection === 'concept'" class="section-card">
          <h2><i class="icon-info"></i> 国际化基础概念</h2>

          <div class="concept-grid">
            <div class="concept-item">
              <div class="concept-icon">
                <i class="icon-definition"></i>
              </div>
              <h3>什么是国际化？</h3>
              <p>国际化（i18n）是指设计和开发能够适应不同语言、地区和文化习惯的应用的过程。使产品无需修改就能适应多种语言和区域。</p>
            </div>

            <div class="concept-item">
              <div class="concept-icon">
                <i class="icon-why"></i>
              </div>
              <h3>为什么需要国际化？</h3>
              <ul>
                <li>扩大产品受众范围</li>
                <li>提升全球用户体验</li>
                <li>满足不同地区的法律要求</li>
                <li>增强品牌国际影响力</li>
              </ul>
            </div>

            <div class="concept-item">
              <div class="concept-icon">
                <i class="icon-components"></i>
              </div>
              <h3>国际化关键要素</h3>
              <div class="i18n-elements">
                <div class="element">
                  <div class="element-icon">🌐</div>
                  <div class="element-text">语言翻译</div>
                </div>
                <div class="element">
                  <div class="element-icon">📅</div>
                  <div class="element-text">日期时间格式</div>
                </div>
                <div class="element">
                  <div class="element-icon">💰</div>
                  <div class="element-text">货币格式</div>
                </div>
                <div class="element">
                  <div class="element-icon">🔢</div>
                  <div class="element-text">数字格式</div>
                </div>
                <div class="element">
                  <div class="element-icon">📏</div>
                  <div class="element-text">单位系统</div>
                </div>
              </div>
            </div>
          </div>

          <div class="i18n-workflow">
            <h3><i class="icon-workflow"></i> 国际化基本流程</h3>
            <div class="workflow-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-desc">提取所有文本内容</div>
              </div>
              <div class="step-arrow">→</div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-desc">创建翻译文件</div>
              </div>
              <div class="step-arrow">→</div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-desc">实现语言切换</div>
              </div>
              <div class="step-arrow">→</div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-desc">处理格式化内容</div>
              </div>
              <div class="step-arrow">→</div>
              <div class="step">
                <div class="step-number">5</div>
                <div class="step-desc">测试与优化</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 实现方法部分 -->
        <section v-show="activeSection === 'methods'" class="section-card">
          <h2><i class="icon-methods"></i> 国际化实现方法</h2>

          <div class="method-tabs">
            <button :class="{ active: methodType === 'vuei18n' }" @click="methodType = 'vuei18n'">Vue I18n</button>
            <button :class="{ active: methodType === 'custom' }" @click="methodType = 'custom'">自定义方案</button>
            <button :class="{ active: methodType === 'reactintl' }" @click="methodType = 'reactintl'">React
              Intl</button>
            <button :class="{ active: methodType === 'i18next' }" @click="methodType = 'i18next'">i18next</button>
          </div>

          <div v-show="methodType === 'vuei18n'" class="method-content">
            <div class="method-header">
              <div class="method-icon">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBmaWxsPSIjNDJiODgzIiBkPSJNMjA0LjggMEg1MS4yQzIzIDAgMCAyMyAwIDUxLjJ2MTUzLjZjMCAyOC4yIDIzIDUxLjIgNTEuMiA1MS4yaDE1My42YzI4LjIgMCA1MS4yLTIzIDUxLjItNTEuMlY1MS4yQzI1NiAyMyAyMzMgMCAyMDQuOCAweiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xNTkuNiAxNTUuNmMtMTEuNiAwLTIxLTMuMi0yNi40LTguNGw4LjgtMTUuMmM0LjQgNCAxMC44IDYuNCAxNy42IDYuNCA4IDAgMTIuNC0zLjIgMTIuNC04LjRzLTQuNC04LjQtMTItMTIuOGMtMTEuMi01LjYtMTguNC0xMi0xOC40LTIyLjQgMC0xMy42IDExLjItMjIuNCAyNi44LTIyLjQgOS42IDAgMTcuNiAyLjggMjIuOCA3LjJsLTguOCAxNC40Yy00LjQtMi44LTkuNi00LjQtMTQtNC40LTcuNiAwLTExLjIgMy42LTExLjIgOCAwIDUuNiA0LjQgOCA5LjIgMTEuMiAxMiA1LjYgMTkuNiAxMi40IDE5LjYgMjQuNCAwIDE0LjQtMTAuOCAyMy42LTI4LjQgMjMuNnptLTk1LjItMjkuNmMwLTE2LjQgMTEuNi0yOC40IDI3LjItMjguNGgxOC40VjE0NGgtMTguNGMtMTUuNiAwLTI3LjItMTItMjcuMi0yOC40em0xOC40LTguOGMtMTAuOCAwLTE3LjIgNS4yLTE3LjIgMTMuNiAwIDguOCA2LjQgMTQgMTcuMiAxNFYxMTd6bTg0LjggNDguOGMtMTIuOCAwLTIyLjQtNC40LTI5LjYtMTEuNmw4LjgtMTYuOGM1LjYgNC44IDEzLjIgOCAyMC44IDggOC44IDAgMTQuNC00LjQgMTQuNC0xMC44IDAtNi40LTQuOC05LjYtMTYuOC0xNC40LTE0LjQtNi40LTIxLjYtMTMuNi0yMS42LTI0LjQgMC0xNi40IDE0LjQtMjcuMiAzMy4yLTI3LjIgMTIuOCAwIDIyLjQgNC44IDI4LjQgMTAuNGwtOS42IDE1LjZjLTQuOC00LTExLjItNi40LTE4LjQtNi40LTcuNiAwLTEzLjIgMy4yLTEzLjIgOS42IDAgNi40IDQgOS42IDE1LjIgMTMuNiAxNi40IDcuMiAyNC40IDE0LjQgMjQuNCAyNy4yIDAgMTcuNi0xNC40IDI4LjgtMzUuMiAyOC44eiIvPjwvc3ZnPg=="
                  alt="Vue I18n" class="logo">
              </div>
              <div class="method-info">
                <h3>Vue I18n 方案</h3>
                <p>Vue.js官方推荐的国际化解决方案，深度集成Vue生态系统</p>
              </div>
            </div>

            <div class="implementation">
              <div class="code-section">
                <h4><i class="icon-code"></i> 安装与配置</h4>
                <pre><code>npm install vue-i18n@9

// main.ts
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'

const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, zh }
})

createApp(App).use(i18n).mount('#app')</code></pre>
              </div>

              <div class="code-section">
                <h4><i class="icon-template"></i> 在模板中使用</h4>
                <pre><code>&lt;!-- 文本翻译 --&gt;
&lt;h1&gt; $t('welcomeMessage') &lt;/h1&gt;

&lt;!-- 带参数 --&gt;
&lt;p&gt; $t('greeting', { name: 'John' }) &lt;/p&gt;

&lt;!-- 复数形式 --&gt;
&lt;p&gt; $tc('itemCount', 5, { count: 5 }) &lt;/p&gt;

&lt;!-- 日期格式化 --&gt;
&lt;p&gt; $d(new Date(), 'short') &lt;/p&gt;

&lt;!-- 数字格式化 --&gt;
&lt;p&gt; $n(1234.56, 'currency') &lt;/p&gt;</code></pre>
              </div>

              <div class="code-section">
                <h4><i class="icon-script"></i> 在Composition API中使用</h4>
                <pre><code>import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const { t, d, n } = useI18n()

    const welcomeMessage = t('welcomeMessage')
    const formattedDate = d(new Date(), 'long')
    const formattedNumber = n(1234.56, 'currency')

    return { welcomeMessage, formattedDate, formattedNumber }
  }
}</code></pre>
              </div>
            </div>

            <div class="pros-cons">
              <div class="pros">
                <h4><i class="icon-check"></i> 优点</h4>
                <ul>
                  <li>官方维护，Vue生态完美集成</li>
                  <li>丰富的格式化功能（日期、货币、复数等）</li>
                  <li>支持Composition API和Options API</li>
                  <li>良好的TypeScript支持</li>
                  <li>活跃的社区和文档</li>
                </ul>
              </div>
              <div class="cons">
                <h4><i class="icon-warning"></i> 缺点</h4>
                <ul>
                  <li>仅适用于Vue项目，非通用解决方案</li>
                  <li>学习曲线稍陡峭</li>
                  <li>包体积相对较大（约15KB）</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-show="methodType === 'custom'" class="method-content">
            <div class="method-header">
              <div class="method-icon">
                <i class="icon-custom"></i>
              </div>
              <div class="method-info">
                <h3>自定义国际化方案</h3>
                <p>轻量级实现，适合小型项目或简单需求</p>
              </div>
            </div>

            <div class="implementation">
              <div class="code-section">
                <h4><i class="icon-code"></i> 实现代码</h4>
                <pre><code>// locales.js
const translations = {
  en: {
    welcome: "Welcome to our application!",
    greeting: "Hello, {name}!",
    date: "{date, date, short}",
    currency: "{value, number, currency}"
  },
  zh: {
    welcome: "欢迎使用我们的应用！",
    greeting: "你好, {name}!",
    date: "{date, date, short}",
    currency: "{value, number, currency}"
  }
};

// i18n.js
let currentLocale = 'en';

export const setLocale = (locale) => {
  currentLocale = locale;
};

export const t = (key, params = {}) => {
  const message = translations[currentLocale][key] || key;

  return message.replace(/\{(\w+)\}/g, (match, param) => {
    return params[param] || match;
  });
};

// 使用示例
import { t, setLocale } from './i18n';

console.log(t('welcome')); // "Welcome to our application!"
console.log(t('greeting', { name: 'John' })); // "Hello, John!"

setLocale('zh');
console.log(t('welcome')); // "欢迎使用我们的应用！"</code></pre>
              </div>

              <div class="code-section">
                <h4><i class="icon-format"></i> 格式化扩展</h4>
                <pre><code>// 扩展格式化功能
const formatters = {
  date: (value, style = 'short') => {
    return new Intl.DateTimeFormat(currentLocale, {
      dateStyle: style
    }).format(value);
  },
  currency: (value, currency = 'USD') => {
    return new Intl.NumberFormat(currentLocale, {
      style: 'currency',
      currency
    }).format(value);
  }
};

export const t = (key, params = {}) => {
  let message = translations[currentLocale][key] || key;

  // 处理带格式化的参数
  message = message.replace(/\{(\w+), (\w+), (\w+)\}/g, (match, param, type, format) => {
    if (formatters[type]) {
      return formatters[type](params[param], format);
    }
    return params[param] || match;
  });

  // 处理普通参数
  return message.replace(/\{(\w+)\}/g, (match, param) => {
    return params[param] || match;
  });
};</code></pre>
              </div>
            </div>

            <div class="pros-cons">
              <div class="pros">
                <h4><i class="icon-check"></i> 优点</h4>
                <ul>
                  <li>零依赖，包体积小</li>
                  <li>完全控制实现细节</li>
                  <li>简单易懂，学习成本低</li>
                  <li>适用于小型项目或简单需求</li>
                </ul>
              </div>
              <div class="cons">
                <h4><i class="icon-warning"></i> 缺点</h4>
                <ul>
                  <li>需要自行实现复杂功能（复数、性别等）</li>
                  <li>缺少高级特性（如语言懒加载）</li>
                  <li>维护成本随项目复杂度增加</li>
                  <li>缺乏社区支持和文档</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-show="methodType === 'i18next'" class="method-content">
            <div class="method-header">
              <div class="method-icon">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNTEyIj48cGF0aCBmaWxsPSIjMjFhZjY0IiBkPSJNNjA2LjYgODQuM2MtMTIuMy0xMy4yLTMxLjQtMTMuOC00NC42LTEuNWwtMTQ0LjMgMTM1LjMtODIuMy04NC4yYy0xMi43LTEyLjktMzMuMi0xMi43LTQ1LjcuN2wtNDQuMiA0My43Yy0xMi45IDEyLjktMTIuNyAzMy40LjcgNDUuN2wxMzcuOCAxMzcuM2MxMi44IDEyLjggMzMuNiAxMi4zIDQ1LjctMS4zbDIwMi4zLTIzMC4yYzEyLjUtMTQuNCAxMS45LTM2LjItMS4zLTQ5LjV6Ii8+PHBhdGggZmlsbD0iIzIxYWY2NCIgZD0iTTM2MC45IDE3OS45Yy0xMy4yLTEyLjMtMzMuOC0xMi00Ni4xLjdsLTg14bDg1LjQgODIuM2MxMi44IDEyLjMgMzMuMSAxMi40IDQ2LjEuNGw0My44LTQzLjRjMTIuOS0xMi45IDEyLjctMzMuNC0uNi00NS44bC04My44LTgzLjh6Ii8+PC9zdmc+"
                  alt="i18next" class="logo">
              </div>
              <div class="method-info">
                <h3>i18next 方案</h3>
                <p>强大的国际化框架，支持多种前端框架和后端集成</p>
              </div>
            </div>

            <div class="implementation">
              <div class="code-section">
                <h4><i class="icon-code"></i> 安装与配置</h4>
                <pre><code>npm install i18next vue-i18next

// i18n.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// 或 Vue: import VueI18Next from '@panter/vue-i18next'

i18n
  .use(initReactI18next) // 或 .use(VueI18Next) for Vue
  .init({
    resources: {
      en: { translation: { /* 翻译内容 */ } },
      zh: { translation: { /* 翻译内容 */ } }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;</code></pre>
              </div>

              <div class="code-section">
                <h4><i class="icon-features"></i> 核心特性</h4>
                <ul class="features-list">
                  <li>插件系统（格式、后端加载等）</li>
                  <li>多种缓存策略</li>
                  <li>语言检测（浏览器、URL参数等）</li>
                  <li>命名空间支持</li>
                  <li>丰富的格式化选项</li>
                  <li>支持React、Vue、Angular等框架</li>
                </ul>
              </div>
            </div>

            <div class="pros-cons">
              <div class="pros">
                <h4><i class="icon-check"></i> 优点</h4>
                <ul>
                  <li>框架无关，通用解决方案</li>
                  <li>功能全面，支持复杂场景</li>
                  <li>强大的插件生态系统</li>
                  <li>支持服务器端渲染</li>
                  <li>成熟的商业支持</li>
                </ul>
              </div>
              <div class="cons">
                <h4><i class="icon-warning"></i> 缺点</h4>
                <ul>
                  <li>学习曲线陡峭</li>
                  <li>配置复杂</li>
                  <li>包体积较大（核心约30KB）</li>
                  <li>部分高级功能需要付费</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 最佳实践部分 -->
        <section v-show="activeSection === 'best'" class="section-card">
          <h2><i class="icon-best"></i> 国际化最佳实践</h2>

          <div class="best-practices">
            <div class="practice-card">
              <div class="practice-icon">
                <i class="icon-text"></i>
              </div>
              <h3>文本处理</h3>
              <ul>
                <li>避免拼接字符串，使用完整句子</li>
                <li>为翻译提供上下文信息</li>
                <li>预留空间适应文本长度变化</li>
                <li>处理HTML标签的翻译安全</li>
              </ul>
            </div>

            <div class="practice-card">
              <div class="practice-icon">
                <i class="icon-date"></i>
              </div>
              <h3>日期与时间</h3>
              <ul>
                <li>使用ISO 8601格式存储日期</li>
                <li>利用Intl.DateTimeFormat进行格式化</li>
                <li>考虑时区转换</li>
                <li>提供相对时间格式（如"2天前"）</li>
              </ul>
            </div>

            <div class="practice-card">
              <div class="practice-icon">
                <i class="icon-number"></i>
              </div>
              <h3>数字与货币</h3>
              <ul>
                <li>使用Intl.NumberFormat进行本地化格式化</li>
                <li>处理不同货币符号位置</li>
                <li>考虑小数点分隔符差异（. vs ,）</li>
                <li>处理大数字单位（千、百万等）</li>
              </ul>
            </div>

            <div class="practice-card">
              <div class="practice-icon">
                <i class="icon-image"></i>
              </div>
              <h3>媒体与图标</h3>
              <ul>
                <li>为文化敏感的图片提供替代版本</li>
                <li>避免文本嵌入图片</li>
                <li>考虑图标的文化含义差异</li>
                <li>提供无障碍文本描述</li>
              </ul>
            </div>

            <div class="practice-card">
              <div class="practice-icon">
                <i class="icon-layout"></i>
              </div>
              <h3>布局与设计</h3>
              <ul>
                <li>支持RTL（从右到左）布局</li>
                <li>使用弹性布局适应文本长度变化</li>
                <li>考虑不同语言的阅读模式</li>
                <li>测试极端长度文本情况</li>
              </ul>
            </div>

            <div class="practice-card">
              <div class="practice-icon">
                <i class="icon-workflow"></i>
              </div>
              <h3>开发流程</h3>
              <ul>
                <li>使用i18n keys代替硬编码文本</li>
                <li>提取所有可翻译文本到资源文件</li>
                <li>集成翻译管理系统（TMS）</li>
                <li>自动化翻译流程</li>
              </ul>
            </div>
          </div>

          <div class="tools-section">
            <h3><i class="icon-tools"></i> 国际化工具推荐</h3>
            <div class="tools-grid">
              <div class="tool-card">
                <div class="tool-icon">🌐</div>
                <h4>翻译管理系统</h4>
                <p>Phrase, Lokalise, Crowdin</p>
              </div>
              <div class="tool-card">
                <div class="tool-icon">🔍</div>
                <h4>文本提取工具</h4>
                <p>i18next-parser, vue-i18n-extract</p>
              </div>
              <div class="tool-card">
                <div class="tool-icon">📦</div>
                <h4>CDN托管</h4>
                <p>Phrase CDN, Crowdin CDN</p>
              </div>
              <div class="tool-card">
                <div class="tool-icon">🔧</div>
                <h4>自动化工具</h4>
                <p>GitLocalize, Transifex CLI</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 方案选择指南 -->
        <section v-show="activeSection === 'choose'" class="section-card">
          <h2><i class="icon-choose"></i> 方案选择指南</h2>

          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>方案</th>
                  <th>适用场景</th>
                  <th>复杂度</th>
                  <th>包大小</th>
                  <th>功能完整性</th>
                  <th>框架支持</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vue I18n</td>
                  <td>Vue项目，需要深度集成</td>
                  <td>中等</td>
                  <td>~15KB</td>
                  <td>高</td>
                  <td>Vue专属</td>
                </tr>
                <tr>
                  <td>自定义方案</td>
                  <td>小型项目，简单需求</td>
                  <td>低</td>
                  <td>~1KB</td>
                  <td>低</td>
                  <td>通用</td>
                </tr>
                <tr>
                  <td>i18next</td>
                  <td>企业级应用，复杂需求</td>
                  <td>高</td>
                  <td>~30KB</td>
                  <td>非常高</td>
                  <td>通用</td>
                </tr>
                <tr>
                  <td>React Intl</td>
                  <td>React项目</td>
                  <td>中等</td>
                  <td>~20KB</td>
                  <td>高</td>
                  <td>React专属</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="decision-tree">
            <h3><i class="icon-flow"></i> 方案选择决策树</h3>
            <div class="tree-container">
              <div class="tree-node start">项目需要国际化？</div>
              <div class="tree-arrow">↓</div>

              <div class="tree-branch">
                <div class="tree-node">是小型项目？</div>
                <div class="tree-arrow">↓</div>
                <div class="tree-node yes">是 → 使用自定义方案</div>
                <div class="tree-node no">否 → 继续</div>
              </div>

              <div class="tree-arrow">↓</div>

              <div class="tree-branch">
                <div class="tree-node">使用什么框架？</div>
                <div class="tree-arrow">↓</div>
                <div class="tree-node">Vue → Vue I18n</div>
                <div class="tree-node">React → React Intl</div>
                <div class="tree-node">其他 → i18next</div>
              </div>

              <div class="tree-arrow">↓</div>

              <div class="tree-branch">
                <div class="tree-node">需要企业级功能？</div>
                <div class="tree-arrow">↓</div>
                <div class="tree-node yes">是 → 选择i18next</div>
                <div class="tree-node no">否 → 框架专属方案</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>© 2023 前端国际化方案指南 | 构建全球化的Web应用</p>
      <p>根据项目需求选择最适合的国际化方案</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const navItems = ref([
  { id: 'concept', title: '基础概念', icon: 'icon-info' },
  { id: 'methods', title: '实现方法', icon: 'icon-methods' },
  { id: 'best', title: '最佳实践', icon: 'icon-best' },
  { id: 'choose', title: '方案选择', icon: 'icon-choose' }
]);

const activeSection = ref('concept');
const methodType = ref('vuei18n');
</script>

<style lang="less" scoped>


:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --accent-color: #e74c3c;
  --success-color: #2ecc71;
  --warning-color: #f39c12;
  --light-bg: #f8f9fa;
  --dark-bg: #2c3e50;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --border-radius: 8px;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', sans-serif;
  background-color: #f0f2f5;
  color: #333;
  line-height: 1.6;
}

.i18n-container {
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, var(--secondary-color), #1a2530);
  color: white;
  padding: 2rem;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.content-wrapper {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 250px;
  background: var(--light-bg);
  border-right: 1px solid #eaeaea;
  padding: 1.5rem 0;

  ul {
    list-style: none;
  }

  li {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;

    &:hover {
      background: #e3f2fd;
      color: var(--primary-color);
    }

    &.active {
      background: var(--primary-color);
      color: rgb(255, 146, 146);
      border-left: 4px solid var(--secondary-color);
    }
  }
}

.main-content {
  flex: 1;
  padding: 2rem;
  background: #fafafa;
}

.section-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 2rem;
  margin-bottom: 2rem;

  h2 {
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #f0f0f0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

/* 基础概念样式 */
.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.concept-item {
  background: var(--light-bg);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow);
  }

  h3 {
    color: var(--secondary-color);
    margin: 1rem 0;
  }
}

.concept-icon {
  background: var(--primary-color);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.i18n-elements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.element {
  text-align: center;
  padding: 0.8rem;
  background: #e3f2fd;
  border-radius: var(--border-radius);

  .element-icon {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
}

.i18n-workflow {
  margin-top: 2rem;

  h3 {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.workflow-steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.step {
  background: var(--primary-color);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  min-width: 150px;
  text-align: center;
  position: relative;

  .step-number {
    position: absolute;
    top: -12px;
    left: -12px;
    background: var(--secondary-color);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
}

.step-arrow {
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
}

/* 实现方法样式 */
.method-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1.5rem;

  button {
    padding: 0.8rem 1.2rem;
    background: #e0e0e0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: var(--transition);

    &:hover {
      background: #d0d0d0;
    }

    &.active {
      background: var(--primary-color);
      color: rgb(255, 146, 146);
    }
  }
}

.method-header {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.method-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f0f5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    font-size: 2.5rem;
    color: var(--primary-color);
  }

  .logo {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
}

.implementation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.code-section {
  background: #f8f9fa;
  border-radius: var(--border-radius);
  padding: 1.5rem;

  h4 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;
    color: var(--secondary-color);
  }

  pre {
    background: #2c3e50;
    color: #ecf0f1;
    border-radius: 6px;
    padding: 1.2rem;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;

    code {
      font-family: inherit;
    }
  }
}

.features-list {
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.8rem;
    padding-left: 0.5rem;
    position: relative;

    &::before {
      content: "•";
      color: var(--primary-color);
      font-weight: bold;
      position: absolute;
      left: -1rem;
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .pros,
  .cons {
    padding: 1.2rem;
    border-radius: var(--border-radius);
  }

  .pros {
    background: #e8f5e9;
    border-left: 4px solid var(--success-color);
  }

  .cons {
    background: #ffebee;
    border-left: 4px solid var(--accent-color);
  }

  h4 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;
  }
}

/* 最佳实践样式 */
.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.practice-card {
  border: 1px solid #eaeaea;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow);
  }

  h3 {
    color: var(--secondary-color);
    margin: 1rem 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.6rem;
      line-height: 1.5;
    }
  }
}

.practice-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #e3f2fd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--primary-color);
}

.tools-section {
  margin-top: 2rem;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.tool-card {
  border: 1px solid #eaeaea;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  text-align: center;

  .tool-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h4 {
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
  }
}

/* 方案选择样式 */
.comparison-table {
  overflow-x: auto;
  margin-bottom: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1rem;
      text-align: left;
      border: 1px solid #eaeaea;
    }

    th {
      background: var(--light-bg);
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f9f9f9;
    }
  }
}

.decision-tree {
  background: #f8f9fa;
  border-radius: var(--border-radius);
  padding: 2rem;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
  }
}

.tree-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tree-node {
  background: white;
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
  padding: 1rem 1.5rem;
  text-align: center;
  min-width: 250px;
  margin: 0.5rem 0;
  position: relative;

  &.start {
    background: var(--primary-color);
    color: white;
    font-weight: bold;
  }

  &.yes {
    border-color: var(--success-color);

    &::before {
      content: "是";
      position: absolute;
      left: -50px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--success-color);
      font-weight: bold;
    }
  }

  &.no {
    border-color: var(--accent-color);

    &::before {
      content: "否";
      position: absolute;
      left: -50px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--accent-color);
      font-weight: bold;
    }
  }
}

.tree-arrow {
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
}

.tree-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
}

/* 页脚样式 */
.footer {
  background: var(--secondary-color);
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;

  p {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.8;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* 图标样式 */
[class^="icon-"] {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}

.icon-language::before {
  content: "language";
}

.icon-info::before {
  content: "info";
}

.icon-methods::before {
  content: "code";
}

.icon-best::before {
  content: "star";
}

.icon-choose::before {
  content: "checklist";
}

.icon-definition::before {
  content: "description";
}

.icon-why::before {
  content: "help";
}

.icon-components::before {
  content: "widgets";
}

.icon-workflow::before {
  content: "device_hub";
}

.icon-code::before {
  content: "code";
}

.icon-template::before {
  content: "article";
}

.icon-script::before {
  content: "terminal";
}

.icon-features::before {
  content: "featured_play_list";
}

.icon-format::before {
  content: "format_shapes";
}

.icon-check::before {
  content: "check_circle";
}

.icon-warning::before {
  content: "warning";
}

.icon-text::before {
  content: "text_fields";
}

.icon-date::before {
  content: "event";
}

.icon-number::before {
  content: "numbers";
}

.icon-image::before {
  content: "image";
}

.icon-layout::before {
  content: "view_quilt";
}

.icon-tools::before {
  content: "build";
}

.icon-flow::before {
  content: "account_tree";
}

.icon-custom::before {
  content: "settings";
}
</style>
