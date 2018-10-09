import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('../components/Auth/LoginComponent.vue')
        },
        {
            path: 'main-page',
            name: 'general',
            component: () => import('../components/MainNavigationElements/GeneralComponent.vue')
        },
        {
            path: 'chartist',
            name: 'chartist',
            component: () => import('../components/MainNavigationElements/Lines.vue')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
