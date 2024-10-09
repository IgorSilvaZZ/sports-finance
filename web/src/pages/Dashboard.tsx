import { NavBar } from "../components/Dashboard/NavBar";
import { MainDashboard } from "../components/Dashboard";
import { Participants } from "../components/Dashboard/Participants";

export default function Dashboard() {
  return (
    <>
      <div className='h-full w-full flex gap-10 py-10'>
        <NavBar />

        {/*  <MainDashboard /> */}

        <Participants />
      </div>
    </>
  );
}
