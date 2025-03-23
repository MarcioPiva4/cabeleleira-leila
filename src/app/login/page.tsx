"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Erro ao fazer login");
        return;
      }

      // Salva o token e a role no cookie
      Cookies.set("token", data.token, { expires: 7, secure: true, sameSite: "Strict" });
      Cookies.set("role", data.role, { expires: 7, secure: true, sameSite: "Strict" });

      // Redirecionamento baseado na role
      if (data.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Erro interno, tente novamente!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-orange-400">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm mx-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white px-6 py-3 rounded-full shadow-md hover:bg-orange-500 transition-all font-medium"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link 
              href="/signup" 
              className="text-orange-400 hover:text-orange-500 font-medium"
            >
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}