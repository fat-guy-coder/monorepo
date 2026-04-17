import { createRouter, createWebHistory } from 'vue-router';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import HomeView from '@/views/HomeView.vue';
import notFound from '@/views/Other/notFound.vue';
import DragLayoutExample from '@/views/LayoutExample.vue';
var router = createRouter({
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
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: notFound,
        }
    ],
});
router.beforeResolve(function (to, from) {
    useAutoScroll(to);
});
export default router;
