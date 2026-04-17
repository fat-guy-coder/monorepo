<template>
  <div class="syntax-roadmap">
    <!-- 页头 -->
    <header class="syntax-header">
      <div class="header-content">
        <div class="title-row">
          <span class="python-emoji">🐍</span>
          <h1>Python 基础语法</h1>
        </div>
        <p class="subtitle">从变量到循环 · 构建编程基石</p>
        <div class="header-divider"></div>
        <p class="intro-text">
          掌握这些核心语法元素，你将能够编写简单的 Python 程序。
          每一个概念都是后续深入学习的基础。
        </p>
      </div>
    </header>

    <!-- 语法知识点网格 -->
    <div class="topics-grid">
      <div
        v-for="topic in syntaxTopics"
        :key="topic.id"
        class="topic-card"
        :style="{ '--accent-color': topic.color }"
      >
        <div class="card-icon">{{ topic.icon }}</div>
        <h3 class="card-title">{{ topic.title }}</h3>
        <p class="card-description">{{ topic.description }}</p>
        <div class="keywords">
          <span v-for="kw in topic.keywords" :key="kw" class="keyword-badge">{{ kw }}</span>
        </div>
        <!-- 简洁的装饰线 -->
        <div class="card-accent-line"></div>
      </div>
    </div>

    <!-- 底部鼓励语 -->
    <footer class="syntax-footer">
      <p>✅ 每学完一个模块，试着写几行代码，动手是最好的老师。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 定义每个语法知识点的数据结构
interface SyntaxTopic {
  id: number;
  title: string;
  icon: string;          // emoji 图标
  description: string;   // 简短描述
  keywords: string[];    // 核心关键词
  color: string;         // 主题色 (用于卡片装饰)
}

// 基础语法路线数据 —— 从变量到循环，覆盖入门核心
const syntaxTopics: SyntaxTopic[] = [
  {
    id: 1,
    title: '变量与赋值',
    icon: '📦',
    description: '存储数据的容器，无需声明类型，直接赋值即可使用。',
    keywords: ['变量名', '赋值 =', '动态类型', 'id()'],
    color: '#306998' // Python 蓝
  },
  {
    id: 2,
    title: '基本数据类型',
    icon: '🔢',
    description: '数字、字符串、布尔值，构成程序的基础数据单元。',
    keywords: ['int', 'float', 'str', 'bool', 'type()'],
    color: '#3a7ca5'
  },
  {
    id: 3,
    title: '运算符',
    icon: '⚙️',
    description: '算术、比较、逻辑、赋值运算符，用于数据的运算与判断。',
    keywords: ['+ - * /', '// % **', '== !=', 'and or not'],
    color: '#4a6fa5'
  },
  {
    id: 4,
    title: '字符串操作',
    icon: '📝',
    description: '文本处理的核心，格式化、切片、常用方法。',
    keywords: ['索引', '切片 [::]', 'f-string', '.format()', 'len()'],
    color: '#2b5f7a'
  },
  {
    id: 5,
    title: '列表与元组',
    icon: '📋',
    description: '有序集合，列表可变，元组不可变。',
    keywords: ['list', 'tuple', 'append', '切片', '解包'],
    color: '#1e5f6e'
  },
  {
    id: 6,
    title: '字典与集合',
    icon: '📖',
    description: '键值对映射与唯一元素集合，高效查找。',
    keywords: ['dict', 'set', '键值对', '去重', 'get()'],
    color: '#2e6b5e'
  },
  {
    id: 7,
    title: '条件判断',
    icon: '🔀',
    description: '使用 if-elif-else 控制程序分支流向。',
    keywords: ['if', 'elif', 'else', '缩进', '条件表达式'],
    color: '#8f6b2e'
  },
  {
    id: 8,
    title: '循环结构',
    icon: '🔄',
    description: 'for 循环与 while 循环，让重复任务自动化。',
    keywords: ['for in', 'range()', 'while', 'break', 'continue'],
    color: '#7a4b5c'
  },
  {
    id: 9,
    title: '函数定义',
    icon: '🧩',
    description: '封装可复用的代码块，提高代码组织性。',
    keywords: ['def', '参数', 'return', '默认参数', '作用域'],
    color: '#5e4b7a'
  },
  {
    id: 10,
    title: '输入与输出',
    icon: '⌨️',
    description: '与用户交互，从控制台读取输入，打印输出。',
    keywords: ['input()', 'print()', '文件读写', '格式化输出'],
    color: '#3f6e5e'
  }
];
</script>

<style lang="less" scoped>
// ========== Less 变量 ==========
@bg-page: #f8fafc;
@card-bg: #ffffff;
@text-primary: #1e293b;
@text-secondary: #475569;
@text-light: #64748b;
@border-light: #e2e8f0;
@shadow-card: 0 6px 14px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.02);
@shadow-hover: 0 12px 24px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.02);
@border-radius-card: 22px;
@transition-default: all 0.2s ease;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.syntax-roadmap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;
  background: @bg-page;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

// ----- 头部样式 -----
.syntax-header {
  background: @card-bg;
  border-radius: 28px;
  padding: 2.2rem 2.5rem;
  box-shadow: @shadow-card;
  border: 1px solid @border-light;

  .header-content {
    .title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 0.5rem;

      .python-emoji {
        font-size: 3rem;
        line-height: 1;
      }

      h1 {
        font-size: 2.8rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        background: linear-gradient(135deg, #306998 0%, #1e4a6b 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }

    .subtitle {
      font-size: 1.3rem;
      font-weight: 500;
      color: #306998;
      margin-bottom: 1rem;
    }

    .header-divider {
      width: 70px;
      height: 4px;
      background: #FFD43B;
      border-radius: 4px;
      margin: 1.2rem 0 1.5rem;
    }

    .intro-text {
      font-size: 1.1rem;
      line-height: 1.6;
      color: @text-secondary;
      max-width: 85%;
    }
  }
}

// ----- 网格布局：响应式卡片网格 -----
.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.8rem;
}

// ----- 卡片样式 -----
.topic-card {
  background: @card-bg;
  border-radius: @border-radius-card;
  padding: 1.8rem 1.6rem 1.6rem;
  box-shadow: @shadow-card;
  border: 1px solid @border-light;
  transition: @transition-default;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: @shadow-hover;
    border-color: #cbd5e1;
  }

  .card-icon {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 650;
    letter-spacing: -0.01em;
    color: @text-primary;
    margin-bottom: 0.6rem;
  }

  .card-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: @text-secondary;
    margin-bottom: 1.2rem;
    flex: 1;
  }

  .keywords {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 0.2rem;

    .keyword-badge {
      background: #f1f5f9;
      padding: 0.25rem 0.9rem;
      border-radius: 30px;
      font-size: 0.8rem;
      font-weight: 500;
      color: @text-primary;
      border: 1px solid @border-light;
      transition: @transition-default;

      &:hover {
        background: var(--accent-color, #306998);
        color: white;
        border-color: transparent;
      }
    }
  }

  // 装饰性色条
  .card-accent-line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: var(--accent-color, #306998);
    opacity: 0.7;
    border-radius: 0 0 @border-radius-card @border-radius-card;
    transform: scaleX(0.3);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover .card-accent-line {
    transform: scaleX(1);
  }
}

// ----- 底部样式 -----
.syntax-footer {
  margin-top: 1rem;
  text-align: center;

  p {
    background: @card-bg;
    display: inline-block;
    padding: 0.9rem 2.2rem;
    border-radius: 50px;
    box-shadow: @shadow-card;
    border: 1px solid @border-light;
    font-size: 1rem;
    font-weight: 500;
    color: @text-light;

    &::before {
      content: "💡 ";
      font-size: 1.1rem;
    }
  }
}

// ----- 响应式调整 -----
@media (max-width: 640px) {
  .syntax-roadmap {
    padding: 1.2rem 1rem;
    gap: 1.8rem;
  }

  .syntax-header {
    padding: 1.8rem 1.5rem;

    .header-content {
      .title-row h1 {
        font-size: 2.2rem;
      }
      .intro-text {
        max-width: 100%;
        font-size: 1rem;
      }
    }
  }

  .topics-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .topic-card {
    padding: 1.5rem 1.4rem;

    .card-title {
      font-size: 1.4rem;
    }
  }

  .syntax-footer p {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
  }
}

// 平板略微调整间距
@media (min-width: 641px) and (max-width: 900px) {
  .topics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>