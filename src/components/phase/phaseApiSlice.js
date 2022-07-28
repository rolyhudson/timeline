// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const phaseApiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "phaseapi",
  // All of our requests will have URLs starting with "https://rat-prototype-api.azurewebsites.net/api"
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rat-prototype-api.azurewebsites.net/api",
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getPhases: builder.query({
      query: () => "/Phases",
    }),

    createPhase: builder.mutation({
      query: (payload) => ({
        url: "/Phases",
        method: "POST",
        body: payload,
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),

    deletePhase: builder.mutation({
      query: (payload) => ({
        url: `/Phases/${payload.id}`,
        method: "DELETE",
        body: payload,
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),

    updatePhase: builder.mutation({
      query: (payload) => ({
        url: `/Phases/${payload.id}`,
        method: "PUT",
        body: payload,
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Put"],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetPhasesQuery,
  useCreatePhaseMutation,
  useDeletePhaseMutation,
  useUpdatePhaseMutation,
} = phaseApiSlice;
