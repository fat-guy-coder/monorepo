import { createRouter, createWebHistory } from 'vue-router'
import { useAutoScroll } from '@/hooks/useAutoScroll'
import HomeView from '@/views/HomeView.vue'
import type { VNode } from 'vue'
import routes from './generatedRoutes'
import notFound from '@/views/Other/notFound.vue'
import DragLayoutExample from '@/views/LayoutExample.vue'

export type Route = {
  label: VNode | string
  name: string
  title?: string
  key?: string
  parentKey?: string
  parentKeyList: string[]
  path?: string
  children?: Route[]
  icon?: VNode | string
  component?: () => Promise<string>
  loading?: boolean
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/drag-layout',
      name: 'drag-layout',
      component: DragLayoutExample,
    },
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: notFound,
    }
  ],
})

router.beforeResolve((to, from) => {
  useAutoScroll(to as { name: string })
})



export default router
