export interface TreeNode {
  id: string | number
  label: string
  children?: TreeNode[]
  [key: string]: unknown
}

export type TreeNodeClick = (node: TreeNode, nodeEl: HTMLElement) => void
export type TreeNodeExpand = (node: TreeNode) => void
export type TreeNodeCollapse = (node: TreeNode) => void
