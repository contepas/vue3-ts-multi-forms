import { reactive } from 'vue'

const errors: Error[] = reactive([])

export const saveError = (error: Error) => {
    errors.push(error)
    if (process.env.NODE_ENV === 'development') {
        console.error(error)
    }
}