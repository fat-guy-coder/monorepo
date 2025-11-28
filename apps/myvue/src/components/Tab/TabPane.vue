<template>
    <div class="tab-pane" @click="change" :class="{
        'is-active-tab-pane': activeKey === path,
        'is-tab-disabled': disabled
    }">
        <div class="tab" v-if="$slots.tab">
            <slot name="tab"></slot>
            <div class="close-tab--btn" v-if="type === 'editable-card' && closable" @click="close">
                x
            </div>
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
    closable?: boolean;
    path: string;
}>();


const type = inject<ComputedRef<string>>('type');


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

// 注入事件处理函数
const onClose = inject<(path: string) => void>('close');

const close = () => {
    onClose?.(props.path)
}
</script>

<style lang="less">
.tab-pane {
    flex-shrink: 0;
}

.is-active-tab-pane {
    div {
        background: var(--color-highlight-bg) !important;
        color: var(--color-highlight-text) !important;
    }
}

.is-tab-disabled {
    div {
        opacity: 0.5 !important;
        cursor: not-allowed !important;
    }
}

.close-tab--btn {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--color-text);
}

.close-tab-btn:hover {
    color: var(--color-primary);
}
</style>