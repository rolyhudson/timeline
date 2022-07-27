import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import designStudyReducer from "./components/designStudy/designStudySlice";
import decisionAnalysisReducer from "./components/decisionAnalysis/decisionAnalysisSlice";
import { designStudyApiSlice } from "./components/designStudy/designStudyApiSlice";

export default configureStore({
  reducer: {
    designStudy: designStudyReducer,
    decisionAnalysis: decisionAnalysisReducer,
    [designStudyApiSlice.reducerPath]: designStudyApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(designStudyApiSlice.middleware),
});
