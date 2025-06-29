import { useEffect, useState } from "react";
import { deleteCliente, getClientePagination } from "../../services/cliente";
import Filtros from "../../templates/Filtros";
import { useForm, useWatch } from "react-hook-form";
import useDebounce from "../../hooks/useDebounce";
import { dateTimeStampToDate, dateTimeStampToHour } from "../../utils/formatacoes";
import { getUsuarioSelect } from "../../services/usuario";
import FiltroRodape from "../../templates/Filtros/FiltroRodape";
import usePaginacao from "../../hooks/usePaginacao";
import { SlOptionsVertical } from "react-icons/sl";
import {DropdownMenuCmpnt} from "../../components/DropdownMenuCmpnt";
import { useNavigate } from "react-router-dom";
import { useToastRequest } from "../../hooks/useToastRequest";


export default function ListaCliente() {

    const { avancar, paginaAtual, retroceder, paginaSetter, setTotalPaginas, totalPaginas, setTotalRegistros, totalRegistros } = usePaginacao()
    const nav = useNavigate()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [deleting, setDeleting] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [users, setUsers] = useState([])
    const [src, setSrc] = useState("")
    const [tamanhoPagina, setTamanhoPagina] = useState<number>(10)
    const { control, register, formState, setValue } = useForm({
        defaultValues: {
            pesquisa: "",
            data: "",
            fdata: "",
            usuario: null,
            ordem: "DESC",
            mod: "data_criacao"
        }
    })


    const search = useWatch({ control, name: "pesquisa" })
    const initDate = useWatch({ control, name: "data" })
    const finalDate = useWatch({ control, name: "fdata" })
    const usuarioId = useWatch({ control, name: "usuario" })
    const orda = useWatch({ control, name: "ordem" })
    const mod = useWatch({ control, name: "mod" })

    const formatToISO = (data: string) => {
        if (!data) return null;
        const [dia, mes, ano] = data.split("/");
        if (dia && mes && ano) {
            return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
        }
        return null;
    };

    const firstData = async () => {

        const dti = formatToISO(initDate)
        const dtf = formatToISO(finalDate)

        const dt = await getClientePagination({
            pesquisa: src, numeroPagina: Number(paginaAtual), tamanhoPagina: Number(tamanhoPagina), dataInicio: dti, dataFim: dtf,
            criador: usuarioId ? parseInt(usuarioId, 10) : null, ordem: orda, modificador: mod
        })

        if (dt.data.success) {
            setData(dt.data.dados.registros)
            paginaSetter(dt.data.dados.pagina_atual <= dt.data.dados.quantidade_paginas ? dt.data.dados.pagina_atual : paginaAtual)
            setTotalPaginas(dt.data.dados.quantidade_paginas)
            setTotalRegistros(dt.data.dados.quantidade_registros)
            if (dt.data.dados.quantidade_registros > 1 && dt.data.dados.pagina_atual > dt.data.dados.quantidade_paginas) paginaSetter(dt.data.dados.quantidade_paginas)
        }

        setLoading(false)
    }

    const getData = async () => {

        const dti = formatToISO(initDate)
        const dtf = formatToISO(finalDate)

        const dt = await getClientePagination({
            pesquisa: src, numeroPagina: Number(paginaAtual), tamanhoPagina: Number(tamanhoPagina), dataInicio: dti, dataFim: dtf,
            criador: usuarioId ? parseInt(usuarioId, 10) : null, ordem: orda, modificador: mod
        })

        if (dt.data.success) {
            setData(dt.data.dados.registros)
            paginaSetter(dt.data.dados.pagina_atual <= dt.data.dados.quantidade_paginas ? dt.data.dados.pagina_atual : paginaAtual)
            setTotalPaginas(dt.data.dados.quantidade_paginas)
            setTotalRegistros(dt.data.dados.quantidade_registros)
            if (dt.data.dados.quantidade_registros > 1 && dt.data.dados.pagina_atual > dt.data.dados.quantidade_paginas) paginaSetter(dt.data.dados.quantidade_paginas)
        }
    }

    const getUsers = async () => {
        const dt = await getUsuarioSelect({ pesquisa: "" })
        if (dt.data.success) {
            setUsers(dt.data.dados)
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
            getData()
    }, [src, initDate, finalDate, usuarioId, tamanhoPagina, paginaAtual, orda, mod])

    useEffect(() => {
        getUsers()
    }, [])

    if (!data || !users) {
        return (
            <div className="">
                <h2 className="text-black">Carregando</h2>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <Filtros control={control} register={register} usuarios={users} formState={formState} setValue={setValue} />
            <div className="overflow-x-auto bg-white rounded-md shadow-md p-4 px-10 h-[487px]">
                {!loading ? (
                    <table className="table-fixed w-full text-sm text-left border-collapse">
                        <thead className="text-black border-b">
                            <tr>

                                <th className="min-w-[150px] px-2 py-3">Nome</th>
                                <th className="min-w-[140px] px-2 py-3">Identificação</th>
                                <th className="min-w-[200px] px-2 py-3">Endereço</th>
                                <th className="min-w-[90px] px-2 py-3">Telefone</th>
                                <th className="min-w-[200px] px-2 py-3">Cadastro</th>
                                <th className="min-w-[200px] px-2 py-3">Última Modificação</th>
                                <th className="w-16 px-2 py-3">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((value: any, index: number) => (
                                <tr key={index} className="border-b border-slate-300 hover:bg-gray-100" >

                                    <td className="px-2 py-2 text-black font-medium text-base">{value.nome}</td>
                                    <td className="px-2 py-2 text-gray-600">{value.indentificacao}</td>
                                    <td className="px-2 py-2 truncate text-gray-600">{value.endereco}, {value.numero}</td>
                                    <td className="px-2 py-2 text-gray-600">{value.telefone}</td>
                                    <td className="px-2 py-2 text-gray-600 truncate">
                                        {value.usuario_criador?.nome ?? "Desconhecido"} - {dateTimeStampToDate(value.data_criacao)} - {dateTimeStampToHour(value.data_criacao)}
                                    </td>
                                    <td className="px-2 py-2 text-gray-600">
                                        {value.data_modificacao ? `${value.usuario_modificador?.nome ?? ""} - ${dateTimeStampToDate(value.data_modificacao)} - ${dateTimeStampToHour(value.data_modificacao)}` : "Nenhuma"}
                                    </td>
                                    <td className="px-2 py-2 cursor-pointer hover:underline text-center">
                                        <DropdownMenuCmpnt key={index}
                                            data={value} nav={nav} setDeleteModal={setDeleteModal}
                                            deleteModal={deleteModal} handleFunc={hd}
                                            pending={deleting}>
                                            <SlOptionsVertical size={20} className="w-full text-black hover:text-blue-500" />
                                        </DropdownMenuCmpnt>
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