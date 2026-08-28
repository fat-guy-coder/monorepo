<template>
  <div ref="container" class="main-view-container">
    <!-- 导航组件示例 -->
    <Navigation position="bottom-right" :offset="{ bottom: '2rem', right: '0.5rem' }" :isMobile="isMobile"
      @item-click="handleNavClick" :items="navItems">
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
          v-model:openKeys="openKeys" :onLoadData="loadChildren" :showContextMenu="userStore.isAdmin"
          @contextmenu="handleMenuContextMenu">
        </Menu>
        <Teleport to="body">
          <div v-if="menuCtxVisible" class="menu-ctx-overlay" @click="closeMenuCtx"></div>
          <div v-if="menuCtxVisible" class="menu-ctx-menu"
            :style="{ top: menuCtxPosition.y + 'px', left: menuCtxPosition.x + 'px' }">
            <div @click.stop="handleMenuEdit">✏️ 编辑</div>
            <div @click.stop="handleMenuAddChild">➕ 新增子菜单</div>
            <div @click.stop="handleMenuStudyTimer">⏱ 学习计时</div>
            <div @click.stop="handleMenuDelete">🗑️ 删除</div>
          </div>
        </Teleport>
      </div>
    </div>
    <MenuFormModal :key="menuFormKey" v-model:visible="menuFormVisible" :mode="menuFormMode" :node="menuFormNode"
      :parentMenuOptions="parentMenuOptions" project="learning" @submit="handleMenuFormSubmit" />
    <div class="content">
      <div class="tabs">
        <RouteTab @tab-click="tabClick" :activeKey="activeKey" :tabList="store.tabList" :nodes="store.nodes"
          :tab-progress="studyProgressByPath" :showContextMenu="showContextMenu" @remove="removeTab" @remove-other="removeOther" @remove-side="removeSide"
          @toggle-show-menu="toggleShowMenu" @drop-tab="onDropTab" @drop-group="onDropGroup"
          @collapse-group="onCollapseGroup" @rename-group="onRenameGroup" @recolor-group="onRecolorGroup"
          @ungroup-group="onUngroupGroup" @close-group="onCloseGroup" @add-tab-new-group="onAddTabNewGroup"
          @add-tab-to-group="onAddTabToGroup" @remove-tab-from-group="onRemoveTabFromGroup">
          <template #contextMenuItems="{ currentKey }">
            <div class="tab-ctx-study" @click.stop="handleTabStudyTimer(currentKey)">⏱ 学习计时</div>
          </template>
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
      <form class="modal-form" @submit.prevent="handleLoginSubmit">
        <div class="form-item">
          <label>用户名</label>
          <input v-model="loginForm.username" name="username" type="text" autocomplete="username" placeholder="请输入用户名"
            class="native-input" />
        </div>
        <div class="form-item">
          <label>密码</label>
          <input v-model="loginForm.password" name="password" type="password" autocomplete="current-password"
            placeholder="请输入密码" class="native-input" />
        </div>
        <div class="form-item toggle-mode">
          <span @click="isRegisterMode = !isRegisterMode">
            {{ isRegisterMode ? '已有账号？去登录' : '没有账号？去注册' }}
          </span>
        </div>
        <button type="submit" style="display:none"></button>
      </form>
    </Modal>

    <!-- 章节学习计时（入口在底部导航 navItems「⏱ 学习计时」，只渲染面板） -->
    <StudyTimer v-model:visible="studyTimerVisible" :menu-options="studyMenuOptions" :menu-id="studyTimerMenu?.id"
      :menu-label="studyTimerMenu?.label" :suggested-minutes="studyAggregate?.suggestedMinutes ?? 0"
      :total-minutes="studyAggregate?.totalMinutes ?? 0" :sessions="studyAggregate?.sessions ?? []"
      :fixed-menu="studyTimerFixed" @select-menu="onStudySelectMenu"
      @update-suggested-minutes="onStudyUpdateSuggestedMinutes" />
  </div>
</template>

<script lang="ts" setup>
//vue编译器会自动引入components目录下的所有组件，但不是异步组件，这一步是为了将所有组件转换为异步组件，以优化初始加载性能
import { Menu, RouteTab, Navigation, Input, Button, Modal, message, Spin, MenuFormModal, StudyTimer, confirm } from 'components'
import { computed, ref, shallowRef, reactive, watch, onMounted, onUnmounted, nextTick, provide } from 'vue'
import {
  type MenuItem, //菜单项类型
  findFatherKeysListByKey, //查找父级菜单key列表
  findMenuItemByName, //查找菜单项 通过name
} from '@/menu'
import { getApiMenus, getApiMenusSearch, postApiMenus, putApiMenusId, deleteApiMenusId, type PostApiMenusRequest, type PutApiMenusIdRequest } from '@/api/menu'
import { getApiMenusIdStudy, postApiStudySessions, type StudyAggregate } from '@/api/study-session'
import { postApiUserLogin, postApiUserRegister, postApiUserRefresh, getApiUserMe } from '@/api/user'
import { saveTokens, saveUserInfo, getAccessToken, isAccessTokenValid, isRefreshTokenValid, getRefreshToken, clearTokens, getUserInfo } from '@/utils/token'
import { useTabStore } from '@/stores/tab' //标签列表store
import { useDeviceStore } from '@/stores/device' //设备信息store
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

//是否是手机端
const isMobile = computed(() => deviceStore.isMobile)

// navItems 动态追加"跳转"项（仅 admin）
// ⏸/▶ 是手动暂停/继续计时开关（跟视频播放/暂停一样）：暂停后去干别的事不算学习时间
const navItems = computed(() => {
  const items = [
    { icon: '⏱', label: '学习计时', value: 'studyTimer' },
    { icon: studyPaused.value ? '▶' : '⏸', label: studyPaused.value ? '继续学习' : '暂停计时', value: 'studyPause' },
    { icon: '👤', label: '用户', value: 'user' },
  ]
  if (userStore.isAdmin) {
    items.push({ icon: '↗️', label: '跳转', value: 'jumpToEditor' })
  }
  return items
})

//铆钉导航
const handleNavClick = (item: NavItem): void => {
  switch (item.value) {
    case 'home':
      goToByName('home')
      break
    case 'studyTimer':
      openStudyTimerFromNav()
      break
    case 'studyPause':
      toggleStudyPause()
      break
    case 'user':
      if (isLoggedIn.value) {
        goToByName('AccountManagement', false, '/DataManagement/AccountManagement')
      } else {
        loginModalVisible.value = true
      }
      break
    case 'jumpToEditor':
      openInCursor()
      break
    default:
      break
  }
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

  // 章节学习自动计时：菜单映射就绪后，若当前激活页签是章节页则开始计时
  syncStudySession()
  // 注册计时兜底事件（窗口隐藏/关闭时结算当前时间段）
  document.addEventListener('visibilitychange', onDocVisibilityChange)
  window.addEventListener('beforeunload', onDocBeforeUnload)
  window.addEventListener('pagehide', onDocBeforeUnload)

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

//卸载时清空菜单列表 + 移除计时兜底事件监听
onUnmounted(() => {
  menus.value.length = 0
  document.removeEventListener('visibilitychange', onDocVisibilityChange)
  window.removeEventListener('beforeunload', onDocBeforeUnload)
  window.removeEventListener('pagehide', onDocBeforeUnload)
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

  // 学习计时下拉选项随菜单刷新
  refreshStudyMenuOptions()
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

//是否显示右键菜单
const showContextMenu = computed(() => store.showContextMenu)

//切换右键菜单显示状态
const toggleShowMenu = (value: boolean) => {
  store.toggleShowMenu(value)
}

// --- 侧边栏菜单右键编辑 ---
const menuCtxVisible = ref(false)
const menuCtxPosition = ref({ x: 0, y: 0 })
const menuCtxItem = ref<MenuItem | null>(null)
const menuFormVisible = ref(false)
const menuFormKey = ref(0)
const menuFormMode = ref<'add' | 'addChild' | 'edit'>('edit')
const menuFormNode = ref<MenuItem | null>(null)

function handleMenuContextMenu({ item, event }: { item: MenuItem; event: MouseEvent }) {
  menuCtxItem.value = item; menuCtxPosition.value = { x: event.clientX, y: event.clientY }; menuCtxVisible.value = true
}
function closeMenuCtx() { menuCtxVisible.value = false }
function handleMenuEdit() {
  closeMenuCtx(); const item = menuCtxItem.value; if (!item) return
  menuFormKey.value++; menuFormMode.value = 'edit'; menuFormNode.value = item; menuFormVisible.value = true
}
function handleMenuAddChild() {
  closeMenuCtx(); const item = menuCtxItem.value; if (!item) return
  menuFormKey.value++; menuFormMode.value = 'addChild'; menuFormNode.value = item; menuFormVisible.value = true
}
async function handleMenuDelete() {
  closeMenuCtx(); const item = menuCtxItem.value; if (!item) return
  const ok = await confirm({ title: '删除确认', message: `确定要删除菜单"${item.label}"吗？`, confirmText: '删除', cancelText: '取消', confirmType: 'danger' })
  if (!ok) return
  try { await deleteApiMenusId(item.id); message.success('删除成功'); await getMenus() } catch { message.error('删除失败') }
}
interface MenuFormSubmitData { id?: string; name: string; label: string; order: number; project: string; parentId: string; suggestedMinutes?: number }
async function handleMenuFormSubmit(data: MenuFormSubmitData) {
  if (!data.label) { message.error('请输入菜单名称'); return }
  if (!data.name) { message.error('请输入英文名称'); return }
  try {
    if (menuFormMode.value === 'edit' && data.id) {
      await putApiMenusId(data.id, { name: data.name, label: data.label, order: data.order, project: data.project, parentId: data.parentId, suggestedMinutes: data.suggestedMinutes ?? 0 })
      message.success('更新成功')
    } else {
      await postApiMenus({ name: data.name, label: data.label, order: data.order, project: data.project, parentId: data.parentId, suggestedMinutes: data.suggestedMinutes ?? 0 })
      message.success('创建成功')
    }
    menuFormVisible.value = false; await getMenus()
  } catch { message.error('操作失败') }
}
const parentMenuOptions = computed(() => {
  const flatten = (nodes: MenuItem[], level = 0): { label: string; value: string; path?: string }[] => {
    const result: { label: string; value: string; path?: string }[] = []
    for (const node of nodes) {
      result.push({ label: '　'.repeat(level) + node.label, value: node.id, path: node.path })
      if (node.children?.length) result.push(...flatten(node.children, level + 1))
    }
    return result
  }
  return [{ label: '根目录', value: '', path: '' }, ...flatten(menus.value)]
})

// ============ 章节学习计时 ============
const studyTimerVisible = ref(false)
const studyTimerFixed = ref(false) // 章节已确定（右键进入）→ 面板隐藏章节选择，直接计时
const studyTimerMenu = ref<{ id: string; label: string; suggestedMinutes: number } | null>(null)
const studyAggregate = ref<StudyAggregate | null>(null)

// 章节下拉选项：一次性拉全量扁平菜单（含所有叶子章节），不依赖侧边栏是否展开过
const studyMenuOptions = ref<{ value: string; label: string }[]>([])
// 全量章节元信息（同一份 flat 拉取构建，保证下拉/悬浮球/Tab 右键查得到任意章节）：
//   id → { id, label, suggestedMinutes, studiedMinutes, path }   供下拉选中后反查
//   path → 同上                                                   供悬浮球/Tab 右键按 path 反查
// 页签进度（path → 已学/建议）：shallowRef 整体替换，避免对几千条做深响应式
const studyProgressByPath = shallowRef<Record<string, { studiedMinutes: number; suggestedMinutes: number }>>({})
const studyMenuInfoById = new Map<string, { id: string; label: string; suggestedMinutes: number; studiedMinutes: number; path: string }>()
const studyMenuInfoByPath = new Map<string, { id: string; label: string; suggestedMinutes: number; studiedMinutes: number; path: string }>()
async function refreshStudyMenuOptions() {
  try {
    const { data } = await getApiMenus({ flat: 'true', project: 'learning' })
    const list = ((data || []) as MenuItem[]).map(m => ({
      id: m.id,
      label: m.label,
      suggestedMinutes: m.suggestedMinutes || 0,
      studiedMinutes: m.studiedMinutes || 0,
      path: m.path || '',
    }))
    studyMenuOptions.value = list.map(m => ({ value: m.id, label: m.label }))
    studyMenuInfoById.clear()
    studyMenuInfoByPath.clear()
    const progressMap: Record<string, { studiedMinutes: number; suggestedMinutes: number }> = {}
    for (const m of list) {
      const info = { id: m.id, label: m.label, suggestedMinutes: m.suggestedMinutes, studiedMinutes: m.studiedMinutes, path: m.path }
      studyMenuInfoById.set(m.id, info)
      if (m.path) {
        studyMenuInfoByPath.set(m.path, info)
        progressMap[m.path] = { studiedMinutes: m.studiedMinutes, suggestedMinutes: m.suggestedMinutes }
      }
    }
    studyProgressByPath.value = progressMap
  } catch {
    studyMenuOptions.value = []
  }
}

// 页签进度本地递增（结算一段后立即反映到页签进度条，不必重拉几千条扁平菜单）
function bumpStudyProgress(menuId: string, minutes: number) {
  const entry = studyMenuInfoById.get(menuId)
  if (!entry || !entry.path) return
  const progressMap = { ...studyProgressByPath.value }
  const cur = progressMap[entry.path] || { studiedMinutes: entry.studiedMinutes, suggestedMinutes: entry.suggestedMinutes }
  progressMap[entry.path] = {
    studiedMinutes: (cur.studiedMinutes || 0) + minutes,
    suggestedMinutes: cur.suggestedMinutes || 0,
  }
  studyProgressByPath.value = progressMap
}

// 侧边栏菜单树已学时长本地递增（并向上累加父章节 = 子树总和），菜单行进度条即时可见
function bumpMenuTreeProgress(menuId: string, minutes: number) {
  const walk = (nodes: MenuItem[], ancestors: MenuItem[]): boolean => {
    for (const n of nodes) {
      if (n.id === menuId) {
        n.studiedMinutes = (Number(n.studiedMinutes ?? 0) || 0) + minutes
        for (const a of ancestors) {
          a.studiedMinutes = (Number(a.studiedMinutes ?? 0) || 0) + minutes
        }
        return true
      }
      if (n.children?.length && walk(n.children, [...ancestors, n])) return true
    }
    return false
  }
  walk(menus.value, [])
}

async function refreshStudyAggregate(menuId: string) {
  try {
    const { data } = await getApiMenusIdStudy(menuId)
    studyAggregate.value = data
  } catch {
    studyAggregate.value = null
  }
}

// 打开计时面板（侧边栏菜单右键 / Tab 右键共用的入口）
// 右键进入时章节已确定 → 锁定章节（fixed），面板直接显示计时，不再让用户选章节
function openStudyTimer(menu: { id: string; label: string; suggestedMinutes: number }) {
  studyTimerMenu.value = menu
  studyTimerFixed.value = true
  studyTimerVisible.value = true
  // fixed 模式不显示下拉；映射/下拉选项由 getMenus() 初始化，无需每次重拉全量 flat 菜单
  refreshStudyAggregate(menu.id)
}

// 底部导航「⏱ 学习计时」→ 优先锁定「当前激活 tab」的章节直接计时；非章节页面才回退到选章节模式
function openStudyTimerFromNav() {
  studyTimerVisible.value = true
  const info = activeKey.value ? studyMenuInfoByPath.get(activeKey.value) : undefined
  if (info) {
    openStudyTimer(info)
  } else {
    studyTimerFixed.value = false
    refreshStudyMenuOptions()
  }
}

// 侧边栏菜单右键「⏱ 学习计时」
function handleMenuStudyTimer() {
  const item = menuCtxItem.value
  closeMenuCtx()
  if (!item) return
  if (!item.id) { message.warning('该菜单无 ID，无法计时'); return }
  openStudyTimer({ id: item.id, label: item.label || item.name || '未命名', suggestedMinutes: item.suggestedMinutes || 0 })
}

// Tab 右键「⏱ 学习计时」（path 反查章节信息）
function handleTabStudyTimer(path: string) {
  const info = studyMenuInfoByPath.get(path)
  if (!info) {
    message.warning('该页面不是章节页面，无法计时')
    return
  }
  openStudyTimer(info)
}

// 面板内切换章节 → 用全量映射反查章节信息 + 拉取该章节学习统计
async function onStudySelectMenu(menuId: string) {
  const entry = studyMenuInfoById.get(menuId) || null
  studyTimerMenu.value = entry
  await refreshStudyAggregate(menuId)
}

// ============ 章节学习自动计时 ============
// 打开章节（激活页签）→ 记开始；切换/关闭页签、切走窗口 → 记结束并结算一条记录。
// 同章多段自动累加 = 已学时间，无需手动录入。
const studySessionCurrent = ref<{ menuId: string; startedAt: string } | null>(null)
// 手动暂停（底部导航 ⏸/▶）：人在但不想计时（去厕所/打把游戏）→ 暂停后不再自动计时，点 ▶ 恢复
const studyPaused = ref(false)

// 结束当前段落（fetch 结算；成功后若计时面板正展示该章节则回刷聚合）
async function endStudySession() {
  const cur = studySessionCurrent.value
  studySessionCurrent.value = null
  if (!cur) return
  const endedAt = new Date().toISOString()
  const ms = new Date(endedAt).getTime() - new Date(cur.startedAt).getTime()
  if (ms < 60000) return // 不足 1 分钟不算一段（防抖）
  try {
    const res = await postApiStudySessions({ menuId: cur.menuId, startedAt: cur.startedAt, endedAt })
    const duration = Number(res?.data?.durationMinutes ?? 0)
    if (duration > 0) {
      // 页签进度条 + 侧边栏菜单行进度条即时递增
      bumpStudyProgress(cur.menuId, duration)
      bumpMenuTreeProgress(cur.menuId, duration)
    }
    if (studyTimerVisible.value && studyTimerMenu.value?.id === cur.menuId) {
      await refreshStudyAggregate(cur.menuId)
    }
  } catch {
    // 静默失败，不打断用户
  }
}

// 关闭页面/切走窗口兜底结算：sendBeacon 在 unload 阶段也能送达（fetch 可能被浏览器取消）
function flushStudySessionOnUnload() {
  const cur = studySessionCurrent.value
  studySessionCurrent.value = null
  if (!cur) return
  const endedAt = new Date().toISOString()
  const ms = new Date(endedAt).getTime() - new Date(cur.startedAt).getTime()
  if (ms < 60000) return
  try {
    const base = (import.meta.env.VITE_BASE_API as string) || ''
    navigator.sendBeacon(
      `${base}/api/study-sessions`,
      new Blob([JSON.stringify({ menuId: cur.menuId, startedAt: cur.startedAt, endedAt })], { type: 'application/json' }),
    )
  } catch {
    // 忽略
  }
}

// 按当前激活页签同步计时：章节页 → 开始/续记；非章节页（首页/登录等）→ 结束
function syncStudySession() {
  if (studyPaused.value) {
    // 手动暂停中：不开启新段落（若之前仍在计时则结算掉），保持暂停
    endStudySession()
    return
  }
  const info = activeKey.value ? studyMenuInfoByPath.get(activeKey.value) : undefined
  if (info) {
    if (studySessionCurrent.value?.menuId === info.id) return // 已在记该章节，不重启
    endStudySession()
    studySessionCurrent.value = { menuId: info.id, startedAt: new Date().toISOString() }
  } else {
    endStudySession()
  }
}

// 手动暂停/继续（底部导航 ⏸/▶，跟视频播放/暂停一样）：
//   暂停 → 结算当前段落并停止自动计时；继续 → 若当前在章节页立即开新一段
function toggleStudyPause() {
  studyPaused.value = !studyPaused.value
  if (studyPaused.value) {
    endStudySession()
  } else {
    syncStudySession()
  }
}

// 页面可见性变化：切走/关闭 → 结算；回到页面 → 恢复计时
function onDocVisibilityChange() {
  if (document.hidden) {
    flushStudySessionOnUnload()
  } else {
    syncStudySession()
  }
}
function onDocBeforeUnload() {
  flushStudySessionOnUnload()
}

// 页签切换（点菜单/点页签都会激活对应 key）→ 自动结算上一段、开启新一段
watch(activeKey, () => syncStudySession())

// 计时弹窗里编辑「建议时长」→ PUT 菜单落库 + 回刷聚合
// 面板显示走 studyAggregate（GET /api/menus/:id/study 实时读库），改单个菜单无需重拉全量 flat 菜单（几千条）
async function onStudyUpdateSuggestedMinutes(value: number) {
  const menu = studyTimerMenu.value
  if (!menu) return
  try {
    await putApiMenusId(menu.id, { suggestedMinutes: value })
    message.success('已更新建议时长')
    studyTimerMenu.value = { ...menu, suggestedMinutes: value }
    // 同步页签进度条的建议值（已学不变），菜单行在下次拉取菜单时更新
    const entry = studyMenuInfoById.get(menu.id)
    if (entry?.path) {
      const progressMap = { ...studyProgressByPath.value }
      const cur = progressMap[entry.path] || { studiedMinutes: entry.studiedMinutes, suggestedMinutes: 0 }
      progressMap[entry.path] = { studiedMinutes: cur.studiedMinutes || 0, suggestedMinutes: value }
      studyProgressByPath.value = progressMap
    }
    await refreshStudyAggregate(menu.id)
  } catch {
    message.error('更新建议时长失败')
  }
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

// --- 标签分组相关 ---
function onDropTab({ tabPath, groupId, beforePath }: { tabPath: string; groupId: string | null; beforePath: string | null }) {
  store.moveTab(tabPath, { groupId, beforePath })
}
function onDropGroup({ groupId, beforeKey }: { groupId: string; beforeKey: string | null }) {
  store.moveGroup(groupId, beforeKey)
}
function onCollapseGroup({ groupId, collapsed }: { groupId: string; collapsed: boolean }) {
  store.setGroupCollapsed(groupId, collapsed)
}
function onAddTabNewGroup(tabPath: string) {
  store.createGroup([tabPath])
}
function onAddTabToGroup(tabPath: string, groupId: string) {
  store.addTabsToGroup([tabPath], groupId)
}
function onRemoveTabFromGroup(tabPath: string) {
  store.removeTabFromGroup(tabPath)
}

// 组右键菜单动作（菜单本身在 RouteTab 内部，这里只接事件操作 store）
function onRenameGroup(groupId: string, name: string) {
  store.renameGroup(groupId, name)
}
function onRecolorGroup(groupId: string, color: string) {
  store.recolorGroup(groupId, color)
}
function onUngroupGroup(groupId: string) {
  store.ungroup(groupId)
}
function onCloseGroup(groupId: string) {
  store.closeGroup(groupId)
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

// 打开当前页面对应的 .vue 文件到 Cursor 编辑器
function openInCursor() {
  const routePath = router.currentRoute.value.path
  if (routePath === '/') return
  const vuePath = routePath.replace(/^\//, '')
  const filePath = `apps/learning/src/views/${vuePath}.vue`
  const root = (import.meta as any).env.VITE_WORKSPACE_ROOT || ''
  const fullPath = root ? `${root.replace(/[/\\]$/, '')}/${filePath}` : filePath
  location.href = `cursor://file/${fullPath.replace(/\\/g, '/')}`
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

.native-input {
  width: 100%;
  height: 2rem;
  padding: 0 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--element-border-radius, 6px);
  background: var(--color-bg-container);
  color: var(--color-text);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.native-input:focus {
  border-color: var(--color-primary);
  box-shadow: var(--box-shadow-hover);
}

.native-input::placeholder {
  color: var(--color-text-quaternary);
}

.menu-ctx-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
}

/* RouteTab 右键菜单里的「学习计时」项（slot 内容，App.vue 自绘样式） */
.tab-ctx-study {
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-size: var(--font-size-xs);
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  color: var(--color-text);

  &:hover {
    background-color: var(--color-background-soft);
    color: var(--color-primary);
    transform: translate(1px, 1px);
  }
}

.menu-ctx-menu {
  position: fixed;
  z-index: 1000;
  background: var(--color-background);
  border: var(--border-width) solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
  min-width: 8rem;
  overflow: hidden;

  div {
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: var(--font-size-xs);

    &:hover {
      background: var(--color-background-soft);
      color: var(--color-primary);
    }
  }
}
</style>
