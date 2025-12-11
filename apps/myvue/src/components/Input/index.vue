<template>
  <div class="search-input" :class="{
    'is-disabled': disabled,
    'is-focused': isFocused,
  }">
    <span v-if="$slots.prefix || showDefaultPrefix" class="search-input__prefix">
      <slot name="prefix">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.5 15.5L20 20M11 17a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </slot>
    </span>

    <input ref="inputRef" class="search-input__control" type="search" :value="value || ''"
      :placeholder="placeholder || '搜索'" :disabled="disabled" :maxlength="maxlength" @focus="setFocus(true)"
      @blur="setFocus(false)" @input="handleInput" @keyup.enter="triggerSearch" />

    <button v-if="(allowClear ?? true) && value" type="button" class="search-input__clear" :disabled="disabled"
      @click="handleClear">
      ×
    </button>

    <button type="button" class="search-input__action" :disabled="disabled || loading" v-if="showSearchButton"
      @click="triggerSearch">
      <span v-if="!loading">{{ searchText || '搜索' }}</span>
      <span v-else class="search-input__spinner"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'

defineOptions({
  name: 'SearchInput',
})

const props = defineProps<{
  value?: string | number
  placeholder?: string
  disabled?: boolean
  allowClear?: boolean
  loading?: boolean
  autofocus?: boolean
  searchText?: string
  maxlength?: number
  showDefaultPrefix?: boolean
  showSearchButton?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:value', value: string | number): void
  (event: 'search', value: string): void
  (event: 'focus'): void
  (event: 'blur'): void
}>()

const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)

const setFocus = (value: boolean) => {
  isFocused.value = value
  if (value) {
    emit('focus')
  } else {
    emit('blur')
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:value', target.value)
}

const triggerSearch = () => {
  emit('search', props.value?.toString().trim() ?? '')
}

const handleClear = () => {
  emit('update:value', '')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

watch(
  () => props.autofocus,
  (value) => {
    if (value) {
      nextTick(() => inputRef.value?.focus())
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (props.autofocus) {
    inputRef.value?.focus()
  }
})
</script>

<style scoped lang="less">
.search-input {
  // --- 自有 CSS 变量定义 ---
  --input-height: 2rem; // 32px
  --input-padding-horizontal: 0.6875rem; // 11px
  --input-bg: var(--color-bg-container);
  --input-border-color: var(--color-border);
  --input-border-radius: var(--element-border-radius);
  --input-border-color-hover: var(--color-primary);
  --input-border-color-focus: var(--color-primary);
  --input-focus-shadow: var(--box-shadow-hover); // 2px
  --input-bg-disabled: var(--color-fill-tertiary);
  --input-prefix-color: var(--color-text-tertiary);
  --input-text-color: var(--color-text);
  --input-placeholder-color: var(--color-text-quaternary);
  --input-clear-color: var(--color-text-quaternary);
  --input-clear-color-hover: var(--color-text-secondary);
  --input-button-bg: var(--color-primary);
  --input-button-text-color: var(--color-text-light-solid);
  --input-button-bg-hover: var(--color-link-hover);
  --input-spinner-track-color: rgba(255, 255, 255, 0.5);
  --input-spinner-color: var(--color-text-light-solid, #fff);

  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--input-height);
  padding: 0;
  background-color: var(--input-bg);
  border: 0.0625rem solid var(--input-border-color); // 1px
  border-radius: var(--input-border-radius);
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: var(--input-border-color-hover);
  }

  &.is-focused {
    border-color: var(--input-border-color-focus);
    box-shadow: var(--input-focus-shadow);
  }

  &.is-disabled {
    background-color: var(--input-bg-disabled);
    border-color: var(--input-border-color);
    cursor: not-allowed;

    .search-input__control,
    .search-input__prefix,
    .search-input__clear,
    .search-input__action {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}

.search-input__prefix {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--input-prefix-color);
  padding-left: var(--input-padding-horizontal);
}

.search-input__prefix svg {
  width: 0.875rem; // 14px
  height: 0.875rem; // 14px
}

.search-input__control {
  flex: 1;
  height: 100%;
  padding: 0 var(--input-padding-horizontal);
  border: none;
  outline: none;
  background: transparent;
  color: var(--input-text-color);
  font-size: 0.875rem; // 14px
}

.search-input__control::placeholder {
  color: var(--input-placeholder-color);
}

.search-input__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem; // 32px
  height: 100%;
  border: none;
  background: transparent;
  color: var(--input-clear-color);
  cursor: pointer;
  font-size: 1.25rem; // 20px
  line-height: 100%;
  transition: color 0.2s;

  &:hover {
    color: var(--input-clear-color-hover);
  }
}

.search-input__action {
  height: calc(var(--input-height) - 0.125rem); // 2px
  margin-right: -0.0625rem; // -1px
  border: none;
  border-top-right-radius: var(--input-border-radius);
  border-bottom-right-radius: var(--input-border-radius);
  background-color: var(--input-button-bg);
  color: var(--input-button-text-color);
  font-weight: 500;
  cursor: pointer;
  padding: 0 1rem; // 16px
  transition: background-color 0.2s;

  &:not(:disabled):hover {
    background-color: var(--input-button-bg-hover);
  }

  &:disabled {
    background-color: var(--input-button-bg);
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.search-input__spinner {
  border: 0.125rem solid var(--input-spinner-track-color); // 2px
  border-top-color: var(--input-spinner-color);
  border-radius: 50%;
  width: 1rem; // 16px
  height: 1rem; // 16px
  display: inline-block;
  animation: search-spin 0.8s linear infinite;
}

@keyframes search-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>