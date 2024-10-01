import { useState } from "react";
import { Link } from "react-router-dom";
import { InputMask } from "@react-input/mask";

import { TextInput } from "../components/TextInput";
import { HeaderAuth } from "../components/HeaderAuth";

import registerImage from "../assets/register-image.png";

export default function Register() {
  // Apenas pra demonstração
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <>
      <div className='w-1/3 h-full flex flex-col gap-6'>
        <HeaderAuth />

        <div className='flex flex-col gap-2'>
          <p className='text-3xl font-semibold'>Crie uma conta!</p>
          <span className='text-zinc-500 font-semibold text-sm'>
            Ja tem uma conta cadastrada?
            <Link
              to='/'
              className='font-semibold cursor-pointer transition-colors hover:text-skyBold hover:font-bold'
            >
              {" "}
              Faça login
            </Link>
          </span>
        </div>

        <form className='flex flex-col gap-2'>
          <TextInput label='Nome' />
          <TextInput label='Email' />
          <TextInput label='Senha' type='password' />
          <InputMask
            label='Telefone celular'
            value={phoneNumber}
            mask='(__) _____-____'
            replacement='_'
            onChange={(e) => setPhoneNumber(e.target.value)}
            component={TextInput}
          />
          <button className='flex items-center justify-center gap-2 px-4 py-4 w-full mt-3 bg-red-500 text-white font-semibold transition-colors hover:bg-red-600'>
            Criar Conta
          </button>
        </form>
      </div>
      <div className='w-2/5 h-full flex justify-center items-center'>
        <img
          src={registerImage}
          alt='Login image ilustration'
          className='w-[400px]'
        />
      </div>
    </>
  );
}
