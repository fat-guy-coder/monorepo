<template>
  <div class="sri-guide">
    <h1>子资源完整性(SRI)校验</h1>

    <!-- 概览 -->
    <div class="overview">
      <div class="overview-card">
        <div class="overview-icon">🛡️</div>
        <div>
          <h2>什么是SRI？</h2>
          <p>Web安全机制，用于验证获取的资源未被篡改</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">🔒</div>
        <div>
          <h2>核心目的</h2>
          <p>防止恶意第三方篡改CDN上的资源</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">⚙️</div>
        <div>
          <h2>实现方式</h2>
          <p>通过资源哈希值与属性完整性匹配验证</p>
        </div>
      </div>
    </div>

    <!-- 工作原理 -->
    <div class="section">
      <h2>SRI工作原理</h2>
      <div class="workflow">
        <div class="step" v-for="(step, index) in workflowSteps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
      <div class="sri-visual">
        <div class="browser">
          <div class="browser-header">浏览器</div>
          <div class="sri-process">
            <div class="resource">获取资源 (script.js)</div>
            <div class="arrow">↓</div>
            <div class="hash">计算哈希值</div>
            <div class="arrow">↓</div>
            <div class="compare">比较 integrity 属性值</div>
            <div class="arrow">↓</div>
            <div class="result valid">匹配 → 执行资源</div>
            <div class="result invalid">不匹配 → 阻塞执行</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 配置方法 -->
    <div class="section">
      <h2>SRI配置方法</h2>
      <div class="methods">
        <div class="method-card">
          <div class="method-icon">📝</div>
          <h3>1. 生成资源哈希值</h3>
          <p>使用加密哈希函数计算资源摘要</p>
          <pre class="code-block">openssl dgst -sha384 -binary [资源文件] | openssl base64 -A</pre>
          <pre class="code-block"># 或使用在线工具生成</pre>
        </div>

        <div class="method-card">
          <div class="method-icon">🔧</div>
          <h3>2. 添加integrity属性</h3>
          <p>在资源标签中添加integrity属性</p>
          <pre class="code-block">&lt;script
  src="https://cdn.example.com/library.js"
  integrity="sha384-<mark>dZ5Gf9N8zE5S5Q3fz7e7d5f5d5f5d5f5d5f5d5f5d5f5d5f5d5f5d5f5d5</mark>"
  crossorigin="anonymous"&gt;
&lt;/script&gt;</pre>
        </div>

        <div class="method-card">
          <div class="method-icon">🔄</div>
          <h3>3. 自动化集成</h3>
          <p>在构建流程中自动生成SRI哈希</p>
          <pre class="code-block">// webpack配置示例
const SriPlugin = require('webpack-subresource-integrity');

module.exports = {
  // ...
  output: {
    crossOriginLoading: 'anonymous'
  },
  plugins: [
    new SriPlugin({
      hashFuncNames: ['sha384'],
      enabled: process.env.NODE_ENV === 'production'
    })
  ]
};</pre>
        </div>
      </div>
    </div>

    <!-- 示例代码 -->
    <div class="section">
      <h2>完整示例代码</h2>
      <div class="examples">
        <div class="example">
          <h3>HTML脚本示例</h3>
          <pre class="code-block">&lt;!-- 使用SRI保护的外部脚本 --&gt;
&lt;script
  src="https://cdn.example.com/vue.global.prod.js"
  integrity="sha384-<mark>dZ5Gf9N8zE5S5Q3fz7e7d5f5d5f5d5f5d5f5d5f5d5f5d5f5d5f5d5f5d5</mark>"
  crossorigin="anonymous"&gt;
&lt;/script&gt;

&lt;!-- 使用SRI保护的外部样式表 --&gt;
&lt;link
  rel="stylesheet"
  href="https://cdn.example.com/styles.css"
  integrity="sha384-<mark>dZ5Gf9N8zE5S5Q3fz7e7d5f5d5f5d5f5d5f5d5f5d5f5d5f5d5f5d5f5d5</mark>"
  crossorigin="anonymous"&gt;</pre>
        </div>

        <div class="example">
          <h3>React/Vue框架集成</h3>
          <pre class="code-block">// React index.html (使用create-react-app)
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;link
    rel="stylesheet"
    href="&lt;%= process.env.REACT_APP_CDN_URL %&gt;/main.css"
    integrity="&lt;%= process.env.REACT_APP_CSS_SRI %&gt;"
    crossorigin="anonymous"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;script
    src="&lt;%= process.env.REACT_APP_CDN_URL %&gt;/bundle.js"
    integrity="&lt;%= process.env.REACT_APP_JS_SRI %&gt;"
    crossorigin="anonymous"&gt;
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
        </div>
      </div>
    </div>

    <!-- 安全作用 -->
    <div class="section">
      <h2>SRI的安全作用</h2>
      <div class="benefits">
        <div class="benefit-card">
          <div class="benefit-icon">🛡️</div>
          <h3>防止CDN劫持</h3>
          <p>即使CDN被入侵，浏览器也能检测到资源篡改</p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">🚫</div>
          <h3>阻止中间人攻击</h3>
          <p>在HTTP传输过程中阻止恶意脚本注入</p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">🔍</div>
          <h3>资源完整性验证</h3>
          <p>确保加载的资源与开发环境完全一致</p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">📦</div>
          <h3>供应链安全</h3>
          <p>保护第三方库和依赖不被恶意修改</p>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="section">
      <h2>SRI最佳实践</h2>
      <div class="practices">
        <div class="practice">
          <div class="practice-number">1</div>
          <div>
            <h3>使用强哈希算法</h3>
            <p>优先选择sha384或sha512，避免使用sha256</p>
          </div>
        </div>

        <div class="practice">
          <div class="practice-number">2</div>
          <div>
            <h3>自动化哈希生成</h3>
            <p>在CI/CD流程中自动生成和更新SRI哈希</p>
          </div>
        </div>

        <div class="practice">
          <div class="practice-number">3</div>
          <div>
            <h3>设置crossorigin属性</h3>
            <p>确保浏览器在CORS场景下正确处理SRI</p>
          </div>
        </div>

        <div class="practice">
          <div class="practice-number">4</div>
          <div>
            <h3>监控SRI错误</h3>
            <p>通过错误监控系统捕获SRI验证失败事件</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 浏览器支持 -->
    <div class="section">
      <h2>浏览器支持情况</h2>
      <div class="compatibility">
        <div class="browser-support">
          <div class="browser" v-for="browser in browserSupport" :key="browser.name">
            <div class="browser-icon">{{ browser.icon }}</div>
            <div class="browser-name">{{ browser.name }}</div>
            <div class="support-level" :class="browser.supportClass">{{ browser.support }}</div>
          </div>
        </div>
        <div class="support-note">所有现代浏览器均支持SRI标准</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// SRI工作流程步骤
const workflowSteps = ref([
  {
    title: "生成哈希摘要",
    description: "开发者使用加密算法（如SHA-384）为资源生成哈希值"
  },
  {
    title: "添加integrity属性",
    description: "将生成的哈希值添加到HTML的script/link标签的integrity属性"
  },
  {
    title: "浏览器获取资源",
    description: "用户浏览器下载外部资源（如CDN上的JavaScript文件）"
  },
  {
    title: "计算资源哈希",
    description: "浏览器使用指定的算法计算下载资源的哈希值"
  },
  {
    title: "完整性验证",
    description: "浏览器比较计算的哈希值与integrity属性中的哈希值"
  },
  {
    title: "执行或阻塞",
    description: "哈希匹配则执行资源，不匹配则阻塞执行并报告错误"
  }
]);

// 浏览器支持情况
const browserSupport = ref([
  { name: "Chrome", icon: "🌐", support: "45+", supportClass: "supported" },
  { name: "Firefox", icon: "🦊", support: "43+", supportClass: "supported" },
  { name: "Safari", icon: "🍎", support: "11+", supportClass: "supported" },
  { name: "Edge", icon: "🔷", support: "17+", supportClass: "supported" },
  { name: "Opera", icon: "⭕", support: "32+", supportClass: "supported" },
  { name: "IE", icon: "💤", support: "不支持", supportClass: "not-supported" }
]);
</script>

<style lang="less" scoped>
.sri-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);

  h1 {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #3498db;
    color: #2c3e50;
  }

  h2 {
    font-size: 1.7rem;
    padding-left: 10px;
    border-left: 4px solid #3498db;
    color: #2c3e50;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.3rem;
    color: #2980b9;
    margin-top: 0;
    margin-bottom: 10px;
  }

  .overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .overview-card {
      display: flex;
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
      align-items: center;

      .overview-icon {
        font-size: 2.5rem;
        margin-right: 20px;
      }

      p {
        margin: 10px 0 0;
        color: #555;
        line-height: 1.5;
      }
    }
  }

  .section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  }

  // 工作流程
  .workflow {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 15px;
    margin-bottom: 30px;

    .step {
      display: flex;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e0e0e0;

      .step-number {
        min-width: 40px;
        height: 40px;
        background: #3498db;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 15px;
      }

      .step-content {
        h3 {
          margin-top: 0;
          margin-bottom: 8px;
        }

        p {
          margin: 0;
          color: #555;
          line-height: 1.5;
        }
      }
    }
  }

  // SRI可视化
  .sri-visual {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #e0e0e0;

    .browser {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;

      .browser-header {
        background: #2c3e50;
        color: white;
        padding: 10px;
        font-weight: bold;
      }

      .sri-process {
        padding: 20px;

        .resource,
        .hash,
        .compare,
        .result {
          padding: 15px;
          margin: 10px 0;
          border-radius: 6px;
          text-align: center;
          font-weight: bold;
        }

        .resource {
          background: #e3f2fd;
          border: 1px solid #bbdefb;
        }

        .hash {
          background: #e8f5e9;
          border: 1px solid #c8e6c9;
        }

        .compare {
          background: #fff3e0;
          border: 1px solid #ffe0b2;
        }

        .result {
          background: #e8f5e9;
          border: 1px solid #c8e6c9;

          &.invalid {
            background: #ffebee;
            border: 1px solid #ffcdd2;
            color: #c62828;
            margin-top: 5px;
          }
        }

        .arrow {
          text-align: center;
          font-size: 1.5rem;
          margin: 5px 0;
          color: #7f8c8d;
        }
      }
    }
  }

  // 配置方法
  .methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .method-card {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;

      .method-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
        text-align: center;
      }

      h3 {
        text-align: center;
      }

      p {
        color: #555;
        line-height: 1.5;
        margin: 10px 0 15px;
        text-align: center;
      }
    }
  }

  // 代码块样式
  .code-block {
    background: #2c3e50;
    color: #f1f2f6;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 15px 0;
    tab-size: 2;

    mark {
      background: #e74c3c;
      color: white;
      padding: 0 2px;
      border-radius: 3px;
    }
  }

  // 示例代码
  .examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 20px;

    .example {
      margin-bottom: 20px;
    }
  }

  // 安全作用
  .benefits {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .benefit-card {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;
      text-align: center;

      .benefit-icon {
        font-size: 2rem;
        margin-bottom: 15px;
      }

      p {
        color: #555;
        line-height: 1.5;
        margin: 10px 0 0;
      }
    }
  }

  // 最佳实践
  .practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .practice {
      display: flex;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e0e0e0;

      .practice-number {
        min-width: 40px;
        height: 40px;
        background: #3498db;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 15px;
      }

      p {
        color: #555;
        line-height: 1.5;
        margin: 10px 0 0;
      }
    }
  }

  // 浏览器支持
  .compatibility {
    .browser-support {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-bottom: 20px;

      .browser {
        padding: 15px;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        background: #f8f9fa;
        text-align: center;

        .browser-icon {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .browser-name {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .support-level {
          font-weight: bold;

          &.supported {
            color: #2ecc71;
          }

          &.not-supported {
            color: #e74c3c;
          }
        }
      }
    }

    .support-note {
      text-align: center;
      font-style: italic;
      color: #7f8c8d;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;

    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    .overview,
    .workflow,
    .methods,
    .benefits,
    .practices,
    .browser-support {
      grid-template-columns: 1fr;
    }

    .examples {
      grid-template-columns: 1fr;
    }

    .code-block {
      font-size: 0.8rem;
    }
  }
}
</style>