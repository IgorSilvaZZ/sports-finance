import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

export const getMonthPaymentRef = (paymentRef: string) => {
  const paymentRefParsed = parse(paymentRef, "yyyy-MM", new Date());

  const monthFull = format(paymentRefParsed, "MMMM", { locale: ptBR });

  return monthFull;
};
