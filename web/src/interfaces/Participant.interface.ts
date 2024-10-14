export interface Participant {
  id: string;
  name: string;
  email: string | null;
  phoneNumber: string;
  avatar: string;
  eventId: string;
  createDate: string;
  updateDate: string;
}
