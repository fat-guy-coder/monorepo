import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type Tab = {
  name: string //路由name
  path: string //路由path
  label?: string //标签名
  scrollTop?: number //滚动位置
}

export const useTabistStore = defineStore('tablist', () => {
  const list = sessionStorage.getItem('tabList') ? JSON.parse(sessionStorage.getItem('tabList') as string) as Tab[] : null
  //激活标签列表
  const tabList = ref<Tab[]>(list ? list : [
    {
      name: 'home',
      path: '/',
      label: '🏡 主页',
    },
  ])
  //激活标签的path
  const activeKey = ref<string>(sessionStorage.getItem('activeKey') || '/')


  //移除标签
  function removeTab(path: string, callback?: (path: string) => void) {
    const currentKey = tabList.value.findIndex((i) => i.path === path) - 1
    if (activeKey.value === path) {
      activeKey.value = tabList.value[currentKey].path
      if (callback) callback(activeKey.value)
    }
    tabList.value = tabList.value.filter((i) => i.path !== path)
  }
  //移除其他标签
  function removeOther(path: string, callback?: (path: string) => void) {
    activeKey.value = path
    tabList.value = tabList.value.filter((i) => i.path === path || i.path === '/')
    if (callback) callback(path)
  }
  //移除侧边标签
  function removeSide(index: number, side: 'left' | 'right', targetKey: string, callback?: (path: string) => void) {
    if (side === 'left') {
      tabList.value = tabList.value.filter((i, iIndex) => iIndex >= index || iIndex === 0)
    } else {
      tabList.value = tabList.value.filter((i, iIndex) => iIndex <= index)
    }
    activeKey.value = targetKey
    if (callback) callback(targetKey)
  }
  //激活标签
  function activateTab({
    path,
    name,
    label,
  }: Tab, callback?: (path: string) => void) {
    if (activeKey.value === path) {
      return
    }
    activeKey.value = path
    if (!tabList.value.some((i) => i.path === path)) {
      tabList.value.push({ path, name, label })
    }
    if (callback) callback(path)
  }

  //激活标签(只通过path激活)
  function activateTabOnlyKey(
    path: string,
    callback?: (path: string) => void) {
    if (activeKey.value === path) {
      return
    }
    activeKey.value = path
    if (callback) callback(path)
  }


  // @ params scrollTop: number 滚动位置
  // @ params currentKey: string 当前标签页的path
  // @ return void 设置激活标签页的滚动位置
  //设置激活标签页的滚动位置
  function setScrollTop(scrollTop: number, currentKey: string) {
    const tab = tabList.value.find((i) => i.path === currentKey)
    if (tab) {
      tab.scrollTop = scrollTop
    }
  }

  //标签页小菜单的显示状态
  const showContextMenu = ref(false)

  //切换标签页小菜单的显示状态
  function toggleShowMenu(value: boolean) {
    showContextMenu.value = value
  }

  //当前拖拽的标签页索引
  const currentDragIndex = ref(0)

  //当前拖拽的标签页
  function setCurrentDragIndex(index: number) {
    currentDragIndex.value = index
  }

  //排序标签页
  function sortTab(index: number) {
    if (currentDragIndex.value !== index) {
      const items = [...tabList.value]
      const [dragged] = items.splice(currentDragIndex.value, 1)
      items.splice(index, 0, dragged)
      tabList.value = items
      currentDragIndex.value = index
    }
  }

  return { tabList, activeKey, activateTab, activateTabOnlyKey, removeTab, removeOther, removeSide, setScrollTop, showContextMenu, toggleShowMenu, setCurrentDragIndex, currentDragIndex, sortTab }
})

