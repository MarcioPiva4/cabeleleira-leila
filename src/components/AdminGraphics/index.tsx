"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useMemo } from "react";

interface Servico {
  nome: string;
  preco?: number; // Torna opcional para evitar erros
}

interface Agendamento {
  id: string;
  dataAgendamento: string;
  servico: Servico;
}

interface AdminDashboardChartsProps {
  agendamentos: Agendamento[];
}

export default function AdminDashboardCharts({ agendamentos }: AdminDashboardChartsProps) {
  // Obtém o intervalo da semana atual
  const { weeklyData, weekRange } = useMemo(() => {
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const weekRange = `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;

    const data = daysOfWeek.map((day) => ({
      name: day,
      agendamentos: 0,
      faturamento: 0,
    }));

    agendamentos.forEach(({ dataAgendamento, servico }) => {
      const date = new Date(dataAgendamento);
      if (date >= startOfWeek && date <= endOfWeek) {
        const dayIndex = date.getDay();
        data[dayIndex].agendamentos += 1;
        data[dayIndex].faturamento += servico.preco ?? 0; // Evita erro caso preco seja undefined
      }
    });

    return { weeklyData: data, weekRange };
  }, [agendamentos]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="col-span-2 text-center mb-4">
        <h2 className="text-xl font-semibold">Semana: {weekRange}</h2>
      </div>

      {/* Gráfico de Agendamentos por Dia */}
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
              formatter={(value) =>
                typeof value === "number" ? `R$ ${value.toFixed(2)}` : value
              }
            />
            <Line type="monotone" dataKey="faturamento" stroke="#48BB78" name="Faturamento" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
