import { createSlice } from "@reduxjs/toolkit";

export const product = createSlice({
    name: "product",
    initialState: {
        product: {}
      },
    reducers: {
        setProduct: (state, action) => {
            localStorage.setItem("productId", action.payload.product_id);
            state.product = action.payload
        }
    }
})

export const {setProduct} = product.actions;
export default product.reducer;
