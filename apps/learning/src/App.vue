<template>
  <div ref="container" class="main-view-container">
    <!-- 导航组件示例 -->
    <Navigation position="bottom-right" :offset="{ bottom: '2rem', right: '0.5rem' }" :isMobile="isMobile"
      @item-click="handleNavClick" :items="navItems">
      <template #theme="{ item }">
        <ThemeChange v-model:show="themeMenuShow" :theme="theme" :themes="themes"
          :direction="isMobile ? 'vertical' : 'horizontal'" @theme-change="themeChange" />
        <span class="nav-icon">{{ currentThemeIcon }}</span>
        <span class="nav-text">{{ item.label }}</span>
      </template>
    </Navigation>
    <div class="menu-container">
      <div class="search">
        <Input v-if="!Menucollapsed" v-model:modelValue="searchValue" placeholder="目前暂支持菜单搜索" allow-clear></Input>
        <Button @click="toggleCollapsed"> {{ Menucollapsed ? '➡️' : '⬅️' }} </Button>
      </div>
      <div :class="Menucollapsed ? 'menu-collapsed' : 'menu'">
        <Spin :spinning="loading" class="loading" />
        <Menu @select="goto" :isMobile="isMobile" :collapsed="Menucollapsed" v-show="!loading"
          :mode="Menucollapsed ? 'vertical' : 'inline'" :items="menus as any" :selectedKeys="selectedKeys"
          v-model:openKeys="openKeys" :onLoadData="loadChildren">
        </Menu>
      </div>
    </div>
    <div class="content">
      <div class="tabs">
        <RouteTab @tab-click="tabClick" :activeKey="activeKey" :currentDragIndex="currentDragIndex" :tabList="tabList"
          :showContextMenu="showContextMenu" @remove="removeTab" @remove-other="removeOther" @remove-side="removeSide"
          @set-current-drag-index="setCurrentDragIndex" @sort-tab="sortTab" @toggle-show-menu="toggleShowMenu">
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

    <!-- 登录/注册模态框 -->
    <Modal v-model:visible="loginModalVisible" :title="isRegisterMode ? '注册' : '登录'" @confirm="handleLoginSubmit"
      @cancel="loginModalVisible = false">
      <div class="modal-form">
        <div class="form-item">
          <label>用户名</label>
          <Input v-model="loginForm.username" placeholder="请输入用户名" />
        </div>
        <div class="form-item">
          <label>密码</label>
          <Input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </div>
        <div class="form-item toggle-mode">
          <span @click="isRegisterMode = !isRegisterMode">
            {{ isRegisterMode ? '已有账号？去登录' : '没有账号？去注册' }}
          </span>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
//vue编译器会自动引入components目录下的所有组件，但不是异步组件，这一步是为了将所有组件转换为异步组件，以优化初始加载性能
import { Menu, RouteTab, ThemeChange, Navigation, Input, Button, Modal, message, Spin } from 'components'
import { computed, ref, reactive, watch, onMounted, onUnmounted, nextTick, provide } from 'vue'
import {
  type MenuItem, //菜单项类型
  findFatherKeysListByKey, //查找父级菜单key列表
  findMenuItemByName, //查找菜单项 通过name
} from '@/menu'
import { getApiMenus, getApiMenusSearch } from '@/api/menu'
import { postApiUserLogin, postApiUserRegister, postApiUserRefresh, getApiUserMe } from '@/api/user'
import { saveTokens, saveUserInfo, getAccessToken, isAccessTokenValid, isRefreshTokenValid, getRefreshToken, clearTokens, getUserInfo } from '@/utils/token'
import { useTabStore } from '@/stores/tab' //标签列表store
import { useDeviceStore } from '@/stores/device' //设备信息store
import { useUIConfigStore, type Theme } from '@/stores/uiconfig' //UI配置store
import { useUserStore } from '@/stores/userProfle'
import { useRouter } from 'vue-router'
import { debounce, scrollIntoViewById } from '@/function/common' //常用函数
import type { NavItem } from 'components' //导航项类型
import { useGradientAnimation } from '@/hooks/useGradientAnimation' //渐变色动画
import { useDetectDevice } from '@/hooks/useDetectDevice' //设备信息hook
import { loadViewByPath, viewExists } from '@/views/views-loader' //动态视图加载器


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
    case 'user':
      if (isLoggedIn.value) {
        goToByName('AccountManagement', false, '/DataManagement/AccountManagement')
      } else {
        loginModalVisible.value = true
      }
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
  gradientTypes: ['linear'],
  triggerTimes: ['hover'],
})

//路由
const router = useRouter()

//菜单列表
const menus = ref<MenuItem[]>([])

//容器
const container = ref<HTMLElement | null>(null)

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

// 登录模态框状态
const loginModalVisible = ref(false)
const isRegisterMode = ref(false)
// 登录态判断：access token 有效，或者 refresh token 有效（可自动续期）
const isLoggedIn = computed(() => isAccessTokenValid() || isRefreshTokenValid())
const loginForm = reactive<{ username: string; password: string }>({
  username: '',
  password: '',
})

const handleLoginSubmit = async () => {
  if (!loginForm.username || !loginForm.password) {
    message.error('请输入用户名和密码')
    return
  }
  try {
    if (isRegisterMode.value) {
      await postApiUserRegister({ username: loginForm.username, password: loginForm.password })
      message.success('注册成功，请登录')
      isRegisterMode.value = false
    } else {
      const res = await postApiUserLogin({ username: loginForm.username, password: loginForm.password })
      if (res.data) {
        saveTokens(res.data.accessToken, res.data.refreshToken)
        saveUserInfo(res.data.user)
        userStore.setUser({ id: res.data.user.id, username: res.data.user.username })
        message.success('登录成功')
        loginModalVisible.value = false
        loginForm.username = ''
        loginForm.password = ''
        await getMenus()
        goToByName('AccountManagement', false, '/DataManagement/AccountManagement')
      }
    }
  } catch (e: any) {
    message.error(e?.message || (isRegisterMode.value ? '注册失败' : '登录失败'))
  }
}

useDetectDevice((device) => {
  deviceStore.setDevice(device)
})

onMounted(async () => {
  //设置主题
  themeChange(theme.value)

  // 如果 access token 过期但 refresh token 有效，主动刷新 token
  // 实现"只要不主动登出就一直有效"的体验
  if (!isAccessTokenValid() && isRefreshTokenValid()) {
    try {
      const res = await postApiUserRefresh({ refreshToken: getRefreshToken()! })
      if (res.data) {
        saveTokens(res.data.accessToken, res.data.refreshToken)
      }
    } catch {
      // 刷新失败，清除登录态
      clearTokens()
    }
  }

  //获取菜单（先获取菜单再跳转激活的tab，确保路由已注册）
  try {
    await getMenus()
  } catch {
    // 菜单加载失败（如 token 过期被拦截器清空），仍然尝试跳转
  }

  // 获取当前用户信息（用于 admin 权限判断等）
  if (isAccessTokenValid()) {
    try {
      const res = await getApiUserMe()
      if (res?.data) {
        userStore.setUser({ id: res.data.id, username: res.data.username })
      }
    } catch {
      // API 获取失败，从 localStorage 恢复
      const local = getUserInfo()
      if (local) userStore.setUser(local)
    }
  }
  //跳转激活的tab — getMenus() 已遍历 tabList 注册了持久化标签的路由
  //router.push 用 path 匹配，不会走到 catch-all 的 404 页面
  router.push(activeKey.value)
})

//卸载时清空菜单列表
onUnmounted(() => {
  menus.value.length = 0
})

// 平面映射：name → { path, label }
// 解决懒加载菜单树中 findMenuItemByName 找不到未展开菜单项的问题
const routeInfoMap = new Map<string, { path: string; label: string }>()

// 递归将菜单项添加到 routeInfoMap
function addToRouteInfoMap(items: MenuItem[]) {
  for (const item of items) {
    if (item.name && item.path) {
      routeInfoMap.set(item.name, { path: item.path, label: item.label })
    }
    if (item.children?.length) {
      addToRouteInfoMap(item.children)
    }
  }
}

//获取菜单（只加载根菜单，按需加载子菜单）
const getMenus = async () => {
  loading.value = true
  mainViewLoading.value = true
  const { data } = await getApiMenus({ root: 'true', project: 'learning' })
  menus.value = (data as MenuItem[]).map(item => ({ ...item, loading: false }))
  loading.value = false
  mainViewLoading.value = false

  // 将菜单项添加到 routeInfoMap，供 goToByName 查找
  addToRouteInfoMap(menus.value)

  // 注册所有叶子路由（包括 tabList 中已存在的标签对应的路由）
  registerLeafRoutes(menus.value)
  // 遍历 tabList 注册可能存在的叶子路由
  store.tabList.forEach(tab => {
    if (!router.hasRoute(tab.name)) {
      registerRouteByPath(tab.path, tab.name)
    }
  })
}

// 根据 path 和 name 注册路由
function registerRouteByPath(path: string, name: string) {
  const viewPath = path.startsWith('/') ? path : `/${path}`
  if (!router.hasRoute(name) && viewExists(viewPath)) {
    const component = loadViewByPath(viewPath)
    router.addRoute({
      path: viewPath,
      name,
      component,
    })
  }
}

// 递归注册所有叶子菜单的路由
function registerLeafRoutes(menuItems: MenuItem[]) {
  for (const item of menuItems) {
    if (item.isLeaf) {
      registerRouteByPath(item.path, item.name)
    }
    if (item.children?.length) {
      registerLeafRoutes(item.children)
    }
  }
}

// 动态加载子菜单
const loadChildren = async (parentItem: any): Promise<void> => {
  if (parentItem.isLeaf) return
  if (parentItem.children?.length > 0) return // 已有子菜单

  parentItem.loading = true
  try {
    const { data } = await getApiMenus({ parentId: parentItem.id })
    parentItem.children = data as MenuItem[]
    // 将新加载的子菜单同步到 routeInfoMap 并注册叶节点路由
    addToRouteInfoMap(parentItem.children)
    registerLeafRoutes(parentItem.children)
  } catch (e) {
    message.error('加载子菜单失败')
  } finally {
    parentItem.loading = false
  }
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
  if (!value) {
    openKeys.value = []
    // 清空搜索时恢复加载根菜单
    await getMenus()
    return
  }

  // 调用搜索 API
  try {
    const { data } = await getApiMenusSearch({ project: 'learning', search: value })
    if (data && data.matched) {
      // 更新 openKeys（父级菜单路径）
      openKeys.value = data.openKeys
      // 用搜索结果替换菜单树
      menus.value = data.matched as unknown as MenuItem[]
      await nextTick()
      scrollTo(data.selectedKeys[0])
    }
  } catch (e) {
    console.error('搜索失败:', e)
  }
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
function goto({ path, name, label, redirect, isLeaf }: MenuItem) {
  if (path === store.activeKey) {
    return
  }
  //手机端并且折叠状态下点击菜单后折叠菜单 这里重复赋值 主要处理弹出来的菜单后收拢
  if (isMobile && Menucollapsed.value) Menucollapsed.value = true
  if (redirect) {
    goToByName(redirect.name, true, redirect.path)
    return
  }

  // 动态注册路由（仅对叶子菜单生效）
  if (isLeaf) {
    const routeName = name
    // 检查路由是否已注册
    if (!router.hasRoute(routeName)) {
      // 使用 views-loader 动态加载组件
      const viewPath = path.startsWith('/') ? path : `/${path}`
      const component = loadViewByPath(viewPath)
      router.addRoute({
        path: viewPath,
        name: routeName,
        component,
      })
    }
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
// knownPath / knownLabel: 调用方已知的路径和标签（如 redirect 场景），作为兜底
async function goToByName(name: string, isRedirect: boolean = false, knownPath?: string, knownLabel?: string) {
  // 辅助类型：至少需要 name + path + label
  let item: { label: string; name: string; path: string } | undefined

  // 0. 特殊处理 home
  if (name === 'home') {
    item = { label: '首页', name: 'home', path: '/' }
  }

  // 1. 菜单树（已展开的菜单）
  if (!item) {
    const found = findMenuItemByName(menus.value, name)
    if (found) item = { label: found.label, name: found.name, path: found.path }
  }

  // 2. routeInfoMap（曾加载过但父菜单可能已折叠）
  if (!item) {
    const info = routeInfoMap.get(name)
    if (info) item = { label: info.label, name, path: info.path }
  }

  // 3. tabList（曾访问过的标签页，持久化在 localStorage）
  if (!item) {
    const tab = store.tabList.find(t => t.name === name)
    if (tab) item = { label: tab.label, name: tab.name, path: tab.path }
  }

  // 4. 调用方传入的已知路径（如 redirect 场景）
  if (!item && knownPath) {
    item = { label: knownLabel || name, name, path: knownPath }
  }

  // 5. 路由已注册 → 用 router.resolve 反查 path
  if (!item && router.hasRoute(name)) {
    const resolved = router.resolve({ name })
    // resolved.path 可能是 catch-all 兜底值，需验证 name 确实匹配
    if (resolved && resolved.name === name) {
      item = { label: name, name, path: resolved.path }
    }
  }

  // 6. 懒加载兜底：本地缓存未命中时，通过搜索 API 按需查找
  //    不预加载全量菜单，只在需要时请求，结果缓存到 routeInfoMap
  if (!item) {
    try {
      const { data } = await getApiMenusSearch({ project: 'learning', search: name })
      if (data?.selectedKeys?.length) {
        const matchedPath = data.selectedKeys[0]
        // 从搜索结果树中提取 label
        const matchedItem = findMenuItemByName(data.matched as unknown as MenuItem[], name)
        const label = matchedItem?.label || name
        item = { label, name, path: matchedPath }
        // 缓存搜索结果到 routeInfoMap，下次同一菜单无需再请求
        if (data.matched) {
          addToRouteInfoMap(data.matched as unknown as MenuItem[])
        }
        // 展开父级菜单链
        if (data.openKeys?.length) {
          openKeys.value = Array.from(new Set([...openKeys.value, ...data.openKeys]))
        }
      }
    } catch {
      // 搜索失败，继续走报错逻辑
    }
  }

  if (!item) {
    message.error('菜单不存在')
    return
  }

  const { label, path } = item

  // 动态注册路由（如果尚未注册），确保 router.push({ name }) 能匹配到路由
  if (name !== 'home' && !router.hasRoute(name)) {
    registerRouteByPath(path, name)
  }

  mainViewLoading.value = true
  router.push({ name }).then(() => {
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
provide('reloadMenus', getMenus)

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

/* 登录模态框样式 */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-form .form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal-form .form-item label {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.modal-form .toggle-mode {
  align-items: center;
}

.modal-form .toggle-mode span {
  color: var(--color-primary);
  cursor: pointer;
  font-size: 14px;
}
</style>
