<template>
  <!-- <Template /> -->
   <div class="home-view">
   </div>
</template>

<script setup>
import Template from '@/components/Template/index.vue';
import { useGradientAnimation } from '@/hooks/useGradientAnimation'

useGradientAnimation({
  className: 'home-view',
  colorsCount:3,
  speed: 30,
})
</script>

<style scoped>
.home-view {
  width: 100%;
  height: 100%;
}
</style>