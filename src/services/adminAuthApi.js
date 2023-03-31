import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const adminAuthApi = createApi({
  reducerPath: 'adminAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
  endpoints: (builder) => ({

    registerAdmin: builder.mutation({
      query:(admin)=> {
          return {
              url: 'admin-register',
              method: 'POST',
              body:admin,
              headers: {
                  'Content-type': 'application/json',
              }
          }
      }
      }),

      loginAdmin: builder.mutation({
      query:(user)=> {
          return {
              url: 'admin-login',
              method: 'POST',
              body:user,
              headers: {
                  'Content-type': 'application/json',
              }
          }
      }
      }),

      logoutAdmin: builder.mutation({
        query:({token})=> {
          return {
              url: 'admin-logout',
              method: 'POST',
              body:{},
              headers: {
                  'Content-type': 'application/json',
                  'authorization': `Bearer ${token}`,
              }
          }
        }
      }),

      changePassword: builder.mutation({
        query:({actualData, token})=> {
          return {
              url: 'changepassword',
              method: 'POST',
              body:actualData,
              headers: {
                  
                  'authorization': `Bearer ${token}`,
              }
          }
        }
      }),

      resetPassword: builder.mutation({
        query:({actualData, token})=> {
          return {
              url: `/reset-password/${token}`,
              method: 'POST',
              body:actualData,
              headers: {
                  
                'Content-type': 'application/json',
              }
          }
        }
      }),

      sendResetEmail: builder.mutation({
        query:(actualData)=> {
          return {
              url: 'send-passreset-email',
              method: 'POST',
              body: actualData,
              headers: {
                  
                'Content-type': 'application/json',
              }
          }
        }
      }),
  }),
})

export const { useLoginAdminMutation, useLogoutAdminMutation, useRegisterAdminMutation} = adminAuthApi