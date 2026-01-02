<template>
  <div class="restriction-container">
    <!-- 头部区域 -->
    <header class="header">
      <h1 class="title">前端禁止用户操作方案</h1>
      <p class="subtitle">保护内容安全，防止用户不当操作</p>
    </header>

    <!-- 安全警告 -->
    <div class="warning">
      <div class="warning-icon">⚠️</div>
      <p>重要提示：前端限制措施只能增加操作难度，无法完全阻止恶意用户操作</p>
    </div>

    <!-- 操作限制展示 -->
    <div class="restriction-demo">
      <div class="demo-card">
        <h2>操作限制演示</h2>
        <div class="demo-area">
          <div class="protected-content">
            <h3>受保护内容区域</h3>
            <p>尝试在此区域进行以下操作：</p>

            <div class="demo-actions">
              <div class="action-item" v-for="action in actions" :key="action.id">
                <div class="action-icon">{{ action.icon }}</div>
                <div class="action-text">{{ action.text }}</div>
                <div class="action-status" :class="{ 'disabled': action.disabled }">
                  {{ action.disabled ? '已禁用' : '可用' }}
                </div>
              </div>
            </div>

            <div class="protected-text" ref="protectedText">
              <p>这是受保护的文本内容，您无法选中、复制或右键查看源代码。</p>
              <p>尝试使用开发者工具修改此内容会被检测到。</p>
            </div>

            <div class="code-editor">
              <div class="editor-header">
                <span>受保护的代码区域</span>
              </div>
              <div class="editor-content" contenteditable="false">
                <pre>// 这段代码无法编辑
function protectedFunction() {
  console.log("此代码受保护");
}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 实现方法区域 -->
    <div class="implementation-section">
      <h2 class="section-title">禁止操作实现方法</h2>

      <!-- 禁止查看源码 -->
      <div class="method-card">
        <div class="method-header">
          <div class="method-icon">🔍</div>
          <h3>禁止查看源码</h3>
        </div>
        <div class="method-content">
          <div class="method-description">
            <p>防止用户通过右键菜单或快捷键查看网页源代码</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>阻止普通用户轻易获取源码</li>
                  <li>保护前端逻辑实现细节</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>无法阻止开发者工具查看</li>
                  <li>影响用户正常右键功能</li>
                  <li>无法防止网络抓包</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="method-code">
            <pre><code>// 禁用右键菜单
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// 禁用快捷键
document.addEventListener('keydown', (e) => {
  // 禁用Ctrl+U (查看源码)
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
  }
  // 禁用F12
  if (e.key === 'F12') {
    e.preventDefault();
  }
});</code></pre>
          </div>
        </div>
      </div>

      <!-- 禁止复制粘贴 -->
      <div class="method-card">
        <div class="method-header">
          <div class="method-icon">📋</div>
          <h3>禁止复制粘贴</h3>
        </div>
        <div class="method-content">
          <div class="method-description">
            <p>阻止用户复制内容或向输入框中粘贴文本</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>保护敏感文本内容</li>
                  <li>防止用户复制重要信息</li>
                  <li>防止恶意脚本注入</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>影响用户正常操作</li>
                  <li>无法阻止截图</li>
                  <li>高级用户仍可通过开发者工具获取</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="method-code">
            <pre><code>// 禁止复制
document.addEventListener('copy', (e) => {
  e.preventDefault();
});

// 禁止剪切
document.addEventListener('cut', (e) => {
  e.preventDefault();
});

// 禁止粘贴
document.addEventListener('paste', (e) => {
  e.preventDefault();
});

// 禁止选中文本
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});</code></pre>
          </div>
        </div>
      </div>

      <!-- 禁止文本选择 -->
      <div class="method-card">
        <div class="method-header">
          <div class="method-icon">🔒</div>
          <h3>禁止文本选择</h3>
        </div>
        <div class="method-content">
          <div class="method-description">
            <p>防止用户通过鼠标拖拽选择文本内容</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>防止内容被选中复制</li>
                  <li>CSS实现简单高效</li>
                  <li>不影响页面性能</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>无法阻止全选快捷键</li>
                  <li>影响用户正常阅读体验</li>
                  <li>无法防止开发者工具获取</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="method-code">
            <pre><code>/* 使用CSS禁止文本选择 */
.protected-content {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 禁止拖拽图片 */
.protected-content img {
  pointer-events: none;
  -webkit-user-drag: none;
}</code></pre>
          </div>
        </div>
      </div>

      <!-- 禁止开发者工具 -->
      <div class="method-card">
        <div class="method-header">
          <div class="method-icon">🚫</div>
          <h3>检测开发者工具</h3>
        </div>
        <div class="method-content">
          <div class="method-description">
            <p>检测并阻止用户打开浏览器开发者工具</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>增加查看和修改代码的难度</li>
                  <li>防止DOM结构被修改</li>
                  <li>阻止调试前端代码</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>不同浏览器检测方法不同</li>
                  <li>无法完全阻止开发者工具</li>
                  <li>可能引起浏览器警告</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="method-code">
            <pre><code>// 检测开发者工具是否打开
function detectDevTools() {
  const threshold = 160; // 窗口宽度减少阈值
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;

  if (widthThreshold || heightThreshold) {
    // 开发者工具可能已打开
    document.body.innerHTML = '开发者工具已被禁用';
    window.location.href = 'about:blank';
  }
}

// 定时检测
setInterval(detectDevTools, 1000);

// 检测调试模式
(() => {
  const debuggerFunction = () => {
    setInterval(() => {
      debugger;
    }, 100);
  };

  try {
    debuggerFunction();
  } catch (err) {
    // 用户可能打开了开发者工具
    window.location.reload();
  }
})();</code></pre>
          </div>
        </div>
      </div>

      <!-- 防止DOM修改 -->
      <div class="method-card">
        <div class="method-header">
          <div class="method-icon">🛡️</div>
          <h3>防止DOM修改</h3>
        </div>
        <div class="method-content">
          <div class="method-description">
            <p>使用MutationObserver监控并阻止DOM修改</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点：</h4>
                <ul>
                  <li>实时监控DOM变化</li>
                  <li>可以阻止恶意脚本注入</li>
                  <li>检测并恢复被修改的元素</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点：</h4>
                <ul>
                  <li>增加内存消耗</li>
                  <li>可能影响页面性能</li>
                  <li>无法阻止所有类型的修改</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="method-code">
            <pre><code>// 创建MutationObserver实例
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // 检查是否添加了不需要的节点
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.classList.contains('malicious')) {
          node.remove();
        }
      });
    }

    // 检查属性修改
    if (mutation.attributeName === 'data-protected') {
      mutation.target.setAttribute('data-protected', 'true');
    }
  });
});

// 配置观察选项
const config = {
  attributes: true,
  childList: true,
  subtree: true,
  attributeFilter: ['data-protected']
};

// 开始观察受保护区域
const protectedElement = document.querySelector('.protected-content');
observer.observe(protectedElement, config);

// 防止删除观察者
Object.defineProperty(window, 'MutationObserver', {
  value: null,
  writable: false,
  configurable: false
});</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用场景和最佳实践 -->
    <div class="usage-section">
      <h2 class="section-title">使用场景与最佳实践</h2>
      <div class="scenarios-grid">
        <div class="scenario-card">
          <div class="scenario-icon">💳</div>
          <h3>在线考试系统</h3>
          <p>防止考生复制题目、打开新标签页查找答案</p>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">📰</div>
          <h3>付费内容保护</h3>
          <p>防止付费文章被复制传播，保护版权</p>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">🎨</div>
          <h3>设计稿预览</h3>
          <p>防止设计源文件被下载或代码被查看</p>
        </div>
        <div class="scenario-card">
          <div class="scenario-icon">🛡️</div>
          <h3>安全控制台</h3>
          <p>防止敏感操作界面被篡改或绕过</p>
        </div>
      </div>

      <div class="best-practices">
        <h3>最佳实践：</h3>
        <ul>
          <li>仅对真正需要保护的内容应用限制</li>
          <li>提供清晰的禁用操作提示</li>
          <li>结合服务端验证进行双重保护</li>
          <li>避免过度限制影响用户体验</li>
          <li>定期更新防护策略</li>
          <li>针对不同浏览器进行兼容性测试</li>
        </ul>
      </div>
    </div>

    <!-- 安全增强 -->
    <div class="security-section">
      <h2 class="section-title">安全增强方案</h2>
      <div class="security-content">
        <div class="security-card">
          <div class="security-header">
            <div class="security-icon">🔐</div>
            <h3>混淆与加密</h3>
          </div>
          <ul>
            <li>使用JavaScript混淆工具（如UglifyJS）</li>
            <li>对敏感字符串进行加密</li>
            <li>使用WebAssembly保护核心逻辑</li>
            <li>启用CSP（内容安全策略）</li>
          </ul>
        </div>

        <div class="security-card">
          <div class="security-header">
            <div class="security-icon">🔄</div>
            <h3>行为监控</h3>
          </div>
          <ul>
            <li>记录用户异常操作行为</li>
            <li>检测调试器状态</li>
            <li>监控网络请求</li>
            <li>检测浏览器插件</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <p> 前端安全解决方案 | 前端限制措施只能增加操作难度，无法替代服务端安全措施</p>
      <p>重要提示：前端安全应作为整体安全策略的一部分，而非唯一防线</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue';


// const router = useRouter();

// 操作状态
const actions = ref([
  { id: 1, icon: '🖱️', text: '右键菜单', disabled: true },
  { id: 2, icon: '📋', text: '复制内容', disabled: true },
  { id: 3, icon: '📋', text: '粘贴内容', disabled: true },
  { id: 4, icon: '🔍', text: '文本选择', disabled: true },
  { id: 5, icon: '🛠️', text: '开发者工具', disabled: false },
]);










</script>

<style lang="less" scoped>


:root {
  --primary: #3498db;
  --secondary: #2ecc71;
  --accent: #9b59b6;
  --dark: #2c3e50;
  --light: #ecf0f1;
  --danger: #e74c3c;
  --warning: #f39c12;
  --gray: #95a5a6;
  --border-radius: 12px;
  --box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.restriction-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  color: var(--dark);
  line-height: 1.6;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);

  .title {
    font-size: 2.8rem;
    color: var(--dark);
    margin-bottom: 0.5rem;
    font-weight: 700;
    background: linear-gradient(45deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.4rem;
    color: var(--gray);
    font-weight: 300;
  }
}

.warning {
  display: flex;
  align-items: center;
  background: #fff8e1;
  border-left: 4px solid var(--warning);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;

  .warning-icon {
    font-size: 1.8rem;
    margin-right: 1rem;
    color: var(--warning);
  }

  p {
    color: #5d4037;
    font-weight: 500;
  }
}

.restriction-demo {
  margin-bottom: 3rem;

  .demo-card {
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    overflow: hidden;

    h2 {
      padding: 1.5rem;
      background: linear-gradient(to right, var(--dark), #34495e);
      color: white;
      font-weight: 500;
    }

    .demo-area {
      padding: 2rem;
    }
  }

  .protected-content {
    padding: 2rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: white;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);

    h3 {
      color: var(--dark);
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      text-align: center;
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 60px;
        height: 3px;
        background: var(--primary);
        margin: 0.5rem auto;
        border-radius: 2px;
      }
    }

    p {
      margin-bottom: 1rem;
      font-size: 1.1rem;
      text-align: center;
      color: var(--gray);
    }
  }

  .demo-actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem 0;

    .action-item {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: var(--transition);
      border: 1px solid #e9ecef;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      }

      .action-icon {
        font-size: 2.5rem;
        margin-bottom: 0.8rem;
      }

      .action-text {
        font-weight: 500;
        margin-bottom: 0.5rem;
      }

      .action-status {
        font-size: 0.9rem;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        background: var(--secondary);
        color: white;

        &.disabled {
          background: var(--danger);
        }
      }
    }
  }

  .protected-text {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border-left: 4px solid var(--primary);
    font-style: italic;
    text-align: center;
  }

  .code-editor {
    background: #2c3e50;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 2rem;

    .editor-header {
      background: #1a2530;
      padding: 0.8rem 1rem;
      color: #b0bec5;
      font-size: 0.9rem;
      display: flex;
      justify-content: space-between;
    }

    .editor-content {
      padding: 1.5rem;
      color: #f8f8f2;
      font-family: 'Source Code Pro', monospace;
      font-size: 1rem;
      line-height: 1.5;

      pre {
        margin: 0;
      }
    }
  }
}

.section-title {
  font-size: 2rem;
  color: var(--dark);
  margin: 2rem 0 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 3px solid var(--primary);
  display: inline-block;
}

.method-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
  overflow: hidden;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }

  .method-header {
    display: flex;
    align-items: center;
    padding: 1.2rem 1.5rem;
    background: linear-gradient(to right, var(--dark), #34495e);
    color: white;

    .method-icon {
      font-size: 1.8rem;
      margin-right: 1rem;
      background: rgba(255, 255, 255, 0.2);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 1.6rem;
      font-weight: 500;
    }
  }

  .method-content {
    display: flex;
    padding: 1.5rem;

    .method-description {
      flex: 1;
      padding-right: 1.5rem;

      p {
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
      }

      .pros-cons {
        display: flex;
        gap: 1.5rem;

        >div {
          flex: 1;
        }

        h4 {
          margin-bottom: 0.8rem;
          font-size: 1.2rem;
          color: var(--dark);
        }

        ul {
          list-style: none;
          padding-left: 0;

          li {
            padding: 0.5rem 0;
            position: relative;
            padding-left: 1.8rem;

            &::before {
              content: '•';
              position: absolute;
              left: 0;
              color: var(--primary);
              font-size: 1.2rem;
            }
          }
        }

        .pros li::before {
          color: var(--secondary);
        }

        .cons li::before {
          color: var(--danger);
        }
      }
    }

    .method-code {
      flex: 1;
      background: #2c3e50;
      color: #f8f8f2;
      border-radius: 8px;
      padding: 1.2rem;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.95rem;
      line-height: 1.5;

      pre {
        margin: 0;
      }
    }
  }
}

.usage-section {
  margin: 3rem 0;

  .scenarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;

    .scenario-card {
      background: white;
      border-radius: var(--border-radius);
      padding: 1.5rem;
      box-shadow: var(--box-shadow);
      text-align: center;
      transition: var(--transition);

      &:hover {
        transform: translateY(-3px);
      }

      .scenario-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      h3 {
        color: var(--primary);
        margin-bottom: 0.8rem;
      }

      p {
        color: var(--gray);
        font-size: 0.95rem;
      }
    }
  }

  .best-practices {
    background: white;
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--box-shadow);

    h3 {
      margin-bottom: 1.2rem;
      color: var(--primary);
      font-size: 1.4rem;
    }

    ul {
      list-style: none;

      li {
        padding: 0.7rem 0;
        position: relative;
        padding-left: 2rem;
        font-size: 1.1rem;

        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--secondary);
          font-weight: bold;
        }
      }
    }
  }
}

.security-section {
  margin: 3rem 0;

  .security-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .security-card {
    background: white;
    border-radius: var(--border-radius);
    padding: 1.8rem;
    box-shadow: var(--box-shadow);

    .security-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.2rem;

      .security-icon {
        font-size: 2rem;
        margin-right: 1rem;
        color: var(--accent);
      }

      h3 {
        color: var(--dark);
        font-size: 1.4rem;
      }
    }

    ul {
      list-style: none;
      padding-left: 0;

      li {
        padding: 0.6rem 0;
        position: relative;
        padding-left: 1.8rem;
        font-size: 1.05rem;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--primary);
          font-size: 1.5rem;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem;
  margin-top: 3rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: var(--gray);

  p {
    margin-bottom: 0.5rem;

    &:last-child {
      font-style: italic;
      color: var(--danger);
    }
  }
}

@media (max-width: 768px) {
  .method-content {
    flex-direction: column;

    .method-description {
      padding-right: 0;
      margin-bottom: 1.5rem;
    }
  }

  .pros-cons {
    flex-direction: column;
    gap: 1.5rem !important;
  }
}
</style>
