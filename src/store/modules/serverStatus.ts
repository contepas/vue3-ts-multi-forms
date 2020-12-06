interface state {
    serverUp: boolean
}

export const namespaced = true

export const state: state = {
    serverUp: true,
}

export const mutations = {
    SERVER_UP(state: state) {
      state.serverUp = true
    },
    SERVER_DOWN(state: state) {
      state.serverUp = false
    }
}

export const getters = {
    isServerUp: (state: state) => {
        return state.serverUp
    }
}