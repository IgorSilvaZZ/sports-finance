import { Payment } from "../interfaces/Payment.interface";

export const getCurrentStatusEvent = (
  year: string,
  month: string,
  paymentsEvent: Payment[]
) => {
  const paymentRefSearch = `${year}-${month}`;

  const payment = paymentsEvent.find(
    (item) => item.paymentRef === paymentRefSearch
  );

  return payment;
};
