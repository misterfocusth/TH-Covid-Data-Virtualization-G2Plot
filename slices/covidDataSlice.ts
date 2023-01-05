// Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Next-Redux-Wrapper
import { HYDRATE } from "next-redux-wrapper";

// Redux Store
import { AppState, AppStore } from "../store";

interface CovidData {
  weekData: any[] | null;
  timelineData: any[] | null;
  timelineProvincesData: any[] | null;
  provincesData: any[] | null;
  selectedWeekRange: number | null;
}

const initialState: CovidData = {
  weekData: null,
  timelineData: null,
  timelineProvincesData: null,
  provincesData: null,
  selectedWeekRange: 3, // 4 Week (Initial Value)
};

export const covidDataSlice = createSlice({
  name: "covidData",
  initialState,
  reducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.covidData,
      };
    },
    setWeekData: (state, action: PayloadAction<any[]>) => {
      state.weekData = action.payload;
    },
    setTimelineData: (state, action: PayloadAction<any[]>) => {
      state.timelineData = action.payload;
    },
    setTimelineProvincesData: (state, action: PayloadAction<any[]>) => {
      state.timelineProvincesData = action.payload;
    },
    setProvincesData: (state, action: PayloadAction<any[]>) => {
      state.provincesData = action.payload;
    },
    setSelectedWeekRange: (state, action: PayloadAction<number>) => {
      state.selectedWeekRange = action.payload;
    },
  },
});

export const {
  setWeekData,
  setTimelineData,
  setTimelineProvincesData,
  setProvincesData,
  setSelectedWeekRange,
} = covidDataSlice.actions;
export const selectCovidDataState = (state: AppState) => state.covidData;
