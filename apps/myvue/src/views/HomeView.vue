<template>
 <Template />
</template>

<script lang="ts" setup>
import Template from '@/components/Template/index.vue'
import { useGradientAnimation } from '@/hooks/useGradientAnimation' //渐变色动画

</script>

<style scoped lang="css">
.home {
  width: 600px;
  height: 300px;
  border: 1px solid #000;
  text-align: center;
  line-height: 300px;
  font-size: 20px;
  font-weight: bold;
  margin: 100px auto;
  position: absolute;
}

</style>
