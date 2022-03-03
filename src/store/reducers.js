import { SET_TYPE, SET_PRODUCT, SET_LOGIN } from "./constants"
const initialState = {
    type: "Điện thoại",
    product: {},
    isLogin: false
}

function reducer(state, action) {
    switch (action.type) {
        case SET_TYPE:
            localStorage.setItem("category", action.payload);
            return {
                ...state,
                type: action.payload
            }
        case SET_PRODUCT:
            localStorage.setItem("productId", action.payload.product_id);
            return {
                ...state,
                product: { ...action.payload }
            }
        case SET_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            }
        default:
            return state;
    }
}
export { initialState };
export default reducer;
