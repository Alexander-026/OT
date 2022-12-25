import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../http'
import { IAuthResponse } from "../../models/AuthResponse";


export const authAPI = createApi({
   reducerPath: 'authAPI',
   baseQuery: fetchBaseQuery({ baseUrl: API_URL, prepareHeaders: (headers) => {
      headers.set('Content-type', 'application/json')
      headers.set('authorization', `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').accessToken || 'NONE'}`)
      return headers
   }, credentials: "include"}),
   endpoints: (builder) => ({
      login: builder.mutation<IAuthResponse,{email:string,password:string}>({
         query: (user) => ({
            url: '/login',
            method: 'POST',
            body: user
         })
      }),
      registration: builder.mutation<IAuthResponse,{email:string,password:string}>({
         query: (user) => ({
            url: '/registration',
            method: 'POST',
            body: user
         })
      }),
      logout: builder.mutation<void,void>({
         query: () => ({
            url: '/logout',
            method: 'POST',
         })
      })
   })
})


 export const {useLoginMutation, useRegistrationMutation, useLogoutMutation} = authAPI