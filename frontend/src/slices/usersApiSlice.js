import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// 创建一个新的 API slice，用于处理 users 相关的请求，并把endpoints添加到父级API slice中
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 我们可以dispatch一个action，这个action会调用builder.query方法，builder.query方法会发送一个请求到服务器，请求的url是USERS_URL，请求的方法是GET，请求的参数是data
        login: builder.mutation({
            query: (data) => ({ // send the data to the server
                url: `${USERS_URL}/auth`, 
                method: 'POST',
                body: data,
            }),
            // ，keepUnusedDataFor 参数通常包含一个时间段或持续时间，系统在这段时间内会保留未使用的数据。一旦超过指定的时间，系统可能会自动清理或删除这些未使用的数据，以释放存储空间或优化系统性能。
            keepUnusedDataFor: 5, // keep the data for 5 seconds
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),

        

    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;