import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./features/cart/cartSlice"
import accountReducer from "./features/account/accountSlice";
import categoryReducer from "./features/category/categorySlice";
import productReducer from "./features/product/productSlice";
export default configureStore({
    reducer: {
        cart: cartReducer,
        account: accountReducer,
        category: categoryReducer,
        product: productReducer
    }
})