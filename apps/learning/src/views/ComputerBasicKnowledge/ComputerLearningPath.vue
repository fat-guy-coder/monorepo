<template>
  <div class="roadmap-container">
    <div class="roadmap-card">
      <div class="header">
        <h1>
          <span class="header-icon">🧭</span>
          计算机科学学习路线图
        </h1>
        <p class="subtitle">从硬件到系统 · 循序渐进的知识体系</p>
      </div>

      <!-- 路线图阶段列表 -->
      <div class="timeline">
        <div v-for="(item, index) in roadmapItems" :key="item.id" class="milestone">
          <div class="milestone-left">
            <div class="step-indicator">
              <span class="step-number">{{ index + 1 }}</span>
              <span class="step-icon">{{ item.icon }}</span>
            </div>
            <div class="connector" v-if="index < roadmapItems.length - 1"></div>
          </div>
          <div class="milestone-content">
            <div class="card">
              <h2 class="card-title">{{ item.title }}</h2>
              <p class="card-description">{{ item.description }}</p>
              <div class="topics">
                <span v-for="topic in item.topics" :key="topic" class="topic-tag">
                  {{ topic }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-note">
        <span>✨ 扎实基础 · 持续实践 · 构建完整知识体系</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RoadmapItem {
  id: number
  icon: string
  title: string
  description: string
  topics: string[]
}

const roadmapItems: RoadmapItem[] = [
  {
    id: 1,
    icon: '🖥️',
    title: '硬件基础与计算机组成',
    description: '理解计算机底层硬件工作原理，从晶体管到 CPU，建立“软硬结合”的认知基础。',
    topics: [
      '数字逻辑与布尔代数',
      '冯·诺依曼结构',
      'CPU 与指令集',
      '存储器层次结构',
      '总线与 I/O 系统',
      '汇编语言初步'
    ]
  },
  {
    id: 2,
    icon: '⚙️',
    title: '操作系统',
    description: '学习操作系统如何管理硬件资源，并为应用提供抽象、安全、高效的运行环境。',
    topics: [
      '进程与线程管理',
      '同步与死锁',
      '内存管理（虚拟内存）',
      '文件系统',
      'I/O 与设备驱动',
      '操作系统设计与实现'
    ]
  },
  {
    id: 3,
    icon: '🌐',
    title: '计算机网络',
    description: '掌握数据如何在网络中传输，理解互联网核心协议与网络编程模型。',
    topics: [
      'OSI / TCP-IP 模型',
      'HTTP / HTTPS 协议',
      'TCP 与 UDP',
      'IP 与路由',
      'DNS 与 CDN',
      '网络安全基础'
    ]
  },
  {
    id: 4,
    icon: '📊',
    title: '数据结构与算法',
    description: '培养计算思维，学习高效组织数据与解决问题的方法，是编程内功的核心。',
    topics: [
      '数组、链表、栈、队列',
      '树、图、堆、散列表',
      '排序与搜索算法',
      '递归与动态规划',
      '算法复杂度分析',
      '常用算法范式'
    ]
  },
  {
    id: 5,
    icon: '🗄️',
    title: '数据库系统',
    description: '理解数据存储、查询与事务处理，掌握关系型及非关系型数据库的使用与原理。',
    topics: [
      '关系模型与 SQL',
      '索引与查询优化',
      '事务与并发控制',
      '数据库设计范式',
      'NoSQL 与 NewSQL',
      '数据仓库与大数据基础'
    ]
  },
  {
    id: 6,
    icon: '📝',
    title: '编程语言与编译原理',
    description: '深入至少一门系统级语言，理解程序从源码到可执行文件的全过程。',
    topics: [
      'C / C++ / Rust 核心特性',
      '面向对象与函数式编程',
      '内存管理与指针',
      '编译与链接过程',
      '词法、语法分析',
      '虚拟机与运行时'
    ]
  },
  {
    id: 7,
    icon: '🏛️',
    title: '系统设计与架构',
    description: '学习如何构建可扩展、高可用、易维护的大型软件系统。',
    topics: [
      '设计模式与原则',
      '分布式系统理论',
      '微服务与容器化',
      '缓存、消息队列',
      '负载均衡与高可用',
      'CAP 与 BASE 理论'
    ]
  },
  {
    id: 8,
    icon: '🚀',
    title: '工程实践与软技能',
    description: '将理论转化为生产力，掌握现代软件开发流程与团队协作方法。',
    topics: [
      'Git 与版本控制',
      '自动化测试与 CI/CD',
      '代码可读性与重构',
      '文档与沟通',
      '调试与性能分析',
      '项目规划与管理'
    ]
  }
]
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #1e3a5f;
@accent-color: #3b7eb0;
@bg-light: #f8fafd;
@card-bg: #ffffff;
@text-main: #1f3a4e;
@text-muted: #48637c;
@border-light: #dee9f2;

.roadmap-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(145deg, #f0f4fa 0%, #e6ecf3 100%);
  padding: 2.5rem 1.5rem;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
}

.roadmap-card {
  max-width: 1000px;
  width: 100%;
  background: @card-bg;
  border-radius: 36px;
  box-shadow: 0 25px 50px -12px rgba(0, 20, 40, 0.15), 0 8px 20px -8px rgba(0, 0, 0, 0.05);
  padding: 2.8rem 2.8rem 2.2rem;
  backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: 0 30px 60px -14px rgba(15, 45, 70, 0.18);
  }

  @media (max-width: 640px) {
    padding: 1.8rem 1.5rem 1.5rem;
    border-radius: 28px;
  }
}

.header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-light;

  h1 {
    font-size: 2.6rem;
    font-weight: 650;
    letter-spacing: -0.02em;
    margin: 0 0 0.25rem 0;
    color: @primary-color;
    display: flex;
    align-items: center;
    gap: 12px;

    .header-icon {
      font-size: 2.4rem;
      background: #e6edf6;
      width: 56px;
      height: 56px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      box-shadow: inset 0 1px 2px white, 0 6px 10px -2px rgba(0, 35, 70, 0.06);
    }

    @media (max-width: 480px) {
      font-size: 2rem;

      .header-icon {
        width: 46px;
        height: 46px;
        font-size: 1.8rem;
      }
    }
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-muted;
    margin: 0.6rem 0 0 0;
    font-weight: 400;
    letter-spacing: -0.2px;
  }
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.milestone {
  display: flex;
  align-items: stretch;
  position: relative;

  &:last-child .connector {
    display: none;
  }
}

.milestone-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;
  margin-right: 20px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 50px;
    margin-right: 12px;
  }
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 30px;
  padding: 10px 0;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
  border: 1px solid @border-light;
  background: @bg-light;

  .step-number {
    font-size: 1.4rem;
    font-weight: 700;
    color: @accent-color;
    line-height: 1.2;
    background: white;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    margin-bottom: 4px;
    box-shadow: inset 0 1px 3px #cdddec, 0 2px 4px rgba(0, 0, 0, 0.02);
    border: 1px solid @border-light;
  }

  .step-icon {
    font-size: 2rem;
    line-height: 1;
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.04));
  }
}

.connector {
  width: 2px;
  background: linear-gradient(to bottom, @border-light, #b3c9de);
  flex: 1;
  min-height: 30px;
  margin: 6px 0;
  border-radius: 2px;
}

.milestone-content {
  flex: 1;
  padding-bottom: 24px;
  width: 100%;
}

.card {
  background: @bg-light;
  border-radius: 24px;
  padding: 1.5rem 1.8rem;
  border: 1px solid #e2ebf3;
  box-shadow: 0 6px 12px -6px rgba(0, 20, 40, 0.04);
  transition: all 0.2s ease;

  &:hover {
    border-color: #c9daea;
    box-shadow: 0 10px 18px -8px rgba(27, 58, 90, 0.08);
  }

  @media (max-width: 480px) {
    padding: 1.2rem 1.2rem;
  }
}

.card-title {
  font-size: 1.5rem;
  font-weight: 620;
  margin: 0 0 0.4rem 0;
  color: @primary-color;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-description {
  font-size: 1rem;
  line-height: 1.6;
  color: @text-main;
  margin: 0 0 1rem 0;
  font-weight: 400;
}

.topics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
}

.topic-tag {
  background: white;
  padding: 0.25rem 1rem;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 500;
  color: @primary-color;
  border: 1px solid #d0dfec;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: all 0.1s;
  letter-spacing: -0.1px;

  &:hover {
    background: @primary-color;
    color: white;
    border-color: @primary-color;
  }
}

.footer-note {
  margin-top: 2rem;
  text-align: center;
  font-size: 1rem;
  color: @text-muted;
  border-top: 1px solid @border-light;
  padding-top: 1.8rem;
  font-weight: 450;

  span {
    background: #ecf3fa;
    padding: 0.35rem 1.6rem;
    border-radius: 60px;
    display: inline-block;
    backdrop-filter: blur(4px);
    border: 1px solid #d1e0ee;
  }
}

// 小屏幕适配
@media (max-width: 600px) {
  .milestone-left {
    width: 55px;
  }

  .step-indicator .step-icon {
    font-size: 1.6rem;
  }

  .card-title {
    font-size: 1.3rem;
  }
}
</style>
