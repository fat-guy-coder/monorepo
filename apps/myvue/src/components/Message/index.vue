<template>
  <Transition name="message" @after-leave="onDestroy">
    <div v-show="visible" class="message-notice" :style="customStyle">
      <div :class="['message-notice-content', `message--${type}`]">
        <span class="icon">
          <!-- Icons can be replaced with SVGs for better quality -->
          <span v-if="type === 'info'">ℹ️</span>
          <span v-if="type === 'success'">✅</span>
          <span v-if="type === 'warning'">⚠️</span>
          <span v-if="type === 'error'">❌</span>
        </span>
        <span>{{ content }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineExpose } from 'vue';

defineOptions({
  name: 'Message',
});

const { id, type = 'info', content = '', duration = 3, top, onClose, onDestroy } = defineProps<{
  id: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  content?: string;
  duration?: number; // Duration in seconds
  top: number;
  onClose?: () => void;
  onDestroy: () => void;
}>();

const visible = ref(false);
let timer: number | undefined;

const customStyle = computed(() => ({
      top: `${top}px`,
}));

const close = () => {
  visible.value = false;
};

const startTimer = () => {
  if (duration > 0) {
    timer = window.setTimeout(() => {
      close();
    }, duration * 1000);
  }
};

onMounted(() => {
  visible.value = true;
  startTimer();
});

// Expose the close method to be called from the service
defineExpose({
  close,
});
</script>

<style lang="less">
/* Global container for all messages */
.message-container {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  z-index: 9999;
  pointer-events: none;
}
</style>

<style lang="less" scoped>
.message-move,
.message-enter-active,
.message-leave-active {
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.message-notice-content {
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  background: var(--color-bg-elevated);
  border-radius: var(--element-border-radius);
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  pointer-events: all;
  color: var(--color-text);
}

.icon {
  margin-right: 8px;
  font-size: 16px;
  line-height: 1;
}

.message-notice-content.success .icon {
  color: var(--color-success);
}

.message-notice-content.error .icon {
  color: var(--color-error);
}

.message-notice-content.warning .icon {
  color: var(--color-warning);
}

.message-notice-content.info .icon {
  color: var(--color-info);
}
</style>

