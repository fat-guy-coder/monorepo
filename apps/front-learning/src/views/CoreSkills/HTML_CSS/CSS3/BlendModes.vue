<template>
  <div class="blend-mode-demo">
    <!-- 介绍部分 -->
    <section class="intro-section">
      <h2>CSS 混合模式</h2>
      <p>混合模式（Blend Modes）控制两个图层颜色的混合方式，常见于图形处理软件。CSS 通过以下属性实现：</p>
      <ul>
        <li><code>mix-blend-mode</code>: 元素与下层内容的混合</li>
        <li><code>background-blend-mode</code>: 背景图层间的混合</li>
      </ul>
      <p>常用混合模式：Multiply（正片叠底）、Screen（滤色）、Overlay（叠加）、Darken（变暗）、Lighten（变亮）</p>
    </section>

    <!-- 演示区域 -->
    <section class="demo-section">
      <div class="controls">
        <div class="control-group">
          <label>混合模式：</label>
          <Select v-model="selectedMode">
            <option v-for="mode in blendModes" :key="mode">{{ mode }}</option>
          </Select>
        </div>

        <div class="control-group">
          <label>不透明度：{{ opacity }}%</label>
          <input type="range" v-model="opacity" min="0" max="100">
        </div>

        <div class="color-pickers">
          <div class="color-picker" v-for="(color, index) in colors" :key="index">
            <label>颜色 {{ index + 1 }}：</label>
            <input type="color" v-model="colors[index]">
          </div>
        </div>
      </div>

      <!-- 演示图形 -->
      <div class="demo-visual">
        <div class="blend-container" :style="{
          background: colors[0],
          '--blend-color': colors[1],
          '--blend-opacity': opacity / 100
        }">
          <div class="blend-element"></div>
        </div>

        <!-- 代码展示 -->
        <pre class="code-display"><code>
.blend-container {
  background: {{ colors[0] }};
}

.blend-element {
  background: {{ colors[1] }};
  opacity: {{ (opacity / 100).toFixed(2) }};
  mix-blend-mode: <span class="highlight">{{ selectedMode }}</span>;
}
        </code></pre>
      </div>
    </section>

    <!-- 预设样例 -->
    <section class="preset-section">
      <h3>常用样例</h3>
      <div class="preset-grid">
        <button v-for="preset in presets" :key="preset.name" @click="applyPreset(preset)"
          :style="{ background: preset.colors[0] }">
          <span :style="{ color: preset.colors[1] }">{{ preset.name }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const blendModes = [
  'normal', 'multiply', 'screen', 'overlay',
  'darken', 'lighten', 'color-dodge', 'color-burn',
  'difference', 'exclusion', 'hue', 'saturation',
  'color', 'luminosity'
];

const selectedMode = ref('multiply');
const opacity = ref(80);
const colors = ref(['#ff6b6b', '#4ecdc4']);

const presets = [
  { name: '深色叠加', mode: 'multiply', colors: ['#ff9a9e', '#fad0c4'] },
  { name: '霓虹效果', mode: 'screen', colors: ['#2a2a72', '#009ffd'] },
  { name: '强烈对比', mode: 'difference', colors: ['#000000', '#ffffff'] },
  { name: '复古色调', mode: 'overlay', colors: ['#f4d03f', '#2e86c1'] }
];

const applyPreset = (preset: typeof presets[number]) => {
  selectedMode.value = preset.mode;
  colors.value = [...preset.colors];
};
</script>

<style lang="less">
@primary-color: #2c3e50;
@secondary-color: #42b983;
@background: #f8f9fa;

.blend-mode-demo {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Segoe UI', sans-serif;

  section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .intro-section {
    h2 {
      color: @primary-color;
      border-bottom: 2px solid @secondary-color;
      padding-bottom: 0.5em;
    }

    code {
      background: #f3f3f3;
      padding: 2px 6px;
      border-radius: 4px;
    }
  }

  .demo-section {
    .controls {
      display: grid;
      gap: 1.5rem;
      margin-bottom: 2rem;

      .control-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        input[type="range"] {
          width: 300px;
          height: 6px;
          background: #ddd;
          border-radius: 3px;
        }

        select {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          width: 200px;
        }
      }

      .color-pickers {
        display: flex;
        gap: 1rem;

        .color-picker {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          input[type="color"] {
            width: 40px;
            height: 40px;
            border: none;
            cursor: pointer;
          }
        }
      }
    }

    .demo-visual {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      .blend-container {
        position: relative;
        height: 300px;
        border-radius: 12px;
        overflow: hidden;

        .blend-element {
          position: absolute;
          top: 20%;
          left: 20%;
          width: 60%;
          height: 60%;
          background: var(--blend-color);
          opacity: var(--blend-opacity);
          mix-blend-mode: v-bind(selectedMode);
          border-radius: 8px;
          transition: all 0.3s ease;
        }
      }

      .code-display {
        background: #282c34;
        color: #abb2bf;
        padding: 1rem;
        border-radius: 8px;
        font-family: 'Fira Code', monospace;
        white-space: pre-wrap;

        .highlight {
          color: #e06c75;
          font-weight: bold;
        }
      }
    }
  }

  .preset-section {
    h3 {
      color: @primary-color;
      margin-bottom: 1.5rem;
    }

    .preset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;

      button {
        padding: 1.5rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
          transform: translateY(-3px);
        }

        span {
          font-weight: bold;
          mix-blend-mode: difference;
        }
      }
    }
  }
}
</style>
