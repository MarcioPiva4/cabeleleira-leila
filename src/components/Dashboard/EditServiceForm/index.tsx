"use client";
import { Servico } from "@/types";
import { useState } from "react";

interface EditServiceFormProps {
  service: Servico;
  onSave: (updated: Servico) => void;
  onCancel: () => void;
}

export const EditServiceForm = ({ service, onSave, onCancel }: EditServiceFormProps) => {
  const [editedService, setEditedService] = useState(service);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
      <input
        type="text"
        value={editedService.nome}
        onChange={(e) => setEditedService({ ...editedService, nome: e.target.value })}
        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="text"
        value={editedService.descricao}
        onChange={(e) => setEditedService({ ...editedService, descricao: e.target.value })}
        className="col-span-2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="number"
        value={editedService.preco}
        onChange={(e) => setEditedService({ ...editedService, preco: Number(e.target.value) })}
        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500"
      />
      <div className="flex gap-2">
        <button
          onClick={() => onSave(editedService)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex-1"
        >
          Salvar
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex-1"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};