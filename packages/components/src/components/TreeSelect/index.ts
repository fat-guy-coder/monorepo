import { defineAsyncComponent } from 'vue'

const TreeSelect = defineAsyncComponent(() => import('./index.vue'))

export default TreeSelect
export { TreeSelect }