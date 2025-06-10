import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ConsultaForm from "../../templates/ConsultaForm";
import { useParams } from "react-router-dom";
import { getConsulta, postConsulta, updateConsulta } from "../../services/consulta";
import LoadingPage from "../../components/LoadingPage";
import { toast } from "react-toastify";
import ClienteNaoEncontrado from "../Cliente/NaoEncontrado";
import { notifyErrors, useToastRequest, useToastRequest3 } from "../../hooks/useToastRequest";
import { formatToISO } from "../../utils/formatacoes";
import Alert from "../../components/Alert";
import { getClienteSelect } from "../../services/cliente";
import { getUsuarioSelect } from "../../services/usuario";

export default function CriarConsulta() {
    const [loading, setLoading] = useState(true)
    const [modalConfirmacao, setModalConfirmacao] = useState(false)
    const [optConcluida, setOptConcluida] = useState(false)
    const [getLoading, setGetLoading] = useState(false)
    const [cadastroLimpo, setCadastroLimpo] = useState({ limpo: true, nome: null })
    const [erroBusca, setErroBusca] = useState(false)
    const [pesquisa, setPesquisa] = useState("")
    const [clientes, setClientes] = useState<any[] | null>(null)
    const [usuarios, setUsuarios] = useState<any[] | null>(null)
    const [selecionado, setSelecionado] = useState<any | null>(null)
    const { id } = useParams()
    const { register, control, reset, handleSubmit } = useForm({
        defaultValues: {
            descricao: "",
            procedimento: "",
            tipo: "",
            preco: null,
            horario: "",
            cliente_id: null,
            profissional_id: null,
            status: null,
            dente_afetado: "",
            forma_pagamento: null,
            observacoes: "",
            pago: false
        }
    })

    
    const getUsuarioData = async () => {
        const resp = await getUsuarioSelect({pesquisa : ""})
        if (resp.data.success) {
            setUsuarios(resp.data.dados)
        }
    }


    const getData = async () => {
        if (id && parseInt(id, 10)) {
            try {
                setGetLoading(true)
                const resp = await getConsulta(parseInt(id, 10))
                const consulta = resp.data.dados
                reset({
                    cliente_id: consulta.cliente_id,
                    descricao: consulta.descricao,
                    tipo: consulta.tipo,
                    preco: consulta.preco,
                    horario: consulta.horario,
                    dente_afetado: consulta.dente_afetado,
                    profissional_id: consulta.profissional_id,
                    status: consulta.status,
                    forma_pagamento: consulta.forma_pagamento,
                    observacoes: consulta.observacoes,
                    pago: consulta.pago,
                    procedimento: consulta.procedimento
                })
            } catch (error: any) {
                toast.error(error.message == "Network Error" ? "Erro de conexão com o servidor" : "Erro Interno")
                if (error.response.data.dados == "Não encontrado")
                    setErroBusca(true)
            } finally {
                setLoading(false)
                setGetLoading(false)
            }
        }
        setLoading(false)
    }

    const getClientes = async () => {
        try {
            setGetLoading(true)
            const resp = await getClienteSelect({pesquisa : pesquisa})
            setClientes(resp.data.dados)
            setSelecionado(resp.data.dados[0])
        } catch (error : any) {
            console.log(error)
            toast.error(error.message == "Network Error" ? "Erro de conexão com o servidor" : "Erro Interno")
        } finally {
            setGetLoading(false)
        }
    }

    const handle = async (data: any) => {
        try {
            if (id && parseInt(id, 10)) {
                const resp = await updateConsulta({ ...data, id: id, data_nascimento: formatToISO(data.data_nascimento) });
                setOptConcluida(true)
                return resp;
            } else {
                const resp = await postConsulta({ ...data });
                setOptConcluida(true)
                return resp;
            }
        } catch (err: any) {
            throw err?.response?.data?.dados || "Erro desconhecido";
            notifyErrors(err?.response?.data?.dados)
            return
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

    useEffect(() => {
        getData()
        getClientes()
        getUsuarioData()
    }, [])


    if (erroBusca) {
        return <ClienteNaoEncontrado elemento="Consulta" />
    }

    if (!clientes || !usuarios || !selecionado) {
        return <h2>Carregando</h2>
    }

    return (
        <>
            {getLoading && <div className="absolute top-0 h-full w-full z-20 bg-black/50 backdrop-blur-[8px] flex justify-center items-center"><h1>Carregando....</h1></div>}
            <ConsultaForm register={register} control={control} setState={setModalConfirmacao} clienteDados={clientes}
             usuarioDados={usuarios} setPesquisa={null} setSelecionado={setSelecionado} selecionado={selecionado}/>
            <Alert
                texto={!cadastroLimpo.limpo ? `As informações do cliente ${cadastroLimpo.nome} serão atualizadas` : "Deseja salvar?"}
                setState={setModalConfirmacao}
                titulo={cadastroLimpo.limpo ? "Deseja salvar?" : "Deseja modificar?"}
                typeBtn={"delete"}
                handle={hd}
                pending={loading}
                openState={modalConfirmacao}
                cancelarBtn="Cancelar"
                confirmarBtn="Concluir"
            />
        </>
    )
}