// 使用 Redux Toolkit Query 配置一个 API slice 的起始部分, this is a parent api slice
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// fetchBaseQuery is the function that will allow us to make request to our backend and API
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// endpoints is where we will define all of the different API endpoints that we want to use in our application
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({}),   
});