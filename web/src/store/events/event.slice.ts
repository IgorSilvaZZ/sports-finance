import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Event } from "../../interfaces/Event.interface";

import { AppState } from "..";

const initialState: Event = {
  id: "",
  name: "",
  description: "",
  type: "",
  participantsCount: 0,
  dayMonthly: 0,
  valueMonthly: 0,
  responsibleId: "",
  participants: [],
  payments: [],
  createDate: "",
  updateDate: "",
};

const slice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvent(state, { payload }: PayloadAction<Event>): void {
      state.id = payload.id;
      state.name = payload.name;
      state.description = payload.description;
      state.type = payload.type;
      state.dayMonthly = payload.dayMonthly;
      state.valueMonthly = payload.valueMonthly;
      state.responsibleId = payload.responsibleId;
      state.participants = payload.participants;
      state.payments = payload.payments;
      state.createDate = payload.createDate;
      state.updateDate = payload.updateDate;
    },
    clear(state) {
      state.id = "";
      state.name = "";
      state.description = "";
      state.type = "";
      state.participantsCount = 0;
      state.dayMonthly = 0;
      state.valueMonthly = 0;
      state.responsibleId = "";
      state.participants = [];
      state.payments = [];
      state.createDate = "";
      state.updateDate = "";
    },
  },
});

export const eventActions = slice.actions;
export const selectEvent = (state: AppState) => state.event;

export default slice.reducer;
