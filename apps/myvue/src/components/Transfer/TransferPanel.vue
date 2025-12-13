<template>
  <div class="transfer-panel">
    <div class="panel-header">
      <Checkbox 
        :model-value="allChecked"
        :indeterminate="isIndeterminate"
        @update:model-value="handleAllCheck"
      >
        {{ title }} ({{ checkedKeys.length }}/{{ filteredOptions.length }})
      </Checkbox>
    </div>
    <div class="panel-body">
      <div class="search-bar">
        <input type="text" v-model="filterText" placeholder="搜索..." class="search-input" />
      </div>
      <ul class="option-list">
        <li v-for="option in filteredOptions" :key="option.key">
          <Checkbox 
            :model-value="isChecked(option.key)"
            :disabled="option.disabled"
            @update:model-value="handleCheck(option.key, $event)"
          >
            {{ option.label }}
          </Checkbox>
        </li>
         <li v-if="filteredOptions.length === 0" class="no-data">
          无数据
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Checkbox from '@/components/Checkbox/index.vue';
import type { TransferOption } from './types';

const props = defineProps<{
  title: string;
  options: TransferOption[];
  checkedKeys: any[];
}>();

const emit = defineEmits<{ (e: 'update:checkedKeys', keys: any[]): void }>();

const filterText = ref('');

const filteredOptions = computed(() => {
  if (!filterText.value) {
    return props.options;
  }
  return props.options.filter(option => 
    option.label.toLowerCase().includes(filterText.value.toLowerCase())
  );
});

const isChecked = (key: any) => {
  return props.checkedKeys.includes(key);
};

const handleCheck = (key: any, checked: boolean) => {
  const newCheckedKeys = [...props.checkedKeys];
  if (checked) {
    if (!newCheckedKeys.includes(key)) {
      newCheckedKeys.push(key);
    }
  } else {
    const index = newCheckedKeys.indexOf(key);
    if (index > -1) {
      newCheckedKeys.splice(index, 1);
    }
  }
  emit('update:checkedKeys', newCheckedKeys);
};

const allChecked = computed(() => {
  const availableOptions = filteredOptions.value.filter(o => !o.disabled);
  return availableOptions.length > 0 && availableOptions.every(o => props.checkedKeys.includes(o.key));
});

const isIndeterminate = computed(() => {
  const checkedCount = filteredOptions.value.filter(o => props.checkedKeys.includes(o.key)).length;
  return checkedCount > 0 && checkedCount < filteredOptions.value.length;
});

const handleAllCheck = (checked: boolean) => {
  const availableKeys = filteredOptions.value.filter(o => !o.disabled).map(o => o.key);
  if (checked) {
    const newKeys = [...new Set([...props.checkedKeys, ...availableKeys])];
    emit('update:checkedKeys', newKeys);
  } else {
    const newKeys = props.checkedKeys.filter(key => !availableKeys.includes(key));
    emit('update:checkedKeys', newKeys);
  }
};

</script>

<style lang="less" scoped>
.transfer-panel {
  width: 12.5rem; // 200px
  height: 20rem; // 320px
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
}

.panel-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-bar {
  padding: 0.5rem;
  border-bottom: 1px solid var(--color-border-secondary);
}

.search-input {
  width: 100%;
  padding: 0.375rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--color-primary);
  }
}

.option-list {
  flex: 1;
  list-style: none;
  padding: 0.5rem;
  margin: 0;
  overflow-y: auto;

  li {
    padding: 0.25rem 0;
  }
}

.no-data {
  text-align: center;
  color: var(--color-text-tertiary);
  padding: 2rem 0;
}
</style>
