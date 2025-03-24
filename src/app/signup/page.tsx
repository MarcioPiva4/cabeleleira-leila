"use client";
import { AuthLayout } from "@/components/Auth/AuthLayout";
import { AuthLinks } from "@/components/Auth/AuthLinks";
import { InputField } from "@/components/Form/InputField";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          senha: formData.password,
          role: "USER",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao cadastrar");

      alert("Cadastro realizado com sucesso!");
    } catch (error: any) {
      alert(error.message || "Erro ao conectar com o servidor!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <AuthLayout title="Cadastro">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="text"
          label="Nome"
          value={formData.nome}
          onChange={handleChange("nome")}
          required
        />
        <InputField
          type="email"
          label="E-mail"
          value={formData.email}
          onChange={handleChange("email")}
          required
        />
        <InputField
          type="text"
          label="Telefone"
          value={formData.telefone}
          onChange={handleChange("telefone")}
        />
        <InputField
          type="password"
          label="Senha"
          value={formData.password}
          onChange={handleChange("password")}
          required
        />
        <InputField
          type="password"
          label="Confirmar Senha"
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          required
        />

        <SubmitButton
          loading={loading}
          label="Cadastrar"
          loadingLabel="Cadastrando..."
        />
      </form>

      <AuthLinks
        href="/login"
        questionText="Já tem uma conta?"
        linkText="Faça login aqui"
      />
    </AuthLayout>
  );
}
