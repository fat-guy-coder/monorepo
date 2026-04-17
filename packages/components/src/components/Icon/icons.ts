import { ref, computed, watch } from 'vue'
import { Input, Select, SelectOption } from 'components'
import * as LucideIcons from 'lucide-vue-next'

// 获取所有图标名称
const iconNames = Object.keys(LucideIcons).filter(name => {
  // 过滤掉非组件（如工具函数）
  const icon = (LucideIcons as any)[name]
  return icon && icon.name && icon.component
})

// 常用图标分类（手动分类一些常用图标）
const popularIcons = [
  'home', 'settings', 'user', 'users', 'folder', 'folderOpen',
  'file', 'fileText', 'image', 'video', 'music', 'camera',
  'mail', 'inbox', 'send', 'messageSquare', 'phone', 'bell',
  'calendar', 'clock', 'alertCircle', 'info', 'helpCircle',
  'check', 'x', 'plus', 'minus', 'search', 'menu', 'list',
  'grid', 'layout', 'sidebar', 'chevronDown', 'chevronRight',
  'arrowRight', 'arrowLeft', 'arrowUp', 'arrowDown',
  'edit', 'trash', 'copy', 'clipboard', 'download', 'upload',
  'save', 'refresh', 'eye', 'eyeOff', 'lock', 'unlock',
  'key', 'shield', 'server', 'database', 'cloud', 'code',
  'terminal', 'gitBranch', 'gitMerge', 'package', 'layers',
  'book', 'bookOpen', 'graduationCap', 'lightbulb', 'brain',
  'star', 'heart', 'thumbsUp', 'share', 'link', 'externalLink',
  'zap', 'bolt', 'flame', 'gem', 'crown', 'shieldCheck',
  'target', 'compass', 'map', 'navigation', 'globe', 'world',
  'barChart', 'pieChart', 'trendingUp', 'trendingDown',
  'filter', 'sortAsc', 'sortDesc', 'sliders', 'settings2',
  'tool', 'wrench', 'hammer', 'build', 'cpu', 'hardDrive',
  'monitor', 'smartphone', 'tablet', 'laptop', 'tv',
  'wifi', 'bluetooth', 'share2', 'printer', 'scanner'
]

export { popularIcons, iconNames, LucideIcons }

export interface IconSelectorProps {
  modelValue?: string
  placeholder?: string
}

export function useIconSelector(props: IconSelectorProps) {
  const searchValue = ref('')
  const isOpen = ref(false)

  const filteredIcons = computed(() => {
    const search = searchValue.value.toLowerCase()
    if (!search) return popularIcons
    return iconNames.filter(name =>
      name.toLowerCase().includes(search)
    ).slice(0, 100) // 限制最多100个
  })

  const selectedIcon = computed(() => props.modelValue || '')

  const handleSelect = (iconName: string) => {
    searchValue.value = ''
    return iconName
  }

  const handleClear = () => {
    searchValue.value = ''
  }

  return {
    searchValue,
    isOpen,
    filteredIcons,
    selectedIcon,
    handleSelect,
    handleClear
  }
}
