<template>
  <div ref="container" class="container">
    <div class="menu-container">
      <div class="search">
        <Input
          v-if="!Menucollapsed"
          v-model:value="searchValue"
          placeholder="目前暂支持菜单搜索"
          allow-clear
        ></Input>
        <Tooltip>
          <template #title
            >菜单数据太大了，展开可能会有点卡顿<br />但换来的是搜索和子项展开的流畅体验</template
          >
          <Button @click="toggleCollapsed"> {{ Menucollapsed ? '➡️' : '⬅️' }} </Button>
        </Tooltip>
      </div>
      <div :class="Menucollapsed ? 'menu-collapsed' : 'menu'">
        <Spin :spinning="loading" class="loading" />
        <Menu
          @click="goto"
          :collapsed="Menucollapsed"
          v-if="!loading"
          :selectedKeys="selectedKeys"
          v-model="openKeys"
          :menus="menus"
          @dom-updated="menuDomUpdated"
        >
        </Menu>
      </div>
    </div>
    <div class="content">
      <div class="tabBar">
        <RouteTab
          @tab-click="tabClick"
          :activeKey="activeKey"
          :currentDragIndex="currentDragIndex"
          :tabList="tabList"
          :showContextMenu="showContextMenu"
          @remove="removeTab"
          @remove-other="removeOther"
          @remove-side="removeSide"
          @toggle-show-menu="toggleShowMenu"
          @set-current-drag-index="setCurrentDragIndex"
          @sort-tab="sortTab"
        >
        </RouteTab>
      </div>
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
import Menu from '@/components/MainMenu/index.vue'
import RouteTab from '@/components/RouteTab.vue'
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
import type { Route } from '@/menu'
import { useTabistStore, type Tab } from '@/stores/tab'
import { useRouter } from 'vue-router'
import { debounce } from '@/Function/CommonFun'
import { message, Spin, Input, Button, Tooltip } from 'ant-design-vue'
// import { request } from '@/request'

const router = useRouter()

const menus = ref<Route[]>([])

// const needLoadKeys = ref<string[]>([])

const container = ref<HTMLElement | null>(null)

let contextMenu: HTMLElement | null = null

function closeContextMenu(e: MouseEvent) {
  if (contextMenu && !contextMenu.contains(e.target as Node)) {
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

onMounted(() => {
  contextMenu = document.getElementById('context-menu')
  if (container.value) {
    container.value.addEventListener('click', closeContextMenu)
  }
  router.push(store.activeKey)
  getMenus()
})

onUnmounted(() => {
  menus.value.length = 0
})

const getMenus = async () => {
  loading.value = true
  mainViewLoading.value = true
  // const { data, needLoadKeys: n } = await getMainMenu()
  // menus.value = addKeysToRoutes(data as Route[])
  // needLoadKeys.value = n
  // const { data } = await request('/menu')
  // menus.value = addKeysToRoutes(data.menu)
  const { default: rawMenus } = await import('@/menu')
  menus.value = rawMenus
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
    openKeys.value = findFatherKeysListByKey(p)
    router.push({ path: p })
    nextTick(() => {
      scrollTo(p)
    })
  })
}
function removeOther(path: string) {
  router.push({ path })
  store.removeOther(path, (path) => {
    openKeys.value = findFatherKeysListByKey(path)
    nextTick(() => {
      scrollTo(path)
    })
  })
}

function removeSide(index: number, side: 'left' | 'right', key: string) {
  router.push({ path: key })
  store.removeSide(index, side, key, (path) => {
    openKeys.value = findFatherKeysListByKey(path)
    nextTick(() => {
      scrollTo(path)
    })
  })
}

function goto({
  item: {
    path,
    name,
    originItemValue: { label },
    redirect,
  },
}: {
  item: {
    path: string
    name: string
    originItemValue: { label: { props: { innerText: string } } }
    redirect: { name: string }
  }
}) {
  if (path === activeKey.value) {
    return
  }
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
      label: label.props.innerText,
    },
    (path) => {
      openKeys.value = findFatherKeysListByKey(path)
    },
  )
}

function gotoByName(name: string, isRedirect: boolean = false) {
  let item = findMenuItemByName(name)
  if (name === 'home') {
    item = {
      label: '首页',
      name: 'home',
      path: '/',
    }
  }
  if (!item) {
    message.error('菜单不存在')
    return
  }
  const { title, path } = item as { title: string; path: string }
  mainViewLoading.value = true
  router.push({ path }).then(() => {
    mainViewLoading.value = false
  })
  store.activateTab(
    {
      path,
      name,
      label: title,
    },
    (path) => {
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
  background: #fff;
}

.loading {
  width: 100%;
  text-align: center;
  line-height: calc(100vh - 2.2rem);
}

li,
p {
  color: rgb(0, 0, 0);
}

.menu-container {
  height: 100vh;
}

.search {
  height: 2rem;
  margin: 0.2rem 0 0 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu {
  width: clamp(350px, 20vw, 400px);
  height: calc(100vh - 2.2rem);
  overflow: auto;
  border-right: 1px solid rgba(212, 212, 212, 0.5);
}

.menu-collapsed {
  width: 50px;
  overflow: hidden;
  transition: width 0.1s ease-in-out;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100vh;
}

.tabBar {
  background: #fff;
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
</style>
