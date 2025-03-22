import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      include: {
        user: { select: { nome: true } },
        servico: { select: { nome: true } },
      },
    });
    return NextResponse.json(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return NextResponse.json({ error: "Erro ao buscar agendamentos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
      // Obtém o token do cookie
      const token = req.cookies.get("token")?.value;
  
      if (!token) {
        return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
      }
  
      // Decodifica o token para obter o userId
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!); // Use a chave secreta do JWT
      } catch (err) {
        return NextResponse.json({ error: "Token inválido" }, { status: 401 });
      }
  
      const userId = (decoded as any).id; // Ajuste conforme o payload do seu token
  
      // Pega os dados do corpo da requisição
      const body = await req.json();
      const { servicoId, dataAgendamento } = body;
  
      if (!servicoId || !dataAgendamento) {
        return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
      }
  
      // Valida a data
      const parsedDate = new Date(dataAgendamento);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: "Data inválida" }, { status: 400 });
      }
  
      // Criar agendamento
      const novoAgendamento = await prisma.agendamento.create({
        data: {
          userId,
          servicoId,
          dataAgendamento: parsedDate,
          status: "pendente",
        },
        include: { servico: true }, 
      });
  
      return NextResponse.json(novoAgendamento, { status: 201 });
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      return NextResponse.json({ error: "Erro ao criar agendamento" }, { status: 500 });
    }
  }
