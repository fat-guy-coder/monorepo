<template>
  <Template />
</template>

<script lang="ts" setup>
import Template from '@/components/Template/index.vue'

</script>

<style scoped lang="css">
.home{
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  position: absolute;
  margin: 300px;
  text-align: center;
  line-height: 300px;
  font-size: 20px;
  font-weight: bold;
  /* 顶层背景透明，让下面的伪元素可见 */
}


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
