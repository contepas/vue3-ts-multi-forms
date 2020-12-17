import { ref, computed, reactive, Ref, watch } from 'vue'
import { getSellersCall } from '../../services/restApis'
import { saveError } from './errorLog'
import { uniqueId } from 'lodash'

// ========================
// INTERFACES SELLERS STORE
// ========================

interface NameId {
    id: number | string
    name: string
}

interface GetSellersCallResponse {
    success: boolean
    data?: NameId[]
}

interface Seller {
    seller: NameId | null
    percentage: number
}

type Sellers = {
    [id in number | string]: Seller
}

interface State {
    allSellers: NameId[]
    sellers: Sellers
}


// ======
// STATE
// ======
const state:State = reactive({
    allSellers: [],
    sellers: {
        'seller_1': {
            seller: null,
            percentage: 0,
        }
    },
})
// watch(state.sellers, (newValue) => console.log(newValue))


// ========
// GETTERS
// ========
export const allSellers = computed(() => state.allSellers)
export const sellers = computed(() => state.sellers)
export const canAddSellerFields = computed(() => state.allSellers.length > Object.keys(state.sellers).length)
export const totalPercentageValid = computed(() => {
    const percentage = Object.values(state.sellers).reduce((acc, seller) => {
        return acc + Number(seller.percentage)
    }, 0)
    return percentage === 100
})
// watch(totalPercentageValid, (newValue) => console.log(newValue))


// =========
// MUTATIONS
// =========
const setAllSellers =  (allSellers:NameId[]) => {
    state.allSellers = allSellers
}
const setSeller =  (seller:NameId) => {
    const { id } = seller
    state.sellers[id].seller = seller
}
export const addSeller = () => {
    if (canAddSellerFields.value) {
        state.sellers[uniqueId('seller_')] = {
            seller: null,
            percentage: 0,
        }
    }
}
export const removeSeller = (id: string) => {
    delete state.sellers[id]
}


// ========
// ACTIONS
// ========
export const getAllSellersCall = async () => {
    try {
        const { success, data:sellers = [] }:GetSellersCallResponse = await getSellersCall()
        if (success) {
            if (sellers.length > 0) {
                setAllSellers(sellers)
            } else {
                throw 'empty sellers array from getSellersCall!'
            }
        } else {
            throw 'something went wrong in process to getAllSellers'
        }
    } catch(error) {
        saveError(error)
    }    
}
export const saveSellers = () => {
    console.log('ciao')
}