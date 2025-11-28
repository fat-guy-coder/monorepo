<template>
    <div class="tab-pane" @click="change" :class="{
        'is-active': activeKey === path,
        'is-disabled': disabled
    }">
        <div class="tab" v-if="$slots.tab">
            <slot name="tab"></slot>
        </div>
        <slot name="content" v-if="activeKey === path && $slots.content"></slot>
    </div>
</template>

<script setup lang="ts">
import { inject, type ComputedRef } from 'vue';

defineOptions({
    name: 'TabPane',
});

const props = defineProps<{
    disabled?: boolean;
    path: string;
}>();


//激活的key
// Inject the active key from the parent Tabs component
const activeKey = inject<ComputedRef<string>>('activeKey');

// Determine if this pane is the active one
//   const isActive = computed(() => activeKey?.value === props.key);

const emit = defineEmits<{
    (e: 'change', key: string): void;
}>();


// 注入事件处理函数
const onTabChange = inject<(path: string) => void>('change');

const change = () => {
    onTabChange?.(props.path)
}
</script>

<style lang="less">
.tab-pane {
    flex-shrink: 0;
}

.is-active {
    div {
        background: var(--color-highlight-bg)!important;
        color: var(--color-highlight-text)!important;
    }
}

.is-disabled {
    div {
        opacity: 0.5 !important;
        cursor: not-allowed !important;
    }
}
</style>