<template>
  <Modal
    v-model:visible="visible"
    :title="title"
    :show-confirm="true"
    :show-cancel="true"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    :confirm-type="confirmType"
    @confirm="handleConfirm"
    @cancel="handleCancel"
    @close="handleCancel"
  >
    <div class="confirm-content">
      <span v-if="icon" class="confirm-icon">{{ icon }}</span>
      <span class="confirm-message">{{ message }}</span>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from 'components/Modal/index.vue'

export interface ConfirmOptions {
  title?: string
  message: string
  icon?: string
  confirmText?: string
  cancelText?: string
  confirmType?: 'default' | 'primary' | 'danger'
  onConfirm?: () => void
  onCancel?: () => void
}

const props = withDefaults(defineProps<ConfirmOptions & { visible?: boolean }>(), {
  title: '确认',
  confirmText: '确定',
  cancelText: '取消',
  confirmType: 'default',
  visible: false,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const visible = ref(props.visible)

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.confirm-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.confirm-icon {
  font-size: 20px;
}

.confirm-message {
  font-size: 14px;
  color: var(--color-text);
}
</style>
