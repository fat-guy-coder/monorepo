<template>
  <nav class="main-menu" :style="menuStyle">
    <ul class="menu__list">
      <MenuItem v-for="item in items" :key="item.path" :item="item" :level="0" :is-open="openKeys.includes(item.path)"
        :mode="mode" @toggle="handleToggle" @select="handleSelect" @close="closeKeys" />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, provide, type PropType } from 'vue'
import type { MenuItem as MenuItemType, MenuMode } from './index'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array as PropType<MenuItemType[]>,
    required: true,
  },
  onLoadData: {
    type: Function as PropType<(item: MenuItemType) => Promise<MenuItemType[] | void>>,
    default: undefined,
  },
  mode: {
    type: String as PropType<MenuMode>,
    default: 'vertical',
  },
  menuConfig: {
    type: Object as PropType<{
      labelSize: number,
      itemGap: number,
      animationDuration: number,
    }>,
    default: () => ({
      labelSize: 14,
      itemGap: 4,
      animationDuration: 250,
    }),
  }
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


const menuStyle = computed(() => ({
  '--menu-label-size': `${props.menuConfig.labelSize}px`,
  '--menu-item-gap': `${props.menuConfig.itemGap}px`,
  '--menu-anim-duration': `${Math.max(props.menuConfig.animationDuration, 0)}ms`,
}))

//切换菜单
const handleToggle = (item: MenuItemType | string) => {
  const path = typeof item === 'string' ? item : item.path;
  const currentOpenKeys = [...openKeys.value];
  const itemIndex = currentOpenKeys.indexOf(path);

  if (props.mode === 'inline') {
    if (currentOpenKeys.includes(path)) {
      currentOpenKeys.splice(currentOpenKeys.indexOf(path), 1)
    } else {
      currentOpenKeys.push(path)
    }
    openKeys.value = currentOpenKeys
  } else if (props.mode === 'vertical') {
    if (itemIndex > -1) {
      // If the item is already open, close it and all its children
      openKeys.value = currentOpenKeys.slice(0, itemIndex);
    } else {
      // Find the parent of the item to determine the correct level
      const findPath = (items: MenuItemType[], targetPath: string): string[] | null => {
        for (const currentItem of items) {
          if (currentItem.path === targetPath) {
            return [currentItem.path];
          }
          if (currentItem.children) {
            const childPath = findPath(currentItem.children, targetPath);
            if (childPath) {
              return [currentItem.path, ...childPath];
            }
          }
        }
        return null;
      };

      const fullPath = findPath(props.items, path);
      if (!fullPath) {
        openKeys.value = [path]; // Item not found in hierarchy, open it at root
        return;
      }
      const parentPath = fullPath.slice(0, -1);
      const keysToKeep = currentOpenKeys.filter(key => parentPath.includes(key));
      openKeys.value = [...keysToKeep, path];
    }
  }
};

const handleSelect = (item: MenuItemType) => {
  const path = typeof item === 'string' ? item : item.path
  const next = [...selectedKeys.value]
  if (next.includes(path)) {
    next.splice(next.indexOf(path), 1)
  } else {
    next.push(path)
  }
  selectedKeys.value = next
  emit('select', item)
}


const closeKeys = () => {
  openKeys.value = []
}



provide('openKeys', openKeys)
provide('selectedKeys', selectedKeys)
provide('menuConfig', props.menuConfig)
provide('menuOnLoad', props.onLoadData ?? null)
provide('mode', props.mode)
</script>

<style lang="less" scoped>
.main-menu {
  position: relative;
  background: var(--color-bg-container);
  border-radius: var(--element-border-radius);
  padding: 6px;
  box-sizing: border-box;
  border: 1px solid var(--color-border, rgba(0, 0, 0, 0.1));
  border-bottom: none;
  overflow: visible;
  overflow-x: hidden;

  &:hover .menu__settings-btn {
    opacity: 1;
  }
}

@supports (backdrop-filter: blur(8px)) {
  .main-menu__settings-card {
    backdrop-filter: blur(8px);
  }
}

.menu__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  // gap: var(--menu-item-gap, 4px);
}
</style>
