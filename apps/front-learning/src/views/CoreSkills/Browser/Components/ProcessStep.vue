<!-- ProcessStep.vue -->
<template>
  <div class="process-step" :style="{ '--step-color': step.color }">
    <div class="step-order">{{ order }}</div>
    <div class="step-icon">{{ step.icon }}</div>
    <h3>{{ step.title }}</h3>
    <p>{{ step.content }}</p>
    <div class="connector"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  step: {
    title: string
    icon: string
    content: string
    color: string
  }
  order: number
}>()
</script>

<style lang="less">
.process-step {
  position: relative;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  width: 200px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .step-order {
    position: absolute;
    top: -15px;
    left: -15px;
    width: 30px;
    height: 30px;
    background: var(--step-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .step-icon {
    font-size: 2.5rem;
    margin: 1rem 0;
  }

  h3 {
    color: var(--step-color);
    margin-bottom: 0.5rem;
  }

  .connector::after {
    content: '➔';
    position: absolute;
    right: -35px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    color: var(--step-color);
  }

  &:last-child .connector::after {
    display: none;
  }
}

@media (max-width: 768px) {
  .process-step {
    width: 100%;
    margin-bottom: 2rem;

    .connector::after {
      content: '⬇️';
      right: 50%;
      top: auto;
      bottom: -35px;
      transform: translateX(50%);
    }
  }
}
</style>
