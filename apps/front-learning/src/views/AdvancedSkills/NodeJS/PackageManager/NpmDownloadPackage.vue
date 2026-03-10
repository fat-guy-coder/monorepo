<template>
  <div class="npm-flow-container">
    <div class="header">
      <div class="title-group">
        <div class="npm-logo">
          <svg viewBox="0 0 780 250">
            <path
              fill="#CB3837"
              d="M240,250h100v-50h100V50H240V250z M340,50h50v100h-50V50z M480,0v200h100V200h100V200H680V0H480z M580,50h50v100h-50V50z M0,200h100V50h100v150h100V0H0V200z"
            ></path>
          </svg>
        </div>
        <h1>Node.js包下载流程</h1>
        <p>深入解析<code>npm install</code>命令的执行过程</p>
      </div>
    </div>

    <div class="flow-diagram">
      <div
        class="flow-step"
        v-for="(step, index) in flowSteps"
        :key="index"
        :class="{ active: activeStep === index }"
      >
        <div class="step-header" @click="activeStep = activeStep === index ? -1 : index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-title">{{ step.title }}</div>
          <div class="step-icon">
            <svg
              v-if="activeStep === index"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div class="step-details" v-show="activeStep === index">
          <div class="step-info">
            <div class="info-grid">
              <div class="info-item" v-for="(info, i) in step.info" :key="i">
                <div class="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 8 8 12 12 16"></polyline>
                    <line x1="16" y1="12" x2="8" y2="12"></line>
                  </svg>
                </div>
                <div class="info-content">
                  <h4>{{ info.title }}</h4>
                  <p>{{ info.content }}</p>
                  <code v-if="info.code">{{ info.code }}</code>
                </div>
              </div>
            </div>

            <div class="step-diagram" v-if="step.diagram">
              <div class="diagram-container">
                <div
                  class="diagram-item"
                  v-for="(item, idx) in step.diagram"
                  :key="idx"
                  :class="item.type"
                >
                  <div class="diagram-icon">
                    <component :is="item.icon" v-if="item.icon" />
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </div>
                  <div class="diagram-label">{{ item.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="terminal-demo">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="close"></span>
          <span class="minimize"></span>
          <span class="maximize"></span>
        </div>
        <div class="terminal-title">bash — npm install express</div>
      </div>
      <div class="terminal-content">
        <pre v-for="(line, idx) in terminalLines" :key="idx" :class="line.type">{{
          line.content
        }}</pre>
      </div>
    </div>

    <div class="footer">
      <p>Node.js包管理器为JavaScript生态系统提供了强大的依赖管理能力</p>
      <div class="npm-info">
        <span>npm v9.8.3</span>
        <span>Node.js v18.17.0</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PackageIcon, NetworkIcon, FileIcon } from './icon'

const activeStep = ref(0)


const flowSteps = ref([
  {
    title: '解析包依赖',
    info: [
      {
        title: '读取package.json',
        content:
          'npm读取项目根目录下的package.json文件，分析其中的dependencies和devDependencies字段',
        code: '"dependencies": { "express": "^4.18.2" }',
      },
      {
        title: '检查package-lock.json',
        content: '如果存在package-lock.json文件，npm会使用其中的确切版本信息确保安装一致性',
      },
      {
        title: '构建依赖树',
        content: 'npm开始构建完整的依赖树，处理所有传递性依赖（依赖的依赖）',
      },
    ],
    diagram: [
      { type: 'primary', label: 'package.json', icon: FileIcon },
      { type: 'arrow', label: '→' },
      { type: 'primary', label: 'package-lock.json', icon: FileIcon },
      { type: 'arrow', label: '→' },
      { type: 'success', label: '依赖树', icon: PackageIcon },
    ],
  },
  {
    title: '检查缓存',
    info: [
      {
        title: '查询本地缓存',
        content: 'npm首先检查本地缓存（通常在~/.npm目录中）是否已存在所需的包',
      },
      {
        title: '缓存命中处理',
        content: '如果包已在缓存中且是最新版本，npm将直接从缓存安装，节省下载时间',
      },
      {
        title: '缓存缺失处理',
        content: '如果缓存中没有所需的包或版本不匹配，npm将进入网络下载阶段',
      },
    ],
    diagram: [
      { type: 'primary', label: '本地缓存查询', icon: NetworkIcon },
      { type: 'arrow', label: '→' },
      { type: 'success', label: '缓存命中', icon: 'check' },
      { type: 'arrow', label: '→' },
      { type: 'warning', label: '缓存缺失', icon: 'x' },
    ],
  },
  {
    title: '网络请求',
    info: [
      {
        title: '连接注册表',
        content: 'npm连接配置的注册表（默认为https://registry.npmjs.org/）',
      },
      {
        title: '获取包元数据',
        content: '查询注册表获取包的元数据，包括可用版本、依赖关系和下载地址',
        code: 'GET https://registry.npmjs.org/express',
      },
      {
        title: '解析依赖关系',
        content: '递归解析所有依赖包及其子依赖，形成完整的依赖树',
      },
    ],
    diagram: [
      { type: 'primary', label: '客户端', icon: NetworkIcon },
      { type: 'arrow', label: '⇄' },
      { type: 'success', label: 'npm注册表', icon: NetworkIcon },
    ],
  },
  {
    title: '下载包',
    info: [
      {
        title: '获取tarball',
        content: 'npm下载包的压缩文件（.tgz格式），通常存放在注册表服务器上',
        code: 'GET https://registry.npmjs.org/express/-/express-4.18.2.tgz',
      },
      {
        title: '并行下载',
        content: 'npm使用并行下载策略同时下载多个包以提高效率',
      },
      {
        title: '进度显示',
        content: '在命令行界面显示下载进度条和速度信息',
      },
    ],
    diagram: [
      { type: 'primary', label: 'npm CLI', icon: 'download' },
      { type: 'arrow', label: '↓' },
      { type: 'success', label: '包tarball', icon: PackageIcon },
    ],
  },
  {
    title: '解压与安装',
    info: [
      {
        title: '验证完整性',
        content: '使用SHA-512校验和验证下载包的完整性，防止篡改',
      },
      {
        title: '解压缩',
        content: '将.tgz文件解压到node_modules目录中对应的位置',
      },
      {
        title: '处理依赖关系',
        content: '根据依赖树的结构，创建必要的符号链接和嵌套目录',
      },
    ],
    diagram: [
      { type: 'primary', label: '压缩包', icon: PackageIcon },
      { type: 'arrow', label: '→' },
      { type: 'success', label: '解压', icon: 'package' },
      { type: 'arrow', label: '→' },
      { type: 'success', label: 'node_modules', icon: 'folder' },
    ],
  },
  {
    title: '执行生命周期脚本',
    info: [
      {
        title: 'preinstall脚本',
        content: '在安装实际开始之前执行',
      },
      {
        title: 'install/postinstall脚本',
        content: '在包安装完成后执行，常用于编译原生模块或执行其他安装任务',
      },
      {
        title: 'prepublish脚本',
        content: '如果包被发布，则执行此脚本（在npm@5中已弃用）',
      },
    ],
    diagram: [
      { type: 'warning', label: 'preinstall', icon: 'terminal' },
      { type: 'arrow', label: '→' },
      { type: 'success', label: 'install', icon: 'terminal' },
      { type: 'arrow', label: '→' },
      { type: 'warning', label: 'postinstall', icon: 'terminal' },
    ],
  },
  {
    title: '更新lock文件',
    info: [
      {
        title: '生成package-lock.json',
        content: '创建或更新package-lock.json文件，精确记录所有依赖的确切版本',
      },
      {
        title: '确保一致性',
        content: '该文件确保团队成员或CI/CD系统获得完全相同的依赖树',
      },
      {
        title: '包含完整信息',
        content: '包括每个依赖的下载地址、校验和和依赖关系',
      },
    ],
    diagram: [
      { type: 'primary', label: '依赖树', icon: FileIcon },
      { type: 'arrow', label: '→' },
      { type: 'success', label: 'package-lock.json', icon: FileIcon },
    ],
  },
])

const terminalLines = ref([
  { type: 'command', content: '$ npm install express' },
  {
    type: 'info',
    content: 'npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.',
  },
  {
    type: 'info',
    content:
      'npm WARN deprecated debug@4.1.1: Debug versions >=3.2.0 <3.2.7 || >=4 <4.3.1 have a low-severity ReDos regression',
  },
  { type: 'info', content: 'added 50 packages, and audited 51 packages in 6s' },
  { type: 'info', content: 'found 0 vulnerabilities' },
  { type: 'success', content: '+ express@4.18.2' },
])
</script>

<style scoped lang="less">
.npm-flow-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #2d3748;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 3rem;

  .title-group {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .npm-logo {
    width: 100px;
    height: 40px;
    background: white;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    svg {
      width: 80px;
      height: 30px;
    }
  }

  h1 {
    font-size: 2.3rem;
    font-weight: 700;
    margin: 1rem 0 0.5rem;
    color: #2d3748;
    letter-spacing: -0.01em;
  }

  p {
    font-size: 1.1rem;
    color: #4a5568;
    font-weight: 400;

    code {
      background: rgba(203, 56, 55, 0.1);
      color: #c53030;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.95em;
      margin: 0 0.25rem;
    }
  }
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

.flow-step {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  border-left: 4px solid #4299e1;

  &.active {
    box-shadow: 0 8px 25px rgba(66, 153, 225, 0.2);
    transform: translateY(-2px);
    border-left: 4px solid #3182ce;
  }
}

.step-header {
  display: flex;
  align-items: center;
  padding: 1.2rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7fafc;
  }
}

.step-number {
  width: 32px;
  height: 32px;
  background: #4299e1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 1rem;
  flex-shrink: 0;
}

.step-title {
  font-size: 1.3rem;
  font-weight: 600;
  flex: 1;
}

.step-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ebf8ff;
  transition: all 0.3s ease;

  svg {
    stroke: #4299e1;
  }
}

.step-details {
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem;
  background: #f9fbfd;
}

.step-info {
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .info-item {
    background: white;
    border-radius: 10px;
    padding: 1.2rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
    display: flex;
    gap: 0.8rem;
    border-left: 3px solid #4299e1;

    .info-icon {
      svg {
        stroke: #4299e1;
        stroke-width: 2.5;
      }
    }

    .info-content {
      flex: 1;

      h4 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
        font-weight: 600;
        color: #2d3748;
      }

      p {
        font-size: 0.95rem;
        color: #4a5568;
        line-height: 1.5;
        margin: 0 0 0.5rem;
      }

      code {
        display: block;
        background: #f7fafc;
        padding: 0.6rem;
        border-radius: 6px;
        font-family: 'Fira Code', monospace;
        font-size: 0.85rem;
        color: #c53030;
        border: 1px solid #e2e8f0;
        margin-top: 0.5rem;
      }
    }
  }
}

.step-diagram {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .diagram-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1rem;

    .diagram-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 100px;

      &.primary {
        .diagram-icon {
          background: #ebf8ff;
          color: #3182ce;
        }
      }

      &.success {
        .diagram-icon {
          background: #f0fff4;
          color: #38a169;
        }
      }

      &.warning {
        .diagram-icon {
          background: #fffaf0;
          color: #dd6b20;
        }
      }

      &.arrow {
        font-weight: 700;
        color: #a0aec0;
      }

      .diagram-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.8rem;

        svg {
          width: 28px;
          height: 28px;
        }

        &.check:after {
          content: '✓';
          font-size: 1.8rem;
          font-weight: bold;
        }

        &.x:after {
          content: '✕';
          font-size: 1.8rem;
          font-weight: bold;
        }

        &.download:after {
          content: '↓';
          font-size: 1.8rem;
          font-weight: bold;
        }

        &.package:after {
          content: '📦';
          font-size: 1.8rem;
        }

        &.folder:after {
          content: '📁';
          font-size: 1.8rem;
        }

        &.terminal:after {
          content: '>_';
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: -0.1em;
        }
      }

      .diagram-label {
        font-size: 0.9rem;
        font-weight: 500;
        color: #4a5568;
        text-align: center;
      }
    }
  }
}

.terminal-demo {
  background: #2d3748;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  .terminal-header {
    height: 40px;
    background: #1a202c;
    display: flex;
    align-items: center;
    padding: 0 1rem;

    .terminal-buttons {
      display: flex;
      gap: 8px;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;

        &.close {
          background: #e53e3e;
        }
        &.minimize {
          background: #ecc94b;
        }
        &.maximize {
          background: #48bb78;
        }
      }
    }

    .terminal-title {
      flex: 1;
      text-align: center;
      color: #cbd5e0;
      font-size: 0.85rem;
      font-family: 'Fira Code', monospace;
    }
  }

  .terminal-content {
    padding: 1.2rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.95rem;
    line-height: 1.6;

    pre {
      margin: 0;
      padding: 0.1rem 0;
      white-space: pre-wrap;

      &.command {
        color: #63b3ed;

        &::before {
          content: '$ ';
          color: #81e6d9;
        }
      }

      &.info {
        color: #cbd5e0;
      }

      &.success {
        color: #68d391;
        font-weight: 500;
      }
    }
  }
}

.footer {
  margin-top: 3rem;
  text-align: center;
  padding: 1.5rem;
  color: #718096;
  font-size: 0.95rem;

  .npm-info {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 0.75rem;
    font-size: 0.9rem;

    span {
      background: rgba(255, 255, 255, 0.7);
      padding: 0.3rem 1rem;
      border-radius: 20px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }
  }
}

@media (max-width: 768px) {
  .npm-flow-container {
    padding: 1.5rem 1rem;
  }

  .info-grid {
    grid-template-columns: 1fr !important;
  }

  .diagram-container {
    gap: 1rem !important;

    .diagram-item {
      min-width: 80px !important;

      .diagram-icon {
        width: 50px !important;
        height: 50px !important;
      }
    }
  }

  .step-header {
    padding: 1rem;
  }

  h1 {
    font-size: 1.8rem !important;
  }
}
</style>
