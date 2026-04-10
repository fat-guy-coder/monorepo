// 使用 import.meta.glob 自动导入所有 views 下的组件
// 这样可以动态根据路径加载组件，支持懒加载
const viewModules = import.meta.glob('./**/*.vue', { eager: false })

/**
 * 根据路径动态加载视图组件
 * @param path 例如: /LearningAbility/FrontendIsWhat
 * @returns 懒加载的异步组件
 */
export function loadViewByPath(path: string): () => Promise<any> {
  // 移除开头的 /，然后转换为文件路径
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  // 例如: LearningAbility/FrontendIsWhat -> ./LearningAbility/FrontendIsWhat.vue
  const filePath = `./${normalizedPath}.vue`

  const loader = viewModules[filePath]
  if (loader) {
    return loader
  }

  // 找不到对应的组件，返回一个永远不解析的 Promise（显示 404）
  return () => Promise.reject(new Error(`View not found: ${path}`))
}

/**
 * 检查视图是否存在
 */
export function viewExists(path: string): boolean {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  const filePath = `./${normalizedPath}.vue`
  return !!viewModules[filePath]
}
