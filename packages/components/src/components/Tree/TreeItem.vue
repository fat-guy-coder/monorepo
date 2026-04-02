<template>
  <div class="tree-item">
    <div class="tree-node" :class="{ 'is-expanded': isExpanded, 'is-leaf': isLeaf }"
      :style="{ paddingLeft: `${level * 16 + 8}px` }" @click="handleClick">
      <span v-if="hasChildren" class="tree-arrow" :class="{ expanded: isExpanded }">
        <svg viewBox="0 0 16 16" width="16" height="16">
          <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </span>
      <span v-else class="tree-arrow-placeholder"></span>
      <slot name="node" :node="node" :expanded="isExpanded">
        <span v-if="node.icon" class="tree-icon">{{ node.icon }}</span>
        <span class="tree-label">{{ node.label }}</span>
      </slot>
    </div>
    <div v-show="isExpanded && hasChildren" ref="childrenRef" class="tree-children">
      <TreeItem v-for="childNode in node.children" :key="childNode.id" :node="childNode" :level="level + 1"
        :expandedKeys="expandedKeys" :nodeId="nodeId" @click="handleChildClick" @toggle="handleChildToggle">
        <template #node="slotProps">
          <slot name="node" :node="slotProps.node" :expanded="slotProps.expanded" />
        </template>
      </TreeItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
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

defineSlots<{
  node(props: { node: TreeNode; expanded: boolean }): unknown
}>()

const childrenRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)

const isExpanded = computed(() => props.expandedKeys.includes(props.node.id))
const isLeaf = computed(() => !props.node.children || props.node.children.length === 0)
const hasChildren = computed(() => props.node.children && props.node.children.length > 0)

watch(isExpanded, async (expanded) => {
  if (!childrenRef.value || !hasChildren.value) return

  if (expanded) {
    childrenRef.value.style.maxHeight = '0px'
    await nextTick()
    const scrollHeight = childrenRef.value.scrollHeight
    childrenRef.value.style.maxHeight = `${scrollHeight}px`
    childrenRef.value.style.overflow = 'hidden'

    const finishAnimation = () => {
      if (childrenRef.value) {
        childrenRef.value.style.maxHeight = 'none'
        childrenRef.value.style.overflow = 'visible'
      }
      isAnimating.value = false
      childrenRef.value?.removeEventListener('transitionend', finishAnimation)
    }

    isAnimating.value = true
    childrenRef.value.addEventListener('transitionend', finishAnimation)
    // Fallback timeout
    setTimeout(() => {
      if (isAnimating.value && childrenRef.value) {
        childrenRef.value.style.maxHeight = 'none'
        childrenRef.value.style.overflow = 'visible'
        isAnimating.value = false
      }
    }, 300)
  } else {
    if (childrenRef.value) {
      childrenRef.value.style.maxHeight = `${childrenRef.value.scrollHeight}px`
      childrenRef.value.style.overflow = 'hidden'
      await nextTick()
      childrenRef.value.style.maxHeight = '0px'
    }
  }
})

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
}

.tree-node:hover {
  background-color: var(--color-hover, #f5f5f5);
}

.tree-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  color: var(--color-text-soft, #999);
  transition: transform 0.2s ease;
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
  color: var(--color-text, #333);
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
  display: flex;
  gap: 4px;
  margin-left: 8px;
}

.tree-children {
  margin-left: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s ease-out;
}
</style>
