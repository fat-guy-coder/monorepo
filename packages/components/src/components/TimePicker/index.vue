<template>
  <div class="time-picker-wrapper" ref="wrapperRef">
    <div class="input-container" @click="togglePanel">
      <input
        type="text"
        class="time-input"
        :value="model"
        :placeholder="placeholder"
        readonly
      />
      <span class="time-icon">🕒</span>
    </div>
    <Transition name="fade-scale">
      <div v-if="isPanelOpen" class="panel-container">
        <TimePickerPanel :value="model" @select="handleSelect" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import TimePickerPanel from './TimePickerPanel.vue';

const model = defineModel<string>();

const { placeholder = '请选择时间' } = defineProps<{
  placeholder?: string;
}>();

const isPanelOpen = ref(false);
const wrapperRef = ref<HTMLElement | null>(null);

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
};

const handleSelect = (time: string) => {
  model.value = time;
  isPanelOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    isPanelOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<style lang="less" scoped>
.time-picker-wrapper {
  position: relative;
  display: inline-block;
}

.input-container {
  --input-height: 2rem; // 32px
  --input-bg: var(--color-background);
  --input-border-color: var(--color-border);
  --input-focus-border: var(--color-primary);

  position: relative;
  display: flex;
  align-items: center;
  width: 10rem; // 160px
  height: var(--input-height);
  border: 1px solid var(--input-border-color);
  border-radius: var(--border-radius-md);
  background-color: var(--input-bg);
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--input-focus-border);
  }
}

.time-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 0.75rem;
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
}

.time-icon {
  position: absolute;
  right: 0.75rem;
  color: var(--color-text-secondary);
}

.panel-container {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 1050;
}

// Transition styles
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}
</style>
