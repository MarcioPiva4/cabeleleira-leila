'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Agendamento {
  id: string;
  servico: { nome: string };
  dataAgendamento: string;
  status: string;
}

interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
}

export default function UserDashboard() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<string>("");
  const [dataAgendamento, setDataAgendamento] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/agendamentos")
      .then((res) => res.json())
      .then((data) => setAgendamentos(data));

    fetch("/api/servicos")
      .then((res) => res.json())
      .then((data) => setServicos(data));
  }, []);

  const handleAgendar = async () => {
  
    if (!servicoSelecionado || !dataAgendamento) {
      alert("Por favor, selecione um serviço e uma data.");
      return;
    }
  
    const res = await fetch("/api/agendamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        servicoId: servicoSelecionado,
        dataAgendamento,
      }),
    });
  
    if (res.ok) {
      alert("Agendamento realizado com sucesso!");
      setDataAgendamento("");
      setServicoSelecionado("");
  
      // Atualiza a lista de agendamentos
      const novoAgendamento = await res.json();
      setAgendamentos((prev) => [...prev, novoAgendamento]);
    } else {
      alert("Erro ao agendar serviço.");
    }
  };
  const handleLogout = async () => {
    Cookies.remove("token");
    Cookies.remove("session");
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Dashboard do Usuário</h1>
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>

      {/* Agendamentos */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Meus Agendamentos</h2>
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Serviço</th>
              <th className="py-2 px-4">Data</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((agendamento) => (
              <tr key={agendamento.id}>
                <td className="py-2 px-4">{agendamento.servico.nome}</td>
                <td className="py-2 px-4">{new Date(agendamento.dataAgendamento).toLocaleString()}</td>
                <td className="py-2 px-4">{agendamento.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Agendamento de Serviços */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Agendar Serviço</h3>
        <div className="mb-4">
          <label className="block text-gray-700">Selecione um serviço:</label>
          <select
            value={servicoSelecionado}
            onChange={(e) => setServicoSelecionado(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Escolha um serviço</option>
            {servicos.map((servico) => (
              <option key={servico.id} value={servico.id}>
                {servico.nome} - R$ {servico.preco.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Selecione a data:</label>
          <input
            type="datetime-local"
            value={dataAgendamento}
            onChange={(e) => setDataAgendamento(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAgendar}
        >
          Agendar Serviço
        </button>
      </div>

      {/* Serviços Disponíveis */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Serviços Disponíveis</h3>
        <ul>
          {servicos.map((servico) => (
            <li key={servico.id} className="mb-2">
              {servico.nome} - R$ {servico.preco.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
