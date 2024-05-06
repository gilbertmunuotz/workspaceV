import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const USERS_URL = '/api';

const baseQuery = fetchBaseQuery({
    baseUrl: USERS_URL, // Assuming all your backend API routes start with /api
});


export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'], // For potential future data caching (optional)
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `/register`,
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `/login`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `logout`,
                method: 'GET',
            })
        })
    }),
});


export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = apiSlice;