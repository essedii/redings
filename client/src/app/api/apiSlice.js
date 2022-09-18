// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.accessToken

//     // If we have a token set in state, let's assume that we should be passing it.
//     if (token) {
//       console.log('token', token)
//       headers.set('Authorization', `Bearer ${token}`)
//     }

//     return headers
//   },
//   endpoints: (builder) => ({}),
// });

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const authQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

// const baseQueryWithAuth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions)

//     if (result?.error?.originalStatus === 403) {
//         console.log('sending refresh token')
//         // send refresh token to get new access token 
//         const refreshResult = await baseQuery('/refresh', api, extraOptions)
//         console.log(refreshResult)
//         if (refreshResult?.data) {
//             const user = api.getState().auth.user
//             // store the new token 
//             api.dispatch(setCredentials({ ...refreshResult.data, user }))
//             // retry the original query with new access token 
//             result = await baseQuery(args, api, extraOptions)
//         } else {
//             api.dispatch(logOut())
//         }
//     }

//     return result
// }

export const apiSlice = createApi({
  baseQuery: authQuery,
  endpoints: builder => ({})
})