<template>
  <div class="storage-guide">
    <h1>硬盘技术基本介绍：HDD与SSD</h1>

    <!-- 概览 -->
    <div class="overview">
      <div class="overview-card">
        <div class="overview-icon">💾</div>
        <div>
          <h2>硬盘是什么？</h2>
          <p>计算机的主要非易失性存储设备，用于长期保存数据</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">⚙️</div>
        <div>
          <h2>存储技术</h2>
          <p>机械硬盘(HDD)和固态硬盘(SSD)两种主流技术</p>
        </div>
      </div>
      <div class="overview-card">
        <div class="overview-icon">🚀</div>
        <div>
          <h2>性能指标</h2>
          <p>容量、速度、耐用性、价格、功耗</p>
        </div>
      </div>
    </div>

    <!-- HDD vs SSD 对比 -->
    <div class="section">
      <h2>HDD与SSD核心区别</h2>
      <div class="comparison">
        <div class="comparison-header">
          <div class="type">特性</div>
          <div class="hdd">机械硬盘(HDD)</div>
          <div class="ssd">固态硬盘(SSD)</div>
        </div>
        <div class="comparison-row" v-for="(item, index) in comparisonData" :key="index">
          <div class="feature">{{ item.feature }}</div>
          <div class="hdd-value">{{ item.hdd }}</div>
          <div class="ssd-value">{{ item.ssd }}</div>
        </div>
      </div>
    </div>

    <!-- 机械硬盘基本介绍 -->
    <div class="section">
      <h2>机械硬盘(HDD)工作原理</h2>
      <div class="hdd-explained">
        <div class="hdd-component" v-for="(comp, index) in hddComponents" :key="index">
          <div class="comp-icon">{{ comp.icon }}</div>
          <h3>{{ comp.name }}</h3>
          <p>{{ comp.description }}</p>
        </div>
      </div>

      <h3>数据读写流程</h3>
      <div class="workflow">
        <div class="step" v-for="(step, index) in hddWorkflow" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h4>{{ step.title }}</h4>
            <p>{{ step.description }}</p>
            <div class="step-time">耗时: {{ step.time }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 固态硬盘基本介绍 -->
    <div class="section">
      <h2>固态硬盘(SSD)工作原理</h2>
      <div class="ssd-explained">
        <div class="ssd-component" v-for="(comp, index) in ssdComponents" :key="index">
          <div class="comp-icon">{{ comp.icon }}</div>
          <h3>{{ comp.name }}</h3>
          <p>{{ comp.description }}</p>
        </div>
      </div>

      <h3>数据读写流程</h3>
      <div class="workflow">
        <div class="step" v-for="(step, index) in ssdWorkflow" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h4>{{ step.title }}</h4>
            <p>{{ step.description }}</p>
            <div class="step-time">耗时: {{ step.time }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 性能对比图表 -->
    <div class="section">
      <h2>性能对比</h2>
      <div class="performance-charts">
        <div class="chart">
          <h3>随机读取速度</h3>
          <div class="chart-bar" v-for="(item, index) in randomRead" :key="index">
            <div class="chart-label">{{ item.type }}</div>
            <div class="chart-bar-inner" :style="{ width: item.width }">
              <div class="chart-value">{{ item.value }}</div>
            </div>
          </div>
        </div>

        <div class="chart">
          <h3>顺序写入速度</h3>
          <div class="chart-bar" v-for="(item, index) in seqWrite" :key="index">
            <div class="chart-label">{{ item.type }}</div>
            <div class="chart-bar-inner" :style="{ width: item.width }">
              <div class="chart-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 应用场景 -->
    <div class="section">
      <h2>适用场景</h2>
      <div class="use-cases">
        <div class="case-card hdd-case">
          <h3>机械硬盘(HDD)适用场景</h3>
          <ul>
            <li v-for="(caseItem, index) in hddUseCases" :key="index">{{ caseItem }}</li>
          </ul>
        </div>

        <div class="case-card ssd-case">
          <h3>固态硬盘(SSD)适用场景</h3>
          <ul>
            <li v-for="(caseItem, index) in ssdUseCases" :key="index">{{ caseItem }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 技术发展 -->
    <div class="section">
      <h2>硬盘技术发展</h2>
      <div class="timeline">
        <div class="timeline-event" v-for="(event, index) in historyTimeline" :key="index">
          <div class="event-year">{{ event.year }}</div>
          <div class="event-content">
            <h3>{{ event.technology }}</h3>
            <p>{{ event.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// HDD与SSD对比数据
const comparisonData = ref([
  { feature: "工作原理", hdd: "磁性盘片旋转，机械臂读写", ssd: "闪存芯片电子存储" },
  { feature: "读写速度", hdd: "80-160 MB/s", ssd: "500-7000 MB/s" },
  { feature: "随机访问时间", hdd: "5-10 ms", ssd: "0.1 ms" },
  { feature: "耐用性", hdd: "对震动敏感，机械故障率较高", ssd: "无移动部件，抗震性强" },
  { feature: "功耗", hdd: "6-10W (运行)", ssd: "2-5W (运行)" },
  { feature: "噪音", hdd: "可听到旋转和寻道声", ssd: "完全静音" },
  { feature: "容量价格比", hdd: "$0.03/GB", ssd: "$0.08/GB" },
  { feature: "最大容量", hdd: "22TB", ssd: "100TB" },
  { feature: "寿命", hdd: "5-7年", ssd: "5-10年(基于TBW)" }
]);

// 机械硬盘组件
const hddComponents = ref([
  {
    name: "盘片",
    icon: "⭕",
    description: "铝合金或玻璃基片，表面涂覆磁性材料，数据存储介质"
  },
  {
    name: "读写磁头",
    icon: "📌",
    description: "浮动在盘片上方纳米级高度，感应或改变磁性方向"
  },
  {
    name: "音圈电机",
    icon: "🔍",
    description: "精确控制磁头臂在盘片上的移动位置"
  },
  {
    name: "主轴电机",
    icon: "🌀",
    description: "以5400/7200/10000 RPM速度旋转盘片"
  }
]);

// 机械硬盘工作流程
const hddWorkflow = ref([
  {
    title: "寻道",
    description: "磁头臂移动到目标磁道",
    time: "3-15 ms"
  },
  {
    title: "旋转延迟",
    description: "等待目标扇区旋转到磁头下方",
    time: "2-8 ms"
  },
  {
    title: "数据传输",
    description: "磁头读取或写入数据",
    time: "0.05-0.2 ms/扇区"
  }
]);

// 固态硬盘组件
const ssdComponents = ref([
  {
    name: "NAND闪存",
    icon: "🧩",
    description: "非易失性存储芯片，分为SLC/MLC/TLC/QLC"
  },
  {
    name: "控制器",
    icon: "🧠",
    description: "管理数据存储、磨损均衡、垃圾回收等"
  },
  {
    name: "DRAM缓存",
    icon: "⚡",
    description: "高速缓存，提高读写性能(部分SSD省略)"
  },
  {
    name: "FTL层",
    icon: "🗺️",
    description: "闪存转换层，映射逻辑地址到物理地址"
  }
]);

// 固态硬盘工作流程
const ssdWorkflow = ref([
  {
    title: "接收命令",
    description: "从主机接收读写请求",
    time: "< 0.01 ms"
  },
  {
    title: "地址转换",
    description: "通过FTL将逻辑地址转为物理地址",
    time: "0.01-0.05 ms"
  },
  {
    title: "执行操作",
    description: "控制器对NAND闪存进行读/写/擦除",
    time: "0.02-0.5 ms"
  }
]);

// 性能对比数据
const randomRead = ref([
  { type: "HDD (7200 RPM)", value: "0.8 MB/s", width: "10%" },
  { type: "SATA SSD", value: "50 MB/s", width: "40%" },
  { type: "NVMe SSD (PCIe 3.0)", value: "300 MB/s", width: "70%" },
  { type: "NVMe SSD (PCIe 4.0)", value: "700 MB/s", width: "100%" }
]);

const seqWrite = ref([
  { type: "HDD (7200 RPM)", value: "160 MB/s", width: "15%" },
  { type: "SATA SSD", value: "500 MB/s", width: "35%" },
  { type: "NVMe SSD (PCIe 3.0)", value: "2500 MB/s", width: "70%" },
  { type: "NVMe SSD (PCIe 4.0)", value: "7000 MB/s", width: "100%" }
]);

// 适用场景
const hddUseCases = ref([
  "大容量冷数据存储(备份/归档)",
  "NAS网络存储设备",
  "监控视频存储",
  "预算有限的存储解决方案",
  "不需要高性能的应用"
]);

const ssdUseCases = ref([
  "操作系统和应用程序启动盘",
  "游戏存储(快速加载)",
  "高性能工作站和服务器",
  "笔记本电脑(低功耗/抗震)",
  "实时数据处理和分析"
]);

// 技术发展时间线
const historyTimeline = ref([
  {
    year: "1956",
    technology: "IBM 350 RAMAC",
    description: "第一台商用硬盘，5MB容量，50个24英寸盘片"
  },
  {
    year: "1973",
    technology: "Winchester技术",
    description: "IBM发明密封式硬盘，现代HDD基础"
  },
  {
    year: "1980",
    technology: "第一台5.25英寸HDD",
    description: "Shugart ST-506，5MB容量"
  },
  {
    year: "1991",
    technology: "2.5英寸HDD",
    description: "PrairieTek推出首款2.5英寸硬盘"
  },
  {
    year: "1997",
    technology: "GMR磁头",
    description: "IBM推出巨磁阻磁头，大幅提升存储密度"
  },
  {
    year: "2007",
    technology: "首款消费级SSD",
    description: "三星推出32GB SSD，用于笔记本电脑"
  },
  {
    year: "2009",
    technology: "SATA 3.0接口",
    description: "6Gb/s带宽，成为SSD主流接口"
  },
  {
    year: "2013",
    technology: "3D NAND",
    description: "三星推出V-NAND，垂直堆叠存储单元"
  },
  {
    year: "2017",
    technology: "QLC闪存",
    description: "每个存储单元存储4位数据，提升容量降低成本"
  },
  {
    year: "2020",
    technology: "PCIe 4.0 NVMe",
    description: "带宽翻倍至8GB/s，高性能SSD新标准"
  }
]);
</script>

<style lang="less" scoped>
.storage-guide {
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

  h3,
  h4 {
    color: #2980b9;
    margin-top: 0;
    margin-bottom: 15px;
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

  // 对比表格样式
  .comparison {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;

    .comparison-header {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      font-weight: bold;
      background: #2c3e50;
      color: white;

      >div {
        padding: 12px 15px;
        text-align: center;
      }

      .hdd {
        background: #3498db;
      }

      .ssd {
        background: #e74c3c;
      }
    }

    .comparison-row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      border-bottom: 1px solid #eee;

      &:nth-child(odd) {
        background: #f8f9fa;
      }

      &:last-child {
        border-bottom: none;
      }

      >div {
        padding: 10px 15px;
      }

      .feature {
        font-weight: bold;
      }

      .hdd-value {
        color: #2980b9;
      }

      .ssd-value {
        color: #c0392b;
      }
    }
  }

  // HDD和SSD组件样式
  .hdd-explained,
  .ssd-explained {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 25px;

    .hdd-component,
    .ssd-component {
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      background: #f8f9fa;
      text-align: center;

      .comp-icon {
        font-size: 2rem;
        margin-bottom: 10px;
      }

      p {
        color: #555;
        line-height: 1.5;
        margin: 10px 0 0;
        font-size: 0.95rem;
      }
    }
  }

  // 工作流程
  .workflow {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 15px;

    .step {
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
        h4 {
          margin-top: 0;
          margin-bottom: 8px;
        }

        p {
          margin: 0 0 8px;
          color: #555;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .step-time {
          font-size: 0.85rem;
          color: #e74c3c;
          font-weight: bold;
        }
      }
    }
  }

  // 性能图表
  .performance-charts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;

    .chart {
      h3 {
        margin-bottom: 15px;
        text-align: center;
      }
    }

    .chart-bar {
      margin-bottom: 15px;

      .chart-label {
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 0.95rem;
      }

      .chart-bar-inner {
        height: 30px;
        background: linear-gradient(to right, #3498db, #2ecc71);
        border-radius: 4px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        transition: width 0.5s ease;

        .chart-value {
          color: white;
          font-weight: bold;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }

  // 应用场景
  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;

    .case-card {
      padding: 20px;
      border-radius: 8px;

      h3 {
        margin-top: 0;
        padding-bottom: 10px;
        border-bottom: 2px solid;
      }

      ul {
        padding-left: 20px;
        margin-top: 15px;

        li {
          margin-bottom: 10px;
          line-height: 1.5;
        }
      }
    }

    .hdd-case {
      background: #e3f2fd;
      border: 1px solid #bbdefb;

      h3 {
        color: #1565c0;
        border-color: #1565c0;
      }
    }

    .ssd-case {
      background: #ffebee;
      border: 1px solid #ffcdd2;

      h3 {
        color: #c62828;
        border-color: #c62828;
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
    .hdd-explained,
    .ssd-explained,
    .use-cases,
    .performance-charts {
      grid-template-columns: 1fr;
    }

    .comparison-header,
    .comparison-row {
      grid-template-columns: 1fr;

      >div {
        padding: 8px 10px;
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
