import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import getters from './getters.js'
import {getField, updateField} from 'vuex-map-fields';

Vue.use(Vuex)
const state = {
    allExperiments: [],
    lastExperiment: {
        LRBE: false,
        L: 1.3,
        R: 3.4,
        Betta: 1,
        E: 5,
        a: 0.9,
        b: 0.1,
        ap: 0.27,
        bp: 0.27,
        n: 100,
        x0: 5,
        Kp: 10,
        Ki: 1,
        Kd: 3,
        T: 1,
        t: 100,
        selected_formula: 'P'
    },
    lastExperimentData: {}
}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    mutations: {
        ...mutations,
        updateField
    },
    getters: {
        ...getters,
        getField
    }
})
