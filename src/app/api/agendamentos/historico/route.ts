import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const periodo = searchParams.get("periodo");

  if (!periodo) {
    return NextResponse.json({ error: "Período inválido" }, { status: 400 });
  }

  try {
    const dataInicio = new Date(`${periodo}T00:00:00.000Z`);
    const dataFim = new Date(`${periodo}T23:59:59.999Z`);

    const agendamentos = await prisma.agendamento.findMany({
      where: {
        dataAgendamento: {
          gte: dataInicio,
          lte: dataFim,
        },
      },
      include: {
        user: {
          select: { nome: true },
        },
        servicos: {
          include: {
            servico: { select: { nome: true } },
          },
        },
      },
    });

    return NextResponse.json(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar histórico de agendamentos:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
