<template>
  <div class="motherboard-guide">
    <h1>计算机主板技术基本介绍</h1>

    <!-- 主板概览 -->
    <div class="overview">
      <div class="overview-card">
        <div class="overview-icon">🔌</div>
        <div>
          <h2>主板是什么？</h2>
          <p>计算机的核心电路板，连接所有硬件组件的中枢</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">🧩</div>
        <div>
          <h2>核心功能</h2>
          <p>提供硬件接口、组件通信、电力分配和系统控制</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">📐</div>
        <div>
          <h2>规格标准</h2>
          <p>ATX、Micro-ATX、Mini-ITX、E-ATX等</p>
        </div>
      </div>
    </div>

    <!-- 主板架构 -->
    <div class="section">
      <h2>主板架构图</h2>
      <div class="architecture">
        <div class="component" v-for="(comp, index) in architectureComponents" :key="index"
          :style="{ top: comp.position.top, left: comp.position.left }">
          <div class="comp-icon">{{ comp.icon }}</div>
          <div class="comp-name">{{ comp.name }}</div>
        </div>
      </div>
    </div>

    <!-- 核心组件 -->
    <div class="section">
      <h2>主板核心组件</h2>
      <div class="components">
        <div class="component-card" v-for="(comp, index) in coreComponents" :key="index">
          <div class="comp-icon">{{ comp.icon }}</div>
          <h3>{{ comp.name }}</h3>
          <p>{{ comp.description }}</p>
          <div class="comp-function">
            <strong>功能:</strong> {{ comp.function }}
          </div>
          <div class="comp-tech">
            <strong>技术演进:</strong> {{ comp.evolution }}
          </div>
        </div>
      </div>
    </div>

    <!-- 接口类型 -->
    <div class="section">
      <h2>主板接口类型</h2>
      <div class="interfaces">
        <div class="interface-card" v-for="(intf, index) in interfaces" :key="index">
          <div class="intf-icon">{{ intf.icon }}</div>
          <h3>{{ intf.name }}</h3>
          <div class="intf-spec">{{ intf.spec }}</div>
          <div class="intf-speed">速度: {{ intf.speed }}</div>
          <div class="intf-usage">用途: {{ intf.usage }}</div>
        </div>
      </div>
    </div>

    <!-- 芯片组功能 -->
    <div class="section">
      <h2>主板芯片组功能</h2>
      <div class="chipset-grid">
        <div class="chipset-card" v-for="(chip, index) in chipsets" :key="index">
          <h3>{{ chip.platform }} 平台</h3>
          <div class="chipset-model">{{ chip.model }}</div>
          <div class="chip-features">
            <div v-for="(feature, i) in chip.features" :key="i" class="feature">
              <div class="feature-icon">✓</div>
              <div>{{ feature }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主板选购指南 -->
    <div class="section">
      <h2>主板选购指南</h2>
      <div class="selection">
        <div class="factor" v-for="(factor, index) in selectionFactors" :key="index">
          <div class="factor-icon">{{ factor.icon }}</div>
          <h3>{{ factor.name }}</h3>
          <p>{{ factor.description }}</p>
          <div class="factor-tips">
            <span v-for="(tip, i) in factor.tips" :key="i">• {{ tip }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主板发展历史 -->
    <div class="section">
      <h2>主板发展历史</h2>
      <div class="timeline">
        <div class="timeline-event" v-for="(event, index) in historyTimeline" :key="index">
          <div class="event-year">{{ event.year }}</div>
          <div class="event-content">
            <h3>{{ event.innovation }}</h3>
            <p>{{ event.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 主板架构组件
const architectureComponents = ref([
  { name: "CPU插座", icon: "💻", position: { top: "20%", left: "45%" } },
  { name: "内存插槽", icon: "💾", position: { top: "30%", left: "30%" } },
  { name: "PCIe插槽", icon: "🔄", position: { top: "50%", left: "15%" } },
  { name: "芯片组", icon: "🧠", position: { top: "40%", left: "60%" } },
  { name: "SATA接口", icon: "📀", position: { top: "60%", left: "50%" } },
  { name: "电源接口", icon: "🔋", position: { top: "15%", left: "70%" } },
  { name: "后置I/O", icon: "🔌", position: { top: "10%", left: "85%" } },
  { name: "M.2插槽", icon: "⚡", position: { top: "35%", left: "45%" } },
  { name: "BIOS芯片", icon: "💡", position: { top: "20%", left: "20%" } }
]);

// 核心组件
const coreComponents = ref([
  {
    name: "芯片组",
    icon: "🧠",
    description: "主板的核心逻辑芯片",
    function: "协调CPU与其他组件的通信，管理数据流",
    evolution: "北桥+南桥 → 单芯片设计 → SoC集成"
  },
  {
    name: "BIOS/UEFI",
    icon: "💾",
    description: "基本输入输出系统",
    function: "开机自检、硬件初始化、引导操作系统",
    evolution: "ROM芯片 → Flash ROM → UEFI固件"
  },
  {
    name: "VRM供电模块",
    icon: "🔋",
    description: "电压调节模块",
    function: "为CPU提供稳定、纯净的电力供应",
    evolution: "4相供电 → 16相供电 → 智能数字供电"
  },
  {
    name: "PCB电路板",
    icon: "📐",
    description: "多层印刷电路板",
    function: "所有电子元件的安装基板，提供电气连接",
    evolution: "4层板 → 8层板 → 12层板"
  }
]);

// 接口类型
const interfaces = ref([
  {
    name: "CPU插座",
    icon: "🖥️",
    spec: "LGA 1700/AM5",
    speed: "PCIe 5.0 ×16",
    usage: "安装处理器"
  },
  {
    name: "内存插槽",
    icon: "📈",
    spec: "DDR5 DIMM",
    speed: "6400 MT/s",
    usage: "安装内存条"
  },
  {
    name: "PCIe插槽",
    icon: "🔌",
    spec: "PCIe 5.0 ×16",
    speed: "128 GB/s",
    usage: "安装显卡/扩展卡"
  },
  {
    name: "M.2接口",
    icon: "⚡",
    spec: "NVMe PCIe 4.0",
    speed: "8 GB/s",
    usage: "安装高速SSD"
  },
  {
    name: "SATA接口",
    icon: "💾",
    spec: "SATA III",
    speed: "6 Gb/s",
    usage: "连接硬盘/光驱"
  },
  {
    name: "USB接口",
    icon: "🔄",
    spec: "USB 3.2 Gen 2×2",
    speed: "20 Gb/s",
    usage: "连接外部设备"
  }
]);

// 芯片组功能
const chipsets = ref([
  {
    platform: "Intel",
    model: "Z790 芯片组",
    features: [
      "支持13/14代酷睿处理器",
      "PCIe 5.0 ×16 + PCIe 4.0 ×4",
      "最大128GB DDR5 5600MHz",
      "8个SATA 6Gb/s接口",
      "5个M.2插槽",
      "USB 3.2 Gen 2×2 (20Gbps)"
    ]
  },
  {
    platform: "AMD",
    model: "X670E 芯片组",
    features: [
      "支持Ryzen 7000系列",
      "PCIe 5.0 ×16 + ×4",
      "最大128GB DDR5 EXPO",
      "USB4 (40Gbps)",
      "Wi-Fi 6E + 2.5GbE",
      "8个SATA 6Gb/s接口"
    ]
  }
]);

// 选购指南
const selectionFactors = ref([
  {
    name: "CPU兼容性",
    icon: "🔌",
    description: "确保主板支持您的处理器",
    tips: [
      "核对CPU插座类型(LGA/AM)",
      "检查芯片组兼容性",
      "确认BIOS版本支持"
    ]
  },
  {
    name: "扩展能力",
    icon: "🧩",
    description: "根据需求选择扩展插槽和接口",
    tips: [
      "PCIe插槽数量/版本",
      "M.2接口数量/规格",
      "USB端口类型/数量",
      "SATA接口需求"
    ]
  },
  {
    name: "内存支持",
    icon: "📊",
    description: "内存类型、容量和速度支持",
    tips: [
      "DDR4/DDR5选择",
      "最大内存容量",
      "支持的内存频率",
      "双通道/四通道配置"
    ]
  },
  {
    name: "供电设计",
    icon: "⚡",
    description: "影响CPU超频和系统稳定性",
    tips: [
      "VRM相数(12+1相以上)",
      "散热片覆盖质量",
      "80PLUS认证电源接口",
      "EPS 8+4pin供电"
    ]
  }
]);

// 发展历史
const historyTimeline = ref([
  {
    year: "1981",
    innovation: "IBM PC主板",
    description: "首款标准化主板，奠定PC架构基础"
  },
  {
    year: "1984",
    innovation: "AT主板标准",
    description: "IBM推出Advanced Technology主板标准"
  },
  {
    year: "1995",
    innovation: "ATX规范",
    description: "Intel推出ATX主板标准，取代AT"
  },
  {
    year: "2003",
    innovation: "PCI Express",
    description: "取代AGP和PCI总线的新一代接口"
  },
  {
    year: "2004",
    innovation: "SATA接口",
    description: "取代IDE/PATA的串行硬盘接口"
  },
  {
    year: "2011",
    innovation: "UEFI BIOS",
    description: "取代传统BIOS的新一代固件"
  },
  {
    year: "2013",
    innovation: "M.2接口",
    description: "为超高速SSD设计的紧凑接口"
  },
  {
    year: "2019",
    innovation: "PCIe 4.0",
    description: "带宽翻倍的新一代扩展接口"
  },
  {
    year: "2021",
    innovation: "PCIe 5.0",
    description: "128GB/s带宽的下一代接口"
  }
]);
</script>

<style lang="less" scoped>
.motherboard-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);

  h1 {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #3498db;
    color: #2c3e50;
  }

  h2 {
    font-size: 1.7rem;
    padding-left: 10px;
    border-left: 4px solid #3498db;
    color: #2c3e50;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.3rem;
    color: #2980b9;
    margin-top: 0;
    margin-bottom: 10px;
  }

  .overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .overview-card {
      display: flex;
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
      align-items: center;

      .overview-icon {
        font-size: 2.5rem;
        margin-right: 20px;
      }

      p {
        margin: 10px 0 0;
        color: #555;
        line-height: 1.5;
      }
    }
  }

  .section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  }

  // 主板架构图
  .architecture {
    position: relative;
    height: 500px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 500"><rect width="100%" height="100%" fill="%23f1f2f6"/><rect x="100" y="50" width="600" height="400" rx="10" fill="%232c3e50" opacity="0.8"/></svg>');
    background-size: cover;
    border-radius: 8px;
    border: 1px solid #ddd;

    .component {
      position: absolute;
      transform: translate(-50%, -50%);
      text-align: center;
      width: 100px;

      .comp-icon {
        font-size: 2.5rem;
        margin-bottom: 5px;
      }

      .comp-name {
        font-size: 0.9rem;
        background: rgba(255, 255, 255, 0.8);
        padding: 3px 5px;
        border-radius: 4px;
        font-weight: bold;
      }
    }
  }

  // 核心组件
  .components {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .component-card {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;
      text-align: center;

      .comp-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      p {
        color: #555;
        line-height: 1.6;
        margin: 10px 0;
      }

      .comp-function,
      .comp-tech {
        font-size: 0.9rem;
        margin-top: 10px;
        text-align: left;
        background: #e9ecef;
        padding: 8px;
        border-radius: 4px;
      }
    }
  }

  // 接口类型
  .interfaces {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;

    .interface-card {
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;
      text-align: center;

      .intf-icon {
        font-size: 2rem;
        margin-bottom: 10px;
      }

      .intf-spec {
        font-weight: bold;
        color: #e74c3c;
        margin: 5px 0;
      }

      .intf-speed,
      .intf-usage {
        font-size: 0.85rem;
        margin-top: 5px;
        color: #555;
      }
    }
  }

  // 芯片组
  .chipset-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;

    .chipset-card {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;

      .chipset-model {
        font-weight: bold;
        color: #e74c3c;
        margin: 5px 0 15px;
        font-size: 1.1rem;
      }

      .chip-features {
        .feature {
          display: flex;
          margin-bottom: 8px;
          align-items: flex-start;

          .feature-icon {
            min-width: 20px;
            color: #2ecc71;
            font-weight: bold;
            margin-right: 8px;
          }
        }
      }
    }
  }

  // 选购指南
  .selection {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .factor {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;

      .factor-icon {
        font-size: 2rem;
        margin-bottom: 15px;
      }

      p {
        color: #555;
        line-height: 1.6;
        margin: 10px 0 15px;
      }

      .factor-tips {
        background: #e9ecef;
        padding: 10px;
        border-radius: 4px;
        font-size: 0.9rem;

        span {
          display: block;
          margin-bottom: 5px;
        }
      }
    }
  }

  // 时间线
  .timeline {
    position: relative;
    padding-left: 30px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: #3498db;
    }

    .timeline-event {
      position: relative;
      margin-bottom: 30px;
      padding-left: 20px;

      &::before {
        content: '';
        position: absolute;
        left: -34px;
        top: 8px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #3498db;
        border: 4px solid white;
        box-shadow: 0 0 0 2px #3498db;
      }

      .event-year {
        position: absolute;
        left: -80px;
        top: 5px;
        font-weight: bold;
        color: #2c3e50;
        font-size: 1.1rem;
      }

      .event-content {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        border: 1px solid #e0e0e0;

        h3 {
          margin-top: 0;
          color: #e74c3c;
        }

        p {
          color: #555;
          line-height: 1.6;
          margin: 10px 0 0;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 10px;

    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    .overview,
    .components,
    .interfaces,
    .chipset-grid,
    .selection {
      grid-template-columns: 1fr;
    }

    .architecture {
      height: 400px;
    }

    .timeline {
      padding-left: 15px;

      .event-year {
        position: static;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .timeline-event::before {
        left: -23px;
      }
    }
  }
}
</style>
