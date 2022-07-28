// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const designStudyApiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with "https://rat-prototype-api.azurewebsites.net/api"
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rat-prototype-api.azurewebsites.net/api",
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // TODO separate files for different end points
    getOptions: builder.query({
      query: () => "/Options",
    }),

    getProjects: builder.query({
      query: () => "/Projects",
    }),

    getPhases: builder.query({
      query: () => "/Phases",
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

    getStudies: builder.query({
      query: () => "/DesignStudies",
    }),

    createDesignStudy: builder.mutation({
      query: (payload) => ({
        url: "/DesignStudies",
        method: "POST",
        body: payload,
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),

    updateDesignStudy: builder.mutation({
      query: (payload) => ({
        url: `/DesignStudies/${payload.id}`,
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
  useGetOptionsQuery,
  useGetProjectsQuery,
  useGetPhasesQuery,
  useCreateProjectMutation,
  useCreateDesignStudyMutation,
  useGetStudiesQuery,
  useUpdateDesignStudyMutation,
} = designStudyApiSlice;
