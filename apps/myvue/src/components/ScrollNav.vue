<template>
  <nav class="nav">
    <h2>
      {{ title ?? '目录' }}
      <span class="fold" @click.stop="fold = !fold">{{ fold ? '收起' : '展开' }}</span>
    </h2>
    <ul class="list" :style="{ display: fold ? 'block' : 'none' }">
      <li
        v-for="(item, index) in newList"
        :key="index"
        @click="scrollTo($event, item.id)"
        class="nav-item"
      >
        {{ item.title }}
        <ul v-if="showChild" class="nav children">
          <li
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="scrollTo($event, subItem.id)"
            class="nav-item"
          >
            {{ subItem.title }}
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
// 组合式 API 逻辑
import { defineProps, ref, type PropType, computed } from 'vue'

const fold = ref(true)

interface Item {
  title?: string
  id: string
  children?: Item[]
}

type NavItem = Item & {
  [index: string]: any
}

const newList = computed(() => {
  const { title, id, children } = props.keyMap
  return props.list.map((item) => {
    return {
      title: item[title || 'name'],
      id: item[id || 'id'],
      children: props.showChild
        ? item[children || 'children'].map((child: NavItem) => {
            return {
              title: child[title || 'name'],
              id: child[id || 'id'],
            }
          })
        : [],
    }
  })
})

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
    type: Array<NavItem>,
    required: true,
  },
  showChild: {
    type: Boolean,
    required: false,
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
    type: String as PropType<'top-left' | 'top-right' | 'bottom-right' | 'bottom-right'>,
    required: false,
    default: 'top-right',
  },
})

// 响应式状态
const scrollTo = (event: Event, id: string) => {
  if (props.stopPropagation) {
    event.stopPropagation()
  }
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<style scoped>
nav {
  align-self: start;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  position: fixed;
  top: 3rem;
  right: 3rem;
  width: 200px;
  transition: transform 0.5s ease-in-out;
  z-index: 2;
  .title-container {
    display: flex;
    flex-direction: row-reverse;
    div {
      width: 100%;
    }
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.list {
  /* transition-behavior: allow-discrete; */
  transition: all 0.5s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 10rem);
}

.fold {
  float: right;
  font-size: 1rem;
  padding-top: 0.3rem;
}

h2 {
  margin-bottom: 0rem;
}

ul {
  padding: 0;
  margin: 0;
}

.nav-item {
  list-style: none;
  padding: 0.2rem 0;
  transition: all 0.2s ease-in-out;
  font-size: 1rem;

  .nav {
    display: none;
  }

  .children {
    text-indent: 0.5rem;
  }

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transform: translate(-0.1rem, -0.1rem);
    color: rgba(74, 113, 240, 0.5);
    background: rgba(74, 113, 240, 0.1);

    .nav {
      display: block;
      color: rgba(74, 113, 240, 0.5);
    }
  }
}

/* 组件样式 */
</style>
