<template>
  <label 
    class="checkbox-label"
    :class="{ 'is-disabled': disabled }"
    :style="componentStyle"
  >
    <input 
      type="checkbox" 
      v-model="model"
      :disabled="disabled"
      :indeterminate="indeterminate"
      class="checkbox-input"
    />
    <span class="checkbox-custom">
      <span class="checkbox-check-icon">✓</span>
      <span class="checkbox-indeterminate-icon">-</span>
    </span>
    <span v-if="$slots.default" class="checkbox-text">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

const model = defineModel<boolean>();

const {
  disabled = false,
  indeterminate = false,
  css = {},
} = defineProps<{
  disabled?: boolean;
  indeterminate?: boolean;
  css?: Record<string, string>;
}>();

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});

</script>

<style lang="less" scoped>
.checkbox-label {
  --checkbox-size: 1rem; // 16px
  --checkbox-border-color: var(--color-border);
  --checkbox-bg: var(--color-background);
  --checkbox-checked-bg: var(--color-primary);
  --checkbox-checked-border: var(--color-primary);
  --checkbox-icon-color: var(--_checkbox-icon-color, #fff);
  --checkbox-text-color: var(--color-text);
  --checkbox-disabled-bg: var(--color-fill-tertiary);
  --checkbox-disabled-color: var(--color-text-tertiary);
  --checkbox-radius: var(--border-radius-sm);
  --checkbox-focus-shadow: var(--_checkbox-focus-shadow, 0 0 0 2px color-mix(in srgb, var(--color-primary) 25%, transparent));

  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: var(--checkbox-text-color);
  transition: color 0.2s ease;

  &.is-disabled {
    cursor: not-allowed;
    color: var(--checkbox-disabled-color);

    .checkbox-custom {
      border-color: var(--color-border-secondary);
      background-color: var(--checkbox-disabled-bg);
    }
  }
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-custom {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border: 1px solid var(--checkbox-border-color);
  border-radius: var(--checkbox-radius);
  background-color: var(--checkbox-bg);
  transition: all 0.2s ease;
  position: relative;
}

.checkbox-check-icon, .checkbox-indeterminate-icon {
  color: var(--checkbox-icon-color);
  font-size: calc(var(--checkbox-size) * 0.8);
  line-height: 1;
  font-weight: bold;
  transform: scale(0);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.checkbox-indeterminate-icon {
    font-size: calc(var(--checkbox-size) * 1.2);
}

// Checked state
.checkbox-input:checked + .checkbox-custom {
  background-color: var(--checkbox-checked-bg);
  border-color: var(--checkbox-checked-border);

  .checkbox-check-icon {
    transform: scale(1);
  }
}

// Indeterminate state
.checkbox-input:indeterminate + .checkbox-custom {
  background-color: var(--checkbox-checked-bg);
  border-color: var(--checkbox-checked-border);

  .checkbox-indeterminate-icon {
    transform: scale(1);
  }
}

// Focus state
.checkbox-input:focus-visible + .checkbox-custom {
  box-shadow: var(--checkbox-focus-shadow);
}

.checkbox-text {
  user-select: none;
}
</style>
