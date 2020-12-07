interface State {
    serverUp: boolean
}

export const namespaced = true

export const state: State = {
    serverUp: true,
}

export const mutations = {
    SERVER_UP(state: State) {
        state.serverUp = true
    },
    SERVER_DOWN(state: State) {
        state.serverUp = false
    },
}

export const getters = {
    isServerUp: (state: State) => {
        return state.serverUp
    },
}
