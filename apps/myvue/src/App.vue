<template>

  <div ref=" container" class="container">
    <!-- 导航组件示例 -->
    <Navigation position="bottom-right" :offset="{ bottom: '2rem', right: '0.5rem' }" :isMobile="isMobile"
      @item-click="handleNavClick">
      <div class="nav-item">
        <span class="nav-icon">📊</span>
        <span class="nav-text">数据</span>
      </div>
      <div class="nav-item">
        <span class="nav-icon">⚙️</span>
        <span class="nav-text">设置</span>
      </div>
      <div class="nav-item">
        <ThemeChange v-model:show="themeMenuShow" :theme="theme" :themes="themes"
          :direction="isMobile ? 'vertical' : 'horizontal'" @theme-change="themeChange" />
        <span class=" nav-icon">👤</span>
        <span class="nav-text">用户</span>
      </div>
      <div class="nav-item">
        <span class="nav-icon">☀☽</span>
        <span class="nav-text">主题</span>
      </div>
      <div class="nav-item">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">首页</span>
      </div>
    </Navigation>


    <div class="menu-container">
      <div class="search">
        <Input v-if="!Menucollapsed" v-model:value="searchValue" placeholder="目前暂支持菜单搜索" allow-clear></Input>
        <Tooltip>
          <template #title>菜单数据太大了，展开可能会有点卡顿<br />但换来的是搜索和子项展开的流畅体验</template>
          <Button @click="toggleCollapsed"> {{ Menucollapsed ? '➡️' : '⬅️' }} </Button>
        </Tooltip>
      </div>
      <div :class="Menucollapsed ? 'menu-collapsed' : 'menu'">
        <Spin :spinning="loading" class="loading" />
        <Menu @select="goto" :collapsed="Menucollapsed" v-if="!loading" :items="menus as any"
          v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
        </Menu>
        <!-- <Menu @click="goto" :collapsed="Menucollapsed" v-if="!loading" :selectedKeys="selectedKeys" v-model="openKeys"
          :menus="menus" @dom-updated="menuDomUpdated">
        </Menu> -->
      </div>
    </div>
    <div class="content">
      <RouteTab @tab-click="tabClick" :activeKey="activeKey" :currentDragIndex="currentDragIndex" :tabList="tabList"
        :showContextMenu="showContextMenu" @remove="removeTab" @remove-other="removeOther" @remove-side="removeSide"
        @toggle-show-menu="toggleShowMenu" @set-current-drag-index="setCurrentDragIndex" @sort-tab="sortTab">
      </RouteTab>
      <div class="mainView" id="mainView" @scroll="handleScroll">
        <Spin :spinning="mainViewLoading" class="mainViewLoading" v-if="activeKey !== '/'"> </Spin>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" @goToByRouteName="gotoByName" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup vapor>
import Menu from '@/components/Menu/index.vue'
//import Menu from '@/components/Menu/Menu.vue'
import RouteTab from '@/components/Tab/RouteTab.vue'
import ThemeChange from '@/components/Theme/index.vue'
import Navigation from '@/components/Nav/fixedNavButton.vue'
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import {
  //addKeysToRoutes,
  findFatherKeysListByKey,
  findMatchingLabels,
  reWashMenus,
  findMenuItemByName,
  // deleteChild,
  // addChild,
  // changeLoading,
} from '@/menu'
import type { MenuItem } from '@/menu'
import { useTabistStore, type Tab } from '@/stores/tab'
import { type Theme, useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { debounce } from '@/Function/CommonFun'
import { message, Spin, Input, Button, Tooltip, } from 'ant-design-vue'
import { useDetectMobile } from '@/hooks/useDetectMobile'
// import { theme as themeTokens } from '@/assets/css/theme'
// import { request } from '@/request'



//获取用户信息
const userStore = useUserStore()


userStore.$subscribe(
  (_, state) => {
    localStorage.setItem('user', JSON.stringify(state.user))
  },
  { flush: 'sync' },
)

const theme = computed(() => userStore.user.theme)

const themes = userStore.user.themes

const isMobile = computed(() => userStore.user.device.isMobile)




//主题切换
const themeChange = (theme1: Theme) => {
  userStore.setUsrTheme(theme1)
  // 设置到 html 元素上
  document.documentElement.setAttribute('data-theme', theme1)
}




// const navigationButtonExpanded = ref(false)

const router = useRouter()

const menus = ref<MenuItem[]>([])

// const needLoadKeys = ref<string[]>([])

const container = ref<HTMLElement | null>(null)

let contextMenu: HTMLElement | null = null

function closeContextMenu(e: MouseEvent) {
  console.log('closeContextMenu')
  if (contextMenu && !contextMenu.contains(e.target as Node)) {
    console.log('closeContextMenu')
    store.toggleShowMenu(false)
  }

}


onUnmounted(() => {
  if (container.value) {
    if (contextMenu) {
      container.value.removeEventListener('click', (e) => {
        if (contextMenu && !contextMenu.contains(e.target as Node)) {
          store.toggleShowMenu(false)
        }
      })
    }
    contextMenu = null
  }
})

//是初始加载菜单吗？
// const initMenu = ref(true)

const Menucollapsed = ref(false)

const toggleCollapsed = async () => {
  //切换菜单后，初始加载菜单为false
  // initMenu.value = false
  loading.value = true
  Menucollapsed.value = !Menucollapsed.value
  await nextTick()
  loading.value = false
}

const loading = ref(false)

const mainViewLoading = ref(false)


useDetectMobile(userStore)

onMounted(() => {
  //设置主题
  themeChange(theme.value)

  //右键菜单
  contextMenu = document.getElementById('context-menu')

  if (container.value) {
    container.value.addEventListener('click', closeContextMenu)

  }

  //跳转激活的tab
  router.push(store.activeKey)
  //获取菜单
  getMenus()

})

onUnmounted(() => {
  menus.value.length = 0
})

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

function menuDomUpdated() {
  // 菜单dom更新后，打开父级菜单
  expandMenu(store.activeKey)
}

const store = useTabistStore()

store.$subscribe(
  (_, state) => {
    localStorage.setItem('tabList', JSON.stringify(state.tabList))
    localStorage.setItem('activeKey', state.activeKey)
  },
  { flush: 'sync' },
)

const showContextMenu = computed(() => store.showContextMenu)

const toggleShowMenu = (value: boolean) => {
  store.toggleShowMenu(value)
}

const tabList = computed<Tab[]>(() => store.tabList)

const activeKey = computed<string>(() => store.activeKey)

const selectedKeys = computed<string[]>(() => {
  if (!Menucollapsed.value) {
    return [store.activeKey]
  }
  return []
})

const openKeys = ref<string[]>([])

const searchValue = ref<string>('')

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

watch(searchValue, (value) => {
  showMenu(value)
})

const { sortTab, setCurrentDragIndex } = store

const currentDragIndex = computed<number>(() => store.currentDragIndex)

function tabClick(path: string) {
  if (path === activeKey.value) {
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

function removeTab(path: string) {
  store.removeTab(path, (p) => {
    router.push({ path: p })
    //手机端不展开菜单
    if (userStore.user.device.isMobile) return
    openKeys.value = findFatherKeysListByKey(p)
    nextTick(() => {
      scrollTo(p)
    })
  })
}
function removeOther(path: string) {
  router.push({ path })
  store.removeOther(path, (path) => {
    //手机端不展开菜单
    if (userStore.user.device.isMobile) return
    openKeys.value = findFatherKeysListByKey(path)
    nextTick(() => {
      scrollTo(path)
    })
  })
}

function removeSide(index: number, side: 'left' | 'right', key: string) {
  router.push({ path: key })
  store.removeSide(index, side, key, (path) => {
    //手机端不展开菜单
    if (userStore.user.device.isMobile) return
    openKeys.value = findFatherKeysListByKey(path)
    nextTick(() => {
      scrollTo(path)
    })
  })
}

function goto({
  path,
  name,
  label,
  redirect,
}: MenuItem) {
  if (path === activeKey.value) {
    return
  }
  //手机端并且折叠状态下点击菜单后折叠菜单 这里重复赋值 主要处理弹出来的菜单后收拢
  if (userStore.user.device.isMobile && Menucollapsed.value) Menucollapsed.value = true
  if (redirect) {
    gotoByName(redirect.name, true)
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
      label
    },
    (path) => {
      openKeys.value = findFatherKeysListByKey(path)
      console.log('openKeys', openKeys.value)
    },
  )
}

function gotoByName(name: string, isRedirect: boolean = false) {
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
      if (userStore.user.device.isMobile) return
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

const handleScroll = debounce((e: Event) => {
  const scrollTop = (e.target as HTMLElement).scrollTop
  store.setScrollTop(scrollTop, activeKey.value)
}, 100)

//滚进视口
const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const timer = setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      clearTimeout(timer)
    }, 300)
  }
}

// const cacheKeys = ref<string[]>([])

// const leafKeys = ref<string[]>([])

// async function openChange(e: any) {
//   if (cacheKeys.value.length < e.length) {
//     const name = e[e.length - 1].slice(1)
//     if (needLoadKeys.value.includes(name)) {
//       changeLoading(menus.value, name, true)
//       const submenus = await getSubMenuByName(name)
//       addChild(menus.value, name, addKeysToRoutes(submenus))
//       changeLoading(menus.value, name, false)
//     }
//   } else {
//     // 计算cacheKeys.value和e的差集（即被关闭的key）
//     const closedKey = cacheKeys.value.filter((key) => !e.includes(key))[0].slice(1)
//     if (needLoadKeys.value.includes(closedKey)) {
//       deleteChild(menus.value, closedKey)
//     }
//   }
//   cacheKeys.value = e
// }


const themeMenuShow = ref(false)

//铆钉导航
const handleNavClick = (index: number) => {
  switch (index) {
    case 4:
      gotoByName('home')
      break;
    case 3:
      themeMenuShow.value = !themeMenuShow.value
      break;
    default:
      break;
  }
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

.container {
  display: flex;
  background: var(--element-background);
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
  height: 2rem;
  margin: 0.1rem 0 0 0.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu {
  width: 301px;
  height: calc(100vh - 2.2rem);
  overflow: auto;
  border-right: 1px solid var(--element-border);
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

/* 导航项样式 */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 30px;
  min-height: 30px;
  padding: 10px;
  background: var(--element-background);
  color: var(--color-text);
  border: 1px solid var(--element-border);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--element-background-soft);
    border-color: var(--element-border-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
}

.nav-icon {
  font-size: 24px;
  line-height: 1;
}

.nav-text {
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}
</style>
