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
        <template #node-extra="{ node }">
          <span class="node-actions">
            <Button size="small" @click.stop="handleAddChildOf(node)">新增</Button>
            <Button size="small" @click.stop="handleEditOf(node)">编辑</Button>
            <Button size="small" @click.stop="handleDeleteOf(node)" class="btn-danger">删除</Button>
          </span>
        </template>
      </Tree>
    </div>

    <!-- Add/Edit Modal -->
    <Modal v-model:visible="modalVisible" :title="modalMode === 'edit' ? '编辑菜单' : '新增菜单'" @confirm="handleSubmit"
      @cancel="modalVisible = false">
      <div class="modal-form">
        <div class="form-item">
          <label>菜单名称 <span class="required">*</span></label>
          <Input v-model="formData.label" placeholder="请输入菜单名称" />
        </div>
        <div class="form-item">
          <label>英文名称 <span class="required">*</span></label>
          <Input v-model="formData.name" placeholder="请输入英文名称" />
        </div>
        <div class="form-item">
          <label>路由路径</label>
          <span class="display-text path-text">{{ formData.path || '-' }}</span>
        </div>
        <div class="form-item">
          <label>图标</label>
          <Input v-model="formData.icon" placeholder="请输入图标" />
        </div>
        <div class="form-item">
          <label>排序</label>
          <InputNumber v-model="formData.order" placeholder="数值越小越靠前" />
        </div>
        <div class="form-item">
          <label>父级菜单</label>
          <Select v-model="formData.parentId" :options="parentMenuOptions" :filterable="true" placeholder="搜索或选择父级菜单" />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { Tree, Select, Input, InputNumber, Button, Modal, Spin, message, confirm } from 'components'
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
  project: 'front_learning',
  label: 'front_learning',
})

// Project options for select
const projectOptions = [
  { label: 'admin', value: 'admin' },
  { label: 'front-learning', value: 'front_learning' },
  { label: 'main', value: 'main' },
]

// Flatten tree data for parent menu options
const parentMenuOptions = computed(() => {
  const flatten = (nodes: TreeNode[], level = 0): { label: string; value: string }[] => {
    const result: { label: string; value: string }[] = []
    for (const node of nodes) {
      result.push({
        label: '　'.repeat(level) + node.label,
        value: node.id as string,
      })
      if (node.children?.length) {
        result.push(...flatten(node.children, level + 1))
      }
    }
    return result
  }
  return flatten(treeData.value)
})

// Compute full path based on parent path + name
const computedPath = computed(() => {
  if (!formData.name) return ''
  // Find parent node
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
  const parentNode = formData.parentId ? findNode(treeData.value, formData.parentId) : null
  const parentPath = parentNode ? ((parentNode.path as string) || '') : ''
  const name = formData.name || ''
  if (!parentPath) return '/' + name
  return parentPath.replace(/\/$/, '') + '/' + name
})

const modalVisible = ref(false)
const modalMode = ref<'add' | 'addChild' | 'edit'>('add')
const formData = reactive<PostApiMenusRequest & { id?: string }>({
  name: '',
  label: '',
  path: '',
  icon: '',
  order: 0,
  project: '',
  parentId: '',
})

// Convert MenuItem to TreeNode (preserve all properties)
const menuToTreeNode = (menu: MenuItem): TreeNode => {
  const { children, ...rest } = menu
  return {
    id: menu.id ?? '',
    label: menu.label || menu.name || '',
    children: children?.map(menuToTreeNode),
    ...rest,
  } as TreeNode
}

// Fetch menus from API
const fetchMenus = async () => {
  loading.value = true
  try {
    const res = await getApiMenus({
      project: searchForm.project || undefined,
      tree: 'true',
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

const handleSearch = () => {
  fetchMenus()
}

const handleNodeClick = (node: TreeNode) => {
  selectedNode.value = node
}

const handleNodeExpand = (node: TreeNode) => {
  if (!defaultExpandedKeys.value.includes(node.id)) {
    defaultExpandedKeys.value.push(node.id)
  }
}

const handleNodeCollapse = (node: TreeNode) => {
  defaultExpandedKeys.value = defaultExpandedKeys.value.filter(
    (key) => key !== node.id
  )
}

const resetForm = () => {
  formData.name = ''
  formData.label = ''
  formData.icon = ''
  formData.order = 0
  formData.project = searchForm.project || ''
  formData.parentId = ''
  formData.id = ''
}

const handleAddRoot = () => {
  resetForm()
  modalMode.value = 'add'
  modalVisible.value = true
}

const handleAddChildOf = (node: TreeNode) => {
  selectedNode.value = node
  resetForm()
  formData.parentId = node.id as string
  modalMode.value = 'addChild'
  modalVisible.value = true
}

const handleEditOf = (node: TreeNode) => {
  selectedNode.value = node
  modalMode.value = 'edit'
  // Use node data directly since it's already populated from API
  formData.id = node.id as string
  formData.label = node.label || (node.name as string) || ''
  formData.name = (node.name as string) || ''
  formData.path = (node.path as string) || ''
  formData.icon = (node.icon as string) || ''
  formData.order = (node.order as number) || 0
  formData.project = (node.project as string) || ''
  formData.parentId = (node.parentId as string) || ''
  modalVisible.value = true
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
    fetchMenus()
  } catch (error) {
    message.error('删除失败')
  }
}

const handleSubmit = async () => {
  if (!formData.label) {
    message.error('请输入菜单名称')
    return
  }
  if (!formData.name) {
    message.error('请输入英文名称')
    return
  }

  try {
    // Generate full path from parent path + "/" + name
    const fullPath = computedPath.value

    if (modalMode.value === 'edit' && formData.id) {
      // Update existing menu
      const updateData: PutApiMenusIdRequest = {
        name: formData.name,
        label: formData.label,
        path: fullPath,
        icon: formData.icon,
        order: formData.order,
        project: formData.project,
        parentId: formData.parentId,
      }
      await putApiMenusId(formData.id, updateData)
      message.success('更新成功')
    } else {
      // Create new menu
      const createData: PostApiMenusRequest = {
        name: formData.name,
        label: formData.label,
        path: fullPath,
        icon: formData.icon,
        order: formData.order,
        project: formData.project,
        parentId: formData.parentId,
      }
      await postApiMenus(createData)
      message.success('创建成功')
    }
    modalVisible.value = false
    fetchMenus()
  } catch (error) {
    console.error('Failed to submit:', error)
    message.error('操作失败')
  }
}

onMounted(() => {
  fetchMenus()
})
</script>

<style scoped>
.menu-management {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.menu-header {
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
}

.form-item label {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.menu-tree-container {
  flex: 1;
  background: var(--color-background);
  border-radius: 8px;
  padding: 16px;
  overflow: auto;
  min-height: 200px;
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
  opacity: 0;
  transition: opacity 0.15s;
}

.tree-item:hover .node-actions {
  opacity: 1;
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
