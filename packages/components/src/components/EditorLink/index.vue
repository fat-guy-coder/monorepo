<template>
  <a v-if="isAdmin" :href="editorUrl" class="editor-link-btn" :title="`在 Cursor 中打开: ${filePath}`" @click="handleClick">
    <span class="editor-link-icon">↗</span>
    <span class="editor-link-text">{{ label }}</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** 相对路径（从 monorepo 根目录起），例如 apps/go/basics/01_variables.go */
  filePath: string
  /** 按钮文字 */
  label?: string
  /** 跳转到指定行（可选） */
  line?: number
  /** 跳转到指定列（可选） */
  column?: number
  /** 仅 admin 显示（由父组件从 useUserStore 传入） */
  isAdmin?: boolean
}>()

/** 获取 monorepo 根目录绝对路径（vite.config.ts 从 __dirname 推导并注入） */
function getWorkspaceRoot(): string {
  if ((import.meta as any).env.VITE_WORKSPACE_ROOT) {
    return (import.meta as any).env.VITE_WORKSPACE_ROOT.replace(/[/\\]$/, '')
  }
  console.warn('[EditorLink] 无法获取工作区路径')
  return ''
}

const editorUrl = computed(() => {
  const root = getWorkspaceRoot()
  if (!root) return '#'
  const fullPath = `${root}/${props.filePath}`.replace(/\\/g, '/')
  let url = `cursor://file/${fullPath}`
  if (props.line) {
    url += `:${props.line}`
    if (props.column) {
      url += `:${props.column}`
    }
  }
  return url
})

function handleClick(e: MouseEvent) {
  if (editorUrl.value === '#') {
    e.preventDefault()
    console.warn('[EditorLink] 未配置 VITE_WORKSPACE_ROOT，无法生成跳转链接。')
  }
}
</script>

<style scoped>
.editor-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #6366f1;
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.editor-link-btn:hover {
  color: #fff;
  background: #6366f1;
  border-color: #6366f1;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.editor-link-icon {
  font-size: 14px;
}

.editor-link-text {
  line-height: 1;
}
</style>
