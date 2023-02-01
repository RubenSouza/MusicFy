import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLibrary: false,
};

const topButtonsSlice = createSlice({
  name: "topButtons",
  initialState,
  reducers: {
    setIsLibrary: (state, action) => {
      state.isLibrary = action.payload;
    },
  },
});

export const { setIsLibrary } = topButtonsSlice.actions;

export default topButtonsSlice.reducer;
