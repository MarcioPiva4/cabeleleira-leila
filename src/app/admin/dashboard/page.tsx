"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboardCharts from "@/components/AdminGraphics";

type Agendamento = {
  id: string;
  user: { nome: string };
  servico: { nome: string };
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

  // Buscar dados da API
  useEffect(() => {
    async function fetchData() {
      try {
        const [agendamentosRes, servicosRes] = await Promise.all([
          fetch("/api/agendamentos"),
          fetch("/api/servicos"),
        ]);

        if (!agendamentosRes.ok || !servicosRes.ok) {
          throw new Error("Erro ao buscar dados");
        }

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

  // Confirmar agendamento
  const handleConfirmAppointment = async (id: string) => {
    try {
      const res = await fetch(`/api/agendamentos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Confirmado" }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar agendamento");

      setAgendamentos((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "Confirmado" } : appt))
      );
    } catch {
      setError("Falha ao confirmar agendamento");
    }
  };

  // Criar serviço
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

  // Editar serviço
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

  // Excluir serviço
  const handleDeleteService = async (id: string) => {
    try {
      const res = await fetch(`/api/servicos/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Erro ao excluir serviço");

      setServicos(servicos.filter((s) => s.id !== id));
    } catch {
      setError("Erro ao excluir serviço");
    }
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold">Dashboard do Administrador</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>

      <AdminDashboardCharts agendamentos={agendamentos} />

      {/* Agendamentos */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Agendamentos</h2>
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
            {agendamentos.map((appt) => (
              <tr key={appt.id}>
                <td className="py-2 px-4">{appt.user.nome}</td>
                <td className="py-2 px-4">{appt.servico.nome}</td>
                <td className="py-2 px-4">
                  {new Date(appt.dataAgendamento).toLocaleString()}
                </td>
                <td className="py-2 px-4">{appt.status}</td>
                <td className="py-2 px-4">
                  {appt.status === "pendente" && (
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => handleConfirmAppointment(appt.id)}>
                      Confirmar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  {/* Serviços */}
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">Serviços</h2>
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Nome"
        value={newService.nome}
        onChange={(e) => setNewService({ ...newService, nome: e.target.value })}
        className="border p-2"
      />
      <input
        type="text"
        placeholder="Descrição"
        value={newService.descricao}
        onChange={(e) => setNewService({ ...newService, descricao: e.target.value })}
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Preço"
        value={newService.preco}
        onChange={(e) => setNewService({ ...newService, preco: Number(e.target.value) })}
        className="border p-2"
      />
      <button className="bg-green-600 text-white px-4 py-2" onClick={handleCreateService}>
        Adicionar
      </button>
    </div>

    {servicos.map((servico) => (
      <div key={servico.id} className="flex justify-between items-center border-b p-2">
        {editService?.id === servico.id ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editService.nome}
              onChange={(e) => setEditService({ ...editService, nome: e.target.value })}
              className="border p-1"
            />
            <input
              type="text"
              value={editService.descricao}
              onChange={(e) => setEditService({ ...editService, descricao: e.target.value })}
              className="border p-1"
            />
            <input
              type="number"
              value={editService.preco}
              onChange={(e) => setEditService({ ...editService, preco: Number(e.target.value) })}
              className="border p-1"
            />
            <button className="bg-blue-600 text-white px-2 py-1" onClick={handleEditService}>
              Salvar
            </button>
            <button className="bg-gray-500 text-white px-2 py-1" onClick={() => setEditService(null)}>
              Cancelar
            </button>
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <span>
              {servico.nome} - R$ {servico.preco.toFixed(2)}
            </span>
            <div className="flex gap-2">
              <button
                className="text-yellow-600"
                onClick={() => setEditService(servico)}
              >
                Editar
              </button>
              <button className="text-red-600" onClick={() => handleDeleteService(servico.id)}>
                Excluir
              </button>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>

    </div>
  );
}
