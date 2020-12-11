import store from '../../store'
import { computed } from 'vue'

export const date = computed({
    get: () => store.getters['formOrderDetails/date'],
    set: date => store.commit('formOrderDetails/SET_DATE', date)
})
export const client = computed({
    get: () => store.getters['formOrderDetails/client'],
    set: client => store.commit('formOrderDetails/SET_CLIENT', client)
})
export const contact = computed({
    get: () => store.getters['formOrderDetails/contact'],
    set: contact => store.commit('formOrderDetails/SET_CONTACT', contact)
})

// In this way is easier to reuse the same binding in different components