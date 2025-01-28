import { getFormatDate } from "../../../utils/date";
import { getMonthPaymentRef } from "../../../utils/payment";

export const getPaymentsColumns = () => [
  {
    field: "name",
    label: "Nome",
  },
  {
    field: "value",
    label: "Valor",
  },
  {
    field: "paymentRef",
    label: "Mês Referencia",
    renderRow: (value: string) => getMonthPaymentRef(value),
  },
  {
    field: "datePayment",
    label: "Data Pagamento",
    renderRow: (date: string) => getFormatDate(new Date(date), "dd/MM/yyyy"),
  },
];
