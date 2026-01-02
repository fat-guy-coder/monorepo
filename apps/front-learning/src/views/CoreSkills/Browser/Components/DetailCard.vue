<template>
  <div class="detail-card" :style="{ '--card-color': cardColor }">
    <div class="card-header" v-if="!hideHeader">
      <h3>{{ detail.title }}</h3>
      <div class="decorative-line"></div>
    </div>

    <div class="card-body">
      <p class="content">{{ detail.content }}</p>

      <div class="key-points" v-if="detail.keyPoints">
        <h4>关键特性</h4>
        <ol>
          <li v-for="(point, index) in detail.keyPoints" :key="index">
            {{ point }}
          </li>
        </ol>
      </div>

      <div class="code-example" v-if="detail.code">
        <h4>示例代码</h4>
        <pre class="code-block"><code>{{ detail.code }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  detail: {
    title: string
    content: string
    keyPoints?: string[]
    code?: string
  },
  hideHeader?: boolean
}>()

const cardColor = computed(() => {
  const colors = ['#3498db', '#2ecc71', '#9b59b6', '#f1c40f', '#e74c3c']
  const index = props.detail.title.charCodeAt(0) % colors.length
  return colors[index]
})
</script>

<style lang="less" scoped>
.detail-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.3s ease;
  border-top: 4px solid var(--card-color);

  &:hover {
    transform: translateY(-5px);
  }

  .card-header {
    padding: 1.5rem;
    background: #f8f9fa;

    h3 {
      color: var(--card-color);
      margin: 0;
      position: relative;
    }

    .decorative-line {
      height: 2px;
      background: linear-gradient(90deg, var(--card-color) 0%, transparent 100%);
      margin-top: 0.5rem;
    }
  }

  .card-body {
    padding: 1.5rem;

    .content {
      color: #7f8c8d;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .key-points {
      margin-bottom: 1.5rem;

      h4 {
        color: var(--card-color);
        margin-bottom: 0.8rem;
      }

      ul {
        list-style: none;
        padding-left: 0;

        li {
          padding: 0.5rem 0;
          display: flex;
          align-items: baseline;

          .point-icon {
            margin-right: 0.8rem;
            color: var(--card-color);
          }
        }
      }
    }

    .code-example {
      h4 {
        color: var(--card-color);
        margin-bottom: 0.8rem;
      }

      .code-block {
        background: #2c3e50;
        color: #ecf0f1;
        padding: 1rem;
        border-radius: 6px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        overflow-x: auto;
      }
    }
  }
}

@media (max-width: 768px) {
  .detail-card {
    margin-bottom: 1.5rem;

    .card-body {
      padding: 1rem;
    }
  }
}
</style>
