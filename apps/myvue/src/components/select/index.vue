<template>
  <div class="custom-select" ref="selectRef">
    <div class="select-input" :class="{ 'is-open': isOpen }" @click="toggleDropdown">
      <span v-if="selectedValue" class="selected-value">{{ selectedLabel }}</span>
      <span v-else class="placeholder">{{ placeholder }}</span>
      <svg
        class="arrow-icon"
        :class="{ 'is-open': isOpen }"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M831.872 340.864l-319.872 319.872-319.872-319.872z"></path>
      </svg>
    </div>
    <transition name="slide-fade">
      <div v-if="isOpen" class="select-dropdown">
        <ul>
          <li
            v-for="option in options as Option[] | any"
            :key="option.value as string"
            class="option-item"
            :class="{ 'is-selected': option.value === selectedValue }"
            @click="selectOption(option)"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Option {
  value: string;
  label: string;
}

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  options: {
    type: Array,
    default: () => [], // e.g., [{ label: 'Option 1', value: '1' }]
  },
  placeholder: {
    type: String,
    default: 'Please select',
  },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectRef = ref(null);

const selectedValue = computed(() => props.modelValue);

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(
    (option: Option | any) => option.value === selectedValue.value,
  ) as Option | undefined;
  return selectedOption ? selectedOption.label : '';
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectOption = (option: { value: string }) => {
  emit('update:modelValue', option.value);
  closeDropdown();
};

const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !(selectRef.value as HTMLElement).contains(event.target as Node)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="less" scoped>

.custom-select {
  position: relative;
  width: var(--select-width);
  font-size: var(--select-font-size);

  // 组件内部可调变量（统一从全局 theme.less 派生）
  --select-width: 13.75rem; // 220px / 16
  --select-font-size: var(--font-size-sm);

  --select-bg: var(--color-background-soft);
  --select-border-color: var(--color-border);
  --select-border-color-hover: var(--color-border-hover);
  --select-border-radius: var(--border-radius-sm);

  --select-text-color: var(--color-text);
  --select-placeholder-color: var(--color-text-soft);
  --select-arrow-color: var(--color-text-soft);

  --select-padding-y: var(--padding-sm);
  --select-padding-x: var(--padding-md);

  --select-dropdown-bg: var(--color-background);
  --select-dropdown-border-color: var(--color-border);
  --select-dropdown-radius: var(--border-radius-sm);
  --select-dropdown-shadow: var(--box-shadow-sm);
  --select-dropdown-max-height: 12.5rem; // 200px

  --select-option-padding-y: var(--padding-sm);
  --select-option-padding-x: var(--padding-md);
  --select-option-hover-bg: var(--color-background-soft);
  --select-option-selected-bg: color-mix(in srgb, var(--color-primary) 10%, transparent);
  --select-option-selected-color: var(--color-primary);

  --select-transition-duration: 0.2s;
}

.select-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--select-padding-y) var(--select-padding-x);
  background-color: var(--select-bg);
  border: var(--border-width) solid var(--select-border-color);
  border-radius: var(--select-border-radius);
  cursor: pointer;
  transition:
    border-color var(--select-transition-duration) ease,
    box-shadow var(--select-transition-duration) ease;

  &:hover {
    border-color: var(--select-border-color-hover);
  }

  &.is-open {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 0.125rem color-mix(in srgb, var(--color-primary) 20%, transparent); // 2px
  }
}

.selected-value {
  color: var(--select-text-color);
}

.placeholder {
  color: var(--select-placeholder-color);
}

.arrow-icon {
  width: 0.75rem; // 12px
  height: 0.75rem;
  fill: var(--select-arrow-color);
  transition: transform 0.3s ease;

  &.is-open {
    transform: rotate(180deg);
  }
}

.select-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--select-dropdown-bg);
  border: var(--border-width) solid var(--select-dropdown-border-color);
  border-radius: var(--select-dropdown-radius);
  box-shadow: var(--select-dropdown-shadow);
  max-height: var(--select-dropdown-max-height);
  overflow-y: auto;

  ul {
    list-style: none;
    padding: var(--element-padding-sm);
    margin: 0;
  }
}

.option-item {
  padding: var(--select-option-padding-y) var(--select-option-padding-x);
  color: var(--select-text-color);
  cursor: pointer;
  border-radius: var(--select-border-radius);
  transition: background-color var(--select-transition-duration) ease;

  &:hover {
    background-color: var(--select-option-hover-bg);
  }

  &.is-selected {
    background-color: var(--select-option-selected-bg);
    color: var(--select-option-selected-color);
    font-weight: 600;
  }
}

/* Transition for dropdown */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all var(--select-transition-duration) ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
