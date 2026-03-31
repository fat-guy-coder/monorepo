<template>
  <div class="menu-list" id="context-menu" :style="{
    top: `${position.Y}px`,
    left: `${position.X}px`,
    height: `${showContextMenu ? 80 : 0}px`,
  }">
    <div @click.stop="closeSide(currentIndex, 'left', currentKey)">关闭左侧</div>
    <div @click.stop="closeSide(currentIndex, 'right', currentKey)">关闭右侧</div>
    <div @click.stop="closeAll(currentKey)">关闭其他</div>
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
import { ref, onMounted, } from 'vue'
import Tabs from './index.vue'
import TabPane from './TabPane.vue'
// import TabPane from './TabPane.vue'
import type { Tab } from '@/stores/tab'



onMounted(() => { })

const { showContextMenu, currentDragIndex } = defineProps<{
  tabList: Tab[]
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

// 拖拽排序处理函数
const startSorting = (index: number, path: string) => {
  emit('setCurrentDragIndex', index)
  // emit('tabClick', path)
}

const handleSortOver = (index: number, e: DragEvent, path: string) => {
  e.preventDefault()
  emit('sortTab', index, path)
}

const endSorting = (path: string) => {
  emit('setCurrentDragIndex', currentDragIndex - 1)
  // emit('tabClick', path)
}
</script>

<style lang="less" scoped>
.tab-item {
  position: relative;
  top: 0px;
  left: 0px;
  background-color: transparent;
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