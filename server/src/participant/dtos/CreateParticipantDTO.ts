export interface CreateParticipantDTO {
  name: string;
  email?: string;
  phoneNumber: string;
  avatar?: string;
  eventId: string;
}
