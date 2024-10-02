import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { TextInput } from "../components/ui/TextInput";
import { HeaderAuth } from "../components/HeaderAuth";

import { api } from "../lib/axios";

import registerImage from "../assets/register-image.png";

const registerResponsibleForm = z.object({
  name: z.string().min(3, "O nome precisa ter no mínimo 3 caracteres!"),
  email: z
    .string()
    .min(1, "O email é obrigatorio para prosseguir!")
    .email("Preencha o email corretamente para prosseguir!"),
  password: z.string().min(4, "A senha precisa conter no minimo 4 caracteres!"),
  phoneNumber: z.optional(z.string()),
});

type RegisterForm = z.infer<typeof registerResponsibleForm>;

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerResponsibleForm),
  });

  async function handleRegister(data: RegisterForm) {
    try {
      await api.post("/responsibles", data);

      toast.success("Responsável criado com sucesso");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error("Ocorreu um erro ao criar um novo responsável!");
    }
  }

  const handleErrors = () => {
    const firstError = Object.values(errors)[0];

    if (firstError?.message) {
      toast.error(firstError.message, { duration: 1500 });
    }
  };

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

        <form
          className='flex flex-col gap-2'
          onSubmit={handleSubmit(handleRegister, handleErrors)}
        >
          <TextInput label='Nome' {...register("name")} />
          <TextInput label='Email' {...register("email")} />
          <TextInput label='Senha' type='password' {...register("password")} />
          <InputMask
            label='Telefone celular'
            mask='(__) _____-____'
            replacement='_'
            component={TextInput}
            {...register("phoneNumber")}
          />
          <button
            className='
              flex 
              items-center 
              justify-center 
              gap-2 
              px-4 
              py-4 
              w-full 
              mt-3 
              bg-red-500 
              text-white 
              font-semibold 
              transition-colors 
              hover:bg-red-600
              disabled:bg-zinc-100
            '
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ClipLoader color='white' size={20} />
            ) : (
              "Criar Conta"
            )}
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
