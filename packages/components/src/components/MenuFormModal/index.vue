<template>
  <Modal :visible="visible" :title="title" @confirm="handleSubmit" @cancel="close">
    <div class="modal-form">
      <div class="form-item">
        <label>菜单名称 <span class="required">*</span></label>
        <Input v-model="formData.label" placeholder="请输入菜单名称" />
      </div>
      <div class="form-item">
        <label>英文名称 <span class="required">*</span></label>
        <Input v-model="formData.name" placeholder="请输入英文名称" />
      </div>
      <div v-if="mode === 'edit' && formData.id" class="form-item">
        <label>菜单 ID</label>
        <span class="display-text path-text">{{ formData.id }}</span>
      </div>
      <div class="form-item">
        <label>路由路径</label>
        <span class="display-text path-text">{{ computedPath || '-' }}</span>
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
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import Modal from '../Modal/index.vue'
import Input from '../Input/index.vue'
import Select from '../Select/index.vue'
import InputNumber from '../InputNumber/index.vue'

export interface MenuFormData {
  id?: string
  name: string
  label: string
  order: number
  project: string
  parentId: string
}

export interface TreeNodeLike {
  id?: string | number
  label: string
  name?: string
  path?: string
  icon?: string | unknown
  order?: number
  project?: string
  parentId?: string
  children?: any[]
  [key: string]: unknown
}

const props = defineProps<{
  visible: boolean
  mode: 'add' | 'addChild' | 'edit'
  /** 编辑时传入的节点 */
  node?: TreeNodeLike | null
  /** 父级菜单选项（path 用于计算完整路由路径） */
  parentMenuOptions: { label: string; value: string; path?: string }[]
  /** 当前项目 */
  project?: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'submit', data: MenuFormData): void
}>()

const title = computed(() => {
  switch (props.mode) {
    case 'edit': return '编辑菜单'
    case 'addChild': return '新增子菜单'
    default: return '新增菜单'
  }
})

const formData = reactive<MenuFormData>({
  name: '',
  label: '',
  order: 0,
  project: props.project || '',
  parentId: '',
})

function resetForm() {
  formData.name = ''
  formData.label = ''
  formData.order = 0
  formData.project = props.project || ''
  formData.parentId = ''
  formData.id = undefined
}

// 根据 mode 和 node 初始化表单
watch(() => [props.visible, props.mode, props.node] as const, ([visible, mode, node]) => {
  if (!visible) return
  resetForm()
  const n = node as TreeNodeLike | null
  if ((mode === 'edit' || mode === 'addChild') && n) {
    formData.id = n.id as string | undefined
    formData.label = n.label || (n.name as string) || ''
    formData.name = (n.name as string) || ''
    formData.order = (n.order as number) || 0
    formData.project = (n.project as string) || props.project || ''
    formData.parentId = mode === 'addChild' ? (n.id as string) : ((n.parentId as string) || '')
  }
}, { immediate: true })

// 计算完整路径（和 menu.vue 逻辑一致：父节点 path + "/" + name）
const computedPath = computed(() => {
  if (!formData.name) return ''
  if (!formData.parentId) return '/' + formData.name
  const parent = props.parentMenuOptions.find(o => o.value === formData.parentId)
  const parentPath = parent?.path || ''
  if (!parentPath) return '/' + formData.name
  return parentPath.replace(/\/$/, '') + '/' + formData.name
})

function close() {
  emit('update:visible', false)
}

function handleSubmit() {
  if (!formData.label) {
    // 由父组件处理验证消息
    emit('submit', { ...formData })
    return
  }
  if (!formData.name) {
    emit('submit', { ...formData })
    return
  }
  emit('submit', { ...formData })
}
</script>

<style scoped>
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
.required {
  color: #ff3333;
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
