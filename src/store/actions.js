import {SET_TYPE, SET_PRODUCT, SET_LOGIN, SET_PRODUCT_IN_CART} from "./constants"
export const setType = payload => {
    return {
        type: SET_TYPE,
        payload
    }
}

export const setProduct = payload => {
    return {
        type: SET_PRODUCT,
        payload
    }
}

export const setLogin = payload => {
    return {
        type: SET_LOGIN,
        payload
    }
}

export const setProductInCart = payload => {
    return {
        type: SET_LOGIN,
        payload
    }
}