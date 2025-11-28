<template>
    <div class="tabs" :class="`tabs--${type}`">
        <div class="tabs-nav">
            <button v-if="isOverflowing" class="tabs-nav-btn tabs-nav-prev" :disabled="isLeftScrollDisabled"
                @click="handleScroll('left')">
                ‹
            </button>
            <div class="tabs-nav-wrap">
                <div class="tabs-nav-list" ref="navListRef" :style="{ transform: `translateX(${transformOffset}px)` }">
                    <slot></slot>
                    <div class="tabs-ink-bar" :style="inkBarStyle" />
                </div>
            </div>
            <button v-if="isOverflowing" class="tabs-nav-btn tabs-nav-next" :disabled="isRightScrollDisabled"
                @click="handleScroll('right')">
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

const props = withDefaults(
    defineProps<{
        activeKey: string
        type?: TabType,
        items?: TabItem[]
        tabBarStyle: CSSProperties
    }>(),
    {
        type: 'line',
    },
)

provide('type', props.type)

const emit = defineEmits<{
    (e: 'update:activeKey', key: string): void
    (e: 'edit', key: string): void
    (e: 'change', key: string): void
    (e: 'close', key: string): void
}>()



provide(
    'activeKey',
    computed(() => props.activeKey),
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

const updateInkBar = () => {
    nextTick(() => {
        const activeTab = tabRefs.value[props.activeKey]
        if (activeTab) {
            inkBarStyle.value = {
                width: `${activeTab.offsetWidth}px`,
                transform: `translateX(${activeTab.offsetLeft}px)`,
            }
        }
    })
}


const onHandleChange = (path: string) => {
    emit('change', path)
}

// 将事件处理函数提供给子组件
provide('change', onHandleChange)

// const paneClosable = (pane: TabItem) => {
//     if (props.type === 'editable-card') {
//         return pane.closable !== false
//     }
//     return pane.closable === true
// }


const onHandleClose = (path: string) => {
    emit('close', path)
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
    if (!navListRef.value || !navListRef.value.parentElement) return
    const containerWidth = navListRef.value.parentElement.offsetWidth
    const listWidth = navListRef.value.scrollWidth
    isOverflowing.value = listWidth > containerWidth
    if (!isOverflowing.value) {
        transformOffset.value = 0
    }
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
    const activeTab = tabRefs.value[props.activeKey]
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
    () => props.activeKey,
    () => {
        updateInkBar()
        scrollToActive()
    },
    { immediate: true },
)


let observer: ResizeObserver | null = null

onMounted(() => {
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
}

.tabs-nav {
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 12px;
    background: var(--element-background);
    border-radius: 6px 6px 0 0;
    min-height: 44px;
}

.tabs-nav-wrap {
    flex: 1;
    overflow: hidden;
    position: relative;
}

.tabs-nav-list {
    display: flex;
    flex-grow: 1;
    transition: transform 0.3s ease;
    position: relative;
    padding: 4px 0;
    gap: 4px;
    /* 添加间距 */
}

.tab-pane {
    flex-shrink: 0;
    cursor: pointer;
    transition: all 0.3s ease;

    .tab {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 16px;
        font-size: 14px;
        color: var(--color-text);
        transition: all 0.3s ease;
        white-space: nowrap;
        border-radius: 4px;
        border: 1px solid transparent;
        background: var(--element-background-soft);
        min-height: 32px;

        &:hover {
            color: var(--color-primary);
            background: var(--color-fill-secondary);
            border-color: var(--color-border);
        }

        &.is-active {
            color: var(--color-primary);
            background: var(--color-bg-container);
            border-color: var(--color-primary);
            font-weight: 500;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

            &::before {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 2px;
                background: var(--color-primary);
            }
        }

        &.is-disabled {
            color: var(--color-text-quaternary);
            cursor: not-allowed;
            background: var(--color-fill-tertiary);

            &:hover {
                color: var(--color-text-quaternary);
                background: var(--color-fill-tertiary);
                border-color: transparent;
            }
        }
    }
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
    background: var(--color-bg-container);
    color: var(--color-text-tertiary);
    cursor: pointer;
    padding: 8px 12px;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.2s ease;
    border-radius: 4px;
    min-width: 36px;
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
    margin-left: 4px;
}

.tabs-content {
    flex: 1;
    padding: 16px;
    background: var(--color-bg-container);
    border-radius: 0 0 6px 6px;
}

.tab-close {
    margin-left: 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--color-text-tertiary);
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    transition: all 0.2s ease;

    &:hover {
        color: var(--color-error);
        background: var(--color-fill-secondary);
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

    .tab-pane .tab {
        border-radius: 6px 6px 0 0;
        border: 1px solid var(--color-border);
        border-bottom: none;
        background: var(--element-background);
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

/* Editable Card 样式 */
.tabs--editable-card {
    .tabs-nav {
        background: transparent;
        border-bottom: none;
    }

    .tabs-nav-list {
        gap: 4px;
    }

    .tab-pane .tab {
        border-radius: 6px;
        border: 1px solid var(--color-border);
        background: var(--element-background);
        padding: 6px 12px 6px 16px;

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

/* 滚动条样式 */
.tabs-nav-wrap::-webkit-scrollbar {
    display: none;
}

.tabs-nav-wrap {
    scrollbar-width: none;
    -ms-overflow-style: none;
}
</style>
