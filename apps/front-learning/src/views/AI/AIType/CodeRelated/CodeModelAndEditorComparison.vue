<template>
  <div class="ai-model-comparison">
    <!-- 头部区域 -->
    <header>
      <div class="header-content">
        <h1><i class="fas fa-code"></i> 2025年主流代码AI模型对比分析</h1>
        <p class="subtitle">深入比较GPT-5、Claude、Gemini等顶级AI编程助手的性能特点</p>
      </div>
    </header>

    <!-- 模型概览卡片 -->
    <div class="model-cards">
      <div
        v-for="model in models"
        :key="model.id"
        class="model-card"
        :class="model.id"
        @click="selectedModel = model.id"
      >
        <div class="model-header">
          <div class="model-icon">
            <component :is="model.icon" />
          </div>
          <h2>{{ model.name }}</h2>
          <div class="model-tag">{{ model.tag }}</div>
        </div>
        <div class="model-stats">
          <div class="stat">
            <div class="stat-label">性能得分</div>
            <div class="stat-value">{{ model.scores.performance }}%</div>
            <div class="stat-bar">
              <div class="stat-fill" :style="{ width: `${model.scores.performance}%` }"></div>
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">上下文长度</div>
            <div class="stat-value">{{ model.context.toLocaleString() }} tokens</div>
            <div class="stat-bar">
              <div
                class="stat-fill"
                :style="{ width: `${(model.context / 1000000) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
        <div class="model-highlights">
          <div v-for="highlight in model.highlights" :key="highlight" class="highlight">
            <i class="fas fa-check-circle"></i> {{ highlight }}
          </div>
        </div>
      </div>
    </div>

    <!-- 详细对比区域 -->
    <div class="comparison-section">
      <div class="section-header">
        <h2><i class="fas fa-balance-scale"></i> 核心能力详细对比</h2>
        <div class="filter-tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- 对比表格 -->
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>对比维度</th>
              <th v-for="model in models" :key="model.id">
                <div class="model-header">
                  <component :is="model.icon" />
                  <span>{{ model.shortName }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="dimension in dimensions[activeTab as keyof typeof dimensions]"
              :key="dimension.name"
            >
              <td>{{ dimension.name }}</td>
              <td v-for="model in models" :key="model.id">
                <div class="rating">
                  <div class="rating-value">
                    {{ dimension.values[model.id as keyof typeof dimension.values] }}
                  </div>
                  <div class="rating-bar">
                    <div
                      class="rating-fill"
                      :style="{
                        width: `${dimension.ratings[model.id as keyof typeof dimension.ratings]}%`,
                      }"
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 模型详情区域 -->
    <div class="model-details">
      <h2 v-if="selectedModel">
        <i :class="models.find((m) => m.id === selectedModel)?.icon"></i>
        {{ models.find((m) => m.id === selectedModel)?.name }} 详细分析
      </h2>
      <div v-if="selectedModel" class="detail-content">
        <div class="detail-section">
          <h3><i class="fas fa-tachometer-alt"></i> 性能特点</h3>
          <p>{{ modelDetails[selectedModel as keyof typeof modelDetails].performance }}</p>
          <div class="specs">
            <div class="spec">
              <div class="spec-label">架构</div>
              <div class="spec-value">
                {{ modelDetails[selectedModel as keyof typeof modelDetails].architecture }}
              </div>
            </div>
            <div class="spec">
              <div class="spec-label">参数规模</div>
              <div class="spec-value">
                {{ modelDetails[selectedModel as keyof typeof modelDetails].params }}
              </div>
            </div>
            <div class="spec">
              <div class="spec-label">训练数据</div>
              <div class="spec-value">
                {{ modelDetails[selectedModel as keyof typeof modelDetails].trainingData }}
              </div>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h3><i class="fas fa-thumbs-up"></i> 优势场景</h3>
          <ul>
            <li
              v-for="strength in modelDetails[selectedModel as keyof typeof modelDetails].strengths"
              :key="strength"
            >
              <i class="fas fa-check"></i> {{ strength }}
            </li>
          </ul>
        </div>

        <div class="detail-section">
          <h3><i class="fas fa-exclamation-triangle"></i> 使用限制</h3>
          <ul>
            <li
              v-for="limitation in modelDetails[selectedModel as keyof typeof modelDetails]
                .limitations"
              :key="limitation"
            >
              <i class="fas fa-exclamation-circle"></i> {{ limitation }}
            </li>
          </ul>
        </div>

        <div class="detail-section">
          <h3><i class="fas fa-dollar-sign"></i> 定价与接入</h3>
          <p>{{ modelDetails[selectedModel as keyof typeof modelDetails].pricing }}</p>
          <div class="integrations">
            <div
              v-for="integration in modelDetails[selectedModel as keyof typeof modelDetails]
                .integrations"
              :key="integration"
              class="integration"
            >
              <i class="fas fa-plug"></i> {{ integration }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="select-prompt">
        <i class="fas fa-mouse-pointer"></i> 点击上方模型卡片查看详细分析
      </div>
    </div>

    <!-- 结论区域 -->
    <div class="conclusion-section">
      <h2><i class="fas fa-clipboard-check"></i> 总结与建议</h2>
      <div class="recommendations">
        <div class="recommendation">
          <div class="rec-icon">
            <i class="fas fa-bolt"></i>
          </div>
          <h3>快速应用开发</h3>
          <p>GPT-5的Vibe Coding能力能快速生成完整应用，适合原型开发:cite[6]</p>
        </div>
        <div class="recommendation">
          <div class="rec-icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <h3>企业级代码维护</h3>
          <p>Claude 4.1在代码精准度和安全性上表现最佳，适合关键系统:cite[9]</p>
        </div>
        <div class="recommendation">
          <div class="rec-icon">
            <i class="fas fa-wallet"></i>
          </div>
          <h3>预算有限场景</h3>
          <p>Qwen3-Coder提供开源免费方案，性能接近顶级模型:cite[3]:cite[8]</p>
        </div>
        <div class="recommendation">
          <div class="rec-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3>实时协作编程</h3>
          <p>Grok 4的多智能体架构适合需要实时协作的场景:cite[2]</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AI_MODEL_ICONS } from './aimodel'

const { GPTIcon, ClaudeIcon, GeminiIcon, GrokIcon, QwenIcon } = AI_MODEL_ICONS

// 模型数据
const models = ref([
  {
    id: 'gpt5',
    name: 'GPT-5',
    shortName: 'GPT-5',
    tag: '全能选手',
    icon: GPTIcon({ color: 'red' }),
    scores: {
      performance: 74.9,
      understanding: 94.6,
      speed: 92,
      accuracy: 96.7,
      popularity: 88,
    },
    context: 400000,
    highlights: [
      'SWE-bench 74.9%得分',
      '支持40万token上下文',
      'Vibe Coding快速原型开发',
      '工具调用96.7%准确率',
    ],
  },
  {
    id: 'claude',
    name: 'Claude 4.1 Opus',
    shortName: 'Claude',
    tag: '精准修复',
    icon: ClaudeIcon,
    scores: {
      performance: 74.5,
      understanding: 80.9,
      speed: 85,
      accuracy: 98.8,
      popularity: 82,
    },
    context: 200000,
    highlights: ['企业级代码维护', '多文件重构专家', '无害响应率98.76%', '精准代码修复'],
  },
  {
    id: 'grok',
    name: 'Grok 4 Heavy',
    shortName: 'Grok',
    tag: '实时协作',
    icon: GrokIcon,
    scores: {
      performance: 50,
      understanding: 88.4,
      speed: 90,
      accuracy: 85,
      popularity: 78,
    },
    context: 256000,
    highlights: ['多智能体协作架构', '实时网络搜索集成', '复杂逻辑推理专家', 'AGI测试领先'],
  },
  {
    id: 'gemini',
    name: 'Gemini 2.5 Pro',
    shortName: 'Gemini',
    tag: '学术研究',
    icon: GeminiIcon,
    scores: {
      performance: 86.4,
      understanding: 86.4,
      speed: 88,
      accuracy: 89,
      popularity: 80,
    },
    context: 1000000,
    highlights: ['100万token上下文', 'GPQA Diamond 86.4%', '学术研究首选', '多模态处理强大'],
  },
  {
    id: 'qwen',
    name: 'Qwen3-Coder',
    shortName: 'Qwen',
    tag: '开源之星',
    icon: QwenIcon,
    scores: {
      performance: 69.6,
      understanding: 75,
      speed: 83,
      accuracy: 87,
      popularity: 85,
    },
    context: 1000000,
    highlights: ['开源免费模型', '百万token上下文', 'MoE专家混合架构', '多步骤任务处理'],
  },
])

// 模型详细信息
const modelDetails = ref({
  gpt5: {
    performance:
      '在SWE-bench测试中获得74.9%的得分，是目前编程能力最强的AI模型。支持高达40万token的上下文窗口，能处理复杂代码库:cite[1]:cite[4]。',
    architecture: '统一智能路由系统',
    params: '未公开，估计1.8万亿',
    trainingData: '多语言代码库+技术文档',
    strengths: [
      '快速原型开发(Vibe Coding)',
      '复杂工具链调用(96.7%准确率)',
      '数学推理(AIME 2025 94.6%)',
      '企业级集成(Copilot生态)',
    ],
    limitations: ['大规模重构可能引入不必要变更', '企业级定价较高', '需要严格测试生成的代码'],
    pricing:
      '输入$1.25/百万token，输出$10/百万token。提供轻量级GPT-5 Mini($0.25/M)和Nano($0.05/M)版本:cite[4]。',
    integrations: ['Cursor IDE', 'Microsoft Copilot', 'GitHub Copilot', 'Azure AI Foundry'],
  },
  claude: {
    performance:
      '在SWE-bench测试中获得74.5%的得分，专注于精准代码修复和多文件重构。提供"手术式"代码修改，最小化不必要变更:cite[9]。',
    architecture: '安全优先架构',
    params: '未公开，估计超过万亿',
    trainingData: '高质量代码库+安全数据集',
    strengths: [
      '精准代码修复(最小改动)',
      '企业级安全合规(ASL-3标准)',
      '多文件重构能力',
      '终端集成(Claude Code CLI)',
    ],
    limitations: ['创意性解决方案较少', '输出成本较高($75/百万token)', '在纯逻辑推理上稍弱'],
    pricing: '输入$15/百万token，输出$75/百万token。提供团队和企业级订阅:cite[9]。',
    integrations: ['VS Code插件', 'JetBrains IDE集成', 'Amazon Bedrock', 'Google Vertex AI'],
  },
  grok: {
    performance:
      "在Humanity's Last Exam上达到50%的准确率，采用多智能体架构，多个AI代理协作解决复杂问题，适合研究场景:cite[2]:cite[6]。",
    architecture: '多智能体协作系统',
    params: '未公开，估计1.5万亿',
    trainingData: 'X平台实时数据+学术资源',
    strengths: ['实时网络搜索集成', '多智能体并行推理', '复杂科学问题解决', '动态任务处理'],
    limitations: ['编码能力相对较弱', '安全性争议较多', '上下文窗口较小(256K)'],
    pricing: '约$3/百万token，提供SuperGrok Heavy订阅($300/月):cite[2]。',
    integrations: ['X平台集成', '研究协作工具', 'Jupyter Notebook', '学术数据库'],
  },
  gemini: {
    performance:
      '在GPQA Diamond测试中获得86.4%的得分，支持100万token上下文，使用YaRN技术扩展上下文窗口:cite[3]:cite[9]。',
    architecture: '多模态混合架构',
    params: '未公开，估计1.2万亿',
    trainingData: '学术论文+技术文档+代码库',
    strengths: ['学术研究支持', '超长上下文处理(100万token)', '多模态理解能力', '复杂科学问题解答'],
    limitations: ['实际编码表现不如GPT-5', '企业级功能较少', '工具集成不够成熟'],
    pricing: '未公开详细定价，提供企业级订阅',
    integrations: ['Google Colab', 'Vertex AI平台', 'Google Workspace', '学术研究工具'],
  },
  qwen: {
    performance:
      '在500轮测试中达到69.6%的SWE-bench得分，采用MoE架构，4050亿参数中每次激活350亿参数:cite[3]:cite[8]。',
    architecture: 'MoE专家混合架构',
    params: '405B总参数/35B激活参数',
    trainingData: '70%代码的7.5T数据集',
    strengths: ['完全开源免费', '支持百万token上下文', '多工具调用能力', '复杂任务处理'],
    limitations: ['绝对性能略低于顶级模型', '英文资源支持较弱', '企业级支持有限'],
    pricing: '完全免费开源，阿里云API提供商业支持',
    integrations: ['魔搭社区', 'Hugging Face', '通义灵码', '阿里云百炼'],
  },
})

// 对比维度和评分
const dimensions = ref({
  核心能力: [
    {
      name: '编程能力(SWE-bench)',
      values: { gpt5: '74.9%', claude: '74.5%', grok: '50%', gemini: 'N/A', qwen: '69.6%' },
      ratings: { gpt5: 95, claude: 94, grok: 65, gemini: 70, qwen: 88 },
    },
    {
      name: '上下文长度',
      values: { gpt5: '400K', claude: '200K', grok: '256K', gemini: '1M', qwen: '1M' },
      ratings: { gpt5: 90, claude: 70, grok: 75, gemini: 100, qwen: 100 },
    },
    {
      name: '代码理解力',
      values: {
        gpt5: '96/100',
        claude: '98/100',
        grok: '85/100',
        gemini: '92/100',
        qwen: '90/100',
      },
      ratings: { gpt5: 96, claude: 98, grok: 85, gemini: 92, qwen: 90 },
    },
    {
      name: '生成速度',
      values: { gpt5: '极快', claude: '快', grok: '极快', gemini: '中', qwen: '快' },
      ratings: { gpt5: 95, claude: 85, grok: 90, gemini: 75, qwen: 80 },
    },
  ],
  质量与可靠性: [
    {
      name: '代码准确率',
      values: { gpt5: '96.7%', claude: '98.8%', grok: '85%', gemini: '89%', qwen: '87%' },
      ratings: { gpt5: 97, claude: 99, grok: 85, gemini: 89, qwen: 87 },
    },
    {
      name: '幻觉率',
      values: { gpt5: '4.8%', claude: '1.6%', grok: '15%', gemini: '8%', qwen: '10%' },
      ratings: { gpt5: 95, claude: 98, grok: 85, gemini: 92, qwen: 90 },
    },
    {
      name: '多文件重构',
      values: { gpt5: '优秀', claude: '卓越', grok: '良好', gemini: '良好', qwen: '优秀' },
      ratings: { gpt5: 90, claude: 98, grok: 80, gemini: 82, qwen: 88 },
    },
    {
      name: '安全性',
      values: { gpt5: '高', claude: '极高', grok: '中', gemini: '高', qwen: '高' },
      ratings: { gpt5: 90, claude: 99, grok: 75, gemini: 88, qwen: 85 },
    },
  ],
  开发者体验: [
    {
      name: 'IDE集成',
      values: { gpt5: '优秀', claude: '卓越', grok: '良好', gemini: '中等', qwen: '良好' },
      ratings: { gpt5: 90, claude: 98, grok: 80, gemini: 70, qwen: 85 },
    },
    {
      name: 'CLI工具',
      values: { gpt5: '优秀', claude: '优秀', grok: '中等', gemini: '有限', qwen: '良好' },
      ratings: { gpt5: 92, claude: 95, grok: 75, gemini: 60, qwen: 80 },
    },
    {
      name: '学习曲线',
      values: { gpt5: '低', claude: '中', grok: '高', gemini: '中', qwen: '中' },
      ratings: { gpt5: 95, claude: 85, grok: 70, gemini: 80, qwen: 82 },
    },
    {
      name: '社区支持',
      values: { gpt5: '优秀', claude: '良好', grok: '中等', gemini: '良好', qwen: '优秀' },
      ratings: { gpt5: 90, claude: 85, grok: 75, gemini: 80, qwen: 92 },
    },
  ],
})

const tabs = ref(['核心能力', '质量与可靠性', '开发者体验'])
const activeTab = ref('核心能力')
const selectedModel = ref('gpt5')
</script>

<style lang="less" scoped>
.ai-model-comparison {
  font-family: 'Roboto', sans-serif;
  background: #f8fafc;
  color: #2d3748;
  line-height: 1.6;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background: linear-gradient(135deg, #4a69bd 0%, #6a89cc 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  .header-content {
    max-width: 900px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-weight: 600;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 800px;
    margin: 0 auto;
    font-weight: 300;
    color: #e0e7ff;
  }
}

.model-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.model-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border-top: 4px solid;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  &.gpt5 {
    border-color: #10a37f;
  }
  &.claude {
    border-color: #d4af37;
  }
  &.grok {
    border-color: #1da1f2;
  }
  &.gemini {
    border-color: #ea4335;
  }
  &.qwen {
    border-color: #ff6b00;
  }
}

.model-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;

  .model-icon {
    width: 60px;
    height: 60px;
    background: #f0f7ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

    i {
      font-size: 1.8rem;
    }

    .fa-openai {
      color: #10a37f;
    }
    .fa-robot {
      color: #d4af37;
    }
    .fa-twitter {
      color: #1da1f2;
    }
    .fa-google {
      color: #ea4335;
    }
    .fa-github {
      color: #ff6b00;
    }
  }

  h2 {
    font-size: 1.4rem;
    margin-bottom: 5px;
    text-align: center;
  }

  .model-tag {
    background: #e9ecef;
    color: #495057;
    padding: 3px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.model-stats {
  margin-bottom: 15px;

  .stat {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .stat-label {
    font-size: 0.9rem;
    color: #4a5568;
    margin-bottom: 5px;
  }

  .stat-value {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 5px;
  }

  .stat-bar {
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
  }

  .stat-fill {
    height: 100%;
    border-radius: 4px;
  }

  .gpt5 .stat-fill {
    background: #10a37f;
  }
  .claude .stat-fill {
    background: #d4af37;
  }
  .grok .stat-fill {
    background: #1da1f2;
  }
  .gemini .stat-fill {
    background: #ea4335;
  }
  .qwen .stat-fill {
    background: #ff6b00;
  }
}

.model-highlights {
  .highlight {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 0.9rem;
    margin-bottom: 8px;
    padding: 8px;
    background: #f8fafc;
    border-radius: 6px;

    i {
      color: #48bb78;
      margin-top: 3px;
    }
  }
}

.comparison-section {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.6rem;
  }
}

.filter-tabs {
  display: flex;
  background: #f1f3f5;
  border-radius: 30px;
  padding: 5px;

  button {
    padding: 8px 20px;
    border: none;
    background: none;
    border-radius: 30px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;

    th,
    td {
      padding: 15px;
      text-align: center;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #f7fafc;
      font-weight: 600;
      color: #4a5568;

      .model-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        i {
          font-size: 1.5rem;
        }

        .fa-openai {
          color: #10a37f;
        }
        .fa-robot {
          color: #d4af37;
        }
        .fa-twitter {
          color: #1da1f2;
        }
        .fa-google {
          color: #ea4335;
        }
        .fa-github {
          color: #ff6b00;
        }
      }
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }

    tr:hover {
      background: #f0f7ff;
    }
  }
}

.rating {
  .rating-value {
    font-weight: 600;
    margin-bottom: 5px;
  }

  .rating-bar {
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
  }

  .rating-fill {
    height: 100%;
    border-radius: 4px;
    background: #10a37f;
  }

  .gpt5 .rating-fill {
    background: #10a37f;
  }
  .claude .rating-fill {
    background: #d4af37;
  }
  .grok .rating-fill {
    background: #1da1f2;
  }
  .gemini .rating-fill {
    background: #ea4335;
  }
  .qwen .rating-fill {
    background: #ff6b00;
  }
}

.model-details {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.6rem;
    margin-bottom: 20px;

    .fa-openai {
      color: #10a37f;
    }
    .fa-robot {
      color: #d4af37;
    }
    .fa-twitter {
      color: #1da1f2;
    }
    .fa-google {
      color: #ea4335;
    }
    .fa-github {
      color: #ff6b00;
    }
  }
}

.detail-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.detail-section {
  background: #f8fafc;
  border-radius: 8px;
  padding: 20px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: #2d3748;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.7;
  }
}

.specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 15px 0;

  .spec {
    background: white;
    padding: 10px;
    border-radius: 6px;

    .spec-label {
      font-size: 0.85rem;
      color: #718096;
    }

    .spec-value {
      font-weight: 500;
    }
  }
}

ul {
  padding-left: 20px;

  li {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
}

.integrations {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;

  .integration {
    background: white;
    padding: 8px 15px;
    border-radius: 30px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
}

.select-prompt {
  text-align: center;
  padding: 40px;
  color: #a0aec0;
  font-size: 1.2rem;

  i {
    font-size: 2rem;
    margin-bottom: 15px;
    display: block;
  }
}

.conclusion-section {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.6rem;
    margin-bottom: 20px;
  }
}

.recommendations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.recommendation {
  background: #f8fafc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;

  .rec-icon {
    width: 50px;
    height: 50px;
    background: #e9f5ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;

    i {
      font-size: 1.5rem;
      color: #4a69bd;
    }
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95rem;
    color: #4a5568;
  }
}

@media (max-width: 768px) {
  header h1 {
    font-size: 2rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .filter-tabs {
    width: 100%;
  }
}

@media (max-width: 480px) {
  header h1 {
    font-size: 1.5rem;
  }

  .model-cards {
    grid-template-columns: 1fr;
  }
}
</style>
