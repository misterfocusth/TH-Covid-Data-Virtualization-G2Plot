import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { AppState } from "../store";

interface MenuState {
  isOpenMenu: boolean;
  selectedKeys: string;
}

const initialState: MenuState = {
  isOpenMenu: false,
  selectedKeys: "/",
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.menu,
      };
    },
    toggleMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    setSelectedKeys: (state, action: PayloadAction<string>) => {
      state.selectedKeys = action.payload;
    },
  },
});

export const { toggleMenu, setSelectedKeys } = menuSlice.actions;
export const selectMenuState = (state: AppState) => state.menu;
