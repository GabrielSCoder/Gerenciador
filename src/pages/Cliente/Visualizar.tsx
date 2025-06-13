import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCliente } from "../../services/cliente";

function IconUser() {
    return (
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
}

function IconCalendar() {
    return (
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
}

function IconPhone() {
    return (
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
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13 1.21.44 2.39.9 3.5a2 2 0 01-.45 2.11L9 10.91a16 16 0 006 6l1.58-1.58a2 2 0 012.11-.45c1.1.46 2.28.77 3.5.9a2 2 0 011.72 2z" />
        </svg>
    );
}

function IconLocation() {
    return (
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
            <path d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
            <path d="M12 21s-6-4.5-6-10a6 6 0 1112 0c0 5.5-6 10-6 10z" />
        </svg>
    );
}

function convertSimpleDate(dateStr?: string) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function VisualizarCliente() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any | null>(null);

    const getData = async () => {
        if (id && parseInt(id, 10)) {
            try {
                const response = await getCliente(parseInt(id, 10));
                setData(response.data.dados);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading || !data) {
        return (
            <div className="flex justify-center items-center h-40 text-gray-600 font-semibold text-lg">
                Carregando...
            </div>
        );
    }

    return (
        <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg font-sans text-gray-800 border border-slate-200 mt-8">
            <h1 className="text-3xl font-bold mb-6 border-b border-gray-200 pb-3">
                Ficha Médica do Paciente
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex items-center">
                    <IconUser />
                    <div>
                        <div className="text-sm text-gray-500">Nome</div>
                        <div className="font-medium text-lg">{data.nome}</div>
                    </div>
                </div>

                <div className="flex items-center">
                    <IconUser />
                    <div>
                        <div className="text-sm text-gray-500">Identificação</div>
                        <div className="font-medium text-lg">{data.indentificacao || "-"}</div>
                    </div>
                </div>

                <div className="flex items-center">
                    <IconCalendar />
                    <div>
                        <div className="text-sm text-gray-500">Data de Nascimento</div>
                        <div className="font-medium text-lg">{convertSimpleDate(data.data_nascimento)}</div>
                    </div>
                </div>

                <div className="flex items-center">
                    <IconLocation />
                    <div>
                        <div className="text-sm text-gray-500">Endereço</div>
                        <div className="font-medium text-lg">
                            {data.endereco}, Nº {data.numero}
                        </div>
                    </div>
                </div>

                <div className="flex items-center">
                    <IconPhone />
                    <div>
                        <div className="text-sm text-gray-500">Telefone Principal</div>
                        <div className="font-medium text-lg">{data.telefone}</div>
                    </div>
                </div>

                {data.telefone2 && (
                    <div className="flex items-center">
                        <IconPhone />
                        <div>
                            <div className="text-sm text-gray-500">Telefone Adicional</div>
                            <div className="font-medium text-lg">{data.telefone2}</div>
                        </div>
                    </div>
                )}

                <div className="flex items-center md:col-span-2">
                    <IconCalendar />
                    <div>
                        <div className="text-sm text-gray-500">Cadastro Criado Em</div>
                        <div className="font-medium text-lg">{new Date(data.data_criacao).toLocaleString("pt-BR")}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
