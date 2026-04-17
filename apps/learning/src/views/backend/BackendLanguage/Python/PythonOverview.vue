<template>
  <div class="python-intro">
    <!-- 头部区域 -->
    <header class="intro-header">
      <div class="header-content">
        <div class="title-wrapper">
          <span class="python-icon">🐍</span>
          <h1>Python</h1>
        </div>
        <p class="subtitle">解释型 · 高级 · 通用 · 动态语义</p>
        <div class="header-divider"></div>
        <p class="description">
          一种易于学习、功能强大的编程语言。它拥有高效的高级数据结构，
          能够简单而有效地进行面向对象编程。
        </p>
      </div>
    </header>

    <!-- 网格卡片区域 -->
    <div class="cards-grid">
      <!-- 来历卡片：横跨两列 -->
      <section class="card history-card">
        <div class="card-header">
          <span class="card-icon">📜</span>
          <h2>来历 · History</h2>
        </div>
        <div class="card-body">
          <p>
            <strong>Python</strong> 由 <strong>Guido van Rossum</strong>
            于1989年圣诞节期间开始设计，作为ABC语言的继承与改进。
            1991年首次公开发布。其名称源自BBC喜剧《Monty Python's Flying Circus》，
            体现了作者希望编程能像看喜剧一样愉快的理念。
          </p>
          <p class="design-philosophy">
            设计哲学：<em>“优雅”、“明确”、“简单”</em> —— 代码可读性至上。
          </p>
        </div>
      </section>

      <!-- 特点卡片 -->
      <section class="card features-card">
        <div class="card-header">
          <span class="card-icon">✨</span>
          <h2>核心特点</h2>
        </div>
        <div class="card-body">
          <ul class="feature-list">
            <li><span class="bullet">▹</span> 简洁易读，语法清晰</li>
            <li><span class="bullet">▹</span> 解释型，动态类型</li>
            <li><span class="bullet">▹</span> 完全面向对象</li>
            <li><span class="bullet">▹</span> 丰富的标准库（“电池自带”）</li>
            <li><span class="bullet">▹</span> 跨平台，可移植性强</li>
            <li><span class="bullet">▹</span> 可扩展（C/C++/Rust）</li>
            <li><span class="bullet">▹</span> 开源，社区驱动</li>
          </ul>
        </div>
      </section>

      <!-- 使用场景卡片 -->
      <section class="card usecases-card">
        <div class="card-header">
          <span class="card-icon">🎯</span>
          <h2>使用场景</h2>
        </div>
        <div class="card-body">
          <div class="use-case-tags">
            <span class="tag">Web 开发</span>
            <span class="tag">数据科学</span>
            <span class="tag">人工智能</span>
            <span class="tag">机器学习</span>
            <span class="tag">自动化脚本</span>
            <span class="tag">网络爬虫</span>
            <span class="tag">科学计算</span>
            <span class="tag">量化交易</span>
            <span class="tag">教育入门</span>
            <span class="tag">DevOps</span>
          </div>
        </div>
      </section>

      <!-- 优缺点卡片 -->
      <section class="card proscons-card">
        <div class="card-header">
          <span class="card-icon">⚖️</span>
          <h2>优缺点</h2>
        </div>
        <div class="card-body pros-cons-container">
          <div class="pros">
            <h3>👍 优点</h3>
            <ul>
              <li>语法简洁，开发效率极高</li>
              <li>庞大的第三方库生态</li>
              <li>跨平台，社区活跃</li>
              <li>适合快速原型设计</li>
              <li>与C/Java等良好集成</li>
            </ul>
          </div>
          <div class="cons">
            <h3>👎 缺点</h3>
            <ul>
              <li>执行速度相对较慢</li>
              <li>GIL限制多核并行</li>
              <li>移动端开发较弱</li>
              <li>版本兼容性问题</li>
              <li>动态类型大型项目维护成本</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 框架卡片 -->
      <section class="card frameworks-card">
        <div class="card-header">
          <span class="card-icon">📦</span>
          <h2>主流框架</h2>
        </div>
        <div class="card-body">
          <div v-for="cat in frameworkCategories" :key="cat.category" class="framework-category">
            <h4>{{ cat.category }}</h4>
            <div class="framework-items">
              <span v-for="fw in cat.items" :key="fw" class="framework-tag">{{ fw }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 底部引用 -->
    <footer class="intro-footer">
      <p>Python 是数据科学、人工智能及快速开发的首选语言之一。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 定义框架分类的数据结构
interface FrameworkCategory {
  category: string;
  items: string[];
}

// 框架数据，体现TypeScript类型
const frameworkCategories: FrameworkCategory[] = [
  {
    category: 'Web 开发',
    items: ['Django', 'Flask', 'FastAPI', 'Tornado', 'Pyramid']
  },
  {
    category: '数据科学 & 数值计算',
    items: ['NumPy', 'Pandas', 'Matplotlib', 'SciPy', 'Jupyter']
  },
  {
    category: '机器学习 & 深度学习',
    items: ['scikit-learn', 'TensorFlow', 'PyTorch', 'Keras', 'XGBoost']
  },
  {
    category: '异步 & 网络',
    items: ['aiohttp', 'Sanic', 'Twisted', 'Requests']
  },
  {
    category: 'GUI & 其他',
    items: ['PyQt', 'Tkinter', 'Kivy', 'PyGame']
  }
];
</script>

<style lang="less" scoped>
// 定义Less变量，保持简约现代
@primary-blue: #306998; // Python蓝
@primary-yellow: #FFD43B; // Python黄
@text-dark: #1e293b;
@text-soft: #475569;
@bg-light: #f8fafc;
@card-bg: #ffffff;
@border-light: #e2e8f0;
@shadow-sm: 0 8px 20px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02);
@shadow-hover: 0 12px 28px rgba(0, 0, 0, 0.06), 0 4px 10px rgba(0, 0, 0, 0.03);
@border-radius-card: 20px;
@border-radius-tag: 30px;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.python-intro {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: @bg-light;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

// 头部样式
.intro-header {
  background: @card-bg;
  border-radius: @border-radius-card;
  padding: 2.5rem 2.8rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: @shadow-hover;
  }

  .header-content {
    .title-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 0.5rem;

      .python-icon {
        font-size: 3.2rem;
        line-height: 1;
      }

      h1 {
        font-size: 3.4rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: @text-dark;
        background: linear-gradient(135deg, @primary-blue 0%, #1e4a6b 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      font-weight: 500;
      color: @primary-blue;
      margin-bottom: 1rem;
    }

    .header-divider {
      width: 60px;
      height: 4px;
      background: @primary-yellow;
      border-radius: 4px;
      margin: 1.2rem 0 1.5rem 0;
    }

    .description {
      font-size: 1.15rem;
      line-height: 1.6;
      color: @text-soft;
      max-width: 85%;
    }
  }
}

// 卡片网格
.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;

  // 来历卡片占据两列
  .history-card {
    grid-column: span 2;
  }

  // 响应式：小屏幕所有卡片占满
  @media (max-width: 720px) {
    grid-template-columns: 1fr;

    .history-card {
      grid-column: span 1;
    }
  }
}

// 卡片通用样式
.card {
  background: @card-bg;
  border-radius: @border-radius-card;
  padding: 1.8rem 1.8rem 2rem 1.8rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: @shadow-hover;
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
    border-bottom: 1.5px dashed @border-light;
    padding-bottom: 0.9rem;

    .card-icon {
      font-size: 1.8rem;
      line-height: 1;
    }

    h2 {
      font-size: 1.6rem;
      font-weight: 600;
      color: @text-dark;
      letter-spacing: -0.01em;
    }
  }

  .card-body {
    flex: 1;
  }
}

// 来历卡片特定样式
.history-card {
  .card-body {
    p {
      font-size: 1.05rem;
      line-height: 1.7;
      color: @text-soft;
      margin-bottom: 1rem;
    }

    .design-philosophy {
      background: fade(@primary-yellow, 15%);
      padding: 0.9rem 1.2rem;
      border-radius: 14px;
      border-left: 5px solid @primary-yellow;
      font-style: normal;
      font-weight: 500;
      color: #2c3e50;
      margin-top: 0.5rem;
    }
  }
}

// 特点列表
.feature-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem 1.2rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    color: @text-soft;

    .bullet {
      color: @primary-blue;
      font-weight: 700;
      font-size: 1.2rem;
      line-height: 1;
    }
  }
}

// 使用场景标签云
.use-case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .tag {
    background: @bg-light;
    padding: 0.5rem 1.2rem;
    border-radius: @border-radius-tag;
    font-size: 0.95rem;
    font-weight: 500;
    color: @text-dark;
    border: 1px solid @border-light;
    transition: all 0.15s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);

    &:hover {
      background: @primary-blue;
      color: white;
      border-color: @primary-blue;
    }
  }
}

// 优缺点两列布局
.pros-cons-container {
  display: flex;
  gap: 2rem;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 1.5rem;
  }

  .pros,
  .cons {
    flex: 1;

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: @text-dark;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    ul {
      list-style: none;

      li {
        padding: 0.4rem 0;
        color: @text-soft;
        border-bottom: 1px dotted @border-light;
        display: flex;
        align-items: baseline;

        &::before {
          content: "•";
          color: @primary-blue;
          font-weight: bold;
          margin-right: 8px;
        }
      }
    }
  }

  .cons ul li::before {
    color: #b45353; // 柔和红色调
  }
}

// 框架卡片样式
.frameworks-card {
  .framework-category {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: @primary-blue;
      margin-bottom: 0.6rem;
      letter-spacing: 0.3px;
    }

    .framework-items {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .framework-tag {
      background: @bg-light;
      padding: 0.3rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      color: @text-dark;
      border: 1px solid @border-light;
      transition: background 0.15s;

      &:hover {
        background: @primary-yellow;
        border-color: transparent;
      }
    }
  }
}

// 底部footer
.intro-footer {
  text-align: center;
  margin-top: 0.5rem;

  p {
    color: #64748b;
    font-size: 0.95rem;
    font-style: italic;
    border-top: 1px solid @border-light;
    padding-top: 1.8rem;
    max-width: 600px;
    margin: 0 auto;
  }
}

// 微调移动端内边距
@media (max-width: 640px) {
  .python-intro {
    padding: 1.2rem 1rem;
  }

  .intro-header {
    padding: 1.8rem 1.5rem;

    .header-content {
      .title-wrapper h1 {
        font-size: 2.5rem;
      }

      .description {
        max-width: 100%;
      }
    }
  }

  .card {
    padding: 1.5rem 1.2rem;
  }
}
</style>
