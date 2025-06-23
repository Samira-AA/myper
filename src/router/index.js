import { createRouter, createWebHistory } from 'vue-router'
import userTableComponent from "../features/user-management/components/user-table.component.vue";

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
            component: userTableComponent,
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