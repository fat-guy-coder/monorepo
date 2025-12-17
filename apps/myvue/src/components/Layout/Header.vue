<template>
  <header
    class="layout-header"
    :style="{
      height: `${headerState.isVisible ? headerState.size : 0}px`,
    }"
  >
    <slot name="control">
      <div
        class="unified-trigger top"
        :style="{ top: headerState.isVisible ? `${headerState.size}px` : '0' }"
      >
        <div class="control-group">
          <label v-if="headerState.isVisible" class="control-item">
            <span>显示</span>
            <Switch v-model="headerState.isVisible" size="small" />
          </label>
          <label v-if="headerState.isVisible" class="control-item">
            <span>固定</span>
            <Switch v-model="headerState.isFixed" size="small" />
          </label>
          <button v-else class="restore-trigger" @click="headerState.isVisible = true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M12 16l-6-6 1.41-1.41L12 13.17l4.59-4.58L18 10z" />
            </svg>
          </button>
        </div>
      </div>
    </slot>
    <slot name="default">Header</slot>
  </header>
</template>

<script setup lang="ts">
import type { LayoutPartState } from './index'
defineOptions({ name: 'Header' })

defineModel<LayoutPartState>('headerState', { required: true })
</script>

<style lang="less" scoped>
.layout-header {
  --header-bg: var(--color-background-soft);
  --header-border-color: var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--header-bg);
  border-bottom: 1px solid var(--header-border-color);
  transition: height 0.3s ease;
  flex-shrink: 0; // Prevent shrinking
  position: relative;
  border-bottom: none;

  &[style*='height: 0px'] {
    padding-top: 0;
    padding-bottom: 0;
    border-bottom-width: 0;
  }
}
</style>
