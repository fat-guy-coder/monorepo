<template>
  <ul class="time-column" ref="columnRef">
    <li
      v-for="item in options"
      :key="item.value"
      class="time-item"
      :class="{
        'is-active': item.value === value,
        'is-disabled': item.disabled,
      }"
      @click="!item.disabled && handleSelect(item.value)"
    >
      {{ item.label }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';

interface TimeOption {
  value: number;
  label: string;
  disabled: boolean;
}

const props = defineProps<{
  options: TimeOption[];
  value: number;
}>();

const emit = defineEmits<{ (e: 'select', value: number): void }>();

const columnRef = ref<HTMLUListElement | null>(null);

const handleSelect = (value: number) => {
  emit('select', value);
};

const scrollToSelected = () => {
  if (!columnRef.value) return;
  const selectedElement = columnRef.value.querySelector('.is-active') as HTMLLIElement;
  if (selectedElement) {
    // scrollIntoView is smooth and works well here.
    columnRef.value.scrollTop = selectedElement.offsetTop - columnRef.value.offsetTop;
  }
};

watch(() => props.value, () => {
  nextTick(scrollToSelected);
}, { immediate: true });

</script>

<style lang="less" scoped>
.time-column {
  --time-item-height: 2rem; // 32px

  list-style: none;
  padding: 0;
  margin: 0;
  width: 3.5rem; // 56px
  height: calc(var(--time-item-height) * 7); // Show 7 items at a time
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 2px;
  }
}

.time-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--time-item-height);
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;

  &:hover:not(.is-disabled) {
    background-color: var(--color-fill-secondary);
  }

  &.is-active {
    color: var(--color-primary);
    font-weight: 600;
  }

  &.is-disabled {
    color: var(--color-text-tertiary);
    cursor: not-allowed;
    background-color: transparent;
  }
}
</style>
