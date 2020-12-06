export interface request {
    type: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: requrestOrder | requestSeller[] | requestOrderItem | deleteItem
    moke_response?: nameId[]
    id?: number
}

export interface getRequest extends request {
    type: 'GET'
    moke_response: nameId[]
}

export interface postPutRequest extends request {
    type: 'POST' | 'PUT'
    data: requrestOrder | requestSeller[] | requestOrderItem | undefined
}

export interface deleteRequest extends request {
    type: 'DELETE'
    data: deleteItem
}

export interface requrestOrder {
    order_id?: number
    order_date: string
    client: number
    contact: number
}

export interface requestSeller {
    order_id: number
    seller: number
    percentage: number
}

export interface requestOrderItem {
    item_id?: number
    order_id: number
    type: 'generic' | 'special'
    product: number
    price: number
    amount: number
    delivery_type?: string
    comment?: string
}

export interface deleteItem {
    order_id: number
    item_id: number
}

export interface response {
    id?: number
    data?: nameId[]
    message?: string
    success: boolean
}

export interface nameId {
    id: number
    name: string
}
