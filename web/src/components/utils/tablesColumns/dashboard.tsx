import { Receipt, ReceiptX } from "@phosphor-icons/react";

import { History } from "../../../interfaces/History.interface";
import { StatusHistory } from "../../../enums/StatusHistory.enum";
import {
  getValueCurrencyFormatted,
  typeTranslate,
} from "../../../utils/history";
import { format } from "date-fns";

interface ColumnsHistoryProps {
  handleStatusHistory: (historyId: string, status: string) => void;
}

export const getColumnsHistory = (props: ColumnsHistoryProps) => [
  {
    field: "name",
    label: "Descrição",
  },
  {
    field: "name",
    label: "Participante",
  },
  {
    field: "status",
    label: "Status",
    renderValueFormatted: (value: unknown) => (value ? "Pago" : "Não pago"),
  },
  {
    field: "type",
    label: "Tipo",
    renderValueFormatted: (value: string) => String(typeTranslate[value]),
  },
  {
    field: "value",
    label: "Valor",
    renderValueFormatted: (value: string) =>
      getValueCurrencyFormatted(Number(value)),
  },
  {
    field: "createDate",
    label: "Data",
    renderValueFormatted: (value: string) =>
      format(new Date(value), "dd/MM/yyyy"),
  },
  historyActionsColumns(props),
];

const historyActionsColumns = ({
  handleStatusHistory,
}: ColumnsHistoryProps) => ({
  field: "actions",
  label: "Ações",
  renderRow: (rowValue: History) => {
    const actionsList = [];

    if (rowValue.status) {
      actionsList.push(
        <button
          title='Reverter Pagamento'
          className='text-red-600'
          onClick={() =>
            handleStatusHistory(rowValue.id, StatusHistory.NOT_PAID)
          }
        >
          <ReceiptX size={20} />
        </button>
      );
    } else {
      actionsList.push(
        <button
          title='Realizar Pagamento'
          className='text-green-600'
          onClick={() => handleStatusHistory(rowValue.id, StatusHistory.PAID)}
        >
          <Receipt size={20} />
        </button>
      );
    }

    return actionsList;
  },
});
