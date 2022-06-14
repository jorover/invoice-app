import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import EachInvoice from '@/views/EachInvoice.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/invoice/:id',
        name: 'EachInvoice',
        component: EachInvoice,
        params: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router