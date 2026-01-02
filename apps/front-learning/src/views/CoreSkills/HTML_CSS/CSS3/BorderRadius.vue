<template>
  <div class="border-radius-container">
    <header class="header">
      <h1>⭕ CSS Border-Radius 交互演示</h1>
    </header>

    <div>
      <h2>🔍 圆角属性</h2>
      <p>
        border-radius 属性用于设置元素的圆角。它可以接受一个或多个值，表示不同的圆角半径。
      </p>
      <div class="code-display">
        <pre><code>/* 一个值 */
border-radius: 10px(全部)
/* 两个值 */
border-radius: 10px(水平半径) 20px(垂直半径);
/* 四个值 */
border-radius: 10px(左上角) 20px(右上角) 30px(右下角) 40px(左下角);
</code></pre>
      </div>
    </div>

    <main class="main-content">
      <!-- 控制面板 -->
      <div class="control-panel">
        <div class="slider-group" v-for="(corner, index) in corners" :key="index">
          <h3>{{ cornerLabels[index] }}</h3>
          <div class="sliders">
            <div class="slider-item">
              <label>水平半径</label>
              <input type="range" min="0" max="100" v-model.number="corner.horizontal" @input="updateRadius">
              <span>{{ corner.horizontal }}%</span>
            </div>
            <div class="slider-item">
              <label>垂直半径</label>
              <input type="range" min="0" max="100" v-model.number="corner.vertical" @input="updateRadius">
              <span>{{ corner.vertical }}%</span>
            </div>
          </div>
        </div>
        <button class="reset-btn" @click="resetRadius">重置</button>
      </div>

      <!-- 演示图形 -->
      <div class="demo-area">
        <div class="shape" :style="shapeStyle"></div>
        <div class="code-display">
          <pre>border-radius: {{ computedRadius }}</pre>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface CornerRadius {
  horizontal: number;
  vertical: number;
}







const corners = ref<CornerRadius[]>([
  { horizontal: 50, vertical: 50 }, // top-left
  { horizontal: 50, vertical: 50 }, // top-right
  { horizontal: 50, vertical: 50 }, // bottom-right
  { horizontal: 50, vertical: 50 }, // bottom-left
]);

const cornerLabels = ['左上角', '右上角', '右下角', '左下角'];

const shapeStyle = computed(() => ({
  borderRadius: computedRadius.value
}));

const computedRadius = computed(() => {
  const horizontal = corners.value.map(c => `${c.horizontal}%`).join(' ');
  const vertical = corners.value.map(c => `${c.vertical}%`).join(' ');
  return `${horizontal} / ${vertical}`;
});

const updateRadius = () => {
  // 触发更新
};

const resetRadius = () => {
  corners.value = [
    { horizontal: 50, vertical: 50 },
    { horizontal: 50, vertical: 50 },
    { horizontal: 50, vertical: 50 },
    { horizontal: 50, vertical: 50 },
  ];
};
</script>

<style lang="less" scoped>
@primary-color: #2196f3;
@text-color: #2c3e50;

.radius-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 1rem 0;

  .radius-item {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    cursor: pointer;

    .unit-select {
      display: flex;
      gap: 1rem;

      .activeButton {
        background: @primary-color;
        color: white;
      }
    }
  }
}


.border-radius-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);

  .header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.2rem;
      color: @text-color;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: lighten(@text-color, 30%);
      font-size: 1.1rem;
    }
  }

  .main-content {
    display: grid;
    gap: 2rem;

    .control-panel {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

      .slider-group {
        margin-bottom: 1.5rem;

        h3 {
          color: @primary-color;
          margin-bottom: 1rem;
        }

        .sliders {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(2, 1fr);

          .slider-item {
            display: flex;
            align-items: center;
            gap: 0.8rem;

            label {
              width: 70px;
              color: @text-color;
            }

            input[type="range"] {
              flex: 1;
              height: 8px;
              background: #eee;
              border-radius: 4px;
              outline: none;
              -webkit-appearance: none;

              &::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 20px;
                height: 20px;
                background: @primary-color;
                border-radius: 50%;
                cursor: pointer;
              }
            }

            span {
              width: 50px;
              text-align: right;
              color: #666;
            }
          }
        }
      }

      .reset-btn {
        width: 100%;
        padding: 0.8rem;
        background: @primary-color;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.9;
        }
      }
    }

    .demo-area {
      display: grid;
      gap: 1.5rem;

      .shape {
        width: 300px;
        height: 300px;
        margin: 0 auto;
        background: linear-gradient(45deg, @primary-color, #64b5f6);
        transition: border-radius 0.3s ease;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

        &:hover {
          transform: scale(1.02);
        }
      }


    }
  }
}

.code-display {
  background: #2c3e50;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;

  pre {
    color: white;
    font-family: 'Fira Code', monospace;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .sliders {
    grid-template-columns: 1fr !important;
  }

  .shape {
    width: 250px !important;
    height: 250px !important;
  }
}
</style>