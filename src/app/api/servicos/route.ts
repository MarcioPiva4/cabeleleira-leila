import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface ServicoParams {
  params: { id: string };
}

export async function GET() {
  try {
    const servicos = await prisma.servico.findMany();
    return NextResponse.json(servicos);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar serviços", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { nome, descricao, preco }: { nome: string; descricao: string; preco: number } =
      await req.json();

    if (!nome || !descricao || preco === undefined) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const novoServico = await prisma.servico.create({
      data: { nome, descricao, preco },
    });

    return NextResponse.json(novoServico, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar serviço", error },
      { status: 500 }
    );
  }
}
