<!-- MethodCard.vue -->
<template>
  <div class="method-card" :data-type="type">
    <div class="card-header">
      <h3>{{ title }}</h3>
      <div class="type-tag">{{ typeLabel }}</div>
    </div>
    <pre class="code-block"><code>{{ code }}</code></pre>
    <div class="pros-cons">
      <div class="pros">
        <div class="label">✅ 优点</div>
        <ul>
          <li v-for="(pro, index) in pros" :key="index">{{ pro }}</li>
        </ul>
      </div>
      <div class="cons">
        <div class="label">❌ 缺点</div>
        <ul>
          <li v-for="(con, index) in cons" :key="index">{{ con }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  type: 'horizontal' | 'vertical' | 'both'
  code: string
  pros: string[]
  cons: string[]
}>()

const typeLabel = computed(() => {
  return {
    horizontal: '水平居中',
    vertical: '垂直居中',
    both: '完全居中',
  }[props.type]
})
</script>

<style lang="less">
.method-card {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;
  border-left: 4px solid;

  &[data-type='horizontal'] {
    border-color: #3498db;
  }
  &[data-type='vertical'] {
    border-color: #2ecc71;
  }
  &[data-type='both'] {
    border-color: #9b59b6;
  }

  &:hover {
    transform: translateY(-5px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      color: #2c3e50;
    }

    .type-tag {
      background: #f8f9fa;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }
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

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;

    .label {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    ul {
      list-style: none;
      padding-left: 0;
      margin: 0;

      li {
        padding: 0.2rem 0;
        position: relative;
        padding-left: 1.2rem;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: currentColor;
        }
      }
    }

    .pros {
      color: #2ecc71;
    }
    .cons {
      color: #e74c3c;
    }
  }
}
</style>
