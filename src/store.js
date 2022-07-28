import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import designStudyReducer from "./components/designStudy/designStudySlice";
import decisionAnalysisReducer from "./components/decisionAnalysis/decisionAnalysisSlice";
import { designStudyApiSlice } from "./components/designStudy/designStudyApiSlice";
import { projectApiSlice } from "./components/project/projectApiSlice";
import { phaseApiSlice } from "./components/phase/phaseApiSlice";
import { optionApiSlice } from "./components/option/optionApiSlice";
import { decisionAnalysisApiSlice } from "./components/decisionAnalysis/decisionAnalysisApiSlice";

export default configureStore({
  reducer: {
    designStudy: designStudyReducer,
    decisionAnalysis: decisionAnalysisReducer,
    [projectApiSlice.reducerPath]: projectApiSlice.reducer,
    [phaseApiSlice.reducerPath]: phaseApiSlice.reducer,
    [designStudyApiSlice.reducerPath]: designStudyApiSlice.reducer,
    [decisionAnalysisApiSlice.reducerPath]: decisionAnalysisApiSlice.reducer,
    [optionApiSlice.reducerPath]: optionApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      projectApiSlice.middleware,
      designStudyApiSlice.middleware,
      optionApiSlice.middleware
    ),
});
