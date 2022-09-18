import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

export const apiSlice = createApi({
  baseQuery: authQuery,
  endpoints: builder => ({})
})