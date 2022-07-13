import { createSlice } from "@reduxjs/toolkit";

export const designStudySlice = createSlice({
  name: "designStudy",
  initialState: {
    value: [],
  },
  reducers: {
    addMCDA: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.push({ name: "new mcda" });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMCDA } = designStudySlice.actions;

export default designStudySlice.reducer;
