import { h } from 'vue'

export const useWorker = () => {
  const worker = new Worker(new URL('./worker.ts', import.meta.url))
  import('@/menu/menu.json').then(e => {
    worker.postMessage({ menu: e.default, render: h.toString() })
  })

  return { worker, postMessage: worker.postMessage, onmessage: worker.onmessage }
}


