import { useForm } from "react-hook-form";
import ClientForm from "../../templates/ClientForm";
import { postCliente } from "../../services/cliente";

export default function CriarCliente() {
    const { register, control, handleSubmit } = useForm()

    const handle = async (data: any) => {
        try {
            const resp = await postCliente(data);
            return resp;
        } catch (err: any) {
            throw err?.response?.data?.dados || "Erro desconhecido";
        }
    };

    return (
        <div className="h-full w-full">
            <ClientForm control={control} register={register} handleFunction={handleSubmit(handle)} />
        </div>
    )
}