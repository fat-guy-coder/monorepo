<template>
  <div class="shortcuts-container">
    <header class="header">
      <h1 class="title">Windows 光标操作快捷键</h1>
      <p class="subtitle">提高工作效率的必备快捷键指南</p>
    </header>

    <div class="content-section">
      <div class="category" v-for="category in categories" :key="category.name">
        <h2 class="category-title">{{ category.name }}</h2>
        <div class="shortcut-grid">
          <div class="shortcut-card" v-for="shortcut in category.shortcuts" :key="shortcut.name">
            <div class="shortcut-name">{{ shortcut.name }}</div>
            <div class="shortcut-keys">
              <kbd v-for="(key, index) in shortcut.keys" :key="index">{{ key }}</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>掌握这些快捷键可以显著提高您在Windows系统中的操作效率</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Shortcut {
  name: string;
  keys: string[];
}

interface Category {
  shortcuts: Shortcut[];
  name: string;
}

const categories: Category[] = [
  {
    name: "💻 基础操作",
    shortcuts: [
      { name: "选择文本", keys: ["Shift", "+", "方向键"] },
      { name: "全选", keys: ["Ctrl", "A"] },
      { name: "复制", keys: ["Ctrl", "C"] },
      { name: "剪切", keys: ["Ctrl", "X"] },
      { name: "粘贴", keys: ["Ctrl", "V"] },
      { name: "撤销", keys: ["Ctrl", "Z"] },
      { name: "恢复", keys: ["Ctrl", "Y"] },
    ]
  },
  {
    name: "🚀 高效导航",
    shortcuts: [
      { name: "光标移动到行首", keys: ["Home"] },
      { name: "光标移动到行尾", keys: ["End"] },
      { name: "光标移动到文档开头", keys: ["Ctrl", "Home"] },
      { name: "光标移动到文档结尾", keys: ["Ctrl", "End"] },
      { name: "按单词移动光标", keys: ["Ctrl", "+", "←/→"] },
      { name: "按段落移动光标", keys: ["Ctrl", "+", "↑/↓"] },
      { name: "快速滚动", keys: ["Ctrl", "+", "鼠标滚轮"] },
    ]
  },
  {
    name: "📋 文本编辑",
    shortcuts: [
      { name: "删除光标前字符", keys: ["Backspace"] },
      { name: "删除光标后字符", keys: ["Delete"] },
      { name: "删除前一个单词", keys: ["Ctrl", "Backspace"] },
      { name: "删除后一个单词", keys: ["Ctrl", "Delete"] },
      { name: "插入换行符", keys: ["Shift", "Enter"] },
      { name: "插入制表符", keys: ["Ctrl", "Tab"] },
      { name: "大小写转换", keys: ["Shift", "F3"] },
    ]
  },
  {
    name: "🖥️ 窗口管理",
    shortcuts: [
      { name: "切换窗口", keys: ["Alt", "Tab"] },
      { name: "反向切换窗口", keys: ["Alt", "Shift", "Tab"] },
      { name: "最小化所有窗口", keys: ["Win", "D"] },
      { name: "锁定计算机", keys: ["Win", "L"] },
      { name: "打开任务管理器", keys: ["Ctrl", "Shift", "Esc"] },
      { name: "切换虚拟桌面", keys: ["Ctrl", "Win", "←/→"] },
      { name: "新建虚拟桌面", keys: ["Ctrl", "Win", "D"] },
    ]
  },
  {
    name: "🔍 搜索与运行",
    shortcuts: [
      { name: "打开搜索", keys: ["Win", "S"] },
      { name: "打开运行对话框", keys: ["Win", "R"] },
      { name: "打开文件资源管理器", keys: ["Win", "E"] },
      { name: "打开设置", keys: ["Win", "I"] },
      { name: "打开操作中心", keys: ["Win", "A"] },
      { name: "打开通知中心", keys: ["Win", "N"] },
      { name: "打开放大镜", keys: ["Win", "+"] },
    ]
  },
  {
    name: "🛠️ 高级功能",
    shortcuts: [
      { name: "截图工具", keys: ["Win", "Shift", "S"] },
      { name: "游戏栏", keys: ["Win", "G"] },
      { name: "投影屏幕", keys: ["Win", "P"] },
      { name: "打开表情面板", keys: ["Win", "."] },
      { name: "重命名文件", keys: ["F2"] },
      { name: "刷新", keys: ["F5"] },
      { name: "全屏截图", keys: ["PrtScn"] },
    ]
  }
];
</script>

<style lang="less" scoped>

.shortcuts-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2c3e50;
  background-color: #fff;
  line-height: 1.5;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaecef;

  .title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }

  .subtitle {
    font-size: 1rem;
    color: #7f8c8d;
    font-weight: 400;
  }
}

.content-section {
  margin-bottom: 1.5rem;
}

.category {
  margin-bottom: 2rem;

  .category-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #eaecef;
    color: #3498db;
  }
}

.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.8rem;
}

.shortcut-card {
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 0.8rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  border: 1px solid #eaecef;

  &:hover {
    background-color: #f0f4f8;
    transform: translateY(-2px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }

  .shortcut-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: #2c3e50;
  }

  .shortcut-keys {
    display: flex;
    gap: 0.3rem;

    kbd {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0.2rem 0.5rem;
      font-size: 0.8rem;
      font-family: 'Consolas', monospace;
      color: #555;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      display: inline-flex;
      align-items: center;
      min-width: 1.5rem;
      justify-content: center;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eaecef;
  color: #7f8c8d;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .shortcuts-container {
    padding: 1.5rem 1rem;
  }

  .shortcut-grid {
    grid-template-columns: 1fr;
  }

  .header .title {
    font-size: 1.5rem;
  }
}
</style>
