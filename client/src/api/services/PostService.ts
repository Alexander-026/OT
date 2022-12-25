import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../redux/store'

type Post = {
   userId: number,
   id: number,
   title: string,
   body: string
}

type User = {
   id: number,
   name: string,
   userName: string,
   email: string
}


export const postAPI = createApi({
   reducerPath: 'postAPI',
   baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com', prepareHeaders: (headers, {getState}) => {
      const states =  (getState() as RootState)
      console.log('states', states)
      headers.set('authorization', localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '')
      return headers
     
   }}),
   endpoints: (builder) => ({
       getAllPost: builder.query<Post[],void>({
         query: () => ({
            headers: {
					'Content-type': 'application/json',
				},
            url: '/posts',
            method: 'GET'
         })
       }),
       getAllUsers: builder.query<User[],void>({
         query: () => ({
            headers: {
					'Content-type': 'application/json',
				},
            url: '/users',
            method: "GET"
         })
       }),
   })
})