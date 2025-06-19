import { useEffect, useState } from "react";
import { deleteCliente, getClientePagination, getClienteSelect } from "../../services/cliente";
import Filtros from "../../templates/Filtros";
import { useForm, useWatch } from "react-hook-form";
import useDebounce from "../../hooks/useDebounce";
import { dateTimeStampToDate, dateTimeStampToHour, formatarPreco, formatToISO2, getTodayFormatted } from "../../utils/formatacoes";
import { getUsuarioSelect } from "../../services/usuario";
import FiltroRodape from "../../templates/Filtros/FiltroRodape";
import usePaginacao from "../../hooks/usePaginacao";
import { SlOptionsVertical } from "react-icons/sl";
import { DropdownMenuCmpntConsulta } from "../../components/DropdownMenuCmpnt";
import { useNavigate } from "react-router-dom";
import { useToastRequest } from "../../hooks/useToastRequest";
import FiltroConsulta from "../../templates/Filtros/FiltroConsulta";
import { getConsultaPagination } from "../../services/consulta";
import classNames from "classnames";


export default function ListaConsulta() {

    const { avancar, paginaAtual, retroceder, paginaSetter, setTotalPaginas, totalPaginas, setTotalRegistros, totalRegistros } = usePaginacao()
    const nav = useNavigate()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any[] | null>(null)
    const [clienteData, setClienteData] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [users, setUsers] = useState(null)
    const [src, setSrc] = useState("")
    const [tamanhoPagina, setTamanhoPagina] = useState<number>(10)
    const [selecionado, setSelecionado] = useState<any | null>(null)
    const [filtroVisivel, setFiltroVisivel] = useState(true)
    const { control, register, formState, setValue, reset } = useForm({
        defaultValues: {
            pesquisa: "",
            data: "",
            fdata: "",
            horario: "",
            fhorario: "",
            usuario: null,
            profissional: null,
            ordem: "DESC",
            mod: "data_criacao"
        }
    })


    const search = useWatch({ control, name: "pesquisa" })
    const initDate = useWatch({ control, name: "data" })
    const finalDate = useWatch({ control, name: "fdata" })
    const initHDate = useWatch({ control, name: "horario" })
    const finalHDate = useWatch({ control, name: "fhorario" })
    const usuarioId = useWatch({ control, name: "usuario" })
    const profissionalId = useWatch({ control, name: "profissional" })
    const orda = useWatch({ control, name: "ordem" })
    const mod = useWatch({ control, name: "mod" })


    const getData = async () => {

        const dti = initDate ? new Date(initDate) : null
        const dtf = finalDate ? new Date(finalDate + "T23:59:59") : null
        const dthi = initHDate ? new Date(initHDate) : null
        const dthf = finalHDate ? finalHDate : null

        const dt = await getConsultaPagination({
            pesquisa: src, numeroPagina: Number(paginaAtual), tamanhoPagina: Number(tamanhoPagina), dataCadastroInicio: dti, dataCadastroFim: dtf,
            criador: usuarioId ? parseInt(usuarioId, 10) : null, ordem: orda, modificador: mod,
            profissional: profissionalId ? parseInt(profissionalId, 10) : null, cliente: selecionado?.id ?? null,
            horarioInicio: dthi, horarioFim: dthf
        })

        if (dt.data.success) {
            setData(dt.data.dados.listaConsultas)
            paginaSetter(dt.data.dados.numeroPagina <= dt.data.dados.numeroPaginas ? dt.data.dados.numeroPagina : paginaAtual)
            setTotalPaginas(dt.data.dados.numeroPaginas)
            setTotalRegistros(dt.data.dados.quantidade)
            if (dt.data.dados.quantidade > 1 && dt.data.dados.pagina > dt.data.dados.quantidade) paginaSetter(dt.data.dados.quantidade)
        }
    }

    const firstData = async () => {
        await getData()
        setLoading(false)
    }

    const getUsers = async () => {
        const dt = await getUsuarioSelect({ pesquisa: "" })
        if (dt.data.success) {
            setUsers(dt.data.dados)
        }
    }

    const getClientes = async () => {
        try {
            const resp = await getClienteSelect({ pesquisa: "" })
            setClienteData(resp.data.dados)
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteCliente(id)
            await getData()
        } catch (error: any) {
            throw error.response.data.dados
        } finally {
            setDeleting(false)
            setDeleteModal(false)
        }
    }

    const resetFiltros = () => {
        reset()
        setSelecionado(null)
    }

    // const notify = (id: number) => {
    //     toast.promise(handleDelete(id), {
    //         pending: 'Deletando...',
    //         success: 'Cliente deletado com sucesso!',
    //         error: {
    //         render({ data }) {
    //           const err = data as any;
    //           return typeof err === "string" ? err : err.message || "Erro inesperado";
    //         }
    //       }
    //     })
    // }

    const { notify } = useToastRequest(handleDelete, {
        pending: 'Deletando...',
        success: 'Cliente deletado com sucesso!',
        error: 'Erro ao deletar cliente'
    });

    const hd = (id: number) => {
        setDeleting(true)
        notify(id)
    }



    const handleDebounce = useDebounce(() => setSrc(search), 500)
    // const debouncedNotify = useDebouncedCallback(notify, 100)

    useEffect(() => {
        firstData()
    }, [])

    useEffect(() => {
        handleDebounce()
    }, [search])

    useEffect(() => {
        if (!loading)
            paginaSetter(1)
        getData()
    }, [src, initDate, finalDate, usuarioId, tamanhoPagina, orda, mod, profissionalId, selecionado, initDate, finalDate, initHDate, finalHDate])


    useEffect(() => {
        getData()
    }, [paginaAtual])

    useEffect(() => {
        getUsers()
        getClientes()
    }, [])

    if (!data || !users || !clienteData) {
        return (
            <div className="">
                <h2 className="text-black">Carregando</h2>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 max-h-full">
            {filtroVisivel ? (
                <FiltroConsulta control={control} register={register} usuarios={users} formState={formState}
                    setValue={setValue} selecionado={selecionado} setSelecionado={setSelecionado} clienteDados={clienteData}
                    pesquisa={undefined} setPesquisa={undefined} />
            ) : (<div className="bg-gray-200 h-[50px] rounded-md shadow-sm"></div>)}

            <div className="bg-white flex justify-between gap-4 p-2 rounded-md shadow-sm">
                <button
                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-200 transition hover:cursor-pointer"
                    onClick={() => setFiltroVisivel(!filtroVisivel)}
                >
                    {filtroVisivel ? "Esconder filtros" : "Mostrar filtros"}
                </button>
                <div className="flex justify-between gap-4">
                    <button
                        className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-medium shadow hover:bg-yellow-200 transition hover:cursor-pointer"
                        onClick={() => resetFiltros()}
                    >
                        Resetar Filtro
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium shadow hover:bg-green-600 transition hover:cursor-pointer"
                        onClick={() => nav("/consulta")}
                    >
                        Adicionar Consulta
                    </button>
                </div>
            </div>
            <div className={classNames("overflow-x-auto bg-white rounded-md shadow-md p-4 px-10", filtroVisivel ? "h-[487px]" : "h-[632px]")}>
                {!loading ? (
                    <table className="table-fixed w-full text-sm text-left border-collapse h-full">
                        <thead className="text-black border-b">
                            <tr>
                                <th className="min-w-[150px] px-2 py-3">Cliente</th>
                                <th className="min-w-[120px] px-2 py-3">Profissional</th>
                                <th className="min-w-[130px] px-2 py-3">Horário</th>
                                <th className="min-w-[110px] px-2 py-3">Status</th>
                                <th className="min-w-[120px] px-2 py-3">Preço</th>
                                <th className="min-w-[130px] px-2 py-3">Forma Pagamento</th>
                                <th className="min-w-[160px] px-2 py-3">Cadastro</th>
                                <th className="min-w-[180px] px-2 py-3">Última Modificação</th>
                                <th className="w-16 px-2 py-3">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((value: any, index: number) => (
                                <tr
                                    key={index}
                                    className="border-b border-slate-300 hover:bg-gray-100"
                                >
                                    <td className="px-2 py-2 text-black font-medium text-base">
                                        {value.cliente?.nome}
                                    </td>
                                    <td className="px-2 py-2 text-gray-600">
                                        {value.profissional?.nome}
                                    </td>
                                    <td className="px-2 py-2 text-gray-600">
                                        {dateTimeStampToDate(value.horario)}
                                        {dateTimeStampToHour(value.horario) !== "00:00" && (
                                            <> - {dateTimeStampToHour(value.horario)}</>
                                        )}
                                    </td>
                                    <td className="px-2 py-2">
                                        <span
                                            className={classNames(
                                                "px-2 py-1 rounded-full text-xs font-semibold border",
                                                {
                                                    "text-green-700 border-green-300 bg-green-100": value.status === "concluida",
                                                    "text-yellow-800 border-yellow-300 bg-yellow-100": value.status === "marcada",
                                                    "text-red-700 border-red-300 bg-red-100": value.status === "cancelada",
                                                    "text-gray-700 border-gray-300 bg-gray-100": !["concluida", "marcada", "cancelada"].includes(value.status),
                                                }
                                            )}
                                        >
                                            {value.status}
                                        </span>
                                    </td>
                                    <td className="px-2 py-2 text-gray-600">{formatarPreco(value.preco)}</td>
                                    <td className="px-2 py-2 text-gray-600">
                                        {value.forma_pagamento}
                                    </td>
                                    <td className="px-2 py-2 text-gray-600 text-sm break-words leading-snug">
                                        <div className="whitespace-normal">
                                            {value.usuario_criador?.nome ?? "Desconhecido"} -{" "}
                                            {dateTimeStampToDate(value.data_criacao)} -{" "}
                                            {dateTimeStampToHour(value.data_criacao)}
                                        </div>
                                    </td>

                                    <td className="px-2 py-2 text-gray-600 text-sm break-words leading-snug">
                                        {value.data_modificacao ? (
                                            <div className="whitespace-normal">
                                                {value.usuario_modificador?.nome ?? ""} -{" "}
                                                {dateTimeStampToDate(value.data_modificacao)} -{" "}
                                                {dateTimeStampToHour(value.data_modificacao)}
                                            </div>
                                        ) : (
                                            <span className="whitespace-normal">Nenhuma</span>
                                        )}
                                    </td>

                                    <td className="px-2 py-2 cursor-pointer hover:underline text-center">
                                        <DropdownMenuCmpntConsulta
                                            key={index}
                                            data={value}
                                            nav={nav}
                                            setDeleteModal={setDeleteModal}
                                            deleteModal={deleteModal}
                                            handleFunc={hd}
                                            pending={deleting}
                                        >
                                            <SlOptionsVertical
                                                size={20}
                                                className="w-full text-black hover:text-blue-500"
                                            />
                                        </DropdownMenuCmpntConsulta>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex items-center justify-center h-full ">
                        <h2 className="text-black">Carregando</h2>
                    </div>
                )}
            </div>
            <div>
                <FiltroRodape paginaAtual={paginaAtual} quantidadePaginas={totalPaginas} quantidadeRegistros={totalRegistros}
                    quantidadePorPaginas={tamanhoPagina} setTamanhoPagina={setTamanhoPagina} setPaginaAtual={paginaSetter} avancar={avancar} retroceder={retroceder} />
            </div>

        </div>

    );
}