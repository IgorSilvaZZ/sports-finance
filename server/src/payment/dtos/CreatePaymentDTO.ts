export interface CreatePaymentDTO {
  name?: string;
  value: number;
  eventId: string;
  status?: boolean;
  datePayment: string;
}
