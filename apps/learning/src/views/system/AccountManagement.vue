<template>
  <div class="account-management">
    <div class="page-header">
      <PageHeader title="账户管理" :breadcrumbs="[{ name: '首页', path: '/' }, { name: '账户管理' }]" />
    </div>

    <div class="content">
      <Card title="个人信息">
        <div class="info-item">
          <span class="label">用户名</span>
          <span class="value">{{ userInfo.username }}</span>
        </div>
        <div class="info-item">
          <span class="label">用户ID</span>
          <span class="value">{{ userInfo.id }}</span>
        </div>
      </Card>

      <Card title="修改密码" class="password-card">
        <div class="form-item">
          <label>当前密码</label>
          <Input v-model="passwordForm.currentPassword" type="password" placeholder="请输入当前密码" />
        </div>
        <div class="form-item">
          <label>新密码</label>
          <Input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码（至少6位）" />
        </div>
        <div class="form-item">
          <label>确认新密码</label>
          <Input v-model="passwordForm.confirmPassword" type="password" placeholder="请再次输入新密码" />
        </div>
        <div class="form-actions">
          <Button type="primary" @click="handleChangePassword" :loading="changing">修改密码</Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Card, Input, Button, PageHeader, message } from 'components'
import { useRouter } from 'vue-router'
import { getUserInfo } from '@/utils/token'
import { putApiUserPassword } from '@/api/user'

const router = useRouter()

const userInfo = ref<{ id: string; username: string }>({ id: '', username: '' })
const changing = ref(false)
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

onMounted(() => {
  const info = getUserInfo()
  if (!info?.id) {
    message.warning('请先登录')
    router.push('/')
    return
  }
  userInfo.value = info
})

const handleChangePassword = async () => {
  if (!passwordForm.currentPassword) {
    message.error('请输入当前密码')
    return
  }
  if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
    message.error('新密码至少6位')
    return
  }
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    message.error('两次输入的密码不一致')
    return
  }
  if (passwordForm.currentPassword === passwordForm.newPassword) {
    message.error('新密码不能与当前密码相同')
    return
  }

  changing.value = true
  try {
    await putApiUserPassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    })
    message.success('密码修改成功')
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } catch (e: any) {
    message.error(e?.message || '修改密码失败')
  } finally {
    changing.value = false
  }
}
</script>

<style scoped>
.account-management {
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 16px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  color: var(--color-text-secondary);
  min-width: 80px;
}

.info-item .value {
  color: var(--color-text);
}

.password-card {
  margin-top: 8px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

.form-item label {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.form-actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
</style>