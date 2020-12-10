export interface request {
    type: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: requrestOrder | requestSeller[] | requestOrderItem | deleteItem
    mokeResponse?: nameId[]
    id?: number
}

export interface getRequest extends request {
    type: 'GET'
    mokeResponse: nameId[]
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
    orderId?: number
    orderDate: string
    client: number
    contact: number
}

export interface requestSeller {
    orderId: number
    seller: number
    percentage: number
}

export interface requestOrderItem {
    itemId?: number
    orderId: number
    type: 'generic' | 'special'
    product: number
    price: number
    amount: number
    deliveryType?: string
    comment?: string
}

export interface deleteItem {
    orderId: number
    itemId: number
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
