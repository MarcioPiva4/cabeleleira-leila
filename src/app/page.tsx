import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-purple-500 to-orange-400 text-white text-center py-16 pt-24">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 max-w-2xl mx-auto">
            Bem-vindo ao <span className="text-amber-50">Salão Leila!</span>
          </h1>
          <p className="text-lg mb-8 max-w-xl mx-auto text-amber-50">
            O lugar perfeito para cuidar da sua beleza com atendimento
            especializado e agendamento online.
          </p>
          <Link
            href="/signup"
            className="bg-orange-400 text-white px-8 py-4 rounded-full text-lg font-medium
                      hover:bg-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl">
            Agende seu horário agora!
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12 text-gray-800">
            Por que escolher o Salão Leila?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow
                          border border-purple-100">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">
                Atendimento Personalizado
              </h3>
              <p className="text-gray-600">
                Nossos profissionais estão sempre prontos para atender suas
                necessidades com carinho e dedicação.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow
                          border border-purple-100">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">
                Agendamento Online
              </h3>
              <p className="text-gray-600">
                Agende seus serviços de forma simples e rápida através do nosso
                sistema online.
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow
                          border border-purple-100">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">
                Ambiente Aconchegante
              </h3>
              <p className="text-gray-600">
                Um espaço pensado para proporcionar conforto e relaxamento
                durante o seu atendimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
