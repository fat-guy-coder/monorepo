<template> <!-- 头部：标题区 -->
    <header class="page-header" :style="componentStyle">
        <div class="header-inner">
            <slot name="title">
                <h1 class="page-title">{{ title }}</h1>
            </slot>
            <slot name="subtitle">
                <p class="page-subtitle">{{ subtitle }}</p>
            </slot>
            <slot name="note">
                <p class="page-note" v-if="description">
                    {{ description }}
                </p>
            </slot>
        </div>
    </header>
</template>
<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
const { title = '核心技能模板页', subtitle = '以主题变量驱动的卡片式信息布局', description = '建议：本模板用于承载知识点/功能模块的分区展示。通过主题变量实现深浅/冷暖主题的无缝切换；布局优先采用栅格，在移动端保持优秀可读性与触达性。', css = {} } = defineProps<{
    title: string;
    subtitle: string;
    description?: string;
    css?: CSSProperties;
}>();

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});

</script>

<style lang="less" scoped>
.page-header {
    --page-header-text-align: center;
    --page-title-color: var(--color-heading);
    --page-subtitle-color: var(--color-text);
    --page-note-color: var(--color-text-soft);
    --page-title-font-size: clamp(1.5rem, 4vw, 2.25rem);
    --page-subtitle-font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    --page-note-font-size: 0.875rem;
    --page-title-font-weight: 700;
    --page-subtitle-font-weight: 400;
    --page-note-font-weight: 400;
    --page-title-line-height: 1.25;
    --page-subtitle-line-height: 1.25;
    --page-note-line-height: 1.25;
    .header-inner {
        margin: 0 auto;
    }

    .page-title {
        color: var(--page-title-color);
        font-size: var(--page-title-font-size);
        font-weight: var(--page-title-font-weight);
        line-height: var(--page-title-line-height);
    }

    .page-subtitle {
        color: var(--page-subtitle-color);
        font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    }

    .page-note {
        color: var(--page-note-color);
        font-size: var(--page-note-font-size);
        max-width: 60ch;
        /* Improve readability */
        margin-left: auto;
        margin-right: auto;
    }
}
</style>