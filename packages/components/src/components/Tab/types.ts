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

// 组色预设（Chrome 风格，共 16 色）
export const GROUP_COLORS = [
  // 基础 8 色（保持顺序，已存组的颜色不受影响）
  '#808080', // 灰
  '#4285f4', // 蓝
  '#ea4335', // 红
  '#fbbc04', // 黄
  '#34a853', // 绿
  '#f538a0', // 粉
  '#a142f4', // 紫
  '#00bcd4', // 青
  // 扩展 8 色
  '#ff7043', // 深橙
  '#8d6e63', // 棕
  '#26a69a', // 蓝绿
  '#3949ab', // 靛蓝
  '#9e9d24', // 橄榄
  '#d81b60', // 玫红
  '#5e35b1', // 深紫
  '#7cb342', // 草绿
] as const
