import { useForm } from "react-hook-form";
import ClientForm from "../../templates/ClientForm";
import { getCliente, postCliente, updateCliente, } from "../../services/cliente";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Alert from "../../components/Alert";
import { useToastRequest } from "../../hooks/useToastRequest";
import ClienteNaoEncontrado from "./NaoEncontrado";
import ClienteConcluido from "./Concluido";
import { convertSimpleDate, formatToISO } from "../../utils/formatacoes";

export default function CriarCliente() {

    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            nome: "",
            endereco: "",
            telefone: "",
            telefone2: null,
            telefone_adicional: false,
            indentificacao: "",
            numero: "",
            data_nascimento : ""
        }
    })

    const { id } = useParams()
    const [getLoading, setGetLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalConfirmacao, setModalConfirmacao] = useState(false)
    const [cadastroLimpo, setCadastroLimpo] = useState({ limpo: true, nome: null })
    const [erroBusca, setErroBusca] = useState(false)
    const [optConcluida, setOptConcluida] = useState(false)

    const handle = async (data: any) => {
        try {
            if (id && parseInt(id, 10)) {
                const resp = await updateCliente({ ...data, id: id, data_nascimento: formatToISO(data.data_nascimento)});
                setOptConcluida(true)
                return resp;
            } else {
                const resp = await postCliente({ ...data });
                setOptConcluida(true)
                return resp;
            }
        } catch (err: any) {
            throw err?.response?.data?.dados || "Erro desconhecido";
        } finally {
            setLoading(false)
            setModalConfirmacao(false)
        }
    };

    const hd = () => {
        setLoading(true)
        notify()
    }

    const { notify } = useToastRequest(handleSubmit(handle), { pending: "salvando...", success: "Salvo!", error: "Erro" })

    const getData = async () => {
        if (id && parseInt(id, 10)) {
            try {
                setGetLoading(true)
                const resp = await getCliente(parseInt(id, 10))

                const cliente = resp.data.dados;

                reset({
                    nome: cliente.nome || "",
                    endereco: cliente.endereco || "",
                    telefone: cliente.telefone || "",
                    telefone2: cliente.telefone2 || "",
                    indentificacao: cliente.indentificacao || "",
                    numero: cliente.numero || "",
                    telefone_adicional: cliente.telefone2 ? true : false,
                    data_nascimento: convertSimpleDate(cliente.data_nascimento)
                });
                setCadastroLimpo({ limpo: false, nome: cliente.nome })
            } catch (error: any) {
                toast.error(error.message == "Network Error" ? "Erro de conexão com o servidor" : "Erro Interno")
                if (error.response.data.dados == "Não encontrado")
                    setErroBusca(true)
            } finally {
                setGetLoading(false)
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])

    if (erroBusca) {
        return <ClienteNaoEncontrado elemento="Cliente" />
    }

    if (optConcluida) {
        return <ClienteConcluido />
    }

    return (
        <div className="relative h-full w-full">
            {getLoading && <div className="absolute top-0 h-full w-full z-20 bg-black/50 backdrop-blur-[8px] flex justify-center items-center"><h1>Carregando....</h1></div>}
            <ClientForm
                control={control}
                register={register}
                handleFunction={handleSubmit(handle)}
                loading={loading}
                setState={setModalConfirmacao} />
            <Alert
                texto={!cadastroLimpo.limpo ? `As informações do cliente ${cadastroLimpo.nome} serão atualizadas` : "Deseja salvar?"}
                setState={setModalConfirmacao}
                titulo={cadastroLimpo.limpo ? "Deseja salvar?" : "Deseja modificar?"}
                typeBtn={"confirm"}
                handle={hd}
                pending={loading}
                openState={modalConfirmacao}
                cancelarBtn="Cancelar"
                confirmarBtn="Concluir"
            />
        </div>
    )
}