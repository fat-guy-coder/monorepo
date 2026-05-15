<template>
  <div class="user-management">
    <div class="page-header">
      <PageHeader title="用户管理" :breadcrumbs="[{ name: '首页', path: '/' }, { name: '用户管理' }]" />
    </div>

    <div class="content">
      <Card>
        <div v-if="loading" class="loading">加载中...</div>
        <div v-else-if="users.length === 0" class="empty">暂无用户数据</div>
        <table v-else class="user-table">
          <thead>
            <tr>
              <th>用户名</th>
              <th>角色</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.id">
              <td>{{ u.username }}</td>
              <td>
                <span v-if="u.roles?.length" class="role-tags">
                  <span v-for="r in u.roles" :key="r.id" class="role-tag">{{ r.name }}</span>
                </span>
                <span v-else class="no-role">无角色</span>
              </td>
              <td>{{ formatDate(u.createdAt) }}</td>
              <td>
                <Button size="sm" text @click="handleEdit(u)">编辑</Button>
                <Button size="sm" text @click="handleManageRoles(u)">角色</Button>
                <Button size="sm" type="danger" @click="handleDelete(u)">删除</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>

    <!-- 编辑用户模态框 -->
    <Modal v-model:visible="editModalVisible" title="编辑用户" width="420px"
      @confirm="handleEditSubmit" @cancel="editModalVisible = false">
      <div class="modal-form">
        <div class="form-item">
          <label>用户名 <span class="required">*</span></label>
          <Input v-model="editForm.username" placeholder="请输入用户名" />
        </div>
        <div class="form-item">
          <label>新密码（留空不修改）</label>
          <Input v-model="editForm.password" type="password" placeholder="至少6位" />
        </div>
      </div>
    </Modal>

    <!-- 管理角色模态框 -->
    <Modal v-model:visible="roleModalVisible" title="管理角色" width="500px"
      @confirm="handleRoleSubmit" @cancel="roleModalVisible = false">
      <div class="modal-form">
        <div class="form-item">
          <label>当前用户：<strong>{{ selectedUser?.username }}</strong></label>
        </div>
        <div class="form-item">
          <label>已绑定角色</label>
          <div v-if="userRoles.length === 0" class="no-role">暂无绑定角色</div>
          <div v-else class="role-list">
            <span v-for="r in userRoles" :key="r.id" class="role-tag role-tag-removable"
              @click="removeRole(r.id)">
              {{ r.name }} ✕
            </span>
          </div>
        </div>
        <div class="form-item">
          <label>添加角色</label>
          <div class="role-add-row">
            <Select v-model="selectedRoleId" :options="availableRoleOptions" placeholder="选择角色" style="flex:1" />
            <Button size="sm" type="primary" @click="addRole" :disabled="!selectedRoleId">添加</Button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { Card, Input, Button, Modal, Select, message, confirm, PageHeader } from 'components'
import { useRouter } from 'vue-router'
import { getUserInfo } from '@/utils/token'
import {
  getApiUsers, putApiUsersId, deleteApiUsersId,
  getApiUsersIdRoles, postApiUsersIdRoles, deleteApiUsersIdRoles,
  type UserWithRoles,
} from '@/api/user'
import { getApiRoles } from '@/api/role'

const router = useRouter()

const loading = ref(false)
const users = ref<UserWithRoles[]>([])
const allRoles = ref<{ id: string; name: string }[]>([])

const editModalVisible = ref(false)
const editForm = reactive({ id: '', username: '', password: '' })

const roleModalVisible = ref(false)
const selectedUser = ref<UserWithRoles | null>(null)
const userRoles = ref<{ id: string; name: string }[]>([])
const selectedRoleId = ref('')

const availableRoleOptions = computed(() =>
  allRoles.value.map(r => ({ label: r.name, value: r.id }))
)

onMounted(async () => {
  const info = getUserInfo()
  if (!info?.id) {
    message.warning('请先登录')
    router.push('/')
    return
  }
  await Promise.all([fetchUsers(), fetchRoles()])
})

const fetchUsers = async () => {
  loading.value = true
  try {
    const res = await getApiUsers()
    if (res.data) users.value = res.data
  } catch (e) {
    message.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

const fetchRoles = async () => {
  try {
    const res = await getApiRoles()
    if (res.data) allRoles.value = res.data
  } catch (e) {
    console.error('Failed to fetch roles:', e)
  }
}

const fetchUserRoles = async (userId: string) => {
  try {
    const res = await getApiUsersIdRoles(userId)
    if (res.data) userRoles.value = res.data
  } catch (e) {
    console.error('Failed to fetch user roles:', e)
  }
}

const formatDate = (d: string) => {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('zh-CN')
}

const handleEdit = (u: UserWithRoles) => {
  editForm.id = u.id
  editForm.username = u.username
  editForm.password = ''
  editModalVisible.value = true
}

const handleEditSubmit = async () => {
  if (!editForm.username) {
    message.error('请输入用户名')
    return
  }
  try {
    const data: any = { username: editForm.username }
    if (editForm.password) {
      if (editForm.password.length < 6) {
        message.error('密码至少6位')
        return
      }
      data.password = editForm.password
    }
    await putApiUsersId(editForm.id, data)
    message.success('更新成功')
    editModalVisible.value = false
    await fetchUsers()
  } catch (e: any) {
    message.error(e?.message || '更新失败')
  }
}

const handleDelete = async (u: UserWithRoles) => {
  const confirmed = await confirm({
    title: '删除确认',
    message: `确定要删除用户"${u.username}"吗？`,
    confirmText: '删除',
    cancelText: '取消',
    confirmType: 'danger',
  })
  if (!confirmed) return

  try {
    await deleteApiUsersId(u.id)
    message.success('删除成功')
    await fetchUsers()
  } catch (e: any) {
    message.error(e?.message || '删除失败')
  }
}

const handleManageRoles = async (u: UserWithRoles) => {
  selectedUser.value = u
  selectedRoleId.value = ''
  await fetchUserRoles(u.id)
  roleModalVisible.value = true
}

const addRole = async () => {
  if (!selectedUser.value || !selectedRoleId.value) return
  try {
    await postApiUsersIdRoles(selectedUser.value.id, selectedRoleId.value)
    message.success('角色绑定成功')
    selectedRoleId.value = ''
    await fetchUserRoles(selectedUser.value.id)
    await fetchUsers()
  } catch (e: any) {
    message.error(e?.message || '绑定失败')
  }
}

const removeRole = async (roleId: string) => {
  if (!selectedUser.value) return
  try {
    await deleteApiUsersIdRoles(selectedUser.value.id, roleId)
    message.success('角色已解绑')
    await fetchUserRoles(selectedUser.value.id)
    await fetchUsers()
  } catch (e: any) {
    message.error(e?.message || '解绑失败')
  }
}

const handleRoleSubmit = () => {
  roleModalVisible.value = false
}
</script>

<style scoped>
.user-management {
  padding: 16px;
}

.page-header {
  margin-bottom: 16px;
}

.loading,
.empty {
  text-align: center;
  padding: 32px;
  color: var(--color-text-secondary);
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.user-table th {
  font-weight: 500;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.role-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.role-tag {
  display: inline-block;
  padding: 2px 8px;
  background: var(--color-fill-secondary);
  border-radius: 4px;
  font-size: 12px;
  color: var(--color-text);
}

.role-tag-removable {
  cursor: pointer;
}
.role-tag-removable:hover {
  background: var(--color-danger);
  color: #fff;
}

.no-role {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

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

.role-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.role-add-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>