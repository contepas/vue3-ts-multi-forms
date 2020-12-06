import { fakeApiCall } from './restApis.helpers'
import { nameId, response, requrestOrder, requestSeller, requestOrderItem } from './restApis.interfaces'
import { checkDate, checkId, checkLength, checkIfEmptyString } from './restApis.validations'

const validationMessages = {
    order_id: 'order id not valid',
    client_id:'client id not valid',
    contact_id: 'contact id not valid',
    item_id: 'item id not valid',
    order_date: 'order date not valid',
    delivery_type: 'delivery type is empty',
    comment: 'comment is empty',
}


// GET /client
export const getClients = (): Promise<response> => {
    const type = 'GET'
    const moke_response = [
        { id: 1, name: 'Client A' },
        { id: 2, name: 'Client B' }
    ]
    return fakeApiCall({type, moke_response})
}

// GET /client/{client_id}/contact
export const getClientContacts = (client_id: number): Promise<response> => {
    const type = 'GET'
    let moke_response:nameId[] = []
    switch(client_id) {
        case 1:
            moke_response = [
                { id: 1, name: 'Contact A1' },
                { id: 2, name: 'Contact A2' }
            ]
        case 2:
            moke_response = [
                { id: 1, name: 'Contact B1' },
                { id: 2, name: 'Contact B2' }
            ]
    }
    return fakeApiCall({type, moke_response})
}

// GET /seller
export const getSellers = (): Promise<response> => {
    const type = 'GET'
    const moke_response = [
        { id: 1, name: 'Seller A' },
        { id: 2, name: 'Seller B' },
        { id: 3, name: 'Seller C' }
    ]
    return fakeApiCall({type, moke_response})
}

// GET /product
export const getProducts = (): Promise<response> => {
    const type = 'GET'
    const moke_response = [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
        { id: 3, name: 'Product C' }
    ]
    return fakeApiCall({type, moke_response})
}

// GET /delivery-type
export const getDeliveryTypes = (): Promise<response> => {
    const type = 'GET'
    const moke_response = [
        { id: 1, name: 'Delivery A' },
        { id: 2, name: 'Delivery B' },
        { id: 3, name: 'Delivery C' },
        { id: 3, name: 'Delivery C' }
    ]
    return fakeApiCall({type, moke_response})
}

const validateOrder = (data: requrestOrder): void => {
    const { order_date, client, contact } = data
    checkDate(order_date, validationMessages.order_date)
    checkId(client, validationMessages.client_id)
    checkId(contact, validationMessages.contact_id)
    
}

// POST /order
export const postOrder = (data: requrestOrder): Promise<response> => {
    const type = 'POST'
    validateOrder(data)
    return fakeApiCall({type, data})
}

// PUT /order/{order_id}
export const putOrder = (data: requrestOrder): Promise<response> => {
    const type = 'PUT'
    const order_id = data?.order_id || 0
    checkId(order_id, validationMessages.order_id)
    validateOrder(data)
    return fakeApiCall({type, data, id: order_id})
}

// PUT /order/{order_id}/finalize
export const finalizeOrder = (order_id: number): Promise<response> => {
    const type = 'PUT'
    checkId(order_id, validationMessages.order_id)
    return fakeApiCall({type, data: undefined, id: order_id})
}

// PUT /order/{order_id}/seller
export const putOrderSeller = (sellers: requestSeller[], order_id: number): Promise<response> => {
    const type = 'PUT'
    checkLength(sellers)
    checkId(order_id, validationMessages.order_id)
    return fakeApiCall({type, data: sellers, id: order_id})
}

const validateItem = (item: requestOrderItem): void => {
    const { type: order_type, delivery_type, comment, order_id } = item
    if (order_type === 'special') {
        checkIfEmptyString(delivery_type, validationMessages.delivery_type)
        checkIfEmptyString(comment, validationMessages.comment)
    }
    checkId(order_id, validationMessages.order_id)
}

// POST /order/{order_id}/item
export const postOrderItem = (item: requestOrderItem): Promise<response> => {
    const type = 'POST'
    validateItem(item)
    return fakeApiCall({type, data: item})
}

// PUT /order/{order_id}/item/{item_id}
export const putOrderItem = (item: requestOrderItem): Promise<response> => {
    const type = 'PUT'
    const { order_id, item_id } = item
    checkId(order_id, validationMessages.order_id)
    checkId(item_id, validationMessages.item_id)
    validateItem(item)
    return fakeApiCall({type, data: item, id: item_id})
}

// DELETE /order/{order_id}/item/{item_id}
export const deleteItem = (order_id: number, item_id: number): Promise<response> => {
    const type = 'DELETE'
    checkId(order_id)
    const data = {item_id, order_id}
    return fakeApiCall({type, data, id: item_id})

}