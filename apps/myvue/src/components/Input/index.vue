<template>
  <label
    class="search-input"
    :class="{
      'is-disabled': disabled,
      'is-focused': isFocused,
    }"
  >
    <span v-if="$slots.prefix || showDefaultPrefix" class="search-input__prefix">
      <slot name="prefix">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M15.5 15.5L20 20M11 17a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </slot>
    </span>

    <input
      ref="inputRef"
      class="search-input__control"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @input="handleInput"
      @keyup.enter="triggerSearch"
    />

    <button
      v-if="allowClear && modelValue"
      type="button"
      class="search-input__clear"
      :disabled="disabled"
      @click="handleClear"
    >
      <span aria-hidden="true">×</span>
    </button>

    <button
      type="button"
      class="search-input__action"
      :disabled="disabled || loading"
      @click="triggerSearch"
    >
      <span v-if="!loading">{{ searchText }}</span>
      <span v-else class="search-input__spinner"></span>
    </button>
  </label>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'

defineOptions({
  name: 'SearchInput',
})

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    allowClear?: boolean
    loading?: boolean
    autofocus?: boolean
    searchText?: string
    maxlength?: number
    showDefaultPrefix?: boolean
  }>(),
  {
    modelValue: '',
    placeholder: '搜索',
    disabled: false,
    allowClear: true,
    loading: false,
    autofocus: false,
    searchText: '搜索',
    maxlength: undefined,
    showDefaultPrefix: true,
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
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
  emit('update:modelValue', target.value)
}

const triggerSearch = () => {
  emit('search', props.modelValue?.trim() ?? '')
}

const handleClear = () => {
  emit('update:modelValue', '')
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
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: stretch;
  border: 1px solid var(--color-border, rgba(0, 0, 0, 0.08));
  border-radius: 999px;
  padding: 0 4px 0 12px;
  background-color: var(--color-bg-container, var(--element-background, var(--color-background)));
  color: var(--color-text, #1f1f1f);
  gap: 4px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.search-input.is-focused {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 25%, transparent);
}

.search-input.is-disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.search-input__prefix {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-soft, rgba(0, 0, 0, 0.45));
}

.search-input__prefix svg {
  width: 18px;
  height: 18px;
}

.search-input__control {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  padding: 0 8px;
}

.search-input__control::placeholder {
  color: var(--color-text-soft, rgba(0, 0, 0, 0.45));
}

.search-input__clear {
  border: none;
  background: transparent;
  color: var(--color-text-soft, rgba(0, 0, 0, 0.45));
  cursor: pointer;
  width: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 1;
}

.search-input__clear:hover {
  color: var(--color-text, #1f1f1f);
}

.search-input__action {
  min-width: 80px;
  border: none;
  border-radius: 999px;
  background-color: var(--color-primary, #1677ff);
  color: var(--color-text-light-solid, #fff);
  font-weight: 600;
  cursor: pointer;
  padding: 0 18px;
  transition:
    opacity 0.2s ease,
    background-color 0.2s ease;
}

.search-input__action:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.search-input__action:not(:disabled):hover {
  background-color: var(--color-secondary, #4096ff);
}

.search-input__spinner {
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-top-color: var(--color-text-light-solid, #fff);
  border-radius: 50%;
  width: 16px;
  height: 16px;
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

