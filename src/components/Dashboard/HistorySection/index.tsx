"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/UI/StatusBadge";
import { Agendamento } from "@/types";

export const HistorySection = () => {
  const [periodo, setPeriodo] = useState("");
  const [historico, setHistorico] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/agendamentos/historico?periodo=${periodo}`);
      const data = await res.json();
      setHistorico(res.ok ? data : []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">Histórico</h2>
      
      <div className="flex gap-4 items-center mb-4">
        <input
          type="date"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={fetchHistory}
          className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-all font-semibold"
        >
          Buscar
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : historico.length > 0 ? (
        <HistoryTable historico={historico} />
      ) : (
        <p className="text-gray-500">Nenhum agendamento encontrado.</p>
      )}
    </div>
  );
};

const HistoryTable = ({ historico }: { historico: Agendamento[] }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead className="bg-purple-50">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Serviço</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Data</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {historico.map((agendamento) => (
          <tr key={agendamento.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600">
              {agendamento.servicos.map((s) => s.servico.nome).join(", ")}
            </td>
            <td className="px-6 py-4 text-gray-600">
              {new Date(agendamento.dataAgendamento).toLocaleString()}
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={agendamento.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);