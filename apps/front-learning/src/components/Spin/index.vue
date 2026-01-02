<template>
  <div class="spin-container" v-if="spinning">
    <div :class="spinClasses">
      <span class="spin-dot">
        <i class="spin-dot-item"></i>
        <i class="spin-dot-item"></i>
        <i class="spin-dot-item"></i>
        <i class="spin-dot-item"></i>
      </span>
      <div v-if="tip" class="spin-text">{{ tip }}</div>
    </div>
    <div class="spin-content" :class="{ 'is-blur': spinning }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'ASpin',
});

const { spinning = true, size = 'default', tip = '' } = defineProps<{
  spinning?: boolean;
  size?: 'small' | 'default' | 'large';
  tip?: string;
}>()

const spinClasses = computed(() => [
  'spin-wrapper',
    `spin--${size}`,
]);
</script>

<style lang="less" scoped>
.spin-container {
  position: relative;
  height: 100%;
}

.spin-content {
  transition: opacity 0.3s, filter 0.3s;

  &.is-blur {
    opacity: 0.5;
    // A subtle blur effect can be nice, but let's keep it simple for now.
    // filter: blur(1px);
    user-select: none;
    pointer-events: none;
  }
}

.spin-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 4;
  background-color: color-mix(in srgb, var(--color-bg-container) 50%, transparent);
}

.spin-dot {
  position: relative;
  display: inline-block;
  font-size: 20px;
  width: 1em;
  height: 1em;
  transform: rotate(45deg);
  animation: spin-rotate 1.2s infinite linear;
}

.spin-dot-item {
  position: absolute;
  display: block;
  width: 9px;
  height: 9px;
  background-color: var(--color-primary);
  border-radius: 100%;
  transform: scale(0.75);
  transform-origin: 50% 50%;
  opacity: 0.3;
  animation: spin-move 1s infinite linear alternate;
}

.spin-dot-item:nth-child(1) {
  top: 0;
  left: 0;
}

.spin-dot-item:nth-child(2) {
  top: 0;
  right: 0;
  animation-delay: 0.4s;
}

.spin-dot-item:nth-child(3) {
  right: 0;
  bottom: 0;
  animation-delay: 0.8s;
}

.spin-dot-item:nth-child(4) {
  bottom: 0;
  left: 0;
  animation-delay: 1.2s;
}

.spin-text {
  margin-top: 8px;
  color: var(--color-primary);
  font-size: 14px;
}

/* Size Variants */
.spin--small .spin-dot {
  font-size: 14px;
}

.spin--small .spin-dot-item {
  width: 6px;
  height: 6px;
}

.spin--large .spin-dot {
  font-size: 32px;
}

.spin--large .spin-dot-item {
  width: 14px;
  height: 14px;
}

@keyframes spin-rotate {
  to {
    transform: rotate(405deg);
  }
}

@keyframes spin-move {
  to {
    opacity: 1;
  }
}
</style>
