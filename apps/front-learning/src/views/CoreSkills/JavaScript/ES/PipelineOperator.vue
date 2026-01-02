<template>
  <div class="pipeline-container">
    <!-- 标题部分 -->
    <header class="header">
      <h1>➡️ 管道操作符提案解析</h1>
      <p class="subtitle">JavaScript 函数式编程新范式</p>
      <div class="proposal-status">Stage 2 Proposal</div>
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

      <!-- 语法风格对比 -->
      <section class="syntax-section">
        <h2 class="section-title">
          <span class="icon">📜</span>
          语法风格对比
        </h2>
        <div class="syntax-comparison">
          <div class="syntax-card fsharp">
            <h4>F# 风格</h4>
            <pre>value
  |> func1
  |> func2(arg)
  |> func3</pre>
            <ul class="syntax-points">
              <li v-for="(point, index) in fsharpStyle" :key="index">{{ point }}</li>
            </ul>
          </div>
          <div class="syntax-divider">vs</div>
          <div class="syntax-card hack">
            <h4>Hack 风格</h4>
            <pre>value
  |> func1(%)
  |> func2(%, arg)
  |> func3(%)</pre>
            <ul class="syntax-points">
              <li v-for="(point, index) in hackStyle" :key="index">{{ point }}</li>
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
interface Feature {
  icon: string;
  title: string;
  description: string;
  syntax: string;
}

interface Scenario {
  icon: string;
  title: string;
  points: string[];
}

const features = ref<Feature[]>([
  {
    icon: "📐",
    title: "链式调用优化",
    description: "将嵌套调用转换为从左到右的线性执行流程",
    syntax: "const result = x |> double |> add(5) |> square;"
  },
  {
    icon: "🧩",
    title: "占位符支持",
    description: "使用占位符(%)灵活控制参数位置",
    syntax: "str |> replace(%, 'a', 'b') |> toUpperCase;"
  },
  {
    icon: "⚡",
    title: "异步管道",
    description: "支持Promise链式调用",
    syntax: "response |> await |> processData |> saveToDB;"
  }
]);

const fsharpStyle = ref([
  '自动传递前值作为最后一个参数',
  '更简洁的书写方式',
  '适合数学计算场景'
]);

const hackStyle = ref([
  '显式指定参数位置',
  '更灵活的传参方式',
  '适合需要明确参数位置的场景'
]);

const scenarios = ref<Scenario[]>([
  {
    icon: "📊",
    title: "数据处理流水线",
    points: [
      "数据清洗转换",
      "多步骤计算",
      "可视化数据处理流程"
    ]
  },
  {
    icon: "🛠️",
    title: "函数式编程",
    points: [
      "组合函数应用",
      "Point-free风格",
      "复杂逻辑拆解"
    ]
  },
  {
    icon: "🔗",
    title: "异步操作链",
    points: [
      "Promise链式调用",
      "异步数据处理",
      "可读的异步流程"
    ]
  }
]);

const importantNotes = ref([
  '当前提案处于Stage 2阶段',
  '需要Babel插件支持（@babel/plugin-proposal-pipeline-operator）',
  '两种语法风格尚未最终确定',
  '与可选链操作符配合使用时需注意优先级'
]);
</script>

<style lang="less" scoped>
@primary-color: #2196f3;
@warning-color: #ff9800;
@success-color: #4caf50;
@error-color: #e53935;

.pipeline-container {
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
      background: @warning-color;
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

  .syntax-section {
    margin: 3rem 0;

    .syntax-comparison {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 2rem;
      align-items: center;
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

      .syntax-card {
        text-align: center;

        pre {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          font-family: 'Fira Code', monospace;
        }

        &.fsharp {
          border-right: 2px solid #eee;
          padding-right: 2rem;
        }

        &.hack {
          padding-left: 2rem;
        }
      }

      .syntax-divider {
        font-size: 1.5rem;
        color: #7f8c8d;
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
          color: @error-color;
          position: absolute;
          left: -1rem;
        }
      }
    }
  }
}
</style>
