<template>
  <div
    :class="['pagination-container', `pagination--${mode}`, { disabled }]"
    :style="componentStyle"
  >
    <!-- 总条数 -->
    <span v-if="showTotal && mode !== 'small'" class="pagination-total">
      共 {{ total }} 条
    </span>

    <!-- 上一页 -->
    <button
      class="pagination-nav prev"
      :disabled="disabled || currentPage === 1"
      @click="handlePrev"
    >
      &lt;
    </button>

    <!-- 页码 -->
    <ul class="pagination-pages">
      <li
        v-for="(page, index) in paginatedPages"
        :key="index"
        :class="['page-item', { active: page === currentPage, ellipsis: page === '...' }]"
        @click="handlePageChange(page)"
      >
        {{ page }}
      </li>
    </ul>

    <!-- 下一页 -->
    <button
      class="pagination-nav next"
      :disabled="disabled || currentPage === totalPages"
      @click="handleNext"
    >
      &gt;
    </button>

    <!-- 每页条数选择器 -->
    <div v-if="showPageSizeChanger && mode === 'large'" class="pagination-sizer">
      <select v-model="internalPageSize" :disabled="disabled" @change="handlePageSizeChange">
        <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }} 条/页</option>
      </select>
    </div>

    <!-- 快速跳转 -->
    <div v-if="showJumper && mode !== 'small'" class="pagination-jumper">
      跳至
      <input
        v-model.number="jumperPage"
        type="text"
        :disabled="disabled"
        @keyup.enter="handleJumper"
      />
      页
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, type CSSProperties } from 'vue';

const { 
  total,
  currentPage = 1,
  pageSize = 10,
  mode = 'medium',
  disabled = false,
  showTotal = true,
  showJumper = true,
  showPageSizeChanger = true,
  pageSizeOptions = [10, 20, 50, 100],
  css = {},
} = defineProps<{
  // 数据
  total: number;
  currentPage?: number;
  pageSize?: number;

  // 模式
  mode?: 'small' | 'medium' | 'large';

  // 功能开关
  disabled?: boolean;
  showTotal?: boolean;
  showJumper?: boolean;
  showPageSizeChanger?: boolean;
  pageSizeOptions?: number[];

  // 样式覆盖
  css?: Record<string, string>;
}>();

const emit = defineEmits<{ 
  (e: 'update:currentPage', page: number): void;
  (e: 'update:pageSize', size: number): void;
  (e: 'change', page: number, size: number): void;
}>();

// 内部状态，用于 v-model
const internalCurrentPage = ref<number>(currentPage);
const internalPageSize = ref<number>(pageSize);
const jumperPage = ref<number | string>(currentPage);

// 计算总页数
const totalPages = computed<number>(() => Math.ceil(total / internalPageSize.value));

// 动态计算 style，用于覆盖 CSS 变量
const componentStyle = computed(() => {
  // 将 props.css 转换为 CSSProperties 类型，以解决 TypeScript 类型问题
  return { ...css } as CSSProperties;
});

// 监听外部 props 变化，同步内部状态
watch(() => currentPage, (newPage) => {
  internalCurrentPage.value = newPage;
});
watch(() => pageSize, (newSize) => {
  internalPageSize.value = newSize;
});

// 计算要显示的页码数组
const paginatedPages = computed<(number | string)[]>(() => {
  const pages: (number | string)[] = [];
  const total = totalPages.value;
  const current = internalCurrentPage.value;
  const pageBufferSize = mode === 'large' ? 2 : 1; // 当前页码前后显示的页码数
  const edgeBufferSize = mode === 'large' ? 2 : 1; // 边缘页码数

  if (total <= (pageBufferSize * 2) + (edgeBufferSize * 2) + 1) {
    // 如果总页数不多，全部显示
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // 显示第一页
    pages.push(1);
    if (edgeBufferSize > 1 && mode === 'large') pages.push(2);

    // 前置省略号
    if (current > pageBufferSize + edgeBufferSize + 1) {
      pages.push('...');
    }

    // 中间页码
    const start = Math.max(edgeBufferSize + 1, current - pageBufferSize);
    const end = Math.min(total - edgeBufferSize, current + pageBufferSize);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
         pages.push(i);
      }
    }

    // 后置省略号
    if (current < total - pageBufferSize - edgeBufferSize) {
      pages.push('...');
    }

    // 显示最后几页
    if (edgeBufferSize > 1 && mode === 'large') {
        if (!pages.includes(total - 1)) pages.push(total - 1);
    }
    if (!pages.includes(total)) pages.push(total);

  }
  return pages;
});

// --- 事件处理 ---
function changePage(page: number) {
  if (disabled || page < 1 || page > totalPages.value || page === internalCurrentPage.value) {
    return;
  }
  internalCurrentPage.value = page;
  jumperPage.value = page;
  emit('update:currentPage', page);
  emit('change', page, internalPageSize.value);
}

function handlePageChange(page: number | string) {
  if (typeof page === 'number') {
    changePage(page);
  }
}

function handlePrev() {
  changePage(internalCurrentPage.value - 1);
}

function handleNext() {
  changePage(internalCurrentPage.value + 1);
}

function handleJumper() {
  const page = Number(jumperPage.value);
  if (!isNaN(page) && page >= 1 && page <= totalPages.value) {
    changePage(page);
  } else {
    jumperPage.value = internalCurrentPage.value; // 输入无效则重置
  }
}

function handlePageSizeChange() {
  // 页码大小改变时，可能当前页码会超出范围，需要调整
  if (internalCurrentPage.value > totalPages.value) {
    changePage(totalPages.value);
  }
  emit('update:pageSize', internalPageSize.value);
  emit('change', internalCurrentPage.value, internalPageSize.value);
}
</script>

<style lang="less" scoped>
.pagination-container {
  // --- 自有 CSS 变量定义 ---
  // 变量被 props 注入，如果 props 为 null/undefined，则使用第二个值（全局主题变量）作为回退
  --pagination-text-color: var(--color-text);
  --pagination-border-color: var(--color-border);
  --pagination-bg-color: var(--color-background);
  --pagination-hover-bg: var(--color-background-soft);
  --pagination-active-bg: var(--color-primary);
  --pagination-active-text: var(--color-text-light-solid);
  --pagination-active-border-color: var(--color-primary);

  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--pagination-text-color);
  user-select: none;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-total {
    margin-right: var(--spacing-md);
  }

  .pagination-nav,
  .page-item {
    min-width: 2rem;
    height: 2rem;
    padding: 0 var(--spacing-sm);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--pagination-border-color);
    border-radius: var(--border-radius-sm);
    background-color: var(--pagination-bg-color);
    cursor: pointer;
    transition: all 0.2s ease;

    &:not(:disabled):hover {
      background-color: var(--pagination-hover-bg);
      border-color: var(--pagination-active-border-color);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .page-item {
    &.active {
      background-color: var(--pagination-active-bg);
      color: var(--pagination-active-text);
      border-color: var(--pagination-active-border-color);
      font-weight: var(--font-weight-bold);
    }

    &.ellipsis {
      border: none;
      background: transparent;
      cursor: default;
      &:hover {
        background-color: transparent;
        border-color: transparent;
      }
    }
  }

  .pagination-pages {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: var(--spacing-sm);
  }

  .pagination-sizer,
  .pagination-jumper {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);

    select,
    input {
      width: 5rem;
      height: 2rem;
      padding: 0 var(--spacing-sm);
      border: 1px solid var(--pagination-border-color);
      border-radius: var(--border-radius-sm);
      background-color: var(--pagination-bg-color);
      color: var(--pagination-text-color);

      &:focus {
        outline: none;
        border-color: var(--pagination-active-border-color);
      }
    }
    input {
      width: 3rem;
      text-align: center;
    }
  }

  // --- 模式调整 ---
  &.pagination--small {
    font-size: var(--font-size-xs);
    gap: var(--spacing-xs);

    .pagination-nav,
    .page-item {
      min-width: 1.5rem;
      height: 1.5rem;
      padding: 0 var(--spacing-xs);
    }

    .pagination-pages {
      gap: var(--spacing-xs);
    }
  }

  &.pagination--large {
    font-size: var(--font-size-md);
    gap: var(--spacing-md);

    .pagination-nav,
    .page-item {
      min-width: 2.5rem;
      height: 2.5rem;
    }
  }
}
</style>