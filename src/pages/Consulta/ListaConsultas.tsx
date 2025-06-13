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
import { useState } from "react";

export default function CalendarioConsultas() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const diasVisiveis = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 }), // domingo
    end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 }),       // sábado
  });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="max-w-5xl mx-auto mt-10 grid grid-cols-3 gap-4">
      <div className="col-span-2 bg-white rounded-lg shadow p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
          </h2>
          <div className="space-x-2">
            <button onClick={handlePrevMonth} className="px-2 py-1 border rounded hover:bg-gray-100">◀</button>
            <button onClick={handleNextMonth} className="px-2 py-1 border rounded hover:bg-gray-100">▶</button>
          </div>
        </div>

        {/* Dias da semana */}
        <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-600">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((dia) => (
            <div key={dia}>{dia}</div>
          ))}
        </div>

        {/* Dias do mês */}
        <div className="grid grid-cols-7 gap-2 mt-2 text-center">
          {diasVisiveis.map((dia) => {
            const isMesAtual = isSameMonth(dia, currentMonth);
            const isSelecionado = isSameDay(dia, selectedDate);

            return (
              <button
                key={dia.toISOString()}
                onClick={() => setSelectedDate(dia)}
                className={`
                  h-20 rounded-md border flex items-start justify-start p-1 text-sm
                  ${isSelecionado ? "bg-blue-100 border-blue-500" : "border-gray-200"}
                  ${isMesAtual ? "text-gray-900" : "text-gray-400"}
                  hover:bg-gray-100
                `}
              >
                {format(dia, "d")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Eventos do dia */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Consultas do Dia</h3>
          <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
            + Nova
          </button>
        </div>

        {/* Aqui entrariam os dados das consultas */}
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>{format(selectedDate, "d 'de' MMMM", { locale: ptBR })}</strong></p>
          <p>Nenhuma consulta cadastrada.</p>
        </div>
      </div>
    </div>
  );
}
