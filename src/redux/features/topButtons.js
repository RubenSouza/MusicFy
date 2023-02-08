import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLibrary: false,
  isSearch: false,
};

const topButtonsSlice = createSlice({
  name: "topButtons",
  initialState,
  reducers: {
    setIsLibrary: (state, action) => {
      state.isLibrary = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
  },
});

export const { setIsLibrary, setIsSearch } = topButtonsSlice.actions;

export default topButtonsSlice.reducer;
