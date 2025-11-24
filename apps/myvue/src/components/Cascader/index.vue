<template>
  <div class="cascader-wrapper" :class="{ 'is-open': isOpen }" ref="wrapperRef">
    <div
      class="cascader-input"
      :class="{ 'is-focused': isOpen, 'is-disabled': disabled }"
      @click="handleInputClick"
      @mouseenter="handleInputMouseEnter"
      @mouseleave="handleInputMouseLeave"
    >
      <span v-if="displayValue" class="cascader-input__value">{{ displayValue }}</span>
      <span v-else class="cascader-input__placeholder">{{ placeholder }}</span>
      <span class="cascader-input__arrow" :class="{ 'is-open': isOpen }">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </span>
    </div>
    <div
      v-if="isOpen"
      class="cascader-dropdown"
      :style="dropdownStyle"
      ref="dropdownRef"
      @mouseenter="handleDropdownEnter"
      @mouseleave="handleDropdownLeave"
    >
      <div
        v-for="(pane, paneIndex) in panes"
        :key="paneIndex"
        class="cascader-pane"
        :style="getPaneStyle(pane, paneIndex)"
        :ref="(el) => setPaneRef(el, paneIndex)"
      >
        <ul class="cascader-pane__list">
          <li
            v-for="option in pane.options"
            :key="option.value"
            class="cascader-option"
            :class="{
              'is-active': isActive(option, paneIndex),
              'is-hover': isHovered(option, paneIndex),
              'is-loading': isLoading(option),
              'is-leaf': !hasChildren(option) && !option.loadChildren,
            }"
            @mouseenter="handleOptionEnter(option, paneIndex)"
            @mouseleave="handleOptionLeave()"
            @click="handleOptionClick(option, paneIndex)"
          >
            <span class="cascader-option__label">{{ option.label }}</span>
            <span v-if="hasChildren(option) || option.loadChildren" class="cascader-option__arrow">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.5 5.5L15 12 8.5 18.5" />
              </svg>
            </span>
            <span v-if="isLoading(option)" class="cascader-option__loading">
              <svg class="spinner" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                  <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416;0 31.416" repeatCount="indefinite" />
                  <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416;-31.416" repeatCount="indefinite" />
                </circle>
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { ComponentPublicInstance } from 'vue'

interface CascaderOption {
  value: string
  label: string
  children?: CascaderOption[]
  loadChildren?: () => Promise<CascaderOption[]>
  loading?: boolean
}

interface CascaderPane {
  options: CascaderOption[]
  triggerElement?: HTMLElement
  triggerOption?: CascaderOption
}

defineOptions({
  name: 'AppCascader',
})

const props = withDefaults(
  defineProps<{
    options?: CascaderOption[]
    value?: string | string[]
    placeholder?: string
    disabled?: boolean
    loadData?: (option: CascaderOption) => Promise<CascaderOption[]>
  }>(),
  {
    options: () => [],
    placeholder: '请选择',
    disabled: false,
  }
)

const emit = defineEmits<{
  (event: 'update:value', value: string | string[]): void
  (event: 'change', value: string | string[], selectedOptions: CascaderOption[]): void
}>()

const wrapperRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const paneRefs = new Map<number, HTMLElement>()
const isOpen = ref(false)
const panes = ref<CascaderPane[]>([])
const hoveredOption = ref<{ option: CascaderOption; paneIndex: number } | null>(null)
const selectedPath = ref<CascaderOption[]>([])
const dropdownStyle = ref<Record<string, string>>({})
let hoverTimer: number | null = null
const supportsHover = ref(false)

const hasChildren = (option: CascaderOption) => {
  return Array.isArray(option.children) && option.children.length > 0
}

const isActive = (option: CascaderOption, paneIndex: number) => {
  if (selectedPath.value.length === 0) return false
  return selectedPath.value[paneIndex]?.value === option.value
}

const isHovered = (option: CascaderOption, paneIndex: number) => {
  return hoveredOption.value?.option.value === option.value && hoveredOption.value?.paneIndex === paneIndex
}

const isLoading = (option: CascaderOption) => {
  return Boolean(option.loading)
}

const displayValue = computed(() => {
  if (selectedPath.value.length === 0) return ''
  return selectedPath.value.map((opt) => opt.label).join(' / ')
})

const handleInputClick = () => {
  if (props.disabled) return
  toggleDropdown()
}

const handleInputMouseEnter = () => {
  if (props.disabled || !supportsHover.value) return
  if (hoverTimer) {
    clearTimeout(hoverTimer)
  }
}

const handleInputMouseLeave = () => {
  if (props.disabled || !supportsHover.value) return
  if (hoverTimer) {
    clearTimeout(hoverTimer)
  }
  hoverTimer = window.setTimeout(() => {
    if (!isHoveringDropdown()) {
      closeDropdown()
    }
  }, 200)
}

const handleDropdownEnter = () => {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }
}

const handleDropdownLeave = () => {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
  }
  hoverTimer = window.setTimeout(() => {
    closeDropdown()
  }, 200)
}

const isHoveringDropdown = () => {
  if (!dropdownRef.value) return false
  const rect = dropdownRef.value.getBoundingClientRect()
  const mouseX = (window as Window & { __lastMouseX?: number }).__lastMouseX || 0
  const mouseY = (window as Window & { __lastMouseY?: number }).__lastMouseY || 0
  return (
    mouseX >= rect.left &&
    mouseX <= rect.right &&
    mouseY >= rect.top &&
    mouseY <= rect.bottom
  )
}

const toggleDropdown = () => {
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

const openDropdown = () => {
  if (props.disabled) return
  isOpen.value = true
  panes.value = [{ options: props.options }]
  nextTick(() => {
    updateDropdownPosition()
  })
}

const closeDropdown = () => {
  isOpen.value = false
  panes.value = []
  hoveredOption.value = null
}

const setPaneRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  if (!el) {
    paneRefs.delete(index)
    return
  }
  const element = el instanceof HTMLElement ? el : (el as ComponentPublicInstance).$el as HTMLElement
  if (element) {
    paneRefs.set(index, element)
  }
}

const updateDropdownPosition = () => {
  if (!wrapperRef.value) return
  const rect = wrapperRef.value.getBoundingClientRect()
  dropdownStyle.value = {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
  }
}

const getPaneStyle = (pane: CascaderPane, paneIndex: number) => {
  const style: Record<string, string> = {
    zIndex: `${1000 + paneIndex}`,
  }

  if (paneIndex === 0) {
    return style
  }

  // 后续面板需要与前一个面板对齐
  nextTick(() => {
    updatePanePosition(pane, paneIndex)
  })

  return style
}

const updatePanePosition = (pane: CascaderPane, paneIndex: number) => {
  const prevPaneEl = paneRefs.get(paneIndex - 1)
  const currentPaneEl = paneRefs.get(paneIndex)
  if (!prevPaneEl || !currentPaneEl || !pane.triggerElement) return

  const triggerRect = pane.triggerElement.getBoundingClientRect()
  const prevPaneRect = prevPaneEl.getBoundingClientRect()
  const gap = 4
  const paneWidth = currentPaneEl.offsetWidth || 200
  const viewportWidth = window.innerWidth

  // 计算位置：子面板的顶部与触发选项对齐
  const top = triggerRect.top
  let left = prevPaneRect.right + gap

  // 如果右侧空间不足，切换到左侧
  if (left + paneWidth > viewportWidth && prevPaneRect.left - paneWidth - gap >= 0) {
    left = prevPaneRect.left - paneWidth - gap
  }

  currentPaneEl.style.position = 'fixed'
  currentPaneEl.style.top = `${top}px`
  currentPaneEl.style.left = `${left}px`
}

const handleOptionEnter = async (option: CascaderOption, paneIndex: number) => {
  hoveredOption.value = { option, paneIndex }

  // 如果有子选项，显示下一级面板
  if (hasChildren(option)) {
    showNextPane(option, paneIndex)
  } else if (option.loadChildren && !option.loading) {
    // 如果需要异步加载
    await loadChildren(option, paneIndex)
  } else {
    // 如果没有子选项，移除后续面板
    panes.value = panes.value.slice(0, paneIndex + 1)
  }
}

const handleOptionLeave = () => {
  // 延迟处理，给鼠标移动到子面板的时间
  if (hoverTimer) {
    clearTimeout(hoverTimer)
  }
  hoverTimer = window.setTimeout(() => {
    // 检查鼠标是否在子面板中
    const nextPaneIndex = hoveredOption.value ? hoveredOption.value.paneIndex + 1 : -1
    if (nextPaneIndex >= 0 && nextPaneIndex < panes.value.length) {
      const nextPaneEl = paneRefs.get(nextPaneIndex)
      if (nextPaneEl) {
        const rect = nextPaneEl.getBoundingClientRect()
        const mouseX = (window as Window & { __lastMouseX?: number }).__lastMouseX || 0
        const mouseY = (window as Window & { __lastMouseY?: number }).__lastMouseY || 0
        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          return // 鼠标在子面板中，不处理
        }
      }
    }
    // 鼠标不在子面板中，移除后续面板
    if (hoveredOption.value) {
      panes.value = panes.value.slice(0, hoveredOption.value.paneIndex + 1)
    }
  }, 100)
}

const handleOptionClick = (option: CascaderOption, paneIndex: number) => {
  // 更新选中路径
  selectedPath.value = panes.value
    .slice(0, paneIndex + 1)
    .map((pane) => pane.triggerOption!)
    .concat([option])

  // 如果是叶子节点，关闭下拉框并触发事件
  if (!hasChildren(option) && !option.loadChildren) {
    const values = selectedPath.value.map((opt) => opt.value)
    const finalValue = Array.isArray(props.value) ? values : values[values.length - 1]
    emit('update:value', finalValue)
    emit('change', finalValue, selectedPath.value)
    closeDropdown()
  } else {
    // 如果有子选项，继续显示下一级
    handleOptionEnter(option, paneIndex)
  }
}

const showNextPane = (option: CascaderOption, paneIndex: number) => {
  // 找到触发选项的 DOM 元素
  const currentPaneEl = paneRefs.get(paneIndex)
  if (!currentPaneEl) return

  const buttons = currentPaneEl.querySelectorAll<HTMLElement>('.cascader-option')
  let triggerElement: HTMLElement | null = null

  for (const btn of Array.from(buttons)) {
    const labelEl = btn.querySelector('.cascader-option__label')
    if (labelEl?.textContent === option.label) {
      triggerElement = btn
      break
    }
  }

  if (!triggerElement) return

  // 移除后续面板
  panes.value = panes.value.slice(0, paneIndex + 1)

  // 添加新的面板
  const nextPane: CascaderPane = {
    options: option.children || [],
    triggerElement,
    triggerOption: option,
  }
  panes.value.push(nextPane)

  nextTick(() => {
    updatePanePosition(nextPane, paneIndex + 1)
  })
}

const loadChildren = async (option: CascaderOption, paneIndex: number) => {
  if (option.loading) return

  option.loading = true

  try {
    let children: CascaderOption[] = []

    if (option.loadChildren) {
      children = await option.loadChildren()
    } else if (props.loadData) {
      children = await props.loadData(option)
    }

    // 更新选项的 children
    option.children = children
    option.loading = false

    // 显示下一级面板
    if (children.length > 0) {
      showNextPane(option, paneIndex)
    }
  } catch (error) {
    console.error('Failed to load children:', error)
    option.loading = false
  }
}

// 监听 value 变化，更新选中路径
watch(
  () => props.value,
  (newValue) => {
    if (!newValue) {
      selectedPath.value = []
      return
    }

    const values = Array.isArray(newValue) ? newValue : [newValue]
    const path: CascaderOption[] = []

    const findPath = (options: CascaderOption[], targetValues: string[], currentPath: CascaderOption[]): boolean => {
      for (const option of options) {
        const newPath = [...currentPath, option]
        if (option.value === targetValues[0]) {
          if (targetValues.length === 1) {
            path.push(...newPath)
            return true
          }
          if (hasChildren(option)) {
            return findPath(option.children!, targetValues.slice(1), newPath)
          }
        }
      }
      return false
    }

    findPath(props.options, values, [])
    selectedPath.value = path
  },
  { immediate: true }
)

// 监听窗口大小变化，更新下拉框位置
const handleResize = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    const hoverMedia = window.matchMedia('(hover: hover)')
    supportsHover.value = hoverMedia.matches

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize, true)

    // 跟踪鼠标位置
    document.addEventListener('mousemove', (e) => {
      const win = window as Window & { __lastMouseX?: number; __lastMouseY?: number }
      win.__lastMouseX = e.clientX
      win.__lastMouseY = e.clientY
    })

    // 点击外部关闭下拉框
    document.addEventListener('click', (e) => {
      if (isOpen.value && wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
        if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
          closeDropdown()
        }
      }
    })
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', handleResize, true)
  }
  if (hoverTimer) {
    clearTimeout(hoverTimer)
  }
})
</script>

<style scoped lang="less">
.cascader-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.cascader-input {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 32px;
  padding: 4px 11px;
  font-size: 14px;
  line-height: 1.5715;
  color: var(--color-text, #1f1f1f);
  background-color: var(--color-bg-container, #fff);
  border: 1px solid var(--color-border, rgba(0, 0, 0, 0.15));
  border-radius: var(--element-border-radius, 4px);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(.is-disabled) {
    border-color: var(--color-border-hover, rgba(0, 0, 0, 0.3));
  }

  &.is-focused {
    border-color: var(--color-primary, #1890ff);
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  &.is-disabled {
    background-color: var(--color-fill, rgba(0, 0, 0, 0.04));
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.cascader-input__value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cascader-input__placeholder {
  flex: 1;
  color: var(--color-text-soft, rgba(0, 0, 0, 0.45));
}

.cascader-input__arrow {
  flex-shrink: 0;
  margin-left: 8px;
  color: var(--color-text-soft, rgba(0, 0, 0, 0.45));
  transition: transform 0.2s ease;

  &.is-open {
    transform: rotate(180deg);
  }

  svg {
    width: 14px;
    height: 14px;
    fill: currentColor;
  }
}

.cascader-dropdown {
  position: fixed;
  z-index: 1000;
  margin-top: 4px;
  background-color: var(--color-bg-container, #fff);
  border: 1px solid var(--color-border, rgba(0, 0, 0, 0.15));
  border-radius: var(--element-border-radius, 4px);
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  max-height: 200px;
  overflow-y: auto;
  display: flex;
}

.cascader-pane {
  position: relative;
  min-width: 200px;
  max-width: 280px;
  border-right: 1px solid var(--color-border, rgba(0, 0, 0, 0.15));

  &:last-child {
    border-right: none;
  }
}

.cascader-pane__list {
  list-style: none;
  margin: 0;
  padding: 4px 0;
}

.cascader-option {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
  padding: 5px 12px;
  font-size: 14px;
  line-height: 1.5715;
  color: var(--color-text, #1f1f1f);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(.is-disabled) {
    background-color: var(--color-fill, rgba(0, 0, 0, 0.04));
  }

  &.is-active {
    background-color: var(--color-fill-secondary, rgba(0, 0, 0, 0.06));
    color: var(--color-primary, #1890ff);
    font-weight: 500;
  }

  &.is-hover {
    background-color: var(--color-fill, rgba(0, 0, 0, 0.04));
  }

  &.is-loading {
    cursor: wait;
  }
}

.cascader-option__label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cascader-option__arrow {
  flex-shrink: 0;
  margin-left: 8px;
  color: var(--color-text-soft, rgba(0, 0, 0, 0.45));

  svg {
    width: 12px;
    height: 12px;
    fill: currentColor;
  }
}

.cascader-option__loading {
  flex-shrink: 0;
  margin-left: 8px;
  width: 14px;
  height: 14px;
  color: var(--color-primary, #1890ff);

  .spinner {
    width: 14px;
    height: 14px;
    animation: rotate 1s linear infinite;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
