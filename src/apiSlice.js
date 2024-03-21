import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: updatedUser,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        invalidatesTags: ['User'],
      }),
      onMutate: ({ id, updatedUser }) => {
        // You can perform optimistic updates here if needed
        // For example, dispatch an action to update the local state
      },
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation, useAddUserMutation, useUpdateUserMutation } = api;
export default api;
