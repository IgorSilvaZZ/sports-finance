import { Payment } from "../interfaces/Payment.interface";

export const getCurrentStatusEvent = (
  year: string,
  month: string,
  paymentsEvent: Payment[]
) => {
  const monthSearch = Number(month);

  const paymentRefSearch = `${year}-${monthSearch}`;

  const payment = paymentsEvent.find(
    (item) => item.status && item.paymentRef === paymentRefSearch
  );

  return payment;
};
