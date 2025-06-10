import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCliente } from "../../services/cliente"
import { convertSimpleDate } from "../../utils/formatacoes"

export default function VisualizarCliente() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any | null>(null)

    const getData = async () => {
        if (id && parseInt(id, 10)) {
            try {
                const response = await getCliente(parseInt(id, 10))
                setData(response.data.dados)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
    }


    useEffect(() => {
        getData()
    }, [])

    if (loading || !data) {
        return (<h1>Carregando....</h1>)
    }

    return (
        <div className="bg-white max-w-2xl mx-auto mt-8 shadow-md rounded-lg p-6 border border-slate-200">
            <h1 className="text-2xl font-bold mb-4">Ficha Médica do Paciente</h1>
            <div className="space-y-2 text-[16px]">
                <p><strong>Nome:</strong> {data.nome}</p>
                <p><strong>Identificação:</strong> {data.indentificacao}</p>
                <p><strong>Data de Nascimento:</strong> {convertSimpleDate(data.data_nascimento)}</p>
                <p><strong>Endereço:</strong> {data.endereco}, Nº {data.numero}</p>
                <p><strong>Telefone Principal:</strong> {data.telefone}</p>
                {data.telefone2 && (
                    <p><strong>Telefone Adicional:</strong> {data.telefone2}</p>
                )}
                <p><strong>Cadastro Criado Em:</strong> {new Date(data.data_criacao).toLocaleString('pt-BR')}</p>
            </div>
        </div>
    )
}