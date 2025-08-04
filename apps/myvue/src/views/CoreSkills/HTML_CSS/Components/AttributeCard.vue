<template>
  <div class="attribute-card">
    <div class="header">
      <div class="type-tag">CSS属性</div>
      <h3 class="title">{{ name }}</h3>
    </div>

    <div class="content">
      <div class="desc">{{ desc }}</div>

      <div class="values-section">
        <div class="subtitle">可选值</div>
        <div>属性值:{{ content }}</div>
        <ul class="value-list">
          <li v-for="(value, index) in values" :key="index">
            <span>{{ value.value }}</span> :
            <span>{{ value.label }}</span>
          </li>
        </ul>
      </div>

      <div v-if="example" class="code-section">
        <div class="subtitle">示例代码</div>
        <pre class="example-code"><code>{{ example }}</code></pre>
      </div>

      <div v-if="tip" class="tip-box">
        提示：{{ tip }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  desc: string
  content: string
  values: {
    value: string
    label: string
  }[]
  example?: string
  tip?: string
}>()

const parsedValues = computed(() => {
  return Array.isArray(props.values) ? props.values : [props.values]
})
</script>

<style lang="less" scoped>
.attribute-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .header {
    background: linear-gradient(135deg, #45b7d1, #96ceb4);
    padding: 1.2rem;
    color: white;

    .type-tag {
      font-size: 0.8em;
      opacity: 0.8;
      margin-bottom: 0.5rem;
    }

    .title {
      margin: 0;
      font-size: 1.4rem;
      font-weight: 600;
    }
  }

  .content {
    padding: 1.5rem;

    .desc {
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .subtitle {
      color: #2c3e50;
      font-weight: 500;
      margin: 1rem 0 0.5rem;
      padding-bottom: 0.3rem;
      border-bottom: 2px solid #eee;
    }

    .value-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 0.4rem 0;

        code {
          background: #f8f9fa;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          color: #e74c3c;
        }
      }
    }

    .example-code {
      background: #2d3748;
      color: #cbd5e0;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 0.9em;

      code {
        font-family: 'Fira Code', monospace;
        white-space: pre-wrap;
      }
    }

    .tip-box {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 6px;
      color: #4a5568;
      border-left: 3px solid #45b7d1;
    }
  }
}
</style>