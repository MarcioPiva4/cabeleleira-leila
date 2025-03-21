import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const servicos = await prisma.servico.findMany();
    return NextResponse.json(servicos);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar serviços" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { nome, descricao, preco } = await req.json();
    const novoServico = await prisma.servico.create({
      data: { nome, descricao, preco },
    });
    return NextResponse.json(novoServico, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar serviço" }, { status: 500 });
  }
}
