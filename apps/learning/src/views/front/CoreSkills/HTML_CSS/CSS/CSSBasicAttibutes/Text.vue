<template>
  <div class="text-guide-container">
    <!-- 主标题 -->
    <h1 class="main-title">CSS 文本处理</h1>

    <!-- 基础理论部分 -->
    <section class="theory-section">
      <h2 class="section-title">📜 文本属性基础</h2>
      <div class="text-content">
        <p>CSS 文本属性控制文本的显示方式，主要分为三大类：</p>
        <ul>
          <li v-for="item in controlList" :key="item.value">
            <strong>{{ item.label }}</strong>：{{item.children.map(child => `${child.label}(${child.value})`).join(', ')
            }}...
          </li>

        </ul>
      </div>
    </section>

    <!-- 交互演示区 -->
    <section class="demo-section">
      <h2 class="section-title">🎮 实时文本演示</h2>
      <div class="demo-wrapper">
        <!-- 演示文本 -->
        <div class="demo-text">
          <div :style="(textStyles as any)" :class="{ 'text-ellipsis': showEllipsis }">
            CSS文本处理是Web开发的核心技能之一，掌握文本样式控制可以实现优雅的排版效果。文本属性包括字体控制、间距调整、对齐方式、装饰效果等，合理使用这些属性可以显著提升用户体验。CSS文本处理是Web开发的核心技能之一，掌握文本样式控制可以实现优雅的排版效果。文本属性包括字体控制、间距调整、对齐方式、装饰效果等，合理使用这些属性可以显著提升用户体验。
            <span class="toggle-ellipsis" @click="showEllipsis = !showEllipsis">
              {{ showEllipsis ? '⇲ 展开' : '⇱ 收起' }}
            </span>
          </div>
          <div>
            <pre><code>{{ textStyles }}
          </code></pre>
          </div>
        </div>
        <!-- 控制面板 -->
        <div class="controls-panel">
          <div class="control-item" v-for="item in controlList" :key="item.value">
            <h2>{{ item.label }}</h2>
            <div class="control-item-content">
              <div class="control-item-content-item" v-for="child in item.children" :key="child.value">
                <label>{{ child.label }}({{ child.value }})</label>
                <div v-if="child.type === 'select'">
                  <Select style="width: 100%" v-model:value="(texyOptions as any)[item.value][child.value]"
                    :options="child.options" />
                </div>
                <div v-if="child.type === 'number'">
                  <a-input-number style="width: 100%" v-model:value="(texyOptions as any)[item.value][child.value]"
                    :min="0" :max="900"></a-input-number>
                </div>
                <div v-if="child.type === 'select-number'">
                  <Select style="width: 100%" v-model:value="(texyOptions as any)[item.value][child.value]"
                    :options="child.options"></Select>
                  <a-input-number style="width: 100%" v-model:value="(texyOptions as any)[item.value][child.value]"
                    :min="0" :max="900"></a-input-number>
                </div>
                <div v-if="child.type === 'string'">
                  <a-input style="width: 100%" v-model:value="(texyOptions as any)[item.value][child.value]" />
                </div>
                <div class="notice" v-if="child.notice">
                  {{ child.notice }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 换行处理 -->
    <section class="wrap-section">
      <h2 class="section-title">↩ 文本换行处理</h2>
      <div class="example-grid">
        <div class="example-card">
          <h3>默认换行 <span class="code-tag">word-wrap: normal</span></h3>
          <div class="example-box normal-wrap">
            这是一个很长的链接示例：https://www.example.com/very-long-url-path-show-wrap-behavior
          </div>
        </div>

        <div class="example-card">
          <h3>强制换行 <span class="code-tag">word-break: break-all</span></h3>
          <div class="example-box break-all">
            这是一个很长的链接示例：https://www.example.com/very-long-url-path-show-wrap-behavior
          </div>
        </div>

        <div class="example-card">
          <h3>保留空格 <span class="code-tag">white-space: pre-wrap</span></h3>
          <div class="example-box pre-wrap">
            保留 空格 和
            换行的文本示例
          </div>
        </div>
      </div>
    </section>

    <!-- 溢出处理 -->
    <section class="overflow-section">
      <h2 class="section-title">… 文本溢出处理</h2>
      <div class="overflow-grid">
        <div class="overflow-example">
          <h3>单行省略</h3>
          <pre><code>.single-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}</code></pre>
          <div class="overflow-box single-line">
            这是一个非常长的单行文本内容将会显示省略号效果
          </div>
        </div>

        <div class="overflow-example">
          <h3>多行省略（WebKit）</h3>
          <pre><code>.multi-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}</code></pre>
          <div class="overflow-box multi-line">
            这是一个多行文本溢出示例，当文本内容超过指定的行数时，会显示省略号。
            该方法使用WebKit的私有属性实现，请注意浏览器兼容性。
            添加更多文本内容以展示效果...
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onBeforeMount } from 'vue'
import { Select } from 'components'

interface Type {
  label: string
  value: string
  description: string
  children: Unit[]
}

interface Unit {
  label: string
  value: string
  type: 'select' | 'number' | 'select-number' | 'string'
  description: string
  notice?: string
  options?: {
    label: string
    value: string
  }[]
}

const controlList = ref<Type[]>([])

onBeforeMount(async () => {
  const { default: data } = await import('../../JSON/TextProperty.json')
  controlList.value = data as Type[]
})


const texyOptions = reactive({
  font: {
    fontFamily: 'Arial',
    fontSize: '12px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontVariant: 'normal',
  },
  textDecoration: {
    textDecoration: 'normal',
    textShadow: 'shadow',
    textTransform: 'normal',
  },
  textWrap: {
    wordWrap: 'normal',
    wordBreak: 'normal',
    whiteSpace: 'normal',
  },
  layout: {
    textAlign: 'left',
    lineHeight: "100%",
    textIndent: "1px",
    letterSpacing: "1px",
    wordSpacing: "1px",
  },
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'ellipsis',
    display: 'block',
  }
})


const showEllipsis = ref(false)


// 计算文本样式
const textStyles = computed(() => ({
  fontFamily: texyOptions.font.fontFamily,
  fontSize: texyOptions.font.fontSize,
  fontWeight: texyOptions.font.fontWeight,
  fontStyle: texyOptions.font.fontStyle,
  fontVariant: texyOptions.font.fontVariant,
  textDecoration: texyOptions.textDecoration.textDecoration,
  textShadow: texyOptions.textDecoration.textShadow,
  textTransform: texyOptions.textDecoration.textTransform,
  wordWrap: texyOptions.textWrap.wordWrap,
  wordBreak: texyOptions.textWrap.wordBreak,
  whiteSpace: texyOptions.textWrap.whiteSpace,
  textAlign: texyOptions.layout.textAlign,
  lineHeight: texyOptions.layout.lineHeight,
  textIndent: texyOptions.layout.textIndent,
  letterSpacing: texyOptions.layout.letterSpacing,
  wordSpacing: texyOptions.layout.wordSpacing,
  textOverflow: texyOptions.textOverflow.textOverflow,
  overflow: texyOptions.textOverflow.overflow,
  display: texyOptions.textOverflow.display,
}))
</script>

<style lang="less" scoped>
@primary-color: #2c3e50;
@secondary-color: #42b983;
@code-bg: #f8f9fa;
@border-color: #e9ecef;

.text-guide-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', system-ui, sans-serif;

  .main-title {
    color: darken(@secondary-color, 15%);
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .section-title {
    color: @primary-color;
    border-bottom: 2px solid lighten(@secondary-color, 30%);
    padding-bottom: 0.5rem;
    margin: 2rem 0;
    font-size: 1.4em;
  }

  .demo-wrapper {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 280px;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    .controls-panel {
      height: 30rem;
      overflow-y: auto;

      .control-item {
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: lighten(@primary-color, 20%);
        }

        select {
          width: 100%;
          padding: 0.5rem;
          border: 2px solid #eee;
          border-radius: 6px;
          transition: all 0.2s;

          &:focus {
            border-color: @secondary-color;
            outline: none;
          }
        }

        .button-group {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;

          button {
            padding: 0.5rem;
            border: 2px solid #eee;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            transition: all 0.2s;

            &.active {
              background: @secondary-color;
              color: white;
              border-color: @secondary-color;
            }
          }
        }
      }
    }

    .demo-text {
      padding: 1.5rem;
      border: 2px dashed #eee;
      border-radius: 8px;
      transition: all 0.3s ease;
      position: relative;
      height: 40rem;

      &.text-ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .toggle-ellipsis {
        position: absolute;
        right: 1rem;
        bottom: 0.5rem;
        background: rgba(255, 255, 255, 0.9);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8em;
        color: @secondary-color;
      }
    }
  }

  .example-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    .example-box {
      padding: 1rem;
      border: 2px solid #eee;
      border-radius: 6px;
      margin-top: 1rem;

      &.normal-wrap {
        word-wrap: normal;
      }

      &.break-all {
        word-break: break-all;
      }

      &.pre-wrap {
        white-space: pre-wrap;
      }
    }
  }

  .overflow-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    .overflow-box {
      border: 2px solid #eee;
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 6px;

      &.single-line {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &.multi-line {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }

  pre {
    background: @code-bg;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      color: darken(@secondary-color, 15%);
    }
  }
}

@media (max-width: 768px) {
  .text-guide-container {
    padding: 1rem;

    .demo-wrapper {
      grid-template-columns: 1fr;

      .demo-text {
        min-height: 150px;
      }
    }
  }
}
</style>
