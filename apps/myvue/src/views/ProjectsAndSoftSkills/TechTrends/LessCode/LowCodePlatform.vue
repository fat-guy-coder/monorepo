<template>
  <div class="low-code-platform-container">
    <div class="header">
      <h1>低代码开发平台</h1>
      <p class="subtitle">加速应用开发的革命性技术</p>
    </div>

    <div class="content-wrapper">
      <!-- 简介部分 -->
      <section class="card intro-card">
        <div class="section-header">
          <h2><i class="icon icon-intro"></i> 什么是低代码平台？</h2>
        </div>
        <div class="intro-content">
          <p>
            低代码开发平台（Low-Code Development Platform）是一种可视化应用开发方法，通过图形化用户界面和配置代替传统的手工编码。
            开发者可以通过拖拽组件和模型驱动的逻辑来创建网页和移动应用，大幅减少代码编写量。
          </p>
          <div class="statistics">
            <div class="stat-item">
              <div class="stat-value">60-90%</div>
              <div class="stat-label">开发时间减少</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">70%+</div>
              <div class="stat-label">企业采用率</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">2025</div>
              <div class="stat-label">市场达$1870亿</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景部分 -->
      <section class="card">
        <div class="section-header">
          <h2><i class="icon icon-scenario"></i> 主要使用场景（按热度排序）</h2>
        </div>
        <ul class="scenario-list">
          <li v-for="(scenario, index) in scenarios" :key="index" class="scenario-item">
            <div class="rank-badge">{{ index + 1 }}</div>
            <div>
              <h3>{{ scenario.title }}</h3>
              <p>{{ scenario.description }}</p>
            </div>
          </li>
        </ul>
      </section>

      <!-- 优缺点对比 -->
      <div class="comparison-section">
        <!-- 优点部分 -->
        <section class="card pros-card">
          <div class="section-header">
            <h2><i class="icon icon-pros"></i> 低代码平台优点（按重要性排序）</h2>
          </div>
          <ul class="pros-list">
            <li v-for="(pro, index) in pros" :key="index" class="pro-item">
              <div class="pro-rank">{{ index + 1 }}</div>
              <div class="pro-content">
                <strong>{{ pro.title }}</strong>
                <p>{{ pro.description }}</p>
              </div>
            </li>
          </ul>
        </section>

        <!-- 缺点部分 -->
        <section class="card cons-card">
          <div class="section-header">
            <h2><i class="icon icon-cons"></i> 低代码平台缺点（按严重性排序）</h2>
          </div>
          <ul class="cons-list">
            <li v-for="(con, index) in cons" :key="index" class="con-item">
              <div class="con-rank">{{ index + 1 }}</div>
              <div class="con-content">
                <strong>{{ con.title }}</strong>
                <p>{{ con.description }}</p>
              </div>
            </li>
          </ul>
        </section>
      </div>

      <!-- 适用性建议 -->
      <section class="card">
        <div class="section-header">
          <h2><i class="icon icon-tips"></i> 适用性建议</h2>
        </div>
        <div class="recommendation">
          <p>低代码平台最适合以下类型的项目：</p>
          <ul>
            <li>业务需求变化快的应用</li>
            <li>需要快速交付的MVP（最小可行产品）</li>
            <li>企业内部管理系统</li>
            <li>数据收集和表单驱动应用</li>
            <li>与其他系统集成的工作流</li>
          </ul>
          <p class="warning">不适合以下场景：</p>
          <ul>
            <li>高性能计算或实时处理需求高的系统</li>
            <li>需要高度定制UI/UX的消费者应用</li>
            <li>需要复杂算法或特殊硬件交互的应用</li>
          </ul>
        </div>
      </section>
    </div>

    <div class="footer">
      <p> 低代码平台分析报告 | 数据来源：行业研究报告</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 使用场景数据
const scenarios = ref([
  {
    title: "企业内部管理系统",
    description: "快速构建CRM、ERP、HRM等系统，满足企业日常管理需求"
  },
  {
    title: "数据收集与表单应用",
    description: "创建调查问卷、申请表单、数据上报系统等"
  },
  {
    title: "工作流自动化",
    description: "设计审批流程、业务自动化、任务分配系统"
  },
  {
    title: "移动应用开发",
    description: "快速构建跨平台移动应用，支持iOS和Android"
  },
  {
    title: "快速原型开发",
    description: "快速验证业务想法，构建概念证明(POC)"
  },
  {
    title: "电子商务平台",
    description: "搭建在线商店、产品目录、购物车和订单系统"
  },
  {
    title: "报告与仪表盘",
    description: "创建数据可视化看板，实时监控业务指标"
  },
  {
    title: "门户网站开发",
    description: "构建企业内部门户或客户门户网站"
  },
  {
    title: "API集成中间件",
    description: "连接不同系统，实现数据同步和流程整合"
  },
  {
    title: "物联网(IoT)应用",
    description: "监控设备数据，创建简单的IoT控制面板"
  }
]);

// 优点数据
const pros = ref([
  {
    title: "开发效率大幅提升",
    description: "相比传统开发，可减少60-90%的开发时间"
  },
  {
    title: "降低技术门槛",
    description: "公民开发者(业务人员)可参与应用创建"
  },
  {
    title: "降低开发成本",
    description: "减少对高级开发人员的依赖，节省人力成本"
  },
  {
    title: "快速迭代能力",
    description: "轻松修改和更新应用，响应业务变化"
  },
  {
    title: "可视化开发体验",
    description: "拖拽式界面使开发过程直观易懂"
  },
  {
    title: "内置最佳实践",
    description: "平台内置安全、性能和可访问性标准"
  },
  {
    title: "跨平台兼容性",
    description: "一次开发，多端部署(Web/移动/桌面)"
  },
  {
    title: "简化维护工作",
    description: "集中式管理减少系统维护复杂度"
  },
  {
    title: "促进业务-IT协作",
    description: "业务人员可直接参与应用设计和测试"
  },
  {
    title: "降低技术债务",
    description: "标准化组件减少自定义代码的积累"
  }
]);

// 缺点数据
const cons = ref([
  {
    title: "灵活性受限",
    description: "无法实现高度定制化的功能和界面"
  },
  {
    title: "供应商锁定风险",
    description: "迁移到其他平台成本高，存在依赖性"
  },
  {
    title: "性能瓶颈",
    description: "复杂场景下可能遇到性能问题"
  },
  {
    title: "复杂逻辑实现困难",
    description: "非常规业务逻辑难以通过可视化实现"
  },
  {
    title: "长期成本可能增加",
    description: "订阅费用随着规模扩大可能超过传统开发"
  },
  {
    title: "集成限制",
    description: "与特殊系统或老旧系统集成困难"
  },
  {
    title: "安全风险",
    description: "依赖平台安全机制，自定义安全控制有限"
  },
  {
    title: "学习曲线存在",
    description: "仍需学习平台特定概念和工作流"
  },
  {
    title: "扩展性挑战",
    description: "应对大规模用户或高并发场景能力有限"
  },
  {
    title: "调试困难",
    description: "问题排查比传统代码更复杂"
  }
]);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4895ef;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #343a40;
@border-color: #e9ecef;
@pros-color: #4cc9f0;
@cons-color: #f72585;
@rank-color: #7209b7;

.low-code-platform-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: @light-bg;
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px 0;
    border-bottom: 1px solid @border-color;

    h1 {
      color: @primary-color;
      font-size: 2.5rem;
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 1.2rem;
      color: lighten(@text-color, 20%);
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .content-wrapper {
    display: grid;
    gap: 25px;
  }

  .card {
    background: @card-bg;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }
  }

  .section-header {
    padding: 18px 25px;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    color: white;

    h2 {
      margin: 0;
      font-size: 1.4rem;
      display: flex;
      align-items: center;

      .icon {
        display: inline-block;
        width: 28px;
        height: 28px;
        margin-right: 12px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .icon-intro::after {
        width: 14px;
        height: 14px;
        background: white;
        border-radius: 2px;
      }

      .icon-scenario::after {
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 12px solid white;
      }

      .icon-pros::after {
        width: 16px;
        height: 16px;
        background: white;
        clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
      }

      .icon-cons::after {
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 50%;
      }

      .icon-tips::after {
        width: 14px;
        height: 14px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
      }
    }
  }

  .intro-card {
    .intro-content {
      padding: 25px;

      p {
        font-size: 1.1rem;
        margin-bottom: 20px;
      }
    }

    .statistics {
      display: flex;
      justify-content: space-around;
      text-align: center;
      margin-top: 20px;
      flex-wrap: wrap;

      .stat-item {
        padding: 15px;
        min-width: 150px;

        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          color: @primary-color;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.95rem;
          color: lighten(@text-color, 20%);
        }
      }
    }
  }

  .scenario-list {
    padding: 0;
    margin: 0;

    .scenario-item {
      display: flex;
      padding: 18px 25px;
      border-bottom: 1px solid @border-color;
      transition: background-color 0.2s;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: lighten(@accent-color, 40%);
      }

      .rank-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, @rank-color, lighten(@rank-color, 15%));
        color: white;
        border-radius: 50%;
        font-weight: bold;
        font-size: 1.1rem;
        margin-right: 20px;
        flex-shrink: 0;
      }

      h3 {
        margin: 0 0 8px 0;
        color: @secondary-color;
        font-size: 1.2rem;
      }

      p {
        margin: 0;
        color: lighten(@text-color, 15%);
      }
    }
  }

  .comparison-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .pros-card {
      .section-header {
        background: linear-gradient(135deg, @pros-color, darken(@pros-color, 15%));
      }
    }

    .cons-card {
      .section-header {
        background: linear-gradient(135deg, @cons-color, darken(@cons-color, 15%));
      }
    }
  }

  .pros-list,
  .cons-list {
    padding: 20px 0;
    margin: 0;

    .pro-item,
    .con-item {
      display: flex;
      padding: 15px 25px;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        border-bottom: none;
      }
    }

    .pro-rank {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: lighten(@pros-color, 30%);
      color: darken(@pros-color, 30%);
      border-radius: 50%;
      font-weight: bold;
      margin-right: 15px;
      flex-shrink: 0;
    }

    .con-rank {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: lighten(@cons-color, 30%);
      color: darken(@cons-color, 30%);
      border-radius: 50%;
      font-weight: bold;
      margin-right: 15px;
      flex-shrink: 0;
    }

    .pro-content,
    .con-content {
      strong {
        display: block;
        margin-bottom: 5px;
        color: @text-color;
      }

      p {
        margin: 0;
        color: lighten(@text-color, 15%);
        font-size: 0.95rem;
      }
    }
  }

  .recommendation {
    padding: 25px;

    p {
      margin-top: 0;

      &.warning {
        color: @cons-color;
        font-weight: 500;
        margin-top: 20px;
      }
    }

    ul {
      padding-left: 20px;
      margin: 15px 0;

      li {
        margin-bottom: 8px;
        padding-left: 5px;
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px 0;
    color: lighten(@text-color, 30%);
    font-size: 0.9rem;
    border-top: 1px solid @border-color;
  }
}
</style>
