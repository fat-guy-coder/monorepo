<template>
  <div class="frontend-overview">
    <header class="page-header">
      <div class="header-content">
        <h1>什么是前端开发</h1>
        <p class="subtitle">前端开发是指创建Web网站或Web应用程序用户界面（UI）和用户体验（UX）的过程，涵盖用户在浏览器中看到并与之交互的所有内容。</p>
      </div>
    </header>

    <main class="content">
      <section class="definition-section">
        <h2 class="section-title">什么是前端开发？</h2>
        <div class="definition-content">
          <div class="definition-text">
            <p>前端开发（Front-end Development）是指创建Web网站或Web应用程序用户界面（UI）和用户体验（UX）的过程，涵盖用户在浏览器中看到并与之交互的所有内容。</p>
            <div class="analogy-card">
              <div class="analogy-icon">🏗️</div>
              <div class="analogy-content">
                <h3>建筑类比</h3>
                <p>如果把网站比作一栋建筑，前端就是建筑的<strong>外观设计、室内装修和用户动线</strong>，而后端则是建筑的<strong>地基、结构和管道系统</strong>。</p>
              </div>
            </div>
          </div>
          <div class="definition-visual">
            <div class="layers-diagram">
              <div class="layer user-layer">
                <div class="layer-icon">👤</div>
                <div class="layer-content">
                  <h4>用户界面</h4>
                  <p>用户直接交互的部分</p>
                </div>
              </div>
              <div class="layer-arrow">↓</div>
              <div class="layer frontend-layer">
                <div class="layer-icon">🎨</div>
                <div class="layer-content">
                  <h4>前端开发</h4>
                  <p>HTML + CSS + JavaScript</p>
                </div>
              </div>
              <div class="layer-arrow">↓</div>
              <div class="layer backend-layer">
                <div class="layer-icon">⚙️</div>
                <div class="layer-content">
                  <h4>后端服务</h4>
                  <p>服务器 + 数据库 + API</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="functions-section">
        <h2 class="section-title">前端开发的核心功能</h2>
        <div class="functions-grid">
          <div
            v-for="func in coreFunctions"
            :key="func.id"
            class="function-card"
            :class="func.category"
          >
            <div class="func-icon">{{ func.icon }}</div>
            <h3>{{ func.title }}</h3>
            <p>{{ func.description }}</p>
            <div class="func-examples">
              <span
                v-for="example in func.examples"
                :key="example"
                class="example-tag"
              >{{ example }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="role-section">
        <h2 class="section-title">前端在互联网中的角色</h2>
        <div class="role-content">
          <div class="role-intro">
            <p>前端开发者在互联网生态系统中扮演着<strong>用户体验的守护者</strong>和<strong>业务价值的传递者</strong>角色，是连接用户与技术的桥梁。</p>
          </div>

          <div class="role-ecosystem">
            <h3>互联网生态系统中的位置</h3>
            <div class="ecosystem-diagram">
              <div class="ecosystem-level">
                <div class="level-label">用户层</div>
                <div class="level-content">
                  <div class="ecosystem-item user-item">
                    <div class="item-icon">👥</div>
                    <div class="item-text">终端用户</div>
                  </div>
                </div>
              </div>

              <div class="connection-arrow">↕</div>

              <div class="ecosystem-level">
                <div class="level-label">表现层</div>
                <div class="level-content">
                  <div class="ecosystem-item frontend-item featured">
                    <div class="item-icon">💻</div>
                    <div class="item-text">
                      <strong>前端开发</strong>
                      <span>用户界面 & 交互</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="connection-arrow">↕</div>

              <div class="ecosystem-level">
                <div class="level-label">服务层</div>
                <div class="level-content">
                  <div class="ecosystem-item backend-item">
                    <div class="item-icon">🖥️</div>
                    <div class="item-text">后端开发</div>
                  </div>
                  <div class="ecosystem-item database-item">
                    <div class="item-icon">🗄️</div>
                    <div class="item-text">数据库</div>
                  </div>
                </div>
              </div>

              <div class="connection-arrow">↕</div>

              <div class="ecosystem-level">
                <div class="level-label">基础设施</div>
                <div class="level-content">
                  <div class="ecosystem-item infra-item">
                    <div class="item-icon">🌐</div>
                    <div class="item-text">网络 & 服务器</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="responsibilities-grid">
            <h3>核心职责</h3>
            <div class="responsibilities-list">
              <div
                v-for="resp in responsibilities"
                :key="resp.id"
                class="responsibility-item"
              >
                <div class="resp-icon">{{ resp.icon }}</div>
                <div class="resp-content">
                  <h4>{{ resp.title }}</h4>
                  <p>{{ resp.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="employment-section">
        <h2 class="section-title">就业现状分析</h2>
        <div class="employment-content">
          <div class="market-overview">
            <div class="overview-stats">
              <div class="market-stat">
                <div class="stat-icon">📈</div>
                <div class="stat-content">
                  <span class="stat-number">暂无数据</span>
                  <span class="stat-label">就业率</span>
                </div>
              </div>
              <div class="market-stat">
                <div class="stat-icon">🏙️</div>
                <div class="stat-content">
                  <span class="stat-number">暂无数据</span>
                  <span class="stat-label">岗位缺口</span>
                </div>
              </div>
              <div class="market-stat">
                <div class="stat-icon">🔄</div>
                <div class="stat-content">
                  <span class="stat-number">暂无数据</span>
                  <span class="stat-label">年增长率</span>
                </div>
              </div>
            </div>

            <div class="demand-analysis">
              <h3>市场需求特点</h3>
              <div class="demand-features">
                <div
                  v-for="feature in demandFeatures"
                  :key="feature.id"
                  class="demand-feature"
                >
                  <div class="feature-icon">{{ feature.icon }}</div>
                  <div class="feature-content">
                    <h4>{{ feature.title }}</h4>
                    <p>{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="challenges-opportunities">
            <div class="challenges-card">
              <h3>面临的挑战</h3>
              <div class="challenges-list">
                <div
                  v-for="challenge in challenges"
                  :key="challenge.id"
                  class="challenge-item"
                >
                  <span class="challenge-icon">⚠️</span>
                  <span class="challenge-text">{{ challenge.text }}</span>
                </div>
              </div>
            </div>

            <div class="opportunities-card">
              <h3>发展机遇</h3>
              <div class="opportunities-list">
                <div
                  v-for="opportunity in opportunities"
                  :key="opportunity.id"
                  class="opportunity-item"
                >
                  <span class="opportunity-icon">🚀</span>
                  <span class="opportunity-text">{{ opportunity.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="tech-stack-section">
        <h2 class="section-title">技术栈全景</h2>
        <div class="tech-stack-content">
          <div class="stack-categories">
            <div
              v-for="category in techCategories"
              :key="category.id"
              class="tech-category"
            >
              <div class="category-header">
                <h3>{{ category.name }}</h3>
                <span class="category-count">{{ category.technologies.length }}项技术</span>
              </div>
              <div class="technologies-grid">
                <div
                  v-for="tech in category.technologies"
                  :key="tech.name"
                  class="technology-card"
                  :class="{ trending: tech.trending, essential: tech.essential }"
                >
                  <div class="tech-icon">{{ tech.icon }}</div>
                  <div class="tech-info">
                    <h4>{{ tech.name }}</h4>
                    <p>{{ tech.description }}</p>
                  </div>
                  <div class="tech-meta">
                    <span class="tech-trend" v-if="tech.trending">🔥 热门</span>
                    <span class="tech-essential" v-if="tech.essential">⭐ 核心</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="career-path-section">
        <h2 class="section-title">职业发展路径</h2>
        <div class="career-path-content">
          <div class="path-timeline">
            <div
              v-for="stage in careerStages"
              :key="stage.id"
              class="career-stage"
              :class="stage.level"
            >
              <div class="stage-marker">
                <div class="marker-icon">{{ stage.icon }}</div>
                <div class="marker-line"></div>
              </div>
              <div class="stage-content">
                <h3>{{ stage.title }}</h3>
                <p class="stage-duration">{{ stage.duration }}</p>
                <p class="stage-description">{{ stage.description }}</p>
                <div class="stage-skills">
                  <h4>核心技能</h4>
                  <div class="skills-list">
                    <span
                      v-for="skill in stage.skills"
                      :key="skill"
                      class="skill-tag"
                    >{{ skill }}</span>
                  </div>
                </div>
                <div class="stage-salary">
                  <span class="salary-range">{{ stage.salary }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="conclusion-section">
        <h2 class="section-title">总结与展望</h2>
        <div class="conclusion-content">
          <div class="key-takeaways">
            <h3>核心要点</h3>
            <div class="takeaways-grid">
              <div class="takeaway-card">
                <h4>🎯 有市场需求</h4>
                <p>前端开发岗位需求持续增长，有较好就业前景，<b>但是竞争也很激烈</b></p>
              </div>
              <div class="takeaway-card">
                <h4>💰 薪资水平可观</h4>
                <p>从初级到专家，薪资增长空间巨大</p>
              </div>
              <div class="takeaway-card">
                <h4>🚀 技术迭代快速</h4>
                <p>需要持续学习新技术和框架</p>
              </div>
              <div class="takeaway-card">
                <h4>🌉 连接用户与业务</h4>
                <p>在互联网生态中扮演关键桥梁角色</p>
              </div>
            </div>
          </div>

          <div class="future-outlook">
            <h3>未来展望</h3>
            <div class="outlook-content">
              <p>随着Web技术的不断发展，前端开发正在从传统的页面制作向<strong>全栈开发、工程化、智能化</strong>方向演进。未来前端开发者需要掌握更广泛的技术栈，具备更强的工程能力和业务理解能力。</p>
              <div class="future-trends">
                <div class="trend-item">
                  <span class="trend-icon">🤖</span>
                  <span class="trend-text">AI辅助开发</span>
                </div>
                <div class="trend-item">
                  <span class="trend-icon">📱</span>
                  <span class="trend-text">跨端开发</span>
                </div>
                <div class="trend-item">
                  <span class="trend-icon">⚡</span>
                  <span class="trend-text">性能极致优化</span>
                </div>
                <div class="trend-item">
                  <span class="trend-icon">🎨</span>
                  <span class="trend-text">体验设计工程化</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 核心功能数据
const coreFunctions = ref([
  {
    id: 'ui-development',
    title: '界面开发',
    icon: '🎨',
    description: '将设计稿转化为可交互的网页界面，确保视觉还原度和用户体验',
    category: 'design',
    examples: ['页面布局', '组件开发', '响应式设计', '动画效果']
  },
  {
    id: 'interaction',
    title: '交互实现',
    icon: '🔄',
    description: '实现用户与界面的交互逻辑，提供流畅的用户操作体验',
    category: 'interaction',
    examples: ['事件处理', '表单验证', '页面跳转', '状态管理']
  },
  {
    id: 'performance',
    title: '性能优化',
    icon: '⚡',
    description: '优化页面加载速度和运行性能，提升用户体验和SEO效果',
    category: 'performance',
    examples: ['代码分割', '懒加载', '缓存策略', '渲染优化']
  },
  {
    id: 'compatibility',
    title: '兼容性处理',
    icon: '🌐',
    description: '确保网站在不同浏览器和设备上的正常显示和功能',
    category: 'compatibility',
    examples: ['浏览器适配', '设备适配', '分辨率适配', '功能降级']
  },
  {
    id: 'engineering',
    title: '工程化建设',
    icon: '🔧',
    description: '构建高效的前端开发流程和工具链，提升团队协作效率',
    category: 'engineering',
    examples: ['构建工具', '自动化部署', '代码规范', '质量保障']
  },
  {
    id: 'accessibility',
    title: '可访问性',
    icon: '♿',
    description: '确保网站对所有用户（包括残障人士）都可访问和使用',
    category: 'accessibility',
    examples: ['语义化HTML', '键盘导航', '屏幕阅读器', '色彩对比度']
  }
])

// 职责数据
const responsibilities = ref([
  {
    id: 'ui-implementation',
    title: 'UI实现',
    icon: '📐',
    description: '将设计师的视觉稿精确转化为可工作的网页界面'
  },
  {
    id: 'ux-optimization',
    title: '体验优化',
    icon: '😊',
    description: '优化用户交互流程，提升用户满意度和转化率'
  },
  {
    id: 'cross-platform',
    title: '跨平台适配',
    icon: '📱',
    description: '确保产品在不同设备和浏览器上的兼容性'
  },
  {
    id: 'performance-tuning',
    title: '性能调优',
    icon: '🚀',
    description: '优化页面加载速度和运行性能'
  },
  {
    id: 'tech-selection',
    title: '技术选型',
    icon: '🛠️',
    description: '选择合适的技术栈和框架满足项目需求'
  },
  {
    id: 'team-collaboration',
    title: '团队协作',
    icon: '👥',
    description: '与设计师、后端工程师和产品经理紧密合作'
  }
])

// 薪资趋势数据
const salaryTrends = ref([
  { year: '2020', growth: 60, increase: 12 },
  { year: '2021', growth: 70, increase: 15 },
  { year: '2022', growth: 80, increase: 14 },
  { year: '2023', growth: 90, increase: 13 },
  { year: '2024', growth: 100, increase: 16 }
])

// 薪资影响因素
const salaryFactors = ref([
  {
    id: 'experience',
    name: '工作经验',
    impact: '高',
    description: '工作年限和技术积累直接影响薪资水平',
    examples: ['1-3年', '3-5年', '5-8年', '8年以上']
  },
  {
    id: 'location',
    name: '城市地区',
    impact: '高',
    description: '一线城市薪资显著高于其他地区',
    examples: ['北京', '上海', '深圳', '杭州']
  },
  {
    id: 'company',
    name: '公司规模',
    impact: '中高',
    description: '大厂和独角兽企业薪资更具竞争力',
    examples: ['大厂', '独角兽', '中型企业', '创业公司']
  },
  {
    id: 'skills',
    name: '技术栈',
    impact: '中',
    description: '掌握热门和稀缺技术能获得更高薪资',
    examples: ['React', 'Vue', 'Node.js', 'TypeScript']
  },
  {
    id: 'education',
    name: '学历背景',
    impact: '中低',
    description: '名校和计算机相关专业有一定优势',
    examples: ['985/211', '计算机专业', '硕士学历']
  },
  {
    id: 'english',
    name: '英语能力',
    impact: '低',
    description: '在外企或需要阅读英文文档时有帮助',
    examples: ['技术文档', '国际团队', '开源贡献']
  }
])

// 市场需求特点
const demandFeatures = ref([
  {
    id: 'high-demand',
    title: '需求',
    icon: '📈',
    description: '互联网行业持续发展，前端岗位需求量较大，且稳定增长'
  },
  {
    id: 'diverse-industry',
    title: '行业广泛',
    icon: '🏢',
    description: '几乎所有互联网相关企业都需要前端开发人才'
  },
  {
    id: 'tech-evolution',
    title: '技术迭代快',
    icon: '🔄',
    description: '新技术和框架不断涌现，需要持续学习能力'
  },
  {
    id: 'practical-skills',
    title: '重实践能力',
    icon: '💻',
    description: '企业更看重实际项目经验和问题解决能力'
  }
])

// 挑战数据
const challenges = ref([
  { id: 1, text: '技术更新迭代速度快，学习压力大' },
  { id: 2, text: '浏览器兼容性问题复杂多样' },
  { id: 3, text: '性能优化要求越来越高' },
  { id: 4, text: '用户体验标准不断提升' },
  { id: 5, text: '跨端开发技术要求全面' }
])

// 机遇数据
const opportunities = ref([
  { id: 1, text: 'Web技术应用场景不断扩展' },
  { id: 2, text: '前端工程化带来新的发展空间' },
  { id: 3, text: '全栈开发成为趋势' },
  { id: 4, text: 'AI和可视化等新领域需求增长' },
  { id: 5, text: '远程工作和自由职业机会增多' }
])

// 技术栈分类
const techCategories = ref([
  {
    id: 'foundation',
    name: '基础技术',
    technologies: [
      {
        name: 'HTML5',
        icon: '🌐',
        description: '网页结构标记语言',
        essential: true,
        trending: false
      },
      {
        name: 'CSS3',
        icon: '🎨',
        description: '样式设计和布局',
        essential: true,
        trending: false
      },
      {
        name: 'JavaScript',
        icon: '⚡',
        description: '网页交互编程语言',
        essential: true,
        trending: false
      },
      {
        name: 'TypeScript',
        icon: '📘',
        description: 'JavaScript的超集',
        essential: false,
        trending: true
      }
    ]
  },
  {
    id: 'frameworks',
    name: '主流框架',
    technologies: [
      {
        name: 'React',
        icon: '⚛️',
        description: 'Facebook开发的UI库',
        essential: false,
        trending: true
      },
      {
        name: 'Vue.js',
        icon: '🟢',
        description: '渐进式JavaScript框架',
        essential: false,
        trending: true
      },
      {
        name: 'Angular',
        icon: '🔴',
        description: 'Google开发的全功能框架',
        essential: false,
        trending: false
      },
      {
        name: 'Svelte',
        icon: '🟠',
        description: '编译时框架',
        essential: false,
        trending: true
      }
    ]
  },
  {
    id: 'tools',
    name: '开发工具',
    technologies: [
      {
        name: 'Webpack',
        icon: '📦',
        description: '模块打包工具',
        essential: false,
        trending: false
      },
      {
        name: 'Vite',
        icon: '⚡',
        description: '新一代构建工具',
        essential: false,
        trending: true
      },
      {
        name: 'Git',
        icon: '📝',
        description: '版本控制系统',
        essential: true,
        trending: false
      },
      {
        name: 'VS Code',
        icon: '🔵',
        description: '代码编辑器',
        essential: false,
        trending: false
      }
    ]
  },
  {
    id: 'advanced',
    name: '进阶技术',
    technologies: [
      {
        name: 'Node.js',
        icon: '🟢',
        description: 'JavaScript运行时',
        essential: false,
        trending: true
      },
      {
        name: 'WebGL',
        icon: '🎮',
        description: '3D图形渲染',
        essential: false,
        trending: false
      },
      {
        name: 'PWA',
        icon: '📱',
        description: '渐进式Web应用',
        essential: false,
        trending: true
      },
      {
        name: 'WebAssembly',
        icon: '🚀',
        description: '高性能Web应用',
        essential: false,
        trending: true
      }
    ]
  }
])

// 职业发展阶段
const careerStages = ref([
  {
    id: 'junior',
    title: '初级前端工程师',
    level: 'junior',
    icon: '🎓',
    duration: '0-2年',
    description: '掌握基础技术，能够完成简单的页面开发和功能实现',
    skills: ['HTML/CSS', 'JavaScript基础', '响应式布局', '基础框架使用'],
    salary: '8-15K'
  },
  {
    id: 'middle',
    title: '中级前端工程师',
    level: 'middle',
    icon: '💼',
    duration: '2-4年',
    description: '熟练使用主流框架，能够独立完成复杂模块开发',
    skills: ['Vue/React深入', '工程化工具', '性能优化', '团队协作'],
    salary: '15-30K'
  },
  {
    id: 'senior',
    title: '高级前端工程师',
    level: 'senior',
    icon: '🎯',
    duration: '4-6年',
    description: '具备架构设计能力，能够主导技术选型和团队建设',
    skills: ['架构设计', '技术规划', '性能调优', '跨端开发'],
    salary: '30-50K'
  },
  {
    id: 'expert',
    title: '前端专家/架构师',
    level: 'expert',
    icon: '🏆',
    duration: '6年以上',
    description: '在前端领域有深厚积累，能够推动技术创新和团队发展',
    skills: ['技术战略', '创新研究', '团队管理', '行业影响'],
    salary: '50K+'
  }
])
</script>

<style lang="less" scoped>
.frontend-overview {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: #2d3748;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="0,0 1000,50 1000,100 0,100"/></svg>') no-repeat;
    background-size: cover;
  }

  .header-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #fff 0%, #dbeafe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .header-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 2rem;

    .stat {
      text-align: center;

      .stat-number {
        display: block;
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.9rem;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  margin-bottom: 3rem;
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #2d3748;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 2px;
  }
}

// 定义区域样式
.definition-section {
  .definition-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    align-items: start;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .definition-text {
    p {
      font-size: 1.1rem;
      color: #4a5568;
      line-height: 1.7;
      margin-bottom: 2rem;
    }
  }

  .analogy-card {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem;
    background: #f0f9ff;
    border-radius: 12px;
    border-left: 4px solid #3b82f6;

    .analogy-icon {
      font-size: 2.5rem;
      flex-shrink: 0;
    }

    .analogy-content {
      h3 {
        margin: 0 0 0.5rem 0;
        color: #2d3748;
        font-size: 1.2rem;
      }

      p {
        margin: 0;
        color: #4a5568;
        line-height: 1.5;

        strong {
          color: #1d4ed8;
        }
      }
    }
  }

  .definition-visual {
    .layers-diagram {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .layer {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;
      border: 2px solid #e2e8f0;

      &.frontend-layer {
        border-color: #3b82f6;
        background: #eff6ff;
      }

      .layer-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
      }

      .layer-content {
        h4 {
          margin: 0 0 0.25rem 0;
          color: #2d3748;
          font-size: 1rem;
        }

        p {
          margin: 0;
          color: #6b7280;
          font-size: 0.9rem;
        }
      }
    }

    .layer-arrow {
      text-align: center;
      color: #3b82f6;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
}

// 功能区域样式
.functions-section {
  .functions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .function-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;
    border-left: 4px solid;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    &.design {
      border-left-color: #8b5cf6;
    }

    &.interaction {
      border-left-color: #10b981;
    }

    &.performance {
      border-left-color: #f59e0b;
    }

    &.compatibility {
      border-left-color: #ef4444;
    }

    &.engineering {
      border-left-color: #3b82f6;
    }

    &.accessibility {
      border-left-color: #6b7280;
    }

    .func-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #2d3748;
    }

    p {
      color: #4a5568;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .func-examples {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .example-tag {
      background: white;
      color: #4a5568;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      border: 1px solid #e2e8f0;
    }
  }
}

// 角色区域样式
.role-section {
  .role-intro {
    text-align: center;
    margin-bottom: 2rem;

    p {
      font-size: 1.1rem;
      color: #4a5568;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.7;

      strong {
        color: #1d4ed8;
      }
    }
  }

  .role-ecosystem {
    margin-bottom: 3rem;

    h3 {
      text-align: center;
      margin-bottom: 2rem;
      color: #2d3748;
    }

    .ecosystem-diagram {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .ecosystem-level {
      width: 100%;
      text-align: center;
    }

    .level-label {
      font-size: 0.9rem;
      color: #6b7280;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .level-content {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .ecosystem-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      background: #f8fafc;
      border-radius: 8px;
      border: 2px solid #e2e8f0;
      min-width: 180px;

      &.featured {
        border-color: #3b82f6;
        background: #eff6ff;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
      }

      .item-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
      }

      .item-text {
        text-align: left;

        strong {
          display: block;
          color: #2d3748;
          font-size: 1rem;
        }

        span {
          color: #6b7280;
          font-size: 0.8rem;
        }
      }
    }

    .connection-arrow {
      color: #3b82f6;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }

  .responsibilities-grid {
    h3 {
      text-align: center;
      margin-bottom: 2rem;
      color: #2d3748;
    }

    .responsibilities-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .responsibility-item {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;

      .resp-icon {
        font-size: 2rem;
        flex-shrink: 0;
      }

      .resp-content {
        flex: 1;

        h4 {
          margin: 0 0 0.5rem 0;
          color: #2d3748;
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          color: #4a5568;
          line-height: 1.5;
        }
      }
    }
  }
}

// 薪资区域样式
.salary-section {
  .salary-overview {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .overview-card, .trend-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;

    h3 {
      margin: 0 0 1.5rem 0;
      color: #2d3748;
      text-align: center;
    }
  }

  .salary-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .salary-stat {
    text-align: center;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e2e8f0;

    .stat-value {
      display: block;
      font-size: 1.3rem;
      font-weight: 700;
      color: #1d4ed8;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #6b7280;
    }
  }

  .trend-chart {
    display: flex;
    justify-content: space-around;
    align-items: end;
    height: 200px;
    margin-bottom: 1rem;
  }

  .trend-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    background: linear-gradient(to top, #3b82f6, #60a5fa);
    border-radius: 4px 4px 0 0;
    position: relative;

    .trend-value {
      position: absolute;
      top: -25px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #1d4ed8;
    }

    .trend-year {
      position: absolute;
      bottom: -25px;
      font-size: 0.9rem;
      color: #6b7280;
    }
  }

  .trend-note {
    text-align: center;
    color: #6b7280;
    font-size: 0.9rem;
    margin: 0;
  }

  .factors-analysis {
    h3 {
      text-align: center;
      margin-bottom: 2rem;
      color: #2d3748;
    }

    .factors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .factor-card {
      background: #f8fafc;
      border-radius: 8px;
      padding: 1.5rem;
      border-left: 4px solid;

      &.高 {
        border-left-color: #ef4444;
      }

      &.中高 {
        border-left-color: #f59e0b;
      }

      &.中 {
        border-left-color: #10b981;
      }

      &.中低 {
        border-left-color: #3b82f6;
      }

      &.低 {
        border-left-color: #6b7280;
      }

      .factor-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;

        h4 {
          margin: 0;
          color: #2d3748;
          font-size: 1.1rem;
        }

        .impact-level {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;

          .factor-card.高 & {
            background: #fee2e2;
            color: #991b1b;
          }

          .factor-card.中高 & {
            background: #fef3c7;
            color: #92400e;
          }

          .factor-card.中 & {
            background: #d1fae5;
            color: #065f46;
          }

          .factor-card.中低 & {
            background: #dbeafe;
            color: #3730a3;
          }

          .factor-card.低 & {
            background: #e5e7eb;
            color: #374151;
          }
        }
      }

      p {
        color: #4a5568;
        margin-bottom: 1rem;
        line-height: 1.5;
      }

      .factor-examples {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .example-tag {
        background: white;
        color: #4a5568;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
        border: 1px solid #e2e8f0;
      }
    }
  }
}

// 就业现状样式
.employment-section {
  .market-overview {
    margin-bottom: 3rem;
  }

  .overview-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .market-stat {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
    text-align: left;

    .stat-icon {
      font-size: 2.5rem;
      flex-shrink: 0;
    }

    .stat-content {
      .stat-number {
        display: block;
        font-size: 1.8rem;
        font-weight: 700;
        color: #1d4ed8;
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.9rem;
        color: #6b7280;
      }
    }
  }

  .demand-analysis {
    h3 {
      text-align: center;
      margin-bottom: 2rem;
      color: #2d3748;
    }

    .demand-features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .demand-feature {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;

      .feature-icon {
        font-size: 2rem;
        flex-shrink: 0;
      }

      .feature-content {
        flex: 1;

        h4 {
          margin: 0 0 0.5rem 0;
          color: #2d3748;
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          color: #4a5568;
          line-height: 1.5;
        }
      }
    }
  }

  .challenges-opportunities {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .challenges-card, .opportunities-card {
    background: #f8fafc;
    border-radius: 12px;
    padding: 1.5rem;

    h3 {
      margin: 0 0 1.5rem 0;
      color: #2d3748;
      text-align: center;
    }
  }

  .challenges-list, .opportunities-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .challenge-item, .opportunity-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e2e8f0;

    .challenge-icon, .opportunity-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
      margin-top: 0.1rem;
    }

    .challenge-text, .opportunity-text {
      color: #4a5568;
      line-height: 1.5;
    }
  }

  .challenges-card {
    border-left: 4px solid #ef4444;
  }

  .opportunities-card {
    border-left: 4px solid #10b981;
  }
}

// 技术栈样式
.tech-stack-section {
  .stack-categories {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .tech-category {
    .category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e2e8f0;

      h3 {
        margin: 0;
        color: #2d3748;
        font-size: 1.4rem;
      }

      .category-count {
        background: #e2e8f0;
        color: #4a5568;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }

    .technologies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }
  }

  .technology-card {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &.trending {
      border-color: #f59e0b;
      background: #fffbeb;
    }

    &.essential {
      border-color: #10b981;
      background: #ecfdf5;
    }

    .tech-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .tech-info {
      flex: 1;

      h4 {
        margin: 0 0 0.5rem 0;
        color: #2d3748;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        color: #4a5568;
        font-size: 0.9rem;
        line-height: 1.4;
      }
    }

    .tech-meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      .tech-trend, .tech-essential {
        padding: 0.25rem 0.5rem;
        border-radius: 8px;
        font-size: 0.7rem;
        font-weight: 600;
        text-align: center;
      }

      .tech-trend {
        background: #fef3c7;
        color: #92400e;
      }

      .tech-essential {
        background: #d1fae5;
        color: #065f46;
      }
    }
  }
}

// 职业路径样式
.career-path-section {
  .path-timeline {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 30px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
      z-index: 1;
    }
  }

  .career-stage {
    display: flex;
    gap: 1.5rem;
    position: relative;
    z-index: 2;

    .stage-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      .marker-icon {
        width: 60px;
        height: 60px;
        background: white;
        border: 3px solid;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

        .career-stage.junior & {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .career-stage.middle & {
          border-color: #10b981;
          background: #ecfdf5;
        }

        .career-stage.senior & {
          border-color: #f59e0b;
          background: #fffbeb;
        }

        .career-stage.expert & {
          border-color: #8b5cf6;
          background: #faf5ff;
        }
      }

      .marker-line {
        flex: 1;
        width: 2px;
        background: #e2e8f0;
      }

      &:last-child .marker-line {
        display: none;
      }
    }

    .stage-content {
      flex: 1;
      background: #f8fafc;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;

      h3 {
        margin: 0 0 0.5rem 0;
        color: #2d3748;
        font-size: 1.4rem;
      }

      .stage-duration {
        color: #6b7280;
        font-weight: 500;
        margin-bottom: 1rem;
      }

      .stage-description {
        color: #4a5568;
        margin-bottom: 1.5rem;
        line-height: 1.5;
      }

      .stage-skills {
        margin-bottom: 1.5rem;

        h4 {
          margin: 0 0 0.75rem 0;
          color: #2d3748;
          font-size: 1rem;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          background: white;
          color: #4a5568;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid #e2e8f0;
        }
      }

      .stage-salary {
        .salary-range {
          background: #3b82f6;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 1rem;
        }
      }
    }
  }
}

// 总结区域样式
.conclusion-section {
  .conclusion-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .key-takeaways {
    h3 {
      margin-bottom: 1.5rem;
      color: #2d3748;
    }

    .takeaways-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .takeaway-card {
      background: #f8fafc;
      border-radius: 8px;
      padding: 1.5rem;
      border-left: 4px solid #3b82f6;

      h4 {
        margin: 0 0 0.5rem 0;
        color: #2d3748;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        color: #4a5568;
        line-height: 1.5;
      }
    }
  }

  .future-outlook {
    h3 {
      margin-bottom: 1.5rem;
      color: #2d3748;
    }

    .outlook-content {
      p {
        color: #4a5568;
        line-height: 1.6;
        margin-bottom: 1.5rem;

        strong {
          color: #1d4ed8;
        }
      }
    }

    .future-trends {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .trend-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;

      .trend-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
      }

      .trend-text {
        color: #4a5568;
        font-weight: 500;
      }
    }
  }
}

// 页脚样式
.page-footer {
  background: #2d3748;
  color: white;
  padding: 3rem 2rem;
  margin-top: 4rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  .footer-info {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #fff;
    }

    p {
      color: #cbd5e0;
      line-height: 1.6;
      margin: 0;
    }
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;

    @media (max-width: 768px) {
      justify-content: center;
    }

    a {
      color: #cbd5e0;
      text-decoration: none;
      transition: color 0.3s ease;
      font-weight: 500;

      &:hover {
        color: #fff;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem;
  }

  .content {
    padding: 1rem;
  }

  section {
    padding: 1.5rem;
  }

  .header-stats {
    gap: 1.5rem !important;

    .stat-number {
      font-size: 1.8rem !important;
    }
  }

  .definition-content {
    grid-template-columns: 1fr !important;
  }

  .role-ecosystem .ecosystem-item {
    min-width: 140px !important;
  }

  .path-timeline::before {
    left: 25px !important;
  }

  .career-stage .stage-marker .marker-icon {
    width: 50px !important;
    height: 50px !important;
    font-size: 1.2rem !important;
  }
}
</style>
