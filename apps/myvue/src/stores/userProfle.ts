import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface UserState {
  name: string
  email: string
  process: string[] // 学习进度
}

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<UserState>({
      name: 'Guest',
      email: '',
      process: [],
    })

    function setUser(userParams: Partial<UserState>) {
      user.value = { ...user.value, ...userParams }
    }

    function setProcess(process: string[]) {
      user.value.process = process
    }

    return { user, setUser, setProcess }
  }
)
