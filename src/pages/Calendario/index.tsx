import {
    startOfMonth,
    endOfMonth,
    format,
    addMonths,
    subMonths,
    isSameDay,
    isSameMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConsultaPagination } from "../../services/consulta";
import classNames from "classnames";

export default function CalendarioConsultas() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [consultas, setConsultas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const diasVisiveis = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 }),
        end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 }),
    });

    const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    const fetchConsultas = async (data: Date) => {
        const dia = format(data, "yyyy-MM-dd");
        try {
            setLoading(true)
            const resp = await getConsultaPagination({
                pesquisa: "",
                tamanhoPagina: 100,
                numeroPagina: 1,
                horarioInicio: dia,
                horarioFim: dia,
            });
            setConsultas(resp.data.dados.listaConsultas || []);
        } catch (err) {
            console.error("Erro ao buscar consultas:", err);
            setConsultas([]);
        } finally {
            setLoading(false)
        }
    };

    const fetchConsultasTrinta = async (data: Date) => {
        const dia = format(data, "yyyy-MM-dd");
        try {
            setLoading(true)
            const resp = await getConsultaPagination({
                pesquisa: "",
                tamanhoPagina: 100,
                numeroPagina: 1,
                horarioInicio: dia,
                horarioFim: dia,
            });
            setConsultas(resp.data.dados.listaConsultas || []);
        } catch (err) {
            console.error("Erro ao buscar consultas:", err);
            setConsultas([]);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchConsultas(selectedDate);
    }, [selectedDate]);

    return (
        <div className="max-w-7xl grid grid-cols-3 gap-6 px-4 h-fit">
            {/* Calendário */}
            <div className="col-span-2 bg-white rounded-2xl shadow p-6 border border-slate-200 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800">
                        {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
                    </h2>
                    <div className="space-x-2">
                        <button
                            onClick={handlePrevMonth}
                            className="rounded-lg border border-slate-300 px-3 py-1 text-slate-600 hover:bg-slate-100 hover:cursor-pointer"
                        >
                            ◀
                        </button>
                        <button
                            onClick={handleNextMonth}
                            className="rounded-lg border border-slate-300 px-3 py-1 text-slate-600 hover:bg-slate-100 hover:cursor-pointer"
                        >
                            ▶
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 text-center font-medium text-slate-500 mb-2">
                    {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((dia) => (
                        <div key={dia}>{dia}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2 text-center flex-grow">
                    {diasVisiveis.map((dia) => {
                        const isMesAtual = isSameMonth(dia, currentMonth);
                        const isSelecionado = isSameDay(dia, selectedDate);

                        return (
                            <button
                                key={dia.toISOString()}
                                onClick={() => setSelectedDate(dia)}
                                className={classNames(
                                    `rounded-xl aspect-square text-sm p-2 flex items-start justify-start border hover:cursor-pointer
                ${isSelecionado ? "bg-blue-100 border-blue-500" : "bg-white"}
                ${isMesAtual ? "text-slate-800" : "text-slate-300"}
                hover:bg-blue-50 border-slate-300`
                                )}
                            >
                                {format(dia, "d")}
                            </button>
                        );
                    })}
                </div>
            </div>

           
            <div className="bg-white rounded-2xl shadow p-6 border border-slate-200 flex flex-col h-full overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">
                        {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
                    </h3>
                    <button
                        onClick={() => navigate("/consulta")}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1.5 rounded-lg hover:cursor-pointer"
                    >
                        + Nova
                    </button>
                </div>

                {loading ? (
                    <p className="text-sm text-slate-500">Carregando...</p>
                ) : consultas.length === 0 ? (
                    <p className="text-slate-500 text-sm">Nenhuma consulta cadastrada.</p>
                ) : (
                    <div className="space-y-3 overflow-auto">
                        {consultas.map((consulta) => (
                            <div
                                key={consulta.id}
                                className="border border-slate-300 rounded-xl p-4 bg-white shadow-sm hover:cursor-pointer hover:bg-gray-100"
                                onClick={() => navigate("/consulta/" + consulta.id)}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-slate-500">
                                        {consulta.horario
                                            ? format(new Date(consulta.horario), "HH:mm")
                                            : "Horário indefinido"}
                                    </span>
                                    <span
                                        className={classNames(
                                            "px-2 py-0.5 rounded-full text-xs font-medium",
                                            {
                                                "bg-yellow-100 text-yellow-800": consulta.status === "marcada",
                                                "bg-green-100 text-green-700": consulta.status === "concluida",
                                                "bg-red-100 text-red-600": consulta.status === "cancelada",
                                            }
                                        )}
                                    >
                                        {consulta.status?.charAt(0).toUpperCase() +
                                            consulta.status?.slice(1)}
                                    </span>
                                </div>
                                <p className="text-base font-semibold text-slate-800 mb-1">
                                    {consulta.procedimento}
                                </p>
                                <p className="text-sm text-slate-600">
                                    Paciente:{" "}
                                    <span className="font-medium text-slate-800">
                                        {consulta.cliente?.nome ?? "N/A"}
                                    </span>
                                </p>
                                <p className="text-sm text-slate-600">
                                    Profissional:{" "}
                                    <span className="font-medium text-slate-800">
                                        {consulta.profissional?.nome ?? "N/A"}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

}
