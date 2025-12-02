<template>
  <button :class="classes" :disabled="disabled || loading">
    <span v-if="loading" class="btn-loading-icon"></span>
    <span v-if="$slots.icon" class="btn-icon">
      <slot name="icon"></slot>
    </span>
    <span class="btn-content">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'AButton',
});

const props =
  defineProps<{
    type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
    size?: 'large' | 'middle' | 'small';
    danger?: boolean;
    loading?: boolean;
    disabled?: boolean;
    shape?: 'default' | 'circle' | 'round';
  }>()

const classes = computed(() => [
  'btn',
  `btn--${props.type}`,
  `btn--${props.size}`,
  {
    'is-danger': props.danger,
    'is-loading': props.loading,
    'is-disabled': props.disabled || props.loading,
    'is-circle': props.shape === 'circle',
    'is-round': props.shape === 'round',
  },
]);
</script>

<style lang="less" scoped>
.btn {
  --btn-height-large: 40px;
  --btn-height-middle: 32px;
  --btn-height-small: 24px;
  --btn-font-size-large: 16px;
  --btn-font-size-middle: 14px;
  --btn-font-size-small: 14px;
  --btn-padding-horizontal-large: 15px;
  --btn-padding-horizontal-middle: 15px;
  --btn-padding-horizontal-small: 7px;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  line-height: 1.5715;
  border-radius: var(--element-border-radius);

  // Disabled State
  &.is-disabled,
  &[disabled] {
    cursor: not-allowed;
    & > * {
      pointer-events: none;
    }
  }
}

/*
* Type Styles
*/

// Default
.btn--default {
  background-color: var(--color-bg-container);
  border-color: var(--color-border);
  color: var(--color-text);

  &:not(.is-disabled):hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }

  &.is-danger {
    color: var(--color-error);
    border-color: var(--color-error);

    &:not(.is-disabled):hover {
      color: color-mix(in srgb, var(--color-error) 85%, white);
      border-color: color-mix(in srgb, var(--color-error) 85%, white);
    }
  }
}

// Primary
.btn--primary {
  color: var(--color-text-light-solid);
  background-color: var(--color-primary);

  &:not(.is-disabled):hover {
    background-color: var(--color-link-hover);
  }

  &.is-danger {
    background-color: var(--color-error);

    &:not(.is-disabled):hover {
      background-color: color-mix(in srgb, var(--color-error) 85%, black);
    }
  }
  }

// Dashed
.btn--dashed {
  background-color: var(--color-bg-container);
  border-color: var(--color-border);
  border-style: dashed;
  color: var(--color-text);

  &:not(.is-disabled):hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }

  &.is-danger {
    color: var(--color-error);
    border-color: var(--color-error);

    &:not(.is-disabled):hover {
      color: color-mix(in srgb, var(--color-error) 85%, white);
      border-color: color-mix(in srgb, var(--color-error) 85%, white);
    }
  }
}

// Text
.btn--text {
  background-color: transparent;
  border-color: transparent;
  color: var(--color-text);

  &:not(.is-disabled):hover {
    background-color: var(--color-fill-secondary);
  }

  &.is-danger {
    color: var(--color-error);

    &:not(.is-disabled):hover {
      background-color: color-mix(in srgb, var(--color-error) 15%, transparent);
    }
  }
}

// Link
.btn--link {
  background-color: transparent;
  border-color: transparent;
  color: var(--color-link);

  &:not(.is-disabled):hover {
    color: var(--color-link-hover);
  }

  &.is-danger {
    color: var(--color-error);

    &:not(.is-disabled):hover {
      color: color-mix(in srgb, var(--color-error) 85%, white);
    }
  }
}

/*
* Size Styles
*/
.btn--large {
  height: var(--btn-height-large);
  padding: 0 var(--btn-padding-horizontal-large);
  font-size: var(--btn-font-size-large);
  }

.btn--middle {
  height: var(--btn-height-middle);
  padding: 0 var(--btn-padding-horizontal-middle);
  font-size: var(--btn-font-size-middle);
}

.btn--small {
  height: var(--btn-height-small);
  padding: 0 var(--btn-padding-horizontal-small);
  font-size: var(--btn-font-size-small);
  }

/*
* Shape Styles
*/
.btn.is-circle {
  border-radius: 50%;
  padding: 0; // Reset padding

  &.btn--large {
    width: var(--btn-height-large);
  }
  &.btn--middle {
    width: var(--btn-height-middle);
  }
  &.btn--small {
    width: var(--btn-height-small);
  }
}

.btn.is-round {
  &.btn--large {
    border-radius: var(--btn-height-large);
  }
  &.btn--middle {
    border-radius: var(--btn-height-middle);
  }
  &.btn--small {
    border-radius: var(--btn-height-small);
  }
}

/*
* Loading Styles
*/
.btn.is-loading {
  position: relative;
  opacity: 0.65;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: var(--color-bg-container);
    opacity: 0.35;
    z-index: 1;
    border-radius: inherit;
  }

  .btn-content,
  .btn-icon {
    opacity: 0;
  }
}

.btn-loading-icon {
  position: absolute;
  z-index: 2;
  display: inline-block;
  border: 2px solid var(--color-primary);
  border-top-color: transparent;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: btn-spin 0.6s linear infinite;
}

@keyframes btn-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/*
* Icon Styles
*/
.btn-icon {
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
}

.btn.is-circle .btn-icon {
  margin-right: 0;
}
</style>
