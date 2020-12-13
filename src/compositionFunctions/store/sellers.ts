import { ref, computed, reactive, Ref } from 'vue'
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


// ========
// GETTERS
// ========
export const allSellers = computed(() => state.allSellers)
export const sellers = computed(() => state.sellers)
export const canAddSellerFields = computed(() => state.allSellers.length > Object.keys(state.sellers).length)


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


// ========
// BINDINGS
// ========
export const sellerBind = (id: number | string) => {
    if (state.sellers?.[id]) {
        return computed({
            get: ():any => state.sellers[id].seller,
            set: (seller:NameId) => setSeller(seller)
        })
    } else {
        throw 'sellerBind failed'
    }
}