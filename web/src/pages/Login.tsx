import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowRight } from "@phosphor-icons/react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { HeaderAuth } from "../components/HeaderAuth";
import { Button } from "../components/ui/Button";
import { TextInput } from "../components/ui/TextInput";

import { handleErrors } from "../utils/handleErrorsZod";

import { responsibleActions } from "../store/responsible/responsible.slice";

import { api } from "../lib/axios";

import loginImage from "../assets/login-image.png";

const loginResponsibleForm = z.object({
  email: z
    .string()
    .min(1, "O email é obrigatorio para prosseguir!")
    .email("Preencha o email corretamente para prosseguir!"),
  password: z.string().min(4, "A senha precisa conter no minimo 4 caracteres!"),
});

type LoginForm = z.infer<typeof loginResponsibleForm>;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginResponsibleForm),
  });

  async function handleLogin(data: LoginForm) {
    try {
      const { data: responseData } = await api.post(
        "/responsibles/login",
        data,
      );

      const responsibleAuth = {
        ...responseData.responsible,
        token: responseData.token,
      };

      api.defaults.headers.common.Authorization = `Bearer ${responsibleAuth.token}`;

      dispatch(responsibleActions.authenticate(responsibleAuth));

      toast.success("Login realizado com sucesso!");

      setTimeout(() => {
        navigate("/events");
      }, 2000);
    } catch (error) {
      console.log(error);

      toast.error("Ocorreu um erro ao tentar realizar login!");
    }
  }

  return (
    <>
      <div className="w-1/3 h-full flex flex-col gap-11">
        <HeaderAuth />

        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Bem vindo de volta!</p>
          <span className="text-zinc-500 font-semibold text-sm">
            Faça login em sua conta
          </span>
        </div>

        <form
          className="flex flex-col gap-7"
          onSubmit={handleSubmit(handleLogin, handleErrors)}
        >
          <TextInput label="Email" {...register("email")} />
          <TextInput
            label="Senha"
            type="password"
            className="w-full px-4 py-4 outline-none bg-zinc-100 font-semibold"
            {...register("password")}
          />
          <Button>
            {isSubmitting ? (
              <ClipLoader color="white" size={20} />
            ) : (
              <>
                <ArrowRight size={22} />
                Entrar
              </>
            )}
          </Button>
        </form>
        <span className="mx-auto text-zinc-500">
          Não possui um cadastro?{" "}
          <Link
            to="/register"
            className="font-semibold cursor-pointer transition-colors hover:text-skyBold hover:font-bold"
          >
            Crie a sua conta
          </Link>
        </span>
      </div>
      <div className="w-2/4 h-full flex justify-center items-center">
        <img
          src={loginImage}
          alt="Login image ilustration"
          className="w-[600px]"
        />
      </div>
    </>
  );
}
