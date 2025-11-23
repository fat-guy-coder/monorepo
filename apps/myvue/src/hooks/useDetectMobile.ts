import { onMounted, onUnmounted } from "vue"

export function useDetectMobile(userStore: any) {

    // 检测移动端
    const checkMobile = () => {
        userStore.setDevice({ ...userStore.device, isMobile: window.innerWidth < 768 })
    }


    // 监听窗口大小变化
    let resizeObserver: ResizeObserver | null = null

    onMounted(() => {
        checkMobile()
        window.addEventListener('resize', checkMobile)

        // 使用 ResizeObserver 监听窗口变化
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                checkMobile()
            })
            resizeObserver.observe(document.body)
        }
    })

    onUnmounted(() => {
        window.removeEventListener('resize', checkMobile)
        if (resizeObserver) {
            resizeObserver.disconnect()
        }
    })

    return { checkMobile }
}