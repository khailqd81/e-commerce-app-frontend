import { SET_TYPE, SET_PRODUCT } from "./constants"
const initialState = {
    type: "Điện thoại",
    product: {}
}

function reducer(state, action) {
    switch (action.type) {
        case SET_TYPE:
            localStorage.setItem("category",action.payload);
            return {
                ...state,
                type: action.payload
            }
        case SET_PRODUCT:
            return {
                ...state,
                product: { ...action.payload }
            }
        default:
            return state;
    }
}
export { initialState };
export default reducer;
