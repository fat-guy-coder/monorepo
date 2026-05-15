<template>
  <div class="role-management">
    <div class="page-header">
      <PageHeader title="角色管理" :breadcrumbs="[{ name: '首页', path: '/' }, { name: '角色管理' }]" />
    </div>

    <div class="content">
      <div class="toolbar">
        <Button type="primary" @click="handleAdd">新增角色</Button>
      </div>

      <Card>
        <div v-if="loading" class="loading">加载中...</div>
        <div v-else-if="roles.length === 0" class="empty">暂无角色数据</div>
        <table v-else class="role-table">
          <thead>
            <tr>
              <th>角色名称</th>
              <th>描述</th>
              <th>菜单权限</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in roles" :key="r.id">
              <td>{{ r.name }}</td>
              <td>{{ r.description || '-' }}</td>
              <td>
                <span class="menu-count">{{ getMenuCount(r) }} 个菜单</span>
              </td>
              <td>
                <Button size="sm" text @click="handleEdit(r)">编辑</Button>
                <Button size="sm" type="danger" @click="handleDelete(r)" :disabled="r.name === 'admin'">删除</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>

    <!-- 新增/编辑模态框 -->
    <Modal v-model:visible="modalVisible" :title="modalMode === 'edit' ? '编辑角色' : '新增角色'" width="520px"
      @confirm="handleSubmit" @cancel="modalVisible = false">
      <div class="modal-form">
        <div class="form-item">
          <label>角色名称 <span class="required">*</span></label>
          <Input v-model="formData.name" placeholder="请输入角色名称" />
        </div>
        <div class="form-item">
          <label>描述</label>
          <Input v-model="formData.description" placeholder="请输入角色描述" />
        </div>
        <div class="form-item permission-item">
          <label>菜单权限</label>
          <div class="menu-permissions">
            <div class="permission-header">
              <Checkbox v-model="selectAll" @change="handleSelectAll">全选</Checkbox>
            </div>
            <Tree
              v-if="menuTree.length > 0"
              ref="treeRef"
              :data="menuTree"
              :default-expanded-keys="defaultExpandedKeys"
              class="permission-tree"
              @node-expand="handleNodeExpand"
              @node-collapse="handleNodeCollapse"
            >
              <template #node="{ node }">
                <span class="tree-label">{{ node.label }}</span>
                <span v-if="node.loading" class="loading-indicator">加载中...</span>
                <Checkbox
                  :model-value="isMenuSelected(node)"
                  @change="() => toggleMenu(node)"
                />
              </template>
            </Tree>
            <div v-else class="loading">加载菜单中...</div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { Card, Input, Button, Modal, Tree, Checkbox, message, confirm, PageHeader } from 'components'
import type { TreeNode } from 'components'
import { useRouter } from 'vue-router'
import { getApiRoles, postApiRoles, putApiRolesId, deleteApiRolesId } from '@/api/role'
import { getApiMenus } from '@/api/menu'
import { getUserInfo } from '@/utils/token'

interface RoleItem {
  id: string
  name: string
  description?: string
  menuIds?: string[]
  menuPaths?: string[]
}

const router = useRouter()

const loading = ref(false)
const roles = ref<RoleItem[]>([])
const menuTree = ref<TreeNode[]>([])
const treeRef = ref()
const allMenuIds = ref<string[]>([]) // 已加载的所有菜单 ID（用于全选）

const modalVisible = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const formData = reactive({
  id: '',
  name: '',
  description: '',
  menuIds: [] as string[],
})

const defaultExpandedKeys = ref<(string | number)[]>([])
const selectAll = ref(false)

// 触发全选状态更新
watch(() => formData.menuIds, () => {
  updateSelectAll()
}, { deep: true })

onMounted(async () => {
  const info = getUserInfo()
  if (!info?.id) {
    message.warning('请先登录')
    router.push('/')
    return
  }
  await Promise.all([fetchRoles(), fetchMenus()])
})

const fetchRoles = async () => {
  loading.value = true
  try {
    const res = await getApiRoles()
    if (res.data) {
      roles.value = res.data.map((r: any) => ({
        ...r,
        menuIds: typeof r.menuIds === 'string' ? JSON.parse(r.menuIds || '[]') : (r.menuIds || []),
        menuPaths: typeof r.menuPaths === 'string' ? JSON.parse(r.menuPaths || '[]') : (r.menuPaths || []),
      }))
    }
  } catch (e) {
    message.error('获取角色列表失败')
  } finally {
    loading.value = false
  }
}

// --- 菜单树（参考 menu.vue 模式）---

const menuToTreeNode = (menu: any): TreeNode => {
  const { children, ...rest } = menu
  return {
    id: menu.id ?? '',
    label: menu.label || menu.name || '',
    children: children ? children.map(menuToTreeNode) : undefined,
    loading: false,
    ...rest,
  } as TreeNode
}

const fetchMenus = async () => {
  try {
    const res = await getApiMenus({ project: 'learning', root: 'true' })
    if (res.data && Array.isArray(res.data)) {
      menuTree.value = res.data.map(menuToTreeNode)
      // 收集所有已加载的菜单 ID
      for (const node of menuTree.value) {
        allMenuIds.value.push(String(node.id))
      }
      // 默认展开第一层
      defaultExpandedKeys.value = menuTree.value.map(m => m.id)
    }
  } catch (e) {
    console.error('Failed to fetch menus:', e)
  }
}

const loadNodeChildren = async (node: TreeNode) => {
  if (node.loading) return
  if (node.children && node.children.length > 0) return

  node.loading = true
  try {
    const res = await getApiMenus({ parentId: node.id as string })
    if (res.data && Array.isArray(res.data)) {
      node.children = res.data.map(menuToTreeNode)
      // 收集新加载的菜单 ID
      for (const child of node.children) {
        allMenuIds.value.push(String(child.id))
      }
      if (node.children.length === 0) {
        node.isLeaf = true
      }
    }
  } catch (e) {
    console.error('Failed to load children:', e)
    message.error('加载子菜单失败')
  } finally {
    node.loading = false
  }
}

const handleNodeExpand = async (node: TreeNode) => {
  if (!defaultExpandedKeys.value.includes(node.id)) {
    defaultExpandedKeys.value.push(node.id)
  }
  await loadNodeChildren(node)
}

const handleNodeCollapse = (node: TreeNode) => {
  defaultExpandedKeys.value = defaultExpandedKeys.value.filter(k => k !== node.id)
}

const isMenuSelected = (node: TreeNode) => {
  return formData.menuIds.includes(String(node.id))
}

const toggleMenu = (node: TreeNode) => {
  const id = String(node.id)
  const idx = formData.menuIds.indexOf(id)
  if (idx > -1) {
    formData.menuIds.splice(idx, 1)
  } else {
    formData.menuIds.push(id)
  }
}

const handleSelectAll = (checked: boolean) => {
  if (checked) {
    formData.menuIds = [...allMenuIds.value]
  } else {
    formData.menuIds = []
  }
}

const updateSelectAll = () => {
  selectAll.value = allMenuIds.value.length > 0
    && allMenuIds.value.every(id => formData.menuIds.includes(id))
}

const getMenuCount = (role: RoleItem) => {
  return role.menuIds?.length || 0
}

const handleAdd = () => {
  formData.id = ''
  formData.name = ''
  formData.description = ''
  // 默认选中除"角色管理""菜单管理"外的所有已加载菜单
  const excludedLabels = ['角色管理', '菜单管理']
  formData.menuIds = allMenuIds.value.filter(id => {
    const node = findNodeById(menuTree.value, id)
    return node && !excludedLabels.includes(node.label)
  })

  modalMode.value = 'add'
  modalVisible.value = true
}

const handleEdit = (role: RoleItem) => {
  formData.id = role.id
  formData.name = role.name
  formData.description = role.description || ''
  formData.menuIds = [...(role.menuIds || [])]
  modalMode.value = 'edit'
  modalVisible.value = true
}

const handleDelete = async (role: RoleItem) => {
  if (role.name === 'admin') {
    message.warning('不能删除 admin 角色')
    return
  }

  const confirmed = await confirm({
    title: '删除确认',
    message: `确定要删除角色"${role.name}"吗？`,
    confirmText: '删除',
    cancelText: '取消',
    confirmType: 'danger',
  })
  if (!confirmed) return

  try {
    await deleteApiRolesId(role.id)
    message.success('删除成功')
    await fetchRoles()
  } catch (e: any) {
    message.error(e?.message || '删除失败')
  }
}

// 递归查找节点
const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
  for (const node of nodes) {
    if (String(node.id) === id) return node
    if (node.children) {
      const found = findNodeById(node.children, id)
      if (found) return found
    }
  }
  return null
}

const handleSubmit = async () => {
  if (!formData.name) {
    message.error('请输入角色名称')
    return
  }

  try {
    // 构建 menuPaths（从已加载的菜单中收集）
    const collectPaths = (nodes: TreeNode[]): string[] => {
      const paths: string[] = []
      for (const node of nodes) {
        if (formData.menuIds.includes(String(node.id)) && node.path) {
          paths.push(node.path as string)
        }
        if (node.children) {
          paths.push(...collectPaths(node.children))
        }
      }
      return paths
    }
    const menuPaths = collectPaths(menuTree.value)

    if (modalMode.value === 'edit') {
      await putApiRolesId(formData.id, {
        name: formData.name,
        description: formData.description,
        menuIds: formData.menuIds,
        menuPaths,
      })
      message.success('更新成功')
    } else {
      await postApiRoles({
        name: formData.name,
        description: formData.description,
        menuIds: formData.menuIds,
        menuPaths,
      })
      message.success('创建成功')
    }

    modalVisible.value = false
    await fetchRoles()
  } catch (e: any) {
    message.error(e?.message || '操作失败')
  }
}
</script>

<style scoped>
.role-management {
  padding: 16px;
}

.page-header {
  margin-bottom: 16px;
}

.toolbar {
  margin-bottom: 16px;
}

.loading,
.empty {
  text-align: center;
  padding: 32px;
  color: var(--color-text-secondary);
}

.role-table {
  width: 100%;
  border-collapse: collapse;
}

.role-table th,
.role-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.role-table th {
  font-weight: 500;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.menu-count {
  font-size: 12px;
  color: var(--color-text-secondary);
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

.modal-form .permission-item {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.required {
  color: #ff3333;
}

.menu-permissions {
  display: flex;
  flex-direction: column;
  height: 280px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  overflow: hidden;
}

.permission-header {
  flex-shrink: 0;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-border);
}

.permission-tree {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.tree-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.loading-indicator {
  margin-left: 8px;
  font-size: 12px;
  color: var(--color-text-secondary);
}
</style>