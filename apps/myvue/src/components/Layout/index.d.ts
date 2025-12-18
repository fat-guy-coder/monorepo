export interface LayoutPartState {
  isVisible: boolean // 是否显示
  isFixed: boolean // 是否固定
  size: number // 大小
  top?: 0 // 顶部位置
  width?: number // 宽度
  collapsible?: boolean // 是否可折叠
  isFullHeight?: boolean // 是否占满高度
}
