
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// 创建一个新的 API slice，用于处理 products 相关的请求，并把endpoints添加到父级API slice中
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getProducts 是一个 query endpoint，用于获取所有的 products
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL, // this is the endpoint that we want to make a request to
            }),
            providesTags: ['Products'], // providesTags 参数用于指定一个或多个标签，这些标签用于标识此查询返回的数据。在这个例子中，我们使用了'Products'标签，以便在数据发生变化时，我们可以通知任何使用了该标签的查询。
            
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

        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
            // 失效标签：当一个变更操作失效了某个特定标签时，任何使用该标签的查询将在变更操作完成后重新获取数据。在这个例子中，这意味着在创建新产品后，任何依赖于'Product'标签的查询将重新获取数据，以确保它们拥有最新的数据。
        }),

        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),

        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data,
                
            }),
            invalidatesTags: ['Product'],
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
        }), 

    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation } = productsApiSlice;