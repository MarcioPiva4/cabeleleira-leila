"use client";

import { useEffect, useState } from "react";
import { UserLayout } from "@/components/Dashboard/UserLayout";
import { AppointmentsTable } from "@/components/Dashboard/AppointmentsTable";
import { ScheduleForm } from "@/components/Dashboard/ScheduleForm";
import { HistorySection } from "@/components/Dashboard/HistorySection";
import { Agendamento, Servico } from "@/types";

export default function UserDashboard() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [editando, setEditando] = useState<string | null>(null);
  const [novaData, setNovaData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetch("/api/agendamentos", { cache: "no-store" })
      .then((res) => res.json())
      .then(setAgendamentos);

    fetch("/api/servicos")
      .then((res) => res.json())
      .then(setServicos);
  }, []);

  const handleAgendar = async (data: {
    dataAgendamento: string;
    servicoIds: string[];
  }) => {
    const response = await fetch("/api/agendamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const newAgendamento = await response.json();
      setAgendamentos((prev) => [...prev, newAgendamento]);
    }
  };

  const handleAlterarAgendamento = async (id: string) => {
    const res = await fetch(`/api/agendamentos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ novaData: novaData[id] }),
    });

    if (res.ok) {
      setAgendamentos((prev) =>
        prev.map((ag) =>
          ag.id === id ? { ...ag, dataAgendamento: novaData[id] } : ag
        )
      );
      setEditando(null);
    }
  };

  const handleDateChange = (id: string, newDate: string) => {
    setNovaData((prev) => ({
      ...prev,
      [id]: newDate,
    }));
  };
  return (
    <UserLayout title="Dashboard do Usuário">
      <AppointmentsTable
        agendamentos={agendamentos}
        editando={editando}
        novaData={novaData}
        onEditStart={setEditando}
        onSave={handleAlterarAgendamento}
        onDateChange={handleDateChange}
      />

      <ScheduleForm servicos={servicos} onSchedule={handleAgendar} />

      <HistorySection />
    </UserLayout>
  );
}
