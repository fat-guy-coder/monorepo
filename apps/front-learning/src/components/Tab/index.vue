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
      <div class="tabs-nav-wrap">
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

const checkOverflow = () => {
  nextTick(() => {
    if (!navListRef.value || !navListRef.value.parentElement) return
    const containerWidth = navListRef.value.parentElement.offsetWidth
    const listWidth = navListRef.value.scrollWidth
    isOverflowing.value = listWidth > containerWidth
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
})

onUnmounted(() => {
  observer?.disconnect()
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
  min-height: 1.6rem;
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
  padding: var(--padding-xs) 0;
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
  padding: var(--padding-sm) var(--padding-md);
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease;
  border-radius: var(--border-radius-xs);
  min-width: 2.25rem;
  min-height: 36px;

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
    gap: 4px;
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
      padding: var(--padding-xs) var(--padding-sm);
      font-size: var(--font-size-sm);
      color: var(--color-text);
      white-space: nowrap;
      border-radius: var(--border-radius);
      border: var(--border-width) solid transparent;
      background: transparent;
      min-height: 1.6rem;
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tabs-nav {
    min-height: 40px;
  }

  .tab-pane .tab {
    padding: 6px 12px;
    font-size: 13px;
    min-height: 28px;
  }

  .tabs-nav-btn {
    padding: 6px 10px;
    min-width: 32px;
    min-height: 32px;
    font-size: 14px;
  }
}
}

</style>