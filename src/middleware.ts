import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Se o usuário já está logado e tentar acessar login ou cadastro, redireciona para a dashboard
  if (token && (pathname === "/login" || pathname === "/cadastro")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Se o usuário não está logado e tenta acessar páginas protegidas, redireciona para login
  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Definir rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/cadastro"],
};
