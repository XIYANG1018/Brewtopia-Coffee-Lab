export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
    // calculate the total price of the items in the cart
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)); // default value of accumulator in the reduce function is 0

    // if the price of the items in the cart is greater than $100, shipping is free
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

    
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

    localStorage.setItem("cart", JSON.stringify(state)); // save the cart items to the local storage
}