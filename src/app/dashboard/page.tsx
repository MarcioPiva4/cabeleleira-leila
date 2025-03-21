'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

// Dados mockados para agendamentos (esses dados devem ser gerenciados via API)
const mockAppointments = [
  {
    id: 1,
    service: "Corte de Cabelo",
    date: "2025-03-25T10:00:00",
    status: "Confirmado",
  },
  {
    id: 2,
    service: "Manicure",
    date: "2025-03-27T14:00:00",
    status: "Pendente",
  },
];

export default function ClientDashboard() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [newService, setNewService] = useState("");
  const [newDate, setNewDate] = useState("");

  // Função para agendar um novo serviço
  const handleNewAppointment = () => {
    const newAppointment = {
      id: appointments.length + 1,
      service: newService,
      date: newDate,
      status: "Pendente",
    };
    setAppointments([...appointments, newAppointment]);
    setNewService("");
    setNewDate("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <h1 className="text-4xl font-semibold text-center mb-8">Sua Dashboard</h1>

      {/* Agendamentos do Cliente */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Seus Agendamentos</h2>
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Serviço</th>
              <th className="py-2 px-4">Data</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="py-2 px-4">{appointment.service}</td>
                <td className="py-2 px-4">{new Date(appointment.date).toLocaleString()}</td>
                <td className="py-2 px-4">{appointment.status}</td>
                <td className="py-2 px-4">
                  {/* Ação de alteração (somente se o agendamento estiver dentro da regra de 2 dias) */}
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    disabled={new Date(appointment.date) <= new Date()}
                  >
                    Alterar
                  </button>
                  <button className="ml-4 text-red-600 hover:text-red-800">Cancelar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Agendar Novo Serviço */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Agendar Novo Serviço</h3>
        <div className="mb-4">
          <label htmlFor="service" className="block text-sm text-gray-600">Serviço</label>
          <input
            type="text"
            id="service"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm text-gray-600">Data</label>
          <input
            type="datetime-local"
            id="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleNewAppointment}
          className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-all"
        >
          Agendar
        </button>
      </div>
    </div>
  );
}
