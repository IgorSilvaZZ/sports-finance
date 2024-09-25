import { ArrowRight, SoccerBall } from "@phosphor-icons/react";

import loginImage from "../assets/login-image.png";

export const Login = () => {
  return (
    <>
      <div className='w-1/3 h-full flex flex-col gap-11'>
        <div className='flex items-center gap-4'>
          <SoccerBall size={38} />
          <p className='text-lg uppercase text-zinc-500 font-semibold'>
            Sports Finance
          </p>
        </div>

        <div className='flex flex-col gap-2'>
          <p className='text-2xl font-semibold'>Bem vindo de volta!</p>
          <span className='text-zinc-500 font-semibold text-sm'>
            Faça login em sua conta
          </span>
        </div>

        <form className='flex flex-col gap-7'>
          <div className='flex flex-col gap-2'>
            <span className='text-sm font-semibold'>Email</span>
            <input className='w-full px-4 py-4 outline-none bg-zinc-100 font-semibold' />
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-sm font-semibold'>Senha</span>
            <input
              type='password'
              className='w-full px-4 py-4 outline-none bg-zinc-100 font-semibold'
            />
          </div>
          <button className='flex items-center justify-center gap-2 px-4 py-4 w-full bg-red-500 text-white font-semibold transition-colors hover:bg-red-600'>
            Entrar
            <ArrowRight size={22} />
          </button>
        </form>
        <span className='mx-auto text-zinc-500'>
          Não possui um cadastro?{" "}
          <span className='font-semibold cursor-pointer transition-colors hover:text-skyBold hover:font-bold'>
            Crie a sua conta
          </span>
        </span>
      </div>
      <div className='w-2/4 h-full flex justify-center items-center'>
        <img
          src={loginImage}
          alt='Login image ilustration'
          className='w-[600px]'
        />
      </div>
    </>
  );
};
