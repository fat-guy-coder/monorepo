// 标签页数据模型（浏览器式分组）
export type Tab = {
  type: 'tab'
  name: string // 路由 name
  path: string // 路由 path
  label: string // 标签名
  scrollTop?: number // 滚动位置
}

export type TabGroup = {
  type: 'group'
  id: string // 组唯一 id
  label: string // 组名
  color: string // 组色（预设色板）
  collapsed: boolean // 是否折叠
  tabs: Tab[] // 组内标签（有序）
}

// 标签条有序节点：要么是独立标签，要么是组
export type TabNode = Tab | TabGroup

// 组色预设（Chrome 风格 8 色）
export const GROUP_COLORS = [
  '#808080',
  '#4285f4',
  '#ea4335',
  '#fbbc04',
  '#34a853',
  '#f538a0',
  '#a142f4',
  '#00bcd4',
] as const
