import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Responsible } from "../../interfaces/Responsible.interface";

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
      state = payload;
    },
  },
});

export const responsibleActions = slice.actions;

export default slice.reducer;
