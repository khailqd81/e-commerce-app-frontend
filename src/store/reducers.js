import { SET_TYPE } from "./constants"
const initialState = {
    type: "Điện thoại"
}

function reducer(state, action) {
    switch (action.type) {
        case SET_TYPE:
            console.log("Action payload: ", action.payload);
            return {
                ...state,
                type: action.payload
            }
        default:
            return state;
    }
}
export { initialState };
export default reducer;
