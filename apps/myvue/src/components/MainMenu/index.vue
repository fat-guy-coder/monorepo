<template>
  <Menu
    mode="inline"
    :selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    :items="menus"
    :inlineIndent="15"
    :inline-collapsed="collapsed"
    selectable
  >
  </Menu>
</template>

<script lang="ts" setup>
import { defineProps, defineModel } from 'vue'
import { Menu, type ItemType } from 'ant-design-vue'

const openKeys = defineModel<string[]>({
  type: Array,
})

const props = defineProps({
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
