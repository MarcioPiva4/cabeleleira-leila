'use client'
import { useState } from "react";

// Dados mockados para agendamentos e desempenho
const mockAppointments = [
  {
    id: 1,
    customerName: "João Silva",
    service: "Corte de Cabelo",
    date: "2025-03-25T10:00:00",
    status: "Confirmado",
  },
  {
    id: 2,
    customerName: "Maria Oliveira",
    service: "Manicure",
    date: "2025-03-27T14:00:00",
    status: "Pendente",
  },
];

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState(mockAppointments);

  // Função para confirmar agendamento
  const handleConfirmAppointment = (id: number) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Confirmado" }
          : appointment
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <h1 className="text-4xl font-semibold text-center mb-8">Dashboard do Administrador</h1>

      {/* Agendamentos */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Agendamentos de Clientes</h2>
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Cliente</th>
              <th className="py-2 px-4">Serviço</th>
              <th className="py-2 px-4">Data</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="py-2 px-4">{appointment.customerName}</td>
                <td className="py-2 px-4">{appointment.service}</td>
                <td className="py-2 px-4">{new Date(appointment.date).toLocaleString()}</td>
                <td className="py-2 px-4">{appointment.status}</td>
                <td className="py-2 px-4">
                  {/* Ação de confirmar agendamento */}
                  {appointment.status === "Pendente" && (
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleConfirmAppointment(appointment.id)}
                    >
                      Confirmar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Desempenho do Salão */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Desempenho do Salão (Última Semana)</h3>
        <p>Total de Agendamentos: 20</p>
        <p>Faturamento Estimado: R$ 2.000,00</p>
      </div>
    </div>
  );
}
