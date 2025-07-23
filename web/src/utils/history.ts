import { StatusHistory } from "../enums/StatusHistory.enum";
import { TypeHistory } from "../enums/TypeHistory.enum";
import { DashBoardFilters } from "../interfaces/Dashboard.interface";

type FieldsType = {
  [key: string]: string | boolean;
};

export const typeTranslate: FieldsType = {
  [TypeHistory.SUBSCRIPTION]: "Mensalista",
  [TypeHistory.INVITED]: "Convidado",
  [TypeHistory.BALANCE_MONTH]: "Saldo do Mês",
  [TypeHistory.DONATION]: "Doação",
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

export const selectTypeHistory: { label: string; value: TypeHistory }[] = [
  { label: "Mensalista", value: TypeHistory.SUBSCRIPTION },
  { label: "Convidado", value: TypeHistory.INVITED },
  { label: "Saldo do Mês", value: TypeHistory.INVITED },
  { label: "Doação", value: TypeHistory.INVITED },
];

export const getQueryParams = (filtersSearch: DashBoardFilters) => {
  const queryParams: { [key: string]: string | number | boolean } = {
    ...filtersSearch,
  };

  Object.keys(queryParams).forEach((key: string | number) => {
    if (["", "all", "select"].includes(String(queryParams[key]))) {
      delete queryParams[key];
    }

    if (key === "month") {
      queryParams[key] = String(queryParams[key]).padStart(2, "0");
    }

    if (key === "status") {
      queryParams[key] = statusTranslate[String(queryParams[key])];
    }
  });

  return queryParams;
};
