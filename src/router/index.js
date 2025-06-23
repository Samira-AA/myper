import { createRouter, createWebHistory } from 'vue-router'
import UserManagementPage from "../features/user-management/pages/user.page.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/users'
        },
        {
            path: '/users',
            name: 'users',
            component: UserManagementPage,
            meta: {
                title: 'User Management'
            }
        },

        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            redirect: '/users'
        }
    ]
})


export default router