<template>
  <div class="tree-item">
    <div
      class="tree-node"
      :class="{ 'is-expanded': isExpanded, 'is-leaf': isLeaf }"
      :style="{ paddingLeft: `${level * 16 + 8}px` }"
      @click="handleClick"
    >
      <span
        v-if="!isLeaf"
        class="tree-arrow"
        :class="{ expanded: isExpanded }"
      >
        <svg viewBox="0 0 16 16" width="16" height="16">
          <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </span>
      <span v-else class="tree-arrow-placeholder"></span>
      <span v-if="node.icon" class="tree-icon">{{ node.icon }}</span>
      <span class="tree-label">{{ node.label }}</span>
    </div>
    <div v-if="$slots.extra" class="tree-actions" @click.stop>
      <slot name="extra" :node="node" />
    </div>
    <div v-if="isExpanded && hasChildren" class="tree-children">
      <TreeItem
        v-for="childNode in node.children"
        :key="childNode.id"
        :node="childNode"
        :level="level + 1"
        :expandedKeys="expandedKeys"
        :nodeId="nodeId"
        @click="handleChildClick"
        @toggle="handleChildToggle"
      >
        <template #extra>
          <slot name="extra" :node="childNode" />
        </template>
      </TreeItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TreeNode } from './index'

const props = defineProps<{
  node: TreeNode
  level: number
  expandedKeys: (string | number)[]
  nodeId?: string | number
}>()

const emit = defineEmits<{
  click: [node: TreeNode, nodeEl: HTMLElement]
  toggle: [node: TreeNode, expanded: boolean]
}>()

const isExpanded = computed(() => props.expandedKeys.includes(props.node.id))
const isLeaf = computed(() => !props.node.children || props.node.children.length === 0)
const hasChildren = computed(() => props.node.children && props.node.children.length > 0)

const handleClick = (e: MouseEvent) => {
  if (!isLeaf.value) {
    const newExpanded = !isExpanded.value
    emit('toggle', props.node, newExpanded)
  }
  emit('click', props.node, e.currentTarget as HTMLElement)
}

const handleChildClick = (node: TreeNode, nodeEl: HTMLElement) => {
  emit('click', node, nodeEl)
}

const handleChildToggle = (node: TreeNode, expanded: boolean) => {
  emit('toggle', node, expanded)
}
</script>

<style scoped>
.tree-item {
  user-select: none;
}

.tree-node {
  display: flex;
  align-items: center;
  height: 32px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.15s;
  position: relative;
  padding-right: 120px;
}

.tree-node:hover {
  background-color: var(--color-hover, #f5f5f5);
}

.tree-node:hover + .tree-actions {
  opacity: 1;
}

.tree-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  color: var(--color-text-secondary, #999);
  transition: transform 0.2s;
}

.tree-arrow.expanded {
  transform: rotate(90deg);
}

.tree-arrow-placeholder {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.tree-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: var(--color-text-primary, #333);
}

.tree-icon {
  margin-right: 6px;
  font-size: 14px;
}

.tree-extra {
  display: flex;
  align-items: center;
}

.tree-actions {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s;
}

.tree-children {
  margin-left: 0;
}
</style>
