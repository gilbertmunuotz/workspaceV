import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_API } from '../utilities/constants';


const baseQuery = fetchBaseQuery({
    baseUrl: `${SERVER_API}/api`
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
                url: `/logout`,
                method: 'GET',
            })
        }),
        sendMessage: builder.mutation({
            query: (data) => ({
                url: `/users`,
                method: "POST",
                body: data,
            })
        }),
    }),
});


export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useSendMessageMutation } = apiSlice;