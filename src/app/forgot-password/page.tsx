'use client'
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Instruções de recuperação de senha foram enviadas para o seu e-mail.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-pink-200 to-pink-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Recuperação de Senha</h2>
        
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
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all"
          >
            Enviar Instruções
          </button>
        </form>

        {message && (
          <div className="mt-4 text-green-600 text-center">
            <p>{message}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Voltar para o <Link className="text-blue-600 hover:text-blue-700" href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
