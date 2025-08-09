<template>
  <div class="relative-colors-container">
    <header class="header">
      <h1>CSS3 相对色系</h1>
      <p>基于现有颜色创建动态颜色方案的现代CSS特性</p>
    </header>

    <div class="content">
      <section class="introduction">
        <h2>什么是相对色系？</h2>
        <p>
          相对色系（Relative Color Syntax）是CSS Color Module Level 5引入的新特性，
          它允许开发者基于现有颜色值创建新的颜色，通过修改颜色通道值（如RGB、HSL）来实现。
        </p>
        <div class="feature-card">
          <div class="card-header">
            <h3>核心优势</h3>
          </div>
          <div class="card-content">
            <ul>
              <li>动态创建与基础色相关的颜色变体</li>
              <li>无需预定义多个颜色变量</li>
              <li>实时计算颜色值，保持设计系统一致性</li>
              <li>简化主题切换实现</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="syntax-section">
        <h2>基本语法</h2>
        <div class="syntax-grid">
          <div class="syntax-card">
            <h3>RGB相对色</h3>
            <div class="color-demo rgb-demo">
              <div class="base-color">基础色</div>
              <div class="relative-color">相对色</div>
            </div>
            <CodeBlock>
              /* 基于基础色创建新颜色 */ --primary: #3498db; --lighter: rgb(from var(--primary) r g
              calc(b + 40)); --darker: rgb(from var(--primary) r g calc(b - 40));
            </CodeBlock>
          </div>

          <div class="syntax-card">
            <h3>HSL相对色</h3>
            <div class="color-demo hsl-demo">
              <div class="base-color">基础色</div>
              <div class="relative-color">相对色</div>
            </div>
            <CodeBlock>
              /* 调整色相和饱和度 */ --accent: hsl(120, 70%, 50%); --complementary: hsl(from
              var(--accent) calc(h + 180) s l); --muted: hsl(from var(--accent) h calc(s - 30%) l);
            </CodeBlock>
          </div>

          <div class="syntax-card">
            <h3>透明度调整</h3>
            <div class="color-demo alpha-demo">
              <div class="base-color">基础色</div>
              <div class="relative-color">透明色</div>
            </div>
            <CodeBlock>
              /* 修改透明度 */ --brand: #e74c3c; --brand-transparent: rgb(from var(--brand) r g b /
              30%); --brand-semi: hsl(from var(--brand) h s l / 70%);
            </CodeBlock>
          </div>
        </div>
      </section>

      <section class="use-cases">
        <h2>适用场景</h2>
        <div class="use-cases-grid">
          <div class="use-case-card">
            <div class="icon"><PaletteIcon /></div>
            <h3>创建颜色变体</h3>
            <p>基于主色生成深浅不同的色调，用于按钮状态、卡片阴影等</p>
            <div class="color-variants">
              <div
                v-for="(variant, index) in variants"
                :key="index"
                :style="{ backgroundColor: variant }"
                class="variant"
              ></div>
            </div>
          </div>

          <div class="use-case-card">
            <div class="icon"><ThemeIcon /></div>
            <h3>主题切换</h3>
            <p>仅需改变基础色即可自动生成整个主题配色方案</p>
            <div class="theme-switcher">
              <button
                v-for="theme in themes"
                :key="theme.name"
                :style="{ backgroundColor: theme.color }"
                @click="switchTheme(theme)"
                class="theme-btn"
              >
                {{ theme.name }}
              </button>
            </div>
          </div>

          <div class="use-case-card">
            <div class="icon"><ContrastIcon /></div>
            <h3>动态对比度</h3>
            <p>自动生成与背景色对比度足够的文本颜色</p>
            <div class="contrast-demo" :style="{ backgroundColor: contrastBg }">
              <p :style="{ color: contrastText }">这段文本颜色会根据背景自动调整</p>
            </div>
          </div>

          <div class="use-case-card">
            <div class="icon"><GradientIcon /></div>
            <h3>渐变生成</h3>
            <p>基于基础色创建协调的渐变效果</p>
            <div class="gradient-demo" :style="{ background: gradient }"></div>
          </div>
        </div>
      </section>

      <section class="advanced">
        <h2>高级用法</h2>
        <div class="advanced-grid">
          <div class="advanced-card">
            <h3>颜色混合</h3>
            <div class="color-blending">
              <div class="color1"></div>
              <div class="plus">+</div>
              <div class="color2"></div>
              <div class="equals">=</div>
              <div class="result"></div>
            </div>
            <CodeBlock>
              --color1: #3498db; --color2: #e74c3c; --mixed: color-mix(in srgb, var(--color1) 60%,
              var(--color2) 40%);
            </CodeBlock>
          </div>

          <div class="advanced-card">
            <h3>颜色调整函数</h3>
            <div class="color-functions">
              <div class="original">原始色</div>
              <div class="adjusted">调整后</div>
            </div>
            <CodeBlock>
              --base: #9b59b6; --adjusted: color( display-p3 from var(--base) r calc(g + 0.1) b );
            </CodeBlock>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>CSS3 相对色系 - 现代Web设计的色彩管理方案</p>
      <div class="browser-support">
        <span>浏览器支持：</span>
        <span class="supported">Chrome 111+</span>
        <span class="supported">Safari 15.4+</span>
        <span class="partial">Firefox (实验性)</span>
        <span class="partial">Edge 111+</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  PaletteIcon,
  ThemeIcon,
  ContrastIcon,
  GradientIcon,
  CodeBlock,
} from '../Components/RelativeColorScheme'

// 响应式数据
const themes = ref([
  { name: '蓝色主题', color: '#3498db' },
  { name: '绿色主题', color: '#2ecc71' },
  { name: '紫色主题', color: '#9b59b6' },
])

const currentTheme = ref(themes.value[0])

// 基于当前主题生成颜色变体
const variants = computed(() => {
  const base = currentTheme.value.color
  return [
    `hsl(from ${base} h calc(s - 30%) calc(l + 20%))`, // 更亮
    `hsl(from ${base} h s l)`, // 基础色
    `hsl(from ${base} h s calc(l - 10%))`, // 略暗
    `hsl(from ${base} h s calc(l - 20%))`, // 更暗
    `hsl(from ${base} calc(h + 30) s l)`, // 色相偏移
    `rgb(from ${base} r g calc(b - 40))`, // RGB调整
  ]
})

// 对比度示例
const contrastBg = ref('#3498db')
const contrastText = computed(() => {
  // 这是一个简化的对比度计算示例
  return 'hsl(from var(--bg-color) calc(h + 180) s calc(l > 50% ? 20% : 80%))'
})

// 渐变生成
const gradient = computed(() => {
  const base = currentTheme.value.color
  return `linear-gradient(
    135deg,
    ${base},
    hsl(from ${base} calc(h + 40) s l),
    hsl(from ${base} calc(h + 80) s l)
  )`
})

// 切换主题
const switchTheme = (theme: any) => {
  currentTheme.value = theme
  contrastBg.value = theme.color
}

// 浏览器支持状态
const browserSupport = ref([
  { name: 'Chrome', version: '111+', supported: true },
  { name: 'Safari', version: '15.4+', supported: true },
  { name: 'Firefox', version: '实验性', supported: false },
  { name: 'Edge', version: '111+', supported: true },
])
</script>

<style lang="less" scoped>
// 变量定义
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #e74c3c;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@text-secondary: #7f8c8d;
@border-color: #e0e7ee;
@border-radius: 12px;
@box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
@transition: all 0.3s ease;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

// 基础样式
.relative-colors-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @light-bg;
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0 20px;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 15px;
    color: @secondary-color;
    background: linear-gradient(135deg, @primary-color, @accent-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  p {
    font-size: 1.2rem;
    color: @text-secondary;
    max-width: 700px;
    margin: 0 auto;
  }
}

.content {
  max-width: 1000px;
  margin: 0 auto;
}

h2 {
  font-size: 1.8rem;
  margin: 40px 0 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid @border-color;
  color: @secondary-color;
}

h3 {
  font-size: 1.4rem;
  margin: 0 0 15px;
  color: @secondary-color;
}

p {
  margin-bottom: 20px;
  color: @text-secondary;
}

// 特性卡片样式
.feature-card {
  background: @card-bg;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  overflow: hidden;
  transition: all 0.3s ease;
  margin: 25px 0;

  .card-header {
    padding: 18px 25px;
    background: linear-gradient(135deg, #f0f7ff, #e1f0ff);
    border-bottom: 1px solid @border-color;

    h3 {
      margin: 0;
      font-size: 1.3rem;
      font-weight: 600;
      color: @primary-color;
    }
  }

  .card-content {
    padding: 25px;

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 10px 0 10px 30px;
        position: relative;
        margin-bottom: 8px;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 16px;
          width: 12px;
          height: 12px;
          background: @primary-color;
          border-radius: 50%;
        }
      }
    }
  }
}

// 语法部分
.syntax-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.syntax-card {
  background: @card-bg;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
  }

  h3 {
    padding: 20px 20px 10px;
    margin: 0;
  }
}

.color-demo {
  display: flex;
  height: 120px;
  margin: 15px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .base-color,
  .relative-color {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
}

.rgb-demo {
  .base-color {
    background: @primary-color;
  }
  .relative-color {
    background: rgb(from @primary-color r g calc(b + 40));
  }
}

.hsl-demo {
  .base-color {
    background: hsl(120, 70%, 50%);
  }
  .relative-color {
    background: hsl(from hsl(120, 70%, 50%) calc(h + 180) s l);
  }
}

.alpha-demo {
  .base-color {
    background: @danger-color;
  }
  .relative-color {
    background: rgb(from @danger-color r g b / 30%);
  }
}

// 使用场景
.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.use-case-card {
  background: @card-bg;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  padding: 25px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }

  .icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #e1f0ff, #d1e8ff);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    svg {
      fill: @primary-color;
      width: 24px;
      height: 24px;
    }
  }

  h3 {
    margin: 0 0 15px;
    font-size: 1.3rem;
  }
}

.color-variants {
  display: flex;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  .variant {
    flex: 1;
  }
}

.theme-switcher {
  display: flex;
  gap: 10px;
  margin-top: 15px;

  .theme-btn {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    }
  }
}

.contrast-demo {
  height: 100px;
  border-radius: 10px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: background-color 0.5s ease;

  p {
    margin: 0;
    font-weight: 500;
    text-align: center;
  }
}

.gradient-demo {
  height: 100px;
  border-radius: 10px;
  margin-top: 15px;
}

// 高级用法
.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.advanced-card {
  background: @card-bg;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  padding: 25px;

  h3 {
    margin-top: 0;
  }
}

.color-blending {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;

  .color1,
  .color2,
  .result {
    width: 70px;
    height: 70px;
    border-radius: 10px;
  }

  .color1 {
    background: @primary-color;
  }
  .color2 {
    background: @danger-color;
  }
  .result {
    background: color-mix(in srgb, @primary-color 60%, @danger-color 40%);
  }

  .plus,
  .equals {
    font-size: 1.5rem;
    color: @text-secondary;
  }
}

.color-functions {
  display: flex;
  gap: 20px;
  margin: 20px 0;

  .original,
  .adjusted {
    flex: 1;
    height: 100px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
  }

  .original {
    background: @warning-color;
  }
  .adjusted {
    background: color(display-p3 from @warning-color r calc(g + 0.1) b);
  }
}

// 代码块样式
.code-block {
  background: #2d2d2d;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 20px;
  font-size: 0.9rem;
  font-family: 'Fira Code', 'Consolas', monospace;
  margin: 20px 0 0;
  overflow-x: auto;
  line-height: 1.5;

  code {
    display: block;
  }
}

// 页脚样式
.footer {
  text-align: center;
  margin-top: 60px;
  padding: 30px 0;
  color: @text-secondary;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  .browser-support {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;

    .supported {
      color: @success-color;
      font-weight: 500;
    }

    .partial {
      color: @warning-color;
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header {
    padding: 20px 0;

    h1 {
      font-size: 2.2rem;
    }
  }

  .syntax-grid,
  .use-cases-grid,
  .advanced-grid {
    grid-template-columns: 1fr;
  }
}
</style>
