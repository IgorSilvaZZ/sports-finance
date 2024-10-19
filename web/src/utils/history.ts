import { StatusHistory } from "../enums/StatusHistory.enum";
import { TypeHistory } from "../enums/TypeHistory.enum";

type FieldsType = {
  [key: string]: string | boolean;
};

export const typeTranslate: FieldsType = {
  [TypeHistory.MONTHLY]: "Mensalista",
  [TypeHistory.AGGREGATE]: "Agregado",
};

export const statusTranslate: FieldsType = {
  [StatusHistory.PAID]: true,
  [StatusHistory.NOT_PAID]: false,
};

export const getValueCurrencyFormatted = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export const getYears = () => {
  const years = [];
  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= 2023; year--) {
    years.push(year);
  }

  return years;
};

export const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
