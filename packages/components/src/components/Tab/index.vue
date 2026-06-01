<template>
  <div class="tabs" :class="`tabs--${type}`">
    <div class="tabs-nav">
      <button
        v-if="isOverflowing"
        class="tabs-nav-btn tabs-nav-prev"
        :disabled="isLeftScrollDisabled"
        @click="handleScroll('left')"
      >
        ‹
      </button>
      <div class="tabs-nav-wrap" @wheel="handleWheel">
        <div
          class="tabs-nav-list"
          ref="navListRef"
          :style="{ transform: `translateX(${transformOffset}px)` }"
        >
          <slot></slot>
          <!-- <div class="tabs-ink-bar" :style="inkBarStyle" /> -->
        </div>
      </div>
      <button
        v-if="isOverflowing"
        class="tabs-nav-btn tabs-nav-next"
        :disabled="isRightScrollDisabled"
        @click="handleScroll('right')"
      >
        ›
      </button>
      <button
        v-if="isOverflowing && hiddenTabs.length > 0"
        class="tabs-nav-btn tabs-nav-more"
        @click.stop="toggleMoreMenu"
      >
        ···
      </button>
      <div v-if="moreMenuVisible" class="tabs-more-menu" ref="moreMenuRef">
        <div class="tabs-more-menu-header">
          <span>更多标签</span>
          <button class="tabs-more-menu-close" @click="moreMenuVisible = false">✕</button>
        </div>
        <div class="tabs-more-menu-list">
          <div
            v-for="tab in hiddenTabs"
            :key="tab.path"
            class="tabs-more-menu-item"
            :class="{ 'is-active': tab.path === activeKey }"
            @click="selectHiddenTab(tab.path)"
          >
            {{ tab.label }}
          </div>
        </div>
      </div>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  ref,
  useSlots,
  watch,
  type CSSProperties,
} from 'vue'

defineOptions({
  name: 'Tabs',
})

type TabType = 'line' | 'card' | 'editable-card'

interface TabItem {
  label: string
  path: string
  closable?: boolean
  disabled?: boolean
}

const { activeKey, type = 'editable-card' } = defineProps<{
  activeKey: string
  type?: TabType
  items?: TabItem[]
  tabBarStyle: CSSProperties
}>()

provide('type', type)

const emit = defineEmits<{
  (e: 'update:activeKey', key: string): void
  (e: 'edit', key: string): void
  (e: 'change', key: string): void
  (e: 'close', key: string): void
}>()

provide(
  'activeKey',
  computed(() => activeKey),
)

const navListRef = ref<HTMLElement | null>(null)
const tabRefs = ref<Record<string, HTMLElement>>({})
const inkBarStyle = ref<{ width: string; transform: string }>({
  width: '0px',
  transform: 'translateX(0px)',
})

const transformOffset = ref(0)
const isOverflowing = ref(false)
const moreMenuVisible = ref(false)
const moreMenuRef = ref<HTMLElement | null>(null)
const containerWidth = ref(0)

const setTabRef = (key: string, el: HTMLElement) => {
  if (el) {
    tabRefs.value[key] = el
  }
}

const removeTabRef = (key: string) => {
  delete tabRefs.value[key]
}

provide('setTabRef', setTabRef)
provide('removeTabRef', removeTabRef)

const updateInkBar = () => {
  nextTick(() => {
    const activeTab = tabRefs.value[activeKey]
    if (activeTab) {
      inkBarStyle.value = {
        width: `${activeTab.offsetWidth}px`,
        transform: `translateX(${activeTab.offsetLeft}px)`,
      }
    }
  })
}

const slots = useSlots()


watch(() => slots.default?.()?.[0].children?.length, (newVal) => {
  checkOverflow()
})

const onHandleChange = (path: string) => {
  emit('change', path)
}

// 将事件处理函数提供给子组件
provide('change', onHandleChange)

const onHandleClose = (path: string) => {
  emit('close', path)
  checkOverflow()
}

// 将事件处理函数提供给子组件
provide('close', onHandleClose)

const isLeftScrollDisabled = computed(() => transformOffset.value >= 0)
const isRightScrollDisabled = computed(() => {
  if (!navListRef.value) return true
  const containerWidth = navListRef.value.parentElement!.offsetWidth
  const listWidth = navListRef.value.scrollWidth
  return transformOffset.value <= -(listWidth - containerWidth)
})

// 计算当前不可见的标签（滚动到右侧之外的标签）
const hiddenTabs = computed(() => {
  if (!isOverflowing.value || containerWidth.value === 0) return []
  const result: { path: string; label: string }[] = []
  for (const [path, el] of Object.entries(tabRefs.value)) {
    const visualLeft = el.offsetLeft + transformOffset.value
    // 标签左边缘超出容器右边缘 = 完全不可见
    if (visualLeft >= containerWidth.value) {
      result.push({
        path,
        label: el.querySelector('.tab')?.textContent?.trim() || path,
      })
    }
  }
  return result
})

const checkOverflow = () => {
  nextTick(() => {
    if (!navListRef.value || !navListRef.value.parentElement) return
    const cw = navListRef.value.parentElement.offsetWidth
    containerWidth.value = cw
    const listWidth = navListRef.value.scrollWidth
    isOverflowing.value = listWidth > cw
    if (!isOverflowing.value) {
      transformOffset.value = 0
    }
  })
}

const handleScroll = (direction: 'left' | 'right') => {
  if (!navListRef.value || !navListRef.value.parentElement) return
  const containerWidth = navListRef.value.parentElement.offsetWidth
  const scrollAmount = containerWidth * 0.8
  let newOffset = transformOffset.value
  if (direction === 'right') {
    newOffset -= scrollAmount
  } else {
    newOffset += scrollAmount
  }
  const maxOffset = 0
  const minOffset = -(navListRef.value.scrollWidth - containerWidth)
  transformOffset.value = Math.max(minOffset, Math.min(maxOffset, newOffset))
}

// 鼠标滚轮横向滚动
const handleWheel = (e: WheelEvent) => {
  if (!isOverflowing.value || !navListRef.value?.parentElement) return
  e.preventDefault()
  const delta = e.deltaY || e.deltaX
  let newOffset = transformOffset.value - delta
  const maxOffset = 0
  const minOffset = -(navListRef.value.scrollWidth - navListRef.value.parentElement.offsetWidth)
  transformOffset.value = Math.max(minOffset, Math.min(maxOffset, newOffset))
}

// 切换"更多标签"菜单
const toggleMoreMenu = () => {
  moreMenuVisible.value = !moreMenuVisible.value
}

// 从"更多标签"菜单中选择标签
const selectHiddenTab = (path: string) => {
  emit('change', path)
  moreMenuVisible.value = false
}

// 点击菜单外部关闭
const handleClickOutside = (e: MouseEvent) => {
  if (moreMenuRef.value && !moreMenuRef.value.contains(e.target as Node)) {
    moreMenuVisible.value = false
  }
}

const scrollToActive = () => {
  if (!isOverflowing.value || !navListRef.value) return
  const activeTab = tabRefs.value[activeKey]
  if (!activeTab || !navListRef.value.parentElement) return
  const containerWidth = navListRef.value.parentElement.offsetWidth
  const activeLeft = activeTab.offsetLeft
  const activeRight = activeLeft + activeTab.offsetWidth
  const currentLeft = -transformOffset.value
  const currentRight = currentLeft + containerWidth
  if (activeLeft < currentLeft) {
    transformOffset.value = -activeLeft
  } else if (activeRight > currentRight) {
    transformOffset.value = -(activeRight - containerWidth)
  }
}

watch(
  () => activeKey,
  () => {
    updateInkBar()
    nextTick(() => {
      checkOverflow()
      scrollToActive()
    })
  },
  { immediate: true },
)

let observer: ResizeObserver | null = null

onMounted(() => {
  checkOverflow()
  observer = new ResizeObserver(checkOverflow)
  if (navListRef.value && navListRef.value.parentElement) {
      observer.observe(navListRef.value)
      observer.observe(navListRef.value.parentElement)
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  observer?.disconnect()
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="less">
.tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
  scrollbar-width: none!important; /* Firefox */
  -ms-overflow-style: none!important; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none!important; /* Chrome, Safari, Opera*/
  }
  .tabs-nav {
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
  min-height: 1.3rem;
}

.tabs-nav-wrap {
  flex: 1;
  overflow: hidden;
  position: relative;
  /* 强制隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
}

.tabs-nav-list {
  display: flex;
  flex-grow: 1;
  transition: transform 0.3s ease;
  position: relative;
  padding: 2px 0;
  gap: var(--gap-xs);
  /* 添加间距 */
}

.tabs-ink-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--color-primary);
  transition: all 0.3s ease;
  border-radius: 1px;
}

.tabs-nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--color-background);
  color: var(--color-text-tertiary);
  cursor: pointer;
  padding: 2px 6px;
  font-size: 0.8rem;
  font-weight: bold;
  transition: all 0.2s ease;
  border-radius: var(--border-radius-xs);
  min-width: 1.5rem;
  min-height: 26px;

  &:disabled {
    cursor: not-allowed;
    color: var(--color-text-quaternary);
    background: var(--color-fill-tertiary);
  }

  &:hover:not(:disabled) {
    color: var(--color-primary);
    background: var(--color-fill-secondary);
  }
}

.tabs-nav-prev {
  border-right: 1px solid var(--color-border);
  margin-right: 4px;
}

.tabs-nav-next {
  border-left: 1px solid var(--color-border);
  margin-left: 0.1rem;
}

.tabs-nav-more {
  border-left: 1px solid var(--color-border);
  margin-left: 0.1rem;
  font-size: 0.8rem;
  letter-spacing: -1px;
}

.tabs-more-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1001;
  background: var(--color-background);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 120px;
}

.tabs-more-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  border-bottom: 1px solid var(--color-border);
  font-size: 12px;
  color: var(--color-text-secondary);
}

.tabs-more-menu-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-tertiary);
  font-size: 12px;
  padding: 1px 3px;
  &:hover {
    color: var(--color-text);
  }
}

.tabs-more-menu-list {
  max-height: 240px;
  overflow-y: auto;
}

.tabs-more-menu-item {
  padding: 4px 8px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 12px;
  color: var(--color-text);
  transition: background-color 0.2s ease;
  &:hover {
    background: var(--color-fill-secondary);
  }
  &.is-active {
    color: var(--color-primary);
    background: var(--color-highlight-bg);
  }
}

.tabs-content {
  flex: 1;
  padding: 16px;
  background: var(--color-bg-container);
  border-radius: 0 0 0.3rem 0.3rem;
}

/* Line 样式 */
.tabs--line {
  .tabs-nav {
    background: transparent;
    border-bottom: none;
  }

  .tab-pane {
    flex-shrink: 0;
    cursor: pointer;

    &.is-active {
      div {
        background: var(--color-highlight-bg) !important;
        color: var(--color-highlight-text) !important;
      }
    }

    .is-disabled {
      div {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .tab {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--padding-sm) var(--padding-md);
      font-size: var(--font-size-sm);
      color: var(--color-text);
      white-space: nowrap;
      border-radius: var(--border-radius-xs);
      border: var(--border-width) solid transparent;
      background: var(--color-background-soft);
      min-height: 2rem;
    }
  }
}

/* Card 样式 */
.tabs--card {
  .tabs-nav {
    background: transparent;
    border-bottom: none;
  }

  .tabs-nav-list {
    gap: 2px;
  }

  .tab-pane {
    .tab {
      border-radius: 0.3rem 0.3rem 0 0;
      border: var(--border-width) solid var(--color-border);
      border-bottom: none;
      background: var(--color-background);
      margin-bottom: -1px;

      &.is-active {
        background: var(--color-bg-container);
        border-color: var(--color-primary);
        color: var(--color-primary);

        &::before {
          display: none;
        }
      }

      &:hover:not(.is-active) {
        background: var(--color-fill-secondary);
        border-color: var(--color-border);
      }
    }
  }
}

/* Editable Card 样式 */
.tabs--editable-card {
  .tabs-nav {
    background: transparent;
    border-bottom: none;
  }

  .tabs-nav-list {
    gap: 2px;
  }

  .tab-pane {
    flex-shrink: 0;
    cursor: pointer;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--border-radius);
    &.is-active {
      div {
        background: var(--color-highlight-bg) !important;
        color: var(--color-highlight-text) !important;
      }
    }

    .is-disabled {
      div {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .tab {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1px 6px;
      font-size: 12px;
      color: var(--color-text);
      white-space: nowrap;
      border-radius: var(--border-radius);
      border: var(--border-width) solid transparent;
      background: transparent;
      min-height: 1.3rem;
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tabs-nav {
    min-height: 36px;
  }

  .tab-pane .tab {
    padding: 4px 8px;
    font-size: 12px;
    min-height: 24px;
  }

  .tabs-nav-btn {
    padding: 4px 8px;
    min-width: 28px;
    min-height: 28px;
    font-size: 13px;
  }
}
}

</style>