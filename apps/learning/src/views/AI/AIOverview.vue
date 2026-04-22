<template>
  <div class="ai-learning-roadmap">
    <!-- Hero 区域 -->
    <div class="hero">
      <h1 class="hero-title">✨ AI 学习路线图</h1>
      <p class="hero-subtitle">
        从基础到前沿，系统掌握人工智能核心思想与技术栈
      </p>
    </div>

    <!-- AI 类型介绍 -->
    <section class="section">
      <div class="section-header">
        <h2>🧠 AI 的主要类型</h2>
        <p>根据能力层级与应用范畴，人工智能可分为以下几类</p>
      </div>
      <div class="card-grid">
        <div v-for="type in aiTypes" :key="type.name" class="info-card">
          <div class="card-icon">{{ type.icon }}</div>
          <h3>{{ type.name }}</h3>
          <p>{{ type.description }}</p>
          <div class="card-tags">
            <span v-for="tag in type.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心设计思想 -->
    <section class="section">
      <div class="section-header">
        <h2>⚙️ 经典模型设计思想</h2>
        <p>现代AI突破背后的核心原理与架构哲学</p>
      </div>
      <div class="card-grid design-grid">
        <div v-for="idea in modelIdeas" :key="idea.name" class="design-card">
          <div class="design-icon">{{ idea.icon }}</div>
          <div class="design-content">
            <h3>{{ idea.name }}</h3>
            <p>{{ idea.description }}</p>
            <div class="insight">{{ idea.insight }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 学习路线图 (Roadmap) -->
    <section class="section">
      <div class="section-header">
        <h2>🗺️ 系统性学习路线</h2>
        <p>由浅入深，构建完整AI知识体系</p>
      </div>
      <div class="roadmap-timeline">
        <div v-for="(stage, idx) in roadmapStages" :key="stage.id" class="timeline-node">
          <div class="timeline-marker">
            <span class="step-number">{{ idx + 1 }}</span>
            <div v-if="idx !== roadmapStages.length - 1" class="timeline-line"></div>
          </div>
          <div class="timeline-card">
            <div class="stage-header">
              <h3>{{ stage.title }}</h3>
              <span class="stage-duration">{{ stage.duration }}</span>
            </div>
            <p class="stage-description">{{ stage.description }}</p>
            <div class="topics">
              <span v-for="topic in stage.topics" :key="topic" class="topic-badge">
                {{ topic }}
              </span>
            </div>
            <div class="milestone" v-if="stage.milestone">
              🎯 {{ stage.milestone }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部扩展提示 -->
    <div class="footer-note">
      💡 点击路线图中的任意阶段，后续可生成对应的详细菜单结构，开启深度学习之旅
    </div>
  </div>
</template>

<script setup lang="ts">
// ----- 类型定义 -----
interface AiType {
  name: string;
  icon: string;
  description: string;
  tags: string[];
}

interface ModelIdea {
  name: string;
  icon: string;
  description: string;
  insight: string;
}

interface RoadmapStage {
  id: string;
  title: string;
  duration: string;
  description: string;
  topics: string[];
  milestone: string;
}

// ----- AI 类型数据 -----
const aiTypes: AiType[] = [
  {
    name: '弱人工智能 (ANI)',
    icon: '🤖',
    description: '专注于特定任务的AI，如图像识别、语音助手。目前所有商用AI均属此类，不具备通用智能。',
    tags: ['专用型', '数据驱动', '模式识别']
  },
  {
    name: '强人工智能 (AGI)',
    icon: '🧠',
    description: '具备人类水平的通用智能，能理解、学习并执行任何智力任务。目前仍处于理论探索阶段。',
    tags: ['通用智能', '推理能力', '意识萌芽']
  },
  {
    name: '超人工智能 (ASI)',
    icon: '🌌',
    description: '超越人类智慧的AI，在创造力、决策、社交等所有领域远胜人类。属于未来学概念。',
    tags: ['超智能', '技术奇点', '伦理挑战']
  },
  {
    name: '机器学习范式',
    icon: '📊',
    description: '监督/无监督/强化学习，构成现代AI的三大训练范式，适应不同数据与场景。',
    tags: ['监督学习', '无监督学习', '强化学习']
  }
];

// ----- 设计思想数据 -----
const modelIdeas: ModelIdea[] = [
  {
    name: 'Transformer',
    icon: '📖',
    description: '自注意力机制 + 位置编码 + 前馈网络，摒弃循环结构，实现长距离依赖建模与并行计算。',
    insight: '核心思想：Attention Is All You Need，通过查询-键-值动态聚合全局信息。'
  },
  {
    name: '卷积神经网络 (CNN)',
    icon: '👁️',
    description: '局部连接、权值共享、池化下采样，有效提取图像空间层级特征。',
    insight: '归纳偏置：平移不变性与局部组合性，极大减少参数数量。'
  },
  {
    name: '循环神经网络 (RNN/LSTM)',
    icon: '🔄',
    description: '隐藏状态循环传递，处理序列数据；LSTM引入门控机制缓解长期依赖问题。',
    insight: '时序动态性：每一步依赖前序状态，适合文本、时间序列。'
  },
  {
    name: '扩散模型',
    icon: '🌫️',
    description: '通过逐步加噪与去噪过程，学习数据分布，生成高质量图像（如DALL·E, Stable Diffusion）。',
    insight: '马尔可夫链 + 噪声预测，逆转热力学扩散过程。'
  },
  {
    name: '生成对抗网络 (GAN)',
    icon: '⚖️',
    description: '生成器与判别器博弈，相互提升至真实数据分布，实现逼真生成。',
    insight: '零和游戏思想，纳什均衡点对应完美生成器。'
  }
];

// ----- 路线图阶段数据（可供后续菜单结构生成） -----
const roadmapStages: RoadmapStage[] = [
  {
    id: 'stage1',
    title: '第一阶段：数学与编程基础',
    duration: '6-8 周',
    description: '扎实的数学功底与工程能力是AI研究的基石。',
    topics: ['线性代数（矩阵/特征值）', '概率与统计（贝叶斯/分布）', '微积分（梯度/优化）', 'Python编程', '数据结构与算法', 'Git & 开发环境'],
    milestone: '能独立实现KNN/线性回归并理解数学推导'
  },
  {
    id: 'stage2',
    title: '第二阶段：机器学习核心',
    duration: '8-10 周',
    description: '掌握经典机器学习算法与模型评估方法论。',
    topics: ['监督学习（回归/分类）', '无监督学习（聚类/PCA）', '决策树/随机森林', 'SVM与核方法', '模型评估与调参', '特征工程'],
    milestone: '完成Kaggle入门竞赛，提交有效预测'
  },
  {
    id: 'stage3',
    title: '第三阶段：深度学习与框架',
    duration: '10-12 周',
    description: '神经网络原理与主流框架实战。',
    topics: ['前馈网络/反向传播', '激活函数/正则化', 'CNN架构 (ResNet, MobileNet)', 'RNN/LSTM/GRU', 'PyTorch/TensorFlow', '训练技巧与调优'],
    milestone: '搭建CNN实现图像分类，RNN完成文本情感分析'
  },
  {
    id: 'stage4',
    title: '第四阶段：专业领域深入',
    duration: '12-14 周',
    description: '根据兴趣选择CV/NLP/强化学习方向深耕。',
    topics: ['计算机视觉 (检测/分割)', '自然语言处理 (Word2Vec/BERT)', '注意力机制/Transformer', '强化学习 (Q-learning/PPO)', '图神经网络', '生成模型初探'],
    milestone: '复现顶会论文核心模型，理解架构设计'
  },
  {
    id: 'stage5',
    title: '第五阶段：大模型与AIGC',
    duration: '8-10 周',
    description: '前沿大模型原理、微调与部署。',
    topics: ['GPT/LLaMA架构', 'RLHF (人类反馈强化学习)', 'LoRA/P-tuning微调', '扩散模型深入', 'LangChain与AI Agent', '模型量化与推理优化'],
    milestone: '本地部署开源大模型，开发基于LLM的应用'
  },
  {
    id: 'stage6',
    title: '第六阶段：MLOps与AI工程',
    duration: '持续进阶',
    description: '生产环境中的模型生命周期与系统设计。',
    topics: ['模型部署 (ONNX/TensorRT)', 'Docker/Kubernetes', 'MLflow与实验追踪', '数据漂移与监控', 'AI伦理与安全', '前沿论文阅读'],
    milestone: '构建完整的AI服务并持续迭代'
  }
];
</script>

<style lang="less" scoped>
// 颜色变量
@bg-body: #f8fafc;
@card-white: #ffffff;
@primary: #3b82f6;
@primary-dark: #2563eb;
@text-main: #0f172a;
@text-secondary: #475569;
@text-muted: #64748b;
@border-light: #e2e8f0;
@shadow-sm: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
@shadow-md: 0 20px 25px -12px rgba(0, 0, 0, 0.08);
@radius-card: 1.25rem;
@radius-badge: 2rem;

.ai-learning-roadmap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background-color: @bg-body;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: @text-main;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0 1rem;

  .hero-title {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #1e293b, @primary);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }

  .hero-subtitle {
    font-size: 1.125rem;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto;
  }
}

.section {
  margin-bottom: 3.5rem;

  .section-header {
    margin-bottom: 1.5rem;

    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      display: inline-block;
      border-left: 4px solid @primary;
      padding-left: 1rem;
    }

    p {
      color: @text-muted;
      font-size: 0.95rem;
      margin-top: 0.25rem;
    }
  }
}

// 卡片网格通用
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: @card-white;
  border-radius: @radius-card;
  padding: 1.5rem;
  box-shadow: @shadow-sm;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid @border-light;

  &:hover {
    transform: translateY(-4px);
    box-shadow: @shadow-md;
  }

  .card-icon {
    font-size: 2.25rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  p {
    color: @text-secondary;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    span {
      background: #f1f5f9;
      padding: 0.25rem 0.75rem;
      border-radius: @radius-badge;
      font-size: 0.7rem;
      font-weight: 500;
      color: @primary-dark;
    }
  }
}

// 设计思想卡片 (左右布局)
.design-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.design-card {
  display: flex;
  gap: 1.25rem;
  background: @card-white;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: all 0.2s;

  &:hover {
    background: #fefefe;
    border-color: @primary;
  }

  .design-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .design-content {
    flex: 1;

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    p {
      color: @text-secondary;
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 0.5rem;
    }

    .insight {
      font-size: 0.8rem;
      color: @primary-dark;
      background: #eff6ff;
      display: inline-block;
      padding: 0.2rem 0.7rem;
      border-radius: 2rem;
      font-weight: 500;
    }
  }
}

// 路线图时间线样式
.roadmap-timeline {
  position: relative;
  padding-left: 1rem;
}

.timeline-node {
  display: flex;
  gap: 1.5rem;
  position: relative;
  margin-bottom: 1.5rem;

  .timeline-marker {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40px;
    flex-shrink: 0;

    .step-number {
      width: 32px;
      height: 32px;
      background: @primary;
      color: white;
      font-weight: 700;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
    }

    .timeline-line {
      position: absolute;
      top: 36px;
      width: 2px;
      background: linear-gradient(to bottom, #cbd5e1, #e2e8f0);
      height: calc(100% + 1rem);
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:last-child .timeline-line {
    display: none;
  }

  .timeline-card {
    flex: 1;
    background: @card-white;
    border-radius: 1rem;
    padding: 1.25rem 1.5rem;
    box-shadow: @shadow-sm;
    border: 1px solid @border-light;
    transition: all 0.2s;

    &:hover {
      box-shadow: @shadow-md;
      border-color: @primary;
    }

    .stage-header {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 0.5rem;

      h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: @text-main;
      }

      .stage-duration {
        font-size: 0.75rem;
        background: #eef2ff;
        color: @primary-dark;
        padding: 0.2rem 0.8rem;
        border-radius: 2rem;
        font-weight: 500;
      }
    }

    .stage-description {
      color: @text-secondary;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      border-left: 2px solid @border-light;
      padding-left: 0.75rem;
    }

    .topics {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;

      .topic-badge {
        background: #f8fafc;
        padding: 0.3rem 0.9rem;
        border-radius: 2rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: @text-secondary;
        border: 1px solid @border-light;
        transition: all 0.1s;

        &:hover {
          background: @primary;
          color: white;
          border-color: @primary;
        }
      }
    }

    .milestone {
      font-size: 0.85rem;
      background: #fef9e3;
      padding: 0.4rem 0.8rem;
      border-radius: 0.75rem;
      color: #b45309;
      font-weight: 500;
      display: inline-block;
    }
  }
}

.footer-note {
  margin-top: 3rem;
  text-align: center;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 2rem;
  font-size: 0.85rem;
  color: @text-muted;
  border: 1px solid @border-light;
}

// 响应式
@media (max-width: 768px) {
  .ai-learning-roadmap {
    padding: 1rem;
  }

  .hero .hero-title {
    font-size: 1.8rem;
  }

  .timeline-node {
    flex-direction: column;
    gap: 0.5rem;

    .timeline-marker {
      flex-direction: row;
      width: auto;
      margin-left: 1rem;

      .timeline-line {
        display: none;
      }
    }
  }

  .design-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }
}
</style>
