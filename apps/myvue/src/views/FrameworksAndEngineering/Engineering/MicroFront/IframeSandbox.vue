<template>
  <div class="iframe-sandbox-container">
    <header>
      <h1>iframe沙箱技术解析</h1>
      <p>安全隔离不受信任内容的Web标准解决方案</p>
    </header>

    <!-- <iframe src="http://localhost:5173/" frameborder="0" sandbox="allow-scripts allow-same-origin"></iframe> -->

    <div class="content-grid">
      <section class="intro-section">
        <div class="card">
          <h2>什么是iframe沙箱？</h2>
          <p>iframe沙箱是一种通过HTML5的<code>sandbox</code>属性实现的浏览器原生隔离机制，用于在网页中安全地嵌入不受信任的内容。</p>

          <div class="sandbox-diagram">
            <div class="host-page">
              <span>主应用页面</span>
              <div class="sandboxed-iframe">
                <span>沙箱化iframe</span>
                <div class="untrusted-content">
                  <div class="content-item">不受信任的内容</div>
                  <div class="content-item">第三方组件</div>
                  <div class="content-item">用户生成内容</div>
                </div>
              </div>
            </div>
          </div>

          <div class="feature-summary">
            <div class="feature">
              <i class="icon-security"></i>
              <span>安全隔离</span>
            </div>
            <div class="feature">
              <i class="icon-resource"></i>
              <span>资源控制</span>
            </div>
            <div class="feature">
              <i class="icon-api"></i>
              <span>API限制</span>
            </div>
            <div class="feature">
              <i class="icon-config"></i>
              <span>可配置权限</span>
            </div>
          </div>
        </div>
      </section>

      <section class="usage-section">
        <h2>基础用法</h2>
        <div class="card">
          <pre><code>&lt;iframe
  src="untrusted.html"
  sandbox="allow-scripts allow-same-origin"
&gt;&lt;/iframe&gt;</code></pre>

          <div class="attribute-explainer">
            <h3>sandbox属性基本介绍</h3>
            <p>通过组合以下属性值控制沙箱权限：</p>
            <ul>
              <li v-for="(attr, index) in sandboxAttributes" :key="index">
                <strong>{{ attr.name }}</strong>: {{ attr.description }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2>优点与缺点分析</h2>
        <div class="pros-cons-grid">
          <div class="pros">
            <h3><i class="icon-check"></i> 优点</h3>
            <ul>
              <li v-for="(pro, index) in pros" :key="'pro-' + index">
                <i class="icon-pro"></i> {{ pro }}
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3><i class="icon-warning"></i> 缺点</h3>
            <ul>
              <li v-for="(con, index) in cons" :key="'con-' + index">
                <i class="icon-con"></i> {{ con }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="use-cases-section">
        <h2>典型使用场景</h2>
        <div class="use-cases">
          <div v-for="(useCase, index) in useCases" :key="index" class="use-case-card">
            <div class="case-icon" :style="{ backgroundColor: useCase.color }">
              <i :class="useCase.icon"></i>
            </div>
            <h3>{{ useCase.title }}</h3>
            <p>{{ useCase.description }}</p>
            <div class="recommended-attributes">
              <span>推荐属性:</span>
              <code>{{ useCase.attributes }}</code>
            </div>
          </div>
        </div>
      </section>

      <section class="security-section">
        <h2>安全增强建议</h2>
        <div class="security-tips">
          <div class="tip">
            <div class="tip-header">
              <div class="tip-number">1</div>
              <h3>最小权限原则</h3>
            </div>
            <p>只授予必要的最小权限，避免使用空值或<code>allow-all</code>，优先使用限制性最强的沙箱配置。</p>
          </div>

          <div class="tip">
            <div class="tip-header">
              <div class="tip-number">2</div>
              <h3>CSP策略加固</h3>
            </div>
            <p>结合内容安全策略(CSP)，限制沙箱内资源加载：</p>
            <pre><code>Content-Security-Policy: default-src 'self'</code></pre>
          </div>

          <div class="tip">
            <div class="tip-header">
              <div class="tip-number">3</div>
              <h3>跨域通信安全</h3>
            </div>
            <p>使用<code>postMessage</code>进行安全通信，严格验证来源：</p>
            <pre><code>window.addEventListener('message', (event) => {
  if (event.origin !== 'https://trusted.com') return;
  // 处理消息
});</code></pre>
          </div>

          <div class="tip">
            <div class="tip-header">
              <div class="tip-number">4</div>
              <h3>定期安全审计</h3>
            </div>
            <p>定期审查沙箱配置，测试已知漏洞（如点击劫持、XSS等），确保隔离有效性。</p>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <p>重要提示：iframe沙箱是强大的安全工具，但配置不当可能留下安全漏洞</p>
      <div class="footer-links">
        <span> Web安全实验室</span>
        <span>沙箱技术研究报告 v1.3</span>
        <span>最后更新: 2023年6月15日</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 沙箱属性说明
const sandboxAttributes = ref([
  { name: 'allow-forms', description: '允许提交表单' },
  { name: 'allow-modals', description: '允许打开弹窗(alert, confirm等)' },
  { name: 'allow-orientation-lock', description: '允许锁定屏幕方向' },
  { name: 'allow-pointer-lock', description: '允许使用指针锁定API' },
  { name: 'allow-popups', description: '允许打开新窗口或标签页' },
  { name: 'allow-popups-to-escape-sandbox', description: '允许新窗口脱离沙箱限制' },
  { name: 'allow-presentation', description: '允许使用Presentation API' },
  { name: 'allow-same-origin', description: '允许内容被视为同源' },
  { name: 'allow-scripts', description: '允许执行JavaScript' },
  { name: 'allow-top-navigation', description: '允许iframe内容导航顶级窗口' },
  { name: 'allow-top-navigation-by-user-activation', description: '允许在用户操作下导航顶级窗口' }
]);

// 优点列表
const pros = ref([
  '浏览器原生支持，无需额外依赖',
  '提供真正的进程级隔离',
  '细粒度的权限控制系统',
  '防止恶意代码影响主应用',
  '有效缓解XSS攻击',
  '支持跨域内容安全嵌入',
  '阻止cookie和存储访问'
]);

// 缺点列表
const cons = ref([
  'UI集成和样式控制较困难',
  '通信机制相对复杂(postMessage)',
  '可能影响页面性能(每个iframe都是独立进程)',
  '移动设备上滚动行为可能不一致',
  '某些高级API被完全禁用',
  '需要仔细配置权限避免过度限制',
  '旧版浏览器支持有限(IE10+部分支持)'
]);

// 使用场景
const useCases = ref([
  {
    title: '第三方组件嵌入',
    icon: 'icon-widget',
    description: '安全嵌入用户提供的或不受信任的第三方小部件',
    attributes: 'allow-scripts allow-same-origin',
    color: '#4361ee'
  },
  {
    title: '用户生成内容',
    icon: 'icon-content',
    description: '展示用户提交的HTML内容（评论、帖子等）',
    attributes: 'allow-same-origin',
    color: '#3f37c9'
  },
  {
    title: '代码预览/执行',
    icon: 'icon-code',
    description: '在线代码编辑器和预览环境',
    attributes: 'allow-scripts allow-modals allow-forms',
    color: '#4cc9f0'
  },
  {
    title: '广告展示',
    icon: 'icon-ad',
    description: '安全展示第三方广告内容',
    attributes: 'allow-scripts allow-popups allow-same-origin',
    color: '#f72585'
  },
  {
    title: '支付表单',
    icon: 'icon-payment',
    description: '隔离支付处理页面保护敏感信息',
    attributes: 'allow-forms allow-scripts allow-same-origin',
    color: '#2a9d8f'
  },
  {
    title: '文档预览',
    icon: 'icon-document',
    description: '安全预览用户上传的HTML/PDF文档',
    attributes: 'allow-same-origin',
    color: '#f8961e'
  }
]);
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@danger-color: #e63946;
@warning-color: #f8961e;
@success-color: #2a9d8f;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@code-bg: #f1f3f5;

// 混合
.box-shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

.border-radius {
  border-radius: 10px;
}

.transition {
  transition: all 0.3s ease;
}

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.iframe-sandbox-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: @light-bg;
  color: @text-dark;
  line-height: 1.6;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px 0;

    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.1rem;
      color: @text-light;
      max-width: 800px;
      margin: 0 auto;
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px;

    section {
      margin-bottom: 25px;

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: @secondary-color;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 2px solid fade(@primary-color, 30%);
      }
    }

    .card {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      padding: 25px;
      margin-bottom: 20px;
      border: 1px solid @border-color;
    }
  }

  // 沙箱图示样式
  .sandbox-diagram {
    margin: 25px 0;
    padding: 15px;
    background: lighten(@primary-color, 45%);
    .border-radius();

    .host-page {
      position: relative;
      padding: 60px 20px 20px;
      border: 2px dashed @primary-color;
      .border-radius();
      text-align: center;

      span {
        position: absolute;
        top: 10px;
        left: 10px;
        font-weight: 500;
        color: @primary-color;
      }

      .sandboxed-iframe {
        position: relative;
        padding: 50px 15px 15px;
        margin: 15px;
        border: 3px solid @success-color;
        .border-radius();
        background: lighten(@success-color, 40%);

        span {
          position: absolute;
          top: 10px;
          left: 10px;
          font-weight: 500;
          color: darken(@success-color, 10%);
        }

        .untrusted-content {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;

          .content-item {
            padding: 15px;
            background: lighten(@warning-color, 35%);
            border: 1px solid @warning-color;
            .border-radius();
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  .feature-summary {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 25px;

    .feature {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 120px;

      i {
        font-size: 2rem;
        color: @primary-color;
        margin-bottom: 8px;
      }

      span {
        font-size: 0.9rem;
        font-weight: 500;
        text-align: center;
      }
    }
  }

  // 属性说明
  .attribute-explainer {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid @border-color;

    ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 12px;
      margin-top: 15px;

      li {
        padding: 10px 15px;
        background: @code-bg;
        border-radius: 6px;
        font-size: 0.9rem;

        strong {
          color: @secondary-color;
          font-weight: 600;
        }
      }
    }
  }

  // 代码块样式
  pre {
    background: @code-bg;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 15px 0;
    border-left: 3px solid @primary-color;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      color: @text-dark;
      line-height: 1.5;
    }
  }

  // 优缺点网格
  .pros-cons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .pros,
    .cons {
      .border-radius();
      padding: 20px;

      h3 {
        display: flex;
        align-items: center;
        font-size: 1.3rem;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 2px solid;

        i {
          margin-right: 10px;
        }
      }

      ul {
        li {
          padding: 10px 0;
          display: flex;
          align-items: flex-start;

          i {
            margin-right: 10px;
            flex-shrink: 0;
            margin-top: 4px;
          }
        }
      }
    }

    .pros {
      background: lighten(@success-color, 50%);
      border: 1px solid fade(@success-color, 40%);

      h3 {
        color: darken(@success-color, 20%);
        border-bottom-color: fade(@success-color, 30%);
      }
    }

    .cons {
      background: lighten(@warning-color, 40%);
      border: 1px solid fade(@warning-color, 40%);

      h3 {
        color: darken(@warning-color, 20%);
        border-bottom-color: fade(@warning-color, 30%);
      }
    }
  }

  // 使用场景
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;

    .use-case-card {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      padding: 25px 20px 20px;
      position: relative;
      border-top: 4px solid @primary-color;
      height: 100%;
      .transition();

      &:hover {
        transform: translateY(-5px);
      }

      .case-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;

        i {
          font-size: 1.8rem;
          color: white;
        }
      }

      h3 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: @text-dark;
      }

      p {
        color: @text-light;
        font-size: 0.95rem;
        margin-bottom: 15px;
      }

      .recommended-attributes {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px dashed @border-color;
        display: flex;
        align-items: center;
        font-size: 0.9rem;

        span {
          color: @text-light;
          margin-right: 8px;
        }

        code {
          background: @code-bg;
          padding: 3px 8px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
        }
      }
    }
  }

  // 安全建议
  .security-tips {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;

    .tip {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      padding: 20px;
      border: 1px solid @border-color;

      .tip-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        .tip-number {
          width: 30px;
          height: 30px;
          background: @primary-color;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          margin-right: 12px;
        }

        h3 {
          font-size: 1.15rem;
          margin: 0;
          color: @secondary-color;
        }
      }

      p {
        color: @text-dark;
        margin-bottom: 10px;
      }

      pre {
        margin-top: 10px;
        margin-bottom: 0;
      }
    }
  }

  footer {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid @border-color;
    text-align: center;

    p {
      font-weight: 500;
      color: @danger-color;
      margin-bottom: 10px;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
      font-size: 0.9rem;
      color: @text-light;
    }
  }
}

// 图标字体
@font-face {
  font-family: 'sandbox-icons';
  src: url('data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAf0AAsAAAAADFQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFDGNtYXAAAAFoAAAAVAAAAFQXVtGJZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAqAAAAKgzQc2C2hlYWQAAARgAAAANgAAADYD5wOzaGhlYQAABJQAAAAkAAAAJAdCA4dobXR4AAAEvAAAABQAAAAUCAQAAGxvY2EAAATQAAAAEAAAABAB4gGcbWF4cAAABOAAAAAgAAAAIAATAChuYW1lAAAE4AAAAXkAAAF5ChzBxXBvc3QAAAY4AAAAIAAAACAAAwAAAAMD7AGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QMDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkD//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAQAAAAEAAAAAAAAAAAAA') format('woff');
}

[class^="icon-"],
[class*=" icon-"] {
  font-family: 'sandbox-icons' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-security:before {
  content: "\e900";
}

.icon-resource:before {
  content: "\e901";
}

.icon-api:before {
  content: "\e902";
}

.icon-config:before {
  content: "\e903";
}

.icon-widget:before {
  content: "\e904";
}

.icon-content:before {
  content: "\e905";
}

.icon-code:before {
  content: "\e906";
}

.icon-ad:before {
  content: "\e907";
}

.icon-payment:before {
  content: "\e908";
}

.icon-document:before {
  content: "\e909";
}

.icon-check:before {
  content: "\e90a";
}

.icon-warning:before {
  content: "\e90b";
}

.icon-pro:before {
  content: "\e90c";
}

.icon-con:before {
  content: "\e90d";
}
</style>
