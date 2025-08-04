import { message } from "ant-design-vue"
import { useTabistStore } from "@/stores/tab"


export function useAutoScroll(to: { name: string }) {
  const { tabList, } = useTabistStore()
  let mainView = document.querySelector('#mainView')
  let tab = tabList.find((i) => i.name === to.name) || null
  if (tab && tab?.scrollTop) {
    if (tab?.scrollTop > 3000) {
      message.info({
        content: '页面过长，自动滚动至历史位置',
        duration: 1,
        key: 'autoScroll',
      })
      const timer = setTimeout(() => {
        try {
          mainView?.scrollTo({ top: tab?.scrollTop, behavior: 'smooth' })
        } catch (error) {
          console.error(error)
        }
        clearTimeout(timer)
        mainView = null
      }, 300)
      return
    }
    mainView?.scrollTo({ top: tab?.scrollTop })
    mainView = null
    return
  }
  if (mainView?.scrollTop !== 0) {
    mainView?.scrollTo({ top: 0 })
    mainView = null
  }
  tab = null
}
