<template>
  <nav
    class="scroll-nav"
    :class="[
      `scroll-nav--${positionClass}`,
      `scroll-nav--variant-${variant}`,
      `scroll-nav--rounded-${rounded}`,
      `scroll-nav--shadow-${shadow}`,
      { 'scroll-nav--borderless': !bordered },
    ]"
    :style="navStyle"
  >
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

    <transition name="collapse" appear>
      <ul v-show="isOpen" class="scroll-nav__list" role="menu">
        <li
          v-if="showBackToTop"
          class="scroll-nav__item scroll-nav__item--action"
          role="menuitem"
          @click="scrollToTop"
        >
          回到顶部
        </li>

        <li
          v-for="item in mappedList"
          :key="item.id"
          class="scroll-nav__item"
          role="presentation"
        >
          <button
            class="scroll-nav__item-btn"
            type="button"
            role="menuitem"
            @click="handleScroll($event, item.id)"
          >
            <span>{{ item.title }}</span>
          </button>

          <transition name="fade">
            <ul
              v-if="showChild && item.children && item.children.length"
              class="scroll-nav__children"
            >
              <li
                v-for="child in item.children"
                :key="child.id"
                class="scroll-nav__item scroll-nav__item--child"
                role="presentation"
              >
                <button
                  class="scroll-nav__item-btn"
                  type="button"
                  role="menuitem"
                  @click="handleScroll($event, child.id)"
                >
                  {{ child.title }}
                </button>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type CSSProperties, type PropType } from 'vue'
import { useUserStore } from '@/stores/user'

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

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  list: {
    type: Array as PropType<Item[]>,
    required: true,
    default: () => [],
  },
  showChild: {
    type: Boolean,
    required: false,
    default: true,
  },
  stopPropagation: {
    type: Boolean,
    required: false,
    default: true,
  },
  keyMap: {
    type: Object as PropType<KeyMap>,
    required: false,
    default: () => ({
      title: 'name',
      id: 'id',
      children: 'children',
    }),
  },
  position: {
    type: String as PropType<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>,
    default: 'top-right',
  },
  scrollTo: {
    type: String as PropType<'center' | 'end' | 'start' | 'nearest'>,
    default: 'center',
  },
  showBackToTop: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  rounded: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md',
  },
  shadow: {
    type: String as PropType<'none' | 'sm' | 'md' | 'lg'>,
    default: 'md',
  },
  variant: {
    type: String as PropType<'solid' | 'gradient' | 'image'>,
    default: 'solid',
  },
  backgroundColor: {
    type: String,
    default: '',
  },
  gradientColors: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  backgroundImage: {
    type: String,
    default: '',
  },
  gap: {
    type: [Number, String] as PropType<number | string>,
    default: 1,
  },
})

const store = useUserStore()
const prefersOpen = computed(() => !store?.user?.device?.isMobile)
const isOpen = ref(prefersOpen.value)

onMounted(() => {
  isOpen.value = prefersOpen.value
})

const toggleFold = () => {
  isOpen.value = !isOpen.value
}

const navStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  style['--scroll-nav-gap'] = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
  if (props.variant === 'gradient') {
    const colors =
      props.gradientColors.length >= 2
        ? props.gradientColors.join(', ')
        : 'var(--color-primary), var(--color-secondary)'
    style.background = `linear-gradient(135deg, ${colors})`
  } else if (props.variant === 'solid' && props.backgroundColor) {
    style.background = props.backgroundColor
  } else if (props.variant === 'image' && props.backgroundImage) {
    style.backgroundImage = `url(${props.backgroundImage})`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  }
  return style
})

const positionClass = computed(() => props.position.replace('-', '_'))

const mappedList = computed(() => {
  const titleKey = props.keyMap.title || 'name'
  const idKey = props.keyMap.id || 'id'
  const childrenKey = props.keyMap.children || 'children'

  return (props.list || []).map((item) => {
    const children = Array.isArray(item[childrenKey])
      ? (item[childrenKey] as Item[])
      : []

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
}

const scrollIntoView = (event: Event | null, id: string) => {
  if (event && props.stopPropagation) {
    event.stopPropagation()
  }
  const element = document.getElementById(id)
  element?.scrollIntoView({ behavior: 'smooth', block: props.scrollTo })
}

const handleScroll = (event: Event, id: string) => {
  scrollIntoView(event, id)
}
</script>

<style scoped lang="less">
.scroll-nav {
  --scroll-nav-bg: var(--color-background);
  --scroll-nav-border: var(--color-border);
  --scroll-nav-text: var(--color-text);
  --scroll-nav-accent: var(--color-primary);
  --scroll-nav-radius-sm: 12px;
  --scroll-nav-radius-md: 16px;
  --scroll-nav-radius-lg: 20px;

  position: fixed;
  top: 3rem;
  right: 3rem;
  width: 240px;
  padding: 1rem;
  background: var(--scroll-nav-bg);
  border: 1px solid var(--scroll-nav-border);
  border-radius: var(--scroll-nav-radius-md);
  color: var(--scroll-nav-text);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
  backdrop-filter: blur(8px);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease,
    border-color 0.3s ease;
  z-index: 5;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 25px 45px rgba(15, 23, 42, 0.2);
  }

  &--top_left {
    top: 3rem;
    left: 3rem;
    right: auto;
  }

  &--bottom_right {
    top: auto;
    bottom: 3rem;
  }

  &--bottom_left {
    top: auto;
    bottom: 3rem;
    left: 3rem;
    right: auto;
  }

  &--borderless {
    border-color: transparent;
  }

  &--rounded-sm {
    border-radius: var(--scroll-nav-radius-sm);
  }

  &--rounded-lg {
    border-radius: var(--scroll-nav-radius-lg);
  }

  &--shadow-none {
    box-shadow: none;
  }

  &--shadow-sm {
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.12);
  }

  &--shadow-md {
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.15);
  }

  &--shadow-lg {
    box-shadow: 0 25px 45px rgba(15, 23, 42, 0.2);
  }

  &--variant-gradient {
    color: var(--color-text-light-solid);
    border-color: transparent;
  }

  &--variant-image {
    color: var(--color-text-light-solid);
    border-color: rgba(255, 255, 255, 0.4);
  }
}

.scroll-nav__header {
  display: flex;
  justify-content: space-between;
  align-items: center;


  h2 {
    margin: 0;
    font-size: 1.1rem;
    color: inherit;
  }
}

.scroll-nav__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: inherit;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    transform: rotate(0deg);
    transition: transform 0.2s ease;

    &.is-open {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
}

.scroll-nav__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--scroll-nav-gap, 2px);
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
}

.scroll-nav__item {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  margin-bottom: var(--scroll-nav-gap, 2px);

  &--action {
    background: rgba(255, 255, 255, 0.15);
  }

  &--child {
    background: transparent;
    border: none;
  }
}

.scroll-nav__item-btn {
  width: 100%;
  text-align: left;
  padding: 0.65rem 0.8rem;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: var(--scroll-nav-accent);
    transform: translateX(2px);
  }
}

.scroll-nav__children {
  list-style: none;
  padding: 0.4rem 0 0.4rem 1rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  .scroll-nav__item-btn {
    font-size: 0.85rem;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }
}

.collapse-enter-active,
.collapse-leave-active {
  transition: height 0.25s ease, opacity 0.25s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  height: 0;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 768px) {
  .scroll-nav {
    position: static;
    width: 100%;
    margin: 1rem 0;
  }
}
</style>
