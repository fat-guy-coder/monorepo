<template>
  <footer class="ui-layout-footer" :style="{
    height: `${footerState.isVisible ? footerState.size : 0}px`,
  }">
    <slot name="control">
      <div
        class="unified-trigger bottom"
        :style="{ bottom: footerState.isVisible ? `${footerState.size}px` : '0' }"
      >
        <div class="control-group">
          <label v-if="footerState.isVisible" class="control-item">
            <span>显示</span>
            <Switch v-model="footerState.isVisible" size="small" />
          </label>
          <label v-if="footerState.isVisible" class="control-item">
            <span>固定</span>
            <Switch v-model="footerState.isFixed" size="small" />
          </label>
          <button v-else class="restore-trigger" @click="footerState.isVisible = true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
            </svg>
          </button>
        </div>
      </div>
    </slot>
    <div class="footer-content"><slot name="default">Footer</slot></div>
  </footer>
</template>

<script setup lang="ts">
import type { LayoutPartState } from './index'
defineOptions({ name: 'Footer' })
defineModel<LayoutPartState>('footerState', { required: true })
</script>

<style lang="less" scoped>
.ui-layout-footer {
  --footer-bg: var(--color-background-soft);
  --footer-border-color: var(--color-border);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--footer-bg);
  border-top: 1px solid var(--footer-border-color);
  transition: height 0.3s ease;
  flex-shrink: 0; // Prevent shrinking
  position: relative;
  border-top: none;

  &[style*='height: 0px'] {
    padding-top: 0;
    padding-bottom: 0;
    border-top-width: 0;
  }
}
</style>
