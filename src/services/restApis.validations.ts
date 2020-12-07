export const checkId = (
    id: number | undefined,
    message = 'id is not valid',
): void => {
    if (!!id && id < 1) {
        throw message
    }
}

// regex to validate a date in iso format
const reDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

export const checkDate = (date: string, message = 'date is not valid') => {
    if (!date && !reDate.test(date)) {
        throw message
    }
}

export const checkLength = (array: any[], message = 'not enough elements') => {
    if (array.length < 1) {
        throw message
    }
}

export const checkIfEmptyString = (
    element: string | undefined,
    message = 'element missing',
) => {
    if (!element) {
        throw message
    }
}
