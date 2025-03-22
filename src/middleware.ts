import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value; // Pega a role do cookie
  const pathname = req.nextUrl.pathname;

  // Se o usuário já está logado e tentar acessar login ou cadastro, redireciona para a dashboard/admin
  if (token && (pathname === "/login" || pathname === "/cadastro")) {
    return NextResponse.redirect(new URL(role === "ADMIN" ? "/admin/dashboard" : "/dashboard", req.url));
  }

  // Se o usuário não está logado e tenta acessar páginas protegidas, redireciona para login
  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Se um ADMIN tentar acessar "/dashboard", redireciona para "/admin"
  if (role === "ADMIN" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // Se um USER tentar acessar "/admin", redireciona para "/dashboard"
  if (role === "USER" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Definir rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/cadastro"],
};
