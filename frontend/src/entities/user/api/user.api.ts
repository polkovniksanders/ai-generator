import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, CreateUserPayload, CreateUserResponse } from '../model/user.types';

const baseUrl = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : '/api';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        createUser: builder.mutation<CreateUserResponse, CreateUserPayload>({
            query: body => ({ url: 'characters', method: 'POST', body }),
        }),
        getUsers: builder.query<User[], void>({
            query: () => 'characters',
        }),
        getUser: builder.query<User, string>({
            query: uuid => `characters/${uuid}`,
        }),
        getCharacter: builder.query<{ description: string }, string>({
            query: uuid => `generate/${uuid}`,
        }),
        generateImage: builder.mutation<{ image: string }, string>({
            query: uuid => ({
                url: `characters/${uuid}/image`,
                method: 'POST',
            }),
            invalidatesTags: (_result, _error, uuid) => [{ type: 'Character', id: uuid }],
        }),
    }),
});

export const {
    useCreateUserMutation,
    useGetUsersQuery,
    useGetUserQuery,
    useGetCharacterQuery,
    useGenerateImageMutation,
} = userApi;
