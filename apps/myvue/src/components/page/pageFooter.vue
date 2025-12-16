<template> <!-- 页脚：通用信息区 -->
    <footer class="page-footer" :style="componentStyle">
        <div class="footer-inner">
            <slot name="title">
                <h2 class="page-title">{{ title }}</h2>
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
    </footer>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

const { 
    title = '页脚标题',
    subtitle = '这是一个页脚区域，用于放置版权、链接等信息。',
    description = `© ${new Date().getFullYear()} Your Company Name. All Rights Reserved.`,
    css = {} 
} = defineProps<{
    title?: string;
    subtitle?: string;
    description?: string;
    css?: CSSProperties;
}>();

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});

</script>

<style lang="less" scoped>
.page-footer {
    --page-footer-text-align: center;
    --page-title-color: var(--color-heading);
    --page-subtitle-color: var(--color-text);
    --page-note-color: var(--color-text-soft);
    --page-title-font-size: clamp(1.25rem, 3vw, 1.75rem);
    --page-subtitle-font-size: clamp(0.875rem, 2vw, 1rem);
    --page-note-font-size: 0.875rem;
    --page-title-font-weight: 600;
    --page-subtitle-font-weight: 400;
    --page-note-font-weight: 400;
    --page-title-line-height: 1.3;
    --page-subtitle-line-height: 1.3;
    --page-note-line-height: 1.3;

    text-align: var(--page-footer-text-align);
    padding: 2rem 1rem;
    border-top: 1px solid var(--color-border);

    .footer-inner {
        margin: 0 auto;
    }

    .page-title {
        color: var(--page-title-color);
        font-size: var(--page-title-font-size);
        font-weight: var(--page-title-font-weight);
        line-height: var(--page-title-line-height);
        margin-bottom: 0.5rem;
    }

    .page-subtitle {
        color: var(--page-subtitle-color);
        font-size: var(--page-subtitle-font-size);
        margin-bottom: 1rem;
    }

    .page-note {
        color: var(--page-note-color);
        font-size: var(--page-note-font-size);
        max-width: 70ch;
        margin-left: auto;
        margin-right: auto;
    }
}
</style>
