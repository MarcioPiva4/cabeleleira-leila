"use client";

import { useState } from "react";
import { Servico } from "@/types";
import { ServiceSelection } from "../ServiceSelection";
import { DateInput } from "../DateInput";
import { SubmitButton } from "../SubmitButton";
import { DateSuggestion } from "../DateSuggestion";


interface ScheduleFormProps {
  servicos: Servico[];
  onSchedule: (data: { dataAgendamento: string; servicoIds: string[] }) => Promise<void>;
}

export const ScheduleForm = ({ servicos, onSchedule }: ScheduleFormProps) => {
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([]);
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [mostrarSugestao, setMostrarSugestao] = useState(false);
  const [sugestaoData, setSugestaoData] = useState("");

  const handleSubmit = async () => {
    await onSchedule({ dataAgendamento, servicoIds: servicosSelecionados });
    setServicosSelecionados([]);
    setDataAgendamento("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-semibold mb-4 text-purple-600">Agendar Serviços</h3>

      <ServiceSelection 
        servicos={servicos}
        selected={servicosSelecionados}
        onChange={setServicosSelecionados}
      />

      <DateInput 
        value={dataAgendamento}
        onChange={setDataAgendamento}
        showSuggestion={(show, data) => {
          setMostrarSugestao(show);
          setSugestaoData(data);
        }}
      />

      {mostrarSugestao && (
        <DateSuggestion 
          suggestedDate={sugestaoData}
          onAccept={() => {
            setDataAgendamento(sugestaoData);
            setMostrarSugestao(false);
          }}
          onCancel={() => setMostrarSugestao(false)}
        />
      )}

      <SubmitButton onClick={handleSubmit} label="Agendar Serviço" />
    </div>
  );
};