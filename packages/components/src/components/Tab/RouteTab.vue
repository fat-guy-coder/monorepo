<template>
  <div class="menu-list" id="context-menu" :style="{
    top: `${position.Y}px`,
    left: `${position.X}px`,
    height: showContextMenu ? 'auto' : '0px',
  }">
    <div v-if="currentKey !== '/' && currentKey !== '/home'" @click.stop="closeCurrent">关闭</div>
    <div @click.stop="closeAll(currentKey)">关闭其他</div>
    <div @click.stop="closeSide(currentIndex, 'left', currentKey)">关闭左侧</div>
    <div @click.stop="closeSide(currentIndex, 'right', currentKey)">关闭右侧</div>
    <template v-if="isGroupMode">
      <div @click.stop="addNewGroup">➕ 新建分组</div>
      <template v-if="groups.length">
        <div class="menu-sub">移入分组</div>
        <div v-for="g in groups" :key="g.id" @click.stop="addToGroup(g.id)">　{{ g.label }}</div>
      </template>
      <div v-if="currentTabInGroup" @click.stop="removeFromGroup">↩ 移出分组</div>
    </template>
    <slot name="contextMenuItems"></slot>
  </div>

  <!-- 拖拽插入指示线 -->
  <Teleport to="body">
    <div v-if="indicator" class="tab-drop-indicator" :style="{
      left: indicator.x + 'px',
      top: indicator.top + 'px',
      height: indicator.height + 'px',
    }"></div>
  </Teleport>

  <!-- 组右键菜单 -->
  <Teleport to="body">
    <div v-if="groupCtx" class="tab-group-ctx-overlay" @click="groupCtx = null"></div>
    <div v-if="groupCtx" class="tab-group-ctx-menu" :style="{ top: groupCtx.y + 'px', left: groupCtx.x + 'px' }">
      <div @click.stop="startRename(groupCtx.groupId)">✏️ 重命名</div>
      <div class="tab-group-color-row" @click.stop>
        <span v-for="c in GROUP_COLORS" :key="c" class="tab-group-color-dot" :style="{ background: c }"
          @click.stop="recolorFromMenu(groupCtx.groupId, c)"></span>
      </div>
      <div @click.stop="collapseFromMenu(groupCtx.groupId)">▾ 折叠/展开</div>
      <div @click.stop="ungroupFromMenu(groupCtx.groupId)">🔓 取消分组</div>
      <div @click.stop="closeGroupFromMenu(groupCtx.groupId)">🗑️ 关闭组</div>
    </div>
  </Teleport>

  <Tabs @change="TabClick" :activeKey="activeKey" :type="type" :tabBarStyle="{ margin: '0 5px' }" @close="removeTab"
    @dragover="onStripDragOver" @drop="onStripDrop" @dragleave="onStripDragLeave">
    <template v-for="item in renderItems" :key="itemKey(item)">
      <!-- 组头 -->
      <div v-if="item.kind === 'group'" class="tab-group" :data-group-id="item.group.id" draggable="true"
        @click.stop="toggleGroup(item.group.id)" @contextmenu.prevent.stop="openGroupMenu(item.group.id, $event)"
        @dragstart="onGroupDragStart(item.group.id, $event)" @dragend="onDragEnd">
        <span class="tab-group-arrow">{{ item.group.collapsed ? '▸' : '▾' }}</span>
        <span class="tab-group-dot" :style="{ background: item.group.color }"></span>
        <span v-if="renamingGroupId !== item.group.id" class="tab-group-label">{{ item.group.label }}</span>
        <input v-else class="tab-group-input" :value="item.group.label" @click.stop @keydown="onRenameKeydown"
          @blur="onRenameBlur(item.group.id, $event)" />
        <span v-if="item.group.collapsed" class="tab-group-count">{{ item.group.tabs.length }}</span>
        <span v-if="groupContainsActive(item.group)" class="tab-group-active-dot"></span>
      </div>
      <!-- tab -->
      <TabPane v-else :closable="item.tab.path !== '/' && item.tab.path !== '/home'" :path="item.tab.path"
        :group-color="item.groupColor">
        <template #tab>
          <div @click.right.prevent.stop="openMenu(item.tab.path, $event)" :data-id="item.tab.path"
            :data-group-id="item.groupId" class="tab-item" :draggable="item.tab.path !== '/'"
            @dragstart="onTabDragStart(item.tab.path, item.groupId, $event)" @dragend="onDragEnd">
            {{ item.tab.label }}
          </div>
        </template>
      </TabPane>
    </template>
  </Tabs>
</template>
<script lang="ts" setup>
// 组合式 API 逻辑
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import Tabs from './index.vue'
import TabPane from './TabPane.vue'
import { GROUP_COLORS, type Tab, type TabGroup, type TabNode } from './types'


const props = defineProps<{
  tabList: { path: string; label: string }[]
  activeKey: string
  showContextMenu: boolean
  currentDragIndex?: number
  keyMap?: 'path'
  type?: 'line' | 'card' | 'editable-card'
  nodes?: TabNode[]
}>()

const emit = defineEmits([
  'tabClick',
  'remove',
  'removeOther',
  'removeSide',
  'toggleShowMenu',
  'sortTab',
  'setCurrentDragIndex',
  'drop-tab',
  'drop-group',
  'collapse-group',
  'rename-group',
  'recolor-group',
  'ungroup-group',
  'close-group',
  'add-tab-new-group',
  'add-tab-to-group',
  'remove-tab-from-group',
])

function TabClick(item: unknown) {
  emit('tabClick', item)
}


const position = ref({ X: 0, Y: 0 })

const lastKey = ref('')

const currentKey = ref('')

const currentIndex = ref(0)

// 是否分组模式（传了 nodes 才启用）
const isGroupMode = computed(() => !!props.nodes)

// 归一化节点：分组模式用 nodes，扁平模式由 tabList 推导
const renderNodes = computed<TabNode[]>(() => {
  if (props.nodes) return props.nodes
  return props.tabList.map((t) => ({ type: 'tab', name: t.path, path: t.path, label: t.label }) as TabNode)
})

type RenderItem =
  | { kind: 'group'; group: TabGroup; topIndex: number }
  | { kind: 'tab'; tab: Tab; groupId: string | null; groupColor: string | null; containerIndex: number; topIndex: number }

// 扁平化的渲染序列（组头 + 可见 tab 交错）
const renderItems = computed<RenderItem[]>(() => {
  const items: RenderItem[] = []
  renderNodes.value.forEach((n, topIndex) => {
    if (n.type === 'group') {
      items.push({ kind: 'group', group: n, topIndex })
      if (!n.collapsed) {
        n.tabs.forEach((tab, containerIndex) => {
          items.push({ kind: 'tab', tab, groupId: n.id, groupColor: n.color, containerIndex, topIndex })
        })
      }
    } else {
      items.push({ kind: 'tab', tab: n, groupId: null, groupColor: null, containerIndex: 0, topIndex })
    }
  })
  return items
})

function itemKey(item: RenderItem): string {
  return item.kind === 'group' ? 'group:' + item.group.id : 'tab:' + item.tab.path
}

// 扁平 tab 序号（供 removeSide / 扁平排序使用）
function flatTabIndex(path: string): number {
  return props.tabList.findIndex((t) => t.path === path)
}

const groups = computed<TabGroup[]>(() =>
  props.nodes ? (props.nodes.filter((n) => n.type === 'group') as TabGroup[]) : [],
)

const currentTabInGroup = computed(() =>
  !!currentKey.value && !!props.nodes && props.nodes.some((n) => n.type === 'group' && n.tabs.some((t) => t.path === currentKey.value)),
)

function groupContainsActive(group: TabGroup): boolean {
  return group.tabs.some((t) => t.path === props.activeKey)
}

function nodeKey(n: TabNode): string {
  return n.type === 'group' ? n.id : n.path
}

//openMenu
const openMenu = (targetKey: string, e: MouseEvent) => {
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
    emit('toggleShowMenu', !props.showContextMenu)
  }
  position.value = { X: e.clientX, Y: e.clientY }
  currentIndex.value = flatTabIndex(targetKey)
}

// --- 组右键菜单 + 内联重命名 ---
const groupCtx = ref<{ groupId: string; x: number; y: number } | null>(null)
const renamingGroupId = ref<string | null>(null)
let cancelRenameFlag = false

const openGroupMenu = (groupId: string, e: MouseEvent) => {
  groupCtx.value = { groupId, x: e.clientX, y: e.clientY }
}

function startRename(groupId: string) {
  renamingGroupId.value = groupId
  groupCtx.value = null
  nextTick(() => {
    const input = document.querySelector<HTMLInputElement>('.tab-group-input')
    input?.focus()
    input?.select()
  })
}

function onRenameKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    ; (e.target as HTMLInputElement).blur()
  } else if (e.key === 'Escape') {
    cancelRenameFlag = true
      ; (e.target as HTMLInputElement).blur()
  }
}

function onRenameBlur(groupId: string, e: FocusEvent) {
  const value = (e.target as HTMLInputElement).value.trim()
  renamingGroupId.value = null
  if (!cancelRenameFlag && value) emit('rename-group', groupId, value)
  cancelRenameFlag = false
}

function recolorFromMenu(groupId: string, color: string) {
  emit('recolor-group', groupId, color)
  groupCtx.value = null
}

function collapseFromMenu(groupId: string) {
  toggleGroup(groupId)
  groupCtx.value = null
}

function ungroupFromMenu(groupId: string) {
  emit('ungroup-group', groupId)
  groupCtx.value = null
}

function closeGroupFromMenu(groupId: string) {
  emit('close-group', groupId)
  groupCtx.value = null
}

const toggleGroup = (groupId: string) => {
  const group = (props.nodes || []).find((n) => n.type === 'group' && n.id === groupId) as TabGroup | undefined
  if (group) emit('collapse-group', { groupId, collapsed: !group.collapsed })
}

const addNewGroup = () => {
  if (currentKey.value) emit('add-tab-new-group', currentKey.value)
  emit('toggleShowMenu', false)
}
const addToGroup = (groupId: string) => {
  if (currentKey.value) emit('add-tab-to-group', currentKey.value, groupId)
  emit('toggleShowMenu', false)
}
const removeFromGroup = () => {
  if (currentKey.value) emit('remove-tab-from-group', currentKey.value)
  emit('toggleShowMenu', false)
}


const removeTab = (path: string) => {
  emit('remove', path)
}

// 右键菜单「关闭」= 点击 x 图标：关闭当前 tab
const closeCurrent = () => {
  if (currentKey.value) emit('remove', currentKey.value)
  emit('toggleShowMenu', false)
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
// 拖拽（浏览器式：横向插入指示线 + 落点提交 + FLIP）
// ============================================

type DragState =
  | { kind: 'tab'; path: string; groupId: string | null }
  | { kind: 'group'; groupId: string }
  | null

const drag = ref<DragState>(null)

// 插入指示线位置（fixed 定位）
const indicator = ref<{ x: number; top: number; height: number } | null>(null)

// 查询标签条内的可拖拽项（tab 或组头），按 DOM 顺序
function getStripItems(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('.tab-pane[data-path], .tab-group[data-group-id]'))
}

function stripKey(el: HTMLElement): string {
  return el.dataset.path || el.dataset.groupId || ''
}

// FLIP：捕获当前位置
function captureRects(): Map<string, DOMRect> {
  const rects = new Map<string, DOMRect>()
  getStripItems().forEach((el) => rects.set(stripKey(el), el.getBoundingClientRect()))
  return rects
}

// FLIP：执行动画（只做水平位移，竖向不动）
function applyFlip(prevRects: Map<string, DOMRect>) {
  getStripItems().forEach((el) => {
    const prev = prevRects.get(stripKey(el))
    if (!prev) return
    const next = el.getBoundingClientRect()
    const dx = prev.left - next.left
    if (Math.abs(dx) < 0.3) return
    // Invert
    el.style.transform = `translate3d(${dx}px, 0, 0)`
    el.style.transition = 'none'
    el.getBoundingClientRect()
    // Play
    el.style.transition = 'transform 0.22s cubic-bezier(0.2, 0, 0, 1)'
    el.style.transform = ''
    const onEnd = () => {
      el.style.transition = ''
      el.removeEventListener('transitionend', onEnd)
    }
    el.addEventListener('transitionend', onEnd)
  })
}

function setDragData(e: DragEvent, id: string) {
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    // 用自定义类型，避免 Chrome 因 text/plain 触发「松开鼠标以搜索文本」
    e.dataTransfer.setData('application/x-tab-group', id)
  }
}

function highlightSource(selector: string) {
  nextTick(() => {
    document.querySelector<HTMLElement>(selector)?.classList.add('is-dragging-source')
  })
}

function clearGroupHighlight() {
  document.querySelectorAll('.tab-group.is-drop-target').forEach((el) => el.classList.remove('is-drop-target'))
}

function clearDragVisual() {
  document.querySelectorAll('.is-dragging-source').forEach((el) => el.classList.remove('is-dragging-source'))
  clearGroupHighlight()
  indicator.value = null
}

function onTabDragStart(path: string, groupId: string | null, e: DragEvent) {
  setDragData(e, path)
  drag.value = { kind: 'tab', path, groupId }
  highlightSource(`.tab-pane[data-path="${path}"]`)
}

function onGroupDragStart(groupId: string, e: DragEvent) {
  setDragData(e, groupId)
  drag.value = { kind: 'group', groupId }
  highlightSource(`.tab-group[data-group-id="${groupId}"]`)
}

// 根据横向位置计算插入索引（0..N，N = 可拖拽项数量，表示末尾）
function computeInsertIndex(clientX: number): number {
  const items = getStripItems()
  let idx = 0
  for (const el of items) {
    const rect = el.getBoundingClientRect()
    if (clientX < rect.left + rect.width / 2) break
    idx++
  }
  return idx
}

// 计算指示线坐标
function indicatorForIndex(insertIndex: number): { x: number; top: number; height: number } | null {
  const items = getStripItems()
  if (!items.length) return null
  const first = items[0].getBoundingClientRect()
  const top = first.top
  const height = first.height
  let x: number
  if (insertIndex <= 0) {
    x = first.left
  } else if (insertIndex >= items.length) {
    x = items[items.length - 1].getBoundingClientRect().right
  } else {
    const prev = items[insertIndex - 1].getBoundingClientRect()
    const next = items[insertIndex].getBoundingClientRect()
    x = (prev.right + next.left) / 2
  }
  return { x, top, height }
}

// 若光标落在组头中部（拖 tab 时想「进组」），返回该组 id
function groupHeaderCenterId(e: DragEvent): string | null {
  const el = (e.target as HTMLElement)?.closest?.('.tab-group[data-group-id]') as HTMLElement | null
  if (!el) return null
  const rect = el.getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  return ratio >= 0.33 && ratio <= 0.67 ? el.dataset.groupId! : null
}

function onStripDragOver(e: DragEvent) {
  if (!drag.value) return
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'

  clearGroupHighlight()

  // 拖 tab 落在组头中部 → 高亮该组，表示进组
  if (drag.value.kind === 'tab') {
    const gid = groupHeaderCenterId(e)
    if (gid) {
      document.querySelector<HTMLElement>(`.tab-group[data-group-id="${gid}"]`)?.classList.add('is-drop-target')
      indicator.value = null
      return
    }
  }

  indicator.value = indicatorForIndex(computeInsertIndex(e.clientX))
}

// tab 拖拽：插入索引 → 目标 { groupId, beforePath }
function resolveTabTarget(insertIndex: number): { groupId: string | null; beforePath: string | null } {
  const n = renderItems.value.length
  if (insertIndex >= n) {
    const last = renderItems.value[n - 1]
    if (!last) return { groupId: null, beforePath: null }
    if (last.kind === 'group') return { groupId: null, beforePath: null }
    return { groupId: last.groupId, beforePath: null }
  }
  const item = renderItems.value[insertIndex]
  if (item.kind === 'group') return { groupId: null, beforePath: item.group.id }
  return { groupId: item.groupId, beforePath: item.tab.path }
}

// 组拖拽：插入索引 → 顶层 beforeKey
function resolveGroupTarget(insertIndex: number): { beforeKey: string | null } {
  const n = renderItems.value.length
  if (insertIndex >= n) return { beforeKey: null }
  const item = renderItems.value[insertIndex]
  if (item.kind === 'group') return { beforeKey: item.group.id }
  if (item.groupId === null) return { beforeKey: item.tab.path }
  return { beforeKey: item.groupId }
}

function onStripDrop(e: DragEvent) {
  if (!drag.value) return
  e.preventDefault()
  const insertIndex = computeInsertIndex(e.clientX)
  const src = drag.value
  const prevRects = captureRects()

  if (!isGroupMode.value) {
    // 扁平模式：用 sortTab(index)（index 是「源移除后」的索引）
    if (src.kind === 'tab') {
      const sourceIdx = flatTabIndex(src.path)
      const targetIdx = sourceIdx < insertIndex ? insertIndex - 1 : insertIndex
      if (sourceIdx !== targetIdx) {
        emit('setCurrentDragIndex', sourceIdx)
        emit('sortTab', targetIdx, src.path)
      }
    }
  } else if (src.kind === 'tab') {
    const gid = groupHeaderCenterId(e)
    const target = gid
      ? { groupId: gid, beforePath: null as string | null }
      : resolveTabTarget(insertIndex)
    if (target.beforePath !== src.path) {
      emit('drop-tab', { tabPath: src.path, groupId: target.groupId, beforePath: target.beforePath })
    }
  } else {
    const target = resolveGroupTarget(insertIndex)
    if (target.beforeKey !== src.groupId) {
      emit('drop-group', { groupId: src.groupId, beforeKey: target.beforeKey })
    }
  }

  clearDragVisual()
  drag.value = null
  nextTick(() => applyFlip(prevRects))
}

function onStripDragLeave(e: DragEvent) {
  const root = e.currentTarget as HTMLElement
  const related = e.relatedTarget as Node | null
  if (!related || !root.contains(related)) {
    clearGroupHighlight()
    indicator.value = null
  }
}

function onDragEnd() {
  clearDragVisual()
  drag.value = null
}

// ============================================
// 点击菜单外部关闭（在 document 上监听，比容器级监听更可靠）
// ============================================
function handleClickOutside(e: MouseEvent) {
  if (!props.showContextMenu) return
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

.tab-group {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  min-height: 1.3rem;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-text);
  flex-shrink: 0;
  white-space: nowrap;

  &[draggable='true'] {
    cursor: grab;
  }

  &.is-dragging-source {
    opacity: 0.4;
    transform: scale(0.95);
    transition: opacity 0.15s ease, transform 0.15s ease;
  }

  &.is-drop-target {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
}

.tab-group-arrow {
  font-size: 10px;
  color: var(--color-text-tertiary);
}

.tab-group-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.tab-group-label {
  max-width: 8rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-group-count {
  font-size: 10px;
  color: var(--color-text-tertiary);
}

.tab-group-active-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
}

.menu-sub {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  cursor: default !important;

  &:hover {
    background-color: transparent !important;
    color: var(--color-text-tertiary) !important;
    transform: none !important;
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

<style lang="less">
/* 拖拽插入指示线（Teleport 到 body，需全局样式） */
.tab-drop-indicator {
  position: fixed;
  width: 2px;
  margin-left: -1px;
  background: var(--color-primary);
  z-index: 1001;
  pointer-events: none;
  border-radius: 1px;
}

/* 组右键菜单（Teleport 到 body） */
.tab-group-ctx-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
}

.tab-group-ctx-menu {
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

  .tab-group-color-row {
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
    padding: 6px 1rem;
    cursor: default;

    &:hover {
      background: transparent;
    }
  }

  .tab-group-color-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;

    &:hover {
      transform: scale(1.25);
    }
  }
}

/* 组内联重命名输入框 */
.tab-group-input {
  width: 6rem;
  min-height: 1.1rem;
  padding: 0 2px;
  font-size: 12px;
  border: 1px solid var(--color-primary);
  border-radius: 3px;
  background: var(--color-bg-container, var(--color-background));
  color: var(--color-text);
  outline: none;
}
</style>
