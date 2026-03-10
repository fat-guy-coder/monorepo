<template>
  <div class="cascader-wrapper" ref="wrapperRef">
    <div class="input-container" @click="togglePanel">
      <input
        type="text"
        class="cascader-input"
        :value="displayValue"
        :placeholder="placeholder"
        readonly
      />
      <span class="cascader-icon">▼</span>
    </div>
    <Transition name="fade-scale">
      <div v-if="isPanelOpen" class="panel-container">
        <CascaderPanel 
          :options="options" 
          :value="model" 
          @select="handleSelect" 
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import CascaderPanel from './CascaderPanel.vue';
import type { CascaderOption } from './types';

const model = defineModel<any[]>();

const props = withDefaults(defineProps<{
  options: CascaderOption[];
  placeholder?: string;
}>(), {
  placeholder: '请选择',
});

const isPanelOpen = ref(false);
const wrapperRef = ref<HTMLElement | null>(null);

const displayValue = computed(() => {
  if (!model.value || model.value.length === 0) return '';
  // This is a simplified display logic. It needs to find the full path labels.
  // We will implement this logic properly after creating the panel.
  let tempOptions = props.options;
  let labels: string[] = [];
  model.value.forEach(value => {
    const option = tempOptions?.find(o => o.value === value);
    if(option) {
      labels.push(option.label);
      tempOptions = option.children;
    }
  });
  return labels.join(' / ');
});

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
};

const handleSelect = (path: any[]) => {
  model.value = path;
  isPanelOpen.value = false; // Close panel on selection
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
.cascader-wrapper {
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
  width: 15rem; // 240px
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

.cascader-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 2rem 0 0.75rem;
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cascader-icon {
  position: absolute;
  right: 0.75rem;
  color: var(--color-text-secondary);
  transition: transform 0.2s ease;
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