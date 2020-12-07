import store from '../store'
import {
    deleteRequest,
    getRequest,
    postPutRequest,
    response,
} from './restApis.interfaces'

// simulate server delay
const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const fakeApiCall = async (
    request: getRequest | postPutRequest | deleteRequest,
): Promise<response> => {
    await sleep(1000)
    const { isServerUp } = store.getters.serverState
    const { type, id, moke_response } = request
    if (type === 'GET') {
        return {
            success: true,
            data: moke_response,
        }
    }
    if (isServerUp) {
        return {
            success: true,
            id: !!id && id > 0 ? id : 1000,
        }
    } else {
        return {
            success: false,
            message: 'Something went wrong processing your request',
        }
    }
}
