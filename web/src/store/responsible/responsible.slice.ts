import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Responsible } from "../../interfaces/Responsible.interface";

import { AppState } from "..";

const initialState: Responsible = {
  id: "",
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  avatar: "",
  categories: [],
  createDate: "",
  updateDate: "",
  token: "",
};

const slice = createSlice({
  name: "responsible",
  initialState,
  reducers: {
    authenticate(state, { payload }: PayloadAction<Responsible>): void {
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
      state.password = payload.password;
      state.phoneNumber = payload.phoneNumber;
      state.token = payload.token;
      state.avatar = payload.avatar ?? null;
      state.createDate = payload.createDate;
      state.updateDate = payload.updateDate;
      state.categories = payload.categories;
    },
    clear(state) {
      state.id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.phoneNumber = "";
      state.token = "";
      state.avatar = "";
      state.createDate = "";
      state.updateDate = "";
      state.categories = [];
    },
  },
});

export const responsibleActions = slice.actions;
export const selectResponsible = (state: AppState) => state.responsible;

export default slice.reducer;
