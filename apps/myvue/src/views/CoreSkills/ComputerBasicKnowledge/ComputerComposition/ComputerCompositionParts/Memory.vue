<template>
  <div class="memory-guide">
    <h1>计算机内存系统基本介绍</h1>

    <!-- 内存概览 -->
    <div class="overview">
      <div class="overview-card">
        <div class="overview-icon">💾</div>
        <div>
          <h2>内存是什么？</h2>
          <p>计算机中用于存储程序指令和数据的电子部件</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">⚡</div>
        <div>
          <h2>关键特性</h2>
          <p>易失性存储、高速访问、临时存储运行中的程序和数据</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">📊</div>
        <div>
          <h2>性能指标</h2>
          <p>容量、速度、延迟、带宽、功耗</p>
        </div>
      </div>
    </div>

    <!-- 内存类型 -->
    <div class="section">
      <h2>内存类型</h2>
      <div class="memory-types">
        <div class="type-card" v-for="(type, index) in memoryTypes" :key="index">
          <div class="type-icon">{{ type.icon }}</div>
          <h3>{{ type.name }}</h3>
          <div class="type-characteristics">
            <span v-for="(char, i) in type.characteristics" :key="i">{{ char }}</span>
          </div>
          <p>{{ type.description }}</p>
          <div class="type-speed">速度: {{ type.speed }}</div>
          <div class="type-usage">用途: {{ type.usage }}</div>
        </div>
      </div>
    </div>

    <!-- 内存层次结构 -->
    <div class="section">
      <h2>内存层次结构</h2>
      <div class="hierarchy">
        <div class="level" v-for="(level, index) in memoryHierarchy" :key="index">
          <div class="level-name">{{ level.name }}</div>
          <div class="level-speed">{{ level.speed }}</div>
          <div class="level-capacity">{{ level.capacity }}</div>
          <div class="level-cost">{{ level.cost }}</div>
          <div class="level-location">{{ level.location }}</div>
        </div>
      </div>
      <div class="hierarchy-chart">
        <div class="chart-bar" v-for="(item, index) in hierarchyChart" :key="index"
          :style="{ height: item.height, backgroundColor: item.color }">
          <div class="chart-label">{{ item.name }}</div>
          <div class="chart-value">{{ item.value }}</div>
        </div>
      </div>
    </div>

    <!-- 内存工作原理 -->
    <div class="section">
      <h2>内存工作原理</h2>
      <div class="workflow">
        <div class="workflow-step" v-for="(step, index) in memoryWorkflow" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
            <div class="step-duration">时间: {{ step.time }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 内存性能指标 -->
    <div class="section">
      <h2>内存性能指标</h2>
      <div class="metrics">
        <div class="metric-card" v-for="(metric, index) in performanceMetrics" :key="index">
          <h3>{{ metric.name }}</h3>
          <div class="metric-value">{{ metric.value }}</div>
          <p>{{ metric.description }}</p>
          <div class="metric-impact">{{ metric.impact }}</div>
        </div>
      </div>
    </div>

    <!-- 内存技术发展 -->
    <div class="section">
      <h2>内存技术发展</h2>
      <div class="timeline">
        <div class="timeline-event" v-for="(event, index) in technologyTimeline" :key="index">
          <div class="event-year">{{ event.year }}</div>
          <div class="event-content">
            <h3>{{ event.technology }}</h3>
            <p>{{ event.description }}</p>
            <div class="event-impact">影响: {{ event.impact }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 内存类型
const memoryTypes = ref([
  {
    name: "DRAM (动态随机存取存储器)",
    icon: "🔁",
    characteristics: ["易失性", "需要刷新", "高密度", "低成本"],
    description: "主内存使用，由电容存储数据，需要定期刷新",
    speed: "50-100 ns",
    usage: "主内存(RAM)"
  },
  {
    name: "SRAM (静态随机存取存储器)",
    icon: "⚡",
    characteristics: ["易失性", "无需刷新", "高速", "低密度"],
    description: "由触发器存储数据，速度快但成本高、密度低",
    speed: "0.5-10 ns",
    usage: "CPU缓存(L1/L2/L3)"
  },
  {
    name: "ROM (只读存储器)",
    icon: "📖",
    characteristics: ["非易失性", "只读", "固件存储"],
    description: "存储不可更改的程序，如BIOS/UEFI固件",
    speed: "50-150 ns",
    usage: "固件存储"
  },
  {
    name: "Flash Memory (闪存)",
    icon: "💾",
    characteristics: ["非易失性", "可擦写", "块擦除"],
    description: "使用浮栅晶体管存储电荷，无需电源保持数据",
    speed: "25-200 μs (写入)",
    usage: "SSD、USB驱动器"
  }
]);

// 内存层次结构
const memoryHierarchy = ref([
  {
    name: "寄存器",
    speed: "<1 ns",
    capacity: "0.1-1 KB",
    cost: "$5000/GB",
    location: "CPU内部"
  },
  {
    name: "L1缓存",
    speed: "0.5-2 ns",
    capacity: "32-512 KB",
    cost: "$1000/GB",
    location: "CPU内部"
  },
  {
    name: "L2缓存",
    speed: "3-10 ns",
    capacity: "256KB-8MB",
    cost: "$400/GB",
    location: "CPU内部/外部"
  },
  {
    name: "L3缓存",
    speed: "10-20 ns",
    capacity: "8-64MB",
    cost: "$100/GB",
    location: "CPU外部"
  },
  {
    name: "主存(DRAM)",
    speed: "50-100 ns",
    capacity: "4-128 GB",
    cost: "$10/GB",
    location: "主板上"
  },
  {
    name: "固态存储(SSD)",
    speed: "25-200 μs",
    capacity: "256GB-4TB",
    cost: "$0.1/GB",
    location: "存储设备"
  },
  {
    name: "机械硬盘(HDD)",
    speed: "5-20 ms",
    capacity: "1-20TB",
    cost: "$0.03/GB",
    location: "存储设备"
  }
]);

// 内存工作原理
const memoryWorkflow = ref([
  {
    title: "地址解码",
    description: "CPU发送内存地址，内存控制器解码确定物理位置",
    time: "1-2 ns"
  },
  {
    title: "行激活",
    description: "激活目标内存行(RAS信号)，将整行数据读入行缓冲",
    time: "10-20 ns"
  },
  {
    title: "列选择",
    description: "选择目标列(CAS信号)，从行缓冲读取特定数据单元",
    time: "5-10 ns"
  },
  {
    title: "数据传输",
    description: "通过数据总线将数据传输到内存控制器",
    time: "1-5 ns"
  },
  {
    title: "预充电",
    description: "关闭当前行，为下一次访问准备",
    time: "10-15 ns"
  }
]);

// 性能指标
const performanceMetrics = ref([
  {
    name: "延迟",
    value: "50-100 ns",
    description: "从请求数据到开始传输的时间",
    impact: "直接影响系统响应速度"
  },
  {
    name: "带宽",
    value: "20-100 GB/s",
    description: "单位时间内传输的数据量",
    impact: "决定大数据处理能力"
  },
  {
    name: "频率",
    value: "1600-6400 MHz",
    description: "内存工作时钟速度",
    impact: "影响数据传输速率"
  },
  {
    name: "容量",
    value: "4-128 GB",
    description: "可存储的数据总量",
    impact: "决定可运行程序的大小和数量"
  }
]);

// 技术发展时间线
const technologyTimeline = ref([
  {
    year: "1947",
    technology: "威廉姆斯管",
    description: "第一个随机存取存储器，使用阴极射线管",
    impact: "早期计算机存储技术"
  },
  {
    year: "1953",
    technology: "磁芯存储器",
    description: "使用磁化环存储数据，非易失性",
    impact: "主导1950-1970年代的计算机内存"
  },
  {
    year: "1968",
    technology: "DRAM发明",
    description: "IBM发明动态随机存取存储器",
    impact: "成为主流内存技术至今"
  },
  {
    year: "1970",
    technology: "SRAM商用",
    description: "Intel推出首款SRAM芯片1101",
    impact: "用于高速缓存和寄存器"
  },
  {
    year: "1984",
    technology: "SIMM内存",
    description: "单列直插式内存模块",
    impact: "简化内存安装和升级"
  },
  {
    year: "1997",
    technology: "SDRAM",
    description: "同步DRAM，与系统时钟同步",
    impact: "带宽大幅提升"
  },
  {
    year: "2000",
    technology: "RDRAM",
    description: "Rambus DRAM，高带宽设计",
    impact: "用于PlayStation 2等设备"
  },
  {
    year: "2003",
    technology: "DDR SDRAM",
    description: "双倍数据速率SDRAM",
    impact: "主流内存标准至今"
  },
  {
    year: "2014",
    technology: "DDR4",
    description: "更高速度和更低电压",
    impact: "16-64GB模块成为主流"
  },
  {
    year: "2020",
    technology: "DDR5",
    description: "双通道架构，更高带宽",
    impact: "支持新一代CPU和AI应用"
  }
]);

// 层次结构图表数据
const hierarchyChart = ref([
  { name: "寄存器", value: "<1ns", height: "40px", color: "#3498db" },
  { name: "L1缓存", value: "1-4ns", height: "70px", color: "#2980b9" },
  { name: "L2缓存", value: "3-10ns", height: "100px", color: "#1abc9c" },
  { name: "L3缓存", value: "10-20ns", height: "130px", color: "#2ecc71" },
  { name: "主存", value: "50-100ns", height: "160px", color: "#f1c40f" },
  { name: "SSD", value: "25-200μs", height: "250px", color: "#e67e22" },
  { name: "HDD", value: "5-20ms", height: "300px", color: "#e74c3c" }
]);
</script>

<style lang="less" scoped>
.memory-guide {
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

  // 内存类型样式
  .memory-types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;

    .type-card {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;

      .type-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      .type-characteristics {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 10px 0;

        span {
          background: #3498db;
          color: white;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
        }
      }

      p {
        color: #555;
        line-height: 1.6;
        margin: 15px 0 10px;
      }

      .type-speed,
      .type-usage {
        font-size: 0.9rem;
        font-weight: bold;
        color: #e74c3c;
        margin-top: 5px;
      }
    }
  }

  // 内存层次结构
  .hierarchy {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 30px;

    .level {
      padding: 15px;
      background: #f1f2f6;
      border-radius: 6px;
      border-left: 4px solid #3498db;

      .level-name {
        font-weight: bold;
        margin-bottom: 8px;
        color: #2c3e50;
      }

      .level-speed,
      .level-capacity,
      .level-cost,
      .level-location {
        font-size: 0.9rem;
        margin-top: 5px;
        color: #555;

        &::before {
          content: "• ";
          color: #3498db;
          font-weight: bold;
        }
      }
    }
  }

  .hierarchy-chart {
    display: flex;
    height: 320px;
    align-items: flex-end;
    justify-content: space-around;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px 10px;
    border: 1px solid #e0e0e0;

    .chart-bar {
      width: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      border-radius: 6px 6px 0 0;

      .chart-label {
        margin-bottom: 5px;
        font-weight: bold;
        color: #2c3e50;
      }

      .chart-value {
        margin-bottom: 10px;
        font-size: 0.9rem;
        color: white;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }
    }
  }

  // 工作流程
  .workflow {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 15px;

    .workflow-step {
      display: flex;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e0e0e0;

      .step-number {
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

      .step-content {
        h3 {
          margin-top: 0;
        }

        p {
          margin: 10px 0;
          color: #555;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .step-duration {
          font-size: 0.85rem;
          color: #e74c3c;
          font-weight: bold;
        }
      }
    }
  }

  // 性能指标
  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;

    .metric-card {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;
      text-align: center;

      .metric-value {
        font-size: 1.5rem;
        font-weight: bold;
        color: #e74c3c;
        margin: 10px 0;
      }

      p {
        color: #555;
        line-height: 1.6;
        margin: 10px 0 15px;
      }

      .metric-impact {
        font-size: 0.9rem;
        font-weight: bold;
        color: #3498db;
        border-top: 1px dashed #ccc;
        padding-top: 10px;
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
          margin: 10px 0;
        }

        .event-impact {
          font-size: 0.9rem;
          font-weight: bold;
          color: #3498db;
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
    .memory-types,
    .hierarchy,
    .workflow,
    .metrics {
      grid-template-columns: 1fr;
    }

    .hierarchy-chart {
      flex-direction: column;
      height: auto;
      align-items: center;

      .chart-bar {
        width: 90%;
        height: 60px;
        margin-bottom: 10px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        border-radius: 6px;

        .chart-label,
        .chart-value {
          margin: 0;
        }
      }
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
