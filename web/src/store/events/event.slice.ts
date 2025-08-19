import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Payment } from "../../interfaces/Payment.interface";
import { Participant } from "../../interfaces/Participant.interface";
import { Event } from "../../interfaces/Event.interface";

import { AppState } from "..";

const initialState: Event = {
  id: "",
  name: "",
  description: "",
  type: "other",
  dayMonthly: 0,
  valueMonthly: 0,
  responsibleId: "",
  participants: [],
  payments: [],
  participantsCount: 0,
  participantsActiveCount: 0,
  participantsMonthlyCount: 0,
  participantsAggregateCount: 0,
  paymentsCount: 0,
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
      state.participantsCount = payload.participantsCount;
      state.participantsActiveCount = payload.participantsActiveCount;
      state.participantsMonthlyCount = payload.participantsMonthlyCount;
      state.participantsAggregateCount = payload.participantsAggregateCount;
      state.paymentsCount = payload.paymentsCount;
      state.payments = payload.payments;
      state.createDate = payload.createDate;
      state.updateDate = payload.updateDate;
    },
    setPayments(state, { payload }: PayloadAction<Payment[]>) {
      state.payments = payload;
    },
    setParticipants(state, { payload }: PayloadAction<Participant[]>) {
      state.participants = payload;
    },
    clear(state) {
      state.id = "";
      state.name = "";
      state.description = "";
      state.type = "other";
      state.dayMonthly = 0;
      state.valueMonthly = 0;
      state.responsibleId = "";
      state.participants = [];
      state.payments = [];
      state.participantsCount = 0;
      state.participantsActiveCount = 0;
      state.participantsMonthlyCount = 0;
      state.participantsAggregateCount = 0;
      state.paymentsCount = 0;
      state.createDate = "";
      state.updateDate = "";
    },
  },
});

export const eventActions = slice.actions;
export const selectEvent = (state: AppState) => state.event;

export default slice.reducer;
