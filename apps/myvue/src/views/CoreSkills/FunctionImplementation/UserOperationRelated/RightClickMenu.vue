<template>
  <div class="text-selection-container">
    <header class="header">
      <h1><i class="icon-text-select"></i> 划词选择与右键菜单实现</h1>
      <p>在用户选择的文本上添加自定义右键菜单的完整解决方案</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <!-- 功能演示部分 -->
        <section class="demo-section">
          <div class="demo-area">
            <div class="text-content" ref="textContent" @contextmenu="handleContextMenu">
              <h3>示例文本内容</h3>
              <p>选择下面文本中的任意部分，然后右键点击查看自定义菜单：</p>

              <p>前端开发是创建Web页面或App等前端界面呈现给用户的过程，通过HTML、CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，来实现互联网产品的用户界面交互。</p>

              <p>
                现代前端开发已经不再局限于简单的页面制作，而是涵盖了性能优化、跨平台开发、用户体验设计、工程化等多个方面。前端工程师需要掌握多种技术栈，如Vue、React、Angular等框架，以及Webpack、Vite等构建工具。
              </p>

              <p>划词选择功能在内容管理系统、在线文档编辑器、翻译工具等场景中非常有用。通过自定义右键菜单，可以为用户提供便捷的上下文操作，提升用户体验。</p>
            </div>

            <div class="context-menu" ref="contextMenu" :style="menuStyle" v-show="showMenu" @click.stop>
              <div class="menu-item" @click="handleMenuAction('copy')">
                <i class="icon-copy"></i> 复制
              </div>
              <div class="menu-item" @click="handleMenuAction('highlight')">
                <i class="icon-highlight"></i> 高亮标记
              </div>
              <div class="menu-item" @click="handleMenuAction('translate')">
                <i class="icon-translate"></i> 翻译
              </div>
              <div class="menu-item" @click="handleMenuAction('search')">
                <i class="icon-search"></i> 搜索
              </div>
              <div class="menu-item" @click="handleMenuAction('comment')">
                <i class="icon-comment"></i> 添加注释
              </div>
            </div>
          </div>

          <div class="demo-result" v-if="lastAction">
            <div class="result-header">
              <i class="icon-result"></i> 操作结果
            </div>
            <div class="result-content">
              <p><strong>执行操作:</strong> {{ lastAction.action }}</p>
              <p><strong>选择文本:</strong> "{{ lastAction.text }}"</p>
              <p><strong>操作时间:</strong> {{ lastAction.time }}</p>
            </div>
          </div>
        </section>

        <!-- 实现代码部分 -->
        <section class="code-section">
          <h2><i class="icon-code"></i> 实现代码</h2>

          <div class="code-tabs">
            <button :class="{ active: activeTab === 'template' }" @click="activeTab = 'template'">模板</button>
            <button :class="{ active: activeTab === 'script' }" @click="activeTab = 'script'">脚本</button>
            <button :class="{ active: activeTab === 'style' }" @click="activeTab = 'style'">样式</button>
          </div>

          <div v-show="activeTab === 'template'" class="code-block">
            <pre><code>&lt;!-- 文本容器 --&gt;
&lt;div class="text-content"
  ref="textContent"
  @contextmenu="handleContextMenu"&gt;
  &lt;!-- 文本内容 --&gt;
&lt;/div&gt;

&lt;!-- 右键菜单 --&gt;
&lt;div class="context-menu"
  ref="contextMenu"
  :style="menuStyle"
  v-show="showMenu"
  @click.stop&gt;

  &lt;div class="menu-item" @click="handleMenuAction('copy')"&gt;
    &lt;i class="icon-copy"&gt;&lt;/i&gt; 复制
  &lt;/div&gt;

  &lt;!-- 其他菜单项 --&gt;
&lt;/div&gt;</code></pre>
          </div>

          <div v-show="activeTab === 'script'" class="code-block">
            <pre><code>import { ref, onMounted, onBeforeUnmount } from 'vue';

// 响应式数据
const textContent = ref&lt;HTMLElement | null&gt;(null);
const contextMenu = ref&lt;HTMLElement | null&gt;(null);
const showMenu = ref(false);
const menuStyle = ref({ top: '0px', left: '0px' });
const lastAction = ref&lt;{action: string, text: string, time: string} | null&gt;(null);

// 处理右键菜单事件
const handleContextMenu = (e: MouseEvent) => {
  const selection = window.getSelection();
  if (!selection || selection.toString().trim() === '') {
    showMenu.value = false;
    return;
  }

  e.preventDefault();

  // 设置菜单位置
  menuStyle.value = {
    top: `${e.pageY}px`,
    left: `${e.pageX}px`
  };

  showMenu.value = true;
};

// 处理菜单项点击
const handleMenuAction = (action: string) => {
  const selection = window.getSelection();
  if (!selection) return;

  const selectedText = selection.toString().trim();
  if (!selectedText) return;

  // 记录操作
  lastAction.value = {
    action,
    text: selectedText,
    time: new Date().toLocaleTimeString()
  };

  // 执行操作逻辑
  switch (action) {
    case 'copy':
      navigator.clipboard.writeText(selectedText);
      break;
    case 'highlight':
      // 高亮实现逻辑
      break;
    case 'translate':
      // 翻译实现逻辑
      break;
    case 'search':
      window.open(`https://www.google.com/search?q=${encodeURIComponent(selectedText)}`);
      break;
    case 'comment':
      // 添加注释逻辑
      break;
  }

  showMenu.value = false;
};

// 点击其他地方关闭菜单
const handleClickOutside = (e: MouseEvent) => {
  if (showMenu.value && contextMenu.value &&
      !contextMenu.value.contains(e.target as Node)) {
    showMenu.value = false;
  }
};

// 添加事件监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// 移除事件监听
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});</code></pre>
          </div>

          <div v-show="activeTab === 'style'" class="code-block">
            <pre><code>.text-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.8;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.context-menu {
  position: absolute;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 160px;
  overflow: hidden;

  .menu-item {
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.2s;

    &:hover {
      background: #f0f5ff;
    }

    i {
      width: 20px;
      text-align: center;
    }
  }
}</code></pre>
          </div>
        </section>

        <!-- 使用场景部分 -->
        <section class="scenarios-section">
          <h2><i class="icon-scenario"></i> 使用场景</h2>

          <div class="scenarios-grid">
            <div class="scenario-card">
              <div class="scenario-icon docs"></div>
              <h3>在线文档编辑器</h3>
              <p>在Google Docs、Notion类应用中提供快捷操作，如格式调整、评论添加等。</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon translate"></div>
              <h3>翻译工具</h3>
              <p>选择文本后直接翻译，提升语言处理效率。</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon cms"></div>
              <h3>内容管理系统</h3>
              <p>快速编辑、格式化或链接选中的文本内容。</p>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon education"></div>
              <h3>在线学习平台</h3>
              <p>学生划选文本后添加笔记、高亮重点或查找资料。</p>
            </div>
          </div>
        </section>

        <!-- 实现要点 -->
        <section class="key-points">
          <h2><i class="icon-key"></i> 实现要点</h2>

          <div class="points-grid">
            <div class="point-card">
              <div class="point-number">1</div>
              <h3>文本选择检测</h3>
              <p>使用<code>window.getSelection()</code>获取用户选择的文本内容，确保选择有效</p>
            </div>

            <div class="point-card">
              <div class="point-number">2</div>
              <h3>阻止默认菜单</h3>
              <p>在contextmenu事件中调用<code>preventDefault()</code>阻止浏览器默认菜单</p>
            </div>

            <div class="point-card">
              <div class="point-number">3</div>
              <h3>精确定位菜单</h3>
              <p>根据鼠标事件对象的pageX/pageY属性设置菜单位置</p>
            </div>

            <div class="point-card">
              <div class="point-number">4</div>
              <h3>菜单点击处理</h3>
              <p>为每个菜单项绑定操作函数，并传递选中的文本内容</p>
            </div>

            <div class="point-card">
              <div class="point-number">5</div>
              <h3>外部点击关闭</h3>
              <p>监听全局点击事件，在点击菜单外部区域时关闭菜单</p>
            </div>

            <div class="point-card">
              <div class="point-number">6</div>
              <h3>组件卸载清理</h3>
              <p>使用onBeforeUnmount生命周期钩子移除全局事件监听</p>
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>© 2023 前端交互设计 | 划词选择与右键菜单实现</p>
      <p>在实际项目中，请根据具体需求定制菜单内容和样式</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 响应式数据
const textContent = ref<HTMLElement | null>(null);
const contextMenu = ref<HTMLElement | null>(null);
const showMenu = ref(false);
const menuStyle = ref({ top: '0px', left: '0px' });
const lastAction = ref<{ action: string, text: string, time: string } | null>(null);
const activeTab = ref('template');

// 处理右键菜单事件
const handleContextMenu = (e: MouseEvent) => {
  const selection = window.getSelection();
  if (!selection || selection.toString().trim() === '') {
    showMenu.value = false;
    return;
  }

  e.preventDefault();

  // 设置菜单位置
  menuStyle.value = {
    top: `${e.pageY}px`,
    left: `${e.pageX}px`
  };

  showMenu.value = true;
};

// 处理菜单项点击
const handleMenuAction = (action: string) => {
  const selection = window.getSelection();
  if (!selection) return;

  const selectedText = selection.toString().trim();
  if (!selectedText) return;

  // 记录操作
  lastAction.value = {
    action,
    text: selectedText,
    time: new Date().toLocaleTimeString()
  };

  // 执行操作逻辑
  switch (action) {
    case 'copy':
      navigator.clipboard.writeText(selectedText);
      break;
    case 'highlight':
      highlightSelectedText();
      break;
    case 'translate':
      translateText(selectedText);
      break;
    case 'search':
      window.open(`https://www.google.com/search?q=${encodeURIComponent(selectedText)}`);
      break;
    case 'comment':
      addComment(selectedText);
      break;
  }

  showMenu.value = false;
};

// 高亮选中文本
const highlightSelectedText = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const span = document.createElement('span');
  span.className = 'text-highlight';

  range.surroundContents(span);
  selection.removeAllRanges();
};

// 翻译文本（模拟）
const translateText = (text: string) => {
  alert(`翻译功能演示: ${text}`);
};

// 添加注释（模拟）
const addComment = (text: string) => {
  alert(`为选中的文本添加注释: ${text}`);
};

// 点击其他地方关闭菜单
const handleClickOutside = (e: MouseEvent) => {
  if (showMenu.value && contextMenu.value &&
    !contextMenu.value.contains(e.target as Node)) {
    showMenu.value = false;
  }
};

// 添加事件监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// 移除事件监听
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

:root {
  --primary-color: #4a6cf7;
  --secondary-color: #2c3e50;
  --accent-color: #8e44ad;
  --success-color: #27ae60;
  --light-bg: #f8f9fa;
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

.text-selection-container {
  max-width: 1200px;
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
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
}

.content-wrapper {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

/* 演示区域样式 */
.demo-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}

.demo-area {
  position: relative;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 2rem;
}

.text-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.8;
  cursor: default;

  h3 {
    color: var(--secondary-color);
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    position: relative;
  }
}

.text-highlight {
  background-color: rgba(255, 235, 59, 0.3);
  padding: 0 2px;
  border-radius: 3px;
}

.context-menu {
  position: absolute;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  min-width: 160px;
  overflow: hidden;

  .menu-item {
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: var(--transition);
    font-size: 0.95rem;

    &:hover {
      background: #f0f5ff;
      color: var(--primary-color);
    }

    i {
      width: 20px;
      text-align: center;
      font-size: 1.1rem;
    }
  }
}

.demo-result {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 1.5rem;

  .result-header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
    color: var(--secondary-color);
  }

  .result-content {
    p {
      margin-bottom: 0.8rem;
      line-height: 1.6;
    }
  }
}

/* 代码部分样式 */
.code-section {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 2rem;
  margin-bottom: 2rem;

  h2 {
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
  }
}

.code-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;

  button {
    padding: 0.7rem 1.2rem;
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
      color: rgb(245, 120, 120);
    }
  }
}

.code-block {
  background: #2c3e50;
  color: #ecf0f1;
  border-radius: 6px;
  padding: 1.5rem;
  overflow-x: auto;

  pre {
    margin: 0;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;

    code {
      font-family: inherit;
    }
  }
}

/* 使用场景样式 */
.scenarios-section {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 2rem;
  margin-bottom: 2rem;

  h2 {
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
  }
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  border: 1px solid #eaeaea;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  text-align: center;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow);
  }

  h3 {
    color: var(--secondary-color);
    margin: 1rem 0 0.8rem;
  }

  p {
    font-size: 0.95rem;
  }
}

.scenario-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;

  &.docs {
    background: #4a6cf7;
  }

  &.translate {
    background: #27ae60;
  }

  &.cms {
    background: #e67e22;
  }

  &.education {
    background: #8e44ad;
  }
}

/* 实现要点样式 */
.key-points {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 2rem;

  h2 {
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
  }
}

.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.point-card {
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  position: relative;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 5px 15px rgba(74, 108, 247, 0.1);
  }

  h3 {
    color: var(--secondary-color);
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.6;

    code {
      background: #f1f5ff;
      padding: 0.1rem 0.3rem;
      border-radius: 3px;
      font-family: 'Fira Code', monospace;
      color: var(--primary-color);
    }
  }
}

.point-number {
  position: absolute;
  top: -15px;
  left: 15px;
  background: var(--primary-color);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
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

.icon-text-select::before {
  content: "text_fields";
}

.icon-code::before {
  content: "code";
}

.icon-scenario::before {
  content: "scatter_plot";
}

.icon-key::before {
  content: "key";
}

.icon-result::before {
  content: "assignment_turned_in";
}

.icon-copy::before {
  content: "content_copy";
}

.icon-highlight::before {
  content: "highlight";
}

.icon-translate::before {
  content: "translate";
}

.icon-search::before {
  content: "search";
}

.icon-comment::before {
  content: "comment";
}
</style>