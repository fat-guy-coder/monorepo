<template>
  <div class="css-effects-container">
    <h1 class="main-title">CSS基础效果实现指南</h1>

    <div class="effect-list">
      <div v-for="(effect, index) in effects" :key="index" class="effect-card">
        <div class="effect-header">
          <span class="effect-index">#{{ index + 1 }}</span>
          <h2 class="effect-title">{{ effect.title }}</h2>
        </div>

        <div class="effect-content">
          <div class="description">
            <h3 class="subtitle">效果说明</h3>
            <p>{{ effect.description }}</p>
          </div>

          <div class="implementation">
            <h3 class="subtitle">实现方案</h3>
            <div class="method-tabs">
              <button v-for="(method, mi) in effect.methods" :key="mi" @click="activeMethod[index] = mi"
                :class="{ active: activeMethod[index] === mi }">
                {{ method.name }}
              </button>
            </div>
            <div class="method-content">
              <pre class="code-block"><code>{{ effect.methods[activeMethod[index]]?.code }}</code></pre>
              <div class="notes" v-if="effect.methods[activeMethod[index]]?.notes">
                <span class="note-icon">💡</span>
                {{ effect.methods[activeMethod[index]]?.notes }}
              </div>
            </div>
          </div>

          <div class="live-demo" :style="effect.demoStyle">
            <div :class="effect.demoClass"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface CssEffect {
  title: string
  description: string
  methods: {
    name: string
    code: string
    notes?: string
  }[]
  demoClass: string
  demoStyle?: string
}

const activeMethod = ref<number[]>([])

const effects = reactive<CssEffect[]>([
  {
    title: '三角形',
    description: '实现各种方向的三角形效果',
    methods: [
      {
        name: 'border实现',
        code: `.triangle {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 40px solid #42b983;
}`,
        notes: '经典实现方式，但不支持背景颜色'
      },
      {
        name: 'clip-path实现',
        code: `.triangle {
  width: 40px;
  height: 40px;
  background: #42b983;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}`,
        notes: '现代实现方式，支持背景渐变'
      }
    ],
    demoClass: 'triangle-demo'
  },
  {
    title: '扇形',
    description: '实现不同角度的扇形效果',
    methods: [
      {
        name: 'border-radius实现',
        code: `.sector {
  width: 80px;
  height: 80px;
  border-radius: 0 80px 0 0;
  background: #42b983;
}`,
        notes: '通过控制单个圆角实现'
      },
      {
        name: 'clip-path实现',
        code: `.sector {
  width: 80px;
  height: 80px;
  background: #42b983;
  clip-path: circle(40px at 0 0);
}`,
        notes: '更灵活的扇形控制方案'
      },
      {
        name: '径向渐变实现',
        code: `.sector {
  width: 80px;
  height: 80px;
  background: #42b983;
  background: radial-gradient(circle, transparent 50%, #42b983 50%);
}`,
        notes: '通过径向渐变实现扇形效果'
      },
      {
        name: '锥型渐变实现',
        code: `.sector {
  width: 80px;
  height: 80px;
  background: #42b983;
  background: conic-gradient(from var(--angle), transparent 70%, #42b983 70%);
  transform: rotate(calc(var(--angle) * 1deg));
}`,
        notes: '通过锥型渐变实现扇形效果'
      }
    ],
    demoClass: 'sector-demo'
  },
  {
    title: '梯形',
    description: '实现梯形变形效果',
    methods: [
      {
        name: 'perspective实现',
        code: `.trapezoid {
  width: 100px;
  height: 60px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #42b983;
    transform: perspective(1em) rotateX(10deg);
  }
}`,
        notes: '利用3D变换实现立体效果'
      },
      {
        name: 'clip-path实现',
        code: `.trapezoid {
  width: 100px;
  height: 60px;
  background: #42b983;
  clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);
}`,
        notes: '精确控制梯形角度'
      }
    ],
    demoClass: 'trapezoid-demo'
  },
  {
    title: '特殊四边形',
    description: '实现圆角/渐变等特殊四边形',
    methods: [
      {
        name: '圆角矩形',
        code: `.rounded-box {
  width: 100px;
  height: 60px;
  border-radius: 20px;
  background: linear-gradient(45deg, #42b983, #2c3e50);
}`,
        notes: '结合渐变和圆角的现代方案'
      },
      {
        name: 'clip-path变形',
        code: `.custom-shape {
  width: 120px;
  height: 80px;
  background: #42b983;
  clip-path: path('M0 20 Q50 0 100 20 L80 60 Q50 80 20 60 Z');
}`,
        notes: '使用SVG path实现任意形状'
      }
    ],
    demoClass: 'special-box-demo'
  },
  {
    title: '小于12px文字',
    description: '实现小字号文字的清晰显示',
    methods: [
      {
        name: 'transform缩放',
        code: `.small-text {
  font-size: 16px;
  transform: scale(0.625);
  transform-origin: left center;
}`,
        notes: '通过缩放实现等效10px文字'
      },
      {
        name: '私有属性',
        code: `.tiny-text {
  font-size: 10px;
  -webkit-text-size-adjust: none;
}`,
        notes: '仅适用于部分WebKit浏览器'
      }
    ],
    demoClass: 'small-text-demo',
    demoStyle: 'font-size: 16px; transform: scale(0.625);'
  },
  {
    title: '小于1px线条',
    description: '实现极细线条效果',
    methods: [
      {
        name: '缩放实现',
        code: `.thin-line {
  height: 1px;
  background: #333;
  transform: scaleY(0.3);
}`,
        notes: '通过Y轴缩放实现0.3px线条'
      },
      {
        name: '渐变模拟',
        code: `.gradient-line {
  height: 1px;
  background: linear-gradient(0deg, transparent 50%, #333 50%);
}`,
        notes: '使用渐变模拟0.5px线条'
      }
    ],
    demoClass: 'thin-line-demo'
  }
])

// 初始化激活状态
effects.forEach((_, index) => {
  activeMethod.value[index] = 0
})
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@secondary-color: #42b983;
@code-bg: #f8f9fa;
@border-color: #e9ecef;

.css-effects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;

  .main-title {
    text-align: center;
    color: darken(@secondary-color, 15%);
    margin-bottom: 3rem;
    font-weight: 600;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  .effect-list {
    display: grid;
    gap: 2rem;
  }

  .effect-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.25s ease;

    &:hover {
      transform: translateY(-3px);
    }

    .effect-header {
      padding: 1.5rem;
      background: lighten(@secondary-color, 45%);
      border-radius: 16px 16px 0 0;
      display: flex;
      align-items: center;
      gap: 1rem;

      .effect-index {
        background: @secondary-color;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }

      .effect-title {
        margin: 0;
        color: darken(@primary-color, 10%);
        font-size: 1.4em;
      }
    }

    .effect-content {
      padding: 2rem;
      display: grid;
      gap: 1.5rem;

      .subtitle {
        color: @secondary-color;
        margin: 1rem 0;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid lighten(@secondary-color, 30%);
      }

      .method-tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;

        button {
          padding: 0.5rem 1rem;
          border: 1px solid @border-color;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;

          &.active {
            background: @secondary-color;
            color: white;
            border-color: @secondary-color;
          }

          &:hover {
            transform: translateY(-1px);
          }
        }
      }

      .code-block {
        background: @code-bg;
        padding: 1.25rem;
        border-radius: 12px;
        overflow-x: auto;
        margin: 1rem 0;

        code {
          font-family: 'Fira Code', monospace;
          color: darken(@secondary-color, 15%);
          font-size: 0.9em;
        }
      }

      .notes {
        background: lighten(@secondary-color, 45%);
        color: darken(@secondary-color, 20%);
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .note-icon {
          font-size: 1.2em;
        }
      }

      .live-demo {
        margin-top: 2rem;
        padding: 2rem;
        background: repeating-conic-gradient(#f8f8f8 0% 25%, white 0% 50%) 50%/20px 20px;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 150px;

        div[class$="-demo"] {
          background: @secondary-color;
        }

        .triangle-demo {
          width: 0;
          height: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 80px solid @secondary-color;
          background: transparent !important;
        }

        .sector-demo {
          width: 100px;
          height: 100px;
          border-radius: 0 100px 0 0;
        }

        .trapezoid-demo {
          width: 120px;
          height: 80px;
          clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);
        }

        .small-text-demo::after {
          content: "10px等效文字";
          display: block;
        }

        .thin-line-demo {
          width: 200px;
          height: 1px;
          transform: scaleY(0.3);
          background: @primary-color;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .css-effects-container {
    padding: 1rem;

    .effect-card {
      .effect-content {
        padding: 1rem;
      }

      .method-tabs {
        flex-wrap: wrap;
      }

      .live-demo {
        padding: 1rem;
      }
    }
  }
}
</style>
