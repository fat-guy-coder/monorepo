<template>
  <div class="vue-modifiers-container">
    <header class="header">
      <h1>Vue 修饰符指南</h1>
      <p class="subtitle">提升开发效率的语法糖</p>
    </header>

    <div class="content-wrapper">
      <!-- 事件修饰符 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🎯</span> 事件修饰符
          </h2>
          <p class="section-description">控制事件触发行为的特殊后缀</p>
        </div>

        <div class="modifier-grid">
          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.stop</span>
              <span class="modifier-symbol">🛑</span>
            </div>
            <div class="modifier-content">
              <h3>阻止事件冒泡</h3>
              <p>调用 <code>event.stopPropagation()</code>，阻止事件继续传播</p>
              <div class="example-code">
                <pre><code>&lt;!-- 点击按钮不会触发父元素事件 --&gt;
&lt;div @click="parentMethod"&gt;
  &lt;button @click.stop="childMethod"&gt;点击&lt;/button&gt;
&lt;/div&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>嵌套组件中阻止事件冒泡</li>
                  <li>避免触发多个事件处理器</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.prevent</span>
              <span class="modifier-symbol">⛔</span>
            </div>
            <div class="modifier-content">
              <h3>阻止默认行为</h3>
              <p>调用 <code>event.preventDefault()</code>，阻止元素默认行为</p>
              <div class="example-code">
                <pre><code>&lt;!-- 表单提交不会刷新页面 --&gt;
&lt;form @submit.prevent="handleSubmit"&gt;
  &lt;button type="submit"&gt;提交&lt;/button&gt;
&lt;/form&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>表单提交处理</li>
                  <li>阻止链接跳转</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.capture</span>
              <span class="modifier-symbol">🔍</span>
            </div>
            <div class="modifier-content">
              <h3>事件捕获模式</h3>
              <p>使用事件捕获模式而非冒泡模式处理事件</p>
              <div class="example-code">
                <pre><code>&lt;!-- 内部元素事件触发时先调用外部处理函数 --&gt;
&lt;div @click.capture="outerMethod"&gt;
  &lt;button @click="innerMethod"&gt;点击&lt;/button&gt;
&lt;/div&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>需要先处理父元素事件的场景</li>
                  <li>事件委托的高级用法</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.once</span>
              <span class="modifier-symbol">1️⃣</span>
            </div>
            <div class="modifier-content">
              <h3>只触发一次</h3>
              <p>事件处理函数只会执行一次，之后自动解绑</p>
              <div class="example-code">
                <pre><code>&lt;!-- 按钮只能点击一次 --&gt;
&lt;button @click.once="handleClick"&gt;只能点一次&lt;/button&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>一次性操作（如支付按钮）</li>
                  <li>防止重复提交</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.passive</span>
              <span class="modifier-symbol">⚡</span>
            </div>
            <div class="modifier-content">
              <h3>提升滚动性能</h3>
              <p>不阻止事件的默认行为，提升移动端滚动性能</p>
              <div class="example-code">
                <pre><code>&lt;!-- 优化滚动事件性能 --&gt;
&lt;div @scroll.passive="handleScroll"&gt;...&lt;/div&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>移动端滚动事件处理</li>
                  <li>需要提升性能的场景</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.self</span>
              <span class="modifier-symbol">👤</span>
            </div>
            <div class="modifier-content">
              <h3>仅当事件源自自身</h3>
              <p>仅当事件是从侦听器绑定的元素本身触发时才触发回调</p>
              <div class="example-code">
                <pre><code>&lt;!-- 只有点击div本身才触发，点击子元素不触发 --&gt;
&lt;div @click.self="handleClick"&gt;
  &lt;button&gt;点击按钮不会触发div事件&lt;/button&gt;
&lt;/div&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>模态框背景点击关闭</li>
                  <li>忽略子元素事件</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 按键修饰符 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">⌨️</span> 按键修饰符
          </h2>
          <p class="section-description">监听特定键盘事件</p>
        </div>

        <div class="modifier-grid">
          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.enter</span>
              <span class="modifier-symbol">↩️</span>
            </div>
            <div class="modifier-content">
              <h3>回车键</h3>
              <p>监听回车键事件</p>
              <div class="example-code">
                <pre><code>&lt;input @keyup.enter="submitForm" /&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>表单提交</li>
                  <li>搜索框确认</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.tab</span>
              <span class="modifier-symbol">⇥</span>
            </div>
            <div class="modifier-content">
              <h3>Tab 键</h3>
              <p>监听 Tab 键事件</p>
              <div class="example-code">
                <pre><code>&lt;input @keydown.tab="focusNext" /&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>表单焦点管理</li>
                  <li>自定义 Tab 顺序</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.esc</span>
              <span class="modifier-symbol">⎋</span>
            </div>
            <div class="modifier-content">
              <h3>ESC 键</h3>
              <p>监听 ESC 键事件</p>
              <div class="example-code">
                <pre><code>&lt;div @keyup.esc="closeModal"&gt;...&lt;/div&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>关闭模态框</li>
                  <li>取消操作</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.space</span>
              <span class="modifier-symbol">␣</span>
            </div>
            <div class="modifier-content">
              <h3>空格键</h3>
              <p>监听空格键事件</p>
              <div class="example-code">
                <pre><code>&lt;button @keyup.space="toggle"&gt;切换&lt;/button&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>按钮切换状态</li>
                  <li>媒体播放控制</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.arrow-keys</span>
              <span class="modifier-symbol">⬆️⬇️⬅️➡️</span>
            </div>
            <div class="modifier-content">
              <h3>方向键</h3>
              <p>监听上下左右方向键事件</p>
              <div class="example-code">
                <pre><code>&lt;div
  @keyup.up="moveUp"
  @keyup.down="moveDown"
  @keyup.left="moveLeft"
  @keyup.right="moveRight"
&gt;
  使用方向键控制
&lt;/div&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>游戏控制</li>
                  <li>导航菜单</li>
                  <li>图片/幻灯片浏览</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.exact</span>
              <span class="modifier-symbol">🎯</span>
            </div>
            <div class="modifier-content">
              <h3>精确控制</h3>
              <p>精确控制系统修饰符组合</p>
              <div class="example-code">
                <pre><code>&lt;!-- 仅当按下 Ctrl 且未按其他键时触发 --&gt;
&lt;button @click.ctrl.exact="ctrlClick"&gt;Ctrl+点击&lt;/button&gt;

&lt;!-- 仅当没有系统修饰符被按下时触发 --&gt;
&lt;button @click.exact="pureClick"&gt;纯点击&lt;/button&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>精确快捷键处理</li>
                  <li>避免组合键冲突</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- v-model修饰符 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🔄</span> v-model 修饰符
          </h2>
          <p class="section-description">增强双向绑定的功能</p>
        </div>

        <div class="modifier-grid">
          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.lazy</span>
              <span class="modifier-symbol">⏱️</span>
            </div>
            <div class="modifier-content">
              <h3>延迟同步</h3>
              <p>在 change 事件后同步而非 input 事件</p>
              <div class="example-code">
                <pre><code>&lt;!-- 输入完成后同步（失焦或回车） --&gt;
&lt;input v-model.lazy="message" /&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>减少频繁更新操作</li>
                  <li>表单验证优化</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.number</span>
              <span class="modifier-symbol">🔢</span>
            </div>
            <div class="modifier-content">
              <h3>转换为数字</h3>
              <p>将用户输入转为数字类型</p>
              <div class="example-code">
                <pre><code>&lt;!-- 输入值自动转为数字 --&gt;
&lt;input v-model.number="age" type="number" /&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>数字输入处理</li>
                  <li>计算表单字段</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.trim</span>
              <span class="modifier-symbol">✂️</span>
            </div>
            <div class="modifier-content">
              <h3>自动去除空格</h3>
              <p>自动去除用户输入的首尾空格</p>
              <div class="example-code">
                <pre><code>&lt;!-- 输入值自动去除首尾空格 --&gt;
&lt;input v-model.trim="username" /&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>用户名/邮箱输入</li>
                  <li>搜索关键词处理</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 鼠标修饰符 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🖱️</span> 鼠标修饰符
          </h2>
          <p class="section-description">控制鼠标按钮触发事件</p>
        </div>

        <div class="modifier-grid">
          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.left</span>
              <span class="modifier-symbol">👈</span>
            </div>
            <div class="modifier-content">
              <h3>鼠标左键</h3>
              <p>仅当鼠标左键点击时触发</p>
              <div class="example-code">
                <pre><code>&lt;div @mousedown.left="startDrag"&gt;左键拖动&lt;/div&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>拖拽功能实现</li>
                  <li>区分左右键点击</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.right</span>
              <span class="modifier-symbol">👉</span>
            </div>
            <div class="modifier-content">
              <h3>鼠标右键</h3>
              <p>仅当鼠标右键点击时触发</p>
              <div class="example-code">
                <pre><code>&lt;div @click.right="showContextMenu"&gt;
  右键显示菜单
&lt;/div&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>自定义右键菜单</li>
                  <li>禁用默认右键菜单</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modifier-card">
            <div class="modifier-header">
              <span class="modifier-name">.middle</span>
              <span class="modifier-symbol">🖱️</span>
            </div>
            <div class="modifier-content">
              <h3>鼠标中键</h3>
              <p>仅当鼠标中键点击时触发</p>
              <div class="example-code">
                <pre><code>&lt;div @click.middle="openInNewTab"&gt;中键打开新标签&lt;/div&gt;</code></pre>
              </div>
              <div class="use-case">
                <h4>使用场景：</h4>
                <ul>
                  <li>浏览器中键操作</li>
                  <li>特殊功能触发</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="summary">
        <h3>Vue修饰符使用要点：</h3>
        <ul>
          <li>事件修饰符可串联使用：<code>@click.stop.prevent</code></li>
          <li>按键修饰符支持按键别名（如<code>.enter</code>）和按键码（<code>.13</code>）</li>
          <li>Vue3中移除了<code>.sync</code>修饰符，改用带参数的<code>v-model</code></li>
          <li>系统修饰符（<code>.ctrl</code>, <code>.alt</code>, <code>.shift</code>, <code>.meta</code>）用于组合键操作</li>
        </ul>
      </div>
      <div class="footer-links">
        <a href="https://vuejs.org/guide/essentials/event-handling.html#event-modifiers" target="_blank">官方事件修饰符文档</a>
        <a href="https://vuejs.org/guide/essentials/forms.html#modifiers" target="_blank">v-model修饰符文档</a>
        <a href="https://vuejs.org/guide/essentials/event-handling.html#key-modifiers" target="_blank">按键修饰符文档</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑（如果需要）
</script>

<style lang="less" scoped>


:root {
  --primary-color: #4361ee;
  --primary-light: #eef2ff;
  --secondary-color: #3a0ca3;
  --accent-color: #4cc9f0;
  --success-color: #2ec4b6;
  --warning-color: #ff9f1c;
  --danger-color: #e71d36;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --gray-light: #e9ecef;
  --gray-medium: #adb5bd;
  --border-radius: 10px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.vue-modifiers-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  color: var(--dark-color);
  line-height: 1.6;
  background-color: #fff;
}

.header {
  text-align: center;
  padding: 50px 20px 30px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: var(--border-radius);
  margin: 20px 0 30px;
  box-shadow: var(--box-shadow);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
    color: #000;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
    font-weight: 300;
  }
}

.section {
  margin-bottom: 40px;
  background: white;
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--box-shadow);
}

.section-header {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--gray-light);
}

.section-title {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--secondary-color);

  .icon {
    font-size: 1.5em;
  }
}

.section-description {
  font-size: 1.1rem;
  color: var(--gray-medium);
  margin-top: 5px;
}

.modifier-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
}

.modifier-card {
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
  background: white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    border-color: var(--primary-color);
  }
}

.modifier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: var(--primary-light);
  border-bottom: 1px solid var(--gray-light);
}

.modifier-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--primary-color);
}

.modifier-symbol {
  font-size: 1.8rem;
}

.modifier-content {
  padding: 20px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--secondary-color);
  }

  p {
    margin-bottom: 15px;
    color: #495057;
  }
}

.example-code {
  background: #f5f7ff;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin: 15px 0;
  border: 1px solid var(--gray-light);

  pre {
    margin: 0;
    padding: 15px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 0.9rem;
      color: var(--secondary-color);
    }
  }
}

.use-case {
  background: #f8f9fa;
  border-radius: var(--border-radius);
  padding: 15px;
  margin-top: 15px;

  h4 {
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: var(--primary-color);
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      font-size: 0.95rem;
    }
  }
}

.footer {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid var(--gray-light);

  .summary {
    background: var(--primary-light);
    border-radius: var(--border-radius);
    padding: 25px;
    margin-bottom: 25px;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: var(--secondary-color);
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 10px;
        font-weight: 500;

        code {
          background: rgba(67, 97, 238, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          color: var(--primary-color);
        }
      }
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    flex-wrap: wrap;

    a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: var(--transition);
      padding: 8px 15px;
      border-radius: 30px;
      border: 1px solid var(--primary-color);

      &:hover {
        background: var(--primary-color);
        color: white;
        text-decoration: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section {
    padding: 20px;
  }

  .modifier-grid {
    grid-template-columns: 1fr;
  }
}
</style>
