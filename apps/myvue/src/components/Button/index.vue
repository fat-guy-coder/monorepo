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

const props = defineProps<{
  type?: 'default' | 'primary';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  css?: Record<string, string>;
}>();



const isDisabled = computed(() => {
  return props.disabled ||  props.loading;
});

const componentStyle = computed(() => {
  return { ...props.css } as CSSProperties;
});

</script>

<style lang="less" scoped>
.ui-button {
  --btn-default-bg: var(--_btn-default-bg, var(--color-background));
  --btn-default-color: var(--_btn-default-color, var(--color-text));
  --btn-default-border: var(--_btn-default-border, var(--color-border));
  --btn-default-hover-bg: var(--_btn-default-hover-bg, var(--color-background-soft));
  --btn-default-hover-border: var(--_btn-default-hover-border, var(--color-primary));
  --btn-default-hover-color: var(--_btn-default-hover-color, var(--color-primary));

  --btn-primary-bg: var(--_btn-primary-bg, var(--color-primary));
  --btn-primary-color: var(--_btn-primary-color, #fff);
  --btn-primary-border: var(--_btn-primary-border, var(--color-primary));
  --btn-primary-hover-bg: var(--_btn-primary-hover-bg, color-mix(in srgb, var(--color-primary) 85%, black));
  --btn-primary-hover-border: var(--_btn-primary-hover-border, color-mix(in srgb, var(--color-primary) 85%, black));

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
    visibility: v-bind("props.loading ? 'hidden' : 'visible'");
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