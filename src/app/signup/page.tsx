"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          senha: password,
          role: "USER",
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.error || "Erro ao cadastrar");
        return;
      }

      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      setLoading(false);
      alert("Erro ao conectar com o servidor!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-orange-400">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm mx-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cadastro</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="text-black mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          </div>

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
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="text"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="text-black mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-black mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white px-6 py-3 rounded-full shadow-md hover:bg-orange-500 transition-all font-medium disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link 
              href="/login" 
              className="text-orange-400 hover:text-orange-500 font-medium"
            >
              Faça login aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}