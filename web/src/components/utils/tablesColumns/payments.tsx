import { getFormatDate } from "../../../utils/date";
import { getValueCurrencyFormatted } from "../../../utils/history";
import { getMonthPaymentRef } from "../../../utils/payment";
import { capitalizeFirstLetter } from "../../../utils/string";

export const getPaymentsColumns = () => [
  {
    field: "name",
    label: "Nome",
  },
  {
    field: "value",
    label: "Valor",
    renderRow: (value: string) => (
      <>{getValueCurrencyFormatted(Number(value))}</>
    ),
  },
  {
    field: "paymentRef",
    label: "Mês Referencia",
    renderRow: (value: string) =>
      capitalizeFirstLetter(getMonthPaymentRef(value)),
  },
  {
    field: "datePayment",
    label: "Data Pagamento",
    renderRow: (date: string) => getFormatDate(new Date(date), "dd/MM/yyyy"),
  },
];
