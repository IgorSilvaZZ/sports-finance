import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Dashboard } from "../../interfaces/Dashboard.interface";
import { AppState } from "..";

const initialState: Dashboard = {
  filters: {
    textParticipant: "",
    month: new Date().getMonth() + 1,
    status: "select",
    type: "select",
    year: String(new Date().getFullYear()),
  },
};

export type TypeFieldFilters = {
  key: string;
  value: string | number;
};

const slice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    changeFilters(state, { payload }: PayloadAction<Dashboard>): void {
      state.filters = payload.filters;
    },
    changeFilterByField(
      state,
      { payload }: PayloadAction<TypeFieldFilters>
    ): void {
      state.filters = {
        ...state.filters,
        [payload.key]: payload.value,
      };
    },
    clearFilters(state): void {
      state.filters = initialState.filters;
    },
  },
});

export const dashboardActions = slice.actions;
export const selectDashboard = (state: AppState) => state.dashboard;

export default slice.reducer;
