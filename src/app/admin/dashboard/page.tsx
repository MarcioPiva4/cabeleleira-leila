"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserLayout } from "@/components/Dashboard/UserLayout";
import AdminDashboardCharts from "@/components/Dashboard/AdminGraphics";

type Agendamento = {
  id: string;
  user: { nome: string };
  servicos: { servico: { nome: string; preco: number } }[];
  dataAgendamento: string;
  status: string;
};

type Servico = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
};

export default function AdminDashboard() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newService, setNewService] = useState({ nome: "", descricao: "", preco: 0 });
  const [editService, setEditService] = useState<Servico | null>(null);
  const router = useRouter();
  const [editAppointment, setEditAppointment] = useState<Agendamento | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [agendamentosRes, servicosRes] = await Promise.all([
          fetch("/api/agendamentos"),
          fetch("/api/servicos"),
        ]);

        if (!agendamentosRes.ok || !servicosRes.ok) throw new Error("Erro ao buscar dados");

        const [agendamentosData, servicosData] = await Promise.all([
          agendamentosRes.json(),
          servicosRes.json(),
        ]);

        setAgendamentos(agendamentosData);
        setServicos(servicosData);
      } catch (err) {
        setError("Falha ao carregar dados");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleConfirmAppointment = async (id: string) => {
    try {
      const res = await fetch(`/api/agendamentos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CONFIRMADO" }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar agendamento");

      setAgendamentos((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "CONFIRMADO" } : appt))
      );
    } catch {
      setError("Falha ao confirmar agendamento");
    }
  };

  const handleCreateService = async () => {
    try {
      const res = await fetch("/api/servicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      if (!res.ok) throw new Error("Erro ao criar serviço");

      const createdService = await res.json();
      setServicos([...servicos, createdService]);
      setNewService({ nome: "", descricao: "", preco: 0 });
    } catch {
      setError("Erro ao criar serviço");
    }
  };

  const handleEditService = async () => {
    if (!editService) return;
    try {
      const res = await fetch(`/api/servicos/${editService.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editService),
      });

      if (!res.ok) throw new Error("Erro ao atualizar serviço");

      setServicos(servicos.map((s) => (s.id === editService.id ? editService : s)));
      setEditService(null);
    } catch {
      setError("Erro ao atualizar serviço");
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const res = await fetch(`/api/servicos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir serviço");
      setServicos(servicos.filter((s) => s.id !== id));
    } catch {
      setError("Erro ao excluir serviço");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  const handleEditAppointment = async () => {
    if (!editAppointment) return;
    try {
      const res = await fetch(`/api/agendamentos/${editAppointment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataAgendamento: editAppointment.dataAgendamento }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar agendamento");

      setAgendamentos((prev) =>
        prev.map((appt) => (appt.id === editAppointment.id ? editAppointment : appt))
      );
      setEditAppointment(null);
    } catch {
      setError("Erro ao atualizar agendamento");
    }
  };

  if (loading) return <p className="text-center p-8 text-gray-600">Carregando...</p>;
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    <UserLayout title="Dashboard do Administrador"> 

      {/* Gráficos */}
      <AdminDashboardCharts agendamentos={agendamentos} />

      {/* Seção de Agendamentos */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Agendamentos</h2>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Cliente</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Serviços</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Ações</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agendamentos.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600">{appt.user.nome}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {appt.servicos.map((s) => s.servico.nome).join(", ")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      appt.status === 'CONFIRMADO' ? 'bg-green-100 text-green-800' :
                      appt.status === 'PENDENTE' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-4">
                    {appt.status === "PENDENTE" && (
                      <button
                        onClick={() => handleConfirmAppointment(appt.id)}
                        className="text-orange-400 hover:text-orange-500 font-medium"
                      >
                        Confirmar
                      </button>
                    )}
                    {editAppointment?.id === appt.id ? (
                      <>
                        <button
                          onClick={handleEditAppointment}
                          className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => setEditAppointment(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditAppointment(appt)}
                        className="text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Alterar Data
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {editAppointment?.id === appt.id ? (
                      <input
                        type="datetime-local"
                        value={editAppointment.dataAgendamento}
                        onChange={(e) => setEditAppointment({ ...editAppointment, dataAgendamento: e.target.value })}
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      new Date(appt.dataAgendamento).toLocaleString()
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seção de Serviços */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-white">Gerenciamento de Serviços</h2>
        
        {/* Formulário de Novo Serviço */}
        <div className="bg-purple-50 p-6 rounded-lg shadow-md mb-8 text-black">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Nome do serviço"
              value={newService.nome}
              onChange={(e) => setNewService({ ...newService, nome: e.target.value })}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Descrição"
              value={newService.descricao}
              onChange={(e) => setNewService({ ...newService, descricao: e.target.value })}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              placeholder="Preço"
              value={newService.preco}
              onChange={(e) => setNewService({ ...newService, preco: Number(e.target.value) })}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleCreateService}
              className="bg-orange-400 text-white rounded-md p-2 hover:bg-orange-500 transition-all"
            >
              Adicionar Serviço
            </button>
          </div>
        </div>

        {/* Lista de Serviços */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {servicos.map((servico) => (
            <div key={servico.id} className="border-b border-gray-100 last:border-0">
              <div className="p-6 hover:bg-gray-50 transition-colors">
                {editService?.id === servico.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <input
                      type="text"
                      value={editService.nome}
                      onChange={(e) => setEditService({ ...editService, nome: e.target.value })}
                      className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      value={editService.descricao}
                      onChange={(e) => setEditService({ ...editService, descricao: e.target.value })}
                      className="col-span-2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="number"
                      value={editService.preco}
                      onChange={(e) => setEditService({ ...editService, preco: Number(e.target.value) })}
                      className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleEditService}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex-1"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditService(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex-1"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-purple-600">{servico.nome}</h3>
                      <p className="text-gray-600">{servico.descricao}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-orange-500 font-semibold">
                        R$ {servico.preco.toFixed(2)}
                      </span>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setEditService(servico)}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteService(servico.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </UserLayout>
  );
}