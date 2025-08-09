<template>
  <main>
    <p>
      ⭐⭐⭐代表基础知识务必掌握，⭐⭐代表中阶知识熟练掌握，⭐代表高阶知识要掌握，🌟代表进阶知识可掌握
      <a class="ui-config-button" @click="uiConfig">配置ui</a>
      <!-- <a @click="switchComponent">切换</a> -->
    </p>
    <!-- <component :is="path === 'A' ? A : B" /> -->
  </main>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'


// const A = defineAsyncComponent(() => import('@/components/A.vue'))
// const B = defineAsyncComponent(() => import('@/components/B.vue'))

function uiConfig() {
  console.log('uiConfig')
}

// const path = ref('A')

// function switchComponent() {
//   path.value = path.value === 'A' ? 'B' : 'A'
//   import(`@/components/${path.value}.vue`).then((res) => {
//     console.log(res.default)
//   })
// }
</script>
<style scoped></style>
