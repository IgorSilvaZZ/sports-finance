export interface CreateParticipantDTO {
  name: string;
  email: string;
  password?: string;
  phoneNumber: string;
  avatar?: string;
  eventId?: string;
}
