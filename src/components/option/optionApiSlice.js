// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const optionApiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "optionapi",
  // All of our requests will have URLs starting with "https://rat-prototype-api.azurewebsites.net/api"
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rat-prototype-api.azurewebsites.net/api",
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getOptions: builder.query({
      query: () => "/Options",
    }),

    createOption: builder.mutation({
      query: (payload) => ({
        url: "/Options",
        method: "POST",
        body: payload,
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),

    deleteOption: builder.mutation({
      query: (payload) => ({
        url: `/Options/${payload.id}`,
        method: "DELETE",
        body: payload,
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetOptionsQuery,
  useCreateOptionMutation,
  useDeleteOptionMutation,
} = optionApiSlice;
