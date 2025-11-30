<template>
  <div class="custom-select" ref="selectRef">
    <div class="select-input" @click="toggleDropdown">
      <span v-if="selectedValue" class="selected-value">{{ selectedLabel }}</span>
      <span v-else class="placeholder">{{ placeholder }}</span>
      <svg class="arrow-icon" :class="{ 'is-open': isOpen }" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M831.872 340.864l-319.872 319.872-319.872-319.872z"></path>
      </svg>
    </div>
    <transition name="slide-fade">
      <div v-if="isOpen" class="select-dropdown">
        <ul>
          <li
            v-for="option in options"
            :key="option.value"
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

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null
  },
  options: {
    type: Array,
    default: () => [] // e.g., [{ label: 'Option 1', value: '1' }]
  },
  placeholder: {
    type: String,
    default: 'Please select'
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectRef = ref(null);

const selectedValue = computed(() => props.modelValue);

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(option => option.value === selectedValue.value);
  return selectedOption ? selectedOption.label : '';
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectOption = (option) => {
  emit('update:modelValue', option.value);
  closeDropdown();
};

const handleClickOutside = (event) => {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
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
@import '../assets/css/theme.less';

.custom-select {
  position: relative;
  width: 220px;
  font-size: 14px;
}

.select-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--element-padding-md) var(--element-padding-lg);
  background-color: var(--color-bg-container);
  border: 1px solid var(--color-border);
  border-radius: var(--element-border-radius);
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:hover {
    border-color: var(--color-border-hover);
  }

  &.is-open {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px fade(var(--color-primary), 20%);
  }
}

.selected-value {
  color: var(--color-text);
}

.placeholder {
  color: var(--color-text-soft);
}

.arrow-icon {
  width: 12px;
  height: 12px;
  fill: var(--color-text-soft);
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
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--element-border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;

  ul {
    list-style: none;
    padding: var(--element-padding-sm);
    margin: 0;
  }
}

.option-item {
  padding: var(--element-padding-md) var(--element-padding-lg);
  color: var(--color-text);
  cursor: pointer;
  border-radius: var(--element-border-radius);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-bg-layout);
  }

  &.is-selected {
    background-color: fade(var(--color-primary), 10%);
    color: var(--color-primary);
    font-weight: 600;
  }
}

/* Transition for dropdown */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
