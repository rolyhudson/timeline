import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import designStudyReducer from "./components/designStudy/designStudySlice";
import { apiSlice } from "./components/api/apiSlice";

export default configureStore({
  reducer: {
    designStudy: designStudyReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
