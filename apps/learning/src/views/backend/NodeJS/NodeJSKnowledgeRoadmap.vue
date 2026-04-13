<template>
  <div class="nodejs-roadmap">
    <!-- 头部区域 -->
    <header class="header">
      <h1>Node.js 学习路线图</h1>
      <p class="subtitle">从入门到精通的系统化学习路径</p>
    </header>

    <!-- 学习路径展示 -->
    <div class="roadmap-container">
      <!-- 基础阶段 -->
      <section class="stage">
        <div class="stage-header">
          <div class="stage-icon">1</div>
          <h2>基础入门</h2>
        </div>
        <div class="topics">
          <div class="topic" v-for="topic in foundation" :key="topic.name">
            <div class="topic-icon">{{ topic.icon }}</div>
            <div class="topic-content">
              <h3>{{ topic.name }}</h3>
              <ul>
                <li v-for="item in topic.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心阶段 -->
      <section class="stage">
        <div class="stage-header">
          <div class="stage-icon">2</div>
          <h2>核心知识</h2>
        </div>
        <div class="topics">
          <div class="topic" v-for="topic in core" :key="topic.name">
            <div class="topic-icon">{{ topic.icon }}</div>
            <div class="topic-content">
              <h3>{{ topic.name }}</h3>
              <ul>
                <li v-for="item in topic.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 进阶阶段 -->
      <section class="stage">
        <div class="stage-header">
          <div class="stage-icon">3</div>
          <h2>进阶开发</h2>
        </div>
        <div class="topics">
          <div class="topic" v-for="topic in advanced" :key="topic.name">
            <div class="topic-icon">{{ topic.icon }}</div>
            <div class="topic-content">
              <h3>{{ topic.name }}</h3>
              <ul>
                <li v-for="item in topic.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 专业阶段 -->
      <section class="stage">
        <div class="stage-header">
          <div class="stage-icon">4</div>
          <h2>专业领域</h2>
        </div>
        <div class="topics">
          <div class="topic" v-for="topic in professional" :key="topic.name">
            <div class="topic-icon">{{ topic.icon }}</div>
            <div class="topic-content">
              <h3>{{ topic.name }}</h3>
              <ul>
                <li v-for="item in topic.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 学习资源 -->
    <section class="resources">
      <h2>推荐学习资源</h2>
      <div class="resource-list">
        <div class="resource">
          <h3>官方文档</h3>
          <ul>
            <li>Node.js 官方文档</li>
            <li>npm 官方文档</li>
            <li>Express.js 官方文档</li>
          </ul>
        </div>
        <div class="resource">
          <h3>在线课程</h3>
          <ul>
            <li>Node.js 入门到精通 (Udemy)</li>
            <li>全栈 Node.js 开发 (Coursera)</li>
            <li>Node.js 高级编程 (Pluralsight)</li>
          </ul>
        </div>
        <div class="resource">
          <h3>书籍推荐</h3>
          <ul>
            <li>《Node.js 实战》</li>
            <li>《深入浅出 Node.js》</li>
            <li>《Node.js 设计模式》</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <p>Node.js 学习路线图  - 持续更新</p>
      <p>建议每日投入 2 小时学习，预计 3-6 个月掌握核心内容</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 基础阶段内容
const foundation = ref([
  {
    icon: "📚",
    name: "JavaScript 基础",
    items: [
      "ES6+ 语法 (箭头函数, 解构, 模板字符串)",
      "异步编程 (回调, Promises, async/await)",
      "模块系统 (CommonJS, ES Modules)",
      "基础数据类型和操作"
    ]
  },
  {
    icon: "🔧",
    name: "Node.js 基础",
    items: [
      "Node.js 安装与环境配置",
      "REPL 交互式环境",
      "npm 包管理器基础",
      "脚本执行与调试"
    ]
  },
  {
    icon: "📁",
    name: "文件系统操作",
    items: [
      "fs 模块基础",
      "文件读写操作",
      "目录操作",
      "流操作基础"
    ]
  }
]);

// 核心知识内容
const core = ref([
  {
    icon: "🔄",
    name: "异步编程",
    items: [
      "事件循环机制",
      "回调函数深度理解",
      "Promise 高级用法",
      "async/await 最佳实践",
      "事件发射器 (EventEmitter)"
    ]
  },
  {
    icon: "🌐",
    name: "网络编程",
    items: [
      "HTTP 模块",
      "创建 HTTP 服务器",
      "处理 HTTP 请求",
      "RESTful API 设计基础",
      "TCP/UDP 服务器"
    ]
  },
  {
    icon: "📦",
    name: "模块系统",
    items: [
      "核心模块使用",
      "创建自定义模块",
      "npm 包管理",
      "package.json 基本介绍",
      "模块加载机制"
    ]
  }
]);

// 进阶开发内容
const advanced = ref([
  {
    icon: "🚀",
    name: "Express.js 框架",
    items: [
      "路由系统",
      "中间件机制",
      "模板引擎集成",
      "错误处理",
      "RESTful API 开发"
    ]
  },
  {
    icon: "💾",
    name: "数据库集成",
    items: [
      "MongoDB 与 Mongoose",
      "SQL 数据库 (MySQL, PostgreSQL)",
      "ORM/ODM 使用",
      "数据库迁移",
      "Redis 集成"
    ]
  },
  {
    icon: "🔒",
    name: "认证与安全",
    items: [
      "JWT 认证",
      "OAuth 2.0 集成",
      "密码加密 (bcrypt)",
      "CORS 处理",
      "安全最佳实践"
    ]
  }
]);

// 专业领域内容
const professional = ref([
  {
    icon: "⚙️",
    name: "性能优化",
    items: [
      "性能分析工具",
      "内存泄漏检测",
      "集群与负载均衡",
      "缓存策略",
      "V8 引擎优化"
    ]
  },
  {
    icon: "🚢",
    name: "部署与 DevOps",
    items: [
      "Docker 容器化",
      "PM2 进程管理",
      "CI/CD 流水线",
      "云部署 (AWS, Azure, GCP)",
      "日志管理与监控"
    ]
  },
  {
    icon: "🧪",
    name: "测试",
    items: [
      "单元测试 (Jest, Mocha)",
      "集成测试",
      "端到端测试",
      "测试覆盖率",
      "Mocking 和 Stubbing"
    ]
  },
  {
    icon: "🌍",
    name: "微服务架构",
    items: [
      "微服务概念",
      "gRPC 通信",
      "服务发现",
      "消息队列 (RabbitMQ, Kafka)",
      "容器编排 (Kubernetes)"
    ]
  },
  {
    icon: "🛠️",
    name: "实时应用",
    items: [
      "WebSocket 协议",
      "Socket.IO 库",
      "实时通信架构",
      "推送通知",
      "聊天应用开发"
    ]
  }
]);
</script>

<style lang="less" scoped>
.nodejs-roadmap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  background: #f8f9ff;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(120deg, #339933, #006400);
  color: white;
  border-radius: 10px;

  h1 {
    font-size: 2.2rem;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
  }
}

.roadmap-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
  margin-bottom: 40px;
}

.stage {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  .stage-header {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    background: #339933;
    color: white;

    .stage-icon {
      width: 32px;
      height: 32px;
      background: white;
      color: #339933;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 15px;
      font-size: 1.1rem;
    }

    h2 {
      font-size: 1.5rem;
      margin: 0;
    }
  }
}

.topics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  padding: 20px;
}

.topic {
  display: flex;
  border: 1px solid #e0e7ff;
  border-radius: 8px;
  padding: 15px;
  background: #f9f9ff;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }

  .topic-icon {
    font-size: 1.8rem;
    margin-right: 15px;
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .topic-content {
    flex: 1;

    h3 {
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 10px;
      color: #339933;
    }

    ul {
      list-style-type: none;
      padding-left: 0;
      margin: 0;

      li {
        padding: 5px 0;
        font-size: 0.9rem;
        color: #444;
        position: relative;
        padding-left: 15px;

        &::before {
          content: "•";
          color: #339933;
          position: absolute;
          left: 0;
          font-weight: bold;
        }
      }
    }
  }
}

.resources {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;

  h2 {
    text-align: center;
    color: #339933;
    margin-top: 0;
    margin-bottom: 25px;
    font-size: 1.6rem;
  }

  .resource-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .resource {
      background: #f9f9ff;
      border: 1px solid #e0e7ff;
      border-radius: 8px;
      padding: 20px;

      h3 {
        color: #339933;
        margin-top: 0;
        margin-bottom: 15px;
        font-size: 1.2rem;
      }

      ul {
        list-style-type: none;
        padding-left: 0;
        margin: 0;

        li {
          padding: 6px 0;
          font-size: 0.95rem;
          color: #444;
          border-bottom: 1px dashed #e0e7ff;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 0.9rem;
  border-top: 1px solid #e0e7ff;

  p {
    margin: 5px 0;
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 1.8rem;
  }

  .topics {
    grid-template-columns: 1fr;
  }

  .resource-list {
    grid-template-columns: 1fr;
  }
}
</style>
