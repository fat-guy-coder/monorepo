<template>
    <li class="menu-item" :style="{ '--level': level }" :id="item.path" @click="handleClick"
        @mouseenter.stop.prevent="handleMouseEnter" @mouseleave="handleMouseLeave">
        <div class="menu-item__title" :class="titleClasses">
            <span v-if="item.icon" class="menu-item__icon">{{ item.icon }}</span>
            <span :class="['menu-item__label', { 'menu-item__label--matched': item.match }]"
                :title="item.label || item.name">
                {{ item.label || item.name }}
            </span>
            <span v-if="canToggle" class="menu-item__arrow" :class="{ 'menu-item__arrow--open': isOpen }">
                <svg viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </span>
        </div>
        <Teleport to="body" v-if="mode === 'vertical'">
            <div v-if="shouldRenderChildren" ref="childrenWrapper" class="menu-item__children-wrapper-vertical"
                :style="{ top: verticalChildrenWrapperPosition.top, left: verticalChildrenWrapperPosition.left }">
                <ul class="menu-item__children-list">
                    <MenuItem v-for="child in localChildren" :key="child.path" :id="child.path" :item="child"
                        :level="level + 1" :is-open="openKeys.includes(child.path)" @toggle="$emit('toggle', $event)"
                        @select="$emit('select', $event)" />
                </ul>
            </div>
        </Teleport>
        <template v-else>
            <div v-if="shouldRenderChildren" ref="childrenWrapper" class="menu-item__children-wrapper">
                <ul class="menu-item__children-list">
                    <MenuItem v-for="child in localChildren" :key="child.path" :id="child.path" :item="child"
                        :level="level + 1" :is-open="openKeys.includes(child.path)" @toggle="$emit('toggle', $event)"
                        @select="$emit('select', $event)" @close="$emit('close', $event)" />
                </ul>
            </div>
        </template>
    </li>
</template>

<script setup lang="ts">
import {
    ref,
    computed,
    watch,
    nextTick,
    inject,
    type PropType,
    type Ref,
    onMounted,
} from 'vue'
import { type MenuItem as MenuItemType, animateHeight } from './index'

defineOptions({
    name: 'MenuItem',
})

const props = defineProps({
    item: {
        type: Object as PropType<MenuItemType>,
        required: true,
    },
    parent: {
        type: Object as PropType<MenuItemType>,
        required: false,
    },
    level: {
        type: Number,
        required: true,
    },
    isOpen: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['toggle', 'select', 'close'])

const openKeys = inject('openKeys', ref([])) as Ref<string[]>
const selectedKeys = inject('selectedKeys', ref([])) as Ref<string[]>
const menuConfig = inject('menuConfig', {
    labelSize: 14,
    itemGap: 4,
    animationDuration: 250,
}) as { labelSize: number; itemGap: number; animationDuration: number }

const menuLoader = inject<((item: MenuItemType) => Promise<MenuItemType[] | void>) | null>('menuOnLoad', null)
const mode = inject<'inline' | 'vertical'>('mode', 'inline')

const isHovered = ref(false)

const childrenWrapper = ref<HTMLElement | null>(null)
const localChildren = ref<MenuItemType[]>(props.item.children ?? [])
const hasTriedLoad = ref(localChildren.value.length > 0)
const shouldRenderChildren = ref(false)

const isSelected = computed(() => selectedKeys.value.includes(props.item.path ?? ''))
const hasLocalChildren = computed(() => localChildren.value.length > 0)
const expectRemoteChildren = computed(() => !!props.item.hasChildren && typeof menuLoader === 'function')
const hasPotentialChildren = computed(() => hasLocalChildren.value || expectRemoteChildren.value)
const canToggle = computed(() => hasPotentialChildren.value)

//确定是否需要渲染子菜单
const ensureChildren = async () => {
    if (!canToggle.value) return false
    if (shouldRenderChildren.value && hasLocalChildren.value) return true
    if (hasLocalChildren.value) {
        shouldRenderChildren.value = true
        await nextTick()
        return true
    }
    if (typeof menuLoader === 'function' && !hasTriedLoad.value) {
        hasTriedLoad.value = true
        const loaded = await menuLoader(props.item)
        if (Array.isArray(loaded)) {
            localChildren.value = loaded
        }
        if (localChildren.value.length > 0) {
            shouldRenderChildren.value = true
            await nextTick()
            return true
        }
    }
    return false
}

const handleClick = async () => {
    if (mode === 'inline') {
        if (!props.item.children) {
            emit('select', props.item)
        }
        if (!canToggle.value) return

        if (props.isOpen) {
            emit('toggle', props.item)
        } else {
            const ready = await ensureChildren()
            if (ready) {
                emit('toggle', props.item)
            }
        }
    } else {
        emit('select', props.item)
    }
}


const verticalSubMenuShow = computed(() => {
    return isHovered.value && shouldRenderChildren.value
})

const verticalChildrenWrapperPosition = ref({
    top: '0px',
    left: '0px',
})

const getChildrenWrapperPosition = (e: MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    return {
        top: rect.top + 'px',
        left: rect.left + rect.width + 'px',
    }
}


const handleMouseEnter = async (e: MouseEvent) => {
    isHovered.value = true
    if (mode === 'vertical' && canToggle.value) {
        if (props.isOpen) {
            emit('toggle', props.item)
        } else {
            if (e) verticalChildrenWrapperPosition.value = getChildrenWrapperPosition(e)
            const ready = await ensureChildren()
            if (ready) {
                emit('toggle', props.item)
            }
        }
    }
}

const handleMouseLeave = (e: MouseEvent) => {
    isHovered.value = false
    if (mode === 'vertical') {
        const elements = document.querySelectorAll('.menu-item__children-wrapper-vertical')
        //先判断是不是移除了菜单项，如果是则关闭子菜单
        const isMouseInMenuItems = Array.from(elements).some(element => isMouseInElement(element as HTMLElement, e.clientX, e.clientY))
        if (!isMouseInMenuItems) {
            emit('close')
            isHovered.value = false
            console.log('鼠标离开菜单项')
            return
        }
        //判断此时鼠标是否还在此菜单项或者子菜单项中//移出这两个元素则关闭子菜单
        const isMouseInChildrenWrapper = isMouseInElement(childrenWrapper.value as HTMLElement, e.clientX, e.clientY)
        if (isMouseInChildrenWrapper) {
            return
        }
        // // console.log(props.item)
        emit('toggle', props.item)
        // isHovered.value = false
    }
}


const titleClasses = computed(() => ({
    'menu-item__title--selected': isSelected.value,
    'menu-item__title--open': props.isOpen,
    'menu-item__title--matched': props.item.match,
    'menu-item__title--hovered': isHovered.value,
}))

watch(
    () => props.isOpen,
    async (newVal) => {
        if (newVal) {
            await ensureChildren()
        }
        await nextTick()
        if (childrenWrapper.value && shouldRenderChildren.value) {
            const duration = Math.max(menuConfig.animationDuration ?? 0, 0)
            animateHeight(childrenWrapper.value, newVal, duration, mode)
        }
    },
    { immediate: true }
)

watch(
    () => props.item.children,
    (next) => {
        localChildren.value = Array.isArray(next) ? next : []
        if (localChildren.value.length > 0) {
            hasTriedLoad.value = true
            if (props.isOpen && !shouldRenderChildren.value) {
                shouldRenderChildren.value = true
            }
        }
    }
)


function isMouseInElement(element: HTMLElement, mouseX: number, mouseY: number) {
    if (!element) return false
    const rect = element.getBoundingClientRect();
    return (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
    );
}


</script>

<style lang="less" scoped>
.menu-item {
    list-style: none;
}

.menu-item__title {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    padding-left: calc(8px + var(--level, 0) * 16px);
    cursor: pointer;
    border-radius: var(--element-border-radius);
    // transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        background-color: var(--color-fill-light);
    }
}

.menu-item__icon {
    margin-right: 8px;
    font-size: 1rem;
    flex-shrink: 0;
}

.menu-item__label {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: var(--menu-label-size, 0.88rem);
    color: var(--color-text);
}

.menu-item__label--matched {
    color: var(--color-highlight-text);
    //background-color: var(--color-highlight-bg);
    // border-radius: var(--element-border-radius);
}

.menu-item__arrow {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 6px;
    transition: transform 0.2s ease;
    color: var(--color-text-tertiary);

    &--open {
        transform: rotate(90deg);
    }

    svg {
        width: 100%;
        height: 100%;
    }
}

.menu-item__children-wrapper {
    overflow: hidden;
    //height: 0; // Initial state for animation
}

.menu-item__children-wrapper-vertical {
    position: absolute;
    left: 300px;
    top: 100px;
    z-index: 1000;
    overflow: hidden;
}

.menu-item__children-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--menu-item-gap, 4px);
}

.menu-item__title--selected {
    background: var(--color-primary-bg);
    color: var(--color-primary);
    box-shadow: inset 0 0 0 1px var(--color-primary);

    .menu-item__label {
        color: inherit;
    }

    .menu-item__arrow {
        color: inherit;
    }
}

.menu-item__title--open:not(.menu-item__title--selected) {
    background-color: var(--color-fill-secondary);
}

.menu-item__title--hovered {
    background-color: var(--color-fill-light);
}

// .menu-item__title--matched:not(.menu-item__title--selected) {
//     color: var(--color-primary);
//     font-weight: 600;

//     .menu-item__label {
//         color: var(--color-primary);
//         font-weight: 600;
//     }
// }
// </style>
