<template>
  <div class="hardware-container">
    <div class="hardware-card">
      <!-- 头部 -->
      <div class="header">
        <h1>
          <span class="header-icon">🖥️</span>
          计算机硬件学习路线图
        </h1>
        <p class="subtitle">从核心到外设 · 理解计算机的物理基石</p>
        <p class="hint">点击卡片可深入探索（后续章节逐步展开）</p>
      </div>

      <!-- 硬件网格 -->
      <div class="hardware-grid">
        <div v-for="item in hardwareList" :key="item.name" class="hw-item">
          <div class="hw-header">
            <span class="hw-icon">{{ item.icon }}</span>
            <div class="hw-title">
              <h3>{{ item.name }}</h3>
              <span class="hw-sub">{{ item.subtitle }}</span>
            </div>
          </div>

          <div class="hw-body">
            <!-- 工作原理 -->
            <div class="principle">
              <span class="label">⚙️ 工作原理</span>
              <p>{{ item.principle }}</p>
            </div>

            <!-- 迭代历史 -->
            <div class="history">
              <span class="label">📜 迭代简史</span>
              <ul>
                <li v-for="ev in item.history" :key="ev">{{ ev }}</li>
              </ul>
            </div>
          </div>

          <!-- 深入学习占位 -->
          <div class="hw-footer">
            <span class="more-link">🔍 深入探索 →</span>
          </div>
        </div>
      </div>

      <!-- 底部说明 -->
      <div class="footer-note">
        <span>✨ 本路线图提供硬件全景概览，后续将逐一深入介绍每个组件。</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface HardwareItem {
  name: string
  icon: string
  subtitle: string
  principle: string
  history: string[]
}

const hardwareList: HardwareItem[] = [
  {
    name: 'CPU',
    icon: '🧠',
    subtitle: '中央处理器 · 计算机的大脑',
    principle: '从内存读取指令 → 译码 → 执行（算术逻辑运算）→ 写回结果。依靠控制单元、ALU 和寄存器协同，时钟周期驱动流水线。现代 CPU 含多核、多级缓存与分支预测，提升并行与效率。',
    history: [
      '1971: Intel 4004 (4位)',
      '1978: x86 架构诞生 (8086)',
      '2005: 多核时代 (Pentium D)',
      '2010s: 移动/ARM 崛起，制程竞赛',
      '2020s: 异构计算 (大小核)、AI 加速'
    ]
  },
  {
    name: 'GPU',
    icon: '🎮',
    subtitle: '图形处理器 · 并行计算引擎',
    principle: '专为大规模并行计算设计，包含数千个流处理器核心。通过 SIMT 架构同时处理大量像素/顶点数据。现代 GPU 通过 CUDA/OpenCL 拓展至通用计算（GPGPU），用于 AI 训练、科学模拟。',
    history: [
      '1999: GeForce 256 首称 GPU',
      '2006: CUDA 开启通用计算',
      '2018: 实时光线追踪 (RTX)',
      '2020s: AI 加速核心 (Tensor Core)'
    ]
  },
  {
    name: '内存',
    icon: '🧮',
    subtitle: 'RAM · 临时数据中转站',
    principle: '基于电容存储电荷（DRAM）或触发器（SRAM）。CPU 通过地址总线定位，读写数据。DRAM 需定期刷新，速度远慢于 CPU 缓存，但容量大。内存控制器协调时序与访问。',
    history: [
      '1968: DRAM 发明',
      '1996: SDRAM 同步化',
      '2000s: DDR 系列 (DDR→DDR5)',
      '2010s: 3D 堆叠 (HBM) 突破带宽'
    ]
  },
  {
    name: '主板',
    icon: '🔌',
    subtitle: '电路基板 · 组件互联中枢',
    principle: '提供 CPU 插座、内存插槽、PCIe 扩展槽、芯片组和各类接口。芯片组（南桥/北桥）管理数据流。总线（如 PCIe、DMI）负责高速通信，电源模块稳压供电。',
    history: [
      '1980s: ISA 总线时代',
      '1990s: PCI 取代 ISA',
      '2004: PCIe 诞生，持续翻倍带宽',
      '2010s: M.2、USB-C 普及'
    ]
  },
  {
    name: '存储设备',
    icon: '💾',
    subtitle: 'HDD / SSD · 永久数据仓库',
    principle: 'HDD：磁头读写旋转盘片上的磁畴。SSD：基于 NAND 闪存，通过电荷存储数据，控制器管理磨损均衡与垃圾回收。NVMe 协议释放 PCIe 低延迟潜力。',
    history: [
      '1956: IBM 350 首款硬盘 (5MB)',
      '1980s: IDE/SATA 接口标准化',
      '2007: 首款民用 SSD 问世',
      '2010s: NVMe 成主流，QLC 闪存'
    ]
  },
  {
    name: '电源',
    icon: '⚡',
    subtitle: 'PSU · 能量转换中心',
    principle: '将交流电转换为稳定的直流输出（+12V、+5V、+3.3V）。通过开关电源技术（PWM）提高效率，80 PLUS 认证衡量转换效率。模组化设计便于线材管理。',
    history: [
      '1980s: AT 电源标准',
      '1995: ATX 规范确立',
      '2004: 80 PLUS 能效认证推出',
      '2020s: ATX 3.0/PCIe 5.0 供电'
    ]
  },
  {
    name: '散热系统',
    icon: '❄️',
    subtitle: '风冷/水冷 · 热量搬运工',
    principle: '风冷：导热膏传递热量至鳍片，风扇强制对流。水冷：液体吸收热量，经冷排散热。热管利用相变原理高效传热。均热板与石墨烯等新材料降低热阻。',
    history: [
      '1990s: 被动散热为主',
      '2000s: 热管普及，塔式风冷兴起',
      '2010s: 一体式水冷平民化',
      '2020s: 液金导热、相变材料'
    ]
  },
  {
    name: '网络接口卡',
    icon: '🌐',
    subtitle: 'NIC · 数据出入关口',
    principle: '将数字信号调制为网络介质（铜缆/光纤）可传输的信号。MAC 层处理帧封装与介质访问，PHY 层负责物理信号。现代 NIC 支持 TCP 卸载、RDMA 加速。',
    history: [
      '1973: 以太网诞生',
      '1990s: 10/100M 快速以太网',
      '2000s: 千兆普及，万兆企业化',
      '2020s: 2.5G/5G 家用，Wi-Fi 7'
    ]
  }
]
</script>

<style lang="less" scoped>
// 设计变量
@primary-dark: #1e293b;
@primary-mid: #334155;
@accent-cyan: #06b6d4;
@bg-light: #f8fafc;
@card-bg: #ffffff;
@border-light: #e2e8f0;
@text-main: #1e293b;
@text-muted: #64748b;

.hardware-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(145deg, #f1f5f9 0%, #e0e9f2 100%);
  padding: 2rem 1.5rem;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
}

.hardware-card {
  max-width: 1400px;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 36px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 8px 20px -8px rgba(0, 0, 0, 0.05);
  padding: 2.5rem 2.8rem;
  border: 1px solid rgba(255, 255, 255, 0.7);

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
      background: linear-gradient(135deg, #cffafe, #a5f3fc);
      width: 56px;
      height: 56px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      box-shadow: 0 4px 10px rgba(6, 182, 212, 0.15);
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

  .hint {
    font-size: 0.9rem;
    color: @accent-cyan;
    margin: 0.2rem 0 0;
    font-weight: 500;
  }
}

.hardware-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
}

.hw-item {
  background: @bg-light;
  border-radius: 24px;
  padding: 1.5rem 1.5rem 1rem;
  border: 1px solid @border-light;
  box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    background: white;
    border-color: #a5f3fc;
    box-shadow: 0 16px 24px -12px rgba(6, 182, 212, 0.12);
    transform: translateY(-2px);

    .more-link {
      color: @accent-cyan;
    }
  }
}

.hw-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;

  .hw-icon {
    font-size: 2.2rem;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 14px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
    border: 1px solid @border-light;
  }

  .hw-title {
    h3 {
      font-size: 1.3rem;
      font-weight: 700;
      margin: 0;
      color: @primary-dark;
    }

    .hw-sub {
      font-size: 0.75rem;
      color: @text-muted;
      display: block;
      margin-top: 2px;
    }
  }
}

.hw-body {
  flex: 1;

  .principle,
  .history {
    margin-bottom: 1rem;
  }

  .label {
    display: block;
    font-weight: 650;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    color: @text-muted;
    margin-bottom: 6px;
  }

  .principle p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: @text-main;
  }

  .history ul {
    margin: 0;
    padding-left: 1.2rem;
    font-size: 0.85rem;
    line-height: 1.6;
    color: @text-main;

    li {
      margin-bottom: 4px;
    }
  }
}

.hw-footer {
  margin-top: 0.5rem;
  padding-top: 0.8rem;
  border-top: 1px dashed @border-light;

  .more-link {
    font-size: 0.85rem;
    font-weight: 500;
    color: @text-muted;
    transition: color 0.15s;
    cursor: default;
  }
}

.footer-note {
  margin-top: 1.5rem;
  text-align: center;
  border-top: 1px solid @border-light;
  padding-top: 1.8rem;

  span {
    background: #f1f5f9;
    padding: 0.4rem 2rem;
    border-radius: 60px;
    color: @text-muted;
    font-size: 0.95rem;
    border: 1px solid @border-light;
    display: inline-block;
  }
}
</style>
