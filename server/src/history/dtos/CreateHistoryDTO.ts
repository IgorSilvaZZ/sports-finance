export interface CreateHistoryDTO {
  name?: string;
  value: number;
  type: string;
  participantId: string;
  eventId: string;
  createDate?: string | Date;
}
