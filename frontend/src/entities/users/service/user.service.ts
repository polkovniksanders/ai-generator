import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { UserProps } from './users.types.ts';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api`,
        headers: { 'Content-Type': 'application/json' },
    }),
    endpoints: builder => ({
        createUser: builder.mutation<UserProps, Partial<UserProps>>({
            query: payload => ({
                url: 'users',
                method: 'POST',
                body: payload,
            }),
        }),
        getUsers: builder.query<any, UserProps[]>({
            query: () => ({
                url: 'users',
                method: 'GET',
            }),
        }),
        getUser: builder.query<any, string>({
            query: uuid => ({
                url: `users/${uuid}`,
                method: 'GET',
            }),
        }),

        getCharacter: builder.query<any, string>({
            query: uuid => ({
                url: `generate/${uuid}`,
                method: 'GET',
            }),
        }),

        createCharacterImage: builder.mutation<any, string>({
            query: description => ({
                url: `generate-image`,
                method: 'POST',
                body: {
                    description: description,
                },
            }),
        }),
    }),
});

export const {
    useCreateUserMutation,
    useLazyGetUsersQuery,
    useLazyGetUserQuery,
    useLazyGetCharacterQuery,
    useCreateCharacterImageMutation,
} = userApi;
