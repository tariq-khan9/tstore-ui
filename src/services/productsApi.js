import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query:(product)=> ({
              url: '/products',
              method: 'POST',
              body:product,
              headers: {
                'Content-type': 'application/json',
              }
          
            })
      }),

      addImage: builder.mutation({
        query:(image, name)=> ({
                url: '/image',
                method: 'POST',
                body:image, name,
             
                
            
              })
        }),

      

      getProducts: builder.query({
      query:()=> ({
              url: '/products',
              method: 'GET',
              headers: {
                  'Content-type': 'application/json',
              }
          
            })
      }),

  }),
})

export const {useAddProductMutation, useGetProductsQuery, useAddImageMutation} = productsApi