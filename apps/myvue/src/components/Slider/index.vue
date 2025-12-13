<template>
  <div 
    class="slider-container"
    :class="{ 'is-disabled': disabled }"
    :style="componentStyle"
  >
    <input 
      type="range"
      class="slider-input"
      v-model.number="model"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
    />
    <div class="slider-track">
      <div class="slider-track-filled" :style="{ width: `${progress}%` }"></div>
    </div>
    <div class="slider-handle" :style="{ left: `${progress}%` }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

const model = defineModel<number>({ default: 0 });

const {
  min = 0,
  max = 100,
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

const progress = computed(() => {
  const range = max - min;
  if (range === 0) return 0;
  return ((model.value - min) / range) * 100;
});

</script>

<style lang="less" scoped>
.slider-container {
  --slider-height: 0.375rem; // 6px
  --slider-bg: var(--_slider-bg, var(--color-fill-tertiary));
  --slider-fill-bg: var(--_slider-fill-bg, var(--color-primary));
  --slider-handle-size: 1rem; // 16px
  --slider-handle-bg: var(--_slider-handle-bg, #fff);
  --slider-handle-border: var(--_slider-handle-border, var(--color-primary));
  --slider-handle-shadow: var(--_slider-handle-shadow, var(--box-shadow-sm));
  --slider-handle-focus-shadow: var(--_slider-handle-focus-shadow, 0 0 0 3px color-mix(in srgb, var(--color-primary) 25%, transparent));

  position: relative;
  width: 100%;
  height: var(--slider-handle-size); // Container height should accommodate the handle
  display: flex;
  align-items: center;
  cursor: pointer;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.slider-track, .slider-track-filled {
  position: absolute;
  width: 100%;
  height: var(--slider-height);
  border-radius: var(--border-radius-full);
}

.slider-track {
  background-color: var(--slider-bg);
}

.slider-track-filled {
  background-color: var(--slider-fill-bg);
}

.slider-handle {
  position: absolute;
  width: var(--slider-handle-size);
  height: var(--slider-handle-size);
  background-color: var(--slider-handle-bg);
  border: 2px solid var(--slider-handle-border);
  border-radius: 50%;
  box-shadow: var(--slider-handle-shadow);
  transform: translateX(-50%); // Center the handle on the track
  pointer-events: none; // The handle is visual only
  transition: box-shadow 0.2s ease;
}

// The actual input element is visually hidden but functionally on top
.slider-input {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus-visible ~ .slider-handle {
    box-shadow: var(--slider-handle-focus-shadow);
  }
}
</style>
