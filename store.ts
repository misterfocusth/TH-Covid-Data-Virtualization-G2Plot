// Redux
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

// Redux Next Wrapper
import { createWrapper } from "next-redux-wrapper";

// Slices
import { menuSlice } from "./slices/menuSlice";
// import menuReducer from "./slices/menuSlices";
import pagesReducer from "./slices/pageSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [menuSlice.name]: menuSlice.reducer,
      page: pagesReducer,
    },
    devTools: true,
  });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
