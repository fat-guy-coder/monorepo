<template>
  <div class="home">asdasdasdsasadasda</div>
</template>
<!-- <Template /> -->
<script lang="ts" setup>
import Template from '@/components/Template/index.vue'
import { useGradientAnimation } from '@/hooks/useGradientAnimation'//渐变色动画
// import { useGradientAnimation } from '@/hooks/useDemo'//渐变色动画


useGradientAnimation({
  className: 'home',
  colors: ['red', 'green', 'blue', 'yellow', 'purple', 'red'],
  triggerTimes: ['mounted'],
  gradientTypes: ['linear'],
  speed: 60
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
  margin: 100px auto;
  position: absolute;
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

.home {
  position: relative;
  overflow: hidden;
  z-index: 1;
  opacity: 1;

  &::before {
    transition: opacity 0.2s ease;
    content: '';
    position: absolute;
    z-index: -1;
    transform-origin: center;
  }

  -webkit-background-clip:text;
  background-clip:text;
  -webkit-text-fill-color:transparent;
  color:transparent;
  display:inline-block;
  background-image:linear-gradient(0deg, var(--color-gradient-group-1) 0%, red 25%, green 50%, blue 75%, var(--color-gradient-group-1) 100%);
  background-size:100% 200%;
  animation:gradient-anim-qfr2u8 3s linear 0s infinite normal running;
}

@keyframes gradient-anim-qfr2u8 {
  0% {
    background-position: 0 -200%
  }

  100% {
    background-position: 0 200%
  }
}
</style>
