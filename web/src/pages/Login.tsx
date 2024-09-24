import { SoccerBall } from "@phosphor-icons/react";

export const Login = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center gap-3'>
      <div className='h-3/4 w-3/4 p-5 border border-blue-500 flex flex-col gap-3'>
        <div className='flex items-center gap-4'>
          <SoccerBall size={38} />
          <p className='text-lg uppercase text-gray-500 font-semibold'>
            Sports Finance
          </p>
        </div>
        <p className='text-2xl font-semibold'>Bem vindo de volta!</p>
        <span>Faça login em sua conta</span>
      </div>
    </div>
  );
};
