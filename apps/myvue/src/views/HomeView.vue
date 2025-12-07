<template>
  <div class="home">asdasdasdsa</div>
</template>
<!-- <Template /> -->
<script lang="ts" setup>
import Template from '@/components/Template/index.vue'
import { useGradientAnimation } from '@/hooks/useGradientAnimation'//渐变色动画


useGradientAnimation({
  className: 'home',
  colors: ['red', 'green', 'blue', 'yellow', 'purple', 'red'],
  triggerTimes: ['mounted', 'hover', 'active'],
  direction: 'random',
  colorsCount: {
    randomColorsOrder: true
  }
})
</script>

<style scoped lang="css">
.home {
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  text-align: center;
  line-height: 300px;
  font-size: 20px;
  font-weight: bold;
  background-color: red;
}


@keyframes gradient1 {
  0% {
    background-position: 0 -200%
  }

  100% {
    background-position: 0 200%
  }

}

@keyframes gradient2 {
  0% {
    background-position: -200% 0
  }

  100% {
    background-position: 200% 0
  }

}

@keyframes gradient3 {
  0% {
    background-position: 0 -200%
  }

  100% {
    background-position: 0 200%
  }
}

.home {
  position: relative;
  overflow: hidden;
  z-index: 1;
  &::before {
    transition: opacity 0.2s ease;
    content: '';
    position: absolute;
    z-index: -1;
    transform-origin: center;
  }
  &::before {
    inset: 0;
    background-image: linear-gradient(0deg, var(--color-gradient-group-1) 0%, red 25%, green 50%, blue 75%, var(--color-gradient-group-1) 100%);
    background-size: 100% 200%;
    animation: gradient1 4s linear 0s infinite normal running;
  }

  &:hover {
    &::before {
      inset: 0;
      background-image: linear-gradient(90deg, red, green, blue, yellow, purple, red);
      background-size: 200% 100%;
      animation: gradient2 1s linear 0s infinite normal running;
    }
  }

  &:active {
    &::before {
      inset: 0;
      background-image: linear-gradient(180deg, red, green, blue, yellow, purple, red);
      background-size: 100% 200%;
      animation: gradient3 1s linear 0s infinite normal running;
    }
  }
}

.home-view {
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  /* 顶层背景透明，让下面的伪元素可见 */
  background-color: transparent;
  overflow: hidden;
  background-image: linear-gradient(90deg, red, green, blue, yellow, purple, red);
  background-size: 200% 100%;
  animation: gradient-animation 1s linear infinite;
}

.home-view>* {
  position: relative;
  z-index: 1;
}

/* .home-view:hover::before {
  content: '';
  position: absolute;
  inset: -25%;
  background-image: linear-gradient(90deg, red, green, blue, yellow, purple, red);
  background-size: 200% 100%;
  animation: gradient-animation 1s linear infinite;
  transform: rotate(-45deg);
  transform-origin: center;
  z-index: 0;
} */

@keyframes gradient-animation {
  0% {
    background-position: -100% 0;
  }

  100% {
    background-position: 100% 0;
  }
}
</style>
