<template>
  <div class="lang-container">
    <div class="lang-card">
      <!-- 头部 -->
      <div class="header">
        <h1>
          <span class="header-icon">🚀</span>
          流行后端语言深度对比
        </h1>
        <p class="subtitle">从企业级应用到高性能服务 · 多维度技术选型参考</p>
        <p class="update-note">数据综合自 Stack Overflow 2025、TIOBE、GitHub Octoverse 及行业报告</p>
      </div>

      <!-- 语言卡片网格 -->
      <div class="lang-grid">
        <div v-for="lang in languages" :key="lang.name" class="lang-item">
          <div class="lang-header">
            <span class="lang-icon">{{ lang.icon }}</span>
            <div class="lang-title">
              <h3>{{ lang.name }}</h3>
              <span class="lang-tagline">{{ lang.tagline }}</span>
            </div>
            <!-- 学习曲线星级 -->
            <div class="difficulty" :title="`学习曲线: ${lang.difficulty}/5`">
              <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= lang.difficulty }">★</span>
            </div>
          </div>

          <div class="lang-body">
            <!-- 优劣势对比 -->
            <div class="pros-cons">
              <div class="pros">
                <span class="label">👍 优势</span>
                <ul>
                  <li v-for="pro in lang.pros" :key="pro">{{ pro }}</li>
                </ul>
              </div>
              <div class="cons">
                <span class="label">👎 劣势</span>
                <ul>
                  <li v-for="con in lang.cons" :key="con">{{ con }}</li>
                </ul>
              </div>
            </div>

            <!-- 使用场景标签 -->
            <div class="scenes">
              <span class="scene-label">📌 适用场景</span>
              <div class="scene-tags">
                <span v-for="scene in lang.scenes" :key="scene" class="scene-tag">{{ scene }}</span>
              </div>
            </div>

            <!-- 新增：代表框架 & 知名用户 -->
            <div class="extra-info">
              <div class="info-row">
                <span class="info-label">🛠️ 代表框架</span>
                <span class="info-value">{{ lang.frameworks.join(' · ') }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">🏢 知名用户</span>
                <span class="info-value">{{ lang.notableUsers.join(' · ') }}</span>
              </div>
            </div>

            <!-- 受欢迎度与使用量 -->
            <div class="stats">
              <div class="stat-item">
                <span class="stat-name">受欢迎度</span>
                <div class="stat-bar">
                  <div class="stat-fill" :style="{ width: lang.popularity + '%' }"></div>
                </div>
                <span class="stat-value">{{ lang.popularity }}%</span>
              </div>
              <div class="stat-item">
                <span class="stat-name">使用量</span>
                <div class="stat-bar">
                  <div class="stat-fill usage" :style="{ width: lang.usage + '%' }"></div>
                </div>
                <span class="stat-value">{{ lang.usage }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部说明 -->
      <div class="footer-note">
        <span>📊 学习曲线为相对评估（★越多越陡峭）；受欢迎度基于 Stack Overflow “最受喜爱”比例；使用量基于专业开发者占比。</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Language {
  name: string
  icon: string
  tagline: string
  pros: string[]
  cons: string[]
  scenes: string[]
  frameworks: string[]      // 新增
  notableUsers: string[]    // 新增
  difficulty: number        // 1-5
  popularity: number
  usage: number
}

const languages: Language[] = [
  {
    name: 'Java',
    icon: '☕',
    tagline: '企业级基石 · 跨平台稳定',
    pros: [
      'JVM 生态成熟，类库丰富',
      '强类型、健壮，适合大型团队',
      '跨平台能力优秀 (Write Once, Run Anywhere)',
      '性能经过长期优化，稳定可靠'
    ],
    cons: [
      '语法相对冗长，开发效率偏低',
      '启动慢，内存占用较高',
      '现代特性跟进较慢（如协程）',
      'Oracle JDK 许可策略变化'
    ],
    scenes: ['金融系统', '电商后台', '大数据 (Hadoop/Spark)', 'Android 开发'],
    frameworks: ['Spring Boot', 'Quarkus', 'Micronaut', 'Vert.x'],
    notableUsers: ['阿里巴巴', '亚马逊', 'Netflix', 'LinkedIn'],
    difficulty: 3,
    popularity: 47,
    usage: 30
  },
  {
    name: 'Python',
    icon: '🐍',
    tagline: '简洁优雅 · AI 与数据科学首选',
    pros: [
      '语法简洁，开发效率极高',
      'AI/数据科学生态无敌 (PyTorch, Pandas)',
      '胶水语言，集成能力强',
      '社区庞大，文档齐全'
    ],
    cons: [
      '全局解释器锁 (GIL) 限制多核并行',
      '动态类型，大型项目维护成本高',
      '运行速度相对较慢',
      '移动端支持弱'
    ],
    scenes: ['AI/机器学习', 'Web 后端 (Django/FastAPI)', '自动化脚本', '数据分析'],
    frameworks: ['Django', 'FastAPI', 'Flask', 'PyTorch'],
    notableUsers: ['Google', 'Instagram', 'Spotify', 'OpenAI'],
    difficulty: 1,
    popularity: 67,
    usage: 49
  },
  {
    name: 'Go',
    icon: '🐹',
    tagline: '云原生语言 · 高并发利器',
    pros: [
      '原生并发支持 (goroutine) 简单高效',
      '编译快，部署简单（单一二进制）',
      '性能接近 C/C++，内存安全',
      '标准库强大，尤其网络和云原生'
    ],
    cons: [
      '缺少泛型前生态遗留问题（Go 1.18+ 已改善）',
      '错误处理较为繁琐',
      '第三方库不如 Java/Python 丰富',
      'GUI 和桌面应用支持弱'
    ],
    scenes: ['微服务', '云基础设施 (Docker/K8s)', '网络代理', 'CLI 工具'],
    frameworks: ['Gin', 'Echo', 'Fiber', 'Kratos'],
    notableUsers: ['Google', 'Uber', 'Dropbox', '腾讯'],
    difficulty: 2,
    popularity: 62,
    usage: 23
  },
  {
    name: 'Node.js',
    icon: '💚',
    tagline: 'JavaScript 全栈 · 事件驱动',
    pros: [
      '前端后端语言统一，全栈效率高',
      '非阻塞 I/O，适合 I/O 密集型应用',
      'npm 生态极度丰富',
      '社区活跃，学习曲线平缓'
    ],
    cons: [
      '单线程，CPU 密集型任务弱',
      '回调地狱历史遗留（async/await 缓解）',
      '依赖质量参差不齐',
      '动态类型，大型项目需 TypeScript 辅助'
    ],
    scenes: ['实时应用 (聊天/游戏)', 'BFF 层', '前端工具链', '轻量级 API 服务'],
    frameworks: ['Express', 'NestJS', 'Fastify', 'Koa'],
    notableUsers: ['Netflix', 'PayPal', 'LinkedIn', 'NASA'],
    difficulty: 2,
    popularity: 53,
    usage: 51
  },
  {
    name: 'Rust',
    icon: '🦀',
    tagline: '系统级安全 · 零成本抽象',
    pros: [
      '内存安全无 GC，无数据竞争',
      '性能媲美 C/C++',
      '强大的类型系统和模式匹配',
      '工具链友好 (cargo, rustfmt)'
    ],
    cons: [
      '学习曲线陡峭（所有权、生命周期）',
      '编译时间较长',
      '生态仍不如老牌语言成熟',
      '异步运行时选择存在分裂'
    ],
    scenes: ['系统编程', 'WebAssembly', '嵌入式', '高性能服务端 (替代 C++)'],
    frameworks: ['Actix Web', 'Rocket', 'Axum', 'Tauri'],
    notableUsers: ['Mozilla', 'Dropbox', 'Discord', '微软'],
    difficulty: 5,
    popularity: 83,
    usage: 11
  },
  {
    name: 'C#',
    icon: '🎯',
    tagline: '.NET 生态 · 全能型选手',
    pros: [
      '语法现代，特性丰富 (LINQ, async/await)',
      '.NET 跨平台性能优异',
      '游戏开发首选 (Unity)',
      '微软官方强力支持，工具链成熟'
    ],
    cons: [
      '历史包袱较重（.NET Framework 遗留）',
      '开源社区相比 Java/Python 稍小',
      '部分领域生态不如 Java',
      'Windows 优先的刻板印象'
    ],
    scenes: ['企业级 Web', '游戏开发', '桌面应用', '云原生 (Azure)'],
    frameworks: ['ASP.NET Core', 'Blazor', 'Entity Framework', 'Xamarin'],
    notableUsers: ['微软', 'Stack Overflow', 'Cisco', 'Samsung'],
    difficulty: 3,
    popularity: 58,
    usage: 27
  }
]
</script>

<style lang="less" scoped>
// 设计变量
@primary-dark: #1e293b;
@primary-mid: #334155;
@accent-blue: #3b82f6;
@bg-light: #f8fafc;
@card-bg: #ffffff;
@border-light: #e2e8f0;
@text-main: #1e293b;
@text-muted: #64748b;

.lang-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(145deg, #f1f5f9 0%, #e6edf5 100%);
  padding: 2rem 1.5rem;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
}

.lang-card {
  max-width: 1440px;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 36px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 8px 20px -8px rgba(0, 0, 0, 0.05);
  padding: 2.5rem 2.8rem;
  border: 1px solid rgba(255, 255, 255, 0.8);

  @media (max-width: 640px) {
    padding: 1.8rem 1.5rem;
    border-radius: 28px;
  }
}

.header {
  margin-bottom: 2.2rem;
  border-bottom: 1px solid @border-light;
  padding-bottom: 1.2rem;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 0.25rem 0;
    color: @primary-dark;
    display: flex;
    align-items: center;
    gap: 12px;

    .header-icon {
      font-size: 2.2rem;
      background: linear-gradient(135deg, #dbeafe, #bfdbfe);
      width: 56px;
      height: 56px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      box-shadow: 0 4px 10px rgba(59, 130, 246, 0.15);
    }

    @media (max-width: 480px) {
      font-size: 1.9rem;

      .header-icon {
        width: 48px;
        height: 48px;
        font-size: 1.8rem;
      }
    }
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-muted;
    margin: 0.4rem 0 0.2rem;
    font-weight: 400;
  }

  .update-note {
    font-size: 0.85rem;
    color: @text-muted;
    margin: 0.2rem 0 0;
    font-style: italic;
  }
}

.lang-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 1.5rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.lang-item {
  background: @bg-light;
  border-radius: 24px;
  padding: 1.5rem 1.6rem;
  border: 1px solid @border-light;
  box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:hover {
    background: white;
    border-color: #bfdbfe;
    box-shadow: 0 16px 24px -12px rgba(59, 130, 246, 0.12);
    transform: translateY(-2px);
  }
}

.lang-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;

  .lang-icon {
    font-size: 2.5rem;
    width: 54px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
    border: 1px solid @border-light;
  }

  .lang-title {
    flex: 1;

    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      color: @primary-dark;
      letter-spacing: -0.01em;
    }

    .lang-tagline {
      font-size: 0.8rem;
      color: @text-muted;
      display: block;
      margin-top: 2px;
    }
  }

  .difficulty {
    display: flex;
    gap: 2px;

    .star {
      color: #cbd5e1;
      font-size: 1rem;

      &.filled {
        color: #fbbf24;
      }
    }
  }
}

.lang-body {
  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 1rem;

    .pros,
    .cons {
      .label {
        display: block;
        font-weight: 600;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        color: @text-muted;
        margin-bottom: 6px;
      }

      ul {
        margin: 0;
        padding-left: 1.2rem;
        font-size: 0.85rem;
        line-height: 1.5;
        color: @text-main;

        li {
          margin-bottom: 4px;
        }
      }
    }

    .pros ul {
      list-style-type: '✓   ';

      ::marker {
        color: #10b981;
        font-weight: bold;
      }
    }

    .cons ul {
      list-style-type: '✗   ';

      ::marker {
        color: #ef4444;
        font-weight: bold;
      }
    }
  }

  .scenes {
    margin-bottom: 0.8rem;

    .scene-label {
      font-weight: 600;
      font-size: 0.8rem;
      color: @text-muted;
      display: block;
      margin-bottom: 6px;
    }

    .scene-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .scene-tag {
      background: white;
      padding: 0.2rem 0.8rem;
      border-radius: 30px;
      font-size: 0.75rem;
      font-weight: 500;
      color: @primary-mid;
      border: 1px solid @border-light;
      transition: all 0.1s;

      &:hover {
        background: @primary-dark;
        color: white;
        border-color: @primary-dark;
      }
    }
  }

  .extra-info {
    background: white;
    border-radius: 16px;
    padding: 0.8rem 1rem;
    margin-bottom: 1rem;
    border: 1px solid @border-light;

    .info-row {
      display: flex;
      align-items: baseline;
      font-size: 0.8rem;
      margin-bottom: 6px;

      &:last-child {
        margin-bottom: 0;
      }

      .info-label {
        width: 80px;
        flex-shrink: 0;
        font-weight: 600;
        color: @text-muted;
      }

      .info-value {
        color: @primary-dark;
        line-height: 1.4;
      }
    }
  }

  .stats {
    margin-top: 0.5rem;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;

      .stat-name {
        width: 70px;
        font-size: 0.8rem;
        font-weight: 500;
        color: @text-muted;
      }

      .stat-bar {
        flex: 1;
        height: 6px;
        background: #e2e8f0;
        border-radius: 10px;
        overflow: hidden;

        .stat-fill {
          height: 100%;
          background: @accent-blue;
          border-radius: 10px;
          width: 0%;
          transition: width 0.3s;

          &.usage {
            background: #8b5cf6;
          }
        }
      }

      .stat-value {
        width: 40px;
        font-size: 0.8rem;
        font-weight: 600;
        color: @primary-dark;
        text-align: right;
      }
    }
  }
}

.footer-note {
  margin-top: 1.5rem;
  text-align: center;
  border-top: 1px solid @border-light;
  padding-top: 1.5rem;

  span {
    background: #f1f5f9;
    padding: 0.4rem 1.8rem;
    border-radius: 60px;
    color: @text-muted;
    font-size: 0.9rem;
    border: 1px solid @border-light;
    display: inline-block;
  }
}
</style>
