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
  triggerTimes: ['hover', 'active', 'mounted'],
  direction: 'random'
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

/* .home {
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
} */
/* .home {
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

  &:hover {
    &::before {
      inset: 0;
      background-image: linear-gradient(90deg, var(--color-gradient-group-1) 0%, blue 14.285714285714285%, green 28.57142857142857%, red 42.857142857142854%, purple 57.14285714285714%, red 71.42857142857143%, yellow 85.71428571428571%, var(--color-gradient-group-1) 100%);
      background-size: 200% 100%;
      animation: gradient-anim-kabcmk 4s linear 0s infinite normal running;
    }
  }
}

@keyframes gradient-anim-kabcmk {
  0% {
    background-position: -200% 0
  }

  100% {
    background-position: 200% 0
  }
} */
</style>
