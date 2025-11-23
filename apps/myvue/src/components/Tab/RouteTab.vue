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
  <Tabs @change="TabClick" :activeKey="activeKey" hide-add size="small" type="editable-card" @edit="onEdit"
    :tabBarStyle="{ margin: '0 5px' }">
    <!-- @click.right.prevent="closeAll" -->

    <TabPane v-for="(pane, index) in tabList" :key="pane.path" :closable="pane.path !== '/' && pane.path !== '/home'">
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
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import { Tabs, TabPane } from 'ant-design-vue'
import type { Tab } from '@/stores/tab'
import { useUserStore } from '@/stores/user'


const store = useUserStore()


onMounted(() => { })

const { showContextMenu, tabList, currentDragIndex } = defineProps<{
  tabList: Tab[]
  activeKey: string
  showContextMenu: boolean
  currentDragIndex: number
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

const onEdit = (targetKey: any, action: 'remove' | 'add') => {
  emit('remove', targetKey)
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
  emit('tabClick', path)
}
</script>

<style lang="less" scoped>
/* 组件样式 */

// .ant-tabs :where(.css-dev-only-do-not-override-1p3hq3p).ant-tabs-top > .ant-tabs-nav {
//   margin: 0 !important;
// }

// :where(.css-dev-only-do-not-override-1p3hq3p).ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
//   transition: all 0.3s ease-in !important;
// }

.tab-item {
  position: relative;
  top: 0px;
  left: 0px;
  transition: all 0.3s ease-in;
}

.active {
  height: 80px;
  opacity: 1;
}

.left-shift {
  font-size: 16px;
  width: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in;

  &:hover {
    transform: translate(-1px, -1px);
  }
}

.menu-list {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  background: #fff;
  opacity: 0.7;
  color: #1677ff;
  width: 100px;
  height: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  transition: all 0.3s ease-in;

  div {
    cursor: pointer;
    width: 100%;
    text-align: center;
    transition: translate 0.5s ease-in;
    color: #1677ff;

    &:hover {
      transform: translate(1px, 1px);
    }
  }
}

// .tab {
//   position: relative;

//   .menu {
//     position: fixed;
//     width: 100%;
//     background: #fff;
//     color: #1677ff;
//     z-index: 100;
//   }

//   .menu-right {
//     left: 0;
//   }
// }</style>
