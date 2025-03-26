import { OptionsNavBar } from "../enums/OptionsNavBar.enum";

interface ItemNavBarOption {
  name: string;
  value: OptionsNavBar;
}

export const getNavBarOptions = (): ItemNavBarOption[] => [
  { name: "Inicio", value: OptionsNavBar.DASHBOARD },
  { name: "Participantes", value: OptionsNavBar.PARTICIPANTS },
  { name: "Pagamentos", value: OptionsNavBar.PAYMENTS },
  { name: "Editar evento", value: OptionsNavBar.EDIT_EVENT },
];
