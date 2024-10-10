import { useState } from "react";

import { OptionsNavBar } from "../enums/OptionsNavBar.enum";

import { NavBar } from "../components/Dashboard/NavBar";
import { MainDashboard } from "../components/Dashboard/Main";
import { Participants } from "../components/Dashboard/Participants";

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
      </div>
    </>
  );
}
