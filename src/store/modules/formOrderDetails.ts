import {
    getClientsCall,
    getClientContactsCall,
    postOrderCall,
    putOrderCall,
} from '../../services/restApis'

import { isEmpty } from 'lodash'

interface Client {
    id: number
    name: string
}

interface ClientContacts {
    clientContacts: Contact[]
    clientId: number
}

interface Contact extends Client {
    clientId: number
}

interface State {
    clients: Client[]
    clientsContacts: { [id: number]: Contact[] }
    client: Client | null
    contact: Contact | null
    date: string
    saved: boolean
    orderId: number | null
}

export const namespaced = true

export const state: State = {
    clients: [],
    clientsContacts: {},
    client: null,
    contact: null,
    date: '',
    saved: false,
    orderId: null,
}

export const mutations = {
    ADD_CLIENTS(state: State, clients: Client[]) {
        state.clients = clients
    },
    ADD_CLIENT_CONTACTS(
        state: State,
        { clientContacts, clientId: id }: ClientContacts,
    ) {
        state.clientsContacts[id] = clientContacts
    },
    SET_CLIENT(state: State, client: Client) {
        state.client = client
    },
    SET_CONTACT(state: State, contact: Contact) {
        state.contact = contact
    },
    SET_DATE(state: State, date: string) {
        state.date = date
    },
    SET_SAVED(state: State, saved: boolean) {
        state.saved = saved
    },
    SET_ORDER_ID(state: State, orderId: number) {
        state.orderId = orderId
    },
}

export const actions = {
    async getClients({ commit }: any) {
        const { success, data: clients } = await getClientsCall()
        if (success === true) {
            commit('ADD_CLIENTS', clients)
        }
    },
    async getClientContacts({ commit, getters }: any, clientId: number) {
        if (!getters.clientsContactFetchedIds.includes(clientId)) {
            const {
                success,
                data: clientContacts,
            } = await getClientContactsCall(clientId)
            if (success) {
                commit('ADD_CLIENT_CONTACTS', { clientContacts, clientId })
            }
        }
    },
    async saveOrderDetails({ state, getters, commit }: any) {
        const { orderId } = state as State
        const { date: orderDate, client, contact, validDate, validClient, validContact } = getters
        console.log('PAYLOAD')
        console.log({orderDate, client, contact})
        if (validDate && validClient && validContact) {
            const { success, id = null, message = '' } = orderId
            ? await putOrderCall({ orderId, orderDate, client, contact })
            : await postOrderCall({ orderDate, client, contact })
            if (success) {
                commit('SET_SAVED', true)
                commit('SET_ORDER_ID', orderId)
                console.log(`Order Details Saved. The new ID is: ${id}`)
            } else {
                commit('SET_SAVED', false)
                console.log(message || 'something went wrong saving orderDetails')
            }
        } else {
            console.log('some fields are not valid')
        }
        
    },
}

export const getters = {
    clients: (state: State) => {
        return state.clients
    },
    clientContacts: (state: State) => (id: number | undefined) => {
        return id && state.clientsContacts[id]
            ? Object.values(state.clientsContacts[id])
            : []
    },
    clientsContactFetchedIds: (state: State) => {
        return Object.keys(state.clientsContacts)
    },
    date: (state: State) => state.date,
    client: (state: State) => state.client,
    contact: (state: State) => state.contact,

    validClient: (state: State) => !isEmpty(state.client),
    validContact: (state: State) => !isEmpty(state.contact),
    validDate: (state: State) => !!state.date,

    isDataValid: (state: State, getters: any) => getters.validClient && getters.validContact && getters.validDate,

    isDataSaved: (state: State) => state.saved,
    errorMessages: (state: State, getters: any) => ({
        client: getters.validClient ? '' : 'Client is not valid',
        contact: getters.validContact ? '' : 'Contact is not valid',
        date: getters.validDate ? '' : 'Date is not valid',
    })
}
