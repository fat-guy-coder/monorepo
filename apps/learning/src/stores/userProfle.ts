import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface UserState {
  id: string
  username: string
  name: string
  email: string
  process: string[] // 学习进度
}

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<UserState>({
      id: '',
      username: '',
      name: 'Guest',
      email: '',
      process: [],
    })

    /** 是否为 admin 账号（仅 admin 可见 EditorLink 等开发工具） */
    const isAdmin = computed(() => user.value.username === 'admin')

    function setUser(userParams: Partial<UserState>) {
      user.value = { ...user.value, ...userParams }
    }

    function setProcess(process: string[]) {
      user.value.process = process
    }

    return { user, isAdmin, setUser, setProcess }
  }
)
