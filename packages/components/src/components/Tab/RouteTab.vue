<template>
  <div class="menu-list" id="context-menu" :style="{
    top: `${position.Y}px`,
    left: `${position.X}px`,
    height: showContextMenu ? 'auto' : '0px',
  }">
    <div @click.stop="closeSide(currentIndex, 'left', currentKey)">关闭左侧</div>
    <div @click.stop="closeSide(currentIndex, 'right', currentKey)">关闭右侧</div>
    <div @click.stop="closeAll(currentKey)">关闭其他</div>
    <slot name="contextMenuItems"></slot>
  </div>
  <Tabs @change="TabClick" :activeKey="activeKey" :type="type" :tabBarStyle="{ margin: '0 5px' }" @close="removeTab">
    <TabPane v-for="(pane, index) in tabList" :key="pane.path" :closable="pane.path !== '/' && pane.path !== '/home'"
      :path="pane.path">
      <template #tab>
        <div @click.right.prevent.stop="openMenu(pane.path, $event, index)" :data-id="pane.path" class="tab-item"
          :draggable="pane.path !== '/'" @dragstart="startSorting(index, pane.path)"
          @dragover="handleSortOver(index, $event, pane.path)" @dragenter.prevent @dragend="endSorting(pane.path)">
          {{ pane.label }}
        </div>
      </template>
    </TabPane>
  </Tabs>
</template>
<script lang="ts" setup>
// 组合式 API 逻辑
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import Tabs from './index.vue'
import TabPane from './TabPane.vue'


const { showContextMenu, currentDragIndex } = defineProps<{
  tabList: { path: string; label: string }[]
  activeKey: string
  showContextMenu: boolean
  currentDragIndex: number,
  keyMap?: 'path'
  type?: 'line' | 'card' | 'editable-card'
}>()

const emit = defineEmits([
  'tabClick',
  'remove',
  'removeOther',
  'removeSide',
  'toggleShowMenu',
  'sortTab',
  'setCurrentDragIndex',
])

function TabClick(item: unknown) {
  emit('tabClick', item)
}


const position = ref({ X: 0, Y: 0 })

const lastKey = ref('')

const currentKey = ref('')

const currentIndex = ref(0)

//openMenu
const openMenu = (targetKey: string, e: MouseEvent, index: number) => {
  if (!currentKey.value && !lastKey.value) {
    currentKey.value = targetKey
    lastKey.value = targetKey
  } else {
    lastKey.value = currentKey.value
    currentKey.value = targetKey
  }
  if (currentKey.value !== lastKey.value) {
    emit('toggleShowMenu', true)
  } else {
    emit('toggleShowMenu', !showContextMenu)
  }
  position.value = { X: e.clientX, Y: e.clientY }
  currentIndex.value = index
}


const removeTab = (path: string) => {
  emit('remove', path)
}
const closeAll = (targetKey: string) => {
  emit('removeOther', targetKey)
  emit('toggleShowMenu', false)
}

const closeSide = (index: number, side: 'left' | 'right', targetKey: string) => {
  emit('removeSide', index, side, targetKey)
  emit('toggleShowMenu', false)
}

// ============================================
// 拖拽排序 + FLIP 动画
// ============================================

// 当前正在拖拽的 tab path
const draggingPath = ref<string | null>(null)

// 查询所有 tab-pane 元素
function getTabPaneElements(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('.tab-pane[data-path]'))
}

// 捕获所有 tab-pane 的当前位置（FLIP 的 First）
function captureRects(): Map<string, DOMRect> {
  const rects = new Map<string, DOMRect>()
  getTabPaneElements().forEach(el => {
    rects.set(el.dataset.path!, el.getBoundingClientRect())
  })
  return rects
}

// 取消所有进行中的 FLIP 动画，重置 transform
function cancelAllFlips() {
  getTabPaneElements().forEach(el => {
    el.style.transition = ''
    el.style.transform = ''
  })
}

// 执行 FLIP 动画（Invert + Play）
function applyFlip(prevRects: Map<string, DOMRect>) {
  getTabPaneElements().forEach(el => {
    const path = el.dataset.path!
    const prev = prevRects.get(path)
    if (!prev) return

    const next = el.getBoundingClientRect()
    const dx = prev.left - next.left
    const dy = prev.top - next.top

    // 位移小于阈值则跳过，避免不必要的动画
    if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) return

    // Invert: 瞬间把元素移回原位
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
    el.style.transition = 'none'

    // 强制回流，确保 Invert 生效
    el.getBoundingClientRect()

    // Play: 过渡到新位置（带阻尼感的缓出曲线）
    el.style.transition = 'transform 0.22s cubic-bezier(0.2, 0, 0, 1)'
    el.style.transform = ''

    // 动画结束后清理
    const onEnd = () => {
      el.style.transition = ''
      el.removeEventListener('transitionend', onEnd)
    }
    el.addEventListener('transitionend', onEnd)
  })
}

// 开始拖拽
const startSorting = (index: number, path: string) => {
  emit('setCurrentDragIndex', index)
  draggingPath.value = path
  // 下一帧给被拖拽的元素加上视觉反馈
  nextTick(() => {
    const el = document.querySelector<HTMLElement>(`.tab-pane[data-path="${path}"]`)
    if (el) el.classList.add('is-dragging-source')
  })
}

// 拖拽悬停 → 排序 + FLIP 动画
const handleSortOver = (index: number, e: DragEvent, _path: string) => {
  e.preventDefault()
  // 位置未变则跳过
  if (index === currentDragIndex) return

  // 取消进行中的 FLIP，避免叠加导致错位
  cancelAllFlips()

  // First: 捕获排序前位置
  const prevRects = captureRects()

  // 触发排序
  emit('sortTab', index, _path)

  // Last + Invert + Play
  nextTick(() => {
    applyFlip(prevRects)
  })
}

// 结束拖拽
const endSorting = (_path: string) => {
  // 移除拖拽样式
  if (draggingPath.value) {
    const el = document.querySelector<HTMLElement>(`.tab-pane[data-path="${draggingPath.value}"]`)
    if (el) el.classList.remove('is-dragging-source')
    draggingPath.value = null
  }
  // 清理残余 FLIP 状态
  cancelAllFlips()
  emit('setCurrentDragIndex', currentDragIndex - 1)
}

// ============================================
// 点击菜单外部关闭（在 document 上监听，比容器级监听更可靠）
// ============================================
function handleClickOutside(e: MouseEvent) {
  if (!showContextMenu) return
  const menu = document.getElementById('context-menu')
  if (menu && !menu.contains(e.target as Node)) {
    emit('toggleShowMenu', false)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true)
})
</script>

<style lang="less" scoped>
.tab-item {
  position: relative;
  top: 0px;
  left: 0px;
  background-color: transparent;
  user-select: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

.menu-list {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  background: var(--color-background);
  color: var(--color-text);
  height: 1px;
  // border: var(--border-width) solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.08);
  width: 7.5rem;
  height: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  overflow: hidden;
  transition: all 0.2s ease-in;
  font-size: var(--font-size-small);

  div {
    cursor: pointer;
    width: 100%;
    text-align: center;
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    color: var(--color-text);

    &:hover {
      background-color: var(--color-background-soft);
      color: var(--color-primary);
      transform: translate(1px, 1px);
    }
  }
}
</style>