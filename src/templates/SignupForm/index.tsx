import { Link } from "react-router-dom";
import Button from "../../components/Button";
import BaseForm from "../BaseForm";

export default function SignupForm(props: { register: any, control: any, handleFunction : Function }) {

    const { control, register, handleFunction } = props

    return (
        <BaseForm control={control} register={register} handleFunction={handleFunction}>
            <label className="font-semibold text-gray-900 mb-1">Nome completo: </label>
            <input type="text" {...register("nome")} className="w-full px-2 mb-4 rounded bg-gray-200 border-0 min-h-[40px]" />
            <label className="font-semibold text-gray-900 mb-1">E-mail: </label>
            <input type="text" {...register("email")} className="w-full px-2 mb-4 rounded bg-gray-200 border-0 min-h-[40px]" />
            <label className="font-semibold  text-gray-900 mb-1">Senha: </label>
            <input type="password" {...register("senha")} className="w-full mb-4 px-2 rounded bg-gray-200 border-0 min-h-[40px]" />

            <Button onClick={() => { }} text="Entrar" type={"submit"} className="block mt-6 mb-3 w-full" />

            <Link to={"/"} className="text-sm mx-auto mt-2 text-indigo-600 hover:text-blue-400 hover:underline">Já possui uma conta? Fazer login</Link>
        </BaseForm>
    )
}