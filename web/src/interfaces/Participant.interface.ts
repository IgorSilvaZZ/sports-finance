export interface Participant {
  id: string;
  name: string;
  email: string | null;
  phoneNumber: string;
  avatar: string;
  eventId: string;
  status: boolean;
  createDate: string;
  updateDate: string;
}
