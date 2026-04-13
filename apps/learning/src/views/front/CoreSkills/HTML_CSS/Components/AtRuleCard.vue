<template>
  <div class="at-rule-card" :class="type">
    <header>
      <h3>{{ title }}</h3>
      <div class="syntax-tag">
        <code>{{ syntax }}</code>
      </div>
    </header>

    <div class="content">
      <div class="example-box" v-if="example">
        <pre><code>{{ example }}</code></pre>
      </div>

      <div class="desc-section">
        <p class="description">{{ desc }}</p>
        <div class="scenario" v-if="scenario">
          <span class="label">适用场景：</span>
          {{ scenario }}
        </div>
      </div>
      <div class="notice" v-if="notice">
        注意： {{ notice }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  syntax: string
  example?: string
  desc: string
  scenario?: string
  type?: 'common' | 'experimental' | 'deprecated'
  notice?: string
}>()
</script>

<style lang="less" scoped>
.at-rule-card {
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;
  border-left: 4px solid transparent;

  &.common {
    border-color: #42b983;
  }

  &.experimental {
    border-color: #f1c40f;
  }

  &.deprecated {
    border-color: #e74c3c;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;

    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #2c3e50;
    }

    .syntax-tag {
      background: #f4f4f4;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;

      code {
        font-family: 'Fira Code', monospace;
        font-size: 0.9em;
        color: #e83e8c;
      }
    }
  }

  .content {
    .example-box {
      background: #f8f9fa;
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 1rem;

      pre {
        margin: 0;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.85em;
          line-height: 1.4;
          color: #34495e;
        }
      }
    }

    .desc-section {
      .description {
        color: #7f8c8d;
        line-height: 1.6;
        margin: 0 0 0.8rem 0;
      }

      .scenario {
        font-size: 0.9em;
        padding-top: 0.8rem;
        border-top: 1px dashed #eee;
        color: #95a5a6;

        .label {
          color: #3498db;
          font-weight: 500;
        }
      }
    }

    .notice {
      font-size: 0.9em;
      color: #fc0404;
    }
  }
}
</style>