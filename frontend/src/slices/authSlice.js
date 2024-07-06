import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) { 
            state.userInfo = action.payload; // 从action中获取数据，更新state中的userInfo
            localStorage.setItem('userInfo', JSON.stringify(action.payload)); // 为什么要存到localStorage中？因为刷新页面后，redux中的数据会被清空，所以需要存到localStorage中，存在哪里？存在浏览器的localStorage中，localStorage是浏览器提供的一种存储机制，存储在localStorage中的数据，刷新页面后不会被清空，只有手动清空或者代码清空才会被清空
        },

        // clear the userInfo from the state and localStorage
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }

    }
});
export const { setCredentials, logout } = authSlice.actions; // 导出action，供外部调用，actions是一个对象，里面包含了多个action，如何调用？通过dispatch(action)，dispatch是一个函数，用于触发action，触发action后，会调用reducer，reducer会根据action的type来更新state
export default authSlice.reducer;