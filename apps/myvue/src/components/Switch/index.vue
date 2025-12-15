<template>
  <button
    type="button"
    class="ui-switch"
    :class="[
      `switch-size--${size}`,
      { 'is-checked': model, 'is-disabled': disabled || loading }
    ]"
    :disabled="disabled || loading"
    role="switch"
    :aria-checked="model"
    @click="toggle"
    :style="componentStyle"
  >
    <div class="switch-handle">
      <span v-if="loading" class="spinner"></span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

const model = defineModel<boolean>();

const {
  size = 'medium',
  loading = false,
  disabled = false,
  css = {},
} = defineProps<{
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  css?: Record<string, string>;
}>();

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});

const toggle = () => {
  if (disabled || loading) return;
  model.value = !model.value;
};

</script>

<style lang="less" scoped>
.ui-switch {
  --switch-bg-off: var(--color-fill-tertiary);
  --switch-bg-on: var(--color-primary);
  --switch-handle-bg: var(--_switch-handle-bg, #fff);
  --switch-handle-shadow: var(--box-shadow-xs);
  --switch-focus-shadow: var(--_switch-focus-shadow, 0 0 0 2px color-mix(in srgb, var(--color-primary) 25%, transparent));

  // Sizes
  --switch-width-sm: 1.75rem; // 28px
  --switch-height-sm: 1rem; // 16px
  --switch-handle-size-sm: 0.75rem; // 12px

  --switch-width-md: 2.75rem; // 44px
  --switch-height-md: 1.375rem; // 22px
  --switch-handle-size-md: 1.125rem; // 18px

  --switch-width-lg: 3.75rem; // 60px
  --switch-height-lg: 1.75rem; // 28px
  --switch-handle-size-lg: 1.5rem; // 24px

  position: relative;
  display: inline-block;
  border: none;
  background-color: var(--switch-bg-off);
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;

  // Size variants
  &.switch-size--small {
    width: var(--switch-width-sm);
    height: var(--switch-height-sm);
  }
  &.switch-size--medium {
    width: var(--switch-width-md);
    height: var(--switch-height-md);
  }
  &.switch-size--large {
    width: var(--switch-width-lg);
    height: var(--switch-height-lg);
  }

  // Handle
  .switch-handle {
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
    background-color: var(--switch-handle-bg);
    border-radius: 50%;
    box-shadow: var(--switch-handle-shadow);
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.switch-size--small .switch-handle {
    width: var(--switch-handle-size-sm);
    height: var(--switch-handle-size-sm);
  }
  &.switch-size--medium .switch-handle {
    width: var(--switch-handle-size-md);
    height: var(--switch-handle-size-md);
  }
  &.switch-size--large .switch-handle {
    width: var(--switch-handle-size-lg);
    height: var(--switch-handle-size-lg);
  }

  // Checked state
  &.is-checked {
    background-color: var(--switch-bg-on);

    &.switch-size--small .switch-handle {
      transform: translate(calc(var(--switch-width-sm) - var(--switch-handle-size-sm) - 4px), -50%);
    }
    &.switch-size--medium .switch-handle {
      transform: translate(calc(var(--switch-width-md) - var(--switch-handle-size-md) - 4px), -50%);
    }
    &.switch-size--large .switch-handle {
      transform: translate(calc(var(--switch-width-lg) - var(--switch-handle-size-lg) - 4px), -50%);
    }
  }

  // Disabled state
  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  // Focus state
  &:focus-visible {
    outline: none;
    box-shadow: var(--switch-focus-shadow);
  }
}

.spinner {
  display: inline-block;
  width: 60%;
  height: 60%;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  border-left-color: transparent;
  color: var(--switch-bg-on);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
