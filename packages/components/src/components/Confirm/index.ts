import { createVNode, render, reactive, type VNode } from 'vue'
import ConfirmComponent from './index.vue'

export interface ConfirmOptions {
  title?: string
  message: string
  icon?: string
  confirmText?: string
  cancelText?: string
  confirmType?: 'default' | 'primary' | 'danger'
  onConfirm?: () => void
  onCancel?: () => void
}

interface ConfirmInstance {
  id: string
  vnode: VNode
  vm: any
  props: any
}

const instances: ConfirmInstance[] = reactive([])
let seed = 1
let container: HTMLDivElement | null = null

const createContainer = () => {
  if (!container) {
    container = document.createElement('div')
    container.className = 'confirm-container'
    document.body.appendChild(container)
  }
}

const confirm = (options: ConfirmOptions): Promise<boolean> => {
  createContainer()

  return new Promise((resolve) => {
    const id = `confirm_${seed++}`

    const handleConfirm = () => {
      options.onConfirm?.()
      resolve(true)
      removeInstance(id)
    }

    const handleCancel = () => {
      options.onCancel?.()
      resolve(false)
      removeInstance(id)
    }

    const vnode = createVNode(ConfirmComponent, {
      title: options.title || '确认',
      message: options.message,
      icon: options.icon,
      confirmText: options.confirmText || '确定',
      cancelText: options.cancelText || '取消',
      confirmType: options.confirmType || 'default',
      onConfirm: handleConfirm,
      onCancel: handleCancel,
      visible: true,
    })

    render(vnode, container!)
    instances.push({ id, vnode, vm: vnode.component?.proxy, props: vnode.props })
  })
}

const removeInstance = (id: string) => {
  const index = instances.findIndex((i) => i.id === id)
  if (index !== -1) {
    const instance = instances[index]
    render(null, container!)
    instances.splice(index, 1)
  }
}

export { confirm }
export default confirm
