// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const decisionAnalysisApiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with "https://rat-prototype-api.azurewebsites.net/api"
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rat-prototype-api.azurewebsites.net/api",
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getDecisionAnalyses: builder.query({
      query: () => "/DecisionAnalyses",
    }),

    updateDecisionAnalysis: builder.mutation({
      query: (payload) => ({
        url: `/DecisionAnalyses/${payload.id}`,
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

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetDecisionAnalysisQuery,
  useUpdateDecisionAnalysisMutation,
} = decisionAnalysisApiSlice;
