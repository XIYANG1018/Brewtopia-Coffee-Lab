import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice"

// 创建redux store实例，Redux store 是一个 JavaScript 对象，它管理应用程序的整个状态树。它是 Redux 的核心部分，负责保存应用的状态、处理状态的更新以及提供访问状态的方法
// configureStore 是 Redux Toolkit 提供的一个函数，用于简化 Redux store 的配置。它集成了一些默认配置，可以减少样板代码（boilerplate code）
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;