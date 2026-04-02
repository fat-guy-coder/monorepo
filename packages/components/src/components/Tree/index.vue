<template>
  <div class="tree-container">
    <TreeItem
      v-for="treeNode in data"
      :key="treeNode.id"
      :node="treeNode"
      :level="0"
      :expandedKeys="expandedKeys"
      @click="handleNodeClick"
      @toggle="handleNodeToggle"
    >
      <template #node="{ node: treeNode, expanded }">
        <slot name="node" :node="treeNode" :expanded="expanded" />
      </template>
    </TreeItem>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import TreeItem from './TreeItem.vue'
import type { TreeNode, TreeNodeClick, TreeNodeExpand, TreeNodeCollapse } from './index'

const props = withDefaults(defineProps<{
  data: TreeNode[]
  defaultExpandedKeys?: (string | number)[]
}>(), {
  defaultExpandedKeys: () => []
})

const emit = defineEmits<{
  'node-click': [node: TreeNode]
  'node-expand': [node: TreeNode]
  'node-collapse': [node: TreeNode]
}>()

const expandedKeys = ref<(string | number)[]>([...props.defaultExpandedKeys])

// Watch for prop changes
watch(() => props.defaultExpandedKeys, (newKeys) => {
  expandedKeys.value = [...newKeys]
})

const handleNodeClick = (node: TreeNode) => {
  emit('node-click', node)
}

const handleNodeToggle = (node: TreeNode, expanded: boolean) => {
  if (expanded) {
    if (!expandedKeys.value.includes(node.id)) {
      expandedKeys.value.push(node.id)
    }
    emit('node-expand', node)
  } else {
    expandedKeys.value = expandedKeys.value.filter(key => key !== node.id)
    emit('node-collapse', node)
  }
}

// Expose methods
const expand = (keys: (string | number)[]) => {
  expandedKeys.value = [...keys]
}

const collapse = (keys: (string | number)[]) => {
  expandedKeys.value = expandedKeys.value.filter(key => !keys.includes(key))
}

const expandAll = () => {
  const getAllIds = (nodes: TreeNode[]): (string | number)[] => {
    const ids: (string | number)[] = []
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        ids.push(node.id)
        ids.push(...getAllIds(node.children))
      }
    }
    return ids
  }
  expandedKeys.value = getAllIds(props.data)
}

const collapseAll = () => {
  expandedKeys.value = []
}

defineExpose({
  expand,
  collapse,
  expandAll,
  collapseAll,
  expandedKeys
})
</script>

<style scoped>
.tree-container {
  padding: 8px 0;
}
</style>
