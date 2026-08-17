import { computed, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { GROUP_COLORS, type Tab, type TabGroup, type TabNode } from 'components'

// 生成唯一 id
function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

// 从 localStorage 加载，兼容旧扁平格式 { list, key }
function loadInitial(): { nodes: TabNode[]; key: string } {
  const fallback = {
    nodes: [{ type: 'tab', name: 'home', path: '/', label: '🏡 主页' } as TabNode],
    key: '/',
  }
  const raw = localStorage.getItem('tab')
  if (!raw) return fallback
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed.nodes)) {
      return { nodes: parsed.nodes, key: parsed.key ?? '/' }
    }
    // 旧格式 { list, key } → 全部视为无组 tab
    const nodes: TabNode[] = (parsed.list ?? []).map((t: any) => ({ type: 'tab', ...t }))
    return { nodes, key: parsed.key ?? '/' }
  } catch {
    return fallback
  }
}

export const useTabStore = defineStore('tab', () => {
  const { nodes: initNodes, key: initKey } = loadInitial()

  // 标签条有序节点：tab 或 group
  const nodes = ref<TabNode[]>(initNodes)
  // 激活标签的 path
  const activeKey = ref<string>(initKey)

  // 扁平化的全部标签（视觉顺序），供只读消费方使用（路由注册、跳转查找、滚动定位）
  const tabList = computed<Tab[]>(() =>
    nodes.value.flatMap((n) => (n.type === 'group' ? n.tabs : [n])),
  )

  // ============================================
  // 内部 helper
  // ============================================

  // 定位某个 tab 所在位置
  function findTab(path: string): { node: Tab; group: TabGroup | null; tabIndex: number } | null {
    for (const n of nodes.value) {
      if (n.type === 'group') {
        const tabIndex = n.tabs.findIndex((t) => t.path === path)
        if (tabIndex !== -1) return { node: n.tabs[tabIndex], group: n, tabIndex }
      } else if (n.path === path) {
        return { node: n, group: null, tabIndex: 0 }
      }
    }
    return null
  }

  // 从任意位置移除某个 tab（无组或组内），返回被移除的 tab
  function spliceTabOut(path: string): Tab | null {
    for (const n of nodes.value) {
      if (n.type === 'group') {
        const i = n.tabs.findIndex((t) => t.path === path)
        if (i !== -1) return n.tabs.splice(i, 1)[0] ?? null
      }
    }
    const topIndex = nodes.value.findIndex((n) => n.type === 'tab' && n.path === path)
    if (topIndex !== -1) {
      const [removed] = nodes.value.splice(topIndex, 1)
      return (removed as Tab) ?? null
    }
    return null
  }

  // 清理空组
  function pruneEmptyGroups() {
    nodes.value = nodes.value.filter((n) => !(n.type === 'group' && n.tabs.length === 0))
  }

  // 激活 tab 被删除时，选中它的前一个（安全兜底 home）
  function activatePrev(path: string): string {
    const flat = tabList.value
    const i = flat.findIndex((t) => t.path === path)
    return (flat[i - 1] ?? flat[0] ?? { path: '/' }).path
  }

  // ============================================
  // 激活 / 移除（签名不变，内部改节点树）
  // ============================================

  function activateTab(
    { path, name, label }: { path: string; name: string; label: string },
    callback?: (path: string) => void,
  ) {
    if (activeKey.value === path) return
    activeKey.value = path
    if (!tabList.value.some((i) => i.path === path)) {
      nodes.value.push({ type: 'tab', path, name, label })
    }
    if (callback) callback(path)
  }

  function activateTabOnlyKey(path: string, callback?: (path: string) => void) {
    if (activeKey.value === path) return
    activeKey.value = path
    if (callback) callback(path)
  }

  function removeTab(path: string, callback?: (path: string) => void) {
    if (activeKey.value === path) {
      const next = activatePrev(path)
      activeKey.value = next
      if (callback) callback(next)
    }
    spliceTabOut(path)
    pruneEmptyGroups()
  }

  function removeOther(path: string, callback?: (path: string) => void) {
    activeKey.value = path
    const keep = (p: string) => p === path || p === '/'
    nodes.value = nodes.value
      .map((n) => (n.type === 'group' ? { ...n, tabs: n.tabs.filter((t) => keep(t.path)) } : n))
      .filter((n) => (n.type === 'group' ? n.tabs.length > 0 : keep(n.path)))
    if (callback) callback(path)
  }

  function removeSide(
    index: number,
    side: 'left' | 'right',
    targetKey: string,
    callback?: (path: string) => void,
  ) {
    const flat = tabList.value
    const keepSet = new Set<string>()
    flat.forEach((t, i) => {
      const keep = side === 'left' ? i >= index || i === 0 : i <= index
      if (keep) keepSet.add(t.path)
    })
    nodes.value = nodes.value
      .map((n) => (n.type === 'group' ? { ...n, tabs: n.tabs.filter((t) => keepSet.has(t.path)) } : n))
      .filter((n) => (n.type === 'group' ? n.tabs.length > 0 : keepSet.has(n.path)))
    activeKey.value = targetKey
    if (callback) callback(targetKey)
  }

  function setScrollTop(scrollTop: number, currentKey: string) {
    const tab = tabList.value.find((i) => i.path === currentKey)
    if (tab) tab.scrollTop = scrollTop
  }

  // ============================================
  // 组动作
  // ============================================

  // 把这些 tab 从原位置抽出，新建组并追加到顶层
  function createGroup(tabPaths: string[], label?: string, color?: string) {
    const tabs = tabPaths.map((p) => spliceTabOut(p)).filter((t): t is Tab => !!t)
    if (!tabs.length) return
    pruneEmptyGroups()
    nodes.value.push({
      type: 'group',
      id: uid(),
      label: label ?? '新分组',
      color: color ?? GROUP_COLORS[Math.floor(Math.random() * GROUP_COLORS.length)],
      collapsed: false,
      tabs,
    })
  }

  // 把若干 tab 移入已有组
  function addTabsToGroup(tabPaths: string[], groupId: string) {
    const group = nodes.value.find((n) => n.type === 'group' && n.id === groupId) as TabGroup | undefined
    if (!group) return
    for (const p of tabPaths) {
      const t = spliceTabOut(p)
      if (t) group.tabs.push(t)
    }
    pruneEmptyGroups()
  }

  // 把 tab 从组中移出（落到该组之后）
  function removeTabFromGroup(tabPath: string) {
    const found = findTab(tabPath)
    if (!found || !found.group) return
    const tab = found.group.tabs.splice(found.tabIndex, 1)[0]
    if (!tab) return
    const groupIndex = nodes.value.findIndex((n) => n.type === 'group' && n.id === found.group!.id)
    nodes.value.splice(groupIndex + 1, 0, tab)
    pruneEmptyGroups()
  }

  // 移动 tab 到目标组（groupId=null 表示移出到顶层）内 beforePath 之前；beforePath 为 null 表示插入末尾
  function moveTab(
    tabPath: string,
    { groupId, beforePath }: { groupId: string | null; beforePath: string | null },
  ) {
    const tab = spliceTabOut(tabPath)
    if (!tab) return
    pruneEmptyGroups()

    if (groupId === null) {
      // beforePath 可能指向顶层 tab 的 path，也可能指向顶层 group 的 id
      const anchor = beforePath
        ? nodes.value.findIndex(
            (n) => (n.type === 'group' && n.id === beforePath) || (n.type === 'tab' && n.path === beforePath),
          )
        : -1
      const idx = anchor === -1 ? nodes.value.length : anchor
      nodes.value.splice(idx, 0, tab)
    } else {
      const group = nodes.value.find((n) => n.type === 'group' && n.id === groupId) as TabGroup | undefined
      if (!group) {
        nodes.value.push(tab)
        return
      }
      const anchor = beforePath ? group.tabs.findIndex((t) => t.path === beforePath) : -1
      const idx = anchor === -1 ? group.tabs.length : anchor
      group.tabs.splice(idx, 0, tab)
    }
  }

  // 移动整个组到顶层 beforeKey 之前；beforeKey 为 null 表示插入末尾
  function moveGroup(groupId: string, beforeKey: string | null) {
    const gi = nodes.value.findIndex((n) => n.type === 'group' && n.id === groupId)
    if (gi === -1) return
    const [group] = nodes.value.splice(gi, 1)
    let idx = nodes.value.length
    if (beforeKey) {
      const anchor = nodes.value.findIndex(
        (n) => (n.type === 'group' && n.id === beforeKey) || (n.type === 'tab' && n.path === beforeKey),
      )
      if (anchor !== -1) idx = anchor
    }
    nodes.value.splice(idx, 0, group)
  }

  function setGroupCollapsed(groupId: string, collapsed: boolean) {
    const group = nodes.value.find((n) => n.type === 'group' && n.id === groupId) as TabGroup | undefined
    if (group) group.collapsed = collapsed
  }

  // 解散组：组内 tab 以原顺序落到该组所在位置
  function ungroup(groupId: string) {
    const gi = nodes.value.findIndex((n) => n.type === 'group' && n.id === groupId)
    if (gi === -1) return
    const group = nodes.value[gi] as TabGroup
    const tabs = group.tabs
    nodes.value.splice(gi, 1, ...tabs)
  }

  function renameGroup(groupId: string, label: string) {
    const group = nodes.value.find((n) => n.type === 'group' && n.id === groupId) as TabGroup | undefined
    if (group) group.label = label
  }

  function recolorGroup(groupId: string, color: string) {
    const group = nodes.value.find((n) => n.type === 'group' && n.id === groupId) as TabGroup | undefined
    if (group) group.color = color
  }

  function closeGroup(groupId: string) {
    nodes.value = nodes.value.filter((n) => !(n.type === 'group' && n.id === groupId))
  }

  // ============================================
  // 右键菜单状态
  // ============================================
  const showContextMenu = ref(false)

  function toggleShowMenu(value: boolean) {
    showContextMenu.value = value
  }

  onMounted(() => {
    useTabStore().$subscribe(() => {
      localStorage.setItem('tab', JSON.stringify({ nodes: nodes.value, key: activeKey.value }))
    }, { flush: 'sync' })
  })

  return {
    nodes,
    tabList,
    activeKey,
    activateTab,
    activateTabOnlyKey,
    removeTab,
    removeOther,
    removeSide,
    setScrollTop,
    createGroup,
    addTabsToGroup,
    removeTabFromGroup,
    moveTab,
    moveGroup,
    setGroupCollapsed,
    ungroup,
    renameGroup,
    recolorGroup,
    closeGroup,
    showContextMenu,
    toggleShowMenu,
  }
})
