import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import ConsultaForm from "../../templates/ConsultaForm";
import { useParams } from "react-router-dom";
import { getConsulta, postConsulta, updateConsulta } from "../../services/consulta";
import { toast } from "react-toastify";
import ClienteNaoEncontrado from "../Cliente/NaoEncontrado";
import { useToastRequest } from "../../hooks/useToastRequest";
import { formatDatetimeForInput, parsePreco, formatPreco, formatHorarioParaBackend } from "../../utils/formatacoes";
import Alert from "../../components/Alert";
import { getClienteSelect } from "../../services/cliente";
import { getUsuarioSelect } from "../../services/usuario";
import { status, pagamentos } from "../../utils/opcoesEstaticas";
import { format } from "date-fns"

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
    const [selecionadoPagamento, setSelecionadoPagamento] = useState<any | null>(null)
    const [selecionadoStatus, setSelecionadoStatus] = useState<any | null>(null)
    const [selecionadoDoutor, setSelecionadoDoutor] = useState<any | null>(null)
    const { id } = useParams()
    const { register, control, reset, handleSubmit, setValue } = useForm({
        defaultValues: {
            descricao: "",
            procedimento: "",
            tipo: "",
            preco: "",
            horario: format(new Date(), "yyyy-MM-dd"),
            dente_afetado: "",
            observacoes: "",
            pago: false,
            horario_marcado : false
        }
    })

    const hre = useWatch({control, name : "horario_marcado"})

    const getUsuarioData = async (dados: any) => {
        try {
            const resp = await getUsuarioSelect({ pesquisa: "" })
            setUsuarios(resp.data.dados)
            await getData(resp.data.dados, dados)
        } catch (error: any) {
            console.log(error)
        }
    }


    const getData = async (dataUsuarios: any, dataClientes: any) => {
        if (id && parseInt(id, 10)) {
            try {
                setGetLoading(true)
                const resp = await getConsulta(parseInt(id, 10))
                const consulta = resp.data.dados
                reset({
                    descricao: consulta.descricao,
                    tipo: consulta.tipo,
                    preco: formatPreco(consulta.preco),
                    horario: formatDatetimeForInput(consulta.horario),
                    dente_afetado: consulta.dente_afetado,
                    observacoes: consulta.observacoes,
                    pago: consulta.pago,
                    procedimento: consulta.procedimento
                })
                staticsOpt(dataUsuarios, dataClientes, consulta)
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

    const staticsOpt = (dataUsuarios: any[], dataClientes: any[], consulta: any) => {
        console.log(dataUsuarios, dataClientes)
        const statusCorrespondente = status.find(opt => opt.value === consulta.status)
        const clienteCorrespondente = dataClientes?.find(opt => opt.id == consulta.cliente_id)
        const forma_pagamentoCorrespondente = pagamentos.find(opt => opt.value == consulta.forma_pagamento)
        const doutorCorrespondente = dataUsuarios?.find(opt => opt.id == consulta.profissional_id)
        setSelecionadoStatus(statusCorrespondente)
        setSelecionado(clienteCorrespondente)
        setSelecionadoPagamento(forma_pagamentoCorrespondente)
        setSelecionadoDoutor(doutorCorrespondente)
    }

    const getClientes = async () => {
        try {
            setGetLoading(true)
            const resp = await getClienteSelect({ pesquisa: pesquisa })
            setClientes(resp.data.dados)
            await getUsuarioData(resp.data.dados)
        } catch (error: any) {
            console.log(error)
            toast.error(error.message == "Network Error" ? "Erro de conexão com o servidor" : "Erro Interno")
        } finally {
            setGetLoading(false)
        }
    }

    const handle = async (data: any) => {
        try {
            const precoTratado =
                typeof data.preco === "string" && data.preco.includes("R$")
                    ? parseFloat(parsePreco(data.preco).toFixed(2))
                    : parseFloat(Number(data.preco).toFixed(2));

            const sendData = {
                ...data,
                cliente_id: selecionado?.id ?? null,
                forma_pagamento: selecionadoPagamento?.value ?? null,
                status: selecionadoStatus?.value ?? null,
                profissional_id: selecionadoDoutor?.id ?? null,
                preco: precoTratado,
                horario : formatHorarioParaBackend(data.horario)
            };

            if (id && parseInt(id, 10)) {
                const resp = await updateConsulta({ ...sendData, id: id });
                setOptConcluida(true);
                return resp;

            } else {
                const resp = await postConsulta(sendData);
                setOptConcluida(true);
                return resp;
            }
        } catch (err: any) {
            throw err?.response?.data?.dados || "Erro desconhecido";
            // notifyErrors(err?.response?.data?.dados);
            // return;
        } finally {
            setLoading(false);
            setModalConfirmacao(false);
        }
    };


    const hd = () => {
        setLoading(true)
        notify()
    }

    const { notify } = useToastRequest(handleSubmit(handle), { pending: "salvando...", success: "Salvo!", error: "Erro" })

    useEffect(() => {
        getClientes()
    }, [])

    useEffect(( ) => {
        !hre ? setValue("horario", format(new Date(), "yyyy-MM-dd")) : setValue("horario", format(new Date(), "yyyy-MM-dd'T'HH:mm"))
    }, [hre])

    if (erroBusca) {
        return <ClienteNaoEncontrado elemento="Consulta" />
    }

    if (!clientes || !usuarios) {
        return <h2>Carregando</h2>
    }

    return (
        <>
            {getLoading && <div className="absolute top-0 h-full w-full z-20 bg-black/50 backdrop-blur-[8px] flex justify-center items-center"><h1>Carregando....</h1></div>}
            <ConsultaForm register={register} control={control} setState={setModalConfirmacao} clienteDados={clientes}
                usuarioDados={usuarios} setPesquisa={null} setSelecionado={setSelecionado} selecionado={selecionado}
                selecionadoPagamento={selecionadoPagamento} selecionadoStatus={selecionadoStatus}
                setSelecionadoPagamento={setSelecionadoPagamento} setSelecionadoStatus={setSelecionadoStatus}
                selecionadoDoutor={selecionadoDoutor} setSelecionadoDoutor={setSelecionadoDoutor} switchh={hre}
            />
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