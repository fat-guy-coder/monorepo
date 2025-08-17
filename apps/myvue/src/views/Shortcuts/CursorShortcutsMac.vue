<template>
  <div class="shortcuts-container">
    <header class="header">
      <h1 class="title">Mac 光标操作快捷键</h1>
      <p class="subtitle">提升 macOS 工作效率的必备快捷键指南</p>
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
      <p>熟练使用这些快捷键可显著提升您在 macOS 中的工作效率</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Shortcut {
  name: string;
  keys: string[];
}

interface Category {
  name: string;
  shortcuts: Shortcut[];
}

const categories: Category[] = [
  {
    name: "⌨️ 基础编辑",
    shortcuts: [
      { name: "复制", keys: ["⌘", "C"] },
      { name: "剪切", keys: ["⌘", "X"] },
      { name: "粘贴", keys: ["⌘", "V"] },
      { name: "粘贴无格式", keys: ["⌘", "⌥", "V"] },
      { name: "撤销", keys: ["⌘", "Z"] },
      { name: "重做", keys: ["⌘", "⇧", "Z"] },
      { name: "全选", keys: ["⌘", "A"] },
    ]
  },
  {
    name: "🚀 光标导航",
    shortcuts: [
      { name: "行首", keys: ["⌘", "←"] },
      { name: "行尾", keys: ["⌘", "→"] },
      { name: "文档开头", keys: ["⌘", "↑"] },
      { name: "文档结尾", keys: ["⌘", "↓"] },
      { name: "按词移动", keys: ["⌥", "←/→"] },
      { name: "按段移动", keys: ["⌥", "↑/↓"] },
      { name: "跳转到行", keys: ["⌘", "L"] },
    ]
  },
  {
    name: "✂️ 文本操作",
    shortcuts: [
      { name: "删除前词", keys: ["⌥", "⌫"] },
      { name: "删除后词", keys: ["⌥", "⌦"] },
      { name: "删除到行首", keys: ["⌘", "⌫"] },
      { name: "删除到行尾", keys: ["⌘", "⌦"] },
      { name: "选中当前词", keys: ["⌥", "双击"] },
      { name: "选中当前行", keys: ["⌘", "双击"] },
      { name: "大小写转换", keys: ["⌥", "⌘", "C"] },
    ]
  },
  {
    name: "🖥️ 窗口管理",
    shortcuts: [
      { name: "切换应用", keys: ["⌘", "Tab"] },
      { name: "反向切换", keys: ["⌘", "⇧", "Tab"] },
      { name: "隐藏当前", keys: ["⌘", "H"] },
      { name: "最小化", keys: ["⌘", "M"] },
      { name: "全屏", keys: ["⌘", "⌃", "F"] },
      { name: "新建窗口", keys: ["⌘", "N"] },
      { name: "关闭窗口", keys: ["⌘", "W"] },
    ]
  },
  {
    name: "🔍 搜索与系统",
    shortcuts: [
      { name: "聚焦搜索", keys: ["⌘", "Space"] },
      { name: "快速查看", keys: ["Space"] },
      { name: "表情符号", keys: ["⌘", "⌃", "Space"] },
      { name: "访达", keys: ["⌘", "⌥", "Space"] },
      { name: "强制退出", keys: ["⌘", "⌥", "Esc"] },
      { name: "屏幕截图", keys: ["⌘", "⇧", "4"] },
      { name: "录屏", keys: ["⌘", "⇧", "5"] },
    ]
  },
  {
    name: "⚙️ 高级功能",
    shortcuts: [
      { name: "终端", keys: ["⌘", "Space"], extra: "输入 Terminal" },
      { name: "活动监视器", keys: ["⌘", "Space"], extra: "输入 Activity" },
      { name: "系统偏好", keys: ["⌘", ","] },
      { name: "Dock 隐藏/显示", keys: ["⌘", "⌥", "D"] },
      { name: "Mission Control", keys: ["⌃", "↑"] },
      { name: "应用切换器", keys: ["⌃", "↓"] },
      { name: "锁定屏幕", keys: ["⌘", "⌃", "Q"] },
    ]
  }
];
</script>

<style lang="less" scoped>


.shortcuts-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1d1d1f;
  background-color: #fbfbfd;
  line-height: 1.5;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;

  .title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1d1d1f;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1rem;
    color: #86868b;
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
    border-bottom: 2px solid #e0e0e0;
    color: #0071e3;
    letter-spacing: -0.3px;
  }
}

.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.8rem;
}

.shortcut-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 0.9rem 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);

  &:hover {
    background-color: #f5f5f7;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }

  .shortcut-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: #1d1d1f;
  }

  .shortcut-keys {
    display: flex;
    gap: 0.4rem;

    kbd {
      background-color: #fff;
      border: 1px solid #d2d2d7;
      border-radius: 6px;
      padding: 0.25rem 0.6rem;
      font-size: 0.8rem;
      font-family: 'SF Pro Display', -apple-system, sans-serif;
      color: #515154;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
      display: inline-flex;
      align-items: center;
      min-width: 1.6rem;
      justify-content: center;
      font-weight: 500;

      &:first-child {
        background-color: #f5f5f7;
      }
    }
  }
}

.footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
  color: #86868b;
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

  .shortcut-card {
    padding: 0.8rem 1rem;
  }
}
</style>
