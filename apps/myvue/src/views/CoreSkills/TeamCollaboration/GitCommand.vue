<template>
  <div>
    <img :src="GitCommand" loading="lazy" alt="git-command" class="git-command" />
  </div>
</template>
<script lang="ts" setup>
import GitCommand from '@/assets/git.jpg'
</script>
<style scoped>
.git-command {
  width: 100%;
}
</style>
