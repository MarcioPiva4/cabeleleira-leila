"use client";

import { useState } from "react";
import { InputField } from "@/components/Form/InputField";
import { TextAreaField } from "@/components/Form/TextAreaField";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { StatusMessage } from "@/components/StatusMessage";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulação de envio
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus(
        "Mensagem enviada com sucesso! Entraremos em contato em breve."
      );
      setFormData({ name: "", email: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="text"
          label="Nome"
          value={formData.name}
          onChange={handleChange("name")}
          required
        />

        <InputField
          type="email"
          label="E-mail"
          value={formData.email}
          onChange={handleChange("email")}
          required
        />

        <TextAreaField
          label="Mensagem"
          value={formData.message}
          onChange={handleChange("message")}
          required
          rows={4}
        />

        <SubmitButton
          loading={loading}
          label="Enviar Mensagem"
          loadingLabel="Enviando..."
        />
      </form>

      {status && <StatusMessage status={status} />}
    </div>
  );
};
