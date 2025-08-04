<template>
  <div class="shortcuts-container">
    <header class="header">
      <h1>Visual Studio Code 快捷键手册</h1>
      <div class="subtitle">Windows 版本常用命令速查</div>
    </header>

    <main class="main-content">
      <!-- 常用命令 -->
      <section class="category-card priority">
        <h2 class="category-title">⭐ 高频使用</h2>
        <div class="shortcut-grid">
          <div v-for="(item, index) in commonShortcuts" :key="index" class="shortcut-item">
            <div class="keys">{{ item.key }}</div>
            <div class="description">{{ item.desc }}</div>
          </div>
        </div>
      </section>

      <!-- 分类命令 -->
      <section
        v-for="(category, index) in categorizedShortcuts"
        :key="'cat' + index"
        class="category-card"
      >
        <h2 class="category-title">{{ category.title }}</h2>
        <div class="shortcut-grid">
          <div v-for="(item, idx) in category.items" :key="idx" class="shortcut-item">
            <div class="keys">{{ item.key }}</div>
            <div class="description">{{ item.desc }}</div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
const commonShortcuts = [
  { key: 'Ctrl+Shift+P', desc: '显示命令面板' },
  { key: 'Ctrl+P', desc: '快速打开文件' },
  { key: 'Ctrl+S', desc: '保存文件' },
  { key: 'Ctrl+F', desc: '查找内容' },
  { key: 'Ctrl+H', desc: '替换内容' },
  { key: 'F12', desc: '跳转到定义' },
  { key: 'Ctrl+Z / Ctrl+Y', desc: '撤销/重做' },
  { key: 'Alt+↑/↓', desc: '移动代码行' },
  { key: 'Ctrl+D', desc: '多选相同内容' },
  { key: 'F5', desc: '启动调试' },
]

const categorizedShortcuts = [
  {
    title: '🛠️ 基础编辑',
    items: [
      { key: 'Ctrl+X', desc: '剪切行' },
      { key: 'Ctrl+C', desc: '复制行' },
      { key: 'Ctrl+Enter', desc: '下方插入行' },
      { key: 'Ctrl+Shift+K', desc: '删除行' },
      { key: 'Ctrl+/', desc: '切换行注释' },
      { key: 'Shift+Alt+A', desc: '切换块注释' },
    ],
  },
  {
    title: '🔍 导航搜索',
    items: [
      { key: 'Ctrl+G', desc: '转到行' },
      { key: 'Ctrl+T', desc: '显示所有符号' },
      { key: 'Ctrl+F12', desc: '转到实现' },
      { key: 'Alt+←/→', desc: '导航历史' },
      { key: 'F3/Shift+F3', desc: '查找下一个/上一个' },
    ],
  },
  {
    title: '💻 代码操作',
    items: [
      { key: 'Ctrl+Space', desc: '触发代码提示' },
      { key: 'F2', desc: '重命名符号' },
      { key: 'Shift+Alt+F', desc: '格式化文档' },
      { key: 'Ctrl+K Ctrl+F', desc: '格式化选中内容' },
      { key: 'Ctrl+Shift+O', desc: '转到文件符号' },
    ],
  },
  {
    title: '📁 文件管理',
    items: [
      { key: 'Ctrl+N', desc: '新建文件' },
      { key: 'Ctrl+O', desc: '打开文件' },
      { key: 'Ctrl+W', desc: '关闭编辑器' },
      { key: 'Ctrl+Tab', desc: '切换标签页' },
      { key: 'Ctrl+K O', desc: '在新窗口打开文件' },
    ],
  },
  {
    title: '🖥️ 界面控制',
    items: [
      { key: 'Ctrl+B', desc: '切换侧边栏' },
      { key: 'Ctrl+`', desc: '切换终端' },
      { key: 'F11', desc: '全屏模式' },
      { key: 'Ctrl+K Z', desc: '禅模式' },
      { key: 'Shift+Alt+0', desc: '切换布局方向' },
    ],
  },
]
</script>

<style scoped>
.shortcuts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: #2c3e50;
  border-radius: 12px;
  color: white;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #bdc3c7;
}

.main-content {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.category-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.category-card:hover {
  transform: translateY(-3px);
}

.category-card.priority {
  grid-column: 1 / -1;
  background: #fff9e6;
  border: 2px solid #ffe082;
}

.category-title {
  color: #2c3e50;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3498db;
}

.shortcut-grid {
  display: grid;
  gap: 1rem;
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.keys {
  font-family: 'Fira Code', monospace;
  background: #2c3e50;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  font-size: 0.9rem;
}

.description {
  color: #4a5568;
  margin-left: 1rem;
  text-align: right;
  flex: 1;
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .shortcut-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .description {
    margin-left: 0;
    margin-top: 0.5rem;
    text-align: left;
  }
}
</style>
