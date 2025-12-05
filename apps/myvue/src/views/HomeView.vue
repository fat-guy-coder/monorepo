<template>
  <div class="home-id"></div>
</template>

<script lang="ts" setup>
// import Template from '@/components/Template/index.vue'
import { useGradientAnimation } from '@/hooks/useGradientAnimation'

// useGradientAnimation({
//   className: 'home-id',
//   triggerTimes: ['mounted']
// })
</script>

<style scoped>
.home-id {
  width: 100%;
  height: 100%;
}

@keyframes gradient-anim-pbe4dx {
  0% {
    background-position: 200% 0
  }

  100% {
    background-position: -200% 0
  }
}

;

.home-id {
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(90deg, var(--color-gradient-group-1) 0%, var(--color-gradient-group-10) 25%, var(--color-gradient-group-11) 50%, var(--color-gradient-group-12) 75%, var(--color-gradient-group-1) 100%);
  background-size: 200% 100%;
  animation: gradient-anim-pbe4dx 2s linear 0s infinite normal running
}

;

.home-view {
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  /* 顶层背景透明，让下面的伪元素可见 */
  background-color: transparent;
  overflow: hidden;
}

.home-view>* {
  position: relative;
  z-index: 1;
}

.home-view::before {
  content: '';
  position: absolute;
  inset: -25%;
  background-image: linear-gradient(90deg, red, green, blue, yellow, purple, red);
  background-size: 200% 100%;
  animation: gradient-animation 1s linear infinite;
  transform: rotate(-45deg);
  transform-origin: center;
  z-index: 0;
}

@keyframes gradient-animation {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
}
</style>
