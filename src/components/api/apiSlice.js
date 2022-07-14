// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with "https://rat-prototype-api.azurewebsites.net/api"
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7029/api", //"https://rat-prototype-api.azurewebsites.net/api",
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getOptions: builder.query({
      query: () => "/Options",
    }),

    createProject: builder.mutation({
      query: (payload) => ({
        url: "/Projects",
        method: "POST",
        body: payload,
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetOptionsQuery, useCreateProjectMutation } = apiSlice;
