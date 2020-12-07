import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/assignment',
        name: 'Assignment',
        component: () =>
            import(
                /* webpackChunkName: "assignment" */ '../views/Assignment.vue'
            ),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Error404',
        component: () =>
            import(/* webpackChunkName: "404" */ '../views/Error404.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
