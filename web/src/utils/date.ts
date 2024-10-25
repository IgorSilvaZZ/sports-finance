import { format } from "date-fns";

export const getFormatDate = (
  dateValue: Date,
  formatDate: string,
  isContainTime = false
) => {
  const timeFormat = isContainTime ? "HH:mm" : "";

  const dateFormatted = format(
    new Date(dateValue),
    `${formatDate} ${timeFormat}`
  );

  return dateFormatted;
};
