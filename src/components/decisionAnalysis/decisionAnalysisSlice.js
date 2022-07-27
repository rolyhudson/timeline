import { createSlice } from "@reduxjs/toolkit";

export const decisionAnalysisSlice = createSlice({
  name: "decisionAnalysis",
  initialState: {
    value: [],
  },
  reducers: {
    createDecisionAnalysis: (state, action) => {
      state.value.push(action.payload);
    },

    updateDecisionAnalysis: (state, action) => {
      let objIndex = state.value.findIndex(
        (obj) => obj.id === action.payload.id
      );
      if (objIndex === -1) state.value.push(action.payload);
      else state.value[objIndex] = action.payload;
    },

    queryDecisionAnalysisExists: (state, action) => {
      let objIndex = state.value.findIndex(
        (obj) => obj.id === action.payload.id
      );
      if (objIndex === -1) return action.payload;
      else return state.value[objIndex];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createDecisionAnalysis,
  updateDecisionAnalysis,
  queryDecisionAnalysisExists,
} = decisionAnalysisSlice.actions;

export default decisionAnalysisSlice.reducer;
