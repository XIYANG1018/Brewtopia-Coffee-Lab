import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// 创建一个新的 API slice，用于处理 products 相关的请求，并把endpoints添加到父级API slice中
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getProducts 是一个 query endpoint，用于获取所有的 products
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL, // this is the endpoint that we want to make a request to
            }),
            // ，keepUnusedDataFor 参数通常包含一个时间段或持续时间，系统在这段时间内会保留未使用的数据。一旦超过指定的时间，系统可能会自动清理或删除这些未使用的数据，以释放存储空间或优化系统性能。
            keepUnusedDataFor: 5, // keep the data for 5 seconds
        }),

        // getProductDetails 是一个 query endpoint，用于获取单个 product 的详细信息
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),

    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;