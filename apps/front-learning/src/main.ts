import '@/assets/css/main.less'
import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

let appInstance: VueApp | null = null
let mountPoint: HTMLDivElement | null = null;

const render = (container: HTMLElement | ShadowRoot) => {
  // Create a mount point for the Vue app
  mountPoint = document.createElement('div');
  mountPoint.id = 'app';
  container.appendChild(mountPoint);

  appInstance = createApp(App)
  appInstance.use(createPinia())
  appInstance.use(router)
  appInstance.mount(mountPoint)
}

// --- Standalone Mode Entry ---
// Check if running in standalone mode (not imported by the micro-frontend framework)
if (!(window as any).__IS_MICRO_FRONTEND_SANDBOX__) {
  const standaloneContainer = document.getElementById('app');
  if (standaloneContainer) {
    render(standaloneContainer);
  }
}

// --- Lifecycles for Micro-Frontend Mode ---

// @preserve-lifecycle - 打包器请不要重命名此函数
/**
 * 微前端应用初始化
 */
export async function bootstrap() {
  console.log('frontend-learning app bootstrapped')
}

// @preserve-lifecycle - 打包器请不要重命名此函数
/**
 * 微前端应用挂载
 */
export async function mount(props: { container: HTMLElement | ShadowRoot }) {
  console.log('Mounting frontend-learning app...');
  render(props.container);
}

// @preserve-lifecycle - 打包器请不要重命名此函数
/**
 * 微前端应用卸载
 */
export async function unmount(props: { container: HTMLElement | ShadowRoot }) {
  console.log('Unmounting frontend-learning app...');
  if (appInstance) {
    appInstance.unmount();
    appInstance = null;
  }
  if (mountPoint) {
    props.container.removeChild(mountPoint);
    mountPoint = null;
  }
}
