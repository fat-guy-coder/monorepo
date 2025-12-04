<template>
    <div class="tab-pane gradient-animation-hover" @click="change" :class="{
        'is-active': activeKey === path,
        'is-disabled': disabled
    }">
        <div class="tab" v-if="$slots.tab">
            <slot name="tab"></slot>
            <div class="close-tab--btn" v-if="type === 'editable-card' && closable" @click.stop="close">
                x
            </div>
        </div>
        <div v-if="$slots.content" class="tab-content">
            <slot name="content"></slot>
        </div>
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
/* 响应式设计 */
@media (max-width: 48rem) {
    .tab-pane .tab {
        padding: 0.375rem 0.75rem;
        font-size: 0.8125rem;
        min-height: 1.75rem;
    }
}
.close-tab--btn {
    width: 1.25rem;
    height: 1.25rem;
    line-height: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--color-text-quaternary);
    background: transparent !important;

    &:hover {
        border: var(--border-width) solid var(--color-border);
        border-radius: var(--border-radius-full);
    }
}

.close-tab-btn:hover {
    color: var(--color-primary);
}
</style>