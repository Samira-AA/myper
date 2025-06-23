import { createRouter, createWebHistory } from 'vue-router'

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
            component: ' ',
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


router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? `${to.meta.title} | User CRUD` : 'User CRUD'
    next()
})

export default router