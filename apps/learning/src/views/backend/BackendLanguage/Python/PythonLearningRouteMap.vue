<template>
  <div class="roadmap-container">
    <!-- 头部 -->
    <header class="roadmap-header">
      <div class="header-content">
        <div class="title-section">
          <span class="python-icon">🐍</span>
          <h1>Python 学习路线图</h1>
        </div>
        <p class="subtitle">从入门到全栈 · 系统化成长路径</p>
        <div class="divider"></div>
        <p class="description">
          跟随这条精心设计的学习路径，逐步掌握 Python 核心知识、主流框架与最佳实践，
          成为具备工程化思维的 Python 开发者。
        </p>
      </div>
    </header>

    <!-- 路线图阶段列表 -->
    <div class="roadmap-timeline">
      <div v-for="(phase, index) in phases" :key="phase.id" class="phase-card"
        :style="{ '--phase-color': phase.color }">
        <!-- 左侧序号/图标区域 -->
        <div class="phase-marker">
          <div class="marker-circle">
            <span class="phase-number">{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <div class="marker-line" v-if="index < phases.length - 1"></div>
        </div>

        <!-- 右侧内容区域 -->
        <div class="phase-content">
          <div class="phase-header">
            <h2>{{ phase.title }}</h2>
            <span class="phase-badge">{{ phase.level }}</span>
          </div>
          <p class="phase-description">{{ phase.description }}</p>
          <div class="skills-container">
            <span v-for="skill in phase.skills" :key="skill" class="skill-tag">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部提示 -->
    <footer class="roadmap-footer">
      <div class="footer-note">
        <span>✨ 持续学习 · 动手实践 · 构建项目 ✨</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 定义学习阶段数据结构
interface LearningPhase {
  id: number;
  level: string;          // 阶段级别标签 (如 "基础" "进阶")
  title: string;          // 阶段标题
  description: string;    // 阶段简述
  skills: string[];       // 核心技能点/关键词
  color: string;          // 主题色 (用于左侧圆环与装饰)
}

// 路线图数据 - 从基础到框架，循序渐进
const phases: LearningPhase[] = [
  {
    id: 1,
    level: '基础入门',
    title: 'Python 核心语法',
    description: '掌握 Python 基本语法、数据类型、流程控制与函数，建立编程思维。',
    skills: ['变量与数据类型', '条件/循环', '函数与模块', '文件 I/O', '异常处理'],
    color: '#306998' // Python 蓝
  },
  {
    id: 2,
    level: '进阶核心',
    title: '面向对象与高级特性',
    description: '深入理解面向对象编程、迭代器、生成器、装饰器、上下文管理器等核心机制。',
    skills: ['类与对象', '继承与多态', '魔法方法', '装饰器', '生成器', '上下文管理器'],
    color: '#3a7ca5'
  },
  {
    id: 3,
    level: '数据结构',
    title: '数据结构与算法基础',
    description: '熟悉内置数据结构的高效用法，并学习常用算法与复杂度分析。',
    skills: ['列表/元组/字典/集合', '栈/队列', '排序与搜索', '递归', '时间复杂度'],
    color: '#2b5f7a'
  },
  {
    id: 4,
    level: '工程化',
    title: '开发工具与工程实践',
    description: '掌握虚拟环境、包管理、版本控制、测试与调试，写出专业级代码。',
    skills: ['pip / venv / poetry', 'Git 版本控制', 'unittest / pytest', '日志记录', '调试技巧'],
    color: '#4a6fa5'
  },
  {
    id: 5,
    level: 'Web 框架',
    title: 'Web 开发与后端框架',
    description: '学习主流 Web 框架，构建 RESTful API 与全栈应用。',
    skills: ['Django', 'Flask', 'FastAPI', 'SQLAlchemy', 'Jinja2', 'REST API 设计'],
    color: '#1e5f6e'
  },
  {
    id: 6,
    level: '数据科学',
    title: '数据分析与可视化',
    description: '利用 Python 生态进行数据处理、分析与可视化展示。',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter Notebook', '数据清洗'],
    color: '#2e6b5e'
  },
  {
    id: 7,
    level: '机器学习',
    title: '机器学习与人工智能',
    description: '入门机器学习基础，掌握常用框架并动手实现模型。',
    skills: ['Scikit-learn', 'TensorFlow', 'PyTorch', '特征工程', '模型评估', '神经网络基础'],
    color: '#8f6b2e'
  },
  {
    id: 8,
    level: '架构与部署',
    title: '并发、异步与部署',
    description: '理解并发模型，掌握异步编程及容器化部署，让应用稳定上线。',
    skills: ['多线程/多进程', 'asyncio', 'Docker', 'CI/CD', 'Nginx', '云部署'],
    color: '#7a4b5c'
  }
];
</script>

<style lang="less" scoped>
// Less 变量 —— 简约 · 干净 · 现代
@bg-primary: #f9fafc;
@card-bg: #ffffff;
@text-dark: #1e293b;
@text-soft: #475569;
@text-light: #64748b;
@border-light: #e9eef3;
@shadow-card: 0 8px 20px rgba(0, 0, 0, 0.03), 0 2px 6px rgba(0, 0, 0, 0.02);
@shadow-hover: 0 14px 28px rgba(0, 0, 0, 0.05), 0 6px 12px rgba(0, 0, 0, 0.02);
@border-radius: 24px;
@transition: all 0.2s ease;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.roadmap-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: @bg-primary;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
}

// ----- 头部样式 -----
.roadmap-header {
  background: @card-bg;
  border-radius: @border-radius;
  padding: 2.5rem 2.5rem 2.2rem;
  box-shadow: @shadow-card;
  border: 1px solid @border-light;
  transition: @transition;

  &:hover {
    box-shadow: @shadow-hover;
  }

  .header-content {
    .title-section {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 0.5rem;

      .python-icon {
        font-size: 3.2rem;
        line-height: 1;
      }

      h1 {
        font-size: 2.8rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        background: linear-gradient(145deg, #306998 0%, #1e4a6b 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }

    .subtitle {
      font-size: 1.25rem;
      font-weight: 500;
      color: #306998;
      margin-bottom: 1rem;
    }

    .divider {
      width: 70px;
      height: 4px;
      background: #FFD43B;
      border-radius: 4px;
      margin: 1.2rem 0 1.5rem;
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: @text-soft;
      max-width: 85%;
    }
  }
}

// ----- 路线图时间线 (垂直布局) -----
.roadmap-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.phase-card {
  display: flex;
  gap: 1.5rem;
  background: @card-bg;
  border-radius: 22px;
  padding: 1.8rem 2rem 1.8rem 1.8rem;
  box-shadow: @shadow-card;
  border: 1px solid @border-light;
  transition: @transition;
  position: relative;

  &:hover {
    box-shadow: @shadow-hover;
    transform: translateY(-2px);
    border-color: #d0dde9;
  }

  // 左侧标记区域
  .phase-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 64px;
    flex-shrink: 0;

    .marker-circle {
      width: 56px;
      height: 56px;
      border-radius: 56px;
      background: white;
      border: 3px solid var(--phase-color);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
      transition: @transition;

      .phase-number {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--phase-color);
        letter-spacing: -0.5px;
      }
    }

    .marker-line {
      width: 3px;
      flex: 1;
      min-height: 30px;
      background: linear-gradient(to bottom, var(--phase-color) 0%, #d4dfe9 90%);
      margin-top: 8px;
      border-radius: 3px;
      opacity: 0.5;
    }
  }

  // 右侧内容
  .phase-content {
    flex: 1;
    padding-top: 4px;

    .phase-header {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 10px;

      h2 {
        font-size: 1.8rem;
        font-weight: 650;
        color: @text-dark;
        letter-spacing: -0.01em;
      }

      .phase-badge {
        background: #ecf3fa;
        padding: 0.25rem 1rem;
        border-radius: 30px;
        font-size: 0.85rem;
        font-weight: 600;
        color: #306998;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        border: 1px solid #d7e4f0;
      }
    }

    .phase-description {
      font-size: 1.05rem;
      line-height: 1.6;
      color: @text-soft;
      margin-bottom: 1.2rem;
    }

    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .skill-tag {
      background: #f1f5f9;
      padding: 0.45rem 1.2rem;
      border-radius: 40px;
      font-size: 0.9rem;
      font-weight: 500;
      color: @text-dark;
      border: 1px solid @border-light;
      transition: @transition;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.01);

      &:hover {
        background: var(--phase-color);
        color: white;
        border-color: transparent;
        transform: scale(1.02);
      }
    }
  }
}

// ----- 底部样式 -----
.roadmap-footer {
  margin-top: 0.8rem;
  text-align: center;

  .footer-note {
    background: @card-bg;
    display: inline-block;
    padding: 0.9rem 2.5rem;
    border-radius: 60px;
    box-shadow: @shadow-card;
    border: 1px solid @border-light;
    font-size: 1rem;
    color: @text-light;
    font-weight: 500;
    letter-spacing: 0.3px;

    span {
      background: linear-gradient(145deg, #306998, #4a6fa5);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-weight: 600;
    }
  }
}

// ----- 响应式微调 -----
@media (max-width: 640px) {
  .roadmap-container {
    padding: 1.2rem 1rem;
    gap: 1.5rem;
  }

  .roadmap-header {
    padding: 1.8rem 1.5rem;

    .header-content {
      .title-section h1 {
        font-size: 2rem;
      }

      .description {
        max-width: 100%;
        font-size: 1rem;
      }
    }
  }

  .phase-card {
    padding: 1.5rem 1.2rem;
    gap: 1rem;

    .phase-marker {
      width: 48px;

      .marker-circle {
        width: 48px;
        height: 48px;

        .phase-number {
          font-size: 1.3rem;
        }
      }
    }

    .phase-content {
      .phase-header h2 {
        font-size: 1.5rem;
      }

      .phase-description {
        font-size: 0.98rem;
      }

      .skill-tag {
        padding: 0.35rem 1rem;
        font-size: 0.85rem;
      }
    }
  }

  .roadmap-footer .footer-note {
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
  }
}

// 平板优化
@media (min-width: 641px) and (max-width: 900px) {
  .phase-card {
    padding: 1.8rem 1.8rem;
  }
}
</style>
