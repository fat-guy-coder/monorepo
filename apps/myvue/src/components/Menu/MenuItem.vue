<template>
    <li class="menu-item" :style="{ '--level': level }" @click.stop.prevent="handleClick"
        @mouseenter.stop.prevent="handleMouseEnter" @mouseleave="handleMouseLeave">
        <div class="menu-item__title" :class="titleClasses" :id="item.path">
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
                @mouseleave="handleMouseAllLeave"
                :style="{ top: verticalChildrenWrapperPosition.top, left: verticalChildrenWrapperPosition.left }">
                <ul class="menu-item__children-list">
                    <MenuItem v-for="child in localChildren" :key="child.path" :item="child" :level="level + 1"
                        :is-open="openKeys.includes(child.path)" @toggle="$emit('toggle', $event)"
                        @select="$emit('select', $event)" @close="$emit('close', $event)" />
                </ul>
            </div>
        </Teleport>
        <template v-else>
            <div v-if="shouldRenderChildren" ref="childrenWrapper" class="menu-item__children-wrapper">
                <ul class="menu-item__children-list">
                    <MenuItem v-for="child in localChildren" :key="child.path" :item="child" :level="level + 1"
                        :is-open="openKeys.includes(child.path)" @toggle="$emit('toggle', $event)"
                        @select="$emit('select', $event)" />
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
    toRef,
} from 'vue'
import { type MenuItem as MenuItemType, } from './index'
import { animateHeight } from '@/Function'

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
    labelSize: '0.88rem',
    itemGap: '0.25rem',
    animationDuration: 250,
}) as { labelSize: string; itemGap: string; animationDuration: number }


const menuLoader = inject<((item: MenuItemType) => Promise<MenuItemType[] | void>) | null>('menuOnLoad', null)

const isMobile = inject('isMobile', ref(false)) as Ref<boolean>

const mode = inject('mode') as Ref<'inline' | 'vertical'>



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
    if (!canToggle.value) {
        emit('select', props.item)
        return
    }
    if (mode.value === 'inline') {
        if (props.isOpen) {
            emit('toggle', props.item)
            //删除节点
            await nextTick()
        } else {
            const ready = await ensureChildren()
            if (ready) {
                emit('toggle', props.item)
            }
        }
    }
    //  else {
    //     console.log(mode)
    // }
}


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
    if (mode.value === 'vertical') {
        if (!canToggle.value) {
            emit('toggle', props.item)
            return
        }
        if (canToggle.value && !props.isOpen) {
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
    if (mode.value === 'vertical') {
        //检测是否移出了子菜单区域
        const isMouseInMenuItems = getMouseInChildWrapperVerticalElement(e)
        if (!isMouseInMenuItems) {
            emit('close')
        }
    }
}

const handleMouseAllLeave = (e: MouseEvent) => {
    const isMouseInMenuItems = getMouseInChildWrapperVerticalElement(e)
    if (!isMouseInMenuItems) {
        emit('close')
        shouldRenderChildren.value = false
    }
}


const getMouseInChildWrapperVerticalElement = (e: MouseEvent) => {
    return Array.from(document.querySelectorAll('.menu-item__children-wrapper-vertical')).some(element => isMouseInElement(element as HTMLElement, e.clientX, e.clientY))
}



const titleClasses = computed(() => ({
    'menu-item__title--selected': isSelected.value,
    'gradient-animation': !isSelected.value,
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
            await animateHeight(childrenWrapper.value, newVal, duration, mode.value)
            if (!newVal) {
                shouldRenderChildren.value = false
                childrenWrapper.value = null
            }
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

const collapsed = inject('collapsed') as any

watch(() => collapsed, (newVal) => {
    if (newVal && mode.value === 'vertical' && shouldRenderChildren.value) {
        shouldRenderChildren.value = false
    }
}, { immediate: true })


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
    margin: 0;
    padding: 0.125rem 0.125rem;
}

.menu-item__title {
    display: flex;
    align-items: center;
    gap: var(--gap-xs);
    padding: var(--gap-xs) var(--gap-sm);
    padding-left: calc(var(--gap-sm) + var(--level, 0) * var(--gap-md));
    cursor: pointer;
    border-radius: var(--border-radius-md);
}

.menu-item__icon {
    margin-right: var(--gap-xs);
    font-size: var(--font-size-normal);
    flex-shrink: 0;
}

.menu-item__label {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: var(--font-size-sm);
    color: var(--color-text);
}

.menu-item__label--matched {
    color: var(--color-highlight-text);
}

.menu-item__arrow {
    width: 1.125rem;
    height: 1.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.375rem;
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

    z-index: 1000;
    overflow: hidden;
}

.menu-item__children-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--menu-item-gap, 0.25rem);
}

.menu-item__title--selected {
    background: var(--color-highlight-bg);
    color: var(--color-highlight-text);
    box-shadow: var(--box-shadow);
    .menu-item__label {
        color: inherit;
    }
    .menu-item__arrow {
        color: inherit;
    }
}
</style>
