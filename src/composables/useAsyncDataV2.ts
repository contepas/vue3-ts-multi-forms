import { ref } from 'vue'

/**
 * asyncronous calls wrapper.
 * It gives back an object with the callback to get the data and the reactive loading state.
 */
export default function asyncCall(fn: (...args: any) => Promise<any>) {
    const result = ref(null)
    const loading = ref(false)
    const error = ref(null)
    const callback = async (...args: any) => {
        loading.value = true
        error.value = null
        result.value = null
        try {
            result.value = await fn(...args)
        } catch (err) {
            error.value = err
        } finally {
            loading.value = false
        }
    }
    return {
        result,
        loading,
        error,
        callback,
    }
}
