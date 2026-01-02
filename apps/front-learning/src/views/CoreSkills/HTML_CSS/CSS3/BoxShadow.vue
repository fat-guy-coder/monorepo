<template>
  <div class="shadow-guide">
    <h1 class="main-title">🌓 CSS 阴影艺术指南</h1>

    <!-- Box Shadow 部分 -->
    <section class="shadow-section">
      <h2 class="section-title box-shadow">📦 Box Shadow</h2>

      <div class="shadow-grid">
        <!-- 基础示例 -->
        <ShadowCard
          title="基础阴影"
          :style="{ boxShadow: '2px 2px 10px rgba(0,0,0,1)' }"
          code="box-shadow: 2px 2px 10px rgba(0,0,0,0.1);"
          :scenes="['卡片悬浮效果', '元素层次提升']"
          :pros="['简单快速添加深度', '支持多阴影叠加']"
          :cons="['过度使用影响性能']"
        />

        <!-- 内阴影 -->
        <ShadowCard
          title="内阴影"
          :style="{ boxShadow: 'inset 0 0 20px rgba(0,0,0,1)' }"
          code="box-shadow: inset 0 0 20px rgba(0,0,0,1);"
          :scenes="['凹陷按钮效果', '容器内光影']"
          :pros="['创造立体效果', '增强界面质感']"
          :cons="['参数调节复杂']"
        />

        <!-- 多层阴影 -->
        <ShadowCard
          title="多层阴影"
          :style="{ boxShadow: '0 2px 4px rgba(0,0,0,1), 0 8px 16px rgba(0,0,0,1)' }"
          code="box-shadow: 0 2px 4px rgba(0,0,0,1), 0 8px 16px rgba(0,0,0,1);"
          :scenes="['复杂立体效果', '拟物化设计']"
          :pros="['增强层次感', '创造空间深度']"
          :cons="['代码可读性下降']"
        />
      </div>
    </section>

    <!-- Text Shadow 部分 -->
    <section class="shadow-section">
      <h2 class="section-title text-shadow">🖋 Text Shadow</h2>

      <div class="shadow-grid">
        <ShadowCard
          title="基础文字阴影"
          :style="{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }"
          text="Text Shadow"
          code="text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
          :scenes="['提升文字可读性', '艺术字体效果']"
          :pros="['轻量级效果', '支持多阴影叠加']"
          :cons="['移动端显示差异']"
        />

        <ShadowCard
          title="霓虹灯效果"
          :style="{ textShadow: '0 0 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,1)' }"
          text="NEON"
          code="text-shadow: 0 0 10px #4ecdc4, 0 0 20px #4ecdc4;"
          :scenes="['特殊标题效果', '夜间模式装饰']"
          :pros="['创造发光效果', '吸引视觉焦点']"
          :cons="['过度使用造成干扰']"
        />
      </div>
    </section>

    <!-- 参数调节器 -->
    <div class="parameter-controls">
      <h3>🎚 动态阴影调节</h3>
      <div class="sliders">
        <div class="slider">
          <label>X偏移</label>
          <input type="range" v-model="xOffset" min="-20" max="20" />
          <span>{{ xOffset }}px</span>
        </div>
        <div class="slider">
          <label>Y偏移</label>
          <input type="range" v-model="yOffset" min="-20" max="20" />
          <span>{{ yOffset }}px</span>
        </div>
        <div class="slider">
          <label>清晰度</label>
          <input type="range" v-model="blur" min="0" max="10" />
          <span>{{ blur }}</span>
        </div>
        <div class="slider">
          <label>阴影的尺寸</label>
          <input type="range" v-model="spread" min="0" max="20" />
          <span>{{ spread }}</span>
        </div>
        <div class="slider">
          <label>阴影的尺寸</label>
          <input type="color" v-model="color" />
          <span>{{ color }}</span>
        </div>
        <div class="slider">
          <label>外阴影，内阴影</label>
          <a-radio-group v-model:value="inset" button-style="solid">
            <a-radio-button value="inset">内</a-radio-button>
            <a-radio-button value="">外</a-radio-button>
          </a-radio-group>
        </div>
        <!-- 其他参数类似 -->
      </div>
      <pre><code>
        box-shadow: {{inset}} {{xOffset}}px {{yOffset}}px {{blur}}px {{spread}}px {{color}};
      </code></pre>
      <div class="dynamic-shadow" :style="dynamicShadowStyle">实时预览效果</div>
    </div>

    <!-- 使用建议 -->
    <div class="recommendation">
      <h2>💡 最佳实践建议</h2>
      <ul>
        <li>使用rgba颜色值实现透明阴影</li>
        <li>优先使用box-shadow替代图片实现立体效果</li>
        <li>文字阴影避免与背景颜色对比度过低</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ShadowCard from '../Components/ShadowCard.vue'

const xOffset = ref(2)
const yOffset = ref(2)
const blur = ref(10)
const spread = ref(5)
const color = ref('#000000')
const inset = ref('')

const dynamicShadowStyle = computed(() => ({
  boxShadow: `${xOffset.value}px ${yOffset.value}px ${blur.value}px ${spread.value}px ${color.value}  ${inset.value}`,
}))
</script>

<style scoped>
h3,
h4,
label,
span {
  color: #000;
}
pre {
  background: #1e1e1e;
  color: #dcdcdc;
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  overflow-x: auto;
}
.shadow-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui;
}

.main-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.section-title {
  padding-left: 1rem;
  border-left: 4px solid;
  margin: 3rem 0 2rem;

  &.box-shadow {
    border-color: #667eea;
    text-shadow: 2px 2px 4px rgba(102, 126, 234, 0.2);
  }

  &.text-shadow {
    border-color: #4ecdc4;
    text-shadow: 0 0 8px rgba(78, 205, 196, 0.3);
  }
}

.shadow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.parameter-controls {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin: 3rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.sliders {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0;
}

.slider {
  display: flex;
  align-items: center;
  gap: 1rem;

  input[type='range'] {
    flex: 1;
    height: 4px;
    background: #f0f0f0;
    -webkit-appearance: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      background: #667eea;
      border-radius: 50%;
    }
  }
}

.dynamic-shadow {
  width: 200px;
  height: 200px;
  background: white;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: box-shadow 0.3s ease;
}

.recommendation {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  ul {
    padding-left: 1.5rem;
    color: #666;
  }
}
</style>
