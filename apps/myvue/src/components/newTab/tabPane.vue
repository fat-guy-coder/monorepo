<template>
    <div class="tab-pane" @click="onChange">
        <slot @click="onChange"></slot>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'ATabPane',
})

const props = defineProps<{
    key: string,
    closable?: boolean
    disabled?: boolean
    index?: number
}>()

const emit = defineEmits<{
    (e: 'close', path: string): void
    (e: 'change', key: string): void
}>()

const onChange = () => {
    emit('change', props.key)
}

// const handleClose = (path: string) => {
//     emit('close', props.path)
// }

</script>

<style scoped lang="less">
.tab-pane {
    width: auto;
    height: auto;
}
</style>
