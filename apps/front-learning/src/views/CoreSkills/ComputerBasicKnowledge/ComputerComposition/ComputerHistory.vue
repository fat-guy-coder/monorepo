<template>
  <div class="computer-history">
    <h1>计算机发展历史时间轴</h1>
    <div class="timeline">
      <div v-for="(era, index) in computerEras" :key="index" class="era">
        <div class="era-header">
          <h2>{{ era.period }} ({{ era.years }})</h2>
          <div class="tech-tags">
            <span v-for="(tag, tagIndex) in era.techTags" :key="tagIndex" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="milestones">
          <div v-for="(milestone, mIndex) in era.milestones" :key="mIndex" class="milestone">
            <div class="year">{{ milestone.year }}</div>
            <div class="content">
              <h3>{{ milestone.title }}</h3>
              <p>{{ milestone.description }}</p>
              <div v-if="milestone.impact" class="impact">
                <strong>影响:</strong> {{ milestone.impact }}
              </div>
              <div v-if="milestone.people" class="people">
                <strong>关键人物:</strong> {{ milestone.people }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="evolution-section">
      <h2>关键技术演进</h2>
      <div class="evolution-grid">
        <div class="evolution-category">
          <h3>硬件发展</h3>
          <ul>
            <li v-for="(item, idx) in hardwareEvolution" :key="idx">
              <strong>{{ item.period }}:</strong> {{ item.description }}
            </li>
          </ul>
        </div>
        <div class="evolution-category">
          <h3>软件演进</h3>
          <ul>
            <li v-for="(item, idx) in softwareEvolution" :key="idx">
              <strong>{{ item.period }}:</strong> {{ item.description }}
            </li>
          </ul>
        </div>
        <div class="evolution-category">
          <h3>理论突破</h3>
          <ul>
            <li v-for="(item, idx) in theoryEvolution" :key="idx">
              <strong>{{ item.year }}:</strong> {{ item.description }} <em>({{ item.scientist }})</em>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="speed-comparison">
      <h2>计算能力指数级增长</h2>
      <div class="speed-chart">
        <div v-for="(item, idx) in computingSpeed" :key="idx" class="speed-item">
          <div class="speed-label">{{ item.era }}</div>
          <div class="speed-bar" :style="{ width: item.width }">
            <span class="speed-value">{{ item.speed }}</span>
          </div>
          <div class="speed-example">{{ item.example }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 计算机发展时代数据
const computerEras = ref([
  {
    period: "机械计算时代",
    years: "1600s-1930s",
    techTags: ["齿轮系统", "差分机", "分析机"],
    milestones: [
      {
        year: "1642",
        title: "帕斯卡计算器",
        description: "布莱兹·帕斯卡发明了第一台机械计算器，可进行加减运算",
        people: "布莱兹·帕斯卡",
        impact: "奠定了机械计算的基础"
      },
      {
        year: "1822",
        title: "差分机设计",
        description: "查尔斯·巴贝奇设计差分机，可计算多项式函数",
        people: "查尔斯·巴贝奇",
        impact: "开创了可编程计算机的概念"
      },
      {
        year: "1890",
        title: "霍尔瑞斯制表机",
        description: "使用穿孔卡片处理1890年美国人口普查数据",
        people: "赫尔曼·霍尔瑞斯",
        impact: "开启了自动数据处理时代"
      }
    ]
  },
  {
    period: "电子管时代",
    years: "1940s-1950s",
    techTags: ["真空管", "机器语言", "穿孔卡片"],
    milestones: [
      {
        year: "1943",
        title: "巨人计算机",
        description: "英国用于破解德国密码的第一台可编程电子计算机",
        impact: "加速二战结束进程"
      },
      {
        year: "1946",
        title: "ENIAC诞生",
        description: "第一台通用电子计算机，重30吨，占地167平方米",
        people: "莫奇利和埃克特",
        impact: "每秒5000次运算，比人工计算快1000倍"
      },
      {
        year: "1949",
        title: "EDSAC",
        description: "第一台存储程序式计算机",
        people: "莫里斯·威尔克斯",
        impact: "确立了现代计算机体系结构"
      }
    ]
  },
  {
    period: "晶体管时代",
    years: "1950s-1960s",
    techTags: ["晶体管", "高级语言", "磁芯内存"],
    milestones: [
      {
        year: "1954",
        title: "TRADIC",
        description: "第一台全晶体管计算机",
        impact: "体积和功耗大幅降低"
      },
      {
        year: "1957",
        title: "FORTRAN语言",
        description: "第一种高级编程语言",
        people: "约翰·巴克斯",
        impact: "编程效率提高10倍"
      },
      {
        year: "1964",
        title: "IBM System/360",
        description: "第一款兼容的计算机系统家族",
        impact: "确立了计算机兼容性标准"
      }
    ]
  },
  {
    period: "集成电路时代",
    years: "1960s-1970s",
    techTags: ["集成电路", "操作系统", "分时系统"],
    milestones: [
      {
        year: "1965",
        title: "摩尔定律提出",
        description: "集成电路上的晶体管数量每18-24个月翻一番",
        people: "戈登·摩尔",
        impact: "预测了计算能力指数级增长"
      },
      {
        year: "1969",
        title: "UNIX操作系统",
        description: "第一个现代操作系统",
        people: "肯·汤普森和丹尼斯·里奇",
        impact: "影响至今的操作系统设计"
      },
      {
        year: "1971",
        title: "微处理器诞生",
        description: "Intel 4004 - 第一个商用微处理器",
        people: "泰德·霍夫",
        impact: "开启个人计算机时代"
      }
    ]
  },
  {
    period: "个人计算机时代",
    years: "1970s-1990s",
    techTags: ["微处理器", "GUI", "个人电脑"],
    milestones: [
      {
        year: "1976",
        title: "Apple I",
        description: "史蒂夫·沃兹尼亚克设计的首批个人计算机之一",
        people: "史蒂夫·沃兹尼亚克",
        impact: "开创了家用计算机市场"
      },
      {
        year: "1981",
        title: "IBM PC",
        description: "定义了个人计算机标准",
        impact: "一年内售出20万台"
      },
      {
        year: "1984",
        title: "Macintosh",
        description: "首款成功商业化的图形界面计算机",
        people: "苹果公司",
        impact: "改变了人机交互方式"
      }
    ]
  },
  {
    period: "互联网时代",
    years: "1990s-2000s",
    techTags: ["互联网", "万维网", "搜索引擎"],
    milestones: [
      {
        year: "1991",
        title: "万维网诞生",
        description: "蒂姆·伯纳斯-李发明了WWW和第一个网页浏览器",
        people: "蒂姆·伯纳斯-李",
        impact: "连接全球信息"
      },
      {
        year: "1998",
        title: "Google成立",
        description: "革命性的PageRank搜索算法",
        impact: "信息检索方式的根本变革"
      },
      {
        year: "2007",
        title: "iPhone发布",
        description: "重新定义移动计算",
        people: "苹果公司",
        impact: "开启移动互联网时代"
      }
    ]
  },
  {
    period: "人工智能时代",
    years: "2010s-至今",
    techTags: ["深度学习", "云计算", "量子计算"],
    milestones: [
      {
        year: "2012",
        title: "深度学习突破",
        description: "AlexNet在ImageNet竞赛中大幅降低错误率",
        impact: "开启现代AI浪潮"
      },
      {
        year: "2016",
        title: "AlphaGo战胜李世石",
        description: "AI首次在围棋上击败人类世界冠军",
        people: "DeepMind",
        impact: "展示AI在复杂决策中的能力"
      },
      {
        year: "2020",
        title: "GPT-3发布",
        description: "1750亿参数的自然语言处理模型",
        people: "OpenAI",
        impact: "展示大规模语言模型的潜力"
      },
      {
        year: "2025",
        title: "DeepSeek发布",
        description: "1750亿参数的自然语言处理模型，",
        people: "DeepSeek",
        impact: "展示大规模语言模型的潜力，开启AI新时代"
      },
      {
        year: "2025",
        title: "Claude 4发布",
        description: "拥有高级推理、视觉分析、代码生成、多语言处理、多模态等能力",
        people: "Anthropic",
        impact: "再次冲击AI领域"
      },
      {
        year: "2025",
        title: "抓住AI浪潮",
        description: "你能看到这句话，你我都有机会，成为受益者",
        people: "你和我",
        impact: "成为风口上的猪，飞一点点也可以，不要错过"
      }
    ]
  }
]);

// 技术演进数据
const hardwareEvolution = ref([
  { period: "1940s", description: "真空管 - 房间大小的计算机" },
  { period: "1950s", description: "晶体管 - 冰箱大小的计算机" },
  { period: "1960s", description: "集成电路 - 书桌大小的计算机" },
  { period: "1970s", description: "微处理器 - 个人电脑诞生" },
  { period: "1980s", description: "超大规模集成电路 - 便携式计算机" },
  { period: "2000s", description: "多核处理器 - 并行计算普及" },
  { period: "2010s", description: "GPU加速计算 - 深度学习革命" },
  { period: "2020s", description: "专用AI芯片 - TPU/NPU" }
]);

const softwareEvolution = ref([
  { period: "1940s", description: "机器语言 - 二进制编程" },
  { period: "1950s", description: "汇编语言 - 符号化编程" },
  { period: "1957", description: "FORTRAN - 首个高级语言" },
  { period: "1960s", description: "操作系统 - 管理硬件资源" },
  { period: "1970s", description: "C语言 - 系统编程标准" },
  { period: "1980s", description: "面向对象编程 - C++/Smalltalk" },
  { period: "1990s", description: "互联网技术 - HTML/JavaScript" },
  { period: "2000s", description: "开源运动 - Linux/Android" },
  { period: "2010s", description: "容器化 - Docker/Kubernetes" }
]);

const theoryEvolution = ref([
  { year: "1936", description: "图灵机模型", scientist: "艾伦·图灵" },
  { year: "1945", description: "冯·诺依曼架构", scientist: "约翰·冯·诺依曼" },
  { year: "1948", description: "信息论", scientist: "克劳德·香农" },
  { year: "1965", description: "摩尔定律", scientist: "戈登·摩尔" },
  { year: "1976", description: "RSA加密算法", scientist: "Rivest, Shamir, Adleman" },
  { year: "1994", description: "Shor量子算法", scientist: "彼得·秀尔" }
]);

// 计算速度比较数据
const computingSpeed = ref([
  { era: "1946 ENIAC", speed: "500 FLOPS", width: "5%", example: "每秒500次加法运算" },
  { era: "1954 IBM 704", speed: "12,000 FLOPS", width: "10%", example: "第一个浮点运算计算机" },
  { era: "1964 CDC 6600", speed: "3 MFLOPS", width: "15%", example: "当时最快的超级计算机" },
  { era: "1976 Cray-1", speed: "160 MFLOPS", width: "25%", example: "向量处理架构" },
  { era: "1996 ASCI Red", speed: "1 TFLOPS", width: "40%", example: "首个teraFLOPS计算机" },
  { era: "2008 Roadrunner", speed: "1 PFLOPS", width: "60%", example: "首个petaFLOPS计算机" },
  { era: "2022 Frontier", speed: "1.1 EFLOPS", width: "95%", example: "首个exaFLOPS超级计算机" }
]);
</script>

<style lang="less" scoped>
.computer-history {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);

  h1,
  h2,
  h3 {
    color: #2c3e50;
    margin-bottom: 15px;
  }

  h1 {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid #3498db;
  }

  h2 {
    font-size: 1.8rem;
    padding-left: 10px;
    border-left: 4px solid #3498db;
  }

  .timeline {
    position: relative;
    padding-left: 30px;
    margin-bottom: 40px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: #3498db;
    }
  }

  .era {
    margin-bottom: 35px;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);

    .era-header {
      background: #2c3e50;
      color: white;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        margin: 0;
        font-size: 1.5rem;
        border: none;
        color: white;
        padding: 0;
      }
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .tag {
        background: #3498db;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.85rem;
      }
    }
  }

  .milestones {
    padding: 15px;
  }

  .milestone {
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #e0e0e0;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .year {
      min-width: 70px;
      font-weight: bold;
      font-size: 1.2rem;
      color: #e74c3c;
      padding-right: 15px;
    }

    .content {
      flex: 1;

      h3 {
        margin-top: 0;
        font-size: 1.3rem;
        color: #2980b9;
      }

      p {
        margin: 8px 0;
        line-height: 1.5;
      }

      .impact,
      .people {
        font-size: 0.9rem;
        padding: 5px 0;
        color: #555;
      }
    }
  }

  .evolution-section {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    margin-bottom: 30px;

    h2 {
      text-align: center;
      border: none;
      margin-bottom: 25px;
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 100px;
        height: 3px;
        background: #3498db;
        margin: 10px auto 0;
      }
    }
  }

  .evolution-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;

    .evolution-category {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      border-left: 3px solid #3498db;

      h3 {
        margin-top: 0;
        color: #2c3e50;
        font-size: 1.3rem;
      }

      ul {
        padding-left: 20px;
        margin: 0;

        li {
          margin-bottom: 10px;
          line-height: 1.5;
          padding-left: 5px;

          strong {
            color: #e74c3c;
          }

          em {
            color: #7f8c8d;
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  .speed-comparison {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);

    h2 {
      text-align: center;
      border: none;
      margin-bottom: 25px;
    }
  }

  .speed-chart {
    background: #f1f2f6;
    padding: 20px;
    border-radius: 6px;
  }

  .speed-item {
    margin-bottom: 15px;

    .speed-label {
      font-weight: bold;
      margin-bottom: 5px;
      color: #2c3e50;
      font-size: 0.9rem;
    }

    .speed-bar {
      background: linear-gradient(to right, #3498db, #2ecc71);
      height: 30px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      transition: width 0.5s ease;

      .speed-value {
        color: white;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }
    }

    .speed-example {
      font-size: 0.85rem;
      color: #7f8c8d;
      margin-top: 5px;
      padding-left: 5px;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;

    h1 {
      font-size: 1.8rem;
    }

    .era-header {
      flex-direction: column;
      align-items: flex-start !important;

      .tech-tags {
        margin-top: 10px;
      }
    }

    .milestone {
      flex-direction: column;

      .year {
        margin-bottom: 5px;
      }
    }

    .evolution-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>