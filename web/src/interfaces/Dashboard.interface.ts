export interface DashBoardFilters {
  textParticipant: string;
  status: string;
  month: number;
  year: string;
  type: string;
}

export interface Dashboard {
  filters: DashBoardFilters;
}
