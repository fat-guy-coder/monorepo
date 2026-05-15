<template>
  <div class="cpu-intro">
    <!-- 导航栏 -->
    <nav class="nav-bar">
      <span class="nav-logo">🔲 CPU 深度解析</span>
      <span v-for="s in sections" :key="s.id" class="nav-link" :class="{ active: activeSection === s.id }"
        @click="scrollTo(s.id)">
        {{ s.label }}
      </span>
    </nav>

    <!-- 主内容 -->
    <main class="main-container">
      <!-- Hero 区域 -->
      <section id="hero" class="hero-section">
        <div class="hero-badge">Central Processing Unit</div>
        <h1 class="hero-title">CPU：计算机的灵魂与心跳</h1>
        <p class="hero-subtitle">
          从一粒沙子到每秒数十亿次运算的奇迹——CPU 凝聚了半导体物理、数字逻辑与微架构设计的全部精华。
        </p>
      </section>

      <!-- 发展历史 -->
      <section id="history" class="card">
        <div class="card-header">
          <div class="card-icon icon-blue">📜</div>
          <div>
            <div class="card-title">CPU 发展历史</div>
            <div class="card-subtitle">从 2300 个晶体管到数百亿——半个世纪的飞跃</div>
          </div>
        </div>
        <div class="timeline">
          <div v-for="item in timelineData" :key="item.year" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-title">{{ item.title }}</div>
            <div class="timeline-desc">{{ item.desc }}</div>
          </div>
        </div>
      </section>

      <!-- CPU 构成 -->
      <section id="structure" class="card">
        <div class="card-header">
          <div class="card-icon icon-purple">🏗️</div>
          <div>
            <div class="card-title">CPU 内部构成</div>
            <div class="card-subtitle">六大核心组件协同工作，缺一不可</div>
          </div>
        </div>
        <div class="cpu-diagram">
          <div v-for="comp in cpuComponents" :key="comp.name" class="cpu-block">
            <div class="cpu-block-name">
              <span class="cpu-block-dot" :style="{ background: comp.color }"></span>
              {{ comp.name }}
            </div>
            <div class="cpu-block-desc">{{ comp.desc }}</div>
          </div>
        </div>
        <div class="highlight-box highlight-blue">
          💡 <strong>关键认知：</strong>现代 CPU 中，这些组件高度集成在单个芯片上。以 AMD Zen 4 为例，一个 CCD 芯片内包含 8 个核心，每个核心都有独立的 ALU、寄存器和 L1/L2
          缓存，而 L3 缓存及内存控制器则在多个核心间共享。
        </div>
      </section>

      <!-- 从硅到 CPU -->
      <section id="silicon" class="card">
        <div class="card-header">
          <div class="card-icon icon-orange">🏭</div>
          <div>
            <div class="card-title">从硅到 CPU：芯片制造全流程</div>
            <div class="card-subtitle">将沙子变成计算引擎——纳米级的精密工程</div>
          </div>
        </div>
        <div class="highlight-box">
          🔬 现代 CPU 制造是人类历史上最精密的工艺——在指甲盖大小的硅片上集成数百亿个晶体管，每个晶体管的尺寸仅几纳米（约为头发丝直径的十万分之一）。
        </div>
        <ol class="step-list">
          <li v-for="(step, idx) in manufacturingSteps" :key="idx">
            <strong>{{ step.title }}</strong>
            <span>{{ step.desc }}</span>
          </li>
        </ol>
      </section>

      <!-- 计算原理 -->
      <section id="computation" class="card">
        <div class="card-header">
          <div class="card-icon icon-green">⚡</div>
          <div>
            <div class="card-title">CPU 如何实现计算</div>
            <div class="card-subtitle">从晶体管开关到指令执行——计算的本质</div>
          </div>
        </div>

        <h3 class="sub-heading">1. 晶体管与逻辑门</h3>
        <p class="text-block">
          CPU 最底层是由 MOSFET（金属-氧化物-半导体场效应晶体管）构成的。通过控制栅极电压，晶体管可以打开或关闭电流，实现“开/关”两种状态，对应二进制的 1 和 0。
          多个晶体管组合成 CMOS 逻辑门（与、或、非），这些逻辑门再构成加法器、锁存器等基本功能单元。
        </p>

        <h3 class="sub-heading">2. 指令执行周期（取指-译码-执行-访存-写回）</h3>
        <div class="instruction-cycle">
          <div class="cycle-step">
            <div class="cycle-step-num">①</div>
            <div class="cycle-step-label">取指</div>
            <div class="cycle-step-desc">从内存读取指令</div>
          </div>
          <div class="cycle-step-arrow">→</div>
          <div class="cycle-step">
            <div class="cycle-step-num">②</div>
            <div class="cycle-step-label">译码</div>
            <div class="cycle-step-desc">解析操作码与操作数</div>
          </div>
          <div class="cycle-step-arrow">→</div>
          <div class="cycle-step">
            <div class="cycle-step-num">③</div>
            <div class="cycle-step-label">执行</div>
            <div class="cycle-step-desc">ALU 进行运算</div>
          </div>
          <div class="cycle-step-arrow">→</div>
          <div class="cycle-step">
            <div class="cycle-step-num">④</div>
            <div class="cycle-step-label">访存</div>
            <div class="cycle-step-desc">必要时读写内存</div>
          </div>
          <div class="cycle-step-arrow">→</div>
          <div class="cycle-step">
            <div class="cycle-step-num">⑤</div>
            <div class="cycle-step-label">写回</div>
            <div class="cycle-step-desc">结果写回寄存器</div>
          </div>
        </div>

        <h3 class="sub-heading">3. ALU 的简单例子：加法器</h3>
        <p class="text-block">
          加法器是 ALU 的核心。一个 1 位全加器接收两个输入位 A、B 和一个进位输入 Cin，输出和 S 与进位 Cout。将 32 个这样的全加器级联起来，就能实现 32 位整数的加法。现代 CPU
          使用超前进位等优化技术，在数个时钟周期内即可完成复杂运算。
        </p>
        <div class="highlight-box highlight-green">
          ⚙️ 最终，所有复杂的程序——从操作系统到游戏——都会被编译成一串串二进制指令，CPU 只是机械地不断重复“取指-执行”这个循环，速度高达每秒数十亿次。
        </div>
      </section>

      <!-- 学习路线图 -->
      <section id="roadmap" class="card">
        <div class="card-header">
          <div class="card-icon icon-pink">🗺️</div>
          <div>
            <div class="card-title">CPU 知识体系学习路线</div>
            <div class="card-subtitle">从物理底层到现代架构，你可以这样逐步深入</div>
          </div>
        </div>
        <div class="roadmap-grid">
          <div v-for="stage in roadmapStages" :key="stage.num" class="roadmap-stage">
            <div class="roadmap-stage-num">{{ stage.num }}</div>
            <div class="roadmap-stage-icon">{{ stage.icon }}</div>
            <div class="roadmap-stage-title">{{ stage.title }}</div>
            <div class="roadmap-stage-desc">{{ stage.desc }}</div>
            <div class="roadmap-stage-tags">
              <span v-for="tag in stage.tags" :key="tag" class="roadmap-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer-note">
        CPU 是无数工程师智慧的结晶，愿你探索愉快 🚀
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Section {
  id: string
  label: string
}

interface TimelineItem {
  year: string
  title: string
  desc: string
}

interface CpuComponent {
  name: string
  color: string
  desc: string
}

interface ManufacturingStep {
  title: string
  desc: string
}

interface RoadmapStage {
  icon: string
  num: string
  title: string
  desc: string
  tags: string[]
}

const sections: Section[] = [
  { id: 'hero', label: '概览' },
  { id: 'history', label: '发展历史' },
  { id: 'structure', label: 'CPU 构成' },
  { id: 'silicon', label: '从硅到芯片' },
  { id: 'computation', label: '计算原理' },
  { id: 'roadmap', label: '学习路线' }
]

const timelineData: TimelineItem[] = [
  { year: '1971', title: 'Intel 4004', desc: '第一款商用微处理器，4 位，约 2300 个晶体管，主频 740kHz，开启微处理器时代。' },
  { year: '1978', title: 'Intel 8086', desc: '16 位处理器，x86 架构鼻祖，奠定至今仍在使用的 x86 指令集基础。' },
  { year: '1985', title: 'Intel 80386', desc: '首款 32 位 x86 处理器，集成 27.5 万晶体管，支持多任务，PC 革命里程碑。' },
  { year: '1993', title: 'Intel Pentium', desc: '超标量架构，双流水线，大幅提升性能，"Pentium" 成为家喻户晓的名字。' },
  { year: '2006', title: 'Intel Core 2 Duo', desc: '双核心，64 位架构，低功耗高性能，开启多核时代。' },
  { year: '2017', title: 'AMD Ryzen', desc: 'Zen 架构，多核竞争白热化，Chiplet 设计理念改变行业格局。' },
  { year: '2020', title: 'Apple M1', desc: 'ARM 架构桌面端突破，5nm 工艺，统一内存架构，性能能效比震惊业界。' },
  { year: '2024+', title: 'AI 加速时代', desc: 'NPU 集成，Chiplet 普及，3D 堆叠，CPU 与 AI 加速器深度融合。' }
]

const cpuComponents: CpuComponent[] = [
  { name: 'ALU (算术逻辑单元)', color: '#fd79a8', desc: 'CPU 的计算核心，执行加减乘除等算术运算及与或非等逻辑运算。' },
  { name: 'CU (控制单元)', color: '#fab1a0', desc: 'CPU 的“大脑”，负责译码指令、协调各部件工作、控制数据流向。' },
  { name: '寄存器 (Registers)', color: '#74b9ff', desc: 'CPU 内部最快的小型存储单元，暂存指令、数据和地址，包括 PC、IR 等。' },
  { name: 'Cache (缓存)', color: '#55efc4', desc: '高速缓冲存储器，L1/L2/L3 三级，利用局部性原理减少 CPU 等待数据的时间。' },
  { name: 'MMU (内存管理单元)', color: '#a29bfe', desc: '负责虚拟地址到物理地址的转换，实现内存保护和分页机制。' },
  { name: '总线接口 (Bus Interface)', color: '#ffeaa7', desc: '连接 CPU 与外部世界的桥梁，通过地址、数据、控制总线通信。' }
]

const manufacturingSteps: ManufacturingStep[] = [
  { title: '硅提纯', desc: '从石英砂中提取冶金级硅，通过西门子法提纯至 99.9999999% 的电子级多晶硅。' },
  { title: '晶圆生长', desc: '采用直拉法将籽晶浸入熔融硅，缓慢旋转提拉，生长出高纯度单晶硅锭，再切割成晶圆。' },
  { title: '光刻', desc: '涂覆光刻胶，用 EUV 极紫外光透过掩模版照射，将电路图案转移到晶圆表面。' },
  { title: '蚀刻', desc: '用等离子体或化学溶剂去除未被光刻胶保护的部分，在硅表面雕刻出纳米级沟槽。' },
  { title: '掺杂', desc: '通过离子注入硼（P 型）或磷/砷（N 型）原子，精确控制硅的导电类型和导电能力。' },
  { title: '氧化与沉积', desc: '生长二氧化硅绝缘层，沉积多晶硅、金属等薄膜，构建晶体管栅极和各层互连结构。' },
  { title: '金属化', desc: '溅射铝或铜，填充通孔形成多层互连（可达 15 层以上），连接数百亿晶体管。' },
  { title: '测试与封装', desc: '晶圆级测试后切割成单个芯片，引线键合或倒装焊连接到封装基板，成为 CPU 成品。' }
]

const roadmapStages: RoadmapStage[] = [
  { icon: '⚛️', num: '01', title: '半导体物理基础', desc: '理解硅的晶体结构、能带理论、P/N 型半导体、PN 结原理，这是所有硬件知识的物理根基。', tags: ['能带论', 'PN结', '载流子'] },
  { icon: '🔌', num: '02', title: '晶体管与逻辑门', desc: '学习 MOSFET 结构、CMOS 反相器，掌握与/或/非/异或等基本逻辑门，理解晶体管开关逻辑。', tags: ['MOSFET', 'CMOS', '逻辑门'] },
  { icon: '🔢', num: '03', title: '数字电路基础', desc: '组合逻辑（加法器、译码器）、时序逻辑（触发器、寄存器）、有限状态机，理解数据通路。', tags: ['加法器', '触发器', '状态机'] },
  { icon: '🏗️', num: '04', title: 'CPU 微架构', desc: '单周期与多周期 CPU 设计、数据通路、控制信号生成。可参考 RISC-V 或 MIPS 教学架构实践。', tags: ['数据通路', '控制信号', 'RISC-V'] },
  { icon: '📜', num: '05', title: '指令集架构 (ISA)', desc: 'RISC vs CISC、寻址模式、指令格式、调用约定。理解 x86、ARM、RISC-V 的设计哲学。', tags: ['x86', 'ARM', 'RISC-V'] },
  { icon: '🚀', num: '06', title: '流水线与高级特性', desc: '指令流水线、数据/控制冒险、转发与旁路、分支预测、乱序执行、超标量、SIMD。', tags: ['流水线', '分支预测', '乱序执行'] },
  { icon: '🧠', num: '07', title: '现代 CPU 设计', desc: '多核与多线程、Cache 一致性、片上网络、Chiplet、3D 堆叠、硬件安全、AI 加速器集成。', tags: ['多核', 'Chiplet', 'NoC'] }
]

// 导航高亮与滚动监听
const activeSection = ref('hero')

const handleScroll = () => {
  const scrollPos = window.scrollY + 80
  let current = 'hero'
  for (const s of sections) {
    const el = document.getElementById(s.id)
    if (el && el.offsetTop <= scrollPos) {
      current = s.id
    }
  }
  activeSection.value = current
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="less" scoped>
// ========== 变量 ==========
@bg: #f5f7fa;
@card-bg: #ffffff;
@text: #2c3e50;
@text-secondary: #5a6c7d;
@text-muted: #8b9aab;
@accent: #4f6ef7;
@accent-light: #eef1fe;
@border: #e8ecf1;
@radius-sm: 8px;
@radius: 12px;
@radius-lg: 16px;
@shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
@shadow-md: 0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04);
@transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);

.cpu-intro {
  min-height: 100vh;
  background: @bg;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  color: @text;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

// ========== 导航栏 ==========
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid @border;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 56px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.nav-logo {
  font-weight: 700;
  font-size: 1.1rem;
  color: @accent;
  white-space: nowrap;
  margin-right: 12px;
  letter-spacing: -0.3px;
  flex-shrink: 0;
}

.nav-link {
  white-space: nowrap;
  padding: 7px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: @text-secondary;
  transition: @transition;
  border: 1px solid transparent;
  flex-shrink: 0;
  user-select: none;

  &:hover {
    background: @accent-light;
    color: @accent;
  }

  &.active {
    background: @accent;
    color: #fff;
    border-color: @accent;
    box-shadow: 0 2px 8px rgba(79, 110, 247, 0.3);
  }
}

// ========== 主容器 ==========
.main-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 20px 60px;
}

// ========== Hero ==========
.hero-section {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%);
  border-radius: 20px;
  padding: 48px 40px;
  margin-bottom: 32px;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);

  &::after,
  &::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.03);
  }

  &::after {
    top: -60px;
    right: -40px;
    width: 240px;
    height: 240px;
  }

  &::before {
    bottom: -80px;
    left: 30%;
    width: 300px;
    height: 300px;
  }
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
  line-height: 1.3;
}

.hero-subtitle {
  font-size: 1.05rem;
  opacity: 0.85;
  max-width: 560px;
  position: relative;
  z-index: 1;
}

// ========== 卡片 ==========
.card {
  background: @card-bg;
  border-radius: @radius-lg;
  padding: 28px 32px;
  margin-bottom: 20px;
  box-shadow: @shadow-sm;
  border: 1px solid @border;
  transition: @transition;

  &:hover {
    box-shadow: @shadow-md;
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.card-icon {
  width: 38px;
  height: 38px;
  border-radius: @radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;

  &.icon-blue {
    background: #eef1fe;
    color: #4f6ef7;
  }

  &.icon-green {
    background: #e6f9f1;
    color: #10b981;
  }

  &.icon-orange {
    background: #fff3e8;
    color: #f59e0b;
  }

  &.icon-purple {
    background: #f3eeff;
    color: #7c3aed;
  }

  &.icon-pink {
    background: #fde8f0;
    color: #ec4899;
  }
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.card-subtitle {
  font-size: 0.85rem;
  color: @text-muted;
  margin-top: 2px;
}

// ========== 时间线 ==========
.timeline {
  position: relative;
  padding-left: 28px;
  margin-top: 8px;

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 4px;
    bottom: 4px;
    width: 2px;
    background: #d0d7e2;
    border-radius: 1px;
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 20px;
  padding-left: 22px;

  &:last-child {
    margin-bottom: 0;
  }
}

.timeline-dot {
  position: absolute;
  left: -24px;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: @accent;
  border: 3px solid #fff;
  box-shadow: 0 0 0 3px @accent-light;
  z-index: 2;
}

.timeline-year {
  font-size: 0.78rem;
  font-weight: 700;
  color: @accent;
  margin-bottom: 2px;
}

.timeline-title {
  font-weight: 600;
  font-size: 0.95rem;
}

.timeline-desc {
  font-size: 0.84rem;
  color: @text-secondary;
  margin-top: 2px;
}

// ========== CPU 结构网格 ==========
.cpu-diagram {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.cpu-block {
  background: #fafbfc;
  border-radius: @radius;
  padding: 16px 18px;
  border: 1px solid @border;
  transition: @transition;
  cursor: default;

  &:hover {
    border-color: #c8d2e0;
    box-shadow: @shadow-sm;
    transform: translateY(-1px);
  }
}

.cpu-block-name {
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.cpu-block-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.cpu-block-desc {
  font-size: 0.8rem;
  color: @text-secondary;
  line-height: 1.45;
}

// ========== 制造步骤 ==========
.step-list {
  list-style: none;
  counter-reset: step;
  margin-top: 12px;

  li {
    counter-increment: step;
    padding: 14px 16px 14px 52px;
    position: relative;
    margin-bottom: 10px;
    background: #fafbfc;
    border-radius: @radius;
    border: 1px solid transparent;
    transition: @transition;
    font-size: 0.9rem;

    &:hover {
      border-color: @border;
      background: #fff;
      box-shadow: @shadow-sm;
    }

    &::before {
      content: counter(step);
      position: absolute;
      left: 12px;
      top: 12px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: @accent;
      color: #fff;
      font-weight: 700;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    strong {
      display: block;
      margin-bottom: 2px;
      color: @text;
      font-size: 0.92rem;
    }

    span {
      color: @text-secondary;
      font-size: 0.84rem;
    }
  }
}

// ========== 计算原理额外元素 ==========
.sub-heading {
  font-size: 1rem;
  font-weight: 700;
  margin: 20px 0 8px;
  color: @text;
}

.text-block {
  font-size: 0.9rem;
  color: @text-secondary;
  margin-bottom: 12px;
  line-height: 1.65;
}

.instruction-cycle {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0 16px;
  justify-content: center;
  align-items: center;
}

.cycle-step {
  background: #fff;
  border: 2px solid @border;
  border-radius: @radius;
  padding: 14px 16px;
  text-align: center;
  min-width: 70px;
  transition: @transition;
  flex: 1;

  &:hover {
    border-color: @accent;
    box-shadow: @shadow-md;
    transform: translateY(-2px);
  }
}

.cycle-step-arrow {
  color: @accent;
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.cycle-step-num {
  font-size: 1.5rem;
  font-weight: 800;
  color: @accent;
}

.cycle-step-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: @text;
}

.cycle-step-desc {
  font-size: 0.72rem;
  color: @text-muted;
  margin-top: 2px;
}

// ========== 高亮框 ==========
.highlight-box {
  background: #fffbeb;
  border-left: 3px solid #f59e0b;
  border-radius: 0 @radius-sm @radius-sm 0;
  padding: 14px 18px;
  margin: 14px 0;
  font-size: 0.86rem;
  color: #92400e;
  line-height: 1.6;

  &.highlight-blue {
    background: #eef6ff;
    border-left-color: @accent;
    color: #1e40af;
  }

  &.highlight-green {
    background: #ecfdf5;
    border-left-color: #10b981;
    color: #065f46;
  }
}

// ========== 路线图 ==========
.roadmap-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 8px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.roadmap-stage {
  background: #fafbfc;
  border-radius: @radius;
  padding: 18px 20px;
  border: 1px solid @border;
  transition: @transition;
  position: relative;
  overflow: hidden;
  cursor: default;

  &:hover {
    box-shadow: @shadow-md;
    border-color: #c8d2e0;
    transform: translateY(-2px);
  }
}

.roadmap-stage-num {
  font-size: 2rem;
  font-weight: 800;
  color: #e8ecf5;
  position: absolute;
  right: 16px;
  top: 8px;
  line-height: 1;
  pointer-events: none;
}

.roadmap-stage-icon {
  font-size: 1.4rem;
  margin-bottom: 6px;
}

.roadmap-stage-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 4px;
  position: relative;
  z-index: 1;
}

.roadmap-stage-desc {
  font-size: 0.8rem;
  color: @text-secondary;
  line-height: 1.5;
  position: relative;
  z-index: 1;
}

.roadmap-stage-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
  position: relative;
  z-index: 1;
}

.roadmap-tag {
  font-size: 0.7rem;
  padding: 3px 10px;
  border-radius: 12px;
  background: @accent-light;
  color: @accent;
  font-weight: 600;
}

// ========== 页脚 ==========
.footer-note {
  text-align: center;
  color: @text-muted;
  font-size: 0.8rem;
  margin-top: 32px;
  padding: 20px;
  border-top: 1px solid @border;
}
</style>
