import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  Dashboard,
  DashBoardFilters,
} from "../../interfaces/Dashboard.interface";
import { AppState } from "..";

const initialState: Dashboard = {
  appliedFilters: {
    textParticipant: "",
    month: new Date().getMonth() + 1,
    status: "select",
    type: "select",
    year: String(new Date().getFullYear()),
  },
  editingFilters: {
    textParticipant: "",
    month: new Date().getMonth() + 1,
    status: "select",
    type: "select",
    year: String(new Date().getFullYear()),
  },
};

export interface TypeFieldFilters {
  [key: string]: string | number;
}

type PartialDashBoardFilters = Partial<DashBoardFilters>;

const slice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    changeEditingFilters(
      state,
      { payload }: PayloadAction<TypeFieldFilters>
    ): void {
      state.editingFilters = {
        ...state.editingFilters,
        [payload.key]: payload.value,
      };
    },
    changeApplyFilters(
      state,
      { payload }: PayloadAction<PartialDashBoardFilters>
    ) {
      state.appliedFilters = {
        ...state.editingFilters,
        ...payload,
      };

      state.editingFilters = {
        ...state.appliedFilters,
        year: state.appliedFilters.year,
        month: state.appliedFilters.month,
      };
    },
    applyFilters(state) {
      state.appliedFilters = {
        ...state.editingFilters,
      };
    },
    clearFilters(state): void {
      state.appliedFilters = initialState.appliedFilters;
      state.editingFilters = initialState.editingFilters;
    },
  },
});

export const dashboardActions = slice.actions;
export const selectDashboard = (state: AppState) => state.dashboard;

export default slice.reducer;
