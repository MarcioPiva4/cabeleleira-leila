'use client'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Lógica para enviar o formulário (pode ser integrado com uma API ou backend)
    setStatus("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      <Header></Header>

      {/* Seção de Contato */}
      <section className="py-16 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-6">Entre em Contato</h2>
          <p className="text-lg mb-8">Se tiver alguma dúvida, envie sua mensagem abaixo e retornaremos o mais rápido possível!</p>
          
          {/* Formulário de Contato */}
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">Nome</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-600">Mensagem</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all"
            >
              Enviar Mensagem
            </button>
          </form>

          {/* Status de envio */}
          {status && <p className="mt-4 text-green-600">{status}</p>}
        </div>
      </section>

      {/* Informações de Contato */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto">
          <h3 className="text-3xl font-semibold mb-6">Informações de Contato</h3>
          <p className="text-lg mb-4">Você também pode nos contatar pelos seguintes meios:</p>

          <ul className="space-y-4">
            <li className="text-gray-700">
              <strong>Endereço:</strong> Rua Exemplo, 123, Bairro, Cidade - Estado
            </li>
            <li className="text-gray-700">
              <strong>Telefone:</strong> (11) 1234-5678
            </li>
            <li className="text-gray-700">
              <strong>E-mail:</strong> contato@salaoleila.com
            </li>
          </ul>

          {/* Google Maps (opcional) */}
          <div className="mt-8">
            <h4 className="text-2xl font-semibold mb-4">Nosso Local</h4>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.1124004845164!2d-46.64787918445183!3d-23.56044298469828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce595ca51e44e1%3A0x35cf32462e4569f7!2sRua%20Exemplo%2C%20123%2C%20Bairro%2C%20Cidade%2C%20Estado!5e0!3m2!1spt-BR!2sbr!4v1678238752647!5m2!1spt-BR!2sbr"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>


      <Footer></Footer>
    </div>
  );
}
