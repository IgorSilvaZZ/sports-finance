import { TypeHistory } from '../enums/typeHistory.enum';

export interface FilterHistoryDTO {
  eventId: string;
  textParticipant?: string;
  status?: boolean | string;
  month?: string;
  type?: TypeHistory;
  year?: string;
}
