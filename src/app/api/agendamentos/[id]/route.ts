import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { status } = await req.json();

    const updated = await prisma.agendamento.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar agendamento' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    
    if (!body.novaData) {
      return NextResponse.json({ error: "Data inválida" }, { status: 400 });
    }

    const dataAgendamento = new Date(body.novaData);

    if (isNaN(dataAgendamento.getTime())) {
      return NextResponse.json({ error: "Formato de data inválido" }, { status: 400 });
    }

    // Definir o início do dia de hoje para comparação
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); 

    // Bloquear agendamentos para hoje e dias anteriores
    if (dataAgendamento <= hoje) {
      return NextResponse.json({ error: "Não é possível agendar para hoje ou dias passados" }, { status: 400 });
    }

    // Bloquear agendamentos aos sábados e domingos
    const diaSemana = dataAgendamento.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
      return NextResponse.json({ error: "Agendamentos não são permitidos aos finais de semana" }, { status: 400 });
    }

    // Bloquear horários fora do expediente
    const hora = dataAgendamento.getHours();
    if (hora < 8 || hora > 18) {
      return NextResponse.json({ error: "Horário fora do expediente (08:00 - 18:00)" }, { status: 400 });
    }

    // Verificar se já existe um agendamento para o mesmo horário
    const conflito = await prisma.agendamento.findFirst({
      where: { dataAgendamento },
    });

    if (conflito) {
      return NextResponse.json({ error: "Já existe um agendamento para esse horário" }, { status: 400 });
    }

    // Atualizar o agendamento
    const agendamentoAtualizado = await prisma.agendamento.update({
      where: { id },
      data: { dataAgendamento },
    });

    return NextResponse.json(agendamentoAtualizado, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
