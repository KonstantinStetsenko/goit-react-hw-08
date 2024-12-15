import filtersSlice from "./slice";

export const { changeNameFilter, changeNumberFilter } = filtersSlice.actions;
export const selectNameFilter = (state) => state.filters.name;
export const selectNumberFilter = (state) => state.filters.number;
export const filtersReducer = filtersSlice.reducer;
