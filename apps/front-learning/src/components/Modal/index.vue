<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="visible" class="modal-overlay" @click="handleClickOverlay">
        <div class="modal-wrapper" role="dialog" aria-modal="true" :aria-labelledby="title ? 'modal-title' : undefined" :style="componentStyle">
          <!-- Header -->
          <div class="modal-header">
            <slot name="header">
              <h2 v-if="title" id="modal-title" class="modal-title">{{ title }}</h2>
            </slot>
            <button v-if="showClose" class="modal-close-btn" @click="handleClose" aria-label="关闭模态框">×</button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div class="modal-footer" :class="[`footer-align--${footerAlign}`]">
            <slot name="footer">
              <Button v-if="showCancel" @click="handleCancel">
                <slot name="cancel">
                  <component :is="cancelTextVNode" v-if="isVNode(cancelText)" />
                  <span v-else>{{ cancelText || '取消' }}</span>
                </slot>
              </Button>
              <Button v-if="showConfirm" type="primary" @click="handleConfirm" :loading="loading">
                <slot name="confirm">
                  <component :is="confirmTextVNode" v-if="isVNode(confirmText)" />
                  <span v-else>{{ confirmText || '确认' }}</span>
                </slot>
              </Button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, isVNode, type VNode, computed, type CSSProperties } from 'vue';
import Button from '@/components/Button/index.vue';

const visible = defineModel<boolean>('visible', { default: false });

const {
  title = '',
  confirmText,
  cancelText,
  showConfirm = true,
  showCancel = true,
  showClose = true,
  closeOnEsc = true,
  closeOnClickOverlay = true,
  loading = false,
  footerAlign = 'right',
  css = {},
} = defineProps<{
  title?: string;
  confirmText?: string | VNode;
  cancelText?: string | VNode;
  showConfirm?: boolean;
  showCancel?: boolean;
  showClose?: boolean;
  closeOnEsc?: boolean;
  closeOnClickOverlay?: boolean;
  loading?: boolean;
  footerAlign?: 'left' | 'center' | 'right';
  css?: Record<string, string>;
}>();

const emit = defineEmits<{ 
  (e: 'confirm'): void;
  (e: 'cancel'): void;
  (e: 'close'): void;
}>();

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});

// --- Computed props for VNode buttons ---
const confirmTextVNode = computed(() => confirmText as VNode);
const cancelTextVNode = computed(() => cancelText as VNode);

// --- Event Handlers ---
const handleConfirm = () => {
  if (loading) return;
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
  handleClose();
};

const handleClose = () => {
  visible.value = false;
  emit('close');
};

const handleClickOverlay = (event: MouseEvent) => {
  if (closeOnClickOverlay && event.target === event.currentTarget) {
    handleClose();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && closeOnEsc) {
    handleClose();
  }
};

// --- Lifecycle and Watchers ---
watch(visible, (isVisible) => {
  if (isVisible) {
    window.addEventListener('keydown', handleKeydown);
  } else {
    window.removeEventListener('keydown', handleKeydown);
  }
});

</script>

<style lang="less" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-wrapper {
  --modal-bg: var(--color-background);
  --modal-shadow: var(--box-shadow-lg);
  --modal-radius: var(--border-radius-lg);
  --modal-header-padding:  var(--padding-xl);
  --modal-body-padding: var(--padding-xl);
  --modal-footer-padding: var(--padding-lg) var(--padding-xl);
  --modal-title-color: var(--color-heading);
  --modal-border-color: var(--color-border);

  width: 90%;
  max-width: 520px;
  background: var(--modal-bg);
  border-radius: var(--modal-radius);
  box-shadow: var(--modal-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--modal-header-padding);
  border-bottom: 1px solid var(--modal-border-color);
  flex-shrink: 0;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--modal-title-color);
  margin: 0;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 1.75rem;
  line-height: 1;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  margin: -0.5rem; // Enlarge clickable area
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-text);
  }
}

.modal-body {
  padding: var(--modal-body-padding);
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  display: flex;
  gap: 0.75rem;
  padding: var(--modal-footer-padding);
  border-top: 1px solid var(--modal-border-color);
  flex-shrink: 0;

  &.footer-align--left {
    justify-content: flex-start;
  }
  &.footer-align--center {
    justify-content: center;
  }
  &.footer-align--right {
    justify-content: flex-end;
  }
}

/* Transition */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-wrapper, .modal-fade-leave-active .modal-wrapper {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .modal-wrapper, .modal-fade-leave-to .modal-wrapper {
  transform: scale(0.95) translateY(20px);
}

</style>