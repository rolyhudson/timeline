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
      //create if not found
      if (objIndex === -1) {
        state.value.push(action.payload);
      }
      //update if found
      else {
        state.value[objIndex] = action.payload;
      }
    },

    removeDesignStudy: (state, action) => {
      let objIndex = state.value.findIndex(
        (obj) => obj.id === action.payload.id
      );
      if (objIndex === -1) {
        return;
      } else {
        state.value.splice(objIndex, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { createDesignStudy, updateDesignStudy, removeDesignStudy } =
  designStudySlice.actions;

export default designStudySlice.reducer;
