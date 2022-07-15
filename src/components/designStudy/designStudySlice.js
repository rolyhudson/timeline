import { createSlice } from "@reduxjs/toolkit";

export const designStudySlice = createSlice({
  name: "designStudy",
  initialState: {
    value: [],
  },
  reducers: {
    addDesignStudy: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.push(action.payload);
    },
    updateDesignStudy: (state, action) => {
      let objIndex = state.value.findIndex(
        (obj) => obj.id == action.payload.id
      );
      console.log(objIndex);
      state.value[objIndex] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDesignStudy, updateDesignStudy } = designStudySlice.actions;

export default designStudySlice.reducer;
