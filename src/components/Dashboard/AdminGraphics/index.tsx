"use client";
import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { addWeeks, subWeeks, startOfWeek, endOfWeek, format } from "date-fns";

interface Servico {
  nome: string;
  preco: number;
}

interface Agendamento {
  id: string;
  dataAgendamento: string;
  servicos: { servico: Servico }[];
}

interface AdminDashboardChartsProps {
  agendamentos: Agendamento[];
}

export default function AdminDashboardCharts({ agendamentos }: AdminDashboardChartsProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const { weeklyData, weekRange } = useMemo(() => {
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const start = startOfWeek(currentWeek, { weekStartsOn: 0 });
    const end = endOfWeek(currentWeek, { weekStartsOn: 0 });

    const weekRange = `${format(start, "dd/MM/yyyy")} - ${format(end, "dd/MM/yyyy")}`;

    // Criar um objeto base com os dias da semana inicializados com 0
    const data = daysOfWeek.map((day) => ({
      name: day,
      agendamentos: 0,
      faturamento: 0,
    }));

    agendamentos.forEach(({ dataAgendamento, servicos }) => {
      const date = new Date(dataAgendamento);
      if (date >= start && date <= end) {
        const dayIndex = date.getDay();

        // Garantir que o faturamento está sendo calculado corretamente
        const totalFaturamento = servicos.reduce((sum, { servico }) => sum + (servico.preco ?? 0), 0);

        data[dayIndex].agendamentos += 1;
        data[dayIndex].faturamento += totalFaturamento;
      }
    });

    return { weeklyData: data, weekRange };
  }, [agendamentos, currentWeek]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-black">
      {/* Controle de Semana */}
      <div className="col-span-2 flex justify-center items-center space-x-4 mb-4">
        <button
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          onClick={() => setCurrentWeek((prev) => subWeeks(prev, 1))}
        >
          {"<"} Semana Anterior
        </button>
        <h2 className="text-xl font-semibold text-white">{weekRange}</h2>
        <button
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          onClick={() => setCurrentWeek((prev) => addWeeks(prev, 1))}
        >
          Próxima Semana {">"}
        </button>
      </div>

      {/* Gráfico de Agendamentos */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Agendamentos na Semana</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="agendamentos" fill="#3182CE" name="Agendamentos" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Faturamento */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Faturamento na Semana (R$)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value) => `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
            />
            <Line type="monotone" dataKey="faturamento" stroke="#48BB78" name="Faturamento" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
