<template>
  <div class="icon-selector">
    <div class="icon-preview" @click="toggleDropdown">
      <component v-if="selectedIcon" :is="currentIcon" :size="20" />
      <span v-else class="placeholder">{{ placeholder }}</span>
      <ChevronDown :size="16" class="chevron" :class="{ rotated: isOpen }" />
    </div>

    <Teleport to="body">
      <div v-if="isOpen" class="icon-dropdown" ref="dropdownRef">
        <div class="search-box">
          <Input v-model="searchValue" placeholder="搜索图标..." clearable @clear="handleClear">
            <template #prefix><Search :size="16" /></template>
          </Input>
        </div>
        <div class="icon-list">
          <div
            v-for="iconName in filteredIcons"
            :key="iconName"
            class="icon-item"
            :class="{ selected: iconName === selectedIcon }"
            @click="handleSelect(iconName)"
            :title="iconName"
          >
            <component :is="getIcon(iconName)" :size="20" />
          </div>
          <div v-if="filteredIcons.length === 0" class="no-result">
            未找到图标
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Input } from 'components'
import { Search, ChevronDown } from 'lucide-vue-next'
import * as LucideIcons from 'lucide-vue-next'
import { popularIcons, iconNames } from './icons'

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
}>(), {
  placeholder: '选择图标'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const searchValue = ref('')
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// 常用图标列表（优先显示）
const displayIcons = computed(() => {
  const search = searchValue.value.toLowerCase()
  if (!search) return popularIcons
  // 搜索模式下返回匹配的图标
  return iconNames.filter(name =>
    name.toLowerCase().includes(search)
  ).slice(0, 100)
})

const filteredIcons = computed(() => displayIcons.value)

const selectedIcon = computed(() => props.modelValue || '')

// 动态获取图标组件
const getIcon = (name: string) => {
  return (LucideIcons as any)[name] || null
}

const currentIcon = computed(() => {
  if (!props.modelValue) return null
  return getIcon(props.modelValue)
})

const handleSelect = (iconName: string) => {
  emit('update:modelValue', iconName)
  searchValue.value = ''
  isOpen.value = false
}

const handleClear = () => {
  searchValue.value = ''
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    const target = e.target as HTMLElement
    if (!target.closest('.icon-selector')) {
      isOpen.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.icon-selector {
  position: relative;
  width: 100%;
}

.icon-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  cursor: pointer;
  background: var(--color-background);
  min-height: 40px;
}

.icon-preview:hover {
  border-color: var(--color-primary);
}

.placeholder {
  color: var(--color-text-secondary);
}

.chevron {
  transition: transform 0.2s;
  color: var(--color-text-secondary);
}

.chevron.rotated {
  transform: rotate(180deg);
}

.icon-dropdown {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  max-height: 400px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.search-box {
  padding: 12px;
  border-bottom: 1px solid var(--color-border);
}

.icon-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
  max-height: 320px;
}

.icon-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-item:hover {
  background: var(--color-primary-light);
}

.icon-item.selected {
  background: var(--color-primary);
  color: white;
}

.no-result {
  grid-column: 1 / -1;
  text-align: center;
  padding: 20px;
  color: var(--color-text-secondary);
}
</style>
