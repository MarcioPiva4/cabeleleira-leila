"use client";

import { Servico } from "@/types";

interface ServiceSelectionProps {
  servicos: Servico[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const ServiceSelection = ({ servicos, selected, onChange }: ServiceSelectionProps) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium text-gray-700">Selecione os serviços:</label>
      <div className="grid grid-cols-2 gap-2 border p-4 rounded-lg bg-purple-50">
        {servicos.map((servico) => (
          <label key={servico.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={servico.id}
              checked={selected.includes(servico.id)}
              onChange={(e) => {
                const newSelected = e.target.checked
                  ? [...selected, servico.id]
                  : selected.filter(id => id !== servico.id);
                onChange(newSelected);
              }}
              className="w-5 h-5 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-gray-700">{servico.nome} - R$ {servico.preco.toFixed(2)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};