import { Servico } from "@/types";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
      status === "CONFIRMADO"
        ? "bg-green-100 text-green-800"
        : status === "PENDENTE"
        ? "bg-orange-100 text-orange-800"
        : "bg-gray-100 text-gray-800"
    }`}>
    {status}
  </span>
);

// components/Dashboard/ServiceSelection.tsx
interface ServiceSelectionProps {
  servicos: Servico[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const ServiceSelection = ({
  servicos,
  selected,
  onChange,
}: ServiceSelectionProps) => (
  <>
    <label className="block mb-2 font-medium text-gray-700">Serviços:</label>
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
                : selected.filter((id) => id !== servico.id);
              onChange(newSelected);
            }}
            className="w-5 h-5 text-purple-600 focus:ring-purple-500"
          />
          <span className="text-gray-700">
            {servico.nome} - R$ {servico.preco.toFixed(2)}
          </span>
        </label>
      ))}
    </div>
  </>
);
