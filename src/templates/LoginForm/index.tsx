import { toast } from "react-toastify";
import Button from "../../components/Button";
import BaseForm from "../BaseForm";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

export default function LoginForm(props: { register: any, control: any, handleFunction: Function }) {

    const { control, register, handleFunction } = props

    const delayPost = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        return handleFunction(); 
    };

    const notify = () => toast.promise(
        delayPost,
        {
            pending: "Fazendo login...",
            success: "Login realizado com sucesso!",
            error: "Erro ao fazer login.",
        },{
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
    );

    const notifyDebounce = useDebounce(notify, 150)

    return (

        <BaseForm control={control} register={register} handleFunction={notifyDebounce}>

            <label className="font-semibold text-gray-900 mb-1">E-mail: </label>
            <input type="text" {...register("email")} className="pl-2 mb-4 rounded bg-gray-200 border-0 min-h-[40px]" />
            <label className="font-semibold text-gray-900 mb-1">Senha: </label>
            <input type="password" {...register("senha")} className="px-2 w-full mb-4 rounded bg-gray-200 border-0 min-h-[40px]" />

            <div className="flex justify-between mb-2 mt-2">
                <input
                    type="checkbox"
                    id="remember-me"
                    className="h-4 w-4 mr-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className=" text-sm text-gray-700">
                    Lembrar de mim{' '}
                </label>

                <Link to={"/"} className="text-sm ml-auto text-indigo-600 hover:text-blue-400 hover:underline">Esqueceu a senha?</Link>

            </div>

            <Button onClick={() => {}} text="Entrar" type={"submit"} className="block mt-6 mb-3 w-full hover:cursor-pointer" />

            <Link to={"/cadastro"} className="text-sm mx-auto mt-2 text-indigo-600 hover:text-blue-400 hover:underline">Cadastrar uma conta</Link>

        </BaseForm>

    )
}