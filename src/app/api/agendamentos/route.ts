import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const jwtToken = (await cookieStore).get("token")?.value;
    const role = (await cookieStore).get("role")?.value;

    if (!jwtToken) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET!) as { id: string };
    const userId = decoded.id;

    // Se for admin, traz todos os agendamentos. Caso contrário, filtra pelo userId
    const whereCondition = role === "ADMIN" ? {} : { userId };

    const agendamentos = await prisma.agendamento.findMany({
      where: whereCondition,
      include: {
        user: { select: { nome: true } },
        servicos: {
          include: {
            servico: {
              select: {
                nome: true,
                preco: true,
              },
            },
          },
        },
      },
      orderBy: {
        dataAgendamento: "desc",
      },
    });

    return NextResponse.json(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Erro ao buscar agendamentos" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    // Obter o token do cookie
    const cookieStore = cookies();
    const jwtToken = (await cookieStore).get("token")?.value;

    if (!jwtToken) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    // Decodificar o token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET!) as { id: string };
    const userId = decoded.id;


    const body = await req.json();
    const { dataAgendamento: dataString, servicoIds } = body;

    // Converter a string para Date
    const dataAgendamento = new Date(dataString);
    
    // Validar conversão de data
    if (isNaN(dataAgendamento.getTime())) {
      return NextResponse.json({ error: "Data inválida" }, { status: 400 });
    }

    // Validações corrigidas
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // 1. Validar data futura
    if (dataAgendamento <= hoje) {
      return NextResponse.json({ error: "Não é possível agendar para hoje ou dias passados" }, { status: 400 });
    }

    // 2. Validar dia da semana
    const diaSemana = dataAgendamento.getDay();
    if (diaSemana === 0 || diaSemana === 6) { // 0 = Domingo, 6 = Sábado
      return NextResponse.json({ error: "Agendamentos não são permitidos aos finais de semana" }, { status: 400 });
    }

    // 3. Validar horário comercial
    const hora = dataAgendamento.getHours();
    if (hora < 8 || hora > 18) {
      return NextResponse.json({ error: "Horário fora do expediente (08:00 - 18:00)" }, { status: 400 });
    }

    // 4. Verificar conflitos usando a data convertida
    const conflito = await prisma.agendamento.findFirst({
      where: { 
        dataAgendamento: dataAgendamento,
        status: 'PENDENTE' // Adicione esta linha para considerar apenas agendamentos ativos
      },
    });

    if (conflito) {
      return NextResponse.json({ error: "Já existe um agendamento para esse horário" }, { status: 400 });
    }

    const novoAgendamento = await prisma.agendamento.create({
      data: {
        userId,
        dataAgendamento: new Date(dataAgendamento),
        servicos: {
          create: servicoIds.map((servicoId: string) => ({
            servico: { connect: { id: servicoId } },
          })),
        },
      },
      include: { servicos: { include: { servico: true } } },
    });

    return NextResponse.json(novoAgendamento, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return NextResponse.json({ error: "Erro ao criar agendamento" }, { status: 500 });
  }
}
