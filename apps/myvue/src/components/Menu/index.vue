<template>
  <nav class="menu" :style="menuStyle">
    <ul class="menu__list">
      <MenuItem v-for="item in items" :key="item.path" :item="item" :level="0" :is-open="openKeys.includes(item.path)"
        @toggle="handleToggle" @select="handleSelect" />
    </ul>

    <!-- <button class="menu__settings-btn" type="button" @click="toggleSettings">
      ⚙
    </button> -->

    <!-- <transition name="menu-config">
      <div v-if="showSettings" class="menu__settings-card">
        <header class="menu__settings-header">
          <h4>菜单配置</h4>
          <button class="menu__settings-close" type="button" @click="toggleSettings">×</button>
        </header>
        <div class="menu__settings-body">
          <label class="menu__settings-field">
            <span>标题字号 (px)</span>
            <div class="menu__settings-control">
              <input type="range" min="12" max="18" step="1" v-model.number="menuConfig.labelSize" />
              <span>{{ menuConfig.labelSize }}</span>
            </div>
          </label>

          <label class="menu__settings-field">
            <span>菜单间距 (px)</span>
            <div class="menu__settings-control">
              <input type="range" min="0" max="12" step="1" v-model.number="menuConfig.itemGap" />
              <span>{{ menuConfig.itemGap }}</span>
            </div>
          </label>

          <label class="menu__settings-field">
            <span>动画时长 (ms)</span>
            <div class="menu__settings-control">
              <input type="range" min="0" max="600" step="50" v-model.number="menuConfig.animationDuration" />
              <span>{{ menuConfig.animationDuration }}</span>
            </div>
          </label>
        </div>
      </div>
    </transition> -->
  </nav>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, type PropType } from 'vue'
import MenuItem from './MenuItem.vue'
import type { MenuItem as MenuItemType } from './index'

const props = defineProps({
  items: {
    type: Array as PropType<MenuItemType[]>,
    required: true,
  },
  onLoadData: {
    type: Function as PropType<(item: MenuItemType) => Promise<MenuItemType[] | void>>,
    default: undefined,
  },
  width: {
    type: String,
    default: '300px',
  },
})

const openKeys = defineModel<string[]>('openKeys', {
  default: () => [],
  type: Array as PropType<string[]>,
})

const selectedKeys = defineModel<string[]>('selectedKeys', {
  default: () => [],
  type: Array as PropType<string[]>,
})

const emit = defineEmits(['select'])

const menuConfig = reactive({
  labelSize: 14,
  itemGap: 4,
  animationDuration: 250,
})

const showSettings = ref(false)
const toggleSettings = () => {
  showSettings.value = !showSettings.value
}

const menuStyle = computed(() => ({
  width: props.width,
  '--menu-label-size': `${menuConfig.labelSize}px`,
  '--menu-item-gap': `${menuConfig.itemGap}px`,
  '--menu-anim-duration': `${Math.max(menuConfig.animationDuration, 0)}ms`,
}))

const handleToggle = (item: MenuItemType) => {
  const next = [...openKeys.value]
  if (next.includes(item.path)) {
    next.splice(next.indexOf(item.path), 1)
  } else {
    next.push(item.path)
  }
  openKeys.value = next
}

const handleSelect = (item: MenuItemType) => {
  const next = [...selectedKeys.value]
  if (next.includes(item.path)) {
    next.splice(next.indexOf(item.path), 1)
  } else {
    next.push(item.path)
  }
  selectedKeys.value = next
  emit('select', item)
}

provide('openKeys', openKeys)
provide('selectedKeys', selectedKeys)
provide('menuConfig', menuConfig)
provide('menuOnLoad', props.onLoadData ?? null)
</script>

<style lang="less" scoped>
.menu {
  position: relative;
  background: var(--color-bg-container);
  border-radius: var(--element-border-radius);
  padding: 6px;
  box-sizing: border-box;
  border: 1px solid var(--color-border, rgba(0, 0, 0, 0.1));
  ;
  overflow: visible;
  overflow-x: hidden;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);

  &:hover .menu__settings-btn {
    opacity: 1;
  }
}

@supports (backdrop-filter: blur(8px)) {
  .menu__settings-card {
    backdrop-filter: blur(8px);
  }
}

.menu__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--menu-item-gap, 4px);
}

// .menu__settings-btn {
//   position: absolute;
//   left: 12px;
//   bottom: 12px;
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   border: 1px solid var(--color-border, rgba(0, 0, 0, 0.1));
//   background: var(--color-fill-secondary);
//   color: var(--color-text);
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 16px;
//   transition: opacity 0.2s ease, transform 0.2s ease;
//   opacity: 0.2;
//   z-index: 2;

//   &:hover {
//     opacity: 1;
//     transform: scale(1.05);
//   }
// }

// .menu__settings-card {
//   position: absolute;
//   left: 12px;
//   bottom: 48px;
//   width: 220px;
//   border-radius: 12px;
//   background: var(--color-bg-elevated);
//   border: 1px solid var(--color-border);
//   box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
//   padding: 12px;
//   z-index: 3;
// }

// .menu__settings-header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 8px;

//   h4 {
//     font-size: 0.85rem;
//     margin: 0;
//   }
// }

// .menu__settings-close {
//   border: none;
//   background: transparent;
//   cursor: pointer;
//   font-size: 18px;
//   line-height: 1;
//   color: var(--color-text-tertiary);

//   &:hover {
//     color: var(--color-text);
//   }
// }

// .menu__settings-body {
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// }

// .menu__settings-field {
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
//   font-size: 12px;
//   color: var(--color-text-tertiary);
// }

// .menu__settings-control {
//   display: flex;
//   align-items: center;
//   gap: 8px;

//   input {
//     flex: 1;
//   }

//   span:last-child {
//     min-width: 32px;
//     text-align: right;
//     color: var(--color-text);
//     font-weight: 600;
//   }
// }

// .menu-config-enter-active,
// .menu-config-leave-active {
//   transition: opacity 0.2s ease, transform 0.2s ease;
// }

// .menu-config-enter-from,
// .menu-config-leave-to {
//   opacity: 0;
//   transform: translateY(8px);
// }</style>
