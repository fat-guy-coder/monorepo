<template>
  <div class="computer-architecture">
    <h1>计算机组成原理概览</h1>

    <!-- 冯·诺依曼体系结构 -->
    <div class="section">
      <h2>冯·诺依曼体系结构</h2>
      <div class="von-neumann">
        <div class="component" v-for="(comp, index) in vonNeumannComponents" :key="index">
          <div class="icon" :class="comp.icon"></div>
          <h3>{{ comp.name }}</h3>
          <p>{{ comp.description }}</p>
        </div>
      </div>
      <div class="workflow">
        <div class="step" v-for="(step, index) in workflow" :key="index">
          <span class="step-number">{{ index + 1 }}</span>
          <div class="step-content">
            <strong>{{ step.title }}</strong>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 核心组件详细说明 -->
    <div class="section">
      <h2>核心组件</h2>
      <div class="components-grid">
        <div class="component-card" v-for="(component, index) in coreComponents" :key="index">
          <h3>{{ component.name }}</h3>
          <div class="function">{{ component.function }}</div>
          <div class="tech-evolution">
            <h4>技术演进</h4>
            <ul>
              <li v-for="(tech, techIndex) in component.tech" :key="techIndex">{{ tech }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 现代计算机体系结构 -->
    <div class="section">
      <h2>哈佛体系结构</h2>
      <div class="von-neumann">
        <div class="component" v-for="(comp, index) in harvardComponents" :key="index">
          <div class="icon" :class="comp.icon"></div>
          <h3>{{ comp.name }}</h3>
          <p>{{ comp.description }}</p>
        </div>
      </div>
      <div class="workflow">
        <div class="step" v-for="(step, index) in harvardWorkflow" :key="index">
          <span class="step-number">{{ index + 1 }}</span>
          <div class="step-content">
            <strong>{{ step.title }}</strong>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 性能指标 -->
    <div class="section">
      <h2>性能指标</h2>
      <div class="metrics">
        <div class="metric" v-for="(metric, index) in performanceMetrics" :key="index">
          <div class="metric-icon" :class="metric.icon"></div>
          <div class="metric-content">
            <h3>{{ metric.name }}</h3>
            <p>{{ metric.description }}</p>
            <div class="formula">{{ metric.formula }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 指令周期 -->
    <div class="section">
      <h2>指令执行周期</h2>
      <div class="instruction-cycle">
        <div class="cycle-stage" v-for="(stage, index) in instructionCycle" :key="index">
          <div class="stage-header">
            <div class="stage-number">{{ index + 1 }}</div>
            <h3>{{ stage.name }}</h3>
          </div>
          <p>{{ stage.description }}</p>
          <div class="stage-time">耗时: {{ stage.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 冯·诺依曼体系结构组件
const vonNeumannComponents = ref([
  {
    name: "输入设备",
    description: "将数据和指令输入计算机（键盘、鼠标等）",
    icon: "input"
  },
  {
    name: "存储器",
    description: "存储程序和数据（内存、硬盘等）",
    icon: "memory"
  },
  {
    name: "运算器",
    description: "执行算术和逻辑运算（ALU）",
    icon: "alu"
  },
  {
    name: "控制器",
    description: "协调各部件工作（CPU控制单元）",
    icon: "control"
  },
  {
    name: "输出设备",
    description: "显示处理结果（显示器、打印机等）",
    icon: "output"
  }
]);

// 哈佛体系结构组件
const harvardComponents = ref([
  {
    name: "指令存储器",
    description: "专门存储程序指令的存储器",
    icon: "instruction-memory"
  },
  {
    name: "数据存储器",
    description: "专门存储数据的存储器",
    icon: "data-memory"
  },
  {
    name: "运算器",
    description: "执行算术和逻辑运算（ALU）",
    icon: "alu"
  },
  {
    name: "控制器",
    description: "控制指令的执行和协调各部件工作",
    icon: "control"
  },
  {
    name: "输入设备",
    description: "将数据输入计算机（键盘、鼠标等）",
    icon: "input"
  },
  {
    name: "输出设备",
    description: "输出计算机处理结果（显示器、打印机等）",
    icon: "output"
  }
]);

// 哈佛体系结构工作流程
const harvardWorkflow = ref([
  {
    title: "取指令",
    description: "从指令存储器中取出指令"
  },
  {
    title: "指令译码",
    description: "解析指令的操作类型和操作数"
  },
  {
    title: "执行指令",
    description: "运算器执行指令操作"
  },
  {
    title: "访问数据存储器",
    description: "读取或写入数据"
  },
  {
    title: "写回结果",
    description: "将执行结果写回寄存器或存储器"
  }
]);

// 计算机工作流程
const workflow = ref([
  {
    title: "取指令",
    description: "从存储器中取出指令"
  },
  {
    title: "指令译码",
    description: "解析指令的操作类型和操作数"
  },
  {
    title: "执行指令",
    description: "运算器执行指令操作"
  },
  {
    title: "访问存储器",
    description: "读取或写入数据"
  },
  {
    title: "写回结果",
    description: "将执行结果写回寄存器或存储器"
  }
]);

// 核心组件
const coreComponents = ref([
  {
    name: "中央处理器(CPU)",
    function: "执行指令和处理数据",
    tech: [
      "1971: 英特尔4004 (4位)",
      "1978: 英特尔8086 (x86架构)",
      "1993: 奔腾处理器 (超标量)",
      "2005: 多核处理器 (Core 2 Duo)",
      "2010s: 异构计算 (CPU+GPU)"
    ]
  },
  {
    name: "主存储器(RAM)",
    function: "临时存储运行中的程序和数据",
    tech: [
      "1940s: 延迟线存储器",
      "1950s: 磁芯存储器",
      "1970s: DRAM (动态随机存取)",
      "1990s: SDRAM (同步DRAM)",
      "2010s: DDR4/DDR5 (双倍数据速率)"
    ]
  },
  {
    name: "存储设备",
    function: "长期存储数据和程序",
    tech: [
      "1956: 硬盘驱动器 (IBM 350)",
      "1971: 软盘 (8英寸)",
      "1980s: CD-ROM (700MB)",
      "1990s: 固态硬盘 (SSD)",
      "2020s: NVMe SSD (3500MB/s+)"
    ]
  },
  {
    name: "系统总线",
    function: "连接各组件的数据通路",
    tech: [
      "1970: 单总线结构",
      "1981: ISA总线 (8位)",
      "1992: PCI总线 (32位)",
      "2004: PCI Express (串行高速)",
      "2010s: 高速互连 (InfiniBand)"
    ]
  }
]);

// 性能指标
const performanceMetrics = ref([
  {
    name: "时钟频率",
    description: "CPU时钟每秒周期数，影响指令执行速度",
    formula: "f = 1/T (T为时钟周期)",
    icon: "clock"
  },
  {
    name: "CPI",
    description: "每条指令所需的时钟周期数",
    formula: "CPI = 总时钟周期数 / 指令数",
    icon: "cpi"
  },
  {
    name: "MIPS",
    description: "每秒执行的百万条指令数",
    formula: "MIPS = 指令数 / (执行时间 × 10⁶)",
    icon: "mips"
  },
  {
    name: "带宽",
    description: "总线或内存的数据传输速率",
    formula: "带宽 = 传输数据量 / 时间",
    icon: "bandwidth"
  }
]);

// 指令执行周期
const instructionCycle = ref([
  {
    name: "取指",
    description: "从内存读取指令到指令寄存器",
    time: "1-3个时钟周期"
  },
  {
    name: "译码",
    description: "解析指令的操作码和操作数",
    time: "1-2个时钟周期"
  },
  {
    name: "执行",
    description: "执行指令操作（算术、逻辑、移位等）",
    time: "1-10个时钟周期"
  },
  {
    name: "访存",
    description: "访问内存读取或写入数据",
    time: "10-100个时钟周期"
  },
  {
    name: "写回",
    description: "将结果写回寄存器或内存",
    time: "1-2个时钟周期"
  }
]);
</script>

<style lang="less" scoped>
.computer-architecture {
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
    font-size: 1.8rem;
    padding-left: 10px;
    border-left: 4px solid #3498db;
    color: #2c3e50;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  }

  // 冯·诺依曼体系结构样式
  .von-neumann {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .component {
      text-align: center;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e0e0e0;

      .icon {
        width: 70px;
        height: 70px;
        margin: 0 auto 15px;
        border-radius: 50%;
        background: #3498db;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          color: white;
        }

        &.input::after {
          content: '⌨️';
        }

        &.memory::after {
          content: '💾';
        }

        &.alu::after {
          content: '🧮';
        }

        &.control::after {
          content: '🎛️';
        }

        &.output::after {
          content: '🖨️';
        }
      }

      h3 {
        margin: 10px 0;
        color: #2980b9;
        font-size: 1.3rem;
      }

      p {
        font-size: 0.9rem;
        color: #555;
        line-height: 1.4;
      }
    }
  }

  .workflow {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;

    .step {
      display: flex;
      background: #2c3e50;
      color: white;
      border-radius: 8px;
      overflow: hidden;

      .step-number {
        min-width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #3498db;
        font-weight: bold;
        font-size: 1.2rem;
      }

      .step-content {
        padding: 12px;

        strong {
          display: block;
          margin-bottom: 5px;
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          font-size: 0.9rem;
          opacity: 0.9;
        }
      }
    }
  }

  // 核心组件样式
  .components-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;

    .component-card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 15px;
      background: #f8f9fa;

      h3 {
        margin-top: 0;
        color: #e74c3c;
        font-size: 1.3rem;
        padding-bottom: 8px;
        border-bottom: 1px solid #ddd;
      }

      .function {
        font-weight: bold;
        margin: 10px 0;
        color: #2980b9;
      }

      .tech-evolution {
        margin-top: 15px;

        h4 {
          margin: 0 0 8px;
          color: #2c3e50;
          font-size: 1.1rem;
        }

        ul {
          padding-left: 20px;
          margin: 0;

          li {
            margin-bottom: 8px;
            font-size: 0.85rem;
            line-height: 1.4;
            color: #555;
          }
        }
      }
    }
  }

  // 性能指标样式
  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .metric {
      display: flex;
      padding: 15px;
      background: #f1f2f6;
      border-radius: 8px;
      border-left: 4px solid #3498db;

      .metric-icon {
        min-width: 50px;
        height: 50px;
        margin-right: 15px;
        border-radius: 50%;
        background: #3498db;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;

        &.clock::after {
          content: '⏱️';
        }

        &.cpi::after {
          content: '📈';
        }

        &.mips::after {
          content: '🚀';
        }

        &.bandwidth::after {
          content: '🔁';
        }
      }

      .metric-content {
        h3 {
          margin: 0 0 5px;
          color: #2c3e50;
          font-size: 1.2rem;
        }

        p {
          margin: 0 0 8px;
          font-size: 0.9rem;
          color: #555;
        }

        .formula {
          font-family: monospace;
          background: #2c3e50;
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.9rem;
        }
      }
    }
  }

  // 指令周期样式
  .instruction-cycle {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 15px;

    .cycle-stage {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      border: 1px solid #e0e0e0;

      .stage-header {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .stage-number {
          width: 30px;
          height: 30px;
          background: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 10px;
        }

        h3 {
          margin: 0;
          font-size: 1.2rem;
          color: #2c3e50;
        }
      }

      p {
        margin: 0 0 10px;
        font-size: 0.9rem;
        color: #555;
      }

      .stage-time {
        font-size: 0.85rem;
        color: #e74c3c;
        font-weight: bold;
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

    .von-neumann,
    .components-grid,
    .metrics,
    .instruction-cycle {
      grid-template-columns: 1fr;
    }
  }
}
</style>