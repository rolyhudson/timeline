import { createSlice } from "@reduxjs/toolkit";

export const designStudySlice = createSlice({
  name: "designStudy",
  initialState: {
    value: [],
  },
  reducers: {
    createDesignStudy: (state, action) => {
      state.value.push(action.payload);
    },

    updateDesignStudy: (state, action) => {
      let objIndex = state.value.findIndex(
        (obj) => obj.id === action.payload.id
      );
      if (objIndex === -1) state.value.push(action.payload);
      else state.value[objIndex] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { createDesignStudy, updateDesignStudy } =
  designStudySlice.actions;

export default designStudySlice.reducer;
