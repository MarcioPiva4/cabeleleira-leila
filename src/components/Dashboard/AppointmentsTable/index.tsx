"use client";

import { StatusBadge } from "@/components/UI/StatusBadge";
import { Agendamento } from "@/types";

interface AppointmentsTableProps {
  agendamentos: Agendamento[];
  editando: string | null;
  novaData: { [key: string]: string };
  onEditStart: (id: string) => void;
  onDateChange: (id: string, newDate: string) => void;
  onSave: (id: string) => void;
}

export const AppointmentsTable = ({
  agendamentos,
  editando,
  novaData,
  onEditStart,
  onDateChange,
  onSave
}: AppointmentsTableProps) => {
  const handleDateChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(id, e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto mb-8">
      <table className="min-w-full">
        <thead className="bg-purple-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Serviço</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Data</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {agendamentos.map((agendamento) => (
            <tr key={agendamento.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-600">
                {agendamento.servicos?.map((s) => s.servico.nome).join(", ")}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {editando === agendamento.id ? (
                  <input
                    type="datetime-local"
                    value={novaData[agendamento.id] || new Date(agendamento.dataAgendamento).toISOString().slice(0, 16)}
                    onChange={(e) => handleDateChange(agendamento.id, e)}
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  new Date(agendamento.dataAgendamento).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                )}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={agendamento.status} />
              </td>
              <td className="px-6 py-4 space-x-2">
                {editando === agendamento.id ? (
                  <button
                    className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors"
                    onClick={() => onSave(agendamento.id)}
                  >
                    Salvar
                  </button>
                ) : (
                  <button
                    className="bg-orange-400 text-white px-3 py-1 rounded-md hover:bg-orange-500 transition-colors"
                    onClick={() => onEditStart(agendamento.id)}
                  >
                    Alterar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};