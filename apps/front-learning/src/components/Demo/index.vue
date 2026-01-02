<template>
    <div @click="doSomeThing">asdasdasd</div>
</template>
<script lang="ts" setup>
const emit = defineEmits<{
    (e: 'doSomeThing'): void
}>()

const doSomeThing = () => {
    emit('doSomeThing')
}
</script>