import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
  endpoints: (builder) => ({
      registerUser: builder.mutation({
      query:(user)=> {
          return {
              url: 'register',
              method: 'POST',
              body:user,
              headers: {
                  'Content-type': 'application/json',
              }
          }
      }
      }),

      loginUser: builder.mutation({
        query:(user)=> {
          return {
              url: 'login',
              method: 'POST',
              body:user,
              headers: {
                  'Content-type': 'application/json',
              }
          }
        }
      }),

      logoutUser: builder.mutation({
        query:({token})=> {
          return {
              url: 'logout',
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

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useChangePasswordMutation, useSendResetEmailMutation ,useResetPasswordMutation } = userAuthApi