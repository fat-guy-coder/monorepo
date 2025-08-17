<template>
  <div class="prototype-pollution-container">
    <header class="header">
      <h1>JavaScript 原型污染介绍</h1>
      <p>深入理解原型污染的原理、危害与防御措施</p>
    </header>

    <div class="content-grid">
      <!-- 概念部分 -->
      <section class="card concept">
        <div class="section-header">
          <div class="icon">🧬</div>
          <h2>原型污染概念</h2>
        </div>
        <div class="content">
          <p class="definition">
            原型污染（Prototype Pollution）是指攻击者通过篡改 JavaScript
            对象的原型链，向应用程序注入恶意属性或方法的安全漏洞。
          </p>

          <div class="analogy">
            <div class="analogy-card">
              <div class="analogy-icon">🕵️</div>
              <div class="analogy-content">
                <h3>污染的本质</h3>
                <p>通过修改原型对象，影响所有继承自该原型的对象</p>
              </div>
            </div>

            <div class="analogy-card">
              <div class="analogy-icon">⚗️</div>
              <div class="analogy-content">
                <h3>传播方式</h3>
                <p>类似化学污染，一旦发生会扩散到整个应用</p>
              </div>
            </div>
          </div>

          <div class="impact">
            <h3>潜在影响</h3>
            <ul>
              <li>修改应用程序行为</li>
              <li>绕过安全控制</li>
              <li>导致拒绝服务（DoS）</li>
              <li>远程代码执行（RCE）</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 原理部分 -->
      <section class="card mechanism">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>污染原理</h2>
        </div>

        <div class="content">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>原型链基础</h3>
              <p>
                JavaScript
                中每个对象都有一个原型（__proto__），当访问对象属性时，会沿着原型链向上查找
              </p>
              <pre><code>const obj = {};
obj.__proto__.isAdmin = true; // 污染原型

const user = {};
console.log(user.isAdmin); // true - 所有对象都被污染</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>常见污染点</h3>
              <div class="vulnerable-points">
                <div class="point">
                  <div class="point-icon">📦</div>
                  <div>
                    <h4>对象合并</h4>
                    <pre><code>merge({}, JSON.parse('{"__proto__": {"isAdmin": true}}'))</code></pre>
                  </div>
                </div>

                <div class="point">
                  <div class="point-icon">🔢</div>
                  <div>
                    <h4>路径赋值</h4>
                    <pre><code>setProperty({}, '__proto__.isAdmin', true)</code></pre>
                  </div>
                </div>

                <div class="point">
                  <div class="point-icon">🔀</div>
                  <div>
                    <h4>克隆操作</h4>
                    <pre><code>cloneDeep({__proto__: {isAdmin: true}})</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 攻击演示 -->
      <section class="card attack-demo">
        <div class="section-header">
          <div class="icon">💥</div>
          <h2>攻击演示</h2>
        </div>

        <div class="content">
          <div class="demo-card">
            <h3>场景：用户权限检查</h3>
            <div class="code-container">
              <pre><code>function checkAdmin(user) {
  // 检查用户是否是管理员
  if (user.isAdmin) {
    grantAdminAccess();
  } else {
    denyAccess();
  }
}

// 正常用户
const normalUser = { name: "Alice" };
checkAdmin(normalUser); // 访问被拒绝

// 攻击者通过原型污染
const maliciousPayload = JSON.parse('{"__proto__": {"isAdmin": true}}');
merge({}, maliciousPayload); // 执行污染

// 创建新用户
const newUser = { name: "Bob" };
checkAdmin(newUser); // 被授予管理员权限！</code></pre>
            </div>
          </div>

          <div class="consequences">
            <h3>攻击后果</h3>
            <div class="consequence-grid">
              <div class="consequence">
                <div class="consequence-icon">🔓</div>
                <p>权限提升</p>
              </div>
              <div class="consequence">
                <div class="consequence-icon">🔄</div>
                <p>数据篡改</p>
              </div>
              <div class="consequence">
                <div class="consequence-icon">💣</div>
                <p>服务中断</p>
              </div>
              <div class="consequence">
                <div class="consequence-icon">📡</div>
                <p>远程控制</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 防治手段 -->
      <section class="card prevention">
        <div class="section-header">
          <div class="icon">🛡️</div>
          <h2>防治手段</h2>
        </div>

        <div class="content">
          <div class="prevention-methods">
            <div class="method">
              <h3>1. 安全对象操作</h3>
              <ul>
                <li>使用<code>Object.create(null)</code>创建无原型对象</li>
                <li>避免使用<code>__proto__</code>属性</li>
                <li>使用<code>Object.freeze()</code>冻结原型</li>
              </ul>
              <pre><code>// 安全对象创建
const safeObj = Object.create(null);
safeObj.isAdmin = true; // 不会污染原型链</code></pre>
            </div>

            <div class="method">
              <h3>2. 输入验证与过滤</h3>
              <ul>
                <li>
                  过滤包含<code>__proto__</code>、<code>constructor</code>或<code>prototype</code>的键名
                </li>
                <li>使用安全JSON解析（如<code>JSON.parse()</code>）</li>
                <li>使用Map代替Object存储键值对</li>
              </ul>
              <pre><code>function safeMerge(target, source) {
  for (const key in source) {
    if (key !== '__proto__' && key !== 'constructor') {
      target[key] = source[key];
    }
  }
  return target;
}</code></pre>
            </div>

            <div class="method">
              <h3>3. 使用安全库</h3>
              <ul>
                <li>lodash.get / lodash.set</li>
                <li>hoek.clone</li>
                <li>yup 或 joi 进行输入验证</li>
              </ul>
              <pre><code>// 使用 lodash 的安全方法
_.set({}, 'a.b.c', 'value'); // 安全赋值
_.get({}, 'a.b.c'); // 安全访问</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <section class="card considerations">
        <div class="section-header">
          <div class="icon">📝</div>
          <h2>注意事项</h2>
        </div>

        <div class="content">
          <div class="do-dont">
            <div class="do">
              <h3>最佳实践</h3>
              <ul>
                <li>使用ES6类代替原型继承</li>
                <li>定期更新依赖库</li>
                <li>使用静态分析工具扫描漏洞</li>
                <li>实施最小权限原则</li>
                <li>启用严格模式（'use strict'）</li>
              </ul>
            </div>

            <div class="dont">
              <h3>避免做法</h3>
              <ul>
                <li>直接修改内置原型（Array.prototype等）</li>
                <li>使用未经验证的递归合并</li>
                <li>信任来自客户端的JSON数据</li>
                <li>使用eval()或Function()解析JSON</li>
                <li>忽略依赖库的安全公告</li>
              </ul>
            </div>
          </div>

          <div class="tools">
            <h3>安全检测工具</h3>
            <div class="tool-grid">
              <div class="tool">
                <div class="tool-icon">🔧</div>
                <p>npm audit</p>
              </div>
              <div class="tool">
                <div class="tool-icon">🔍</div>
                <p>ESLint</p>
              </div>
              <div class="tool">
                <div class="tool-icon">🛡️</div>
                <p>Snyk</p>
              </div>
              <div class="tool">
                <div class="tool-icon">🔬</div>
                <p>SonarQube</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="summary">
        <h3>关键要点</h3>
        <p>
          原型污染是JavaScript中严重的安全漏洞，通过篡改原型对象影响整个应用。防御的关键在于：安全对象操作、严格输入验证、使用安全库和定期安全审计。
        </p>
      </div>
      <div class="copyright">JavaScript安全最佳实践 | 保持警惕，保护应用</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑为空，仅用于展示
</script>

<style lang="less" scoped>
.prototype-pollution-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: #f8fafc;
  color: #2d3748;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 32px;
  padding: 28px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h1 {
    font-size: 2.4rem;
    margin: 0 0 12px;
    color: #2563eb;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    color: #4b5563;
    margin: 0;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 28px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;

  .icon {
    font-size: 2rem;
    margin-right: 16px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #dbeafe;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.6rem;
    margin: 0;
    color: #1e40af;
  }
}

/* 概念部分样式 */
.concept {
  .definition {
    font-size: 1.1rem;
    background: #eff6ff;
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid #3b82f6;
    margin-bottom: 24px;
  }

  .analogy {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;

    .analogy-card {
      display: flex;
      background: #f0f9ff;
      border-radius: 12px;
      padding: 18px;
      border: 1px solid #dbeafe;

      .analogy-icon {
        font-size: 2rem;
        margin-right: 16px;
        min-width: 50px;
      }

      h3 {
        margin: 0 0 8px;
        font-size: 1.2rem;
        color: #1e40af;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: #4b5563;
      }
    }
  }

  .impact {
    h3 {
      font-size: 1.2rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    ul {
      padding-left: 24px;
      margin: 0;

      li {
        margin-bottom: 12px;
        position: relative;
        padding-left: 12px;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #ef4444;
          font-weight: bold;
        }
      }
    }
  }
}

/* 原理部分样式 */
.mechanism {
  .step {
    display: flex;
    margin-bottom: 28px;

    &:last-child {
      margin-bottom: 0;
    }

    .step-number {
      width: 36px;
      height: 36px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      margin-right: 16px;
      flex-shrink: 0;
    }

    .step-content {
      h3 {
        font-size: 1.3rem;
        margin: 0 0 12px;
        color: #1e40af;
      }

      p {
        margin: 0 0 16px;
        font-size: 1rem;
        color: #4b5563;
      }
    }

    .vulnerable-points {
      .point {
        display: flex;
        align-items: flex-start;
        margin-bottom: 16px;
        background: #f8fafc;
        padding: 16px;
        border-radius: 10px;
        border: 1px solid #e2e8f0;

        .point-icon {
          font-size: 1.5rem;
          margin-right: 12px;
          min-width: 36px;
        }

        h4 {
          margin: 0 0 8px;
          font-size: 1.1rem;
          color: #1e40af;
        }

        pre {
          margin: 0;
          font-size: 0.9rem;
        }
      }
    }
  }
}

/* 攻击演示样式 */
.attack-demo {
  .demo-card {
    background: #fffbeb;
    border-radius: 12px;
    padding: 20px;
    border: 1px solid #fde68a;
    margin-bottom: 24px;

    h3 {
      font-size: 1.2rem;
      margin: 0 0 16px;
      color: #92400e;
    }
  }

  .consequences {
    h3 {
      font-size: 1.2rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .consequence-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 16px;
    }

    .consequence {
      text-align: center;
      background: #f0f9ff;
      border-radius: 10px;
      padding: 16px;
      border: 1px solid #dbeafe;

      .consequence-icon {
        font-size: 1.8rem;
        margin-bottom: 8px;
      }

      p {
        margin: 0;
        font-weight: 500;
        color: #1e40af;
      }
    }
  }
}

/* 防治手段样式 */
.prevention {
  .prevention-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;

    .method {
      background: #f0fdf4;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #bbf7d0;

      h3 {
        font-size: 1.3rem;
        margin: 0 0 16px;
        color: #065f46;
      }

      ul {
        padding-left: 20px;
        margin: 0 0 16px;

        li {
          margin-bottom: 8px;
          color: #4b5563;
        }
      }

      pre {
        margin: 0;
        font-size: 0.9rem;
      }
    }
  }
}

/* 注意事项样式 */
.considerations {
  .do-dont {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .do,
    .dont {
      padding: 20px;
      border-radius: 12px;

      h3 {
        font-size: 1.3rem;
        margin: 0 0 16px;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 10px;
          color: #4b5563;
        }
      }
    }

    .do {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;

      h3 {
        color: #065f46;
      }

      li::marker {
        color: #10b981;
      }
    }

    .dont {
      background: #fef2f2;
      border: 1px solid #fecaca;

      h3 {
        color: #b91c1c;
      }

      li::marker {
        color: #ef4444;
      }
    }
  }

  .tools {
    h3 {
      font-size: 1.3rem;
      margin: 0 0 16px;
      color: #1e40af;
    }

    .tool-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 16px;
    }

    .tool {
      text-align: center;
      background: #e0f2fe;
      border-radius: 10px;
      padding: 20px;
      border: 1px solid #bae6fd;

      .tool-icon {
        font-size: 1.8rem;
        margin-bottom: 12px;
      }

      p {
        margin: 0;
        font-weight: 500;
        color: #0c4a6e;
      }
    }
  }
}

/* 代码块通用样式 */
pre {
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.95rem;
  line-height: 1.5;

  code {
    color: #cbd5e1;
  }
}

/* 页脚样式 */
.footer {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 28px;
  text-align: center;

  .summary {
    max-width: 800px;
    margin: 0 auto 20px;

    h3 {
      font-size: 1.4rem;
      margin: 0 0 16px;
      color: #2563eb;
    }

    p {
      font-size: 1.1rem;
      color: #4b5563;
      margin: 0;
      line-height: 1.7;
    }
  }

  .copyright {
    font-size: 0.95rem;
    color: #64748b;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
  }
}
</style>
