<template>
  <div class="shortcuts-container">
    <header class="header">
      <h1 class="title">Windows Cursor操作快捷键</h1>
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
            <div class="shortcut-heat" :style="{ backgroundColor: getHeatColor(shortcut.heat) }">
              {{ shortcut.heat }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Shortcut {
  name: string;
  keys: string[];
  heat: number; // 热度值，1-10
}

interface Category {
  name: string;
  shortcuts: Shortcut[];
}

const getHeatColor = (heat: number): string => {
  const hue = 240 - heat * 24; // 从蓝色 (240) 到红色 (0)
  return `hsl(${hue}, 80%, 60%)`;
};

const categoriesData: Category[] = [
  {
    name: "💻 我的一些快捷键",
    shortcuts: [
      { name: "删除整行", keys: ["Ctrl", "1"], heat: 9 },
      { name: "分支比较", keys: ["Ctrl", "2"], heat: 8 },
      { name: "块注释", keys: ["Alt", "Shift", "A"], heat: 7 },
      { name: "代码照片", keys: ["Ctrl", "3"], heat: 6 },
      { name: "快捷方式编辑", keys: ["Ctrl", "4"], heat: 5 },
      { name: "驼峰切换", keys: ["Ctrl", "5"], heat: 5 },
      { name: "打开swaager.json", keys: ["Ctrl", "6"], heat: 5 },
    ]
  },
  {
    name: "📋 文本编辑",
    shortcuts: [
      { name: "删除光标前字符", keys: ["Backspace"], heat: 10 },
      { name: "删除光标后字符", keys: ["Delete"], heat: 10 },
      { name: "删除前一个单词", keys: ["Ctrl", "Backspace"], heat: 9 },
      { name: "删除后一个单词", keys: ["Ctrl", "Delete"], heat: 8 },
      { name: "大小写转换", keys: ["Shift", "F3"], heat: 6 },
      { name: "插入换行符", keys: ["Shift", "Enter"], heat: 5 },
      { name: "插入制表符", keys: ["Ctrl", "Tab"], heat: 4 },
    ]
  },
  {
    name: "🚀 高效导航",
    shortcuts: [
      { name: "移动到具体行", keys: ["Ctrl", "G"], heat: 10 },
      { name: "移动到具体页面(全局)", keys: ["Ctrl", "P"], heat: 10 },
      { name: "移动到具体页面(打开的页签)", keys: ["Ctrl", "Tab"], heat: 10 },
      { name: "按单词移动光标", keys: ["Ctrl", "+", "←/→"], heat: 9 },
      { name: "光标移动到行首", keys: ["Home"], heat: 8 },
      { name: "光标移动到行尾", keys: ["End"], heat: 8 },
      { name: "查找上一项", keys: ["Shift", "Enter"], heat: 8 },
      { name: "查找下一项", keys: ["Enter"], heat: 8 },
      { name: "驼峰切换", keys: ["Ctrl", "5"], heat: 5 },
      { name: "光标移动到文档开头", keys: ["Ctrl", "Home"], heat: 7 },
      { name: "光标移动到文档结尾", keys: ["Ctrl", "End"], heat: 7 },
      { name: "按段落移动光标", keys: ["Ctrl", "+", "↑/↓"], heat: 6 },
      { name: "快速滚动", keys: ["Ctrl", "+", "鼠标滚轮"], heat: 5 },
    ]
  },
  {
    name: "💻 基础操作",
    shortcuts: [
      { name: "复制", keys: ["Ctrl", "C"], heat: 10 },
      { name: "粘贴", keys: ["Ctrl", "V"], heat: 10 },
      { name: "撤销", keys: ["Ctrl", "Z"], heat: 9 },
      { name: "选择文本", keys: ["Shift", "+", "方向键"], heat: 9 },
      { name: "全选", keys: ["Ctrl", "A"], heat: 8 },
      { name: "剪切", keys: ["Ctrl", "X"], heat: 8 },
      { name: "恢复", keys: ["Ctrl", "Y"], heat: 7 },
    ]
  },
];

const categories = computed(() => {
  return categoriesData.map(category => ({
    ...category,
    shortcuts: [...category.shortcuts].sort((a, b) => b.heat - a.heat)
  }));
});

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
    flex-grow: 1;
  }

  .shortcut-keys {
    display: flex;
    gap: 0.3rem;
    margin-left: 1rem;

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

  .shortcut-heat {
    margin-left: 1rem;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    min-width: 1.5rem;
    text-align: center;
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