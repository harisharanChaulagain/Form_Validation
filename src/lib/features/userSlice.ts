import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const userApi = createApi ({
    reducerPath:"user",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:8000"}),
    endpoints:(builder) => ({
        getAllUser: builder.query({
            query: () => "/users"
        }),

        
    updateUser: builder.mutation({
        query: ({ id, updatedUser }) => ({
          url: `/users/${id}`,
          method: "PUT",
          body: updatedUser,
        }),
      }),

      
      deleteUser: builder.mutation({
        query: (id) => ({
          url: `/users/${id}`,
          method: "DELETE",
        }),
      }),

    }),
    
})

export const {useGetAllUserQuery,useUpdateUserMutation,useDeleteUserMutation} = userApi;