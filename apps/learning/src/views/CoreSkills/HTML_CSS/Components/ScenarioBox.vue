<template>
  <div class="scenario-box">
    <div class="icon-wrapper">
      <slot name="icon">
        <div class="default-icon">🎯</div>
      </slot>
    </div>

    <h4 class="title">{{ title }}</h4>

    <div class="desc">{{ desc }}</div>

    <div class="example-section">
      <div class="example-label">典型示例</div>
      <div class="example-content">{{ example }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  desc: string
  example?: string
}>()
</script>

<style lang="less" scoped>
.scenario-box {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }

  .icon-wrapper {
    margin-bottom: 1.5rem;

    .default-icon {
      font-size: 2.5rem;
      display: inline-block;
      transition: transform 0.3s ease;
    }
  }

  .title {
    color: #2c3e50;
    margin: 0 0 1rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .desc {
    color: #4a5568;
    line-height: 1.6;
    min-height: 4em;
    margin-bottom: 1.5rem;
  }

  .example-section {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1rem;
    margin-top: auto;

    .example-label {
      color: #718096;
      font-size: 0.9em;
      margin-bottom: 0.5rem;
    }

    .example-content {
      color: #2d3748;
      font-weight: 500;
    }
  }
}
</style>