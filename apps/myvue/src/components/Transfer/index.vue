<template>
  <div class="transfer-wrapper" :class="{ 'is-disabled': disabled }">
    <!-- Source Panel -->
    <TransferPanel
      :title="titles[0] || '源列表'"
      :options="sourceOptions"
      :checked-keys="sourceChecked"
      @update:checked-keys="sourceChecked = $event"
    />

    <!-- Controls -->
    <div class="transfer-controls">
      <Button
        type="primary"
        class="control-btn"
        :disabled="sourceChecked.length === 0"
        @click="moveToTarget"
      >
        &gt;
      </Button>
      <Button
        type="primary"
        class="control-btn"
        :disabled="targetChecked.length === 0"
        @click="moveToSource"
      >
        &lt;
      </Button>
    </div>

    <!-- Target Panel -->
    <TransferPanel
      :title="titles[1] || '目标列表'"
      :options="targetOptions"
      :checked-keys="targetChecked"
      @update:checked-keys="targetChecked = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TransferPanel from './TransferPanel.vue';
import Button from '@/components/Button/index.vue';
import type { TransferOption } from './types';

const model = defineModel<any[]>({ default: [] });

const props = withDefaults(defineProps<{
  data: TransferOption[];
  titles?: [string, string];
  disabled?: boolean;
}>(), {
  titles: () => ['源列表', '目标列表'],
  disabled: false,
});

const sourceChecked = ref<any[]>([]);
const targetChecked = ref<any[]>([]);

const sourceOptions = computed(() => {
  return props.data.filter(item => !model.value.includes(item.key));
});

const targetOptions = computed(() => {
  return props.data.filter(item => model.value.includes(item.key));
});

const moveToTarget = () => {
  model.value = [...model.value, ...sourceChecked.value];
  sourceChecked.value = [];
};

const moveToSource = () => {
  model.value = model.value.filter(key => !targetChecked.value.includes(key));
  targetChecked.value = [];
};

</script>

<style lang="less" scoped>
.transfer-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  &.is-disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

.transfer-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-btn {
  padding: 0.5rem;
  min-width: auto; // Override button default min-width
}
</style>
