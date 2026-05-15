<template>
  <div class="tree-select">
    <Tree
      ref="treeRef"
      :data="data"
      :default-expanded-keys="defaultExpandedKeys"
      @node-click="handleNodeClick"
      @node-expand="handleNodeExpand"
      @node-collapse="handleNodeCollapse"
    >
      <template #node="{ node, expanded }">
        <div class="tree-node-wrapper">
          <span v-if="node.loading" class="loading-indicator">加载中...</span>
          <span class="tree-node-label">{{ node.label }}</span>
          <Checkbox
            :model-value="isSelected(node)"
            @change="() => toggleNode(node)"
          />
        </div>
      </template>
    </Tree>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Tree from '../Tree/index.vue'
import Checkbox from '../Checkbox/index.vue'
import type { TreeNode } from '../Tree'

interface Props {
  data?: TreeNode[]
  modelValue?: (string | number)[]
  defaultExpandedKeys?: (string | number)[]
  loadChildren?: (node: TreeNode) => Promise<TreeNode[]>
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  modelValue: () => [],
  defaultExpandedKeys: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
  'change': [value: (string | number)[]]
}>()

const treeRef = ref<InstanceType<typeof Tree> | null>(null)

const isSelected = (node: TreeNode) => {
  return props.modelValue.includes(node.id)
}

const toggleNode = (node: TreeNode) => {
  const id = node.id
  const newValue = isSelected(node)
    ? props.modelValue.filter(v => v !== id)
    : [...props.modelValue, id]
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// 点击节点：切换展开（Tree 内部处理），我们处理懒加载
const handleNodeClick = (node: TreeNode) => {
  // 仅当节点未展开时，手动触发展开（用于点击 label 而非箭头的情况）
  if (props.loadChildren && (!node.children || node.children.length === 0)) {
    loadNodeChildren(node)
    // 展开当前节点
    if (treeRef.value) {
      treeRef.value.expand([node.id])
    }
  }
}

// 节点展开时：懒加载子菜单
const handleNodeExpand = async (node: TreeNode) => {
  if (props.loadChildren) {
    await loadNodeChildren(node)
  }
}

const handleNodeCollapse = (_node: TreeNode) => {
  // Tree 内部已处理折叠
}

const loadNodeChildren = async (node: TreeNode) => {
  if ((node as any).loading) return
  if (node.children && node.children.length > 0) return

  ;(node as any).loading = true
  try {
    const children = await props.loadChildren!(node)
    node.children = children
  } catch (e) {
    console.error('Failed to load children:', e)
  } finally {
    ;(node as any).loading = false
  }
}

defineExpose({
  expand: (keys: (string | number)[]) => treeRef.value?.expand(keys),
  collapse: (keys: (string | number)[]) => treeRef.value?.collapse(keys),
  expandAll: () => treeRef.value?.expandAll(),
  collapseAll: () => treeRef.value?.collapseAll(),
})
</script>

<style scoped>
.tree-select {
  padding: 8px 0;
}

.tree-node-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
  width: 100%;
}

.tree-node-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: var(--color-text, #333);
}

.loading-indicator {
  margin-right: 8px;
  font-size: 12px;
  color: var(--color-text-secondary);
}
</style>