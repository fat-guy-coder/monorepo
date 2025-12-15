<template>
  <transition :name="animation.name" :style="{ '--nav-animation-duration': animation.duration }">
    <nav v-if="show" class="scroll-nav" :class="[
      `scroll-nav--${position.replace('-', '_')}`,
      `scroll-nav--variant-${variant}`,
      `scroll-nav--rounded-${rounded}`,
      `scroll-nav--shadow-${shadow}`,
      { 'scroll-nav--borderless': !bordered },
    ]" :style="componentStyle">
      <header class="scroll-nav__header">
        <div class="scroll-nav__title">
          <slot name="title">
            <h2>{{ title ?? '目录' }}</h2>
          </slot>
        </div>
        <button class="scroll-nav__toggle" type="button" @click="toggleFold">
          {{ isOpen ? '收起' : '展开' }}
          <svg viewBox="0 0 24 24" aria-hidden="true" :class="{ 'is-open': isOpen }">
            <path d="M6 10l6 6 6-6" />
          </svg>
        </button>
      </header>

      <ul :class="['scroll-nav__list']" ref="scrollNavList" role="menu">
        <li v-if="showBackToTop" class="scroll-nav__item" role="menuitem" @click="scrollToTop">
          <button class="scroll-nav__item-btn" :class="[
            currentItem?.id === 'back-to-top' ? 'scroll-nav__item--active' : '',
            'gradient-animation-hover',
          ]">
            回到顶部
          </button>
        </li>

        <li v-for="item in mappedList" :key="item.id" class="scroll-nav__item" role="presentation">
          <button class="scroll-nav__item-btn" :class="[
            currentItem?.id === item.id ? 'scroll-nav__item--active' : '',
            'gradient-animation-linear-hover',
          ]" type="button" role="menuitem" :title="item.title" @click="handleScroll($event, item.id)">
            <span class="scroll-nav__item-text">{{ item.title }}</span>
          </button>

          <ul v-if="showChild && item.children && item.children.length" class="scroll-nav__children">
            <li v-for="child in item.children" :key="child.id" class="scroll-nav__item scroll-nav__item--child"
              role="presentation">
              <button class="scroll-nav__item-btn gradient-animation-linear-hover"
                :class="[currentItem?.id === child.id ? 'scroll-nav__item--active' : '']" type="button" role="menuitem"
                :title="child.title" @click="handleScroll($event, child.id)">
                <span class="scroll-nav__item-text">{{ child.title }}</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script setup lang="ts">
import { computed,  onMounted,  ref, watch, type CSSProperties } from 'vue'
import { useDeviceStore } from '@/stores/device'
import {
  animateHeight,
  calculateAnimationDuration,
  type AnimationProperties,
  type AnimationDurationOptions,
} from '@/function/animation'

interface Item {
  title?: string
  id: string
  children?: Item[]
  [key: string]: unknown
}

interface KeyMap {
  title?: string
  id?: string
  children?: string
}

type AnimationConfig = {
  name: 'fade' | 'slide-in-right' | 'slide-in-left' | 'slide-in-top' | 'slide-in-bottom'
  duration: string
  type: AnimationProperties
} & AnimationDurationOptions

const {
  show = true,
  animation = {
    name: 'fade',
    duration: '0.3s',
    type: ['height'],
    baseDuration: 0,
    durationPerItem: 10,
    maxDuration: 400,
  },
  title,
  list,
  showChild = true,
  stopPropagation = true,
  keyMap = {
    title: 'name',
    id: 'id',
    children: 'children',
  },
  position = 'top-right',
  scrollTo = 'center',
  showBackToTop = false,
  bordered = true,
  rounded = 'md',
  shadow = 'none',
  variant = 'solid',
  css = {},
} = defineProps<{
  show?: boolean
  animation?: AnimationConfig
  title?: string
  list: Item[]
  showChild?: boolean
  stopPropagation?: boolean
  keyMap?: KeyMap
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  scrollTo?: 'center' | 'end' | 'start' | 'nearest'
  showBackToTop?: boolean
  bordered?: boolean
  rounded?: 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'gradient' | 'image'
  css?: Record<string, string>
}>()

const deviceStore = useDeviceStore()


const isOpen = ref(true)

const scrollNavList = ref<HTMLElement | null>(null)

const componentStyle = computed(() => {
  return { ...css } as CSSProperties;
});

const totalItemCount = computed(() => {
  const countItems = (items: Item[]): number => {
    let count = items.length
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        count += countItems(item.children)
      }
    }
    return count
  }
  return countItems(list)
})

watch(isOpen, (newVal) => {
  if (scrollNavList.value) {
    const duration = calculateAnimationDuration({
      ...animation,
      itemCount: totalItemCount.value,
    })
    animateHeight(scrollNavList.value, newVal, duration, animation.type)
  }
},)

const toggleFold = () => {
  isOpen.value = !isOpen.value
}

onMounted(() => {
  isOpen.value = !deviceStore?.device?.isMobile
})

const mappedList = computed(() => {
  const titleKey = keyMap.title || 'name'
  const idKey = keyMap.id || 'id'
  const childrenKey = keyMap.children || 'children'

  return (list || []).map((item) => {
    const children = Array.isArray(item[childrenKey]) ? (item[childrenKey] as Item[]) : []

    return {
      title: (item[titleKey] as string) ?? '',
      id: (item[idKey] as string) ?? '',
      children: children.map((child) => ({
        title: (child[titleKey] as string) ?? '',
        id: (child[idKey] as string) ?? '',
      })),
    }
  })
})

const scrollToTop = () => {
  const element = document.getElementById('mainView')
  element?.scrollTo({ top: 0, behavior: 'smooth' })
  currentItem.value = { id: 'back-to-top' }
}

const scrollIntoView = (event: Event | null, id: string) => {
  if (event && stopPropagation) {
    event.stopPropagation()
  }
  const element = document.getElementById(id)
  element?.scrollIntoView({ behavior: 'smooth', block: scrollTo })
}

const currentItem = ref<Item | null>(null)

const handleScroll = (event: Event, id: string) => {
  scrollIntoView(event, id)
  //一级没有二级继续找
  currentItem.value = getCurrentItem(mappedList.value, id)
}

const getCurrentItem = (list: Item[], id: string): Item | null => {
  for (const item of list) {
    if (item.id === id) {
      return item
    } else if (item.children) {
      const child = getCurrentItem(item.children, id)
      if (child) {
        return child
      }
    }
  }
  return null
}
</script>

<style scoped lang="less">
.scroll-nav {
  --nav-animation-duration: var(--_nav-animation-duration, 0.3s);
  --nav-padding: var(--_nav-padding, 0.75rem);
  --nav-bg: var(--_nav-bg, var(--color-background-soft));
  --nav-border-color: var(--_nav-border-color, var(--color-border));
  --nav-text-color: var(--_nav-text-color, var(--color-text));
  --nav-accent-color: var(--_nav-accent-color, var(--color-primary));
  --nav-shadow: var(--_nav-shadow, var(--box-shadow-md));
  --nav-shadow-hover: var(--_nav-shadow-hover, var(--box-shadow-hover-md));
  --nav-radius-sm: var(--_nav-radius-sm, var(--border-radius-sm));
  --nav-radius-md: var(--_nav-radius-md, var(--border-radius-md));
  --nav-radius-lg: var(--_nav-radius-lg, var(--border-radius-lg));

  --nav-header-padding: var(--_nav-header-padding, 0.25rem 0.5rem);
  --nav-title-font-size: var(--_nav-title-font-size, 1rem);
  --nav-title-color: var(--_nav-title-color, var(--color-heading));

  --nav-toggle-padding: var(--_nav-toggle-padding, 0.25rem 0.6rem);
  --nav-toggle-bg: var(--_nav-toggle-bg, var(--color-background-mute));
  --nav-toggle-bg-hover: var(--_nav-toggle-bg-hover, var(--color-background));
  --nav-toggle-radius: var(--_nav-toggle-radius, var(--border-radius));
  --nav-toggle-font-size: var(--_nav-toggle-font-size, 0.8rem);

  --nav-list-margin-top: var(--_nav-list-margin-top, 0.5rem);
  --nav-list-gap: var(--_nav-list-gap, 1px);

  --nav-item-padding: var(--_nav-item-padding, 0.5rem 0.75rem);
  --nav-item-radius: var(--_nav-item-radius, var(--border-radius-sm));
  --nav-item-bg: var(--_nav-item-bg, transparent);
  --nav-item-bg-hover: var(--_nav-item-bg-hover, var(--color-background-mute));
  --nav-item-font-size: var(--_nav-item-font-size, 0.9rem);
  --nav-item-text-color: var(--_nav-item-text-color, var(--color-text-soft));
  --nav-item-color-border-hover: var(--_nav-item-color-border-hover, var(--color-border-hover));
  --nav-item-box-shadow-hover: var(--_nav-item-box-shadow-hover, var(--box-shadow-hover-sm));

  --nav-item-active-bg: var(--_nav-item-active-bg, var(--color-highlight-bg));
  --nav-item-active-color: var(--_nav-item-active-color, var(--color-highlight-text));

  --nav-child-list-padding: var(--_nav-child-list-padding, 0 0 0 0.75rem);
  --nav-child-item-padding: var(--_nav-child-item-padding, 0.3rem 0.75rem);
  --nav-child-item-font-size: var(--_nav-child-item-font-size, 0.85rem);

  --nav-transition-duration: var(--_nav-transition-duration, var(--transition-duration));

  // --- Component Styles ---
  position: fixed;
  top: 3rem;
  right: 3rem;
  width: 220px;
  max-width: calc(100vw - 4rem);
  padding: var(--nav-padding);
  background: var(--nav-bg);
  border: 1px solid var(--nav-border-color);
  border-radius: var(--nav-radius-md);
  color: var(--nav-text-color);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 5;
  overflow: hidden;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--nav-shadow-hover);
  }

  &--top_left,
  &--bottom_left {
    left: 3rem;
    right: auto;
  }

  &--bottom_right,
  &--bottom_left {
    top: auto;
    bottom: 3rem;
  }

  &--borderless {
    border-color: transparent;
  }

  &--rounded-sm {
    border-radius: var(--nav-radius-sm);
  }

  &--rounded-lg {
    border-radius: var(--nav-radius-lg);
  }

  &--shadow-none {
    box-shadow: none;
  }

  &--shadow-sm {
    box-shadow: var(--box-shadow-sm);
  }

  &--shadow-md {
    box-shadow: var(--box-shadow-md);
  }

  &--shadow-lg {
    box-shadow: var(--box-shadow-lg);
  }

  &--variant-gradient,
  &--variant-image {
    color: #fff; // High-contrast text for dark backgrounds
    --nav-text-color: #fff;
    --nav-title-color: #fff;
    --nav-item-text-color: rgba(255, 255, 255, 0.85);
    --nav-item-active-color: #fff;
    --nav-item-bg-hover: rgba(255, 255, 255, 0.15);
    --nav-item-active-bg: rgba(255, 255, 255, 0.25);
    --nav-toggle-bg: rgba(255, 255, 255, 0.1);
    --nav-toggle-bg-hover: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.scroll-nav__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--nav-header-padding);

  h2 {
    margin: 0;
    font-size: var(--nav-title-font-size);
    color: var(--nav-title-color);
    font-weight: 600;
  }
}

.scroll-nav__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border: none;
  color: inherit;
  padding: var(--nav-toggle-padding);
  border-radius: var(--nav-toggle-radius);
  cursor: pointer;
  font-size: var(--nav-toggle-font-size);
  transition: background 0.2s ease;
  svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    transition: transform 0.2s ease;
    transform: rotate(0deg);

    &.is-open {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background: var(--nav-toggle-bg-hover);
  }
}

.scroll-nav__list {
  list-style: none;
  margin: var(--nav-list-margin-top) 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--nav-list-gap);
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  overflow-x: hidden;
}

.scroll-nav__item {
  border-radius: var(--nav-item-radius);
  background: var(--nav-item-bg);
  margin: 0;
  border: none;

  &--action {
    background: var(--nav-item-bg-hover);
  }

  &--child {
    background: transparent;
  }
}

.scroll-nav__item-btn {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: var(--nav-item-text-color);
  cursor: pointer;
  font-size: var(--nav-item-font-size);
  font-weight: 500;
  padding: var(--nav-item-padding);
  border-radius: var(--nav-item-radius);
  transition:
    box-shadow var(--nav-transition-duration) ease;
  &:hover {
    box-shadow: var(--nav-item-box-shadow-hover);
  }
}

.scroll-nav__item--active {
  background: var(--nav-item-active-bg);
  color: var(--nav-item-active-color);
  font-weight: 600;
  transform: translateX(2px);
}

.scroll-nav__item-text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.scroll-nav__children {
  list-style: none;
  padding: var(--nav-child-list-padding);
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--nav-list-gap);

  .scroll-nav__item-btn {
    padding: var(--nav-child-item-padding);
    font-size: var(--nav-child-item-font-size);
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }
}

/* --- Transition Animations --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--nav-animation-duration) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-in-right-enter-active,
.slide-in-right-leave-active,
.slide-in-left-enter-active,
.slide-in-left-leave-active,
.slide-in-top-enter-active,
.slide-in-top-leave-active,
.slide-in-bottom-enter-active,
.slide-in-bottom-leave-active {
  transition:
    transform var(--nav-animation-duration) ease,
    opacity var(--nav-animation-duration) ease;
}

.slide-in-right-enter-from,
.slide-in-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.slide-in-left-enter-from,
.slide-in-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-in-top-enter-from,
.slide-in-top-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-in-bottom-enter-from,
.slide-in-bottom-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .scroll-nav {
    position: sticky;
    width: 100%;
    max-width: 100%;
    margin: 1rem 0;
    top: 1rem;
    right: 0;
    left: 0;
  }
}
</style>