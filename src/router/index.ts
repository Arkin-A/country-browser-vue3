import {createRouter, createWebHistory} from 'vue-router'
import CountryList from '@/components/CountryList.vue'

const CountryDetail = () => import('@/views/CountryDetail.vue')

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'home', component: CountryList},
        {path: '/country/:code', name: 'country', component: CountryDetail, props: true},
        {path: '/:pathMatch(.*)*', redirect: '/'},
    ],
    scrollBehavior: () => ({top: 0}),
})
