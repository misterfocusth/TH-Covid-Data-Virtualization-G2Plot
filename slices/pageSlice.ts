import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  currentPage: string;
}

const initialState: PageState = {
  currentPage: "/",
};

export const PageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = PageSlice.actions;
export default PageSlice.reducer;
