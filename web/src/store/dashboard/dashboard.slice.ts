import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Dashboard } from "../../interfaces/Dashboard.interface";
import { AppState } from "..";

// Criar estado para guardar o filtro de pesquisa
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

export type TypeFieldFilters = {
  key: string;
  value: string | number;
};

const slice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    changeEditingFilters(
      state,
      { payload }: PayloadAction<TypeFieldFilters>,
    ): void {
      state.editingFilters = {
        ...state.editingFilters,
        [payload.key]: payload.value,
      };
    },
    applyFilters(state) {
      state.appliedFilters = { ...state.editingFilters };
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
