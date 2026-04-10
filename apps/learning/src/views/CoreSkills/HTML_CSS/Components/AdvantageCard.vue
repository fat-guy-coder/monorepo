<template>
  <article class="advantage-card">
    <div class="card-icon">{{ icon }}</div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-desc">{{ desc }}</p>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  desc: string
}>()
</script>

<style lang="less" scoped>
.advantage-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  border: 1px solid #f0f0f0;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }

  .card-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1;
    transition: transform 0.3s ease;
  }

  .card-title {
    color: #2c3e50;
    margin: 0 0 0.8rem;
    font-size: 1.2rem;
    font-weight: 600;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 2px;
      background: #42b983;
      opacity: 0.6;
    }
  }

  .card-desc {
    color: #4a5568;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .card-icon {
      font-size: 2rem;
    }

    .card-title {
      font-size: 1.1rem;
    }

    .card-desc {
      font-size: 0.9rem;
    }
  }
}
</style>