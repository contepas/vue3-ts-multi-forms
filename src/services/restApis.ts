import { fakeApiCall } from './restApis.helpers'
import {
    nameId,
    response,
    requrestOrder,
    requestSeller,
    requestOrderItem,
} from './restApis.interfaces'
import {
    checkDate,
    checkId,
    checkLength,
    checkIfEmptyString,
} from './restApis.validations'

const validationMessages = {
    orderId: 'order id not valid',
    clientId: 'client id not valid',
    contactId: 'contact id not valid',
    itemId: 'item id not valid',
    orderDate: 'order date not valid',
    deliveryType: 'delivery type is empty',
    comment: 'comment is empty',
}

// GET /client
export const getClientsCall = (): Promise<response> => {
    const type = 'GET'
    const mokeResponse = [
        { id: 1, name: 'Client A' },
        { id: 2, name: 'Client B' },
    ]
    return fakeApiCall({ type, mokeResponse })
}

// GET /client/{clientId}/contact
export const getClientContactsCall = (clientId: number): Promise<response> => {
    const type = 'GET'
    let mokeResponse: nameId[] = []
    switch (clientId) {
        case 1:
            mokeResponse = [
                { id: 1, name: 'Contact A1' },
                { id: 2, name: 'Contact A2' },
            ]
            break
        case 2:
            mokeResponse = [
                { id: 1, name: 'Contact B1' },
                { id: 2, name: 'Contact B2' },
            ]
            break
        default:
            throw 'client id is not valid'
    }
    return fakeApiCall({ type, mokeResponse })
}

// GET /seller
export const getSellersCall = (): Promise<response> => {
    const type = 'GET'
    const mokeResponse = [
        { id: 1, name: 'Seller A' },
        { id: 2, name: 'Seller B' },
        { id: 3, name: 'Seller C' },
    ]
    return fakeApiCall({ type, mokeResponse })
}

// GET /product
export const getProductsCall = (): Promise<response> => {
    const type = 'GET'
    const mokeResponse = [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
        { id: 3, name: 'Product C' },
    ]
    return fakeApiCall({ type, mokeResponse })
}

// GET /delivery-type
export const getDeliveryTypesCall = (): Promise<response> => {
    const type = 'GET'
    const mokeResponse = [
        { id: 1, name: 'Delivery A' },
        { id: 2, name: 'Delivery B' },
        { id: 3, name: 'Delivery C' },
        { id: 3, name: 'Delivery C' },
    ]
    return fakeApiCall({ type, mokeResponse })
}

const validateOrder = (data: requrestOrder): void => {
    const { orderDate, client, contact } = data
    checkDate(orderDate, validationMessages.orderDate)
    checkId(client, validationMessages.clientId)
    checkId(contact, validationMessages.contactId)
}

// POST /order
export const postOrderCall = (data: requrestOrder): Promise<response> => {
    const type = 'POST'
    validateOrder(data)
    return fakeApiCall({ type, data })
}

// PUT /order/{orderId}
export const putOrderCall = (data: requrestOrder): Promise<response> => {
    const type = 'PUT'
    const orderId = data?.orderId || 0
    checkId(orderId, validationMessages.orderId)
    validateOrder(data)
    return fakeApiCall({ type, data, id: orderId })
}

// PUT /order/{orderId}/finalize
export const finalizeOrderCall = (orderId: number): Promise<response> => {
    const type = 'PUT'
    checkId(orderId, validationMessages.orderId)
    return fakeApiCall({ type, data: undefined, id: orderId })
}

// PUT /order/{orderId}/seller
export const putOrderSellerCall = (
    sellers: requestSeller[],
    orderId: number,
): Promise<response> => {
    const type = 'PUT'
    checkLength(sellers)
    checkId(orderId, validationMessages.orderId)
    return fakeApiCall({ type, data: sellers, id: orderId })
}

const validateItem = (item: requestOrderItem): void => {
    const { type: orderType, deliveryType, comment, orderId } = item
    if (orderType === 'special') {
        checkIfEmptyString(deliveryType, validationMessages.deliveryType)
        checkIfEmptyString(comment, validationMessages.comment)
    }
    checkId(orderId, validationMessages.orderId)
}

// POST /order/{orderId}/item
export const postOrderItemCall = (item: requestOrderItem): Promise<response> => {
    const type = 'POST'
    validateItem(item)
    return fakeApiCall({ type, data: item })
}

// PUT /order/{orderId}/item/{itemId}
export const putOrderItemCall = (item: requestOrderItem): Promise<response> => {
    const type = 'PUT'
    const { orderId, itemId } = item
    checkId(orderId, validationMessages.orderId)
    checkId(itemId, validationMessages.itemId)
    validateItem(item)
    return fakeApiCall({ type, data: item, id: itemId })
}

// DELETE /order/{orderId}/item/{itemId}
export const deleteItemCall = (
    orderId: number,
    itemId: number,
): Promise<response> => {
    const type = 'DELETE'
    checkId(orderId)
    const data = { itemId, orderId }
    return fakeApiCall({ type, data, id: itemId })
}
