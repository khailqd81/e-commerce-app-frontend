import {SET_TYPE} from "./constants"
export const setType = payload => {
    return {
        type: SET_TYPE,
        payload
    }
}