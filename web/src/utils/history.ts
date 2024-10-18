import { TypeHistory } from "../enums/TypeHistory.enum";

type FieldsType = {
  [key: string]: string;
};

export const typeTranslate: FieldsType = {
  [TypeHistory.MONTHLY]: "Mensalista",
  [TypeHistory.AGGREGATE]: "Agregado",
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
