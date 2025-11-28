<template>
  <div class="tab-pane" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type VNode, type ComputedRef } from 'vue';

defineOptions({
  name: 'ATabPane',
});

const props = defineProps<{
  key: string;
  disabled?: boolean;
}>();

// Inject the active key from the parent Tabs component
const activeKey = inject<ComputedRef<string>>('activeKey');

// Determine if this pane is the active one
const isActive = computed(() => activeKey?.value === props.key);
</script>
