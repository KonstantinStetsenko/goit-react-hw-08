import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  number: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeNameFilter(state, action) {
      state.name = action.payload;
    },
    changeNumberFilter(state, action) {
      state.number = action.payload;
    },
  },
});

export default filtersSlice;
