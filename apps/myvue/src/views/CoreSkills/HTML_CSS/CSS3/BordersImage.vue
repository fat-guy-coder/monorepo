<template>
  <div class="border-image-container">
    <!-- 头部区域 -->
    <div class="header">
      <h1>CSS border-image 介绍</h1>
      <p>掌握边界图像的强大功能，创建精美的边框效果</p>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 概念介绍区 -->
      <div class="concept-section">
        <h2>什么是 border-image？</h2>
        <p>
          CSS
          <code>border-image</code>
          属性允许使用图像作为元素的边框，而不是传统的纯色边框。它提供了强大的功能，可以将单个图像分割为九个区域，分别用于边框的各个部分。
        </p>

        <div class="image-slice-diagram">
          <div class="diagram-container">
            <div class="slice-diagram">
              <div class="top-left"></div>
              <div class="top-center"></div>
              <div class="top-right"></div>
              <div class="middle-left"></div>
              <div class="middle-center"></div>
              <div class="middle-right"></div>
              <div class="bottom-left"></div>
              <div class="bottom-center"></div>
              <div class="bottom-right"></div>

              <div class="slice-label top">top</div>
              <div class="slice-label right">right</div>
              <div class="slice-label bottom">bottom</div>
              <div class="slice-label left">left</div>

              <div class="slice-number top-left">1</div>
              <div class="slice-number top-center">2</div>
              <div class="slice-number top-right">3</div>
              <div class="slice-number middle-left">4</div>
              <div class="slice-number middle-center">5</div>
              <div class="slice-number middle-right">6</div>
              <div class="slice-number bottom-left">7</div>
              <div class="slice-number bottom-center">8</div>
              <div class="slice-number bottom-right">9</div>
            </div>
          </div>
          <div class="diagram-explanation">
            <h3>图像切片原理</h3>
            <p>border-image 将图像分割为9个区域：</p>
            <ol>
              <li>四个角（1, 3, 7, 9） - 保持原始比例不变</li>
              <li>四个边（2, 4, 6, 8） - 可拉伸或重复</li>
              <li>中心区域（5） - 默认不显示，但可设置显示</li>
            </ol>
            <p>这种分割方式确保了边框在任何尺寸下都能完美显示。</p>
          </div>
        </div>
      </div>

      <!-- 语法区 -->
      <div class="syntax-section">
        <h2>语法介绍</h2>
        <div class="syntax-card">
          <pre><code>border-image: source slice / width / outset repeat;</code></pre>

          <div class="syntax-properties">
            <div class="property">
              <h3>border-image-source</h3>
              <p>定义用作边框的图像源。可以是URL、渐变或none。</p>
              <pre><code>border-image-source: url('border.png');</code></pre>
              <pre><code>border-image-source: linear-gradient(45deg, #ff8a00, #e52e71);</code></pre>
            </div>

            <div class="property">
              <h3>border-image-slice</h3>
              <p>定义图像如何分割。接受1-4个值（上、右、下、左）</p>
              <pre><code>border-image-slice: 30; /* 所有边30px */
border-image-slice: 10% 20 15% 25; /* 上10% 右20px 下15% 左25px */
border-image-slice: 30 fill; /* 包含中心区域 */</code></pre>
            </div>

            <div class="property">
              <h3>border-image-width</h3>
              <p>定义边框图像的宽度。接受1-4个值</p>
              <pre><code>border-image-width: 20px; /* 所有边20px */
border-image-width: 10px 20px 15px 25px; /* 上 右 下 左 */
border-image-width: 10% 5% 10% 5%; /* 百分比值 */</code></pre>
            </div>

            <div class="property">
              <h3>border-image-outset</h3>
              <p>定义边框图像超出边框盒的量</p>
              <pre><code>border-image-outset: 10px; /* 所有边10px */
border-image-outset: 5px 10px 15px 20px; /* 上 右 下 左 */</code></pre>
            </div>

            <div class="property">
              <h3>border-image-repeat</h3>
              <p>定义图像如何填充边框区域</p>
              <pre><code>border-image-repeat: stretch; /* 拉伸填充 */
border-image-repeat: repeat; /* 平铺重复 */
border-image-repeat: round; /* 平铺但缩放 */
border-image-repeat: space; /* 平铺但添加间隔 */
border-image-repeat: stretch repeat; /* 水平拉伸，垂直重复 */</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 演示区域 -->
      <div class="demo-section">
        <h2>交互式演示</h2>
        <div class="demo-controls">
          <div class="control-group">
            <label>边框图像源</label>
            <select v-model="borderImageSource">
              <option v-for="source in imageSources" :key="source.value" :value="source.value">
                {{ source.label }}
              </option>
            </select>
          </div>

          <div class="control-group">
            <label>图像分割 (slice)</label>
            <input type="text" v-model="borderImageSlice" placeholder="例如: 30 或 30% fill" />
          </div>

          <div class="control-group">
            <label>边框宽度 (width)</label>
            <input type="text" v-model="borderImageWidth" placeholder="例如: 20px" />
          </div>

          <div class="control-group">
            <label>边框外延 (outset)</label>
            <input type="text" v-model="borderImageOutset" placeholder="例如: 10px" />
          </div>

          <div class="control-group">
            <label>重复方式 (repeat)</label>
            <select v-model="borderImageRepeat">
              <option value="stretch">stretch (拉伸)</option>
              <option value="repeat">repeat (重复)</option>
              <option value="round">round (圆整)</option>
              <option value="space">space (间隔)</option>
              <option value="stretch repeat">stretch repeat (水平拉伸垂直重复)</option>
              <option value="repeat stretch">repeat stretch (水平重复垂直拉伸)</option>
            </select>
          </div>
        </div>

        <div class="demo-display">
          <div
            class="demo-box"
            :style="{
              borderImageSource: borderImageSource,
              borderImageSlice: borderImageSlice,
              borderImageWidth: borderImageWidth,
              borderImageOutset: borderImageOutset,
              borderImageRepeat: borderImageRepeat,
            }"
          >
            <div class="box-content">
              <h3>边框图像演示</h3>
              <p>调整参数实时查看效果</p>
            </div>
          </div>
        </div>

        <div class="code-output">
          <pre><code>{{ generatedCode }}</code></pre>
        </div>
      </div>

      <!-- 示例区 -->
      <div class="examples-section">
        <h2>实用示例</h2>
        <div class="examples-grid">
          <div class="example-card">
            <h3>渐变边框</h3>
            <div class="example-box gradient-border">
              <div class="box-content">
                <p>线性渐变创建的边框</p>
              </div>
            </div>
            <pre><code>border-image: linear-gradient(45deg, #ff8a00, #e52e71) 1;</code></pre>
          </div>

          <div class="example-card">
            <h3>圆点边框</h3>
            <div class="example-box dotted-border">
              <div class="box-content">
                <p>重复圆点图案边框</p>
              </div>
            </div>
            <pre><code>border-image: url('data:image/svg...') 30 round;</code></pre>
          </div>

          <div class="example-card">
            <h3>装饰边框</h3>
            <div class="example-box decorative-border">
              <div class="box-content">
                <p>复杂装饰边框</p>
              </div>
            </div>
            <pre><code>border-image: url('border.png') 50 / 30px / 0 round;</code></pre>
          </div>

          <div class="example-card">
            <h3>双色边框</h3>
            <div class="example-box dual-color-border">
              <div class="box-content">
                <p>内外不同颜色的边框</p>
              </div>
            </div>
            <pre><code>border-image: conic-gradient(red, yellow, lime, blue) 1;</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 边框图像源选项
const imageSources = ref([
  { label: '线性渐变', value: 'linear-gradient(45deg, #ff8a00, #e52e71)' },
  { label: '径向渐变', value: 'radial-gradient(circle, #4e79c7, #e15759)' },
  {
    label: '圆点图案',
    value:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><circle cx='10' cy='10' r='3' fill='%234e79c7'/></svg>\")",
  },
  {
    label: '条纹图案',
    value:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='20' height='10' fill='%23e15759'/></svg>\")",
  },
  {
    label: '装饰边框',
    value:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M10,10 Q20,5 30,10 T50,10' stroke='%23e15759' fill='none'/></svg>\")",
  },
])

// 响应式状态
const borderImageSource = ref(imageSources.value[0].value)
const borderImageSlice = ref('30')
const borderImageWidth = ref('30px')
const borderImageOutset = ref('0')
const borderImageRepeat = ref('stretch')

// 生成的CSS代码
const generatedCode = computed(() => {
  return `.demo-box {
  border-image-source: ${borderImageSource.value};
  border-image-slice: ${borderImageSlice.value};
  border-image-width: ${borderImageWidth.value};
  border-image-outset: ${borderImageOutset.value};
  border-image-repeat: ${borderImageRepeat.value};
}`
})
</script>

<style lang="less" scoped>
@primary-color: #4e79c7;
@secondary-color: #e15759;
@light-bg: #f8fafc;
@card-bg: #ffffff;
@border-color: #e2e8f0;
@text-color: #2d3748;
@text-secondary: #718096;
@shadow: 0 4px 12px rgba(78, 121, 199, 0.1);
@code-bg: #1e293b;

.border-image-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
  background: @light-bg;
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: @text-color;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.1rem;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto;
  }
}

.concept-section,
.syntax-section,
.demo-section,
.examples-section {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @shadow;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    color: @text-color;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid @border-color;
  }

  p {
    font-size: 1.1rem;
    color: @text-secondary;
    margin-bottom: 1.5rem;
  }
}

.image-slice-diagram {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;

  .diagram-container {
    flex: 1;
    min-width: 300px;
  }

  .diagram-explanation {
    flex: 1;

    h3 {
      font-size: 1.3rem;
      color: @text-color;
      margin-bottom: 1rem;
    }

    ol {
      padding-left: 1.5rem;
      margin-bottom: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

.slice-diagram {
  position: relative;
  width: 100%;
  height: 300px;
  background: #f1f5f9;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 80px 1fr 80px;
  grid-template-rows: 80px 1fr 80px;
  gap: 0;

  > div {
    border: 1px solid #94a3b8;
    background: rgba(148, 163, 184, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: @primary-color;
  }

  .top-left {
    border-top-left-radius: 6px;
  }
  .top-right {
    border-top-right-radius: 6px;
  }
  .bottom-left {
    border-bottom-left-radius: 6px;
  }
  .bottom-right {
    border-bottom-right-radius: 6px;
  }

  .slice-label {
    position: absolute;
    font-size: 0.9rem;
    color: @text-secondary;
    font-weight: normal;

    &.top {
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.right {
      right: -35px;
      top: 50%;
      transform: translateY(-50%);
    }

    &.bottom {
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.left {
      left: -35px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .slice-number {
    position: absolute;
    font-size: 1.2rem;
    font-weight: bold;
    color: @secondary-color;
    background: rgba(255, 255, 255, 0.8);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.top-left {
      top: 10px;
      left: 10px;
    }
    &.top-center {
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
    &.top-right {
      top: 10px;
      right: 10px;
    }
    &.middle-left {
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }
    &.middle-center {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &.middle-right {
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }
    &.bottom-left {
      bottom: 10px;
      left: 10px;
    }
    &.bottom-center {
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
    &.bottom-right {
      bottom: 10px;
      right: 10px;
    }
  }
}

.syntax-card {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid @border-color;

  > pre {
    background: @code-bg;
    color: #cbd5e1;
    padding: 1rem;
    border-radius: 8px;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
}

.syntax-properties {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .property {
    background: white;
    border-radius: 8px;
    padding: 1.2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h3 {
      font-size: 1.2rem;
      color: @text-color;
      margin-bottom: 0.8rem;
    }

    p {
      font-size: 0.95rem;
      color: @text-secondary;
      margin-bottom: 1rem;
    }

    pre {
      background: #f1f5f9;
      padding: 0.8rem;
      border-radius: 6px;
      font-size: 0.9rem;
      overflow-x: auto;
      margin: 0.5rem 0;
    }
  }
}

.demo-section {
  .demo-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .control-group {
      label {
        display: block;
        font-weight: 500;
        color: @text-color;
        margin-bottom: 0.5rem;
      }

      select,
      input {
        width: 100%;
        padding: 0.7rem;
        border: 1px solid @border-color;
        border-radius: 6px;
        font-size: 1rem;
        background: white;

        &:focus {
          outline: none;
          border-color: @primary-color;
          box-shadow: 0 0 0 3px rgba(78, 121, 199, 0.15);
        }
      }
    }
  }

  .demo-display {
    background: #f8fafc;
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 2rem;
    border: 1px solid @border-color;
    display: flex;
    justify-content: center;
  }

  .demo-box {
    width: 100%;
    max-width: 500px;
    min-height: 300px;
    border: 30px solid transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    .box-content {
      text-align: center;
      padding: 2rem;

      h3 {
        font-size: 1.5rem;
        color: @text-color;
        margin-bottom: 1rem;
      }

      p {
        color: @text-secondary;
      }
    }
  }

  .code-output {
    background: @code-bg;
    border-radius: 10px;
    padding: 1.5rem;

    pre {
      margin: 0;
      overflow-x: auto;

      code {
        font-family: 'Fira Code', 'Source Code Pro', monospace;
        font-size: 0.95rem;
        line-height: 1.6;
        color: #cbd5e1;
      }
    }
  }
}

.examples-section {
  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .example-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    h3 {
      font-size: 1.2rem;
      color: @text-color;
      padding: 1rem;
      margin: 0;
      border-bottom: 1px solid @border-color;
    }

    .example-box {
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;

      .box-content {
        text-align: center;
        padding: 1rem;

        p {
          margin: 0;
          font-weight: 500;
          color: @text-color;
        }
      }
    }

    pre {
      background: #f1f5f9;
      padding: 1rem;
      margin: 0;
      font-size: 0.85rem;
      overflow-x: auto;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}

// 示例样式
.gradient-border {
  border: 30px solid;
  border-image: linear-gradient(45deg, #ff8a00, #e52e71) 1;
}

.dotted-border {
  border: 30px solid;
  border-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><circle cx='10' cy='10' r='3' fill='%234e79c7'/></svg>")
    30 round;
}

.decorative-border {
  border: 30px solid;
  border-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M10,10 Q20,5 30,10 T50,10' stroke='%23e15759' fill='none'/></svg>")
    30;
}

.dual-color-border {
  border: 30px solid;
  border-image: conic-gradient(#4e79c7, #e15759, #4e79c7) 1;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .image-slice-diagram {
    flex-direction: column;
  }

  .slice-diagram {
    height: 250px;
  }

  .syntax-properties {
    grid-template-columns: 1fr;
  }

  .demo-controls {
    grid-template-columns: 1fr;
  }
}
</style>
