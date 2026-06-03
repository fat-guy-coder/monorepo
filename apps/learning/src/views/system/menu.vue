<template>
  <div class="menu-management">
    <!-- Header: Search fields and Add button -->
    <div class="menu-header">
      <div class="search-form">
        <div class="form-item">
          <label>项目</label>
          <Select v-model="searchForm.project" :options="projectOptions" placeholder="全部项目"
            @update:modelValue="handleSearch" />
        </div>
        <div class="form-item">
          <label>菜单名称</label>
          <Input v-model="searchForm.label" placeholder="输入菜单名称搜索" @search="handleSearch" />
        </div>
      </div>
      <Button type="primary" @click="handleAddRoot">新增菜单</Button>
    </div>

    <!-- Tree Body -->
    <div class="menu-tree-container">
      <Spin v-if="loading" />
      <div v-else-if="treeData.length === 0" class="empty">暂无菜单数据</div>
      <Tree v-else ref="treeRef" :data="treeData" :default-expanded-keys="defaultExpandedKeys"
        @node-click="handleNodeClick" @node-expand="handleNodeExpand" @node-collapse="handleNodeCollapse">
        <template #node="{ node, expanded }">
          <span class="tree-label">{{ node.label }}</span>
          <span v-if="node.loading" class="loading-indicator">加载中...</span>
          <span class="node-actions">
            <Button size="sm" text @click.stop="handleAddChildOf(node)">新增</Button>
            <Button size="sm" text @click.stop="handleEditOf(node)">编辑</Button>
            <Button size="sm" text @click.stop="handleDeleteOf(node)">删除</Button>
          </span>
        </template>
      </Tree>
    </div>

    <!-- Add/Edit Modal -->
    <MenuFormModal :key="menuFormKey" v-model:visible="menuFormVisible" :mode="menuFormMode" :node="menuFormNode"
      :parentMenuOptions="parentMenuOptions" :project="searchForm.project" @submit="handleMenuFormSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Tree, Select, Button, Spin, message, confirm, MenuFormModal } from 'components'
import type { TreeNode } from 'components'
import {
  getApiMenus,
  postApiMenus,
  putApiMenusId,
  deleteApiMenusId,
  type MenuItem,
  type PostApiMenusRequest,
  type PutApiMenusIdRequest,
} from '@/api/menu'

const loading = ref(false)
const treeRef = ref()
const treeData = ref<TreeNode[]>([])
const defaultExpandedKeys = ref<(string | number)[]>([])
const selectedNode = ref<TreeNode | null>(null)

const searchForm = reactive({
  project: 'learning',
  label: 'learning',
})

// Project options for select
const projectOptions = [
  { label: 'admin', value: 'admin' },
  { label: 'learning', value: 'learning' },
  { label: 'main', value: 'main' },
]

// Flatten tree data for parent menu options
const parentMenuOptions = computed(() => {
  const flatten = (nodes: TreeNode[], level = 0): { label: string; value: string; path?: string }[] => {
    const result: { label: string; value: string; path?: string }[] = []
    for (const node of nodes) {
      result.push({
        label: '　'.repeat(level) + node.label,
        value: node.id as string,
        path: node.path as string | undefined,
      })
      if (node.children?.length) {
        result.push(...flatten(node.children, level + 1))
      }
    }
    return result
  }
  // 添加"根目录"选项，value 为空字符串表示顶级菜单
  return [{ label: '根目录', value: '', path: '' }, ...flatten(treeData.value)]
})

// Find node in tree by id
const findNode = (nodes: TreeNode[], id: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children) {
      const found = findNode(node.children, id)
      if (found) return found
    }
  }
  return null
}

// Find parent node in tree by child id
const findParentNode = (nodes: TreeNode[], childId: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.children?.some(child => child.id === childId)) {
      return node
    }
    if (node.children) {
      const found = findParentNode(node.children, childId)
      if (found) return found
    }
  }
  return null
}

// Update node in tree by id
const updateNodeInTree = (nodes: TreeNode[], id: string, updates: Partial<TreeNode>): boolean => {
  for (const node of nodes) {
    if (node.id === id) {
      Object.assign(node, updates)
      return true
    }
    if (node.children && updateNodeInTree(node.children, id, updates)) {
      return true
    }
  }
  return false
}

// Remove node from tree by id
const removeNodeFromTree = (nodes: TreeNode[], id: string): boolean => {
  const index = nodes.findIndex(node => node.id === id)
  if (index !== -1) {
    nodes.splice(index, 1)
    return true
  }
  for (const node of nodes) {
    if (node.children && removeNodeFromTree(node.children, id)) {
      return true
    }
  }
  return false
}

// Add child node to parent in tree
const addChildToNode = (nodes: TreeNode[], parentId: string, newChild: TreeNode): boolean => {
  for (const node of nodes) {
    if (node.id === parentId) {
      if (!node.children) {
        node.children = []
      }
      // 更新父节点的 isLeaf 为 false，确保显示展开图标
      node.isLeaf = false
      node.children.push(newChild)
      return true
    }
    if (node.children && addChildToNode(node.children, parentId, newChild)) {
      return true
    }
  }
  return false
}

const menuFormVisible = ref(false)
const menuFormKey = ref(0)
const menuFormMode = ref<'add' | 'addChild' | 'edit'>('add')
const menuFormNode = ref<TreeNode | null>(null)

// 表单状态已由 MenuFormModal 组件管理，这里只保留打开/关闭控制

// Convert MenuItem to TreeNode (preserve all properties)
const menuToTreeNode = (menu: MenuItem): TreeNode => {
  const { children, ...rest } = menu
  return {
    id: menu.id ?? '',
    label: menu.label || menu.name || '',
    // 如果 API 返回了 children，用它；否则不设置 children，表示可能有子菜单（需要异步加载）
    children: children ? children.map(menuToTreeNode) : undefined,
    loading: false,
    ...rest,
  } as TreeNode
}

// Fetch root menus from API
const fetchMenus = async () => {
  loading.value = true
  try {
    const res = await getApiMenus({
      project: searchForm.project || undefined,
      root: 'true',
    })
    if (res.data && Array.isArray(res.data)) {
      treeData.value = res.data.map(menuToTreeNode)
    } else {
      treeData.value = []
    }
  } catch (error) {
    console.error('Failed to fetch menus:', error)
    message.error('获取菜单列表失败')
  } finally {
    loading.value = false
  }
}

// Load children for a node
const loadNodeChildren = async (node: TreeNode) => {
  if (node.loading) return
  if (node.children && node.children.length > 0) return // 已有子菜单

  node.loading = true
  try {
    const res = await getApiMenus({ parentId: node.id as string })
    if (res.data && Array.isArray(res.data)) {
      node.children = res.data.map(menuToTreeNode)
      // 如果没有子菜单，更新 isLeaf 为 true
      if (node.children.length === 0) {
        node.isLeaf = true
      }
    }
  } catch (error) {
    console.error('Failed to load children:', error)
    message.error('加载子菜单失败')
  } finally {
    node.loading = false
  }
}

const handleSearch = () => {
  fetchMenus()
}

const handleNodeClick = (node: TreeNode) => {
  selectedNode.value = node
}

const handleNodeExpand = async (node: TreeNode) => {
  if (!defaultExpandedKeys.value.includes(node.id)) {
    defaultExpandedKeys.value.push(node.id)
  }
  // 异步加载子菜单
  await loadNodeChildren(node)
}

const handleNodeCollapse = (node: TreeNode) => {
  defaultExpandedKeys.value = defaultExpandedKeys.value.filter(
    (key) => key !== node.id
  )
}

const handleAddRoot = () => {
  menuFormNode.value = null
  menuFormKey.value++
  menuFormMode.value = 'add'
  menuFormVisible.value = true
}

const handleAddChildOf = (node: TreeNode) => {
  selectedNode.value = node
  menuFormNode.value = node
  menuFormKey.value++
  menuFormMode.value = 'addChild'
  menuFormVisible.value = true
}

const handleEditOf = (node: TreeNode) => {
  selectedNode.value = node
  menuFormNode.value = node
  menuFormKey.value++
  menuFormMode.value = 'edit'
  menuFormVisible.value = true
}

const handleDeleteOf = async (node: TreeNode) => {
  const confirmed = await confirm({
    title: '删除确认',
    message: `确定要删除菜单"${node.label}"吗？`,
    confirmText: '删除',
    cancelText: '取消',
    confirmType: 'danger',
  })
  if (!confirmed) return

  try {
    await deleteApiMenusId(node.id as string)
    message.success('删除成功')
    // 从树中直接移除节点
    removeNodeFromTree(treeData.value, node.id as string)
    // 如果被删除的是默认展开的节点，也移除
    defaultExpandedKeys.value = defaultExpandedKeys.value.filter(key => key !== node.id)
  } catch (error) {
    message.error('删除失败')
  }
}

interface MenuFormSubmitData {
  id?: string
  name: string
  label: string
  order: number
  project: string
  parentId: string
}

const handleMenuFormSubmit = async (data: MenuFormSubmitData) => {
  if (!data.label) { message.error('请输入菜单名称'); return }
  if (!data.name) { message.error('请输入英文名称'); return }

  // 用 treeData 计算完整路径
  let fullPath = ''
  if (!data.parentId) {
    fullPath = '/' + data.name
  } else {
    const parentNode = findNode(treeData.value, data.parentId)
    const parentPath = parentNode ? ((parentNode.path as string) || '') : ''
    fullPath = parentPath ? parentPath.replace(/\/$/, '') + '/' + data.name : '/' + data.name
  }

  try {
    if (menuFormMode.value === 'edit' && data.id) {
      const updateData: PutApiMenusIdRequest = {
        name: data.name, label: data.label, path: fullPath,
        order: data.order, project: data.project, parentId: data.parentId,
      }
      await putApiMenusId(data.id, updateData)
      message.success('更新成功')
      updateNodeInTree(treeData.value, data.id, {
        label: data.label, name: data.name, path: fullPath,
        order: data.order, project: data.project, parentId: data.parentId,
      })
    } else {
      const createData: PostApiMenusRequest = {
        name: data.name, label: data.label, path: fullPath,
        order: data.order, project: data.project, parentId: data.parentId,
      }
      const res = await postApiMenus(createData)
      message.success('创建成功')
      const newNode: TreeNode = {
        id: res.data?.id ?? `temp-${Date.now()}`,
        label: data.label, name: data.name, path: fullPath,
        order: data.order, project: data.project, parentId: data.parentId,
        children: [],
      }
      if (data.parentId) {
        addChildToNode(treeData.value, data.parentId, newNode)
        if (!defaultExpandedKeys.value.includes(data.parentId)) {
          defaultExpandedKeys.value.push(data.parentId)
        }
      } else {
        treeData.value.push(newNode)
      }
    }
    menuFormVisible.value = false
  } catch (error) {
    console.error('Failed to submit:', error)
    message.error('操作失败')
  }
}

const route = useRoute()

onMounted(async () => {
  await fetchMenus()

  // 如果 URL 带 expandPath query 参数，自动展开对应菜单项所在的父级
  const expandPath = route.query.expandPath as string | undefined
  if (expandPath) {
    try {
      // 用 flat 方式获取所有菜单（仅 admin 触发，一次性请求）
      const { data: allMenus } = await getApiMenus({
        project: searchForm.project || undefined,
        flat: 'true',
      })
      if (!allMenus?.length) return

      // 找到目标菜单项
      const targetMenu = (allMenus as MenuItem[]).find(m => m.path === expandPath)
      if (!targetMenu) return

      // 追溯父级链（id 列表，从根到目标）
      const parentIds: string[] = []
      let currentId: string | null | undefined = targetMenu.parentId
      while (currentId) {
        const parent = (allMenus as MenuItem[]).find(m => m.id === currentId)
        if (parent) {
          parentIds.unshift(parent.id!)
          currentId = parent.parentId
        } else {
          break
        }
      }

      // 对每个父级节点加载子菜单并展开
      for (const parentId of parentIds) {
        const parentNode = findNode(treeData.value, parentId)
        if (parentNode) {
          await loadNodeChildren(parentNode)
        }
      }
      defaultExpandedKeys.value = parentIds

      // 延迟滚动到目标项（等 Tree 渲染完）
      setTimeout(() => {
        const el = document.getElementById(expandPath)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 500)
    } catch {
      // expandPath 处理失败不阻塞页面
    }
  }
})
</script>

<style scoped>
.menu-management {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

}

.menu-header {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  padding: 16px;
  background: var(--color-background);
  border-radius: 8px;
}

.search-form {
  display: flex;
  gap: 16px;
  align-items: flex-end;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 160px;
}

.form-item label {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.menu-tree-container {
  flex: 1;
  min-height: 200px;
  background: var(--color-background);
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;

}

.loading,
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: var(--color-text-secondary);
}

.action-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 12px 16px;
  background: var(--color-background);
  border-radius: 8px;
}

.selected-info {
  flex: 1;
  color: var(--color-text-secondary);
  font-size: 14px;
}

/* Modal form */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-form .form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal-form .form-item label {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.required {
  color: #ff3333;
}

.btn-danger {
  color: #ff3333;
  border-color: #ff3333;
}

.btn-danger:hover {
  background-color: rgba(255, 51, 51, 0.1);
}

.node-actions {
  display: flex;
  gap: 4px;
  margin-left: 8px;
}

.tree-arrow-placeholder {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.tree-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  color: var(--color-text-secondary, #999);
  transition: transform 0.2s;
}

.tree-arrow.expanded {
  transform: rotate(90deg);
}

.tree-icon {
  margin-right: 6px;
  font-size: 14px;
}

.loading-indicator {
  margin-left: 8px;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.tree-label {
  flex: 1;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.display-text {
  padding: 8px 0;
  color: var(--color-text);
  font-size: 14px;
}

.path-text {
  font-family: monospace;
  color: var(--color-text-secondary);
}
</style>
