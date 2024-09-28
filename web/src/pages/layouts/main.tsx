import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <>
      <div className='h-screen w-screen'>
        <main className='w-full px-12 h-full'>
          <Outlet />
        </main>
      </div>
    </>
  );
}
