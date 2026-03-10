<template>
  <button
    class="ui-button"
    :class="[
      `btn-type--${type}`,
      `btn-size--${size}`,
      { 'is-loading': loading, 'is-disabled': isDisabled }
    ]"
    :disabled="isDisabled"
    :style="componentStyle"
  >
    <span v-if="loading" class="spinner"></span>
    <span class="btn-content">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, inject } from 'vue';


defineOptions({
  name: 'ButtonComponent',
});

const { type = 'default', size = 'medium', loading = false, disabled = false, css = {} } = defineProps<{
  type?: 'default' | 'primary';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  css?: Record<string, string>;
}>();



const isDisabled = computed(() => {
  return disabled ||  loading;
});

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});

</script>

<style lang="less" scoped>
.ui-button {
  --btn-default-bg: var(--btn-default-bg, --color-background);
  --btn-default-color: var(--btn-default-color, --color-text);
  --btn-default-border: var(--btn-default-border, --color-border);
  --btn-default-hover-bg: var(--color-background-soft);
  --btn-default-hover-border: var(--btn-default-hover-border, --color-primary);
  --btn-default-hover-color: var(--btn-default-hover-color, --color-primary);

  --btn-primary-bg: var(--btn-primary-bg, --color-primary);
  --btn-primary-color: var(--btn-primary-color, --color-text);
  --btn-primary-border: var(--btn-primary-border, --color-border);
  --btn-primary-hover-bg: var(--btn-primary-hover-bg, color-mix(in srgb, var(--color-primary) 85%, black));
  --btn-primary-hover-border: var(--btn-primary-hover-border, color-mix(in srgb, var(--color-primary) 85%, black));

  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  user-select: none;

  // Default Type
  &.btn-type--default {
    background-color: var(--btn-default-bg);
    color: var(--btn-default-color);
    border: 1px solid var(--btn-default-border);

    &:not(:disabled):hover {
      background-color: var(--btn-default-hover-bg);
      border-color: var(--btn-default-hover-border);
      color: var(--btn-default-hover-color);
    }
  }

  // Primary Type
  &.btn-type--primary {
    background-color: var(--btn-primary-bg);
    color: var(--btn-primary-color);
    border: 1px solid var(--btn-primary-border);

    &:not(:disabled):hover {
      background-color: var(--btn-primary-hover-bg);
      border-color: var(--btn-primary-hover-border);
    }
  }

  // Sizes
  &.btn-size--small {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  }
  &.btn-size--medium {
    padding: 0.5rem 1rem;
    font-size: 0.95rem;
  }
  &.btn-size--large {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  // Disabled State
  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-content {
    display: inline-flex;
    align-items: center;
    visibility: v-bind("loading ? 'hidden' : 'visible'");
  }
}

.spinner {
  position: absolute;
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  opacity: 0.8;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>