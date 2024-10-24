export interface DashBoardFilters {
  textParticipant: string;
  status: string;
  month: number;
  year: string;
  type: string;
}

export interface Dashboard {
  appliedFilters: DashBoardFilters;
  editingFilters: DashBoardFilters;
}
