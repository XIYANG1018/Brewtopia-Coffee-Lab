import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// when we leave the cart and come back, we want to see the current items in the cart
// so we need to check the local storage for the cart items
// 即便刷新页面，也能保留购物车中的商品
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []};

const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => { // state is the current state of the cart
            const item = action.payload; // payload is the data carried along with our action

            const existItem = state.cartItems.find((x) => x._id === item._id); // check if the item already exists in the cart

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x); // if the item exists, update the item,  map 方法，用于对数组的每个元素进行操作，并返回一个新的数组。
            } else {
                state.cartItems = [...state.cartItems, item]; // if the item does not exist, add the item to the cart 
            }

            return updateCart(state); // update the cart

        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload); // filter out the item that we want to remove
            return updateCart(state); // update the cart
        },
    }, // contains action functions of the cart

});

// in order to use the addToCart action function, we need to export it as an action
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;