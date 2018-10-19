import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
import {actions} from "./assets/js/globalMixin";

Vue.mixin(actions)
/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    store,
    template: '<App/>'
}).$mount('#app')
