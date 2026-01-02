<template>
  <div ref="container" class="main-view-container">
    <!-- 导航组件示例 -->
    <Navigation
      position="bottom-right"
      :offset="{ bottom: '2rem', right: '0.5rem' }"
      :isMobile="isMobile"
      @item-click="handleNavClick"
      :items="navItems"
    >
      <template #theme="{ item }">
        <ThemeChange
          v-model:show="themeMenuShow"
          :theme="theme"
          :themes="themes"
          :direction="isMobile ? 'vertical' : 'horizontal'"
          @theme-change="themeChange"
        />
        <span class="nav-icon">{{ currentThemeIcon }}</span>
        <span class="nav-text">{{ item.label }}</span>
      </template>
    </Navigation>
    <div class="menu-container">
      <div class="search">
        <Input
          v-if="!Menucollapsed"
          v-model:value="searchValue"
          placeholder="目前暂支持菜单搜索"
          allow-clear
        ></Input>
        <Button @click="toggleCollapsed"> {{ Menucollapsed ? '➡️' : '⬅️' }} </Button>
      </div>
      <div :class="Menucollapsed ? 'menu-collapsed' : 'menu'">
        <Spin :spinning="loading" class="loading" />
        <Menu
          @select="goto"
          :isMobile="isMobile"
          :collapsed="Menucollapsed"
          v-show="!loading"
          :mode="Menucollapsed ? 'vertical' : 'inline'"
          :items="menus as any"
          :selectedKeys="selectedKeys"
          v-model:openKeys="openKeys"
        >
        </Menu>
      </div>
    </div>
    <div class="content">
      <div class="tabs">
        <RouteTab
          @tab-click="tabClick"
          :activeKey="activeKey"
          :currentDragIndex="currentDragIndex"
          :tabList="tabList"
          :showContextMenu="showContextMenu"
          @remove="removeTab"
          @remove-other="removeOther"
          @remove-side="removeSide"
          @set-current-drag-index="setCurrentDragIndex"
          @sort-tab="sortTab"
          @toggle-show-menu="toggleShowMenu"
        >
        </RouteTab>
      </div>
      <div class="mainView" id="mainView" @scroll="handleScroll">
        <Spin :spinning="mainViewLoading" class="mainViewLoading" v-if="activeKey !== '/'"> </Spin>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" @goToByRouteName="goToByName" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//vue编译器会自动引入components目录下的所有组件，但不是异步组件，这一步是为了将所有组件转换为异步组件，以优化初始加载性能
import { Menu, RouteTab, ThemeChange, Navigation, Input, Button, message, Spin } from '@/components'
import { computed, ref, watch, onMounted, onUnmounted, nextTick, provide } from 'vue'
import {
  type MenuItem, //菜单项类型
  findFatherKeysListByKey, //查找父级菜单key列表
  findMatchingLabels, //查找匹配的项并改变菜单项的label 返回openKeys和selectedKeys 具有副作用
  reWashMenus, //重置菜单项匹配状态 具有副作用
  findMenuItemByName, //查找菜单项 通过name
} from '@/menu'
import { useTabStore } from '@/stores/tab' //标签列表store
import { useUserStore } from '@/stores/userProfle' //用户信息store
import { useDeviceStore } from '@/stores/device' //设备信息store
import { useUIConfigStore, type Theme } from '@/stores/uiconfig' //UI配置store
import { useRouter } from 'vue-router'
import { debounce, scrollIntoViewById } from '@/function/common' //常用函数
import type { NavItem } from './components/Nav' //导航项类型
import { useGradientAnimation } from '@/hooks/useGradientAnimation' //渐变色动画
import { useDetectDevice } from '@/hooks/useDetectDevice' //设备信息hook
// import { request } from '@/request'

//获取用户信息store
const userStore = useUserStore()
const deviceStore = useDeviceStore()
const uiConfigStore = useUIConfigStore()

//是否是手机端
const isMobile = computed(() => deviceStore.isMobile)

//主题
const theme = computed(() => uiConfigStore.theme)
const themes = computed(() => uiConfigStore.themes)
const navItems = computed(() => uiConfigStore.navItems)

//当前主题图标
const currentThemeIcon = computed(() => {
  return uiConfigStore.themes.find((i) => i.value === uiConfigStore.theme)?.icon || '☀️'
})

//主题菜单显示状态
const themeMenuShow = ref(false)

//铆钉导航
const handleNavClick = (item: NavItem): void => {
  switch (item.value) {
    case 'home':
      goToByName('home')
      break
    case 'theme':
      themeMenuShow.value = !themeMenuShow.value
      break
    default:
      break
  }
}

//主题切换
const themeChange = (theme1: Theme) => {
  if (theme1 === 'more') {
    goToByName('MyTheme')
    return
  }
  //设置用户主题
  uiConfigStore.setTheme(theme1)
  document.documentElement.setAttribute('data-theme', theme1)
}

//全局渐变色动画
useGradientAnimation({
  gradientTypes: ['linear', 'box-shadow'],
  triggerTimes: ['hover'],
})

//路由
const router = useRouter()

//菜单列表
const menus = ref<MenuItem[]>([])

//容器
const container = ref<HTMLElement | null>(null)

//右键菜单node
let contextMenu: HTMLElement | null = null

function closeContextMenu(e: MouseEvent) {
  if (contextMenu && !contextMenu.contains(e.target as Node)) {
    store.toggleShowMenu(false)
  }
}

function cancelContextMenu() {
  if (contextMenu) {
    container.value?.removeEventListener('click', (e) => {
      if (contextMenu && !contextMenu.contains(e.target as Node)) {
        store.toggleShowMenu(false)
      }
    })
    contextMenu = null
  }
}

onUnmounted(() => {
  cancelContextMenu()
})

//是初始加载菜单吗？
// const initMenu = ref(true)

//菜单折叠状态
const Menucollapsed = ref(isMobile.value)

//切换菜单折叠状态
const toggleCollapsed = async () => {
  //切换菜单后，初始加载菜单为false
  loading.value = true
  Menucollapsed.value = !Menucollapsed.value
  await nextTick()
  loading.value = false
}

const loading = ref(false)

const mainViewLoading = ref(false)

useDetectDevice((device) => {
  deviceStore.setDevice(device)
})

onMounted(() => {
  //设置主题
  themeChange(theme.value)
  //右键菜单
  contextMenu = document.getElementById('context-menu')
  if (container.value) {
    container.value.addEventListener('click', closeContextMenu)
  }
  //跳转激活的tab
  router.push(activeKey.value)
  //获取菜单
  getMenus()
})

//卸载时清空菜单列表
onUnmounted(() => {
  menus.value.length = 0
})

//获取菜单
const getMenus = async () => {
  loading.value = true
  mainViewLoading.value = true
  // const { data, needLoadKeys: n } = await getMainMenu()
  // menus.value = addKeysToRoutes(data as MenuItem[])
  // needLoadKeys.value = n
  // const { data } = await request('/menu')
  // menus.value = addKeysToRoutes(data.menu)
  const { default: rawMenus } = await import('@/menu/menu.json')
  menus.value = rawMenus as MenuItem[]
  loading.value = false
  mainViewLoading.value = false
}

//标签列表store
const store = useTabStore()

//当前激活的标签
const activeKey = computed(() => store.activeKey)

//标签列表
const tabList = computed(() => store.tabList)

//是否显示右键菜单
const showContextMenu = computed(() => store.showContextMenu)

//切换右键菜单显示状态
const toggleShowMenu = (value: boolean) => {
  store.toggleShowMenu(value)
}

//当前选中的标签key列表
const selectedKeys = computed<string[]>(() => {
  if (activeKey.value !== '/') {
    return [activeKey.value]
  }
  return []
})

//当前展开的菜单key列表
const openKeys = ref<string[]>([])

//搜索值
const searchValue = ref<string>('')

//显示菜单
const showMenu = debounce(async (value) => {
  //loading.value = true
  if (!value) {
    openKeys.value = []
    reWashMenus(menus.value)
    //loading.value = false
    return
  }
  const { selectedKeys, openKeys: keys } = findMatchingLabels(menus.value, value)
  openKeys.value = keys
  await nextTick()
  scrollTo(selectedKeys[0])
}, 500)

//监听搜索值
watch(searchValue, (value) => {
  showMenu(value)
})

//标签列表store
const { sortTab, setCurrentDragIndex } = store

//当前拖拽的标签索引
const currentDragIndex = computed<number>(() => store.currentDragIndex)

//标签点击
function tabClick(path: string) {
  if (path === store.activeKey) {
    return
  }
  mainViewLoading.value = true
  router.push({ path }).then(() => {
    mainViewLoading.value = false
  })

  store.activateTabOnlyKey(path, () => {
    if (path !== '/') {
      if (!Menucollapsed.value) {
        openKeys.value = findFatherKeysListByKey(path)
      } else {
        openKeys.value = []
      }
    }
    nextTick(() => {
      scrollTo(path)
    })
  })
}

//展开菜单
function expandMenu(path: string) {
  if (!Menucollapsed.value) {
    openKeys.value = findFatherKeysListByKey(path)
  } else {
    openKeys.value = []
  }
  nextTick(() => {
    scrollTo(path)
  })
}

//删除标签
function removeTab(path: string) {
  store.removeTab(path, (p) => {
    router.push({ path: p })
    //手机端不展开菜单
    if (isMobile) return
    openKeys.value = findFatherKeysListByKey(p)
    nextTick(() => {
      scrollTo(p)
    })
  })
}

//删除其他标签
function removeOther(path: string) {
  router.push({ path })
  store.removeOther(path, (path) => {
    //手机端不展开菜单
    if (isMobile) return
    openKeys.value = findFatherKeysListByKey(path)
    nextTick(() => {
      scrollTo(path)
    })
  })
}

//删除侧边标签
function removeSide(index: number, side: 'left' | 'right', key: string) {
  router.push({ path: key })
  store.removeSide(index, side, key, (path) => {
    //手机端不展开菜单
    if (isMobile) return
    openKeys.value = findFatherKeysListByKey(path)
    nextTick(() => {
      scrollTo(path)
    })
  })
}

//跳转菜单
function goto({ path, name, label, redirect }: MenuItem) {
  if (path === store.activeKey) {
    return
  }
  //手机端并且折叠状态下点击菜单后折叠菜单 这里重复赋值 主要处理弹出来的菜单后收拢
  if (isMobile && Menucollapsed.value) Menucollapsed.value = true
  if (redirect) {
    goToByName(redirect.name, true)
    return
  }
  mainViewLoading.value = true
  router.push({ path }).then(() => {
    mainViewLoading.value = false
  })
  store.activateTab(
    {
      path,
      name,
      label,
    },
    (path) => {
      openKeys.value = findFatherKeysListByKey(path)
    },
  )
}

//通过菜单名称跳转
function goToByName(name: string, isRedirect: boolean = false) {
  let item = findMenuItemByName(name)
  if (name === 'home') {
    item = {
      id: 'home',
      icon: '🏠',
      label: '首页',
      name: 'home',
      path: '/',
    }
  }
  if (!item) {
    message.error('菜单不存在')
    return
  }
  const { label, path } = item
  mainViewLoading.value = true
  router.push({ path }).then(() => {
    mainViewLoading.value = false
  })
  store.activateTab(
    {
      path,
      name,
      label,
    },
    (path) => {
      //手机端不展开菜单
      if (isMobile) return
      if (isRedirect) {
        const keys = findFatherKeysListByKey(path)
        openKeys.value = [...keys, ...openKeys.value]
      } else {
        openKeys.value = findFatherKeysListByKey(path)
      }
      nextTick(() => {
        scrollTo(path)
      })
    },
  )
}

//提供跳转菜单名称方法
provide('goToByName', goToByName)

//滚动事件
const handleScroll = debounce((e: Event) => {
  const scrollTop = (e.target as HTMLElement).scrollTop
  store.setScrollTop(scrollTop, store.activeKey)
}, 100)

//滚进视口 延时是为了防止滚动条抖动
const scrollTo = (id: string) => {
  const timer = setTimeout(() => {
    scrollIntoViewById(id)
    clearTimeout(timer)
  }, 300)
}
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
}

.fade-leave-from {
  transform: translate(0, 0);
  opacity: 1;
}

.fade-enter-from {
  transform: translate(-5px, 5px);
  opacity: 0;
}

.fade-enter-to {
  transform: translate(0, 0);
  opacity: 1;
}

.fade-leave-to {
  transform: translate(5px, 5px);
  opacity: 0;
}

.main-view-container {
  display: flex;
  background: var(--color-background);
}

.loading {
  width: 100%;
  text-align: center;
  line-height: calc(100vh - 2.2rem);
}

.menu-container {
  height: 100vh;
}

.search {
  height: 2.2rem;
  // margin: 0.1rem 0 0 0.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu {
  width: 20rem;
  height: calc(100vh - 2.2rem);
  overflow: auto;
  border-right: var(--border-width) solid var(--color-border);
}

.menu-collapsed {
  width: 50px;
  // overflow: hidden;
  transition: width 0.1s ease-in-out;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100vh;
}

.mainView {
  overflow: auto;
  flex: 1;
  width: 100%;
  position: relative;
  scroll-timeline-name: --myTimeline;
  scroll-timeline-axis: block;
}

.mainViewLoading {
  width: 100%;
  line-height: calc(100vh - 100px);
  // height: calc(100vh - 100px);
  text-align: center;
}

.nav-icon {
  font-size: var(--font-size-xs);
  line-height: 1;
}

.nav-text {
  font-size: var(--font-size-xs);
  font-weight: 500;
  line-height: 1;
}
</style>
