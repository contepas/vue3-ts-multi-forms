import { getClientsCall, getClientContactsCall } from '../../services/restApis'

interface Client {
    id: number
    name: string
}

interface Contact extends Client {
    clientId: number
}

interface State {
    clients: Client[]
    clientsContacts: {[id: number]: Contact[]}
}


export const namespaced = true

export const state: State = {
    clients: [],
    clientsContacts: {},
}

export const mutations = {
    ADD_CLIENTS(state: State, clients: Client[]) {
        state.clients = clients
    },
    ADD_CLIENT_CONTACTS(state: State, {clientContacts, clientId: id}: {clientContacts: Contact[], clientId: number}) {
        state.clientsContacts[id] = clientContacts
    }
}

export const actions = {
    async getClients({commit}:any) {
        const { success, data: clients } = await getClientsCall()
        if (success === true) {
            commit('ADD_CLIENTS', clients)
        }
    },
    async getClientContacts({commit, getters}:any, clientId: number) {
        if (!getters.clientsContactFetchedIds.includes(clientId)) {
            const { success, data: clientContacts } = await getClientContactsCall(clientId)
            if (success) {
                commit('ADD_CLIENT_CONTACTS', {clientContacts, clientId})
            }
        }
    }
}

export const getters = {
    clients: (state: State) => {
        return state.clients
    },
    clientContacts: (state: State) => (id: number | undefined) => {
        return id && state.clientsContacts[id] ? Object.values(state.clientsContacts[id]) : []
    },
    clientsContactFetchedIds: (state: State) => {
        return Object.keys(state.clientsContacts)
    }
}
