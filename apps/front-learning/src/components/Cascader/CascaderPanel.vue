<template>
  <div class="cascader-panel">
    <ul v-for="(column, index) in columns" :key="index" class="cascader-column">
      <li
        v-for="option in column"
        :key="option.value"
        class="cascader-item"
        :class="{
          'is-active': isActive(index, option.value),
          'is-disabled': option.disabled,
          'has-children': option.children && option.children.length > 0
        }"
        @click="!option.disabled && handleSelect(index, option)"
      >
        <span class="item-label">{{ option.label }}</span>
        <span v-if="option.children && option.children.length > 0" class="arrow-icon">▶</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { CascaderOption } from './types';

const props = defineProps<{
  options: CascaderOption[];
  value: any[];
}>();

const emit = defineEmits<{ (e: 'select', path: any[]): void }>();

const activePath = ref<any[]>([]);

const columns = computed(() => {
  const result: CascaderOption[][] = [props.options];
  let currentOptions = props.options;

  for (const val of activePath.value) {
    const selectedOption = currentOptions?.find(o => o.value === val);
    if (selectedOption && selectedOption.children) {
      result.push(selectedOption.children);
      currentOptions = selectedOption.children;
    } else {
      break;
    }
  }
  return result;
});

const isActive = (columnIndex: number, value: any) => {
  return activePath.value[columnIndex] === value;
};

const handleSelect = (columnIndex: number, option: CascaderOption) => {
  // Update the active path
  const newPath = activePath.value.slice(0, columnIndex);
  newPath.push(option.value);
  activePath.value = newPath;

  // If it's a leaf node, emit the final selection
  if (!option.children || option.children.length === 0) {
    emit('select', newPath);
  }
};

// Sync active path with external value
watch(() => props.value, (newVal) => {
  if (newVal) {
    activePath.value = [...newVal];
  }
}, { immediate: true });

</script>

<style lang="less" scoped>
.cascader-panel {
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background: var(--color-background);
  box-shadow: var(--box-shadow-md);
  overflow: hidden;
}

.cascader-column {
  list-style: none;
  padding: 0.25rem;
  margin: 0;
  min-width: 10rem; // 160px
  height: 12.5rem; // 200px
  overflow-y: auto;
  border-right: 1px solid var(--color-border-secondary);

  &:last-child {
    border-right: none;
  }
}

.cascader-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;
  white-space: nowrap;

  &:hover {
    background-color: var(--color-fill-secondary);
  }

  &.is-active {
    background-color: var(--color-primary-light-9); // A very light primary color
    color: var(--color-primary);
    font-weight: 600;
  }

  &.is-disabled {
    color: var(--color-text-tertiary);
    cursor: not-allowed;
    background-color: transparent;
  }
}

.item-label {
  flex-grow: 1;
}

.arrow-icon {
  font-size: 0.6rem;
  color: var(--color-text-tertiary);
  margin-left: 1rem;
}
</style>
