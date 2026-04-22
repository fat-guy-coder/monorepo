<template>
  <div class="docker-intro">
    <!-- 头部区域 -->
    <header class="intro-header">
      <div class="header-content">
        <div class="title-wrapper">
          <span class="docker-icon">🐋</span>
          <h1>Docker</h1>
        </div>
        <p class="subtitle">容器化平台 · 构建、共享、运行</p>
        <div class="header-divider"></div>
        <p class="description">
          Docker 是一个开源的容器化平台，允许开发者将应用及其依赖打包到一个轻量级、
          可移植的容器中，实现“一次构建，处处运行”。它简化了开发、部署和运维流程，
          是现代云原生生态的基石。
        </p>
      </div>
    </header>

    <!-- 核心作用速览 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🎯</span>
        <h2>核心作用</h2>
      </div>
      <div class="roles-grid">
        <div v-for="role in roles" :key="role.title" class="role-card">
          <div class="role-icon">{{ role.icon }}</div>
          <h3>{{ role.title }}</h3>
          <p>{{ role.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 核心概念网格 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">📦</span>
        <h2>核心概念</h2>
      </div>
      <div class="concepts-grid">
        <div v-for="concept in concepts" :key="concept.name" class="concept-card">
          <div class="concept-header">
            <span class="concept-icon">{{ concept.icon }}</span>
            <h3>{{ concept.name }}</h3>
          </div>
          <p class="concept-desc">{{ concept.description }}</p>
          <div class="concept-analogy" v-if="concept.analogy">
            <span>💡 类比：</span>{{ concept.analogy }}
          </div>
        </div>
      </div>
    </section>

    <!-- 底层原理 + 优缺点 -->
    <div class="two-column-layout">
      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">⚙️</span>
          <h2>底层实现原理</h2>
        </div>
        <div class="principles-list">
          <div v-for="principle in principles" :key="principle.name" class="principle-item">
            <h4>{{ principle.name }}</h4>
            <p>{{ principle.desc }}</p>
          </div>
        </div>
        <div class="note-block">
          <p>Docker 并非虚拟机，它直接运行在宿主操作系统内核之上，共享内核，通过上述技术实现隔离与资源限制。</p>
        </div>
      </section>

      <section class="section-card">
        <div class="section-header">
          <span class="section-icon">⚖️</span>
          <h2>优缺点对比</h2>
        </div>
        <div class="pros-cons-container">
          <div class="pros">
            <h3>👍 优点</h3>
            <ul>
              <li v-for="pro in pros" :key="pro">{{ pro }}</li>
            </ul>
          </div>
          <div class="cons">
            <h3>👎 缺点 / 挑战</h3>
            <ul>
              <li v-for="con in cons" :key="con">{{ con }}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <!-- 使用场景 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🌍</span>
        <h2>典型使用场景</h2>
      </div>
      <div class="scenarios-grid">
        <div v-for="scene in scenarios" :key="scene.title" class="scenario-card">
          <h3>{{ scene.title }}</h3>
          <p>{{ scene.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 底部引用 -->
    <footer class="intro-footer">
      <p>Docker 改变了软件的交付方式，是 DevOps 和云原生时代的重要基础设施。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 核心作用
interface Role {
  icon: string;
  title: string;
  desc: string;
}

const roles: Role[] = [
  {
    icon: '🚀',
    title: '环境一致性',
    desc: '消除“在我机器上能跑”问题，确保开发、测试、生产环境完全相同。'
  },
  {
    icon: '📦',
    title: '快速部署与扩展',
    desc: '容器启动速度达秒级，支持快速横向扩展，轻松应对流量高峰。'
  },
  {
    icon: '🔧',
    title: '微服务架构支撑',
    desc: '每个微服务独立打包为容器，技术栈解耦，便于独立开发与部署。'
  },
  {
    icon: '💾',
    title: '资源高效利用',
    desc: '共享宿主机内核，比传统虚拟机更轻量，单机可运行成百上千容器。'
  }
];

// 核心概念
interface Concept {
  name: string;
  icon: string;
  description: string;
  analogy?: string;
}

const concepts: Concept[] = [
  {
    name: '镜像 (Image)',
    icon: '🖼️',
    description: '一个只读模板，包含运行应用所需的代码、运行时、库、环境变量和配置文件。',
    analogy: '类比为面向对象中的“类”，或者一个软件安装包。'
  },
  {
    name: '容器 (Container)',
    icon: '📦',
    description: '镜像的运行实例，在镜像层之上添加可写层，彼此隔离但共享宿主机内核。',
    analogy: '类比为类的“实例对象”，是真正运行的进程环境。'
  },
  {
    name: '仓库 (Registry)',
    icon: '🏛️',
    description: '存储和分发 Docker 镜像的服务，如 Docker Hub、私有 Harbor 等。',
    analogy: '类似 GitHub，用于存放和分享镜像。'
  },
  {
    name: 'Dockerfile',
    icon: '📄',
    description: '用于构建镜像的文本文件，包含一系列指令和参数，定义镜像内容与构建步骤。',
    analogy: '构建镜像的“菜谱”或自动化脚本。'
  },
  {
    name: 'Docker Compose',
    icon: '🧩',
    description: '用于定义和运行多容器应用的工具，通过 YAML 文件配置服务、网络和卷。',
    analogy: '多容器应用的“编排乐谱”。'
  }
];

// 底层原理
interface Principle {
  name: string;
  desc: string;
}

const principles: Principle[] = [
  {
    name: 'Namespace (命名空间)',
    desc: '实现进程、网络、文件系统等资源的隔离。每个容器拥有独立的 PID、NET、IPC、MNT、UTS 等命名空间，使容器内的进程仿佛独占一台机器。'
  },
  {
    name: 'Cgroups (控制组)',
    desc: '限制、记录和隔离进程组所使用的物理资源（CPU、内存、磁盘 I/O、网络等），防止单个容器耗尽宿主机资源。'
  },
  {
    name: 'UnionFS (联合文件系统)',
    desc: '分层构建镜像的技术基础。支持将多个目录/文件系统挂载到同一目录下，镜像层只读，容器层可写，实现高效存储和快速分发。'
  }
];

// 优缺点
const pros: string[] = [
  '轻量级，启动快，资源占用小',
  '环境一致性，减少部署摩擦',
  '易于持续集成与持续交付 (CI/CD)',
  '版本控制和组件复用（镜像分层）',
  '庞大的官方镜像生态',
  '支持混合云/多云部署'
];

const cons: string[] = [
  '隔离性弱于传统虚拟机（共享内核）',
  '对 Windows 容器支持仍不完美',
  '网络和存储管理有一定复杂度',
  '生产环境编排（如 K8s）有学习曲线',
  '容器安全性需额外关注（镜像漏洞、逃逸风险）'
];

// 使用场景
interface Scenario {
  title: string;
  desc: string;
}

const scenarios: Scenario[] = [
  {
    title: '微服务架构',
    desc: '每个微服务独立容器化，技术栈自由选择，通过容器编排工具管理服务间通信与伸缩。'
  },
  {
    title: '持续集成/持续部署 (CI/CD)',
    desc: '构建、测试、部署全流程容器化，确保环境一致，流水线标准化。'
  },
  {
    title: '开发环境快速搭建',
    desc: '新成员通过一条命令即可拉起完整开发环境（数据库、缓存、消息队列等）。'
  },
  {
    title: '应用隔离与多租户',
    desc: '在同一台物理机上安全运行多个应用实例，互不干扰。'
  },
  {
    title: '批处理与科学计算',
    desc: '将计算任务打包成镜像，弹性调度到集群中执行，任务结束自动释放资源。'
  },
  {
    title: '传统应用现代化',
    desc: '将老旧单体应用容器化，便于迁移上云和渐进式改造。'
  }
];
</script>

<style lang="less" scoped>
// ========== Less 变量：简约现代 ==========
@primary-blue: #0db7ed; // Docker 蓝
@secondary-blue: #1d63ed;
@accent-blue: #2496ed;
@bg-page: #f8fafc;
@card-bg: #ffffff;
@text-dark: #1e293b;
@text-soft: #475569;
@text-light: #64748b;
@border-light: #e2e8f0;
@code-bg: #1e293b;
@shadow-sm: 0 6px 14px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.02);
@shadow-hover: 0 12px 24px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.02);
@border-radius-lg: 24px;
@border-radius-md: 16px;
@transition: all 0.2s ease;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.docker-intro {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;
  background: @bg-page;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

// ----- 头部样式 -----
.intro-header {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 2.2rem 2.5rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;

  .header-content {
    .title-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 0.5rem;

      .docker-icon {
        font-size: 3.2rem;
        line-height: 1;
      }

      h1 {
        font-size: 3rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        background: linear-gradient(135deg, @primary-blue 0%, @secondary-blue 80%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }

    .subtitle {
      font-size: 1.25rem;
      font-weight: 500;
      color: @primary-blue;
      margin-bottom: 1rem;
    }

    .header-divider {
      width: 70px;
      height: 4px;
      background: @primary-blue;
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

// ----- 通用区块卡片 -----
.section-card {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 1.8rem 2rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: @transition;

  &:hover {
    box-shadow: @shadow-hover;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.8rem;
    border-bottom: 1.5px dashed @border-light;
    padding-bottom: 0.8rem;

    .section-icon {
      font-size: 2rem;
      line-height: 1;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 650;
      color: @text-dark;
      letter-spacing: -0.01em;
    }
  }
}

// ----- 核心作用网格 -----
.roles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  .role-card {
    text-align: center;
    padding: 1.2rem 0.8rem;
    background: #fbfdff;
    border-radius: @border-radius-md;
    border: 1px solid @border-light;
    transition: @transition;

    &:hover {
      border-color: @primary-blue;
      transform: translateY(-2px);
    }

    .role-icon {
      font-size: 2.4rem;
      margin-bottom: 0.8rem;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.6rem;
      color: @text-dark;
    }

    p {
      font-size: 0.9rem;
      line-height: 1.5;
      color: @text-soft;
    }
  }
}

// ----- 核心概念网格 -----
.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  .concept-card {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.5rem 1.5rem;
    border: 1px solid @border-light;
    transition: @transition;

    &:hover {
      border-color: @primary-blue;
    }

    .concept-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 1rem;

      .concept-icon {
        font-size: 1.8rem;
      }

      h3 {
        font-size: 1.3rem;
        font-weight: 650;
        color: @text-dark;
      }
    }

    .concept-desc {
      font-size: 0.95rem;
      line-height: 1.6;
      color: @text-soft;
      margin-bottom: 0.8rem;
    }

    .concept-analogy {
      font-size: 0.85rem;
      color: @text-light;
      background: #f1f5f9;
      padding: 0.5rem 0.8rem;
      border-radius: 20px;
      display: inline-block;
    }
  }
}

// ----- 两列布局（原理 + 优缺点）-----
.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.principles-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.5rem;

  .principle-item {
    h4 {
      font-size: 1.15rem;
      font-weight: 650;
      color: @text-dark;
      margin-bottom: 0.3rem;
    }

    p {
      color: @text-soft;
      line-height: 1.6;
      font-size: 0.95rem;
    }
  }
}

.note-block {
  background: #e6f7ff;
  border-left: 4px solid @primary-blue;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;

  p {
    color: #005a8c;
    font-size: 0.95rem;
  }
}

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
    }

    ul {
      list-style: none;

      li {
        padding: 0.45rem 0;
        color: @text-soft;
        border-bottom: 1px dotted @border-light;
        display: flex;
        align-items: baseline;

        &::before {
          content: "•";
          margin-right: 8px;
          font-weight: bold;
        }
      }
    }
  }

  .pros ul li::before {
    color: #2e7d32;
  }

  .cons ul li::before {
    color: #b45353;
  }
}

// ----- 使用场景网格 -----
.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  .scenario-card {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.4rem 1.5rem;
    border: 1px solid @border-light;

    h3 {
      font-size: 1.1rem;
      font-weight: 650;
      margin-bottom: 0.6rem;
      color: @text-dark;
      display: flex;
      align-items: center;
      gap: 6px;

      &::before {
        content: "🐳";
        font-size: 1.1rem;
      }
    }

    p {
      font-size: 0.9rem;
      line-height: 1.6;
      color: @text-soft;
    }
  }
}

// ----- 底部 -----
.intro-footer {
  text-align: center;
  margin-top: 0.5rem;

  p {
    background: @card-bg;
    display: inline-block;
    padding: 0.9rem 2.2rem;
    border-radius: 50px;
    box-shadow: @shadow-sm;
    border: 1px solid @border-light;
    font-size: 1rem;
    color: @text-light;
  }
}

// ----- 响应式调整 -----
@media (max-width: 640px) {
  .docker-intro {
    padding: 1.2rem 1rem;
    gap: 1.5rem;
  }

  .intro-header {
    padding: 1.8rem 1.5rem;

    .header-content {
      .title-wrapper h1 {
        font-size: 2.2rem;
      }

      .description {
        max-width: 100%;
      }
    }
  }

  .roles-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-card {
    padding: 1.5rem 1.2rem;
  }
}

@media (min-width: 641px) and (max-width: 900px) {
  .roles-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .scenarios-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
