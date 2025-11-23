<template>
  <Menu
    mode="inline"
    :selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    :items="menus"
    :inlineIndent="5"
    :inline-collapsed="collapsed"
    selectable
  >
  </Menu>
</template>

<script lang="ts" setup>
import { defineProps, defineModel, nextTick } from 'vue'
import { Menu } from 'ant-design-vue'

const openKeys = defineModel<string[]>({
  type: Array,
})

const emit = defineEmits(['domUpdated'])

nextTick(() => {
  emit('domUpdated')
})

defineProps({
  selectedKeys: {
    type: Array<string>,
  },
  menus: {
    type: Array<any>,
  },
  collapsed: {
    type: Boolean,
  },
})
</script>

<style scoped>
.expand-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
