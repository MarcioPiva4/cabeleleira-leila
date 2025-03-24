"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthLayout } from "@/components/Auth/AuthLayout";
import { InputField } from "@/components/Form/InputField";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { AuthLinks } from "@/components/Auth/AuthLinks";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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

      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("role", data.role, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      router.push(data.role === "ADMIN" ? "/admin" : "/dashboard");
    } catch (err) {
      setError("Erro interno, tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login">
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="email"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <SubmitButton
          loading={loading}
          label="Entrar"
          loadingLabel="Entrando..."
        />
      </form>

      <AuthLinks
        href="/signup"
        questionText="Não tem uma conta?"
        linkText="Cadastre-se aqui"
      />
    </AuthLayout>
  );
}
