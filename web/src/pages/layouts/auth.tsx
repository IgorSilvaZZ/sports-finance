import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <>
      <div className='h-screen w-screen flex justify-center items-center'>
        <div className='h-4/5 w-3/4 flex justify-around py-3 items-center leading-tight shadow-lg'>
          <Outlet />
        </div>
      </div>
    </>
  );
};
