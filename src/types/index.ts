// Tipo principal para Agendamento
export type Agendamento = {
  id: string;
  userId: string;
  dataAgendamento: string;
  status: "PENDENTE" | "CONFIRMADO" | "CANCELADO";
  user: User;
  servicos: AgendamentoServico[];
};

// Tipo para relação muitos-para-muitos entre Agendamento e Serviço
export type AgendamentoServico = {
  agendamentoId: string;
  servicoId: string;
  servico: Servico;
};

// Tipo para Serviços oferecidos
export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao?: number; // Duração em minutos (opcional)
  categoria?: string;
}

// Tipo para Usuário
export type User = {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  role: "USER" | "ADMIN";
  createdAt: string;
};

// Tipo para resposta da API
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Tipo para formulário de agendamento
export type AgendamentoFormData = {
  dataAgendamento: string;
  servicoIds: string[];
};

// Tipo para histórico de agendamentos
export type HistoricoFiltro = {
  periodo: "week" | "month" | "year" | "custom";
  dataInicio?: string;
  dataFim?: string;
};

// Tipo para estado de edição
export type EditState = {
  id: string | null;
  novaData: string;
};

// Tipo para status personalizado
export type StatusType = Agendamento["status"];

// Tipo para dados de autenticação
export type AuthData = {
  token: string;
  role: User["role"];
  user: Omit<User, "role">;
};
