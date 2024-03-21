// userAPI.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: builder => ({
    fetchUsers: builder.query({
      query: () => '/users',
    }),
    createUser: builder.mutation({
      query: newUser => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
    }),
    updateUser: builder.mutation({
      query: updatedUser => ({
        url: `/users/${updatedUser.id}`,
        method: 'PUT',
        body: updatedUser,
      }),
    }),
    deleteUser: builder.mutation({
      query: userId => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useFetchUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userAPI;
