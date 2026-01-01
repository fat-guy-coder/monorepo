import '@/assets/css/main.less'
import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

let appInstance: VueApp | null = null

const appRender = (mountElement: string | HTMLElement | ShadowRoot = '#app') => {
  appInstance = createApp(App)
  appInstance.use(createPinia())
  appInstance.use(router)
  appInstance.mount(mountElement)
}

// --- Standalone Mode Entry ---
// Check if running in standalone mode (not imported by the micro-frontend framework)
if (!(window as any).__IS_MICRO_FRONTEND__) {
  // In standalone mode, inject styles into the document head
  appRender()
}

// --- Lifecycles for Micro-Frontend Mode ---

export async function bootstrap() {
  console.log('my-vue-app bootstrapped')
}

export async function mount(props: { container: HTMLElement | ShadowRoot }) {
  appRender(props.container)
}

export async function unmount() {
  if (appInstance) {
    appInstance.unmount()
    appInstance = null
  }
}
