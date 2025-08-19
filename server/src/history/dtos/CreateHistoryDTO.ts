import { TypeHistory } from '../enums/typeHistory.enum';

export interface CreateHistoryDTO {
  name?: string;
  value: number;
  type: TypeHistory;
  participantId: string;
  eventId: string;
  createDate?: string | Date;
}
