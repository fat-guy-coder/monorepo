import { ref, } from 'vue'
import { defineStore } from 'pinia'



export interface Device {
    isMobile: boolean //是否是手机
    width: string
    height: string
}

export type Theme = 'light' | 'dark' | 'warm' | 'cool' | 'eye-friendly' | 'more'

export type ThemeLabel = '亮色' | '暗色' | '暖色' | '冷色'  | '护眼'|'更多'

export type ThemeIcon = '☀️' | '🌙' | '🔥' | '❄️'  | '👀'|'🎨'

export type Themes = Array<{
    value: Theme
    label: ThemeLabel
    icon: ThemeIcon
}>

export type User = {
    theme: Theme //主题
    themes: Themes
    device: Device
    process: string[] //学习进度
}

export const useUserStore = defineStore('user', () => {
    const storeUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) as User : null
    //激活标签列表
    const user = ref<User>(storeUser ||
    {
        theme: 'light',
        themes: [
            { value: 'light', label: '亮色', icon: '☀️' },
            { value: 'dark', label: '暗色', icon: '🌙' },
            { value: 'warm', label: '暖色', icon: '🔥' },
            { value: 'cool', label: '冷色', icon: '❄️' },
            { value: 'eye-friendly', label: '护眼', icon: '👀' },
            { value: 'more', label: '更多', icon: '🎨' }
        ],
        device: {
            isMobile: false,
            width: '0px',
            height: '0px'
        },
        process: [],
    },
    )



    //设置用户
    function setUsr(userParams: User) {
        user.value = userParams
    }


    //设置用户主题
    function setUsrTheme(theme: Theme) {
        user.value.theme = theme
    }


    //设置用户设备
    function setDevice(device: Device) {
        user.value.device = device
    }

    //设置用户
    function setUsrProcess(process: string[]) {
        user.value.process = process
    }


    return { user, setUsr, setUsrTheme, setDevice, setUsrProcess }
})

