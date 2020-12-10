import { createStore } from 'vuex'
import * as serverStatus from './modules/serverStatus'
import * as formOrderDetails from './modules/formOrderDetails'

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        serverStatus,
        formOrderDetails,
    },
})
