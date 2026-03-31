
import { defineEmits } from 'vue'


export const usePushByName = (value: string) => {
  if (!value) return
  const emit = defineEmits(['goToByRouteName'])
  emit('goToByRouteName', value)
  return {
    emit
  }
}
