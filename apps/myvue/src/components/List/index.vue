<template>
  <ul class="ui-list" :class="[`list-type--${type}`, { 'no-underline': !showUnderline }]">
    <li
      v-for="(item, index) in localItems"
      :key="(item as any).id || index"
      class="ui-list-item"
      :class="{ 'is-completed': (item as any).completed }"
      @click="type === 'todo' && toggleComplete(item as any)"
    >
      <slot name="item" :item="item" :index="index" :toggle="() => toggleComplete(item as any)">
        <!-- Link Type Rendering -->
        <Link
          v-if="type === 'link'"
          class="link-item"
          v-bind="item as ILink as any"
          :text="(item as ILink).label"
        />

        <!-- Plan Type Rendering -->
        <div v-else-if="type === 'plan'" class="plan-item">
          <span class="plan-item__time">{{ (item as IPlan).time }}</span>
          <div class="plan-item__content">
            <div class="plan-item__name">{{ (item as IPlan).name }}</div>
            <div class="plan-item__desc">{{ (item as IPlan).desc }}</div>
          </div>
        </div>

        <div v-else-if="type === 'progress'" class="progress-item">
          <div class="progress-meta">
            <span class="name">{{ (item as IProgress).label }}</span>
            <span class="val">{{ (item as IProgress).value }}%</span>
          </div>
          <div class="progress">
            <div class="bar" :style="{ '--val': (item as IProgress).value + '%' }"></div>
          </div>
        </div>

        <!-- Tips Type Rendering -->
        <div v-else-if="type === 'tips'" class="tips-item">
          <span class="tips-item__text">{{ (item as ITip).text }}</span>
        </div>

        <!-- Default, Todo, Bullet Type Rendering -->
        <div v-else class="default-item">
          <input
            v-if="type === 'todo'"
            type="checkbox"
            class="todo-checkbox"
            :checked="(item as any).completed"
            @change.stop="toggleComplete(item as any)"
            @click.stop
          />
          <span class="default-item__label">
            {{ typeof item === 'string' ? item : (item as any).label }}
          </span>
          <span
            v-if="type === 'default' && typeof item === 'object' && (item as any).value"
            class="default-item__value"
          >
            {{ (item as any).value }}
          </span>
        </div>
      </slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Link from '@/components/Link/index.vue'
import type { ListItem, IPlan, ITodo, ILink, IProgress, ITip } from './index.d'

defineOptions({
  name: 'ListComponent',
})

const props = withDefaults(
  defineProps<{
    items?: ListItem[]
    type?: 'default' | 'todo' | 'link' | 'plan' | 'bullet' | 'progress' | 'tips'
    showUnderline?: boolean
  }>(),
  {
    type: 'default',
    items: () => [],
    showUnderline: true,
  },
)

const localItems = ref<ListItem[]>([])

watch(
  () => props.items,
  (newItems) => {
    localItems.value = JSON.parse(JSON.stringify(newItems))
  },
  { immediate: true, deep: true },
)

const toggleComplete = (item: ITodo) => {
  item.completed = !item.completed
}
</script>

<style lang="less" scoped>
.ui-list {
  // --- 自有 CSS 变量定义 ---
  --list-bg: transparent;
  --list-padding: 0;
  --list-item-padding: var(--padding-md) var(--padding-lg);
  --list-item-color: var(--color-text);
  --list-item-value-color: var(--color-text-secondary);
  --list-item-border-color: var(--color-border-secondary);
  --list-item-hover-bg: var(--color-fill-secondary);
  --list-border-radius: var(--border-radius-md);
  --todo-strikethrough-color: var(--color-text-tertiary);
  --todo-completed-color: var(--color-text-tertiary);

  list-style: none;
  padding: var(--list-padding);
  margin: 0;
  background-color: var(--list-bg);
  border-radius: var(--list-border-radius);
  overflow: hidden; // 确保子元素的圆角生效

  &.no-underline .ui-list-item {
    border-bottom: none;
  }
}

.ui-list-item {
  padding: var(--list-item-padding);
  color: var(--list-item-color);
  border-bottom: 1px solid var(--list-item-border-color);
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  .list-type--default &:hover,
  .list-type--todo &:hover {
    background-color: var(--list-item-hover-bg);
  }
}

.default-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.default-item__label {
  position: relative; // 为删除线伪元素定位
  font-size: var(--font-size-normal);
  transition: color 0.3s ease;
  flex: 1;
  min-width: 0; // 允许 flex 项收缩，从而触发内部文本换行
  word-break: break-word; // 强制长单词换行

  // 删除线伪元素
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--todo-strikethrough-color);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
  }
}

.default-item__value {
  font-size: var(--font-size-sm);
  color: var(--list-item-value-color);
}

// --- "待办清单" 类型样式 ---
.list-type--todo {
  .ui-list-item {
    cursor: pointer;
  }
  .default-item {
    justify-content: flex-start;
    gap: var(--gap-md);
  }

  .is-completed .default-item__label {
    color: var(--todo-completed-color);
    &::after {
      transform: scaleX(1);
    }
  }
}

.todo-checkbox {
  flex-shrink: 0;
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  accent-color: var(--color-primary);
}

// --- "链接" 类型样式 ---
.list-type--link {
  .ui-list-item {
    padding: 0;
    &:hover {
      background-color: transparent;
    }
  }
  .link-item {
    width: 100%;
    justify-content: flex-start;
    padding: var(--list-item-padding);
    border-radius: 0;
    border: none;
    &:hover {
      background-color: var(--list-item-hover-bg);
      transform: none;
    }
  }
}

// --- "计划" 类型样式 ---
.list-type--plan {
  .ui-list-item {
    padding: 0;
    border-bottom: none;
    &:hover {
      background-color: transparent;
    }
  }
  .plan-item {
    display: flex;
    align-items: flex-start;
    gap: var(--gap-lg);
    padding: var(--padding-sm) var(--padding-md);
    border: var(--border-width) dashed var(--color-border);
    border-radius: var(--border-radius-md);
    background: var(--color-background-soft);
    margin-bottom: var(--gap-lg);
  }

  .plan-item__time {
    color: var(--color-primary);
    font-weight: 600;
    min-width: 3.75rem;
  }

  .plan-item__name {
    color: var(--color-heading);
    font-weight: 600;
    margin-bottom: var(--margin-xs);
  }

  .plan-item__desc {
    color: var(--color-text);
    font-size: 0.9rem;
  }

  .plan-item__content {
    flex: 1;
    min-width: 0; // 允许 flex 项收缩
  }

  .plan-item__name,
  .plan-item__desc {
    word-break: break-word; // 强制长单词换行
  }

  // --- 响应式布局 --- 
  @media (max-width: 767.98px) {
    .plan-item {
      flex-direction: column;
      align-items: flex-start;
    }

    .plan-item__time {
      margin-bottom: var(--margin-sm);
    }
  }
}

// --- "要点" 类型样式 ---
.list-type--bullet {
  padding-left: var(--padding-xl);
  list-style: disc;

  .ui-list-item {
    border-bottom: none;
    padding: 0;
    margin-bottom: var(--margin-sm);
    line-height: 1.6;
  }
}

// --- "进度" 类型样式 ---
.list-type--progress {
  .ui-list-item {
    padding: 0;
    border-bottom: none;
    &:hover {
      background-color: transparent;
    }
  }
  position: relative;
  height: 0.625rem;
  background: var(--color-fill-tertiary);
  border-radius: var(--border-radius-full);
  overflow: hidden;
  border: 1px solid var(--color-border);

  /* 模板页面的特定布局和样式 */
  .progress-item {
    display: flex;
    flex-direction: column;
    gap: var(--gap-sm);

    .progress-meta {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      color: var(--color-text);
      font-size: 0.9rem;
      margin-bottom: var(--margin-xs);
    }
  }
  .bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: var(--val, 0%);
    background: linear-gradient(
      90deg,
      var(--color-primary),
      color-mix(in oklab, var(--color-primary) 60%, var(--color-secondary))
    );
    transition: width 0.35s ease;
  }
}

// --- "温馨提示" 类型样式 ---
.list-type--tips {
  .ui-list-item {
    padding: 0;
    border-bottom: none;
    &:hover {
      background-color: transparent;
    }
  }
  .tips-item {
    padding: var(--list-item-padding);
    border-radius: var(--border-radius-md);
    background: var(--color-background-soft);
    margin-bottom: var(--gap-lg);
  }
  .tips-item__text {
    color: var(--color-text);
  }
  .tips-item__icon {
    color: var(--color-primary);
    font-size: 1.5rem;
    margin-right: var(--gap-sm);
  }
}
</style>
