import { createSlice } from "@reduxjs/toolkit";

export const designOptionSlice = createSlice({
  name: "designOptions",
  initialState: {
    value: [],
  },
  reducers: {
    createDesignOption: (state, action) => {
      state.value.push(action.payload);
    },

    updateDesignOption: (state, action) => {
      let objIndex = state.value.findIndex(
        (obj) => obj.id === action.payload.id
      );
      if (objIndex === -1) state.value.push(action.payload);
      else state.value[objIndex] = action.payload;
    },

    queryDesignOptionExists: (state, action) => {
      let objIndex = state.value.findIndex(
        (obj) => obj.id === action.payload.id
      );
      if (objIndex === -1) return action.payload;
      else return state.value[objIndex];
    },

    setAllDesignOptions: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createDesignOption,
  updateDesignOption,
  queryDesignOptionExists,
  setAllDesignOptions,
} = designOptionSlice.actions;

export default designOptionSlice.reducer;
