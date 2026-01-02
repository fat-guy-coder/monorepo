<template>
  <div class="web-storage-container">
    <!-- 头部标题区域 -->
    <header class="header">
      <h1><i class="fas fa-database"></i> Web Storage 基础介绍</h1>
      <p class="subtitle">掌握浏览器本地存储技术，提升应用体验</p>
    </header>

    <!-- 主内容区域 -->
    <main class="content">
      <!-- 概念介绍卡片 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-lightbulb"></i>
          <h2>Web Storage 概念</h2>
        </div>
        <div class="card-content">
          <div class="definition">
            <p><strong>Web Storage</strong> 是HTML5提供的浏览器本地存储机制，允许在客户端存储数据，无需依赖服务器。</p>
            <p>相比传统的Cookie，Web Storage提供了更大的存储容量（通常5-10MB）和更简单的API。</p>
          </div>

          <div class="comparison">
            <div class="local-storage">
              <div class="type-header">
                <i class="fas fa-box"></i>
                <h3>localStorage</h3>
              </div>
              <ul>
                <li><i class="fas fa-infinity"></i> 永久存储（除非手动清除）</li>
                <li><i class="fas fa-globe"></i> 同源策略（相同协议+域名+端口）</li>
                <li><i class="fas fa-memory"></i> 存储上限：5-10MB（因浏览器而异）</li>
                <li><i class="fas fa-sync"></i> 页面间共享数据</li>
              </ul>
            </div>

            <div class="session-storage">
              <div class="type-header">
                <i class="fas fa-hourglass-half"></i>
                <h3>sessionStorage</h3>
              </div>
              <ul>
                <li><i class="fas fa-window"></i> 会话级存储（标签页关闭时清除）</li>
                <li><i class="fas fa-window-restore"></i> 单个标签页内有效</li>
                <li><i class="fas fa-memory"></i> 存储上限：5-10MB</li>
                <li><i class="fas fa-user"></i> 适合临时存储用户会话数据</li>
              </ul>
            </div>
          </div>

          <div class="vs-cookie">
            <h3>Web Storage vs Cookie</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>Web Storage</th>
                    <th>Cookie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>存储大小</td>
                    <td>5-10MB</td>
                    <td>4KB</td>
                  </tr>
                  <tr>
                    <td>HTTP请求</td>
                    <td>不随请求发送</td>
                    <td>每次请求都会发送</td>
                  </tr>
                  <tr>
                    <td>过期时间</td>
                    <td>永久或会话级</td>
                    <td>可设置过期时间</td>
                  </tr>
                  <tr>
                    <td>API易用性</td>
                    <td>简单直观</td>
                    <td>相对复杂</td>
                  </tr>
                  <tr>
                    <td>安全性</td>
                    <td>同源策略</td>
                    <td>同源策略</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用方法卡片 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-code"></i>
          <h2>使用方法</h2>
        </div>
        <div class="card-content">
          <div class="api-methods">
            <div class="method">
              <div class="method-header">
                <div class="method-name">setItem(key, value)</div>
                <div class="method-type">添加/更新数据</div>
              </div>
              <pre class="code-block">// 存储字符串
localStorage.setItem('username', 'john_doe');

// 存储对象（需要序列化）
const user = { name: 'John', age: 30 };
localStorage.setItem('user', JSON.stringify(user));</pre>
            </div>

            <div class="method">
              <div class="method-header">
                <div class="method-name">getItem(key)</div>
                <div class="method-type">获取数据</div>
              </div>
              <pre class="code-block">// 获取字符串
const username = localStorage.getItem('username');

// 获取对象（需要反序列化）
const userJson = localStorage.getItem('user');
const user = userJson ? JSON.parse(userJson) : null;</pre>
            </div>

            <div class="method">
              <div class="method-header">
                <div class="method-name">removeItem(key)</div>
                <div class="method-type">移除数据</div>
              </div>
              <pre class="code-block">// 移除单个项
localStorage.removeItem('username');

// 移除对象
localStorage.removeItem('user');</pre>
            </div>

            <div class="method">
              <div class="method-header">
                <div class="method-name">clear()</div>
                <div class="method-type">清除所有数据</div>
              </div>
              <pre class="code-block">// 清除当前域名下的所有存储
localStorage.clear();

// 清除当前会话的所有存储
sessionStorage.clear();</pre>
            </div>

            <div class="method">
              <div class="method-header">
                <div class="method-name">key(index)</div>
                <div class="method-type">获取键名</div>
              </div>
              <pre class="code-block">// 获取第n个键名
const firstKey = localStorage.key(0);

// 遍历所有键
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}</pre>
            </div>
          </div>

          <div class="vue-integration">
            <h3>在Vue3中使用Web Storage</h3>
            <pre class="code-block"><code>import { ref, watch } from 'vue';

// 使用localStorage的响应式包装器
export function useLocalStorage&lt;T&gt;(key: string, defaultValue: T) {
  // 从localStorage读取初始值
  const data = ref&lt;T&gt;(
    JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue))
  );

  // 监听变化并保存到localStorage
  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, { deep: true });

  return data;
}

// 在组件中使用
const userSettings = useLocalStorage('user_settings', {
  theme: 'light',
  fontSize: 16,
  notifications: true
});

// 更新设置会自动保存到localStorage
userSettings.value.theme = 'dark';</code></pre>
          </div>
        </div>
      </section>

      <!-- 使用场景卡片 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-th-list"></i>
          <h2>使用场景</h2>
        </div>
        <div class="card-content">
          <div class="use-cases">
            <div class="case">
              <div class="case-icon">
                <i class="fas fa-user-cog"></i>
              </div>
              <div class="case-content">
                <h3>用户偏好设置</h3>
                <p>存储主题、语言、字体大小等用户偏好</p>
                <div class="example">主题设置、布局偏好、通知设置</div>
              </div>
            </div>

            <div class="case">
              <div class="case-icon">
                <i class="fas fa-shopping-cart"></i>
              </div>
              <div class="case-content">
                <h3>购物车数据</h3>
                <p>临时保存用户的购物车内容</p>
                <div class="example">未登录用户购物车、草稿订单</div>
              </div>
            </div>

            <div class="case">
              <div class="case-icon">
                <i class="fas fa-scroll"></i>
              </div>
              <div class="case-content">
                <h3>表单草稿</h3>
                <p>保存未提交的表单数据</p>
                <div class="example">多步骤表单、长内容编辑</div>
              </div>
            </div>

            <div class="case">
              <div class="case-icon">
                <i class="fas fa-gamepad"></i>
              </div>
              <div class="case-content">
                <h3>游戏状态</h3>
                <p>保存游戏进度和状态</p>
                <div class="example">关卡进度、得分、游戏设置</div>
              </div>
            </div>

            <div class="case">
              <div class="case-icon">
                <i class="fas fa-search"></i>
              </div>
              <div class="case-content">
                <h3>搜索历史</h3>
                <p>存储用户的搜索记录</p>
                <div class="example">电商网站搜索历史、内容平台搜索记录</div>
              </div>
            </div>

            <div class="case">
              <div class="case-icon">
                <i class="fas fa-paint-brush"></i>
              </div>
              <div class="case-content">
                <h3>离线应用数据</h3>
                <p>存储应用核心数据，支持离线使用</p>
                <div class="example">PWA应用、文档编辑器</div>
              </div>
            </div>
          </div>

          <div class="selection-guide">
            <h3>选择指南：localStorage vs sessionStorage</h3>
            <div class="guide-cards">
              <div class="guide-card localStorage">
                <h4><i class="fas fa-box"></i> 使用 localStorage 当：</h4>
                <ul>
                  <li>需要长期保存用户设置</li>
                  <li>数据需要在多个标签页共享</li>
                  <li>用户关闭浏览器后仍需保留数据</li>
                  <li>存储应用配置信息</li>
                </ul>
              </div>

              <div class="guide-card session-storage">
                <h4><i class="fas fa-hourglass-half"></i> 使用 sessionStorage 当：</h4>
                <ul>
                  <li>数据仅需在单次会话中保留</li>
                  <li>不需要跨标签页共享数据</li>
                  <li>存储敏感信息（标签页关闭自动清除）</li>
                  <li>临时保存表单数据或工作流程状态</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 注意事项卡片 -->
      <section class="card">
        <div class="card-header">
          <i class="fas fa-exclamation-triangle"></i>
          <h2>注意事项</h2>
        </div>
        <div class="card-content">
          <div class="warnings">
            <div class="warning">
              <div class="icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <div class="content">
                <h3>安全性</h3>
                <p>Web Storage 数据存储在客户端，不应用于存储敏感信息</p>
                <ul>
                  <li>避免存储密码、令牌等敏感数据</li>
                  <li>使用HTTP-only Cookie存储认证信息</li>
                  <li>注意XSS攻击风险</li>
                </ul>
              </div>
            </div>

            <div class="warning">
              <div class="icon">
                <i class="fas fa-database"></i>
              </div>
              <div class="content">
                <h3>存储限制</h3>
                <p>浏览器对存储容量有限制</p>
                <ul>
                  <li>Chrome/Firefox: 5-10MB</li>
                  <li>Safari: 5MB</li>
                  <li>移动浏览器: 通常2-5MB</li>
                  <li>超出限制会抛出QuotaExceededError错误</li>
                </ul>
              </div>
            </div>

            <div class="warning">
              <div class="icon">
                <i class="fas fa-sync-alt"></i>
              </div>
              <div class="content">
                <h3>数据类型</h3>
                <p>Web Storage 仅支持字符串存储</p>
                <ul>
                  <li>存储对象需使用JSON.stringify()</li>
                  <li>获取对象需使用JSON.parse()</li>
                  <li>日期对象需转换为字符串或时间戳</li>
                </ul>
              </div>
            </div>

            <div class="warning">
              <div class="icon">
                <i class="fas fa-lock"></i>
              </div>
              <div class="content">
                <h3>隐私模式</h3>
                <p>隐私浏览模式下的特殊行为</p>
                <ul>
                  <li>部分浏览器隐私模式下存储受限</li>
                  <li>关闭隐私窗口后数据会被清除</li>
                  <li>需要处理可能的存储异常</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h3>最佳实践</h3>
            <ul>
              <li>使用try-catch处理可能的存储错误</li>
              <li>为存储键名添加应用前缀避免冲突（如"myapp_user_settings"）</li>
              <li>定期清理过期或不必要的数据</li>
              <li>存储前压缩大数据（如LZString库）</li>
              <li>监听storage事件实现跨标签页通信</li>
              <li>使用IndexedDB存储更大或结构化数据</li>
            </ul>
          </div>

          <div class="storage-event">
            <h3>storage事件：跨标签页通信</h3>
            <pre class="code-block"><code>// 监听storage事件
window.addEventListener('storage', (event) => {
  // event对象包含以下属性：
  // key - 更改的键名
  // oldValue - 旧值
  // newValue - 新值
  // url - 更改发生的页面URL

  if (event.key === 'theme') {
    console.log('主题已更新:', event.newValue);
    // 更新应用主题
    applyTheme(event.newValue);
  }
});

// 在另一个标签页修改存储会触发事件
localStorage.setItem('theme', 'dark');</code></pre>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>Web Storage 基础介绍 | 掌握浏览器本地存储技术 | 提升应用性能和用户体验</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 示例数据
const storageUsage = ref(0);

// 计算存储使用情况
const calculateStorageUsage = () => {
  let total = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const item = localStorage.getItem(key);
      if (item) {
        total += key.length + item.length;
      }
    }
  }
  storageUsage.value = Math.round((total / (5 * 1024 * 1024)) * 100); // 基于5MB计算百分比
};

// 初始计算
onMounted(() => {
  calculateStorageUsage();
});
</script>

<style lang="less" scoped>
@primary: #4361ee;
@primary-light: #4895ef;
@secondary: #3f37c9;
@success: #4cc9f0;
@warning: #ff9e00;
@text: #2b2d42;
@text-light: #8d99ae;
@background: #f8f9fa;
@card-bg: #ffffff;
@border: #e9ecef;
@shadow: rgba(149, 157, 165, 0.1);

.web-storage-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: @background;
  color: @text;
  line-height: 1.6;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary, @secondary);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px @shadow;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .subtitle {
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
}

.card {
  background: @card-bg;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px @shadow;
  border: 1px solid @border;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(149, 157, 165, 0.2);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    color: @primary;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid @border;

    h2 {
      font-size: 1.6rem;
      margin: 0;
    }

    i {
      font-size: 1.5rem;
    }
  }
}

.definition {
  background: rgba(@primary, 0.05);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 3px solid @primary;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 25px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .local-storage,
  .session-storage {
    border-radius: 8px;
    padding: 20px;

    .type-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;

      h3 {
        margin: 0;
      }

      i {
        font-size: 1.8rem;
        width: 50px;
        height: 50px;
        background: rgba(@primary, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 12px;
        display: flex;
        align-items: flex-start;
        gap: 10px;

        i {
          color: @primary;
          margin-top: 5px;
        }
      }
    }
  }

  .local-storage {
    background: rgba(@success, 0.05);
    border: 1px solid rgba(@success, 0.3);

    .type-header i {
      color: @success;
    }
  }

  .session-storage {
    background: rgba(@warning, 0.05);
    border: 1px solid rgba(@warning, 0.3);

    .type-header i {
      color: @warning;
    }
  }
}

.vs-cookie {
  margin-top: 30px;

  h3 {
    color: @primary;
    margin-bottom: 15px;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px 15px;
      border: 1px solid @border;
      text-align: left;
    }

    th {
      background: rgba(@primary, 0.1);
      color: @primary;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: rgba(@primary, 0.03);
    }
  }
}

.api-methods {
  display: flex;
  flex-direction: column;
  gap: 25px;

  .method {
    border: 1px solid @border;
    border-radius: 8px;
    overflow: hidden;

    .method-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      background: rgba(@primary, 0.1);
      border-bottom: 1px solid @border;

      .method-name {
        font-family: 'Fira Code', monospace;
        font-weight: 600;
        color: @primary;
      }

      .method-type {
        background: @primary;
        color: white;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 0.85rem;
      }
    }

    .code-block {
      border-radius: 0;
      margin: 0;
      border: none;
      background: #f8f9fa;
      color: @text;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
    }
  }
}

.vue-integration {
  margin-top: 30px;

  h3 {
    color: @primary;
    margin-bottom: 15px;
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .case {
    display: flex;
    gap: 15px;
    padding: 20px;
    background: rgba(@primary, 0.05);
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .case-icon {
      width: 50px;
      height: 50px;
      background: @primary;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .case-content {
      flex: 1;

      h3 {
        margin: 0 0 8px 0;
        color: @text;
      }

      p {
        margin: 0 0 8px 0;
        color: @text-light;
      }

      .example {
        font-size: 0.9rem;
        color: @primary;
        font-style: italic;
      }
    }
  }
}

.selection-guide {
  margin-top: 30px;

  h3 {
    color: @primary;
    margin-bottom: 20px;
  }

  .guide-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .guide-card {
      border-radius: 8px;
      padding: 20px;

      h4 {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 0;
      }

      ul {
        padding-left: 25px;

        li {
          margin-bottom: 10px;
          position: relative;

          &::before {
            content: "•";
            color: @primary;
            font-weight: bold;
            position: absolute;
            left: -15px;
          }
        }
      }
    }

    .localStorage {
      background: rgba(@success, 0.05);
      border: 1px solid rgba(@success, 0.3);
    }

    .session-storage {
      background: rgba(@warning, 0.05);
      border: 1px solid rgba(@warning, 0.3);
    }
  }
}

.warnings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .warning {
    display: flex;
    gap: 15px;
    padding: 20px;
    border-radius: 8px;

    .icon {
      width: 50px;
      height: 50px;
      background: rgba(@primary, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      i {
        font-size: 1.5rem;
        color: @primary;
      }
    }

    .content {
      flex: 1;

      h3 {
        margin: 0 0 10px 0;
        color: @text;
      }

      ul {
        padding-left: 25px;
        margin: 10px 0;

        li {
          margin-bottom: 8px;
        }
      }
    }
  }
}

.best-practices {
  border-top: 1px solid @border;
  padding-top: 20px;
  margin-top: 20px;

  ul {
    padding-left: 25px;

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 25px;

      &::before {
        content: "✓";
        color: @success;
        font-weight: bold;
        position: absolute;
        left: 0;
      }
    }
  }
}

.storage-event {
  margin-top: 30px;
}

.code-block {
  background: #f8f9fa;
  color: #2b2d42;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 15px 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: @text-light;
  font-size: 0.9rem;
  border-top: 1px solid @border;
}
</style>
