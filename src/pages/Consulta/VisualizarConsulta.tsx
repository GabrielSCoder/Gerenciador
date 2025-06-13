import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConsulta } from "../../services/consulta";

export default function VisualizarConsulta() {

    const [consulta, setDados] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const formatarData = (data: string) =>
        new Date(data).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const formatarPreco = (valor: number | string) =>
        Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });


    const getData = async () => {
        if (id && parseInt(id, 10))
            try {
                const resp = await getConsulta(parseInt(id, 10))
                setDados(resp.data.dados)
            } catch (error: any) {
                console.log(error)
            } finally {
                setLoading(false)
            }
    }

    const StatusBadge = ({ status }: { status: string }) => {
        const statusMap: Record<string, { color: string; label: string }> = {
            marcada: { color: "bg-yellow-100 text-yellow-800", label: "Marcada" },
            concluida: { color: "bg-green-100 text-green-800", label: "Concluída" },
            cancelada: { color: "bg-red-100 text-red-800", label: "Cancelada" },
        };

        const current = statusMap[status.toLowerCase()] || {
            color: "bg-gray-100 text-gray-800",
            label: status,
        };

        return (
            <span
                className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${current.color} select-none`}
            >
                {current.label}
            </span>
        );
    };

    useEffect(() => {
        getData()
    }, [])

    if (loading || !consulta) {
        return <h1>Loading....</h1>
    }

    const IconUser = (
        <svg
            className="w-5 h-5 mr-2 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M20 21v-2a4 4 0 00-3-3.87M4 21v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );

    const IconCalendar = (
        <svg
            className="w-5 h-5 mr-2 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );

    const IconMoney = (
        <svg
            className="w-5 h-5 mr-2 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
        </svg>
    );

    return (
        <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg font-sans text-gray-800">
            <h2 className="text-3xl font-bold mb-6 border-b border-gray-200 pb-3">
                Detalhes da Consulta
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex items-center">
                    {IconUser}
                    <div>
                        <div className="text-sm text-gray-500">Cliente</div>
                        <div className="font-medium text-lg">
                            {consulta.cliente?.nome || "Não informado"}
                        </div>
                    </div>
                </div>

                <div className="flex items-center">
                    {IconUser}
                    <div>
                        <div className="text-sm text-gray-500">Profissional</div>
                        <div className="font-medium text-lg">
                            {consulta.profissional?.nome || "Não informado"}
                        </div>
                    </div>
                </div>

                <div className="flex items-center">
                    {IconCalendar}
                    <div>
                        <div className="text-sm text-gray-500">Horário</div>
                        <div className="font-medium text-lg">{formatarData(consulta.horario)}</div>
                    </div>
                </div>

                <div className="flex items-center">
                    {IconMoney}
                    <div>
                        <div className="text-sm text-gray-500">Preço</div>
                        <div className="font-medium text-lg">{formatarPreco(consulta.preco)}</div>
                    </div>
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Descrição</div>
                    <p className="text-base leading-relaxed">{consulta.descricao}</p>
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Procedimento</div>
                    <p className="text-base leading-relaxed">{consulta.procedimento}</p>
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Tipo</div>
                    <p className="font-semibold text-indigo-700">{consulta.tipo}</p>
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Status</div>
                    <StatusBadge status={consulta.status} />
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Forma de Pagamento</div>
                    <p>{consulta.forma_pagamento}</p>
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Pago</div>
                    <p className={consulta.pago ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {consulta.pago ? "Sim" : "Não"}
                    </p>
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Dente Afetado</div>
                    <p>{consulta.dente_afetado}</p>
                </div>

                {consulta.observacoes && (
                    <div className="md:col-span-2">
                        <div className="text-sm text-gray-500 mb-1">Observações</div>
                        <p className="whitespace-pre-wrap">{consulta.observacoes}</p>
                    </div>
                )}
            </div>
        </section>
    );
}