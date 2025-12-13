<template>
  <div class="time-picker-panel">
    <div class="time-picker-panel__body">
      <TimeColumn :options="hourOptions" :value="selectedHour" @select="handleSelect('hour', $event)" />
      <TimeColumn :options="minuteOptions" :value="selectedMinute" @select="handleSelect('minute', $event)" />
      <TimeColumn :options="secondOptions" :value="selectedSecond" @select="handleSelect('second', $event)" />
    </div>
    <div class="time-picker-panel__footer">
      <button class="btn-text" @click="selectNow">此刻</button>
      <Button type="primary" size="small" @click="handleConfirm">确定</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import TimeColumn from './TimeColumn.vue';
import Button from '@/components/Button/index.vue';

const props = defineProps<{
  value?: string; // Expects HH:mm:ss format
}>();

const emit = defineEmits<{ 
  (e: 'select', time: string): void;
}>();

const now = new Date();
const [initialHour, initialMinute, initialSecond] = (props.value || `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
  .split(':')
  .map(Number);

const selectedHour = ref(initialHour);
const selectedMinute = ref(initialMinute);
const selectedSecond = ref(initialSecond);

const generateOptions = (max: number) => {
  return Array.from({ length: max }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, '0'),
    disabled: false, // Disability logic can be added later if needed
  }));
};

const hourOptions = computed(() => generateOptions(24));
const minuteOptions = computed(() => generateOptions(60));
const secondOptions = computed(() => generateOptions(60));

const handleSelect = (type: 'hour' | 'minute' | 'second', value: number) => {
  if (type === 'hour') selectedHour.value = value;
  if (type === 'minute') selectedMinute.value = value;
  if (type === 'second') selectedSecond.value = value;
};

const selectNow = () => {
  const now = new Date();
  selectedHour.value = now.getHours();
  selectedMinute.value = now.getMinutes();
  selectedSecond.value = now.getSeconds();
};

const handleConfirm = () => {
  const format = (n: number) => n.toString().padStart(2, '0');
  const timeString = `${format(selectedHour.value)}:${format(selectedMinute.value)}:${format(selectedSecond.value)}`;
  emit('select', timeString);
};

watch(() => props.value, (newVal) => {
  if (newVal) {
    const [h, m, s] = newVal.split(':').map(Number);
    selectedHour.value = h;
    selectedMinute.value = m;
    selectedSecond.value = s;
  }
});

</script>

<style lang="less" scoped>
.time-picker-panel {
  display: inline-flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background: var(--color-background);
  box-shadow: var(--box-shadow-md);
}

.time-picker-panel__body {
  display: flex;
  padding: 0.5rem;
}

.time-picker-panel__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-top: 1px solid var(--color-border);
}

.btn-text {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.25rem;

  &:hover {
    color: color-mix(in srgb, var(--color-primary) 85%, black);
  }
}
</style>
