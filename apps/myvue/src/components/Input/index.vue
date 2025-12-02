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

    <input ref="inputRef" class="search-input__control" type="search" :value="value || ''" :placeholder="placeholder || '搜索'"
      :disabled="disabled" :maxlength="maxlength" @focus="setFocus(true)" @blur="setFocus(false)" @input="handleInput"
      @keyup.enter="triggerSearch" />

    <button v-if="(allowClear ?? true) && value" type="button" class="search-input__clear" :disabled="disabled"
      @click="handleClear">
      ×
    </button>

    <button type="button" class="search-input__action" :disabled="disabled || loading" v-if="showSearchButton" @click="triggerSearch">
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
  value?: string
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
  (event: 'update:value', value: string): void
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
  emit('search', props.value?.trim() ?? '')
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
  --input-height: 32px;
  --input-padding-horizontal: 11px;

  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--input-height);
  padding: 0;
  background-color: var(--color-bg-container);
  border: 1px solid var(--color-border);
  border-radius: var(--element-border-radius);
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: var(--color-primary);
  }

  &.is-focused {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent);
  }

  &.is-disabled {
    background-color: var(--color-fill-tertiary);
    border-color: var(--color-border);
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
  color: var(--color-text-tertiary);
  padding-left: var(--input-padding-horizontal);
}

.search-input__prefix svg {
  width: 14px;
  height: 14px;
}

.search-input__control {
  flex: 1;
  height: 100%;
  padding: 0 var(--input-padding-horizontal);
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-text);
  font-size: 14px;
}

.search-input__control::placeholder {
  color: var(--color-text-quaternary);
}

.search-input__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--color-text-quaternary);
  cursor: pointer;
  font-size: 20px;
  line-height: 100%;
  transition: color 0.2s;

  &:hover {
    color: var(--color-text-secondary);
  }
}

.search-input__action {
  height: calc(var(--input-height) - 2px); /* Match inner height */
  margin-right: -1px; /* Overlap the border */
  border: none;
  border-top-right-radius: var(--element-border-radius);
  border-bottom-right-radius: var(--element-border-radius);
  background-color: var(--color-primary);
  color: var(--color-text-light-solid);
  font-weight: 500;
  cursor: pointer;
  padding: 0 16px;
  transition: background-color 0.2s;

  &:not(:disabled):hover {
    background-color: var(--color-link-hover);
  }

  &:disabled {
    background-color: var(--color-primary);
    opacity: 0.6;
    cursor: not-allowed;
  }
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
