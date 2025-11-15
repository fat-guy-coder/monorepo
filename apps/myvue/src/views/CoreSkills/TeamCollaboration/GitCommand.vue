<template>
  <div>
    <div class="tips">此图为转载自网络，如有侵权，请联系删除。</div>
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

.tips {
  font-size: 12px;
  color: #999;
  text-align: center;
  margin: 10px;
}
</style>
