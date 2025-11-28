<template>
    <div class="tabs" :class="`tabs--${type}`">
        <div class="tabs-nav">
            <button v-if="isOverflowing" class="tabs-nav-btn tabs-nav-prev" :disabled="isLeftScrollDisabled"
                @click="handleScroll('left')">
                ‹
            </button>
            <div class="tabs-nav-wrap">
                <div class="tabs-nav-list" ref="navListRef" :style="{ transform: `translateX(${transformOffset}px)` }">
                    <slot>
                    </slot>
                    <div class="tabs-ink-bar" :style="inkBarStyle" />
                </div>
            </div>
            <button v-if="isOverflowing" class="tabs-nav-btn tabs-nav-next" :disabled="isRightScrollDisabled"
                @click="handleScroll('right')">
                ›
            </button>
        </div>
        <div class="tabs-content" v-if="$slots.content">
            <slot name="content" />
        </div>
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
} from 'vue'

defineOptions({
    name: 'ATabs',
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
        modelValue: string
        type?: TabType,
        items?: TabItem[]
    }>(),
    {
        type: 'line',
    },
)

const emit = defineEmits<{
    (e: 'update:modelValue', key: string): void
    (e: 'edit', key: string): void
    (e: 'change', key: string): void
}>()

const handleChange = (key: string) => {
    console.log('a')
    // emit('change', key)
}

const slots = useSlots()

const panes = computed<TabItem[]>(() => {
    const children = slots.default ? slots.default() : []
    console.log(children)
    return children
        .map((node) => node.props as TabItem)
})

provide(
    'activeKey',
    computed(() => props.modelValue),
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
        const activeTab = tabRefs.value[props.modelValue]
        if (activeTab) {
            inkBarStyle.value = {
                width: `${activeTab.offsetWidth}px`,
                transform: `translateX(${activeTab.offsetLeft}px)`,
            }
        }
    })
}

const paneClosable = (pane: TabItem) => {
    if (props.type === 'editable-card') {
        return pane.closable !== false
    }
    return pane.closable === true
}

const handleTabClick = (pane: TabItem) => {
    if (!pane.disabled) {
        emit('update:modelValue', pane.path)
    }
}

const handleClose = (pane: TabItem) => {
    emit('edit', pane.path)
}

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
    const activeTab = tabRefs.value[props.modelValue]
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
    () => props.modelValue,
    () => {
        updateInkBar()
        scrollToActive()
    },
    { immediate: true },
)

watch(
    panes,
    () => {
        nextTick(() => {
            updateInkBar()
            checkOverflow()
        })
    },
    { immediate: true, deep: true },
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

<style scoped lang="less">
.tabs {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.tabs-nav {
    position: relative;
    display: flex;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 12px;
}

.tabs-nav-wrap {
    flex: 1;
    overflow: hidden;
}

.tabs-nav-list {
    display: flex;
    transition: transform 0.3s;
    position: relative;
    width: auto;
}

.tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    color: var(--color-text);
    transition: color 0.2s;

    &:hover {
        color: var(--color-primary);
    }

    &.is-active {
        color: var(--color-primary);
        font-weight: 500;
    }

    &.is-disabled {
        color: var(--color-text-quaternary);
        cursor: not-allowed;
    }
}

.tabs-ink-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: var(--color-primary);
    transition: transform 0.3s, width 0.3s;
}

.tabs-nav-btn {
    border: none;
    background: var(--color-bg-container);
    color: var(--color-text-tertiary);
    cursor: pointer;
    padding: 0 8px;
    font-size: 16px;
    transition: color 0.2s;

    &:disabled {
        cursor: not-allowed;
        color: var(--color-text-quaternary);
    }

    &:hover:not(:disabled) {
        color: var(--color-primary);
    }
}

.tabs-nav-prev {
    border-right: 1px solid var(--color-border);
}

.tabs-nav-next {
    border-left: 1px solid var(--color-border);
}

.tabs-content {
    flex: 1;
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
}

.tab-close:hover {
    color: var(--color-error);
}

.tabs--card .tab {
    padding: 8px 12px;
    margin-right: 4px;
    background: var(--element-background);
    border: 1px solid var(--color-border);
    border-bottom: none;
    border-top-left-radius: var(--element-border-radius);
    border-top-right-radius: var(--element-border-radius);

    &.is-active {
        background: var(--color-bg-container);
        border-color: var(--color-primary);
    }
}

.tabs--editable-card .tab {
    padding-right: 8px;
    border: 1px solid var(--color-border);
    margin-right: 4px;
    border-radius: var(--element-border-radius);

    &.is-active {
        border-color: var(--color-primary);
    }
}
</style>
