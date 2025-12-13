<template>
  <div 
    class="radio-group"
    :class="[`direction--${direction}`]"
    :style="componentStyle"
    role="radiogroup"
  >
    <label 
      v-for="option in options" 
      :key="option.value"
      class="radio-label"
      :class="{ 'is-disabled': disabled || option.disabled }"
    >
      <input 
        type="radio" 
        :checked="option.value === model"
        :value="option.value"
        :disabled="disabled || option.disabled"
        @change="handleChange(option.value)"
        class="radio-input"
      />
      <span class="radio-custom"></span>
      <span class="radio-text">{{ option.label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

const model = defineModel<string | number>();

const {
  options = [],
  direction = 'horizontal',
  disabled = false,
  css = {},
} = defineProps<{
  options: RadioOption[];
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
  css?: Record<string, string>;
}>();

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});

const handleChange = (value: string | number) => {
  model.value = value;
};

</script>

<style lang="less" scoped>
.radio-group {
  --radio-size: 1rem; // 16px
  --radio-gap: 1.5rem; // 24px (horizontal)
  --radio-vertical-gap: 0.75rem; // 12px (vertical)
  --radio-border-color: var(--_radio-border-color, var(--color-border));
  --radio-bg: var(--_radio-bg, var(--color-background));
  --radio-checked-color: var(--_radio-checked-color, var(--color-primary));
  --radio-text-color: var(--_radio-text-color, var(--color-text));
  --radio-disabled-color: var(--_radio-disabled-color, var(--color-text-tertiary));

  display: flex;
  flex-wrap: wrap;

  &.direction--horizontal {
    flex-direction: row;
    gap: var(--radio-gap);
  }

  &.direction--vertical {
    flex-direction: column;
    gap: var(--radio-vertical-gap);
  }
}

.radio-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: var(--radio-text-color);
  transition: color 0.2s ease;

  &.is-disabled {
    cursor: not-allowed;
    color: var(--radio-disabled-color);

    .radio-custom {
      border-color: var(--color-border-secondary);
      background-color: var(--color-fill-tertiary);
    }
  }
}

.radio-input {
  // Hide the native radio button
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-custom {
  display: inline-block;
  width: var(--radio-size);
  height: var(--radio-size);
  border: 2px solid var(--radio-border-color);
  border-radius: 50%;
  transition: all 0.2s ease;
  position: relative;

  // Inner dot
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: calc(var(--radio-size) * 0.5);
    height: calc(var(--radio-size) * 0.5);
    border-radius: 50%;
    background-color: var(--radio-checked-color);
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

// Checked state
.radio-input:checked + .radio-custom {
  border-color: var(--radio-checked-color);

  &::after {
    transform: translate(-50%, -50%) scale(1);
  }
}

// Focus state (for accessibility)
.radio-input:focus-visible + .radio-custom {
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--radio-checked-color) 25%, transparent);
}

.radio-text {
  user-select: none;
}
</style>
