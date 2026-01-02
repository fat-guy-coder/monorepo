<template>
  <div class="temporal-container">
    <!-- 标题部分 -->
    <header class="header">
      <h1>⏳ ECMAScript Temporal</h1>
      <p class="subtitle">下一代日期时间处理方案</p>
      <div class="proposal-status">Stage 3 Proposal</div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 核心概念 -->
      <section class="concept-section">
        <h2 class="section-title">
          <span class="icon">🌟</span>
          核心特性
        </h2>
        <div class="feature-grid">
          <div v-for="(feature, index) in features" :key="index" class="feature-card">
            <div class="feature-header">
              <span class="feature-icon">{{ feature.icon }}</span>
              <h3>{{ feature.title }}</h3>
            </div>
            <p class="feature-desc">{{ feature.description }}</p>
            <pre class="code-sample">{{ feature.syntax }}</pre>
          </div>
        </div>
      </section>

      <!-- 主要类型 -->
      <section class="type-section">
        <h2 class="section-title">
          <span class="icon">📦</span>
          核心类型体系
        </h2>
        <div class="type-grid">
          <div v-for="(type, index) in temporalTypes" :key="index" class="type-card">
            <div class="type-header">
              <h4>{{ type.name }}</h4>
              <span class="type-duration">{{ type.duration }}</span>
            </div>
            <ul class="type-props">
              <li v-for="(prop, pIndex) in type.properties" :key="pIndex">{{ prop }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="scenario-section">
        <h2 class="section-title">
          <span class="icon">🎯</span>
          典型应用场景
        </h2>
        <div class="scenario-grid">
          <div v-for="(scene, index) in scenarios" :key="index" class="scene-card">
            <div class="scene-icon">{{ scene.icon }}</div>
            <h4>{{ scene.title }}</h4>
            <ul class="scene-points">
              <li v-for="(point, pIndex) in scene.points" :key="pIndex">{{ point }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 注意事项 -->
      <div class="notice-section">
        <h3>⚠️ 重要注意事项</h3>
        <ul>
          <li v-for="(note, index) in importantNotes" :key="index">{{ note }}</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface TemporalFeature {
  icon: string;
  title: string;
  description: string;
  syntax: string;
}

interface TemporalType {
  name: string;
  duration: string;
  properties: string[];
}

interface Scenario {
  icon: string;
  title: string;
  points: string[];
}

const features = ref<TemporalFeature[]>([
  {
    icon: "🔒",
    title: "不可变性",
    description: "所有Temporal对象都是不可变的",
    syntax: "const date = Temporal.Now.plainDateISO();\nconst newDate = date.add({ days: 1 });"
  },
  {
    icon: "🌐",
    title: "时区支持",
    description: "原生支持时区转换和夏令时处理",
    syntax: "Temporal.ZonedDateTime.from('2024-01-01T12:00[Asia/Shanghai]');"
  },
  {
    icon: "⏱️",
    title: "精确时间",
    description: "支持纳秒级精度时间计算",
    syntax: "const instant = Temporal.Instant.from('2024-01-01T00:00:00Z');"
  }
]);

const temporalTypes = ref<TemporalType[]>([
  {
    name: "Temporal.Instant",
    duration: "时间点",
    properties: ["表示绝对时间", "UTC时区", "适合存储时间戳"]
  },
  {
    name: "Temporal.ZonedDateTime",
    duration: "时区时间",
    properties: ["带时区信息", "自动处理夏令时", "适合显示本地时间"]
  },
  {
    name: "Temporal.PlainDate",
    duration: "日历日期",
    properties: ["无时间信息", "无时区信息", "适合生日等日期"]
  }
]);

const scenarios = ref<Scenario[]>([
  {
    icon: "💹",
    title: "金融计算",
    points: ["利息计算", "交易时间精确处理", "跨时区结算"]
  },
  {
    icon: "🌍",
    title: "国际化应用",
    points: ["多时区转换", "本地化时间显示", "节假日计算"]
  },
  {
    icon: "📅",
    title: "日历系统",
    points: ["重复事件处理", "会议安排", "时区敏感提醒"]
  }
]);

const importantNotes = ref([
  '当前为Stage 3提案，API可能发生变化',
  '需要polyfill支持（@js-temporal/polyfill）',
  '暂未正式纳入ECMAScript标准',
  '处理历史日期时需注意历法变更'
]);
</script>

<style scoped lang="less">
.temporal-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);

  .header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;

    h1 {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #7f8c8d;
      font-size: 1.1rem;
    }

    .proposal-status {
      position: absolute;
      top: -1rem;
      right: -1rem;
      background: #ff9800;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transform: rotate(5deg);
    }
  }

  .concept-section {
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;

      .feature-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

        .feature-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;

          .feature-icon {
            font-size: 1.8rem;
          }
        }

        .code-sample {
          background: #2c3e50;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          font-family: 'Fira Code', monospace;
          white-space: pre-wrap;
          margin-top: 1rem;
        }
      }
    }
  }

  .type-section {
    margin: 3rem 0;

    .type-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;

      .type-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

        .type-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;

          .type-duration {
            font-size: 0.8rem;
            background: #e3f2fd;
            padding: 0.3rem 0.7rem;
            border-radius: 4px;
          }
        }

        .type-props {
          list-style: none;
          padding-left: 1rem;

          li {
            padding: 0.3rem 0;
            position: relative;

            &::before {
              content: "•";
              color: #2196F3;
              position: absolute;
              left: -1rem;
            }
          }
        }
      }
    }
  }

  .scenario-section {
    .scenario-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;

      .scene-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        text-align: center;

        .scene-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .scene-points {
          list-style: none;
          padding-left: 0;

          li {
            padding: 0.3rem 0;
          }
        }
      }
    }
  }

  .notice-section {
    background: #fff3e0;
    border-radius: 12px;
    padding: 2rem;
    margin-top: 2rem;

    ul {
      list-style: none;
      padding-left: 1rem;

      li {
        padding: 0.5rem 0;
        position: relative;

        &::before {
          content: "•";
          color: #e53935;
          position: absolute;
          left: -1rem;
        }
      }
    }
  }
}
</style>
