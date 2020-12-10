import { getClientsCall, getClientContactsCall } from '../../services/restApis'

interface Client {
    id: number
    name: string
}

interface State {
    clients: Client[]
}


export const namespaced = true

export const state: State = {
    clients: [],
}

export const mutations = {
    ADD_CLIENTS(state: State, clients:Client[]) {
        state.clients = clients
    },
}

export const actions = {
    async getClients({commit, getters}:any) {
        const { success, data: clients } = await getClientsCall()
        if (success === true) {
            commit('ADD_CLIENTS', clients)
        }
    }
}

export const getters = {
    clients: (state: State) => {
        return state.clients
    },
}
