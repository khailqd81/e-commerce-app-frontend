import {SET_TYPE, SET_PRODUCT} from "./constants"
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