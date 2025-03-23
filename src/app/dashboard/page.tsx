"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type Agendamento = {
  id: string;
  userId: string;
  dataAgendamento: string;
  status: string;
  user: {
    nome: string;
  };
  servicos: {
    agendamentoId: string;
    servicoId: string;
    servico: {
      nome: string;
    };
  }[];
};

interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
}

export default function UserDashboard() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([]);
  const [dataAgendamento, setDataAgendamento] = useState<string>("");
  const [historicoPeriodo, setHistoricoPeriodo] = useState<string>("");
  const [historico, setHistorico] = useState<Agendamento[]>([]);
  const [mostrarSugestao, setMostrarSugestao] = useState(false);
  const [sugestaoData, setSugestaoData] = useState("");
  const [editando, setEditando] = useState<string | null>(null);
  const [novaData, setNovaData] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/agendamentos", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setAgendamentos(data));

    fetch("/api/servicos")
      .then((res) => res.json())
      .then((data) => setServicos(data));
  }, []);

  useEffect(() => {
    const checkAgendamentoSemana = () => {
      if (!dataAgendamento) return;

      const dataSelecionada = new Date(dataAgendamento);
      const inicioSemana = new Date(dataSelecionada);
      inicioSemana.setDate(dataSelecionada.getDate() - dataSelecionada.getDay());
      
      const finalSemana = new Date(dataSelecionada);
      finalSemana.setDate(dataSelecionada.getDate() + (6 - dataSelecionada.getDay()));

      const agendamentoNaSemana = agendamentos.find(ag => {
        const dataAg = new Date(ag.dataAgendamento);
        return (
          dataAg >= inicioSemana &&
          dataAg <= finalSemana &&
          ag.status === 'pendente'
        );
      });

      if (agendamentoNaSemana) {
        setSugestaoData(agendamentoNaSemana.dataAgendamento);
        setMostrarSugestao(true);
      } else {
        setMostrarSugestao(false);
      }
    };

    checkAgendamentoSemana();
  }, [dataAgendamento, agendamentos]);

  const handleAgendar = async () => {
    if (!dataAgendamento || servicosSelecionados.length === 0) {
      alert("Por favor, selecione pelo menos um serviço e uma data.");
      return;
    }
  
    try {
      const response = await fetch("/api/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          dataAgendamento,
          servicoIds: servicosSelecionados,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.error || "Erro ao agendar")
      } else {
        alert("Agendamento criado com sucesso!");
        setAgendamentos([...agendamentos, data]);
        setServicosSelecionados([]);
        setDataAgendamento("");
        setMostrarSugestao(false);
      }

    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      alert(`Erro ao criar agendamento: ${(error as Error).message}`);
    }
  };

  const handleHistorico = async () => {
    if (!historicoPeriodo) return;
  
    setIsLoading(true);
    try {
      const res = await fetch(`/api/agendamentos/historico?periodo=${historicoPeriodo}`);
      const data = await res.json();
  
      if (res.ok) {
        setHistorico(data);
      } else {
        alert("Erro ao buscar histórico.");
      }
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      alert("Erro ao buscar histórico.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlterarAgendamento = async (id: string) => {
    if (!novaData[id]) return;
  
    const res = await fetch(`/api/agendamentos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ novaData: novaData[id] }),
    });
  
    if (res.ok) {
      alert("Agendamento alterado com sucesso!");
      setAgendamentos((prev) =>
        prev.map((ag) => (ag.id === id ? { ...ag, dataAgendamento: novaData[id] } : ag))
      );
      setEditando(null);
    } else {
      const errorData = await res.json();
      alert(`Erro ao alterar agendamento: ${errorData.error || "Erro desconhecido"}`);
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
        <h1 className="text-3xl font-semibold text-purple-600">Dashboard do Usuário</h1>
        <button 
          className="bg-orange-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-orange-500 transition-all"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Meus Agendamentos</h2>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Serviço</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Data</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agendamentos.map((agendamento) => (
                <tr key={agendamento.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600">
                    {agendamento.servicos?.map((s) => s.servico.nome).join(", ")}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {editando === agendamento.id ? (
                      <input
                        type="datetime-local"
                        value={novaData[agendamento.id] || ""}
                        onChange={(e) =>
                          setNovaData((prev) => ({
                            ...prev,
                            [agendamento.id]: e.target.value,
                          }))
                        }
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      new Date(agendamento.dataAgendamento).toLocaleString()
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      agendamento.status === 'CONFIRMADO' ? 'bg-green-100 text-green-800' :
                      agendamento.status === 'PENDENTE' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {agendamento.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {editando === agendamento.id ? (
                      <button
                        className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors"
                        onClick={() => handleAlterarAgendamento(agendamento.id)}
                      >
                        Salvar
                      </button>
                    ) : (
                      <button
                        className="bg-orange-400 text-white px-3 py-1 rounded-md hover:bg-orange-500 transition-colors"
                        onClick={() => setEditando(agendamento.id)}
                      >
                        Alterar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-purple-600">Agendar Serviços</h3>

        <label className="block mb-2 font-medium text-gray-700">Selecione os serviços:</label>
        <div className="grid grid-cols-2 gap-2 border p-4 rounded-lg bg-purple-50">
          {servicos.map((servico) => (
            <label key={servico.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={servico.id}
                checked={servicosSelecionados.includes(servico.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setServicosSelecionados([...servicosSelecionados, servico.id]);
                  } else {
                    setServicosSelecionados(servicosSelecionados.filter(id => id !== servico.id));
                  }
                }}
                className="w-5 h-5 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700">{servico.nome} - R$ {servico.preco.toFixed(2)}</span>
            </label>
          ))}
        </div>

        <label className="block mt-4 mb-2 font-medium text-gray-700">Data do Agendamento:</label>
        <input
          type="datetime-local"
          value={dataAgendamento}
          onChange={(e) => setDataAgendamento(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />

        {mostrarSugestao && (
          <div className="mt-2 p-3 bg-purple-100 rounded-lg">
            <p className="text-purple-800">
              Você já tem um agendamento pendente para esta semana ({new Date(sugestaoData).toLocaleDateString()}).
              Gostaria de usar a mesma data?
            </p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => {
                  setDataAgendamento(sugestaoData);
                  setMostrarSugestao(false);
                }}
                className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors"
              >
                Usar esta data
              </button>
              <button
                onClick={() => setMostrarSugestao(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
              >
                Manter nova data
              </button>
            </div>
          </div>
        )}

        <button
          className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-all w-full font-semibold mt-4"
          onClick={handleAgendar}
        >
          Agendar Serviço
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Histórico de Agendamentos</h2>

        <label className="block font-medium mb-2 text-gray-700">Filtrar por período:</label>
        <input
          type="date"
          value={historicoPeriodo}
          onChange={(e) => setHistoricoPeriodo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleHistorico}
          className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-all w-full font-semibold mt-4"
        >
          Buscar Histórico
        </button>

        {isLoading ? (
          <p className="mt-4 text-gray-500">Carregando...</p>
        ) : historico.length > 0 ? (
          <div className="mt-4">
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-purple-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Serviço</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Data</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-purple-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {historico.map((agendamento) => (
                    <tr key={agendamento.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-600">
                        {agendamento.servicos.map((s) => s.servico.nome).join(", ")}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(agendamento.dataAgendamento).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          agendamento.status === 'CONFIRMADO' ? 'bg-green-100 text-green-800' :
                          agendamento.status === 'PENDENTE' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {agendamento.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-gray-500">Nenhum agendamento encontrado.</p>
        )}
      </div>
    </div>
  );
}