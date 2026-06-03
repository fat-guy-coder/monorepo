<template>
  <LearningPath
    title="AI 学习路线图"
    description="从数学基础到大模型应用 · 从易到难体系化"
    :tags="[{ label: '🧮 数学', color: 'blue' },{ label: '🤖 ML', color: 'green' },{ label: '🧠 DL', color: 'purple' },{ label: '👁️ CV', color: 'orange' },{ label: '💬 NLP', color: 'red' },{ label: '✨ LLM', color: 'teal' }]"
    :phases="phases"
    footerText="预计需 24-36 周 · 数学先行 · 经典打底 · 紧跟前沿"
  />
</template>

<script setup lang="ts">
import { LearningPath } from 'components'
import type { Phase } from 'components/LearningPath/index.vue'

const phases: Phase[] = [
  {
    id: 1, icon: '🧮', title: 'AI 概览与数学基础', period: '3-4 周',
    desc: '理解 AI 全貌，打好线代/概率/微积分基础。不需要成为数学家——会用、能推导、遇到不懂的会查。',
    color: 'bg-blue-500',
    modules: [
      { name: '1', label: 'AI 全景', topics: [
        { name: 'ai-1-1-1-what-is-ai', label: '什么是AI：ML/DL/AGI' },
        { name: 'ai-1-1-2-history', label: 'AI简史与三次浪潮' },
        { name: 'ai-1-1-3-taxonomy', label: '监督/无监督/强化/生成' },
      ]},
      { name: '2', label: '线性代数', topics: [
        { name: 'ai-1-2-1-vector', label: '向量与向量空间' },
        { name: 'ai-1-2-2-matrix', label: '矩阵运算' },
        { name: 'ai-1-2-3-eigen', label: '特征值与PCA基础' },
        { name: 'ai-1-2-4-svd', label: 'SVD奇异值分解' },
      ]},
      { name: '3', label: '概率与优化', topics: [
        { name: 'ai-1-3-1-basic', label: '贝叶斯定理与条件概率' },
        { name: 'ai-1-3-4-info-theory', label: '熵/交叉熵/KL散度' },
        { name: 'ai-1-4-3-gradient-descent', label: '梯度下降：BGD/SGD/Mini-batch' },
        { name: 'ai-1-4-4-optimizers', label: '优化器：Momentum/Adam' },
      ]},
    ]
  },
  {
    id: 2, icon: '🤖', title: '机器学习基础', period: '2-3 周',
    desc: '掌握ML核心概念——过拟合、正则化、特征工程、模型评估。这些是理解一切后续内容的前提。',
    color: 'bg-green-500',
    modules: [
      { name: '1', label: '核心概念', topics: [
        { name: 'ai-2-1-1-data', label: '训练/验证/测试集' },
        { name: 'ai-2-1-2-overfit', label: '过拟合与偏差-方差权衡' },
        { name: 'ai-2-1-3-regularization', label: '正则化：L1/L2/Dropout' },
        { name: 'ai-2-1-4-metrics', label: '评估指标：Acc/Prec/Recall/F1/AUC' },
      ]},
      { name: '2', label: '特征工程', topics: [
        { name: 'ai-2-2-1-preprocessing', label: '标准化/归一化/缺失值/编码' },
        { name: 'ai-2-2-3-extraction', label: 'PCA/LDA/t-SNE降维' },
      ]},
      { name: '3', label: '模型验证', topics: [
        { name: 'ai-2-3-1-kfold', label: 'K-Fold交叉验证' },
        { name: 'ai-2-3-2-hyperparam', label: '超参数调优' },
        { name: 'ai-2-3-3-ensemble-intro', label: '集成学习：Bagging/Boosting' },
      ]},
    ]
  },
  {
    id: 3, icon: '📈', title: '经典机器学习算法', period: '4-6 周',
    desc: '从线性回归到XGBoost——这些算法至今仍是工业界的主力。理解原理比调包更重要。',
    color: 'bg-amber-500',
    modules: [
      { name: '1', label: '线性模型', topics: [
        { name: 'ai-3-1-1-linear-reg', label: '线性回归与正则化' },
        { name: 'ai-3-1-2-logistic', label: '逻辑回归与交叉熵' },
      ]},
      { name: '2', label: '树模型（重点）', topics: [
        { name: 'ai-3-2-1-decision-tree', label: '决策树：ID3/C4.5/CART' },
        { name: 'ai-3-2-2-random-forest', label: '随机森林' },
        { name: 'ai-3-2-3-gbdt', label: 'GBDT梯度提升' },
        { name: 'ai-3-2-4-xgboost', label: 'XGBoost核心原理' },
        { name: 'ai-3-2-5-lightgbm', label: 'LightGBM高效实现' },
        { name: 'ai-3-2-6-catboost', label: 'CatBoost类别特征' },
      ]},
      { name: '3', label: 'SVM与贝叶斯', topics: [
        { name: 'ai-3-3-1-hard-margin', label: 'SVM：最大间隔分类器' },
        { name: 'ai-3-3-3-kernel', label: '核技巧：RBF/多项式核' },
        { name: 'ai-3-4-1-naive-bayes', label: '朴素贝叶斯' },
      ]},
      { name: '4', label: '聚类', topics: [
        { name: 'ai-3-5-1-kmeans', label: 'K-Means与K-Means++' },
        { name: 'ai-3-5-2-dbscan', label: 'DBSCAN密度聚类' },
        { name: 'ai-3-5-4-gmm', label: 'GMM与EM算法' },
      ]},
    ]
  },
  {
    id: 4, icon: '🧠', title: '深度学习', period: '4-6 周',
    desc: '从MLP到CNN到RNN——掌握神经网络的核心组件和训练技巧。动手跑一个完整的训练循环。',
    color: 'bg-purple-500',
    modules: [
      { name: '1', label: '神经网络基础', topics: [
        { name: 'ai-4-1-1-perceptron', label: '感知机与MLP' },
        { name: 'ai-4-1-2-activation', label: '激活函数：ReLU/GELU/Swish' },
        { name: 'ai-4-1-3-backprop', label: '反向传播与自动微分' },
        { name: 'ai-4-1-4-initialization', label: 'Xavier/He初始化' },
      ]},
      { name: '2', label: '训练技巧', topics: [
        { name: 'ai-4-2-1-batchnorm', label: 'Batch/Layer Normalization' },
        { name: 'ai-4-2-2-dropout', label: 'Dropout与DropConnect' },
        { name: 'ai-4-2-3-lr-schedule', label: '学习率调度：Cosine/Warmup' },
      ]},
      { name: '3', label: 'CNN', topics: [
        { name: 'ai-4-3-1-conv', label: '卷积层与感受野' },
        { name: 'ai-4-3-3-classic-cnn', label: 'LeNet/AlexNet/VGG/Inception' },
        { name: 'ai-4-3-4-resnet', label: 'ResNet残差网络' },
      ]},
      { name: '4', label: 'RNN', topics: [
        { name: 'ai-4-4-1-vanilla-rnn', label: 'RNN与梯度消失' },
        { name: 'ai-4-4-2-lstm', label: 'LSTM：遗忘门/输入门/输出门' },
        { name: 'ai-4-4-3-gru', label: 'GRU：更新门/重置门' },
      ]},
    ]
  },
  {
    id: 5, icon: '👁️', title: '计算机视觉 (CV)', period: '3-4 周',
    desc: '从图像滤波到目标检测到图像生成。CV是最"看得见"的AI领域。',
    color: 'bg-orange-500',
    modules: [
      { name: '1', label: '图像基础', topics: [
        { name: 'ai-5-1-1-color-space', label: '色彩空间：RGB/HSV/Lab' },
        { name: 'ai-5-1-2-filter', label: '滤波：高斯/Sobel/Canny' },
      ]},
      { name: '2', label: '目标检测', topics: [
        { name: 'ai-5-2-1-rcnn', label: 'R-CNN家族：Fast/Faster/Mask' },
        { name: 'ai-5-2-2-yolo', label: 'YOLO系列：v1→v8' },
        { name: 'ai-5-2-3-anchor-free', label: 'Anchor-Free检测' },
      ]},
      { name: '3', label: '分割与生成', topics: [
        { name: 'ai-5-3-1-semantic', label: '语义分割：FCN/U-Net' },
        { name: 'ai-5-3-2-instance', label: '实例分割：Mask R-CNN' },
        { name: 'ai-5-4-1-gan', label: 'GAN：对抗生成网络' },
        { name: 'ai-5-4-3-nerf', label: 'NeRF神经辐射场' },
      ]},
    ]
  },
  {
    id: 6, icon: '💬', title: '自然语言处理 (NLP)', period: '4-6 周',
    desc: '从TF-IDF到Transformer到GPT——NLP是当前AI最火热的领域，也是LLM的基础。',
    color: 'bg-cyan-500',
    modules: [
      { name: '1', label: '文本基础', topics: [
        { name: 'ai-6-1-1-tokenization', label: '分词：BPE/WordPiece' },
        { name: 'ai-6-1-2-embedding-intro', label: 'Word2Vec/GloVe/FastText' },
      ]},
      { name: '2', label: 'Transformer(重点)', topics: [
        { name: 'ai-6-2-1-self-attention', label: 'Self-Attention：Q/K/V机制' },
        { name: 'ai-6-2-2-multi-head', label: '多头注意力与位置编码' },
        { name: 'ai-6-2-3-encoder-decoder', label: 'Encoder-Decoder架构' },
      ]},
      { name: '3', label: '预训练模型', topics: [
        { name: 'ai-6-3-1-bert', label: 'BERT：MLM/NSP/微调' },
        { name: 'ai-6-3-2-gpt-series', label: 'GPT-1→2→3→4演进' },
        { name: 'ai-6-3-3-t5-bart', label: 'T5/BART统一范式' },
      ]},
      { name: '4', label: 'NLP任务', topics: [
        { name: 'ai-6-4-1-classification', label: '文本分类与情感分析' },
        { name: 'ai-6-4-2-ner', label: 'NER与关系抽取' },
        { name: 'ai-6-4-3-qa', label: '问答系统与MRC' },
      ]},
    ]
  },
  {
    id: 7, icon: '🎮', title: '强化学习 (RL)', period: '3-4 周',
    desc: '通过试错学习——从MDP到PPO，理解RL的核心思想。RLHF是LLM对齐的关键技术。',
    color: 'bg-red-500',
    modules: [
      { name: '1', label: 'MDP与基础', topics: [
        { name: 'ai-7-1-1-mdp', label: 'MDP：状态/动作/奖励' },
        { name: 'ai-7-1-2-bellman', label: 'Bellman方程与最优策略' },
      ]},
      { name: '2', label: '无模型方法', topics: [
        { name: 'ai-7-2-1-monte-carlo', label: '蒙特卡洛方法' },
        { name: 'ai-7-2-2-td', label: 'SARSA/Q-Learning' },
        { name: 'ai-7-2-3-dqn', label: 'DQN：经验回放/Double/Dueling' },
      ]},
      { name: '3', label: '策略梯度', topics: [
        { name: 'ai-7-3-2-actor-critic', label: 'Actor-Critic：A2C/A3C' },
        { name: 'ai-7-3-3-ppo', label: 'PPO近端策略优化' },
      ]},
      { name: '4', label: '进阶', topics: [
        { name: 'ai-7-4-2-rlhf', label: 'RLHF：LLM对齐核心技术' },
      ]},
    ]
  },
  {
    id: 8, icon: '✨', title: '生成式 AI 与大模型', period: '4-6 周',
    desc: 'LLM + 扩散模型 + 多模态——当前AI最前沿。重点理解Scaling Law、对齐技术、RAG。',
    color: 'bg-pink-500',
    modules: [
      { name: '1', label: '大语言模型', topics: [
        { name: 'ai-8-1-1-scaling-law', label: 'Scaling Law原理' },
        { name: 'ai-8-1-2-pretraining', label: '预训练：数据/分词/并行' },
        { name: 'ai-8-1-3-sft', label: 'SFT监督微调' },
        { name: 'ai-8-1-4-alignment', label: '对齐：RLHF/DPO/宪法AI' },
      ]},
      { name: '2', label: '扩散模型', topics: [
        { name: 'ai-8-2-1-ddpm', label: 'DDPM：正向/反向扩散' },
        { name: 'ai-8-2-2-stable-diffusion', label: 'Stable Diffusion' },
      ]},
      { name: '3', label: '多模态', topics: [
        { name: 'ai-8-3-1-clip', label: 'CLIP图文对比学习' },
        { name: 'ai-8-3-2-llava', label: 'LLaVA视觉-语言对话' },
      ]},
      { name: '4', label: 'RAG', topics: [
        { name: 'ai-8-4-1-rag-basics', label: '检索增强生成流程' },
        { name: 'ai-8-4-2-vector-db', label: '向量数据库：Milvus/Chroma' },
        { name: 'ai-8-4-3-advanced-rag', label: '进阶RAG：HyDE/图谱RAG' },
      ]},
    ]
  },
  {
    id: 9, icon: '🔧', title: 'MLOps 与工程化', period: '2-3 周',
    desc: '把模型变成产品——部署、量化、监控、持续迭代。这是AI工程师和调参侠的分界线。',
    color: 'bg-indigo-500',
    modules: [
      { name: '1', label: 'ML流水线', topics: [
        { name: 'ai-9-1-1-data-pipeline', label: '数据管道与特征存储' },
        { name: 'ai-9-1-2-experiment', label: '实验管理：MLflow/W&B' },
      ]},
      { name: '2', label: '模型部署', topics: [
        { name: 'ai-9-2-1-serving', label: '模型服务：vLLM/TGI/Triton' },
        { name: 'ai-9-2-2-quantization', label: '模型量化：INT8/INT4/GPTQ/GGUF' },
        { name: 'ai-9-2-3-distillation', label: '知识蒸馏' },
      ]},
      { name: '3', label: '监控', topics: [
        { name: 'ai-9-3-1-drift', label: '数据漂移与模型漂移' },
        { name: 'ai-9-3-2-ab-test', label: 'A/B测试与金丝雀部署' },
      ]},
    ]
  },
  {
    id: 10, icon: '🚀', title: 'AI 应用开发', period: '3-4 周',
    desc: '动手构建AI应用——提示词工程、LangChain、Agent、微调。这是最实用的阶段。',
    color: 'bg-emerald-500',
    modules: [
      { name: '1', label: 'LLM应用', topics: [
        { name: 'ai-10-1-1-prompt-eng', label: '提示词工程：Few-shot/CoT/ToT' },
        { name: 'ai-10-1-2-langchain', label: 'LangChain：Chain/Agent/Tool' },
        { name: 'ai-10-1-3-agent', label: 'AI Agent：ReAct/多Agent协作' },
        { name: 'ai-10-1-4-function-calling', label: 'Function Calling与MCP' },
      ]},
      { name: '2', label: '微调实战', topics: [
        { name: 'ai-10-2-1-lora', label: 'LoRA/QLoRA低秩适配' },
        { name: 'ai-10-2-2-full-ft', label: '全参数微调与DeepSpeed' },
        { name: 'ai-10-2-3-dataset', label: '微调数据集构建' },
      ]},
      { name: '3', label: '领域应用', topics: [
        { name: 'ai-10-3-1-code-ai', label: 'AI编程：Copilot/Cursor' },
        { name: 'ai-10-3-2-ai-search', label: 'AI搜索：向量/混合/重排序' },
        { name: 'ai-10-3-3-autonomous', label: '自主Agent：AutoGPT/CrewAI' },
      ]},
    ]
  },
]
</script>
