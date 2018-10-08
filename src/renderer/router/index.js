import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'generalComponent',
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
