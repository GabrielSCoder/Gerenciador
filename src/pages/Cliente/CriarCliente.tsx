import { useForm } from "react-hook-form";
import ClientForm from "../../templates/ClientForm";
import { getCliente, postCliente } from "../../services/cliente";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CriarCliente() {

    const { register, control, handleSubmit, reset } = useForm({defaultValues : {
        nome : "",
        endereco : "",
        telefone : "",
        telefone2 : null,
        telefone_adicional : false,
        indentificacao : "",
        numero : ""
    }})

    const {id} = useParams()
    const [loading, setLoading] = useState(true)

    const handle = async (data: any) => {
        try {
            const resp = await postCliente(data);
            return resp;
        } catch (err: any) {
            throw err?.response?.data?.dados || "Erro desconhecido";
        }
    };

    const getData = async ( ) => {
        if (id) {
            const resp = await getCliente(parseInt(id, 10))
            if (resp.data.success) {
                const cliente = resp.data.dados;

                reset({
                    nome: cliente.nome || "",
                    endereco: cliente.endereco || "",
                    telefone: cliente.telefone || "",
                    telefone2: cliente.telefone2 || "",
                    indentificacao: cliente.indentificacao || "",
                    numero: cliente.numero || "",
                    telefone_adicional : cliente.telefone2 ? true : false
                });

            }
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="h-full w-full">
            <ClientForm control={control} register={register} handleFunction={handleSubmit(handle)} />
        </div>
    )
}