<template>
  <div class="cpu-guide">
    <h1>中央处理器(CPU)架构与工作原理</h1>

    <!-- CPU概览 -->
    <div class="overview">
      <div class="overview-card">
        <div class="overview-icon">⚙️</div>
        <div>
          <h2>CPU是什么？</h2>
          <p>中央处理器是计算机的"大脑"，负责执行程序指令和处理数据</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">📈</div>
        <div>
          <h2>性能指标</h2>
          <p>时钟频率、核心数量、IPC、缓存大小、功耗</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">🚀</div>
        <div>
          <h2>发展历程</h2>
          <p>从单核到多核，从顺序执行到超标量并行处理</p>
        </div>
      </div>
    </div>

    <!-- CPU核心组件 -->
    <div class="section">
      <h2>CPU核心组件</h2>
      <div class="components">
        <div class="component" v-for="(comp, index) in components" :key="index">
          <div class="component-icon">{{ comp.icon }}</div>
          <h3>{{ comp.name }}</h3>
          <p>{{ comp.description }}</p>
        </div>
      </div>
    </div>

    <!-- 指令执行流程 -->
    <div class="section">
      <h2>指令执行周期</h2>
      <div class="instruction-cycle">
        <div class="cycle-stage" v-for="(stage, index) in instructionCycle" :key="index">
          <div class="stage-number">{{ index + 1 }}</div>
          <div>
            <h3>{{ stage.name }}</h3>
            <p>{{ stage.description }}</p>
            <div class="stage-time">耗时: {{ stage.time }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 现代CPU技术 -->
    <div class="section">
      <h2>现代CPU关键技术</h2>
      <div class="tech-grid">
        <div class="tech-card" v-for="(tech, index) in technologies" :key="index">
          <h3>{{ tech.name }}</h3>
          <p>{{ tech.description }}</p>
          <div class="tech-benefits">
            <span v-for="(benefit, i) in tech.benefits" :key="i">✓ {{ benefit }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- CPU性能指标 -->
    <div class="section">
      <h2>CPU性能指标</h2>
      <div class="metrics">
        <div class="metric" v-for="(metric, index) in performanceMetrics" :key="index">
          <h3>{{ metric.name }}</h3>
          <div class="metric-value">{{ metric.value }}</div>
          <p>{{ metric.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// CPU核心组件
const components = ref([
  {
    name: "控制单元(CU)",
    description: "指挥协调CPU各部件工作，从内存获取指令并解码",
    icon: "🎛️"
  },
  {
    name: "算术逻辑单元(ALU)",
    description: "执行所有算术运算(加减乘除)和逻辑运算(与或非)",
    icon: "🧮"
  },
  {
    name: "寄存器",
    description: "高速存储单元，用于临时存放指令、数据和地址",
    icon: "💾"
  },
  {
    name: "缓存(Cache)",
    description: "高速内存，减少CPU访问主内存的延迟",
    icon: "⚡"
  },
  {
    name: "总线接口单元(BIU)",
    description: "管理CPU与内存、I/O设备之间的数据通信",
    icon: "🔌"
  }
]);

// 指令执行周期
const instructionCycle = ref([
  {
    name: "取指(Fetch)",
    description: "从内存中读取下一条指令",
    time: "1-3时钟周期"
  },
  {
    name: "译码(Decode)",
    description: "解析指令的操作类型和操作数",
    time: "1-2时钟周期"
  },
  {
    name: "执行(Execute)",
    description: "ALU执行指令要求的操作",
    time: "1-10时钟周期"
  },
  {
    name: "访存(Memory Access)",
    description: "读取或写入内存数据",
    time: "10-100时钟周期"
  },
  {
    name: "写回(Write Back)",
    description: "将结果写回寄存器",
    time: "1-2时钟周期"
  }
]);

// 现代CPU技术
const technologies = ref([
  {
    name: "流水线技术",
    description: "将指令处理分解为多个阶段并行执行",
    benefits: ["提高吞吐量", "隐藏延迟", "资源复用"]
  },
  {
    name: "超标量架构",
    description: "每个时钟周期发射并执行多条指令",
    benefits: ["并行执行", "提高IPC", "提升性能"]
  },
  {
    name: "乱序执行",
    description: "根据数据依赖性重新排序指令执行",
    benefits: ["减少空闲", "优化资源", "提高效率"]
  },
  {
    name: "分支预测",
    description: "预测程序分支路径提前取指令",
    benefits: ["减少停顿", "保持流水线", "提高准确率"]
  },
  {
    name: "超线程技术",
    description: "物理核心模拟为多个逻辑核心",
    benefits: ["提高利用率", "更好多任务", "虚拟核心"]
  },
  {
    name: "多级缓存",
    description: "L1/L2/L3缓存层次结构优化访问",
    benefits: ["降低延迟", "减少内存访问", "提高命中率"]
  }
]);

// 性能指标
const performanceMetrics = ref([
  {
    name: "时钟频率",
    value: "2.0-5.0 GHz",
    description: "CPU每秒的时钟周期数，决定指令执行速度"
  },
  {
    name: "IPC",
    value: "1-6指令/周期",
    description: "每个时钟周期执行的指令数，衡量效率"
  },
  {
    name: "核心/线程数",
    value: "2-64核心",
    description: "物理核心和逻辑线程数量，影响并行能力"
  },
  {
    name: "缓存大小",
    value: "4-128 MB",
    description: "L3缓存容量，减少内存访问延迟"
  },
  {
    name: "TDP",
    value: "15-250W",
    description: "热设计功耗，影响散热和能效"
  },
  {
    name: "制程工艺",
    value: "7-14 nm",
    description: "晶体管尺寸，影响密度和功耗"
  }
]);
</script>

<style lang="less" scoped>
.cpu-guide {
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

  // 组件样式
  .components {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;

    .component {
      text-align: center;
      padding: 20px 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e0e0e0;

      .component-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      p {
        font-size: 0.95rem;
        color: #555;
        line-height: 1.5;
        margin: 10px 0 0;
      }
    }
  }

  // 指令周期样式
  .instruction-cycle {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;

    .cycle-stage {
      display: flex;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      border: 1px solid #e0e0e0;

      .stage-number {
        min-width: 40px;
        height: 40px;
        background: #3498db;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 15px;
      }

      p {
        margin: 10px 0 0;
        color: #555;
        font-size: 0.95rem;
        line-height: 1.5;
      }

      .stage-time {
        margin-top: 10px;
        font-size: 0.85rem;
        color: #e74c3c;
        font-weight: bold;
      }
    }
  }

  // 技术网格
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .tech-card {
      padding: 20px;
      background: #f1f2f6;
      border-radius: 8px;
      border-left: 4px solid #3498db;

      p {
        color: #555;
        line-height: 1.6;
        margin: 10px 0 15px;
      }

      .tech-benefits {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        span {
          background: #3498db;
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
        }
      }
    }
  }

  // 性能指标
  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;

    .metric {
      text-align: center;
      padding: 20px 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e0e0e0;

      .metric-value {
        font-size: 1.4rem;
        font-weight: bold;
        color: #e74c3c;
        margin: 10px 0;
      }

      p {
        color: #555;
        line-height: 1.5;
        margin: 10px 0 0;
        font-size: 0.95rem;
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
    .instruction-cycle,
    .tech-grid,
    .metrics {
      grid-template-columns: 1fr;
    }
  }
}
</style>