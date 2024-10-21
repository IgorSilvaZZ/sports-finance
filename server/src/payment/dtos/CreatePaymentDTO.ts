export interface CreatePaymentDTO {
  name?: string;
  value: number;
  eventId: string;
  status?: boolean;
  paymentRef: string;
  datePayment: string;
}
