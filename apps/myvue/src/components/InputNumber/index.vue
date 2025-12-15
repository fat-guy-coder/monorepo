<template>
  <div 
    class="input-number"
    :class="{ 'is-disabled': disabled }"
    :style="componentStyle"
  >
    <button 
      class="control-btn decrease-btn"
      @click="decrease"
      :disabled="disabled || model <= min"
      aria-label="Decrease value"
    >-</button>
    <input 
      type="number"
      class="input-field"
      v-model.number="model"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      @change="handleInputChange"
    />
    <button 
      class="control-btn increase-btn"
      @click="increase"
      :disabled="disabled || model >= max"
      aria-label="Increase value"
    >+</button>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

const model = defineModel<number>({ default: 0 });

const {
  min = -Infinity,
  max = Infinity,
  step = 1,
  disabled = false,
  css = {},
} = defineProps<{
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  css?: Record<string, string>;
}>();

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});

const clamp = (value: number) => {
  return Math.max(min, Math.min(max, value));
};

const decrease = () => {
  if (disabled) return;
  model.value = clamp((model.value || 0) - step);
};

const increase = () => {
  if (disabled) return;
  model.value = clamp((model.value || 0) + step);
};

const handleInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = parseFloat(target.value);
  if (!isNaN(value)) {
    model.value = clamp(value);
  } else {
    // Reset to min or 0 if input is invalid
    model.value = clamp(min !== -Infinity ? min : 0);
  }
};

</script>

<style lang="less" scoped>
.input-number {
  --input-width: 8rem; // 128px
  --input-height: 2rem; // 32px
  --input-bg: var(--color-background);
  --input-border-color: var(--color-border);
  --input-text-color: var(--color-text);
  --input-focus-border: var(--color-primary);
  --input-focus-shadow: var(--_input-focus-shadow, 0 0 0 2px color-mix(in srgb, var(--color-primary) 25%, transparent));
  --input-disabled-bg: var(--color-fill-tertiary);
  --input-btn-color: var(--color-text-secondary);
  --input-btn-hover-bg: var(--color-fill-secondary);

  display: inline-flex;
  align-items: center;
  width: var(--input-width);
  height: var(--input-height);
  border: 1px solid var(--input-border-color);
  border-radius: var(--border-radius-md);
  background-color: var(--input-bg);
  transition: border-color 0.2s, box-shadow 0.2s;
  overflow: hidden;

  &:focus-within {
    border-color: var(--input-focus-border);
    box-shadow: var(--input-focus-shadow);
  }

  &.is-disabled {
    background-color: var(--input-disabled-bg);
    cursor: not-allowed;

    .input-field, .control-btn {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
}

.input-field {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  text-align: center;
  background-color: transparent;
  color: var(--input-text-color);
  font-size: 0.9rem;
  -moz-appearance: textfield; // Hide arrows in Firefox

  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    -webkit-appearance: none; // Hide arrows in Chrome/Safari
    margin: 0;
  }
}

.control-btn {
  flex-shrink: 0;
  width: var(--input-height); // Make buttons square
  height: 100%;
  border: none;
  background-color: transparent;
  color: var(--input-btn-color);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: var(--input-btn-hover-bg);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.decrease-btn {
  border-right: 1px solid var(--input-border-color);
}

.increase-btn {
  border-left: 1px solid var(--input-border-color);
}
</style>
