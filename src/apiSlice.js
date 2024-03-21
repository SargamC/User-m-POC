import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateUser } from './usersSlice';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE'
      })
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
    }),
    updateUser: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: updatedUser,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }),
      onMutate: ({ id, updateUser }) => {
        updateUser({ id, updateUser }); // Should be updateUser, not updatedUser
      },
    })
  })
});

export const { useGetUsersQuery, useDeleteUserMutation, useAddUserMutation, useUpdateUserMutation } = api;
export default api;
