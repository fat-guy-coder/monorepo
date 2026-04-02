<template>
  <button
    class="ui-btn"
    :class="[typeClass, sizeClass, { 'is-plain': plain, 'is-text': text, 'is-round': round, 'is-circle': circle, 'is-disabled': isDisabled }]"
    :disabled="isDisabled"
  >
    <span v-if="loading" class="ui-btn-spinner"></span>
    <span :class="{ 'is-hidden': loading }">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'UIButton' })

const props = withDefaults(defineProps<{
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  plain?: boolean
  text?: boolean
  round?: boolean
  circle?: boolean
  loading?: boolean
  disabled?: boolean
}>(), {
  type: 'default',
  size: 'md',
  plain: false,
  text: false,
  round: false,
  circle: false,
  loading: false,
  disabled: false,
})

const isDisabled = computed(() => props.disabled || props.loading)

const typeClass = computed(() => `ui-btn--${props.type}`)
const sizeClass = computed(() => `ui-btn--${props.size}`)
</script>

<style scoped>
.ui-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  font-weight: 500;
  border-radius: var(--radius, 4px);
  transition: all var(--transition, 0.3s);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  position: relative;
  border: 1px solid transparent;
}

.ui-btn:focus {
  outline: none;
}

.ui-btn:focus-visible {
  outline: 2px solid var(--color-primary, #003d99);
  outline-offset: 2px;
}

/* Types */
.ui-btn--default {
  background-color: var(--color-background, #ffffff);
  color: var(--color-text, #303133);
  border-color: var(--color-border, #dcdfe6);
}
.ui-btn--default:hover:not(:disabled) {
  border-color: var(--color-primary, #003d99);
  color: var(--color-primary, #003d99);
}
.ui-btn--default:active:not(:disabled) {
  background-color: var(--color-primary, #003d99);
  border-color: var(--color-primary, #003d99);
  color: #ffffff;
}

.ui-btn--primary {
  background-color: var(--color-primary, #003d99);
  color: #ffffff;
  border-color: var(--color-primary, #003d99);
}
.ui-btn--primary:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--color-primary, #003d99) 85%, black);
  border-color: color-mix(in srgb, var(--color-primary, #003d99) 85%, black);
}
.ui-btn--primary:active:not(:disabled) {
  background-color: color-mix(in srgb, var(--color-primary, #003d99) 70%, black);
  border-color: color-mix(in srgb, var(--color-primary, #003d99) 70%, black);
}

.ui-btn--success {
  background-color: var(--color-success, #28a745);
  color: #ffffff;
  border-color: var(--color-success, #28a745);
}
.ui-btn--success:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--color-success, #28a745) 85%, black);
  border-color: color-mix(in srgb, var(--color-success, #28a745) 85%, black);
}
.ui-btn--success:active:not(:disabled) {
  background-color: color-mix(in srgb, var(--color-success, #28a745) 70%, black);
  border-color: color-mix(in srgb, var(--color-success, #28a745) 70%, black);
}

.ui-btn--warning {
  background-color: var(--color-warning, #ffc107);
  color: #ffffff;
  border-color: var(--color-warning, #ffc107);
}
.ui-btn--warning:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--color-warning, #ffc107) 85%, black);
  border-color: color-mix(in srgb, var(--color-warning, #ffc107) 85%, black);
}
.ui-btn--warning:active:not(:disabled) {
  background-color: color-mix(in srgb, var(--color-warning, #ffc107) 70%, black);
  border-color: color-mix(in srgb, var(--color-warning, #ffc107) 70%, black);
}

.ui-btn--danger {
  background-color: var(--color-error, #dc3545);
  color: #ffffff;
  border-color: var(--color-error, #dc3545);
}
.ui-btn--danger:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--color-error, #dc3545) 85%, black);
  border-color: color-mix(in srgb, var(--color-error, #dc3545) 85%, black);
}
.ui-btn--danger:active:not(:disabled) {
  background-color: color-mix(in srgb, var(--color-error, #dc3545) 70%, black);
  border-color: color-mix(in srgb, var(--color-error, #dc3545) 70%, black);
}

.ui-btn--info {
  background-color: var(--color-info, #007bff);
  color: #ffffff;
  border-color: var(--color-info, #007bff);
}
.ui-btn--info:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--color-info, #007bff) 85%, black);
  border-color: color-mix(in srgb, var(--color-info, #007bff) 85%, black);
}
.ui-btn--info:active:not(:disabled) {
  background-color: color-mix(in srgb, var(--color-info, #007bff) 70%, black);
  border-color: color-mix(in srgb, var(--color-info, #007bff) 70%, black);
}

/* Sizes */
.ui-btn--sm {
  padding: 0.375rem 0.75rem;
  font-size: var(--font-size-sm, 0.875rem);
}
.ui-btn--md {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-base, 0.9375rem);
}
.ui-btn--lg {
  padding: 0.75rem 1.5rem;
  font-size: var(--font-size-lg, 1.125rem);
}

/* Plain variant */
.is-plain.ui-btn--default {
  background-color: color-mix(in srgb, var(--color-primary, #003d99) 10%, transparent);
  border-color: color-mix(in srgb, var(--color-primary, #003d99) 30%, transparent);
  color: var(--color-primary, #003d99);
}
.is-plain.ui-btn--default:hover:not(:disabled) {
  background-color: var(--color-primary, #003d99);
  border-color: var(--color-primary, #003d99);
  color: #ffffff;
}

/* Text variant */
.is-text {
  background-color: transparent;
  border-color: transparent;
}
.is-text:hover:not(:disabled) {
  background-color: var(--color-background, #ffffff);
}
.is-text.ui-btn--primary {
  color: var(--color-primary, #003d99);
}
.is-text.ui-btn--primary:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--color-primary, #003d99) 10%, transparent);
}

/* Round */
.is-round {
  border-radius: 9999px;
}

/* Circle */
.is-circle {
  border-radius: 50%;
  padding: 0.5rem;
}
.is-circle.ui-btn--sm {
  padding: 0.375rem;
}
.is-circle.ui-btn--lg {
  padding: 0.75rem;
}

/* Disabled */
.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Spinner */
.ui-btn-spinner {
  position: absolute;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: btn-spin 0.9s linear infinite;
}

.is-hidden {
  visibility: hidden;
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}
</style>
