import { useState } from "react";

import { OptionsNavBar } from "../enums/OptionsNavBar.enum";

import { NavBar } from "../components/dashboard/NavBar";
import { MainDashboard } from "../components/dashboard/Main";
import { Participants } from "../components/dashboard/Participants";
import { Payments } from "../components/dashboard/Payments";

export default function Dashboard() {
  const [optionSelected, setOptionSelected] = useState<OptionsNavBar>(
    OptionsNavBar.DASHBOARD
  );

  return (
    <>
      <div className='h-full w-full flex gap-10 py-10'>
        <NavBar handleOption={setOptionSelected} />

        {optionSelected === OptionsNavBar.DASHBOARD && <MainDashboard />}

        {optionSelected === OptionsNavBar.PARTICIPANTS && <Participants />}

        {optionSelected === OptionsNavBar.PAYMENTS && <Payments />}
      </div>
    </>
  );
}
