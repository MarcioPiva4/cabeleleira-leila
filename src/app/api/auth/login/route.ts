import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Verifica se o usuário existe no banco de dados
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado!" }, { status: 401 });
    }

    // Verifica se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.senha);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Credenciais inválidas!" }, { status: 401 });
    }

    // Gera um token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Cria a resposta com os cookies corretamente configurados
    const response = NextResponse.json({ 
      token, 
      user: { id: user.id, nome: user.nome, role: user.role }
    });

    response.headers.append(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
    );

    response.headers.append(
      "Set-Cookie",
      `role=${user.role}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Erro interno do servidor!" }, { status: 500 });
  }
}
